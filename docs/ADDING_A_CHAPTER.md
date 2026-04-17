# Neues Kapitel hinzufügen

Schritt-für-Schritt-Anleitung für das Hinzufügen eines neuen Studienbriefs / Kapitels.
Alles spielt sich ausschliesslich in `js/content.js` ab — kein anderer Code muss angefasst werden.

---

## Spielmechanik: Pflanzphase und Restaurant

Das Spiel hat zwei Hauptphasen, die für jedes Bett (= Kapitel) nacheinander freigeschaltet werden:

### Pflanzphase (Phase 1–3)
Jede Pflanze durchläuft einen Lebenszyklus:
- **Phase 1** — Lernphase: Der Spieler liest `solution`-Texte und beantwortet True/False-Aussagen (`statement`).
- **Phase 2** — Wachstumsphase: Die `harvestQuestions` werden als Quizfragen gestellt. Richtige Antworten lassen die Pflanze wachsen; falsche blockieren sie.
- **Phase 3** — Ernte: Die Pflanze wird geerntet (`harvestedOnce = true`). Danach beginnt ein neuer Wachstumszyklus.

### Restaurant (Phase 4)
Das Restaurant wird freigeschaltet, sobald **alle Pflanzen eines Betts mindestens einmal geerntet wurden**.

Im Restaurant betreibt der Spieler eine Pizzeria: Kunden kommen herein, werden bedient, und zwischendurch erscheinen Quizfragen auf dem Bildschirm. Richtige Antworten bringen Belohnungen (neue Zutaten, Köche, Tische).

**Welche Fragen erscheinen im Restaurant?** Alle `harvestQuestions` UND alle `phase4Questions` des Betts — in zufälliger Reihenfolge, zuerst ungesehene, dann falsch beantwortete.

### Konsequenzen für die Fragengestaltung

| Fragetyp | Wo verwendet | Zweck |
|---|---|---|
| `harvestQuestions` | Phase 2 (Pflanzwachstum) + Restaurant | Einzelfakten testen; jeweils genau 1 richtige Antwort |
| `phase4Questions` | Nur Restaurant | Synthese, Zusammenhänge, Abgrenzungen; mehrere richtige Antworten möglich |

`phase4Questions` erscheinen nie während der Pflanzphase — sie setzen voraus, dass der Spieler das Thema bereits durch die Ernte kennt.

---

## Grundregel: Vollständigkeit

**Ein Kapitel wird nur hinzugefügt, wenn es vollständig ist.**

Das bedeutet:
- Jedes prüfungsrelevante Thema des Studienbriefs hat eine eigene Pflanze
- Keine Platzhalter, keine "TODO"-Fragen, keine halbleeren Pflanzen
- Alle Pflanzen haben vollständige `phase1`, `harvestQuestions` und `phase4Questions`
- Die Phase-1-Regel gilt: alles, was abgefragt wird, muss vorher erklärt worden sein

Lieber ein Kapitel erst später einfügen, wenn es wirklich fertig ist.

---

## Goldene Regel: Vollständige Wissensabdeckung

**Nach dem Durchspielen aller Fragen eines Kapitels muss der Spieler das Thema prüfungsreif beherrschen.**

Das ist die wichtigste Anforderung. Sie schlägt alle anderen Regeln.

Vor dem Schreiben der Fragen: **Lies das Kapitel im Studienbrief komplett durch und erstelle eine Liste aller prüfungsrelevanten Fakten, Konzepte und Zusammenhänge.** Jeder Punkt auf dieser Liste muss am Ende in mindestens einer Frage vorkommen.

Konkret heißt das:
- Jede Definition muss abgefragt werden
- Jede Funktion / Aufgabe einer Struktur muss abgefragt werden
- Jede klinische Relevanz (Erkrankungen, Ausfälle, Folgen) muss abgefragt werden
- Zusammenhänge zwischen Strukturen (A reguliert B, X ermöglicht Y) müssen abgefragt werden
- Nichts darf nur in `solution` erklärt, aber nie getestet werden

**Minimumzahlen sind keine Zielzahlen.** Wenn ein Thema 10 wichtige Fakten hat, braucht die Pflanze mindestens 10 Fragen — egal was das Minimum sagt.

