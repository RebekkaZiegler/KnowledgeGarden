'use strict';

/* ══════════════════════════════════════════════════════════
   CONSTANTS & CONFIG
══════════════════════════════════════════════════════════ */
const APP_VERSION    = "2.0.0";
const SAVE_KEY       = "kg_v2";
const SAVE_VERSION   = 1;
const EXAM_DEADLINE  = new Date("2026-12-01").getTime();
const DAILY_GOAL     = 3;

const GARDEN_BEDS          = 5;
const GARDEN_SLOTS_PER_BED = 6;
const PLANT_GROW_DAYS      = 3;
const RAVEN_DELIVER_DAYS   = 1;

// Food crops grown in the garden — each harvest yields CROP_YIELD units
const CROP_YIELD = 5;
const FOOD_CROPS = [
  { id: "wheat",      name: "Weizen",     emoji: "🌾", ingredient: "wheat"      },
  { id: "tomato",     name: "Tomate",     emoji: "🍅", ingredient: "tomato"     },
  { id: "mushroom",   name: "Pilze",      emoji: "🍄", ingredient: "mushrooms"  },
  { id: "pepper",     name: "Paprika",    emoji: "🫑", ingredient: "bell_pepper"},
  { id: "basil",      name: "Basilikum",  emoji: "🌿", ingredient: "basil"      },
  { id: "olive",      name: "Oliven",     emoji: "🫒", ingredient: "olives"     },
  { id: "onion",      name: "Zwiebel",    emoji: "🧅", ingredient: "onion"      },
  { id: "garlic",     name: "Knoblauch",  emoji: "🧄", ingredient: "garlic"     },
];


// Raven animal products — pizza-relevant only
const RAVEN_ITEMS_CFG = [
  { id: "mozzarella", name: "Mozzarella", emoji: "🧀" },
  { id: "salami",     name: "Salami",     emoji: "🥩" },
  { id: "ham",        name: "Schinken",   emoji: "🍖" },
  { id: "anchovies",  name: "Sardellen",  emoji: "🐟" },
  { id: "eggs",       name: "Eier",       emoji: "🥚" },
];

// Pizza toppings with sprite images — ingredientId links to G.inventory
const RE_TOPPINGS = [
  { id: "bacon",            label: "Bacon",         img: "assets/images/Pizza/bacon.png",            ingredientId: "salami"      },
  { id: "basil",            label: "Basilikum",     img: "assets/images/Pizza/basil.png",            ingredientId: "basil"       },
  { id: "egg",              label: "Ei",            img: "assets/images/Pizza/egg.png",              ingredientId: "eggs"        },
  { id: "green_bellpepper", label: "Grüne Paprika", img: "assets/images/Pizza/green_bellpepper.png", ingredientId: "bell_pepper" },
  { id: "gruene_oliven",    label: "Gr. Oliven",    img: "assets/images/Pizza/grüne_oliven.png",     ingredientId: "olives"      },
  { id: "ham",              label: "Schinken",      img: "assets/images/Pizza/ham.png",              ingredientId: "ham"         },
  { id: "jalapenio",        label: "Jalapeño",      img: "assets/images/Pizza/jalapenio.png",        ingredientId: "chili"       },
  { id: "onion",            label: "Zwiebeln",      img: "assets/images/Pizza/onion.png",            ingredientId: "onion"       },
  { id: "red_bellpepper",   label: "Rote Paprika",  img: "assets/images/Pizza/red_bellpepper.png",   ingredientId: "bell_pepper" },
  { id: "salami",           label: "Salami",        img: "assets/images/Pizza/salami.png",           ingredientId: "salami"      },
  { id: "schwarze_oliven",  label: "Schw. Oliven",  img: "assets/images/Pizza/schwarze_oliven.png",  ingredientId: "olives"      },
  { id: "shrimp",           label: "Garnelen",      img: "assets/images/Pizza/shrimp.png",           ingredientId: "anchovies"   },
  { id: "shroomi",          label: "Pilze",         img: "assets/images/Pizza/shroomi.png",          ingredientId: "mushrooms"   },
  { id: "sucuck",           label: "Sucuk",         img: "assets/images/Pizza/sucuck.png",           ingredientId: "salami"      },
  { id: "tomato",           label: "Tomaten",       img: "assets/images/Pizza/tomato.png",           ingredientId: "tomato"      },
];
const RE_PIZZA_MAX_TOPPINGS = 25;
const RE_MAX_ACTIVE_PIZZAS  = 10;

// All usable ingredients (for inventory display)
const ALL_INGREDIENTS = [
  // Pizza base — required for every pizza
  { id: "wheat",      name: "Weizen",      emoji: "🌾", source: "garden" },
  { id: "tomato",     name: "Tomate",      emoji: "🍅", source: "garden" },
  // Garden toppings
  { id: "mushrooms",   name: "Pilze",      emoji: "🍄", source: "garden" },
  { id: "bell_pepper", name: "Paprika",    emoji: "🫑", source: "garden" },
  { id: "basil",       name: "Basilikum",  emoji: "🌿", source: "garden" },
  { id: "olives",      name: "Oliven",     emoji: "🫒", source: "garden" },
  { id: "onion",       name: "Zwiebel",    emoji: "🧅", source: "garden" },
  { id: "garlic",      name: "Knoblauch",  emoji: "🧄", source: "garden" },
  // Animal products
  { id: "mozzarella",  name: "Mozzarella", emoji: "🧀", source: "raven" },
  { id: "salami",      name: "Salami",     emoji: "🥩", source: "raven" },
  { id: "ham",         name: "Schinken",   emoji: "🍖", source: "raven" },
  { id: "anchovies",   name: "Sardellen",  emoji: "🐟", source: "raven" },
  { id: "eggs",        name: "Eier",       emoji: "🥚", source: "raven" },
];


// Restaurant: 4×2-seat + 2×4-seat tables (positions as % of scene)
const TABLE_CFG = [
  { id: "t1", seats: 2, x: 6,  y: 18 },
  { id: "t2", seats: 2, x: 38, y: 18 },
  { id: "t3", seats: 2, x: 6,  y: 52 },
  { id: "t4", seats: 2, x: 38, y: 52 },
  { id: "t5", seats: 4, x: 70, y: 15 },
  { id: "t6", seats: 4, x: 70, y: 55 },
];

const PATRON_COLORS    = ["#e8a080","#80b8e8","#a0e8a0","#e8e080","#c0a0e8","#e8a0c0","#80e8d8","#e8c080"];
const PATIENCE_MS      = 60000;
const RE_LOOP_INTERVAL = 5000;
let   reLoopTimer      = null;
let   rePatronIdCtr    = 0;

/* ══════════════════════════════════════════════════════════
   STATE & SAVE
══════════════════════════════════════════════════════════ */
let G = null;

function defaultState() {
  return {
    version:    SAVE_VERSION,
    settings:   { devMode: false },
    currentDay: 1,
    phase:      "timeless",

    chapters: {},

    garden: {
      beds: Array.from({ length: GARDEN_BEDS }, (_, i) => ({
        id: `bed_${i}`,
        slots: Array(GARDEN_SLOTS_PER_BED).fill(null),
      }))
    },

    inventory: {},

    ravenOrders: [],
    ravenSeeds:  [],


    restaurant: {
      isOpen:        false,
      lastCallFired: false,
      patrons:       [],
      recipes:       [{ id: "basic", name: "Basic Pizza", toppings: [], active: true, deletable: false, orderedCount: 0 }],
      unlocks:       { chefs: 1, cleaner: false },
      sessionStats:  { veryHappy: 0, happy: 0, neutral: 0, sad: 0 },
    },

    stats: {
      totalQuestionsAnswered: 0,
      totalCorrect:           0,
      totalHarvests:          0,
      daysPlayed:             0,
      streak:                 0,
      lastStreakDate:         null,
      bestStreak:             0,
      unlockedAchievements:  [],
      achievementDates:      {},
      memoryRoundsPlayed:    0,
      memoryPairsMatched:    0,
      firstPlayDate:         null,
      dailyDate:             null,
      dailyCorrect:          0,
      learnedLog:            {},
    },
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== SAVE_VERSION) return defaultState();
    return normalizeState(parsed);
  } catch { return defaultState(); }
}

function normalizeState(s) {
  const d    = defaultState();
  s.settings = Object.assign({}, d.settings,    s.settings  || {});
  s.stats    = Object.assign({}, d.stats,        s.stats     || {});
  s.restaurant = Object.assign({}, d.restaurant, s.restaurant || {});
  s.restaurant.patrons      = [];
  s.restaurant.sessionStats = { veryHappy: 0, happy: 0, neutral: 0, sad: 0 };
  s.chapters    = s.chapters    || {};
  s.inventory   = s.inventory   || {};
  s.ravenOrders = s.ravenOrders || [];
  s.ravenSeeds  = s.ravenSeeds  || [];
  // Migrate old ingredients-array recipe format to toppings format
  if (s.restaurant && s.restaurant.recipes) {
    s.restaurant.recipes = s.restaurant.recipes.map(r => {
      if (!r.toppings) {
        return { id: r.id || `pizza_${Date.now()}`, name: r.name || "Pizza", toppings: [], active: true, deletable: r.id !== "basic", orderedCount: r.orderedCount || 0 };
      }
      if (r.deletable === undefined) r.deletable = r.id !== "basic";
      return r;
    });
    if (!s.restaurant.recipes.find(r => r.id === "basic")) {
      s.restaurant.recipes.unshift({ id: "basic", name: "Basic Pizza", toppings: [], active: true, deletable: false, orderedCount: 0 });
    }
  }
  delete s.wilderness;
  if (!s.garden) {
    s.garden = d.garden;
  } else {
    while (s.garden.beds.length < GARDEN_BEDS)
      s.garden.beds.push({ id: `bed_${s.garden.beds.length}`, slots: Array(GARDEN_SLOTS_PER_BED).fill(null) });
    s.garden.beds.forEach(bed => {
      while (bed.slots.length < GARDEN_SLOTS_PER_BED) bed.slots.push(null);
    });
  }
  return s;
}

