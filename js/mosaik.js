'use strict';

/* ══════════════════════════════════════════════════════════
   MOSAIK — real-time conveyor-belt sand puzzle

   Each level is a real, high-resolution picture (hundreds of pixels per
   side — see MS_LEVELS' g=[rows,cols]) that starts WHOLE and gets
   DECONSTRUCTED. Every column of the picture continuously "outputs"
   whatever its current bottom-most remaining pixel is — this is not a
   turn-based tap-and-resolve system like every other mini-game in this
   app, it's a genuine real-time simulation with a running clock.

   You place colored containers (tap a color swatch) onto a continuously-
   moving conveyor belt that sweeps left→right beneath the picture,
   wrapping back to the left edge indefinitely. A container is LOCKED to
   the one color it was placed with: as it rides the belt, it doesn't only
   collect from the single column it's exactly centered on, or only the
   single frontmost cell of that column — it reaches into a small 2D
   neighborhood around itself (nearby columns × shallow depth into each
   one's remaining stack, both MS_COLLECT_REACH_FRACTION of the picture's
   width/height) with a bell-curve chance of collecting each matching cell
   in range — certain right at its own position, fading smoothly with
   distance, never a hard in-or-out cutoff (msGaussianWeight). It stays on
   the belt (never manually repositioned) until full, at which point it's
   removed, freeing a slot for a new placement. A container's capacity is a
   modest FRACTION of that color's total supply in the picture
   (MS_BUCKET_CAPACITY_FRACTION), never the whole thing — most colors
   need several separate container placements over a level.

   Removing a column's bottom-most pixel is real gravity, not a fixed hole:
   the remaining stack re-renders compacted against the bottom every time
   (msRedrawColumn), so the pixels still above it visibly fall down to close
   the gap, matching what msColumnsFromGrid's column array already meant all
   along (index 0 = nearest the belt).

   Because the belt runs continuously, this game needs an actual
   requestAnimationFrame loop (msTick, driven by real elapsed time),
   unlike every other screen's full-innerHTML-rebuild-per-tap model. The
   SAME msTick function is also what scripts/generate-mosaik-levels.js and
   scripts/verify-mosaik-levels.js run in a fast-forwarded loop (fixed
   dtMs, no real waiting) to prove a level is clearable — the established
   discipline from every other mini-game this session (one real function,
   never a hand-rolled copy, reused by runtime + generator + independent
   verify script) just adapted from a discrete-solver context to a
   continuous-tick context.

   Rendering is canvas-based, not one DOM element per pixel (hundreds of
   thousands of divs, rebuilt every frame, would not perform). The
   picture layer is a canvas whose native pixel resolution matches the
   grid exactly (cols×rows), scaled up via CSS with crisp
   `image-rendering: pixelated`; removing a pixel just touches one cell in
   a persistent ImageData buffer and calls putImageData — cheap regardless
   of picture size. A second, display-resolution canvas overlays the
   handful of moving container sprites, cleared and redrawn every frame.

   Levels store only a tiny descriptor — `{template, seed, g, db}` — no
   baked pixel data. The exact same procedural scene-drawing functions
   used to verify a level (below) regenerate the identical grid
   deterministically in the browser at load time from that seed.

   Slot economy: default active-container slots = `maxColors - 2`
   (floor 1), extendable via quiz questions (mirrors Water Sort's extra-
   bottle / Parkplatz's extra-bay mechanic exactly, feeding the
   Tamagotchi for free via the shared askQuestions()) up to
   `min(maxColors, 10)`. Since the belt is continuous, there's no "stuck"
   state to detect the way the turn-based version had one — forward
   progress just resumes whenever a matching column comes back around;
   the only real constraint is "no free slot to place a new container,"
   which is a synchronous rejection at placement time, not a state to
   poll for.
══════════════════════════════════════════════════════════ */

const MS_COLORS = [
  "#cbe8f5", // 0  sky pale (top)
  "#a8d8e8", // 1  sky mid
  "#6fa8c2", // 2  sky dark (horizon)
  "#f5e878", // 3  glow bright (moon/sun core, mushroom spots)
  "#e8d95a", // 4  glow mid (moon/sun rim)
  "#8fe8a8", // 5  foliage light
  "#6fd88a", // 6  foliage mid
  "#4a9a5f", // 7  foliage dark
  "#d9b878", // 8  bark/ground light
  "#c9a857", // 9  bark/ground mid
  "#8a6d35", // 10 bark/ground dark
  "#5a5a70", // 11 silhouette light/edge
  "#3a3a4a", // 12 silhouette mid
  "#25252f", // 13 silhouette dark
  "#e0413a", // 14 accent red
  "#b06fe8", // 15 accent purple
];
// level.db (baked, generator-proven-sufficient) is the CEILING on active
// slots for a level, not the starting amount — a level always starts with
// fewer (see MS_STARTING_SLOTS_HANDICAP), unlocked back up to db one at a
// time by answering a question each (msBuyExtraSlot), same "capacity costs
// a question" pattern as Water Sort's extra bottle / Parkplatz's extra bay.
// Never exceeds db, so the generator/verify script's solvability proof
// (which only ever used db slots) stays valid regardless of how a player
// paces their unlocks. On top of that ceiling, the real in-the-moment
// relief valve is discarding a stuck container (forfeiting its partial
// fill) to free its slot for a color that's actually progressing; this
// mirrors real conveyor-belt sand-sort games (Sandy Jam and kin), where a
// small slot count relative to the picture's color count is the whole
// point, and recognizing + discarding a dead pick is the actual skill.
// Discarding also costs a question. Capped generously above what the
// generator's own discard-aware
// simulation needed worst-case (12, for the busiest template) — provisional.
const MS_MAX_DISCARDS_PER_LEVEL = 15;
// A level doesn't hand you all db slots up front — you start this many
// fewer (floor 1), so a level with a tight db (e.g. 4) starts genuinely
// cramped and reaching the full, already-proven-sufficient db count
// requires answering questions (msBuyExtraSlot) at some point, not just
// discarding your way through a permanently-tiny slot count.
const MS_STARTING_SLOTS_HANDICAP = 2;
const MS_BUCKET_CAPACITY_FRACTION = 0.12; // one container holds ~12% of a color's total — never the whole thing
const MS_BELT_SPEED_COLS_PER_SEC = 40; // provisional — tune by watching it run
const MS_COLLECT_INTERVAL_MS = 90;      // provisional — min time between collecting successive pixels per container
// A container doesn't only reach the single column it's exactly aligned
// with, and it doesn't only reach the single bottom-most cell of a column
// either — it reaches into a small 2D neighborhood around its position: a
// window of nearby COLUMNS (this fraction of the picture's width, centered
// on the container) at a range of DEPTHS into each one (this fraction of
// the picture's height, counted in from that column's current frontmost
// remaining cell). Picking off one literal pixel per ~90ms, from only the
// single cell every column happened to have exposed, read as far too slow
// against pictures hundreds of cells per side; a real physical scoop
// reaches around AND into the pile, not just the one grain dead-center.
const MS_COLLECT_REACH_FRACTION = 0.10;

