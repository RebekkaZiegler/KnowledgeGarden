'use strict';

/* ══════════════════════════════════════════════════════════
   WATER SORT — potion-sorting puzzle ("Tränke")

   Bottles hold up to WS_CAPACITY stacked units of colored liquid.
   Pour rules: A→B legal only if B has room AND (B empty OR B's top
   color == A's top color); a pour always moves the full contiguous
   top-color run from A, capped by B's remaining space. Win when every
   bottle is empty or full+monochrome.

   Levels are generated on demand from a level index via a seeded PRNG
   (never stored) — see wsGenerateLevel(). Only the shuffled play order,
   position in it, and the live in-progress bottle state are persisted,
   for resuming mid-level after a reload.
══════════════════════════════════════════════════════════ */

const WS_CAPACITY          = 4;
const WS_LEVEL_COUNT       = 80;
const WS_MAX_EXTRA_BOTTLES = 3;
const WS_COLORS = [
  "#e8735a", "#5aa8e8", "#6fd88a", "#e8d95a", "#b06fe8",
  "#e86fb0", "#5adfd0", "#e8a45a", "#8a9be0",
];

/* ── seeded PRNG (mulberry32) — deterministic per level index ── */
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function wsSeedForLevel(levelIndex) {
  return Math.imul(levelIndex + 1, 2654435761) >>> 0;
}

/* ── difficulty curve ── */
function wsLevelParams(levelIndex) {
  const table = [
    { max: 10, numColors: 4, numEmpty: 2, steps: [20, 25] },
    { max: 25, numColors: 5, numEmpty: 2, steps: [28, 34] },
    { max: 45, numColors: 6, numEmpty: 2, steps: [38, 46] },
    { max: 60, numColors: 7, numEmpty: 2, steps: [48, 56] },
    { max: 75, numColors: 8, numEmpty: 2, steps: [58, 68] },
    { max: 80, numColors: 9, numEmpty: 1, steps: [66, 76] },
  ];
  const tier = table.find(t => levelIndex < t.max) || table[table.length - 1];
  const rng = mulberry32(wsSeedForLevel(levelIndex) ^ 0x9e3779b9);
  const scrambleSteps = tier.steps[0] + Math.floor(rng() * (tier.steps[1] - tier.steps[0] + 1));
  return { numColors: tier.numColors, numEmpty: tier.numEmpty, scrambleSteps };
}

/* ── generation-only "soft pour": partial, unlike real gameplay pours,
   so colors actually interleave. Never fully drains a run that would
   expose a different color underneath, which keeps every scramble step
   reversible by a real (maximal) pour — guaranteeing solvability. ── */
function wsScrambleStep(bottles, capacity, rng) {
  for (let attempt = 0; attempt < 50; attempt++) {
    const from = Math.floor(rng() * bottles.length);
    const to   = Math.floor(rng() * bottles.length);
    if (from === to || !bottles[from].length) continue;
    const dst = bottles[to];
    if (dst.length >= capacity) continue;
    const topColor = bottles[from][bottles[from].length - 1];
    if (dst.length > 0 && dst[dst.length - 1] !== topColor) continue;

    let runLen = 1;
    while (runLen < bottles[from].length &&
           bottles[from][bottles[from].length - 1 - runLen] === topColor) runLen++;
    let maxTake = Math.min(runLen, capacity - dst.length);
    if (runLen < bottles[from].length && maxTake === runLen) maxTake--;
    if (maxTake < 1) continue;

    const take = 1 + Math.floor(rng() * maxTake);
    for (let i = 0; i < take; i++) dst.push(bottles[from].pop());
    return true;
  }
  return false;
}

function wsGenerateLevel(levelIndex) {
  const { numColors, numEmpty, scrambleSteps } = wsLevelParams(levelIndex);
  const rng = mulberry32(wsSeedForLevel(levelIndex));
  const bottles = [];
  for (let c = 0; c < numColors; c++) bottles.push(Array(WS_CAPACITY).fill(WS_COLORS[c]));
  for (let e = 0; e < numEmpty; e++) bottles.push([]);
  for (let i = 0; i < scrambleSteps; i++) wsScrambleStep(bottles, WS_CAPACITY, rng);
  return bottles;
}

/* ── core pour rules ── */
function wsTopRun(bottle) {
  if (!bottle.length) return { color: null, len: 0 };
  const color = bottle[bottle.length - 1];
  let len = 1;
  while (len < bottle.length && bottle[bottle.length - 1 - len] === color) len++;
  return { color, len };
}
function wsCanPour(bottles, from, to) {
  if (from === to) return false;
  const src = bottles[from], dst = bottles[to];
  if (!src || !dst || !src.length || dst.length >= WS_CAPACITY) return false;
  const top = src[src.length - 1];
  return dst.length === 0 || dst[dst.length - 1] === top;
}
function wsPour(bottles, from, to) {
  if (!wsCanPour(bottles, from, to)) return 0;
  const { color, len } = wsTopRun(bottles[from]);
  const amt = Math.min(len, WS_CAPACITY - bottles[to].length);
  for (let i = 0; i < amt; i++) bottles[to].push(bottles[from].pop());
  return amt;
}
function wsIsSolved(bottles) {
  return bottles.every(b => b.length === 0 || (b.length === WS_CAPACITY && b.every(c => c === b[0])));
}