---

## Übersicht: Was muss erstellt werden?

| Was | Wo in content.js |
|---|---|
| Pflanzen-Array `KAPITELNAME_XXXX_PLANTS` | Neuer const-Block vor `PACK_CONTENT` |
| Bett-Eintrag in `PACK_CONTENT.beds` | Am Ende der `beds`-Liste, vor dem `hybrid`-Eintrag |

---

## ⚠️ EISERNE REGEL: Nie bestehende Pflanzen als vollständig annehmen

**Bestehende Pflanzen bedeuten NICHT, dass ein Kapitel vollständig abgedeckt ist.**

Egal wie viele Pflanzen bereits existieren — sie wurden möglicherweise ohne vollständige PDF-Lektüre geschrieben. Immer zuerst das PDF komplett lesen, dann gegen die bestehenden Pflanzen kreuzen.

**Verboten:** Ein Kapitel mit bestehenden Pflanzen als „fertig" behandeln, ohne vorher Schritt B–C (PDF lesen + Lücken prüfen) durchgeführt zu haben.

---

## Bestehendes Kapitel erweitern (Lückenanalyse)

Wenn ein Kapitel bereits Pflanzen hat, aber noch nicht vollständig abgedeckt ist, gelten andere Schritte als beim Neuanlegen. **Kein neues Array, kein neuer Bett-Eintrag** — nur fehlende Pflanzen in das bestehende Array einfügen.

### Schritt A — Bestehende Pflanzen lesen

Abschnitt `KAPITELNAME_XXXX_PLANTS` in `content.js` lesen. Alle vorhandenen Pflanzen-IDs und ihre Themen auflisten.

### Schritt B — PDF in Chunks lesen (max. 20 Seiten pro Aufruf)

Das PDF in Blöcken lesen: `pages: "1-20"`, dann `"21-40"`, dann `"41-57"` usw. Dabei alle prüfungsrelevanten Themen, Strukturen, Funktionen und klinischen Fakten notieren.

### Schritt C — Lücken identifizieren

Bestehende Pflanzentopics gegen die PDF-Themen kreuzen. Für jede Lücke notieren: Welches Thema fehlt? Welche Fakten enthält es?

Wenn keine Lücken → fertig, kein Commit nötig.

### Schritt D — Neue Pflanzen schreiben

Neue Pflanzen zuerst in `Input/plants_XXXX_new.js` schreiben (als Staging-Datei), dann prüfen, dann in `content.js` einbauen.

### Schritt E — In content.js einfügen

Mit dem Edit-Tool: das Ende des bestehenden Arrays suchen — das letzte `})` vor dem `];` — und dort einfügen. Das Muster ist:

```
    ]           ← Ende phase4Questions des letzten bestehenden Plants
  })            ← Ende makeDetailedPlant
                ← Leerzeile
];              ← Ende des Arrays
```

ersetzen durch:

```
    ]
  }),           ← Komma hinzufügen

  makeDetailedPlant({ ... }),   ← neue Pflanze(n)

  makeDetailedPlant({ ... })    ← letzte neue Pflanze ohne Komma

];
```

### Schritt F — Validieren und committen

```bash
node --check "c:/Users/RebekkaZiegler/Desktop/KnowledgeGarden/js/content.js"
```

Commit-Nachricht: `add Studienbrief XXXX (Titel): N neue Pflanzen für Thema1 und Thema2`

---

## ⚠️ EISERNE REGEL: Kein einziges Plant ohne vollständige PDF-Lektüre

**Bevor eine einzige Pflanze geschrieben wird, muss das gesamte PDF gelesen worden sein — Seite für Seite, in Chunks von max. 20 Seiten.**

Pflanzen, die ohne vorherige vollständige PDF-Lektüre geschrieben wurden, sind per Definition unvollständig. Es ist nicht möglich, zuverlässig zu wissen, was fehlt, ohne das Original gelesen zu haben.

Keine Ausnahmen. Kein "ich kenne das Thema grob". Kein "8 Pflanzen sollten reichen".

---

