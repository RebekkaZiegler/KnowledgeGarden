#!/usr/bin/env node
// Generates the SVG art for the 3 new Alräunchen starter species (Flämmchen,
// Well-Tröpfchen, Kiesel) — 20 stages each (5 shared baby stages + 3 mood
// paths × 5 branch stages), mirroring the existing hand-drawn "root" species'
// stage/path structure. Uses shared shape-builder helpers so all stages of a
// species read as one consistent creature while still being clearly distinct
// from the other species and from root.
// Run: node scripts/generate-tama-species.js

const fs   = require('fs');
const path = require('path');

const OUT_ROOT = path.join(__dirname, '..', 'assets', 'images', 'tamagotchi');

// ── small SVG helpers ────────────────────────────────────────────────────
function svg(defs, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 160">\n` +
    (defs ? `  <defs>\n${defs}\n  </defs>\n` : '') +
    body + `\n</svg>\n`;
}
function radial(id, cx, cy, r, stops) {
  const s = stops.map(([off, color, op]) =>
    `      <stop offset="${off}" stop-color="${color}"${op !== undefined ? ` stop-opacity="${op}"` : ''}/>`).join('\n');
  return `    <radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">\n${s}\n    </radialGradient>`;
}
function n2(x) { return Math.round(x * 100) / 100; }

// Two eyes mirrored around x=60. `style`: 'cute' (huge, round, early stages),
// 'bright' (sparkly, path a), 'wise' (steady + brow, path b), 'droop' (sad
// half-lidded, path c).
function eyes(cy, spread, rOuter, rPupil, scleraColor, pupilColor, strokeColor, style, ryMult) {
  if (ryMult === undefined) ryMult = 1.08;
  const cx1 = n2(60 - spread), cx2 = n2(60 + spread);
  const one = (cx) => {
    let g = `  <ellipse cx="${cx}" cy="${cy}" rx="${rOuter}" ry="${n2(rOuter * ryMult)}" fill="${scleraColor}" stroke="${strokeColor}" stroke-width="1.2"/>\n`;
    g += `  <circle cx="${cx}" cy="${n2(cy + 1)}" r="${rPupil}" fill="${pupilColor}"/>\n`;
    if (style === 'bright') {
      g += `  <circle cx="${n2(cx + rPupil * 0.4)}" cy="${n2(cy - rPupil * 0.5)}" r="${n2(rPupil * 0.4)}" fill="white"/>\n`;
      g += `  <circle cx="${n2(cx - rPupil * 0.3)}" cy="${n2(cy + rPupil * 0.5)}" r="${n2(rPupil * 0.16)}" fill="white" fill-opacity="0.8"/>\n`;
    } else if (style === 'droop') {
      const side = cx < 60 ? -1 : 1;
      g += `  <path d="M${n2(cx - rOuter)},${n2(cy - rOuter * 0.5)} Q${cx},${n2(cy - rOuter * 1.3)} ${n2(cx + rOuter)},${n2(cy - rOuter * 0.5)}" fill="${strokeColor}" fill-opacity="0.55"/>\n`;
      g += `  <circle cx="${n2(cx + side * rPupil * 0.3)}" cy="${n2(cy - rPupil * 0.3)}" r="${n2(rPupil * 0.22)}" fill="white" fill-opacity="0.7"/>\n`;
    } else if (style === 'wise') {
      g += `  <path d="M${n2(cx - rOuter * 0.9)},${n2(cy - rOuter * 1.15)} Q${cx},${n2(cy - rOuter * 1.5)} ${n2(cx + rOuter * 0.9)},${n2(cy - rOuter * 1.15)}" stroke="${strokeColor}" stroke-width="1.1" fill="none" stroke-linecap="round"/>\n`;
      g += `  <circle cx="${n2(cx + rPupil * 0.35)}" cy="${n2(cy - rPupil * 0.4)}" r="${n2(rPupil * 0.3)}" fill="white" fill-opacity="0.85"/>\n`;
    } else { // cute
      g += `  <circle cx="${n2(cx + rPupil * 0.35)}" cy="${n2(cy - rPupil * 0.4)}" r="${n2(rPupil * 0.45)}" fill="white"/>\n`;
    }
    return g;
  };
  return one(cx1) + one(cx2);
}
function mouth(cy, width, style, strokeColor) {
  const x1 = n2(60 - width), x2 = n2(60 + width);
  if (style === 'smile')  return `  <path d="M${x1},${cy} Q60,${n2(cy + width * 0.9)} ${x2},${cy}" stroke="${strokeColor}" stroke-width="2.4" fill="none" stroke-linecap="round"/>\n`;
  if (style === 'gentle') return `  <path d="M${x1},${cy} Q60,${n2(cy + width * 0.4)} ${x2},${cy}" stroke="${strokeColor}" stroke-width="2" fill="none" stroke-linecap="round"/>\n`;
  if (style === 'frown')  return `  <path d="M${x1},${n2(cy + width * 0.5)} Q60,${n2(cy - width * 0.3)} ${x2},${n2(cy + width * 0.5)}" stroke="${strokeColor}" stroke-width="2" fill="none" stroke-linecap="round"/>\n`;
  return `  <ellipse cx="60" cy="${cy}" rx="${n2(width * 0.4)}" ry="${n2(width * 0.3)}" fill="${strokeColor}"/>\n`; // 'o' — pre-face stage
}
function cheeks(cy, color, opacity) {
  if (opacity <= 0) return '';
  return `  <ellipse cx="30" cy="${cy}" rx="7" ry="4.5" fill="${color}" fill-opacity="${opacity}"/>\n` +
         `  <ellipse cx="90" cy="${cy}" rx="7" ry="4.5" fill="${color}" fill-opacity="${opacity}"/>\n`;
}