// Generated by scripts/generate-mosaik-levels.js. Per level: template name,
// seed (regenerates the identical grid via the same drawing function),
// g=[rows,cols], db=default unlocked container slots. No pixel data.
const MS_LEVELS = [{"template":"drawMoonAndStars","seed":-1571190077,"g":[260,260],"db":4},{"template":"drawMushroom","seed":16,"g":[260,260],"db":6},{"template":"drawRaven","seed":-423059871,"g":[260,260],"db":5},{"template":"drawPotionBottle","seed":1152587190,"g":[260,260],"db":5},{"template":"drawTree","seed":729518855,"g":[260,260],"db":7},{"template":"drawMoonAndStars","seed":-1994249900,"g":[260,260],"db":4},{"template":"drawMushroom","seed":1877647525,"g":[260,260],"db":6},{"template":"drawRaven","seed":-841662726,"g":[260,260],"db":5},{"template":"drawPotionBottle","seed":-1281510325,"g":[260,260],"db":5},{"template":"drawTree","seed":306459544,"g":[260,260],"db":7},{"template":"drawMoonAndStars","seed":-267597335,"g":[260,260],"db":4},{"template":"drawMushroom","seed":1459046206,"g":[260,260],"db":6},{"template":"drawRaven","seed":884989583,"g":[260,260],"db":5},{"template":"drawPotionBottle","seed":-1687792420,"g":[260,260],"db":5},{"template":"drawTree","seed":2033111597,"g":[260,260],"db":7},{"template":"drawMoonAndStars","seed":-551983006,"g":[290,290],"db":4},{"template":"drawMushroom","seed":-1111365709,"g":[290,290],"db":6},{"template":"drawRaven","seed":596147456,"g":[290,290],"db":5},{"template":"drawPotionBottle","seed":-2106524847,"g":[290,290],"db":5},{"template":"drawTree","seed":1614508710,"g":[290,290],"db":7},{"template":"drawMoonAndStars","seed":-958265097,"g":[290,290],"db":4},{"template":"drawMushroom","seed":-1532328380,"g":[290,290],"db":6},{"template":"drawRaven","seed":177544597,"g":[290,290],"db":5},{"template":"drawPotionBottle","seed":-379741206,"g":[290,290],"db":5},{"template":"drawTree","seed":1325666619,"g":[290,290],"db":7},{"template":"drawMoonAndStars","seed":768387208,"g":[290,290],"db":4},{"template":"drawMushroom","seed":-1816713511,"g":[290,290],"db":6},{"template":"drawRaven","seed":1920973870,"g":[290,290],"db":5},{"template":"drawPotionBottle","seed":-802801025,"g":[290,290],"db":5},{"template":"drawTree","seed":-1225870900,"g":[290,290],"db":7},{"template":"drawMoonAndStars","seed":349785885,"g":[320,320],"db":4},{"template":"drawMushroom","seed":-92158638,"g":[320,320],"db":6},{"template":"drawRaven","seed":1497914531,"g":[320,320],"db":5},{"template":"drawPotionBottle","seed":1060166384,"g":[320,320],"db":5},{"template":"drawTree","seed":-1644474303,"g":[320,320],"db":7},{"template":"drawMoonAndStars","seed":61075350,"g":[320,320],"db":4},{"template":"drawMushroom","seed":-496343577,"g":[320,320],"db":6},{"template":"drawRaven","seed":1079173940,"g":[320,320],"db":5},{"template":"drawPotionBottle","seed":639466117,"g":[320,320],"db":5},{"template":"drawTree","seed":-2067402534,"g":[320,320],"db":7},{"template":"drawMoonAndStars","seed":1787596331,"g":[320,320],"db":4},{"template":"drawMushroom","seed":-914946952,"g":[320,320],"db":6},{"template":"drawRaven","seed":-1354791991,"g":[320,320],"db":5},{"template":"drawPotionBottle","seed":233183518,"g":[320,320],"db":5},{"template":"drawTree","seed":-206661777,"g":[320,320],"db":7},{"template":"drawMoonAndStars","seed":1368993468,"g":[350,350],"db":4},{"template":"drawMushroom","seed":809608205,"g":[350,350],"db":6},{"template":"drawRaven","seed":-1777851838,"g":[350,350],"db":5},{"template":"drawPotionBottle","seed":1961933203,"g":[350,350],"db":5},{"template":"drawTree","seed":-625264672,"g":[350,350],"db":7},{"template":"drawMoonAndStars","seed":-1184641743,"g":[350,350],"db":4},{"template":"drawMushroom","seed":522863750,"g":[350,350],"db":6},{"template":"drawRaven","seed":-49102121,"g":[350,350],"db":5},{"template":"drawPotionBottle","seed":1675450404,"g":[350,350],"db":5},{"template":"drawTree","seed":-1048193419,"g":[350,350],"db":7},{"template":"drawMoonAndStars","seed":-1605603894,"g":[350,350],"db":4},{"template":"drawMushroom","seed":104131355,"g":[350,350],"db":6},{"template":"drawRaven","seed":-453025432,"g":[350,350],"db":5},{"template":"drawPotionBottle","seed":1252522169,"g":[350,350],"db":5},{"template":"drawTree","seed":695105038,"g":[350,350],"db":7},{"template":"drawMoonAndStars","seed":-1889989537,"g":[380,380],"db":4},{"template":"drawMushroom","seed":1828817836,"g":[380,380],"db":6},{"template":"drawRaven","seed":-741867011,"g":[380,380],"db":5},{"template":"drawPotionBottle","seed":-1313824974,"g":[380,380],"db":5},{"template":"drawTree","seed":276502147,"g":[380,380],"db":7},{"template":"drawMoonAndStars","seed":-165434160,"g":[380,380],"db":4},{"template":"drawMushroom","seed":1424632353,"g":[380,380],"db":6},{"template":"drawRaven","seed":986882166,"g":[380,380],"db":5},{"template":"drawPotionBottle","seed":-1734524985,"g":[380,380],"db":5},{"template":"drawTree","seed":2135274772,"g":[380,380],"db":7},{"template":"drawMoonAndStars","seed":-586402971,"g":[380,380],"db":4},{"template":"drawMushroom","seed":1140116154,"g":[380,380],"db":6},{"template":"drawRaven","seed":566181899,"g":[380,380],"db":5},{"template":"drawPotionBottle","seed":-2140676520,"g":[380,380],"db":5},{"template":"drawTree","seed":1714312617,"g":[380,380],"db":7},{"template":"drawMoonAndStars","seed":-1005136898,"g":[410,410],"db":4},{"template":"drawMushroom","seed":-1430165169,"g":[410,410],"db":6},{"template":"drawRaven","seed":143253660,"g":[410,410],"db":5},{"template":"drawPotionBottle","seed":-277840147,"g":[410,410],"db":5},{"template":"drawTree","seed":1295578146,"g":[410,410],"db":7}];
const MS_LEVEL_COUNT = MS_LEVELS.length;

