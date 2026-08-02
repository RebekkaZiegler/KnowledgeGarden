// Regenerates the HL_LEVELS data baked into js/hole.js. Run this if you ever
// want to change level count, the site-count/size-variety difficulty ramp,
// the stencil shapes, or just reroll the level pool. Paste the printed
// `const HL_LEVELS = [...]` line over the existing one in js/hole.js.
//
// v3: objects are no longer scattered into loose random clusters — each
// level is a handful of "sites" scattered across a big world (much larger
// than one screen; the live game's camera follows the hole and pans/zooms
// as it grows rather than showing one small fixed board), and each site's
// objects are placed on the "on" cells of a simple icon silhouette (star/
// heart/house/etc. — see HL_STENCILS) rather than randomly, so a pile reads
// as a recognizable shape from above before you dig into it.
//
// Still runs a REAL headless Cannon.js physics simulation per level:
//   1. Build a global class sequence (indices into HL_SIZE_CLASSES, shared
//      with js/hole.js) via the same "next index <= currently reachable
//      index" construction used by every other minigame's generator in this
//      repo, then hand out contiguous chunks of it to each site's cells (a
//      contiguous chunk has a narrower size range than a random sample of
//      the same length would — see dropAndSettle's comment on why that
//      matters for box colliders specifically).
//   2. Drop those objects (as box bodies — see dropAndSettle's comment on
//      why boxes, not spheres) from a short height above their stencil
//      cell's world position, and let them settle under gravity.
//   3. Bake the SETTLED transforms into the level data — the live game loads
//      this pre-settled snapshot directly rather than re-simulating the drop
//      every session.
//   4. Independently VERIFY the level actually clears using the SAME
//      threshold-based growth rule as the live game (hlGrowthThreshold —
//      eating an object doesn't instantly unlock the next size, it takes a
//      few), by replaying a physical kinematic "rim" body (matching the
//      live game's own drag-hole collider, including its now-decoupled,
//      much-larger hlHoleRadius) visiting every remaining object in turn and
//      letting real physics resolve whatever that disturbs, in repeated
//      rounds until nothing changes.
//
// Hard-won lessons baked into the logic below (kept from earlier versions):
//   - Wall CANNON.Plane rotations are easy to get backwards, silently
//     turning a boundary into a launcher — verify a wall's world-space
//     normal actually points back toward its site/board center.
//   - The rim collider MUST have real vertical extent (a cylinder, not a
//     flat disc) — confined to floor height, it could never dislodge
//     anything sitting on TOP of a pile.
//   - Box colliders stack (spheres barely do), but too wide a size spread
//     within one pile can bury a small object under a big one in a way
//     that's genuinely hard to guarantee reachable — this is why
//     HL_MAX_CLASS_IDX_CAP stays well below HL_SIZE_CLASSES' full range.
//   - A single static visit doesn't always dislodge a wedged box; jiggling
//     the rim with small random offsets around each target does, reliably.

global.CANNON = require('../js/vendor/cannon.min.js');
const { HL_BOARD_HALF, HL_SIZE_CLASSES, HL_RIM_HEIGHT, HL_FLOOR_EPS, hlHoleRadius, hlGrowthThreshold } = require('../js/hole.js');

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

