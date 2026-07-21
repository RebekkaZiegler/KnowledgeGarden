// Generates both the MS_LEVELS data baked into js/mosaik.js AND the
// reference PNG images in assets/images/mosaik/ (one per level, a real
// image at real pixel resolution — at least 300x300 — shown as the
// "goal" photo the player is digging the picture out of). Run this to
// reroll the pool; paste the printed `const MS_LEVELS = [...]` line over
// the existing one in js/mosaik.js (the PNGs are written directly, no
// paste step needed for those).
//
// Each level draws ONE scene (from a small set of hand-authored geometric
// templates — moon & stars, mushroom, raven, potion bottle, tree — pure
// distance/bounds math, no image library or external assets needed) at
// TWO resolutions from the SAME seeded rng, so both are the same picture,
// just at different pixel densities:
//   - "display" resolution (fixed, real photo-scale — see DISPLAY_SIZE
//     below): rendered to an actual PNG file via sharp, shown as the
//     reference image. Never used for gameplay logic, so it can be as
//     detailed as we like without any performance concern.
//   - "gameplay" resolution (the difficulty-table grid size): becomes the
//     interactive "sand" mosaic — a coarser, chunkier derivative of the
//     exact same scene, which is what the player actually digs into.
//
// Move budget doesn't apply to this mechanic (see js/mosaik.js's header
// comment) — the resource is BUCKET SLOTS. Multiple slots are active at
// once, each assigned a color that then passively, automatically drains
// whatever's currently reachable of that color (bottom bandHeight rows)
// every time gravity exposes more, cascading across all active slots
// until nothing more can drain. A slot's bucket is "full" (freed) the
// instant its color is fully gone from the picture. This means using ALL
// `maxSlots` slots at once (one per distinct color) is ALWAYS solvable by
// construction — every color has an active bucket, so nothing can ever be
// stuck waiting. The only real generation question is whether the
// level's default (`db`, fewer than maxSlots) allotment is ALSO
// sufficient for at least one greedy strategy — verified below by
// simulating exactly that.

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const {
  MS_COLORS, msColumnsFromGrid, msReachableCells, msIsCleared, msColorsInLevel,
  msOriginalColorTotals, msAssignAndResolve,
} = require('../js/mosaik.js');

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

// Difficulty ramp: 80 levels, 6 tiers. PROVISIONAL — gameplay grid
// resolution grows modestly per tier (this drives puzzle size). The
// reference PNG's resolution grows independently and more aggressively
// per tier (displaySize, always >=300 — the floor, not a fixed target;
// later levels hold genuinely more picture detail than earlier ones).
// maxSlots is derived per level from how many distinct colors the chosen
// template actually painted (3-4, template-dependent); db = maxSlots-1
// (floor 1) so at least one color always has to wait its turn.
function levelParams(levelIndex) {
  const table = [
    { max: 15, rows: 10, cols: 10, displaySize: 300 },
    { max: 30, rows: 12, cols: 12, displaySize: 340 },
    { max: 45, rows: 14, cols: 14, displaySize: 380 },
    { max: 60, rows: 16, cols: 16, displaySize: 420 },
    { max: 75, rows: 18, cols: 18, displaySize: 460 },
    { max: 80, rows: 20, cols: 20, displaySize: 520 },
  ];
  return table.find(t => levelIndex < t.max) || table[table.length - 1];
}
function bandHeightFor(rows) {
  return Math.min(8, Math.max(4, Math.round(rows * 0.3)));
}

/* ── raster helpers (identical technique validated in the previous build:
   pure distance/bounds math, no image library needed) ── */
