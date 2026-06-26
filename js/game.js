'use strict';

/* ══════════════════════════════════════════════════════════
   CONSTANTS & CONFIG
══════════════════════════════════════════════════════════ */
const APP_VERSION    = "2.0.0";
const SAVE_KEY       = "kg_v2";
const SAVE_VERSION   = 1;
const EXAM_DEADLINE  = new Date("2026-12-01").getTime();
const DAILY_GOAL     = 3;

const GARDEN_PATCHES   = 18;
const PLANT_GROW_DAYS  = 2;
const RAVEN_DELIVER_DAYS   = 1;

// Food crops grown in the garden — each harvest yields the per-crop yield
const CROP_YIELD = 20;
function cropStages(prefix) {
  return [1,2,3,4].map(n => `assets/images/${prefix}_${n}.png`);
}

const FOOD_CROPS = [
  { id: "wheat",    name: "Weizen",     emoji: "🌾", ingredient: "wheat",       stages: cropStages("wheat"),    spriteCount: 3, yield: 25 },
  { id: "tomato",   name: "Tomate",     emoji: "🍅", ingredient: "tomato",      stages: cropStages("tomatoes"),                  yield: 25 },
  { id: "mushroom", name: "Pilze",      emoji: "🍄", ingredient: "mushrooms",   stages: cropStages("mushr")    },
  { id: "pepper",   name: "Paprika",    emoji: "🫑", ingredient: "bell_pepper", stages: cropStages("paprika")  },
  { id: "basil",    name: "Basilikum",  emoji: "🌿", ingredient: "basil",       stages: cropStages("basil")    },
  { id: "olive",    name: "Oliven",     emoji: "🫒", ingredient: "olives",      stages: cropStages("olives")   },
  { id: "onion",    name: "Zwiebel",    emoji: "🧅", ingredient: "onion",       stages: cropStages("onion")    },
  { id: "garlic",   name: "Knoblauch",  emoji: "🧄", ingredient: "garlic",      stages: cropStages("garlic")   },
];


// Drinks — only entries with table sprites; ordered via raven
const DRINKS = [
  { id: "wine", name: "Wein", emoji: "🍷", needsGlass: "wine", batch: 4,
    orderHtml: '<span class="drink-order-bottle">🍾</span>', tableImg: "assets/images/wine_full.png" },
  { id: "beer", name: "Bier", emoji: "🍺", needsGlass: "beer", batch: 4,
    orderHtml: '<span class="drink-order-keg">🛢️</span>',   tableImg: "assets/images/beer_full.png" },
];

// Dishware — ordered via raven in batches of 5
const DISHWARE_CFG = [
  { id: "plates",      name: "Teller",      emoji: "🍽️", batch: 15,
    cleanImg: "assets/images/clean plate.png", dirtyImg: "assets/images/dirt.png", dirtyIsOverlay: true },
  { id: "wineGlasses", name: "Weingläser",  emoji: "🍷", batch: 15,
    cleanImg: "assets/images/wine_clean.png", dirtyImg: "assets/images/wine_dirty.png" },
  { id: "beerGlasses", name: "Biergläser",  emoji: "🍺", batch: 15,
    cleanImg: "assets/images/beer_clean.png", dirtyImg: "assets/images/beer.png" },
];

// Raven animal products + drinks (all orderable via raven)
const RAVEN_ITEMS_CFG = [
  { id: "mozzarella", name: "Mozzarella", emoji: "🧀", batch: 20 },
  { id: "salami",     name: "Salami",     emoji: "🥩", batch: 20 },
  { id: "ham",        name: "Schinken",   emoji: "🍖", batch: 20 },
  { id: "anchovies",  name: "Sardellen",  emoji: "🐟", batch: 20 },
  { id: "eggs",       name: "Eier",       emoji: "🥚", batch: 20 },
  ...DRINKS.filter(d => !d.alwaysAvailable),
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
  // Drinks (bottles in inventory)
  { id: "wine",  name: "Wein",  emoji: "🍾", source: "raven" },
  { id: "beer",  name: "Bier",  emoji: "🛢️", source: "raven" },
];


