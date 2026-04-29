const SAVE_KEY = "kg_rpg_mvp_v6";
const COOLDOWN_MS_NORMAL = 5 * 60 * 1000;
const COOLDOWN_MS_DEV_FAST = 10 * 1000;
const HARVEST_PASS_RATE = 0.7;
const INITIAL_UNLOCK_SLOTS = 2;
const MAX_ACTIVE_BEDS = 2;
const EXAM_DEADLINE = new Date('2028-02-01').getTime();
const DAILY_GOAL = 3;
const SEED_BEDS = PACK_CONTENT.beds;
const PHASE2_UNSEEN_SCORE = 20;
const PHASE2_WRONG_SCORE = 10;
const PHASE2_MAX_WRONG_PER_QUESTION = 3;
const STOP_WORDS = new Set(["und", "der", "die", "das", "des", "den", "dem", "mit", "von", "im", "in", "am", "an", "zu", "zur", "für"]);
const POT_COLORS = {
  zytologie: "#c97d3a",
  histologie_1032: "#4e7db8",
  knochenlehre_1033: "#8a7a5a",
  muskellehre_1034: "#c44d4d",
  atmungssystem_1035: "#4aabb0",
  hybrid: "#8e5ab8"
};

// Per-bed plant color schemes: stemHi/stemLo = stem+branch gradient, fruitHi/fruitLo = fruit dots
// Hybrids inherit stem from source bed 1, fruit from source bed 2
const BED_PLANT_COLORS = {
  zytologie:     { stemHi: "#c8903a", stemLo: "#7a4e18", fruitHi: "#f0c840", fruitLo: "#b08010" },
  histologie:    { stemHi: "#78b0e0", stemLo: "#2850a0", fruitHi: "#b080f0", fruitLo: "#6030c0" },
  knochenlehre:  { stemHi: "#a8b890", stemLo: "#5a6a48", fruitHi: "#d8c060", fruitLo: "#908020" },
  muskellehre:   { stemHi: "#d87878", stemLo: "#903030", fruitHi: "#f05050", fruitLo: "#c01010" },
  atmungssystem: { stemHi: "#70d0d8", stemLo: "#247878", fruitHi: "#88d0f8", fruitLo: "#2878b8" },
  debug:         { stemHi: "#ff44cc", stemLo: "#cc0099", fruitHi: "#44ff44", fruitLo: "#118811" },
};
const DEFAULT_PLANT_COLORS = { stemHi: "#7fc98a", stemLo: "#2f6b3d", fruitHi: "#ff8f8f", fruitLo: "#cf2f2f" };

const CHANGELOG_VERSION = "0.4";
const CHANGELOG_KEY = `kg_changelog_seen_${CHANGELOG_VERSION}`;
const CHANGELOG = [
  { type: "new",     text: "Neues Garten-Layout: alle Themenbeete gleichzeitig sichtbar (Plant Tycoon-Stil), kein Weltnavigieren mehr nötig" },
  { type: "new",     text: "Jedes Thema hat eigene Pflanzenfarben – Zytologie orange, Histologie blau, Knochen graugrün, Muskeln rot, Atmung türkis" },
  { type: "new",     text: "Hybridpflanzen übernehmen Stammfarbe von Elternteil 1 und Fruchtfarbe von Elternteil 2" },
  { type: "new",     text: "Labor zeigt jetzt für jeden Hybriden welche Quellpflanzen noch fehlen (✓/✗), gesperrte Hybride haben einen Hinweis-Button" },
  { type: "new",     text: "Beet-Statistiken pro Regal: gepflanzt, geerntet, gelernte/falsche/offene Fragen" },
  { type: "improve", text: "Ernte: alle Fragen müssen richtig beantwortet werden – falsche Fragen gehen gezielt zurück in Phase 2, keine Pauschalstrafe mehr" },
  { type: "improve", text: "Pflanzen-Katalog zeigt beim Klick auf leeren Topf nur Pflanzen des passenden Themas" },
  { type: "improve", text: "Pflanzenzweige wachsen jetzt alternierend links/rechts, Früchte sitzen korrekt an den Astspitzen" },
  { type: "fix",     text: "Phase-2-Fragen mit MC-Format wurden als 'undefined' angezeigt – behoben" },
  { type: "fix",     text: "Wachstumsbalken stieg fälschlicherweise bei falschen Antworten – behoben" },
  { type: "fix",     text: "5 Fragen hatten mehrere richtige Antworten in Einzelauswahl-Format – korrigiert" }
];

let state = loadState();
let selectedPlantId = null;
let harvestSession = null;
let phase2Session = null;
let potionSoundPlayedAt = 0;
let expandedSeedCatalogBedId = null;
let catalogFilterBedId = null;
let showHarvestedInSelector = false;
let expandedHarvestedBedIds = new Set();
let phase1ShowingLesson = false;
let labelSession = null;
let uiViewMode = "full";
let uiViewSection = "seed";
let lastFaviconSignature = "";

// ── Audio system ──
let sfxMuted = false;
let musicMuted = false;
let sfxVolume = 1.0;
const sfxCache = {};
const prevPlantSoundStates = {}; // plantId → { harvestable, cooldownDone }

const bgMusic = new Audio("assets/music/backgroundmusic.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.10;
let bgMusicStarted = false;

function startBgMusic() {
  if (bgMusicStarted || musicMuted) return;
  bgMusicStarted = true;
  bgMusic.play().catch(() => { bgMusicStarted = false; });
}

// Start on first user interaction (browser autoplay policy)
document.addEventListener("click", () => startBgMusic(), { once: true });

// Global UI click sound for all buttons
document.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (btn && !btn.disabled) playSound("ui_confirm.mp3");
});

function getAudio(path) {
  if (!sfxCache[path]) sfxCache[path] = new Audio(path);
  return sfxCache[path];
}

// Per-sound volume multipliers to normalize loudness differences
const SOUND_VOLUMES = {
  "ui_confirm.mp3":          0.40,
  "twinkle.mp3":             0.70,
  "twinkle done.mp3":        0.75,
  "watering can.mp3":        0.70,
  "trim.mp3":                0.70,
  "soil and fertilizer.mp3": 0.70,
  "harvest.mp3":             0.75,
  "wrong.mp3":               0.60,
  "potion.mp3":              0.18,
};

function playSound(filename) {
  if (sfxMuted) return;
  const audio = getAudio(`assets/music/${filename}`);
  audio.currentTime = 0;
  audio.volume = Math.min(1, sfxVolume * (SOUND_VOLUMES[filename] ?? 0.75));
  audio.play().catch(() => {});
}

function mcBtnClass(fullLabel) {
  return fullLabel.length <= 28 ? "mc-option--short" : "";
}

const els = {
  playerStats: document.getElementById("player-stats"),
  seedLibrary: document.getElementById("seed-library"),
  curriculumStatus: document.getElementById("curriculum-status"),
  devModeBtn: document.getElementById("dev-mode-btn"),
  cooldownInfo: document.getElementById("cooldown-info"),
  plantDetail: document.getElementById("plant-detail"),
  leftPanelVisual: document.getElementById("left-panel-visual"),
  gardenRoom: document.getElementById("garden-room"),
  saveBtn: document.getElementById("save-btn"),
  exportBtn: document.getElementById("export-btn"),
  importBtn: document.getElementById("import-btn"),
  importFileInput: document.getElementById("import-file-input"),
  resetBtn: document.getElementById("reset-btn"),
  labStatus: document.getElementById("lab-status"),
  labList: document.getElementById("lab-list")
};
const PLANT_LABELS = buildPlantLabels();

bindEvents();
renderAll();
startCooldownTicker();
maybeShowChangelog();

function normalizeExplanation(text) {
  return String(text || "")
    .replace(/^\s*(Diese Aussage ist (falsch|korrekt|richtig)\.?\s*|Korrekt\.?|Richtig\.?|Falsch\.?)\s*/i, "")
    .trim();
}

function phase1Feedback(_ok, solution) {
  return normalizeExplanation(solution) || "Begründung fehlt noch für diese Karte.";
}

function normalizeStatement(text) {
  return String(text || "").replace(/\s+/g, " ").trim().replace(/[.?!]+$/, "");
}

function escapeHtmlAttr(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeHtmlText(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function tfFeedback(question, _userAnswer) {
  const custom = normalizeExplanation(question && question.explanation);
  if (custom) return custom;
  const stmt = normalizeStatement(question && question.statement);
  if (!stmt) return "";
  return question.answer === true ? stmt : `Falsch: ${stmt}`;
}

function showChangelog() {
  let overlay = document.getElementById("kg-changelog-overlay");
  if (overlay) {
    overlay.hidden = false;
    return;
  }
  overlay = document.createElement("div");
  overlay.id = "kg-changelog-overlay";
  overlay.className = "kg-changelog-overlay";

  const items = CHANGELOG.map((c) =>
    `<li class="kg-cl-item kg-cl-item--${c.type}">${escapeHtmlText(c.text)}</li>`
  ).join("");

  const modal = document.createElement("div");
  modal.className = "kg-changelog-modal";
  modal.innerHTML = `
    <div class="kg-cl-header">
      <span class="kg-cl-title">Was ist neu?</span>
      <span class="kg-cl-version">Version ${escapeHtmlText(CHANGELOG_VERSION)}</span>
    </div>
    <ul class="kg-cl-list">${items}</ul>
    <div class="kg-cl-footer">
      <button id="kg-changelog-close">Verstanden</button>
    </div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  document.getElementById("kg-changelog-close").addEventListener("click", closeChangelog);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeChangelog(); });
}

function closeChangelog() {
  const overlay = document.getElementById("kg-changelog-overlay");
  if (overlay) overlay.hidden = true;
  localStorage.setItem(CHANGELOG_KEY, "1");
}

function maybeShowChangelog() {
  if (!localStorage.getItem(CHANGELOG_KEY)) showChangelog();
}

function showToast(message, type) {
  let toast = document.getElementById("kg-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "kg-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = "kg-toast" + (type ? " kg-toast--" + type : "");
  toast.hidden = false;
  clearTimeout(toast._kgTimer);
  toast._kgTimer = setTimeout(function () { toast.hidden = true; }, 3500);
}

function bindEvents() {
  els.saveBtn.addEventListener("click", () => {
    saveState();
    showToast("Gespeichert.", "success");
  });

  const changelogBtn = document.getElementById("changelog-btn");
  if (changelogBtn) changelogBtn.addEventListener("click", showChangelog);

  els.exportBtn.addEventListener("click", () => {
    exportStateToFile();
  });

  els.importBtn.addEventListener("click", () => {
    els.importFileInput.value = "";
    els.importFileInput.click();
  });

  els.importFileInput.addEventListener("change", () => {
    const file = els.importFileInput.files && els.importFileInput.files[0];
    if (!file) return;
    importStateFromFile(file);
  });

  els.devModeBtn.addEventListener("click", () => {
    state.settings.devFastMode = !isDevFastMode();
    saveState();
    renderAll();
  });

  els.resetBtn.addEventListener("click", () => {
    const ok = confirm("Gesamten lokalen Fortschritt zurücksetzen?");
    if (!ok) return;
    state = createInitialState();
    selectedPlantId = null;
    phase2Session = null;
    harvestSession = null;
    labelSession = null;
    saveState();
    renderAll();
  });

  const muteMusicBtn = document.getElementById("mute-music-btn");
  const muteSfxBtn = document.getElementById("mute-sfx-btn");
  if (muteMusicBtn) muteMusicBtn.addEventListener("click", () => {
    musicMuted = !musicMuted;
    muteMusicBtn.classList.toggle("muted-active", musicMuted);
    if (musicMuted) {
      bgMusic.pause();
    } else {
      bgMusicStarted = false;
      startBgMusic();
    }
  });
  if (muteSfxBtn) muteSfxBtn.addEventListener("click", () => {
    sfxMuted = !sfxMuted;
    muteSfxBtn.classList.toggle("muted-active", sfxMuted);
  });

  const musicVolumeSlider = document.getElementById("music-volume");
  const sfxVolumeSlider = document.getElementById("sfx-volume");
  if (musicVolumeSlider) musicVolumeSlider.addEventListener("input", () => {
    bgMusic.volume = musicVolumeSlider.value / 100;
  });
  if (sfxVolumeSlider) sfxVolumeSlider.addEventListener("input", () => {
    sfxVolume = sfxVolumeSlider.value / 100;
  });
}

function setActiveBed(bedId) {
  if (bedId && !canActivateBedForPlanting(bedId)) {
    showToast(`Maximal ${MAX_ACTIVE_BEDS} aktive Beete mit Pflanzen gleichzeitig.`, "error");
    return;
  }
  state.activeBedId = bedId || null;
  selectedPlantId = null;
  phase2Session = null;
  harvestSession = null;
  labelSession = null;
  saveState();
  renderAll();
}

function createEmptyPlantState(plantId) {
  return {
    id: plantId,
    phase: 1,
    phase1Completed: false,
    phase1StepsDone: { soil: false, seed: false, water: false },
    phase1ActiveStep: null,
    readiness: 0,
    readinessActionsUsed: 0,
    phase2Questions: {},
    phase2SeqStep: 0,
    phase2Withered: false,
    harvestedOnce: false,
    cooldownUntil: null,
    weakpoints: {},
    status: "growing"
  };
}

function buildBedsState() {
  const beds = {};
  PACK_CONTENT.beds.forEach((bed) => {
    const plants = {};
    bed.plants.forEach((p) => {
      plants[p.id] = createEmptyPlantState(p.id);
    });
    beds[bed.id] = {
      id: bed.id,
      title: bed.title,
      plants,
      activePlantIds: [],
      restaurantUnlocked: false
    };
  });
  return beds;
}

function createInitialState() {
  return {
    version: 2,
    settings: {
      devFastMode: false
    },
    activePackId: "heilpraktiker",
    activeBedId: null,
    packs: {
      heilpraktiker: {
        player: {
          xp: 0,
          level: 1,
          fruits: 0,
          fertilizer: 3,
          studyMode: "normal"
        },
        bedProgress: {
          unlockSlots: SEED_BEDS.length,
          unlockedBedIds: SEED_BEDS.map((b) => b.id)
        },
        beds: buildBedsState(),
        lab: {
          discoveredHybrids: []
        },
        stats: {
          harvestAttempts: 0,
          harvestSuccesses: 0,
          streak: 0,
          lastStreakDate: null,
          firstPlayDate: null,
          dailyActions: 0,
          dailyDate: null,
          prevStreak: 0,
          streakBrokenDate: null,
          lastStreakBought: null
        },
        weakpoints: {}
      }
    }
  };
}

function loadState() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return createInitialState();
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== 2) return createInitialState();
    return normalizeLoadedState(parsed);
  } catch (_) {
    return createInitialState();
  }
}

function normalizeLoadedState(inputState) {
  const s = inputState || createInitialState();
  const pack = s.packs?.[s.activePackId];
  if (!pack || !pack.beds) return s;
  if (!pack.lab) pack.lab = { discoveredHybrids: [] };
  if (!pack.stats) pack.stats = {};
  pack.stats.streak          = pack.stats.streak          ?? 0;
  pack.stats.lastStreakDate  = pack.stats.lastStreakDate  ?? null;
  pack.stats.firstPlayDate   = pack.stats.firstPlayDate   ?? null;
  pack.stats.dailyActions    = pack.stats.dailyActions    ?? 0;
  pack.stats.dailyDate       = pack.stats.dailyDate       ?? null;
  pack.stats.prevStreak      = pack.stats.prevStreak      ?? 0;
  pack.stats.streakBrokenDate = pack.stats.streakBrokenDate ?? null;
  pack.stats.lastStreakBought = pack.stats.lastStreakBought ?? null;
  const hybridIds = PACK_CONTENT.lab.hybrids.map((h) => h.id);
  PACK_CONTENT.beds.forEach((bed) => {
    if (!pack.beds[bed.id]) {
      // New bed added to content after this save was created — initialise it
      const plants = {};
      bed.plants.forEach((p) => { plants[p.id] = createEmptyPlantState(p.id); });
      pack.beds[bed.id] = { id: bed.id, title: bed.title, plants, activePlantIds: [], restaurantUnlocked: false };
    }
    const bedState = pack.beds[bed.id];
    const validIds = [...bed.plants.map((p) => p.id), ...hybridIds];
    const current = Array.isArray(bedState.activePlantIds) ? bedState.activePlantIds : [];
    bedState.activePlantIds = [...new Set(current.filter((id) => validIds.includes(id)))].slice(0, 4);
    if (!bedState.plants) bedState.plants = {};
    bed.plants.forEach((p) => {
      if (!bedState.plants[p.id]) bedState.plants[p.id] = createEmptyPlantState(p.id);
    });
  });
  return s;
}

function saveState() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

function exportStateToFile() {
  const snapshot = {
    format: "kg_rpg_save",
    schemaVersion: 1,
    saveKey: SAVE_KEY,
    exportedAt: new Date().toISOString(),
    state
  };
  const json = JSON.stringify(snapshot, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const a = document.createElement("a");
  a.href = url;
  a.download = `kg-rpg-save-${stamp}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function parseImportedPayload(raw) {
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (_) {
    return { ok: false, reason: "JSON ungültig." };
  }

  if (!parsed || typeof parsed !== "object") {
    return { ok: false, reason: "Dateiinhalt ist kein gültiges Objekt." };
  }

  const candidate = parsed.state && typeof parsed.state === "object" ? parsed.state : parsed;
  if (!candidate || candidate.version !== 2 || !candidate.packs || !candidate.activePackId) {
    return { ok: false, reason: "Kein kompatibler Spielstand (Version 2) gefunden." };
  }

  return { ok: true, state: normalizeLoadedState(candidate) };
}

function importStateFromFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    const text = String(reader.result || "");
    const parsed = parseImportedPayload(text);
    if (!parsed.ok) {
      showToast(`Import fehlgeschlagen: ${parsed.reason}`, "error");
      return;
    }

    const ok = confirm("Import bestätigen? Aktueller lokaler Spielstand wird überschrieben.");
    if (!ok) return;

    state = parsed.state;
    selectedPlantId = null;
    phase2Session = null;
    harvestSession = null;
    restaurantSession = null;
    labelSession = null;
    saveState();
    renderAll();
    showToast("Import erfolgreich.", "success");
  };
  reader.onerror = () => {
    showToast("Import fehlgeschlagen: Datei konnte nicht gelesen werden.", "error");
  };
  reader.readAsText(file, "utf-8");
}

function getPackState() {
  return state.packs[state.activePackId];
}

function getBedProgress() {
  return getPackState().bedProgress;
}

function isBedUnlocked(bedId) {
  return getBedProgress().unlockedBedIds.includes(bedId);
}

function getActiveBedContent() {
  if (!state.activeBedId || !isBedUnlocked(state.activeBedId)) return null;
  return PACK_CONTENT.beds.find((b) => b.id === state.activeBedId) || null;
}

function getBedState() {
  const bed = getActiveBedContent();
  if (!bed) return null;
  return getPackState().beds[bed.id];
}

function getPlantContent(plantId) {
  const bed = getActiveBedContent();
  if (bed) {
    const found = bed.plants.find((p) => p.id === plantId);
    if (found) return found;
  }
  return PACK_CONTENT.lab.hybrids.find((h) => h.id === plantId) || null;
}

function getPlantContentByBed(bedId, plantId) {
  const bed = PACK_CONTENT.beds.find((b) => b.id === bedId);
  if (bed) {
    const found = bed.plants.find((p) => p.id === plantId);
    if (found) return found;
  }
  return PACK_CONTENT.lab.hybrids.find((h) => h.id === plantId) || null;
}

function getActivePlantIdsForBed(bedId) {
  const pack = getPackState();
  return pack?.beds?.[bedId]?.activePlantIds || [];
}

function getActiveBedsWithPlantsCount() {
  const pack = getPackState();
  return PACK_CONTENT.beds.filter((bed) => {
    const ids = pack?.beds?.[bed.id]?.activePlantIds || [];
    return ids.length > 0;
  }).length;
}

function isBedActiveWithPlants(bedId) {
  return getActivePlantIdsForBed(bedId).length > 0;
}

function canActivateBedForPlanting(bedId) {
  if (!bedId) return false;
  if (isBedActiveWithPlants(bedId)) return true;
  return getActiveBedsWithPlantsCount() < MAX_ACTIVE_BEDS;
}

function getWorldBedSummaries() {
  const pack = getPackState();
  return getBedProgress().unlockedBedIds
    .map((id) => PACK_CONTENT.beds.find((b) => b.id === id))
    .filter(Boolean)
    .map((bed) => ({
      id: bed.id,
      title: bed.title,
      activeCount: (pack.beds[bed.id]?.activePlantIds || []).length
    }));
}

function getWorldVisibleBeds() {
  const progress = getBedProgress();
  const all = getWorldBedSummaries();
  const maxVisible = Math.min(MAX_ACTIVE_BEDS, progress.unlockSlots || 0);
  const ordered = progress.unlockedBedIds
    .map((id) => all.find((b) => b.id === id))
    .filter(Boolean);
  return ordered.slice(0, maxVisible);
}

function getPlantVisualState(plantContent, plantState) {
  if (!plantContent || !plantState) {
    return {
      phase: "phase1",
      showInWorld: false,
      soilFilled: false,
      soilDark: false,
      hasSeedling: false,
      growth: 0.3,
      fruitCount: 0,
      withered: false
    };
  }
  const steps = plantState.phase1StepsDone || {};
  const phase1Done = Boolean(plantState.phase1Completed);
  const totalQ = (plantContent.harvestQuestions || []).length;
  const phase2 = plantState.phase2Questions || {};
  const now = Date.now();
  const onCooldown = Boolean(plantState.cooldownUntil && now < plantState.cooldownUntil);

  if (!phase1Done) {
    const done = Object.values(steps).filter(Boolean).length;
    return {
      phase: "phase1",
      showInWorld: false,
      soilFilled: Boolean(steps.soil),
      soilDark: Boolean(steps.water),
      hasSeedling: Boolean(steps.seed),
      growth: 0.25 + (done * 0.15),
      fruitCount: 0,
      withered: false
    };
  }

  ensurePhase2Tracking(plantContent, plantState);
  const learnedCount = (plantContent.harvestQuestions || []).filter((q) => phase2[q.id]?.status === "learned").length;
  const allLearned = totalQ > 0 && learnedCount >= totalQ;
  const maxReadiness = Math.max(1, totalQ * PHASE2_UNSEEN_SCORE);
  const readiness = computePhase2Readiness(plantContent, plantState);
  const learnedRatio = 1 - Math.min(1, readiness / maxReadiness);
  const withered = Boolean(plantState.phase2Withered);

  if (allLearned) {
    if (onCooldown) {
      const cooldownMs = Math.max(1, getCooldownMs());
      const rem = Math.max(0, plantState.cooldownUntil - now);
      const cooldownProgress = Math.max(0, Math.min(1, 1 - (rem / cooldownMs)));
      const growingFruits = Math.max(1, Math.round(totalQ * (0.35 + cooldownProgress * 0.65)));
      return {
        phase: "phase2_final",
        showInWorld: true,
        soilFilled: true,
        soilDark: true,
        hasSeedling: false,
        growth: withered ? 0.8 : (1.02 + cooldownProgress * 0.18),
        fruitCount: growingFruits,
        withered
      };
    }
    return {
      phase: "phase3",
      showInWorld: true,
      soilFilled: true,
      soilDark: true,
      hasSeedling: false,
      growth: withered ? 0.85 : 1.2,
      fruitCount: Math.max(1, learnedCount),
      withered
    };
  }

  return {
    phase: "phase2",
    showInWorld: true,
    soilFilled: true,
    soilDark: true,
    hasSeedling: false,
    growth: withered ? 0.45 : (0.55 + (learnedRatio * 0.5)),
    fruitCount: 0,
    withered
  };
}

function getWorldPlantGrowth(plantContent, plantState) {
  const visual = getPlantVisualState(plantContent, plantState);
  return Math.max(0.2, Math.min(1.5, Number(visual.growth || 0.35)));
}

function getWorldBedDetails() {
  const pack = getPackState();
  const visible = getWorldVisibleBeds();
  return visible.map((bedMeta) => {
    const bedId = bedMeta.id;
    const bedState = pack.beds[bedId];
    const bedContent = PACK_CONTENT.beds.find((b) => b.id === bedId);
    const activeIds = bedState?.activePlantIds || [];
    const plants = activeIds.map((plantId) => {
      const plantState = bedState?.plants?.[plantId];
      const plantContent = (bedContent?.plants || []).find((p) => p.id === plantId) || getPlantContent(plantId);
      const visual = getPlantVisualState(plantContent, plantState);
      const growth = getWorldPlantGrowth(plantContent, plantState);
      return {
        id: plantId,
        label: getPlantLabel(bedId, plantId, plantContent?.title || plantId),
        growth,
        withered: Boolean(plantState?.phase2Withered),
        phase: visual.phase,
        fruitCount: visual.fruitCount || 0,
        showInWorld: Boolean(visual.showInWorld)
      };
    }).filter((p) => p.showInWorld);
    return { ...bedMeta, plants };
  });
}

function isPlantActiveInBed(bedId, plantId) {
  return getActivePlantIdsForBed(bedId).includes(plantId);
}

function ensurePhase2Tracking(plantContent, plantState) {
  if (!plantState.phase2Questions) plantState.phase2Questions = {};
  plantContent.harvestQuestions.forEach((q) => {
    if (!plantState.phase2Questions[q.id]) {
      plantState.phase2Questions[q.id] = {
        status: "unseen",
        wrongCount: 0,
        askedCount: 0
      };
    }
  });
  if (typeof plantState.phase2Withered !== "boolean") {
    plantState.phase2Withered = false;
  }
  if (typeof plantState.phase2SeqStep !== "number") {
    plantState.phase2SeqStep = 0;
  }
}

// Advance phase2SeqStep past steps where all questions are already learned
function advancePhase2SeqStep(plantContent, plantState) {
  if (areAllPhase2QuestionsLearned(plantContent, plantState)) return;
  const actionCount = plantContent.phase2?.length || 1;
  for (let i = 0; i < actionCount; i++) {
    const currentIdx = (plantState.phase2SeqStep || 0) % actionCount;
    const assigned = (plantContent.harvestQuestions || []).filter((_, qi) => qi % actionCount === currentIdx);
    const hasUnlearned = assigned.some(q => (plantState.phase2Questions?.[q.id]?.status || "unseen") !== "learned");
    if (hasUnlearned || assigned.length === 0) break;
    plantState.phase2SeqStep = (plantState.phase2SeqStep || 0) + 1;
  }
}

function computePhase2Readiness(plantContent, plantState) {
  ensurePhase2Tracking(plantContent, plantState);
  let total = 0;
  for (const q of plantContent.harvestQuestions) {
    const stat = plantState.phase2Questions[q.id];
    if (stat.status === "learned") continue;
    total += PHASE2_UNSEEN_SCORE; // wrong answers hold the same debt as unseen — bar only grows on correct answers
  }
  plantState.readiness = total;
  return total;
}

function areAllPhase2QuestionsLearned(plantContent, plantState) {
  ensurePhase2Tracking(plantContent, plantState);
  return plantContent.harvestQuestions.every((q) => plantState.phase2Questions[q.id].status === "learned");
}

function evaluateWither(plantContent, plantState) {
  ensurePhase2Tracking(plantContent, plantState);
  const blocked = plantContent.harvestQuestions.some((q) => {
    const stat = plantState.phase2Questions[q.id];
    return stat.status !== "learned" && stat.wrongCount >= PHASE2_MAX_WRONG_PER_QUESTION;
  });
  plantState.phase2Withered = blocked;
  if (blocked) {
    plantState.status = "withered";
  }
  return blocked;
}

function resetPlantForRedo(plantState) {
  plantState.phase = 1;
  plantState.phase1Completed = false;
  plantState.phase1StepsDone = { soil: false, seed: false, water: false };
  plantState.phase1ActiveStep = null;
  plantState.phase2Questions = {};
  plantState.phase2SeqStep = 0;
  plantState.phase2Withered = false;
  plantState.readiness = 0;
  plantState.readinessActionsUsed = 0;
  plantState.cooldownUntil = null;
  plantState.status = "growing";
}

function preparePlantForNewCycle(plantState) {
  if (!plantState) return;
  const wasHarvested = plantState.harvestedOnce === true;
  resetPlantForRedo(plantState);
  // Keep mastery marker while restarting the active learning cycle.
  plantState.harvestedOnce = wasHarvested;
}

function isDevFastMode() {
  return Boolean(state.settings && state.settings.devFastMode);
}

function getCooldownMs() {
  return isDevFastMode() ? COOLDOWN_MS_DEV_FAST : COOLDOWN_MS_NORMAL;
}

function addXp(amount) {
  getPackState().player.xp += amount;
}

function aggregateWeakpoint(plantId, questionId) {
  const key = `${state.activeBedId}::${plantId}`;
  const pack = getPackState();
  if (!pack.weakpoints[key]) pack.weakpoints[key] = {};
  if (!pack.weakpoints[key][questionId]) pack.weakpoints[key][questionId] = 0;
  pack.weakpoints[key][questionId] += 1;
}

function markWeakpoint(plantId, questionId) {
  const bedState = getBedState();
  if (!bedState) return;
  const plantState = bedState.plants[plantId];
  if (!plantState.weakpoints[questionId]) plantState.weakpoints[questionId] = 0;
  plantState.weakpoints[questionId] += 1;
  aggregateWeakpoint(plantId, questionId);
}

function unlockRestaurantIfNeeded() {
  const pack = getPackState();
  PACK_CONTENT.beds.forEach((bedContent) => {
    const bedState = pack.beds[bedContent.id];
    if (!bedState || bedContent.plants.length === 0) return;
    bedState.restaurantUnlocked = bedContent.plants.every((p) => bedState.plants[p.id]?.harvestedOnce);
  });
}

function renderSeedLibrary() {
  if (!els.seedLibrary) return;
  const progress = getBedProgress();
  const seedProgress = document.getElementById("seed-progress");
  if (seedProgress) seedProgress.textContent = `Freigeschaltete Beete: ${progress.unlockedBedIds.length}/${progress.unlockSlots} Slots belegt | Aktive Beete (mit Pflanzen): ${getActiveBedsWithPlantsCount()}/${MAX_ACTIVE_BEDS}`;

  const canUnlock = progress.unlockedBedIds.length < progress.unlockSlots;
  const pack = getPackState();
  // Hybrid bed only visible once at least one hybrid is discovered
  const bedsToShowAll = catalogFilterBedId ? SEED_BEDS.filter((b) => b.id === catalogFilterBedId) : SEED_BEDS;
  const bedsToShow = bedsToShowAll.filter((b) => b.id !== "hybrid" || pack.lab.discoveredHybrids.length > 0);
  const filterHint = catalogFilterBedId ? `<div class="muted" style="margin-bottom:0.5rem">Zeige nur: <strong>${bedsToShow[0]?.title || catalogFilterBedId}</strong></div>` : "";
  const rows = bedsToShow.map((bed) => {
    const isHybridBed = bed.id === "hybrid";
    // For hybrid bed: use discovered hybrids as the plant list
    const effectivePlants = isHybridBed
      ? PACK_CONTENT.lab.hybrids.filter((h) => pack.lab.discoveredHybrids.includes(h.id))
      : bed.plants;
    const unlocked = isBedUnlocked(bed.id);
    const isOpen = expandedSeedCatalogBedId === bed.id;
    const activeIds = getActivePlantIdsForBed(bed.id);
    const activeCount = activeIds.length;
    const harvestedCount = effectivePlants.filter((p) => pack.beds[bed.id]?.plants?.[p.id]?.harvestedOnce).length;
    const showHarvestedCat   = expandedHarvestedBedIds.has(bed.id);
    const activeCatPlants    = isOpen ? effectivePlants.filter(p =>  activeIds.includes(p.id)) : [];
    const newCatPlants       = isOpen ? effectivePlants.filter(p => !activeIds.includes(p.id) && !pack.beds[bed.id]?.plants?.[p.id]?.harvestedOnce) : [];
    const harvestedCatPlants = isOpen ? effectivePlants.filter(p => !activeIds.includes(p.id) &&  pack.beds[bed.id]?.plants?.[p.id]?.harvestedOnce) : [];
    const visibleCatPlants   = isOpen ? [...activeCatPlants, ...newCatPlants, ...(showHarvestedCat ? harvestedCatPlants : [])] : [];
    const buildPlantRow = (plant) => {
      const pState = pack.beds[bed.id]?.plants?.[plant.id];
      if (!pState) return "";
      const isActive = activeIds.includes(plant.id);
      const status = isActive
        ? { text: "Im Beet", tone: "active" }
        : pState.harvestedOnce
          ? { text: "Geerntet", tone: "done" }
          : { text: "Neu", tone: "bad" };
      const label = getPlantLabel(bed.id, plant.id, plant.title);
      const harvestClass = isActive ? "catalog-row--planted" : pState.harvestedOnce ? "catalog-row--harvested" : "catalog-row--not-harvested";
      const canToggle = unlocked && !isActive && activeCount < 4;
      const actionBtn = isActive
        ? `<button data-seed-plant-toggle="${bed.id}::${plant.id}" style="font-size:0.78rem">Entfernen</button>`
        : canToggle
          ? `<button data-seed-plant-toggle="${bed.id}::${plant.id}" style="font-size:0.78rem">Einsetzen</button>`
          : !unlocked
            ? `<button disabled style="font-size:0.78rem">Beet gesperrt</button>`
            : `<button disabled style="font-size:0.78rem">Beet voll</button>`;
      const moduleLabel = isHybridBed ? `<span class="muted">Hybrid</span>` : `<span class="muted">Modul ${moduleCodeFromBedId(bed.id)}</span>`;
      return `
        <div class="catalog-row ${harvestClass}">
          <span>${label}</span>
          <span class="status-chip ${status.tone}">${status.text}</span>
          ${moduleLabel}
          ${actionBtn}
        </div>
      `;
    };
    const harvestedCatToggle = isOpen && harvestedCatPlants.length > 0
      ? `<div><button data-seed-toggle-harvested="${bed.id}" style="font-size:0.78rem;margin-top:0.3rem">${showHarvestedCat ? 'Geerntete ausblenden' : `Geerntete anzeigen (${harvestedCatPlants.length})`}</button></div>`
      : '';
    const plantRows = isOpen ? visibleCatPlants.map(buildPlantRow).join("") + harvestedCatToggle : "";
    if (unlocked) {
      const bedStats = computeShelfStats(bed, pack.beds[bed.id] || {});
      const activeBtnLabel = state.activeBedId === bed.id ? "Aktives Beet ✓" : "Beet wählen";
      const miniVisuals = activeIds.map((pid) => {
        const pState = pack.beds[bed.id]?.plants?.[pid];
        const pContent = isHybridBed
          ? PACK_CONTENT.lab.hybrids.find((h) => h.id === pid)
          : bed.plants.find((p) => p.id === pid);
        if (!pState || !pContent) return "";
        const plantContent = getPlantContentByBed(bed.id, pid);
        const visualHtml = buildPlantVisualHtml(pState, plantContent, "plant-visual--mini");
        return `<div class="bed-mini-item" data-mini-plant="${pid}" data-mini-bed="${bed.id}">${visualHtml}<div class="bed-mini-label">${escapeHtmlText(pContent.title)}</div></div>`;
      }).filter(Boolean).join("");
      return `
        <div class="list">
          <div class="row">
            <strong>${bed.title}</strong>
            <button data-seed-activate="${bed.id}">${activeBtnLabel}</button>
            <button data-seed-catalog="${bed.id}">${isOpen ? "Sorten ausblenden" : "Sorten anzeigen"}</button>
            <span class="muted">🌱 ${bedStats.planted}/4 · 🌾 ${bedStats.harvested}/${bedStats.totalPlants} · ✓ ${bedStats.qLearned}/${bedStats.qTotal}${bedStats.qWrong > 0 ? ` · ✗ ${bedStats.qWrong}` : ""}</span>
          </div>
          ${miniVisuals ? `<div class="bed-mini-row">${miniVisuals}</div>` : ""}
          ${isOpen ? `<div class="list">${plantRows}</div>` : ""}
        </div>
      `;
    }
    return `
      <div class="list">
        <div class="row">
          <button data-seed-unlock="${bed.id}" ${canUnlock ? "" : "disabled"}>Freischalten: ${bed.title}</button>
          <button data-seed-catalog="${bed.id}">${isOpen ? "Sorten ausblenden" : "Sorten anzeigen"}</button>
          <span class="muted">Aktive Pflanzen: ${activeCount}/4</span>
        </div>
        ${isOpen ? `<div class="list">${plantRows}</div>` : ""}
      </div>
    `;
  });
  els.seedLibrary.innerHTML = filterHint + rows.join("");

  els.seedLibrary.querySelectorAll("[data-seed-unlock]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const bedId = btn.getAttribute("data-seed-unlock");
      const p = getBedProgress();
      if (p.unlockedBedIds.length >= p.unlockSlots) return;
      if (p.unlockedBedIds.includes(bedId)) return;
      p.unlockedBedIds.push(bedId);
      if (!state.activeBedId) state.activeBedId = bedId;
      saveState();
      renderAll();
      closeModal("modal-catalog");
    });
  });

  els.seedLibrary.querySelectorAll("[data-seed-activate]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setActiveBed(btn.getAttribute("data-seed-activate"));
      closeModal("modal-catalog");
    });
  });

  els.seedLibrary.querySelectorAll("[data-mini-plant]").forEach((el) => {
    el.addEventListener("click", () => {
      const bedId = el.getAttribute("data-mini-bed");
      const plantId = el.getAttribute("data-mini-plant");
      setActiveBed(bedId);
      selectedPlantId = plantId;
      phase2Session = null;
      harvestSession = null;
      showMainUi({ mode: "compact", section: "beds" });
    });
  });

  els.seedLibrary.querySelectorAll("[data-seed-catalog]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const bedId = btn.getAttribute("data-seed-catalog");
      expandedSeedCatalogBedId = expandedSeedCatalogBedId === bedId ? null : bedId;
      renderSeedLibrary();
    });
  });

  els.seedLibrary.querySelectorAll("[data-seed-toggle-harvested]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const bedId = btn.getAttribute("data-seed-toggle-harvested");
      if (expandedHarvestedBedIds.has(bedId)) {
        expandedHarvestedBedIds.delete(bedId);
      } else {
        expandedHarvestedBedIds.add(bedId);
      }
      renderSeedLibrary();
    });
  });

  els.seedLibrary.querySelectorAll("[data-seed-plant-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const raw = btn.getAttribute("data-seed-plant-toggle") || "";
      const [bedId, plantId] = raw.split("::");
      if (!bedId || !plantId) return;
      const bedState = getPackState().beds[bedId];
      if (!bedState || !Array.isArray(bedState.activePlantIds)) return;

      const idx = bedState.activePlantIds.indexOf(plantId);
      if (idx >= 0) {
        bedState.activePlantIds.splice(idx, 1);
        if (state.activeBedId === bedId && selectedPlantId === plantId) {
          selectedPlantId = null;
          phase2Session = null;
          harvestSession = null;
        }
        if (state.activeBedId === bedId && bedState.activePlantIds.length === 0) {
          state.activeBedId = null;
        }
      } else {
        if (!isBedUnlocked(bedId)) {
          showToast("Beet zuerst freischalten.", "error");
          return;
        }
        if (bedState.activePlantIds.includes(plantId)) return;
        if (!canActivateBedForPlanting(bedId)) {
          showToast(`Maximal ${MAX_ACTIVE_BEDS} aktive Beete mit Pflanzen gleichzeitig.`, "error");
          return;
        }
        if (bedState.activePlantIds.length >= 4) {
          showToast("Maximal 4 Pflanzen können pro Beet gleichzeitig aktiv sein.", "error");
          return;
        }
        preparePlantForNewCycle(bedState.plants[plantId]);
        bedState.activePlantIds.push(plantId);
        saveState();
        renderAll();
        closeModal("modal-catalog");
        return;
      }

      saveState();
      renderAll();
    });
  });
}