/* ══════════════════════════════════════════════════════════
   RASTER HELPERS + SCENE TEMPLATES — pure distance/bounds math, no image
   library or external assets needed. Shared verbatim between the browser
   runtime (regenerates a level's grid from its seed at load time) and
   scripts/generate-mosaik-levels.js (draws + verifies at generation time)
   via the module.exports guard at the bottom of this file.
══════════════════════════════════════════════════════════ */
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function fillAll(grid, color) { grid.fill(color); }
function fillBands(grid, rows, cols, bandColors) {
  const n = bandColors.length;
  for (let r = 0; r < rows; r++) {
    const bandIdx = Math.min(n - 1, Math.floor((r / rows) * n));
    for (let c = 0; c < cols; c++) grid[r * cols + c] = bandColors[bandIdx];
  }
}
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

function drawMoonAndStars(rows, cols, rng) {
  const grid = new Array(rows * cols);
  fillBands(grid, rows, cols, [12, 12, 13]); // night sky, deeper near the horizon
  const moonR = Math.min(rows, cols) * (0.12 + rng() * 0.05);
  const moonRow = rows * (0.15 + rng() * 0.15);
  const moonCol = cols * (0.35 + rng() * 0.3);
  fillEllipse(grid, rows, cols, moonRow, moonCol, moonR, moonR, 4);
  fillEllipse(grid, rows, cols, moonRow, moonCol, moonR * 0.72, moonR * 0.72, 3);
  const starCount = Math.round((rows * cols) / 120);
  for (let i = 0; i < starCount; i++) {
    const r = Math.floor(rng() * rows * 0.7);
    const c = Math.floor(rng() * cols);
    if (Math.hypot((r - moonRow) / moonR, (c - moonCol) / moonR) > 1.3) grid[r * cols + c] = 3;
  }
  const hillBase = rows * (0.78 + rng() * 0.06);
  const amp = rows * 0.05;
  const freq = 1.5 + rng() * 2;
  const phase = rng() * Math.PI * 2;
  for (let c = 0; c < cols; c++) {
    const top = hillBase - amp * Math.sin((c / cols) * Math.PI * freq + phase) - amp;
    fillRect(grid, rows, cols, top, rows * 0.93, c, c + 1, 6);
    fillRect(grid, rows, cols, rows * 0.93, rows, c, c + 1, 7);
  }
  return grid;
}
function drawMushroom(rows, cols, rng) {
  const grid = new Array(rows * cols);
  fillBands(grid, rows, cols, [0, 1, 2]);
  const groundTop = rows * (0.9 + rng() * 0.04);
  fillRect(grid, rows, cols, groundTop, rows * 0.97, 0, cols, 9);
  fillRect(grid, rows, cols, rows * 0.97, rows, 0, cols, 10);
  const stemW = cols * (0.14 + rng() * 0.05);
  const stemCenter = cols * (0.42 + rng() * 0.16);
  const stemTop = rows * (0.5 + rng() * 0.08);
  fillRect(grid, rows, cols, stemTop, groundTop, stemCenter - stemW / 2, stemCenter + stemW / 2, 9);
  fillRect(grid, rows, cols, stemTop, groundTop, stemCenter + stemW / 2 - Math.max(1, stemW * 0.15), stemCenter + stemW / 2, 10);
  const capRr = rows * (0.16 + rng() * 0.05);
  const capRc = cols * (0.28 + rng() * 0.08);
  fillEllipse(grid, rows, cols, stemTop, stemCenter, capRr, capRc, 14, (r) => r <= stemTop);
  fillEllipse(grid, rows, cols, stemTop, stemCenter, capRr, capRc, 13, (r) => r <= stemTop && r > stemTop - capRr * 0.18);
  const spotCount = Math.max(3, Math.round((capRr * capRc) / (rows * 2)));
  for (let i = 0; i < spotCount; i++) {
    const ang = rng() * Math.PI;
    const dist = rng() * 0.6;
    const r = Math.round(stemTop - capRr * dist * Math.sin(ang) * 0.9);
    const c = Math.round(stemCenter + capRc * Math.cos(ang) * dist);
    const dotR = Math.max(1, Math.round(Math.min(rows, cols) * 0.012));
    fillEllipse(grid, rows, cols, r, c, dotR, dotR, 3, (rr) => rr <= stemTop);
  }
  return grid;
}
function drawRaven(rows, cols, rng) {
  const grid = new Array(rows * cols);
  fillBands(grid, rows, cols, [0, 1, 2]);
  const bodyCc = cols * (0.42 + rng() * 0.16);
  const faceDir = rng() < 0.5 ? -1 : 1;
  const bodyBottom = rows * (0.66 + rng() * 0.05);
  const perchW = cols * 0.2;
  fillRect(grid, rows, cols, bodyBottom, bodyBottom + Math.max(1, rows * 0.02), bodyCc - perchW / 2, bodyCc + perchW / 2, 9);
  const bellyR = rows * (0.15 + rng() * 0.03);
  const bellyCr = bodyBottom - bellyR * 0.9;
  fillEllipse(grid, rows, cols, bellyCr, bodyCc, bellyR, bellyR * 0.85, 12);
  fillEllipse(grid, rows, cols, bellyCr, bodyCc, bellyR, bellyR * 0.85, 13, (r) => r > bellyCr + bellyR * 0.3);
  fillEllipse(grid, rows, cols, bellyCr, bodyCc, bellyR, bellyR * 0.85, 11, (r, c) => faceDir * (c - bodyCc) > bellyR * 0.4);
  const headR = bellyR * 0.62;
  const headCr = bellyCr - bellyR * 0.85;
  const headCc = bodyCc + faceDir * bellyR * 0.15;
  fillEllipse(grid, rows, cols, headCr, headCc, headR, headR, 12);
  fillTriangle(grid, rows, cols, [
    [headCr - headR * 0.35, headCc + faceDir * headR * 0.6],
    [headCr + headR * 0.15, headCc + faceDir * headR * 2.0],
    [headCr + headR * 0.5, headCc + faceDir * headR * 0.5],
  ], 9);
  fillTriangle(grid, rows, cols, [
    [bellyCr + bellyR * 0.55, bodyCc - faceDir * bellyR * 0.2],
    [bellyCr + bellyR * 1.9, bodyCc - faceDir * bellyR * 1.6],
    [bellyCr + bellyR * 0.75, bodyCc - faceDir * bellyR * 0.75],
  ], 12);
  return grid;
}
function drawPotionBottle(rows, cols, rng) {
  const grid = new Array(rows * cols);
  fillBands(grid, rows, cols, [0, 0, 1]);
  const bodyW = cols * (0.3 + rng() * 0.08);
  const bodyCenter = cols * (0.42 + rng() * 0.16);
  const bodyTop = rows * (0.42 + rng() * 0.05);
  const bodyBottom = rows * (0.86 + rng() * 0.05);
  const border = Math.max(1, Math.round(cols * 0.02));
  fillRect(grid, rows, cols, bodyTop, bodyBottom, bodyCenter - bodyW / 2, bodyCenter + bodyW / 2, 12);
  fillRect(grid, rows, cols, bodyTop + border, bodyBottom - border, bodyCenter - bodyW / 2 + border, bodyCenter + bodyW / 2 - border, 0);
  const liquidTop = bodyTop + (bodyBottom - bodyTop) * (0.3 + rng() * 0.2);
  fillRect(grid, rows, cols, liquidTop, bodyBottom - border, bodyCenter - bodyW / 2 + border, bodyCenter + bodyW / 2 - border, 15);
  fillRect(grid, rows, cols, bodyBottom - (bodyBottom - liquidTop) * 0.3, bodyBottom - border, bodyCenter - bodyW / 2 + border, bodyCenter + bodyW / 2 - border, 13);
  fillRect(grid, rows, cols, liquidTop, liquidTop + Math.max(1, border), bodyCenter - bodyW / 2 + border, bodyCenter + bodyW / 2 - border, 4);
  const neckW = bodyW * 0.3;
  const neckTop = rows * (0.2 + rng() * 0.04);
  fillRect(grid, rows, cols, neckTop, bodyTop + border, bodyCenter - neckW / 2, bodyCenter + neckW / 2, 12);
  fillRect(grid, rows, cols, neckTop + border, bodyTop + border, bodyCenter - neckW / 2 + border, bodyCenter + neckW / 2 - border, 0);
  const corkH = Math.max(border * 2, rows * 0.04);
  fillRect(grid, rows, cols, neckTop - corkH, neckTop, bodyCenter - neckW / 2 - border, bodyCenter + neckW / 2 + border, 9);
  return grid;
}
function drawTree(rows, cols, rng) {
  const grid = new Array(rows * cols);
  fillBands(grid, rows, cols, [0, 1, 2]);
  const groundTop = rows * (0.88 + rng() * 0.04);
  fillRect(grid, rows, cols, groundTop, rows * 0.97, 0, cols, 9);
  fillRect(grid, rows, cols, rows * 0.97, rows, 0, cols, 10);
  const trunkW = cols * (0.08 + rng() * 0.03);
  const trunkCenter = cols * (0.42 + rng() * 0.16);
  fillRect(grid, rows, cols, rows * (0.5 + rng() * 0.06), groundTop, trunkCenter - trunkW / 2, trunkCenter + trunkW / 2, 9);
  fillRect(grid, rows, cols, rows * (0.5 + rng() * 0.06), groundTop, trunkCenter + trunkW / 2 - Math.max(1, trunkW * 0.2), trunkCenter + trunkW / 2, 10);
  const canopyR = rows * (0.24 + rng() * 0.06);
  const canopyCr = rows * (0.35 + rng() * 0.06);
  const canopyRc = canopyR * (cols / rows) * 1.05;
  fillEllipse(grid, rows, cols, canopyCr, trunkCenter, canopyR, canopyRc, 7);
  fillEllipse(grid, rows, cols, canopyCr, trunkCenter, canopyR * 0.88, canopyRc * 0.88, 6);
  fillEllipse(grid, rows, cols, canopyCr - canopyR * 0.25, trunkCenter - canopyRc * 0.25, canopyR * 0.4, canopyRc * 0.4, 5);
  const fruitCount = Math.max(3, Math.round((canopyR * canopyRc) / (rows * 3)));
  for (let i = 0; i < fruitCount; i++) {
    const ang = rng() * Math.PI * 2;
    const dist = 0.3 + rng() * 0.55;
    const r = Math.round(canopyCr + canopyR * Math.sin(ang) * dist);
    const c = Math.round(trunkCenter + canopyRc * Math.cos(ang) * dist);
    const dotR = Math.max(1, Math.round(Math.min(rows, cols) * 0.014));
    fillEllipse(grid, rows, cols, r, c, dotR, dotR, 14);
  }
  return grid;
}
const MS_TEMPLATES = { drawMoonAndStars, drawMushroom, drawRaven, drawPotionBottle, drawTree };

