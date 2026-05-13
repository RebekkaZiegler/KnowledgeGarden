# KnowledgeGarden — Rules for Claude

All rules for adding plants and chapters are in [`docs/ADDING_A_CHAPTER.md`](docs/ADDING_A_CHAPTER.md).

Key rules to always uphold:
- **Teach only what you test, test only what you taught** — every `harvestQuestion` must test content that was explained in that plant's `solution` texts, and vice versa.
- **Max 3 sentences per `solution` text** — hard limit for mobile readability.
- **Split, never truncate** — if a topic has too much content for 3 sentences, split it into two plants. Never shorten a `solution` and leave the questions that depended on the removed content.
- **Every `harvestQuestion` must have an `explanation` field.**