// Radiating rays + floating particles for a thriving (path a) creature at
// higher stages — the "cool/impressive final form" signal.
function radiantFlourish(cx, cy, n, color) {
  if (n < 2) return '';
  let out = '';
  const rayLen = 8 + n * 3;
  const angles = [-70, -35, 0, 35, 70];
  for (const a of angles) {
    const rad = a * Math.PI / 180;
    const x1 = n2(cx + Math.sin(rad) * (34 + n * 2));
    const y1 = n2(cy - Math.cos(rad) * (34 + n * 2));
    const x2 = n2(cx + Math.sin(rad) * (34 + n * 2 + rayLen));
    const y2 = n2(cy - Math.cos(rad) * (34 + n * 2 + rayLen));
    out += `  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1.4" stroke-opacity="0.55"/>\n`;
  }
  const particles = [[-46, -20], [46, -20], [-52, 10], [52, 10], [-30, -42], [30, -42]].slice(0, Math.min(6, n * 2));
  for (const [dx, dy] of particles) {
    out += `  <circle cx="${n2(cx + dx)}" cy="${n2(cy + dy)}" r="${n2(1.6 + n * 0.3)}" fill="${color}" fill-opacity="0.75"/>\n`;
  }
  return out;
}

// Damage/decline marks for a struggling (path c) creature at higher stages —
// cracks, drooping wisps, falling debris, scaled by n.
function declineFlourish(cx, cy, n, color) {
  if (n < 2) return '';
  let out = '';
  const marks = Math.min(4, n);
  for (let i = 0; i < marks; i++) {
    const dx = -18 + i * 12;
    const dy = 14 + (i % 2) * 10;
    out += `  <path d="M${n2(cx + dx)},${n2(cy + dy)} l3,5 l-2,3 l3,4" stroke="${color}" stroke-width="1" fill="none" stroke-opacity="0.5" stroke-linecap="round"/>\n`;
  }
  return out;
}