function renderBedTabs() {
  // No-op: bed tabs replaced by garden shelf rows in new layout
}

function isHybridSourceUnlocked(hybrid) {
  const pack = getPackState();
  return (hybrid.sources || []).every((src) => {
    const [bedId, plantId] = src.split("::");
    return pack.beds[bedId]?.plants[plantId]?.harvestedOnce === true;
  });
}

function getLabUnlockProgress() {
  const pack = getPackState();
  const bedsWithHarvest = PACK_CONTENT.beds.filter((bed) =>
    bed.plants.some((p) => pack.beds[bed.id]?.plants?.[p.id]?.harvestedOnce === true)
  ).length;
  return { bedsWithHarvest, requiredBeds: 2 };
}

function isLabUnlocked() {
  const p = getLabUnlockProgress();
  return p.bedsWithHarvest >= p.requiredBeds;
}

function getHybridBedState() {
  return getPackState()?.beds?.["hybrid"] || null;
}

function unlockHybridBed() {
  const pack = getPackState();
  if (!pack.bedProgress.unlockedBedIds.includes("hybrid")) {
    pack.bedProgress.unlockedBedIds.push("hybrid");
  }
}

function synthesizeHybrid(hybridId) {
  const hybrid = PACK_CONTENT.lab.hybrids.find((h) => h.id === hybridId);
  if (!hybrid) return;
  const pack = getPackState();
  const hybridBed = getHybridBedState();
  if (!hybridBed) return;
  if (hybridBed.activePlantIds.length >= 4) { showToast("Hybridbeet ist voll (4/4). Ernte zuerst eine Hybridpflanze.", "error"); return; }
  if (pack.player.fruits < 2) { showToast("Nicht genug Früchte (benötigt: 2).", "error"); return; }
  if (!isHybridSourceUnlocked(hybrid)) { showToast("Quellpflanzen noch nicht vollständig geerntet.", "error"); return; }
  pack.player.fruits -= 2;
  if (!pack.lab.discoveredHybrids.includes(hybridId)) pack.lab.discoveredHybrids.push(hybridId);
  unlockHybridBed();
  if (!hybridBed.plants[hybridId]) hybridBed.plants[hybridId] = createEmptyPlantState(hybridId);
  saveState();
  renderAll();
  showToast(`${hybrid.title} synthetisiert! Jetzt im Pflanzenkatalog unter "Hybrid Beet" verfügbar.`, "success");
}

function plantHybrid(hybridId) {
  const hybridBed = getHybridBedState();
  if (!hybridBed) return;
  unlockHybridBed();
  if (hybridBed.activePlantIds.includes(hybridId)) { showToast("Hybridpflanze ist bereits im Beet.", "error"); return; }
  if (hybridBed.activePlantIds.length >= 4) { showToast("Hybridbeet ist voll (4/4). Ernte zuerst eine Hybridpflanze.", "error"); return; }
  if (!hybridBed.plants[hybridId]) hybridBed.plants[hybridId] = createEmptyPlantState(hybridId);
  hybridBed.activePlantIds.push(hybridId);
  saveState();
  renderAll();
}

function renderLab() {
  const pack = getPackState();
  const hybrids = PACK_CONTENT.lab.hybrids;
  if (!pack) { els.labList.innerHTML = ""; return; }
  const labUnlocked = isLabUnlocked();
  const unlockProg = getLabUnlockProgress();
  const hybridBed = getHybridBedState();
  const activeIds = hybridBed?.activePlantIds || [];
  const isFull = activeIds.length >= 4;

  if (!labUnlocked) {
    els.labStatus.textContent = `Labor gesperrt: ${unlockProg.bedsWithHarvest}/${unlockProg.requiredBeds} Beete mit mindestens 1 Ernte`;
    els.labList.innerHTML = `<div class="muted">Freischaltung: Ernte mindestens eine Pflanze in 2 verschiedenen Beeten.</div>`;
    return;
  }

  const rows = hybrids.map((hybrid) => {
    const isActive = activeIds.includes(hybrid.id);
    const isDiscovered = pack.lab.discoveredHybrids.includes(hybrid.id);
    const sourcesUnlocked = isHybridSourceUnlocked(hybrid);
    const canSynthesize = sourcesUnlocked && !isDiscovered && !isActive && !isFull && pack.player.fruits >= 2;
    const canPlant = isDiscovered && !isActive && !isFull;

    const sourceParts = (hybrid.sources || []).map((src) => {
      const [bedId, plantId] = src.split("::");
      const bed = SEED_BEDS.find((b) => b.id === bedId);
      const plant = bed?.plants.find((p) => p.id === plantId);
      const harvested = pack.beds[bedId]?.plants?.[plantId]?.harvestedOnce === true;
      const plantName = plant?.title || plantId;
      const bedName = bed?.title || bedId;
      return `<span class="lab-source${harvested ? " lab-source--ok" : ""}">${harvested ? "✓" : "✗"} ${plantName} <span class="muted">(${bedName})</span></span>`;
    });

    let statusChip = "";
    let actionBtn = "";
    if (isActive) {
      statusChip = `<span class="status-chip active">Im Beet</span>`;
    } else if (isDiscovered) {
      statusChip = `<span class="status-chip done">Entdeckt</span>`;
      actionBtn = `<button data-lab-plant="${hybrid.id}" ${canPlant ? "" : "disabled"}>Einpflanzen</button>`;
    } else if (sourcesUnlocked) {
      statusChip = `<span class="status-chip active">Synthetisierbar</span>`;
      actionBtn = `<button data-lab-synthesize="${hybrid.id}" ${canSynthesize ? "" : "disabled"}>Synthetisieren (2 Früchte)</button>`;
    } else {
      statusChip = `<span class="status-chip idle">Gesperrt</span>`;
    }
    const isRevealed = isDiscovered || sourcesUnlocked;
    const sourcesHtml = isRevealed
      ? `<div class="lab-sources">${sourceParts.join("")}</div>`
      : `<details class="lab-hint"><summary>Hinweis</summary><div class="lab-sources">${sourceParts.join("")}</div></details>`;
    return `
      <div class="catalog-row catalog-row--hybrid">
        <span>${isRevealed ? hybrid.title : "???"}</span>
        ${statusChip}
        ${actionBtn}
        ${sourcesHtml}
      </div>
    `;
  }).join("");

  els.labStatus.textContent = `Entdeckte Hybride: ${pack.lab.discoveredHybrids.length}/${hybrids.length}`;
  els.labList.innerHTML = rows;

  els.labList.querySelectorAll("[data-lab-synthesize]").forEach((btn) => {
    btn.addEventListener("click", () => synthesizeHybrid(btn.getAttribute("data-lab-synthesize")));
  });
  els.labList.querySelectorAll("[data-lab-plant]").forEach((btn) => {
    btn.addEventListener("click", () => plantHybrid(btn.getAttribute("data-lab-plant")));
  });
}

function renderAll() {
  unlockRestaurantIfNeeded();
  renderPlayer();
  renderGardenRoom();
  renderLeftPanel();
  updateReactiveFavicon();
}

// Pot accent colors: defined at top of file (before initialization) to avoid TDZ crash

function getPotColor(bedId) {
  const id = String(bedId || "").toLowerCase();
  for (const key of Object.keys(POT_COLORS)) {
    if (id.includes(key)) return POT_COLORS[key];
  }
  return "#8a5a30";
}

function getBedPlantColors(bedId) {
  const id = String(bedId || "").toLowerCase();
  for (const key of Object.keys(BED_PLANT_COLORS)) {
    if (id.includes(key)) return BED_PLANT_COLORS[key];
  }
  return DEFAULT_PLANT_COLORS;
}

function getPlantColorScheme(content) {
  if (!content) return DEFAULT_PLANT_COLORS;
  // Per-plant color override (e.g. debug plants)
  if (content.colorOverride) return content.colorOverride;
  // Hybrid: stem+branch from source bed 1, fruits from source bed 2
  if (content.sources && content.sources.length >= 2) {
    const s1 = getBedPlantColors(content.sources[0].split("::")[0]);
    const s2 = getBedPlantColors(content.sources[1].split("::")[0]);
    return { stemHi: s1.stemHi, stemLo: s1.stemLo, fruitHi: s2.fruitHi, fruitLo: s2.fruitLo };
  }
  // Regular plant: find its bed
  for (const bed of PACK_CONTENT.beds) {
    if (bed.plants.some((p) => p.id === content.id)) return getBedPlantColors(bed.id);
  }
  return DEFAULT_PLANT_COLORS;
}

function computeShelfStats(bed, bedState) {
  const pack = getPackState();
  const plants = bed.id === "hybrid"
    ? PACK_CONTENT.lab.hybrids.filter((h) => pack.lab.discoveredHybrids.includes(h.id))
    : (bed.plants || []);
  const totalPlants = plants.length;
  const activePlantIds = bedState.activePlantIds || [];
  const planted = activePlantIds.length;
  let harvested = 0, qLearned = 0, qWrong = 0, qTotal = 0;
  plants.forEach((p) => {
    const ps = bedState.plants?.[p.id];
    if (ps?.harvestedOnce) harvested++;
    const qs = p.harvestQuestions || [];
    qTotal += qs.length;
    qs.forEach((q) => {
      const stat = ps?.phase2Questions?.[q.id]?.status;
      if (stat === "learned") qLearned++;
      else if (stat === "wrong") qWrong++;
    });
  });
  const qOpen = qTotal - qLearned - qWrong;
  return { totalPlants, planted, harvested, qLearned, qWrong, qOpen, qTotal };
}

function renderGardenRoom() {
  if (!els.gardenRoom) return;
  const pack = getPackState();
  const unlockedIds = new Set(getBedProgress().unlockedBedIds);
  const MAX_POTS = 4;

  // Show at most 2 beds: active bed + one other bed with plants.
  const allUnlocked = PACK_CONTENT.beds.filter(b =>
    unlockedIds.has(b.id) && (b.id !== "hybrid" || (pack.lab.discoveredHybrids?.length || 0) > 0)
  );
  const shownBedIds = new Set();
  if (state.activeBedId && allUnlocked.some(b => b.id === state.activeBedId))
    shownBedIds.add(state.activeBedId);
  allUnlocked.forEach(b => {
    if (shownBedIds.size < 2 && !shownBedIds.has(b.id) && (pack.beds[b.id]?.activePlantIds?.length || 0) > 0)
      shownBedIds.add(b.id);
  });
  const gardenBeds = allUnlocked.filter(b => shownBedIds.has(b.id));

  // Fill remaining slots (up to 2) with "choose topic" placeholders
  const emptySlots = Math.max(0, 2 - gardenBeds.length);
  const emptySlotsHtml = Array.from({ length: emptySlots }, () => `
    <div class="garden-shelf garden-shelf--empty-slot">
      <button class="garden-choose-topic-btn" data-open-catalog="1">+ Thema wählen</button>
    </div>`).join("");

  const html = gardenBeds.map((bed) => {
    const bedState = pack.beds[bed.id] || {};
    const activePlantIds = bedState.activePlantIds || [];
    const potColor = getPotColor(bed.id);

    const pots = [];
    // Active plants first
    for (let i = 0; i < MAX_POTS; i++) {
      const plantId = activePlantIds[i];
      if (plantId) {
        const plantState = bedState.plants?.[plantId] || {};
        const content = bed.id === "hybrid"
          ? PACK_CONTENT.lab.hybrids.find((h) => h.id === plantId)
          : bed.plants.find((p) => p.id === plantId);
        const isSelected = selectedPlantId === plantId && state.activeBedId === bed.id;
        const label = content ? (content.title || plantId) : plantId;
        const visualHtml = content ? buildPlantVisualHtml(plantState, content, "plant-visual--garden") : "";

        // Build tool buttons for this plant
        const toolsHtml = buildPotToolsHtml(plantState, content, plantId, bed.id);

        pots.push(`
          <div class="garden-pot has-plant${isSelected ? " is-selected" : ""}"
               data-plant-id="${plantId}" data-bed-id="${bed.id}"
               style="--pot-color:${potColor}"
               title="${label}">
            ${visualHtml}
            ${isSelected ? toolsHtml : ""}
          </div>`);
      } else {
        // Empty pot slot — show + if there are unplanted plants available
        // Hybrid bed: hybrids are added via lab synthesis, not from catalog
        const hasAvailable = bed.id !== "hybrid" && bed.plants.some((p) => !activePlantIds.includes(p.id));
        if (hasAvailable) {
          pots.push(`
            <div class="garden-pot garden-pot--empty"
                 data-add-bed="${bed.id}"
                 style="--pot-color:${potColor}"
                 title="Pflanze einsetzen">
              <div class="empty-pot"></div>
              <span class="empty-pot-plus">+</span>
            </div>`);
        } else {
          pots.push(`
            <div class="garden-pot garden-pot--empty garden-pot--locked"
                 style="--pot-color:${potColor}">
              <div class="empty-pot"></div>
            </div>`);
        }
      }
    }

    const isActiveBed = state.activeBedId === bed.id;
    const stats = computeShelfStats(bed, bedState);
    const statsHtml = `
      <div class="shelf-stats">
        <span class="shelf-stat" title="Aktiv eingepflanzt">🌱 ${stats.planted}/${stats.totalPlants}</span>
        <span class="shelf-stat" title="Mindestens einmal geerntet">🌾 ${stats.harvested}/${stats.totalPlants}</span>
        <span class="shelf-stat shelf-stat--learned" title="Fragen gelernt">✓ ${stats.qLearned}/${stats.qTotal}</span>
        ${stats.qWrong > 0 ? `<span class="shelf-stat shelf-stat--wrong" title="Fragen falsch beantwortet">✗ ${stats.qWrong}</span>` : ""}
        ${stats.qOpen > 0 ? `<span class="shelf-stat shelf-stat--open" title="Fragen noch nicht beantwortet">… ${stats.qOpen}</span>` : ""}
      </div>`;
    return `
      <div class="garden-shelf${isActiveBed ? " garden-shelf--active" : ""}" data-bed-id="${bed.id}"
           style="${isActiveBed ? `--shelf-color:${potColor}` : ""}">
        <div class="garden-shelf-header">
          <div class="garden-shelf-label">${bed.title}</div>
          ${statsHtml}
        </div>
        <div class="garden-shelf-pots">${pots.join("")}</div>
      </div>`;
  }).join("");

  const hiddenCount = allUnlocked.length - gardenBeds.length;
  const hiddenHint = hiddenCount > 0
    ? `<div class="garden-hidden-hint">${hiddenCount} weitere Kapitel im Pflanzenkatalog</div>`
    : "";
  els.gardenRoom.innerHTML = (html + emptySlotsHtml || `<div class="muted" style="padding:2rem">Keine Beete freigeschaltet. Öffne den Pflanzenkatalog, um zu beginnen.</div>`) + hiddenHint;

  // Click handlers
  els.gardenRoom.querySelectorAll(".garden-pot.has-plant").forEach((el) => {
    el.addEventListener("click", () => {
      const plantId = el.getAttribute("data-plant-id");
      const bedId = el.getAttribute("data-bed-id");
      selectPlantInGarden(plantId, bedId);
    });
  });

  els.gardenRoom.querySelectorAll("[data-add-bed]").forEach((el) => {
    el.addEventListener("click", () => {
      const bedId = el.getAttribute("data-add-bed");
      openCatalogModal(bedId);
    });
  });

  els.gardenRoom.querySelectorAll("[data-open-catalog]").forEach((el) => {
    el.addEventListener("click", () => openCatalogModal());
  });

  // Phase2 tool buttons inside pot-tools
  els.gardenRoom.querySelectorAll("[data-pot-p2]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const plantId = btn.closest("[data-plant-id]").getAttribute("data-plant-id");
      const bedId = btn.closest("[data-bed-id]").getAttribute("data-bed-id");
      state.activeBedId = bedId;
      selectedPlantId = plantId;
      startPhase2Action(plantId, parseInt(btn.getAttribute("data-pot-p2"), 10));
    });
  });

  els.gardenRoom.querySelectorAll("[data-pot-harvest]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const plantId = btn.closest("[data-plant-id]").getAttribute("data-plant-id");
      const bedId = btn.closest("[data-bed-id]").getAttribute("data-bed-id");
      state.activeBedId = bedId;
      selectedPlantId = plantId;
      saveState();
      startHarvest(plantId);
      renderAll();
    });
  });

  els.gardenRoom.querySelectorAll("[data-pot-skip]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const plantId = btn.closest("[data-plant-id]").getAttribute("data-plant-id");
      const bedId = btn.closest("[data-bed-id]").getAttribute("data-bed-id");
      state.activeBedId = bedId;
      selectedPlantId = plantId;
      skipCooldownWithFertilizer(plantId);
    });
  });
}