## Schritt 0 — Fakten-Liste erstellen (Pflicht)

Bevor eine einzige Zeile Code geschrieben wird: **Lies den Studienbrief komplett durch und schreibe alle prüfungsrelevanten Fakten, Funktionen, Definitionen und klinischen Zusammenhänge auf.**

Diese Liste ist die Grundlage für alles Weitere. Sie wird in Schritt 7 (Coverage-Check) direkt gegen die fertigen Fragen geprüft.

---

## Schritt 1 — Pflanzen-Array anlegen

Direkt vor dem `PACK_CONTENT`-Block (aktuell Zeile ~3906) einen neuen Block einfügen:

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

  harvestQuestions: [ ... ],   // so viele wie nötig, damit jeder Fakt aus phase1 mindestens einmal abgefragt wird
  phase4Questions: [ ... ]     // so viele wie nötig, damit alle wichtigen Zusammenhänge getestet werden
})
```

`phase2` ist optional — wird automatisch mit Standardwerten befüllt wenn weggelassen.

---

## Schritt 3 — Phase 1: Die drei Lernschritte

Phase 1 ist der einzige Ort, wo neues Wissen eingeführt wird.

**Regel: Alles, was in `harvestQuestions` oder `phase4Questions` abgefragt wird, muss in mindestens einem der drei `solution`-Felder erklärt worden sein.**

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

**Tipp für Vollständigkeit:** Schreib zuerst alle Fragen (Schritte 4+5), dann schau, welche Fakten in `solution` noch fehlen — und ergänze sie.

---

## Schritt 4 — `harvestQuestions`

**Schreib so viele Fragen, bis jeder prüfungsrelevante Fakt aus Phase 1 mindestens einmal abgefragt wurde.** Die Anzahl ergibt sich aus dem Inhalt — es gibt kein vorgegebenes Minimum oder Ziel.

Jede einzelne Frage muss einen konkreten Fakt testen, der ohne diese Frage nicht abgedeckt wäre. Keine Wiederholungen desselben Fakts in anderen Worten.

Zwei Typen:

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

### Multiple Choice (genau 1 richtige Antwort)
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

## Schritt 5 — `phase4Questions`

Für das Restaurant. **Schreib so viele Fragen, bis alle wichtigen Zusammenhänge und Abgrenzungen des Themas getestet sind.** Die Anzahl ergibt sich aus dem Inhalt.

Phase-4-Fragen sind **Synthese-Fragen**: Sie testen nicht einzelne Fakten (das machen `harvestQuestions`), sondern Zusammenhänge, Abgrenzungen und das Gesamtbild. Mehrere Antworten können korrekt sein.

**Was eine gute Phase-4-Frage testet:**
- Verknüpfungen: Was passiert wenn X ausfällt? Was haben A und B gemeinsam?
- Abgrenzungen: Was unterscheidet X von Y?
- Klinische Anwendung: Welche Folgen hat Erkrankung Z?
- Vollständige Aufzählungen: Welche der folgenden Strukturen gehören zu X?

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

`explanation` ist optional, aber empfohlen wenn die Antwort nicht offensichtlich ist.

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

## Schritt 7 — Coverage-Check (Pflicht vor Qualitätsprüfung)

Geh zurück zur Fakten-Liste aus Schritt 0.

Für jeden Punkt: In welcher Frage kommt dieser Fakt vor?

| Fakt aus dem Studienbrief | Pflanze | Frage-ID |
|---|---|---|
| Beispiel-Fakt A | beispiel_thema | bt_h1 |
| Beispiel-Fakt B | beispiel_thema | bt_h2 |
| ... | ... | ... |

Wenn ein Fakt keine Zeile hat: Entweder eine Frage ergänzen, oder begründen warum er nicht prüfungsrelevant ist.

**Lücken in der Coverage sind der häufigste Qualitätsfehler.**

---

## Schritt 8 — Qualitätsprüfung (Pflicht)

Vor dem Commit folgendes manuell durchgehen:

**Formales:**
- [ ] Alle `id`-Felder sind einmalig (kein Duplikat in der ganzen Datei)
- [ ] Jede `solution` ist eigenständig lesbar (kein "Es", "Sie" ohne klaren Bezug im selben Satz)
- [ ] Alle `options`-Arrays haben genau 4 Einträge
- [ ] Alle `harvestQuestion`-MC-Arrays haben genau 1 `correct: true`
- [ ] Jeder prüfungsrelevante Fakt aus Phase 1 ist durch mindestens eine `harvestQuestion` abgedeckt
- [ ] Alle wichtigen Zusammenhänge sind durch mindestens eine `phase4Question` abgedeckt

**Inhalt:**
- [ ] Jede `harvestQuestion` und `phase4Question` — ist der abgefragte Fakt in einer `solution` von Phase 1 eingeführt?
- [ ] Jede `phase4Question` testet wirklich Synthese/Zusammenhänge, nicht nur dieselben Einzelfakten wie die harvestQuestions
- [ ] Die Coverage-Tabelle aus Schritt 7 ist vollständig — kein prüfungsrelevanter Fakt fehlt
- [ ] Wenn mehrere `correct: true` in einem `phase4Question`-Array: Die falschen Optionen sind wirklich falsch, nicht nur "unvollständig richtig"

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
      // ... mindestens 3 weitere Fragen, bis ALLE Fakten aus phase1 abgedeckt sind
    ],
    phase4Questions: [
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
      },
      {
        id: "bt_mc2",
        type: "mc",
        question: "Was sind Konsequenzen eines Ausfalls von B?",
        options: [
          { text: "Prozess Z kommt zum Erliegen", correct: true },
          { text: "Struktur A übernimmt die Funktion von B", correct: false },
          { text: "Erkrankung M tritt auf", correct: true },
          { text: "Untereinheit A1 wird aktiviert", correct: false }
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

---

## Schritt 9 — Label-Übungen hinzufügen (optional, aber empfohlen)

Label-Übungen sind interaktive Beschriftungs-Aufgaben auf anatomischen Diagrammen aus dem Studienbrief. Der Spieler zieht Labels auf die richtigen Stellen im Bild. Sie erscheinen im Labor.

### 9a — Diagramm-Bilder extrahieren

Geeignete Abbildungen aus dem PDF identifizieren (Querschnitte, Übersichtsdiagramme mit beschriftbaren Strukturen) und als PNG in `assets/diagrams/` speichern:

Namenskonvention: `{kapitelname}_figure_{N}.png` — z. B. `herzkreislauf_figure_3.png`.

Nur Abbildungen wählen, die **mindestens 4 klar abgrenzbare, prüfungsrelevante Strukturen** zeigen. Nicht jede Abbildung eignet sich — bevorzugt Querschnitte, Schemazeichnungen und Übersichten mit eindeutig lokalisierbaren Strukturen.

### 9b — Eintrag in `LABEL_EXERCISES` anlegen

In `js/content.js` im `LABEL_EXERCISES`-Array (vor dem abschließenden `]`):

```javascript
{
  id: "eindeutige_id",
  title: "Titel der Übung",
  passRate: 0.6,
  diagramType: "image",
  imagePath: "assets/diagrams/kapitelname_figure_N.png",
  bedId: "kapitelname_XXXX",
  aspectRatio: "1/1",
  zones: [
    { id: "z_struktur_a", label: "Struktur A", left: 10, top: 20, width: 25, height: 8 },
    { id: "z_struktur_b", label: "Struktur B", left: 55, top: 40, width: 20, height: 8 },
    // mind. 4 Zonen
  ]
}
```

**Koordinaten** (`left`, `top`, `width`, `height`) sind Prozentwerte relativ zur Bildgröße (0–100). Sie werden visuell im Browser kalibriert — Startwerte können geschätzt werden, dann im Spiel nachjustiert.

**`bedId`** muss mit der `id` des zugehörigen Betts in `PACK_CONTENT.beds` übereinstimmen.

**`passRate`**: 0.6 = 60 % der Labels müssen korrekt platziert werden, um zu bestehen.

**IDs:** Zonen-IDs beginnen mit `z_`, sind einmalig pro Übung (nicht global). Übungs-ID (`id`) muss global einmalig im `LABEL_EXERCISES`-Array sein.
