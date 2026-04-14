  makeDetailedPlant({
    id: "handknochen_1033",
    title: "Handknochen: Handwurzel, Mittelhand & Finger",
    contextHint: "8 Handwurzelknochen (Merksatz); 5 Mittelhandknochen; 14 Phalangen (2-3-3-3-3); Ellenbogengelenk = 3 Teilgelenke",
    phase1: {
      soil: {
        statement: "Das Ellenbogengelenk besteht aus einem einzigen Teilgelenk zwischen Humerus und Ulna.",
        answer: false,
        solution: "Falsch. Das Ellenbogengelenk (Articulatio cubitii) setzt sich aus drei Teilgelenken zusammen: Articulatio humero radialis (Oberarm-Speichen-Gelenk), Articulatio humero ulnaris (Oberarm-Ellen-Gelenk) und Articulatio radio-ulnaris proximalis (Speichen-Ellen-Gelenk). Es ermöglicht Flexion, Extension, Supination und Pronation.",
      },
      seed: {
        statement: "Die Hand besteht aus Handwurzel, Mittelhand und Fingerknochen.",
        answer: true,
        solution: "Richtig. Der Aufbau der Hand folgt einer dreiteiligen Gliederung: Handwurzelknochen (Carpus, 8 Knochen in zwei Reihen), Mittelhandknochen (Metacarpus, 5 Knochen: Ossa metacarpalia I–V vom Daumen ausgehend) und Fingerknochen (Phalangen: 14 insgesamt, da der Daumen nur 2 Phalangen besitzt: Grundglied und Endglied; die übrigen Finger je 3: Phalanx proximalis, media, distalis).",
      },
      water: {
        statement: "Der Daumen hat wie alle anderen Finger drei Phalangen (Grund-, Mittel- und Endglied).",
        answer: false,
        solution: "Falsch. Dem Daumen fehlt das Mittelglied. Er besitzt nur zwei Phalangen: Grundglied (Phalanx proximalis) und Endglied (Phalanx distalis). Die übrigen vier Finger haben je drei Phalangen. Insgesamt ergeben sich damit 14 Fingerknochen (2 + 3 + 3 + 3 + 3).",
      },
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "hk_h1",
        question: "Wie viele Handwurzelknochen gibt es und wie lautet der zugehörige Merkspruch?",
        options: [
          { text: "8 Knochen; Merkspruch: „Ein Kahn, der fährt im Mondenschein im Dreieck um das Erbsenbein, Vieleck groß, Vieleck klein, am Kopf, da muss ein Haken sein"", correct: true },
          { text: "7 Knochen; kein standardisierter Merkspruch", correct: false },
          { text: "10 Knochen in drei Reihen", correct: false },
          { text: "5 Knochen, identisch mit den Mittelhandknochen", correct: false },
        ],
        explanation: "Die 8 Handwurzelknochen (proximal nach distal): Os scaphoideum (Kahnbein), Os lunatum (Mondbein), Os triquetrum (Dreieckbein), Os pisiforme (Erbsenbein), Os trapezium (großes Vieleckbein), Os trapezoideum (kleines Vieleckbein), Os capitatum (Kopfbein), Os hamatum (Hakenbein). Der Merkspruch hilft, die Reihenfolge zu behalten.",
      },
      {
        type: "mc",
        id: "hk_h2",
        question: "Aus welchen drei Teilgelenken besteht das Ellenbogengelenk (Articulatio cubitii)?",
        options: [
          { text: "Articulatio humero radialis, humero ulnaris und radio-ulnaris proximalis", correct: true },
          { text: "Articulatio humero ulnaris, ulno-radialis und radio-carpalis", correct: false },
          { text: "Schultergelenk, Ellenbogengelenk und Handgelenk", correct: false },
          { text: "Nur ein Gelenk: Humero-Ulnar-Gelenk", correct: false },
        ],
        explanation: "Das Ellenbogengelenk vereint drei Gelenke in einer Kapsel: 1. Art. humero radialis (Humerus – Radius), 2. Art. humero ulnaris (Humerus – Ulna, Hauptgelenk für Flexion/Extension), 3. Art. radio-ulnaris proximalis (Radius – Ulna, für Pronation/Supination). Alle drei Teilgelenke sind von einer gemeinsamen Gelenkkapsel umgeben.",
      },
      {
        type: "mc",
        id: "hk_h3",
        question: "Wie viele Phalangen hat die Hand insgesamt und wie verteilen sie sich auf die Finger?",
        options: [
          { text: "14 Phalangen: Daumen 2, alle anderen Finger je 3 (Grundglied, Mittelglied, Endglied)", correct: true },
          { text: "15 Phalangen: alle 5 Finger haben je 3 Glieder", correct: false },
          { text: "10 Phalangen: je 2 pro Finger", correct: false },
          { text: "12 Phalangen: Daumen 2, Zeigefinger 2, restliche Finger 3", correct: false },
        ],
        explanation: "Daumen (Digitus I): nur Phalanx proximalis + distalis (kein Mittelglied). Finger II–V: je Phalanx proximalis (Grundglied), media (Mittelglied), distalis (Endglied). Summe: 2 + 3 + 3 + 3 + 3 = 14 Phalangen. Die Fingerglieder werden als „Digiti manus" bezeichnet.",
      },
      {
        type: "mc",
        id: "hk_h4",
        question: "Welcher Handwurzelknochen liegt an der anatomischen Tabatière und ist häufig von Frakturen betroffen?",
        options: [
          { text: "Os scaphoideum (Kahnbein)", correct: true },
          { text: "Os lunatum (Mondbein)", correct: false },
          { text: "Os hamatum (Hakenbein)", correct: false },
          { text: "Os capitatum (Kopfbein)", correct: false },
        ],
        explanation: "Das Os scaphoideum (Kahnbein) liegt radial in der proximalen Reihe der Handwurzel und ist an der anatomischen Tabatière tastbar. Es ist der häufigste frakturierte Handwurzelknochen (Sturz auf die ausgestreckte Hand). Besonderes Risiko: schlechte Blutversorgung → Gefahr der avaskulären Knochennekrose bei Fraktur.",
      },
      {
        type: "true_false",
        id: "hk_h5",
        statement: "Mittelhandknochen (Ossa metacarpalia) und Phalangen werden beide zu den Handknochen gezählt.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false },
        ],
        explanation: "Wahr. Der Handknochen-Komplex umfasst: 8 Handwurzelknochen (Carpus) + 5 Mittelhandknochen (Metacarpus: Ossa metacarpalia I–V) + 14 Fingerknochen (Phalangen). Zwischen Mittelhandknochen und Grundgliedern liegen Metakarpophalangealgelenke (MCP-Gelenke); zwischen den Phalangen liegen Interphalangealgelenke (PIP/DIP).",
      },
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "hk_p4_1",
        question: "Welche Bewegungen ermöglicht das Ellenbogengelenk und welche Teilgelenke sind verantwortlich?",
        options: [
          { text: "Flexion/Extension (humero-ulnar), Pronation/Supination (radio-ulnaris proximalis + humero-radialis)", correct: true },
          { text: "Nur Flexion und Extension über das Humero-Ulnar-Gelenk", correct: false },
          { text: "Abduktion und Adduktion über das Humero-Radial-Gelenk", correct: false },
          { text: "Alle Bewegungen werden durch das Art. radio-ulnaris proximalis ermöglicht", correct: false },
        ],
        explanation: "Art. humero ulnaris: Scharniergelenk → Flexion/Extension. Art. radio-ulnaris proximalis (+ distalis): Drehgelenk → Pronation (Handinnenfläche nach unten) / Supination (Handinnenfläche nach oben). Art. humero radialis: beteiligt an Flexion/Extension und Pronation/Supination. Alle drei Teilgelenke arbeiten funktionell zusammen.",
      },
      {
        type: "mc",
        id: "hk_p4_2",
        question: "Welche Aussagen zu Handknochen sind korrekt? (Mehrere richtig)",
        options: [
          { text: "8 Handwurzelknochen bilden den Carpus in zwei Reihen", correct: true },
          { text: "Dem Daumen fehlt das Mittelglied – er hat nur 2 Phalangen", correct: true },
          { text: "Die Mittelhandknochen werden Ossa metacarpalia I–V genannt (vom Daumen ausgehend)", correct: true },
          { text: "Alle fünf Finger haben identisch 3 Phalangen", correct: false },
        ],
        explanation: "Carpus: 8 Knochen in 2 Reihen. Daumen: 2 Phalangen (kein Mittelglied). Metacarpalia: I–V vom Daumen (radial) zur Kleinfingenseite (ulnar). Daumen-Sonderstellung: ermöglicht Oppositionsbewegung (Daumenballengelenk = Sattelgelenk).",
      },
    ],
  }),

  makeDetailedPlant({
    id: "fußknochen_1033",
    title: "Fußknochen: Tarsus, Metatarsus & Sprunggelenke",
    contextHint: "Tarsus = 7 Knochen (Merkspruch); oberes Sprunggelenk = Scharniergelenk; unteres Sprunggelenk = Zapfengelenk; Pronation/Supination vs. Dorsalextension/Plantarflexion",
    phase1: {
      soil: {
        statement: "Das obere Sprunggelenk ermöglicht Pronation und Supination des Fußes.",
        answer: false,
        solution: "Falsch. Das obere Sprunggelenk (Articulatio talocruralis) ist ein Scharniergelenk zwischen Tibia, Fibula und Talus. Es erlaubt Dorsalextension (Zehen hochziehen) und Plantarflexion (Fußspitze strecken). Pronation und Supination werden dagegen im unteren Sprunggelenk ausgeführt, das sich wie ein Zapfengelenk verhält.",
      },
      seed: {
        statement: "Der Tarsus besteht aus sieben Knochen.",
        answer: true,
        solution: "Richtig. Die sieben Fußwurzelknochen (Tarsus): Talus (Sprungbein), Calcaneus (Fersenbein), Os naviculare (Kahnbein), Os cuboideum (Würfelbein) und Ossa cuneiformia (drei Keilbeine: mediales, intermedium, laterale). Merkspruch: „Springt die Ferse in den Kahn, kriegt sie dreimal Keile von dem Würfelbeine!"",
      },
      water: {
        statement: "Talus und Calcaneus sind die größten Knochen des Tarsus.",
        answer: true,
        solution: "Richtig. Der Talus (Sprungbein) bildet das Verbindungsglied zwischen Unterschenkel und Fuß und liegt auf dem Calcaneus (Fersenbein). Der Calcaneus ist der größte Fußknochen und bildet die Fersenauflage. Beide tragen zusammen mit dem Os naviculare das untere Sprunggelenk.",
      },
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "fk_h1",
        question: "Wie lautet der Merkspruch für die Fußwurzelknochen?",
        options: [
          { text: "„Springt die Ferse in den Kahn, kriegt sie dreimal Keile von dem Würfelbeine!"", correct: true },
          { text: "„Ein Kahn, der fährt im Mondenschein im Dreieck um das Erbsenbein"", correct: false },
          { text: "„Talus, Calcaneus, Navicular – so merkt man sich den Tarsus klar"", correct: false },
          { text: "Es gibt keinen Merkspruch für die Fußwurzelknochen", correct: false },
        ],
        explanation: "Der Merkspruch „Springt die Ferse in den Kahn, kriegt sie dreimal Keile von dem Würfelbeine!" enthält: Ferse = Calcaneus, Kahn = Os naviculare, dreimal Keile = 3 Ossa cuneiformia, Würfelbein = Os cuboideum. Der Talus (Sprungbein) ist das Verbindungsgelenk, das in der Malleolengabel sitzt.",
      },
      {
        type: "mc",
        id: "fk_h2",
        question: "Was unterscheidet das obere vom unteren Sprunggelenk funktionell?",
        options: [
          { text: "Oberes Sprunggelenk: Scharniergelenk → Dorsalextension/Plantarflexion; unteres: Zapfengelenk → Pronation/Supination", correct: true },
          { text: "Oberes: Zapfengelenk für Rotation; unteres: Scharniergelenk für Beugung", correct: false },
          { text: "Beide ermöglichen identische Bewegungen", correct: false },
          { text: "Oberes: nur Extension; unteres: nur Flexion", correct: false },
        ],
        explanation: "Oberes Sprunggelenk (Articulatio talocruralis): Tibia + Fibula (Malleolengabel) + Talus → Scharniergelenk; Bewegungen: Dorsalextension (Fuß hochziehen) und Plantarflexion (Fußspitze strecken). Unteres Sprunggelenk: Talus + Calcaneus + Os naviculare → Zapfengelenk; Bewegungen: Pronation (Fußaußenrand hebt) und Supination (Fußinnenrand hebt).",
      },
      {
        type: "mc",
        id: "fk_h3",
        question: "Welche Knochen bilden das obere Sprunggelenk?",
        options: [
          { text: "Tibia, Fibula (Malleolengabel) und Talus", correct: true },
          { text: "Calcaneus, Talus und Os naviculare", correct: false },
          { text: "Femur, Tibia und Fibula", correct: false },
          { text: "Calcaneus und Tibia allein", correct: false },
        ],
        explanation: "Das obere Sprunggelenk (Articulatio talocruralis) wird durch die Malleolengabel – bestehend aus dem Innenknöchel (Malleolus medialis = unteres Ende der Tibia) und dem Außenknöchel (Malleolus lateralis = unteres Ende der Fibula) – gebildet, die den Talus umfasst. Die tastbaren Knöchel sind die Malleolen.",
      },
      {
        type: "mc",
        id: "fk_h4",
        question: "In welche drei Abschnitte gliedert sich der Fuß?",
        options: [
          { text: "Tarsus (Fußwurzel), Metatarsus (Mittelfuß), Digiti (Zehen)", correct: true },
          { text: "Femur, Tibia und Fibula", correct: false },
          { text: "Calcaneus, Talus und Phalangen", correct: false },
          { text: "Proximaler, medialer und distaler Fußabschnitt", correct: false },
        ],
        explanation: "Der Fuß gliedert sich anatomisch in: 1. Tarsus (Fußwurzel): 7 Knochen, 2. Metatarsus (Mittelfuß): 5 Ossa metatarsalia I–V (vom großen Zeh ausgehend), 3. Digiti (Zehen): 14 Phalangen – Großzeh 2, Zehen II–V je 3. Analoges Bauprinzip wie bei der Hand.",
      },
      {
        type: "true_false",
        id: "fk_h5",
        statement: "Der Calcaneus (Fersenbein) ist der größte Knochen des Fußes.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false },
        ],
        explanation: "Wahr. Der Calcaneus ist der größte und kräftigste Knochen des Tarsus und bildet die Fersenauflage. An ihm setzt die Achillessehne (Tendo calcaneus) an. Über den Talus, der auf dem Calcaneus sitzt, werden Körpergewicht und Stoßbelastungen auf den Fuß übertragen.",
      },
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "fk_p4_1",
        question: "Welche Aussagen zu Fußknochen und Sprunggelenken sind korrekt? (Mehrere richtig)",
        options: [
          { text: "Der Tarsus besteht aus 7 Knochen: Talus, Calcaneus, Os naviculare, Os cuboideum und 3 Ossa cuneiformia", correct: true },
          { text: "Das obere Sprunggelenk sitzt zwischen Tibia/Fibula (Malleolengabel) und Talus", correct: true },
          { text: "Das untere Sprunggelenk ermöglicht Pronation und Supination", correct: true },
          { text: "Das obere Sprunggelenk ist ein Zapfengelenk für Rotationsbewegungen", correct: false },
        ],
        explanation: "Tarsus: 7 Knochen. Oberes Sprunggelenk: Scharniergelenk (Dorsalextension/Plantarflexion) zwischen Malleolengabel und Talus. Unteres Sprunggelenk: Zapfengelenk (Pronation/Supination). Analoges Prinzip wie Handgelenke: proximale und distale Reihen mit je spezifischen Bewegungsachsen.",
      },
      {
        type: "mc",
        id: "fk_p4_2",
        question: "Warum können ungünstig geformte Fußgewölbe Probleme am Knie und Rücken verursachen?",
        options: [
          { text: "Fehlbelastungen im Fuß verändern die Achsenverhältnisse der gesamten unteren Extremität und Wirbelsäule", correct: true },
          { text: "Fußgewölbe haben keinen Einfluss auf Knie und Rücken", correct: false },
          { text: "Nur der Knorpel im Fuß wird geschädigt, nicht entfernte Gelenke", correct: false },
          { text: "Fußgewölbeprobleme betreffen ausschließlich das obere Sprunggelenk", correct: false },
        ],
        explanation: "Das Fußgewölbe wirkt als Stoßdämpfer. Ein Plattfuß oder Hohlfuß verändert die Belastungsachse der gesamten unteren Extremität: Fehlrotationen im Unterschenkel und am Knie, veränderte Beckenstellung, Fehlbelastung der Lendenwirbelsäule. Ungünstige Fußgewölbe können daher Knieschmerzen, Hüftprobleme und Rückenbeschwerden verursachen.",
      },
    ],
  }),

  makeDetailedPlant({
    id: "kniegelenk_femur_1033",
    title: "Femur & Kniegelenk: Strukturen und Besonderheiten",
    contextHint: "Femur = größter Knochen; Collum femoris = Frakturstelle bei Älteren; Genu varum (O-Bein) vs. Genu valgum (X-Bein); Knie-Sonderstrukturen: Menisci + Kreuz-/Seitenbänder + Patella",
    phase1: {
      soil: {
        statement: "Beim Genu valgum (X-Bein) ist der mediale Winkel am Kniegelenk kleiner als normal.",
        answer: false,
        solution: "Falsch. Beim Genu varum (O-Bein) ist der mediale Winkel am Kniegelenk kleiner als normal → Bein weicht nach außen aus. Beim Genu valgum (X-Bein) ist der mediale Winkel größer als normal → Bein krümmt sich nach medial. Beim Erwachsenen beträgt der physiologische Winkel zwischen Collum femoris und Corpus femoris ca. 126–128°.",
      },
      seed: {
        statement: "Der Oberschenkelhals (Collum femoris) ist eine häufige Frakturstelle bei älteren Menschen nach einem Sturz.",
        answer: true,
        solution: "Richtig. Das Collum femoris ist eine mechanisch vulnerable Stelle zwischen dem Caput femoris (Oberschenkelkopf) und dem Corpus femoris (Schaft). Bei Osteoporose verliert diese Region stark an Knochendichte, sodass bereits ein leichter Sturz zur Schenkelhalsfraktur führen kann. Diese Fraktur ist eine der häufigsten Verletzungen älterer Menschen.",
      },
      water: {
        statement: "Kreuzbänder und Menisci sind Sonderstrukturen des Kniegelenks, die für seine Stabilität unerlässlich sind.",
        answer: true,
        solution: "Richtig. Das Kniegelenk ist aufgrund seiner knöchernen Konstruktion (flache Gelenkflächen) relativ instabil und benötigt umfangreiche Sonderstrukturen: vorderes und hinteres Kreuzband (sichern in Beugestellung), Lig. collaterale tibiale (Innenband) und Lig. collaterale fibulare (Außenband) sowie medialer und lateraler Meniskus (Faserknorpelscheiben als Druckverteiler). Die Patella schützt das Gelenk und verlängert den Hebelarm des M. quadriceps.",
      },
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "kf_h1",
        question: "Was ist der Unterschied zwischen Genu varum und Genu valgum?",
        options: [
          { text: "Genu varum (O-Bein): Bein weicht nach außen (medialer Winkel kleiner als normal); Genu valgum (X-Bein): Bein krümmt sich nach medial (medialer Winkel größer als normal)", correct: true },
          { text: "Genu varum = X-Bein; Genu valgum = O-Bein", correct: false },
          { text: "Beide Begriffe beschreiben dasselbe Fehlstellungsbild", correct: false },
          { text: "Genu varum ist immer pathologisch; Genu valgum ist physiologisch normal", correct: false },
        ],
        explanation: "Genu varum (O-Bein): Der mediale Winkel am Kniegelenk ist kleiner als der physiologische Wert → Beine weichen bogenförmig nach außen aus (wie ein ‚O'). Genu valgum (X-Bein): Der mediale Winkel ist größer → Knie krümmen sich nach innen (wie ein ‚X'). Physiologisch: Winkel Collum/Corpus femoris ≈ 126–128° beim Erwachsenen.",
      },
      {
        type: "mc",
        id: "kf_h2",
        question: "Warum ist das Collum femoris bei älteren Menschen besonders frakturgefährdet?",
        options: [
          { text: "Schlanker Knochenabschnitt mit Torsionskräften, kombiniert mit altersabhängiger Osteoporose", correct: true },
          { text: "Der Oberschenkelhals ist der dünnste Knochen des Körpers und bricht daher immer leicht", correct: false },
          { text: "Wegen fehlender Muskeln in diesem Bereich, die Schutz bieten könnten", correct: false },
          { text: "Der Knochen ist hier knorpelartig und nicht mineralisiert", correct: false },
        ],
        explanation: "Das Collum femoris (Oberschenkelhals) verbindet den Caput femoris schräg mit dem Corpus femoris. Hohe Torsions- und Scherkräfte wirken auf diesen Bereich. Bei Osteoporose (häufig postmenopausal) nimmt die Knochendichte gerade hier stark ab. Sturz → Schenkelhals­fraktur = häufigste Fraktur älterer Menschen, oft mit Operationsbedarf (Endoprothese).",
      },
      {
        type: "mc",
        id: "kf_h3",
        question: "Welche Sonderstrukturen des Kniegelenks sichern die Stabilität in Beugestellung?",
        options: [
          { text: "Vorderes und hinteres Kreuzband (Ligamenta cruciata)", correct: true },
          { text: "Medialer und lateraler Meniskus allein", correct: false },
          { text: "Patella und Lig. patellae", correct: false },
          { text: "Seitenbänder (Lig. collaterale tibiale und fibulare)", correct: false },
        ],
        explanation: "Die Kreuzbänder (vorderes + hinteres) kreuzen sich im Innern des Kniegelenks und sind bei gebeugtem Knie gespannt → sichern das Gelenk gegen Schub. Seitenbänder sind bei gestrecktem Knie gespannt → verhindern Rotation in Streckstellung. Menisci dienen der Druckentlastung. Alle vier Strukturen wirken zusammen.",
      },
      {
        type: "mc",
        id: "kf_h4",
        question: "Welche Funktion haben die Menisci im Kniegelenk?",
        options: [
          { text: "Faserknorpelscheiben als Druckverteiler und Stoßdämpfer; vergrößern die Gelenkfläche", correct: true },
          { text: "Sie produzieren Synovia und ernähren den Gelenkknorpel", correct: false },
          { text: "Sie verbinden Femur und Tibia direkt als Bänder", correct: false },
          { text: "Nur dekorative Strukturen ohne biomechanische Bedeutung", correct: false },
        ],
        explanation: "Menisci (medialer und lateraler Meniskus): Halbmondförmige Faserknorpelscheiben, die der unebenen Kontaktfläche zwischen Femur und Tibia aufgelagert sind. Funktion: Druckverteilung, Stoßdämpfung, Flächenvergrößerung, Stabilisierung. Vergleichbar mit Bandscheiben der Wirbelsäule. Meniskusrisse sind häufige Sportverletzungen.",
      },
      {
        type: "true_false",
        id: "kf_h5",
        statement: "Das Femur (Oberschenkelknochen) ist der größte, stärkste und längste Röhrenknochen des menschlichen Körpers.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false },
        ],
        explanation: "Wahr. Das Femur trägt das gesamte Körpergewicht beim Gehen und Stehen. Wichtige anatomische Landmarken: Caput femoris (Gelenkkopf im Acetabulum), Collum femoris (Schenkelhals, Frakturstelle), Trochanter major und minor (Muskelansätze), Condylus medialis und lateralis (Gelenkknochen des Kniegelenks). Die Körpergröße eines Menschen korreliert mit der Femurlänge.",
      },
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "kf_p4_1",
        question: "Welche Aussagen zum Kniegelenk sind korrekt? (Mehrere richtig)",
        options: [
          { text: "Das Kniegelenk ist das größte und komplexeste Gelenk des Bewegungsapparates", correct: true },
          { text: "Kreuzbänder sichern das Knie in Beugestellung, Seitenbänder in Streckstellung", correct: true },
          { text: "Menisci sind Faserknorpelscheiben, die als Druckverteiler dienen", correct: true },
          { text: "Das Kniegelenk ist ein einfaches Scharniergelenk ohne Sonderstrukturen", correct: false },
        ],
        explanation: "Kniegelenk: Femorotibialgelenk (Mischform aus Rad- und Scharniergelenk = Drehwinkelgelenk) + Femoropatellargelenk. Stabilisierung durch: Kreuzbänder (in Beugung), Seitenbänder (in Streckung), Menisci (Druckverteilung), Patella (Hebelarm). Das Knie ist eher instabil knöchern → daher so viele Sonderstrukturen.",
      },
      {
        type: "mc",
        id: "kf_p4_2",
        question: "Welche anatomischen Strukturen am Femur sind klinisch besonders relevant?",
        options: [
          { text: "Collum femoris (Schenkelhals, Frakturstelle bei Älteren) und Trochanter major (Orientierungspunkt für Injektionen)", correct: true },
          { text: "Nur der Femurkopf – alle anderen Anteile sind klinisch irrelevant", correct: false },
          { text: "Linea aspera und Trochanter minor haben keine klinische Bedeutung", correct: false },
          { text: "Condylus medialis ist ausschließlich ein Muskelansatz ohne Gelenkfunktion", correct: false },
        ],
        explanation: "Klinisch relevant am Femur: 1. Collum femoris → Schenkelhals­fraktur bei Osteoporose/Sturz, oft Endoprothese nötig. 2. Trochanter major → Orientierungspunkt für dorsoglutäale Injektion (Ventroglutäalmethode bevorzugt). 3. Condylus medialis/lateralis → Kniegelenkflächen. 4. Genu varum/valgum → Achsfehlstellungen mit Langzeitfolgen für Knie/Hüfte.",
      },
    ],
  }),

  makeDetailedPlant({
    id: "synarthrosen_atlas_1033",
    title: "Synarthrosen-Subtypen & Atlas/Axis",
    contextHint: "Synarthrosen = unechte Gelenke (6 Typen: Symphyse/Synchondrose/Sutur/Syndesmose/Gomphose/Synostose); Atlas (C1) ohne Wirbelkörper; Axis (C2) mit Dens axis; Kopfgelenke: Nicken vs. Drehen",
    phase1: {
      soil: {
        statement: "Gomphosen sind eine Form der Synarthrosen und dienen der Verankerung der Zähne.",
        answer: true,
        solution: "Richtig. Gomphosen (griech. Einkeilen) sind unechte Gelenke, bei denen ein kegelförmiger Knochen (Zahnwurzel) in eine Knochenhöhlung (Alveole im Ober-/Unterkiefer) eingekeilt und durch Bindegewebsfasern (Sharpey-Fasern des Parodontiums) stabilisiert wird. Sie erlauben eine gewisse Federung beim Kauen, aber keine freie Bewegung.",
      },
      seed: {
        statement: "Der erste Halswirbel (Atlas) besitzt keinen Wirbelkörper.",
        answer: true,
        solution: "Richtig. Der Atlas (C1) ist ein atypischer Halswirbel: Er hat keinen Wirbelkörper, sondern besteht nur aus zwei Seitenteilen (Massa lateralis) und einem vorderen und hinteren Bogen. Der fehlende Wirbelkörper des Atlas ist im Laufe der Entwicklung mit dem Wirbelkörper des Axis (C2) zum Dens axis (Zahn des Axis) verschmolzen. Der Dens axis ragt in den Atlasring und bildet das Zapfengelenk des unteren Kopfgelenks.",
      },
      water: {
        statement: "Schädelnähte sind Synarthrosen, die im Laufe des Lebens zu Synostosen verknöchern.",
        answer: true,
        solution: "Richtig. Schädelnähte (Suturen) sind beim Kind bindegewebige Verbindungen zwischen Schädelknochen (Wachstumsnähte). Mit zunehmendem Lebensalter verknöchern sie vollständig → Synostosen (knöcherne Verbindungen). Diese Umwandlung erklärt, warum Schädelknochen beim Erwachsenen fest verbunden sind.",
      },
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "sa_h1",
        question: "Welche sechs Typen von Synarthrosen (unechten Gelenken) werden unterschieden?",
        options: [
          { text: "Symphyse, Synchondrose, Sutur, Syndesmose, Gomphose, Synostose", correct: true },
          { text: "Kugelgelenk, Scharniergelenk, Sattelgelenk, Eigelenk, Drehgelenk, Amphiarthrose", correct: false },
          { text: "Diarthrose, Amphiarthrose, Synarthrose, Symphyse, Sutur, Kondylarthrose", correct: false },
          { text: "Nur drei Typen: Symphyse, Synostose und Syndesmose", correct: false },
        ],
        explanation: "Synarthrosen (unechte Gelenke, keine Gelenkhöhle): Knorpelgelenke: 1. Symphyse (Faserknorpel, z.B. Schambeinfuge), 2. Synchondrose (hyaliner Knorpel, z.B. Synchondrosis xiphosternalis). Bindegewebsgelenke: 3. Sutur (Schädelnaht, → verknöchert zur Synostose), 4. Syndesmose (Bindegewebe, z.B. Membrana interossea cruris Tibia–Fibula), 5. Gomphose (Einkeilen: Zähne in Alveolen), 6. Synostose (knöchern: Os sacrum).",
      },
      {
        type: "mc",
        id: "sa_h2",
        question: "Was ist der Unterschied zwischen einer Symphyse und einer Synchondrose?",
        options: [
          { text: "Symphyse: Verbindung durch Faserknorpel (z.B. Schambeinfuge); Synchondrose: durch hyalinen Knorpel (z.B. Synchondrosis xiphosternalis)", correct: true },
          { text: "Symphyse: knöchern; Synchondrose: durch Faserknorpel", correct: false },
          { text: "Beide sind identisch – nur der Name ist verschieden", correct: false },
          { text: "Symphyse: im Schädel; Synchondrose: im Becken", correct: false },
        ],
        explanation: "Symphyse: zwei Knochen durch Faserknorpel verbunden. Beispiele: Symphysis pubica (Schambeinfuge), Symphysis intervertebralis (Bandscheiben). Synchondrose: Verbindung durch hyalinen Knorpel. Beispiele: Synchondrosis xiphosternalis (Schwertfortsatz–Sternum), Synchondrosis sphenooccipitalis (Keilbein–Hinterhauptsbein, verknöchert ~18. Lj.). Beide erlauben minimale Federbewegungen.",
      },
      {
        type: "mc",
        id: "sa_h3",
        question: "Welche Bewegung ermöglicht das untere Kopfgelenk (Articulatio atlantoaxialis) und welche Struktur sichert es?",
        options: [
          { text: "Drehbewegung des Kopfes (ca. 30° nach jeder Seite); Lig. transversum atlantis hält den Dens axis", correct: true },
          { text: "Nickbewegung (Flexion/Extension); gesichert durch Lig. longitudinale anterius", correct: false },
          { text: "Lateralflexion; gesichert durch Lig. supraspinale", correct: false },
          { text: "Keine freie Bewegung möglich, da es eine Synostose ist", correct: false },
        ],
        explanation: "Unteres Kopfgelenk (Atlantoaxialgelenk, C1–C2): Zapfengelenk. Der Dens axis (Zahn des Axis, C2 – Wirbelkörper des Atlas) ragt in den vorderen Atlasbogen. Das Ligamentum transversum atlantis hält den Dens axis fest und verhindert seine Verschiebung ins Rückenmark. Bei Riss dieses Bandes → Lebensgefahr! Drehung ca. 30° nach jeder Seite.",
      },
      {
        type: "mc",
        id: "sa_h4",
        question: "Welches Kopfgelenk ermöglicht das Nicken und welche Knochen sind beteiligt?",
        options: [
          { text: "Oberes Kopfgelenk (Articulatio atlantooccipitalis): Atlas (C1) – Os occipitale (Hinterhauptsbein)", correct: true },
          { text: "Unteres Kopfgelenk (Atlantoaxialgelenk): Atlas – Axis", correct: false },
          { text: "C2–C3-Gelenk: Axis – dritter Halswirbel", correct: false },
          { text: "Das Kaugelenk ermöglicht das Nicken", correct: false },
        ],
        explanation: "Oberes Kopfgelenk (Atlantooccipitalgelenk): bildet sich zwischen den Gelenkflächen des Atlas (C1) und den Kondylen des Os occipitale. Es ist ein Eigelenk (Kondylarthrose) → ermöglicht das Nicken (Flexion/Extension des Kopfes). Unteres Kopfgelenk (Atlantoaxialgelenk): Atlas–Axis → Drehen (Rotation). Zusammen bilden beide Gelenke die Kopfgelenke.",
      },
      {
        type: "true_false",
        id: "sa_h5",
        statement: "Eine Syndesmose ist eine bindegewebige Verbindung zweier Knochen; ein Beispiel ist die Membrana interossea cruris zwischen Tibia und Fibula.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false },
        ],
        explanation: "Wahr. Bei der Syndesmose werden zwei Knochen durch kollagene oder elastische Bindegewebsfasern (Membrana interossea) zusammengehalten. Die Membrana interossea cruris zwischen Tibia und Fibula dient gleichzeitig als Ursprungsfläche für Muskeln. Eine Syndesmose erlaubt geringfügige Mikrobewegungen und überträgt Kräfte – daher ist eine Verletzung (z.B. bei Knöchelbruch) klinisch relevant.",
      },
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "sa_p4_1",
        question: "Welche Aussagen zu Synarthrosen-Subtypen sind korrekt? (Mehrere richtig)",
        options: [
          { text: "Symphysen verbinden Knochen durch Faserknorpel (z.B. Schambeinfuge)", correct: true },
          { text: "Suturen verknöchern im Alter zu Synostosen", correct: true },
          { text: "Gomphosen verankern Zähne in den Alveolen über Sharpey-Fasern", correct: true },
          { text: "Synchondrosen sind knöcherne Verbindungen ohne Knorpelanteil", correct: false },
        ],
        explanation: "Symphyse: Faserknorpel (Bandscheiben, Schambeinfuge). Sutur → Synostose: Entwicklung der Schädelknochen. Gomphose: Zahnverankerung. Synchondrose: hyaliner Knorpel (nicht knöchern) – Beispiel: Epiphysenfuge ist funktionell eine Synchondrose. Synostose: echte knöcherne Fusion (Os sacrum aus fusionierten Wirbelkörpern).",
      },
      {
        type: "mc",
        id: "sa_p4_2",
        question: "Warum ist das Ligamentum transversum atlantis klinisch so bedeutsam?",
        options: [
          { text: "Es hält den Dens axis in Position; bei Riss droht der Dens axis das Rückenmark komprimieren", correct: true },
          { text: "Es stabilisiert die Lendenwirbelgelenke und ist bei Bandscheibenvorfall betroffen", correct: false },
          { text: "Es verbindet Atlas und Schädelbasis beim Nicken", correct: false },
          { text: "Es ist klinisch wenig bedeutsam, da es sich leicht regeneriert", correct: false },
        ],
        explanation: "Das Lig. transversum atlantis hält den Dens axis des Axis (C2) sicher im vorderen Atlasbogen. Bei Riss (z.B. Hochrasanztrauma, rheumatoide Arthritis mit Ligamentlockerung) kann der Dens axis nach dorsal in das Rückenmark eindringen → Tetraplegie oder Tod. Klinisch: Ausschluss einer atlantoaxialen Instabilität vor Narkoseeinleitung (Intubation) bei RA-Patienten.",
      },
    ],
  }),
