// Independently re-verifies every shipped Mosaik level using the REAL
// runtime functions from js/mosaik.js — msGenerateLevel (which re-runs the
// actual template/seed to reconstruct the grid, exactly like the browser
// does at load time), msColumnsFromGrid, msExposedCount, msBucketCapacity,
// msIsCleared, and msTick (the exact function driving both the live RAF
// loop and this fast-forwarded replay). This script does NOT import the
// generator's own simulateBeltClear — it reimplements the replay loop
// itself, so a bug in the generator's own strategy can't silently pass its
// own verification.
//
// The replay strategy mirrors what a real player does with this mechanic
// (see js/mosaik.js's header and MS_MAX_DISCARDS_PER_LEVEL comment, and
// scripts/generate-mosaik-levels.js): greedily fill free slots with
// whichever unassigned color is currently most exposed, and — only when
// every slot is occupied by containers that have themselves stopped
// making progress (exposure dropped to 0) while some OTHER color sits
// there exposed with nowhere to go — discard one stuck container, up to
// MS_MAX_DISCARDS_PER_LEVEL per level. Confirms every level clears within
// its own `db` slots plus that discard budget, within a generous simulated
// time cap.

const {
  MS_LEVELS, msGenerateLevel, msColumnsFromGrid, msFamilyExposedCount, msFamilyTotalCount, msTotalsByFamily,
  msBucketCapacity, msIsCleared, msTick, MS_MAX_DISCARDS_PER_LEVEL,
  MS_BELT_SPEED_COLS_PER_SEC, MS_COLLECT_INTERVAL_MS, msIsDepotBlocked,
} = require('../js/mosaik.js');

// Independent re-check that every depot cell can EVENTUALLY release: a
// greedy peel (repeatedly release whatever's currently unblocked) using the
// real msIsDepotBlocked — same primitive scripts/generate-mosaik-depot.js
// used to place cells in the first place, but this is its own fresh replay
// of that peel against the SHIPPED baked cells, not a shared/imported loop.
// Array-based (not a bitmask) since a level's cell count — one per
// PLACEMENT, several of which can share a color, not one per distinct
// color — can exceed 31.
function depotFullyReleasable(cells) {
  const released = new Array(cells.length).fill(false);
  let progress = true;
  while (progress) {
    progress = false;
    for (let i = 0; i < cells.length; i++) {
      if (released[i]) continue;
      if (!msIsDepotBlocked(cells, released, i)) { released[i] = true; progress = true; }
    }
  }
  return released.every(Boolean);
}

// Independent depot-gated replay — written fresh here (not imported from
// scripts/generate-mosaik-depot.js's simulateDepotClear) so a strategy bug
// in the generator's own proof can't silently pass its own verification,
// same discipline as this file's plain `replay` below. A depot cell's
// release is unconditional (no exposure gate) and PERMANENT — sent once,
// gone for good. Two discard triggers, both requiring the container's color
// to have REINFORCEMENT (another not-yet-released cell of the same color,
// or discarding would strand whatever it hadn't collected forever) and a
// SUSTAINED stuck streak (a momentary zero-exposure reading isn't
// permanent — see js/mosaik.js's msTick doc on depth-reach collection):
//  A. slots genuinely full, a different not-yet-released unblocked cell
//     waits for any slot.
//  B. a same-color jam: a not-yet-released, positionally-unblocked cell
//     whose only obstacle is its own color already being active.
function replayWithDepot(columns, rows, cols, db, totalByColor, cells, maxSimMs, colorFamily) {
  const state = { columns, containers: [], cols, rows, colorFamily, beltSpeedColsPerSec: MS_BELT_SPEED_COLS_PER_SEC, collectIntervalMs: MS_COLLECT_INTERVAL_MS };
  const dtMs = 10, checkEveryMs = 1000;
  let elapsedMs = 0, sinceCheck = checkEveryMs, placements = 0, discards = 0;
  const n = cells.length;
  const released = new Array(n).fill(false);
  const STUCK_THRESHOLD = 1200; // 20 simulated minutes of sustained zero exposure
  const levelCapacity = msBucketCapacity(rows * cols);

  const place = (family) => {
    state.containers.push({
      family, capacity: Math.min(levelCapacity, msFamilyTotalCount(state.columns, family, colorFamily)),
      filled: 0, beltPos: 0, msSinceCollect: 0, stuckChecks: 0,
    });
    placements++;
  };
  const hasReinforcement = (family) => cells.some((cell, i) => cell.family === family && !released[i]);
  const releaseFill = () => {
    let placed = true;
    while (placed && state.containers.length < db) {
      placed = false;
      const active = new Set(state.containers.map(c => c.family));
      for (let i = 0; i < n; i++) {
        if (released[i] || active.has(cells[i].family)) continue;
        if (msIsDepotBlocked(cells, released, i)) continue;
        released[i] = true;
        place(cells[i].family);
        placed = true;
        break;
      }
    }
  };

  while (elapsedMs < maxSimMs) {
    if (sinceCheck >= checkEveryMs) {
      sinceCheck = 0;
      releaseFill();

      for (const c of state.containers) {
        c.stuckChecks = msFamilyExposedCount(state.columns, c.family, colorFamily) === 0 ? c.stuckChecks + 1 : 0;
      }

      let freed = true;
      while (freed) {
        freed = false;
        if (discards >= MS_MAX_DISCARDS_PER_LEVEL) break;
        const active = new Set(state.containers.map(c => c.family));
        let stuckIdx = -1;
        if (state.containers.length >= db) {
          const waiting = cells.some((cell, i) =>
            !released[i] && !active.has(cell.family) && !msIsDepotBlocked(cells, released, i));
          if (waiting) {
            stuckIdx = state.containers.findIndex(c => c.stuckChecks >= STUCK_THRESHOLD && hasReinforcement(c.family));
          }
        }
        if (stuckIdx === -1) {
          for (let i = 0; i < n; i++) {
            if (released[i] || !active.has(cells[i].family)) continue;
            if (msIsDepotBlocked(cells, released, i)) continue;
            const idx = state.containers.findIndex(c => c.family === cells[i].family && c.stuckChecks >= STUCK_THRESHOLD);
            if (idx !== -1) { stuckIdx = idx; break; }
          }
        }
        if (stuckIdx === -1) break;
        state.containers.splice(stuckIdx, 1);
        discards++;
        freed = true;
      }
      releaseFill();
    }
    msTick(state, dtMs);
    elapsedMs += dtMs;
    sinceCheck += dtMs;
    if (msIsCleared(state.columns)) return { cleared: true, elapsedMs, placements, discards };
  }
  return { cleared: false, elapsedMs, placements, discards };
}