function buildPotToolsHtml(plantState, content, plantId, bedId) {
  if (!content) return "";
  const phase = plantState.phase || "phase1";
  const isLocked = plantState.locked && Date.now() < (plantState.lockedUntil || 0);

  if (phase === "phase2" || phase === "phase2_final") {
    const phase2 = content.phase2 || [];
    const toolBtns = phase2.map((action, idx) => {
      const icon = getActionIcon(action.type);
      const done = (plantState.phase2Progress || [])[idx]?.done;
      const disabledAttr = (isLocked || done) ? " disabled" : "";
      return `<button class="pot-tool-btn${done ? " pot-tool-btn--done" : ""}"
        data-pot-p2="${idx}"${disabledAttr}
        title="${action.type}">${icon}</button>`;
    }).join("");

    const canHarvest = phase === "phase2_final" && !isLocked;
    const harvestBtn = canHarvest
      ? `<button class="pot-harvest-btn" data-pot-harvest="1" title="Ernte starten">🌾</button>`
      : "";

    const canSkip = isLocked && (getPackState().player?.fertilizer > 0 || !isDevFastMode());
    const skipBtn = canSkip
      ? `<button class="pot-tool-btn pot-tool-btn--skip" data-pot-skip="1" title="Cooldown überspringen">🧪</button>`
      : "";

    return `<div class="pot-tools">${toolBtns}${harvestBtn}${skipBtn}</div>`;
  }

  if (phase === "phase3") {
    return `<div class="pot-tools"><button class="pot-harvest-btn" data-pot-harvest="1" title="Ernte starten">🌾</button></div>`;
  }

  return "";
}

function selectPlantInGarden(plantId, bedId) {
  if (selectedPlantId === plantId && state.activeBedId === bedId) {
    // Deselect on second click
    selectedPlantId = null;
    saveState();
    renderAll();
    return;
  }
  state.activeBedId = bedId;
  selectedPlantId = plantId;
  phase2Session = null;
  harvestSession = null;
  labelSession = null;
  saveState();
  renderAll();
  // Scroll left panel to top so question is visible
  const lp = document.getElementById("left-panel");
  if (lp) lp.scrollTop = 0;
}

function skipCooldownWithFertilizer(plantId) {
  const bedState = getBedState();
  const plantState = bedState?.plants?.[plantId];
  if (!plantState) return;
  if (isDevFastMode()) {
    const player = getPackState().player;
    if (player.fertilizer <= 0) {
      showToast("Kein Dünger mehr verfügbar.", "error");
      return;
    }
    player.fertilizer -= 1;
  }
  plantState.cooldownUntil = null;
  saveState();
  renderAll();
}

function renderLeftPanel() {
  if (!els.plantDetail) return;

  const isOpen = !!(selectedPlantId && state.activeBedId);
  document.body.classList.toggle('plant-open', isOpen);

  if (!selectedPlantId || !state.activeBedId) {
    if (els.leftPanelVisual) els.leftPanelVisual.innerHTML = "";
    els.plantDetail.innerHTML = "Keine Pflanze ausgewählt.<br><br>Klicke eine Pflanze im Garten an.";
    return;
  }

  // Render plant visual in the fixed slot above the scrollable detail panel
  if (els.leftPanelVisual) {
    const bedState = getBedState();
    const plantState = bedState?.plants?.[selectedPlantId];
    // Try active bed first, then search all beds (covers post-harvest case)
    let plantContent = getPlantContent(selectedPlantId);
    if (!plantContent) {
      for (const bed of PACK_CONTENT.beds) {
        plantContent = bed.plants.find(p => p.id === selectedPlantId) || null;
        if (plantContent) break;
      }
    }
    const activeIds = bedState?.activePlantIds || [];
    const isHarvested = plantState?.harvestedOnce && !activeIds.includes(selectedPlantId);
    els.leftPanelVisual.innerHTML = (plantState && plantContent && !isHarvested)
      ? buildPlantVisualHtml(plantState, plantContent, "plant-visual--large")
      : "";
  }

  // renderPlantDetail() renders directly into els.plantDetail and binds its own events
  renderPlantDetail();
}

function moduleCodeFromBedId(bedId) {
  const m = String(bedId || "").match(/_(\d{4})$/);
  return m ? m[1] : "0000";
}

function capitalizeWord(word) {
  const w = String(word || "");
  if (!w) return "";
  return `${w.charAt(0).toUpperCase()}${w.slice(1).toLowerCase()}`;
}

function shortLabelFromId(plantId) {
  const tokens = String(plantId || "")
    .split("_")
    .filter((t) => t && !STOP_WORDS.has(t));
  const picked = (tokens.length > 0 ? tokens : [String(plantId || "pflanze")]).slice(0, 3);
  return picked.map(capitalizeWord).join(" ");
}

function buildPlantLabels() {
  const labels = {};
  PACK_CONTENT.beds.forEach((bed) => {
    const moduleCode = moduleCodeFromBedId(bed.id);
    bed.plants.forEach((plant, index) => {
      const no = String(index + 1).padStart(2, "0");
      const short = shortLabelFromId(plant.id);
      labels[`${bed.id}::${plant.id}`] = `${moduleCode}-${no} ${short}`;
    });
  });
  return labels;
}

function getPlantLabel(bedId, plantId, fallbackTitle) {
  return PLANT_LABELS[`${bedId}::${plantId}`] || fallbackTitle || plantId;
}

function getCurrentPlantLabel(plantId, fallbackTitle) {
  const bed = getActiveBedContent();
  return getPlantLabel(bed ? bed.id : "", plantId, fallbackTitle);
}

function getPlantLifecycleStatus(plantState) {
  if (plantState.harvestedOnce) return { text: "Geerntet", tone: "done" };
  if (plantState.phase2Withered) return { text: "Verwelkt", tone: "bad" };
  const planted = Boolean(
    plantState.phase1ActiveStep
    || plantState.phase1Completed
    || plantState.readinessActionsUsed > 0
    || Object.values(plantState.phase1StepsDone || {}).some(Boolean)
  );
  return planted
    ? { text: "Gepflanzt", tone: "active" }
    : { text: "Nicht gepflanzt", tone: "idle" };
}

function renderPlayer() {
  const pack = getPackState();
  const player = pack.player;
  const stats = pack.stats;
  const cooldownSeconds = Math.floor(getCooldownMs() / 1000);
  const curriculum = getCurriculumProgress();
  const { totalQ, learnedQ } = getLearningProgress();

  const now = Date.now();
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(now - 86400000).toISOString().slice(0, 10);

  // Streak + buy-back
  const streak = stats.streak || 0;
  const streakActive = stats.lastStreakDate === today;
  const streakBrokenBeforeToday = streak > 1 && stats.lastStreakDate !== today && stats.lastStreakDate !== yesterday;
  const streakResetToday = stats.streakBrokenDate === today && (stats.prevStreak || 0) > 0;
  const canBuyBack = (streakBrokenBeforeToday || streakResetToday) && stats.lastStreakBought !== yesterday;
  const buyBackCost = 3;
  const buyBackHtml = canBuyBack
    ? (player.fruits >= buyBackCost
        ? `<button id="btn-buyback-streak" style="font-size:0.78rem;padding:2px 8px">Zurückkaufen (${buyBackCost}🍎)</button>`
        : `<span class="muted" style="font-size:0.78rem">(${buyBackCost}🍎 nötig)</span>`)
    : '';
  const streakHtml = `<div class="stat-streak${streakActive ? ' stat-streak--active' : ''}">🔥 ${streak} ${buyBackHtml}</div>`;

  // Daily goal
  const dailyDone = stats.dailyDate === today ? (stats.dailyActions || 0) : 0;
  const dailyComplete = dailyDone >= DAILY_GOAL;
  const dots = Array.from({ length: DAILY_GOAL }, (_, i) => `<span class="daily-dot${i < dailyDone ? ' daily-dot--done' : ''}"></span>`).join('');
  const dailyHtml = `<div class="stat-daily${dailyComplete ? ' stat-daily--done' : ''}" title="Tagesziel: ${DAILY_GOAL} Aktionen">${dots}</div>`;

  // Pace tracker — per day
  let paceHtml = '';
  const daysLeft = (EXAM_DEADLINE - now) / 86400000;
  if (totalQ > 0 && daysLeft > 0) {
    const remaining = totalQ - learnedQ;
    const neededPerDay = remaining / daysLeft;
    if (stats.firstPlayDate && learnedQ > 0) {
      const daysElapsed = Math.max(1, (now - stats.firstPlayDate) / 86400000);
      const pacePerDay = learnedQ / daysElapsed;
      const onTrack = pacePerDay >= neededPerDay;
      paceHtml = `<div class="stat-pace ${onTrack ? 'stat-pace--ok' : 'stat-pace--warn'}">Du brauchst ${neededPerDay.toFixed(1)}/Tag · du schaffst ${pacePerDay.toFixed(1)}/Tag${onTrack ? ' ✓' : ' ⚠️'}</div>`;
    } else {
      paceHtml = `<div class="stat-pace">Du brauchst ${neededPerDay.toFixed(1)} Fragen/Tag für Feb 2028</div>`;
    }
  }

  els.playerStats.innerHTML = `
    <div class="stat-row">
      <div>🌾 <strong>${curriculum.harvested}/${curriculum.total}</strong></div>
      <div>🍎 <strong>${player.fruits}</strong></div>
      ${streakHtml}
      ${dailyHtml}
    </div>
    <div class="stat-row">${paceHtml}</div>
  `;
  const buyBackBtn = els.playerStats.querySelector('#btn-buyback-streak');
  if (buyBackBtn) buyBackBtn.addEventListener('click', buyBackStreak);
  els.cooldownInfo.textContent = `Cooldown: ${cooldownSeconds}s`;
  els.curriculumStatus.textContent = "";
  els.devModeBtn.textContent = `Dev-Cooldown: ${isDevFastMode() ? "An" : "Aus"}`;
}

function getCurriculumProgress() {
  const pack = getPackState();
  let total = 0;
  let harvested = 0;
  PACK_CONTENT.beds.forEach((bed) => {
    bed.plants.forEach((p) => {
      total += 1;
      if (pack.beds[bed.id]?.plants?.[p.id]?.harvestedOnce) {
        harvested += 1;
      }
    });
  });
  return {
    total,
    harvested,
    complete: total > 0 && harvested === total
  };
}

function getLearningProgress() {
  const pack = getPackState();
  let totalQ = 0, learnedQ = 0;
  PACK_CONTENT.beds.forEach(bed => {
    bed.plants.forEach(plant => {
      const pState = pack.beds[bed.id]?.plants?.[plant.id];
      const qs = plant.harvestQuestions || [];
      totalQ += qs.length;
      if (pState) qs.forEach(q => {
        if (pState.phase2Questions?.[q.id]?.status === 'learned') learnedQ++;
      });
    });
  });
  return { totalQ, learnedQ };
}

function trackDailyActivity() {
  const pack = getPackState();
  const stats = pack.stats;
  const today = new Date().toISOString().slice(0, 10);
  if (!stats.firstPlayDate) stats.firstPlayDate = Date.now();
  if (stats.lastStreakDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (stats.lastStreakDate === yesterday) {
      stats.streak = (stats.streak || 0) + 1;
    } else {
      // Streak broken — save it so buy-back can restore it
      if ((stats.streak || 0) > 1) {
        stats.prevStreak = stats.streak;
        stats.streakBrokenDate = today;
      }
      stats.streak = 1;
    }
    stats.lastStreakDate = today;
  }
  if (stats.dailyDate !== today) { stats.dailyActions = 0; stats.dailyDate = today; }
  stats.dailyActions = (stats.dailyActions || 0) + 1;
}

function buyBackStreak() {
  const pack = getPackState();
  const stats = pack.stats;
  const today = new Date().toISOString().slice(0, 10);
  const cost = 3;
  if (pack.player.fruits < cost) { showToast(`Nicht genug Früchte (${cost} benötigt).`, 'error'); return; }
  pack.player.fruits -= cost;
  if (stats.streakBrokenDate === today && (stats.prevStreak || 0) > 0) {
    // Already answered today (streak was reset) — restore prevStreak + 1 for today
    stats.streak = stats.prevStreak + 1;
    stats.prevStreak = 0;
    stats.streakBrokenDate = null;
  }
  // If not yet answered today, streak is still intact — just bridge the date gap
  stats.lastStreakDate = today;
  stats.lastStreakBought = today;
  saveState();
  renderAll();
}

function getActionIcon(type) {
  const t = (type || "").toLowerCase();
  if (t === "water" || t.includes("wässern") || t.includes("giess") || t.includes("gieß") || t.includes("giessen")) return "💧";
  if (t === "fertilize" || t.includes("düngen") || t.includes("dünger")) return "🌿";
  if (t === "trim" || t.includes("beschneiden") || t.includes("trimmen") || t.includes("schneid")) return "✂️";
  if (t === "magic" || t.includes("magie") || t.includes("zauber")) return "🧪";
  if (t.includes("beobachten")) return "👁";
  if (t.includes("beschriften") || t.includes("etikettieren")) return "🏷";
  return "🌱";
}

function getActionImg(type) {
  const t = (type || "").toLowerCase();
  if (t === "water" || t.includes("wässern") || t.includes("giess") || t.includes("gieß") || t.includes("giessen")) return "assets/images/Watring can.png";
  if (t === "fertilize" || t.includes("düngen") || t.includes("dünger")) return "assets/images/fertilizer.png";
  if (t === "trim" || t.includes("beschneiden") || t.includes("trimmen") || t.includes("schneid")) return "assets/images/garden shears.png";
  return null;
}

function buildPlantVisualHtml(plantState, content, extraClass) {
  if (!plantState || !content) return "";
  const now = Date.now();
  const cooldownMs = getCooldownMs();
  const locked = plantState.cooldownUntil && now < plantState.cooldownUntil;
  const remainingMs = locked ? plantState.cooldownUntil - now : 0;
  const progressPct = locked ? Math.max(0, Math.min(100, Math.round(((cooldownMs - remainingMs) / cooldownMs) * 100))) : 100;
  if (plantState.phase1Completed) {
    computePhase2Readiness(content, plantState);
  }
  const visual = getPlantVisualState(content, plantState);
  const cooldownFillPct = locked ? progressPct : 100;
  const fillProgress = Math.max(0, Math.min(1, cooldownFillPct / 100));
  const growthScale = Math.max(0.45, Math.min(1.8, Number(visual.growth || 1)));
  const phase2Actions = Math.max(1, Number((content.phase2 || []).length || 1));
  const usedActions = Math.max(0, Math.min(phase2Actions, Number(plantState.readinessActionsUsed || 0)));

  // Determine sequential step info (used for both visual effects and growth animation)
  const seqStep = plantState.phase2SeqStep || 0;
  const seqCurrentIdx = seqStep % phase2Actions;
  const seqLastIdx = ((seqStep - 1) + phase2Actions) % phase2Actions;
  const seqCurrentType = (content.phase2[seqCurrentIdx]?.type || "").toLowerCase();
  const seqLastType = seqStep > 0 ? (content.phase2[seqLastIdx]?.type || "").toLowerCase() : "";
  const lastActionWasTrim = locked && seqLastType === "trim";

  // Sequential visual effects: grey for water-needed, yellow for fertilize-needed,
  // recovery animation during cooldown, grey-building during trim cooldown (water comes next)
  let plantOpacity = 1.0;
  let plantSaturation = 1.0;
  let plantSepia = 0;
  let plantBrightness = 1;
  if (visual.phase !== "phase1" && plantState.phase1Completed && visual.phase !== "phase3") {
    if (locked) {
      if (seqLastType === "water") {
        plantSaturation = 0.5 + (0.5 * fillProgress);
      } else if (seqLastType === "fertilize") {
        const e = 1.0 - fillProgress;
        plantSepia = 0.55 * e;
        plantBrightness = 1 + 0.05 * e;
        plantSaturation = 1 - 0.4 * e;
      } else if (seqLastType === "trim") {
        plantSaturation = 1.0 - (0.5 * fillProgress);
      }
    } else {
      if (seqCurrentType === "water") {
        plantSaturation = 0.5;
      } else if (seqCurrentType === "fertilize") {
        plantSepia = 0.55;
        plantBrightness = 1.05;
        plantSaturation = 0.6;
      }
    }
  }
  const isThirsty = visual.phase !== "phase1" && plantState.phase1Completed && !locked && seqCurrentType === "water";

  // Harvest fruit removal: each correct answer removes one fruit from the visual
  const isHarvestPlant = harvestSession && harvestSession.plantId === plantState.id;
  const harvestCorrect = isHarvestPlant ? (harvestSession.correct || 0) : 0;
  // Trim doesn't grow the plant — suppress growth animation during trim cooldown.
  // Also suppress when already at full height (repeat cycle): avoid shrink-regrow artifact.
  const alreadyFullHeight = usedActions >= phase2Actions;
  const stagedProgress = locked
    ? lastActionWasTrim || alreadyFullHeight
      ? usedActions                                                              // trim or full: no growth animation
      : Math.max(0, Math.min(phase2Actions, (usedActions - 1) + fillProgress))  // new branch growing
    : usedActions;
  const stageRatio = visual.phase === "phase1"
    ? 0
    : Math.max(0, Math.min(1, stagedProgress / phase2Actions));
  const stemMax = Math.round(42 + (growthScale * 38));
  const stemFill = Math.max(10, Math.round(stemMax * (0.12 + (stageRatio * 0.88))));
  const fullBranches = Math.max(0, Math.floor(stagedProgress + 0.0001));
  const growingBranchIdx = (locked && !lastActionWasTrim && !alreadyFullHeight && usedActions > 0) ? Math.max(0, usedActions - 1) : -1;
  const currentBranchGrowth = (growingBranchIdx >= 0) ? fillProgress : 1;
  const branchSpecs = new Array(phase2Actions).fill(0).map((_, i) => ({
    y: 0.24 + (((i + 1) / (phase2Actions + 1)) * 0.64),
    rot: (i % 2 === 0 ? -1 : 1) * (22 + ((i % 3) * 5)),
    len: 20 + ((i % 4) * 5)
  }));
  // Grey drooping stubs: show when trim is the current active step, or when a trim question
  // has "wrong" status (harvest failure recovery). Hidden during trim cooldown and when trim
  // step is not yet reached in the sequence.
  const trimStubHtml = visual.phase === "phase1" ? "" : (() => {
    const phase2 = content.phase2 || [];
    const actionCount = Math.max(1, phase2.length);
    const seqStepForStubs = plantState.phase2SeqStep || 0;
    const currentStepForStubs = seqStepForStubs % actionCount;
    const trimIndices = phase2.reduce((acc, a, i) => { if (a.type === "trim") acc.push(i); return acc; }, []);
    return trimIndices.map((idx, trimRank) => {
      const assigned = (content.harvestQuestions || []).filter((_, qi) => qi % actionCount === idx);
      if (assigned.length === 0) return "";
      const allLearned = assigned.every(q => plantState.phase2Questions?.[q.id]?.status === "learned");
      if (allLearned) return "";
      // Show stub: trim is current active step (not in cooldown), OR a trim question failed during harvest
      const isCurrentAndReady = (idx === currentStepForStubs) && !locked;
      const hasWrongFromHarvest = assigned.some(q => plantState.phase2Questions?.[q.id]?.status === "wrong");
      if (!isCurrentAndReady && !hasWrongFromHarvest) return "";
      // Space stubs evenly in the lower 20–60% of the stem, independent of branch positions
      const yFrac = 0.2 + ((trimRank + 1) / (trimIndices.length + 1)) * 0.4;
      const by = Math.round(stemFill * yFrac);
      const isLeft = trimRank % 2 === 0;
      return `<span class="plant-trim-stub${isLeft ? " plant-trim-stub--left" : ""}" style="--by:${by}px;"></span>`;
    }).join("");
  })();

  const branchHtml = visual.phase === "phase1" ? "" : branchSpecs.map((b, i) => {
    let grow = 0;
    if (i < fullBranches) grow = 1;
    else if (i === growingBranchIdx) grow = Math.max(0.18, currentBranchGrowth);
    if (grow <= 0) return "";
    const by = Math.round(stemFill * b.y);
    const bl = Math.max(6, Math.round(b.len * grow));
    const isLeft = b.rot < 0;
    // Left branches: positive angle around right-center = upper-left
    // Right branches: negative angle around left-center = upper-right
    const brDeg = isLeft ? Math.abs(b.rot) : -Math.abs(b.rot);
    return `<span class="plant-branch${isLeft ? " plant-branch--left" : ""}${visual.withered ? " is-withered" : ""}" style="--by:${by}px;--br:${brDeg}deg;--bl:${bl}px;"></span>`;
  }).join("");
  const harvestReady = plantState.phase1Completed && (plantState.readiness || 0) <= 0;
  const fruitTotalRaw = Math.min(18, Math.max(0, Number(visual.fruitCount || 0) - harvestCorrect));
  const fruitTotal = (visual.phase === "phase3" || visual.phase === "phase2_final") ? fruitTotalRaw : 0;
  const fruitOpacity = visual.phase === "phase2_final" ? (0.45 + (fillProgress * 0.55)) : 1;
  // Fruits anchor only on branches (not stem tip) so they appear naturally on the plant
  const fruitAnchors = [];
  branchSpecs.forEach((b, i) => {
    let grow = 0;
    if (i < fullBranches) grow = 1;
    else if (i === growingBranchIdx) grow = Math.max(0.18, currentBranchGrowth);
    if (grow <= 0) return;
    const by = Math.round(stemFill * b.y);
    const bl = Math.max(6, Math.round(b.len * grow));
    const dir = b.rot >= 0 ? 1 : -1;
    fruitAnchors.push({ x: Math.round(dir * (4 + bl * 0.65)), y: Math.round(by + 2 + bl * 0.3) });
    fruitAnchors.push({ x: Math.round(dir * (2 + bl * 0.35)), y: Math.round(by + 6) });
  });
  if (fruitAnchors.length === 0) fruitAnchors.push({ x: 0, y: Math.round(stemFill * 0.7) });
  const fruitDots = fruitTotal > 0
    ? new Array(fruitTotal).fill(0).map((_, i) => {
      const anchor = fruitAnchors[i % Math.max(1, fruitAnchors.length)];
      const jitterX = Math.round(Math.sin((i + 1) * 2.17) * 2);
      const jitterY = Math.round(Math.cos((i + 1) * 1.73) * 2);
      const fx = Math.round(anchor.x + jitterX);
      const fy = Math.round(anchor.y + jitterY);
      return `<span class="plant-fruit-dot" style="--fx:${fx}px;--fy:${fy}px;--fo:${fruitOpacity.toFixed(2)};"></span>`;
    }).join("")
    : "";
  const sparkleClass = (harvestReady && !locked)
    ? " plant-sparkle--harvest"
    : (!harvestReady && !locked && !visual.withered)
      ? " plant-sparkle--action"
      : "";
  const classAttr = "plant-visual" + (extraClass ? " " + extraClass : "") + sparkleClass;
  const colors = getPlantColorScheme(content);
  // Color variables on outer div (inherited by all); opacity/filter on plant-body only (not pot)
  const colorStyle = `--stem-hi:${colors.stemHi};--stem-lo:${colors.stemLo};--fruit-hi:${colors.fruitHi};--fruit-lo:${colors.fruitLo};`;
  const filterStr = `saturate(${plantSaturation.toFixed(2)})${plantSepia > 0 ? ` sepia(${plantSepia.toFixed(2)}) brightness(${plantBrightness.toFixed(2)})` : ''}`;
  const bodyStyle = `opacity:${plantOpacity};filter:${filterStr};`;
  const potSrc = (() => {
    const steps = plantState.phase1StepsDone || {};
    if (plantState.phase1Completed || visual.phase !== 'phase1') return 'assets/images/pot ready to grow.png';
    if (steps.seed) return 'assets/images/pot seed.png';
    if (steps.soil) return 'assets/images/pot soil.png';
    return 'assets/images/pot.png';
  })();
  return `
    <div class="${classAttr}" data-plant-visual="${plantState.id}" style="${colorStyle}">
      <img class="plant-pot-img" src="${potSrc}" alt="">
      <div class="plant-body" style="${bodyStyle}">
        ${visual.phase !== "phase1" ? `<div class="plant-stem-track" style="--stem-max:${stemMax}px;"></div>` : ""}
        ${visual.phase !== "phase1" ? `<div class="plant-stem${visual.withered ? " is-withered" : ""}" style="--stem-fill:${stemFill}px;"></div>` : ""}
        ${visual.phase !== "phase1" ? `<div class="plant-branches${isThirsty ? ' is-thirsty' : ''}">${branchHtml}${trimStubHtml}</div>` : ""}
        <div class="plant-fruits">${fruitDots}</div>
      </div>
    </div>
  `;
}

