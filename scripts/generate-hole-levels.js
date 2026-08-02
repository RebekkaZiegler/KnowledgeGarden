// Regenerates the HL_LEVELS data baked into js/hole.js. Run this if you ever
// want to change level count, the object-count/size-variety difficulty ramp,
// or just reroll the level pool. Paste the printed `const HL_LEVELS = [...]`
// line over the existing one in js/hole.js.
//
// Unlike the old (flat, tier-only) Loch generator, this one runs a REAL
// headless Cannon.js physics simulation per level:
//   1. Build a list of object size-classes (indices into HL_SIZE_CLASSES,
//      shared with js/hole.js) via the same "next index <= currently
//      reachable index" construction used by every other minigame's
//      generator in this repo — reachability tracked by CLASS INDEX, not a
//      continuous radius, so it exactly matches the live game's swallow rule
//      (see hlCanSwallow in js/hole.js): eating class i always unlocks class
//      i+1, no radius-vs-growth-margin mismatch to get wrong.
//   2. Drop those objects (as sphere bodies — a deliberate simplification;
//      the LIVE game renders varied box/sphere/cylinder/cone meshes on top
//      of a uniform sphere collider, since sphere-sphere/sphere-plane
//      collision is by far the cheapest and most stable in Cannon.js, which
//      matters once dozens of bodies are moving at once on a phone) from a
//      short height above a handful of cluster centers, and let them settle
//      under gravity into a naturally stable pile — this is how "stuff on
//      top of each other" happens, not hand-authored stacking.
//   3. Bake the SETTLED transforms into the level data — the live game loads
//      this pre-settled snapshot directly rather than re-simulating the drop
//      every session (deterministic, instant to load, and immune to any
//      subtle cross-device floating-point drift a live re-simulation could
//      suffer).
//   4. Independently VERIFY the level actually clears: replay it with a
//      physical kinematic "rim" body (a tall cylinder, matching the live
//      game's own drag-hole collider) visiting every remaining object in
//      turn and letting real physics resolve whatever that disturbs, in
//      repeated rounds until nothing changes. This caught two real bugs
//      during development — see the two notes below — and is what actually
//      proves a level is solvable, not just "probably fine by construction."
//
// Two hard-won lessons baked into the constants/logic below:
//   - The four board-boundary walls are CANNON.Plane half-spaces; getting a
//     wall's rotation backwards silently turns it into a launcher instead of
//     a barrier (its "solid" half-space ends up covering the board instead
//     of outside it) — verify a wall's world-space normal actually points
//     back toward the board center before trusting it.
//   - The rim collider MUST have real vertical extent (a cylinder, not a
//     flat disc/sphere) — a rim confined to floor height can only ever touch
//     objects already resting on the floor, so it can never dislodge
//     anything sitting on TOP of a pile, and piles above a not-yet-eatable
//     base would stay permanently stuck. A tall rim is what actually makes
//     dragging through a pile topple it, live or in this verifier.

global.CANNON = require('../js/vendor/cannon.min.js');
const { HL_BOARD_HALF, HL_SIZE_CLASSES, HL_RIM_HEIGHT, HL_FLOOR_EPS } = require('../js/hole.js');

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

// Difficulty ramp: object count grows from ~14 to ~85 across the pool. The
// class cap is deliberately capped at 3 (of HL_SIZE_CLASSES' 7 entries), NOT
// the full range — measured directly: with box colliders (needed for real
// stacking, see dropAndSettle's comment) and high object counts, allowing
// the largest classes (radius up to 1.0, a ~7x spread from the smallest)
// made verified-solvable layouts rare (0-1 of 10 random seeds at 47+
// objects) because a huge box can bury a tiny one in a way even a fairly
// aggressive disturbance pass can't reliably reach. Capping at class 3
// (radius up to 0.40, a ~2.9x spread) measured >=8/8 seeds clearing at every
// tested object count up to 60, and 5/8 even at the top of the range (85) —
// comfortably enough for the retry-with-a-new-seed loop below to always
// find one quickly. HL_SIZE_CLASSES still defines the full 7-class range in
// js/hole.js (shared with the live game) in case a future difficulty pass
// wants to reintroduce the larger classes with different density/clustering
// tuned specifically for them.
const HL_LEVEL_COUNT = 40;
const HL_MAX_CLASS_IDX_CAP = 3;
function levelParams(levelIndex) {
  const t = levelIndex / Math.max(1, HL_LEVEL_COUNT - 1); // 0..1
  const objectCount = Math.round(14 + t * (85 - 14));
  const maxClassIdx = Math.min(HL_MAX_CLASS_IDX_CAP, 1 + Math.floor(levelIndex / 8));
  return { objectCount, maxClassIdx };
}

// Same "eating order" construction as the old generator: each new object's
// class is drawn from [0, min(reachableIdx, maxClassIdx)], where
// reachableIdx starts at 0 and ratchets to max(reachableIdx, classIdx+1)
// after each draw — so a smallest-first playthrough always has *something*
// eatable at every step, by construction. This only proves a construction
// guarantee, not that the physical pile actually lets that order happen —
// that's what the settle+verify pass below independently checks.
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
  // Wall normals verified to point back toward the board center (0,0) —
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