function saveState() {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(G)); } catch {}
}

/* ══════════════════════════════════════════════════════════
   QUESTION SYSTEM
══════════════════════════════════════════════════════════ */
function getChapterContent(chapterId) {
  return PACK_CONTENT.beds.find(b => b.id === chapterId) || null;
}

function ensureChapterState(chapterId) {
  if (!G.chapters[chapterId]) G.chapters[chapterId] = { activated: false, questions: {}, _completionShown: false };
  return G.chapters[chapterId];
}

function ensureQuestionState(chapterId, questionId) {
  const ch = ensureChapterState(chapterId);
  if (!ch.questions[questionId]) ch.questions[questionId] = { correctDays: [], wrongThisSession: false, nextAvailableDay: 0 };
  return ch.questions[questionId];
}

function isQuestionMastered(qs) {
  return qs && new Set(qs.correctDays).size >= 2;
}

function isChapterComplete(chapterId) {
  const bed = getChapterContent(chapterId);
  if (!bed) return false;
  const allQ = bed.plants.flatMap(p => p.harvestQuestions || []);
  if (!allQ.length) return false;
  const ch = G.chapters[chapterId];
  if (!ch) return false;
  return allQ.every(q => isQuestionMastered(ch.questions[q.id]));
}

function buildQuestionPool() {
  const pool = [];
  for (const [chId, chState] of Object.entries(G.chapters)) {
    if (!chState.activated) continue;
    const bed = getChapterContent(chId);
    if (!bed) continue;
    for (const plant of bed.plants) {
      const allQ = [...(plant.harvestQuestions || []), ...(plant.phase4Questions || [])];
      for (const q of allQ) {
        const qs = chState.questions[q.id];
        if (qs && isQuestionMastered(qs)) continue;
        if (qs && qs.nextAvailableDay > G.currentDay) continue;
        pool.push({ chapterId: chId, question: q, state: qs });
      }
    }
  }
  return pool;
}

let sessionWrongQueue = []; // { chapterId, questionId }

function pickNextQuestion() {
  // 1. Session retry queue
  for (let i = 0; i < sessionWrongQueue.length; i++) {
    const entry = sessionWrongQueue[i];
    const bed   = getChapterContent(entry.chapterId);
    if (!bed) continue;
    const q = bed.plants.flatMap(p => [...(p.harvestQuestions || []), ...(p.phase4Questions || [])]).find(q => q.id === entry.questionId);
    if (q) return { chapterId: entry.chapterId, question: q, isRetry: true };
  }

  const pool = buildQuestionPool();
  if (!pool.length) return null;

  const unseen  = pool.filter(e => !e.state || e.state.correctDays.length === 0);
  if (unseen.length) return unseen[Math.floor(Math.random() * unseen.length)];

  const partial = pool.filter(e => e.state && e.state.correctDays.length === 1);
  if (partial.length) return partial[Math.floor(Math.random() * partial.length)];

  return pool[Math.floor(Math.random() * pool.length)];
}

function recordAnswer(chapterId, questionId, correct) {
  const qs = ensureQuestionState(chapterId, questionId);
  const wasAlreadyMastered = isQuestionMastered(qs);
  const today = new Date().toISOString().slice(0, 10);

  G.stats.totalQuestionsAnswered++;
  if (!G.stats.firstPlayDate) G.stats.firstPlayDate = Date.now();

  // Daily tracking
  if (G.stats.dailyDate !== today) {
    G.stats.dailyDate    = today;
    G.stats.dailyCorrect = 0;
  }

  if (correct) {
    G.stats.totalCorrect++;
    G.stats.dailyCorrect++;
    if (!qs.correctDays.includes(G.currentDay)) qs.correctDays.push(G.currentDay);
    qs.wrongThisSession = false;
    sessionWrongQueue = sessionWrongQueue.filter(e => !(e.chapterId === chapterId && e.questionId === questionId));
    // Track newly mastered questions for pace calculation
    if (!wasAlreadyMastered && isQuestionMastered(qs)) {
      G.stats.learnedLog = G.stats.learnedLog || {};
      G.stats.learnedLog[today] = (G.stats.learnedLog[today] || 0) + 1;
    }
    checkChapterCompletion(chapterId);
  } else {
    qs.wrongThisSession    = true;
    qs.nextAvailableDay    = G.currentDay + 1;
    if (!sessionWrongQueue.find(e => e.chapterId === chapterId && e.questionId === questionId))
      sessionWrongQueue.push({ chapterId, questionId });
  }
  checkTrophies();
  saveState();
}

function checkChapterCompletion(chapterId) {
  if (!isChapterComplete(chapterId)) return;
  const ch = ensureChapterState(chapterId);
  if (ch._completionShown) return;
  ch._completionShown = true;
  const bed = getChapterContent(chapterId);
  showChapterCompletePopup(bed ? bed.title : chapterId);
}

/* ══════════════════════════════════════════════════════════
   QUESTION UI
══════════════════════════════════════════════════════════ */
function isMultiCorrect(q) {
  return q.type === "mc" && (q.options || []).filter(o => o.correct).length > 1;
}

function showQuestion(contextText, entry, onCorrect, onWrong, onDone) {
  const modal   = document.getElementById("modal-question");
  const ctxEl   = document.getElementById("question-context");
  const textEl  = document.getElementById("question-text");
  const optsEl  = document.getElementById("question-options");
  const fbEl    = document.getElementById("question-feedback");
  const contBtn = document.getElementById("question-continue-btn");

  const q = entry.question;
  ctxEl.textContent  = contextText + (entry.isRetry ? " · Wiederholung" : "");
  textEl.textContent = q.type === "true_false" ? q.statement : q.question;
  optsEl.innerHTML   = "";
  fbEl.textContent   = q.explanation || "";
  fbEl.hidden        = true;
  contBtn.hidden     = true;

  if (q.type === "true_false") {
    ["Wahr", "Falsch"].forEach(label => {
      const btn = document.createElement("button");
      btn.className   = "question-option-btn";
      btn.textContent = label;
      const isTrue = label === "Wahr";
      btn.onclick = () => resolveQuestion(isTrue === (q.answer === true), [btn], entry, onCorrect, onWrong, onDone);
      optsEl.appendChild(btn);
    });

  } else if (isMultiCorrect(q)) {
    // Multi-correct: toggle selection, confirm button
    const hint = document.createElement("div");
    hint.className   = "question-multi-hint";
    hint.textContent = "Mehrere Antworten möglich — alle richtigen auswählen";
    optsEl.appendChild(hint);

    const btnEls = (q.options || []).map(opt => {
      const btn = document.createElement("button");
      btn.className   = "question-option-btn question-option-btn--toggle";
      btn.textContent = opt.text;
      btn.dataset.correct = opt.correct ? "1" : "0";
      btn.onclick = () => btn.classList.toggle("question-option-btn--selected");
      return btn;
    });
    btnEls.forEach(b => optsEl.appendChild(b));

    const confirmBtn = document.createElement("button");
    confirmBtn.className   = "question-confirm-multi-btn";
    confirmBtn.textContent = "Bestätigen ✓";
    confirmBtn.onclick = () => {
      const selected = btnEls.filter(b => b.classList.contains("question-option-btn--selected"));
      const allCorrectSelected = (q.options || []).filter(o => o.correct)
        .every(o => selected.some(b => b.textContent === o.text));
      const noWrongSelected = selected.every(b => b.dataset.correct === "1");
      resolveQuestion(allCorrectSelected && noWrongSelected, selected, entry, onCorrect, onWrong, onDone);
      confirmBtn.remove();
    };
    optsEl.appendChild(confirmBtn);

  } else {
    // Single-correct mc: click one to answer immediately
    (q.options || []).forEach(opt => {
      const btn = document.createElement("button");
      btn.className   = "question-option-btn";
      btn.textContent = opt.text;
      btn.onclick = () => resolveQuestion(opt.correct, [btn], entry, onCorrect, onWrong, onDone);
      optsEl.appendChild(btn);
    });
  }

  modal.hidden = false;
}

function resolveQuestion(isCorrect, clickedBtns, entry, onCorrect, onWrong, onDone) {
  const optsEl  = document.getElementById("question-options");
  const fbEl    = document.getElementById("question-feedback");
  const contBtn = document.getElementById("question-continue-btn");
  const q       = entry.question;

  Array.from(optsEl.querySelectorAll(".question-option-btn")).forEach(btn => {
    btn.disabled = true;
    if (q.type === "true_false") {
      const btnIsTrue = btn.textContent === "Wahr";
      if (btnIsTrue === (q.answer === true)) btn.classList.add("question-option-btn--correct");
      else if (clickedBtns.includes(btn) && !isCorrect) btn.classList.add("question-option-btn--wrong");
    } else {
      const opt = (q.options || []).find(o => o.text === btn.textContent);
      if (opt) {
        if (opt.correct) btn.classList.add("question-option-btn--correct");
        else if (clickedBtns.includes(btn)) btn.classList.add("question-option-btn--wrong");
      }
    }
  });

  fbEl.hidden    = false;
  contBtn.hidden = false;
  recordAnswer(entry.chapterId, entry.question.id, isCorrect);
  if (isCorrect) onCorrect && onCorrect();
  else onWrong && onWrong();

  contBtn.onclick = () => {
    document.getElementById("modal-question").hidden = true;
    onDone && onDone();
  };
}