function renderPlants() {
  if (!els.plantsList) return; // replaced by renderGardenRoom() in new layout
  const bedState = getBedState();
  if (!bedState) {
    els.plantsList.innerHTML = `<div class="muted">Wähle im Seed-Menue ein Beet aus und pflanze dort Samen.</div>`;
    return;
  }
  const activeIds = bedState.activePlantIds || [];
  if (selectedPlantId && !activeIds.includes(selectedPlantId)) {
    selectedPlantId = null;
    phase2Session = null;
    harvestSession = null;
  }

  const now = Date.now();
  const cooldownMs = getCooldownMs();
  const parts = activeIds.map((pid) => bedState.plants[pid]).filter(Boolean).map((plantState) => {
    const content = getPlantContent(plantState.id);
    if (plantState.phase1Completed) {
      computePhase2Readiness(content, plantState);
    } else {
      plantState.readiness = 0;
    }
    const locked = plantState.cooldownUntil && now < plantState.cooldownUntil;
    const remainingMs = locked ? plantState.cooldownUntil - now : 0;
    const remainingSec = locked ? Math.ceil(remainingMs / 1000) : 0;
    const progressPct = locked ? Math.max(0, Math.min(100, Math.round(((cooldownMs - remainingMs) / cooldownMs) * 100))) : 100;
    const selected = selectedPlantId === plantState.id ? " selected" : "";
    const label = getCurrentPlantLabel(plantState.id, content.title);
    const tone = locked ? "idle" : plantState.harvestedOnce ? "done" : "active";
    const statusText = locked ? `⏳ ${remainingSec}s` : plantState.harvestedOnce ? "Geerntet" : "Im Beet";
    const statusText2 = plantState.harvestedOnce ? "Schon geerntet" : "Im Beet";
    const cooldownText = locked ? `${remainingSec}s` : "bereit";
    const tooltipName = escapeHtmlAttr(label);
    const tooltipStatus = escapeHtmlAttr(statusText2);
    const tooltipPhase = escapeHtmlAttr(String(plantState.phase));
    const tooltipReady = escapeHtmlAttr(String(Math.floor(plantState.readiness)));
    const tooltipCooldown = escapeHtmlAttr(cooldownText);
    return `
      <div class="plant-chip-wrap">
        <button class="plant-chip${selected}" data-plant="${plantState.id}" data-plant-tip="1" data-tip-name="${tooltipName}" data-tip-status="${tooltipStatus}" data-tip-phase="${tooltipPhase}" data-tip-ready="${tooltipReady}" data-tip-cooldown="${tooltipCooldown}">
          <span class="plant-chip-name">${label}</span>
          <span class="status-chip ${tone}">${statusText}</span>
        </button>
        <button class="plant-remove" data-plant-remove="${plantState.id}" title="Entfernen">✕</button>
      </div>
    `;
  });

  const bedContent = getActiveBedContent();
  const isFull = activeIds.length >= 4;
  let addRow = "";
  if (bedContent) {
    const allMeta = bedContent.plants.map((p) => {
      const pState = bedState.plants[p.id];
      const isActive = activeIds.includes(p.id);
      const harvested = Boolean(pState && pState.harvestedOnce);
      return { id: p.id, title: p.title, isActive, harvested };
    });
    const newPlants      = allMeta.filter(p => !p.isActive && !p.harvested);
    const harvestedPlants = allMeta.filter(p => !p.isActive && p.harvested);
    const visibleOptions  = showHarvestedInSelector ? [...newPlants, ...harvestedPlants] : newPlants;
    if (visibleOptions.length > 0 || harvestedPlants.length > 0) {
      const options = visibleOptions.map(o => {
        const tag   = o.harvested ? '[Geerntet]' : '[Neu]';
        const color = o.harvested ? '#1f6b35' : '#9f1d1d';
        return `<option value="${o.id}" style="color:${color}">${o.title} ${tag}</option>`;
      }).join('');
      const toggleLabel = showHarvestedInSelector ? 'Nur neue anzeigen' : `Geerntete anzeigen (${harvestedPlants.length})`;
      const harvestedToggle = harvestedPlants.length > 0
        ? `<button id="toggle-harvested-selector" type="button" style="font-size:0.78rem">${toggleLabel}</button>`
        : '';
      addRow = `
        <div class="row">
          <select id="seed-add-select" ${visibleOptions.length === 0 ? 'disabled' : ''}>${options || '<option disabled>–</option>'}</select>
          <button id="seed-add-btn" ${(isFull || visibleOptions.length === 0) ? 'disabled' : ''}>Einpflanzen</button>
        </div>
        ${harvestedToggle}
      `;
    }
  }

  els.plantsList.innerHTML = (parts.length ? parts.join("") : `<div class="muted">Noch keine Pflanzen im Beet. Wähle unten eine Sorte.</div>`) + addRow + `<div id="plant-hover-tooltip" class="plant-hover-tooltip" hidden></div>`;

  els.plantsList.querySelectorAll("[data-plant]").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedPlantId = btn.getAttribute("data-plant");
      phase2Session = null;
      harvestSession = null;
      renderAll();
    });
  });

  const tooltipEl = els.plantsList.querySelector("#plant-hover-tooltip");
  const hideTooltip = () => {
    if (!tooltipEl) return;
    tooltipEl.hidden = true;
  };
  const positionTooltip = (evt) => {
    if (!tooltipEl || tooltipEl.hidden || !evt) return;
    const pad = 14;
    const maxX = window.innerWidth - tooltipEl.offsetWidth - 10;
    const maxY = window.innerHeight - tooltipEl.offsetHeight - 10;
    const x = Math.max(10, Math.min(maxX, evt.clientX + pad));
    const y = Math.max(10, Math.min(maxY, evt.clientY + pad));
    tooltipEl.style.left = `${x}px`;
    tooltipEl.style.top = `${y}px`;
  };
  const showTooltip = (evt, target) => {
    if (!tooltipEl || !target) return;
    const name = escapeHtmlText(target.getAttribute("data-tip-name"));
    const status = escapeHtmlText(target.getAttribute("data-tip-status"));
    const phase = escapeHtmlText(target.getAttribute("data-tip-phase"));
    const ready = escapeHtmlText(target.getAttribute("data-tip-ready"));
    const cooldown = escapeHtmlText(target.getAttribute("data-tip-cooldown"));
    tooltipEl.innerHTML = `
      <div class="tip-title">${name}</div>
      <div>Status: ${status}</div>
      <div>Phase: ${phase}</div>
      <div>Bereitschaft: ${ready}</div>
      <div>Cooldown: ${cooldown}</div>
    `;
    tooltipEl.hidden = false;
    positionTooltip(evt);
  };
  els.plantsList.querySelectorAll("[data-plant-tip]").forEach((el) => {
    el.addEventListener("mouseenter", (evt) => showTooltip(evt, el));
    el.addEventListener("mousemove", positionTooltip);
    el.addEventListener("mouseleave", hideTooltip);
  });

  els.plantsList.querySelectorAll("[data-plant-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const plantId = btn.getAttribute("data-plant-remove");
      const bs = getBedState();
      if (!bs || !Array.isArray(bs.activePlantIds)) return;
      const idx = bs.activePlantIds.indexOf(plantId);
      if (idx >= 0) {
        bs.activePlantIds.splice(idx, 1);
        if (selectedPlantId === plantId) {
          selectedPlantId = null;
          phase2Session = null;
          harvestSession = null;
        }
        if (bs.activePlantIds.length === 0) {
          state.activeBedId = null;
        }
      }
      saveState();
      renderAll();
    });
  });

  const addBtn = document.getElementById("seed-add-btn");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      const sel = document.getElementById("seed-add-select");
      if (!sel || !sel.value) return;
      const selectedOption = sel.options[sel.selectedIndex];
      if (!selectedOption || selectedOption.disabled) return;
      const plantId = sel.value;
      const bs = getBedState();
      if (!bs || !Array.isArray(bs.activePlantIds)) return;
      if (!canActivateBedForPlanting(bs.id)) {
        showToast(`Maximal ${MAX_ACTIVE_BEDS} aktive Beete mit Pflanzen gleichzeitig.`, "error");
        return;
      }
      if (bs.activePlantIds.includes(plantId) || bs.activePlantIds.length >= 4) return;
      preparePlantForNewCycle(bs.plants[plantId]);
      bs.activePlantIds.push(plantId);
      showHarvestedInSelector = false;
      saveState();
      renderAll();
    });
  }
  const toggleHarvestedBtn = document.getElementById('toggle-harvested-selector');
  if (toggleHarvestedBtn) {
    toggleHarvestedBtn.addEventListener('click', () => {
      showHarvestedInSelector = !showHarvestedInSelector;
      renderAll();
    });
  }
}


function renderPlantDetail() {
  const bedState = getBedState();
  if (!bedState) {
    els.plantDetail.textContent = "Wähle im Seed-Menue ein Beet aus und pflanze mindestens eine Pflanze.";
    return;
  }
  const activeIds = bedState.activePlantIds || [];

  // If a plant is selected but no longer active, check if it was just harvested
  if (selectedPlantId && !activeIds.includes(selectedPlantId)) {
    const ps = bedState.plants?.[selectedPlantId];
    if (ps?.harvestedOnce) {
      const fruits = ps.lastHarvestFruits ?? "?";
      const plantContent = (() => {
        let c = getPlantContent(selectedPlantId);
        if (!c) for (const bed of PACK_CONTENT.beds) { c = bed.plants.find(p => p.id === selectedPlantId) || null; if (c) break; }
        return c;
      })();
      const colors = getPlantColorScheme(plantContent);
      const dotCount = typeof ps.lastHarvestFruits === "number" ? Math.min(ps.lastHarvestFruits, 12) : 0;
      const fruitDots = dotCount > 0
        ? `<div class="harvest-success-dot-row" style="--fruit-hi:${colors.fruitHi};--fruit-lo:${colors.fruitLo};">${new Array(dotCount).fill(0).map((_, i) => `<span class="harvest-fruit-dot" style="animation-delay:${(i * 0.12).toFixed(2)}s"></span>`).join("")}</div>`
        : "";
      els.plantDetail.innerHTML = `
        <div class="harvest-success-card">
          <div class="harvest-success-title">Gut gemacht!</div>
          <div class="harvest-success-fruits">+${fruits} Früchte</div>
          ${fruitDots}
          <div class="harvest-success-hint muted">Pflanze erneut einsetzen, um sie weiter zu üben.</div>
          <button id="btn-back-to-garden">Zurück zum Garten</button>
        </div>`;
      const backBtn = els.plantDetail.querySelector('#btn-back-to-garden');
      if (backBtn) backBtn.addEventListener('click', () => {
        selectedPlantId = null;
        saveState();
        renderAll();
      });
      return;
    }
    selectedPlantId = null;
  }

  if (activeIds.length === 0) {
    els.plantDetail.textContent = "Wähle im Beet oben eine Pflanze aus.";
    return;
  }

  if (!selectedPlantId) {
    els.plantDetail.textContent = "Wähle eine Pflanze zum Starten.";
    return;
  }

  const plantContent = getPlantContent(selectedPlantId);
  const plantState = bedState.plants[selectedPlantId];
  const now = Date.now();
  const onCooldown = plantState.cooldownUntil && now < plantState.cooldownUntil;
  const msLeft = onCooldown ? plantState.cooldownUntil - now : 0;
  const secsLeft = onCooldown ? Math.ceil(msLeft / 1000) : 0;
  const cooldownProgressPct = onCooldown
    ? Math.max(0, Math.min(100, Math.round(((getCooldownMs() - msLeft) / getCooldownMs()) * 100)))
    : 100;

  if (harvestSession && harvestSession.plantId === selectedPlantId) {
    renderHarvestQuestion();
    return;
  }

  if (phase2Session && phase2Session.plantId === selectedPlantId) {
    renderPhase2Question();
    return;
  }

  if (!plantState.phase1Completed) {
    renderPhase1(plantContent, plantState);
    return;
  }

  ensurePhase2Tracking(plantContent, plantState);
  const readinessDebt = computePhase2Readiness(plantContent, plantState);
  const allLearned = areAllPhase2QuestionsLearned(plantContent, plantState);
  const withered = evaluateWither(plantContent, plantState);

  if (withered) {
    const label = getCurrentPlantLabel(selectedPlantId, plantContent.title);
    els.plantDetail.innerHTML = `
      <div><strong>${label}</strong></div>
      <div class="feedback">Pflanze verwelkt: zu viele falsche Antworten bei offenen Fragen.</div>
      <div class="muted">Diese Pflanze muss ab Phase 1 neu gestartet werden.</div>
      <div class="row"><button id="redo-plant-btn">Pflanze neu starten</button></div>
    `;
    document.getElementById("redo-plant-btn").addEventListener("click", () => {
      resetPlantForRedo(plantState);
      saveState();
      renderAll();
    });
    return;
  }

  advancePhase2SeqStep(plantContent, plantState);
  const actionCount = Math.max(1, plantContent.phase2.length || 1);
  const currentStepIdx = (plantState.phase2SeqStep || 0) % actionCount;
  const actions = plantContent.phase2.map((a, idx) => {
    const assigned = plantContent.harvestQuestions.filter((_, i) => i % actionCount === idx);
    if (assigned.length === 0) return '';
    const learnedCount = assigned.filter((q) => plantState.phase2Questions[q.id]?.status === "learned").length;
    const hasWrong = assigned.some((q) => plantState.phase2Questions[q.id]?.status === "wrong");
    const allLearnedAction = learnedCount === assigned.length;
    const isCurrentStep = idx === currentStepIdx && !allLearnedAction;
    const statusLabel = allLearnedAction ? "✓" : hasWrong ? `⚠ ${learnedCount}/${assigned.length}` : `${learnedCount}/${assigned.length}`;
    const imgSrc = getActionImg(a.type);
    const icon = getActionIcon(a.type);
    const doneClass = allLearnedAction ? " tool-done" : isCurrentStep ? "" : " tool-btn--seq-locked";
    const isDisabled = onCooldown || allLearnedAction || !isCurrentStep;
    const tipText = escapeHtmlAttr(`${a.type}: ${a.text} [${statusLabel}]`);
    const btnInner = imgSrc
      ? `<img src="${imgSrc}" class="tool-img" alt="${a.type}"><span class="tool-status">${statusLabel}</span>`
      : `<img src="assets/images/button.png" class="tool-img" alt="${a.type}"><span class="tool-icon tool-icon--overlay">${icon}</span><span class="tool-status">${statusLabel}</span>`;
    return `<button class="tool-btn${doneClass}" data-p2="${idx}" ${isDisabled ? "disabled" : ""} title="${tipText}">${btnInner}</button>`;
  }).join("");
  const harvestable = allLearned;

  els.plantDetail.innerHTML = `
    ${onCooldown ? `<div class="cooldown-track-wrap"><div class="cooldown-track"><div class="cooldown-fill" style="width:${cooldownProgressPct}%"></div></div><div class="muted" style="text-align:center;font-size:0.78rem">⏳ Cooldown: ${secsLeft}s</div></div>` : ""}
    <div class="tools-row">${actions}</div>
    <div class="plant-util-row">
      <button id="use-fertilizer-btn" ${!onCooldown ? "disabled" : ""}>Growing Potion (${secsLeft}s)</button>
      <button id="start-harvest-btn" class="harvest-btn" ${(!harvestable || onCooldown) ? "disabled" : ""}>${onCooldown ? `Gesperrt (${secsLeft}s)` : "Ernte starten"}</button>
    </div>
    <div class="muted detail-hint">Defizit: ${Math.floor(readinessDebt)} (Ziel: 0) | ${isDevFastMode() ? "dev-Cooldown" : "5-min-Cooldown"}</div>
  `;

  els.plantDetail.querySelectorAll("[data-p2]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.getAttribute("data-p2"));
      startPhase2Action(selectedPlantId, idx);
    });
  });

  document.getElementById("use-fertilizer-btn").addEventListener("click", () => {
    if (isDevFastMode()) {
      const player = getPackState().player;
      if (player.fertilizer <= 0) {
        showToast("Kein Dünger mehr verfügbar.", "error");
        return;
      }
      player.fertilizer -= 1;
    }
    plantState.cooldownUntil = null;
    potionSoundPlayedAt = Date.now();
    playSound("potion.mp3");
    saveState();
    renderAll();
  });

  document.getElementById("start-harvest-btn").addEventListener("click", () => {
    startHarvest(selectedPlantId);
  });
}

function renderPhase1(plantContent, plantState) {
  const order = ["soil", "seed", "water"];
  const labels = { soil: "🪨 Boden", seed: "🌰 Samen", water: "💧 Angießen" };
  const nextStep = order.find((s) => !plantState.phase1StepsDone[s]);
  const activeStep = plantState.phase1ActiveStep || null;

  if (!activeStep) {
    const chips = order.map((s) => {
      const done = plantState.phase1StepsDone[s];
      return `<span class="status-chip ${done ? "done" : "idle"}">${labels[s]}: ${done ? "✓" : "…"}</span>`;
    }).join(" ");

    els.plantDetail.innerHTML = `
      <div class="plant-phase-chips">${chips}</div>
      <div class="row">
        <button id="start-phase1-step-btn" ${nextStep ? "" : "disabled"}>${nextStep ? `${labels[nextStep]} starten` : "Phase 1 abgeschlossen"}</button>
      </div>
      <div class="muted detail-hint">Boden → Samen → Angießen. Erst lesen, dann Frage beantworten.</div>
    `;

    if (nextStep) {
      document.getElementById("start-phase1-step-btn").addEventListener("click", () => {
        plantState.phase1ActiveStep = nextStep;
        phase1ShowingLesson = true;
        saveState();
        renderAll();
      });
    }
    return;
  }

  const stepData = plantContent.phase1[activeStep];
  if (!stepData || typeof stepData.statement !== "string") {
    const label = getCurrentPlantLabel(selectedPlantId, plantContent.title);
    els.plantDetail.innerHTML = `
      <div><strong>${label}</strong></div>
      <div class="feedback">Keine Frage für Schritt "${activeStep}" konfiguriert.</div>
      <div class="row"><button id="phase1-back-btn">Zurück</button></div>
    `;
    document.getElementById("phase1-back-btn").addEventListener("click", () => {
      plantState.phase1ActiveStep = null;
      phase1ShowingLesson = false;
      saveState();
      renderAll();
    });
    return;
  }

  if (phase1ShowingLesson) {
    const explanation = normalizeExplanation(stepData.solution) || stepData.statement;
    els.plantDetail.innerHTML = `
      <div class="muted detail-hint">Phase 1 – ${labels[activeStep]} – Lerninhalt</div>
      <div class="question">${explanation}</div>
      <div class="muted">Lies durch, dann beantworte die Frage.</div>
      <div class="row"><button id="phase1-to-question-btn">Weiter zur Frage</button></div>
    `;
    document.getElementById("phase1-to-question-btn").addEventListener("click", () => {
      phase1ShowingLesson = false;
      renderAll();
    });
    return;
  }

  els.plantDetail.innerHTML = `
    <div class="muted detail-hint">Phase 1 – ${labels[activeStep]} – Frage</div>
    <div class="question">${stepData.statement}</div>
    <div class="row">
      <button data-a="true">True</button>
      <button data-a="false">False</button>
    </div>
    <div id="phase1-feedback" class="feedback"></div>
  `;

  els.plantDetail.querySelectorAll("[data-a]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const answer = btn.getAttribute("data-a") === "true";
      const ok = answer === stepData.answer;
      if (ok) {
        if (activeStep === "water") playSound("watering can.mp3");
        else playSound("soil and fertilizer.mp3");
      } else {
        playSound("wrong.mp3");
      }
      const fb = document.getElementById("phase1-feedback");
      fb.textContent = phase1Feedback(ok, stepData.solution);
      fb.classList.add(ok ? "feedback--correct" : "feedback--wrong");
      els.plantDetail.querySelectorAll("[data-a]").forEach((b) => b.setAttribute("disabled", "disabled"));

      const actionRow = document.createElement("div");
      actionRow.className = "row";
      const nextBtn = document.createElement("button");
      nextBtn.textContent = ok ? "Weiter" : "Erneut versuchen";
      actionRow.appendChild(nextBtn);
      fb.insertAdjacentElement("afterend", actionRow);

      nextBtn.addEventListener("click", () => {
        if (ok) {
          plantState.phase1ActiveStep = null;
          plantState.phase1StepsDone[activeStep] = true;
          const done = order.every((s) => plantState.phase1StepsDone[s]);
          if (done) {
            plantState.phase1Completed = true;
            plantState.phase = 2;
            addXp(3);
          }
        } else {
          // Immediate retry: stay on the same phase-1 interaction.
          plantState.phase1ActiveStep = activeStep;
        }
        saveState();
        renderAll();
      });
    });
  });
}

function usePhase2Action(plantId, actionIndex) {
  const bedState = getBedState();
  if (!bedState) return;
  const plantContent = getPlantContent(plantId);
  const plantState = bedState.plants[plantId];
  if (plantState.phase2Withered) {
    renderAll();
    return;
  }
  const now = Date.now();
  if (plantState.cooldownUntil && now < plantState.cooldownUntil) return;

  computePhase2Readiness(plantContent, plantState);
  const actionType = (plantContent.phase2[actionIndex]?.type || "").toLowerCase();
  if (actionType !== "trim") plantState.readinessActionsUsed += 1; // trim doesn't grow the plant
  plantState.phase2SeqStep = (plantState.phase2SeqStep || 0) + 1;
  plantState.cooldownUntil = now + getCooldownMs();
  if (areAllPhase2QuestionsLearned(plantContent, plantState) && !plantState.phase2Withered) {
    plantState.status = "harvestable";
  } else {
    plantState.status = "growing";
  }
  trackDailyActivity();
  addXp(1);
  saveState();
  renderAll();
  const capturedPlantId = plantId;
  setTimeout(() => {
    if (selectedPlantId === capturedPlantId) {
      selectedPlantId = null;
      saveState();
      renderAll();
    }
  }, 700);
}

function startPhase2Action(plantId, actionIndex) {
  const bedState = getBedState();
  if (!bedState) return;
  const plantState = bedState.plants[plantId];
  const now = Date.now();
  if (plantState.cooldownUntil && now < plantState.cooldownUntil) return;

  const plantContent = getPlantContent(plantId);
  ensurePhase2Tracking(plantContent, plantState);
  if (plantState.phase2Withered) {
    renderAll();
    return;
  }

  const actionType = (plantContent.phase2[actionIndex]?.type || "").toLowerCase();

  const actionCount = Math.max(1, plantContent.phase2.length || 1);
  const assigned = plantContent.harvestQuestions.filter((_, i) => i % actionCount === actionIndex);
  if (assigned.length === 0) { renderAll(); return; }
  const wrong = assigned.filter((q) => plantState.phase2Questions[q.id]?.status === "wrong");
  const unseen = assigned.filter((q) => plantState.phase2Questions[q.id]?.status === "unseen");
  const q = wrong[0] || unseen[0];
  if (!q) { renderAll(); return; }
  phase2Session = {
    plantId,
    actionIndex,
    question: q
  };
  renderPhase2Question();
}

function renderPhase2Question() {
  if (!phase2Session) return;
  const plantContent = getPlantContent(phase2Session.plantId);
  const bedState = getBedState();
  const plantState = bedState && bedState.plants[phase2Session.plantId];
  const action = plantContent.phase2[phase2Session.actionIndex];
  const q = phase2Session.question;
  const hint = `<div class="muted detail-hint">${getActionIcon(action.type)} ${action.type}: ${action.text}</div>`;

  function attachContinueAndResolve(fb, ok) {
    if (ok) {
      const pContent = getPlantContent(phase2Session.plantId);
      const t = (pContent?.phase2[phase2Session.actionIndex]?.type || "").toLowerCase();
      if (t === "water" || t.includes("wässern") || t.includes("giess") || t.includes("gieß")) playSound("watering can.mp3");
      else if (t === "trim" || t.includes("beschneiden") || t.includes("trimmen") || t.includes("schneid")) playSound("trim.mp3");
      else if (t === "fertilize" || t.includes("düngen") || t.includes("dünger")) playSound("soil and fertilizer.mp3");
    } else {
      playSound("wrong.mp3");
    }
    fb.classList.add(ok ? "feedback--correct" : "feedback--wrong");
    const actionRow = document.createElement("div");
    actionRow.className = "row";
    const continueBtn = document.createElement("button");
    continueBtn.textContent = "Weiter";
    actionRow.appendChild(continueBtn);
    fb.insertAdjacentElement("afterend", actionRow);
    continueBtn.addEventListener("click", () => {
      const bs = getBedState();
      const pid = phase2Session.plantId;
      const aidx = phase2Session.actionIndex;
      const pContent = getPlantContent(pid);
      const pState = bs.plants[pid];
      ensurePhase2Tracking(pContent, pState);
      const qStat = pState.phase2Questions[q.id];
      qStat.askedCount += 1;
      if (ok) {
        qStat.status = "learned";
      } else {
        qStat.status = "wrong";
        qStat.wrongCount += 1;
        markWeakpoint(pid, q.id);
      }
      computePhase2Readiness(pContent, pState);
      evaluateWither(pContent, pState);
      phase2Session = null;
      usePhase2Action(pid, aidx);
    });
  }

  if (q.type === "mc") {
    const shuffled = shuffle([...q.options.map((o, i) => ({ ...o, origIdx: i }))]);
    phase2Session.shuffledOptions = shuffled;
    const letters = ["A", "B", "C", "D"];
    const optHtml = shuffled.map((o, i) => {
      const label = `${letters[i]}) ${o.text}`;
      return `<button class="mc-option ${mcBtnClass(label)}" data-p2mc="${i}">${label}</button>`;
    }).join("");
    els.plantDetail.innerHTML = hint + `
      <div class="question">${q.question}</div>
      <div class="mc-options">${optHtml}</div>
      <div id="phase2-feedback" class="feedback"></div>
    `;
    els.plantDetail.querySelectorAll("[data-p2mc]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-p2mc"), 10);
        const chosen = phase2Session.shuffledOptions[idx];
        const ok = Boolean(chosen && chosen.correct);
        const fb = document.getElementById("phase2-feedback");
        const expl = q.explanation ? ` ${q.explanation}` : "";
        const correctText = (phase2Session.shuffledOptions.find((o) => o.correct) || {}).text || "";
        fb.textContent = ok ? `Richtig!${expl}` : `Falsch. Richtig: ${correctText}.${expl}`;
        els.plantDetail.querySelectorAll("[data-p2mc]").forEach((b) => {
          const i = parseInt(b.getAttribute("data-p2mc"), 10);
          if (phase2Session.shuffledOptions[i]?.correct) b.classList.add("mc-correct");
          else if (i === idx) b.classList.add("mc-wrong");
          b.disabled = true;
        });
        attachContinueAndResolve(fb, ok);
      });
    });
    return;
  }

  // true_false
  els.plantDetail.innerHTML = hint + `
    <div class="question">${q.statement}</div>
    <div class="row">
      <button data-p2a="true">Richtig</button>
      <button data-p2a="false">Falsch</button>
    </div>
    <div id="phase2-feedback" class="feedback"></div>
  `;
  els.plantDetail.querySelectorAll("[data-p2a]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const answer = btn.getAttribute("data-p2a") === "true";
      const ok = answer === q.answer;
      const fb = document.getElementById("phase2-feedback");
      fb.textContent = tfFeedback(q, answer);
      els.plantDetail.querySelectorAll("[data-p2a]").forEach((b) => b.setAttribute("disabled", "disabled"));
      attachContinueAndResolve(fb, ok);
    });
  });
}

