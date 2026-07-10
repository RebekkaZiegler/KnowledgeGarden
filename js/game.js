'use strict';

/* ══════════════════════════════════════════════════════════
   CONSTANTS & CONFIG
══════════════════════════════════════════════════════════ */
const APP_VERSION    = "2.1.1";   // ← bump this with every push
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
let   sessionStreak    = 0;   // correct-answer combo; resets on wrong answer
let   sessionWrongStreak = 0; // consecutive wrong answers; resets on correct

function getStreakBonus() {
  if (sessionStreak >= 15) return 100;
  if (sessionStreak >= 7)  return 50;
  if (sessionStreak >= 3)  return 25;
  return 0;
}

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

    activeMode:     "tama",
    activeGameMode: "tavern",

    clicker: {
      kp:          0,
      kpTotal:     0,
      buildings:   {},
      discoveries: [],
      lastTick:    null,
    },

    clinic: {
      gold:            50,
      reputation:      10,
      villageHealth:   50,
      patientsHealed:  0,
      patientsAngry:   0,
      waitingPatients: [],
      upgrades:        { room: 0, nurse: 0, equipment: 0, sign: 0 },
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

    tamagotchi: {
      alive:          true,
      stage:          1,
      path:           null,   // 'a' thriving, 'b' content, 'c' struggling
      species:        null,   // 'root' | 'flamm' | 'well' | 'kiesel' — null until chosen
      bornDate:       null,   // YYYY-MM-DD
      lastFedDate:    null,
      feedsToday:     0,
      requiredToday:  5,
      missedDays:     0,
      weekScores:     [],     // per-week happiness score for path determination
      answersToday:   0,      // total questions answered today (right+wrong), for the grace shield
      shieldActive:   false,  // true = next missed-day check is fully forgiven once
      lastDialogue:   {},     // { [moment]: lastLineIndex } — avoids repeating the same line twice in a row
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
  s.currentDay  = s.currentDay  ?? d.currentDay;
  s.phase       = s.phase       ?? d.phase;
  s.activeMode      = s.activeMode      ?? d.activeMode;
  s.activeGameMode  = s.activeGameMode  ?? d.activeGameMode;
  // Migrate saves from before the Alräunchen tab existed, where activeMode
  // held a game sub-mode directly (tavern/clicker/clinic).
  if (["tavern", "clicker", "clinic"].includes(s.activeMode)) {
    s.activeGameMode = s.activeMode;
    s.activeMode     = "tama";
  }
  s.clicker     = Object.assign({}, d.clicker,  s.clicker  || {});
  s.clicker.buildings   = Object.assign({}, s.clicker.buildings   || {});
  s.clicker.discoveries = s.clicker.discoveries || [];
  s.clinic      = Object.assign({}, d.clinic,   s.clinic   || {});
  s.clinic.upgrades         = Object.assign({}, d.clinic.upgrades, s.clinic.upgrades || {});
  s.clinic.waitingPatients  = []; // never restore mid-session patients
  s.settings   = Object.assign({}, d.settings,    s.settings  || {});
  s.stats      = Object.assign({}, d.stats,        s.stats     || {});
  s.stats.activityLog = s.stats.activityLog || {};
  s.stats.learnedLog  = s.stats.learnedLog  || {};
  s.tamagotchi = Object.assign({}, defaultState().tamagotchi, s.tamagotchi || {});
  s.tamagotchi.weekScores   = s.tamagotchi.weekScores   || [];
  s.tamagotchi.lastDialogue = s.tamagotchi.lastDialogue || {};
  // Existing players who already have a pet keep their current creature (the
  // only species that existed before this feature); brand-new saves stay
  // species:null so the starter-selection screen triggers on boot.
  if (!s.tamagotchi.species) s.tamagotchi.species = s.tamagotchi.bornDate ? 'root' : null;
  s.restaurant = Object.assign({}, d.restaurant,   s.restaurant || {});
  s.restaurant.patrons         = [];
  s.restaurant.sessionStats    = { veryHappy: 0, happy: 0, neutral: 0, sad: 0 };
  s.restaurant.totalStats      = Object.assign({ veryHappy: 0, happy: 0, neutral: 0, sad: 0 }, s.restaurant.totalStats || {});
  s.restaurant.sessionCorrect  = 0;
  s.restaurant.sessionAnswered = 0;
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
  // Deliver any raven orders that were queued under the old day-based system
  if (s.ravenOrders && s.ravenOrders.length) {
    s.inventory = s.inventory || {};
    s.supplies  = s.supplies  || (defaultState()).supplies;
    s.ravenOrders.forEach(o => {
      if (o.isSupply) {
        if (s.supplies[o.itemId]) s.supplies[o.itemId].clean = (s.supplies[o.itemId].clean || 0) + o.qty;
      } else {
        s.inventory[o.itemId] = (s.inventory[o.itemId] || 0) + o.qty;
      }
    });
    s.ravenOrders = [];
  }
  if (s.ravenSeeds && s.ravenSeeds.length) {
    s.inventory = s.inventory || {};
    s.ravenSeeds.forEach(o => {
      const k = `seed_${o.plantId}`;
      s.inventory[k] = (s.inventory[k] || 0) + o.qty;
    });
    s.ravenSeeds = [];
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

  // Migrate plant slots from day-based (plantedDay) to growthPoints
  if (s.garden && s.garden.patches) {
    s.garden.patches = s.garden.patches.map(slot => {
      if (!slot || slot.growthPoints !== undefined) return slot;
      const daysGrown   = Math.max(0, (s.currentDay || 1) - (slot.plantedDay || s.currentDay || 1));
      const growthPoints = Math.min(daysGrown + (slot.wateredToday != null ? 1 : 0), PLANT_GROW_DAYS);
      const { plantedDay, wateredToday, ...rest } = slot;
      return { ...rest, growthPoints };
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
  if (!ch.questions[questionId]) ch.questions[questionId] = { correctDays: [], wrongThisSession: false, nextAvailableDay: 0, timesCorrect: 0, timesWrong: 0 };
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
  const today = new Date().toISOString().slice(0, 10);
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
        if (qs && qs.correctDays.includes(today)) continue;
        if (qs && qs.nextAvailableDay > today) continue;
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
  if (G.tamagotchi) G.tamagotchi.answersToday = (G.tamagotchi.answersToday || 0) + 1;

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
    qs.timesCorrect = (qs.timesCorrect || 0) + 1;
    G.restaurant.sessionCorrect = (G.restaurant.sessionCorrect || 0) + 1;
    const firstTimeToday = !qs.correctDays.includes(today);
    if (firstTimeToday) {
      G.stats.dailyCorrect++;
      qs.correctDays.push(today);
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
    qs.timesWrong = (qs.timesWrong || 0) + 1;
    qs.wrongThisSession    = true;
    qs.nextAvailableDay    = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
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
  const modal    = document.getElementById("modal-question");
  const ctxEl    = document.getElementById("question-context");
  const statsEl  = document.getElementById("question-stats");
  const imgEl    = document.getElementById("question-image");
  const textEl   = document.getElementById("question-text");
  const optsEl   = document.getElementById("question-options");
  const fbEl     = document.getElementById("question-feedback");
  const contBtn  = document.getElementById("question-continue-btn");

  const q = entry.question;
  ctxEl.textContent  = contextText + (entry.isRetry ? " · Wiederholung" : "");
  const qs = entry.chapterId ? ensureQuestionState(entry.chapterId, q.id) : null;
  if (qs && (qs.timesCorrect || qs.timesWrong)) {
    statsEl.innerHTML = `<span class="question-stat-correct">✓ ${qs.timesCorrect || 0}</span> · <span class="question-stat-wrong">✗ ${qs.timesWrong || 0}</span>`;
    statsEl.hidden = false;
  } else {
    statsEl.hidden = true;
  }
  if (q.image) { imgEl.src = q.image; imgEl.hidden = false; }
  else         { imgEl.hidden = true; imgEl.src = ""; }
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

  // Combo streak — update before recordAnswer so renderStats sees new value
  if (isCorrect) {
    sessionStreak++;
    sessionWrongStreak = 0;
    const milestones = [3, 7, 10, 15, 20];
    if (milestones.includes(sessionStreak)) {
      const b = getStreakBonus();
      showToast(`⚡ ${sessionStreak}× KOMBO! +${b}% Bonus auf Ernte & Lieferung! ${pickTamaLine(G.tamagotchi.species, "streak")}`);
    }
  } else {
    if (sessionStreak >= 3) showToast(`💔 Kombo gebrochen (war ${sessionStreak}×)`);
    sessionStreak = 0;
    sessionWrongStreak++;
    if (sessionWrongStreak === 2) showToast(pickTamaLine(G.tamagotchi.species, "stumble"));
  }

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
      () => { correct++; feedTamagotchi(); onEachCorrect && onEachCorrect(); },
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

function getDueTodayCount() {
  return buildQuestionPool().length;
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
  const dueToday = getDueTodayCount();
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

  const comboBonus  = getStreakBonus();
  const comboClass  = sessionStreak >= 15 ? " stat-combo--max"
                    : sessionStreak >= 7  ? " stat-combo--hot"
                    : sessionStreak >= 3  ? " stat-combo--active"
                    : "";
  const comboLabel  = comboBonus ? ` +${comboBonus}%` : "";

  el.innerHTML = `
    <div class="stat-row">
      <div>📖 <strong>${remaining}</strong> offen</div>
      <div>🟢 <strong>${doneChapters}/${totalChapters}</strong></div>
      <div class="stat-streak${streakOn ? " stat-streak--active" : ""}">🔥 ${streak}</div>
      <div class="stat-combo${comboClass}" title="Kombo: ${sessionStreak} richtige in Folge">⚡ ${sessionStreak}${comboLabel}</div>
      <div class="stat-daily${dailyComplete ? " stat-daily--done" : ""}" title="Tagesziel: ${DAILY_GOAL} korrekte Antworten">${dots}</div>
    </div>
    <div class="stat-row">
      ${paceHtml}
      <div style="font-size:0.92rem;color:var(--muted)">heute <strong style="color:var(--text)">${dailyDone}</strong> ${dailyDone === 1 ? "Frage" : "Fragen"} · <strong style="color:var(--text)">${dueToday}</strong> offen</div>
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
      const crop         = FOOD_CROPS.find(c => c.id === slot.plantId);
      const growthPoints = slot.growthPoints || 0;
      const ready        = growthPoints >= PLANT_GROW_DAYS;
      const stage        = Math.min(growthPoints, 3);
      const STAGE_EMOJI = ["🫘", "🌱", "🌿", crop ? crop.emoji : "🌾"];
      const emoji = STAGE_EMOJI[stage];

      slotEl.className = `garden-slot garden-slot--planted${ready ? " garden-slot--ready" : ""}`;

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
      statusEl.textContent = ready ? "✨ Reif!" : `💧 ${growthPoints}/${PLANT_GROW_DAYS}`;

      slotEl.appendChild(cropsDiv);
      slotEl.appendChild(nameEl);
      slotEl.appendChild(statusEl);

      if (!ready) slotEl.onclick = () => openSlotActions(patchIdx, ready);
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

/* ══════════════════════════════════════════════════════════
   TAMAGOTCHI — Alräunchen
══════════════════════════════════════════════════════════ */
function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}
function daysBetween(a, b) {
  return Math.round((new Date(b) - new Date(a)) / 86400000);
}
const TAMA_SPECIES_DATA = {
  root: {
    name:    'Wurzel',
    tagline: 'Ein stilles Wurzelwesen, verbunden mit Erde und Wachstum.',
    sharedNames: ['Die Wurzel','Erster Blick','Das Kräutlein','Das Pflanzenkind','Der Junggeist'],
    pathNames: {
      a: ['Erste Blüte','Blütengeist','Die Goldkrone','Der Sonnengeist','Strahlender Weise'],
      b: ['Der Beständige','Das Mooswesen','Der Waldgeist','Der Uralte','Der Erdenwächter'],
      c: ['Der Fahle','Der Dunkle','Der Grollende','Der Schattenwandler','Der Schattendorn'],
    },
  },
  flamm: {
    name:    'Flämmchen',
    tagline: 'Ein kleiner Funke voller Energie, der nach Wärme sucht.',
    sharedNames: ['Der Funke','Erstes Glühen','Das Flämmchen','Die Feuerseele','Der Lohgeist'],
    pathNames: {
      a: ['Helle Flamme','Der Flammentänzer','Die Feuerkrone','Der Phönixgeist','Strahlender Phönix'],
      b: ['Das Herdlicht','Der Kaminwächter','Die Glutseele','Die Uralte Kohle','Der Herdälteste'],
      c: ['Der Erlöschende','Der Rauchige','Der Aschgraue','Der Rauchwandler','Der Aschendorn'],
    },
  },
  well: {
    name:    'Well-Tröpfchen',
    tagline: 'Ein ruhiges Wassertropfenwesen mit weiser, gelassener Art.',
    sharedNames: ['Der Tropfen','Erstes Kräuseln','Das Tröpfchen','Das Wellenkind','Der Strömungsgeist'],
    pathNames: {
      a: ['Erste Welle','Der Wellentänzer','Die Silberkrone','Der Wogengeist','Strahlender Wellenweise'],
      b: ['Der Teichwächter','Der Tiefe','Der Quellhüter','Der Uralte Strom','Der Quellwächter'],
      c: ['Der Trübe','Der Stille Sumpf','Der Algige','Der Schlammwandler','Der Moordorn'],
    },
  },
  kiesel: {
    name:    'Kiesel',
    tagline: 'Ein kleiner, wortkarger Steingeselle mit trockenem Humor.',
    sharedNames: ['Der Kiesel','Erster Riss','Das Steinchen','Das Felsenkind','Der Gesteinsgeist'],
    pathNames: {
      a: ['Erster Glanz','Der Kristalltänzer','Die Prismakrone','Der Funkelgeist','Strahlender Kristalltitan'],
      b: ['Der Moosstein','Der Wächterfels','Der Standhafte','Der Uralte Fels','Der Bergwächter'],
      c: ['Der Rissige','Der Bröckelnde','Der Geröllige','Der Schuttwandler','Der Trümmerdorn'],
    },
  },
};

// Personality dialogue — short in-character lines shown only at "notable
// moments" (not on every answer), one distinct voice per species.
const TAMA_DIALOGUE = {
  root: {
    feed:      ["Mmh, das tut gut, danke.", "Ich spüre, wie ich wachse.", "Erde und Wissen — beides nährt mich."],
    streak:    ["Wow, du bist heute richtig im Fluss!", "So viele Antworten in Folge — ich bin stolz.", "Weiter so, ich wurzle tiefer mit jeder Antwort."],
    stumble:   ["Nicht schlimm, auch Wurzeln verzweigen sich mal falsch.", "Schau nochmal genau hin — ich glaub an dich.", "Kein Grund zur Sorge, wir versuchen es einfach nochmal."],
    evolve:    ["Ich spüre eine Veränderung in mir...", "Etwas Neues wächst aus mir heraus!", "Danke, dass du mich so weit gebracht hast."],
    nearDeath: ["Mir wird kalt... hast du mich vergessen?", "Bitte komm zurück, ich brauche dich.", "Ich halte noch durch, aber nicht mehr lange."],
  },
  flamm: {
    feed:      ["Jaaa, mehr Brennstoff!", "Ich werd immer heller, spürst du's?", "Danke! Jetzt loder ich richtig!"],
    streak:    ["Wooohoo, wir sind ON FIRE!", "So schnell hintereinander?! Krass!", "Ich glüh vor Stolz auf dich!"],
    stumble:   ["Autsch, das hat gefunkt — aber okay!", "Kurz durchpusten und nochmal!", "Auch Flammen flackern mal, weiter geht's!"],
    evolve:    ["Ich lodere jetzt noch heller!", "Spürst du die neue Hitze in mir?!", "Ich bin gewachsen — und wie!"],
    nearDeath: ["Ich... werd schwächer... so kalt...", "Bitte, ein bisschen Glut noch, schnell!", "Ich flacker nur noch ganz leise."],
  },
  well: {
    feed:      ["Danke, das fließt gut durch mich.", "Ich werde ruhig und klar davon.", "Ein Tropfen Wissen mehr — willkommen."],
    streak:    ["Wie eine Welle, die immer weiterrollt.", "Beeindruckend gleichmäßig, du fließt gut heute.", "So eine schöne Serie, ganz im Einklang."],
    stumble:   ["Kein Problem, auch Wasser findet Umwege.", "Lass uns kurz zur Ruhe kommen und neu ansetzen.", "Nicht jede Welle trifft — nächstes Mal wieder."],
    evolve:    ["Ich fühle mich tiefer, weiter, klarer.", "Etwas in mir hat sich gesetzt und geklärt.", "Danke, ich bin gereift."],
    nearDeath: ["Ich versiege langsam...", "Bitte, ich brauche wieder etwas Zufluss.", "Es wird still und trocken um mich."],
  },
  kiesel: {
    feed:      ["Hm. Nicht schlecht.", "Passt. Mehr davon.", "Solide Antwort. Ich nehm's."],
    streak:    ["Du bist heute hart im Nehmen. Respekt.", "So eine Serie bricht man nicht leicht.", "Fest wie Fels, diese Konzentration."],
    stumble:   ["Passiert. Selbst Felsen bröckeln mal.", "Kurz Staub abklopfen, weiter geht's.", "Nicht der Rede wert. Nochmal."],
    evolve:    ["Ich bin... dichter geworden. Gut.", "Spürst du das? Neue Härte.", "Ich hab mich gefestigt."],
    nearDeath: ["Ich bröckle... langsam...", "Wird Zeit, dass du auftauchst.", "Noch halt ich. Aber nicht ewig."],
  },
};

// Picks a random line from a species/moment pool, avoiding an immediate
// repeat of the last line shown for that moment (persisted in save state).
function pickTamaLine(species, moment) {
  const pool = (TAMA_DIALOGUE[species] || TAMA_DIALOGUE.root)[moment];
  if (!pool || !pool.length) return "";
  const t = G.tamagotchi;
  const last = t.lastDialogue ? t.lastDialogue[moment] : undefined;
  let idx = Math.floor(Math.random() * pool.length);
  if (pool.length > 1 && idx === last) idx = (idx + 1) % pool.length;
  if (t.lastDialogue) t.lastDialogue[moment] = idx;
  return pool[idx];
}

function getTamaImage(stage, path, alive, species) {
  const sp = species || 'root';
  if (!alive) return `assets/images/tamagotchi/${sp}/tama_1.svg`;
  if (stage <= 5) return `assets/images/tamagotchi/${sp}/tama_${stage}.svg`;
  const p = path || 'b';
  return `assets/images/tamagotchi/${sp}/tama_${p}${stage - 5}.svg`;
}
function getTamaName(stage, path, species) {
  const data = TAMA_SPECIES_DATA[species] || TAMA_SPECIES_DATA.root;
  if (stage <= 5) return data.sharedNames[stage - 1];
  return (data.pathNames[path] || data.pathNames.b)[stage - 6];
}

function feedTamagotchi() {
  const t = G.tamagotchi;
  if (!t || !t.alive) return;
  if (!t.bornDate)    t.bornDate    = getTodayDate();
  if (!t.lastFedDate) t.lastFedDate = getTodayDate();
  const wasZero = (t.feedsToday || 0) === 0;
  t.feedsToday = (t.feedsToday || 0) + 1;
  if (wasZero) showToast(pickTamaLine(t.species, "feed"));
  else if (t.feedsToday === (t.requiredToday || 5)) showToast(`✓ Tagesziel erreicht! ${pickTamaLine(t.species, "feed")}`);
}

function feedTamagotchiStudy() {
  if (!G.tamagotchi.alive) return;
  if (!hasActiveQuestions()) { showToast("Keine aktiven Fragen! Aktiviere Kapitel unter 📚."); return; }
  const entry = pickNextQuestion();
  if (!entry) { showToast("Keine Fragen verfügbar."); return; }
  showQuestion("🌱 Alräunchen füttern", entry,
    () => { feedTamagotchi(); },
    () => {},
    () => { saveState(); renderTamagotchi(); }
  );
}
window.feedTamagotchiStudy = feedTamagotchiStudy;

function determineTamaPath(t) {
  const scores = t.weekScores || [];
  if (!scores.length) { t.path = 'b'; return; }
  const avg = scores.reduce((s, v) => s + v, 0) / scores.length;
  t.path = avg >= 1.5 ? 'a' : avg >= 0.6 ? 'b' : 'c';
}

function checkTamagotchiDay() {
  const t = G.tamagotchi;
  if (!t) return;
  const today = getTodayDate();
  if (!t.bornDate)    { t.bornDate = today; t.lastFedDate = today; saveState(); return; }
  if (!t.lastFedDate) { t.lastFedDate = today; saveState(); return; }
  if (t.lastFedDate === today) return;

  const daysSince = daysBetween(t.lastFedDate, today);
  if (daysSince < 1) return;

  const prevFeeds = t.feedsToday || 0;
  const required  = t.requiredToday || 5;

  // Required-today pace: how many questions/day are needed on average to
  // stay on track for the exam deadline, given current remaining content.
  // Rises only when behind schedule, falls as you make progress — a big
  // study day lowers tomorrow's requirement instead of raising it.
  const { remaining } = getLearningProgress();
  const daysLeft = Math.max(1, (EXAM_DEADLINE - Date.now()) / 86400000);
  t.requiredToday = Math.max(3, Math.ceil(remaining / daysLeft));

  // Missed day tracking — a shield earned from a big study day (50+
  // answers) fully absorbs one missed-day penalty instead of delaying it.
  const prevMissedDays = t.missedDays || 0;
  let shieldUsed = false;
  if (prevFeeds === 0 || daysSince > 1) {
    if (t.shieldActive) {
      shieldUsed = true;
      t.shieldActive = false;
    } else {
      // daysSince-1 counts fully-skipped days where the app wasn't opened at
      // all (unknowable whether fed); +1 more if the last tracked day itself
      // was unfed. Previously both terms fired even for a normal daysSince=1
      // miss, double-counting a single missed day as 2 and killing the pet
      // a day early.
      t.missedDays = (t.missedDays || 0) + (daysSince > 1 ? daysSince - 1 : 0);
      if (prevFeeds === 0) t.missedDays++;
    }
  } else {
    t.missedDays = 0;
  }

  if (t.alive && prevMissedDays === 0 && t.missedDays >= 1) {
    showToast(`⚠️ Dein Alräunchen wurde nicht gefüttert. „${pickTamaLine(t.species, "nearDeath")}"`);
  }

  // Death — 2 consecutive missed days
  if (t.alive && t.missedDays >= 2) {
    t.alive = false;
    showToast("💀 Dein Alräunchen ist gestorben. Tippe auf 🌱 um neu zu starten.", 5000);
    t.feedsToday  = 0;
    t.lastFedDate = today;
    saveState();
    renderTamagotchiBtn();
    return;
  }

  // Weekly happiness score (each fed day = 0/1/2); a shielded day counts as
  // neutral so it doesn't drag the mood-path average down like a real miss.
  const dayScore = shieldUsed ? 1 : prevFeeds === 0 ? 0 : prevFeeds >= required * 1.5 ? 2 : 1;
  t.weekScores = [...(t.weekScores || []), dayScore];

  // Stage advancement — 1 stage per 7 days since birth
  if (t.alive) {
    const daysSinceBorn = daysBetween(t.bornDate, today);
    const newStage = Math.min(10, Math.floor(daysSinceBorn / 7) + 1);
    if (newStage > t.stage) {
      if (t.stage === 5 && newStage >= 6) determineTamaPath(t);
      t.stage = newStage;
      showToast(`🌱 Dein Alräunchen hat sich entwickelt! ${getTamaName(t.stage, t.path, t.species)} — „${pickTamaLine(t.species, "evolve")}"`);
    }
  }

  // Grace shield — a big study day (50+ answers) protects the pet from
  // dying on the very next day, even if it doesn't get fed.
  if ((t.answersToday || 0) >= 50 && !t.shieldActive) {
    t.shieldActive = true;
    showToast("🛡️ Starker Tag! Dein Alräunchen ist morgen geschützt, auch ohne Füttern.");
  }
  t.answersToday = 0;

  t.feedsToday  = 0;
  t.lastFedDate = today;
  saveState();
  renderTamagotchiBtn();
}

function reviveTamagotchi() {
  const today = getTodayDate();
  G.tamagotchi = {
    alive: true, stage: 1, path: null, species: G.tamagotchi.species,
    bornDate: today, lastFedDate: today,
    feedsToday: 0, requiredToday: 5,
    missedDays: 0, weekScores: [],
    answersToday: 0, shieldActive: false, lastDialogue: {},
  };
  saveState();
  renderTamagotchi();
  renderTamagotchiBtn();
  showToast("🥚 Ein neues Alräunchen ist bereit!");
}
window.reviveTamagotchi = reviveTamagotchi;

function renderTamagotchiBtn() {
  const btn = document.getElementById("top-tab-tama");
  if (!btn) return;
  const t = G.tamagotchi;
  const pct = Math.min(100, Math.round(((t.feedsToday || 0) / (t.requiredToday || 5)) * 100));
  const hungry = t.alive && pct < 100;
  btn.classList.toggle("top-tab--hungry", hungry);
  btn.title = t.alive
    ? `${getTamaName(t.stage, t.path, t.species)} — ${t.feedsToday || 0}/${t.requiredToday || 5} heute`
    : "Gestorben";
}

function renderTamagotchi() {
  const el = document.getElementById("tama-screen-body");
  const feedBtn = document.getElementById("tama-feed-btn");
  if (!el) return;
  const t = G.tamagotchi;
  checkTamagotchiDay();
  const today = getTodayDate();
  const feeds    = t.feedsToday || 0;
  const required = t.requiredToday || 5;
  const pct = Math.min(100, Math.round((feeds / required) * 100));
  const overfed  = feeds >= required * 1.5;
  const fed      = feeds >= required;
  const img      = getTamaImage(t.stage, t.path, t.alive, t.species);
  const name     = t.alive ? getTamaName(t.stage, t.path, t.species) : "☠️ Gestorben";
  const stageLabel = t.alive ? `Stufe ${t.stage}/10` : "";
  const pathLabel  = t.path
    ? ({ a: '🌟 Blühend', b: '🌿 Gesund', c: '🖤 Welkend' }[t.path] || '')
    : (t.stage >= 5 ? '⏳ Entwicklung läuft…' : '');
  const missedWarning = t.alive && (t.missedDays || 0) >= 1
    ? `<p class="tama-warning">⚠️ ${t.missedDays} Tag${t.missedDays > 1 ? 'e' : ''} nicht gefüttert! Bei 2 stirbt es.</p>`
    : '';
  const moodEmoji = !t.alive ? '💀' : overfed ? '🤩' : fed ? '😊' : pct > 50 ? '😐' : '😢';
  const daysOld   = t.bornDate ? daysBetween(t.bornDate, today) : 0;
  const nextStage = t.alive && t.stage < 10
    ? (() => { const d = 7 - (daysOld % 7); return `Nächste Stufe in ${d} Tag${d !== 1 ? 'en' : ''}`; })()
    : t.stage >= 10 ? 'Maximal entwickelt 🏆' : '';

  el.innerHTML = `
    <div class="tama-creature">
      <img src="${img}" class="tama-img" alt="${name}">
      <div class="tama-mood">${moodEmoji}</div>
    </div>
    <div class="tama-info">
      <div class="tama-name">${name}</div>
      ${stageLabel ? `<div class="tama-stage">${stageLabel}${pathLabel ? ` · ${pathLabel}` : ''}</div>` : ''}
      ${t.alive ? `
        <div class="tama-feed-label">Heute: ${feeds}/${required} Fragen ${fed ? '✓' : ''}</div>
        <div class="tama-bar-wrap"><div class="tama-bar" style="width:${pct}%;background:${overfed?'#f0c040':fed?'#5cca6e':'#c04040'}"></div></div>
        ${missedWarning}
        ${nextStage ? `<div class="tama-next">${nextStage}</div>` : ''}
        ${daysOld > 0 ? `<div class="tama-age">Alter: ${daysOld} Tag${daysOld !== 1 ? 'e' : ''}</div>` : ''}
      ` : `
        <p class="tama-dead-msg">Dein Alräunchen ist gestorben weil es 2 Tage nicht gefüttert wurde.</p>
        <button class="tama-revive-btn" onclick="reviveTamagotchi()">🥚 Neu starten</button>
      `}
    </div>`;

  if (feedBtn) feedBtn.hidden = !t.alive;
  renderTamagotchiBtn();
}
window.renderTamagotchi = renderTamagotchi;

const TAMA_SPECIES_ORDER = ['root', 'flamm', 'well', 'kiesel'];

// Mandatory starter picker — shown on first launch and after a full game
// reset (species:null gates this). No cancel button; a choice is required.
function showStarterSelect() {
  let modal = document.getElementById("modal-starter-select");
  if (!modal) {
    modal = document.createElement("div");
    modal.id        = "modal-starter-select";
    modal.className = "modal-overlay";
    modal.innerHTML = `<div class="modal-box">
      <h2>🥚 Wähle dein Alräunchen</h2>
      <p class="starter-select-intro">Welches Wesen möchtest du aufziehen?</p>
      <div id="starter-select-grid" class="starter-select-grid"></div>
    </div>`;
    document.body.appendChild(modal);
  }
  const grid = document.getElementById("starter-select-grid");
  grid.innerHTML = TAMA_SPECIES_ORDER.map(sp => {
    const data = TAMA_SPECIES_DATA[sp];
    return `<button class="starter-card" data-species="${sp}">
      <img src="${getTamaImage(1, null, true, sp)}" alt="${data.name}">
      <div class="starter-card-name">${data.name}</div>
      <div class="starter-card-tagline">${data.tagline}</div>
    </button>`;
  }).join("");
  grid.querySelectorAll(".starter-card").forEach(btn => {
    btn.onclick = () => chooseStarter(btn.dataset.species);
  });
  modal.hidden = false;
}
window.showStarterSelect = showStarterSelect;

function chooseStarter(species) {
  const today = getTodayDate();
  G.tamagotchi = {
    alive: true, stage: 1, path: null, species,
    bornDate: today, lastFedDate: today,
    feedsToday: 0, requiredToday: 5,
    missedDays: 0, weekScores: [],
    answersToday: 0, shieldActive: false, lastDialogue: {},
  };
  saveState();
  closeModal("modal-starter-select");
  renderAll();
  switchTopTab("tama");
  showToast(`🥚 ${TAMA_SPECIES_DATA[species].name} ist bereit!`);
}

function plantSeed(patchIdx, cropId, cropName) {
  G.garden.patches[patchIdx] = { plantId: cropId, plantTitle: cropName, growthPoints: 0 };
  const key = `seed_${cropId}`;
  if ((G.inventory[key] || 0) > 0) G.inventory[key]--;
  saveState();
  renderGarden();
}

function openSlotActions(patchIdx, ready) {
  const slot = G.garden.patches[patchIdx];
  if (!slot) return;
  const actions = [];
  if (ready) actions.push({ label: "🌿 Ernten",          value: "harvest" });
  else       actions.push({ label: "💧 Wässern (1 Frage)", value: "water" });
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
    () => {
      const slot = G.garden.patches[patchIdx];
      if (!slot) return;
      slot.growthPoints = (slot.growthPoints || 0) + 1;
      const crop = FOOD_CROPS.find(c => c.id === slot.plantId);
      if (slot.growthPoints >= PLANT_GROW_DAYS) {
        showToast(`✨ ${crop ? crop.emoji : "🌿"} ${slot.plantTitle} ist reif!`);
      }
    },
    () => {},
    () => {
      saveState(); renderGarden();
    }
  );
}

function harvestOnePlant(patchIdx) {
  const slot = G.garden.patches[patchIdx];
  if (!slot) return;
  const crop        = FOOD_CROPS.find(c => c.id === slot.plantId);
  const ingredient  = crop ? crop.ingredient : "wheat";
  const spriteCount  = crop?.spriteCount || 1;
  const streakMult   = 1 + getStreakBonus() / 100;
  const perPlant     = Math.max(1, Math.round(getCropYield(crop) / spriteCount * streakMult));

  slot.harvestedCount = (slot.harvestedCount || 0) + 1;
  addInventory(ingredient, perPlant);
  G.stats.totalHarvests++;
  const bonusLabel = streakMult > 1 ? ` ⚡×${streakMult.toFixed(2).replace(/\.?0+$/, "")}` : "";
  showToast(`${crop ? crop.emoji : "🌿"} +${perPlant} ${getIngredientName(ingredient)}${bonusLabel}`);

  if (slot.harvestedCount >= spriteCount) {
    G.garden.patches[patchIdx] = null;
  }
  saveState();
  renderGarden();
  renderRestaurantStats();
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
function renderRavenModal() {
  const listEl = document.getElementById("raven-order-list");
  const pendEl = document.getElementById("raven-pending");
  if (!listEl) return;

  const bonus = getStreakBonus();
  const bonusTip = bonus > 0 ? ` <span style="color:#f0c040">⚡+${bonus}%</span>` : "";

  let html = `<p class="raven-hint">Anklicken → Frage beantworten → sofort geliefert.${bonus > 0 ? ` <strong style="color:#f0c040">⚡+${bonus}% Streak!</strong>` : ""}</p>`;

  html += `<div class="raven-section-label">🥩 Tierische Produkte</div>`;
  html += RAVEN_ITEMS_CFG.map(item => {
    const iconHtml = item.orderHtml || `<span style="font-size:1.1rem">${item.emoji}</span>`;
    const qty = G.inventory[item.id] || 0;
    const stock = qty > 0 ? `<span class="raven-stock">${qty} vorrätig</span>` : "";
    return `<button class="raven-item-btn" onclick="orderRavenItem('${item.id}')">
      ${iconHtml}
      <span class="raven-item-name">${item.name}<span class="raven-batch"> ×${item.batch}</span>${stock}</span>
      <span class="raven-item-cost">1 Frage${bonusTip}</span>
    </button>`;
  }).join("");

  html += `<div class="raven-section-label">🌱 Samen</div>`;
  html += FOOD_CROPS.map(crop => {
    const key = `seed_${crop.id}`;
    const inStock = G.inventory[key] || 0;
    const stock = inStock > 0 ? `<span class="raven-stock">${inStock} vorrätig</span>` : "";
    return `<button class="raven-item-btn" onclick="orderRavenItem('${key}')">
      <span style="font-size:1.1rem">${crop.emoji}</span>
      <span class="raven-item-name">${crop.name}<span class="raven-batch"> →${getCropYield(crop)}× ${getIngredientName(crop.ingredient)}</span>${stock}</span>
      <span class="raven-item-cost">1 Frage${bonusTip}</span>
    </button>`;
  }).join("");

  html += `<div class="raven-section-label">🍽️ Geschirr</div>`;
  html += DISHWARE_CFG.map(dw => {
    const clean = G.supplies[dw.id]?.clean || 0;
    const dirty = G.supplies[dw.id]?.dirty || 0;
    const stock = (clean || dirty) ? `<span class="raven-stock">${clean} sauber, ${dirty} schmutzig</span>` : "";
    return `<button class="raven-item-btn" onclick="orderRavenItem('${dw.id}')">
      <span style="font-size:1.1rem">${dw.emoji}</span>
      <span class="raven-item-name">${dw.name}<span class="raven-batch"> ×${dw.batch}</span>${stock}</span>
      <span class="raven-item-cost">1 Frage${bonusTip}</span>
    </button>`;
  }).join("");

  listEl.innerHTML = html;
  pendEl.innerHTML = "";
}
window.orderRavenItem = orderRavenItem;

function orderRavenItem(key) {
  if (!hasActiveQuestions()) {
    showToast("Keine aktiven Fragen! Aktiviere Kapitel unter 📚.");
    return;
  }
  closeModal("modal-raven");
  askQuestions("🪶 Raben-Bestellung", 1, () => {
    const streakMult = 1 + getStreakBonus() / 100;
    const bonusLabel = streakMult > 1 ? ` ⚡+${getStreakBonus()}%` : "";
    let desc = "";
    if (key.startsWith("seed_")) {
      G.inventory[key] = (G.inventory[key] || 0) + 1;
      const crop = FOOD_CROPS.find(c => `seed_${c.id}` === key);
      desc = `1× ${crop?.name || key}`;
    } else {
      const item = RAVEN_ITEMS_CFG.find(i => i.id === key);
      if (item) {
        const qty = Math.round(item.batch * streakMult);
        addInventory(key, qty);
        desc = `${qty}× ${item.name}`;
      } else {
        const dw = DISHWARE_CFG.find(d => d.id === key);
        if (dw) {
          const qty = Math.round(dw.batch * streakMult);
          G.supplies[dw.id].clean = (G.supplies[dw.id].clean || 0) + qty;
          desc = `${qty}× ${dw.name}`;
        }
      }
    }
    renderAll();
    showToast(`🪶 Sofort geliefert!${bonusLabel} · ${desc}`);
  }, null);
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

  // Mastery progress donut
  let qTotal = 0, qMastered = 0, qSeen = 0;
  for (const bed of PACK_CONTENT.beds) {
    const ch = G.chapters[bed.id];
    if (!ch || !ch.activated) continue;
    for (const plant of bed.plants) {
      for (const q of [...(plant.harvestQuestions||[]), ...(plant.phase4Questions||[])]) {
        qTotal++;
        const qs = ch.questions?.[q.id];
        if (isQuestionMastered(qs)) qMastered++;
        else if (qs && qs.correctDays?.length > 0) qSeen++;
      }
    }
  }
  const qUnseen = qTotal - qMastered - qSeen;
  const progressHtml = qTotal > 0 ? (() => {
    const R = 54, CX = 70, CY = 70, STROKE = 14;
    const circ = 2 * Math.PI * R;
    const pMastered = qMastered / qTotal;
    const pSeen     = qSeen     / qTotal;
    const pUnseen   = qUnseen   / qTotal;
    const dashMast  = (pMastered * circ).toFixed(1);
    const dashSeen  = (pSeen     * circ).toFixed(1);
    const dashUns   = (pUnseen   * circ).toFixed(1);
    const offMast   = "0";
    const offSeen   = (-pMastered * circ).toFixed(1);
    const offUns    = (-(pMastered + pSeen) * circ).toFixed(1);
    const pct = Math.round(pMastered * 100);
    return `<div class="trophy-section-label">Lernfortschritt (aktive Kapitel)</div>
    <div class="trophy-progress-wrap">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="#222" stroke-width="${STROKE}"/>
        ${qUnseen > 0 ? `<circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="#c04040" stroke-width="${STROKE}"
          stroke-dasharray="${dashUns} ${circ}" stroke-dashoffset="${offUns}" stroke-linecap="butt" transform="rotate(-90 ${CX} ${CY})"/>` : ""}
        ${qSeen > 0 ? `<circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="#e8a020" stroke-width="${STROKE}"
          stroke-dasharray="${dashSeen} ${circ}" stroke-dashoffset="${offSeen}" stroke-linecap="butt" transform="rotate(-90 ${CX} ${CY})"/>` : ""}
        ${qMastered > 0 ? `<circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="#5cca6e" stroke-width="${STROKE}"
          stroke-dasharray="${dashMast} ${circ}" stroke-dashoffset="${offMast}" stroke-linecap="butt" transform="rotate(-90 ${CX} ${CY})"/>` : ""}
        <text x="${CX}" y="${CY - 6}" text-anchor="middle" font-size="20" font-weight="700" fill="#fff">${pct}%</text>
        <text x="${CX}" y="${CY + 12}" text-anchor="middle" font-size="9" fill="#888">gemeistert</text>
      </svg>
      <div class="trophy-progress-legend">
        <div class="tpl-row"><span class="tpl-dot" style="background:#5cca6e"></span>${qMastered} gemeistert</div>
        <div class="tpl-row"><span class="tpl-dot" style="background:#e8a020"></span>${qSeen} in Arbeit</div>
        <div class="tpl-row"><span class="tpl-dot" style="background:#c04040"></span>${qUnseen} noch offen</div>
        <div class="tpl-row tpl-total">∑ ${qTotal} Fragen</div>
      </div>
    </div>`;
  })() : "";

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

  el.innerHTML = counterHtml + progressHtml + heatmapHtml + achHtml + chapterHtml;
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

  // Show one item at a time, fullscreen
  const item = items[0];
  const cfg = DISHWARE_CFG.find(d =>
    item.type === "plate" ? d.id === "plates" :
    item.type === "wine"  ? d.id === "wineGlasses" : d.id === "beerGlasses"
  );
  const remaining = items.length;
  grid.innerHTML = `
    <p class="cleaning-counter">${remaining} noch dreckig</p>
    <div class="cleaning-item ${needSoap ? "cleaning-item--locked" : ""}" data-type="${item.type}" data-idx="0">
      <div class="cleaning-img-wrap">
        <img src="${cfg.cleanImg}" class="cleaning-clean-img" draggable="false">
        <canvas class="cleaning-canvas" id="ccanvas-0" data-type="${item.type}" data-item-idx="0"></canvas>
      </div>
    </div>`;

  if (!needSoap) {
    const canvas = document.getElementById("ccanvas-0");
    if (canvas) setupCleaningCanvas(canvas, item.type, 0);
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
  renderTamagotchiBtn();
}

/* ══════════════════════════════════════════════════════════
   MODE A — KNOWLEDGE CLICKER
══════════════════════════════════════════════════════════ */
const CLICKER_BUILDINGS = [
  { id: 'researcher',  name: 'Forscher',    emoji: '🔬', baseCost: 100,         rate: 1,       desc: '+1 KP/Sek'          },
  { id: 'scholar',     name: 'Gelehrter',   emoji: '🎓', baseCost: 1000,        rate: 10,      desc: '+10 KP/Sek'         },
  { id: 'library',     name: 'Bibliothek',  emoji: '📚', baseCost: 10000,       rate: 100,     desc: '+100 KP/Sek'        },
  { id: 'institute',   name: 'Institut',    emoji: '🏛️', baseCost: 100000,      rate: 1000,    desc: '+1.000 KP/Sek'      },
  { id: 'university',  name: 'Universität', emoji: '🎪', baseCost: 2000000,     rate: 15000,   desc: '+15.000 KP/Sek'     },
  { id: 'academy',     name: 'Akademie',    emoji: '🌐', baseCost: 50000000,    rate: 250000,  desc: '+250.000 KP/Sek'    },
  { id: 'observatory', name: 'Observatium', emoji: '🔭', baseCost: 1000000000,  rate: 5000000, desc: '+5.000.000 KP/Sek'  },
];

const CLICKER_DISCOVERIES = [
  { id: 'disc1',  name: 'Erste Erkenntnis',     threshold: 500,              mult: 0.10,  desc: '+10% alle KP'    },
  { id: 'disc2',  name: 'Durchbruch',            threshold: 5000,             mult: 0.25,  desc: '+25% alle KP'    },
  { id: 'disc3',  name: 'Meisterwerk',           threshold: 50000,            mult: 0.50,  desc: '+50% alle KP'    },
  { id: 'disc4',  name: 'Erleuchtung',           threshold: 500000,           mult: 1.00,  desc: '+100% alle KP'   },
  { id: 'disc5',  name: 'Allwissen',             threshold: 5000000,          mult: 2.00,  desc: '+200% alle KP'   },
  { id: 'disc6',  name: 'Genialität',            threshold: 100000000,        mult: 3.00,  desc: '+300% alle KP'   },
  { id: 'disc7',  name: 'Transzendenz',          threshold: 2000000000,       mult: 5.00,  desc: '+500% alle KP'   },
  { id: 'disc8',  name: 'Kosmisches Bewusstsein',threshold: 50000000000,      mult: 10.00, desc: '+1.000% alle KP' },
  { id: 'disc9',  name: 'Zeitlose Weisheit',     threshold: 1000000000000,    mult: 20.00, desc: '+2.000% alle KP' },
  { id: 'disc10', name: 'Göttliche Erkenntnis',  threshold: 25000000000000,   mult: 50.00, desc: '+5.000% alle KP' },
  { id: 'disc11', name: 'Das Absolute Wissen',   threshold: 1000000000000000, mult: 100.0, desc: '+10.000% alle KP'},
];

function formatKP(n) {
  n = Math.floor(n);
  if (n >= 1e9) return (n / 1e9).toFixed(1) + ' Mrd';
  if (n >= 1e6) return (n / 1e6).toFixed(1) + ' Mio';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'k';
  return n.toString();
}

function getClickerMult() {
  const disc = G.clicker.discoveries || [];
  return 1 + CLICKER_DISCOVERIES.filter(d => disc.includes(d.id)).reduce((s, d) => s + d.mult, 0);
}

function getClickerPassiveRate() {
  const bld = G.clicker.buildings || {};
  return CLICKER_BUILDINGS.reduce((s, b) => s + (bld[b.id] || 0) * b.rate, 0) * getClickerMult();
}

function getClickerBuildingCost(id) {
  const b = CLICKER_BUILDINGS.find(b => b.id === id);
  return b ? Math.ceil(b.baseCost * Math.pow(1.15, G.clicker.buildings[id] || 0)) : Infinity;
}

function tickClicker() {
  if (!G.clicker) return;
  const now  = Date.now();
  const last = G.clicker.lastTick || now;
  const secs = Math.min((now - last) / 1000, 3600); // cap at 1 hour of offline gains
  const gain = getClickerPassiveRate() * secs;
  if (gain > 0) {
    G.clicker.kp      = (G.clicker.kp      || 0) + gain;
    G.clicker.kpTotal = (G.clicker.kpTotal  || 0) + gain;
    checkClickerDiscoveries();
  }
  G.clicker.lastTick = now;
}

function checkClickerDiscoveries() {
  const disc = G.clicker.discoveries;
  CLICKER_DISCOVERIES.forEach(d => {
    if (!disc.includes(d.id) && (G.clicker.kpTotal || 0) >= d.threshold) {
      disc.push(d.id);
      showToast(`✨ Entdeckung: ${d.name}! ${d.desc}`);
    }
  });
}

function clickerStudy() {
  if (!hasActiveQuestions()) { showToast("Keine aktiven Fragen! Aktiviere Kapitel unter 📚."); return; }
  const entry = pickNextQuestion();
  if (!entry) { showToast("Keine Fragen verfügbar."); return; }
  showQuestion("📈 Wissenspunkte", entry,
    () => {
      const gain = Math.round(100 * getClickerMult() * (1 + getStreakBonus() / 100));
      G.clicker.kp      = (G.clicker.kp      || 0) + gain;
      G.clicker.kpTotal = (G.clicker.kpTotal  || 0) + gain;
      G.clicker.lastTick = Date.now();
      checkClickerDiscoveries();
      showToast(`+${formatKP(gain)} KP`);
    },
    () => {},
    () => { saveState(); renderClicker(); }
  );
}
window.clickerStudy = clickerStudy;

function buyClickerBuilding(id) {
  const cost = getClickerBuildingCost(id);
  if ((G.clicker.kp || 0) < cost) { showToast("Nicht genug KP!"); return; }
  G.clicker.kp -= cost;
  G.clicker.buildings[id] = (G.clicker.buildings[id] || 0) + 1;
  saveState();
  renderClicker();
}
window.buyClickerBuilding = buyClickerBuilding;

let clickerTickTimer = null;
function startClickerTick() {
  stopClickerTick();
  clickerTickTimer = setInterval(() => { tickClicker(); renderClicker(); }, 1000);
}
function stopClickerTick() {
  if (clickerTickTimer) { clearInterval(clickerTickTimer); clickerTickTimer = null; }
}

function renderClicker() {
  tickClicker();
  const kp     = G.clicker.kp      || 0;
  const kpT    = G.clicker.kpTotal  || 0;
  const rate   = getClickerPassiveRate();
  const mult   = getClickerMult();
  const bonus  = getStreakBonus();
  const kpGain = Math.round(100 * mult * (1 + bonus / 100));
  const bonusTip = bonus > 0 ? ` · ⚡+${bonus}%` : "";

  const el = id => document.getElementById(id);
  if (el("clicker-kp-number")) el("clicker-kp-number").textContent = formatKP(kp);
  if (el("clicker-kp-rate"))   el("clicker-kp-rate").textContent   = rate > 0 ? `+${formatKP(rate)} KP/Sek` : "Keine passiven Einnahmen";
  if (el("clicker-btn-sub"))   el("clicker-btn-sub").textContent   = `+${formatKP(kpGain)} KP${bonusTip}`;

  const bldEl = el("clicker-buildings");
  if (bldEl) {
    bldEl.innerHTML = `<div class="clicker-section-title">🔬 Gebäude</div>` +
      CLICKER_BUILDINGS.map(b => {
        const count    = G.clicker.buildings[b.id] || 0;
        const cost     = getClickerBuildingCost(b.id);
        const canBuy   = kp >= cost;
        const totalRate = count * b.rate * mult;
        return `<div class="clicker-building">
          <div class="clicker-bld-info">
            <span class="clicker-bld-emoji">${b.emoji}</span>
            <div>
              <div class="clicker-bld-name">${b.name}${count ? ` <strong>×${count}</strong>` : ""}</div>
              <div class="clicker-bld-desc">${b.desc}${count ? ` · ${formatKP(totalRate)}/Sek gesamt` : ""}</div>
            </div>
          </div>
          <button class="clicker-buy-btn${canBuy ? "" : " clicker-buy-btn--off"}"
            onclick="buyClickerBuilding('${b.id}')" ${canBuy ? "" : "disabled"}>
            Kaufen<br><span>${formatKP(cost)} KP</span>
          </button>
        </div>`;
      }).join("");
  }

  const discEl = el("clicker-discoveries");
  if (discEl) {
    const disc = G.clicker.discoveries || [];
    discEl.innerHTML = `<div class="clicker-section-title">✨ Entdeckungen</div>` +
      CLICKER_DISCOVERIES.map(d => {
        const done = disc.includes(d.id);
        const pct  = Math.min(100, (kpT / d.threshold) * 100);
        return `<div class="clicker-discovery${done ? " clicker-discovery--done" : ""}">
          <div class="clicker-disc-header">
            <span>${done ? "✅" : "⬜"} ${d.name}</span>
            <span class="clicker-disc-bonus">${d.desc}</span>
          </div>
          ${!done ? `<div class="clicker-disc-bar"><div style="width:${pct.toFixed(1)}%"></div></div>
            <div class="clicker-disc-thresh">${formatKP(kpT)} / ${formatKP(d.threshold)} KP</div>` : ""}
        </div>`;
      }).join("");
  }
}

/* ══════════════════════════════════════════════════════════
   MODE B — CLINIC  (+ Mode C: Knowledge Tower inside it)
══════════════════════════════════════════════════════════ */
const CLINIC_NAMES   = ["Anna","Max","Lea","Thomas","Maria","Felix","Sophie","Jonas","Emma","Lukas","Hannah","Julian","Mia","Niklas","Laura","Tim","Sara","Ben","Clara","David"];
const CLINIC_EMOJI   = ["👴","👵","👨","👩","🧑","👦","👧","🧔","👩‍🦳","👨‍🦱"];
const CLINIC_COMPLAINTS = [
  "Kopfschmerzen","Rückenschmerzen","Müdigkeit","Bauchschmerzen",
  "Husten","Schwindel","Schlafprobleme","Gelenksschmerzen","Stress","Erkältung",
];

const CLINIC_UPGRADES = [
  { id: 'room',      name: 'Warteraum +1',      emoji: '🚪', baseCost: 150, desc: '+1 Patientenplatz',            max: 6  },
  { id: 'nurse',     name: 'Krankenschwester',   emoji: '👩‍⚕️', baseCost: 400, desc: 'Behandelt Patienten automatisch', max: 3  },
  { id: 'equipment', name: 'Ausrüstung +1',      emoji: '🔧', baseCost: 250, desc: 'Reputationsverlust −2/Fehler',  max: 5  },
  { id: 'sign',      name: 'Praxisschild',       emoji: '📋', baseCost: 600, desc: '50% mehr Patienten',            max: 1  },
];

let clinicPatientTimer = null;
let clinicNurseTimer   = null;
let clinicUiTimer      = null;

function clinicRooms()    { return 2 + (G.clinic.upgrades.room      || 0); }
function clinicNurses()   { return      G.clinic.upgrades.nurse      || 0; }
function clinicEquip()    { return      G.clinic.upgrades.equipment  || 0; }
function clinicHasSign()  { return     (G.clinic.upgrades.sign       || 0) > 0; }

function clinicSpawnInterval() {
  const rep  = G.clinic.reputation || 0;
  const base = Math.max(12000, 55000 - rep * 400);
  return clinicHasSign() ? Math.round(base * 0.65) : base;
}

function spawnClinicPatient() {
  if (!G.clinic) return;
  const patients = G.clinic.waitingPatients || [];
  if (patients.length >= clinicRooms()) return;
  const name      = CLINIC_NAMES  [Math.floor(Math.random() * CLINIC_NAMES.length)];
  const emoji     = CLINIC_EMOJI  [Math.floor(Math.random() * CLINIC_EMOJI.length)];
  const complaint = CLINIC_COMPLAINTS[Math.floor(Math.random() * CLINIC_COMPLAINTS.length)];
  G.clinic.waitingPatients = [...patients, {
    id: `p${Date.now()}${Math.floor(Math.random()*1000)}`, name, emoji, complaint,
  }];
  renderClinic();
  saveState();
}

function consultPatient(patientId) {
  if (!hasActiveQuestions()) { showToast("Keine aktiven Fragen! Aktiviere Kapitel unter 📚."); return; }
  const entry = pickNextQuestion();
  if (!entry) { showToast("Keine Fragen verfügbar."); return; }
  const pat = (G.clinic.waitingPatients || []).find(p => p.id === patientId);
  if (!pat) return;

  showQuestion(`🏥 ${pat.name} — ${pat.complaint}`, entry,
    () => {
      G.clinic.waitingPatients = (G.clinic.waitingPatients || []).filter(p => p.id !== patientId);
      const gold = 20 + Math.floor(Math.random() * 31);
      G.clinic.gold         = (G.clinic.gold         || 0) + gold;
      G.clinic.reputation   = Math.min(100, (G.clinic.reputation   || 0) + 3);
      G.clinic.villageHealth= Math.min(100, (G.clinic.villageHealth|| 50) + 2);
      G.clinic.patientsHealed = (G.clinic.patientsHealed || 0) + 1;
      showToast(`❤️ ${pat.name} geheilt! +${gold} 💰 +3 ⭐`);
    },
    () => {
      G.clinic.waitingPatients = (G.clinic.waitingPatients || []).filter(p => p.id !== patientId);
      const repLoss = Math.max(1, 8 - clinicEquip() * 2);
      G.clinic.reputation    = Math.max(0, (G.clinic.reputation    || 0) - repLoss);
      G.clinic.villageHealth = Math.max(0, (G.clinic.villageHealth || 50) - 1);
      G.clinic.patientsAngry = (G.clinic.patientsAngry || 0) + 1;
      showToast(`😠 ${pat.name} ist unzufrieden. −${repLoss} ⭐`);
    },
    () => { saveState(); renderClinic(); }
  );
}
window.consultPatient = consultPatient;

function buyClinicUpgrade(id) {
  const upg = CLINIC_UPGRADES.find(u => u.id === id);
  if (!upg) return;
  const lvl  = G.clinic.upgrades[id] || 0;
  if (lvl >= upg.max) { showToast("Maximum erreicht!"); return; }
  const cost = Math.ceil(upg.baseCost * Math.pow(1.6, lvl));
  if ((G.clinic.gold || 0) < cost) { showToast("Nicht genug Gold!"); return; }
  G.clinic.gold -= cost;
  G.clinic.upgrades[id] = lvl + 1;
  if (id === 'sign') restartClinicSpawnTimer();
  showToast(`✅ ${upg.emoji} ${upg.name} gekauft!`);
  saveState();
  renderClinic();
}
window.buyClinicUpgrade = buyClinicUpgrade;

function tickClinicNurses() {
  const n = clinicNurses();
  if (!n) return;
  const patients = G.clinic.waitingPatients || [];
  const toHandle = Math.min(n, patients.length);
  if (!toHandle) return;
  G.clinic.waitingPatients = patients.slice(toHandle);
  let healed = 0, angry = 0;
  for (let i = 0; i < toHandle; i++) {
    if (Math.random() < 0.72) {
      G.clinic.gold          = (G.clinic.gold          || 0) + 12;
      G.clinic.reputation    = Math.min(100, (G.clinic.reputation    || 0) + 2);
      G.clinic.villageHealth = Math.min(100, (G.clinic.villageHealth || 50) + 1);
      G.clinic.patientsHealed= (G.clinic.patientsHealed || 0) + 1;
      healed++;
    } else {
      G.clinic.reputation    = Math.max(0, (G.clinic.reputation    || 0) - 2);
      G.clinic.patientsAngry = (G.clinic.patientsAngry || 0) + 1;
      angry++;
    }
  }
  saveState();
  renderClinic();
  if (healed || angry) showToast(`👩‍⚕️ Schwester: ${healed ? `${healed} geheilt` : ""}${healed && angry ? " · " : ""}${angry ? `${angry} unzufrieden` : ""}`);
}

function restartClinicSpawnTimer() {
  clearInterval(clinicPatientTimer);
  clinicPatientTimer = setInterval(spawnClinicPatient, clinicSpawnInterval());
}

function startClinicTimers() {
  stopClinicTimers();
  spawnClinicPatient();
  restartClinicSpawnTimer();
  clinicNurseTimer = setInterval(tickClinicNurses, 30000);
  clinicUiTimer    = setInterval(() => {
    // gentle health decay
    G.clinic.villageHealth = Math.max(0, (G.clinic.villageHealth || 50) - 0.05);
    renderClinic();
  }, 5000);
}

function stopClinicTimers() {
  clearInterval(clinicPatientTimer);
  clearInterval(clinicNurseTimer);
  clearInterval(clinicUiTimer);
  clinicPatientTimer = clinicNurseTimer = clinicUiTimer = null;
}

function renderClinic() {
  const el = id => document.getElementById(id);

  const health = G.clinic.villageHealth || 50;
  if (el("clinic-health-bar"))  el("clinic-health-bar").style.width  = health.toFixed(1) + "%";
  if (el("clinic-health-pct"))  el("clinic-health-pct").textContent  = Math.floor(health) + "%";
  if (el("clinic-gold"))        el("clinic-gold").textContent        = `💰 ${Math.floor(G.clinic.gold || 0)}`;
  if (el("clinic-rep"))         el("clinic-rep").textContent         = `⭐ ${Math.floor(G.clinic.reputation || 0)}`;
  if (el("clinic-healed"))      el("clinic-healed").textContent      = `❤️ ${G.clinic.patientsHealed || 0}`;

  const patients = G.clinic.waitingPatients || [];
  const maxRooms = clinicRooms();
  if (el("clinic-waiting-label")) el("clinic-waiting-label").textContent = `Wartezimmer: ${patients.length}/${maxRooms}`;
  const listEl = el("clinic-waiting-list");
  if (listEl) {
    listEl.innerHTML = patients.length
      ? patients.map(p => `
          <button class="clinic-patient-btn" onclick="consultPatient('${p.id}')">
            <span class="clinic-pt-emoji">${p.emoji}</span>
            <div class="clinic-pt-info">
              <div class="clinic-pt-name">${p.name}</div>
              <div class="clinic-pt-complaint">${p.complaint}</div>
            </div>
            <span class="clinic-pt-action">Behandeln →</span>
          </button>`).join("")
      : `<div class="clinic-empty">Kein Patient wartet — kommen bald…</div>`;
  }

  const upgEl = el("clinic-upgrades-list");
  if (upgEl) {
    const gold = G.clinic.gold || 0;
    upgEl.innerHTML = CLINIC_UPGRADES.map(u => {
      const lvl    = G.clinic.upgrades[u.id] || 0;
      const maxed  = lvl >= u.max;
      const cost   = Math.ceil(u.baseCost * Math.pow(1.6, lvl));
      const canBuy = gold >= cost && !maxed;
      return `<div class="clinic-upgrade">
        <div class="clinic-upg-info">
          <span>${u.emoji} ${u.name}${lvl ? ` <span class="clinic-upg-lvl">Stufe ${lvl}/${u.max}</span>` : ""}</span>
          <div class="clinic-upg-desc">${u.desc}</div>
        </div>
        <button class="clinic-buy-btn${canBuy ? "" : " clinic-buy-btn--off"}"
          onclick="buyClinicUpgrade('${u.id}')" ${canBuy ? "" : "disabled"}>
          ${maxed ? "✓ Max" : `${cost} 💰`}
        </button>
      </div>`;
    }).join("");
  }

  // Tower panel (only if visible)
  if (!el("clinic-panel-tower")?.hidden) renderKnowledgeTower();
}

/* ══════════════════════════════════════════════════════════
   MODE C — KNOWLEDGE TOWER (SVG, inside Clinic)
══════════════════════════════════════════════════════════ */
function renderKnowledgeTower() {
  const wrap = document.getElementById("clinic-tower-svg-wrap");
  if (!wrap) return;

  const beds = PACK_CONTENT.beds;
  const PAD = 10, BAR_H = 28, GAP = 5, W = 340;
  const H   = beds.length * (BAR_H + GAP) + PAD * 2 + 24;

  let svg = `<svg width="100%" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <text x="${PAD}" y="18" font-size="11" fill="#666" font-family="sans-serif">Kapitel — Fortschritt</text>`;

  beds.forEach((bed, i) => {
    const ch   = G.chapters[bed.id];
    const allQ = bed.plants.flatMap(p => [...(p.harvestQuestions || []), ...(p.phase4Questions || [])]);
    const tot  = allQ.length;
    const mast = allQ.filter(q => isQuestionMastered(ch?.questions?.[q.id])).length;
    const pct  = tot > 0 ? mast / tot : 0;
    const isActive  = ch?.activated;
    const isMastered= pct >= 1 && tot > 0;

    const y    = PAD + 24 + i * (BAR_H + GAP);
    const barW = W - PAD * 2 - 52;
    const fillW= barW * pct;
    const bg   = isActive ? "#2a2a2a" : "#1a1a1a";
    const fill = isMastered ? "#f0c040"
               : pct > 0.6  ? "#5cca6e"
               : pct > 0.3  ? "#e8a020"
               : pct > 0    ? "#c04040"
               : "#333";
    const label= bed.title.length > 22 ? bed.title.slice(0, 20) + "…" : bed.title;
    const textCol = pct > 0.4 ? "#fff" : "#888";

    svg += `
      <rect x="${PAD}" y="${y}" width="${barW}" height="${BAR_H}" rx="4" fill="${bg}"/>
      ${fillW > 0 ? `<rect x="${PAD}" y="${y}" width="${fillW.toFixed(1)}" height="${BAR_H}" rx="4" fill="${fill}"/>` : ""}
      <text x="${PAD + 6}" y="${y + BAR_H / 2 + 4}" font-size="10" fill="${textCol}" font-family="sans-serif">${label}</text>
      <text x="${PAD + barW + 4}" y="${y + BAR_H / 2 + 4}" font-size="10" fill="#aaa" font-family="sans-serif">${mast}/${tot}</text>`;
  });

  svg += `</svg>`;
  wrap.innerHTML = svg;
}

/* ══════════════════════════════════════════════════════════
   MODE SWITCHING — top tabs (Alräunchen / Spiele) + game sub-tabs
══════════════════════════════════════════════════════════ */
function switchTopTab(tab) {
  const tamaEl  = document.getElementById("screen-tama");
  const gamesEl = document.getElementById("screen-games");

  if (tamaEl)  tamaEl.hidden = tab !== "tama";
  // Use style.display for gamesEl because its CSS `display:flex` overrides the `hidden` attribute
  if (gamesEl) gamesEl.style.display = tab === "games" ? "" : "none";

  document.querySelectorAll(".top-tab").forEach(btn => btn.classList.remove("top-tab--active"));
  document.getElementById(`top-tab-${tab}`)?.classList.add("top-tab--active");

  if (tab === "tama") {
    // Games are only "active" while their tab is open — pause everything else
    stopClickerTick();
    stopClinicTimers();
    renderTamagotchi();
  } else {
    switchGameMode(G.activeGameMode || "tavern");
  }

  G.activeMode = tab;
  saveState();
}
window.switchTopTab = switchTopTab;

function switchGameMode(mode) {
  // Tavern uses the swipe screen-container; others use mode-screen divs
  const tavernEl  = document.getElementById("screen-container");
  const clickerEl = document.getElementById("screen-clicker");
  const clinicEl  = document.getElementById("screen-clinic");

  // Use style.display for tavernEl because its CSS `display:flex` overrides the `hidden` attribute
  if (tavernEl)  tavernEl.style.display  = mode === "tavern"  ? "" : "none";
  if (clickerEl) clickerEl.hidden = mode !== "clicker";
  if (clinicEl)  clinicEl.hidden  = mode !== "clinic";

  document.querySelectorAll("#mode-tabs .mode-tab").forEach(btn => btn.classList.remove("mode-tab--active"));
  document.getElementById(`mode-tab-${mode}`)?.classList.add("mode-tab--active");

  // Start/stop timers per mode
  if (mode === "clicker") { startClickerTick(); renderClicker(); }
  else                      stopClickerTick();

  if (mode === "clinic")  { startClinicTimers(); renderClinic(); }
  else                      stopClinicTimers();

  G.activeGameMode = mode;
  saveState();
}
window.switchGameMode = switchGameMode;

/* ══════════════════════════════════════════════════════════
   BOOT
══════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  if (typeof PACK_CONTENT === "undefined") {
    document.body.innerHTML = `<div style="color:#fff;padding:2rem;font-family:sans-serif;font-size:0.9rem;text-align:center">
      <p>📡 Verbindung unterbrochen — die Spieldaten konnten nicht vollständig geladen werden.</p>
      <p style="opacity:0.7;font-size:0.8rem">Dein Spielstand ist nicht betroffen.</p>
      <button onclick="location.reload()" style="padding:0.6rem 1.2rem;font-size:1rem;margin-top:1rem">Neu laden</button>
    </div>`;
    return;
  }

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
      showStarterSelect();
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

  // Top tabs (Alräunchen / Spiele)
  document.getElementById("top-tab-tama")?.addEventListener("click",  () => switchTopTab("tama"));
  document.getElementById("top-tab-games")?.addEventListener("click", () => switchTopTab("games"));

  // Game sub-tabs (Taverne / Wissen / Klinik)
  document.querySelectorAll("#mode-tabs .mode-tab").forEach(btn => {
    btn.addEventListener("click", () => switchGameMode(btn.id.replace("mode-tab-", "")));
  });

  // Clicker study button
  document.getElementById("clicker-study-btn")?.addEventListener("click", clickerStudy);

  // Alräunchen feed button
  document.getElementById("tama-feed-btn")?.addEventListener("click", feedTamagotchiStudy);

  // Clinic panel tabs
  document.querySelectorAll("[data-clinic-tab]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-clinic-tab]").forEach(b => b.classList.remove("tab-btn--active"));
      btn.classList.add("tab-btn--active");
      const tab = btn.dataset.clinicTab;
      document.querySelectorAll(".clinic-panel").forEach(p => { p.hidden = true; });
      const panel = document.getElementById(`clinic-panel-${tab}`);
      if (panel) panel.hidden = false;
      if (tab === "tower") renderKnowledgeTower();
    });
  });

  // Load game state and render — after listeners so a crash doesn't lose them
  try {
    G = loadState();
    if (!G.tamagotchi.species) {
      renderAll();
      switchTopTab("tama");
      showStarterSelect();
    } else {
      checkTamagotchiDay();
      renderAll();
      switchTopTab(G.activeMode || "tama");
    }
  } catch (e) {
    const stack = (e.stack || "").split("\n").slice(0, 8).join("<br>");
    document.body.innerHTML = `<div style="color:#fff;padding:2rem;font-family:sans-serif;font-size:0.8rem"><b>Ladefehler:</b> ${e.message}<br><br>${stack}<br><br>
      <button onclick="location.reload()" style="padding:0.5rem 1rem;font-size:1rem">Neu laden (Spielstand bleibt)</button>
      <br><br>
      <button onclick="if(confirm('Spielstand wirklich löschen?')){localStorage.clear();location.reload()}" style="padding:0.5rem 1rem;font-size:0.8rem;opacity:0.7">Spielstand löschen &amp; zurücksetzen</button></div>`;
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

  const _cleaningScreen = document.getElementById("screen-cleaning");
  if (_cleaningScreen) {
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        renderCleaningScreen();
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