// ── species definitions ──────────────────────────────────────────────────
// Each species: baseColor (young/shared palette) + 3 path palettes, plus
// species-specific ground/motif/limb renderers so the silhouette reads as a
// clearly different creature (organic flame vs. droplet vs. angular stone).
const SPECIES = {

  flamm: {
    young: { headTop: '#ffe8a0', headBot: '#ff9a30', bodyTop: '#ffcf70', bodyBot: '#f97a20', stroke: '#b03a10', accent: '#fff0b0' },
    paths: {
      a: { headTop: '#fff6c0', headBot: '#ff8010', bodyTop: '#ffde80', bodyBot: '#ff6a10', stroke: '#a02c08', accent: '#fff2a0', aura: '#ffdd40', eye: 'bright', mouthStyle: 'smile',  cheekOp: n => 0.35 + n * 0.05 },
      b: { headTop: '#ffb060', headBot: '#c04010', bodyTop: '#e08030', bodyBot: '#903010', stroke: '#5c1e08', accent: '#ffcf80', aura: null,      eye: 'wise',   mouthStyle: 'gentle', cheekOp: () => 0.2 },
      c: { headTop: '#9a9488', headBot: '#4a4038', bodyTop: '#807868', bodyBot: '#383028', stroke: '#201a14', accent: '#c0b8a8', aura: null,      eye: 'droop',  mouthStyle: 'frown',  cheekOp: () => 0 },
    },
    ground(n) {
      const r = n2(20 + n * 3);
      return `  <ellipse cx="60" cy="153" rx="${r}" ry="9" fill="#241a14"/>\n` +
             `  <ellipse cx="60" cy="149" rx="${n2(r * 0.7)}" ry="6" fill="#3a2418"/>\n` +
             `  <circle cx="60" cy="146" r="${n2(6 + n)}" fill="#ff9020" fill-opacity="0.35"/>\n`;
    },
    // Flame-tuft crown on the head; count/size grows sharply with n (1..6),
    // each tuft with an inner glow layer so it reads clearly at any size.
    crown(cx, cy, n, color, accent) {
      let out = '';
      const tufts = Math.min(7, n + 2);
      for (let i = 0; i < tufts; i++) {
        const t = tufts === 1 ? 0.5 : i / (tufts - 1);
        const ang = -75 + t * 150;
        const rad = ang * Math.PI / 180;
        const distFromCenter = Math.abs(i - (tufts - 1) / 2);
        const dist = 14 + distFromCenter * 2.5;
        const tx = n2(cx + Math.sin(rad) * dist);
        const ty = n2(cy - Math.cos(rad) * dist - 4);
        const h = n2(9 + n * 5 - distFromCenter * 3.5);
        const w = n2(3.5 + n * 0.5);
        out += `  <path d="M${n2(tx - w)},${ty + h} Q${tx},${n2(ty - h)} ${n2(tx + w)},${ty + h} Q${tx},${n2(ty + h * 0.5)} ${n2(tx - w)},${ty + h}Z" fill="${color}" stroke="${accent}" stroke-width="0.6"/>\n`;
        out += `  <path d="M${n2(tx - w * 0.4)},${n2(ty + h * 0.65)} Q${tx},${n2(ty - h * 0.55)} ${n2(tx + w * 0.4)},${n2(ty + h * 0.65)}Z" fill="${accent}" fill-opacity="0.85"/>\n`;
      }
      return out;
    },
    // Small flame-wisp arms; length grows with n.
    limbs(cy, n, color) {
      if (n < 2) return '';
      const len = 6 + n * 2.5;
      return `  <path d="M40,${cy} Q${n2(40 - len)},${n2(cy - 4)} ${n2(38 - len)},${n2(cy - len)}" stroke="${color}" stroke-width="5" fill="none" stroke-linecap="round"/>\n` +
             `  <path d="M80,${cy} Q${n2(80 + len)},${n2(cy - 4)} ${n2(82 + len)},${n2(cy - len)}" stroke="${color}" stroke-width="5" fill="none" stroke-linecap="round"/>\n`;
    },
  },

  well: {
    young: { headTop: '#dff6ff', headBot: '#4098c0', bodyTop: '#b8ecff', bodyBot: '#2878a8', stroke: '#144860', accent: '#eafcff' },
    paths: {
      a: { headTop: '#f0ffff', headBot: '#20a0d8', bodyTop: '#c8f8ff', bodyBot: '#1888c0', stroke: '#0c3850', accent: '#e0fbff', aura: '#60d0f0', eye: 'bright', mouthStyle: 'smile',  cheekOp: n => 0.3 + n * 0.05 },
      b: { headTop: '#a8d8e8', headBot: '#1c5878', bodyTop: '#8ac0d8', bodyBot: '#123c54', stroke: '#0a2c3c', accent: '#c8e8f0', aura: null,      eye: 'wise',   mouthStyle: 'gentle', cheekOp: () => 0.18 },
      c: { headTop: '#8a9a80', headBot: '#3c4a34', bodyTop: '#6c8060', bodyBot: '#2a3624', stroke: '#161e12', accent: '#a0ac90', aura: null,      eye: 'droop',  mouthStyle: 'frown',  cheekOp: () => 0 },
    },
    ground(n) {
      const r = n2(22 + n * 3);
      return `  <ellipse cx="60" cy="154" rx="${r}" ry="8" fill="#123648" fill-opacity="0.6"/>\n` +
             `  <ellipse cx="60" cy="150" rx="${n2(r * 0.75)}" ry="5.5" fill="#1c5878" fill-opacity="0.5"/>\n` +
             `  <ellipse cx="60" cy="147" rx="${n2(r * 0.45)}" ry="3.5" fill="#60c8e8" fill-opacity="0.4"/>\n`;
    },
    // Rising ripple-ring crown, arcs stack taller and wider with n, capped
    // by a bright droplet crest.
    crown(cx, cy, n, color, accent) {
      let out = '';
      const rings = Math.min(6, n + 1);
      const topY = n2(cy - 20 - n * 4);
      for (let i = 0; i < rings; i++) {
        const r = 9 + i * (4 + n * 0.6);
        const y = n2(cy - 20 - i * (3 + n * 0.8));
        out += `  <path d="M${n2(cx - r)},${y} Q${cx},${n2(y - r * 0.55)} ${n2(cx + r)},${y}" stroke="${color}" stroke-width="${n2(2 + n * 0.3)}" fill="none" stroke-opacity="${n2(0.95 - i * 0.13)}" stroke-linecap="round"/>\n`;
      }
      out += `  <path d="M${cx},${n2(topY - 10)} Q${n2(cx - 5)},${n2(topY - 2)} ${cx},${n2(topY + 4)} Q${n2(cx + 5)},${n2(topY - 2)} ${cx},${n2(topY - 10)}Z" fill="${accent}" stroke="${color}" stroke-width="0.6"/>\n`;
      return out;
    },
    // Fin-like wave arms.
    limbs(cy, n, color) {
      if (n < 2) return '';
      const len = 6 + n * 2.2;
      return `  <path d="M40,${cy} Q${n2(28 - len * 0.3)},${n2(cy + 2)} ${n2(24 - len * 0.3)},${n2(cy + len)}" fill="${color}" fill-opacity="0.85"/>\n` +
             `  <path d="M80,${cy} Q${n2(92 + len * 0.3)},${n2(cy + 2)} ${n2(96 + len * 0.3)},${n2(cy + len)}" fill="${color}" fill-opacity="0.85"/>\n`;
    },
  },

  kiesel: {
    young: { headTop: '#d8d0c0', headBot: '#8a8070', bodyTop: '#c0b8a8', bodyBot: '#706858', stroke: '#3c362c', accent: '#e8e0d0' },
    paths: {
      a: { headTop: '#e8d8ff', headBot: '#8858c0', bodyTop: '#d0c0f8', bodyBot: '#7040a8', stroke: '#3c2058', accent: '#f0e0ff', aura: '#c080f0', eye: 'bright', mouthStyle: 'smile',  cheekOp: n => 0.28 + n * 0.05 },
      b: { headTop: '#a8b8a0', headBot: '#586858', bodyTop: '#909c88', bodyBot: '#404c40', stroke: '#242c22', accent: '#c8d4b8', aura: null,      eye: 'wise',   mouthStyle: 'gentle', cheekOp: () => 0.15 },
      c: { headTop: '#a09888', headBot: '#5c5448', bodyTop: '#8a8070', bodyBot: '#443c30', stroke: '#241f18', accent: '#b8ac98', aura: null,      eye: 'droop',  mouthStyle: 'frown',  cheekOp: () => 0 },
    },
    ground(n) {
      const r = n2(22 + n * 3);
      return `  <ellipse cx="60" cy="154" rx="${r}" ry="9" fill="#221e18"/>\n` +
             `  <ellipse cx="60" cy="150" rx="${n2(r * 0.65)}" ry="5" fill="#38322a"/>\n` +
             `  <path d="M${n2(60 - r * 0.4)},152 L60,146 L${n2(60 + r * 0.4)},152" stroke="#4a4238" stroke-width="1.2" fill="none"/>\n`;
    },
    // Angular crystal-shard crown; facet count and height grow sharply with
    // n, with a bright inner facet on each shard for a faceted-gem look.
    crown(cx, cy, n, color, accent) {
      let out = '';
      const shards = Math.min(7, n + 2);
      for (let i = 0; i < shards; i++) {
        const t = shards === 1 ? 0.5 : i / (shards - 1);
        const sx = n2(cx - 22 + t * 44);
        const distFromCenter = Math.abs(i - (shards - 1) / 2);
        const h = n2(9 + n * 4.5 - distFromCenter * 3);
        const w = n2(3 + n * 0.4);
        const base = n2(cy - 18);
        const top = n2(base - h);
        out += `  <polygon points="${n2(sx - w)},${base} ${sx},${top} ${n2(sx + w)},${base}" fill="${color}" stroke="${accent}" stroke-width="0.6"/>\n`;
        out += `  <polygon points="${n2(sx - w * 0.35)},${n2(base - h * 0.15)} ${sx},${n2(top + h * 0.15)} ${n2(sx + w * 0.35)},${n2(base - h * 0.15)}" fill="${accent}" fill-opacity="0.8"/>\n`;
      }
      return out;
    },
    // Stubby angular rock arms.
    limbs(cy, n, color) {
      if (n < 2) return '';
      const len = 5 + n * 2;
      return `  <polygon points="42,${cy} ${n2(30 - len)},${n2(cy - 2)} ${n2(32 - len)},${n2(cy + len * 0.6)}" fill="${color}"/>\n` +
             `  <polygon points="78,${cy} ${n2(90 + len)},${n2(cy - 2)} ${n2(88 + len)},${n2(cy + len * 0.6)}" fill="${color}"/>\n`;
    },
  },
};

