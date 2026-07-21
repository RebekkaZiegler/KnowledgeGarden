// Independently re-verifies every shipped Mosaik level using the REAL
// runtime functions from js/mosaik.js. For every level: rebuild columns
// from the shipped grid, run the same greedy slot-assignment simulation
// the generator uses (at each free slot, assign whichever currently-
// reachable, not-already-assigned color has the most reachable pixels;
// buckets cap out at MS_BUCKET_CAPACITY_FRACTION of that color's total, so
// a color gets re-selected multiple times as its bucket frees up) against
// the level's own `db` (default unlocked slots), via the real shipped
// msAssignAndResolve — not a copy — and confirm it reaches a fully
// cleared board. This is a complete proof, not a weaker check than an
// adversarial solver would give: using ALL of a level's distinct colors'
// worth of slots, with free re-selection, is solvable by construction
// (nothing is ever permanently blocked) — the only real question is
// whether the tighter `db` also suffices, which one concrete achievable
// playthrough settles completely. See js/mosaik.js's header comment.

const fs = require('fs');
const path = require('path');
const {
  MS_LEVELS, msGenerateLevel, msColumnsFromGrid, msReachableCells,
  msAssignAndResolve, msIsCleared,
} = require('../js/mosaik.js');

function simulateWithRealFunctions(columns, bandHeight, slotCount, totalByColor) {
  let state = columns.map(col => col.slice());
  let slotColor = Array(slotCount).fill(null);
  let slotFilled = Array(slotCount).fill(0);
  let placements = 0;
  for (let guard = 0; guard < 20000; guard++) {
    if (msIsCleared(state)) return { cleared: true, placements };
    const free = slotColor.indexOf(null);
    if (free === -1) return { cleared: false, reason: 'no free slot (unexpected — a full board should always free or clear)' };

    const assigned = new Set(slotColor.filter(c => c != null));
    const remaining = [...new Set(state.flat())].filter(c => !assigned.has(c));
    let bestColor = null, bestCount = -1;
    for (const color of remaining) {
      const count = msReachableCells(state, color, bandHeight).length;
      if (count > bestCount) { bestCount = count; bestColor = color; }
    }
    if (bestColor == null || bestCount === 0) return { cleared: false, reason: 'stuck: no assignable color has anything reachable' };

    const result = msAssignAndResolve(state, slotColor, slotFilled, free, bestColor, bandHeight, totalByColor);
    if (!result) return { cleared: false, reason: 'msAssignAndResolve rejected a legal placement' };
    state = result.columns;
    slotColor = result.slotColor;
    slotFilled = result.slotFilled;
    placements++;
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
  const sim = simulateWithRealFunctions(columns, level.bandHeight, level.db, level.totalByColor);
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
