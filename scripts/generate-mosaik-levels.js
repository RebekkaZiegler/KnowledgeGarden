// Generates the MS_LEVELS data baked into js/mosaik.js. Run this to
// reroll the pool or change the difficulty table; paste the printed
// `const MS_LEVELS = [...]` line over the existing one in js/mosaik.js.
//
// Unlike every prior version of this game, there's no pixel data to
// generate or store here — the scene-drawing templates live in
// js/mosaik.js itself (shared with the browser runtime), and a level is
// just {template, seed, g, db}: the exact same template function run with
// the same seed regenerates the identical grid deterministically,
// in-browser, at load time. This script's only real job is picking
// dimensions/colors that work and PROVING they work.
//
// "Proving they work" means simulating the real, continuous conveyor-belt
// mechanic via the actual shipped msTick function (fast-forwarded with a
// fixed time step, no real waiting), driven by a strategy that mirrors a
// real player: greedily fill free slots with whichever unassigned color is
// currently most exposed, and — when every slot is full, occupied by
// containers that have themselves stopped making progress (their color's
// exposure has dropped to 0, buried under something else), while a
// DIFFERENT color is sitting there exposed with nowhere to go — discard one
// stuck container to free its slot. This is not a generator-only trick: it
// mirrors js/mosaik.js's real msDiscardContainer (players earn discards by
// answering questions, capped at MS_MAX_DISCARDS_PER_LEVEL per level).
// db=maxColors always works trivially (nothing is ever unassigned to begin
// with), but the tight default (maxColors-2) genuinely deadlocks WITHOUT
// discarding — this was proven by testing several greedy pick orders before
// landing on "discard-when-stuck" as the one that matches how the real
// reference genre (Sandy Jam and kin) actually plays: a fixed, small slot
// count is the point, and recognizing + abandoning a dead pick is the skill.

const {
  MS_TEMPLATES, mulberry32, msColumnsFromGrid, msColorsInLevel,
  msOriginalColorTotals, msBucketCapacity, msExposedCount, msIsCleared, msTick,
  MS_BELT_SPEED_COLS_PER_SEC, MS_COLLECT_INTERVAL_MS, MS_MAX_DISCARDS_PER_LEVEL,
} = require('../js/mosaik.js');

function seedForLevel(levelIndex, salt) {
  return (Math.imul(levelIndex + 1, 2654435761) >>> 0) ^ Math.imul(salt + 1, 0x9e3779b9);
}

// Difficulty ramp: 80 levels, 6 tiers. PROVISIONAL — resolution grows from
// well above the old "10x10" complaint up to a genuinely large top tier;
// since levels are just a tiny descriptor now (no baked pixel data),
// resolution has no data-size cost, so it grows meaningfully across tiers.
function levelParams(levelIndex) {
  const table = [
    { max: 15, size: 260 },
    { max: 30, size: 290 },
    { max: 45, size: 320 },
    { max: 60, size: 350 },
    { max: 75, size: 380 },
    { max: 80, size: 410 },
  ];
  return table.find(t => levelIndex < t.max) || table[table.length - 1];
}
const TEMPLATE_NAMES = Object.keys(MS_TEMPLATES);