// ── stage renderers ──────────────────────────────────────────────────────
// Shared baby stages 1-5 (before the mood path is decided).
function renderShared(spKey, n) {
  const sp = SPECIES[spKey];
  const c = sp.young;
  const gid = `young_${spKey}_${n}`;
  const defs = radial(gid, '40%', '30%', '65%', [[ '0%', c.headTop ], [ '100%', c.headBot ]]) + '\n' +
               radial(gid + '_b', '38%', '26%', '68%', [[ '0%', c.bodyTop ], [ '100%', c.bodyBot ]]);
  let body = sp.ground(n);

  if (n === 1) {
    // Dormant seed/core — no face yet, just a glowing shape + rune crack.
    body += `  <ellipse cx="60" cy="132" rx="13" ry="16" fill="url(#${gid}_b)" stroke="${c.stroke}" stroke-width="1.4"/>\n`;
    body += `  <path d="M56,120 L60,115 L64,120 L62,124 L64,119" stroke="${c.accent}" stroke-width="1.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>\n`;
    body += `  <circle cx="60" cy="118" r="3" fill="${c.accent}" fill-opacity="0.6"/>\n`;
    return svg(defs, body);
  }

  const bodyRy = 22 + n * 2, bodyCy = 128 - n * 2;
  const headR  = 20 + n * 2.2, headCy = 90 - n * 3;
  body += `  <ellipse cx="60" cy="${bodyCy}" rx="${16 + n}" ry="${bodyRy}" fill="url(#${gid}_b)" stroke="${c.stroke}" stroke-width="1.5"/>\n`;
  body += sp.limbs(n2(bodyCy - bodyRy * 0.3), n, c.bodyBot);
  body += `  <ellipse cx="60" cy="${headCy}" rx="${headR}" ry="${n2(headR * 0.95)}" fill="url(#${gid})" stroke="${c.stroke}" stroke-width="1.5"/>\n`;
  if (n >= 4) body += sp.crown(60, headCy, n - 3, c.accent, c.headTop);

  if (n === 2) {
    // Crack widening, faint eye-dots forming.
    body += `  <circle cx="52" cy="${headCy}" r="2" fill="${c.stroke}" fill-opacity="0.5"/>\n`;
    body += `  <circle cx="68" cy="${headCy}" r="2" fill="${c.stroke}" fill-opacity="0.5"/>\n`;
    body += mouth(headCy + 8, 4, 'o', c.stroke);
  } else {
    // Big cute eyes from stage 3 onward.
    const spread = 10 + Math.min(n, 4) * 0.4;
    const rOuter = 9 + Math.min(n, 4) * 0.5;
    body += eyes(headCy, spread, rOuter, n2(rOuter * 0.62), 'white', c.stroke, c.stroke, 'cute');
    body += mouth(n2(headCy + headR * 0.55), 5, 'gentle', c.stroke);
    body += cheeks(n2(headCy + headR * 0.35), c.accent, 0.3);
  }
  return svg(defs, body);
}