function msGenerateLevel(levelIndex) {
  const level = MS_LEVELS[levelIndex];
  const [rows, cols] = level.g;
  const grid = MS_TEMPLATES[level.template](rows, cols, mulberry32(level.seed));
  return {
    rows, cols, db: level.db, grid,
    maxColors: msColorsInLevel(grid).length,
    totalByColor: msOriginalColorTotals(grid),
  };
}
function msColumnsFromGrid(grid, rows, cols) {
  const columns = [];
  for (let c = 0; c < cols; c++) {
    const col = [];
    for (let r = rows - 1; r >= 0; r--) col.push(grid[r * cols + c]); // bottom-up
    columns.push(col);
  }
  return columns;
}

/* ══════════════════════════════════════════════════════════
   CORE PURE LOGIC — no DOM/globals, reused verbatim by
   scripts/generate-mosaik-levels.js and scripts/verify-mosaik-levels.js
   via the module.exports guard at the bottom of this file.
══════════════════════════════════════════════════════════ */
function msOriginalColorTotals(grid) {
  const totals = new Map();
  for (const v of grid) totals.set(v, (totals.get(v) || 0) + 1);
  return totals;
}
function msBucketCapacity(originalTotal) {
  return Math.max(1, Math.ceil(originalTotal * MS_BUCKET_CAPACITY_FRACTION));
}
function msColorTotalCount(columns, color) {
  let n = 0;
  for (const col of columns) if (col.length) for (const v of col) if (v === color) n++;
  return n;
}
// How many columns CURRENTLY have this color exposed at the bottom
// (col[0]) — i.e. immediately collectible right now, as opposed to
// msColorTotalCount's "anywhere in the picture, however deeply buried."
// Used by the generator's placement strategy: picking by total supply
// alone can assign a container to a color that's completely buried under
// OTHER not-yet-collected colors, permanently starving it (and every
// other slot filled the same way) while a couple of small, unassigned
// colors quietly block all progress — a real deadlock, not just slow.
function msExposedCount(columns, color) {
  let n = 0;
  for (const col of columns) if (col.length && col[0] === color) n++;
  return n;
}
function msColorsInLevel(grid) { return [...new Set(grid)].sort((a, b) => a - b); }
function msIsCleared(columns) { return columns.every(col => col.length === 0); }

