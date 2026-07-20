// Generates the MS_LEVELS data baked into js/mosaik.js. Run this to reroll
// the pool or change the difficulty table; paste the printed
// `const MS_LEVELS = [...]` line over the existing one in js/mosaik.js.
//
// Method: draw an original pixel-art scene (one of a small set of hand-
// authored geometric templates — moon & stars, mushroom, raven, potion
// bottle, tree — rasterized via simple distance/bounds math, no image
// library or external assets needed), then MEASURE its move budget by
// simulating a real, achievable clear via the actual shipped
// msSimulateGreedyClear/msExtractColor functions (repeatedly extract
// whichever color currently has the most reachable pixels). No
// combinatorial solver or reject-and-retry-for-solvability loop is needed
// here — unlike Water Sort/Parkplatz, a color tap in this game can never
// make the picture harder to finish (it only removes material, and
// gravity guarantees every remaining color eventually sinks into the
// reachable band regardless of tap order), so reaching a cleared board
// via one concrete simulated playthrough IS a complete proof of
// achievability — see js/mosaik.js's header comment for the full
// reasoning. moveBudget = measured tap count + slack.

const { msSimulateGreedyClear, msColumnsFromGrid, msColorsInLevel } = require('../js/mosaik.js');

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

// Difficulty ramp: 80 levels, 6 tiers. PROVISIONAL — grid resolution grows
// per tier (more picture detail at higher levels); moveBudget is computed
// per-level below, not fixed here. bandHeight = clamp(round(rows*0.25),5,10).
function levelParams(levelIndex) {
  const table = [
    { max: 15, rows: 18, cols: 16 },
    { max: 30, rows: 22, cols: 20 },
    { max: 45, rows: 26, cols: 22 },
    { max: 60, rows: 30, cols: 26 },
    { max: 75, rows: 34, cols: 30 },
    { max: 80, rows: 40, cols: 34 },
  ];
  return table.find(t => levelIndex < t.max) || table[table.length - 1];
}
function bandHeightFor(rows) {
  return Math.min(10, Math.max(5, Math.round(rows * 0.25)));
}

/* ── raster helpers ── */
function fillAll(grid, color) { grid.fill(color); }
function fillRect(grid, rows, cols, r0, r1, c0, c1, color) {
  const rs = Math.max(0, Math.round(r0)), re = Math.min(rows, Math.round(r1));
  const cs = Math.max(0, Math.round(c0)), ce = Math.min(cols, Math.round(c1));
  for (let r = rs; r < re; r++) for (let c = cs; c < ce; c++) grid[r * cols + c] = color;
}
// predicate(r,c) additionally gates which cells inside the ellipse get painted
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

