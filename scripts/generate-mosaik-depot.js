// Generates the `depot` field baked onto every entry in js/mosaik.js's
// MS_LEVELS_GENERATED and MS_PHOTO_LEVELS arrays — the data behind Mosaik's
// depot-blocking mechanic (see the "Depot-blocking mechanic" comment in
// js/mosaik.js's msIsDepotBlocked). A depot is a small grid of one cell per
// color actually present in the level, each with a fixed release direction;
// a cell is positionally BLOCKED (per msIsDepotBlocked, ported straight from
// Parkplatz's plIsBlocked) while any other not-yet-released cell lies
// between it and its exit edge. Placement/direction assignment is purely
// additive on top of already-shipped level data — it never touches
// template/seed/g/db/palette/pixels, only appends `depot`.
//
// Unlike Parkplatz cars (used exactly once, then gone), a depot cell's
// "release" doesn't consume anything: it just flips a color from locked to
// permanently placeable for the rest of the level, and happens automatically
// on the same tap that places its first container (see msOnColorTap). That
// means depot blocking can only ever reorder when a color becomes available,
// never remove a color from the level, so per-level `db` values proven by
// generate-mosaik-levels.js/generate-mosaik-photo-levels.js remain valid —
// this script's own simulation just re-proves clearability under the ADDED
// depot-gating constraint, retrying with a new depot layout on failure.

const fs = require('fs');
const path = require('path');
const {
  MS_LEVELS, MS_LEVEL_COUNT, msGenerateLevel, msColumnsFromGrid, msColorsInLevel,
  msOriginalColorTotals, msBucketCapacity, msColorTotalCount, msExposedCount, msIsCleared, msTick,
  msIsDepotBlocked, MS_BELT_SPEED_COLS_PER_SEC, MS_COLLECT_INTERVAL_MS, MS_MAX_DISCARDS_PER_LEVEL,
} = require('../js/mosaik.js');

function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function seedForDepot(levelIndex, attempt) {
  return (Math.imul(levelIndex + 7919, 2246822519) >>> 0) ^ Math.imul(attempt + 1, 0x85ebca6b);
}

// Roughly square grid sized so `n` cells occupy ~40% of it — same target
// density as Parkplatz's own car placement (see scripts/generate-parking-levels.js).
function pickGridDims(n) {
  const area = Math.max(n, Math.ceil(n / 0.4));
  let cols = Math.max(2, Math.ceil(Math.sqrt(area)));
  let rows = Math.max(2, Math.ceil(area / cols));
  while (rows * cols < n) { cols++; rows = Math.ceil(area / cols); }
  return [rows, cols];
}

// Places n cells on distinct random grid cells with random directions, then
// runs a greedy peel (repeatedly release whatever's currently unblocked)
// using the real msIsDepotBlocked — if the peel doesn't clear every cell,
// this placement is infeasible (some cells could NEVER release, a genuine
// dead layout, not just a hard one) and the caller should retry.
function placeDepot(n, rows, cols, rng) {
  const allCells = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) allCells.push([r, c]);
  for (let i = allCells.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [allCells[i], allCells[j]] = [allCells[j], allCells[i]];
  }
  const cells = allCells.slice(0, n).map(([r, c]) => ({ r, c, dir: Math.floor(rng() * 4) }));

  let releasedMask = 0, progress = true;
  while (progress) {
    progress = false;
    for (let i = 0; i < cells.length; i++) {
      if (releasedMask & (1 << i)) continue;
      if (!msIsDepotBlocked(cells, releasedMask, i)) { releasedMask |= (1 << i); progress = true; }
    }
  }
  return releasedMask === (n === 0 ? 0 : (2 ** n) - 1) ? cells : null;
}

// Independent, depot-gated adaptation of generate-mosaik-levels.js's
// simulateBeltClear (own copy per this codebase's established
// each-script-owns-its-replay-loop convention — see that file's header).
// Adds one priority step before the existing "fill free slots greedily"
// logic: release any currently-unblocked, not-yet-released depot cell into
// a free slot first (free, and only ever adds options), and restricts both
// the discard-when-stuck and fallback-fill logic to consider only released
// colors as real placement candidates (an unreleased color literally can't
// be assigned a slot except via the release-priority step itself).
function simulateBeltClearWithDepot(grid, rows, cols, slotCount, totalByColor, depotCells, maxSimMs, maxDiscards) {
  const columns = msColumnsFromGrid(grid, rows, cols);
  const state = { columns, containers: [], cols, rows, beltSpeedColsPerSec: MS_BELT_SPEED_COLS_PER_SEC, collectIntervalMs: MS_COLLECT_INTERVAL_MS };
  const dtMs = 10, checkEveryMs = 1000;
  let elapsedMs = 0, sinceCheck = checkEveryMs, placements = 0, discards = 0, releasedMask = 0;

  const placeColor = (color) => {
    state.containers.push({
      color, capacity: Math.min(msBucketCapacity(totalByColor.get(color)), msColorTotalCount(state.columns, color)),
      filled: 0, beltPos: 0, msSinceCollect: 0,
    });
    placements++;
  };
  const releasePriorityFill = () => {
    let placedSomething = true;
    while (placedSomething && state.containers.length < slotCount) {
      placedSomething = false;
      const activeColors = new Set(state.containers.map(c => c.color));
      for (let i = 0; i < depotCells.length; i++) {
        if (releasedMask & (1 << i)) continue;
        if (activeColors.has(depotCells[i].color)) continue;
        if (msIsDepotBlocked(depotCells, releasedMask, i)) continue;
        releasedMask |= (1 << i);
        placeColor(depotCells[i].color);
        placedSomething = true;
        break;
      }
    }
  };

  while (elapsedMs < maxSimMs) {
    if (sinceCheck >= checkEveryMs) {
      sinceCheck = 0;
      releasePriorityFill();

      let freedSomething = true;
      while (freedSomething) {
        freedSomething = false;
        if (state.containers.length < slotCount || discards >= maxDiscards) break;
        const activeColors = new Set(state.containers.map(c => c.color));
        const releasedWaiting = [...new Set(state.columns.flat())].some(c =>
          !activeColors.has(c) && msExposedCount(state.columns, c) > 0 &&
          depotCells.some((cell, i) => cell.color === c && (releasedMask & (1 << i))));
        const unlockWaiting = depotCells.some((cell, i) =>
          !(releasedMask & (1 << i)) && !activeColors.has(cell.color) && !msIsDepotBlocked(depotCells, releasedMask, i));
        if (!releasedWaiting && !unlockWaiting) break;
        const stuckIdx = state.containers.findIndex(c => msExposedCount(state.columns, c.color) === 0);
        if (stuckIdx === -1) break;
        state.containers.splice(stuckIdx, 1);
        discards++;
        freedSomething = true;
      }
      releasePriorityFill();

      while (state.containers.length < slotCount) {
        const activeColors = new Set(state.containers.map(c => c.color));
        let bestColor = null, bestExposed = -1;
        for (let i = 0; i < depotCells.length; i++) {
          if (!(releasedMask & (1 << i))) continue;
          const color = depotCells[i].color;
          if (activeColors.has(color)) continue;
          const exposed = msExposedCount(state.columns, color);
          if (exposed > bestExposed) { bestExposed = exposed; bestColor = color; }
        }
        if (bestColor == null || bestExposed === 0) break;
        placeColor(bestColor);
      }
    }
    msTick(state, dtMs);
    elapsedMs += dtMs;
    sinceCheck += dtMs;
    if (msIsCleared(state.columns)) return { cleared: true, elapsedMs, placements, discards };
  }
  return { cleared: false, elapsedMs, placements, discards };
}

