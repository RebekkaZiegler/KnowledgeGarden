const SAVE_KEY = "kg_rpg_mvp_v6";
const COOLDOWN_MS_NORMAL = 5 * 60 * 1000;
const COOLDOWN_MS_DEV_FAST = 10 * 1000;
const HARVEST_PASS_RATE = 0.7;
const NORMAL_ENEMIES_PER_RUN = 3;
const INITIAL_UNLOCK_SLOTS = 2;
const MAX_ACTIVE_BEDS = 6;
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
let combatSession = null;
let expandedSeedCatalogBedId = null;
let catalogFilterBedId = null;
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
  "potion.mp3":              0.70,
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
  startCombatBtn: document.getElementById("start-combat-btn"),
  combatStatus: document.getElementById("combat-status"),
  combatDetail: document.getElementById("combat-detail"),
  labStatus: document.getElementById("lab-status"),
  labList: document.getElementById("lab-list"),
  healArea: document.getElementById("heal-area")
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
    combatSession = null;
    labelSession = null;
    saveState();
    renderAll();
  });

  els.startCombatBtn.addEventListener("click", () => startCombat("normal"));

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
  combatSession = null;
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
      combatUnlocked: false,
      bossDefeated: false,
      enemyProgress: {},
      wrongInCombat: {},
      bossAvailable: false
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
          maxHp: 3,
          currentHp: 3,
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
          combatsWon: 0,
          combatsLost: 0
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
  // Migration: unlock all beds (remove slot gating)
  if (!pack.bedProgress) pack.bedProgress = { unlockSlots: SEED_BEDS.length, unlockedBedIds: [] };
  pack.bedProgress.unlockSlots = SEED_BEDS.length;
  SEED_BEDS.forEach((b) => {
    if (!pack.bedProgress.unlockedBedIds.includes(b.id)) pack.bedProgress.unlockedBedIds.push(b.id);
  });
  if (!pack.lab) pack.lab = { discoveredHybrids: [] };
  const hybridIds = PACK_CONTENT.lab.hybrids.map((h) => h.id);
  PACK_CONTENT.beds.forEach((bed) => {
    const bedState = pack.beds[bed.id];
    if (!bedState) return;
    const validIds = [...bed.plants.map((p) => p.id), ...hybridIds];
    const current = Array.isArray(bedState.activePlantIds) ? bedState.activePlantIds : [];
    bedState.activePlantIds = current.filter((id) => validIds.includes(id)).slice(0, 4);
    // Migration: add missing plant states for plants added to content.js after save was made
    if (!bedState.plants) bedState.plants = {};
    bed.plants.forEach((p) => {
      if (!bedState.plants[p.id]) bedState.plants[p.id] = createEmptyPlantState(p.id);
    });
    // Migration: add new combat fields if missing in older saves
    if (!bedState.enemyProgress) bedState.enemyProgress = {};
    if (!bedState.wrongInCombat) bedState.wrongInCombat = {};
    if (bedState.bossAvailable === undefined) bedState.bossAvailable = false;
    if (bedState.bossDefeated === undefined) bedState.bossDefeated = false;
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
    combatSession = null;
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

function unlockCombatIfNeeded() {
  const bedState = getBedState();
  const bedContent = getActiveBedContent();
  if (!bedState || !bedContent || bedContent.plants.length === 0) return;
  bedState.combatUnlocked = bedContent.plants.every((p) => bedState.plants[p.id]?.harvestedOnce);
}

function renderSeedLibrary() {
  if (!els.seedLibrary) return;
  const progress = getBedProgress();
  const seedProgress = document.getElementById("seed-progress");
  if (seedProgress) seedProgress.textContent = `Freigeschaltete Beete: ${progress.unlockedBedIds.length}/${progress.unlockSlots} Slots belegt | Aktive Beete (mit Pflanzen): ${getActiveBedsWithPlantsCount()}/${MAX_ACTIVE_BEDS}`;

  const canUnlock = progress.unlockedBedIds.length < progress.unlockSlots;
  const pack = getPackState();
  const bedsToShow = catalogFilterBedId ? SEED_BEDS.filter((b) => b.id === catalogFilterBedId) : SEED_BEDS;
  const filterHint = catalogFilterBedId ? `<div class="muted" style="margin-bottom:0.5rem">Zeige nur: <strong>${bedsToShow[0]?.title || catalogFilterBedId}</strong></div>` : "";
  const rows = bedsToShow.map((bed) => {
    const unlocked = isBedUnlocked(bed.id);
    const isOpen = expandedSeedCatalogBedId === bed.id;
    const activeIds = getActivePlantIdsForBed(bed.id);
    const activeCount = activeIds.length;
    const harvestedCount = bed.plants.filter((p) => pack.beds[bed.id]?.plants?.[p.id]?.harvestedOnce).length;
    const sortedPlants = isOpen ? [...bed.plants].sort((a, b) => {
      const aActive = activeIds.includes(a.id);
      const bActive = activeIds.includes(b.id);
      const aHarvested = !!pack.beds[bed.id]?.plants?.[a.id]?.harvestedOnce;
      const bHarvested = !!pack.beds[bed.id]?.plants?.[b.id]?.harvestedOnce;
      const rank = (active, harvested) => active ? 2 : harvested ? 1 : 0;
      return rank(aActive, aHarvested) - rank(bActive, bHarvested);
    }) : [];
    const plantRows = isOpen ? sortedPlants.map((plant) => {
      const pState = pack.beds[bed.id]?.plants?.[plant.id];
      if (!pState) return "";
      const isActive = activeIds.includes(plant.id);
      const status = isActive
        ? { text: "Im Beet", tone: "active" }
        : pState.harvestedOnce
          ? { text: "Geerntet", tone: "done" }
          : { text: "Nicht gepflanzt", tone: "bad" };
      const label = getPlantLabel(bed.id, plant.id, plant.title);
      const harvestClass = isActive
        ? "catalog-row--planted"
        : pState.harvestedOnce
          ? "catalog-row--harvested"
          : "catalog-row--not-harvested";
      const canToggle = unlocked && !isActive && activeCount < 4;
      const actionBtn = isActive
        ? `<button data-seed-plant-toggle="${bed.id}::${plant.id}" style="font-size:0.78rem">Entfernen</button>`
        : canToggle
          ? `<button data-seed-plant-toggle="${bed.id}::${plant.id}" style="font-size:0.78rem">Einsetzen</button>`
          : !unlocked
            ? `<button disabled style="font-size:0.78rem">Beet gesperrt</button>`
            : `<button disabled style="font-size:0.78rem">Beet voll</button>`;
      return `
        <div class="catalog-row ${harvestClass}">
          <span>${label}</span>
          <span class="status-chip ${status.tone}">${status.text}</span>
          <span class="muted">Modul ${moduleCodeFromBedId(bed.id)}</span>
          ${actionBtn}
        </div>
      `;
    }).join("") : "";
    if (unlocked) {
      const activeBtnLabel = state.activeBedId === bed.id ? "Aktives Beet ✓" : "Beet wählen";
      const miniVisuals = activeIds.map((pid) => {
        const pState = pack.beds[bed.id]?.plants?.[pid];
        const pContent = bed.plants.find((p) => p.id === pid);
        if (!pState || !pContent) return "";
        const plantContent = getPlantContent(pid);
        const visualHtml = buildPlantVisualHtml(pState, plantContent, "plant-visual--mini");
        return `<div class="bed-mini-item" data-mini-plant="${pid}" data-mini-bed="${bed.id}">${visualHtml}<div class="bed-mini-label">${escapeHtmlText(pContent.title)}</div></div>`;
      }).filter(Boolean).join("");
      return `
        <div class="list">
          <div class="row">
            <strong>${bed.title}</strong>
            <button data-seed-activate="${bed.id}">${activeBtnLabel}</button>
            <button data-seed-catalog="${bed.id}">${isOpen ? "Sorten ausblenden" : "Sorten anzeigen"}</button>
            <span class="muted">Im Beet: ${activeCount}/4 | Geerntet: ${harvestedCount}/${bed.plants.length}</span>
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
  hybridBed.activePlantIds.push(hybridId);
  saveState();
  renderAll();
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
  unlockCombatIfNeeded();
  renderPlayer();
  renderHealArea();
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

  const html = PACK_CONTENT.beds.map((bed) => {
    if (!unlockedIds.has(bed.id)) return "";
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

  els.gardenRoom.innerHTML = html || `<div class="muted" style="padding:2rem">Keine Beete freigeschaltet. Öffne den Pflanzenkatalog, um zu beginnen.</div>`;

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
  if (lp) lp.scrollTop = lp.scrollHeight;
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
  // Clear the separate visual slot — renderPlantDetail() embeds the visual itself
  if (els.leftPanelVisual) els.leftPanelVisual.innerHTML = "";

  if (!selectedPlantId || !state.activeBedId) {
    els.plantDetail.innerHTML = "Keine Pflanze ausgewählt.<br><br>Klicke eine Pflanze im Garten an.";
    return;
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
  const player = getPackState().player;
  const cooldownSeconds = Math.floor(getCooldownMs() / 1000);
  const curriculum = getCurriculumProgress();
  els.playerStats.innerHTML = `
    <div>XP: <strong>${player.xp}</strong></div>
    <div>HP: <strong>${player.currentHp}/${player.maxHp}</strong></div>
    <div>Früchte: <strong>${player.fruits}</strong></div>
    <div>Trank: <strong>${isDevFastMode() ? player.fertilizer : "∞"}</strong></div>
  `;
  els.cooldownInfo.textContent = `Aktueller Cooldown: ${cooldownSeconds}s`;
  els.curriculumStatus.textContent = `Curriculum-Fortschritt: ${curriculum.harvested}/${curriculum.total} Pflanzen mindestens einmal geerntet${curriculum.complete ? " (vollständig)" : ""}`;
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
  if (t === "water" || t.includes("wässern") || t.includes("giess") || t.includes("gieß") || t.includes("giessen")) return "assets/backgrounds/Watring can.png";
  if (t === "fertilize" || t.includes("düngen") || t.includes("dünger")) return "assets/backgrounds/fertilizer.png";
  if (t === "trim" || t.includes("beschneiden") || t.includes("trimmen") || t.includes("schneid")) return "assets/backgrounds/garden shears.png";
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
  const stagedProgress = locked
    ? Math.max(0, Math.min(phase2Actions, (usedActions - 1) + fillProgress))
    : usedActions;
  const stageRatio = visual.phase === "phase1"
    ? 0
    : Math.max(0, Math.min(1, stagedProgress / phase2Actions));
  const stemMax = Math.round(42 + (growthScale * 38));
  const stemFill = Math.max(10, Math.round(stemMax * (0.12 + (stageRatio * 0.88))));
  const fullBranches = Math.max(0, Math.floor(stagedProgress + 0.0001));
  const growingBranchIdx = (locked && usedActions > 0) ? Math.max(0, usedActions - 1) : -1;
  const currentBranchGrowth = (growingBranchIdx >= 0) ? fillProgress : 1;
  const branchSpecs = new Array(phase2Actions).fill(0).map((_, i) => ({
    y: 0.24 + (((i + 1) / (phase2Actions + 1)) * 0.64),
    rot: (i % 2 === 0 ? -1 : 1) * (22 + ((i % 3) * 5)),
    len: 14 + ((i % 4) * 3)
  }));
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
  const fruitTotalRaw = Math.min(18, Math.max(0, Number(visual.fruitCount || 0)));
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
  const colorStyle = `--stem-hi:${colors.stemHi};--stem-lo:${colors.stemLo};--fruit-hi:${colors.fruitHi};--fruit-lo:${colors.fruitLo};`;
  const potSrc = (() => {
    const steps = plantState.phase1StepsDone || {};
    if (plantState.phase1Completed || visual.phase !== 'phase1') return 'assets/backgrounds/pot ready to grow.png';
    if (steps.seed) return 'assets/backgrounds/pot seed.png';
    if (steps.soil) return 'assets/backgrounds/pot soil.png';
    return 'assets/backgrounds/pot.png';
  })();
  return `
    <div class="${classAttr}" data-plant-visual="${plantState.id}" style="${colorStyle}">
      <img class="plant-pot-img" src="${potSrc}" alt="">
      ${visual.phase !== "phase1" ? `<div class="plant-stem-track" style="--stem-max:${stemMax}px;"></div>` : ""}
      ${visual.phase !== "phase1" ? `<div class="plant-stem${visual.withered ? " is-withered" : ""}" style="--stem-fill:${stemFill}px;"></div>` : ""}
      ${visual.phase !== "phase1" ? `<div class="plant-branches">${branchHtml}</div>` : ""}
      <div class="plant-fruits">${fruitDots}</div>
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
    const optionMeta = bedContent.plants.map((p) => {
      const pState = bedState.plants[p.id];
      const isActive = activeIds.includes(p.id);
      const harvested = Boolean(pState && pState.harvestedOnce);
      if (isActive) {
        return { id: p.id, title: p.title, disabled: true, color: "#8a5500", tag: "[Im Beet]" };
      }
      if (harvested) {
        return { id: p.id, title: p.title, disabled: false, color: "#1f6b35", tag: "[Geerntet]" };
      }
      return { id: p.id, title: p.title, disabled: false, color: "#9f1d1d", tag: "[Neu]" };
    });
    const selectable = optionMeta.filter((o) => !o.disabled);
    if (optionMeta.length > 0) {
      const options = optionMeta.map((o) => {
        const dis = o.disabled ? "disabled" : "";
        return `<option value="${o.id}" style="color:${o.color}" ${dis}>${o.title} ${o.tag}</option>`;
      }).join("");
      addRow = `
        <div class="row">
          <select id="seed-add-select">${options}</select>
          <button id="seed-add-btn" ${(isFull || selectable.length === 0) ? "disabled" : ""}>Einpflanzen</button>
        </div>
        <div class="muted">Legende: <span style="color:#8a5500">Gelb = im Beet</span> | <span style="color:#9f1d1d">Rot = noch nie geerntet</span> | <span style="color:#1f6b35">Grün = schon geerntet</span></div>
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
      saveState();
      renderAll();
    });
  }
}

function renderHealArea() {
  const player = getPackState().player;
  const hpFull = player.currentHp >= player.maxHp;
  const inCombat = Boolean(combatSession);
  const inLabel = Boolean(labelSession);
  const disabled = hpFull || inCombat || inLabel;
  const label = inLabel ? "Heilen läuft..." : hpFull ? "HP voll" : "Heilen (Beschriften)";
  els.healArea.innerHTML = `<div class="row" style="margin-top:0.5rem"><button id="heal-btn" ${disabled ? "disabled" : ""}>${label}</button></div>`;
  const btn = document.getElementById("heal-btn");
  if (btn && !disabled) btn.addEventListener("click", startLabelSession);
}

function startLabelSession() {
  const exercises = PACK_CONTENT.labelExercises || [];
  if (exercises.length === 0) return;
  labelSession = { exerciseId: exercises[0].id, placed: {}, selectedLabel: null };
  selectedPlantId = null;
  phase2Session = null;
  harvestSession = null;
  renderAll();
}

function renderLabelExercise() {
  const exercises = PACK_CONTENT.labelExercises || [];
  const ex = exercises.find((e) => e.id === labelSession.exerciseId);
  if (!ex) { labelSession = null; renderAll(); return; }

  const { placed, selectedLabel } = labelSession;
  const usedLabels = Object.values(placed).filter(Boolean);
  const poolLabels = ex.zones.map((z) => z.label).filter((l) => !usedLabels.includes(l));

  const zoneHtml = ex.zones.map((z) => {
    const filled = placed[z.id];
    return `<div class="label-zone${filled ? " has-label" : ""}${selectedLabel !== null ? " targeted" : ""}"
      data-zone-id="${z.id}"
      style="left:${z.left}%;top:${z.top}%;width:${z.width}%;height:${z.height}%">
      ${filled ? `<span class="label-zone-text">${filled}</span>` : ""}
    </div>`;
  }).join("");

  const chipHtml = poolLabels.map((l) => {
    const sel = selectedLabel === l ? " selected" : "";
    return `<button class="label-chip${sel}" data-label="${l}">${l}</button>`;
  }).join("");

  els.plantDetail.innerHTML = `
    <div><strong>${ex.title}</strong> - Beschrifte die Strukturen</div>
    <div class="label-diagram-wrapper" style="aspect-ratio:${ex.aspectRatio || '5/4'}">${
      ex.diagramType === "image"
        ? `<img src="${ex.imagePath}" style="display:block;width:100%;height:100%;object-fit:contain">`
        : (ex.svgContent || "")
    }${zoneHtml}</div>
    <div class="label-pool">${chipHtml || "<span class='muted'>Alle Chips platziert</span>"}</div>
    <div class="row">
      <button id="label-submit-btn">Auswerten</button>
      <button id="label-cancel-btn">Abbrechen</button>
    </div>
  `;

  els.plantDetail.querySelectorAll(".label-zone").forEach((zone) => {
    zone.addEventListener("click", () => {
      const zid = zone.getAttribute("data-zone-id");
      if (labelSession.selectedLabel) {
        labelSession.placed[zid] = labelSession.selectedLabel;
        labelSession.selectedLabel = null;
      } else if (labelSession.placed[zid]) {
        labelSession.selectedLabel = labelSession.placed[zid];
        delete labelSession.placed[zid];
      }
      renderLabelExercise();
    });
  });

  els.plantDetail.querySelectorAll(".label-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const l = chip.getAttribute("data-label");
      labelSession.selectedLabel = labelSession.selectedLabel === l ? null : l;
      renderLabelExercise();
    });
  });

  document.getElementById("label-submit-btn").addEventListener("click", () => submitLabelExercise(ex));
  document.getElementById("label-cancel-btn").addEventListener("click", () => {
    labelSession = null;
    renderAll();
  });
}

function submitLabelExercise(ex) {
  const { placed } = labelSession;
  let correct = 0;
  const resultLines = ex.zones.map((z) => {
    const given = placed[z.id] || "-";
    const ok = given === z.label;
    if (ok) correct++;
    return `<div>${z.label}: ${ok ? "OK" : `X (gesetzt: ${given})`}</div>`;
  }).join("");

  const pass = correct / ex.zones.length >= ex.passRate;
  const player = getPackState().player;
  let gained = 0;
  if (pass) {
    gained = Math.min(ex.hpReward, player.maxHp - player.currentHp);
    player.currentHp += gained;
    addXp(3);
    saveState();
  }

  els.plantDetail.innerHTML = `
    <div><strong>${ex.title} - Ergebnis</strong></div>
    ${resultLines}
    <div class="feedback">${pass ? `Bestanden! +${gained} HP` : "Nicht bestanden (unter 60% korrekt)."}</div>
    <div class="row">
      <button id="label-retry-btn">Nochmal</button>
      <button id="label-done-btn">Fertig</button>
    </div>
  `;
  renderPlayer();
  renderHealArea();

  document.getElementById("label-retry-btn").addEventListener("click", () => {
    labelSession.placed = {};
    labelSession.selectedLabel = null;
    renderLabelExercise();
  });
  document.getElementById("label-done-btn").addEventListener("click", () => {
    labelSession = null;
    renderAll();
  });
}

function renderPlantDetail() {
  if (labelSession) { renderLabelExercise(); return; }
  const bedState = getBedState();
  if (!bedState) {
    els.plantDetail.textContent = "Wähle im Seed-Menue ein Beet aus und pflanze mindestens eine Pflanze.";
    return;
  }
  const activeIds = bedState.activePlantIds || [];
  if (activeIds.length === 0) {
    els.plantDetail.textContent = "Wähle im Beet oben eine Pflanze aus.";
    return;
  }

  if (!selectedPlantId) {
    els.plantDetail.textContent = "Wähle eine Pflanze zum Starten.";
    return;
  }
  if (!activeIds.includes(selectedPlantId)) {
    selectedPlantId = null;
    els.plantDetail.textContent = "Die gewählte Pflanze ist nicht mehr aktiv. Bitte erneut auswählen.";
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
    const plantVisualHtml = buildPlantVisualHtml(plantState, plantContent, "plant-visual--large");
    els.plantDetail.innerHTML = plantVisualHtml + `
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

  const actionCount = Math.max(1, plantContent.phase2.length || 1);
  const actions = plantContent.phase2.map((a, idx) => {
    const assigned = plantContent.harvestQuestions.filter((_, i) => i % actionCount === idx);
    if (assigned.length === 0) return '';
    const learnedCount = assigned.filter((q) => plantState.phase2Questions[q.id]?.status === "learned").length;
    const hasWrong = assigned.some((q) => plantState.phase2Questions[q.id]?.status === "wrong");
    const allLearnedAction = learnedCount === assigned.length;
    const statusLabel = allLearnedAction ? "OK" : hasWrong ? `⚠ ${learnedCount}/${assigned.length}` : `${learnedCount}/${assigned.length}`;
    const imgSrc = getActionImg(a.type);
    const icon = getActionIcon(a.type);
    const doneClass = allLearnedAction ? " tool-done" : "";
    const tipText = escapeHtmlAttr(`${a.type}: ${a.text} [${statusLabel}]`);
    const btnInner = imgSrc
      ? `<img src="${imgSrc}" class="tool-img" alt="${a.type}"><span class="tool-status">${statusLabel}</span>`
      : `<img src="assets/backgrounds/button.png" class="tool-img" alt="${a.type}"><span class="tool-icon tool-icon--overlay">${icon}</span><span class="tool-status">${statusLabel}</span>`;
    return `<button class="tool-btn${doneClass}" data-p2="${idx}" ${(onCooldown || allLearnedAction) ? "disabled" : ""} title="${tipText}">${btnInner}</button>`;
  }).join("");
  const harvestable = allLearned;
  const label = getCurrentPlantLabel(selectedPlantId, plantContent.title);
  const plantVisualHtml = buildPlantVisualHtml(plantState, plantContent, "plant-visual--large");

  els.plantDetail.innerHTML = plantVisualHtml + `
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
  const labels = { soil: "🪨 Boden", seed: "🌰 Samen", water: "💧 Erstes Giessen" };
  const nextStep = order.find((s) => !plantState.phase1StepsDone[s]);
  const activeStep = plantState.phase1ActiveStep || null;
  const plantVisualHtml = buildPlantVisualHtml(plantState, plantContent, "plant-visual--large");

  if (!activeStep) {
    const label = getCurrentPlantLabel(selectedPlantId, plantContent.title);
    const chips = order.map((s) => {
      const done = plantState.phase1StepsDone[s];
      return `<span class="status-chip ${done ? "done" : "idle"}">${labels[s]}: ${done ? "✓" : "…"}</span>`;
    }).join(" ");

    els.plantDetail.innerHTML = plantVisualHtml + `
      <div class="plant-phase-chips">${chips}</div>
      <div class="row">
        <button id="start-phase1-step-btn" ${nextStep ? "" : "disabled"}>${nextStep ? `${labels[nextStep]} starten` : "Phase 1 abgeschlossen"}</button>
      </div>
      <div class="muted detail-hint">Boden → Samen → Erstes Giessen. Erst lesen, dann Frage beantworten.</div>
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
    els.plantDetail.innerHTML = plantVisualHtml + `
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

  const label = getCurrentPlantLabel(selectedPlantId, plantContent.title);

  if (phase1ShowingLesson) {
    const explanation = normalizeExplanation(stepData.solution) || stepData.statement;
    els.plantDetail.innerHTML = plantVisualHtml + `
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

  els.plantDetail.innerHTML = plantVisualHtml + `
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
  plantState.readinessActionsUsed += 1;
  plantState.cooldownUntil = now + getCooldownMs();
  if (areAllPhase2QuestionsLearned(plantContent, plantState) && !plantState.phase2Withered) {
    plantState.status = "harvestable";
  } else {
    plantState.status = "growing";
  }
  addXp(1);
  selectedPlantId = null;
  saveState();
  renderAll();
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
  const plantVisualHtml = buildPlantVisualHtml(plantState, plantContent, "plant-visual--large");
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
    els.plantDetail.innerHTML = plantVisualHtml + hint + `
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
  els.plantDetail.innerHTML = plantVisualHtml + hint + `
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
  const plantVisualHtml = buildPlantVisualHtml(plantState, plantContent, "plant-visual--large");

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
    els.plantDetail.innerHTML = plantVisualHtml + `
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
        if (ok) { harvestSession.correct += 1; playSound("harvest.mp3"); }
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
  els.plantDetail.innerHTML = plantVisualHtml + `
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
      if (ok) { harvestSession.correct += 1; playSound("harvest.mp3"); }
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

  if (wrongCount === 0) {
    // All correct → harvest success
    pack.player.fruits += harvestSession.correct * 2;
    plantState.harvestedOnce = true;
    plantState.status = "completed";
    plantState.readiness = 0;
    plantState.readinessActionsUsed = 0;
    plantState.cooldownUntil = null;
    const harvestedId = harvestSession.plantId;
    const fruitsGained = harvestSession.correct;
    const idx = bedState.activePlantIds.indexOf(harvestedId);
    if (idx >= 0) bedState.activePlantIds.splice(idx, 1);
    if (selectedPlantId === harvestedId) selectedPlantId = null;
    if (bedState.activePlantIds.length === 0 && state.activeBedId === bedState.id) {
      state.activeBedId = null;
    }
    harvestSession = null;
    addXp(5);
    pack.stats.harvestSuccesses += 1;
    playSound("twinkle done.mp3");
    showToast(`Ernte bestanden! Alle ${total} Fragen richtig. +${fruitsGained * 2} Früchte`, "success");
  } else {
    // Some wrong → only reset wrong questions, plant back to phase 2
    const plantContent = getPlantContent(harvestSession.plantId);
    ensurePhase2Tracking(plantContent, plantState);
    harvestSession.wrongIds.forEach((qId) => {
      if (plantState.phase2Questions[qId]) {
        plantState.phase2Questions[qId].status = "wrong";
      }
    });
    computePhase2Readiness(plantContent, plantState);
    evaluateWither(plantContent, plantState);
    // Bar shows proportion of correct answers (e.g. 4/6 correct → 67%)
    const phase2ActionCount = Math.max(1, plantContent.phase2.length || 1);
    plantState.readinessActionsUsed = phase2ActionCount * (total - wrongCount) / total;
    plantState.cooldownUntil = null;
    plantState.status = "growing";
    showToast(`${wrongCount} von ${total} Fragen falsch – Pflanze zurück in Phase 2.`);
  }

  harvestSession = null;
  saveState();
  renderAll();
}

function maybeUnlockMoreBedSlots() {
  const p = getBedProgress();
  if (p.unlockSlots >= SEED_BEDS.length) return;
  p.unlockSlots += 1;
  showToast(`Boss besiegt! +1 Beet-Slot freigeschaltet (${p.unlockSlots} gesamt).`, "success");
}

function buildEnemyPool(bedContent) {
  const pool = [];
  bedContent.plants.forEach((plant) => {
    (plant.harvestQuestions || []).forEach((q) => pool.push({ ...q, plantId: plant.id }));
    (plant.combatQuestions || []).forEach((q) => pool.push({ ...q, plantId: plant.id }));
  });
  return pool;
}

function pickNextEnemy(enemyPool, bedState) {
  const undefeated = enemyPool.filter((q) => !bedState.enemyProgress[q.id]);
  const pool = undefeated.length > 0 ? undefeated : enemyPool;
  return pool[Math.floor(Math.random() * pool.length)] || null;
}

function checkAndSetBossAvailable(bedState) {
  if (bedState.bossAvailable || bedState.bossDefeated) return;
  const bedContent = getActiveBedContent();
  if (!bedContent) return;
  const pool = buildEnemyPool(bedContent);
  if (pool.length > 0 && pool.every((q) => bedState.enemyProgress[q.id])) {
    bedState.bossAvailable = true;
  }
}

function hardResetCombat(bedId) {
  const bedState = getPackState().beds[bedId];
  if (!bedState) return;
  bedState.enemyProgress = {};
  bedState.wrongInCombat = {};
  bedState.bossAvailable = false;
  saveState();
}

function buildBossQueue(bedContent, bedState) {
  const allQ = buildEnemyPool(bedContent);
  const wrongQ = allQ.filter((q) => bedState.wrongInCombat[q.id]);
  // Any wrong answers → fight exactly those; all correct → 5 random from full pool
  if (wrongQ.length > 0) return shuffle(wrongQ);
  return shuffle([...allQ]).slice(0, 5);
}

function startCombat(phase) {
  phase = phase || "normal";
  const bedContent = getActiveBedContent();
  const bedState = getBedState();
  if (!bedContent || !bedState) return;
  if (!bedState.combatUnlocked) return;
  const player = getPackState().player;

  if (phase === "boss") {
    const bossQueue = buildBossQueue(bedContent, bedState);
    combatSession = { phase: "boss", bossQueue, totalBossQ: bossQueue.length, currentQuestion: null, shuffledOptions: [] };
  } else {
    if (player.fruits <= 0) {
      renderAll();
      return;
    }
    combatSession = { phase: "normal", enemyPool: buildEnemyPool(bedContent), currentQuestion: null, shuffledOptions: [] };
  }
  nextCombatQuestion();
}

function nextCombatQuestion() {
  if (!combatSession) return;
  const bedState = getBedState();
  if (!bedState) { combatSession = null; renderAll(); return; }

  if (combatSession.phase === "boss") {
    const player = getPackState().player;
    if (combatSession.bossQueue.length === 0) {
      bedState.bossDefeated = true;
      bedState.bossAvailable = false;
      getPackState().stats.combatsWon += 1;
      maybeUnlockMoreBedSlots();
      addXp(10);
      saveState();
      combatSession = null;
      showToast("Boss besiegt! Alle Fragen gemeistert. +10 XP", "success");
      renderAll();
      return;
    }
    if (player.fruits <= 0) {
      combatSession = null;
      saveState();
      showToast("Keine Früchte mehr! Rückzug aus Boss-Kampf.", "error");
      renderAll();
      return;
    }
    combatSession.currentQuestion = combatSession.bossQueue.shift();
  } else {
    const player = getPackState().player;
    if (player.fruits <= 0) {
      hardResetCombat(state.activeBedId);
      combatSession = null;
      saveState();
      showToast("Keine Früchte mehr! Kampffortschritt zurückgesetzt.", "error");
      renderAll();
      return;
    }
    const q = pickNextEnemy(combatSession.enemyPool, bedState);
    if (!q) {
      combatSession = null;
      renderAll();
      return;
    }
    combatSession.currentQuestion = q;
  }
  renderAll();
}

function renderBossPreview(bedContent, bedState) {
  if (!bedContent || !bedState) return;
  const player = getPackState().player;
  const allQ = buildEnemyPool(bedContent);
  const wrongQ = allQ.filter((q) => bedState.wrongInCombat[q.id]);
  const queueSize = wrongQ.length > 0 ? wrongQ.length : 5;
  const weakPlantIds = [...new Set(wrongQ.map((q) => q.plantId))];
  const weakNames = weakPlantIds.map((pid) => {
    const p = bedContent.plants.find((pl) => pl.id === pid);
    return p ? p.title : pid;
  });
  const fruitWarn = player.fruits < queueSize
    ? `<div class="feedback">Warnung: Du hast nur ${player.fruits} Früchte, brauchst ${queueSize}. Ernte mehr Pflanzen für mehr Munition!</div>`
    : `<div class="muted">Munition genügend: ${player.fruits} Früchte (benötigt mindestens ${queueSize})</div>`;
  const weakSection = wrongQ.length > 0
    ? `<div><strong>${wrongQ.length} falsch beantwortete Fragen – diese kommen jetzt als Boss-Fragen.</strong></div><div class="muted">Schwache Themen: ${weakNames.join(", ")}</div>`
    : `<div class="muted">Alles richtig! Boss stellt 5 zufällige Fragen aus dem Themenpool.</div>`;
  els.combatDetail.innerHTML = `
    <div><strong>Boss-Kampf Vorbereitung</strong></div>
    <div>Fragen: <strong>${queueSize}</strong></div>
    ${weakSection}
    ${fruitWarn}
    <div class="row">
      <button id="boss-confirm-btn">Jetzt kämpfen</button>
      <button id="boss-cancel-btn">Abbrechen</button>
    </div>
  `;
  document.getElementById("boss-confirm-btn").addEventListener("click", () => startCombat("boss"));
  document.getElementById("boss-cancel-btn").addEventListener("click", () => renderAll());
}

function renderCombat() {
  const bedState = getBedState();
  const player = getPackState().player;

  if (!bedState || !bedState.combatUnlocked) {
    els.startCombatBtn.disabled = true;
    els.combatStatus.textContent = bedState
      ? "Kampf gesperrt. Ernte zuerst alle Pflanzen dieses Beetes."
      : "Kein Beet ausgewählt.";
    els.combatDetail.innerHTML = "";
    return;
  }

  const bedContent = getActiveBedContent();
  const enemyPool = bedContent ? buildEnemyPool(bedContent) : [];
  const defeated = enemyPool.filter((q) => bedState.enemyProgress[q.id]).length;
  const total = enemyPool.length;
  const wrongCount = Object.keys(bedState.wrongInCombat).length;

  // Active combat: render question
  if (combatSession && combatSession.currentQuestion) {
    els.startCombatBtn.disabled = true;
    const remaining = combatSession.phase === "boss" ? combatSession.bossQueue.length : null;
    els.combatStatus.textContent = combatSession.phase === "boss"
      ? `Boss | Verbleibend: ${remaining} | Früchte: ${player.fruits}`
      : `Besiegt: ${defeated}/${total} | Falsch: ${wrongCount} | Früchte: ${player.fruits}`;

    const q = combatSession.currentQuestion;
    const phaseLabel = combatSession.phase === "boss" ? "Boss" : "Gegner";
    if (q.type === "mc") {
      const shuffled = shuffle([...q.options.map((o, i) => ({ ...o, origIdx: i }))]);
      combatSession.shuffledOptions = shuffled;
      const letters = ["A", "B", "C", "D", "E"];
      const correctCount = q.options.filter((o) => o.correct).length;
      const isMultiSelect = correctCount > 1;
      combatSession.isMultiSelect = isMultiSelect;
      if (isMultiSelect) {
        combatSession.selectedIndices = new Set();
        const optHtml = shuffled.map((o, i) => {
          const label = `${letters[i]}) ${o.text}`;
          return `<button class="mc-option mc-option--toggle ${mcBtnClass(label)}" data-oi="${i}">${label}</button>`;
        }).join("");
        els.combatDetail.innerHTML = `
          <div><strong>${phaseLabel}</strong></div>
          <div class="muted" style="font-size:0.8rem;margin-bottom:0.3rem">Mehrere Antworten möglich – alle zutreffenden auswählen</div>
          <div class="question">${q.question}</div>
          <div class="mc-options">${optHtml}</div>
          <div class="row"><button id="combat-submit-btn">Abschicken</button></div>
          <div id="combat-feedback" class="feedback"></div>
        `;
        els.combatDetail.querySelectorAll(".mc-option--toggle").forEach((btn) => {
          btn.addEventListener("click", () => {
            const idx = parseInt(btn.getAttribute("data-oi"), 10);
            if (combatSession.selectedIndices.has(idx)) {
              combatSession.selectedIndices.delete(idx);
              btn.classList.remove("mc-option--selected");
            } else {
              combatSession.selectedIndices.add(idx);
              btn.classList.add("mc-option--selected");
            }
          });
        });
        document.getElementById("combat-submit-btn").addEventListener("click", () => resolveMultiSelectCombatAnswer());
      } else {
        const optHtml = shuffled.map((o, i) => {
          const label = `${letters[i]}) ${o.text}`;
          return `<button class="mc-option ${mcBtnClass(label)}" data-oi="${i}">${label}</button>`;
        }).join("");
        els.combatDetail.innerHTML = `
          <div><strong>${phaseLabel}</strong></div>
          <div class="question">${q.question}</div>
          <div class="mc-options">${optHtml}</div>
          <div id="combat-feedback" class="feedback"></div>
        `;
        els.combatDetail.querySelectorAll(".mc-option").forEach((btn) => {
          btn.addEventListener("click", () => resolveCombatAnswer(parseInt(btn.getAttribute("data-oi"), 10)));
        });
      }
    } else {
      els.combatDetail.innerHTML = `
        <div><strong>${phaseLabel}</strong></div>
        <div class="question">${q.statement}</div>
        <div class="row">
          <button data-c="true">True</button>
          <button data-c="false">False</button>
        </div>
        <div id="combat-feedback" class="feedback"></div>
      `;
      els.combatDetail.querySelectorAll("[data-c]").forEach((btn) => {
        btn.addEventListener("click", () => resolveCombatAnswer(btn.getAttribute("data-c") === "true"));
      });
    }
    return;
  }

  // No active combat: show status + controls
  const bossReady = bedState.bossAvailable && !bedState.bossDefeated;
  let statusParts = [`Besiegt: ${defeated}/${total}`, `Falsch: ${wrongCount}`, `Früchte: ${player.fruits}`];
  if (bedState.bossDefeated) statusParts.push("Boss besiegt!");
  else if (bossReady) statusParts.push("Boss bereit!");
  els.combatStatus.textContent = statusParts.join(" | ");

  if (player.fruits <= 0) {
    els.startCombatBtn.disabled = true;
    els.combatDetail.innerHTML = `<div class="feedback">Keine Früchte! Ernte Pflanzen um Munition aufzufuellen.</div>`;
    return;
  }

  els.startCombatBtn.disabled = false;
  if (bossReady) {
    const queueSize = Math.max(5, wrongCount);
    els.combatDetail.innerHTML = `
      <div class="row">
        <button id="start-boss-btn">Boss bekämpfen (${queueSize} Fragen)</button>
      </div>
    `;
    document.getElementById("start-boss-btn").addEventListener("click", () => {
      renderBossPreview(getActiveBedContent(), getBedState());
    });
  } else {
    els.combatDetail.innerHTML = "";
  }
}

function applyCombatOutcome(ok, feedbackText) {
  const bedState = getBedState();
  const player = getPackState().player;
  const q = combatSession.currentQuestion;
  const fb = document.getElementById("combat-feedback");

  if (ok) {
    player.fruits -= 1;
    addXp(1);
    if (combatSession.phase === "normal" && bedState) {
      bedState.enemyProgress[q.id] = true;
      checkAndSetBossAvailable(bedState);
    }
    fb.textContent = `Treffer! Früchte: ${player.fruits}.${feedbackText ? " " + feedbackText : ""}`;
  } else {
    player.currentHp -= 1;
    if (combatSession.phase === "normal" && bedState) {
      bedState.wrongInCombat[q.id] = true;
    }
    if (combatSession.phase === "boss") {
      combatSession.bossQueue.push(q);
    }
    fb.textContent = `Fehler. HP: ${player.currentHp}/${player.maxHp}.${feedbackText ? " " + feedbackText : ""}`;
  }

  const defeated = player.currentHp <= 0;
  if (defeated) {
    player.currentHp = 1;
    combatSession = null;
    getPackState().stats.combatsLost += 1;
  }
  saveState();
  renderPlayer();

  const actionRow = document.createElement("div");
  actionRow.className = "row";
  const continueBtn = document.createElement("button");
  if (defeated) {
    showToast("Niederlage! HP auf 1 wiederhergestellt.", "error");
    continueBtn.textContent = "Niederlage – Rückzug";
    continueBtn.addEventListener("click", () => renderAll());
  } else {
    continueBtn.textContent = "Weiter";
    continueBtn.addEventListener("click", () => nextCombatQuestion());
  }
  actionRow.appendChild(continueBtn);
  fb.insertAdjacentElement("afterend", actionRow);
}

function resolveCombatAnswer(answer) {
  if (!combatSession || !combatSession.currentQuestion) return;
  const q = combatSession.currentQuestion;
  let ok, feedbackText;
  if (q.type === "mc") {
    const chosen = combatSession.shuffledOptions[answer];
    ok = Boolean(chosen && chosen.correct);
    const correctText = (combatSession.shuffledOptions.find((o) => o.correct) || {}).text || "";
    feedbackText = ok ? "" : `Richtige Antwort: ${correctText}`;
    els.combatDetail.querySelectorAll(".mc-option").forEach((b) => {
      const idx = parseInt(b.getAttribute("data-oi"), 10);
      if (combatSession.shuffledOptions[idx]?.correct) b.classList.add("mc-correct");
      else if (idx === answer) b.classList.add("mc-wrong");
      b.disabled = true;
    });
  } else {
    ok = answer === q.answer;
    feedbackText = tfFeedback(q, answer);
    els.combatDetail.querySelectorAll("[data-c]").forEach((b) => b.setAttribute("disabled", "disabled"));
  }
  applyCombatOutcome(ok, feedbackText);
}

function resolveMultiSelectCombatAnswer() {
  if (!combatSession || !combatSession.currentQuestion) return;
  const opts = combatSession.shuffledOptions;
  const selected = combatSession.selectedIndices || new Set();
  // Correct = every correct option is selected AND no wrong option is selected
  const ok = selected.size > 0 && opts.every((o, i) => o.correct ? selected.has(i) : !selected.has(i));
  const correctTexts = opts.filter((o) => o.correct).map((o) => o.text).join(" | ");
  const feedbackText = ok ? "" : `Richtig wären: ${correctTexts}`;
  const submitBtn = document.getElementById("combat-submit-btn");
  if (submitBtn) submitBtn.disabled = true;
  els.combatDetail.querySelectorAll(".mc-option--toggle").forEach((b) => {
    const idx = parseInt(b.getAttribute("data-oi"), 10);
    if (opts[idx]?.correct) b.classList.add("mc-correct");
    else if (selected.has(idx)) b.classList.add("mc-wrong");
    b.disabled = true;
  });
  applyCombatOutcome(ok, feedbackText);
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
    if (harvestSession || combatSession) return;
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
        if (harvestable && !prev.harvestable) {
          playSound("twinkle done.mp3");
        } else if (cooldownDone && !prev.cooldownDone && !harvestable) {
          playSound("twinkle.mp3");
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
      readyHarvest: 0,
      readyCombat: false,
      bossReady: false
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

  const activeBed = getBedState();
  const readyCombat = Boolean(activeBed && activeBed.combatUnlocked && pack.player && pack.player.fruits > 0);
  const bossReady = Boolean(activeBed && activeBed.bossAvailable && !activeBed.bossDefeated);
  return { activePlants, readyLearn, readyHarvest, readyCombat, bossReady };
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
  const signature = `${signal.activePlants}:${signal.readyLearn}:${signal.readyHarvest}:${signal.readyCombat ? 1 : 0}:${signal.bossReady ? 1 : 0}`;
  if (signature === lastFaviconSignature) return;
  lastFaviconSignature = signature;

  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const hasActive = signal.activePlants > 0;
  const hasAnyReady = signal.readyCombat || signal.readyHarvest > 0 || signal.readyLearn > 0;
  let dotColor = null;
  if (signal.readyCombat) dotColor = "#d92d20"; // rot
  else if (signal.readyHarvest > 0) dotColor = "#ea7a00"; // orange
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
  if (section === "combat") return document.getElementById("panel-combat");
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
  const combat = document.getElementById("panel-combat");
  const expandBtn = document.getElementById("expand-ui-btn");
  const panels = [settings, player, beds, detail, combat].filter(Boolean);

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
  } else if (section === "combat") {
    visible.add("panel-combat");
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

function openCombatModal() {
  renderCombat();
  openModal("modal-combat");
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

// ── Bottom nav + modal triggers ────────────────────────────────────────────
const openCatalogBtn = document.getElementById("open-catalog-btn");
if (openCatalogBtn) openCatalogBtn.addEventListener("click", () => openCatalogModal(null));

const openCombatBtn = document.getElementById("open-combat-btn");
if (openCombatBtn) openCombatBtn.addEventListener("click", openCombatModal);

const openLabBtn = document.getElementById("open-lab-btn");
if (openLabBtn) openLabBtn.addEventListener("click", openLabModal);

const toggleSettingsBtn = document.getElementById("toggle-settings-btn");
if (toggleSettingsBtn) toggleSettingsBtn.addEventListener("click", openSettingsPage);

// Modal close buttons
const closeSettingsBtn = document.getElementById("close-settings-btn");
if (closeSettingsBtn) closeSettingsBtn.addEventListener("click", () => closeModal("modal-settings"));

const closeCatalogBtn = document.getElementById("close-catalog-btn");
if (closeCatalogBtn) closeCatalogBtn.addEventListener("click", () => { catalogFilterBedId = null; closeModal("modal-catalog"); });

const closeCombatBtn = document.getElementById("close-combat-btn");
if (closeCombatBtn) closeCombatBtn.addEventListener("click", () => closeModal("modal-combat"));

const closeLabBtn = document.getElementById("close-lab-btn");
if (closeLabBtn) closeLabBtn.addEventListener("click", () => closeModal("modal-lab"));

// Click outside modal to close
document.querySelectorAll(".modal-overlay").forEach((overlay) => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.hidden = true;
  });
});

// Esc key: close any open modal, or open settings
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  const openModal = document.querySelector(".modal-overlay:not([hidden])");
  if (openModal) {
    openModal.hidden = true;
  } else {
    openSettingsPage();
  }
});