function fillAll(grid, color) { grid.fill(color); }
function fillRect(grid, rows, cols, r0, r1, c0, c1, color) {
  const rs = Math.max(0, Math.round(r0)), re = Math.min(rows, Math.round(r1));
  const cs = Math.max(0, Math.round(c0)), ce = Math.min(cols, Math.round(c1));
  for (let r = rs; r < re; r++) for (let c = cs; c < ce; c++) grid[r * cols + c] = color;
}
function fillEllipse(grid, rows, cols, cr, cc, rr, rc, color, predicate) {
  for (let r = 0; r < rows; r++) {
    const dr = (r - cr) / rr;
    if (Math.abs(dr) > 1.02) continue;
    for (let c = 0; c < cols; c++) {
      const dc = (c - cc) / rc;
      if (dr * dr + dc * dc <= 1 && (!predicate || predicate(r, c))) grid[r * cols + c] = color;
    }
  }
}
function fillTriangle(grid, rows, cols, pts, color) {
  const [[r0, c0], [r1, c1], [r2, c2]] = pts;
  const minR = Math.max(0, Math.floor(Math.min(r0, r1, r2)));
  const maxR = Math.min(rows, Math.ceil(Math.max(r0, r1, r2)));
  const minC = Math.max(0, Math.floor(Math.min(c0, c1, c2)));
  const maxC = Math.min(cols, Math.ceil(Math.max(c0, c1, c2)));
  const sign = (ar, ac, br, bc, cr, cc) => (br - ar) * (cc - ac) - (bc - ac) * (cr - ar);
  for (let r = minR; r < maxR; r++) {
    for (let c = minC; c < maxC; c++) {
      const d1 = sign(r, c, r0, c0, r1, c1);
      const d2 = sign(r, c, r1, c1, r2, c2);
      const d3 = sign(r, c, r2, c2, r0, c0);
      const hasNeg = d1 < 0 || d2 < 0 || d3 < 0;
      const hasPos = d1 > 0 || d2 > 0 || d3 > 0;
      if (!(hasNeg && hasPos)) grid[r * cols + c] = color;
    }
  }
}

/* ── scene templates — validated in the previous build (raven/potion were
   redesigned there after an initial pass didn't read clearly; kept as-is
   here) ── */