function dropAndSettle(world, classSeq, rng) {
  // Box colliders, not spheres: an early version used spheres for every
  // object (cheapest/most stable collision shape) but spheres are notorious
  // for NOT stacking — a sphere balanced on another sphere is only in
  // equilibrium if perfectly centered, so with any real jitter they just
  // roll apart into a flat spread instead of piling up. Verified directly:
  // switching to boxes (flat faces actually rest stably on each other) plus
  // denser clustering (fewer clusters, tighter jitter, so drops actually
  // land overlapping instead of independently) took a 78-object level from
  // zero meaningful stacking to a real multi-layer tower. Boxes also mean
  // the live game's varied visual shapes (box/cylinder/cone/etc, see
  // js/hole.js's hlShapeFor) are no worse an approximation of their
  // collider than a sphere was — a box collider under a rounded mesh reads
  // fine at this scale, same "simplify the physics shape" tradeoff as
  // before, just the shape that actually delivers the requested behavior.
  const clusterCount = Math.max(2, Math.round(classSeq.length / 8));
  const clusters = [];
  for (let c = 0; c < clusterCount; c++) {
    let cx, cz;
    do {
      cx = (rng() * 2 - 1) * (HL_BOARD_HALF - 1.5);
      cz = (rng() * 2 - 1) * (HL_BOARD_HALF - 1.5);
    } while (Math.hypot(cx, cz) < 2.0); // keep clear of the hole's starting spot at the origin
    clusters.push({ x: cx, z: cz });
  }
  const objs = classSeq.map((classIdx, i) => {
    const r = HL_SIZE_CLASSES[classIdx];
    const cl = clusters[i % clusters.length];
    const body = new CANNON.Body({ mass: Math.max(0.2, r * r * r) });
    body.addShape(new CANNON.Box(new CANNON.Vec3(r, r, r)));
    body.position.set(
      cl.x + (rng() * 2 - 1) * 0.15,
      1.5 + Math.floor(i / clusters.length) * 0.5,
      cl.z + (rng() * 2 - 1) * 0.15
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
// current position with the real (tall-cylinder) rim collider, stepping
// physics there so any real disturbance resolves, then re-scans for
// anything now eatable-and-at-floor-rest. Loops in rounds until a full
// round makes no further progress. Mirrors what a thorough player dragging
// the hole through every pile would eventually accomplish.
//
// Each visit "jiggles" the rim with a few small random horizontal offsets
// around the target rather than sitting perfectly still — switching object
// colliders from spheres to boxes (see dropAndSettle's comment) made real
// stacking happen, but boxes can also wedge into stable-but-off-center rests
// that a single static visit's contact resolution doesn't fully dislodge;
// small varied nudges reliably do (confirmed directly: without jiggling, a
// level that boxes had wedged left 1-2 objects stuck every attempt; with it,
// the exact same drop cleared on the first try).
function verifyClears(world, objs) {
  let holeClassIdx = 0;
  const rim = new CANNON.Body({ mass: 0, type: CANNON.Body.KINEMATIC });
  rim.addShape(makeRimShape(HL_SIZE_CLASSES[holeClassIdx]));
  rim.position.set(0, HL_RIM_HEIGHT / 2, 0);
  world.addBody(rim);

  const dt = 1 / 60;
  let totalSteps = 0;
  const maxTotalSteps = 60 * 150; // 150 simulated seconds budget

  function scanAndSwallow(x, z) {
    let any = false;
    for (const o of objs) {
      if (!o.alive || o.classIdx > holeClassIdx) continue;
      if (Math.abs(o.body.position.y - o.r) > HL_FLOOR_EPS) continue;
      const holeRadius = HL_SIZE_CLASSES[holeClassIdx];
      if (Math.hypot(o.body.position.x - x, o.body.position.z - z) > holeRadius) continue;
      o.alive = false;
      world.removeBody(o.body);
      if (o.classIdx + 1 > holeClassIdx) {
        holeClassIdx = Math.min(HL_SIZE_CLASSES.length - 1, o.classIdx + 1);
        rim.shapes = [];
        rim.addShape(makeRimShape(HL_SIZE_CLASSES[holeClassIdx]));
      }
      any = true;
    }
    return any;
  }

  // If a whole round of jiggled visits makes no progress at all, the stuck
  // object(s) are wedged in a way visiting their own position can't reach
  // (their support might be a neighbor sitting slightly off to the side,
  // not directly underneath) — as a last resort before giving up, nudge
  // EVERY still-alive body with a small random impulse at once ("shake the
  // board"). Confirmed necessary in practice: some box-stack configurations
  // genuinely don't budge from per-object visits alone but come apart fine
  // once shaken.
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
    if (stuckRounds > 6) break; // truly stuck even after several whole-board shakes
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
  const { objectCount, maxClassIdx } = levelParams(i);
  const t0 = Date.now();
  let accepted = null;
  let attempt = 0;
  const maxAttempts = 20;
  while (attempt < maxAttempts && !accepted) {
    const rng = mulberry32(seedForLevel(i, attempt));
    const classSeq = buildClassSequence(objectCount, maxClassIdx, rng);
    const world = makeWorld();
    const objs = dropAndSettle(world, classSeq, rng);
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
    console.error(`Level ${i}: FAILED to find a verified-solvable layout in ${maxAttempts} attempts (objectCount=${objectCount}, maxClassIdx=${maxClassIdx}).`);
    process.exit(1);
  }
  console.log(`Level ${i}: OK (objects=${objectCount}, maxClassIdx=${maxClassIdx}, attempts=${attempt}, ${Date.now() - t0}ms)`);
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
