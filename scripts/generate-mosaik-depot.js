// Generates the `depot` field baked onto every entry in js/mosaik.js's
// MS_PHOTO_LEVELS array — the data behind Mosaik's
// depot mechanic: a small lot of ONE-TIME-USE physical buckets (ports
// Parkplatz's plIsBlocked/car-lot model, js/parking.js, from cars to
// buckets), visible from level start, each positionally blocked until
// unblocked (msIsDepotBlocked, shared with the runtime) then sent exactly
// once — gone for good afterward, never re-tappable. Several cells can
// share a FAMILY (a bucket collects any sibling shade of its family, see
// MS_COLOR_FAMILY/msFamilyTotalCount in js/mosaik.js): a family that needs
// N placements to exhaust its picture supply gets N separate cells, each
// baking its own representative exact `color` (for its own swatch) plus
// the shared `family` (for matching/capacity) — matching a real board
// where you can see several buckets of the same family sitting in
// different cells at once (this is the crux of the mechanic — NOT a
// single infinitely-reusable color selector per family, which is what an
// earlier version of this mechanic mistakenly shipped).
//
// depot shape: { grid:[rows,cols], cells:[{r,c,dir,color,family}, ...] } —
// one cell per placement (cells.length equals the level's already-proven
// total placement count), not one per distinct family. Families repeat;
// `msBucketCapacity`/the underlying belt-collection economy is untouched.

const fs = require('fs');
const path = require('path');
const {
  MS_LEVELS, MS_LEVEL_COUNT, msGenerateLevel, msColumnsFromGrid,
  msFamiliesInLevel, msFamilyTotalCount, msFamilyExposedCount,
  msOriginalColorTotals, msBucketCapacity, msIsCleared, msTick,
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
function shuffle(arr, rng) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
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

// unitsNeeded = how many separate container placements it already takes to
// fully exhaust a color's picture supply, given the level's UNIFORM
// per-bucket capacity (same for every color in this level — a color with
// more supply just gets more of these, never a bigger one) — each of
// those placements gets its own visible cell instead of an
// infinitely-reusable color selector.
function unitsNeeded(totalCount, levelCapacity) {
  return Math.max(1, Math.ceil(totalCount / levelCapacity));
}
// One list entry per depot cell to place, each carrying BOTH the family
// (drives matching/capacity — several sibling shades share the same
// bucket) and a representative exact color (drives that one cell's own
// swatch). unitsNeeded is computed off the FAMILY's total supply, not any
// one member shade's — this is the actual "fewer buckets" mechanism: a
// family with several shades needs the same number of cells its old
// single-shade self would have, not one per shade. Cycles through the
// family's member colors (present-in-this-picture only, most-supplied
// first) so a family needing several cells shows varied shades across
// them rather than repeating one — purely cosmetic, solvability doesn't
// depend on which shade a given cell happens to display.
function buildFamilyColorList(families, totalByColor, colorFamily, levelCapacity) {
  const list = [];
  for (const family of families) {
    const members = [...totalByColor.keys()]
      .filter(c => colorFamily[c] === family)
      .sort((a, b) => totalByColor.get(b) - totalByColor.get(a));
    const familyTotal = members.reduce((sum, c) => sum + totalByColor.get(c), 0);
    const n = unitsNeeded(familyTotal, levelCapacity);
    for (let i = 0; i < n; i++) list.push({ family, color: members[i % members.length] });
  }
  return list;
}

// Places n POSITION-ONLY cells (color assigned separately) CONSTRUCTIVELY,
// guaranteed feasible by construction — random-placement-then-peel-check
// (this function's first version, and Parkplatz's own car placement) works
// fine at Parkplatz's car counts (up to ~22) but the probability that a
// fully random layout is peelable collapses as cell count grows: empirically
// 0/500 random layouts at n=56 passed the peel check at all, even though
// Mosaik levels routinely need 57-119 placements. So this builds a KNOWN
// valid release order directly: process cells in REVERSE release order
// (last-to-release first, into an empty grid — trivially unblockable —
// down to first-to-release last, when the whole rest of the grid is
// already occupied) — each new cell only has to find ONE empty
// position+direction whose exit path avoids every cell placed so far
// (all of which release LATER than it, i.e. are exactly its real
// obstacles), reusing the real msIsDepotBlocked for that check so the
// blocking math is never duplicated. Always succeeds given the grid's
// generous ~40% target density; returns null only in the vanishingly
// unlikely event a specific cell finds no legal spot at all.
function placeCells(n, rows, cols, rng) {
  const cells = new Array(n).fill(null);
  const occupied = new Set();
  const released = new Array(n).fill(true); // not-yet-placed cells can't block anything

  for (let k = n - 1; k >= 0; k--) {
    const emptyPositions = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      if (!occupied.has(r * cols + c)) emptyPositions.push([r, c]);
    }
    shuffle(emptyPositions, rng);
    let placed = false;
    for (const [r, c] of emptyPositions) {
      for (const dir of shuffle([0, 1, 2, 3], rng)) {
        cells[k] = { r, c, dir };
        if (!msIsDepotBlocked(cells, released, k)) {
          occupied.add(r * cols + c);
          released[k] = false; // now genuinely occupied — blocks smaller (earlier-released) indices from here on
          placed = true;
          break;
        }
      }
      if (placed) break;
    }
    if (!placed) return null;
  }
  return cells;
}