/* ══════════════════════════════════════════════════════════
   STENCILS — simple original silhouettes (not specific copyrighted
   characters/franchises — this project already moved away from that for
   Mosaik's pictures), each a boolean test over normalized (x,y) in
   [-1,1]×[-1,1]. Rasterized onto a small grid per site — see
   hlStencilCells. Verified by eye via an ASCII printout during development
   (9×9 prints as a clean, unambiguous circle/ring/diamond/cross/heart/
   arrow/house/tree at this resolution).
══════════════════════════════════════════════════════════ */
const HL_STENCILS = ['circle', 'ring', 'diamond', 'cross', 'heart', 'arrow', 'house', 'tree'];
function hlStencilContains(name, x, y) {
  switch (name) {
    case 'circle': return x * x + y * y <= 1;
    case 'ring': { const d = x * x + y * y; return d <= 1 && d >= 0.45; }
    case 'diamond': return Math.abs(x) + Math.abs(y) <= 1;
    case 'cross': return (Math.abs(x) <= 0.32 && Math.abs(y) <= 1) || (Math.abs(y) <= 0.32 && Math.abs(x) <= 1);
    case 'heart': {
      const X = x * 1.2, Y = -y * 1.2 - 0.3;
      const v = X * X + Y * Y - 1;
      return (v * v * v - X * X * Y * Y * Y) <= 0;
    }
    case 'arrow': {
      if (y >= 0.05) { const t = (y - 0.05) / 0.95; return Math.abs(x) <= (1 - t); }
      return Math.abs(x) <= 0.3 && y >= -1;
    }
    case 'house': {
      if (y >= 0) return Math.abs(x) <= (1 - y);
      return Math.abs(x) <= 0.7 && y >= -1;
    }
    case 'tree': {
      if (y >= -0.15) { const t = (y + 0.15) / 1.15; return Math.abs(x) <= 0.9 * (1 - t * 0.8) && y <= 1; }
      return Math.abs(x) <= 0.15 && y >= -1;
    }
    default: return x * x + y * y <= 1;
  }
}
// Returns [gx, gz] integer offsets (centered on 0) for every "on" cell of
// the named stencil at the given odd grid resolution.
function hlStencilCells(name, gridSize) {
  const half = (gridSize - 1) / 2;
  const cells = [];
  for (let gz = 0; gz < gridSize; gz++) {
    for (let gx = 0; gx < gridSize; gx++) {
      const x = (gx - half) / half, y = (gz - half) / half;
      if (hlStencilContains(name, x, y)) cells.push([gx - half, gz - half]);
    }
  }
  return cells;
}

const HL_STENCIL_GRID = 9;      // resolution each site's stencil is rasterized at — 23-49 "on" cells depending on shape
const HL_STENCIL_CELL_SIZE = 0.75; // world units per cell — a 9-cell-wide shape spans ~6 units, comfortably inside the live game's initial (zoomed-in) camera view

// Difficulty ramp: site count grows from 2 to 5 across the pool (each site
// is one stencil-shaped pile, ~25-55 objects depending on the shape and how
// many cells get a 2nd stacked object). The class cap stays at 3 (of
// HL_SIZE_CLASSES' 7 entries) for the same box-collider burial-risk reason
// as before — see this file's header.
const HL_LEVEL_COUNT = 40;
const HL_MAX_CLASS_IDX_CAP = 3;
function levelParams(levelIndex) {
  const siteCount = 2 + Math.floor((levelIndex / Math.max(1, HL_LEVEL_COUNT - 1)) * 3); // 2..5
  const maxClassIdx = Math.min(HL_MAX_CLASS_IDX_CAP, 1 + Math.floor(levelIndex / 8));
  return { siteCount, maxClassIdx };
}

// Same "eating order" construction as before: each new object's class is
// drawn from [0, min(reachableIdx, maxClassIdx)], reachableIdx ratcheting up
// after each draw. Under the live game's THRESHOLD growth rule (see
// hlGrowthThreshold) this is a slightly conservative — but still safe —
// heuristic for "roughly how much size variety is reasonable to hand out";
// the real solvability proof is verifyClears below, which uses the actual
// threshold rule, not this construction.
function buildClassSequence(objectCount, maxClassIdx, rng) {
  let reachableIdx = 0;
  const classes = [];
  for (let i = 0; i < objectCount; i++) {
    const cap = Math.min(reachableIdx, maxClassIdx);
    const idx = Math.floor(rng() * (cap + 1));
    classes.push(idx);
    reachableIdx = Math.max(reachableIdx, idx + 1);
  }
  return classes;
}