function startHarvest(plantId) {
  const bedState = getBedState();
  const plantState = bedState?.plants?.[plantId];
  if (!plantState) return;
  const now = Date.now();
  if (plantState.cooldownUntil && now < plantState.cooldownUntil) {
    const sec = Math.ceil((plantState.cooldownUntil - now) / 1000);
    showToast(`Ernte noch gesperrt. Cooldown: ${sec}s`, "error");
    return;
  }
  const content = getPlantContent(plantId);
  harvestSession = {
    plantId,
    questions: shuffle([...content.harvestQuestions]),
    index: 0,
    correct: 0,
    wrongIds: []
  };
  renderHarvestQuestion();
}

function renderHarvestQuestion() {
  const q = harvestSession.questions[harvestSession.index];
  const progress = `${harvestSession.index + 1}/${harvestSession.questions.length}`;
  const bedState = getBedState();
  const plantState = bedState && bedState.plants[harvestSession.plantId];
  const plantContent = getPlantContent(harvestSession.plantId);

  function advanceHarvest() {
    harvestSession.index += 1;
    if (harvestSession.index >= harvestSession.questions.length) finalizeHarvest();
    else renderHarvestQuestion();
  }

  function attachContinueBtn(fb) {
    const actionRow = document.createElement("div");
    actionRow.className = "row";
    const continueBtn = document.createElement("button");
    continueBtn.textContent = "Weiter";
    continueBtn.addEventListener("click", advanceHarvest);
    actionRow.appendChild(continueBtn);
    fb.insertAdjacentElement("afterend", actionRow);
  }

  if (q.type === "mc") {
    const shuffled = shuffle([...q.options.map((o, i) => ({ ...o, origIdx: i }))]);
    harvestSession.shuffledOptions = shuffled;
    const letters = ["A", "B", "C", "D"];
    const optHtml = shuffled.map((o, i) => {
      const label = `${letters[i]}) ${o.text}`;
      return `<button class="mc-option ${mcBtnClass(label)}" data-oi="${i}">${label}</button>`;
    }).join("");
    els.plantDetail.innerHTML = `
      <div class="muted detail-hint">🌾 Ernte (${progress})</div>
      <div class="question">${q.question}</div>
      <div class="mc-options">${optHtml}</div>
      <div id="harvest-feedback" class="feedback"></div>
    `;
    els.plantDetail.querySelectorAll(".mc-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-oi"), 10);
        const chosen = harvestSession.shuffledOptions[idx];
        const ok = Boolean(chosen && chosen.correct);
        if (ok) { harvestSession.correct += 1; playSound("harvest.mp3"); renderGardenRoom(); }
        else { harvestSession.wrongIds.push(q.id); markWeakpoint(harvestSession.plantId, q.id); playSound("wrong.mp3"); }
        const fb = document.getElementById("harvest-feedback");
        const correctText = (harvestSession.shuffledOptions.find((o) => o.correct) || {}).text || "";
        const expl = q.explanation ? ` ${q.explanation}` : "";
        fb.textContent = ok ? `Richtig!${expl}` : `Falsch. Richtig: ${correctText}.${expl}`;
        fb.classList.add(ok ? "feedback--correct" : "feedback--wrong");
        els.plantDetail.querySelectorAll(".mc-option").forEach((b) => {
          const i = parseInt(b.getAttribute("data-oi"), 10);
          if (harvestSession.shuffledOptions[i]?.correct) b.classList.add("mc-correct");
          else if (i === idx) b.classList.add("mc-wrong");
          b.disabled = true;
        });
        attachContinueBtn(fb);
      });
    });
    return;
  }

  // true/false
  els.plantDetail.innerHTML = `
    <div class="muted detail-hint">🌾 Ernte (${progress})</div>
    <div class="question">${q.statement}</div>
    <div class="row">
      <button data-h="true">Richtig</button>
      <button data-h="false">Falsch</button>
    </div>
    <div id="harvest-feedback" class="feedback"></div>
  `;
  els.plantDetail.querySelectorAll("[data-h]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const answer = btn.getAttribute("data-h") === "true";
      const ok = answer === q.answer;
      if (ok) { harvestSession.correct += 1; playSound("harvest.mp3"); renderGardenRoom(); }
      else { harvestSession.wrongIds.push(q.id); markWeakpoint(harvestSession.plantId, q.id); playSound("wrong.mp3"); }
      const fb = document.getElementById("harvest-feedback");
      fb.textContent = tfFeedback(q, answer);
      fb.classList.add(ok ? "feedback--correct" : "feedback--wrong");
      els.plantDetail.querySelectorAll("[data-h]").forEach((b) => b.setAttribute("disabled", "disabled"));
      attachContinueBtn(fb);
    });
  });
}

function finalizeHarvest() {
  const bedState = getBedState();
  if (!bedState) return;
  const pack = getPackState();
  const plantState = bedState.plants[harvestSession.plantId];
  const total = harvestSession.questions.length;
  const wrongCount = harvestSession.wrongIds.length;
  pack.stats.harvestAttempts += 1;

  let harvestedIdForReturn = null;
  if (wrongCount === 0) {
    // All correct → harvest success
    const fruitsGained = harvestSession.correct;
    pack.player.fruits += fruitsGained;
    plantState.harvestedOnce = true;
    plantState.lastHarvestFruits = fruitsGained;
    plantState.status = "completed";
    plantState.readiness = 0;
    plantState.readinessActionsUsed = 0;
    plantState.cooldownUntil = null;
    const harvestedId = harvestSession.plantId;
    harvestedIdForReturn = harvestedId;
    const idx = bedState.activePlantIds.indexOf(harvestedId);
    if (idx >= 0) bedState.activePlantIds.splice(idx, 1);
    harvestSession = null;
    trackDailyActivity();
    addXp(5);
    pack.stats.harvestSuccesses += 1;
    playSound("twinkle done.mp3");
    showToast(`Ernte bestanden! Alle ${total} Fragen richtig. +${fruitsGained} Früchte`, "success");
  } else {
    // Some wrong → only reset wrong questions, plant back to phase 2
    const plantContent = getPlantContent(harvestSession.plantId);
    ensurePhase2Tracking(plantContent, plantState);
    harvestSession.wrongIds.forEach((qId) => {
      if (plantState.phase2Questions[qId]) {
        plantState.phase2Questions[qId].status = "wrong";
      }
    });
    // Reset phase2SeqStep to the first action that has wrong questions
    const phase2ActionCount = Math.max(1, plantContent.phase2.length || 1);
    const wrongActionIdxs = harvestSession.wrongIds
      .map(qId => {
        const qi = (plantContent.harvestQuestions || []).findIndex(q => q.id === qId);
        return qi >= 0 ? qi % phase2ActionCount : -1;
      })
      .filter(i => i >= 0)
      .sort((a, b) => a - b);
    if (wrongActionIdxs.length > 0) {
      const firstWrongIdx = wrongActionIdxs[0];
      const curStep = plantState.phase2SeqStep || 0;
      const curIdx = curStep % phase2ActionCount;
      const cycleBase = Math.floor(curStep / phase2ActionCount) * phase2ActionCount;
      plantState.phase2SeqStep = firstWrongIdx >= curIdx
        ? cycleBase + firstWrongIdx
        : cycleBase + phase2ActionCount + firstWrongIdx;
    }
    computePhase2Readiness(plantContent, plantState);
    evaluateWither(plantContent, plantState);
    // Bar shows proportion of correct answers (e.g. 4/6 correct → 67%)
    plantState.readinessActionsUsed = phase2ActionCount * (total - wrongCount) / total;
    plantState.cooldownUntil = null;
    plantState.status = "growing";
    showToast(`${wrongCount} von ${total} Fragen falsch – Pflanze zurück in Phase 2.`);
  }

  harvestSession = null;
  saveState();
  renderAll();
  if (harvestedIdForReturn) {
    const capturedId = harvestedIdForReturn;
    setTimeout(() => {
      if (selectedPlantId === capturedId) {
        selectedPlantId = null;
        saveState();
        renderAll();
      }
    }, 2500);
  }
}

function maybeUnlockMoreBedSlots() {
  const p = getBedProgress();
  if (p.unlockSlots >= SEED_BEDS.length) return;
  p.unlockSlots += 1;
  showToast(`Boss besiegt! +1 Beet-Slot freigeschaltet (${p.unlockSlots} gesamt).`, "success");
}


function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

function startCooldownTicker() {
  setInterval(() => {
    if (document.activeElement?.id === "seed-add-select") return;
    renderGardenRoom();
    checkPlantSoundTriggers();
    if (!selectedPlantId) return;
    if (harvestSession) return;
    const bedState = getBedState();
    const plant = bedState?.plants[selectedPlantId];
    const now = Date.now();
    if (plant && plant.cooldownUntil && now < plant.cooldownUntil) {
      renderLeftPanel();
    }
    updateReactiveFavicon();
  }, 1000);
}

function checkPlantSoundTriggers() {
  const pack = getPackState();
  if (!pack?.beds) return;
  const now = Date.now();
  for (const [bedId, bedState] of Object.entries(pack.beds)) {
    if (!bedState?.plants) continue;
    for (const [plantId, plantState] of Object.entries(bedState.plants)) {
      const content = getPlantContentByBed(bedId, plantId);
      if (!content) continue;
      const visual = getPlantVisualState(content, plantState);
      const harvestable = visual?.phase === "phase3";
      const cooldownDone = !plantState.cooldownUntil || now >= plantState.cooldownUntil;

      if (plantId in prevPlantSoundStates) {
        const prev = prevPlantSoundStates[plantId];
        const potionJustUsed = Date.now() - potionSoundPlayedAt < 1200;
        if (harvestable && !prev.harvestable) {
          if (!potionJustUsed) playSound("twinkle done.mp3");
        } else if (cooldownDone && !prev.cooldownDone && !harvestable) {
          if (!potionJustUsed) playSound("twinkle.mp3");
        }
      }

      prevPlantSoundStates[plantId] = { harvestable, cooldownDone };
    }
  }
}

function getFaviconSignal() {
  const pack = getPackState();
  if (!pack || !pack.beds) {
    return {
      activePlants: 0,
      readyLearn: 0,
      readyHarvest: 0
    };
  }
  let activePlants = 0;
  let readyLearn = 0;
  let readyHarvest = 0;
  const now = Date.now();

  PACK_CONTENT.beds.forEach((bed) => {
    const bedState = pack.beds[bed.id];
    if (!bedState) return;
    const activeIds = bedState.activePlantIds || [];
    activeIds.forEach((plantId) => {
      const plantState = bedState.plants[plantId];
      const plantContent = getPlantContentByBed(bed.id, plantId);
      if (!plantState || !plantContent) return;
      activePlants += 1;

      if (plantState.phase2Withered) {
        readyLearn += 1;
        return;
      }
      if (!plantState.phase1Completed) {
        readyLearn += 1;
        return;
      }

      ensurePhase2Tracking(plantContent, plantState);
      const onCooldown = Boolean(plantState.cooldownUntil && now < plantState.cooldownUntil);
      if (onCooldown) return;
      const allLearned = areAllPhase2QuestionsLearned(plantContent, plantState);
      if (allLearned) readyHarvest += 1;
      else readyLearn += 1;
    });
  });

  return { activePlants, readyLearn, readyHarvest };
}

function ensureFaviconLink() {
  let link = document.querySelector("link[rel='icon'][data-reactive='1']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    link.setAttribute("data-reactive", "1");
    document.head.appendChild(link);
  }
  return link;
}

