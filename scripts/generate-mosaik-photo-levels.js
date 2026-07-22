// Generates MS_PHOTO_LEVELS entries for js/mosaik.js from real (public-
// domain) source images — the counterpart to generate-mosaik-levels.js's
// procedural templates. Unlike procedural levels (a tiny {template,seed}
// descriptor regenerated deterministically at load time), a real photo has
// no formula to regenerate from, so its quantized pixel grid is baked
// directly into the level descriptor as a compact string (one hex digit
// per pixel, 0-15 — see msDecodePixels in js/mosaik.js) along with its OWN
// small RGB palette (real art doesn't fit the shared 16-color fantasy
// palette used by the procedural templates).
//
// Quantizing a real photo/painting straight down to 16 colors produces far
// noisier column data than the hand-tuned procedural templates (average
// same-color run ~2px vs ~30-65px — confirmed by direct measurement), and
// about 2 in 3 test images failed to clear within the discard budget as a
// result. A light Gaussian blur BEFORE quantizing fixes this by merging
// tiny scattered regions into the kind of contiguous blobs the belt
// mechanic expects, without visibly hurting recognizability at this
// resolution — confirmed empirically: all 3 pilot images (Hokusai's Great
// Wave and Red Fuji, Van Gogh's Starry Night) went from 2/3 failing to 3/3
// clearing cleanly (2-8 discards) once blurred pre-quantization was added.
//
// This script downloads nothing itself — point it at already-fetched local
// image files (see SOURCES below) — and only PROVES + PRINTS the level
// descriptors; pasting them into js/mosaik.js's MS_PHOTO_LEVELS array is a
// manual step, same division of labor as generate-mosaik-levels.js.

const sharp = require('sharp');
const {
  msColumnsFromGrid, msOriginalColorTotals, msBucketCapacity, msExposedCount,
  msColorTotalCount, msIsCleared, msTick,
  MS_BELT_SPEED_COLS_PER_SEC, MS_COLLECT_INTERVAL_MS, MS_MAX_DISCARDS_PER_LEVEL,
} = require('../js/mosaik.js');

const SIZE = 320;       // matches the mid-tier procedural resolution
const COLORS = 16;      // must stay <=16 — msDecodePixels is one hex digit per pixel
const BLUR_SIGMA = 5;   // see file header — the fix for real-photo noise

// Fast-forwarded belt-clear proof, identical strategy to
// generate-mosaik-levels.js's simulateBeltClear (kept as its own copy per
// this codebase's existing convention of each script owning its replay
// loop, so a bug in one script's strategy can't silently pass in another).
function simulateBeltClear(grid, rows, cols, slotCount, totalByColor, maxSimMs, maxDiscards) {
  const columns = msColumnsFromGrid(grid, rows, cols);
  const state = { columns, containers: [], cols, rows, beltSpeedColsPerSec: MS_BELT_SPEED_COLS_PER_SEC, collectIntervalMs: MS_COLLECT_INTERVAL_MS };
  const dtMs = 10;
  const checkEveryMs = 1000;
  let elapsedMs = 0, sinceCheck = checkEveryMs, placements = 0, discards = 0;

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
        state.containers.push({
          color: bestColor,
          capacity: Math.min(msBucketCapacity(totalByColor.get(bestColor)), msColorTotalCount(state.columns, bestColor)),
          filled: 0, beltPos: 0, msSinceCollect: 0,
        });
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

function rgbToHex([r, g, b]) {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

async function quantize(srcPath) {
  const quantBuf = await sharp(srcPath)
    .resize(SIZE, SIZE, { fit: 'cover' })
    .blur(BLUR_SIGMA)
    .png({ palette: true, colours: COLORS, dither: 0 })
    .toBuffer();
  const { data, info } = await sharp(quantBuf).raw().ensureAlpha().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;
  const paletteMap = new Map(); // "r,g,b" -> index
  const palette = [];
  const grid = new Array(w * h);
  for (let i = 0; i < w * h; i++) {
    const o = i * 4;
    const key = `${data[o]},${data[o + 1]},${data[o + 2]}`;
    let idx = paletteMap.get(key);
    if (idx === undefined) {
      idx = palette.length;
      palette.push([data[o], data[o + 1], data[o + 2]]);
      paletteMap.set(key, idx);
    }
    grid[i] = idx;
  }
  if (palette.length > 16) throw new Error(`${srcPath}: quantized to ${palette.length} colors, exceeds the 16-color/1-hex-digit encoding`);
  return { grid, rows: h, cols: w, palette };
}

const SOURCES = [
  { id: 'grosse_welle', title: 'Die große Welle vor Kanagawa — Hokusai', file: process.argv[2] },
  { id: 'roter_fuji', title: 'Roter Fuji — Hokusai', file: process.argv[3] },
  { id: 'sternennacht', title: 'Sternennacht — Van Gogh', file: process.argv[4] },
].filter(s => s.file);

if (!SOURCES.length) {
  console.error('Usage: node generate-mosaik-photo-levels.js <great_wave.jpg> <red_fuji.jpg> <starry_night.jpg>');
  process.exit(1);
}

(async () => {
  const results = [];
  for (const src of SOURCES) {
    const { grid, rows, cols, palette } = await quantize(src.file);
    const maxColors = palette.length;
    const db = Math.max(1, maxColors - 2);
    const totalByColor = msOriginalColorTotals(grid);
    const maxSimMs = 8 * 60 * 60 * 1000;
    const sim = simulateBeltClear(grid, rows, cols, db, totalByColor, maxSimMs, MS_MAX_DISCARDS_PER_LEVEL);
    console.log(`${src.id}: cleared=${sim.cleared} maxColors=${maxColors} db=${db} placements=${sim.placements} discards=${sim.discards}`);
    if (!sim.cleared) {
      console.error(`  FAILED to clear within budget — reroll blur/color settings for this image.`);
      continue;
    }
    const pixels = grid.map(v => v.toString(16)).join('');
    results.push({
      id: src.id, title: src.title, g: [rows, cols], db,
      palette: palette.map(rgbToHex), pixels,
    });
  }

  console.log('\n--- paste into MS_PHOTO_LEVELS in js/mosaik.js ---\n');
  console.log('const MS_PHOTO_LEVELS = [');
  for (const r of results) {
    console.log(`  { id: ${JSON.stringify(r.id)}, title: ${JSON.stringify(r.title)}, g: [${r.g[0]}, ${r.g[1]}], db: ${r.db},`);
    console.log(`    palette: ${JSON.stringify(r.palette)},`);
    console.log(`    pixels: ${JSON.stringify(r.pixels)} },`);
  }
  console.log('];');
})().catch(e => { console.error(e); process.exit(1); });