// Ask `count` questions in sequence, calling onAllDone when finished
// Asks questions until `count` correct answers are accumulated.
// Wrong answers don't count — player keeps going until they have enough correct.
function askQuestions(contextText, count, onAllDone, onEachCorrect) {
  let correct = 0;
  function next() {
    if (correct >= count) { onAllDone && onAllDone(); return; }
    const entry = pickNextQuestion();
    if (!entry) { onAllDone && onAllDone(); return; }
    showQuestion(contextText, entry,
      () => { correct++; onEachCorrect && onEachCorrect(); },
      () => {},
      next
    );
  }
  next();
}

function hasActiveQuestions() {
  return buildQuestionPool().length > 0 || sessionWrongQueue.length > 0;
}

/* ══════════════════════════════════════════════════════════
   STATS BAR
══════════════════════════════════════════════════════════ */
function getLearningProgress() {
  let total = 0, mastered = 0, activeTotal = 0, activeMastered = 0;
  for (const bed of PACK_CONTENT.beds) {
    const ch = G.chapters[bed.id];
    const isActive = ch && ch.activated;
    for (const plant of bed.plants) {
      for (const q of [...(plant.harvestQuestions || []), ...(plant.phase4Questions || [])]) {
        total++;
        const qs = ch ? ch.questions[q.id] : null;
        const done = qs && isQuestionMastered(qs);
        if (done) mastered++;
        if (isActive) {
          activeTotal++;
          if (done) activeMastered++;
        }
      }
    }
  }
  return { total, mastered, remaining: total - mastered, activeTotal, activeMastered };
}

function getRecentLearnPace(windowDays) {
  const log  = G.stats.learnedLog || {};
  const now  = Date.now();
  const days = G.stats.firstPlayDate
    ? Math.max(1, Math.ceil((now - G.stats.firstPlayDate) / 86400000))
    : 1;
  const span = Math.min(windowDays, days);
  let sum = 0;
  for (let i = 0; i < span; i++) {
    const d = new Date(now - i * 86400000).toISOString().slice(0, 10);
    sum += log[d] || 0;
  }
  return { pace: sum / span, span };
}

function renderStats() {
  const el = document.getElementById("player-stats");
  if (!el) return;

  const { total, mastered, remaining, activeTotal, activeMastered } = getLearningProgress();
  const active   = Object.values(G.chapters).filter(c => c.activated).length;
  const today    = new Date().toISOString().slice(0, 10);
  const streak   = G.stats.streak || 0;
  const streakOn = G.stats.lastStreakDate === today;

  // Daily dots
  const dailyDone     = G.stats.dailyDate === today ? (G.stats.dailyCorrect || 0) : 0;
  const dailyComplete = dailyDone >= DAILY_GOAL;
  const dots = Array.from({ length: DAILY_GOAL }, (_, i) =>
    `<span class="daily-dot${i < dailyDone ? " daily-dot--done" : ""}"></span>`).join("");

  // Pace row — switch to /Woche when needed < 1/day to avoid "0.3/Tag" nonsense
  let paceHtml = "";
  const now      = Date.now();
  const daysLeft = (EXAM_DEADLINE - now) / 86400000;
  if (total > 0 && daysLeft > 0) {
    const needed = (total - mastered) / daysLeft;
    const fmtRate = (perDay) => perDay < 1
      ? `< 1/Tag`
      : `${Math.ceil(perDay)}/Tag`;
    if (G.stats.firstPlayDate && mastered > 0) {
      const { pace, span } = getRecentLearnPace(7);
      const onTrack = pace >= needed;
      paceHtml = `<span class="stat-pace ${onTrack ? "stat-pace--ok" : "stat-pace--warn"}"
        title="Ziel: ${fmtRate(needed)} · Dein Schnitt letzte ${span}T: ${fmtRate(pace)}">🎯 ${fmtRate(needed)} · Du ${fmtRate(pace)} ${onTrack ? "✓" : "⚠️"}</span>`;
    } else {
      paceHtml = `<span class="stat-pace" title="Benötigtes Tempo bis Dez 2026">🎯 ${fmtRate(needed)} nötig</span>`;
    }
  }

  const totalChapters = PACK_CONTENT.beds.length;
  const doneChapters  = PACK_CONTENT.beds.filter(b => isChapterComplete(b.id)).length;

  el.innerHTML = `
    <div class="stat-row">
      <div>📖 <strong>${remaining}</strong> offen</div>
      <div>🟢 <strong>${doneChapters}/${totalChapters}</strong></div>
      <div class="stat-streak${streakOn ? " stat-streak--active" : ""}">🔥 ${streak}</div>
      <div class="stat-daily${dailyComplete ? " stat-daily--done" : ""}" title="Tagesziel: ${DAILY_GOAL} korrekte Antworten">${dots}</div>
    </div>
    <div class="stat-row">
      ${paceHtml}
      <div style="font-size:0.92rem;color:var(--muted)">heute <strong style="color:var(--text)">${dailyDone}</strong> ${dailyDone === 1 ? "Frage" : "Fragen"}</div>
    </div>
  `;
}

function updateDayInfo() {}

/* ══════════════════════════════════════════════════════════
   MODAL HELPERS
══════════════════════════════════════════════════════════ */
function openModal(id)  { const e = document.getElementById(id); if (e) e.hidden = false; }
function closeModal(id) { const e = document.getElementById(id); if (e) e.hidden = true;  }
// Expose on window so inline onclick attributes can call them
window.openModal  = openModal;
window.closeModal = closeModal;

function scrollToScreen(screenId) {
  const container = document.getElementById("screen-container");
  const target    = document.getElementById(screenId);
  if (!container || !target) return;
  container.scrollLeft = target.offsetLeft;
}

/* ══════════════════════════════════════════════════════════
   GARDEN
══════════════════════════════════════════════════════════ */
function renderGarden() {
  const grid = document.getElementById("garden-grid");
  if (!grid) return;
  grid.innerHTML = "";

  G.garden.beds.forEach((bed, bedIdx) => {
    const bedEl = document.createElement("div");
    bedEl.className = "garden-bed";

    // Bed header: show how many slots are planted / ready
    const planted = bed.slots.filter(s => s).length;
    const readyCount = bed.slots.filter(s => s && (G.currentDay - s.plantedDay) >= PLANT_GROW_DAYS).length;
    const header = document.createElement("div");
    header.className = "garden-bed-header";
    header.innerHTML = `Beet ${bedIdx + 1}` +
      (readyCount ? ` <span class="bed-ready-badge">✨ ${readyCount} reif</span>` : "") +
      (planted ? ` <span class="bed-planted-count muted">${planted}/6</span>` : "");
    bedEl.appendChild(header);

    const slotsEl = document.createElement("div");
    slotsEl.className = "garden-slots";

    bed.slots.forEach((slot, slotIdx) => {
      const slotEl = document.createElement("div");

      if (!slot) {
        slotEl.className = "garden-slot garden-slot--empty";
        slotEl.innerHTML = `<span class="slot-add-icon">＋</span>`;
        slotEl.onclick = () => openSeedPicker(bedIdx, slotIdx);
      } else {
        const crop      = FOOD_CROPS.find(c => c.id === slot.plantId);
        const emoji     = crop ? crop.emoji : "🌱";
        const daysGrown = G.currentDay - slot.plantedDay;
        const daysLeft  = Math.max(0, PLANT_GROW_DAYS - daysGrown);
        const ready     = daysLeft === 0;
        const watered   = slot.wateredToday === G.currentDay;

        // Growth stage 0–3 drives emoji size via CSS class
        const stage = ready ? 3 : Math.min(daysGrown, 2);

        slotEl.className = `garden-slot garden-slot--planted${ready ? " garden-slot--ready" : ""}${watered ? " garden-slot--watered" : ""}`;

        // 5 individual emoji spans — clickable when ready
        const emojiSpans = Array.from({ length: CROP_YIELD }, (_, i) => {
          const span = document.createElement("span");
          span.className = `slot-crop slot-crop--s${stage}`;
          span.textContent = emoji;
          if (ready) span.onclick = (e) => { e.stopPropagation(); harvestPlant(bedIdx, slotIdx); };
          return span;
        });

        const cropsDiv = document.createElement("div");
        cropsDiv.className = "slot-crops";
        emojiSpans.forEach(s => cropsDiv.appendChild(s));

        const nameEl = document.createElement("div");
        nameEl.className = "slot-name";
        nameEl.textContent = slot.plantTitle || slot.plantId;

        const statusEl = document.createElement("div");
        statusEl.className = `slot-status${ready ? " slot-status--ready" : ""}`;
        statusEl.textContent = ready ? "✨ Reif!" : (watered ? `💧 ${daysLeft}T` : `🏜️ ${daysLeft}T`);

        slotEl.appendChild(cropsDiv);
        slotEl.appendChild(nameEl);
        slotEl.appendChild(statusEl);

        if (!ready) slotEl.onclick = () => openSlotActions(bedIdx, slotIdx, ready, watered);
      }
      slotsEl.appendChild(slotEl);
    });

    bedEl.appendChild(slotsEl);
    grid.appendChild(bedEl);
  });
}

function openSeedPicker(bedIdx, slotIdx) {
  const available = FOOD_CROPS.filter(c => (G.inventory[`seed_${c.id}`] || 0) > 0);
  if (!available.length) {
    showToast("Keine Samen! Bestelle Samen per 🪶 Raben-Lieferung.");
    return;
  }
  showPickerModal("Pflanze auswählen", available.map(c => ({
    label: `${c.emoji} ${c.name}`,
    sub:   `→ ${CROP_YIELD}× ${getIngredientName(c.ingredient)} | Lager: ${G.inventory[`seed_${c.id}`]}`,
    value: c,
  })), chosen => {
    closeModal("modal-picker");
    plantSeed(bedIdx, slotIdx, chosen.value.id, chosen.value.name);
  });
}

