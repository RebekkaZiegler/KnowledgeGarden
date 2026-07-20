// Generates the PL_LEVELS data baked into js/parking.js. Run this to reroll
// the pool or change the difficulty table; paste the printed
// `const PL_LEVELS = [...]` line over the existing one in js/parking.js.
//
// Method: CONSTRUCTIVE, not deal-and-reject. Cars here are strictly binary
// (parked/released, never reposition), so the state graph is a DAG and
// every solution takes exactly carCount releases — there's no "shortest
// path" to hunt for the way Rush Hour needed. Instead:
//   1. Place carCount cars randomly with random exit directions; reject via
//      a cheap O(n^2) greedy peel (repeatedly release any currently
//      unblocked car, ignoring bays) if the layout can never be fully
//      cleared in any order — no search needed for this check.
//   2. Assign each car a random color/seat count.
//   3. Forward-SIMULATE a valid playthrough at bayLimit = db (the level's
//      default bay count), at each step either releasing a currently
//      unblocked car (if a bay is free) or "boarding" a passenger for a
//      currently open bay color — recording the passenger queue as it's
//      built. Both this construction and the real runtime break ties via
//      the exact same plLowestOpenSlotForColor, so the result is provably
//      solvable at db bays by construction, not by hope.
//   4. Independently re-verify with the real DFS solver (js/parking.js's
//      plSolve) before accepting anyway — catches construction bugs, not
//      just theoretical soundness (the top lesson from this app's prior two
//      generated mini-games).
//   5. Grade difficulty via solutionCount (capped enumeration) and
//      minRequiredBays (smallest bayLimit with any solution at all).

const {
  plIsBlocked, plFirstEmptyBaySlot, plLowestOpenSlotForColor,
  plReleaseCar, plIsWon, plSolve,
} = require('../js/parking.js');

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
// below (construction success rate + solver timing printed per level);
// loosened from the plan's first draft where a tier didn't hold up.
function levelParams(levelIndex) {
  const table = [
    { max: 15, rows: 4, cols: 4, carCount: 4,  numColors: 2, seatsMin: 2, seatsMax: 2, db: 1 },
    { max: 30, rows: 5, cols: 5, carCount: 6,  numColors: 3, seatsMin: 2, seatsMax: 3, db: 2 },
    { max: 45, rows: 5, cols: 5, carCount: 8,  numColors: 4, seatsMin: 2, seatsMax: 3, db: 2 },
    { max: 60, rows: 6, cols: 6, carCount: 10, numColors: 5, seatsMin: 2, seatsMax: 3, db: 3 },
    { max: 75, rows: 6, cols: 6, carCount: 12, numColors: 6, seatsMin: 2, seatsMax: 4, db: 3 },
    { max: 80, rows: 7, cols: 7, carCount: 14, numColors: 7, seatsMin: 2, seatsMax: 4, db: 4 },
  ];
  return table.find(t => levelIndex < t.max) || table[table.length - 1];
}

/* ── Step 1: place cars, reject via cheap greedy peel (blocking-only,
   ignoring bays entirely — removing parked cars only ever removes
   blockers, so any release order that clears the peel clears the board) ── */
function placeCars(params, rng) {
  const { rows, cols, carCount } = params;
  const cells = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cells.push([r, c]);
  // Fisher-Yates
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }
  const cars = cells.slice(0, carCount).map(([r, c]) => ({ r, c, dir: Math.floor(rng() * 4) }));

  // greedy peel
  const parked = new Set(cars.map((_, i) => i));
  let progress = true;
  while (progress && parked.size) {
    progress = false;
    for (const i of [...parked]) {
      const mask = maskOf(parked, cars.length);
      if (!plIsBlocked(cars, mask, i)) { parked.delete(i); progress = true; }
    }
  }
  if (parked.size > 0) return null; // some cars block each other forever — discard

  return cars;
}
function maskOf(set, n) {
  let mask = 0;
  for (const i of set) mask |= (1 << i);
  return mask >>> 0;
}

/* ── Step 2: assign colors/seats ── */
function assignColorsAndSeats(cars, params, rng) {
  return cars.map(car => ({
    ...car,
    color: Math.floor(rng() * params.numColors),
    seats: params.seatsMin + Math.floor(rng() * (params.seatsMax - params.seatsMin + 1)),
  }));
}

/* ── Step 3: constructive forward simulation — builds a release order AND
   its exact matching passenger queue together, correct by construction ── */
