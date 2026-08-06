// Builds FR_LEVELS in js/fresko.js by downsampling Mosaik's own baked
// artwork (MS_LEVELS, js/mosaik.js) down to a much coarser grid — Fresko
// reuses the exact same already-vetted, already-quantized picture content
// (public-domain sources only, per js/mosaik.js's header) rather than
// sourcing anything new, just at "fewer pixels" resolution. Each coarse
// cell is a majority vote over the block of original cells it covers (a
// proportional partition, not a fixed block size, so it lands on FR_SIDE
// exactly regardless of the source grid's own dimensions) — this keeps the
// SAME palette array valid unchanged (coarse cells only ever pick colors
// that were already present in the source), just some entries may end up
// unused, which every family/color helper already tolerates (they derive
// "colors actually in this level" from the grid's real content, never by
// iterating the full palette array).
//
// This is stage one of two (mirrors Mosaik's own generate-mosaik-photo-
// levels.js -> generate-mosaik-depot.js split): this script only fills in
// g/palette/pixels/db/title. scripts/generate-fresko-depot.js adds `depot`
// in a second pass, exactly like Mosaik's.

const fs = require('fs');
const path = require('path');
const { MS_LEVELS, MS_LEVEL_COUNT, msGenerateLevel } = require('../js/mosaik.js');

// Target side length of the coarse (downsampled) square grid — Mosaik's own
// pictures are always square (g:[N,N], per js/mosaik.js's header), so one
// side covers both axes. Deliberately much smaller than Mosaik's own
// MIN_GRID_SIDE=150 sanity floor — "fewer pixels" is the entire point here.
const FR_SIDE = 20;

function poolGrid(grid, side, targetSide) {
  const out = new Array(targetSide * targetSide);
  for (let nr = 0; nr < targetSide; nr++) {
    const r0 = Math.floor(nr * side / targetSide), r1 = Math.floor((nr + 1) * side / targetSide);
    for (let nc = 0; nc < targetSide; nc++) {
      const c0 = Math.floor(nc * side / targetSide), c1 = Math.floor((nc + 1) * side / targetSide);
      const counts = new Map();
      for (let r = r0; r < r1; r++) {
        for (let c = c0; c < c1; c++) {
          const v = grid[r * side + c];
          counts.set(v, (counts.get(v) || 0) + 1);
        }
      }
      let best = null, bestN = -1;
      for (const [v, n] of counts) if (n > bestN) { bestN = n; best = v; }
      out[nr * targetSide + nc] = best;
    }
  }
  return out;
}

function buildLevel(levelIndex) {
  const level = msGenerateLevel(levelIndex);
  const raw = MS_LEVELS[levelIndex];
  if (level.rows !== level.cols) throw new Error(`Level ${levelIndex} isn't square (${level.rows}x${level.cols}) — pooling assumes it is.`);

  const grid = poolGrid(level.grid, level.rows, FR_SIDE);
  const maxFamilies = new Set(grid).size; // identity color-family mapping, same as js/mosaik.js's msGenerateLevel
  const db = Math.max(1, maxFamilies - 1); // same formula as scripts/generate-mosaik-photo-levels.js
  const pixels = grid.map(v => v.toString(16)).join('');

  return { g: [FR_SIDE, FR_SIDE], palette: level.paletteHex, pixels, db, title: raw.title || null };
}

function main() {
  const results = [];
  for (let i = 0; i < MS_LEVEL_COUNT; i++) {
    const lvl = buildLevel(i);
    console.log(`Level ${i}: OK (title=${lvl.title}, maxFamilies=${new Set(msGenerateLevel(i).grid).size}, coarseColors=${new Set([...lvl.pixels].map(c => parseInt(c, 16))).size}, db=${lvl.db})`);
    results.push(lvl);
  }

  const freskoPath = path.join(__dirname, '../js/fresko.js');
  let src = fs.readFileSync(freskoPath, 'utf8');
  const re = /const FR_LEVELS = \[[\s\S]*?\n?\];/;
  if (!re.test(src)) { console.error('const FR_LEVELS = [...]; pattern did not match — aborting without writing.'); process.exit(1); }
  src = src.replace(re, 'const FR_LEVELS = ' + JSON.stringify(results) + ';');
  fs.writeFileSync(freskoPath, src);
  console.log(`\nWrote ${results.length} levels into js/fresko.js. Run scripts/generate-fresko-depot.js next.`);
}

if (require.main === module) {
  main();
} else {
  module.exports = { poolGrid, buildLevel, FR_SIDE };
}