// Branch stages 6-10 (n = 1..5 within the path).
function renderBranch(spKey, pathKey, n) {
  const sp = SPECIES[spKey];
  const p  = sp.paths[pathKey];
  const gid = `br_${spKey}_${pathKey}${n}`;
  let defs = radial(gid, '40%', '30%', '65%', [[ '0%', p.headTop ], [ '100%', p.headBot ]]) + '\n' +
             radial(gid + '_b', '38%', '26%', '68%', [[ '0%', p.bodyTop ], [ '100%', p.bodyBot ]]);
  if (p.aura) {
    defs += '\n' + radial(gid + '_aura', '50%', '45%', '55%', [[ '0%', p.aura, n2(0.15 + n * 0.05) ], [ '100%', p.aura, 0 ]]);
  }

  let body = sp.ground(n);
  if (p.aura) body += `  <ellipse cx="60" cy="70" rx="${60 + n * 4}" ry="${78 + n * 4}" fill="url(#${gid}_aura)"/>\n`;

  const bodyRy = 30 + n * 2.8, bodyCy = 110 - n * 1.8;
  const headR  = 27 + n * 2.2, headCy = n2(62 - n * 2);
  body += `  <ellipse cx="60" cy="${bodyCy}" rx="${20 + n * 1.3}" ry="${bodyRy}" fill="url(#${gid}_b)" stroke="${p.stroke}" stroke-width="1.8"/>\n`;
  body += sp.limbs(n2(bodyCy - bodyRy * 0.35), 2 + n, p.bodyBot);
  if (pathKey === 'a') body += radiantFlourish(60, headCy, n, p.accent);
  body += `  <ellipse cx="60" cy="${headCy}" rx="${headR}" ry="${n2(headR * 0.94)}" fill="url(#${gid})" stroke="${p.stroke}" stroke-width="1.8"/>\n`;
  body += sp.crown(60, headCy, n, p.accent, p.headTop);
  if (pathKey === 'c') body += declineFlourish(60, n2(bodyCy - bodyRy * 0.15), n, p.stroke);

  // Eyes shrink and sharpen toward the "cool" final forms on the thriving/
  // content paths; the struggling path stays round but droopy and sad.
  const spread  = pathKey === 'c' ? n2(12 - n * 0.3) : n2(12 - n * 0.9);
  const rOuter  = pathKey === 'c' ? n2(9 - n * 0.4)   : n2(10 - n * 1.0);
  const ryMult  = pathKey === 'c' ? 1.1 : Math.max(0.55, n2(1.08 - n * 0.09));
  body += eyes(headCy, spread, rOuter, n2(rOuter * 0.6), pathKey === 'c' ? '#d8d8c8' : 'white', p.stroke, p.stroke, p.eye, ryMult);
  body += mouth(n2(headCy + headR * 0.55), 6, p.mouthStyle, p.stroke);
  body += cheeks(n2(headCy + headR * 0.35), p.accent, p.cheekOp(n));

  return svg(defs, body);
}

