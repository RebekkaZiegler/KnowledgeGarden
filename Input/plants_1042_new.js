// New plants for HORMONSYSTEM_1042_PLANTS
// Gap 1: Hormondifferenzierung (Kap. 3) – Drüsen-/Neuro-/Gewebshormone; Proteo-/Steroid-/Aminosäurederivate
// Gap 2: Periphere Hormonbildungsstätten (Kap. 6) – Pankreas Insulin/Glukagon, Niere Renin/EPO, Herz ANF, Gonaden, GI-Hormone

  makeDetailedPlant({
    id: "hormondifferenzierung",
    title: "Hormondifferenzierung: Bildungsort und biochemische Klassen",
    contextHint: "Studienbrief 1042 Hormonsystem – Drüsenhormone Neurohormone Gewebshormone Proteohormone Steroidhormone Aminosäurederivate",
    phase1: {
      soil: {
        statement: "Hormone werden nach ihrem Bildungsort in drei Gruppen eingeteilt: Drüsenhormone (endokrine Drüsen ohne Ausführungsgang, z. B. Schilddrüse, NNR, Pankreas-Inselzellen), Neurohormone (spezialisierte Nervenzellen, Beispiel: Hypothalamus) und Gewebshormone (einzelne Zellen in Gewebekomplexen ohne zentrale Steuerung, z. B. Gastrin, Sekretin, Östrogen, Renin).",
        answer: true,
        solution: "Drüsenhormone: gebildet an endokrinen Bildungsstätten ohne Ausführungsgang (Schilddrüse, NNR, Hypophysenvorderlappen, Epiphyse, Pankreas-Langerhans-Inseln). Neurohormone: primär in Nervenzellen hergestellt (Hypothalamus → RH/IH). Gewebshormone: einzelne Zellen in einem Gewebekomplex, kommen OHNE zentrale Hypothalamus-Steuerung zum Einsatz und reagieren direkt auf lokale Reize — Beispiele: Magenschleimhaut → Gastrin; Duodenalschleimhaut → Sekretin, CCK; Ovar → Östrogen, Progesteron; Niere → Renin."
      },
      seed: {
        statement: "Steroidhormone bestehen aus Aminosäureketten (Polypeptiden) und werden als Proteohormone bezeichnet; typische Beispiele sind Cortisol und Testosteron.",
        answer: false,
        solution: "Doppelt falsch: Proteohormone sind aus Aminosäureketten (Polypeptiden) aufgebaut — z. B. Insulin, Glukagon, alle Hypophysenhormone. STEROIDhormone hingegen besitzen eine völlig andere Grundstruktur: das tetrazyklische Gonan-Ringsystem (drei Sechser-Ringe, ein Fünfer-Ring) mit Cholesterin als Muttersubstanz. Aus diesem Grundgerüst wird die ganze Palette der Steroide aufgebaut — Cortisol, Cortison, Aldosteron, Testosteron, Östrogen, Progesteron."
      },
      water: {
        statement: "Aminosäurederivate entstehen durch Umbildung einzelner Aminosäuren; Tyrosin ist Ausgangsstoff für Dopamin, Serotonin und Noradrenalin; für Schilddrüsenhormone (T3/T4) wird zusätzlich Jod von außen in die Aminosäure eingebaut.",
        answer: true,
        solution: "Aminosäurederivate sind Abkömmlinge einzelner Aminosäuren: Tyrosin → Dopamin, Serotonin, Noradrenalin (Katecholamine). Schilddrüsenhormone T3/T4 sind ebenfalls Aminosäurederivate, brauchen aber den Einbau äußerer Stoffe (Jod). Auch Insulin ist ein Eiweißhormon — es besteht aus unterschiedlichen Aminosäuresequenzen (Proteohormon). Merke: Die drei biochemischen Klassen sind 1. Proteohormone (Polypeptide), 2. Steroidhormone (Cholesterin-Grundgerüst) und 3. Aminosäurederivate (Tyrosin-Abkömmlinge + modifizierte AS)."
      }
    },
    harvestQuestions: [
      {
        id: "hormondiff_h1",
        type: "mc",
        question: "Welche Hormongruppe wird von spezialisierten Nervenzellen (z. B. im Hypothalamus) produziert?",
        options: [
          { text: "Drüsenhormone", correct: false },
          { text: "Neurohormone", correct: true },
          { text: "Gewebshormone", correct: false },
          { text: "Steroidhormone", correct: false }
        ],
        explanation: "Neurohormone werden primär in spezialisierten Nervenzellen (Neuronen) hergestellt. Das wichtigste Beispiel ist der Hypothalamus: seine Neuronen sezernieren Releasing- und Inhibiting-Hormone (Neurosekretion). Drüsenhormone kommen aus endokrinen Drüsen; Gewebshormone aus lokalen Zellgruppen ohne zentralen Steuerungsbedarf."
      },
      {
        id: "hormondiff_h2",
        type: "true_false",
        statement: "Gewebshormone wie Gastrin, Sekretin und Östrogen kommen ohne zentrale Steuerung durch den Hypothalamus zum Einsatz und reagieren direkt auf lokale Reize.",
        answer: true,
        explanation: "Gewebshormone werden von einzelnen Zellen in einem Gewebekomplex gebildet (z. B. G-Zellen im Magenantrum → Gastrin; I-Zellen im Dünndarm → Sekretin, CCK; Ovar → Östrogen, Progesteron; Niere → Renin). Sie benötigen keine übergeordnete Hypothalamus-Steuerung und reagieren direkt auf Umgebungsreize (z. B. Nahrungsangebot, Blutzucker, O₂-Gehalt)."
      },
      {
        id: "hormondiff_h3",
        type: "mc",
        question: "Welche chemische Grundsubstanz liegt den Steroidhormonen (z. B. Cortisol, Testosteron, Östrogen) zugrunde?",
        options: [
          { text: "Aminosäureketten (Polypeptide)", correct: false },
          { text: "Tryptophan (Aminosäure)", correct: false },
          { text: "Cholesterin (Gonan-Ringsystem)", correct: true },
          { text: "Glukose (Kohlenhydrat)", correct: false }
        ],
        explanation: "Steroidhormone besitzen als Grundgerüst das Gonan-System: ein tetrazyklisches Ringsystem aus drei Sechser-Ringen und einem Fünfer-Ring. Das Grundskelett des Cholesterins besteht ebenfalls aus Gonan. Aus diesem Cholesterin-Grundgerüst wird die gesamte Palette der Steroidhormone aufgebaut: Kortikosteroide (Cortisol, Aldosteron), Sexualhormone (Testosteron, Östrogen, Progesteron)."
      },
      {
        id: "hormondiff_h4",
        type: "true_false",
        statement: "Proteohormone (wie Insulin oder Glukagon) bestehen aus Aminosäureketten (Polypeptide) und sind damit biochemisch völlig verschieden von Steroidhormonen.",
        answer: true,
        explanation: "Proteohormone (Polypeptide): aufgebaut aus Aminosäureketten — z. B. Insulin (A- und B-Kette), Glukagon, alle Hypophysenhormone (TSH, ACTH, FSH, LH, STH, Prolaktin), PTH, ADH, Oxytocin. Steroidhormone: Cholesterin-Grundstruktur (Gonan). Die biochemische Klasse bestimmt den Wirkmechanismus: Proteohormone binden an Oberflächenrezeptoren; Steroidhormone können direkt in die Zelle eintreten und an DNA-Rezeptoren wirken."
      },
      {
        id: "hormondiff_h5",
        type: "mc",
        question: "Welche Aminosäure ist der gemeinsame Ausgangsstoff für die Katecholamine Dopamin, Serotonin und Noradrenalin?",
        options: [
          { text: "Tryptophan", correct: false },
          { text: "Tyrosin", correct: true },
          { text: "Phenylalanin", correct: false },
          { text: "Methionin", correct: false }
        ],
        explanation: "Aminosäurederivate: Tyrosin ist Ausgangsstoff für Dopamin, Serotonin und Noradrenalin (alle Katecholamine des NNM) — sie entstehen durch schrittweise chemische Umbildung der Aminosäure. Tryptophan ist dagegen der Ausgangsstoff für Melatonin (Epiphyse). Schilddrüsenhormone T3/T4 sind ebenfalls Tyrosin-Derivate, benötigen aber zusätzlich Jod von außen."
      }
    ],
    phase4Questions: [
      {
        id: "hormondiff_mc1",
        type: "mc",
        question: "Welche Aussagen zur Hormondifferenzierung nach dem Bildungsort stimmen?",
        options: [
          { text: "Drüsenhormone werden von endokrinen Drüsen ohne Ausführungsgang produziert", correct: true },
          { text: "Neurohormone entstehen in spezialisierten Nervenzellen (z. B. Hypothalamus)", correct: true },
          { text: "Gewebshormone unterliegen der zentralen Steuerung des Hypothalamus", correct: false },
          { text: "Gewebshormone sind z. B. Gastrin, Sekretin, Östrogen und Renin", correct: true }
        ]
      },
      {
        id: "hormondiff_mc2",
        type: "mc",
        question: "Welche Aussagen zur biochemischen Klassifizierung der Hormone stimmen?",
        options: [
          { text: "Proteohormone bestehen aus Polypeptiden (Aminosäureketten)", correct: true },
          { text: "Steroidhormone haben Cholesterin (Gonan-Ringsystem) als Grundsubstanz", correct: true },
          { text: "Aminosäurederivate: Tyrosin ist Ausgangsstoff für Dopamin und Noradrenalin", correct: true },
          { text: "Steroidhormone sind Polypeptide mit zusätzlichem Jodanteil", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "periphere_hormonbildungsstaetten",
    title: "Periphere Hormonbildungsstätten: Pankreas, Niere, Herz, Gonaden und GI-Hormone",
    contextHint: "Studienbrief 1042 Hormonsystem – Insulin Glukagon EPO Renin ANF Testosteron Östrogen Progesteron Gastrin Cholecystokinin",
    phase1: {
      soil: {
        statement: "Das Pankreas (Inselorgan) reagiert ohne zentrale Steuerung direkt auf Blutzuckerveränderungen: B-Zellen produzieren Insulin bei Blutzuckeranstieg (→ Glucoseaufnahme und -oxidation, Glykogenaufbau, Blutzuckersenkung), A-Zellen produzieren Glukagon bei Blutzuckerabfall (→ Glykogenolyse, Gluconeogenese, Blutzuckererhöhung).",
        answer: true,
        solution: "Das Pankreas (Bauchspeicheldrüse) ist gleichzeitig exokrin (Verdauungsenzyme) und endokrin (Insulinanteil). Die Langerhans-Inseln (Inselorgan) sind die endokrinen Anteile: B-Zellen (Insulin): Glucoseaufnahme in Zellen und Oxidation, Glykogenaufbau → Blutzucker↓. A-Zellen (Glukagon): Glykogenolyse (Glykogen→Glukose) + Gluconeogenese (Aufbau von Zucker aus Nicht-Zuckerstoffen) → Blutzucker↑. Insulin und Glukagon sind klassische Gegenspieler im Blutzuckerhaushalt. Das Pankreas reagiert direkt auf Blutzuckerkonzentrationsänderungen — ohne Hypothalamus-Umweg."
      },
      seed: {
        statement: "Erythropoetin (EPO) wird von den Herzvorhöfen produziert und stimuliert bei erhöhtem Blutdruck die Natriumausscheidung; der Atriale Natriuretische Faktor (ANF) kommt von der Niere.",
        answer: false,
        solution: "Genau vertauscht: EPO (Erythropoetin) wird von der NIERE produziert — bei Sauerstoffmangel → stimuliert Bildung roter Blutkörperchen (Erythrozyten) im Knochenmark → verbessert O₂-Transport. ANF (Atrialer Natriuretischer Faktor) kommt von den VORHÖFEN des HERZENS — er bewirkt verstärkte Diurese (mehr Urin) und Natriurese (mehr Na⁺-Ausscheidung) → senkt damit das Blutvolumen und den Blutdruck. ANF ist so gesehen Gegenspieler des Aldosterons (das Na⁺ zurückhält). Renin wird ebenfalls von der Niere produziert und ist Teil des RAAS (arbeitet mit Angiotensin II zusammen → Blutdrucksteigerung)."
      },
      water: {
        statement: "Östrogene (Ovar/Plazenta) fördern Wachstum der weiblichen Sexualorgane und Proliferation der Uterusschleimhaut; Progesteron/Gestagen wandelt die Schleimhaut in die Sekretionsphase um und erhöht die Basaltemperatur nach dem Eisprung um ca. 0,4°C.",
        answer: true,
        solution: "Gonaden-Hormone: Testes → Androgene/Testosteron: Wachstum der männlichen Sexualorgane, Spermatogenese, Proteinsynthese (anabole Wirkung). Ovar/Plazenta → Östrogene: Wachstum der weiblichen Sexualorgane, Proliferation der Uterusschleimhaut (Aufbauphase im Zyklus). Gestagen/Progesteron: Umwandlung der Uterusschleimhaut in die Sekretionsphase + Temperaturerhöhung um ca. 0,4°C nach dem Eisprung (= Basaltemperatur → Verhütungsmethode). Gastrointestinale Hormone: G-Zellen (Antrum/Dünndarm) → Gastrin: stimuliert Salzsäuresekretion; I-Zellen (oberer Dünndarm) → Cholecystokinin (CCK): stimuliert Pankreasenzymsekr. + Gallenblasenkontraktion."
      }
    },
    harvestQuestions: [
      {
        id: "periph_horm_h1",
        type: "mc",
        question: "Welche Zellen des Pankreas (Inselorgan) produzieren Insulin?",
        options: [
          { text: "A-Zellen (produzieren Glukagon)", correct: false },
          { text: "B-Zellen", correct: true },
          { text: "D-Zellen (produzieren Somatostatin)", correct: false },
          { text: "G-Zellen (produzieren Gastrin)", correct: false }
        ],
        explanation: "Im Pankreas-Inselorgan (Langerhans-Inseln): B-Zellen → Insulin (Blutzuckersenkung durch Glucoseaufnahme + Glykogenaufbau). A-Zellen → Glukagon (Blutzuckererhöhung durch Glykogenolyse + Gluconeogenese). D-Zellen → Somatostatin (hemmt Insulin und Glukagon). G-Zellen sind im Magenantrum/Dünndarm und produzieren Gastrin, nicht im Pankreas."
      },
      {
        id: "periph_horm_h2",
        type: "true_false",
        statement: "Der Atriale Natriuretische Faktor (ANF) wird von den Vorhöfen des Herzens produziert und bewirkt verstärkte Diurese sowie Natriurese.",
        answer: true,
        explanation: "ANF (Atrialer Natriuretischer Faktor) ist ein Hormon der Herzvorhöfe. Bei erhöhtem Blutdruck/Volumen wird ANF freigesetzt → bewirkt gesteigerte Diurese (mehr Urin) + Natriurese (Na⁺-Ausscheidung↑) → senkt Blutvolumen und Blutdruck. ANF ist so der natürliche Gegenspieler des Aldosterons (das Na⁺ zurückhält und den Blutdruck erhöht)."
      },
      {
        id: "periph_horm_h3",
        type: "mc",
        question: "Was ist die Hauptfunktion von Erythropoetin (EPO) und welches Organ produziert es?",
        options: [
          { text: "Blutzuckersenkung — produziert vom Pankreas", correct: false },
          { text: "Erythrozytenbildung bei O₂-Mangel — produziert von der Niere", correct: true },
          { text: "Blutdrucksteigerung durch Vasokonstriktion — produziert vom Herz", correct: false },
          { text: "Natriumretention — produziert von der Nebennierenrinde", correct: false }
        ],
        explanation: "EPO (Erythropoetin) wird von der Niere bei Sauerstoffmangel freigesetzt → stimuliert im Knochenmark die Bildung roter Blutkörperchen (Erythrozyten) → verbessert den O₂-Transport im Blut. Diese direkte Reaktion auf O₂-Mangel erfolgt ohne Hypothalamus-Steuerung. EPO ist bekannt als Dopingmittel im Ausdauersport, da mehr Erythrozyten mehr O₂ transportieren."
      },
      {
        id: "periph_horm_h4",
        type: "mc",
        question: "Welche Wirkung hat Progesteron/Gestagen nach dem Eisprung?",
        options: [
          { text: "Proliferation der Uterusschleimhaut und Östrogenproduktion", correct: false },
          { text: "Umwandlung der Schleimhaut in die Sekretionsphase und Basaltemperaturerhöhung um ca. 0,4°C", correct: true },
          { text: "Hemmung der Follikelreifung durch FSH-Blockade im HVL", correct: false },
          { text: "Stimulation der Milchproduktion (wie Prolaktin)", correct: false }
        ],
        explanation: "Progesteron/Gestagen (Ovar → Gelbkörper nach Eisprung): wandelt die durch Östrogen aufgebaute Uterusschleimhaut in die Sekretionsphase um (Vorbereitung für Einnistung des Eis) + erhöht die Basaltemperatur um ca. 0,4°C — dies ist die Grundlage der Temperaturmethode zur Zyklusüberwachung/Verhütung. Proliferation (Aufbau) der Schleimhaut = Aufgabe der Östrogene."
      },
      {
        id: "periph_horm_h5",
        type: "mc",
        question: "Welches gastrointestinale Hormon stimuliert die Salzsäuresekretion im Magen?",
        options: [
          { text: "Cholecystokinin (CCK) — aus I-Zellen des Dünndarms", correct: false },
          { text: "Sekretin — aus Duodenalschleimhaut", correct: false },
          { text: "Gastrin — aus G-Zellen des Magenantrum/Dünndarms", correct: true },
          { text: "Insulin — aus B-Zellen des Pankreas", correct: false }
        ],
        explanation: "Gastrin wird von G-Zellen des Magenantrum und des oberen Dünndarms produziert → stimuliert die Salzsäuresekretion im Magen (Belegzellen). Es ist ein Gewebshormon, das ohne zentrale Steuerung auf lokale Reize (z. B. Nahrung im Magen) reagiert. Cholecystokinin (CCK, I-Zellen): stimuliert Pankreasenzymsekretion + Gallenblasenkontraktion. Sekretin: stimuliert Pankreasbikarbonat-Sekretion."
      }
    ],
    phase4Questions: [
      {
        id: "periph_horm_mc1",
        type: "mc",
        question: "Welche Aussagen zum Pankreas als Hormonorgan stimmen?",
        options: [
          { text: "B-Zellen produzieren Insulin (→ Blutzuckersenkung)", correct: true },
          { text: "A-Zellen produzieren Glukagon (→ Blutzuckererhöhung)", correct: true },
          { text: "Das Pankreas reagiert ohne zentrale Hypothalamus-Steuerung direkt auf Blutzuckeränderungen", correct: true },
          { text: "Insulin fördert die Glykogenolyse und erhöht damit den Blutzucker", correct: false }
        ]
      },
      {
        id: "periph_horm_mc2",
        type: "mc",
        question: "Welche Aussagen zu den Hormonen peripherer Organe stimmen?",
        options: [
          { text: "EPO (Niere) stimuliert bei Sauerstoffmangel die Erythrozytenbildung", correct: true },
          { text: "ANF (Herzvorhöfe) bewirkt Diurese und Natriurese (Blutdrucksenkung)", correct: true },
          { text: "Testosteron (Testes) fördert Spermatogenese und Proteinsynthese", correct: true },
          { text: "Östrogene wandeln die Uterusschleimhaut in die Sekretionsphase um (wie Progesteron)", correct: false }
        ]
      }
    ]
  }),