/* ── scene templates — each returns a flat row-major color-index grid ── */
function drawMoonAndStars(rows, cols, rng) {
  const grid = new Array(rows * cols);
  fillAll(grid, 4); // dark night sky
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
  // wavy hill along the bottom
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
  fillAll(grid, 0); // sky
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

// Simplified to the classic "tear-drop bird icon" silhouette (one
// elongated body+head shape + a beak + a tail wedge) — a separate small
// head circle and extra wing triangle didn't read clearly at pixel-art
// scale, they just looked like noise. This reads as a bird at any
// resolution this game uses.
function drawRaven(rows, cols, rng) {
  const grid = new Array(rows * cols);
  fillAll(grid, 0); // sky
  const bodyCc = cols * (0.42 + rng() * 0.16);
  const faceDir = rng() < 0.5 ? -1 : 1; // which way the raven faces

  const bodyBottom = rows * (0.66 + rng() * 0.05);
  const perchW = cols * 0.2;
  fillRect(grid, rows, cols, bodyBottom, bodyBottom + Math.max(1, rows * 0.02), bodyCc - perchW / 2, bodyCc + perchW / 2, 3);

  // body+head: one tall egg shape, narrower at the top (head) than the
  // bottom (belly) — built from two overlapping ellipses so it tapers
  // instead of reading as a plain circle.
  const bellyR = rows * (0.15 + rng() * 0.03);
  const bellyCr = bodyBottom - bellyR * 0.9;
  fillEllipse(grid, rows, cols, bellyCr, bodyCc, bellyR, bellyR * 0.85, 4);
  const headR = bellyR * 0.62;
  const headCr = bellyCr - bellyR * 0.85;
  const headCc = bodyCc + faceDir * bellyR * 0.15;
  fillEllipse(grid, rows, cols, headCr, headCc, headR, headR, 4);

  // beak: small triangle pointing out from the head in faceDir
  fillTriangle(grid, rows, cols, [
    [headCr - headR * 0.35, headCc + faceDir * headR * 0.6],
    [headCr + headR * 0.15, headCc + faceDir * headR * 2.0],
    [headCr + headR * 0.5, headCc + faceDir * headR * 0.5],
  ], 3);

  // tail: a wedge trailing from the back-bottom of the belly, opposite faceDir
  fillTriangle(grid, rows, cols, [
    [bellyCr + bellyR * 0.55, bodyCc - faceDir * bellyR * 0.2],
    [bellyCr + bellyR * 1.9, bodyCc - faceDir * bellyR * 1.6],
    [bellyCr + bellyR * 0.75, bodyCc - faceDir * bellyR * 0.75],
  ], 4);

  return grid;
}

// Pure rect-based (no ellipse) so it stays crisp at any resolution — an
// ellipse-outline-plus-inset approach left thin boundary artifacts poking
// past the silhouette at larger grid sizes, since the inset and outer
// ellipse don't rasterize to perfectly nested pixel sets.
function drawPotionBottle(rows, cols, rng) {
  const grid = new Array(rows * cols);
  fillAll(grid, 0); // sky/background
  const bodyW = cols * (0.3 + rng() * 0.08);
  const bodyCenter = cols * (0.42 + rng() * 0.16);
  const bodyTop = rows * (0.42 + rng() * 0.05);
  const bodyBottom = rows * (0.86 + rng() * 0.05);
  const border = Math.max(1, Math.round(cols * 0.02));

  // body outline, then hollow it out from the inside so the border is a
  // consistent, artifact-free ring regardless of scale
  fillRect(grid, rows, cols, bodyTop, bodyBottom, bodyCenter - bodyW / 2, bodyCenter + bodyW / 2, 4);
  fillRect(grid, rows, cols, bodyTop + border, bodyBottom - border, bodyCenter - bodyW / 2 + border, bodyCenter + bodyW / 2 - border, 0);

  // liquid fills the lower portion of the hollow interior
  const liquidTop = bodyTop + (bodyBottom - bodyTop) * (0.3 + rng() * 0.2);
  fillRect(grid, rows, cols, liquidTop, bodyBottom - border, bodyCenter - bodyW / 2 + border, bodyCenter + bodyW / 2 - border, 6);

  // neck: same hollow-ring technique, narrower
  const neckW = bodyW * 0.3;
  const neckTop = rows * (0.2 + rng() * 0.04);
  fillRect(grid, rows, cols, neckTop, bodyTop + border, bodyCenter - neckW / 2, bodyCenter + neckW / 2, 4);
  fillRect(grid, rows, cols, neckTop + border, bodyTop + border, bodyCenter - neckW / 2 + border, bodyCenter + neckW / 2 - border, 0);

  // cork on top
  const corkH = Math.max(border * 2, rows * 0.04);
  fillRect(grid, rows, cols, neckTop - corkH, neckTop, bodyCenter - neckW / 2 - border, bodyCenter + neckW / 2 + border, 3);
  return grid;
}

function drawTree(rows, cols, rng) {
  const grid = new Array(rows * cols);
  fillAll(grid, 0); // sky
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

function generateLevel(i) {
  const params = levelParams(i);
  const bandHeight = bandHeightFor(params.rows);
  const template = TEMPLATES[i % TEMPLATES.length];
  const maxAttempts = 50;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const rng = mulberry32(seedForLevel(i, attempt));
    const grid = template(params.rows, params.cols, rng);
    if (grid.some(v => v == null)) continue; // defensive — a raster bug leaving unpainted cells

    const columns = msColumnsFromGrid(grid, params.rows, params.cols);
    const sim = msSimulateGreedyClear(columns, bandHeight, params.rows * params.cols + 10);
    if (!sim.cleared) continue; // shouldn't happen, but never ship an unverified level

    const moveBudget = sim.moves.length + Math.max(2, Math.round(sim.moves.length * 0.2));
    return {
      level: { g: [params.rows, params.cols], mv: moveBudget, bh: bandHeight, grid },
      attempt, measuredTaps: sim.moves.length, colors: msColorsInLevel(grid).length,
      template: template.name,
    };
  }
  return null;
}

const MS_LEVEL_COUNT_TARGET = 80;
const levels = [];
let totalCells = 0;
for (let i = 0; i < MS_LEVEL_COUNT_TARGET; i++) {
  const t0 = Date.now();
  const result = generateLevel(i);
  const ms = Date.now() - t0;
  if (!result) {
    console.error(`Level ${i}: FAILED after max attempts.`);
    process.exit(1);
  }
  totalCells += result.level.grid.length;
  console.log(`Level ${i}: OK (template=${result.template}, grid=${result.level.g.join('x')}, bh=${result.level.bh}, colors=${result.colors}, measuredTaps=${result.measuredTaps}, mv=${result.level.mv}, attempt=${result.attempt}, ${ms}ms)`);
  levels.push(result.level);
}
console.log(`\nTotal cells across all levels: ${totalCells}`);

console.log('\n--- paste this over the MS_LEVELS line in js/mosaik.js ---\n');
console.log('const MS_LEVELS = ' + JSON.stringify(levels) + ';');