function updateReactiveFavicon() {
  const signal = getFaviconSignal();
  const signature = `${signal.activePlants}:${signal.readyLearn}:${signal.readyHarvest}`;
  if (signature === lastFaviconSignature) return;
  lastFaviconSignature = signature;

  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const hasActive = signal.activePlants > 0;
  const hasAnyReady = signal.readyHarvest > 0 || signal.readyLearn > 0;
  let dotColor = null;
  if (signal.readyHarvest > 0) dotColor = "#ea7a00"; // orange
  else if (signal.readyLearn > 0) dotColor = "#2d6cdf"; // blau

  const hasReady = hasAnyReady;
  const leafColor = !hasActive ? "#7b8794" : hasReady ? "#2f6b3d" : "#4f6f8f";
  const potColor = !hasActive ? "#8b8f96" : "#8b5e3c";

  // pot
  ctx.fillStyle = potColor;
  ctx.fillRect(7, 18, 18, 9);

  // stem
  ctx.fillStyle = "#2f6b3d";
  ctx.fillRect(15, 9, 2, 10);

  // canopy
  ctx.fillStyle = leafColor;
  ctx.beginPath();
  ctx.arc(16, 10, 7, 0, Math.PI * 2);
  ctx.fill();

  // ready indicator
  if (hasAnyReady && dotColor) {
    ctx.fillStyle = dotColor;
    ctx.beginPath();
    ctx.arc(25, 7, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  const link = ensureFaviconLink();
  link.href = canvas.toDataURL("image/png");

  const preview = document.getElementById("favicon-preview");
  if (preview) {
    const pctx = preview.getContext("2d");
    if (pctx) {
      pctx.clearRect(0, 0, 32, 32);
      pctx.drawImage(canvas, 0, 0);
    }
  }
}

function clearPanelFocus() {
  document.querySelectorAll(".panel.panel--focus").forEach((el) => el.classList.remove("panel--focus"));
}

function getPanelForSection(section) {
  if (section === "settings") return document.getElementById("panel-settings");
  if (section === "beds") return document.getElementById("panel-beds");
  if (section === "detail") return document.getElementById("panel-detail");
  // "seed" and "lab" are in the player panel.
  return document.getElementById("panel-player");
}

function setElementHidden(id, hidden) {
  const el = document.getElementById(id);
  if (!el) return;
  el.hidden = hidden;
}

function setWorldVisible(_visible) {
  // No-op: world view is always visible in new Plant Tycoon layout
}

function applyPlayerPanelFilter(_mode, _section) {
  // No-op: panel visibility handled by modals in new layout
}

function setUiPanelMode(mode, section) {
  const settings = document.getElementById("panel-settings");
  const player = document.getElementById("panel-player");
  const beds = document.getElementById("panel-beds");
  const detail = document.getElementById("panel-detail");
  const expandBtn = document.getElementById("expand-ui-btn");
  const panels = [settings, player, beds, detail].filter(Boolean);

  panels.forEach((p) => { p.hidden = false; });
  if (settings) settings.hidden = true;
  applyPlayerPanelFilter("full", "seed");
  if (expandBtn) expandBtn.hidden = true;
  if (mode !== "compact") return;

  const visible = new Set([]);
  if (section === "settings") {
    visible.add("panel-settings");
  } else if (section === "seed" || section === "lab") {
    visible.add("panel-player");
  } else if (section === "beds") {
    visible.add("panel-beds");
    visible.add("panel-detail");
  } else if (section === "detail") {
    visible.add("panel-detail");
  } else {
    visible.add("panel-player");
  }

  panels.forEach((p) => {
    p.hidden = !visible.has(p.id);
  });
  applyPlayerPanelFilter("compact", section);
  if (expandBtn) expandBtn.hidden = false;
}

function showMainUi(_opts) {
  // No-op: new layout always shows the garden room
  renderAll();
}

function hideMainUi() {
  // No-op: garden room always visible
}

function focusSectionPanel(_section) {
  // No-op: no panel focus in new layout
}

function openFromWorld(target) {
  const t = target || {};
  if (t.bedId && t.bedId !== state.activeBedId) {
    setActiveBed(t.bedId);
  } else {
    renderAll();
  }
}

function openPlantFromWorld(bedId, plantId) {
  if (!bedId || !plantId) return;
  selectPlantInGarden(plantId, bedId);
}

function openSettingsPage() {
  openModal("modal-settings");
}

// ── Modal helpers ──────────────────────────────────────────────────────────
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.hidden = false;
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.hidden = true;
}

function openCatalogModal(filterBedId) {
  catalogFilterBedId = filterBedId || null;
  if (filterBedId) expandedSeedCatalogBedId = filterBedId;
  renderSeedLibrary();
  openModal("modal-catalog");
}


// ── Restaurant / Praxis System ─────────────────────────────────────────────

const RE_PATIENCE_MS  = 40000;
const RE_TICK_MS      = 200;
const RE_MAX_CUST     = 5;
const RE_SPAWN_BASE   = 12000;
const RE_COOK_BASE    = 6000;

// ── Pizza toppings (unlockable + restockable) ───────────────────────────────
const RE_TOPPINGS = [
  { id: "bacon",            label: "Bacon",         img: "assets/images/Pizza/bacon.png",            cost: 3, restockAmt: 5 },
  { id: "basil",            label: "Basilikum",     img: "assets/images/Pizza/basil.png",            cost: 2, restockAmt: 5 },
  { id: "egg",              label: "Ei",            img: "assets/images/Pizza/egg.png",              cost: 4, restockAmt: 1 },
  { id: "green_bellpepper", label: "Grüne Paprika", img: "assets/images/Pizza/green_bellpepper.png", cost: 2, restockAmt: 5 },
  { id: "gruene_oliven",    label: "Gr. Oliven",    img: "assets/images/Pizza/grüne_oliven.png",     cost: 3, restockAmt: 5 },
  { id: "ham",              label: "Schinken",      img: "assets/images/Pizza/ham.png",              cost: 3, restockAmt: 5 },
  { id: "jalapenio",        label: "Jalapeño",      img: "assets/images/Pizza/jalapenio.png",        cost: 2, restockAmt: 5 },
  { id: "onion",            label: "Zwiebeln",      img: "assets/images/Pizza/onion.png",            cost: 2, restockAmt: 5 },
  { id: "red_bellpepper",   label: "Rote Paprika",  img: "assets/images/Pizza/red_bellpepper.png",   cost: 2, restockAmt: 5 },
  { id: "salami",           label: "Salami",        img: "assets/images/Pizza/salami.png",           cost: 3, restockAmt: 5 },
  { id: "schwarze_oliven",  label: "Schw. Oliven",  img: "assets/images/Pizza/schwarze_oliven.png",  cost: 3, restockAmt: 5 },
  { id: "shrimp",           label: "Garnelen",      img: "assets/images/Pizza/shrimp.png",           cost: 4, restockAmt: 5 },
  { id: "shroomi",          label: "Pilze",         img: "assets/images/Pizza/shroomi.png",          cost: 2, restockAmt: 5 },
  { id: "sucuck",           label: "Sucuk",         img: "assets/images/Pizza/sucuck.png",           cost: 3, restockAmt: 5 },
  { id: "tomato",           label: "Tomaten",       img: "assets/images/Pizza/tomato.png",           cost: 2, restockAmt: 5 },
];

// ── Drinks ──────────────────────────────────────────────────────────────────
const RE_DRINKS = [
  { id: "water", label: "Wasser", icon: "💧", cost: 0, unlimited: true },
  { id: "cola",  label: "Cola",   icon: "🥤", cost: 3, restockAmt: 5 },
  { id: "beer",  label: "Bier",   icon: "🍺", cost: 4, restockAmt: 5 },
  { id: "wine",  label: "Wein",   icon: "🍷", cost: 5, restockAmt: 5 },
];

const RE_PIZZA_MAX_TOPPINGS = 25;
const RE_MAX_ACTIVE_PIZZAS  = 10;

// Predetermined dirt spot positions (% within dining area)
const RE_DIRT_POS = [
  {x:18,y:72},{x:47,y:82},{x:71,y:62},{x:28,y:52},{x:62,y:88},
  {x:82,y:68},{x:38,y:92},{x:57,y:48},{x:12,y:88},{x:77,y:44}
];

const RE_TABLE_SLOTS = [
  { x: 38, y: 22 }, { x: 64, y: 22 },
  { x: 38, y: 60 }, { x: 64, y: 60 },
  { x: 83, y: 40 },
  { x: 51, y: 40 }, { x: 83, y: 70 },
  { x: 51, y: 75 }
];
const RE_COOK_POS   = [
  { x: 12, y: 32 }, { x: 12, y: 56 }, { x: 12, y: 76 },
  { x: 20, y: 18 }, { x: 20, y: 90 }
];
const RE_ENTRANCE   = { x: 93, y: 78 };
const RE_EXIT_POS   = { x: 98, y: 92 };
const RE_DELIVER_MS = 2200;
const RE_ARRIVE_MS  = 2400;

const CUST_PALETTES = [
  { skin: "#f5c5a0", hair: "#3a2200", shirt: "#cc4444", pants: "#334488" },
  { skin: "#c88060", hair: "#111111", shirt: "#4488cc", pants: "#333344" },
  { skin: "#ffe0c8", hair: "#cc9900", shirt: "#44aa44", pants: "#884444" },
  { skin: "#a06040", hair: "#222222", shirt: "#aa44aa", pants: "#445522" },
  { skin: "#f0d0b0", hair: "#884422", shirt: "#dd7700", pants: "#224488" },
];

let reLastUpgradeSignature = "";
let reActiveNav = null;
let reLastPanelSignature = "";

let restaurantSession = null;
let sessionStats = { questionsAnswered: 0, correct: 0, wrong: 0, startTime: Date.now() };

function reGetRestaurant(bedId) {
  const bedState = getPackState().beds[bedId];
  const basicRecipe = { id: "basic", name: "Basic Pizza", toppings: [], active: true, orderedCount: 0, deletable: false };
  if (!bedState.restaurant) {
    bedState.restaurant = {
      unlockedCooks: 1, unlockedTables: [0, 1],
      unlockedToppings: [], unlockedDrinks: ["water"],
      stocks: {}, pizzaRecipes: [{ ...basicRecipe }],
      questionAnswers: {},
      totalCustStats: { sad: 0, neutral: 0, happy: 0, veryHappy: 0, waitTimeout: 0, dirtLeave: 0, cravingUnmet: 0, cravingIngredientNA: 0, cravingDislikeConflict: 0 }
    };
    saveState();
  }
  const r = bedState.restaurant;
  r.pizzaRecipes.find(p => p.id === "basic").deletable = false;
  return r;
}

// Returns the next question to ask, respecting priority: unseen > wrong > correct (repeat mode only).
// Returns null if all questions answered correctly and allowRepeat is false.
function rePickQuestion(bedId, allowRepeat = false) {
  const bedContent = PACK_CONTENT.beds.find(b => b.id === bedId);
  const answers = getPackState().beds[bedId].restaurant.questionAnswers || {};
  const all = [];
  (bedContent?.plants || []).forEach(p => {
    (p.harvestQuestions || []).forEach(q => all.push(q));
    (p.phase4Questions || []).forEach(q => all.push(q));
  });
  const unseen  = all.filter(q => !answers[q.id]);
  const wrong   = all.filter(q => answers[q.id] === "wrong");
  const correct = all.filter(q => answers[q.id] === "correct");
  let pool;
  if (unseen.length > 0)                      pool = unseen;
  else if (wrong.length > 0)                  pool = wrong;
  else if (allowRepeat && correct.length > 0) pool = correct;
  else return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

function buildChefHtml() {
  return `<svg class="re-fig re-fig--chef" width="26" height="44" viewBox="0 0 26 44" xmlns="http://www.w3.org/2000/svg">
    <rect x="9" y="1" width="8" height="3" rx="1" fill="white" stroke="#ccc" stroke-width="0.4"/>
    <rect x="11" y="-1" width="4" height="5" rx="1" fill="white" stroke="#ccc" stroke-width="0.4"/>
    <circle cx="13" cy="10" r="6" fill="#f5c5a0" stroke="#e0a070" stroke-width="0.5"/>
    <circle cx="11" cy="10" r="0.9" fill="#7a4020" opacity="0.8"/>
    <circle cx="15" cy="10" r="0.9" fill="#7a4020" opacity="0.8"/>
    <path d="M11 12.5 Q13 14.5 15 12.5" stroke="#7a4020" stroke-width="0.7" fill="none" opacity="0.8"/>
    <rect x="9" y="16" width="8" height="10" rx="2" fill="white" stroke="#ddd" stroke-width="0.4"/>
    <line x1="13" y1="17" x2="13" y2="25" stroke="#ddd" stroke-width="0.5"/>
    <rect x="4" y="16" width="5" height="8" rx="2.5" fill="white" stroke="#ddd" stroke-width="0.4"/>
    <rect x="17" y="16" width="5" height="8" rx="2.5" fill="white" stroke="#ddd" stroke-width="0.4"/>
    <circle cx="6.5" cy="24" r="2.2" fill="#f5c5a0" stroke="#e0a070" stroke-width="0.4"/>
    <circle cx="19.5" cy="24" r="2.2" fill="#f5c5a0" stroke="#e0a070" stroke-width="0.4"/>
    <rect x="9" y="26" width="3.5" height="13" rx="1.5" fill="#334455"/>
    <rect x="13.5" y="26" width="3.5" height="13" rx="1.5" fill="#334455"/>
    <ellipse cx="10.5" cy="39.5" rx="3.2" ry="1.8" fill="#222"/>
    <ellipse cx="15.5" cy="39.5" rx="3.2" ry="1.8" fill="#222"/>
  </svg><div class="re-carry" style="display:none"></div><div class="re-sprite-progress" style="display:none"><div class="re-sprite-progress-fill"></div></div>`;
}

function buildCustomerHtml(customerId) {
  const pal = CUST_PALETTES[customerId % CUST_PALETTES.length];
  return `<svg class="re-fig re-fig--customer" width="22" height="40" viewBox="0 0 22 40" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="11" cy="5" rx="5.5" ry="3.5" fill="${pal.hair}"/>
    <circle cx="11" cy="9" r="5.5" fill="${pal.skin}" stroke="#c09060" stroke-width="0.4"/>
    <circle cx="9.2" cy="9" r="0.8" fill="#5a3020" opacity="0.8"/>
    <circle cx="12.8" cy="9" r="0.8" fill="#5a3020" opacity="0.8"/>
    <path d="M9.2 11.5 Q11 13 12.8 11.5" stroke="#5a3020" stroke-width="0.6" fill="none" opacity="0.7"/>
    <rect x="7" y="15" width="8" height="10" rx="2" fill="${pal.shirt}"/>
    <rect x="2" y="15" width="5" height="8" rx="2.5" fill="${pal.skin}" stroke="#c09060" stroke-width="0.3"/>
    <rect x="15" y="15" width="5" height="8" rx="2.5" fill="${pal.skin}" stroke="#c09060" stroke-width="0.3"/>
    <rect x="7" y="25" width="3.5" height="11" rx="1.5" fill="${pal.pants}"/>
    <rect x="11.5" y="25" width="3.5" height="11" rx="1.5" fill="${pal.pants}"/>
    <ellipse cx="9" cy="36.5" rx="3" ry="1.5" fill="#333"/>
    <ellipse cx="13" cy="36.5" rx="3" ry="1.5" fill="#333"/>
  </svg><div class="re-sprite-patience"><div class="re-sprite-patience-fill"></div></div><div class="re-sprite-eat-bar" style="display:none"><div class="re-sprite-eat-fill"></div></div><div class="re-sprite-food-icon" style="display:none"></div><div class="re-sprite-outcome" style="display:none"></div>`;
}


function getCookPos(cook, cookIndex, session) {
  const kp = RE_COOK_POS[cookIndex] || { x: 12, y: 50 };
  if (cook.targetId == null || cook.state === "idle") return { x: kp.x, y: kp.y, carrying: null, phase: "idle" };
  const cust = session.customers.find(c => c.id === cook.targetId);
  const slot = cust?.tableSlot ?? 0;
  const tp = RE_TABLE_SLOTS[slot] || RE_TABLE_SLOTS[0];
  if (cook.state === "delivering") {
    const prog = Math.min(1, 1 - (cook.deliverTimer / RE_DELIVER_MS));
    return { x: kp.x + (tp.x - kp.x) * prog, y: kp.y + (tp.y - kp.y) * prog, carrying: cook.cookIcons, phase: "delivering" };
  }
  if (cook.state === "cooking") {
    const prog = 1 - (cook.cookTimer / cook.cookTimerMax);
    if (prog < 0.28) {
      const t = prog / 0.28;
      return { x: kp.x + (tp.x - kp.x) * t, y: kp.y + (tp.y - kp.y) * t, carrying: null, phase: "going" };
    } else if (prog < 0.40) {
      return { x: tp.x, y: tp.y, carrying: null, phase: "at_table" };
    } else {
      const t = Math.min(1, (prog - 0.40) / 0.30);
      return { x: tp.x + (kp.x - tp.x) * t, y: tp.y + (kp.y - tp.y) * t, carrying: null, phase: t >= 1 ? "cooking" : "returning" };
    }
  }
  return { x: kp.x, y: kp.y, carrying: null, phase: "idle" };
}

function getCustomerPos(c) {
  // Entrance-waiting: no table assigned yet
  if (c.tableSlot === -1) {
    const offset = (c.id % 5) * 2;  // spread them slightly so they don't stack
    if (c.state === "leaving_happy" || c.state === "leaving_sad") {
      const prog = Math.min(1, 1 - (c.leaveTimer / 900));
      return { x: RE_ENTRANCE.x + offset + (RE_EXIT_POS.x - RE_ENTRANCE.x - offset) * prog,
               y: RE_ENTRANCE.y + (RE_EXIT_POS.y - RE_ENTRANCE.y) * prog };
    }
    return { x: RE_ENTRANCE.x + offset, y: RE_ENTRANCE.y };
  }
  const slot = c.tableSlot ?? 0;
  const tp = RE_TABLE_SLOTS[slot] || RE_TABLE_SLOTS[0];
  if (c.state === "leaving_happy" || c.state === "leaving_sad") {
    const prog = Math.min(1, 1 - (c.leaveTimer / 900));
    return { x: tp.x + (RE_EXIT_POS.x - tp.x) * prog, y: tp.y + (RE_EXIT_POS.y - tp.y) * prog };
  }
  const arr = Math.min(1, (c.arrivalProgress || 0));
  return { x: RE_ENTRANCE.x + (tp.x - RE_ENTRANCE.x) * arr, y: RE_ENTRANCE.y + (tp.y - RE_ENTRANCE.y) * arr };
}

function assignTableSlot(session, restaurant) {
  const used = new Set(session.customers.map(c => c.tableSlot));
  const sorted = [...restaurant.unlockedTables].sort((a, b) => a - b);
  for (const i of sorted) { if (!used.has(i)) return i; }
  return -1; // all unlocked tables occupied — customer waits at entrance
}


function assignCravings(restaurant) {
  const toppings = restaurant.unlockedToppings;
  const drinks   = restaurant.unlockedDrinks.filter(id => id !== "water");
  // 1 or 2 food cravings
  let cravings = [];
  if (toppings.length > 0 && Math.random() < 0.80) {
    const t1 = toppings[Math.floor(Math.random() * toppings.length)];
    cravings = [t1];
    if (toppings.length > 1 && Math.random() < 0.35) {
      const rest = toppings.filter(t => t !== t1);
      cravings.push(rest[Math.floor(Math.random() * rest.length)]);
    }
  }
  // Drink craving
  const cravingDrink = drinks.length > 0 && Math.random() < 0.65
    ? drinks[Math.floor(Math.random() * drinks.length)] : null;
  // Disliked topping (never overlaps with cravings)
  let dislikedTopping = null;
  if (toppings.length > 1 && Math.random() < 0.28) {
    const notCraved = toppings.filter(t => !cravings.includes(t));
    if (notCraved.length > 0)
      dislikedTopping = notCraved[Math.floor(Math.random() * notCraved.length)];
  }
  return { cravings, cravingDrink, dislikedTopping };
}

function selectOrder(restaurant, customer) {
  const { cravings, dislikedTopping, cravingDrink } = customer;
  const activePizzas = restaurant.pizzaRecipes.filter(p => p.active);
  // Filter out pizzas containing the disliked topping
  const noDislike = dislikedTopping
    ? activePizzas.filter(p => !p.toppings.some(t => t.id === dislikedTopping))
    : [...activePizzas];
  // Filter out pizzas where any topping is out of stock
  const eligible = noDislike.filter(p => p.toppings.every(t => (restaurant.stocks[t.id] || 0) > 0));
  const pool = eligible.length > 0 ? eligible : activePizzas.filter(p => p.id === "basic");
  // Score: 1 point if ALL food cravings are on the pizza (combo), 0 otherwise
  const scored = pool.map(p => {
    const ids = new Set(p.toppings.map(t => t.id));
    const comboMet = (cravings || []).length === 0 || (cravings || []).every(c => ids.has(c));
    return { pizza: p, score: comboMet ? 1 : 0 };
  });
  const maxScore = Math.max(...scored.map(s => s.score));
  const best = scored.filter(s => s.score === maxScore);
  const pizza = best[Math.floor(Math.random() * best.length)].pizza;
  // Drink: craved if available + in stock, else water
  const drinkAvail = cravingDrink && restaurant.unlockedDrinks.includes(cravingDrink)
    && (RE_DRINKS.find(d => d.id === cravingDrink)?.unlimited || (restaurant.stocks[cravingDrink] || 0) > 0);
  return { pizzaId: pizza.id, pizzaName: pizza.name, drinkId: drinkAvail ? cravingDrink : "water" };
}

function pizzaSatiety(pizza) {
  const distinct = new Set((pizza?.toppings || []).map(t => t.id)).size;
  return Math.min(90, 35 + distinct * 6);
}

function reSyncCooks() {
  if (!restaurantSession) return;
  const n = getPackState().beds[restaurantSession.bedId].restaurant.unlockedCooks;
  while (restaurantSession.cooks.length < n)
    restaurantSession.cooks.push({ id: restaurantSession.cooks.length, state: "idle", cookTimer: 0, cookTimerMax: 1, targetId: null, cookIcons: "" });
}


function addDirtSpot(session) {
  const used = new Set(session.dirtSpots);
  for (let i = 0; i < RE_DIRT_POS.length; i++) {
    if (!used.has(i)) { session.dirtSpots.push(i); return; }
  }
}

function openRestaurant(bedId) {
  stopRestaurant();
  reGetRestaurant(bedId);
  restaurantSession = {
    bedId, cooks: [], customers: [], nextCustomerId: 0,
    spawnTimer: 1200, totalServed: 0, totalImpatient: 0, fruitsEarned: 0,
    paused: false, unlockQ: null, reLabelEx: null, currentUnlocks: [], gameLoopId: null,
    dirtSpots: [],
    custStats: { sad: 0, neutral: 0, happy: 0, veryHappy: 0,
                 waitTimeout: 0, dirtLeave: 0,
                 cravingUnmet: 0, cravingIngredientNA: 0, cravingDislikeConflict: 0 }
  };
  reSyncCooks();
  reLastUpgradeSignature = "";
  reActiveNav = null;
  reLastPanelSignature = "";
  reInitScene(bedId);
  restaurantSession.gameLoopId = setInterval(restaurantTick, RE_TICK_MS);
  reUpdateScene();
}

function stopRestaurant() {
  if (restaurantSession?.gameLoopId) clearInterval(restaurantSession.gameLoopId);
  if (restaurantSession) saveState(); // persist final stocks + totalCustStats
  restaurantSession = null;
}

function restaurantTick() {
  if (!restaurantSession) return;
  const modal = document.getElementById("modal-room");
  if (!modal || modal.hidden) { stopRestaurant(); return; }
  if (restaurantSession.paused) return;

  const session = restaurantSession;
  const bedState = getPackState().beds[session.bedId];
  const restaurant = bedState.restaurant;

  // Dirt factors: each spot adds 0.15x patience drain, capped at 3x total (e.g. 5 spots → 1.75x, 13+ → 3x)
  const dirtCount = session.dirtSpots.length;
  const dirtFactor = 1.0 + Math.min(dirtCount * 0.15, 2.0);
  const spawnPenalty = dirtCount > 6 ? 1.6 : 1.0; // customers arrive slower when very dirty

  // Spawn
  session.spawnTimer -= RE_TICK_MS;
  if (session.spawnTimer <= 0) {
    if (session.customers.length < RE_MAX_CUST) {
      const { cravings, cravingDrink, dislikedTopping } = assignCravings(restaurant);
      const slot = assignTableSlot(session, restaurant);
      session.customers.push({ id: session.nextCustomerId++, state: "waiting", patience: 100, hunger: 0, leaveTimer: 0, tableSlot: slot, arrivalProgress: slot === -1 ? 1 : 0, cravings, cravingDrink, dislikedTopping, order: null, satiety: 50 });
    }
    const base = Math.max(4000, RE_SPAWN_BASE - (restaurant.unlockedCooks - 1) * 1500);
    session.spawnTimer = base * spawnPenalty;
  }


  let needsSave = false;

  // Update customers
  session.customers = session.customers.filter(c => {
    if (c.state === "waiting") {
      if (c.tableSlot >= 0 && (c.arrivalProgress || 0) < 1) c.arrivalProgress = Math.min(1, (c.arrivalProgress || 0) + (RE_TICK_MS / RE_ARRIVE_MS));
      const entranceFactor = c.tableSlot === -1 ? 1.8 : 1.0;
      c.patience -= (RE_TICK_MS / RE_PATIENCE_MS) * 100 * dirtFactor * entranceFactor;
      if (c.patience <= 0) {
        c.patience = 0; c.state = "leaving_sad"; c.leaveTimer = 900;
        const p = getPackState().player;
        if (p.fruits > 0) { p.fruits--; needsSave = true; }
        session.totalImpatient++;
        session.custStats.sad++;
        restaurant.totalCustStats.sad++;
        session.custStats.waitTimeout++;
        restaurant.totalCustStats.waitTimeout++;
        if (session.dirtSpots.length > 0) {
          session.custStats.dirtLeave++;
          restaurant.totalCustStats.dirtLeave++;
        }
        if (Math.random() < 0.4) addDirtSpot(session);  // angry customers make extra mess
      }
    } else if (c.state === "eating") {
      c.hunger += (RE_TICK_MS / 5000) * (c.satiety || 50);
      if (c.hunger >= 100) {
        const pizza = restaurant.pizzaRecipes.find(p => p.id === c.order?.pizzaId);
        const toppingIds = new Set((pizza?.toppings || []).map(t => t.id));
        // Food cravings count as 1 combined point (all must be present), drink as 1 separate point
        const foodCravingMet = (c.cravings?.length || 0) === 0 || (c.cravings || []).every(cr => toppingIds.has(cr));
        const metDrink = c.cravingDrink && c.order?.drinkId === c.cravingDrink;
        const totalCravings = ((c.cravings?.length || 0) > 0 ? 1 : 0) + (c.cravingDrink ? 1 : 0);
        const metTotal = (foodCravingMet && (c.cravings?.length || 0) > 0 ? 1 : 0) + (metDrink ? 1 : 0);
        const sat = totalCravings === 0 ? "neutral"
          : metTotal === totalCravings ? "veryHappy"
          : metTotal > 0 ? "happy" : "neutral";
        c.satisfaction = sat;
        session.custStats[sat]++;
        restaurant.totalCustStats[sat]++;

        // Fruit rewards from happy customers
        const player = getPackState().player;
        if (sat === "happy" || sat === "veryHappy") {
          const allHarvested = PACK_CONTENT.beds.filter(b => b.id !== "hybrid")
            .every(b => getPackState().beds[b.id]?.restaurantUnlocked);
          const reward = sat === "veryHappy" ? (allHarvested ? 1.0 : 0.2) : (allHarvested ? 0.5 : 0.1);
          if (!player.fruitProgress) player.fruitProgress = 0;
          player.fruitProgress += reward;
          while (player.fruitProgress >= 1) { player.fruits++; player.fruitProgress -= 1; session.fruitsEarned++; }
          needsSave = true;
        }

        // Craving analysis (why wasn't it met?)
        if (sat !== "veryHappy") {
          (c.cravings || []).filter(cr => !toppingIds.has(cr)).forEach(cr => {
            session.custStats.cravingUnmet++;
            restaurant.totalCustStats.cravingUnmet++;
            const inStock = restaurant.unlockedToppings.includes(cr) && (restaurant.stocks[cr] || 0) > 0;
            if (!inStock) {
              session.custStats.cravingIngredientNA++;
              restaurant.totalCustStats.cravingIngredientNA++;
            } else {
              // Available but disliked-topping conflict blocked every matching pizza
              const matchingPizzas = restaurant.pizzaRecipes.filter(p => p.active && p.toppings.some(t => t.id === cr));
              if (matchingPizzas.length > 0 && c.dislikedTopping &&
                  matchingPizzas.every(p => p.toppings.some(t => t.id === c.dislikedTopping))) {
                session.custStats.cravingDislikeConflict++;
                restaurant.totalCustStats.cravingDislikeConflict++;
              }
            }
          });
          // Drink craving unmet
          if (c.cravingDrink && c.order?.drinkId !== c.cravingDrink) {
            session.custStats.cravingUnmet++;
            restaurant.totalCustStats.cravingUnmet++;
            const drinkAvail = restaurant.unlockedDrinks.includes(c.cravingDrink)
              && (RE_DRINKS.find(d => d.id === c.cravingDrink)?.unlimited || (restaurant.stocks[c.cravingDrink] || 0) > 0);
            if (!drinkAvail) {
              session.custStats.cravingIngredientNA++;
              restaurant.totalCustStats.cravingIngredientNA++;
            }
          }
        }

        c.state = "leaving_happy"; c.leaveTimer = 900; session.totalServed++;
      }
    } else if (c.state === "leaving_happy" || c.state === "leaving_sad") {
      c.leaveTimer -= RE_TICK_MS;
      if (c.leaveTimer <= 0) {
        if (Math.random() < 0.3) addDirtSpot(session);  // leaving customers drop dirt
        return false;
      }
    }
    return true;
  });

  // Reassign entrance-waiters to newly freed tables
  const occupiedSlots = new Set(session.customers.filter(c => c.tableSlot >= 0).map(c => c.tableSlot));
  const sortedUnlocked = [...restaurant.unlockedTables].sort((a, b) => a - b);
  session.customers.filter(c => c.tableSlot === -1 && c.state === "waiting").forEach(c => {
    for (const i of sortedUnlocked) {
      if (!occupiedSlots.has(i)) { c.tableSlot = i; c.arrivalProgress = 0; occupiedSlots.add(i); break; }
    }
  });

  // Update cooks
  session.cooks.forEach(cook => {
    if (cook.state === "delivering") {
      cook.deliverTimer -= RE_TICK_MS;
      if (cook.deliverTimer <= 0) {
        const t = session.customers.find(c => c.id === cook.targetId);
        if (t?.state === "being_served") { t.state = "eating"; t.hunger = 0; t.foodIcon = cook.cookIcons; t.foodToppings = cook.cookPizza || []; }
        cook.state = "idle"; cook.targetId = null;
      }
    }
    if (cook.state === "cooking") {
      cook.cookTimer -= RE_TICK_MS;
      if (cook.cookTimer <= 0) {
        cook.state = "delivering"; cook.deliverTimer = RE_DELIVER_MS;
      }
    }
    if (cook.state === "idle") {
      const busy = new Set(session.cooks.filter(c => c.id !== cook.id && c.targetId != null).map(c => c.targetId));
      const t = session.customers.find(c => c.state === "waiting" && !busy.has(c.id) && c.tableSlot >= 0 && (c.arrivalProgress || 0) >= 1);
      if (t) {
        // Determine order (chef will "take" it at the table during the at_table phase)
        t.order = selectOrder(restaurant, t);
        const pizza = restaurant.pizzaRecipes.find(p => p.id === t.order.pizzaId);
        if (pizza) pizza.orderedCount++;
        // Decrement drink stock
        const drink = RE_DRINKS.find(d => d.id === t.order.drinkId);
        if (drink && !drink.unlimited) restaurant.stocks[t.order.drinkId] = Math.max(0, (restaurant.stocks[t.order.drinkId] || 0) - 1);
        // Decrement stock per topping placement (3 bacon = costs 3 bacon)
        if (pizza) {
          const counts = {};
          pizza.toppings.forEach(tp => { counts[tp.id] = (counts[tp.id] || 0) + 1; });
          Object.entries(counts).forEach(([id, n]) => {
            restaurant.stocks[id] = Math.max(0, (restaurant.stocks[id] || 0) - n);
          });
        }
        t.satiety = pizzaSatiety(pizza);
        t.state = "being_served"; cook.state = "cooking"; cook.targetId = t.id;
        const distinctCount = pizza ? new Set(pizza.toppings.map(tp => tp.id)).size : 0;
        const ms = RE_COOK_BASE + distinctCount * 600;
        cook.cookTimer = ms; cook.cookTimerMax = ms;
        cook.cookIcons = "🍕";
        cook.cookPizza  = pizza ? pizza.toppings.map(tp => ({ ...tp })) : [];
        cook.cookDrink  = t.order?.drinkId || "water";
        needsSave = true;
      }
    }
  });

  if (needsSave) { saveState(); renderPlayer(); }
  reUpdateScene();
}

// ── Pizza manager ────────────────────────────────────────────────────────────
function buildRePizzaManagerHtml(restaurant) {
  const recipes = restaurant.pizzaRecipes;
  const activeCount = recipes.filter(p => p.active).length;
  const rows = recipes.map(p => {
    const distinctToppings = [...new Set(p.toppings.map(t => t.id))];
    const toppingPreviews = distinctToppings.slice(0, 8).map(id => {
      const t = RE_TOPPINGS.find(x => x.id === id);
      return t ? `<img src="${t.img}" class="re-pm-tip" title="${t.label}">` : "";
    }).join("") + (distinctToppings.length > 8 ? `<span class="re-pm-more">+${distinctToppings.length - 8}</span>` : "");
    const activeClass = p.active ? " re-pm-row--active" : "";
    const controls = p.deletable ? `
      <button class="re-pm-btn re-pm-btn--toggle${p.active ? "" : " re-pm-btn--off"}" onclick="togglePizzaActive('${p.id}')">${p.active ? "Aktiv" : "Inaktiv"}</button>
      <button class="re-pm-btn" onclick="openPizzaCreator('${p.id}')">✏️</button>
      <button class="re-pm-btn re-pm-btn--del" onclick="if(confirm('Pizza löschen?'))deletePizzaRecipe('${p.id}')">🗑️</button>` : `<span class="re-pm-badge">Standard</span>`;
    return `<div class="re-pm-row${activeClass}">
      <div class="re-pm-info">
        <div class="re-pm-name">${p.name}</div>
        <div class="re-pm-tips">${toppingPreviews || '<span class="muted" style="font-size:.7rem">Keine Zutaten</span>'}</div>
      </div>
      <div class="re-pm-meta">
        <span class="re-pm-orders">${p.orderedCount}×</span>
        <div class="re-pm-controls">${controls}</div>
      </div>
    </div>`;
  }).join("");
  return `<div class="re-pm-header">
    <span class="muted" style="font-size:.75rem">${activeCount}/${RE_MAX_ACTIVE_PIZZAS} aktiv</span>
    <button class="re-pm-create-btn" onclick="openPizzaCreator()">+ Neue Pizza</button>
  </div>${rows}`;
}

function openPizzaManager() {
  if (!restaurantSession) return;
  const panel = document.getElementById("re-pizza-manager");
  if (!panel) return;
  const restaurant = getPackState().beds[restaurantSession.bedId].restaurant;
  panel.hidden = !panel.hidden;
  if (!panel.hidden) panel.innerHTML = buildRePizzaManagerHtml(restaurant);
}

// ── Pizza creator ─────────────────────────────────────────────────────────────
let rePizzaCreatorState = null;

function openPizzaCreator(editId) {
  if (!restaurantSession) return;
  const restaurant = getPackState().beds[restaurantSession.bedId].restaurant;
  const player = getPackState().player;
  const existing = editId ? restaurant.pizzaRecipes.find(p => p.id === editId) : null;
  rePizzaCreatorState = { toppings: existing ? existing.toppings.map(t => ({ ...t })) : [], editingId: editId || null };
  const overlay = document.getElementById("re-pizza-creator");
  if (!overlay) return;
  const nameEl = document.getElementById("re-pc-name");
  if (nameEl) nameEl.value = existing?.name || "";
  reBuildCreatorPalette(restaurant, player);
  reRenderPizzaCanvas();
  overlay.hidden = false;
}

function reBuildCreatorPalette(restaurant, player) {
  const palette = document.getElementById("re-pc-palette");
  if (!palette || !restaurantSession) return;
  const unlocks = reRebuildUnlocks(restaurantSession, restaurant);
  const canAsk = player.fruits >= 1;
  // Count toppings already placed on current pizza
  const placed = {};
  (rePizzaCreatorState?.toppings || []).forEach(t => { placed[t.id] = (placed[t.id] || 0) + 1; });

  palette.innerHTML = RE_TOPPINGS.map(t => {
    const unlocked = restaurant.unlockedToppings.includes(t.id);
    const stock = restaurant.stocks[t.id] || 0;
    if (!unlocked) {
      const idx = unlocks.findIndex(u => u.type === "topping" && u.value === t.id);
      const can = player.fruits >= 1;
      return `<div class="re-pc-tile re-pc-tile--locked" title="${t.label} – nicht freigeschaltet">
        <img src="${t.img}" class="re-pc-tile-img" draggable="false">
        <span class="re-pc-tile-lbl">${t.label}</span>
        <button class="re-pc-tile-action${can ? "" : " re-pc-tile-action--broke"}" onclick="startReUnlock(${idx})"${can ? "" : " disabled"}>🔓 1🍎</button>
      </div>`;
    }
    const available = stock - (placed[t.id] || 0);
    if (available <= 0) {
      const isEmpty = stock === 0;
      return `<div class="re-pc-tile re-pc-tile--empty" title="${t.label} – ${isEmpty ? "leer" : "alles platziert"}">
        <img src="${t.img}" class="re-pc-tile-img" draggable="false">
        <span class="re-pc-tile-lbl">${t.label}</span>
        <span class="re-pc-tile-stock re-pc-tile-stock--out">${available}</span>
        ${isEmpty ? `<button class="re-pc-tile-action${canAsk ? "" : " re-pc-tile-action--broke"}" onclick="startReRestock('${t.id}')"${canAsk ? "" : " disabled"}>🛒 1🍎</button>` : ""}
      </div>`;
    }
    return `<div class="re-pc-tile" draggable="true" title="${t.label} (${available} verfügbar)" ondragstart="reOnDragStart(event,'${t.id}')">
      <img src="${t.img}" class="re-pc-tile-img" draggable="false">
      <span class="re-pc-tile-lbl">${t.label}</span>
      <span class="re-pc-tile-stock">${available}</span>
    </div>`;
  }).join("");
}

function closePizzaCreator() {
  const overlay = document.getElementById("re-pizza-creator");
  if (overlay) overlay.hidden = true;
  rePizzaCreatorState = null;
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
  if (!rePizzaCreatorState) return;
  if (rePizzaCreatorState.toppings.length >= RE_PIZZA_MAX_TOPPINGS) return;
  const id = event.dataTransfer.getData("toppingId");
  const tp = RE_TOPPINGS.find(t => t.id === id);
  if (!id || !tp) return;
  // Check available stock minus already placed
  if (restaurantSession) {
    const restaurant = getPackState().beds[restaurantSession.bedId].restaurant;
    const placed = rePizzaCreatorState.toppings.filter(t => t.id === id).length;
    const available = (restaurant.stocks[id] || 0) - placed;
    if (available <= 0) { showToast(`${tp.label} — kein Vorrat mehr!`, "error"); return; }
  }
  const canvas = document.getElementById("re-pc-canvas");
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const x = Math.max(5, Math.min(95, Math.round(((event.clientX - rect.left) / rect.width) * 100)));
  const y = Math.max(5, Math.min(95, Math.round(((event.clientY - rect.top) / rect.height) * 100)));
  rePizzaCreatorState.toppings.push({ id, x, y });
  reRenderPizzaCanvas();
}

function reRenderPizzaCanvas() {
  if (!rePizzaCreatorState) return;
  const countEl = document.getElementById("re-pc-count");
  if (countEl) countEl.textContent = rePizzaCreatorState.toppings.length;
  const toppingsDiv = document.getElementById("re-pc-toppings");
  if (!toppingsDiv) return;
  toppingsDiv.innerHTML = rePizzaCreatorState.toppings.map((t, idx) => {
    const tp = RE_TOPPINGS.find(x => x.id === t.id);
    if (!tp) return "";
    return `<img src="${tp.img}" class="re-pc-placed" style="left:${t.x}%;top:${t.y}%" title="${tp.label} — klicken zum Entfernen" draggable="false" onclick="rePizzaRemoveTopping(${idx})">`;
  }).join("");
  // Refresh palette so available counts update
  if (restaurantSession) {
    const r = getPackState().beds[restaurantSession.bedId].restaurant;
    reBuildCreatorPalette(r, getPackState().player);
  }
}

function rePizzaRemoveTopping(idx) {
  if (!rePizzaCreatorState) return;
  rePizzaCreatorState.toppings.splice(idx, 1);
  reRenderPizzaCanvas();
}

function savePizzaRecipe() {
  if (!rePizzaCreatorState || !restaurantSession) return;
  const name = (document.getElementById("re-pc-name")?.value.trim()) || "Neue Pizza";
  const restaurant = getPackState().beds[restaurantSession.bedId].restaurant;
  if (rePizzaCreatorState.editingId) {
    const recipe = restaurant.pizzaRecipes.find(p => p.id === rePizzaCreatorState.editingId);
    if (recipe) { recipe.name = name; recipe.toppings = rePizzaCreatorState.toppings; }
  } else {
    const activeCount = restaurant.pizzaRecipes.filter(p => p.active).length;
    restaurant.pizzaRecipes.push({ id: `pizza_${Date.now()}`, name, toppings: rePizzaCreatorState.toppings, active: activeCount < RE_MAX_ACTIVE_PIZZAS, orderedCount: 0, deletable: true });
  }
  saveState();
  closePizzaCreator();
  reRefreshMainPanel();
}

function deletePizzaRecipe(recipeId) {
  if (!restaurantSession) return;
  const restaurant = getPackState().beds[restaurantSession.bedId].restaurant;
  const idx = restaurant.pizzaRecipes.findIndex(p => p.id === recipeId && p.deletable);
  if (idx >= 0) { restaurant.pizzaRecipes.splice(idx, 1); saveState(); }
  reRefreshMainPanel();
}

function togglePizzaActive(recipeId) {
  if (!restaurantSession) return;
  const restaurant = getPackState().beds[restaurantSession.bedId].restaurant;
  const recipe = restaurant.pizzaRecipes.find(p => p.id === recipeId && p.deletable);
  if (!recipe) return;
  if (!recipe.active && restaurant.pizzaRecipes.filter(p => p.active).length >= RE_MAX_ACTIVE_PIZZAS) {
    alert(`Maximal ${RE_MAX_ACTIVE_PIZZAS} aktive Pizzen erlaubt.`); return;
  }
  recipe.active = !recipe.active;
  saveState();
  reRefreshMainPanel();
}

function buildReStorageHtml(restaurant) {
  const toppingRows = restaurant.unlockedToppings.map(id => {
    const t = RE_TOPPINGS.find(x => x.id === id);
    if (!t) return "";
    const stock = restaurant.stocks[id] || 0;
    const cls = stock === 0 ? " re-storage-row--out" : stock <= 2 ? " re-storage-row--low" : "";
    return `<div class="re-storage-row${cls}"><img src="${t.img}" class="re-storage-img"><span>${t.label}</span><span class="re-stock-count">${stock}</span></div>`;
  }).join("");
  const drinkRows = restaurant.unlockedDrinks.map(id => {
    const d = RE_DRINKS.find(x => x.id === id);
    if (!d) return "";
    if (d.unlimited) return `<div class="re-storage-row"><span>${d.icon} ${d.label}</span><span class="re-stock-count re-stock-count--inf">∞</span></div>`;
    const stock = restaurant.stocks[id] || 0;
    const cls = stock === 0 ? " re-storage-row--out" : stock <= 2 ? " re-storage-row--low" : "";
    return `<div class="re-storage-row${cls}"><span>${d.icon} ${d.label}</span><span class="re-stock-count">${stock}</span></div>`;
  }).join("");
  if (!toppingRows && !drinkRows) return `<span class="muted" style="font-size:.75rem">Noch nichts im Lager</span>`;
  return (toppingRows ? `<div class="re-storage-group-lbl">Zutaten</div>${toppingRows}` : "")
       + (drinkRows   ? `<div class="re-storage-group-lbl">Getränke</div>${drinkRows}` : "");
}

function toggleReStorage() {
  const p = document.getElementById("re-storage-panel");
  if (!p) return;
  p.hidden = !p.hidden;
  if (!p.hidden && restaurantSession) p.innerHTML = buildReStorageHtml(getPackState().beds[restaurantSession.bedId].restaurant);
}

// ── Restaurant panel builders ─────────────────────────────────────────────
function buildReStaffHtml(session, restaurant, player) {
  const unlocks = reRebuildUnlocks(session, restaurant);
  const staff = unlocks.filter(u => u.type === "cook" || u.type === "table");
  if (staff.length === 0)
    return `<div class="re-panel-done">✓ Alles freigeschaltet</div>`;
  const btns = staff.map(u => {
    const idx = unlocks.indexOf(u);
    const can = player.fruits >= 1;
    return `<button class="re-unlock-btn${can ? "" : " re-unlock-btn--broke"}" onclick="startReUnlock(${idx})"${can ? "" : " disabled"} title="1 🍎 für die Frage">${u.iconHtml || u.icon || ""} ${u.label} <span class="re-cost">1 🍎</span></button>`;
  }).join("");
  return `<div class="re-unlock-list">${btns}</div>`;
}

function buildReMenuViewHtml(session, restaurant) {
  const active = restaurant.pizzaRecipes.filter(p => p.active);
  const rows = active.map(p => {
    const tips = [...new Set(p.toppings.map(t => t.id))].slice(0, 6).map(id => {
      const t = RE_TOPPINGS.find(x => x.id === id);
      return t ? `<img src="${t.img}" class="re-pm-tip" title="${t.label}">` : "";
    }).join("");
    const ctrl = p.deletable
      ? `<button class="re-pm-btn re-pm-btn--toggle" onclick="togglePizzaActive('${p.id}')">Entfernen</button>
         <button class="re-pm-btn" onclick="openPizzaCreator('${p.id}')">✏️</button>`
      : `<span class="re-pm-badge">Standard</span>`;
    return `<div class="re-pm-row re-pm-row--active">
      ${buildMiniPizzaHtml(p.toppings)}
      <div class="re-pm-info">
        <div class="re-pm-name">${p.name}</div>
        <div class="re-pm-tips">${tips || '<span class="muted" style="font-size:.7rem">Keine Zutaten</span>'}</div>
      </div>
      <div class="re-pm-meta"><span class="re-pm-orders">${p.orderedCount}×</span><div class="re-pm-controls">${ctrl}</div></div>
    </div>`;
  }).join("") || `<div class="re-panel-hint">Kein Menü aktiv. Füge Pizzen über "Erstellte Pizzen" hinzu.</div>`;
  return `<div class="re-menu-header"><span class="muted" style="font-size:.74rem">${active.length}/${RE_MAX_ACTIVE_PIZZAS} im Menü</span></div>
    <div class="re-menu-active-list">${rows}</div>
    <div class="re-sub-nav">
      <button class="re-sub-nav-btn" onclick="reMenuSubNav('my_pizzas')">Erstellte Pizzen</button>
      <button class="re-sub-nav-btn" onclick="openPizzaCreator()">+ Neue Pizza</button>
    </div>
    <div id="re-menu-sub-panel"></div>`;
}

function buildReAllPizzasHtml(restaurant) {
  const rows = restaurant.pizzaRecipes.map(p => {
    const distinct = [...new Set(p.toppings.map(t => t.id))];
    const tips = distinct.slice(0, 8).map(id => {
      const t = RE_TOPPINGS.find(x => x.id === id);
      return t ? `<img src="${t.img}" class="re-pm-tip" title="${t.label}">` : "";
    }).join("") + (distinct.length > 8 ? `<span class="re-pm-more">+${distinct.length - 8}</span>` : "");
    const activeClass = p.active ? " re-pm-row--active" : "";
    const ctrl = p.deletable
      ? `<button class="re-pm-btn re-pm-btn--toggle${p.active ? "" : " re-pm-btn--off"}" onclick="togglePizzaActive('${p.id}')">${p.active ? "Aktiv" : "Inaktiv"}</button>
         <button class="re-pm-btn" onclick="openPizzaCreator('${p.id}')">✏️</button>
         <button class="re-pm-btn re-pm-btn--del" onclick="if(confirm('Pizza löschen?'))deletePizzaRecipe('${p.id}')">🗑️</button>`
      : `<span class="re-pm-badge">Standard</span>`;
    return `<div class="re-pm-row${activeClass}">
      <div class="re-pm-info">
        <div class="re-pm-name">${p.name}</div>
        <div class="re-pm-tips">${tips || '<span class="muted" style="font-size:.7rem">Keine Zutaten</span>'}</div>
      </div>
      <div class="re-pm-meta"><span class="re-pm-orders">${p.orderedCount}×</span><div class="re-pm-controls">${ctrl}</div></div>
    </div>`;
  }).join("");
  return `<div class="re-sub-panel-header"><span class="muted" style="font-size:.74rem">${restaurant.pizzaRecipes.filter(p=>p.active).length}/${RE_MAX_ACTIVE_PIZZAS} aktiv</span></div>${rows}`;
}

function buildReStoragePanelHtml(session, restaurant, player) {
  const unlocks = reRebuildUnlocks(session, restaurant);
  const canAsk = player.fruits >= 1;

  const toppingRows = restaurant.unlockedToppings.map(id => {
    const t = RE_TOPPINGS.find(x => x.id === id);
    if (!t) return "";
    const stock = restaurant.stocks[id] || 0;
    const cls = stock === 0 ? " re-storage-row--out" : stock <= 2 ? " re-storage-row--low" : "";
    return `<div class="re-storage-row${cls}">
      <img src="${t.img}" class="re-storage-img"><span class="re-storage-lbl">${t.label}</span>
      <span class="re-stock-count">${stock}</span>
      <button class="re-restock-btn${canAsk ? "" : " re-restock-btn--broke"}" onclick="startReRestock('${id}')"${canAsk ? "" : " disabled"}>Nachkaufen (1🍎)</button>
    </div>`;
  }).join("");

  const drinkRows = RE_DRINKS.map(d => {
    if (d.unlimited)
      return `<div class="re-storage-row"><span class="re-storage-lbl">${d.icon} ${d.label}</span><span class="re-stock-count re-stock-count--inf">∞</span></div>`;
    if (!restaurant.unlockedDrinks.includes(d.id)) {
      const idx = unlocks.findIndex(u => u.type === "drink" && u.value === d.id);
      if (idx < 0) return "";
      const can = player.fruits >= 1;
      return `<div class="re-storage-row re-storage-row--locked">
        <span class="re-storage-lbl">${d.icon} ${d.label}</span>
        <button class="re-unlock-btn${can ? "" : " re-unlock-btn--broke"}" onclick="startReUnlock(${idx})"${can ? "" : " disabled"}>Freischalten (1🍎)</button>
      </div>`;
    }
    const stock = restaurant.stocks[d.id] || 0;
    const cls = stock === 0 ? " re-storage-row--out" : stock <= 2 ? " re-storage-row--low" : "";
    return `<div class="re-storage-row${cls}">
      <span class="re-storage-lbl">${d.icon} ${d.label}</span>
      <span class="re-stock-count">${stock}</span>
      <button class="re-restock-btn${canAsk ? "" : " re-restock-btn--broke"}" onclick="startReRestock('${d.id}')"${canAsk ? "" : " disabled"}>Nachkaufen (1🍎)</button>
    </div>`;
  }).join("");

  let html = "";
  if (toppingRows) html += `<div class="re-storage-group-lbl">Zutaten</div>${toppingRows}`;
  if (drinkRows)   html += `<div class="re-storage-group-lbl">Getränke</div>${drinkRows}`;
  return html || `<div class="re-panel-hint">Noch nichts freigeschaltet.</div>`;
}

// ── Restaurant nav system ──────────────────────────────────────────────────
function reRebuildUnlocks(session, restaurant) {
  const unlocks = [];
  // Cooks: 2nd–5th (cost = cook number)
  if (restaurant.unlockedCooks < 5) {
    const n = restaurant.unlockedCooks + 1;
    unlocks.push({ type: "cook", value: n, icon: "👨‍🍳", label: `${n}. Koch`, cost: n });
  }
  // Tables: one unlock entry per locked table
  RE_TABLE_SLOTS.forEach((_, i) => {
    if (!restaurant.unlockedTables.includes(i))
      unlocks.push({ type: "table", value: i, icon: "🪑", label: `Tisch ${i + 1}`, cost: 1 });
  });
  RE_TOPPINGS.filter(t => !restaurant.unlockedToppings.includes(t.id))
    .forEach(t => unlocks.push({ type: "topping", value: t.id, iconHtml: `<img src="${t.img}" class="re-unlock-img">`, label: t.label, cost: t.cost }));
  RE_DRINKS.filter(d => d.cost > 0 && !restaurant.unlockedDrinks.includes(d.id))
    .forEach(d => unlocks.push({ type: "drink", value: d.id, iconHtml: d.icon, label: d.label, cost: d.cost }));
  session.currentUnlocks = unlocks;
  return unlocks;
}

function reNavTo(section) {
  if (!restaurantSession) return;
  reActiveNav = reActiveNav === section ? null : section;
  document.querySelectorAll(".re-nav-btn").forEach(b =>
    b.classList.toggle("re-nav-btn--active", b.dataset.nav === reActiveNav));
  reRefreshMainPanel();
}

function reRefreshMainPanel() {
  const panel = document.getElementById("re-main-panel");
  if (!panel || !restaurantSession) return;
  const restaurant = getPackState().beds[restaurantSession.bedId].restaurant;
  const player = getPackState().player;
  if (!reActiveNav) { panel.innerHTML = ""; return; }
  if (reActiveNav === "staff")   panel.innerHTML = buildReStaffHtml(restaurantSession, restaurant, player);
  if (reActiveNav === "menu")    panel.innerHTML = buildReMenuViewHtml(restaurantSession, restaurant);
  if (reActiveNav === "storage") panel.innerHTML = buildReStoragePanelHtml(restaurantSession, restaurant, player);
}

function reMenuSubNav(sub) {
  const subPanel = document.getElementById("re-menu-sub-panel");
  if (!subPanel || !restaurantSession) return;
  const restaurant = getPackState().beds[restaurantSession.bedId].restaurant;
  if (sub === "my_pizzas") subPanel.innerHTML = buildReAllPizzasHtml(restaurant);
}

function allChaptersHarvested() {
  const packState = getPackState();
  return PACK_CONTENT.beds.filter(b => b.id !== "hybrid")
    .every(b => packState.beds[b.id]?.restaurantUnlocked);
}

function buildReInsightsHtml(session, restaurant) {
  const s = session.custStats;
  const t = restaurant.totalCustStats || {};
  const row  = (icon, label, sv, tv) =>
    `<div class="re-ins-row"><span>${icon} ${label}</span><span class="re-ins-vals"><span class="re-ins-s">${sv}</span><span class="re-ins-sep">/</span><span class="re-ins-t">${tv}</span></span></div>`;
  const sub  = (icon, label, sv, tv) =>
    `<div class="re-ins-row re-ins-row--sub"><span>${icon} ${label}</span><span class="re-ins-vals"><span class="re-ins-s">${sv}</span><span class="re-ins-sep">/</span><span class="re-ins-t">${tv}</span></span></div>`;

  const hasSadData = (s.sad||(t.sad||0)) || (s.waitTimeout||(t.waitTimeout||0)) || (s.dirtLeave||(t.dirtLeave||0));
  const hasCravData = s.cravingUnmet||(t.cravingUnmet||0);

  if (!hasSadData && !hasCravData)
    return `<div class="re-ins-empty muted">Noch keine Daten.</div>`;

  const sadSect = hasSadData ? `
    ${row("😞", "Unglückliche Kunden gesamt", s.sad||0, t.sad||0)}
    ${s.waitTimeout||(t.waitTimeout||0) ? sub("⏳", "zu lang gewartet", s.waitTimeout||0, t.waitTimeout||0) : ""}
    ${s.dirtLeave  ||(t.dirtLeave  ||0) ? sub("🟤", "schmutzige Umgebung beim Verlassen", s.dirtLeave||0, t.dirtLeave||0) : ""}` : "";

  const cravSect = hasCravData ? `
    ${row("💔", "Nicht erfüllte Gelüste", s.cravingUnmet||0, t.cravingUnmet||0)}
    ${s.cravingIngredientNA   ||(t.cravingIngredientNA   ||0) ? sub("📦", "Zutat nicht verfügbar / nicht freigeschaltet", s.cravingIngredientNA||0, t.cravingIngredientNA||0) : ""}
    ${s.cravingDislikeConflict||(t.cravingDislikeConflict||0) ? sub("🚫", "alle passenden Pizzen hatten eine ungeliebte Zutat", s.cravingDislikeConflict||0, t.cravingDislikeConflict||0) : ""}` : "";

  return `<div class="re-ins-legend"><span>Sitzung / Gesamt</span></div>${sadSect}${cravSect}`;
}

function toggleReInsights() {
  const panel = document.getElementById("re-insights-panel");
  if (!panel || !restaurantSession) return;
  panel.hidden = !panel.hidden;
  if (!panel.hidden) {
    const restaurant = getPackState().beds[restaurantSession.bedId].restaurant;
    panel.innerHTML = buildReInsightsHtml(restaurantSession, restaurant);
  }
}

function reInitScene(bedId) {
  const rc = document.getElementById("room-content");
  if (!rc) return;
  const bedState = getPackState().beds[bedId];
  if (!bedState?.restaurantUnlocked) {
    rc.innerHTML = `<p class="muted" style="text-align:center;padding:2rem 1rem">Ernte alle Pflanzen dieses Beetes, um das Restaurant zu öffnen.</p>`;
    return;
  }
  const tablesHtml = RE_TABLE_SLOTS.map((t, i) =>
    `<div class="re-table" id="re-table-${i}" style="left:${t.x}%;top:${t.y}%"></div>`
  ).join("");
  rc.innerHTML = `
    <div class="re-scene" id="re-scene">
      <div class="re-kitchen-bg"></div>
      <div class="re-wall-divider"></div>
      <div class="re-door-gap"></div>
      <div class="re-counter"></div>
      <div class="re-kitchen-sign">Küche</div>
      <div class="re-entrance-arch"></div>
      ${tablesHtml}
      <div id="re-sprites"></div>
      <div id="re-dirt-layer"></div>
    </div>
    <div class="re-info-bar">
      <div class="re-info-row"><span id="re-stats-text" class="re-stats-text"></span><span id="re-dirt-warn-text"></span><button class="re-insights-btn" onclick="toggleReInsights()">💡 Insights</button><button class="re-reset-btn" onclick="resetRestaurant()">🔄 Reset</button></div>
      <div class="re-info-row re-sat-row" id="re-sat-stats-text"></div>
      <div class="re-info-row" id="re-fruit-stats"></div>
      <div id="re-stock-warn-text" style="display:flex;flex-wrap:wrap;gap:6px"></div>
      <div id="re-insights-panel" hidden class="re-insights-panel"></div>
    </div>
    <div class="re-main-nav">
      <button class="re-nav-btn" data-nav="staff" onclick="reNavTo('staff')">👥 Mitarbeiter</button>
      <button class="re-nav-btn" data-nav="menu"  onclick="reNavTo('menu')">📋 Menü</button>
      <button class="re-nav-btn" data-nav="storage" onclick="reNavTo('storage')">📦 Lager</button>
    </div>
    <div id="re-main-panel" class="re-main-panel"></div>
    <div id="re-pizza-creator" class="re-pc-overlay" hidden>
      <div class="re-pc-box">
        <div class="re-pc-header">
          <span class="re-pc-title">🍕 Pizza Creator</span>
          <button class="re-pc-close-btn" onclick="closePizzaCreator()">✕</button>
        </div>
        <div class="re-pc-body">
          <div class="re-pc-left">
            <div class="re-pc-canvas" id="re-pc-canvas" ondragover="reOnPizzaDragOver(event)" ondrop="reOnPizzaDrop(event)">
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
    </div>
    <div id="re-question-area"></div>`;
}

function buildMiniPizzaHtml(toppings) {
  const tops = (toppings || []).map(t => {
    const tp = RE_TOPPINGS.find(x => x.id === t.id);
    return tp ? `<img src="${tp.img}" class="re-mp-top" style="left:${t.x}%;top:${t.y}%" draggable="false">` : "";
  }).join("");
  return `<div class="re-mini-pizza"><img src="assets/images/Pizza/basic.png" class="re-mp-base" draggable="false">${tops}</div>`;
}

function reUpdateScene() {
  if (!restaurantSession) return;
  const session = restaurantSession;
  const bedState = getPackState().beds[session.bedId];
  const restaurant = bedState.restaurant;
  const player = getPackState().player;
  const spritesDiv = document.getElementById("re-sprites");
  if (!spritesDiv) return;

  session.cooks.forEach((cook, i) => {
    const pos = getCookPos(cook, i, session);
    let el = document.getElementById(`re-cook-${cook.id}`);
    if (!el) {
      el = document.createElement("div");
      el.id = `re-cook-${cook.id}`;
      el.className = "re-sprite re-sprite--chef";
      el.innerHTML = buildChefHtml();
      spritesDiv.appendChild(el);
    }
    el.style.left = `${pos.x}%`;
    el.style.top  = `${pos.y}%`;
    const carryEl = el.querySelector(".re-carry");
    if (carryEl) {
      const show = pos.phase === "delivering";
      carryEl.style.display = show ? "" : "none";
      if (show) {
        const drinkIcon = RE_DRINKS.find(d => d.id === cook.cookDrink)?.icon || "";
        carryEl.innerHTML = buildMiniPizzaHtml(cook.cookPizza) + `<span class="re-carry-drink">${drinkIcon}</span>`;
      }
    }
    el.classList.toggle("re-sprite--cooking", pos.phase === "cooking");
    el.classList.toggle("re-sprite--at-table", pos.phase === "at_table");
    const progBar = el.querySelector(".re-sprite-progress");
    const progFill = el.querySelector(".re-sprite-progress-fill");
    const showProg = pos.phase === "cooking" && cook.state === "cooking";
    if (progBar) progBar.style.display = showProg ? "" : "none";
    if (showProg && progFill) {
      // Normalize to kitchen-only time (~30% of total cook time)
      const kitchenDuration = cook.cookTimerMax * 0.30;
      const kitchenProg = Math.max(0, Math.min(1, 1 - cook.cookTimer / kitchenDuration));
      progFill.style.width = `${kitchenProg * 100}%`;
    }
  });

  const existingCusts = new Set([...spritesDiv.querySelectorAll(".re-sprite--customer")].map(el => el.dataset.custId));
  const activeIds = new Set(session.customers.map(c => String(c.id)));
  existingCusts.forEach(sid => { if (!activeIds.has(sid)) { const e = spritesDiv.querySelector(`[data-cust-id="${sid}"]`); if (e) e.remove(); } });
  session.customers.forEach(c => {
    const pos = getCustomerPos(c);
    let el = spritesDiv.querySelector(`[data-cust-id="${c.id}"]`);
    if (!el) {
      el = document.createElement("div");
      el.className = "re-sprite re-sprite--customer";
      el.dataset.custId = String(c.id);
      el.innerHTML = buildCustomerHtml(c.id);
      spritesDiv.appendChild(el);
    }
    el.style.left = `${pos.x}%`;
    el.style.top  = `${pos.y}%`;
    el.classList.toggle("re-sprite--leaving", c.state.startsWith("leaving_"));
    el.classList.toggle("re-sprite--eating", c.state === "eating");
    const isEating = c.state === "eating";
    const patWrap = el.querySelector(".re-sprite-patience");
    if (patWrap) patWrap.style.display = isEating ? "none" : "";
    const pf = el.querySelector(".re-sprite-patience-fill");
    if (pf && !isEating) {
      const pat = Math.max(0, c.patience);
      pf.style.width = `${pat}%`;
      pf.style.background = pat > 60 ? "#44cc66" : pat > 30 ? "#ccaa22" : "#cc3333";
    }
    const eatBar = el.querySelector(".re-sprite-eat-bar");
    const eatFill = el.querySelector(".re-sprite-eat-fill");
    if (eatBar) eatBar.style.display = isEating ? "" : "none";
    if (isEating && eatFill) eatFill.style.width = `${Math.min(100, c.hunger)}%`;
    const foodIconEl = el.querySelector(".re-sprite-food-icon");
    if (foodIconEl) {
      foodIconEl.style.display = isEating ? "" : "none";
      if (isEating) {
        const drinkIcon = RE_DRINKS.find(d => d.id === c.order?.drinkId)?.icon || "";
        foodIconEl.innerHTML = buildMiniPizzaHtml(c.foodToppings || []) + `<span class="re-carry-drink">${drinkIcon}</span>`;
      }
    }
    // Outcome emoji when leaving
    const outcomeEl = el.querySelector(".re-sprite-outcome");
    if (outcomeEl) {
      const isLeaving = c.state === "leaving_happy" || c.state === "leaving_sad";
      outcomeEl.style.display = isLeaving ? "" : "none";
      if (isLeaving) {
        if (c.state === "leaving_sad") outcomeEl.textContent = "😞";
        else if (c.satisfaction === "veryHappy") outcomeEl.textContent = "😊";
        else if (c.satisfaction === "happy") outcomeEl.textContent = "🙂";
        else outcomeEl.textContent = "😐";
      }
    }
  });

  const dirtDiv = document.getElementById("re-dirt-layer");
  if (dirtDiv) {
    const canClean = !session.paused; // fruit check handled by startDirtClean (shows toast)
    const spots = session.dirtSpots.map(i => { const p = RE_DIRT_POS[i]; return `<div class="re-dirt-spot${canClean ? " re-dirt-spot--clickable" : ""}" style="left:${p.x}%;top:${p.y}%" ${canClean ? `onclick="startDirtClean(${i})" title="Dreck aufräumen (1 🍎)"` : ""}></div>`; }).join("");
    if (dirtDiv.innerHTML !== spots) dirtDiv.innerHTML = spots;
  }

  // Mark locked tables — clicking one triggers the unlock question
  RE_TABLE_SLOTS.forEach((_, i) => {
    const tel = document.getElementById(`re-table-${i}`);
    if (!tel) return;
    const locked = !restaurant.unlockedTables.includes(i);
    tel.classList.toggle("re-table--locked", locked);
    if (locked) {
      tel.onclick = () => startTableUnlock(i);
      tel.title = "Tisch freischalten (Frage beantworten)";
    } else {
      tel.onclick = null;
      tel.title = "";
    }
  });

  const statsEl = document.getElementById("re-stats-text");
  const dirtCount = session.dirtSpots.length;
  if (statsEl) statsEl.textContent = `✓ ${session.totalServed} bedient  ·  😞 ${session.totalImpatient} ungeduldig  ·  🟤 ${dirtCount} Dreck`;
  const dirtWarnEl = document.getElementById("re-dirt-warn-text");
  if (dirtWarnEl) {
    dirtWarnEl.textContent = dirtCount > 8 ? "⚠️ Sehr dreckig!" : dirtCount > 4 ? "🟤 Etwas schmutzig…" : "";
    dirtWarnEl.style.color = dirtCount > 8 ? "#cc8833" : "var(--muted)";
  }

  // Satisfaction stats
  const satEl = document.getElementById("re-sat-stats-text");
  if (satEl && session.custStats) {
    const cs = session.custStats;
    const ts = restaurant.totalCustStats || {};
    const sTotal = cs.sad + cs.neutral + cs.happy + cs.veryHappy;
    const tTotal = (ts.sad||0) + (ts.neutral||0) + (ts.happy||0) + (ts.veryHappy||0);
    satEl.innerHTML = sTotal > 0
      ? `Sitzung: 😊 ${cs.veryHappy} · 🙂 ${cs.happy} · 😐 ${cs.neutral} · 😞 ${cs.sad}` +
        (tTotal > 0 ? `<span class="re-total-stats"> &nbsp;|&nbsp; Gesamt: 😊 ${ts.veryHappy||0} · 🙂 ${ts.happy||0} · 😐 ${ts.neutral||0} · 😞 ${ts.sad||0}</span>` : "")
      : tTotal > 0
        ? `<span class="re-total-stats">Gesamt: 😊 ${ts.veryHappy||0} · 🙂 ${ts.happy||0} · 😐 ${ts.neutral||0} · 😞 ${ts.sad||0}</span>`
        : "";
  }

  // Fruit earnings display
  const fruitEl = document.getElementById("re-fruit-stats");
  if (fruitEl) {
    const prog = Math.min(1, player.fruitProgress || 0);
    const pct = Math.round(prog * 100);
    const earned = session.fruitsEarned || 0;
    fruitEl.innerHTML =
      `🍎 <strong>+${earned}</strong> Früchte verdient · nächste: <span class="re-fruit-bar"><span class="re-fruit-bar-fill" style="width:${pct}%"></span></span> ${pct}%`;
  }

  // Out-of-stock warning — only for ingredients used in active menu pizzas
  const activeToppingIds = new Set(
    restaurant.pizzaRecipes.filter(p => p.active)
      .flatMap(p => p.toppings.map(t => t.id))
  );
  const outOfStock = [
    ...restaurant.unlockedToppings.filter(id => activeToppingIds.has(id) && (restaurant.stocks[id] || 0) <= 0)
      .map(id => ({ id, ing: RE_TOPPINGS.find(x => x.id === id) })),
    ...restaurant.unlockedDrinks.filter(id => {
      const d = RE_DRINKS.find(x => x.id === id);
      return d && !d.unlimited && (restaurant.stocks[id] || 0) <= 0;
    }).map(id => ({ id, ing: RE_DRINKS.find(x => x.id === id) }))
  ];
  const stockWarnEl = document.getElementById("re-stock-warn-text");
  if (stockWarnEl) {
    const canRestock = player.fruits >= 1;
    stockWarnEl.innerHTML = outOfStock.map(({ id, ing }) => {
      const iconHtml = ing?.img ? `<img src="${ing.img}" style="height:1em;vertical-align:middle">` : (ing?.icon || "📦");
      return `<span class="re-stock-warn">${iconHtml} ${ing?.label || id} leer! <button class="re-restock-btn${canRestock ? "" : " re-restock-btn--broke"}" onclick="startReRestock('${id}')"${canRestock ? "" : " disabled"}>Nachfüllen (1 🍎)</button></span>`;
    }).join("");
  }

  // Update insights panel if visible
  const insightsPanel = document.getElementById("re-insights-panel");
  if (insightsPanel && !insightsPanel.hidden) insightsPanel.innerHTML = buildReInsightsHtml(session, restaurant);

  // Refresh the main nav panel if state has changed
  const panelSig = `${restaurant.unlockedCooks}:${[...restaurant.unlockedTables].sort().join("|")}:${restaurant.unlockedToppings.join(",")}:${restaurant.unlockedDrinks.join(",")}:${JSON.stringify(restaurant.stocks)}:${restaurant.pizzaRecipes.map(p=>p.id+p.active).join(",")}:${player.fruits}`;
  if (panelSig !== reLastPanelSignature) {
    reLastPanelSignature = panelSig;
    reRefreshMainPanel();
  }
}

function rePickLabelExercise(bedId) {
  const pool = (PACK_CONTENT.labelExercises || []).filter(e => e.bedId === bedId);
  return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
}

// Shared helper: pick and display either a label exercise (25% chance) or a text question.
function reStartQuestion(unlock, allowRepeat = false) {
  const bedId = restaurantSession.bedId;
  const labelEx = Math.random() < 0.25 ? rePickLabelExercise(bedId) : null;
  if (labelEx) {
    restaurantSession.unlockQ = null;
    restaurantSession.reLabelEx = { ex: labelEx, unlock, placed: {}, selectedLabel: null };
    reRenderLabelExercise();
    return;
  }
  const q = rePickQuestion(bedId, allowRepeat);
  if (!q) { reShowAllDone(unlock); return; }
  let shuffled, isMulti;
  if (q.type === "true_false") {
    shuffled = [
      { text: "Wahr",   correct: q.answer === true,  origIdx: 0 },
      { text: "Falsch", correct: q.answer === false, origIdx: 1 }
    ];
    isMulti = false;
  } else {
    shuffled = shuffle(q.options.map((o, i) => ({ ...o, origIdx: i })));
    isMulti = q.options.filter(o => o.correct).length > 1;
  }
  restaurantSession.reLabelEx = null;
  restaurantSession.unlockQ = { q, shuffled, isMulti, unlock, selected: new Set() };
  reRenderQuestion();
}

function startReUnlock(idx) {
  if (!restaurantSession) return;
  const unlock = restaurantSession.currentUnlocks?.[idx];
  if (!unlock) return;
  const player = getPackState().player;
  if (player.fruits < 1) return;
  player.fruits -= 1;
  saveState(); renderPlayer();
  restaurantSession.paused = true;
  reStartQuestion(unlock);
}

function reRenderQuestion() {
  if (!restaurantSession?.unlockQ) return;
  const { q, shuffled, unlock } = restaurantSession.unlockQ;
  const area = document.getElementById("re-question-area");
  if (!area) return;
  const prompt = q.type === "true_false" ? q.statement : q.question;
  const optHtml = shuffled.map((o, i) =>
    `<button class="mc-option mc-option--toggle" data-ri="${i}" onclick="toggleReOption(${i})">${o.text}</button>`
  ).join("");
  area.innerHTML = `<div class="re-question-panel">
    <div class="re-question-header">${unlock.type === "clean" ? "🧹 Dreck aufräumen" : unlock.type === "restock" ? `📦 Nachfüllen: ${unlock.iconHtml || ""} ${unlock.label}` : `🔓 ${unlock.iconHtml || unlock.icon || ""} ${unlock.label}`}</div>
    <div class="question">${prompt}</div>
    <div class="mc-options">${optHtml}</div>
    <div class="re-confirm-row"><button class="mc-option re-confirm-btn" onclick="resolveReMulti()">Bestätigen</button></div>
  </div>`;
}

function reRenderLabelExercise() {
  if (!restaurantSession?.reLabelEx) return;
  const { ex, placed, selectedLabel, unlock } = restaurantSession.reLabelEx;
  const area = document.getElementById("re-question-area");
  if (!area) return;

  const usedLabels = Object.values(placed).filter(Boolean);
  const poolLabels = ex.zones.map(z => z.label).filter(l => !usedLabels.includes(l));

  const zoneHtml = ex.zones.map(z => {
    const filled = placed[z.id];
    return `<div class="label-zone${filled ? " has-label" : ""}${selectedLabel !== null ? " targeted" : ""}"
      data-zone-id="${z.id}"
      style="left:${z.left}%;top:${z.top}%;width:${z.width}%;height:${z.height}%">
      ${filled ? `<span class="label-zone-text">${filled}</span>` : ""}
    </div>`;
  }).join("");

  const chipHtml = poolLabels.map(l => {
    const sel = selectedLabel === l ? " selected" : "";
    return `<button class="label-chip${sel}" data-label="${l}">${l}</button>`;
  }).join("");

  const typeLabel = unlock.type === "clean" ? "🧹 Dreck aufräumen"
    : unlock.type === "restock" ? `📦 Nachfüllen: ${unlock.iconHtml || ""} ${unlock.label}`
    : `🔓 ${unlock.iconHtml || unlock.icon || ""} ${unlock.label}`;

  area.innerHTML = `<div class="re-question-panel re-question-panel--label">
    <div class="re-question-header">${typeLabel}</div>
    <div style="font-size:.82rem;margin-bottom:.3rem;color:var(--muted)">🏷️ ${ex.title} — Beschrifte die Strukturen:</div>
    <div class="label-diagram-wrapper" style="aspect-ratio:${ex.aspectRatio || '5/4'};max-height:48vh">${
      ex.diagramType === "image"
        ? `<img src="${ex.imagePath}" style="display:block;width:100%;height:100%;object-fit:contain">`
        : (ex.svgContent || "")
    }${zoneHtml}</div>
    <div class="label-pool">${chipHtml || "<span class='muted'>Alle Labels platziert</span>"}</div>
    <div class="re-confirm-row">
      <button class="mc-option re-confirm-btn" id="re-label-submit">Auswerten (${Math.round((ex.passRate||0.6)*100)}% nötig)</button>
    </div>
  </div>`;

  area.querySelectorAll(".label-zone").forEach(zone => {
    zone.addEventListener("click", () => {
      const lb = restaurantSession.reLabelEx;
      const zid = zone.getAttribute("data-zone-id");
      if (lb.selectedLabel) {
        lb.placed[zid] = lb.selectedLabel;
        lb.selectedLabel = null;
      } else if (lb.placed[zid]) {
        lb.selectedLabel = lb.placed[zid];
        delete lb.placed[zid];
      }
      reRenderLabelExercise();
    });
  });

  area.querySelectorAll(".label-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const lb = restaurantSession.reLabelEx;
      const l = chip.getAttribute("data-label");
      lb.selectedLabel = lb.selectedLabel === l ? null : l;
      reRenderLabelExercise();
    });
  });

  document.getElementById("re-label-submit")?.addEventListener("click", reSubmitLabelExercise);
}

