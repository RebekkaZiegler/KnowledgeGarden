// Studienbrief 1038 — Strukturen und Funktion des Verdauungstraktes
// Temp file: merge into js/content.js before PACK_CONTENT

const VERDAUUNGSTRAKT_1038_PLANTS = [

  makeDetailedPlant({
    id: "mundhoehl_zaehne",
    title: "Mundhöhle, Zähne und Karies",
    contextHint: "Studienbrief 1038 Verdauungstrakt – Mundhöhle und Zähne",
    phase1: {
      soil: {
        statement: "Das Dauergebiss des Menschen besteht aus 32 Zähnen mit der Formel 2-1-2-3 pro Quadrant; der Durchbruch beginnt ab dem 6. Lebensjahr.",
        answer: true,
        solution: "Das Dauergebiss hat 32 Zähne (Formel 2123/2123 × 2: 2 Schneidezähne, 1 Eckzahn, 2 Prämolaren, 3 Molaren pro Quadrant). Das Milchgebiss hat 20 Zähne (Formel 212/212 × 2) und bricht ab dem 6. Lebensmonat durch; abgeschlossen ist es ca. im 2. Lebensjahr. Die Molaren des Dauergebisses haben keine Milchzahn-Vorgänger — sie werden direkt als Dauerzähne angelegt. Das Mundhöhlenepithel ist mehrschichtig, unverhornt und plattenförmig."
      },
      seed: {
        statement: "Der Zahnschmelz ist der Hauptbestandteil des Zahns nach Volumen und enthält Nerven sowie Blutgefäße.",
        answer: false,
        solution: "Zahnschmelz ist zwar die härteste Substanz des Körpers (Na- und Calciumfluoride), aber nicht der voluminöse Hauptbestandteil. Dentin ist der Hauptbestandteil des Zahns. Nerven und Blutgefäße befinden sich in der Pulpa. Zement umhüllt die Zahnwurzel und verankert den Zahn im Alveolarknochen."
      },
      water: {
        statement: "Karies ist eine Infektionskrankheit, die durch Streptokokken ausgelöst wird und in vier Stadien verläuft.",
        answer: true,
        solution: "Karies entsteht durch Streptokokken (v. a. Streptococcus mutans), die Zucker zu Säure fermentieren und so den Zahnschmelz demineralisieren. Sie verläuft in vier Stadien: Initialkaries (Demineralisation) → Schmelzkaries → Dentinkaries → Pulpitis/Parodontitis. Zahnschmelz enthält keine Nerven, weshalb frühe Karies schmerzlos ist."
      }
    },
    harvestQuestions: [
      {
        id: "mundhoehl_zaehne_h1",
        type: "mc",
        question: "Welche Struktur des Zahns enthält Nerven und Blutgefäße?",
        options: [
          { text: "Pulpa", correct: true },
          { text: "Zahnschmelz", correct: false },
          { text: "Dentin", correct: false },
          { text: "Zement", correct: false }
        ],
        explanation: "Die Pulpa (Zahnmark) füllt den Innenraum des Zahns und enthält Nerven und Blutgefäße. Zahnschmelz ist nervenlos (frühe Karies ist daher schmerzlos). Dentin ist der voluminöse Hauptbestandteil, Zement verankert die Wurzel."
      },
      {
        id: "mundhoehl_zaehne_h2",
        type: "true_false",
        statement: "Das Milchgebiss besteht aus 20 Zähnen und bricht ab dem 6. Lebensmonat durch.",
        answer: true,
        explanation: "Das Milchgebiss (Formel 212/212 × 2) hat 20 Zähne. Der Durchbruch beginnt ca. ab dem 6. Lebensmonat und ist ca. im 2. Lebensjahr abgeschlossen."
      },
      {
        id: "mundhoehl_zaehne_h3",
        type: "mc",
        question: "Was ist der Hauptbestandteil des Zahns nach Volumen?",
        options: [
          { text: "Dentin", correct: true },
          { text: "Zahnschmelz", correct: false },
          { text: "Zement", correct: false },
          { text: "Pulpa", correct: false }
        ],
        explanation: "Dentin bildet den größten Teil der Zahnsubstanz und umgibt die Pulpa. Zahnschmelz bedeckt nur die Zahnkrone, ist aber die härteste Substanz des Körpers."
      },
      {
        id: "mundhoehl_zaehne_h4",
        type: "mc",
        question: "Welche Zahnformel gilt pro Quadrant im Dauergebiss?",
        options: [
          { text: "2-1-2-3 (Schneidezähne–Eckzahn–Prämolaren–Molaren)", correct: true },
          { text: "2-1-2-0", correct: false },
          { text: "1-1-2-3", correct: false },
          { text: "2-0-2-3", correct: false }
        ],
        explanation: "Pro Quadrant im Dauergebiss: 2 Schneidezähne, 1 Eckzahn, 2 Prämolaren, 3 Molaren → Formel 2123. Das Milchgebiss hat keine Prämolaren und Molaren: Formel 212."
      },
      {
        id: "mundhoehl_zaehne_h5",
        type: "true_false",
        statement: "Die Molaren des Dauergebisses ersetzen entsprechende Milchmolaren, da diese in derselben Kieferposition gewachsen sind.",
        answer: false,
        explanation: "Das Milchgebiss enthält keine Molaren. Die Molaren des Dauergebisses werden direkt als Dauerzähne angelegt und eruptieren in neu entstehenden Knochenbereichen hinter den Milchzähnen — ohne Vorläufer im Milchgebiss."
      }
    ],
    phase4Questions: [
      {
        id: "mundhoehl_zaehne_mc1",
        type: "mc",
        question: "Welche der folgenden Aussagen zur Mundhöhle und den Zähnen sind korrekt?",
        options: [
          { text: "Das Mundhöhlenepithel ist mehrschichtig, unverhornt und plattenförmig", correct: true },
          { text: "Die Pulpa enthält Nerven und Blutgefäße", correct: true },
          { text: "Zahnschmelz ist die härteste Substanz des Körpers", correct: true },
          { text: "Dentin ist nervenlos und bildet nur die äußere Zahnoberfläche", correct: false }
        ]
      },
      {
        id: "mundhoehl_zaehne_mc2",
        type: "mc",
        question: "Welche Aussagen zum Milch- und Dauergebiss sind korrekt?",
        options: [
          { text: "Das Dauergebiss hat 32 Zähne", correct: true },
          { text: "Das Milchgebiss hat 20 Zähne", correct: true },
          { text: "Molaren sind ausschließlich im Dauergebiss vorhanden", correct: true },
          { text: "Das Dauergebiss bricht ab dem 6. Lebensmonat durch", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "speicheldruesen",
    title: "Speicheldrüsen: Anatomie und Funktionen",
    contextHint: "Studienbrief 1038 Verdauungstrakt – Speicheldrüsen",
    phase1: {
      soil: {
        statement: "Die drei großen paarigen Speicheldrüsen sind die Glandula parotis, Glandula sublingualis und Glandula submandibularis.",
        answer: true,
        solution: "Die Glandula parotis (Ohrspeicheldrüse), Glandula sublingualis (Unterzungenspeicheldrüse) und Glandula submandibularis (Unterkieferspeicheldrüse) sind die drei großen paarigen Drüsen. Daneben gibt es kleine Speicheldrüsen, die ständig Gleitspeichel abgeben. Zusammen produzieren alle Drüsen täglich ca. 1,5 Liter Speichel."
      },
      seed: {
        statement: "Die Speicheldrüsen produzieren täglich ca. 5 Liter Speichel, der ausschließlich aus Wasser besteht.",
        answer: false,
        solution: "Die tägliche Speichelproduktion beträgt ca. 1,5 Liter. Speichel ist kein reines Wasser: Er enthält Ptyalin (Alpha-Amylase), das die Kohlenhydratverdauung bereits im Mund beginnt, außerdem bakterizide Substanzen und kann zur Diagnose von Schwermetallvergiftungen (Blei, Cadmium, Arsen) herangezogen werden."
      },
      water: {
        statement: "Ptyalin (Alpha-Amylase) im Speichel beginnt bereits im Mund mit der Kohlenhydratverdauung.",
        answer: true,
        solution: "Ptyalin ist die im Speichel enthaltene Alpha-Amylase und spaltet Stärke (Polysaccharide) zu Disacchariden. Die Speichelproduktion wird durch drei Reize getriggert: Chemorezeptoren (Nahrungsreize), Kaubewegungen und psychische Reize (Konditionierung, Vorstellung von Essen). Kleinspeicheldrüsen sezernieren dauerhaft Gleitspeichel zur Schleimhautbefeuchtung."
      }
    },
    harvestQuestions: [
      {
        id: "speicheldruesen_h1",
        type: "mc",
        question: "Welches Enzym im Speichel ist für den Beginn der Kohlenhydratverdauung verantwortlich?",
        options: [
          { text: "Ptyalin (Alpha-Amylase)", correct: true },
          { text: "Pepsin", correct: false },
          { text: "Lipase", correct: false },
          { text: "Trypsin", correct: false }
        ],
        explanation: "Ptyalin (Alpha-Amylase) im Speichel spaltet Stärke bereits im Mund. Pepsin ist ein Magenenzym (Eiweißspaltung), Lipase und Trypsin sind Pankreasenzyme."
      },
      {
        id: "speicheldruesen_h2",
        type: "true_false",
        statement: "Die Glandula parotis ist auch als Ohrspeicheldrüse bekannt und liegt paarig vor dem Ohr.",
        answer: true,
        explanation: "Die Glandula parotis (Ohrspeicheldrüse) ist die größte der drei paarigen Speicheldrüsen und liegt vor dem Ohr. Ihr Ausführungsgang mündet in die Wangenschleimhaut."
      },
      {
        id: "speicheldruesen_h3",
        type: "mc",
        question: "Wie viel Speichel produzieren alle Speicheldrüsen zusammen täglich?",
        options: [
          { text: "ca. 1,5 Liter", correct: true },
          { text: "ca. 0,5 Liter", correct: false },
          { text: "ca. 3 Liter", correct: false },
          { text: "ca. 5 Liter", correct: false }
        ],
        explanation: "Alle Speicheldrüsen produzieren täglich ca. 1,5 Liter Speichel. Zum Vergleich: der Magen produziert 2–3 Liter Magensaft täglich."
      },
      {
        id: "speicheldruesen_h4",
        type: "true_false",
        statement: "Speichel kann zur Diagnose einer Schwermetallvergiftung (z. B. Blei, Cadmium, Arsen) herangezogen werden.",
        answer: true,
        explanation: "Schwermetalle wie Blei (Pb), Cadmium (Cd) und Arsen (As) werden in den Speichel ausgeschieden und sind daher im Speichel nachweisbar — Speichel eignet sich daher als diagnostisches Medium."
      },
      {
        id: "speicheldruesen_h5",
        type: "mc",
        question: "Durch welche Reize wird die Speichelproduktion ausgelöst?",
        options: [
          { text: "Chemorezeptoren, Kaubewegungen und psychische Reize", correct: true },
          { text: "Ausschließlich mechanische Kauimpulse", correct: false },
          { text: "Nur Chemorezeptoren bei direktem Nahrungskontakt", correct: false },
          { text: "Nur psychische Reize (Konditionierung)", correct: false }
        ],
        explanation: "Die Speichelproduktion wird durch drei Reiztypen ausgelöst: Chemorezeptoren (Geschmack und Geruch), mechanische Kaubewegungen sowie psychische Reize (allein der Gedanke an Essen kann Speichelfluss auslösen)."
      }
    ],
    phase4Questions: [
      {
        id: "speicheldruesen_mc1",
        type: "mc",
        question: "Welche Aussagen zu den Speicheldrüsen und Speichelfunktionen sind korrekt?",
        options: [
          { text: "Die Glandula parotis ist paarig und liegt vor dem Ohr", correct: true },
          { text: "Speichel enthält Alpha-Amylase (Ptyalin) zur Kohlenhydratverdauung", correct: true },
          { text: "Die tägliche Speichelproduktion beträgt ca. 1,5 Liter", correct: true },
          { text: "Speichel wird ausschließlich durch mechanische Kaureize produziert", correct: false }
        ]
      },
      {
        id: "speicheldruesen_mc2",
        type: "mc",
        question: "Welche der folgenden Eigenschaften des Speichels sind korrekt?",
        options: [
          { text: "Speichel hat bakterizide Wirkung", correct: true },
          { text: "Speichel kann zur Diagnose einer Schwermetallvergiftung genutzt werden", correct: true },
          { text: "Kleinspeicheldrüsen sezernieren dauerhaft Gleitspeichel", correct: true },
          { text: "Speichel besteht zu 100 % aus Wasser ohne Enzyme", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "zunge_geschmack",
    title: "Zunge: Papillen, Geschmack und Funktionen",
    contextHint: "Studienbrief 1038 Verdauungstrakt – Zunge und Geschmackssinn",
    phase1: {
      soil: {
        statement: "Die fünf Grundgeschmacksrichtungen der Zunge sind süß, sauer, salzig, bitter und umami (ausgelöst durch Glutaminsäure).",
        answer: true,
        solution: "Die Zunge unterscheidet fünf Geschmacksqualitäten: süß, sauer, salzig, bitter und umami (Wohlgeschmack; Glutaminsäure als Auslöser). Geschmacksknospen sitzen in drei der vier Papillentypen: Papillae fungiformes (pilzförmig, Zungenrücken), foliatae (blattförmig, hinterer Zungenrand) und vallatae (wallartig, V-förmig im hinteren Zungenbereich). Papillae filiformes (fadenförmig) vermitteln ausschließlich Tastsinn."
      },
      seed: {
        statement: "Alle vier Papillentypen der Zunge sind am Geschmackssinn beteiligt.",
        answer: false,
        solution: "Nur drei Papillentypen tragen zum Geschmackssinn bei: Papillae fungiformes, foliatae und vallatae. Die Papillae filiformes (fadenförmig) sind die häufigsten Papillen, aber sie enthalten keine Geschmacksknospen — sie vermitteln ausschließlich Tastsinn und geben der Zunge ihre charakteristische raue Oberfläche."
      },
      water: {
        statement: "Durch die Mundschleimhaut (sublingual) können Wirkstoffe rasch resorbiert werden — ein klinisches Beispiel ist Nitrolingual bei Angina pectoris.",
        answer: true,
        solution: "Die sublinguale Resorption (unter der Zunge) umgeht den First-Pass-Effekt der Leber, da die Wirkstoffe direkt ins Blut gelangen. Nitrolingual (Nitroglyzerin) und Adalat (Nifedipin) sind klassische Beispiele. Die Zunge kann zudem eine Saugkraft von 1,5 m Wassersäule (= 0,15 bar) aufbauen."
      }
    },
    harvestQuestions: [
      {
        id: "zunge_geschmack_h1",
        type: "mc",
        question: "Welcher Papillentyp der Zunge vermittelt ausschließlich Tastsinn, aber keinen Geschmack?",
        options: [
          { text: "Papillae filiformes (fadenförmige)", correct: true },
          { text: "Papillae fungiformes (pilzförmige)", correct: false },
          { text: "Papillae foliatae (blattförmige)", correct: false },
          { text: "Papillae vallatae (wallförmige)", correct: false }
        ],
        explanation: "Die Papillae filiformes sind die häufigsten Papillen und geben der Zunge ihre raue Textur. Sie enthalten keine Geschmacksknospen und vermitteln nur Tastsinn. Alle anderen drei Typen (fungiformes, foliatae, vallatae) sind am Geschmackssinn beteiligt."
      },
      {
        id: "zunge_geschmack_h2",
        type: "true_false",
        statement: "Umami ist eine der fünf anerkannten Grundgeschmacksrichtungen und wird durch Glutaminsäure ausgelöst.",
        answer: true,
        explanation: "Umami (japanisch für 'Wohlgeschmack') ist die fünfte Grundgeschmacksrichtung neben süß, sauer, salzig und bitter. Er wird durch Glutaminsäure (Glutamat) ausgelöst und ist typisch für Fleisch, Parmesan und Pilze."
      },
      {
        id: "zunge_geschmack_h3",
        type: "mc",
        question: "Welches Medikament ist ein klassisches Beispiel für die sublinguale Resorption?",
        options: [
          { text: "Nitrolingual (Nitroglyzerin) bei Angina pectoris", correct: true },
          { text: "Aspirin bei Schmerzen", correct: false },
          { text: "Ibuprofen bei Entzündungen", correct: false },
          { text: "Metformin bei Diabetes", correct: false }
        ],
        explanation: "Nitrolingual (Nitroglyzerin) wird sublingual (unter die Zunge) gegeben und wirkt innerhalb von Minuten durch direkte Resorption ins Blut — ohne hepatischen First-Pass-Effekt. Adalat (Nifedipin) ist ein weiteres Beispiel."
      },
      {
        id: "zunge_geschmack_h4",
        type: "true_false",
        statement: "Die Zungenmuskulatur besteht aus quergestreifter Muskulatur, die willkürlich gesteuert werden kann.",
        answer: true,
        explanation: "Das Corpus linguae (Zungenkörper) besteht aus quergestreifter Skelettmuskulatur, die willkürlich kontrolliert wird — das ermöglicht Sprechen, Kauen und den Schluckakt. Die Zunge gliedert sich in Radix (Mundboden), Corpus und Apex (Zungenspitze)."
      },
      {
        id: "zunge_geschmack_h5",
        type: "mc",
        question: "In welcher charakteristischen Anordnung befinden sich die Papillae vallatae auf der Zunge?",
        options: [
          { text: "V-förmig im hinteren Zungenbereich", correct: true },
          { text: "Gleichmäßig über den gesamten Zungenrücken verteilt", correct: false },
          { text: "Ausschließlich am vorderen Zungenrand", correct: false },
          { text: "An der Zungenspitze (Apex linguae)", correct: false }
        ],
        explanation: "Die Papillae vallatae (wallförmige Papillen) sind die größten Papillen und in einer V-förmigen Reihe im hinteren Zungenbereich angeordnet. Sie sind besonders reich an Geschmacksknospen."
      }
    ],
    phase4Questions: [
      {
        id: "zunge_geschmack_mc1",
        type: "mc",
        question: "Welche Aussagen zu den Papillen der Zunge sind korrekt?",
        options: [
          { text: "Papillae fungiformes sind am Geschmackssinn beteiligt", correct: true },
          { text: "Papillae vallatae sind V-förmig im hinteren Zungenbereich angeordnet", correct: true },
          { text: "Papillae filiformes enthalten Geschmacksknospen", correct: false },
          { text: "Papillae foliatae befinden sich am hinteren Zungenrand und nehmen am Geschmack teil", correct: true }
        ]
      },
      {
        id: "zunge_geschmack_mc2",
        type: "mc",
        question: "Welche der folgenden Aussagen zu Zungenfunktionen und Geschmack sind korrekt?",
        options: [
          { text: "Umami ist eine der fünf Grundgeschmacksrichtungen (ausgelöst durch Glutaminsäure)", correct: true },
          { text: "Sublinguale Resorption ermöglicht Wirkstoffaufnahme ohne First-Pass-Effekt", correct: true },
          { text: "Die Zunge kann eine Saugkraft von ca. 0,15 bar (1,5 m Wassersäule) aufbauen", correct: true },
          { text: "Die Zunge besteht aus glatter Muskulatur und ist unwillkürlich gesteuert", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "rachen_schluckakt",
    title: "Rachen: Abschnitte, Schlundschnürer und Schluckakt",
    contextHint: "Studienbrief 1038 Verdauungstrakt – Rachen und Schluckakt",
    phase1: {
      soil: {
        statement: "Der Rachen gliedert sich in drei Abschnitte: Epipharynx (reiner Luftweg), Mesopharynx (Luft + Speise) und Hypopharynx (reiner Speiseweg).",
        answer: true,
        solution: "Der ca. 12 cm lange Rachen reicht von der Schädelbasis bis zum Ösophaguseingang. Der Epipharynx (Pars nasalis) ist ausschließlich Luftweg. Der Mesopharynx (Pars oralis) dient Luft- und Speisepassage. Der Hypopharynx (Pars laryngea) ist ausschließlich Speiseweg. Drei Schlundschnürer koordinieren den Transport: M. constrictor pharyngis superior (Passavant-Ringwulst, obere Atemwege), medius (verkleinert Volumen), inferior (hebt Kehlkopf, verhindert Aspiration)."
      },
      seed: {
        statement: "Der Schluckakt ist von Beginn an ein vollständig unwillkürlicher Reflex, der nicht bewusst kontrolliert werden kann.",
        answer: false,
        solution: "Die ersten beiden Phasen des Schluckakts sind willkürlich: Phase 1 (orale Vorbereitungsphase: Zerkleinerung + Einspeichelung) und Phase 2 (orale Transportphase: Zunge transportiert Bolus nach hinten). Erst mit der pharyngealen Phase (Phase 3) wird durch N. glossopharyngeus und N. vagus ein unwillkürlicher Schluckreflex ausgelöst. Ab hier ist der Vorgang nicht mehr steuerbar."
      },
      water: {
        statement: "Ab der pharyngealen Phase des Schluckakts wird ein unwillkürlicher Schluckreflex ausgelöst, der Speise- und Atemwege koordiniert schützt.",
        answer: true,
        solution: "In der pharyngealen Phase (Phase 3) schließen sich die oberen Atemwege durch Gaumensegel + Passavant-Ringwulst und die unteren Atemwege durch Stimmlippen-Schluss + Epiglottis. Die ösophageale Phase (Phase 4) transportiert: Flüssigkeiten per Spritzschluck, feste Nahrung per Peristaltik; bei steckenbleibenden Resten wird sekundäre Peristaltik aktiviert."
      }
    },
    harvestQuestions: [
      {
        id: "rachen_schluckakt_h1",
        type: "mc",
        question: "Welcher Rachenabschnitt ist ausschließlich Luftweg ohne Speisepassage?",
        options: [
          { text: "Epipharynx (Pars nasalis)", correct: true },
          { text: "Mesopharynx (Pars oralis)", correct: false },
          { text: "Hypopharynx (Pars laryngea)", correct: false },
          { text: "Ösophagus", correct: false }
        ],
        explanation: "Der Epipharynx (Pars nasalis) liegt hinter der Nase und ist ausschließlich Luftweg. Der Mesopharynx lässt Luft und Speise passieren, der Hypopharynx ist reiner Speiseweg."
      },
      {
        id: "rachen_schluckakt_h2",
        type: "true_false",
        statement: "Die orale Vorbereitungsphase des Schluckakts ist willkürlich steuerbar.",
        answer: true,
        explanation: "Die ersten beiden Phasen des Schluckakts — orale Vorbereitungsphase (Zerkleinerung, Einspeichelung) und orale Transportphase (Zungenrücken transportiert Bolus) — sind willkürlich. Erst die pharyngeale Phase ist unwillkürlich."
      },
      {
        id: "rachen_schluckakt_h3",
        type: "mc",
        question: "Welche Nerven lösen den unwillkürlichen Schluckreflex in der pharyngealen Phase aus?",
        options: [
          { text: "N. glossopharyngeus und N. vagus", correct: true },
          { text: "N. trigeminus und N. facialis", correct: false },
          { text: "N. hypoglossus und N. accessorius", correct: false },
          { text: "N. olfactorius und N. opticus", correct: false }
        ],
        explanation: "Der N. glossopharyngeus (IX) und N. vagus (X) koordinieren in der pharyngealen Phase den Schluckreflex. Ab diesem Moment läuft der Schluckakt unwillkürlich ab."
      },
      {
        id: "rachen_schluckakt_h4",
        type: "mc",
        question: "Was schützt in der pharyngealen Phase des Schluckakts die unteren Atemwege vor Aspiration?",
        options: [
          { text: "Stimmlippen-Schluss und die Epiglottis", correct: true },
          { text: "Gaumensegel und Passavant-Ringwulst", correct: false },
          { text: "Zungenbein und Gaumenbögen", correct: false },
          { text: "Tonsillen und Uvula", correct: false }
        ],
        explanation: "Obere Atemwege werden durch Gaumensegel + Passavant-Ringwulst verschlossen. Untere Atemwege werden durch Stimmlippen-Schluss + Epiglottis (Kehldeckel) gesichert."
      },
      {
        id: "rachen_schluckakt_h5",
        type: "true_false",
        statement: "Flüssigkeiten und feste Nahrung werden in der ösophagealen Phase des Schluckakts auf dieselbe Weise (durch Peristaltik) in den Magen befördert.",
        answer: false,
        explanation: "Flüssigkeiten gelangen per Spritzschluck schnell in den Magen, feste Nahrung wird durch propulsive Peristaltik transportiert. Bei steckenbleibenden Resten aktiviert sich sekundäre Peristaltik."
      }
    ],
    phase4Questions: [
      {
        id: "rachen_schluckakt_mc1",
        type: "mc",
        question: "Welche Schutzmaßnahmen werden während der pharyngealen Phase des Schluckakts aktiv?",
        options: [
          { text: "Gaumensegel und Passavant-Ringwulst verschließen die oberen Atemwege", correct: true },
          { text: "Stimmlippen schließen sich zum Schutz der unteren Atemwege", correct: true },
          { text: "Die Epiglottis kippt nach hinten und schützt den Larynx", correct: true },
          { text: "Die Tonsillen blockieren den Speiseweg zur Verbesserung der Passage", correct: false }
        ]
      },
      {
        id: "rachen_schluckakt_mc2",
        type: "mc",
        question: "Welche Aussagen zu Rachen und Schluckakt sind korrekt?",
        options: [
          { text: "Der Epipharynx (Pars nasalis) ist ausschließlich Luftweg", correct: true },
          { text: "Die orale Vorbereitungsphase ist willkürlich steuerbar", correct: true },
          { text: "Der Schluckreflex wird durch N. glossopharyngeus und N. vagus ausgelöst", correct: true },
          { text: "Der gesamte Schluckakt ist von Beginn an ein unwillkürlicher Reflex", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "oesophagus",
    title: "Ösophagus: Lage, Engstellen und Wandbau",
    contextHint: "Studienbrief 1038 Verdauungstrakt – Ösophagus",
    phase1: {
      soil: {
        statement: "Der Ösophagus besitzt drei physiologische Engstellen: Constrictio cricoidea (ca. 15 cm), Constrictio bronchoaortica (ca. 25 cm) und Constrictio diaphragmatica (ca. 40 cm) — gemessen ab der Zahnreihe.",
        answer: true,
        solution: "Der Ösophagus ist 23–28 cm lang (Außendurchmesser 3–3,5 cm) und verläuft von C6/C7 bis Th9–Th11. Er gliedert sich in Pars cervicalis, Pars thoracalis und Pars abdominalis. Die drei Engstellen sind klinisch wichtig: An der Constrictio cricoidea (≈15 cm) entstehen Ösophagusvarizen. Die Constrictio bronchoaortica (≈25 cm, Th4, Aortenbogen) und die Constrictio diaphragmatica (≈40 cm, Hiatus oesophageus) sind weitere Engpässe."
      },
      seed: {
        statement: "Der Ösophagus wird außen von einer Tunica serosa umhüllt, wie der restliche Magen-Darm-Trakt.",
        answer: false,
        solution: "Der Ösophagus unterscheidet sich vom restlichen GI-Trakt: Er hat außen keine Serosa, sondern eine Tunica adventitia (lockeres Bindegewebe). Die Adventitia erlaubt Verschieblichkeit bei der Peristaltik. Der restliche GI-Trakt (Magen, Dünndarm, Dickdarm) besitzt eine Tunica serosa als äußerste Schicht."
      },
      water: {
        statement: "Der Ösophagus wird motorisch durch den N. vagus gesteuert, der die propulsive Peristaltik koordiniert.",
        answer: true,
        solution: "Der N. vagus (X. Hirnnerv) versorgt den Ösophagus motorisch und koordiniert die Peristaltik. Von innen nach außen: Tunica mucosa (mehrschichtiges unverhorntes Plattenepithel + Lamina propria + Lamina muscularis mucosae), Tunica submucosa (Bindegewebe + Glandulae oesophageae), Tunica muscularis (Stratum circulare + Stratum longitudinale), Tunica adventitia."
      }
    },
    harvestQuestions: [
      {
        id: "oesophagus_h1",
        type: "mc",
        question: "In welchem Abstand von der Zahnreihe liegt die Constrictio bronchoaortica des Ösophagus?",
        options: [
          { text: "ca. 25 cm (Höhe Aortenbogen, Th4)", correct: true },
          { text: "ca. 15 cm", correct: false },
          { text: "ca. 40 cm", correct: false },
          { text: "ca. 35 cm", correct: false }
        ],
        explanation: "Die Constrictio bronchoaortica liegt auf Höhe des Aortenbogens (Th4), ca. 25 cm ab der Zahnreihe. Die Constrictio cricoidea liegt bei ca. 15 cm, die Constrictio diaphragmatica (Hiatus) bei ca. 40 cm."
      },
      {
        id: "oesophagus_h2",
        type: "true_false",
        statement: "Die äußerste Schicht des Ösophagus ist — anders als beim restlichen Magen-Darm-Trakt — eine Tunica adventitia und keine Serosa.",
        answer: true,
        explanation: "Der Ösophagus hat außen eine Tunica adventitia (lockeres Bindegewebe), die Verschieblichkeit bei der Peristaltik erlaubt. Magen, Dünndarm und Dickdarm haben eine Tunica serosa als äußerste Schicht."
      },
      {
        id: "oesophagus_h3",
        type: "mc",
        question: "Welches Nervensystem steuert die Peristaltik des Ösophagus?",
        options: [
          { text: "N. vagus", correct: true },
          { text: "N. glossopharyngeus", correct: false },
          { text: "N. phrenicus", correct: false },
          { text: "Plexus brachialis", correct: false }
        ],
        explanation: "Der N. vagus (X. Hirnnerv) versorgt den Ösophagus motorisch und koordiniert die Peristaltik. Der N. phrenicus versorgt das Zwerchfell, der N. glossopharyngeus Rachen und Zunge."
      },
      {
        id: "oesophagus_h4",
        type: "mc",
        question: "Wie lang ist der Ösophagus beim Erwachsenen?",
        options: [
          { text: "23–28 cm", correct: true },
          { text: "12–15 cm", correct: false },
          { text: "35–40 cm", correct: false },
          { text: "50–55 cm", correct: false }
        ],
        explanation: "Der Ösophagus ist 23–28 cm lang und hat einen Außendurchmesser von 3–3,5 cm. Er reicht von C6/C7 bis Th9–Th11."
      },
      {
        id: "oesophagus_h5",
        type: "true_false",
        statement: "Die Constrictio cricoidea ist die am weitesten von der Zahnreihe entfernte Engstelle des Ösophagus.",
        answer: false,
        explanation: "Die Constrictio cricoidea liegt mit ca. 15 cm am nächsten an der Zahnreihe. Die am weitesten entfernte Engstelle ist die Constrictio diaphragmatica (Hiatus oesophageus) bei ca. 40 cm."
      }
    ],
    phase4Questions: [
      {
        id: "oesophagus_mc1",
        type: "mc",
        question: "Welche Aussagen zu den physiologischen Engstellen des Ösophagus sind korrekt?",
        options: [
          { text: "Die Constrictio cricoidea liegt ca. 15 cm von der Zahnreihe entfernt", correct: true },
          { text: "Die Constrictio bronchoaortica liegt ca. 25 cm von der Zahnreihe entfernt", correct: true },
          { text: "Die Constrictio diaphragmatica liegt ca. 40 cm von der Zahnreihe entfernt", correct: true },
          { text: "Es gibt insgesamt vier physiologische Engstellen des Ösophagus", correct: false }
        ]
      },
      {
        id: "oesophagus_mc2",
        type: "mc",
        question: "Welche Aussagen zum Feinbau des Ösophagus sind korrekt?",
        options: [
          { text: "Die innerste Schicht ist eine Tunica mucosa aus mehrschichtigem unverhorntem Plattenepithel", correct: true },
          { text: "Die äußerste Schicht ist eine Tunica adventitia (keine Serosa)", correct: true },
          { text: "Die Tunica submucosa enthält Glandulae oesophageae", correct: true },
          { text: "Der Ösophagus hat außen eine Serosa wie Magen und Dünndarm", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "magen_aufbau",
    title: "Magen: Anatomie, Abschnitte und Muskulatur",
    contextHint: "Studienbrief 1038 Verdauungstrakt – Magenanatomie",
    phase1: {
      soil: {
        statement: "Der Magen liegt intraperitoneal im linken Oberbauch und gliedert sich in Kardia, Fundus, Corpus, Antrum und Pylorus.",
        answer: true,
        solution: "Die Magenabschnitte haben klinische Bedeutung: Die Kardia (Ostium cardiae) ist Eingang; hier findet ein Gewebewechsel statt (Plattenepithel → Zylinderepithel), der Geschwüre und Tumoren begünstigt. Der Fundus (kuppelförmig) enthält Luftblasen → Aufstoßen. Das Corpus ist der Hauptteil. Das Antrum leitet in den Pylorus über, der durch den M. sphincter pylori in die Ampulla duodeni öffnet."
      },
      seed: {
        statement: "Die Curvatura major liegt rechts und konkav; das Omentum majus hängt an ihr in Richtung Leber.",
        answer: false,
        solution: "Die Curvatura major liegt links und ist konvex. An ihr hängt das Omentum majus (Bauchfellschürze), das nach unten in die Bauchhöhle hängt. Die Curvatura minor liegt rechts und ist konkav; an ihr hängt das Omentum minus, das zum Ligamentum hepatogastricum wird und zur Leber zieht."
      },
      water: {
        statement: "Die Magenwand besitzt im Gegensatz zum restlichen GI-Trakt drei Muskelschichten: Längs-, Ring- und eine innerste schräge Muskelschicht.",
        answer: true,
        solution: "Der restliche GI-Trakt hat nur zwei Muskelschichten (Längs + Ring). Der Magen hat zusätzlich eine innerste schräge Muskelschicht, die den Chymus durchmischt und die Magenstraße vom Magensack trennt. Die innere Ringmuskelschicht erzeugt Peristaltik und Magenentleerung, die äußere Längsmuskelschicht die Grundkontraktion."
      }
    },
    harvestQuestions: [
      {
        id: "magen_aufbau_h1",
        type: "mc",
        question: "An welchem Magenabschnitt kommen Geschwüre am häufigsten vor, und was erklärt die hohe Tumoranfälligkeit?",
        options: [
          { text: "Kardia; dort findet ein Gewebewechsel (Plattenepithel → Zylinderepithel) statt", correct: true },
          { text: "Pylorus; der Sphinkter erzeugt mechanischen Druck", correct: false },
          { text: "Fundus; Luftblasen verursachen lokale Irritationen", correct: false },
          { text: "Antrum; höchste Säurekonzentration im Antrum", correct: false }
        ],
        explanation: "An der Kardia wechselt das Plattenepithel des Ösophagus in das Zylinderepithel des Magens. Dieser Gewebewechsel ist ein typischer Ort für Geschwüre und maligne Tumore (z. B. Adenokarzinom des gastroösophagealen Übergangs)."
      },
      {
        id: "magen_aufbau_h2",
        type: "true_false",
        statement: "Der Fundus des Magens enthält typischerweise Luftblasen und ist der Grund für das Aufstoßen nach dem Essen.",
        answer: true,
        explanation: "Der kuppelförmige Fundus liegt oberhalb der Kardia und sammelt beim Stehen Luft (z. B. aus kohlensäurehaltigen Getränken). Diese Luft wird durch Aufstoßen (Rülpsen) entlassen."
      },
      {
        id: "magen_aufbau_h3",
        type: "mc",
        question: "Was ist das Omentum majus?",
        options: [
          { text: "Eine Bauchfellschürze, die an der Curvatura major hängt und in die Bauchhöhle herabhängt", correct: true },
          { text: "Eine Verbindung zwischen Magen und Leber an der Curvatura minor", correct: false },
          { text: "Ein Muskelband am Pylorus", correct: false },
          { text: "Die Bauchfellhülle des Ösophagus", correct: false }
        ],
        explanation: "Das Omentum majus (große Netz) hängt als Bauchfellschürze an der Curvatura major und fällt über die Darmschlingen. Das Omentum minus verbindet Magen und Leber (Curvatura minor → Ligamentum hepatogastricum)."
      },
      {
        id: "magen_aufbau_h4",
        type: "mc",
        question: "Welche Funktion hat die innerste (schräge) Muskelschicht der Magenwand?",
        options: [
          { text: "Durchmischung des Chymus und Trennung von Magenstraße und Magensack", correct: true },
          { text: "Peristaltik und Magenentleerung durch den Pylorus", correct: false },
          { text: "Verschluss des Pylorus (Sphinkterfunktion)", correct: false },
          { text: "Transport entlang der Curvatura minor (Magenstraße)", correct: false }
        ],
        explanation: "Die innerste schräge Muskelschicht ist nur im Magen vorhanden. Sie durchmischt den Chymus und trennt die Magenstraße (Transportkanal) vom Magensack (Verdauungsreservoir). Die innere Ringschicht steuert Peristaltik und Entleerung."
      },
      {
        id: "magen_aufbau_h5",
        type: "true_false",
        statement: "Die Magenstraße dient der enzymatischen Verdauung von Nahrung im Magen.",
        answer: false,
        explanation: "Die Magenstraße ist ein Transportkanal entlang der Curvatura minor und dient dem raschen Transport des Chymus — nicht der Verdauung. Die Verdauung findet im Magensack (Corpus und Fundus) statt, wo die Nahrung mit Magensaft durchmischt wird."
      }
    ],
    phase4Questions: [
      {
        id: "magen_aufbau_mc1",
        type: "mc",
        question: "Welche Aussagen zu den Magenabschnitten und ihrer klinischen Bedeutung sind korrekt?",
        options: [
          { text: "An der Kardia findet ein Gewebewechsel statt, der Geschwüre und Tumoren begünstigt", correct: true },
          { text: "Im Fundus sammeln sich Luftblasen, was Aufstoßen erklärt", correct: true },
          { text: "Der Pylorus wird durch den M. sphincter pylori kontrolliert", correct: true },
          { text: "Die Curvatura major liegt rechts und hängt das Omentum minus", correct: false }
        ]
      },
      {
        id: "magen_aufbau_mc2",
        type: "mc",
        question: "Welche Aussagen zur Magenmuskulatur und Schleimhaut sind korrekt?",
        options: [
          { text: "Die Magenwand hat drei Muskelschichten (Längs-, Ring- und schräge Muskelschicht)", correct: true },
          { text: "Die schräge Muskelschicht dient der Chymus-Durchmischung", correct: true },
          { text: "Die Magenstraße dient dem Transport, nicht der Verdauung", correct: true },
          { text: "Das Omentum majus hängt an der Curvatura minor in Richtung Leber", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "magen_sekretion",
    title: "Magendrüsen, Magensaft und Sekretionsphasen",
    contextHint: "Studienbrief 1038 Verdauungstrakt – Magensekretion",
    phase1: {
      soil: {
        statement: "Belegzellen der Magenschleimhaut produzieren sowohl Salzsäure (HCl) als auch den Intrinsic-Faktor, der für die Vitamin-B₁₂-Resorption im terminalen Ileum notwendig ist.",
        answer: true,
        solution: "Der Magensaft wird täglich in einer Menge von 2–3 Litern produziert und hat einen pH von 0,8–1,5 (H⁺-Gradient 1:10⁶). Drei Zelltypen: Belegzellen (HCl: aktiviert Pepsinogen, erzeugt pH-Optimum, denaturiert Keime; + Intrinsic-Faktor). Hauptzellen (Pepsinogen = 7 eiweißspaltende Enzyme). Nebenzellen (Muzin = Magenschleim aus Glykoproteinen; schützt Schleimhaut vor Eigenverdauung; können sich zu Hauptzellen differenzieren)."
      },
      seed: {
        statement: "Hauptzellen der Magenschleimhaut sezernieren Muzin, das die Magenschleimhaut vor Eigenverdauung schützt.",
        answer: false,
        solution: "Muzin (Magenschleim) wird von den Nebenzellen produziert. Die Hauptzellen produzieren Pepsinogen — eine Vorstufe von 7 eiweißspaltenden Enzymen (Pepsin). Pepsinogen wird durch die von den Belegzellen produzierte HCl aktiviert. Die Nebenzellen können sich bei Bedarf zu Hauptzellen differenzieren."
      },
      water: {
        statement: "Wenn saurer Chymus (pH < 4) das Duodenum erreicht, wird Sekretin freigesetzt — ein Gastrin-Antagonist, der die Magensäureproduktion hemmt und Pankreas sowie Leber stimuliert.",
        answer: true,
        solution: "In der intestinalen Sekretionsphase: Sobald der Chymus das Duodenum erreicht und der pH unter 4 sinkt, wird Sekretin ausgeschüttet. Sekretin hemmt Gastrin (Gastrin-Antagonist), reduziert die HCl-Produktion und stimuliert Bauchspeicheldrüse und Leber zur Bicarbonat-Sekretion. Cephalische Phase (N. vagus + Gastrin), gastrale Phase (lokale Reize). Hypersekretion bei Stress → Gastritis/Geschwüre."
      }
    },
    harvestQuestions: [
      {
        id: "magen_sekretion_h1",
        type: "mc",
        question: "Welche Zellen der Magenschleimhaut produzieren den Intrinsic-Faktor?",
        options: [
          { text: "Belegzellen", correct: true },
          { text: "Hauptzellen", correct: false },
          { text: "Nebenzellen", correct: false },
          { text: "Becherzellen", correct: false }
        ],
        explanation: "Belegzellen (Parietalzellen) produzieren zwei Sekrete: HCl und den Intrinsic-Faktor. Fehlt der Intrinsic-Faktor, kann Vitamin B₁₂ im terminalen Ileum nicht resorbiert werden → perniziöse Anämie."
      },
      {
        id: "magen_sekretion_h2",
        type: "true_false",
        statement: "Ein Mangel an Intrinsic-Faktor kann zu einer perniziösen Anämie führen, da Vitamin B₁₂ ohne ihn nicht resorbiert werden kann.",
        answer: true,
        explanation: "Vitamin B₁₂ kann im terminalen Ileum nur in Verbindung mit dem Intrinsic-Faktor (von Belegzellen produziert) resorbiert werden. Fehlt der Intrinsic-Faktor (z. B. bei Autoimmungastritis oder Magenresektion), entsteht eine perniziöse Anämie — Therapie: B₁₂ intramuskulär."
      },
      {
        id: "magen_sekretion_h3",
        type: "mc",
        question: "Welches Hormon ist der stärkste Stimulus für die Salzsäureproduktion im Magen?",
        options: [
          { text: "Gastrin", correct: true },
          { text: "Sekretin", correct: false },
          { text: "Insulin", correct: false },
          { text: "Cholecystokinin", correct: false }
        ],
        explanation: "Gastrin ist das stärkste Stimulans für die HCl-Produktion der Belegzellen. Es wird in der cephalischen und gastralen Phase freigesetzt. Sekretin ist der Antagonist und hemmt Gastrin bei niedrigem Duodenum-pH."
      },
      {
        id: "magen_sekretion_h4",
        type: "mc",
        question: "Was produzieren die Nebenzellen der Magenschleimhaut?",
        options: [
          { text: "Muzin (Magenschleim aus Glykoproteinen)", correct: true },
          { text: "Pepsinogen", correct: false },
          { text: "Salzsäure (HCl)", correct: false },
          { text: "Intrinsic-Faktor", correct: false }
        ],
        explanation: "Nebenzellen produzieren Muzin (mucöser Schleim aus Glykoproteinen). Muzin bildet eine Schutzschicht, die die Magenschleimhaut vor Eigenverdauung durch HCl und Pepsin schützt. Nebenzellen können sich zu Hauptzellen differenzieren."
      },
      {
        id: "magen_sekretion_h5",
        type: "true_false",
        statement: "Die cephalische Phase der Magensekretion wird hauptsächlich durch den N. vagus vermittelt und kann bereits durch Hunger oder den Anblick von Essen ausgelöst werden.",
        answer: true,
        explanation: "Die cephalische Phase beginnt vor dem Essen: Reize wie Hunger, Geruch, Anblick oder Gedanken an Essen stimulieren über den N. vagus die Gastrinfreisetzung und damit die HCl-Produktion. ZNS-Einflüsse (Durst, Hunger) spielen ebenfalls eine Rolle."
      }
    ],
    phase4Questions: [
      {
        id: "magen_sekretion_mc1",
        type: "mc",
        question: "Welche Aussagen zu den Magenzellen und ihren Produkten sind korrekt?",
        options: [
          { text: "Belegzellen produzieren HCl und den Intrinsic-Faktor", correct: true },
          { text: "Hauptzellen produzieren Pepsinogen (7 eiweißspaltende Enzyme)", correct: true },
          { text: "Nebenzellen produzieren Muzin und können sich zu Hauptzellen differenzieren", correct: true },
          { text: "Belegzellen produzieren Gastrin als stärksten HCl-Stimulus", correct: false }
        ]
      },
      {
        id: "magen_sekretion_mc2",
        type: "mc",
        question: "Welche Aussagen zu den Sekretionsphasen des Magens sind korrekt?",
        options: [
          { text: "Die cephalische Phase wird durch den N. vagus vermittelt", correct: true },
          { text: "Gastrin ist der stärkste Stimulus für die HCl-Produktion", correct: true },
          { text: "Sekretin ist ein Gastrin-Antagonist, ausgelöst durch pH < 4 im Duodenum", correct: true },
          { text: "Hyposekretion bei Stress führt zu Gastritis und Geschwüren", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "duenndarm",
    title: "Dünndarm: Abschnitte, Oberfläche und Motorik",
    contextHint: "Studienbrief 1038 Verdauungstrakt – Dünndarm",
    phase1: {
      soil: {
        statement: "Die Gesamtoberfläche des Dünndarms wird durch drei Stufen vergrößert: Kerckring-Falten (≈1,2 m²), Zotten (≈12 m²) und Mikrovilli (≈240 m²).",
        answer: true,
        solution: "Das Duodenum (25–30 cm, C-förmig) gliedert sich in Pars superior (Ampulla duodeni), Pars descendens (retroperitoneal; Papilla vateri: Einmündung von Ductus pancreaticus + Ductus choledochus), Pars horizontalis und Pars ascendens. Die Oberfläche ohne Falten beträgt ca. 0,4 m². Kerckring-Falten (8 mm hoch) → 1,2 m²; Zotten (0,3–1 mm) → 12 m²; Mikrovilli (50–100 Mio/mm²) → 240 m²."
      },
      seed: {
        statement: "Brunner-Drüsen sind gleichmäßig im gesamten Dünndarm verteilt und sezernieren sauren Schleim zur Vorbereitung der Resorption.",
        answer: false,
        solution: "Brunner-Drüsen kommen ausschließlich im Duodenum vor. Sie sezernieren alkalisches Sekret, das den sauren Chymus aus dem Magen neutralisiert und die Verdauungsenzyme des Pankreas aktiviert. Paneth-Zellen (in den Lieberkühnn-Krypten) produzieren antimikrobielle Defensine. Becherzellen sezernieren mucopolysaccharidreichen Schleim."
      },
      water: {
        statement: "Das enterische Nervensystem (Bauchhirn) besteht aus dem motorischen Plexus myentericus (Auerbach-Plexus) und dem sekretorischen Plexus submucosus (Meissner-Plexus).",
        answer: true,
        solution: "Der Plexus myentericus (Auerbach-Plexus) liegt zwischen Längs- und Ringmuskelschicht und steuert die Motorik (koordiniert teils mit N. vagus). Der Plexus submucosus (Meissner-Plexus) liegt in der Submukosa und steuert die Sekretion. Zusammen bilden sie das enterische Nervensystem, das die Funktion des Darms weitgehend autonom regelt ('Bauchhirn'). Das terminale Ileum ist der einzige Ort für Vitamin-B₁₂-Resorption."
      }
    },
    harvestQuestions: [
      {
        id: "duenndarm_h1",
        type: "mc",
        question: "An welcher Stelle des Dünndarms münden Ductus pancreaticus und Ductus choledochus gemeinsam?",
        options: [
          { text: "Papilla vateri im Duodenum (Pars descendens)", correct: true },
          { text: "Im Jejunum", correct: false },
          { text: "Im terminalen Ileum", correct: false },
          { text: "An der Ampulla duodeni (Pars superior)", correct: false }
        ],
        explanation: "Die Papilla vateri (Papilla duodeni major) liegt in der Pars descendens des Duodenums. Hier münden der Ductus pancreaticus (Bauchspeicheldrüsengang) und der Ductus choledochus (gemeinsamer Gallengang) gemeinsam ein."
      },
      {
        id: "duenndarm_h2",
        type: "true_false",
        statement: "Das terminale Ileum ist der einzige Ort im GI-Trakt, an dem Vitamin B₁₂ resorbiert werden kann.",
        answer: true,
        explanation: "Vitamin B₁₂ wird ausschließlich im terminalen Ileum resorbiert — gebunden an den Intrinsic-Faktor der Belegzellen. Erkrankungen (Morbus Crohn) oder Resektion des terminalen Ileums führen zu Vitamin-B₁₂-Mangel und perniziöser Anämie → Therapie: B₁₂ i.m."
      },
      {
        id: "duenndarm_h3",
        type: "mc",
        question: "Welche Zellen der Lieberkühnn-Krypten produzieren antimikrobielle Defensine?",
        options: [
          { text: "Paneth-Zellen", correct: true },
          { text: "Becherzellen", correct: false },
          { text: "Belegzellen", correct: false },
          { text: "Brunner-Drüsenzellen", correct: false }
        ],
        explanation: "Paneth-Zellen sitzen am Grund der Lieberkühnn-Krypten und produzieren Defensine, die antimikrobiell wirken. Becherzellen produzieren Schleim (mucopolysaccharidreich, auch in Atemwegen), Brunner-Drüsen sezernieren alkalisches Sekret (nur Duodenum)."
      },
      {
        id: "duenndarm_h4",
        type: "mc",
        question: "Welche Bewegungsform des Dünndarms dient hauptsächlich der Durchmischung des Chymus?",
        options: [
          { text: "Segmentationsperistaltik (Ringmuskel)", correct: true },
          { text: "Propulsive Peristaltik", correct: false },
          { text: "Pendelbewegung", correct: false },
          { text: "Retrograde Peristaltik", correct: false }
        ],
        explanation: "Die Segmentationsperistaltik (rhythmische Kontraktion der Ringmuskulatur) teilt den Chymus in Segmente und durchmischt ihn mit Verdauungsenzymen — ohne Vorwärtsbewegung. Die propulsive Peristaltik transportiert den Chymus vorwärts. Pendelbewegungen (Längsmuskel, alle 8–10 Sek) unterstützen die Durchmischung."
      },
      {
        id: "duenndarm_h5",
        type: "true_false",
        statement: "Der Plexus myentericus (Auerbach-Plexus) liegt zwischen Längs- und Ringmuskelschicht und ist für die motorische Steuerung des Darms zuständig.",
        answer: true,
        explanation: "Der Plexus myentericus (Auerbach-Plexus) liegt anatomisch zwischen der äußeren Längs- und der inneren Ringmuskelschicht und koordiniert die Darmmotorik. Der Plexus submucosus (Meissner-Plexus) liegt in der Submukosa und steuert die Sekretion."
      }
    ],
    phase4Questions: [
      {
        id: "duenndarm_mc1",
        type: "mc",
        question: "Welche Aussagen zur Oberflächenvergrößerung des Dünndarms sind korrekt?",
        options: [
          { text: "Kerckring-Falten vergrößern die Oberfläche auf ca. 1,2 m²", correct: true },
          { text: "Mikrovilli erhöhen die Gesamtoberfläche auf ca. 200–400 m²", correct: true },
          { text: "Die Gesamtoberfläche ohne Falten beträgt ca. 0,4 m²", correct: true },
          { text: "Brunner-Drüsen kommen im gesamten Dünndarm vor und sezernieren sauren Schleim", correct: false }
        ]
      },
      {
        id: "duenndarm_mc2",
        type: "mc",
        question: "Welche Aussagen zum enterischen Nervensystem und Dünndarm sind korrekt?",
        options: [
          { text: "Der Plexus myentericus (Auerbach-Plexus) ist motorisch und liegt zwischen Längs- und Ringmuskel", correct: true },
          { text: "Der Plexus submucosus (Meissner-Plexus) steuert die Sekretion", correct: true },
          { text: "Das terminale Ileum ist der einzige Ort der Vitamin-B₁₂-Resorption", correct: true },
          { text: "Propulsive Peristaltik dient der Durchmischung des Chymus", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "dickdarm",
    title: "Dickdarm: Abschnitte, Mikrobiom und Motorik",
    contextHint: "Studienbrief 1038 Verdauungstrakt – Dickdarm und Mikrobiom",
    phase1: {
      soil: {
        statement: "Der Dickdarm besitzt drei charakteristische äußere Merkmale: Taenien (3 Längsmuskelstreifen), Haustren (dynamische Ausbuchtungen) und Appendices epiploicae (goldgelbe Fettanhängsel).",
        answer: true,
        solution: "Der 1,2–1,5 m lange Dickdarm gliedert sich in: Caecum (mit Appendix vermiformis; rudimentär; Lymphfollikel; Appendizitis), Colon ascendens, transversum, descendens, sigmoideum, Rectum und Anus. Die Bauhin-Klappe (Ostium ileocaecale) verhindert Rückfluss. Meckel-Divertikel (50–60 cm vor Einmündung) = Überbleibsel des Dottergangs. Haustren entstehen durch Plicae semilunares (dynamisch). Appendices epiploicae = fetthaltige Anhängsel, ernährungsabhängig in der Größe."
      },
      seed: {
        statement: "Das Darmmikrobiom ist bereits bei der Geburt vollständig besiedelt und besteht aus ca. 100 Bakterienspezies.",
        answer: false,
        solution: "Das Darmmikrobiom ist bei der Geburt steril und baut sich erst nach der Geburt auf. Beim Erwachsenen enthält es >1000 Bakterienspezies mit einer Gesamtmasse von ca. 1,5 kg; bis zu 99% sind anaerob. Es gibt drei Enterotypen: Bacteroides (bei fett-/proteinreicher Ernährung), Prevotella (bei KH-reicher Ernährung), Ruminococcus (Mischtyp). E. coli synthetisiert Vitamin K."
      },
      water: {
        statement: "Der innere Schließmuskel (M. sphincter ani internus) ist glatte Muskulatur und unwillkürlich, der äußere (M. sphincter ani externus) ist quergestreift und willkürlich kontrolliert — ZNS-Kontrolle ab dem 2. Lebensjahr.",
        answer: true,
        solution: "Der M. sphincter ani internus (glatte Muskulatur, unwillkürlich) hält den Darm in Ruhe geschlossen. Der M. sphincter ani externus (quergestreifte Muskulatur, willkürlich) kann bewusst kontrahiert werden — die ZNS-Kontrolle reift erst nach dem 2. Lebensjahr, weshalb Sauberkeitserziehung erst dann sinnvoll ist. Fäzes bestehen aus 75–80% Wasser und 20–25% Feststoffen (Cellulose, Salze, Bakterien bis 30% der festen Materie → hohe Infektiosität)."
      }
    },
    harvestQuestions: [
      {
        id: "dickdarm_h1",
        type: "mc",
        question: "Welche Funktion hat die Bauhin-Klappe (Ostium ileocaecale)?",
        options: [
          { text: "Sie verhindert den Rückfluss vom Dickdarm in den Dünndarm", correct: true },
          { text: "Sie reguliert den Übergang von Magen zu Dünndarm (Pylorus-Funktion)", correct: false },
          { text: "Sie trennt Colon transversum und Colon descendens", correct: false },
          { text: "Sie steuert den Defäkationsreflex", correct: false }
        ],
        explanation: "Die Bauhin-Klappe (Valva ileocaecalis, Ostium ileocaecale) liegt am Übergang von Ileum zu Caecum und verhindert den Rückfluss von Dickdarminhalt in den Dünndarm."
      },
      {
        id: "dickdarm_h2",
        type: "true_false",
        statement: "Das Darmmikrobiom kann Vitamin K synthetisieren.",
        answer: true,
        explanation: "E. coli und andere Darmbakterien synthetisieren Vitamin K (Menachinon, Vitamin K2) im Dickdarm. Dies ist eine wichtige Funktion des Mikrobioms, da der Mensch Vitamin K für die Blutgerinnung benötigt."
      },
      {
        id: "dickdarm_h3",
        type: "mc",
        question: "Welcher Enterotyp des Darmmikrobioms dominiert bei fett- und proteinreicher Ernährung?",
        options: [
          { text: "Bacteroides", correct: true },
          { text: "Prevotella", correct: false },
          { text: "Ruminococcus", correct: false },
          { text: "Lactobacillus", correct: false }
        ],
        explanation: "Der Enterotyp Bacteroides dominiert bei fett- und proteinreicher Ernährung (westliche Diät). Prevotella überwiegt bei kohlenhydratreicher Ernährung. Ruminococcus ist ein Mischtyp. Die Enterotypen spiegeln Ernährungsgewohnheiten wider."
      },
      {
        id: "dickdarm_h4",
        type: "mc",
        question: "Warum ist Stuhl (Fäzes) infektiös?",
        options: [
          { text: "Er enthält bis zu 30 % Bakterien bezogen auf die feste Materie", correct: true },
          { text: "Er enthält 75–80 % Wasser mit gelösten Viren", correct: false },
          { text: "Er besteht ausschließlich aus abgestorbenen Darmzellen", correct: false },
          { text: "Er enthält Gallensalze in hoher bakterizider Konzentration", correct: false }
        ],
        explanation: "Fäzes bestehen aus 75–80% Wasser und 20–25% Feststoffen. Von der festen Materie können bis zu 30% auf Bakterien entfallen — daher ist Stuhl hochinfektiös und erfordert entsprechende Hygienemaßnahmen."
      },
      {
        id: "dickdarm_h5",
        type: "true_false",
        statement: "Der äußere Schließmuskel des Anus (M. sphincter ani externus) steht erst nach dem 2. Lebensjahr unter willkürlicher ZNS-Kontrolle.",
        answer: true,
        explanation: "Der M. sphincter ani externus besteht aus quergestreifter Muskulatur und ist willkürlich kontrollierbar. Da die ZNS-Reifung für diese Kontrolle erst nach dem 2. Lebensjahr abgeschlossen ist, ist Sauberkeitserziehung erst dann sinnvoll und erfolgreich."
      }
    ],
    phase4Questions: [
      {
        id: "dickdarm_mc1",
        type: "mc",
        question: "Welche äußeren Merkmale charakterisieren den Dickdarm morphologisch?",
        options: [
          { text: "Taenien (3 Längsmuskelstreifen)", correct: true },
          { text: "Haustren (dynamische Ausbuchtungen) mit Plicae semilunares", correct: true },
          { text: "Appendices epiploicae (goldgelbe Fettanhängsel)", correct: true },
          { text: "Kerckring-Falten (Plicae circulares) wie im Dünndarm", correct: false }
        ]
      },
      {
        id: "dickdarm_mc2",
        type: "mc",
        question: "Welche Aussagen zum Darmmikrobiom sind korrekt?",
        options: [
          { text: "Der Darm ist bei der Geburt steril", correct: true },
          { text: "Die Gesamtbakterienmasse beträgt beim Erwachsenen ca. 1,5 kg", correct: true },
          { text: "E. coli synthetisiert Vitamin K im Dickdarm", correct: true },
          { text: "Der Enterotyp Prevotella dominiert bei fett- und proteinreicher Ernährung", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "peritoneum_lage",
    title: "Peritoneum und Lage der Bauchorgane",
    contextHint: "Studienbrief 1038 Verdauungstrakt – Peritoneum und Organlokalisation",
    phase1: {
      soil: {
        statement: "Der Douglas-Raum ist die tiefste Stelle der weiblichen Bauchhöhle und liegt zwischen Gebärmutter und Mastdarm — hier kann sich ein Douglas-Abszess entwickeln.",
        answer: true,
        solution: "Das Peritoneum (Bauchfell) überzieht die Bauchhöhle und Organe. Intraperitoneal: Magen, Leber, Milz, Dünndarm (ohne Duodenum), Colon transversum, Colon sigmoideum. Primär retroperitoneal (nie peritonealisiert): Nieren, Nebennieren, Harnleiter, V. cava inferior, Aorta abdominalis. Sekundär retroperitoneal (ursprünglich intraperitoneal): Duodenum, Pankreas, Colon ascendens, Colon descendens, Caecum. Douglas-Raum = tiefste Stelle der Bauchhöhle; zwischen Uterus und Rectum."
      },
      seed: {
        statement: "Das Duodenum liegt intraperitoneal, da es als Teil des Dünndarms vollständig von Bauchfell überzogen ist.",
        answer: false,
        solution: "Das Duodenum liegt sekundär retroperitoneal — entwicklungsgeschichtlich war es intraperitoneal, wurde aber im Laufe der Entwicklung durch das Bauchfell hinterwandständig fixiert. Intraperitoneal ist nur der restliche Dünndarm (Jejunum + Ileum), der am Mesenterium hängt. Pankreas, Colon ascendens und Colon descendens sind ebenfalls sekundär retroperitoneal."
      },
      water: {
        statement: "Primär retroperitoneale Organe (z. B. Nieren, Nebennieren) hatten niemals eine peritoneale Hülle, während sekundär retroperitoneale Organe (z. B. Duodenum, Pankreas) ursprünglich intraperitoneal waren.",
        answer: true,
        solution: "Der Unterschied zwischen primär und sekundär retroperitoneal ist entwicklungsgeschichtlich: Primär retroperitoneal = lagen von Anfang an hinter dem Bauchfell (Nieren, Nebennieren, Harnleiter, V. cava, Aorta abdominalis). Sekundär retroperitoneal = waren intraperitoneal und wurden durch Verlagerung des Bauchfells hinterwandständig (Duodenum, Pankreas, Colon ascendens, Colon descendens, Caecum)."
      }
    },
    harvestQuestions: [
      {
        id: "peritoneum_lage_h1",
        type: "mc",
        question: "Welche der folgenden Organe liegen intraperitoneal?",
        options: [
          { text: "Magen, Milz und Colon transversum", correct: true },
          { text: "Nieren, Nebennieren und Aorta abdominalis", correct: false },
          { text: "Duodenum, Pankreas und Colon ascendens", correct: false },
          { text: "Harnleiter und V. cava inferior", correct: false }
        ],
        explanation: "Intraperitoneal: Magen, Leber, Milz, Jejunum + Ileum, Colon transversum, Colon sigmoideum. Nieren, Nebennieren, Aorta = primär retroperitoneal. Duodenum, Pankreas, Colon ascendens/descendens = sekundär retroperitoneal."
      },
      {
        id: "peritoneum_lage_h2",
        type: "true_false",
        statement: "Das Duodenum liegt sekundär retroperitoneal, obwohl es entwicklungsgeschichtlich ursprünglich intraperitoneal war.",
        answer: true,
        explanation: "Das Duodenum, das Pankreas sowie Colon ascendens und descendens sind sekundär retroperitoneal — sie lagen ursprünglich intraperitoneal und wurden im Verlauf der Entwicklung durch das Bauchfell fixiert und hinterwandständig."
      },
      {
        id: "peritoneum_lage_h3",
        type: "mc",
        question: "Was ist der Douglas-Raum?",
        options: [
          { text: "Die tiefste Stelle der Bauchhöhle zwischen Gebärmutter und Mastdarm", correct: true },
          { text: "Ein Lymphabflusskanal im Retroperitoneum", correct: false },
          { text: "Ein Blindsack am Übergang von Dünn- zu Dickdarm (Caecum)", correct: false },
          { text: "Eine Erweiterung des Bauchfells in der Leistengegend", correct: false }
        ],
        explanation: "Der Douglas-Raum (Excavatio rectouterina) ist die tiefste Stelle der Bauchhöhle bei der Frau — zwischen Uterus und Rectum. Hier kann sich Flüssigkeit oder Eiter (Douglas-Abszess) ansammeln."
      },
      {
        id: "peritoneum_lage_h4",
        type: "mc",
        question: "Welche Organe sind primär retroperitoneal?",
        options: [
          { text: "Nieren, Nebennieren, Harnleiter, Aorta abdominalis und V. cava inferior", correct: true },
          { text: "Magen und Milz", correct: false },
          { text: "Duodenum und Pankreas", correct: false },
          { text: "Colon transversum und Colon sigmoideum", correct: false }
        ],
        explanation: "Primär retroperitoneal = von Anfang an ohne peritoneale Hülle: Nieren, Nebennieren, Harnleiter, Aorta abdominalis, V. cava inferior. Diese lagen nie intraperitoneal."
      },
      {
        id: "peritoneum_lage_h5",
        type: "true_false",
        statement: "Das Colon sigmoideum liegt retroperitoneal.",
        answer: false,
        explanation: "Das Colon sigmoideum liegt intraperitoneal — es hängt am Mesosigmoid und ist vollständig von Bauchfell umhüllt. Retroperitoneal sind Colon ascendens und Colon descendens (sekundär retroperitoneal)."
      }
    ],
    phase4Questions: [
      {
        id: "peritoneum_lage_mc1",
        type: "mc",
        question: "Welche Organe liegen intraperitoneal?",
        options: [
          { text: "Magen", correct: true },
          { text: "Milz", correct: true },
          { text: "Colon sigmoideum", correct: true },
          { text: "Duodenum", correct: false }
        ]
      },
      {
        id: "peritoneum_lage_mc2",
        type: "mc",
        question: "Welche Aussagen zum Retroperitoneum und Douglas-Raum sind korrekt?",
        options: [
          { text: "Nieren und Nebennieren liegen primär retroperitoneal", correct: true },
          { text: "Duodenum und Pankreas liegen sekundär retroperitoneal", correct: true },
          { text: "Der Douglas-Raum liegt zwischen Gebärmutter und Mastdarm", correct: true },
          { text: "Das Colon sigmoideum liegt retroperitoneal", correct: false }
        ]
      }
    ]
  })

];
