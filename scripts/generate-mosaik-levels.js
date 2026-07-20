// Generates the MS_LEVELS data baked into js/mosaik.js. Run this to reroll
// the pool or change the difficulty table; paste the printed
// `const MS_LEVELS = [...]` line over the existing one in js/mosaik.js.
//
// Method: DEAL-AND-VERIFY, not constructive. A true correct-by-construction
// generator (like Parkplatz's forward simulation) would mean reverse-
// simulating "gravity + arbitrary-shaped group removal" — starting from an
// empty board and un-clearing groups back onto it. Unlike Parkplatz's
// trivially-reversible binary car state, a SameGame group removal collapses
// an unpredictable connected shape and recompacts the whole grid; many
// different pre-clear boards can gravity-compact to the same post-clear
// state, so reconstructing "what shape, where, would have produced this" is
// genuinely ambiguous and fragile — precisely the kind of fragility that
// already cost real time on Water Sort's live-generation attempts. So this
// uses Water Sort's own eventually-successful fallback: deal a random
// board, verify with the REAL solver (js/mosaik.js's msSolve — iterative-
// deepening DFS with largest-group-first ordering, an admissible per-color
// lower-bound prune, and a node-visit budget), retry with a fresh seed on
// failure. Never accept on a greedy-only "probably fine" — msSolve's DFS
// fallback is what actually earns a solvability proof; a greedy playout
// failing proves nothing and never causes rejection by itself.

const { msFindAllGroups, msSolve } = require('../js/mosaik.js');

function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function seedForLevel(levelIndex, salt) {
  return (Math.imul(levelIndex + 1, 2654435761) >>> 0) ^ Math.imul(salt + 1, 0x9e3779b9);
}

// Difficulty ramp: 80 levels, 6 tiers. PROVISIONAL — validated empirically
// below (real per-level attempt count/method/timing printed); loosen a
// tier if it thrashes rather than trusting this table on faith.
function levelParams(levelIndex) {
  const table = [
    { max: 15, rows: 4, cols: 4, numColors: 3, mv: 7 },
    { max: 30, rows: 5, cols: 5, numColors: 3, mv: 10 },
    { max: 45, rows: 5, cols: 5, numColors: 4, mv: 12 },
    { max: 60, rows: 6, cols: 6, numColors: 4, mv: 15 },
    { max: 70, rows: 6, cols: 6, numColors: 5, mv: 17 },
    { max: 80, rows: 7, cols: 7, numColors: 5, mv: 20 },
  ];
  return table.find(t => levelIndex < t.max) || table[table.length - 1];
}

function dealColumns(rows, cols, numColors, rng) {
  // deal row-major flat grid, then convert to bottom-up columns (same
  // adapter js/mosaik.js's msColumnsFromGrid uses at runtime)
  const grid = [];
  for (let i = 0; i < rows * cols; i++) grid.push(Math.floor(rng() * numColors));
  const columns = [];
  for (let c = 0; c < cols; c++) {
    const col = [];
    for (let r = rows - 1; r >= 0; r--) col.push(grid[r * cols + c]);
    columns.push(col);
  }
  return { grid, columns };
}

function generateLevel(i) {
  const params = levelParams(i);
  const maxAttempts = 3000;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const rng = mulberry32(seedForLevel(i, attempt));
    const { grid, columns } = dealColumns(params.rows, params.cols, params.numColors, rng);

    // cheap pre-filter: a board with zero available groups at all can never
    // be cleared — skip straight to the next deal without paying for a
    // full msSolve call
    if (!msFindAllGroups(columns).length) continue;

    const t0 = Date.now();
    const solveRng = mulberry32(seedForLevel(i, attempt) ^ 0x5bd1e995);
    const result = msSolve(columns, params.mv, { rng: solveRng, greedyAttempts: 60, nodeBudget: 400000 });
    const ms = Date.now() - t0;

    if (result.solvable && !result.aborted) {
      return {
        level: { g: [params.rows, params.cols], mv: params.mv, grid },
        attempt, method: result.method, minMovesFound: result.moves.length, ms,
      };
    }
  }
  return null;
}

const MS_LEVEL_COUNT_TARGET = 80;
const levels = [];
let totalMs = 0;
for (let i = 0; i < MS_LEVEL_COUNT_TARGET; i++) {
  const result = generateLevel(i);
  if (!result) {
    console.error(`Level ${i}: FAILED after max attempts — loosen the difficulty table for this tier.`);
    process.exit(1);
  }
  totalMs += result.ms;
  console.log(`Level ${i}: OK (grid=${result.level.g.join('x')}, mv=${result.level.mv}, attempt=${result.attempt}, method=${result.method}, minMovesFound=${result.minMovesFound}, ${result.ms}ms)`);
  levels.push(result.level);
}
console.log(`\nTotal solver time: ${totalMs}ms`);

console.log('\n--- paste this over the MS_LEVELS line in js/mosaik.js ---\n');
console.log('const MS_LEVELS = ' + JSON.stringify(levels) + ';');