function makeWorld() {
  const world = new CANNON.World();
  world.gravity.set(0, -9.82, 0);
  world.broadphase = new CANNON.NaiveBroadphase();
  world.solver.iterations = 10;
  const ground = new CANNON.Body({ mass: 0 });
  ground.addShape(new CANNON.Plane());
  ground.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
  world.addBody(ground);
  // Wall normals verified to point back toward the world center (0,0) —
  // see this file's header note on the backwards-wall bug.
  const wallDefs = [
    { pos: [HL_BOARD_HALF + 0.5, 0, 0], angle: -Math.PI / 2 },
    { pos: [-HL_BOARD_HALF - 0.5, 0, 0], angle: Math.PI / 2 },
    { pos: [0, 0, HL_BOARD_HALF + 0.5], angle: Math.PI },
    { pos: [0, 0, -HL_BOARD_HALF - 0.5], angle: 0 },
  ];
  for (const w of wallDefs) {
    const b = new CANNON.Body({ mass: 0 });
    b.addShape(new CANNON.Plane());
    b.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), w.angle);
    b.position.set(...w.pos);
    world.addBody(b);
  }
  return world;
}

// Picks siteCount well-separated centers across the big world — the first
// always near the origin (where the hole starts) so the opening view isn't
// empty, the rest scattered further out so exploring toward the camera's
// edge actually reveals a new site, per the user's "drive to the border,
// move forward" request.
function pickSiteCenters(siteCount, rng) {
  const centers = [{ x: (rng() * 2 - 1) * 3, z: (rng() * 2 - 1) * 3 }];
  const minSep = 13;
  for (let s = 1; s < siteCount; s++) {
    let cx, cz, tries = 0;
    do {
      cx = (rng() * 2 - 1) * (HL_BOARD_HALF - 6);
      cz = (rng() * 2 - 1) * (HL_BOARD_HALF - 6);
      tries++;
    } while (centers.some(c => Math.hypot(c.x - cx, c.z - cz) < minSep) && tries < 200);
    centers.push({ x: cx, z: cz });
  }
  return centers;
}

// Assigns each site a stencil (no immediate repeat) and expands it into a
// flat list of {x, z} world offsets from the site center — one per stencil
// cell, plus a further ~20% of cells getting a SECOND position stacked
// directly above the first (dropped from extra height so it lands on top),
// which is where genuine "on top of each other, crumbles when disturbed"
// piles come from now that most positions are otherwise one-object-per-cell
// (spread across a shape's area rather than jammed into one tight cluster).
function planSitePositions(siteCount, rng) {
  const positions = []; // { siteIndex, x, z, stackDepth }
  let lastStencil = null;
  for (let s = 0; s < siteCount; s++) {
    let stencil;
    do { stencil = HL_STENCILS[Math.floor(rng() * HL_STENCILS.length)]; } while (stencil === lastStencil && HL_STENCILS.length > 1);
    lastStencil = stencil;
    const cells = hlStencilCells(stencil, HL_STENCIL_GRID);
    for (const [gx, gz] of cells) {
      positions.push({ siteIndex: s, x: gx * HL_STENCIL_CELL_SIZE, z: gz * HL_STENCIL_CELL_SIZE, stackDepth: 0 });
      if (rng() < 0.2) positions.push({ siteIndex: s, x: gx * HL_STENCIL_CELL_SIZE, z: gz * HL_STENCIL_CELL_SIZE, stackDepth: 1 });
    }
  }
  return positions;
}