// Independent, depot-aware adaptation of generate-mosaik-levels.js's
// simulateBeltClear (own copy per this codebase's established
// each-script-owns-its-replay-loop convention). Release is unconditional
// (no exposure gate) and PERMANENT — a cell sent once never returns, so
// grabbing it the instant it's legal only ever helps (frees its position
// for good). Two independent discard triggers:
//  A. slots are genuinely full and some different not-yet-released,
//     unblocked cell is waiting for any slot at all.
//  B. a SAME-COLOR jam: a not-yet-released, positionally-unblocked cell
//     whose only obstacle is its own color already being active — if that
//     active twin is itself stuck, discarding it frees the color.
// Either way, a discard candidate must have REINFORCEMENT (another
// not-yet-released cell of its own color) or discarding it would strand
// whatever it hadn't collected yet forever (nothing left to ever send for
// that color again).
function simulateDepotClear(grid, rows, cols, slotCount, totalByColor, cells, maxSimMs, maxDiscards, colorFamily) {
  const columns = msColumnsFromGrid(grid, rows, cols);
  const state = { columns, containers: [], cols, rows, colorFamily, beltSpeedColsPerSec: MS_BELT_SPEED_COLS_PER_SEC, collectIntervalMs: MS_COLLECT_INTERVAL_MS };
  const dtMs = 10, checkEveryMs = 1000;
  let elapsedMs = 0, sinceCheck = checkEveryMs, placements = 0, discards = 0;
  const n = cells.length;
  const released = new Array(n).fill(false);
  const levelCapacity = msBucketCapacity(grid.length);

  const placeFamily = (family) => {
    state.containers.push({
      family, capacity: Math.min(levelCapacity, msFamilyTotalCount(state.columns, family, colorFamily)),
      filled: 0, beltPos: 0, msSinceCollect: 0, stuckChecks: 0,
    });
    placements++;
  };
  const hasReinforcement = (family) => cells.some((cell, i) => cell.family === family && !released[i]);
  const releasePriorityFill = () => {
    let placedSomething = true;
    while (placedSomething && state.containers.length < slotCount) {
      placedSomething = false;
      const activeFamilies = new Set(state.containers.map(c => c.family));
      for (let i = 0; i < n; i++) {
        if (released[i] || activeFamilies.has(cells[i].family)) continue;
        if (msIsDepotBlocked(cells, released, i)) continue;
        released[i] = true;
        placeFamily(cells[i].family);
        placedSomething = true;
        break;
      }
    }
  };

  // How many consecutive checks a family must show zero exposure before its
  // container is even eligible for a Case-A discard — a momentary
  // msFamilyExposedCount===0 reading is common and usually resolves within a few
  // checks as OTHER active containers keep digging elsewhere (this
  // codebase's msTick also reaches into a depth window, not just the
  // literal frontmost cell). Discarding on the first bad reading thrashes
  // colors that need many placements (their limited cell supply gets burned
  // on repeatedly-interrupted attempts instead of a few that run to
  // completion) — requiring a sustained streak means a discard only ever
  // fires for something genuinely, durably stuck.
  const STUCK_THRESHOLD = 1200;

  while (elapsedMs < maxSimMs) {
    if (sinceCheck >= checkEveryMs) {
      sinceCheck = 0;
      releasePriorityFill();

      for (const c of state.containers) {
        c.stuckChecks = msFamilyExposedCount(state.columns, c.family, colorFamily) === 0 ? c.stuckChecks + 1 : 0;
      }

      let freedSomething = true;
      while (freedSomething) {
        freedSomething = false;
        if (discards >= maxDiscards) break;
        const activeFamilies = new Set(state.containers.map(c => c.family));
        let stuckIdx = -1;
        if (state.containers.length >= slotCount) {
          const somethingWaiting = cells.some((cell, i) =>
            !released[i] && !activeFamilies.has(cell.family) && !msIsDepotBlocked(cells, released, i));
          if (somethingWaiting) {
            stuckIdx = state.containers.findIndex(c => c.stuckChecks >= STUCK_THRESHOLD && hasReinforcement(c.family));
          }
        }
        // Case B: a same-family jam — a not-yet-released, positionally-
        // unblocked cell whose only obstacle is its own family already
        // being active. This can stall progress even with slots NOT full
        // (case A's precondition doesn't cover it): the constructive
        // placement only guarantees SOME valid release order exists, not
        // that multiple cells are simultaneously releasable at every step,
        // so a same-family collision can be the sole thing blocking forward
        // progress while other slots sit idle. Gated by the same sustained
        // stuckChecks threshold as case A — only a durably stuck twin
        // justifies discarding it.
        if (stuckIdx === -1) {
          for (let i = 0; i < n; i++) {
            if (released[i] || !activeFamilies.has(cells[i].family)) continue;
            if (msIsDepotBlocked(cells, released, i)) continue;
            const idx = state.containers.findIndex(c => c.family === cells[i].family && c.stuckChecks >= STUCK_THRESHOLD);
            if (idx !== -1) { stuckIdx = idx; break; } // safe by construction: cells[i] IS the reinforcement
          }
        }
        if (stuckIdx === -1) break;
        state.containers.splice(stuckIdx, 1);
        discards++;
        freedSomething = true;
      }
      releasePriorityFill();
    }
    msTick(state, dtMs);
    elapsedMs += dtMs;
    sinceCheck += dtMs;
    if (msIsCleared(state.columns)) return { cleared: true, elapsedMs, placements, discards };
  }
  const remainingByColor = {};
  for (const col of state.columns) for (const v of col) remainingByColor[v] = (remainingByColor[v] || 0) + 1;
  return { cleared: false, elapsedMs, placements, discards, remainingByColor };
}

