// Regenerates the WS_LEVELS data baked into js/watersort.js. Run this if you
// ever want to change level count, difficulty (color/spare-bottle counts,
// fog density, lock count per tier), or just reroll the level pool. Paste
// the printed `const WS_LEVELS = [...]` line over the existing one in
// js/watersort.js.
//
// Method: for each level, deal a genuinely shuffled deck of color units
// into bottles (real random mixing, not simulated legal pours — an earlier
// live-generation approach kept leaving an isolated, still-solved color
// bottle behind once spare capacity saturated during scrambling), reject
// the deal if any bottle is already solved, optionally pick 1-2 bottles to
// lock (their unlock color must be fully achievable from the open board —
// see chooseLocks), then verify the whole thing is actually solvable via
// repeated randomized "prefer moves that empty or complete a bottle"
// playouts that respect locked-bottle rules. Retry with a different seed
// until a verified-solvable deal is found, then apply fog (fog is invisible
// to the solver — a pure rendering concern for the live game — so it's
// applied only after a deal is accepted, never affecting verification).
// This only needs to run once, offline, when authoring levels — not at
// runtime in the browser.

const WS_CAPACITY = 4;

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

// Difficulty/mechanic ramp: colors escalate as before; numEmpty is always 1
// now (down from 2) so the "answer a question for an extra bottle" mechanic
// actually matters; fogChance/numLocks introduce the two new mechanics
// gradually — classic only, then fog, then fog+locks — once each prior
// mechanic has had a chance to become familiar.
//
// The final tier deliberately pulls numColors back down to 7 rather than
// pushing to 9: empirically, 9 (or even 8) colors + 1 spare + 2 locks
// simultaneously is a very different beast from any of those alone — a
// generation probe found only ~25% of 8-color deals verified solvable even
// with a heavy search budget (vs. ~88% at 7 colors), because two locked
// bottles at once leaves almost no open workspace at high color counts.
// Difficulty for this tier comes from stacking the *lock* mechanic, not
// from also maxing out color count on top of it.
function levelParams(levelIndex) {
  const table = [
    { max: 10, numColors: 5, fogChance: 0,    numLocks: 0 },
    { max: 25, numColors: 6, fogChance: 0.15, numLocks: 0 },
    { max: 45, numColors: 7, fogChance: 0.30, numLocks: 0 },
    { max: 60, numColors: 8, fogChance: 0.35, numLocks: 1 },
    { max: 70, numColors: 9, fogChance: 0.40, numLocks: 1 },
    { max: 80, numColors: 7, fogChance: 0.40, numLocks: 2 },
  ];
  const tier = table.find(t => levelIndex < t.max) || table[table.length - 1];
  return { numColors: tier.numColors, numEmpty: 1, fogChance: tier.fogChance, numLocks: tier.numLocks };
}

function shuffle(arr, rng) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function dealBoard(numColors, numEmpty, rng) {
  const units = [];
  for (let c = 0; c < numColors; c++) for (let u = 0; u < WS_CAPACITY; u++) units.push(c);
  const shuffled = shuffle(units, rng);
  const bottles = [];
  for (let b = 0; b < numColors; b++) bottles.push(shuffled.slice(b * WS_CAPACITY, (b + 1) * WS_CAPACITY));
  for (let e = 0; e < numEmpty; e++) bottles.push([]);
  return bottles;
}
function bottleIsSolved(b) { return b.length === WS_CAPACITY && b.every(c => c === b[0]); }
function bottleIsSolved0(b) { return b.length === 0 || bottleIsSolved(b); }

// All pure solver functions below take a parallel `locked` boolean array
// (same length/index as `bottles`) so a locked bottle can never be poured
// into or out of, and never counts toward "solved" until unlocked.
function isSolved(bottles, locked) {
  return bottles.every((b, i) => !locked[i] && bottleIsSolved0(b));
}
function canPour(bottles, locked, from, to) {
  if (from === to || locked[from] || locked[to]) return false;
  const src = bottles[from], dst = bottles[to];
  if (!src.length || dst.length >= WS_CAPACITY) return false;
  const top = src[src.length - 1];
  return dst.length === 0 || dst[dst.length - 1] === top;
}
function topRunLen(b) {
  if (!b.length) return 0;
  const c = b[b.length - 1];
  let len = 1;
  while (len < b.length && b[b.length - 1 - len] === c) len++;
  return len;
}
function pour(bottles, from, to) {
  const clone = bottles.map(b => b.slice());
  const amt = Math.min(topRunLen(clone[from]), WS_CAPACITY - clone[to].length);
  for (let i = 0; i < amt; i++) clone[to].push(clone[from].pop());
  return clone;
}
// Unlocks a locked bottle the moment some OTHER, non-locked bottle is full
// and monochrome in that lock's required color. The triggering bottle is
// left untouched (not consumed) — it stays a normal completed bottle.
function checkUnlocks(bottles, locked, unlockColorOf) {
  let changed = false;
  for (const [idx, color] of unlockColorOf) {
    if (!locked[idx]) continue;
    const available = bottles.some((b, i) => i !== idx && !locked[i] &&
      b.length === WS_CAPACITY && b.every(c => c === color));
    if (available) { locked[idx] = false; changed = true; }
  }
  return changed;
}