function getAvailableSeeds() {
  return FOOD_CROPS.filter(c => (G.inventory[`seed_${c.id}`] || 0) > 0)
    .map(c => ({ cropId: c.id, plantTitle: c.name, qty: G.inventory[`seed_${c.id}`] }));
}

function plantSeed(bedIdx, slotIdx, cropId, cropName) {
  G.garden.beds[bedIdx].slots[slotIdx] = { plantId: cropId, plantTitle: cropName, plantedDay: G.currentDay, wateredToday: null };
  const key = `seed_${cropId}`;
  if ((G.inventory[key] || 0) > 0) G.inventory[key]--;
  saveState();
  renderGarden();
}

function openSlotActions(bedIdx, slotIdx, ready, wateredToday) {
  const slot = G.garden.beds[bedIdx].slots[slotIdx];
  if (!slot) return;
  const actions = [];
  if (ready)          actions.push({ label: "🌿 Ernten",            value: "harvest" });
  else if (!wateredToday) actions.push({ label: "💧 Wässern (1 Frage)", value: "water" });
  else                actions.push({ label: "💧 Heute schon gewässert", value: null });
  actions.push({ label: "🗑️ Entfernen", value: "remove" });

  showPickerModal(slot.plantTitle, actions, chosen => {
    closeModal("modal-picker");
    if (chosen.value === "harvest") harvestPlant(bedIdx, slotIdx);
    else if (chosen.value === "water") waterPlant(bedIdx, slotIdx);
    else if (chosen.value === "remove") {
      G.garden.beds[bedIdx].slots[slotIdx] = null;
      saveState(); renderGarden();
    }
  });
}

function waterPlant(bedIdx, slotIdx) {
  if (!hasActiveQuestions()) {
    showToast("Keine aktiven Fragen! Aktiviere Kapitel unter 📚.");
    return;
  }
  const entry = pickNextQuestion();
  if (!entry) { showToast("Keine Fragen verfügbar."); return; }

  showQuestion("💧 Wässern", entry,
    () => { G.garden.beds[bedIdx].slots[slotIdx].wateredToday = G.currentDay; },
    () => {},
    () => { saveState(); renderGarden(); }
  );
}

function harvestPlant(bedIdx, slotIdx) {
  const slot = G.garden.beds[bedIdx].slots[slotIdx];
  if (!slot) return;
  const crop = FOOD_CROPS.find(c => c.id === slot.plantId);
  const ingredient = crop ? crop.ingredient : "wheat";
  const qty = CROP_YIELD;
  addInventory(ingredient, qty);
  G.stats.totalHarvests++;
  G.garden.beds[bedIdx].slots[slotIdx] = null;
  saveState();
  renderGarden();
  renderRestaurantStats();
  showToast(`${crop ? crop.emoji : "🌿"} ${slot.plantTitle} geerntet! +${qty} ${getIngredientName(ingredient)}`);
}

function addInventory(id, qty) {
  G.inventory[id] = (G.inventory[id] || 0) + qty;
}

function getIngredientName(id) {
  return (ALL_INGREDIENTS.find(i => i.id === id) || { name: id }).name;
}

function getIngredientEmoji(id) {
  return (ALL_INGREDIENTS.find(i => i.id === id) || { emoji: "📦" }).emoji;
}


/* ══════════════════════════════════════════════════════════
   DAY SYSTEM
══════════════════════════════════════════════════════════ */
function openRestaurant() {
  G.phase                   = "service";
  G.restaurant.isOpen       = true;
  G.restaurant.lastCallFired = false;
  G.restaurant.sessionStats  = { veryHappy: 0, happy: 0, neutral: 0, sad: 0 };
  updateRestaurantUI();
  startRestaurantLoop();
  saveState();
}

function doLastCall() {
  G.restaurant.lastCallFired = true;
  stopRestaurantLoop();
  updateRestaurantUI();
  saveState();
}

function doSleep() {
  stopRestaurantLoop();
  G.restaurant.isOpen    = false;
  G.phase                = "timeless";
  G.restaurant.patrons   = [];

  G.currentDay++;
  G.stats.daysPlayed++;

  // Process deliveries
  G.ravenOrders.filter(o => o.arrivesOnDay <= G.currentDay).forEach(o => addInventory(o.itemId, o.qty));
  G.ravenOrders = G.ravenOrders.filter(o => o.arrivesOnDay > G.currentDay);
  G.ravenSeeds.filter(o => o.arrivesOnDay <= G.currentDay).forEach(o => {
    const key = `seed_${o.plantId}`;
    G.inventory[key] = (G.inventory[key] || 0) + o.qty;
  });
  G.ravenSeeds = G.ravenSeeds.filter(o => o.arrivesOnDay > G.currentDay);

  // Reset session state
  sessionWrongQueue = [];
  for (const ch of Object.values(G.chapters))
    for (const qs of Object.values(ch.questions))
      qs.wrongThisSession = false;

  saveState();
  renderAll();
  showToast(`🌅 Tag ${G.currentDay} beginnt!`);
}

/* ══════════════════════════════════════════════════════════
   RESTAURANT
══════════════════════════════════════════════════════════ */
function updateRestaurantUI() {
  const overlay   = document.getElementById("restaurant-closed-overlay");
  const btnOpen   = document.getElementById("btn-open-restaurant");
  const btnLC     = document.getElementById("btn-last-call");
  const btnSleep  = document.getElementById("btn-sleep");

  if (G.phase === "service") {
    if (overlay) overlay.hidden = true;
    if (btnOpen) btnOpen.hidden = true;
    if (btnLC)   btnLC.hidden   = G.restaurant.lastCallFired;
    if (btnSleep) btnSleep.hidden = !G.restaurant.lastCallFired;
  } else {
    // Timeless/closed phase: Sleep always available
    if (overlay) overlay.hidden = false;
    if (btnOpen) btnOpen.hidden = false;
    if (btnLC)   btnLC.hidden   = true;
    if (btnSleep) btnSleep.hidden = false;
  }

  renderRestaurantScene();
  renderRestaurantStats();
}

function startRestaurantLoop() {
  stopRestaurantLoop();
  spawnPatron();
  reLoopTimer = setInterval(() => {
    if (!G.restaurant.isOpen || G.restaurant.lastCallFired) return;
    const totalSeats = TABLE_CFG.reduce((s, t) => s + t.seats, 0);
    const seated     = G.restaurant.patrons.filter(p => p.state !== "leaving").length;
    if (seated < totalSeats) spawnPatron();
    tickPatrons();
    renderRestaurantScene();
    renderRestaurantStats();
  }, RE_LOOP_INTERVAL);
}

function stopRestaurantLoop() {
  if (reLoopTimer) { clearInterval(reLoopTimer); reLoopTimer = null; }
}

function spawnPatron() {
  const allSeats  = TABLE_CFG.flatMap(t => Array.from({ length: t.seats }, (_, i) => ({ tableId: t.id, seatIdx: i })));
  const taken     = new Set(G.restaurant.patrons.filter(p => p.state !== "leaving").map(p => `${p.tableId}_${p.seatIdx}`));
  const freeSeats = allSeats.filter(s => !taken.has(`${s.tableId}_${s.seatIdx}`));
  if (!freeSeats.length) return;

  const seat   = freeSeats[Math.floor(Math.random() * freeSeats.length)];
  const color  = PATRON_COLORS[rePatronIdCtr % PATRON_COLORS.length];
  const craving = pickRandomIngredient();
  G.restaurant.patrons.push({
    id: `p_${++rePatronIdCtr}`,
    tableId: seat.tableId,
    seatIdx: seat.seatIdx,
    color,
    craving,
    state: "hungry",
    arrivedAt: Date.now(),
    servedItem: null,
    happiness: null,
  });
  renderRestaurantScene();
}

function pickRandomIngredient() {
  const avail = Object.entries(G.inventory).filter(([k, v]) => !k.startsWith("seed_") && v > 0).map(([k]) => k);
  if (avail.length) return avail[Math.floor(Math.random() * avail.length)];
  return ALL_INGREDIENTS[Math.floor(Math.random() * ALL_INGREDIENTS.length)].id;
}

function tickPatrons() {
  const patience = G.settings.devMode ? 15000 : PATIENCE_MS;
  const now      = Date.now();
  G.restaurant.patrons = G.restaurant.patrons.filter(p => {
    if (p.state === "leaving") return false;
    if (p.state === "hungry" && (now - p.arrivedAt) > patience) {
      p.happiness = "sad";
      p.state     = "leaving";
      G.restaurant.sessionStats.sad++;
    }
    return true;
  });
}

function serveTable(tableId) {
  if (G.phase !== "service") return;
  const hungry = G.restaurant.patrons.filter(p => p.tableId === tableId && p.state === "hungry");
  if (!hungry.length) return;

  const servable = G.restaurant.recipes.filter(canServeRecipe);
  if (!servable.length) {
    showToast("Keine Zutaten / Gerichte! Küche → Gericht erstellen.");
    return;
  }
  const recipe = servable[0];
  const needed = pizzaToppingNeeds(recipe);
  Object.entries(needed).forEach(([id, qty]) => { G.inventory[id] = Math.max(0, (G.inventory[id] || 0) - qty); });
  recipe.orderedCount = (recipe.orderedCount || 0) + 1;

  hungry.forEach(p => {
    p.servedItem = recipe.id;
    p.state      = "eating";
    setTimeout(() => {
      const tp = RE_TOPPINGS.find(x => x.ingredientId === p.craving);
      const match = tp ? (recipe.toppings || []).filter(t => t.id === tp.id).length : 0;
      p.happiness = match >= 2 ? "veryHappy" : match >= 1 ? "happy" : "neutral";
      G.restaurant.sessionStats[p.happiness]++;
      p.state = "leaving";
      renderRestaurantScene();
      renderRestaurantStats();
      saveState();
    }, G.settings.devMode ? 2000 : 5000);
  });

  saveState();
  renderRestaurantScene();
  renderRestaurantStats();
}

