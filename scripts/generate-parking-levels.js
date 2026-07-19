// Generates the PL_LEVELS data baked into js/parking.js. Run this to reroll
// the pool or change the difficulty table; paste the printed
// `const PL_LEVELS = [...]` line over the existing one in js/parking.js.
//
// Method: unlike Water Sort, sliding-car moves are perfectly reversible — a
// slide from cell A to cell B is legal iff every cell between them is free,
// which is exactly the condition for sliding back from B to A. So each level
// is built by starting from a SOLVED layout (target vehicle already touching
// the exit) and applying real, legal, random slide moves to scramble it,
// using only the level's 4 default-unlocked bay cells as extra open space
// (locked bay cells are excluded from this whole pass). That single fact
// guarantees the resulting scrambled layout is solvable using just the 4
// free bays — reversing the exact scramble sequence is always legal. Still,
// per the lesson from Water Sort's generator, every accepted level is
// independently re-verified via real BFS (not just trusted from the theory),
// which also grades exact difficulty (minimum solution move count) — a
// precise metric Water Sort's combinatorially-larger state space couldn't
// afford, but is cheap here since Rush Hour-scale puzzles are well-known to
// be BFS-tractable.

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
function shuffle(arr, rng) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Difficulty ramp: 80 levels, 6 tiers. Vehicle count capped at 10 so
// "bay count === vehicle count" can hold exactly. Difficulty within a tier
// is graded by exact BFS-computed minimum move count (moveMin/moveMax).
//
// moveMin/moveMax bands were originally much higher (aiming for 20+ move
// "expert" puzzles at the hardest tier) but an empirical survey showed pure
// random-walk scrambling — even with a bias toward re-blocking the target's
// return path — naturally tops out around 5-7 moves almost regardless of
// vehicle count; deep, famous Rush Hour puzzles (40+ moves) are rare,
// hand-crafted exceptions, not something this generation method produces.
// Bands below are calibrated to what's actually achievable, with vehicle
// count/grid size (harder to visually track, tighter bay economy) doing
// more of the difficulty work across tiers than move count alone.
function levelParams(levelIndex) {
  const table = [
    { max: 15, rows: 6, cols: 6, vehicleCount: 4,  truckCount: 0, bayTotal: 4,  moveMin: 1, moveMax: 2 },
    { max: 30, rows: 6, cols: 6, vehicleCount: 6,  truckCount: 0, bayTotal: 6,  moveMin: 2, moveMax: 3 },
    { max: 45, rows: 6, cols: 6, vehicleCount: 8,  truckCount: 1, bayTotal: 8,  moveMin: 2, moveMax: 4 },
    { max: 60, rows: 7, cols: 7, vehicleCount: 9,  truckCount: 2, bayTotal: 9,  moveMin: 3, moveMax: 5 },
    { max: 75, rows: 7, cols: 7, vehicleCount: 10, truckCount: 2, bayTotal: 10, moveMin: 3, moveMax: 6 },
    { max: 80, rows: 7, cols: 7, vehicleCount: 10, truckCount: 3, bayTotal: 10, moveMin: 4, moveMax: 7 },
  ];
  return table.find(t => levelIndex < t.max) || table[table.length - 1];
}

/* ── grid/vehicle geometry (shared by scrambler AND solver — the single
   biggest bug risk in a solver/generator split is the two disagreeing about
   what a legal move is, so there is exactly one enumerateLegalMoves) ── */
