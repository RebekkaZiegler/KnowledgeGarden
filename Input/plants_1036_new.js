// New plants for HERZKREISLAUF_1036_PLANTS
// Gaps identified: Auskultationspunkte (5 ICR-Lagen), Herzinnenraum (Mm. pectinati, Trabeculae carneae, Mm. papillares), Sinus coronarius

  makeDetailedPlant({
    id: "herzauskultation_innenraum",
    title: "Herzauskultation, Innenraum und Koronarvenen",
    contextHint: "Studienbrief 1036 Das Herz – Herzaktion und Innenräume",
    phase1: {
      soil: {
        statement: "Der Auskultationspunkt der Mitralklappe liegt im 5. Interkostalraum in der Medioklavikularlinie links.",
        answer: true,
        solution: "Die fünf Auskultationspunkte: Mitralklappe (5. ICR in der MCL links), Trikuspidalklappe (4. ICR rechts neben dem Sternum), Aortenklappe (2. ICR rechts neben dem Sternum), Pulmonalklappe (2. ICR links neben dem Sternum), Erb-Punkt (3. ICR links neben dem Sternum – hier sind alle Klappen, besonders Aorten- und Pulmonalklappe, gut hörbar). Der Herzspitzenstoß ist ebenfalls im 5. ICR in der MCL links tastbar."
      },
      seed: {
        statement: "Der Erb-Punkt liegt im 2. Interkostalraum links und ist ein Auskultationspunkt speziell für die Aortenklappe.",
        answer: false,
        solution: "Der Erb-Punkt liegt im 3. ICR links neben dem Sternum. Hier sind alle vier Herzklappen (besonders Aorten- und Pulmonalklappe) gut auskultierbar. Die Aortenklappe wird dagegen am besten im 2. ICR rechts gehört. Auskultationspunkte werden durch die Schallfortleitungsrichtung bestimmt, nicht allein durch die anatomische Lage der Klappen."
      },
      water: {
        statement: "Die Herzvorhöfe besitzen innen kammartige Muskelleisten (Mm. pectinati); die Kammern haben Trabeculae carneae und Mm. papillares.",
        answer: true,
        solution: "Herzinnenraum: Vorhöfe enthalten Mm. pectinati (kammartige Muskelleisten). Kammern enthalten Trabeculae carneae (unregelmäßige Muskelstränge/-balken) und Mm. papillares (Papillarmuskeln, die Chordae tendineae der Segelklappen halten). Der venöse Abfluss des Myokards erfolgt hauptsächlich uber die Vena cordis magna in den Sinus coronarius, der in den rechten Vorhof muendet."
      }
    },
    harvestQuestions: [
      {
        id: "auskultation_h1",
        type: "mc",
        question: "Wo liegt der Auskultationspunkt der Aortenklappe?",
        options: [
          { text: "2. ICR rechts neben dem Sternum", correct: true },
          { text: "2. ICR links neben dem Sternum", correct: false },
          { text: "5. ICR in der Medioklavikularlinie links", correct: false },
          { text: "3. ICR links neben dem Sternum", correct: false }
        ],
        explanation: "Die Aortenklappe wird im 2. ICR rechts gehort. Links im 2. ICR liegt der Auskultationspunkt der Pulmonalklappe. Beide liegen also im 2. ICR, aber auf verschiedenen Seiten des Sternums."
      },
      {
        id: "auskultation_h2",
        type: "true_false",
        statement: "Der Erb-Punkt liegt im 3. Interkostalraum links neben dem Sternum und ermoglicht die Auskultation aller vier Herzklappen.",
        answer: true,
        explanation: "Am Erb-Punkt (3. ICR links neben dem Sternum) sind alle vier Herzklappen, besonders Aorten- und Pulmonalklappe, gut horbar."
      },
      {
        id: "auskultation_h3",
        type: "mc",
        question: "An welchem Auskultationspunkt wird die Trikuspidalklappe am besten gehort?",
        options: [
          { text: "4. ICR rechts neben dem Sternum", correct: true },
          { text: "5. ICR in der Medioklavikularlinie links", correct: false },
          { text: "3. ICR links neben dem Sternum", correct: false },
          { text: "2. ICR rechts neben dem Sternum", correct: false }
        ],
        explanation: "Trikuspidalklappe: 4. ICR rechts. Mitralklappe: 5. ICR MCL links. Aorta: 2. ICR rechts. Pulmonal: 2. ICR links. Erb: 3. ICR links neben dem Sternum."
      },
      {
        id: "auskultation_h4",
        type: "true_false",
        statement: "Der venose Abfluss des Herzmuskels erfolgt hauptsachlich uber die Vena cordis magna in den Sinus coronarius, der in den rechten Vorhof muendet.",
        answer: true,
        explanation: "Das sauerstoffarme Blut aus dem Myokard sammelt sich uber die Vena cordis magna im Sinus coronarius und fliesst in den rechten Vorhof – parallel zum venosen Ruckfluss aus dem Korper."
      },
      {
        id: "auskultation_h5",
        type: "mc",
        question: "Was sind Trabeculae carneae?",
        options: [
          { text: "Unregelmasige Muskelstrange und -balken an der Innenwand der Herzkammern", correct: true },
          { text: "Kammartige Muskelleisten in den Herzvorhoefen", correct: false },
          { text: "Sehnenfaden, die Segelklappen halten", correct: false },
          { text: "Fasern des Erregungsleitsystems in den Kammern", correct: false }
        ],
        explanation: "Trabeculae carneae sind die unregelmassigen Muskelstrange/-balken im Inneren der Herzkammern. Die Vorhoeffe haben Mm. pectinati (kammartig). Sehnenfaden der Papillarmuskeln sind Chordae tendineae."
      }
    ],
    phase4Questions: [
      {
        id: "auskultation_mc1",
        type: "mc",
        question: "Welche Auskultationspunkte sind korrekt zugeordnet?",
        options: [
          { text: "Mitralklappe: 5. ICR links in der Medioklavikularlinie", correct: true },
          { text: "Aortenklappe: 2. ICR rechts neben dem Sternum", correct: true },
          { text: "Pulmonalklappe: 2. ICR rechts neben dem Sternum", correct: false },
          { text: "Erb-Punkt: 3. ICR links neben dem Sternum", correct: true }
        ]
      },
      {
        id: "auskultation_mc2",
        type: "mc",
        question: "Welche Aussagen zu Herzinnenraum und Koronarvenen sind korrekt?",
        options: [
          { text: "Mm. pectinati sind kammartige Muskelleisten in den Herzvorhoefen", correct: true },
          { text: "Mm. papillares halten uber Chordae tendineae die Segelklappen in den Kammern", correct: true },
          { text: "Der Sinus coronarius muendet in den linken Vorhof", correct: false },
          { text: "Trabeculae carneae sind unregelmasige Muskelstrange in den Herzkammern", correct: true }
        ]
      }
    ]
  }),
