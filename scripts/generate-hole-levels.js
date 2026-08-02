// Regenerates the HL_LEVELS data baked into js/hole.js. Run this if you ever
// want to change level count or the object-count/tier-spread difficulty
// ramp, or just reroll the level pool. Paste the printed
// `const HL_LEVELS = [...]` line over the existing one in js/hole.js.
//
// Method: objects are generated in "eating order" — each new object's tier
// is drawn from [1, min(simSize, maxTierForLevel)], where simSize starts at
// 1 and ratchets up to max(simSize, tier+1) after each draw. That makes
// every level solvable *by construction* (there's always at least one
// eatable object at every step of a smallest-first playthrough), so unlike
// Water Sort's shuffle-and-reject approach, no retry loop is needed — but
// solvability is still independently re-verified below via a real greedy
// simulation before a level is accepted, as a safety net against a bug in
// the construction logic. Positions are placed after tiers are chosen, via
// rejection sampling in normalized [0,1] board space so objects don't
// overlap (radius scales with tier). This only needs to run once, offline,
// when authoring levels — not at runtime in the browser.

const HL_TIER_COUNT = 14; // must match HL_TIERS.length in js/hole.js

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
function randInt(rng, min, max) { // inclusive both ends
  return min + Math.floor(rng() * (max - min + 1));
}

// Difficulty ramp: object count grows from 4 to 13 across the pool; the
// tier cap grows step-wise so early levels only ever see the first few
// (small) tiers, and the full tier range only opens up near the end.
function levelParams(levelIndex, levelCount) {
  const t = levelIndex / Math.max(1, levelCount - 1); // 0..1
  const objectCount = Math.round(4 + t * (13 - 4));
  const maxTierForLevel = Math.min(HL_TIER_COUNT, 3 + Math.floor(levelIndex / 5));
  return { objectCount, maxTierForLevel };
}

function generateTiers(objectCount, maxTierForLevel, rng) {
  let simSize = 1;
  const tiers = [];
  for (let k = 0; k < objectCount; k++) {
    const cap = Math.min(simSize, maxTierForLevel);
    const tier = randInt(rng, 1, cap);
    tiers.push(tier);
    simSize = Math.max(simSize, tier + 1);
  }
  return tiers;
}

// Real greedy-eat verification, independent of the construction logic
// above: at each step, any not-yet-eaten object with tier <= size may be
// eaten (order among eligible objects doesn't matter — eating never makes
// a previously-ineligible object *harder* to reach). Confirms every object
// is eventually eaten.
function verifySolvable(tiers) {
  const remaining = tiers.slice();
  let size = 1;
  let progressed = true;
  while (remaining.length && progressed) {
    progressed = false;
    for (let i = remaining.length - 1; i >= 0; i--) {
      if (remaining[i] <= size) {
        size = Math.max(size, remaining[i] + 1);
        remaining.splice(i, 1);
        progressed = true;
      }
    }
  }
  return remaining.length === 0;
}

// Radius (in normalized 0..1 board units) an object of this tier visually
// occupies — used only to keep placements from overlapping.
function tierRadius(tier) {
  return 0.05 + tier * 0.011;
}

function placeObjects(tiers, rng) {
  const placed = [];
  for (const tier of tiers) {
    const r = tierRadius(tier);
    let x, y, ok, attempts = 0;
    do {
      x = r + rng() * (1 - 2 * r);
      y = r + rng() * (1 - 2 * r);
      ok = true;
      for (const p of placed) {
        const dx = x - p.x, dy = y - p.y;
        const minDist = r + tierRadius(p.tier) + 0.02;
        if (dx * dx + dy * dy < minDist * minDist) { ok = false; break; }
      }
      attempts++;
    } while (!ok && attempts < 300);
    placed.push({ tier, x, y }); // last attempt's position is used even if still slightly overlapping — extremely rare at these object counts/radii
  }
  return placed;
}

const HL_LEVEL_COUNT = 60;
const levels = [];

for (let i = 0; i < HL_LEVEL_COUNT; i++) {
  const { objectCount, maxTierForLevel } = levelParams(i, HL_LEVEL_COUNT);
  const rng = mulberry32(seedForLevel(i, 0));
  const tiers = generateTiers(objectCount, maxTierForLevel, rng);

  if (!verifySolvable(tiers)) {
    console.error(`Level ${i}: FAILED verification (tiers=${JSON.stringify(tiers)}) — construction logic bug, aborting.`);
    process.exit(1);
  }

  const placeRng = mulberry32(seedForLevel(i, 1));
  const objects = placeObjects(tiers, placeRng);

  console.log(`Level ${i}: OK (objects=${objectCount}, maxTier=${maxTierForLevel})`);
  levels.push({
    s: 1,
    o: objects.map(p => [p.tier, Math.round(p.x * 1000), Math.round(p.y * 1000)]),
  });
}

console.log('\n--- paste this over the HL_LEVELS line in js/hole.js ---\n');
console.log('const HL_LEVELS = ' + JSON.stringify(levels) + ';');