function pizzaToppingNeeds(r) {
  const needed = { wheat: 1, tomato: 1 };
  (r.toppings || []).forEach(t => {
    const tp = RE_TOPPINGS.find(x => x.id === t.id);
    if (tp) needed[tp.ingredientId] = (needed[tp.ingredientId] || 0) + 1;
  });
  return needed;
}

function canServeRecipe(r) {
  const needed = pizzaToppingNeeds(r);
  return Object.entries(needed).every(([id, qty]) => (G.inventory[id] || 0) >= qty);
}

function happinessEmoji(h) {
  return { veryHappy: "😊", happy: "🙂", neutral: "😐", sad: "😞" }[h] || "👤";
}

function renderRestaurantScene() {
  const tablesEl = document.getElementById("re-tables");
  if (!tablesEl) return;

  tablesEl.innerHTML = TABLE_CFG.map(t => {
    const patrons   = G.restaurant.patrons.filter(p => p.tableId === t.id && p.state !== "leaving");
    const hasHungry = patrons.some(p => p.state === "hungry");
    const w = t.seats <= 2 ? 70 : 95;
    const h = t.seats <= 2 ? 44 : 44;
    const border = hasHungry ? "#e8c860" : "#2d3a35";
    const icons  = patrons.map(p => `<span style="font-size:1.3rem">${p.happiness ? happinessEmoji(p.happiness) : p.state === "eating" ? "🍽️" : "👤"}</span>`).join("");

    return `<div class="re-table" data-tid="${t.id}"
      style="position:absolute;left:${t.x}%;top:${t.y}%;width:${w}px;min-height:${h}px;
      background:var(--bg2);border:2px solid ${border};border-radius:8px;
      display:flex;align-items:center;justify-content:center;flex-wrap:wrap;
      gap:3px;padding:4px;cursor:pointer;box-shadow:${hasHungry ? "0 0 8px rgba(232,200,96,0.4)" : "none"}">
      ${icons || '<span style="color:var(--muted);font-size:0.8rem">🪑</span>'}
    </div>`;
  }).join("");

  tablesEl.querySelectorAll(".re-table").forEach(el => {
    el.onclick = () => serveTable(el.dataset.tid);
  });
}

function renderRestaurantStats() {
  const el = document.getElementById("re-stats-row");
  if (!el) return;
  const s   = G.restaurant.sessionStats;
  const inv = Object.entries(G.inventory)
    .filter(([k, v]) => !k.startsWith("seed_") && v > 0)
    .slice(0, 6)
    .map(([k, v]) => `${getIngredientEmoji(k)}×${v}`)
    .join(" ");
  el.innerHTML = `
    <span>😊${s.veryHappy} 🙂${s.happy} 😐${s.neutral} 😞${s.sad}</span>
    <span style="margin-left:auto;font-size:0.78rem">${inv || "Lager leer"}</span>`;
}

/* ══════════════════════════════════════════════════════════
   KITCHEN / PIZZA CREATOR
══════════════════════════════════════════════════════════ */
let rePizzaCreatorState = null;

function buildMiniPizzaHtml(toppings) {
  const tops = (toppings || []).map(t => {
    const tp = RE_TOPPINGS.find(x => x.id === t.id);
    return tp ? `<img src="${tp.img}" class="re-mp-top" style="left:${t.x}%;top:${t.y}%" draggable="false">` : "";
  }).join("");
  return `<div class="re-mini-pizza"><img src="assets/images/Pizza/basic.png" class="re-mp-base" draggable="false">${tops}</div>`;
}

function renderKitchen() {
  const el = document.getElementById("kitchen-content");
  if (!el) return;
  rePizzaCreatorState = null;

  const activeCount = G.restaurant.recipes.filter(r => r.active).length;
  const rows = G.restaurant.recipes.map(r => {
    const controls = r.deletable
      ? `<button class="re-pm-btn re-pm-btn--toggle${r.active ? "" : " re-pm-btn--off"}" onclick="togglePizzaActive('${r.id}')">${r.active ? "Aktiv" : "Inaktiv"}</button>
         <button class="re-pm-btn" onclick="openPizzaCreator('${r.id}')">✏️</button>
         <button class="re-pm-btn re-pm-btn--del" onclick="if(confirm('Pizza löschen?'))deletePizzaRecipe('${r.id}')">🗑️</button>`
      : `<span class="re-pm-badge">Standard</span>`;
    return `<div class="re-pm-row${r.active ? " re-pm-row--active" : ""}">
      <div class="re-pm-info">
        ${buildMiniPizzaHtml(r.toppings)}
        <div class="re-pm-name">${escapeHtmlText(r.name)}</div>
      </div>
      <div class="re-pm-meta">
        <span class="re-pm-orders">${r.orderedCount || 0}×</span>
        <div class="re-pm-controls">${controls}</div>
      </div>
    </div>`;
  }).join("");

  el.innerHTML = `
    <div class="re-pm-header">
      <span class="muted" style="font-size:.75rem">${activeCount}/${RE_MAX_ACTIVE_PIZZAS} aktiv</span>
      <button class="re-pm-create-btn" onclick="openPizzaCreator()">+ Neue Pizza</button>
    </div>
    ${rows}
    <div id="re-pizza-creator" class="re-pc-overlay" hidden>
      <div class="re-pc-box">
        <div class="re-pc-header">
          <span class="re-pc-title">🍕 Pizza Creator</span>
          <button class="re-pc-close-btn" onclick="closePizzaCreator()">✕</button>
        </div>
        <div class="re-pc-body">
          <div class="re-pc-left">
            <div class="re-pc-canvas" id="re-pc-canvas"
              ondragover="reOnPizzaDragOver(event)" ondrop="reOnPizzaDrop(event)">
              <img src="assets/images/Pizza/basic.png" class="re-pc-base" draggable="false">
              <div id="re-pc-toppings"></div>
            </div>
            <div class="re-pc-counter"><span id="re-pc-count">0</span>/${RE_PIZZA_MAX_TOPPINGS} · Topping klicken zum Entfernen</div>
            <div class="re-pc-name-row">
              <input id="re-pc-name" type="text" placeholder="Pizza benennen…" maxlength="28" class="re-pc-name-input">
              <button onclick="savePizzaRecipe()" class="re-pc-save-btn">Speichern</button>
            </div>
          </div>
          <div class="re-pc-palette" id="re-pc-palette"></div>
        </div>
      </div>
    </div>`;
}

function openPizzaCreator(editId) {
  const existing = editId ? G.restaurant.recipes.find(r => r.id === editId) : null;
  rePizzaCreatorState = { toppings: existing ? existing.toppings.map(t => ({ ...t })) : [], editingId: editId || null };
  const overlay = document.getElementById("re-pizza-creator");
  if (!overlay) return;
  const nameEl = document.getElementById("re-pc-name");
  if (nameEl) nameEl.value = existing?.name || "";
  buildPizzaPalette();
  reRenderPizzaCanvas();
  overlay.hidden = false;
}

function closePizzaCreator() {
  const overlay = document.getElementById("re-pizza-creator");
  if (overlay) overlay.hidden = true;
  rePizzaCreatorState = null;
}

function buildPizzaPalette() {
  const palette = document.getElementById("re-pc-palette");
  if (!palette) return;
  const placed = {};
  (rePizzaCreatorState?.toppings || []).forEach(t => { placed[t.id] = (placed[t.id] || 0) + 1; });

  palette.innerHTML = RE_TOPPINGS.map(t => {
    const stock     = G.inventory[t.ingredientId] || 0;
    const available = stock - (placed[t.id] || 0);
    const empty     = available <= 0;
    return `<div class="re-pc-tile${empty ? " re-pc-tile--empty" : ""}"
        ${!empty ? `draggable="true" ondragstart="reOnDragStart(event,'${t.id}')"` : ""}
        title="${t.label}${empty ? " (kein Vorrat)" : ` (${available} verfügbar)`}">
      <img src="${t.img}" class="re-pc-tile-img" draggable="false">
      <span class="re-pc-tile-lbl">${t.label}</span>
      <span class="re-pc-tile-stock${empty ? " re-pc-tile-stock--out" : ""}">${stock}</span>
    </div>`;
  }).join("");
}

function reRenderPizzaCanvas() {
  if (!rePizzaCreatorState) return;
  const countEl = document.getElementById("re-pc-count");
  if (countEl) countEl.textContent = rePizzaCreatorState.toppings.length;
  const div = document.getElementById("re-pc-toppings");
  if (!div) return;
  div.innerHTML = rePizzaCreatorState.toppings.map((t, idx) => {
    const tp = RE_TOPPINGS.find(x => x.id === t.id);
    return tp
      ? `<img src="${tp.img}" class="re-pc-placed" style="left:${t.x}%;top:${t.y}%"
           title="${tp.label} — klicken zum Entfernen" draggable="false"
           onclick="rePizzaRemoveTopping(${idx})">`
      : "";
  }).join("");
  buildPizzaPalette();
}

function rePizzaRemoveTopping(idx) {
  if (!rePizzaCreatorState) return;
  rePizzaCreatorState.toppings.splice(idx, 1);
  reRenderPizzaCanvas();
}

function reOnDragStart(event, toppingId) {
  event.dataTransfer.setData("toppingId", toppingId);
  event.dataTransfer.effectAllowed = "copy";
}

function reOnPizzaDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "copy";
}