// exp(-x²/2σ²) — a bell curve, not a hard cutoff: weight is 1 at the center
// and fades smoothly toward (but never exactly reaches) 0 at the edges, so
// "how far this container reaches" is a matter of likelihood, not a sharp
// in-or-out square window.
function msGaussianWeight(distance, sigma) {
  return Math.exp(-(distance * distance) / (2 * sigma * sigma));
}

// Advances every active container's belt position by dtMs, and — once its
// own per-container collection cooldown has elapsed — reaches into a small
// 2D neighborhood around it: columns near its belt position (wrapping same
// as beltPos itself) at shallow depths into each one's current remaining
// stack. Each candidate cell is collected with probability equal to a 2D
// Gaussian centered on the container (peak at its own column/frontmost
// cell, fading with column-distance and depth) — see msGaussianWeight —
// rather than deterministically grabbing everything within a flat window.
// MUTATES state.columns/state.containers directly (this runs every
// animation frame; performance matters here unlike every other mini-game's
// occasional full-rebuild-on-tap model). Returns the column indices any
// pixel was actually collected from this tick (duplicates possible if more
// than one cell was pulled from the same column), for the caller's visual
// feedback (empty array in the common case where nothing rolled a hit).
function msTick(state, dtMs) {
  const removedCols = [];
  const stillActive = [];
  const colReach   = Math.max(0, Math.floor(state.cols * MS_COLLECT_REACH_FRACTION / 2));
  const depthReach = Math.max(1, Math.floor(state.rows * MS_COLLECT_REACH_FRACTION));
  const colSigma   = Math.max(1, colReach / 3);
  const depthSigma = Math.max(1, depthReach / 3);
  for (const c of state.containers) {
    c.beltPos = (c.beltPos + state.beltSpeedColsPerSec * dtMs / 1000) % state.cols;
    c.msSinceCollect += dtMs;
    if (c.filled < c.capacity && c.msSinceCollect >= state.collectIntervalMs) {
      const centerCol = Math.floor(c.beltPos);
      for (let off = -colReach; off <= colReach && c.filled < c.capacity; off++) {
        const colWeight = msGaussianWeight(off, colSigma);
        const colIdx = ((centerCol + off) % state.cols + state.cols) % state.cols;
        const col = state.columns[colIdx];
        let examined = 0, idx = 0;
        while (examined < depthReach && idx < col.length && c.filled < c.capacity) {
          const isMatch = col[idx] === c.color;
          const hit = isMatch && Math.random() < colWeight * msGaussianWeight(idx, depthSigma);
          if (hit) {
            col.splice(idx, 1); // this cell leaves the stack; the rest re-renders compacted around the gap
            c.filled++;
            removedCols.push(colIdx);
          } else {
            idx++; // no shift happened, so advance past this position
          }
          examined++;
        }
      }
      c.msSinceCollect = 0;
    }
    if (c.filled < c.capacity) stillActive.push(c); // else: bucket's done, frees its slot
  }
  state.containers = stillActive;
  return removedCols;
}

