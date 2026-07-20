// Independently re-verifies every shipped Mosaik level using the REAL
// runtime functions from js/mosaik.js. For every level: rebuild columns
// from the shipped grid, run the same greedy slot-assignment simulation
// the generator uses (always assign the color with the most currently-
// reachable pixels to a free slot, then let every active slot cascade-
// drain via the real msAssignAndResolve) against the level's own `db`
// (default unlocked slots), and confirm it reaches a fully cleared board.
// This is a complete proof, not a weaker check than an adversarial solver
// would give: using ALL of a level's distinct colors' worth of slots is
// solvable by construction (every color has an active, auto-draining
// bucket, so nothing can ever be stuck waiting for one) — the only real
// question is whether the tighter `db` also suffices, which one concrete
// achievable playthrough settles completely. See js/mosaik.js's header.

const fs = require('fs');
const path = require('path');
const {
  MS_LEVELS, msGenerateLevel, msColumnsFromGrid, msReachableCells,
  msAssignAndResolve, msIsCleared,
} = require('../js/mosaik.js');

function simulateWithRealFunctions(columns, bandHeight, slotCount) {
  let state = columns.map(col => col.slice());
  let slotColor = Array(slotCount).fill(null);
  const placements = [];
  for (let guard = 0; guard < 20000; guard++) {
    if (msIsCleared(state)) return { cleared: true, placements: placements.length };
    const free = slotColor.findIndex(c => c == null);
    if (free === -1) {
      // no free slot — confirm we're genuinely stuck (no active slot could drain), not just done
      const anyReachable = slotColor.some(c => c != null && msReachableCells(state, c, bandHeight).length > 0);
      if (!anyReachable) return { cleared: false, reason: 'stuck: all slots busy, none can drain' };
      // shouldn't happen (msAssignAndResolve already cascades to a fixpoint), but defensively bail
      return { cleared: false, reason: 'unexpected: reachable pixels left undrained' };
    }
    const assigned = new Set(slotColor.filter(c => c != null));
    const remaining = [...new Set(state.flat())];
    let bestColor = null, bestCount = -1;
    for (const color of remaining) {
      if (assigned.has(color)) continue;
      const count = msReachableCells(state, color, bandHeight).length;
      if (count > bestCount) { bestCount = count; bestColor = color; }
    }
    if (bestColor == null) return { cleared: false, reason: 'no assignable color left' };
    const result = msAssignAndResolve(state, slotColor, free, bestColor, bandHeight);
    if (!result) return { cleared: false, reason: 'msAssignAndResolve rejected a legal placement' };
    state = result.columns;
    slotColor = result.slotColor;
    placements.push(bestColor);
  }
  return { cleared: false, reason: 'guard limit exceeded' };
}

let failures = 0;
for (let i = 0; i < MS_LEVELS.length; i++) {
  const level = msGenerateLevel(i);
  const raw = MS_LEVELS[i];

  if (level.grid.length !== level.rows * level.cols) {
    console.error(`Level ${i}: FAIL — grid.length (${level.grid.length}) !== rows*cols (${level.rows * level.cols})`);
    failures++;
    continue;
  }
  if (!fs.existsSync(path.join(__dirname, '..', level.img))) {
    console.error(`Level ${i}: FAIL — reference image missing at ${level.img}`);
    failures++;
    continue;
  }
  if (level.db < 1 || level.db > level.maxSlots) {
    console.error(`Level ${i}: FAIL — db=${level.db} out of range for maxSlots=${level.maxSlots}`);
    failures++;
    continue;
  }

  const columns = msColumnsFromGrid(level.grid, level.rows, level.cols);
  const sim = simulateWithRealFunctions(columns, level.bandHeight, level.db);
  if (!sim.cleared) {
    console.error(`Level ${i}: FAIL — could not clear using only db=${level.db} slots (${sim.reason})`);
    failures++;
    continue;
  }

  console.log(`Level ${i}: OK (grid=${raw.g.join('x')}, bh=${level.bandHeight}, maxSlots=${level.maxSlots}, db=${level.db}, placements=${sim.placements})`);
}

console.log(`\n${MS_LEVELS.length - failures}/${MS_LEVELS.length} levels verified clearable (using only default slots) via real shipped functions.`);
if (failures > 0) {
  console.error(`${failures} level(s) FAILED verification.`);
  process.exit(1);
}