const cellKey = (r, c) => r + ',' + c;
function vehicleCells(v) {
  const cells = [];
  for (let i = 0; i < v.len; i++) cells.push(v.orient === 'h' ? [v.r, v.c + i] : [v.r + i, v.c]);
  return cells;
}
function occupiedSet(vehicles, excludeIdx) {
  const set = new Set();
  vehicles.forEach((v, i) => { if (i !== excludeIdx) vehicleCells(v).forEach(([r, c]) => set.add(cellKey(r, c))); });
  return set;
}
function maxRun(vehicles, lockedCells, dims, vIdx, dir) {
  const v = vehicles[vIdx];
  const occ = occupiedSet(vehicles, vIdx);
  let dist = 0;
  while (true) {
    const next = dist + 1;
    const r = v.orient === 'v' ? (dir > 0 ? v.r + v.len - 1 + next : v.r - next) : v.r;
    const c = v.orient === 'h' ? (dir > 0 ? v.c + v.len - 1 + next : v.c - next) : v.c;
    if (r < 0 || r >= dims.rows || c < 0 || c >= dims.cols) break;
    const key = cellKey(r, c);
    if (occ.has(key) || lockedCells.has(key)) break;
    dist = next;
  }
  return dist;
}
// One "move" = a full slide to any reachable stopping cell along a clear
// run (matches classic Rush Hour: a player taps a destination, not a single
// step) — every distance 1..maxRun is its own distinct legal move.
function enumerateLegalMoves(vehicles, lockedCells, dims) {
  const moves = [];
  for (let vIdx = 0; vIdx < vehicles.length; vIdx++) {
    const v = vehicles[vIdx];
    for (const dir of [1, -1]) {
      const run = maxRun(vehicles, lockedCells, dims, vIdx, dir);
      for (let dist = 1; dist <= run; dist++) {
        moves.push({
          vIdx,
          r: v.orient === 'v' ? v.r + dir * dist : v.r,
          c: v.orient === 'h' ? v.c + dir * dist : v.c,
        });
      }
    }
  }
  return moves;
}
function applyMove(vehicles, move) {
  const clone = vehicles.map(v => ({ ...v }));
  clone[move.vIdx].r = move.r;
  clone[move.vIdx].c = move.c;
  return clone;
}
function isSolved(vehicles, dims) {
  const target = vehicles[0];
  return target.c + target.len - 1 === dims.cols - 1;
}

/* ── BFS solver (exhaustive, exact shortest-path length) ── */
function bfsShortest(vehicles, lockedCells, dims, depthCap) {
  const key = vs => vs.map(v => v.r + ',' + v.c).join('|');
  if (isSolved(vehicles, dims)) return 0;
  const seen = new Set([key(vehicles)]);
  let frontier = [vehicles];
  let depth = 0;
  while (frontier.length && depth < depthCap) {
    const next = [];
    for (const state of frontier) {
      for (const m of enumerateLegalMoves(state, lockedCells, dims)) {
        const moved = applyMove(state, m);
        const k = key(moved);
        if (seen.has(k)) continue;
        if (isSolved(moved, dims)) return depth + 1;
        seen.add(k);
        next.push(moved);
      }
    }
    frontier = next;
    depth++;
  }
  return null;
}

/* ── solved-layout construction ── */
function buildSolvedLayout(params, rng) {
  const { rows, cols, vehicleCount, truckCount } = params;
  const dims = { rows, cols };
  const exitRow = Math.floor(rows / 2);
  const target = { r: exitRow, c: cols - 2, len: 2, orient: 'h', color: 0 };
  const vehicles = [target];
  // Reserve the cell immediately left of the target so it's *guaranteed* at
  // least one legal move at the solved position. Without this, roughly half
  // of random deals happened to box the target in from the start (some
  // blocker landing on exactly that cell) — and since nothing forces that
  // specific blocker to move during scrambling, the target then never moves
  // at all, leaving the "scrambled" board still trivially solved.
  const reserved = new Set([cellKey(exitRow, cols - 3)]);

  const isTruck = Array(vehicleCount - 1).fill(false);
  for (let i = 0; i < truckCount; i++) isTruck[i] = true;
  const truckAssignment = shuffle(isTruck, rng);

  for (let k = 0; k < vehicleCount - 1; k++) {
    const len = truckAssignment[k] ? 3 : 2;
    let placed = false;
    for (let attempt = 0; attempt < 300 && !placed; attempt++) {
      const orient = rng() < 0.5 ? 'h' : 'v';
      const maxR = orient === 'h' ? rows - 1 : rows - len;
      const maxC = orient === 'h' ? cols - len : cols - 1;
      if (maxR < 0 || maxC < 0) continue;
      const r = Math.floor(rng() * (maxR + 1));
      const c = Math.floor(rng() * (maxC + 1));
      const cand = { r, c, len, orient, color: k + 1 };
      const occ = occupiedSet(vehicles, -1);
      const overlaps = vehicleCells(cand).some(([rr, cc]) => occ.has(cellKey(rr, cc)) || reserved.has(cellKey(rr, cc)));
      if (!overlaps) { vehicles.push(cand); placed = true; }
    }
    if (!placed) return null;
  }
  return { vehicles, dims, exitRow, reserved: [[exitRow, cols - 3]] };
}