function dropAndSettle(world, siteCenters, sitePositions, classSeq, rng) {
  // Box colliders, not spheres — measured directly during an earlier
  // version: spheres barely stack (a sphere balanced on another is only in
  // equilibrium if perfectly centered, so any real jitter just rolls them
  // apart into a flat spread), while boxes (flat faces resting on flat
  // faces) actually pile up. The live game's varied visual meshes (box/
  // sphere/cylinder/cone/etc, see js/hole.js's hlShapeFor) are no worse an
  // approximation of a box collider than they'd be of a sphere one — same
  // "simplify the physics shape" tradeoff every casual physics game makes.
  const objs = sitePositions.map((pos, i) => {
    const classIdx = classSeq[i];
    const r = HL_SIZE_CLASSES[classIdx];
    const center = siteCenters[pos.siteIndex];
    const body = new CANNON.Body({ mass: Math.max(0.2, r * r * r) });
    body.addShape(new CANNON.Box(new CANNON.Vec3(r, r, r)));
    body.position.set(
      center.x + pos.x + (rng() * 2 - 1) * 0.08,
      1.5 + pos.stackDepth * 0.6,
      center.z + pos.z + (rng() * 2 - 1) * 0.08
    );
    body.quaternion.setFromEuler((rng() - 0.5) * 0.3, rng() * Math.PI, (rng() - 0.5) * 0.3);
    body.allowSleep = true;
    body.sleepSpeedLimit = 0.15;
    body.sleepTimeLimit = 0.3;
    body.linearDamping = 0.5;
    body.angularDamping = 0.5;
    world.addBody(body);
    return { body, classIdx, r, alive: true };
  });

  const dt = 1 / 60;
  const maxSteps = 60 * 15; // 15 simulated seconds budget
  let steps = 0;
  while (steps < maxSteps) {
    world.step(dt);
    steps++;
    if (steps > 30 && objs.every(o => o.body.sleepState === CANNON.Body.SLEEPING)) break;
  }
  return objs;
}

function makeRimShape(radius) {
  return new CANNON.Cylinder(radius, radius, HL_RIM_HEIGHT, 12);
}

// Independent verifier: repeatedly visits every still-alive object's
// current position with the real (tall-cylinder) rim collider, jiggling it
// with small random offsets (a single static visit doesn't always dislodge
// a wedged box) and stepping physics there so any real disturbance
// resolves, then re-scans for anything now eatable-and-at-floor-rest. Loops
// in rounds until a full round makes no progress, at which point it shakes
// every remaining body at once as a last resort before giving up. Growth
// uses the SAME threshold rule as the live game (hlGrowthThreshold) — not
// instant-on-first-bite — so this is a faithful proof of real solvability,
// not just the easier "construction" guarantee.
function verifyClears(world, objs) {
  let holeClassIdx = 0;
  let growthProgress = 0;
  const rim = new CANNON.Body({ mass: 0, type: CANNON.Body.KINEMATIC });
  rim.addShape(makeRimShape(hlHoleRadius(holeClassIdx)));
  rim.position.set(0, HL_RIM_HEIGHT / 2, 0);
  world.addBody(rim);

  const dt = 1 / 60;
  let totalSteps = 0;
  const maxTotalSteps = 60 * 240; // 240 simulated seconds budget — bigger levels (more sites) need more room than the old single-cluster levels did

  function scanAndSwallow(x, z) {
    let any = false;
    for (const o of objs) {
      if (!o.alive || o.classIdx > holeClassIdx) continue;
      if (Math.abs(o.body.position.y - o.r) > HL_FLOOR_EPS) continue;
      const holeRadius = hlHoleRadius(holeClassIdx);
      if (Math.hypot(o.body.position.x - x, o.body.position.z - z) > holeRadius) continue;
      o.alive = false;
      world.removeBody(o.body);
      growthProgress++;
      while (holeClassIdx < HL_SIZE_CLASSES.length - 1 && growthProgress >= hlGrowthThreshold(holeClassIdx)) {
        growthProgress -= hlGrowthThreshold(holeClassIdx);
        holeClassIdx++;
        rim.shapes = [];
        rim.addShape(makeRimShape(hlHoleRadius(holeClassIdx)));
      }
      any = true;
    }
    return any;
  }

  let stuckRounds = 0;
  while (totalSteps < maxTotalSteps) {
    let progressed = false;
    const targets = objs.filter(o => o.alive).map(o => ({ x: o.body.position.x, z: o.body.position.z }));
    if (!targets.length) break;
    for (const t of targets) {
      if (totalSteps >= maxTotalSteps) break;
      for (let jig = 0; jig < 3 && totalSteps < maxTotalSteps; jig++) {
        const jx = t.x + (Math.random() - 0.5) * 0.3;
        const jz = t.z + (Math.random() - 0.5) * 0.3;
        rim.position.set(jx, HL_RIM_HEIGHT / 2, jz);
        for (let s = 0; s < 25 && totalSteps < maxTotalSteps; s++) {
          world.step(dt);
          totalSteps++;
          if (scanAndSwallow(jx, jz)) progressed = true;
        }
      }
    }
    if (progressed) { stuckRounds = 0; continue; }
    stuckRounds++;
    if (stuckRounds > 6) break;
    for (const o of objs) {
      if (!o.alive) continue;
      o.body.wakeUp();
      o.body.velocity.x += (Math.random() - 0.5) * 2;
      o.body.velocity.y += Math.random() * 1.5;
      o.body.velocity.z += (Math.random() - 0.5) * 2;
    }
    for (let s = 0; s < 40 && totalSteps < maxTotalSteps; s++) { world.step(dt); totalSteps++; }
  }
  return { cleared: objs.every(o => !o.alive), remainingCount: objs.filter(o => o.alive).length };
}

