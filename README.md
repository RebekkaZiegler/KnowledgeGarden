# KnowledgeGarden

A browser-based learning RPG for Heilpraktiker exam prep.  
You grow plants by answering questions, harvest them when ready, and track progress toward your exam deadline.

**Current version:** v1.0 — Heilpraktiker Pack  
**Exam deadline tracked in-game:** February 2028

---

## Play on your phone (recommended)

The game is a PWA — it installs to your home screen and runs like a native app.

**First install:**
1. Open `https://rebekkaziegler.github.io/KnowledgeGarden` in Chrome (Android) or Safari (iOS)
2. **Android Chrome:** tap the 3-dot menu → *Add to Home Screen*
3. **iOS Safari:** tap the Share button → *Add to Home Screen*
4. Open the app from the home screen — it runs fullscreen, no browser bar

**Getting updates:**

Once installed, tap **⚙️ → 🔄 Auf neueste Version aktualisieren** inside the app. Wait ~5 minutes after a new release before pressing it (GitHub Pages CDN propagation delay).

If the update button isn't visible yet or doesn't work:

- **Android Chrome:** open the URL in Chrome (not the home screen icon) → tap the 3-dot menu → *Reload* or *Hard Reload*. If that doesn't work: Settings → Privacy → Clear browsing data → tick only *Cached images and files* (NOT cookies or site data).
- **iOS Safari:** open the URL in Safari → hold the reload button → *Reload Without Content Blockers*, or just close all Safari tabs and reopen.
- **Quickest option:** delete the home screen icon, open the URL fresh in the browser, re-add to home screen.

> ⚠️ **Your save lives in `localStorage`.** Clearing *Cache* is safe — it only removes downloaded files, not your progress. Clearing *Site Data / Storage / Website Data* **will delete your save**. If you need to do a full wipe, use **Settings → Export** first to save a backup file.

The app now checks for updates on every launch, so this should be rare going forward.

---

## Run locally (desktop)

**Requirements:** Node.js 18+, npm

```bash
git clone https://github.com/RebekkaZiegler/KnowledgeGarden.git
cd KnowledgeGarden
npm install
```

```bash
npm run run    # starts server + app window (recommended)
npm run serve  # server only → open http://localhost:5173
npm run check  # syntax check
```

---

## UI layout

Portrait-stacked layout, same on desktop and mobile:

- **Header** — harvest progress (🌾), fruits (🍎), streak (🔥), daily goal dots, pace tracker
- **Garden** (main area) — up to 2 topic shelves with plants in pots
- **Detail panel** — opens below the garden when you tap a plant; shows questions, lesson text, cooldown
- **Bottom nav** (2 rows on mobile) — 🚪 🌱 🍽️ 🔬 🏆 / ⚙️ ♪ ♪♩ 🗑️

---

## Core game loop

1. **Catalog (🌱)** — choose a topic bed, plant a seed
2. **Phase 1** — three setup steps (soil → seed → water), each with a lesson + true/false question
3. **Phase 2** — water / trim / fertilize actions, each asks a harvest question; cooldown between each (5 min)
4. After answering, the app **auto-returns to the garden** — come back when the cooldown is done
5. Once all questions are learned, **harvest** the plant — all questions asked again, all must be correct
6. Wrong harvest answers send only those questions back to Phase 2; correct ones are done
7. **Restaurant (🍽️)** — real-time minigame; answer questions to unlock upgrades and earn fruits
8. **Lab (🔬)** — synthesize hybrid plants once their source plants are harvested

---

## Motivation system

### Streak 🔥
- Increments by 1 each calendar day you answer at least one question
- Resets if you miss a day
- **Buy-back:** if you miss a day, a *Zurückkaufen (3🍎)* button appears — spend 3 fruits to restore your streak
- Can only buy back once; can't buy two days in a row

### Daily goal
- Three dots in the header — fill one per phase 2 action completed
- Resets at midnight

### Pace tracker
- Shows how many questions/day you need to finish all content by February 2028
- Once you have a few days of history: shows your current pace vs. what's needed, and whether you're on track (green ✓) or behind (orange ⚠️)

### Achievements 🏆
Unlock badges for milestones — visible in the trophy room:
- **Questions:** 1, 10, 50, 100, 500, 1000 answered
- **Harvests:** 1, 5, 10, all plants
- **Streak:** 3, 7, 14, 30 days
- **Comeback** — bought a streak back

### Trophy room (🏆)
- Big counter: total questions answered ever
- 90-day activity heatmap (like GitHub's contribution graph)
- Achievement badge grid — locked badges show as 🔒
- Per-topic learning progress bars

---

## Plant mechanics

### Phase 1 — Setup
- Three steps: soil → seed → first watering
- Each shows a lesson, then a true/false question
- Wrong answer: retry immediately, no progression until correct

### Phase 2 — Practice
- Actions: water (💧), trim (✂️), fertilize (🌿)
- Each action asks one harvest question; correct = learned, wrong = stays in queue
- **Cooldown:** 5 minutes between actions (dev mode: 10 seconds)
- After answering, app auto-returns to garden view
- 3 wrong answers on the same question → plant withers and resets to Phase 1
- All questions learned → plant turns sparkly, ready to harvest

### Harvest
- All harvest questions in random order; all must be answered correctly
- Wrong answers reset only those questions to Phase 2
- Success: fruits earned, plant removed from active bed, counts toward completion

### Plant selector
- By default only shows **new (unplanted, unharvested)** plants
- *Geerntete anzeigen* button reveals previously harvested plants for replanting

---

## Colors per topic

| Topic | Stem | Fruit |
|---|---|---|
| Zytologie | orange | yellow |
| Histologie | blue | purple |
| Knochenlehre | grey-green | olive |
| Muskellehre | red | red |
| Atmungssystem | teal | light blue |

Hybrid plants: stem color from source 1, fruit color from source 2.

---

## Save system

- Saved automatically in `localStorage` — persists across app restarts
- **Export/Import** available in Settings (⚙️) — saves as a JSON file
- Clearing browser *cache* does **not** delete saves; clearing *site data / localStorage* does
- Dev mode: fast cooldown toggle in Settings

---

## Project structure

```
index.html        — app shell, PWA manifest link, bottom nav
styles.css        — all UI and game styling
js/
  content.js      — all question/plant/hybrid data
  game.js         — game logic, rendering, state management
sw.js             — service worker (network-first caching)
manifest.json     — PWA manifest
assets/           — images, sounds
scripts/
  serve.js        — local dev server
  run.js          — server + app-window launcher
```

---

## Notes

- UI and content are in German (Heilpraktiker exam material)
- Designed for portrait orientation on mobile; works on desktop too
- This is an active prototype — content and mechanics evolve frequently
