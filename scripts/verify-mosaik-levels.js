// Independently re-verifies every shipped Mosaik level using the REAL
// runtime functions from js/mosaik.js. For every level: rebuild columns
// from the shipped grid, run the same greedy-most-reachable-color-first
// simulation the generator uses (via the real shipped msSimulateGreedyClear/
// msExtractColor — not a copy), and confirm it reaches a cleared board
// within the shipped move budget `mv`. This is a complete proof, not a
// weaker check than an adversarial solver would give: a color tap in this
// game can never make the picture harder to finish (it only removes
// material, and gravity guarantees every remaining color eventually sinks
// into the reachable band regardless of tap order), so there's no
// adversarial case to miss — see js/mosaik.js's header comment.

const {
  MS_LEVELS, msGenerateLevel, msColumnsFromGrid, msExtractColor, msIsCleared, msSimulateGreedyClear,
} = require('../js/mosaik.js');

let failures = 0;
for (let i = 0; i < MS_LEVELS.length; i++) {
  const level = msGenerateLevel(i);
  const raw = MS_LEVELS[i];

  if (level.grid.length !== level.rows * level.cols) {
    console.error(`Level ${i}: FAIL — grid.length (${level.grid.length}) !== rows*cols (${level.rows * level.cols})`);
    failures++;
    continue;
  }

  const columns = msColumnsFromGrid(level.grid, level.rows, level.cols);
  const sim = msSimulateGreedyClear(columns, level.bandHeight, level.moveBudget);
  if (!sim.cleared) {
    console.error(`Level ${i}: FAIL — greedy simulation could not clear within mv=${level.moveBudget} (bandHeight=${level.bandHeight})`);
    failures++;
    continue;
  }
  if (sim.moves.length > level.moveBudget) {
    console.error(`Level ${i}: FAIL — simulation needed ${sim.moves.length} taps, exceeds mv=${level.moveBudget}`);
    failures++;
    continue;
  }

  // replay the found color sequence from a FRESH columns build through the
  // real msExtractColor, independent of whatever state the simulator
  // mutated, and confirm it really reaches an empty board
  let replay = msColumnsFromGrid(level.grid, level.rows, level.cols);
  let replayOk = true;
  for (const color of sim.moves) {
    const next = msExtractColor(replay, color, level.bandHeight);
    if (!next) { replayOk = false; break; }
    replay = next.columns;
  }
  if (!replayOk || !msIsCleared(replay)) {
    console.error(`Level ${i}: FAIL — replaying the simulated color sequence did not reach an empty board`);
    failures++;
    continue;
  }

  console.log(`Level ${i}: OK (grid=${raw.g.join('x')}, bh=${level.bandHeight}, mv=${level.moveBudget}, taps=${sim.moves.length})`);
}

console.log(`\n${MS_LEVELS.length - failures}/${MS_LEVELS.length} levels verified clearable via real shipped functions.`);
if (failures > 0) {
  console.error(`${failures} level(s) FAILED verification.`);
  process.exit(1);
}
