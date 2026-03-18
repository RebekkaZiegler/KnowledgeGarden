
function makePlant(id, title, context, n) {
  const qBase = `${id}_${n}`;
  const harvestQuestions = [
    { id: `${qBase}_h1`, type: "true_false", statement: `${title} ist ein eigenständiges anatomisch-physiologisches Thema mit eigener Terminologie und Systematik.`, answer: true },
    { id: `${qBase}_h2`, type: "true_false", statement: `${title} hat keinen inhaltlichen Bezug zu den Grundlagen von ${context}.`, answer: false },
    { id: `${qBase}_h3`, type: "true_false", statement: `Ein sicheres Verständnis von ${title} erfordert das Kennen der wesentlichen Begriffe, Strukturen und Funktionsprinzipien dieses Themas.`, answer: true }
  ];
  const bossQuestions = [
    { id: `${qBase}_b1`, type: "true_false", statement: `Für das Verständnis von ${context} ist ${title} ein unverzichtbarer Grundbaustein.`, answer: true }
  ];
  return {
    id,
    title,
    phase1: {
      soil: {
        statement: `${title} ist ein eigenständiges anatomisch-physiologisches Teilgebiet von ${context} mit klar abgrenzbaren Strukturen und Funktionen.`,
        answer: true,
        solution: "Korrekt. Jedes anatomische Teilgebiet hat eigene Strukturen, Begriffe und Funktionsprinzipien, die systematisch erarbeitet werden können."
      },
      seed: {
        statement: `${title} lässt sich vollständig durch Auswendiglernen einzelner Fakten ohne Verständnis der zugrundeliegenden Prinzipien beherrschen.`,
        answer: false,
        solution: "Falsch. Nachhaltiges Lernen anatomischer Themen erfordert das Verständnis von Zusammenhängen – Struktur erklärt Funktion, und Funktion erklärt klinische Bedeutung."
      },
      water: {
        statement: `Ein solides Verständnis der Strukturen und Funktionen von ${title} erleichtert die Einordnung verwandter Themen in ${context}.`,
        answer: true,
        solution: "Korrekt. Anatomische Themen sind vernetzt: Wer Strukturen und ihre Funktionen versteht, kann Zusammenhänge zu benachbarten Themen leichter herstellen."
      }
    },
    phase2: [
      { type: "water", text: "Kernprinzip wiederholen", readinessGain: 24 },
      { type: "fertilize", text: "Funktion und Konsequenzen vertiefen", readinessGain: 22 },
      { type: "trim", text: "Abgrenzung zu Nachbarthemen", readinessGain: 20 }
    ],
    harvestQuestions,
    bossQuestions
  };
}

function makeBed(id, title, context, topics) {
  return {
    id,
    title,
    plants: topics.map((t, i) => makePlant(t.id, t.title, context, i + 1))
  };
}

function makeDetailedPlant(def) {
  const context = def.contextHint || def.context || "diesem Studienbrief";
  return {
    id: def.id,
    title: def.title,
    phase1: def.phase1,
    phase2: def.phase2 || [
      { type: "water", text: "Kernprinzip wiederholen", readinessGain: 24 },
      { type: "fertilize", text: "Funktion und Konsequenzen vertiefen", readinessGain: 22 },
      { type: "trim", text: "Abgrenzung zu Nachbarthemen", readinessGain: 20 }
    ],
    harvestQuestions: def.harvestQuestions || [],
    bossQuestions: def.bossQuestions || [],
    combatQuestions: def.combatQuestions || []
  };
}

const ZYTOLOGIE_1031_PLANTS = [
  makeDetailedPlant({
    id: "zelle_begriff",
    title: "Begriffsbestimmung Zelle",
    phase1: {
      soil: {
        statement: "Die Zelle gilt als kleinste strukturelle und funktionelle Einheit lebender Organismen.",
        answer: true,
        solution: "Die Zelle ist die kleinste Einheit, die alle Grundeigenschaften des Lebens besitzt: Stoffwechsel, Wachstum, Reizbarkeit und Fortpflanzung. Alles, was wir als Lebewesen kennen – ob Einzeller oder Mensch – besteht aus Zellen oder ist selbst eine einzige Zelle."
      },
      seed: {
        statement: "Die Zelle ist in der Zytologie nur als rein anatomische Form ohne Funktion definiert.",
        answer: false,
        solution: "Der Zellbegriff verbindet Morphologie und Physiologie: Eine Zelle ist nicht nur eine bestimmte Form, sondern gleichzeitig die kleinste lebendige Einheit mit eigenem Stoffwechsel, Wachstum und Reizbarkeit. Struktur und Funktion bedingen sich gegenseitig."
      },
      water: {
        statement: "Zellen gleicher Funktion können sich zu Gewebeverbänden zusammenschliessen.",
        answer: true,
        solution: "Zellen mit gleicher Spezialisierung lagern sich zu Gewebeverbänden zusammen. Gewebe ist damit die nächsthöre Organisationsebene über der Einzelzelle und Grundlage aller Organe des Körpers."
      }
    },
    harvestQuestions: [
      { id: "zb_h1", type: "mc", question: "Welche Gruppe benennt korrekt die vier Grundeigenschaften des Lebens, die jede Zelle besitzen muss?", options: [
        { text: "Stoffwechsel, Wachstum, Reizbarkeit und Reproduktion", correct: true },
        { text: "Atmung, Wachstum, Erregbarkeit und Verdauung", correct: false },
        { text: "Stoffwechsel, Magnetismus, Reproduktion und Bewegung", correct: false },
        { text: "Zellteilung, Osmoregulation, Reizbarkeit und Atmung", correct: false }
      ], explanation: "Die vier Grundeigenschaften des Lebens – Stoffwechsel, Wachstum, Reizbarkeit und Reproduktion – muss jede Zelle besitzen. Kein subzelluläres Element (Organelle, Molekül) erfüllt alle vier gleichzeitig." },
      { id: "zb_h2", type: "mc", question: "Was bezeichnen die Begriffe Morphologie und Physiologie im Zellkontext?", options: [
        { text: "Morphologie = Aufbau/Form der Zelle; Physiologie = Funktion/Prozesse der Zelle", correct: true },
        { text: "Morphologie = Funktion; Physiologie = Aufbau", correct: false },
        { text: "Morphologie = Zellkern; Physiologie = Zytoplasma", correct: false },
        { text: "Beide Begriffe bezeichnen dasselbe – den Zellstoffwechsel", correct: false }
      ], explanation: "Der Zellbegriff verbindet Morphologie (griech. morphe = Form: Aufbau, Grösse, Gestalt der Zelle) mit Physiologie (griech. physis = Natur: Funktion, Stoffwechsel, Prozesse). Struktur erklärt Funktion – das Kernprinzip der Zytologie." },
      { id: "zb_h3", type: "true_false", statement: "Die Organisationsebenen von der Zelle bis zum Organismus lauten: Zelle → Gewebe → Organ → Organsystem → Organismus.", answer: true, explanation: "Diese Hierarchie ist das Grundprinzip biologischer Organisation: Gleichartig differenzierte Zellen bilden Gewebe, Gewebe organisieren sich zu Organen, Organe zu Organsystemen und diese zusammen zum Organismus." },
      { id: "zb_h4", type: "true_false", statement: "Virionen (Viren) gelten als kleinste lebensfähige Einheiten, da sie sich reproduzieren können.", answer: false, explanation: "Viren sind keine Zellen und gelten nicht als lebensfähig: Sie besitzen keinen eigenen Stoffwechsel und können sich nur unter Nutzung der Replikationsmaschinerie einer Wirtszelle vermehren. Sie erfüllen nicht alle vier Grundeigenschaften des Lebens eigenständig." },
      { id: "zb_h5", type: "true_false", statement: "Einzeller wie Amöben oder Paramecien sind vollständige Organismen, die alle Lebensfunktionen in einer Zelle vereinen.", answer: true, explanation: "Protozön (tierische Einzeller) wie Amöben und Paramecien erledigen Ernährung, Bewegung, Reizaufnahme und Fortpflanzung in einer einzigen Zelle – ohne Gewebeverband. Sie belegen, dass die Zelle selbst die kleinste lebensfähige Einheit ist." },
      { id: "zb_h6", type: "mc", question: "In welche Kategorie des hierarchischen Aufbaus ist 'Leber' einzuordnen?", options: [
        { text: "Organ (besteht aus mehreren Gewebetypen)", correct: true },
        { text: "Gewebe (gleichartige Zellen mit gemeinsamer Funktion)", correct: false },
        { text: "Organsystem (funktionell verknüpfte Organe)", correct: false },
        { text: "Zelle (kleinste Einheit)", correct: false }
      ], explanation: "Die Leber ist ein Organ: Sie besteht aus mehreren Gewebetypen (Leberparenchymzellen/Hepatozyten, Bindegewebe, Gefässe, Gallengänge). Das Verdauungssystem wäre dagegen das Organsystem, zu dem die Leber gehört." }
    ],
    bossQuestions: [
      { id: "zb_b1", type: "true_false", statement: "Zell- und Gewebebegriff sind funktionell verknüpft: Gewebe sind organisierte Verbände gleichartig differenzierter Zellen mit gemeinsamer Funktion.", answer: true }
    ],
    combatQuestions: [
      { id: "zb_mc1", type: "mc", question: "Welche Aussagen zur biologischen Organisationshierarchie sind korrekt?", options: [
        { text: "Zellen bilden Gewebe, Gewebe bilden Organe", correct: true },
        { text: "Organe sind kleiner als Gewebe", correct: false },
        { text: "Gleichartig differenzierte Zellen bilden einen Gewebeverband", correct: true },
        { text: "Ein Organismus besteht aus maximal einem Organsystem", correct: false }
      ]},
      { id: "zb_mc2", type: "mc", question: "Warum gelten Viren nicht als lebende Zellen?", options: [
        { text: "Sie besitzen keinen eigenen Stoffwechsel und können sich nur in Wirtszellen vermehren", correct: true },
        { text: "Sie sind zu gross für eine Zelle", correct: false },
        { text: "Sie besitzen keine Nukleinsäuren", correct: false },
        { text: "Sie fehlen in prokaryonten Organismen", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "zellformen_und_grösse",
    title: "Zellformen und Zellgrösse",
    phase1: {
      soil: {
        statement: "Zellen können sehr unterschiedliche Formen besitzen, z. B. kugelig oder spindelförmig.",
        answer: true,
        solution: "Zellform und Funktion sind direkt verknüpft: Nervenzellen sind lang ausgezogen für Signalleitung, Epithelzellen flach für Oberflächenbedeckung, Muskelfasern spindelförmig für Kontraktion. Diese Formenvielfalt ist kein Zufall, sondern Ausdruck funktioneller Spezialisierung."
      },
      seed: {
        statement: "Alle menschlichen Zellen sind in Form und Grösse nahezu identisch.",
        answer: false,
        solution: "Erythrozyten sind nur etwa 7 µm gross und bikonkav geformt, Nervenzellen können mit ihren Ausläufern Meter lang sein. Diese extreme Vielfalt spiegelt die verschiedenartigen Aufgaben der Zellen im Körper wider."
      },
      water: {
        statement: "Die Eizelle (Ovum) ist mit etwa 120 Mikrometern Durchmesser die grösste menschliche Zelle und damit gerade noch mit blossem Auge erkennbar.",
        answer: true,
        solution: "Die Eizelle (Ovum) ist die grösste menschliche Zelle mit einem Durchmesser von etwa 120 Mikrometern und damit gerade noch mit blossem Auge sichtbar. Die meisten anderen Körperzellen sind dagegen nur mikroskopisch erkennbar."
      }
    },
    harvestQuestions: [
      { id: "zf_h1", type: "mc", question: "Welchen Durchmesser hat die Eizelle (Ovum) als grösste menschliche Zelle?", options: [
        { text: "Ca. 120 Mikrometer", correct: true },
        { text: "Ca. 7–8 Mikrometer", correct: false },
        { text: "Ca. 1–2 Mikrometer", correct: false },
        { text: "Ca. 500 Mikrometer", correct: false }
      ], explanation: "Die Eizelle hat ca. 120 µm Durchmesser und ist damit gerade noch mit blossem Auge sichtbar. Zum Vergleich: Erythrozyten sind ca. 7–8 µm (bikonkave Scheiben), Bakterien ca. 1–2 µm." },
      { id: "zf_h2", type: "mc", question: "Welche Zellform erleichtert die Verformbarkeit beim Durchqueren enger Kapillaren?", options: [
        { text: "Bikonkave Scheibenform (Erythrozyten)", correct: true },
        { text: "Kugelige Form (Lymphozyten)", correct: false },
        { text: "Spindelform (Muskelfasern)", correct: false },
        { text: "Pseudopodienform (Makrophagen)", correct: false }
      ], explanation: "Die bikonkave Scheibenform der Erythrozyten ist eine spezifische Anpassung: Sie maximiert die Diffusionsoberfläche für den Gasaustausch und ermöglicht die extreme Verformbarkeit beim Passieren von Kapillaren mit nur 3–4 µm Durchmesser – kleiner als der Erythrozyt selbst." },
      { id: "zf_h3", type: "true_false", statement: "Thrombozyten sind keine vollständigen Zellen, sondern kernlose Membranfragmente, die von Megakaryozyten im Knochenmark abgeschnürt werden.", answer: true, explanation: "Thrombozyten entstehen durch Fragmentierung von Megakaryozyten im Knochenmark. Sie besitzen keinen Zellkern, keine DNA und können sich nicht teilen. Trotzdem sind sie lebenswichtige Zellstrukturen für die Hämostase (Blutgerinnung)." },
      { id: "zf_h4", type: "true_false", statement: "Reife Erythrozyten besitzen Mitochondrien für ihre ATP-Versorgung.", answer: false, explanation: "Reife Erythrozyten besitzen weder Mitochondrien noch einen Zellkern. Sie gewinnen ATP ausschliesslich aus der anaeroben Glykolyse. Dieser Verzicht auf Organellen ist funktionell sinnvoll: Er schafft Platz für maximale Hämoglobinbeladung." },
      { id: "zf_h5", type: "mc", question: "Warum können motorische Nervenzellen (Motoneuronen) Axone von über einem Meter Länge ausbilden?", options: [
        { text: "Weil ihre Signalübertragungsfunktion eine physische Verbindung zwischen weit entfernten Strukturen erfordert", correct: true },
        { text: "Weil sie durch rasante Zellteilung immer länger werden", correct: false },
        { text: "Weil sie alle anderen Organellen in den Axonfortsatz auslagern", correct: false },
        { text: "Weil sie die einzigen Zellen ohne Ruhemembranpotential sind", correct: false }
      ], explanation: "Motoneuronen müssen elektrische Signale vom Rückenmark bis zu Muskeln in den Extremitäten leiten – z.B. das Axon des N. ischiadicus vom Rückenmark bis zur Wadenmuskulatur. Diese Funktion erfordert eine physische Kontinuität von >1 m." },
      { id: "zf_h6", type: "true_false", statement: "Glatte Muskelzellen sind spindelförmig und besitzen einen zentral gelegenen ovalen Kern, während Skelettmuskelfasern mehrere randständige Kerne aufweisen.", answer: true, explanation: "Die histologische Unterscheidung ist prüfungsrelevant: Glatte Muskelzellen – spindelförmig, ein zentraler Kern. Skelettmuskelfasern – lang ausgezogen, viele randständige Kerne (polynodt, da durch Zellfusion entstanden). Herzmuskelzellen – quer gestreift, ein zentraler Kern." }
    ],
    bossQuestions: [
      { id: "zf_b1", type: "true_false", statement: "Zellen haben keine einheitliche Form: Ihre Gestalt ist stark variabel und spiegelt direkt ihre jeweilige Funktion wider.", answer: true }
    ],
    combatQuestions: [
      { id: "zf_mc1", type: "mc", question: "Welche Aussagen zu Erythrozyten sind korrekt?", options: [
        { text: "Sie haben bikonkave Scheibenform und ca. 7–8 µm Durchmesser", correct: true },
        { text: "Sie besitzen keinen Zellkern", correct: true },
        { text: "Sie gewinnen ATP durch anaerobe Glykolyse", correct: true },
        { text: "Sie enthalten Mitochondrien zur oxidativen Phosphorylierung", correct: false }
      ]},
      { id: "zf_mc2", type: "mc", question: "Welche Zelle hat den grössten Durchmesser aller menschlichen Zellen?", options: [
        { text: "Eizelle (Ovum, ca. 120 µm)", correct: true },
        { text: "Makrophage (ca. 20 µm)", correct: false },
        { text: "Erythrozyt (ca. 7–8 µm)", correct: false },
        { text: "Neutrophiler Granulozyt (ca. 12 µm)", correct: false }
      ]},
      { id: "zf_mc3", type: "mc", question: "Welche Zellformen sind den genannten Zelltypen korrekt zugeordnet?", options: [
        { text: "Erythrozyt – bikonkave Scheibe", correct: true },
        { text: "Glatte Muskelzelle – spindelförmig mit zentralem Kern", correct: true },
        { text: "Nervenzelle – kugelig ohne Fortsätze", correct: false },
        { text: "Skelettmuskelfaser – spindelförmig mit zentralem Kern", correct: false }
      ]},
      { id: "zf_mc4", type: "mc", question: "Welche Zellform ist typisch für Epithelzellen, die eine Grenzfläche bedecken?", options: [
        { text: "Flach (platt), um möglichst viel Fläche abzudecken", correct: true },
        { text: "Spindelförmig, um Kontraktionskräfte zu erzeugen", correct: false },
        { text: "Kuboidal mit langen Ausläufern für die Signalleitung", correct: false },
        { text: "Bikonkav, um die Sauerstoffkapazität zu maximieren", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "prokaryont_vs_eukaryont",
    title: "Prokaryonte und eukaryonte Zellen",
    phase1: {
      soil: {
        statement: "Prokaryonte Zellen besitzen keinen Zellkern.",
        answer: true,
        solution: "Prokaryonte Zellen wie Bakterien besitzen kein von einer Membran umschlossenes Zellkernäquivalent. Ihre DNA liegt frei als kreisförmiges Chromosom im Zytoplasma, ohne Kernhülle von der übrigen Zelle abgegrenzt."
      },
      seed: {
        statement: "Eukaryonte Zellen besitzen einen Zellkern.",
        answer: true,
        solution: "Der membranbegrenzte Zellkern (Nukleus) ist das definitive Merkmal aller Eukaryoten. Er trennt die DNA vom Zytoplasma und ermöglicht getrennte Transkription (Zellkern) und Translation (Ribosom) – ein entscheidender evolutionärer Schritt gegenüber Prokaryoten, die beides im Zytoplasma koppeln."
      },
      water: {
        statement: "Erythrozyten von Säugetieren verlieren im Reifungsverlauf ihren Zellkern.",
        answer: true,
        solution: "Reife Erythrozyten stossen ihren Zellkern während der Erythropöse aus, um maximalen Raum für Hämoglobin zu gewinnen. Da ohne Kern keine DNA-Replikation möglich ist, können sie sich nicht teilen – ihre Lebensdauer von etwa 120 Tagen ist biologisch fix."
      }
    },
    harvestQuestions: [
      { id: "pe_h1", type: "mc", question: "Welche Zellstruktur besitzen Prokaryoten im Gegensatz zu Eukaryoten EBENFALLS?", options: [
        { text: "Membranbegrenzter Zellkern", correct: false },
        { text: "Ribosomen (70S-Typ)", correct: true },
        { text: "Mitochondrien", correct: false },
        { text: "Golgi-Apparat", correct: false }
      ], explanation: "Prokaryoten besitzen Ribosomen (70S-Typ), aber keinen membranbegrenzten Zellkern, keine Mitochondrien und keinen Golgi-Apparat. Eukaryonte Ribosomen sind grösser (80S) – dieser Unterschied erklärt, warum viele Antibiotika (z.B. Tetracycline) gezielt prokaryonte 70S-Ribosomen hemmen, ohne menschliche Zellen zu schädigen." },
      { id: "pe_h2", type: "true_false", statement: "Bei Prokaryoten läufen Transkription und Translation gleichzeitig im selben Zellraum ab.", answer: true, explanation: "Da Prokaryoten keine Kernhülle besitzen, kann ein Ribosom an die mRNA binden und mit der Translation beginnen, während die RNA-Polymerase die mRNA noch transkribiert (sog. Kopplungsprinzip). Bei Eukaryoten sind Transkription (im Kern) und Translation (im Zytoplasma) räumlich getrennt." },
      { id: "pe_h3", type: "mc", question: "Welche Organismengruppen gehören zu den Prokaryoten?", options: [
        { text: "Bakterien und Archäen", correct: true },
        { text: "Pilze", correct: false },
        { text: "Pflanzen", correct: false },
        { text: "Protisten (Einzeller wie Amöben)", correct: false }
      ], explanation: "Prokaryoten umfassen nur zwei Domänen: Bacteria und Archäa. Alle anderen – Tiere, Pflanzen, Pilze und Protisten – sind Eukaryoten. Diese Zweiteilung ist die fundamentalste Klassifikation der Lebewelt." },
      { id: "pe_h4", type: "true_false", statement: "Prokaryonte Zellen besitzen keinen membranbegrenzten Zellkern – ihre DNA liegt als Nucleoid frei im Zytoplasma.", answer: true, explanation: "Bei Prokaryoten liegt die zirkuläre chromosomale DNA als Nucleoid (keine Kernhülle) im Zytoplasma. Zusätzlich können kleine ringförmige DNA-Stücke (Plasmide) vorhanden sein. Das Fehlen der Kernhülle ist das Definitionsmerkmal der Prokaryoten." },
      { id: "pe_h5", type: "true_false", statement: "Pilze sind Prokaryoten und deshalb besonders empfindlich gegenüber bakteriziden Antibiotika.", answer: false, explanation: "Pilze sind Eukaryoten – sie haben membranumschlossene Zellkerne, Mitochondrien und 80S-Ribosomen wie menschliche Zellen. Antibiotika, die auf prokaryonte Strukturen (70S-Ribosomen, Peptidoglykan-Zellwand) abzielen, wirken daher nicht gegen Pilze. Pilzinfektionen erfordern Antimykotika." },
      { id: "pe_h6", type: "true_false", statement: "Reife Erythrozyten des Menschen sind kernlos, entstammen aber eukaryon Vorläuferzellen.", answer: true, explanation: "Erythroblasten (Vorläuferzellen) sind eukaryonte Zellen mit vollständigem Kern. Im Laufe der Erythropöse im Knochenmark stossen reifende Erythrozyten ihren Kern aus – das Endprodukt (reifer Erythrozyt) ist kernlos, aber kein Prokaryot, da der Kernverlust ein Reifungsergebnis ist." }
    ],
    bossQuestions: [
      { id: "pe_b1", type: "true_false", statement: "Ausnahmen bei Säugetierzellen widerlegen nicht das eukaryonte Grundprinzip.", answer: true }
    ],
    combatQuestions: [
      { id: "pe_mc1", type: "mc", question: "Welche Merkmalskombination beschreibt korrekt Prokaryoten (im Unterschied zu Eukaryoten)?", options: [
        { text: "Kein Zellkern, 70S-Ribosomen, keine membranumschlossenen Organellen", correct: true },
        { text: "Zellkern vorhanden, 70S-Ribosomen, Mitochondrien vorhanden", correct: false },
        { text: "Kein Zellkern, 80S-Ribosomen, Golgi-Apparat vorhanden", correct: false },
        { text: "Kein Zellkern, 70S-Ribosomen, Mitochondrien vorhanden", correct: false }
      ], explanation: "Prokaryoten haben kein membranumschlossenes Zellkern-Äquivalent (Nucleoid), verwenden 70S-Ribosomen (Ziel für Antibiotika) und besitzen keine membranumschlossenen Organellen wie Mitochondrien oder Golgi-Apparat." },
      { id: "pe_mc2", type: "mc", question: "Warum wirken viele Antibiotika nicht gegen Pilzinfektionen?", options: [
        { text: "Weil Pilze Eukaryoten mit 80S-Ribosomen sind – eukaryonte wie menschliche Zellen", correct: true },
        { text: "Weil Pilze keine Zellwand besitzen", correct: false },
        { text: "Weil Pilze prokaryonte Zellen ohne Zellkern sind", correct: false },
        { text: "Weil Antibiotika ausschliesslich auf Viren wirken", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "zelldifferenzierung",
    title: "Zelldifferenzierung",
    phase1: {
      soil: {
        statement: "Zelldifferenzierung bedeutet Spezialisierung von Zellen auf bestimmte Aufgaben.",
        answer: true,
        solution: "Durch Zelldifferenzierung werden aus einheitlichen Vorläuferzellen Spezialisten: Muskelzellen, Nervenzellen, Drüsen- oder Epithelzellen. Jeder Zelltyp aktiviert dabei nur einen Teil des gemeinsamen Erbguts, was seine spezifische Form und Funktion ergibt."
      },
      seed: {
        statement: "Differenzierte Zellen sind im Organismus stets auf genau eine einzige Funktion beschränkt.",
        answer: false,
        solution: "Differenzierung bedeutet Schwerpunktsetzung, nicht Beschränkung auf genau eine einzige Aufgabe. Leberzellen etwa betreiben gleichzeitig Entgiftung, Proteinsynthese und Glukosestoffwechsel – sie sind Generalisten unter den spezialisierten Zellen."
      },
      water: {
        statement: "Zellen gleicher Funktion bilden Zellverbände, die als Gewebe bezeichnet werden.",
        answer: true,
        solution: "Gleichartig differenzierte Zellen lagern sich zusammen und bilden Gewebe. Zelldifferenzierung ist damit die Voraussetzung für Gewebebildung: Nur wenn Zellen spezialisierte Aufgaben übernehmen, können sie sich sinnvoll zu einem Gewebeverband zusammenschliessen."
      }
    },
    harvestQuestions: [
      { id: "zd_h1", type: "mc", question: "Welche vier Grundgewebetypen entstehen aus der Zelldifferenzierung?", options: [
        { text: "Epithel, Binde- und Stützgewebe, Muskelgewebe, Nervengewebe", correct: true },
        { text: "Knochen, Knorpel, Blut und Lymphe", correct: false },
        { text: "Drüsen-, Endothel-, Parenchym- und Stammzellgewebe", correct: false },
        { text: "Mesenchym, Ektoderm, Entoderm und Mesoderm", correct: false }
      ], explanation: "Die vier Grundgewebetypen sind: Epithelgewebe (Bedeckung, Sekretion), Binde- und Stützgewebe (Stoff-Transport, Halt), Muskelgewebe (Kontraktion), Nervengewebe (Erregungsleitung). Alle anderen Gewebe (Knochen, Knorpel, Blut) sind spezialisierte Unterformen des Bindegewebes." },
      { id: "zd_h2", type: "true_false", statement: "Beim Prozess der Zelldifferenzierung verändert sich der DNA-Gehalt der Zelle.", answer: false, explanation: "Die DNA-Sequenz bleibt bei der Differenzierung unverändert – jede Körperzelle enthält denselben diploiden Chromosomensatz. Was sich ändert, ist das Genexpressionsmuster: Nur bestimmte Gene werden in einer Leberzelle, nur andere in einer Muskelzelle abgelesen (epigenetische Regulation)." },
      { id: "zd_h3", type: "true_false", statement: "Pluripotente Stammzellen können sich zu jedem Gewebetyp differenzieren, nicht aber zu extra-embryonalem Gewebe.", answer: true, explanation: "Pluripotente Zellen (z.B. embryonale Stammzellen, iPS-Zellen) können alle somatischen Gewebetypen bilden. Im Gegensatz dazu können totipotente Zellen (z.B. befruchtete Eizelle, frühe Blastomeren) auch Placenta und Trophoblast bilden. Multipotente Stammzellen (z.B. hämatopötische) können nur eine begrenzte Zahl von Zelltypen bilden." },
      { id: "zd_h4", type: "true_false", statement: "Hoch differenzierte Zellen wie ausgereifte Neuronen sind postmitotisch – sie teilen sich nach der Entwicklung nicht mehr.", answer: true, explanation: "Postmitotische Zellen wie ausgereifte Neuronen haben den Zellzyklus dauerhaft verlassen. Das erklärt, warum Hirnschäden und Rückenmarksverletzungen nur schwer zu regenerieren sind – verlorene Neuronen können nicht durch Zellteilung ersetzt werden. Nur bestimmte Stammzellnischen im Gehirn (z.B. Hippokampus) behalten eine begrenzte Neurogenese." },
      { id: "zd_h5", type: "mc", question: "Was bezeichnet man als 'Totipotenz' einer Zelle?", options: [
        { text: "Die Fähigkeit, alle Zelltypen einschliesslich extra-embryonalem Gewebe zu bilden", correct: true },
        { text: "Die Fähigkeit, sich unbegrenzt zu teilen", correct: false },
        { text: "Die Fähigkeit, mehrere Gewebetypen, aber kein extra-embryonales Gewebe zu bilden", correct: false },
        { text: "Die Fähigkeit zur Zellteilung ohne DNA-Replikation", correct: false }
      ], explanation: "Totipotenz: Fähigkeit zur Bildung aller Zelltypen (Soma + extra-embryonal wie Plazenta) – nur befruchtete Eizelle und frühe Blastomeren. Pluripotenz: alle somatischen Typen, kein extra-embryonal (embryonale Stammzellen). Multipotenz: begrenzte Typen (z.B. hämatopötische Stammzellen)." },
      { id: "zd_h6", type: "true_false", statement: "Zelldifferenzierung ist Voraussetzung für die Ausbildung spezialisierter Organe und Gewebe.", answer: true, explanation: "Organe sind aus mehreren Gewebetypen zusammengesetzt, und Gewebe bestehen aus differenzierten Zellen. Ohne Differenzierung gäbe es nur undifferenzierte Zellmassen ohne spezifische Funktion – die Entstehung komplexer Organe wie Herz oder Leber wäre unmöglich." }
    ],
    bossQuestions: [
      { id: "zd_b1", type: "true_false", statement: "Der Gewebebegriff baut auf dem Prinzip differenzierter Zellverbände auf.", answer: true }
    ],
    combatQuestions: [
      { id: "zd_mc1", type: "mc", question: "Welche Aussagen zur Zelldifferenzierung sind korrekt?", options: [
        { text: "Die DNA-Sequenz bleibt bei der Differenzierung unverändert", correct: true },
        { text: "Differenzierung verändert das Genexpressionsmuster, nicht die DNA", correct: true },
        { text: "Pluripotente Stammzellen können alle somatischen Zelltypen bilden", correct: true },
        { text: "Hoch differenzierte Neuronen teilen sich regelmässig im Erwachsenenalter", correct: false }
      ]},
      { id: "zd_mc2", type: "mc", question: "Welche Reihenfolge der Differenzierungspotenz ist korrekt (höchste zuerst)?", options: [
        { text: "Totipotenz → Pluripotenz → Multipotenz", correct: true },
        { text: "Multipotenz → Pluripotenz → Totipotenz", correct: false },
        { text: "Pluripotenz → Totipotenz → Multipotenz", correct: false },
        { text: "Alle drei Begriffe bezeichnen dasselbe", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "zellmembran",
    title: "Zellmembran",
    phase1: {
      soil: {
        statement: "Die Zellmembran grenzt die Zelle gegen ihre Umwelt ab.",
        answer: true,
        solution: "Die Zellmembran aus einer Phospholipid-Doppelschicht trennt das Zellinnere von der Aussenumgebung. Diese Grenzfunktion ist lebenswichtig, da sie ein stabiles internes Milieu (Homeostase) aufrechterhält und unkontrollierten Stoffaustausch verhindert."
      },
      seed: {
        statement: "Die Zellmembran ist vollständig undurchlässig für alle Stoffe.",
        answer: false,
        solution: "Die Zellmembran ist nicht vollständig undurchlässig, sondern selektiv permeabel: Kleine ungeladene Moleküle wie O2 und CO2 diffundieren frei, während geladene Ionen und grosse Moleküle nur durch spezifische Kanalproteine passieren können."
      },
      water: {
        statement: "Hauptaufgabe der Zellmembran ist die Wirkung als Diffusionsbarriere.",
        answer: true,
        solution: "Als selektiv durchlässige Barriere lässt die Zellmembran Wasser und kleine ungeladene Moleküle passieren, während grössere oder geladene Substanzen Kanalproteine oder aktive Transporter benötigen. So kontrolliert die Membran den Stoff- und Informationsaustausch der Zelle."
      }
    },
    harvestQuestions: [
      { id: "zm_h1", type: "mc", question: "Welche Substanzen können die Lipiddoppelschicht ohne Transportproteine frei passieren?", options: [
        { text: "Sauerstoff (O2) und Kohlendioxid (CO2)", correct: true },
        { text: "Natriumionen (Na+)", correct: false },
        { text: "Glukose", correct: false },
        { text: "ATP", correct: false }
      ], explanation: "Kleine unpolare Moleküle wie O2, CO2 und Fettsäuren lösen sich in der Lipidschicht und passieren frei. Geladene Ionen (Na+, K+, Cl-) benötigen Ionenkanäle, Glukose einen GLUT-Transporter, und grosse Moleküle wie Proteine werden per Endo-/Exozytose transportiert." },
      { id: "zm_h2", type: "mc", question: "Was beschreibt die Na+/K+-ATPase?", options: [
        { text: "Eine Pumpe, die 3 Na+ aus der Zelle und 2 K+ in die Zelle transportiert (unter ATP-Verbrauch)", correct: true },
        { text: "Eine Pumpe, die ATP aus der Zelle exportiert", correct: false },
        { text: "Einen passiven Kanal für Na+ und K+ entlang des Konzentrationsgradienten", correct: false },
        { text: "Ein Enzym, das ATP aus Glukose synthetisiert", correct: false }
      ], explanation: "Die Na+/K+-ATPase ist eine aktive Ionenpumpe: Pro ATP-Molekül werden 3 Na+ aus der Zelle gepumpt und 2 K+ in die Zelle. Dadurch entsteht das Ruhemembranpotential (ca. -70 mV) und der hohe intrazelluläre K+-Gehalt. Sie verbraucht ca. 20–40% des zellularen ATP." },
      { id: "zm_h3", type: "true_false", statement: "Der Unterschied zwischen erleichterter Diffusion und aktivem Transport liegt im Energieverbrauch: Erleichterte Diffusion ist passiv, aktiver Transport verbraucht ATP.", answer: true, explanation: "Erleichterte Diffusion (z.B. Glukose durch GLUT-Transporter) läuft entlang des Konzentrationsgradienten ohne Energieverbrauch ab. Aktiver Transport (z.B. Na+/K+-ATPase) pumpt Moleküle gegen ihren Gradienten und benötigt ATP. Beide verwenden Transportproteine." },
      { id: "zm_h4", type: "true_false", statement: "Phagozytose und Pinozytose sind beides Formen der Endozytose, unterscheiden sich aber in der Grösse des aufgenommenen Materials.", answer: true, explanation: "Endozytose ist der Oberbegriff für die Aufnahme von Material durch Einstülpen der Membran. Phagozytose (griech. phagein = fressen) nimmt grosse feste Partikel auf (Bakterien, Zelltrümmer) – durch spezialisierte Zellen wie Makrophagen. Pinozytose (griech. pinein = trinken) nimmt kleine Flüssigkeitstropfen auf – in fast allen Zelltypen." },
      { id: "zm_h5", type: "mc", question: "Was versteht man unter dem 'Fluid-Mosaik-Modell' der Zellmembran?", options: [
        { text: "Die Membran ist eine bewegliche Phospholipid-Doppelschicht mit eingelagerten, lateral beweglichen Proteinen", correct: true },
        { text: "Die Membran ist starr und unveränderlich wie eine Glasplatte", correct: false },
        { text: "Die Membran besteht ausschliesslich aus Proteinen ohne Lipide", correct: false },
        { text: "Die Proteine sind fest verankert und können sich nicht seitlich bewegen", correct: false }
      ], explanation: "Das Fluid-Mosaik-Modell (Singer & Nicolson 1972) beschreibt die Membran als flüssig-kristallines Gebilde: Phospholipide bewegen sich lateral (Fluidität), Proteine sitzen wie Mosaiksteine in dieser Schicht und können sich ebenfalls bewegen. Diese Flexibilität erklärt die dynamische Anpassung der Membranfunktion." },
      { id: "zm_h6", type: "true_false", statement: "Osmose ist der passive Wassertransport durch eine semipermeable Membran entlang eines Konzentrationsgradienten.", answer: true, explanation: "Osmose ist die Nettobewegung von Wasser von der Seite mit niedrigerer Gelöstkonzentration (hohe Wasseraktivität) zur Seite mit höherer Gelöstkonzentration. Bei Erythrozyten in hyperosmolarer Lösung tritt Wasser aus → Zelle schrumpft (Krenation). In hypoosmolarer Lösung tritt Wasser ein → Zelle schwillt (Lyse-Risiko)." }
    ],
    bossQuestions: [
      { id: "zm_b1", type: "true_false", statement: "Zellabgrenzung und Stofftransport sind gleichrangige Kernfunktionen der Zellmembran.", answer: true }
    ],
    combatQuestions: [
      { id: "zm_mc1", type: "mc", question: "Welche Transportprozesse sind passiv (kein ATP-Verbrauch)?", options: [
        { text: "Einfache Diffusion (z.B. O2, CO2)", correct: true },
        { text: "Erleichterte Diffusion (z.B. Glukose durch GLUT)", correct: true },
        { text: "Osmose (Wassertransport)", correct: true },
        { text: "Na+/K+-ATPase", correct: false }
      ]},
      { id: "zm_mc2", type: "mc", question: "Was bewirkt die Na+/K+-ATPase pro Transportzyklus?", options: [
        { text: "3 Na+ aus der Zelle, 2 K+ in die Zelle – unter Verbrauch von 1 ATP", correct: true },
        { text: "2 Na+ in die Zelle, 3 K+ aus der Zelle", correct: false },
        { text: "ATP-Synthese durch Na+-Rückstrom", correct: false },
        { text: "Gleichmässige Verteilung von Na+ und K+ ohne ATP-Verbrauch", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "zellplasma_organellen",
    title: "Zellplasma und Organellen",
    phase1: {
      soil: {
        statement: "Zum Zellplasma gehören verschiedene Organellen mit spezialisierten Aufgaben.",
        answer: true,
        solution: "Organellen sind membranumschlossene oder strukturell abgegrenzte Kompartimente im Zellplasma, die jeweils spezialisierte Teilfunktionen des Zellstoffwechsels übernehmen. Diese Arbeitsteilung ermöglicht hocheffiziente parallele Prozesse innerhalb einer einzigen Zelle."
      },
      seed: {
        statement: "Organellen sind für Stoffwechsel und Zellfunktion weitgehend bedeutungslos.",
        answer: false,
        solution: "Organellen sind für die Zellfunktion unverzichtbar: Mitochondrien liefern ATP für alle energieabhängigen Prozesse, Ribosomen synthetisieren sämtliche Proteine, der Golgi-Apparat verpackt und sortiert Sekretprodukte. Ohne intakte Organellen bricht der Zellstoffwechsel zusammen."
      },
      water: {
        statement: "Mitochondrien, ER, Ribosomen und Golgi-Apparat werden als zentrale Organellen behandelt.",
        answer: true,
        solution: "Mitochondrien erzeugen ATP durch Zellatmung, Ribosomen synthetisieren Proteine, das raue ER verarbeitet Sekretproteine und der Golgi-Apparat sortiert und verpackt sie für die Weiterleitung. Diese vier Organellen bilden die zentrale Produktions- und Logistikkette der Zelle."
      }
    },
    harvestQuestions: [
      { id: "zo_h1", type: "mc", question: "Welche Organelle ist hauptverantwortlich für die ATP-Synthese durch oxidative Phosphorylierung?", options: [
        { text: "Mitochondrium", correct: true },
        { text: "Golgi-Apparat", correct: false },
        { text: "Ribosom", correct: false },
        { text: "Lysosom", correct: false }
      ], explanation: "Mitochondrien produzieren ATP durch oxidative Phosphorylierung in der inneren Membran (Cristä). Die Elektronentransportkette pumpt H+-Ionen, die ATP-Synthase antreiben. Pro Glukosemolekül entstehen ca. 30–32 ATP. Das Ribosom ist für Proteinsynthese, der Golgi für Sortierung, Lysosomen für den Abbau zuständig." },
      { id: "zo_h2", type: "mc", question: "Welche Organelle ist für die Lipidsynthese und Steroidhormonsynthese hauptsächlich verantwortlich?", options: [
        { text: "Glattes endoplasmatisches Retikulum (glattes ER)", correct: true },
        { text: "Raues endoplasmatisches Retikulum (raues ER)", correct: false },
        { text: "Ribosom", correct: false },
        { text: "Peroxisom", correct: false }
      ], explanation: "Das glatte ER (ohne Ribosomen) ist Ort der Lipidsynthese, Steroidhormonsynthese und des Fremdstoffabbaus (Detoxifikation, v.a. in der Leber). Das raue ER (mit Ribosomen) ist primär für Proteinsynthese und -faltung von Sekretproteinen zuständig." },
      { id: "zo_h3", type: "true_false", statement: "Lysosomen enthalten saure Hydrolasen und bauen zelleigene und aufgenommene Makromoleküle ab.", answer: true, explanation: "Lysosomen haben einen sauren Innen-pH (ca. 4,5–5) und enthalten über 50 verschiedene Hydrolasen (Lipasen, Proteasen, Nukleasen). Sie bauen aufgenommene Partikel (Phagosomen) und beschädigte Organellen (Autophagie) ab. Ein Mangel an lysosomalen Enzymen führt zu sog. lysosomalen Speicherkrankheiten." },
      { id: "zo_h4", type: "true_false", statement: "Mitochondrien besitzen eine eigene zirkuläre DNA (mtDNA) und 70S-Ribosomen – Belege für ihre bakterielle Herkunft.", answer: true, explanation: "Die Endosymbiosetheorie (Lynn Margulis) erklärt die Mitochondrien als evolutionare Nachfahren alphaproteobakterieller Endosymbionten. Belege: eigene zirkuläre DNA (wie Bakterien), 70S-Ribosomen (wie Prokaryoten), binäre Teilung, maternale Vererbung der mtDNA, und doppelte Membran." },
      { id: "zo_h5", type: "mc", question: "Was ist der Unterschied zwischen freien und membrangebundenen Ribosomen?", options: [
        { text: "Freie Ribosomen synthetisieren zytosolische Proteine; membrangebundene am rauen ER Sekret- und Membranproteine", correct: true },
        { text: "Membrangebundene Ribosomen sind grösser und produzieren mehr Proteine", correct: false },
        { text: "Freie Ribosomen sitzen ausschliesslich im Zellkern", correct: false },
        { text: "Es gibt keinen funktionellen Unterschied", correct: false }
      ], explanation: "Freie Ribosomen im Zytosol produzieren Proteine, die in der Zelle bleiben (Zytoskelettproteine, Enzyme des Zytosols). Membrangebundene Ribosomen am rauen ER produzieren Proteine, die sekretiert werden (Antikörper, Hormone) oder in Membranen integriert werden (Rezeptoren, Transporter)." },
      { id: "zo_h6", type: "true_false", statement: "Der Golgi-Apparat modifiziert Proteine aus dem ER durch Glykosilierung und leitet sie an ihren Zielort (trans-Golgi-Sortierung).", answer: true, explanation: "Der Golgi-Apparat empfängt Vesikel vom ER (cis-Golgi), modifiziert Proteine (Zuckeranbau = Glykosilierung, Phosphorylierung) und sortiert sie am trans-Golgi auf Zielorte: Lysosomen, Sekretionsvesikel für Exozytose oder direkt zur Plasmamembran. Ohne Golgi würden Proteine unkontrolliert in der Zelle verteilt." }
    ],
    bossQuestions: [
      { id: "zo_b1", type: "true_false", statement: "Das Zellplasma ist kein passiver Füllraum, sondern funktioneller Reaktionsraum mit Organellen.", answer: true }
    ],
    combatQuestions: [
      { id: "zo_mc1", type: "mc", question: "Welche Organellen sind korrekt ihrer Hauptfunktion zugeordnet?", options: [
        { text: "Mitochondrium – oxidative Phosphorylierung (ATP)", correct: true },
        { text: "Lysosom – Abbau durch saure Hydrolasen", correct: true },
        { text: "Golgi-Apparat – Proteinsortierung und Glykosilierung", correct: true },
        { text: "Glattes ER – Proteinsynthese", correct: false }
      ]},
      { id: "zo_mc2", type: "mc", question: "Warum stützt die mitochondriale DNA die Endosymbiosetheorie?", options: [
        { text: "Weil mtDNA zirkulär ist und 70S-Ribosomen besitzt wie Bakterien", correct: true },
        { text: "Weil Mitochondrien-DNA identisch mit der Kern-DNA ist", correct: false },
        { text: "Weil Mitochondrien keine eigene DNA besitzen", correct: false },
        { text: "Weil die mtDNA linear wie eukaryonte Chromosomen ist", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "zellkern",
    title: "Zellkern (Nukleus)",
    phase1: {
      soil: {
        statement: "Der Zellkern wird als Steuerungszentrum der Zelle beschrieben.",
        answer: true,
        solution: "Der Zellkern enthält die gesamte Erbinformation (DNA) und steuert über Genexpression und mRNA-Synthese alle wesentlichen Zellaktivitäten. Er bestimmt als Steuerzentrum, welche Proteine wann und in welcher Menge hergestellt werden."
      },
      seed: {
        statement: "Die im Zellkern lokalisierte Erbinformation ist für Zellprozesse ohne Bedeutung.",
        answer: false,
        solution: "Der Kern enthält die Erbinformation und steuert zentrale Prozesse."
      },
      water: {
        statement: "Form und Lage des Zellkerns sind je nach Zelltyp variabel: Erythrozyten sind kernlos, Neutrophile haben mehrlappige Kerne, Muskelzellen haben periphere längliche Kerne.",
        answer: true,
        solution: "Die Form und Lage von Zellkernen variiert je nach Zelltyp: Erythrozyten sind kernlos, Neutrophile haben mehrlappige Kerne, Muskelzellen haben periphere längliche Kerne. Diese Variabilität ist Ausdruck unterschiedlicher Genaktivität und Funktion."
      }
    },
    harvestQuestions: [
      { id: "zk_h1", type: "mc", question: "Was unterscheidet Euchromatin von Heterochromatin?", options: [
        { text: "Euchromatin ist aufgelockert und transkriptionsaktiv; Heterochromatin ist kondensiert und weitgehend inaktiv", correct: true },
        { text: "Euchromatin ist nur in der Mitose sichtbar; Heterochromatin immer", correct: false },
        { text: "Heterochromatin enthält RNA; Euchromatin nur DNA", correct: false },
        { text: "Beide sind funktionell identisch", correct: false }
      ], explanation: "Euchromatin ('echtes Chromatin') ist aufgelockert und zugänglich für RNA-Polymerase – Gene hier werden aktiv transkribiert. Heterochromatin ist dicht kondensiert und transcriptionsarm. Die Umwandlung zwischen beiden Zuständen reguliert Genexpression (epigenetische Regulation)." },
      { id: "zk_h2", type: "true_false", statement: "Die Kernporen (nuclear pore complex, NPC) kontrollieren den selektiven Transport zwischen Kern und Zytoplasma.", answer: true, explanation: "Kernporen sind grosse Proteinkomplexe (~120 nm) in der Kernhülle. Kleine Moleküle diffundieren frei; grosse Moleküle (Proteine >40 kDa, mRNA) werden aktiv durch Importine/Exportine unter GTP-Verbrauch transportiert. mRNA verlasst den Kern durch Kernporen; Transkriptionsfaktoren werden aktiv importiert." },
      { id: "zk_h3", type: "true_false", statement: "Skelettmuskelfasern sind vielkernig, weil sie durch Fusion mehrerer Myoblasten entstehen.", answer: true, explanation: "Skelettmuskelfasern entstehen embryonal durch Fusion vieler Myoblasten (Myogenese). Das Ergebnis ist eine polynukleäre Riesenzelle mit bis zu mehreren hundert randständigen Kernen. Diese Vielkernigkeit ist normal und wichtig für die koordinierte Proteinexpression in der langen Faser." },
      { id: "zk_h4", type: "true_false", statement: "Der menschliche Zellkern enthält 46 Chromosomen, davon 44 Autosomen und 2 Gonosomen (Geschlechtschromosomen).", answer: true, explanation: "46 Chromosomen in 23 Paaren: 22 Autosomenpaare (Körperchromosomen, nummeriert 1–22) und 1 Gonosomenpaar (Geschlechtschromosomen: XX bei Frauen, XY bei Männern). Jedes Paar besteht aus einem maternalen und einem paternalen homologen Chromosom." },
      { id: "zk_h5", type: "mc", question: "Wo werden die Untereinheiten der Ribosomen assembliert?", options: [
        { text: "Im Nukleolus (innerhalb des Zellkerns)", correct: true },
        { text: "Im rauen ER", correct: false },
        { text: "Im Golgi-Apparat", correct: false },
        { text: "Im Zytosol frei floating", correct: false }
      ], explanation: "Der Nukleolus ist eine kernplasmische Struktur (ohne Membran), die rDNA-Gene enthält. Hier werden ribosomale RNA (rRNA) transkribiert und mit ribosomalen Proteinen zu 40S- und 60S-Untereinheiten (bei Eukaryoten) vorassembliert, die dann durch Kernporen ins Zytoplasma exportiert werden." },
      { id: "zk_h6", type: "true_false", statement: "Chromatin ist genetisch inaktives Reservematerial im Zellkern ohne Funktion.", answer: false, explanation: "Chromatin ist der funktionelle Zustand der DNA im Kern: Euchromatin ist aufgelockert und transkriptionsaktiv, Heterochromatin ist kondensiert und weitgehend inaktiv. Der Verdichtungsgrad des Chromatins reguliert also, welche Gene aktiv sind – Chromatin ist damit ein zentrales Regulationswerkzeug der Zelle." }
    ],
    bossQuestions: [
      { id: "zk_b1", type: "true_false", statement: "Die Bedeutung des Zellkerns reicht über reine Morphologie hinaus in die funktionelle Zellsteuerung.", answer: true }
    ],
    combatQuestions: [
      { id: "zk_mc1", type: "mc", question: "Welche Aussagen zum Zellkern sind korrekt?", options: [
        { text: "Der Kern enthält 46 Chromosomen in diploiden Körperzellen", correct: true },
        { text: "Euchromatin ist transkriptionsaktiv, Heterochromatin inaktiv", correct: true },
        { text: "Kernporen kontrollieren den Transport zwischen Kern und Zytoplasma", correct: true },
        { text: "Der Nukleolus ist von einer eigenen Membran umschlossen", correct: false }
      ]},
      { id: "zk_mc2", type: "mc", question: "Warum sind Skelettmuskelfasern vielkernig?", options: [
        { text: "Weil sie embryonal durch Fusion vieler Myoblasten entstehen", correct: true },
        { text: "Weil sie sich durch Mitose extrem stark teilen", correct: false },
        { text: "Weil jeder Abschnitt der Faser einen eigenen Kern benötigt wie ein eigener Organismus", correct: false },
        { text: "Weil Skelettmuskelfasern prokaryonte Zellen sind", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "stoffwechsel",
    title: "Physiologie: Stoffwechsel",
    phase1: {
      soil: {
        statement: "Der zelluläre Stoffwechsel umfasst den Umgang mit Proteinen, Kohlenhydraten, Lipiden, Wasser und Enzymen.",
        answer: true,
        solution: "Der zelluläre Stoffwechsel umfasst alle biochemischen Reaktionen, durch die Zellen Nährstoffe aufnehmen, umwandeln und verwerten. Proteine, Kohlenhydrate, Lipide, Wasser und Enzyme sind dabei die zentralen Substrate und Werkzeuge dieser Prozesse."
      },
      seed: {
        statement: "Energieaspekte sind vom zellulären Stoffwechsel getrennt und kein Thema der Zytologie.",
        answer: false,
        solution: "Energie ist eine zentrale Grösse im Zellstoffwechsel: Katabole Prozesse (Abbau) setzen Energie frei, anabole Prozesse (Aufbau) verbrauchen sie. ATP als universelle Energiewährung der Zelle verbindet beide Seiten des Stoffwechsels miteinander."
      },
      water: {
        statement: "Stoffwechselvorgänge sind für Zellfunktion und Anpassungsfähigkeit grundlegend.",
        answer: true,
        solution: "Ohne funktionierende Stoffwechselprozesse können Zellen nicht überleben, wachsen oder auf Veränderungen reagieren. Besonders Proteine, Enzyme und Energie (ATP) sind unabdingbare Voraussetzungen für alle zellularen Aktivitäten."
      }
    },
    harvestQuestions: [
      { id: "sw_h1", type: "mc", question: "In welchem Kompartiment der Zelle findet die Glykolyse statt?", options: [
        { text: "Im Zytosol (Zytoplasma)", correct: true },
        { text: "In der Mitochondrienmatrix", correct: false },
        { text: "Im Zellkern", correct: false },
        { text: "Im rauen ER", correct: false }
      ], explanation: "Die Glykolyse (Abbau von Glukose zu Pyruvat) findet ausschliesslich im Zytosol statt – bei Prokaryoten wie Eukaryoten. Der Zitratzyklus (Pyruvat-Weiterverarbeitung) und die oxidative Phosphorylierung (Atmungskette) sind dagegen auf die Mitochondrien beschränkt." },
      { id: "sw_h2", type: "mc", question: "Wie viele ATP-Moleküle entstehen netto aus einem Glukosemolekül bei der aeroben Glykolyse (Gesamtbilanz)?", options: [
        { text: "Ca. 30–32 ATP (bei vollständiger Oxidation inkl. Atmungskette)", correct: true },
        { text: "2 ATP (nur Glykolyse ohne Atmungskette)", correct: false },
        { text: "38 ATP (veraltete Schätzung ohne Membranverluste)", correct: false },
        { text: "Keines – Glykolyse verbraucht ATP", correct: false }
      ], explanation: "Glykolyse allein ergibt netto 2 ATP. Der Zitratzyklus und die oxidative Phosphorylierung liefern den Rest. Moderne Werte liegen bei ca. 30–32 ATP (frühere 36–38 waren Schätzungen ohne Membranpotentialverluste). Bei anaerober Glykolyse entstehen nur 2 ATP." },
      { id: "sw_h3", type: "true_false", statement: "Essentielle Aminosäuren können vom Körper nicht selbst synthetisiert werden und müssen mit der Nahrung aufgenommen werden.", answer: true, explanation: "Von den 20 proteinogenen Aminosäuren sind beim gesunden Erwachsenen 8 essentiell (Valin, Leucin, Isoleucin, Methionin, Threonin, Phenylalanin, Tryptophan, Lysin) – d.h. der Körper kann sie nicht selbst herstellen. 2 weitere gelten als semi-essentiell in bestimmten Lebensphasen (Arginin, Histidin)." },
      { id: "sw_h4", type: "true_false", statement: "Katabolismus bezeichnet den abbauenden, Anabolismus den aufbauenden Teil des Stoffwechsels.", answer: true, explanation: "Katabolismus umfasst alle abbauenden Reaktionen (Glykolyse, Lipolyse, Proteolyse), bei denen komplexe Moleküle aufgespalten und Energie freigesetzt wird. Anabolismus umfasst aufbauende Reaktionen (Proteinsynthese, Glykogensynthese), die Energie verbrauchen und neue Biomoleküle erzeugen." },
      { id: "sw_h5", type: "mc", question: "Welche Schritte umfasst das 'zentrale Dogma der Molekularbiologie'?", options: [
        { text: "Replikation (DNA→DNA), Transkription (DNA→RNA), Translation (RNA→Protein)", correct: true },
        { text: "Replikation, Osmose, Glykolyse", correct: false },
        { text: "Transkription (RNA→DNA), Translation (Protein→RNA)", correct: false },
        { text: "Nur Translation (DNA direkt zu Protein)", correct: false }
      ], explanation: "Das zentrale Dogma (Crick 1958): Replikation = DNA wird zu DNA verdoppelt; Transkription = DNA wird im Kern zu mRNA umgeschrieben (durch RNA-Polymerase); Translation = mRNA wird am Ribosom zu Protein übersetzt. Reverse Transkription (RNA→DNA) ist möglich durch Retroviren, aber nicht der Standardweg." },
      { id: "sw_h6", type: "true_false", statement: "Beim Zitratzyklus (Krebszyklus) wird Pyruvat direkt weiterverarbeitet, ohne vorherige Umwandlung.", answer: false, explanation: "Pyruvat (aus der Glykolyse) wird zuerst durch den Pyruvat-Dehydrogenase-Komplex zu Acetyl-CoA umgewandelt (oxidative Decarboxylierung, mit CO2-Freisetzung und NADH-Gewinnung). Erst Acetyl-CoA tritt in den Zitratzyklus ein. Diese Umwandlung ist ein eigener regulierter Schritt in der Mitochondrienmatrix." }
    ],
    bossQuestions: [
      { id: "sw_b1", type: "true_false", statement: "Stoffwechselkompetenz ist Grundvoraussetzung für das Verständnis zellulärer Physiologie.", answer: true }
    ],
    combatQuestions: [
      { id: "sw_mc1", type: "mc", question: "Welche Stoffwechselwege laufen in der Mitochondrienmatrix ab?", options: [
        { text: "Zitratzyklus (Krebszyklus)", correct: true },
        { text: "Oxidative Phosphorylierung (in der inneren Membran)", correct: true },
        { text: "Glykolyse", correct: false },
        { text: "Proteinsynthese am Ribosom", correct: false }
      ]},
      { id: "sw_mc2", type: "mc", question: "Welche Aussagen zu essentiellen Aminosäuren sind korrekt?", options: [
        { text: "Sie können vom Körper nicht selbst synthetisiert werden", correct: true },
        { text: "Es gibt 8 essentielle Aminosäuren beim gesunden Erwachsenen", correct: true },
        { text: "Leucin und Tryptophan gehören dazu", correct: true },
        { text: "Alle 20 Aminosäuren sind essentiell", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "mitose",
    title: "Mitose",
    phase1: {
      soil: {
        statement: "Mitose ist die Teilung des Zellkerns mit dem Ziel erbgleicher Verteilung der Gene.",
        answer: true,
        solution: "Bei der Mitose verdoppelt die Zelle zuerst ihre DNA vollständig (Interphase) und verteilt dann die identischen Chromosomensätze gleichmässig auf zwei Tochterzellen. Das Ergebnis sind stets zwei genetisch identische, diploide Tochterzellen."
      },
      seed: {
        statement: "Bei der Mitose entstehen regelhaft vier haploide Tochterzellen.",
        answer: false,
        solution: "Mitose führt zu zwei genetisch identischen Tochterzellen."
      },
      water: {
        statement: "Prophase, Metaphase, Anaphase und Telophase sind Kernphasen der Mitose.",
        answer: true,
        solution: "Prophase (Chromosomenverdichtung), Metaphase (Ausrichtung in der Äquatorialplatte), Anaphase (Trennung der Schwesterchromatiden) und Telophase (Bildung neuer Kerne) sichern durch klare Aufgabenteilung die fehlerfreie Verteilung des Erbguts auf beide Tochterzellen."
      }
    },
    harvestQuestions: [
      { id: "mi_h1", type: "mc", question: "Was geschieht in der Anaphase der Mitose?", options: [
        { text: "Schwesterchromatiden werden durch Spindelfasern zu den gegenüberliegenden Zellpolen gezogen", correct: true },
        { text: "Chromosomen richten sich in der Äquatorialplatte aus", correct: false },
        { text: "Die Kernhülle löst sich auf und Chromosomen kondensieren", correct: false },
        { text: "Neue Zellkerne und Zellmembranen bilden sich", correct: false }
      ], explanation: "Anaphase: Centromere werden durch Kohäsin-Spaltung getrennt, Motorproteine (Kinesin, Dynein) ziehen die Schwesterchromatiden aktiv zu den gegenüberliegenden Polen. Jede Tochterzelle erhält einen vollständigen Chromosomensatz. Metaphase = Ausrichtung in Äquatorialplatte; Prophase = Kondensation + Kernhüllenauflösung; Telophase = neue Kerne." },
      { id: "mi_h2", type: "mc", question: "Was wird in der Interphase (G2-Phase) für die Mitose vorbereitet?", options: [
        { text: "Die replizierte DNA wird auf Fehler geprüft und Zellorganellen werden verdoppelt", correct: true },
        { text: "Die Kernteilung findet statt", correct: false },
        { text: "Chromosomen kondensieren und die Kernhülle löst sich auf", correct: false },
        { text: "Schwesterchromatiden werden zu den Polen gezogen", correct: false }
      ], explanation: "Die Interphase gliedert sich in G1 (Zellwachstum), S-Phase (DNA-Replikation) und G2 (Wachstum, Vorbereitung: Proteine für Spindelapparat werden synthetisiert, DNA-Schäden werden repariert). Die eigentliche Kernteilung (Karyokinese) beginnt erst in der Prophase." },
      { id: "mi_h3", type: "true_false", statement: "Der Spindelapparat der Mitose besteht aus Mikrotubuli, die von Zentrosomen ausgehen.", answer: true, explanation: "Der Spindelapparat (mitotische Spindel) besteht aus Mikrotubuli, die von den zwei Zentrosomen (Zellpolen) ausgehen. Kinetochor-Mikrotubuli verbinden sich mit den Kinetochoren der Chromosomen und ziehen sie in der Anaphase auseinander. Der Spindelapparat ist der molekulare Motor der Chromosomentrennung." },
      { id: "mi_h4", type: "true_false", statement: "Die Zytokinese (Zellteilung) beginnt während der Telophase und trennt das Zytoplasma.", answer: true, explanation: "Zytokinese und Karyokinese (Kernteilung) sind getrennte Prozesse: Die Karyokinese (Prophasn bis Telophase) teilt den Kern, die Zytokinese teilt danach das Zytoplasma. In tierischen Zellen geschieht dies durch einen kontraktilen Ring aus Aktin und Myosin II (Furche); in Pflanzenzellen durch eine Zellplatte." },
      { id: "mi_h5", type: "mc", question: "Was ist der wichtigste Unterschied zwischen Karyokinese und Zytokinese?", options: [
        { text: "Karyokinese = Kernteilung; Zytokinese = Zellteilung (Zytoplasmatrennung)", correct: true },
        { text: "Karyokinese = Zellteilung; Zytokinese = Kernteilung", correct: false },
        { text: "Beide Begriffe bezeichnen dasselbe", correct: false },
        { text: "Karyokinese findet nur bei der Meiose statt", correct: false }
      ], explanation: "Karyokinese (griech. karyon = Kern) bezeichnet die Teilung des Zellkerns durch die Mitosephasen. Zytokinese (griech. kytos = Zelle, kinein = bewegen) bezeichnet die anschliessende Teilung des Zytoplasmas. Beide sind notwendig für die vollständige Zellteilung; in manchen Geweben (z.B. frühem Embryo) kann Karyokinese ohne Zytokinese ablaufen." },
      { id: "mi_h6", type: "true_false", statement: "Nach vollständiger Mitose besitzen beide Tochterzellen denselben diploiden Chromosomensatz wie die Mutterzelle.", answer: true, explanation: "Da die DNA in der Interphase vollständig repliziert und dann durch die Mitosephasen exakt auf beide Tochterkerne verteilt wird, enthalten beide Tochterzellen den vollständigen diploiden Chromosomensatz (2n = 46) der Mutterzelle. Dies sichert genetische Stabilität." }
    ],
    bossQuestions: [
      { id: "mi_b1", type: "true_false", statement: "Bei der Mitose entstehen zwei identische Tochterzellen mit gleichem Erbgut.", answer: true }
    ],
    combatQuestions: [
      { id: "mi_mc1", type: "mc", question: "Welche Ereignisse sind der jeweiligen Mitosephase korrekt zugeordnet?", options: [
        { text: "Prophase: Chromosomenkondensation und Kernhüllenauflösung", correct: true },
        { text: "Metaphase: Ausrichtung der Chromosomen in der Äquatorialplatte", correct: true },
        { text: "Anaphase: Trennung der Schwesterchromatiden zu den Zellpolen", correct: true },
        { text: "Anaphase: Bildung neuer Kernhüllenl", correct: false }
      ]},
      { id: "mi_mc2", type: "mc", question: "Was ist korrekt bezueglich des Spindelapparats?", options: [
        { text: "Er besteht aus Mikrotubuli, die von Zentrosomen ausgehen", correct: true },
        { text: "Er zieht Chromosomen in der Anaphase zu den Zellpolen", correct: true },
        { text: "Er besteht aus Aktinfilamenten", correct: false },
        { text: "Er bildet sich in der Interphase, nicht während der Mitose", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "meiose",
    title: "Meiose",
    phase1: {
      soil: {
        statement: "Die Meiose wird auch Reduktions- oder Reifeteilung genannt.",
        answer: true,
        solution: "Der Begriff Reduktions- oder Reifeteilung beschreibt den Kernvorgang: Aus einer diploiden Ausgangszelle (46 Chromosomen) entstehen vier haploide Keimzellen (je 23 Chromosomen). Diese Halbierung ist zwingend notwendig, damit bei der Befruchtung wieder der normale diploide Chromosomensatz entsteht."
      },
      seed: {
        statement: "Meiose kommt nur bei Geschlechtszellen vor.",
        answer: true,
        solution: "Meiose tritt ausschliesslich in den Keimdrüsengeweben (Hoden, Eierstock) auf, nicht in normalen Körperzellen. Nur bei der Bildung von Spermien und Eizellen ist diese Reduktion des Chromosomensatzes notwendig und möglich."
      },
      water: {
        statement: "Bei der Meiose entstehen aus einer diploiden Zelle vier haploide, nicht erbgleiche Zellen.",
        answer: true,
        solution: "Aus der diploiden Ausgangszelle (2n = 46) entstehen nach Meiose I (Chromosomenzahlreduktion) und Meiose II (Trennung der Schwesterchromatiden) vier haploide Tochterzellen (n = 23). Durch Crossing-over in Prophase I sind diese vier Zellen genetisch untereinander verschieden."
      }
    },
    harvestQuestions: [
      { id: "me_h1", type: "mc", question: "Was ist der zentrale Unterschied zwischen Meiose I und Meiose II?", options: [
        { text: "Meiose I trennt homologe Chromosomen (Reduktion); Meiose II trennt Schwesterchromatiden (wie Mitose)", correct: true },
        { text: "Meiose I und II sind identische Teilungen", correct: false },
        { text: "Meiose I trennt Schwesterchromatiden; Meiose II trennt homologe Chromosomen", correct: false },
        { text: "Nur Meiose I ist eine echte Teilung; Meiose II ist eine Zellverschmelzung", correct: false }
      ], explanation: "Meiose I (Reduktionsteilung): Homologe Chromosomenpaare (Bivalente) werden getrennt → Chromosomenzahl halbiert (2n→n). Meiose II (äquationale Teilung): Schwesterchromatiden werden wie bei der Mitose getrennt. Ergebnis: aus 1 diploiden Zelle entstehen 4 haploide Zellen." },
      { id: "me_h2", type: "mc", question: "Was bezeichnet man als 'Synapsis' in der Prophase I?", options: [
        { text: "Die paarweise Anlagerung homologer Chromosomen (Bivalentbildung) mit Ausbildung des Synaptonemalkomplexes", correct: true },
        { text: "Die Trennung der Schwesterchromatiden", correct: false },
        { text: "Die Auflösung der Kernhülle", correct: false },
        { text: "Die Ausrichtung der Chromosomen in der Äquatorialplatte", correct: false }
      ], explanation: "In der Prophase I der Meiose lagern sich homologe Chromosomenpaare zusammen (Synapsis), verbunden durch den Synaptonemalkomplex. An Chiasmata (Überkreuzungsstellen) findet das Crossing-over statt. Jedes Paar bildet ein Bivalent (Tetrade) aus vier Chromatiden." },
      { id: "me_h3", type: "true_false", statement: "Durch Crossing-over und unabhängige Verteilung in Meiose I können theoretisch 2^23 verschiedene Gametenkombinationen entstehen.", answer: true, explanation: "Jedes der 23 Chromosomenpaare kann in zwei Orientierungen in der Metaphaseplatte aufgestellt werden (Independent Assortment), was 2^23 ≈ 8,4 Millionen Kombinationen erzeugt. Zusätzlich bewirkt Crossing-over genetische Rekombination innerhalb von Chromosomen. Zusammen erklärt das die immense genetische Vielfalt." },
      { id: "me_h4", type: "true_false", statement: "Zwischen Meiose I und Meiose II gibt es keine vollständige DNA-Replikation.", answer: true, explanation: "Die Interkinese zwischen Meiose I und II ist sehr kurz – keine vollständige S-Phase mit DNA-Replikation. Das ist ein wichtiger Unterschied zur Mitose: Bei der Meiose wird DNA nur einmal (vor Meiose I) repliziert, aber zweimal geteilt. Deshalb entstehen haploide Zellen." },
      { id: "me_h5", type: "true_false", statement: "Bei Meiose I bleibt die Chromosomenzahl unverändert erhalten.", answer: false, explanation: "Meiose I ist die Reduktions­teilung: Hier werden die 23 Paare homologer Chromosomen getrennt, sodass jede Tochterzelle nur noch 23 Chromosomen (aber noch je zwei Schwesterchromatiden) erhält – die Chromosomenzahl wird also von 46 auf 23 halbiert." },
      { id: "me_h6", type: "true_false", statement: "Das Crossing-over findet in der Prophase I der Meiose statt.", answer: true, explanation: "In der Prophase I der Meiose lagern sich homologe Chromosomen im Tetrade-Stadium zusammen (Synapsis). An Chiasma genannten Überkreuzungsstellen werden homologe DNA-Segmente ausgetauscht. Dieser Austausch erzeugt Chromosomen mit neuen Allelkombinationen und damit genetische Vielfalt." }
    ],
    bossQuestions: [
      { id: "me_b1", type: "true_false", statement: "Mitose und Meiose unterscheiden sich grundlegend in Ziel, Ergebnis und Zelltypbezug.", answer: true }
    ],
    combatQuestions: [
      { id: "me_mc1", type: "mc", question: "Welche Aussage beschreibt korrekt die Unterschiede der Meiose gegenüber der Mitose?", options: [
        { text: "Meiose: 4 haploide Zellen, Crossing-over in Prophase I, nur in Keimdrüsen, zwei Teilungsrunden", correct: true },
        { text: "Meiose: 2 haploide Zellen, kein Crossing-over, in allen Körperzellen, eine Teilungsrunde", correct: false },
        { text: "Meiose: 4 diploide Zellen, Crossing-over in Prophase II, nur in Keimdrüsen, eine Teilungsrunde", correct: false },
        { text: "Meiose: 2 diploide Zellen, Crossing-over, in allen Körperzellen, zwei Teilungsrunden", correct: false }
      ], explanation: "Meiose unterscheidet sich durch: (1) 4 haploide Tochterzellen statt 2 diploide, (2) Crossing-over in Prophase I als Quelle genetischer Vielfalt, (3) Ablauf nur in Keimdrüsen, (4) zwei aufeinanderfolgende Teilungsrunden (Meiose I und II)." },
      { id: "me_mc2", type: "mc", question: "Was sind die beiden Quellen genetischer Vielfalt bei der Meiose?", options: [
        { text: "Crossing-over (Prophase I) und unabhängige Chromosomensegregation (Metaphase I)", correct: true },
        { text: "DNA-Replikation und Zellkernauflösung", correct: false },
        { text: "Karyokinese und Zytokinese", correct: false },
        { text: "Centrosom-Spaltung und Membranfusion", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "chromosomenabberationen",
    title: "Chromosomenabberationen",
    phase1: {
      soil: {
        statement: "Chromosomenaberrationen entstehen durch Fehler bei der Zellteilung, bei denen Chromosomen nicht korrekt getrennt oder verteilt werden (Non-Disjunction).",
        answer: true,
        solution: "Chromosomenabberationen entstehen durch Fehler bei der Zellteilung, wenn Chromosomen nicht korrekt getrennt oder verteilt werden (Non-Disjunction). Bei numerischen Aberrationen weicht die Gesamtzahl der Chromosomen vom Normalwert 46 ab, z. B. bei Trisomien (47 Chromosomen)."
      },
      seed: {
        statement: "Chromosomenabberationen entstehen ausschliesslich durch Zellmembranfehler.",
        answer: false,
        solution: "Chromosomenaberrationen entstehen nicht durch Membranfehler, sondern durch Fehler bei der Zellteilung: Während der Mitose oder Meiose kann die Verteilung der Chromosomen fehlerhaft verlaufen (Non-disjunction), was zu Fehlanzahlen oder Strukturveränderungen führt."
      },
      water: {
        statement: "Es wird zwischen autosomalen und gonosomalen numerischen Aberrationen unterschieden.",
        answer: true,
        solution: "Autosomale Aberrationen betreffen die Körperchromosomen (1–22), gonosomale die Geschlechtschromosomen (X, Y). Trisomie 21 (Down-Syndrom) ist autosomale Aberration, Turner-Syndrom (45, X0) und Klinefelter-Syndrom (47, XXY) sind gonosomale Aberrationen."
      }
    },
    harvestQuestions: [
      { id: "ca_h1", type: "mc", question: "Welchen Karyotyp hat das Klinefelter-Syndrom?", options: [
        { text: "47, XXY", correct: true },
        { text: "45, X0", correct: false },
        { text: "47, XY+21", correct: false },
        { text: "46, XY", correct: false }
      ], explanation: "Klinefelter-Syndrom: 47, XXY – betroffene Männer haben ein zusätzliches X-Chromosom. Klinisch: Hochwuchs, Gynäkomastie, Hodensatrophie, Infertilität. Turner-Syndrom: 45, X0 (ein X fehlt) – betrifft Frauen. Down-Syndrom: 47, +21 (Trisomie 21)." },
      { id: "ca_h2", type: "mc", question: "Was ist 'Non-Disjunction' und wann tritt sie auf?", options: [
        { text: "Fehlerhafte Chromosomentrennung in der Meiose, sodass beide homologen Chromosomen in eine Tochterzelle wandern", correct: true },
        { text: "Spontane Mutation einzelner Gene ohne Chromosomenzahlveränderung", correct: false },
        { text: "Vollständiger Verlust eines Chromosoms durch Strahlung", correct: false },
        { text: "Fusion zweier Chromosomen (Robertson-Translokation)", correct: false }
      ], explanation: "Non-Disjunction (nicht-Trennung): In Meiose I oder II oder Mitose werden Chromosomen nicht korrekt auf Tochterzellen verteilt. Meiose-I-Fehler: beide homologen Chromosomen wandern in dieselbe Zelle. Meiose-II-Fehler: Schwesterchromatiden wandern zusammen. Ergebnis: Tochterzellen mit zu viel oder zu wenig Chromosomen." },
      { id: "ca_h3", type: "true_false", statement: "Strukturelle Chromosomenaberrationen verändern die Struktur, nicht die Anzahl von Chromosomen.", answer: true, explanation: "Strukturelle Aberrationen entstehen durch Chromosomenbrüche und fehlerhafte Reparatur. Typen: Deletion (Stück fehlt), Duplikation (Stück doppelt), Inversion (Stück umgedreht), Translokation (Stück auf anderem Chromosom). Sie können zu Genunterschreitungen oder -überdosierungen führen." },
      { id: "ca_h4", type: "true_false", statement: "Das Down-Syndrom ist eine autosomale Trisomie des Chromosoms 21.", answer: true, explanation: "Trisomie 21 entsteht durch Non-Disjunction in der Meiose: Ein Elternteil gibt eine Keimzelle mit zwei Chromosomen 21 ab. Das befruchtete Ei hat dann drei Chromosomen 21 (Trisomie) statt zwei, was zu charakteristischen Merkmalen und intellektüllen Einschränkungen führen kann." },
      { id: "ca_h5", type: "true_false", statement: "Das Turner-Syndrom (Karyotyp 45, X0) ist die einzige lebensfähige menschliche Monosomie.", answer: true, explanation: "Monosomien der Autosomen (Verlust eines Autosoms) sind in aller Regel letal und führen zur Fehlgeburt. Monosomie X (Turner, 45, X0) ist die einzige lebensfähige Monosomie, da ein X-Chromosom ausreicht. Klinisch: Kleinwuchs, Gonadendysgenesie, Infertilität, Pterygium colli." },
      { id: "ca_h6", type: "mc", question: "Welche drei Trisomien für Autosomen sind mit dem Leben vereinbar?", options: [
        { text: "Trisomie 21 (Down), Trisomie 18 (Edwards), Trisomie 13 (Patau)", correct: true },
        { text: "Trisomie 1, 2, 3 als häufigstes Vorkommen", correct: false },
        { text: "Trisomie X, Trisomie Y und XXY sind autosomal", correct: false },
        { text: "Alle Trisomien sind mit dem Leben vereinbar", correct: false }
      ], explanation: "Trisomie 21 (Down), 18 (Edwards-Syndrom, schwerste Fehlbildungen, meist Frühtod) und 13 (Patau-Syndrom, schwere Fehlbildungen) sind die einzigen autosomalenTrisomien, die überlebt werden können. Alle anderen autosomalenTrisomien führen zur Fehlgeburt oder Stillgeburt." }
    ],
    bossQuestions: [
      { id: "ca_b1", type: "true_false", statement: "Das Verständnis numerischer Aberrationen setzt sichere Grundlagen in Mitose/Meiose voraus.", answer: true }
    ],
    combatQuestions: [
      { id: "ca_mc1", type: "mc", question: "Welche Karyotypen und Syndrome sind korrekt zugeordnet?", options: [
        { text: "47, XXY – Klinefelter-Syndrom", correct: true },
        { text: "45, X0 – Turner-Syndrom", correct: true },
        { text: "47, +21 – Down-Syndrom", correct: true },
        { text: "47, +18 – Klinefelter-Syndrom", correct: false }
      ]},
      { id: "ca_mc2", type: "mc", question: "Was unterscheidet numerische von strukturellen Chromosomenaberrationen?", options: [
        { text: "Numerisch = Änderung der Chromosomenzahl; strukturell = Änderung der Chromosomenstruktur bei gleicher Zahl", correct: true },
        { text: "Numerisch = nur Gonosomen betroffen; strukturell = nur Autosomen betroffen", correct: false },
        { text: "Beide Begriffe bezeichnen dieselbe Art von Aberration", correct: false },
        { text: "Strukturelle Aberrationen sind nie klinisch relevant", correct: false }
      ]}
    ]
  })
];

const HISTOLOGIE_1032_PLANTS = [
  makeDetailedPlant({
    id: "zellverbindungen",
    title: "Zellverbindungen",
    phase1: {
      soil: { statement: "Adhäsionskontakte, Tight Junctions und Gap Junctions sind drei strukturell und funktionell verschiedene Typen von Zellverbindungen.", answer: true, solution: "Die drei Verbindungstypen haben verschiedene Aufgaben: Adhäsionskontakte (z.B. Desmosomen) geben mechanischen Halt, Tight Junctions dichten den Interzellularraum ab und verhindern parazelluläre Diffusion, Gap Junctions ermöglichen direkten Stoffaustausch zwischen Zellen." },
      seed: { statement: "Alle Zellverbindungen haben dieselbe Funktion und sind histologisch nicht unterscheidbar.", answer: false, solution: "Die drei Verbindungstypen haben klar unterschiedliche Aufgaben: Tight Junctions dichten den Interzellularraum ab, Adhäsionskontakte (Desmosomen) geben mechanischen Halt, Gap Junctions ermöglichen direkten Stoff- und Signalaustausch zwischen Nachbarzellen." },
      water: { statement: "Gap Junctions dienen dem Signal- und Stoffaustausch zwischen Zellen.", answer: true, solution: "Gap Junctions sind Kanalproteine (Connexone), die benachbarte Zellen direkt verbinden und den Austausch kleiner Moleküle (Ionen, cAMP, Metaboliten) ermoglichen. Dadurch können z.B. Herzmuskelzellen elektrische Signale direkt weitergeben und koordiniert schlagen." }
    },
    harvestQuestions: [
      { id: "hi_zv_h1", type: "mc", question: "Welche Proteine bilden die strukturelle Grundlage von Tight Junctions?", options: [
        { text: "Claudine und Occludin", correct: true },
        { text: "Connexin (Connexone)", correct: false },
        { text: "Keratin und Desmoplakin", correct: false },
        { text: "Kollagen Typ IV und Laminin", correct: false }
      ], explanation: "Tight Junctions bestehen aus Transmembranproteinen: Claudine (verschiedene Subtypen regulieren Selektivität) und Occludin sind die Hauptbausteine. Connexine bilden Gap Junctions. Keratin und Desmoplakin gehören zu Desmosomen. Kollagen IV/Laminin sind Basalmembranbestandteile." },
      { id: "hi_zv_h2", type: "mc", question: "Was können Gap Junctions passieren lassen – was können sie NICHT durchlassen?", options: [
        { text: "Durchlassbar: Ionen, cAMP, kleine Moleküle bis ca. 1 kDa; NICHT: Proteine und DNA", correct: true },
        { text: "Durchlassbar: Proteine und DNA; NICHT: Ionen", correct: false },
        { text: "Durchlassbar: nichts – Gap Junctions dichten nur ab", correct: false },
        { text: "Durchlassbar: alle Moleküle ohne Grösspenlimit", correct: false }
      ], explanation: "Gap Junctions (aus Connexonen: je 6 Connexin-Proteine) erlauben den Durchtritt von Molekülen bis ca. 1 kDa: Ionen (Na+, K+, Ca2+), cAMP, IP3, Glukose, Aminosäuren. Proteine (>1 kDa) können nicht passieren. Im Herzmuskel koppeln Gap Junctions die Erregung elektrisch zwischen Kardiomyozyten." },
      { id: "hi_zv_h3", type: "mc", question: "Welches Intermediarfilament verankern Desmosomen in benachbarten Zellen?", options: [
        { text: "Keratin (Zytokeratin)", correct: true },
        { text: "Aktin", correct: false },
        { text: "Vimentin", correct: false },
        { text: "Mikrotubuli", correct: false }
      ], explanation: "Desmosomen (Maculä adhärentes) verbinden Keratin-Intermediarfilamente benachbarter Zellen über Desmoplakin und Desmoglein/Desmocollin. Sie verleihen epithelialen Geweben (Haut, Herzmuskel) Zugfestigkeit. Autoantikörper gegen Desmoglein führen zur Pemphigus vulgaris (blasenbildende Hauterkrankung)." }
    ],
    bossQuestions: [{ id: "hi_zv_b1", type: "true_false", statement: "Die funktionelle Trennung von Haftung, Abdichtung und Kommunikation ist ein Kernpunkt der Histologie.", answer: true }],
    combatQuestions: [
      { id: "hi_zv_mc1", type: "mc", question: "Welche Zellverbindungen und ihre Hauptproteine sind korrekt zugeordnet?", options: [
        { text: "Tight Junction – Claudin und Occludin", correct: true },
        { text: "Gap Junction – Connexin", correct: true },
        { text: "Desmosom – Keratin (verankert durch Desmoplakin)", correct: true },
        { text: "Adhärens-Junction – Connexin", correct: false }
      ]},
      { id: "hi_zv_mc2", type: "mc", question: "Welche Zellverbindung ist an der Blut-Hirn-Schranke für die Abdichtung verantwortlich?", options: [
        { text: "Tight Junctions zwischen Gehirn-Endothelzellen", correct: true },
        { text: "Gap Junctions", correct: false },
        { text: "Desmosomen", correct: false },
        { text: "Adhärens-Junctions", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "epithelgewebe",
    title: "Epithelgewebe",
    phase1: {
      soil: { statement: "Epithelien bedecken äussere und innere Körperoberflächen.", answer: true, solution: "Epithelgewebe bildet den enger Zellverband mit minimalen Interzellularräumen und besitzt keine eigenen Blutgefässe – die Ernährung erfolgt durch Diffusion aus dem darunterliegenden Bindegewebe. Es bedeckt sowohl die Aussenoberfläche (Haut) als auch sämtliche inneren Hohlräume und Organe." },
      seed: { statement: "Epithelgewebe ist ausschliesslich Drüsengewebe.", answer: false, solution: "Epithelgewebe umfasst drei Grundtypen: Deckepithel (Schutz und Barriere, z.B. Haut), Drüsenepithel (Sekretbildung, z.B. Speicheldrüsen) und Sinnesepithel (Reizaufnahme, z.B. Riechepithel). Jeder Typ ist strukturell auf seine Funktion ausgerichtet." },
      water: { statement: "Epithelgewebe dient u. a. Schutz, Stoffaustausch und Reizaufnahme.", answer: true, solution: "Die Funktionsvielfalt des Epithelgewebes erklärt sich aus seinen Untertypen: Plattenepithel schützt mechanisch (Haut), Säulenepithel mit Mikrovilli resorbiert Nährstoffe (Darm), Flimmerepithel transportiert Sekrete (Atemwege), Sinnesepithel nimmt Reize wahr (Riechschleimhaut)." }
    },
    harvestQuestions: [
      { id: "hi_ep_h1", type: "mc", question: "Welche Zellverbindungen halten Epithelzellen zusammen? (eine Antwort)", options: [
        { text: "Tight Junctions, Adhärens-Junctions und Desmosomen", correct: true },
        { text: "Synapsen und Gap Junctions ausschliesslich", correct: false },
        { text: "Kollagenfasern zwischen den Zellen", correct: false },
        { text: "Nur Desmosomen, keine anderen Verbindungen", correct: false }
      ], explanation: "Epithelzellen sind durch drei Haupttypen von Zellverbindungen verbunden: Tight Junctions (dichten parazellulären Weg ab), Adhärens-Junctions (mechanische Kopplung) und Desmosomen (Zugkräfte). Zusammen bilden sie den festen Zellverband." },
      { id: "hi_ep_h2", type: "true_false", statement: "Die Basalmembran enthält hauptsächlich Kollagen Typ IV und Laminin.", answer: true, explanation: "Die Basalmembran besteht vor allem aus Kollagen Typ IV (Netzwerk) und Laminin (Verankerung der Epithelzellen). Dazu kommen Perlecan (Heparansulfat-Proteoglykan) und Nidogen. Kollagen Typ I findet sich dagegen im Bindegewebe, nicht in der Basalmembran." },
      { id: "hi_ep_h3", type: "true_false", statement: "Epithelgewebe ernährt sich durch Diffusion aus dem darunterliegenden Bindegewebe, da es keine eigenen Blutgefässe besitzt.", answer: true, explanation: "Epithelien sind avaskular – keine eigenen Blutgefässe. Säuerstoff und Nährstoffe diffundieren aus den Kapillaren des subepithelial gelegenen Bindegewebes durch die Basalmembran. Die maximale Epitheldicke wird dadurch durch die Diffusionsstrecke begrenzt (mehrschichtige Epithelien können trotzdem dick sein, da die Basalzellen nah an den Kapillaren liegen)." }
    ],
    bossQuestions: [{ id: "hi_ep_b1", type: "true_false", statement: "Tight Junctions verhindern den parazellulären Durchtritt von Ionen und kleinen Molekülen.", answer: true }],
    combatQuestions: [
      { id: "hi_ep_mc1", type: "mc", question: "Welche Antwort benennt korrekt die drei Grundtypen von Epithelgewebe?", options: [
        { text: "Deckepithel, Drüsenepithel und Sinnesepithel", correct: true },
        { text: "Deckepithel, Stützepithel und Drüsenepithel", correct: false },
        { text: "Sinnesepithel, Stützepithel und Bindegewebe", correct: false },
        { text: "Drüsenepithel, Muskelepithel und Sinnesepithel", correct: false }
      ], explanation: "Die drei Grundtypen des Epithelgewebes sind: Deckepithel (Oberflächenschutz und -auskleidung), Drüsenepithel (Sekretion) und Sinnesepithel (Reizaufnahme). Stützepithel ist kein anerkannter eigener Epitheltyp." },
      { id: "hi_ep_mc2", type: "mc", question: "Welche Aussage zur Ernährung von Epithelgewebe ist korrekt?", options: [
        { text: "Diffusion aus dem subepithelial gelegenen Bindegewebe durch die Basalmembran", correct: true },
        { text: "Eigene Kapillaren innerhalb des Epithelverbands", correct: false },
        { text: "Resorption direkt aus dem Organlumen", correct: false },
        { text: "Ernährung erfolgt ausschliesslich über Lymphgefässe", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "oberflächenepithel",
    title: "Oberflächen-/Deckepithel",
    phase1: {
      soil: { statement: "Deckepithel kleidet Körperoberflächen und viele Hohlräume aus.", answer: true, solution: "Deckepithel (Oberflächenepithel) dient dem Schutz und der Abgrenzung: Es bedeckt die Körperoberfläche (Haut), kleidet innere Hohlorgane aus (Darm, Harnblase) und überzieht Blut- und Lymphgefässe als Endothel. Damit ist es das am weitesten verbreitete Epithelgewebe." },
      seed: { statement: "Deckepithel ist für Resorption und Sekretion grundsätzlich ungeeignet.", answer: false, solution: "Deckepithel ist je nach Typ hochspezialisiert: Einschichtiges Säulenepithel mit Mikrovilli resorbiert Nährstoffe im Darm, mehrschichtiges Plattenepithel schützt mechanisch (Haut), Flimmerepithel der Atemwege transportiert Schleim aktiv nach aussen." },
      water: { statement: "Die Unterteilung in einschichtig, mehrreihig und mehrschichtig ist ein Grundschema.", answer: true, solution: "Einschichtige Epithelien (alle Zellen berühren die Basalmembran) kommen z.B. als Endothel in Gefässen vor, mehrreihige (alle an Basalmembran, aber verschieden hoch) als Flimmerepithel in den Atemwegen, mehrschichtige (nur die unterste Lage an der Basalmembran) als Schutzepithel der Haut und Schleimhäute." }
    },
    harvestQuestions: [
      { id: "hi_od_h1", type: "mc", question: "Welcher Epitheltyp kleidet Blut- und Lymphgefässe aus?", options: [
        { text: "Einschichtiges Plattenepithel (Endothel)", correct: true },
        { text: "Mehrschichtiges verhorntes Plattenepithel", correct: false },
        { text: "Mehrreihiges Flimmerepithel", correct: false },
        { text: "Übergangsepithel (Urothel)", correct: false }
      ], explanation: "Die Gefässinnenwand (Endothel) besteht aus einschichtigem Plattenepithel – dünn genug für Diffusion, glatt genug für laminäre Strömung. Einschichtig bedeutet: eine Zelllage, alle Zellen an der Basalmembran." },
      { id: "hi_od_h2", type: "true_false", statement: "Das Übergangsepithel (Urothel) der Harnblase kann seine Schichtdicke je nach Füllungszustand verändern.", answer: true, explanation: "Urothel ist eine Sonderform: Bei leerer Harnblase erscheint es mehrschichtig (5-6 Lagen), bei voller Blase dehnt es sich und wirkt fast einschichtig. Die charakteristischen Deckzellen (Umbrella-Zellen) erlauben diese Verformbarkeit. Dies erklärt den Namen Übergangsepithel." },
      { id: "hi_od_h3", type: "true_false", statement: "Mehrreihiges Epithel ist dasselbe wie mehrschichtiges Epithel.", answer: false, explanation: "Beim mehrreihigen Epithel berühren ALLE Zellen die Basalmembran – nur die Kerne liegen auf unterschiedlichen Höhen, was mehrschichtig wirkt (Pseudostratifizierung). Beim mehrschichtigen Epithel berührt nur die unterste Lage (Stratum basale) die Basalmembran. Klassisches mehrreihiges Beispiel: Flimmerepithel der Atemwege." }
    ],
    bossQuestions: [{ id: "hi_od_b1", type: "mc", question: "Welche Zuordnung von Epithelform zu ihrem Vorkommen ist FALSCH?", options: [
      { text: "Endothel = einschichtiges Plattenepithel", correct: false },
      { text: "Atemwegsepithel = mehrreihiges Flimmerepithel", correct: false },
      { text: "Harnblasenepithel = Übergangsepithel (Urothel)", correct: false },
      { text: "Hautepidermis = einschichtiges Säulenepithel", correct: true }
    ], explanation: "Die falsche Zuordnung ist D: Die Hautepidermis besteht aus mehrschichtigem verhorntem Plattenepithel – nicht aus einschichtigem Säulenepithel. Die anderen Zuordnungen stimmen: Endothel = einschichtiges Plattenepithel (Diffusion), Atemwegsepithel = mehrreihiges Flimmerepithel (Schutzfunktion), Harnblase = Übergangsepithel (dehnbar)." }
    ],
    combatQuestions: [
      { id: "hi_od_mc1", type: "mc", question: "Welche Aussagen zum mehrreihigen Epithel sind korrekt?", options: [
        { text: "Alle Zellen berühren die Basalmembran", correct: true },
        { text: "Kerne liegen auf verschiedenen Höhen (Pseudostratifizierung)", correct: true },
        { text: "Nur die unterste Zellreihe berührt die Basalmembran", correct: false },
        { text: "Es kommt typischerweise in der Harnblase vor", correct: false }
      ]},
      { id: "hi_od_mc2", type: "mc", question: "Welcher Epitheltyp ist für mechanische Belastung (z.B. Haut, Mundhöhleschleimhaut) am besten geeignet?", options: [
        { text: "Mehrschichtiges Plattenepithel", correct: true },
        { text: "Einschichtiges Plattenepithel", correct: false },
        { text: "Mehrreihiges Flimmerepithel", correct: false },
        { text: "Einschichtiges Würfelepithel", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "drüsenepithel",
    title: "Drüsenepithel",
    phase1: {
      soil: { statement: "Drüsenepithel ist auf Sekretbildung spezialisiert.", answer: true, solution: "Drüsenepithel-Zellen sind darauf ausgerichtet, aktiv Sekrete herzustellen und abzugeben. Je nach Drüse sind das Verdauungsenzyme (Bauchspeicheldrüse), Hormone (Schilddrüse) oder Schleim (Schleimhautdrüsen). Die Sekretionsleistung unterscheidet Drüsenepithel klar von schutzendem Deckepithel." },
      seed: { statement: "Exokrine Drüsen werden nicht nach Sekret und Abgabeart klassifiziert.", answer: false, solution: "Exokrine Drüsen werden systematisch eingeteilt: nach Art des Sekrets (seröse oder müköse Zellen) und nach der Abgabemethode (merokrin: Vesikelexozytose; apokrin: Abschnürung des Zellapex; holokrin: Zerfall der gesamten Zelle). Diese Einteilung erklärt die unterschiedlichen Sekretionsleistungen im Körper." },
      water: { statement: "Drüsenepithel besitzt eine hohe Regenerationsfähigkeit und kann sich bei Bedarf erneuern.", answer: true, solution: "Drüsenepithel besitzt eine hohe Regenerationsfähigkeit, da Drüsen bei Verletzung oder Erkrankung rasch wiederhergestellt werden müssen. Teilungsaktive Stammzellen und Basalzellen im Drüsenepithel ermöglichen diese kontinuierliche Erneuerung." }
    },
    harvestQuestions: [
      { id: "hi_dr_h1", type: "mc", question: "Welche Sekretionsart nutzt Vesikelexozytose ohne Verlust von Zellmaterial?", options: [
        { text: "Merokrine (ekkrine) Sekretion", correct: true },
        { text: "Apokrine Sekretion", correct: false },
        { text: "Holokrine Sekretion", correct: false },
        { text: "Endokrine Sekretion", correct: false }
      ], explanation: "Merokrin (ekkrin) = Vesikel verschmelzen mit der Zellmembran, Sekret wird ausgeschüttet, Zelle bleibt intakt. Beispiel: Bauchspeicheldrüse, Schweissdrüsen. Apokrin: Abschnürung des Zellapex (z.B. Milchdrüse). Holokrin: gesamte Zelle wird zum Sekret (z.B. Talgdrüse)." },
      { id: "hi_dr_h2", type: "true_false", statement: "Die Talgdrüse ist ein Beispiel für holokrine Sekretion.", answer: true, explanation: "Bei der holokrinen Sekretion wird die gesamte Drüsenzelle zum Sekret: Die Zelle füllt sich mit Lipiden, stirbt ab und wird komplett abgegeben (Talg). Die Regeneration erfolgt durch Proliferation von Basalzellen. Dies steht im Gegensatz zur merokrine Sekretion (Vesikelexozytose, Zelle intakt) und apokrinen Sekretion (nur Zellapex abgetrennt)." },
      { id: "hi_dr_h3", type: "mc", question: "Welche Aussage zur Sekretion der Milchdrüse ist korrekt?", options: [
        { text: "Ausschliesslich merokrine Sekretion", correct: false },
        { text: "Ausschliesslich apokrine Sekretion", correct: false },
        { text: "Kombination: apokrin für den Fettanteil, merokrin für den Proteinanteil", correct: true },
        { text: "Holokrine Sekretion wie die Talgdrüse", correct: false }
      ], explanation: "Die Milchdrüse verwendet beide Sekretionswege: Fette werden apokrin abgegeben (Abschnürung lipidgefüllter Zellvorsprünge), Proteine (Kasein, Lactalbumin) merokrin via Vesikelexozytose. Holokrin (gesamte Zelle = Sekret) nutzt die Milchdrüse nicht." }
    ],
    bossQuestions: [{ id: "hi_dr_b1", type: "mc", question: "Welche Zuordnung von Drüse und Sekretionsmodus ist FALSCH?", options: [
      { text: "Talgdrüse – holokrin", correct: false },
      { text: "Bauchspeicheldrüse (exokrin) – merokrin", correct: false },
      { text: "Milchdrüse – apokrin (Fett) und merokrin (Protein)", correct: false },
      { text: "Schweissdrüse – holokrin", correct: true }
    ], explanation: "Die falsche Zuordnung ist D: Schweissdrüsen sekretieren merokrin (Vesikelexozytose, Zelle bleibt intakt) – nicht holokrin. Holokrin ist die Talgdrüse (gesamte Zelle wird zum Sekret). Alle anderen Zuordnungen sind korrekt." }
    ],
    combatQuestions: [
      { id: "hi_dr_mc1", type: "mc", question: "Welche Aussagen zum Unterschied exokrin vs. endokrin sind korrekt?", options: [
        { text: "Exokrine Drüsen besitzen Ausführungsgänge", correct: true },
        { text: "Endokrine Drüsen geben Hormone direkt ins Blut ab", correct: true },
        { text: "Exokrine Drüsen geben Sekret direkt ins Blut ab", correct: false },
        { text: "Endokrine Drüsen haben immer Ausführungsgänge", correct: false }
      ]},
      { id: "hi_dr_mc2", type: "mc", question: "Welche Sekretionsart bezeichnet das vollständige Abtrennen des apikalen Zellpols mit Sekretinhalt?", options: [
        { text: "Apokrine Sekretion", correct: true },
        { text: "Holokrine Sekretion", correct: false },
        { text: "Merokrine (ekkrine) Sekretion", correct: false },
        { text: "Endokrine Sekretion", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "sinnesepithel_myoepithel",
    title: "Sinnesepithel und Myoepithel",
    phase1: {
      soil: { statement: "Sinnesepithel dient der Reizaufnahme.", answer: true, solution: "Sinnesepithel enthält spezialisierte Sinneszellen, die Reize aus der Umwelt in elektrische Signale umwandeln, die dann an Nervenzellen weitergeleitet werden. Beispiele: Riechepithel in der Nasenhöhle (chemische Reize), Haarzellen im Innenohr (Schall- und Gleichgewichtsreize), Photorezeptoren in der Retina (Lichtreize)." },
      seed: { statement: "Myoepithelzellen haben keine funktionelle Nähe zur glatten Muskulatur.", answer: false, solution: "Diese Aussage ist falsch. Myoepithelzellen besitzen kontraktile Aktinfilamente und können sich ähnlich wie glatte Muskelzellen zusammenziehen. Sie umschliessen Drüsenazini (z.B. in Schweiss-, Speichel- und Milchdrüsen) und pressen bei Kontraktion das Sekret aktiv aus – daher ihr Name: myoepithelial = muskelähnliche Epithelzellen." },
      water: { statement: "Myoepithelzellen können die Sekretabgabe durch kontraktile Eigenschaften unterstützen.", answer: true, solution: "Myoepithelzellen umschliessen Drüsenazini und können sich durch ihre Aktinfilamente ähnlich wie glatte Muskelzellen zusammenziehen. Durch diese Kontraktion wird das Drüsensekret aktiv ausgepresst – z.B. in Schweiss- und Milchdrüsen bei der Laktation." }
    },
    harvestQuestions: [
      { id: "hi_sm_h1", type: "mc", question: "In welchen Drüsen kommen Myoepithelzellen typischerweise vor?", options: [
        { text: "Schweissdrüsen, Speicheldrüsen und Milchdrüse", correct: true },
        { text: "Ausschliesslich in der Schilddrüse", correct: false },
        { text: "In der Bauchspeicheldrüse (endokriner Teil)", correct: false },
        { text: "Nur in Lymphknoten", correct: false }
      ], explanation: "Myoepithelzellen kommen in Drüsen vor, wo aktives Auspressen des Sekrets nötig ist: Schweiss- und Speicheldrüsen, Milchdrüse (Laktation). Sie umschliessen die Azini wie ein Korb und pressen bei Kontraktion (durch Aktinfilamente) das Sekret in die Ausführungsgänge." },
      { id: "hi_sm_h2", type: "mc", question: "Welches ist KEIN Beispiel für Sinnesepithel?", options: [
        { text: "Haarzellen im Innenohr", correct: false },
        { text: "Photorezeptoren in der Retina", correct: false },
        { text: "Riechzellen der Nasenschleimhaut", correct: false },
        { text: "Endothelzellen der Blutkapillaren", correct: true }
      ], explanation: "Endothelzellen der Blutkapillaren sind einschichtiges Plattenepithel ohne Sinneszellenfunktion – kein Sinnesepithel. Sinnesepithel wandelt spezifische Reize in elektrische Signale um: Haarzellen im Innenohr (Schall/Gleichgewicht), Photorezeptoren der Retina (Licht), Riechzellen (chemische Reize)." },
      { id: "hi_sm_h3", type: "true_false", statement: "Myoepithelzellen haben epithelialen Ursprung, besitzen aber kontraktile Filamente wie glatte Muskelzellen.", answer: true, explanation: "Myoepithelzellen stammen entwicklungsgeschichtlich aus dem Ekto- oder Entoderm (Epithelgewebe), haben aber kontraktile Aktinfilamente erworben. Sie verbinden zwei Gewebeeigenschaften: Lage im Epithelverband + Kontraktionsfähigkeit. Das macht sie zu einer Hybridform – klassisches Prüfungsthema." }
    ],
    bossQuestions: [{ id: "hi_sm_b1", type: "mc", question: "Welche Aussage zu Myoepithelzellen ist korrekt?", options: [
      { text: "Sie besitzen kontraktile Aktinfilamente und unterstützen durch Kontraktion die Sekretabgabe in Drüsen", correct: true },
      { text: "Sie bilden die Basalmembran", correct: false },
      { text: "Sie nehmen Umweltreize wahr wie Sinneszellen", correct: false },
      { text: "Sie sind kernlos und können sich nicht erneuern", correct: false }
    ], explanation: "Myoepithelzellen besitzen kontraktile Aktinfilamente (wie glatte Muskelzellen) und umschliessen Drüsenazini. Bei Kontraktion pressen sie das Sekret aktiv aus. Sie bilden NICHT die Basalmembran und sind KEINE Sinneszellen." }
    ],
    combatQuestions: [
      { id: "hi_sm_mc1", type: "mc", question: "Was unterscheidet Myoepithelzellen von anderen Epithelzellen?", options: [
        { text: "Sie besitzen kontraktile Aktinfilamente und können sich zusammenziehen", correct: true },
        { text: "Sie sind die einzigen Epithelzellen mit Basalmembrananbindung", correct: false },
        { text: "Sie sezernieren Hormone direkt ins Blut", correct: false },
        { text: "Sie sind kernlos wie Erythrozyten", correct: false }
      ]},
      { id: "hi_sm_mc2", type: "mc", question: "Welche Sinnesepithelien und ihre Reizqualitäten sind korrekt zugeordnet?", options: [
        { text: "Haarzellen Innenohr – Schall- und Gleichgewichtsreize", correct: true },
        { text: "Riechepithel Nasenschleimhaut – chemische Reize", correct: true },
        { text: "Photorezeptoren Retina – Lichtreize", correct: true },
        { text: "Makulazellen der Haut – Temperaturreize (korrekte Bezeichnung)", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "bindegewebe",
    title: "Bindegewebe",
    phase1: {
      soil: { statement: "Bindegewebe ist das häufigste Gewebe und zeichnet sich durch viel Interzellularsubstanz aus.", answer: true, solution: "Im Gegensatz zu Epithel (enger Zellverband, wenig Matrix) besteht Bindegewebe aus relativ wenigen Zellen in viel Interzellularsubstanz (Matrix). Diese Matrix aus Kollagenfasern, elastischen Fasern und Grundsubstanz bestimmt die mechanischen Eigenschaften des jeweiligen Bindegewebetyps." },
      seed: { statement: "Bindegewebe besteht ausschliesslich aus Zellen und praktisch keiner Grundsubstanz.", answer: false, solution: "Bindegewebe zeichnet sich durch viel extrazelluläre Matrix (Grundsubstanz und Fasern) und vergleichsweise wenige Zellen aus – das Gegenteil von Epithelgewebe, wo Zellen dicht gepackt sind. Die Matrix-Dominanz erklärt die mechanischen Eigenschaften wie Zugfestigkeit und Formgebung." },
      water: { statement: "Es wird zwischen ortsständigen und freien Bindegewebszellen unterschieden.", answer: true, solution: "Ortsständige Bindegewebszellen wie Fibroblasten leben dauerhaft in der Matrix und produzieren z.B. Kollagen. Freie Zellen wie Mastzellen, Makrophagen und Granulozyten wandern ein und ausüben hauptsächlich Immunfunktionen, bevor sie weiterwandern oder absterben." }
    },
    harvestQuestions: [
      { id: "hi_bg_h1", type: "mc", question: "Welcher Fasertyp kommt NICHT in der Bindegewebsmatrix vor?", options: [
        { text: "Kollagenfasern (Zugfestigkeit)", correct: false },
        { text: "Elastische Fasern (Rückstellkraft)", correct: false },
        { text: "Retikuläre Fasern (Kollagen Typ III, feines Netzwerk)", correct: false },
        { text: "Myofibrillen (Aktin/Myosin)", correct: true }
      ], explanation: "Myofibrillen (Aktin/Myosin) sind kontraktile Strukturen des Muskelgewebes – sie kommen NICHT in der Bindegewebsmatrix vor. Die ECM des Bindegewebes enthält: Kollagenfasern (Zugfestigkeit), elastische Fasern (Rückstellkraft in Lunge, Gefässen) und retikuläre Fasern (Kollagen Typ III, feines Netzwerk in Lymphknoten, Leber)." },
      { id: "hi_bg_h2", type: "mc", question: "Welche Hauptfunktion haben Fibroblasten?", options: [
        { text: "Synthese von Kollagen und anderen extrazellulären Matrixkomponenten", correct: true },
        { text: "Phagozytose von Bakterien und Zelltrümmern", correct: false },
        { text: "Produktion von Histamin bei allergischen Reaktionen", correct: false },
        { text: "Antikörperproduktion", correct: false }
      ], explanation: "Fibroblasten sind die ortsständigen Hauptzellen des Bindegewebes. Sie synthetisieren Kollagen, Elastin und Proteoglykane (Matrixkomponenten) und halten so die Bindegewebsstruktur aufrecht. Bei Verletzungen werden sie zu Fibroblasten stimuliert und bilden Narbengewebe. Makrophagen phagozytieren, Mastzellen produzieren Histamin, Plasmazellen produzieren Antikörper." },
      { id: "hi_bg_h3", type: "true_false", statement: "Straffes geflechtartiges Bindegewebe unterscheidet sich von straffem parallelfaserigem Bindegewebe durch die Faseranordnung.", answer: true, explanation: "Straffes parallelfaseriges Bindegewebe (Sehnen, Bänder) hat Kollagenfasern in einer Hauptzugrichtung angeordnet – ideal für uniaxiale Zugkräfte. Straffes geflechtartiges Bindegewebe (Lederhaut der Haut, Periost) hat Fasern in mehrere Richtungen geflochten – widersteht Zug aus allen Richtungen." }
    ],
    bossQuestions: [{ id: "hi_bg_b1", type: "true_false", statement: "Die Matrix-Zell-Relation ist für das Verständnis von Bindegewebe grundlegend.", answer: true }],
    combatQuestions: [
      { id: "hi_bg_mc1", type: "mc", question: "Welche Kollagentypen sind den genannten Strukturen korrekt zugeordnet?", options: [
        { text: "Kollagen Typ I – Sehnen, Knochen (Zugfestigkeit)", correct: true },
        { text: "Kollagen Typ II – hyaliner Knorpel", correct: true },
        { text: "Kollagen Typ IV – Basalmembran", correct: true },
        { text: "Kollagen Typ I – Basalmembran", correct: false }
      ]},
      { id: "hi_bg_mc2", type: "mc", question: "Was sind ortsständige (sessile) Bindegewebszellen (mehrere können korrekt sein)?", options: [
        { text: "Fibroblast (Matrixsynthese)", correct: true },
        { text: "Mastzelll (Histamin, Allergie)", correct: true },
        { text: "Neutrophiler Granulozyt (wandert ein, kurzlebig)", correct: false },
        { text: "Thrombozyt (Blutgerinnung)", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "knorpelgewebe",
    title: "Knorpelgewebe",
    phase1: {
      soil: { statement: "Knorpelgewebe wird in drei histologisch unterscheidbare Typen eingeteilt: hyaliner Knorpel (Gelenkflächen), elastischer Knorpel (Ohrmuschel) und Faserknorpel (Bandscheiben) – jeder mit charakteristischer Struktur und Funktion.", answer: true, solution: "Die drei Knorpeltypen unterscheiden sich in ihrer Zusammensetzung und ihren Eigenschaften: Hyaliner Knorpel (bläulich-weiss, glättste Gelenkflächen), elastischer Knorpel (gelblich, biegsam durch Elastinfasern z.B. Ohrmuschel) und Faserknorpel (grösste Zugfestigkeit durch dicke Kollagenfasern z.B. Bandscheiben)." },
      seed: { statement: "Knorpelgewebe wird histologisch nicht weiter unterteilt.", answer: false, solution: "Knorpelgewebe wird in drei klar unterscheidbare Typen eingeteilt, die sich histologisch in Fasergehalt, Matrixzusammensetzung und Farbgebung unterscheiden. Diese Unterschiede erklären die verschiedenen Lokalisationen und mechanischen Eigenschaften der Knorpeltypen im Körper." },
      water: { statement: "Die Knorpeltypen unterscheiden sich funktionell und strukturell.", answer: true, solution: "Hyaliner Knorpel mit seiner glatten Oberfläche ist ideal für druckbelastete Gelenkflächen, elastischer Knorpel für Strukturen die biegsam sein müssen (Ohrmuschel, Epiglottis), und Faserknorpel für hohe Zugbelastung (Bandscheiben, Menisken). Form folgt Funktion." }
    },
    harvestQuestions: [
      { id: "hi_kg_h1", type: "mc", question: "Welcher Kollagentyp ist der Hauptbestandteil von hyalinem Knorpel?", options: [
        { text: "Kollagen Typ II", correct: true },
        { text: "Kollagen Typ I", correct: false },
        { text: "Kollagen Typ III", correct: false },
        { text: "Kollagen Typ IV", correct: false }
      ], explanation: "Hyaliner Knorpel enthält primär Kollagen Typ II in einer gelartigen, glykosaminoglykanreichen Grundsubstanz (Aggrekan, Hyaluronsäure). Kollagen Typ I findet sich in Faserknorpel, Knochen und Sehnen. Kollagen Typ IV ist in der Basalmembran." },
      { id: "hi_kg_h2", type: "mc", question: "Wo im Körper findet man Faserknorpel?", options: [
        { text: "Bandscheiben (Nucleus pulposus + Anulus fibrosus), Menisken und Symphysis pubica", correct: true },
        { text: "Ohrmuschel und Epiglottis", correct: false },
        { text: "Gelenkflächen grosser Gelenke (Knie, Hufte)", correct: false },
        { text: "Rippenknorpel und Nasenrücken", correct: false }
      ], explanation: "Faserknorpel (viele dicke Kollagen-Typ-I-Bündel, wenig Grundsubstanz) kommt an Stellen vor, die hohe Druckbelastung und Zugkräfte aushalten müssen: Bandscheiben, Menisken, Symphysis pubica, Insertionstellen von Sehnen. Ohrmuschel und Epiglottis: elastischer Knorpel. Gelenkflächen: hyaliner Knorpel." },
      { id: "hi_kg_h3", type: "true_false", statement: "Knorpelgewebe ist avaskular – die Ernährung der Chondrozyten erfolgt durch Diffusion.", answer: true, explanation: "Knorpelgewebe besitzt keine Blutgefässe (avaskular). Chondrozyten erhalten Nährstoffe und Sauerstoff durch Diffusion aus dem Perichondrium oder (bei Gelenkknorpel) aus der Synovialflüssigkeit. Diese avaskuläre Natur erklärt, warum Knorpeldefekte sehr schlecht heilen." }
    ],
    bossQuestions: [{ id: "hi_kg_b1", type: "true_false", statement: "Die sichere Unterscheidung der Knorpeltypen gehört zum Histologie-Grundwissen.", answer: true }],
    combatQuestions: [
      { id: "hi_kg_mc1", type: "mc", question: "Welche Knorpeltypen sind den genannten Lokalisationen korrekt zugeordnet?", options: [
        { text: "Hyaliner Knorpel – Gelenkflächen, Rippenknorpel, Wachstumsplatte", correct: true },
        { text: "Elastischer Knorpel – Ohrmuschel, Epiglottis", correct: true },
        { text: "Faserknorpel – Bandscheiben, Menisken, Symphysis pubica", correct: true },
        { text: "Faserknorpel – Gelenkflächen grosser Gelenke", correct: false }
      ]},
      { id: "hi_kg_mc2", type: "mc", question: "Warum heilen Knorpelschäden schlecht?", options: [
        { text: "Weil Knorpelgewebe avaskular ist und Chondrozyten nur eingeschränkt proliferieren", correct: true },
        { text: "Weil Knorpelgewebe reichlich Blutgefässe hat, die die Regeneration stören", correct: false },
        { text: "Weil Chondrozyten keine Kollagensynthese betreiben können", correct: false },
        { text: "Weil Knorpelgewebe aus Prokaryoten besteht", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "knochengewebe",
    title: "Knochengewebe",
    phase1: {
      soil: { statement: "Knochengewebe wird histologisch als spezialisiertes Binde- und Stützgewebe eingeordnet.", answer: true, solution: "Knochengewebe ist ein spezialisiertes hartes Bindegewebe, das sich durch seine mineralisierte Matrix aus Kollagenfasern und Hydroxylapatit von anderen Bindegeweben unterscheidet. Trotz seiner Härte ist es lebendiges Gewebe mit aktiven Zellen: Osteoblasten (Aufbau), Osteozyten (Erhalt) und Osteoklasten (Abbau)." },
      seed: { statement: "Knochenzellen spielen für Aufbau und Erhalt des Knochengewebes keine Rolle.", answer: false, solution: "Knochenzellen sind der Kern des Knochenlebens: Osteoblasten produzieren neue Knochenmatrix (Kollagen + Mineralisation), Osteozyten erhalten als eingemauerte Zellen das Gewebe durch Nährstoffaustausch über Kanälchen, Osteoklasten bauen auf Signal hin gealterte Matrix gezielt ab." },
      water: { statement: "Bei der desmalen Ossifikation entsteht Knochen direkt aus mesenchymalem Bindegewebe, ohne Knorpelvorläuferstufe.", answer: true, solution: "Osteogenese kann direkt aus Bindegewebe verlaufen (desmale Ossifikation, z.B. Schädelknochen) oder über eine Knorpelvorläuferstufe (enchondrale Ossifikation, z.B. lange Röhrenknochen). Beide Wege enden mit der Mineralisation der Knochenmatrix durch Osteoblasten." }
    },
    harvestQuestions: [
      { id: "hi_kn_h1", type: "mc", question: "Wie unterscheiden sich Osteoblasten von Osteozyten?", options: [
        { text: "Osteoblasten sind aktiv knochenbildende Zellen; Osteozyten sind eingemauerte ehemalige Osteoblasten im reifen Knochen", correct: true },
        { text: "Osteoblasten bauen Knochen ab; Osteozyten bauen ihn auf", correct: false },
        { text: "Osteozyten haben keine Verbindung zu Nachbarzellen", correct: false },
        { text: "Beide Zelltypen sind identisch", correct: false }
      ], explanation: "Osteoblasten (auf der Knochenoberfläche) synthetisieren Kollagen Typ I und Osteoid, das dann mineralisiert wird. Wenn sie von Knochenmatrix eingemauert werden, differenzieren sie zu Osteozyten – ruhenden Erhaltungszellen. Osteozyten kommunizieren über Kanälchen (Canaliculi) mit Gap Junctions untereinander." },
      { id: "hi_kn_h2", type: "mc", question: "Durch welchen Mechanismus bauen Osteoklasten Knochen ab?", options: [
        { text: "Sie sezernieren Salzsäure (HCl) und lysosomale Enzyme, die die Knochenmatrix lösen", correct: true },
        { text: "Sie absorbieren Knochenmatrix durch Phagozytose der gesamten Matrix", correct: false },
        { text: "Sie produzieren Kollagen Typ I für den Abbau", correct: false },
        { text: "Sie stimulieren Chondrozyten zur Knorpeldegeneration", correct: false }
      ], explanation: "Osteoklasten sind mehrkernige Riesenzellen (aus Monozyten-Vorläufern). Sie bilden auf der Knochenoberfläche eine versiegelte 'Resorptionszone' (Howship-Lakunen) und sezernieren dort Protonen (HCl, pH ~4) durch die Ruffled Border und lysosomale Proteasen (Cathepsin K), die Hydroxylapatit und Kollagen abbauen." },
      { id: "hi_kn_h3", type: "true_false", statement: "Lamellenknochen hat im Osteon konzentrisch um den Havers-Kanal angeordnete Lamellen aus mineralisierten Kollagenfasern.", answer: true, explanation: "Lamellenknochen (reifer Knochen) ist strukturell aus Osteonen (Havers-Systemen) aufgebaut: konzentrische Lamellen aus Kollagen Typ I mit Hydroxylapatit umringen einen zentralen Havers-Kanal (mit Blutgefässen und Nerven). Diese Struktur verleiht maximale Stabilität bei geringem Gewicht – eine geniale biomechanische Lösung." }
    ],
    bossQuestions: [{ id: "hi_kn_b1", type: "true_false", statement: "Knochenhistologie verbindet Zelltypen, Matrix und Entwicklungsprozesse.", answer: true }],
    combatQuestions: [
      { id: "hi_kn_mc1", type: "mc", question: "Welche Aussagen zu den drei Knochenzellypen sind korrekt?", options: [
        { text: "Osteoblasten – Knochenaufbau durch Osteoid-Synthese und Mineralisation", correct: true },
        { text: "Osteozyten – eingemauerte ehemalige Osteoblasten, Erhalt des Knochens", correct: true },
        { text: "Osteoklasten – mehrkernige Riesenzellen, Knochenabbau durch Säuresekretion", correct: true },
        { text: "Osteoblasten – Knochenabbau durch Salzsäure-Sekretion", correct: false }
      ]},
      { id: "hi_kn_mc2", type: "mc", question: "Was sind die Hauptbestandteile der mineralisierten Knochenmatrix?", options: [
        { text: "Kollagen Typ I (organisch) und Hydroxylapatit Ca10(PO4)6(OH)2 (anorganisch)", correct: true },
        { text: "Elastin und Hyaluronsäure", correct: false },
        { text: "Kollagen Typ II und Kalziumkarbonat", correct: false },
        { text: "Glykogen und Chondroitin", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "blut",
    title: "Blut als Gewebe",
    phase1: {
      soil: { statement: "Blut wird in der Histologie als spezialisiertes Bindegewebe klassifiziert.", answer: true, solution: "Blut gilt histologisch als spezialisiertes Bindegewebe, da auch hier Zellen (Erythrozyten, Leukozyten, Thrombozyten) in einer flüssigen Grundsubstanz (Plasma als Interzellularsubstanz) vorkommen. Diese Einordnung ermöglicht den systematischen Vergleich mit anderen Binde- und Stützgeweben." },
      seed: { statement: "Blut hat keinen Bezug zum Binde- und Stützgewebe.", answer: false, solution: "Blut wird als flüssiges Bindegewebe eingeordnet, da seine Bestandteile (Zellen + Plasma) dem Prinzip Zellen in Matrix entsprechen – nur eben in flüssiger statt fester Form. Diese Einordnung verbindet Blutlehre mit der Gewebehierarchie." },
      water: { statement: "Die gewebliche Betrachtung von Blut dient dem Verständnis von Zell- und Matrixanteilen.", answer: true, solution: "Wenn man Blut als Gewebe betrachtet, wird der Vergleich mit anderen Bindegeweben möglich: zelliger Anteil (Erythrozyten, Leukozyten, Thrombozyten) vs. flüssige Matrix (Plasma). So wird verständlich, warum z.B. Leukozytenveränderungen wie bei Leukämie als Gewebeerkrankungen eingeordnet werden." }
    },
    harvestQuestions: [
      { id: "hi_bl_h1", type: "mc", question: "Welche Leukozytentypen gehören zu den Granulozyten?", options: [
        { text: "Neutrophile, Eosinophile und Basophile", correct: true },
        { text: "Lymphozyten und Monozyten", correct: false },
        { text: "Erythrozyten und Thrombozyten", correct: false },
        { text: "Makrophagen und dendritische Zellen", correct: false }
      ], explanation: "Leukozyten werden eingeteilt in: Granulozyten (körniges Zytoplasma) – neutrophile (55–70%, Phagozytose), eosinophile (2–4%, Parasitenabwehr, Allergie) und basophile (0,5–1%, Histaminfreisetzung); sowie agranuläre Leukozyten: Lymphozyten (25–35%, adaptive Immunantwort) und Monozyten (3–8%, Vorläuferzellen der Makrophagen)." },
      { id: "hi_bl_h2", type: "mc", question: "Was ist der Hämatokrit und welcher Normalwert gilt für Männer?", options: [
        { text: "Der Erythrozytenanteil am Gesamtblutvolumen; Männer: ca. 40–52%", correct: true },
        { text: "Die Anzahl der Leukozyten pro Mikroliter Blut; Männer: 4000–11000", correct: false },
        { text: "Der Hämoglobingehalt des Blutes; Männer: 14–18 g/dl", correct: false },
        { text: "Der Plasmaanteil am Blutvolumen; ca. 55–60%", correct: false }
      ], explanation: "Hämatokrit (Hkt) = Volumenanteil der Erythrozyten am Gesamtblut (%). Männer: 40–52%, Frauen: 37–47%. Ein niedriger Hkt deutet auf Anämie hin, ein hoher auf Polyglobulie oder Dehydratation. Leukozyten und Thrombozyten machen nur <1% des Blutvolumens aus." },
      { id: "hi_bl_h3", type: "true_false", statement: "Thrombozyten entstehen durch Abschnürung von Megakaryozyten im Knochenmark und haben keine DNS.", answer: true, explanation: "Megakaryozyten (riesige polynukleäre Zellen im Knochenmark) schnüren Tausende von Thrombozyten ab. Diese sind kernlos (keine DNA) und ca. 2–4 µm gross. Sie initiieren die primäre Hämostase durch Adhäsion an Gefässläsionen und Aggregation. Lebensdauer: ca. 8–12 Tage." }
    ],
    bossQuestions: [{ id: "hi_bl_b1", type: "true_false", statement: "Die Einordnung von Blut als Gewebe erweitert das Verständnis klassischer Histologie.", answer: true }],
    combatQuestions: [
      { id: "hi_bl_mc1", type: "mc", question: "Welche Zelltypen und ihre Funktionen sind korrekt zugeordnet?", options: [
        { text: "Neutrophile Granulozyten – primäre Phagozytose von Bakterien", correct: true },
        { text: "Eosinophile Granulozyten – Abwehr von Parasiten und allergischen Reaktionen", correct: true },
        { text: "Lymphozyten (B-Zellen) – Antikörperproduktion", correct: true },
        { text: "Erythrozyten – Phagozytose von Bakterien", correct: false }
      ]},
      { id: "hi_bl_mc2", type: "mc", question: "Was beschreibt der Begriff 'Differentialblutbild'?", options: [
        { text: "Die prozentuale Aufteilung der Leukozytentypen (Neutrophile, Lymphozyten, Monozyten, Eosinophile, Basophile)", correct: true },
        { text: "Die Messung des Hämatokrits", correct: false },
        { text: "Die Grösse und Form der Erythrozyten", correct: false },
        { text: "Den Fibrinogengehalt des Plasmas", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "muskelgewebe",
    title: "Muskelgewebe",
    phase1: {
      soil: { statement: "Muskelgewebe wird histologisch in drei Typen eingeteilt: quergestreifte Skelettmuskulatur (periphere Kerne, deutliche Streifung), Herzmuskulatur (zentraler Kern, Glanzstreifen) und glatte Muskulatur (zentraler Spindelkern, keine Streifung).", answer: true, solution: "Die drei Muskeltypen werden histologisch klar unterschieden: Skelettmuskulatur mit randständigen Kernen und deutlicher Querstreifung, Herzmuskulatur mit zentralem Kern und Glanzstreifen zwischen Zellen, glatte Muskulatur ohne Streifung und mit zentralem spindelförmigem Kern." },
      seed: { statement: "Muskelgewebe wird in der Histologie nicht nach Typen untergliedert.", answer: false, solution: "Die histologische Unterscheidung der Muskeltypen ist fundamental: Querstreifung sichtbar oder nicht, Kernlage zentral oder peripher, Glanzstreifen vorhanden oder nicht. Aus diesen Merkmalen lässt sich Funktion und Innervationstyp ableiten." },
      water: { statement: "Histologische Merkmale der Muskeltypen stehen in Zusammenhang mit ihren Funktionen.", answer: true, solution: "Quergestreifte Skelettmuskulatur zeigt histologisch Streifen durch regelmassige Sarkomeranordnung und ist willkürlich steuerbar; glatte Muskulatur hat keine Streifen und kontrahiert langsam und ausdauernd. Herzmuskulatur kombiniert Querstreifung (wie Skelettmuskel) mit unwillkürlicher Steuerung (wie glatte Muskulatur)." }
    },
    harvestQuestions: [
      { id: "hi_mg_h1", type: "mc", question: "Welche Merkmalskombination ist spezifisch für die Herzmuskulatur?", options: [
        { text: "Querstreifung, unwillkürliche Steuerung und Disci intercalares mit Gap Junctions", correct: true },
        { text: "Querstreifung, willkürliche Steuerung und randständige Kerne", correct: false },
        { text: "Keine Querstreifung, unwillkürliche Steuerung und Disci intercalares", correct: false },
        { text: "Querstreifung, unwillkürliche Steuerung, aber keine Disci intercalares", correct: false }
      ], explanation: "Herzmuskulatur kombiniert: Querstreifung durch Sarkomere (wie Skelettmuskel) + unwillkürliche Steuerung (wie glatte Muskulatur) + Disci intercalares (Glanzstreifen: Adhärens-Junctions für mechanische Kopplung und Gap Junctions für elektrische Kopplung) + zentraler Kern." },
      { id: "hi_mg_h2", type: "mc", question: "Welches Protein bildet die dunklen A-Banden im Sarkomer der Skelettmuskulatur?", options: [
        { text: "Myosin (dicke Filamente)", correct: true },
        { text: "Aktin (dünne Filamente)", correct: false },
        { text: "Troponin", correct: false },
        { text: "Titin", correct: false }
      ], explanation: "Im Sarkomer (strukturelle Einheit des Muskels): A-Banden (anisotrop = dunkel im Lichtmikroskop) = Myosin (dicke Filamente, 10–15 nm). I-Banden (isotrop = hell) = nur Aktin (dünne Filamente, 5–7 nm). Die Querstreifung entsteht durch die regelmässige Anordnung dieser Filamente im Sarkomer." },
      { id: "hi_mg_h3", type: "true_false", statement: "Glatte Muskelzellen können sich langsam und ausdauernd ohne Ermüdung kontrahieren, was sie für Hohlorgane besonders geeignet macht.", answer: true, explanation: "Glatte Muskulatur nutzt einen anderen Kontraktionsmechanismus als Skelettmuskel: langsame Myosin-Querbrückenzyklen (Latchzustand) erlauben Dauerkontraktionen mit sehr wenig ATP-Verbrauch. Diese Eigenschaft ist ideal für Dauertonus in Gefässen, Blasenapex, Darmmotilität." }
    ],
    bossQuestions: [{ id: "hi_mg_b1", type: "true_false", statement: "Muskelhistologie ist ohne sichere Typunterscheidung nicht belastbar.", answer: true }],
    combatQuestions: [
      { id: "hi_mg_mc1", type: "mc", question: "Welche histologischen Merkmale unterscheiden die drei Muskeltypen?", options: [
        { text: "Skelett: randständige Kerne, deutliche Querstreifung, willkürlich", correct: true },
        { text: "Herz: zentraler Kern, Querstreifung, Disci intercalares, unwillkürlich", correct: true },
        { text: "Glatt: zentraler ovaler Kern, keine Streifung, unwillkürlich", correct: true },
        { text: "Herz: randständige Kerne, keine Streifung, unwillkürlich", correct: false }
      ]},
      { id: "hi_mg_mc2", type: "mc", question: "Was ermöglicht die elektrische Kopplung der Herzmuskelzellen?", options: [
        { text: "Gap Junctions in den Disci intercalares", correct: true },
        { text: "Motorische Endplatten wie bei Skelettmuskeln", correct: false },
        { text: "Spannungsgesteuerte Natriumkanäle ohne Zell-Zell-Kontakt", correct: false },
        { text: "Myelinisierte Nervenfasern", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "nervengewebe",
    title: "Nervengewebe",
    phase1: {
      soil: { statement: "Nervengewebe umfasst Nervenzellen (Neuronen), Nervenfasern und Gliazellen.", answer: true, solution: "Nervengewebe besteht aus zwei Hauptzelltypen: Nervenzellen (Neuronen) mit ihren Fortsätzen (Axone, Dendriten) für Erregungsleitung und Gliazellen für Stütze, Ernährung und Isolierung der Neuronen. Nur das Zusammenspiel beider Zelltypen ermöglicht Informationsverarbeitung und -weiterleitung." },
      seed: { statement: "Erregungsbildung und Erregungsleitung sind für Nervengewebe kein Thema.", answer: false, solution: "Erregungsbildung (Generierung von Aktionspotentialen) und Erregungsleitung (Weitergabe entlang Axonen) sind die Kernfunktionen des Nervengewebes. Ohne diese Prozesse wäre weder bewusste Motorik, noch Sensorik, noch autonome Organsteuerung möglich." },
      water: { statement: "Der Aufbau der Nervenzelle ist Grundlage für das Verständnis ihrer Funktion.", answer: true, solution: "Die Nervenzelle besteht aus Soma (Zellkörper mit Kern), Dendriten (Signalempfänger) und Axon (Signalleiter). Diese Struktur erklärt direkt die Funktion: Dendriten empfangen Signale, das Axon leitet Aktionspotentiale zur nächsten Synapse weiter." }
    },
    harvestQuestions: [
      { id: "hi_ng_h1", type: "mc", question: "Welche Gliazelltypen kommen im zentralen Nervensystem (ZNS) vor?", options: [
        { text: "Astrozyten, Oligodendrozyten und Mikroglia", correct: true },
        { text: "Schwann-Zellen und Satellitenzellen", correct: false },
        { text: "Nur Astrozyten", correct: false },
        { text: "Thrombozyten und Erythrozyten", correct: false }
      ], explanation: "ZNS-Gliazellen: Astrozyten (Stütze, Blut-Hirn-Schranke, K+-Pufferung), Oligodendrozyten (Myelinisierung im ZNS – ein Oligodendrozyt kann bis zu 50 Axone myelinisieren), Mikroglia (immunaktive Makrophagen des ZNS). Schwann-Zellen myelinisieren dagegen nur im peripheren Nervensystem (PNS) – ein Schwann-Zell-Segment pro Axon." },
      { id: "hi_ng_h2", type: "mc", question: "Was bezeichnet man als 'saltatorische Erregungsleitung'?", options: [
        { text: "Sprungartige Weiterleitung des Aktionspotentials von Ranvier-Schnürring zu Ranvier-Schnürring", correct: true },
        { text: "Kontinuierliche Ausbreitung des Aktionspotentials entlang dem gesamten Axon ohne Unterbrechung", correct: false },
        { text: "Erregungsleitung rückwärts vom Soma zum Dendriten", correct: false },
        { text: "Leitung durch elektrische Synapsen ohne Neurotransmitter", correct: false }
      ], explanation: "Saltatorische Leitung (lat. saltare = springen): Aktionspotentiale entstehen nur an den nichtmyelinisierten Ranvier-Schnürringen (Lücken in der Myelinscheide), nicht unter der Myelinscheide. Dies beschleunigt die Leitung erheblich (bis 120 m/s) und spart Energie, da weniger Membranfläche depolarisiert werden muss." },
      { id: "hi_ng_h3", type: "true_false", statement: "Das Ruhemembranpotential einer typischen Nervenzelle beträgt ca. -70 mV (innen negativ).", answer: true, explanation: "Das Ruhemembranpotential (-70 mV) entsteht durch: ungleiche Ionenverteilung (hohe K+ innen, hohe Na+ aussen), Kaliumleckkanäle (K+ strömt aus), und die Na+/K+-ATPase (hält den Gradienten aufrecht). Innen ist es negativ, weil K+-Ausstrom mehr negative Ladungen zurücklässt." }
    ],
    bossQuestions: [{ id: "hi_ng_b1", type: "true_false", statement: "Nervengewebe erfordert das Zusammendenken von Zellaufbau, Leitungsfunktion und Stützstrukturen.", answer: true }],
    combatQuestions: [
      { id: "hi_ng_mc1", type: "mc", question: "Welche Gliazelltypen und ihre Funktionen sind korrekt zugeordnet?", options: [
        { text: "Oligodendrozyten – Myelinisierung im ZNS", correct: true },
        { text: "Schwann-Zellen – Myelinisierung im PNS", correct: true },
        { text: "Mikroglia – Immunzellen des ZNS (ZNS-Makrophagen)", correct: true },
        { text: "Astrozyten – Erregungsleitung durch Aktionspotentiale", correct: false }
      ]},
      { id: "hi_ng_mc2", type: "mc", question: "Was unterscheidet myelinisierte von nicht-myelinisierten Axonen?", options: [
        { text: "Myelinisierte Axone leiten schneller durch saltatorische Erregungsleitung", correct: true },
        { text: "Myelinisierte Axone sind dünner und leiten langsamer", correct: false },
        { text: "Nicht-myelinisierte Axone leiten schneller als myelinisierte", correct: false },
        { text: "Myelinisierung kommt nur im PNS vor", correct: false }
      ]}
    ]
  })
];

const KNOCHENLEHRE_1033_PLANTS = [
  makeDetailedPlant({
    id: "knochenstoffwechsel",
    title: "Knochenstoffwechsel",
    phase1: {
      soil: { statement: "Knochen wird als lebendiges Gewebe mit ständigen Auf- und Abbauprozessen beschrieben.", answer: true, solution: "Knochen ist kein totes Material, sondern aktives Gewebe mit Blutversorgung, Nerven und lebenden Zellen. Osteoblasten, Osteozyten und Osteoklasten arbeiten ständig zusammen, um Knochen aufzubauen, zu erhalten und abzubauen." },
      seed: { statement: "Knochenstoffwechsel spielt nur in der Kindheit eine Rolle.", answer: false, solution: "Knochenstoffwechsel ist ein lebenslanger Prozess: Osteoblasten bauen ständig neue Knochenmatrix auf, Osteoklasten bauen sie ab. Dieses Gleichgewicht ermöglicht die Anpassung an Belastungsänderungen, die Kalziumregulation und die Heilung nach Frakturen." },
      water: { statement: "Osteoblasten und Osteoklasten sind zentrale Zelltypen des Knochenstoffwechsels.", answer: true, solution: "Osteoblasten synthetisieren Kollagen und initiieren die Mineralisation der Knochenmatrix – sie sind die Aufbauexperten. Osteoklasten lösen Knochensubstanz durch Säuresekretion und lysosomale Enzyme auf. Das Gleichgewicht beider Zelltypen bestimmt die Knochendichte." }
    },
    harvestQuestions: [
      { id: "ko_st_h1", type: "mc", question: "Was besagt das Wolff'sche Gesetz?", options: [
        { text: "Knochen baut sich entsprechend einwirkender mechanischer Belastung um: Zuglinien werden durch Trabekelausrichtung gespiegelt", correct: true },
        { text: "Knochen verliert immer an Masse, unabhängig von Belastung", correct: false },
        { text: "Osteoblasten sind inaktiv bei mechanischer Belastung", correct: false },
        { text: "Knochen reagiert nur auf hormonelle, nicht auf mechanische Reize", correct: false }
      ], explanation: "Das Wolff'sche Gesetz (Julius Wolff, 1892): Knochen passt seine Struktur (Trabekelarchitektur, Kortikalisdicke) an die einwirkenden Kräfte an. Belastungslinien werden durch Trabekel im Inneren des Knochens gespiegelt. Astronauten verlieren Knochenmasse in der Schwerelosigkeit; Sportler bauen Knochen auf – ein direkter Beweis für dieses Gesetz." },
      { id: "ko_st_h2", type: "mc", question: "Welches Hormon stimuliert den Knochenabbau (erhöhte Osteoklasenaktivität)?", options: [
        { text: "Parathormon (PTH)", correct: true },
        { text: "Calcitonin", correct: false },
        { text: "Östrogen", correct: false },
        { text: "Insulin", correct: false }
      ], explanation: "Parathormon (PTH, aus Nebenschilddrüsen) stimuliert bei Hypokalzämie die Osteoklasten (indirekt über RANKL-Signalweg), was Kalzium aus dem Knochen freisetzt und den Blutkalziumspiegel anhebt. Calcitonin (aus C-Zellen der Schilddrüse) hemmt dagegen Osteoklasten. Östrogen schützt vor Knochenverlust (erklärt Osteoporose nach Menopause)." },
      { id: "ko_st_h3", type: "true_false", statement: "Der menschliche Knochen wird im Erwachsenenalter vollständig innerhalb von ca. 10 Jahren durch Remodelling erneuert.", answer: true, explanation: "Knochenremodelling ist ein lebenslanger Prozess: Pro Jahr wird ca. 10% des gesamten Knochengewebes durch koordinierte Osteoklastenresorption und Osteoblastenneubildung (Remodelling-Einheiten) erneuert. Damit wird der gesamte Knochen etwa alle 10 Jahre vollständig ausgetauscht – vergleichbar einer ständigen Materialerneuerung." }
    ],
    bossQuestions: [{ id: "ko_st_b1", type: "true_false", statement: "Knochenstoffwechsel ist ein dynamischer, lebenslanger Prozess.", answer: true }],
    combatQuestions: [
      { id: "ko_st_mc1", type: "mc", question: "Welche Hormone regulieren den Knochenstoffwechsel und wie?", options: [
        { text: "Parathormon (PTH) – erhöhte Osteoklasenaktivität, Kalziumfreisetzung", correct: true },
        { text: "Calcitonin – hemmt Osteoklasten, senkt Blutkalzium", correct: true },
        { text: "Östrogen – schützt Knochen vor Abbau", correct: true },
        { text: "Insulin – ist der Hauptregulator des Knochenstoffwechsels", correct: false }
      ]},
      { id: "ko_st_mc2", type: "mc", question: "Was erklärt den Knochenverlust bei Astronauten in der Schwerelosigkeit?", options: [
        { text: "Fehlende mechanische Belastung → reduzierte Osteoblastenaktivität gemäss Wolff'schem Gesetz", correct: true },
        { text: "Überschuss an Parathormon im Weltall", correct: false },
        { text: "Vitamin-D-Mangel durch fehlende UV-Strahlung", correct: false },
        { text: "Inhibition der Osteoklasten durch kosmische Strahlung", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "knochenbildung_abbau_umbau",
    title: "Knochenbildung, -abbau und -umbau",
    phase1: {
      soil: { statement: "Osteoblasten sind für Knochenbildung, Osteoklasten für Knochenabbau zuständig.", answer: true, solution: "Osteoblasten sind die Aufbauexperten: Sie produzieren Kollagen und setzen Kalziumphosphat in der Knochenmatrix ab. Osteoklasten sind Abbauspezialisten: Sie lösen Knochensubstanz durch Salzsäuresekretion auf und geben Kalzium und Phosphat ins Blut frei." },
      seed: { statement: "Knochenabbau ist nur pathologisch und für normale Entwicklung bedeutungslos.", answer: false, solution: "Abbauprozesse sind auch für Wachstum und Umbau notwendig." },
      water: { statement: "Knochenumbau dient der funktionellen Anpassung an Belastung.", answer: true, solution: "Das Wolff'sche Gesetz beschreibt, wie Knochen seine Struktur ständig an einwirkende Kräfte anpasst: Mehr belastete Bereiche werden verdichtet, wenig belastete werden abgebaut. Dieser koordinierte Umbau durch Osteoblasten und Osteoklasten erklärt z.B. Knochenverlust bei Immobilität und Aufbau bei körperlichem Training." }
    },
    harvestQuestions: [
      { id: "ko_bau_h1", type: "mc", question: "Was ist der Unterschied zwischen desmaler und enchondraler Ossifikation?", options: [
        { text: "Desmal: direkte Knochenbildung aus Mesenchym; enchondral: Knochenbildung über eine Knorpelvorläuferstufe", correct: true },
        { text: "Desmal: nur in den Extremitäten; enchondral: nur im Schädel", correct: false },
        { text: "Beide Formen sind identisch – der Name ist nur verschieden", correct: false },
        { text: "Enchondral: direkte Knochenbildung; desmal: über Knorpelvorläuferstufe", correct: false }
      ], explanation: "Desmale Ossifikation (griech. desmos = Band): Osteoblasten differenzieren direkt aus Mesenchymzellen und bilden Knochen ohne Knorpelvorläfer. Beispiele: Schedelknochen (Frontal-, Parietale), Klavikula, Gesichtsknochen. Enchondrale Ossifikation: Knorpelmodell wird durch Knochen ersetzt; Beispiele: alle langen Röhrenknochen, Beckenknochen, Rippen." },
      { id: "ko_bau_h2", type: "mc", question: "Was bezeichnet die 'periostale Ossifikation' beim Dickenwachstum?", options: [
        { text: "Knochenaufbau unter dem Periost durch Osteoblasten auf der Knochenoberfläche", correct: true },
        { text: "Knochenabbau in der Markhöhle durch Osteoklasten", correct: false },
        { text: "Verknorpelung des Periosts bei Frakturheilung", correct: false },
        { text: "Knochenbildung in der Epiphysenfuge", correct: false }
      ], explanation: "Das Längenwachstum erfolgt enchondral in der Epiphysenfuge. Das Dickenwachstum (Apposition) erfolgt periosteal: Osteoblasten unter dem Periost legen konzentrisch neue Knochenlamellen auf die Knochenoberfläche. Gleichzeitig bauen Osteoklasten endosteal ab, um die Markhöhlengrösse beizubehalten." },
      { id: "ko_bau_h3", type: "true_false", statement: "Bei der Frakturheilung wird immer zuerst Geflechtknochen gebildet, der später zu Lamellenknochen umgebaut wird.", answer: true, explanation: "Frakturheilung verläuft in Phasen: Hämatom → Granulationsgewebe → Kallus (periostaler Kallus aus Faserknorpel, später Geflechtknochen) → Umbau zu Lamellenknochen. Geflechtknochen ist schnell aber schwächer (ungeordnete Kollagenfasern); Lamellenknochen ist stark und biomechanisch optimiert (geordnete konzentrische Lamellen)." }
    ],
    bossQuestions: [{ id: "ko_bau_b1", type: "true_false", statement: "Aufbau und Abbau sind gleichermassen Teil physiologischer Knochenvorgänge.", answer: true }],
    combatQuestions: [
      { id: "ko_bau_mc1", type: "mc", question: "Welche Knochen entstehen durch desmale (membranöser) Ossifikation?", options: [
        { text: "Schädelknochen (Stirn-, Scheitel-, Hinterhauptsknochen)", correct: true },
        { text: "Lange Röhrenknochen (Femur, Humerus)", correct: false },
        { text: "Rippen und Brustbein", correct: false },
        { text: "Beckenknochen", correct: false }
      ]},
      { id: "ko_bau_mc2", type: "mc", question: "Welche Phasen der Frakturheilung verlaufen in korrekter Reihenfolge?", options: [
        { text: "Hämatom → Granulationsgewebe → Kallus (Geflechtknochen) → Lamellenknochen", correct: true },
        { text: "Lamellenknochen → Geflechtknochen → Kallus → Hämatom", correct: false },
        { text: "Direkte Ossifikation ohne Knorpelphase bei allen Knochen", correct: false },
        { text: "Hämatom → sofortige Lamellenknochenbildung ohne Zwischenschritte", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "knochenwachstum",
    title: "Knochenwachstum",
    phase1: {
      soil: { statement: "Das Längenwachstum langer Knochen ist an spezielle Wachstumszonen gebunden.", answer: true, solution: "Das Längenwachstum langer Röhrenknochen findet ausschliesslich in der Epiphysenfuge (Wachstumsplatte) statt, einem Knorpelstreifen zwischen Epiphyse und Diaphyse. Chondrozyten teilen sich hier und werden nach und nach durch Knochen ersetzt, bis die Fuge mit Ende der Pubertät schliesst." },
      seed: { statement: "Mechanische Beanspruchung ist für Knochenwachstum ohne Bedeutung.", answer: false, solution: "Mechanische Belastung stimuliert durch piezölektrische Effekte und Druckkräfte die Osteoblastenaktivität und fördert so den Knochenaufbau. Fehlende Belastung (z.B. Bettruhe, Schwerelosigkeit) führt dagegen zu Knochenabbau und Dichteabnahme." },
      water: { statement: "Wachstum und Heilung beginnen häufig mit Geflechtknochen als früher Strukturform.", answer: true, solution: "Geflechtknochen entsteht bei schnellem Knochenaufbau (Wachstum, Frakturheilung) und hat ungeordnete Kollagenfasern. Er wird später durch belastungsfesteren lamellären Knochen mit parallel ausgerichteten Kollagenfasern ersetzt." }
    },
    harvestQuestions: [
      { id: "ko_w_h1", type: "mc", question: "Welche Zonen der Epiphysenfuge gibt es in korrekter Reihenfolge (von Epiphyse zur Diaphyse)?", options: [
        { text: "Reservezone → Proliferationszone → Hypertrophiezone → Verkalkungszone", correct: true },
        { text: "Verkalkungszone → Proliferationszone → Reservezone", correct: false },
        { text: "Nur zwei Zonen: Wachstumszone und Knochenzone", correct: false },
        { text: "Reservezone → Verkalkungszone → Hypertrophiezone → Proliferationszone", correct: false }
      ], explanation: "Die Epiphysenfuge (Physis) hat histologisch vier Zonen: 1. Reservezone (ruhende Chondrozyten), 2. Proliferationszone (Zellteilung, Säulenbau), 3. Hypertrophiezone (Zellgrössenzunahme, Matrix-Mineralisation), 4. Verkalkungszone (Apoptose der Chondrozyten, Knochenmatrix-Einlagerung durch Osteoblasten)." },
      { id: "ko_w_h2", type: "mc", question: "Welches Hormon ist der wichtigste Stimulator des Längenwachstums?", options: [
        { text: "Wachstumshormon (STH/GH) – wirkt über IGF-1", correct: true },
        { text: "Parathormon (PTH)", correct: false },
        { text: "Cortisol", correct: false },
        { text: "Aldosteron", correct: false }
      ], explanation: "Wachstumshormon (STH = Somatotropin) wird von der Hypophyse ausgeschüttet und stimuliert die Leber zur Produktion von IGF-1 (Insulin-like Growth Factor 1). IGF-1 stimuliert Chondrozytenproliferation in der Epiphysenfuge. Mangel: Kleinwuchs (hypophysärer Nanismus). Überschuss vor Fugenschluss: Gigantismus; nach Fugenschluss: Akromegalie." },
      { id: "ko_w_h3", type: "true_false", statement: "Knochenwachstum und Knochenumbau sind funktionell gekoppelt.", answer: true, explanation: "Während das Längenwachstum in den Epiphysenfugen stattfindet, muss gleichzeitig das Knochendurchmesserwachstum (periostales Dickenwachstum) mit koordiniertem endostalem Abbau kombiniert werden, um die Proportionen und Markhöhlengrösse beizubehalten. Wachstum ohne Umbau würde zu massiven, schweren Knochen ohne Markhöhlel führen." }
    ],
    bossQuestions: [{ id: "ko_w_b1", type: "true_false", statement: "Knochenwachstum ist ohne biomechanischen Kontext nicht vollständig erklärbar.", answer: true }],
    combatQuestions: [
      { id: "ko_w_mc1", type: "mc", question: "Welche Faktoren steuern das Längenwachstum der Knochen?", options: [
        { text: "Wachstumshormon und IGF-1", correct: true },
        { text: "Schilddrüsenhormone (T3, T4)", correct: true },
        { text: "Sexualhormone (Östrogen/Testosteron – fördern und später verschliessen Epiphysenfugen)", correct: true },
        { text: "Calcitonin (haupstimulator des Längenwachstums)", correct: false }
      ]},
      { id: "ko_w_mc2", type: "mc", question: "Was ist der radiologische Befund beim Epiphysenfugenschluss?", options: [
        { text: "Die Epiphysenfuge ist als helle (radioluzente) Linie zwischen Epi- und Diaphyse nicht mehr sichtbar", correct: true },
        { text: "Die Epiphysenfuge verbreitert sich und wird radiopak (weiss)", correct: false },
        { text: "Epiphysen und Diaphyse trennen sich im Röntgenbild", correct: false },
        { text: "Epiphysenfugen sind im Röntgenbild nie sichtbar", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "lagebezeichnungen",
    title: "Lagebezeichnungen und Körperebenen",
    phase1: {
      soil: { statement: "Körperebenen, Achsen und Richtungsbezeichnungen bilden ein anatomisches Orientierungssystem.", answer: true, solution: "Anatomische Lagebezeichnungen (kranial/kaudal, anterior/posterior, medial/lateral) und Körperebenen (Sagittal-, Frontal-, Transversalebene) bilden ein standardisiertes Koordinatensystem. Ohne diese Fachsprache sind präzise anatomische und klinische Beschreibungen nicht möglich." },
      seed: { statement: "Lagebezeichnungen sind für Bewegungsbeschreibungen im Bewegungsapparat irrelevant.", answer: false, solution: "Ohne standardisierte Lagebezeichnungen entstehen sofort Missverständnisse: 'oben', 'unten', 'vorne', 'hinten' sind in verschiedenen Körperpositionen mehrdeutig. 'Kranial', 'kaudal', 'anterior', 'posterior' dagegen bleiben immer eindeutig, unabhängig von der Körperposition." },
      water: { statement: "Achsen und Ebenen werden genutzt, um Bewegungen standardisiert zuzuordnen.", answer: true, solution: "Sagittalebene und Frontalache erlauben Flexion/Extension, Frontalebene und Sagittalache erlauben Ab-/Adduktion, Transversalebene und Vertikalache erlauben Rotation. Diese Systematik macht es möglich, jede Körperbewegung eindeutig zu benennen und zu vergleichen." }
    },
    harvestQuestions: [
      { id: "ko_lb_h1", type: "mc", question: "Welche Körperebene teilt den Körper in eine rechte und eine linke Hälfte?", options: [
        { text: "Sagittalebene (Medianebene als Sonderfall)", correct: true },
        { text: "Frontalebene (Koronarebene)", correct: false },
        { text: "Transversalebene (Horizontalebene)", correct: false },
        { text: "Diagonalebene", correct: false }
      ], explanation: "Die Sagittalebene verläuft von anterior nach posterior und teilt den Körper in rechte und linke Hälfte. Die Medianebene ist die mittlere Sagittalebene. Die Frontalebene teilt in ventral/dorsal, die Transversalebene in kranial/kaudal." },
      { id: "ko_lb_h2", type: "mc", question: "Was bedeuten die Lagebezeichnungen 'proximal' und 'distal'?", options: [
        { text: "Proximal = rumpfnah; distal = rumpffern (v.a. an Extremitäten)", correct: true },
        { text: "Proximal = oberflächennah; distal = tief gelegen", correct: false },
        { text: "Proximal = vorne; distal = hinten", correct: false },
        { text: "Proximal = kopfwärts; distal = fusswärts", correct: false }
      ], explanation: "Proximal (lat. proximus = nah) bezeichnet die rumpfnahe Lage an Extremitäten: die Schulter ist proximal des Ellenbogens. Distal (lat. distans = entfernt) bezeichnet die rumpfferne Lage: die Hand ist distal des Ellenbogens. Die Begriffe sind relational, nicht absolut." },
      { id: "ko_lb_h3", type: "mc", question: "Um welche Achse erfolgt Flexion und Extension?", options: [
        { text: "Transversalachse (Querachse) – Bewegung in der Sagittalebene", correct: true },
        { text: "Sagittalachse – Bewegung in der Frontalebene", correct: false },
        { text: "Vertikalachse – Bewegung in der Transversalebene", correct: false },
        { text: "Frontalebene selbst ohne zugehörige Achse", correct: false }
      ], explanation: "Flexion/Extension: Sagittalebene, Transversalachse (z.B. Kniebeugung). Abduktion/Adduktion: Frontalebene, Sagittalachse (z.B. Arm seitlich heben). Rotation: Transversalebene, Vertikalachse (z.B. Kopfdrehen). Jede Bewegungsebene hat ihre zugehörige Drehachse." }
    ],
    bossQuestions: [{ id: "ko_lb_b1", type: "true_false", statement: "Anatomische Orientierungssprache ist Kernwerkzeug im Bewegungsapparat.", answer: true }],
    combatQuestions: [
      { id: "ko_lb_mc1", type: "mc", question: "Was bedeutet 'kranial'?", options: [
        { text: "Kopfwärts, in Richtung Schädel", correct: true },
        { text: "Fusswärts, in Richtung Unterschenkel", correct: false },
        { text: "Zur Körpermitte hin (medial)", correct: false },
        { text: "Zur Körperoberfläche hin (superfizial)", correct: false }
      ]},
      { id: "ko_lb_mc2", type: "mc", question: "Welche Ebene teilt den Körper in eine vordere (ventrale) und hintere (dorsale) Hälfte?", options: [
        { text: "Frontalebene (Koronarebene)", correct: true },
        { text: "Sagittalebene", correct: false },
        { text: "Transversalebene", correct: false },
        { text: "Medianebene", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "knochenformen",
    title: "Knochenformen",
    phase1: {
      soil: { statement: "Knochen werden nach ihrer Form in vier Typen eingeteilt: lange Knochen (z.B. Femur), kurze Knochen (z.B. Handwurzel), platte Knochen (z.B. Schädelplatten) und unregelmässige Knochen (z.B. Wirbel).", answer: true, solution: "Die vier Knochentypen – lang (z.B. Femur), kurz (z.B. Handwurzelknochen), platt (z.B. Schädelplatten) und unregelmässig (z.B. Wirbel) – spiegeln verschiedene Belastungsprofile und Funktionen wider. Die Knochenform ist immer Ausdruck der mechanischen Anforderungen an den jeweiligen Knochen." },
      seed: { statement: "Wirbel werden den langen Röhrenknochen zugeordnet.", answer: false, solution: "Wirbel gelten als unregelmässige Knochen." },
      water: { statement: "Arme und Beine enthalten typische lange Knochen (Röhrenknochen).", answer: true, solution: "Röhrenknochen wie Femur, Humerus oder Tibia besitzen eine robuste Diaphyse (Schaft) aus Kompakta, die Biegekräfte abfängt, und Epiphysen mit Spongiosa für die kraftverteilende Verbindung zu Gelenken. Diese Bauweise vereint Stabilität mit relativ geringem Gewicht." }
    },
    harvestQuestions: [
      { id: "ko_fo_h1", type: "mc", question: "Was ist das Kennzeichen langer Röhrenknochen (z.B. Femur) im Vergleich zu kurzen Knochen?", options: [
        { text: "Deutlich längere als breite Form mit Diaphyse und zwei Epiphysen", correct: true },
        { text: "Annähernd gleiche Ausdehnung in alle Raumrichtungen", correct: false },
        { text: "Sehr dünne Plattenform mit überwiegend Spongiosa", correct: false },
        { text: "Unregelmassige Form ohne erkennbare Systematik", correct: false }
      ], explanation: "Lange Röhrenknochen (Os longum) haben eine ausgepragte Diaphyse (Schaft) aus kompakter Kortikalis, zwei Epiphysen und eine Markhöhle mit Fettmark (Erwachsene). Beispiele: Femur, Humerus, Tibia, Fibula, Radius, Ulna. Die Länge überwiegt die Breite deutlich." },
      { id: "ko_fo_h2", type: "mc", question: "Warum enthalten platte Knochen wie Brustbein und Schulterblatt auch im Erwachsenenalter rotes Knochenmark?", options: [
        { text: "Weil platte Knochen hämatopötisch aktiv sind und Blutbildung stattfindet", correct: true },
        { text: "Weil platte Knochen keine Markhöhle haben und stattdessen gelbes Mark speichern", correct: false },
        { text: "Weil platte Knochen keine Knochenzellen enthalten", correct: false },
        { text: "Weil rotes Mark nur in der Kindheit vorhanden ist und im Erwachsenenalter fehlt", correct: false }
      ], explanation: "Platte Knochen (Ossa plana) wie Sternum, Skapula, Ossa cranii enthalten auch im Erwachsenenalter rotes Knochenmark in ihrer Spongiosa (Diplö bei Schädelknochen). Im Gegensatz dazu wird die Diaphyse langer Röhrenknochen im Erwachsenenalter durch gelbes Fettmark ersetzt. Klinisch wichtig: Knochenmarkpunktion am Sternum oder Beckenkamm." },
      { id: "ko_fo_h3", type: "mc", question: "Welchem Knochentyp werden Wirbelkörper zugeordnet?", options: [
        { text: "Unregelmässige Knochen (Ossa irregularia)", correct: true },
        { text: "Lange Knochen", correct: false },
        { text: "Kurze Knochen", correct: false },
        { text: "Platte Knochen", correct: false }
      ], explanation: "Wirbel haben eine komplexe unregelmässige Form (Wirbelkörper + Bogen + Fortsätze) und passen in keine der anderen Kategorien. Weitere unregelmässige Knochen: Gesichtsschädelknochen, Os coxä (Hüftbein). Die Klassifikation 'unregelmässig' ist ein Sammelbegriff für Knochen ohne einfache geometrische Grundform." }
    ],
    bossQuestions: [{ id: "ko_fo_b1", type: "true_false", statement: "Die sichere Typzuordnung von Knochenformen ist prüfungsrelevant.", answer: true }],
    combatQuestions: [
      { id: "ko_fo_mc1", type: "mc", question: "Welchem Knochentyp entspricht der Oberschenkelknochen (Femur)?", options: [
        { text: "Langer Knochen (Röhrenknochen)", correct: true },
        { text: "Kurzer Knochen", correct: false },
        { text: "Platter Knochen", correct: false },
        { text: "Unregelmässiger Knochen", correct: false }
      ]},
      { id: "ko_fo_mc2", type: "mc", question: "Was kennzeichnet kurze Knochen?", options: [
        { text: "Annähernd gleiche Ausdehnung in alle Richtungen, z. B. Hand-/Fusswurzelknochen", correct: true },
        { text: "Eine deutlich längere als breite Form", correct: false },
        { text: "Eine sehr dünne plattenförmige Gestalt", correct: false },
        { text: "Ausschliessliches Vorkommen im Schädel", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "achsenskelett",
    title: "Achsenskelett",
    phase1: {
      soil: { statement: "Zum Achsenskelett zählen u. a. Schädel, Wirbelsäule und knöcherner Brustkorb.", answer: true, solution: "Das Achsenskelett bildet die zentrale tragende Skelettachse des Körpers und gibt dem Rumpf seine stabile Grundstruktur. Schädel, Wirbelsäule, Rippen und Brustbein bieten dabei gleichzeitig Schutz für Gehirn, Rückenmark und Brustorgane." },
      seed: { statement: "Das Achsenskelett hat keine Schutzfunktion für zentrale Organe.", answer: false, solution: "Das Achsenskelett hat eine doppelte Hauptfunktion: Tragen und Stabilisieren des Körpers sowie Schutz lebenswichtiger Organe. Der Brustkorb umschliesst Herz und Lunge, der Schädel das Gehirn und die Wirbelsäule das Rückenmark." },
      water: { statement: "Die Untergliederung in Neurocranium und Viscerocranium gehört zur Schädelbetrachtung.", answer: true, solution: "Der Schädel gliedert sich in Neurocranium (Hirnschädel, 8 Knochen zum Schutz des Gehirns) und Viscerocranium (Gesichtsschädel, 14 Knochen für Kauapparat und Sinnesorgane). Diese Zweiteilung hilft, Schädelknochen topographisch und funktionell einzuordnen." }
    },
    harvestQuestions: [
      { id: "ko_as_h1", type: "mc", question: "In wie viele Knochen unterteilt sich der Schädel und wie heissen die beiden Hauptabschnitte?", options: [
        { text: "22 Knochen: Neurocranium (Hirnschädel, 8) und Viscerocranium (Gesichtsschädel, 14)", correct: true },
        { text: "8 Knochen: vier Schädelknochen und vier Gesichtsknochen", correct: false },
        { text: "Ein einziger Knochen, der beim Erwachsenen vollständig verwachsen ist", correct: false },
        { text: "14 Knochen: Neurocranium hat 10, Viscerocranium hat 4", correct: false }
      ], explanation: "Der Schädel besteht aus 22 Einzelknochen: das Neurocranium (Hirnschädel) umfasst 8 Knochen (z.B. Os frontale, Os parietale, Os occipitale, Os temporale, Os sphenoidale) und bildet den Schutzraum für das Gehirn. Das Viscerocranium (Gesichtsschädel) umfasst 14 Knochen und bildet den Kauapparat und die Eingangsstrukturen der Atemwege." },
      { id: "ko_as_h2", type: "mc", question: "Wie viele Rippenpaare hat der Mensch und wie viele sind echte Rippen (Costä verä)?", options: [
        { text: "12 Rippenpaare; die ersten 7 sind echte Rippen (direkter Kontakt zum Sternum)", correct: true },
        { text: "10 Rippenpaare; alle sind echte Rippen", correct: false },
        { text: "12 Rippenpaare; die ersten 10 sind echte Rippen", correct: false },
        { text: "14 Rippenpaare; nur die letzten 2 sind falsche Rippen", correct: false }
      ], explanation: "Der Brustkorb hat 12 Rippenpaare: Costä verä (echte Rippen, 1–7): direkter Knorpelansatz am Sternum. Costä spuriä (falsche Rippen, 8–10): verbinden sich über gemeinsamen Knorpel mit Rippe 7. Costä fluctuantes (freie Rippen, 11–12): keine sternale Verbindung. Das Brustbein (Sternum) besteht aus Manubrium, Corpus und Processus xiphoideus." },
      { id: "ko_as_h3", type: "mc", question: "Welche Organe werden primär durch das Achsenskelett geschützt?", options: [
        { text: "Gehirn (Schädel), Rückenmark (Wirbelsäule), Herz und Lunge (Brustkorb)", correct: true },
        { text: "Leber und Nieren (Wirbelsäule), Magen (Brustkorb)", correct: false },
        { text: "Hirn und Milz (Schädel), Blase (Wirbelsäule)", correct: false },
        { text: "Ausschliesslich Gehirn und Rückenmark – kein Schutz des Herzens", correct: false }
      ], explanation: "Das Achsenskelett hat eine doppelte Funktion: Tragstruktur und Organschutz. Schädel schützt Gehirn und Hirnstamm, Wirbelsäule schützt Rückenmark im Spinalkanal, Brustkorb (Rippen + Sternum + BWS) schützt Herz und Lunge. Der Bauchraum wird vom Achsenskelett nicht knochern umschlossen – dort dienen Muskeln als Schutz." }
    ],
    bossQuestions: [{ id: "ko_as_b1", type: "true_false", statement: "Achsenskelettfragen verbinden Topographie, Schutzfunktion und Statik.", answer: true }],
    combatQuestions: [
      { id: "ko_as_mc1", type: "mc", question: "Welche Strukturen gehören zum Achsenskelett?", options: [
        { text: "Schädel, Wirbelsäule und knöcherner Brustkorb", correct: true },
        { text: "Schulterblatt, Schlüsselbein und Rippen", correct: false },
        { text: "Becken, Femur und Humerus", correct: false },
        { text: "Wirbelsäule, Becken und untere Extremität", correct: false }
      ]},
      { id: "ko_as_mc2", type: "mc", question: "In wie viele Abschnitte wird die Wirbelsäule gegliedert?", options: [
        { text: "Fünf: HWS, BWS, LWS, Sakrum und Steissbein", correct: true },
        { text: "Drei: Hals-, Brust- und Lendenwirbelsäule", correct: false },
        { text: "Vier: Hals-, Brust-, Lenden- und Kreuzwirbel", correct: false },
        { text: "Sechs Abschnitte mit jeweils eigener Bogenstruktur", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "wirbelsäule",
    title: "Wirbelsäule",
    phase1: {
      soil: { statement: "Die Wirbelsäule besteht aus Wirbeln und Bandscheiben und hat sowohl tragende als auch schützende Aufgaben.", answer: true, solution: "Die Wirbelsäule besteht aus 33–34 Wirbeln in fünf Abschnitten (7 HWS, 12 BWS, 5 LWS, Sakrum, Steissbein), verbunden durch Bandscheiben und Bänder. Bandscheiben aus Faserring (Anulus fibrosus) und Gallertkern (Nucleus pulposus) fungieren als Stossdämpfer und ermöglichen gleichzeitig Beweglichkeit." },
      seed: { statement: "Bandscheiben sind für Funktion und Beweglichkeit der Wirbelsäule bedeutungslos.", answer: false, solution: "Bandscheiben sind unverzichtbar für die Funktion der Wirbelsäule: Sie federn axiale Druckkräfte ab, geben den Wirbelkörpern Abstand und ermöglichen durch ihre Verformbarkeit Beugung, Streckung und Rotation." },
      water: { statement: "Die Wirbelsäule wird durch längs verlaufende Bänder wie Lig. longitudinale anterius und Lig. longitudinale posterius gegen Überdehnung stabilisiert.", answer: true, solution: "Die Wirbelsäule wird durch mehrere Bandsysteme stabilisiert: Das Lig. longitudinale anterius entlang der Vorderfläche, das Lig. longitudinale posterius im Spinalkanal, und die Ligg. flava zwischen den Wirbelbögen. Diese Bänder begrenzen Überdehnung und sichern die Stabilität der Wirbelsäule." }
    },
    harvestQuestions: [
      { id: "ko_ws_h1", type: "mc", question: "Aus welchen zwei Anteilen besteht eine Bandscheibe (Discus intervertebralis)?", options: [
        { text: "Anulus fibrosus (Faserring aussen) und Nucleus pulposus (Gallertkern innen)", correct: true },
        { text: "Periost (aussen) und Spongiosa (innen)", correct: false },
        { text: "Kompakta (aussen) und Hyalinknorpel (innen)", correct: false },
        { text: "Elastin (aussen) und Kollagen (innen)", correct: false }
      ], explanation: "Die Bandscheibe besteht aus: Anulus fibrosus – konzentrischer Faserring aus Kollagen Typ I für Zugfestigkeit; Nucleus pulposus – wasserreicher Gallertkern (80% Wasser, Aggrekan) der den Druck puffernd verteilt. Bei Bandscheibenvorfall prolabiert der Nucleus durch einen Riss im Anulus und kann Nervenwurzeln komprimieren." },
      { id: "ko_ws_h2", type: "mc", question: "Welche physiologischen Krümmungen hat die Wirbelsäule (sagittale Sicht)?", options: [
        { text: "HWS und LWS: Lordose (nach vorne); BWS und Sakrum: Kyphose (nach hinten)", correct: true },
        { text: "Alle Abschnitte zeigen gleichmässige Kyphose nach hinten", correct: false },
        { text: "Die Wirbelsäule ist im Idealfall gerade ohne Krümmungen", correct: false },
        { text: "HWS: Kyphose; LWS: Lordose; BWS: Lordose", correct: false }
      ], explanation: "Die Wirbelsäule hat im Seitenbild ein S-förmiges Doppelkurvenmodell: Zervikallordose + Brustkyphose + Lendenlordose + Sakralkyphose. Diese Krümmungen erhöhen die Stabilität (federnd) und Belastungskapazität. Pathologische Krümmungen: Skoliose (seitlich), verstärkte Kyphose (Rundrucken), verstärkte Lordose (Hohlkreuz)." },
      { id: "ko_ws_h3", type: "mc", question: "An welcher Höhe des Rückenmarks endet das Rückenmark selbst beim Erwachsenen?", options: [
        { text: "Auf Höhe LWK 1–2 (Conus medullaris); danach folgt die Cauda equina", correct: true },
        { text: "Auf Höhe SWK 1 (bis zum Steissbein)", correct: false },
        { text: "Auf Höhe BWK 12 genau", correct: false },
        { text: "Das Rückenmark füllt den gesamten Wirbelkanal bis zum Os sacrum", correct: false }
      ], explanation: "Das Rückenmark endet beim Erwachsenen am Conus medullaris auf Höhe LWK 1-2. Kaudal davon verlaufen die langen Nervenwurzeln (L2-S5) als Cauda equina ('Pferdeschweif') im Liquorraum. Klinisch relevant: Lumbalpunktion unterhalb LWK 3/4 trifft keine Rückenmarkstruktur mehr." }
    ],
    bossQuestions: [{ id: "ko_ws_b1", type: "true_false", statement: "Die Wirbelsäule vereint strukturelle Stabilität durch Wirbelkörper und Bänder mit Beweglichkeit durch Bandscheiben und Gelenke, während sie gleichzeitig das Rückenmark schützt.", answer: true }],
    combatQuestions: [
      { id: "ko_ws_mc1", type: "mc", question: "Welche Funktion haben die Bandscheiben der Wirbelsäule?", options: [
        { text: "Stossdämpfung und Ermöglichung von Beweglichkeit zwischen Wirbelkörpern", correct: true },
        { text: "Knochenernährung und Blutversorgung der Wirbelkörper", correct: false },
        { text: "Ausschliesslich passive Verbindung ohne Dämpfungsfunktion", correct: false },
        { text: "Stabilisierung durch aktive Muskelkontraktion", correct: false }
      ]},
      { id: "ko_ws_mc2", type: "mc", question: "Welches Band verläuft entlang der Vorderflähe der Wirbelkörper?", options: [
        { text: "Ligamentum longitudinale anterius", correct: true },
        { text: "Ligamentum longitudinale posterius", correct: false },
        { text: "Ligamentum flavum", correct: false },
        { text: "Ligamentum interspinale", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "extremitätenskelett",
    title: "Extremitätenskelett",
    phase1: {
      soil: { statement: "Das Extremitätenskelett umfasst Schultergürtel, obere Extremität, Beckengürtel und untere Extremität.", answer: true, solution: "Das Extremitätenskelett verbindet über Gürtelsysteme die Gliedmassen mit dem Achsenskelett. Schultergürtel (Klavikula + Skapula) und Beckengürtel sind die Verbindungsstellen, über die Kräfte zwischen Rumpf und Extremitäten übertragen werden." },
      seed: { statement: "Schultergürtel und Beckengürtel haben keinen Bezug zur Kraftübertragung.", answer: false, solution: "Gurtelsysteme sind funktionell zentrale Verbindungselemente: Der Schultergürtel ermöglicht die grosse Bewegungsreichweite des Arms, der Beckengürtel überträgt das Körpergewicht auf die Beine und stabilisiert den Rumpf beim Gehen." },
      water: { statement: "Zur oberen Extremität gehören Humerus, Radius, Ulna und Handknochen; zur unteren Extremität Femur, Tibia, Fibula und Fussknochen.", answer: true, solution: "Obere Extremität: Humerus, Radius/Ulna, Hand- und Fingerknochen mit Schulter-, Ellenbogen- und Handgelenk. Untere Extremität: Femur, Tibia/Fibula, Fuss- und Zehenknochen mit Hüft-, Knie- und Sprungelenk. Jeder Abschnitt hat spezifische Gelenktypen für seinen Bewegungsumfang." }
    },
    harvestQuestions: [
      { id: "ko_ex_h1", type: "mc", question: "Welche zwei Knochen bilden den Schultergürtel?", options: [
        { text: "Klavikula (Schlüsselbein) und Skapula (Schulterblatt)", correct: true },
        { text: "Humerus und Skapula", correct: false },
        { text: "Sternum und Klavikula", correct: false },
        { text: "Skapula und erster Rippenknorpel", correct: false }
      ], explanation: "Der Schultergürtel (Cingulum membri superioris) besteht aus Klavikula und Skapula. Die Klavikula ist das einzige knöcherne Band zwischen Schultergürtel und Achsenskelett (Sternoklavikulargelenk). Die Skapula liegt dorsal am Thorax und bildet mit dem Humerus das Schultergelenk (Articulatio humeri)." },
      { id: "ko_ex_h2", type: "mc", question: "Was ist das Os coxä und woraus besteht es?", options: [
        { text: "Das Hüftbein, das aus Os ilium, Os ischii und Os pubis verwachsen ist", correct: true },
        { text: "Das Hüftbein, das aus Femur und Acetabulum besteht", correct: false },
        { text: "Ein anderer Name für den Oberschenkelknochen (Femur)", correct: false },
        { text: "Der Sakralknochen (Kreuzbein) als Teil des Beckenringes", correct: false }
      ], explanation: "Das Os coxä (Hüftbein) entsteht durch Verwachsung dreier Knochen: Os ilium (Darmbein, oben), Os ischii (Sitzbein, hinten-unten) und Os pubis (Schambein, vorne). Beide Os coxä verbinden sich vorne an der Symphyse und hinten mit dem Sacrum zu dem knöhernen Beckenring." },
      { id: "ko_ex_h3", type: "mc", question: "Welcher Knochen bildet die Verbindung zwischen Oberschenkel und Unterschenkel?", options: [
        { text: "Das Kniegelenk zwischen Femur, Tibia und Patella", correct: true },
        { text: "Die Fibula als Hauptlasttrageknochen des Unterschenkels", correct: false },
        { text: "Der Talus (Sprungbein) als Verbindung zwischen Ober- und Unterschenkel", correct: false },
        { text: "Direkter Kontakt zwischen Femur und Fibula", correct: false }
      ], explanation: "Das Kniegelenk (Art. genus) verbindet Femur (Oberschenkel), Tibia (Haupt-Lasttrageknochen des Unterschenkels) und Patella (Kniescheibe, als Sesambein im M. quadriceps-Sehne). Die Fibula bildet keine Kniegelenkfläche, sondern liegt lateral der Tibia und dient als Muskeln-Ansatz und Austauschorgan für Sprunggelenk (Malleolus lateralis)." }
    ],
    bossQuestions: [{ id: "ko_ex_b1", type: "true_false", statement: "Topographisches Denken ist im Extremitätenskelett unverzichtbar.", answer: true }],
    combatQuestions: [
      { id: "ko_ex_mc1", type: "mc", question: "Welche Knochen gehören zur unteren Extremität?", options: [
        { text: "Femur, Tibia, Fibula und Fusswurzelknochen", correct: true },
        { text: "Humerus, Radius, Ulna und Handwurzelknochen", correct: false },
        { text: "Klavikula, Skapula, Humerus und Radius", correct: false },
        { text: "Becken, Femur, Patella und Humerus", correct: false }
      ]},
      { id: "ko_ex_mc2", type: "mc", question: "Welche Knochen bilden den Schultergürte?", options: [
        { text: "Klavikula (Schlüsselbein) und Skapula (Schulterblatt)", correct: true },
        { text: "Humerus und Klavikula", correct: false },
        { text: "Skapula und Humerus", correct: false },
        { text: "Sternum und Klavikula allein", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "gelenke_grundlagen",
    title: "Gelenke: Grundlagen",
    phase1: {
      soil: { statement: "Gelenke werden grundlegend in Synarthrosen (unechte Gelenke ohne Gelenkhöhle, z.B. Schädelnäthe) und Diarthrosen (echte Gelenke mit Gelenkhöhle, Knorpel und Kapsel) eingeteilt.", answer: true, solution: "Synarthrosen (unechte Gelenke) wie Schädelnäthe oder die Symphyse erlauben kaum Bewegung und haben keine Gelenkhöhlel. Diarthrosen (echte Gelenke) besitzen eine mit Synovia gefüllte Gelenkhöhlel, einen Gelenkknorpel und eine Kapsel, was variable Bewegungen ermöglicht." },
      seed: { statement: "Synarthrosen sind die frei beweglichsten Gelenkformen.", answer: false, solution: "Freiere Beweglichkeit ist typisch für Diarthrosen." },
      water: { statement: "Die Gelenkklassifikation dient der funktionellen Bewegungszuordnung.", answer: true, solution: "Die Einteilung in Synarthrosen und Diarthrosen ist die Basis für das Verständnis aller spezifischen Gelenkformen. Aus dem Vorhandensein einer Gelenkhöhlel und dem Gelenktyp lässt sich unmittelbar ableiten, welche Bewegungen anatomisch möglich und welche blockiert sind." }
    },
    harvestQuestions: [
      { id: "ko_gk_h1", type: "mc", question: "Welche Strukturen gehören zwingend zu einem echten Gelenk (Diarthrose)?", options: [
        { text: "Gelenkknorpel, Gelenkhöhlel (mit Synovia) und Gelenkkapsel", correct: true },
        { text: "Periost, Sehnen und Muskeln", correct: false },
        { text: "Knochen, Knorpelgewebe und Muskeln ohne Gelenkhöhle", correct: false },
        { text: "Nur Gelenkknorpel – Kapsel ist optional", correct: false }
      ], explanation: "Eine Diarthrose hat als Mindestanforderung: Gelenkknorpel (schmierloses, avaskular ernährtes Gleitlager), Gelenkspalt/-höhle (gefüllt mit Synovia), Gelenkkapsel (Stratum fibrosum aussen, Membrana synovialis innen). Menisken, Disci, Bursen und extrakapsulare Bänder sind mögliche Zusatzstrukturen je nach Gelenktyp." },
      { id: "ko_gk_h2", type: "mc", question: "Was ist die Funktion der Gelenkflüssigkeit (Synovia)?", options: [
        { text: "Reibungsminderung, Nährstoffversorgung des Gelenkknorpels und Stossdämpfung", correct: true },
        { text: "Produktion von Antikörpern bei Gelenkinfektion", correct: false },
        { text: "Direkte Druckübertragung zwischen den Gelenkpartnern", correct: false },
        { text: "Mineralisation des Knorpelgewebes mit Hydroxylapatit", correct: false }
      ], explanation: "Synovia (Gelenkflüssigkeit) hat drei Funktionen: 1. Schmierung (Reibungsköffizient Gelenk < Eis auf Eis), 2. Ernährung des Gelenkknorpels durch Diffusion (avaskular!), 3. Stossdämpfung als viskö Flüssigkeit. Produziert von der Membrana synovialis. Bei Gelenkentzuendung steigt die Synoviamenge (Gelenkerguss)." },
      { id: "ko_gk_h3", type: "mc", question: "Welches ist ein Beispiel für eine Synarthrose (unechtes Gelenk)?", options: [
        { text: "Schädelnäthe (Suturä cranii)", correct: true },
        { text: "Kniegelenk (Art. genus)", correct: false },
        { text: "Schultergelenk (Art. humeri)", correct: false },
        { text: "Hüftgelenk (Art. coxä)", correct: false }
      ], explanation: "Synarthrosen erlauben kaum oder keine Bewegung. Beispiele: Schädelnäthe (Suturä: bindegewebige Verbindung beim Kind, knöhernd beim Erwachsenen), Symphyse (Faserknorpel), Syndesmose (Bindegewebe: distale Tibiofibularverbindung). Alle Diarthrosen haben eine echte Gelenkhöhle und sind frei beweglich." }
    ],
    bossQuestions: [{ id: "ko_gk_b1", type: "true_false", statement: "Ohne Synarthrose/Diarthrose-Grundschema bleiben viele Gelenkfragen unscharf.", answer: true }],
    combatQuestions: [
      { id: "ko_gk_mc1", type: "mc", question: "Was unterscheidet echte Gelenke (Diarthrosen) von unechten Gelenken (Synarthrosen)?", options: [
        { text: "Diarthrosen besitzen einen Gelenkspalt mit Gelenkflüssigkeit", correct: true },
        { text: "Synarthrosen ermöglichen die grösste Beweglichkeit", correct: false },
        { text: "Diarthrosen sind nicht von einer Gelenkkapsel umhüllt", correct: false },
        { text: "Synarthrosen kommen nur in der unteren Extremität vor", correct: false }
      ]},
      { id: "ko_gk_mc2", type: "mc", question: "Welche Struktur produziert die Gelenkflüssigkeit (Synovia)?", options: [
        { text: "Die Synovialmembran (Membrana synovialis)", correct: true },
        { text: "Das Periost", correct: false },
        { text: "Der Gelenkknorpel", correct: false },
        { text: "Das Stratum fibrosum der Gelenkkapsel", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "gelenkarten",
    title: "Gelenkarten",
    phase1: {
      soil: { statement: "Echte Gelenke werden nach der Form ihres Gelenkkopfes eingeteilt: Kugelgelenk (3 Bewegungsachsen, z.B. Schulter), Scharniergelenk (1 Achse, z.B. Knie) und Sattelgelenk (2 Achsen, z.B. Daumen).", answer: true, solution: "Echte Gelenke werden nach Gelenkkopf-Form und Bewegungsmöglichkeit eingeteilt: Kugelgelenk (3 Achsen, z.B. Schulter), Scharniergelenk (1 Achse, z.B. Knie), Sattelgelenk (2 Achsen, z.B. Daumensattelgelenk). Jede Gelenkform erlaubt bestimmte Bewegungsrichtungen und begrenzt andere." },
      seed: { statement: "Gelenkarten unterscheiden sich nur namentlich, nicht in Bewegungsmöglichkeiten.", answer: false, solution: "Gelenkform und Bewegungsumfang sind direkt verknüpft: Das Kugelgelenk (z.B. Schulter) erlaubt Bewegungen in alle drei Raumachsen, das Scharniergelenk (z.B. Knie) nur Flexion und Extension um eine Achse. Die Form ist also der anatomische Ausdruck der Bewegungsfunktion." },
      water: { statement: "Die Gelenkform ist ein Schlüssel zur Ableitung möglicher Bewegungen.", answer: true, solution: "Das Schultergelenk ist als Kugelgelenk in alle Richtungen beweglich, das Kniegelenk als Scharniergelenk nur in Beugung/Streckung. Aus der Gelenkform lässt sich also direkt ableiten, welche Bewegungen anatomisch möglich sind und welche blockiert werden." }
    },
    harvestQuestions: [
      { id: "ko_ga_h1", type: "mc", question: "Wie viele Bewegungsachsen hat ein Sattelgelenk und welches ist ein klassisches Beispiel?", options: [
        { text: "Zwei Achsen (biaxial); Beispiel: Daumensattelgelenk (Art. carpometacarpalis pollicis)", correct: true },
        { text: "Drei Achsen; Beispiel: Schultergelenk", correct: false },
        { text: "Eine Achse; Beispiel: Kniegelenk", correct: false },
        { text: "Keine Achsen; dient nur der Stossdämpfung", correct: false }
      ], explanation: "Das Sattelgelenk (Articulatio sellaris) hat zwei konvex-konkave Gelenkflächen (sattelförmig), die zwei Bewegungsachsen erlauben: Flexion/Extension + Abduktion/Adduktion. Das klassische Beispiel ist das Daumensattelgelenk, das die Opposition des Daumens (Greifen) ermöglicht. Kein axiales Gleiten/Rotation möglich." },
      { id: "ko_ga_h2", type: "mc", question: "Was unterscheidet das Kugelgelenk der Schulter vom Kugelgelenk der Hüft in Bezug auf Stabilität und Mobilität?", options: [
        { text: "Schulter: flache Pfanne = grössere Mobilität, aber weniger Stabilität; Hüft: tiefe Pfanne = stabiler, aber weniger mobil", correct: true },
        { text: "Schulter und Hüft sind vollständig identisch in Form und Stabilität", correct: false },
        { text: "Hüft: grössere Mobilität als Schulter; Schulter: stabiler durch Acetabulum", correct: false },
        { text: "Schulter hat mehr Freiheitsgrade als Hüft, daher auch stabiler", correct: false }
      ], explanation: "Schultergelenk: flache Pfanne (Cavitas glenoidalis), Kopf überragt Pfanne 3:1 → grösste Mobilität des Körpers (3 Achsen, 6 Freiheitsgrade), aber Stabilisierung abhängig von Rotatorenmanschette und Bändern. Hüftgelenk: tiefe Pfanne (Acetabulum umschliessen den Kopf zu 2/3) → Stabilität für Lastaufnahme, weniger Bewegungsumfang." },
      { id: "ko_ga_h3", type: "mc", question: "Ein Zapfengelenk (Radgelenk) erlaubt welche Bewegung?", options: [
        { text: "Nur Rotation um die Längsachse des Knochens", correct: true },
        { text: "Flexion und Extension um eine Querachse", correct: false },
        { text: "Abduktion und Adduktion in der Frontalebene", correct: false },
        { text: "Alle Bewegungen wie ein Kugelgelenk", correct: false }
      ], explanation: "Das Zapfengelenk (Articulatio trochoidea) hat einen zylindrischen Zapfen, der in einem Knochenring dreht – nur Rotation um die Längsachse ist möglich (uniaxial). Beispiele: proximales und distales Radioulnargelenk (Unterarmdrehung: Pronation/Supination), Atlantoaxialgelenk (Kopfrotation)." }
    ],
    bossQuestions: [{ id: "ko_ga_b1", type: "true_false", statement: "Gelenkarten verbinden morphologische Form mit biomechanischer Funktion.", answer: true }],
    combatQuestions: [
      { id: "ko_ga_mc1", type: "mc", question: "Welches Gelenk erlaubt Bewegungen in allen Raumebenen (mehrachsig)?", options: [
        { text: "Kugelgelenk (z. B. Schultergelenk)", correct: true },
        { text: "Scharniergelenk (z. B. Kniegelenk)", correct: false },
        { text: "Zapfengelenk (z. B. proximales Radioulnargelenk)", correct: false },
        { text: "Eigelenk (z. B. Handgelenk)", correct: false }
      ]},
      { id: "ko_ga_mc2", type: "mc", question: "Welchem Gelenktyp entspricht das Kniegelenk hauptsächlich?", options: [
        { text: "Scharniergelenk (Ginglymus)", correct: true },
        { text: "Kugelgelenk", correct: false },
        { text: "Sattelgelenk", correct: false },
        { text: "Amphiarthrose", correct: false }
      ]}
    ]
  })
];

const MUSKELLEHRE_1034_PLANTS = [
  makeDetailedPlant({
    id: "allgemeine_muskellehre",
    title: "Allgemeine Muskellehre",
    phase1: {
      soil: { statement: "Muskeln gehören zum aktiven Bewegungsapparat und erzeugen Bewegung durch Kontraktion.", answer: true, solution: "Muskeln erzeugen Bewegung durch die Verkürzung (Kontraktion) ihrer Fasern, ausgelöst durch nervale Erregung an der motorischen Endplatte. Im Gegensatz zum passiven Bewegungsapparat (Knochen, Bänder) können Muskeln aktiv Kraft aufbauen und damit Gelenke bewegen und stabilisieren." },
      seed: { statement: "Muskeln stabilisieren Gelenke nur passiv und ohne aktive Spannung.", answer: false, solution: "Muskeln sichern Gelenke über aktive Kraftentwicklung." },
      water: { statement: "Muskelarbeit ist neben Bewegung auch für Haltung und Wärmebildung relevant.", answer: true, solution: "Neben der Bewegungserzeugung hat Skelettmuskulatur zwei weitere wichtige Aufgaben: Gelenkstabilisierung durch aktiven Muskeltonus und Wärmeproduktion durch den Energiestoffwechsel bei Kontraktion. Bis zu 70 % der Körpereigenwärme wird durch Muskelaktivität erzeugt." }
    },
    harvestQuestions: [
      { id: "mu_allg_h1", type: "mc", question: "Welcher Anteil der Körpereigenwärme wird durch Muskelarbeit erzeugt?", options: [
        { text: "Bis zu 70% der Körpereigenwärme stammt aus Muskelaktivität", correct: true },
        { text: "Weniger als 10% – Hauptwärmequelle ist die Leber", correct: false },
        { text: "Exakt 50% – Muskel und Leber teilen sich die Wärmeproduktion gleichmässig", correct: false },
        { text: "Muskeln produzieren keine Wärme, sondern nur Bewegung", correct: false }
      ], explanation: "Skelettmuskeln sind der grösste Wärmeproduzent des Körpers: Bei Muskelkontraktion werden ca. 70-75% der freigesetzten chemischen Energie als Wärme abgegeben, nur 25-30% für mechanische Arbeit genutzt. Das erklärt, warum körperliche Aktivität bei Kälte wärmt und warum Fieber oft mit Muskelzittern einhergeht." },
      { id: "mu_allg_h2", type: "mc", question: "Was bezeichnet man als 'aktiven' im Unterschied zum 'passiven' Bewegungsapparat?", options: [
        { text: "Aktiv = Muskeln (Kraft erzeugend); passiv = Knochen, Bänder, Gelenkkapseln (Kraft übertragend/begrenzend)", correct: true },
        { text: "Aktiv = alle willkürlichen Bewegungen; passiv = alle Reflexbewegungen", correct: false },
        { text: "Aktiv = obere Extremität; passiv = untere Extremität", correct: false },
        { text: "Aktiv und passiv sind nur unterschiedliche Bezeichnungen für dasselbe", correct: false }
      ], explanation: "Passiver Bewegungsapparat: Knochen (Hebel), Bänder (Führung/Begrenzung), Gelenkkapseln (Sicherung) – können selbst keine Kraft erzeugen. Aktiver Bewegungsapparat: Skelettmuskulatur – kann durch Kontraktion aktiv Kräfte entwickeln und Gelenke bewegen. Beide Systeme arbeiten zusammen: Ohne passiven Apparat keine koordinierte Kraftübertragung." },
      { id: "mu_allg_h3", type: "mc", question: "Welches molekulare Prinzip liegt allen Muskelkontraktionen (Skelett, Herz, glatt) zugrunde?", options: [
        { text: "Gleitfilamentmechanismus: ATP-getriebenes Gleiten von Aktin und Myosin", correct: true },
        { text: "Quellungsreaktion von Proteinen durch Wasseraufnahme", correct: false },
        { text: "Elektrostatische Anziehung der Zellmembranen", correct: false },
        { text: "Enzymatische Spaltung von Kollagenfasern durch Proteasen", correct: false }
      ], explanation: "Der Gleitfilamentmechanismus (Huxley, 1954) ist das universelle Prinzip aller Muskulatur: Myosinköpfe binden ATP, hydrolysieren es, bewegen sich ('Power Stroke') und ziehen das Aktinfilament. Das Sarkomer verkürzt sich, ohne dass die Filamente selbst kürzer werden. Dieses Prinzip gilt für Skelett-, Herz- und glatte Muskulatur gleichermassen." }
    ],
    bossQuestions: [{ id: "mu_allg_b1", type: "true_false", statement: "Allgemeine Muskellehre verbindet Bewegung, Stabilisierung und Stoffwechselbezug.", answer: true }],
    combatQuestions: [
      { id: "mu_allg_mc1", type: "mc", question: "Welche Funktion hat die Skelettmuskulatur NEBEN der Bewegungserzeugung?", options: [
        { text: "Wärmebildung und Gelenkstabilisierung", correct: true },
        { text: "Filtration von Blut", correct: false },
        { text: "Produktion von Hormonen", correct: false },
        { text: "Gasaustausch in der Lunge", correct: false }
      ]},
      { id: "mu_allg_mc2", type: "mc", question: "Womit kontrahiert der Skelettmuskel auf molekularer Ebene?", options: [
        { text: "Durch Verkürzung der Sarkomere über Aktin-Myosin-Wechselwirkung", correct: true },
        { text: "Durch Quellung von Bindegewebe im Muskel", correct: false },
        { text: "Durch elektrische Ladungsverschiebung ohne Strukturänderung", correct: false },
        { text: "Durch passive Dehnung der Muskelfasern", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "muskelaufbau",
    title: "Aufbau des Muskels",
    phase1: {
      soil: { statement: "Der Skelettmuskel ist hierarchisch organisiert, von Muskel über Faserbündel bis zur Muskelfaser.", answer: true, solution: "Der Skelettmuskel ist hierarchisch aufgebaut: Das Epimysium umhüllt den gesamten Muskel, das Perimysium einzelne Muskelfaserbündel und das Endomysium einzelne Muskelfasern. Diese Bindegewebsschichten bieten Schutz, ermöglichen Gleitbewegungen und enthalten Blutgefässe und Nerven." },
      seed: { statement: "Muskelfasern enthalten keine spezialisierten kontraktilen Strukturen.", answer: false, solution: "Myofibrillen mit Aktin/Myosin sind zentral für die Kontraktion." },
      water: { statement: "Bindegewebige Hülle und Gefäss-Nerven-Versorgung sind Teil des Muskelaufbaus.", answer: true, solution: "Der Muskel als Organ beinhaltet mehr als nur Muskelfasern: Bindegewebshüllen (Epi-/Peri-/Endomysium) schützen und trennen die Faserbündel, Blutgefässe versorgen die Muskelfasern mit O2 und Nährstoffen, und Nervenfasern übertragen die motorischen Impulse zur Kontraktion." }
    },
    harvestQuestions: [
      { id: "mu_auf_h1", type: "mc", question: "Welche Bindegewebshüllen umgeben den Skelettmuskel auf verschiedenen Ebenen?", options: [
        { text: "Epimysium (Muskel gesamt), Perimysium (Faserbündel), Endomysium (Einzelfaser)", correct: true },
        { text: "Periost (aussen), Endost (innen) und Perichondrium (Mitte)", correct: false },
        { text: "Faszie (Muskel), Tendon (Faserbündel), Sarkolemm (Filamente)", correct: false },
        { text: "Epineurium, Perineurium und Endoneurium", correct: false }
      ], explanation: "Die drei Bindegewebshüllen des Skelettmuskels: Epimysium – umhüllt den gesamten Muskel (entspricht der Faszie); Perimysium – umhüllt Muskelfaserbündel (Faszikel); Endomysium – umhüllt jede einzelne Muskelfaser und enthält Kapillaren und Nervenendigungen. Alle drei laufen in die Sehne zusammen und übertragen die Kontraktionskraft auf den Knochen." },
      { id: "mu_auf_h2", type: "mc", question: "Was ist ein Sarkomer und wo beginnt und endet es?", options: [
        { text: "Die kleinste kontraktile Einheit des Muskels; von Z-Scheibe zu Z-Scheibe", correct: true },
        { text: "Eine einzelne Myofibrille; von M-Linie zu M-Linie", correct: false },
        { text: "Ein Muskelfaserbündel; entspricht einer motorischen Einheit", correct: false },
        { text: "Das gesamte Sarkoplasmatische Retikulum einer Muskelfaser", correct: false }
      ], explanation: "Das Sarkomer ist die Grundeinheit der Kontraktion und liegt zwischen zwei Z-Scheiben (Z = Zwischenscheibe). Aufbau: I-Bande (nur Aktin, hell), A-Bande (Myosin + Aktin überlappend, dunkel), H-Zone (nur Myosin, mittig), M-Linie (Verankerung der Myosinfilamente). Bei Kontraktion verschwindet die H-Zone und die Z-Scheiben nähern sich an." },
      { id: "mu_auf_h3", type: "mc", question: "Wie wird die Kontraktionskraft eines Muskels von der Muskelfaser auf den Knochen übertragen?", options: [
        { text: "Über Myofibrillen → Endomysium → Perimysium → Epimysium → Sehne → Knochen", correct: true },
        { text: "Direkt über die Zellmembran (Sarkolemm) in den Knochen ohne Bindegewebe", correct: false },
        { text: "Über Nerven, die die Kontraktion auf den Knochen übertragen", correct: false },
        { text: "Nur über das Periost des Ursprungsknochens ohne Sehne", correct: false }
      ], explanation: "Die mechanische Kraftkette: Myofibrillen verkürzen das Sarkomer → Kraft wird auf Sarkolemm übertragen → Endomysium bündelt Einzelfaserkräfte → Perimysium bündelt Faserbündel → Epimysium leitet in Sehne → Sehne verankert am Periost des Knochens. Die Bindegewebshüllen sind nicht nur Schutz, sondern essenzielle Kraftübertragungsstrukturen." }
    ],
    bossQuestions: [{ id: "mu_auf_b1", type: "true_false", statement: "Ein belastbares Muskelverständnis braucht Makro- und Mikroaufbau gemeinsam.", answer: true }],
    combatQuestions: [
      { id: "mu_auf_mc1", type: "mc", question: "In welcher Reihenfolge ist der Skelettmuskel hierarchisch aufgebaut?", options: [
        { text: "Muskel → Muskelfaserbündel → Muskelfaser → Myofibrille → Sarkomer", correct: true },
        { text: "Myofibrille → Muskelfaser → Muskelfaserbündel → Muskel → Sarkomer", correct: false },
        { text: "Sarkomer → Muskel → Myofibrille → Muskelfaser", correct: false },
        { text: "Muskel → Myofibrille → Muskelfaserbündel → Sarkomer", correct: false }
      ]},
      { id: "mu_auf_mc2", type: "mc", question: "Wie heisst die Bindegewebshülle, die den gesamten Muskel umhüllt?", options: [
        { text: "Epimysium", correct: true },
        { text: "Perimysium", correct: false },
        { text: "Endomysium", correct: false },
        { text: "Epineurium", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "funktionelle_charakteristika",
    title: "Funktionelle Charakteristika",
    phase1: {
      soil: { statement: "Erregbarkeit, Kontraktilität, Dehnbarkeit und Elastizität sind grundlegende Muskel-Eigenschaften.", answer: true, solution: "Diese vier Eigenschaften ermöglichen erst die normale Muskelfunktion: Erregbarkeit (Empfang nervaler Reize), Kontraktilität (aktive Kraftentwicklung), Dehnbarkeit (passive Längenveränderung ohne Schaden) und Elastizität (Rückkehr zur Ausgangslange nach Dehnung)." },
      seed: { statement: "Ein Muskel muss weder erregbar noch elastisch sein, um physiologisch zu arbeiten.", answer: false, solution: "Ohne Erregbarkeit kann ein Muskel keinen Nervenreiz empfangen und keine Kontraktion einleiten – Bewegung wäre unmöglich. Ohne Elastizität könnte er nach einer Dehnung nicht in seine Ausgangslage zurückkehren, was zu dauerhafter Verkürzung und Funktionsverlust führen würde." },
      water: { statement: "Isometrische und isotonische Arbeitsweisen gehören zur funktionellen Betrachtung.", answer: true, solution: "Bei isometrischer Arbeit kontrahiert der Muskel ohne Längenänderung (z.B. Halten einer Last), bei isotonischer Arbeit verändert er seine Länge bei gleichbleibender Spannung (z.B. Heben einer Last). Diese Unterscheidung erklärt, warum verschiedene Belastungsformen unterschiedlich trainierbar sind." }
    },
    harvestQuestions: [
      { id: "mu_fk_h1", type: "mc", question: "Was unterscheidet konzentrische von exzentrischer Muskelarbeit?", options: [
        { text: "Konzentrisch: Muskel verkürzt sich bei Kraftentwicklung; exzentrisch: Muskel verlängert sich bei Kraftentwicklung (abbremsendes Kontrahieren)", correct: true },
        { text: "Konzentrisch = isometrisch; exzentrisch = isotonisch", correct: false },
        { text: "Exzentrisch bedeutet, der Muskel kontrahiert gegen Widerstand ohne Längenveränderung", correct: false },
        { text: "Konzentrisch und exzentrisch sind Synonyme für denselben Vorgang", correct: false }
      ], explanation: "Konzentrische Arbeit: Muskel verkürzt sich, erzeugte Kraft übersteigt die Last (z.B. Arm heben = M. biceps konzentrisch). Exzentrische Arbeit: Muskel verlängert sich kontrolliert unter Spannung, Last übersteigt die Muskelkraft (z.B. Arm senken = M. biceps exzentrisch). Exzentrische Arbeit erzeugt mehr Mikrotraumen (Muskelkater!) und ist metabolisch effizienter." },
      { id: "mu_fk_h2", type: "mc", question: "Was ist das Kraft-Längen-Verhältnis des Muskels?", options: [
        { text: "Ein Muskel entwickelt die maximale Kraft bei optimaler Vordehnungslänge (Ruhelänge) – zu kurz oder zu lang reduziert die Kraft", correct: true },
        { text: "Je kürzer ein Muskel, desto mehr Kraft kann er entwickeln", correct: false },
        { text: "Die Kraft ist unabhängig von der aktüllen Muskellänge", correct: false },
        { text: "Je länger ein Muskel ist, desto stärker kontrahiert er", correct: false }
      ], explanation: "Das Kraft-Längen-Diagramm zeigt: maximale Kraft bei Ruhelänge (optimale Aktin-Myosin-Überlappung im Sarkomer). Bei starker Verkürzung: Myosinfilamente stossen an Z-Scheiben, weniger effektive Querbrücken. Bei starker Dehnung: minimale Aktin-Myosin-Überlappung. Klinisch relevant: Kontraktur-Muskeln können keine Kraft bei normaler Gelenklage entwickeln." },
      { id: "mu_fk_h3", type: "mc", question: "Was beschreibt die Kraft-Frequenz-Beziehung bei Muskelkontraktion?", options: [
        { text: "Mit steigender Stimulationsfrequenz steigt die Muskelkraft: Einzelzuckung → Tetanus (vollständiger oder unvollständiger)", correct: true },
        { text: "Mit steigender Frequenz sinkt die Kraft durch Ermüdung sofort", correct: false },
        { text: "Frequenz hat keinen Einfluss auf die Muskelkraft – nur die Amplitude zählt", correct: false },
        { text: "Bei Tetanus ist die Kraft geringer als bei Einzelzuckungen", correct: false }
      ], explanation: "Einzelzuckung: ein Aktionspotential → kurze Kontraktion. Bei schneller Folge (unvollständiger Tetanus): Kontraktionen summieren sich (Treppe). Bei hoher Frequenz (vollständiger Tetanus): die Einzelzuckungen verschmelzen zur glatten Dauerkontrak­tion mit maximaler Kraft. Tetanische Kontraktionen sind 3-4x stärker als Einzelzuckungen." }
    ],
    bossQuestions: [{ id: "mu_fk_b1", type: "true_false", statement: "Muskeleigenschaften erklären, warum gleiche Lasten unterschiedlich verarbeitet werden.", answer: true }],
    combatQuestions: [
      { id: "mu_fk_mc1", type: "mc", question: "Was beschreibt isometrische Muskelarbeit?", options: [
        { text: "Kraftentfaltung bei gleichbleibender Muskellänge (ohne Bewegung)", correct: true },
        { text: "Kraftentfaltung mit gleichbleibender Muskelspannung", correct: false },
        { text: "Erschlaffung des Muskels ohne Kraftentfaltung", correct: false },
        { text: "Passive Dehnung des Muskels durch äussere Kraft", correct: false }
      ]},
      { id: "mu_fk_mc2", type: "mc", question: "Was versteht man unter Kontraktilität des Muskels?", options: [
        { text: "Die Fähigkeit, aktiv Kraft zu entwickeln und sich zu verkürzen", correct: true },
        { text: "Die Fähigkeit, passiv gedehnt zu werden", correct: false },
        { text: "Die Fähigkeit zur elektrischen Selbsterregung", correct: false },
        { text: "Die Fähigkeit zur schnellen Erschlaffung nach Kontraktion", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "innervation_skelettmuskulatur",
    title: "Innervation der Skelettmuskulatur",
    phase1: {
      soil: { statement: "Skelettmuskeln werden über motorische Nervenfasern innerviert.", answer: true, solution: "Die nervale Ansteuerung ist Voraussetzung für willkürliche Bewegung." },
      seed: { statement: "Ohne neuromuskuläre Übertragung kann ein Skelettmuskel normal kontrahieren.", answer: false, solution: "Die motorische Endplatte ist für die Auslösung der Kontraktion erforderlich." },
      water: { statement: "Motorische Einheit bedeutet: ein Motoneuron und alle von ihm versorgten Muskelfasern.", answer: true, solution: "Die motorische Einheit ist die kleinste Steuerungseinheit des Muskels: Ein Motoneuron kann wenige (Feinmotorik, z.B. Augenmuskel: ~5 Fasern) bis tausende Muskelfasern (Grobmotorik, z.B. Beinmuskeln) versorgen. Je kleiner die Einheit, desto präziser die Dosierbarkeit der Kraft." }
    },
    harvestQuestions: [
      { id: "mu_in_h1", type: "mc", question: "Welcher Neurotransmitter wird an der motorischen Endplatte ausgeschüttet und an welchen Rezeptoren bindet er?", options: [
        { text: "Acetylcholin (ACh) – bindet an nikotinische ACh-Rezeptoren der Muskelfaser", correct: true },
        { text: "Noradrenalin – bindet an adrenerge Rezeptoren", correct: false },
        { text: "Glutamat – bindet an NMDA-Rezeptoren", correct: false },
        { text: "GABA – bindet an GABA-A-Rezeptoren und hemmt die Kontraktion", correct: false }
      ], explanation: "An der neuromuskulären Synapse (motorische Endplatte) wird Acetylcholin (ACh) aus prasynaptischen Vesikeln ausgeschüttet. ACh bindet an nikotinische ACh-Rezeptoren (nAChR) auf dem Sarkolemm → Na+-Einstrom → Endplattenpotential → Aktionspotential → Kontraktion. Curare blockiert nAChR (Pfeilgift/Anästhesie). Acetylcholinesterase spaltet ACh sofort nach der Bindung." },
      { id: "mu_in_h2", type: "mc", question: "Was ist Innervationsverhältnis und was sagt es über die Muskelpräzision aus?", options: [
        { text: "Anzahl der Muskelfasern pro Motoneuron: klein (z.B. 5:1 Augenmuskel) = präzise; gross (z.B. 1000:1 M. gastrocnemius) = kraftvoll aber grob", correct: true },
        { text: "Anzahl der Motoneuronen pro Muskel: mehr Neuronen = mehr Kraft", correct: false },
        { text: "Das Verhältnis von Agonist zu Antagonist in einem Gelenk", correct: false },
        { text: "Die Anzahl der Synapsen pro Nervenendigung an der Endplatte", correct: false }
      ], explanation: "Innervationsverhältnis = Anzahl Muskelfasern / Motoneuron. Kleine Einheiten (Augenmuskel ~3-5 Fasern): maximale Feinmotorik. Grosse Einheiten (M. gastrocnemius bis 2000 Fasern): viel Kraft, wenig Präzision. Das Nervensystem dosiert Kraft durch 'Rekrutierung' (mehr Einheiten) und 'Feuerrate' (höhere Frequenz) – beide Mechanismen erhöhen die Muskelkraft." },
      { id: "mu_in_h3", type: "mc", question: "Was löst die Weiterleitung des Aktionspotentials in der Muskelfaser ins Innere aus?", options: [
        { text: "T-Tubuli leiten das AP in die Tiefe → Kalziumfreisetzung aus dem Sarkoplasmatischen Retikulum", correct: true },
        { text: "Das AP breitet sich nur auf der Zelloberflähe aus und erreicht nicht die Myofibrillen", correct: false },
        { text: "Direkte Nervenstimulation jeder einzelnen Myofibrille durch Nervenfasern", correct: false },
        { text: "Kalziumeinstrom aus dem extrazellulärem Raum durch spannungsgesteuerte Kanäle", correct: false }
      ], explanation: "Die T-Tubuli (Einstülpungen des Sarkolemms) leiten das Aktionspotential tief in die Muskelfaser bis zu den Myofibrillen. An den Triaden (T-Tubulus + zwei SR-Terminals) löst das AP die Ca2+-Freisetzung aus dem Sarkoplasmatischen Retikulum (SR) aus. Ca2+ bindet an Troponin C → Tropomyosin verschiebt sich → Aktinbindungsstellen frei → Querbrückenzyklus startet." }
    ],
    bossQuestions: [{ id: "mu_in_b1", type: "true_false", statement: "Nervenansteuerung und Muskelantwort müssen als funktionelle Einheit gelernt werden.", answer: true }],
    combatQuestions: [
      { id: "mu_in_mc1", type: "mc", question: "Was versteht man unter einer motorischen Einheit?", options: [
        { text: "Ein Motoneuron und alle von ihm versorgten Muskelfasern", correct: true },
        { text: "Ein Muskel mit all seinen Nerven und Gefässen", correct: false },
        { text: "Die Gesamtheit aller Motoneuronen im Rückenmark", correct: false },
        { text: "Eine einzelne Muskelfaser mit ihrem Zellkern", correct: false }
      ]},
      { id: "mu_in_mc2", type: "mc", question: "An welcher Struktur wird die nervale Erregung auf die Muskelfaser übertragen?", options: [
        { text: "An der motorischen Endplatte (neuromuskuläre Synapse)", correct: true },
        { text: "Im Spinalganglion", correct: false },
        { text: "An der Ranvierschen Schnürring", correct: false },
        { text: "Im Muskelspindel", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "ernährungsphysiologie",
    title: "Ernährungsphysiologie",
    phase1: {
      soil: { statement: "Muskelarbeit benötigt kontinuierliche Energiebereitstellung aus verschiedenen Stoffwechselwegen.", answer: true, solution: "ATP-Bereitstellung ist Kernpunkt der Ernährungsphysiologie im Muskelkontext." },
      seed: { statement: "Die Energieversorgung der Muskulatur ist unabhängig von Sauerstoffverfügbarkeit.", answer: false, solution: "Aerobe und anaerobe Prozesse unterscheiden sich funktionell deutlich." },
      water: { statement: "Belastungsdauer und Intensität beeinflussen, welche Energiesysteme dominieren.", answer: true, solution: "Kurze intensive Belastung (Sprint) nutzt primär anaerobe Systeme (Kreatinphosphat, Glykolyse), längere moderate Belastung (Ausdauer) setzt zunehmend auf aerobe Fettverbrennung. Dieses Umschalten erklärt, warum Ermüdung und Laktatanstieg bei verschiedenen Belastungsarten unterschiedlich verlaufen." }
    },
    harvestQuestions: [
      { id: "mu_er_h1", type: "mc", question: "Wie lange liefert das Kreatinphosphatsystem (anaerob-alaktazid) Energie?", options: [
        { text: "Ca. 6–10 Sekunden (für maximale Kraftstösse wie Sprint oder Gewichtheben)", correct: true },
        { text: "Ca. 2–4 Minuten (für mittlere Belastungen)", correct: false },
        { text: "Unbegrenzt, solange Fettsäuren verfügbar sind", correct: false },
        { text: "30–90 Sekunden (entspricht der Glykolyse-Dauer)", correct: false }
      ], explanation: "Das Kreatinphosphatsystem (Phosphagensystem): Kreatinphosphat (KP) überträgt sofort Phosphatgruppe auf ADP → ATP. Reaktion: KP + ADP → Kreatin + ATP. Kapazität: 6–10 Sekunden maximaler Intensität. Kein Laktat (alaktazid). Nach dem Sprint wird KP in der Erholungsphase durch aerobe Oxidation nachgeladen (Sauerstoffschuld)." },
      { id: "mu_er_h2", type: "mc", question: "Welche Substrate werden vorrangig bei Ausdauerbelastungen (>30 Minuten, niedriger Intensität) verbrannt?", options: [
        { text: "Fettsäuren (Betaoxidation) – liefern mehr ATP pro Mol, aber langsamer als Kohlenhydrate", correct: true },
        { text: "Ausschliesslich Glukose aus Blutglukose", correct: false },
        { text: "Kreatinphosphat – unbegrenzte Reserve im Muskel", correct: false },
        { text: "Proteine (Aminosäuren) als Hauptenergiequelle", correct: false }
      ], explanation: "Bei langen, moderaten Belastungen: Fettsäuren dominieren. Fettsäuren liefern mehr ATP pro Mol (z.B. Palmitinsäure: 129 ATP) als Glukose (38 ATP), aber langsamer (benötigter O2-Verbrauch höher pro ATP). Bei intensiver Belastung wird auf Kohlenhydrate umgeschaltet (glykolytisch). Dieses Substrat-Umschalten erklärt den 'Fettverbrennungspuls' im Ausdauertraining." },
      { id: "mu_er_h3", type: "mc", question: "Was ist der Laktat-Schwellenwert (anaerobe Schwelle) und welche physiologische Bedeutung hat er?", options: [
        { text: "Die Intensität, bei der die Laktatproduktion die -elimination übersteigt: oberhalb steigt der Laktatgehalt schnell an", correct: true },
        { text: "Die maximale Sauerstoffaufnahme (VO2max) des Athleten", correct: false },
        { text: "Die minimale Belastung, bei der der Muskel beginnt ATP zu verbrauchen", correct: false },
        { text: "Der Punkt, an dem Glukose vollständig durch Fette ersetzt wird", correct: false }
      ], explanation: "Anaerobe Schwelle: Unterhalb → Laktat wird produziert und abgebaut (Gleichgewicht). Oberhalb → Laktat steigt exponentiell an (pH sinkt, Enzymhemmung, Ermüdung). Trainierte Ausdauersportler haben eine höhere Schwelle, weil ihre Muskeln mehr Typ-I-Fasern (aerob) und mehr Mitochondrien haben. Klinische Relevanz: Laktatmessung bei Belastungstests." }
    ],
    bossQuestions: [{ id: "mu_er_b1", type: "true_false", statement: "Muskelfunktion lässt sich ohne Grundlagen der Energiebereitstellung nicht sicher erklären.", answer: true }],
    combatQuestions: [
      { id: "mu_er_mc1", type: "mc", question: "Was ist die direkte Energiequelle der Muskelkontraktion?", options: [
        { text: "ATP (Adenosintriphosphat)", correct: true },
        { text: "Glukose", correct: false },
        { text: "Fettsäuren", correct: false },
        { text: "Laktat", correct: false }
      ]},
      { id: "mu_er_mc2", type: "mc", question: "Was entsteht bei intensiver anaerober Belastung als Stoffwechselprodukt?", options: [
        { text: "Laktat (Milchsäure)", correct: true },
        { text: "Harnstoff", correct: false },
        { text: "Glukose als Endprodukt", correct: false },
        { text: "Sauerstoff", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "muskelarten",
    title: "Muskelarten",
    phase1: {
      soil: { statement: "Unterschieden werden Skelett-, Herz- und glatte Muskulatur mit jeweils eigenen Eigenschaften.", answer: true, solution: "Die drei Muskeltypen unterscheiden sich in Histologie, Steuerung und Vorkommen: Skelettmuskulatur (quergestreift, willkürlich, Bewegungsapparat), glatte Muskulatur (keine Streifung, unwillkürlich, Hohlorgane) und Herzmuskulatur (quergestreift, unwillkürlich, nur das Herz)." },
      seed: { statement: "Herzmuskulatur gehört funktionell zur glatten Muskulatur.", answer: false, solution: "Herzmuskulatur ist histologisch quergestreift (wie Skelettmuskulatur), aber unwillkürlich gesteuert (wie glatte Muskulatur). Darüber hinaus besitzt sie funktionelle Syncytium-Eigenschaften durch Gap Junctions sowie automatische Schrittmacherzellen – Merkmale, die sie als eigenständige Muskelklasse auszeichnen." },
      water: { statement: "Skelettmuskulatur ist willkürlich steuerbar, glatte Muskulatur überwiegend nicht.", answer: true, solution: "Skelettmuskulatur wird durch somatische Motoneuronen gesteuert und unterliegt dem bewussten Willen. Glatte Muskulatur (Darm, Gefässe) wird durch das autonome Nervensystem und Hormone reguliert – das erklärt, warum wir Verdauungsbewegungen oder Gefässweite nicht direkt willentlich kontrollieren können." }
    },
    harvestQuestions: [
      { id: "mu_art_h1", type: "mc", question: "Welche Muskeleigenschaft ist spezifisch für die Herzmuskulatur und unterscheidet sie von Skelett- UND glatter Muskulatur?", options: [
        { text: "Automatismus: Herzmuskelzellen können autonom Aktionspotentiale generieren (Schrittmacher)", correct: true },
        { text: "Querstreifung – fehlt bei glatter Muskulatur und Herz", correct: false },
        { text: "Willkürliche Steuerung durch somatische Motoneuronen", correct: false },
        { text: "Kernlage peripher – wie in Skelettmuskel, nicht wie glatte Muskulatur", correct: false }
      ], explanation: "Herzmuskel-spezifische Eigenschaft: Automatismus (Autorhythmizität). Spezialisierte Herzmuskelzellen (Sinusknoten, AV-Knoten) generieren autonom Aktionspotentiale ohne externe Nerveninnervation. Skelettmuskel: kein Automatismus (braucht Motoneuron). Glatte Muskulatur: teils autonom (Darmnervensystem), aber nicht so ausgeprägt. Disci intercalares + Gap Junctions ermöglichen die synchrone Erregungsausbreitung." },
      { id: "mu_art_h2", type: "mc", question: "Warum verlauft die Kontraktion glatter Muskulatur langsamer als Skelettmuskulatur?", options: [
        { text: "Glatte Muskulatur hat langsamere Myosin-Isoformen (MLCK-Regulation statt Troponin-Regulation)", correct: true },
        { text: "Glatte Muskulatur hat weniger ATP als Skelettmuskulatur", correct: false },
        { text: "Glatte Muskulatur hat keine Myosinfilamente und kontrahiert anders", correct: false },
        { text: "Die Querstreifung fehlt, daher keine Sarkomerverkürzung möglich", correct: false }
      ], explanation: "Regulationsunterschied: Skelettmuskel → Troponin-Tropomyosin-System (schnell, Ca2+-empfindlich). Glatte Muskulatur → Myosin-Leichtketten-Kinase (MLCK) phosphoryliert Myosin nach Ca2+-Calmodulin-Aktivierung (langsamer). Glatte Muskulatur nutzt den 'Latchzustand' für Dauerkontraktionen mit sehr wenig ATP – ideal für Gefässtonus und Darmperistaltik." },
      { id: "mu_art_h3", type: "mc", question: "Warum haben Skelettmuskelfasern randständige Kerne, Herzmuskelzellen aber nur einen zentralen Kern?", options: [
        { text: "Skelettmuskelfasern sind mehrkernige Synzytien (aus Myoblastenfusion), Herzmuskelzellen sind echte Einzelzellen mit einem Kern", correct: true },
        { text: "Beides sind Synzytien, nur die Kernlage ist eine Zufälligkeit der Entwicklung", correct: false },
        { text: "Herzmuskelzellen sind kernlos wie Erythrozyten", correct: false },
        { text: "Skelettmuskeln haben zentrale Kerne, Herzmuskelzellen haben randständige", correct: false }
      ], explanation: "Skelettmuskelfasern entstehen durch Fusion vieler Myoblasten → mehrkernige Synzytien (Faserlänge bis 30 cm, hunderte Kerne randständig unter dem Sarkolemm). Herzmuskelzellen sind Einzelzellen (ca. 100 µm), verbunden durch Disci intercalares. Dieser Unterschied in der Zellentwicklung erklärt auch die unterschiedliche Regenerationsfähigkeit: Skelettmuskel kann repariert werden (aus Satellitenzellen), Herzmuskel kaum." }
    ],
    bossQuestions: [{ id: "mu_art_b1", type: "true_false", statement: "Eine saubere Abgrenzung der Muskelarten ist für Physiologie- und Pathologiefragen zentral.", answer: true }],
    combatQuestions: [
      { id: "mu_art_mc1", type: "mc", question: "Welche Muskelart ist histologisch quergestreift UND unwillkürlich gesteuert?", options: [
        { text: "Herzmuskulatur", correct: true },
        { text: "Skelettmuskulatur", correct: false },
        { text: "Glatte Muskulatur", correct: false },
        { text: "Alle drei Muskelarten gleichermassen", correct: false }
      ]},
      { id: "mu_art_mc2", type: "mc", question: "Wo kommt glatte Muskulatur vor?", options: [
        { text: "In Hohlorganen wie Darm, Blutgefässen und Harnblase", correct: true },
        { text: "Ausschliesslich im Herzmuskel", correct: false },
        { text: "In Skelettmuskeln als Teil der Muskelfasern", correct: false },
        { text: "Nur in der Haut (Arrector pili)", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "bewegungsmöglichkeiten",
    title: "Bewegungsmöglichkeiten",
    phase1: {
      soil: { statement: "Muskeln erzeugen Bewegungen entlang anatomischer Achsen und Ebenen.", answer: true, solution: "Muskeln erzeugen Bewegungen in anatomisch definierten Achsen und Ebenen: Flexion/Extension verlaufen in der Sagittalebene, Abduktion/Adduktion in der Frontalebene und Rotation um die Längsachse des Körpers. Diese Systematik erlaubt die präzise Beschreibung jeder Muskelbewegung." },
      seed: { statement: "Flexion und Extension beschreiben dieselbe Bewegungsrichtung.", answer: false, solution: "Flexion und Extension sind entgegengesetzte Bewegungen: Flexion verringert den Gelenkwinkel (Beugung, z.B. Ellenbogen anwinkeln), Extension vergrossert ihn (Streckung, z.B. Arm ausstrecken). Beide verlaufen in der Sagittalebene um eine Transversalachse." },
      water: { statement: "Muskelwirkung wird funktionell über Ursprung, Ansatz und Zugrichtung erklärt.", answer: true, solution: "Ursprung (meist am weniger beweglichen Knochen) und Ansatz (am beweglichen Knochen) bestimmen die Zugrichtung des Muskels. Durch die Lage von Ursprung und Ansatz relativ zum Gelenk lässt sich die Bewegungsrichtung und der Hebelarm ableiten." }
    },
    harvestQuestions: [
      { id: "mu_bew_h1", type: "mc", question: "Was sind Supination und Pronation, und wo finden diese Bewegungen hauptsächlich statt?", options: [
        { text: "Supination = Auswärtsdrehung des Unterarms (Handfläche nach oben); Pronation = Einwärtsdrehung. Statt im Radioulnargelenk", correct: true },
        { text: "Supination = Plantarflexion; Pronation = Dorsalextension am Fuss", correct: false },
        { text: "Supination = Adduktion des Daumens; Pronation = Abduktion", correct: false },
        { text: "Beide Begriffe bezeichnen Kniebewegungen in der Transversalebene", correct: false }
      ], explanation: "Supination (lat. supinus = rückwärtsgelehnt): Unterarm dreht nach aussen, Handflähe zeigt nach oben/vorne. Pronation (lat. pronus = nach vorne gebeugt): Unterarm dreht nach innen, Handfläche zeigt nach unten. Beide Bewegungen erfolgen im proximalen und distalen Radioulnargelenk durch Rotation der Speiche (Radius) um die Elle (Ulna). M. supinator und M. biceps (Supination), M. pronator teres und M. pronator quadratus (Pronation)." },
      { id: "mu_bew_h2", type: "mc", question: "Was bedeutet Dorsalextension und Plantarflexion am Fuss?", options: [
        { text: "Dorsalextension = Fuss zieht nach oben (Richtung Schienbein); Plantarflexion = Fuss drückt nach unten (Zehenspitze nach unten)", correct: true },
        { text: "Dorsalextension = Fuss dreht nach innen (Inversion); Plantarflexion = nach aussen", correct: false },
        { text: "Beide Begriffe bezeichnen Rotationsbewegungen im Kniegelenk", correct: false },
        { text: "Dorsalextension = Kniebeugung; Plantarflexion = Kniestreckung", correct: false }
      ], explanation: "Dorsalextension (Dorsiflexion): Fuss hebt hoch (Zehenspitzen heben, Ferse bleibt). M. tibialis anterior. Plantarflexion: Fuss drückt nach unten (Zehenststand, Treten). M. gastrocnemius + M. soleus (Wadenmuskulatur). Klinisch: Plantarflexion bei Schlaganfall (Spitzfuss) oder Peronäuslahmung (= fehlende Dorsalextension → Steppergang)." },
      { id: "mu_bew_h3", type: "mc", question: "Was ist Zirkumduktion und bei welchem Gelenktyp ist sie möglich?", options: [
        { text: "Kreisbewegung eines Körperteils durch Kombination von Flex./Extension + Ab-/Adduktion – möglich bei Kugelgelenken und Sattelgelenken", correct: true },
        { text: "Rotation um die Längsachse eines Knochens – nur bei Zapfengelenken", correct: false },
        { text: "Gleichzeitige Beugung beider Extremitäten – kein spezifischer Gelenktyp", correct: false },
        { text: "Seitliche Neigung der Wirbelsäule – möglich bei Bandscheiben", correct: false }
      ], explanation: "Zirkumduktion = kegelförmige Kreisbewegung eines Gliedmassensegments: entsteht durch sequenzielle Kombination Flexion → Abduktion → Extension → Adduktion. Voraussetzung: mindestens 2 Bewegungsachsen = Kugelgelenk (Schulter, Hüft) oder Sattelgelenk (Daumensattelgelenk). Im Scharniergelenk (Knie) ist Zirkumduktion nicht möglich." }
    ],
    bossQuestions: [{ id: "mu_bew_b1", type: "true_false", statement: "Klinische Bewegungsbefunde lassen sich nur mit korrekter Bewegungsnomenklatur sauber deuten.", answer: true }],
    combatQuestions: [
      { id: "mu_bew_mc1", type: "mc", question: "Was bezeichnet Abduktion?", options: [
        { text: "Bewegung eines Körperteils von der Körpermitte weg", correct: true },
        { text: "Bewegung eines Körperteils zur Körpermitte hin", correct: false },
        { text: "Beugung (Verkleinerung des Gelenkwinkels)", correct: false },
        { text: "Streckung (Vergrösserung des Gelenkwinkels)", correct: false }
      ]},
      { id: "mu_bew_mc2", type: "mc", question: "Was beschreibt der Begriff Pronation?", options: [
        { text: "Einwärtsdrehung des Unterarms (Handteller zeigt nach unten)", correct: true },
        { text: "Auswärtsdrehung des Unterarms (Supination)", correct: false },
        { text: "Plantarflexion des Fusses", correct: false },
        { text: "Seitwärtsneigung der Wirbelsäule", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "kopfmuskulatur",
    title: "Muskulatur des Kopfes",
    phase1: {
      soil: { statement: "Zur Kopfmuskulatur gehören unter anderem mimische Muskulatur und Kaumuskulatur.", answer: true, solution: "Kopfmuskulatur umfasst zwei funktionell verschiedene Gruppen: Die mimische Muskulatur (innerviert durch N. facialis, VII) bewegt Gesichtshaut für Ausdruck und Kommunikation, die Kaumuskulatur (innerviert durch N. trigeminus, V) erzeugt die Kraft für Kieferbewegungen und Nahrungszerkleinerung." },
      seed: { statement: "Mimische Muskulatur hat keinen Bezug zu alltagsrelevanten Funktionen.", answer: false, solution: "Mimik und Ausdruck sind funktionell direkt davon abhängig." },
      water: { statement: "Kaumuskeln sind für Kraftentwicklung bei der Nahrungszerkleinerung zentral.", answer: true, solution: "Die Kaumuskulatur – M. masseter, M. temporalis und Mm. pterygoidei, alle innerviert durch N. trigeminus (V3) – erzeugt die Bisskraft und führt Kieferschluss, Mahlbewegungen und Protraktion aus. Der M. masseter gilt als einer der stärksten Muskeln relativ zu seiner Grösse im ganzen Körper." }
    },
    harvestQuestions: [
      { id: "mu_kopf_h1", type: "mc", question: "Was unterscheidet die mimische Muskulatur strukturell von anderen Skelettmuskeln?", options: [
        { text: "Sie inseriert in Haut/Unterhautgewebe statt Knochen-zu-Knochen – ermöglicht direkte Gesichtshautbewegung", correct: true },
        { text: "Sie ist aus glattem Muskelgewebe aufgebaut, nicht aus quergestreiftem", correct: false },
        { text: "Sie wird vom N. trigeminus innerviert, nicht vom N. facialis", correct: false },
        { text: "Sie hat keine Motorische Endplatte, sondern arbeitet autonom", correct: false }
      ], explanation: "Mimische Muskeln (M. orbicularis oculi, M. zygomaticus, M. buccinator etc.) haben ihren Ursprung am Knochen oder Gesichtsschädel, ihren Ansatz aber in der Gesichtshaut. Kontraktion bewegt die Haut – das erzeugt Ausdruck. Alle sind vom N. facialis (CN VII) innerviert. Fazialisparese → ipsilateral: kein Lidschluss, Stirnrunzeln nicht möglich, Mundwinkel hängt herab." },
      { id: "mu_kopf_h2", type: "mc", question: "Welche vier Muskeln bilden die Kaumuskulatur und welchem Hirnnerv unterliegen sie?", options: [
        { text: "M. masseter, M. temporalis, M. pterygoideus medialis, M. pterygoideus lateralis – alle N. trigeminus (V3, Pars mandibularis)", correct: true },
        { text: "M. masseter, M. buccinator, M. temporalis – alle N. facialis (VII)", correct: false },
        { text: "M. geniohyoideus, M. mylohyoideus, M. digastricus – alle N. trigeminus (V3)", correct: false },
        { text: "M. masseter, M. sternocleidomastoideus, M. trapezius – alle N. accessorius (XI)", correct: false }
      ], explanation: "Kaumuskulatur = vier Muskeln, alle motorisch durch N. mandibularis (V3) versorgt: M. masseter (Kieferschluss, stärkster Kaumuskel), M. temporalis (Kieferschluss + Retraktion), M. pterygoideus medialis (Kieferschluss, Protraktion), M. pterygoideus lateralis (Mundöffnung, Mahlbewegung). Klinisch: Trigeminusneuralgie (V3) → starke Kieferschmerzen; Bruxismus (Knirschen)." },
      { id: "mu_kopf_h3", type: "mc", question: "Ein Patient kann nach einem Schlaganfall die Stirn auf der betroffenen Seite nicht mehr runzeln. Welcher Hirnnerv ist geschädigt?", options: [
        { text: "N. facialis (VII) – periphere Läsion oder zentrale Läsion mit Stirnbeteiligung", correct: true },
        { text: "N. trigeminus (V) – sensibel für Gesicht, motorisch für Kaumuskulatur", correct: false },
        { text: "N. hypoglossus (XII) – motorisch für Zunge", correct: false },
        { text: "N. glossopharyngeus (IX) – Schluck- und Gaumenmuskulatur", correct: false }
      ], explanation: "Der N. facialis (VII) innerviert die gesamte mimische Muskulatur inkl. M. frontalis (Stirnrunzeln). Periphere Fazialisparese: komplett ipsilaterale Lahmung (Stirn, Auge, Mund). Zentrale Fazialisparese (z.B. Schlaganfall): nur untere Gesichtshälfte betroffen, Stirn gespart (bilaterale kortikale Versorgung des M. frontalis). Diese Unterscheidung ist klinisch entscheidend für die Lokalisation der Schädigung." }
    ],
    bossQuestions: [{ id: "mu_kopf_b1", type: "true_false", statement: "Kopfmuskelthemen verbinden Funktion, Innervation und klinische Relevanz.", answer: true }],
    combatQuestions: [
      { id: "mu_kopf_mc1", type: "mc", question: "Welchem Hirnnerv unterliegt die mimische Muskulatur?", options: [
        { text: "Nervus facialis (VII)", correct: true },
        { text: "Nervus trigeminus (V)", correct: false },
        { text: "Nervus hypoglossus (XII)", correct: false },
        { text: "Nervus vagus (X)", correct: false }
      ]},
      { id: "mu_kopf_mc2", type: "mc", question: "Welcher Muskel gilt als stärkster Kaumuskel?", options: [
        { text: "Musculus masseter", correct: true },
        { text: "Musculus temporalis", correct: false },
        { text: "Musculus pterygoideus medialis", correct: false },
        { text: "Musculus buccinator", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "rumpfmuskulatur",
    title: "Hals-, Thorax-, Bauch- und Rückenmuskulatur",
    phase1: {
      soil: { statement: "Die Rumpfmuskulatur stabilisiert den Körper und unterstützt Haltung sowie Atmung.", answer: true, solution: "Die autochthone Rückenmuskulatur sichert als tiefliegende Schicht die Wirbelsegmente segmental; oberflächennahe Schichten führen Rumpfbewegungen aus. Bauchmuskeln erhöhen den intraabdominellen Druck und unterstützen die Ausatmung. Thoraxmuskeln integrieren Haltungs- und Atemfunktion in einem System." },
      seed: { statement: "Rücken- und Bauchmuskulatur wirken niemals als funktionelle Gegenspieler.", answer: false, solution: "Rücken- und Bauchmuskeln sind klassische Antagonisten: Rückenmuskeln strecken (Extension) und stabilisieren die Wirbelsäule, Bauchmuskeln beugen den Rumpf (Flexion). Dieses Gegenspiel regelt die Haltung und kontrolliert alle Rumpfbewegungen in der Sagittalebene." },
      water: { statement: "Teile der Thoraxmuskulatur haben wesentliche Funktionen in der Atemmechanik.", answer: true, solution: "Die Mm. intercostales externi heben die Rippen bei der Einatmung (Thoraxerweiterung), die Mm. intercostales interni senken sie bei forc­ierter Ausatmung. Bei hohem Atemzug­volumen aktiviert der Körper Atemhilfsmuskeln: M. sternocleidomastoideus und Mm. scaleni heben den Brustkorb zusätzlich an." }
    },
    harvestQuestions: [
      { id: "mu_rumpf_h1", type: "mc", question: "Was versteht man unter 'autochthoner Rückenmuskulatur' und welche Funktion hat sie?", options: [
        { text: "Die tiefen, am Wirbel selbst entspringenden Rückenmuskeln (z.B. M. erector spinä) zur segmentalen Stabilisierung und Aufrichtung der Wirbelsäule", correct: true },
        { text: "Die oberflächennahen Muskeln wie M. trapezius, die von der Schulter auf den Rücken ziehen", correct: false },
        { text: "Alle Muskeln des Thorax einschliesslich der Interkostalmuskeln", correct: false },
        { text: "Nur die Bauchmuskeln als Antagonisten der Rückenstrecker", correct: false }
      ], explanation: "Autochthone Rückenmuskulatur (= 'eigenständige' Rückenmuskeln): stammen aus den Myotomen der Wirbelsegmente und werden durch dorsale Rami der Spinalnerven innerviert. Tiefer Anteil (M. multifidus, Mm. rotatores): segmentale Stabilisierung einzelner Wirbelgelenke. Oberfläche (M. erector spinä, M. longissimus): Aufrichtung der Wirbelsäule. Klinisch: Chronischer Rückenschmerz oft durch Schwäche dieser Muskeln." },
      { id: "mu_rumpf_h2", type: "mc", question: "Welche Funktion hat der M. transversus abdominis, der tiefste Bauchmuskel?", options: [
        { text: "Stabilisierung der Lendenwirbelsäule durch Druckerhöhung im Bauchraum (Bauchpresse) – kein Beugeeffekt auf den Rumpf", correct: true },
        { text: "Rumpfbeugung (Flexion) als stärkster Bauchmuskel", correct: false },
        { text: "Rumpfrotation ipsilateral wie M. obliquus externus", correct: false },
        { text: "Anheben des Zwerchfells während der Inspiration", correct: false }
      ], explanation: "M. transversus abdominis: tief liegend, verläuft quer (transversal). Beim Anspannen erzeugt er eine 'korsettartige' Kompression des Bauchraums → erhöht intraabdominellen Druck → stabilisiert die LWS von ventral. Er hat praktisch keinen Beugeeffekt auf den Rumpf. Klinisch: Wichtigster Stabilisierungsmuskel bei Rückenschmerz; Kinesiotaping, Physiotherapie zielen oft auf diesen Muskel ab." },
      { id: "mu_rumpf_h3", type: "mc", question: "Welche Bauchmuskeln führen Rumpfrotation aus und wie?", options: [
        { text: "M. obliquus externus abdominis ipsilateral + M. obliquus internus kontralateral = Rotation zur Gegenseite", correct: true },
        { text: "M. rectus abdominis (beidseitig) führt Rotation aus", correct: false },
        { text: "Ausschliesslich M. transversus abdominis rotiert den Rumpf", correct: false },
        { text: "M. obliquus externus und internus wirken immer gleichseitig = Rotation zur gleichen Seite", correct: false }
      ], explanation: "Rumpfrotation: M. obliquus externus abdominis einer Seite + M. obliquus internus der GEGENSEITE kontrahieren gemeinsam → Rotation zur Gegenseite des externus (oder zur gleichen Seite des internus). Beispiel: Drehung nach rechts = rechts externus + links internus. Diese diagonale Muskelpaare erklären, warum Rumpfrotation eine koordinierte bilaterale Muskelaktivität ist." }
    ],
    bossQuestions: [{ id: "mu_rumpf_b1", type: "true_false", statement: "Funktion der Rumpfmuskulatur ergibt sich aus dem Zusammenspiel vieler Muskelgruppen.", answer: true }],
    combatQuestions: [
      { id: "mu_rumpf_mc1", type: "mc", question: "Welche Muskeln gehören zur primären inspiratorischen Atemhilfsmuskulatur?", options: [
        { text: "M. sternocleidomastoideus und Mm. scaleni", correct: true },
        { text: "M. rectus abdominis und M. obliquus externus", correct: false },
        { text: "Mm. intercostales interni", correct: false },
        { text: "M. erector spinä", correct: false }
      ]},
      { id: "mu_rumpf_mc2", type: "mc", question: "Welche Funktion hat der M. rectus abdominis?", options: [
        { text: "Rumpfbeugung (Flexion) und Erhöhung des Bauchdrucks", correct: true },
        { text: "Rumpfstreckung und Unterstützung der Inspiration", correct: false },
        { text: "Ausschliesslich seitliche Rumpfneigung zur rechten Seite", correct: false },
        { text: "Passive Bauchdeckenstabilisierung ohne Kraftentfaltung", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "extremitätenmuskulatur",
    title: "Schulter-, Arm-, Hüft- und Beinmuskulatur",
    phase1: {
      soil: { statement: "Die Extremitätenmuskulatur wird topographisch und funktionell nach Regionen gegliedert.", answer: true, solution: "Die obere Extremität wird in Schulter-, Ober- und Unterarmmuskulatur unterteilt; die untere in Hüft-, Oberschenkel- und Unterschenkelmuskulatur. Diese regionale Gliederung ermöglicht gezielte Funktionszuordnung: Welche Muskeln steuern welches Gelenk und in welche Richtung?" },
      seed: { statement: "Muskeln der unteren Extremität dienen ausschliesslich der Feinkoordination, nicht der Lastaufnahme.", answer: false, solution: "Die untere Extremität trägt das Körpergewicht und ermöglicht Fortbewegung. Grosser Gluteus, Oberschenkelstrecker (M. quadriceps) und Wadenmuskulatur entwickeln dabei erhebliche Kräfte für Stand, Gehen, Laufen und Treppensteigen – das Gegenteil von Feinkoordination." },
      water: { statement: "Auch in den Extremitäten gilt das Prinzip aus Ursprung, Ansatz und Bewegungswirkung.", answer: true, solution: "Jeder Extremitätenmuskel lässt sich funktionell erschliessen über: Ursprung (proximaler Knochen), Ansatz (distaler Knochen), überspielte Gelenke und Zugrichtung. Daraus ergibt sich unmittelbar die primäre Bewegungswirkung – z.B. M. biceps brachii: Ursprung Schulterblatt, Ansatz Radius, Wirkung Ellbogenflexion + Supination." }
    },
    harvestQuestions: [
      { id: "mu_ext_h1", type: "mc", question: "Welche vier Muskeln bilden die Rotatorenmanschette der Schulter und welche gemeinsame Funktion haben sie?", options: [
        { text: "M. supraspinatus, M. infraspinatus, M. teres minor, M. subscapularis – stabilisieren den Humeruskopf in der Pfanne", correct: true },
        { text: "M. deltoideus, M. biceps brachii, M. triceps brachii, M. pectoralis major", correct: false },
        { text: "M. trapezius, M. serratus anterior, M. latissimus dorsi, M. rhomboideus", correct: false },
        { text: "M. supraspinatus, M. teres major, M. coracobrachialis, M. deltoideus", correct: false }
      ], explanation: "Die Rotatorenmanschette (SITS-Muskeln): Supraspinatus (Abduktion), Infraspinatus (Aussenrotation), Teres minor (Aussenrotation), Subscapularis (Innenrotation). Gemeinsame Funktion: Kompression des Humeruskopfs in die Glenoidpfanne – Sicherung des instabilen Schultergelenks. Klinisch: Rotatorenmanschettenriss (häufig M. supraspinatus) → schmerzhafter Bogenstreckentest positiv." },
      { id: "mu_ext_h2", type: "mc", question: "Was ist die Hauptfunktion des M. gluteus maximus?", options: [
        { text: "Extension und Aussenrotation im Hüftgelenk – wichtig beim Treppensteigen, Aufstehen und Laufen", correct: true },
        { text: "Abduktion im Hüftgelenk – Seitstabilisierung beim Gehen", correct: false },
        { text: "Innenrotation des Oberschenkels – Gangbild-Kontrolle", correct: false },
        { text: "Kniebeugung als Hintermuskel des Oberschenkels", correct: false }
      ], explanation: "M. gluteus maximus ist der grösste und kraftvollste Gesässmuskel. Hauptfunktion: Hüftextension (vom Boden aufstehen, Treppen steigen, bergauf gehen) + Aussenrotation. Innervation: N. gluteus inferior. M. gluteus medius und minimus: Abduktion und Innenrotation (Seitstabilisierung beim Einbeinstand – Trendelenburg-Hinken bei Läsion). Klinisch: M. gluteus maximus ist nach Knieoperation oft der schwäche Wiederherstellungsmuskel." },
      { id: "mu_ext_h3", type: "mc", question: "Welcher Nerv innerviert den M. biceps brachii und welche Bewegungen führt dieser Muskel aus?", options: [
        { text: "N. musculocutaneus – Ellenbogenflexion UND Supination des Unterarms", correct: true },
        { text: "N. radialis – Ellenbogenextension", correct: false },
        { text: "N. medianus – Fingerflexion und Unterarmflexion", correct: false },
        { text: "N. ulnaris – Handgelenkflexion und Ulnardeviation", correct: false }
      ], explanation: "M. biceps brachii: Ursprung am Schulterblatt (Caput longum: Tuberculum supraglenoidale; Caput breve: Processus coracoideus), Ansatz an Tuberositas radii. Funktion: Ellenbogenflexion (Hauptfunktion) + Unterarmsupination (weil Ansatz an Radius: dreht den Radius nach aussen). Innervation: N. musculocutaneus (C5-C6). N. radialis: Triceps (Extension). N. medianus: Flexoren volar." }
    ],
    bossQuestions: [{ id: "mu_ext_b1", type: "true_false", statement: "Extremitätenmuskulatur verlangt die Verknüpfung von Topographie und Bewegungsfunktion.", answer: true }],
    combatQuestions: [
      { id: "mu_ext_mc1", type: "mc", question: "Welcher Muskel ist der stärkste Kniestrecker?", options: [
        { text: "M. quadriceps femoris", correct: true },
        { text: "M. biceps femoris", correct: false },
        { text: "M. gastrocnemius", correct: false },
        { text: "M. gracilis", correct: false }
      ]},
      { id: "mu_ext_mc2", type: "mc", question: "Welche Muskeln bilden die Rotatorenmanschette der Schulter?", options: [
        { text: "M. supraspinatus, infraspinatus, teres minor und subscapularis", correct: true },
        { text: "M. deltoideus, biceps brachii und triceps brachii", correct: false },
        { text: "M. pectoralis major und serratus anterior", correct: false },
        { text: "M. trapezius und latissimus dorsi", correct: false }
      ]}
    ]
  })
];

const ATMUNGSSYSTEM_1035_PLANTS = [
  makeDetailedPlant({
    id: "atmungssystem_überblick",
    title: "Atmungssystem: Überblick",
    contextHint: "Studienbrief 1035 Strukturen und Funktion des Atmungssystems",
    phase1: {
      soil: { statement: "Das Atmungssystem ist zuständig für die Sauerstoffzufuhr und den Abtransport gasförmiger Stoffwechselendprodukte wie Kohlendioxid.", answer: true, solution: "Das Atmungssystem hat die Hauptaufgabe, Sauerstoff (O2) aus der Atemluft ins Blut aufzunehmen und das Stoffwechselendprodukt Kohlendioxid (CO2) abzugeben. Dieser Gasaustausch erfolgt in den Alveolen der Lunge durch passive Diffusion entlang von Partialdruckunterschieden." },
      seed: { statement: "Zu den oberen Atemwegen gehört die Luftröhre (Trachea).", answer: false, solution: "Die Trachea gehört zu den unteren Atemwegen. Obere Atemwege sind Nase, Nasennebenhöhllen und Rachenraum." },
      water: { statement: "Der eigentliche Ort des Gasaustauschs ist die Lunge, nicht die luftleitenden Atmungsorgane.", answer: true, solution: "Nase, Rachen, Kehlkopf, Trachea und Bronchien leiten nur Luft, ohne selbst am Gasaustausch beteiligt zu sein. Der Gasaustausch findet ausschliesslich in den ca. 300 Millionen Alveolen der Lunge statt, die mit ihrer dünnen Membran und grossen Fläche (50–100 m²) ideal für Diffusion sind." }
    },
    harvestQuestions: [
      { id: "at_ü_h1", type: "mc", question: "Wie viele Alveolen hat die menschliche Lunge ungefähr und welche Austauschfläche bieten sie?", options: [
        { text: "Ca. 300 Millionen Alveolen mit einer Gesamtaustauschfläche von 50–100 m²", correct: true },
        { text: "Ca. 10.000 Alveolen mit ca. 2 m² Austauschfläche", correct: false },
        { text: "Ca. 3 Millionen Alveolen mit ca. 10 m² Austauschfläche", correct: false },
        { text: "Unbegrenzt viele Alveolen – die Fläche variiert stark nach Lungenfüllung", correct: false }
      ], explanation: "Ca. 300 Millionen Alveolen ergeben durch ihre winzige Grösse (Durchmesser 200–300 µm) eine Gesamtfläche von 50–100 m² – dem Quadratmeterwert eines Tennisplatzes. Diese enorme Fläche bei minimaler Diffusionsstrecke (<0,5 µm Membrandicke) ist der physikalische Schlüssel zum effizienten Gasaustausch." },
      { id: "at_ü_h2", type: "mc", question: "Was bezeichnet der Begriff 'anatomischer Totraum' beim Atmungssystem?", options: [
        { text: "Die luftleitenden Atemwege (Nase bis Bronchiolen), in denen kein Gasaustausch stattfindet – ca. 150 ml", correct: true },
        { text: "Die nicht belüfteten Alveolen in der Lunge (alveolärer Totraum)", correct: false },
        { text: "Das Residualvolumen, das nach maximaler Ausatmung verbleibt", correct: false },
        { text: "Der Raum zwischen Pleura visceralis und parietalis", correct: false }
      ], explanation: "Anatomischer Totraum (ca. 150 ml): Luftvolumen in Nase, Rachen, Kehlkopf, Trachea und Bronchiolen – hier findet kein Gasaustausch statt. Beim normalen Atemzug (500 ml) gelangen daher nur ca. 350 ml Frischluft in die Alveolen. Klinisch: Flache Atmung erhöht den relativen Totraumanteil → weniger effektiver Gasaustausch." },
      { id: "at_ü_h3", type: "mc", question: "Welche drei Hauptfunktionen hat das Atmungssystem ausser dem Gasaustausch?", options: [
        { text: "Wärme- und Feuchtigkeitsregulierung der Atemluft, Schutzfunktion (Filterung/Reinigung), Phonation (Stimmbildung)", correct: true },
        { text: "Blutdruckregulation, Hormonproduktion und Verdauungsunterstützung", correct: false },
        { text: "Hämatopöse (Blutbildung), Lymphproduktion und Immunglobulinsekretion", correct: false },
        { text: "Osmolaritätsregulation, Elektrolytbalance und Nierenunterstützung", correct: false }
      ], explanation: "Das Atmungssystem hat neben dem Gasaustausch weitere Funktionen: Konditionierung der Atemluft (Wärmung auf 37°C, Befeuchtung auf 100% rel. Feuchte, Filtration durch Nasenhaare/Schleimhaut), Schutzfunktion (mukoziliäre Clearance, Husten/Niesen-Reflex) und Phonation (Stimmbänder im Kehlkopf). Ausserdem ist die Lunge am Säure-Basen-Haushalt beteiligt (CO2-Abgabe)." }
    ],
    bossQuestions: [{ id: "at_ü_b1", type: "true_false", statement: "Das Atmungssystem wird in obere und untere Atemwege unterteilt, die unterschiedliche Strukturen umfassen.", answer: true }],
    combatQuestions: [
      { id: "at_ü_mc1", type: "mc", question: "Welche Strukturen gehören zu den OBEREN Atemwegen?", options: [
        { text: "Nase, Nasennebenhöhllen und Rachenraum", correct: true },
        { text: "Trachea und Hauptbronchien", correct: false },
        { text: "Lunge und Bronchiolen", correct: false },
        { text: "Kehlkopf und Trachea", correct: false }
      ]},
      { id: "at_ü_mc2", type: "mc", question: "Wo findet der eigentliche Gasaustausch statt?", options: [
        { text: "In den Alveolen der Lunge", correct: true },
        { text: "In der Trachea", correct: false },
        { text: "In den Hauptbronchien", correct: false },
        { text: "In den Nasenmuscheln", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "nase_und_nnh",
    title: "Nase und Nasennebenhöhlen",
    contextHint: "Studienbrief 1035 Strukturen und Funktion des Atmungssystems",
    phase1: {
      soil: { statement: "Die Nasennebenhöhllen sind paarig angeordnet und werden in vier Typen unterteilt.", answer: true, solution: "Die vier paarigen Nasennebenhöhllen – Stirnhöhle (Sinus frontalis), Keilbeinhöhlel (Sinus sphenoidalis), Siebbeinzellen (Cellulä ethmoidales) und Kieferhöhle (Sinus maxillaris) – sind mit der Nasenhöhlel verbunden. Sie dienen der Gewichtsverminderung des Schädels, als Resonanzräume und vergrössern die Schleimhautoberflähe." },
      seed: { statement: "Die Nase hat ausschliesslich eine luftleitende Funktion ohne Filterwirkung oder Befeuchtung.", answer: false, solution: "Die Nase filtert, wärmt, befeuchtet die Luft und dient als Riechorgan und unterstützt den Sprechvorgang." },
      water: { statement: "Die Nase wärmt und befeuchtet die eingeatmete Luft und dient als Riechorgan.", answer: true, solution: "Die Nase bereitet die eingeatmete Luft für die Lunge auf: Sie wärmt sie auf Körpertemperatur, befeuchtet sie auf nahezu 100 % Luftfeuchtigkeit und filtert Staub und Keime durch Nasenhaare und Schleimhaut. Zusätzlich trägt die Nase über das Riechepithel zur Geruchswahrnehmung bei." }
    },
    harvestQuestions: [
      { id: "at_nnh_h1", type: "true_false", statement: "Es gibt vier Nasennebenhöhllen: Stirnhöhle, Keilbeinhöhlel, Siebbeinzellen und Kieferhöhlel.", answer: true, explanation: "Die vier paarigen Nasennebenhöhllen entstehen durch Ausbuchtungen der Nasenhöhlenschleimhaut in die umgebenden Schädelknochen: Stirnhöhlel, Keilbeinhöhlel, Siebbeinzellen und Kieferhöhlel. Alle münden in die Nasenhöhle und können sich bei Schleimhautschwellung entzuenden (Sinusitis)." },
      { id: "at_nnh_h2", type: "true_false", statement: "Die Nasenmuscheln (Conchä) unterteilen jede Nasenhöhlhälfte in zwei Gänge.", answer: false, explanation: "Drei Nasenmuscheln (Concha nasalis inferior, media, superior) teilen jede Nasenhöhlhälfte in vier Gänge: Unteren, mittleren, oberen und den gemeinsamen Nasengang. Nicht zwei, sondern vier Gänge entstehen durch die drei Muschelplatten." },
      { id: "at_nnh_h3", type: "true_false", statement: "Die inneren Öffnungen der Nase in den Rachenraum werden als Choanä bezeichnet.", answer: true, explanation: "Die Choanä sind die hinteren Öffnungen der Nasenhöhle in den Nasopharynx (Epipharynx). Im Gegensatz dazu sind die Nares die äusseren Nasenöfffnungen. Eine angeborene Choanalatresie führt beim Neugeborenen zu Atembehinderung, da Neugeborene obligate Nasenatmer sind." }
    ],
    bossQuestions: [{ id: "at_nnh_b1", type: "true_false", statement: "Nasennebenhöhllen dienen u.a. der Gewichtsverminderung des Schädels, als Resonanzraum und zur Vergrösserung der Schleimhautoberfläch.", answer: true }],
    combatQuestions: [
      { id: "at_nnh_mc1", type: "mc", question: "Welche vier Nasennebenhöhllen werden unterschieden?", options: [
        { text: "Stirnhöhlel, Keilbeinhöhlel, Siebbeinzellen und Kieferhöhlel", correct: true },
        { text: "Stirnhöhlel, Schläfenhöhlel, Kieferhöhlel und Wangenhöhlel", correct: false },
        { text: "Vordere, mittlere, hintere und tiefe Nasennebenhöhlel", correct: false },
        { text: "Siebbein-, Keilbein-, Stirn- und Jochbeinhöhlel", correct: false }
      ]},
      { id: "at_nnh_mc2", type: "mc", question: "Was bezeichnen die Choanä?", options: [
        { text: "Die inneren Öffnungen der Nasenhöhlele in den Rachenraum", correct: true },
        { text: "Die Nasenmuscheln (Conchä nasales)", correct: false },
        { text: "Die äusseren Nasenöfffnungen (Nares)", correct: false },
        { text: "Die Ausführungsganege der Nasennebenhöhllen", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "rachenraum",
    title: "Rachenraum",
    contextHint: "Studienbrief 1035 Strukturen und Funktion des Atmungssystems",
    phase1: {
      soil: { statement: "Der Rachen (Pharynx) wird in drei Abschnitte unterteilt: Epipharynx, Mesopharynx und Hypopharynx.", answer: true, solution: "Der Rachen gliedert sich in drei Etagen: Epipharynx (Nasenpharynx, hinter der Nase), Mesopharynx (Mundpharynx, hinter dem Mund als Kreuzungspunkt von Luft- und Speiseweg) und Hypopharynx (Kehlkopfpharynx, vor dem Kehlkopf). Jeder Abschnitt steht mit unterschiedlichen Strukturen in Verbindung." },
      seed: { statement: "Der Mesopharynx steht ausschliesslich mit der Nasenhöhlein Verbindung und hat keinen Bezug zur Mundhöhlele.", answer: false, solution: "Der Mesopharynx (Pars oralis) steht mit der Mundhöhlele in Verbindung, der Epipharynx mit der Nase." },
      water: { statement: "Das lymphatische Gewebe im Bereich des Rachens bildet den sogenannten Waldeyer-Rachenring.", answer: true, solution: "Der Waldeyer-Rachenring ist eine ringförmige Anordnung von Lymphgewebe: Rachenmandel (Tonsilla pharyngea), Gaumenmandeln (Tonsillä palatinä) und Zungenmandel (Tonsilla lingualis). Dieses lymphatische Gewebe bildet eine erste Immunbarriere an der Eintrittspforte der Atemluft." }
    },
    harvestQuestions: [
      { id: "at_ra_h1", type: "true_false", statement: "Der Epipharynx (Pars nasalis) steht über die Choanä mit der Nase in Verbindung.", answer: true, explanation: "Der Epipharynx nimmt Luft aus den Choanä auf und steht seitlich mit der Tuba auditiva (Eustachische Röhre) in Verbindung, die zum Mittelohr führt. Bei Rachenentzuendungen kann daher gleichzeitig eine Mittelohrbeteiligung auftreten." },
      { id: "at_ra_h2", type: "true_false", statement: "Der Hypopharynx gehört ausschliesslich zu den Atemwegen und hat keinerlei Verbindung zum Speiseweg.", answer: false, explanation: "Der Hypopharynx (Pars laryngea) ist die Kreuzungsstelle von Atemweg und Speiseweg: Anterior liegt der Kehlkopfeingang, posterior die Speiseröhre. Beim Schlucken muss die Epiglottis den Kehlkopfeingang sichern, um Aspiration zu verhindern." },
      { id: "at_ra_h3", type: "true_false", statement: "Tonsilla pharyngea, Tonsilla palatina und Tonsilla lingualis gehören zum Waldeyer-Rachenring.", answer: true, explanation: "Der Waldeyer-Rachenring bildet eine ringförmige Immunbarriere: Rachenmandel (adenoide Vegetationen im Dach des Epipharynx), Gaumenmandeln (seitlich im Mesopharynx) und Zungenmandel (Zungenbasis). Sie filtern Keime aus Atemluft und Nahrung und gehören zum lymphatischen System." }
    ],
    bossQuestions: [{ id: "at_ra_b1", type: "true_false", statement: "Im Mesopharynx befindet sich die Kreuzung von Luft- und Speiseweg, was ihn funktionell einzigartig macht.", answer: true }],
    combatQuestions: [
      { id: "at_ra_mc1", type: "mc", question: "Welcher Abschnitt des Rachens ist die Kreuzungsstelle von Luft- und Speiseweg?", options: [
        { text: "Mesopharynx (Pars oralis)", correct: true },
        { text: "Epipharynx (Pars nasalis)", correct: false },
        { text: "Hypopharynx (Pars laryngea)", correct: false },
        { text: "Nasopharynx (Pars inferior)", correct: false }
      ]},
      { id: "at_ra_mc2", type: "mc", question: "Welche Strukturen bilden den Waldeyer-Rachenring?", options: [
        { text: "Pharyngealtonsille, Gaumenmandeln und Zungenmandel", correct: true },
        { text: "Schildknorpel, Ringknorpel und Stellknorpel", correct: false },
        { text: "Nasenmuscheln und Nasenscheidewand", correct: false },
        { text: "Choanä, Fauces und Epiglottis", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "kehlkopf",
    title: "Kehlkopf (Larynx)",
    contextHint: "Studienbrief 1035 Strukturen und Funktion des Atmungssystems",
    phase1: {
      soil: { statement: "Der Kehlkopf liegt am Übergang von den oberen zu den unteren Atemwegen und verbindet den Hypopharynx mit der Trachea.", answer: true, solution: "Der Kehlkopf bildet das Bindeglied zwischen oberem Atemweg und Trachea. Seine strategische Lage ermöglicht zwei Schlüsstelfunktionen: Schutz der Atemwege beim Schlucken (Epiglottis verschliesst den Kehlkopf) und Lauterzeugung durch Schwingung der Stimmbänder." },
      seed: { statement: "Das Kehlkopfgerüst besteht ausschliesslich aus elastischem Knorpel ohne Bänder.", answer: false, solution: "Das Kehlkopfgerüst besteht aus neun Knorpeln – überwiegend hyaliner Knorpel (z.B. Schildknorpel, Ringknorpel) und etwas elastischer Knorpel (Epiglottis). Bänder verbinden die Knorpel und sichern deren Lage und Beweglichkeit zueinander." },
      water: { statement: "Der Kehlkopf dient der Lauterzeugung (Phonation) und verschliesst die Atemwege beim Schlucken.", answer: true, solution: "Während des Schluckens kippt die Epiglottis nach hinten und verschliesst den Eingang zur Trachea, um Aspiration zu verhindern. Bei der Phonation schwingen die echten Stimmbänder zwischen Stell- und Schildknorpel im Luftstrom und erzeugen so den Stimmklang." }
    },
    harvestQuestions: [
      { id: "at_kk_h1", type: "true_false", statement: "Der Schildknorpel (Cartilago thyroidea) ist der grösste Knorpel des Kehlkopfes.", answer: true, explanation: "Der Schildknorpel bildet den vorderen und seitlichen Knorpelmantel des Kehlkopfes. Sein prominenter Vordervorsprung ist beim Mann gut tastbar (Adamsapfel, Prominentia laryngea). Er bildet den vorderen Verankerungspunkt der Stimmbänder." },
      { id: "at_kk_h2", type: "true_false", statement: "Der Ringknorpel (Cartilago cricoidea) bildet die Basis, auf der alle anderen Kehlkopfknorpel ruhen.", answer: true, explanation: "Der Ringknorpel ist der einzige Kehlkopfknorpel mit einem vollständig geschlossenen Knorpelring. Als unterste Struktur des Kehlkopfes bildet er die Basis für Schildknorpel und Stellknorpel und geht kaudal direkt in die erste Trachealspange über." },
      { id: "at_kk_h3", type: "true_false", statement: "Die Stimmritze (Rima glottidis) befindet sich zwischen den falschen Stimmbändern.", answer: false, explanation: "Die Stimmritze (Rima glottidis) liegt zwischen den echten Stimmbändern (Plicä vocales), nicht zwischen den falschen Stimmbändern (Plicä vestibulares). Die falschen Stimmbänder befinden sich kranial der echten und bilden das Vestibulum laryngis." }
    ],
    bossQuestions: [{ id: "at_kk_b1", type: "true_false", statement: "Der Kehldeckelknorpel (Epiglottis) verhindert beim Schlucken die Aspiration von Nahrung in die Trachea.", answer: true }],
    combatQuestions: [
      { id: "at_kk_mc1", type: "mc", question: "Welcher Knorpel des Kehlkopfes ist der grösste?", options: [
        { text: "Schildknorpel (Cartilago thyroidea)", correct: true },
        { text: "Ringknorpel (Cartilago cricoidea)", correct: false },
        { text: "Stellknorpel (Arytenoidknorpel)", correct: false },
        { text: "Kehldeckelknorpel (Epiglottis)", correct: false }
      ]},
      { id: "at_kk_mc2", type: "mc", question: "Wo liegen die echten Stimmbänder (Plicä vocales)?", options: [
        { text: "Zwischen den Stellknorpeln und dem Schildknorpel", correct: true },
        { text: "Zwischen Epiglottis und Ringknorpel", correct: false },
        { text: "Unterhalb des Ringknorpels", correct: false },
        { text: "Im Mesopharynx zwischen den Gaumenmandeln", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "trachea",
    title: "Luftröhre (Trachea)",
    contextHint: "Studienbrief 1035 Strukturen und Funktion des Atmungssystems",
    phase1: {
      soil: { statement: "Die Luftröhre (Trachea) verbindet den Kehlkopf mit den beiden Hauptbronchien und markiert den Beginn der unteren Atemwege.", answer: true, solution: "Die Trachea leitet Atemluft vom Kehlkopf zu den Hauptbronchien und befördert Schleim durch ihr mehrreihiges Flimmerepithel nach oben (mukoziliäre Clearance). Ihre 16–20 hufeisenförmigen Knorpelspangen verhindern das Kollabieren bei Unterdruck während der Einatmung." },
      seed: { statement: "Die Trachea besteht ausschliesslich aus geschlossenen Knorpelringen ohne membranöser Rückwand.", answer: false, solution: "Die Knorpelspangen sind hufeisenförmig (offen hinten), der hintere Teil ist eine membranose Bandstruktur (Paries membranaceus)." },
      water: { statement: "Die hufeisenförmigen Knorpelspangen der Trachea verhindern, dass sie bei der Einatmung zusammenfällt.", answer: true, solution: "Die C-förmigen Knorpelspangen sind vorne und seitlich aus hyalinem Knorpel, hinten offen (Paries membranaceus). Diese offene Rückseite ermöglicht der Speiseröhre (direkt hinter der Trachea) beim Schlucken etwas Platz zu beanspruchen, während die Knorpelspangen das Kollabieren bei Unterdruck verhindern." }
    },
    harvestQuestions: [
      { id: "at_tr_h1", type: "true_false", statement: "Die Luftröhre besteht aus 16 bis 20 hufeisenförmigen Knorpelspangen aus hyalinem Knorpel.", answer: true, explanation: "Die C-förmigen Knorpelspangen verhindern das Kollabieren der Trachea bei Unterdruck während der Inspiration. Die hintere Öffnung wird durch den Paries membranaceus (Bandstruktur mit glattem Muskel) geschlossen, der beim Schlucken der direkt anliegenden Speiseröhre Platz lässt." },
      { id: "at_tr_h2", type: "true_false", statement: "Die Bifurcatio tracheä bezeichnet die Teilung der Trachea in linken und rechten Hauptbronchus.", answer: true, explanation: "Die Bifurcatio tracheä liegt auf Höhe des 5. Brustwirbels und teilt die Trachea in rechten und linken Hauptbronchus. Der rechte ist steiler angewinkelt (ca. 25°) als der linke (ca. 45°) – deshalb gelangen aspirierte Fremdkörper häufiger in die rechte Lunge." }
    ],
    bossQuestions: [{ id: "at_tr_b1", type: "true_false", statement: "Der Paries membranaceus (hintere Wand der Trachea) besteht aus Bändern mit eingelagerten Muskelfasern.", answer: true }],
    combatQuestions: [
      { id: "at_tr_mc1", type: "mc", question: "Aus welchem Knorpeltyp bestehen die Knorpelspangen der Trachea?", options: [
        { text: "Hyalinem Knorpel", correct: true },
        { text: "Elastischem Knorpel", correct: false },
        { text: "Faserknorpel", correct: false },
        { text: "Knochengewebe", correct: false }
      ]},
      { id: "at_tr_mc2", type: "mc", question: "Was bezeichnet die Bifurcatio tracheä?", options: [
        { text: "Die Aufzweigung der Trachea in linken und rechten Hauptbronchus", correct: true },
        { text: "Den Übergang vom Kehlkopf zur Trachea", correct: false },
        { text: "Die Teilung der Hauptbronchien in Lappenbronchien", correct: false },
        { text: "Den hufeisenförmigen Querschnitt der Knorpelspangen", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "bronchialsystem",
    title: "Bronchialsystem",
    contextHint: "Studienbrief 1035 Strukturen und Funktion des Atmungssystems",
    phase1: {
      soil: { statement: "An der Bifurkation (Höhe 5. Brustwirbel) teilt sich die Trachea in linken und rechten Stammbronchus auf.", answer: true, solution: "An der Bifurcatio tracheä (Höhe 5. Brustwirbel) teilt sich die Trachea in rechten und linken Stammbronchus. Der rechte ist steiler angewinkelt – weshalb aspirierte Fremdkörper häufiger in der rechten Lunge landen – und versorgt drei Lappenbronchien, der linke nur zwei." },
      seed: { statement: "Bronchioli enthalten wie die Stammbronchien einen Knorpelanteil in ihrer Wand.", answer: false, solution: "Die Bronchioli enthalten keinen Knorpelanteil mehr, nur noch glatte Muskulatur." },
      water: { statement: "In den Alveolen findet der Gasaustausch zwischen Alveolarluft und Blut statt.", answer: true, solution: "Die Alveolen sind als Endstrecke des Bronchialbaums der Ort des Gasaustauschs." }
    },
    harvestQuestions: [
      { id: "at_br_h1", type: "true_false", statement: "Die rechte Lunge besitzt drei Lappenbronchien, die linke nur zwei.", answer: true, explanation: "Die rechte Lunge hat drei Lappen (Ober-, Mittel-, Unterlappen), die linke nur zwei (Ober- und Unterlappen), weil links der Herzraum (Impressio cardiaca) Platz beansprucht. Der Mittellappen ist daher ein rein rechtes anatomisches Merkmal." },
      { id: "at_br_h2", type: "true_false", statement: "Die Bronchioli respiratorii enthalten keine Knorpelanteile und werden durch glatte Muskulatur reguliert.", answer: true, explanation: "Ab den Bronchiolen fehlen Knorpelspangen vollständig – die Wandstabilität wird ausschliesslich durch glatte Muskulatur aufrechterhalten. Diese Muskulatur kann durch das autonome Nervensystem reguliert werden (Adrenalin → Bronchodilatation; Parasympathikus → Bronchokonstriktion), was bei Asthma bronchiale pathologisch relevant ist." },
      { id: "at_br_h3", type: "true_false", statement: "Die Alveolarwand besteht aus mehrschichtigem Plattenepithel.", answer: false, explanation: "Die Alveolarwand besteht aus einschichtigem Plattenepithel (Pneumozyten Typ I für Gasaustausch, Typ II für Surfactant-Produktion), nicht mehrschichtigem. Ein mehrschichtiges Epithel würde die Diffusionsstrecke für O2 und CO2 erheblich verlängern und den Gasaustausch behindern." }
    ],
    bossQuestions: [{ id: "at_br_b1", type: "true_false", statement: "Etwa 300 Millionen Alveolen bilden eine Gesamtaustauschfläche von 50 bis 100 Quadratmetern.", answer: true }],
    combatQuestions: [
      { id: "at_br_mc1", type: "mc", question: "Wie viele Lappenbronchien hat die rechte Lunge?", options: [
        { text: "Drei (für Ober-, Mittel- und Unterlappen)", correct: true },
        { text: "Zwei (für Ober- und Unterlappen)", correct: false },
        { text: "Vier", correct: false },
        { text: "Fünf Lappenbronchien", correct: false }
      ]},
      { id: "at_br_mc2", type: "mc", question: "Was ist korrekt bezueglich der Bronchiolen?", options: [
        { text: "Sie enthalten keinen Knorpel mehr in ihrer Wand", correct: true },
        { text: "Sie besitzen noch Knorpelspangen wie die Trachea", correct: false },
        { text: "Sie sind der Hauptort des Gasaustauschs", correct: false },
        { text: "Sie sind ausschliesslich mit mehrschichtigem Plattenepithel ausgekleidet", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "lunge_makroskopie",
    title: "Makroskopie der Lunge",
    contextHint: "Studienbrief 1035 Strukturen und Funktion des Atmungssystems",
    phase1: {
      soil: { statement: "Die rechte Lunge hat drei Lungenlappen, die linke Lunge nur zwei.", answer: true, solution: "Die rechte Lunge hat drei Lappen (Ober-, Mittel-, Unterlappen), die linke nur zwei (Ober-, Unterlappen), da links der Herzraum (Impressio cardiaca) Platz beansprucht. Das Volumenverhältnis beträgt daher ca. 4:3 (rechts:links)." },
      seed: { statement: "Der Pleuraspalt ist mit Luft gefüllt und ermöglicht so die Beweglichkeit der Lunge.", answer: false, solution: "Der Pleuraspalt ist mit seröser Flüssigkeit gefüllt, nicht mit Luft. Er vermittelt Adhäsionskräfte." },
      water: { statement: "Im Pleuraspalt herrscht stets ein Unterdruck, der dafür sorgt, dass die Lunge dem Thorax passiv folgt.", answer: true, solution: "Im Pleuraspalt herrscht permanenter Unterdruck, weil elastische Rückzugskräfte der Lunge und Ausdehnungstendenzen des Thorax einander entgegenwirken. Dieser Unterdruck sorgt dafür, dass die Lunge den Atembewegungen von Thorax und Zwerchfell passiv folgt, ohne sich selbst aktiv auszudehnen." }
    },
    harvestQuestions: [
      { id: "at_lu_h1", type: "true_false", statement: "Das Verhältnis des Lungenvolumens zwischen rechter und linker Lunge beträgt 4:3.", answer: true, explanation: "Die rechte Lunge ist grösser als die linke, weil links der Herzraum (Impressio cardiaca) Platz beansprucht. Das Gewicht beträgt rechts ca. 600 g, links ca. 500 g. Das grössere Volumen rechts erklärt auch, warum aspirierte Fremdkörper häufiger in der rechten Lunge landen." },
      { id: "at_lu_h2", type: "true_false", statement: "Die Pleura visceralis (Lungenfell) liegt direkt der Lunge an, während die Pleura parietalis das Rippenfell bildet.", answer: true, explanation: "Die Pleura visceralis ist eng mit der Lungenoberfläche verwachsen; die Pleura parietalis kleidet den inneren Thoraxraum aus (Rippenfell, Zwerchfellplatte, Mediastinalpleura). Zwischen beiden liegt der kapilläre Pleuraspalt mit seröser Flüssigkeit." },
      { id: "at_lu_h3", type: "true_false", statement: "Am Lungenhilus treten sowohl Arterien als auch Venen in die Lunge ein.", answer: false, explanation: "Am Lungenhilus treten ein: Hauptbronchus, A. pulmonalis (sauerstoffarmes Blut) und Lymphgefässe. Die Pulmonalvenen (sauerstoffreiches Blut) verlassen die Lunge am Hilus – sie treten aus, nicht ein. Alle vier Pulmonalvenen münden in den linken Herzvorhof." }
    ],
    bossQuestions: [{ id: "at_lu_b1", type: "true_false", statement: "Der Pleuraspalt ist mit seröser Flüssigkeit gefüllt und ermöglicht durch Adhäsionskräfte die atemabhängige Lungenbewegung.", answer: true }],
    combatQuestions: [
      { id: "at_lu_mc1", type: "mc", question: "Wie viele Lappen hat die rechte Lunge?", options: [
        { text: "Drei (Ober-, Mittel- und Unterlappen)", correct: true },
        { text: "Zwei (Ober- und Unterlappen)", correct: false },
        { text: "Vier Lappen", correct: false },
        { text: "Einen ungegliederten Lappen", correct: false }
      ]},
      { id: "at_lu_mc2", type: "mc", question: "Was befindet sich im Pleuraspalt?", options: [
        { text: "Seröse Flüssigkeit, die Reibung vermindert und Adhäsionskräfte erzeugt", correct: true },
        { text: "Luft, die den Unterdruck ausgleicht", correct: false },
        { text: "Lymphflüssigkeit zur Immunabwehr", correct: false },
        { text: "Blut aus den Pleuragefässen", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "atmungsprozess",
    title: "Atmungsprozess",
    contextHint: "Studienbrief 1035 Strukturen und Funktion des Atmungssystems",
    phase1: {
      soil: { statement: "Bei der Inspiration kontrahiert das Diaphragma und flacht in abdominaler Richtung ab, während gleichzeitig die Rippen angehoben werden.", answer: true, solution: "Inspiration ist aktiv: Das Diaphragma kontrahiert und flacht ab (vergrossert den Thoraxraum nach unten), gleichzeitig heben Interkostalmuskeln die Rippen (vergrossert den Thoraxraum nach aussen). Der entstehende Unterdruck zieht Luft in die Lunge." },
      seed: { statement: "Einatmung ist ein rein passiver Vorgang, bei dem die Lunge sich selbstständig ausdehnt.", answer: false, solution: "Einatmung ist aktiv: Diaphragma und Atemmuskulatur kontrahieren. Die Lunge selbst ist nicht beweglich, sondern folgt passiv." },
      water: { statement: "Das Atemzentrum in der Medulla oblongata steuert die Lungenventilation durch einen rhythmischen Wechsel zwischen Inspiration und Exspiration.", answer: true, solution: "Das Atemzentrum in der Medulla oblongata erzeugt autonom einen Grundrhythmus der Atemtätigkeit. Dieser Rhythmus wird durch chemische Reize (O2, CO2, pH-Wert) und Mechanorezeptoren (Dehnungsrezeptoren in der Lunge) ständig angepasst." }
    },
    harvestQuestions: [
      { id: "at_ap_h1", type: "true_false", statement: "Während der Exspiration entspannt sich das Diaphragma und wölbt sich in thorakaler Richtung nach oben.", answer: true, explanation: "In Ruhe ist die Ausatmung passiv: Das Diaphragma entspannt sich und wölbt sich durch elastische Retraktionskräfte nach oben zurück. Dadurch verkleinert sich das Thoraxvolumen, der Druck steigt und Luft strömt passiv aus der Lunge heraus." },
      { id: "at_ap_h2", type: "true_false", statement: "Die ausgeatmete Luft enthält denselben Sauerstoffgehalt wie die eingeatmete Luft von ca. 21%.", answer: false, explanation: "Eingeatmete Luft enthält ca. 21% O2, ausgeatmete nur noch ca. 16%. Ca. 5% des eingeatmeten Sauerstoffs wird vom Körper verbraucht. Umgekehrt steigt der CO2-Gehalt von 0,04% (Aussenluft) auf ca. 4% in der ausgeatmeten Luft." },
      { id: "at_ap_h3", type: "mc", question: "Was ist der 'Boyle-Mariotte-Effekt' beim Atemvorgang: wie verändert sich der Alveolardruck bei Inspiration?", options: [
        { text: "Der Alveolardruck sinkt unter den Atmosphärendruck (ca. -1 bis -3 cmH2O) → Luft strömt ein", correct: true },
        { text: "Der Alveolardruck steigt bei Inspiration, damit Luft hineingepresst werden kann", correct: false },
        { text: "Der Alveolardruck bleibt konstant – Luftstrom entsteht durch Saugwirkung der Lunge", correct: false },
        { text: "Der Alveolardruck entspricht immer exakt dem Atmosphärendruck", correct: false }
      ], explanation: "Nach Boyle-Mariotte (p1V1 = p2V2): Wenn das Thoraxvolumen durch Kontraktion von Diaphragma und Interkostalmuskeln zunimmt, sinkt der Druck in der Lunge unter den Atmosphärendruck (ca. -1 bis -3 cmH2O bei normaler Inspiration). Dieser Druckgradient treibt Luft von aussen passiv in die Alveolen. Bei Exspiration: Volumen sinkt → Druck steigt → Luft strömt heraus." }
    ],
    bossQuestions: [{ id: "at_ap_b1", type: "true_false", statement: "Die Lungenventilation besteht aus dem rhythmischen Wechsel zwischen aktiver Inspiration und passiver Exspiration in Ruhe.", answer: true }],
    combatQuestions: [
      { id: "at_ap_mc1", type: "mc", question: "Was geschieht während der Inspiration (Einatmung)?", options: [
        { text: "Das Diaphragma kontrahiert und flacht ab, der Thoraxraum vergrössert sich", correct: true },
        { text: "Das Diaphragma entspannt sich und wölbt sich nach oben", correct: false },
        { text: "Der Thorax verkleinert sich passiv durch Muskelerschlaffung", correct: false },
        { text: "Nur die Rippenmuskeln arbeiten, das Diaphragma bleibt passiv", correct: false }
      ]},
      { id: "at_ap_mc2", type: "mc", question: "Wie hoch ist der CO2-Anteil der ausgeatmeten Luft ungefähr?", options: [
        { text: "Ca. 4 %", correct: true },
        { text: "Ca. 0,04 % (wie in der Aussenluft)", correct: false },
        { text: "Ca. 21 %", correct: false },
        { text: "Ca. 16 % (entspricht dem O2-Gehalt der Ausatemluft)", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "atemmuskulatur",
    title: "Atemmuskulatur und Atemhilfsmuskulatur",
    contextHint: "Studienbrief 1035 Strukturen und Funktion des Atmungssystems",
    phase1: {
      soil: { statement: "Das Diaphragma (Zwerchfell) ist ein zentraler Atemmuskel, der sowohl bei der Inspiration als auch bei der Exspiration wirkt.", answer: true, solution: "Das Diaphragma ist der wichtigste Atemmuskel und leistet in Ruhe den Grossteil der Atemarbeit. Bei der Inspiration kontrahiert es und flacht ab, bei der Exspiration entspannt es sich und wölbt sich passiv nach oben – durch diesen Wechsel verändert es ständig das Thoraxvolumen." },
      seed: { statement: "Die äusseren Zwischenrippenmuskeln (M. intercostales externi) wirken exspiratorisch.", answer: false, solution: "M. intercostales externi wirken inspiratorisch. Exspiratorisch wirken die M. intercostales interni." },
      water: { statement: "Bei Bedarf wird die Atmung durch die Atemhilfsmuskulatur unterstützt, die auch als auxiliäre Atemmuskulatur bezeichnet wird.", answer: true, solution: "Atemhilfsmuskulatur wird bei erhöhtem Atembedarf (Belastung, Atemnot) hinzugeschaltet. Dazu gehören inspiratorisch z.B. M. sternocleidomastoideus und Mm. scaleni sowie exspiratorisch Bauchmuskeln wie M. rectus abdominis, die die Rippen aktiv nach unten ziehen." }
    },
    harvestQuestions: [
      { id: "at_am_h1", type: "true_false", statement: "Der M. intercostales externus (äusserer Zwischenrippenmuskel) ist ein inspiratorisch wirkender Atemmuskel.", answer: true, explanation: "Die Mm. intercostales externi verlaufen von posterior-superior nach anterior-inferior. Bei Kontraktion heben sie die Rippen und erweitern den Thoraxdurchmesser seitlich – ein inspiratorischer Effekt. Die Mm. intercostales interni verlaufen umgekehrt und wirken daher exspiratorisch." },
      { id: "at_am_h2", type: "true_false", statement: "Das Diaphragma wirkt ausschliesslich inspiratorisch und hat keine Funktion bei der Ausatmung.", answer: false, explanation: "Das Diaphragma ist der Hauptatemmuskel für die Inspiration, hat aber auch passiven Anteil bei der Ausatmung: Es entspannt sich und gibt durch seine Rückstellkraft Energie frei, die den Thorax verkleinert. Aktiv exspiratorisch wird es nur bei forcierter Ausatmung (Pressen, Husten, Niesen)." }
    ],
    bossQuestions: [{ id: "at_am_b1", type: "true_false", statement: "Diaphragma und M. intercostales externi gehören zu den primären Atemmuskeln und wirken inspiratorisch.", answer: true }],
    combatQuestions: [
      { id: "at_am_mc1", type: "mc", question: "Welche Muskeln wirken primär inspiratorisch?", options: [
        { text: "Diaphragma und Mm. intercostales externi", correct: true },
        { text: "Mm. intercostales interni und M. rectus abdominis", correct: false },
        { text: "M. transversus abdominis und M. obliquus internus", correct: false },
        { text: "Nur das Diaphragma, Interkostalmuskeln sind exspiratorisch", correct: false }
      ]},
      { id: "at_am_mc2", type: "mc", question: "Was ist die Atemhilfsmuskulatur?", options: [
        { text: "Zusatzliche Muskeln, die bei erhöhtem Atembedarf aktiviert werden", correct: true },
        { text: "Muskeln, die ausschliesslich bei der Exspiration eingesetzt werden", correct: false },
        { text: "Eine Bezeichnung für die Herzmuskulatur im Atembezug", correct: false },
        { text: "Die Rückenmuskulatur als dauerhafter Atemantagonist", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "gasaustausch",
    title: "Gasaustausch",
    contextHint: "Studienbrief 1035 Strukturen und Funktion des Atmungssystems",
    phase1: {
      soil: { statement: "Als Gasaustausch bezeichnet man den Übertritt von Sauerstoff aus der Alveolarluft ins Blut und von Kohlendioxid in umgekehrter Richtung.", answer: true, solution: "Als Gasaustausch wird der Stoffaustausch an den Alveolarmembranen bezeichnet: O2 diffundiert aus der Alveolarluft ins Blut (hoher O2-Partialdruck in den Alveolen, niedriger im Blut), CO2 in die entgegengesetzte Richtung. Dieser Prozess erfolgt ausschliesslich durch passive Diffusion ohne Energieverbrauch." },
      seed: { statement: "Der Gasaustausch in der Lunge erfordert aktiven Energieeinsatz der Zellen.", answer: false, solution: "Der Gasaustausch geschieht per Diffusion, also ohne Energieverbrauch." },
      water: { statement: "Den Gasaustausch zwischen Blut und Körperzellen bezeichnet man als innere Atmung, jenen in der Lunge als äussere Atmung.", answer: true, solution: "Äussere Atmung bezeichnet den Gasaustausch zwischen Alveolarluft und Blut in der Lunge, innere Atmung den Gasaustausch zwischen Blut und Körperzellen im Gewebe. Beide Prozesse verlaufen nach demselben Diffusionsprinzip, aber an unterschiedlichen anatomischen Orten." }
    },
    harvestQuestions: [
      { id: "at_ga_h1", type: "true_false", statement: "Der Gasaustausch findet durch Diffusion statt, also ohne Energieverbrauch.", answer: true, explanation: "O2 diffundiert entlang seines Partialdruckgefälles aus der Alveolarluft (pO2 ca. 100 mmHg) ins Blut (pO2 ca. 40 mmHg). CO2 diffundiert in umgekehrter Richtung. Diffusion ist passiv – kein ATP erforderlich. Voraussetzung ist eine sehr dünne Diffusionsstrecke (Alveolarmembran <0,5 μm)." },
      { id: "at_ga_h3", type: "true_false", statement: "Die Diffusionskapazität beschreibt die Fähigkeit der Lunge zur Aufnahme von Kohlendioxid aus der Luft.", answer: false, explanation: "Die Diffusionskapazität (DLCO) beschreibt die Fähigkeit der Lunge, Gase (v.a. O2) aus der Alveolarluft ins Blut aufzunehmen. CO2 wird im Gegenteil aus dem Blut in die Alveolarluft abgegeben. Die DLCO ist klinisch relevant, z.B. vermindert bei Lungenfibrose oder Lungenemphysem." }
    ],
    bossQuestions: [{ id: "at_ga_b1", type: "true_false", statement: "Äussere und innere Atmung beschreiben zwei verschiedene Orte des Gasaustauschs: Lunge-Blut und Blut-Körperzellen.", answer: true }],
    combatQuestions: [
      { id: "at_ga_mc1", type: "mc", question: "Durch welchen Mechanismus findet der Gasaustausch in der Lunge statt?", options: [
        { text: "Durch Diffusion entlang von Partialdruckunterschieden", correct: true },
        { text: "Durch aktiven Transport mit Energieverbrauch", correct: false },
        { text: "Durch Osmose über die Alveolarmembran", correct: false },
        { text: "Durch Pinozytose der Alveolarzellen", correct: false }
      ]},
      { id: "at_ga_mc2", type: "mc", question: "Was bezeichnet man als 'innere Atmung'?", options: [
        { text: "Den Gasaustausch zwischen Blut und Körperzellen", correct: true },
        { text: "Den Gasaustausch in den Alveolen der Lunge", correct: false },
        { text: "Die Steuerung der Atmung durch das Atemzentrum", correct: false },
        { text: "Die Atemmuskelaktivität bei der Inspiration", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "lungenvolumina_kapazitäten",
    title: "Lungenvolumina und Lungenkapazitäten",
    contextHint: "Studienbrief 1035 Strukturen und Funktion des Atmungssystems",
    phase1: {
      soil: { statement: "Das Atemzugsvolumen bezeichnet das normale Ein- bzw. Ausatemvolumen von ca. 500 ml.", answer: true, solution: "Das Atemzugsvolumen (ca. 500 ml) ist die normale ruhige Atemluftmenge bei einem einzigen Atemzug. Es ist das kleinste der vier Lungenvolumina und lässt in beide Richtungen Reserven offen: inspiratorisches Reservevolumen (ca. 2,5 l) und exspiratorisches Reservevolumen (ca. 1,5 l)." },
      seed: { statement: "Das Residualvolumen kann durch maximale Ausatmung vollständig aus der Lunge ausgeatmet werden.", answer: false, solution: "Das Residualvolumen verbleibt auch nach maximaler Exspiration in der Lunge - es kann nicht ausgeatmet werden." },
      water: { statement: "Die Vitalkapazität setzt sich aus Atemzugsvolumen, inspiratorischem und exspiratorischem Reservevolumen zusammen.", answer: true, solution: "Die Vitalkapazität (ca. 4,5 l) ist die maximale Luftmenge, die nach maximaler Einatmung vollständig ausgeatmet werden kann – sie ist die nutzbare Atemreserve. Addiert man das Residualvolumen (ca. 1,5 l, bleibt immer in der Lunge), ergibt sich die Totalkapazität (ca. 6 l)." }
    },
    harvestQuestions: [
      { id: "at_lv_h1", type: "true_false", statement: "Das Residualvolumen ist die Luftmenge, die auch nach maximaler Exspiration in der Lunge verbleibt.", answer: true, explanation: "Das Residualvolumen (ca. 1,5 l) kann nicht ausgeatmet werden, weil die Atemwege bei starker Exspiration kollabieren würden. Es verdünnt den Alveolarsauerstoff zwischen Atemzuegen und verhindert, dass die Alveolen vollständig zusammenfallen (Atelektase)." },
      { id: "at_lv_h2", type: "true_false", statement: "Die Totalkapazität entspricht der Summe aus Vitalkapazität und Residualvolumen.", answer: true, explanation: "Totalkapazität (ca. 6 l) = Vitalkapazität (ca. 4,5 l) + Residualvolumen (ca. 1,5 l). Die Vitalkapazität umfasst Atemzugvolumen + inspiratorisches + exspiratorisches Reservevolumen und ist spirometrisch direkt messbar. Das Residualvolumen kann nur indirekt bestimmt werden." },
      { id: "at_lv_h3", type: "true_false", statement: "Das inspiratorische Reservevolumen (2-3 l) und das exspiratorische Reservevolumen (1,5 l) sind gleich gross.", answer: false, explanation: "Das inspiratorische Reservevolumen (IRV, ca. 2,5 l) ist deutlich grösser als das exspiratorische Reservevolumen (ERV, ca. 1,5 l). Der Thorax kann durch Muskelkraft weiter eingeatmet als ausgeatmet werden, weshalb mehr Inspirationsreserve als Exspirationsreserve besteht." }
    ],
    bossQuestions: [{ id: "at_lv_b1", type: "true_false", statement: "Nur etwa 60% der eingeatmeten Luftmenge gelangt tatsächlich in die Alveolen; der Rest verbleibt im Totraum.", answer: true }],
    combatQuestions: [
      { id: "at_lv_mc1", type: "mc", question: "Wie gross ist das normale Atemzugvolumen eines Erwachsenen in Ruhe?", options: [
        { text: "Ca. 500 ml", correct: true },
        { text: "Ca. 1500 ml", correct: false },
        { text: "Ca. 3000 ml", correct: false },
        { text: "Ca. 6000 ml", correct: false }
      ]},
      { id: "at_lv_mc2", type: "mc", question: "Welches Lungenvolumen kann auch nach maximaler Ausatmung NICHT ausgeatmet werden?", options: [
        { text: "Das Residualvolumen", correct: true },
        { text: "Das exspiratorische Reservevolumen", correct: false },
        { text: "Das Atemzugvolumen", correct: false },
        { text: "Das inspiratorische Reservevolumen", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "atemsteuerung",
    title: "Atemsteuerung",
    contextHint: "Studienbrief 1035 Strukturen und Funktion des Atmungssystems",
    phase1: {
      soil: { statement: "Die Atemsteuerung findet im Bereich der Medulla oblongata statt und erzeugt einen regelmässigen Grundrhythmus der Atmung.", answer: true, solution: "Das Atemzentrum in der Medulla oblongata ist eine Ansammlung von Nervenzellen, die autonom und rhythmisch Atemsignale an die Atemmuskulatur senden. Dieser Grundrhythmus läuft auch unbewusst weiter und wird nur bei bewusster Kontrolle (Sprechen, Tauchen) vom Kortex beeinflusst." },
      seed: { statement: "Der pH-Wert des Blutes hat keinen Einfluss auf die Atemsteuerung.", answer: false, solution: "pH-Wert, Sauerstoff und Kohlendioxid sind die drei Regelgrössen des Atemregelkreises." },
      water: { statement: "Chemorezeptoren messen Sauerstoff- und Kohlendioxidkonzentration und leiten diese Informationen an das Atemzentrum weiter.", answer: true, solution: "Chemorezeptoren im Karotiskörperchen und in der Medulla oblongata messen kontinuierlich O2- und CO2-Partialdruck sowie pH-Wert des Blutes. Bei Abweichungen wird die Atemfrequenz und -tiefe über das Atemzentrum angepasst – ein effektiver Regelkreis zur Konstanterhaltung der Blutgase." }
    },
    harvestQuestions: [
      { id: "at_as_h1", type: "true_false", statement: "Ein erhöhter CO2-Gehalt im Blut (Hyperkapnie) führt zu einer Steigerung der Atemfrequenz.", answer: true, explanation: "CO2 ist der stärkste Atemantrieb: Hyperkapnie senkt den pH-Wert (durch H2CO3-Bildung), was zentrale Chemorezeptoren in der Medulla oblongata stimuliert und die Atemfrequenz sowie -tiefe steigert. Hypoxie wirkt ebenfalls atemsteigernd, aber mit schwacherem Effekt über periphere Chemorezeptoren." },
      { id: "at_as_h3", type: "true_false", statement: "Eine Abnahme der Sauerstoffkonzentration im Blut führt zu einer Verlangsamung der Atemfrequenz.", answer: false, explanation: "Eine Abnahme der Sauerstoffkonzentration (Hypoxämie) führt zu einer Steigerung, nicht Verlangsamung der Atemfrequenz. Periphere Chemorezeptoren in den Karotis- und Aortakörperchen reagieren auf sinkenden O2-Partialdruck und signalisieren dem Atemzentrum, mehr Atemarbeit zu leisten." }
    ],
    bossQuestions: [{ id: "at_as_b1", type: "true_false", statement: "An der chemischen Atemsteuerung sind Sauerstoff, Kohlendioxid und der pH-Wert des Blutes als Regelgrössen beteiligt.", answer: true }],
    combatQuestions: [
      { id: "at_as_mc1", type: "mc", question: "Welche drei Regelgrössen steuern das Atemzentrum chemisch?", options: [
        { text: "O2-Partialdruck, CO2-Partialdruck und pH-Wert des Blutes", correct: true },
        { text: "Temperatur, Osmolarität und Glukosegehalt des Blutes", correct: false },
        { text: "Ausschliesslich der CO2-Gehalt als einzige Regelgrösse", correct: false },
        { text: "Sauerstoff, Stickstoff und Wasserdampfgehalt der Atemluft", correct: false }
      ]},
      { id: "at_as_mc2", type: "mc", question: "Was bewirkt eine Hyperkapnie (erhöhter CO2-Gehalt im Blut)?", options: [
        { text: "Steigerung der Atemfrequenz und -tiefe", correct: true },
        { text: "Verlangsamung der Atmung", correct: false },
        { text: "Atemstillstand", correct: false },
        { text: "Keine Veränderung der Atemfrequenz", correct: false }
      ]}
    ]
  })
];

const HEILPRAKTIKER_HYBRIDS = [
  Object.assign(makeDetailedPlant({
    id: "hybrid_histologie_atemmuskulatur",
    title: "Histologie der Atemmuskulatur",
    contextHint: "Verbindung von Muskelhistologie (1032) und Atemmuskulatur (1035)",
    phase1: {
      soil: { statement: "Das Diaphragma und die Mm. intercostales gehören histologisch zur quergestreiften Skelettmuskulatur.", answer: true, solution: "Korrekt. Diaphragma und Interkostalmuskeln sind quergestreifte Skelettmuskulatur mit charakteristischen Querstreifen und unterliegen sowohl willkürlicher als auch reflektorischer Steuerung über das somatische Nervensystem." },
      seed: { statement: "Die Atemmuskulatur besteht aus glatter Muskulatur, die ausschliesslich autonom und ohne bewusste Steuerung arbeitet.", answer: false, solution: "Falsch. Diaphragma und Intercostalmuskeln sind quergestreifte Skelettmuskulatur, sowohl willkürlich als auch reflektorisch steuerbar." },
      water: { statement: "Die histologische Einordnung der Atemmuskulatur als Skelettmuskulatur erklärt, warum sie sowohl reflektorisch als auch willkürlich steuerbar ist.", answer: true, solution: "Genau. Quergestreifte Skelettmuskulatur unterliegt dem somatischen Nervensystem, also willkürlicher und reflektorischer Kontrolle." }
    },
    harvestQuestions: [
      { id: "hyb_hA_h1", type: "true_false", statement: "Die Typisierung des Muskelgewebes ist für die Funktionsdeutung wichtig.", answer: true, explanation: "Quergestreifte Skelettmuskulatur ist willkürlich und schnell steuerbar, glatte Muskulatur ist unwillkürlich und ausdauernd, Herzmuskulatur ist unwillkürlich und rhythmisch autonom. Ohne histologische Typisierung bleibt die Funktion eines Muskels unklar." },
      { id: "hyb_hA_h2", type: "true_false", statement: "Der M. sternocleidomastoideus gehört zur inspiratorisch wirkenden Atemhilfsmuskulatur.", answer: true, explanation: "Der M. sternocleidomastoideus hebt bei beidseitiger Kontraktion das Brustbein und wirkt damit inspiratorisch. Er wird bei Atemnot und intensiver körperlicher Belastung hinzugeschaltet. Ein sichtbar angespannter Sternocleidomastoideus ist ein klinisches Zeichen von Atemnot." },
      { id: "hyb_hA_h3", type: "true_false", statement: "Das Diaphragma ist histologisch quergestreifte Skelettmuskulatur.", answer: true, explanation: "Das Diaphragma besteht aus quergestreiften Skelettmuskelfasern – trotz seiner unwillkürlichen Atemfunktion. Das ermöglicht sowohl reflektorische (durch das Atemzentrum) als auch willkürliche Steuerung (Sprechen, Singen, Tauchen). Diese Doppelsteuerung erklärt seine funktionelle Vielseitigkeit." }
    ],
    bossQuestions: [{ id: "hyb_hA_b1", type: "true_false", statement: "Atemmuskulatur (Diaphragma, Mm. intercostales) besteht histologisch aus quergestreifter Skelettmuskulatur und unterliegt sowohl willkürlicher als auch reflektorischer Steuerung.", answer: true }],
    combatQuestions: [
      { id: "hyb_hA_mc1", type: "mc", question: "Welchem histologischen Muskeltyp gehört das Zwerchfell an und was folgt daraus für seine Steuerung?", options: [
        { text: "Quergestreifte Skelettmuskulatur – willkürliche UND reflektorische Steuerung möglich", correct: true },
        { text: "Glatte Muskulatur – ausschliesslich autonome, unwillkürliche Steuerung", correct: false },
        { text: "Herzmuskulatur – autonomer Rhythmus ohne nervale Steuerung", correct: false },
        { text: "Quergestreifte Skelettmuskulatur – ausschliesslich willkürliche Steuerung", correct: false }
      ], explanation: "Das Zwerchfell ist quergestreifte Skelettmuskulatur und unterliegt dem somatischen Nervensystem (N. phrenicus). Diese Einordnung erklärt, warum es sowohl reflektorisch (Atemzentrum) als auch willkürlich (Sprechen, Singen, Tauchen) steuerbar ist." },
      { id: "hyb_hA_mc2", type: "mc", question: "Warum können Menschen die Atmung kurzzeitig willkürlich anhalten oder vertiefen?", options: [
        { text: "Das Zwerchfell ist quergestreifte Skelettmuskulatur und unterliegt dem somatischen Nervensystem", correct: true },
        { text: "Die Atemmuskulatur besteht aus glatter Muskulatur mit vegetativer Innervation", correct: false },
        { text: "Das Atemzentrum in der Medulla oblongata ist willkürlich abschaltbar", correct: false },
        { text: "Der N. phrenicus entspringt aus dem autonomen Nervensystem", correct: false }
      ], explanation: "Da Zwerchfell und Interkostalmuskeln quergestreifte Skelettmuskulatur sind, können kortikale Motoneuronen die Atemtiefe und -frequenz willkürlich modulieren. Gleichzeitig läuft die Grundatmung über das Atemzentrum automatisch weiter." }
    ]
  }), { locked: true, sources: ["histologie_1032::muskelgewebe", "atmungssystem_1035::atemmuskulatur"] }),

  Object.assign(makeDetailedPlant({
    id: "hybrid_neuronale_atemsteuerung",
    title: "Neuronale Atemsteuerung",
    contextHint: "Verbindung von Nervengewebe (1032) und Atemsteuerung (1035)",
    phase1: {
      soil: { statement: "Das Atemzentrum in der Medulla oblongata steuert die Atemmuskulatur über efferente Nervenfasern.", answer: true, solution: "Das Atemzentrum (preBötzinger-Komplex in der Medulla oblongata) generiert rhythmische Impulse und sendet sie über efferente Motoneuronen an Zwerchfell (N. phrenicus) und Interkostalmuskeln. Dieses Zusammenspiel verbindet die Neurophysiologie der Nervenleitung direkt mit der Atemmechanik." },
      seed: { statement: "Atemsteuerung und Nervengewebe sind vollständig voneinander unabhängig: das Atemzentrum arbeitet ohne nervale Strukturen.", answer: false, solution: "Das Atemzentrum besteht aus Nervenzellen und leitet Impulse über Nervenfasern weiter. Nervengewebe ist die Grundlage jeder Atemsteuerung." },
      water: { statement: "Dehnungsrezeptoren in den Alveolen leiten Signale über afferente Nervenfasern an das Atemzentrum weiter, was den Hering-Breuer-Reflex auslöst.", answer: true, solution: "Genau. Dehnungsrezeptoren in der Lunge nehmen mechanische Reize auf und leiten sie über afferente Nervenfasern an das Atemzentrum in der Medulla oblongata weiter, wo die Inspiration reflektorisch gehemmt wird (Hering-Breuer-Reflex)." }
    },
    harvestQuestions: [
      { id: "hyb_nA_h1", type: "true_false", statement: "Der Zellaufbau der Nervenzelle ist für die Funktionsdeutung relevant.", answer: true, explanation: "Dendriten empfangen Signale, der Axonhügel integriert sie, das Axon leitet Aktionspotenziale weiter – diese Zellstruktur erklärt, wie das Atemzentrum rhythmische Impulse generiert und an die Atemmuskulatur weiterleitet. Ohne das Verständnis der Nervenzellarchitektur bleibt die Atemsteuerung unverstehbar." },
      { id: "hyb_nA_h2", type: "true_false", statement: "Der Hering-Breuer-Reflex begrenzt das Inspirationsvolumen und verhindert die Überdehnung der Lunge.", answer: true, explanation: "Beim Hering-Breuer-Reflex messen Dehnungsrezeptoren in der Bronchialwand das Lungenvolumen. Bei ausreichender Dehnung senden sie Signale über afferente Vagusfasern an das Atemzentrum, das daraufhin die Inspiration beendet und die Exspiration einleitet. Der Reflex schützt die Lunge vor Überdehnung." },
      { id: "hyb_nA_h3", type: "true_false", statement: "Das Atemzentrum in der Medulla oblongata nutzt Nervenzellen zur Weiterleitung von Atemimpulsen an die Diaphragmamuskulatur.", answer: true, explanation: "Die Motoneuronen des Atemzentrums senden ihre Impulse über den N. phrenicus (C3-C5) zum Diaphragma. Bei Rückenmarksverletzungen oberhalb C3 ist die Atemmuskulatur vollständig gelahmt und Beatmung wird lebensnotwendig – ein direktes Beispiel für die klinische Bedeutung dieser nervalen Verbindung." }
    ],
    bossQuestions: [{ id: "hyb_nA_b1", type: "true_false", statement: "Chemorezeptoren leiten Veränderungen von O2, CO2 und pH-Wert über afferente Nervenfasern an das Atemzentrum in der Medulla oblongata weiter.", answer: true }],
    combatQuestions: [
      { id: "hyb_nA_mc1", type: "mc", question: "Welche Struktur generiert den rhythmischen Atemantrieb und wohin sendet sie ihre Impulse?", options: [
        { text: "Atemzentrum in der Medulla oblongata – Impulse über den N. phrenicus zum Zwerchfell", correct: true },
        { text: "Hypothalamus – Impulse über den N. vagus zum Zwerchfell", correct: false },
        { text: "Kleinhirn – koordiniert die Atemfrequenz über Motoneuronen", correct: false },
        { text: "Motorischer Cortex – direkte Impulse ohne Beteiligung der Medulla oblongata", correct: false }
      ], explanation: "Das präBötzinger-Areal in der Medulla oblongata generiert den Atemrhythmus. Die Impulse werden über efferente Motoneuronen (N. phrenicus, C3-C5) an das Zwerchfell und die Interkostalmuskeln weitergeleitet." },
      { id: "hyb_nA_mc2", type: "mc", question: "Was passiert bei einer vollständigen Rückenmarksverletzung auf Höhe C2 mit der Atemfunktion?", options: [
        { text: "Atemstillstand, da der N. phrenicus (entspringt C3-C5) unterbrochen ist", correct: true },
        { text: "Keine Beeinträchtigung, da das Atemzentrum weiterarbeitet", correct: false },
        { text: "Nur Thoraxmuskeln gelahmt, das Zwerchfell bleibt funktionsfähig", correct: false },
        { text: "Atemstillstand durch direkte Schädigung des Atemzentrums", correct: false }
      ], explanation: "Der N. phrenicus entspringt auf Höhe C3-C5. Eine Verletzung oberhalb C3 unterbricht diese Bahn zum Zwerchfell vollständig – Beatmung wird lebenserhaltend notwendig. Das Atemzentrum selbst ist intakt, kann aber keine Impulse mehr weiterleiten." }
    ]
  }), { locked: true, sources: ["histologie_1032::nervengewebe", "atmungssystem_1035::atemsteuerung"] }),

  Object.assign(makeDetailedPlant({
    id: "hybrid_sauerstofftransport_blut",
    title: "Sauerstofftransport im Blut",
    contextHint: "Verbindung von Blut als Gewebe (1032) und Gasaustausch (1035)",
    phase1: {
      soil: { statement: "Blut als spezialisiertes Gewebe ist das Transportmedium, das nach dem Gasaustausch in den Alveolen den Sauerstoff zu den Körperzellen befördert.", answer: true, solution: "Korrekt. Blut ist ein spezialisiertes flüssiges Bindegewebe. Seine Erythrozyten nehmen in den Lungenalveolen Sauerstoff auf (Hämoglobin-Bindung) und transportieren ihn zu den Körperzellen, wo Sauerstoff abgegeben und CO2 aufgenommen wird." },
      seed: { statement: "Sauerstoff wird nach dem Gasaustausch direkt im Blutplasma gelöst transportiert, ohne Beteiligung von Blutzellen.", answer: false, solution: "Der grösste Teil des Sauerstoffs wird an Hämoglobin in den Erythrozyten gebunden, nicht frei im Plasma gelöst." },
      water: { statement: "Der Gasaustausch in den Alveolen und der anschliessende Sauerstofftransport durch Erythrozyten bilden zusammen die äussere Atmung.", answer: true, solution: "Genau. Äussere Atmung = Gasaustausch (Lunge) plus Transport (Blut als Gewebe)." }
    },
    harvestQuestions: [
      { id: "hyb_sB_h1", type: "true_false", statement: "Auch für Blut sind Zellzusammensetzung und funktionelle Anteile relevant.", answer: true, explanation: "Blut besteht aus Plasma und zellulären Anteilen (Erythrozyten ca. 45%, Leukozyten und Thrombozyten <1%). Die Erythrozyten mit ihrem Hämoglobin sind ausschliesslich für den O2-Transport zuständig. Ohne diese zellulare Differenzierung bleibt die Transportfunktion des Blutes unerklärt." },
      { id: "hyb_sB_h2", type: "true_false", statement: "Für den Übertritt von Sauerstoff aus der Luft in das Blut sind Ventilation, Diffusion und Perfusion entscheidend.", answer: true, explanation: "Drei Voraussetzungen für effizienten Gasaustausch: V = Ventilation (Luft muss die Alveolen erreichen), Diffusion (Gasaustausch durch die Membran), Q = Perfusion (Blut muss die Alveolen umspülen). Störungen in einer dieser Komponenten reduzieren die O2-Aufnahme erheblich." },
      { id: "hyb_sB_h3", type: "true_false", statement: "Erythrozyten sind der zelluläre Träger des Sauerstoffs im Blut nach dem Gasaustausch in den Alveolen.", answer: true, explanation: "Erythrozyten binden O2 an Hämoglobin (je Hämoglobin-Molekül 4 O2). Nur ca. 3% des O2 werden physikalisch im Plasma gelöst. Der Hämoglobin-Transport ist damit etwa 30-mal effizienter. Die Oxyhämoglobin-Dissoziationskurve beschreibt, wie Hämoglobin O2 in der Lunge aufnimmt und im Gewebe abgibt." }
    ],
    bossQuestions: [{ id: "hyb_sB_b1", type: "true_false", statement: "Blut als spezialisiertes Gewebe (Erythrozyten) und Gasaustausch (Diffusion in Alveolen) sind direkt verknüpft: ohne funktionelles Blutgewebe kein Sauerstofftransport.", answer: true }],
    combatQuestions: [
      { id: "hyb_sB_mc1", type: "mc", question: "Wie wird Sauerstoff nach dem Gasaustausch in den Alveolen im Blut hauptsächlich transportiert?", options: [
        { text: "Gebunden an Hämoglobin in den Erythrozyten (ca. 97% des O2-Gehalts)", correct: true },
        { text: "Frei gelöst im Blutplasma", correct: false },
        { text: "Gebunden an Albumin im Blutplasma", correct: false },
        { text: "Als Bikarbonat (HCO3-) chemisch gebunden", correct: false }
      ], explanation: "Ca. 97% des Sauerstoffs wird an Hämoglobin in den Erythrozyten gebunden, nur ca. 3% sind physikalisch im Plasma gelöst. Der Hämoglobin-Transport ist ca. 30-mal effizienter als der reine Plasmatransport." },
      { id: "hyb_sB_mc2", type: "mc", question: "Welche drei Faktoren sind Voraussetzung für einen effizienten alveolaren Gasaustausch?", options: [
        { text: "Ventilation (Luftzufuhr), Diffusion (Membranpassage) und Perfusion (Blutfluss)", correct: true },
        { text: "Ventilation, Resorption und Exkretion", correct: false },
        { text: "Perfusion, Osmose und aktiver Transport", correct: false },
        { text: "Diffusion, Filtration und Sekretion", correct: false }
      ], explanation: "Effizienter Gasaustausch erfordert: V (Ventilation) = Frischluft erreicht die Alveolen, D (Diffusion) = Gase passieren die alveoläre Membran, Q (Perfusion) = Blut umspült die Alveolen. Störungen in einer dieser drei Grössen reduzieren die Oxygenierung erheblich." }
    ]
  }), { locked: true, sources: ["histologie_1032::blut", "atmungssystem_1035::gasaustausch"] }),

  Object.assign(makeDetailedPlant({
    id: "hybrid_respiratorisches_epithel",
    title: "Respiratorisches Epithel",
    contextHint: "Verbindung von Oberflächenepithel (1032) und Luftröhre (1035)",
    phase1: {
      soil: { statement: "Das mehrreihige Flimmerepithel der Trachea ist ein spezialisiertes Oberflächenepithel der Atemwege.", answer: true, solution: "Korrekt. Das mehrreihige Flimmerepithel gehört zur Klasse der Oberflächenepithelien. Es kleidet die Trachea und die Bronchien aus und schützt die Atemwege durch den mukoziliären Transport: Becherzellen produzieren Schleim, Flimmerhärchen transportieren ihn mit Fremdkörpern nach oben." },
      seed: { statement: "Das Flimmerepithel der Atemwege ist strukturell mit dem einfachen Plattenepithel identisch und hat keine Schutzfunktion.", answer: false, solution: "Diese Aussage ist falsch. Das mehrreihige Flimmerepithel der Atemwege unterscheidet sich grundlegend vom einfachen Plattenepithel: Es ist mehrreihig (alle Zellen an der Basalmembran, aber unterschiedlich hoch), enthält Becherzellen (Schleimproduktion) und Flimmerhaarchen (Transport nach oben). Diese Struktur ist die Grundlage des mukoziliären Selbstreinigungssystems." },
      water: { statement: "Die Schichtung und Zellausstattung des respiratorischen Epithels (Flimmerhaarchen, Becherzellen) erklärt seine Selbstreinigungsfunktion für die Atemwege.", answer: true, solution: "Struktur und Funktion sind direkt verknüpft: Becherzellen produzieren einen Schleimfilm, der eingeatmete Partikel und Keime bindet. Die Flimmerhaarchen schlagen koordiniert in Richtung Rachen und transportieren den Schleim mit den eingeschlossenen Partikeln nach oben (mukoziliäre Clearance). Bei Rauchern werden die Flimmerhaarchen geschädigt, was den chronischen Raucherhustenerklärt." }
    },
    harvestQuestions: [
      { id: "hyb_rE_h1", type: "true_false", statement: "Die Schichtungsform des Epithels steht im Bezug zur Funktion.", answer: true, explanation: "Einschichtiges Plattenepithel (z.B. Alveolen) erlaubt schnelle Diffusion durch minimale Wanddicke. Mehrschichtiges Plattenepithel (Haut, Mundschleimhaut) bietet Schutzmechanismus. Mehrreihiges Flimmerepithel (Trachea) vereint Schleimhautschutz mit aktiver Selbstreinigung. Die Schichtung folgt stets dem funktionellen Bedarf." },
      { id: "hyb_rE_h2", type: "true_false", statement: "Das Flimmerepithel der Trachea transportiert Schwebeteilchen in Richtung Lunge.", answer: false, explanation: "Das Flimmerepithel transportiert Partikel und Schleim von der Lunge weg – in Richtung Rachen zum Aushusten oder Verschlucken. Dieses mukoziliäre Clearance-System schützt die Lunge vor Partikeln und Keimen. Wenn Flimmerhaarchen durch Rauchen geschädigt werden, versagt dieser Schutz." },
      { id: "hyb_rE_h3", type: "true_false", statement: "Das mehrreihige Flimmerepithel der Trachea gehört zum Oberflächenepithel und übernimmt eine aktive Selbstreinigungsfunktion für die Atemwege.", answer: true, explanation: "Das mehrreihige Flimmerepithel (Epithelium pseudostratificatum columnare ciliatum) mit Becherzellen ist der Standardtyp des respiratorischen Epithels. Becherzellen produzieren Schleim, Flimmerhaarchen transportieren ihn mit Keimen und Partikeln nach oben – das mukoziliäre System ist die erste mechanische Abwehrlinie der Atemwege." }
    ],
    bossQuestions: [{ id: "hyb_rE_b1", type: "true_false", statement: "Respiratorisches Epithel (mehrreihiges Flimmerepithel) verbindet histologische Epithelklassifikation mit der Schutzfunktion der Atemwege.", answer: true }],
    combatQuestions: [
      { id: "hyb_rE_mc1", type: "mc", question: "Welches Epithel kleidet die Trachea aus und welche Funktion hat es?", options: [
        { text: "Mehrreihiges Flimmerepithel mit Becherzellen – mukoziliäre Selbstreinigung", correct: true },
        { text: "Einschichtiges Plattenepithel – schnelle Gasdiffusion", correct: false },
        { text: "Mehrschichtiges Plattenepithel – mechanischer Schutz", correct: false },
        { text: "Einschichtiges Zylinderepithel ohne Flimmerhaarchen – Absorption", correct: false }
      ], explanation: "Die Trachea ist mit mehrreihigem Flimmerepithel (Epithelium pseudostratificatum columnare ciliatum) ausgekleidet. Becherzellen produzieren Schleim, der Partikel und Keime einschliessen. Flimmerhaarchen transportieren diesen Schleim nach oben (mukoziliäre Clearance)." },
      { id: "hyb_rE_mc2", type: "mc", question: "In welche Richtung transportieren die Flimmerhaarchen des Trachealepithels den Schleim?", options: [
        { text: "Richtung Rachen – Schleim mit Partikeln und Keimen wird ausgehusten oder geschluckt", correct: true },
        { text: "Richtung Lunge – eingeatmete Luft wird in die Alveolen gelenkt", correct: false },
        { text: "Bidirektional – abwechselnd Richtung Lunge und Rachen", correct: false },
        { text: "Richtung Lunge – Schleim wird zu den Alveolen transportiert", correct: false }
      ], explanation: "Die Flimmerhaarchen schlagen koordiniert rachenwarts (kranial). Schleim mit eingeschlossenen Partikeln und Keimen wird nach oben transportiert und abgeschluckt oder ausgehusten. Rauchen schädigt dieses System – sichtbar am produktiven Raucherhusten." }
    ]
  }), { locked: true, sources: ["histologie_1032::oberflächenepithel", "atmungssystem_1035::trachea"] })
];

const LABEL_EXERCISES = [
  {
    id: "wirbelquerschnitt",
    title: "Querschnitt eines Wirbels",
    hpReward: 1,
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/knochenlehre_figure_8.png",
    aspectRatio: "1/1",
    zones: [
      { id: "z_dorn",     label: "Dornfortsatz",                 left: 22, top:  2, width: 30, height:  8 },
      { id: "z_epi",      label: "Epiduralraum",                 left: 58, top: 17, width: 28, height:  8 },
      { id: "z_rück",    label: "Rückenmark",                  left:  2, top: 24, width: 22, height:  8 },
      { id: "z_csf",      label: "Gehirn-Rückenmark-Flüssigkeit", left: 56, top: 28, width: 32, height: 14 },
      { id: "z_hinter",   label: "Hinterwurzel",                 left:  2, top: 35, width: 22, height:  8 },
      { id: "z_vorder",   label: "Vorderwurzel",                 left:  2, top: 46, width: 22, height:  8 },
      { id: "z_spinal",   label: "Spinalnerv",                   left:  2, top: 72, width: 20, height:  8 },
      { id: "z_gang",     label: "Spinalganglion",               left: 22, top: 72, width: 24, height:  8 },
      { id: "z_wirbel",   label: "Wirbelkörper",                left: 42, top: 72, width: 22, height:  8 },
      { id: "z_quer",     label: "Querfortsatz",                 left: 66, top: 72, width: 22, height:  8 }
    ]
  },
  {
    id: "atemwege",
    title: "Organe der Atmung",
    hpReward: 1,
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/atmungssystem_figure_5.png",
    aspectRatio: "1/1",
    zones: [
      { id: "z_front",   label: "Frontalsinus",   left:  1, top:  5, width: 20, height:  8 },
      { id: "z_nase",    label: "Nasenhöhle",      left:  1, top: 14, width: 18, height:  8 },
      { id: "z_keil",    label: "Keilbeinhöhle",   left: 62, top:  6, width: 24, height:  8 },
      { id: "z_rachen",  label: "Rachenraum",      left: 62, top: 18, width: 20, height:  8 },
      { id: "z_luft",    label: "Luftröhre",       left: 55, top: 33, width: 18, height:  8 },
      { id: "z_rlunge",  label: "Rechte Lunge",    left:  1, top: 53, width: 20, height:  8 },
      { id: "z_llunge",  label: "Linke Lunge",     left: 68, top: 53, width: 22, height:  8 },
      { id: "z_zwerg",   label: "Zwerchfell",      left:  1, top: 78, width: 18, height:  8 }
    ]
  },
  {
    id: "epithelgewebe",
    title: "Aufbau des Epithelgewebes",
    hpReward: 1,
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/histologie_figure_5.png",
    aspectRatio: "1/1",
    zones: [
      { id: "z_bürste",  label: "Bürstensaum",                left:  1, top:  4, width: 20, height: 10 },
      { id: "z_epithel",  label: "Epithelzellen",              left: 34, top:  3, width: 24, height: 10 },
      { id: "z_basal",    label: "Basalmembran",               left: 43, top: 43, width: 24, height: 10 },
      { id: "z_binde",    label: "Bindegewebe mit Gefäßen",    left: 65, top: 31, width: 30, height: 14 }
    ]
  },
  {
    id: "rachen",
    title: "Abschnitte des Rachens",
    hpReward: 1,
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/atmungssystem_figure_7.png",
    aspectRatio: "1/1",
    zones: [
      { id: "z_epi",   label: "Epipharynx",  left: 58, top: 20, width: 34, height: 10 },
      { id: "z_meso",  label: "Mesopharynx", left: 58, top: 36, width: 34, height: 10 },
      { id: "z_hypo",  label: "Hypopharynx", left: 58, top: 52, width: 34, height: 10 }
    ]
  },
  {
    id: "bronchien_lunge",
    title: "Bronchien und Lunge",
    hpReward: 1,
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/atmungssystem_figure_9.png",
    aspectRatio: "1/1",
    zones: [
      { id: "z_luft",    label: "Luftröhre",              left: 40, top:  2, width: 22, height:  9 },
      { id: "z_rbronch", label: "Rechter Hauptbronchus",  left:  2, top: 28, width: 32, height:  9 },
      { id: "z_lbronch", label: "Linker Hauptbronchus",   left: 64, top: 28, width: 32, height:  9 },
      { id: "z_lappen",  label: "Lappenbronchien",        left:  2, top: 40, width: 26, height:  9 },
      { id: "z_seg",     label: "Segmentbronchien",       left: 64, top: 40, width: 30, height:  9 },
      { id: "z_bifurk",  label: "Bifurkation",            left: 36, top: 64, width: 22, height:  9 }
    ]
  },
  {
    id: "alveole",
    title: "Aufbau der Alveole",
    hpReward: 1,
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/atmungssystem_figure_11.png",
    aspectRatio: "1/1",
    zones: [
      { id: "z_alv",    label: "Alveole",               left:  2, top:  4, width: 18, height:  9 },
      { id: "z_o2",     label: "Sauerstoff",             left: 32, top:  4, width: 22, height:  9 },
      { id: "z_co2",    label: "Kohlendioxid",           left: 62, top:  4, width: 28, height:  9 },
      { id: "z_wand",   label: "Alveolarwand",           left: 62, top: 17, width: 28, height:  9 },
      { id: "z_kap",    label: "Kapillar",               left:  2, top: 59, width: 18, height:  9 },
      { id: "z_blut",   label: "Rote Blutkörperchen",    left: 60, top: 59, width: 34, height: 12 }
    ]
  },
  {
    id: "hautschichten",
    title: "Schichten der Haut",
    hpReward: 1,
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/histologie_figure_7.png",
    aspectRatio: "1/1",
    zones: [
      { id: "z_corn",   label: "Stratum corneum",      left: 55, top:  3, width: 42, height:  9 },
      { id: "z_lucid",  label: "Stratum lucidum",      left: 55, top: 14, width: 38, height:  9 },
      { id: "z_gran",   label: "Stratum granulosum",   left: 55, top: 25, width: 42, height:  9 },
      { id: "z_spin",   label: "Stratum spinosum",     left: 55, top: 47, width: 38, height:  9 },
      { id: "z_bas",    label: "Stratum basale",       left: 55, top: 63, width: 38, height:  9 }
    ]
  },
  {
    id: "röhrenknochen",
    title: "Aufbau des Röhrenknochens",
    hpReward: 1,
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/histologie_figure_20.png",
    aspectRatio: "1/1",
    zones: [
      { id: "z_ephy",   label: "Epiphyse",       left:  2, top:  3, width: 18, height:  8 },
      { id: "z_meta",   label: "Metaphyse",      left:  2, top: 16, width: 18, height:  8 },
      { id: "z_dia",    label: "Diaphyse",       left:  2, top: 45, width: 18, height:  8 },
      { id: "z_fuge",   label: "Epiphysenfuge",  left: 64, top: 11, width: 30, height:  8 },
      { id: "z_spong",  label: "Spongiosa",      left: 64, top: 20, width: 22, height:  8 },
      { id: "z_komp",   label: "Kompakta",       left: 64, top: 35, width: 22, height:  8 },
      { id: "z_mark",   label: "Markhöhle",      left: 64, top: 45, width: 22, height:  8 }
    ]
  },
  {
    id: "atlas_axis",
    title: "1. und 2. Halswirbel (Atlas und Axis)",
    hpReward: 1,
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/knochenlehre_figure_10.png",
    aspectRatio: "1/1",
    zones: [
      { id: "z_atlas",   label: "Atlas",                   left:  2, top: 26, width: 14, height:  9 },
      { id: "z_axs",     label: "Axis",                    left:  2, top: 42, width: 14, height:  9 },
      { id: "z_zahn",    label: "Zahnfortsatz des Axis",   left: 30, top:  2, width: 34, height:  9 },
      { id: "z_qband",   label: "Querband des Atlas",      left: 68, top: 19, width: 28, height:  9 },
      { id: "z_wloch",   label: "Wirbelloch",              left: 60, top: 33, width: 24, height:  9 },
      { id: "z_qfort",   label: "Querfortsatz der Axis",   left: 55, top: 47, width: 36, height:  9 },
      { id: "z_wkörp",  label: "Wirbelkörper der Axis",   left: 54, top: 57, width: 36, height:  9 },
      { id: "z_dfort",   label: "Dornfortsatz der Axis",   left:  2, top: 62, width: 30, height:  9 }
    ]
  },
  {
    id: "thorax",
    title: "Knochen des Brustkorbs",
    hpReward: 1,
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/knochenlehre_figure_11.png",
    aspectRatio: "1/1",
    zones: [
      { id: "z_clav",   label: "Clavicula",    left:  2, top:  4, width: 22, height:  8 },
      { id: "z_scap",   label: "Scapula",      left:  2, top: 14, width: 18, height:  8 },
      { id: "z_hum",    label: "Humerus",      left:  2, top: 24, width: 18, height:  8 },
      { id: "z_stern",  label: "Sternum",      left: 64, top: 36, width: 18, height:  8 },
      { id: "z_cost",   label: "Costä",       left: 64, top: 46, width: 18, height:  8 },
      { id: "z_ws",     label: "Wirbelsäule",  left: 64, top: 56, width: 22, height:  8 },
      { id: "z_ulna",   label: "Ulna",         left:  2, top: 70, width: 14, height:  8 },
      { id: "z_rad",    label: "Radius",       left:  2, top: 78, width: 14, height:  8 }
    ]
  },
  {
    id: "schultergelenk",
    title: "Schultergelenk",
    hpReward: 1,
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/knochenlehre_figure_12.png",
    aspectRatio: "1/1",
    zones: [
      { id: "z_dach",   label: "Schulterdach",        left:  2, top: 10, width: 24, height:  9 },
      { id: "z_klb",    label: "Schlüsselbein",       left: 55, top:  2, width: 32, height:  9 },
      { id: "z_oa",     label: "Oberarmknochenkopf",  left:  2, top: 22, width: 30, height:  9 },
      { id: "z_pfan",   label: "Gelenkpfanne",        left:  2, top: 33, width: 22, height:  9 },
      { id: "z_oarm",   label: "Oberarmknochen",      left:  2, top: 56, width: 28, height:  9 },
      { id: "z_sblatt", label: "Schulterblatt",       left: 64, top: 58, width: 28, height:  9 }
    ]
  },
  {
    id: "hand_anatomie",
    title: "Anatomie der Hand",
    hpReward: 1,
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/knochenlehre_figure_14.png",
    aspectRatio: "1/1",
    zones: [
      { id: "z_endgl",  label: "Endglieder",        left:  2, top:  6, width: 22, height:  8 },
      { id: "z_mitgl",  label: "Mittelglieder",     left:  2, top: 15, width: 24, height:  8 },
      { id: "z_grundgl",label: "Grundglieder",      left:  2, top: 24, width: 22, height:  8 },
      { id: "z_mhkn",   label: "Mittelhandknochen", left:  2, top: 38, width: 30, height:  8 },
      { id: "z_elle",   label: "Elle",              left:  2, top: 85, width: 14, height:  8 },
      { id: "z_sp",     label: "Speiche",           left: 62, top: 87, width: 18, height:  8 },
      { id: "z_kahnb",  label: "Kahnbein",          left: 50, top: 77, width: 22, height:  8 },
      { id: "z_kopfb",  label: "Kopfbein",          left: 50, top: 68, width: 20, height:  8 }
    ]
  },
  {
    id: "kniegelenk",
    title: "Aufbau des Kniegelenks",
    hpReward: 1,
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/knochenlehre_figure_17.png",
    aspectRatio: "1/1",
    zones: [
      { id: "z_fem",   label: "Femur",                        left: 60, top:  2, width: 30, height:  9 },
      { id: "z_gkn",   label: "Gelenkkopf mit Gelenkknorpel", left: 58, top: 26, width: 38, height: 14 },
      { id: "z_kreuz", label: "Kreuzband",                    left: 60, top: 43, width: 22, height:  9 },
      { id: "z_men",   label: "Meniskus",                     left: 60, top: 52, width: 18, height:  9 },
      { id: "z_gb",    label: "Gelenkbänder",                 left: 60, top: 61, width: 24, height:  9 }
    ]
  },
  {
    id: "gesichtsmuskeln",
    title: "Muskeln des Gesichts",
    hpReward: 1,
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/muskellehre_figure_10.png",
    aspectRatio: "1/1",
    zones: [
      { id: "z_front",  label: "M. frontalis",                left: 52, top:  2, width: 38, height:  9 },
      { id: "z_orbo",   label: "M. orbicularis oculi",        left: 52, top: 13, width: 42, height:  9 },
      { id: "z_nas",    label: "M. nasalis",                  left: 52, top: 25, width: 22, height:  9 },
      { id: "z_orbor",  label: "M. orbicularis oris",         left: 52, top: 52, width: 40, height:  9 },
      { id: "z_bucc",   label: "M. buccinator",               left:  2, top: 42, width: 24, height:  9 },
      { id: "z_mass",   label: "M. masseter",                 left:  2, top: 56, width: 20, height:  9 }
    ]
  },
  {
    id: "halsmuskeln",
    title: "Muskeln des Halses",
    hpReward: 1,
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/muskellehre_figure_12.png",
    aspectRatio: "1/1",
    zones: [
      { id: "z_spl",   label: "M. splenius capitis",          left:  2, top:  3, width: 32, height:  9 },
      { id: "z_lev",   label: "M. levator scapulä",          left:  2, top: 12, width: 34, height:  9 },
      { id: "z_scm",   label: "M. sternocleidomastoideus",    left:  2, top: 22, width: 48, height:  9 },
      { id: "z_scaa",  label: "M. scalenus anterior",         left:  2, top: 33, width: 34, height:  9 },
      { id: "z_trap",  label: "M. trapezius",                 left:  2, top: 52, width: 20, height:  9 },
      { id: "z_thy",   label: "M. thyrohyoideus",             left: 62, top: 12, width: 34, height:  9 },
      { id: "z_omo",   label: "M. omohyoideus",               left: 62, top: 22, width: 28, height:  9 },
      { id: "z_sterno",label: "M. sternohyoideus",            left: 62, top: 32, width: 32, height:  9 }
    ]
  },
  {
    id: "brustmuskeln",
    title: "Muskeln des Brustkorbs",
    hpReward: 1,
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/muskellehre_figure_13.png",
    aspectRatio: "1/1",
    zones: [
      { id: "z_scmb",  label: "M. sternocleidomastoideus",  left:  2, top:  3, width: 44, height:  9 },
      { id: "z_trapb", label: "M. trapezius",               left:  2, top: 12, width: 22, height:  9 },
      { id: "z_delt",  label: "M. deltoideus",              left:  2, top: 22, width: 22, height:  9 },
      { id: "z_pect",  label: "M. pectoralis major",        left:  2, top: 34, width: 30, height:  9 },
      { id: "z_bic",   label: "M. biceps brachii",          left:  2, top: 44, width: 28, height:  9 },
      { id: "z_serr",  label: "M. serratus anterior",       left:  2, top: 56, width: 30, height:  9 },
      { id: "z_intc",  label: "Mm. intercostales externi",  left: 60, top: 44, width: 36, height: 12 }
    ]
  },
  {
    id: "bauchmuskeln",
    title: "Muskeln des Bauches",
    hpReward: 1,
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/muskellehre_figure_14.png",
    aspectRatio: "1/1",
    zones: [
      { id: "z_obl",   label: "M. obliquus externus abdominis", left:  2, top: 20, width: 46, height: 12 },
      { id: "z_tens",  label: "M. tensor fasciä latä",        left:  2, top: 44, width: 40, height:  9 },
      { id: "z_sart",  label: "M. sartorius",                   left:  2, top: 56, width: 22, height:  9 },
      { id: "z_rfem",  label: "M. rectus femoris",              left:  2, top: 65, width: 30, height:  9 },
      { id: "z_rect",  label: "M. rectus abdominis",            left: 58, top: 18, width: 38, height:  9 },
      { id: "z_trans", label: "M. transversus abdominis",       left: 58, top: 28, width: 40, height:  9 },
      { id: "z_pyr",   label: "M. pyramidalis",                 left: 58, top: 38, width: 26, height:  9 }
    ]
  }
];

const PACK_CONTENT = {
  packId: "heilpraktiker",
  lab: {
    hybrids: HEILPRAKTIKER_HYBRIDS
  },
  labelExercises: LABEL_EXERCISES,
  beds: [
    {
      id: "zytologie_1031",
      title: "Zytologie (1031)",
      plants: ZYTOLOGIE_1031_PLANTS
    },
    {
      id: "histologie_1032",
      title: "Histologie (1032)",
      plants: HISTOLOGIE_1032_PLANTS
    },
    {
      id: "knochenlehre_1033",
      title: "Knochenlehre (1033)",
      plants: KNOCHENLEHRE_1033_PLANTS
    },
    {
      id: "muskellehre_1034",
      title: "Muskellehre (1034)",
      plants: MUSKELLEHRE_1034_PLANTS
    },
    {
      id: "atmungssystem_1035",
      title: "Atmungssystem (1035)",
      plants: ATMUNGSSYSTEM_1035_PLANTS
    }
  ]
};