/* ══════════════════════════════════════════════════════════
   GAME FLOW — reads/writes G.mosaik
══════════════════════════════════════════════════════════ */
let msRafId = null;       // requestAnimationFrame handle, so the loop can be cancelled/restarted cleanly
let msLastFrameTime = null;
let msPictureCtx = null;  // native-resolution picture canvas 2D context
let msPictureImageData = null;
let msOverlayCtx = null;  // display-resolution container-sprite canvas 2D context

function msOnColorTap(color) {
  const ms = G.mosaik;
  if (ms.currentLevelIndex == null) return;
  const level = msGenerateLevel(ms.currentLevelIndex);
  const slotsUnlocked = ms.slotsUnlocked || level.db;
  if (ms.containers.some(c => c.color === color)) return; // already collecting this color
  if (ms.containers.length >= slotsUnlocked) { showToast("🪣 Keine freie Behälter! Mehr freischalten (1 Frage) oder einen verwerfen?"); return; }
  if (msColorTotalCount(ms.columns, color) === 0) return; // fully exhausted already
  ms.containers.push({
    color, capacity: msBucketCapacity(level.totalByColor.get(color)),
    filled: 0, beltPos: 0, msSinceCollect: 0,
  });
  saveState(); // explicit — mid-level progress must survive a reload
  msRenderColorRow(level);
}

// Unlocks one more active slot, up to level.db (the generator-proven
// ceiling — never exceeded, see MS_STARTING_SLOTS_HANDICAP). Mirrors
// wsBuyExtraBottle / plBuyExtraBay exactly: costs one question.
function msBuyExtraSlot() {
  const ms = G.mosaik;
  if (ms.currentLevelIndex == null) return;
  const level = msGenerateLevel(ms.currentLevelIndex);
  const slotsUnlocked = ms.slotsUnlocked || level.db;
  if (slotsUnlocked >= level.db) {
    showToast(`Maximal ${level.db} Behälter für dieses Level!`);
    return;
  }
  if (!hasActiveQuestions()) {
    showToast("Keine aktiven Fragen! Aktiviere Kapitel unter 📚.");
    return;
  }
  askQuestions("🪣 Behälter freischalten", 1, () => {
    ms.slotsUnlocked = slotsUnlocked + 1;
    G.stats.mosaikSlotsUnlocked = (G.stats.mosaikSlotsUnlocked || 0) + 1;
    checkTrophies();
    saveState();
    msRenderColorRow(level);
    showToast("🪣 Neuer Behälterplatz freigeschaltet!");
  }, null);
}

function msOnLevelSolved() {
  G.stats.mosaikLevelsCompleted = (G.stats.mosaikLevelsCompleted || 0) + 1;
  checkTrophies();
  showToast("🧩 Mosaik gelöst!");
  saveState();
  setTimeout(msAdvanceToNextLevel, 900);
}

function msAdvanceToNextLevel() {
  const ms = G.mosaik;
  ms.playOrderPos++;
  if (ms.playOrderPos >= ms.playOrder.length) {
    const prevLast = ms.playOrder[ms.playOrder.length - 1];
    const order = shuffleArray([...Array(MS_LEVEL_COUNT).keys()]);
    if (order[0] === prevLast) [order[0], order[1]] = [order[1], order[0]];
    ms.playOrder = order;
    ms.playOrderPos = 0;
  }
  msStartLevel(ms.playOrder[ms.playOrderPos]);
}

function msStartLevel(levelIndex) {
  const ms = G.mosaik;
  const level = msGenerateLevel(levelIndex);
  ms.currentLevelIndex = levelIndex;
  ms.columns = msColumnsFromGrid(level.grid, level.rows, level.cols);
  ms.containers = [];
  ms.discardsUsed = 0;
  ms.slotsUnlocked = Math.max(1, level.db - MS_STARTING_SLOTS_HANDICAP);
  saveState();
  msSetupCanvases(level);
  msRenderColorRow(level);
}

function msRestartLevel() {
  const ms = G.mosaik;
  if (ms.currentLevelIndex == null) return;
  msStartLevel(ms.currentLevelIndex);
  showToast("🔄 Level neu gestartet.");
}

function msEnsureQueueAndLevel() {
  const ms = G.mosaik;
  if (!ms.playOrder.length) {
    ms.playOrder = shuffleArray([...Array(MS_LEVEL_COUNT).keys()]);
    ms.playOrderPos = 0;
  }
  if (ms.currentLevelIndex == null || !ms.columns.length) {
    msStartLevel(ms.playOrder[ms.playOrderPos]);
  } else {
    const level = msGenerateLevel(ms.currentLevelIndex);
    msSetupCanvases(level, true); // reconstruct the picture bitmap from current (already-dug) columns
    msRenderColorRow(level);
  }
  msStartLoop();
}

