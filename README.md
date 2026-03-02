# KnowledgeGarden

KnowledgeGarden is a browser-based learning RPG prototype.  
You learn topics by growing plants, test yourself through harvest/combat questions, and unlock more content over time.

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

## Core game loop

1. Select/activate a bed from the Seed area.
2. Plant seeds into active beds.
3. Grow plants through learning phases.
4. Harvest plants to gain fruits.
5. Spend fruits in combat to unlock progression.
6. Use lab/combinations as features unlock.

## Core mechanics

### 1) Plant lifecycle

- **Phase 1 (Setup):**
  - Steps: Soil -> Seed -> First watering
  - Each step uses learning content + a true/false check.
- **Phase 2 (Practice):**
  - Action-based learning cycles (question-driven)
  - Cooldown between actions
  - Plant growth visualization updates over time
- **Harvest:**
  - Unlocked once learning requirements are met
  - Correct answers reward fruits
  - Harvested state is tracked for progression

### 2) Bed and seed states

Seed entries are color-coded to show progression:

- **Red:** not harvested yet
- **Yellow:** currently planted in a bed
- **Green:** harvested at least once

There is an active-bed limit, and unlocked slots increase with progression.

### 3) Combat and boss flow

- Combat consumes fruits as a resource.
- Correct answers advance combat progress.
- Boss logic unlocks after normal enemy progression in a bed.
- Defeating bosses unlocks additional bed capacity/progression.

### 4) Save system

- Local save via browser storage.
- Export/Import save file (JSON) supported in settings.

## Controls / UI

- Move in world: `WASD` or arrow keys
- Interact in world zones: `E`
- Open/close settings panel: `Esc`
- Plant interactions are available by clicking plants in the bed view/world.

## Project structure

- `index.html` - app shell
- `styles.css` - UI/game styling
- `js/content.js` - content pack data (questions/plants)
- `js/game.js` - core game logic and UI rendering
- `js/world.js` - Phaser world scene and room interactions
- `scripts/serve.js` - static local server
- `scripts/run.js` - local server + app-window launcher

## Notes

- This is an MVP/prototype under active iteration.
- Some UI text/content is German by design.
- If a push fails with auth issues, ensure the correct GitHub account/credentials are used.