// Restaurant: 4×2-seat + 2×4-seat tables (positions as % of scene)
const TABLE_CFG = [
  { id: "t1", seats: 2, x: 45, y: 45, img: "assets/images/table_rect.png" },
  { id: "t2", seats: 2, x: 65, y: 34, img: "assets/images/table_rect.png" },
  { id: "t3", seats: 2, x: 45, y: 67, img: "assets/images/table_rect.png" },
  { id: "t4", seats: 2, x: 65, y: 56, img: "assets/images/table_rect.png" },
  { id: "t5", seats: 2, x: 45, y: 89, img: "assets/images/table_rect.png" },
  { id: "t6", seats: 2, x: 65, y: 78, img: "assets/images/table_rect.png" },
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
    settings:   {},
    currentDay: 1,
    phase:      "timeless",

    chapters: {},

    garden: {
      patches: Array(GARDEN_PATCHES).fill(null),
    },

    inventory: {},

    ravenOrders: [],
    ravenSeeds:  [],

    tutorial: { step: 0, completed: false },

    supplies: {
      plates:      { clean: 0, dirty: 0 },
      wineGlasses: { clean: 0, dirty: 0 },
      beerGlasses: { clean: 0, dirty: 0 },
      soapCharges: 20,
    },

    restaurant: {
      isOpen:        false,
      lastCallFired: false,
      patrons:       [],
      recipes:       [{ id: "basic", name: "Basic Pizza", toppings: [], active: true, deletable: false, orderedCount: 0 }],
      sessionStats:    { veryHappy: 0, happy: 0, neutral: 0, sad: 0 },
      totalStats:      { veryHappy: 0, happy: 0, neutral: 0, sad: 0 },
      sessionCorrect:  0,
      sessionAnswered: 0,
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
      dailyAnswered:         0,
      learnedLog:            {},
      activityLog:           {},
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
  const d      = defaultState();
  s.currentDay = s.currentDay ?? d.currentDay;
  s.phase      = s.phase      ?? d.phase;
  s.settings   = Object.assign({}, d.settings,    s.settings  || {});
  s.stats      = Object.assign({}, d.stats,        s.stats     || {});
  s.stats.activityLog = s.stats.activityLog || {};
  s.stats.learnedLog  = s.stats.learnedLog  || {};
  s.restaurant = Object.assign({}, d.restaurant,   s.restaurant || {});
  s.restaurant.patrons         = [];
  s.restaurant.sessionStats    = { veryHappy: 0, happy: 0, neutral: 0, sad: 0 };
  s.restaurant.totalStats      = Object.assign({ veryHappy: 0, happy: 0, neutral: 0, sad: 0 }, s.restaurant.totalStats || {});
  s.restaurant.sessionCorrect  = 0;
  s.restaurant.sessionAnswered = 0;
  // Skip tutorial for existing saves that never had tutorial data
  const isExistingPlayer = !s.tutorial && (s.currentDay > 1 || (s.stats && s.stats.totalQuestionsAnswered > 0));
  s.tutorial    = Object.assign({ step: 0, completed: isExistingPlayer }, s.tutorial || {});
  s.chapters    = s.chapters    || {};
  s.inventory   = s.inventory   || {};
  s.ravenOrders = s.ravenOrders || [];
  s.ravenSeeds  = s.ravenSeeds  || [];
  const ds = (defaultState()).supplies;
  if (!s.supplies) s.supplies = ds;
  else {
    s.supplies.plates      = Object.assign({}, ds.plates,      s.supplies.plates      || {});
    s.supplies.wineGlasses = Object.assign({}, ds.wineGlasses, s.supplies.wineGlasses || {});
    s.supplies.beerGlasses = Object.assign({}, ds.beerGlasses, s.supplies.beerGlasses || {});
    if (s.supplies.soapCharges === undefined) s.supplies.soapCharges = ds.soapCharges;
  }
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
  } else if (s.garden.beds) {
    // Migrate old bed-based layout to flat patches
    const flat = [];
    for (const bed of s.garden.beds) for (const slot of (bed.slots || [])) flat.push(slot);
    s.garden.patches = flat.slice(0, GARDEN_PATCHES);
    while (s.garden.patches.length < GARDEN_PATCHES) s.garden.patches.push(null);
    delete s.garden.beds;
  } else {
    if (!s.garden.patches) s.garden.patches = d.garden.patches;
    s.garden.patches = s.garden.patches.slice(0, GARDEN_PATCHES);
    while (s.garden.patches.length < GARDEN_PATCHES) s.garden.patches.push(null);
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
  return qs && new Set(qs.correctDays).size >= 3;
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

  const unseen   = pool.filter(e => !e.state || e.state.correctDays.length === 0);
  if (unseen.length) return unseen[Math.floor(Math.random() * unseen.length)];

  const once     = pool.filter(e => e.state && e.state.correctDays.length === 1);
  if (once.length) return once[Math.floor(Math.random() * once.length)];

  const twice    = pool.filter(e => e.state && e.state.correctDays.length === 2);
  if (twice.length) return twice[Math.floor(Math.random() * twice.length)];

  return pool[Math.floor(Math.random() * pool.length)];
}

function recordAnswer(chapterId, questionId, correct) {
  const qs = ensureQuestionState(chapterId, questionId);
  const today = new Date().toISOString().slice(0, 10);

  G.stats.totalQuestionsAnswered++;
  if (!G.stats.firstPlayDate) G.stats.firstPlayDate = Date.now();

  // Daily tracking
  if (G.stats.dailyDate !== today) {
    G.stats.dailyDate     = today;
    G.stats.dailyCorrect  = 0;
    G.stats.dailyAnswered = 0;
  }
  G.stats.dailyAnswered = (G.stats.dailyAnswered || 0) + 1;
  G.restaurant.sessionAnswered = (G.restaurant.sessionAnswered || 0) + 1;
  G.stats.activityLog = G.stats.activityLog || {};
  G.stats.activityLog[today] = (G.stats.activityLog[today] || 0) + 1;

  if (correct) {
    G.stats.totalCorrect++;
    G.restaurant.sessionCorrect = (G.restaurant.sessionCorrect || 0) + 1;
    const firstTimeToday = !qs.correctDays.includes(G.currentDay);
    if (firstTimeToday) {
      G.stats.dailyCorrect++;
      qs.correctDays.push(G.currentDay);
      G.stats.learnedLog = G.stats.learnedLog || {};
      G.stats.learnedLog[today] = (G.stats.learnedLog[today] || 0) + 1;
      // Update streak when daily goal is first reached today
      if (G.stats.dailyCorrect === DAILY_GOAL && G.stats.lastStreakDate !== today) {
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        G.stats.streak = (G.stats.lastStreakDate === yesterday) ? (G.stats.streak || 0) + 1 : 1;
        G.stats.lastStreakDate = today;
        if (G.stats.streak > (G.stats.bestStreak || 0)) G.stats.bestStreak = G.stats.streak;
      }
    }
    qs.wrongThisSession = false;
    sessionWrongQueue = sessionWrongQueue.filter(e => !(e.chapterId === chapterId && e.questionId === questionId));
    checkChapterCompletion(chapterId);
  } else {
    qs.wrongThisSession    = true;
    qs.nextAvailableDay    = G.currentDay + 1;
    if (!sessionWrongQueue.find(e => e.chapterId === chapterId && e.questionId === questionId))
      sessionWrongQueue.push({ chapterId, questionId });
  }
  checkTrophies();
  renderStats();
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
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

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

    const btnEls = shuffleArray(q.options || []).map(opt => {
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
    shuffleArray(q.options || []).forEach(opt => {
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
    btn.classList.remove("question-option-btn--selected");
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

/* ══════════════════════════════════════════════════════════
   MODAL HELPERS
══════════════════════════════════════════════════════════ */
function openModal(id)  { const e = document.getElementById(id); if (e) e.hidden = false; }
function closeModal(id) { const e = document.getElementById(id); if (e) e.hidden = true;  }
// Expose on window so inline onclick attributes can call them
window.openModal  = openModal;
window.closeModal = closeModal;

const SCREEN_ORDER = ["screen-garden", "screen-restaurant", "screen-cleaning"];

function scrollToScreen(screenId) {
  const container = document.getElementById("screen-container");
  if (!container) return;
  const idx = SCREEN_ORDER.indexOf(screenId);
  if (idx < 0) return;
  container.scrollTo({ left: idx * window.innerWidth, behavior: "instant" });
}
window.scrollToScreen = scrollToScreen;

/* ══════════════════════════════════════════════════════════
   GARDEN
══════════════════════════════════════════════════════════ */

function getCropYield(crop) {
  return crop?.yield || CROP_YIELD;
}

function renderGarden() {
  const grid = document.getElementById("garden-grid");
  if (!grid) return;
  grid.innerHTML = "";

  const patchesEl = document.createElement("div");
  patchesEl.className = "garden-patches";

  G.garden.patches.forEach((slot, patchIdx) => {
    const slotEl = document.createElement("div");

    if (!slot) {
      slotEl.className = "garden-slot garden-slot--empty";
      slotEl.innerHTML = `<span class="slot-add-icon">＋</span>`;
      slotEl.onclick = () => openSeedPicker(patchIdx);
    } else {
      const crop      = FOOD_CROPS.find(c => c.id === slot.plantId);
      const daysGrown = G.currentDay - slot.plantedDay;
      const daysLeft  = Math.max(0, PLANT_GROW_DAYS - daysGrown);
      const ready     = daysLeft === 0;
      const watered   = slot.wateredToday === G.currentDay;

      const stage = ready ? 3 : Math.min(daysGrown, 2);
      const STAGE_EMOJI = ["🫘", "🌱", "🌿", crop ? crop.emoji : "🌾"];
      const emoji = STAGE_EMOJI[stage];

      slotEl.className = `garden-slot garden-slot--planted${ready ? " garden-slot--ready" : ""}${watered ? " garden-slot--watered" : ""}`;

      const cropsDiv = document.createElement("div");
      cropsDiv.className = "slot-crops";

      if (crop && crop.stages) {
        const spriteCount  = crop.spriteCount || 1;
        const remaining    = ready ? spriteCount - (slot.harvestedCount || 0) : spriteCount;
        for (let p = 0; p < remaining; p++) {
          const img = document.createElement("img");
          img.src = crop.stages[stage];
          img.className = `slot-crop-sprite slot-crop--s${stage}`;
          img.draggable = false;
          if (ready) img.onclick = (e) => { e.stopPropagation(); harvestOnePlant(patchIdx); };
          cropsDiv.appendChild(img);
        }
      } else {
        const span = document.createElement("span");
        span.className = `slot-crop slot-crop--s${stage}`;
        span.textContent = emoji;
        if (ready) span.onclick = (e) => { e.stopPropagation(); harvestOnePlant(patchIdx); };
        cropsDiv.appendChild(span);
      }

      const nameEl = document.createElement("div");
      nameEl.className = "slot-name";
      nameEl.textContent = slot.plantTitle || slot.plantId;

      const statusEl = document.createElement("div");
      statusEl.className = `slot-status${ready ? " slot-status--ready" : ""}`;
      statusEl.textContent = ready ? "✨ Reif!" : (watered ? `💧 ${daysLeft}T` : `🏜️ ${daysLeft}T`);

      slotEl.appendChild(cropsDiv);
      slotEl.appendChild(nameEl);
      slotEl.appendChild(statusEl);

      if (!ready) slotEl.onclick = () => openSlotActions(patchIdx, ready, watered);
    }
    patchesEl.appendChild(slotEl);
  });

  grid.appendChild(patchesEl);
}

function openSeedPicker(patchIdx) {
  const available = FOOD_CROPS.filter(c => (G.inventory[`seed_${c.id}`] || 0) > 0);
  if (!available.length) {
    showToast("Keine Samen! Bestelle Samen per 🪶 Raben-Lieferung.");
    return;
  }
  showPickerModal("Pflanze auswählen", available.map(c => ({
    label: `${c.emoji} ${c.name}`,
    sub:   `→ ${getCropYield(c)}× ${getIngredientName(c.ingredient)} | Lager: ${G.inventory[`seed_${c.id}`]}`,
    value: c,
  })), chosen => {
    closeModal("modal-picker");
    plantSeed(patchIdx, chosen.value.id, chosen.value.name);
  });
}

function getAvailableSeeds() {
  return FOOD_CROPS.filter(c => (G.inventory[`seed_${c.id}`] || 0) > 0)
    .map(c => ({ cropId: c.id, plantTitle: c.name, qty: G.inventory[`seed_${c.id}`] }));
}

function plantSeed(patchIdx, cropId, cropName) {
  G.garden.patches[patchIdx] = { plantId: cropId, plantTitle: cropName, plantedDay: G.currentDay, wateredToday: null };
  const key = `seed_${cropId}`;
  if ((G.inventory[key] || 0) > 0) G.inventory[key]--;
  if (tutorialStepId() === "plant_wheat" && cropId === "wheat") advanceTutorial("plant_wheat");
  else if (tutorialStepId() === "plant_tomato" && cropId === "tomato") advanceTutorial("plant_tomato");
  saveState();
  renderGarden();
}

function openSlotActions(patchIdx, ready, wateredToday) {
  const slot = G.garden.patches[patchIdx];
  if (!slot) return;
  const actions = [];
  if (ready)               actions.push({ label: "🌿 Ernten",                value: "harvest" });
  else if (!wateredToday)  actions.push({ label: "💧 Wässern (1 Frage)",     value: "water" });
  else                     actions.push({ label: "💧 Heute schon gewässert", value: null });
  actions.push({ label: "🗑️ Entfernen", value: "remove" });

  showPickerModal(slot.plantTitle, actions, chosen => {
    closeModal("modal-picker");
    if (chosen.value === "harvest") harvestPlant(patchIdx);
    else if (chosen.value === "water") waterPlant(patchIdx);
    else if (chosen.value === "remove") {
      G.garden.patches[patchIdx] = null;
      saveState(); renderGarden();
    }
  });
}

function waterPlant(patchIdx) {
  if (!hasActiveQuestions()) {
    showToast("Keine aktiven Fragen! Aktiviere Kapitel unter 📚.");
    return;
  }
  const entry = pickNextQuestion();
  if (!entry) { showToast("Keine Fragen verfügbar."); return; }

  showQuestion("💧 Wässern", entry,
    () => { G.garden.patches[patchIdx].wateredToday = G.currentDay; },
    () => {},
    () => {
      saveState(); renderGarden();
      if (["water_plants", "water_day3"].includes(tutorialStepId())) {
        const planted = G.garden.patches.filter(Boolean);
        const allWatered = planted.length >= 2 && planted.every(s => s.wateredToday === G.currentDay);
        if (allWatered) advanceTutorial(tutorialStepId());
      }
    }
  );
}

function harvestOnePlant(patchIdx) {
  const slot = G.garden.patches[patchIdx];
  if (!slot) return;
  const crop        = FOOD_CROPS.find(c => c.id === slot.plantId);
  const ingredient  = crop ? crop.ingredient : "wheat";
  const spriteCount = crop?.spriteCount || 1;
  const perPlant    = Math.max(1, Math.round(getCropYield(crop) / spriteCount));

  slot.harvestedCount = (slot.harvestedCount || 0) + 1;
  addInventory(ingredient, perPlant);
  G.stats.totalHarvests++;
  showToast(`${crop ? crop.emoji : "🌿"} +${perPlant} ${getIngredientName(ingredient)}`);

  if (slot.harvestedCount >= spriteCount) {
    G.garden.patches[patchIdx] = null;
  }
  saveState();
  renderGarden();
  renderRestaurantStats();
  if (tutorialStepId() === "harvest") {
    const hasWheat  = (G.inventory["wheat"]  || 0) > 0;
    const hasTomato = (G.inventory["tomato"] || 0) > 0;
    if (hasWheat && hasTomato) advanceTutorial("harvest");
  }
}

function harvestPlant(patchIdx) { harvestOnePlant(patchIdx); }

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
  advanceTutorial("open_restaurant");
  G.phase                   = "service";
  G.restaurant.isOpen       = true;
  G.restaurant.lastCallFired = false;
  G.restaurant.sessionStats   = { veryHappy: 0, happy: 0, neutral: 0, sad: 0 };
  G.restaurant.sessionCorrect = 0;
  G.restaurant.sessionAnswered = 0;
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
  G.restaurant.isOpen  = false;
  G.phase              = "timeless";
  G.restaurant.patrons = [];

  // Snapshot today's stats before advancing the day
  const ss = G.restaurant.sessionStats;
  const totalGuests  = ss.veryHappy + ss.happy + ss.neutral + ss.sad;
  const todayCorrect = G.restaurant.sessionCorrect  || 0;
  const todayTotal   = G.restaurant.sessionAnswered || 0;

  // Build stat cards
  const stats = [
    { label: "Tag",          value: `${G.currentDay}`,           cls: "" },
    { label: "Gäste",        value: `${totalGuests}`,            cls: "" },
    { label: "Fragen",       value: `${todayTotal}`,             cls: "" },
    { label: "Richtig",      value: `${todayCorrect}`,           cls: todayCorrect > 0 ? "good" : "" },
    { label: "Falsch",       value: `${todayTotal - todayCorrect}`, cls: todayTotal - todayCorrect > 0 ? "bad" : "" },
    { label: "😊 Sehr glücklich", value: `${ss.veryHappy}`, cls: ss.veryHappy > 0 ? "good" : "" },
    { label: "🙂 Glücklich",      value: `${ss.happy}`,     cls: "" },
    { label: "😐 Neutral",        value: `${ss.neutral}`,   cls: "" },
    { label: "😞 Traurig",        value: `${ss.sad}`,        cls: ss.sad > 0 ? "bad" : "" },
  ];

  const dayLabel = document.getElementById("sleep-day-label");
  const statsGrid = document.getElementById("sleep-stats-grid");
  const overlay   = document.getElementById("sleep-overlay");

  if (dayLabel)  dayLabel.textContent = `🌙 Ende von Tag ${G.currentDay}`;
  if (statsGrid) statsGrid.innerHTML  = stats.map(s => `
    <div class="sleep-stat">
      <div class="sleep-stat-label">${s.label}</div>
      <div class="sleep-stat-value ${s.cls}">${s.value}</div>
    </div>`).join("");
  if (overlay) overlay.hidden = false;

  // Tutorial: advance on sleep steps
  const sleepSteps = ["raven_ordered", "sleep_day2", "sleep_day3"];
  if (sleepSteps.includes(tutorialStepId())) advanceTutorial(tutorialStepId());

  saveState();
  updateRestaurantUI();
}

function commitNewDay() {
  const overlay = document.getElementById("sleep-overlay");
  if (overlay) overlay.hidden = true;

  G.currentDay++;
  G.stats.daysPlayed++;
  G.restaurant.sessionStats = { veryHappy: 0, happy: 0, neutral: 0, sad: 0 };

  // Process deliveries
  G.ravenOrders.filter(o => o.arrivesOnDay <= G.currentDay).forEach(o => {
    if (o.isSupply) {
      const pool = G.supplies[o.itemId];
      if (pool) pool.clean += o.qty;
    } else {
      addInventory(o.itemId, o.qty);
    }
  });
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
  const dislikableIds = [...new Set(RE_TOPPINGS.map(t => t.ingredientId))]
    .filter(id => !["mozzarella","tomato","wheat"].includes(id) && id !== craving);
  const dislikedTopping = Math.random() < 0.5 && dislikableIds.length
    ? dislikableIds[Math.floor(Math.random() * dislikableIds.length)]
    : null;
  G.restaurant.patrons.push({
    id: `p_${++rePatronIdCtr}`,
    tableId: seat.tableId,
    seatIdx: seat.seatIdx,
    spriteType: (rePatronIdCtr % 2) + 1,
    color,
    craving,
    dislikedTopping,
    drinkCraving: DRINKS[Math.floor(Math.random() * DRINKS.length)].id,
    state: "hungry",
    arrivedAt: Date.now(),
    lastPreorderAt: 0,
    preorderDrinks: [],
    servedItem: null,
    servedDrink: null,
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
  const patience = PATIENCE_MS;
  const now      = Date.now();
  G.restaurant.patrons = G.restaurant.patrons.filter(p => {
    if (p.state === "leaving") return false;
    if (p.state === "hungry" && (now - p.arrivedAt) > patience) {
      p.happiness = "sad";
      p.state     = "leaving";
      G.restaurant.sessionStats.sad++;
      G.restaurant.totalStats.sad++;
      (p.preorderDrinks || []).forEach(pd => {
        if (!pd.glass) return;
        const pool = pd.glass === "wine" ? G.supplies.wineGlasses : G.supplies.beerGlasses;
        pool.dirty++;
      });
    }
    // Lingering patron leaves after half patience if not served their post-meal drink
    if (p.state === "lingering" && (now - p.arrivedAt) > patience * 1.5) {
      if (p.postMealDrink?.glass) {
        const pool = p.postMealDrink.glass === "wine" ? G.supplies.wineGlasses : G.supplies.beerGlasses;
        pool.dirty++;
      }
      p.state = "leaving";
    }
    return true;
  });

  // Pre-order drinks: hungry patrons may order a drink while waiting (max 2, once per 15s, 40% chance)
  const PREORDER_INTERVAL = 15000;
  const PREORDER_MAX      = 2;
  G.restaurant.patrons.filter(p => p.state === "hungry").forEach(p => {
    if ((p.preorderDrinks || []).length >= PREORDER_MAX) return;
    if (now - (p.lastPreorderAt || 0) < PREORDER_INTERVAL) return;
    if (Math.random() > 0.4) return;
    const drinkId = pickDrink(p);
    if (!drinkId) return;
    const glass = deductGlass(drinkId);
    p.preorderDrinks = [...(p.preorderDrinks || []), { drinkId, glass }];
    p.lastPreorderAt = now;
  });
}

const BREAK_CHANCE = { veryHappy: 0, happy: 0.05, neutral: 0.05, sad: 0.15 };

function pickDrink(p) {
  const craved = DRINKS.find(d => d.id === p.drinkCraving);
  if (craved && (G.inventory[craved.id] || 0) > 0) {
    G.inventory[craved.id] = Math.max(0, (G.inventory[craved.id] || 0) - 1);
    return craved.id;
  }
  const any = DRINKS.find(d => (G.inventory[d.id] || 0) > 0);
  if (any) { G.inventory[any.id] = Math.max(0, (G.inventory[any.id] || 0) - 1); return any.id; }
  return null;
}

function deductGlass(drinkId) {
  const drink = DRINKS.find(d => d.id === drinkId);
  if (!drink || !drink.needsGlass) return null;
  const pool = G.supplies[drink.needsGlass === "wine" ? "wineGlasses" : "beerGlasses"];
  if (pool && pool.clean > 0) { pool.clean--; return drink.needsGlass; }
  return null;
}

function serveTable(tableId) {
  advanceTutorial("serve_patron");
  if (G.phase !== "service") return;

  // Serve lingering patrons their post-meal drink first
  const lingering = G.restaurant.patrons.filter(p => p.tableId === tableId && p.state === "lingering");
  if (lingering.length) {
    lingering.forEach(p => {
      if (p.postMealDrink?.glass) {
        const pool = p.postMealDrink.glass === "wine" ? G.supplies.wineGlasses : G.supplies.beerGlasses;
        if (Math.random() >= 0.05) pool.dirty++;
      }
      p.state = "leaving";
    });
    renderRestaurantScene();
    renderRestaurantStats();
    renderCleaningBadge();
    saveState();
    return;
  }

  const hungry = G.restaurant.patrons.filter(p => p.tableId === tableId && p.state === "hungry");
  if (!hungry.length) return;

  const servable = G.restaurant.recipes.filter(r => r.active && canServeRecipe(r));
  if (!servable.length) {
    showToast("Keine Zutaten / aktive Gerichte! Küche öffnen.");
    return;
  }

  // Check plate availability
  if (G.supplies.plates.clean < hungry.length) {
    showToast(`Zu wenig saubere Teller! (${G.supplies.plates.clean} vorhanden, ${hungry.length} nötig)`);
    return;
  }

  G.supplies.plates.clean = Math.max(0, G.supplies.plates.clean - hungry.length);

  hungry.forEach(p => {
    const current  = G.restaurant.recipes.filter(r => r.active && canServeRecipe(r));
    const tp       = RE_TOPPINGS.find(x => x.ingredientId === p.craving);
    const hatedTpIds = p.dislikedTopping
      ? RE_TOPPINGS.filter(x => x.ingredientId === p.dislikedTopping).map(x => x.id)
      : [];
    const hasHated = r => hatedTpIds.length && (r.toppings || []).some(t => hatedTpIds.includes(t.id));
    const preferred      = tp ? current.filter(r => (r.toppings || []).some(t => t.id === tp.id)) : [];
    const preferredClean = preferred.filter(r => !hasHated(r));
    const preferredDirty = preferred.filter(r =>  hasHated(r));
    const allClean       = current.filter(r => !hasHated(r));

    let recipe;
    if (preferredClean.length) {
      // Loved + no hated — always pick this
      recipe = preferredClean[Math.floor(Math.random() * preferredClean.length)];
    } else if (preferredDirty.length && allClean.length) {
      // Only loved pizzas also have hated topping — 50/50: take it or pick a clean one
      recipe = Math.random() < 0.5
        ? preferredDirty[Math.floor(Math.random() * preferredDirty.length)]
        : allClean[Math.floor(Math.random() * allClean.length)];
    } else if (preferred.length) {
      recipe = preferred[Math.floor(Math.random() * preferred.length)];
    } else {
      recipe = (allClean.length ? allClean : current)[Math.floor(Math.random() * (allClean.length || current.length))];
    }
    if (!recipe) return;

    const needed = pizzaToppingNeeds(recipe);
    Object.entries(needed).forEach(([id, qty]) => { G.inventory[id] = Math.max(0, (G.inventory[id] || 0) - qty); });
    recipe.orderedCount = (recipe.orderedCount || 0) + 1;

    p.servedItem  = recipe.id;
    p.servedDrink = pickDrink(p);
    p.usedGlass   = deductGlass(p.servedDrink);
    p.state       = "eating";
    setTimeout(() => {
      const tp         = RE_TOPPINGS.find(x => x.ingredientId === p.craving);
      const foodMatch  = tp ? (recipe.toppings || []).some(t => t.id === tp.id) : false;
      const drinkMatch = !!(p.servedDrink && p.servedDrink === p.drinkCraving);
      p.happiness = (foodMatch && drinkMatch) ? "veryHappy" : (foodMatch || drinkMatch) ? "happy" : "neutral";
      // Disliked topping penalty — drop one level, never below neutral
      if (p.dislikedTopping) {
        const hIds = RE_TOPPINGS.filter(x => x.ingredientId === p.dislikedTopping).map(x => x.id);
        if ((recipe.toppings || []).some(t => hIds.includes(t.id))) {
          if (p.happiness === "veryHappy") p.happiness = "happy";
          else if (p.happiness === "happy") p.happiness = "neutral";
        }
      }
      G.restaurant.sessionStats[p.happiness]++;
      G.restaurant.totalStats[p.happiness]++;

      // Plate dirty/broken
      const breakChance = BREAK_CHANCE[p.happiness] ?? 0.05;
      if (Math.random() >= breakChance) G.supplies.plates.dirty++;
      // Glass dirty/broken — meal glass
      if (p.usedGlass) {
        const glassPool = p.usedGlass === "wine" ? G.supplies.wineGlasses : G.supplies.beerGlasses;
        if (Math.random() >= breakChance) glassPool.dirty++;
      }
      // Pre-order glasses dirty/broken
      (p.preorderDrinks || []).forEach(pd => {
        if (!pd.glass) return;
        const pool = pd.glass === "wine" ? G.supplies.wineGlasses : G.supplies.beerGlasses;
        if (Math.random() >= breakChance) pool.dirty++;
      });

      p.state = "done";
      renderRestaurantScene();
      renderRestaurantStats();
      renderCleaningBadge();
      saveState();
      setTimeout(() => {
        // 35% chance to order one more drink after the meal
        if (Math.random() < 0.35) {
          const drinkId = pickDrink(p);
          if (drinkId) {
            const glass = deductGlass(drinkId);
            p.postMealDrink = { drinkId, glass };
            p.state = "lingering";
            renderRestaurantScene();
            renderRestaurantStats();
            saveState();
            return;
          }
        }
        p.state = "leaving";
        renderRestaurantScene();
        renderRestaurantStats();
        saveState();
      }, 2000);
    }, 5000);
  });

  saveState();
  renderRestaurantScene();
  renderRestaurantStats();
}

function pizzaToppingNeeds(r) {
  const needed = { wheat: 1, tomato: 1, mozzarella: 1 };
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
    const eating    = patrons.filter(p => p.state === "eating");

    const shadow = "drop-shadow(0 3px 6px rgba(0,0,0,0.8))";

    // One small pizza + drink per eating/done patron
    const foodHtml = patrons.filter(p => p.state === "eating" || p.state === "done").map(p => {
      const recipe   = G.restaurant.recipes.find(r => r.id === p.servedItem);
      const pizzaSide = p.seatIdx === 0 ? "left:28%" : "right:28%";
      let html = "";
      if (recipe) {
        const tops = (recipe.toppings || []).map(tp => {
          const cfg = RE_TOPPINGS.find(x => x.id === tp.id);
          return cfg ? `<img src="${cfg.img}" style="position:absolute;width:30%;left:${tp.x}%;top:${tp.y}%;pointer-events:none" draggable="false">` : "";
        }).join("");
        html += `<div style="position:absolute;width:22%;${pizzaSide};top:18%;pointer-events:none">
          <div style="position:relative;display:block">
            <img src="assets/images/Pizza/basic.png" style="width:100%;display:block" draggable="false">
            ${tops}
          </div>
        </div>`;
      }
      const drinkCfg = DRINKS.find(d => d.id === p.servedDrink);
      if (drinkCfg?.tableImg) {
        const drinkSide = p.seatIdx === 0 ? "left:38%" : "right:38%";
        html += `<img src="${drinkCfg.tableImg}" style="position:absolute;width:11%;${drinkSide};top:35%;pointer-events:none" draggable="false">`;
      }
      return html;
    }).join("");

    // Pre-order drinks for hungry patrons
    const preorderHtml = patrons.filter(p => p.state === "hungry" && (p.preorderDrinks||[]).length).map(p => {
      return (p.preorderDrinks || []).map((pd, i) => {
        const cfg = DRINKS.find(d => d.id === pd.drinkId);
        if (!cfg?.tableImg) return "";
        const side = p.seatIdx === 0 ? `left:${38 + i * 13}%` : `right:${38 + i * 13}%`;
        return `<img src="${cfg.tableImg}" style="position:absolute;width:11%;${side};top:35%;pointer-events:none" draggable="false">`;
      }).join("");
    }).join("");

    // Post-meal drink for lingering patrons
    const lingerHtml = patrons.filter(p => p.state === "lingering" && p.postMealDrink?.drinkId).map(p => {
      const cfg = DRINKS.find(d => d.id === p.postMealDrink.drinkId);
      if (!cfg?.tableImg) return "";
      const side = p.seatIdx === 0 ? "left:44%" : "right:44%";
      return `<img src="${cfg.tableImg}" style="position:absolute;width:11%;${side};top:35%;pointer-events:none;filter:drop-shadow(0 0 4px rgba(100,200,255,0.6))" draggable="false">`;
    }).join("");

    // Patron sprites — with happiness badge in "done" state
    const patronSprites = patrons.map(p => {
      const type   = p.spriteType || 1;
      const facing = p.seatIdx === 0 ? "rightfacing" : "leftfacing";
      const side   = p.seatIdx === 0 ? "left:8%" : "right:8%";
      const badge  = p.state === "done" && p.happiness
        ? `<div style="position:absolute;top:-22px;left:50%;transform:translateX(-50%);font-size:1.1rem;filter:drop-shadow(0 1px 3px rgba(0,0,0,0.9))">${happinessEmoji(p.happiness)}</div>`
        : "";
      return `<div style="position:absolute;height:45%;top:8%;${side};pointer-events:none">${badge}<img src="assets/images/patron_${type}_${facing}.png" style="height:100%;width:auto;display:block" draggable="false"></div>`;
    }).join("");

    const tableImg = G.restaurant.isOpen ? t.img : "assets/images/table_night.png";
    return `<div class="re-table" data-tid="${t.id}" style="left:${t.x}%;top:${t.y}%;width:120px">
      <div style="position:relative">
        <img src="${tableImg}" style="width:100%;display:block;filter:${shadow}" draggable="false">
        ${foodHtml}
        ${preorderHtml}
        ${lingerHtml}
        ${patronSprites}
      </div>
    </div>`;
  }).join("");

  tablesEl.querySelectorAll(".re-table").forEach(el => {
    el.onclick = () => serveTable(el.dataset.tid);
  });
}


function renderRestaurantStats() {
  const el = document.getElementById("re-stats-row");
  if (!el) return;
  const s = G.restaurant.totalStats || { veryHappy: 0, happy: 0, neutral: 0, sad: 0 };

  const items = [];
  // All ingredients and drinks with qty > 0
  Object.entries(G.inventory).forEach(([k, v]) => {
    if (k.startsWith("seed_") || v <= 0) return;
    const tp = RE_TOPPINGS.find(x => x.ingredientId === k);
    const icon = k === "wheat"
      ? `<img src="assets/images/dough.PNG" style="height:1.1em;vertical-align:middle">`
      : tp
        ? `<img src="${tp.img}" style="height:1.1em;vertical-align:middle">`
        : getIngredientEmoji(k);
    items.push(`${icon}×${v}`);
  });
  // Dishes and glasses (always show)
  const sup = G.supplies || {};
  items.push(`🍽️×${sup.plates?.clean ?? 0}`);
  items.push(`<img src="assets/images/wine_clean.png" style="height:1em;vertical-align:middle">×${sup.wineGlasses?.clean ?? 0}`);
  items.push(`<img src="assets/images/beer_clean.png" style="height:1em;vertical-align:middle">×${sup.beerGlasses?.clean ?? 0}`);

  const moodHtml   = `<span class="re-stat-mood">😊${s.veryHappy} 🙂${s.happy} 😐${s.neutral} 😞${s.sad}</span>`;
  const stockHtml  = items.length ? items.map(i => `<span class="re-stat-item">${i}</span>`).join("") : `<span class="re-stat-item muted">Lager leer</span>`;
  el.innerHTML = moodHtml + stockHtml;
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
  advanceTutorial("kitchen");
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
              onclick="reOnPizzaCanvasClick(event)"
              ontouchend="reOnPizzaCanvasClick(event)"
              ondragover="reOnPizzaDragOver(event)" ondrop="reOnPizzaDrop(event)">
              <img src="assets/images/Pizza/basic.png" class="re-pc-base" draggable="false">
              <div id="re-pc-toppings"></div>
            </div>
            <div class="re-pc-counter"><span id="re-pc-count">0</span>/${RE_PIZZA_MAX_TOPPINGS} · Zuerst Topping antippen, dann Pizza antippen</div>
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
  rePizzaCreatorState = { toppings: existing ? existing.toppings.map(t => ({ ...t })) : [], editingId: editId || null, selectedTopping: null };
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
  const sel = rePizzaCreatorState?.selectedTopping;

  palette.innerHTML = RE_TOPPINGS.map(t => {
    const stock     = G.inventory[t.ingredientId] || 0;
    const available = stock - (placed[t.id] || 0);
    const empty     = available <= 0;
    const selected  = sel === t.id;
    return `<div class="re-pc-tile${empty ? " re-pc-tile--empty" : ""}${selected ? " re-pc-tile--selected" : ""}"
        ${!empty ? `onclick="reSelectTopping('${t.id}')"` : ""}
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
           title="${tp.label} — tippen zum Entfernen" draggable="false"
           onclick="rePizzaRemoveTopping(${idx})">`
      : "";
  }).join("");
  buildPizzaPalette();
  // Update canvas hint
  const canvas = document.getElementById("re-pc-canvas");
  if (canvas) {
    canvas.style.outline = rePizzaCreatorState.selectedTopping ? "2px solid #f8c436" : "";
  }
}

function rePizzaRemoveTopping(idx) {
  if (!rePizzaCreatorState) return;
  rePizzaCreatorState.toppings.splice(idx, 1);
  reRenderPizzaCanvas();
}

function reSelectTopping(id) {
  if (!rePizzaCreatorState) return;
  rePizzaCreatorState.selectedTopping = rePizzaCreatorState.selectedTopping === id ? null : id;
  reRenderPizzaCanvas();
}

function reOnPizzaCanvasClick(event) {
  if (!rePizzaCreatorState || !rePizzaCreatorState.selectedTopping) return;
  if (rePizzaCreatorState.toppings.length >= RE_PIZZA_MAX_TOPPINGS) {
    showToast("Maximale Anzahl Toppings erreicht!");
    return;
  }
  const id = rePizzaCreatorState.selectedTopping;
  const tp = RE_TOPPINGS.find(t => t.id === id);
  if (!tp) return;
  const placed    = rePizzaCreatorState.toppings.filter(t => t.id === id).length;
  const available = (G.inventory[tp.ingredientId] || 0) - placed;
  if (available <= 0) { showToast(`${tp.label} — kein Vorrat mehr!`); return; }
  const canvas = document.getElementById("re-pc-canvas");
  if (!canvas) return;
  const rect   = canvas.getBoundingClientRect();
  const touch  = event.changedTouches ? event.changedTouches[0] : event;
  const x = Math.max(5, Math.min(95, Math.round(((touch.clientX - rect.left) / rect.width)  * 100)));
  const y = Math.max(5, Math.min(95, Math.round(((touch.clientY - rect.top)  / rect.height) * 100)));
  rePizzaCreatorState.toppings.push({ id, x, y });
  reRenderPizzaCanvas();
}

// Keep drag-and-drop as desktop fallback
function reOnDragStart(event, toppingId) {
  event.dataTransfer.setData("toppingId", toppingId);
  event.dataTransfer.effectAllowed = "copy";
}
function reOnPizzaDragOver(event) { event.preventDefault(); }
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
  const x = Math.max(5, Math.min(95, Math.round(((event.clientX - rect.left) / rect.width)  * 100)));
  const y = Math.max(5, Math.min(95, Math.round(((event.clientY - rect.top)  / rect.height) * 100)));
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
window.reSelectTopping      = reSelectTopping;
window.reOnPizzaCanvasClick = reOnPizzaCanvasClick;

/* ══════════════════════════════════════════════════════════
   RAVEN ORDERS
══════════════════════════════════════════════════════════ */
let ravenQtys = {};

function renderRavenModal() {
  advanceTutorial("raven_intro");
  const listEl = document.getElementById("raven-order-list");
  const pendEl = document.getElementById("raven-pending");
  if (!listEl) return;
  ravenQtys = {};

  let html = `<div style="font-size:0.78rem;font-weight:700;color:var(--muted);margin-bottom:0.3rem;text-transform:uppercase;letter-spacing:0.05em">🥩 Tierische Produkte (Pizza-Belag)</div>`;
  html += RAVEN_ITEMS_CFG.map(item => {
    ravenQtys[item.id] = 0;
    const iconHtml = item.orderHtml || `<span style="font-size:1rem">${item.emoji}</span>`;
    const batchNote = item.batch > 1 ? ` <span style="color:var(--muted);font-size:0.72rem">×${item.batch} / Frage</span>` : "";
    return `<div class="raven-order-item">
      ${iconHtml}
      <span class="raven-order-item-name">${item.name}${batchNote}</span>
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
      <span class="raven-order-item-name">${crop.name} <span style="color:var(--muted);font-size:0.75rem">→${getCropYield(crop)}× ${getIngredientName(crop.ingredient)}</span>${inStock ? ` <span style="color:#7fc98a;font-size:0.72rem">(${inStock} im Lager)</span>` : ""}</span>
      <button class="raven-order-qty-btn" data-key="${key}" data-d="-1">−</button>
      <span class="raven-order-qty" id="rqty-${key}">0</span>
      <button class="raven-order-qty-btn" data-key="${key}" data-d="1">+</button>
    </div>`;
  }).join("");

  html += `<div style="font-size:0.78rem;font-weight:700;color:var(--muted);margin:0.7rem 0 0.3rem;text-transform:uppercase;letter-spacing:0.05em">🍽️ Geschirr (je 5 Stück / Frage)</div>`;
  html += DISHWARE_CFG.map(dw => {
    ravenQtys[dw.id] = 0;
    const clean = G.supplies[dw.id]?.clean || 0;
    const dirty = G.supplies[dw.id]?.dirty || 0;
    const stockInfo = (clean || dirty) ? ` <span style="color:var(--muted);font-size:0.72rem">(${clean} sauber, ${dirty} schmutzig)</span>` : "";
    return `<div class="raven-order-item">
      <span style="font-size:1rem">${dw.emoji}</span>
      <span class="raven-order-item-name">${dw.name}${stockInfo}</span>
      <button class="raven-order-qty-btn" data-key="${dw.id}" data-d="-1">−</button>
      <span class="raven-order-qty" id="rqty-${dw.id}">0</span>
      <button class="raven-order-qty-btn" data-key="${dw.id}" data-d="1">+</button>
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

  // Tutorial: block order if required items are missing
  if (tutorialStepId() === "raven_order") {
    const ok = (ravenQtys["seed_wheat"]  || 0) >= 1 &&
               (ravenQtys["seed_tomato"] || 0) >= 1 &&
               (ravenQtys["mozzarella"] || 0) >= 1 &&
               (ravenQtys["plates"]     || 0) >= 1;
    if (!ok) {
      showToast("🧙 Du brauchst noch: Weizensamen, Tomatensamen, Mozzarella und Teller!");
      return;
    }
  }

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
          const dw = DISHWARE_CFG.find(d => d.id === key);
          if (dw) {
            G.ravenOrders.push({ id: `ro${Date.now()}${Math.random()}`, itemId: key, itemName: dw.name, qty: qty * dw.batch, isSupply: true, arrivesOnDay: G.currentDay + RAVEN_DELIVER_DAYS });
          } else {
            const item = RAVEN_ITEMS_CFG.find(i => i.id === key);
            const deliverQty = item?.batch ? qty * item.batch : qty;
            G.ravenOrders.push({ id: `ro${Date.now()}${Math.random()}`, itemId: key, itemName: item ? item.name : key, qty: deliverQty, arrivesOnDay: G.currentDay + RAVEN_DELIVER_DAYS });
          }
        }
      }
      ravenQtys = {};
      saveState();
      showToast(`🪶 Bestellung aufgegeben! Lieferung nach dem Schlafen.`);
      advanceTutorial("raven_order");
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
  labelPracticeSession = { ex, placed: {}, selectedLabel: null, result: null, checkedZones: {} };
  renderLabelExercise();
}

function renderLabelExercise() {
  if (!labelPracticeSession) return;
  const { ex, placed, selectedLabel, result, checkedZones } = labelPracticeSession;
  const area = document.getElementById("label-practice-area");
  if (!area) return;

  const usedLabels  = Object.values(placed).filter(Boolean);
  const poolLabels  = ex.zones.map(z => z.label).filter(l => !usedLabels.includes(l));

  const zoneHtml = ex.zones.map(z => {
    const filled = placed[z.id];
    const checked = checkedZones?.[z.id];
    const cls = [
      "label-zone",
      filled ? "has-label" : "",
      selectedLabel ? "targeted" : "",
      checked ? `zone-${checked}` : ""
    ].filter(Boolean).join(" ");
    return `<div class="${cls}"
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
    ? `<img src="${ex.imagePath}" alt="${escapeHtmlText(ex.title)}" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:fill">`
    : (ex.svgContent || "");

  const ratio = ex.aspectRatio || "5/4";
  const [rw, rh] = ratio.split("/").map(Number);

  area.innerHTML = `
    <div style="margin-bottom:0.4rem">
      <button id="label-back-btn" class="modal-close-btn" style="font-size:0.8rem;padding:0.25rem 0.6rem">← Zurück</button>
    </div>
    <div style="font-size:0.82rem;margin-bottom:0.3rem;color:var(--muted)">🏷️ ${escapeHtmlText(ex.title)} — Beschrifte die Strukturen:</div>
    <div class="label-diagram-wrapper" style="width:min(100%,calc(48vh * ${rw} / ${rh}));aspect-ratio:${rw}/${rh}">${diagramContent}${zoneHtml}</div>
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
      labelPracticeSession.checkedZones = {};
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
    const checkedZones = {};
    ex.zones.forEach(z => {
      if (placed[z.id] !== undefined) {
        const ok = placed[z.id] === z.label;
        checkedZones[z.id] = ok ? "correct" : "wrong";
        if (ok) correct++;
      }
    });
    const ok  = correct / ex.zones.length >= (ex.passRate || 0.6);
    const pct = Math.round((correct / ex.zones.length) * 100);
    labelPracticeSession.checkedZones = checkedZones;
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
    labelPracticeSession.checkedZones = {};
    renderLabelExercise();
  });

  document.getElementById("label-back-btn")?.addEventListener("click", () => renderLabelPicker());
}

/* ══════════════════════════════════════════════════════════
   TROPHIES
══════════════════════════════════════════════════════════ */
const ACHIEVEMENTS = [
  { id: 'q_1',       icon: '🌱', name: 'Erste Frage',      desc: '1 Frage beantwortet',                check: s => s.totalQuestionsAnswered >= 1 },
  { id: 'q_10',      icon: '📚', name: 'Fleißig',           desc: '10 Fragen beantwortet',              check: s => s.totalQuestionsAnswered >= 10 },
  { id: 'q_50',      icon: '📖', name: 'Wissbegierig',      desc: '50 Fragen beantwortet',              check: s => s.totalQuestionsAnswered >= 50 },
  { id: 'q_100',     icon: '💯', name: 'Hundert!',          desc: '100 Fragen beantwortet',             check: s => s.totalQuestionsAnswered >= 100 },
  { id: 'q_500',     icon: '🧠', name: 'Bücherwurm',        desc: '500 Fragen beantwortet',             check: s => s.totalQuestionsAnswered >= 500 },
  { id: 'q_1000',    icon: '⭐', name: 'Tausend!',          desc: '1000 Fragen beantwortet',            check: s => s.totalQuestionsAnswered >= 1000 },
  { id: 'h_1',       icon: '🌾', name: 'Erste Ernte',       desc: 'Erste Pflanze geerntet',             check: s => (s.totalHarvests || 0) >= 1 },
  { id: 'h_5',       icon: '🌿', name: 'Gartenarbeit',      desc: '5 Pflanzen geerntet',                check: s => (s.totalHarvests || 0) >= 5 },
  { id: 'h_10',      icon: '🪴', name: 'Grüner Daumen',     desc: '10 Pflanzen geerntet',               check: s => (s.totalHarvests || 0) >= 10 },
  { id: 's_3',       icon: '🔥', name: 'Drei Tage',         desc: '3 Tage Streak',                      check: s => (s.bestStreak || 0) >= 3 },
  { id: 's_7',       icon: '🔥', name: 'Eine Woche',        desc: '7 Tage Streak',                      check: s => (s.bestStreak || 0) >= 7 },
  { id: 's_14',      icon: '💪', name: 'Zwei Wochen',       desc: '14 Tage Streak',                     check: s => (s.bestStreak || 0) >= 14 },
  { id: 's_30',      icon: '🏆', name: 'Ein Monat',         desc: '30 Tage Streak',                     check: s => (s.bestStreak || 0) >= 30 },
  { id: 'r_open',    icon: '🍽️', name: 'Eröffnung',        desc: 'Restaurant zum ersten Mal geöffnet', check: s => (s.daysPlayed || 0) >= 1 },
  { id: 'r_serve',   icon: '🧑‍🍳', name: 'Erster Service',  desc: '10 Gäste bedient',                   check: () => { const ts = G.restaurant.totalStats || {}; return (ts.veryHappy||0)+(ts.happy||0)+(ts.neutral||0)+(ts.sad||0) >= 10; } },
  { id: 'r_master1', icon: '⭐', name: 'Küchenchef',        desc: 'Ein Kapitel vollständig gemeistert', check: () => PACK_CONTENT.beds.some(b => isChapterComplete(b.id)) },
  { id: 'mem_1',     icon: '🧘', name: 'Entspannung',       desc: 'Erste Memory-Runde gespielt',        check: s => (s.memoryRoundsPlayed || 0) >= 1 },
  { id: 'mem_25',    icon: '🍃', name: 'Gut gemerkt',       desc: '25 Paare im Memory gefunden',        check: s => (s.memoryPairsMatched || 0) >= 25 },
  { id: 'day_5',     icon: '📅', name: '5 Tage',            desc: '5 Tage gespielt',                    check: s => (s.daysPlayed || 0) >= 5 },
  { id: 'day_30',    icon: '🗓️', name: 'Ein Monat',         desc: '30 Tage gespielt',                   check: s => (s.daysPlayed || 0) >= 30 },
];

function checkTrophies() {
  ACHIEVEMENTS.forEach(t => {
    if (!G.stats.unlockedAchievements.includes(t.id) && t.check(G.stats)) {
      G.stats.unlockedAchievements.push(t.id);
      G.stats.achievementDates[t.id] = new Date().toISOString().slice(0, 10);
      showToast(`🏆 ${t.name}!`);
    }
  });
}

function renderTrophies() {
  const el = document.getElementById("trophy-list");
  if (!el) return;

  // Counter
  const totalAnswered = G.stats.totalQuestionsAnswered || 0;
  const memPairs  = G.stats.memoryPairsMatched || 0;
  const memRounds = G.stats.memoryRoundsPlayed || 0;
  const counterHtml = `<div class="trophy-counter">
    <span class="trophy-counter-num">${totalAnswered}</span>
    <span class="trophy-counter-label">Fragen beantwortet</span>
    ${memRounds > 0 ? `<div class="muted" style="font-size:0.8rem;margin-top:0.4rem">🧘 ${memPairs} Paare in ${memRounds} Runden</div>` : ''}
  </div>`;

  // 90-day activity heatmap
  const log = G.stats.activityLog || {};
  const now = Date.now();
  const heatCells = [];
  const firstDay = new Date(now - 89 * 86400000);
  const dow = (firstDay.getDay() + 6) % 7;
  for (let p = 0; p < dow; p++) heatCells.push(`<span class="hm-cell hm-empty"></span>`);
  for (let i = 89; i >= 0; i--) {
    const d = new Date(now - i * 86400000);
    const key = d.toISOString().slice(0, 10);
    const count = log[key] || 0;
    const lvl = count === 0 ? 0 : count < DAILY_GOAL ? 1 : 2;
    heatCells.push(`<span class="hm-cell hm-${lvl}" title="${d.toLocaleDateString('de-DE')}: ${count}"></span>`);
  }
  const heatmapHtml = `
    <div class="trophy-section-label">Aktivität (90 Tage)</div>
    <div class="heatmap">${heatCells.join('')}</div>
    <div class="hm-legend"><span class="hm-cell hm-0"></span> keine <span class="hm-cell hm-1"></span> wenig <span class="hm-cell hm-2"></span> Tagesziel</div>`;

  // Achievements grid
  const unlocked = G.stats.unlockedAchievements || [];
  const achHtml = `
    <div class="trophy-section-label">Errungenschaften</div>
    <div class="ach-grid">${ACHIEVEMENTS.map(a => {
      const done = unlocked.includes(a.id);
      const dateStr = done && G.stats.achievementDates?.[a.id]
        ? new Date(G.stats.achievementDates[a.id]).toLocaleDateString('de-DE')
        : '';
      return `<div class="ach-badge${done ? '' : ' ach-badge--locked'}">
        <div class="ach-icon">${done ? a.icon : '🔒'}</div>
        <div class="ach-name">${a.name}</div>
        ${done && dateStr ? `<div class="ach-date">${dateStr}</div>` : ''}
      </div>`;
    }).join('')}</div>`;

  // Chapter progress
  const { total, mastered } = getLearningProgress();
  const chapterHtml = `
    <div class="trophy-section-label">Kapitelfortschritt</div>
    ${PACK_CONTENT.beds.map(bed => {
      const ch = G.chapters[bed.id];
      const isActive = ch && ch.activated;
      if (!isActive) return `<div class="trophy-item trophy-item--locked">
        <div class="trophy-icon">🔒</div>
        <div class="trophy-info"><div class="trophy-name">${bed.title}</div>
        <div class="muted" style="font-size:.8rem">Noch nicht aktiviert</div></div>
      </div>`;
      let chTotal = 0, chMastered = 0;
      bed.plants.forEach(p => {
        [...(p.harvestQuestions||[]), ...(p.phase4Questions||[])].forEach(q => {
          chTotal++;
          if (isQuestionMastered(ch.questions[q.id])) chMastered++;
        });
      });
      const pct = chTotal > 0 ? Math.round(chMastered / chTotal * 100) : 0;
      const complete = isChapterComplete(bed.id);
      return `<div class="trophy-item${complete ? ' trophy-item--mastered' : ''}">
        <div class="trophy-icon">${complete ? '🏆' : '📖'}</div>
        <div class="trophy-info">
          <div class="trophy-name">${bed.title}</div>
          <div class="trophy-bar-wrap"><div class="trophy-bar" style="width:${pct}%"></div></div>
          <div class="muted" style="font-size:.8rem">${complete
            ? `<strong style="color:#5ada80">Gemeistert!</strong>`
            : `${chMastered}/${chTotal} gemeistert`}</div>
        </div>
      </div>`;
    }).join('')}`;

  el.innerHTML = counterHtml + heatmapHtml + achHtml + chapterHtml;
}

/* ══════════════════════════════════════════════════════════
   SETTINGS
══════════════════════════════════════════════════════════ */
function renderSettings() {
  const v = document.getElementById("settings-version");
  if (v) v.textContent = `v${APP_VERSION}`;
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
   CLEANING SCREEN
══════════════════════════════════════════════════════════ */

function totalDirty() {
  const s = G.supplies;
  return (s.plates.dirty || 0) + (s.wineGlasses.dirty || 0) + (s.beerGlasses.dirty || 0);
}

function renderCleaningBadge() {
  const badge = document.getElementById("cleaning-badge");
  const n = totalDirty();
  if (badge) { badge.textContent = n; badge.hidden = n === 0; }
}

function renderCleaningScreen() {
  const grid   = document.getElementById("cleaning-grid");
  const soapEl = document.getElementById("cleaning-soap");
  if (!grid) return;

  const { plates, wineGlasses, beerGlasses, soapCharges } = G.supplies;
  if (soapEl) soapEl.textContent = `🧼 Seife: ${soapCharges}/20`;

  const screen = document.getElementById("screen-cleaning");
  if (screen) {
    const img = soapCharges > 0 ? "sink_full.png" : "sink_empty.png";
    screen.style.background = `url('assets/images/${img}') center top / cover no-repeat`;
  }

  const needSoap = soapCharges === 0;
  const buyBtn   = document.getElementById("cleaning-buy-soap");
  if (buyBtn) buyBtn.hidden = !needSoap;

  const items = [];
  for (let i = 0; i < plates.dirty;      i++) items.push({ type: "plate", idx: i });
  for (let i = 0; i < wineGlasses.dirty; i++) items.push({ type: "wine",  idx: i });
  for (let i = 0; i < beerGlasses.dirty; i++) items.push({ type: "beer",  idx: i });

  if (!items.length) {
    const hasAny = (plates.clean + plates.dirty + wineGlasses.clean + wineGlasses.dirty + beerGlasses.clean + beerGlasses.dirty) > 0;
    grid.innerHTML = `<p class="cleaning-empty">${hasAny ? "Alles sauber! ✨" : "Kein Geschirr! Bestelle beim 🪶 Raben."}</p>`;
    return;
  }

  grid.innerHTML = items.map((item, i) => {
    const cfg = DISHWARE_CFG.find(d =>
      item.type === "plate" ? d.id === "plates" :
      item.type === "wine"  ? d.id === "wineGlasses" : d.id === "beerGlasses"
    );
    return `<div class="cleaning-item ${needSoap ? "cleaning-item--locked" : ""}" data-type="${item.type}" data-idx="${i}">
      <div class="cleaning-img-wrap">
        <img src="${cfg.cleanImg}" class="cleaning-clean-img" draggable="false">
        <canvas class="cleaning-canvas" id="ccanvas-${i}" data-type="${item.type}" data-item-idx="${i}"></canvas>
      </div>
    </div>`;
  }).join("");

  if (!needSoap) {
    items.forEach((item, i) => {
      const canvas = document.getElementById(`ccanvas-${i}`);
      if (canvas) setupCleaningCanvas(canvas, item.type, i);
    });
  }
}

function setupCleaningCanvas(canvas, type, itemIdx) {
  const cfg = DISHWARE_CFG.find(d =>
    type === "plate" ? d.id === "plates" :
    type === "wine"  ? d.id === "wineGlasses" : d.id === "beerGlasses"
  );
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.onload = () => {
    if (type !== "plate") {
      // Glasses: match canvas to the clean image's rendered size so dirty overlay aligns
      const cleanImg = canvas.closest(".cleaning-img-wrap")?.querySelector(".cleaning-clean-img");
      const rect = cleanImg ? cleanImg.getBoundingClientRect() : null;
      if (rect && rect.width > 0) {
        canvas.width  = Math.round(rect.width);
        canvas.height = Math.round(rect.height);
        canvas.style.width  = rect.width  + "px";
        canvas.style.height = rect.height + "px";
      } else {
        canvas.width  = img.naturalWidth;
        canvas.height = img.naturalHeight;
      }
    } else {
      // Plates: natural dirty image size, CSS stays at 65×65% from stylesheet
      canvas.width  = img.naturalWidth;
      canvas.height = img.naturalHeight;
    }
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
  img.src = cfg.dirtyImg;

  let isDown = false;
  canvas.addEventListener("pointerdown", e => { isDown = true; canvas.setPointerCapture(e.pointerId); eraseAt(e); });
  canvas.addEventListener("pointermove", e => { if (isDown) eraseAt(e); });
  canvas.addEventListener("pointerup",   () => { isDown = false; checkIfClean(canvas, type, itemIdx); });

  function eraseAt(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top)  * scaleY;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, Math.max(canvas.width * 0.12, 20), 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  }
}

function checkIfClean(canvas, type, itemIdx) {
  const ctx  = canvas.getContext("2d");
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  let alphaSum = 0;
  const step = 8;
  let count = 0;
  for (let i = 3; i < data.length; i += 4 * step) { alphaSum += data[i]; count++; }
  const avgAlpha = alphaSum / (count * 255);
  if (avgAlpha < 0.02) markItemCleaned(canvas, type);
}

function markItemCleaned(canvas, type) {
  canvas.closest(".cleaning-item")?.classList.add("cleaning-item--done");
  // Deduct from dirty, add to clean
  if (type === "plate") {
    G.supplies.plates.dirty = Math.max(0, G.supplies.plates.dirty - 1);
    G.supplies.plates.clean++;
  } else if (type === "wine") {
    G.supplies.wineGlasses.dirty = Math.max(0, G.supplies.wineGlasses.dirty - 1);
    G.supplies.wineGlasses.clean++;
  } else {
    G.supplies.beerGlasses.dirty = Math.max(0, G.supplies.beerGlasses.dirty - 1);
    G.supplies.beerGlasses.clean++;
  }
  G.supplies.soapCharges = Math.max(0, G.supplies.soapCharges - 1);
  saveState();
  renderCleaningBadge();
  // Remove the cleaned item and re-render after short delay
  setTimeout(() => renderCleaningScreen(), 400);
}

function buySoap() {
  if (!hasActiveQuestions()) { showToast("Keine aktiven Fragen! Aktiviere Kapitel unter 📚."); return; }
  askQuestions("🧼 Seife kaufen", 1, () => {
    G.supplies.soapCharges = 20;
    saveState();
    renderCleaningScreen();
    showToast("🧼 Seife aufgefüllt!");
  }, null);
}

window.buySoap = buySoap;

/* ══════════════════════════════════════════════════════════
   RENDER ALL
══════════════════════════════════════════════════════════ */
function renderAll() {
  renderStats();
  renderGarden();
  updateRestaurantUI();
  renderCleaningBadge();
  renderCleaningScreen();
  renderTutorial();
}

/* ══════════════════════════════════════════════════════════
   TUTORIAL
══════════════════════════════════════════════════════════ */
const TUTORIAL_STEPS = [
  { id: 'welcome',          btn: 'Los geht\'s! →',
    msg: '🧙 <strong>Willkommen, Tavernenwirt!</strong><br>Ich bin der Geist dieser Taverne. In unserer Welt wird Wissen mit Waren bezahlt — beweise, dass du klug bist, und du bekommst alles was du brauchst.' },
  { id: 'raven_intro',      highlight: '#btn-raven',
    msg: '🪶 Um Waren zu bestellen, beauftragst du den <strong>Raben</strong>. Klick auf ihn!' },
  { id: 'raven_order',
    msg: '📦 Bestell mindestens:<br>• 1× <strong>Weizensamen</strong><br>• 1× <strong>Tomatensamen</strong><br>• 1× <strong>Mozzarella</strong><br>• 1× <strong>Teller</strong><br><br>Das ist die Basis für eine Pizza – sie hält Gäste glücklich. Du kannst auch mehr bestellen! Bestätige danach die Bestellung.' },
  { id: 'raven_ordered',    highlight: '#btn-sleep',
    msg: '🌙 Gut gemacht! Der Rabe macht sich auf den Weg – er braucht einen Tag. <strong>Schlaf jetzt</strong>, damit ein neuer Tag beginnt.' },
  { id: 'day2_garden',
    msg: '🌅 Guten Morgen! Deine Waren sind eingetroffen. <strong>Wisch nach links</strong>, um in den Garten zu kommen.' },
  { id: 'plant_wheat',      highlight: '.garden-slot:not(.garden-slot--planted)',
    msg: '🌾 Klick auf ein <strong>leeres Feld</strong> und pflanze den <strong>Weizen</strong>!' },
  { id: 'plant_tomato',     highlight: '.garden-slot:not(.garden-slot--planted)',
    msg: '🍅 Super! Jetzt noch die <strong>Tomate</strong> ins nächste Feld.' },
  { id: 'water_plants',
    msg: '💧 Pflanzen wachsen durch Wasser — und Wasser gibt es durch <strong>Wissen</strong>. Klick auf jede Pflanze und wähle "Wässern", um eine Frage zu beantworten.' },
  { id: 'sleep_day2',       highlight: '#btn-sleep',
    msg: '✅ Wunderbar! Wisch nach rechts zur Taverne und <strong>schlaf</strong>, damit die Pflanzen wachsen können.' },
  { id: 'water_day3',
    msg: '🌿 Neuer Tag! Geh in den Garten und <strong>wässere die Pflanzen</strong> erneut.' },
  { id: 'sleep_day3',       highlight: '#btn-sleep',
    msg: '🌙 Noch eine Nacht schlafen — morgen sind die Pflanzen reif!' },
  { id: 'harvest',          highlight: '.garden-slot--ready',
    msg: '🌾✨ Die Pflanzen sind reif! <strong>Klick auf sie</strong>, um Weizen und Tomaten zu ernten.' },
  { id: 'kitchen',          highlight: '#btn-kitchen',
    msg: '🍕 Schau dir die <strong>Küche</strong> an! Eine einfache Pizza braucht kein Rezept — die Küchengeister wissen wie. Für besondere Pizzen kannst du hier Rezepte erstellen. Gäste haben Lieblingstoppings, also lohnt sich Abwechslung!' },
  { id: 'open_restaurant',  highlight: '#btn-open-restaurant',
    msg: '🍽️ Du hast Mehl, Tomaten und Käse — genug für die erste Pizza! <strong>Öffne jetzt die Taverne.</strong>' },
  { id: 'serve_patron',
    msg: '🧑 Ein Gast hat Platz genommen! <strong>Klick auf den Tisch</strong>, wenn du ihn bedienen möchtest.' },
  { id: 'cleaning',
    msg: '🫧 Das schmutzige Geschirr muss gewaschen werden! <strong>Wisch nach rechts</strong> zur Reinigung und wische den Schmutz vom Teller. Ab und zu muss die Seife aufgefüllt werden.' },
  { id: 'done',             btn: 'Spielen! 🍕',
    msg: '🌿 <strong>Du hast die Grundlagen gelernt, Tavernenwirt!</strong><br>Sorge für Nachschub, kreiere neue Pizzarezepte und halte deine Gäste glücklich. Viel Erfolg!' },
];

function isTutorialActive() {
  return G.tutorial && !G.tutorial.completed && G.tutorial.step < TUTORIAL_STEPS.length;
}

function renderTutorial() {
  if (!isTutorialActive()) {
    document.getElementById("tut-bubble")?.remove();
    document.querySelectorAll(".tut-highlight").forEach(el => el.classList.remove("tut-highlight"));
    return;
  }
  const step = TUTORIAL_STEPS[G.tutorial.step];
  let bubble = document.getElementById("tut-bubble");
  if (!bubble) {
    bubble = document.createElement("div");
    bubble.id = "tut-bubble";
    document.body.appendChild(bubble);
  }
  bubble.className = "tut-bubble";
  bubble.innerHTML = `<div class="tut-msg">${step.msg}</div>
    ${step.btn ? `<button class="tut-btn" id="tut-next-btn">${step.btn}</button>` : ""}`;
  if (step.btn) {
    document.getElementById("tut-next-btn")?.addEventListener("click", () => advanceTutorial(step.id));
  }
  document.querySelectorAll(".tut-highlight").forEach(el => el.classList.remove("tut-highlight"));
  if (step.highlight) {
    document.querySelectorAll(step.highlight).forEach(el => el.classList.add("tut-highlight"));
  }
}

function advanceTutorial(expectedStepId) {
  if (!isTutorialActive()) return;
  const cur = TUTORIAL_STEPS[G.tutorial.step];
  if (expectedStepId && cur.id !== expectedStepId) return;
  G.tutorial.step++;
  if (G.tutorial.step >= TUTORIAL_STEPS.length) G.tutorial.completed = true;
  saveState();
  renderTutorial();
}

function tutorialStepId() {
  if (!isTutorialActive()) return null;
  return TUTORIAL_STEPS[G.tutorial.step].id;
}

/* ══════════════════════════════════════════════════════════
   BOOT
══════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  // Bottom nav
  document.getElementById("btn-chapters")?.addEventListener("click", () => { renderChapterModal(); openModal("modal-chapters"); });
  document.getElementById("btn-trophies")?.addEventListener("click", () => { renderTrophies(); openModal("modal-trophies"); });
  document.getElementById("btn-memory")?.addEventListener("click",   () => { initMemory(); renderLabelPicker(); openModal("modal-memory"); });
  document.getElementById("btn-settings")?.addEventListener("click", () => { renderSettings(); openModal("modal-settings"); });

  // Restaurant controls
  document.getElementById("btn-open-restaurant")?.addEventListener("click", openRestaurant);
  document.getElementById("btn-last-call")?.addEventListener("click",       doLastCall);
  document.getElementById("btn-sleep")?.addEventListener("click",           doSleep);
  document.getElementById("btn-new-day")?.addEventListener("click",         commitNewDay);
  document.getElementById("btn-raven")?.addEventListener("click",   () => { renderRavenModal(); openModal("modal-raven"); });
  document.getElementById("btn-kitchen")?.addEventListener("click", () => { renderKitchen(); openModal("modal-kitchen"); });
  document.getElementById("btn-cleaning")?.addEventListener("click", () => { scrollToScreen("screen-cleaning"); renderCleaningScreen(); });

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
  document.getElementById("save-btn")?.addEventListener("click",   () => { saveState(); showToast("Gespeichert!"); });
  document.getElementById("export-btn")?.addEventListener("click", exportSave);
  document.getElementById("import-btn")?.addEventListener("click", () => document.getElementById("import-file-input")?.click());
  document.getElementById("import-file-input")?.addEventListener("change", e => { if (e.target.files[0]) importSave(e.target.files[0]); });
  document.getElementById("reset-btn")?.addEventListener("click", () => {
    if (confirm("Spielstand wirklich löschen?")) {
      localStorage.removeItem(SAVE_KEY); G = defaultState(); saveState(); renderAll(); closeModal("modal-settings"); showToast("Zurückgesetzt.");
    }
  });
  document.getElementById("tutorial-reset-btn")?.addEventListener("click", () => {
    G.tutorial = { step: 0, completed: false };
    saveState();
    closeModal("modal-settings");
    renderTutorial();
    showToast("Tutorial gestartet!");
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

  // Load game state and render — after listeners so a crash doesn't lose them
  try {
    G = loadState();
    renderAll();
    renderTutorial();
  } catch (e) {
    const stack = (e.stack || "").split("\n").slice(0, 8).join("<br>");
    document.body.innerHTML = `<div style="color:#fff;padding:2rem;font-family:sans-serif;font-size:0.8rem"><b>Ladefehler:</b> ${e.message}<br><br>${stack}<br><br><button onclick="localStorage.clear();location.reload()" style="padding:0.5rem 1rem;font-size:1rem">Zurücksetzen</button></div>`;
    return;
  }

  // Pause restaurant loop when swiped away, resume + re-render when swiped back
  const _reScreen = document.getElementById("screen-restaurant");
  if (_reScreen) {
    new IntersectionObserver(entries => {
      const visible = entries[0].isIntersecting;
      if (visible) {
        if (G.restaurant.isOpen && !G.restaurant.lastCallFired) {
          startRestaurantLoop();
        }
        renderRestaurantScene();
        renderRestaurantStats();
      } else {
        stopRestaurantLoop();
      }
    }, { threshold: 0.5 }).observe(_reScreen);
  }

  // Tutorial: advance to plant_wheat when garden screen becomes visible
  const _gardenScreen = document.getElementById("screen-garden");
  if (_gardenScreen) {
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        if (tutorialStepId() === "day2_garden") advanceTutorial("day2_garden");
        if (tutorialStepId() === "water_day3")  renderTutorial();
      }
    }, { threshold: 0.5 }).observe(_gardenScreen);
  }
  const _cleaningScreen = document.getElementById("screen-cleaning");
  if (_cleaningScreen) {
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        if (tutorialStepId() === "cleaning") advanceTutorial("cleaning");
      }
    }, { threshold: 0.5 }).observe(_cleaningScreen);
  }

  // Force restaurant (index 1) as the initial screen and prevent browser
  // scroll-restoration from overriding it. We block any scroll events during
  // the two-frame init window, then release once position is locked.
  const _c = document.getElementById("screen-container");
  if (_c) {
    let _initDone = false;
    const _lockScroll = () => { if (!_initDone) _c.scrollLeft = window.innerWidth; };
    _c.addEventListener("scroll", _lockScroll, { passive: true });
    requestAnimationFrame(() => {
      _c.classList.add("sc-ready");   // make scrollable first
      _c.scrollLeft = window.innerWidth; // then set position
      requestAnimationFrame(() => {
        _c.scrollLeft = window.innerWidth; // final override after browser restore
        _initDone = true;
        _c.removeEventListener("scroll", _lockScroll);
      });
    });
  }
});
