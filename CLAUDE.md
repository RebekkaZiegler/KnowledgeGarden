# KnowledgeGarden — Rules for Claude

## Content rules for plants

### The core rule: teach only what you test, test only what you taught

Every `solution` text in a plant's `phase1` (soil / seed / water) must contain **exactly the information** that the plant's `harvestQuestions` will later test. Nothing more, nothing less.

- If a `harvestQuestion` asks about topic X → topic X must appear in a `solution` text.
- If a `solution` text explains topic Y → there must be a `harvestQuestion` that tests topic Y.
- Never shorten a `solution` text and leave the corresponding `harvestQuestion` in place — the user would be quizzed on content they were never shown.

### Solution text length

Each `solution` text (soil / seed / water) must be **at most 3 sentences**. This is a hard limit for mobile readability.

### How to handle dense content

If a topic has too much content for 3 sentences + matching questions, **split it into two plants**, each covering a focused sub-topic:
- Plant A: sub-topic 1 — 3 short solution texts + matching harvestQuestions
- Plant B: sub-topic 2 — 3 short solution texts + matching harvestQuestions

Do NOT squeeze 6 sentences into one solution text. Do NOT shorten a solution and keep the questions that relied on the removed content.

### Question rules

- `harvestQuestions`: single-fact, exactly 1 correct answer, tests what was taught in `solution` texts of THIS plant only.
- `phase4Questions`: synthesis / multi-correct, restaurant only, may reference knowledge across the whole bed.
- Every `harvestQuestion` must have an `explanation` field.
- Every `phase4Question` must have an `explanation` field (or at minimum an implicit explanation via the correct answer).

### Plant structure reference

```js
makeDetailedPlant({
  id: "unique_snake_case_id",
  title: "Short Topic Title",
  phase1: {
    soil:  { statement: "True/false claim.", answer: true,  solution: "Max 3 sentences explaining WHY." },
    seed:  { statement: "True/false claim.", answer: false, solution: "Max 3 sentences explaining WHY." },
    water: { statement: "True/false claim.", answer: true,  solution: "Max 3 sentences explaining WHY." },
  },
  harvestQuestions: [
    // 4–6 questions, each testing ONLY content covered in the solution texts above
    { id: "id_h1", type: "mc", question: "...", options: [...], explanation: "..." },
    { id: "id_h2", type: "true_false", statement: "...", answer: true, explanation: "..." },
  ],
  phase4Questions: [
    // Optional synthesis questions for the restaurant phase
  ],
})
```