function reSubmitLabelExercise() {
  if (!restaurantSession?.reLabelEx) return;
  const { ex, placed, unlock } = restaurantSession.reLabelEx;
  let correct = 0;
  ex.zones.forEach(z => { if ((placed[z.id] || "") === z.label) correct++; });
  const ok = correct / ex.zones.length >= (ex.passRate || 0.6);
  const pct = Math.round(correct / ex.zones.length * 100);
  restaurantSession.reLabelEx = null;
  applyReUnlockResult(ok, `${correct}/${ex.zones.length} Strukturen richtig (${pct}%)`, unlock);
}

function toggleReOption(idx) {
  if (!restaurantSession?.unlockQ) return;
  const { isMulti, selected: sel } = restaurantSession.unlockQ;
  sel.has(idx) ? sel.delete(idx) : sel.add(idx);
  document.querySelectorAll("#re-question-area .mc-option--toggle").forEach((b, i) => {
    b.classList.toggle("mc-option--selected", sel.has(i));
  });
}


function resolveReMulti() {
  if (!restaurantSession?.unlockQ) return;
  const { q, shuffled, unlock, selected } = restaurantSession.unlockQ;
  if (selected.size === 0) { showToast("Bitte erst eine Antwort auswählen.", "error"); return; }
  const correctIndices = shuffled.map((o, i) => o.correct ? i : -1).filter(i => i >= 0);
  const ok = correctIndices.length === selected.size && correctIndices.every(i => selected.has(i));
  applyReUnlockResult(ok, q.explanation || q.solution || "", unlock);
}

