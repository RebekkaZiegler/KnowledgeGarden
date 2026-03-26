# Neues Kapitel hinzufügen

Schritt-für-Schritt-Anleitung für das Hinzufügen eines neuen Studienbriefs / Kapitels.
Alles spielt sich ausschliesslich in `js/content.js` ab — kein anderer Code muss angefasst werden.

---

## Grundregel: Vollständigkeit

**Ein Kapitel wird nur hinzugefügt, wenn es vollständig ist.**

Das bedeutet:
- Jedes prüfungsrelevante Thema des Studienbriefs hat eine eigene Pflanze
- Keine Platzhalter, keine "TODO"-Fragen, keine halbleeren Pflanzen
- Alle Pflanzen haben vollständige `phase1`, `harvestQuestions` und `cleaningQuestions`
- Die Phase-1-Regel gilt: alles, was abgefragt wird, muss vorher erklärt worden sein

Lieber ein Kapitel erst später einfügen, wenn es wirklich fertig ist.

---

## Übersicht: Was muss erstellt werden?

| Was | Wo in content.js |
|---|---|
| Pflanzen-Array `KAPITELNAME_XXXX_PLANTS` | Neuer const-Block vor `PACK_CONTENT` |
| Bett-Eintrag in `PACK_CONTENT.beds` | Am Ende der `beds`-Liste, vor dem `hybrid`-Eintrag |

---

## Schritt 1 — Pflanzen-Array anlegen

Direkt vor dem `PACK_CONTENT`-Block (aktuell Zeile ~2856) einen neuen Block einfügen:

```javascript
const KAPITELNAME_XXXX_PLANTS = [
  makeDetailedPlant({ ... }),
  makeDetailedPlant({ ... }),
  // ...
];
```

---

## Schritt 2 — Pflanzendefinition: Pflichtfelder

Jede Pflanze hat diese Struktur:

```javascript
makeDetailedPlant({
  id: "eindeutige_id",          // snake_case, einmalig in der ganzen Datei
  title: "Titel der Pflanze",   // wird im Spiel angezeigt
  contextHint: "Studienbrief XXXX Titel des Kapitels",

  phase1: {
    soil:  { statement: "...", answer: true/false, solution: "..." },
    seed:  { statement: "...", answer: true/false, solution: "..." },
    water: { statement: "...", answer: true/false, solution: "..." }
  },

  harvestQuestions: [ ... ],   // mind. 3, max. ~8
  cleaningQuestions: [ ... ]   // mind. 2, für Restaurant
})
```

`bossQuestions` und `phase2` sind optional — werden automatisch mit Standardwerten befüllt wenn weggelassen.

---

## Schritt 3 — Phase 1: Die drei Lernschritte

Phase 1 ist der einzige Ort, wo neues Wissen eingeführt wird.

**Regel: Alles, was in `harvestQuestions` oder `cleaningQuestions` abgefragt wird, muss in mindestens einem der drei `solution`-Felder erklärt worden sein.**

```javascript
soil: {
  statement: "Aussage, die der Spieler als wahr oder falsch einordnen soll.",
  answer: true,   // oder false
  solution: "Erklärung, die VOR der Frage angezeigt wird. Vollständige Sätze, kein Pronomen ohne Bezug. 2–4 Sätze reichen."
}
```

- `statement` = die True/False-Frage
- `answer` = die korrekte Antwort
- `solution` = Lerntext, der zuerst gezeigt wird, dann als Erklärung nach der Antwort

**Gute `solution`:** Eigenständig lesbar, keine Abkürzungen ohne Erklärung, deckt den Inhalt ab, der später getestet wird.

---

## Schritt 4 — `harvestQuestions`

Mindestens 3, typischerweise 5–8 Fragen. Zwei Typen:

### True/False
```javascript
{
  id: "xxx_h1",
  type: "true_false",
  statement: "Aussage, die bewertet werden soll.",
  answer: true,
  explanation: "Erklärung nach der Antwort — 1–2 Sätze mit substanziellem Inhalt."
}
```

### Multiple Choice (1 richtige Antwort)
```javascript
{
  id: "xxx_h2",
  type: "mc",
  question: "Frage?",
  options: [
    { text: "Richtige Antwort", correct: true },
    { text: "Falsche Antwort A", correct: false },
    { text: "Falsche Antwort B", correct: false },
    { text: "Falsche Antwort C", correct: false }
  ],
  explanation: "Erklärung nach der Antwort."
}
```

**ID-Konvention:** `{pflanze_id}_{h/b/mc}{nummer}` — z.B. `at_ü_h1`, `ko_w_mc2`

---

## Schritt 5 — `cleaningQuestions`

Für das Restaurant. Mehrere Antworten können korrekt sein.

