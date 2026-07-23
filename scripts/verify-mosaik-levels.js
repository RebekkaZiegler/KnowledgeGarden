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
  MS_LEVELS, msGenerateLevel, msColumnsFromGrid, msExposedCount, msColorTotalCount,
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
function replayWithDepot(columns, rows, cols, db, totalByColor, cells, maxSimMs) {
  const state = { columns, containers: [], cols, rows, beltSpeedColsPerSec: MS_BELT_SPEED_COLS_PER_SEC, collectIntervalMs: MS_COLLECT_INTERVAL_MS };
  const dtMs = 10, checkEveryMs = 1000;
  let elapsedMs = 0, sinceCheck = checkEveryMs, placements = 0, discards = 0;
  const n = cells.length;
  const released = new Array(n).fill(false);
  const STUCK_THRESHOLD = 1200; // 20 simulated minutes of sustained zero exposure

  const place = (color) => {
    state.containers.push({
      color, capacity: Math.min(msBucketCapacity(totalByColor.get(color)), msColorTotalCount(state.columns, color)),
      filled: 0, beltPos: 0, msSinceCollect: 0, stuckChecks: 0,
    });
    placements++;
  };
  const hasReinforcement = (color) => cells.some((cell, i) => cell.color === color && !released[i]);
  const releaseFill = () => {
    let placed = true;
    while (placed && state.containers.length < db) {
      placed = false;
      const active = new Set(state.containers.map(c => c.color));
      for (let i = 0; i < n; i++) {
        if (released[i] || active.has(cells[i].color)) continue;
        if (msIsDepotBlocked(cells, released, i)) continue;
        released[i] = true;
        place(cells[i].color);
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
        c.stuckChecks = msExposedCount(state.columns, c.color) === 0 ? c.stuckChecks + 1 : 0;
      }

      let freed = true;
      while (freed) {
        freed = false;
        if (discards >= MS_MAX_DISCARDS_PER_LEVEL) break;
        const active = new Set(state.containers.map(c => c.color));
        let stuckIdx = -1;
        if (state.containers.length >= db) {
          const waiting = cells.some((cell, i) =>
            !released[i] && !active.has(cell.color) && !msIsDepotBlocked(cells, released, i));
          if (waiting) {
            stuckIdx = state.containers.findIndex(c => c.stuckChecks >= STUCK_THRESHOLD && hasReinforcement(c.color));
          }
        }
        if (stuckIdx === -1) {
          for (let i = 0; i < n; i++) {
            if (released[i] || !active.has(cells[i].color)) continue;
            if (msIsDepotBlocked(cells, released, i)) continue;
            const idx = state.containers.findIndex(c => c.color === cells[i].color && c.stuckChecks >= STUCK_THRESHOLD);
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

function replay(columns, rows, cols, db, totalByColor, maxSimMs) {
  const state = { columns, containers: [], cols, rows, beltSpeedColsPerSec: MS_BELT_SPEED_COLS_PER_SEC, collectIntervalMs: MS_COLLECT_INTERVAL_MS };
  const dtMs = 10; // must stay under 1 column/tick at this belt speed — see js/mosaik.js's msTick doc
  const checkEveryMs = 1000;
  let elapsedMs = 0, sinceCheck = checkEveryMs, placements = 0, discards = 0;

  while (elapsedMs < maxSimMs) {
    if (sinceCheck >= checkEveryMs) {
      sinceCheck = 0;
      let freedSomething = true;
      while (freedSomething) {
        freedSomething = false;
        if (state.containers.length < db || discards >= MS_MAX_DISCARDS_PER_LEVEL) break;
        const activeColors = new Set(state.containers.map(c => c.color));
        const waitingColor = [...new Set(state.columns.flat())]
          .find(c => !activeColors.has(c) && msExposedCount(state.columns, c) > 0);
        if (waitingColor == null) break;
        const stuckIdx = state.containers.findIndex(c => msExposedCount(state.columns, c.color) === 0);
        if (stuckIdx === -1) break;
        state.containers.splice(stuckIdx, 1);
        discards++;
        freedSomething = true;
      }
      while (state.containers.length < db) {
        const activeColors = new Set(state.containers.map(c => c.color));
        let bestColor = null, bestExposed = -1;
        for (const color of new Set(state.columns.flat())) {
          if (activeColors.has(color)) continue;
          const exposed = msExposedCount(state.columns, color);
          if (exposed > bestExposed) { bestExposed = exposed; bestColor = color; }
        }
        if (bestColor == null || bestExposed === 0) break;
        state.containers.push({ color: bestColor, capacity: Math.min(msBucketCapacity(totalByColor.get(bestColor)), msColorTotalCount(state.columns, bestColor)), filled: 0, beltPos: 0, msSinceCollect: 0 });
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

const MIN_GRID_SIDE = 200; // sanity floor — nowhere near the old "10x10" complaint
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
  if (level.db < 1 || level.db > level.maxColors) {
    console.error(`Level ${i}: FAIL — db=${level.db} out of range for maxColors=${level.maxColors}`);
    failures++;
    continue;
  }

  const columns = msColumnsFromGrid(level.grid, level.rows, level.cols);
  const sim = replay(columns, level.rows, level.cols, level.db, level.totalByColor, maxSimMs);
  if (!sim.cleared) {
    console.error(`Level ${i}: FAIL — could not clear using db=${level.db} within ${MS_MAX_DISCARDS_PER_LEVEL} discards (${raw.template}, ${raw.g.join('x')})`);
    failures++;
    continue;
  }

  if (!level.depot || !Array.isArray(level.depot.cells) || level.depot.cells.length < level.maxColors) {
    console.error(`Level ${i}: FAIL — depot missing or cell count (${level.depot && level.depot.cells.length}) < maxColors (${level.maxColors})`);
    failures++;
    continue;
  }
  const [depotRows, depotCols] = level.depot.grid;
  if (depotRows * depotCols < level.depot.cells.length) {
    console.error(`Level ${i}: FAIL — depot grid ${depotRows}x${depotCols} too small for ${level.depot.cells.length} cells`);
    failures++;
    continue;
  }
  // Independently re-derive, per color, that its cell count × per-unit
  // capacity actually covers its full picture supply — not imported from
  // the generator's own unitsNeeded, so a miscount there can't self-pass.
  const cellCountByColor = new Map();
  for (const cell of level.depot.cells) cellCountByColor.set(cell.color, (cellCountByColor.get(cell.color) || 0) + 1);
  let coverageFailure = null;
  for (const [color, total] of level.totalByColor) {
    const count = cellCountByColor.get(color) || 0;
    const covered = count * msBucketCapacity(total);
    if (covered < total) { coverageFailure = `color ${color} has only ${count} depot cells (covers ${covered}) for a total supply of ${total}`; break; }
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
  const DEPOT_CONFIRM_TRIALS = 5;
  let depotSim = null, depotClearedAllTrials = true;
  for (let trial = 0; trial < DEPOT_CONFIRM_TRIALS; trial++) {
    const depotColumns = msColumnsFromGrid(level.grid, level.rows, level.cols);
    depotSim = replayWithDepot(depotColumns, level.rows, level.cols, level.db, level.totalByColor, level.depot.cells, maxSimMs);
    if (!depotSim.cleared) { depotClearedAllTrials = false; break; }
  }
  if (!depotClearedAllTrials) {
    console.error(`Level ${i}: FAIL — could not clear under depot gating using db=${level.db} within ${MS_MAX_DISCARDS_PER_LEVEL} discards (failed at least one of ${DEPOT_CONFIRM_TRIALS} trials)`);
    failures++;
    continue;
  }

  console.log(`Level ${i}: OK (template=${raw.template}, grid=${raw.g.join('x')}, maxColors=${level.maxColors}, db=${level.db}, placements=${sim.placements}, discards=${sim.discards}, depotCells=${level.depot.cells.length}, depotPlacements=${depotSim.placements}, depotDiscards=${depotSim.discards})`);
}

console.log(`\n${MS_LEVELS.length - failures}/${MS_LEVELS.length} levels verified clearable (db slots + discard budget) via real shipped functions.`);
if (failures > 0) {
  console.error(`${failures} level(s) FAILED verification.`);
  process.exit(1);
}