const levels = [];
for (let i = 0; i < HL_LEVEL_COUNT; i++) {
  const { siteCount, maxClassIdx } = levelParams(i);
  const t0 = Date.now();
  let accepted = null;
  let attempt = 0;
  const maxAttempts = 20;
  let objectCount = 0;
  while (attempt < maxAttempts && !accepted) {
    const rng = mulberry32(seedForLevel(i, attempt));
    const siteCenters = pickSiteCenters(siteCount, rng);
    const sitePositions = planSitePositions(siteCount, rng);
    objectCount = sitePositions.length;
    const classSeq = buildClassSequence(objectCount, maxClassIdx, rng);
    const world = makeWorld();
    const objs = dropAndSettle(world, siteCenters, sitePositions, classSeq, rng);
    // Snapshot the settled transforms BEFORE verifyClears mutates the world
    // (it removes bodies as it swallows them).
    const settled = objs.map(o => ({
      classIdx: o.classIdx,
      p: [o.body.position.x, o.body.position.y, o.body.position.z],
      q: [o.body.quaternion.x, o.body.quaternion.y, o.body.quaternion.z, o.body.quaternion.w],
    }));
    const verify = verifyClears(world, objs);
    attempt++;
    if (verify.cleared) {
      accepted = settled;
    } else {
      console.error(`  level ${i} attempt ${attempt}: NOT solvable (${verify.remainingCount}/${objectCount} stuck), retrying with a new seed...`);
    }
  }
  if (!accepted) {
    console.error(`Level ${i}: FAILED to find a verified-solvable layout in ${maxAttempts} attempts (sites=${siteCount}, objects=${objectCount}, maxClassIdx=${maxClassIdx}).`);
    process.exit(1);
  }
  console.log(`Level ${i}: OK (sites=${siteCount}, objects=${objectCount}, maxClassIdx=${maxClassIdx}, attempts=${attempt}, ${Date.now() - t0}ms)`);
  levels.push({
    o: accepted.map(s => [
      s.classIdx,
      Math.round(s.p[0] * 1000), Math.round(s.p[1] * 1000), Math.round(s.p[2] * 1000),
      Math.round(s.q[0] * 1000), Math.round(s.q[1] * 1000), Math.round(s.q[2] * 1000), Math.round(s.q[3] * 1000),
    ]),
  });
}

console.log('\n--- paste this over the HL_LEVELS line in js/hole.js ---\n');
console.log('const HL_LEVELS = ' + JSON.stringify(levels) + ';');