// Discards a currently-active container (forfeiting its partial fill),
// immediately freeing its slot for a different color. This is the belt
// game's real relief valve — a container whose color has stopped surfacing
// anywhere would otherwise hold its slot hostage forever (containers are
// never auto-evicted, per the confirmed design), so recognizing a dead
// pick and cutting losses is the actual player skill, gated the same way
// as every other mini-game's relief costs ("answer a question for X").
function msDiscardContainer(containerIndex) {
  const ms = G.mosaik;
  if (ms.currentLevelIndex == null) return;
  if (containerIndex < 0 || containerIndex >= ms.containers.length) return;
  if ((ms.discardsUsed || 0) >= MS_MAX_DISCARDS_PER_LEVEL) {
    showToast(`Maximal ${MS_MAX_DISCARDS_PER_LEVEL} Verwerfungen pro Level!`);
    return;
  }
  if (!hasActiveQuestions()) {
    showToast("Keine aktiven Fragen! Aktiviere Kapitel unter 📚.");
    return;
  }
  const level = msGenerateLevel(ms.currentLevelIndex);
  askQuestions("🗑️ Behälter verwerfen", 1, () => {
    ms.containers.splice(containerIndex, 1);
    ms.discardsUsed = (ms.discardsUsed || 0) + 1;
    G.stats.mosaikContainersDiscarded = (G.stats.mosaikContainersDiscarded || 0) + 1;
    checkTrophies();
    saveState();
    msRenderColorRow(level);
    showToast("🗑️ Behälter verworfen — Platz frei!");
  }, null);
}

/* ══════════════════════════════════════════════════════════
   RENDERING — canvas-based (see file header for why). Two layers:
   a native-resolution picture canvas (one canvas pixel per grid cell,
   scaled up via CSS `image-rendering: pixelated`), updated incrementally
   via ImageData as pixels are collected; and a display-resolution overlay
   canvas for the handful of moving container sprites, redrawn every
   animation frame. Only the color-row / bucket-row / info text still use
   the app's usual innerHTML-rebuild convention (cheap, infrequent).
══════════════════════════════════════════════════════════ */
function msHexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
const MS_PALETTE_RGB = MS_COLORS.map(msHexToRgb);

function msSetupCanvases(level, preserveCurrentColumns) {
  const pictureCanvas = document.getElementById("ms-grid");
  const overlayCanvas = document.getElementById("ms-overlay");
  if (!pictureCanvas || !overlayCanvas) return;
  pictureCanvas.width = level.cols;
  pictureCanvas.height = level.rows;
  msPictureCtx = pictureCanvas.getContext("2d");
  msPictureImageData = msPictureCtx.createImageData(level.cols, level.rows);

  const ms = G.mosaik;
  const columns = preserveCurrentColumns ? ms.columns : msColumnsFromGrid(level.grid, level.rows, level.cols);
  const buf = msPictureImageData.data;
  for (let c = 0; c < level.cols; c++) {
    const col = columns[c];
    for (let r = 0; r < level.rows; r++) {
      const stackIdx = level.rows - 1 - r;
      const val = stackIdx < col.length ? col[stackIdx] : null;
      const i = (r * level.cols + c) * 4;
      if (val == null) { buf[i + 3] = 0; continue; }
      const [rr, gg, bb] = MS_PALETTE_RGB[val];
      buf[i] = rr; buf[i + 1] = gg; buf[i + 2] = bb; buf[i + 3] = 255;
    }
  }
  msPictureCtx.putImageData(msPictureImageData, 0, 0);

  const rect = pictureCanvas.getBoundingClientRect();
  overlayCanvas.width = Math.max(1, Math.round(rect.width));
  overlayCanvas.height = Math.max(1, Math.round(rect.height));
  msOverlayCtx = overlayCanvas.getContext("2d");
}

// Redraws one whole column from the current (already-shifted) `col` stack,
// so the remaining pixels stay compacted against the bottom — i.e. fall
// down to close the gap — instead of leaving a permanent hole where the
// collected pixel used to be. Cheap: at most `rows` cells touched, and only
// for columns a collection actually happened in this tick.
function msRedrawColumn(colIdx, col, rows, cols) {
  if (!msPictureCtx || !msPictureImageData) return;
  const buf = msPictureImageData.data;
  for (let r = 0; r < rows; r++) {
    const stackIdx = rows - 1 - r;
    const i = (r * cols + colIdx) * 4;
    if (stackIdx < col.length) {
      const [rr, gg, bb] = MS_PALETTE_RGB[col[stackIdx]];
      buf[i] = rr; buf[i + 1] = gg; buf[i + 2] = bb; buf[i + 3] = 255;
    } else {
      buf[i + 3] = 0;
    }
  }
  msPictureCtx.putImageData(msPictureImageData, 0, 0, colIdx, 0, 1, rows);
}