function reOnPizzaDrop(event) {
  event.preventDefault();
  if (!rePizzaCreatorState || rePizzaCreatorState.toppings.length >= RE_PIZZA_MAX_TOPPINGS) return;
  const id = event.dataTransfer.getData("toppingId");
  const tp = RE_TOPPINGS.find(t => t.id === id);
  if (!tp) return;
  const placed    = rePizzaCreatorState.toppings.filter(t => t.id === id).length;
  const available = (G.inventory[tp.ingredientId] || 0) - placed;
  if (available <= 0) { showToast(`${tp.label} — kein Vorrat mehr!`); return; }
  const canvas = document.getElementById("re-pc-canvas");
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const x = Math.max(5, Math.min(95, Math.round(((event.clientX - rect.left)  / rect.width)  * 100)));
  const y = Math.max(5, Math.min(95, Math.round(((event.clientY - rect.top)   / rect.height) * 100)));
  rePizzaCreatorState.toppings.push({ id, x, y });
  reRenderPizzaCanvas();
}

function savePizzaRecipe() {
  if (!rePizzaCreatorState) return;
  const name = (document.getElementById("re-pc-name")?.value.trim()) || "Neue Pizza";
  if (rePizzaCreatorState.editingId) {
    const recipe = G.restaurant.recipes.find(r => r.id === rePizzaCreatorState.editingId);
    if (recipe) { recipe.name = name; recipe.toppings = rePizzaCreatorState.toppings; }
  } else {
    const activeCount = G.restaurant.recipes.filter(r => r.active).length;
    G.restaurant.recipes.push({ id: `pizza_${Date.now()}`, name, toppings: rePizzaCreatorState.toppings, active: activeCount < RE_MAX_ACTIVE_PIZZAS, deletable: true, orderedCount: 0 });
  }
  saveState();
  renderKitchen();
}

function deletePizzaRecipe(recipeId) {
  const idx = G.restaurant.recipes.findIndex(r => r.id === recipeId && r.deletable);
  if (idx >= 0) { G.restaurant.recipes.splice(idx, 1); saveState(); renderKitchen(); }
}

function togglePizzaActive(recipeId) {
  const recipe = G.restaurant.recipes.find(r => r.id === recipeId && r.deletable);
  if (!recipe) return;
  if (!recipe.active && G.restaurant.recipes.filter(r => r.active).length >= RE_MAX_ACTIVE_PIZZAS) {
    showToast(`Maximal ${RE_MAX_ACTIVE_PIZZAS} aktive Pizzen erlaubt.`); return;
  }
  recipe.active = !recipe.active;
  saveState(); renderKitchen();
}

// Expose for inline onclick handlers
window.openPizzaCreator     = openPizzaCreator;
window.closePizzaCreator    = closePizzaCreator;
window.savePizzaRecipe      = savePizzaRecipe;
window.deletePizzaRecipe    = deletePizzaRecipe;
window.togglePizzaActive    = togglePizzaActive;
window.reOnDragStart        = reOnDragStart;
window.reOnPizzaDragOver    = reOnPizzaDragOver;
window.reOnPizzaDrop        = reOnPizzaDrop;
window.rePizzaRemoveTopping = rePizzaRemoveTopping;

/* ══════════════════════════════════════════════════════════
   RAVEN ORDERS
══════════════════════════════════════════════════════════ */
let ravenQtys = {};

function renderRavenModal() {
  const listEl = document.getElementById("raven-order-list");
  const pendEl = document.getElementById("raven-pending");
  if (!listEl) return;
  ravenQtys = {};

  let html = `<div style="font-size:0.78rem;font-weight:700;color:var(--muted);margin-bottom:0.3rem;text-transform:uppercase;letter-spacing:0.05em">🥩 Tierische Produkte (Pizza-Belag)</div>`;
  html += RAVEN_ITEMS_CFG.map(item => {
    ravenQtys[item.id] = 0;
    return `<div class="raven-order-item">
      <span style="font-size:1rem">${item.emoji}</span>
      <span class="raven-order-item-name">${item.name}</span>
      <button class="raven-order-qty-btn" data-key="${item.id}" data-d="-1">−</button>
      <span class="raven-order-qty" id="rqty-${item.id}">0</span>
      <button class="raven-order-qty-btn" data-key="${item.id}" data-d="1">+</button>
    </div>`;
  }).join("");

  html += `<div style="font-size:0.78rem;font-weight:700;color:var(--muted);margin:0.7rem 0 0.3rem;text-transform:uppercase;letter-spacing:0.05em">🌱 Samen (Garten)</div>`;
  html += FOOD_CROPS.map(crop => {
    const key = `seed_${crop.id}`;
    ravenQtys[key] = 0;
    const inStock = G.inventory[key] || 0;
    return `<div class="raven-order-item">
      <span style="font-size:1rem">${crop.emoji}</span>
      <span class="raven-order-item-name">${crop.name} <span style="color:var(--muted);font-size:0.75rem">→${CROP_YIELD}× ${getIngredientName(crop.ingredient)}</span>${inStock ? ` <span style="color:#7fc98a;font-size:0.72rem">(${inStock} im Lager)</span>` : ""}</span>
      <button class="raven-order-qty-btn" data-key="${key}" data-d="-1">−</button>
      <span class="raven-order-qty" id="rqty-${key}">0</span>
      <button class="raven-order-qty-btn" data-key="${key}" data-d="1">+</button>
    </div>`;
  }).join("");

  html += `<button id="raven-confirm-btn" class="raven-order-confirm-btn" disabled>📦 Bestellen (0 Fragen)</button>`;
  listEl.innerHTML = html;

  listEl.querySelectorAll(".raven-order-qty-btn").forEach(btn => {
    btn.onclick = () => {
      const key = btn.dataset.key;
      const d   = parseInt(btn.dataset.d);
      ravenQtys[key] = Math.max(0, (ravenQtys[key] || 0) + d);
      const qtyEl = document.getElementById(`rqty-${key}`);
      if (qtyEl) qtyEl.textContent = ravenQtys[key];
      updateRavenTotal();
    };
  });

  document.getElementById("raven-confirm-btn").onclick = placeRavenOrder;

  // Pending deliveries
  let pend = "";
  if (G.ravenOrders.length || G.ravenSeeds.length) {
    pend = "<strong>Ausstehend:</strong>";
    G.ravenOrders.forEach(o => { pend += `<div class="raven-pending-item">• ${o.qty}× ${o.itemName} → Tag ${o.arrivesOnDay}</div>`; });
    G.ravenSeeds.forEach(o => {
      const crop = FOOD_CROPS.find(c => c.id === o.plantId);
      pend += `<div class="raven-pending-item">• ${o.qty}× Samen (${crop ? crop.emoji + " " + crop.name : o.plantId}) → Tag ${o.arrivesOnDay}</div>`;
    });
  }
  pendEl.innerHTML = pend;
}

function updateRavenTotal() {
  const total = Object.values(ravenQtys).reduce((s, v) => s + v, 0);
  const btn   = document.getElementById("raven-confirm-btn");
  if (btn) {
    btn.textContent = `📦 Bestellen (${total} Fragen)`;
    btn.disabled    = total === 0;
  }
}

function placeRavenOrder() {
  const total = Object.values(ravenQtys).reduce((s, v) => s + v, 0);
  if (!total) return;

  if (!hasActiveQuestions()) {
    showToast("Keine aktiven Fragen! Aktiviere Kapitel unter 📚.");
    return;
  }

  closeModal("modal-raven");
  const snapshot = { ...ravenQtys };
  askQuestions("🪶 Raben-Bestellung", total,
    () => {
      for (const [key, qty] of Object.entries(snapshot)) {
        if (!qty) continue;
        if (key.startsWith("seed_")) {
          const plantId = key.slice(5);
          G.ravenSeeds.push({ id: `rs${Date.now()}${Math.random()}`, plantId, qty, arrivesOnDay: G.currentDay + RAVEN_DELIVER_DAYS });
        } else {
          const item = RAVEN_ITEMS_CFG.find(i => i.id === key);
          G.ravenOrders.push({ id: `ro${Date.now()}${Math.random()}`, itemId: key, itemName: item ? item.name : key, qty, arrivesOnDay: G.currentDay + RAVEN_DELIVER_DAYS });
        }
      }
      ravenQtys = {};
      saveState();
      showToast(`🪶 Bestellung aufgegeben! Lieferung nach dem Schlafen.`);
    },
    null
  );
}

/* ══════════════════════════════════════════════════════════
   CHAPTERS
══════════════════════════════════════════════════════════ */
function getChapterStatus(chapterId) {
  if (isChapterComplete(chapterId)) return "green";
  const ch = G.chapters[chapterId];
  if (!ch) return "red";
  if (ch.activated) return "yellow";
  const hasProgress = Object.values(ch.questions).some(q => q.correctDays.length > 0);
  return hasProgress ? "orange" : "red";
}

function getChapterTitle(chapterId) {
  return (PACK_CONTENT.beds.find(b => b.id === chapterId) || { title: chapterId }).title;
}

function renderChapterModal() {
  const listEl = document.getElementById("chapter-list");
  if (!listEl) return;

  listEl.innerHTML = PACK_CONTENT.beds.map(bed => {
    const status = getChapterStatus(bed.id);
    const ch     = G.chapters[bed.id];
    const allQ   = bed.plants.flatMap(p => p.harvestQuestions || []);
    const mastered = allQ.filter(q => ch && isQuestionMastered(ch.questions[q.id])).length;
    const label  = { red: "Nicht gestartet", orange: "Pausiert", yellow: "Aktiv", green: "Fertig" }[status];

    return `<div class="chapter-item" data-cid="${bed.id}">
      <div class="chapter-dot chapter-dot--${status}"></div>
      <span class="chapter-item-name">${bed.title}</span>
      <span class="chapter-item-status">${mastered}/${allQ.length} · ${label}</span>
    </div>`;
  }).join("");

  listEl.querySelectorAll(".chapter-item").forEach(el => {
    el.onclick = () => {
      const id = el.dataset.cid;
      if (isChapterComplete(id)) return;
      const ch = ensureChapterState(id);
      ch.activated = !ch.activated;
      saveState();
      renderChapterModal();
      renderStats();
    };
  });
}