function generateDepotForLevel(levelIndex) {
  const level = msGenerateLevel(levelIndex);
  const families = msFamiliesInLevel(level.grid, level.colorFamily);
  const totalByColor = msOriginalColorTotals(level.grid);
  const levelCapacity = msBucketCapacity(level.grid.length);
  const colorList = buildFamilyColorList(families, totalByColor, level.colorFamily, levelCapacity);
  const n = colorList.length;
  const [rows, cols] = pickGridDims(n);
  const maxSimMs = 8 * 60 * 60 * 1000;
  const maxAttempts = 150;
  // msTick collects probabilistically via real (unseeded) Math.random(), so
  // a single successful simulation run can just be a lucky roll rather than
  // a robust proof — confirmed empirically: one layout that "passed" on its
  // first trial only actually cleared 2 of 8 independent re-runs. Requiring
  // several independent clears on the SAME layout before accepting it
  // filters out marginal layouts that only occasionally clear within the
  // discard budget.
  const CONFIRM_TRIALS = 16;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const rng = mulberry32(seedForDepot(levelIndex, attempt));
    const cells = placeCells(n, rows, cols, rng);
    if (!cells) continue; // infeasible layout — reroll

    // Assign family+color to placed cells via a random permutation —
    // solvability doesn't depend on which family/shade lands where, this
    // just varies pacing.
    const shuffledList = shuffle(colorList.slice(), rng);
    cells.forEach((cell, i) => { cell.color = shuffledList[i].color; cell.family = shuffledList[i].family; });

    let best = null;
    let allCleared = true;
    for (let trial = 0; trial < CONFIRM_TRIALS; trial++) {
      const sim = simulateDepotClear(level.grid, level.rows, level.cols, level.db, totalByColor, cells, maxSimMs, MS_MAX_DISCARDS_PER_LEVEL, level.colorFamily);
      if (!sim.cleared) { allCleared = false; break; }
      if (!best || sim.discards > best.discards) best = sim; // keep the worst-case (highest-discard) trial's stats for reporting
    }
    if (!allCleared) continue; // reroll — this layout isn't robustly solvable

    return { depot: { grid: [rows, cols], cells }, attempt, placements: best.placements, discards: best.discards, cellCount: n };
  }
  return null;
}

function main() {
  const results = [];
  for (let i = 0; i < MS_LEVEL_COUNT; i++) {
    const t0 = Date.now();
    const result = generateDepotForLevel(i);
    const ms = Date.now() - t0;
    if (!result) {
      console.error(`Level ${i}: FAILED after 150 attempts.`);
      process.exit(1);
    }
    console.log(`Level ${i}: OK (cells=${result.depot.cells.length}, grid=${result.depot.grid.join('x')}, attempt=${result.attempt}, placements=${result.placements}, discards=${result.discards}, ${ms}ms)`);
    results.push(result.depot);
  }

  // Splice `depot` onto every already-shipped level entry directly in
  // js/mosaik.js — printing a multi-hundred-KB literal for manual paste
  // isn't practical once photo levels' baked pixel strings are involved, so
  // this script owns the rewrite end-to-end.
  const mosaikPath = path.join(__dirname, '../js/mosaik.js');
  let src = fs.readFileSync(mosaikPath, 'utf8');

  const photoWithDepot = MS_LEVELS.map((l, i) => Object.assign({}, l, { depot: results[i] }));

  const photoRe = /const MS_PHOTO_LEVELS = \[[\s\S]*?\n?\];/;
  if (!photoRe.test(src)) { console.error('MS_PHOTO_LEVELS pattern did not match — aborting without writing.'); process.exit(1); }
  src = src.replace(photoRe, 'const MS_PHOTO_LEVELS = ' + JSON.stringify(photoWithDepot) + ';');
  fs.writeFileSync(mosaikPath, src);
  console.log(`\nWrote depot data for ${results.length} levels into js/mosaik.js.`);
}

if (require.main === module) {
  main();
} else {
  module.exports = {
    pickGridDims, placeCells, unitsNeeded, buildColorList, simulateDepotClear, generateDepotForLevel, seedForDepot, mulberry32, shuffle,
  };
}
