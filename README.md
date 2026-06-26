# KnowledgeGarden

A browser-based learning RPG for Heilpraktiker exam prep.  
You run a fantasy tavern — grow ingredients, cook pizzas, serve guests — and pay for everything with anatomical knowledge.

**Current version:** v2.0 — Fantasy Tavern  
**Exam goal:** Heilpraktiker

---

## Play on your phone (recommended)

The game is a PWA — installs to your home screen and runs like a native app.

**First install:**
1. Open `https://rebekkaziegler.github.io/KnowledgeGarden` in Chrome (Android) or Safari (iOS)
2. **Android Chrome:** tap the 3-dot menu → *Add to Home Screen*
3. **iOS Safari:** tap the Share button → *Add to Home Screen*
4. Open the app from the home screen — it runs fullscreen, no browser bar

**Getting updates:**

Once installed, tap **⚙️ → 🔄 Auf neueste Version aktualisieren** inside the app. Wait ~5 minutes after a new release before pressing it (GitHub Pages CDN propagation delay).

If the update button doesn't work:
- **Android Chrome:** open the URL in Chrome → 3-dot menu → *Hard Reload*, or clear cached files only in browser settings
- **iOS Safari:** hold the reload button → *Reload Without Content Blockers*, or close all Safari tabs and reopen
- **Quickest:** delete the home screen icon, open the URL fresh in the browser, re-add to home screen

> ⚠️ **Your save lives in `localStorage`.** Clearing *Cache* is safe. Clearing *Site Data / Website Data* **will delete your save**. Use **⚙️ → Export** to back up first.

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

## UI layout

Three screens, swiped left/right:

| ← | Center | → |
|---|---|---|
| 🌱 Garden | 🍽️ Restaurant (start here) | 🧹 Cleaning |

**Bottom nav:** 📚 Chapters · 🏆 Trophy room · 🃏 Memory/Labels · ⚙️ Settings

---

## Core game loop

### 1. Order supplies (🪶 Raven)
- Tap the raven button to open the order screen
- Order seeds, animal products (pizza toppings), and dishware
- Each item batch costs one answered question
- Delivery arrives the next in-game day (after sleeping)

### 2. Grow ingredients (Garden ←)
- Plant seeds in empty garden patches (uses seed inventory)
- Plants take 2 days to grow; water them daily by answering questions
- Harvest ripe plants to add ingredients to your inventory (wheat, tomato, etc.)

### 3. Run the restaurant (Restaurant center)
- Tap **Öffnen** to open the tavern
- Patrons arrive and sit at tables; click a table to serve them
- The kitchen auto-makes a basic pizza (wheat + tomato + mozzarella) — no recipe needed
- Patrons have a preferred pizza topping and a disliked topping; happiness depends on what they get
- After eating, patrons sometimes order a second drink before leaving
- Tap **Last Call** when you're done, then **Schlafen** to end the day

### 4. Wash dishes (Cleaning →)
- After service, plates and glasses are dirty
- Swipe right to the cleaning screen; scrub dirt off items to return them to inventory
- Soap runs out — refill by answering a question (20 charges per refill)

### 5. Advance knowledge (📚 Chapters)
- Activate anatomy chapters to unlock question pools
- Answer questions to progress toward mastery
- Mastered chapters show in the trophy room

---

## Pizza system

- **Basic pizza** (wheat + tomato + mozzarella) is always available — no recipe needed
- Tap 🍕 (Kitchen) to create custom pizza recipes with extra toppings
- Tap a topping in the palette to select it (yellow outline), then tap the pizza to place it
- Active recipes are offered to patrons; up to 4 recipes can be active at once
- Order animal products via the raven to unlock more topping variety

---

## Patron happiness

| Result | Condition |
|---|---|
| 😊 Very happy | Food matches preference AND drink matches craving |
| 🙂 Happy | Food OR drink matches |
| 😐 Neutral | Served, but nothing matched — or disliked topping present |
| 😞 Sad | Patience ran out before being served |

- Patrons have a **disliked topping** (50% chance) — serving it lowers happiness by one level (never below neutral)
- Patrons pre-order drinks while waiting (up to 2, optional)
- After eating, 35% chance to linger and order one more drink

---

## Trophy room (🏆)

- **Counter:** total questions answered
- **90-day activity heatmap** — shows days you studied (like GitHub contributions)
- **Achievement grid** — 20 badges for questions, harvests, streaks, restaurant, memory
- **Chapter progress bars** — per-chapter mastery percentage

---

## Raven orders

| Category | Per question |
|---|---|
| Animal products (mozzarella, salami, ham, anchovies, eggs) | 20× |
| Dishware (plates, wine glasses, beer glasses) | 15× |
| Seeds | 1 bag |

Crop yields per harvest: wheat/tomato → 25, all others → 20.

---

## Save system

- Saved automatically in `localStorage`
- **Export/Import** in Settings — saves as JSON
- Clearing browser *cache* does **not** delete saves; clearing *site data* does

---

## Project structure

```
index.html        — app shell, all HTML screens
styles.css        — all UI and game styling
js/
  content.js      — all questions, plants, label exercises
  game.js         — game logic, rendering, state management
sw.js             — service worker (cache version controlled)
manifest.json     — PWA manifest (raven icon)
assets/           — images (pizza toppings, patrons, dishes, garden)
scripts/
  serve.js        — local dev server
```

---

## Notes

- UI and content are in German (Heilpraktiker exam material)
- Designed for portrait orientation on mobile; works on desktop too
- First-time players get a tutorial (can be replayed via ⚙️ → Tutorial anzeigen)
- This is an active prototype — content and mechanics evolve frequently