function replay(columns, rows, cols, db, totalByColor, maxSimMs, colorFamily) {
  const state = { columns, containers: [], cols, rows, colorFamily, beltSpeedColsPerSec: MS_BELT_SPEED_COLS_PER_SEC, collectIntervalMs: MS_COLLECT_INTERVAL_MS };
  const dtMs = 10; // must stay under 1 column/tick at this belt speed — see js/mosaik.js's msTick doc
  const checkEveryMs = 1000;
  let elapsedMs = 0, sinceCheck = checkEveryMs, placements = 0, discards = 0;
  const levelCapacity = msBucketCapacity(rows * cols);

  while (elapsedMs < maxSimMs) {
    if (sinceCheck >= checkEveryMs) {
      sinceCheck = 0;
      let freedSomething = true;
      while (freedSomething) {
        freedSomething = false;
        if (state.containers.length < db || discards >= MS_MAX_DISCARDS_PER_LEVEL) break;
        const activeFamilies = new Set(state.containers.map(c => c.family));
        const waitingFamily = [...new Set(state.columns.flat().map(c => colorFamily[c]))]
          .find(f => !activeFamilies.has(f) && msFamilyExposedCount(state.columns, f, colorFamily) > 0);
        if (waitingFamily == null) break;
        const stuckIdx = state.containers.findIndex(c => msFamilyExposedCount(state.columns, c.family, colorFamily) === 0);
        if (stuckIdx === -1) break;
        state.containers.splice(stuckIdx, 1);
        discards++;
        freedSomething = true;
      }
      while (state.containers.length < db) {
        const activeFamilies = new Set(state.containers.map(c => c.family));
        let bestFamily = null, bestExposed = -1;
        for (const family of new Set(state.columns.flat().map(c => colorFamily[c]))) {
          if (activeFamilies.has(family)) continue;
          const exposed = msFamilyExposedCount(state.columns, family, colorFamily);
          if (exposed > bestExposed) { bestExposed = exposed; bestFamily = family; }
        }
        if (bestFamily == null || bestExposed === 0) break;
        state.containers.push({ family: bestFamily, capacity: Math.min(levelCapacity, msFamilyTotalCount(state.columns, bestFamily, colorFamily)), filled: 0, beltPos: 0, msSinceCollect: 0 });
        placements++;
      }
    }
    msTick(state, dtMs);
    elapsedMs += dtMs;
    sinceCheck += dtMs;
    if (msIsCleared(state.columns)) return { cleared: true, elapsedMs, placements, discards };
  }
  return { cleared: false, elapsedMs, placements, discards };
}

const MIN_GRID_SIDE = 150; // sanity floor — nowhere near the old "10x10" complaint
const maxSimMs = 8 * 60 * 60 * 1000;
let failures = 0;