function generateDepotForLevel(levelIndex) {
  const level = msGenerateLevel(levelIndex);
  const colors = msColorsInLevel(level.grid);
  const n = colors.length;
  const [rows, cols] = pickGridDims(n);
  const totalByColor = msOriginalColorTotals(level.grid);
  const maxSimMs = 8 * 60 * 60 * 1000;
  const maxAttempts = 60;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const rng = mulberry32(seedForDepot(levelIndex, attempt));
    const cells = placeDepot(n, rows, cols, rng);
    if (!cells) continue; // infeasible layout (some cell can never release) — reroll

    // Assign colors to placed cells via a random permutation — solvability
    // doesn't depend on which color lands where (release is free and
    // monotonic regardless), this just varies which colors unlock early.
    const shuffledColors = colors.slice();
    for (let i = shuffledColors.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [shuffledColors[i], shuffledColors[j]] = [shuffledColors[j], shuffledColors[i]];
    }
    cells.forEach((cell, i) => { cell.color = shuffledColors[i]; });

    const sim = simulateBeltClearWithDepot(level.grid, level.rows, level.cols, level.db, totalByColor, cells, maxSimMs, MS_MAX_DISCARDS_PER_LEVEL);
    if (!sim.cleared) continue; // db insufficient under depot gating for this layout — reroll

    return { depot: { grid: [rows, cols], cells }, attempt, placements: sim.placements, discards: sim.discards };
  }
  return null;
}

const results = [];
for (let i = 0; i < MS_LEVEL_COUNT; i++) {
  const t0 = Date.now();
  const result = generateDepotForLevel(i);
  const ms = Date.now() - t0;
  if (!result) {
    console.error(`Level ${i}: FAILED after ${60} attempts.`);
    process.exit(1);
  }
  console.log(`Level ${i}: OK (cells=${result.depot.cells.length}, grid=${result.depot.grid.join('x')}, attempt=${result.attempt}, placements=${result.placements}, discards=${result.discards}, ${ms}ms)`);
  results.push(result.depot);
}

// Splice `depot` onto every already-shipped level entry directly in
// js/mosaik.js — printing a multi-hundred-KB literal for manual paste (the
// older scripts' convention) isn't practical once photo levels' baked pixel
// strings are involved, so this script owns the rewrite end-to-end.
const mosaikPath = path.join(__dirname, '../js/mosaik.js');
let src = fs.readFileSync(mosaikPath, 'utf8');

const generatedCount = MS_LEVELS.filter(l => l.template).length;
const generatedWithDepot = MS_LEVELS.slice(0, generatedCount).map((l, i) => Object.assign({}, l, { depot: results[i] }));
const photoWithDepot = MS_LEVELS.slice(generatedCount).map((l, i) => Object.assign({}, l, { depot: results[generatedCount + i] }));

const genRe = /const MS_LEVELS_GENERATED = \[[\s\S]*?\n?\];/;
const photoRe = /const MS_PHOTO_LEVELS = \[[\s\S]*?\n?\];/;
if (!genRe.test(src)) { console.error('MS_LEVELS_GENERATED pattern did not match — aborting without writing.'); process.exit(1); }
if (!photoRe.test(src)) { console.error('MS_PHOTO_LEVELS pattern did not match — aborting without writing.'); process.exit(1); }
src = src.replace(genRe, 'const MS_LEVELS_GENERATED = ' + JSON.stringify(generatedWithDepot) + ';');
src = src.replace(photoRe, 'const MS_PHOTO_LEVELS = ' + JSON.stringify(photoWithDepot) + ';');
fs.writeFileSync(mosaikPath, src);
console.log(`\nWrote depot data for ${results.length} levels into js/mosaik.js.`);
