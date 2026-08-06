// Independently re-verifies every shipped Fresko level using the REAL
// runtime functions from js/fresko.js — frGenerateLevel, frExposedFromPresent,
// frIsCleared, and frTick (the exact function driving both the live RAF
// loop and this fast-forwarded replay). Does NOT import
// scripts/generate-fresko-depot.js's own simulateDepotClear — reimplements
// the replay loop fresh, so a bug in the generator's own strategy can't
// silently pass its own verification. Mirrors scripts/verify-mosaik-levels.js
// throughout; see that file for the fuller rationale behind each check.

const {
  FR_LEVELS, frGenerateLevel, frExposedFromPresent, frFamilyExposedCount, frFamilyTotalCount, frTotalsByFamily,
  frBucketCapacity, frIsCleared, frTick, FR_MAX_DISCARDS_PER_LEVEL, FR_COLLECT_INTERVAL_MS,
  frIsDepotBlocked,
} = require('../js/fresko.js');

function depotFullyReleasable(cells) {
  const released = new Array(cells.length).fill(false);
  let progress = true;
  while (progress) {
    progress = false;
    for (let i = 0; i < cells.length; i++) {
      if (released[i]) continue;
      if (!frIsDepotBlocked(cells, released, i)) { released[i] = true; progress = true; }
    }
  }
  return released.every(Boolean);
}

function replayWithDepot(grid, rows, cols, db, cells, maxSimMs, colorFamily) {
  const present = new Array(grid.length).fill(true);
  const exposed = frExposedFromPresent(present, rows, cols);
  const state = { present, exposed, containers: [], grid, rows, cols, colorFamily, collectIntervalMs: FR_COLLECT_INTERVAL_MS };
  const dtMs = 10, checkEveryMs = 1000;
  let elapsedMs = 0, sinceCheck = checkEveryMs, placements = 0, discards = 0;
  const n = cells.length;
  const released = new Array(n).fill(false);
  const STUCK_THRESHOLD = 1200;
  const levelCapacity = frBucketCapacity(rows * cols);

  const place = (family) => {
    state.containers.push({
      family, capacity: Math.min(levelCapacity, frFamilyTotalCount(present, grid, family, colorFamily)),
      filled: 0, msSinceCollect: 0, stuckChecks: 0,
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
        if (frIsDepotBlocked(cells, released, i)) continue;
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
        c.stuckChecks = frFamilyExposedCount(exposed, grid, c.family, colorFamily) === 0 ? c.stuckChecks + 1 : 0;
      }

      let freed = true;
      while (freed) {
        freed = false;
        if (discards >= FR_MAX_DISCARDS_PER_LEVEL) break;
        const active = new Set(state.containers.map(c => c.family));
        let stuckIdx = -1;
        if (state.containers.length >= db) {
          const waiting = cells.some((cell, i) =>
            !released[i] && !active.has(cell.family) && !frIsDepotBlocked(cells, released, i));
          if (waiting) {
            stuckIdx = state.containers.findIndex(c => c.stuckChecks >= STUCK_THRESHOLD && hasReinforcement(c.family));
          }
        }
        if (stuckIdx === -1) {
          for (let i = 0; i < n; i++) {
            if (released[i] || !active.has(cells[i].family)) continue;
            if (frIsDepotBlocked(cells, released, i)) continue;
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
    frTick(state, dtMs);
    elapsedMs += dtMs;
    sinceCheck += dtMs;
    if (frIsCleared(state.present)) return { cleared: true, elapsedMs, placements, discards };
  }
  return { cleared: false, elapsedMs, placements, discards };
}

const MIN_GRID_SIDE = 12; // sanity floor — well under Mosaik's 150 (this is deliberately the coarse game)
const maxSimMs = 2 * 60 * 60 * 1000;
let failures = 0;

for (let i = 0; i < FR_LEVELS.length; i++) {
  const raw = FR_LEVELS[i];
  const level = frGenerateLevel(i);

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
  const cellCountByFamily = new Map();
  for (const cell of level.depot.cells) cellCountByFamily.set(cell.family, (cellCountByFamily.get(cell.family) || 0) + 1);
  const levelCapacity = frBucketCapacity(level.grid.length);
  const totalByFamily = frTotalsByFamily(level.totalByColor, level.colorFamily);
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
  // frTick collects via real (unseeded) Math.random() reservoir sampling —
  // re-run several times independently rather than trust one roll, same
  // discipline as scripts/verify-mosaik-levels.js.
  const DEPOT_CONFIRM_TRIALS = 16;
  let depotSim = null, depotClearedAllTrials = true;
  for (let trial = 0; trial < DEPOT_CONFIRM_TRIALS; trial++) {
    depotSim = replayWithDepot(level.grid, level.rows, level.cols, level.db, level.depot.cells, maxSimMs, level.colorFamily);
    if (!depotSim.cleared) { depotClearedAllTrials = false; break; }
  }
  if (!depotClearedAllTrials) {
    console.error(`Level ${i}: FAIL — could not clear under depot gating using db=${level.db} within ${FR_MAX_DISCARDS_PER_LEVEL} discards (failed at least one of ${DEPOT_CONFIRM_TRIALS} trials)`);
    failures++;
    continue;
  }

  console.log(`Level ${i}: OK (title=${raw.title}, grid=${raw.g.join('x')}, maxColors=${level.maxColors}, maxFamilies=${level.maxFamilies}, db=${level.db}, depotCells=${level.depot.cells.length}, depotPlacements=${depotSim.placements}, depotDiscards=${depotSim.discards}, depotElapsedMs=${depotSim.elapsedMs})`);
}

console.log(`\n${FR_LEVELS.length - failures}/${FR_LEVELS.length} levels verified clearable (db slots + discard budget) via real shipped functions.`);
if (failures > 0) {
  console.error(`${failures} level(s) FAILED verification.`);
  process.exit(1);
}