// Heuristic playout: far cheaper than exhaustive BFS (which blows up
// combinatorially past ~6 colors before finding a solution, even when one
// exists). Declares solvable as soon as any single playout reaches solved;
// a "not found" result just means try a different random deal, not proof
// of unsolvability.
function tryHeuristicSolve(initial, initialLocked, unlockColorOf, maxMoves, rng) {
  let bottles = initial.map(b => b.slice());
  let locked = initialLocked.slice();
  const targetColors = new Set(unlockColorOf.values());
  for (let move = 0; move < maxMoves; move++) {
    if (isSolved(bottles, locked)) return true;
    const scored = [];
    for (let i = 0; i < bottles.length; i++) {
      for (let j = 0; j < bottles.length; j++) {
        if (!canPour(bottles, locked, i, j)) continue;
        const after = pour(bottles, i, j);
        let score = rng();
        if (after[i].length === 0) score += 3;
        if (bottleIsSolved(after[j])) score += 5;
        // while any bottle is still locked, nudge the search toward
        // consolidating its unlock-trigger color specifically — otherwise
        // random play has no reason to prioritize the one sub-goal that
        // actually unblocks new workspace
        if (locked.includes(true) && targetColors.has(bottles[i][bottles[i].length - 1]))
          score += 2;
        scored.push({ i, j, score });
      }
    }
    if (!scored.length) return false;
    scored.sort((a, b) => b.score - a.score);
    const topN = scored.slice(0, Math.max(1, Math.ceil(scored.length * 0.3)));
    const pick = topN[Math.floor(rng() * topN.length)];
    bottles = pour(bottles, pick.i, pick.j);
    checkUnlocks(bottles, locked, unlockColorOf);
  }
  return isSolved(bottles, locked);
}
function solvable(initial, initialLocked, unlockColorOf, playouts, maxMoves, rng) {
  for (let p = 0; p < playouts; p++)
    if (tryHeuristicSolve(initial, initialLocked, unlockColorOf, maxMoves, rng)) return true;
  return false;
}

// Picks 1-2 color bottles to lock. A color is eligible as an unlock target
// only if ALL WS_CAPACITY of its units live in non-locked bottles — this
// single condition also rules out chained locks for free (a color entirely
// outside every locked bottle cannot simultaneously be trapped inside one).
// Returns null (caller retries with a new seed) if no valid assignment
// exists for this particular deal.
function chooseLocks(board, numColors, numLocks, rng) {
  if (numLocks === 0) return { lockedSet: new Set(), unlockColorOf: new Map() };
  const lockedIdx = shuffle([...Array(numColors).keys()], rng).slice(0, numLocks); // never lock a spare bottle
  const lockedSet = new Set(lockedIdx);
  const countOutside = {};
  board.forEach((bottle, i) => {
    if (lockedSet.has(i)) return;
    bottle.forEach(c => { countOutside[c] = (countOutside[c] || 0) + 1; });
  });
  const eligible = Object.keys(countOutside).map(Number).filter(c => countOutside[c] === WS_CAPACITY);
  if (eligible.length < numLocks) return null;
  const chosenColors = shuffle(eligible, rng).slice(0, numLocks); // distinct colors per lock
  const unlockColorOf = new Map();
  lockedIdx.forEach((bIdx, k) => unlockColorOf.set(bIdx, chosenColors[k]));
  return { lockedSet, unlockColorOf };
}

// Applied only after a deal is accepted as solvable — fog is invisible to
// the solver, so it can never affect the verification result.
function applyFog(board, lockedSet, fogChance, rng) {
  return board.map((bottle, i) => {
    if (lockedSet.has(i) || !bottle.length) return 0; // locked bottles are covered wholesale, no per-unit fog needed
    let mask = 0;
    for (let u = 0; u < bottle.length - 1; u++) if (rng() < fogChance) mask |= (1 << u); // exclude the top index — must start visible
    return mask;
  });
}

const WS_LEVEL_COUNT = 80;
const levels = [];

for (let i = 0; i < WS_LEVEL_COUNT; i++) {
  const t0 = Date.now();
  const { numColors, numEmpty, fogChance, numLocks } = levelParams(i);
  let chosen = null;
  let chosenLocks = null;
  let attempts = 0;
  const maxAttempts = 15000;
  const maxMoves = numColors * 35 + 150; // locked bottles reduce usable workspace until unlocked, so budget deeper than the pre-lock version
  const playouts = 60;

  while (attempts < maxAttempts && !chosen) {
    const rng = mulberry32(seedForLevel(i, attempts));
    const board = dealBoard(numColors, numEmpty, rng);
    attempts++;
    if (board.some(bottleIsSolved)) continue;

    const locksRng = mulberry32(seedForLevel(i, attempts) ^ 0x2468ace);
    const locks = chooseLocks(board, numColors, numLocks, locksRng);
    if (!locks) continue; // no valid unlock-color assignment for this deal, try a different one

    const lockedArr = board.map((_, idx) => locks.lockedSet.has(idx));
    const solveRng = mulberry32(seedForLevel(i, attempts) ^ 0x1234567);
    if (solvable(board, lockedArr, locks.unlockColorOf, playouts, maxMoves, solveRng)) {
      chosen = board;
      chosenLocks = locks;
    }
  }

  if (!chosen) {
    console.error(`Level ${i}: FAILED to find a verified-solvable deal in ${maxAttempts} attempts (colors=${numColors}, locks=${numLocks}) — increase maxAttempts/maxMoves or loosen the difficulty table.`);
    process.exit(1);
  }

  const fogRng = mulberry32(seedForLevel(i, attempts) ^ 0x13579bd);
  const f = applyFog(chosen, chosenLocks.lockedSet, fogChance, fogRng);
  const l = [...chosenLocks.unlockColorOf].map(([idx, c]) => ({ i: idx, c }));

  console.log(`Level ${i}: OK (colors=${numColors}, locks=${numLocks}, attempts=${attempts}, ${Date.now() - t0}ms)`);
  levels.push({ b: chosen, f, l });
}

console.log('\n--- paste this over the WS_LEVELS line in js/watersort.js ---\n');
console.log('const WS_LEVELS = ' + JSON.stringify(levels) + ';');