function showChapterCompletePopup(title) {
  const nameEl = document.getElementById("chapter-complete-name");
  if (nameEl) nameEl.textContent = title;
  openModal("modal-chapter-complete");
}

/* ══════════════════════════════════════════════════════════
   GENERIC PICKER MODAL
══════════════════════════════════════════════════════════ */
function showPickerModal(title, items, onSelect) {
  let modal = document.getElementById("modal-picker");
  if (!modal) {
    modal = document.createElement("div");
    modal.id        = "modal-picker";
    modal.className = "modal-overlay";
    modal.innerHTML = `<div class="modal-box modal-box--narrow">
      <h2 id="picker-title"></h2>
      <div id="picker-list" style="display:flex;flex-direction:column;gap:0.4rem;margin:0.5rem 0"></div>
      <button onclick="closeModal('modal-picker')" class="modal-close-btn">Abbrechen</button>
    </div>`;
    document.body.appendChild(modal);
  }
  document.getElementById("picker-title").textContent = title;
  const listEl = document.getElementById("picker-list");
  listEl.innerHTML = items.map((item, i) =>
    `<button class="quick-pick-btn" data-idx="${i}" ${item.value === null ? "disabled style='opacity:0.5'" : ""}>
      ${item.label}
      ${item.sub ? `<span style="display:block;font-size:0.72rem;color:var(--muted);margin-top:1px">${item.sub}</span>` : ""}
    </button>`
  ).join("");

  listEl.querySelectorAll(".quick-pick-btn:not([disabled])").forEach((btn, i) => {
    btn.onclick = () => onSelect(items[parseInt(btn.dataset.idx)]);
  });
  modal.hidden = false;
}

/* ══════════════════════════════════════════════════════════
   MEMORY GAME
══════════════════════════════════════════════════════════ */
let memFlipped = [], memMatched = [], memLocked = false;

function initMemory() {
  memFlipped = []; memMatched = []; memLocked = false;

  const allPlants = PACK_CONTENT.beds.flatMap(b =>
    b.plants.map(p => ({ ...p, chapterId: b.id }))
  );
  const seenPlants = allPlants.filter(p => {
    const ch = G.chapters[p.chapterId];
    return ch && Object.values(ch.questions).some(q => q.correctDays.length > 0);
  });

  if (seenPlants.length < 2) {
    document.getElementById("memory-board").innerHTML =
      `<p class="muted" style="font-size:0.85rem">Beantworte zuerst ein paar Fragen.</p>`;
    return;
  }

  const pairs = seenPlants.slice(0, 8);
  const cards = [...pairs, ...pairs].sort(() => Math.random() - 0.5);
  document.getElementById("memory-stats").textContent = `${pairs.length} Paare`;
  document.getElementById("memory-done").hidden = true;
  G.stats.memoryRoundsPlayed++;

  const board = document.getElementById("memory-board");
  board.innerHTML = cards.map((p, i) =>
    `<div class="memory-card" data-i="${i}" data-pid="${p.id}"
      style="aspect-ratio:1;background:var(--bg2);border:1px solid var(--line);border-radius:8px;
      display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:0.68rem;
      text-align:center;padding:0.3rem;min-height:60px;color:transparent;transition:color 0.2s,background 0.2s">
      ${p.title}
    </div>`
  ).join("");

  board.querySelectorAll(".memory-card").forEach(c => { c.onclick = () => flipMemCard(c); });
  saveState();
}

function flipMemCard(card) {
  if (memLocked || card.style.color !== "transparent") return;
  const i = parseInt(card.dataset.i);
  if (memFlipped.includes(i)) return;
  card.style.color      = "var(--text)";
  card.style.background = "var(--bg3)";
  memFlipped.push(i);
  if (memFlipped.length < 2) return;

  memLocked = true;
  const allCards = document.querySelectorAll(".memory-card");
  const [a, b]   = memFlipped.map(idx => allCards[idx]);

  if (a.dataset.pid === b.dataset.pid) {
    [a, b].forEach(c => { c.style.background = "rgba(39,174,96,0.2)"; c.style.borderColor = "#27ae60"; });
    memMatched.push(...memFlipped);
    memFlipped = []; memLocked = false;
    G.stats.memoryPairsMatched++;
    if (memMatched.length === allCards.length) {
      document.getElementById("memory-done").hidden = false;
      document.getElementById("memory-done").textContent = "🎉 Alle Paare gefunden!";
    }
    saveState();
  } else {
    setTimeout(() => {
      [a, b].forEach(c => { c.style.color = "transparent"; c.style.background = "var(--bg2)"; });
      memFlipped = []; memLocked = false;
    }, 900);
  }
}