```javascript
{
  id: "xxx_mc1",
  type: "mc",
  question: "Welche Aussagen sind korrekt?",
  options: [
    { text: "Richtig A", correct: true },
    { text: "Falsch B", correct: false },
    { text: "Richtig C", correct: true },
    { text: "Falsch D", correct: false }
  ]
}
```

Mindestens 2 Fragen. `explanation` ist optional hier.

---

## Schritt 6 — Bett in `PACK_CONTENT` registrieren

Am Ende der `beds`-Liste, **vor** dem `hybrid`-Eintrag:

```javascript
{
  id: "kapitelname_XXXX",        // snake_case, gleiche Konvention wie bisherige IDs
  title: "Kapitelname (XXXX)",   // wie es im Regal angezeigt wird
  plants: KAPITELNAME_XXXX_PLANTS
},
```

---

## Schritt 7 — Qualitätsprüfung (Pflicht)

Vor dem Commit folgendes manuell durchgehen:

- [ ] Alle `id`-Felder sind einmalig (kein Duplikat in der ganzen Datei)
- [ ] Jede `harvestQuestion` und `cleaningQuestion` — ist der abgefragte Fakt in einer `solution` von Phase 1 eingeführt?
- [ ] Jede `solution` ist eigenständig lesbar (kein "Es", "Sie" ohne klaren Bezug im selben Satz)
- [ ] Alle `options`-Arrays haben genau 4 Einträge
- [ ] Alle `harvestQuestion`-MC-Arrays haben genau 1 `correct: true`
- [ ] Mindestens 3 `harvestQuestions`, mindestens 2 `cleaningQuestions` pro Pflanze

---

## Vollständiges Minimalbeispiel

```javascript
const BEISPIEL_1099_PLANTS = [
  makeDetailedPlant({
    id: "beispiel_thema",
    title: "Beispiel-Thema",
    contextHint: "Studienbrief 1099 Beispiel-Kapitel",
    phase1: {
      soil: {
        statement: "Das Beispiel-Thema ist ein eigenständiges Teilgebiet mit definierten Strukturen.",
        answer: true,
        solution: "Das Beispiel-Thema umfasst die Strukturen A, B und C. A ist zuständig für X, B für Y. Diese Strukturen wirken zusammen, um Z zu ermöglichen."
      },
      seed: {
        statement: "Struktur A hat keine funktionale Bedeutung im Beispiel-Thema.",
        answer: false,
        solution: "Struktur A ist verantwortlich für X und damit unverzichtbar. Ohne A kann Z nicht stattfinden. Struktur A besteht aus den Untereinheiten A1 und A2, die sich gegenseitig regulieren."
      },
      water: {
        statement: "Die Kombination von A und B ist notwendig für den Prozess Z.",
        answer: true,
        solution: "A und B kooperieren bei Prozess Z: A liefert den Ausgangsstoff, B katalysiert die Umwandlung. Klinische Relevanz: Ein Ausfall von B führt zu Erkrankung M."
      }
    },
    harvestQuestions: [
      {
        id: "bt_h1",
        type: "mc",
        question: "Welche Funktion hat Struktur A?",
        options: [
          { text: "X ermöglichen", correct: true },
          { text: "Y blockieren", correct: false },
          { text: "Z ersetzen", correct: false },
          { text: "Keine Funktion", correct: false }
        ],
        explanation: "Struktur A ist für X verantwortlich und damit Voraussetzung für Z."
      },
      {
        id: "bt_h2",
        type: "true_false",
        statement: "Ein Ausfall von B führt zur Erkrankung M.",
        answer: true,
        explanation: "B katalysiert die Umwandlung in Prozess Z. Fehlt B, stockt Z und es entsteht Erkrankung M."
      }
    ],
    cleaningQuestions: [
      {
        id: "bt_mc1",
        type: "mc",
        question: "Welche Aussagen zu Struktur A und B sind korrekt?",
        options: [
          { text: "A liefert den Ausgangsstoff für Prozess Z", correct: true },
          { text: "B ist bedeutungslos", correct: false },
          { text: "A und B kooperieren bei Prozess Z", correct: true },
          { text: "A und B sind identisch", correct: false }
        ]
      }
    ]
  })
];
```

---

## Hinweise

- **Reihenfolge im Spiel:** Betten werden in der Reihenfolge freigeschaltet, in der sie in `PACK_CONTENT.beds` stehen. Das erste Bett ist beim Start bereits freigeschaltet, alle weiteren müssen durch den Spieler über den Katalog aktiviert werden.
- **Hybride:** Wenn das neue Kapitel als Quelle für eine hybride Pflanze dient, muss `HEILPRAKTIKER_HYBRIDS` entsprechend ergänzt werden (eigenes Thema, hier nicht weiter dokumentiert).
- **Speichersystem:** Neue Betten werden automatisch initialisiert — kein Migrations-Code nötig, solange nur neue Betten/Pflanzen hinzukommen und keine bestehenden IDs geändert werden.