/* ── bay-cell selection: from cells no vehicle covers, preferring
   lane-adjacent ones (same row as a horizontal vehicle / same column as a
   vertical vehicle — where extra room actually helps). `reserved` cells
   (the target's guaranteed escape cell) are never eligible — a bay cell can
   start locked, which would otherwise silently re-box the target that
   buildSolvedLayout specifically freed up. ── */
function chooseBayCells(vehicles, dims, bayTotal, rng, reserved) {
  const occ = occupiedSet(vehicles, -1);
  const reservedSet = new Set((reserved || []).map(([r, c]) => cellKey(r, c)));
  const blanks = [];
  for (let r = 0; r < dims.rows; r++)
    for (let c = 0; c < dims.cols; c++)
      if (!occ.has(cellKey(r, c)) && !reservedSet.has(cellKey(r, c))) blanks.push([r, c]);
  if (blanks.length < bayTotal) return null;

  const hRows = new Set(vehicles.filter(v => v.orient === 'h').map(v => v.r));
  const vCols = new Set(vehicles.filter(v => v.orient === 'v').map(v => v.c));
  const laneAdjacent = blanks.filter(([r, c]) => hRows.has(r) || vCols.has(c));
  const other = blanks.filter(([r, c]) => !(hRows.has(r) || vCols.has(c)));
  const candidates = [...shuffle(laneAdjacent, rng), ...shuffle(other, rng)];
  return candidates.slice(0, bayTotal);
}

/* ── scramble: real random legal moves from the solved layout, using only
   the free (first-4) bay cells as extra open space — this single fact is
   what guarantees "solvable using just the 4 default bays" ── */
function scramble(solvedVehicles, lockedCells, dims, depth, rng) {
  let state = solvedVehicles.map(v => ({ ...v }));
  let lastUndo = null; // {vIdx, r, c} we just came FROM — light anti-oscillation guard
  // With many vehicles, uniform-random move selection often never happens to
  // touch the target vehicle at all, leaving it sitting at the exit — the
  // "scrambled" board is then trivially still solved. Bias early steps
  // toward moving the target specifically, mirroring Water Sort's fix for
  // an analogous "some piece never gets touched by pure chance" bug.
  let targetMoved = false;
  for (let step = 0; step < depth; step++) {
    let moves = enumerateLegalMoves(state, lockedCells, dims);
    if (lastUndo) {
      const filtered = moves.filter(m => !(m.vIdx === lastUndo.vIdx && m.r === lastUndo.r && m.c === lastUndo.c));
      if (filtered.length) moves = filtered;
    }
    if (!moves.length) break;

    let pick = null;
    if (!targetMoved) {
      const targetMoves = moves.filter(m => m.vIdx === 0);
      if (targetMoves.length && rng() < 0.85) pick = targetMoves[Math.floor(rng() * targetMoves.length)];
    } else {
      // Once the target has moved away, pure random shuffling of the other
      // vehicles almost never happens to land one of them back in the
      // target's return path — nothing else drives them there. Without
      // this, minMoves ends up 1-2 almost every time (the target can just
      // slide straight back), no matter how long the scramble runs. Bias
      // toward moves that place a vehicle into the row between the target's
      // current position and the exit, which is what actually creates a
      // puzzle requiring the player to move something else first.
      const target = state[0];
      const blockingMoves = moves.filter(m => {
        if (m.vIdx === 0) return false;
        const hypothetical = applyMove(state, m);
        return vehicleCells(hypothetical[m.vIdx]).some(([rr, cc]) =>
          rr === target.r && cc >= target.c + target.len);
      });
      if (blockingMoves.length && rng() < 0.5) pick = blockingMoves[Math.floor(rng() * blockingMoves.length)];
    }
    if (!pick) pick = moves[Math.floor(rng() * moves.length)];
    if (pick.vIdx === 0) targetMoved = true;

    lastUndo = { vIdx: pick.vIdx, r: state[pick.vIdx].r, c: state[pick.vIdx].c };
    state = applyMove(state, pick);
  }
  return state;
}

