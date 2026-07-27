// Shrinks every already-baked MS_PHOTO_LEVELS entry to TARGET_SIZE per
// side, in place — no source images needed (the originals for 3 of the 5
// aren't kept around locally), since this works directly off the
// already-quantized/baked `pixels` grid: each target cell samples a block
// of the CURRENT grid and takes the most common palette index in that
// block (categorical "mode" downsampling, not pixel averaging — averaging
// RGB then re-quantizing risks producing colors outside the existing
// palette; sampling an already-discrete index never does). `palette`
// itself is untouched. `db` is NOT re-derived here — run
// scripts/redo-mosaik-db.js afterward for that (same as after any other
// picture-content change), then scripts/generate-mosaik-depot.js for
// depot layouts.

const fs = require('fs');
const path = require('path');
const { MS_LEVELS } = require('../js/mosaik.js');

const TARGET_SIZE = 200;

function decodePixels(hex) {
  const grid = new Array(hex.length);
  for (let i = 0; i < hex.length; i++) grid[i] = parseInt(hex[i], 16);
  return grid;
}
function encodePixels(grid) {
  return grid.map(v => v.toString(16)).join('');
}

function downsampleGrid(grid, rows, cols, targetRows, targetCols) {
  const out = new Array(targetRows * targetCols);
  for (let tr = 0; tr < targetRows; tr++) {
    const r0 = Math.floor((tr / targetRows) * rows);
    const r1 = Math.max(r0 + 1, Math.floor(((tr + 1) / targetRows) * rows));
    for (let tc = 0; tc < targetCols; tc++) {
      const c0 = Math.floor((tc / targetCols) * cols);
      const c1 = Math.max(c0 + 1, Math.floor(((tc + 1) / targetCols) * cols));
      const counts = new Map();
      for (let r = r0; r < r1; r++) {
        for (let c = c0; c < c1; c++) {
          const v = grid[r * cols + c];
          counts.set(v, (counts.get(v) || 0) + 1);
        }
      }
      let bestV = 0, bestN = -1;
      for (const [v, n] of counts) if (n > bestN) { bestN = n; bestV = v; }
      out[tr * targetCols + tc] = bestV;
    }
  }
  return out;
}

const photoLevels = MS_LEVELS.filter(l => !l.template);
const downsampled = photoLevels.map(level => {
  const [rows, cols] = level.g;
  const grid = decodePixels(level.pixels);
  const newGrid = downsampleGrid(grid, rows, cols, TARGET_SIZE, TARGET_SIZE);
  console.log(`${level.id}: ${rows}x${cols} -> ${TARGET_SIZE}x${TARGET_SIZE}`);
  return Object.assign({}, level, { g: [TARGET_SIZE, TARGET_SIZE], pixels: encodePixels(newGrid) });
});

const mosaikPath = path.join(__dirname, '../js/mosaik.js');
let src = fs.readFileSync(mosaikPath, 'utf8');
const photoRe = /const MS_PHOTO_LEVELS = \[[\s\S]*?\n?\];/;
if (!photoRe.test(src)) { console.error('MS_PHOTO_LEVELS pattern did not match — aborting without writing.'); process.exit(1); }
src = src.replace(photoRe, 'const MS_PHOTO_LEVELS = ' + JSON.stringify(downsampled) + ';');
fs.writeFileSync(mosaikPath, src);
console.log(`\nWrote downsampled pixel data for ${downsampled.length} photo levels into js/mosaik.js.`);
