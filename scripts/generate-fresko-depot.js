// Generates the `depot` field baked onto every entry in js/fresko.js's
// FR_LEVELS array — same one-time-use positional-blocking bucket mechanic
// as Mosaik's own scripts/generate-mosaik-depot.js (itself ported from
// Parkplatz's plIsBlocked/car-lot model), just gated by Fresko's own
// exposed-boundary collection instead of belt-reach. See that file's header
// for the full mechanic writeup — this is a straight adaptation, not a
// redesign: `depot` shape, placement strategy (placeCells), and the overall
// discard-aware simulate-and-confirm structure are unchanged.

const fs = require('fs');
const path = require('path');
const {
  FR_LEVELS, FR_LEVEL_COUNT, frGenerateLevel, frExposedFromPresent,
  frFamiliesInLevel, frFamilyTotalCount, frFamilyExposedCount,
  frOriginalColorTotals, frBucketCapacity, frIsCleared, frTick,
  frIsDepotBlocked, FR_COLLECT_INTERVAL_MS, FR_MAX_DISCARDS_PER_LEVEL,
} = require('../js/fresko.js');

function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function seedForDepot(levelIndex, attempt) {
  return (Math.imul(levelIndex + 104729, 2246822519) >>> 0) ^ Math.imul(attempt + 1, 0x85ebca6b);
}
function shuffle(arr, rng) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Roughly square grid sized so `n` cells occupy ~40% of it — same target
// density as Mosaik's/Parkplatz's own placement.
function pickGridDims(n) {
  const area = Math.max(n, Math.ceil(n / 0.4));
  let cols = Math.max(2, Math.ceil(Math.sqrt(area)));
  let rows = Math.max(2, Math.ceil(area / cols));
  while (rows * cols < n) { cols++; rows = Math.ceil(area / cols); }
  return [rows, cols];
}

function unitsNeeded(totalCount, levelCapacity) {
  return Math.max(1, Math.ceil(totalCount / levelCapacity));
}
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