function constructLevel(cars, db, rng, releaseBias) {
  const maxBays = new Set(cars.map(c => c.color)).size;
  let parked = new Set(cars.map((_, i) => i));
  const bayCar = Array(maxBays).fill(null), bayFilled = Array(maxBays).fill(0);
  const order = [], queue = [];
  let guard = 0;
  while (parked.size > 0 || bayCar.some(c => c != null)) {
    if (++guard > 10000) return null; // pathological loop guard
    const mask = maskOf(parked, cars.length);
    const releasable = [...parked].filter(i =>
      !plIsBlocked(cars, mask, i) && plFirstEmptyBaySlot(bayCar, db) !== -1);
    const openColors = [...new Set(bayCar.filter(c => c != null).map(i => cars[i].color))];

    if (!releasable.length && !openColors.length) {
      if (parked.size > 0) return null; // genuine bay-pressure dead end — retry with new seed
      break;
    }

    const doRelease = releasable.length && (!openColors.length || rng() < releaseBias);
    if (doRelease) {
      const idx = releasable[Math.floor(rng() * releasable.length)];
      const slot = plFirstEmptyBaySlot(bayCar, db);
      bayCar[slot] = idx; bayFilled[slot] = 0;
      parked.delete(idx); order.push(idx);
    } else {
      const color = openColors[Math.floor(rng() * openColors.length)];
      queue.push(color);
      const slot = plLowestOpenSlotForColor(cars, bayCar, bayFilled, color); // SAME tie-break fn as runtime
      bayFilled[slot]++;
      if (bayFilled[slot] === cars[bayCar[slot]].seats) { bayCar[slot] = null; bayFilled[slot] = 0; }
    }
  }
  return { order, queue, maxBays };
}

/* ── replay a constructed order+queue through the real runtime functions,
   confirming it independently reaches plIsWon (defensive double-check,
   catches construction bugs even though the design is correct by
   construction) ── */
function replayReachesWin(cars, queue, db, maxBays, order) {
  let state = { parkedMask: (1 << cars.length) - 1, bayCar: Array(maxBays).fill(null), bayFilled: Array(maxBays).fill(0), queuePos: 0 };
  for (const idx of order) {
    const next = plReleaseCar(cars, queue, state, db, idx);
    if (!next) return false;
    state = next;
  }
  return plIsWon(state);
}

/* ── per-level generation ── */
function generateLevel(i) {
  const params = levelParams(i);
  const maxAttempts = 4000;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const rng = mulberry32(seedForLevel(i, attempt));

    const placed = placeCars(params, rng);
    if (!placed) continue;
    const cars = assignColorsAndSeats(placed, params, rng);

    const releaseBias = 0.4 + rng() * 0.2; // ~0.4-0.6
    const built = constructLevel(cars, params.db, rng, releaseBias);
    if (!built) continue;
    const { order, queue, maxBays } = built;

    if (!replayReachesWin(cars, queue, params.db, maxBays, order)) continue;

    const verify = plSolve(cars, queue, params.db, maxBays, 'exists', 1, 200000);
    if (verify.aborted || !verify.solvable) continue;

    // difficulty grading (best-effort — never rejects a level, budgeted so
    // a hard-to-enumerate level doesn't stall the whole generation run)
    const graded = plSolve(cars, queue, params.db, maxBays, 'count', 200, 200000);
    let minRequiredBays = params.db;
    for (let b = 1; b < params.db; b++) {
      const r = plSolve(cars, queue, b, maxBays, 'exists', 1, 50000);
      if (!r.aborted && r.solvable) { minRequiredBays = b; break; }
    }

    return {
      level: {
        g: [params.rows, params.cols],
        db: params.db,
        cars: cars.map(c => [c.r, c.c, c.dir, c.color, c.seats]),
        q: queue,
      },
      attempt,
      solutionCount: graded.aborted ? '200+(aborted)' : graded.solutionCount,
      minRequiredBays,
    };
  }
  return null;
}

const PL_LEVEL_COUNT_TARGET = 80;
const levels = [];
let totalMs = 0;
for (let i = 0; i < PL_LEVEL_COUNT_TARGET; i++) {
  const t0 = Date.now();
  const result = generateLevel(i);
  const ms = Date.now() - t0;
  totalMs += ms;
  if (!result) {
    console.error(`Level ${i}: FAILED after max attempts — loosen the difficulty table for this tier.`);
    process.exit(1);
  }
  console.log(`Level ${i}: OK (grid=${result.level.g.join('x')}, cars=${result.level.cars.length}, db=${result.level.db}, attempt=${result.attempt}, solutionCount=${result.solutionCount}, minRequiredBays=${result.minRequiredBays}, ${ms}ms)`);
  levels.push(result.level);
}
console.log(`\nTotal generation time: ${totalMs}ms`);

console.log('\n--- paste this over the PL_LEVELS line in js/parking.js ---\n');
console.log('const PL_LEVELS = ' + JSON.stringify(levels) + ';');
