# Neues Kapitel hinzufügen

Schritt-für-Schritt-Anleitung für das Hinzufügen eines neuen Studienbriefs / Kapitels.
Alles spielt sich ausschliesslich in `js/content.js` ab — kein anderer Code muss angefasst werden.

---

## Spielmechanik: Fragenpool und Modi

Das Spiel hat zwei Modi (Alräunchen + Taverne), die denselben Fragenpool und denselben Masteryfortschritt teilen. Kapitel (= Betten) werden vom Spieler aktiviert — erst dann fließen ihre Fragen in den Pool.

### Fragen im Spiel
- **`harvestQuestions`** erscheinen überall: beim Füttern des Alräunchens, beim Bewässern von Pflanzen (Taverne), beim Raben-Bestellen und beim Reinigen.
- **`phase4Questions`** erscheinen im Restaurant — sie setzen voraus, dass der Spieler das Thema bereits durch die Ernte kennt.

### Lernkarten (learningCard) — Lernen vor dem Testen
Jede `harvestQuestion` und `phase4Question` kann ein optionales `learningCard`-Feld tragen (siehe Schritt 3). Solange eine Frage ihre Lernkarte noch nicht **2× korrekt** absolviert hat (beides in einer Sitzung möglich, kein Tagesabstand nötig), erscheint statt der echten Frage die Lernkarte — ein interaktiver Lernschritt, der den Fakt zuerst vermittelt statt ihn kalt abzufragen. Erst danach fließt die echte Frage in den normalen Fragenpool ein.

### Mastery
Eine Frage ohne Lernkarte gilt als gemeistert, wenn sie an **3 verschiedenen Kalendertagen** korrekt beantwortet wurde. Eine Frage **mit** Lernkarte braucht nur **2 verschiedene Kalendertage** — der vorgeschaltete Lernschritt kompensiert die reduzierte Anzahl.

### Pflanzenwachstum (Taverne)
Pflanzen wachsen nicht über Tage, sondern über richtige Antworten: Jede korrekte Antwort beim Bewässern gibt `+1 growthPoint`. Nach 2 Punkten ist die Pflanze erntereif. Es gibt keinen Tageszyklus mehr — Wachstum ist sofort nach der Antwort sichtbar.

### Raben-Lieferungen
Bestellungen werden sofort geliefert, sobald die zugehörige Frage korrekt beantwortet wurde. Kein Warten auf den nächsten Tag.

### Konsequenzen für die Fragengestaltung

| Fragetyp | Wo verwendet | Zweck |
|---|---|---|
| `harvestQuestions` | Phase 2 (Pflanzwachstum) + Restaurant | Einzelfakten testen; jeweils genau 1 richtige Antwort |
| `phase4Questions` | Nur Restaurant | Synthese, Zusammenhänge, Abgrenzungen; mehrere richtige Antworten möglich |

`phase4Questions` erscheinen nie während der Pflanzphase — sie setzen voraus, dass der Spieler das Thema bereits durch die Ernte kennt.

**Aktueller Stand (wichtig):** Die Trennung "harvestQuestions bei Fütterung/Bewässerung/Raben/Reinigen" vs. "phase4Questions im Restaurant" ist im Code aktuell **nicht** umgesetzt — beide Fragetypen landen im selben gemeinsamen Fragenpool (`buildQuestionPool()` in js/game.js) und können an jeder der oben genannten Stellen auftauchen. Die Tabelle beschreibt die beabsichtigte Rolle jedes Fragetyps für die Fragengestaltung; sie ist keine Aussage darüber, wo eine Frage im Spiel tatsächlich auftaucht.

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

Direkt vor dem `PACK_CONTENT`-Block (aktuell Zeile ~16312) einen neuen Block einfügen:

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

  harvestQuestions: [ ... ],   // so viele wie nötig, damit jeder prüfungsrelevante Fakt mindestens einmal abgefragt wird
  phase4Questions: [ ... ]     // so viele wie nötig, damit alle wichtigen Zusammenhänge getestet werden
})
```

`colorOverride` ist optional (individuelle Pflanzenfarbe im Garten). **Achtung:** `makeDetailedPlant()` (js/content.js) kopiert nur `id`, `title`, `harvestQuestions`, `phase4Questions`, `colorOverride` aus der Definition — jedes andere Top-Level-Feld wird stillschweigend verworfen und landet nie im Spiel. Neues Wissen wird nicht (mehr) auf Plant-Ebene eingeführt, sondern pro Frage über `learningCard` (siehe Schritt 3).

---

## Schritt 3 — Lernkarten (`learningCard`)

Jede einzelne `harvestQuestion` und `phase4Question` kann ein optionales `learningCard`-Feld tragen. Eine Lernkarte ist ein interaktiver Lernschritt, der **vor** der echten Frage erscheint: Solange der Spieler sie noch nicht 2× korrekt absolviert hat, ersetzt sie die echte Frage überall dort, wo diese im Fragenpool auftauchen würde. Danach braucht die echte Frage nur noch 2 statt 3 korrekte Tage, um als gemeistert zu gelten (siehe „Mastery" oben).

**Lernkarten sind Pflicht für jede neue Frage** (sowohl `harvestQuestions` als auch `phase4Questions`). Bestehende Fragen ohne Lernkarte funktionieren unverändert weiter (ungegatet, 3-Tage-Mastery) — sie werden schrittweise nachgerüstet.

Es gibt vier Mechanik-Typen. Wähle pro Frage den Typ, der am besten zum Fakt passt:

| Typ | Wann verwenden | Testet |
|---|---|---|
| `predict` | Ein einzelner, gut zu erratender Fakt ("Was bewirkt Struktur X?") | Vermutung vor der Erklärung |
| `teachback` | Eine Aussage/Frage bündelt mehrere zusammengehörige Teilpunkte, oder Vorbereitung auf eine `phase4Question`-Synthese | Auswahl der richtigen Kernpunkte aus einer gemischten Liste |
| `oddoneout` | Themen mit einer verbreiteten Verwechslung oder einer plausibel klingenden, aber falschen Aussage | Erkennen der einen falschen Aussage unter drei richtigen |
| `reconstruct` | Exakte Terminologie, Aufzählungen oder Reihenfolgen, bei denen der genaue Wortlaut zählt | Zusammensetzen des Lückentexts aus einer Wortbank |

**Datenformate:**

```javascript
// predict — Wahr/Falsch-Vermutung VOR der Erklärung, dann reveal
learningCard: { type: "predict", statement: "...", answer: true, reveal: "2–3 Sätze Erklärung" }