/* ══════════════════════════════════════════════════════════
   GAME FLOW — reads/writes G.waterSort
══════════════════════════════════════════════════════════ */
function wsOnBottleTap(idx) {
  const ws = G.waterSort;
  if (ws.selectedBottle === null) {
    if (ws.bottles[idx] && ws.bottles[idx].length) { ws.selectedBottle = idx; wsRender(); }
    return;
  }
  if (ws.selectedBottle === idx) { ws.selectedBottle = null; wsRender(); return; }
  const amt = wsPour(ws.bottles, ws.selectedBottle, idx);
  ws.selectedBottle = null;
  if (amt > 0) {
    saveState(); // explicit — mid-level progress must survive a reload
    if (wsIsSolved(ws.bottles)) { wsOnLevelSolved(); return; }
  }
  wsRender();
}
window.wsOnBottleTap = wsOnBottleTap;

function wsOnLevelSolved() {
  G.stats.waterSortLevelsCompleted = (G.stats.waterSortLevelsCompleted || 0) + 1;
  checkTrophies();
  showToast("🧪 Level gelöst!");
  saveState();
  wsRender();
  setTimeout(wsAdvanceToNextLevel, 900);
}

function wsAdvanceToNextLevel() {
  const ws = G.waterSort;
  ws.playOrderPos++;
  if (ws.playOrderPos >= ws.playOrder.length) {
    const prevLast = ws.playOrder[ws.playOrder.length - 1];
    const order = shuffleArray([...Array(WS_LEVEL_COUNT).keys()]);
    if (order[0] === prevLast) [order[0], order[1]] = [order[1], order[0]];
    ws.playOrder = order;
    ws.playOrderPos = 0;
  }
  wsStartLevel(ws.playOrder[ws.playOrderPos]);
}

function wsStartLevel(levelIndex) {
  const ws = G.waterSort;
  ws.currentLevelIndex = levelIndex;
  ws.bottles = wsGenerateLevel(levelIndex);
  ws.extraBottlesUsed = 0;
  ws.selectedBottle = null;
  saveState();
  wsRender();
}

function wsRestartLevel() {
  const ws = G.waterSort;
  if (ws.currentLevelIndex == null) return;
  wsStartLevel(ws.currentLevelIndex);
  showToast("🔄 Level neu gestartet.");
}
window.wsRestartLevel = wsRestartLevel;

function wsEnsureQueueAndLevel() {
  const ws = G.waterSort;
  if (!ws.playOrder.length) {
    ws.playOrder = shuffleArray([...Array(WS_LEVEL_COUNT).keys()]);
    ws.playOrderPos = 0;
  }
  if (ws.currentLevelIndex == null || !ws.bottles.length) {
    wsStartLevel(ws.playOrder[ws.playOrderPos]);
  } else {
    wsRender();
  }
}
window.wsEnsureQueueAndLevel = wsEnsureQueueAndLevel;

function wsBuyExtraBottle() {
  const ws = G.waterSort;
  if (ws.extraBottlesUsed >= WS_MAX_EXTRA_BOTTLES) {
    showToast(`Maximal ${WS_MAX_EXTRA_BOTTLES} Extra-Fläschchen pro Level!`);
    return;
  }
  if (!hasActiveQuestions()) {
    showToast("Keine aktiven Fragen! Aktiviere Kapitel unter 📚.");
    return;
  }
  askQuestions("🧪 Extra-Fläschchen", 1, () => {
    ws.bottles.push([]);
    ws.extraBottlesUsed++;
    G.stats.waterSortExtraBottlesBought = (G.stats.waterSortExtraBottlesBought || 0) + 1;
    checkTrophies();
    saveState();
    wsRender();
    showToast("🧪 Neues Fläschchen erhalten!");
  }, null);
}
window.wsBuyExtraBottle = wsBuyExtraBottle;

/* ══════════════════════════════════════════════════════════
   RENDERING
══════════════════════════════════════════════════════════ */
function wsRender() {
  const ws = G.waterSort;
  const infoEl = document.getElementById("ws-level-info");
  const gridEl = document.getElementById("ws-bottle-grid");
  const buyBtn = document.getElementById("ws-buy-bottle-btn");
  if (!gridEl) return;

  if (infoEl) {
    infoEl.textContent = ws.currentLevelIndex == null
      ? ""
      : `Level ${ws.currentLevelIndex + 1} / ${WS_LEVEL_COUNT}`;
  }

  gridEl.innerHTML = (ws.bottles || []).map((bottle, idx) => {
    const slots = [];
    for (let i = 0; i < WS_CAPACITY; i++) {
      const color = bottle[i];
      slots.push(color
        ? `<div class="ws-segment" style="background:${color}"></div>`
        : `<div class="ws-segment ws-segment--empty"></div>`);
    }
    const selected = ws.selectedBottle === idx ? " ws-bottle--selected" : "";
    return `<div class="ws-bottle${selected}" data-idx="${idx}">
      <div class="ws-bottle-stack">${slots.join("")}</div>
    </div>`;
  }).join("");

  gridEl.querySelectorAll(".ws-bottle").forEach(el => {
    el.onclick = () => wsOnBottleTap(parseInt(el.dataset.idx, 10));
  });

  if (buyBtn) {
    const atCap = (ws.extraBottlesUsed || 0) >= WS_MAX_EXTRA_BOTTLES;
    buyBtn.disabled = atCap;
    buyBtn.classList.toggle("ws-buy-bottle-btn--off", atCap);
    buyBtn.textContent = atCap
      ? "➕ Maximal erreicht"
      : `➕ Extra-Fläschchen (1 Frage) · ${ws.extraBottlesUsed || 0}/${WS_MAX_EXTRA_BOTTLES}`;
  }
}
window.wsRender = wsRender;
