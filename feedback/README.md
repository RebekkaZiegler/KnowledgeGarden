# Alräunchen-Feedback

An offline "talk to your Tamagotchi" loop. The app itself never calls a
live AI — it's a fully static, offline-first PWA with no backend, and
there's no legitimate way for client-side JS to hold an API key safely or
to authenticate as a personal ChatGPT/Claude subscription (subscription
logins and API access are separate products with separate billing; see the
chat history for KnowledgeGarden if you want the full reasoning). Instead,
a human periodically asks Claude (in an ordinary Claude Code session — not
a feature of the running game) to read what was exported and write a
response.

## The loop

1. **Export** — in the Alräunchen tab, tap **💬 Mit Alräunchen sprechen**,
   then **📤 Heutige Fragen exportieren**. This downloads
   `alraeunchen-feedback-YYYY-MM-DD.json`.
2. **Drop it in `feedback/inbox/`** (this folder) and commit/push it, or
   just hand the file to Claude directly in a session.
3. **Ask Claude to look at it** — e.g. "read today's file in
   feedback/inbox/ and write feedback." Claude reads the inbox file, looks
   for what was wrong (and what's going well), and writes a response to
   `feedback/outbox/latest.json` in the schema below. Push if you want the
   game to pick it up.
4. **Back in the app**, the same 💬 screen fetches `feedback/outbox/
   latest.json` live (it's just a static file — no caching trick needed,
   the service worker already fetches same-origin files network-first) and
   shows it as a short series of chat bubbles.

## Inbox schema (written by the app's `exportTodayFeedback()`, `js/game.js`)

```json
{
  "datum": "2026-08-03",
  "anzahlBeantwortet": 12,
  "anzahlRichtig": 9,
  "fragen": [
    {
      "kapitel": "Pharmakologie",
      "frage": "Was bewirkt Adrenalin an Beta-2-Rezeptoren?",
      "richtig": false,
      "meineAntwort": "Vasokonstriktion",
      "korrekteAntwort": "Bronchodilatation",
      "erklaerung": "Beta-2-Rezeptoren sitzen u.a. an der glatten Bronchialmuskulatur..."
    }
  ]
}
```

## Outbox schema (written by Claude, read by `renderTamaChat()`, `js/game.js`)

All fields optional except that `reviewItems` (if present) should mainly
cover the WRONG entries from the inbox file — that's where new value
actually lives, since `erklaerung` is already shown once at answer time and
just repeating it verbatim isn't the point. `zusatz` is the one field meant
to add something genuinely new: a different phrasing, a mnemonic, a mental
model — the kind of thing a canned static explanation can't offer.

```json
{
  "datum": "2026-08-03",
  "greeting": "Short, in-character opening line (optional — the game picks a random one from TAMA_DIALOGUE.chat if omitted)",
  "summary": "1-3 sentence overall recap of the day",
  "highlights": ["Short bullet points — chapters progressing well, streaks, etc."],
  "reviewItems": [
    {
      "frage": "...",
      "meineAntwort": "...",
      "korrekteAntwort": "...",
      "erklaerung": "the original explanation, for context",
      "zusatz": "an alternative explanation, mnemonic, or angle Claude adds"
    }
  ]
}
```

If nothing was wrong today, skip `reviewItems` entirely and just write a
congratulatory `summary`/`highlights` recap of what was covered.
