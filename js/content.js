
function makePlant(id, title, context, n) {
  const qBase = `${id}_${n}`;
  const harvestQuestions = [
    { id: `${qBase}_h1`, type: "true_false", statement: `${title} ist ein eigenständiges anatomisch-physiologisches Thema mit eigener Terminologie und Systematik.`, answer: true },
    { id: `${qBase}_h2`, type: "true_false", statement: `${title} hat keinen inhaltlichen Bezug zu den Grundlagen von ${context}.`, answer: false },
    { id: `${qBase}_h3`, type: "true_false", statement: `Ein sicheres Verständnis von ${title} erfordert das Kennen der wesentlichen Begriffe, Strukturen und Funktionsprinzipien dieses Themas.`, answer: true }
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
    phase4Questions: def.phase4Questions || [],
    colorOverride: def.colorOverride || null
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
        solution: "Zellen mit gleicher Spezialisierung lagern sich zu Gewebeverbänden zusammen. Gewebe ist damit die nächsthöhere Organisationsebene über der Einzelzelle und Grundlage aller Organe des Körpers. Die Hierarchie lautet: Zelle → Gewebe → Organ → Organsystem → Organismus; die Leber ist beispielsweise ein Organ, das aus mehreren Gewebetypen besteht. Viren gelten hingegen nicht als lebensfähig, da sie keinen eigenen Stoffwechsel besitzen und sich nur mithilfe der Replikationsmaschinerie einer Wirtszelle vermehren können – sie erfüllen nicht alle vier Grundeigenschaften des Lebens eigenständig."
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
    phase4Questions: [
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
        solution: "Zellform und Funktion sind direkt verknüpft: Nervenzellen sind lang ausgezogen für Signalleitung, Epithelzellen flach für Oberflächenbedeckung, glatte Muskelzellen spindelförmig mit einem zentralen ovalen Kern für Kontraktion. Skelettmuskelfasern dagegen entstehen durch Verschmelzung von Myoblasten und besitzen deshalb viele randständige Kerne. Diese Formenvielfalt ist kein Zufall, sondern Ausdruck funktioneller Spezialisierung."
      },
      seed: {
        statement: "Alle menschlichen Zellen sind in Form und Grösse nahezu identisch.",
        answer: false,
        solution: "Erythrozyten sind nur etwa 7–8 µm gross, bikonkav geformt und besitzen weder Zellkern noch Mitochondrien – ATP gewinnen sie ausschliesslich durch anaerobe Glykolyse. Thrombozyten sind ebenfalls kernlose Membranfragmente, die durch Abschnürung aus Megakaryozyten im Knochenmark entstehen. Nervenzellen können mit ihren Axonen über einen Meter lang sein, um weit entfernte Strukturen zu verbinden. Diese extreme Vielfalt spiegelt die verschiedenartigen Aufgaben der Zellen im Körper wider."
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
    phase4Questions: [
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
        solution: "Prokaryonte Zellen wie Bakterien und Archäen besitzen kein von einer Membran umschlossenes Zellkernäquivalent. Ihre DNA liegt frei als Nucleoid (kreisförmiges Chromosom) im Zytoplasma; zusätzlich können kleine ringförmige DNA-Stücke (Plasmide) vorhanden sein. Prokaryoten besitzen Ribosomen vom 70S-Typ (Untereinheiten 30S und 50S) – kleiner als die eukaryonten 80S-Ribosomen. Pilze, Pflanzen, Tiere und Protisten (z.B. Amöben) sind Eukaryoten – die einzigen Prokaryoten sind Bacteria und Archäa."
      },
      seed: {
        statement: "Eukaryonte Zellen besitzen einen Zellkern.",
        answer: true,
        solution: "Der membranbegrenzte Zellkern (Nukleus) ist das definitive Merkmal aller Eukaryoten. Er trennt die DNA vom Zytoplasma und ermöglicht getrennte Transkription (im Zellkern) und Translation (am Ribosom im Zytoplasma). Bei Prokaryoten fehlt diese Trennung; Transkription und Translation laufen gleichzeitig im selben Zellraum ab – ein Ribosom kann an die wachsende mRNA binden, noch während die RNA-Polymerase transkribiert. Antibiotika, die auf prokaryonte 70S-Ribosomen wirken (z.B. Tetracycline), schädigen menschliche Zellen mit 80S-Ribosomen daher nicht; gegen Pilzinfektionen (Eukaryoten!) wirken sie aus demselben Grund nicht."
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
    phase4Questions: [
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
        solution: "Durch Zelldifferenzierung werden aus einheitlichen Vorläuferzellen Spezialisten. Die vier Grundgewebetypen des Körpers – Epithelgewebe, Binde- und Stützgewebe, Muskelgewebe und Nervengewebe – entstehen alle durch Differenzierung. Die DNA-Sequenz bleibt bei der Differenzierung unverändert; was sich ändert, ist das Genexpressionsmuster (epigenetische Regulation). Hoch differenzierte Zellen wie ausgereifte Neuronen sind postmitotisch – sie verlassen den Zellzyklus dauerhaft und können sich nicht mehr teilen. Die Differenzierungsfähigkeit von Stammzellen wird in drei Stufen unterteilt: Totipotenz (alle Zelltypen inkl. extra-embryonalem Gewebe), Pluripotenz (alle somatischen Zelltypen, kein extra-embryonales Gewebe) und Multipotenz (nur begrenzte Zelltypen)."
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
    phase4Questions: [
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
        solution: "Als selektiv durchlässige Barriere lässt die Zellmembran Wasser und kleine ungeladene Moleküle passieren, während grössere oder geladene Substanzen Kanalproteine oder aktive Transporter benötigen. Die Na+/K+-ATPase ist die wichtigste Ionenpumpe: Sie transportiert pro ATP-Molekül 3 Na+ aus der Zelle und 2 K+ hinein und erzeugt so das Ruhemembranpotential. Erleichterte Diffusion (z.B. Glukose durch GLUT) verläuft entlang des Gradienten ohne Energieverbrauch, aktiver Transport (z.B. Na+/K+-ATPase) gegen den Gradienten mit ATP. Phagozytose nimmt grosse feste Partikel auf, Pinozytose kleine Flüssigkeitstropfen – beide sind Formen der Endozytose. Osmose ist der passive Wassertransport durch eine semipermeable Membran von der verdünnteren zur konzentrierteren Lösung. Das Fluid-Mosaik-Modell beschreibt die Membran als flüssig-kristallines Gebilde mit lateral beweglichen Phospholipiden und eingelagerten Proteinen."
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
    phase4Questions: [
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
        solution: "Organellen sind für die Zellfunktion unverzichtbar. Freie Ribosomen im Zytosol synthetisieren zytosolische Proteine, membrangebundene Ribosomen am rauen ER synthetisieren Sekret- und Membranproteine. Das glatte ER (ohne Ribosomen) ist zuständig für Lipidsynthese und Steroidhormonsynthese. Lysosomen enthalten saure Hydrolasen bei einem pH von ca. 4,5 und bauen aufgenommene Partikel und beschädigte Organellen ab (Autophagie). Mitochondrien besitzen eine eigene zirkuläre DNA (mtDNA) und 70S-Ribosomen – Belege für ihre bakterielle Herkunft (Endosymbiosetheorie). Der Golgi-Apparat modifiziert Proteine durch Glykosylierung und leitet sie an ihre Zielorte weiter."
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
    phase4Questions: [
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
        solution: "Der Zellkern enthält das gesamte Erbgut in Form von 46 Chromosomen (44 Autosomen und 2 Gonosomen) und steuert über Genexpression alle wesentlichen Zellprozesse. Das Chromatin im Kern liegt in zwei Zuständen vor: Euchromatin ist aufgelockert und transkriptionsaktiv, Heterochromatin ist dicht kondensiert und weitgehend inaktiv. Kernporen in der Kernhülle regulieren den selektiven Transport von Molekülen zwischen Kern und Zytoplasma, und im Nukleolus werden die ribosomalen RNA-Untereinheiten assembliert. Die Kernform variiert je nach Zelltyp: Erythrozyten sind kernlos, Neutrophile haben mehrlappige Kerne, Skelettmuskelfasern sind vielkernig, weil sie durch Fusion vieler Myoblasten entstehen."
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
    phase4Questions: [
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
        solution: "Der zelluläre Stoffwechsel umfasst alle biochemischen Reaktionen, durch die Zellen Nährstoffe aufnehmen, umwandeln und verwerten. Proteine, Kohlenhydrate, Lipide, Wasser und Enzyme sind dabei die zentralen Substrate und Werkzeuge dieser Prozesse. Die Glykolyse – der Abbau von Glukose zu Pyruvat – findet ausschliesslich im Zytosol (Zytoplasma) statt und ist sowohl bei Prokaryoten als auch bei Eukaryoten gleich lokalisiert. Der nachfolgende Zitratzyklus (Krebszyklus) und die oxidative Phosphorylierung (Atmungskette) laufen dagegen in der Mitochondrienmatrix bzw. an der inneren Mitochondrienmembran ab."
      },
      seed: {
        statement: "Energieaspekte sind vom zellulären Stoffwechsel getrennt und kein Thema der Zytologie.",
        answer: false,
        solution: "Energie ist eine zentrale Grösse im Zellstoffwechsel: Katabole Prozesse (Abbau) setzen Energie frei, anabole Prozesse (Aufbau) verbrauchen sie. ATP als universelle Energiewährung der Zelle verbindet beide Seiten des Stoffwechsels miteinander. Bei der vollständigen aeroben Oxidation eines Glukosemoleküls entstehen netto ca. 30–32 ATP (moderne Schätzung unter Berücksichtigung von Membranverlusten; ältere Angaben von 36–38 ATP gelten als überholt). Die Glykolyse allein liefert dabei nur 2 ATP netto; den grossen Rest liefern Zitratzyklus und Atmungskette. Das zentrale Dogma der Molekularbiologie (Crick 1958) beschreibt den Informationsfluss: Replikation (DNA → DNA), Transkription (DNA → mRNA im Zellkern) und Translation (mRNA → Protein am Ribosom)."
      },
      water: {
        statement: "Stoffwechselvorgänge sind für Zellfunktion und Anpassungsfähigkeit grundlegend.",
        answer: true,
        solution: "Ohne funktionierende Stoffwechselprozesse können Zellen nicht überleben, wachsen oder auf Veränderungen reagieren. Essentielle Aminosäuren können vom Körper nicht selbst synthetisiert werden und müssen mit der Nahrung aufgenommen werden; beim gesunden Erwachsenen sind es 8 (u. a. Leucin, Tryptophan, Lysin, Valin). Pyruvat aus der Glykolyse wird vor dem Eintritt in den Zitratzyklus durch den Pyruvat-Dehydrogenase-Komplex in der Mitochondrienmatrix zu Acetyl-CoA umgewandelt – mit Freisetzung von CO2 und Gewinnung von NADH; erst Acetyl-CoA tritt in den Zitratzyklus ein."
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
    phase4Questions: [
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
        solution: "Mitose führt zu genau zwei genetisch identischen, diploiden Tochterzellen – nicht vier haploide. In der G2-Phase der Interphase werden die replizierte DNA auf Fehler geprüft und Proteine für den Spindelapparat gebildet. Der Spindelapparat selbst besteht aus Mikrotubuli, die von den Zentrosomen an den Zellpolen ausgehen und in der Anaphase die Schwesterchromatiden zu den Polen ziehen. Nach der Kernteilung (Karyokinese) folgt die Zytoplasmateilung (Zytokinese), bei der in tierischen Zellen ein kontraktiler Aktin-Myosin-Ring das Zytoplasma teilt."
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
    phase4Questions: [
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
        solution: "Meiose tritt ausschliesslich in den Keimdrüsengeweben (Hoden, Eierstock) auf. In der Prophase I lagern sich die homologen Chromosomenpaare zusammen (Synapsis) und bilden einen Synaptonemalkomplex. An Überkreuzungsstellen (Chiasmata) findet das Crossing-over statt: homologe DNA-Segmente werden ausgetauscht, was neue Allelkombinationen erzeugt. Die Interkinese zwischen Meiose I und Meiose II enthält keine vollständige DNA-Replikation – die DNA wird also nur einmal repliziert, aber zweimal geteilt."
      },
      water: {
        statement: "Bei der Meiose entstehen aus einer diploiden Zelle vier haploide, nicht erbgleiche Zellen.",
        answer: true,
        solution: "Aus der diploiden Ausgangszelle (2n = 46) entstehen nach Meiose I (Chromosomenzahlreduktion: Trennung der homologen Chromosomen) und Meiose II (Trennung der Schwesterchromatiden) vier haploide Tochterzellen (n = 23). Durch Crossing-over und die zufällige unabhängige Verteilung der 23 Chromosomenpaare (Independent Assortment) entstehen theoretisch 2^23 ≈ 8,4 Millionen verschiedene Gametenkombinationen allein durch die Segregation, was die immense genetische Vielfalt erklärt."
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
    phase4Questions: [
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
        solution: "Chromosomenaberrationen entstehen nicht durch Membranfehler, sondern durch Fehler bei der Zellteilung: Während der Mitose oder Meiose kann die Verteilung der Chromosomen fehlerhaft verlaufen (Non-disjunction), was zu Fehlanzahlen oder Strukturveränderungen führt. Man unterscheidet numerische Aberrationen (Änderung der Chromosomenzahl, z. B. Trisomien) von strukturellen Aberrationen (Änderung der Chromosomenstruktur bei gleicher Zahl): Strukturelle Typen sind Deletion (Chromosomenstück fehlt), Duplikation (Stück doppelt vorhanden), Inversion (Stück umgedreht) und Translokation (Stück auf anderem Chromosom)."
      },
      water: {
        statement: "Es wird zwischen autosomalen und gonosomalen numerischen Aberrationen unterschieden.",
        answer: true,
        solution: "Autosomale Aberrationen betreffen die Körperchromosomen (1–22), gonosomale die Geschlechtschromosomen (X, Y). Trisomie 21 (Down-Syndrom) ist autosomale Aberration, Turner-Syndrom (45, X0) und Klinefelter-Syndrom (47, XXY) sind gonosomale Aberrationen. Von den autosomalenTrisomien sind nur drei mit dem Leben vereinbar: Trisomie 21 (Down), Trisomie 18 (Edwards-Syndrom) und Trisomie 13 (Patau-Syndrom); alle anderen führen zur Fehlgeburt. Die Monosomie X (Turner, 45, X0) ist die einzige lebensfähige menschliche Monosomie, da Monosomien der Autosomen stets letal sind."
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
    phase4Questions: [
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
      soil: { statement: "Adhäsionskontakte, Tight Junctions und Gap Junctions sind drei strukturell und funktionell verschiedene Typen von Zellverbindungen.", answer: true, solution: "Die drei Verbindungstypen haben verschiedene Aufgaben: Adhäsionskontakte (z.B. Desmosomen) geben mechanischen Halt, Tight Junctions dichten den Interzellularraum ab und verhindern parazelluläre Diffusion, Gap Junctions ermöglichen direkten Stoffaustausch zwischen Zellen. Tight Junctions bestehen aus den Transmembranproteinen Claudin und Occludin, die eine feste Abdichtung zwischen Epithelzellen erzeugen – z.B. an der Blut-Hirn-Schranke. Desmosomen (Adhäsionskontakte) verankern Keratin-Intermediarfilamente benachbarter Zellen über Desmoplakin und Desmoglein, was Epithelgeweben Zugfestigkeit verleiht." },
      seed: { statement: "Alle Zellverbindungen haben dieselbe Funktion und sind histologisch nicht unterscheidbar.", answer: false, solution: "Die drei Verbindungstypen haben klar unterschiedliche Aufgaben: Tight Junctions dichten den Interzellularraum ab, Adhäsionskontakte (Desmosomen) geben mechanischen Halt, Gap Junctions ermöglichen direkten Stoff- und Signalaustausch zwischen Nachbarzellen." },
      water: { statement: "Gap Junctions dienen dem Signal- und Stoffaustausch zwischen Zellen.", answer: true, solution: "Gap Junctions bestehen aus je sechs Connexin-Proteinen zu einem Connexon; zwei gegenüberliegende Connexone bilden einen Kanal. Diese Kanäle erlauben den Durchtritt von Molekülen bis ca. 1 kDa – also Ionen (Na+, K+, Ca2+), cAMP und kleine Metaboliten –, nicht aber von Proteinen oder DNA. Dadurch können z.B. Herzmuskelzellen elektrische Signale direkt weitergeben und koordiniert schlagen." }
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
      ], explanation: "Desmosomen (Maculä adhärentes) verbinden Keratin-Intermediarfilamente benachbarter Zellen über Desmoplakin und Desmoglein/Desmocollin. Sie verleihen epithelialen Geweben (Haut, Herzmuskel) Zugfestigkeit. Autoantikörper gegen Desmoglein führen zur Pemphigus vulgaris (blasenbildende Hauterkrankung)." },
      { id: "hi_zv_h4", type: "true_false", statement: "Tight Junctions verhindern die parazelluläre Diffusion von Ionen und kleinen Molekülen durch den Interzellularraum.", answer: true, explanation: "Tight Junctions dichten den parazellulären Weg vollständig ab, indem Claudin und Occludin eine fest versiegelte Kontaktstelle zwischen benachbarten Epithelzellen bilden. An der Blut-Hirn-Schranke ist diese Abdichtung besonders ausgeprägt." },
      { id: "hi_zv_h5", type: "mc", question: "Aus wie vielen Connexin-Proteinen besteht ein einzelnes Connexon (Halbkanal) einer Gap Junction?", options: [
        { text: "Sechs Connexin-Proteine", correct: true },
        { text: "Zwei Connexin-Proteine", correct: false },
        { text: "Zwölf Connexin-Proteine", correct: false },
        { text: "Vier Connexin-Proteine", correct: false }
      ], explanation: "Ein Connexon besteht aus sechs Connexin-Proteinen, die ringförmig einen Kanal bilden. Zwei gegenüberliegende Connexone – je eines aus einer Zelle – bilden zusammen den vollständigen Gap-Junction-Kanal, der Ionen und kleine Moleküle bis ca. 1 kDa durchlässt." },
      { id: "hi_zv_h6", type: "mc", question: "Welche Verbindungsproteine sind spezifisch für Adhäsionskontakte (Desmosomen)?", options: [
        { text: "Desmoplakin und Desmoglein", correct: true },
        { text: "Claudin und Occludin", correct: false },
        { text: "Connexin", correct: false },
        { text: "Kollagen Typ IV und Laminin", correct: false }
      ], explanation: "Desmosomen enthalten die desmosomalen Cadherine Desmoglein und Desmocollin sowie das Ankerprotein Desmoplakin, das die Keratin-Intermediarfilamente verknüpft. Claudin/Occludin gehören zu Tight Junctions, Connexin zu Gap Junctions." }
    ],
    phase4Questions: [
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
      ]},
      { id: "hi_zv_mc3", type: "mc", question: "Welche Aussagen zu Gap Junctions und ihrer physiologischen Bedeutung sind korrekt?", options: [
        { text: "Gap Junctions ermöglichen direkten Ionen- und Kleinmolekültransfer zwischen benachbarten Zellen", correct: true },
        { text: "Im Herzmuskel koppeln Gap Junctions die elektrische Erregung zwischen Kardiomyozyten", correct: true },
        { text: "Gap Junctions lassen Proteine und DNA frei passieren", correct: false },
        { text: "Gap Junctions bestehen aus Claudin-Proteinen", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "epithelgewebe",
    title: "Epithelgewebe",
    phase1: {
      soil: { statement: "Epithelien bedecken äussere und innere Körperoberflächen.", answer: true, solution: "Epithelgewebe bildet einen engen Zellverband mit minimalen Interzellularräumen und besitzt keine eigenen Blutgefässe – die Ernährung erfolgt durch Diffusion aus dem darunterliegenden Bindegewebe. Es bedeckt sowohl die Aussenoberfläche (Haut) als auch sämtliche inneren Hohlräume und Organe. Epithelzellen werden durch mehrere Verbindungstypen zusammengehalten: Tight Junctions (Abdichtung des parazellulären Wegs), Adhärens-Junctions (mechanische Kopplung über Aktin-Filamente) und Desmosomen (Zugfestigkeit über Keratin-Filamente). Die Basalmembran unter dem Epithel enthält als Hauptbestandteile Kollagen Typ IV (Netzwerkbildner) und Laminin (Verankerungsprotein für Epithelzellen)." },
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
      { id: "hi_ep_h3", type: "true_false", statement: "Epithelgewebe ernährt sich durch Diffusion aus dem darunterliegenden Bindegewebe, da es keine eigenen Blutgefässe besitzt.", answer: true, explanation: "Epithelien sind avaskular – keine eigenen Blutgefässe. Säuerstoff und Nährstoffe diffundieren aus den Kapillaren des subepithelial gelegenen Bindegewebes durch die Basalmembran. Die maximale Epitheldicke wird dadurch durch die Diffusionsstrecke begrenzt (mehrschichtige Epithelien können trotzdem dick sein, da die Basalzellen nah an den Kapillaren liegen)." },
      { id: "hi_ep_h4", type: "mc", question: "Was sind die zwei Hauptbestandteile der Basalmembran unter Epithelgewebe?", options: [
        { text: "Kollagen Typ IV (Netzwerkbildner) und Laminin (Verankerungsprotein)", correct: true },
        { text: "Kollagen Typ I und Elastin", correct: false },
        { text: "Aktin und Myosin", correct: false },
        { text: "Keratin und Desmoplakin", correct: false }
      ], explanation: "Die Basalmembran besteht vor allem aus Kollagen Typ IV, das ein feines Netzwerk bildet, und Laminin, das die Epithelzellen verankert. Weitere Bestandteile sind Perlecan und Nidogen. Kollagen Typ I findet sich dagegen im Bindegewebe und nicht in der Basalmembran." },
      { id: "hi_ep_h5", type: "true_false", statement: "Flimmerepithel in den Atemwegen transportiert Schleim aktiv nach aussen.", answer: true, explanation: "Das mehrreihige Flimmerepithel der Atemwege trägt Zilien, die durch koordinierte Schlagbewegungen Schleim und eingeschlossene Partikel in Richtung Rachen befördern (mukoziliäre Clearance). Dies ist ein wichtiger Schutzmechanismus der Atemwege." },
      { id: "hi_ep_h6", type: "mc", question: "Welcher Epitheltyp resorbiert Nährstoffe und welche Strukturen ermöglichen dies?", options: [
        { text: "Einschichtiges Säulenepithel mit Mikrovilli im Darm", correct: true },
        { text: "Mehrschichtiges Plattenepithel mit Keratinschicht", correct: false },
        { text: "Mehrreihiges Flimmerepithel der Atemwege", correct: false },
        { text: "Übergangsepithel (Urothel) der Harnblase", correct: false }
      ], explanation: "Das einschichtige Säulenepithel des Dünndarms besitzt auf der apikalen Seite Mikrovilli (Bürstensaum), die die Resorptionsfläche erheblich vergrössern. Deckepithel kann je nach Typ hochspezialisiert sein: Nicht nur Schutz, sondern auch Resorption ist möglich." }
    ],
    phase4Questions: [
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
      ]},
      { id: "hi_ep_mc3", type: "mc", question: "Welche Aussagen zum Epithelgewebe sind korrekt?", options: [
        { text: "Epithelgewebe ist avaskular und wird durch Diffusion aus dem Bindegewebe ernährt", correct: true },
        { text: "Flimmerepithel transportiert durch Zilienarbeit Sekrete und Fremdkörper", correct: true },
        { text: "Tight Junctions ermöglichen freien parazellulären Durchtritt von Ionen", correct: false },
        { text: "Drüsenepithel ist der häufigste Epitheltyp in der Haut", correct: false }
      ], explanation: "Epithelgewebe: avaskular, Ernährung durch Diffusion. Flimmerepithel: Zilien transportieren Mukus (Atemwege). Tight Junctions: verhindern parazellulären Durchtritt. Haut: Plattenepithel (Deckepithel), nicht Drüsenepithel."}
    ]
  }),
  makeDetailedPlant({
    id: "oberflächenepithel",
    title: "Oberflächen-/Deckepithel",
    phase1: {
      soil: { statement: "Deckepithel kleidet Körperoberflächen und viele Hohlräume aus.", answer: true, solution: "Deckepithel (Oberflächenepithel) dient dem Schutz und der Abgrenzung: Es bedeckt die Körperoberfläche (Haut), kleidet innere Hohlorgane aus (Darm, Harnblase) und überzieht Blut- und Lymphgefässe als Endothel. Damit ist es das am weitesten verbreitete Epithelgewebe." },
      seed: { statement: "Deckepithel ist für Resorption und Sekretion grundsätzlich ungeeignet.", answer: false, solution: "Deckepithel ist je nach Typ hochspezialisiert: Einschichtiges Säulenepithel mit Mikrovilli resorbiert Nährstoffe im Darm, mehrschichtiges Plattenepithel schützt mechanisch (Haut), Flimmerepithel der Atemwege transportiert Schleim aktiv nach aussen." },
      water: { statement: "Die Unterteilung in einschichtig, mehrreihig und mehrschichtig ist ein Grundschema.", answer: true, solution: "Einschichtige Epithelien (alle Zellen berühren die Basalmembran) kommen z.B. als Endothel in Gefässen vor, mehrreihige (alle an Basalmembran, aber Kerne auf verschiedenen Höhen – Pseudostratifizierung) als Flimmerepithel in den Atemwegen, mehrschichtige (nur die unterste Lage an der Basalmembran) als Schutzepithel der Haut und Schleimhäute. Eine Sonderform ist das Übergangsepithel (Urothel) der Harnblase: Bei leerer Blase erscheint es mehrschichtig (ca. 5–6 Lagen), bei voller Blase dehnt es sich und wirkt fast einschichtig – diese Anpassungsfähigkeit ermöglichen die charakteristischen Deckzellen (Umbrella-Zellen)." }
    },
    harvestQuestions: [
      { id: "hi_od_h1", type: "mc", question: "Welcher Epitheltyp kleidet Blut- und Lymphgefässe aus?", options: [
        { text: "Einschichtiges Plattenepithel (Endothel)", correct: true },
        { text: "Mehrschichtiges verhorntes Plattenepithel", correct: false },
        { text: "Mehrreihiges Flimmerepithel", correct: false },
        { text: "Übergangsepithel (Urothel)", correct: false }
      ], explanation: "Die Gefässinnenwand (Endothel) besteht aus einschichtigem Plattenepithel – dünn genug für Diffusion, glatt genug für laminäre Strömung. Einschichtig bedeutet: eine Zelllage, alle Zellen an der Basalmembran." },
      { id: "hi_od_h2", type: "true_false", statement: "Das Übergangsepithel (Urothel) der Harnblase kann seine Schichtdicke je nach Füllungszustand verändern.", answer: true, explanation: "Urothel ist eine Sonderform: Bei leerer Harnblase erscheint es mehrschichtig (5-6 Lagen), bei voller Blase dehnt es sich und wirkt fast einschichtig. Die charakteristischen Deckzellen (Umbrella-Zellen) erlauben diese Verformbarkeit. Dies erklärt den Namen Übergangsepithel." },
      { id: "hi_od_h3", type: "true_false", statement: "Mehrreihiges Epithel ist dasselbe wie mehrschichtiges Epithel.", answer: false, explanation: "Beim mehrreihigen Epithel berühren ALLE Zellen die Basalmembran – nur die Kerne liegen auf unterschiedlichen Höhen, was mehrschichtig wirkt (Pseudostratifizierung). Beim mehrschichtigen Epithel berührt nur die unterste Lage (Stratum basale) die Basalmembran. Klassisches mehrreihiges Beispiel: Flimmerepithel der Atemwege." },
      { id: "hi_od_h4", type: "mc", question: "Welches Epithel kleidet Blut- und Lymphgefässe aus und wie heisst es spezifisch?", options: [
        { text: "Einschichtiges Plattenepithel = Endothel (bei Blut- und Lymphgefässen) / Mesothel (bei serösen Höhlen)", correct: true },
        { text: "Mehrschichtiges Plattenepithel", correct: false },
        { text: "Mehrreihiges Flimmerepithel", correct: false },
        { text: "Übergangsepithel (Urothel)", correct: false }
      ], explanation: "Einschichtiges Plattenepithel hat besondere Namen je nach Lokalisation: Endothel (Blut- und Lymphgefässinnenwand), Mesothel (Pleura, Peritoneum, Perikard). Diese dünne Schicht ermöglicht Diffusion und Filtration." },
      { id: "hi_od_h5", type: "true_false", statement: "Die Hautepidermis besteht aus mehrschichtigem verhorntem Plattenepithel.", answer: true, explanation: "Hautepidermis: mehrschichtiges verhorntes Plattenepithel (5 Schichten: Stratum basale → spinosum → granulosum → lucidum → corneum). Verhornung (Keratinisierung) macht die Oberfläche wasserdicht. Nicht verhornt: Mundhöhlen- und Vaginalschleimhaut (mechanischer Schutz ohne Wasserdichte)." },
      { id: "hi_od_h6", type: "mc", question: "Was sind Mikrovilli und wo kommen sie vor?", options: [
        { text: "Zytoplasmaausstülpungen des apikalen Zellapex zur Oberflächenvergrösserung; typisch an Darmepithel und Nierentubuli", correct: true },
        { text: "Zellfortsätze für Fortbewegung (Flimmerepithel)", correct: false },
        { text: "Verbindungsstrukturen zwischen Nachbarzellen (Tight Junctions)", correct: false },
        { text: "Mikroporen in der Basalmembran für Diffusion", correct: false }
      ], explanation: "Mikrovilli: apikale Ausstülpungen des Zytoplasmas ohne innere Beweglichkeit (anders als Zilien). Funktion: Oberflächenvergrösserung für Resorption. Klassisch: Bürstensaum (Saum aus Mikrovilli) im Dünndarmepithel und proximalen Nierentubuli." }
    ],
    phase4Questions: [
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
      ]},
      { id: "hi_od_mc3", type: "mc", question: "Welche Aussagen zum Deckepithel sind korrekt?", options: [
        { text: "Mehrschichtiges verhorntes Plattenepithel bildet die Epidermis der Haut", correct: true },
        { text: "Übergangsepithel (Urothel) verändert seine Schichtdicke je nach Füllungszustand der Harnblase", correct: true },
        { text: "Mehrreihiges Epithel hat mehrere Zelllagen, die alle die Basalmembran berühren", correct: false },
        { text: "Endothel der Blutgefässe ist mehrschichtiges Plattenepithel", correct: false }
      ], explanation: "Haut: mehrschichtiges verhorntes Plattenepithel. Urothel: dehnbar (5-6 Lagen → fast einschichtig). Mehrreihig: alle Zellen an Basalmembran, aber Kerne auf verschiedenen Höhen (nicht mehrere Zelllagen). Endothel: EINschichtiges Plattenepithel."}
    ]
  }),
  makeDetailedPlant({
    id: "drüsenepithel",
    title: "Drüsenepithel",
    phase1: {
      soil: { statement: "Drüsenepithel ist auf Sekretbildung spezialisiert.", answer: true, solution: "Drüsenepithel-Zellen sind darauf ausgerichtet, aktiv Sekrete herzustellen und abzugeben. Je nach Drüse sind das Verdauungsenzyme (Bauchspeicheldrüse), Hormone (Schilddrüse) oder Schleim (Schleimhautdrüsen). Die Sekretionsleistung unterscheidet Drüsenepithel klar von schutzendem Deckepithel." },
      seed: { statement: "Exokrine Drüsen werden nicht nach Sekret und Abgabeart klassifiziert.", answer: false, solution: "Exokrine Drüsen werden systematisch eingeteilt: nach Art des Sekrets (seröse oder müköse Zellen) und nach der Abgabemethode (merokrin: Vesikelexozytose ohne Zellverlust, z.B. Bauchspeicheldrüse und Schweissdrüsen; apokrin: Abschnürung des Zellapex, z.B. Milchdrüse für den Fettanteil der Muttermilch; holokrin: Zerfall der gesamten Zelle zum Sekret, z.B. Talgdrüse). Die Milchdrüse nutzt beide Wege kombiniert: den Fettanteil gibt sie apokrin ab, die Proteinanteile (Kasein, Lactalbumin) dagegen merokrin per Vesikelexozytose." },
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
      ], explanation: "Die Milchdrüse verwendet beide Sekretionswege: Fette werden apokrin abgegeben (Abschnürung lipidgefüllter Zellvorsprünge), Proteine (Kasein, Lactalbumin) merokrin via Vesikelexozytose. Holokrin (gesamte Zelle = Sekret) nutzt die Milchdrüse nicht." },
      { id: "hi_dr_h4", type: "true_false", statement: "Exokrine Drüsen geben ihr Sekret über einen Ausführungsgang an eine Körperoberfläche oder ein Hohlorgan ab.", answer: true, explanation: "Exokrine Drüsen: Ausführungsgang → Sekret nach aussen (Körperoberfläche, Lumen von Hohlorganen). Beispiele: Speicheldrüsen (Mundhöhle), Schweissdrüsen (Haut), Bauchspeicheldrüse (Dünndarm). Im Gegensatz dazu: Endokrine Drüsen haben keinen Ausführungsgang, geben Hormone direkt ins Blut." },
      { id: "hi_dr_h5", type: "mc", question: "Welche Drüsentypen nutzen welche Sekretionsmethode?", options: [
        { text: "Talgdrüse: holokrin; Schweissdrüse: merokrin; Milchdrüse: apokrin (Fett) + merokrin (Protein)", correct: true },
        { text: "Alle Drüsen sekretieren ausschliesslich merokrin", correct: false },
        { text: "Talgdrüse: merokrin; Schweissdrüse: holokrin", correct: false },
        { text: "Milchdrüse: ausschliesslich holokrin", correct: false }
      ], explanation: "Holokrin (Zelle wird Sekret): Talgdrüse. Merokrin (Vesikelexozytose): Schweissdrüse, Bauchspeicheldrüse. Apokrin (Apex abschnürt): Milchdrüse (Fett). Milchdrüse: kombiniert apokrin + merokrin für unterschiedliche Sekretbestandteile." },
      { id: "hi_dr_h6", type: "mc", question: "Was ist ein tubuloazinöses Drüsensystem?", options: [
        { text: "Eine Drüse, die sowohl röhrenförmige (tubuläre) als auch bläschenförmige (azinöse) Endstücke besitzt", correct: true },
        { text: "Eine Drüse, die ausschliesslich endokrin sekretiert", correct: false },
        { text: "Eine Drüse mit nur einem einzigen Ausführungsgang (einfache Drüse)", correct: false },
        { text: "Eine Drüse, die Tubuli und Ductus ohne Azini besitzt", correct: false }
      ], explanation: "Drüseneinteilung nach Form der Endstücke: Tubuläre Drüsen (röhrenförmig, z.B. Schweissdrüse), azinöse Drüsen (bläschenförmig/traubenförmig, z.B. Parotis), tubuloazinöse Drüsen (beides, z.B. Unterkieferspeicheldrüse). Die Form korreliert mit der Sekretmenge und -qualität." }
    ],
    phase4Questions: [
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
      ]},
      { id: "hi_dr_mc3", type: "mc", question: "Welche Aussagen zum Drüsenepithel sind korrekt?", options: [
        { text: "Exokrine Drüsen besitzen Ausführungsgänge; endokrine Drüsen geben Hormone direkt ins Blut ab", correct: true },
        { text: "Holokrine Sekretion: die gesamte Drüsenzelle wird zum Sekret (z.B. Talgdrüse)", correct: true },
        { text: "Merokrine Sekretion bedeutet, dass der Zellkern mit abgegeben wird", correct: false },
        { text: "Aporine Sekretion lässt die Zelle vollständig intakt ohne jede Abgabe", correct: false }
      ], explanation: "Exokrin: Ausführungsgang. Endokrin: Hormonabgabe ins Blut. Holokrin: gesamte Zelle = Sekret (Talgdrüse). Merokrin: Vesikelexozytose, Zelle intakt (kein Kernverlust). Apokrin: Apex abschnürt, Kern bleibt."}
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
      { id: "hi_sm_h3", type: "true_false", statement: "Myoepithelzellen haben epithelialen Ursprung, besitzen aber kontraktile Filamente wie glatte Muskelzellen.", answer: true, explanation: "Myoepithelzellen stammen entwicklungsgeschichtlich aus dem Ekto- oder Entoderm (Epithelgewebe), haben aber kontraktile Aktinfilamente erworben. Sie verbinden zwei Gewebeeigenschaften: Lage im Epithelverband + Kontraktionsfähigkeit. Das macht sie zu einer Hybridform – klassisches Prüfungsthema." },
      { id: "hi_sm_h4", type: "mc", question: "Was ist das spezifische Merkmal des Sinnesepithels?", options: [
        { text: "Transduktion von Reizen (mechanisch, chemisch, elektromagnetisch) in elektrische Signale (Aktionspotentiale)", correct: true },
        { text: "Bildung von Proteinen für die Matrixsynthese", correct: false },
        { text: "Aktiver Transport von Ionen durch die Basalmembran", correct: false },
        { text: "Phagozytose von Fremdkörpern im Sinnesbereich", correct: false }
      ], explanation: "Sinnesepithel: spezialisiertes Deckepithel, das mechanische (Haarzellen), elektromagnetische (Photorezeptoren) oder chemische (Riechzellen, Geschmacksrezeptoren) Reize in elektrische Signale (Aktionspotentiale) umwandelt. Das ist der grundlegende Unterschied zu anderen Epitheltypen." },
      { id: "hi_sm_h5", type: "true_false", statement: "Haarzellen des Innenohrs sind für sowohl Hören (Cochlea) als auch Gleichgewicht (Vestibularapparat) zuständig.", answer: true, explanation: "Im Innenohr gibt es zwei Typen von Haarzellen: Cochleäre Haarzellen (in der Cochlea, Organ of Corti) → Schallwahrnehmung. Vestibuläre Haarzellen (in Macula utriculi/sacculi und Cristae ampullares) → Gleichgewichtssinn und Lage im Raum." },
      { id: "hi_sm_h6", type: "mc", question: "Wie pressen Myoepithelzellen Drüsensekret aus?", options: [
        { text: "Durch Kontraktion ihrer Aktinfilamente (ähnlich glatter Muskulatur) pressen sie den Azinus zusammen", correct: true },
        { text: "Durch Sekretion von Enzymen, die das Sekret aktiv herauslösen", correct: false },
        { text: "Durch osmotischen Druck ohne aktive Kontraktion", correct: false },
        { text: "Sie haben keine direkte Funktion beim Sekretauspressen", correct: false }
      ], explanation: "Myoepithelzellen umschliessen die Drüsenazini wie ein Korb und kontrahieren (Aktinfilamente aktiviert durch Ca2+/oxytocin/Parasympathikus) → Drüsensekret wird in Ausführungsgang gepresst. Wichtig bei Milchdrüse (Milchejektionsreflex, Oxytocinwirkung)." }
    ],
    phase4Questions: [
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
      ]},
      { id: "hi_sm_mc3", type: "mc", question: "Welche Aussagen zu Sinnesepithel und Myoepithelzellen sind korrekt?", options: [
        { text: "Sinnesepithel wandelt Reize in elektrische Signale um (Transduktion)", correct: true },
        { text: "Myoepithelzellen haben epithelialen Ursprung, aber kontraktile Aktinfilamente", correct: true },
        { text: "Endothelzellen der Blutgefässe sind Sinnesepithel", correct: false },
        { text: "Myoepithelzellen ersetzen glatte Muskelzellen im Herzmuskel", correct: false }
      ], explanation: "Sinnesepithel: Transduktion (Haarzellen, Photorezeptoren, Riechzellen). Myoepithelzellen: epithelialer Ursprung + kontraktile Filamente → Drüsenauspressen. Endothel: Deckepithel, kein Sinnesepithel. Herzmuskel: eigene Herzmuskelzellen, keine Myoepithelzellen."}
    ]
  }),
  makeDetailedPlant({
    id: "bindegewebe",
    title: "Bindegewebe",
    phase1: {
      soil: { statement: "Bindegewebe ist das häufigste Gewebe und zeichnet sich durch viel Interzellularsubstanz aus.", answer: true, solution: "Im Gegensatz zu Epithel (enger Zellverband, wenig Matrix) besteht Bindegewebe aus relativ wenigen Zellen in viel Interzellularsubstanz (Matrix). Die Bindegewebsmatrix enthält drei Fasertypen: Kollagenfasern (hohe Zugfestigkeit, z.B. in Sehnen und Knochen), elastische Fasern (Rückstellkraft, z.B. in Lunge und Gefässen) und retikuläre Fasern (Kollagen Typ III, feines Netzwerk z.B. in Lymphknoten und Leber). Myofibrillen (Aktin/Myosin) sind kontraktile Strukturen des Muskelgewebes und kommen nicht in der Bindegewebsmatrix vor." },
      seed: { statement: "Bindegewebe besteht ausschliesslich aus Zellen und praktisch keiner Grundsubstanz.", answer: false, solution: "Bindegewebe zeichnet sich durch viel extrazelluläre Matrix (Grundsubstanz und Fasern) und vergleichsweise wenige Zellen aus – das Gegenteil von Epithelgewebe, wo Zellen dicht gepackt sind. Beim straffen parallelfaserigen Bindegewebe (Sehnen, Bänder) sind die Kollagenfasern in einer Hauptzugrichtung angeordnet, was grosse Zugfestigkeit in einer Richtung erzeugt. Straffes geflechtartiges Bindegewebe (Lederhaut, Periost) hat dagegen Fasern in mehrere Richtungen geflochten und widersteht Zug aus allen Richtungen." },
      water: { statement: "Es wird zwischen ortsständigen und freien Bindegewebszellen unterschieden.", answer: true, solution: "Ortsständige Bindegewebszellen wie Fibroblasten leben dauerhaft in der Matrix und synthetisieren Kollagen, Elastin und Proteoglykane. Freie Zellen wie Mastzellen, Makrophagen und Granulozyten wandern ein und übernehmen hauptsächlich Immunfunktionen, bevor sie weiterwandern oder absterben." }
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
      { id: "hi_bg_h3", type: "true_false", statement: "Straffes geflechtartiges Bindegewebe unterscheidet sich von straffem parallelfaserigem Bindegewebe durch die Faseranordnung.", answer: true, explanation: "Straffes parallelfaseriges Bindegewebe (Sehnen, Bänder) hat Kollagenfasern in einer Hauptzugrichtung angeordnet – ideal für uniaxiale Zugkräfte. Straffes geflechtartiges Bindegewebe (Lederhaut der Haut, Periost) hat Fasern in mehrere Richtungen geflochten – widersteht Zug aus allen Richtungen." },
      { id: "hi_bg_h4", type: "mc", question: "Was produzieren Mastzellen und welche klinische Bedeutung hat das?", options: [
        { text: "Histamin, Heparin und weitere Mediatoren → allergische Reaktionen und Entzündungen", correct: true },
        { text: "Kollagen und Elastin für die Matrixregeneration", correct: false },
        { text: "Antikörper gegen Fremdantigene", correct: false },
        { text: "Sauerstoffträger durch Hämoglobin", correct: false }
      ], explanation: "Mastzellen (ortsständig in Bindegewebe): Degranulation bei Allergen-Antikörperkontakt → Histamin (Vasodilatation, Juckreiz), Heparin (Antikoagulation), Proteasen. Klinisch: Typ-I-Allergie (Soforttyp), anaphylaktischer Schock." },
      { id: "hi_bg_h5", type: "true_false", statement: "Lockeres Bindegewebe hat wenig Fasern und viele Zellen, straffes Bindegewebe hat viele Fasern und wenig Zellen.", answer: true, explanation: "Lockeres Bindegewebe: viel Grundsubstanz, wenig Fasern, viele Zellen (Fibroblasten, Mastzellen, Makrophagen) → Füll- und Verschiebeschicht. Straffes Bindegewebe: viele Kollagenfasern, wenig Zellen → mechanische Belastung (Sehnen, Bänder, Faszien)." },
      { id: "hi_bg_h6", type: "mc", question: "Welche Funktion haben retikuläre Fasern (Kollagen Typ III)?", options: [
        { text: "Bildung feiner Stützgitter in lymphatischen Organen (Lymphknoten, Milz) und Leber", correct: true },
        { text: "Bereitstellung von Zugfestigkeit in Sehnen", correct: false },
        { text: "Rückstellkraft bei Verformung (Lunge, Arterienwand)", correct: false },
        { text: "Verbindung von Muskel und Knochen", correct: false }
      ], explanation: "Retikuläre Fasern (Kollagen Typ III, 'Reticulum'): dünne, verzweigte Fasern die Stützgitter in Lymphknoten, Milz, Leber und Knochenmark bilden. Mit Silber-Impregnierung sichtbar. Zugfestigkeit: Kollagen Typ I. Rückstellkraft: Elastin." }
    ],
    phase4Questions: [
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
      ]},
      { id: "hi_bg_mc3", type: "mc", question: "Welche Aussagen zum Bindegewebe sind korrekt?", options: [
        { text: "Fibroblasten synthetisieren Kollagen und andere extrazelluläre Matrixkomponenten", correct: true },
        { text: "Mastzellen sezernieren Histamin bei allergischen Reaktionen", correct: true },
        { text: "Straffes Bindegewebe hat viele Zellen und wenig Fasern", correct: false },
        { text: "Retikuläre Fasern bestehen aus Kollagen Typ I und bilden Sehnen", correct: false }
      ], explanation: "Fibroblasten: Matrixsynthese. Mastzellen: Histamin, Allergie. Straffes Bindegewebe: viele Fasern, wenig Zellen (umgekehrt als lockeres). Retikuläre Fasern: Kollagen Typ III, Stützgitter in Lymphorganen (nicht Sehnen, die sind Typ I)."}
    ]
  }),
  makeDetailedPlant({
    id: "knorpelgewebe",
    title: "Knorpelgewebe",
    phase1: {
      soil: { statement: "Knorpelgewebe wird in drei histologisch unterscheidbare Typen eingeteilt: hyaliner Knorpel (Gelenkflächen), elastischer Knorpel (Ohrmuschel) und Faserknorpel (Bandscheiben) – jeder mit charakteristischer Struktur und Funktion.", answer: true, solution: "Die drei Knorpeltypen unterscheiden sich in ihrer Zusammensetzung und ihren Eigenschaften: Hyaliner Knorpel (bläulich-weiss, glättste Gelenkflächen, Hauptbestandteil Kollagen Typ II in glykosaminoglykanreicher Grundsubstanz), elastischer Knorpel (gelblich, biegsam durch Elastinfasern z.B. Ohrmuschel, Epiglottis) und Faserknorpel (grösste Zugfestigkeit durch dicke Kollagen-Typ-I-Bündel, z.B. Bandscheiben, Menisken, Symphysis pubica)." },
      seed: { statement: "Knorpelgewebe wird histologisch nicht weiter unterteilt.", answer: false, solution: "Knorpelgewebe wird in drei klar unterscheidbare Typen eingeteilt, die sich histologisch in Fasergehalt, Matrixzusammensetzung und Farbgebung unterscheiden. Knorpelgewebe ist avaskular – es besitzt keine eigenen Blutgefässe. Die Chondrozyten werden durch Diffusion aus dem Perichondrium (bei Gelenkknorpel aus der Synovialflüssigkeit) ernährt. Diese avaskuläre Natur erklärt, warum Knorpeldefekte sehr schlecht heilen." },
      water: { statement: "Die Knorpeltypen unterscheiden sich funktionell und strukturell.", answer: true, solution: "Hyaliner Knorpel mit seiner glatten Oberfläche ist ideal für druckbelastete Gelenkflächen sowie für den Rippenknorpel und die Wachstumsplatte; elastischer Knorpel ist für Strukturen geeignet, die biegsam sein müssen (Ohrmuschel, Epiglottis); Faserknorpel widersteht hoher Zugbelastung (Bandscheiben, Menisken, Symphysis pubica). Form folgt Funktion." }
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
      { id: "hi_kg_h3", type: "true_false", statement: "Knorpelgewebe ist avaskular – die Ernährung der Chondrozyten erfolgt durch Diffusion.", answer: true, explanation: "Knorpelgewebe besitzt keine Blutgefässe (avaskular). Chondrozyten erhalten Nährstoffe und Sauerstoff durch Diffusion aus dem Perichondrium oder (bei Gelenkknorpel) aus der Synovialflüssigkeit. Diese avaskuläre Natur erklärt, warum Knorpeldefekte sehr schlecht heilen." },
      { id: "hi_kg_h4", type: "mc", question: "Was ist das Perichondrium und welche Funktion hat es?", options: [
        { text: "Bindegewebshülle um Knorpel (ausser Gelenkknorpel); enthält Progenitorzellen für Wachstum und Ernährung des Knorpels", correct: true },
        { text: "Eine innere Schicht des hyalinen Knorpels mit Chondrozyten", correct: false },
        { text: "Die Gelenkflüssigkeit um den Knorpel", correct: false },
        { text: "Das Endost des benachbarten Knochens", correct: false }
      ], explanation: "Perichondrium: äussere Bindegewebshülle um Knorpel (fehlt an Gelenkknorpel!). Besteht aus zwei Schichten: Fibrosa (aussen) und Chondrogenica (innen, enthält undifferenzierte Progenitorzellen → Knorpelwachstum). Ernährung: Gefässe im Perichondrium versorgen den avaskulären Knorpel durch Diffusion." },
      { id: "hi_kg_h5", type: "true_false", statement: "Elastischer Knorpel enthält neben Kollagen Typ II auch ein dichtes Netzwerk aus elastischen Fasern.", answer: true, explanation: "Elastischer Knorpel (z.B. Ohrmuschel, Epiglottis): Zusätzlich zu Kollagen Typ II enthält er ein dichtes Netzwerk aus Elastin-Fasern. Das gibt ihm Biegefähigkeit und Rückkehrvermögen nach Verformung. Histologisch: mit Orcein oder Resorcin-Fuchsin gefärbt sieht man das charakteristische Elastin-Netz." },
      { id: "hi_kg_h6", type: "mc", question: "Warum ist Gelenkknorpel besonders verletzungsanfällig?", options: [
        { text: "Er hat kein Perichondrium und keine Blutgefässe – Regeneration erfolgt nur sehr eingeschränkt durch Diffusion aus der Synovia", correct: true },
        { text: "Weil Gelenkknorpel aus Faserknorpel besteht und daher wenig elastisch ist", correct: false },
        { text: "Weil Chondrozyten im Gelenkknorpel täglich absterben und nicht ersetzt werden", correct: false },
        { text: "Weil das Perichondrium des Gelenkknorpels keine Progenitorzellen enthält", correct: false }
      ], explanation: "Gelenkknorpel (hyalin): kein Perichondrium, avaskular, ernährt durch Synovia-Diffusion. Regeneration sehr eingeschränkt: bei Defekten entsteht oft minderwertiger Faserknorpel statt hyalinem Knorpel. Klinisch: Arthrose = Knorpeldegeneration ohne echte Regeneration." }
    ],
    phase4Questions: [
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
      ]},
      { id: "hi_kg_mc3", type: "mc", question: "Welche Aussagen zu Knorpelgewebe sind korrekt?", options: [
        { text: "Knorpelgewebe ist avaskular und heilt deshalb schlecht", correct: true },
        { text: "Hyaliner Knorpel (Kollagen Typ II) findet sich an Gelenkflächen und im Rippenknorpel", correct: true },
        { text: "Faserknorpel enthält viel Elastin und ist deshalb biegefähig", correct: false },
        { text: "Das Perichondrium ist an Gelenkknorpelflächen vorhanden", correct: false }
      ], explanation: "Avaskular → schlechte Heilung. Hyaliner Knorpel: Gelenkflächen, Rippenknorpel, Wachstumsplatten. Elastin: elastischer Knorpel (Ohrmuschel, Epiglottis), nicht Faserknorpel. Gelenkknorpel: kein Perichondrium."}
    ]
  }),
  makeDetailedPlant({
    id: "knochengewebe",
    title: "Knochengewebe",
    phase1: {
      soil: { statement: "Knochengewebe wird histologisch als spezialisiertes Binde- und Stützgewebe eingeordnet.", answer: true, solution: "Knochengewebe ist ein spezialisiertes hartes Bindegewebe. Seine mineralisierte Matrix besteht aus zwei Hauptbestandteilen: Kollagen Typ I (organischer Anteil, liefert Zugfestigkeit) und Hydroxylapatit Ca10(PO4)6(OH)2 (anorganischer Anteil, verleiht Druckfestigkeit und Härte). Trotz seiner Härte ist Knochen lebendiges Gewebe mit aktiven Zellen: Osteoblasten (Aufbau), Osteozyten (Erhalt) und Osteoklasten (Abbau)." },
      seed: { statement: "Knochenzellen spielen für Aufbau und Erhalt des Knochengewebes keine Rolle.", answer: false, solution: "Knochenzellen sind der Kern des Knochenlebens: Osteoblasten produzieren neue Knochenmatrix (Kollagen Typ I + Mineralisation), Osteozyten erhalten als eingemauerte ehemalige Osteoblasten das Gewebe durch Nährstoffaustausch über feine Kanälchen (Canaliculi) mit Gap Junctions. Osteoklasten sind mehrkernige Riesenzellen, die auf der Knochenoberfläche eine versiegelte Resorptionszone (Howship-Lakune) bilden und dort Salzsäure (HCl, pH ca. 4) sowie lysosomale Proteasen (u.a. Cathepsin K) sezernieren, um Hydroxylapatit und Kollagen aufzulösen. Reifer Lamellenknochen besteht aus Osteonen (Havers-Systemen): konzentrische Lamellen aus mineralisierten Kollagenfasern umringen einen zentralen Havers-Kanal mit Blutgefässen und Nerven." },
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
      { id: "hi_kn_h3", type: "true_false", statement: "Lamellenknochen hat im Osteon konzentrisch um den Havers-Kanal angeordnete Lamellen aus mineralisierten Kollagenfasern.", answer: true, explanation: "Lamellenknochen (reifer Knochen) ist strukturell aus Osteonen (Havers-Systemen) aufgebaut: konzentrische Lamellen aus Kollagen Typ I mit Hydroxylapatit umringen einen zentralen Havers-Kanal (mit Blutgefässen und Nerven). Diese Struktur verleiht maximale Stabilität bei geringem Gewicht – eine geniale biomechanische Lösung." },
      { id: "hi_kn_h4", type: "mc", question: "Was ist ein Havers-System (Osteon)?", options: [
        { text: "Konzentrische Knochenlamellen um einen zentralen Havers-Kanal (mit Blutgefässen) – die Grundeinheit des Lamellenknochen", correct: true },
        { text: "Ein Kanalsystem im Spongiosatrabekel", correct: false },
        { text: "Ein Tunnelsystem durch die Kortikalis für Lymphgefässe", correct: false },
        { text: "Die Verbindung zwischen Periost und Endost", correct: false }
      ], explanation: "Osteon = Havers-System: 4–20 konzentrische Lamellen um den Havers-Kanal (enthält Blutgefäss + Nerv). Volkmann-Kanäle verbinden Havers-Kanäle untereinander. Osteozyten liegen in Lakunen in den Lamellen und kommunizieren über Canaliculi (Kanälchen) mit Nachbarosteozyten und Blutgefässen." },
      { id: "hi_kn_h5", type: "true_false", statement: "Hydroxylapatit [Ca10(PO4)6(OH)2] ist die anorganische Hauptkomponente der Knochenmatrix und verleiht dem Knochen seine Druckfestigkeit.", answer: true, explanation: "Knochenmatrix: 70% anorganisch (Hydroxylapatit: Kalziumphosphat-Kristalle für Druckfestigkeit), 30% organisch (Kollagen Typ I für Zugfestigkeit, Elastizität). Die Kombination erklärt die einzigartige Eigenschaft: fest aber nicht spröde wie reines Mineral, und nicht schlaff wie reines Kollagen." },
      { id: "hi_kn_h6", type: "mc", question: "Wie unterscheiden sich Geflechtknochen und Lamellenknochen histologisch?", options: [
        { text: "Geflechtknochen: ungeordnete Kollagenfasern (embryonal/reparativ); Lamellenknochen: konzentrisch geordnete Kollagenlamellen in Osteonen (reif)", correct: true },
        { text: "Geflechtknochen: mehr Hydroxylapatit als Lamellenknochen", correct: false },
        { text: "Lamellenknochen: keine Osteone, nur Trabekel", correct: false },
        { text: "Beide sind histologisch identisch", correct: false }
      ], explanation: "Geflechtknochen (Wovenknochen): erst gebildet bei Fraktur oder Entwicklung, ungeordnete Kollagenfasern, wird später ersetzt. Lamellenknochen: geordnete Struktur (Osteone in Kortikalis, Trabekel in Spongiosa), biomechanisch optimiert." }
    ],
    phase4Questions: [
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
      ]},
      { id: "hi_kn_mc3", type: "mc", question: "Welche Aussagen zur Knochenhistologie sind korrekt?", options: [
        { text: "Das Osteon (Havers-System) besteht aus konzentrischen Lamellen um einen Blutgefäss-führenden Havers-Kanal", correct: true },
        { text: "Osteoblasten bauen auf; Osteoklasten bauen ab; Osteozyten erhalten den Knochen", correct: true },
        { text: "Hydroxylapatit verleiht dem Knochen Flexibilität, Kollagen die Druckfestigkeit", correct: false },
        { text: "Geflechtknochen ist strukturell gereifter als Lamellenknochen", correct: false }
      ], explanation: "Osteon: konzentrische Lamellen um Havers-Kanal. Zellen: Osteoblasten aufbau, Osteoklasten abbau, Osteozyten Erhalt. Hydroxylapatit: Druckfestigkeit; Kollagen: Zugfestigkeit/Elastizität. Geflechtknochen: unreif, wird zu Lamellenknochen umgebaut."}
    ]
  }),
  makeDetailedPlant({
    id: "blut",
    title: "Blut als Gewebe",
    phase1: {
      soil: { statement: "Blut wird in der Histologie als spezialisiertes Bindegewebe klassifiziert.", answer: true, solution: "Blut gilt histologisch als spezialisiertes flüssiges Bindegewebe, da auch hier Zellen (Erythrozyten, Leukozyten, Thrombozyten) in einer flüssigen Grundsubstanz (Plasma) vorkommen. Leukozyten werden in Granulozyten (mit körnigem Zytoplasma) und agranuläre Leukozyten unterteilt: Zu den Granulozyten gehören Neutrophile (55–70%, Phagozytose von Bakterien), Eosinophile (2–4%, Parasitenabwehr und Allergie) und Basophile (0,5–1%, Histaminfreisetzung); zu den agranulären Leukozyten Lymphozyten (25–35%, adaptive Immunantwort) und Monozyten (3–8%, Vorläufer der Makrophagen)." },
      seed: { statement: "Blut hat keinen Bezug zum Binde- und Stützgewebe.", answer: false, solution: "Blut wird als flüssiges Bindegewebe eingeordnet, da seine Bestandteile (Zellen + Plasma) dem Prinzip Zellen in Matrix entsprechen. Der Hämatokrit bezeichnet den Volumenanteil der Erythrozyten am Gesamtblut; Normalwerte liegen bei Männern bei ca. 40–52 %, bei Frauen bei 37–47 %. Ein niedriger Hämatokrit weist auf Anämie hin, ein hoher auf Polyglobulie oder Dehydratation." },
      water: { statement: "Die gewebliche Betrachtung von Blut dient dem Verständnis von Zell- und Matrixanteilen.", answer: true, solution: "Wenn man Blut als Gewebe betrachtet, wird der Vergleich mit anderen Bindegeweben möglich: zelliger Anteil vs. flüssige Matrix (Plasma). Thrombozyten entstehen durch Abschnürung aus Megakaryozyten im Knochenmark und sind kernlos (keine DNA); sie initiieren die primäre Hämostase durch Adhäsion an Gefässläsionen und Aggregation. Ihre Lebensdauer beträgt ca. 8–12 Tage." }
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
      { id: "hi_bl_h3", type: "true_false", statement: "Thrombozyten entstehen durch Abschnürung von Megakaryozyten im Knochenmark und haben keine DNS.", answer: true, explanation: "Megakaryozyten (riesige polynukleäre Zellen im Knochenmark) schnüren Tausende von Thrombozyten ab. Diese sind kernlos (keine DNA) und ca. 2–4 µm gross. Sie initiieren die primäre Hämostase durch Adhäsion an Gefässläsionen und Aggregation. Lebensdauer: ca. 8–12 Tage." },
      { id: "hi_bl_h4", type: "mc", question: "Welche Funktion hat Hämoglobin in den Erythrozyten?", options: [
        { text: "O2-Transport durch reversible Bindung an Fe2+ im Hämanteil", correct: true },
        { text: "Phagozytose von Bakterien", correct: false },
        { text: "Produktion von Antikörpern", correct: false },
        { text: "CO2 kann von Hämoglobin nicht transportiert werden", correct: false }
      ], explanation: "Hämoglobin (Hb): 4 Untereinheiten, jede mit einem Häm-Cofaktor (Fe2+). O2 bindet reversibel an Fe2+. Reifes Hb: 4 O2 pro Molekül. Erythrozyten sind kernlos (bikonkav, grosse Oberfläche/Volumen-Ratio). CO2 wird auch an Hb gebunden (Carbaminoverbindungen) oder als HCO3- im Plasma transportiert." },
      { id: "hi_bl_h5", type: "true_false", statement: "Monozyten im Blut sind die Vorläufer der Makrophagen im Gewebe.", answer: true, explanation: "Monozyten verlassen den Blutstrom und differenzieren im Gewebe zu Makrophagen (z.B. Kupffer-Zellen in der Leber, Alveolarmakrophagen in der Lunge, Mikroglia im ZNS). Sie phagozytieren Zelltrümmer, Pathogene und aktivieren adaptive Immunantworten." },
      { id: "hi_bl_h6", type: "mc", question: "Was ist die primäre Hämostase?", options: [
        { text: "Thrombozytenaggregation und Gefässkonstriktion zur Bildung eines primären Plättchenpfropfs", correct: true },
        { text: "Aktivierung der plasmatischen Gerinnungskaskade (Faktoren I-XIII)", correct: false },
        { text: "Fibrinolyse zur Auflösung bestehender Thromben", correct: false },
        { text: "Leukozyteneinwanderung in das Wundgebiet", correct: false }
      ], explanation: "Hämostase: 1) Primär = Thrombozytenaggregation + Vasokonstriktion → weicher Plättchenpfropf. 2) Sekundär = plasmatische Gerinnung (Gerinnungsfaktoren) → Fibrin-Pfropf. Thrombozyten: Adhäsion (via GPIb an Von-Willebrand-Faktor) → Aktivierung → Aggregation." }
    ],
    phase4Questions: [
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
      ]},
      { id: "hi_bl_mc3", type: "mc", question: "Welche Aussagen zu Blut und Blutbestandteilen sind korrekt?", options: [
        { text: "Erythrozyten transportieren O2 über Hämoglobin (Fe2+)", correct: true },
        { text: "Neutrophile Granulozyten sind die häufigsten Leukozyten und phagozytieren Bakterien", correct: true },
        { text: "Thrombozyten sind kernhaltige Zellen mit normaler Zellteilung", correct: false },
        { text: "Der Hämatokrit misst den Leukozytenanteil am Blutvolumen", correct: false }
      ], explanation: "Erythrozyten: Hämoglobin-O2-Transport. Neutrophile: häufigste Leukozyten (55-70%), Phagozytose. Thrombozyten: kernlos, keine Teilung (Abschnürung von Megakaryozyten). Hämatokrit: Erythrozytenanteil (Männer 40-52%)."}
    ]
  }),
  makeDetailedPlant({
    id: "muskelgewebe",
    title: "Muskelgewebe",
    phase1: {
      soil: { statement: "Muskelgewebe wird histologisch in drei Typen eingeteilt: quergestreifte Skelettmuskulatur (periphere Kerne, deutliche Streifung), Herzmuskulatur (zentraler Kern, Glanzstreifen) und glatte Muskulatur (zentraler Spindelkern, keine Streifung).", answer: true, solution: "Die drei Muskeltypen werden histologisch klar unterschieden: Skelettmuskulatur mit randständigen Kernen und deutlicher Querstreifung, Herzmuskulatur mit zentralem Kern und Glanzstreifen (Disci intercalares) zwischen den Zellen, glatte Muskulatur ohne Streifung und mit zentralem spindelförmigem Kern. Die Querstreifung der Skelett- und Herzmuskulatur entsteht durch die regelmässige Sarkomeranordnung: Die dunklen A-Banden entsprechen den Myosin-Dickfilamenten, die hellen I-Banden den Aktin-Dünnfilamenten." },
      seed: { statement: "Muskelgewebe wird in der Histologie nicht nach Typen untergliedert.", answer: false, solution: "Die histologische Unterscheidung der Muskeltypen ist fundamental. Die Disci intercalares (Glanzstreifen) der Herzmuskulatur enthalten zwei funktionell verschiedene Verbindungen: Adhärens-Junctions für die mechanische Kopplung und Gap Junctions für die elektrische Kopplung der Kardiomyozyten – dadurch schlagen alle Herzmuskelzellen koordiniert. Glatte Muskelzellen kontrahieren langsam und ausdauernd mithilfe des sogenannten Latchzustands (langsame Myosin-Querbrückenzyklen mit sehr geringem ATP-Verbrauch), was sie für Dauertonus in Gefässen und Hohlorganen prädestiniert." },
      water: { statement: "Histologische Merkmale der Muskeltypen stehen in Zusammenhang mit ihren Funktionen.", answer: true, solution: "Quergestreifte Skelettmuskulatur zeigt histologisch Streifen durch regelmässige Sarkomeranordnung und ist willkürlich steuerbar; glatte Muskulatur hat keine Streifen und kontrahiert langsam und ausdauernd ohne schnelle Ermüdung – ideal für Hohlorgane wie Blase, Darm und Blutgefässe. Herzmuskulatur kombiniert Querstreifung (wie Skelettmuskel) mit unwillkürlicher Steuerung (wie glatte Muskulatur)." }
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
      { id: "hi_mg_h3", type: "true_false", statement: "Glatte Muskelzellen können sich langsam und ausdauernd ohne Ermüdung kontrahieren, was sie für Hohlorgane besonders geeignet macht.", answer: true, explanation: "Glatte Muskulatur nutzt einen anderen Kontraktionsmechanismus als Skelettmuskel: langsame Myosin-Querbrückenzyklen (Latchzustand) erlauben Dauerkontraktionen mit sehr wenig ATP-Verbrauch. Diese Eigenschaft ist ideal für Dauertonus in Gefässen, Blasenapex, Darmmotilität." },
      { id: "hi_mg_h4", type: "true_false", statement: "Skelettmuskelfasern sind mehrkernig, weil sie aus der Fusion vieler Myoblasten entstehen.", answer: true, explanation: "Embryonale Myoblasten fusionieren zu langen Skelettmuskelfasern mit hunderten von Kernen. Die Kerne liegen randständig unter dem Sarkolemm. Herzmuskelzellen sind dagegen Einzelzellen mit einem zentralen Kern und verbinden sich über Disci intercalares." },
      { id: "hi_mg_h5", type: "mc", question: "Wie unterscheidet sich glatte Muskulatur histologisch von Skelettmuskulatur?", options: [
        { text: "Glatt: kein Sarkomer, zentraler ovaler Kern, keine Querstreifung, Aktin+Myosin ungeordnet angeordnet", correct: true },
        { text: "Glatt: quergestreift, randständige Kerne, willkürlich", correct: false },
        { text: "Glatt: nur Aktinfilamente ohne Myosin", correct: false },
        { text: "Glatt und Skelett sind histologisch nicht unterscheidbar", correct: false }
      ], explanation: "Glatte Muskulatur: spindelförmige Einzelzellen, ein zentraler Kern, keine Querstreifung (Filamente nicht in Sarkomeren angeordnet). Skelettmuskel: lange mehrkernige Fasern, randständige Kerne, deutliche Querstreifung (A/I-Banden)." },
      { id: "hi_mg_h6", type: "mc", question: "Was sind Disci intercalares (Glanzstreifen)?", options: [
        { text: "Zell-Zell-Verbindungen zwischen Herzmuskelzellen: Gap Junctions (elektrische Kopplung) + Adhärens-Junctions (mechanische Kopplung)", correct: true },
        { text: "Die A-Banden im Sarkomer der Herzmuskulatur", correct: false },
        { text: "Myelinisierte Abschnitte der Herznerven", correct: false },
        { text: "Verbindungen zwischen Herzmuskel und Perikard", correct: false }
      ], explanation: "Disci intercalares = Glanzstreifen: bei Herzmuskulatur transversal verlaufende Zell-Zell-Grenzen. Bestehen aus: Gap Junctions (elektrische Kopplung → funktionelles Synzytium) und Adhärens-Junctions/Desmosomen (mechanische Kopplung). Im Lichtmikroskop als dunkle Querstreifen sichtbar." }
    ],
    phase4Questions: [
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
      ]},
      { id: "hi_mg_mc3", type: "mc", question: "Welche Aussagen zur Muskelhistologie sind korrekt?", options: [
        { text: "Herzmuskelzellen haben quergestreifte Sarkomere und Disci intercalares", correct: true },
        { text: "Glatte Muskelzellen haben keinen Sarkomeraufbau und sind nicht quergestreift", correct: true },
        { text: "Skelettmuskelfasern besitzen einen zentralen Kern und sind unwillkürlich", correct: false },
        { text: "Glatte Muskulatur ist an den randständigen Kernen erkennbar", correct: false }
      ], explanation: "Herzmuskel: Querstreifung + Disci intercalares. Glatt: kein Sarkomer, keine Querstreifung. Skelettmuskel: randständige Kerne (nicht zentral), willkürlich gesteuert. Glatte Muskulatur: zentraler ovaler Kern (nicht randständig)."}
    ]
  }),
  makeDetailedPlant({
    id: "nervengewebe",
    title: "Nervengewebe",
    phase1: {
      soil: { statement: "Nervengewebe umfasst Nervenzellen (Neuronen), Nervenfasern und Gliazellen.", answer: true, solution: "Nervengewebe besteht aus zwei Hauptzelltypen: Nervenzellen (Neuronen) mit ihren Fortsätzen (Axone, Dendriten) für Erregungsleitung und Gliazellen für Stütze, Ernährung und Isolierung. Im zentralen Nervensystem (ZNS) gibt es drei Gliazelltypen: Astrozyten (Stütze, K+-Pufferung, Teil der Blut-Hirn-Schranke), Oligodendrozyten (Myelinisierung im ZNS – ein Oligodendrozyt kann bis zu 50 Axone myelinisieren) und Mikroglia (immunaktive Makrophagen des ZNS). Im peripheren Nervensystem (PNS) übernehmen Schwann-Zellen die Myelinisierung – jeweils eine Schwann-Zelle pro Axonsegment." },
      seed: { statement: "Erregungsbildung und Erregungsleitung sind für Nervengewebe kein Thema.", answer: false, solution: "Erregungsbildung (Generierung von Aktionspotentialen) und Erregungsleitung (Weitergabe entlang Axonen) sind die Kernfunktionen des Nervengewebes. Bei myelinisierten Axonen geschieht die Erregungsleitung saltatorisch: Aktionspotentiale entstehen nur an den nicht-myelinisierten Ranvier-Schnürringen (Lücken in der Myelinscheide) und 'springen' so von Schnürring zu Schnürring (bis 120 m/s). Dies beschleunigt die Leitung erheblich und spart Energie gegenüber der kontinuierlichen Ausbreitung bei nicht-myelinisierten Axonen." },
      water: { statement: "Der Aufbau der Nervenzelle ist Grundlage für das Verständnis ihrer Funktion.", answer: true, solution: "Die Nervenzelle besteht aus Soma (Zellkörper mit Kern), Dendriten (Signalempfänger) und Axon (Signalleiter). Das Ruhemembranpotential einer typischen Nervenzelle beträgt ca. –70 mV (innen negativ). Es entsteht durch die ungleiche Ionenverteilung (hohe K+-Konzentration innen, hohe Na+-Konzentration aussen), den K+-Ausstrom durch Kaliumleckkanäle und die Na+/K+-ATPase, die den Ionengradienten aufrecht erhält (3 Na+ raus, 2 K+ rein pro ATP-Molekül)." }
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
      { id: "hi_ng_h3", type: "true_false", statement: "Das Ruhemembranpotential einer typischen Nervenzelle beträgt ca. -70 mV (innen negativ).", answer: true, explanation: "Das Ruhemembranpotential (-70 mV) entsteht durch: ungleiche Ionenverteilung (hohe K+ innen, hohe Na+ aussen), Kaliumleckkanäle (K+ strömt aus), und die Na+/K+-ATPase (hält den Gradienten aufrecht). Innen ist es negativ, weil K+-Ausstrom mehr negative Ladungen zurücklässt." },
      { id: "hi_ng_h4", type: "mc", question: "Was ist die Funktion der Astrozyten im ZNS?", options: [
        { text: "Stützfunktion, Blut-Hirn-Schranke und K+-Pufferung im extrazellulären Raum", correct: true },
        { text: "Myelinisierung der ZNS-Axone", correct: false },
        { text: "Phagozytose von Zelltrümmern (Immunfunktion)", correct: false },
        { text: "Ausschüttung von Neurotransmittern an Synapsen", correct: false }
      ], explanation: "Astrozyten: Stützfunktion (structurelle Stabilität), Aufrechterhaltung der Blut-Hirn-Schranke (Endfüsschen um Kapillaren), K+-Pufferung (verhindern K+-Akkumulation nach Aktionspotentialen). Oligodendrozyten: Myelinisierung. Mikroglia: Phagozytose." },
      { id: "hi_ng_h5", type: "true_false", statement: "Ein Oligodendrozyt kann bis zu 50 Axone im ZNS myelinisieren, während eine Schwann-Zelle nur ein Axonsegment im PNS myelinisiert.", answer: true, explanation: "Oligodendrozyt (ZNS): mehrere Axone myelinisierbar (bis 50). Schwann-Zelle (PNS): nur ein Segment eines Axons. Diese Unterschiede erklären die Reorganisierbarkeit nach Demyelinisierung im ZNS vs. PNS." },
      { id: "hi_ng_h6", type: "mc", question: "Was passiert beim Aktionspotential unmittelbar nach der Depolarisation?", options: [
        { text: "Repolarisation durch K+-Ausstrom (spannungsgesteuerte K+-Kanäle öffnen, Na+-Kanäle inaktivieren)", correct: true },
        { text: "Sofortige Dauerdepolarisation des gesamten Axons", correct: false },
        { text: "Ca2+-Einstrom für die Rückführung zum Ruhepotential", correct: false },
        { text: "Die Na+/K+-ATPase repolarisiert die Membran innerhalb von Millisekunden", correct: false }
      ], explanation: "Aktionspotential: Depolarisation durch Na+-Einstrom → Peak bei ~+35 mV → Repolarisation durch K+-Ausstrom (verzögert) + Na+-Kanal-Inaktivierung → Hyperpolarisation → Ruhepotential. Na+/K+-ATPase stellt Ionengradienten langsam wieder her (Energie für viele APs)." }
    ],
    phase4Questions: [
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
      ]},
      { id: "hi_ng_mc3", type: "mc", question: "Welche Aussagen zum Nervengewebe sind korrekt?", options: [
        { text: "Astrozyten bilden die Blut-Hirn-Schranke durch Endfüsschen um Kapillaren", correct: true },
        { text: "Saltatorische Leitung springt von Ranvier-Schnürring zu Ranvier-Schnürring", correct: true },
        { text: "Oligodendrozyten myelinisieren Axone im peripheren Nervensystem", correct: false },
        { text: "Das Ruhemembranpotential beträgt +70 mV (innen positiv)", correct: false }
      ], explanation: "Astrozyten: Blut-Hirn-Schranke. Saltatorische Leitung: Ranvier-Schnürringe. Oligodendrozyten: ZNS (nicht PNS – dort Schwann-Zellen). Ruhemembranpotential: -70 mV (innen negativ)."}
    ]
  })
];

const KNOCHENLEHRE_1033_PLANTS = [
  makeDetailedPlant({
    id: "knochenstoffwechsel",
    title: "Knochenstoffwechsel",
    phase1: {
      soil: { statement: "Knochen wird als lebendiges Gewebe mit ständigen Auf- und Abbauprozessen beschrieben.", answer: true, solution: "Knochen ist kein totes Material, sondern aktives Gewebe mit Blutversorgung, Nerven und lebenden Zellen. Osteoblasten, Osteozyten und Osteoklasten arbeiten ständig zusammen, um Knochen aufzubauen, zu erhalten und abzubauen." },
      seed: { statement: "Knochenstoffwechsel spielt nur in der Kindheit eine Rolle.", answer: false, solution: "Knochenstoffwechsel ist ein lebenslanger Prozess: Pro Jahr werden ca. 10 % des gesamten Knochengewebes durch koordinierte Osteoklastenresorption und Osteoblastenneubildung erneuert, sodass der gesamte Knochen etwa alle 10 Jahre vollständig ausgetauscht ist. Das Wolff'sche Gesetz beschreibt, wie Knochen seine Trabekelstruktur ständig an einwirkende Belastungen anpasst – Sportler bauen Knochen auf, Schwerelosigkeit führt zu Abbau. Hormonal steuert Parathormon (PTH) bei Kalziummangel die Osteoklastenaktivität und erhöht so den Blutkalziumspiegel, während Calcitonin die Osteoklasten hemmt und Östrogen vor dem Knochenabbau schützt." },
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
      { id: "ko_st_h3", type: "true_false", statement: "Der menschliche Knochen wird im Erwachsenenalter vollständig innerhalb von ca. 10 Jahren durch Remodelling erneuert.", answer: true, explanation: "Knochenremodelling ist ein lebenslanger Prozess: Pro Jahr wird ca. 10% des gesamten Knochengewebes durch koordinierte Osteoklastenresorption und Osteoblastenneubildung (Remodelling-Einheiten) erneuert. Damit wird der gesamte Knochen etwa alle 10 Jahre vollständig ausgetauscht – vergleichbar einer ständigen Materialerneuerung." },
      { id: "ko_st_h4", type: "true_false", statement: "Östrogen schützt vor Knochenabbau, was die Osteoporose nach der Menopause erklärt.", answer: true, explanation: "Östrogen hemmt die Osteoklastenaktivität und fördert die Osteoblastenaktivität. Nach der Menopause sinkt der Östrogenspiegel → Osteoklastenaktivität überwiegt → Knochenmasseverlust → postmenopausale Osteoporose. Häufigste Ursache der Osteoporose bei Frauen." },
      { id: "ko_st_h5", type: "mc", question: "Welche Zelle ist der 'schlafende Wächter' im Knochen und misst mechanische Belastung?", options: [
        { text: "Osteozyten (eingemauerte, ehemals aktive Osteoblasten mit Ausläufern im Kanälchensystem)", correct: true },
        { text: "Osteoklasten als Abbausensoren", correct: false },
        { text: "Periost-Fibroblasten", correct: false },
        { text: "Endostale Stammzellen", correct: false }
      ], explanation: "Osteozyten sind in Knochenlakunen eingemauerte, ehemals aktive Osteoblasten. Ihre Ausläufer verbinden sich über Kanälchen und registrieren mechanische Verformung. Sie koordinieren dann Osteoblasten- und Osteoklastenaktivität als Mechanosensoren (Wolff'sches Gesetz auf Zellebene)." },
      { id: "ko_st_h6", type: "mc", question: "Was ist Osteoporose und wie entsteht sie?", options: [
        { text: "Verminderung der Knochendichte durch Überwiegen der Osteoklastenaktivität; führt zu Frakturrisiko", correct: true },
        { text: "Übermässige Knochenbildung durch hyperaktive Osteoblasten", correct: false },
        { text: "Entzündliche Erkrankung des Knochens durch Bakterien", correct: false },
        { text: "Knochenerweichung durch Vitamin D-Überangebot", correct: false }
      ], explanation: "Osteoporose: Knochendichte sinkt unter kritische Grenze → Frakturrisiko steigt stark. Ursachen: Östrogenmangel (postmenopausal), Vitamin D-Mangel, Immobilität, Cortisol-Überschuss. Prophylaxe: Kalzium + Vitamin D + körperliche Aktivität." }
    ],
    phase4Questions: [
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
      ]},
      { id: "ko_st_mc3", type: "mc", question: "Welche Aussagen zum Knochenstoffwechsel sind korrekt?", options: [
        { text: "Osteoblasten bauen Knochen auf, Osteoklasten bauen ab – beide sind lebenslang aktiv", correct: true },
        { text: "Östrogenmangel nach der Menopause erhöht das Osteoporoserisiko", correct: true },
        { text: "Knochenstoffwechsel ist nach dem 25. Lebensjahr abgeschlossen", correct: false },
        { text: "PTH fördert Knochenaufbau durch direkte Osteoblastenaktivierung", correct: false }
      ], explanation: "Auf- und Abbau: lebenslang. Östrogenmangel: Osteoporose. Remodelling: lebenslang, nicht abgeschlossen. PTH: stimuliert Osteoklasten (indirekt über RANKL) → Knochenabbau → Kalziumfreisetzung."}
    ]
  }),
  makeDetailedPlant({
    id: "knochenbildung_abbau_umbau",
    title: "Knochenbildung, -abbau und -umbau",
    phase1: {
      soil: { statement: "Osteoblasten sind für Knochenbildung, Osteoklasten für Knochenabbau zuständig.", answer: true, solution: "Osteoblasten sind die Aufbauexperten: Sie produzieren Kollagen und setzen Kalziumphosphat in der Knochenmatrix ab. Osteoklasten sind Abbauspezialisten: Sie lösen Knochensubstanz durch Salzsäuresekretion auf und geben Kalzium und Phosphat ins Blut frei." },
      seed: { statement: "Knochenabbau ist nur pathologisch und für normale Entwicklung bedeutungslos.", answer: false, solution: "Knochenabbau ist ein normaler physiologischer Prozess, der für Wachstum, Umbau und Kalziumregulation unverzichtbar ist. Man unterscheidet zwei Wege der Knochenbildung: Bei der desmalen Ossifikation entsteht Knochen direkt aus Mesenchymzellen ohne Knorpelvorläufer (z.B. Schädelknochen, Klavikula), bei der enchondralen Ossifikation wird ein Knorpelmodell schrittweise durch Knochen ersetzt (z.B. lange Röhrenknochen). Das Dickenwachstum erfolgt periosteal, indem Osteoblasten unter dem Periost neue Lamellen auf die Knochenoberfläche legen. Bei der Frakturheilung entsteht zunächst Geflechtknochen (ungeordnete Kollagenfasern), der anschliessend zu stabilem Lamellenknochen umgebaut wird." },
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
      { id: "ko_bau_h3", type: "true_false", statement: "Bei der Frakturheilung wird immer zuerst Geflechtknochen gebildet, der später zu Lamellenknochen umgebaut wird.", answer: true, explanation: "Frakturheilung verläuft in Phasen: Hämatom → Granulationsgewebe → Kallus (periostaler Kallus aus Faserknorpel, später Geflechtknochen) → Umbau zu Lamellenknochen. Geflechtknochen ist schnell aber schwächer (ungeordnete Kollagenfasern); Lamellenknochen ist stark und biomechanisch optimiert (geordnete konzentrische Lamellen)." },
      { id: "ko_bau_h4", type: "true_false", statement: "Das Wolff'sche Gesetz besagt, dass Knochen seine Struktur an die einwirkenden Kräfte anpasst.", answer: true, explanation: "Wolff'sches Gesetz (1892): Knochen baut sich entsprechend den einwirkenden Kräften um. Belastung → Verdichtung (Osteoblastenaktivität). Entlastung/Immobilität → Abbau (Osteoklastenaktivität überwiegt). Klinisch: Osteoporose bei Bettlägerigkeit, Knochenhypertrophie bei Sportlern." },
      { id: "ko_bau_h5", type: "mc", question: "Wie lösen Osteoklasten Knochensubstanz auf?", options: [
        { text: "Durch Salzsäuresekretion (pH-Absenkung) und proteolytische Enzyme (Cathepsin K)", correct: true },
        { text: "Durch mechanische Zertrümmerung der Knochenmatrix", correct: false },
        { text: "Durch Absorption von Kalzium ohne chemische Prozesse", correct: false },
        { text: "Durch ATP-getriebene Phagozytose ganzer Knochenbälkchen", correct: false }
      ], explanation: "Osteoklasten: vielkernige Riesenzellen aus mononukleären Vorläufern. Sie bilden eine 'Versiegelungszone' und sezernieren Salzsäure (pH ~4.5) sowie Proteasen (Cathepsin K) → Mineralien und Kollagen werden aufgelöst. RANKL-Signalweg stimuliert Osteoklastenaktivität (Angriffspunkt moderner Osteoporosemedikamente)." },
      { id: "ko_bau_h6", type: "mc", question: "Welche Hormone regulieren den Kalziumhaushalt und damit auch den Knochenumbau?", options: [
        { text: "Parathormon (PTH, stimuliert Knochenabbau und Kalziumfreisetzung), Calcitonin (hemmt Abbau), Vitamin D (fördert Kalziumresorption)", correct: true },
        { text: "Nur Insulin und Glucagon regulieren den Kalziumstoffwechsel", correct: false },
        { text: "Cortisol stimuliert Knochenaufbau", correct: false },
        { text: "Nur Parathormon ist relevant, andere Hormone haben keinen Einfluss", correct: false }
      ], explanation: "Knochenumbau-Hormone: PTH (Hypokalzämie → Osteoklasten aktivieren → Kalzium aus Knochen), Calcitonin (aus C-Zellen Schilddrüse → Osteoklasten hemmen → Kalziumsenkung), Vitamin D (fördert Kalziumresorption im Darm). Östrogen schützt vor Knochenabbau → Osteoporose nach Menopause." }
    ],
    phase4Questions: [
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
      ]},
      { id: "ko_bau_mc3", type: "mc", question: "Welche Aussagen zu Knochenaufbau und -umbau sind korrekt?", options: [
        { text: "Osteoklasten bauen Knochen durch Salzsäuresekretion ab", correct: true },
        { text: "Das Wolff'sche Gesetz: Knochen passt sich an mechanische Belastung an", correct: true },
        { text: "Osteoblasten sind für den Knochenabbau verantwortlich", correct: false },
        { text: "Desmale Ossifikation erfolgt über eine Knorpelvorläuferstufe", correct: false }
      ], explanation: "Osteoklasten: Abbau durch Salzsäure. Wolff: Belastungsanpassung. Osteoblasten bauen auf (nicht ab). Desmale Ossifikation: direkt aus Mesenchym ohne Knorpel (enchondral hat die Knorpelvorläuferstufe)."}
    ]
  }),
  makeDetailedPlant({
    id: "knochenwachstum",
    title: "Knochenwachstum",
    phase1: {
      soil: { statement: "Das Längenwachstum langer Knochen ist an spezielle Wachstumszonen gebunden.", answer: true, solution: "Das Längenwachstum langer Röhrenknochen findet ausschliesslich in der Epiphysenfuge (Wachstumsplatte) statt, einem Knorpelstreifen zwischen Epiphyse und Diaphyse. Chondrozyten teilen sich hier und werden nach und nach durch Knochen ersetzt, bis die Fuge mit Ende der Pubertät schliesst." },
      seed: { statement: "Mechanische Beanspruchung ist für Knochenwachstum ohne Bedeutung.", answer: false, solution: "Mechanische Belastung stimuliert durch Druckkräfte die Osteoblastenaktivität und fördert den Knochenaufbau; Schwerelosigkeit oder Bettruhe führt zu Knochenabbau. Das Längenwachstum wird hormonell von mehreren Systemen gesteuert: Wachstumshormon (STH/GH) aus der Hypophyse stimuliert die Leber zur Produktion von IGF-1, das wiederum die Chondrozytenproliferation in der Epiphysenfuge antreibt. Schilddrüsenhormone (T3, T4) sind ebenfalls unerlässlich – ihr Mangel führt zu schwerem Kleinwuchs (Kretinismus). Sexualhormone (Östrogen und Testosteron) fördern in der Pubertät zunächst das Wachstum, bewirken dann aber den endgültigen Schluss der Epiphysenfugen. Die Epiphysenfuge gliedert sich histologisch in vier Zonen: Reservezone (ruhende Chondrozyten), Proliferationszone (Zellteilung), Hypertrophiezone (Zellgrössenzunahme) und Verkalkungszone (Mineralisation und Knochenmatrix-Einlagerung)." },
      water: { statement: "Wachstum und Heilung beginnen häufig mit Geflechtknochen als früher Strukturform.", answer: true, solution: "Geflechtknochen entsteht bei schnellem Knochenaufbau (Wachstum, Frakturheilung) und hat ungeordnete Kollagenfasern. Er wird später durch belastungsfesteren lamellären Knochen mit parallel ausgerichteten Kollagenfasern ersetzt. Im Röntgenbild ist die offene Epiphysenfuge als helle (radioluzente) Linie zwischen Epi- und Diaphyse sichtbar; wenn die Fuge schliesst und verknöchert, verschwindet diese Linie vollständig." }
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
      { id: "ko_w_h3", type: "true_false", statement: "Knochenwachstum und Knochenumbau sind funktionell gekoppelt.", answer: true, explanation: "Während das Längenwachstum in den Epiphysenfugen stattfindet, muss gleichzeitig das Knochendurchmesserwachstum (periostales Dickenwachstum) mit koordiniertem endostalem Abbau kombiniert werden, um die Proportionen und Markhöhlengrösse beizubehalten. Wachstum ohne Umbau würde zu massiven, schweren Knochen ohne Markhöhlel führen." },
      { id: "ko_w_h4", type: "true_false", statement: "Sexualhormone fördern zunächst das Wachstum und bewirken dann den Schluss der Epiphysenfugen.", answer: true, explanation: "Östrogen und Testosteron stimulieren das Wachstum zu Beginn der Pubertät, beschleunigen dann aber die Ossifikation der Epiphysenfugen. Das erklärt den pubertären Wachstumsschub und das Ende des Längenwachstums. Überschuss an Sexualhormonen vor Pubertät → frühzeitiger Fugenschluss → Kleinwuchs." },
      { id: "ko_w_h5", type: "mc", question: "Was ist der Unterschied zwischen Geflechtknochen und Lamellenknochen?", options: [
        { text: "Geflechtknochen: ungeordnete Kollagenfasern (schnell, weniger stark); Lamellenknochen: konzentrische Kollagenlamellen (langsamer, biomechanisch optimiert)", correct: true },
        { text: "Geflechtknochen enthält Hydroxylapatit, Lamellenknochen kein Kalzium", correct: false },
        { text: "Geflechtknochen ist reifer als Lamellenknochen", correct: false },
        { text: "Beide sind identisch, nur der Name ist verschieden", correct: false }
      ], explanation: "Geflechtknochen: primitive Form bei Frakturheilung und Entwicklung, ungeordnete Kollagenfasern. Lamellenknochen: reife Form, konzentrisch geordnete Kollagenlamellen in Osteonen, biomechanisch optimiert für Belastung. Umbau von Geflecht zu Lamelle dauert Monate bis Jahre." },
      { id: "ko_w_h6", type: "mc", question: "Was passiert, wenn Wachstumshormon nach Schluss der Epiphysenfugen übermässig produziert wird?", options: [
        { text: "Akromegalie: Vergrösserung von Akren (Hände, Füsse, Kinn, Nase) ohne Grössenänderung", correct: true },
        { text: "Gigantismus: generelles Längenwachstum des Körpers", correct: false },
        { text: "Kleinwuchs durch Osteoporose", correct: false },
        { text: "Keine Auswirkung, da Epiphysenfugen geschlossen sind", correct: false }
      ], explanation: "Vor Fugenschluss: Überschuss → Gigantismus. Nach Fugenschluss: Überschuss → Akromegalie (Wachstum der Akren, Gesichtsknochen, Organe). Wachstumsmangel → hypophysärer Nanismus. STH-Überschuss in der Kindheit → Gigantismus (Robert Wadlow: 2,72 m)." }
    ],
    phase4Questions: [
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
      ]},
      { id: "ko_w_mc3", type: "mc", question: "Welche Aussagen zum Knochenwachstum sind korrekt?", options: [
        { text: "Schilddrüsenhormone (T3, T4) sind für normales Längenwachstum unerlässlich", correct: true },
        { text: "Sexualhormone fördern zunächst Wachstum, dann bewirken sie Fugenschluss", correct: true },
        { text: "Das Dickenwachstum erfolgt in der Epiphysenfuge", correct: false },
        { text: "Geflechtknochen ist belastungsfester als Lamellenknochen", correct: false }
      ], explanation: "T3/T4: fehlen → Kretinismus (Kleinwuchs). Sexualhormone: Wachstum dann Fugenschluss. Dickenwachstum: periosteal (Osteoblasten unter dem Periost), nicht in der Epiphysenfuge. Lamellenknochen: biomechanisch überlegen gegenüber Geflechtknochen."}
    ]
  }),
  makeDetailedPlant({
    id: "lagebezeichnungen",
    title: "Lagebezeichnungen und Körperebenen",
    phase1: {
      soil: { statement: "Körperebenen, Achsen und Richtungsbezeichnungen bilden ein anatomisches Orientierungssystem.", answer: true, solution: "Anatomische Lagebezeichnungen (kranial/kaudal, anterior/posterior, medial/lateral) und Körperebenen (Sagittal-, Frontal-, Transversalebene) bilden ein standardisiertes Koordinatensystem. Ohne diese Fachsprache sind präzise anatomische und klinische Beschreibungen nicht möglich." },
      seed: { statement: "Lagebezeichnungen sind für Bewegungsbeschreibungen im Bewegungsapparat irrelevant.", answer: false, solution: "Ohne standardisierte Lagebezeichnungen entstehen sofort Missverständnisse: 'oben', 'unten', 'vorne', 'hinten' sind je nach Körperposition mehrdeutig. 'Kranial' (kopfwärts), 'kaudal' (fusswärts), 'anterior' (vorne) und 'posterior' (hinten) bleiben immer eindeutig. An den Extremitäten gelten ergänzend 'proximal' (rumpfnah, z.B. Schulter ist proximal des Ellenbogens) und 'distal' (rumpffern, z.B. Hand ist distal des Ellenbogens). Die Frontalebene teilt den Körper in eine ventrale und eine dorsale Hälfte." },
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
      ], explanation: "Flexion/Extension: Sagittalebene, Transversalachse (z.B. Kniebeugung). Abduktion/Adduktion: Frontalebene, Sagittalachse (z.B. Arm seitlich heben). Rotation: Transversalebene, Vertikalachse (z.B. Kopfdrehen). Jede Bewegungsebene hat ihre zugehörige Drehachse." },
      { id: "ko_lb_h4", type: "true_false", statement: "Medial bedeutet zur Körpermitte hin, lateral bedeutet von der Körpermitte weg.", answer: true, explanation: "Medial (lat. medius = mittig): zur Medianebene hin. Lateral (lat. latus = Seite): von der Medianebene weg. Beispiel: Die Tibia liegt medial der Fibula. Ulna liegt medial des Radius." },
      { id: "ko_lb_h5", type: "mc", question: "Welche Lagebezeichnung bedeutet 'zur Körperoberfläche hin'?", options: [
        { text: "Superfizial (oberflächlich)", correct: true },
        { text: "Profund (tief)", correct: false },
        { text: "Lateral", correct: false },
        { text: "Anterior", correct: false }
      ], explanation: "Superfizial = oberflächennah (zur Haut hin). Profund = tief (von der Haut weg, in Richtung Körperinneres). Anterior/posterior: vorne/hinten. Diese Begriffe sind wichtig für Schichten-Beschreibungen (z.B. 'oberflächliche Faszie vs. tiefe Faszie')." },
      { id: "ko_lb_h6", type: "mc", question: "In welcher Ebene verlaufen Rotationsbewegungen (z.B. Kopfdrehen)?", options: [
        { text: "Transversalebene (Horizontalebene) – um die Vertikalachse", correct: true },
        { text: "Sagittalebene – um die Transversalachse", correct: false },
        { text: "Frontalebene – um die Sagittalachse", correct: false },
        { text: "Medianebene – um alle Achsen gleichzeitig", correct: false }
      ], explanation: "Rotation (Drehung um Längs-/Vertikalachse) erfolgt in der Transversalebene. Flexion/Extension: Sagittalebene. Abduktion/Adduktion: Frontalebene. Jede Bewegungsart hat eine definierte Ebene-Achse-Kombination." }
    ],
    phase4Questions: [
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
      ]},
      { id: "ko_lb_mc3", type: "mc", question: "Welche Aussagen zu Lagebezeichnungen und Körperebenen sind korrekt?", options: [
        { text: "Sagittalebene teilt den Körper in rechte und linke Hälfte", correct: true },
        { text: "Proximal = rumpfnah; distal = rumpffern (an Extremitäten)", correct: true },
        { text: "Frontalebene teilt den Körper in obere und untere Hälfte", correct: false },
        { text: "Lateral bedeutet zur Körpermitte hin", correct: false }
      ], explanation: "Sagittalebene: rechts/links. Proximal/distal: rumpfnah/-fern. Frontalebene teilt ventral/dorsal (nicht oben/unten – das ist die Transversalebene). Lateral: von der Mitte weg (medial = zur Mitte hin)."}
    ]
  }),
  makeDetailedPlant({
    id: "knochenformen",
    title: "Knochenformen",
    phase1: {
      soil: { statement: "Knochen werden nach ihrer Form in vier Typen eingeteilt: lange Knochen (z.B. Femur), kurze Knochen (z.B. Handwurzel), platte Knochen (z.B. Schädelplatten) und unregelmässige Knochen (z.B. Wirbel).", answer: true, solution: "Die vier Knochentypen – lang (z.B. Femur), kurz (z.B. Handwurzelknochen), platt (z.B. Schädelplatten) und unregelmässig (z.B. Wirbel) – spiegeln verschiedene Belastungsprofile und Funktionen wider. Die Knochenform ist immer Ausdruck der mechanischen Anforderungen an den jeweiligen Knochen." },
      seed: { statement: "Wirbel werden den langen Röhrenknochen zugeordnet.", answer: false, solution: "Wirbel gelten als unregelmässige Knochen (Ossa irregularia), weil ihre komplexe Form (Wirbelkörper, Bogen, Fortsätze) keiner einfachen geometrischen Grundform entspricht. Platte Knochen wie Brustbein, Schulterblatt und Schädelknochen enthalten in ihrer Spongiosa auch im Erwachsenenalter rotes Knochenmark, das aktiv Blutbildung betreibt – daher werden klinische Knochenmarkpunktionen am Sternum oder Beckenkamm durchgeführt. Lange Röhrenknochen wie das Femur besitzen dagegen eine Diaphyse aus kompakter Kortikalis und zwei Epiphysen; ihre Markhöhle wird im Erwachsenenalter durch gelbes Fettmark ersetzt." },
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
      ], explanation: "Wirbel haben eine komplexe unregelmässige Form (Wirbelkörper + Bogen + Fortsätze) und passen in keine der anderen Kategorien. Weitere unregelmässige Knochen: Gesichtsschädelknochen, Os coxä (Hüftbein). Die Klassifikation 'unregelmässig' ist ein Sammelbegriff für Knochen ohne einfache geometrische Grundform." },
      { id: "ko_fo_h4", type: "true_false", statement: "Sesambeine sind eine Sonderform von Knochen, die in Sehnen eingelagert sind.", answer: true, explanation: "Sesambeine (Ossa sesamoidea) liegen in Sehnen eingebettet und schützen diese vor übermässigem Druck. Das grösste Sesambein ist die Patella (Kniescheibe) in der Quadrizepssehne. Sesambeine erhöhen auch den Hebelarm der Sehne." },
      { id: "ko_fo_h5", type: "mc", question: "Welche Knochen sind typische Beispiele für platte Knochen (Ossa plana)?", options: [
        { text: "Sternum, Skapula und Schädelplatten (Calvaria)", correct: true },
        { text: "Femur, Tibia und Humerus", correct: false },
        { text: "Hand- und Fusswurzelknochen", correct: false },
        { text: "Wirbelkörper und Os coxae", correct: false }
      ], explanation: "Platte Knochen: grossflächig, dünn, Spongiosa zwischen zwei Kortikalisplatten (bei Schädelknochen: Diploe). Funktion: Organschutz (Schädelplatten) und Muskelansatz (Skapula). Enthalten im Erwachsenenalter rotes Knochenmark." },
      { id: "ko_fo_h6", type: "mc", question: "Warum ist die Diaphyse langer Knochen aus dichter Kompakta aufgebaut?", options: [
        { text: "Um Biegekräften standzuhalten – Kompakta in der Peripherie = grösster Hebelarm gegen Biegung", correct: true },
        { text: "Um möglichst viel Knochenmark zu speichern", correct: false },
        { text: "Weil Kompakta leichter ist als Spongiosa", correct: false },
        { text: "Weil im Schaft keine Knochenumbauaktivität stattfindet", correct: false }
      ], explanation: "Kompakta in der Peripherie bietet maximale Biegesteifigkeit bei minimalem Gewicht (Hohlröhrenprinzip). Die Markhöhle (mit Fettmark) ist leicht. Spongiosa in den Epiphysen verteilt Druckkräfte (trabekuläre Architektur folgt Kraftlinien)." }
    ],
    phase4Questions: [
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
      ]},
      { id: "ko_fo_mc3", type: "mc", question: "Welche Aussagen zu Knochenformen sind korrekt?", options: [
        { text: "Platte Knochen enthalten auch im Erwachsenenalter rotes Knochenmark", correct: true },
        { text: "Sesambeine sind in Sehnen eingelagert und vergrössern den Hebelarm", correct: true },
        { text: "Die Diaphyse langer Knochen ist mit rotem Knochenmark gefüllt", correct: false },
        { text: "Wirbelkörper werden zu den langen Röhrenknochen gezählt", correct: false }
      ], explanation: "Platte Knochen: rotes Mark im Erwachsenenalter (hämatopoetisch aktiv). Sesambeine: in Sehnen, z.B. Patella. Diaphyse langer Knochen: gelbes Fettmark beim Erwachsenen. Wirbel: unregelmässige Knochen, nicht lange."}
    ]
  }),
  makeDetailedPlant({
    id: "achsenskelett",
    title: "Achsenskelett",
    phase1: {
      soil: { statement: "Zum Achsenskelett zählen u. a. Schädel, Wirbelsäule und knöcherner Brustkorb.", answer: true, solution: "Das Achsenskelett bildet die zentrale tragende Skelettachse des Körpers und gibt dem Rumpf seine stabile Grundstruktur. Schädel, Wirbelsäule, Rippen und Brustbein bieten dabei gleichzeitig Schutz für Gehirn, Rückenmark und Brustorgane." },
      seed: { statement: "Das Achsenskelett hat keine Schutzfunktion für zentrale Organe.", answer: false, solution: "Das Achsenskelett hat eine doppelte Hauptfunktion: Tragen und Stabilisieren des Körpers sowie Schutz lebenswichtiger Organe. Der Schädel schützt Gehirn und Hirnstamm, die Wirbelsäule schützt das Rückenmark im Spinalkanal, und der Brustkorb schützt Herz und Lunge. Der Brustkorb besteht aus 12 Rippenpaaren: Die ersten 7 sind echte Rippen (Costae verae) mit direktem Knorpelansatz am Brustbein, Rippe 8–10 sind falsche Rippen (Costae spuriae) mit gemeinsamem Knorpel zu Rippe 7, und Rippe 11–12 sind freie Rippen (Costae fluctuantes) ohne sternale Verbindung. Die Wirbelsäule gliedert sich in fünf Abschnitte: Halswirbelsäule, Brustwirbelsäule, Lendenwirbelsäule, Sakrum und Steissbein." },
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
      ], explanation: "Das Achsenskelett hat eine doppelte Funktion: Tragstruktur und Organschutz. Schädel schützt Gehirn und Hirnstamm, Wirbelsäule schützt Rückenmark im Spinalkanal, Brustkorb (Rippen + Sternum + BWS) schützt Herz und Lunge. Der Bauchraum wird vom Achsenskelett nicht knochern umschlossen – dort dienen Muskeln als Schutz." },
      { id: "ko_as_h4", type: "true_false", statement: "Das Brustbein (Sternum) besteht aus Manubrium, Corpus sterni und Processus xiphoideus.", answer: true, explanation: "Das Sternum ist dreiteilig: Manubrium sterni (oben, Ansatz Klavikula und 1./2. Rippe), Corpus sterni (Mittelteil, Ansatz Rippen 2-7), Processus xiphoideus (Schwertfortsatz, klinisch als Leitstruktur bei Reanimation). Knochenmarkpunktion am Sternum ist möglich (enthält rotes Mark)." },
      { id: "ko_as_h5", type: "mc", question: "Was sind freie Rippen (Costae fluctuantes)?", options: [
        { text: "Rippen 11 und 12, die keine sternale Verbindung haben", correct: true },
        { text: "Rippen 8-10, die über gemeinsamen Knorpel mit Rippe 7 verbunden sind", correct: false },
        { text: "Rippen 1-7 mit direktem Kontakt zum Sternum", correct: false },
        { text: "Alle Rippen, die bei Einatmung frei beweglich sind", correct: false }
      ], explanation: "Einteilung: Costae verae (1-7): direkt am Sternum. Costae spuriae (8-10): gemeinsamer Knorpel, kein direkter Sternalkontakt. Costae fluctuantes (11-12): freie Enden, hängen 'in der Luft'. Diese Einteilung ist klausurrelevant." },
      { id: "ko_as_h6", type: "mc", question: "Was ist der Unterschied zwischen Neurocranium und Viscerocranium?", options: [
        { text: "Neurocranium (Hirnschädel, 8 Knochen) schützt das Gehirn; Viscerocranium (Gesichtsschädel, 14 Knochen) bildet Kauapparat und Gesicht", correct: true },
        { text: "Neurocranium = vorderer Schädel; Viscerocranium = hinterer Schädel", correct: false },
        { text: "Beide Begriffe bezeichnen denselben Schädelabschnitt", correct: false },
        { text: "Viscerocranium enthält das Gehirn und ist daher grösser", correct: false }
      ], explanation: "Neurocranium: 8 Knochen (u.a. Os frontale, parietale, occipitale, temporale, sphenoidale). Viscerocranium: 14 Knochen (u.a. Mandibula, Maxilla, Os zygomaticum). Die Mandibula (Unterkiefer) ist der einzige bewegliche Schädelknochen." }
    ],
    phase4Questions: [
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
      ]},
      { id: "ko_as_mc3", type: "mc", question: "Welche Aussagen zum Achsenskelett sind korrekt?", options: [
        { text: "Schädel schützt Gehirn, Wirbelsäule schützt Rückenmark, Brustkorb schützt Herz und Lunge", correct: true },
        { text: "Costae fluctuantes (freie Rippen) haben keine sternale Verbindung", correct: true },
        { text: "Das Viscerocranium enthält das Gehirn und schützt es vor Trauma", correct: false },
        { text: "Das Sternum besteht aus 5 einzelnen Knochen", correct: false }
      ], explanation: "Achsenskelett schützt drei Organsysteme. Freie Rippen 11-12 = Costae fluctuantes. Viscerocranium = Gesichtsschädel (Kauapparat, nicht Gehirn). Sternum: 3 Teile (Manubrium, Corpus, Processus xiphoideus)."}
    ]
  }),
  makeDetailedPlant({
    id: "wirbelsäule",
    title: "Wirbelsäule",
    phase1: {
      soil: { statement: "Die Wirbelsäule besteht aus Wirbeln und Bandscheiben und hat sowohl tragende als auch schützende Aufgaben.", answer: true, solution: "Die Wirbelsäule besteht aus 33–34 Wirbeln in fünf Abschnitten (7 HWS, 12 BWS, 5 LWS, Sakrum, Steissbein), verbunden durch Bandscheiben und Bänder. Bandscheiben aus Faserring (Anulus fibrosus) und Gallertkern (Nucleus pulposus) fungieren als Stossdämpfer und ermöglichen gleichzeitig Beweglichkeit." },
      seed: { statement: "Bandscheiben sind für Funktion und Beweglichkeit der Wirbelsäule bedeutungslos.", answer: false, solution: "Bandscheiben sind unverzichtbar für die Funktion der Wirbelsäule: Sie federn axiale Druckkräfte ab, geben den Wirbelkörpern Abstand und ermöglichen durch ihre Verformbarkeit Beugung, Streckung und Rotation. Im Seitenbild zeigt die gesunde Wirbelsäule ein S-förmiges Doppelkurvenprofil: Halswirbelsäule und Lendenwirbelsäule krümmen sich nach vorne (Lordose), Brustwirbelsäule und Sakrum nach hinten (Kyphose). Das Rückenmark selbst endet beim Erwachsenen am Conus medullaris auf Höhe des 1. bis 2. Lendenwirbels; kaudal davon verlaufen die langen Nervenwurzeln als Cauda equina im Liquorraum." },
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
      ], explanation: "Das Rückenmark endet beim Erwachsenen am Conus medullaris auf Höhe LWK 1-2. Kaudal davon verlaufen die langen Nervenwurzeln (L2-S5) als Cauda equina ('Pferdeschweif') im Liquorraum. Klinisch relevant: Lumbalpunktion unterhalb LWK 3/4 trifft keine Rückenmarkstruktur mehr." },
      { id: "ko_ws_h4", type: "true_false", statement: "Das Ligamentum flavum verbindet benachbarte Wirbelbögen und enthält viel elastisches Gewebe.", answer: true, explanation: "Lig. flavum (gelbes Band): zwischen Wirbelbögen, reich an elastischen Fasern (gelbliche Farbe). Ermöglicht Rückstellung nach Vorwärtsbeugung. Klinisch: Hypertrophie des Lig. flavum kann zur spinalen Stenose führen." },
      { id: "ko_ws_h5", type: "mc", question: "Wie viele Wirbel hat die Wirbelsäule in jedem Abschnitt?", options: [
        { text: "7 HWS, 12 BWS, 5 LWS, 5 Sacrum (verwachsen), 4–5 Steissbein (verwachsen)", correct: true },
        { text: "5 HWS, 10 BWS, 7 LWS, 5 Sacrum", correct: false },
        { text: "7 HWS, 10 BWS, 7 LWS, 3 Sacrum", correct: false },
        { text: "Alle Abschnitte haben je 5 Wirbel", correct: false }
      ], explanation: "Merkhilfe: 7+12+5 = 24 freie Wirbel (entspricht Stunden/Tag, Monaten/Jahr, Werktagen/Woche). Dazu 5 verwachsene Kreuzwirbel (Sacrum) und 4-5 Steisswirbel (Coccyx). Gesamtzahl: 33-34 Wirbel." },
      { id: "ko_ws_h6", type: "mc", question: "Was ist ein Bandscheibenvorfall (Prolaps) und welche Struktur prolabiert?", options: [
        { text: "Der Nucleus pulposus prolabiert durch Riss im Anulus fibrosus und kann Nervenwurzeln komprimieren", correct: true },
        { text: "Ein Wirbelkörper verschiebt sich auf einen anderen (Spondylolisthesis)", correct: false },
        { text: "Der Anulus fibrosus löst sich vom Wirbelkörper", correct: false },
        { text: "Das Lig. longitudinale posterius reisst und das Rückenmark prolabiert", correct: false }
      ], explanation: "Bandscheibenvorfall: Riss im Anulus fibrosus → Nucleus pulposus tritt aus. Häufig dorsolateral (Lig. longitudinale posterius verläuft zentral). Kompression der Nervenwurzel → radikuläre Schmerzen (Ischias bei LWS-Vorfall). Häufigste Etagen: L4/L5 und L5/S1." }
    ],
    phase4Questions: [
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
      ]},
      { id: "ko_ws_mc3", type: "mc", question: "Welche Aussagen zur Wirbelsäule sind korrekt?", options: [
        { text: "HWS und LWS zeigen Lordose, BWS und Sakrum zeigen Kyphose", correct: true },
        { text: "Das Rückenmark endet auf Höhe LWK 1-2 als Conus medullaris", correct: true },
        { text: "Der Nucleus pulposus besteht aus festem Kollagen und nicht aus Gel", correct: false },
        { text: "Lumbalpunktion wird am sichersten auf Höhe BWK 12 durchgeführt", correct: false }
      ], explanation: "Wirbelsäule: HWS/LWS=Lordose, BWS/Sakrum=Kyphose. Conus medullaris: LWK 1-2. Nucleus pulposus: wasserreicher Gallertkern (80% Wasser). Lumbalpunktion: unterhalb LWK 3/4, um Rückenmark nicht zu verletzen."}
    ]
  }),
  makeDetailedPlant({
    id: "extremitätenskelett",
    title: "Extremitätenskelett",
    phase1: {
      soil: { statement: "Das Extremitätenskelett umfasst Schultergürtel, obere Extremität, Beckengürtel und untere Extremität.", answer: true, solution: "Das Extremitätenskelett verbindet über Gürtelsysteme die Gliedmassen mit dem Achsenskelett. Schultergürtel (Klavikula + Skapula) und Beckengürtel sind die Verbindungsstellen, über die Kräfte zwischen Rumpf und Extremitäten übertragen werden." },
      seed: { statement: "Schultergürtel und Beckengürtel haben keinen Bezug zur Kraftübertragung.", answer: false, solution: "Gürtelsysteme sind funktionell zentrale Verbindungselemente: Der Schultergürtel aus Klavikula und Skapula ermöglicht die grosse Bewegungsreichweite des Arms; die Klavikula ist das einzige knöcherne Band zwischen Schultergürtel und Achsenskelett. Der Beckengürtel besteht aus dem Os coxae, das seinerseits aus drei verwachsenen Knochen entsteht: Os ilium (Darmbein), Os ischii (Sitzbein) und Os pubis (Schambein). Beide Os coxae verbinden sich vorne an der Symphyse und hinten mit dem Sakrum zum knöchernen Beckenring. Das Kniegelenk als grösstes Gelenk des Körpers verbindet Femur, Tibia und Patella." },
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
      ], explanation: "Das Kniegelenk (Art. genus) verbindet Femur (Oberschenkel), Tibia (Haupt-Lasttrageknochen des Unterschenkels) und Patella (Kniescheibe, als Sesambein im M. quadriceps-Sehne). Die Fibula bildet keine Kniegelenkfläche, sondern liegt lateral der Tibia und dient als Muskeln-Ansatz und Austauschorgan für Sprunggelenk (Malleolus lateralis)." },
      { id: "ko_ex_h4", type: "true_false", statement: "Die Klavikula ist das einzige knöcherne Band zwischen Schultergürtel und Achsenskelett.", answer: true, explanation: "Die Klavikula verbindet medial mit dem Sternum (Sternoklavikulargelenk) und lateral mit der Skapula (Akromioklavikulargelenk). Die Skapula selbst hat keinen direkten knöchernen Kontakt mit dem Achsenskelett." },
      { id: "ko_ex_h5", type: "mc", question: "Welche Knochen bilden den Beckenring?", options: [
        { text: "Beide Os coxae (je aus Os ilium, ischii und pubis) + Sacrum, verbunden durch Symphyse und ISG", correct: true },
        { text: "Os ilium, Femur und Sacrum", correct: false },
        { text: "Nur die Wirbelkörper L4-S5", correct: false },
        { text: "Femur, Os pubis und Steissbein", correct: false }
      ], explanation: "Der knöcherne Beckenring: beide Os coxae verbinden sich vorne an der Symphysis pubica (Faserknorpel) und hinten beidseits mit dem Sacrum über das Iliosakralgelenk (ISG). Das Os coxae selbst entsteht durch Verwachsung von Os ilium, Os ischii und Os pubis." },
      { id: "ko_ex_h6", type: "mc", question: "Welche Funktion hat die Patella?", options: [
        { text: "Sesambein im Sehnenapparat des M. quadriceps; verlängert den Hebelarm der Streckung am Knie", correct: true },
        { text: "Verbindet Femur und Tibia direkt als Knochen", correct: false },
        { text: "Bildet die laterale Begrenzung des Kniegelenks", correct: false },
        { text: "Ist ein reines Schutzknochen ohne mechanische Funktion", correct: false }
      ], explanation: "Patella = Kniescheibe, grösstes Sesambein des Körpers. Liegt in der Sehne des M. quadriceps femoris. Funktion: erhöht den Hebelarm der Kniestreckung durch Auslenkung der Sehne, sodass der Quadriceps effizienter arbeiten kann." }
    ],
    phase4Questions: [
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
      ]},
      { id: "ko_ex_mc3", type: "mc", question: "Welche Aussagen zum Extremitätenskelett sind korrekt?", options: [
        { text: "Die Klavikula verbindet Schultergürtel (Sternoklavikulargelenk) mit dem Achsenskelett", correct: true },
        { text: "Das Kniegelenk verbindet Femur, Tibia und Patella", correct: true },
        { text: "Die Fibula ist der Hauptlasttrageknochen des Unterschenkels", correct: false },
        { text: "Das Os coxae besteht aus nur einem einzigen Knochen ohne Verwachsung", correct: false }
      ], explanation: "Klavikula: einzige knöcherne Verbindung Schultergürtel–Achsenskelett. Knie: Femur+Tibia+Patella. Fibula: Lasttragetung ist Tibia, Fibula dient als Muskelansatz. Os coxae: Verwachsung von Os ilium, ischii und pubis."}
    ]
  }),
  makeDetailedPlant({
    id: "gelenke_grundlagen",
    title: "Gelenke: Grundlagen",
    phase1: {
      soil: { statement: "Gelenke werden grundlegend in Synarthrosen (unechte Gelenke ohne Gelenkhöhle, z.B. Schädelnäthe) und Diarthrosen (echte Gelenke mit Gelenkhöhle, Knorpel und Kapsel) eingeteilt.", answer: true, solution: "Synarthrosen (unechte Gelenke) wie Schädelnäthe oder die Symphyse erlauben kaum Bewegung und haben keine Gelenkhöhlel. Diarthrosen (echte Gelenke) besitzen eine mit Synovia gefüllte Gelenkhöhlel, einen Gelenkknorpel und eine Kapsel, was variable Bewegungen ermöglicht." },
      seed: { statement: "Synarthrosen sind die frei beweglichsten Gelenkformen.", answer: false, solution: "Synarthrosen erlauben kaum oder keine Bewegung – Beispiele sind Schädelnähte (Suturae cranii) und die Symphyse. Freie Beweglichkeit ist typisch für Diarthrosen (echte Gelenke). Eine Diarthrose besitzt zwingend drei Strukturen: Gelenkknorpel als Gleitlager, eine Gelenkhöhle gefüllt mit Synovia und eine Gelenkkapsel. Die Synovia erfüllt dabei drei Funktionen: Reibungsminderung, Ernährung des avaskulären Gelenkknorpels durch Diffusion und Stossdämpfung." },
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
      ], explanation: "Synarthrosen erlauben kaum oder keine Bewegung. Beispiele: Schädelnäthe (Suturä: bindegewebige Verbindung beim Kind, knöhernd beim Erwachsenen), Symphyse (Faserknorpel), Syndesmose (Bindegewebe: distale Tibiofibularverbindung). Alle Diarthrosen haben eine echte Gelenkhöhle und sind frei beweglich." },
      { id: "ko_gk_h4", type: "true_false", statement: "Der Gelenkknorpel besitzt keine eigene Blutversorgung und wird durch Synovia ernährt.", answer: true, explanation: "Gelenkknorpel ist avaskular (keine Blutgefässe). Ernährung erfolgt durch Diffusion aus der Synovia. Das erklärt die schlechte Regenerationsfähigkeit des Knorpels und die klinische Bedeutung von Gelenkentzündungen (Arthritis → Synovia-Veränderung → Knorpelschaden)." },
      { id: "ko_gk_h5", type: "mc", question: "Was ist eine Amphiarthrose?", options: [
        { text: "Ein straffes echtes Gelenk mit sehr kleiner Gelenkhöhle und minimaler Beweglichkeit (z.B. Iliosakralgelenk)", correct: true },
        { text: "Ein Gelenk ohne jede Beweglichkeit wie Schädelnähte", correct: false },
        { text: "Ein sehr bewegliches Kugelgelenk mit tiefer Pfanne", correct: false },
        { text: "Ein Faserknorpelgelenk ohne echte Gelenkhöhle wie die Symphyse", correct: false }
      ], explanation: "Amphiarthrose: echtes Gelenk (Gelenkhöhle vorhanden), aber sehr straffe Kapsel und Bänder → minimale Beweglichkeit. Beispiel: Iliosakralgelenk (ISG), Art. acromioclavicularis. Unterschied zur Synarthrose: Amphiarthrose hat eine Gelenkhöhle." },
      { id: "ko_gk_h6", type: "mc", question: "Was unterscheidet Kapselligamente von extrakapsulären Bändern?", options: [
        { text: "Kapselligamente sind Verdickungen der Gelenkkapsel selbst; extrakapsuläre Bänder liegen ausserhalb der Kapsel", correct: true },
        { text: "Kapselligamente bestehen aus Knorpel, extrakapsuläre Bänder aus Knochen", correct: false },
        { text: "Kapselligamente sind nur am Knie zu finden", correct: false },
        { text: "Es gibt keinen funktionellen Unterschied zwischen beiden", correct: false }
      ], explanation: "Kapselligamente: Teile des Stratum fibrosum der Gelenkkapsel, die verdickt sind und als Bänder fungieren (z.B. Lig. iliofemorale). Extrakapsuläre Bänder: ausserhalb der Kapsel. Intrakapsuläre Bänder: innerhalb der Gelenkhöhle (z.B. Kreuzbänder). Alle stabilisieren das Gelenk." }
    ],
    phase4Questions: [
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
      ]},
      { id: "ko_gk_mc3", type: "mc", question: "Welche Aussagen zu Gelenkgrundlagen sind korrekt?", options: [
        { text: "Diarthrosen besitzen zwingend Gelenkknorpel, Gelenkhöhle und Kapsel", correct: true },
        { text: "Synovia ernährt den avaskulären Gelenkknorpel durch Diffusion", correct: true },
        { text: "Synarthrosen haben eine grosse Gelenkhöhle und maximale Beweglichkeit", correct: false },
        { text: "Die Membrana synovialis besteht aus Faserknorpel", correct: false }
      ], explanation: "Diarthrosen: Knorpel + Höhle + Kapsel. Synovia: Ernährung, Schmierung, Stossdämpfung; produziert von Membrana synovialis (nicht Faserknorpel). Synarthrosen: keine Gelenkhöhle, kaum Bewegung."}
    ]
  }),
  makeDetailedPlant({
    id: "gelenkarten",
    title: "Gelenkarten",
    phase1: {
      soil: { statement: "Echte Gelenke werden nach der Form ihres Gelenkkopfes eingeteilt: Kugelgelenk (3 Bewegungsachsen, z.B. Schulter), Scharniergelenk (1 Achse, z.B. Knie) und Sattelgelenk (2 Achsen, z.B. Daumen).", answer: true, solution: "Echte Gelenke werden nach Gelenkkopf-Form und Bewegungsmöglichkeit eingeteilt: Kugelgelenk (3 Achsen, z.B. Schulter), Scharniergelenk (1 Achse, z.B. Knie), Sattelgelenk (2 Achsen, z.B. Daumensattelgelenk). Jede Gelenkform erlaubt bestimmte Bewegungsrichtungen und begrenzt andere." },
      seed: { statement: "Gelenkarten unterscheiden sich nur namentlich, nicht in Bewegungsmöglichkeiten.", answer: false, solution: "Gelenkform und Bewegungsumfang sind direkt verknüpft: Das Kugelgelenk (z.B. Schulter) erlaubt Bewegungen in alle drei Raumachsen, das Scharniergelenk (z.B. Knie) nur Flexion und Extension um eine Achse. Die Form ist also der anatomische Ausdruck der Bewegungsfunktion." },
      water: { statement: "Die Gelenkform ist ein Schlüssel zur Ableitung möglicher Bewegungen.", answer: true, solution: "Das Schultergelenk ist als Kugelgelenk in alle Richtungen beweglich, das Kniegelenk als Scharniergelenk nur in Beugung/Streckung. Obwohl Schulter und Hüfte beide Kugelgelenke sind, unterscheiden sie sich grundlegend: Das Schultergelenk hat eine flache Pfanne (Cavitas glenoidalis) und ermöglicht die grösste Mobilität des Körpers, ist dafür aber weniger stabil und stützt sich auf die Rotatorenmanschette. Das Hüftgelenk hat eine tiefe Pfanne (Acetabulum) und ist stabiler, aber weniger beweglich. Das Zapfengelenk (Radgelenk, Articulatio trochoidea) erlaubt ausschliesslich Rotation um die Längsachse – klassische Beispiele sind die Radioulnargelenke für Pronation/Supination und das Atlantoaxialgelenk für Kopfrotation." }
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
      ], explanation: "Das Zapfengelenk (Articulatio trochoidea) hat einen zylindrischen Zapfen, der in einem Knochenring dreht – nur Rotation um die Längsachse ist möglich (uniaxial). Beispiele: proximales und distales Radioulnargelenk (Unterarmdrehung: Pronation/Supination), Atlantoaxialgelenk (Kopfrotation)." },
      { id: "ko_ga_h4", type: "true_false", statement: "Das Scharniergelenk (Ginglymus) erlaubt nur Bewegung in einer Ebene um eine Querachse.", answer: true, explanation: "Scharniergelenk: uniaxial (eine Achse), Bewegung in der Sagittalebene → Flexion und Extension. Beispiele: Ellenbogengelenk (Humeroulnargelenk), Fingergelenke. Keine Rotation, keine Abduktion möglich." },
      { id: "ko_ga_h5", type: "mc", question: "Welches Gelenk ist ein Eigelenk (Ellipsoidgelenk) und welche Bewegungen sind möglich?", options: [
        { text: "Handgelenk (Art. radiocarpalis); Flexion/Extension + Abduktion/Adduktion (2 Achsen, keine Rotation)", correct: true },
        { text: "Schultergelenk; alle Bewegungen inklusive Rotation (3 Achsen)", correct: false },
        { text: "Daumensattelgelenk; nur Flexion/Extension (1 Achse)", correct: false },
        { text: "Atlantoaxialgelenk; nur Rotation (1 Achse)", correct: false }
      ], explanation: "Eigelenk (Ellipsoidgelenk): ovaler Kopf in elliptischer Pfanne, biaxial wie Sattelgelenk aber keine Rotation. Klassisches Beispiel: Handgelenk. Erlaubt Flexion/Extension + Radial-/Ulnarabduktion, keine Axialrotation." },
      { id: "ko_ga_h6", type: "mc", question: "Was ist der entscheidende Unterschied zwischen Kugelgelenk und Eigelenk?", options: [
        { text: "Kugelgelenk: 3 Achsen (inkl. Rotation); Eigelenk: 2 Achsen (keine Rotation)", correct: true },
        { text: "Kugelgelenk: 1 Achse; Eigelenk: 3 Achsen", correct: false },
        { text: "Beide erlauben dieselben Bewegungen, unterscheiden sich nur in der Form", correct: false },
        { text: "Eigelenk erlaubt mehr Bewegung als Kugelgelenk", correct: false }
      ], explanation: "Kugelgelenk (triaxial): Flexion/Extension + Abduktion/Adduktion + Rotation + Zirkumduktion. Eigelenk (biaxial): wie Sattelgelenk ohne Rotation. Diese Unterscheidung ist beim Bewegungsanalyse-Fragen entscheidend." }
    ],
    phase4Questions: [
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
      ]},
      { id: "ko_ga_mc3", type: "mc", question: "Welche Aussagen zu Gelenkarten sind korrekt?", options: [
        { text: "Kugelgelenk (z.B. Schulter) ist triaxial und ermöglicht auch Rotation", correct: true },
        { text: "Zapfengelenk erlaubt nur Rotation um die Längsachse", correct: true },
        { text: "Sattelgelenk ist uniaxial und erlaubt nur Flexion/Extension", correct: false },
        { text: "Scharniergelenk erlaubt Bewegungen in allen Raumebenen", correct: false }
      ], explanation: "Kugelgelenk: triaxial inkl. Rotation. Zapfengelenk: nur Axialrotation (Radioulnar, Atlantoaxial). Sattelgelenk: biaxial, Flex/Ext + Ab/Adduktion, keine Rotation. Scharniergelenk: uniaxial, nur Flex/Ext."}
    ]
  })
];

const MUSKELLEHRE_1034_PLANTS = [
  makeDetailedPlant({
    id: "allgemeine_muskellehre",
    title: "Allgemeine Muskellehre",
    phase1: {
      soil: { statement: "Muskeln gehören zum aktiven Bewegungsapparat und erzeugen Bewegung durch Kontraktion.", answer: true, solution: "Muskeln erzeugen Bewegung durch die Verkürzung (Kontraktion) ihrer Fasern, ausgelöst durch nervale Erregung an der motorischen Endplatte. Im Gegensatz zum passiven Bewegungsapparat (Knochen, Bänder) können Muskeln aktiv Kraft aufbauen und damit Gelenke bewegen und stabilisieren." },
      seed: { statement: "Muskeln stabilisieren Gelenke nur passiv und ohne aktive Spannung.", answer: false, solution: "Muskeln sichern Gelenke durch aktive Kraftentwicklung, nicht passiv. Alle Muskelkontraktionen – ob Skelett-, Herz- oder glatte Muskulatur – beruhen auf demselben molekularen Prinzip: dem Gleitfilamentmechanismus. Dabei binden Myosinköpfe ATP, hydrolysieren es und ziehen das Aktinfilament beim Krafthub (Power Stroke) aktiv zur Mitte des Sarkomers. Das Sarkomer verkürzt sich, ohne dass die Filamente selbst kürzer werden." },
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
      ], explanation: "Der Gleitfilamentmechanismus (Huxley, 1954) ist das universelle Prinzip aller Muskulatur: Myosinköpfe binden ATP, hydrolysieren es, bewegen sich ('Power Stroke') und ziehen das Aktinfilament. Das Sarkomer verkürzt sich, ohne dass die Filamente selbst kürzer werden. Dieses Prinzip gilt für Skelett-, Herz- und glatte Muskulatur gleichermassen." },
      { id: "mu_allg_h4", type: "true_false", statement: "Der aktive Bewegungsapparat besteht aus der Skelettmuskulatur, während Knochen und Bänder den passiven Bewegungsapparat bilden.", answer: true, explanation: "Aktiver Apparat: Muskeln erzeugen Kraft. Passiver Apparat: Knochen (Hebel), Bänder (Führung/Begrenzung), Gelenkkapseln (Sicherung) – können selbst keine Kraft erzeugen, übertragen und begrenzen sie nur." },
      { id: "mu_allg_h5", type: "mc", question: "Was wird beim Gleitfilamentmechanismus kürzer?", options: [
        { text: "Das Sarkomer (Z-Scheiben nähern sich), nicht die einzelnen Aktin- oder Myosinfilamente", correct: true },
        { text: "Die Myosinfilamente verkürzen sich durch Faltung", correct: false },
        { text: "Die Aktinfilamente werden chemisch gespalten und kürzer", correct: false },
        { text: "Weder Sarkomer noch Filamente ändern ihre Länge", correct: false }
      ], explanation: "Beim Gleitfilamentmechanismus bleiben die Filamentlängen konstant. Die Sarkomerlänge verringert sich, weil Aktin über Myosin gleitet und die Z-Scheiben sich annähern. ATP treibt den Querbrückenzyklus der Myosinköpfe an." },
      { id: "mu_allg_h6", type: "mc", question: "Welche drei Funktionen hat die Skelettmuskulatur?", options: [
        { text: "Bewegungserzeugung, Gelenkstabilisierung und Wärmebildung", correct: true },
        { text: "Bewegung, Blutbildung und Hormonsynthese", correct: false },
        { text: "Stabilisierung, Gasaustausch und Immunabwehr", correct: false },
        { text: "Kontraktion, Filtration und Resorption", correct: false }
      ], explanation: "Skelettmuskulatur: 1) Bewegungserzeugung (primäre Funktion), 2) Gelenkstabilisierung durch aktiven Muskeltonus, 3) Wärmeproduktion (bis 70% der Körpereigenwärme). Diese drei Funktionen sind prüfungsrelevant." }
    ],
    phase4Questions: [
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
      ]},
      { id: "mu_allg_mc3", type: "mc", question: "Welche Aussagen zur Skelettmuskulatur sind korrekt?", options: [
        { text: "Muskulatur erzeugt bis zu 70% der Körpereigenwärme", correct: true },
        { text: "Aktiver Bewegungsapparat = Muskeln; passiver = Knochen, Bänder, Kapseln", correct: true },
        { text: "Die Filamentlängen (Aktin, Myosin) verkürzen sich während der Kontraktion", correct: false },
        { text: "Skelettmuskel kann ohne Innervation willkürlich kontrahieren", correct: false }
      ], explanation: "Wärmeproduktion: bis 70%. Aktiv/passiv: Muskeln vs. Knochen/Bänder. Filamente bleiben gleich lang, Sarkomer verkürzt sich. Skelettmuskel benötigt für willkürliche Kontraktion immer neuronale Innervation."}
    ]
  }),
  makeDetailedPlant({
    id: "muskelaufbau",
    title: "Aufbau des Muskels",
    phase1: {
      soil: { statement: "Der Skelettmuskel ist hierarchisch organisiert, von Muskel über Faserbündel bis zur Muskelfaser.", answer: true, solution: "Der Skelettmuskel ist hierarchisch aufgebaut: Das Epimysium umhüllt den gesamten Muskel, das Perimysium einzelne Muskelfaserbündel und das Endomysium einzelne Muskelfasern. Diese Bindegewebsschichten bieten Schutz, ermöglichen Gleitbewegungen und enthalten Blutgefässe und Nerven." },
      seed: { statement: "Muskelfasern enthalten keine spezialisierten kontraktilen Strukturen.", answer: false, solution: "Muskelfasern enthalten Myofibrillen, die aus Sarkomeren aufgebaut sind – den kleinsten kontraktilen Einheiten, die je von Z-Scheibe zu Z-Scheibe reichen. Im Sarkomer wechseln helle I-Banden (nur Aktin) mit dunklen A-Banden (Aktin und Myosin überlappend) ab. Die Kontraktionskraft wird über eine vollständige Kraftkette übertragen: Myofibrillen → Endomysium (Hülle der Einzelfaser) → Perimysium (Hülle der Faserbündel) → Epimysium (Hülle des Gesamtmuskels) → Sehne → Knochen. Blutgefässe und Nerven verlaufen in diesen Bindegewebshüllen und versorgen die Fasern." },
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
      ], explanation: "Die mechanische Kraftkette: Myofibrillen verkürzen das Sarkomer → Kraft wird auf Sarkolemm übertragen → Endomysium bündelt Einzelfaserkräfte → Perimysium bündelt Faserbündel → Epimysium leitet in Sehne → Sehne verankert am Periost des Knochens. Die Bindegewebshüllen sind nicht nur Schutz, sondern essenzielle Kraftübertragungsstrukturen." },
      { id: "mu_auf_h4", type: "true_false", statement: "Die I-Bande enthält ausschliesslich Aktinfilamente und erscheint im Mikroskop hell.", answer: true, explanation: "I-Bande (isotrop): nur Aktin, hell. A-Bande (anisotrop): Aktin+Myosin überlappend, dunkel. H-Zone: nur Myosin, mittig. M-Linie: Verankerungspunkt der Myosinfilamente in der Mitte des Sarkomers." },
      { id: "mu_auf_h5", type: "mc", question: "Was passiert mit der H-Zone bei Muskelkontraktion?", options: [
        { text: "Sie wird kleiner und verschwindet bei maximaler Kontraktion (Aktin- und Myosin-Überlappung nimmt zu)", correct: true },
        { text: "Sie wird grösser, weil Myosin sich ausdehnt", correct: false },
        { text: "Sie wandert zur Z-Scheibe", correct: false },
        { text: "Sie bleibt immer gleich, nur die I-Bande verändert sich", correct: false }
      ], explanation: "Gleitfilamentmechanismus: Aktin gleitet über Myosin → Z-Scheiben nähern sich → Sarkomer verkürzt sich. H-Zone (reines Myosin) verschwindet, wenn Aktinfilamente maximal eingegleitet sind. I-Banden werden ebenfalls kleiner." },
      { id: "mu_auf_h6", type: "true_false", statement: "Das Endomysium umhüllt einzelne Muskelfasern und enthält Kapillaren für die Versorgung.", answer: true, explanation: "Endomysium: innerste Bindegewebsschicht, umhüllt jede einzelne Muskelfaser, enthält Kapillaren für O2/Nährstoffversorgung. Perimysium: umhüllt Faserbündel. Epimysium: umhüllt den gesamten Muskel." }
    ],
    phase4Questions: [
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
      ]},
      { id: "mu_auf_mc3", type: "mc", question: "Welche Aussagen zum Muskelaufbau und Sarkomer sind korrekt?", options: [
        { text: "Das Sarkomer liegt zwischen zwei Z-Scheiben und ist die kleinste Kontraktionseinheit", correct: true },
        { text: "Epimysium → Perimysium → Endomysium ist die hierarchische Bindegewebsstruktur von aussen nach innen", correct: true },
        { text: "Die A-Bande enthält ausschliesslich Aktinfilamente und ist hell", correct: false },
        { text: "Muskelfasern sind Einzelzellen mit einem randständigen Zellkern", correct: false }
      ], explanation: "Sarkomer: Z-Scheibe zu Z-Scheibe. Bindegewebe: Epimysium (Muskel), Perimysium (Bündel), Endomysium (Faser). A-Bande: Aktin+Myosin, dunkel. Skelettmuskelfasern: mehrkernige Synzytien aus Myoblastenfusion, nicht Einzelzellen."}
    ]
  }),
  makeDetailedPlant({
    id: "funktionelle_charakteristika",
    title: "Funktionelle Charakteristika",
    phase1: {
      soil: { statement: "Erregbarkeit, Kontraktilität, Dehnbarkeit und Elastizität sind grundlegende Muskel-Eigenschaften.", answer: true, solution: "Diese vier Eigenschaften ermöglichen erst die normale Muskelfunktion: Erregbarkeit (Empfang nervaler Reize), Kontraktilität (aktive Kraftentwicklung), Dehnbarkeit (passive Längenveränderung ohne Schaden) und Elastizität (Rückkehr zur Ausgangslange nach Dehnung)." },
      seed: { statement: "Ein Muskel muss weder erregbar noch elastisch sein, um physiologisch zu arbeiten.", answer: false, solution: "Ohne Erregbarkeit kann ein Muskel keinen Nervenreiz empfangen und keine Kontraktion einleiten – Bewegung wäre unmöglich. Ohne Elastizität könnte er nach einer Dehnung nicht in seine Ausgangslage zurückkehren, was zu dauerhafter Verkürzung und Funktionsverlust führen würde." },
      water: { statement: "Isometrische und isotonische Arbeitsweisen gehören zur funktionellen Betrachtung.", answer: true, solution: "Bei isometrischer Arbeit kontrahiert der Muskel ohne Längenänderung (z.B. Halten einer Last), bei isotonischer Arbeit verändert er seine Länge bei gleichbleibender Spannung (z.B. Heben einer Last). Innerhalb der isotonischen Arbeit unterscheidet man konzentrische Kontraktion (Muskel verkürzt sich, z.B. Arm heben) und exzentrische Kontraktion (Muskel verlängert sich kontrolliert unter Spannung, z.B. Arm senken). Die Kraft eines Muskels ist zudem längenabhängig: Bei der Ruhelänge (optimale Aktin-Myosin-Überlappung im Sarkomer) wird die maximale Kraft entwickelt – zu kurz oder zu lang verringert sie. Mit steigender Stimulationsfrequenz summieren sich Kontraktionen (Kraft-Frequenz-Beziehung), bis bei hoher Frequenz ein vollständiger Tetanus entsteht, der drei- bis viermal stärker ist als eine Einzelzuckung." }
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
      ], explanation: "Einzelzuckung: ein Aktionspotential → kurze Kontraktion. Bei schneller Folge (unvollständiger Tetanus): Kontraktionen summieren sich (Treppe). Bei hoher Frequenz (vollständiger Tetanus): die Einzelzuckungen verschmelzen zur glatten Dauerkontrak­tion mit maximaler Kraft. Tetanische Kontraktionen sind 3-4x stärker als Einzelzuckungen." },
      { id: "mu_fk_h4", type: "true_false", statement: "Bei exzentrischer Muskelarbeit verlängert sich der Muskel während der Kraftentwicklung.", answer: true, explanation: "Exzentrisch = Muskel kontrahiert und verlängert sich gleichzeitig (abbremsendes Kontrahieren, z.B. Bergabgehen). Dies erzeugt grössere Kräfte als konzentrische Arbeit und verursacht mehr Muskelkater." },
      { id: "mu_fk_h5", type: "mc", question: "Was ist isotonische Muskelarbeit?", options: [
        { text: "Kraftentfaltung bei gleichbleibender Muskelspannung (Tonus) mit Längenveränderung", correct: true },
        { text: "Kraftentfaltung ohne Längenveränderung des Muskels", correct: false },
        { text: "Passive Dehnung des Muskels von aussen", correct: false },
        { text: "Kontraktion ohne Kraftentwicklung", correct: false }
      ], explanation: "Isotonisch = gleichbleibende Spannung, Länge verändert sich (z.B. Gewicht heben). Isometrisch = gleichbleibende Länge, Spannung verändert sich (z.B. gegen Wand drücken). Konzentrisch und exzentrisch sind Unterformen der isotonischen Arbeit." },
      { id: "mu_fk_h6", type: "true_false", statement: "Tetanus (vollständige tetanische Kontraktion) entwickelt 3-4x mehr Kraft als eine Einzelzuckung.", answer: true, explanation: "Bei hoher Reizfrequenz verschmelzen Einzelzuckungen zur Dauerkontraktion (Tetanus). Ca2+ akkumuliert im Sarkoplasma → maximale Troponin C-Besetzung → maximale Querbrückenbildung. Tetanuskontraktionen sind im Alltag der Normalfall willkürlicher Muskelaktivität." }
    ],
    phase4Questions: [
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
      ]},
      { id: "mu_fk_mc3", type: "mc", question: "Welche Aussagen zu Kontraktionsformen sind korrekt?", options: [
        { text: "Konzentrisch: Muskel verkürzt sich unter Kraftentwicklung", correct: true },
        { text: "Vollständiger Tetanus erzeugt mehr Kraft als Einzelzuckungen", correct: true },
        { text: "Isometrisch bedeutet gleichbleibende Spannung bei Längenveränderung", correct: false },
        { text: "Exzentrische Arbeit erzeugt weniger Kraft als konzentrische", correct: false }
      ], explanation: "Konzentrisch = Verkürzung. Tetanus = Summation → maximale Kraft. Isometrisch = gleichbleibende Länge (nicht Spannung). Exzentrisch erzeugt sogar mehr Kraft als konzentrisch und verursacht mehr Muskelkater."}
    ]
  }),
  makeDetailedPlant({
    id: "innervation_skelettmuskulatur",
    title: "Innervation der Skelettmuskulatur",
    phase1: {
      soil: { statement: "Skelettmuskeln werden über motorische Nervenfasern innerviert.", answer: true, solution: "Die nervale Ansteuerung über motorische Nervenfasern ist Voraussetzung für willkürliche Skelettmuskelkontraktion. An der motorischen Endplatte (neuromuskuläre Synapse) wird der Neurotransmitter Acetylcholin (ACh) freigesetzt, der an nikotinische ACh-Rezeptoren auf der Muskelfaser bindet und so ein Aktionspotential auslöst." },
      seed: { statement: "Ohne neuromuskuläre Übertragung kann ein Skelettmuskel normal kontrahieren.", answer: false, solution: "Ohne intakte neuromuskuläre Übertragung ist keine Skelettmuskelkontraktion möglich. Das ausgeschüttete Acetylcholin löst ein Aktionspotential aus, das über T-Tubuli tief in die Muskelfaser geleitet wird und dort die Kalziumfreisetzung aus dem Sarkoplasmatischen Retikulum auslöst. Kalzium bindet dann an Troponin C, was den Querbrückenzyklus zwischen Aktin und Myosin startet." },
      water: { statement: "Motorische Einheit bedeutet: ein Motoneuron und alle von ihm versorgten Muskelfasern.", answer: true, solution: "Die motorische Einheit ist die kleinste Steuerungseinheit des Muskels: Ein Motoneuron versorgt wenige Fasern (Feinmotorik, z.B. Augenmuskel ca. 3–5 Fasern) bis tausende (Grobmotorik, z.B. M. gastrocnemius bis 2000 Fasern). Das Innervationsverhältnis – Anzahl der Muskelfasern pro Motoneuron – bestimmt direkt, wie präzise ein Muskel dosiert werden kann." }
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
      ], explanation: "Die T-Tubuli (Einstülpungen des Sarkolemms) leiten das Aktionspotential tief in die Muskelfaser bis zu den Myofibrillen. An den Triaden (T-Tubulus + zwei SR-Terminals) löst das AP die Ca2+-Freisetzung aus dem Sarkoplasmatischen Retikulum (SR) aus. Ca2+ bindet an Troponin C → Tropomyosin verschiebt sich → Aktinbindungsstellen frei → Querbrückenzyklus startet." },
      { id: "mu_in_h4", type: "true_false", statement: "Acetylcholin bindet an nikotinische Acetylcholinrezeptoren an der motorischen Endplatte.", answer: true, explanation: "An der neuromuskulären Synapse wird ACh ausgeschüttet und bindet an nikotinische Rezeptoren (ionotrop). Dies unterscheidet sich von muskarinischen Rezeptoren des autonomen Nervensystems. Die Folge ist ein Endplattenpotential, das ein Aktionspotential auslöst." },
      { id: "mu_in_h5", type: "mc", question: "Was bestimmt die Kraftdosierung der Skelettmuskulatur beim Nervensystem?", options: [
        { text: "Rekrutierung (Anzahl aktiver motorischer Einheiten) und Feuerrate (Impulsfrequenz)", correct: true },
        { text: "Ausschliesslich die Menge des freigesetzten Acetylcholins", correct: false },
        { text: "Die Dicke des Myelins um die Motoneuronen", correct: false },
        { text: "Ausschliesslich die Anzahl der Ranvierschen Schnürringe", correct: false }
      ], explanation: "Zwei Mechanismen der Kraftdosierung: 1) Rekrutierung = mehr motorische Einheiten aktivieren. 2) Frequenzierung (Feuerrate) = höhere Impulsfrequenz → Tetanus → mehr Kraft pro Einheit. Beide Mechanismen arbeiten zusammen." },
      { id: "mu_in_h6", type: "true_false", statement: "Ein kleines Innervationsverhältnis (wenige Muskelfasern pro Motoneuron) ermöglicht feinmotorische Präzision.", answer: true, explanation: "Augenmuskel: ca. 3–5 Fasern/Motoneuron → maximale Präzision. M. gastrocnemius: bis 2000 Fasern/Motoneuron → viel Kraft, wenig Feingefühl. Je kleiner die motorische Einheit, desto feiner die Kraftabstufung." }
    ],
    phase4Questions: [
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
      ]},
      { id: "mu_in_mc3", type: "mc", question: "Welche Aussagen zur neuromuskulären Innervation sind korrekt?", options: [
        { text: "ACh bindet an nikotinische Rezeptoren an der motorischen Endplatte", correct: true },
        { text: "T-Tubuli leiten das AP ins Innere der Muskelfaser und lösen Ca2+-Freisetzung aus dem SR aus", correct: true },
        { text: "Jede Muskelfaser wird von mehreren Motoneuronen gleichzeitig versorgt", correct: false },
        { text: "Die Kraftdosierung erfolgt ausschliesslich durch Veränderung der ACh-Konzentration", correct: false }
      ], explanation: "ACh: nikotinische Rezeptoren. T-Tubuli: AP-Leitung → Ca2+-Freisetzung aus SR → Troponin C. Jede Muskelfaser wird nur von einem Motoneuron innerviert. Kraftdosierung: Rekrutierung + Feuerrate, nicht nur ACh-Menge."}
    ]
  }),
  makeDetailedPlant({
    id: "ernährungsphysiologie",
    title: "Ernährungsphysiologie",
    phase1: {
      soil: { statement: "Muskelarbeit benötigt kontinuierliche Energiebereitstellung aus verschiedenen Stoffwechselwegen.", answer: true, solution: "ATP ist die direkte Energiequelle der Muskelkontraktion. Bei kurzer, maximaler Belastung (z.B. Sprint) liefert das Kreatinphosphatsystem sofort ATP für ca. 6–10 Sekunden, ohne Laktat zu erzeugen (anaerob-alaktazid). Bei intensiver Belastung über mehrere Minuten übernimmt die anaerobe Glykolyse, bei der als Nebenprodukt Laktat entsteht." },
      seed: { statement: "Die Energieversorgung der Muskulatur ist unabhängig von Sauerstoffverfügbarkeit.", answer: false, solution: "Die Energiebereitstellung ist stark sauerstoffabhängig. Aerobe Prozesse (Fettsäureoxidation, Zitratzyklus) liefern bei langen, moderaten Belastungen über 30 Minuten hinaus die meiste Energie – Fettsäuren liefern mehr ATP pro Mol als Glukose, aber langsamer. Der Laktat-Schwellenwert beschreibt die Belastungsintensität, bei der die Laktatproduktion die -elimination übersteigt und der Laktatgehalt im Blut exponentiell ansteigt." },
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
      ], explanation: "Anaerobe Schwelle: Unterhalb → Laktat wird produziert und abgebaut (Gleichgewicht). Oberhalb → Laktat steigt exponentiell an (pH sinkt, Enzymhemmung, Ermüdung). Trainierte Ausdauersportler haben eine höhere Schwelle, weil ihre Muskeln mehr Typ-I-Fasern (aerob) und mehr Mitochondrien haben. Klinische Relevanz: Laktatmessung bei Belastungstests." },
      { id: "mu_er_h4", type: "true_false", statement: "Bei langen aeroben Belastungen (>30 min) liefern Fettsäuren (Betaoxidation) mehr ATP pro Mol als Glukose.", answer: true, explanation: "Palmitinsäure liefert ca. 129 ATP, Glukose ca. 38 ATP pro Mol. Fettsäuren sind die effizientere Langzeitenergiequelle, aber langsamer verfügbar und O2-aufwändiger." },
      { id: "mu_er_h5", type: "mc", question: "Welches Energiesystem dominiert bei einem 100-m-Sprint (maximale Intensität, <10 s)?", options: [
        { text: "Anaerob-alaktazides System (Kreatinphosphat)", correct: true },
        { text: "Anaerob-laktazides System (Milchsäureglykolyse)", correct: false },
        { text: "Aerobe Fettverbrennung (Betaoxidation)", correct: false },
        { text: "Aerobe Kohlenhydratverbrennung (Krebszyklus)", correct: false }
      ], explanation: "Sprint <10 s: Kreatinphosphat liefert sofort ATP ohne O2 und ohne Laktatproduktion. Anaerob-laktazid (Glykolyse) dominiert bei 30 s–2 min, aerobes System bei >2–3 min." },
      { id: "mu_er_h6", type: "mc", question: "Warum führt Laktatanstieg oberhalb der anaeroben Schwelle zur Muskelermüdung?", options: [
        { text: "pH-Abfall hemmt glykolytische Enzyme und stört die Myosin-Aktin-Interaktion", correct: true },
        { text: "Laktat verbraucht das gesamte verfügbare ATP", correct: false },
        { text: "Laktat verhindert die Ca2+-Freisetzung aus dem SR vollständig", correct: false },
        { text: "Laktat blockiert die Motorendplatte", correct: false }
      ], explanation: "Laktatanstieg → pH sinkt → Enzymhemmung (Phosphofructokinase, Myosin-ATPase) → reduzierte Kraftentwicklung. Zudem führt Kreatinphosphat-Erschöpfung zum Energiemangel. Laktat selbst kann von Herz und anderen Muskeln als Substrat genutzt werden." }
    ],
    phase4Questions: [
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
      ]},
      { id: "mu_er_mc3", type: "mc", question: "Welche Aussagen zur Muskelenergetik sind korrekt?", options: [
        { text: "Kreatinphosphat liefert Energie für ca. 6–10 Sekunden maximaler Intensität", correct: true },
        { text: "Fettsäuren dominieren bei langen aeroben Belastungen (>30 min)", correct: true },
        { text: "Laktat entsteht ausschliesslich bei Muskelkrankheiten", correct: false },
        { text: "ATP wird direkt aus Glukose durch passive Diffusion gewonnen", correct: false }
      ], explanation: "Kreatinphosphat: 6-10 s. Fettsäuren (Betaoxidation): >30 min. Laktat entsteht physiologisch bei jeder anaeroben Belastung. ATP wird aktiv durch enzymatische Prozesse (Glykolyse, Krebszyklus, Atmungskette) synthetisiert."}
    ]
  }),
  makeDetailedPlant({
    id: "muskelarten",
    title: "Muskelarten",
    phase1: {
      soil: { statement: "Unterschieden werden Skelett-, Herz- und glatte Muskulatur mit jeweils eigenen Eigenschaften.", answer: true, solution: "Die drei Muskeltypen unterscheiden sich in Histologie, Steuerung und Vorkommen: Skelettmuskulatur (quergestreift, willkürlich, Bewegungsapparat), glatte Muskulatur (keine Streifung, unwillkürlich, Hohlorgane) und Herzmuskulatur (quergestreift, unwillkürlich, nur das Herz)." },
      seed: { statement: "Herzmuskulatur gehört funktionell zur glatten Muskulatur.", answer: false, solution: "Herzmuskulatur ist histologisch quergestreift (wie Skelettmuskulatur), aber unwillkürlich gesteuert (wie glatte Muskulatur). Ihr wichtigstes Alleinstellungsmerkmal ist der Automatismus: Spezialisierte Herzmuskelzellen im Sinusknoten und AV-Knoten generieren autonom Aktionspotentiale ohne externe Nerveninnervation. Glatte Muskulatur kontrahiert langsamer als Skelettmuskel, weil die Myosin-Leichtketten-Kinase (MLCK) statt des Troponin-Systems als Regulationsmechanismus dient. Skelettmuskelfasern sind vielkernige Synzytien, weil sie embryonal durch Fusion vieler Myoblasten entstehen, während Herzmuskelzellen echte Einzelzellen mit einem zentralen Kern sind." },
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
      ], explanation: "Skelettmuskelfasern entstehen durch Fusion vieler Myoblasten → mehrkernige Synzytien (Faserlänge bis 30 cm, hunderte Kerne randständig unter dem Sarkolemm). Herzmuskelzellen sind Einzelzellen (ca. 100 µm), verbunden durch Disci intercalares. Dieser Unterschied in der Zellentwicklung erklärt auch die unterschiedliche Regenerationsfähigkeit: Skelettmuskel kann repariert werden (aus Satellitenzellen), Herzmuskel kaum." },
      { id: "mu_art_h4", type: "true_false", statement: "Der Herzmuskel besitzt eine automatische Erregungsbildung (Automatie) durch den Sinusknoten.", answer: true, explanation: "Der Sinusknoten im rechten Vorhof generiert spontan elektrische Impulse. Diese Automatie macht den Herzmuskel unwillkürlich und vom autonomen Nervensystem nur modulierbar, nicht steuerbar." },
      { id: "mu_art_h5", type: "mc", question: "Was ist ein Disci intercalares (Glanzstreifen) beim Herzmuskel?", options: [
        { text: "Spezielle Zell-Zell-Verbindungen (Gap junctions + Desmosomen) zwischen Herzmuskelzellen für elektrische Kopplung und mechanischen Zusammenhalt", correct: true },
        { text: "Eine Schicht glatten Muskels um den Herzmuskel herum", correct: false },
        { text: "Die Verbindung von Herzmuskel an das Skelett (Sternum)", correct: false },
        { text: "Strukturen zur Regulation der Herzfrequenz im Sinusknoten", correct: false }
      ], explanation: "Disci intercalares verbinden benachbarte Herzmuskelzellen: Gap junctions (Nexus) ermöglichen die direkte elektrische Erregungsweiterleitung, Desmosomen sorgen für mechanischen Zusammenhalt bei der Kontraktion." },
      { id: "mu_art_h6", type: "mc", question: "Glatte Muskulatur unterscheidet sich von Skelettmuskulatur hauptsächlich durch:", options: [
        { text: "Fehlende Querstreifung, unwillkürliche Steuerung und MLCK-Regulation statt Troponinsystem", correct: true },
        { text: "Fehlende Myosinfilamente und keine Sarkomerstruktur", correct: false },
        { text: "Ausschliessliche Vorkommen im Herzen", correct: false },
        { text: "Mehrkernigkeit und randständige Kerne", correct: false }
      ], explanation: "Glatte Muskulatur: keine Querstreifung (Filamente nicht parallel angeordnet), unwillkürlich, Regulation via MLCK (Myosin-Leichtketten-Kinase) statt Troponin. Vorkommen: Hohlorgane (Darm, Blutgefässe, Blase)." }
    ],
    phase4Questions: [
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
      ]},
      { id: "mu_art_mc3", type: "mc", question: "Welche Aussagen zum Herzmuskel sind korrekt?", options: [
        { text: "Herzmuskelzellen sind quergestreift und unwillkürlich gesteuert", correct: true },
        { text: "Disci intercalares ermöglichen elektrische Kopplung benachbarter Herzmuskelzellen", correct: true },
        { text: "Der Herzmuskel hat kein automatisches Erregungsbildungssystem", correct: false },
        { text: "Herzmuskelzellen sind mehrkernige Synzytien wie Skelettmuskelfasern", correct: false }
      ], explanation: "Herzmuskel: quergestreift, unwillkürlich, Automatie durch Sinusknoten. Disci intercalares: Gap junctions + Desmosomen. Herzmuskelzellen sind Einzelzellen mit einem Kern – keine Synzytien."}
    ]
  }),
  makeDetailedPlant({
    id: "bewegungsmöglichkeiten",
    title: "Bewegungsmöglichkeiten",
    phase1: {
      soil: { statement: "Muskeln erzeugen Bewegungen entlang anatomischer Achsen und Ebenen.", answer: true, solution: "Muskeln erzeugen Bewegungen in anatomisch definierten Achsen und Ebenen: Flexion/Extension verlaufen in der Sagittalebene, Abduktion/Adduktion in der Frontalebene und Rotation um die Längsachse des Körpers. Diese Systematik erlaubt die präzise Beschreibung jeder Muskelbewegung." },
      seed: { statement: "Flexion und Extension beschreiben dieselbe Bewegungsrichtung.", answer: false, solution: "Flexion und Extension sind entgegengesetzte Bewegungen: Flexion verringert den Gelenkwinkel (Beugung, z.B. Ellenbogen anwinkeln), Extension vergrossert ihn (Streckung, z.B. Arm ausstrecken). Beide verlaufen in der Sagittalebene um eine Transversalachse." },
      water: { statement: "Muskelwirkung wird funktionell über Ursprung, Ansatz und Zugrichtung erklärt.", answer: true, solution: "Ursprung (meist am weniger beweglichen Knochen) und Ansatz (am beweglichen Knochen) bestimmen die Zugrichtung des Muskels. Neben Flexion/Extension und Abduktion/Adduktion gibt es weitere spezifische Bewegungsbezeichnungen: Supination (Auswärtsdrehung des Unterarms, Handfläche nach oben) und Pronation (Einwärtsdrehung, Handfläche nach unten) erfolgen im Radioulnargelenk. Am Fuss bezeichnet Dorsalextension das Anheben des Fusses Richtung Schienbein, Plantarflexion das Drücken nach unten. Zirkumduktion ist eine kreisförmige Bewegung, die durch Kombination von Flexion, Abduktion, Extension und Adduktion entsteht und nur bei Gelenken mit mindestens zwei Achsen (Kugelgelenke, Sattelgelenke) möglich ist." }
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
      ], explanation: "Zirkumduktion = kegelförmige Kreisbewegung eines Gliedmassensegments: entsteht durch sequenzielle Kombination Flexion → Abduktion → Extension → Adduktion. Voraussetzung: mindestens 2 Bewegungsachsen = Kugelgelenk (Schulter, Hüft) oder Sattelgelenk (Daumensattelgelenk). Im Scharniergelenk (Knie) ist Zirkumduktion nicht möglich." },
      { id: "mu_bew_h4", type: "true_false", statement: "Abduktion und Adduktion verlaufen in der Frontalebene.", answer: true, explanation: "Abduktion (von der Körpermitte weg) und Adduktion (zur Körpermitte hin) finden in der Frontalebene um eine sagittale Achse statt. Flexion/Extension dagegen verlaufen in der Sagittalebene." },
      { id: "mu_bew_h5", type: "mc", question: "Welche Bewegung vergrössert den Gelenkwinkel?", options: [
        { text: "Extension (Streckung)", correct: true },
        { text: "Flexion (Beugung)", correct: false },
        { text: "Adduktion", correct: false },
        { text: "Pronation", correct: false }
      ], explanation: "Extension = Streckung = Vergrösserung des Gelenkwinkels. Flexion = Beugung = Verkleinerung des Gelenkwinkels. Beide Bewegungen verlaufen in der Sagittalebene." },
      { id: "mu_bew_h6", type: "mc", question: "Welche Muskeln führen Pronation des Unterarms aus?", options: [
        { text: "M. pronator teres und M. pronator quadratus", correct: true },
        { text: "M. supinator und M. biceps brachii", correct: false },
        { text: "M. brachioradialis und M. triceps", correct: false },
        { text: "Mm. interossei dorsales", correct: false }
      ], explanation: "Pronation (Handteller nach unten) wird durch M. pronator teres und M. pronator quadratus ausgeführt. Supination (Handteller nach oben) durch M. supinator und M. biceps brachii." }
    ],
    phase4Questions: [
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
      ]},
      { id: "mu_bew_mc3", type: "mc", question: "Welche Aussagen zu Bewegungsarten sind korrekt?", options: [
        { text: "Supination dreht den Unterarm so, dass die Handfläche nach oben zeigt", correct: true },
        { text: "Zirkumduktion erfordert mindestens ein Zweiachsengelenk (z.B. Kugelgelenk)", correct: true },
        { text: "Flexion vergrössert den Gelenkwinkel", correct: false },
        { text: "Dorsalextension des Fusses drückt den Fuss nach unten (Zehenspitzenstand)", correct: false }
      ], explanation: "Supination = Handfläche nach oben (Gegenteil: Pronation). Zirkumduktion: nur bei 2+ Achsen (Kugel-, Sattelgelenk). Flexion = Verkleinerung des Winkels. Dorsalextension = Fuss hebt hoch, Plantarflexion = Fuss nach unten."}
    ]
  }),
  makeDetailedPlant({
    id: "kopfmuskulatur",
    title: "Muskulatur des Kopfes",
    phase1: {
      soil: { statement: "Zur Kopfmuskulatur gehören unter anderem mimische Muskulatur und Kaumuskulatur.", answer: true, solution: "Kopfmuskulatur umfasst zwei funktionell verschiedene Gruppen: Die mimische Muskulatur (innerviert durch N. facialis, VII) bewegt Gesichtshaut für Ausdruck und Kommunikation, die Kaumuskulatur (innerviert durch N. trigeminus, V) erzeugt die Kraft für Kieferbewegungen und Nahrungszerkleinerung." },
      seed: { statement: "Mimische Muskulatur hat keinen Bezug zu alltagsrelevanten Funktionen.", answer: false, solution: "Mimische Muskulatur ist für Gesichtsausdruck, Kommunikation und verschiedene Alltagsfunktionen unverzichtbar. Strukturell unterscheidet sie sich von anderen Skelettmuskeln: Sie inseriert nicht Knochen-zu-Knochen, sondern in die Gesichtshaut, wodurch sie diese direkt bewegen kann. Alle mimischen Muskeln werden durch den Nervus facialis (VII) innerviert – eine Läsion (Fazialisparese) führt zu ipsilateralem Ausfall von Lidschluss, Stirnrunzeln und Mundwinkelkontrolle. Die vier Kaumuskeln – M. masseter, M. temporalis, M. pterygoideus medialis und M. pterygoideus lateralis – werden dagegen alle vom Nervus trigeminus (V3) innerviert; der M. masseter gilt als stärkster Kaumuskel relativ zu seiner Grösse." },
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
      ], explanation: "Der N. facialis (VII) innerviert die gesamte mimische Muskulatur inkl. M. frontalis (Stirnrunzeln). Periphere Fazialisparese: komplett ipsilaterale Lahmung (Stirn, Auge, Mund). Zentrale Fazialisparese (z.B. Schlaganfall): nur untere Gesichtshälfte betroffen, Stirn gespart (bilaterale kortikale Versorgung des M. frontalis). Diese Unterscheidung ist klinisch entscheidend für die Lokalisation der Schädigung." },
      { id: "mu_kopf_h4", type: "true_false", statement: "Eine periphere Fazialisparese führt zur vollständigen Lähmung der ipsilateralen Gesichtshälfte einschliesslich der Stirn.", answer: true, explanation: "Bei peripherer Fazialisläsion (z.B. Bell-Parese) sind alle mimischen Muskeln einer Seite betroffen – Stirnrunzeln, Lidschluss und Mundwinkel. Dies unterscheidet sie von der zentralen Parese, bei der die Stirn gespart bleibt." },
      { id: "mu_kopf_h5", type: "mc", question: "Welche Funktion übernimmt der M. pterygoideus lateralis primär?", options: [
        { text: "Mundöffnung (Unterkieferdepression) und Mahlbewegungen des Unterkiefers", correct: true },
        { text: "Kieferschluss (Elevation des Unterkiefers)", correct: false },
        { text: "Retraktion des Unterkiefers", correct: false },
        { text: "Protraktion der Lippen", correct: false }
      ], explanation: "M. pterygoideus lateralis öffnet den Mund und ermöglicht die Mahlbewegung. Kieferschluss leisten M. masseter, M. temporalis und M. pterygoideus medialis." },
      { id: "mu_kopf_h6", type: "true_false", statement: "Die mimische Muskulatur wird wie die Kaumuskulatur durch den N. trigeminus (V) innerviert.", answer: false, explanation: "Mimische Muskulatur = N. facialis (VII). Kaumuskulatur = N. trigeminus, Pars mandibularis (V3). Diese Trennung ist klinisch wichtig: Trigeminusneuralgie betrifft Kauschmerz, Fazialisparese betrifft mimische Funktion." }
    ],
    phase4Questions: [
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
      ]},
      { id: "mu_kopf_mc3", type: "mc", question: "Welche Aussagen zu Kopfmuskeln und ihrer Innervation sind korrekt?", options: [
        { text: "Mimische Muskulatur wird durch N. facialis (VII) innerviert", correct: true },
        { text: "Bei peripherer Fazialisparese ist die Stirn auf der betroffenen Seite mitgelähmt", correct: true },
        { text: "Kaumuskulatur wird durch N. facialis (VII) innerviert", correct: false },
        { text: "M. buccinator zählt zur Kaumuskulatur", correct: false }
      ], explanation: "Mimische Muskeln: N. facialis VII. Kaumuskeln (masseter, temporalis, pterygoidei): N. trigeminus V3. M. buccinator ist mimisch, nicht Kaumuskel. Periphere Fazialisparese: Stirn ipsilateral betroffen."}
    ]
  }),
  makeDetailedPlant({
    id: "rumpfmuskulatur",
    title: "Hals-, Thorax-, Bauch- und Rückenmuskulatur",
    phase1: {
      soil: { statement: "Die Rumpfmuskulatur stabilisiert den Körper und unterstützt Haltung sowie Atmung.", answer: true, solution: "Die autochthone Rückenmuskulatur sichert als tiefliegende Schicht die Wirbelsegmente segmental; oberflächennahe Schichten führen Rumpfbewegungen aus. Bauchmuskeln erhöhen den intraabdominellen Druck und unterstützen die Ausatmung. Thoraxmuskeln integrieren Haltungs- und Atemfunktion in einem System." },
      seed: { statement: "Rücken- und Bauchmuskulatur wirken niemals als funktionelle Gegenspieler.", answer: false, solution: "Rücken- und Bauchmuskeln sind klassische Antagonisten: Rückenmuskeln strecken (Extension) und stabilisieren die Wirbelsäule, Bauchmuskeln beugen den Rumpf (Flexion). Die Bauchmuskeln gliedern sich in mehrere Schichten mit unterschiedlichen Funktionen: Der M. rectus abdominis beugt den Rumpf, der M. transversus abdominis (tiefste Schicht) erzeugt durch Kompression des Bauchraums einen stabilisierenden Druck auf die Lendenwirbelsäule ohne Beugeeffekt. Rumpfrotation entsteht durch ein diagonales Muskelpaar: M. obliquus externus abdominis einer Seite und M. obliquus internus der Gegenseite kontrahieren gemeinsam und rotieren den Rumpf zur Gegenseite des externus." },
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
      ], explanation: "Rumpfrotation: M. obliquus externus abdominis einer Seite + M. obliquus internus der GEGENSEITE kontrahieren gemeinsam → Rotation zur Gegenseite des externus (oder zur gleichen Seite des internus). Beispiel: Drehung nach rechts = rechts externus + links internus. Diese diagonale Muskelpaare erklären, warum Rumpfrotation eine koordinierte bilaterale Muskelaktivität ist." },
      { id: "mu_rumpf_h4", type: "true_false", statement: "Die autochthone Rückenmuskulatur liegt tief, ist segmental angeordnet und wird durch dorsale Äste der Spinalnerven innerviert.", answer: true, explanation: "Autochthone (= eigenständige, aus Myotomen stammende) Rückenmuskulatur: tiefer Teil (M. multifidus, Mm. rotatores) stabilisiert segmental einzelne Wirbelgelenke; oberflächlicher Teil (M. erector spinae, M. longissimus) richtet die Wirbelsäule auf. Innervation durch dorsale Rami der Spinalnerven. Klinisch wichtig bei Rückenschmerz." },
      { id: "mu_rumpf_h5", type: "mc", question: "Welche Wirkung hat M. intercostalis internus bei forcierter Exspiration?", options: [
        { text: "Exspiratorisch: Senkt die Rippen und verkleinert den Thoraxquerschnitt", correct: true },
        { text: "Inspiratorisch: Hebt die Rippen und erweitert den Thorax", correct: false },
        { text: "Keine Atemfunktion – nur Stabilisierung der Rippenzwischenräume", correct: false },
        { text: "Gleichsinnig wie M. intercostalis externus bei der Inspiration", correct: false }
      ], explanation: "Mm. intercostales interni verlaufen von anterior-superior nach posterior-inferior – entgegengesetzt zu den externi. Bei Kontraktion ziehen sie die Rippen nach unten → exspiratorisch. Sie werden bei forcierter Exspiration (Sport, Husten) aktiviert. Merke: externi = Einatmen, interni = Ausatmen." },
      { id: "mu_rumpf_h6", type: "mc", question: "Was ist die primäre Funktion der Bauchmuskeln im Alltag?", options: [
        { text: "Rumpfstabilisierung, Bauchpresse (Erhöhung intraabdominalen Drucks) und Rumpfbeugung/-rotation", correct: true },
        { text: "Ausschliesslich Atemfunktion (inspiratorisch)", correct: false },
        { text: "Stabilisierung des Hüftgelenks ohne Rumpfwirkung", correct: false },
        { text: "Streckung der Wirbelsäule wie autochthone Rückenmuskulatur", correct: false }
      ], explanation: "Bauchmuskeln (rectus, obliquus ext./int., transversus): Hauptfunktionen sind Rumpfbeugung (rectus), Rotation (obliqui), Seitneigung und intraabdominaler Druck (transversus = Bauchpresse). Bauchpresse wichtig bei Miktion, Defäkation, Geburt, Husten, Niesen." }
    ],
    phase4Questions: [
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
      ]},
      { id: "mu_rumpf_mc3", type: "mc", question: "Welche Aussagen zur Rumpfmuskulatur sind korrekt?", options: [
        { text: "Die autochthone Rückenmuskulatur wird durch dorsale Äste der Spinalnerven innerviert", correct: true },
        { text: "Mm. intercostales interni unterstützen die forcierte Exspiration", correct: true },
        { text: "Die Bauchmuskeln haben ausschliesslich exspiratorische Funktionen", correct: false },
        { text: "Zwerchfell und M. erector spinae sind funktionell identisch", correct: false }
      ], explanation: "Autochthone Rückenmuskulatur: dorsale Spinalnervenäste. Mm. intercostales interni: forcierte Exspiration. Bauchmuskeln: auch Bauchdruckerhöhung, Flexion, Lateralflexion."}
    ]
  }),
  makeDetailedPlant({
    id: "extremitätenmuskulatur",
    title: "Schulter-, Arm-, Hüft- und Beinmuskulatur",
    phase1: {
      soil: { statement: "Die Extremitätenmuskulatur wird topographisch und funktionell nach Regionen gegliedert.", answer: true, solution: "Die obere Extremität wird in Schulter-, Ober- und Unterarmmuskulatur unterteilt; die untere in Hüft-, Oberschenkel- und Unterschenkelmuskulatur. An der Schulter sichert die Rotatorenmanschette – bestehend aus M. supraspinatus, M. infraspinatus, M. teres minor und M. subscapularis – den Humeruskopf in der flachen Glenoidpfanne. Der M. gluteus maximus ist für Hüftextension und Aussenrotation zuständig und damit der wichtigste Muskel beim Aufstehen, Treppensteigen und Laufen." },
      seed: { statement: "Muskeln der unteren Extremität dienen ausschliesslich der Feinkoordination, nicht der Lastaufnahme.", answer: false, solution: "Die untere Extremität trägt das Körpergewicht und ermöglicht Fortbewegung. Grosser Gluteus, Oberschenkelstrecker (M. quadriceps) und Wadenmuskulatur entwickeln dabei erhebliche Kräfte für Stand, Gehen, Laufen und Treppensteigen – das Gegenteil von Feinkoordination." },
      water: { statement: "Auch in den Extremitäten gilt das Prinzip aus Ursprung, Ansatz und Bewegungswirkung.", answer: true, solution: "Jeder Extremitätenmuskel lässt sich funktionell erschliessen über: Ursprung (proximaler Knochen), Ansatz (distaler Knochen), überspielte Gelenke und Zugrichtung. Der M. biceps brachii hat seinen Ursprung am Schulterblatt und seinen Ansatz an der Tuberositas radii; er wird vom N. musculocutaneus (C5–C6) innerviert und führt sowohl Ellbogenflexion als auch Unterarmsupination aus. Der stärkste Kniestrecker ist der M. quadriceps femoris." }
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
      ], explanation: "M. biceps brachii: Ursprung am Schulterblatt (Caput longum: Tuberculum supraglenoidale; Caput breve: Processus coracoideus), Ansatz an Tuberositas radii. Funktion: Ellenbogenflexion (Hauptfunktion) + Unterarmsupination (weil Ansatz an Radius: dreht den Radius nach aussen). Innervation: N. musculocutaneus (C5-C6). N. radialis: Triceps (Extension). N. medianus: Flexoren volar." },
      { id: "mu_ext_h4", type: "true_false", statement: "Der M. quadriceps femoris ist der stärkste Kniestrecker und setzt über das Lig. patellae an der Tuberositas tibiae an.", answer: true, explanation: "M. quadriceps femoris besteht aus 4 Köpfen (rectus femoris, vastus lateralis/medialis/intermedius) und ist der stärkste Kniestrecker. Innervation: N. femoralis. Der M. rectus femoris überspannt auch das Hüftgelenk (Hüftflexion). Klinisch: Atrophie nach Knieproblemen tastbar an der medialen Patellafacette (Vastus medialis obliquus)." },
      { id: "mu_ext_h5", type: "mc", question: "Warum führt M. biceps brachii neben der Ellenbogenflexion auch die Supination aus?", options: [
        { text: "Weil er an der Tuberositas radii ansetzt und die Kontraktion den Radius nach aussen dreht", correct: true },
        { text: "Weil er an der Ulna ansetzt und dadurch beide Knochen beeinflusst", correct: false },
        { text: "Weil er durch das Radioulnargelenk verläuft und dieses mechanisch dreht", correct: false },
        { text: "Weil er am Humerus entspringt und daher auf beide Unterarmknochen wirkt", correct: false }
      ], explanation: "Funktionelle Anatomie: M. biceps setzt an der Tuberositas radii an. Bei Kontraktion zieht er den Radius zu sich – da der Radius um die Ulna rotiert, führt dies zur Supination (Handfläche nach oben). Diese Doppelfunktion macht den M. biceps zum wichtigsten Supinator bei gebeugtem Ellenbogen." },
      { id: "mu_ext_h6", type: "mc", question: "Welcher Nerv innerviert den M. gluteus maximus?", options: [
        { text: "N. gluteus inferior", correct: true },
        { text: "N. gluteus superior", correct: false },
        { text: "N. ischiadicus", correct: false },
        { text: "N. femoralis", correct: false }
      ], explanation: "N. gluteus inferior (L5-S2) innerviert M. gluteus maximus. N. gluteus superior innerviert M. gluteus medius und minimus sowie M. tensor fasciae latae. Bei Läsion des N. gluteus superior: Trendelenburg-Hinken (Becken kippt zur Gegenseite beim Einbeinstand, weil Abduktoren fehlen)." }
    ],
    phase4Questions: [
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
      ]},
      { id: "mu_ext_mc3", type: "mc", question: "Welche Aussagen zur Extremitätenmuskulatur sind korrekt?", options: [
        { text: "Rotatorenmanschette (SITS) stabilisiert den Humeruskopf in der Glenoidpfanne", correct: true },
        { text: "M. biceps brachii führt Ellenbogenflexion und Supination aus (N. musculocutaneus)", correct: true },
        { text: "M. gluteus maximus ist der Hauptabduktor der Hüfte", correct: false },
        { text: "M. quadriceps femoris ist der stärkste Kniebeuger", correct: false }
      ], explanation: "M. gluteus maximus = Extension + Aussenrotation (kein Abduktor; das ist gluteus medius/minimus). M. quadriceps = Kniestrecker (kein Beuger). SITS stabilisieren Schulter. Biceps: N. musculocutaneus, C5-C6, Ansatz Tuberositas radii → Flexion + Supination." }
    ]
  })
];

const ATMUNGSSYSTEM_1035_PLANTS = [
  makeDetailedPlant({
    id: "atmungssystem_überblick",
    title: "Atmungssystem: Überblick",
    contextHint: "Studienbrief 1035 Strukturen und Funktion des Atmungssystems",
    phase1: {
      soil: { statement: "Das Atmungssystem ist zuständig für die Sauerstoffzufuhr und den Abtransport gasförmiger Stoffwechselendprodukte wie Kohlendioxid.", answer: true, solution: "Das Atmungssystem hat die Hauptaufgabe, Sauerstoff (O2) aus der Atemluft ins Blut aufzunehmen und das Stoffwechselendprodukt Kohlendioxid (CO2) abzugeben. Neben dem Gasaustausch erfüllt es weitere Funktionen: Wärmung und Befeuchtung der Atemluft (Konditionierung), Filtration von Keimen und Staubpartikeln (Schutzfunktion) sowie Phonation (Stimmbildung durch die Stimmbänder im Kehlkopf)." },
      seed: { statement: "Zu den oberen Atemwegen gehört die Luftröhre (Trachea).", answer: false, solution: "Die Trachea gehört zu den unteren Atemwegen. Obere Atemwege sind Nase, Nasennebenhöhlen und Rachenraum. Die luftleitenden Atemwege von Nase bis Bronchiolen bilden den anatomischen Totraum (ca. 150 ml) – in diesem Bereich findet kein Gasaustausch statt. Bei einem normalen Atemzugvolumen von ca. 500 ml gelangen daher nur ca. 350 ml Frischluft tatsächlich in die Alveolen." },
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
      ], explanation: "Das Atmungssystem hat neben dem Gasaustausch weitere Funktionen: Konditionierung der Atemluft (Wärmung auf 37°C, Befeuchtung auf 100% rel. Feuchte, Filtration durch Nasenhaare/Schleimhaut), Schutzfunktion (mukoziliäre Clearance, Husten/Niesen-Reflex) und Phonation (Stimmbänder im Kehlkopf). Ausserdem ist die Lunge am Säure-Basen-Haushalt beteiligt (CO2-Abgabe)." },
      { id: "at_ü_h4", type: "true_false", statement: "Der anatomische Totraum beträgt ca. 150 ml und bezeichnet die luftleitenden Atemwege, in denen kein Gasaustausch stattfindet.", answer: true, explanation: "Anatomischer Totraum: Atemwege von Nase bis Bronchiolen (ca. 150 ml). Beim normalen Atemzug von ~500 ml gelangen nur ~350 ml Frischluft in die Alveolen. Bei flacher Atmung (z.B. nur 200 ml AZV) bleibt kaum Frischluft für den Alveolarbereich – Hypoventilation." },
      { id: "at_ü_h5", type: "mc", question: "Welches Organ und welche Struktur ist für die Stimmbildung (Phonation) verantwortlich?", options: [
        { text: "Kehlkopf (Larynx) mit seinen Stimmbändern (Plicae vocales)", correct: true },
        { text: "Trachea durch Vibration der Knorpelspangen", correct: false },
        { text: "Lunge durch Luftdruckschwankungen beim Ausatmen", correct: false },
        { text: "Mundhöhle allein durch Zungen- und Lippenbewegung", correct: false }
      ], explanation: "Phonation findet im Kehlkopf statt: Die Aryknorpel (Stellknorpel) nähern die echten Stimmbänder aneinander, Ausatemluft bringt sie zum Schwingen. Die erzeugte Grundschwingung wird in Rachen, Mund und Nasenhöhle als Resonanzraum geformt und zu Sprache moduliert." },
      { id: "at_ü_h6", type: "mc", question: "Was ist der Unterschied zwischen oberen und unteren Atemwegen?", options: [
        { text: "Obere: Nase, NNH, Rachen; untere: Kehlkopf, Trachea, Bronchien, Lunge", correct: true },
        { text: "Obere: Trachea und Kehlkopf; untere: Nase und Rachen", correct: false },
        { text: "Obere: Alveolen und Bronchiolen; untere: Rachen und Nase", correct: false },
        { text: "Keine Unterscheidung – alle Atemwege sind physiologisch gleichwertig", correct: false }
      ], explanation: "Obere Atemwege: Nase, Nasennebenhöhlen, Rachenraum (Pharynx). Untere Atemwege: Kehlkopf (Larynx), Luftröhre (Trachea), Bronchialbaum, Lunge. Diese Einteilung ist klinisch wichtig: Infektionen der oberen vs. unteren Atemwege haben unterschiedliche Erreger und Therapien." }
    ],
    phase4Questions: [
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
      ]},
      { id: "at_ü_mc3", type: "mc", question: "Welche Aussagen zum Überblick des Atmungssystems sind korrekt?", options: [
        { text: "300 Mio. Alveolen bieten 50–100 m² Austauschfläche für Gasaustausch", correct: true },
        { text: "Anatomischer Totraum (~150 ml) nimmt nicht am Gasaustausch teil", correct: true },
        { text: "Die Trachea gehört zu den oberen Atemwegen", correct: false },
        { text: "Phonation findet in der Lunge statt", correct: false }
      ], explanation: "Alveolen: ~300 Mio., Fläche 50–100 m², Membrandicke <0,5 µm. Totraum: ~150 ml (Nase bis Bronchiolen), kein Gasaustausch. Trachea = untere Atemwege. Phonation = Kehlkopf (Stimmbänder)." }
    ]
  }),
  makeDetailedPlant({
    id: "nase_und_nnh",
    title: "Nase und Nasennebenhöhlen",
    contextHint: "Studienbrief 1035 Strukturen und Funktion des Atmungssystems",
    phase1: {
      soil: { statement: "Die Nasennebenhöhllen sind paarig angeordnet und werden in vier Typen unterteilt.", answer: true, solution: "Die vier paarigen Nasennebenhöhllen – Stirnhöhle (Sinus frontalis), Keilbeinhöhlel (Sinus sphenoidalis), Siebbeinzellen (Cellulä ethmoidales) und Kieferhöhle (Sinus maxillaris) – sind mit der Nasenhöhlel verbunden. Sie dienen der Gewichtsverminderung des Schädels, als Resonanzräume und vergrössern die Schleimhautoberflähe." },
      seed: { statement: "Die Nase hat ausschliesslich eine luftleitende Funktion ohne Filterwirkung oder Befeuchtung.", answer: false, solution: "Die Nase übernimmt mehrere wichtige Aufgaben: Sie filtert, wärmt und befeuchtet die Atemluft und dient über das Riechepithel der Geruchswahrnehmung. Drei Nasenmuscheln (Concha nasalis inferior, media und superior) unterteilen jede Nasenhöhlhälfte in vier Gänge – nicht zwei. Die inneren Öffnungen der Nasenhöhle in den Rachenraum werden als Choanae bezeichnet; angeborene Choanalatresien führen beim Neugeborenen zu Atemnot, da Neugeborene obligate Nasenatmer sind." },
      water: { statement: "Die Nase wärmt und befeuchtet die eingeatmete Luft und dient als Riechorgan.", answer: true, solution: "Die Nase bereitet die eingeatmete Luft für die Lunge auf: Sie wärmt sie auf Körpertemperatur, befeuchtet sie auf nahezu 100 % Luftfeuchtigkeit und filtert Staub und Keime durch Nasenhaare und Schleimhaut. Zusätzlich trägt die Nase über das Riechepithel zur Geruchswahrnehmung bei." }
    },
    harvestQuestions: [
      { id: "at_nnh_h1", type: "true_false", statement: "Es gibt vier Nasennebenhöhllen: Stirnhöhle, Keilbeinhöhlel, Siebbeinzellen und Kieferhöhlel.", answer: true, explanation: "Die vier paarigen Nasennebenhöhllen entstehen durch Ausbuchtungen der Nasenhöhlenschleimhaut in die umgebenden Schädelknochen: Stirnhöhlel, Keilbeinhöhlel, Siebbeinzellen und Kieferhöhlel. Alle münden in die Nasenhöhle und können sich bei Schleimhautschwellung entzuenden (Sinusitis)." },
      { id: "at_nnh_h2", type: "true_false", statement: "Die Nasenmuscheln (Conchä) unterteilen jede Nasenhöhlhälfte in zwei Gänge.", answer: false, explanation: "Drei Nasenmuscheln (Concha nasalis inferior, media, superior) teilen jede Nasenhöhlhälfte in vier Gänge: Unteren, mittleren, oberen und den gemeinsamen Nasengang. Nicht zwei, sondern vier Gänge entstehen durch die drei Muschelplatten." },
      { id: "at_nnh_h3", type: "true_false", statement: "Die inneren Öffnungen der Nase in den Rachenraum werden als Choanä bezeichnet.", answer: true, explanation: "Die Choanä sind die hinteren Öffnungen der Nasenhöhle in den Nasopharynx (Epipharynx). Im Gegensatz dazu sind die Nares die äusseren Nasenöfffnungen. Eine angeborene Choanalatresie führt beim Neugeborenen zu Atembehinderung, da Neugeborene obligate Nasenatmer sind." },
      { id: "at_nnh_h4", type: "true_false", statement: "Neugeborene sind auf Nasenatmung angewiesen (obligate Nasenatmer) und können nicht reflexartig durch den Mund atmen.", answer: true, explanation: "Neugeborene atmen obligat durch die Nase, weil Kehlkopf und Epiglottis beim Schlucken und Atmen koordiniert werden müssen. Eine angeborene Choanalatresie führt deshalb zu sofortiger Atembehinderung und muss als Notfall behandelt werden. Erst ab etwa 2–3 Monaten können Säuglinge durch den Mund atmen." },
      { id: "at_nnh_h5", type: "mc", question: "Welche Funktion haben die Nasenmuscheln (Conchae nasales)?", options: [
        { text: "Vergrösserung der Schleimhautoberfläche für bessere Filterung, Erwärmung und Befeuchtung", correct: true },
        { text: "Stützung der Nasenscheidewand", correct: false },
        { text: "Produktion von Nasensekret für die Verdauung", correct: false },
        { text: "Weiterleitung von Geruchsreizen ans Gehirn", correct: false }
      ], explanation: "Drei Nasenmuscheln (untere, mittlere, obere) unterteilen die Nasenhöhle in vier Gänge und vergrössern enorm die Schleimhautoberfläche. Diese grosse Oberfläche mit gut durchblutetem Schleimhautgewebe ermöglicht effektive Erwärmung, Befeuchtung und Filterung der Einatemluft." },
      { id: "at_nnh_h6", type: "mc", question: "Was passiert bei einer Sinusitis (Nasennebenhöhlenentzündung)?", options: [
        { text: "Entzündung der Schleimhaut in den Nasennebenhöhlen, die mit der Nasenhöhle verbunden sind", correct: true },
        { text: "Verschluss der Choanae durch Polypen", correct: false },
        { text: "Entzündung der Tonsillae (Mandeln) im Rachenraum", correct: false },
        { text: "Verengung der Trachea durch Schwellung", correct: false }
      ], explanation: "Alle vier Nasennebenhöhlen münden in die Nasenhöhle und ihre Schleimhäute sind kontinuierlich mit der Nasenschleimhaut. Bei Erkältung kann die Schleimhautschwellung die Öffnungen verlegen → Sekretstau → Sinusitis (Stirn-, Kiefer-, Siebbein- oder Keilbeinhöhle). Schmerzen typischerweise bei Druck und Bücken." }
    ],
    phase4Questions: [
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
      ]},
      { id: "at_nnh_mc3", type: "mc", question: "Welche Aussagen zur Nase und ihren Nebenhöhlen sind korrekt?", options: [
        { text: "3 Nasenmuscheln teilen die Nasenhöhle in 4 Gänge und vergrössern die Schleimhautfläche", correct: true },
        { text: "Choanalatresie beim Neugeborenen führt zu Atemnot (obligate Nasenatmer)", correct: true },
        { text: "Die Nasennebenhöhlen sind nicht mit der Nasenhöhle verbunden", correct: false },
        { text: "Nasenmuscheln stützen das Nasenskelett", correct: false }
      ], explanation: "Zusammenfassung: 4 NNH (Stirn, Keilbein, Siebbein, Kiefer), alle mit Nase verbunden → Sinusitis möglich. 3 Muscheln → 4 Gänge. Choanae = innere Öffnungen. Neugeborene = obligate Nasenatmer → Choanalatresie = Notfall." }
    ]
  }),
  makeDetailedPlant({
    id: "rachenraum",
    title: "Rachenraum",
    contextHint: "Studienbrief 1035 Strukturen und Funktion des Atmungssystems",
    phase1: {
      soil: { statement: "Der Rachen (Pharynx) wird in drei Abschnitte unterteilt: Epipharynx, Mesopharynx und Hypopharynx.", answer: true, solution: "Der Rachen gliedert sich in drei Etagen: Epipharynx (Nasenpharynx, hinter der Nase), Mesopharynx (Mundpharynx, hinter dem Mund als Kreuzungspunkt von Luft- und Speiseweg) und Hypopharynx (Kehlkopfpharynx, vor dem Kehlkopf). Jeder Abschnitt steht mit unterschiedlichen Strukturen in Verbindung." },
      seed: { statement: "Der Mesopharynx steht ausschliesslich mit der Nasenhöhlein Verbindung und hat keinen Bezug zur Mundhöhlele.", answer: false, solution: "Der Mesopharynx (Pars oralis) steht mit der Mundhöhle in Verbindung, der Epipharynx (Pars nasalis) mit der Nase über die Choanae. Der Epipharynx steht ausserdem seitlich über die Tuba auditiva (Eustachische Röhre) mit dem Mittelohr in Verbindung, weshalb Rachenentzündungen Mittelohrbeteiligungen verursachen können. Der Hypopharynx (Pars laryngea) ist die Kreuzungsstelle von Atemweg und Speiseweg: Anterior liegt der Kehlkopfeingang, posterior führt die Speiseröhre weiter, und die Epiglottis schützt beim Schlucken den Kehlkopfeingang vor Aspiration." },
      water: { statement: "Das lymphatische Gewebe im Bereich des Rachens bildet den sogenannten Waldeyer-Rachenring.", answer: true, solution: "Der Waldeyer-Rachenring ist eine ringförmige Anordnung von Lymphgewebe: Rachenmandel (Tonsilla pharyngea), Gaumenmandeln (Tonsillä palatinä) und Zungenmandel (Tonsilla lingualis). Dieses lymphatische Gewebe bildet eine erste Immunbarriere an der Eintrittspforte der Atemluft." }
    },
    harvestQuestions: [
      { id: "at_ra_h1", type: "true_false", statement: "Der Epipharynx (Pars nasalis) steht über die Choanä mit der Nase in Verbindung.", answer: true, explanation: "Der Epipharynx nimmt Luft aus den Choanä auf und steht seitlich mit der Tuba auditiva (Eustachische Röhre) in Verbindung, die zum Mittelohr führt. Bei Rachenentzuendungen kann daher gleichzeitig eine Mittelohrbeteiligung auftreten." },
      { id: "at_ra_h2", type: "true_false", statement: "Der Hypopharynx gehört ausschliesslich zu den Atemwegen und hat keinerlei Verbindung zum Speiseweg.", answer: false, explanation: "Der Hypopharynx (Pars laryngea) ist die Kreuzungsstelle von Atemweg und Speiseweg: Anterior liegt der Kehlkopfeingang, posterior die Speiseröhre. Beim Schlucken muss die Epiglottis den Kehlkopfeingang sichern, um Aspiration zu verhindern." },
      { id: "at_ra_h3", type: "true_false", statement: "Tonsilla pharyngea, Tonsilla palatina und Tonsilla lingualis gehören zum Waldeyer-Rachenring.", answer: true, explanation: "Der Waldeyer-Rachenring bildet eine ringförmige Immunbarriere: Rachenmandel (adenoide Vegetationen im Dach des Epipharynx), Gaumenmandeln (seitlich im Mesopharynx) und Zungenmandel (Zungenbasis). Sie filtern Keime aus Atemluft und Nahrung und gehören zum lymphatischen System." },
      { id: "at_ra_h4", type: "true_false", statement: "Die Tuba auditiva (Eustachische Röhre) verbindet den Epipharynx mit dem Mittelohr und dient dem Druckausgleich.", answer: true, explanation: "Die Tuba auditiva ermöglicht den Druckausgleich zwischen Nasenrachen und Mittelohr (z.B. beim Gähnen, Schlucken, Tauchen). Entzündungen des Rachens können über die Tuba auditiva das Mittelohr befallen (Tubenkatarrh, Otitis media), da Keime direkt aufsteigen können." },
      { id: "at_ra_h5", type: "mc", question: "In welchem Rachenteil liegt die Tonsilla pharyngea (Rachenmandel)?", options: [
        { text: "Im Epipharynx (Pars nasalis) im Dach und an den Wänden", correct: true },
        { text: "Im Mesopharynx, seitlich neben der Uvula", correct: false },
        { text: "Im Hypopharynx, über dem Kehlkopfeingang", correct: false },
        { text: "Im Larynx, über den Stimmbändern", correct: false }
      ], explanation: "Die Tonsilla pharyngea (Rachenmandel) sitzt im Dach und den hinteren Wänden des Epipharynx. Bei Hypertrophie spricht man von Adenoiden (Polypen), die die Nasenatmung behindern, Schlafapnoe verursachen und die Tuba auditiva verlegen können." },
      { id: "at_ra_h6", type: "mc", question: "Was ist der Hypopharynx und welche Strukturen liegen anterior und posterior zu ihm?", options: [
        { text: "Kehlkopfetage des Rachens: anterior Kehlkopfeingang, posterior Ösophagus", correct: true },
        { text: "Nasenrachenetage: anterior Nasenmuscheln, posterior Sinus sphenoidalis", correct: false },
        { text: "Mundbodenetage: anterior Zunge, posterior Tonsilla palatina", correct: false },
        { text: "Epipharynx: anterior Choanae, posterior Wirbelkörper", correct: false }
      ], explanation: "Der Hypopharynx (Pars laryngea pharyngis) ist die kaudalste Etage des Rachens. Anterior liegt der Larynxeingang (Aditus laryngis), den die Epiglottis beim Schlucken verschliesst. Posterior geht der Hypopharynx in die Speiseröhre über. Hier kreuzen sich Luft- und Speiseweg." }
    ],
    phase4Questions: [
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
      ]},
      { id: "at_ra_mc3", type: "mc", question: "Welche Aussagen zum Rachenraum (Pharynx) sind korrekt?", options: [
        { text: "Epipharynx: Verbindung zur Nase (Choanae) und Mittelohr (Tuba auditiva)", correct: true },
        { text: "Hypopharynx: Kreuzung Atemweg–Speiseweg; Epiglottis schützt vor Aspiration", correct: true },
        { text: "Der Mesopharynx führt ausschliesslich Atemluft, kein Speiseweg", correct: false },
        { text: "Die Tonsilla pharyngea liegt im Hypopharynx", correct: false }
      ], explanation: "Epipharynx (hinter Nase): Rachenmandel + Tuba auditiva → Mittelohr. Mesopharynx (hinter Mund): Kreuzungspunkt Luft/Speise. Hypopharynx (vor Kehlkopf): Epiglottis schützt, posterior Ösophagus. Rachenmandel im Epipharynx, nicht Hypopharynx." }
    ]
  }),
  makeDetailedPlant({
    id: "kehlkopf",
    title: "Kehlkopf (Larynx)",
    contextHint: "Studienbrief 1035 Strukturen und Funktion des Atmungssystems",
    phase1: {
      soil: { statement: "Der Kehlkopf liegt am Übergang von den oberen zu den unteren Atemwegen und verbindet den Hypopharynx mit der Trachea.", answer: true, solution: "Der Kehlkopf bildet das Bindeglied zwischen oberem Atemweg und Trachea. Seine strategische Lage ermöglicht zwei Schlüsstelfunktionen: Schutz der Atemwege beim Schlucken (Epiglottis verschliesst den Kehlkopf) und Lauterzeugung durch Schwingung der Stimmbänder." },
      seed: { statement: "Das Kehlkopfgerüst besteht ausschliesslich aus elastischem Knorpel ohne Bänder.", answer: false, solution: "Das Kehlkopfgerüst besteht aus neun Knorpeln – überwiegend hyaliner Knorpel (z.B. Schildknorpel, Ringknorpel) und etwas elastischer Knorpel (Epiglottis). Der Ringknorpel (Cartilago cricoidea) ist der einzige vollständig geschlossene Knorpelring des Kehlkopfes und bildet als unterste Struktur die Basis, auf der Schildknorpel und Stellknorpel ruhen; kaudal geht er direkt in die erste Trachealspange über. Bänder verbinden die Knorpel und sichern deren Lage und Beweglichkeit." },
      water: { statement: "Der Kehlkopf dient der Lauterzeugung (Phonation) und verschliesst die Atemwege beim Schlucken.", answer: true, solution: "Während des Schluckens kippt die Epiglottis nach hinten und verschliesst den Eingang zur Trachea, um Aspiration zu verhindern. Bei der Phonation schwingen die echten Stimmbänder zwischen Stell- und Schildknorpel im Luftstrom und erzeugen so den Stimmklang." }
    },
    harvestQuestions: [
      { id: "at_kk_h1", type: "true_false", statement: "Der Schildknorpel (Cartilago thyroidea) ist der grösste Knorpel des Kehlkopfes.", answer: true, explanation: "Der Schildknorpel bildet den vorderen und seitlichen Knorpelmantel des Kehlkopfes. Sein prominenter Vordervorsprung ist beim Mann gut tastbar (Adamsapfel, Prominentia laryngea). Er bildet den vorderen Verankerungspunkt der Stimmbänder." },
      { id: "at_kk_h2", type: "true_false", statement: "Der Ringknorpel (Cartilago cricoidea) bildet die Basis, auf der alle anderen Kehlkopfknorpel ruhen.", answer: true, explanation: "Der Ringknorpel ist der einzige Kehlkopfknorpel mit einem vollständig geschlossenen Knorpelring. Als unterste Struktur des Kehlkopfes bildet er die Basis für Schildknorpel und Stellknorpel und geht kaudal direkt in die erste Trachealspange über." },
      { id: "at_kk_h3", type: "true_false", statement: "Die Stimmritze (Rima glottidis) befindet sich zwischen den falschen Stimmbändern.", answer: false, explanation: "Die Stimmritze (Rima glottidis) liegt zwischen den echten Stimmbändern (Plicä vocales), nicht zwischen den falschen Stimmbändern (Plicä vestibulares). Die falschen Stimmbänder befinden sich kranial der echten und bilden das Vestibulum laryngis." },
      { id: "at_kk_h4", type: "mc", question: "Was passiert beim Schlucken mit dem Kehlkopf, um Aspiration zu verhindern?", options: [
        { text: "Der Kehlkopf wird angehoben, die Epiglottis kippt herab und verschliesst den Kehlkopfeingang", correct: true },
        { text: "Die echten Stimmbänder spreizen sich weit und saugen Luft an", correct: false },
        { text: "Der Ringknorpel rotiert und verschliesst die Trachea", correct: false },
        { text: "Die falschen Stimmbänder verschliessen den Ösophagus", correct: false }
      ], explanation: "Beim Schlucken werden gleichzeitig die Atmung angehalten, der Kehlkopf nach oben-vorne angehoben und die Epiglottis nach hinten-unten gedrückt (durch die Zunge und Mm. aryepiglottici). Diese Dreifachsicherung verhindert Aspiration. Wenn dieser Mechanismus versagt (z.B. bei Schlaganfall) entstehen Aspirationspneumonien." },
      { id: "at_kk_h5", type: "true_false", statement: "Der Ringknorpel (Cartilago cricoidea) ist der einzige vollständig geschlossene Knorpelring im Kehlkopf.", answer: true, explanation: "Alle anderen Kehlkopfknorpel (Schildknorpel, Stellknorpel, Epiglottis) sind offen oder nicht ringförmig. Der Ringknorpel bildet die Basis des Kehlkopfes und hat dorsal einen breiten Plattenanteil (Lamina). Klinisch wichtig: Bei der Notfallkoniotomie durchtrennt man das Ligamentum conicum zwischen Ring- und Schildknorpel." },
      { id: "at_kk_h6", type: "mc", question: "Welche Funktion haben die echten Stimmbänder bei der Phonation?", options: [
        { text: "Sie schwingen im Luftstrom und erzeugen durch ihre Schwingungsfrequenz den Stimmklang", correct: true },
        { text: "Sie saugen aktiv Luft an und erzeugen Schall durch Luftkompression", correct: false },
        { text: "Sie verschliessen beim Schlucken die Trachea vollständig", correct: false },
        { text: "Sie produzieren Schleim, der Stimmklang durch Resonanz erzeugt", correct: false }
      ], explanation: "Phonation: Die Aryknorpel (Stellknorpel) nähern die echten Stimmbänder aneinander (Glottisschluss). Ausströmende Luft bringt die Stimmbänder in Schwingung. Die Schwingungsfrequenz bestimmt die Tonhöhe, die Stärke des Luftstroms die Lautstärke. Höhere Spannung der Stimmbänder = höhere Frequenz = höherer Ton." }
    ],
    phase4Questions: [
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
      ]},
      { id: "at_kk_mc3", type: "mc", question: "Welche Aussagen zum Kehlkopf sind korrekt?", options: [
        { text: "Schildknorpel ist der grösste Kehlkopfknorpel", correct: true },
        { text: "Ringknorpel ist einziger vollständig geschlossener Ring, bildet die Kehlkopfbasis", correct: true },
        { text: "Die Stimmritze liegt zwischen den falschen Stimmbändern", correct: false },
        { text: "Die Epiglottis besteht aus hyalinem Knorpel", correct: false }
      ], explanation: "Kehlkopf-Knorpel: Schildknorpel (grösster, Adamsapfel), Ringknorpel (einziger vollständiger Ring, Basis), Stellknorpel (bewegen Stimmbänder), Epiglottis (elastischer Knorpel, kein Hyalin). Stimmritze liegt zwischen ECHTEN, nicht falschen Stimmbändern." }
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
      { id: "at_tr_h2", type: "true_false", statement: "Die Bifurcatio tracheä bezeichnet die Teilung der Trachea in linken und rechten Hauptbronchus.", answer: true, explanation: "Die Bifurcatio tracheä liegt auf Höhe des 5. Brustwirbels und teilt die Trachea in rechten und linken Hauptbronchus. Der rechte ist steiler angewinkelt (ca. 25°) als der linke (ca. 45°) – deshalb gelangen aspirierte Fremdkörper häufiger in die rechte Lunge." },
      { id: "at_tr_h3", type: "true_false", statement: "Aspirierte Fremdkörper gelangen häufiger in den rechten Hauptbronchus als in den linken.", answer: true, explanation: "Der rechte Hauptbronchus ist steiler (ca. 25° zur Trachea) und breiter als der linke (ca. 45°). Diese anatomische Asymmetrie erklärt, warum Fremdkörper und Magensekret bei Aspiration typischerweise in die rechte Lunge gelangen – wichtig für klinische Diagnose und Bronchoskopie." },
      { id: "at_tr_h4", type: "mc", question: "Auf welcher anatomischen Höhe liegt die Bifurcatio tracheae?", options: [
        { text: "Höhe des 4.–5. Brustwirbels (BWK 4–5)", correct: true },
        { text: "Höhe des Kehlkopfes (HWK 4–6)", correct: false },
        { text: "Höhe des 10. Brustwirbels (BWK 10)", correct: false },
        { text: "Höhe des Zwerchfells (BWK 12)", correct: false }
      ], explanation: "Die Bifurcatio tracheae liegt auf Höhe des 4.–5. Brustwirbels, was in der Brusthöhle dem sogenannten Angulus Ludovici (Louis-Winkel) auf Sternalebene entspricht. Diese Höhenangabe ist klinisch relevant bei Bronchoskopie und Intubation." },
      { id: "at_tr_h5", type: "mc", question: "Wie viele Knorpelspangen besitzt die Trachea und welche Form haben sie?", options: [
        { text: "16–20 hufeisenförmige (C-förmige) Knorpelspangen aus hyalinem Knorpel", correct: true },
        { text: "5–8 geschlossene Ringe aus Faserknorpel", correct: false },
        { text: "30–40 elastische Fasern ohne Knorpelstruktur", correct: false },
        { text: "Keine Knorpelanteile – die Trachea wird nur durch Muskulatur stabilisiert", correct: false }
      ], explanation: "Die Trachea hat 16–20 C-förmige (hufeisenförmige) Knorpelspangen aus hyalinem Knorpel. Die offene Seite liegt hinten (posterior) und wird durch den Paries membranaceus (Bandstruktur mit glattem Muskel, M. trachealis) geschlossen. Die Speiseröhre liegt direkt hinter dieser membranösen Wand." },
      { id: "at_tr_h6", type: "true_false", statement: "Der Paries membranaceus (hintere Wand der Trachea) liegt direkt der vorderen Ösophaguswand an.", answer: true, explanation: "Die Trachea und der Ösophagus verlaufen im Mediastinum direkt benachbart. Der Paries membranaceus (hintere, weiche Wand der Trachea) liegt der vorderen Ösophaguswand direkt an. Das erklärt, warum Ösophagustumore oder grosse Schilddrüsenstruma die Trachea komprimieren können." }
    ],
    phase4Questions: [
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
      ]},
      { id: "at_tr_mc3", type: "mc", question: "Welche Aussagen zur Trachea sind korrekt?", options: [
        { text: "16–20 C-förmige Knorpelspangen aus hyalinem Knorpel verhindern Kollaps", correct: true },
        { text: "Fremdkörper gelangen häufiger rechts, da der rechte Hauptbronchus steiler ist", correct: true },
        { text: "Die Bifurcatio tracheae liegt auf Höhe des 10. Brustwirbels", correct: false },
        { text: "Die Trachea besteht aus vollständig geschlossenen Knorpelringen", correct: false }
      ], explanation: "Trachea: 16–20 C-förmige Spangen aus Hyalinknorpel; Paries membranaceus hinten (an Ösophagus); Bifurcatio auf BWK 4–5. Rechter Hauptbronchus steiler (25°) und breiter → Fremdkörper häufiger rechts. Geschlossene Ringe gibt es nur beim Ringknorpel des Kehlkopfs." }
    ]
  }),
  makeDetailedPlant({
    id: "bronchialsystem",
    title: "Bronchialsystem",
    contextHint: "Studienbrief 1035 Strukturen und Funktion des Atmungssystems",
    phase1: {
      soil: { statement: "An der Bifurkation (Höhe 5. Brustwirbel) teilt sich die Trachea in linken und rechten Stammbronchus auf.", answer: true, solution: "An der Bifurcatio tracheä (Höhe 5. Brustwirbel) teilt sich die Trachea in rechten und linken Stammbronchus. Der rechte ist steiler angewinkelt – weshalb aspirierte Fremdkörper häufiger in der rechten Lunge landen – und versorgt drei Lappenbronchien, der linke nur zwei." },
      seed: { statement: "Bronchioli enthalten wie die Stammbronchien einen Knorpelanteil in ihrer Wand.", answer: false, solution: "Die Bronchioli enthalten keinen Knorpelanteil mehr, nur noch glatte Muskulatur." },
      water: { statement: "In den Alveolen findet der Gasaustausch zwischen Alveolarluft und Blut statt.", answer: true, solution: "Die Alveolen sind als Endstrecke des Bronchialbaums der Ort des Gasaustauschs. Ihre Wand besteht aus einschichtigem Plattenepithel – Pneumozyten Typ I für den Gasaustausch und Pneumozyten Typ II für die Surfactant-Produktion. Mehrschichtiges Plattenepithel würde die Diffusionsstrecke für O2 und CO2 zu stark verlängern. Weil ab den Bronchiolen kein Knorpel mehr vorhanden ist, reguliert dort ausschliesslich glatte Muskulatur den Durchmesser; Adrenalin führt zur Bronchodilatation, der Parasympathikus zur Bronchokonstriktion." }
    },
    harvestQuestions: [
      { id: "at_br_h1", type: "true_false", statement: "Die rechte Lunge besitzt drei Lappenbronchien, die linke nur zwei.", answer: true, explanation: "Die rechte Lunge hat drei Lappen (Ober-, Mittel-, Unterlappen), die linke nur zwei (Ober- und Unterlappen), weil links der Herzraum (Impressio cardiaca) Platz beansprucht. Der Mittellappen ist daher ein rein rechtes anatomisches Merkmal." },
      { id: "at_br_h2", type: "true_false", statement: "Die Bronchioli respiratorii enthalten keine Knorpelanteile und werden durch glatte Muskulatur reguliert.", answer: true, explanation: "Ab den Bronchiolen fehlen Knorpelspangen vollständig – die Wandstabilität wird ausschliesslich durch glatte Muskulatur aufrechterhalten. Diese Muskulatur kann durch das autonome Nervensystem reguliert werden (Adrenalin → Bronchodilatation; Parasympathikus → Bronchokonstriktion), was bei Asthma bronchiale pathologisch relevant ist." },
      { id: "at_br_h3", type: "true_false", statement: "Die Alveolarwand besteht aus mehrschichtigem Plattenepithel.", answer: false, explanation: "Die Alveolarwand besteht aus einschichtigem Plattenepithel (Pneumozyten Typ I für Gasaustausch, Typ II für Surfactant-Produktion), nicht mehrschichtigem. Ein mehrschichtiges Epithel würde die Diffusionsstrecke für O2 und CO2 erheblich verlängern und den Gasaustausch behindern." },
      { id: "at_br_h4", type: "true_false", statement: "Adrenalin führt zur Bronchodilatation (Erweiterung der Atemwege).", answer: true, explanation: "Adrenalin (Epinephrin) stimuliert β2-Adrenorezeptoren der glatten Muskulatur in den Bronchiolen → Relaxation der glatten Muskulatur → Bronchodilatation. Das ermöglicht mehr Luftzufuhr in Stresssituationen. Der Parasympathikus (Acetylcholin) wirkt umgekehrt: Bronchokonstriktion. Dieses Prinzip wird in der Asthmabehandlung genutzt (β2-Agonisten)." },
      { id: "at_br_h5", type: "mc", question: "Was produzieren Pneumozyten Typ II und welche Funktion hat diese Substanz?", options: [
        { text: "Surfactant: senkt die Oberflächenspannung und verhindert Alveolenkollaps", correct: true },
        { text: "Kollagen: stabilisiert die Alveolarwand mechanisch", correct: false },
        { text: "IgA: schützt die Alveolen vor Keimen", correct: false },
        { text: "Schleim: befeuchtet die Alveolarluft", correct: false }
      ], explanation: "Surfactant (Surface-active agent) ist ein Phospholipid-Protein-Gemisch, das die Oberflächenspannung in den Alveolen senkt. Ohne Surfactant würden die Alveolen bei jeder Ausatmung kollabieren. Beim Atemnotsyndrom des Frühgeborenen (IRDS) fehlt Surfactant → Kollaps der Alveolen." },
      { id: "at_br_h6", type: "mc", question: "Was unterscheidet die Bronchiolen von den grösseren Bronchien?", options: [
        { text: "Bronchiolen haben keinen Knorpel in der Wand, nur glatte Muskulatur", correct: true },
        { text: "Bronchiolen besitzen Knorpelspangen wie die Trachea", correct: false },
        { text: "Bronchiolen sind der Ort des Gasaustauschs", correct: false },
        { text: "Bronchiolen sind grösser als Stammbronchien", correct: false }
      ], explanation: "Das Kennzeichen der Bronchiolen: kein Knorpel mehr. Die Wandstabilität hängt ausschliesslich von glatter Muskulatur und der Zugspannung des umgebenden Lungengewebes ab. Das erklärt, warum Asthma (Krampf der glatten Bronchiolmuskulatur) und Emphysem (Verlust des Gewebezugs) zu Atemwegsobstruktion führen." }
    ],
    phase4Questions: [
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
      ]},
      { id: "at_br_mc3", type: "mc", question: "Welche Aussagen zu Bronchialsystem und Alveolen sind korrekt?", options: [
        { text: "Pneumozyten Typ I bilden die Gastauschmembran, Typ II produzieren Surfactant", correct: true },
        { text: "Adrenalin führt zur Bronchodilatation über β2-Rezeptoren", correct: true },
        { text: "Bronchiolen besitzen Knorpelspangen zur Wandstabilisierung", correct: false },
        { text: "Surfactant erhöht die Oberflächenspannung in den Alveolen", correct: false }
      ], explanation: "Alveolarsystem: Pneumozyt I (Gasaustausch, einschichtiges PE), Typ II (Surfactant, senkt Oberflächenspannung). Bronchiolen: kein Knorpel, nur glatte Muskulatur. Adrenalin = Bronchodilatation (β2), Parasympathikus = Bronchokonstriktion." }
    ]
  }),
  makeDetailedPlant({
    id: "lunge_makroskopie",
    title: "Makroskopie der Lunge",
    contextHint: "Studienbrief 1035 Strukturen und Funktion des Atmungssystems",
    phase1: {
      soil: { statement: "Die rechte Lunge hat drei Lungenlappen, die linke Lunge nur zwei.", answer: true, solution: "Die rechte Lunge hat drei Lappen (Ober-, Mittel-, Unterlappen), die linke nur zwei (Ober-, Unterlappen), da links der Herzraum (Impressio cardiaca) Platz beansprucht. Das Volumenverhältnis beträgt daher ca. 4:3 (rechts:links)." },
      seed: { statement: "Der Pleuraspalt ist mit Luft gefüllt und ermöglicht so die Beweglichkeit der Lunge.", answer: false, solution: "Der Pleuraspalt ist mit seröser Flüssigkeit gefüllt, nicht mit Luft. Er vermittelt Adhäsionskräfte. Die Pleura visceralis (Lungenfell) liegt direkt der Lungenoberfläche an, während die Pleura parietalis den inneren Thoraxraum auskleidet (Rippenfell, Zwerchfellplatte, Mediastinalpleura). Zwischen beiden liegt der kapilläre Pleuraspalt mit seröser Flüssigkeit, die Reibung vermindert." },
      water: { statement: "Im Pleuraspalt herrscht stets ein Unterdruck, der dafür sorgt, dass die Lunge dem Thorax passiv folgt.", answer: true, solution: "Im Pleuraspalt herrscht permanenter Unterdruck, weil elastische Rückzugskräfte der Lunge und Ausdehnungstendenzen des Thorax einander entgegenwirken. Dieser Unterdruck sorgt dafür, dass die Lunge den Atembewegungen von Thorax und Zwerchfell passiv folgt. Am Lungenhilus treten Hauptbronchus, Arteria pulmonalis (sauerstoffarmes Blut) und Lymphgefässe in die Lunge ein; die Pulmonalvenen (sauerstoffreiches Blut) verlassen die Lunge am Hilus und münden in den linken Herzvorhof." }
    },
    harvestQuestions: [
      { id: "at_lu_h1", type: "true_false", statement: "Das Verhältnis des Lungenvolumens zwischen rechter und linker Lunge beträgt 4:3.", answer: true, explanation: "Die rechte Lunge ist grösser als die linke, weil links der Herzraum (Impressio cardiaca) Platz beansprucht. Das Gewicht beträgt rechts ca. 600 g, links ca. 500 g. Das grössere Volumen rechts erklärt auch, warum aspirierte Fremdkörper häufiger in der rechten Lunge landen." },
      { id: "at_lu_h2", type: "true_false", statement: "Die Pleura visceralis (Lungenfell) liegt direkt der Lunge an, während die Pleura parietalis das Rippenfell bildet.", answer: true, explanation: "Die Pleura visceralis ist eng mit der Lungenoberfläche verwachsen; die Pleura parietalis kleidet den inneren Thoraxraum aus (Rippenfell, Zwerchfellplatte, Mediastinalpleura). Zwischen beiden liegt der kapilläre Pleuraspalt mit seröser Flüssigkeit." },
      { id: "at_lu_h3", type: "true_false", statement: "Am Lungenhilus treten sowohl Arterien als auch Venen in die Lunge ein.", answer: false, explanation: "Am Lungenhilus treten ein: Hauptbronchus, A. pulmonalis (sauerstoffarmes Blut) und Lymphgefässe. Die Pulmonalvenen (sauerstoffreiches Blut) verlassen die Lunge am Hilus – sie treten aus, nicht ein. Alle vier Pulmonalvenen münden in den linken Herzvorhof." },
      { id: "at_lu_h4", type: "true_false", statement: "Die rechte Lunge ist grösser als die linke, weil das Herz links liegt und dort Platz beansprucht.", answer: true, explanation: "Das Herz liegt links der Mittellinie – die Impressio cardiaca (Herzfläche) nimmt Raum von der linken Lunge weg. Rechts:links Volumenverhältnis ca. 4:3 (rechts ~600 g, links ~500 g). Deshalb hat die rechte Lunge 3 Lappen, die linke nur 2." },
      { id: "at_lu_h5", type: "mc", question: "Was ist ein Pneumothorax und was passiert dabei mit der Lunge?", options: [
        { text: "Luft gelangt in den Pleuraspalt → Unterdruck aufgehoben → Lunge kollabiert", correct: true },
        { text: "Wasser füllt den Pleuraspalt → Lunge vergrössert sich", correct: false },
        { text: "Der Pleuraspalt verliert Flüssigkeit → Lunge wird starrer", correct: false },
        { text: "Das Zwerchfell reisst ein → Abdomen expandiert in den Thorax", correct: false }
      ], explanation: "Im Pleuraspalt herrscht normaler Unterdruck (negativer Druck relativ zur Atmosphäre). Gelangt Luft hinein (Trauma, Lungenriss), wird dieser Unterdruck aufgehoben → elastische Rückstellkräfte der Lunge lassen sie kollabieren (Atelektase). Ein Spannungspneumothorax ist ein lebensbedrohlicher Notfall." },
      { id: "at_lu_h6", type: "mc", question: "Welche Struktur tritt am Lungenhilus in die Lunge EIN (nicht aus)?", options: [
        { text: "A. pulmonalis (sauerstoffarmes Blut vom rechten Herzen)", correct: true },
        { text: "V. pulmonalis (sauerstoffreiches Blut zum linken Herzen)", correct: false },
        { text: "Aorta pulmonalis", correct: false },
        { text: "Ductus arteriosus", correct: false }
      ], explanation: "Am Lungenhilus treten EIN: Hauptbronchus, A. pulmonalis (sauerstoffarmes Blut), Bronchialarterien, Lymphgefässe, Nerven. Die Vv. pulmonales (4 Stück, sauerstoffreiches Blut nach Gasaustausch) treten aus dem Hilus AUS und münden in den linken Vorhof." }
    ],
    phase4Questions: [
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
      ]},
      { id: "at_lu_mc3", type: "mc", question: "Welche Aussagen zur Lunge und Pleura sind korrekt?", options: [
        { text: "Rechte Lunge: 3 Lappen; linke Lunge: 2 Lappen (Herzraum beansprucht Platz)", correct: true },
        { text: "Am Hilus tritt die A. pulmonalis ein und die Vv. pulmonales treten aus", correct: true },
        { text: "Im Pleuraspalt herrscht Überdruck, der die Lunge nach aussen drückt", correct: false },
        { text: "Beide Lungen sind gleich gross (Verhältnis 1:1)", correct: false }
      ], explanation: "Rechts 3 Lappen (re > li = 4:3), weil links Herzimpressio. Am Hilus: A.pulmonalis (sauerstoffarm) und Bronchus ein, Vv.pulmonales (sauerstoffreich) aus. Pleuraspalt = Unterdruck + seröse Flüssigkeit." }
    ]
  }),
  makeDetailedPlant({
    id: "atmungsprozess",
    title: "Atmungsprozess",
    contextHint: "Studienbrief 1035 Strukturen und Funktion des Atmungssystems",
    phase1: {
      soil: { statement: "Bei der Inspiration kontrahiert das Diaphragma und flacht in abdominaler Richtung ab, während gleichzeitig die Rippen angehoben werden.", answer: true, solution: "Inspiration ist aktiv: Das Diaphragma kontrahiert und flacht ab (vergrössert den Thoraxraum nach unten), gleichzeitig heben Interkostalmuskeln die Rippen (vergrössert den Thoraxraum nach aussen). Nach dem Boyle-Mariotte-Gesetz (p1V1 = p2V2) fällt dadurch der Alveolardruck um ca. 1–3 cmH2O unter den Atmosphärendruck, und Luft strömt passiv in die Lunge. Eingeatmete Luft enthält ca. 21 % O2; ausgeatmete Luft enthält noch ca. 16 % O2 und ca. 4 % CO2, da der Körper Sauerstoff verbraucht und Kohlendioxid abgibt." },
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
      ], explanation: "Nach Boyle-Mariotte (p1V1 = p2V2): Wenn das Thoraxvolumen durch Kontraktion von Diaphragma und Interkostalmuskeln zunimmt, sinkt der Druck in der Lunge unter den Atmosphärendruck (ca. -1 bis -3 cmH2O bei normaler Inspiration). Dieser Druckgradient treibt Luft von aussen passiv in die Alveolen. Bei Exspiration: Volumen sinkt → Druck steigt → Luft strömt heraus." },
      { id: "at_ap_h4", type: "true_false", statement: "Eingeatmete Luft enthält ca. 21% O2; ausgeatmete Luft enthält nur noch ca. 16% O2.", answer: true, explanation: "Der Körper entnimmt ca. 5% des O2 aus der Atemluft: 21% (Einatmung) → 16% (Ausatmung). Gleichzeitig steigt CO2 von ~0,04% in der Aussenluft auf ~4% in der Ausatemluft, da der Körper CO2 als Stoffwechselprodukt produziert und abgibt." },
      { id: "at_ap_h5", type: "mc", question: "Warum strömt bei der Inspiration Luft passiv in die Lunge?", options: [
        { text: "Weil der Alveolardruck durch Thoraxvolumenzunahme unter den Atmosphärendruck sinkt", correct: true },
        { text: "Weil die Lunge aktiv Luft ansaugt durch kontraktile Alveolarzellen", correct: false },
        { text: "Weil der Unterdruck im Pleuraspalt aktiv aufgebaut wird durch Muskeln", correct: false },
        { text: "Weil bei der Exspiration ein Überdruck entsteht, der beim nächsten Atemzug Luft drückt", correct: false }
      ], explanation: "Physikmechanismus: Diaphragma und Atemmuskulatur vergrössern den Thorax → nach Boyle-Mariotte sinkt der Alveolardruck unter Atmosphärendruck → Luft strömt von aussen (Hochdruck) in die Lunge (Niederdruck). Die Lunge selbst hat keine eigene Kontraktionskraft." },
      { id: "at_ap_h6", type: "mc", question: "Was ist der CO2-Anteil der Aussenluft und wie verändert er sich in der ausgeatmeten Luft?", options: [
        { text: "Aussenluft: ~0,04% CO2 → Ausatemluft: ~4% CO2 (100-facher Anstieg)", correct: true },
        { text: "Aussenluft: ~4% CO2 → Ausatemluft: ~0,04% CO2", correct: false },
        { text: "Aussenluft: ~21% CO2 → Ausatemluft: ~16% CO2", correct: false },
        { text: "CO2-Gehalt bleibt in Ein- und Ausatemluft identisch", correct: false }
      ], explanation: "CO2 steigt beim Ausatmen massiv: von ~0,04% in der Umgebungsluft auf ~4% in der Ausatemluft (100-facher Anstieg). O2 sinkt von ~21% auf ~16%. Diese Werte erklären, warum Mund-zu-Mund-Beatmung funktioniert – ausgeatmete Luft enthält noch genug O2." }
    ],
    phase4Questions: [
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
      ]},
      { id: "at_ap_mc3", type: "mc", question: "Welche Aussagen zum Atmungsprozess sind korrekt?", options: [
        { text: "Inspiration ist aktiv (Diaphragma kontrahiert), Exspiration in Ruhe ist passiv", correct: true },
        { text: "Thoraxvolumenzunahme senkt den Alveolardruck unter Atmosphärendruck → Luft strömt ein", correct: true },
        { text: "Ausgeatmete Luft hat denselben O2-Gehalt wie eingeatmete (~21%)", correct: false },
        { text: "Die Lunge selbst kontrahiert aktiv, um Luft einzusaugen", correct: false }
      ], explanation: "Inspiration = aktiv (Muskelarbeit); Exspiration in Ruhe = passiv (elastische Rückstellung). Boyle-Mariotte: Volumen↑ → Druck↓ → Lufteinströmen. O2 sinkt von 21% auf ~16%, CO2 steigt von 0,04% auf ~4%. Die Lunge folgt nur passiv den Thoraxbewegungen." }
    ]
  }),
  makeDetailedPlant({
    id: "atemmuskulatur",
    title: "Atemmuskulatur und Atemhilfsmuskulatur",
    contextHint: "Studienbrief 1035 Strukturen und Funktion des Atmungssystems",
    phase1: {
      soil: { statement: "Das Diaphragma (Zwerchfell) ist ein zentraler Atemmuskel, der sowohl bei der Inspiration als auch bei der Exspiration wirkt.", answer: true, solution: "Das Diaphragma ist der wichtigste Atemmuskel und leistet in Ruhe den Grossteil der Atemarbeit. Bei der Inspiration kontrahiert es und flacht ab; bei der normalen Ausatmung entspannt es sich und wölbt sich durch seine elastische Rückstellkraft passiv nach oben – dieser passive Rückzug verkleinert das Thoraxvolumen und treibt Luft aus der Lunge. Nur bei forcierter Exspiration (Husten, Niesen, Pressen) wird das Diaphragma aktiv als exspiratorischer Muskel eingesetzt, unterstützt von den Bauchmuskeln." },
      seed: { statement: "Die äusseren Zwischenrippenmuskeln (M. intercostales externi) wirken exspiratorisch.", answer: false, solution: "M. intercostales externi wirken inspiratorisch. Exspiratorisch wirken die M. intercostales interni." },
      water: { statement: "Bei Bedarf wird die Atmung durch die Atemhilfsmuskulatur unterstützt, die auch als auxiliäre Atemmuskulatur bezeichnet wird.", answer: true, solution: "Atemhilfsmuskulatur wird bei erhöhtem Atembedarf (Belastung, Atemnot) hinzugeschaltet. Dazu gehören inspiratorisch z.B. M. sternocleidomastoideus und Mm. scaleni sowie exspiratorisch Bauchmuskeln wie M. rectus abdominis, die die Rippen aktiv nach unten ziehen." }
    },
    harvestQuestions: [
      { id: "at_am_h1", type: "true_false", statement: "Der M. intercostales externus (äusserer Zwischenrippenmuskel) ist ein inspiratorisch wirkender Atemmuskel.", answer: true, explanation: "Die Mm. intercostales externi verlaufen von posterior-superior nach anterior-inferior. Bei Kontraktion heben sie die Rippen und erweitern den Thoraxdurchmesser seitlich – ein inspiratorischer Effekt. Die Mm. intercostales interni verlaufen umgekehrt und wirken daher exspiratorisch." },
      { id: "at_am_h2", type: "true_false", statement: "Das Diaphragma wirkt ausschliesslich inspiratorisch und hat keine Funktion bei der Ausatmung.", answer: false, explanation: "Das Diaphragma ist der Hauptatemmuskel für die Inspiration, hat aber auch passiven Anteil bei der Ausatmung: Es entspannt sich und gibt durch seine Rückstellkraft Energie frei, die den Thorax verkleinert. Aktiv exspiratorisch wird es nur bei forcierter Ausatmung (Pressen, Husten, Niesen)." },
      { id: "at_am_h3", type: "true_false", statement: "Die ruhige Exspiration ist ein passiver Vorgang, der keine aktive Muskelarbeit erfordert.", answer: true, explanation: "In Ruhe ist die Exspiration passiv: Das Diaphragma entspannt sich, die Lunge zieht sich durch ihre elastischen Rückstellkräfte zusammen, Thoraxvolumen sinkt, Druck steigt → Luft strömt aus. Erst bei forcierter Exspiration (Husten, Sport) werden Mm. intercostales interni und Bauchmuskeln aktiv eingesetzt." },
      { id: "at_am_h4", type: "mc", question: "Welche Muskeln gehören zur inspiratorischen Atemhilfsmuskulatur?", options: [
        { text: "M. sternocleidomastoideus und Mm. scaleni", correct: true },
        { text: "Mm. intercostales interni und M. rectus abdominis", correct: false },
        { text: "M. transversus abdominis und M. obliquus internus", correct: false },
        { text: "M. gluteus maximus und M. iliopsoas", correct: false }
      ], explanation: "Inspiratorische Atemhilfsmuskulatur: M. sternocleidomastoideus (hebt Sternum), Mm. scaleni (heben obere Rippen), auch M. pectoralis minor. Diese werden bei erhöhtem Atembedarf (Belastung, Atemnot, COPD) aktiviert. Ein sichtbar angespannter SCM ist klinisches Zeichen für Atemnot." },
      { id: "at_am_h5", type: "mc", question: "Welche Muskeln wirken bei forcierter Exspiration (z.B. Husten, Pressen)?", options: [
        { text: "Mm. intercostales interni und Bauchmuskeln (M. rectus, M. obliquus)", correct: true },
        { text: "Diaphragma und Mm. intercostales externi", correct: false },
        { text: "M. sternocleidomastoideus und Mm. scaleni", correct: false },
        { text: "Mm. erector spinae und M. latissimus dorsi", correct: false }
      ], explanation: "Forcierte Exspiration (Niesen, Husten, Pressen) erfordert aktive Muskelarbeit: Mm. intercostales interni ziehen Rippen nach unten, Bauchmuskeln erhöhen intraabdominalen Druck und drücken das Zwerchfell nach oben → Lungenvolumen sinkt schnell." },
      { id: "at_am_h6", type: "true_false", statement: "Die Mm. intercostales externi (äussere Zwischenrippenmuskeln) haben inspiratorische Wirkung.", answer: true, explanation: "Die Mm. intercostales externi verlaufen von posterior-superior nach anterior-inferior. Bei Kontraktion heben sie die Rippen und erweitern den Thoraxdurchmesser seitlich – ein inspiratorischer Effekt. Die Mm. intercostales interni verlaufen senkrecht dazu und wirken exspiratorisch." }
    ],
    phase4Questions: [
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
      ]},
      { id: "at_am_mc3", type: "mc", question: "Welche Aussagen zur Atemmuskulatur sind korrekt?", options: [
        { text: "Diaphragma und Mm. intercostales externi wirken inspiratorisch", correct: true },
        { text: "Ruhige Exspiration ist passiv (elastische Rückstellkraft der Lunge)", correct: true },
        { text: "Mm. intercostales externi wirken exspiratorisch", correct: false },
        { text: "Das Diaphragma ist nur bei forcierter Atmung aktiv", correct: false }
      ], explanation: "Merkhilfe: Externi = Einatmen (Inspiration); Interni = ausatmen (bei forcierter Exspiration). Das Diaphragma ist der Hauptatemmuskel und bei jeder Inspiration aktiv; Ruhe-Exspiration ist passiv durch elastische Rückstellung." }
    ]
  }),
  makeDetailedPlant({
    id: "gasaustausch",
    title: "Gasaustausch",
    contextHint: "Studienbrief 1035 Strukturen und Funktion des Atmungssystems",
    phase1: {
      soil: { statement: "Als Gasaustausch bezeichnet man den Übertritt von Sauerstoff aus der Alveolarluft ins Blut und von Kohlendioxid in umgekehrter Richtung.", answer: true, solution: "Als Gasaustausch wird der Stoffaustausch an den Alveolarmembranen bezeichnet: O2 diffundiert aus der Alveolarluft ins Blut (hoher O2-Partialdruck in den Alveolen, niedriger im Blut), CO2 in die entgegengesetzte Richtung. Dieser Prozess erfolgt ausschliesslich durch passive Diffusion ohne Energieverbrauch." },
      seed: { statement: "Der Gasaustausch in der Lunge erfordert aktiven Energieeinsatz der Zellen.", answer: false, solution: "Der Gasaustausch geschieht per Diffusion entlang von Partialdruckunterschieden, also ohne Energieverbrauch. O2 diffundiert aus der Alveolarluft (pO2 ca. 100 mmHg) ins Blut (pO2 ca. 40 mmHg), CO2 in umgekehrter Richtung. Die Diffusionskapazität (DLCO) beschreibt die Fähigkeit der Lunge, Gase aus der Alveolarluft ins Blut aufzunehmen – sie ist klinisch relevant, da sie bei Lungenfibrose oder Lungenemphysem vermindert ist, weil die Membranfläche oder -dicke verändert ist." },
      water: { statement: "Den Gasaustausch zwischen Blut und Körperzellen bezeichnet man als innere Atmung, jenen in der Lunge als äussere Atmung.", answer: true, solution: "Äussere Atmung bezeichnet den Gasaustausch zwischen Alveolarluft und Blut in der Lunge, innere Atmung den Gasaustausch zwischen Blut und Körperzellen im Gewebe. Beide Prozesse verlaufen nach demselben Diffusionsprinzip, aber an unterschiedlichen anatomischen Orten." }
    },
    harvestQuestions: [
      { id: "at_ga_h1", type: "true_false", statement: "Der Gasaustausch findet durch Diffusion statt, also ohne Energieverbrauch.", answer: true, explanation: "O2 diffundiert entlang seines Partialdruckgefälles aus der Alveolarluft (pO2 ca. 100 mmHg) ins Blut (pO2 ca. 40 mmHg). CO2 diffundiert in umgekehrter Richtung. Diffusion ist passiv – kein ATP erforderlich. Voraussetzung ist eine sehr dünne Diffusionsstrecke (Alveolarmembran <0,5 μm)." },
      { id: "at_ga_h3", type: "true_false", statement: "Die Diffusionskapazität beschreibt die Fähigkeit der Lunge zur Aufnahme von Kohlendioxid aus der Luft.", answer: false, explanation: "Die Diffusionskapazität (DLCO) beschreibt die Fähigkeit der Lunge, Gase (v.a. O2) aus der Alveolarluft ins Blut aufzunehmen. CO2 wird im Gegenteil aus dem Blut in die Alveolarluft abgegeben. Die DLCO ist klinisch relevant, z.B. vermindert bei Lungenfibrose oder Lungenemphysem." },
      { id: "at_ga_h2", type: "mc", question: "Was bezeichnet man als 'äussere Atmung'?", options: [
        { text: "Gasaustausch zwischen Alveolarluft und Blut in der Lunge", correct: true },
        { text: "Gasaustausch zwischen Blut und Körperzellen im Gewebe", correct: false },
        { text: "Aufnahme von O2 durch die Nase", correct: false },
        { text: "Zellatmung (Verbrennung von Glukose mit O2)", correct: false }
      ], explanation: "Äussere Atmung = Gasaustausch Lunge–Blut: O2 tritt aus Alveolarluft ins Kapillarblut, CO2 umgekehrt. Innere Atmung = Gasaustausch Blut–Körperzellen im Gewebe: O2 geht in die Zellen, CO2 ins Blut." },
      { id: "at_ga_h4", type: "true_false", statement: "O2 diffundiert von den Alveolen (pO2 ~100 mmHg) ins Blut (pO2 ~40 mmHg) – also entlang des Partialdruckgefälles ohne Energieverbrauch.", answer: true, explanation: "Der pO2 in der Alveolarluft (~100 mmHg) ist deutlich höher als im venösen Blut (~40 mmHg). Dieser Partialdruckgradient treibt die Diffusion an – passiv, kein ATP nötig. CO2 diffundiert in entgegengesetzter Richtung (Blut pCO2 ~46 mmHg → Alveole pCO2 ~40 mmHg)." },
      { id: "at_ga_h5", type: "mc", question: "Bei welchen Erkrankungen ist die Diffusionskapazität (DLCO) typischerweise erniedrigt?", options: [
        { text: "Lungenfibrose und Lungenemphysem", correct: true },
        { text: "Asthma bronchiale (akuter Anfall)", correct: false },
        { text: "Pneumonie (Lungenentzündung)", correct: false },
        { text: "Hyperventilation", correct: false }
      ], explanation: "Bei Lungenfibrose ist die Alveolarmembran verdickt (längere Diffusionsstrecke), beim Emphysem sind Alveolarsepten zerstört (kleinere Diffusionsfläche) – beides erniedrigt die DLCO. Asthma ist primär ein Obstruktionsproblem, nicht ein Diffusionsproblem." },
      { id: "at_ga_h6", type: "mc", question: "Was beschreibt die 'innere Atmung' im physiologischen Sinn?", options: [
        { text: "Gasaustausch zwischen Blut und Körperzellen im Gewebe", correct: true },
        { text: "Gasaustausch in der Lunge zwischen Alveolarluft und Blut", correct: false },
        { text: "Zellatmung (Glykolyse + Citratzyklus)", correct: false },
        { text: "Die Steuerung des Atemrhythmus durch das Atemzentrum", correct: false }
      ], explanation: "Innere Atmung = Gasaustausch Blut–Gewebe: Im Körpergewebe übersteigt der pO2 im Blut jenen in den Zellen (~20 mmHg) → O2 diffundiert in die Zellen. CO2 diffundiert in umgekehrter Richtung. Beide Prozesse (äussere und innere Atmung) laufen durch Diffusion ohne Energieverbrauch." }
    ],
    phase4Questions: [
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
      ]},
      { id: "at_ga_mc3", type: "mc", question: "Welche Aussagen zum Gasaustausch sind korrekt?", options: [
        { text: "O2 diffundiert aus den Alveolen (pO2 ~100 mmHg) ins Blut (pO2 ~40 mmHg)", correct: true },
        { text: "Äussere Atmung = Gasaustausch Lunge–Blut; innere Atmung = Gasaustausch Blut–Gewebe", correct: true },
        { text: "Der Gasaustausch erfordert ATP-abhängigen aktiven Transport", correct: false },
        { text: "Die DLCO ist bei Lungenfibrose erhöht", correct: false }
      ], explanation: "Gasaustausch erfolgt passiv durch Diffusion: O2 von Alveole ins Blut (pO2: 100→40 mmHg), CO2 umgekehrt. Äussere Atmung = Lunge, innere = Gewebe. DLCO ist bei Fibrose und Emphysem vermindert." }
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
      { id: "at_lv_h3", type: "true_false", statement: "Das inspiratorische Reservevolumen (2-3 l) und das exspiratorische Reservevolumen (1,5 l) sind gleich gross.", answer: false, explanation: "Das inspiratorische Reservevolumen (IRV, ca. 2,5 l) ist deutlich grösser als das exspiratorische Reservevolumen (ERV, ca. 1,5 l). Der Thorax kann durch Muskelkraft weiter eingeatmet als ausgeatmet werden, weshalb mehr Inspirationsreserve als Exspirationsreserve besteht." },
      { id: "at_lv_h4", type: "mc", question: "Was ist die Vitalkapazität und wie gross ist sie ungefähr?", options: [
        { text: "Maximale aus- und einatembare Luftmenge: ca. 4,5 l (= AZV + IRV + ERV)", correct: true },
        { text: "Die gesamte Lungenfüllmenge einschliesslich Residualvolumen: ca. 6 l", correct: false },
        { text: "Das normale Atemzugvolumen in Ruhe: ca. 500 ml", correct: false },
        { text: "Luftmenge nach normaler Ausatmung, die noch ausgeatmet werden kann: ca. 1,5 l", correct: false }
      ], explanation: "Vitalkapazität (VK) = AZV (500 ml) + IRV (2,5 l) + ERV (1,5 l) ≈ 4,5 l. Sie ist die grösste messbare Luftmenge und kann mit einem Spirometer direkt bestimmt werden. Das Residualvolumen ist in der VK NICHT enthalten; VK + RV = Totalkapazität (~6 l)." },
      { id: "at_lv_h5", type: "true_false", statement: "Das Atemzugvolumen (AZV) beträgt in Ruhe ca. 500 ml.", answer: true, explanation: "Das Atemzugvolumen ist die normale, ruhige Atemluftmenge pro Atemzug (~500 ml). Davon erreichen nur ca. 350 ml die Alveolen – die übrigen ~150 ml füllen den anatomischen Totraum (Trachea, Bronchien), wo kein Gasaustausch stattfindet." },
      { id: "at_lv_h6", type: "mc", question: "Welche der folgenden Aussagen zur Totalkapazität ist korrekt?", options: [
        { text: "Totalkapazität = Vitalkapazität (ca. 4,5 l) + Residualvolumen (ca. 1,5 l) = ca. 6 l", correct: true },
        { text: "Totalkapazität = nur Vitalkapazität, ohne Residualvolumen", correct: false },
        { text: "Totalkapazität ist kleiner als die Vitalkapazität", correct: false },
        { text: "Totalkapazität beträgt ca. 3 l beim gesunden Erwachsenen", correct: false }
      ], explanation: "Die Totalkapazität (TK, ca. 6 l) ist das maximale Fassungsvermögen der Lunge: TK = VK + RV. Da das Residualvolumen nicht ausgeatmet werden kann, übersteigt die TK die VK immer um das RV." }
    ],
    phase4Questions: [
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
      ]},
      { id: "at_lv_mc3", type: "mc", question: "Welche Aussagen zu Lungenvolumina sind korrekt?", options: [
        { text: "Vitalkapazität = AZV + IRV + ERV ≈ 4,5 l", correct: true },
        { text: "Totalkapazität = Vitalkapazität + Residualvolumen ≈ 6 l", correct: true },
        { text: "Das Residualvolumen kann durch maximale Ausatmung vollständig entleert werden", correct: false },
        { text: "Das IRV und ERV sind gleich gross (je ca. 1,5 l)", correct: false }
      ], explanation: "Die Volumina im Überblick: AZV ~500 ml, IRV ~2,5 l, ERV ~1,5 l, RV ~1,5 l; VK = AZV+IRV+ERV ~4,5 l; TK = VK+RV ~6 l. Das RV bleibt immer in der Lunge; IRV (~2,5 l) ist grösser als ERV (~1,5 l)." }
    ]
  }),
  makeDetailedPlant({
    id: "atemsteuerung",
    title: "Atemsteuerung",
    contextHint: "Studienbrief 1035 Strukturen und Funktion des Atmungssystems",
    phase1: {
      soil: { statement: "Die Atemsteuerung findet im Bereich der Medulla oblongata statt und erzeugt einen regelmässigen Grundrhythmus der Atmung.", answer: true, solution: "Das Atemzentrum in der Medulla oblongata ist eine Ansammlung von Nervenzellen, die autonom und rhythmisch Atemsignale an die Atemmuskulatur senden. Dieser Grundrhythmus läuft auch unbewusst weiter und wird nur bei bewusster Kontrolle (Sprechen, Tauchen) vom Kortex beeinflusst." },
      seed: { statement: "Der pH-Wert des Blutes hat keinen Einfluss auf die Atemsteuerung.", answer: false, solution: "Tatsächlich ist der pH-Wert eine der drei zentralen Regelgrössen der Atemsteuerung – neben dem O2- und dem CO2-Partialdruck. Steigt der CO2-Gehalt im Blut (Hyperkapnie), reagiert CO2 mit Wasser zu Kohlensäure (H2CO3), die in H+ und HCO3- dissoziiert; der pH sinkt, und zentrale Chemorezeptoren in der Medulla oblongata registrieren den Säureanstieg und steigern sofort Atemfrequenz und -tiefe. Periphere Chemorezeptoren in den Karotis- und Aortakörperchen reagieren zusätzlich auf sinkenden O2-Partialdruck (Hypoxämie) und verstärken den Atemantrieb. Eine Abnahme der Sauerstoffkonzentration führt daher zu einer Steigerung, nicht Verlangsamung der Atemfrequenz." },
      water: { statement: "Chemorezeptoren messen Sauerstoff- und Kohlendioxidkonzentration und leiten diese Informationen an das Atemzentrum weiter.", answer: true, solution: "Chemorezeptoren im Karotiskörperchen und in der Medulla oblongata messen kontinuierlich O2- und CO2-Partialdruck sowie pH-Wert des Blutes. Bei Abweichungen wird die Atemfrequenz und -tiefe über das Atemzentrum angepasst – ein effektiver Regelkreis zur Konstanterhaltung der Blutgase." }
    },
    harvestQuestions: [
      { id: "at_as_h1", type: "true_false", statement: "Ein erhöhter CO2-Gehalt im Blut (Hyperkapnie) führt zu einer Steigerung der Atemfrequenz.", answer: true, explanation: "CO2 ist der stärkste Atemantrieb: Hyperkapnie senkt den pH-Wert (durch H2CO3-Bildung), was zentrale Chemorezeptoren in der Medulla oblongata stimuliert und die Atemfrequenz sowie -tiefe steigert. Hypoxie wirkt ebenfalls atemsteigernd, aber mit schwacherem Effekt über periphere Chemorezeptoren." },
      { id: "at_as_h3", type: "true_false", statement: "Eine Abnahme der Sauerstoffkonzentration im Blut führt zu einer Verlangsamung der Atemfrequenz.", answer: false, explanation: "Eine Abnahme der Sauerstoffkonzentration (Hypoxämie) führt zu einer Steigerung, nicht Verlangsamung der Atemfrequenz. Periphere Chemorezeptoren in den Karotis- und Aortakörperchen reagieren auf sinkenden O2-Partialdruck und signalisieren dem Atemzentrum, mehr Atemarbeit zu leisten." },
      { id: "at_as_h2", type: "mc", question: "Welcher chemische Reiz löst beim Menschen den stärksten Atemantrieb aus?", options: [
        { text: "CO2-Anstieg im Blut (Hyperkapnie)", correct: true },
        { text: "O2-Abfall im Blut (Hypoxämie)", correct: false },
        { text: "Anstieg des Blut-pH-Werts (Alkalose)", correct: false },
        { text: "Temperaturabfall des Atemzentrums", correct: false }
      ], explanation: "CO2 ist der stärkste Atemreiz: Hyperkapnie senkt den pH (CO2+H2O→H2CO3→H++HCO3-), was zentrale Chemorezeptoren sofort stimuliert. O2-Mangel wirkt ebenfalls atemsteigernd, aber über periphere Chemorezeptoren mit schwächerem Effekt." },
      { id: "at_as_h4", type: "true_false", statement: "Zentrale Chemorezeptoren in der Medulla oblongata reagieren primär auf CO2-Änderungen und pH-Schwankungen im Liquor cerebrospinalis.", answer: true, explanation: "Zentrale Chemorezeptoren in der Medulla oblongata messen H+-Konzentration im Liquor, die CO2-abhängig ist: CO2 diffundiert durch die Blut-Hirn-Schranke und bildet im Liquor H+. Periphere Chemorezeptoren (Karotis- und Aortakörperchen) reagieren dagegen direkt auf O2-Partialdruck im Blut." },
      { id: "at_as_h5", type: "mc", question: "Wo befinden sich die peripheren Chemorezeptoren, die auf sinkenden O2-Partialdruck reagieren?", options: [
        { text: "In den Karotis- und Aortakörperchen", correct: true },
        { text: "In der Medulla oblongata", correct: false },
        { text: "In der Lunge (Dehnungsrezeptoren)", correct: false },
        { text: "Im Hypothalamus", correct: false }
      ], explanation: "Periphere Chemorezeptoren: Glomus caroticum (Karotiskörperchen) an der Karotisbifurkation und Glomus aorticum (Aortakörperchen) am Aortenbogen. Sie reagieren auf pO2-Abfall, pCO2-Anstieg und pH-Senkung und senden Signale über N. glossopharyngeus (IX) und N. vagus (X) an das Atemzentrum." },
      { id: "at_as_h6", type: "mc", question: "In welchem Hirnabschnitt liegt das Atemzentrum, das den Atemrhythmus erzeugt?", options: [
        { text: "Medulla oblongata (verlängertes Mark)", correct: true },
        { text: "Grosshirn (Cortex cerebri)", correct: false },
        { text: "Kleinhirn (Cerebellum)", correct: false },
        { text: "Hypothalamus", correct: false }
      ], explanation: "Das Atemzentrum in der Medulla oblongata erzeugt autonom den Atemrhythmus und kann nicht dauerhaft bewusst übersteuert werden – nach kurzer Zeit erzwingt der steigende CO2-Antrieb die Atmung wieder. Der präBötzinger-Komplex gilt als zentraler Rhythmusgenerator." }
    ],
    phase4Questions: [
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
      ]},
      { id: "at_as_mc3", type: "mc", question: "Welche Aussagen zur chemischen Atemsteuerung sind korrekt?", options: [
        { text: "Zentrale Chemorezeptoren in der Medulla reagieren auf CO2 und pH im Liquor", correct: true },
        { text: "Periphere Chemorezeptoren in Karotis- und Aortakörperchen reagieren auf O2-Mangel", correct: true },
        { text: "Das Atemzentrum liegt im Grosshirn und kann dauerhaft bewusst übersteuert werden", correct: false },
        { text: "CO2-Anstieg hemmt das Atemzentrum", correct: false }
      ], explanation: "Zusammenfassung: Zentrale Chemorezeptoren (Medulla) → CO2/pH; periphere Chemorezeptoren (Karotis-/Aortakörperchen) → O2. Das Atemzentrum liegt in der Medulla oblongata und erzeugt autonom den Atemrhythmus. Hyperkapnie steigert – nicht hemmt – den Atemantrieb." }
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
    phase4Questions: [
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
      seed: { statement: "Atemsteuerung und Nervengewebe sind vollständig voneinander unabhängig: das Atemzentrum arbeitet ohne nervale Strukturen.", answer: false, solution: "Das Atemzentrum besteht aus Nervenzellen und leitet seine rhythmischen Impulse ausschliesslich über nervale Strukturen an die Atemmuskulatur weiter. Die wichtigste efferente Bahn ist der N. phrenicus, der aus den Rückenmarkssegmenten C3, C4 und C5 entspringt und das Zwerchfell innerviert. Eine Rückenmarksverletzung oberhalb C3 unterbricht diese Bahn vollständig, sodass das Atemzentrum keine Impulse mehr zum Zwerchfell senden kann – Beatmung wird dann lebensnotwendig, obwohl das Atemzentrum selbst weiterarbeitet." },
      water: { statement: "Dehnungsrezeptoren in den Alveolen leiten Signale über afferente Nervenfasern an das Atemzentrum weiter, was den Hering-Breuer-Reflex auslöst.", answer: true, solution: "Genau. Dehnungsrezeptoren in der Lunge nehmen mechanische Reize auf und leiten sie über afferente Nervenfasern an das Atemzentrum in der Medulla oblongata weiter, wo die Inspiration reflektorisch gehemmt wird (Hering-Breuer-Reflex)." }
    },
    harvestQuestions: [
      { id: "hyb_nA_h1", type: "true_false", statement: "Der Zellaufbau der Nervenzelle ist für die Funktionsdeutung relevant.", answer: true, explanation: "Dendriten empfangen Signale, der Axonhügel integriert sie, das Axon leitet Aktionspotenziale weiter – diese Zellstruktur erklärt, wie das Atemzentrum rhythmische Impulse generiert und an die Atemmuskulatur weiterleitet. Ohne das Verständnis der Nervenzellarchitektur bleibt die Atemsteuerung unverstehbar." },
      { id: "hyb_nA_h2", type: "true_false", statement: "Der Hering-Breuer-Reflex begrenzt das Inspirationsvolumen und verhindert die Überdehnung der Lunge.", answer: true, explanation: "Beim Hering-Breuer-Reflex messen Dehnungsrezeptoren in der Bronchialwand das Lungenvolumen. Bei ausreichender Dehnung senden sie Signale über afferente Vagusfasern an das Atemzentrum, das daraufhin die Inspiration beendet und die Exspiration einleitet. Der Reflex schützt die Lunge vor Überdehnung." },
      { id: "hyb_nA_h3", type: "true_false", statement: "Das Atemzentrum in der Medulla oblongata nutzt Nervenzellen zur Weiterleitung von Atemimpulsen an die Diaphragmamuskulatur.", answer: true, explanation: "Die Motoneuronen des Atemzentrums senden ihre Impulse über den N. phrenicus (C3-C5) zum Diaphragma. Bei Rückenmarksverletzungen oberhalb C3 ist die Atemmuskulatur vollständig gelahmt und Beatmung wird lebensnotwendig – ein direktes Beispiel für die klinische Bedeutung dieser nervalen Verbindung." }
    ],
    phase4Questions: [
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
      soil: { statement: "Blut als spezialisiertes Gewebe ist das Transportmedium, das nach dem Gasaustausch in den Alveolen den Sauerstoff zu den Körperzellen befördert.", answer: true, solution: "Blut ist ein spezialisiertes flüssiges Bindegewebe, das aus Plasma und zellulären Anteilen besteht: Erythrozyten machen mit ca. 45 % des Blutvolumens (Hämatokrit) den grössten Zellanteil aus; Leukozyten und Thrombozyten zusammen weniger als 1 %. Die Erythrozyten binden in den Lungenalveolen Sauerstoff an ihr Hämoglobin und transportieren ihn zu den Körperzellen – ca. 97 % des gesamten O2-Gehalts des Blutes sind an Hämoglobin gebunden, nur ca. 3 % physikalisch im Plasma gelöst. Die Oxyhämoglobin-Dissoziationskurve beschreibt sigmoidförmig, wie Hämoglobin in der Lunge (hoher pO2) O2 aufnimmt und im Gewebe (niedriger pO2, niedrigerer pH, höhere Temperatur) wieder abgibt." },
      seed: { statement: "Sauerstoff wird nach dem Gasaustausch direkt im Blutplasma gelöst transportiert, ohne Beteiligung von Blutzellen.", answer: false, solution: "Der grösste Teil des Sauerstoffs wird an Hämoglobin in den Erythrozyten gebunden, nicht frei im Plasma gelöst." },
      water: { statement: "Der Gasaustausch in den Alveolen und der anschliessende Sauerstofftransport durch Erythrozyten bilden zusammen die äussere Atmung.", answer: true, solution: "Die äussere Atmung umfasst Gasaustausch in der Lunge und Transport durch das Blutgewebe. Für einen effizienten alveolären Gasaustausch sind drei Voraussetzungen gleichzeitig notwendig: Ventilation (V – Frischluft erreicht die Alveolen), Diffusion (D – Gase passieren die Alveolarmembran entlang von Partialdruckgradienten) und Perfusion (Q – Blut umspült die Alveolen). Ist eine dieser drei Grössen gestört – z.B. durch Atelektase (fehlende Ventilation), Lungenfibrose (gestörte Diffusion) oder Lungenembolie (fehlende Perfusion) – sinkt die O2-Aufnahme ins Blut erheblich." }
    },
    harvestQuestions: [
      { id: "hyb_sB_h1", type: "true_false", statement: "Auch für Blut sind Zellzusammensetzung und funktionelle Anteile relevant.", answer: true, explanation: "Blut besteht aus Plasma und zellulären Anteilen (Erythrozyten ca. 45%, Leukozyten und Thrombozyten <1%). Die Erythrozyten mit ihrem Hämoglobin sind ausschliesslich für den O2-Transport zuständig. Ohne diese zellulare Differenzierung bleibt die Transportfunktion des Blutes unerklärt." },
      { id: "hyb_sB_h2", type: "true_false", statement: "Für den Übertritt von Sauerstoff aus der Luft in das Blut sind Ventilation, Diffusion und Perfusion entscheidend.", answer: true, explanation: "Drei Voraussetzungen für effizienten Gasaustausch: V = Ventilation (Luft muss die Alveolen erreichen), Diffusion (Gasaustausch durch die Membran), Q = Perfusion (Blut muss die Alveolen umspülen). Störungen in einer dieser Komponenten reduzieren die O2-Aufnahme erheblich." },
      { id: "hyb_sB_h3", type: "true_false", statement: "Erythrozyten sind der zelluläre Träger des Sauerstoffs im Blut nach dem Gasaustausch in den Alveolen.", answer: true, explanation: "Erythrozyten binden O2 an Hämoglobin (je Hämoglobin-Molekül 4 O2). Nur ca. 3% des O2 werden physikalisch im Plasma gelöst. Der Hämoglobin-Transport ist damit etwa 30-mal effizienter. Die Oxyhämoglobin-Dissoziationskurve beschreibt, wie Hämoglobin O2 in der Lunge aufnimmt und im Gewebe abgibt." }
    ],
    phase4Questions: [
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
    phase4Questions: [
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
  }), { locked: true, sources: ["histologie_1032::oberflächenepithel", "atmungssystem_1035::trachea"] }),

  Object.assign(makeDetailedPlant({
    id: "debug_pebes",
    title: "Debug Pebes",
    contextHint: "Debug Hybrid",
    phase1: {
      soil: {
        statement: "Pebes ist ein Hybrid aus Debug Eins und Debug Zwei.",
        answer: true,
        solution: "Pebes ist ein Debug-Hybrid, entstanden aus Debug Eins (pinker Stamm, weiße Früchte) und Debug Zwei (schwarzer Stamm, grüne Früchte). Hybride entstehen im Labor, sobald beide Elternpflanzen mindestens einmal geerntet wurden."
      },
      seed: {
        statement: "Hybride können im Labor entdeckt werden.",
        answer: true,
        solution: "Hybride werden im Labor synthetisiert, sobald beide Elternpflanzen mindestens einmal geerntet wurden. Der Hybrid übernimmt den Stamm vom ersten Elternteil und die Früchte vom zweiten."
      },
      water: {
        statement: "Hybridpflanzen vereinen die Stammfarbe des ersten und die Fruchtfarbe des zweiten Elternteils.",
        answer: true,
        solution: "Bei Hybridpflanzen: Stammfarbe kommt vom ersten Elternteil, Fruchtfarbe vom zweiten. Bei Pebes: Stamm von Debug Eins (pink), Früchte von Debug Zwei (grün). Das ist eine Besonderheit des Kreuzungssystems."
      }
    },
    harvestQuestions: [
      {
        id: "dp_h1",
        type: "true_false",
        statement: "Pebes ist ein Hybrid aus Debug Eins und Debug Zwei.",
        answer: true,
        explanation: "Korrekt. Pebes ist ein Debug-Hybrid aus beiden Testpflanzen."
      },
      {
        id: "dp_h2",
        type: "mc",
        question: "Wo werden Hybridpflanzen entdeckt?",
        options: [
          { text: "Im Labor, nach Ernte beider Elternpflanzen", correct: true },
          { text: "Im Pflanzenkatalog nach dem Freischalten", correct: false },
          { text: "Automatisch zu Spielbeginn", correct: false },
          { text: "Im Restaurant nach 10 Bestellungen", correct: false }
        ],
        explanation: "Hybride werden im Labor entdeckt, sobald beide Elternpflanzen mindestens einmal geerntet wurden."
      },
      {
        id: "dp_h3",
        type: "true_false",
        statement: "Pebes übernimmt den Stamm von Debug Eins und die Früchte von Debug Zwei.",
        answer: true,
        explanation: "Korrekt. Stamm vom ersten Elternteil (Debug Eins = pink), Früchte vom zweiten (Debug Zwei = grün)."
      }
    ],
    phase4Questions: [
      {
        id: "dp_mc1",
        type: "mc",
        question: "Welche Aussagen über Hybridpflanzen sind korrekt?",
        options: [
          { text: "Sie entstehen im Labor", correct: true },
          { text: "Sie kombinieren Eigenschaften beider Elternpflanzen", correct: true },
          { text: "Sie ersetzen die Elternpflanzen dauerhaft", correct: false },
          { text: "Sie haben keine harvestQuestions", correct: false }
        ]
      },
      {
        id: "dp_mc2",
        type: "mc",
        question: "Was trifft auf Debug Pebes zu?",
        options: [
          { text: "Hybrid aus Debug Eins und Debug Zwei", correct: true },
          { text: "Wird im Labor entdeckt", correct: true },
          { text: "Wird automatisch zu Spielbeginn hinzugefügt", correct: false },
          { text: "Hat keine Elternpflanzen", correct: false }
        ]
      }
    ]
  }), { sources: ["debug::debug_eins", "debug::debug_zwei"] })
];

const LABEL_EXERCISES = [
  {
    id: "wirbelquerschnitt",
    title: "Querschnitt eines Wirbels",
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/knochenlehre_figure_8.png",
    bedId: "knochenlehre_1033",
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
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/atmungssystem_figure_5.png",
    bedId: "atmungssystem_1035",
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
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/histologie_figure_5.png",
    bedId: "histologie_1032",
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
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/atmungssystem_figure_7.png",
    bedId: "atmungssystem_1035",
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
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/atmungssystem_figure_9.png",
    bedId: "atmungssystem_1035",
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
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/atmungssystem_figure_11.png",
    bedId: "atmungssystem_1035",
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
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/histologie_figure_7.png",
    bedId: "histologie_1032",
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
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/histologie_figure_20.png",
    bedId: "histologie_1032",
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
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/knochenlehre_figure_10.png",
    bedId: "knochenlehre_1033",
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
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/knochenlehre_figure_11.png",
    bedId: "knochenlehre_1033",
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
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/knochenlehre_figure_12.png",
    bedId: "knochenlehre_1033",
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
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/knochenlehre_figure_14.png",
    bedId: "knochenlehre_1033",
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
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/knochenlehre_figure_17.png",
    bedId: "knochenlehre_1033",
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
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/muskellehre_figure_10.png",
    bedId: "muskellehre_1034",
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
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/muskellehre_figure_12.png",
    bedId: "muskellehre_1034",
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
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/muskellehre_figure_13.png",
    bedId: "muskellehre_1034",
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
    passRate: 0.6,
    diagramType: "image",
    imagePath: "assets/diagrams/muskellehre_figure_14.png",
    bedId: "muskellehre_1034",
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

const DEBUG_PLANTS = [
  makeDetailedPlant({
    id: "debug_eins",
    title: "Debug Eins",
    contextHint: "Debug Beet",
    colorOverride: { stemHi: "#ff44cc", stemLo: "#cc0099", fruitHi: "#ffffff", fruitLo: "#cccccc" },
    phase1: {
      soil: {
        statement: "Du lebst.",
        answer: true,
        solution: "Du lebst. Das ist die wichtigste Voraussetzung für dieses Spiel. Debug Eins ist eine Testpflanze mit pinkem Stamm und weißen Früchten."
      },
      seed: {
        statement: "Diese Pflanze ist eine Testpflanze.",
        answer: true,
        solution: "Diese Pflanze ist eine Testpflanze. Sie stellt sicher, dass alle Spielfunktionen korrekt funktionieren – Phase 1, Phase 2, Ernte und Restaurant."
      },
      water: {
        statement: "Debug bedeutet: Spielmechaniken testen.",
        answer: true,
        solution: "Debug bedeutet Fehler suchen und beheben. Alle Fragen im Debug-Beet sind einfach und dienen ausschließlich dem Testen. Inhaltlich sind sie nicht prüfungsrelevant."
      }
    },
    phase2: [
      { type: "water", text: "Testen", readinessGain: 24 },
      { type: "fertilize", text: "Weiter testen", readinessGain: 22 },
      { type: "trim", text: "Fertig testen", readinessGain: 20 }
    ],
    harvestQuestions: [
      {
        id: "de1_h1",
        type: "true_false",
        statement: "Du lebst.",
        answer: true,
        explanation: "Ja. Du lebst. Debug Eins bestätigt das."
      },
      {
        id: "de1_h2",
        type: "true_false",
        statement: "Debug Eins hat einen pinken Stamm.",
        answer: true,
        explanation: "Korrekt. Debug Eins: pinker Stamm, weiße Früchte."
      },
      {
        id: "de1_h3",
        type: "mc",
        question: "Was ist der Zweck des Debug-Beetes?",
        options: [
          { text: "Spielfunktionen testen", correct: true },
          { text: "Anatomie des Heilpraktikers lernen", correct: false },
          { text: "Den Garten dauerhaft belegen", correct: false },
          { text: "Das Restaurant blockieren", correct: false }
        ],
        explanation: "Das Debug-Beet dient ausschließlich dem Testen aller Spielmechaniken."
      }
    ],
    phase4Questions: [
      {
        id: "de1_mc1",
        type: "mc",
        question: "Welche Aussagen über das Debug-Beet sind korrekt?",
        options: [
          { text: "Es dient dem Testen von Spielfunktionen", correct: true },
          { text: "Es enthält Testpflanzen ohne Prüfungsrelevanz", correct: true },
          { text: "Es ist Teil des Heilpraktiker-Curriculums", correct: false },
          { text: "Es enthält nur eine Pflanze", correct: false }
        ]
      },
      {
        id: "de1_mc2",
        type: "mc",
        question: "Was trifft auf Debug Eins zu?",
        options: [
          { text: "Pinker Stamm und weiße Früchte", correct: true },
          { text: "Sie ist eine Testpflanze", correct: true },
          { text: "Schwarzer Stamm und grüne Früchte", correct: false },
          { text: "Sie wächst im Labor", correct: false }
        ]
      }
    ]
  }),
  makeDetailedPlant({
    id: "debug_zwei",
    title: "Debug Zwei",
    contextHint: "Debug Beet",
    colorOverride: { stemHi: "#444444", stemLo: "#111111", fruitHi: "#44ff44", fruitLo: "#118811" },
    phase1: {
      soil: {
        statement: "Du bist bereit.",
        answer: true,
        solution: "Du bist bereit. Debug Zwei ist die zweite Testpflanze im Debug-Beet – erkennbar an ihrem schwarzen Stamm und den grünen Früchten."
      },
      seed: {
        statement: "Debug Zwei hat grüne Früchte.",
        answer: true,
        solution: "Debug Zwei hat einen schwarzen Stamm und grüne Früchte. Diese Farben unterscheiden sie klar von Debug Eins (pinker Stamm, weiße Früchte)."
      },
      water: {
        statement: "Alle Debug-Pflanzen dienen dem Testen der Spielmechaniken.",
        answer: true,
        solution: "Alle Debug-Pflanzen dienen ausschließlich dem Testen. Sie haben keine prüfungsrelevanten Inhalte. Das Debug-Beet eignet sich besonders, um Phase 1, Phase 2, Ernte und das Restaurant auszuprobieren."
      }
    },
    phase2: [
      { type: "water", text: "Testen", readinessGain: 24 },
      { type: "fertilize", text: "Weiter testen", readinessGain: 22 },
      { type: "trim", text: "Fertig testen", readinessGain: 20 }
    ],
    harvestQuestions: [
      {
        id: "de2_h1",
        type: "true_false",
        statement: "Du bist bereit.",
        answer: true,
        explanation: "Ja. Du bist bereit. Debug Zwei bestätigt das."
      },
      {
        id: "de2_h2",
        type: "true_false",
        statement: "Debug Zwei hat grüne Früchte.",
        answer: true,
        explanation: "Korrekt. Debug Zwei: schwarzer Stamm, grüne Früchte."
      },
      {
        id: "de2_h3",
        type: "mc",
        question: "Welche Farben hat Debug Zwei?",
        options: [
          { text: "Schwarzer Stamm, grüne Früchte", correct: true },
          { text: "Pinker Stamm, weiße Früchte", correct: false },
          { text: "Brauner Stamm, rote Früchte", correct: false },
          { text: "Grüner Stamm, gelbe Früchte", correct: false }
        ],
        explanation: "Debug Zwei: schwarzer Stamm, grüne Früchte. Debug Eins: pinker Stamm, weiße Früchte."
      }
    ],
    phase4Questions: [
      {
        id: "de2_mc1",
        type: "mc",
        question: "Welche Aussagen über Debug Zwei sind korrekt?",
        options: [
          { text: "Sie hat einen schwarzen Stamm", correct: true },
          { text: "Sie hat grüne Früchte", correct: true },
          { text: "Sie hat einen pinken Stamm", correct: false },
          { text: "Sie ist prüfungsrelevant", correct: false }
        ]
      },
      {
        id: "de2_mc2",
        type: "mc",
        question: "Was trifft auf das Debug-Beet zu?",
        options: [
          { text: "Es enthält zwei Testpflanzen", correct: true },
          { text: "Es dient dem Testen aller Spielmechaniken", correct: true },
          { text: "Es gehört zum Heilpraktiker-Curriculum", correct: false },
          { text: "Es hat keine phase4Questions", correct: false }
        ]
      }
    ]
  })
];

const HERZKREISLAUF_1036_PLANTS = [

  makeDetailedPlant({
    id: "herz_aufbau",
    title: "Herz: Aufbau und Wandschichten",
    contextHint: "Studienbrief 1036 Das Herz – Aufbau",
    phase1: {
      soil: {
        statement: "Das Herz liegt im Mediastinum und ist leicht nach links verlagert.",
        answer: true,
        solution: "Das Herz befindet sich im Mediastinum (Mittelfell) des Brustkorbs, zwischen den beiden Lungenflügeln. Es ist leicht nach links verlagert, weshalb der Herzspitzenstoß im 5. Interkostalraum links der Medioklavikularlinie tastbar ist. Das Herz liegt auf dem Zwerchfell auf."
      },
      seed: {
        statement: "Das Myokard besteht aus glatter Muskulatur wie die Darmwand.",
        answer: false,
        solution: "Das Myokard besteht aus spezieller Herzmuskulatur, die sich von glatter und quergestreifter Skelettmuskulatur unterscheidet. Herzmuskelzellen sind quergestreift, aber unwillkürlich steuerbar. Sie sind über sogenannte Glanzstreifen (Disci intercalares) verbunden, die eine schnelle elektrische Kopplung ermöglichen – wichtig für die koordinierte Kontraktion."
      },
      water: {
        statement: "Das Perikard umgibt das Herz und enthält Flüssigkeit zur Reibungsminderung.",
        answer: true,
        solution: "Das Herz ist von drei Schichten umgeben: Epikard (äußerste Schicht, liegt dem Myokard auf), Myokard (Herzmuskel, die eigentliche Arbeitsschicht) und Endokard (innerste Schicht, kleidet die Hohlräume aus). Das Perikard (Herzbeutel) umschließt das Herz von außen. Zwischen Epikard und Perikard befindet sich ein Spaltraum mit Flüssigkeit (ca. 20–50 ml), die Reibung bei der Herzaktion vermindert. Das Herz gewinnt Energie bevorzugt aus der Verbrennung von Fettsäuren."
      }
    },
    harvestQuestions: [
      {
        id: "herz_aufbau_h1",
        type: "mc",
        question: "Wo liegt der Herzspitzenstoß physiologischerweise?",
        options: [
          { text: "5. ICR links der Medioklavikularlinie", correct: true },
          { text: "3. ICR links des Sternums", correct: false },
          { text: "5. ICR rechts der Medioklavikularlinie", correct: false },
          { text: "4. ICR in der Medioklavikularlinie", correct: false }
        ],
        explanation: "Der Herzspitzenstoß ist im 5. Interkostalraum (ICR) links der Medioklavikularlinie tastbar, da das Herz leicht nach links verlagert ist."
      },
      {
        id: "herz_aufbau_h2",
        type: "true_false",
        statement: "Glanzstreifen (Disci intercalares) verbinden Herzmuskelzellen elektrisch und ermöglichen so koordinierte Kontraktion.",
        answer: true,
        explanation: "Glanzstreifen sind Zell-Zell-Verbindungen zwischen Herzmuskelzellen, die eine schnelle elektrische Kopplung ermöglichen und das Herz funktionell wie ein Syncytium arbeiten lassen."
      },
      {
        id: "herz_aufbau_h3",
        type: "mc",
        question: "Welche Schicht kleidet die Hohlräume des Herzens von innen aus?",
        options: [
          { text: "Endokard", correct: true },
          { text: "Myokard", correct: false },
          { text: "Epikard", correct: false },
          { text: "Perikard", correct: false }
        ],
        explanation: "Das Endokard ist die innerste Herzschicht und kleidet alle Hohlräume (Vorhöfe und Kammern) von innen aus."
      },
      {
        id: "herz_aufbau_h4",
        type: "mc",
        question: "Aus welchem Energiesubstrat gewinnt das Herz bevorzugt seine Energie?",
        options: [
          { text: "Fettsäuren", correct: true },
          { text: "Glukose", correct: false },
          { text: "Aminosäuren", correct: false },
          { text: "Ketonkörper", correct: false }
        ],
        explanation: "Das Herz ist ein Organ mit sehr hohem Energiebedarf und gewinnt bevorzugt (ca. 60–70 %) Energie durch Oxidation von Fettsäuren."
      },
      {
        id: "herz_aufbau_h5",
        type: "true_false",
        statement: "Das Perikard enthält einen Spaltraum mit Flüssigkeit, der Reibung bei der Herzaktion vermindert.",
        answer: true,
        explanation: "Im Perikardspalt zwischen Epikard und Perikard befinden sich ca. 20–50 ml seröse Flüssigkeit als Gleitfilm."
      }
    ],
    phase4Questions: [
      {
        id: "herz_aufbau_mc1",
        type: "mc",
        question: "Welche Aussagen zu Aufbau und Eigenschaften des Herzens sind korrekt?",
        options: [
          { text: "Das Myokard besteht aus unwillkürlich steuerbarer, quergestreifter Herzmuskulatur", correct: true },
          { text: "Glanzstreifen ermöglichen die elektrische Kopplung benachbarter Herzmuskelzellen", correct: true },
          { text: "Das Epikard kleidet die Hohlräume des Herzens aus", correct: false },
          { text: "Das Herz liegt vollständig in der rechten Brusthälfte", correct: false }
        ]
      },
      {
        id: "herz_aufbau_mc2",
        type: "mc",
        question: "Was trifft auf die Schichten des Herzens zu?",
        options: [
          { text: "Endokard → Myokard → Epikard → Perikard (von innen nach außen)", correct: true },
          { text: "Das Perikard liegt dem Myokard direkt auf", correct: false },
          { text: "Zwischen Epikard und Perikard befindet sich ein flüssigkeitsgefüllter Spaltraum", correct: true },
          { text: "Das Myokard ist die äußerste Herzschicht", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "herzklappen_herzaktion",
    title: "Herzklappen und Herzaktion",
    contextHint: "Studienbrief 1036 Das Herz – Klappen und Herzaktion",
    phase1: {
      soil: {
        statement: "Die Mitralklappe liegt zwischen linkem Vorhof und linker Kammer und hat zwei Segel.",
        answer: true,
        solution: "Es gibt zwei Typen von Herzklappen: Segelklappen (AV-Klappen) zwischen Vorhöfen und Kammern, und Taschenklappen zwischen Kammern und den großen Arterien. Die Trikuspidalklappe (3 Segel) liegt rechts, die Mitralklappe (2 Segel, Bikuspidalklappe) liegt links zwischen Vorhof und Kammer. Beide AV-Klappen verhindern den Rückfluss von Kammer in Vorhof während der Systole und werden durch Sehnenfäden (Chordae tendineae) gehalten."
      },
      seed: {
        statement: "Die Aortenklappe ist eine Segelklappe, die zwischen linker Kammer und Aorta liegt.",
        answer: false,
        solution: "Die Aortenklappe und die Pulmonalklappe sind Taschenklappen (Semilunarklappen), keine Segelklappen. Sie bestehen aus drei halbmondförmigen Taschen und verhindern den Rückfluss von Blut aus der Aorta bzw. dem Truncus pulmonalis in die Kammern während der Diastole. Die Pulmonalklappe liegt zwischen rechter Kammer und Truncus pulmonalis, die Aortenklappe zwischen linker Kammer und Aorta."
      },
      water: {
        statement: "Das Schlagvolumen des Herzens beträgt in Ruhe ca. 70 ml.",
        answer: true,
        solution: "Ein Herzzyklus besteht aus Systole (Kontraktion/Austreibungsphase) und Diastole (Erschlaffung/Füllungsphase). In Ruhe beträgt das Schlagvolumen ca. 70 ml, die Herzfrequenz ca. 70/min, das Herzminutenvolumen also ca. 5 l/min. Der 1. Herzton entsteht beim Schluss der AV-Klappen (Beginn Systole), der 2. Herzton beim Schluss der Taschenklappen (Beginn Diastole)."
      }
    },
    harvestQuestions: [
      {
        id: "herzklappen_h1",
        type: "mc",
        question: "Welche Klappe liegt zwischen rechtem Vorhof und rechter Kammer?",
        options: [
          { text: "Trikuspidalklappe", correct: true },
          { text: "Mitralklappe", correct: false },
          { text: "Pulmonalklappe", correct: false },
          { text: "Aortenklappe", correct: false }
        ],
        explanation: "Die Trikuspidalklappe (3 Segel) ist die AV-Klappe auf der rechten Herzseite, zwischen rechtem Vorhof und rechter Kammer."
      },
      {
        id: "herzklappen_h2",
        type: "true_false",
        statement: "Der 1. Herzton entsteht beim Schluss der Taschenklappen zu Beginn der Diastole.",
        answer: false,
        explanation: "Der 1. Herzton entsteht beim Schluss der AV-Klappen zu Beginn der Systole. Der 2. Herzton entsteht beim Schluss der Taschenklappen (Aorten- und Pulmonalklappe) zu Beginn der Diastole."
      },
      {
        id: "herzklappen_h3",
        type: "mc",
        question: "Was sind Chordae tendineae?",
        options: [
          { text: "Sehnenfäden, die AV-Klappen am Umstülpen hindern", correct: true },
          { text: "Bindegewebsfasern im Perikard", correct: false },
          { text: "Leitungsstrukturen des Erregungsleitsystems", correct: false },
          { text: "Fasern, die Taschenklappen befestigen", correct: false }
        ],
        explanation: "Chordae tendineae (Sehnenfäden) verbinden die Segelklappen mit den Papillarmuskeln der Kammerwand und verhindern so das Umstülpen der AV-Klappen in die Vorhöfe während der Systole."
      },
      {
        id: "herzklappen_h4",
        type: "mc",
        question: "Wie groß ist das Herzminutenvolumen in Ruhe bei normaler Herzfrequenz und normalem Schlagvolumen?",
        options: [
          { text: "Ca. 5 l/min", correct: true },
          { text: "Ca. 2 l/min", correct: false },
          { text: "Ca. 10 l/min", correct: false },
          { text: "Ca. 7 l/min", correct: false }
        ],
        explanation: "HMV = Schlagvolumen × Herzfrequenz = 70 ml × 70/min ≈ 5 l/min in Ruhe."
      },
      {
        id: "herzklappen_h5",
        type: "true_false",
        statement: "Die Pulmonalklappe ist eine Taschenklappe und verhindert den Rückfluss von Blut aus dem Truncus pulmonalis in die rechte Kammer.",
        answer: true,
        explanation: "Pulmonalklappe und Aortenklappe sind Taschenklappen (Semilunarklappen). Sie öffnen sich bei Druckanstieg in der Kammer und schließen sich bei Druckabfall, um Rückfluss in die Diastole zu verhindern."
      }
    ],
    phase4Questions: [
      {
        id: "herzklappen_mc1",
        type: "mc",
        question: "Welche Aussagen zu den Herzklappen sind korrekt?",
        options: [
          { text: "Trikuspidal- und Mitralklappe sind AV-Klappen (Segelklappen)", correct: true },
          { text: "Die Mitralklappe hat drei Segel", correct: false },
          { text: "Aorten- und Pulmonalklappe sind Taschenklappen", correct: true },
          { text: "Chordae tendineae verhindern das Umstülpen der Taschenklappen", correct: false }
        ]
      },
      {
        id: "herzklappen_mc2",
        type: "mc",
        question: "Was trifft auf den Herzzyklus zu?",
        options: [
          { text: "Systole = Kontraktion/Austreibungsphase", correct: true },
          { text: "Der 2. Herzton markiert den Beginn der Diastole", correct: true },
          { text: "Das Schlagvolumen beträgt in Ruhe ca. 150 ml", correct: false },
          { text: "Der 1. Herzton entsteht beim Schluss der Taschenklappen", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "erregungsleitsystem",
    title: "Erregungsbildung und -leitung",
    contextHint: "Studienbrief 1036 Das Herz – Erregungsleitsystem",
    phase1: {
      soil: {
        statement: "Der Sinusknoten ist der primäre Schrittmacher des Herzens mit einer Eigenfrequenz von 60–80/min.",
        answer: true,
        solution: "Das Erregungsleitsystem des Herzens besteht aus spezialisierten Muskelzellen. Der Sinusknoten liegt im rechten Vorhof nahe der Einmündung der V. cava superior und ist der primäre Schrittmacher mit einer Eigenfrequenz von 60–80/min. Von dort breitet sich die Erregung über die Vorhöfe aus und erreicht den AV-Knoten."
      },
      seed: {
        statement: "Der AV-Knoten überträgt die Erregung mit einer kurzen Verzögerung auf die Kammern.",
        answer: true,
        solution: "Der AV-Knoten (Atrioventrikularknoten) liegt im unteren rechten Vorhof und ist die einzige elektrische Verbindung zwischen Vorhöfen und Kammern. Er verzögert die Erregungsleitung bewusst, damit die Vorhöfe sich vollständig kontrahieren können, bevor die Kammern aktiviert werden. Die Eigenfrequenz des AV-Knotens beträgt 40–50/min (sekundärer Schrittmacher)."
      },
      water: {
        statement: "Das His-Bündel teilt sich in den Tawara-Schenkeln auf und gibt die Erregung über Purkinje-Fasern an das Arbeitsmyokard weiter.",
        answer: true,
        solution: "Vom AV-Knoten zieht das His-Bündel zum Kammerseptum und teilt sich in den rechten und linken Tawara-Schenkel. Diese enden in den Purkinje-Fasern, die die Erregung rasch im gesamten Arbeitsmyokard verteilen. Der Kammereigenrhythmus (tertiärer Schrittmacher) liegt bei 20–40/min — er übernimmt nur bei Ausfall der übergeordneten Schrittmacher."
      }
    },
    harvestQuestions: [
      {
        id: "erregung_h1",
        type: "mc",
        question: "Welche Eigenfrequenz hat der AV-Knoten als sekundärer Schrittmacher?",
        options: [
          { text: "40–50/min", correct: true },
          { text: "60–80/min", correct: false },
          { text: "20–40/min", correct: false },
          { text: "100–120/min", correct: false }
        ],
        explanation: "Der AV-Knoten ist sekundärer Schrittmacher mit 40–50/min. Primär: Sinusknoten 60–80/min. Tertiär: Kammermuskulatur 20–40/min."
      },
      {
        id: "erregung_h2",
        type: "true_false",
        statement: "Der Sinusknoten liegt im linken Vorhof.",
        answer: false,
        explanation: "Der Sinusknoten liegt im rechten Vorhof, nahe der Einmündung der V. cava superior."
      },
      {
        id: "erregung_h3",
        type: "mc",
        question: "Warum verzögert der AV-Knoten die Erregungsleitung?",
        options: [
          { text: "Damit die Vorhöfe sich vollständig kontrahieren können, bevor die Kammern aktiviert werden", correct: true },
          { text: "Um die Herzfrequenz zu erhöhen", correct: false },
          { text: "Um den Sinusknoten vor Überlastung zu schützen", correct: false },
          { text: "Um die Purkinje-Fasern zu synchronisieren", correct: false }
        ],
        explanation: "Die AV-Verzögerung stellt sicher, dass die Vorhöfe ihr Blut vollständig in die Kammern gepumpt haben, bevor die Kammern kontrahieren."
      },
      {
        id: "erregung_h4",
        type: "mc",
        question: "In welcher Reihenfolge läuft die Erregung durch das Leitungssystem?",
        options: [
          { text: "Sinusknoten → AV-Knoten → His-Bündel → Tawara-Schenkel → Purkinje-Fasern", correct: true },
          { text: "AV-Knoten → Sinusknoten → His-Bündel → Purkinje-Fasern", correct: false },
          { text: "Sinusknoten → His-Bündel → AV-Knoten → Tawara-Schenkel", correct: false },
          { text: "Purkinje-Fasern → Tawara-Schenkel → His-Bündel → AV-Knoten → Sinusknoten", correct: false }
        ],
        explanation: "Die Erregung läuft vom Sinusknoten über AV-Knoten, His-Bündel, Tawara-Schenkel bis zu den Purkinje-Fasern."
      },
      {
        id: "erregung_h5",
        type: "true_false",
        statement: "Bei Ausfall des Sinusknotens und des AV-Knotens kann die Kammermuskulatur mit einer Eigenfrequenz von 20–40/min als Schrittmacher fungieren.",
        answer: true,
        explanation: "Die Kammermuskulatur (tertiärer Schrittmacher) übernimmt mit 20–40/min, wenn primärer und sekundärer Schrittmacher ausfallen — eine Notfallfunktion."
      }
    ],
    phase4Questions: [
      {
        id: "erregung_mc1",
        type: "mc",
        question: "Welche Aussagen zum Erregungsleitsystem sind korrekt?",
        options: [
          { text: "Sinusknoten = primärer Schrittmacher mit 60–80/min", correct: true },
          { text: "Der AV-Knoten überträgt Erregung ohne Verzögerung auf die Kammern", correct: false },
          { text: "Purkinje-Fasern verteilen die Erregung im Arbeitsmyokard", correct: true },
          { text: "Der Kammereigenrhythmus liegt bei 60–80/min", correct: false }
        ]
      },
      {
        id: "erregung_mc2",
        type: "mc",
        question: "Was passiert, wenn der Sinusknoten ausfällt?",
        options: [
          { text: "Der AV-Knoten übernimmt die Schrittmacherfunktion mit 40–50/min", correct: true },
          { text: "Das Herz hört sofort auf zu schlagen", correct: false },
          { text: "Die Kammermuskulatur übernimmt mit 20–40/min, wenn auch der AV-Knoten ausfällt", correct: true },
          { text: "Die Purkinje-Fasern werden zum primären Schrittmacher", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "herzkranzgefaesse_kreislauf",
    title: "Herzkranzgefäße und Kreislaufwege",
    contextHint: "Studienbrief 1036 Das Herz – Koronargefäße und Kreislauf",
    phase1: {
      soil: {
        statement: "Die Herzkranzgefäße werden ausschließlich in der Diastole mit Blut versorgt.",
        answer: true,
        solution: "Die Herzkranzgefäße (Aa. coronariae) zweigen direkt aus der Aorta ab. Da das Myokard während der Systole stark kontrahiert, werden die Koronargefäße dabei zusammengedrückt — die Durchblutung des Herzens findet daher ausschließlich in der Diastole statt. Zwischen den Koronararterien gibt es keine funktionellen Anastomosen, weshalb ein Verschluss (Herzinfarkt) zu Ischämie im versorgten Gebiet führt."
      },
      seed: {
        statement: "Der Ramus interventricularis anterior (RIVA) ist ein Ast der rechten Koronararterie.",
        answer: false,
        solution: "Die linke Koronararterie (A. coronaria sinistra) teilt sich in den Ramus interventricularis anterior (RIVA, LAD) und den Ramus circumflexus. Der RIVA versorgt die Vorderwand des linken Ventrikels und das Ventrikelseptum. Die rechte Koronararterie (A. coronaria dextra) versorgt hauptsächlich den rechten Ventrikel und die Hinterwand des linken Ventrikels."
      },
      water: {
        statement: "Im großen Kreislauf wird sauerstoffreiches Blut vom linken Herzen zu den Organen gepumpt und kehrt sauerstoffarm zum rechten Herzen zurück.",
        answer: true,
        solution: "Der Körperkreislauf (großer Kreislauf): Linkes Herz → Aorta → Organe → V. cava superior/inferior → Rechtes Herz. Der Lungenkreislauf (kleiner Kreislauf): Rechtes Herz → Truncus pulmonalis → Lunge → Vv. pulmonales → Linkes Herz. Im Lungenkreislauf fließt sauerstoffarmes Blut von rechts zur Lunge, kehrt sauerstoffreich zurück."
      }
    },
    harvestQuestions: [
      {
        id: "koronar_h1",
        type: "mc",
        question: "Warum werden die Herzkranzgefäße nur in der Diastole durchblutet?",
        options: [
          { text: "Weil das kontrahierende Myokard in der Systole die Gefäße zusammendrückt", correct: true },
          { text: "Weil der Aortendruck in der Systole zu niedrig ist", correct: false },
          { text: "Weil die Koronarklappen in der Systole schließen", correct: false },
          { text: "Weil das Blut in der Systole zur Lunge umgeleitet wird", correct: false }
        ],
        explanation: "Die Koronardurchblutung findet fast ausschließlich in der Diastole statt, da das kontrahierende Myokard in der Systole die intramuskulären Gefäße komprimiert."
      },
      {
        id: "koronar_h2",
        type: "true_false",
        statement: "Zwischen den Koronararterien bestehen keine funktionellen Anastomosen, weshalb ein Verschluss zum Herzinfarkt führt.",
        answer: true,
        explanation: "Fehlende Anastomosen machen das Koronarsystem zum Endarteriengebiet — ein Verschluss führt sofort zu Ischämie im nachgeschalteten Myokard (Herzinfarkt)."
      },
      {
        id: "koronar_h3",
        type: "mc",
        question: "Welches Gefäß versorgt die Vorderwand des linken Ventrikels und das Ventrikelseptum?",
        options: [
          { text: "Ramus interventricularis anterior (RIVA/LAD)", correct: true },
          { text: "A. coronaria dextra", correct: false },
          { text: "Ramus circumflexus", correct: false },
          { text: "V. cava superior", correct: false }
        ],
        explanation: "Der RIVA (Ramus interventricularis anterior) ist ein Ast der linken Koronararterie und versorgt Vorderwand und Septum des linken Ventrikels."
      },
      {
        id: "koronar_h4",
        type: "mc",
        question: "Welchen Weg nimmt sauerstoffarmes Blut im kleinen Kreislauf?",
        options: [
          { text: "Rechtes Herz → Truncus pulmonalis → Lunge → Vv. pulmonales → Linkes Herz", correct: true },
          { text: "Linkes Herz → Aorta → Lunge → V. cava → Rechtes Herz", correct: false },
          { text: "Rechtes Herz → V. cava → Lunge → Aorta → Linkes Herz", correct: false },
          { text: "Linkes Herz → Vv. pulmonales → Lunge → Truncus pulmonalis → Rechtes Herz", correct: false }
        ],
        explanation: "Der kleine (Lungen-)Kreislauf: Rechtes Herz pumpt sauerstoffarmes Blut über den Truncus pulmonalis zur Lunge; oxygeniertes Blut kehrt über die Vv. pulmonales zum linken Herzen zurück."
      }
    ],
    phase4Questions: [
      {
        id: "koronar_mc1",
        type: "mc",
        question: "Welche Aussagen zu den Koronargefäßen sind korrekt?",
        options: [
          { text: "Die Koronardurchblutung erfolgt hauptsächlich in der Diastole", correct: true },
          { text: "Der RIVA ist ein Ast der linken Koronararterie", correct: true },
          { text: "Zwischen den Koronararterien bestehen gut ausgebildete Anastomosen", correct: false },
          { text: "Die A. coronaria dextra versorgt hauptsächlich den linken Ventrikel", correct: false }
        ]
      },
      {
        id: "koronar_mc2",
        type: "mc",
        question: "Was trifft auf den Blutkreislauf zu?",
        options: [
          { text: "Im großen Kreislauf pumpt das linke Herz sauerstoffreiches Blut in die Aorta", correct: true },
          { text: "Die Vv. pulmonales führen sauerstoffreiches Blut zum linken Herzen", correct: true },
          { text: "Der kleine Kreislauf beginnt im linken Herzen", correct: false },
          { text: "Im Lungenkreislauf fließt sauerstoffreiches Blut von rechts zur Lunge", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "gefaesshistologie",
    title: "Histologie der Blutgefäße",
    contextHint: "Studienbrief 1036 Histologie der Gefäße und Windkesselfunktion",
    phase1: {
      soil: {
        statement: "Alle Blutgefäße haben drei Wandschichten: Tunica intima, Tunica media und Tunica adventitia.",
        answer: true,
        solution: "Der Grundaufbau aller Blutgefäße besteht aus drei Schichten: Tunica intima (Innenauskleidung aus Endothel, wandständig), Tunica media (mittlere Muskel-/Bindegewebsschicht, verantwortlich für Tonus und Regulation) und Tunica adventitia (äußere Bindegewebsschicht, Fixierung und Vasa vasorum). Arterioles haben eine besonders kräftige Tunica media — sie sind die wichtigsten Widerstandsgefäße."
      },
      seed: {
        statement: "Elastische Arterien (z. B. die Aorta) haben einen hohen Anteil an glatter Muskulatur und sind für die Windkesselfunktion zuständig.",
        answer: false,
        solution: "Der elastische Typ (z. B. Aorta, A. pulmonalis) hat eine Tunica media mit vielen elastischen Fasern und wenig glatter Muskulatur. Dieser Typ ist für die Windkesselfunktion zuständig: Das elastische Gefäß dehnt sich in der Systole aus und gibt die Energie in der Diastole als kontinuierlichen Fluss weiter — so wird der pulsatile Blutfluss geglättet. Der muskuläre Typ (z. B. A. femoralis) hat hingegen viel glatte Muskulatur in der Media."
      },
      water: {
        statement: "Kapillaren bestehen nur aus einer Endothelschicht und sind damit dünn genug für Stoffaustausch.",
        answer: true,
        solution: "Kapillaren sind die kleinsten Gefäße und bestehen nur aus Endothel (ohne Media und Adventitia). Dieser Aufbau ermöglicht Gasaustausch, Nährstoff- und Abfalltransport zwischen Blut und Gewebe. Es gibt verschiedene Schrankensysteme: die Blut-Hirn-Schranke (tight junctions, sehr selektiv), die glomeruläre Filtrationsmembran in der Niere und die Plazentaschranke."
      }
    },
    harvestQuestions: [
      {
        id: "gefaess_h1",
        type: "mc",
        question: "Welche Funktion hat die Windkesselfunktion der Aorta?",
        options: [
          { text: "Sie wandelt den pulsatilen Blutfluss in einen gleichmäßigeren Fluss um", correct: true },
          { text: "Sie erhöht den Blutdruck in der Diastole auf Systolenniveau", correct: false },
          { text: "Sie verhindert Rückfluss durch Klappenbildung", correct: false },
          { text: "Sie reguliert die Herzfrequenz", correct: false }
        ],
        explanation: "Die Aorta dehnt sich systolisch aus und gibt die gespeicherte Energie diastolisch ab — so fließt das Blut kontinuierlich weiter, obwohl das Herz intermittierend pumpt."
      },
      {
        id: "gefaess_h2",
        type: "true_false",
        statement: "Der muskuläre Arterientyp (z. B. A. femoralis) hat in der Tunica media überwiegend elastische Fasern.",
        answer: false,
        explanation: "Der muskuläre Typ hat viel glatte Muskulatur in der Media; elastische Fasern überwiegen beim elastischen Typ (Aorta, große Stammarterien)."
      },
      {
        id: "gefaess_h3",
        type: "mc",
        question: "Aus welchen Schichten bestehen Kapillaren?",
        options: [
          { text: "Nur aus einer Endothelschicht (keine Media, keine Adventitia)", correct: true },
          { text: "Endothel + Tunica media aus glatten Muskelzellen", correct: false },
          { text: "Allen drei Schichten wie Arterien", correct: false },
          { text: "Endothel + Tunica adventitia", correct: false }
        ],
        explanation: "Kapillaren bestehen ausschließlich aus einer einschichtigen Endothelschicht — das ermöglicht den direkten Stoffaustausch mit dem Gewebe."
      },
      {
        id: "gefaess_h4",
        type: "mc",
        question: "Welche Schrankensysteme des Körpers zählen zu den selektiven Kapillarbarrieren?",
        options: [
          { text: "Blut-Hirn-Schranke und Plazentaschranke", correct: true },
          { text: "Tunica media und Tunica adventitia", correct: false },
          { text: "AV-Klappen und Taschenklappen", correct: false },
          { text: "Lymphkapillaren und Venenklappen", correct: false }
        ],
        explanation: "Blut-Hirn-Schranke (tight junctions), glomeruläre Filtrationsmembran und Plazentaschranke sind wichtige selektive Barrieren an Kapillaren."
      }
    ],
    phase4Questions: [
      {
        id: "gefaess_mc1",
        type: "mc",
        question: "Welche Aussagen zur Gefäßhistologie sind korrekt?",
        options: [
          { text: "Tunica intima = Endothelauskleidung, Tunica media = Muskel/elastische Fasern, Tunica adventitia = Bindegewebe außen", correct: true },
          { text: "Elastische Arterien (Aorta) haben viel glatte Muskulatur in der Media", correct: false },
          { text: "Kapillaren bestehen nur aus Endothel und ermöglichen Stoffaustausch", correct: true },
          { text: "Arteriolen haben eine schwach ausgeprägte Tunica media", correct: false }
        ]
      },
      {
        id: "gefaess_mc2",
        type: "mc",
        question: "Was kennzeichnet den elastischen Arterientyp?",
        options: [
          { text: "Hoher Anteil elastischer Fasern in der Tunica media", correct: true },
          { text: "Windkesselfunktion: Dämpfung des pulsatilen Blutflusses", correct: true },
          { text: "Typischer Vertreter: A. femoralis", correct: false },
          { text: "Viel glatte Muskulatur, wenig elastische Fasern", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "venoeses_system_venenklappen",
    title: "Venöses System und Venenklappen",
    contextHint: "Studienbrief 1036 Venöser Rücktransport und wichtige Gefäße",
    phase1: {
      soil: {
        statement: "Venenklappen verhindern den Rückfluss von Blut in den abhängigen Körperteilen.",
        answer: true,
        solution: "Venen besitzen im Gegensatz zu Arterien Klappen (Venenklappen), die den Rückfluss von Blut verhindern. Sie sind besonders wichtig in den Extremitätenvenen, wo das Blut gegen die Schwerkraft zum Herzen zurücktransportiert werden muss. Fehlen oder Insuffizienz der Venenklappen führt zu Varizen (Krampfadern)."
      },
      seed: {
        statement: "Der venöse Rücktransport wird ausschließlich durch den Herzunterdruck in der Diastole gewährleistet.",
        answer: false,
        solution: "Der venöse Rücktransport wird durch mehrere Mechanismen gewährleistet: (1) Muskelpumpe: Kontraktion der Skelettmuskulatur komprimiert Venen, treibt Blut herzwärts. (2) Arteriovenöse Kopplung: Arterieller Puls überträgt sich auf benachbarte Venen. (3) Atemsog: Bei Einatmung entsteht Unterdruck im Thorax, der Blut ansaugt. (4) Herzunterdruck in der Diastole. Alle vier wirken zusammen."
      },
      water: {
        statement: "Die Aorta ist die größte Arterie des Körpers und entspringt aus der linken Herzkammer.",
        answer: true,
        solution: "Wichtige Arterien: Aorta (linker Ventrikel) → Aa. subclaviae (Arme), A. carotis communis (Hals/Kopf), Aa. iliacae communes (Beine), A. femoralis (Oberschenkel), A. poplitea (Knie). Wichtige Venen: Vv. cavae superior/inferior → rechter Vorhof; V. jugularis interna (Kopf); V. femoralis, V. saphena magna (Bein, häufig variköse Veränderungen)."
      }
    },
    harvestQuestions: [
      {
        id: "venen_h1",
        type: "mc",
        question: "Welcher Mechanismus ist KEIN Teil des venösen Rücktransports?",
        options: [
          { text: "Windkesselfunktion der Aorta", correct: true },
          { text: "Muskelpumpe der Skelettmuskulatur", correct: false },
          { text: "Atemsog bei Einatmung", correct: false },
          { text: "Arteriovenöse Kopplung", correct: false }
        ],
        explanation: "Die Windkesselfunktion dient der Dämpfung des arteriellen Pulsdrucks, nicht dem venösen Rücktransport. Venöser Rücktransport: Muskelpumpe, Atemsog, arteriovenöse Kopplung, Herzunterdruck."
      },
      {
        id: "venen_h2",
        type: "true_false",
        statement: "Insuffiziente Venenklappen können zur Entstehung von Varizen (Krampfadern) führen.",
        answer: true,
        explanation: "Funktionsuntüchtige Venenklappen erlauben Rückfluss und führen zu Venenerweiterung und Schlängelung — das Bild der Varikosis."
      },
      {
        id: "venen_h3",
        type: "mc",
        question: "Wohin münden die Vv. cavae superior und inferior?",
        options: [
          { text: "In den rechten Vorhof", correct: true },
          { text: "In den linken Vorhof", correct: false },
          { text: "In die rechte Kammer", correct: false },
          { text: "In den Truncus pulmonalis", correct: false }
        ],
        explanation: "Die obere und untere Hohlvene (Vv. cavae superior/inferior) leiten das sauerstoffarme Blut aus dem Körperkreislauf in den rechten Vorhof."
      },
      {
        id: "venen_h4",
        type: "mc",
        question: "Welche Arterie versorgt hauptsächlich Hals und Kopf?",
        options: [
          { text: "A. carotis communis", correct: true },
          { text: "A. subclavia", correct: false },
          { text: "A. femoralis", correct: false },
          { text: "A. iliaca communis", correct: false }
        ],
        explanation: "Die A. carotis communis (links direkt aus Aorta, rechts aus Truncus brachiocephalicus) versorgt Hals und Kopf."
      }
    ],
    phase4Questions: [
      {
        id: "venen_mc1",
        type: "mc",
        question: "Welche Mechanismen fördern den venösen Rücktransport?",
        options: [
          { text: "Muskelpumpe der Skelettmuskulatur", correct: true },
          { text: "Atemsog bei Inspiration", correct: true },
          { text: "Windkesselfunktion der Aorta", correct: false },
          { text: "Arteriovenöse Kopplung", correct: true }
        ]
      },
      {
        id: "venen_mc2",
        type: "mc",
        question: "Welche Aussagen zu Venen und wichtigen Gefäßen sind korrekt?",
        options: [
          { text: "Venenklappen verhindern den Rückfluss besonders in den Extremitäten", correct: true },
          { text: "Die V. saphena magna ist eine oberflächliche Beinvene, die variköse Veränderungen zeigen kann", correct: true },
          { text: "Venen besitzen generell keine Klappen", correct: false },
          { text: "Die Aorta entspringt aus dem rechten Ventrikel", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "fetaler_kreislauf",
    title: "Fetaler Kreislauf",
    contextHint: "Studienbrief 1036 Das Herz – Fetaler Kreislauf",
    phase1: {
      soil: {
        statement: "Im fetalen Kreislauf erfolgt der Gasaustausch über die Plazenta, nicht über die Lunge.",
        answer: true,
        solution: "Im fetalen Kreislauf übernimmt die Plazenta die Aufgaben der Lunge: Sauerstoffaufnahme und CO₂-Abgabe. Das Blut fließt über die Nabelvene (sauerstoffreich) zur Leber und zum Herzen. Plazenta und fetales Blut sind durch die Plazentaschranke getrennt — Mutter- und Kindesblut mischen sich nicht direkt, aber Gase, Nährstoffe und bestimmte Substanzen (auch Viren, Medikamente, Alkohol) können passieren."
      },
      seed: {
        statement: "Im fetalen Kreislauf gibt es drei Kurzschlüsse (Shunts), die nach der Geburt verschlossen werden.",
        answer: true,
        solution: "Die drei fetalen Kurzschlüsse: (1) Ductus venosus: verbindet Nabelvene mit V. cava inferior, umgeht die Leber. (2) Foramen ovale: Öffnung im Vorhofseptum, leitet Blut vom rechten in den linken Vorhof (Lungenkreislauf wird umgangen). (3) Ductus arteriosus Botalli: verbindet Truncus pulmonalis mit Aorta, umgeht die noch nicht funktionierende Lunge. Alle drei Shunts schließen sich kurz nach der Geburt."
      },
      water: {
        statement: "Das Foramen ovale schließt sich nach der Geburt durch den Anstieg des linksatrialen Drucks.",
        answer: true,
        solution: "Bei der ersten Einatmung entfalten sich die Lungen, der Lungengefäßwiderstand sinkt, mehr Blut fließt durch die Lunge, der linksatriale Druck steigt und presst die Klappe des Foramen ovale zu. Der Ductus arteriosus verschließt sich durch Bradykinin-Einfluss und steigende O₂-Spannung funktionell innerhalb von Stunden, anatomisch in Wochen. Der Ductus venosus verschließt sich durch Unterbindung der Nabelschnur."
      }
    },
    harvestQuestions: [
      {
        id: "fetal_h1",
        type: "mc",
        question: "Welche drei Kurzschlüsse (Shunts) kennzeichnen den fetalen Kreislauf?",
        options: [
          { text: "Ductus venosus, Foramen ovale, Ductus arteriosus Botalli", correct: true },
          { text: "Foramen ovale, Ductus arteriosus, Ductus thoracicus", correct: false },
          { text: "Ductus venosus, Ductus choledochus, Foramen ovale", correct: false },
          { text: "Ductus arteriosus, V. umbilicalis, Ductus thoracicus", correct: false }
        ],
        explanation: "Die drei fetalen Shunts sind: Ductus venosus (Nabelvene → V. cava), Foramen ovale (rechter → linker Vorhof), Ductus arteriosus Botalli (Truncus pulmonalis → Aorta)."
      },
      {
        id: "fetal_h2",
        type: "true_false",
        statement: "Die Nabelvene führt sauerstoffarmes Blut von der Plazenta zum Fetus.",
        answer: false,
        explanation: "Die Nabelvene führt sauerstoffreiches Blut von der Plazenta zum Fetus. Die Nabelarterien (2) führen sauerstoffarmes Blut zurück zur Plazenta."
      },
      {
        id: "fetal_h3",
        type: "mc",
        question: "Wodurch schließt sich das Foramen ovale nach der Geburt?",
        options: [
          { text: "Durch Anstieg des linksatrialen Drucks nach Lungenentfaltung", correct: true },
          { text: "Durch Anstieg des rechtsatrialen Drucks", correct: false },
          { text: "Durch Vasokonstriktion der Lungenarterien", correct: false },
          { text: "Durch Bradykinin-Einfluss", correct: false }
        ],
        explanation: "Die erste Einatmung senkt den Lungenwiderstand, erhöht den Lungenblutfluss, steigert den linksatrialen Druck und drückt die Foramen-ovale-Klappe zu."
      },
      {
        id: "fetal_h4",
        type: "true_false",
        statement: "Mutter- und Kindesblut mischen sich in der Plazenta nicht direkt; die Plazentaschranke ist jedoch für Alkohol und Viren durchlässig.",
        answer: true,
        explanation: "Mutter- und Kindesblut zirkulieren in getrennten Kreisläufen. Die Plazentaschranke lässt aber Gase, Nährstoffe, viele Medikamente, Alkohol, Viren und IgG-Antikörper passieren."
      }
    ],
    phase4Questions: [
      {
        id: "fetal_mc1",
        type: "mc",
        question: "Welche Aussagen zum fetalen Kreislauf sind korrekt?",
        options: [
          { text: "Der Gasaustausch erfolgt über die Plazenta, nicht über die Lunge", correct: true },
          { text: "Das Foramen ovale umgeht den Lungenkreislauf, indem es rechten und linken Vorhof verbindet", correct: true },
          { text: "Der Ductus venosus verbindet Truncus pulmonalis und Aorta", correct: false },
          { text: "Die Nabelvene führt sauerstoffarmes Blut", correct: false }
        ]
      },
      {
        id: "fetal_mc2",
        type: "mc",
        question: "Was passiert direkt nach der Geburt mit den fetalen Shunts?",
        options: [
          { text: "Foramen ovale schließt sich durch Anstieg des linksatrialen Drucks", correct: true },
          { text: "Ductus arteriosus schließt sich funktionell durch O₂-Anstieg und Bradykinin", correct: true },
          { text: "Der Ductus venosus bleibt ein Leben lang offen", correct: false },
          { text: "Das Foramen ovale öffnet sich weiter, um die Lunge zu entlasten", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "praenataldiagnostik",
    title: "Pränataldiagnostik und Neugeborenenbeurteilung",
    contextHint: "Studienbrief 1036 Pädiatrie – Pränataldiagnostik und Erstversorgung",
    phase1: {
      soil: {
        statement: "Invasive Pränataldiagnostik wie die Amniozentese birgt ein geringes, aber reales Risiko einer iatrogenen Fehlgeburt.",
        answer: true,
        solution: "Nicht-invasive Methoden: Ultraschall (Organscreening, Nackentransparenzmessung 11.–14. SSW), Triple-Test (AFP, hCG, Östriol), NIPT (nicht-invasiver Pränataltest, freie fetale DNA im mütterlichen Blut). Invasive Methoden: Chorionzottenbiopsie (ab 10. SSW, Fehlgeburtsrisiko ~1–2 %), Amniozentese (ab 15. SSW, Fruchtwasser, Risiko ~0,5–1 %), Cordozentese (ab 20. SSW, Nabelschnurblut, höchstes Risiko). Alle invasiven Methoden ermöglichen eine Karyotypisierung."
      },
      seed: {
        statement: "Der APGAR-Score wird bei 1, 5 und 10 Minuten nach der Geburt erhoben und bewertet fünf Parameter.",
        answer: true,
        solution: "Der APGAR-Score (0–10 Punkte) bewertet: Hautfarbe (A), Puls (P), Grimassieren/Reflexe (G), Aktivität/Muskeltonus (A), Atmung (R). Jeder Parameter wird mit 0, 1 oder 2 bewertet. 7–10 Punkte: gut, 4–6: mäßig (Reanimationsmaßnahmen), unter 4: kritisch. Er wird bei 1, 5 und 10 Minuten erhoben."
      },
      water: {
        statement: "Das Neugeborenenscreening (erweitertes Screening) erfasst angeborene Stoffwechselkrankheiten und Endokrinopathien durch einen Bluttropfen aus der Ferse.",
        answer: true,
        solution: "Das erweiterte Neugeborenenscreening (Guthrie-Test, Fersenblut am 3. Lebenstag) erfasst über 20 angeborene Erkrankungen: z. B. Phenylketonurie (PKU), Hypothyreose, Ahornsirupkrankheit, Galaktosämie, Medium-chain-Acyl-CoA-Dehydrogenase-Mangel (MCAD). Früherkennung ermöglicht frühzeitige Therapie und verhindert irreversible Schäden. Der Petrussa-Index schätzt das Gestationsalter des Neugeborenen anhand äußerer Merkmale."
      }
    },
    harvestQuestions: [
      {
        id: "prae_h1",
        type: "mc",
        question: "Welche nicht-invasive Methode der Pränataldiagnostik analysiert freie fetale DNA im mütterlichen Blut?",
        options: [
          { text: "NIPT (nicht-invasiver Pränataltest)", correct: true },
          { text: "Amniozentese", correct: false },
          { text: "Chorionzottenbiopsie", correct: false },
          { text: "Triple-Test", correct: false }
        ],
        explanation: "Der NIPT analysiert zellfreie fetale DNA aus dem mütterlichen Blut und kann Chromosomenstörungen (z. B. Trisomie 21) nicht-invasiv detektieren."
      },
      {
        id: "prae_h2",
        type: "true_false",
        statement: "Die Chorionzottenbiopsie kann ab der 10. SSW durchgeführt werden und hat ein höheres Fehlgeburtsrisiko als die Amniozentese.",
        answer: true,
        explanation: "Chorionzottenbiopsie ab 10. SSW mit ~1–2 % Fehlgeburtsrisiko; Amniozentese ab 15. SSW mit ~0,5–1 % Risiko."
      },
      {
        id: "prae_h3",
        type: "mc",
        question: "Was bewertet der APGAR-Score?",
        options: [
          { text: "Hautfarbe, Puls, Grimassieren, Aktivität/Muskeltonus, Atmung", correct: true },
          { text: "Gewicht, Länge, Kopfumfang, Hautfarbe, Herzfrequenz", correct: false },
          { text: "Reflexe, Körpertemperatur, Blutzucker, Sauerstoffsättigung, Atemfrequenz", correct: false },
          { text: "Gestationsalter, Muskelmasse, Atemtiefe, Spontanbewegungen, Hautfarbe", correct: false }
        ],
        explanation: "APGAR: A = Aussehen (Hautfarbe), P = Puls, G = Grimassieren, A = Aktivität (Tonus), R = Respiration (Atmung)."
      },
      {
        id: "prae_h4",
        type: "mc",
        question: "Welche Erkrankung wird beim erweiterten Neugeborenenscreening erfasst?",
        options: [
          { text: "Phenylketonurie (PKU)", correct: true },
          { text: "Down-Syndrom", correct: false },
          { text: "Herzfehler", correct: false },
          { text: "Hüftdysplasie", correct: false }
        ],
        explanation: "Das Neugeborenenscreening erfasst angeborene Stoffwechselkrankheiten (PKU, Hypothyreose, Galaktosämie etc.), nicht strukturelle Anomalien."
      },
      {
        id: "prae_h5",
        type: "true_false",
        statement: "Ein APGAR-Score unter 4 Punkten gilt als kritisch und erfordert sofortige Reanimationsmaßnahmen.",
        answer: true,
        explanation: "Unter 4 Punkten ist das Neugeborene in kritischem Zustand. 4–6: mäßige Anpassungsstörung mit Unterstützungsbedarf. 7–10: normale postnatale Adaptation."
      }
    ],
    phase4Questions: [
      {
        id: "prae_mc1",
        type: "mc",
        question: "Welche Aussagen zur Pränataldiagnostik sind korrekt?",
        options: [
          { text: "NIPT ist nicht-invasiv und analysiert fetale DNA im mütterlichen Blut", correct: true },
          { text: "Alle invasiven Methoden ermöglichen eine Karyotypisierung", correct: true },
          { text: "Die Amniozentese hat ein höheres Fehlgeburtsrisiko als die Chorionzottenbiopsie", correct: false },
          { text: "Die Cordozentese wird ab der 5. SSW durchgeführt", correct: false }
        ]
      },
      {
        id: "prae_mc2",
        type: "mc",
        question: "Was trifft auf den APGAR-Score und das Neugeborenenscreening zu?",
        options: [
          { text: "APGAR wird bei 1, 5 und 10 Minuten nach Geburt erhoben", correct: true },
          { text: "Das Neugeborenenscreening erfolgt durch einen Fersenbluttropfen am 3. Lebenstag", correct: true },
          { text: "Der APGAR-Score bewertet das Gestationsalter des Neugeborenen", correct: false },
          { text: "7–10 APGAR-Punkte gelten als kritisch", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "neugeborenes_entwicklung",
    title: "Neugeborenes und Kindesentwicklung",
    contextHint: "Studienbrief 1036 Pädiatrie – Neugeborenes, Reflexe, Entwicklung, Vorsorge",
    phase1: {
      soil: {
        statement: "Frühkindliche Reflexe wie der Moro-Reflex und der Saugreflex sind bei gesunden Neugeborenen vorhanden und verschwinden im ersten Lebensjahr.",
        answer: true,
        solution: "Frühkindliche (archaische) Reflexe sind neurologische Schutz- und Überlebensreflexe: Saugreflex, Schluckreflex, Greifreflex (Palmar/Plantar), Moro-Reflex (Umklammerungsreflex), Schreitreflex, Galant-Reflex, Babinski-Reflex. Sie erlöschen im 1.–2. Lebensjahr mit zunehmender kortikaler Kontrolle. Persistierende archaische Reflexe jenseits des erwarteten Erlöschenszeitpunkts können auf neurologische Störungen hinweisen."
      },
      seed: {
        statement: "Neugeborene scheiden als ersten Stuhl Mekonium aus, das aus Fruchtwasser, Epithelzellen und Gallenbestandteilen besteht.",
        answer: true,
        solution: "Mekonium (Kindspech) ist der erste Stuhl des Neugeborenen, schwarzgrün, zähflüssig. Er sollte innerhalb der ersten 24–48 Stunden abgehen. Normwerte Neugeborenes: Gewicht 3000–4000 g, Länge ~50 cm, Kopfumfang ~34 cm, Herzfrequenz 120–160/min, Atemfrequenz 40–60/min. Postnatale Adaptation: Lungen entfalten sich, fetale Kreislaufshunts schließen sich."
      },
      water: {
        statement: "Muttermilch enthält maternale IgA-Antikörper, die dem Säugling einen passiven Infektionsschutz (Nestschutz) bieten.",
        answer: true,
        solution: "Muttermilch ist optimal angepasst: enthält sekretorisches IgA (Nestschutz), Lactoferrin (antimikrobiell), Wachstumsfaktoren, langkettige Fettsäuren (Hirnentwicklung) und Präbiotika. Entwicklungseckpunkte: Kopfkontrolle (3 Monate), soziales Lächeln (6 Wochen), sitzen ohne Stütze (7–8 Monate), Laufen (12–15 Monate), erste Worte (12 Monate), Zwei-Wort-Sätze (24 Monate). Die Vorsorgeuntersuchungen U1–U9 begleiten die Entwicklung bis zum 5. Lebensjahr."
      }
    },
    harvestQuestions: [
      {
        id: "neugeb_h1",
        type: "mc",
        question: "Was kennzeichnet den Moro-Reflex?",
        options: [
          { text: "Umklammerungs-/Schreckreflex: Arme werden ausgebreitet und dann zur Mitte geführt", correct: true },
          { text: "Reflex, bei dem der Säugling beim Berühren der Lippen zu saugen beginnt", correct: false },
          { text: "Reflex, bei dem die Großzehe bei Bestreichen der Fußsohle dorsalflektiert", correct: false },
          { text: "Schreitbewegungen bei aufrechtem Halten des Neugeborenen", correct: false }
        ],
        explanation: "Der Moro-Reflex (Umklammerungsreflex) zeigt sich als symmetrisches Ausbreiten der Arme mit anschließendem Zusammenführen bei plötzlichem Kopffall oder lautem Geräusch."
      },
      {
        id: "neugeb_h2",
        type: "true_false",
        statement: "Persistierende archaische Reflexe jenseits des erwarteten Erlöschenszeitpunkts können auf neurologische Störungen hinweisen.",
        answer: true,
        explanation: "Frühkindliche Reflexe erlöschen im 1.–2. Lebensjahr durch zunehmende kortikale Kontrolle. Persistieren sie länger als erwartet, kann das auf neurologische Reifungsstörungen hinweisen."
      },
      {
        id: "neugeb_h3",
        type: "mc",
        question: "Wann sollte Mekonium beim Neugeborenen abgehen?",
        options: [
          { text: "Innerhalb der ersten 24–48 Stunden", correct: true },
          { text: "Erst am 5.–7. Lebenstag", correct: false },
          { text: "Innerhalb der ersten 10 Minuten nach Geburt", correct: false },
          { text: "Erst nach dem ersten Stillen", correct: false }
        ],
        explanation: "Mekonium sollte innerhalb von 24–48 Stunden nach Geburt abgehen. Ausbleibendes Mekonium kann auf Erkrankungen wie Mekoniumileus (z. B. bei Mukoviszidose) hinweisen."
      },
      {
        id: "neugeb_h4",
        type: "mc",
        question: "In welchem Alter erwartet man das erste selbstständige Gehen?",
        options: [
          { text: "12–15 Monate", correct: true },
          { text: "6–8 Monate", correct: false },
          { text: "18–24 Monate", correct: false },
          { text: "9–10 Monate", correct: false }
        ],
        explanation: "Laufen ohne Festhalten: ca. 12–15 Monate. Abweichungen nach oben (bis 18 Monate) können noch normal sein."
      },
      {
        id: "neugeb_h5",
        type: "true_false",
        statement: "Muttermilch enthält sekretorisches IgA, das dem Säugling passiven Infektionsschutz (Nestschutz) bietet.",
        answer: true,
        explanation: "Sekretorisches IgA in der Muttermilch schützt die Schleimhäute des Säuglings vor Infektionen — ein wichtiger Teil des frühen Immunschutzes."
      },
      {
        id: "neugeb_h6",
        type: "mc",
        question: "Was sind normale Herzfrequenzwerte beim Neugeborenen?",
        options: [
          { text: "120–160/min", correct: true },
          { text: "60–80/min", correct: false },
          { text: "80–100/min", correct: false },
          { text: "160–200/min", correct: false }
        ],
        explanation: "Neugeborene haben eine höhere Herzfrequenz als Erwachsene: 120–160/min, Atemfrequenz 40–60/min."
      }
    ],
    phase4Questions: [
      {
        id: "neugeb_mc1",
        type: "mc",
        question: "Welche Aussagen zu frühkindlichen Reflexen sind korrekt?",
        options: [
          { text: "Moro-Reflex, Saug- und Greifreflex sind normale Befunde beim Neugeborenen", correct: true },
          { text: "Persistierende archaische Reflexe nach dem 2. Lebensjahr können neurologische Störungen anzeigen", correct: true },
          { text: "Frühkindliche Reflexe persistieren ein Leben lang", correct: false },
          { text: "Der Babinski-Reflex ist beim Neugeborenen pathologisch", correct: false }
        ]
      },
      {
        id: "neugeb_mc2",
        type: "mc",
        question: "Was kennzeichnet normale Entwicklungseckpunkte im ersten Lebensjahr?",
        options: [
          { text: "Soziales Lächeln ab ca. 6 Wochen", correct: true },
          { text: "Kopfkontrolle ab ca. 3 Monaten", correct: true },
          { text: "Laufen ohne Stütze typischerweise schon ab 6 Monaten", correct: false },
          { text: "Erste sinnvolle Einzelworte ab ca. 12 Monaten", correct: true }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "schutzimpfungen",
    title: "Schutzimpfungen und Impfaufklärung",
    contextHint: "Studienbrief 1036 Pädiatrie – Impfungen und STIKO",
    phase1: {
      soil: {
        statement: "Die STIKO (Ständige Impfkommission) gibt in Deutschland die offiziellen Impfempfehlungen heraus.",
        answer: true,
        solution: "Die STIKO am Robert-Koch-Institut gibt die Standardimpfempfehlungen für Deutschland heraus und aktualisiert den Impfkalender jährlich. Unterschieden wird zwischen Regelimpfungen (für alle empfohlen), Indikationsimpfungen (für bestimmte Risikogruppen) und Reiseimpfungen. Impfungen wirken durch aktive Immunisierung: Das Immunsystem bildet Gedächtniszellen und Antikörper, ohne die Erkrankung durchzumachen."
      },
      seed: {
        statement: "Herdenimmunität bedeutet, dass ein ausreichend hoher Anteil Geimpfter auch Ungeimpfte vor Ansteckung schützt.",
        answer: true,
        solution: "Herdenimmunität entsteht, wenn so viele Menschen immun sind, dass ein Erreger sich nicht mehr ausbreiten kann. Die erforderliche Durchimpfungsrate hängt von der Kontagiosität ab: Bei Masern (sehr hoch: R₀ ~12–18) ist eine Durchimpfungsrate von >95 % nötig. Das Masernschutzgesetz (2020) schreibt für Kinder in Kitas und Schulen sowie für Personal eine Masernimpfung vor."
      },
      water: {
        statement: "Vor einer Schutzimpfung muss der behandelnde Arzt eine umfassende Impfaufklärung durchführen, die schriftlich dokumentiert werden sollte.",
        answer: true,
        solution: "Impfaufklärung umfasst: Nutzen der Impfung, Art des Impfstoffs (Lebend- vs. Totimpfstoff), häufige und seltene Nebenwirkungen, Kontraindikationen (z. B. Immunsuppression bei Lebendimpfstoffen), Verhaltenshinweise danach. Die Aufklärung muss rechtzeitig vor der Impfung erfolgen, das Einverständnis muss vorliegen. Impfreaktionen (Rötung, Schwellung, Fieber) sind normale Immunantworten; Impfschäden (Meldepflicht) sind selten."
      }
    },
    harvestQuestions: [
      {
        id: "impf_h1",
        type: "mc",
        question: "Welche Durchimpfungsrate ist für Masern erforderlich, um Herdenimmunität zu erreichen?",
        options: [
          { text: "Über 95 %", correct: true },
          { text: "Über 50 %", correct: false },
          { text: "Über 70 %", correct: false },
          { text: "Über 80 %", correct: false }
        ],
        explanation: "Masern haben eine sehr hohe Kontagiosität (R₀ ~12–18), daher ist eine Herdenimmunität erst bei >95 % Durchimpfungsrate erreicht."
      },
      {
        id: "impf_h2",
        type: "true_false",
        statement: "Das Masernschutzgesetz (2020) verpflichtet Kinder in Kitas und Schulen sowie Personal zu einer Masernimpfung.",
        answer: true,
        explanation: "Das Masernschutzgesetz schreibt seit März 2020 eine Masernimpfpflicht für Kinder in Gemeinschaftseinrichtungen und deren Personal vor."
      },
      {
        id: "impf_h3",
        type: "mc",
        question: "Was ist eine Kontraindikation für Lebendimpfstoffe?",
        options: [
          { text: "Immunsuppression (z. B. unter Chemotherapie oder HIV)", correct: true },
          { text: "Frühgeburtlichkeit", correct: false },
          { text: "Leichte Erkältung ohne Fieber", correct: false },
          { text: "Allergien gegen Nahrungsmittel (ohne Impfstoffinhaltsstoffe)", correct: false }
        ],
        explanation: "Lebendimpfstoffe enthalten abgeschwächte Erreger, die bei immunsupprimierten Personen eine echte Infektion auslösen können — daher kontraindiziert."
      },
      {
        id: "impf_h4",
        type: "true_false",
        statement: "Impfreaktionen wie Rötung, Schwellung und leichtes Fieber nach einer Impfung sind normale Immunantworten und kein Impfschaden.",
        answer: true,
        explanation: "Lokale Reaktionen und leichtes Fieber sind erwartete, normale Reaktionen des Immunsystems auf die Impfung und kein Impfschaden."
      },
      {
        id: "impf_h5",
        type: "mc",
        question: "Was muss die Impfaufklärung beinhalten?",
        options: [
          { text: "Nutzen, Impfstofftyp, Nebenwirkungen, Kontraindikationen und Verhaltenshinweise", correct: true },
          { text: "Nur die häufigsten Nebenwirkungen", correct: false },
          { text: "Ausschließlich die Kontraindikationen", correct: false },
          { text: "Nur den Nutzen der Impfung", correct: false }
        ],
        explanation: "Die Impfaufklärung muss umfassend sein: Nutzen, Impfstofftyp, Neben- und Impfwirkungen, Kontraindikationen, Verhalten danach."
      }
    ],
    phase4Questions: [
      {
        id: "impf_mc1",
        type: "mc",
        question: "Welche Aussagen zu Impfungen und Herdenimmunität sind korrekt?",
        options: [
          { text: "Die STIKO gibt Impfempfehlungen für Deutschland heraus", correct: true },
          { text: "Herdenimmunität schützt auch Ungeimpfte, wenn der Anteil Immuner hoch genug ist", correct: true },
          { text: "Für Masern reicht eine Durchimpfungsrate von 70 % für Herdenimmunität", correct: false },
          { text: "Lebendimpfstoffe sind für immunsupprimierte Personen sicher", correct: false }
        ]
      },
      {
        id: "impf_mc2",
        type: "mc",
        question: "Was ist bei der Impfaufklärung und Dokumentation zu beachten?",
        options: [
          { text: "Aufklärung muss rechtzeitig vor der Impfung erfolgen", correct: true },
          { text: "Einverständnis des Patienten/Erziehungsberechtigten ist erforderlich", correct: true },
          { text: "Impfreaktionen müssen als Impfschäden gemeldet werden", correct: false },
          { text: "Eine Aufklärung ist nur bei Erstimpfungen notwendig", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "praenatale_schaeden_chromosomen",
    title: "Pränatale Schäden, Down- und Klinefelter-Syndrom",
    contextHint: "Studienbrief 1036 Pädiatrie – Teratogene, SIDS, Chromosomenstörungen",
    phase1: {
      soil: {
        statement: "Rauchen in der Schwangerschaft führt zum fetalen Tabaksyndrom mit Wachstumsretardierung und erhöhtem SIDS-Risiko.",
        answer: true,
        solution: "Pränatale Schäden durch Noxen: Fetales Tabaksyndrom (Rauchen): Wachstumsretardierung, Frühgeburtlichkeit, erhöhtes Risiko für SIDS (Sudden Infant Death Syndrome/plötzlicher Kindstod). Embryofetales Alkoholsyndrom (FAS): häufigste nicht-genetische geistige Behinderung; Symptome: Mikrozephalie, Wachstumsretardierung, faziale Dysmorphien, kognitive Störungen. SIDS: plötzlicher, unerklärter Tod eines Säuglings; Risikoreduktion durch Rückenlage, keine Bettumrandung, keine Überwärmung, rauchfreie Umgebung."
      },
      seed: {
        statement: "Die Gregg-Trias bei Rötelnembryopathie umfasst Herzfehler, Katarakt und Innenohrschwerhörigkeit.",
        answer: true,
        solution: "Rötelnembryopathie: Rötelninfektion in der Frühschwangerschaft (besonders 1.–3. SSW) kann zur Gregg-Trias führen: (1) Herzfehler (z. B. persistierender Ductus arteriosus), (2) Katarakt (grauer Star), (3) Innenohrschwerhörigkeit. Deshalb: Impfschutz gegen Röteln bei Frauen im gebärfähigen Alter wichtig. Heute durch Masern-Mumps-Röteln-Impfung weitgehend verhindert."
      },
      water: {
        statement: "Das Down-Syndrom (Trisomie 21) ist die häufigste Chromosomenstörung und tritt in drei Formen auf: freie Trisomie, Translokation und Mosaik.",
        answer: true,
        solution: "Down-Syndrom (Trisomie 21): Drei Formen: (1) Freie Trisomie 21 (~95 %): Nondisjunction in Meiose, Risiko steigt mit mütterlichem Alter. (2) Translokationstrisomie (~4 %): Chromosom 21 an anderes Chromosom angelagert — kann familiär vererbt werden. (3) Mosaikform (~1 %): Nicht alle Zellen betroffen, milderer Verlauf. Morphologie: Flaches Gesicht, Epikanthus, Muskelhypotonie, Lernbehinderung, erhöhtes Risiko für Herzfehler (AV-Kanal) und Leukämie. Klinefelter-Syndrom (47,XXY): nur Männer, Hodenunterfunktion, Hochwuchs, Gynäkomastie, Infertilität; Therapie: Testosteron-Substitution."
      }
    },
    harvestQuestions: [
      {
        id: "chromosom_h1",
        type: "mc",
        question: "Was umfasst die Gregg-Trias bei Rötelnembryopathie?",
        options: [
          { text: "Herzfehler, Katarakt, Innenohrschwerhörigkeit", correct: true },
          { text: "Mikrozephalie, Herzfehler, Lernbehinderung", correct: false },
          { text: "Taubheit, Blindheit, Kleinwuchs", correct: false },
          { text: "Herzfehler, Nierenmissbildung, Gaumenspalte", correct: false }
        ],
        explanation: "Die Gregg-Trias bei Rötelnembryopathie: Herzfehler + Katarakt + Innenohrschwerhörigkeit. Sie tritt bei Rötelninfektion in der Frühschwangerschaft auf."
      },
      {
        id: "chromosom_h2",
        type: "true_false",
        statement: "Das embryofetale Alkoholsyndrom ist die häufigste nicht-genetische Ursache geistiger Behinderung.",
        answer: true,
        explanation: "Das fetale Alkoholsyndrom (FAS) durch Alkohol in der Schwangerschaft ist die häufigste vermeidbare, nicht-genetische Ursache geistiger Behinderung."
      },
      {
        id: "chromosom_h3",
        type: "mc",
        question: "Welche Form des Down-Syndroms macht etwa 95 % der Fälle aus?",
        options: [
          { text: "Freie Trisomie 21 (Nondisjunction)", correct: true },
          { text: "Translokationstrisomie", correct: false },
          { text: "Mosaikform", correct: false },
          { text: "Partielle Trisomie", correct: false }
        ],
        explanation: "Ca. 95 % der Down-Syndrom-Fälle sind freie Trisomien durch Nondisjunction in der Meiose; das Risiko steigt mit dem mütterlichen Alter."
      },
      {
        id: "chromosom_h4",
        type: "mc",
        question: "Welche Maßnahmen reduzieren das SIDS-Risiko?",
        options: [
          { text: "Rückenlage, rauchfreie Umgebung, keine Überwärmung", correct: true },
          { text: "Bauchlage und weiches Bettzeug", correct: false },
          { text: "Erhöhte Raumtemperatur und enge Bettumrandung", correct: false },
          { text: "Schlafen im Elternbett mit Decken", correct: false }
        ],
        explanation: "SIDS-Prävention: Rückenlage (nicht Bauch), rauchfrei, keine Überwärmung, hartes Liegefläche, keine Bettumrandung."
      },
      {
        id: "chromosom_h5",
        type: "mc",
        question: "Welches Karyotyp hat das Klinefelter-Syndrom?",
        options: [
          { text: "47,XXY", correct: true },
          { text: "47,XYY", correct: false },
          { text: "45,X0", correct: false },
          { text: "47,+21", correct: false }
        ],
        explanation: "Das Klinefelter-Syndrom (47,XXY) betrifft nur männliche Personen: Hodenunterfunktion, Infertilität, Hochwuchs, Gynäkomastie; Therapie mit Testosteron."
      },
      {
        id: "chromosom_h6",
        type: "true_false",
        statement: "Beim Klinefelter-Syndrom ist eine Therapie mit Testosteron-Substitution indiziert.",
        answer: true,
        explanation: "Da beim Klinefelter-Syndrom (47,XXY) eine Hodenunterfunktion mit Testosteronmangel vorliegt, ist eine Testosteron-Substitution die Standardtherapie."
      }
    ],
    phase4Questions: [
      {
        id: "chromosom_mc1",
        type: "mc",
        question: "Welche Aussagen zum Down-Syndrom sind korrekt?",
        options: [
          { text: "Freie Trisomie 21 macht ca. 95 % der Fälle aus", correct: true },
          { text: "Translokationstrisomie kann familiär vererbt werden", correct: true },
          { text: "Das Risiko für Down-Syndrom sinkt mit zunehmendem mütterlichem Alter", correct: false },
          { text: "Alle drei Formen (freie Trisomie, Translokation, Mosaik) haben identischen klinischen Verlauf", correct: false }
        ]
      },
      {
        id: "chromosom_mc2",
        type: "mc",
        question: "Welche pränatalen Noxen und ihre Folgen sind korrekt zugeordnet?",
        options: [
          { text: "Rauchen → Wachstumsretardierung und erhöhtes SIDS-Risiko", correct: true },
          { text: "Alkohol → häufigste nicht-genetische geistige Behinderung (FAS)", correct: true },
          { text: "Röteln in der Frühschwangerschaft → Gregg-Trias (Herzfehler, Katarakt, Schwerhörigkeit)", correct: true },
          { text: "Rauchen → ausschließlich Herzfehler ohne Wachstumsfolgen", correct: false }
        ]
      }
    ]
  })

];

// ─── Studienbrief 1037 — Blut und Lymphsystem ─────────────────────────────

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
        solution: "Blutserum entsteht nach der Blutgerinnung: Fibrinogen ist zu Fibrin umgewandelt und nicht mehr vorhanden. Blutplasma hingegen ist der zellarme Anteil vor der Gerinnung und enthält noch Fibrinogen sowie alle anderen Plasmaproteine. Plasma entsteht durch Zentrifugation mit Gerinnungshemmern."
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
        question: "Welche Aussage zur medikamentösen Agranulozytose ist korrekt?",
        options: [
          { text: "Paracetamol, Phenacetin und Pyrazol-Derivate können reversibel die Granulozytenbildung hemmen", correct: true },
          { text: "Agranulozytose führt dauerhaft zum Verlust aller Leukozyten", correct: false },
          { text: "Agranulozytose äußert sich als Erhöhung der neutrophilen Granulozyten", correct: false },
          { text: "Nur Basophile werden durch diese Medikamente beeinflusst", correct: false }
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
        solution: "Die unspezifische humorale Abwehr umfasst: Komplementsystem (Kaskade von >20 Proteinen → lytische Komplexe zerstören Bakterienmembranen direkt; Opsonierung markiert Pathogene für Phagozytose; Chemotaxis lockt Phagozyten an); Zytokine (Interleukine stimulieren Immunzellen, Interferone hemmen Virusreplikation, TNF aktiviert Entzündung); Akute-Phase-Reaktion (CRP steigt innerhalb von Stunden bis zu 1000-fach an – Zeichen systemischer Entzündung)."
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

// ─── Studienbrief 1038 — Verdauungstrakt ──────────────────────────────────

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

// ─── Studienbrief 1039 — Bauchspeicheldrüse ───────────────────────────────

const BAUCHSPEICHELDRUESE_1039_PLANTS = [

  makeDetailedPlant({
    id: "pankreas_anatomie",
    title: "Pankreas: Anatomie, Abschnitte und Ausführungsgänge",
    contextHint: "Studienbrief 1039 Bauchspeicheldrüse – Anatomie",
    phase1: {
      soil: {
        statement: "Das Pankreas gliedert sich makroskopisch in Kopf (Caput), Körper (Corpus) und Schwanz (Cauda); seine Gesamtlänge beträgt 13–20 cm bei einem Gewicht von 70–100 g.",
        answer: true,
        solution: "Das Pankreas ist ein unpaariges, primär exokrines Organ. Der Pankreaskopf liegt im hufeisenförmigen Bogen der Duodenalschlinge. Mikroskopisch bilden Acini (beerenförmig, je ca. 70 Acinuszellen) die exokrine Grundeinheit — ihre Gesamtheit ist das exokrine Pankreas. Die Blutversorgung erfolgt aus Ästen des Truncus coeliacus und der A. mesenterica superior; das venöse Blut fließt über die Pfortaderbahnen ab."
      },
      seed: {
        statement: "Der endokrine Anteil der Bauchspeicheldrüse macht den Hauptteil des Gewebes aus und ist für die Produktion von Verdauungsenzymen zuständig.",
        answer: false,
        solution: "Der endokrine Anteil (Langerhans-Inseln) macht nur ca. 2% des Gewebes aus und produziert Hormone (Insulin, Glukagon) — keine Verdauungsenzyme. Den weitaus größten Teil (~98%) bildet das exokrine Parenchym (Acini), das Verdauungsenzyme und Bikarbonat produziert. Es gibt 500.000–1.500.000 Langerhans-Inseln mit einem Gesamtgewicht von 1–2 g."
      },
      water: {
        statement: "Der Ductus pancreaticus und der Ductus choledochus münden gemeinsam an der Vater-Papille (Papilla duodeni major) in das Duodenum; der Sekretfluss wird vom Sphinkter Oddi kontrolliert.",
        answer: true,
        solution: "Das von den Acini sezernierte Sekret fließt über ein Gangsystem in den Ductus pancreaticus. Daneben existiert häufig ein Ductus pancreaticus accessorius (mündet gesondert ins Duodenum). Der Hauptgang vereinigt sich mit dem Ductus choledochus (Gallengang) und mündet gemeinsam über den Sphinkter Oddi (ringförmiger Schließmuskel) an der Vater-Papille (Papilla vateri / Papilla duodeni major) in den absteigenden Teil des Duodenums."
      }
    },
    harvestQuestions: [
      {
        id: "pankreas_anatomie_h1",
        type: "mc",
        question: "In welcher anatomischen Struktur liegt der Pankreaskopf eingebettet?",
        options: [
          { text: "Im hufeisenförmigen Bogen der Duodenalschlinge", correct: true },
          { text: "Im Winkel zwischen Magen und Milz", correct: false },
          { text: "Im Mesenterium des Dünndarms", correct: false },
          { text: "Im Ligamentum hepatoduodenale", correct: false }
        ],
        explanation: "Der Pankreaskopf (Caput pancreatis) liegt innerhalb des hufeisenförmigen Bogens der Duodenalschlinge. Die dort vorhandene Muskulatur hat sich zurückgebildet, da sie die zahlreichen Ausführungsgänge der Verdauungsdrüsen sonst zusammendrücken würde."
      },
      {
        id: "pankreas_anatomie_h2",
        type: "true_false",
        statement: "Die Langerhans-Inseln machen etwa 2% des Pankreasgewebes aus und sind stärker im Pankreasschwanz als im Kopfbereich konzentriert.",
        answer: true,
        explanation: "Die endokrinen Langerhans-Inseln liegen inselartig im exokrinen Parenchym und machen nur ca. 2% des Gewebes aus. Sie sind im Pankreasschwanz (Cauda) dichter konzentriert als im Kopfbereich."
      },
      {
        id: "pankreas_anatomie_h3",
        type: "mc",
        question: "Wie wird die gemeinsame Einmündungsstelle von Ductus pancreaticus und Ductus choledochus in das Duodenum bezeichnet?",
        options: [
          { text: "Vater-Papille (Papilla duodeni major / Papilla vateri)", correct: true },
          { text: "Sphinkter Oddi", correct: false },
          { text: "Ductus pancreaticus accessorius", correct: false },
          { text: "Papilla duodeni minor", correct: false }
        ],
        explanation: "Die Vater-Papille (Papilla duodeni major) ist die Eintrittsstelle beider Gänge in das Duodenum. Der Sphinkter Oddi ist der ringförmige Schließmuskel, der den gemeinsamen Gang abschließt und den Sekretfluss reguliert."
      },
      {
        id: "pankreas_anatomie_h4",
        type: "mc",
        question: "Wie lautet die Bezeichnung für die mikroskopische Grundeinheit des exokrinen Pankreas?",
        options: [
          { text: "Acinus (pl. Acini)", correct: true },
          { text: "Langerhans-Insel", correct: false },
          { text: "Lobulus", correct: false },
          { text: "Zymogen", correct: false }
        ],
        explanation: "Die Acini sind beerenförmige Drüsenendstücke, bestehend aus je ca. 70 Acinuszellen. Ihre Gesamtheit bildet das exokrine Pankreas. Die Acini sind in Läppchen (Lobuli) organisiert."
      },
      {
        id: "pankreas_anatomie_h5",
        type: "true_false",
        statement: "Das Pankreas ist ein primär exokrines Organ, in das inselartig endokrine Zellen (Langerhans-Inseln) eingebettet sind, die Hormone produzieren.",
        answer: true,
        explanation: "Das Pankreas ist primär exokrin (Verdauungsenzyme + Bikarbonat) — der endokrine Anteil (Langerhans-Inseln mit Insulin und Glukagon) ist sekundär eingebettet und macht nur 2% des Gewebes aus."
      }
    ],
    phase4Questions: [
      {
        id: "pankreas_anatomie_mc1",
        type: "mc",
        question: "Welche Aussagen zur Anatomie des Pankreas sind korrekt?",
        options: [
          { text: "Das Pankreas hat eine Länge von 13–20 cm und wiegt 70–100 g", correct: true },
          { text: "Der Pankreaskopf liegt im hufeisenförmigen Bogen der Duodenalschlinge", correct: true },
          { text: "Der Sphinkter Oddi kontrolliert den Sekretfluss aus Ductus pancreaticus und Ductus choledochus", correct: true },
          { text: "Der endokrine Anteil (Langerhans-Inseln) macht ca. 50% des Pankreasgewebes aus", correct: false }
        ]
      },
      {
        id: "pankreas_anatomie_mc2",
        type: "mc",
        question: "Welche Aussagen zum exo- und endokrinen Pankreas sind korrekt?",
        options: [
          { text: "Die Gesamtheit aller Acini bildet das exokrine Pankreas", correct: true },
          { text: "Die Gesamtheit aller Langerhans-Inseln bildet das endokrine Pankreas (Inselorgan)", correct: true },
          { text: "Das venöse Blut der Langerhans-Inseln wird über die Pfortader zur Leber geleitet", correct: true },
          { text: "Die Acini produzieren Insulin und Glukagon", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "proteinstoffwechsel",
    title: "Proteinstoffwechsel: Verdauung, Resorption und Bedarf",
    contextHint: "Studienbrief 1039 Bauchspeicheldrüse – Proteinstoffwechsel",
    phase1: {
      soil: {
        statement: "Proteine bestehen hauptsächlich aus Kohlenstoff, Sauerstoff, Wasserstoff und Stickstoff; ihre Bausteine sind Aminosäuren, die durch Peptidbindungen verknüpft sind.",
        answer: true,
        solution: "Proteine sind Aufbaustoffe mit vielfältigen Aufgaben: Bau- und Reparaturstoff (Muskeln, Blut, Enzyme, Hormone), Ausgangsstoffe für Katecholamine (Adrenalin, Dopamin), Serotonin und Gewebshormone. Tierische Quellen: Fleisch, Milch, Käse, Eier, Fisch. Pflanzliche Quellen: Soja, Nüsse, Bohnen, Hafer, Pilze. Resorption im oberen Jejunum durch passive Diffusion und aktiven Transport. 1 g EW = 4,1 kcal; Mindestbedarf 0,5 g/kg KG/Tag."
      },
      seed: {
        statement: "Erwachsene können intakte native Proteinmoleküle direkt aus dem Darm resorbieren, ohne dass eine enzymatische Aufspaltung notwendig ist.",
        answer: false,
        solution: "Nativ gefaltete Proteine sind für Erwachsene nicht verwertbar. Erst die Denaturierung im Magen (durch Magensalzsäure: Oberflächenvergrößerung) und enzymatische Spaltung (Pepsin → Polypeptide; Trypsin/Chymotrypsin → Tri-/Dipeptide; Erepsin/Exopeptidasen → Aminosäuren) ermöglicht die Resorption im oberen Jejunum. Beim Säugling werden noch Proteine direkt resorbiert — beim Erwachsenen ist dies pathologisch."
      },
      water: {
        statement: "Der tägliche Eiweißmindestbedarf liegt bei ca. 0,5 g/kg KG/Tag; für normale Leistungsfähigkeit werden 0,8–1 g/kg benötigt. 1 g Eiweiß liefert 4,1 kcal.",
        answer: true,
        solution: "Die Umsatzrate körpereigener Aminosäuren beträgt im Durchschnitt 80–100 g/Tag. Körpereigene und darmresorbierte AS sind biochemisch identisch — sie bilden gemeinsam den Aminosäurenpool. Der tägliche EW-Bedarf deckt ca. 10–15% des Energiebedarfs. In der Niere werden die meisten aus dem Blut filtrierten Aminosäuren rückresorbiert."
      }
    },
    harvestQuestions: [
      {
        id: "proteinstoffwechsel_h1",
        type: "mc",
        question: "Wo werden Aminosäuren im Darm überwiegend resorbiert?",
        options: [
          { text: "Im oberen Jejunum durch passive Diffusion und aktiven Transport", correct: true },
          { text: "Im terminalen Ileum", correct: false },
          { text: "Im Duodenum", correct: false },
          { text: "Im Dickdarm durch bakterielle Fermentation", correct: false }
        ],
        explanation: "Die Resorption der Aminosäuren erfolgt vorwiegend im oberen Jejunum durch passive Diffusion und aktiven Transport. Im terminalen Ileum wird ausschließlich Vitamin B₁₂ resorbiert."
      },
      {
        id: "proteinstoffwechsel_h2",
        type: "true_false",
        statement: "Körpereigene Aminosäuren und aus dem Darm resorbierte Aminosäuren sind biochemisch identisch — sie bilden gemeinsam den Aminosäurenpool.",
        answer: true,
        explanation: "Der Aminosäurenpool deckt den gesamten Bedarf des Körpers an Aminosäuren. Körpereigene (aus Proteinabbau) und nahrungsresorbierte Aminosäuren unterscheiden sich in keiner Weise."
      },
      {
        id: "proteinstoffwechsel_h3",
        type: "mc",
        question: "Welche Funktion hat die Denaturierung der Proteine im Magen durch Magensalzsäure?",
        options: [
          { text: "Sie vergrößert die Oberfläche der Proteine und ermöglicht Enzymen eine bessere Angriffsfläche", correct: true },
          { text: "Sie spaltet Proteine direkt vollständig in Aminosäuren auf", correct: false },
          { text: "Sie neutralisiert den Magensaft", correct: false },
          { text: "Sie aktiviert den Intrinsic-Faktor für die Vitamin-B₁₂-Resorption", correct: false }
        ],
        explanation: "Denaturierung durch HCl entfaltet die komplex gefalteten Proteine → Oberflächenvergrößerung → bessere Angriffsfläche für Pepsin. Pepsin spaltet die Proteine dann zu Polypeptiden (pH-Optimum 2,5). Die eigentliche enzymatische Spaltung zu Aminosäuren erfolgt im Dünndarm."
      },
      {
        id: "proteinstoffwechsel_h4",
        type: "true_false",
        statement: "Die Eiweißverdauung kann auch nach operativer Entfernung des Magens stattfinden, da Pankreasenzyme den Beitrag des Magens vollständig übernehmen können.",
        answer: true,
        explanation: "Der Beitrag des Magens zum Proteinabbau (Denaturierung + Pepsin) kann von den eiweißspaltenden Enzymen der Bauchspeicheldrüse übernommen werden — Eiweißverdauung ist selbst bei Magenresektion nicht wesentlich gestört."
      },
      {
        id: "proteinstoffwechsel_h5",
        type: "mc",
        question: "Welche Aussage zum täglichen Eiweißbedarf und Kalorienwert ist korrekt?",
        options: [
          { text: "Mindestbedarf ca. 0,5 g/kg KG; 1 g EW = 4,1 kcal; EW deckt 10–15% des Energiebedarfs", correct: true },
          { text: "Mindestbedarf ca. 2 g/kg KG; 1 g EW = 9,3 kcal", correct: false },
          { text: "Mindestbedarf ca. 0,5 g/kg KG; 1 g EW = 4,2 kcal", correct: false },
          { text: "EW sollte 50–60% des täglichen Energiebedarfs decken", correct: false }
        ],
        explanation: "Mindestbedarf: 0,5 g/kg KG/Tag; für Leistungsfähigkeit: 0,8–1 g/kg KG/Tag. Kalorienwert: 1 g EW = 4,1 kcal. EW deckt 10–15% des Energiebedarfs (KH 50–60%, Fett 25–30%)."
      }
    ],
    phase4Questions: [
      {
        id: "proteinstoffwechsel_mc1",
        type: "mc",
        question: "Welche Aussagen zum Proteinstoffwechsel sind korrekt?",
        options: [
          { text: "Proteine bestehen hauptsächlich aus C, O, H und N", correct: true },
          { text: "Aminosäuren werden vorwiegend im oberen Jejunum resorbiert", correct: true },
          { text: "1 g Eiweiß liefert 4,1 kcal", correct: true },
          { text: "Intakte native Proteine können beim Erwachsenen direkt ohne Aufspaltung resorbiert werden", correct: false }
        ]
      },
      {
        id: "proteinstoffwechsel_mc2",
        type: "mc",
        question: "Welche Aussagen zu Eiweißbedarf und -funktion sind korrekt?",
        options: [
          { text: "Der Mindestbedarf an Eiweiß liegt bei ca. 0,5 g/kg KG/Tag", correct: true },
          { text: "Eiweiß dient als Bau- und Reparaturstoff für Muskeln, Enzyme und Hormone", correct: true },
          { text: "Aminosäuren sind Ausgangsstoffe für Katecholamine (Adrenalin, Dopamin) und Serotonin", correct: true },
          { text: "Eiweiß deckt ca. 50–60% des täglichen Energiebedarfs", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "lipidstoffwechsel",
    title: "Lipidstoffwechsel: Verdauung, Resorption und Transport",
    contextHint: "Studienbrief 1039 Bauchspeicheldrüse – Lipidstoffwechsel",
    phase1: {
      soil: {
        statement: "Fette (Lipide) dienen als Energielieferant (1 g = 9,3 kcal), Reservestoff und Aufbaustoff; der tägliche Fettbedarf liegt bei ca. 25–30% des Energiebedarfs.",
        answer: true,
        solution: "Die tägliche Fettaufnahme beträgt ca. 60–100 g. Hauptbestandteil sind Neutralfette (Triglyceride, 90%); dazu kommen Phospholipide, Cholesterinester und die fettlöslichen Vitamine E, D, A und K. Ca. 95% der Nahrungsfette werden im Dünndarm absorbiert. Man unterscheidet gesättigte, einfach ungesättigte und mehrfach ungesättigte Fettsäuren (essenziell). Strukturlipide sind Bestandteile der Zellmembran; Neutralfette werden in Fettdepots gespeichert."
      },
      seed: {
        statement: "Fette werden im Magen durch Gallensäure chemisch emulgiert und können dort zu fast 100% resorbiert werden.",
        answer: false,
        solution: "Die chemische Emulgierung erfolgt nicht im Magen, sondern im Dünndarm durch Gallensäure (Bildung von Mizellen). Im Magen findet nur eine mechanische Emulgierung statt. Gastrische Lipase spaltet lediglich 10–30% der Fette. 70–90% werden erst im Duodenum und oberen Jejunum verdaut und zu ca. 95% insgesamt resorbiert."
      },
      water: {
        statement: "Langkettige Fettsäuren werden in Enterozyten zu Triglyceriden aufgebaut, als Chylomikronen über die Lymphgefäße und den Ductus thoracicus in den Blutkreislauf eingeschleust; kurz-/mittelkettige Fettsäuren gelangen direkt über die Pfortader zur Leber.",
        answer: true,
        solution: "Monoglyceride und freie Fettsäuren werden in Mizellen zum Bürstensaum der Mucosazellen transportiert, dort aufgenommen und im endoplasmatischen Retikulum wieder zu Triglyceriden zusammengesetzt. Langkettige FS → Chylomikronen (Liproproteinhülle) → Lymphgefäße der Darmzotten → Ductus thoracicus → linker oberer Venenwinkel. Kurz-/mittelkettige FS → direkt über die Pfortader → Leber."
      }
    },
    harvestQuestions: [
      {
        id: "lipidstoffwechsel_h1",
        type: "mc",
        question: "Welches sind die mengenmäßig häufigsten Nahrungsfette?",
        options: [
          { text: "Neutralfette (Triglyceride) — ca. 90% der Nahrungsfette", correct: true },
          { text: "Phospholipide — ca. 90% der Nahrungsfette", correct: false },
          { text: "Cholesterinester — ca. 90% der Nahrungsfette", correct: false },
          { text: "Fettlösliche Vitamine — ca. 90% der Nahrungsfette", correct: false }
        ],
        explanation: "Triglyceride (Neutralfette) machen ca. 90% der täglich aufgenommenen Fette aus. Dazu kommen Phospholipide, Cholesterinester und fettlösliche Vitamine E, D, A und K."
      },
      {
        id: "lipidstoffwechsel_h2",
        type: "true_false",
        statement: "Für die chemische Emulgierung der Fette im Dünndarm ist Gallensäure notwendig, die als Emulgator Mizellen bildet.",
        answer: true,
        explanation: "Gallensäure emulgiert Fette im Dünndarm chemisch: Die relativen kleinen Fetttröpfchen einer Emulsion bieten den Lipasen eine große Angriffsfläche. Die resultierenden Mizellen transportieren Monoglyceride und freie Fettsäuren zum Bürstensaum der Darmmucosa."
      },
      {
        id: "lipidstoffwechsel_h3",
        type: "mc",
        question: "Welche Transportmoleküle befördern langkettige Fettsäuren aus dem Dünndarm in das Lymphsystem?",
        options: [
          { text: "Chylomikronen", correct: true },
          { text: "Albumin", correct: false },
          { text: "Hämoglobin", correct: false },
          { text: "HDL (High-density Lipoprotein)", correct: false }
        ],
        explanation: "Chylomikronen sind Lipoproteinpartikel, die in den Enterozyten gebildet werden und langkettige Fettsäuren (als Triglyceride verpackt) über die Lymphgefäße der Darmzotten → Ductus thoracicus in den Blutkreislauf befördern. Albumin transportiert kurzkettige freie Fettsäuren über die Pfortader."
      },
      {
        id: "lipidstoffwechsel_h4",
        type: "mc",
        question: "Welcher Anteil der Nahrungsfette wird bereits im Magen gespalten?",
        options: [
          { text: "10–30% durch gastrische Lipase", correct: true },
          { text: "70–90% durch gastrische Lipase", correct: false },
          { text: "Nahezu 0% — der Magen enthält keine Lipase", correct: false },
          { text: "95% durch mechanische Emulgierung", correct: false }
        ],
        explanation: "Die gastrische Lipase spaltet 10–30% der Nahrungsfette im Magen. Die restlichen 70–90% werden im Duodenum und oberen Jejunum durch Pankreaslipase (mit Gallensäure) verdaut. Insgesamt werden ca. 95% der Nahrungsfette im Dünndarm absorbiert."
      },
      {
        id: "lipidstoffwechsel_h5",
        type: "true_false",
        statement: "Zu den essenziellen Fettsäuren zählen mehrfach ungesättigte Fettsäuren, da der Körper sie nicht selbst synthetisieren kann.",
        answer: true,
        explanation: "Essenzielle Fettsäuren (z. B. Linolsäure, Linolensäure) sind mehrfach ungesättigt und müssen mit der Nahrung aufgenommen werden, da der Körper sie nicht selbst herstellen kann. Gesättigte und einfach ungesättigte Fettsäuren kann der Körper aus anderen Substraten synthetisieren."
      }
    ],
    phase4Questions: [
      {
        id: "lipidstoffwechsel_mc1",
        type: "mc",
        question: "Welche Aussagen zur Fettverdauung und -resorption sind korrekt?",
        options: [
          { text: "Im Magen findet nur mechanische Emulgierung und geringe Fettspaltung (10–30%) statt", correct: true },
          { text: "Gallensäure emulgiert Fette im Dünndarm chemisch und bildet Mizellen", correct: true },
          { text: "Ca. 95% der Nahrungsfette werden im Dünndarm absorbiert", correct: true },
          { text: "Fette werden hauptsächlich im Dickdarm resorbiert", correct: false }
        ]
      },
      {
        id: "lipidstoffwechsel_mc2",
        type: "mc",
        question: "Welche Aussagen zu Fetten und Fettstoffwechsel sind korrekt?",
        options: [
          { text: "1 g Fett liefert 9,3 kcal", correct: true },
          { text: "Langkettige Fettsäuren gelangen als Chylomikronen über Lymphgefäße in den Blutkreislauf", correct: true },
          { text: "Strukturlipide sind Bestandteile der Zellmembran und Zellorganellen", correct: true },
          { text: "Kurz- und mittelkettige Fettsäuren werden als Chylomikronen über Lymphgefäße transportiert", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "kh_stoffwechsel",
    title: "Kohlenhydratstoffwechsel: Verdauung, Enzyme und Resorption",
    contextHint: "Studienbrief 1039 Bauchspeicheldrüse – Kohlenhydratstoffwechsel",
    phase1: {
      soil: {
        statement: "Die Kohlenhydratverdauung beginnt bereits im Mund durch Ptyalin (Alpha-Amylase der Parotis); im Duodenum setzt Pankreas-Amylase die Aufspaltung fort, bis im Dünndarm Monosaccharide resorbiert werden.",
        answer: true,
        solution: "Kohlenhydrate decken 50–60% des Kalorienbedarfs (1 g KH = 4,2 kcal). Polysaccharide → müssen zu Monosacchariden aufgespalten werden. Im Mund: Ptyalin (Alpha-Amylase) → Stärke zu Oligo-/Disacchariden. Im Duodenum: Pankreas-Alpha-Amylase → Dextrine + Maltose. Im Dünndarm: Maltase (Maltose → 2 Glucose), Saccharase (Saccharose → Glucose + Fruktose), Lactase aus Darmkrypten (Lactose → Galaktose + Glucose). Resorption: Monosaccharide → Pfortader → Blutkreislauf."
      },
      seed: {
        statement: "Im Magen findet eine aktive enzymatische Kohlenhydratverdauung statt — Magensaft enthält ein spezifisches Kohlenhydrat-spaltendes Enzym.",
        answer: false,
        solution: "Im Magen findet keine Kohlenhydratverdauung statt: Es gibt kein kohlenhydratspaltendes Enzym im Magensaft (der pH wäre für Amylasen ohnehin zu sauer). Die Amylase des Speichels ist noch kurzzeitig aktiv, bis der saure Magensaft sie inaktiviert. Die eigentliche Kohlenhydratverdauung erfolgt im Duodenum (Pankreas-Amylase) und Dünndarm (Maltase, Saccharase, Lactase)."
      },
      water: {
        statement: "Monosaccharide werden aus den Mucosazellen des Dünndarms über die Pfortaderstrombahn in den Blutkreislauf abgegeben und dienen als Brennstoff zur Energiegewinnung.",
        answer: true,
        solution: "Die Aufnahme der Monosaccharide in die Mucosazellen erfolgt z.T. durch Diffusion, überwiegend durch passiven Transport. Sie werden dann über Diffusion in die Pfortaderstrombahn abgegeben und gelangen so in den Blutkreislauf → Energiegewinnung in den Zellen. Alpha-Amylase findet sich in Pankreas und Parotis (Ohrspeicheldrüse) — die stündliche Amylasesekretion des Pankreas reicht für ca. 300 g Stärke."
      }
    },
    harvestQuestions: [
      {
        id: "kh_stoffwechsel_h1",
        type: "mc",
        question: "Welches Enzym spaltet Lactose in Galaktose und Glucose?",
        options: [
          { text: "Lactase (gebildet in den Krypten der Darmschleimhaut)", correct: true },
          { text: "Maltase", correct: false },
          { text: "Saccharase", correct: false },
          { text: "Alpha-Amylase", correct: false }
        ],
        explanation: "Lactase wird in den Krypten der Darmschleimhaut gebildet und spaltet Lactose (Milchzucker) in Galaktose und Glucose. Maltase spaltet Maltose → 2 Glucose; Saccharase spaltet Saccharose → Glucose + Fruktose."
      },
      {
        id: "kh_stoffwechsel_h2",
        type: "true_false",
        statement: "Kohlenhydrate decken 50–60% des täglichen Kalorienbedarfs, und 1 g Kohlenhydrate liefert 4,2 kcal.",
        answer: true,
        explanation: "Kohlenhydrate sind der wichtigste Energielieferant. Ihr Anteil am Energiebedarf beträgt 50–60%. 1 g KH = 4,2 kcal (zum Vergleich: Fett 9,3 kcal/g, Eiweiß 4,1 kcal/g)."
      },
      {
        id: "kh_stoffwechsel_h3",
        type: "mc",
        question: "In welcher Form werden Kohlenhydrate im Dünndarm überwiegend resorbiert?",
        options: [
          { text: "Als Monosaccharide (überwiegend Glukose)", correct: true },
          { text: "Als Disaccharide", correct: false },
          { text: "Als Polysaccharide", correct: false },
          { text: "Als Oligosaccharide", correct: false }
        ],
        explanation: "Polysaccharide werden schrittweise abgebaut: Amylase → Dextrine/Maltose; Maltase/Saccharase/Lactase → Monosaccharide. Nur Monosaccharide (überwiegend Glukose) können von den Mucosazellen des Dünndarms resorbiert werden."
      },
      {
        id: "kh_stoffwechsel_h4",
        type: "mc",
        question: "Wo im menschlichen Körper findet sich Alpha-Amylase?",
        options: [
          { text: "In Pankreas und Parotis (Ohrspeicheldrüse)", correct: true },
          { text: "Nur im Pankreas", correct: false },
          { text: "In Pankreas, Magen und Leber", correct: false },
          { text: "In Leber und Niere", correct: false }
        ],
        explanation: "Alpha-Amylase (= Ptyalin im Speichel) kommt in den Sekreten der Bauchspeicheldrüse und der Ohrspeicheldrüse (Parotis) vor. Im Magen gibt es kein Amylase-Enzym."
      },
      {
        id: "kh_stoffwechsel_h5",
        type: "true_false",
        statement: "Saccharase spaltet Saccharose in Glucose und Fruktose.",
        answer: true,
        explanation: "Saccharase (auch Sucrase) spaltet den Haushaltszucker Saccharose in seine Bestandteile Glucose und Fruktose. Sie sitzt im Bürstensaum des Dünndarms."
      }
    ],
    phase4Questions: [
      {
        id: "kh_stoffwechsel_mc1",
        type: "mc",
        question: "Welche Aussagen zur Kohlenhydratverdauung sind korrekt?",
        options: [
          { text: "Die Verdauung beginnt im Mund durch Ptyalin (Alpha-Amylase der Parotis)", correct: true },
          { text: "Im Magen findet keine enzymatische Kohlenhydratverdauung statt", correct: true },
          { text: "Im Dünndarm werden Monosaccharide über die Pfortader in den Blutkreislauf abgegeben", correct: true },
          { text: "Polysaccharide können direkt ohne Aufspaltung resorbiert werden", correct: false }
        ]
      },
      {
        id: "kh_stoffwechsel_mc2",
        type: "mc",
        question: "Welche Zuordnungen von KH-spaltendem Enzym und Substrat sind korrekt?",
        options: [
          { text: "Alpha-Amylase: Polysaccharide → Dextrine + Maltose", correct: true },
          { text: "Maltase: Maltose → 2 Glucose-Einheiten", correct: true },
          { text: "Saccharase: Saccharose → Glucose + Fruktose", correct: true },
          { text: "Saccharase: Lactose → Galaktose + Glucose", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "pankreasenzyme_protein",
    title: "Pankreatische Proteasen: Zymogene und Aktivierungskaskade",
    contextHint: "Studienbrief 1039 Bauchspeicheldrüse – Proteinspaltende Enzyme",
    phase1: {
      soil: {
        statement: "Proteasen des Pankreas werden als inaktive Vorstufen (Zymogene) sezerniert und erst im Dünndarm aktiviert — dies verhindert eine Selbstverdauung des Pankreas.",
        answer: true,
        solution: "Es gibt zwei Gruppen: Endopeptidasen (spalten Peptidketten innerhalb des Moleküls: Trypsin, Chymotrypsin, Elastase) und Exopeptidasen (spalten Aminosäuren einzeln vom Carboxylende ab: Carboxypeptidase A und B). Proenzyme: Trypsinogen → Trypsin (durch Enterokinase aus Duodenalschleimhaut); Chymotrypsinogen → Chymotrypsin (durch Trypsin); Proelastase → Elastase (durch Trypsin); Procarboxypeptidasen → Carboxypeptidasen (durch Trypsin). pH-Optimum Pepsin: 2,5; Trypsin/Chymotrypsin: 7,5."
      },
      seed: {
        statement: "Trypsinogen wird primär durch Trypsin selbst aktiviert; die Enterokinase (Enteropeptidase) der Duodenalschleimhaut spielt keine Rolle für die initiale Aktivierung.",
        answer: false,
        solution: "Trypsinogen wird primär durch Enteropeptidase (Enterokinase) aus der Duodenalschleimhaut aktiviert. Sobald Trypsin gebildet ist, löst es eine Kettenreaktion aus: Trypsin aktiviert weiteres Trypsinogen sowie alle anderen Proenzyme (Chymotrypsinogen, Proelastase, Procarboxypeptidasen). Die Enterokinasesekretion wird durch Cholecystokinin gesteigert."
      },
      water: {
        statement: "Endopeptidasen (Trypsin, Chymotrypsin, Elastase) spalten Peptidbindungen innerhalb des Proteinmoleküls; Exopeptidasen (Carboxypeptidase A und B) entfernen anschließend einzelne Aminosäuren vom Carboxylende.",
        answer: true,
        solution: "Endopeptidasen setzen mitten in der Sequenz an und spalten das Protein in große Hälften → Vorbereitung für Exopeptidasen. Exopeptidasen (Carboxypeptidase A und B, Vorstufen: Procarboxypeptidase A und B) zerlegen einen Eiweißkörper dann Stück für Stück vom Carboxylende. Die stündliche Produktion eiweißspaltender Pankreasfermente vermag ca. 300 g Kasein abzubauen."
      }
    },
    harvestQuestions: [
      {
        id: "pankreasenzyme_protein_h1",
        type: "mc",
        question: "Durch welches Enzym wird Trypsinogen primär zu Trypsin aktiviert?",
        options: [
          { text: "Enteropeptidase (Enterokinase) aus der Duodenalschleimhaut", correct: true },
          { text: "Durch Pepsin aus dem Magen", correct: false },
          { text: "Durch Chymotrypsin", correct: false },
          { text: "Durch Sekretin", correct: false }
        ],
        explanation: "Enterokinase (Enteropeptidase) aus der Duodenalschleimhaut aktiviert primär Trypsinogen → Trypsin. Trypsin aktiviert dann weitere Proenzyme (Kettenreaktion). Die Enterokinasesekretion wird durch CCK gesteigert."
      },
      {
        id: "pankreasenzyme_protein_h2",
        type: "true_false",
        statement: "Trypsin kann eine Kettenreaktion auslösen, indem es Chymotrypsinogen, Proelastase und Procarboxypeptidasen aktiviert.",
        answer: true,
        explanation: "Sobald Trypsin gebildet ist, aktiviert es alle anderen Proenzyme: Chymotrypsinogen → Chymotrypsin, Proelastase → Elastase, Procarboxypeptidasen → Carboxypeptidasen, sowie weiteres Trypsinogen (Autokatalyse). Dies ist eine effiziente Aktivierungskaskade."
      },
      {
        id: "pankreasenzyme_protein_h3",
        type: "mc",
        question: "Was ist ein Zymogen?",
        options: [
          { text: "Die inaktive Vorstufe eines Verdauungsenzyms, die erst im Dünndarm aktiviert wird", correct: true },
          { text: "Ein Enzym, das Nukleinsäuren spaltet", correct: false },
          { text: "Ein Transportprotein für Verdauungsenzyme im Blut", correct: false },
          { text: "Ein Hormon der Langerhans-Inseln", correct: false }
        ],
        explanation: "Zymogen (= inaktive Vorstufe einer Endopeptidase) ist die Form, in der Pankreasproteasen sezerniert werden. Aktivierung beginnt erst im Dünndarm — verhindert Selbstverdauung bei eventuellen Rückstaus."
      },
      {
        id: "pankreasenzyme_protein_h4",
        type: "mc",
        question: "Welche Enzyme gehören zu den Endopeptidasen des Pankreas?",
        options: [
          { text: "Trypsin, Chymotrypsin und Elastase", correct: true },
          { text: "Carboxypeptidase A und B", correct: false },
          { text: "Pankreaslipase und Phospholipase", correct: false },
          { text: "Maltase und Saccharase", correct: false }
        ],
        explanation: "Endopeptidasen: Trypsin, Chymotrypsin, Elastase — sie spalten innerhalb der Peptidkette. Exopeptidasen: Carboxypeptidase A und B — sie spalten Aminosäuren vom Carboxylende ab."
      },
      {
        id: "pankreasenzyme_protein_h5",
        type: "mc",
        question: "Wo im Verdauungstrakt werden Proteine vollständig zu Aminosäuren abgebaut?",
        options: [
          { text: "Im Dünndarm durch Exopeptidasen (Erepsin)", correct: true },
          { text: "Im Magen durch Pepsin allein", correct: false },
          { text: "Im Duodenum durch Trypsin allein", correct: false },
          { text: "Im Dickdarm durch Bakterien", correct: false }
        ],
        explanation: "Im Magen: Denaturierung + Pepsin → Polypeptide. Im Zwölffingerdarm: Trypsin/Chymotrypsin → Tri-/Dipeptide. Im Dünndarm: Exopeptidasen (Erepsin) → vollständiger Abbau zu Aminosäuren, die dann resorbiert werden."
      }
    ],
    phase4Questions: [
      {
        id: "pankreasenzyme_protein_mc1",
        type: "mc",
        question: "Welche Aussagen zu proteinspaltenden Enzymen und ihrer Aktivierung sind korrekt?",
        options: [
          { text: "Trypsinogen wird durch Enterokinase aus der Duodenalschleimhaut primär aktiviert", correct: true },
          { text: "Trypsin aktiviert Chymotrypsinogen, Proelastase und Procarboxypeptidasen", correct: true },
          { text: "Proenzyme werden als Zymogene sezerniert, um Selbstverdauung zu verhindern", correct: true },
          { text: "Proenzyme werden bereits im Pankreas selbst aktiviert", correct: false }
        ]
      },
      {
        id: "pankreasenzyme_protein_mc2",
        type: "mc",
        question: "Welche Aussagen zum Eiweißabbau im Verdauungstrakt sind korrekt?",
        options: [
          { text: "Im Magen denaturiert HCl die Proteine und Pepsin spaltet sie zu Polypeptiden (pH-Optimum 2,5)", correct: true },
          { text: "Im Zwölffingerdarm spalten Endopeptidasen (Trypsin, pH-Optimum 7,5) Polypeptide weiter", correct: true },
          { text: "Exopeptidasen (Carboxypeptidasen A+B) spalten Aminosäuren vom Carboxylende ab", correct: true },
          { text: "Die Eiweißverdauung beginnt im Mund durch Alpha-Amylase", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "pankreasenzyme_fett_nuklein",
    title: "Pankreatische Lipasen und Nukleinsäureenzyme",
    contextHint: "Studienbrief 1039 Bauchspeicheldrüse – Fett- und Nukleinsäurespaltung",
    phase1: {
      soil: {
        statement: "Die Pankreaslipase ist das wichtigste Enzym der Fettverdauung; sie wird aktiv sezerniert, benötigt aber die Anwesenheit von Gallensäure als Emulgator zur Wirkungsentfaltung.",
        answer: true,
        solution: "Fettspaltende Enzyme (Lipasen): Pankreaslipase, Phospholipasen (Lecithinasen) und Esterasen. Pankreaslipase ist das bedeutendste — ihr stündlicher Ausstoß reicht, um 175 g Olivenöl zu verdauen. Sie benötigt Gallensäure als Emulgator (Mizellen bieten große Angriffsfläche). Phospholipase hingegen wird inaktiv sezerniert und durch Trypsin im Duodenum aktiviert. Sie ist erst im Duodenum tätig."
      },
      seed: {
        statement: "Phospholipase wird aktiv sezerniert und ist bereits im Magen an der Fettverdauung beteiligt.",
        answer: false,
        solution: "Phospholipase wird inaktiv sezerniert (anders als die Pankreaslipase) und benötigt die Endopeptidase Trypsin zur Aktivierung. Sie ist erst im Duodenum tätig. Nur die Pankreaslipase wird aktiv sezerniert — und hier verdeutlicht die Enzymdualität die wichtige Rolle des Trypsins bei der Verdauung generell."
      },
      water: {
        statement: "Nukleinsäurespaltende Enzyme (Ribonuklease, Desoxyribonuklease) zerlegen Nukleinsäuren schrittweise zu Ribosen sowie Purin- und Pyrimidinbasen, die aktiv transportiert und für den Aufbau neuer Nukleinsäuren genutzt werden.",
        answer: true,
        solution: "Das Pankreas produziert Ribonuklease (spaltet RNA) und Desoxyribonuklease (spaltet DNA). Nach Aufspaltung der Nukleinsäuren im Darm zerlegen Enzyme der Schleimhautoberfläche weiter in Nucleosid + Phosphorsäure. Aus Nucleosiden entstehen schließlich Ribosen sowie Purin- und Pyrimidinbasen. Diese werden durch aktive Transportmechanismen resorbiert und dienen dem Aufbau neuer Nukleinsäuren."
      }
    },
    harvestQuestions: [
      {
        id: "pankreasenzyme_fett_nuklein_h1",
        type: "mc",
        question: "Welches ist das wichtigste Enzym der Fettverdauung?",
        options: [
          { text: "Pankreaslipase", correct: true },
          { text: "Phospholipase", correct: false },
          { text: "Esterase", correct: false },
          { text: "Zungengrundlipase", correct: false }
        ],
        explanation: "Die Pankreaslipase ist das bedeutendste fettspaltende Enzym. Ihr stündlicher Ausstoß reicht zur Verdauung von 175 g Olivenöl. Sie wird aktiv sezerniert und benötigt Gallensäure als Emulgator."
      },
      {
        id: "pankreasenzyme_fett_nuklein_h2",
        type: "true_false",
        statement: "Pankreaslipase benötigt die gleichzeitige Anwesenheit von Gallensäure als Emulgator, um wirksam zu sein.",
        answer: true,
        explanation: "Gallensäure emulgiert Fette zu kleinen Tröpfchen (Mizellen), die den Lipasen eine große Angriffsfläche bieten. Ohne Gallensäure ist die Pankreaslipase deutlich weniger wirksam — ein Gallengangsverschluss beeinträchtigt daher erheblich die Fettverdauung."
      },
      {
        id: "pankreasenzyme_fett_nuklein_h3",
        type: "mc",
        question: "Wie werden die Endprodukte der Nukleinsäurespaltung aus dem Darm resorbiert?",
        options: [
          { text: "Durch aktive Transportmechanismen in der Darmschleimhaut", correct: true },
          { text: "Durch passive Diffusion als intakte Nukleinsäuren", correct: false },
          { text: "Über den Ductus thoracicus als Chylomikronen", correct: false },
          { text: "Durch Endozytose in Enterozyten", correct: false }
        ],
        explanation: "Purin- und Pyrimidinbasen sowie Ribosen werden durch aktive Transportmechanismen aus der Darmschleimhaut resorbiert und anschließend für den Aufbau neuer Nukleinsäuren verwendet."
      },
      {
        id: "pankreasenzyme_fett_nuklein_h4",
        type: "mc",
        question: "Welche zwei nukleinsäurespaltenden Enzyme produziert das Pankreas?",
        options: [
          { text: "Ribonuklease und Desoxyribonuklease", correct: true },
          { text: "Alpha-Amylase und Maltase", correct: false },
          { text: "Trypsin und Chymotrypsin", correct: false },
          { text: "Carboxypeptidase A und B", correct: false }
        ],
        explanation: "Ribonuklease spaltet RNA, Desoxyribonuklease spaltet DNA. Beide Enzyme kommen im Pankreassaft vor und ermöglichen die Verdauung von Nukleinsäuren aus der Nahrung."
      },
      {
        id: "pankreasenzyme_fett_nuklein_h5",
        type: "true_false",
        statement: "Die Phospholipase wird anders als die Pankreaslipase inaktiv sezerniert und benötigt Trypsin zur Aktivierung im Duodenum.",
        answer: true,
        explanation: "Phospholipase (Lecithinase A) wird inaktiv sezerniert — zur Aktivierung ist die Endopeptidase Trypsin notwendig. Erst im Duodenum wird sie aktiviert und tätig. Pankreaslipase hingegen wird aktiv sezerniert."
      }
    ],
    phase4Questions: [
      {
        id: "pankreasenzyme_fett_nuklein_mc1",
        type: "mc",
        question: "Welche Aussagen zur Fettverdauung durch Pankreasenzyme sind korrekt?",
        options: [
          { text: "Pankreaslipase ist das wichtigste Enzym der Fettverdauung", correct: true },
          { text: "Pankreaslipase benötigt Gallensäure (Emulgator) zur Wirkungsentfaltung", correct: true },
          { text: "Phospholipase wird inaktiv sezerniert und durch Trypsin im Duodenum aktiviert", correct: true },
          { text: "Phospholipase wird aktiv sezerniert und ist bereits im Magen tätig", correct: false }
        ]
      },
      {
        id: "pankreasenzyme_fett_nuklein_mc2",
        type: "mc",
        question: "Welche Aussagen zur Enzymbereitstellung des Pankreas sind korrekt?",
        options: [
          { text: "Stimulierend wirken Cholecystokinin, Sekretin, Caerulein und (schwach) Gastrin", correct: true },
          { text: "Glukagon und Calcitonin (in hohen Dosen) hemmen die Pankreassekretion", correct: true },
          { text: "Ribonuklease und Desoxyribonuklease spalten Nukleinsäuren", correct: true },
          { text: "Eine Reduktion der Sekretionskapazität auf 10% des Normalwertes führt sofort zu Verdauungsstörungen", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "pankreassekretion_regulation",
    title: "Pankreassekretion: Zusammensetzung und 3-Phasen-Regulation",
    contextHint: "Studienbrief 1039 Bauchspeicheldrüse – Pankreassaftsekretion",
    phase1: {
      soil: {
        statement: "Das exokrine Pankreas produziert täglich 1,2–2 Liter Pankreassaft mit einem pH von ca. 8; der hohe Bikarbonatanteil neutralisiert den sauren Chymus im Duodenum.",
        answer: true,
        solution: "Pankreassaft ist blut-isoton (pH 8–8,4). Kationen: Na, K, Ca, Mg. Anionen: Bikarbonat (HCO₃), Cl, SO₄, HPO₄. 95% des Bikarbonats stammt aus dem Blut. Er enthält Enzyme und Proenzyme (Trypsinogen, Chymotrypsinogen, Procarboxypeptidasen, Proelastase, Ribonuklease, Lecithinase A, Pankreas-Lipase, Pankreas-Alpha-Amylase, Albumin, Globuline). Der Duodenalinhalt hat physiologisch pH 6,0–7,0; am Jejunum ist der Speisebrei nahezu neutral."
      },
      seed: {
        statement: "Die Hauptsekretion des Pankreassafts erfolgt in der kephalischen Phase durch Geruchs- und Geschmacksreize über den N. vagus.",
        answer: false,
        solution: "Die Hauptsekretion erfolgt in der intestinalen Phase, wenn Chymus das Duodenum erreicht. Die kephalische Phase (N. vagus: Geschmack, Geruch, Anblick, Vorstellung von Speisen) leitet nur die Basissekretion ein. Die gastrische Phase (Speisebrei → Magen → Gastrin) regt die Pankreassaftsekretion ebenfalls an. In der intestinalen Phase sind Sekretin (pH < 4,5 → S-Zellen des Duodenums) und CCK die entscheidenden Regulatoren."
      },
      water: {
        statement: "Sekretin wird in den S-Zellen des Duodenums bei pH < 4,5 freigesetzt, stimuliert die Bikarbonatsekretion des Pankreas, hemmt die Magensaftproduktion — und CCK stimuliert zusätzlich die Gallenblasenkontraction.",
        answer: true,
        solution: "Sekretin (aus S-Zellen des Duodenums): Reiz = Fette + niedriger pH. Über den Blutweg → Pankreas → fördert Pankreassaft + Bikarbonat; hemmt Magensaftproduktion. CCK (Cholecystokinin, Pankreomyzin; aus endokrinen Zellen): Reiz = fettreicher Speisebrei → Enzymanreicherung des Pankreassafts + Gallenblasenkontraction. Die Regulation erfolgt also nerval (N. vagus) + humoral (Sekretin, CCK, Gastrin, Caerulein)."
      }
    },
    harvestQuestions: [
      {
        id: "pankreassekretion_regulation_h1",
        type: "mc",
        question: "In welchen Zellen des Duodenums wird Sekretin gebildet?",
        options: [
          { text: "In den S-Zellen des Duodenums", correct: true },
          { text: "In den Belegzellen des Magens", correct: false },
          { text: "In den A-Zellen des Pankreas", correct: false },
          { text: "In den Acinuszellen des exokrinen Pankreas", correct: false }
        ],
        explanation: "Sekretin wird in den S-Zellen des Duodenums gebildet, wenn saurer Chymus (pH < 4,5) das Duodenum erreicht. Es gelangt über den Blutweg zum Pankreas und fördert die Bikarbonatsekretion."
      },
      {
        id: "pankreassekretion_regulation_h2",
        type: "true_false",
        statement: "Der pH-Wert des Pankreassafts liegt bei ca. 8 — der hohe Bikarbonatgehalt neutralisiert den sauren Chymus aus dem Magen im Duodenum.",
        answer: true,
        explanation: "Pankreassaft hat pH 8–8,4 (blut-isoton). Der Bikarbonatanteil neutralisiert den sauren Chymus (pH ~2 aus dem Magen) im Duodenum auf einen physiologischen pH von 6,0–7,0. Am Jejunum ist der Speisebrei nahezu neutral."
      },
      {
        id: "pankreassekretion_regulation_h3",
        type: "mc",
        question: "Welches Hormon wird bei pH < 4,5 im Duodenum freigesetzt und löst verstärkte Pankreassaftsekretion aus?",
        options: [
          { text: "Sekretin", correct: true },
          { text: "Gastrin", correct: false },
          { text: "Insulin", correct: false },
          { text: "Cholecystokinin", correct: false }
        ],
        explanation: "Sekretin wird aus S-Zellen des Duodenums bei pH < 4,5 freigesetzt und fördert die Bikarbonatsekretion des Pankreas sowie hemmt die Magensaftproduktion. CCK reagiert primär auf fettreichen Speisebrei."
      },
      {
        id: "pankreassekretion_regulation_h4",
        type: "mc",
        question: "Welche zusätzliche Wirkung hat Cholecystokinin (CCK) neben der Enzymanreicherung des Pankreassafts?",
        options: [
          { text: "Stimulation der Gallenblasenkontraction", correct: true },
          { text: "Hemmung der Magensaftsekretion", correct: false },
          { text: "Aktivierung von Trypsinogen im Pankreas direkt", correct: false },
          { text: "Freisetzung von Insulin aus den B-Zellen", correct: false }
        ],
        explanation: "CCK (Cholecystokinin / Pankreomyzin) stimuliert einerseits die Enzymanreicherung des Pankreassafts und andererseits die Kontraktion der Gallenblase — dadurch wird Galle in das Duodenum entleert, was für die Fettemulgierung notwendig ist."
      },
      {
        id: "pankreassekretion_regulation_h5",
        type: "true_false",
        statement: "Die Pankreassaftsekretion wird in drei Phasen reguliert: kephalisch (N. vagus), gastrisch (Gastrin) und intestinal (Sekretin + CCK).",
        answer: true,
        explanation: "Kephalische Phase: N. vagus durch Sinnesreize. Gastrische Phase: Gastrin bei Magenübergang. Intestinale Phase (Hauptsekretion): Sekretin (pH < 4,5 → Bikarbonat) + CCK (fettreicher Chymus → Enzyme + Gallenblase). Außerhalb der Verdauungsphase besteht eine geringe Basalsekretion."
      }
    ],
    phase4Questions: [
      {
        id: "pankreassekretion_regulation_mc1",
        type: "mc",
        question: "Welche Aussagen zur Regulation der Pankreassekretion sind korrekt?",
        options: [
          { text: "Die kephalische Phase wird durch den N. vagus (Sinnesreize) gesteuert", correct: true },
          { text: "Die gastrische Phase wird durch Gastrin ausgelöst", correct: true },
          { text: "Die intestinale Phase mit Sekretin und CCK liefert die Hauptsekretion", correct: true },
          { text: "Die Hauptsekretion erfolgt bereits in der kephalischen Phase", correct: false }
        ]
      },
      {
        id: "pankreassekretion_regulation_mc2",
        type: "mc",
        question: "Welche Aussagen zur Zusammensetzung und Wirkung des Pankreassaftes sind korrekt?",
        options: [
          { text: "Der Pankreassaft hat einen pH von ca. 8 (hoher Bikarbonatanteil)", correct: true },
          { text: "Der Pankreassaft enthält sowohl aktive Enzyme als auch inaktive Proenzyme (Zymogene)", correct: true },
          { text: "Das Bikarbonat des Pankreassaftes neutralisiert den sauren Chymus im Duodenum", correct: true },
          { text: "Der Pankreassaft wird kontinuierlich unabhängig von Mahlzeiten in großen Mengen produziert", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "insulin_glukagon",
    title: "Endokrines Pankreas: Insulin, Glukagon und Blutzuckerregulation",
    contextHint: "Studienbrief 1039 Bauchspeicheldrüse – Endokrines Pankreas",
    phase1: {
      soil: {
        statement: "Die Langerhans-Inseln enthalten drei Zelltypen: B-Zellen (75%, produzieren Insulin), A-Zellen (20%, produzieren Glukagon) und D-Zellen (5%, produzieren Somatostatin).",
        answer: true,
        solution: "Jede Insel wird von einer eigenen Arteriole versorgt (→ Kapillarnetz); das abfließende Blut geht über die Pfortader zur Leber. Insulin wird im ER der B-Zellen gebildet → Golgi-Apparat → Basalmembran → Blutkreislauf. Ausgeschüttet bei steigender Glukosekonzentration. Insulinrezeptoren sitzen auf Zellmembranen; Insulin wirkt ohne in die Zelle zu gelangen. Halbwertzeit ca. 15 Min (Abbau durch Insulinasen); Tagesbedarf ca. 40 IE."
      },
      seed: {
        statement: "Glukagon ist das einzige blutzuckersenkende Hormon im menschlichen Körper und wird bei steigender Glukosekonzentration aus den A-Zellen ausgeschüttet.",
        answer: false,
        solution: "Insulin ist das einzige blutzuckersenkende Hormon — und wird bei steigender Glukosekonzentration ausgeschüttet. Glukagon ist sein Antagonist: Es erhöht den Blutzucker (katabol: Glykogenolyse, Gluconeogenese, Fettabbau, ↑Stoffwechselrate, ↑Herzschlagstärke). Halbwertzeit Glukagon: 5–10 Min. Gegenspieler des Insulins sind auch: STH, ACTH, Corticosteroide, Adrenalin, Thyroxin."
      },
      water: {
        statement: "Insulin und Glukagon regulieren antagonistisch den Blutzucker: Glukagon fördert Glykogenabbau und Gluconeogenese (Blutzucker ↑), Insulin fördert Glykogensynthese, Glucoseaufnahme ins Gewebe und blockiert Glukoneogenese (Blutzucker ↓).",
        answer: true,
        solution: "Insulin-Wirkungen: Fettgewebe (↑Glucoseeinstrom, ↑Fettsäuresynthese, ↑Triglyceridspeicherung, Aktivierung Lipoproteinlipase); Muskel (↑Glucoseeinstrom, ↑Glykogensynthese, ↑Aminosäureaufnahme, ↓Proteinabbau). Kontrolle durch direkten Rückkopplungsmechanismus (Regelkreis): Blutzucker ↑ → Insulinsekretion ↑. Weitere Insulinantagonisten: STH, ACTH, Corticosteroide, Adrenalin, Thyroxin."
      }
    },
    harvestQuestions: [
      {
        id: "insulin_glukagon_h1",
        type: "mc",
        question: "Welches ist das einzige blutzuckersenkende Hormon im menschlichen Körper?",
        options: [
          { text: "Insulin", correct: true },
          { text: "Glukagon", correct: false },
          { text: "Cortisol", correct: false },
          { text: "Adrenalin", correct: false }
        ],
        explanation: "Insulin ist das einzige Hormon, das den Blutzucker senkt — es erleichtert die Glucoseaufnahme ins Gewebe und hemmt die Freisetzung von Glucose in den Kreislauf. Alle anderen genannten Hormone erhöhen den Blutzucker (Insulinantagonisten)."
      },
      {
        id: "insulin_glukagon_h2",
        type: "true_false",
        statement: "D-Zellen der Langerhans-Inseln produzieren Somatostatin, das die Sekretion von Insulin und Glukagon hemmt.",
        answer: true,
        explanation: "D-Zellen machen ca. 5% der Inselzellen aus. Somatostatin hemmt parakrin die Sekretion verschiedener Hormone, darunter auch Insulin und Glukagon — es wirkt regulierend auf das Zusammenspiel beider Antagonisten."
      },
      {
        id: "insulin_glukagon_h3",
        type: "mc",
        question: "Welche Hauptwirkungen hat Glukagon?",
        options: [
          { text: "Förderung von Glykogenolyse und Gluconeogenese → Blutzucker ↑", correct: true },
          { text: "Förderung der Glykogensynthese und Glucoseaufnahme → Blutzucker ↓", correct: false },
          { text: "Hemmung des Fettstoffwechsels und Fettabbaus", correct: false },
          { text: "Förderung der Insulinsekretion", correct: false }
        ],
        explanation: "Glukagon wirkt katabol (abbauend): fördert Glykogenolyse (Glykogenabbau), Gluconeogenese (Glucosebildung aus AS in der Leber), Fettabbau, erhöht Stoffwechselrate und Herzschlagstärke. HWZ: 5–10 Min."
      },
      {
        id: "insulin_glukagon_h4",
        type: "mc",
        question: "Wie lang ist die biologische Halbwertzeit von Insulin?",
        options: [
          { text: "Ca. 15 Minuten (Abbau durch Insulinasen)", correct: true },
          { text: "Ca. 5–10 Minuten", correct: false },
          { text: "Ca. 60 Minuten", correct: false },
          { text: "Ca. 24 Stunden", correct: false }
        ],
        explanation: "Insulin wird durch Insulinasen relativ schnell abgebaut — biologische Halbwertzeit ca. 15 Minuten. Der Tagesbedarf eines erwachsenen Menschen beträgt ca. 40 IE Insulin. Glukagon hat eine kürzere HWZ von 5–10 Minuten."
      },
      {
        id: "insulin_glukagon_h5",
        type: "mc",
        question: "Welche Hormone sind Gegenspieler (Antagonisten) des Insulins im menschlichen Körper?",
        options: [
          { text: "STH (Wachstumshormon), ACTH, Corticosteroide, Adrenalin und Thyroxin", correct: true },
          { text: "Nur Glukagon", correct: false },
          { text: "Sekretin und Cholecystokinin", correct: false },
          { text: "Gastrin und Somatostatin", correct: false }
        ],
        explanation: "Neben Glukagon (dem direkten Antagonisten) gibt es weitere Insulingegenspieler: STH (somatotropes Hormon = Wachstumshormon), ACTH, Corticosteroide, Adrenalin und Thyroxin. Alle erhöhen den Blutzucker."
      }
    ],
    phase4Questions: [
      {
        id: "insulin_glukagon_mc1",
        type: "mc",
        question: "Welche Aussagen zu den Zelltypen der Langerhans-Inseln sind korrekt?",
        options: [
          { text: "B-Zellen (75%) produzieren Insulin", correct: true },
          { text: "A-Zellen (20%) produzieren Glukagon", correct: true },
          { text: "D-Zellen (5%) produzieren Somatostatin", correct: true },
          { text: "A-Zellen (75%) sind die häufigsten Inselzellen und produzieren Insulin", correct: false }
        ]
      },
      {
        id: "insulin_glukagon_mc2",
        type: "mc",
        question: "Welche Aussagen zu Insulin und seinen Wirkungen sind korrekt?",
        options: [
          { text: "Insulin ist das einzige blutzuckersenkende Hormon", correct: true },
          { text: "Insulin fördert im Muskel die Glykogensynthese und Aminosäureaufnahme", correct: true },
          { text: "Insulin blockiert Glukoneogenese und Lipolyse", correct: true },
          { text: "Glukagon senkt den Blutzucker durch Förderung der Glykogensynthese", correct: false }
        ]
      }
    ]
  })

];

// ─── Studienbrief 1040 — Leber und Gallenblase ──────────────────────────────

const LEBER_GALLENBLASE_1040_PLANTS = [

  makeDetailedPlant({
    id: "leber_anatomie_makroskopie",
    title: "Leber: Anatomie, Lage, Lappen und Leberpforte",
    contextHint: "Studienbrief 1040 Leber – Anatomie und Makroskopie",
    phase1: {
      soil: {
        statement: "Die Leber ist das größte Stoffwechselorgan und die größte exokrine Drüse des Körpers; sie wiegt ca. 1,5 kg (23×18×9 cm) und liegt im rechten Oberbauch unterhalb des Zwerchfells; ihre Perfusion beträgt ca. 2 l/min (gesamtes Blut passiert die Leber in ca. 3 Minuten).",
        answer: true,
        solution: "Von ventral sind zwei große Lappen sichtbar: Lobus hepatis dexter und sinister, getrennt durch das Ligamentum falciforme hepatis (sichelförmig, war Ductus venosus). Von visceral kommen Lobus caudatus (oben) und Lobus quadratus (unten) hinzu. Das Ligamentum teres hepatis (rundes Leberband, Fortsetzung des Lig. falciforme, aus Nabelvenenstrang) liegt dorsal. Die Porta hepatis (Leberhilus) liegt auf der visceralen Seite in H-Form: Eintritt der Vena portae und Arteria hepatica, Austritt des Ductus hepaticus. Bei tiefer Einatmung wird die Leber ca. 2 Querfinger nach unten gedrückt."
      },
      seed: {
        statement: "Von der Vorderseite (ventral) der Leber lassen sich vier Lappen unterscheiden: Lobus dexter, sinister, caudatus und quadratus.",
        answer: false,
        solution: "Von ventral sind nur zwei Lappen erkennbar: Lobus hepatis dexter und Lobus hepatis sinister. Diese werden durch das Ligamentum falciforme hepatis voneinander getrennt. Der Lobus caudatus und Lobus quadratus sind nur auf der visceralen (Rück-)Seite der Leber zu sehen — dort unterscheidet man insgesamt vier Lappen."
      },
      water: {
        statement: "An der Porta hepatis treten die Vena portae und die Arteria hepatica in die Leber ein; der Ductus hepaticus (Gallengang) verlässt dort die Leber; der Ductus hepaticus ist kein Gefäß, sondern der gemeinsame Zusammenschluss aller Gallenkanälchen.",
        answer: true,
        solution: "Die Porta hepatis liegt auf der visceralen Seite als Querverbindung in H-Form (zwischen zwei Furchen). Rechte Furche: vorne Gallenblase, hinten V. cava inferior. Linke Furche: Reste fetaler Gefäße. Die drei Strukturen der Porta hepatis: Vena portae (führt venöses Blut aus unpaaren Baucheingeweiden zur Leber), Arteria hepatica (vom Truncus coeliacus, arterielle Versorgung) und Ductus hepaticus (tritt aus — kein Gefäß im klassischen Sinne). Im Lobus dexter: Segmenta anterior + posterior; im Lobus sinister: Segmenta laterale + mediale."
      }
    },
    harvestQuestions: [
      {
        id: "leber_anatomie_makroskopie_h1",
        type: "mc",
        question: "Was ist das Ligamentum falciforme hepatis?",
        options: [
          { text: "Ein sichelförmiges Band, das die Leber ventral in rechten und linken Lappen teilt (war Ductus venosus)", correct: true },
          { text: "Ein rundes Band auf der Dorsalseite der Leber, das aus einem Nabelvenenstrang hervorgeht", correct: false },
          { text: "Der Schließmuskel am Gallengang", correct: false },
          { text: "Die bindegewebige Kapsel, die die gesamte Leber überzieht", correct: false }
        ],
        explanation: "Das Ligamentum falciforme hepatis (sichelförmiges Band) unterteilt die Leber von ventral in Lobus dexter und Lobus sinister. Entwicklungsgeschichtlich war es der Ductus venosus. Das Ligamentum teres hepatis (rundes Leberband) ist die dorsale Fortsetzung davon und geht aus dem Nabelvenenstrang hervor."
      },
      {
        id: "leber_anatomie_makroskopie_h2",
        type: "true_false",
        statement: "Die Leber wird bei tiefer Einatmung durch das Zwerchfell ca. 2 Querfinger nach unten gedrückt und beim Ausatmen wieder in die Ruhelage gebracht.",
        answer: true,
        explanation: "Die atembedingten Bewegungen des Zwerchfellmuskels wirken direkt auf die Leber, da diese im hinteren oberen Bereich mit dem Zwerchfell verwachsen ist. Eine gesunde Leber ist deshalb im ausgeatmeten Zustand unter dem rechten Rippenbogen tastbar."
      },
      {
        id: "leber_anatomie_makroskopie_h3",
        type: "mc",
        question: "Welche Struktur verlässt die Leber an der Porta hepatis?",
        options: [
          { text: "Der Ductus hepaticus (gemeinsamer Gallengang)", correct: true },
          { text: "Die Arteria hepatica", correct: false },
          { text: "Die Vena portae", correct: false },
          { text: "Der Ductus choledochus", correct: false }
        ],
        explanation: "An der Porta hepatis treten V. portae und A. hepatica in die Leber ein. Der Ductus hepaticus verlässt die Leber dort — er ist kein Gefäß, sondern der gemeinsame Zusammenschluss aller Gallenkanälchen, der später mit dem Ductus cysticus zum Ductus choledochus wird."
      },
      {
        id: "leber_anatomie_makroskopie_h4",
        type: "mc",
        question: "Wie viele Lappen sind auf der visceralen (Rück-)Seite der Leber unterscheidbar?",
        options: [
          { text: "Vier: Lobus dexter, sinister, caudatus und quadratus", correct: true },
          { text: "Zwei: Lobus dexter und sinister", correct: false },
          { text: "Drei: Lobus dexter, sinister und caudatus", correct: false },
          { text: "Sechs Segmente, keine Lappen", correct: false }
        ],
        explanation: "Auf der Facies visceralis unterscheidet man vier Lappen: Lobus hepatis dexter, sinister, Lobus caudatus (oben, rückseitig) und Lobus quadratus (unten, vorne). Von ventral sind hingegen nur zwei Lappen sichtbar."
      },
      {
        id: "leber_anatomie_makroskopie_h5",
        type: "true_false",
        statement: "Das Ligamentum teres hepatis (rundes Leberband) geht entwicklungsgeschichtlich aus einem Nabelvenenstrang hervor und liegt auf der dorsalen Seite der Leber.",
        answer: true,
        explanation: "Das Ligamentum teres hepatis ist die Fortsetzung des Ligamentum falciforme und liegt auf der Rückseite der Leber. Entwicklungsgeschichtlich ist es aus einem obliterierten Nabelvenenstrang hervorgegangen."
      }
    ],
    phase4Questions: [
      {
        id: "leber_anatomie_makroskopie_mc1",
        type: "mc",
        question: "Welche Aussagen zur Anatomie und Lage der Leber sind korrekt?",
        options: [
          { text: "Die Leber wiegt ca. 1,5 kg und hat Maße von ca. 23×18×9 cm", correct: true },
          { text: "Die Perfusion beträgt ca. 2 l/min — das gesamte Blut passiert die Leber in ca. 3 Minuten", correct: true },
          { text: "Das Ligamentum falciforme hepatis teilt die Leber ventral in linken und rechten Lappen", correct: true },
          { text: "Die Leber liegt im linken Oberbauch unterhalb der Milz", correct: false }
        ]
      },
      {
        id: "leber_anatomie_makroskopie_mc2",
        type: "mc",
        question: "Welche Aussagen zur Porta hepatis und den Lebersegmenten sind korrekt?",
        options: [
          { text: "Die Porta hepatis liegt auf der visceralen Seite und hat H-Form", correct: true },
          { text: "V. portae führt venöses Blut aus den unpaaren Baucheingeweiden zur Leber", correct: true },
          { text: "Lobus dexter enthält Segmenta anterior und posterior", correct: true },
          { text: "Der Ductus hepaticus tritt in die Leber ein (nicht aus)", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "leber_eiweissstoffwechsel",
    title: "Leber: Eiweißstoffwechsel, Plasmaproteine und Harnstoffzyklus",
    contextHint: "Studienbrief 1040 Leber – Eiweißstoffwechsel",
    phase1: {
      soil: {
        statement: "Die Leber synthetisiert fast alle Plasmaproteine: Albumin (mengenmäßig dominierend, volumenstabilisierender Effekt durch onkotischen Druck, Transport von Farbstoffen, freien Fettsäuren, Salzen, Hormonen und Pharmaka), Gerinnungsfaktoren (fast ausschließlich), Transferrin (Eisentransport) und CRP (Akute-Phase-Protein).",
        answer: true,
        solution: "Albumin ist das wichtigste Transportprotein im Blut und bindet nicht-wasserlösliche Substanzen aus dem Intestinalflüssigkeitsraum, die dann in der Leber durch Kopplung an Glucuronsäure oder Schwefelsäure wasserlöslich und ausscheidbar werden. Fibrinogen (Faktor I) wird im retikuloendothelialen System der Leber gebildet; Prothrombin (Faktor II) unter Einfluss von Vitamin K. Transferrin dient dem Eisentransport. Das CRP setzt humorale und zelluläre Abwehrprozesse in Gang. Weitere leberspezifische Enzyme: Plasmacholinesterase, AST/ASAT (= GOT), ALT/ALAT (= GPT), Alkalische Phosphatase (AP)."
      },
      seed: {
        statement: "Immunglobuline werden fast ausschließlich in der Leber gebildet und machen einen Großteil der Plasmaproteine aus.",
        answer: false,
        solution: "Immunglobuline werden in den lymphatischen Organen produziert — nicht in der Leber. Etwa ein Fünftel der Plasmaproteine sind Immunglobuline, die Aufgaben im Rahmen der spezifischen und unspezifischen Abwehr wahrnehmen. Alle anderen wichtigen Plasmaproteine (Albumin, Gerinnungsfaktoren, Transferrin, CRP, Lipoproteine) werden hingegen in der Leber synthetisiert."
      },
      water: {
        statement: "Im Harnstoffzyklus wandelt die Leber giftiges Ammoniak (Endprodukt des Eiweißabbaus durch Darmbakterien) in ungiftigen Harnstoff um, der dann über die Niere ausgeschieden wird; bei schweren Lebererkrankungen steigt der Ammoniakspiegel und verursacht hepatische Enzephalopathie.",
        answer: true,
        solution: "Ammoniak entsteht durch den Eiweißstoffwechsel und den bakteriellen Abbau von Aminosäuren im Darm. Es hat eine neurotoxische Wirkung und kann über die Blut-Hirn-Schranke ins ZNS gelangen. Die Harnstoffsynthese vollzieht sich fast ausschließlich in der Leber. Bei Leberversagen: Harnstoffsynthese ↓ → Ammoniak ↑ → hepatische Enzephalopathie. Die Gluconeogenese (Neubildung von Glucose aus Aminosäuren, z. B. bei Hungerstress) ist ebenfalls eine wichtige Funktion der Leber im Eiweißstoffwechsel."
      }
    },
    harvestQuestions: [
      {
        id: "leber_eiweissstoffwechsel_h1",
        type: "mc",
        question: "Welche Funktion hat Albumin im Körper?",
        options: [
          { text: "Volumenstabilisierung (onkotischer Druck) und Transport von Farbstoffen, freien Fettsäuren, Hormonen und Pharmaka", correct: true },
          { text: "Ausschließlich Eisentransport", correct: false },
          { text: "Synthese von Gerinnungsfaktoren", correct: false },
          { text: "Bildung von Immunglobulinen", correct: false }
        ],
        explanation: "Albumin ist das mengenmäßig dominierende Transportprotein im Blut. Es stabilisiert das Blutvolumen durch seinen onkotischen Druck und transportiert zahlreiche nicht-wasserlösliche Substanzen (Farbstoffe, freie Fettsäuren, Salze, Hormone, Pharmaka). Transferrin dient dem Eisentransport; Gerinnungsfaktoren werden ebenfalls in der Leber gebildet."
      },
      {
        id: "leber_eiweissstoffwechsel_h2",
        type: "true_false",
        statement: "Gerinnungsfaktoren (Fibrinogen als Faktor I und Prothrombin als Faktor II) werden fast ausschließlich in der Leber gebildet.",
        answer: true,
        explanation: "Fibrinogen (Faktor I) wird im retikuloendothelialen System der Leber gebildet. Prothrombin (Faktor II) entsteht in der Leber unter Einfluss von Vitamin K. Bei Lebererkrankungen ist daher häufig die Blutgerinnung beeinträchtigt."
      },
      {
        id: "leber_eiweissstoffwechsel_h3",
        type: "mc",
        question: "Was passiert bei schwerem Leberversagen mit dem Ammoniakstoffwechsel?",
        options: [
          { text: "Ammoniak kann nicht mehr zu Harnstoff umgewandelt werden → Ammoniak ↑ → hepatische Enzephalopathie", correct: true },
          { text: "Ammoniak wird vermehrt in den Muskeln abgebaut", correct: false },
          { text: "Ammoniak wird direkt über die Niere ausgeschieden ohne Umwandlung", correct: false },
          { text: "Die Niere übernimmt vollständig die Harnstoffsynthese", correct: false }
        ],
        explanation: "Der Harnstoffzyklus läuft fast ausschließlich in der Leber ab. Bei Leberversagen steigt der Ammoniakspiegel, da die Umwandlung zu Harnstoff nicht mehr gelingt. Ammoniak ist neurotoxisch, kann die Blut-Hirn-Schranke passieren und verursacht die hepatische Enzephalopathie."
      },
      {
        id: "leber_eiweissstoffwechsel_h4",
        type: "true_false",
        statement: "Immunglobuline werden fast ausschließlich in der Leber gebildet.",
        answer: false,
        explanation: "Immunglobuline werden in den lymphatischen Organen produziert, nicht in der Leber. Sie machen etwa ein Fünftel der Plasmaproteine aus und übernehmen Aufgaben der spezifischen und unspezifischen Abwehr. Alle anderen wichtigen Plasmaproteine (Albumin, Gerinnungsfaktoren, Transferrin, CRP) entstehen in der Leber."
      },
      {
        id: "leber_eiweissstoffwechsel_h5",
        type: "mc",
        question: "Welches Plasmaprotein dient dem Eisentransport im Blut?",
        options: [
          { text: "Transferrin", correct: true },
          { text: "Albumin", correct: false },
          { text: "Fibrinogen", correct: false },
          { text: "C-reaktives Protein (CRP)", correct: false }
        ],
        explanation: "Transferrin ist das spezifische Eisentransportprotein im Blut. Es wird in der Leber synthetisiert. Albumin transportiert zwar viele Substanzen (Farbstoffe, Fettsäuren, Hormone, Pharmaka), nicht aber primär Eisen. CRP ist ein Akute-Phase-Protein der Immunabwehr."
      }
    ],
    phase4Questions: [
      {
        id: "leber_eiweissstoffwechsel_mc1",
        type: "mc",
        question: "Welche Aussagen zur Eiweißsynthese der Leber sind korrekt?",
        options: [
          { text: "Albumin ist mengenmäßig dominierend und volumenstabilisierend (onkotischer Druck)", correct: true },
          { text: "Transferrin dient dem Eisentransport", correct: true },
          { text: "Gerinnungsfaktoren (Fibrinogen, Prothrombin) werden fast ausschließlich in der Leber gebildet", correct: true },
          { text: "Immunglobuline werden fast ausschließlich in der Leber gebildet", correct: false }
        ]
      },
      {
        id: "leber_eiweissstoffwechsel_mc2",
        type: "mc",
        question: "Welche Aussagen zum Harnstoffzyklus und Aminosäurestoffwechsel der Leber sind korrekt?",
        options: [
          { text: "Ammoniak (aus Eiweißstoffwechsel durch Darmbakterien) wird in der Leber zu Harnstoff umgewandelt", correct: true },
          { text: "Harnstoff wird über die Nieren ausgeschieden", correct: true },
          { text: "Bei schwerem Leberversagen steigt der Ammoniakspiegel → hepatische Enzephalopathie", correct: true },
          { text: "Ammoniak ist ungiftig und kann direkt über die Nieren ausgeschieden werden", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "leber_kh_fett_vitamine",
    title: "Leber: Kohlenhydrat-, Fett- und Vitaminstoffwechsel",
    contextHint: "Studienbrief 1040 Leber – KH, Fett, Vitamine",
    phase1: {
      soil: {
        statement: "Im Kohlenhydratstoffwechsel speichert die Leber Glucose als Glykogen und hält den Blutglukosespiegel konstant (80–180 mg/dl); stimuliert durch Adrenalin und Glukagon wird Glykogen abgebaut (Glykogenolyse); bei Hungerstress erfolgt die Gluconeogenese (Neubildung von Glucose aus Aminosäuren).",
        answer: true,
        solution: "Zu den Aufgaben der Leber im KH-Stoffwechsel gehören: Glykogenaufbau, Glykogenolyse, Gluconeogenese und der Aufbau von Fettsäuren (bei Glucoseüberschuss). Da Nervenzellen und Erythrozyten fortlaufend auf Glucose angewiesen sind, spielt die Leber als Glukosepuffer eine zentrale Rolle. Im Fettstoffwechsel: Neubildung von Triglyceriden, Umwandlung von Fettsäuren zu Ketonkörpern (bei Glukosemangel), Cholesterinsynthese (für Steroidhormone), Abbau von Steroidhormonen, Synthese von Serumliproteinen."
      },
      seed: {
        statement: "Ketonkörper werden ausschließlich in den Muskeln produziert und können vom Gehirn nicht als Energiequelle genutzt werden.",
        answer: false,
        solution: "Ketonkörper entstehen in der Leber aus Fettsäuren, wenn keine Glucose mehr verfügbar ist und die Glykogenspeicher geleert sind. Das Gehirn kann — neben Glucose — Ketonkörper als einzige alternative Energiequelle nutzen. Dies ist besonders bei Fasten oder ketogener Ernährung relevant. Die Muskeln können Ketonkörper ebenfalls verwerten, sind aber nicht der Produktionsort."
      },
      water: {
        statement: "Die Leber wandelt Carotin in Vitamin A um, aktiviert Vitamin D3 (Cholecalciferol) in seine wirksame Form (fördert Kalziumeinbau in Knochen), und synthetisiert unter Einfluss von Vitamin K das Prothrombin (Gerinnungsfaktor II); fettlösliche Vitamine (E, D, K, A) werden mithilfe von Gallenflüssigkeit resorbiert.",
        answer: true,
        solution: "Die Leber reguliert den gesamten Vitaminstoffwechsel: Carotin → Vitamin A (Umwandlung); Vitamin D3 wird teils in der Haut durch Sonnenlicht produziert oder mit der Nahrung aufgenommen → in der Leber in aktive Form umgewandelt → fördert Kalziumeinbau in Knochen und Kalziumaufnahme aus Darm; Vitamin K → Steigerung der Biosynthese des Prothrombins (Gerinnungsfaktor II). Vitamin A kann in der Leber gespeichert werden. Fettlösliche Vitamine (E, D, K, A) benötigen für ihre Resorption Gallenflüssigkeit."
      }
    },
    harvestQuestions: [
      {
        id: "leber_kh_fett_vitamine_h1",
        type: "mc",
        question: "In welcher Form speichert die Leber überschüssige Glucose?",
        options: [
          { text: "Als Glykogen (osmotisch inaktive Speicherform)", correct: true },
          { text: "Als Triglyceride", correct: false },
          { text: "Als Aminosäuren", correct: false },
          { text: "Als Ketonkörper", correct: false }
        ],
        explanation: "Glucose wird in der Leber (und in den Muskeln) als Glykogen gespeichert — osmotisch inaktiv. Bei Bedarf (stimuliert durch Adrenalin und Glukagon) wird Glykogen intrazellulär wieder zu Glucose umgebaut (Glykogenolyse). Die Leber hält damit den Blutglukosespiegel im Bereich von 80–180 mg/dl konstant."
      },
      {
        id: "leber_kh_fett_vitamine_h2",
        type: "true_false",
        statement: "Das Gehirn kann neben Glucose auch Ketonkörper als Energiequelle nutzen — Ketonkörper entstehen in der Leber aus Fettsäuren bei Glukosemangel.",
        answer: true,
        explanation: "Bei fettreicher Ernährung oder Fasten, wenn keine Glucose im Blut verfügbar ist und das Glykogen erschöpft ist, werden Fettsäuren in der Leber zu Ketonkörpern abgebaut. Das Gehirn kann diese Ketonkörper (neben Glucose) als alternative Energiequelle nutzen — ein einzigartiges Merkmal unter den Körperorganen."
      },
      {
        id: "leber_kh_fett_vitamine_h3",
        type: "mc",
        question: "Welche Funktion hat Vitamin K in der Leber?",
        options: [
          { text: "Förderung der Biosynthese von Prothrombin (Gerinnungsfaktor II)", correct: true },
          { text: "Aktivierung von Vitamin D3 in seine wirksame Form", correct: false },
          { text: "Umwandlung von Carotin in Vitamin A", correct: false },
          { text: "Speicherung von Eisen aus abgebauten Erythrozyten", correct: false }
        ],
        explanation: "Die biologisch wirksame Form des Vitamin K stimuliert in der Leber die Biosynthese des Prothrombins (Gerinnungsfaktor II). Vitamin D3 wird in der Leber in seine aktive Form umgewandelt (fördert Kalziumeinbau). Carotin → Vitamin A ist ebenfalls eine Leberaufgabe im Vitaminstoffwechsel."
      },
      {
        id: "leber_kh_fett_vitamine_h4",
        type: "mc",
        question: "Welche Hormone stimulieren den Abbau von Leberglykogen zu Glucose (Glykogenolyse)?",
        options: [
          { text: "Adrenalin und Glukagon", correct: true },
          { text: "Insulin und Cortisol", correct: false },
          { text: "Sekretin und Cholecystokinin", correct: false },
          { text: "Thyroxin und Somatostatin", correct: false }
        ],
        explanation: "Adrenalin und Glukagon (Gegenspielerhormon zu Insulin) stimulieren die Glykogenolyse — den Abbau von gespeichertem Glykogen zu Glucose. Insulin fördert dagegen den Glykogenaufbau. Dies dient der Konstanthaltung des Blutglukosespiegels."
      },
      {
        id: "leber_kh_fett_vitamine_h5",
        type: "true_false",
        statement: "Cholesterin kann in der Leber synthetisiert werden und dient als Ausgangsprodukt für Steroidhormone (Östrogen, Testosteron, Cortisol) sowie für Gallensäuren und Vitamin D.",
        answer: true,
        explanation: "Cholesterin wird entweder mit der Nahrung aufgenommen oder in der Leber hergestellt. Es ist Ausgangsstoff für: Steroidhormone (Östrogen, Testosteron, Glucocorticoide), Gallensäuren, Vitamin D und Zellmembranen. 90% der Gallensteine bestehen aus Cholesterin."
      }
    ],
    phase4Questions: [
      {
        id: "leber_kh_fett_vitamine_mc1",
        type: "mc",
        question: "Welche Aussagen zum Kohlenhydrat- und Fettstoffwechsel der Leber sind korrekt?",
        options: [
          { text: "Leber speichert Glucose als Glykogen und hält Blutglukose bei 80–180 mg/dl konstant", correct: true },
          { text: "Glykogenolyse (Glykogenabbau) wird durch Adrenalin und Glukagon stimuliert", correct: true },
          { text: "Ketonkörper entstehen in der Leber aus Fettsäuren bei Glukosemangel; Gehirn kann sie nutzen", correct: true },
          { text: "Muskeln sind der einzige Glykogenspeicher im Körper", correct: false }
        ]
      },
      {
        id: "leber_kh_fett_vitamine_mc2",
        type: "mc",
        question: "Welche Aussagen zum Vitaminstoffwechsel der Leber sind korrekt?",
        options: [
          { text: "Carotin wird in der Leber zu Vitamin A umgewandelt", correct: true },
          { text: "Vitamin D3 (Cholecalciferol) wird in der Leber in seine aktive Form umgewandelt", correct: true },
          { text: "Vitamin K fördert die Biosynthese von Prothrombin (Gerinnungsfaktor II) in der Leber", correct: true },
          { text: "Fettlösliche Vitamine (E, D, K, A) werden ohne Gallenflüssigkeit problemlos resorbiert", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "leber_entgiftung_kreislauffunktionen",
    title: "Leber: Entgiftung, Kreislauffunktionen und Gerinnungsfaktoren",
    contextHint: "Studienbrief 1040 Leber – Entgiftung und Kreislauffunktionen",
    phase1: {
      soil: {
        statement: "Die Leber entgiftet körperfremde und körpereigene Substanzen (Pharmaka, Alkohol, Steroidhormone) durch biochemischen Umbau — meist durch Bindung an Glucuronsäure — und ermöglicht ihre Ausscheidung über Niere oder Galle.",
        answer: true,
        solution: "Viele Substanzen, die im Stoffwechsel anfallen, sind nicht direkt ausscheidbar. Die Leber wandelt sie durch Konjugation (v. a. an Glucuronsäure oder Schwefelsäure) in wasserlösliche Formen um. Steroidhormone (Östrogen, Testosteron, Glucocorticoide, Mineralocorticoide) werden in der Leber inaktiviert; 40–70% werden über Niere und Darm ausgeschieden, der Rest zirkuliert im enterohepatischen Kreislauf. Bilirubin (aus überalterten Erythrozyten) muss ebenfalls erst konjugiert werden, bevor es ausgeschieden werden kann."
      },
      seed: {
        statement: "Die Leber übernimmt die Blutbildung (Hämatopoese) dauerhaft im Erwachsenenalter als Hauptorgan.",
        answer: false,
        solution: "Die Blutbildung (Hämatopoese) in der Leber findet hauptsächlich in der Embryonalzeit statt. Im Erwachsenenalter übernimmt das Knochenmark diese Funktion. Nur wenn das Knochenmark geschädigt ist, kann die Leber diese Aufgabe wieder wahrnehmen (extramedulläre Hämatopoese). Im Erwachsenenalter ist die Leber hingegen für die Blutmauserung (Abbau überalterter Erythrozyten nach 100–120 Tagen durch Kupffer-Zellen) und als Blutspeicher zuständig."
      },
      water: {
        statement: "Die Leber synthetisiert wichtige Gerinnungsfaktoren: Fibrinogen (Faktor I) im retikuloendothelialen System und Prothrombin (Faktor II) unter Einfluss von Vitamin K; außerdem speichert sie Eisen aus dem Abbau überalterter Erythrozyten.",
        answer: true,
        solution: "Kreislauffunktionen der Leber: Blutspeicher (kann erhebliche Mengen Blut aufnehmen), Blutbildung (Embryonalzeit + bei Knochenmarkschädigung), Blutmauserung (überalterte Erythrozyten nach 100–120 Tagen → Kupffer-Zellen phagozy-tieren sie in Lebersinusoiden), Eisenspeicher (aus zerstörten Erythrozyten; Eisen → an Globuline gebunden → Leber → für neue Hämoglobinsynthese oder gespeichert), Synthese von Gerinnungsfaktoren (Fibrinogen Faktor I, Prothrombin Faktor II unter Vitamin K)."
      }
    },
    harvestQuestions: [
      {
        id: "leber_entgiftung_kreislauffunktionen_h1",
        type: "mc",
        question: "Durch welchen chemischen Prozess macht die Leber nicht-wasserlösliche Substanzen für die Ausscheidung verfügbar?",
        options: [
          { text: "Durch Konjugation, meist durch Bindung an Glucuronsäure oder Schwefelsäure", correct: true },
          { text: "Durch Oxidation in den Mitochondrien", correct: false },
          { text: "Durch Phagozytose in den Kupffer-Zellen", correct: false },
          { text: "Durch enzymatische Spaltung in den Gallenkanälchen", correct: false }
        ],
        explanation: "Die Entgiftungsfunktion der Leber beruht hauptsächlich auf der Konjugation der Substanzen — meist durch Bindung an Glucuronsäure oder Schwefelsäure. Dies macht lipidlösliche (toxische) Substanzen wasserlöslich und ermöglicht ihre renale oder biliäre Ausscheidung. So werden z. B. Pharmaka, Alkohol, Bilirubin und Steroidhormone entgiftet."
      },
      {
        id: "leber_entgiftung_kreislauffunktionen_h2",
        type: "true_false",
        statement: "Überalterte Erythrozyten (nach ca. 100–120 Tagen) werden in den Lebersinusoiden durch Kupffer-Zellen (Makrophagen) phagozytiert und abgebaut.",
        answer: true,
        explanation: "Dieser Vorgang wird als Blutmauserung bezeichnet. Die Kupffer-Zellen (sternförmige Makrophagen in den Sinusoidwänden) erkennen und phagozytieren die funktionsuntüchtigen Erythrozyten. Das dabei freiwerdende Eisen wird an Globuline gebunden, zur Leber transportiert und für die Neubildung von Hämoglobin genutzt oder gespeichert."
      },
      {
        id: "leber_entgiftung_kreislauffunktionen_h3",
        type: "mc",
        question: "Wann übernimmt die Leber die Blutbildung (Hämatopoese) im menschlichen Körper?",
        options: [
          { text: "Hauptsächlich in der Embryonalzeit; im Erwachsenenalter nur bei Knochenmarkschädigung", correct: true },
          { text: "Dauerhaft als Hauptorgan der Blutbildung im Erwachsenenalter", correct: false },
          { text: "Nur in der Kindheit bis zur Pubertät", correct: false },
          { text: "Niemals — die Leber ist nicht an der Blutbildung beteiligt", correct: false }
        ],
        explanation: "In der Embryonalzeit ist die Leber das Hauptorgan der Blutbildung. Nach der Geburt übernimmt das Knochenmark diese Funktion. Wenn das Knochenmark zu späteren Zeitpunkten geschädigt ist, kann die Leber die Hämatopoese erneut wahrnehmen (extramedulläre Hämatopoese)."
      },
      {
        id: "leber_entgiftung_kreislauffunktionen_h4",
        type: "true_false",
        statement: "Fibrinogen (Gerinnungsfaktor I) wird im retikuloendothelialen System der Leber gebildet; Prothrombin (Faktor II) entsteht in der Leber unter Einfluss von Vitamin K.",
        answer: true,
        explanation: "Die Leber synthetisiert fast alle Gerinnungsfaktoren. Fibrinogen (Faktor I) entsteht im retikuloendothelialen System der Leber. Prothrombin (Faktor II) wird unter Einfluss von Vitamin K in der Leber gebildet. Bei schweren Lebererkrankungen ist daher die Blutgerinnung erheblich beeinträchtigt."
      },
      {
        id: "leber_entgiftung_kreislauffunktionen_h5",
        type: "mc",
        question: "Was passiert mit dem Eisen, das beim Abbau überalterter Erythrozyten freigesetzt wird?",
        options: [
          { text: "Es wird an Globuline gebunden, zur Leber transportiert und für neue Hämoglobinsynthese genutzt oder gespeichert", correct: true },
          { text: "Es wird direkt mit dem Urin ausgeschieden", correct: false },
          { text: "Es wird in der Gallenblase als Gallenstein abgelagert", correct: false },
          { text: "Es wird in der Milz dauerhaft gespeichert", correct: false }
        ],
        explanation: "Bei der Blutmauserung wird das Hämoglobin gespalten: Das Globin wird phagozytiert; das Eisen (aus dem Häm-Teil) wird an Globuline (v. a. Transferrin) gebunden und zur Leber transportiert, wo es entweder direkt für die Bildung neuen Hämoglobins verwendet oder als Reserveeisen gespeichert wird."
      }
    ],
    phase4Questions: [
      {
        id: "leber_entgiftung_kreislauffunktionen_mc1",
        type: "mc",
        question: "Welche Aussagen zur Entgiftungsfunktion der Leber sind korrekt?",
        options: [
          { text: "Pharmaka, Alkohol und Steroidhormone werden in der Leber durch Konjugation (v. a. Glucuronsäure) entgiftet", correct: true },
          { text: "Die Konjugation macht lipidlösliche Substanzen wasserlöslich und ermöglicht ihre Ausscheidung", correct: true },
          { text: "40–70% der inaktivierten Steroidhormone werden über Niere und Darm ausgeschieden", correct: true },
          { text: "Die Entgiftung findet ausschließlich in den Kupffer-Zellen statt", correct: false }
        ]
      },
      {
        id: "leber_entgiftung_kreislauffunktionen_mc2",
        type: "mc",
        question: "Welche Aussagen zu den Kreislauffunktionen der Leber sind korrekt?",
        options: [
          { text: "Die Leber dient als Blutspeicher und kann erhebliche Mengen Blut aufnehmen", correct: true },
          { text: "Kupffer-Zellen phagozytieren überalterte Erythrozyten (Blutmauserung) in den Sinusoiden", correct: true },
          { text: "Fibrinogen (Faktor I) und Prothrombin (Faktor II) werden in der Leber synthetisiert", correct: true },
          { text: "Die Leber ist im Erwachsenenalter das Hauptorgan der Blutbildung", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "leber_mikrostruktur_sinusoide",
    title: "Leber: Mikrostruktur, Sinusoide, Kupffer-Zellen und Laborwerte",
    contextHint: "Studienbrief 1040 Leber – Leberläppchen, Sinusoide, Laborwerte",
    phase1: {
      soil: {
        statement: "Das Leberläppchen (Lobulus hepatis) ist die kleinste funktionelle Einheit der Leber; es hat eine nahezu sechseckige Form (1,0–1,3 mm breit, 2 mm hoch); in den dreieckigen Bindegewebsfeldern zwischen den Läppchen liegt die Glisson-Trias: Ast der Leberarterie (A. interlobularis), Ast der Pfortader (V. interlobularis) und Gallenausgang (Ductus biliferus interlobularis).",
        answer: true,
        solution: "Das gesamte Lebergewebe besteht aus Tausenden dieser birnenförmigen Läppchen. Die Leberzellbalken sind radiär zur Zentralvene angeordnete Reihen von Hepatozyten. Die Glisson-Kapsel ist die bindegewebige Kapsel über der gesamten Leber (nach dem Peritoneum). Hepatozyten haben: einen Kern (10% des Zellvolumens), granulä+agranuläres ER (Proteinsynthese + Stoffwechsel/Entgiftung), Golgi-Apparat (Konzentration von Ausscheidungsprodukten), über 1000 Mitochondrien/Leberzelle (hohe Stoffwechselaktivität), Mikrosomen (Zerlegung großer chemischer Verbindungen, Gallensäurenausscheidung)."
      },
      seed: {
        statement: "Kupffer-Zellen sind spezialisierte Hepatozyten, die Glykogen speichern und an der Proteinbiosynthese beteiligt sind.",
        answer: false,
        solution: "Kupffer-Zellen (früher: Kupffer'sche Sternzellen) sind sternförmige Makrophagen in den Sinusoidwänden — keine Hepatozyten. Sie gehören zum Retikuloendothelialen System (RES) und erfüllen folgende Funktionen: Phagozytose überalterter Erythrozyten (Blutmauserung), Immunabwehr (frühzeitige Eliminierung von Fremdstoffen durch Phagozytose) und Entlastung der Leber. Sie liegen teils zwischen, teils auf den Endothelzellen der Sinusoide."
      },
      water: {
        statement: "Die Sinusoide sind weitläufige Blutkapillaren zwischen den Leberzellreihen ohne Basalmembran (Gitterfasernetz mit Poren/Fensterung), in denen sich arterielles und venöses Blut vermischt; Lebererkrankungen gehen häufig mit erhöhten Transaminasen einher (AST/ASAT = GOT; ALT/ALAT = GPT); Gamma-GT reagiert sensibler auf Leber- und Gallenwegserkrankungen als Aminotransferasen.",
        answer: true,
        solution: "Sinusoide haben keine Basalmembran als plastisches Skelett, sondern ein Gitterfasernetz; die innere Auskleidung bilden Endothelzellen mit zahlreichen Poren (Fensterung). Zwischen den Sinusoiden und dem Interzellularraum wird Gallenflüssigkeit filtriert. Wichtige Leberwerte: AST/ASAT (GOT) und ALT/ALAT (GPT) als Transaminasen; gamma-GT = Gama-Glutamyl-Transferase (sensibler, immer erhöht bei alkoholischem Schaden); LDH = Laktatdehydrogenase; GLDH = Glutamatdehydrogenase. Bei Durchblutungsstörung der Leber: Transaminasen auf 50–200-faches des Normwerts."
      }
    },
    harvestQuestions: [
      {
        id: "leber_mikrostruktur_sinusoide_h1",
        type: "mc",
        question: "Aus welchen drei Strukturen besteht die Glisson-Trias (periportale Trias)?",
        options: [
          { text: "Ast der Leberarterie + Ast der Pfortader + Gallenausgang (in dreieckigen Bindegewebsfeldern)", correct: true },
          { text: "Zentralvene + Leberarterie + Gallenblase", correct: false },
          { text: "Kupffer-Zellen + Hepatozyten + Sinusoide", correct: false },
          { text: "V. cava + Pfortader + Ductus choledochus", correct: false }
        ],
        explanation: "In den mikroskopisch sichtbaren dreieckigen Bindegewebsfeldern zwischen den Leberläppchen liegt jeweils die Glisson-Trias (periportale Trias): ein Ast der Leberarterie (A. interlobularis), ein Ast der Pfortader (V. interlobularis) und ein Gallenausgang (Ductus biliferus interlobularis). Diese Anordnung ist charakteristisch für die Leberarchitektur."
      },
      {
        id: "leber_mikrostruktur_sinusoide_h2",
        type: "true_false",
        statement: "Die Sinusoide haben keine echte Basalmembran, sondern ein Gitterfasernetz mit Poren (Fensterung), durch das arterielles und venöses Blut gemischt fließt.",
        answer: true,
        explanation: "Die Sinusoide sind weitläufige Blutkapillaren in den Zwischenräumen zwischen den Leberzellreihen. Sie haben statt einer Basalmembran ein Gitterfasernetz mit zahlreichen Poren (Fensterung). Dort vermischt sich arterielles Blut (A. hepatica) mit venösem Blut (V. portae). Zwischen Sinusoiden und Interzellularraum wird Gallenflüssigkeit filtriert."
      },
      {
        id: "leber_mikrostruktur_sinusoide_h3",
        type: "mc",
        question: "Welche Funktionen erfüllen die Kupffer-Zellen in den Sinusoiden?",
        options: [
          { text: "Phagozytose überalterter Erythrozyten (Blutmauserung) und Immunabwehr (RES)", correct: true },
          { text: "Synthese von Albumin und Gerinnungsfaktoren", correct: false },
          { text: "Produktion von Gallensäuren", correct: false },
          { text: "Speicherung von Glykogen", correct: false }
        ],
        explanation: "Kupffer-Zellen (sternförmige Makrophagen) gehören zum Retikuloendothelialen System (RES). Sie dienen der Immunabwehr durch frühzeitige Eliminierung von Fremdstoffen (Phagozytose) und der Blutmauserung (Phagozytose überalterter Erythrozyten nach 100–120 Tagen). Sie sind keine Hepatozyten."
      },
      {
        id: "leber_mikrostruktur_sinusoide_h4",
        type: "true_false",
        statement: "Leberzellen (Hepatozyten) besitzen über 1000 Mitochondrien pro Zelle — Ausdruck der hohen Stoffwechselaktivität der Leber.",
        answer: true,
        explanation: "Da die Leber eine enorm hohe Stoffwechselaktivität aufweist, findet man in den Hepatozyten eine besonders große Anzahl an Mitochondrien (über 1000 je Leberzelle). Mitochondrien sind die Energiegewinnungszentren der Zelle. Mikrosomen (weitere Organellen der Hepatozyten) dienen der Zerlegung großer chemischer Verbindungen und der Ausscheidung von Gallensäuren."
      },
      {
        id: "leber_mikrostruktur_sinusoide_h5",
        type: "mc",
        question: "Welcher Leberwert reagiert sensibler auf Erkrankungen der Leber und Gallenwege als die Aminotransferasen?",
        options: [
          { text: "Gamma-GT (Gama-Glutamyl-Transferase)", correct: true },
          { text: "LDH (Laktatdehydrogenase)", correct: false },
          { text: "AST/ASAT (GOT)", correct: false },
          { text: "Transferrin", correct: false }
        ],
        explanation: "Die Gamma-GT reagiert sensibler auf Erkrankungen der Leber und Gallenwege als die Aminotransferasen (AST/ASAT, ALT/ALAT). Sie ist immer erhöht bei alkoholischem Leberschaden. Differenzialdiagnostisch kann man anhand der Blutwerte einen alkoholischen Leberschaden von einer Cholestase oder Leberzirrhose unterscheiden. Bei Durchblutungsstörung: Transaminasen steigen auf das 50–200-fache des Normwerts."
      }
    ],
    phase4Questions: [
      {
        id: "leber_mikrostruktur_sinusoide_mc1",
        type: "mc",
        question: "Welche Aussagen zur Mikrostruktur der Leber sind korrekt?",
        options: [
          { text: "Das Leberläppchen ist die kleinste funktionelle Einheit, nahezu sechseckig, 1,0–1,3 mm breit", correct: true },
          { text: "Die Glisson-Trias besteht aus Ast der Leberarterie, Ast der Pfortader und Gallengang", correct: true },
          { text: "Hepatozyten haben >1000 Mitochondrien (hohe Stoffwechselaktivität)", correct: true },
          { text: "Kupffer-Zellen sind spezialisierte Hepatozyten für die Glykogenspeicherung", correct: false }
        ]
      },
      {
        id: "leber_mikrostruktur_sinusoide_mc2",
        type: "mc",
        question: "Welche Aussagen zu Laborwerten bei Lebererkrankungen sind korrekt?",
        options: [
          { text: "AST/ASAT (früher GOT) und ALT/ALAT (früher GPT) sind Aminotransferasen der Leber", correct: true },
          { text: "Gamma-GT reagiert sensibler auf Leber- und Gallenwegserkrankungen als Aminotransferasen", correct: true },
          { text: "Bei Durchblutungsstörung steigen Transaminasen auf das 50–200-fache des Normwerts", correct: true },
          { text: "Ein erhöhter Gamma-GT-Wert schließt alkoholischen Leberschaden aus", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "leber_kreislaeufe_pfortader",
    title: "Leber: Ernährungskreislauf, Pfortaderkreislauf und First-Pass-Effect",
    contextHint: "Studienbrief 1040 Leber – Kreisläufe und Pfortader",
    phase1: {
      soil: {
        statement: "Die Leber hat zwei Kreisläufe: den Ernährungskreislauf (A. hepatica → sauerstoffreiches Blut, 25%) und den Pfortaderkreislauf (V. portae → venöses Blut aus Magen, Dünn-/Dickdarm, Pankreas und Milz, 75%); beide Blutströme vereinigen sich in den Sinusoiden.",
        answer: true,
        solution: "Ernährungskreislauf: A. hepatica → A. interlobulares → Arteriolae interlobularis → Kapillaren des Leberstromas + Sinusoide → Venolae interlobulares → Venae interlobulares → 3–5 Lebervenen → V. cava inferior. Pfortaderkreislauf: V. portae sammelt venöses Blut aus unpaaren Baucheingeweiden (Magen, Dünn+Dickdarm, oberem Rektum, Pankreas, Milz) → in Leber verzweigt gemeinsam mit A. hepatica → Sinusoide → Zentralvene → V. hepatica → V. cava inferior. Das Pfortaderblut enthält Zucker, Aminosäuren, Hormone, Medikamente und andere Substanzen aus der Verdauung."
      },
      seed: {
        statement: "Der First-Pass-Effect bezeichnet die Abschwächung intravenös verabreichter Medikamente in der Niere.",
        answer: false,
        solution: "Der First-Pass-Effect findet in der Leber statt, nicht in der Niere — und betrifft ausschließlich oral (nicht intravenös) eingenommene Medikamente. Oral aufgenommene Medikamente werden nach der Resorption über die Pfortader zur Leber geleitet, wo sie ganz oder teilweise abgebaut und in ihrer Wirkung abgeschwächt werden können. Intravenös verabreichte Medikamente umgehen diesen Effekt, da sie die Leber erst nach Verteilung im Körper erreichen."
      },
      water: {
        statement: "Die Leber wird zu 25% durch sauerstoffreiches Blut der A. hepatica und zu 75% durch Pfortaderblut (V. portae) versorgt; Nährstoffe für die Hepatozyten kommen hauptsächlich aus dem nährstoffreichen Pfortaderblut.",
        answer: true,
        solution: "Blut aus A. hepatica und V. portae gelangt zusammen in die Sinusoide (weite Kapillaren), von dort in die V. hepatica und schließlich in die V. cava inferior. Die Leberarterie transportiert sauerstoffreiches Blut vom Herzen; die Pfortader liefert nährstoffreiches Blut aus Magen und Darm. Dabei wird die Leber sowohl mit sauerstoffreichem Blut (25%) als auch mit Pfortaderblut (75%) versorgt. Die Nährstoffzufuhr für die Leberzellen geschieht aus dem nährstoffreichen Blut der Pfortader."
      }
    },
    harvestQuestions: [
      {
        id: "leber_kreislaeufe_pfortader_h1",
        type: "mc",
        question: "Wie verteilt sich die Blutversorgung der Leber auf Leberarterie und Pfortader?",
        options: [
          { text: "Ca. 25% arteriell (A. hepatica) + ca. 75% venös (V. portae)", correct: true },
          { text: "Ca. 75% arteriell + ca. 25% über Pfortader", correct: false },
          { text: "Ca. 50% arteriell + ca. 50% über Pfortader", correct: false },
          { text: "Ausschließlich über die Leberarterie", correct: false }
        ],
        explanation: "Die Leber ist das einzige Organ mit zwei zuführenden Blutgefäßen: Die A. hepatica liefert 25% sauerstoffreiches Blut; die V. portae liefert 75% venöses, nährstoffreiches Blut aus den unpaaren Bauchorganen. Beide vereinigen sich in den Sinusoiden."
      },
      {
        id: "leber_kreislaeufe_pfortader_h2",
        type: "true_false",
        statement: "Der First-Pass-Effect bedeutet, dass oral eingenommene Medikamente nach Resorption über die Pfortader zur Leber geleitet und dort ganz oder teilweise abgebaut werden können — ihre Wirkung wird dadurch abgeschwächt.",
        answer: true,
        explanation: "Oral aufgenommene Medikamente werden im Darm resorbiert und gelangen über die Pfortader direkt zur Leber, bevor sie in den großen Kreislauf eintreten. Die Leber kann Medikamente durch Leberpassage ganz oder teilweise abbauen (First-Pass-Effect). Intravenöse Gabe umgeht diesen Effekt vollständig."
      },
      {
        id: "leber_kreislaeufe_pfortader_h3",
        type: "mc",
        question: "Aus welchen Organen sammelt die Pfortader (V. portae) venöses Blut?",
        options: [
          { text: "Aus Magen, Dünn- und Dickdarm, oberem Rektum, Pankreas und Milz", correct: true },
          { text: "Aus Herz, Lunge und Nieren", correct: false },
          { text: "Ausschließlich aus dem Dünndarm", correct: false },
          { text: "Aus Nieren, Nebennieren und Harnblase", correct: false }
        ],
        explanation: "Die V. portae sammelt venöses Blut aus den unpaaren Baucheingeweiden: Magen, Dünn- und Dickdarm, oberem Anteil des Rektums sowie Pankreas und Milz. Dieses Blut enthält resorbierte Nährstoffe, Hormone, Medikamente und sonstige Substanzen aus dem Verdauungskanal."
      },
      {
        id: "leber_kreislaeufe_pfortader_h4",
        type: "mc",
        question: "Wohin fließt das Blut nach Passage der Lebersinusoide?",
        options: [
          { text: "Über die Zentralvene → V. hepatica → V. cava inferior", correct: true },
          { text: "Direkt zurück in die V. portae", correct: false },
          { text: "Über die A. hepatica in den Körperkreislauf", correct: false },
          { text: "Direkt in den Ductus hepaticus", correct: false }
        ],
        explanation: "Das Blut fließt aus den Sinusoiden → Zentralvene → Läppchenvenen (3–5 Lebervenen) → V. hepatica → V. cava inferior. Dieser Weg gilt für beide Kreisläufe (Ernährungs- und Pfortaderkreislauf), die sich in den Sinusoiden vereinigen."
      },
      {
        id: "leber_kreislaeufe_pfortader_h5",
        type: "true_false",
        statement: "Die Nährstoffzufuhr für die Hepatozyten erfolgt hauptsächlich aus dem nährstoffreichen Pfortaderblut, nicht aus dem arteriellen Blut.",
        answer: true,
        explanation: "Obwohl die A. hepatica sauerstoffreiches Blut liefert, kommen die Nährstoffe für die Leberzellen hauptsächlich aus dem Pfortaderblut, das resorbierte Zucker, Aminosäuren und Fette aus dem Verdauungskanal enthält. Das arterielle Blut der Leberarterie dient primär der Sauerstoffversorgung."
      }
    ],
    phase4Questions: [
      {
        id: "leber_kreislaeufe_pfortader_mc1",
        type: "mc",
        question: "Welche Aussagen zu den Kreisläufen der Leber sind korrekt?",
        options: [
          { text: "Ernährungskreislauf: A. hepatica → sauerstoffreiches Blut (25%)", correct: true },
          { text: "Pfortaderkreislauf: V. portae → venöses Blut aus Bauchorganen (75%)", correct: true },
          { text: "Blut beider Kreisläufe vereinigt sich in den Sinusoiden", correct: true },
          { text: "Die Leber wird zu 75% arteriell und zu 25% über die Pfortader versorgt", correct: false }
        ]
      },
      {
        id: "leber_kreislaeufe_pfortader_mc2",
        type: "mc",
        question: "Welche Aussagen zum Pfortaderkreislauf und First-Pass-Effect sind korrekt?",
        options: [
          { text: "V. portae bringt Blut aus Magen, Dünn-/Dickdarm, Pankreas und Milz", correct: true },
          { text: "First-Pass-Effect: oral eingenommene Medikamente werden in der Leber (teil)abgebaut", correct: true },
          { text: "Blut aus Sinusoiden → Zentralvene → V. hepatica → V. cava inferior", correct: true },
          { text: "Der First-Pass-Effect tritt ausschließlich bei intravenöser Medikamentengabe auf", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "gallenblase_gallenwege",
    title: "Gallenblase und Gallenwege: Anatomie, Aufbau und Steuerung",
    contextHint: "Studienbrief 1040 Gallenblase – Anatomie und Gallenwege",
    phase1: {
      soil: {
        statement: "Die Gallenblase (Vesica fellea) ist birnenförmig, 7–10 cm lang, 4–5 cm breit, Fassungsvermögen 35–50 ml; sie konzentriert die kontinuierlich von der Leber produzierte Gallenflüssigkeit durch aktiven Transport von Na⁺ und Cl⁻ (Wasser folgt passiv) auf 1/5 bis 1/10 des ursprünglichen Volumens.",
        answer: true,
        solution: "Die Leber produziert unabhängig von der Nahrungsaufnahme kontinuierlich ca. 0,5–1 L Gallenflüssigkeit täglich. Die Gallenblase speichert und konzentriert diese zwischen den Mahlzeiten. Aufbau der Gallenblase: Fundus vesicae felleae (oben), Corpus vesicae felleae (Mitte, Hauptabschnitt), Collum vesicae felleae (zugespitzt unten, geht in Ductus cysticus über). Innenschicht (Tunica mucosa): einschichtiges hohes Epithel mit Mikrovilli + Becherzellen (Schleim schützt vor Galle). Füllung der Gallenblase: durch Rückstau bei geschlossenem Sphincter ampullae."
      },
      seed: {
        statement: "Die Gallenblase produziert selbst kontinuierlich Gallenflüssigkeit und gibt diese direkt in den Dünndarm ab.",
        answer: false,
        solution: "Die Gallenflüssigkeit wird ausschließlich von der Leber produziert (kontinuierlich, 0,5–1 L/Tag). Die Gallenblase speichert und konzentriert sie nur (auf 1/5 bis 1/10). Die Abgabe der Galle in den Darm erfolgt bei Bedarf: hormonell durch CCK (bei fett-/proteinreicher Nahrung → Kontraktion der Gallenblase) und reflektorisch (Geruchs-, Geschmacks- und Bittstoffreize)."
      },
      water: {
        statement: "Die extrahepatischen Gallenwege verlaufen: Ductus hepaticus dexter + sinister → Ductus hepaticus communis → (Ductus cysticus zur Gallenblase) → Ductus choledochus (6–8 cm) → mündet gemeinsam mit dem Ductus pancreaticus an der Papilla vateri ins Duodenum; der M. sphincter Oddi (unwillkürlich) kontrolliert den Ausfluss.",
        answer: true,
        solution: "Intrahepatische Gallenwege: beginnen als kleinste Gallenröhrchen zwischen Leberzellen → vereinigen sich zu größeren Gängen → Ductus hepaticus dexter + sinister an der Leberpforte. Extrahepatische Gallenwege: Ductus hepaticus communis (2–5 cm, 4 mm weit) + Ductus cysticus (2–2,5 cm, Gallenblasengang) → ab Abgang des Ductus cysticus: Ductus choledochus (= Gallengang; 6–8 cm, 5–6 mm weit) → durchsetzt Duodenalwand → Papilla vateri (Papilla duodeni major) → Duodenum. M. sphincter Oddi verhindert Eindringen von Darminhalt in Gallenwege, kann aber Einklemmung von Gallensteinen verursachen."
      }
    },
    harvestQuestions: [
      {
        id: "gallenblase_gallenwege_h1",
        type: "mc",
        question: "Durch welchen Mechanismus wird die Gallenflüssigkeit in der Gallenblase eingedickt?",
        options: [
          { text: "Aktiver Transport von Na⁺ und Cl⁻; Wasser folgt passiv nach → auf 1/5 bis 1/10 eingedickt", correct: true },
          { text: "Enzymatischer Abbau von Wasser durch Lipase", correct: false },
          { text: "Passive Diffusion von Gallensäuren gegen einen Konzentrationsgradienten", correct: false },
          { text: "Filtration durch die Gallenblasenwand unter Druckeinwirkung", correct: false }
        ],
        explanation: "Die Eindickung der Gallenflüssigkeit in der Gallenblase erfolgt durch aktiven Transport von Na⁺ und Cl⁻ aus dem Lumen; Wasser folgt diesem osmotischen Gradienten passiv nach. Dadurch kann die Gallenflüssigkeit auf ein Fünftel bis ein Zehntel ihres ursprünglichen Volumens konzentriert werden — die Konzentration von Gallensäuren, Gallenfarbstoffen und Cholesterin steigt entsprechend."
      },
      {
        id: "gallenblase_gallenwege_h2",
        type: "true_false",
        statement: "Die Abgabe der Gallenflüssigkeit aus der Gallenblase wird hauptsächlich durch CCK (Cholecystokinin) ausgelöst, das bei fett- und proteinreicher Nahrungsaufnahme ausgeschüttet wird.",
        answer: true,
        explanation: "CCK (Cholecystokinin) ist das wichtigste Hormon für die Gallenblasenkontrakion. Es wird bei fett- und proteinreicher Nahrungsaufnahme ausgeschüttet und löst die Kontraktion der Gallenblase und gleichzeitig die Enzymanreicherung des Pankreassafts aus. Zusätzlich gibt es eine reflektorische Steuerung durch Geruchs-, Geschmacks- und Bitterstoffreize."
      },
      {
        id: "gallenblase_gallenwege_h3",
        type: "mc",
        question: "Welcher Gang führt von der Gallenblase zum gemeinsamen Gallengang?",
        options: [
          { text: "Ductus cysticus (Gallenblasengang)", correct: true },
          { text: "Ductus hepaticus communis", correct: false },
          { text: "Ductus pancreaticus", correct: false },
          { text: "Ductus choledochus", correct: false }
        ],
        explanation: "Der Ductus cysticus (Gallenblasengang, 2–2,5 cm) verbindet die Gallenblase mit dem Ductus hepaticus communis. Ab dieser Vereinigung heißt der Gang Ductus choledochus. Der Ductus choledochus (6–8 cm) mündet dann gemeinsam mit dem Ductus pancreaticus an der Papilla vateri ins Duodenum."
      },
      {
        id: "gallenblase_gallenwege_h4",
        type: "mc",
        question: "An welcher anatomischen Stelle münden Ductus choledochus und Ductus pancreaticus gemeinsam ins Duodenum?",
        options: [
          { text: "Papilla vateri (Papilla duodeni major)", correct: true },
          { text: "Papilla duodeni minor", correct: false },
          { text: "Pylorus des Magens", correct: false },
          { text: "Sphincter Oddi", correct: false }
        ],
        explanation: "Die Papilla vateri (Papilla duodeni major) ist die papillenförmige Erhebung im absteigenden Teil des Duodenums, an der Ductus choledochus und Ductus pancreaticus gemeinsam einmünden. Der M. sphincter Oddi (unwillkürlicher Schließmuskel) kontrolliert den Zufluss und verhindert das Eindringen von Darminhalt in die Gallenwege."
      },
      {
        id: "gallenblase_gallenwege_h5",
        type: "true_false",
        statement: "Die Gallenblase liegt im hinteren unteren Bereich der Leber, ragt über den unteren Leberrand hinaus und ist in der rechten Grube der Leberunterseite zu finden (Vesica fellea).",
        answer: true,
        explanation: "Die Gallenblase (Vesica fellea) liegt im hinteren, unteren Bereich der Leber — in der rechten Grube der Leberunterseite — und ragt über den unteren Leberrand hinaus. Im Bereich der Porta hepatis ist sie durch feste Bindegewebszüge an der Leberunterseite fixiert. Ihre Außenfläche wird größtenteils vom Bauchfell überzogen."
      }
    ],
    phase4Questions: [
      {
        id: "gallenblase_gallenwege_mc1",
        type: "mc",
        question: "Welche Aussagen zur Gallenblase sind korrekt?",
        options: [
          { text: "Gallenblase: 7–10 cm lang, 4–5 cm breit, Fassungsvermögen 35–50 ml", correct: true },
          { text: "Eindicken der Galle auf 1/5–1/10 durch aktiven Na⁺/Cl⁻-Transport", correct: true },
          { text: "Abgabe der Galle: hormonell (CCK) + reflektorisch (Geruchs-/Geschmacksreize)", correct: true },
          { text: "Die Gallenblase produziert selbst kontinuierlich Gallenflüssigkeit", correct: false }
        ]
      },
      {
        id: "gallenblase_gallenwege_mc2",
        type: "mc",
        question: "Welche Aussagen zu den extrahepatischen Gallenwegen sind korrekt?",
        options: [
          { text: "Ductus hepaticus dexter + sinister → Ductus hepaticus communis", correct: true },
          { text: "Ductus cysticus verbindet Gallenblase mit Ductus choledochus", correct: true },
          { text: "Ductus choledochus + Ductus pancreaticus münden an Papilla vateri ins Duodenum", correct: true },
          { text: "Der M. sphincter Oddi ist ein willkürlicher Schließmuskel", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "gallenflüssigkeit_enterohepatisch",
    title: "Gallenflüssigkeit: Zusammensetzung und enterohepatischer Kreislauf",
    contextHint: "Studienbrief 1040 Gallenblase – Gallenflüssigkeit und enterohepatischer Kreislauf",
    phase1: {
      soil: {
        statement: "Die Gallenflüssigkeit enthält ca. 90% Wasser sowie Gallensäuren (synthetisiert aus Cholesterin; 2 primäre: Cholsäure + Chenodesoxycholsäure; Emulgatoren für Fette, aktivieren Lipasen), Bilirubin/Biliverdin, Cholesterin, Phospholipide, Lecithin, Hormone-Abbauprodukte und Pharmaka.",
        answer: true,
        solution: "Lebergalle (gelb): Wasser 95–98 g/dl, Gallensalze 1,1 g/dl, Bilirubin 0,2 g/dl, Cholesterin 0,1 g/dl; pH 7,8–8,6. Blasengalle (grün-braun, 1/5–1/10 eingedickt): höhere Konzentrationen aller Inhaltsstoffe. Gallensäuren sind ampiphil (lipophile + hydrophile Seite) und lagern sich an Fette an → Emulsion → Lipase-Angriffsfläche. Gallensekretion wird gefördert durch: erhöhte Leberdurchblutung, Vagusreiz, erhöhte Gallensalzkonzentration im Blut, Sekretin und CCK. Phospholipide: hauptsächlich in der Leber synthetisiert; Transport und Aufnahme von Cholesterin. Pharmaka (große Arzneimittelmoleküle) und Antibiotika werden hauptsächlich biliär ausgeschieden."
      },
      seed: {
        statement: "90% der Gallensteine bestehen aus Phospholipiden; Cholesterin spielt bei der Gallensteinbildung keine wesentliche Rolle.",
        answer: false,
        solution: "90% der Gallensteine bestehen aus Cholesterin und nur 10% aus Calciumbilirubinat. Cholesterin ist für die Gallensteinbildung von zentraler Bedeutung. Das Verhältnis zwischen Cholesterin, Phospholipiden und Lecithin in der Galle ist fein aufeinander abgestimmt — bei Abweichungen kommt es zur Auskristallisierung des Cholesterins, was eine Gallensteinbildung zur Folge hat. Auch bei der Bildung von Zellmembranen, Gallensäuren, Vitamin D und Steroidhormonen spielt Cholesterin eine zentrale Rolle."
      },
      water: {
        statement: "Im enterohepatischen Kreislauf zirkulieren Gallensäuren (Pool 2–4 g) täglich 8–10× zwischen Leber und Darm; ca. 90% werden im terminalen Ileum rückresorbiert; bei Ileum-Erkrankung entsteht chologen Diarrhö mit Fettverdauungsstörungen und Mangel an fettlöslichen Vitaminen.",
        answer: true,
        solution: "Enterohepatischer Kreislauf: Gallensäuren aus Leber → Galle → Darm → zu 90% im terminalen Ileum rückresorbiert → über Pfortader zurück in die Leber. Ca. 0,6 g täglich neu gebildet; ca. die gleiche Menge mit dem Stuhl ausgeschieden. Vitamin B12 unterliegt ebenfalls dem enterohepatischen Kreislauf. Pathologisch: bei Erkrankung/Resektion des terminalen Ileums → Gallensäuren nicht rückresorbierbar → gelangen in Dickdarm → osmotisch → chologen Diarrhö; Fettverdauungsstörungen; fettlösliche Vitamine nur noch unzureichend resorbiert."
      }
    },
    harvestQuestions: [
      {
        id: "gallenflüssigkeit_enterohepatisch_h1",
        type: "mc",
        question: "Woraus werden Gallensäuren in der Leber synthetisiert?",
        options: [
          { text: "Aus Cholesterin; die 2 primären Gallensäuren sind Cholsäure und Chenodesoxycholsäure", correct: true },
          { text: "Aus Bilirubin und Albumin", correct: false },
          { text: "Aus Glykogen und Aminosäuren", correct: false },
          { text: "Aus Phospholipiden und Harnstoff", correct: false }
        ],
        explanation: "Gallensäuren werden in der Leber aus Cholesterin synthetisiert. Es gibt insgesamt vier verschiedene Gallensäuren — die beiden primären sind Cholsäure und Chenodesoxycholsäure. Sie liegen in der Galle als gallensaure Salze (Natrium- und Kaliumsalze) vor und wirken als Emulgatoren für Fette im Dünndarm."
      },
      {
        id: "gallenflüssigkeit_enterohepatisch_h2",
        type: "true_false",
        statement: "Im enterohepatischen Kreislauf werden ca. 90% aller Gallensäuren im terminalen Ileum rückresorbiert und gelangen über die Pfortader zurück zur Leber.",
        answer: true,
        explanation: "Der Gallensäurepool beträgt ca. 2–4 g und wird täglich 8–10× zwischen Leber und Darm zirkuliert. 90% werden im Endabschnitt des Ileums rückresorbiert → Pfortader → Leber. Nur ca. 0,6 g/24h werden neu synthetisiert; ungefähr die gleiche Menge wird mit dem Stuhl ausgeschieden."
      },
      {
        id: "gallenflüssigkeit_enterohepatisch_h3",
        type: "mc",
        question: "Was passiert bei Erkrankung oder Resektion des terminalen Ileums in Bezug auf die Gallensäuren?",
        options: [
          { text: "Gallensäuren können nicht rückresorbiert werden → chologen Diarrhö + Fettverdauungsstörungen + Mangel fettlöslicher Vitamine", correct: true },
          { text: "Gallensäuren werden vollständig im Dickdarm resorbiert", correct: false },
          { text: "Die Leber produziert kompensatorisch keine Gallensäuren mehr", correct: false },
          { text: "Nur Vitamin B12-Resorption ist betroffen, die Fettverdauung bleibt intakt", correct: false }
        ],
        explanation: "Das terminale Ileum ist der einzige Ort, wo Gallensäuren rückresorbiert werden können. Bei Erkrankung oder Resektion fehlt diese Möglichkeit → Gallensäuren gelangen in den Dickdarm → osmotische Wirkung → chologen Diarrhö. Durch den Mangel an Gallensäuren entstehen Fettverdauungsstörungen, und fettlösliche Vitamine (E, D, K, A) werden nur noch unzureichend resorbiert."
      },
      {
        id: "gallenflüssigkeit_enterohepatisch_h4",
        type: "mc",
        question: "Woraus bestehen die meisten Gallensteine?",
        options: [
          { text: "Zu 90% aus Cholesterin und zu 10% aus Calciumbilirubinat", correct: true },
          { text: "Zu 90% aus Phospholipiden", correct: false },
          { text: "Zu 90% aus Gallensäuren", correct: false },
          { text: "Ausschließlich aus Bilirubin", correct: false }
        ],
        explanation: "Die meisten Gallensteine (ca. 90%) bestehen aus Cholesterin. Nur ca. 10% sind Pigmentsteine aus Calciumbilirubinat. Cholesterin ist normalerweise in der Galle in Lösung gehalten durch das abgestimmte Verhältnis mit Phospholipiden und Lecithin. Bei Abweichungen kristallisiert Cholesterin aus → Gallensteinbildung."
      },
      {
        id: "gallenflüssigkeit_enterohepatisch_h5",
        type: "true_false",
        statement: "Gallensäuren emulgieren Fette im Dünndarm (Öl-Wasser-Emulsion), bieten Lipasen eine große Angriffsfläche und aktivieren Lipasen.",
        answer: true,
        explanation: "Gallensäuren sind ampiphil: lipophile Seite lagert sich an Fette an, hydrophile Seite zeigt nach außen → Bildung einer Emulsion. Die kleinen Fetttröpfchen bieten Lipasen (Pankreaslipase) eine vergrößerte Angriffsfläche. Gallensäuren aktivieren außerdem Lipasen direkt. Dies ist die Voraussetzung für eine effektive Fettresorption im Dünndarm."
      }
    ],
    phase4Questions: [
      {
        id: "gallenflüssigkeit_enterohepatisch_mc1",
        type: "mc",
        question: "Welche Aussagen zur Gallenflüssigkeit sind korrekt?",
        options: [
          { text: "Gallensäuren werden aus Cholesterin synthetisiert und emulgieren Fette im Dünndarm", correct: true },
          { text: "Gallensteine bestehen zu 90% aus Cholesterin und zu 10% aus Calciumbilirubinat", correct: true },
          { text: "Lebergalle ist gelb, Blasengalle ist grün-braun und stärker konzentriert", correct: true },
          { text: "Gallenflüssigkeit enthält hauptsächlich Enzyme zur Fettverdauung", correct: false }
        ]
      },
      {
        id: "gallenflüssigkeit_enterohepatisch_mc2",
        type: "mc",
        question: "Welche Aussagen zum enterohepatischen Kreislauf sind korrekt?",
        options: [
          { text: "Gallensäurepool ca. 2–4 g, wird 8–10× täglich zwischen Leber und Darm zirkuliert", correct: true },
          { text: "Ca. 90% der Gallensäuren werden im terminalen Ileum rückresorbiert", correct: true },
          { text: "Bei Ileum-Resektion entstehen chologen Diarrhö und Fettverdauungsstörungen", correct: true },
          { text: "Der enterohepatische Kreislauf betrifft ausschließlich Bilirubin", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "bilirubin_stoffwechsel",
    title: "Bilirubin: Entstehung, Konjugation und Ausscheidung",
    contextHint: "Studienbrief 1040 Gallenblase – Bilirubin",
    phase1: {
      soil: {
        statement: "Bilirubin entsteht aus dem Hämoglobin überalterter Erythrozyten (Lebensdauer 100–120 Tage): Häm → Biliverdin → Bilirubin (ca. 35 mg pro 1 g Hämoglobin); tägliche Bilirubinausscheidung: 200–250 mg; Sterkobilin (aus Bilirubin) gibt dem Stuhl seine braune Farbe, Urobilin dem Harn seine gelbe Farbe.",
        answer: true,
        solution: "Erythrozyten werden in Kapillargefäßen der Leber, der Milz, im Knochenmark und in Makrophagen abgebaut. Hämoglobin → Globin (phagozytiert) + Häm. Eisen aus Häm → an Globuline gebunden → Leber (für neue Hb-Synthese oder gespeichert). Häm → Biliverdin → Bilirubin. Im Darm: Bakterien bauen Bilirubin zu Urobilinogen/Sterkobilinogen ab (farblos). Nach Oxidation → Urobilin (gelb, Harn) + Sterkobilin (braun, Stuhl). 15% des ausgeschiedenen Bilirubins wird unkonjugiert wieder resorbiert (enterohepatischer Kreislauf)."
      },
      seed: {
        statement: "Indirektes (freies) Bilirubin ist wasserlöslich und wird direkt über die Niere ausgeschieden.",
        answer: false,
        solution: "Indirektes (freies, unkunjugiertes) Bilirubin ist wasserunlöslich, lipidlöslich und toxisch. Wegen seiner Wasserunlöslichkeit kann es nicht über die Niere ausgeschieden werden. Im Blutplasma wird es reversibel an Albumin gebunden. In der Leber wird es durch Glucuronyltransferase mit Glucuronsäure konjugiert → direktes (konjugiertes) Bilirubin → wasserlöslich → aktiv in Gallenkapillaren sezerniert → mit der Galle ausgeschieden. Beim Neugeborenen kann indirektes Bilirubin die Blut-Liquor-Schranke passieren → Kernikterus."
      },
      water: {
        statement: "In der Leber wird indirektes Bilirubin durch Glucuronyltransferase mit Glucuronsäure zu direktem (konjugiertem) Bilirubin umgewandelt — dieser Prozess macht es wasserlöslich und ermöglicht die Ausscheidung mit der Galle; beim Neugeborenen kann indirektes Bilirubin die Blut-Liquor-Schranke passieren und Kernikterus verursachen.",
        answer: true,
        solution: "Der physiologische Gesamt-Bilirubingehalt des Plasmas beträgt 0,1–1,2 mg/dl. Steigt er über 1,2 mg/dl → zuerst Gelbfärbung der Augenbindehäute, dann der Haut (Ikterus). Direktes Bilirubin (konjugiert, wasserlöslich): wird aktiv in Gallenkapillaren sezerniert → Galle → Darm → bakteriell zu Sterkobilinogen/Urobilinogen abgebaut → größtenteils Sterkobilin (Stuhl) + Urobilin (Harn). Indirektes Bilirubin (lipophil) kann bei hoher Konzentration die Epithelschranken passieren, beim Neugeborenen auch die Blut-Liquor-Schranke → Kernikterus (ZNS-Schädigung)."
      }
    },
    harvestQuestions: [
      {
        id: "bilirubin_stoffwechsel_h1",
        type: "mc",
        question: "In welcher Form liegt Bilirubin im Blutplasma vor, bevor es die Leber zur Konjugation erreicht?",
        options: [
          { text: "Wasserunlöslich, an Albumin gebunden (indirektes Bilirubin)", correct: true },
          { text: "Wasserlöslich, frei im Plasma gelöst", correct: false },
          { text: "Konjugiert an Glucuronsäure", correct: false },
          { text: "Als Urobilinogen", correct: false }
        ],
        explanation: "Indirektes (freies) Bilirubin ist wasserunlöslich und toxisch. Da es nicht im Plasma gelöst werden kann, wird es reversibel an Albumin gebunden und so zur Leber transportiert. In der Leber erfolgt dann die Konjugation mit Glucuronsäure → direktes (wasserlösliches) Bilirubin → biliäre Ausscheidung."
      },
      {
        id: "bilirubin_stoffwechsel_h2",
        type: "true_false",
        statement: "Direktes (konjugiertes) Bilirubin entsteht durch Konjugation mit Glucuronsäure in der Leber und ist wasserlöslich — es wird aktiv in die Gallenkapillaren sezerniert.",
        answer: true,
        explanation: "In den Leberzellen wird indirektes Bilirubin mithilfe von Glucuronyltransferase und Glucuronsäure (unter Verwendung von Glucose und ATP) konjugiert → direktes Bilirubin. Es ist wasserlöslich, nicht mehr toxisch und wird aktiv in die Gallenkapillaren sezerniert und mit der Galle in den Darm ausgeschieden."
      },
      {
        id: "bilirubin_stoffwechsel_h3",
        type: "mc",
        question: "Was gibt dem Stuhl seine braune Farbe?",
        options: [
          { text: "Sterkobilin (Abbauprodukt des Bilirubins durch Darmbakterien)", correct: true },
          { text: "Urobilin", correct: false },
          { text: "Biliverdin", correct: false },
          { text: "Gallensäuren", correct: false }
        ],
        explanation: "Bilirubin gelangt mit der Galle in den Darm. Dort bauen Bakterien es zu Sterkobilinogen und Urobilinogen ab (beide farblos). Nach Oxidation entstehen: Sterkobilin (braun → gibt dem Stuhl seine Farbe) und Urobilin (gelb → gibt dem Harn seine Farbe). Spuren von Urobilinogen werden mit dem Harn ausgeschieden."
      },
      {
        id: "bilirubin_stoffwechsel_h4",
        type: "mc",
        question: "Welcher Gesamt-Bilirubinwert im Plasma ist physiologisch, und ab wann entsteht ein Ikterus?",
        options: [
          { text: "Physiologisch: 0,1–1,2 mg/dl; Ikterus ab >1,2 mg/dl (zuerst Augenbindehäute, dann Haut)", correct: true },
          { text: "Physiologisch: 0–0,5 mg/dl; Ikterus ab >0,5 mg/dl", correct: false },
          { text: "Physiologisch: 2–5 mg/dl; Ikterus ab >5 mg/dl", correct: false },
          { text: "Es gibt keinen Normalwert — jedes Bilirubin im Blut ist pathologisch", correct: false }
        ],
        explanation: "Der physiologische Gesamt-Bilirubingehalt des Plasmas beträgt 0,1–1,2 mg/dl. Steigt er über 1,2 mg/dl, tritt Bilirubin ins Gewebe über: zuerst färben sich die Augenbindehäute (Skleren) gelb, dann die Haut. Diese Gelbfärbung wird als Ikterus (Gelbsucht) bezeichnet."
      },
      {
        id: "bilirubin_stoffwechsel_h5",
        type: "true_false",
        statement: "Indirektes Bilirubin kann beim Neugeborenen die Blut-Liquor-Schranke passieren und zum Kernikterus (ZNS-Schädigung) führen.",
        answer: true,
        explanation: "Indirektes (unkonjugiertes) Bilirubin ist lipidlöslich und kann lipophile Barrieren passieren. Bei Erwachsenen ist die Blut-Hirn-Schranke resistent, beim Neugeborenen jedoch noch durchlässig. Bei erhöhtem indirektem Bilirubin beim Neugeborenen (z. B. Rhesusunverträglichkeit, Neugeborenengelbsucht) besteht die Gefahr des Kernikterus — einer irreversiblen ZNS-Schädigung durch Bilirubinablagerung im Gehirn."
      }
    ],
    phase4Questions: [
      {
        id: "bilirubin_stoffwechsel_mc1",
        type: "mc",
        question: "Welche Aussagen zum Bilirubinstoffwechsel sind korrekt?",
        options: [
          { text: "Bilirubin entsteht aus Hämoglobin überalterter Erythrozyten (Lebensdauer 100–120 Tage)", correct: true },
          { text: "Indirektes Bilirubin ist wasserunlöslich, toxisch und an Albumin gebunden", correct: true },
          { text: "In der Leber wird indirektes Bilirubin durch Glucuronyltransferase konjugiert → direktes Bilirubin", correct: true },
          { text: "Indirektes Bilirubin ist wasserlöslich und wird direkt renal ausgeschieden", correct: false }
        ]
      },
      {
        id: "bilirubin_stoffwechsel_mc2",
        type: "mc",
        question: "Welche Aussagen zu den Abbauprodukten des Bilirubins sind korrekt?",
        options: [
          { text: "Sterkobilin gibt dem Stuhl seine braune Farbe", correct: true },
          { text: "Urobilin gibt dem Harn seine gelbe Farbe", correct: true },
          { text: "1 g Hämoglobin ergibt ca. 35 mg Bilirubin", correct: true },
          { text: "Direktes Bilirubin entsteht durch bakteriellen Abbau im Dickdarm", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "ikterus_formen",
    title: "Ikterus: Drei Formen, Ursachen und Differenzialdiagnose",
    contextHint: "Studienbrief 1040 Gallenblase – Ikterus",
    phase1: {
      soil: {
        statement: "Ikterus (Gelbsucht) ist ein Symptom — keine eigenständige Krankheit — und bezeichnet die Gelbfärbung von Haut, Schleimhaut und Skleren durch Bilirubinablagerung im Gewebe; er tritt ab einem Gesamt-Bilirubin >1,2 mg/dl auf; es gibt drei Formen: prähepatisch, intrahepatisch und posthepatisch.",
        answer: true,
        solution: "Prähepatischer Ikterus (Hämolytischer/Überproduktionsikterus): Ursache Hämolyse → vermehrter Hämoglobinanfall → Überlastung des Glucuronidierungssystems → indirektes Bilirubin stark erhöht; Stuhl dunkel/normal; Urin hell, Urobilinogen stark erhöht; LDH erhöht, Retikulozytose, Haptoglobin erniedrigt. Intrahepatischer Ikterus (Parenchymikterus): Schädigung der Leberzellen (Hepatitis, Leberzirrhose) → Mangel an Glucuronyltransferase → unvollständige Konjugation → beide Bilirubin-Arten leicht erhöht; Stuhl hell; Urin bierbraun; ALT(GPT) stark erhöht, AST(GOT) erhöht. Posthepatischer Ikterus (Verschlussikterus): Verlegung der Gallenwege (Cholestase durch Gallensteine=Cholelithiasis, Tumore, Pankreatitis) → Rückstau konjugierten Bilirubins → direktes Bilirubin stark erhöht; Stuhl hell; Urin bierbraun, Bilirubin stark erhöht; Gamma-GT, AP, LAP stark erhöht."
      },
      seed: {
        statement: "Beim posthepatischen Ikterus ist hauptsächlich das indirekte (unkunjugierte) Bilirubin im Serum stark erhöht.",
        answer: false,
        solution: "Beim posthepatischen Ikterus (Verschlussikterus) ist das direkte (konjugierte) Bilirubin stark erhöht — nicht das indirekte. Ursache ist eine Verlegung der Gallenwege (Cholestase), z. B. durch Gallensteine oder Tumore. Das bereits in der Leber konjugierte (direkte) Bilirubin kann nicht abfließen → staut sich zurück → tritt ins Blut über → stark erhöhtes direktes Bilirubin. Das indirekte Bilirubin ist beim posthepatischen Ikterus im Normbereich (o.B.)."
      },
      water: {
        statement: "Differenzialdiagnostisch unterscheiden sich die drei Ikterusformen deutlich: prähepatisch zeigt hellen Urin + dunklen Stuhl + indirektes Bilirubin↑; intrahepatisch zeigt bierbraunen Urin + hellen Stuhl + beide Bilirubin-Arten↑ + ALT stark↑; posthepatisch zeigt bierbraunen Urin + hellen Stuhl + direktes Bilirubin↑ + Gamma-GT/AP stark↑.",
        answer: true,
        solution: "Übersicht Differenzialdiagnose Ikterus: Prähepatisch: Serum (indirektes Bili stark↑, direktes o.B.), Urin (hell/normal, Urobilinogen stark↑, Bilirubin o.B.), Stuhl (dunkel/normal), Labor (LDH↑, Retikulozytose, Haptoglobin↓). Intrahepatisch: Serum (beide leicht↑), Urin (bierbraun, beide leicht↑), Stuhl (hell), Labor (ALT stark↑, AST↑). Posthepatisch: Serum (direktes stark↑, indirektes o.B.), Urin (bierbraun, Bilirubin stark↑, Urobilinogen o.B.), Stuhl (hell), Labor (Gamma-GT, AP, LAP stark↑)."
      }
    },
    harvestQuestions: [
      {
        id: "ikterus_formen_h1",
        type: "mc",
        question: "Was ist die Ursache des prähepatischen Ikterus?",
        options: [
          { text: "Hämolyse (gesteigerter Erythrozytenabbau) → Überproduktion von Bilirubin → Überlastung des Glucuronidierungssystems", correct: true },
          { text: "Schädigung der Leberzellen durch Hepatitis oder Zirrhose", correct: false },
          { text: "Verlegung der Gallenwege durch Gallensteine (Cholelithiasis)", correct: false },
          { text: "Mangel an Glucuronyltransferase durch genetischen Defekt", correct: false }
        ],
        explanation: "Beim prähepatischen Ikterus (Hämolytischer/Überproduktionsikterus) kommt es durch gesteigertem Erythrozytenabbau (Hämolyse) zu einem vermehrten Hämoglobinanfall → Überproduktion von indirektem Bilirubin → das Glucuronidierungssystem der Leber wird überlastet → indirektes Bilirubin steigt stark an."
      },
      {
        id: "ikterus_formen_h2",
        type: "true_false",
        statement: "Beim posthepatischen Ikterus ist direktes (konjugiertes) Bilirubin im Serum stark erhöht, da es wegen einer Gallenwegverlegung nicht abfließen kann.",
        answer: true,
        explanation: "Der posthepatische Ikterus (Verschlussikterus) entsteht durch Verlegung der Gallenwege (Cholestase) — z. B. durch Gallensteine (Cholelithiasis), Tumore, Pankreatitis. Das konjugierte (direkte) Bilirubin staut sich zurück → tritt ins Blut über → stark erhöhtes direktes Bilirubin. Typisch: Gamma-GT, AP und LAP stark erhöht; Stuhl hell; Urin bierbraun mit stark erhöhtem Bilirubin."
      },
      {
        id: "ikterus_formen_h3",
        type: "mc",
        question: "Welche Laborwerte sind beim posthepatischen (Verschluss-)Ikterus typisch stark erhöht?",
        options: [
          { text: "Gamma-GT, Alkalische Phosphatase (AP) und LAP", correct: true },
          { text: "ALT (GPT) und AST (GOT)", correct: false },
          { text: "LDH und Haptoglobin", correct: false },
          { text: "Indirektes Bilirubin und Urobilinogen", correct: false }
        ],
        explanation: "Beim posthepatischen Ikterus sind cholestaseanzeigenden Enzyme stark erhöht: Gamma-GT, AP (Alkalische Phosphatase) und LAP (Leucin-Aminopeptidase). Die Aminotransferasen (ALT/GPT, AST/GOT) sind hingegen typisch für den intrahepatischen Ikterus erhöht. LDH und Retikulozytose sind Hinweise auf den prähepatischen (hämolytischen) Ikterus."
      },
      {
        id: "ikterus_formen_h4",
        type: "mc",
        question: "Wie sieht der Stuhl beim posthepatischen Ikterus aus und warum?",
        options: [
          { text: "Hell — weil kein Bilirubin (und damit kein Sterkobilin) in den Darm gelangt", correct: true },
          { text: "Dunkel — wegen stark erhöhtem direkten Bilirubin", correct: false },
          { text: "Dunkelrot — wegen Blutbeimengungen aus den Gallenwegen", correct: false },
          { text: "Schwarz — wegen Ablagerung von Eisen", correct: false }
        ],
        explanation: "Beim posthepatischen Ikterus ist die Gallenwegverlegung (Cholestase) die Ursache: Bilirubin kann nicht in den Darm gelangen → kein Sterkobilinogen → kein Sterkobilin → Stuhl wird hell (acholisch). Sowohl beim intrahepatischen als auch beim posthepatischen Ikterus ist der Stuhl hell; nur beim prähepatischen Ikterus ist der Stuhl dunkel/normal (viel Sterkobilin)."
      },
      {
        id: "ikterus_formen_h5",
        type: "true_false",
        statement: "Ikterus ist keine eigenständige Krankheit, sondern ein Symptom der Gelbfärbung von Haut, Schleimhaut und Skleren durch Bilirubinablagerung im Gewebe.",
        answer: true,
        explanation: "Ikterus (Gelbsucht) ist immer ein Symptom — kein eigenständiges Krankheitsbild. Er kann auf sehr unterschiedliche Ursachen hinweisen: gesteigerten Erythrozytenabbau (prähepatisch), Leberzellschädigung (intrahepatisch) oder Gallenwegverlegung (posthepatisch). Die Ursachenklärung erfordert die Differenzialdiagnose anhand von Laborwerten, Stuhl- und Urinbefund."
      }
    ],
    phase4Questions: [
      {
        id: "ikterus_formen_mc1",
        type: "mc",
        question: "Welche Aussagen zum prähepatischen Ikterus sind korrekt?",
        options: [
          { text: "Ursache: Hämolyse → vermehrter Hämoglobinanfall → Überlastung des Glucuronidierungssystems", correct: true },
          { text: "Serum: indirektes Bilirubin stark erhöht, direktes Bilirubin im Normbereich (o.B.)", correct: true },
          { text: "Urin: stark erhöhtes Urobilinogen, helle/normale Farbe", correct: true },
          { text: "Beim prähepatischen Ikterus ist direktes Bilirubin im Serum stark erhöht", correct: false }
        ]
      },
      {
        id: "ikterus_formen_mc2",
        type: "mc",
        question: "Welche Aussagen zu den drei Ikterusformen sind korrekt?",
        options: [
          { text: "Intrahepatischer Ikterus: ALT(GPT) stark erhöht, beide Bilirubin-Arten leicht erhöht, Stuhl hell", correct: true },
          { text: "Posthepatischer Ikterus: direktes Bilirubin stark↑, Gamma-GT + AP stark↑, Stuhl hell", correct: true },
          { text: "Beim posthepatischen Ikterus ist die Ursache eine Verlegung der Gallenwege (Cholestase)", correct: true },
          { text: "Beim prähepatischen Ikterus ist der Stuhl hell und das Urobilinogen im Urin normal", correct: false }
        ]
      }
    ]
  })

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
    },
    {
      id: "herzkreislauf_1036",
      title: "Herz-Kreislauf & Pädiatrie (1036)",
      plants: HERZKREISLAUF_1036_PLANTS
    },
    {
      id: "blutlymphsystem_1037",
      title: "Blut & Lymphsystem (1037)",
      plants: BLUTLYMPHSYSTEM_1037_PLANTS
    },
    {
      id: "verdauungstrakt_1038",
      title: "Verdauungstrakt (1038)",
      plants: VERDAUUNGSTRAKT_1038_PLANTS
    },
    {
      id: "bauchspeicheldruese_1039",
      title: "Bauchspeicheldrüse (1039)",
      plants: BAUCHSPEICHELDRUESE_1039_PLANTS
    },
    {
      id: "leber_gallenblase_1040",
      title: "Leber & Gallenblase (1040)",
      plants: LEBER_GALLENBLASE_1040_PLANTS
    },
    {
      id: "debug",
      title: "Debug Beet",
      plants: DEBUG_PLANTS
    },
    {
      id: "hybrid",
      title: "Hybride",
      plants: []
    }
  ]
};
