// Studienbrief 1037 — Strukturen und Funktion des Blutes und des Lymphsystems
// Temp file: merge into js/content.js before PACK_CONTENT

const BLUTLYMPHSYSTEM_1037_PLANTS = [

  makeDetailedPlant({
    id: "blut_zusammensetzung",
    title: "Blut: Zusammensetzung, Plasma und Hämatokrit",
    contextHint: "Studienbrief 1037 Blut – Zusammensetzung und Plasma",
    phase1: {
      soil: {
        statement: "Der pH-Wert des Blutplasmas liegt zwischen 7,36 und 7,44 und ist damit leicht alkalisch.",
        answer: true,
        solution: "Das Blut macht 6–8 % des Körpergewichts aus (ca. 4–6 Liter). Blutplasma enthält 90–91 % Wasser, 6,6–8 % Proteine und hat einen leicht alkalischen pH von 7,36–7,44. Sinkt der pH unter 7,36, spricht man von Azidose; steigt er über 7,44, von Alkalose. Blutserum ist der flüssige Anteil ohne Fibrinogen (nach der Gerinnung), während Blutplasma = Serum + Fibrinogen ist."
      },
      seed: {
        statement: "Der Hämatokrit beschreibt den prozentualen Anteil der Leukozyten am Gesamtblutvolumen.",
        answer: false,
        solution: "Der Hämatokrit gibt den Anteil der Erythrozyten (roten Blutkörperchen) am Gesamtblutvolumen an, nicht der Leukozyten. Normalwerte: Männer 40–52 %, Frauen 37–48 %. Die Gesamtelektrolytkonzentration im Plasma beträgt 155 mmol/l an Kationen (Na⁺ 143, K⁺ 5, Ca²⁺ 5, Mg²⁺ 2) und 155 mmol/l an Anionen (Cl⁻ 103, HCO₃⁻ 27) – das Gleichgewicht nennt man Isotonie."
      },
      water: {
        statement: "Blutplasma enthält im Gegensatz zu Blutserum noch Fibrinogen.",
        answer: true,
        solution: "Blutserum ist der flüssige Überstand nach der Blutgerinnung – es enthält kein Fibrinogen mehr, da dieses zu Fibrin umgewandelt wurde. Blutplasma hingegen ist der zellarme Anteil vor der Gerinnung und enthält noch Fibrinogen sowie alle anderen Plasmaproteine. Plasma entsteht durch Zentrifugation mit Gerinnungshemmern."
      }
    },
    harvestQuestions: [
      {
        id: "blut_zusammensetzung_h1",
        type: "mc",
        question: "Welcher pH-Wert des Blutes wird als Azidose bezeichnet?",
        options: [
          { text: "pH < 7,36", correct: true },
          { text: "pH > 7,44", correct: false },
          { text: "pH < 7,00", correct: false },
          { text: "pH > 7,36", correct: false }
        ],
        explanation: "Der Normalbereich des Blut-pH liegt bei 7,36–7,44. Werte darunter (< 7,36) nennt man Azidose, Werte darüber (> 7,44) Alkalose."
      },
      {
        id: "blut_zusammensetzung_h2",
        type: "true_false",
        statement: "Der Hämatokrit bei Männern liegt normalerweise zwischen 40 und 52 %.",
        answer: true,
        explanation: "Der Hämatokrit (Erythrozytenanteil am Gesamtblutvolumen) beträgt bei Männern 40–52 %, bei Frauen 37–48 %."
      },
      {
        id: "blut_zusammensetzung_h3",
        type: "mc",
        question: "Was unterscheidet Blutplasma von Blutserum?",
        options: [
          { text: "Plasma enthält noch Fibrinogen, Serum nicht", correct: true },
          { text: "Serum enthält mehr Erythrozyten als Plasma", correct: false },
          { text: "Plasma hat keinen Eiweißanteil, Serum schon", correct: false },
          { text: "Serum enthält alle Gerinnungsfaktoren", correct: false }
        ],
        explanation: "Blutserum entsteht nach der Gerinnung: Fibrinogen ist zu Fibrin umgewandelt und nicht mehr vorhanden. Plasma (mit Gerinnungshemmern gewonnen) enthält noch Fibrinogen."
      },
      {
        id: "blut_zusammensetzung_h4",
        type: "mc",
        question: "Wie hoch ist die Konzentration von Natriumionen (Na⁺) im Blutplasma?",
        options: [
          { text: "143 mmol/l", correct: true },
          { text: "103 mmol/l", correct: false },
          { text: "27 mmol/l", correct: false },
          { text: "5 mmol/l", correct: false }
        ],
        explanation: "Na⁺ ist das häufigste Kation im Plasma mit 143 mmol/l. Die Gesamtkationen betragen 155 mmol/l (= isoton zur Gesamtanionenkonzentration)."
      },
      {
        id: "blut_zusammensetzung_h5",
        type: "true_false",
        statement: "Das Blut macht beim Erwachsenen ca. 6–8 % des Körpergewichts aus.",
        answer: true,
        explanation: "Das Blutvolumen beträgt beim Erwachsenen ca. 4–6 Liter, entsprechend 6–8 % des Körpergewichts."
      }
    ],
    phase4Questions: [
      {
        id: "blut_zusammensetzung_mc1",
        type: "mc",
        question: "Welche Aussagen zur Zusammensetzung des Blutes und Blutplasmas sind korrekt?",
        options: [
          { text: "Blutplasma hat einen leicht alkalischen pH von 7,36–7,44", correct: true },
          { text: "Der Hämatokrit beschreibt den Erythrozytenanteil am Gesamtblutvolumen", correct: true },
          { text: "Blutserum enthält Fibrinogen, Blutplasma nicht", correct: false },
          { text: "Die Gesamtkonzentration von Kationen und Anionen im Plasma beträgt je 155 mmol/l (Isotonie)", correct: true }
        ]
      },
      {
        id: "blut_zusammensetzung_mc2",
        type: "mc",
        question: "Welche Aussagen zu Blut und Hämatokrit treffen zu?",
        options: [
          { text: "Bei Frauen liegt der Hämatokrit normalerweise bei 37–48 %", correct: true },
          { text: "Ein pH unter 7,36 wird als Alkalose bezeichnet", correct: false },
          { text: "Plasma enthält 90–91 % Wasser", correct: true },
          { text: "Das Blut macht ca. 6–8 % des Körpergewichts aus", correct: true }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "plasmaproteine_kolloiddruck",
    title: "Plasmaproteine und kolloid-osmotischer Druck",
    contextHint: "Studienbrief 1037 Blut – Plasmaproteine",
    phase1: {
      soil: {
        statement: "Albumin ist das häufigste Plasmaprotein und erzeugt den kolloid-osmotischen Druck.",
        answer: true,
        solution: "Albumin (40 g/L) ist das mengenmäßig wichtigste Plasmaprotein. Es hat drei Hauptaufgaben: (1) Aufrechterhaltung des kolloid-osmotischen Drucks (ca. 25 mmHg), der dem hydrostatischen Blutdruck entgegenwirkt und Flüssigkeit in der Blutbahn hält; (2) Transportfunktion für Fettsäuren, Hormone, Bilirubin, Medikamente; (3) Pufferfunktion für den Blut-pH. Ein Albuminmangel (Hypoalbuminämie) führt zu Ödemen, da der kolloid-osmotische Druck sinkt und Flüssigkeit ins Gewebe ausweicht."
      },
      seed: {
        statement: "Gamma-Globuline transportieren Eisen und sind für die Blutbildung wichtig.",
        answer: false,
        solution: "Gamma-Globuline (Immunglobuline) dienen der Infektabwehr, nicht dem Eisentransport. Die Aufgaben der Globuline sind unterschiedlich: Alpha-1-Globuline transportieren Fett; Alpha-2-Globuline hemmen eiweißspaltende Enzyme; Beta-Globuline transportieren Eisen und sind für die Blutbildung wichtig; Gamma-Globuline sind Immunglobuline (Infektabwehr)."
      },
      water: {
        statement: "Ein Abfall des kolloid-osmotischen Drucks führt zu Ödemen im Gewebe.",
        answer: true,
        solution: "Der kolloid-osmotische Druck (Onkotischer Druck) wirkt dem Blutdruck entgegen: Er 'zieht' Flüssigkeit aus dem Gewebe zurück in die Kapillaren. Sinkt er (z. B. bei Albuminmangel durch Lebererkrankung, Malnutrition oder nephrotisches Syndrom), überwiegt der Blutdruck, und Flüssigkeit tritt verstärkt ins Gewebe aus → Ödeme. Fibrinogen ist ein weiteres Plasmaprotein – es ist der Hauptgerinnungsstoff."
      }
    },
    harvestQuestions: [
      {
        id: "plasmaproteine_h1",
        type: "mc",
        question: "Welche Funktion haben Alpha-2-Globuline im Blutplasma?",
        options: [
          { text: "Hemmung eiweißspaltender Enzyme", correct: true },
          { text: "Transport von Fettsäuren", correct: false },
          { text: "Infektabwehr", correct: false },
          { text: "Blutgerinnung", correct: false }
        ],
        explanation: "Alpha-2-Globuline hemmen eiweißspaltende Enzyme (Proteasen). Alpha-1-Globuline übernehmen den Fetttransport, Gamma-Globuline die Infektabwehr, Fibrinogen die Blutgerinnung."
      },
      {
        id: "plasmaproteine_h2",
        type: "true_false",
        statement: "Ein Albuminmangel führt zu Ödemen, weil der kolloid-osmotische Druck sinkt.",
        answer: true,
        explanation: "Albumin ist der Haupterzeuger des kolloid-osmotischen Drucks. Sinkt Albumin (z. B. bei Lebererkrankung), sinkt der Onkotische Druck → Flüssigkeit verbleibt im Gewebe → Ödeme."
      },
      {
        id: "plasmaproteine_h3",
        type: "mc",
        question: "Welches Plasmaprotein transportiert Eisen und ist für die Blutbildung wichtig?",
        options: [
          { text: "Beta-Globuline", correct: true },
          { text: "Albumin", correct: false },
          { text: "Gamma-Globuline", correct: false },
          { text: "Alpha-1-Globuline", correct: false }
        ],
        explanation: "Beta-Globuline (z. B. Transferrin) transportieren Eisen und sind für die Erythropoese (Blutbildung) wichtig. Gamma-Globuline sind Immunglobuline."
      },
      {
        id: "plasmaproteine_h4",
        type: "mc",
        question: "Welche drei Hauptaufgaben hat Albumin?",
        options: [
          { text: "Kolloid-osmotischer Druck, Transport, Pufferfunktion", correct: true },
          { text: "Blutgerinnung, Eisentransport, Infektabwehr", correct: false },
          { text: "Fetttransport, Enzyme hemmen, Blutdruck regulieren", correct: false },
          { text: "Transport, Blutgerinnung, kolloid-osmotischer Druck", correct: false }
        ],
        explanation: "Albumin erfüllt drei Hauptaufgaben: kolloid-osmotischer Druck (Flüssigkeitshaushalt), Transportfunktion (Fettsäuren, Hormone, Medikamente) und Pufferfunktion (Blut-pH)."
      },
      {
        id: "plasmaproteine_h5",
        type: "true_false",
        statement: "Fibrinogen gehört zu den Plasmaproteinen und ist der Hauptgerinnungsstoff.",
        answer: true,
        explanation: "Fibrinogen (Faktor I) ist ein lösliches Plasmaprotein, das bei der Gerinnung durch Thrombin in unlösliches Fibrin umgewandelt wird und das Gerinnsel stabilisiert."
      }
    ],
    phase4Questions: [
      {
        id: "plasmaproteine_mc1",
        type: "mc",
        question: "Welche Aussagen zu Plasmaproteinen sind korrekt?",
        options: [
          { text: "Albumin erzeugt den kolloid-osmotischen Druck und wirkt dem Blutdruck entgegen", correct: true },
          { text: "Gamma-Globuline sind Immunglobuline und dienen der Infektabwehr", correct: true },
          { text: "Beta-Globuline hemmen eiweißspaltende Enzyme", correct: false },
          { text: "Albuminmangel kann zu Ödemen führen", correct: true }
        ]
      },
      {
        id: "plasmaproteine_mc2",
        type: "mc",
        question: "Welche Aussagen zur Funktion der Globuline treffen zu?",
        options: [
          { text: "Alpha-1-Globuline transportieren Fett", correct: true },
          { text: "Beta-Globuline transportieren Eisen", correct: true },
          { text: "Alpha-2-Globuline sind Immunglobuline", correct: false },
          { text: "Alpha-2-Globuline hemmen Proteasen", correct: true }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "erythrozyten_haemoglobin",
    title: "Erythrozyten und Hämoglobin",
    contextHint: "Studienbrief 1037 Blutzellen – Erythrozyten",
    phase1: {
      soil: {
        statement: "Erythrozyten sind kernlos, ca. 7,5 µm groß und leben 100–120 Tage.",
        answer: true,
        solution: "Erythrozyten (rote Blutkörperchen) sind kernlose, bikonkave Scheiben (ca. 7,5 µm Durchmesser) – durch den fehlenden Kern sind sie sehr verformbar und können enge Kapillaren passieren. Normalwerte: Männer 4,8–5,9 Mio/µl, Frauen 4,3–5,2 Mio/µl. Sie leben 100–120 Tage und werden in der Milz und Leber abgebaut. Gebildet werden sie im roten Knochenmark."
      },
      seed: {
        statement: "Kohlenmonoxid (CO) bindet an Hämoglobin und kann problemlos durch frische Luft verdrängt werden.",
        answer: false,
        solution: "CO bindet ca. 300-mal fester an Hämoglobin als Sauerstoff. Es blockiert die Sauerstoffbindungsstellen (Häm-Gruppen), kann aber mit 100 % Sauerstoff (Hyperbarkammer) verdrängt werden – nicht einfach durch frische Luft. Nitrit-Vergiftung wirkt anders: Sie oxidiert das Fe²⁺ im Hämoglobin zu Fe³⁺ (Methämoglobin), das O₂ zu fest bindet → Zyanose (Blue Babys). Myoglobin im Muskelgewebe hat nur 1 Häm-Gruppe und bindet O₂ noch stärker."
      },
      water: {
        statement: "Sauerstoffbindung an Hämoglobin ist eine Oxygenation, keine Oxidation – das Eisen bleibt Fe²⁺.",
        answer: true,
        solution: "Hämoglobin besteht aus 4 Polypeptidketten (Globin) und 4 Häm-Gruppen, die je ein Fe²⁺-Ion enthalten. Die Bindung von O₂ an Fe²⁺ ist reversibel (Oxygenation), kein chemischer Verbrennungsvorgang (Oxidation). Ein Erythrozyt enthält ca. 280 Mio. Hämoglobinmoleküle; jedes kann 4 O₂ transportieren. Sauerstoff wird in den Kapillaren per Diffusion ans Gewebe abgegeben."
      }
    },
    harvestQuestions: [
      {
        id: "erythrozyten_h1",
        type: "mc",
        question: "Wie viele Häm-Gruppen enthält ein Hämoglobinmolekül, und wie viele O₂-Moleküle kann es transportieren?",
        options: [
          { text: "4 Häm-Gruppen, 4 O₂", correct: true },
          { text: "2 Häm-Gruppen, 2 O₂", correct: false },
          { text: "1 Häm-Gruppe, 1 O₂", correct: false },
          { text: "4 Häm-Gruppen, 8 O₂", correct: false }
        ],
        explanation: "Hämoglobin hat 4 Polypeptidketten, jede mit einer Häm-Gruppe (Fe²⁺). Jede Häm-Gruppe kann 1 O₂ binden → 4 O₂ pro Hämoglobinmolekül."
      },
      {
        id: "erythrozyten_h2",
        type: "true_false",
        statement: "Erythrozyten werden hauptsächlich in der Milz gebildet.",
        answer: false,
        explanation: "Erythrozyten werden im roten Knochenmark gebildet (Erythropoese). Milz und Leber sind die Abbauorte überalterter Erythrozyten."
      },
      {
        id: "erythrozyten_h3",
        type: "mc",
        question: "Warum sind Nitrit-Vergiftungen gefährlich?",
        options: [
          { text: "Nitrit oxidiert Fe²⁺ zu Fe³⁺ im Hämoglobin, das O₂ dann zu fest bindet", correct: true },
          { text: "Nitrit verdrängt O₂ direkt aus der Lunge", correct: false },
          { text: "Nitrit löst Hämoglobin auf", correct: false },
          { text: "Nitrit blockiert die Erythropoese im Knochenmark", correct: false }
        ],
        explanation: "Nitrit oxidiert das Fe²⁺ in der Häm-Gruppe zu Fe³⁺ (Methämoglobin). Methämoglobin bindet O₂ zu fest – es kann nicht mehr abgegeben werden → Zyanose, bei Säuglingen als 'Blue Baby' bekannt."
      },
      {
        id: "erythrozyten_h4",
        type: "mc",
        question: "Was unterscheidet Myoglobin von Hämoglobin?",
        options: [
          { text: "Myoglobin hat nur 1 Häm-Gruppe und bindet O₂ stärker", correct: true },
          { text: "Myoglobin hat 4 Häm-Gruppen wie Hämoglobin", correct: false },
          { text: "Myoglobin kommt nur im Blut vor", correct: false },
          { text: "Myoglobin gibt O₂ leichter ab als Hämoglobin", correct: false }
        ],
        explanation: "Myoglobin ist ein Muskelsauerstoffspeicher mit nur 1 Häm-Gruppe. Es bindet O₂ stärker als Hämoglobin und gibt es erst bei sehr niedrigem O₂-Partialdruck ab."
      },
      {
        id: "erythrozyten_h5",
        type: "true_false",
        statement: "CO bindet ca. 300-mal stärker an Hämoglobin als O₂.",
        answer: true,
        explanation: "CO verdrängt O₂ an den Häm-Gruppen und führt zu CO-Hämoglobin (HbCO), das kein O₂ transportieren kann. Die Bindung ist sehr fest, aber reversibel – Therapie mit 100 % O₂ oder Hyperbarkammer."
      }
    ],
    phase4Questions: [
      {
        id: "erythrozyten_mc1",
        type: "mc",
        question: "Welche Aussagen zu Erythrozyten und Hämoglobin sind korrekt?",
        options: [
          { text: "Erythrozyten sind kernlos und leben 100–120 Tage", correct: true },
          { text: "Hämoglobin enthält 4 Häm-Gruppen mit je einem Fe²⁺-Ion", correct: true },
          { text: "Erythrozyten werden in der Milz gebildet und im Knochenmark abgebaut", correct: false },
          { text: "CO bindet ca. 300-mal stärker an Hämoglobin als O₂", correct: true }
        ]
      },
      {
        id: "erythrozyten_mc2",
        type: "mc",
        question: "Welche Aussagen zu Hämoglobin-Störungen treffen zu?",
        options: [
          { text: "Nitrit-Vergiftung führt zu Methämoglobin (Fe³⁺), das O₂ nicht mehr abgeben kann", correct: true },
          { text: "Myoglobin hat 4 Häm-Gruppen wie Hämoglobin", correct: false },
          { text: "Die O₂-Bindung an Hämoglobin ist eine Oxygenation, keine Oxidation", correct: true },
          { text: "CO-Vergiftung ist irreversibel und daher immer tödlich", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "leukozyten_differenzialblutbild",
    title: "Leukozyten und Differenzialblutbild",
    contextHint: "Studienbrief 1037 Blutzellen – Leukozyten",
    phase1: {
      soil: {
        statement: "Neutrophile Granulozyten machen 50–70 % der Leukozyten aus und bekämpfen vorrangig bakterielle Infektionen.",
        answer: true,
        solution: "Leukozyten (weiße Blutkörperchen) liegen normalerweise bei 4000–10.000/µl. Das Differenzialblutbild: Granulozyten 50–70 % (davon Neutrophile 30–70 %, Eosinophile 1–3 %, Basophile 0,5–1 %), Lymphozyten 20–40 %, Monozyten 2–6 %. Neutrophile Granulozyten sind stab- oder segmentkernig; Neutrophilie tritt bei akuten Bakterieninfekten, Eiterungen und Abszessen auf. Eine Linksverschiebung (mehr stabkernige Formen) zeigt erhöhten Bedarf."
      },
      seed: {
        statement: "Eosinophile Granulozyten zeigen keinen Tagesrhythmus und sind bei Cushing-Syndrom erhöht.",
        answer: false,
        solution: "Eosinophile zeigen einen charakteristischen Tagesrhythmus (morgens niedrig, nachts höher). Sie sind bei Allergien und Parasitenbefall erhöht (Eosinophilie). Erniedrigt sind sie bei Cushing-Syndrom und Bestrahlung (Eosinopenie). Basophile enthalten Heparin, Histamin und Serotonin; Basophilie tritt bei CML, Colitis ulcerosa, Diabetes und Allergien auf."
      },
      water: {
        statement: "Monozyten sind die größten Phagozyten im Blut und Vorläufer der Makrophagen.",
        answer: true,
        solution: "Monozyten (2–6 % der Leukozyten) sind die größten Blutzellen überhaupt. Sie verlassen das Blut und differenzieren sich in den Geweben zu Makrophagen (z. B. Kupffer-Zellen in der Leber, Mikroglia im ZNS). Monozytose tritt auf bei Mononukleose, Masern, Mumps, Brucellose, Tuberkulose, Malaria und Hodgkin-Lymphom. Lymphozytose: lymphatische Leukämien, Keuchhusten, Röteln, Mumps, Syphilis."
      }
    },
    harvestQuestions: [
      {
        id: "leukozyten_h1",
        type: "mc",
        question: "Welche Leukozyten-Untergruppe tritt bei Allergien und Parasitenbefall in erhöhter Anzahl auf?",
        options: [
          { text: "Eosinophile Granulozyten", correct: true },
          { text: "Neutrophile Granulozyten", correct: false },
          { text: "Basophile Granulozyten", correct: false },
          { text: "Monozyten", correct: false }
        ],
        explanation: "Eosinophile sind bei Allergien und Parasitosen erhöht (Eosinophilie). Neutrophile bekämpfen Bakterieninfekte, Basophile setzen Histamin frei, Monozyten sind Vorläufer der Makrophagen."
      },
      {
        id: "leukozyten_h2",
        type: "true_false",
        statement: "Eine Linksverschiebung im Differenzialblutbild bedeutet, dass mehr reife segmentkernige Neutrophile vorhanden sind.",
        answer: false,
        explanation: "Eine Linksverschiebung bedeutet, dass mehr unreife, stabkernige Neutrophile auftreten – Zeichen einer gesteigerten Granulopoese bei starker Bakterieninfektion oder Entzündung."
      },
      {
        id: "leukozyten_h3",
        type: "mc",
        question: "Bei welcher Erkrankung ist eine Agranulozytose durch Paracetamol, Phenacetin oder Pyrazol-Derivate möglich?",
        options: [
          { text: "Diese Medikamente können reversibel die Granulozyten-Bildung hemmen", correct: true },
          { text: "Dauerhafter Verlust aller Leukozyten", correct: false },
          { text: "Erhöhung der neutrophilen Granulozyten", correct: false },
          { text: "Selektive Zerstörung von Lymphozyten", correct: false }
        ],
        explanation: "Agranulozytose (starker Abfall der Granulozyten) kann als reversible Nebenwirkung von Paracetamol, Phenacetin und Pyrazol-Derivaten auftreten – kein dauerhafter Verlust."
      },
      {
        id: "leukozyten_h4",
        type: "mc",
        question: "Welcher Normalwert gilt für Leukozyten im Blut?",
        options: [
          { text: "4.000–10.000 /µl", correct: true },
          { text: "150.000–300.000 /µl", correct: false },
          { text: "4,8–5,9 Mio/µl", correct: false },
          { text: "1.000–3.000 /µl", correct: false }
        ],
        explanation: "Leukozyten: Normalwert 4.000–10.000/µl. Thrombozyten: 150.000–300.000/µl. Erythrozyten: 4,8–5,9 Mio/µl (Männer)."
      },
      {
        id: "leukozyten_h5",
        type: "true_false",
        statement: "Basophile Granulozyten enthalten Heparin, Histamin und Serotonin.",
        answer: true,
        explanation: "Basophile speichern Heparin (gerinnungshemmend), Histamin und Serotonin in ihren Granula. Sie spielen eine Rolle bei allergischen Reaktionen und Basophilie tritt u. a. bei CML und Allergien auf."
      }
    ],
    phase4Questions: [
      {
        id: "leukozyten_mc1",
        type: "mc",
        question: "Welche Aussagen zum Differenzialblutbild sind korrekt?",
        options: [
          { text: "Neutrophile Granulozyten machen 30–70 % der Leukozyten aus", correct: true },
          { text: "Eosinophile zeigen einen Tagesrhythmus und sind bei Allergien erhöht", correct: true },
          { text: "Monozyten sind die kleinsten Leukozyten", correct: false },
          { text: "Basophile enthalten Heparin und Histamin", correct: true }
        ]
      },
      {
        id: "leukozyten_mc2",
        type: "mc",
        question: "Welche Zustände führen zu Leukopenie?",
        options: [
          { text: "Virusinfektionen wie HIV, Influenza, Masern", correct: true },
          { text: "Zytostatika-Therapie", correct: true },
          { text: "Akute Bakterieninfektionen", correct: false },
          { text: "Knochenmarkschädigungen", correct: true }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "haemostase_gerinnung",
    title: "Hämostase, Blutgerinnung und Antikoagulantien",
    contextHint: "Studienbrief 1037 Blutzellen – Thrombozyten, Hämostase und Gerinnung",
    phase1: {
      soil: {
        statement: "Die primäre Hämostase dauert 1–3 Minuten und endet mit einem labilen weißen Thrombus.",
        answer: true,
        solution: "Hämostase läuft in zwei Phasen ab: Primäre Hämostase (1–3 Min): Vasokonstriktion (Serotonin/Katecholamine) → Thrombozytenadhäsion (von-Willebrand-Faktor bindet an GP-Ib-Rezeptor der Thrombozyten) → Thrombozytenaggregation → weißer Thrombus (labil). Sekundäre Hämostase (Blutgerinnung, 5–7 Min) nach Morawitz: Aktivierungsphase (intrinsisch langsam auf Gefäßinnenwand; extrinsisch schnell bei äußerem Gewebeschaden) → Prothrombin wird durch Thrombokinase + Ca²⁺ zu Thrombin → Koagulationsphase: Fibrinogen → Fibrin → roter Thrombus (stabil) → Retraktionsphase."
      },
      seed: {
        statement: "Hämophilie A ist ein X-chromosomaler Erbgang, von dem auch Frauen regelmäßig betroffen sind.",
        answer: false,
        solution: "Hämophilie A (Faktor-VIII-Mangel) und Hämophilie B (Faktor-IX-Mangel) werden X-chromosomal rezessiv vererbt. Da Männer nur ein X-Chromosom haben, erkranken fast ausschließlich Männer. Frauen sind Überträgerinnen (Konduktorinnen), erkranken aber selten (bräuchten zwei defekte X-Chromosomen). Hämophilie ist angeboren und muss von der Afibrinogenämie (Faktor I) und Hypoprothrombinämie (Faktor II, durch Vitamin-K-Mangel) unterschieden werden."
      },
      water: {
        statement: "Heparin inaktiviert Gerinnungsfaktoren direkt und wirkt damit schneller als Cumarin/Marcumar.",
        answer: true,
        solution: "Heparin wirkt direkt: Es aktiviert Antithrombin III und inaktiviert so sofort mehrere Gerinnungsfaktoren (IIa, Xa u. a.). Es wird aus Darm- und Lungengewebe von Rind oder Schwein gewonnen. Cumarin/Marcumar hingegen ist ein Vitamin-K-Antagonist: Es hemmt die Synthese Vitamin-K-abhängiger Gerinnungsfaktoren in der Leber – dieser Effekt tritt erst nach 24–48 h ein. ASS hemmt die Thrombozytenaggregation; Kombination ASS + Marcumar erhöht das GI-Blutungsrisiko."
      }
    },
    harvestQuestions: [
      {
        id: "haemostase_h1",
        type: "mc",
        question: "Welcher Faktor vermittelt die Adhäsion von Thrombozyten an der verletzten Gefäßwand?",
        options: [
          { text: "Von-Willebrand-Faktor", correct: true },
          { text: "Thrombokinase", correct: false },
          { text: "Fibrinogen", correct: false },
          { text: "Prothrombin", correct: false }
        ],
        explanation: "Der von-Willebrand-Faktor (vWF) bindet an den GP-Ib-Rezeptor der Thrombozyten und vermittelt deren Adhäsion an freigelegtes Kollagen der verletzten Gefäßwand – erster Schritt der primären Hämostase."
      },
      {
        id: "haemostase_h2",
        type: "true_false",
        statement: "Bei der Blutgerinnung nach Morawitz entsteht aus Fibrinogen durch Thrombin das unlösliche Fibrin.",
        answer: true,
        explanation: "Thrombin (gebildet aus Prothrombin durch Thrombokinase + Ca²⁺) spaltet Fibrinogen zu Fibrin. Fibrin polymerisiert und bildet das Gerüst des roten, stabilen Thrombus."
      },
      {
        id: "haemostase_h3",
        type: "mc",
        question: "Welche Gerinnungsstörung entsteht durch Vitamin-K-Mangel?",
        options: [
          { text: "Hypoprothrombinämie (Faktor-II-Mangel)", correct: true },
          { text: "Hämophilie A (Faktor-VIII-Mangel)", correct: false },
          { text: "Afibrinogenämie (Faktor-I-Mangel)", correct: false },
          { text: "Hagemann-Syndrom (Faktor-XII-Mangel)", correct: false }
        ],
        explanation: "Prothrombin (Faktor II) wird Vitamin-K-abhängig in der Leber synthetisiert. Vitamin-K-Mangel → Hypoprothrombinämie. Hämophilie A und B sind angeboren (X-chromosomal), Afibrinogenämie (Faktor I) und Hagemann-Syndrom (Faktor XII) ebenfalls angeboren."
      },
      {
        id: "haemostase_h4",
        type: "mc",
        question: "Wie wirkt Natriumcitrat als Gerinnungshemmer im Labor?",
        options: [
          { text: "Es bildet einen Komplex mit Ca²⁺ und entzieht es der Gerinnung", correct: true },
          { text: "Es hemmt die Thrombozytenaggregation wie ASS", correct: false },
          { text: "Es aktiviert Antithrombin III", correct: false },
          { text: "Es blockiert die Vitamin-K-abhängige Synthese", correct: false }
        ],
        explanation: "Natriumcitrat (und EDTA) bilden Komplexe mit Ca²⁺-Ionen, die für die Blutgerinnung unentbehrlich sind → Gerinnung wird verhindert. Einsatz in BSG-Röhrchen und Gerinnungsdiagnostik."
      },
      {
        id: "haemostase_h5",
        type: "true_false",
        statement: "Die Fibrinolyse löst überschüssige Fibrinmengen auf und muss im Gleichgewicht zur Fibrinbildung stehen.",
        answer: true,
        explanation: "Fibrinolyse (Plasmin löst Fibrin auf) verhindert übermäßige Gerinnselbildung und hält Gefäße durchgängig. Steht sie im Gleichgewicht mit der Gerinnung, bleibt das Hämostasesystem funktionsfähig."
      }
    ],
    phase4Questions: [
      {
        id: "haemostase_mc1",
        type: "mc",
        question: "Welche Aussagen zur primären und sekundären Hämostase sind korrekt?",
        options: [
          { text: "Primäre Hämostase dauert 1–3 Min und endet im weißen Thrombus", correct: true },
          { text: "Der von-Willebrand-Faktor vermittelt die Thrombozytenadhäsion", correct: true },
          { text: "Extrinsische Aktivierung verläuft langsamer als intrinsische", correct: false },
          { text: "Fibrinogen wird durch Thrombin zu Fibrin umgewandelt", correct: true }
        ]
      },
      {
        id: "haemostase_mc2",
        type: "mc",
        question: "Welche Aussagen zu Antikoagulantien treffen zu?",
        options: [
          { text: "Heparin wirkt direkt und sofort auf Gerinnungsfaktoren", correct: true },
          { text: "Cumarin/Marcumar ist ein Vitamin-K-Antagonist", correct: true },
          { text: "ASS hemmt die Thrombozytenaggregation", correct: true },
          { text: "Natriumcitrat aktiviert Antithrombin III", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "blutgruppen_rhesus",
    title: "Blutgruppen: ABO-System und Rhesus-System",
    contextHint: "Studienbrief 1037 Blut – Blutgruppen",
    phase1: {
      soil: {
        statement: "Blutgruppe 0 (H) ist der frühere Universalspender, weil auf den Erythrozyten keine A- oder B-Antigene vorhanden sind.",
        answer: true,
        solution: "Das ABO-System (Landsteiner 1901) teilt Menschen in 4 Blutgruppen ein: A (Antikörper anti-B im Plasma), B (Antikörper anti-A), AB (keine Antikörper = Universalempfänger), 0/H (Antikörper anti-A und anti-B = früher Universalspender). Agglutinogene (Antigene) sitzen auf den Erythrozyten, Agglutinine (Antikörper) im Plasma. Vor jeder Transfusion sind Kreuzprobe und Bedside-Test obligat."
      },
      seed: {
        statement: "Rh-Antikörper entstehen bei Rh-negativen Personen spontan ohne vorherigen Kontakt mit Rh-positivem Blut.",
        answer: false,
        solution: "Rh-Antikörper (anti-D) entstehen nur nach Exposition gegenüber Rh-positivem Blut (Sensibilisierung). Rh+ bedeutet: Agglutinogen D auf den Erythrozyten vorhanden (85 % der Bevölkerung); Rh- fehlt D (15 %). Erythroblastosis fetalis: Rh-negative Mutter, Rh-positives Kind → ab der 2. Schwangerschaft bildet die Mutter anti-D, das plazentagängige IgG zerstört die Erythrozyten des Kindes → lebensgefährlich. Anti-D-Prophylaxe: 28.–30. SSW + nach Geburt."
      },
      water: {
        statement: "Blutgruppe AB ist der universelle Empfänger, weil keine Antikörper gegen A oder B im Plasma vorhanden sind.",
        answer: true,
        solution: "Menschen mit Blutgruppe AB haben beide Antigene (A und B) auf ihren Erythrozyten und daher keine entsprechenden Antikörper im Plasma. Sie können prinzipiell alle Erythrozytenkonzentrate erhalten. Blutgruppe 0 hat keine A/B-Antigene → kein Angriffsziel für fremde Antikörper → früher als Universalspender bezeichnet (heute werden nur gruppengleiche Konserven transfundiert)."
      }
    },
    harvestQuestions: [
      {
        id: "blutgruppen_h1",
        type: "mc",
        question: "Welche Antikörper befinden sich im Plasma einer Person mit Blutgruppe A?",
        options: [
          { text: "Anti-B", correct: true },
          { text: "Anti-A", correct: false },
          { text: "Anti-A und Anti-B", correct: false },
          { text: "Keine Antikörper", correct: false }
        ],
        explanation: "Bei Blutgruppe A sitzen A-Antigene auf den Erythrozyten; im Plasma befinden sich Anti-B-Antikörper. Bei Blutgruppe 0 sind beide Antikörper vorhanden."
      },
      {
        id: "blutgruppen_h2",
        type: "true_false",
        statement: "Erythroblastosis fetalis tritt bereits bei der ersten Schwangerschaft einer Rh-negativen Mutter mit einem Rh-positiven Kind auf.",
        answer: false,
        explanation: "Bei der ersten Schwangerschaft erfolgt nur die Sensibilisierung (Bildung von Anti-D nach Blutkontakt bei Geburt). Ab der zweiten Schwangerschaft mit Rh-positivem Kind greifen die mütterlichen IgG-Antikörper die kindlichen Erythrozyten an → Erythroblastosis fetalis."
      },
      {
        id: "blutgruppen_h3",
        type: "mc",
        question: "Wann wird die Anti-D-Prophylaxe bei Rh-negativen Schwangeren gegeben?",
        options: [
          { text: "28.–30. SSW und direkt nach der Geburt", correct: true },
          { text: "Nur im 1. Trimester", correct: false },
          { text: "Nur direkt nach der Geburt", correct: false },
          { text: "Gar nicht – nur bei tatsächlicher Sensibilisierung", correct: false }
        ],
        explanation: "Die Anti-D-Prophylaxe (Gabe von Anti-D-Immunglobulin) wird vorbeugend in der 28.–30. SSW und erneut direkt nach der Geburt eines Rh-positiven Kindes gegeben."
      },
      {
        id: "blutgruppen_h4",
        type: "mc",
        question: "Was ist der Unterschied zwischen Agglutinogen und Agglutinin?",
        options: [
          { text: "Agglutinogene sind Antigene auf Erythrozyten, Agglutinine sind Antikörper im Plasma", correct: true },
          { text: "Beide sitzen auf den Erythrozyten", correct: false },
          { text: "Agglutinine sind Antigene, Agglutinogene Antikörper", correct: false },
          { text: "Agglutinogene kommen nur im Plasma vor", correct: false }
        ],
        explanation: "Agglutinogene (Antigene A/B) sitzen auf den Erythrozyten. Agglutinine (Antikörper anti-A/anti-B) befinden sich im Plasma – sie agglutinieren (verklumpen) die Erythrozyten bei falscher Blutgruppe."
      },
      {
        id: "blutgruppen_h5",
        type: "true_false",
        statement: "Das ABO-System wurde 1901 von Karl Landsteiner entdeckt.",
        answer: true,
        explanation: "Karl Landsteiner entdeckte 1901 das ABO-Blutgruppensystem und erhielt dafür 1930 den Nobelpreis für Medizin."
      }
    ],
    phase4Questions: [
      {
        id: "blutgruppen_mc1",
        type: "mc",
        question: "Welche Aussagen zum ABO-System sind korrekt?",
        options: [
          { text: "Blutgruppe AB hat keine Antikörper und ist der universelle Empfänger", correct: true },
          { text: "Agglutinogene sind Antigene auf den Erythrozyten", correct: true },
          { text: "Blutgruppe 0 hat A- und B-Antigene auf den Erythrozyten", correct: false },
          { text: "Vor Transfusionen sind Kreuzprobe und Bedside-Test obligat", correct: true }
        ]
      },
      {
        id: "blutgruppen_mc2",
        type: "mc",
        question: "Welche Aussagen zum Rhesus-System und zur Erythroblastosis fetalis treffen zu?",
        options: [
          { text: "Rh-Antikörper entstehen nur nach Exposition gegenüber Rh-positivem Blut", correct: true },
          { text: "Erythroblastosis fetalis kann ab der zweiten Schwangerschaft auftreten", correct: true },
          { text: "85 % der Bevölkerung sind Rh-negativ", correct: false },
          { text: "Anti-D-Prophylaxe wird in der 28.–30. SSW und nach der Geburt gegeben", correct: true }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "abwehr_unspezifisch",
    title: "Unspezifische Abwehr: zelluläre und humorale Mechanismen",
    contextHint: "Studienbrief 1037 Blut – Abwehr unspezifisch",
    phase1: {
      soil: {
        statement: "Das Komplementsystem kann Bakterien direkt lysieren und fördert durch Opsonierung die Phagozytose.",
        answer: true,
        solution: "Die unspezifische humorale Abwehr umfasst: Komplementsystem (Kaskade von >20 Proteinen → lytische Komplexe zerstören Bakterienmembranen direkt; Opsonierung markiert Pathogene für Phagozytose; Chemotaxis lockt Phagozyten an); Zytokine (Interleukine stimulieren Immunzellen, Interferone hemmen Virusreplikation, TNF aktiviert Entzündung); Akute-Phase-Reaktion (CRP steigt innerhalb von Stunden bis zu 1000-fach an Zeichen systemischer Entzündung)."
      },
      seed: {
        statement: "NK-Zellen (Natürliche Killerzellen) erkennen Bakterien durch spezifische Antikörper und gehören zur spezifischen Abwehr.",
        answer: false,
        solution: "NK-Zellen gehören zur unspezifischen zellulären Abwehr – sie brauchen keine vorherige Sensibilisierung und keine spezifischen Antikörper. Sie erkennen virusinfizierte und entartete (tumoröse) Zellen, die weniger MHC-I-Moleküle exprimieren, und töten sie durch Zytotoxine (Perforin, Granzyme). Das mononukleäre Phagozytensystem (MMS) umfasst: Mikroglia (ZNS), Alveolar-Makrophagen (Lunge), Kupffer-Zellen (Leber), Osteoklasten (Knochen), dendritische Zellen."
      },
      water: {
        statement: "CRP (C-reaktives Protein) steigt bei systemischen Entzündungen innerhalb von Stunden um das bis zu 1000-fache an.",
        answer: true,
        solution: "CRP ist ein Akute-Phase-Protein, das in der Leber produziert wird. Es ist ein empfindlicher Marker für Entzündungen, Infektionen und Gewebeschäden. Der Anstieg erfolgt innerhalb von 6–12 h nach dem Entzündungsreiz. Das unspezifische Abwehrsystem ist angeboren, schnell reaktiv und hat kein immunologisches Gedächtnis."
      }
    },
    harvestQuestions: [
      {
        id: "abwehr_unspezifisch_h1",
        type: "mc",
        question: "Welche Zellen gehören zum mononukleären Phagozytensystem (MMS)?",
        options: [
          { text: "Mikroglia, Kupffer-Zellen, Alveolar-Makrophagen, Osteoklasten", correct: true },
          { text: "Neutrophile, Eosinophile, Basophile", correct: false },
          { text: "T-Helferzellen, B-Lymphozyten, NK-Zellen", correct: false },
          { text: "Thrombozyten, Erythrozyten, Monozyten", correct: false }
        ],
        explanation: "Das MMS umfasst gewebsständige Makrophagen: Mikroglia (ZNS), Alveolar-Makrophagen (Lunge), Kupffer-Zellen (Leber), Osteoklasten (Knochen), dendritische Zellen – alle entstammen Monozyten-Vorläufern."
      },
      {
        id: "abwehr_unspezifisch_h2",
        type: "true_false",
        statement: "Interferone hemmen die Replikation von Viren in infizierten Zellen.",
        answer: true,
        explanation: "Interferone (Typ I: IFN-α, IFN-β) werden von virusinfizierten Zellen freigesetzt und signalisieren Nachbarzellen, einen antiviralen Zustand einzunehmen, der Virusreplikation hemmt."
      },
      {
        id: "abwehr_unspezifisch_h3",
        type: "mc",
        question: "Was ist Opsonierung im Rahmen des Komplementsystems?",
        options: [
          { text: "Markierung von Pathogenen, um die Phagozytose durch Makrophagen zu erleichtern", correct: true },
          { text: "Direkte Lyse von Bakterienmembranen", correct: false },
          { text: "Anlockung von Makrophagen durch Chemokine", correct: false },
          { text: "Aktivierung von NK-Zellen", correct: false }
        ],
        explanation: "Opsonierung bedeutet, dass Komplementfragmente (C3b) an Pathogene binden und diese für Phagozyten 'erkennbarer' machen. Daneben lysiert das Komplementsystem Bakterien direkt und wirkt chemotaktisch."
      },
      {
        id: "abwehr_unspezifisch_h4",
        type: "mc",
        question: "Welche Eigenschaft unterscheidet die unspezifische von der spezifischen Abwehr?",
        options: [
          { text: "Unspezifische Abwehr hat kein Gedächtnis und ist angeboren", correct: true },
          { text: "Unspezifische Abwehr bildet Antikörper", correct: false },
          { text: "Unspezifische Abwehr ist langsamer als die spezifische", correct: false },
          { text: "Unspezifische Abwehr erkennt spezifische Antigene", correct: false }
        ],
        explanation: "Die unspezifische Abwehr ist angeboren, schnell und kennt kein immunologisches Gedächtnis. Sie unterscheidet nicht zwischen verschiedenen Erregern. Die spezifische Abwehr ist langsamer, hochspezifisch und bildet Gedächtniszellen."
      },
      {
        id: "abwehr_unspezifisch_h5",
        type: "true_false",
        statement: "NK-Zellen töten virusinfizierte Zellen ohne vorherige Sensibilisierung.",
        answer: true,
        explanation: "NK-Zellen (Natürliche Killerzellen) sind Teil der unspezifischen Abwehr. Sie erkennen Zellen mit fehlendem oder reduziertem MHC-I (wie virusinfizierte oder Tumorzellen) und töten sie durch Perforin und Granzyme."
      }
    ],
    phase4Questions: [
      {
        id: "abwehr_unspezifisch_mc1",
        type: "mc",
        question: "Welche Aussagen zur unspezifischen Abwehr sind korrekt?",
        options: [
          { text: "Das Komplementsystem lysiert Bakterien direkt und fördert Phagozytose durch Opsonierung", correct: true },
          { text: "NK-Zellen erkennen Tumorzellen ohne vorherige Sensibilisierung", correct: true },
          { text: "CRP ist ein spezifischer Antikörper gegen bestimmte Bakterien", correct: false },
          { text: "Unspezifische Abwehr hat kein immunologisches Gedächtnis", correct: true }
        ]
      },
      {
        id: "abwehr_unspezifisch_mc2",
        type: "mc",
        question: "Welche Zellen und Strukturen gehören zur unspezifischen zellulären Abwehr?",
        options: [
          { text: "Neutrophile Granulozyten (Phagozytose)", correct: true },
          { text: "Makrophagen (MMS – Mikroglia, Kupffer-Zellen, Alveolar-Makrophagen)", correct: true },
          { text: "Plasmazellen (Antikörperproduktion)", correct: false },
          { text: "NK-Zellen (Zytotoxine gegen infizierte Zellen)", correct: true }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "abwehr_spezifisch",
    title: "Spezifische Abwehr: T- und B-Lymphozyten, Immunglobuline",
    contextHint: "Studienbrief 1037 Blut – Abwehr spezifisch",
    phase1: {
      soil: {
        statement: "B-Lymphozyten differenzieren sich zu Plasmazellen, die spezifische Antikörper (Immunglobuline) produzieren.",
        answer: true,
        solution: "Die spezifisch humorale Abwehr (Soforttyp): B-Lymphozyten werden im Knochenmark geprägt. Bei Antigenkontakt → Aktivierung → Differenzierung zu Plasmazellen (Antikörperproduktion) und B-Gedächtniszellen. Es gibt 5 Immunglobulinklassen: IgA (Schleimhaut, Speichel, Muttermilch; nicht plazentagängig), IgM (primäre Immunantwort, erstes Ig das gebildet wird), IgG (sekundäre Immunantwort, plazentagängig → Nestschutz für Neugeborene), IgE (Allergien, Parasiten), IgD (Antigenrezeptor auf B-Zellen)."
      },
      seed: {
        statement: "T-Helferzellen erkennen Antigene direkt ohne MHC-Moleküle und aktivieren die Immunantwort.",
        answer: false,
        solution: "T-Lymphozyten werden im Thymus geprägt und besitzen T-Zell-Rezeptoren (TCR). Sie erkennen Antigene ausschließlich im Kontext von MHC-Molekülen (MHC = Major Histocompatibility Complex) – T-Helferzellen (CD4⁺) erkennen Antigene auf MHC-II. Die 4 T-Lymphozyten-Subtypen: T-Gedächtniszellen (Schnellreaktion bei erneutem Kontakt), T-Helferzellen (aktivieren Makrophagen, fördern Antikörperproduktion), T-Suppressorzellen/Tregs (regulieren Immunantwort), Zytotoxische T-Zellen (CD8⁺, töten infizierte Zellen direkt)."
      },
      water: {
        statement: "IgG ist das einzige Immunglobulin, das die Plazenta passieren kann und dem Neugeborenen Nestschutz verleiht.",
        answer: true,
        solution: "IgG macht den größten Anteil der Immunglobuline im Serum aus und ist plazentagängig: Mütterliches IgG wird aktiv auf das Kind übertragen und schützt das Neugeborene in den ersten Lebensmonaten (Nestschutz), bis es eigene Antikörper bildet. IgA kommt v. a. in Schleimhautsekreten und Muttermilch vor (Kolostrum), ist jedoch nicht plazentagängig."
      }
    },
    harvestQuestions: [
      {
        id: "abwehr_spezifisch_h1",
        type: "mc",
        question: "Welches Immunglobulin ist als erstes bei einer primären Immunantwort nachweisbar?",
        options: [
          { text: "IgM", correct: true },
          { text: "IgG", correct: false },
          { text: "IgA", correct: false },
          { text: "IgE", correct: false }
        ],
        explanation: "IgM ist das erste Immunglobulin, das nach Erstkontakt mit einem Antigen gebildet wird (primäre Immunantwort). IgG dominiert bei der sekundären (Gedächtnis-)Immunantwort."
      },
      {
        id: "abwehr_spezifisch_h2",
        type: "true_false",
        statement: "T-Lymphozyten werden im Knochenmark geprägt, B-Lymphozyten im Thymus.",
        answer: false,
        explanation: "Umgekehrt: T-Lymphozyten werden im Thymus geprägt (Thymopoese), B-Lymphozyten im Knochenmark (beim Fetus auch in der Bursa Fabricii bei Vögeln – daher 'B-Lymphozyten')."
      },
      {
        id: "abwehr_spezifisch_h3",
        type: "mc",
        question: "Welche Immunglobulinklasse ist mit Allergien und Parasitenabwehr assoziiert?",
        options: [
          { text: "IgE", correct: true },
          { text: "IgM", correct: false },
          { text: "IgG", correct: false },
          { text: "IgD", correct: false }
        ],
        explanation: "IgE bindet an Mastzellen und basophile Granulozyten. Bei Kontakt mit Allergen → Histaminfreisetzung → allergische Reaktion. IgE spielt auch eine Rolle bei der Parasitenabwehr."
      },
      {
        id: "abwehr_spezifisch_h4",
        type: "mc",
        question: "Welche Funktion haben regulatorische T-Zellen (Tregs)?",
        options: [
          { text: "Sie dämpfen die Immunantwort und verhindern Überreaktionen", correct: true },
          { text: "Sie aktivieren Makrophagen und steigern die Antikörperproduktion", correct: false },
          { text: "Sie töten virusinfizierte Zellen direkt", correct: false },
          { text: "Sie produzieren Immunglobuline", correct: false }
        ],
        explanation: "Regulatorische T-Zellen (Tregs, früher T-Suppressorzellen) dämpfen überschießende Immunantworten und sind wichtig für die Selbsttoleranz (Verhinderung von Autoimmunerkrankungen)."
      },
      {
        id: "abwehr_spezifisch_h5",
        type: "true_false",
        statement: "IgA schützt Schleimhäute und kommt in Muttermilch vor, kann aber die Plazenta nicht passieren.",
        answer: true,
        explanation: "IgA (sekretorisches IgA) findet sich in Tränen, Speichel, Schleimhautsekreten und Kolostrum/Muttermilch. Es ist nicht plazentagängig – Nestschutz wird durch IgG (plazentagängig) vermittelt."
      }
    ],
    phase4Questions: [
      {
        id: "abwehr_spezifisch_mc1",
        type: "mc",
        question: "Welche Aussagen zu Immunglobulinen sind korrekt?",
        options: [
          { text: "IgG ist plazentagängig und vermittelt Nestschutz beim Neugeborenen", correct: true },
          { text: "IgM ist das erste Immunglobulin der primären Immunantwort", correct: true },
          { text: "IgE vermittelt allergische Reaktionen über Mastzellen", correct: true },
          { text: "IgA ist plazentagängig und schützt das Neugeborene", correct: false }
        ]
      },
      {
        id: "abwehr_spezifisch_mc2",
        type: "mc",
        question: "Welche Aussagen zu T-Lymphozyten sind korrekt?",
        options: [
          { text: "T-Lymphozyten werden im Thymus geprägt", correct: true },
          { text: "T-Helferzellen aktivieren Makrophagen und fördern die Antikörperproduktion", correct: true },
          { text: "Zytotoxische T-Zellen produzieren Antikörper", correct: false },
          { text: "T-Gedächtniszellen ermöglichen eine schnellere Reaktion beim Zweitkontakt", correct: true }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "impfungen_immunisierung",
    title: "Impfungen: aktiv, passiv und Simultanimpfung",
    contextHint: "Studienbrief 1037 Blut – Impfungen",
    phase1: {
      soil: {
        statement: "Die aktive Immunisierung induziert Antikörper und Gedächtniszellen, wodurch ein langfristiger Impfschutz entsteht.",
        answer: true,
        solution: "Aktive Immunisierung: Applikation eines Antigens (Impfstoff) → Körper bildet selbst Antikörper + Gedächtniszellen → Langzeitschutz. Impfstofftypen: Lebendimpfstoff (abgeschwächte Erreger, stärkste Immunantwort; Masern, Mumps, Röteln, Polio oral), Totimpfstoff (abgetötete Erreger; Polio inaktiviert, Hepatitis A), Toxoidimpfstoff (inaktivierte Toxine; Tetanus, Diphtherie), mRNA-Impfstoff (SARS-CoV-2), Vektorimpfstoff (Virushülle trägt fremdes Antigen; SARS-CoV-2). Impfschäden sind meldepflichtig; nur Ärzte dürfen impfen."
      },
      seed: {
        statement: "Die passive Immunisierung bietet dauerhaften Schutz, weil der Körper selbst Antikörper bildet.",
        answer: false,
        solution: "Passive Immunisierung: Applikation von Hyperimmunserum (fertige Antikörper von extern) → Sofortschutz, aber nur kurzfristig (Halbwertszeit der Antikörper ~3–4 Wochen), kein immunologisches Gedächtnis. Indikationen: Tetanus (nach Verletzung ohne Impfschutz), Tollwut, Botulismus, Schlangenbiss. Die Simultanimpfung kombiniert aktive und passive Immunisierung gleichzeitig – z. B. bei Tetanus-Wunde ohne Impfschutz: Sofortschutz durch Antikörper + Langzeitschutz durch Impfstoff."
      },
      water: {
        statement: "Bei der Simultanimpfung werden aktive und passive Immunisierung gleichzeitig gegeben, um Sofort- und Langzeitschutz zu kombinieren.",
        answer: true,
        solution: "Die Simultanimpfung nutzt den Vorteil beider Strategien: Passive Antikörper schützen sofort (z. B. bei frischer Verletzung), während der Impfstoff eine aktive Immunantwort mit Gedächtnisbildung anregt. Anwendung z. B. bei Tetanus, Tollwut oder Hepatitis B nach Exposition."
      }
    },
    harvestQuestions: [
      {
        id: "impfungen_h1",
        type: "mc",
        question: "Welcher Impfstofftyp enthält abgeschwächte, noch vermehrungsfähige Erreger?",
        options: [
          { text: "Lebendimpfstoff", correct: true },
          { text: "Totimpfstoff", correct: false },
          { text: "Toxoidimpfstoff", correct: false },
          { text: "mRNA-Impfstoff", correct: false }
        ],
        explanation: "Lebendimpfstoffe enthalten attenuierte (abgeschwächte) Erreger, die sich im Körper begrenzt vermehren → stärkste Immunantwort. Beispiele: MMR (Masern, Mumps, Röteln), Varizellen, orale Polio."
      },
      {
        id: "impfungen_h2",
        type: "true_false",
        statement: "Passive Immunisierung hinterlässt kein immunologisches Gedächtnis.",
        answer: true,
        explanation: "Bei passiver Immunisierung werden fertige Antikörper zugeführt (Hyperimmunserum). Der Körper bildet keine eigenen Antikörper und keine Gedächtniszellen → Schutz ist auf die Halbwertszeit der übertragenen Antikörper begrenzt."
      },
      {
        id: "impfungen_h3",
        type: "mc",
        question: "Bei welcher Erkrankung wird eine Simultanimpfung eingesetzt?",
        options: [
          { text: "Tetanus nach Verletzung ohne ausreichenden Impfschutz", correct: true },
          { text: "Saisonale Grippe zur Prophylaxe", correct: false },
          { text: "Masern-Routineimpfung im Säuglingsalter", correct: false },
          { text: "COVID-19-Erstimpfung", correct: false }
        ],
        explanation: "Bei Tetanus-Wunden ohne ausreichenden Impfschutz werden gleichzeitig Antikörper (Hyperimmunserum, Sofortschutz) und Impfstoff (aktive Immunisierung, Langzeitschutz) gegeben → Simultanimpfung."
      },
      {
        id: "impfungen_h4",
        type: "mc",
        question: "Was enthält ein Toxoidimpfstoff?",
        options: [
          { text: "Inaktivierte bakterielle Toxine", correct: true },
          { text: "Abgeschwächte Lebendkeime", correct: false },
          { text: "mRNA für ein Erregerprotein", correct: false },
          { text: "Abgetötete Viren", correct: false }
        ],
        explanation: "Toxoidimpfstoffe enthalten chemisch oder thermisch inaktivierte Toxine (Toxoide). Sie induzieren Antitoxin-Antikörper. Beispiele: Tetanus- und Diphtherieimpfstoff."
      },
      {
        id: "impfungen_h5",
        type: "true_false",
        statement: "Impfschäden sind in Deutschland meldepflichtig, und das Impfen ist Ärzten vorbehalten.",
        answer: true,
        explanation: "Nach dem Infektionsschutzgesetz (IfSG) sind Impfschäden meldepflichtig. Das Impfen selbst ist ein ärztlicher Eingriff (Heilkunde) und darf nur von approbierten Ärzten durchgeführt werden."
      }
    ],
    phase4Questions: [
      {
        id: "impfungen_mc1",
        type: "mc",
        question: "Welche Aussagen zur aktiven Immunisierung sind korrekt?",
        options: [
          { text: "Es entstehen Gedächtniszellen → Langzeitschutz", correct: true },
          { text: "Lebendimpfstoffe enthalten abgeschwächte, noch vermehrungsfähige Erreger", correct: true },
          { text: "Aktive Immunisierung bietet sofortigen Schutz wie Hyperimmunserum", correct: false },
          { text: "Toxoidimpfstoffe enthalten inaktivierte Toxine (z. B. Tetanus, Diphtherie)", correct: true }
        ]
      },
      {
        id: "impfungen_mc2",
        type: "mc",
        question: "Welche Aussagen zur passiven Immunisierung und Simultanimpfung treffen zu?",
        options: [
          { text: "Passive Immunisierung schützt sofort, aber nur kurzfristig", correct: true },
          { text: "Simultanimpfung kombiniert aktive und passive Immunisierung", correct: true },
          { text: "Passive Immunisierung bildet Gedächtniszellen für Langzeitschutz", correct: false },
          { text: "Hyperimmunserum wird u. a. bei Tetanus, Tollwut und Schlangenbiss eingesetzt", correct: true }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "allergien_ueberempfindlichkeit",
    title: "Allergien: 4 Überempfindlichkeitstypen nach Coombs und Gell",
    contextHint: "Studienbrief 1037 Blut – Allergien",
    phase1: {
      soil: {
        statement: "Der anaphylaktische Schock ist die gefährlichste Manifestation einer Typ-I-Allergie und kann lebensbedrohlich sein.",
        answer: true,
        solution: "Typ I (Soforttyp): Sekunden bis Minuten; vermittelt durch IgE auf Mastzellen → Histaminfreisetzung; klinisch: Heuschnupfen, allergisches Asthma, Nahrungsmittelallergie, Anaphylaxie. Der anaphylaktische Schock ist die schwerste Reaktion: systemische Histaminausschüttung → Vasodilatation → Blutdruckabfall, Bronchospasmus, Angioödem → lebensbedrohlich. Behandlung: Adrenalin i.m."
      },
      seed: {
        statement: "Kontaktekzeme und Transplantatabstoßung sind typische Reaktionen des Allergie-Typ II.",
        answer: false,
        solution: "Kontaktekzeme und Transplantatabstoßung sind Typ-IV-Reaktionen (verzögerter Typ): Reaktion nach 12–72 h, vermittelt durch T-Lymphozyten und Zytokine – keine Antikörper beteiligt. Typ II (zytotoxisch): 6–12 h, IgG/IgM + Komplement/Makrophagen → Zellzerstörung; klinisch: Agranulozytose, Thrombozytopenie, Transfusionshämolyse. Typ III (Immunkomplextyp/Arthus): Minuten bis Stunden, IgG/IgM-Komplexe in Kapillarwand → Komplementaktivierung; klinisch: rheumatisches Fieber, Glomerulonephritis, Vogelzüchterlunge."
      },
      water: {
        statement: "Typ-III-Allergien entstehen durch Ablagerung von Immunkomplexen in Kapillarwänden und können zu Glomerulonephritis führen.",
        answer: true,
        solution: "Typ III (Immunkomplextyp, Arthus-Reaktion): Antigen-Antikörper-Komplexe (IgG/IgM) lagern sich in den Wänden kleiner Blutgefäße ab → Komplementaktivierung → Entzündung, Kapillarschäden. Klinische Beispiele: Rheumatisches Fieber (nach Streptokokken), Glomerulonephritis, Serumsenkheitsreaktion, Vogelzüchterlunge. Reaktion tritt Minuten bis Stunden nach Antigenexposition auf."
      }
    },
    harvestQuestions: [
      {
        id: "allergien_h1",
        type: "mc",
        question: "Durch welchen Antikörpertyp und welche Zellen wird die Typ-I-Allergie vermittelt?",
        options: [
          { text: "IgE auf Mastzellen → Histaminfreisetzung", correct: true },
          { text: "IgG/IgM über Komplement → Zellzerstörung", correct: false },
          { text: "T-Lymphozyten → Zytokinausschüttung", correct: false },
          { text: "IgG/IgM-Komplexe in Gefäßwänden → Entzündung", correct: false }
        ],
        explanation: "Typ I (Soforttyp): IgE-Antikörper binden an Mastzellen. Bei erneutem Allergenkontakt → Quervernetzung von IgE → Degranulation: Histamin, Prostaglandine, Leukotriene werden freigesetzt → allergische Symptome."
      },
      {
        id: "allergien_h2",
        type: "true_false",
        statement: "Typ-IV-Allergien treten 12–72 h nach Allergenkontakt auf und werden durch T-Lymphozyten vermittelt.",
        answer: true,
        explanation: "Typ IV (verzögerter Typ, delayed-type hypersensitivity): keine Antikörper beteiligt, sondern sensibilisierte T-Lymphozyten und Makrophagen. Reaktion nach 12–72 h. Beispiele: Kontaktekzem, Tuberkulinreaktion, Transplantatabstoßung."
      },
      {
        id: "allergien_h3",
        type: "mc",
        question: "Welche Erkrankungen sind typische Beispiele für eine Typ-II-Allergie (zytotoxischer Typ)?",
        options: [
          { text: "Agranulozytose, Thrombozytopenie, Transfusionshämolyse", correct: true },
          { text: "Heuschnupfen, Asthma, Anaphylaxie", correct: false },
          { text: "Kontaktekzem, Transplantatabstoßung", correct: false },
          { text: "Glomerulonephritis, Vogelzüchterlunge", correct: false }
        ],
        explanation: "Typ II (zytotoxisch): IgG/IgM + Komplement oder Makrophagen zerstören Zellen, die das Antigen tragen. Klinisch: medikamentös induzierte Agranulozytose/Thrombozytopenie, Transfusionszwischenfälle, Morbus haemolyticus neonatorum."
      },
      {
        id: "allergien_h4",
        type: "mc",
        question: "Was ist die Erstbehandlung beim anaphylaktischen Schock?",
        options: [
          { text: "Adrenalin intramuskulär", correct: true },
          { text: "Antihistaminikum oral", correct: false },
          { text: "Kortison intravenös", correct: false },
          { text: "Salbutamol inhalativ", correct: false }
        ],
        explanation: "Bei Anaphylaxie ist Adrenalin (Epinephrin) i.m. (Oberschenkel) das Mittel der ersten Wahl. Es wirkt vasokonstriktiv (hebt Blutdruck) und bronchospasmolytisch. Antihistaminika und Kortison sind Mittel zweiter Wahl."
      },
      {
        id: "allergien_h5",
        type: "true_false",
        statement: "Vogelzüchterlunge ist ein Beispiel für eine Typ-III-Allergie durch Ablagerung von Immunkomplexen.",
        answer: true,
        explanation: "Vogelzüchterlunge (exogen-allergische Alveolitis) entsteht durch Immunkomplexe aus IgG und Vogelantigenen (Kotproteine), die sich in der Alveolarwand ablagern → Typ-III-Reaktion mit granulomatöser Entzündung."
      }
    ],
    phase4Questions: [
      {
        id: "allergien_mc1",
        type: "mc",
        question: "Welche Aussagen zu Allergie-Typen nach Coombs und Gell sind korrekt?",
        options: [
          { text: "Typ I: IgE auf Mastzellen → Histaminfreisetzung → Sofortreaktion", correct: true },
          { text: "Typ IV: T-Lymphozyten → verzögerte Reaktion 12–72 h", correct: true },
          { text: "Typ III: Ablagerung von Immunkomplexen in Gefäßwänden", correct: true },
          { text: "Kontaktekzeme entstehen durch Typ-I-Reaktion", correct: false }
        ]
      },
      {
        id: "allergien_mc2",
        type: "mc",
        question: "Welche Aussagen zum anaphylaktischen Schock und Typ-II-Allergie treffen zu?",
        options: [
          { text: "Anaphylaxie ist die schwerste Form des Allergie-Typ I", correct: true },
          { text: "Adrenalin i.m. ist die Erstbehandlung beim anaphylaktischen Schock", correct: true },
          { text: "Typ II wird durch T-Lymphozyten vermittelt", correct: false },
          { text: "Transfusionshämolyse kann eine Typ-II-Reaktion sein", correct: true }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "lymphsystem_organe",
    title: "Lymphsystem: Gefäße, Organe und Tonsillen",
    contextHint: "Studienbrief 1037 Lymphsystem – Gefäße und Organe",
    phase1: {
      soil: {
        statement: "Der Ductus thoracicus ist der größte Lymphgang und mündet in den linken oberen Venenwinkel.",
        answer: true,
        solution: "Das Lymphgefäßsystem transportiert täglich 2–3 Liter Lymphe zurück ins Blut. Lymphgefäße beginnen blind in Kapillargebieten und besitzen Klappen. Der Ductus thoracicus (Milchbrustgang) ist der größte Lymphgang; er sammelt Lymphe aus Beinen, Becken, Bauch und der linken oberen Körperhälfte. Er beginnt an der Cisterna chyli (Höhe Zwerchfell) und mündet in den linken Angulus venosus (linker oberer Venenwinkel, wo V. jugularis interna und V. subclavia zusammentreffen). Der Ductus lymphaticus dexter sammelt Lymphe aus der rechten Kopf/Hals/Arm-Seite und mündet in den rechten Venenwinkel."
      },
      seed: {
        statement: "Die Milz liegt im rechten Oberbauch und ist das einzige lymphatische Organ, das Blut filtert.",
        answer: false,
        solution: "Die Milz liegt im linken Oberbauch, intraperitoneal, auf Höhe der 9.–11. Rippe (10–12 cm, 150–200 g). Sie ist das einzige lymphatische Organ, das Blut (nicht Lymphe) filtert. Aufgaben: Blutspeicherung (rote Pulpa), Erythrozytenabbau/Blutmauserung (Makrophagen phagozytieren überalterte Erythrozyten), Eisenspeicherung, Abwehr (weiße Pulpa prüft Blut auf Antigene). Bei Milzruptur → Splenektomie."
      },
      water: {
        statement: "Der Waldeyer-Rachenring besteht aus Rachen-, Gaumen- und Zungenmandel und bildet einen lymphatischen Ring am Racheneingang.",
        answer: true,
        solution: "Der Waldeyer-Rachenring bildet eine lymphatische Barriere am Eingang der Atemwege: Rachenmandel (Tonsilla pharyngea, unpaar, am Rachendach/Keilbein), Gaumenmandel (Tonsilla palatina, paarig, zwischen den Gaumenbögen – wird bei Tonsillektomie entfernt), Zungenmandel (Tonsilla lingualis, unpaar, am Zungengrund). Tonsillen sind v. a. in der Kindheit für die Immunentwicklung wichtig. Bei Streptokokken-Tonsillitis besteht die Gefahr einer Sekundärinfektion der Herzklappen (rheumatisches Fieber)."
      }
    },
    harvestQuestions: [
      {
        id: "lymphsystem_h1",
        type: "mc",
        question: "Welche Körperregionen drainiert der Ductus thoracicus?",
        options: [
          { text: "Beine, Becken, Bauch und linke obere Körperhälfte", correct: true },
          { text: "Nur die rechte Körperhälfte", correct: false },
          { text: "Nur Beine und Becken", correct: false },
          { text: "Rechte Kopf/Hals/Arm-Seite", correct: false }
        ],
        explanation: "Der Ductus thoracicus drainiert die gesamte untere Körperhälfte plus die linke obere. Der Ductus lymphaticus dexter ist zuständig für die rechte Kopf/Hals/Arm-Seite."
      },
      {
        id: "lymphsystem_h2",
        type: "true_false",
        statement: "Der Thymus ist auch beim Erwachsenen ein großes aktives Organ, das T-Lymphozyten produziert.",
        answer: false,
        explanation: "Der Thymus ist bei Kindern aktiv (Thymopoese). Mit der Pubertät beginnt die Involution → beim Erwachsenen nur noch haselnussgroßes Fettgewebe. T-Lymphozyten werden weiterhin im Knochenmark gebildet, aber die 'Prägung' (Thymopoese) findet im Thymus statt – die Kapazität nimmt mit dem Alter ab."
      },
      {
        id: "lymphsystem_h3",
        type: "mc",
        question: "Was sind die Hauptaufgaben der Milz?",
        options: [
          { text: "Blutspeicherung, Blutmauserung (Abbau alter Erythrozyten), Abwehr", correct: true },
          { text: "T-Lymphozyten-Prägung und Produktion von Hormonen", correct: false },
          { text: "Fettresorption aus dem Darm", correct: false },
          { text: "Lymphe filtern und in das Blut zurückführen", correct: false }
        ],
        explanation: "Milzfunktionen: rote Pulpa = Blutspeicherung + Abbau überalterter Erythrozyten (Erythrozytengrab) + Eisenspeicherung; weiße Pulpa = Immunabwehr (Antigenprüfung des Blutes). T-Zell-Prägung ist Thymusfunktion."
      },
      {
        id: "lymphsystem_h4",
        type: "mc",
        question: "Welche Mandel wird bei einer Tonsillektomie entfernt?",
        options: [
          { text: "Gaumenmandel (Tonsilla palatina)", correct: true },
          { text: "Rachenmandel (Tonsilla pharyngea)", correct: false },
          { text: "Zungenmandel (Tonsilla lingualis)", correct: false },
          { text: "Alle drei Mandeln werden entfernt", correct: false }
        ],
        explanation: "Tonsillektomie bezeichnet die Entfernung der Gaumenmandeln (Tonsillae palatinae). Die Rachenmandel wird bei Adenotomie entfernt. Zungenmandeln werden sehr selten operiert."
      },
      {
        id: "lymphsystem_h5",
        type: "true_false",
        statement: "Peyer-Plaques und Appendix bilden zusammen das GALT (gut-associated lymphoid tissue).",
        answer: true,
        explanation: "GALT (darmassoziiertes Lymphgewebe) umfasst Peyer-Plaques (Lymphfollikelansammlungen in Jejunum und Ileum) und den Appendix vermiformis – sie bilden eine erste Immunbarriere im Darm."
      }
    ],
    phase4Questions: [
      {
        id: "lymphsystem_mc1",
        type: "mc",
        question: "Welche Aussagen zum Lymphgefäßsystem und Lymphorganen sind korrekt?",
        options: [
          { text: "Der Ductus thoracicus mündet in den linken Angulus venosus", correct: true },
          { text: "Lymphgefäße beginnen blind und besitzen Klappen", correct: true },
          { text: "Die Milz liegt im rechten Oberbauch", correct: false },
          { text: "Täglich werden 2–3 Liter Lymphe ins Blut zurückgeführt", correct: true }
        ]
      },
      {
        id: "lymphsystem_mc2",
        type: "mc",
        question: "Welche Aussagen zu Milz, Thymus und Waldeyer-Rachenring treffen zu?",
        options: [
          { text: "Die Milz baut überalterte Erythrozyten ab (Blutmauserung)", correct: true },
          { text: "Der Thymus involiert in der Pubertät und ist beim Erwachsenen kaum noch aktiv", correct: true },
          { text: "Die Rachenmandel wird bei Tonsillektomie entfernt", correct: false },
          { text: "Peyer-Plaques und Appendix bilden das GALT", correct: true }
        ]
      }
    ]
  })

];