/* ══════════════════════════════════════════════════════════
   LABEL EXERCISES (Beschriften)
══════════════════════════════════════════════════════════ */
function escapeHtmlText(v) {
  return String(v || "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

let labelPracticeSession = null;

function renderLabelPicker() {
  const picker = document.getElementById("label-practice-picker");
  const area   = document.getElementById("label-practice-area");
  if (!picker) return;
  if (area) area.innerHTML = "";
  labelPracticeSession = null;
  const exercises = PACK_CONTENT.labelExercises || [];
  if (!exercises.length) { picker.innerHTML = `<p class="muted">Keine Übungen verfügbar.</p>`; return; }
  picker.innerHTML = exercises.map(ex =>
    `<button class="label-chip" data-ex-id="${escapeHtmlText(ex.id)}">🏷️ ${escapeHtmlText(ex.title)}</button>`
  ).join("");
  picker.querySelectorAll("[data-ex-id]").forEach(btn => {
    btn.addEventListener("click", () => startLabelExercise(btn.getAttribute("data-ex-id")));
  });
}

function startLabelExercise(exId) {
  const ex = (PACK_CONTENT.labelExercises || []).find(e => e.id === exId);
  if (!ex) return;
  labelPracticeSession = { ex, placed: {}, selectedLabel: null, result: null };
  renderLabelExercise();
}

function renderLabelExercise() {
  if (!labelPracticeSession) return;
  const { ex, placed, selectedLabel, result } = labelPracticeSession;
  const area = document.getElementById("label-practice-area");
  if (!area) return;

  const usedLabels  = Object.values(placed).filter(Boolean);
  const poolLabels  = ex.zones.map(z => z.label).filter(l => !usedLabels.includes(l));

  const zoneHtml = ex.zones.map(z => {
    const filled = placed[z.id];
    return `<div class="label-zone${filled ? " has-label" : ""}${selectedLabel ? " targeted" : ""}"
      data-zone-id="${escapeHtmlText(z.id)}"
      style="left:${z.left}%;top:${z.top}%;width:${z.width}%;height:${z.height}%">
      ${filled ? `<span class="label-zone-text">${escapeHtmlText(filled)}</span>` : ""}
    </div>`;
  }).join("");

  const chipHtml = poolLabels.map(l => {
    const sel = selectedLabel === l ? " selected" : "";
    return `<button class="label-chip${sel}" data-label="${escapeHtmlText(l)}">${escapeHtmlText(l)}</button>`;
  }).join("");

  const resultHtml = result
    ? `<div style="margin-top:0.4rem;padding:0.5rem 0.8rem;border-radius:6px;font-size:0.85rem;
        background:${result.ok ? "rgba(39,174,96,0.2)" : "rgba(192,57,43,0.2)"};
        border:1px solid ${result.ok ? "#27ae60" : "#c0392b"};
        color:${result.ok ? "#7eda9c" : "#e07070"}">${escapeHtmlText(result.text)}</div>`
    : "";

  const diagramContent = ex.diagramType === "image"
    ? `<img src="${ex.imagePath}" alt="${escapeHtmlText(ex.title)}" style="display:block;width:100%;height:auto">`
    : (ex.svgContent || "");

  const ratio = ex.aspectRatio || "5/4";
  const [rw, rh] = ratio.split("/").map(Number);

  area.innerHTML = `
    <div style="margin-bottom:0.4rem">
      <button id="label-back-btn" class="modal-close-btn" style="font-size:0.8rem;padding:0.25rem 0.6rem">← Zurück</button>
    </div>
    <div style="font-size:0.82rem;margin-bottom:0.3rem;color:var(--muted)">🏷️ ${escapeHtmlText(ex.title)} — Beschrifte die Strukturen:</div>
    <div class="label-diagram-wrapper" style="width:min(100%,calc(48vh * ${rw} / ${rh}))">${diagramContent}${zoneHtml}</div>
    <div class="label-pool">${chipHtml || "<span class='muted' style='font-size:0.82rem'>Alle Labels platziert ✓</span>"}</div>
    ${resultHtml}
    <div style="display:flex;gap:0.5rem;margin-top:0.5rem">
      <button id="label-submit-btn" style="flex:1;font-size:0.85rem">Auswerten (${Math.round((ex.passRate || 0.6) * 100)}% nötig)</button>
      <button id="label-retry-btn" style="flex:1;font-size:0.85rem;opacity:0.7">🔄 Neu</button>
    </div>`;

  area.querySelectorAll(".label-zone").forEach(zone => {
    zone.addEventListener("click", () => {
      const zid = zone.getAttribute("data-zone-id");
      if (labelPracticeSession.selectedLabel) {
        labelPracticeSession.placed[zid] = labelPracticeSession.selectedLabel;
        labelPracticeSession.selectedLabel = null;
      } else if (labelPracticeSession.placed[zid]) {
        labelPracticeSession.selectedLabel = labelPracticeSession.placed[zid];
        delete labelPracticeSession.placed[zid];
      }
      labelPracticeSession.result = null;
      renderLabelExercise();
    });
  });

  area.querySelectorAll(".label-chip[data-label]").forEach(chip => {
    chip.addEventListener("click", () => {
      const l = chip.getAttribute("data-label");
      labelPracticeSession.selectedLabel = labelPracticeSession.selectedLabel === l ? null : l;
      renderLabelExercise();
    });
  });

  document.getElementById("label-submit-btn")?.addEventListener("click", () => {
    const { ex, placed } = labelPracticeSession;
    let correct = 0;
    ex.zones.forEach(z => { if ((placed[z.id] || "") === z.label) correct++; });
    const ok  = correct / ex.zones.length >= (ex.passRate || 0.6);
    const pct = Math.round((correct / ex.zones.length) * 100);
    labelPracticeSession.result = {
      ok,
      text: `${correct}/${ex.zones.length} Strukturen richtig (${pct}%)${ok ? " — geschafft! 🌿" : " — versuch's nochmal"}`
    };
    renderLabelExercise();
  });

  document.getElementById("label-retry-btn")?.addEventListener("click", () => {
    labelPracticeSession.placed = {};
    labelPracticeSession.selectedLabel = null;
    labelPracticeSession.result = null;
    renderLabelExercise();
  });

  document.getElementById("label-back-btn")?.addEventListener("click", () => renderLabelPicker());
}

/* ══════════════════════════════════════════════════════════
   TROPHIES
══════════════════════════════════════════════════════════ */
const TROPHY_DEFS = [
  { id: "first_q",     title: "Erste Frage",    desc: "1 Frage beantwortet",          check: s => s.totalQuestionsAnswered >= 1 },
  { id: "q_10",        title: "10 Fragen",       desc: "10 Fragen beantwortet",         check: s => s.totalQuestionsAnswered >= 10 },
  { id: "q_50",        title: "50 Fragen",       desc: "50 Fragen beantwortet",         check: s => s.totalQuestionsAnswered >= 50 },
  { id: "q_100",       title: "100 Fragen",      desc: "100 Fragen beantwortet",        check: s => s.totalQuestionsAnswered >= 100 },
  { id: "first_harv",  title: "Erste Ernte",     desc: "Erste Pflanze geerntet",        check: s => s.totalHarvests >= 1 },
  { id: "day_5",       title: "5 Tage",          desc: "5 Tage gespielt",               check: s => s.daysPlayed >= 5 },
  { id: "day_30",      title: "Ein Monat",       desc: "30 Tage gespielt",              check: s => s.daysPlayed >= 30 },
  { id: "mem_5",       title: "Memory-Fan",      desc: "5 Memory-Runden gespielt",      check: s => s.memoryRoundsPlayed >= 5 },
];

function checkTrophies() {
  TROPHY_DEFS.forEach(t => {
    if (!G.stats.unlockedAchievements.includes(t.id) && t.check(G.stats)) {
      G.stats.unlockedAchievements.push(t.id);
      G.stats.achievementDates[t.id] = G.currentDay;
      showToast(`🏆 ${t.title}!`);
    }
  });
}

function renderTrophies() {
  const el = document.getElementById("trophy-list");
  if (!el) return;
  el.innerHTML = TROPHY_DEFS.map(t => {
    const u = G.stats.unlockedAchievements.includes(t.id);
    return `<div style="display:flex;align-items:center;gap:0.7rem;padding:0.5rem 0;border-bottom:1px solid var(--line);opacity:${u ? 1 : 0.35}">
      <span style="font-size:1.3rem">${u ? "🏆" : "🔒"}</span>
      <div><strong style="font-size:0.88rem">${t.title}</strong><div style="font-size:0.78rem;color:var(--muted)">${t.desc}</div></div>
    </div>`;
  }).join("");
}

/* ══════════════════════════════════════════════════════════
   SETTINGS
══════════════════════════════════════════════════════════ */
function renderSettings() {
  const v = document.getElementById("settings-version");
  if (v) v.textContent = `v${APP_VERSION}`;
  const d = document.getElementById("dev-mode-btn");
  if (d) d.textContent = `Dev-Modus: ${G.settings.devMode ? "An" : "Aus"}`;
}

function exportSave() {
  const blob = new Blob([JSON.stringify(G, null, 2)], { type: "application/json" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `kg_v2_save_${G.currentDay}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importSave(file) {
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.version !== SAVE_VERSION) { alert("Inkompatible Datei (falsche Version)."); return; }
      G = normalizeState(data);
      saveState();
      renderAll();
      closeModal("modal-settings");
      showToast("Spielstand geladen!");
    } catch { alert("Fehler beim Laden."); }
  };
  reader.readAsText(file);
}

/* ══════════════════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════════════════ */
let toastTimer = null;
function showToast(msg) {
  let toast = document.getElementById("kg-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "kg-toast";
    toast.style.cssText = "position:fixed;bottom:72px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.88);color:#fff;padding:0.45rem 1rem;border-radius:20px;font-size:0.85rem;z-index:9999;transition:opacity 0.3s;pointer-events:none;max-width:88vw;text-align:center;white-space:pre-wrap";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = "1";
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.style.opacity = "0"; }, 2500);
}

/* ══════════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════════ */
function findPlant(plantId) {
  for (const bed of PACK_CONTENT.beds)
    for (const p of bed.plants)
      if (p.id === plantId) return p;
  return null;
}

function findChapterForPlant(plantId) {
  for (const bed of PACK_CONTENT.beds)
    for (const p of bed.plants)
      if (p.id === plantId) return bed.id;
  return null;
}

/* ══════════════════════════════════════════════════════════
   RENDER ALL
══════════════════════════════════════════════════════════ */
function renderAll() {
  renderStats();
  updateDayInfo();
  renderGarden();
  updateRestaurantUI();
}

/* ══════════════════════════════════════════════════════════
   BOOT
══════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  G = loadState();
  requestAnimationFrame(() => scrollToScreen("screen-restaurant"));
  renderAll();

  // Bottom nav
  document.getElementById("btn-chapters")?.addEventListener("click", () => { renderChapterModal(); openModal("modal-chapters"); });
  document.getElementById("btn-trophies")?.addEventListener("click", () => { renderTrophies(); openModal("modal-trophies"); });
  document.getElementById("btn-memory")?.addEventListener("click",   () => { initMemory(); renderLabelPicker(); openModal("modal-memory"); });
  document.getElementById("btn-settings")?.addEventListener("click", () => { renderSettings(); openModal("modal-settings"); });

  // Restaurant controls
  document.getElementById("btn-open-restaurant")?.addEventListener("click", openRestaurant);
  document.getElementById("btn-last-call")?.addEventListener("click",       doLastCall);
  document.getElementById("btn-sleep")?.addEventListener("click",           doSleep);
  document.getElementById("btn-raven")?.addEventListener("click",   () => { renderRavenModal(); openModal("modal-raven"); });
  document.getElementById("btn-kitchen")?.addEventListener("click", () => { renderKitchen(); openModal("modal-kitchen"); });

  // Chapter complete popup
  document.getElementById("chapter-complete-no-btn")?.addEventListener("click",  () => closeModal("modal-chapter-complete"));
  document.getElementById("chapter-complete-yes-btn")?.addEventListener("click", () => {
    closeModal("modal-chapter-complete");
    renderChapterModal();
    openModal("modal-chapters");
  });

  // Close buttons
  [
    ["close-chapters-btn", "modal-chapters"],
    ["close-trophies-btn", "modal-trophies"],
    ["close-memory-btn",   "modal-memory"],
    ["close-settings-btn", "modal-settings"],
    ["close-raven-btn",    "modal-raven"],
    ["close-kitchen-btn",  "modal-kitchen"],
  ].forEach(([btnId, modalId]) => document.getElementById(btnId)?.addEventListener("click", () => closeModal(modalId)));

  // Settings
  document.getElementById("dev-mode-btn")?.addEventListener("click", () => {
    G.settings.devMode = !G.settings.devMode;
    saveState(); renderSettings();
  });
  document.getElementById("save-btn")?.addEventListener("click",   () => { saveState(); showToast("Gespeichert!"); });
  document.getElementById("export-btn")?.addEventListener("click", exportSave);
  document.getElementById("import-btn")?.addEventListener("click", () => document.getElementById("import-file-input")?.click());
  document.getElementById("import-file-input")?.addEventListener("change", e => { if (e.target.files[0]) importSave(e.target.files[0]); });
  document.getElementById("reset-btn")?.addEventListener("click", () => {
    if (confirm("Spielstand wirklich löschen?")) {
      localStorage.removeItem(SAVE_KEY); G = defaultState(); saveState(); renderAll(); closeModal("modal-settings"); showToast("Zurückgesetzt.");
    }
  });
  document.getElementById("changelog-btn")?.addEventListener("click", () => {
    alert(`Knowledge Garden v${APP_VERSION}\n\nNeues Design: Fantasy-Management-Spiel\n• Garten: Pflanzen anbauen & ernten\n• Wildnis: Zutaten sammeln\n• Restaurant: Gäste bewirten\n• Raben-Lieferungen bestellen\n• Kapitel aktivieren & meistern`);
  });
  document.getElementById("update-btn")?.addEventListener("click",        () => openModal("modal-update"));
  document.getElementById("update-cancel-btn")?.addEventListener("click", () => closeModal("modal-update"));

  // Memory tabs
  document.querySelectorAll("[data-mem-tab]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-mem-tab]").forEach(b => b.classList.remove("tab-btn--active"));
      btn.classList.add("tab-btn--active");
      const tab = btn.dataset.memTab;
      document.getElementById("mem-panel-memory").hidden = tab !== "memory";
      document.getElementById("mem-panel-label").hidden  = tab !== "label";
    });
  });
  document.getElementById("memory-new-round-btn")?.addEventListener("click", initMemory);

  // Esc closes top modal
  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    const open = document.querySelector(".modal-overlay:not([hidden])");
    if (open) open.hidden = true;
  });
});
