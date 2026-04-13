const HUMANPATHOLOGIE_1049_PLANTS = [
  makeDetailedPlant({
    id: "humanpathologie_1049_grundbegriffe",
    title: "Grundbegriffe & Immunität",
    contextHint: "Gesundheit/Krankheit, Ätiologie vs. Pathogenese, Disposition, unspezifische vs. spezifische Resistenz, Morbidität/Mortalität/Letalität",
    phase1: {
      soil: {
        statement: "Pathogenese ist die Lehre von den Krankheitsursachen.",
        answer: false,
        solution: "Das ist die Ätiologie. Pathogenese beschreibt Entstehung und Entwicklung einer Krankheit – den Zusammenhang zwischen ätiologischem Faktor und Disposition. Pathologie = Lehre von den krankhaften Veränderungen.",
      },
      seed: {
        statement: "Die unspezifische Resistenz wirkt gegen eine Vielzahl von Erregern gleichermaßen und kann angeboren oder erworben sein.",
        answer: true,
        solution: "Richtig. Zu ihr gehören saurer Haut-pH, Flimmerepithel der Atemwege, Lysozym in Schleim und Tränenflüssigkeit, Enzyme im Speichel, Salzsäure im Magensaft sowie Laktobazillen in der Vagina.",
      },
      water: {
        statement: "Morbidität bezeichnet das Verhältnis der Todesfälle zur Gesamtbevölkerung in einem bestimmten Zeitraum.",
        answer: false,
        solution: "Das ist die Mortalität. Morbidität = Verhältnis der Erkrankten zur Gesamtbevölkerung. Letalität = Anteil der Gestorbenen an allen Erkrankten dieser Krankheit (in %). Perinatale Sterblichkeit = Summe aller vor, während und bis zu einer Woche nach der Geburt verstorbenen Kinder pro 1000 Lebend- und Totgeborenen.",
      },
    },
    harvestQuestions: [
      {
        question: "Was versteht man unter Disposition?",
        type: "mc",
        options: [
          "Die Lehre von den Krankheitsursachen",
          "Die Empfänglichkeit eines Organismus für eine Krankheit",
          "Die völlige Wiederherstellung nach einer Krankheit",
          "Die Abwehrreaktion gegen Antigene",
        ],
        correct: 1,
      },
      {
        question: "Welche Aussage zur spezifischen Immunität ist korrekt?",
        type: "mc",
        options: [
          "Sie wirkt ungerichtet gegen alle Erreger gleichermaßen",
          "Sie kann nur angeboren sein",
          "Sie richtet sich gegen einen bestimmten Erreger oder ein bestimmtes Toxin (Antikörperbildung gegen Antigene)",
          "Sie umfasst ausschließlich zelluläre Abwehrmechanismen",
        ],
        correct: 2,
      },
      {
        question: "Was ist ein Beispiel für eine genetische Disposition (Prädisposition)?",
        type: "mc",
        options: [
          "Mamma-Karzinom tritt 100-mal häufiger bei Frauen auf",
          "Nephroblastom tritt überwiegend im Kindesalter auf",
          "Vererbte Agammaglobulinämie – verminderte Produktion von Gamma-Globulinen",
          "Mukoviszidose überwiegend in der weißen Bevölkerung",
        ],
        correct: 2,
      },
      {
        question: "Welche der statistischen Kennzahlen beschreibt die Anzahl der Neuerkrankungen pro 100.000 Einwohner und Jahr?",
        type: "mc",
        options: [
          "Mortalität",
          "Prävalenz",
          "Inzidenz",
          "Letalität",
        ],
        correct: 2,
      },
      {
        question: "Welcher unspezifische Abwehrmechanismus ist in Tränenflüssigkeit und Nasensekret enthalten?",
        type: "mc",
        options: [
          "IgE-Antikörper",
          "Lysozym und weitere bakterizide Substanzen",
          "Komplementproteine",
          "T-Lymphozyten",
        ],
        correct: 1,
      },
    ],
    phase4Questions: [
      {
        question: "Welche der folgenden zählen zu den exogenen Krankheitsursachen?",
        type: "mc",
        options: [
          "Bakterien, Viren, Pilze",
          "Genetische Mutationen",
          "Radioaktive Strahlung und Röntgenstrahlung",
          "Trisomie 21",
          "Mangelernährung in Entwicklungsländern und Überernährung in Industrieländern",
        ],
        correct: [0, 2, 4],
      },
      {
        question: "Welche Aussagen zur Disposition sind korrekt?",
        type: "mc",
        options: [
          "Pykniker leiden häufiger an Herzkranzgefäßerkrankungen als andere Körperbautypen",
          "Die Altersdisposition betrifft z. B. das Nephroblastom im Kindesalter und das Prostatakarzinom im Alter",
          "Mukoviszidose ist ein Beispiel für geschlechtliche Disposition",
          "Die Disposition ist unabhängig von Konstitution und Körperbau",
          "Prädisposition kann genetisch vererbt werden (z. B. vererbte Agammaglobulinämie)",
        ],
        correct: [0, 1, 4],
      },
    ],
  }),

  makeDetailedPlant({
    id: "humanpathologie_1049_tod",
    title: "Tod & Todeszeichen",
    contextHint: "Vita reducta, Klinischer Tod (unsicher), Hirntod (sicher), Totenflecke, Totenstarre, Autolyse, intermediäres Leben",
    phase1: {
      soil: {
        statement: "Der klinische Tod gilt als sicheres Todeszeichen, da Reanimation nicht mehr möglich ist.",
        answer: false,
        solution: "Falsch. Der klinische Tod (Kreislauf- und Atemstillstand, erloschene Reflexe, weite reaktionslose Pupillen, Blässe) ist reversibel – Reanimation ist möglich. Er zählt daher zu den unsicheren Todeszeichen.",
      },
      seed: {
        statement: "Die Totenstarre (Rigor mortis) beginnt 2–4 Stunden nach dem Tod am Nacken und Unterkiefer und schreitet von oben nach unten fort.",
        answer: true,
        solution: "Richtig. Sie entsteht durch Vernetzung von Aktin- und Myosinfilamenten bei ATP-Mangel. 2–3 Tage nach dem Tod löst die einsetzende Autolyse die Starre wieder in der Reihenfolge ihres Auftretens.",
      },
      water: {
        statement: "Der Hirntod wird u. a. durch eine EEG-Nulllinie über mindestens 10 Minuten festgestellt.",
        answer: false,
        solution: "Die EEG-Nulllinie muss mindestens 30 Minuten bestehen. Zusätzlich: Ausfall der Hirnstammreflexe (von 2 Ärzten innerhalb von 24 Stunden mehrfach geprüft) und angiographisch überprüfte fehlende Hirndurchblutung. Der Hirntod ist Voraussetzung für Organspende und Transplantation.",
      },
    },
    harvestQuestions: [
      {
        question: "Was ist mit 'Vita reducta' gemeint?",
        type: "mc",
        options: [
          "Der biologische Tod mit irreversiblem Organversagen",
          "Das zunehmende Versagen lebenswichtiger Systeme wie Herz, Kreislauf, Atmung; auch Bezeichnung für Scheintod",
          "Der Zeitraum zwischen Individualtod und Untergang der letzten Zelle",
          "Das Erlöschen aller Hirnstammreflexe",
        ],
        correct: 1,
      },
      {
        question: "Welche sind die drei sicheren Todeszeichen?",
        type: "mc",
        options: [
          "Atemstillstand, Pulslosigkeit, weite Pupillen",
          "Totenflecke (Livores), Totenstarre (Rigor mortis), Autolyse",
          "Hirntod, Kälte der Extremitäten, Blässe der Haut",
          "EEG-Nulllinie, fehlende Reflexe, Abfall der Körpertemperatur",
        ],
        correct: 1,
      },
      {
        question: "Wann sind Totenflecke nicht mehr wegdrückbar?",
        type: "mc",
        options: [
          "Unmittelbar nach Eintritt des Todes",
          "Nach ca. 3–6 Stunden",
          "Nach ca. 24 Stunden, wenn Hämolyse eingetreten und Blut ins Gewebe eingelagert ist",
          "Erst nach 2–3 Tagen mit Beginn der Autolyse",
        ],
        correct: 2,
      },
      {
        question: "Was versteht man unter 'Intermediärem Leben'?",
        type: "mc",
        options: [
          "Den Zustand des klinischen Todes vor der Reanimation",
          "Den Zeitraum zwischen Individualtod und Untergang der letzten Zelle, in dem einzelne Zellen noch Reaktionen zeigen (supravitale Erscheinungen)",
          "Die Phase der Vita reducta bei Herzstillstand",
          "Das sukzessive Einsetzen der Totenstarre",
        ],
        correct: 1,
      },
      {
        question: "Hellrote Totenflecke deuten auf welche Vergiftung hin?",
        type: "mc",
        options: [
          "Arsen- oder Schwermetallvergiftung",
          "Opiat- oder Schlafmittelvergiftung",
          "Kohlenmonoxid- oder Barbituratsvergiftung",
          "Zyanidvergiftung",
        ],
        correct: 2,
      },
    ],
    phase4Questions: [
      {
        question: "Welche Phänomene gehören zu den supravitalen Erscheinungen (intermediäres Leben)?",
        type: "mc",
        options: [
          "Mechanische Erregbarkeit des Leichenmuskels",
          "Einsetzen der Totenstarre",
          "Elektrische Reizbarkeit des Leichenmuskels",
          "Reaktion der Pupille auf Arzneistoffe (z. B. Mydriatika)",
          "Reizung der Musculi arrectores pili mit Auslösung einer Gänsehaut",
        ],
        correct: [0, 2, 3, 4],
      },
      {
        question: "Welche Aussagen zum Hirntod als sicherem Todeszeichen sind richtig?",
        type: "mc",
        options: [
          "Er muss von zwei Ärzten innerhalb von 24 Stunden mehrfach geprüft werden",
          "Das EEG zeigt mindestens 30 Minuten eine isoelektrische Nulllinie",
          "Er kann durch Reanimationsmaßnahmen reversibel gemacht werden",
          "Fehlende Hirndurchblutung wird angiographisch überprüft",
          "Hirntod ist gesetzliche Voraussetzung für Organspende und Transplantation",
        ],
        correct: [0, 1, 3, 4],
      },
    ],
  }),

  makeDetailedPlant({
    id: "humanpathologie_1049_hypoxie",
    title: "Hypoxie & Zellschäden",
    contextHint: "Hypoxieformen, hydropische Schwellung, Verfettung, Verbrennungsgrade, Neuner-Regel, Strahlenschäden",
    phase1: {
      soil: {
        statement: "Bei einer ischämischen Hypoxie fehlt dem Gewebe nicht nur Sauerstoff, sondern auch Substanzen zum Aufbau körpereigener Stoffe – und Stoffwechselschlacken werden nicht abtransportiert.",
        answer: true,
        solution: "Richtig. Ischämie = verminderte Durchblutung. Im Gegensatz zur hypoxämischen Hypoxie (zu wenig O2 im arteriellen Blut) fehlen bei Ischämie zusätzlich Substrate und der Schlackenabtransport. Ursachen: arterielle Thromben, Embolie, Herzinsuffizienz.",
      },
      seed: {
        statement: "Die hydropische Schwellung entsteht durch den Ausfall der Calcium-Pumpe.",
        answer: false,
        solution: "Es ist die Na-K-Pumpe, die ATP benötigt. Fällt die oxidative Phosphorylierung aus, kann die Pumpe das osmotische Gleichgewicht zwischen Intra- und Extrazellulärraum nicht mehr aufrechterhalten – Flüssigkeit strömt in die Zelle ein.",
      },
      water: {
        statement: "Bei einer Verbrennung von mehr als 1/5 der Körperoberfläche besteht beim Erwachsenen Lebensgefahr.",
        answer: true,
        solution: "Richtig. Großflächige Verbrennung führt über Histaminfreisetzung zu Flüssigkeits- und Eiweißverlust, hypovolämischem Schock und Schockniere. Zur Abschätzung gilt die Neuner-Regel: Arm 9 %, Bein 18 %, Rumpf vorne/hinten je 18 %, Kopf 9 %, Genitale 1 %.",
      },
    },
    harvestQuestions: [
      {
        question: "Welche Hypoxieform entsteht durch Blockade der intrazellulären Atmung (z. B. Zyanidvergiftung)?",
        type: "mc",
        options: [
          "Hypoxämische Hypoxie",
          "Ischämische Hypoxie",
          "Hypoglykämische Hypoxie",
          "Histiotoxische Hypoxie",
        ],
        correct: 3,
      },
      {
        question: "Welches subzelluläre Kompartiment ist bei akutem Sauerstoffmangel zuerst betroffen?",
        type: "mc",
        options: [
          "Zellkern",
          "Ribosomen",
          "Mitochondrien",
          "Lysosomen",
        ],
        correct: 2,
      },
      {
        question: "Welcher Verbrennungsgrad ist durch Koagulationsnekrose der Haut bis ins subkutane Fettgewebe gekennzeichnet?",
        type: "mc",
        options: [
          "Grad I (Erythem, Hautrötung)",
          "Grad II (Blasenbildung, meist narbenlos heilend)",
          "Grad III",
          "Grad IV (Verkohlung)",
        ],
        correct: 2,
      },
      {
        question: "Welche Zellen sind besonders strahlensensibel (hohe Mitoserate)?",
        type: "mc",
        options: [
          "Nervenzellen und Knorpelzellen",
          "Blutbildende Zellen im Knochenmark, Spermatogenesezellen und Dünndarmepithelzellen",
          "Herzmuskelzellen und Knochenzellen",
          "Hepatozyten und Nierenzellen",
        ],
        correct: 1,
      },
      {
        question: "Welche Folgen hat ein großflächiger Flüssigkeitsverlust durch eine Verbrennung?",
        type: "mc",
        options: [
          "Hypervolämischer Schock und Hypertonie",
          "Hypovolämischer Schock, Schockniere und durch abgesunkenen Kolloidosmotischen Druck ein Hirnödem",
          "Hyperkaliämie und Herzrhythmusstörungen als primäre Folge",
          "Sofortige Niereninsuffizienz durch direkte Hitzeschädigung",
        ],
        correct: 1,
      },
    ],
    phase4Questions: [
      {
        question: "Welche Faktoren beeinflussen das Ausmaß des hypoxischen Zellschadens?",
        type: "mc",
        options: [
          "Dauer und Intensität der Hypoxie",
          "Ursache der Hypoxie (Ischämie ist gravierender als Hypoxämie)",
          "Blutgruppe des Patienten",
          "Empfindlichkeit des Gewebes (Nervenzellen am empfindlichsten, dann Parenchymzellen)",
          "Körpertemperatur (Fieber erhöht die Empfindlichkeit der Zellen)",
        ],
        correct: [0, 1, 3, 4],
      },
      {
        question: "Welche Aussagen zur Verfettung der Zelle sind korrekt?",
        type: "mc",
        options: [
          "Hemmung der oxidativen Phosphorylierung bei Hypoxie führt zu vermindertem Fettabbau und Verfettung",
          "Überernährung und Unterernährung (gestörte Lipoproteinproduktion) können Zellverfettung verursachen",
          "Verfettung ist immer irreversibel und führt zum Zelltod",
          "Diabetes mellitus kann durch erhöhte intrazelluläre Fettproduktion zur Verfettung führen",
          "Interstitielle Verfettung (z. B. Lipomatosis cordis) = Umwandlung von Bindegewebszellen in Fettgewebszellen",
        ],
        correct: [0, 1, 3, 4],
      },
    ],
  }),

  makeDetailedPlant({
    id: "humanpathologie_1049_anpassung_nekrose",
    title: "Anpassungsreaktionen & Nekrose",
    contextHint: "Hypertrophie, Hyperplasie, Atrophie, Nekrose-Kennzeichen (Pyknose/Karyorrhexis/Karyolyse), Nekroseformen",
    phase1: {
      soil: {
        statement: "Hyperplasie ist eine Organvergrößerung durch Vergrößerung der einzelnen Zellen.",
        answer: false,
        solution: "Das ist Hypertrophie (= Organvergrößerung durch Zellvergrößerung, gesteigerte RNA-/DNA-Synthese). Bei Hyperplasie vergrößert sich das Organ durch Vermehrung der Zellanzahl – ohne wesentliche Vergrößerung der Einzelzelle. Hyperplasie ist bei Wegfall des Reizes umkehrbar.",
      },
      seed: {
        statement: "Die Koagulationsnekrose ist typisch für ischämische Infarkte; Zellumrisse und Gewebestruktur bleiben erkennbar.",
        answer: true,
        solution: "Richtig. Es kommt zur Denaturierung des Zelleiweiß und Wasserverlust der Zellen. Beispiele: Herzinfarkt, Säureverätzung. Im Gegensatz dazu strömt bei der Kolliquationsnekrose Wasser ins Nekrosegebiet (z. B. Hirninfarkt, Laugenverätzung).",
      },
      water: {
        statement: "Die Hungeratrophie beginnt mit dem Abbau der Eiweißreserven der Muskeln.",
        answer: false,
        solution: "Die Reihenfolge ist: zuerst Leberglykogen, dann Depotfett, dann Baufett, schließlich Eiweißreserven (→ Muskelatrophie). Der Energievorrat eines gesunden Erwachsenen reicht ca. 50 Tage.",
      },
    },
    harvestQuestions: [
      {
        question: "Was beschreibt die Karyolyse?",
        type: "mc",
        options: [
          "Verstärkte Färbbarkeit der Zellkernwand (Kernwandhyperchromasie)",
          "Schrumpfung des Zellkerns mit verstärkter Färbbarkeit des Chromatins (Pyknose)",
          "Zerfall in Chromatinbruchstücke (Karyorrhexis)",
          "Auflösung des Zellkerns",
        ],
        correct: 3,
      },
      {
        question: "Was ist ein Beispiel für hormonelle Hypertrophie?",
        type: "mc",
        options: [
          "Leberhypertrophie bei Schlafmittelmissbrauch",
          "Herzmuskelhypertrophie bei Bluthochdruck",
          "Hypertrophie der Gebärmutter während der Schwangerschaft durch Östrogene",
          "Skelettmuskelhypertrophie bei Sport",
        ],
        correct: 2,
      },
      {
        question: "Was ist Gangrän?",
        type: "mc",
        options: [
          "Eine Form der fibrinoiden Nekrose bei Autoimmunerkrankungen",
          "Eine Sonderform der Koagulationsnekrose an den Extremitäten",
          "Die käsige Nekrose bei Tuberkulose",
          "Eine Fettgewebsnekrose bei akuter Pankreatitis",
        ],
        correct: 1,
      },
      {
        question: "Was ist ein Beispiel für Inaktivitätsatrophie?",
        type: "mc",
        options: [
          "Wirbelkörperatrophie bei pulsierendem Aortenaneurysma",
          "Muskelatrophie beim Gipsbein",
          "Altersatrophie durch vermehrte DNA-Schäden",
          "Leberlappenatrophie bei einseitigem Pfortaderverschluss",
        ],
        correct: 1,
      },
      {
        question: "Bei welcher Erkrankung tritt käsige Nekrose auf?",
        type: "mc",
        options: [
          "Herzinfarkt",
          "Hirninfarkt",
          "Tuberkulose",
          "Akute Bauchspeicheldrüsenentzündung",
        ],
        correct: 2,
      },
    ],
    phase4Questions: [
      {
        question: "Welche Formen der Hyperplasie werden unterschieden?",
        type: "mc",
        options: [
          "Überlastungshyperplasie (z. B. Herzmuskelhyperplasie bei Herzvergrößerung)",
          "Regeneratorische Hyperplasie (z. B. Leberregeneration nach Vergiftung)",
          "Hyperregeneratorische Hyperplasie bei chronischer Gastritis mit Zellatypien",
          "Hyperplasie durch endokrine Störungen (z. B. Schilddrüsenhyperplasie bei Jodmangel)",
          "Kompensatorische Hypertrophie (Zellvergrößerung, keine Hyperplasie)",
        ],
        correct: [0, 1, 2, 3],
      },
      {
        question: "Welche Aussagen zu den Nekroseformen sind korrekt?",
        type: "mc",
        options: [
          "Bei der Kolliquationsnekrose strömt Wasser ins Nekrosegebiet; Beispiele: Hirninfarkt, Laugenverätzung",
          "Fibrinoide Nekrose tritt bei Entzündungen im kollagenen Bindegewebe auf (z. B. Kollagenosen, Rheumatismus)",
          "Die trockene Gangrän entsteht durch Flüssigkeitsverdunstung mit Mumifikation (z. B. bei diabetischer Makroangiopathie)",
          "Die feuchte Gangrän entsteht durch Infektion mit Fäulnisbakterien (z. B. Gasbrand durch Clostridium perfringens)",
          "Fettgewebsnekrose ist eine Sonderform der fibrinoiden Nekrose",
        ],
        correct: [0, 1, 2, 3],
      },
    ],
  }),

  makeDetailedPlant({
    id: "humanpathologie_1049_regeneration_oedem",
    title: "Regeneration, Amyloidose & Ödeme",
    contextHint: "Wundheilung, Frakturheilung (Kallus), Amyloidose primär/sekundär, Hyalinose, Ödemursachen",
    phase1: {
      soil: {
        statement: "Nervengewebe kann sich nach einer pathologischen Schädigung gut regenerieren.",
        answer: false,
        solution: "Nervengewebe kann sich nicht oder kaum regenerieren. Größere Defekte werden durch Granulationsgewebe ausgefüllt → Narbenbildung mit möglichem Funktionsverlust. Epithelien der Haut können sich gut regenerieren, Leberepithelien nur bei erhaltenem Stützgerüst.",
      },
      seed: {
        statement: "Amyloid ist eine Ablagerung von Glykoproteinen im Zwischenzellraum (niemals intrazellulär).",
        answer: true,
        solution: "Richtig. Die Eiweißkomponente besteht oft aus Teilen von Immunglobulinen (L-Ketten). Nachweis einer generalisierten Amyloidose: Rektumbiopsie. Primäre Amyloidose: idiopathisch, v. a. Herz, Pankreas, große Gefäße. Sekundäre: Komplikation chronischer Krankheiten.",
      },
      water: {
        statement: "Ein Ödem entsteht, wenn die Filtration größer ist als die Summe aus Resorption und Lymphabfluss.",
        answer: true,
        solution: "Richtig. Täglich werden ca. 20 Liter in den Zwischenzellraum filtriert; ca. 18 Liter werden resorbiert, 2 Liter gelangen über die Lymphe zurück in die Blutbahn. Übersteigt die Filtration diese Summe, entsteht ein Ödem (= schmerzlose, nicht gerötete Schwellung).",
      },
    },
    harvestQuestions: [
      {
        question: "In welcher Reihenfolge verlaufen die Phasen der Frakturheilung?",
        type: "mc",
        options: [
          "Bluterguss → Granulationsgewebe → bindegewebiger Kallus → provisorisch knöcherner Kallus → lamellärer Knochen",
          "Entzündung → Knorpelbildung → sofortige Kalzifizierung",
          "Fibrinbildung → Narbengewebe → Ossifikation ohne Kallusphase",
          "Periostreaktion → Knochenzement → endgültige Heilung nach 1 Woche",
        ],
        correct: 0,
      },
      {
        question: "Was ist sekundäre Amyloidose?",
        type: "mc",
        options: [
          "Idiopathische Amyloidose ohne erkennbare Ursache, v. a. Herz, Pankreas und große Gefäße",
          "Amyloidose als Komplikation chronischer Erkrankungen wie Tuberkulose, rheumatoider Arthritis oder Lymphogranulomatose",
          "Familiär gehäufte Amyloidose ohne Grunderkrankung",
          "Amyloidose durch Fibrineinlagerung in Gefäßwände",
        ],
        correct: 1,
      },
      {
        question: "Wie ist Hyalin charakterisiert?",
        type: "mc",
        options: [
          "Faserreich, sauer, in Lymphknoten lokalisiert",
          "Glasig, homogen, eosinophil (mit Eosin anfärbbar), hauptsächlich aus Eiweißen bestehend",
          "Kristalline Kalkablagerung in Gelenken",
          "Zelluläres Abbauprodukt nekrotischer Zellen",
        ],
        correct: 1,
      },
      {
        question: "Welche Ursache liegt einem nephrotischen Ödem zugrunde?",
        type: "mc",
        options: [
          "Erhöhung des hydrostatischen Drucks durch Herzinsuffizienz",
          "Behinderung des Lymphabflusses nach Lymphknotenentfernung",
          "Absinken des onkotischen Drucks durch Eiweißmangel (z. B. bei Leberzellschäden oder nephrotischem Syndrom)",
          "Zunahme der Kapillarpermeabilität bei akuter Entzündung",
        ],
        correct: 2,
      },
      {
        question: "Was ist Caro luxurians?",
        type: "mc",
        options: [
          "Übermäßige Knochenbildung nach Frakturheilung",
          "Überschießende Narbenbildung durch exzessives Granulationsgewebe (wildes Fleisch)",
          "Eine Form der hypertrophischen Amyloidose",
          "Abnorme Kallusbildung bei infizierten Frakturen",
        ],
        correct: 1,
      },
    ],
    phase4Questions: [
      {
        question: "Welche Ursachen können ein Ödem auslösen?",
        type: "mc",
        options: [
          "Erhöhung des hydrostatischen Drucks (z. B. Herzinsuffizienz, Leberzirrhose, postthrombotisches Syndrom)",
          "Absinken des onkotischen Drucks bei Eiweißmangel (z. B. Hunger, nephrotisches Syndrom)",
          "Behinderung des Lymphabflusses (z. B. nach Mastektomie mit Lymphknotenentfernung)",
          "Erhöhung der Kapillarpermeabilität bei akuter Entzündung",
          "Erhöhung des arteriellen Drucks durch körperliche Belastung",
        ],
        correct: [0, 1, 2, 3],
      },
      {
        question: "Welche Aussagen zu Amyloidose und Hyalinose sind korrekt?",
        type: "mc",
        options: [
          "Amyloid lagert sich immer intrazellulär ab",
          "Hyalinose kommt z. B. bei Arteriosklerose als Verdickung der Arterienwand vor",
          "Primäre Amyloidose betrifft v. a. Herz, Pankreas und große Gefäße",
          "Sekundäre Amyloidose tritt als Komplikation bei Tuberkulose und rheumatoider Arthritis auf",
          "Hyalinose findet sich auch bei der Zuckergussleber bzw. -milz und der Pleuraschwarte",
        ],
        correct: [1, 2, 3, 4],
      },
    ],
  }),

  makeDetailedPlant({
    id: "humanpathologie_1049_entwicklung_entzuendung",
    title: "Entwicklungsstörungen & Entzündung",
    contextHint: "Gametopathien bis Fetopathien, FAS, Morbus haemolyticus neonatorum, Kardinalsymptome, Exsudattypen, Abszess vs. Empyem",
    phase1: {
      soil: {
        statement: "Embryopathien treten während des 1.–14. Schwangerschaftstages auf und führen in 50 % der Fälle zum Frühabort.",
        answer: false,
        solution: "Das sind Blastopathien. Embryopathien betreffen den 15. Tag bis zum 3. Monat, wenn Organbildung und Gliedmaßenentwicklung stattfinden. Ursachen: ionisierende Strahlung, Röteln, Medikamente (Thalidomid/Contergan → Phokomelie), Alkohol.",
      },
      seed: {
        statement: "Die 5 Kardinalsymptome der Entzündung nach Galen sind: Rubor, Tumor, Dolor, Calor und Functio laesa.",
        answer: true,
        solution: "Richtig. Rubor = Rötung, Tumor = Schwellung, Dolor = Schmerzen, Calor = Überwärmung, Functio laesa = Funktionsstörung. Rubor und Calor entstehen durch Vasodilatation, Tumor und Dolor durch Exsudation von Blutplasma.",
      },
      water: {
        statement: "Beim Morbus haemolyticus neonatorum ist die Mutter Rh-positiv und das Kind Rh-negativ.",
        answer: false,
        solution: "Umgekehrt: Die Mutter ist Rh-negativ, das Kind Rh-positiv (wie der Vater). Bei der Geburt gelangen kindliche Erythrozyten-Antigene ins Mutterblut → Antikörperproduktion → Gefährdung erst bei nachfolgenden Schwangerschaften. Prophylaxe: Anti-D-Immunglobuline nach Erstgeburt.",
      },
    },
    harvestQuestions: [
      {
        question: "Was sind Gametopathien?",
        type: "mc",
        options: [
          "Schädigungen des Embryos durch Alkohol oder Medikamente",
          "Schädigungen der Keimzellen während der Meiose mit Chromosomenzuwachs oder -verlust",
          "Schädigungen der Frucht ab Beginn des 3. Monats durch Infektionen",
          "Entzündungsreaktionen der Gonaden durch Autoimmunprozesse",
        ],
        correct: 1,
      },
      {
        question: "Was ist typisch für die eitrige Entzündung?",
        type: "mc",
        options: [
          "Wässriges Exsudat mit erhöhtem Albumin- und vermindertem Globulingehalt",
          "Exsudat hauptsächlich aus neutrophilen Granulozyten oder Krankheitserregern; Ursache meist Bakterien",
          "Exsudat mit vielen Erythrozyten; Beispiel Virusgrippe",
          "Netzartige Fibrinstruktur durch Exsudation von Blutplasma an Schleimhautoberflächen",
        ],
        correct: 1,
      },
      {
        question: "Was ist ein Empyem?",
        type: "mc",
        options: [
          "Entzündung eines Haarbalgs",
          "Ansammlung von Eiter in einer durch Gewebezerfall neu gebildeten Höhle (Ursache: meist Staphylokokken)",
          "Eiteransammlung in einem bereits vorhandenen Hohlraum wie Pleurahöhle, Kieferhöhle oder Perikard",
          "Flächenhafte Ausbreitung einer eitrigen Entzündung im lockeren Bindegewebe",
        ],
        correct: 2,
      },
      {
        question: "Womit ist das fetale Alkoholsyndrom (FAS) korrekt beschrieben?",
        type: "mc",
        options: [
          "Eine Fetopathie durch das Cytomegalievirus",
          "Die häufigste Embryopathie durch einen fruchtschädigenden Stoff; Merkmale: Minderwuchs, verzögerte geistige Entwicklung, antimongoloide Lidachse, verkürzter Nasenrücken, schmales Lippenrot",
          "Eine Gametopathie durch mütterlichen Alkoholkonsum vor der Befruchtung",
          "Eine Blastopathie mit symmetrischen Doppelmissbildungen",
        ],
        correct: 1,
      },
      {
        question: "Was beschreibt die allgemeine (systemische) Entzündungsreaktion?",
        type: "mc",
        options: [
          "Lokale Vasodilatation und Exsudation am Entzündungsort",
          "Beschleunigte BSG, CRP-Erhöhung, Fieber, Linksverschiebung im Differenzialblutbild (vermehrte jugendliche Granulozyten)",
          "Ausschüttung von Histamin und Serotonin aus Mastzellen",
          "Vermehrung von Bindegewebszellen und lokale Durchblutungsstörung",
        ],
        correct: 1,
      },
    ],
    phase4Questions: [
      {
        question: "Welche der folgenden sind Beispiele für Embryopathien?",
        type: "mc",
        options: [
          "Trisomie 21 (Down-Syndrom) – Gametopathie",
          "Spina bifida (offener Rückenmarkskanal/Wirbelspalt)",
          "Phokomelie nach Thalidomid (Extremitätenansatz an Schulter oder Hüfte)",
          "Klinefelter-Syndrom (47, XXY) – Gametopathie",
          "Syndaktylie (Verwachsung von Fingern oder Zehen)",
        ],
        correct: [1, 2, 4],
      },
      {
        question: "Welche Aussagen zur lokalen Entzündungsreaktion sind korrekt?",
        type: "mc",
        options: [
          "Phase I: Adrenalinausschüttung → Vasokonstriktion der Arteriolen (initiale Ischämie)",
          "Phase II: Histaminausschüttung und O2-Mangel → Vasodilatation → verstärkte Durchblutung (Rubor, Calor)",
          "Phase III: Verengung der Venolen → verlangsamte Blutströmung → Exsudation von Blutplasma (Tumor, Dolor)",
          "Neutrophile Granulozyten (Lebensdauer ca. 24 h) und Makrophagen (ca. 150 Tage) sind die wichtigsten emigrierenden Zellen",
          "Exsudation hat keine nützliche Funktion",
        ],
        correct: [0, 1, 2, 3],
      },
    ],
  }),

  makeDetailedPlant({
    id: "humanpathologie_1049_tumorpathologie",
    title: "Tumorpathologie",
    contextHint: "Benigne vs. maligne, TNM-System, Metastasierungswege, Tumorsystematik, Tumorentstehung, wichtige Karzinome, Therapie",
    phase1: {
      soil: {
        statement: "Infiltratives Wachstum und Metastasen sind sichere Zeichen der Malignität.",
        answer: true,
        solution: "Richtig. Sichere Malignitätszeichen: infiltratives Wachstum, Metastasen, hohe Mitoserate. Unsichere Zeichen: rasches Wachstum, atypische Zellen, Verlust der Differenzierung. Bösartige Tumoren bilden meist keine Bindegewebskapsel und zeigen im histologischen Schnitt kaum Ähnlichkeit mit dem Ausgangsgewebe.",
      },
      seed: {
        statement: "Im TNM-System bedeutet M0 'Fernmetastasen vorhanden'.",
        answer: false,
        solution: "Umgekehrt: M0 = keine Fernmetastasen nachweisbar, M1 = Fernmetastasen vorhanden. T (Tumor, Tis–T4 = zunehmende Ausdehnung), N (Nodus, N0 = keine, N1–N3 = regionale, N4 = ferne Lymphknoten). Hirntumoren und maligne Lymphome werden nicht nach TNM klassifiziert.",
      },
      water: {
        statement: "Das Bronchialkarzinom ist die häufigste Krebsform bei Männern; nach Rauchstopp gleicht sich die Krebsrate nach ca. 10 Jahren der von Nichtrauchern an.",
        answer: true,
        solution: "Richtig. Hauptnoxen: Tabakrauch (Risiko 7–15-fach erhöht) und Asbest. Das respiratorische Epithel wandelt sich metaplastisch in Plattenepithel um → Carcinoma in situ. Warnsignal: blutiges Sputum.",
      },
    },
    harvestQuestions: [
      {
        question: "Welche Namensendung haben bösartige mesenchymale Tumoren?",
        type: "mc",
        options: [
          "-om (z. B. Osteom, Lipom) = gutartig",
          "-sarkom (z. B. Osteosarkom, Liposarkom)",
          "-karzinom (z. B. Adenokarzinom) = epithelial bösartig",
          "-blastom (z. B. Retinoblastom) = embryonaler Tumor",
        ],
        correct: 1,
      },
      {
        question: "Was ist ein Carcinoma in situ (CIS)?",
        type: "mc",
        options: [
          "Ein Tumor, bei dem die Basalmembran bereits durchbrochen ist",
          "Ein hochgradig atypisches Epithel ohne Zellausreifung, bei dem die Basalmembran noch intakt ist – kein Karzinom",
          "Ein bösartiger Tumor mit bereits vorhandenen Lymphknotenmetastasen",
          "Ein semimaligner Tumor wie das Basaliom",
        ],
        correct: 1,
      },
      {
        question: "Welcher Tumormarker ist erhöht beim Prostatakarzinom?",
        type: "mc",
        options: [
          "Alpha-1-Fetoprotein (AFP)",
          "Karzinoembryonales Antigen (CEA)",
          "Prostataspezifisches Antigen (PSA)",
          "Kalzitonin",
        ],
        correct: 2,
      },
      {
        question: "Welches Zeichen ist typisch für das Mammakarzinom?",
        type: "mc",
        options: [
          "Blutiger Auswurf (Hämoptoe)",
          "Orangenschalenhaut durch Lymphödem mit Vertiefung an den Haarfollikeln",
          "Virchow-Drüse als Metastase oberhalb des Schlüsselbeins",
          "Blutbeimengungen im Stuhl",
        ],
        correct: 1,
      },
      {
        question: "Was ist lymphogene Metastasierung?",
        type: "mc",
        options: [
          "Ausbreitung über die Blutbahn in entfernte Organe",
          "Infiltration in Körperhöhlen wie Pleura oder Peritoneum",
          "Tumorzellen brechen in Lymphgefäße ein und werden zum nächsten Lymphknoten verschleppt; über Ductus thoracicus in die Blutbahn",
          "Verbreitung durch einen Stichkanal bei Biopsie oder Stichverletzung",
        ],
        correct: 2,
      },
    ],
    phase4Questions: [
      {
        question: "Welche Faktoren können zur Tumorentstehung beitragen?",
        type: "mc",
        options: [
          "Onkogene (> 100 bekannt, plötzlich veränderte oder fehlregulierte Gene fördern Tumorwachstum)",
          "Tumorsuppressor-Gen-Verlust (Loss-of-Function-Mutation, z. B. p53) begünstigt Tumorbildung",
          "Tumorviren: RNA-Viren (Hepatitis C, HTLV) und DNA-Viren (EBV, HPV, HBV, Herpes)",
          "Ionisierende Strahlung: UV → Thymin-Dimere; Röntgen/Radioaktivität → DNA-Veränderungen",
          "Täglicher Kaffeekonsum über 3 Tassen",
        ],
        correct: [0, 1, 2, 3],
      },
      {
        question: "Welche der folgenden Aussagen zu wichtigen Karzinomen sind korrekt?",
        type: "mc",
        options: [
          "Bronchialkarzinom: häufigste Krebsform bei Männern, Asbest und Tabak als Hauptnoxen",
          "Mammakarzinom: Frühzeichen – Orangenschalenhaut, Einziehung der Brustwarze; häufig Frauen 50–60 Jahre",
          "Portiokarzinom: Prävention durch HPV-Impfung; Diagnostik per Pap-Abstrich (Pap I–V)",
          "Magenkarzinom: Prognose des Frühkarzinoms 90 % 5-Jahres-Überleben; Risikofaktor Helicobacter pylori",
          "Prostatakarzinom: häufig bei Männern über 70 Jahre, Therapie mit Östrogenen",
        ],
        correct: [0, 1, 2, 3, 4],
      },
    ],
  }),

  makeDetailedPlant({
    id: "humanpathologie_1049_immunpathologie_schmerz",
    title: "Immunpathologie & Schmerz",
    contextHint: "T-/B-Zellen, MHC-Proteine, Allergietypen I–IV, Autoimmunerkrankungen (HLA), Graft-versus-Host, Schmerz akut/chronisch, WHO-Stufenschema",
    phase1: {
      soil: {
        statement: "Das T-Zellsystem ist thymusunabhängig.",
        answer: false,
        solution: "T-Zellen sind thymusabhängig (T = Thymus). B-Zellen sind thymusunabhängig (B = Bursa fabricii der Vögel, beim Menschen entsprechend das Knochenmark). Fehlt nur das T-Zellsystem (Di-George-Syndrom), sterben Patienten an Virus- und Pilzinfektionen; fehlt das B-Zellsystem, an bakteriellen Infektionen.",
      },
      seed: {
        statement: "Der allergische Typ I (Anaphylaxie) wird durch IgE-Antikörper vermittelt, die an Mastzellen gebunden sind und bei erneutem Antigenkontakt zur Histaminausschüttung führen.",
        answer: true,
        solution: "Richtig. Folge: Vasodilatation, erhöhte Gefäßpermeabilität, Bronchokonstriktion (Asthma). Im Extremfall: anaphylaktischer Schock. Therapie: Adrenalin, Kortikosteroide, Antihistaminika. Atopie = genetische Disposition zu Typ-I-Reaktionen.",
      },
      water: {
        statement: "Chronische Schmerzen dauern länger als 3–6 Monate und sind immer auf eine klar erkennbare organische Ursache zurückzuführen.",
        answer: false,
        solution: "Chronische Schmerzen können multifaktoriell sein, sind oft nicht genau lokalisierbar und haben ihre ursprüngliche Warn- und Signalfunktion verloren. Sie können als eigenständige Erkrankung bestehen, auch wenn die akute Ursache beseitigt ist (z. B. Phantomschmerz nach Amputation).",
      },
    },
    harvestQuestions: [
      {
        question: "Was ist die Hauptaufgabe der MHC-Proteine (Haupt-Gewebeverträglichkeitskomplex)?",
        type: "mc",
        options: [
          "Antikörperproduktion auf B-Lymphozyten",
          "Funktion als Präsentierteller: MHC-Proteine präsentieren T-Lymphozyten Antigenfragmente an der Zelloberfläche",
          "Histaminfreisetzung aus Mastzellgranula",
          "Phagozytose von Bakterien durch Makrophagen",
        ],
        correct: 1,
      },
      {
        question: "Was ist charakteristisch für den Allergie-Typ IV (zellgebundene Immunreaktion)?",
        type: "mc",
        options: [
          "Sofortreaktion durch IgE auf Mastzellen innerhalb von Minuten",
          "Zellyse durch Antikörper-Komplementaktivierung; Latenz 6–12 Stunden",
          "Spätreaktion durch sensibilisierte T-Lymphozyten; Beispiele: Kontaktekzem, Transplantatabstoßung",
          "Ablagerung von Antigen-Antikörper-Komplexen; Beispiel: poststreptokokkale Glomerulonephritis",
        ],
        correct: 2,
      },
      {
        question: "Was beschreibt das WHO-Stufenschema der Schmerztherapie?",
        type: "mc",
        options: [
          "Stufe 1: Opioide; Stufe 2: Antihistaminika; Stufe 3: Kortikosteroide",
          "Stufe 1: Nicht-opioide Schmerzmittel; Stufe 2: Schwach wirksame Opioide; Stufe 3: Stark wirksame Opioide",
          "Stufe 1: Lokalanästhesie; Stufe 2: Zentrale Analgetika; Stufe 3: Chirurgische Intervention",
          "Stufe 1: Physiotherapie; Stufe 2: Antidepressiva; Stufe 3: Opioide",
        ],
        correct: 1,
      },
      {
        question: "Was ist die Graft-versus-Host-Reaktion?",
        type: "mc",
        options: [
          "Abstoßung eines Transplantats durch das Immunsystem des Empfängers (z. B. Transplantatabstoßung)",
          "Reaktion immunkompetenter Spenderzellen gegen Substrate des Empfängerorganismus (z. B. nach Knochenmarktransplantation)",
          "Allergie Typ II durch Blutgruppenunverträglichkeit",
          "Autoimmunreaktion gegen körpereigenes Gewebe nach Infektion",
        ],
        correct: 1,
      },
      {
        question: "Welche Autoimmunerkrankung ist mit HLA-B27 assoziiert?",
        type: "mc",
        options: [
          "Multiple Sklerose (HLA-DR2)",
          "Morbus Basedow (HLA-DR3)",
          "Rheumatoide Arthritis (HLA-DR4)",
          "Morbus Bechterew",
        ],
        correct: 3,
      },
    ],
    phase4Questions: [
      {
        question: "Welche Aussagen zu den Allergietypen sind korrekt?",
        type: "mc",
        options: [
          "Typ I (Anaphylaxie): IgE auf Mastzellen, Histaminausschüttung bei Antigenkontakt, Sofortreaktion",
          "Typ II (zytotoxisch): Antikörper + Komplementaktivierung → Zellyse; Beispiele: Blutgruppenunverträglichkeit, Transplantatabstoßung",
          "Typ III (Immunkomplex): Ablagerung von Ag-Ak-Komplexen, Latenz 6–12 h; Beispiel: poststreptokokkale Glomerulonephritis",
          "Typ IV (zellgebunden): T-Lymphozyten, Spätreaktion; Beispiele: Kontaktekzem, Transplantatabstoßung",
          "Alle vier Typen werden ausschließlich durch IgE-Antikörper vermittelt",
        ],
        correct: [0, 1, 2, 3],
      },
      {
        question: "Welche Aussagen zum Schmerz sind korrekt?",
        type: "mc",
        options: [
          "Nozizeptorschmerz ist ein physiologischer Warnschmerz, der durch Gewebeverletzung oder Entzündung entsteht",
          "Neuropathischer Schmerz geht auf Schädigungen des Nervensystems zurück (z. B. Amputation, Querschnittslähmung, Dauerhyperglykämie)",
          "Übertragener Schmerz ('referred pain') wird am Ort des eigentlichen Stimulus empfunden",
          "Chronische Schmerzen können bestehen bleiben, auch nachdem die ursprüngliche Ursache beseitigt ist",
          "Phantomschmerzen sind ein klassisches Beispiel für chronische Schmerzen nach Gliedmaßenamputation",
        ],
        correct: [0, 1, 3, 4],
      },
    ],
  }),
];