// ── write files ───────────────────────────────────────────────────────────
// Names mirror TAMA_SPECIES_DATA in js/game.js — kept in sync manually since
// this script has no dependency on the app bundle.
const STAGE_NAMES = {
  flamm: {
    shared: ['Der Funke','Erstes Glühen','Das Flämmchen','Die Feuerseele','Der Lohgeist'],
    a: ['Helle Flamme','Der Flammentänzer','Die Feuerkrone','Der Phönixgeist','Strahlender Phönix'],
    b: ['Das Herdlicht','Der Kaminwächter','Die Glutseele','Die Uralte Kohle','Der Herdälteste'],
    c: ['Der Erlöschende','Der Rauchige','Der Aschgraue','Der Rauchwandler','Der Aschendorn'],
  },
  well: {
    shared: ['Der Tropfen','Erstes Kräuseln','Das Tröpfchen','Das Wellenkind','Der Strömungsgeist'],
    a: ['Erste Welle','Der Wellentänzer','Die Silberkrone','Der Wogengeist','Strahlender Wellenweise'],
    b: ['Der Teichwächter','Der Tiefe','Der Quellhüter','Der Uralte Strom','Der Quellwächter'],
    c: ['Der Trübe','Der Stille Sumpf','Der Algige','Der Schlammwandler','Der Moordorn'],
  },
  kiesel: {
    shared: ['Der Kiesel','Erster Riss','Das Steinchen','Das Felsenkind','Der Gesteinsgeist'],
    a: ['Erster Glanz','Der Kristalltänzer','Die Prismakrone','Der Funkelgeist','Strahlender Kristalltitan'],
    b: ['Der Moosstein','Der Wächterfels','Der Standhafte','Der Uralte Fels','Der Bergwächter'],
    c: ['Der Rissige','Der Bröckelnde','Der Geröllige','Der Schuttwandler','Der Trümmerdorn'],
  },
};