/* ── per-level generation ── */
function generateLevel(i) {
  const params = levelParams(i);
  const wantCandidates = i >= 75 ? 8 : 1; // tier 6: pick the hardest of several accepted candidates
  const candidates = [];
  let attempts = 0;
  const maxAttempts = 20000;

  while (candidates.length < wantCandidates && attempts < maxAttempts) {
    attempts++;
    const rng = mulberry32(seedForLevel(i, attempts));

    const solved = buildSolvedLayout(params, rng);
    if (!solved) continue;
    const { vehicles, dims, exitRow, reserved } = solved;

    const bay = chooseBayCells(vehicles, dims, params.bayTotal, rng, reserved);
    if (!bay) continue;
    const lockedSet = new Set(bay.slice(4).map(([r, c]) => cellKey(r, c)));

    // Scramble depth is deliberately generous and decoupled from the target
    // moveMin/moveMax band — tying it tightly to the band (as an earlier
    // version did) starved the scramble of room to build up real difficulty.
    // A longer random walk gives the return-path-blocking bias in scramble()
    // more chances to fire; BFS grading below is what actually classifies
    // the result into a tier, not the scramble length itself.
    const scrambleDepth = 20 + Math.floor(rng() * 40);
    const startLayout = scramble(vehicles, lockedSet, dims, scrambleDepth, rng);
    if (isSolved(startLayout, dims)) continue;

    const minMoves = bfsShortest(startLayout, lockedSet, dims, 60);
    if (minMoves === null || minMoves < params.moveMin || minMoves > params.moveMax) continue;

    // opening more bays must never make the puzzle harder
    const minMovesAllOpen = bfsShortest(startLayout, new Set(), dims, 60);
    if (minMovesAllOpen === null || minMovesAllOpen > minMoves) continue;

    candidates.push({ layout: startLayout, bay, minMoves, dims, exitRow });
  }

  if (!candidates.length) return null;
  candidates.sort((a, b) => b.minMoves - a.minMoves);
  const chosen = candidates[0];
  return {
    g: [chosen.dims.rows, chosen.dims.cols],
    ex: chosen.exitRow,
    bay: chosen.bay,
    v: chosen.layout.map(v => [v.r, v.c, v.len, v.orient, v.color]),
    minMoves: chosen.minMoves,
  };
}

const PL_LEVEL_COUNT = 80;
const levels = [];
for (let i = 0; i < PL_LEVEL_COUNT; i++) {
  const t0 = Date.now();
  const result = generateLevel(i);
  if (!result) {
    console.error(`Level ${i}: FAILED — increase maxAttempts or loosen the difficulty table.`);
    process.exit(1);
  }
  console.log(`Level ${i}: OK (grid=${result.g.join('x')}, vehicles=${result.v.length}, bays=${result.bay.length}, minMoves=${result.minMoves}, ${Date.now() - t0}ms)`);
  levels.push({ g: result.g, ex: result.ex, bay: result.bay, v: result.v });
}

console.log('\n--- paste this over the PL_LEVELS line in js/parking.js ---\n');
console.log('const PL_LEVELS = ' + JSON.stringify(levels) + ';');
