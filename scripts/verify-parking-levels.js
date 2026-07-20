// Independently re-verifies every shipped Parkplatz level using the REAL
// runtime functions from js/parking.js (not the generator's own copies —
// the generator constructs levels correct-by-construction, but this script
// is the defensive check that catches a bug in that construction, or in
// js/parking.js itself, that a self-consistent generator could miss).
//
// For every level: confirms plSolve finds a solution using only the
// level's default (db) bays, then replays that exact found order through
// plReleaseCar/plAutoResolve and confirms it independently reaches
// plIsWon. Exits non-zero (and prints which levels failed) if anything
// doesn't check out.

const {
  PL_LEVELS, PL_COLORS, plGenerateLevel,
  plIsBlocked, plCanRelease, plReleaseCar, plIsWon, plSolve,
} = require('../js/parking.js');

// plSolve's 'exists' mode doesn't return the order it found, so replay
// verification here re-derives A solution via the same DFS shape, but this
// time recording the path, then replays that path from scratch.
function findAndReplay(cars, queue, db, maxBays) {
  let state = { parkedMask: (1 << cars.length) - 1, bayCar: Array(maxBays).fill(null), bayFilled: Array(maxBays).fill(0), queuePos: 0 };
  const dead = new Set();
  const key = s => s.parkedMask + '|' + s.bayCar.join(',') + '|' + s.bayFilled.join(',') + '|' + s.queuePos;
  const path = [];
  function dfs(s) {
    if (plIsWon(s)) return true;
    const k = key(s);
    if (dead.has(k)) return false;
    for (let i = 0; i < cars.length; i++) {
      if (!plCanRelease(cars, s.parkedMask, s.bayCar, db, i)) continue;
      const next = plReleaseCar(cars, queue, s, db, i);
      path.push(i);
      if (dfs(next)) return true;
      path.pop();
    }
    dead.add(k);
    return false;
  }
  const found = dfs(state);
  if (!found) return null;

  // independent replay from a fresh initial state
  let replay = { parkedMask: (1 << cars.length) - 1, bayCar: Array(maxBays).fill(null), bayFilled: Array(maxBays).fill(0), queuePos: 0 };
  for (const idx of path) {
    const next = plReleaseCar(cars, queue, replay, db, idx);
    if (!next) return { ok: false, reason: `replay step failed releasing car ${idx}` };
    replay = next;
  }
  if (!plIsWon(replay)) return { ok: false, reason: 'replay did not reach plIsWon' };
  return { ok: true, order: path };
}

let failures = 0;
for (let i = 0; i < PL_LEVELS.length; i++) {
  const level = plGenerateLevel(i);
  const raw = PL_LEVELS[i];

  // sanity: total seats per color === total passengers of that color
  const seatsByColor = {}, queueByColor = {};
  level.cars.forEach(c => { seatsByColor[c.color] = (seatsByColor[c.color] || 0) + c.seats; });
  level.queue.forEach(c => { queueByColor[c] = (queueByColor[c] || 0) + 1; });
  const colorMismatch = Object.keys(seatsByColor).some(c => seatsByColor[c] !== (queueByColor[c] || 0))
    || Object.keys(queueByColor).some(c => queueByColor[c] !== (seatsByColor[c] || 0));
  if (colorMismatch) {
    console.error(`Level ${i}: FAIL — seats/queue color-count mismatch`, seatsByColor, queueByColor);
    failures++;
    continue;
  }

  const solverCheck = plSolve(level.cars, level.queue, level.db, level.maxBays, 'exists', 1, 500000);
  if (solverCheck.aborted) {
    console.error(`Level ${i}: FAIL — solver budget exceeded (state space too large to verify)`);
    failures++;
    continue;
  }
  if (!solverCheck.solvable) {
    console.error(`Level ${i}: FAIL — plSolve reports unsolvable at db=${level.db} bays`);
    failures++;
    continue;
  }

  const replayResult = findAndReplay(level.cars, level.queue, level.db, level.maxBays);
  if (!replayResult || !replayResult.ok) {
    console.error(`Level ${i}: FAIL — ${replayResult ? replayResult.reason : 'no solution path found'}`);
    failures++;
    continue;
  }

  console.log(`Level ${i}: OK (grid=${raw.g.join('x')}, cars=${level.cars.length}, colors=${level.maxBays}, db=${level.db}, order-len=${replayResult.order.length})`);
}

console.log(`\n${PL_LEVELS.length - failures}/${PL_LEVELS.length} levels verified solvable via real shipped functions.`);
if (failures > 0) {
  console.error(`${failures} level(s) FAILED verification.`);
  process.exit(1);
}
