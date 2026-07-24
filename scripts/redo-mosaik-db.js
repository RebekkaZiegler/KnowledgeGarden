// Re-derives `db` for every already-shipped Mosaik level (procedural +
// photo) under the CURRENT belt-collection mechanics (msTick's half-circle
// reach, msBucketCapacity's uniform-per-level capacity), WITHOUT touching
// picture content at all — `template`/`seed`/`g` (procedural) and
// `pixels`/`palette`/`g` (photo) are carried over exactly as shipped, only
// `db` changes. Used when the underlying belt mechanics themselves change
// and existing db values need re-proving, not the pictures regenerated —
// this doesn't need the original photo source images since it works
// entirely from already-baked MS_LEVELS data via the real msGenerateLevel
// (which decodes photo `pixels` or re-runs the procedural template+seed
// exactly like the browser does).
//
// Same "prove via fast-forwarded simulation" strategy as
// scripts/generate-mosaik-levels.js's simulateBeltClear (own copy, per
// this codebase's established each-script-owns-its-replay-loop
// discipline), but requires CONFIRM_TRIALS independent clears at a
// candidate db before accepting it — msTick collects probabilistically via
// real (unseeded) Math.random(), so a single successful run doesn't prove
// robustness (see scripts/generate-mosaik-depot.js's header for the
// empirical case that motivated this: one accepted layout only actually
// cleared 2 of 8 independent re-runs).
//
// This ALSO leaves the shipped `depot` field on every entry untouched —
// it's now stale (built for the old db/capacity/reach), but that's fine:
// scripts/generate-mosaik-depot.js overwrites `depot` completely on its
// next run regardless of whatever was there before, so no separate
// clearing step is needed here.

const fs = require('fs');
const path = require('path');
const {
  MS_LEVELS, MS_LEVEL_COUNT, msGenerateLevel, msColumnsFromGrid,
  msOriginalColorTotals, msBucketCapacity, msExposedCount, msColorTotalCount, msIsCleared, msTick,
  MS_BELT_SPEED_COLS_PER_SEC, MS_COLLECT_INTERVAL_MS, MS_MAX_DISCARDS_PER_LEVEL,
} = require('../js/mosaik.js');

function simulateBeltClear(grid, rows, cols, slotCount, totalByColor, maxSimMs, maxDiscards) {
  const columns = msColumnsFromGrid(grid, rows, cols);
  const state = { columns, containers: [], cols, rows, beltSpeedColsPerSec: MS_BELT_SPEED_COLS_PER_SEC, collectIntervalMs: MS_COLLECT_INTERVAL_MS };
  const dtMs = 10; // must stay under 1 column/tick at this belt speed — see js/mosaik.js's msTick doc
  const checkEveryMs = 1000;
  let elapsedMs = 0, sinceCheck = checkEveryMs, placements = 0, discards = 0;
  const levelCapacity = msBucketCapacity(grid.length); // uniform for every color in this level

  while (elapsedMs < maxSimMs) {
    if (sinceCheck >= checkEveryMs) {
      sinceCheck = 0;
      let freedSomething = true;
      while (freedSomething) {
        freedSomething = false;
        if (state.containers.length < slotCount || discards >= maxDiscards) break;
        const activeColors = new Set(state.containers.map(c => c.color));
        const waitingColor = [...new Set(state.columns.flat())]
          .find(c => !activeColors.has(c) && msExposedCount(state.columns, c) > 0);
        if (waitingColor == null) break;
        const stuckIdx = state.containers.findIndex(c => msExposedCount(state.columns, c.color) === 0);
        if (stuckIdx === -1) break;
        state.containers.splice(stuckIdx, 1);
        discards++;
        freedSomething = true;
      }
      while (state.containers.length < slotCount) {
        const activeColors = new Set(state.containers.map(c => c.color));
        let bestColor = null, bestExposed = -1;
        for (const color of new Set(state.columns.flat())) {
          if (activeColors.has(color)) continue;
          const exposed = msExposedCount(state.columns, color);
          if (exposed > bestExposed) { bestExposed = exposed; bestColor = color; }
        }
        if (bestColor == null || bestExposed === 0) break;
        state.containers.push({ color: bestColor, capacity: Math.min(levelCapacity, msColorTotalCount(state.columns, bestColor)), filled: 0, beltPos: 0, msSinceCollect: 0 });
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

function provenSufficient(grid, rows, cols, slotCount, totalByColor, maxSimMs, maxDiscards, trials) {
  for (let t = 0; t < trials; t++) {
    if (!simulateBeltClear(grid, rows, cols, slotCount, totalByColor, maxSimMs, maxDiscards).cleared) return false;
  }
  return true;
}

const CONFIRM_TRIALS = 5;
const maxSimMs = 8 * 60 * 60 * 1000;
const results = [];
for (let i = 0; i < MS_LEVEL_COUNT; i++) {
  const t0 = Date.now();
  const level = msGenerateLevel(i);
  const totalByColor = msOriginalColorTotals(level.grid);
  let db = Math.max(1, level.maxColors - 2);
  let proven = false;
  while (db <= level.maxColors) {
    if (provenSufficient(level.grid, level.rows, level.cols, db, totalByColor, maxSimMs, MS_MAX_DISCARDS_PER_LEVEL, CONFIRM_TRIALS)) { proven = true; break; }
    db++;
  }
  if (!proven) {
    console.error(`Level ${i}: FAILED — even db=maxColors (${level.maxColors}) didn't clear ${CONFIRM_TRIALS}/${CONFIRM_TRIALS} trials.`);
    process.exit(1);
  }
  console.log(`Level ${i}: db=${db} (maxColors=${level.maxColors}, ${Date.now() - t0}ms)`);
  results.push(db);
}

const mosaikPath = path.join(__dirname, '../js/mosaik.js');
let src = fs.readFileSync(mosaikPath, 'utf8');
const generatedCount = MS_LEVELS.filter(l => l.template).length;
const generatedWithDb = MS_LEVELS.slice(0, generatedCount).map((l, i) => Object.assign({}, l, { db: results[i] }));
const photoWithDb = MS_LEVELS.slice(generatedCount).map((l, i) => Object.assign({}, l, { db: results[generatedCount + i] }));

const genRe = /const MS_LEVELS_GENERATED = \[[\s\S]*?\n?\];/;
const photoRe = /const MS_PHOTO_LEVELS = \[[\s\S]*?\n?\];/;
if (!genRe.test(src)) { console.error('MS_LEVELS_GENERATED pattern did not match — aborting without writing.'); process.exit(1); }
if (!photoRe.test(src)) { console.error('MS_PHOTO_LEVELS pattern did not match — aborting without writing.'); process.exit(1); }
src = src.replace(genRe, 'const MS_LEVELS_GENERATED = ' + JSON.stringify(generatedWithDb) + ';');
src = src.replace(photoRe, 'const MS_PHOTO_LEVELS = ' + JSON.stringify(photoWithDb) + ';');
fs.writeFileSync(mosaikPath, src);
console.log(`\nWrote updated db for ${results.length} levels into js/mosaik.js (depot fields left stale — rerun generate-mosaik-depot.js next).`);