function previewHtml(spKey) {
  const names = STAGE_NAMES[spKey];
  const row = (title, files, labels) => `<h2>${title}</h2>\n<div class="row">\n` +
    files.map((f, i) => `  <div class="stage"><img src="${f}"><span>${labels[i]}</span></div>`).join('\n') +
    `\n</div>\n`;
  return `<!DOCTYPE html>\n<html>\n<head><meta charset="utf-8"><style>\n` +
    `body { background:#141a17; color:#ccc; font-family:sans-serif; padding:1rem; }\n` +
    `h2 { color:#a0c060; margin:1.5rem 0 0.5rem; }\n.row { display:flex; gap:0.5rem; flex-wrap:wrap; }\n.stage { text-align:center; }\n` +
    `.stage img { width:80px; height:106px; background:#1e2820; border-radius:8px; border:1px solid #334; display:block; }\n` +
    `.stage span { font-size:0.65rem; color:#888; display:block; margin-top:3px; }\n</style></head>\n<body>\n` +
    row('Shared stages (1–5)', [1,2,3,4,5].map(n => `tama_${n}.svg`), names.shared) +
    row('Path A (a1–a5)', [1,2,3,4,5].map(n => `tama_a${n}.svg`), names.a) +
    row('Path B (b1–b5)', [1,2,3,4,5].map(n => `tama_b${n}.svg`), names.b) +
    row('Path C (c1–c5)', [1,2,3,4,5].map(n => `tama_c${n}.svg`), names.c) +
    `</body>\n</html>\n`;
}

for (const spKey of Object.keys(SPECIES)) {
  const dir = path.join(OUT_ROOT, spKey);
  fs.mkdirSync(dir, { recursive: true });

  for (let n = 1; n <= 5; n++) {
    fs.writeFileSync(path.join(dir, `tama_${n}.svg`), renderShared(spKey, n));
  }
  for (const pathKey of ['a', 'b', 'c']) {
    for (let n = 1; n <= 5; n++) {
      fs.writeFileSync(path.join(dir, `tama_${pathKey}${n}.svg`), renderBranch(spKey, pathKey, n));
    }
  }
  fs.writeFileSync(path.join(dir, 'preview.html'), previewHtml(spKey));
  console.log(`✓ ${spKey}: 20 SVGs + preview.html written to ${dir}`);
}