function drawMoonAndStars(rows, cols, rng) {
  const grid = new Array(rows * cols);
  fillAll(grid, 4);
  const moonR = Math.min(rows, cols) * (0.12 + rng() * 0.05);
  const moonRow = rows * (0.15 + rng() * 0.15);
  const moonCol = cols * (0.35 + rng() * 0.3);
  fillEllipse(grid, rows, cols, moonRow, moonCol, moonR, moonR, 1);
  const starCount = Math.round((rows * cols) / 140);
  for (let i = 0; i < starCount; i++) {
    const r = Math.floor(rng() * rows * 0.7);
    const c = Math.floor(rng() * cols);
    if (Math.hypot((r - moonRow) / moonR, (c - moonCol) / moonR) > 1.3) grid[r * cols + c] = 1;
  }
  const hillBase = rows * (0.78 + rng() * 0.06);
  const amp = rows * 0.05;
  const freq = 1.5 + rng() * 2;
  const phase = rng() * Math.PI * 2;
  for (let c = 0; c < cols; c++) {
    const top = hillBase - amp * Math.sin((c / cols) * Math.PI * freq + phase) - amp;
    fillRect(grid, rows, cols, top, rows, c, c + 1, 2);
  }
  return grid;
}
function drawMushroom(rows, cols, rng) {
  const grid = new Array(rows * cols);
  fillAll(grid, 0);
  const groundTop = rows * (0.9 + rng() * 0.04);
  fillRect(grid, rows, cols, groundTop, rows, 0, cols, 2);
  const stemW = cols * (0.14 + rng() * 0.05);
  const stemCenter = cols * (0.42 + rng() * 0.16);
  const stemTop = rows * (0.5 + rng() * 0.08);
  fillRect(grid, rows, cols, stemTop, groundTop, stemCenter - stemW / 2, stemCenter + stemW / 2, 3);
  const capRr = rows * (0.16 + rng() * 0.05);
  const capRc = cols * (0.28 + rng() * 0.08);
  fillEllipse(grid, rows, cols, stemTop, stemCenter, capRr, capRc, 5, (r) => r <= stemTop);
  return grid;
}
function drawRaven(rows, cols, rng) {
  const grid = new Array(rows * cols);
  fillAll(grid, 0);
  const bodyCc = cols * (0.42 + rng() * 0.16);
  const faceDir = rng() < 0.5 ? -1 : 1;
  const bodyBottom = rows * (0.66 + rng() * 0.05);
  const perchW = cols * 0.2;
  fillRect(grid, rows, cols, bodyBottom, bodyBottom + Math.max(1, rows * 0.02), bodyCc - perchW / 2, bodyCc + perchW / 2, 3);
  const bellyR = rows * (0.15 + rng() * 0.03);
  const bellyCr = bodyBottom - bellyR * 0.9;
  fillEllipse(grid, rows, cols, bellyCr, bodyCc, bellyR, bellyR * 0.85, 4);
  const headR = bellyR * 0.62;
  const headCr = bellyCr - bellyR * 0.85;
  const headCc = bodyCc + faceDir * bellyR * 0.15;
  fillEllipse(grid, rows, cols, headCr, headCc, headR, headR, 4);
  fillTriangle(grid, rows, cols, [
    [headCr - headR * 0.35, headCc + faceDir * headR * 0.6],
    [headCr + headR * 0.15, headCc + faceDir * headR * 2.0],
    [headCr + headR * 0.5, headCc + faceDir * headR * 0.5],
  ], 3);
  fillTriangle(grid, rows, cols, [
    [bellyCr + bellyR * 0.55, bodyCc - faceDir * bellyR * 0.2],
    [bellyCr + bellyR * 1.9, bodyCc - faceDir * bellyR * 1.6],
    [bellyCr + bellyR * 0.75, bodyCc - faceDir * bellyR * 0.75],
  ], 4);
  return grid;
}
function drawPotionBottle(rows, cols, rng) {
  const grid = new Array(rows * cols);
  fillAll(grid, 0);
  const bodyW = cols * (0.3 + rng() * 0.08);
  const bodyCenter = cols * (0.42 + rng() * 0.16);
  const bodyTop = rows * (0.42 + rng() * 0.05);
  const bodyBottom = rows * (0.86 + rng() * 0.05);
  const border = Math.max(1, Math.round(cols * 0.02));
  fillRect(grid, rows, cols, bodyTop, bodyBottom, bodyCenter - bodyW / 2, bodyCenter + bodyW / 2, 4);
  fillRect(grid, rows, cols, bodyTop + border, bodyBottom - border, bodyCenter - bodyW / 2 + border, bodyCenter + bodyW / 2 - border, 0);
  const liquidTop = bodyTop + (bodyBottom - bodyTop) * (0.3 + rng() * 0.2);
  fillRect(grid, rows, cols, liquidTop, bodyBottom - border, bodyCenter - bodyW / 2 + border, bodyCenter + bodyW / 2 - border, 6);
  const neckW = bodyW * 0.3;
  const neckTop = rows * (0.2 + rng() * 0.04);
  fillRect(grid, rows, cols, neckTop, bodyTop + border, bodyCenter - neckW / 2, bodyCenter + neckW / 2, 4);
  fillRect(grid, rows, cols, neckTop + border, bodyTop + border, bodyCenter - neckW / 2 + border, bodyCenter + neckW / 2 - border, 0);
  const corkH = Math.max(border * 2, rows * 0.04);
  fillRect(grid, rows, cols, neckTop - corkH, neckTop, bodyCenter - neckW / 2 - border, bodyCenter + neckW / 2 + border, 3);
  return grid;
}
function drawTree(rows, cols, rng) {
  const grid = new Array(rows * cols);
  fillAll(grid, 0);
  const groundTop = rows * (0.88 + rng() * 0.04);
  fillRect(grid, rows, cols, groundTop, rows, 0, cols, 3);
  const trunkW = cols * (0.08 + rng() * 0.03);
  const trunkCenter = cols * (0.42 + rng() * 0.16);
  fillRect(grid, rows, cols, rows * (0.5 + rng() * 0.06), groundTop, trunkCenter - trunkW / 2, trunkCenter + trunkW / 2, 3);
  const canopyR = rows * (0.24 + rng() * 0.06);
  const canopyCr = rows * (0.35 + rng() * 0.06);
  fillEllipse(grid, rows, cols, canopyCr, trunkCenter, canopyR, canopyR * (cols / rows) * 1.05, 2);
  return grid;
}
const TEMPLATES = [drawMoonAndStars, drawMushroom, drawRaven, drawPotionBottle, drawTree];

/* ── PNG export for the reference image ── */
function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
const PALETTE_RGB = MS_COLORS.map(hexToRgb);
async function writeReferencePng(grid, size, outPath) {
  const buf = Buffer.alloc(size * size * 3);
  for (let i = 0; i < grid.length; i++) {
    const [r, g, b] = PALETTE_RGB[grid[i]];
    buf[i * 3] = r; buf[i * 3 + 1] = g; buf[i * 3 + 2] = b;
  }
  await sharp(buf, { raw: { width: size, height: size, channels: 3 } }).png().toFile(outPath);
}

