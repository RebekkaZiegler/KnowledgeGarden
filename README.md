# KnowledgeGarden

A browser-based learning RPG for Heilpraktiker exam prep.  
The Alräunchen (tamagotchi) and Taverne (restaurant management) modes share one question engine; every correct answer counts toward mastery across both.

**Exam goal:** Heilpraktiker

---

## Play on your phone (recommended)

The game is a PWA that installs to your home screen and runs like a native app.

**Install (Android Chrome):**
1. Open `https://rebekkaziegler.github.io/KnowledgeGarden` in Chrome
2. Tap the 3-dot menu → *Add to Home Screen*
3. Open the app from the home screen and it runs fullscreen, no browser bar

**Getting updates:**

Once installed, tap **⚙️ → 🔄 Auf neueste Version aktualisieren** inside the app. Wait ~5 minutes after a new release before pressing it (GitHub Pages CDN propagation delay).

If the update button doesn't work, open the URL directly in Chrome → 3-dot menu → *Hard Reload*, or clear cached files in Chrome's site settings.

> ⚠️ **Your save lives in `localStorage`.** Clearing *Cache* is safe. Clearing *Site Data* **will delete your save**. Use **⚙️ → Export** to back up first.

---

## Run locally (desktop)

**Requirements:** Node.js 18+, npm

```bash
git clone https://github.com/RebekkaZiegler/KnowledgeGarden.git
cd KnowledgeGarden
npm install
npm run serve   # → open http://localhost:5173
```

---

## Game modes

Two tabs at the top switch between modes. Question mastery is shared; a question answered correctly in either mode counts toward its spaced-repetition progress.

### 🌱 Alräunchen (tamagotchi)

Raise a magical plant-creature by studying:

- Tap **Frage beantworten** to answer a question and feed your Alräunchen
- Meeting the daily question quota keeps it fed and growing
- After 10 stages, choose to keep it or release it into the wild

### 🍕 Taverne (fantasy tavern management)

Run a medieval tavern:

- **Garden (swipe left):** plant seeds, water plants by answering questions (each correct answer = +1 growth); harvest ripe plants for ingredients
- **Restaurant (center):** open the tavern, serve patrons at tables, answer questions mid-service
- **Cleaning (swipe right):** wash dirty plates and glasses after service

**Raven orders (🪶):** Order seeds, supplies, and items by answering questions. Delivery is instant; answer the question and the items arrive immediately.

---

## Shared question mechanics

Both modes draw from the same question pool and track the same mastery state.

- **Mastery:** a question is mastered once answered correctly on 3 different calendar days
- **Spaced repetition:** unseen questions first, then wrong ones, then unmastered ones
- **Combo streak:** consecutive correct answers in a session give a KP/yield bonus (resets on wrong answer)
- **Chapters (📚):** activate anatomy chapters to add their questions to your pool

---

## Core tavern loop

### 1. Order supplies (🪶 Raven)
- Tap the raven button to open the order screen
- Order seeds, animal products (pizza toppings), and dishware
- Each batch costs one answered question; delivery is immediate

### 2. Grow ingredients (Garden ←)
- Plant seeds in empty garden patches
- Water plants by answering questions (2 correct answers = fully grown)
- Harvest ripe plants to add ingredients to your inventory

### 3. Run the restaurant (Restaurant center)
- Tap **Öffnen** to open the tavern
- Patrons arrive and sit at tables; click a table to serve them
- Patrons have a preferred topping and sometimes a disliked one
- After eating, patrons sometimes order a drink before leaving
- Tap **Last Call** when done, then **Schlafen** to end the day

### 4. Wash dishes (Cleaning →)
- After service, plates and glasses are dirty
- Scrub dirt off items to return them to inventory
- Soap runs out; refill by answering a question (20 charges per refill)

---

## Pizza system

- **Basic pizza** (wheat + tomato + mozzarella) is always available
- Tap 🍕 (Kitchen) to create custom recipes with extra toppings
- Order animal products via the raven to unlock more topping variety
- Up to 4 recipes can be active at once

---

## Patron happiness

| Result | Condition |
|---|---|
| 😊 Very happy | Food matches preference AND drink matches craving |
| 🙂 Happy | Food OR drink matches |
| 😐 Neutral | Served, but nothing matched, or disliked topping present |
| 😞 Sad | Patience ran out before being served |

---

## Trophy room (🏆)

- **Counter:** total questions answered
- **90-day activity heatmap:** shows days you studied
- **Achievement grid:** badges for questions, harvests, streaks, restaurant, memory
- **Chapter progress bars:** per-chapter mastery percentage

---

## Save system

- Saved automatically in `localStorage`
- **Export/Import** in Settings, saves as JSON
- Clearing browser *cache* does **not** delete saves; clearing *site data* does

---

## Project structure

```
index.html       app shell, all HTML screens and mode divs
styles.css       all UI and game styling
js/
  content.js     all questions, plants, label exercises
  game.js        game logic, rendering, state management
sw.js            service worker (cache version controlled)
manifest.json    PWA manifest
assets/          images (pizza toppings, patrons, dishes, garden)
scripts/
  serve.js       local dev server
```

---

## Notes

- UI and content are in German (Heilpraktiker exam material)
- Designed for portrait orientation on mobile; works on desktop too
- First-time players get a tutorial (can be replayed via ⚙️ → Tutorial anzeigen)