function applyReUnlockResult(ok, feedbackText, unlock) {
  if (!restaurantSession) return;
  sessionStats.questionsAnswered++;
  if (ok) sessionStats.correct++; else sessionStats.wrong++;
  const bedState = getPackState().beds[restaurantSession.bedId];
  const isRestock = unlock.type === "restock";
  const isClean   = unlock.type === "clean";
  // Track answer (skip repeat questions to avoid downgrading "correct" back to "wrong")
  const uq = restaurantSession.unlockQ;
  if (uq?.q && !uq.isRepeat) {
    const qa = bedState.restaurant.questionAnswers;
    if (qa[uq.q.id] !== "correct") qa[uq.q.id] = ok ? "correct" : "wrong";
    saveState();
  }
  playSound(ok ? "twinkle.mp3" : "wrong.mp3");
  if (ok) {
    if (isClean) {
      const idx = restaurantSession.dirtSpots.indexOf(unlock.value);
      if (idx >= 0) restaurantSession.dirtSpots.splice(idx, 1);
    } else if (unlock.type === "cook") bedState.restaurant.unlockedCooks = unlock.value;
    else if (unlock.type === "table") { if (!bedState.restaurant.unlockedTables.includes(unlock.value)) bedState.restaurant.unlockedTables.push(unlock.value); }
    else if (unlock.type === "topping") {
      bedState.restaurant.unlockedToppings.push(unlock.value);
      const t = RE_TOPPINGS.find(x => x.id === unlock.value);
      if (t) bedState.restaurant.stocks[unlock.value] = t.restockAmt ?? 5;
    } else if (unlock.type === "drink") {
      bedState.restaurant.unlockedDrinks.push(unlock.value);
      const d = RE_DRINKS.find(x => x.id === unlock.value);
      if (d && !d.unlimited) bedState.restaurant.stocks[unlock.value] = d.restockAmt ?? 5;
    } else if (isRestock) {
      const any = RE_TOPPINGS.find(x => x.id === unlock.value) || RE_DRINKS.find(x => x.id === unlock.value);
      const amt = any?.restockAmt ?? 5;
      bedState.restaurant.stocks[unlock.value] = (bedState.restaurant.stocks[unlock.value] || 0) + amt;
      saveState();
    }
    if (!isRestock) { saveState(); renderPlayer(); }
    reSyncCooks();
  }
  const area = document.getElementById("re-question-area");
  const panel = area?.querySelector(".re-question-panel");
  if (panel) {
    panel.querySelectorAll(".mc-option").forEach(b => { b.disabled = true; });
    const fb = document.createElement("div");
    fb.className = `feedback ${ok ? "feedback--correct" : "feedback--wrong"}`;
    const unlockIcon = unlock.iconHtml || unlock.icon || "";
    const successMsg = isClean
      ? `✓ 🧹 Sauber!`
      : isRestock
        ? `✓ ${unlockIcon} ${unlock.label} nachgefüllt!`
        : `✓ ${unlockIcon} ${unlock.label} freigeschaltet!`;
    const failMsg = isClean
      ? "✗ Falsch — der Dreck bleibt. Versuch es nochmal!"
      : isRestock
        ? "✗ Falsch — nachfüllen fehlgeschlagen. Versuch es nochmal!"
        : "✗ Falsch — keine Früchte ausgegeben.";
    fb.innerHTML = (ok ? successMsg : failMsg) + (feedbackText ? `<br><small>${feedbackText}</small>` : "");
    const btn = document.createElement("button");
    btn.className = "mc-option"; btn.style.cssText = "margin-top:6px;display:block;margin-left:auto;margin-right:auto";
    btn.textContent = "Weiter";
    btn.onclick = () => {
      area.innerHTML = "";
      restaurantSession.paused = false;
      restaurantSession.unlockQ = null;
      restaurantSession.reLabelEx = null;
      reLastPanelSignature = "";  // force panel refresh
      reUpdateScene();
      // Refresh creator palette if the creator is open (new topping/restock might have changed)
      const creatorOpen = !document.getElementById("re-pizza-creator")?.hidden;
      if (creatorOpen && restaurantSession) {
        const r2 = getPackState().beds[restaurantSession.bedId].restaurant;
        reBuildCreatorPalette(r2, getPackState().player);
      }
    };
    panel.appendChild(fb);
    panel.appendChild(btn);
  }
}

function startReRestock(ingredientId) {
  if (!restaurantSession || restaurantSession.paused) return;
  const player = getPackState().player;
  if (player.fruits < 1) { showToast("Nicht genug Früchte (1 🍎 für die Frage).", "error"); return; }
  const ing = RE_TOPPINGS.find(t => t.id === ingredientId) || RE_DRINKS.find(d => d.id === ingredientId);
  if (!ing) return;
  player.fruits -= 1;
  saveState(); renderPlayer();
  const iconHtml = ing.img ? `<img src="${ing.img}" style="height:1em;vertical-align:middle">` : (ing.icon || "📦");
  const unlock = { type: "restock", value: ingredientId, iconHtml, label: ing.label, cost: 0 };
  restaurantSession.paused = true;
  reStartQuestion(unlock);
}

function startTableUnlock(tableIdx) {
  if (!restaurantSession || restaurantSession.paused) return;
  const restaurant = getPackState().beds[restaurantSession.bedId].restaurant;
  if (restaurant.unlockedTables.includes(tableIdx)) return;
  const unlocks = reRebuildUnlocks(restaurantSession, restaurant);
  const idx = unlocks.findIndex(u => u.type === "table" && u.value === tableIdx);
  if (idx >= 0) startReUnlock(idx);
}

function startDirtClean(spotIndex) {
  if (!restaurantSession || restaurantSession.paused) return;
  if (!restaurantSession.dirtSpots.includes(spotIndex)) return;
  const player = getPackState().player;
  if (player.fruits < 1) { showToast("Nicht genug Früchte (1 🍎 für die Frage).", "error"); return; }
  player.fruits -= 1;
  saveState(); renderPlayer();
  const unlock = { type: "clean", value: spotIndex, icon: "🧹", label: "Dreck aufräumen", cost: 0 };
  restaurantSession.paused = true;
  reStartQuestion(unlock, true);
}

function isBedMasteredInRestaurant(bedId) {
  const bedContent = PACK_CONTENT.beds.find(b => b.id === bedId);
  if (!bedContent) return false;
  const answers = getPackState().beds[bedId]?.restaurant?.questionAnswers || {};
  const all = [];
  (bedContent.plants || []).forEach(p => {
    (p.harvestQuestions || []).forEach(q => all.push(q));
    (p.phase4Questions || []).forEach(q => all.push(q));
  });
  return all.length > 0 && all.every(q => answers[q.id] === "correct");
}

function openTrophyRoom() {
  const container = document.getElementById("trophy-list");
  if (!container) return;
  const pack = getPackState();
  const unlockedBeds = pack.bedProgress?.unlockedBedIds || [];
  const nonHybridBeds = PACK_CONTENT.beds.filter(b => b.id !== "hybrid" && unlockedBeds.includes(b.id));

  container.innerHTML = nonHybridBeds.map(bed => {
    const bedState = pack.beds[bed.id];
    const restUnlocked = bedState?.restaurantUnlocked || false;
    if (!restUnlocked) {
      return `<div class="trophy-item trophy-item--locked">
        <div class="trophy-icon">🔒</div>
        <div class="trophy-info">
          <div class="trophy-name">${bed.title}</div>
          <div class="muted" style="font-size:.8rem">Restaurant noch nicht freigeschaltet</div>
        </div>
      </div>`;
    }
    const answers = bedState?.restaurant?.questionAnswers || {};
    const bedContent = PACK_CONTENT.beds.find(b => b.id === bed.id);
    const all = [];
    (bedContent?.plants || []).forEach(p => {
      (p.harvestQuestions || []).forEach(q => all.push(q));
      (p.phase4Questions || []).forEach(q => all.push(q));
    });
    const total = all.length;
    const correct = all.filter(q => answers[q.id] === "correct").length;
    const wrong = all.filter(q => answers[q.id] === "wrong").length;
    const unseen = total - correct - wrong;
    const mastered = total > 0 && all.every(q => answers[q.id] === "correct");
    const pct = total > 0 ? Math.round(correct / total * 100) : 0;

    return `<div class="trophy-item ${mastered ? "trophy-item--mastered" : ""}">
      <div class="trophy-icon">${mastered ? "🏆" : "📖"}</div>
      <div class="trophy-info">
        <div class="trophy-name">${bed.title}</div>
        <div class="trophy-bar-wrap"><div class="trophy-bar" style="width:${pct}%"></div></div>
        <div class="muted" style="font-size:.8rem">
          ${mastered
            ? `<strong style="color:#5ada80">Gemeistert!</strong> Alle ${total} Fragen richtig.`
            : `${correct}/${total} richtig · ${wrong} falsch · ${unseen} offen`}
        </div>
      </div>
    </div>`;
  }).join("") || "<div class='muted'>Noch kein Kapitel freigeschaltet.</div>";

  openModal("modal-trophies");
}

function reShowAllDone(unlock) {
  if (!restaurantSession) return;
  restaurantSession.pendingUnlock = unlock;
  const area = document.getElementById("re-question-area");
  if (!area) return;

  // Check for other restaurant beds not yet mastered
  const pack = getPackState();
  const otherUnmastered = (pack.bedProgress?.unlockedBedIds || [])
    .filter(id => id !== restaurantSession.bedId && id !== "hybrid" &&
                  pack.beds[id]?.restaurantUnlocked && !isBedMasteredInRestaurant(id));
  const hintHtml = otherUnmastered.length > 0
    ? `<div class="muted" style="font-size:.82rem;margin-top:.2rem">Noch ${otherUnmastered.length} weiteres Kapitel zum Meistern.</div>`
    : "";

  area.innerHTML = `<div class="re-question-panel re-all-done">
    <div style="font-size:1.8rem;margin-bottom:.3rem">🏆</div>
    <div><strong>Alle Fragen gemeistert!</strong></div>
    <div class="muted" style="font-size:.82rem;margin:.5rem 0 .4rem">
      Du hast alle Fragen dieses Kapitels richtig beantwortet.<br>
      Empfehlung: Schalte ein neues Kapitel im Garten frei.
    </div>
    ${hintHtml}
    <div style="display:flex;flex-direction:column;gap:4px;align-items:center;margin-top:.8rem">
      <button class="mc-option" onclick="startReRepeat()">Wiederholungsfrage anzeigen</button>
      <button class="mc-option" onclick="openTrophyRoom()">🏆 Trophäenraum</button>
      <button class="mc-option" onclick="reCloseQuestion()">Zurück</button>
    </div>
  </div>`;
}

function startReRepeat() {
  if (!restaurantSession) return;
  const unlock = restaurantSession.pendingUnlock;
  if (!unlock) return;
  const player = getPackState().player;
  if (player.fruits < 1) { showToast("Nicht genug Früchte (1 🍎 für die Frage).", "error"); return; }
  player.fruits -= 1;
  saveState(); renderPlayer();
  reStartQuestion(unlock, true);
  if (restaurantSession.unlockQ) restaurantSession.unlockQ.isRepeat = true;
}

function resetRestaurant() {
  if (!restaurantSession) return;
  if (!confirm("Restaurant wirklich zurücksetzen? Alle Upgrades, Pizzen und Statistiken gehen verloren.")) return;
  const bedId = restaurantSession.bedId;
  const bedState = getPackState().beds[bedId];
  const basicRecipe = { id: "basic", name: "Basic Pizza", toppings: [], active: true, orderedCount: 0, deletable: false };
  bedState.restaurant = {
    unlockedCooks: 1, unlockedTables: [0, 1],
    unlockedToppings: [], unlockedDrinks: ["water"],
    stocks: {}, pizzaRecipes: [{ ...basicRecipe }],
    questionAnswers: {},
    totalCustStats: { sad: 0, neutral: 0, happy: 0, veryHappy: 0,
      waitTimeout: 0, dirtLeave: 0, cravingUnmet: 0, cravingIngredientNA: 0, cravingDislikeConflict: 0 }
  };
  saveState();
  stopRestaurant();
  openRestaurant(bedId);
}

function reCloseQuestion() {
  if (!restaurantSession) return;
  const area = document.getElementById("re-question-area");
  if (area) area.innerHTML = "";
  restaurantSession.paused = false;
  restaurantSession.unlockQ = null;
  restaurantSession.reLabelEx = null;
  restaurantSession.pendingUnlock = null;
  reUpdateScene();
}

function openLabModal() {
  renderLab();
  openModal("modal-lab");
}

window.KG_UI = {
  showMainUi,
  hideMainUi,
  openFromWorld,
  openPlantFromWorld,
  getUnlockedBeds: () => getBedProgress().unlockedBedIds.slice(),
  getWorldBeds: () => getWorldVisibleBeds(),
  getWorldBedDetails: () => getWorldBedDetails(),
  getAllBeds: () => PACK_CONTENT.beds.map((b) => ({ id: b.id, title: b.title })),
  getActiveBedId: () => state.activeBedId
};

function openSessionEndModal() {
  const now = Date.now();
  const elapsed = now - (sessionStats.startTime || now);
  const mins = Math.floor(elapsed / 60000);
  const secs = Math.floor((elapsed % 60000) / 1000);
  const timeStr = mins > 0 ? `${mins} Min. ${secs} Sek.` : `${secs} Sek.`;
  const total = sessionStats.questionsAnswered;
  const correct = sessionStats.correct;
  const wrong = sessionStats.wrong;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const statsDiv = document.getElementById("session-end-stats");
  if (statsDiv) {
    statsDiv.innerHTML = `
      <div class="ses-stat-row"><span class="ses-label">Sitzungszeit</span><span class="ses-val">${timeStr}</span></div>
      <div class="ses-stat-row"><span class="ses-label">Fragen beantwortet</span><span class="ses-val">${total}</span></div>
      <div class="ses-stat-row"><span class="ses-label">Davon richtig</span><span class="ses-val ses-val--good">${correct}</span></div>
      <div class="ses-stat-row"><span class="ses-label">Davon falsch</span><span class="ses-val ses-val--bad">${wrong}</span></div>
      ${total > 0 ? `<div class="ses-stat-row"><span class="ses-label">Trefferquote</span><span class="ses-val">${pct}%</span></div>` : ""}
    `;
  }
  openModal("modal-session-end");
}

// ── Bottom nav + modal triggers ────────────────────────────────────────────
const backToGardenBtn = document.getElementById("back-to-garden-btn");
if (backToGardenBtn) backToGardenBtn.addEventListener("click", () => {
  selectedPlantId = null;
  state.activeBedId = null;
  saveState();
  renderAll();
});

const openCatalogBtn = document.getElementById("open-catalog-btn");
if (openCatalogBtn) openCatalogBtn.addEventListener("click", () => openCatalogModal(null));

const openMapBtn = document.getElementById("open-map-btn");
if (openMapBtn) openMapBtn.addEventListener("click", () => {
  const pack = getPackState();
  const active = state.activeBedId;
  // Prefer active bed if it has restaurant unlocked; else find any bed that does
  const bedId = (active && pack.beds[active]?.restaurantUnlocked)
    ? active
    : (pack.bedProgress?.unlockedBedIds || []).find(id => pack.beds[id]?.restaurantUnlocked)
      || active
      || (pack.bedProgress?.unlockedBedIds || [])[0];
  if (!bedId) return;
  openRestaurant(bedId);
  openModal("modal-room");
});

const openLabBtn = document.getElementById("open-lab-btn");
if (openLabBtn) openLabBtn.addEventListener("click", openLabModal);

const openTrophiesBtn = document.getElementById("open-trophies-btn");
if (openTrophiesBtn) openTrophiesBtn.addEventListener("click", openTrophyRoom);

const toggleSettingsBtn = document.getElementById("toggle-settings-btn");
if (toggleSettingsBtn) toggleSettingsBtn.addEventListener("click", openSettingsPage);

// Modal close buttons
const closeSettingsBtn = document.getElementById("close-settings-btn");
if (closeSettingsBtn) closeSettingsBtn.addEventListener("click", () => closeModal("modal-settings"));

const closeCatalogBtn = document.getElementById("close-catalog-btn");
if (closeCatalogBtn) closeCatalogBtn.addEventListener("click", () => { catalogFilterBedId = null; closeModal("modal-catalog"); });

const closeRoomBtn = document.getElementById("close-room-btn");
if (closeRoomBtn) closeRoomBtn.addEventListener("click", () => { stopRestaurant(); closeModal("modal-room"); });

const closeLabBtn = document.getElementById("close-lab-btn");
if (closeLabBtn) closeLabBtn.addEventListener("click", () => closeModal("modal-lab"));

const closeTrophiesBtn = document.getElementById("close-trophies-btn");
if (closeTrophiesBtn) closeTrophiesBtn.addEventListener("click", () => closeModal("modal-trophies"));

const openSessionEndBtn = document.getElementById("open-session-end-btn");
if (openSessionEndBtn) openSessionEndBtn.addEventListener("click", openSessionEndModal);

const sessionEndYesBtn = document.getElementById("session-end-yes-btn");
if (sessionEndYesBtn) sessionEndYesBtn.addEventListener("click", () => { window.close(); });

const sessionEndNoBtn = document.getElementById("session-end-no-btn");
if (sessionEndNoBtn) sessionEndNoBtn.addEventListener("click", () => closeModal("modal-session-end"));

// Click outside modal to close
document.querySelectorAll(".modal-overlay").forEach((overlay) => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      if (overlay.id === "modal-room") stopRestaurant();
      overlay.hidden = true;
    }
  });
});

// Esc key: close any open modal, or open settings
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  const openModal = document.querySelector(".modal-overlay:not([hidden])");
  if (openModal) {
    if (openModal.id === "modal-room") stopRestaurant();
    openModal.hidden = true;
  } else {
    openSettingsPage();
  }
});



