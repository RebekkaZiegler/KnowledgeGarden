// Regenerates the WS_LEVELS data baked into js/watersort.js. Run this if you
// ever want to change level count, difficulty (color/spare-bottle counts
// per tier), or just reroll the level pool. Paste the printed
// `const WS_LEVELS = [...]` line over the existing one in js/watersort.js.
//
// Method: for each level, deal a genuinely shuffled deck of color units
// into bottles (real random mixing, not simulated legal pours — an earlier
// live-generation approach kept leaving an isolated, still-solved color
// bottle behind once spare capacity saturated during scrambling), reject
// the deal if any bottle is already solved, then verify it's actually
// solvable via repeated randomized "prefer moves that empty or complete a
// bottle" playouts. Retry with a different seed until a verified-solvable
// deal is found. This only needs to run once, offline, when authoring
// levels — not at runtime in the browser.

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

// Difficulty curve: level index -> color count (bottle count = colors + 2
// spares). Edit this table to change how the pool escalates.
function levelParams(levelIndex) {
  const table = [
    { max: 10, numColors: 5 },
    { max: 25, numColors: 6 },
    { max: 45, numColors: 7 },
    { max: 60, numColors: 8 },
    { max: 80, numColors: 9 },
  ];
  const tier = table.find(t => levelIndex < t.max) || table[table.length - 1];
  return { numColors: tier.numColors, numEmpty: 2 };
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
function isSolved(bottles) { return bottles.every(bottleIsSolved0); }
function bottleIsSolved0(b) { return b.length === 0 || bottleIsSolved(b); }
function canPour(bottles, from, to) {
  if (from === to) return false;
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

// Heuristic playout: far cheaper than exhaustive BFS (which blows up
// combinatorially past ~6 colors before finding a solution, even when one
// exists). Declares solvable as soon as any single playout reaches solved;
// a "not found" result just means try a different random deal, not proof
// of unsolvability.
function tryHeuristicSolve(initial, maxMoves, rng) {
  let bottles = initial.map(b => b.slice());
  for (let move = 0; move < maxMoves; move++) {
    if (isSolved(bottles)) return true;
    const scored = [];
    for (let i = 0; i < bottles.length; i++) {
      for (let j = 0; j < bottles.length; j++) {
        if (!canPour(bottles, i, j)) continue;
        const after = pour(bottles, i, j);
        let score = rng();
        if (after[i].length === 0) score += 3;
        if (bottleIsSolved(after[j])) score += 5;
        scored.push({ i, j, score });
      }
    }
    if (!scored.length) return false;
    scored.sort((a, b) => b.score - a.score);
    const topN = scored.slice(0, Math.max(1, Math.ceil(scored.length * 0.3)));
    const pick = topN[Math.floor(rng() * topN.length)];
    bottles = pour(bottles, pick.i, pick.j);
  }
  return isSolved(bottles);
}
function solvable(initial, playouts, maxMoves, rng) {
  for (let p = 0; p < playouts; p++) if (tryHeuristicSolve(initial, maxMoves, rng)) return true;
  return false;
}

const WS_LEVEL_COUNT = 80;
const levels = [];

for (let i = 0; i < WS_LEVEL_COUNT; i++) {
  const t0 = Date.now();
  const { numColors, numEmpty } = levelParams(i);
  let chosen = null;
  let attempts = 0;
  const maxAttempts = 3000;
  const maxMoves = numColors * 25 + 80;

  while (attempts < maxAttempts && !chosen) {
    const rng = mulberry32(seedForLevel(i, attempts));
    const board = dealBoard(numColors, numEmpty, rng);
    attempts++;
    if (board.some(bottleIsSolved)) continue;
    const solveRng = mulberry32(seedForLevel(i, attempts) ^ 0x1234567);
    if (solvable(board, 40, maxMoves, solveRng)) chosen = board;
  }

  if (!chosen) {
    console.error(`Level ${i}: FAILED to find a verified-solvable deal in ${maxAttempts} attempts — increase maxAttempts or loosen the difficulty table.`);
    process.exit(1);
  }
  console.log(`Level ${i}: OK (colors=${numColors}, attempts=${attempts}, ${Date.now() - t0}ms)`);
  levels.push(chosen);
}

console.log('\n--- paste this over the WS_LEVELS line in js/watersort.js ---\n');
console.log('const WS_LEVELS = ' + JSON.stringify(levels) + ';');