function msRenderColorRow(level) {
  const ms = G.mosaik;
  const infoEl = document.getElementById("ms-level-info");
  const bucketRowEl = document.getElementById("ms-bucket-row");
  const colorRowEl = document.getElementById("ms-color-row");
  const discardStatusEl = document.getElementById("ms-discard-status");
  const buySlotBtn = document.getElementById("ms-buy-slot-btn");
  if (!colorRowEl) return;

  const slotsUnlocked = ms.slotsUnlocked || level.db;

  if (infoEl) infoEl.textContent = `Level ${ms.currentLevelIndex + 1} / ${MS_LEVEL_COUNT}`;

  if (bucketRowEl) {
    bucketRowEl.innerHTML = Array.from({ length: level.db }, (_, i) => {
      if (i >= slotsUnlocked) return `<div class="ms-bucket-slot ms-bucket-slot--locked"></div>`;
      const c = ms.containers[i];
      if (!c) return `<div class="ms-bucket-slot ms-bucket-slot--empty"></div>`;
      const pct = Math.round((c.filled / c.capacity) * 100);
      return `<button class="ms-bucket-slot ms-bucket-slot--filled" style="background:${MS_COLORS[c.color]};" data-idx="${i}" title="Verwerfen (1 Frage)">
        <div class="ms-bucket-fill" style="height:${pct}%"></div>
        <span class="ms-bucket-label">${c.filled}/${c.capacity}</span>
      </button>`;
    }).join("");
    bucketRowEl.querySelectorAll(".ms-bucket-slot--filled").forEach(el => {
      el.onclick = () => msDiscardContainer(parseInt(el.dataset.idx, 10));
    });
  }

  const activeColors = new Set(ms.containers.map(c => c.color));
  const availableColors = msColorsInLevel(ms.columns.flat())
    .filter(c => !activeColors.has(c) && msColorTotalCount(ms.columns, c) > 0);
  colorRowEl.innerHTML = availableColors.map(color =>
    `<button class="ms-color-swatch" style="background:${MS_COLORS[color]};" data-color="${color}"></button>`
  ).join("");
  colorRowEl.querySelectorAll(".ms-color-swatch").forEach(el => {
    el.onclick = () => msOnColorTap(parseInt(el.dataset.color, 10));
  });

  if (discardStatusEl) {
    discardStatusEl.textContent = `🗑️ Verwerfen: ${ms.discardsUsed || 0}/${MS_MAX_DISCARDS_PER_LEVEL}`;
  }

  if (buySlotBtn) {
    const atCap = slotsUnlocked >= level.db;
    buySlotBtn.disabled = atCap;
    buySlotBtn.classList.toggle("ws-buy-bottle-btn--off", atCap);
    buySlotBtn.textContent = atCap
      ? "➕ Maximal erreicht"
      : `➕ Behälter (1 Frage) · ${slotsUnlocked}/${level.db}`;
  }
}

function msDrawOverlay(level) {
  if (!msOverlayCtx) return;
  const ctx = msOverlayCtx;
  const w = ctx.canvas.width, h = ctx.canvas.height;
  ctx.clearRect(0, 0, w, h);
  const ms = G.mosaik;
  const colW = w / level.cols;
  const r = Math.max(3, Math.min(colW * 0.6, h * 0.04));
  ms.containers.forEach(c => {
    const x = (c.beltPos + 0.5) * colW;
    const y = h - r - 2;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = MS_COLORS[c.color];
    ctx.fill();
    ctx.lineWidth = Math.max(1, r * 0.15);
    ctx.strokeStyle = "rgba(0,0,0,0.35)";
    ctx.stroke();
  });
}

function msStartLoop() {
  if (msRafId != null) return; // already running
  msLastFrameTime = null;
  const frame = (t) => {
    const screenEl = document.getElementById("screen-mosaik");
    if (!screenEl || screenEl.hidden) { msRafId = null; return; } // tab switched away — stop, restarted by msEnsureQueueAndLevel on return
    const ms = G.mosaik;
    if (ms.currentLevelIndex == null) { msRafId = requestAnimationFrame(frame); return; }
    const level = msGenerateLevel(ms.currentLevelIndex);
    const dtMs = msLastFrameTime == null ? 0 : Math.min(200, t - msLastFrameTime); // clamp huge gaps (tab was backgrounded)
    msLastFrameTime = t;

    if (dtMs > 0 && ms.containers.length) {
      const tickState = { columns: ms.columns, containers: ms.containers, cols: level.cols, rows: level.rows, beltSpeedColsPerSec: MS_BELT_SPEED_COLS_PER_SEC, collectIntervalMs: MS_COLLECT_INTERVAL_MS };
      const removedCols = msTick(tickState, dtMs);
      ms.containers = tickState.containers;
      if (removedCols.length) {
        [...new Set(removedCols)].forEach(colIdx => msRedrawColumn(colIdx, ms.columns[colIdx], level.rows, level.cols));
        saveState();
        // Refresh on EVERY real collection, not just when a bucket completes —
        // otherwise `filled` keeps incrementing correctly underneath (confirmed
        // by direct inspection) while the bucket-row's displayed fill bar/label
        // stays visually frozen at its placement-time value the whole time,
        // which reads as a totally broken/stuck container to the player. This
        // is naturally throttled already: it only runs on frames where a
        // collection actually happened, which collectIntervalMs caps per
        // container (~90ms), not on every animation frame.
        msRenderColorRow(level);
        if (msIsCleared(ms.columns)) { msOnLevelSolved(); msRafId = requestAnimationFrame(frame); return; }
      }
    }
    msDrawOverlay(level);
    msRafId = requestAnimationFrame(frame);
  };
  msRafId = requestAnimationFrame(frame);
}

if (typeof window !== 'undefined') {
  window.msOnColorTap = msOnColorTap;
  window.msRestartLevel = msRestartLevel;
  window.msEnsureQueueAndLevel = msEnsureQueueAndLevel;
  window.msDiscardContainer = msDiscardContainer;
  window.msBuyExtraSlot = msBuyExtraSlot;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MS_COLORS, MS_LEVELS, MS_LEVEL_COUNT, MS_MAX_DISCARDS_PER_LEVEL,
    MS_BUCKET_CAPACITY_FRACTION, MS_BELT_SPEED_COLS_PER_SEC, MS_COLLECT_INTERVAL_MS,
    MS_COLLECT_REACH_FRACTION,
    MS_TEMPLATES, mulberry32,
    msGenerateLevel, msColumnsFromGrid, msOriginalColorTotals, msBucketCapacity,
    msColorTotalCount, msExposedCount, msColorsInLevel, msIsCleared, msTick,
  };
}
