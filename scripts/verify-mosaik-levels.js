// Independently re-verifies every shipped Mosaik level using the REAL
// runtime functions from js/mosaik.js (not the generator's own copies —
// deal-and-verify generation trusts msSolve at generation time, but this
// script is the defensive second opinion: a fresh seeded rng, and a full
// replay of the found move sequence through the real msApplyTap to confirm
// it actually reaches msIsCleared, matching scripts/verify-parking-levels.js's
// pattern).

const {
  MS_LEVELS, msGenerateLevel, msColumnsFromGrid, msApplyTap, msIsCleared, msSolve,
} = require('../js/mosaik.js');

function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

let failures = 0;
let totalMs = 0;
for (let i = 0; i < MS_LEVELS.length; i++) {
  const level = msGenerateLevel(i);
  const columns = msColumnsFromGrid(level.grid, level.rows, level.cols);

  if (level.grid.length !== level.rows * level.cols) {
    console.error(`Level ${i}: FAIL — grid.length (${level.grid.length}) !== rows*cols (${level.rows * level.cols})`);
    failures++;
    continue;
  }

  const t0 = Date.now();
  // fresh rng, independent seed trail from whatever the generator used
  const rng = mulberry32(0xC0FFEE ^ (i * 2654435761));
  const result = msSolve(columns, level.moveBudget, { rng, greedyAttempts: 60, nodeBudget: 600000 });
  const ms = Date.now() - t0;
  totalMs += ms;

  if (result.aborted) {
    console.error(`Level ${i}: FAIL — solver budget exceeded (state space too large to independently verify)`);
    failures++;
    continue;
  }
  if (!result.solvable) {
    console.error(`Level ${i}: FAIL — msSolve reports unsolvable within mv=${level.moveBudget} moves`);
    failures++;
    continue;
  }
  if (result.moves.length > level.moveBudget) {
    console.error(`Level ${i}: FAIL — found solution uses ${result.moves.length} moves, exceeds mv=${level.moveBudget}`);
    failures++;
    continue;
  }

  // replay the found move sequence from a FRESH columns build, independent
  // of whatever internal state msSolve mutated, and confirm it really
  // reaches an empty board through the real msApplyTap
  let replay = msColumnsFromGrid(level.grid, level.rows, level.cols);
  let replayOk = true;
  for (const [col, idx] of result.moves) {
    const next = msApplyTap(replay, col, idx);
    if (!next) { replayOk = false; break; }
    replay = next.columns;
  }
  if (!replayOk || !msIsCleared(replay)) {
    console.error(`Level ${i}: FAIL — replaying the found move sequence did not reach an empty board`);
    failures++;
    continue;
  }

  console.log(`Level ${i}: OK (grid=${level.rows}x${level.cols}, mv=${level.moveBudget}, method=${result.method}, moves=${result.moves.length}, ${ms}ms)`);
}

console.log(`\n${MS_LEVELS.length - failures}/${MS_LEVELS.length} levels verified solvable via real shipped functions. (${totalMs}ms total)`);
if (failures > 0) {
  console.error(`${failures} level(s) FAILED verification.`);
  process.exit(1);
}