// Constructive placement (known-valid release order built in reverse),
// identical strategy to Mosaik's own placeCells — see that file's header
// comment for why random-then-check doesn't scale to this cell count.
function placeCells(n, rows, cols, rng) {
  const cells = new Array(n).fill(null);
  const occupied = new Set();
  const released = new Array(n).fill(true);

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
        if (!frIsDepotBlocked(cells, released, k)) {
          occupied.add(r * cols + c);
          released[k] = false;
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

// Independent depot-aware replay loop — own copy per this codebase's
// each-script-owns-its-replay-loop convention (see Mosaik's own
// simulateDepotClear). Two discard triggers (slots-full-with-something-
// waiting, and a same-family jam), both requiring reinforcement, both gated
// by a sustained stuck streak — identical reasoning to Mosaik's, just
// against frFamilyExposedCount's boundary-based exposure instead of belt
// column exposure.
function simulateDepotClear(grid, rows, cols, slotCount, cells, maxSimMs, maxDiscards, colorFamily) {
  const present = new Array(grid.length).fill(true);
  const exposed = frExposedFromPresent(present, rows, cols);
  const state = { present, exposed, containers: [], grid, rows, cols, colorFamily, collectIntervalMs: FR_COLLECT_INTERVAL_MS };
  const dtMs = 10, checkEveryMs = 1000;
  let elapsedMs = 0, sinceCheck = checkEveryMs, placements = 0, discards = 0;
  const n = cells.length;
  const released = new Array(n).fill(false);
  const levelCapacity = frBucketCapacity(grid.length);

  const placeFamily = (family) => {
    state.containers.push({
      family, capacity: Math.min(levelCapacity, frFamilyTotalCount(present, grid, family, colorFamily)),
      filled: 0, msSinceCollect: 0, stuckChecks: 0,
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
        if (frIsDepotBlocked(cells, released, i)) continue;
        released[i] = true;
        placeFamily(cells[i].family);
        placedSomething = true;
        break;
      }
    }
  };

  const STUCK_THRESHOLD = 1200; // 20 simulated minutes of sustained zero exposure, same as Mosaik's

  while (elapsedMs < maxSimMs) {
    if (sinceCheck >= checkEveryMs) {
      sinceCheck = 0;
      releasePriorityFill();

      for (const c of state.containers) {
        c.stuckChecks = frFamilyExposedCount(exposed, grid, c.family, colorFamily) === 0 ? c.stuckChecks + 1 : 0;
      }

      let freedSomething = true;
      while (freedSomething) {
        freedSomething = false;
        if (discards >= maxDiscards) break;
        const activeFamilies = new Set(state.containers.map(c => c.family));
        let stuckIdx = -1;
        if (state.containers.length >= slotCount) {
          const somethingWaiting = cells.some((cell, i) =>
            !released[i] && !activeFamilies.has(cell.family) && !frIsDepotBlocked(cells, released, i));
          if (somethingWaiting) {
            stuckIdx = state.containers.findIndex(c => c.stuckChecks >= STUCK_THRESHOLD && hasReinforcement(c.family));
          }
        }
        if (stuckIdx === -1) {
          for (let i = 0; i < n; i++) {
            if (released[i] || !activeFamilies.has(cells[i].family)) continue;
            if (frIsDepotBlocked(cells, released, i)) continue;
            const idx = state.containers.findIndex(c => c.family === cells[i].family && c.stuckChecks >= STUCK_THRESHOLD);
            if (idx !== -1) { stuckIdx = idx; break; }
          }
        }
        if (stuckIdx === -1) break;
        state.containers.splice(stuckIdx, 1);
        discards++;
        freedSomething = true;
      }
      releasePriorityFill();
    }
    frTick(state, dtMs);
    elapsedMs += dtMs;
    sinceCheck += dtMs;
    if (frIsCleared(state.present)) return { cleared: true, elapsedMs, placements, discards };
  }
  return { cleared: false, elapsedMs, placements, discards };
}

function generateDepotForLevel(levelIndex) {
  const level = frGenerateLevel(levelIndex);
  const families = frFamiliesInLevel(level.grid, level.colorFamily);
  const totalByColor = frOriginalColorTotals(level.grid);
  const levelCapacity = frBucketCapacity(level.grid.length);
  const colorList = buildFamilyColorList(families, totalByColor, level.colorFamily, levelCapacity);
  const n = colorList.length;
  const [rows, cols] = pickGridDims(n);
  const maxSimMs = 2 * 60 * 60 * 1000; // Fresko levels are far smaller than Mosaik's — 2h simulated is generous
  const maxAttempts = 150;
  // frTick collects via real (unseeded) Math.random() reservoir sampling, so
  // one successful run can be a lucky roll rather than a robust proof — same
  // discipline as Mosaik's own generator (see its CONFIRM_TRIALS comment).
  const CONFIRM_TRIALS = 16;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const rng = mulberry32(seedForDepot(levelIndex, attempt));
    const cells = placeCells(n, rows, cols, rng);
    if (!cells) continue;

    const shuffledList = shuffle(colorList.slice(), rng);
    cells.forEach((cell, i) => { cell.color = shuffledList[i].color; cell.family = shuffledList[i].family; });

    let best = null;
    let allCleared = true;
    for (let trial = 0; trial < CONFIRM_TRIALS; trial++) {
      const sim = simulateDepotClear(level.grid, level.rows, level.cols, level.db, cells, maxSimMs, FR_MAX_DISCARDS_PER_LEVEL, level.colorFamily);
      if (!sim.cleared) { allCleared = false; break; }
      if (!best || sim.discards > best.discards) best = sim;
    }
    if (!allCleared) continue;

    return { depot: { grid: [rows, cols], cells }, attempt, placements: best.placements, discards: best.discards, cellCount: n };
  }
  return null;
}

function main() {
  const results = [];
  for (let i = 0; i < FR_LEVEL_COUNT; i++) {
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

  const freskoPath = path.join(__dirname, '../js/fresko.js');
  let src = fs.readFileSync(freskoPath, 'utf8');
  const withDepot = FR_LEVELS.map((l, i) => Object.assign({}, l, { depot: results[i] }));
  const re = /const FR_LEVELS = \[[\s\S]*?\n?\];/;
  if (!re.test(src)) { console.error('FR_LEVELS pattern did not match — aborting without writing.'); process.exit(1); }
  src = src.replace(re, 'const FR_LEVELS = ' + JSON.stringify(withDepot) + ';');
  fs.writeFileSync(freskoPath, src);
  console.log(`\nWrote depot data for ${results.length} levels into js/fresko.js.`);
}

if (require.main === module) {
  main();
} else {
  module.exports = { pickGridDims, placeCells, unitsNeeded, buildFamilyColorList, simulateDepotClear, generateDepotForLevel };
}
