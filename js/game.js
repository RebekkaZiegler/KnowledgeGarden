const SAVE_KEY = "kg_rpg_mvp_v4";
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

const CHANGELOG_VERSION = "0.3";
const CHANGELOG_KEY = `kg_changelog_seen_${CHANGELOG_VERSION}`;
const CHANGELOG = [
  { type: "fix",     text: "Dünger im Normalmodus kostenlos – Cooldown überspringen verbraucht keinen Dünger mehr" },
  { type: "fix",     text: "HP nach Kampfniederlage auf 1 zurückgesetzt – kein Softlock mehr möglich" },
  { type: "fix",     text: "Verwelkung direkt nach fehlgeschlagener Ernte berechnet" },
  { type: "fix",     text: "Alte Speicherstände: fehlende Boss-Felder werden beim Laden automatisch ergänzt" },
  { type: "fix",     text: "\"Verstanden\"-Button im Was-ist-neu-Fenster schließt das Fenster jetzt korrekt" },
  { type: "improve", text: "Wachstumsbalken unter jeder Pflanze im Hauptmenü – Fortschritt auf einen Blick" },
  { type: "improve", text: "Cooldown-Timer für alle Pflanzen sichtbar, nicht nur die ausgewählte" },
  { type: "improve", text: "Spielerfigur läuft schneller in der Weltansicht" },
  { type: "improve", text: "Detailpanel breiter und Fragentext besser lesbar (mehr Platz, höhere Zeilenhöhe)" },
  { type: "improve", text: "Alle Browser-Popups durch In-Game-Toast-Benachrichtigungen ersetzt" }
];

let state = loadState();
let selectedPlantId = null;
let harvestSession = null;
let phase2Session = null;
let combatSession = null;
let expandedSeedCatalogBedId = null;
let phase1ShowingLesson = false;
let labelSession = null;
let uiViewMode = "full";
let uiViewSection = "seed";
let lastFaviconSignature = "";

