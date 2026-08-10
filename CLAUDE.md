# KnowledgeGarden — Rules for Claude

All rules for adding plants and chapters are in [`docs/ADDING_A_CHAPTER.md`](docs/ADDING_A_CHAPTER.md).

Key rules to always uphold:
- **Teach only what you test, test only what you taught** — every `harvestQuestion` and `phase4Question` needs a `learningCard` (see "Lernkarten" in `ADDING_A_CHAPTER.md`) that teaches the exact fact the question tests, and vice versa. (The older `phase1`/`solution` fields described in some docs are dead code — `makeDetailedPlant()` never stores them and the engine never reads them. Don't author them; use `learningCard` instead.)
- **Max 3 sentences per `reveal`/`whyWrong`/`explanation` text** — hard limit for mobile readability.
- **Split, never truncate** — if a topic has too much content for 3 sentences, split it into two plants. Never shorten a teaching text and leave the questions that depended on the removed content.
- **Every `harvestQuestion` must have an `explanation` field.**