// teachback — Mehrfachauswahl: die echten Kernpunkte aus einer gemischten Liste auswählen (mind. 2 correct:true)
learningCard: { type: "teachback", prompt: "Welche der folgenden gehören zu X?",
  checklist: [{text:"...", correct:true}, {text:"...", correct:false}, ...], reveal: "..." }

// oddoneout — Einfachauswahl: 3 richtige Aussagen + 1 falsche, Spieler wählt die FALSCHE
learningCard: { type: "oddoneout", statements: [{text:"...", isWrong:false}, ..., {text:"...", isWrong:true}], whyWrong: "..." }

// reconstruct — Lückentext, Begriffe werden aus einer Wortbank in die Lücken getippt
learningCard: { type: "reconstruct", template: "Die vier Grundeigenschaften sind ___, ___, ___ und ___.",
  blanks: ["Stoffwechsel","Wachstum","Reizbarkeit","Reproduktion"], distractors: ["Atmung","Bewegung"] }
```

**Regeln:**
- `reveal`/`whyWrong` gilt wie `explanation`: eigenständig lesbar, maximal 3 Sätze, deckt den Fakt ab, der danach in der echten Frage getestet wird.
- `reconstruct`-Lücken testen üblicherweise 2–4 Begriffe pro Karte — nicht jedes einzelne Wort des Satzes als eigene Lücke.
- `teachback`-Listen brauchen mindestens 2 `correct:true`-Einträge (sonst rendert das Spiel sie nicht als Mehrfachauswahl) und mindestens 1 plausible falsche Ablenkeroption.
- `oddoneout` braucht genau 1 `isWrong:true`-Eintrag unter 3 `isWrong:false`-Aussagen.

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
- [ ] Jede `explanation`/`reveal`/`whyWrong` ist eigenständig lesbar (kein "Es", "Sie" ohne klaren Bezug im selben Satz)
- [ ] Alle `options`-Arrays haben genau 4 Einträge
- [ ] Alle `harvestQuestion`-MC-Arrays haben genau 1 `correct: true`
- [ ] Jede `harvestQuestion` und `phase4Question` hat ein `learningCard`-Feld (siehe Schritt 3)
- [ ] Jede `teachback`-Checkliste hat mind. 2 `correct:true` und mind. 1 `correct:false`; jedes `oddoneout` hat genau 1 `isWrong:true`
- [ ] Alle wichtigen Zusammenhänge sind durch mindestens eine `phase4Question` abgedeckt

**Inhalt:**
- [ ] Jede `harvestQuestion` und `phase4Question` testet einen Fakt, der prüfungsrelevant ist
- [ ] Jede Lernkarte testet denselben Fakt wie ihre zugehörige Frage, nur mit einer anderen Formulierung/Interaktion — kein Widerspruch zur `explanation`
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
        explanation: "Struktur A ist für X verantwortlich und damit Voraussetzung für Z.",
        learningCard: { type: "predict", statement: "Struktur A ist für die Funktion X verantwortlich.", answer: true, reveal: "Struktur A umfasst die Untereinheiten A1 und A2 und ist Voraussetzung für Prozess Z." }
      },
      {
        id: "bt_h2",
        type: "true_false",
        statement: "Ein Ausfall von B führt zur Erkrankung M.",
        answer: true,
        explanation: "B katalysiert die Umwandlung in Prozess Z. Fehlt B, stockt Z und es entsteht Erkrankung M.",
        learningCard: { type: "oddoneout", statements: [
          { text: "B katalysiert die Umwandlung in Prozess Z.", isWrong: false },
          { text: "Ein Ausfall von B führt zur Erkrankung M.", isWrong: false },
          { text: "A liefert den Ausgangsstoff für Prozess Z.", isWrong: false },
          { text: "Ein Ausfall von B hat keine klinischen Folgen.", isWrong: true }
        ], whyWrong: "Fehlt B, stockt Prozess Z — daraus entsteht die Erkrankung M. Das hat also sehr wohl klinische Folgen." }
      }
      // ... mindestens 3 weitere Fragen, bis ALLE prüfungsrelevanten Fakten abgedeckt sind
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
        ],
        learningCard: { type: "teachback", prompt: "Welche Aussagen zu Struktur A und B treffen zu?", checklist: [
          { text: "A liefert den Ausgangsstoff für Prozess Z", correct: true },
          { text: "A und B kooperieren bei Prozess Z", correct: true },
          { text: "B katalysiert die Umwandlung", correct: true },
          { text: "B ist bedeutungslos", correct: false }
        ], reveal: "A und B kooperieren bei Prozess Z: A liefert den Ausgangsstoff, B katalysiert die Umwandlung." }
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
        ],
        learningCard: { type: "reconstruct", template: "Fehlt B, kommt Prozess ___ zum Erliegen und es entsteht Erkrankung ___.", blanks: ["Z", "M"], distractors: ["Y", "N"] }
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
