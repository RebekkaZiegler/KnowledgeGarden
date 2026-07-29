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
// This script downloads nothing itself — point it at a JSON manifest of
// already-fetched local image files (see the SOURCES/manifest shape below)
// — and only PROVES + PRINTS the level descriptors; pasting them into
// js/mosaik.js's MS_PHOTO_LEVELS array is a manual step, same division of
// labor as generate-mosaik-levels.js.

const fs = require('fs');
const path = require('path');
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
// Photo levels use their own small per-image palette, never MS_COLORS, so
// there's no family grouping to speak of here — an IDENTITY colorFamily
// (each color index its own singleton family) is threaded through purely
// so this shares msTick's now family-aware match test mechanically;
// family(i) === i makes every comparison below behave exactly like plain
// exact-match, unchanged from before.
function simulateBeltClear(grid, rows, cols, slotCount, totalByColor, maxSimMs, maxDiscards) {
  const colorFamily = [...totalByColor.keys()].reduce((m, c) => (m[c] = c, m), []);
  const columns = msColumnsFromGrid(grid, rows, cols);
  const state = { columns, containers: [], cols, rows, colorFamily, beltSpeedColsPerSec: MS_BELT_SPEED_COLS_PER_SEC, collectIntervalMs: MS_COLLECT_INTERVAL_MS };
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
          color: bestColor, family: bestColor, // identity family — see colorFamily comment above
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

async function quantize(srcPath, crop) {
  let pipeline = sharp(srcPath);
  // Optional pre-crop ({left,top,width,height} in source pixels) — strips
  // off a legend/label margin BEFORE the resize's `fit:'cover'` square-crop
  // runs, so a source image that's mostly diagram + a text sidebar doesn't
  // have that sidebar dictate what gets cropped away (cover crops to fill
  // the target square from whatever aspect ratio it's handed).
  if (crop) pipeline = pipeline.extract(crop);
  const quantBuf = await pipeline
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

// Manifest-driven: a JSON array of {id, title, file, crop?} — crop is an
// optional {left,top,width,height} in the SOURCE image's own pixels, for
// diagrams that mix real illustration with a text legend/sidebar (see
// quantize's crop comment above). Replaces the original fixed 3-positional-
// argv interface once a 4th+ source was needed.
const manifestPath = process.argv[2];
if (!manifestPath) {
  console.error('Usage: node generate-mosaik-photo-levels.js <manifest.json>');
  console.error('  manifest.json: [{ "id": "...", "title": "...", "file": "path/to/image.png", "crop": {"left":0,"top":0,"width":700,"height":1122} }, ...]');
  process.exit(1);
}
const SOURCES = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

(async () => {
  const results = [];
  for (const src of SOURCES) {
    const { grid, rows, cols, palette } = await quantize(src.file, src.crop);
    const maxColors = palette.length;
    // Rough pre-check only (identity family mapping here, so maxFamilies
    // === maxColors) — scripts/redo-mosaik-db.js re-derives the real db
    // against the full family-aware mechanic once this is pasted into
    // MS_PHOTO_LEVELS, same as every other already-shipped level.
    const db = Math.max(1, maxColors - 1);
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

  if (!results.length) { console.log('\nNo levels cleared — nothing to write.'); return; }

  // Each level's baked `pixels` string is SIZE*SIZE hex chars (102,400 at
  // the current 320 resolution) — six figures' worth of that is well past
  // what's practical to print and hand-paste through an LLM context window,
  // unlike the original 3-image pilot. APPENDS to the existing
  // MS_PHOTO_LEVELS array in js/mosaik.js directly (never replaces —
  // already-shipped photo levels, and their already-baked `db`/`depot`,
  // are left untouched), same direct-file-splice approach
  // scripts/generate-mosaik-depot.js and scripts/redo-mosaik-db.js already
  // use for the exact same reason (baked data too large to paste by hand).
  const mosaikPath = path.join(__dirname, '../js/mosaik.js');
  let src = fs.readFileSync(mosaikPath, 'utf8');
  const photoRe = /const MS_PHOTO_LEVELS = (\[[\s\S]*?\n?\]);/;
  const m = src.match(photoRe);
  if (!m) { console.error('MS_PHOTO_LEVELS pattern did not match — aborting without writing.'); process.exit(1); }
  const existing = JSON.parse(m[1]);
  const combined = existing.concat(results);
  src = src.replace(photoRe, 'const MS_PHOTO_LEVELS = ' + JSON.stringify(combined) + ';');
  fs.writeFileSync(mosaikPath, src);
  console.log(`\nAppended ${results.length} new photo level(s) to MS_PHOTO_LEVELS in js/mosaik.js (${existing.length} -> ${combined.length} total). db/depot are provisional — rerun redo-mosaik-db.js then generate-mosaik-depot.js next, same as after any other level-set change.`);
})().catch(e => { console.error(e); process.exit(1); });
