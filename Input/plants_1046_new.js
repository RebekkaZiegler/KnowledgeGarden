// Neue Pflanze für 1046 – Kap. 1.1–1.3.2: Hydrotherapie Temperaturreaktionen & Wickeltypen
// Gap: Prießnitz- vs. Kneipp-Wickel (Materialien), genaue vasomotorische Reaktionssequenz (plötzlich/anhaltend), 3 Grundsatzregeln

  makeDetailedPlant({
    id: "1046_09",
    title: "Hydrotherapie: Temperaturreaktionen & Wickeltypen",
    contextHint: "Kap. 1.1–1.3.2 – 3 Grundsatzregeln; vasomotorische Reaktionssequenz (plötzlich vs. anhaltend, warm vs. kalt); Prießnitz-Wickel (Leinen+Wolle) vs. Kneipp-Wickel (Leinen+Baumwolle+Wolle)",
    phase1: {
      soil: {
        statement: "Die drei Grundsatzregeln der Hydrotherapie lauten: nie auf kaltes Gewebe anwenden, nie bei frierendem oder übermüdetem Patienten und nie in kalten oder zugigen Räumen.",
        answer: true,
        solution: "Diese Regeln sichern die Wirksamkeit und verhindern Komplikationen. Hydrotherapeutische Reize wirken nur auf warmes, reaktionsfähiges Gewebe. Frierender oder übermüdeter Patient kann nicht adäquat reagieren."
      },
      seed: {
        statement: "Beim Prießnitz-Wickel wird zusätzlich zu feuchtem Leinentuch und Wolltuch ein Baumwolltuch eingelegt.",
        answer: false,
        solution: "Das ist der KNEIPP-Wickel: feuchtes Leinentuch + Baumwolltuch + trockenes Wolltuch. Der Prießnitz-Wickel besteht nur aus feuchtem Leinentuch + trockenem Wolltuch (ohne Baumwolle)."
      },
      water: {
        statement: "Plötzliche Wärme bewirkt zunächst kurze Vasokonstriktion, dann Vasodilatation; plötzliche Kälte bewirkt zunächst Vasokonstriktion, dann starke Vasodilatation – bei anhaltender Kälte folgt erneute Vasokonstriktion mit Mangeldurchblutung.",
        answer: true,
        solution: "Länger andauernde Wärme → anhaltende Vasodilatation; länger andauernde Kälte → anhaltende Vasokonstriktion/Mangeldurchblutung. Der kurze Kältereiz (Kneipp-Guss) nutzt die reaktive Dilatationsphase therapeutisch."
      }
    },
    harvestQuestions: [
      {
        id: "1046_09_h1",
        type: "mc",
        question: "Welche drei Grundsatzregeln gelten für alle hydrotherapeutischen Anwendungen?",
        options: [
          { text: "Nie auf kaltes Gewebe, nie bei frierendem/übermüdetem Patienten, nie in kalten/zugigen Räumen", correct: true },
          { text: "Immer kurze Anwendungszeit, immer mit Massage kombinieren, immer nüchtern", correct: false },
          { text: "Nur morgens anwenden, immer kalt beginnen, immer warm beenden", correct: false },
          { text: "Nie bei Kindern, nie bei Älteren, nie bei Herzerkrankungen", correct: false }
        ],
        explanation: "Die 3 Grundsatzregeln sichern die physiologische Reaktionsfähigkeit des Gewebes. Kaltes Gewebe reagiert nicht; frierender/übermüdeter Patient kann nicht thermoregulieren; kalte/zugige Räume verhindern die erwünschte Erwärmungsphase."
      },
      {
        id: "1046_09_h2",
        type: "true_false",
        statement: "Der Kneipp-Wickel besteht aus feuchtem Leinentuch + trockenem Baumwolltuch + trockenem Wolltuch.",
        answer: true,
        explanation: "Korrekt. Der Kneipp-Wickel hat drei Schichten: feuchtes Leinentuch (innen), Baumwolltuch (Mitte), Wolltuch (außen). Der Prießnitz-Wickel besteht nur aus zwei Schichten: feuchtes Leinentuch + Wolltuch."
      },
      {
        id: "1046_09_h3",
        type: "mc",
        question: "Was bewirkt eine länger andauernde Kälteanwendung auf die Blutgefäße?",
        options: [
          { text: "Anhaltende Vasodilatation", correct: false },
          { text: "Zunächst Dilatation, dann Konstriktion", correct: false },
          { text: "Anhaltende Vasokonstriktion mit Mangeldurchblutung", correct: true },
          { text: "Keine Wirkung – nur kurze Anwendungen wirken", correct: false }
        ],
        explanation: "Länger andauernde Kälte → anhaltende Vasokonstriktion → Mangeldurchblutung. Dagegen: plötzliche/kurze Kälte → zunächst Konstriktion, dann starke reaktive Vasodilatation (therapeutisch genutzt bei Kneipp-Güssen)."
      },
      {
        id: "1046_09_h4",
        type: "true_false",
        statement: "Plötzliche Wärme führt zunächst zu kurzer Vasokonstriktion, bevor die Vasodilatation einsetzt.",
        answer: true,
        explanation: "Korrekt. Plötzliche Wärme → kurze Konstriktion → dann Dilatation. Länger andauernde Wärme → direkte anhaltende Vasodilatation (ohne initiale Konstriktion)."
      },
      {
        id: "1046_09_h5",
        type: "mc",
        question: "Welcher Wickeltyp besteht ausschließlich aus feuchtem Leinentuch und trockenem Wolltuch (ohne Baumwolle)?",
        options: [
          { text: "Kneipp-Wickel", correct: false },
          { text: "Prießnitz-Wickel", correct: true },
          { text: "Moor-Wickel", correct: false },
          { text: "Schaf-Wickel", correct: false }
        ],
        explanation: "Der Prießnitz-Wickel = feuchtes Leinentuch + trockenes Wolltuch (2 Schichten). Der Kneipp-Wickel hat drei Schichten: Leinen + Baumwolle + Wolle."
      }
    ],
    phase4Questions: [
      {
        id: "1046_09_p4_1",
        type: "mc",
        question: "Welche vasomotorischen Reaktionen sind korrekt beschrieben? (Mehrere Antworten möglich)",
        options: [
          { text: "Länger andauernde Wärme → Vasodilatation", correct: true },
          { text: "Länger andauernde Kälte → Vasokonstriktion/Mangeldurchblutung", correct: true },
          { text: "Plötzliche Kälte → zunächst Konstriktion, dann starke Dilatation", correct: true },
          { text: "Plötzliche Wärme → sofortige anhaltende Dilatation ohne initiale Konstriktion", correct: false },
          { text: "Kurzer Kältereiz (z.B. Kneipp-Guss) nutzt die reaktive Dilatationsphase", correct: true }
        ],
        explanation: "Plötzliche Wärme bewirkt zunächst kurze Konstriktion, dann Dilatation – nicht sofortige Dilatation. Alle anderen Aussagen beschreiben die vasomotorischen Reaktionen korrekt."
      },
      {
        id: "1046_09_p4_2",
        type: "mc",
        question: "Welche Aussagen zu Wickeltypen und Grundsatzregeln der Hydrotherapie sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Prießnitz-Wickel: 2 Schichten (Leinen + Wolle)", correct: true },
          { text: "Kneipp-Wickel: 3 Schichten (Leinen + Baumwolle + Wolle)", correct: true },
          { text: "Hydrotherapie darf auf kaltes Gewebe angewendet werden", correct: false },
          { text: "Nie bei frierendem oder übermüdetem Patienten anwenden", correct: true },
          { text: "Kalte Wickel sind indiziert bei Fieber, Entzündungen, Verstauchungen", correct: true }
        ],
        explanation: "Hydrotherapie NIE auf kaltes Gewebe anwenden – kaltes Gewebe kann nicht reagieren. Alle anderen Aussagen sind korrekt."
      }
    ]
  })
