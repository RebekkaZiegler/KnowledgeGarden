// New plants for BLUTLYMPHSYSTEM_1037_PLANTS
// Gaps identified: Blut-Hauptfunktionen (Transport/Abwehr/Regulation/Schutz), Thrombozyten (Megakaryozyten, 5-11 Tage, 150000-300000), Lymphknoten (bis 700, Rindenfollikel)

  makeDetailedPlant({
    id: "blutfunktionen_thrombozyten_lymphknoten",
    title: "Blutfunktionen, Thrombozyten und Lymphknoten",
    contextHint: "Studienbrief 1037 Blut – Funktionen, Thrombozyten und Lymphknoten",
    phase1: {
      soil: {
        statement: "Thrombozyten entstehen durch Abschnürung von Megakaryozyten im Knochenmark und leben 5–11 Tage.",
        answer: true,
        solution: "Thrombozyten (Blutplättchen) sind kernlose Zellfragmente mit einem Normalwert von 150.000–300.000/µl. Sie entstehen durch Abschnürung des Zytoplasmas von Megakaryozyten im roten Knochenmark. Ihre Lebensdauer beträgt 5–11 Tage. Sie sind unverzichtbar für die Blutgerinnung (primäre Hämostase). Erhöhte Thrombozytenzahl = Thrombozytose, erniedrigte = Thrombozytopenie."
      },
      seed: {
        statement: "Das Blut hat nur zwei Hauptfunktionen: Transport von Nährstoffen und Entsorgung von Stoffwechselabfallprodukten.",
        answer: false,
        solution: "Das Blut erfüllt vier Hauptfunktionen: (1) Transport (O2, CO2, Nährstoffe, Hormone, Abbauprodukte, Wärme); (2) Abwehr (Leukozyten, Antikörper, Komplementsystem); (3) Regulation (pH-Wert 7,36–7,44, Körpertemperatur, Wasser- und Elektrolythaushalt); (4) Schutz/Homöostase (Hämostase/Blutgerinnung, kolloid-osmotischer Druck durch Albumin)."
      },
      water: {
        statement: "Im menschlichen Körper gibt es bis zu 700 Lymphknoten, die als biologische Filter wirken und in Rinde und Mark gegliedert sind.",
        answer: true,
        solution: "Lymphknoten sind bohnenförmige Organe (0,5–1,5 cm) entlang der Lymphgefäße. Im Körper gibt es bis zu 700. Sie filtern die Lymphe biologisch: Makrophagen phagozytieren Erreger und Fremdstoffe; Lymphozyten in den Rindenfollikeln leiten die Immunantwort ein. Die Rinde enthält primäre (nicht aktiviert) und sekundäre Lymphfollikel (aktiviert, mit Keimzentrum). Lymphknotenschwellungen (Lymphadenopathie) entstehen bei Infektionen, Tumoren oder Autoimmunerkrankungen."
      }
    },
    harvestQuestions: [
      {
        id: "blutfkt_h1",
        type: "mc",
        question: "Welche der vier Hauptfunktionen des Blutes ist korrekt beschrieben?",
        options: [
          { text: "Regulation: Aufrechterhaltung von pH, Temperatur, Wasser- und Elektrolythaushalt", correct: true },
          { text: "Transport: ausschließlich O2 und CO2 zwischen Lunge und Gewebe", correct: false },
          { text: "Abwehr: nur durch Antikörper der B-Lymphozyten", correct: false },
          { text: "Schutz: Regulierung des Blutdrucks durch Vasokonstriktion", correct: false }
        ],
        explanation: "Blutfunktionen: Transport (O2, CO2, Nährstoffe, Hormone, Wärme), Abwehr (Leukozyten, Ak, Komplement), Regulation (pH, Temperatur, Elektrolyte), Schutz/Homöostase (Gerinnung, kolloid-osmotischer Druck)."
      },
      {
        id: "blutfkt_h2",
        type: "true_false",
        statement: "Thrombozyten werden durch Abschnürung von Megakaryozyten im Knochenmark gebildet.",
        answer: true,
        explanation: "Megakaryozyten sind riesige Knochenmarkszellen, deren Zytoplasma in kleine kernlose Fragmente (Thrombozyten) abgeschnürt wird. Thrombozyten haben daher keinen Zellkern."
      },
      {
        id: "blutfkt_h3",
        type: "mc",
        question: "Wie hoch ist der Normalwert für Thrombozyten im Blut?",
        options: [
          { text: "150.000–300.000/µl", correct: true },
          { text: "4.000–10.000/µl", correct: false },
          { text: "4,8–5,9 Mio/µl", correct: false },
          { text: "500–1.500/µl", correct: false }
        ],
        explanation: "Thrombozyten: 150.000–300.000/µl. Leukozyten: 4.000–10.000/µl. Erythrozyten: 4,8–5,9 Mio/µl (Männer). Thrombozytopenie (unter 150.000) erhöht das Blutungsrisiko."
      },
      {
        id: "blutfkt_h4",
        type: "true_false",
        statement: "Lymphknoten enthalten in der Rinde Lymphfollikel mit Lymphozyten, die bei Aktivierung Keimzentren bilden.",
        answer: true,
        explanation: "Lymphknoten-Rinde: primäre Lymphfollikel (ruhende B-Lymphozyten) und sekundäre Lymphfollikel (aktiviert, mit hellem Keimzentrum = Proliferationszone). Die Keimzentren entstehen bei einer Immunantwort."
      },
      {
        id: "blutfkt_h5",
        type: "mc",
        question: "Wie lange leben Thrombozyten im Blut?",
        options: [
          { text: "5–11 Tage", correct: true },
          { text: "100–120 Tage", correct: false },
          { text: "24–48 Stunden", correct: false },
          { text: "4–6 Wochen", correct: false }
        ],
        explanation: "Thrombozyten leben 5–11 Tage (Erythrozyten 100–120 Tage, Granulozyten nur wenige Stunden bis Tage). Alte Thrombozyten werden in Milz und Leber abgebaut."
      }
    ],
    phase4Questions: [
      {
        id: "blutfkt_mc1",
        type: "mc",
        question: "Welche Aussagen zu Blutfunktionen und Thrombozyten sind korrekt?",
        options: [
          { text: "Blut reguliert pH, Körpertemperatur und Elektrolythaushalt", correct: true },
          { text: "Thrombozyten entstehen durch Abschnürung von Megakaryozyten", correct: true },
          { text: "Thrombozyten leben 100–120 Tage wie Erythrozyten", correct: false },
          { text: "Der Normalwert für Thrombozyten beträgt 150.000–300.000/µl", correct: true }
        ]
      },
      {
        id: "blutfkt_mc2",
        type: "mc",
        question: "Welche Aussagen zu Lymphknoten sind korrekt?",
        options: [
          { text: "Im menschlichen Körper gibt es bis zu 700 Lymphknoten", correct: true },
          { text: "Lymphknoten filtern Lymphe biologisch durch Makrophagen und Lymphozyten", correct: true },
          { text: "Aktivierte Lymphfollikel in der Rinde besitzen ein Keimzentrum", correct: true },
          { text: "Lymphknoten filtern Blut wie die Milz", correct: false }
        ]
      }
    ]
  }),