for (let i = 0; i < MS_LEVELS.length; i++) {
  const raw = MS_LEVELS[i];
  const level = msGenerateLevel(i);

  if (level.grid.length !== level.rows * level.cols) {
    console.error(`Level ${i}: FAIL — grid.length (${level.grid.length}) !== rows*cols (${level.rows * level.cols})`);
    failures++;
    continue;
  }
  if (level.rows < MIN_GRID_SIDE || level.cols < MIN_GRID_SIDE) {
    console.error(`Level ${i}: FAIL — grid ${level.rows}x${level.cols} below the ${MIN_GRID_SIDE}px sanity floor`);
    failures++;
    continue;
  }
  if (level.db < 1 || level.db > level.maxFamilies) {
    console.error(`Level ${i}: FAIL — db=${level.db} out of range for maxFamilies=${level.maxFamilies}`);
    failures++;
    continue;
  }

  const columns = msColumnsFromGrid(level.grid, level.rows, level.cols);
  const sim = replay(columns, level.rows, level.cols, level.db, level.totalByColor, maxSimMs, level.colorFamily);
  if (!sim.cleared) {
    console.error(`Level ${i}: FAIL — could not clear using db=${level.db} within ${MS_MAX_DISCARDS_PER_LEVEL} discards (${raw.template}, ${raw.g.join('x')})`);
    failures++;
    continue;
  }

  if (!level.depot || !Array.isArray(level.depot.cells) || level.depot.cells.length < level.maxFamilies) {
    console.error(`Level ${i}: FAIL — depot missing or cell count (${level.depot && level.depot.cells.length}) < maxFamilies (${level.maxFamilies})`);
    failures++;
    continue;
  }
  const [depotRows, depotCols] = level.depot.grid;
  if (depotRows * depotCols < level.depot.cells.length) {
    console.error(`Level ${i}: FAIL — depot grid ${depotRows}x${depotCols} too small for ${level.depot.cells.length} cells`);
    failures++;
    continue;
  }
  // Independently re-derive, per FAMILY, that its cell count × the level's
  // uniform per-bucket capacity actually covers its full picture supply —
  // not imported from the generator's own unitsNeeded, so a miscount there
  // can't self-pass. Grouped by cell.family (not cell.color): the generator
  // deliberately spreads different representative shades across cells
  // within one family for visual variety, so grouping by exact color here
  // would undercount and misreport a real coverage failure.
  const cellCountByFamily = new Map();
  for (const cell of level.depot.cells) cellCountByFamily.set(cell.family, (cellCountByFamily.get(cell.family) || 0) + 1);
  const levelCapacity = msBucketCapacity(level.grid.length);
  const totalByFamily = msTotalsByFamily(level.totalByColor, level.colorFamily);
  let coverageFailure = null;
  for (const [family, total] of totalByFamily) {
    const count = cellCountByFamily.get(family) || 0;
    const covered = count * levelCapacity;
    if (covered < total) { coverageFailure = `family ${family} has only ${count} depot cells (covers ${covered}) for a total supply of ${total}`; break; }
  }
  if (coverageFailure) {
    console.error(`Level ${i}: FAIL — ${coverageFailure}`);
    failures++;
    continue;
  }
  if (!depotFullyReleasable(level.depot.cells)) {
    console.error(`Level ${i}: FAIL — depot layout has a cell that can never release (peel check)`);
    failures++;
    continue;
  }
  // msTick collects probabilistically via real (unseeded) Math.random(), so
  // a single run can pass or fail on luck alone — confirmed empirically
  // (one shipped layout cleared only 2 of 8 independent trials despite the
  // generator accepting it off a single successful run, before the
  // generator itself was fixed to require multiple confirming trials; see
  // scripts/generate-mosaik-depot.js). Re-run several times independently
  // here too rather than trust one roll.
  const DEPOT_CONFIRM_TRIALS = 16;
  let depotSim = null, depotClearedAllTrials = true;
  for (let trial = 0; trial < DEPOT_CONFIRM_TRIALS; trial++) {
    const depotColumns = msColumnsFromGrid(level.grid, level.rows, level.cols);
    depotSim = replayWithDepot(depotColumns, level.rows, level.cols, level.db, level.totalByColor, level.depot.cells, maxSimMs, level.colorFamily);
    if (!depotSim.cleared) { depotClearedAllTrials = false; break; }
  }
  if (!depotClearedAllTrials) {
    console.error(`Level ${i}: FAIL — could not clear under depot gating using db=${level.db} within ${MS_MAX_DISCARDS_PER_LEVEL} discards (failed at least one of ${DEPOT_CONFIRM_TRIALS} trials)`);
    failures++;
    continue;
  }

  console.log(`Level ${i}: OK (template=${raw.template}, grid=${raw.g.join('x')}, maxColors=${level.maxColors}, maxFamilies=${level.maxFamilies}, db=${level.db}, placements=${sim.placements}, discards=${sim.discards}, depotCells=${level.depot.cells.length}, depotPlacements=${depotSim.placements}, depotDiscards=${depotSim.discards})`);
}

console.log(`\n${MS_LEVELS.length - failures}/${MS_LEVELS.length} levels verified clearable (db slots + discard budget) via real shipped functions.`);
if (failures > 0) {
  console.error(`${failures} level(s) FAILED verification.`);
  process.exit(1);
}
