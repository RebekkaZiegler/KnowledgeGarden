# KnowledgeGarden

KnowledgeGarden is a browser-based learning RPG prototype.
You learn topics by growing plants, test yourself through harvest questions, and unlock more content via the Restaurant.

Current version: **0.4** — Heilpraktiker Pack

## Requirements

- Node.js 18+ (recommended)
- npm (comes with Node.js)
- Windows/macOS/Linux

## Download / Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/RebekkaZiegler/KnowledgeGarden.git
   cd KnowledgeGarden
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Start the game

### Option A: App-like window (recommended)
Starts local server and tries to open an app window automatically.

```bash
npm run run
```

### Option B: Local server only
Starts local server without forced app-window behavior.

```bash
npm run serve
```

Then open:
`http://localhost:5173`

## Useful commands

- Syntax check:
  ```bash
  npm run check
  ```

## UI layout

The game uses a two-panel layout:

- **Left panel** (always visible): player stats, heal button, selected plant info and questions
- **Garden room** (center): topic shelves, each showing growing plants in pots — all topics visible at once
- **Bottom nav bar**: Pflanzen (catalog), Restaurant, Labor (lab), Trophäen, Einstellungen (settings)

No movement or world navigation — everything is accessible directly from the garden view.

## Core game loop

1. Click an empty pot on a topic shelf to plant a seed (opens filtered catalog).
2. Grow the plant through Phase 1 (3 setup steps with lesson + question) and Phase 2 (watering/trimming/fertilizing, each with a question).
3. Once all Phase 2 questions are learned and the cooldown expires, harvest the plant.
4. Harvest requires **all questions correct** — wrong answers go back to Phase 2 proportionally.
5. Harvested plants reward fruits (×2 per correct answer).
6. Open the Restaurant — answer questions to unlock new cooks, ingredients, and upgrades; spend fruits on refills.
7. Synthesize hybrid plants in the Lab once both source plants are harvested.

## Core mechanics

### 1) Plant lifecycle

- **Phase 1 (Setup):**
  - Steps: Soil → Seed → First watering
  - Each step shows lesson text first, then a true/false question.
  - Retry immediately on wrong answer — no progress until correct.
- **Phase 2 (Practice):**
  - 3 actions: water (Wässern), trim (Beschneiden), fertilize (Düngen)
  - Each action asks a harvest question; correct = learned, wrong = stays in queue
  - Cooldown between actions (5 min normal / 10 s dev mode)
  - 3 wrong answers on one question → plant withers
  - All questions learned → plant ready to harvest
- **Harvest:**
  - All harvest questions asked once in random order
  - All must be answered correctly — any wrong → only those questions reset to Phase 2
  - Success: fruits earned, plant removed from bed, `harvestedOnce` flagged permanently

### 2) Plant colors

Each topic has a distinct color scheme (stem + fruit):
- Zytologie: orange
- Histologie: blue/purple
- Knochenlehre: grey-green
- Muskellehre: red
- Atmungssystem: teal

Hybrid plants inherit stem color from source 1 and fruit color from source 2.

### 3) Restaurant

- Real-time background minigame: cooks serve customers automatically
- Customers arrive with a patience bar; dirt accumulates over time
- Ingredient stock depletes → refill costs a question answer (+ optional fruits)
- New cooks, ingredients, and a cleaner unlockable via questions + fruits
- Question priority: unseen first → wrong answers → repetition once all mastered
- Trophy + new chapter recommendation when all questions are mastered

### 4) Lab / Hybrids

- Unlocked after harvesting plants from 2 different topic beds
- Each hybrid requires 2 specific source plants to be harvested
- Lab shows ✓/✗ status per required plant; locked hybrids show a hint button
- Synthesis costs 2 fruits; once discovered, replanting is free

### 5) Save system

- Local save via browser storage (`localStorage`)
- Export/Import save file (JSON) available in settings
- Dev mode: fast cooldown toggle in settings

## Controls

- Click a pot to select a plant or add a new one
- Click action buttons (💧 ✂️ 🌿 🧪) in the left panel or above the selected pot
- Bottom nav bar for Katalog / Restaurant / Labor / Trophäen / Einstellungen
- Esc closes modals

## Project structure

- `index.html` — app shell
- `styles.css` — UI/game styling
- `js/content.js` — content pack data (questions, plants, hybrids, label exercises)
- `js/game.js` — core game logic and UI rendering
- `scripts/serve.js` — static local server
- `scripts/run.js` — local server + app-window launcher
- `docs/` — project overview, playtest checklist, ideas

## Notes

- This is an MVP/prototype under active iteration.
- UI text and content is German by design (Heilpraktiker learning content).
- If a push fails with auth issues, ensure the correct GitHub account/credentials are used.