/* ── slot-based greedy simulation, built entirely on the REAL shipped
   msAssignAndResolve (not a hand-rolled copy) — proves `slotCount` buckets
   suffice to fully clear the picture via at least one achievable
   strategy. At each free slot, greedily assigns whichever CURRENTLY-
   REACHABLE, not-already-assigned color has the most reachable pixels
   right now (colors are freely re-selectable once their bucket frees up,
   so this naturally places several buckets for the same color over time
   as its capacity — a fraction of its total, never the whole thing —
   keeps buckets short). Mirrors Parkplatz's constructive-witness approach
   — no adversarial search needed, since using ALL distinct colors' worth
   of slots at once, with free re-selection, is solvable by construction
   (nothing is ever permanently blocked) — the only real question is
   whether a TIGHTER `slotCount` is also sufficient, which this simulation
   answers directly. ── */
function simulateBucketClear(columns, bandHeight, slotCount, totalByColor) {
  let state = columns.map(col => col.slice());
  let slotColor = Array(slotCount).fill(null);
  let slotFilled = Array(slotCount).fill(0);
  let placements = 0;
  for (let guard = 0; guard < 20000; guard++) {
    if (msIsCleared(state)) return { cleared: true, placements };
    const free = slotColor.indexOf(null);
    if (free === -1) return { cleared: false, reason: 'no free slot (shouldn\'t happen — a full board always frees or clears)' };

    const assigned = new Set(slotColor.filter(c => c != null));
    const remaining = [...new Set(state.flat())].filter(c => !assigned.has(c));
    let bestColor = null, bestCount = -1;
    for (const color of remaining) {
      const count = msReachableCells(state, color, bandHeight).length;
      if (count > bestCount) { bestCount = count; bestColor = color; }
    }
    if (bestColor == null || bestCount === 0) return { cleared: false, reason: 'stuck: no assignable color has anything reachable' };

    const result = msAssignAndResolve(state, slotColor, slotFilled, free, bestColor, bandHeight, totalByColor);
    if (!result) return { cleared: false, reason: 'msAssignAndResolve rejected a legal placement' };
    state = result.columns;
    slotColor = result.slotColor;
    slotFilled = result.slotFilled;
    placements++;
  }
  return { cleared: false, reason: 'guard limit' };
}

async function generateLevel(i) {
  const params = levelParams(i);
  const bandHeight = bandHeightFor(params.rows);
  const template = TEMPLATES[i % TEMPLATES.length];
  const maxAttempts = 60;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const seed = seedForLevel(i, attempt);
    const gameplayGrid = template(params.rows, params.cols, mulberry32(seed));
    if (gameplayGrid.some(v => v == null)) continue;

    const maxSlots = msColorsInLevel(gameplayGrid).length;
    if (maxSlots < 2) continue; // degenerate — needs at least 2 colors for a real puzzle
    const db = Math.max(1, maxSlots - 1);
    const totalByColor = msOriginalColorTotals(gameplayGrid);

    const columns = msColumnsFromGrid(gameplayGrid, params.rows, params.cols);
    const sim = simulateBucketClear(columns, bandHeight, db, totalByColor);
    if (!sim.cleared) continue; // db insufficient for this particular picture — reroll

    const displaySize = params.displaySize;
    const displayGrid = template(displaySize, displaySize, mulberry32(seed)); // SAME seed → same scene, finer resolution
    const imgRelPath = `assets/images/mosaik/level-${String(i).padStart(2, '0')}.png`;
    const outPath = path.join(__dirname, '..', imgRelPath);
    await writeReferencePng(displayGrid, displaySize, outPath);

    return {
      level: { g: [params.rows, params.cols], bh: bandHeight, db, grid: gameplayGrid, img: imgRelPath },
      attempt, maxSlots, placements: sim.placements, template: template.name, displaySize,
    };
  }
  return null;
}

const MS_LEVEL_COUNT_TARGET = 80;

(async () => {
  fs.mkdirSync(path.join(__dirname, '..', 'assets', 'images', 'mosaik'), { recursive: true });
  const levels = [];
  for (let i = 0; i < MS_LEVEL_COUNT_TARGET; i++) {
    const t0 = Date.now();
    const result = await generateLevel(i);
    const ms = Date.now() - t0;
    if (!result) {
      console.error(`Level ${i}: FAILED after max attempts.`);
      process.exit(1);
    }
    console.log(`Level ${i}: OK (template=${result.template}, grid=${result.level.g.join('x')}, displaySize=${result.displaySize}, bh=${result.level.bh}, maxSlots=${result.maxSlots}, db=${result.level.db}, placements=${result.placements}, attempt=${result.attempt}, ${ms}ms)`);
    levels.push(result.level);
  }

  console.log('\n--- paste this over the MS_LEVELS line in js/mosaik.js ---\n');
  console.log('const MS_LEVELS = ' + JSON.stringify(levels) + ';');
})();