// Fast-forwarded simulation of the real belt mechanic via the actual
// shipped msTick — proves `slotCount` containers (plus up to
// MS_MAX_DISCARDS_PER_LEVEL discards) suffice. Fills EVERY currently-free
// slot each time it checks (not just one), and only re-checks "is there a
// free slot" (an O(picture size) scan when there is one) once every
// `checkEveryMs` of simulated time rather than on literally every tick, to
// stay fast even at large resolutions — collection is gradual (a fraction
// of a color's total per container), so a slot freeing up a little later
// than the instant it could have doesn't change whether the level is
// solvable, only the generator's own runtime.
function simulateBeltClear(grid, rows, cols, slotCount, totalByColor, maxSimMs, maxDiscards) {
  const columns = msColumnsFromGrid(grid, rows, cols);
  const state = { columns, containers: [], cols, beltSpeedColsPerSec: MS_BELT_SPEED_COLS_PER_SEC, collectIntervalMs: MS_COLLECT_INTERVAL_MS };
  // Must move less than 1 column per tick — msTick only ever checks the
  // column a container's FINAL position for the tick lands on, so a step
  // >= 1 column can skip columns, and at exactly 2 cols/tick (the old
  // dtMs=50 here) beltPos never lands on an odd column AT ALL, forever,
  // permanently hiding half the picture from every container. Real
  // gameplay never hits this (a 60fps frame moves under 1 col at this
  // belt speed), but this fast-forwarded simulation must pick its own
  // step size just as carefully.
  const dtMs = 10;
  const checkEveryMs = 1000;
  let elapsedMs = 0;
  let sinceCheck = checkEveryMs; // check immediately on the first iteration
  let placements = 0;
  let discards = 0;

  while (elapsedMs < maxSimMs) {
    if (sinceCheck >= checkEveryMs) {
      sinceCheck = 0;
      // Discard a stuck container (its color's exposure has hit 0 — it can
      // never collect again until something else exposes that color) to
      // free a slot for a color that's actually sitting there exposed with
      // nowhere to go. Mirrors the real player action; capped like the
      // real per-level discard budget.
      let freedSomething = true;
      while (freedSomething) {
        freedSomething = false;
        if (state.containers.length < slotCount || discards >= maxDiscards) break;
        const activeColors = new Set(state.containers.map(c => c.color));
        const waitingColor = [...new Set(state.columns.flat())]
          .find(c => !activeColors.has(c) && msExposedCount(state.columns, c) > 0);
        if (waitingColor == null) break; // no unassigned color needs a slot right now — nothing to fix
        const stuckIdx = state.containers.findIndex(c => msExposedCount(state.columns, c.color) === 0);
        if (stuckIdx === -1) break; // every active container is still making progress — genuinely full, not stuck
        state.containers.splice(stuckIdx, 1);
        discards++;
        freedSomething = true;
      }
      while (state.containers.length < slotCount) {
        const activeColors = new Set(state.containers.map(c => c.color));
        // Pick by CURRENTLY EXPOSED count, not total-anywhere-in-picture —
        // a color that's still fully buried under other colors can't make
        // any progress yet no matter how large its total is, and handing
        // it a slot anyway just permanently starves whichever small color
        // actually sits at some column's bottom right now (see js/mosaik.js's
        // msExposedCount doc comment for the deadlock this caused).
        let bestColor = null, bestExposed = -1;
        for (const color of new Set(state.columns.flat())) {
          if (activeColors.has(color)) continue;
          const exposed = msExposedCount(state.columns, color);
          if (exposed > bestExposed) { bestExposed = exposed; bestColor = color; }
        }
        if (bestColor == null || bestExposed === 0) break; // no currently-reachable, unassigned color right now
        state.containers.push({ color: bestColor, capacity: msBucketCapacity(totalByColor.get(bestColor)), filled: 0, beltPos: 0, msSinceCollect: 0 });
        placements++;
      }
    }
    msTick(state, dtMs);
    elapsedMs += dtMs;
    sinceCheck += dtMs;
    if (msIsCleared(state.columns)) return { cleared: true, elapsedMs, placements, discards };
  }
  return { cleared: false, elapsedMs, placements, discards };
}

function generateLevel(i) {
  const params = levelParams(i);
  const templateName = TEMPLATE_NAMES[i % TEMPLATE_NAMES.length];
  const maxAttempts = 20;
  const maxSimMs = 8 * 60 * 60 * 1000; // 8 simulated hours — generous; a real player has a whole level's lifetime, not a real-time deadline
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const seed = seedForLevel(i, attempt);
    const grid = MS_TEMPLATES[templateName](params.size, params.size, mulberry32(seed));
    const maxColors = msColorsInLevel(grid).length;
    if (maxColors < 3) continue; // degenerate — needs real color variety for a real puzzle
    const totalByColor = msOriginalColorTotals(grid);
    const db = Math.max(1, maxColors - 2);

    const sim = simulateBeltClear(grid, params.size, params.size, db, totalByColor, maxSimMs, MS_MAX_DISCARDS_PER_LEVEL);
    if (!sim.cleared) continue; // db insufficient even with the full discard budget for this seed — reroll

    return {
      level: { template: templateName, seed, g: [params.size, params.size], db },
      attempt, maxColors, placements: sim.placements, discards: sim.discards,
      simSeconds: Math.round(sim.elapsedMs / 1000),
    };
  }
  return null;
}

const MS_LEVEL_COUNT_TARGET = 80;
const levels = [];
for (let i = 0; i < MS_LEVEL_COUNT_TARGET; i++) {
  const t0 = Date.now();
  const result = generateLevel(i);
  const ms = Date.now() - t0;
  if (!result) {
    console.error(`Level ${i}: FAILED after max attempts.`);
    process.exit(1);
  }
  console.log(`Level ${i}: OK (template=${result.level.template}, size=${result.level.g.join('x')}, maxColors=${result.maxColors}, db=${result.level.db}, placements=${result.placements}, discards=${result.discards}, simSeconds=${result.simSeconds}, attempt=${result.attempt}, ${ms}ms)`);
  levels.push(result.level);
}

console.log('\n--- paste this over the MS_LEVELS line in js/mosaik.js ---\n');
console.log('const MS_LEVELS = ' + JSON.stringify(levels) + ';');