const els = {
  playerStats: document.getElementById("player-stats"),
  bedTitle: document.getElementById("bed-title"),
  bedTabs: document.getElementById("bed-tabs"),
  seedProgress: document.getElementById("seed-progress"),
  seedLibrary: document.getElementById("seed-library"),
  curriculumStatus: document.getElementById("curriculum-status"),
  devModeBtn: document.getElementById("dev-mode-btn"),
  cooldownInfo: document.getElementById("cooldown-info"),
  plantsList: document.getElementById("plants-list"),
  plantDetail: document.getElementById("plant-detail"),
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
    .replace(/^\s*(Korrekt\.?|Richtig\.?|Falsch\.?)\s*/i, "")
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
    version: 1,
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
          unlockSlots: INITIAL_UNLOCK_SLOTS,
          unlockedBedIds: []
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
    if (!parsed || parsed.version !== 1) return createInitialState();
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
  const hybridIds = PACK_CONTENT.lab.hybrids.map((h) => h.id);
  PACK_CONTENT.beds.forEach((bed) => {
    const bedState = pack.beds[bed.id];
    if (!bedState) return;
    const validIds = [...bed.plants.map((p) => p.id), ...hybridIds];
    const current = Array.isArray(bedState.activePlantIds) ? bedState.activePlantIds : [];
    bedState.activePlantIds = current.filter((id) => validIds.includes(id)).slice(0, 4);
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
  if (!candidate || candidate.version !== 1 || !candidate.packs || !candidate.activePackId) {
    return { ok: false, reason: "Kein kompatibler Spielstand (Version 1) gefunden." };
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
    if (stat.status === "wrong") total += PHASE2_WRONG_SCORE;
    else total += PHASE2_UNSEEN_SCORE;
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
  const progress = getBedProgress();
  els.seedProgress.textContent = `Freigeschaltete Beete: ${progress.unlockedBedIds.length}/${progress.unlockSlots} Slots belegt | Aktive Beete (mit Pflanzen): ${getActiveBedsWithPlantsCount()}/${MAX_ACTIVE_BEDS}`;

  const canUnlock = progress.unlockedBedIds.length < progress.unlockSlots;
  const pack = getPackState();
  const rows = SEED_BEDS.map((bed) => {
    const unlocked = isBedUnlocked(bed.id);
    const isOpen = expandedSeedCatalogBedId === bed.id;
    const activeIds = getActivePlantIdsForBed(bed.id);
    const activeCount = activeIds.length;
    const harvestedCount = bed.plants.filter((p) => pack.beds[bed.id]?.plants?.[p.id]?.harvestedOnce).length;
    const plantRows = isOpen ? bed.plants.map((plant) => {
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
      return `
        <div class="catalog-row ${harvestClass}">
          <span>${label}</span>
          <span class="status-chip ${status.tone}">${status.text}</span>
          <span class="muted">Modul ${moduleCodeFromBedId(bed.id)}</span>
        </div>
      `;
    }).join("") : "";
    if (unlocked) {
      const activeBtnLabel = state.activeBedId === bed.id ? "Aktives Beet" : "Beet wählen";
      return `
        <div class="list">
          <div class="row">
            <strong>${bed.title}</strong>
            <button data-seed-activate="${bed.id}">${activeBtnLabel}</button>
            <button data-seed-catalog="${bed.id}">${isOpen ? "Sorten ausblenden" : "Sorten anzeigen"}</button>
            <span class="muted">Im Beet: ${activeCount}/4 | Samentypen geerntet: ${harvestedCount}/${bed.plants.length}</span>
          </div>
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
  els.seedLibrary.innerHTML = rows.join("");

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
    });
  });

  els.seedLibrary.querySelectorAll("[data-seed-activate]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setActiveBed(btn.getAttribute("data-seed-activate"));
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
      }

      saveState();
      renderAll();
    });
  });
}

function renderBedTabs() {
  const visible = getWorldVisibleBeds();

  if (visible.length === 0) {
    els.bedTabs.innerHTML = `<span class="muted">Keine aktiven Beete. Wähle ein Beet im Seed-Menue.</span>`;
    return;
  }

  const tabs = visible.map((bed) => {
    const activeClass = bed.id === state.activeBedId ? " tab-btn--active" : "";
    return `<button class="tab-btn${activeClass}" data-bed-tab="${bed.id}">${bed.title}</button>`;
  }).join("");

  els.bedTabs.innerHTML = tabs;
  els.bedTabs.querySelectorAll("[data-bed-tab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setActiveBed(btn.getAttribute("data-bed-tab"));
    });
  });
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

function synthesizeHybrid(hybridId) {
  const hybrid = PACK_CONTENT.lab.hybrids.find((h) => h.id === hybridId);
  if (!hybrid) return;
  const pack = getPackState();
  const bedState = getBedState();
  if (!bedState) { showToast("Kein aktives Beet ausgewählt.", "error"); return; }
  if (!canActivateBedForPlanting(bedState.id)) { showToast(`Maximal ${MAX_ACTIVE_BEDS} aktive Beete mit Pflanzen gleichzeitig.`, "error"); return; }
  if (bedState.activePlantIds.length >= 4) { showToast("Beet ist voll (4/4). Ernte zuerst eine Pflanze.", "error"); return; }
  if (pack.player.fruits < 2) { showToast("Nicht genug Früchte (benötigt: 2).", "error"); return; }
  if (!isHybridSourceUnlocked(hybrid)) { showToast("Quellpflanzen noch nicht vollständig geerntet.", "error"); return; }
  pack.player.fruits -= 2;
  if (!pack.lab.discoveredHybrids.includes(hybridId)) pack.lab.discoveredHybrids.push(hybridId);
  if (!bedState.plants[hybridId]) bedState.plants[hybridId] = createEmptyPlantState(hybridId);
  bedState.activePlantIds.push(hybridId);
  saveState();
  renderAll();
}

function plantHybrid(hybridId) {
  const bedState = getBedState();
  if (!bedState) { showToast("Kein aktives Beet ausgewählt.", "error"); return; }
  if (!canActivateBedForPlanting(bedState.id)) { showToast(`Maximal ${MAX_ACTIVE_BEDS} aktive Beete mit Pflanzen gleichzeitig.`, "error"); return; }
  if (bedState.activePlantIds.includes(hybridId)) { showToast("Hybridpflanze ist bereits im Beet.", "error"); return; }
  if (bedState.activePlantIds.length >= 4) { showToast("Beet ist voll (4/4). Ernte zuerst eine Pflanze.", "error"); return; }
  if (!bedState.plants[hybridId]) bedState.plants[hybridId] = createEmptyPlantState(hybridId);
  bedState.activePlantIds.push(hybridId);
  saveState();
  renderAll();
}

function renderLab() {
  const pack = getPackState();
  const bedState = getBedState();
  const hybrids = PACK_CONTENT.lab.hybrids;
  if (!pack) { els.labList.innerHTML = ""; return; }
  const labUnlocked = isLabUnlocked();
  const unlockProg = getLabUnlockProgress();
  const activeIds = bedState?.activePlantIds || [];
  const isFull = activeIds.length >= 4;
  const hasBed = Boolean(bedState);

  if (!labUnlocked) {
    els.labStatus.textContent = `Labor gesperrt: ${unlockProg.bedsWithHarvest}/${unlockProg.requiredBeds} Beete mit mindestens 1 Ernte`;
    els.labList.innerHTML = `<div class="muted">Freischaltung: Ernte mindestens eine Pflanze in 2 verschiedenen Beeten.</div>`;
    return;
  }

  const rows = hybrids.map((hybrid) => {
    const isActive = activeIds.includes(hybrid.id);
    const isDiscovered = pack.lab.discoveredHybrids.includes(hybrid.id);
    const sourcesUnlocked = isHybridSourceUnlocked(hybrid);
    const canSynthesize = sourcesUnlocked && !isDiscovered && !isActive && hasBed && !isFull && pack.player.fruits >= 2;
    const canPlant = isDiscovered && !isActive && hasBed && !isFull;
    const sourceModules = (hybrid.sources || []).map((src) => {
      const m = src.split("::")[0].match(/_(\d{4})$/);
      return m ? m[1] : src.split("::")[0];
    }).join(" + ");

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
    return `
      <div class="catalog-row catalog-row--hybrid">
        <span>${isRevealed ? hybrid.title : "???"}</span>
        ${statusChip}
        ${isRevealed ? `<span class="muted">Quellen: ${sourceModules}</span>` : ""}
        ${actionBtn}
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
  renderSeedLibrary();
  renderLab();
  renderBedTabs();

  const active = getActiveBedContent();
  els.bedTitle.textContent = active ? `Beet: ${active.title}` : "Beet: keines ausgewählt";

  renderPlayer();
  renderHealArea();
  renderPlants();
  renderPlantDetail();
  renderCombat();
  updateReactiveFavicon();
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
    <div>Dünger: <strong>${isDevFastMode() ? player.fertilizer : "∞"}</strong></div>
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

function renderPlants() {
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
    const isSelected = selectedPlantId === plantState.id;
    const label = getCurrentPlantLabel(plantState.id, content.title);
    const rowClass = plantState.harvestedOnce ? "plant-entry--mastered" : "plant-entry--planted";
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
      return `<span class="plant-branch${visual.withered ? " is-withered" : ""}" style="--by:${by}px;--br:${b.rot}deg;--bl:${bl}px;"></span>`;
    }).join("");
    const fruitTotalRaw = Math.min(18, Math.max(0, Number(visual.fruitCount || 0)));
    const fruitTotal = (visual.phase === "phase3" || visual.phase === "phase2_final") ? fruitTotalRaw : 0;
    const fruitOpacity = visual.phase === "phase2_final"
      ? (0.45 + (fillProgress * 0.55))
      : 1;
    const fruitAnchors = [{ x: 0, y: stemFill + 6 }];
    branchSpecs.forEach((b, i) => {
      let grow = 0;
      if (i < fullBranches) grow = 1;
      else if (i === growingBranchIdx) grow = Math.max(0.18, currentBranchGrowth);
      if (grow <= 0) return;
      const by = Math.round(stemFill * b.y);
      const bl = Math.max(6, Math.round(b.len * grow));
      const dir = b.rot >= 0 ? 1 : -1;
      fruitAnchors.push({
        x: Math.round(dir * (6 + bl * 0.82)),
        y: Math.round(by + 4 + bl * 0.45)
      });
    });
    const fruitDots = fruitTotal > 0
      ? new Array(fruitTotal).fill(0).map((_, i) => {
        const anchor = fruitAnchors[i % Math.max(1, fruitAnchors.length)];
        const ring = Math.floor(i / fruitAnchors.length);
        const jitterX = Math.round(Math.sin((i + 1) * 2.17) * (2 + (ring * 1.3)));
        const jitterY = Math.round(Math.cos((i + 1) * 1.73) * 2 + (ring * 3));
        const fx = Math.round(anchor.x + jitterX);
        const fy = Math.round(anchor.y + jitterY);
        return `<span class="plant-fruit-dot" style="--fx:${fx}px;--fy:${fy}px;--fo:${fruitOpacity.toFixed(2)};"></span>`;
      }).join("")
      : "";
    const statusText = plantState.harvestedOnce ? "Schon geerntet" : "Im Beet";
    const cooldownText = locked ? `${remainingSec}s` : "bereit";
    const tooltipName = escapeHtmlAttr(label);
    const tooltipStatus = escapeHtmlAttr(statusText);
    const tooltipPhase = escapeHtmlAttr(String(plantState.phase));
    const tooltipReady = escapeHtmlAttr(String(Math.floor(plantState.readiness)));
    const tooltipCooldown = escapeHtmlAttr(cooldownText);
    const growthPct = visual.phase === "phase1" ? 0 : Math.round(stageRatio * 100);
    const growthLabel = visual.withered ? "Verwelkt" : visual.phase === "phase1" ? "Saat" : growthPct >= 100 ? "Erntereif!" : growthPct + "%";
    const barClass = visual.withered ? " is-withered" : visual.phase === "phase1" ? " is-seed" : "";
    return `
      <div class="plant-entry ${rowClass}">
        <button class="plant-row${selected}" data-plant="${plantState.id}" data-plant-tip="1" data-tip-name="${tooltipName}" data-tip-status="${tooltipStatus}" data-tip-phase="${tooltipPhase}" data-tip-ready="${tooltipReady}" data-tip-cooldown="${tooltipCooldown}">
          <span>${label}</span>
        </button>
        <button class="plant-remove" data-plant-remove="${plantState.id}" title="Entfernen">X</button>
      </div>
      <div class="plant-visual" data-plant-visual="${plantState.id}" data-plant-tip="1" data-tip-name="${tooltipName}" data-tip-status="${tooltipStatus}" data-tip-phase="${tooltipPhase}" data-tip-ready="${tooltipReady}" data-tip-cooldown="${tooltipCooldown}">
        <div class="plant-growth-bar${barClass}"><div class="plant-growth-fill" style="width:${growthPct}%"></div><span class="plant-growth-label">${growthLabel}</span></div>
        <div class="plant-visual-bed${visual.soilFilled ? " has-soil" : ""}${visual.soilDark ? " is-watered" : ""}"></div>
        ${visual.hasSeedling ? "<div class='plant-sprout'></div>" : ""}
        ${visual.phase !== "phase1" ? `<div class="plant-stem-track" style="--stem-max:${stemMax}px;"></div>` : ""}
        ${visual.phase !== "phase1" ? `<div class="plant-stem${visual.withered ? " is-withered" : ""}" style="--stem-fill:${stemFill}px;"></div>` : ""}
        ${visual.phase !== "phase1" ? `<div class="plant-branches">${branchHtml}</div>` : ""}
        ${visual.phase !== "phase1" ? `<div class="plant-tip-bud${visual.withered ? " is-withered" : ""}" style="--bud-y:${stemFill}px;"></div>` : ""}
        <div class="plant-fruits">${fruitDots}</div>
        ${locked ? `<div class="plant-cooldown-hint">${remainingSec}s</div>` : ""}
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

  els.plantsList.querySelectorAll("[data-plant-visual]").forEach((el) => {
    el.addEventListener("click", () => {
      selectedPlantId = el.getAttribute("data-plant-visual");
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

  const actions = plantContent.phase2.map((a, idx) => {
    const actionCount = Math.max(1, plantContent.phase2.length || 1);
    const assigned = plantContent.harvestQuestions.filter((_, i) => i % actionCount === idx);
    if (assigned.length === 0) return '';
    const learnedCount = assigned.filter((q) => plantState.phase2Questions[q.id]?.status === "learned").length;
    const hasWrong = assigned.some((q) => plantState.phase2Questions[q.id]?.status === "wrong");
    const allLearned = learnedCount === assigned.length;
    const statusLabel = allLearned ? ` [OK]` : hasWrong ? ` [X Wiederholen] ${learnedCount}/${assigned.length}` : ` [${learnedCount}/${assigned.length}]`;
    return `<button data-p2="${idx}" ${(onCooldown || allLearned) ? "disabled" : ""}>${a.type}: ${a.text}${statusLabel}</button>`;
  }).join("");
  const harvestable = allLearned;
  const label = getCurrentPlantLabel(selectedPlantId, plantContent.title);

  els.plantDetail.innerHTML = `
    <div><strong>${label}</strong></div>
    <div>Phase 2 aktiv</div>
    <div>Bereitschafts-Defizit: ${Math.floor(readinessDebt)} (Ziel: 0)</div>
    <div class="row">${actions}</div>
    <div class="row">
      <button id="use-fertilizer-btn" ${!onCooldown ? "disabled" : ""}>${isDevFastMode() ? `Dünger nutzen (${secsLeft}s)` : `Cooldown überspringen (${secsLeft}s)`}</button>
      <button id="start-harvest-btn" ${(!harvestable || onCooldown) ? "disabled" : ""}>${onCooldown ? `Ernte gesperrt (${secsLeft}s)` : "Ernte starten"}</button>
    </div>
    ${onCooldown ? `<div class="muted">Cooldown läuft: ${secsLeft}s (${cooldownProgressPct}%)</div>` : ""}
    <div class="muted">Jede Aktion trainiert ihren eigenen Fragen-Pool.</div>
    <div class="muted">Lerne alle Fragen (Defizit = 0), um die Ernte freizuschalten. Defizit: ungesehen = 20, falsch = 10, gelernt = 0.</div>
    <div class="muted">Cooldown-Modus: ${isDevFastMode() ? "dev (10s)" : "normal (5m)"}</div>
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
    saveState();
    renderAll();
  });

  document.getElementById("start-harvest-btn").addEventListener("click", () => {
    startHarvest(selectedPlantId);
  });
}

function renderPhase1(plantContent, plantState) {
  const order = ["soil", "seed", "water"];
  const labels = { soil: "Boden", seed: "Samen", water: "Erstes Giessen" };
  const nextStep = order.find((s) => !plantState.phase1StepsDone[s]);
  const activeStep = plantState.phase1ActiveStep || null;

  if (!activeStep) {
    const label = getCurrentPlantLabel(selectedPlantId, plantContent.title);
    const chips = order.map((s) => {
      const done = plantState.phase1StepsDone[s];
      return `<span class="muted">${labels[s]}: ${done ? "done" : "pending"}</span>`;
    }).join(" | ");

    els.plantDetail.innerHTML = `
      <div><strong>${label}</strong></div>
      <div>Phase-1-Setup</div>
      <div class="muted">${chips}</div>
      <div class="row">
        <button id="start-phase1-step-btn" ${nextStep ? "" : "disabled"}>${nextStep ? `${labels[nextStep]} starten` : "Phase 1 abgeschlossen"}</button>
      </div>
      <div class="muted">Ablauf: Boden -> Samen -> Erstes Giessen. Erst Lerninhalt lesen, dann Frage beantworten.</div>
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
      <div class="row"><button id="phase1-back-btn">Zurueck</button></div>
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
    els.plantDetail.innerHTML = `
      <div><strong>${label}</strong></div>
      <div>Phase 1: ${labels[activeStep]} - Lerninhalt</div>
      <div class="question">${explanation}</div>
      <div class="muted">Lies den Inhalt durch, dann beantworte die Frage.</div>
      <div class="row"><button id="phase1-to-question-btn">Weiter zur Frage</button></div>
    `;
    document.getElementById("phase1-to-question-btn").addEventListener("click", () => {
      phase1ShowingLesson = false;
      renderAll();
    });
    return;
  }

  els.plantDetail.innerHTML = `
    <div><strong>${label}</strong></div>
    <div>Phase 1: ${labels[activeStep]} - Frage</div>
    <div class="question">${stepData.statement}</div>
    <div class="row">
      <button data-a="true">True</button>
      <button data-a="false">False</button>
    </div>
    <div class="muted">Sofortige Wiederholung aktiv. Lösung wird nach jedem Versuch angezeigt.</div>
    <div id="phase1-feedback" class="feedback"></div>
  `;

  els.plantDetail.querySelectorAll("[data-a]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const answer = btn.getAttribute("data-a") === "true";
      const ok = answer === stepData.answer;
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
  const label = getCurrentPlantLabel(phase2Session.plantId, plantContent.title);
  const action = plantContent.phase2[phase2Session.actionIndex];
  const q = phase2Session.question;

  els.plantDetail.innerHTML = `
    <div><strong>${label}</strong></div>
    <div>Phase-2-Aktion: ${action.type} (${action.text})</div>
    <div class="question">${q.statement}</div>
    <div class="row">
      <button data-p2a="true">True</button>
      <button data-p2a="false">False</button>
    </div>
    <div id="phase2-feedback" class="feedback"></div>
  `;

  els.plantDetail.querySelectorAll("[data-p2a]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const answer = btn.getAttribute("data-p2a") === "true";
      const ok = answer === q.answer;
      const fb = document.getElementById("phase2-feedback");
      fb.textContent = tfFeedback(q, answer);
      fb.classList.add(ok ? "feedback--correct" : "feedback--wrong");
      els.plantDetail.querySelectorAll("[data-p2a]").forEach((b) => b.setAttribute("disabled", "disabled"));

      const actionRow = document.createElement("div");
      actionRow.className = "row";
      const continueBtn = document.createElement("button");
      continueBtn.textContent = "Weiter";
      actionRow.appendChild(continueBtn);
      fb.insertAdjacentElement("afterend", actionRow);

      continueBtn.addEventListener("click", () => {
        const bedState = getBedState();
        const pid = phase2Session.plantId;
        const aidx = phase2Session.actionIndex;
        const pContent = getPlantContent(pid);
        const pState = bedState.plants[pid];
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
    correct: 0
  };
  renderHarvestQuestion();
}

function renderHarvestQuestion() {
  const q = harvestSession.questions[harvestSession.index];
  const progress = `${harvestSession.index + 1}/${harvestSession.questions.length}`;
  els.plantDetail.innerHTML = `
    <div><strong>Ernte</strong> (${progress})</div>
    <div class="question">${q.statement}</div>
    <div class="row">
      <button data-h="true">True</button>
      <button data-h="false">False</button>
    </div>
    <div id="harvest-feedback" class="feedback"></div>
  `;

  els.plantDetail.querySelectorAll("[data-h]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const answer = btn.getAttribute("data-h") === "true";
      const ok = answer === q.answer;
      if (ok) {
        harvestSession.correct += 1;
      } else {
        markWeakpoint(harvestSession.plantId, q.id);
      }
      const fb = document.getElementById("harvest-feedback");
      fb.textContent = tfFeedback(q, answer);
      fb.classList.add(ok ? "feedback--correct" : "feedback--wrong");
      els.plantDetail.querySelectorAll("[data-h]").forEach((b) => b.setAttribute("disabled", "disabled"));

      const actionRow = document.createElement("div");
      actionRow.className = "row";
      const continueBtn = document.createElement("button");
      continueBtn.textContent = "Weiter";
      actionRow.appendChild(continueBtn);
      fb.insertAdjacentElement("afterend", actionRow);

      continueBtn.addEventListener("click", () => {
        harvestSession.index += 1;
        if (harvestSession.index >= harvestSession.questions.length) finalizeHarvest();
        else renderHarvestQuestion();
      });
    });
  });
}

function finalizeHarvest() {
  const bedState = getBedState();
  if (!bedState) return;
  const pack = getPackState();
  const plantState = bedState.plants[harvestSession.plantId];
  const total = harvestSession.questions.length;
  const rate = harvestSession.correct / total;
  pack.stats.harvestAttempts += 1;

  if (rate >= HARVEST_PASS_RATE) {
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
    showToast(`Ernte bestanden (${Math.round(rate * 100)}%). +${fruitsGained * 2} Früchte`, "success");
  } else {
    const plantContent = getPlantContent(harvestSession.plantId);
    ensurePhase2Tracking(plantContent, plantState);
    Object.values(plantState.phase2Questions).forEach((stat) => {
      if (stat.status === "learned") {
        stat.status = "wrong";
      }
    });
    computePhase2Readiness(plantContent, plantState);
    evaluateWither(plantContent, plantState);
    plantState.readinessActionsUsed = 0;
    plantState.status = "growing";
    showToast(`Ernte nicht bestanden (${Math.round(rate * 100)}%). Defizit wurde wiederhergestellt.`);
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
  if (wrongQ.length >= 5) return shuffle(wrongQ);
  const correctQ = allQ.filter((q) => bedState.enemyProgress[q.id] && !bedState.wrongInCombat[q.id]);
  const needed = 5 - wrongQ.length;
  const filler = shuffle(correctQ).slice(0, needed);
  return shuffle([...wrongQ, ...filler]);
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
  const queueSize = Math.max(5, wrongQ.length);
  const weakPlantIds = [...new Set(wrongQ.map((q) => q.plantId))];
  const weakNames = weakPlantIds.map((pid) => {
    const p = bedContent.plants.find((pl) => pl.id === pid);
    return p ? p.title : pid;
  });
  const fruitWarn = player.fruits < queueSize
    ? `<div class="feedback">Warnung: Du hast nur ${player.fruits} Früchte, brauchst ${queueSize}. Ernte mehr Pflanzen für mehr Munition!</div>`
    : `<div class="muted">Munition genügend: ${player.fruits} Früchte (benötigt mindestens ${queueSize})</div>`;
  const weakSection = wrongQ.length > 0
    ? `<div><strong>${wrongQ.length} Falschantworten im Boss-Kampf</strong></div><div class="muted">Schwache Themen: ${weakNames.join(", ")}</div>`
    : `<div class="muted">Keine Fehler-Fragen. Boss wird mit ${queueSize} zufälligen Fragen aufgefüllt.</div>`;
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
      const letters = ["A", "B", "C", "D"];
      const optHtml = shuffled.map((o, i) =>
        `<button class="mc-option" data-oi="${i}">${letters[i]}) ${o.text}</button>`
      ).join("");
      els.combatDetail.innerHTML = `
        <div><strong>${phaseLabel}</strong></div>
        <div class="question">${q.question}</div>
        <div class="mc-options">${optHtml}</div>
        <div id="combat-feedback" class="feedback"></div>
      `;
      els.combatDetail.querySelectorAll(".mc-option").forEach((btn) => {
        btn.addEventListener("click", () => resolveCombatAnswer(parseInt(btn.getAttribute("data-oi"), 10)));
      });
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

function resolveCombatAnswer(answer) {
  if (!combatSession || !combatSession.currentQuestion) return;
  const bedState = getBedState();
  const player = getPackState().player;
  const q = combatSession.currentQuestion;
  const fb = document.getElementById("combat-feedback");

  // Determine correctness
  let ok, feedbackText;
  if (q.type === "mc") {
    const chosen = combatSession.shuffledOptions[answer];
    ok = chosen && chosen.correct === true;
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

  // Apply outcome
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
    if (!getBedState()) return;
    if (document.activeElement?.id === "seed-add-select") return;
    renderPlants();
    if (!selectedPlantId) return;
    if (harvestSession || combatSession) return;
    const bedState = getBedState();
    const plant = bedState?.plants[selectedPlantId];
    const now = Date.now();
    if (plant && plant.cooldownUntil && now < plant.cooldownUntil) {
      renderPlantDetail();
    }
    updateReactiveFavicon();
  }, 1000);
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

function setWorldVisible(visible) {
  const worldRoot = document.getElementById("world-root");
  if (!worldRoot) return;
  worldRoot.classList.toggle("world-hidden", !visible);
}

function applyPlayerPanelFilter(mode, section) {
  const showSeed = mode !== "compact" || section === "seed";
  const showLab = mode !== "compact" || section === "lab";
  const showCore = mode !== "compact";

  setElementHidden("player-stats", !showCore);
  setElementHidden("heal-area", !showCore);
  setElementHidden("cooldown-info", !showCore);
  setElementHidden("curriculum-status", !showCore);
  setElementHidden("seed-heading", !showSeed);
  setElementHidden("bed-tabs", !showSeed);
  setElementHidden("seed-progress", !showSeed);
  setElementHidden("seed-library", !showSeed);
  setElementHidden("lab-heading", !showLab);
  setElementHidden("lab-status", !showLab);
  setElementHidden("lab-list", !showLab);
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

function showMainUi(opts) {
  const mode = opts && opts.mode ? opts.mode : "full";
  const section = opts && opts.section ? opts.section : "seed";
  const root = document.getElementById("app-ui");
  if (!root) return;
  root.classList.remove("ui-hidden");
  root.classList.toggle("layout--compact", mode === "compact");
  root.classList.remove("compact-section-seed", "compact-section-lab", "compact-section-beds", "compact-section-detail", "compact-section-combat", "compact-section-settings");
  if (mode === "compact") root.classList.add(`compact-section-${section}`);
  setWorldVisible(mode !== "compact");
  uiViewMode = mode;
  uiViewSection = section;
  setUiPanelMode(mode, section);
}

function hideMainUi() {
  const root = document.getElementById("app-ui");
  if (!root) return;
  root.classList.add("ui-hidden");
  root.classList.remove("layout--compact");
  root.classList.remove("compact-section-seed", "compact-section-lab", "compact-section-beds", "compact-section-detail", "compact-section-combat", "compact-section-settings");
  setWorldVisible(true);
  uiViewMode = "full";
  uiViewSection = "seed";
  setUiPanelMode("full", "seed");
  clearPanelFocus();
}

function focusSectionPanel(section) {
  clearPanelFocus();
  const panel = getPanelForSection(section);
  if (!panel) return;
  panel.classList.add("panel--focus");
  panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openFromWorld(target) {
  const t = target || {};
  if (t.bedId && t.bedId !== state.activeBedId) {
    setActiveBed(t.bedId);
  } else {
    renderAll();
  }
  showMainUi({ mode: "compact", section: t.section || "seed" });
  requestAnimationFrame(() => focusSectionPanel(t.section || "seed"));
}

function openPlantFromWorld(bedId, plantId) {
  if (!bedId || !plantId) return;
  const pack = getPackState();
  const bedState = pack?.beds?.[bedId];
  if (!bedState || !Array.isArray(bedState.activePlantIds)) return;
  if (!bedState.activePlantIds.includes(plantId)) return;

  state.activeBedId = bedId;
  selectedPlantId = plantId;
  phase2Session = null;
  harvestSession = null;
  combatSession = null;
  labelSession = null;
  saveState();
  renderAll();
  showMainUi({ mode: "compact", section: "beds" });
  requestAnimationFrame(() => focusSectionPanel("detail"));
}

function openSettingsPage() {
  showMainUi({ mode: "compact", section: "settings" });
  requestAnimationFrame(() => focusSectionPanel("settings"));
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
  getActiveBedId: () => state.activeBedId,
  getCombatWorldState: () => {
    const bedState = getBedState();
    const player = getPackState().player;
    return {
      hasActiveBed: Boolean(bedState),
      combatUnlocked: Boolean(bedState && bedState.combatUnlocked),
      bossReady: Boolean(bedState && bedState.bossAvailable && !bedState.bossDefeated),
      fruits: player ? player.fruits : 0
    };
  },
  getLabWorldState: () => {
    const p = getLabUnlockProgress();
    return {
      unlocked: isLabUnlocked(),
      bedsWithHarvest: p.bedsWithHarvest,
      requiredBeds: p.requiredBeds
    };
  }
};

const closeUiBtn = document.getElementById("close-ui-btn");
if (closeUiBtn) {
  closeUiBtn.addEventListener("click", () => {
    hideMainUi();
  });
}

const expandUiBtn = document.getElementById("expand-ui-btn");
if (expandUiBtn) {
  expandUiBtn.addEventListener("click", () => {
    showMainUi({ mode: "full" });
    clearPanelFocus();
  });
}

const toggleSettingsBtn = document.getElementById("toggle-settings-btn");
if (toggleSettingsBtn) {
  toggleSettingsBtn.addEventListener("click", () => {
    openSettingsPage();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  const uiRoot = document.getElementById("app-ui");
  if (!uiRoot || uiRoot.classList.contains("ui-hidden")) {
    openSettingsPage();
    return;
  }
  if (uiViewMode === "compact" && uiViewSection === "settings") {
    hideMainUi();
    return;
  }
  openSettingsPage();
});



