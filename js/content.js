
function makePlant(id, title, context, n) {
  const qBase = `${id}_${n}`;
  const harvestQuestions = [
    { id: `${qBase}_h1`, type: "true_false", statement: `${title} ist als eigenstaendiger Lernbereich im Curriculum erfasst.`, answer: true },
    { id: `${qBase}_h2`, type: "true_false", statement: `${title} hat keinen Bezug zu den Grundlagen von ${context}.`, answer: false },
    { id: `${qBase}_h3`, type: "true_false", statement: `${title} sollte mindestens einmal sicher gelernt und abgeprueft werden.`, answer: true }
  ];
  const bossQuestions = [
    { id: `${qBase}_b1`, type: "true_false", statement: `${title} gehoert zum Pflichtkanon dieses Studienbriefs.`, answer: true }
  ];
  return {
    id,
    title,
    phase1: {
      soil: {
        statement: `${title} ist ein relevantes Thema im Studienbrief ${context}.`,
        answer: true,
        solution: "Korrekt. Dieses Thema ist Teil der verbindlichen Lernstruktur."
      },
      seed: {
        statement: `${title} kann fuer die Heilpraktiker-Pruefung vollstaendig ignoriert werden.`,
        answer: false,
        solution: "Korrekt. Das Thema gehoert in den Lernumfang und sollte mindestens einmal sicher beherrscht werden."
      },
      water: {
        statement: `Ein solides Verstaendnis von ${title} verbessert die sichere Einordnung von ${context}.`,
        answer: true,
        solution: "Korrekt. Genau dafuer dient die Phase-1-Grundlage."
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
        statement: "Zellen gleicher Funktion koennen sich zu Gewebeverbaenden zusammenschliessen.",
        answer: true,
        solution: "Zellen mit gleicher Spezialisierung lagern sich zu Gewebeverbaenden zusammen. Gewebe ist damit die naechsthoere Organisationsebene ueber der Einzelzelle und Grundlage aller Organe des Koerpers."
      }
    },
    harvestQuestions: [
      { id: "zb_h1", type: "true_false", statement: "Die Zelle ist die kleinste lebensfaehige Funktionseinheit.", answer: true, explanation: "Die Zelle besitzt alle Grundeigenschaften des Lebens: Stoffwechsel, Wachstum, Reizbarkeit und Fortpflanzung. Kein kleineres Teilstueck – weder eine Organelle noch ein Molekuel – erfuellt diese Bedingungen eigenstaendig." },
      { id: "zb_h2", type: "true_false", statement: "Der Zellbegriff hat keinen Bezug zur Vermehrungsfaehigkeit.", answer: false, explanation: "Vermehrungsfaehigkeit (Reproduktion) ist eine der Kerneigenschaften des Lebens und damit ein wesentliches Merkmal der Zelle. Zellteilung – ob durch Mitose oder Meiose – ist der biologische Ausdruck dieser Eigenschaft." },
      { id: "zb_h3", type: "true_false", statement: "Aus Zellverbaenden entstehen Gewebe.", answer: true, explanation: "Gleichartig differenzierte Zellen schliessen sich zu Zellverbaenden zusammen, die als Gewebe bezeichnet werden. Gewebe ist damit die naechsthoere Organisationsebene ueber der Einzelzelle und Grundlage aller Organe des Koerpers." },
      { id: "zb_h4", type: "true_false", statement: "Die Zelle ist die kleinste Einheit, die alle Grundeigenschaften des Lebens aufweist.", answer: true, explanation: "Zu den Grundeigenschaften des Lebens zaehlen Stoffwechsel, Wachstum, Reizbarkeit und Reproduktion – all diese Eigenschaften koennen nur auf der Ebene der vollstaendigen Zelle, nicht auf Organellen-Ebene, verwirklicht werden." },
      { id: "zb_h5", type: "true_false", statement: "Einzeller koennen nicht als vollstaendige Organismen betrachtet werden.", answer: false, explanation: "Einzeller wie Amöben, Paramecien oder Bakterien sind vollstaendige Organismen, die alle Lebensfunktionen in einer einzigen Zelle vereinen – von Ernaehrung und Bewegung bis zur Fortpflanzung. Sie sind der Beweis, dass die Zelle die kleinste lebensfahige Einheit ist." },
      { id: "zb_h6", type: "true_false", statement: "Der Begriff Zytologie bezeichnet die Wissenschaft von den Zellen und ihrer Struktur.", answer: true, explanation: "Zytologie (griech. kytos = Zelle, logos = Lehre) ist der Teilbereich der Biologie, der sich mit Aufbau, Funktion, Entwicklung und Geschichte der Zelle befasst. Sie bildet die Grundlage fuer Histologie, Physiologie und Pathologie." }
    ],
    bossQuestions: [
      { id: "zb_b1", type: "true_false", statement: "Zellbegriff und Gewebebegriff sind in 1031 direkt verknuepft.", answer: true }
    ],
    combatQuestions: [
      { id: "zb_mc1", type: "mc", question: "Welche Aussage zur Definition der Zelle ist korrekt?", options: [
        { text: "Die Zelle ist die kleinste lebensfaehige Funktionseinheit des Organismus.", correct: true },
        { text: "Zellen koennen nicht zu Geweben zusammengeschlossen werden.", correct: false },
        { text: "Der Zellbegriff bezieht sich nur auf tierische Organismen.", correct: false },
        { text: "Zytologie beschreibt ausschliesslich die Zellform, nicht die Funktion.", correct: false }
      ]},
      { id: "zb_mc2", type: "mc", question: "Was entsteht aus Verbaenden gleichartig differenzierter Zellen?", options: [
        { text: "Gewebe", correct: true },
        { text: "Chromosomen", correct: false },
        { text: "Organellen", correct: false },
        { text: "Enzyme", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "zellformen_und_groesse",
    title: "Zellformen und Zellgroesse",
    phase1: {
      soil: {
        statement: "Zellen koennen sehr unterschiedliche Formen besitzen, z. B. kugelig oder spindelfoermig.",
        answer: true,
        solution: "Zellform und Funktion sind direkt verknuepft: Nervenzellen sind lang ausgezogen fuer Signalleitung, Epithelzellen flach fuer Oberflaechenbedeckung, Muskelfasern spindelfoermig fuer Kontraktion. Diese Formenvielfalt ist kein Zufall, sondern Ausdruck funktioneller Spezialisierung."
      },
      seed: {
        statement: "Alle menschlichen Zellen sind in Form und Groesse nahezu identisch.",
        answer: false,
        solution: "Erythrozyten sind nur etwa 7 µm gross und bikonkav geformt, Nervenzellen koennen mit ihren Auslaeufern Meter lang sein. Diese extreme Vielfalt spiegelt die verschiedenartigen Aufgaben der Zellen im Koerper wider."
      },
      water: {
        statement: "Im Studienbrief wird die Eizelle als groesste Zelle des Organismus genannt.",
        answer: true,
        solution: "Die Eizelle (Ovum) ist die groesste menschliche Zelle mit einem Durchmesser von etwa 120 Mikrometern und damit gerade noch mit blossem Auge sichtbar. Die meisten anderen Koerperzellen sind dagegen nur mikroskopisch erkennbar."
      }
    },
    harvestQuestions: [
      { id: "zf_h1", type: "true_false", statement: "Zellform und Zellgroesse sind funktionell mit den Aufgaben der Zelle verknuepft.", answer: true, explanation: "Die Form einer Zelle ist kein Zufall, sondern Ausdruck ihrer Spezialisierung: Epithelzellen sind flach fuer die Oberflaechenbedeckung, Muskelfasern spindelfoermig fuer Kontraktion, und Erythrozyten bikonkav fuer maximale Haemoglobin-Kapazitaet und Verformbarkeit in engen Kapillaren." },
      { id: "zf_h2", type: "true_false", statement: "Nervenzellen und Muskelzellen werden als besonders kurz und breit beschrieben.", answer: false, explanation: "Nervenzellen sind aufgrund ihrer Leitungsaufgabe oft extrem lang ausgezogen – ein einzelnes Axon kann im Menschen ueber einen Meter lang sein. Muskelzellen sind spindelfoermig und ebenfalls laengsgestreckt, um Zugkraefte entlang ihrer Laengsachse zu entwickeln." },
      { id: "zf_h3", type: "true_false", statement: "Die Formenvielfalt der Zellen ist ein Grundthema der Zytologie.", answer: true, explanation: "Die Zytologie beschreibt und erklaert die ausserordentliche morphologische Vielfalt von Zellen, die von der kugeligen Eizelle ueber die bikonkave Blutscheibe bis zum meterlangen Axon reicht. Diese Formenvielfalt ist direkte Konsequenz funktioneller Spezialisierung." },
      { id: "zf_h4", type: "true_false", statement: "Die menschliche Eizelle gilt als groesste Zelle des menschlichen Koerpers.", answer: true, explanation: "Die Eizelle (Ovum) hat einen Durchmesser von ca. 120 Mikrometern und ist damit gerade noch mit blossem Auge sichtbar – die groesste Zelle im menschlichen Koerper. Ihre Groesse ist notwendig, da sie Naehrstoffvorrate fuer die fruehe Embryonalentwicklung enthaelt." },
      { id: "zf_h5", type: "true_false", statement: "Erythrozyten haben eine laengliche, staebartige Form.", answer: false, explanation: "Reife Erythrozyten sind bikonkave Scheiben (beidseitig eingedellt) mit einem Durchmesser von ca. 7–8 Mikrometern. Diese Form maximiert die Oberflaeche fuer den Gasaustausch und ermoeglicht die Verformung beim Passieren enger Kapillaren." },
      { id: "zf_h6", type: "true_false", statement: "Nervenzellen koennen aufgrund ihrer Leitungsaufgabe besonders lang ausgezogen sein.", answer: true, explanation: "Nervenzellen muessen elektrische Signale ueber weite Strecken leiten – vom Rueckenmark bis in die Zehen koennen einzelne Axone ueber einen Meter lang sein. Diese aussergewoehnliche Laenge ist eine direkte strukturelle Anpassung an die Informationsleitungsfunktion." }
    ],
    bossQuestions: [
      { id: "zf_b1", type: "true_false", statement: "In 1031 wird die Zelle nicht als Einheitsform, sondern als stark variable Struktur dargestellt.", answer: true }
    ],
    combatQuestions: [
      { id: "zf_mc1", type: "mc", question: "Welche Zelle gilt als die groesste Zelle im menschlichen Koerper?", options: [
        { text: "Die Eizelle (Ovum)", correct: true },
        { text: "Der Erythrozyt", correct: false },
        { text: "Der Osteoblast", correct: false },
        { text: "Der Lymphozyt", correct: false }
      ]},
      { id: "zf_mc2", type: "mc", question: "Warum koennen Nervenzellen besonders lang ausgezogen sein?", options: [
        { text: "Wegen ihrer Leitungsaufgabe ueber weite Strecken", correct: true },
        { text: "Wegen ihrer Faehigkeit zur schnellen Zellteilung", correct: false },
        { text: "Weil sie alle Organellen des Koerpers enthalten muessen", correct: false },
        { text: "Wegen ihrer kugeligen Grundstruktur", correct: false }
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
        solution: "Prokaryonte Zellen wie Bakterien besitzen kein von einer Membran umschlossenes Zellkernaequivalent. Ihre DNA liegt frei als kreisfoermiges Chromosom im Zytoplasma, ohne Kernhuelle von der uebrigen Zelle abgegrenzt."
      },
      seed: {
        statement: "Eukaryonte Zellen besitzen einen Zellkern.",
        answer: true,
        solution: "Der membranbegrenzte Zellkern (Nukleus) ist das definitive Merkmal aller Eukaryoten. Er trennt die DNA vom Zytoplasma und ermoeglicht getrennte Transkription (Zellkern) und Translation (Ribosom) – ein entscheidender evolutionaerer Schritt gegenueber Prokaryoten, die beides im Zytoplasma koppeln."
      },
      water: {
        statement: "Erythrozyten von Saeugetieren verlieren im Reifungsverlauf ihren Zellkern.",
        answer: true,
        solution: "Reife Erythrozyten stossen ihren Zellkern waehrend der Erythropoese aus, um maximalen Raum fuer Haemoglobin zu gewinnen. Da ohne Kern keine DNA-Replikation moeglich ist, koennen sie sich nicht teilen – ihre Lebensdauer von etwa 120 Tagen ist biologisch fix."
      }
    },
    harvestQuestions: [
      { id: "pe_h1", type: "true_false", statement: "Bakterien werden als prokaryonte Zellen eingeordnet.", answer: true, explanation: "Bakterien sind typische Prokaryoten: Ihre DNA liegt als kreisfoermiges Chromosom frei im Zytoplasma, ohne von einer Kernmembran abgegrenzt zu sein. Darueber hinaus fehlen ihnen membranumschlossene Organellen wie Mitochondrien oder Golgi-Apparat." },
      { id: "pe_h2", type: "true_false", statement: "Eukaryonte Zellen sind grundsaetzlich kernlos.", answer: false, explanation: "Das Gegenteil ist richtig: Eukaryoten sind durch einen membranbegrenzten Zellkern (Nukleus) definiert. Zu den Eukaryoten zaehlen alle vielzelligen Lebewesen – Tiere, Pflanzen, Pilze – sowie viele Einzeller. Kernlosigkeit ist ein Merkmal der Prokaryoten." },
      { id: "pe_h3", type: "true_false", statement: "Der Zellkern ist ein Hauptkriterium der Einteilung prokaryont/eukaryont.", answer: true, explanation: "Das An- oder Fehlen eines membranbegrenzten Zellkerns ist das entscheidende Kriterium dieser fundamentalen Einteilung aller Lebewesen. Pro- (= vor) und Eu- (= wahr) im Bezug auf Karyon (= Kern) beschreiben genau diesen Unterschied." },
      { id: "pe_h4", type: "true_false", statement: "Prokaryonte Zellen besitzen keinen membranbegrenzten Zellkern.", answer: true, explanation: "Bei Prokaryoten liegt die DNA als nucleoid bezeichnete Region frei im Zytoplasma, ohne von einer Doppelmembran (Kernhuelle) umschlossen zu sein. Dadurch laufen Transkription (DNA zu mRNA) und Translation (mRNA zu Protein) im selben Zellraum gleichzeitig ab." },
      { id: "pe_h5", type: "true_false", statement: "Pilze gehoeren zu den prokaryonten Organismen.", answer: false, explanation: "Pilze sind Eukaryoten: Ihre Zellen besitzen einen membranbegrenzten Zellkern, Mitochondrien und andere Organellen. Gemeinsam mit Tieren und Pflanzen bilden sie das Reich der Eukaryota. Nur Bakterien und Archaeen sind Prokaryoten." },
      { id: "pe_h6", type: "true_false", statement: "Reife Erythrozyten des Menschen sind kernlos, entstammen aber eukaryone Vorlaeuferzellen.", answer: true, explanation: "Reife Erythrozyten stossen ihren Zellkern waehrend der Reifung im Knochenmark aus, um mehr Platz fuer Haemoglobin zu schaffen. Ihre Vorlaeuferzellen (Erythroblasten) sind jedoch eukaryonte Zellen mit vollstaendigem Zellkern – kernlos zu sein ist ein Reifungsprodukt, kein prokaryontes Merkmal." }
    ],
    bossQuestions: [
      { id: "pe_b1", type: "true_false", statement: "Ausnahmen bei Saeugetierzellen widerlegen nicht das eukaryonte Grundprinzip.", answer: true }
    ],
    combatQuestions: [
      { id: "pe_mc1", type: "mc", question: "Was ist das Hauptmerkmal, das Prokaryonten von Eukaryonten unterscheidet?", options: [
        { text: "Das Fehlen eines membranbegrenzten Zellkerns bei Prokaryonten", correct: true },
        { text: "Die Groesse der Zelle: Prokaryonten sind immer groesser", correct: false },
        { text: "Prokaryonten besitzen keine Ribosomen", correct: false },
        { text: "Eukaryonten koennen sich nicht teilen", correct: false }
      ]},
      { id: "pe_mc2", type: "mc", question: "Welche Aussage ueber reife Erythrozyten des Menschen trifft zu?", options: [
        { text: "Sie sind kernlos, entstammen aber eukaryon Vorlaeuferzellen", correct: true },
        { text: "Sie sind prokaryonte Zellen ohne Zellkern", correct: false },
        { text: "Sie besitzen einen besonders grossen Zellkern", correct: false },
        { text: "Sie teilen sich zeitlebens durch Mitose", correct: false }
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
        solution: "Durch Zelldifferenzierung werden aus einheitlichen Vorlaeuferzellen Spezialisten: Muskelzellen, Nervenzellen, Druesen- oder Epithelzellen. Jeder Zelltyp aktiviert dabei nur einen Teil des gemeinsamen Erbguts, was seine spezifische Form und Funktion ergibt."
      },
      seed: {
        statement: "Differenzierte Zellen sind im Organismus stets auf genau eine einzige Funktion beschraenkt.",
        answer: false,
        solution: "Differenzierung bedeutet Schwerpunktsetzung, nicht Beschraenkung auf genau eine einzige Aufgabe. Leberzellen etwa betreiben gleichzeitig Entgiftung, Proteinsynthese und Glukosestoffwechsel – sie sind Generalisten unter den spezialisierten Zellen."
      },
      water: {
        statement: "Zellen gleicher Funktion bilden Zellverbaende, die als Gewebe bezeichnet werden.",
        answer: true,
        solution: "Gleichartig differenzierte Zellen lagern sich zusammen und bilden Gewebe. Zelldifferenzierung ist damit die Voraussetzung fuer Gewebebildung: Nur wenn Zellen spezialisierte Aufgaben uebernehmen, koennen sie sich sinnvoll zu einem Gewebeverband zusammenschliessen."
      }
    },
    harvestQuestions: [
      { id: "zd_h1", type: "true_false", statement: "Spezialisierte Zellen koennen Aufgaben wirksamer erfuellen.", answer: true, explanation: "Durch Differenzierung exprimiert jede Zelle nur den fuer ihre Aufgabe relevanten Teil des Genoms. Dadurch kann sie ihre Funktion hocheffizient ausfuehren – eine Muskelzelle etwa ist optimal auf Kraftentwicklung ausgerichtet, eine Druesen­zelle auf Sekretion." },
      { id: "zd_h2", type: "true_false", statement: "Zelldifferenzierung spielt fuer Gewebeorganisation keine Rolle.", answer: false, explanation: "Zelldifferenzierung ist die Voraussetzung jeder Gewebebildung: Gleichartig differenzierte Zellen lagern sich zu funktionellen Verbaenden zusammen und bilden so die vier Grundgewebetypen (Epithel, Binde-, Muskel- und Nervengewebe)." },
      { id: "zd_h3", type: "true_false", statement: "Differenzierung und Funktionszuordnung sind in 1031 eng gekoppelt.", answer: true, explanation: "Das Prinzip 'Form folgt Funktion' gilt auf zellulaerer Ebene: Jede Differenzierungsstufe geht mit strukturellen Veraenderungen einher, die genau der spezifischen Funktion dienen – z.B. Entwicklung von Myofibrillen in Muskelzellen oder Myelinscheide in Nervenzellen." },
      { id: "zd_h4", type: "true_false", statement: "Hoch differenzierte Zellen wie Nervenzellen haben oft nur eingeschraenkte Teilungsfaehigkeit.", answer: true, explanation: "Je staerker eine Zelle spezialisiert ist, desto weniger Ressourcen und zellulare Maschinerie stehen fuer Zellteilung zur Verfuegung. Ausgereifte Nervenzellen sind postmitotisch – sie teilen sich nach der Entwicklung nicht mehr, was erklaert, warum Hirnschäden schwer zu regenerieren sind." },
      { id: "zd_h5", type: "true_false", statement: "Alle differenzierten Zellen koennen sich jederzeit selbststaendig in undifferenzierte Stammzellen zurueckverwandeln.", answer: false, explanation: "Normale somatische Zellen verlieren im Laufe der Differenzierung ihre Pluripotenz dauerhaft. Eine spontane Entdifferenzierung findet unter normalen Bedingungen nicht statt; nur unter experimentellen Bedingungen (z.B. Yamanaka-Faktoren) lassen sich Zellen kuenstlich reprogrammieren." },
      { id: "zd_h6", type: "true_false", statement: "Zelldifferenzierung ist Voraussetzung fuer die Ausbildung spezialisierter Organe und Gewebe.", answer: true, explanation: "Organe sind aus mehreren Gewebetypen zusammengesetzt, und Gewebe bestehen aus differenzierten Zellen. Ohne Differenzierung gaebe es nur undifferenzierte Zellmassen ohne spezifische Funktion – die Entstehung komplexer Organe wie Herz oder Leber waere unmoeglich." }
    ],
    bossQuestions: [
      { id: "zd_b1", type: "true_false", statement: "Der Gewebebegriff baut auf dem Prinzip differenzierter Zellverbaende auf.", answer: true }
    ],
    combatQuestions: [
      { id: "zd_mc1", type: "mc", question: "Was bedeutet Zelldifferenzierung?", options: [
        { text: "Spezialisierung von Zellen auf bestimmte Aufgaben", correct: true },
        { text: "Die Fusion von zwei Zellen zu einer groesseren Einheit", correct: false },
        { text: "Die Faehigkeit aller Koerperzellen, sich jederzeit in Stammzellen zurueckzuverwandeln", correct: false },
        { text: "Ausschliesslich die Groessenzunahme von Zellen", correct: false }
      ]},
      { id: "zd_mc2", type: "mc", question: "Warum haben hoch differenzierte Zellen wie Nervenzellen oft eingeschraenkte Teilungsfaehigkeit?", options: [
        { text: "Weil Spezialisierung mit dem Verlust von Teilungskapazitaeten einhergeht", correct: true },
        { text: "Weil sie zu gross fuer eine Zellteilung sind", correct: false },
        { text: "Weil sie keinen Zellkern besitzen", correct: false },
        { text: "Weil Differenzierung immer sofort zur Apoptose fuehrt", correct: false }
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
        solution: "Die Zellmembran aus einer Phospholipid-Doppelschicht trennt das Zellinnere von der Aussenumgebung. Diese Grenzfunktion ist lebenswichtig, da sie ein stabiles internes Milieu (Homeostase) aufrechterhaelt und unkontrollierten Stoffaustausch verhindert."
      },
      seed: {
        statement: "Die Zellmembran ist vollstaendig undurchlaessig fuer alle Stoffe.",
        answer: false,
        solution: "Die Zellmembran ist nicht vollstaendig undurchlaessig, sondern selektiv permeabel: Kleine ungeladene Molekuele wie O2 und CO2 diffundieren frei, waehrend geladene Ionen und grosse Molekuele nur durch spezifische Kanalproteine passieren koennen."
      },
      water: {
        statement: "Hauptaufgabe der Zellmembran ist die Wirkung als Diffusionsbarriere.",
        answer: true,
        solution: "Als selektiv durchlaessige Barriere laesst die Zellmembran Wasser und kleine ungeladene Molekuele passieren, waehrend groessere oder geladene Substanzen Kanalproteine oder aktive Transporter benoetigen. So kontrolliert die Membran den Stoff- und Informationsaustausch der Zelle."
      }
    },
    harvestQuestions: [
      { id: "zm_h1", type: "true_false", statement: "Aktive und passive Transportvorgaenge ueberwinden die Diffusionsbarriere der Membran.", answer: true, explanation: "Passive Transportvorgaenge (Diffusion, Osmose, erleichterte Diffusion) nutzen vorhandene Konzentrations- oder Ladungsgradienten ohne Energieverbrauch. Aktiver Transport (z.B. Na⁺/K⁺-ATPase) pumpt Ionen gegen den Gradienten und benoetigt dafuer ATP." },
      { id: "zm_h2", type: "true_false", statement: "Die Unversehrtheit der Zellmembran ist fuer den Zellbestand unerheblich.", answer: false, explanation: "Die Zellmembran ist die Grenze zwischen Intra- und Extrazellulärraum und reguliert alle Ein- und Ausstroemung von Stoffen. Eine beschaedigte Membran fuehrt zum Verlust des Zellinnenmilieus, zur Hemmung aller membranabhaengigen Prozesse und letztendlich zum Zelltod." },
      { id: "zm_h3", type: "true_false", statement: "Selektive Permeabilitaet bedeutet, dass nur ausgewaehlte Substanzen passieren.", answer: true, explanation: "Die Lipidschicht der Membran ist nur fuer unpolare Molekuele (O2, CO2, Fettsaeuren) frei passierbar. Geladene Ionen und grosse Molekuele wie Glukose benoetigen spezifische Kanalproteine oder Carrier, was die Zelle in die Lage versetzt, ihren Stoffaustausch praezise zu kontrollieren." },
      { id: "zm_h4", type: "true_false", statement: "Die Zellmembran besteht aus einer Doppelschicht von Lipiden mit eingelagerten Proteinen.", answer: true, explanation: "Das Fluid-Mosaik-Modell beschreibt die Membran als Phospholipid-Doppelschicht, in die Proteine eingebettet sind: Integralproteine (durchspannen die Membran als Kanaele oder Transporter) und periphere Proteine (sitzen aussen als Rezeptoren oder Enzyme). Diese Zusammensetzung ermoeglicht gleichzeitig Stabilitaet und Funktionalitaet." },
      { id: "zm_h5", type: "true_false", statement: "Pinozytose bezeichnet die Aufnahme fester Partikel durch Einfalten der Membran.", answer: false, explanation: "Pinozytose (griech. pinein = trinken) bezeichnet die Aufnahme fluessiger Vesikel durch Membraneinfalten – die Zelle 'trinkt' also fluessige Inhalte. Die Aufnahme fester Partikel wird dagegen als Phagozytose (griech. phagein = fressen) bezeichnet, z.B. durch Makrophagen." },
      { id: "zm_h6", type: "true_false", statement: "Osmose ist der passive Wassertransport durch eine semipermeable Membran entlang eines Konzentrationsgradienten.", answer: true, explanation: "Osmose ist die Bewegung von Wasser vom Bereich niedrigerer Geloestkonzentration (hoehe Wasseraktivitaet) zum Bereich hoeherer Geloestkonzentration (niedrigere Wasseraktivitaet). Da Wasser die semipermeable Membran frei passieren kann, geloeste Teilchen aber nicht, entsteht durch Osmose ein Druckunterschied (osmotischer Druck)." }
    ],
    bossQuestions: [
      { id: "zm_b1", type: "true_false", statement: "Zellabgrenzung und Stofftransport sind gleichrangige Kernfunktionen der Zellmembran.", answer: true }
    ],
    combatQuestions: [
      { id: "zm_mc1", type: "mc", question: "Aus welchen Hauptbestandteilen besteht die Zellmembran?", options: [
        { text: "Aus einer Lipiddoppelschicht mit eingelagerten Proteinen", correct: true },
        { text: "Aus einer einfachen Proteinschicht ohne Lipide", correct: false },
        { text: "Aus Kollagenfasern und Elastin", correct: false },
        { text: "Aus Kohlenhydraten und Nukleinsaeuren", correct: false }
      ]},
      { id: "zm_mc2", type: "mc", question: "Was bedeutet selektive Permeabilitaet der Zellmembran?", options: [
        { text: "Nur bestimmte Stoffe koennen die Membran passieren", correct: true },
        { text: "Die Membran ist fuer alle Stoffe gleichermassen durchlaessig", correct: false },
        { text: "Die Membran ist vollstaendig undurchlaessig", correct: false },
        { text: "Nur Wasser kann die Membran passieren", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "zellplasma_organellen",
    title: "Zellplasma und Organellen",
    phase1: {
      soil: {
        statement: "Zum Zellplasma gehoeren verschiedene Organellen mit spezialisierten Aufgaben.",
        answer: true,
        solution: "Organellen sind membranumschlossene oder strukturell abgegrenzte Kompartimente im Zellplasma, die jeweils spezialisierte Teilfunktionen des Zellstoffwechsels uebernehmen. Diese Arbeitsteilung ermoeglicht hocheffiziente parallele Prozesse innerhalb einer einzigen Zelle."
      },
      seed: {
        statement: "Organellen sind fuer Stoffwechsel und Zellfunktion weitgehend bedeutungslos.",
        answer: false,
        solution: "Organellen sind fuer die Zellfunktion unverzichtbar: Mitochondrien liefern ATP fuer alle energieabhaengigen Prozesse, Ribosomen synthetisieren saemtliche Proteine, der Golgi-Apparat verpackt und sortiert Sekretprodukte. Ohne intakte Organellen bricht der Zellstoffwechsel zusammen."
      },
      water: {
        statement: "Mitochondrien, ER, Ribosomen und Golgi-Apparat werden als zentrale Organellen behandelt.",
        answer: true,
        solution: "Mitochondrien erzeugen ATP durch Zellatmung, Ribosomen synthetisieren Proteine, das raue ER verarbeitet Sekretproteine und der Golgi-Apparat sortiert und verpackt sie fuer die Weiterleitung. Diese vier Organellen bilden die zentrale Produktions- und Logistikkette der Zelle."
      }
    },
    harvestQuestions: [
      { id: "zo_h1", type: "true_false", statement: "Die funktionelle Arbeitsteilung in der Zelle wird ueber Organellen organisiert.", answer: true, explanation: "Organellen sind spezialisierte Kompartimente innerhalb der Zelle, die bestimmte biochemische Aufgaben uebernehmen: Mitochondrien (Energiegewinnung), Ribosomen (Proteinsynthese), Golgi-Apparat (Sortierung und Sekretion), Lysosomen (Abbau). Diese Arbeitsteilung ermoeglicht hocheffiziente parallele Prozesse." },
      { id: "zo_h2", type: "true_false", statement: "Ribosomen sind nicht an Proteinsyntheseprozessen beteiligt.", answer: false, explanation: "Ribosomen sind die zentralen Orte der Translation: Hier wird die mRNA-Sequenz in eine Aminosaeurekette uebersetzt. Membrangebundene Ribosomen am rauen ER produzieren Sekret- und Membranproteine, freie Ribosomen im Zytosol produzieren zytosolische Proteine." },
      { id: "zo_h3", type: "true_false", statement: "Das Zusammenspiel der Organellen ist Voraussetzung fuer stabile Zellfunktion.", answer: true, explanation: "Die Organellen sind funktionell vernetzt: Ribosomen am rauen ER produzieren Proteine, die das ER faltet und modifiziert, der Golgi-Apparat verpackt und adressiert sie, und Lysosomen bauen fehlerhafte Proteine ab. Stoerungen in einem Glied dieser Kette beeintraechtigen das gesamte System." },
      { id: "zo_h4", type: "true_false", statement: "Mitochondrien besitzen eine eigene DNS und koennen sich eigenstaendig teilen.", answer: true, explanation: "Mitochondrien haben eine eigene zirkulaere DNA (mtDNA), eigene Ribosomen und teilen sich durch binaere Teilung – aehnlich wie Bakterien. Dies stuetzt die Endosymbiosetheorie, nach der Mitochondrien evolutionaer aus freilebenden Bakterien entstanden sind, die in groessere Zellen aufgenommen wurden." },
      { id: "zo_h5", type: "true_false", statement: "Das glatte endoplasmatische Retikulum ist primaer fuer die Proteinsynthese zustaendig.", answer: false, explanation: "Das glatte ER (ohne Ribosomen) ist hauptsaechlich fuer Lipidsynthese, Steroidhormonsynthese und Entgiftungsreaktionen zustaendig. Die Proteinsynthese findet am rauen ER statt, das Ribosomen auf seiner Aussenseite traegt und so strukturell von glattem ER unterschieden werden kann." },
      { id: "zo_h6", type: "true_false", statement: "Der Golgi-Apparat ist u. a. fuer die Bildung von Lysosomen verantwortlich.", answer: true, explanation: "Der Golgi-Apparat modifiziert und sortiert Proteine aus dem ER und schickt sie an ihre Zielorte. Lysosomen entstehen als Blaeschenvesikel am trans-Golgi-Netzwerk, gefuellt mit sauren Hydrolasen, die zellulaere Abfallstoffe und aufgenommene Partikel abbauen koennen." }
    ],
    bossQuestions: [
      { id: "zo_b1", type: "true_false", statement: "Das Zellplasma ist kein passiver Fuellraum, sondern funktioneller Reaktionsraum mit Organellen.", answer: true }
    ],
    combatQuestions: [
      { id: "zo_mc1", type: "mc", question: "Welche Funktion hat das Mitochondrium in der Zelle?", options: [
        { text: "Es ist das Kraftwerk der Zelle und produziert ATP durch Zellatmung", correct: true },
        { text: "Es ist primaer fuer die Proteinsynthese zustaendig", correct: false },
        { text: "Es verteilt Sekrete an die Zelloberflaehe", correct: false },
        { text: "Es enthaelt die Erbinformation der Zelle", correct: false }
      ]},
      { id: "zo_mc2", type: "mc", question: "Was unterscheidet das raue vom glatten endoplasmatischen Retikulum?", options: [
        { text: "Das raue ER traegt Ribosomen und ist an der Proteinsynthese beteiligt", correct: true },
        { text: "Das glatte ER produziert mehr Proteine als das raue ER", correct: false },
        { text: "Nur das glatte ER kommt in menschlichen Zellen vor", correct: false },
        { text: "Beide Typen sind morphologisch und funktionell identisch", correct: false }
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
        solution: "Der Zellkern enthaelt die gesamte Erbinformation (DNA) und steuert ueber Genexpression und mRNA-Synthese alle wesentlichen Zellaktivitaeten. Er bestimmt als Steuerzentrum, welche Proteine wann und in welcher Menge hergestellt werden."
      },
      seed: {
        statement: "Die im Zellkern lokalisierte Erbinformation ist fuer Zellprozesse ohne Bedeutung.",
        answer: false,
        solution: "Der Kern enthaelt die Erbinformation und steuert zentrale Prozesse."
      },
      water: {
        statement: "Im Studienbrief wird die Form und Lage von Zellkernen als variabel beschrieben.",
        answer: true,
        solution: "Die Form und Lage von Zellkernen variiert je nach Zelltyp: Erythrozyten sind kernlos, Neutrophile haben mehrlappige Kerne, Muskelzellen haben periphere laengliche Kerne. Diese Variabilitaet ist Ausdruck unterschiedlicher Genaktivitaet und Funktion."
      }
    },
    harvestQuestions: [
      { id: "zk_h1", type: "true_false", statement: "Der Zellkern enthaelt genetische Information.", answer: true, explanation: "Der Zellkern beherbergt die gesamte genomische DNA der Zelle, verpackt in Chromosomen. Diese DNA enthaelt alle Bauplaene fuer Proteine und regulatorische Sequenzen und wird bei der Zellteilung vollstaendig verdoppelt und gleichmaessig auf die Tochterzellen verteilt." },
      { id: "zk_h2", type: "true_false", statement: "Alle menschlichen Zellen besitzen zwingend genau einen Zellkern.", answer: false, explanation: "Es gibt wichtige Ausnahmen: Reife Erythrozyten sind kernlos (kein Kern nach Reifung), Skelettmuskelfasern sind vielkernig (mehrere Kerne in einer langen Faser durch Zellfusion), und Megakaryozyten im Knochenmark sind vielkernig, bevor sie Blutplaettchen abschniehren." },
      { id: "zk_h3", type: "true_false", statement: "Kernstruktur und Kernfunktion sind fuer Zellteilung und Regulation zentral.", answer: true, explanation: "Der Kern ist das Steuerzentrum: Bei der Zellteilung wird die DNA aus dem Kern freigesetzt, verdoppelt und auf die Tochterkerne verteilt. Im Ruhezustand steuert er durch differentielle Genexpression, welche Proteine die Zelle in welcher Menge produziert." },
      { id: "zk_h4", type: "true_false", statement: "Der menschliche Zellkern enthaelt 46 Chromosomen, eingeteilt in 23 Paare.", answer: true, explanation: "Der diploide Chromosomensatz des Menschen (2n = 46) besteht aus 22 Paaren von Autosomen und einem Paar Geschlechtschromosomen (XX bei Frauen, XY bei Maennern). Jedes Paar besteht aus einem muetterlichen und einem vaeterlichen Chromosom." },
      { id: "zk_h5", type: "true_false", statement: "Chromatin ist genetisch inaktives Reservematerial im Zellkern ohne Funktion.", answer: false, explanation: "Chromatin ist der funktionelle Zustand der DNA im Kern: Euchromatin ist aufgelockert und transkriptionsaktiv, Heterochromatin ist kondensiert und weitgehend inaktiv. Der Verdichtungsgrad des Chromatins reguliert also, welche Gene aktiv sind – Chromatin ist damit ein zentrales Regulationswerkzeug der Zelle." },
      { id: "zk_h6", type: "true_false", statement: "Der Nukleolus ist ein Bestandteil des Zellkerns und enthaelt DNS, RNS und Proteine.", answer: true, explanation: "Der Nukleolus ist eine nicht-membranumschlossene Struktur im Kern, die aus DNA-Abschnitten (rDNA-Gene), ribosomaler RNA und Proteinen besteht. Er ist der Hauptort der ribosomalen RNA-Synthese und der Zusammensetzung ribosomaler Untereinheiten." }
    ],
    bossQuestions: [
      { id: "zk_b1", type: "true_false", statement: "Die Bedeutung des Zellkerns reicht ueber reine Morphologie hinaus in die funktionelle Zellsteuerung.", answer: true }
    ],
    combatQuestions: [
      { id: "zk_mc1", type: "mc", question: "Wie viele Chromosomen besitzt eine normale menschliche Koerperzelle?", options: [
        { text: "46 Chromosomen in 23 Paaren", correct: true },
        { text: "23 Chromosomen in haploider Form", correct: false },
        { text: "48 Chromosomen in 24 Paaren", correct: false },
        { text: "92 Chromosomen nach der DNA-Replikation", correct: false }
      ]},
      { id: "zk_mc2", type: "mc", question: "Welche Funktion hat der Nukleolus im Zellkern?", options: [
        { text: "Er ist an der Bildung von ribosomaler RNS beteiligt", correct: true },
        { text: "Er speichert ATP fuer die Zellteilung", correct: false },
        { text: "Er ist fuer die Lipidsynthese zustaendig", correct: false },
        { text: "Er bildet die Kernmembran", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "stoffwechsel",
    title: "Physiologie: Stoffwechsel",
    phase1: {
      soil: {
        statement: "Der zellulaere Stoffwechsel umfasst den Umgang mit Proteinen, Kohlenhydraten, Lipiden, Wasser und Enzymen.",
        answer: true,
        solution: "Der zellulaere Stoffwechsel umfasst alle biochemischen Reaktionen, durch die Zellen Naehrstoffe aufnehmen, umwandeln und verwerten. Proteine, Kohlenhydrate, Lipide, Wasser und Enzyme sind dabei die zentralen Substrate und Werkzeuge dieser Prozesse."
      },
      seed: {
        statement: "Energieaspekte sind vom zellulaeren Stoffwechsel getrennt und kein Thema der Zytologie.",
        answer: false,
        solution: "Energie ist eine zentrale Groesse im Zellstoffwechsel: Katabole Prozesse (Abbau) setzen Energie frei, anabole Prozesse (Aufbau) verbrauchen sie. ATP als universelle Energiewaehrung der Zelle verbindet beide Seiten des Stoffwechsels miteinander."
      },
      water: {
        statement: "Stoffwechselvorgaenge sind fuer Zellfunktion und Anpassungsfaehigkeit grundlegend.",
        answer: true,
        solution: "Ohne funktionierende Stoffwechselprozesse koennen Zellen nicht ueberleben, wachsen oder auf Veraenderungen reagieren. Besonders Proteine, Enzyme und Energie (ATP) sind unabdingbare Voraussetzungen fuer alle zellularen Aktivitaeten."
      }
    },
    harvestQuestions: [
      { id: "sw_h1", type: "true_false", statement: "Enzyme sind fuer viele zellulaere Stoffwechselprozesse bedeutsam.", answer: true, explanation: "Enzyme sind biologische Katalysatoren, die biochemische Reaktionen in der Zelle um viele Groessenordnungen beschleunigen, ohne selbst verbraucht zu werden. Fast jeder Schritt des Zellstoffwechsels – von der Glykolyse bis zur DNA-Replikation – ist enzymabhaengig." },
      { id: "sw_h2", type: "true_false", statement: "Wasser spielt im Zellstoffwechsel keine relevante Rolle.", answer: false, explanation: "Wasser macht 60–70 % der Zellmasse aus und ist unverzichtbares Loesungsmittel, Transportmedium und direkter Reaktionspartner in Hydrolyse- und Kondensationsreaktionen. Ohne Wasser kann keine biochemische Reaktion in der Zelle stattfinden." },
      { id: "sw_h3", type: "true_false", statement: "Energiegewinnung ist funktionell mit Stoffwechselwegen verknuepft.", answer: true, explanation: "ATP als universelle Energiewaehrung der Zelle wird durch katabole Stoffwechselprozesse erzeugt: Glykolyse im Zytosol, Zitratzyklus und oxidative Phosphorylierung in den Mitochondrien. Diese Energie treibt anabole Prozesse (Proteinsynthese, Zellteilung) und aktive Transportvorgaenge an." },
      { id: "sw_h4", type: "true_false", statement: "Katabolismus bezeichnet den abbauenden, Anabolismus den aufbauenden Teil des Stoffwechsels.", answer: true, explanation: "Katabolismus umfasst alle abbauenden Reaktionen (Glykolyse, Lipolyse, Proteolyse), bei denen komplexe Molekuele aufgespalten und Energie freigesetzt wird. Anabolismus umfasst aufbauende Reaktionen (Proteinsynthese, Glykogensynthese), die Energie verbrauchen und neue Biomolekuele erzeugen." },
      { id: "sw_h5", type: "true_false", statement: "Alle Aminosaeuren koennen vom menschlichen Koerper selbst hergestellt werden.", answer: false, explanation: "Von den 20 proteinogenen Aminosaeuren sind 8 (beim Erwachsenen) essenziell: Sie koennen vom Koerper nicht selbst synthetisiert werden und muessen mit der Nahrung aufgenommen werden. Dazu gehoeren z.B. Leucin, Isoleucin, Valin, Lysin und Tryptophan." },
      { id: "sw_h6", type: "true_false", statement: "Die Proteinsynthese verlaeuft ueber den Weg DNS → mRNS → Ribosom → Protein.", answer: true, explanation: "Dieser Weg entspricht dem zentralen Dogma der Molekularbiologie: Transkription (im Zellkern: DNA wird in mRNA umgeschrieben) und Translation (am Ribosom: mRNA wird in eine Aminosaeurekette uebersetzt). Die Sequenz der mRNA bestimmt dabei eindeutig die Sequenz des entstehenden Proteins." }
    ],
    bossQuestions: [
      { id: "sw_b1", type: "true_false", statement: "Stoffwechselkompetenz ist Grundvoraussetzung fuer das Verstaendnis zellulaerer Physiologie.", answer: true }
    ],
    combatQuestions: [
      { id: "sw_mc1", type: "mc", question: "In welcher Reihenfolge verlaeuft die Proteinsynthese in der Zelle?", options: [
        { text: "DNS → mRNS → Ribosom → Protein", correct: true },
        { text: "mRNS → DNS → Ribosom → Protein", correct: false },
        { text: "Ribosom → DNS → tRNS → Protein", correct: false },
        { text: "Protein → DNS → mRNS → Ribosom", correct: false }
      ]},
      { id: "sw_mc2", type: "mc", question: "Was bezeichnet der Begriff Katabolismus?", options: [
        { text: "Den abbauenden Teil des Stoffwechsels, bei dem Energie freigesetzt wird", correct: true },
        { text: "Den aufbauenden Teil des Stoffwechsels", correct: false },
        { text: "Ausschliesslich den anaeroben Energiestoffwechsel", correct: false },
        { text: "Die Gesamtheit aller enzymatischen Reaktionen", correct: false }
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
        solution: "Bei der Mitose verdoppelt die Zelle zuerst ihre DNA vollstaendig (Interphase) und verteilt dann die identischen Chromosomensaetze gleichmaessig auf zwei Tochterzellen. Das Ergebnis sind stets zwei genetisch identische, diploide Tochterzellen."
      },
      seed: {
        statement: "Bei der Mitose entstehen regelhaft vier haploide Tochterzellen.",
        answer: false,
        solution: "Mitose fuehrt zu zwei genetisch identischen Tochterzellen."
      },
      water: {
        statement: "Prophase, Metaphase, Anaphase und Telophase sind Kernphasen der Mitose.",
        answer: true,
        solution: "Prophase (Chromosomenverdichtung), Metaphase (Ausrichtung in der Aequatorialplatte), Anaphase (Trennung der Schwesterchromatiden) und Telophase (Bildung neuer Kerne) sichern durch klare Aufgabenteilung die fehlerfreie Verteilung des Erbguts auf beide Tochterzellen."
      }
    },
    harvestQuestions: [
      { id: "mi_h1", type: "true_false", statement: "Mitose ist die haeufigste im Koerper vorkommende Form der Zellteilung.", answer: true, explanation: "Mitose dient dem Wachstum, der Gewebereparatur und der Erneuerung kurzlebiger Zellen (z.B. Blutzellen, Darmepithel). Im gesamten Organismus finden pro Tag Milliarden Mitosen statt, waehrend Meiose nur in den Keimdruesengeweben vorkommt." },
      { id: "mi_h2", type: "true_false", statement: "Interphase zaehlt als klassische Mitosephase zwischen Pro- und Metaphase.", answer: false, explanation: "Die Interphase ist der Zeitraum zwischen zwei Zellteilungen – hier werden DNA repliziert und zellulaere Strukturen verdoppelt. Die eigentlichen Mitosephasen sind Prophase, Metaphase, Anaphase und Telophase; die Interphase gehoert nicht zu diesen Kernphasen der Teilung." },
      { id: "mi_h3", type: "true_false", statement: "Mitose dient der verlustlosen Weitergabe genetischer Information.", answer: true, explanation: "Bei der Mitose wird die gesamte DNA zuerst in der Interphase verdoppelt (DNA-Replikation) und dann durch den Spindelapparat gleichmaessig auf beide Tochterkerne verteilt. Beide Tochterzellen erhalten somit eine vollstaendige, identische Kopie des Erbguts." },
      { id: "mi_h4", type: "true_false", statement: "Die vier Phasen der Mitose sind Prophase, Metaphase, Anaphase und Telophase.", answer: true, explanation: "In der Prophase kondensieren Chromosomen und verschwindet die Kernhuelle; in der Metaphase richten sich Chromosomen in der Aequatorialplatte aus; in der Anaphase werden Schwesterchromatiden zu den Polen gezogen; in der Telophase bilden sich neue Zellkerne und die Zytokinese teilt die Zelle." },
      { id: "mi_h5", type: "true_false", statement: "In der Interphase findet die eigentliche Kernteilung der Mitose statt.", answer: false, explanation: "Die Interphase ist die Phase zwischen zwei Zellteilungen, in der die Zelle waechst und ihre DNA repliziert. Die eigentliche Kernteilung (Karyokinese) findet in den vier Mitosephasen (Pro-, Meta-, Ana-, Telophase) statt, gefolgt von der Zellteilung (Zytokinese)." },
      { id: "mi_h6", type: "true_false", statement: "Nach vollstaendiger Mitose besitzen beide Tochterzellen denselben diploiden Chromosomensatz wie die Mutterzelle.", answer: true, explanation: "Da die DNA in der Interphase vollstaendig repliziert und dann durch die Mitosephasen exakt auf beide Tochterkerne verteilt wird, enthalten beide Tochterzellen den vollstaendigen diploiden Chromosomensatz (2n = 46) der Mutterzelle. Dies sichert genetische Stabilitaet." }
    ],
    bossQuestions: [
      { id: "mi_b1", type: "true_false", statement: "Bei der Mitose entstehen zwei identische Tochterzellen mit gleichem Erbgut.", answer: true }
    ],
    combatQuestions: [
      { id: "mi_mc1", type: "mc", question: "In welcher Reihenfolge verlaufen die Phasen der Mitose?", options: [
        { text: "Prophase → Metaphase → Anaphase → Telophase", correct: true },
        { text: "Prophase → Anaphase → Metaphase → Telophase", correct: false },
        { text: "Metaphase → Prophase → Anaphase → Telophase", correct: false },
        { text: "Interphase → Prophase → Metaphase → Telophase", correct: false }
      ]},
      { id: "mi_mc2", type: "mc", question: "Welches Ergebnis hat eine vollstaendige Mitose?", options: [
        { text: "Zwei erbgleiche diploide Tochterzellen", correct: true },
        { text: "Vier haploide Tochterzellen", correct: false },
        { text: "Zwei haploide, genetisch verschiedene Tochterzellen", correct: false },
        { text: "Eine diploide und eine haploide Tochterzelle", correct: false }
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
        solution: "Meiose tritt ausschliesslich in den Keimdruesengeweben (Hoden, Eierstock) auf, nicht in normalen Koerperzellen. Nur bei der Bildung von Spermien und Eizellen ist diese Reduktion des Chromosomensatzes notwendig und moeglich."
      },
      water: {
        statement: "Bei der Meiose entstehen aus einer diploiden Zelle vier haploide, nicht erbgleiche Zellen.",
        answer: true,
        solution: "Aus der diploiden Ausgangszelle (2n = 46) entstehen nach Meiose I (Chromosomenzahlreduktion) und Meiose II (Trennung der Schwesterchromatiden) vier haploide Tochterzellen (n = 23). Durch Crossing-over in Prophase I sind diese vier Zellen genetisch untereinander verschieden."
      }
    },
    harvestQuestions: [
      { id: "me_h1", type: "true_false", statement: "Die Meiose reduziert den Chromosomensatz fuer die Keimzellenbildung.", answer: true, explanation: "Die Meiose halbiert den diploiden Chromosomensatz (2n = 46) auf den haploiden Satz (n = 23). Diese Reduktion ist zwingend notwendig, damit bei der Befruchtung – wenn Ei- und Samenzelle fusionieren – wieder der diploide Chromosomensatz entsteht und nicht jede Generation die doppelte Chromosomenzahl traegt." },
      { id: "me_h2", type: "true_false", statement: "Nach Meiose sind die Tochterzellen untereinander genetisch identisch.", answer: false, explanation: "Durch zwei Mechanismen entstehen genetisch verschiedene Tochterzellen: Crossing-over in Prophase I tauscht Gensegmente zwischen homologen Chromosomen aus, und die zufaellige Verteilung der homologen Chromosomen (Independent Assortment) in Meiose I erzeugt 2²³ verschiedene Kombinationsmoeglichkeiten." },
      { id: "me_h3", type: "true_false", statement: "Crossing-over traegt zur genetischen Vielfalt bei.", answer: true, explanation: "Crossing-over (reziproker Austausch von Chromosomensegmenten zwischen homologen Chromosomen in Prophase I) rekombiniert Allele auf einem Chromosom neu. Zusammen mit der zufaelligen Verteilung der Chromosomensaetze in Meiose I sorgt es fuer die ausserordentliche genetische Vielfalt von Keimzellen." },
      { id: "me_h4", type: "true_false", statement: "Die Meiose besteht aus zwei aufeinanderfolgenden Teilungsschritten.", answer: true, explanation: "Meiose I (Reduktionsteilung) trennt die homologen Chromosomenpaare und halbiert die Chromosomenzahl. Meiose II (aequationale Teilung, aehnlich der Mitose) trennt die Schwesterchromatiden. Zusammen entstehen aus einer diploiden Zelle vier haploide Tochterzellen." },
      { id: "me_h5", type: "true_false", statement: "Bei Meiose I bleibt die Chromosomenzahl unveraendert erhalten.", answer: false, explanation: "Meiose I ist die Reduktions­teilung: Hier werden die 23 Paare homologer Chromosomen getrennt, sodass jede Tochterzelle nur noch 23 Chromosomen (aber noch je zwei Schwesterchromatiden) erhaelt – die Chromosomenzahl wird also von 46 auf 23 halbiert." },
      { id: "me_h6", type: "true_false", statement: "Das Crossing-over findet in der Prophase I der Meiose statt.", answer: true, explanation: "In der Prophase I der Meiose lagern sich homologe Chromosomen im Tetrade-Stadium zusammen (Synapsis). An Chiasma genannten Ueberkreuzungsstellen werden homologe DNA-Segmente ausgetauscht. Dieser Austausch erzeugt Chromosomen mit neuen Allelkombinationen und damit genetische Vielfalt." }
    ],
    bossQuestions: [
      { id: "me_b1", type: "true_false", statement: "Mitose und Meiose unterscheiden sich grundlegend in Ziel, Ergebnis und Zelltypbezug.", answer: true }
    ],
    combatQuestions: [
      { id: "me_mc1", type: "mc", question: "Welches Ergebnis hat die Meiose?", options: [
        { text: "Vier haploide, genetisch verschiedene Tochterzellen", correct: true },
        { text: "Zwei diploide, erbgleiche Tochterzellen", correct: false },
        { text: "Vier diploide Tochterzellen", correct: false },
        { text: "Zwei haploide, erbgleiche Tochterzellen", correct: false }
      ]},
      { id: "me_mc2", type: "mc", question: "Wann findet das Crossing-over statt?", options: [
        { text: "In der Prophase I der Meiose", correct: true },
        { text: "In der Metaphase II der Meiose", correct: false },
        { text: "In der Anaphase I der Meiose", correct: false },
        { text: "Waehrend der Interphase vor der Meiose", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "chromosomenabberationen",
    title: "Chromosomenabberationen",
    phase1: {
      soil: {
        statement: "Chromosomenabberationen werden im Studienbrief als eigenes Kapitel behandelt.",
        answer: true,
        solution: "Chromosomenabberationen entstehen durch Fehler bei der Zellteilung, wenn Chromosomen nicht korrekt getrennt oder verteilt werden (Non-Disjunction). Bei numerischen Aberrationen weicht die Gesamtzahl der Chromosomen vom Normalwert 46 ab, z. B. bei Trisomien (47 Chromosomen)."
      },
      seed: {
        statement: "Chromosomenabberationen entstehen ausschliesslich durch Zellmembranfehler.",
        answer: false,
        solution: "Chromosomenaberrationen entstehen nicht durch Membranfehler, sondern durch Fehler bei der Zellteilung: Waehrend der Mitose oder Meiose kann die Verteilung der Chromosomen fehlerhaft verlaufen (Non-disjunction), was zu Fehlanzahlen oder Strukturveraenderungen fuehrt."
      },
      water: {
        statement: "Es wird zwischen autosomalen und gonosomalen numerischen Aberrationen unterschieden.",
        answer: true,
        solution: "Autosomale Aberrationen betreffen die Koerperchromosomen (1–22), gonosomale die Geschlechtschromosomen (X, Y). Trisomie 21 (Down-Syndrom) ist autosomale Aberration, Turner-Syndrom (45, X0) und Klinefelter-Syndrom (47, XXY) sind gonosomale Aberrationen."
      }
    },
    harvestQuestions: [
      { id: "ca_h1", type: "true_false", statement: "Numerische Chromosomenabberationen betreffen die Anzahl von Chromosomen.", answer: true, explanation: "Bei numerischen Chromosomenaberrationen weicht die Gesamtzahl der Chromosomen vom Normalwert 46 ab. Trisomien (47 Chromosomen) entstehen durch Non-Disjunction waehrend der Meiose, bei der ein Chromosomenpaar nicht korrekt getrennt wird und beide in eine Tochterzelle wandern." },
      { id: "ca_h2", type: "true_false", statement: "Klinefelter- und Turner-Syndrom sind Beispiele fuer gonosomale numerische Aberrationen.", answer: true, explanation: "Gonosomale Aberrationen betreffen die Geschlechtschromosomen: Turner-Syndrom (45, X0) hat nur ein X-Chromosom statt zwei, Klinefelter-Syndrom (47, XXY) hat ein zusaetzliches X-Chromosom. Beide entstehen durch fehlerhafte Chromosomentrennung in der Meiose der Eltern." },
      { id: "ca_h3", type: "true_false", statement: "Chromosomenabberationen sind fuer die zellulaere Vererbungslehre ohne Relevanz.", answer: false, explanation: "Chromosomenaberrationen sind ein zentrales Thema der Genetik und Vererbungslehre. Sie erklaeren Erbkrankheiten, Fertilitaetsstoerungen und Fehlgeburten. Die sichere Unterscheidung von autosomalen und gonosomalen Aberrationen ist pruefungsrelevant." },
      { id: "ca_h4", type: "true_false", statement: "Das Down-Syndrom ist eine autosomale Trisomie des Chromosoms 21.", answer: true, explanation: "Trisomie 21 entsteht durch Non-Disjunction in der Meiose: Ein Elternteil gibt eine Keimzelle mit zwei Chromosomen 21 ab. Das befruchtete Ei hat dann drei Chromosomen 21 (Trisomie) statt zwei, was zu charakteristischen Merkmalen und intellektuellen Einschraenkungen fuehren kann." },
      { id: "ca_h5", type: "true_false", statement: "Das Turner-Syndrom (Monosomie X) zaehlt zu den autosomalen Aberrationen.", answer: false, explanation: "Das Turner-Syndrom (Karyotyp 45, X0) betrifft die Geschlechtschromosomen, ist also eine gonosomale Aberration. Autosomale Aberrationen betreffen die Chromosomenpaare 1–22 (Autosomen); das Turner-Syndrom betrifft dagegen das 23. Paar (Gonosomen/Geschlechtschromosomen)." },
      { id: "ca_h6", type: "true_false", statement: "Bei einer Trisomie ist ein Chromosom dreifach vorhanden, die Gesamtzahl betraegt 47.", answer: true, explanation: "Normale Koerperzellen haben 46 Chromosomen (diploider Satz). Bei einer Trisomie ist durch fehlerhafte Meiose ein Chromosom dreifach vertreten statt zweifach. Die Gesamtzahl erhoht sich dadurch auf 47. Bekannte Trisomien sind Trisomie 21 (Down), 18 (Edwards) und 13 (Patau)." }
    ],
    bossQuestions: [
      { id: "ca_b1", type: "true_false", statement: "Das Verstaendnis numerischer Aberrationen setzt sichere Grundlagen in Mitose/Meiose voraus.", answer: true }
    ],
    combatQuestions: [
      { id: "ca_mc1", type: "mc", question: "Welches Syndrom ist eine autosomale Trisomie des Chromosoms 21?", options: [
        { text: "Down-Syndrom (Trisomie 21)", correct: true },
        { text: "Klinefelter-Syndrom (XXY)", correct: false },
        { text: "Turner-Syndrom (Monosomie X)", correct: false },
        { text: "Patau-Syndrom (Trisomie 13)", correct: false }
      ]},
      { id: "ca_mc2", type: "mc", question: "Was charakterisiert eine numerische Chromosomenaberration?", options: [
        { text: "Eine veraenderte Anzahl von Chromosomen (z. B. 45 oder 47 statt 46)", correct: true },
        { text: "Eine Veraenderung der Chromosomenstruktur ohne Zahlaenderung", correct: false },
        { text: "Ein Austausch genetischen Materials zwischen nicht-homologen Chromosomen", correct: false },
        { text: "Eine Mutation einzelner Gene ohne Bezug zur Chromosomenzahl", correct: false }
      ]}
    ]
  })
];

const HISTOLOGIE_1032_PLANTS = [
  makeDetailedPlant({
    id: "zellverbindungen",
    title: "Zellverbindungen",
    phase1: {
      soil: { statement: "In 1032 werden Adhaesionskontakte, Tight Junctions und Gap Junctions unterschieden.", answer: true, solution: "Die drei Verbindungstypen haben verschiedene Aufgaben: Adhaesionskontakte (z.B. Desmosomen) geben mechanischen Halt, Tight Junctions dichten den Interzellularraum ab und verhindern parazellulaere Diffusion, Gap Junctions ermöglichen direkten Stoffaustausch zwischen Zellen." },
      seed: { statement: "Alle Zellverbindungen haben dieselbe Funktion und sind histologisch nicht unterscheidbar.", answer: false, solution: "Die drei Verbindungstypen haben klar unterschiedliche Aufgaben: Tight Junctions dichten den Interzellularraum ab, Adhaesionskontakte (Desmosomen) geben mechanischen Halt, Gap Junctions ermöglichen direkten Stoff- und Signalaustausch zwischen Nachbarzellen." },
      water: { statement: "Gap Junctions dienen dem Signal- und Stoffaustausch zwischen Zellen.", answer: true, solution: "Gap Junctions sind Kanalproteine (Connexone), die benachbarte Zellen direkt verbinden und den Austausch kleiner Molekuele (Ionen, cAMP, Metaboliten) ermoglichen. Dadurch koennen z.B. Herzmuskelzellen elektrische Signale direkt weitergeben und koordiniert schlagen." }
    },
    harvestQuestions: [
      { id: "hi_zv_h1", type: "true_false", statement: "Tight Junctions dichten den Raum zwischen Zellen weitgehend ab.", answer: true, explanation: "Tight Junctions (Zonulae occludentes) bestehen aus Transmembranproteinen (Claudine, Occludin), die den parazellullaeren Spalt fast vollstaendig verschliessen. Dadurch koennen Ionen und Molekuele nicht unkontrolliert zwischen Epithelzellen hindurchdiffundieren – entscheidend z.B. fuer die Barrierefunktion im Darmepithel und an der Blut-Hirn-Schranke." },
      { id: "hi_zv_h2", type: "true_false", statement: "Desmosomen sind primaer Kommunikationskanaele fuer Ionen.", answer: false, explanation: "Desmosomen (Maculae adhaerentes) sind mechanische Haftstrukturen, keine Kommunikationskanaele. Sie verankern Keratin-Intermediarfilamente zwischen benachbarten Zellen und verleihen Geweben Zugfestigkeit – besonders ausgepraegt in Haut und Herzmuskel. Kommunikation erfolgt dagegen durch Gap Junctions." },
      { id: "hi_zv_h3", type: "true_false", statement: "Gap Junctions koennen kleine Molekuele passieren lassen.", answer: true, explanation: "Gap Junctions bestehen aus Connexon-Kanaelen (je 6 Connexin-Proteine), die benachbarte Zellen direkt verbinden. Molekuele bis ca. 1 kDa koennen passieren: Ionen, cAMP, IP3, Glukose. Im Herzmuskel ermoeglicht dies die direkte elektrische Kopplung, die ein koordiniertes Zusammenziehen sicherstellt." }
    ],
    bossQuestions: [{ id: "hi_zv_b1", type: "true_false", statement: "Die funktionelle Trennung von Haftung, Abdichtung und Kommunikation ist ein Kernpunkt der Histologie.", answer: true }],
    combatQuestions: [
      { id: "hi_zv_mc1", type: "mc", question: "Welche Zellverbindung dient dem direkten Signal- und Stoffaustausch zwischen benachbarten Zellen?", options: [
        { text: "Gap Junction", correct: true },
        { text: "Tight Junction", correct: false },
        { text: "Desmosom", correct: false },
        { text: "Adhaerens-Junction", correct: false }
      ]},
      { id: "hi_zv_mc2", type: "mc", question: "Welche Funktion haben Tight Junctions?", options: [
        { text: "Sie dichten den parazellullaeren Raum zwischen Epithelzellen ab", correct: true },
        { text: "Sie ermoeglichen den Ionenaustausch zwischen Zellen", correct: false },
        { text: "Sie stellen mechanische Haftverbindungen ohne Abdichtfunktion dar", correct: false },
        { text: "Sie verbinden Zellen mit der extrazellullaeren Matrix", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "epithelgewebe",
    title: "Epithelgewebe",
    phase1: {
      soil: { statement: "Epithelien bedecken aeussere und innere Koerperoberflaechen.", answer: true, solution: "Epithelgewebe bildet den enger Zellverband mit minimalen Interzellularraeumen und besitzt keine eigenen Blutgefaesse – die Ernaehrung erfolgt durch Diffusion aus dem darunterliegenden Bindegewebe. Es bedeckt sowohl die Aussenoberflaeche (Haut) als auch saemtliche inneren Hohlraeume und Organe." },
      seed: { statement: "Epithelgewebe ist ausschliesslich Druesengewebe.", answer: false, solution: "Epithelgewebe umfasst drei Grundtypen: Deckepithel (Schutz und Barriere, z.B. Haut), Druesenepithel (Sekretbildung, z.B. Speicheldruesen) und Sinnesepithel (Reizaufnahme, z.B. Riechepithel). Jeder Typ ist strukturell auf seine Funktion ausgerichtet." },
      water: { statement: "Epithelgewebe dient u. a. Schutz, Stoffaustausch und Reizaufnahme.", answer: true, solution: "Die Funktionsvielfalt des Epithelgewebes erklaert sich aus seinen Untertypen: Plattenepithel schuetzt mechanisch (Haut), Saelenepithel mit Mikrovilli resorbiert Naehrstoffe (Darm), Flimmerepithel transportiert Sekrete (Atemwege), Sinnesepithel nimmt Reize wahr (Riechschleimhaut)." }
    },
    harvestQuestions: [
      { id: "hi_ep_h1", type: "true_false", statement: "Epithelzellen bilden meist enge Zellverbaende mit schmalen Interzellularraeumen.", answer: true, explanation: "Epithelzellen sind durch verschiedene Zellverbindungen (Tight Junctions, Adhaerens-Junctions, Desmosomen) fest miteinander verbunden. Dieser enge Zellverband ist die Grundlage der Barrierefunktion: Er verhindert unkontrollierten Durchtritt von Stoffen zwischen den Zellen (parazellulaerer Weg)." },
      { id: "hi_ep_h2", type: "true_false", statement: "Epithelien sind generell stark gefaesshaltig.", answer: false, explanation: "Epithelien sind grundsaetzlich avaskularaer – sie enthalten keine eigenen Blutgefaesse. Die Versorgung mit Sauerstoff und Naehrstoffen erfolgt durch Diffusion aus dem darunterliegenden vaskularisierten Bindegewebe durch die Basalmembran. Dies limitiert auch die maximale Epitheldicke." },
      { id: "hi_ep_h3", type: "true_false", statement: "Epithelzellen besitzen einen apikalen und einen basalen Pol.", answer: true, explanation: "Epithelzellen sind polar aufgebaut: Der apikale Pol (zur freien Oberflaeche hin) traegt oft Spezialisierungen wie Mikrovilli (Resorption), Kinozilien (Schleim­transport) oder Stereovilli. Der basale Pol liegt der Basalmembran an und stellt die Verbindung zum darunterliegenden Bindegewebe her." }
    ],
    bossQuestions: [{ id: "hi_ep_b1", type: "true_false", statement: "Epithelgewebe ist fuer Grenzflaechenfunktionen des Koerpers zentral.", answer: true }],
    combatQuestions: [
      { id: "hi_ep_mc1", type: "mc", question: "Was ist ein typisches Merkmal von Epithelgewebe?", options: [
        { text: "Enger Zellverband mit schmalen Interzellularraeumen und keine eigenen Blutgefaesse", correct: true },
        { text: "Starke Vaskularisierung durch eigene Kapillaren", correct: false },
        { text: "Ueberwiegend lockere Anordnung mit viel Interzellularsubstanz", correct: false },
        { text: "Fehlende Regenerationsfaehigkeit", correct: false }
      ]},
      { id: "hi_ep_mc2", type: "mc", question: "Welche der folgenden Aufgaben hat Epithelgewebe NICHT?", options: [
        { text: "Kraftuebertragung an Gelenken", correct: true },
        { text: "Schutz der Koerperoberflaechen", correct: false },
        { text: "Stoffaustausch und Resorption", correct: false },
        { text: "Reizaufnahme (Sinnesepithel)", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "oberflaechenepithel",
    title: "Oberflaechen-/Deckepithel",
    phase1: {
      soil: { statement: "Deckepithel kleidet Koerperoberflaechen und viele Hohlraeume aus.", answer: true, solution: "Deckepithel (Oberflaechenepithel) dient dem Schutz und der Abgrenzung: Es bedeckt die Koerperoberflaeche (Haut), kleidet innere Hohlorgane aus (Darm, Harnblase) und ueberzieht Blut- und Lymphgefaesse als Endothel. Damit ist es das am weitesten verbreitete Epithelgewebe." },
      seed: { statement: "Deckepithel ist fuer Resorption und Sekretion grundsaetzlich ungeeignet.", answer: false, solution: "Deckepithel ist je nach Typ hochspezialisiert: Einschichtiges Saelenepithel mit Mikrovilli resorbiert Naehrstoffe im Darm, mehrschichtiges Plattenepithel schuetzt mechanisch (Haut), Flimmerepithel der Atemwege transportiert Schleim aktiv nach aussen." },
      water: { statement: "Die Unterteilung in einschichtig, mehrreihig und mehrschichtig ist ein Grundschema.", answer: true, solution: "Einschichtige Epithelien (alle Zellen beruehren die Basalmembran) kommen z.B. als Endothel in Gefaessen vor, mehrreihige (alle an Basalmembran, aber verschieden hoch) als Flimmerepithel in den Atemwegen, mehrschichtige (nur die unterste Lage an der Basalmembran) als Schutzepithel der Haut und Schleimhaeute." }
    },
    harvestQuestions: [
      { id: "hi_od_h1", type: "true_false", statement: "Einschichtige Epithelien bestehen aus einer Zelllage.", answer: true, explanation: "Beim einschichtigen Epithel beruehren alle Zellen die Basalmembran und haben gleichzeitig Kontakt zur freien Oberflaeche. Diese duenne Schicht optimiert den Stoffaustausch (z.B. als Endothel in Blutkapillaren) oder die Resorption (z.B. einschichtiges Saelenepithel im Duenndarm mit Mikrovilli)." },
      { id: "hi_od_h2", type: "true_false", statement: "Mehrschichtige Epithelien bestehen immer aus nur einer Zelllage.", answer: false, explanation: "Mehrschichtige Epithelien bestehen aus mehreren Zelllagen uebereinander, wobei nur die unterste Lage (Stratum basale) die Basalmembran beruehrt. Diese Mehrschichtigkeit bietet mechanischen Schutz, z.B. mehrschichtiges verhorntes Plattenepithel der Haut oder unverhorntes an der Mundschleimhaut." }
    ],
    bossQuestions: [{ id: "hi_od_b1", type: "true_false", statement: "Die korrekte Schichtungszuordnung ist eine histologische Basisleistung.", answer: true }],
    combatQuestions: [
      { id: "hi_od_mc1", type: "mc", question: "Was kennzeichnet ein einschichtiges Epithel?", options: [
        { text: "Alle Zellen beruehren die Basalmembran und haben Kontakt zur freien Oberflaeche", correct: true },
        { text: "Es besteht aus mindestens drei Zelllagen uebereinander", correct: false },
        { text: "Nur die oberste Zellschicht hat Kontakt zur Basalmembran", correct: false },
        { text: "Es kommt ausschliesslich in druesigen Organen vor", correct: false }
      ]},
      { id: "hi_od_mc2", type: "mc", question: "Welchem Epitheltyp entspricht die Auskleidung der Blutgefaesse (Endothel)?", options: [
        { text: "Einfachem Plattenepithel", correct: true },
        { text: "Mehrschichtigem verhornten Plattenepithel", correct: false },
        { text: "Mehrreihigem Flimmerepithel", correct: false },
        { text: "Uebergangsepithel (Urothel)", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "druesenepithel",
    title: "Druesenepithel",
    phase1: {
      soil: { statement: "Druesenepithel ist auf Sekretbildung spezialisiert.", answer: true, solution: "Druesenepithel-Zellen sind darauf ausgerichtet, aktiv Sekrete herzustellen und abzugeben. Je nach Druese sind das Verdauungsenzyme (Bauchspeicheldruese), Hormone (Schilddruese) oder Schleim (Schleimhautdruesen). Die Sekretionsleistung unterscheidet Druesenepithel klar von schutzendem Deckepithel." },
      seed: { statement: "Exokrine Druesen werden nicht nach Sekret und Abgabeart klassifiziert.", answer: false, solution: "Exokrine Druesen werden systematisch eingeteilt: nach Art des Sekrets (seroese oder muekoese Zellen) und nach der Abgabemethode (merokrin: Vesikelexozytose; apokrin: Abschnuerung des Zellapex; holokrin: Zerfall der gesamten Zelle). Diese Einteilung erklaert die unterschiedlichen Sekretionsleistungen im Koerper." },
      water: { statement: "Druesenepithel besitzt eine hohe Regenerationsfaehigkeit und kann sich bei Bedarf erneuern.", answer: true, solution: "Druesenepithel besitzt eine hohe Regenerationsfaehigkeit, da Druesen bei Verletzung oder Erkrankung rasch wiederhergestellt werden muessen. Teilungsaktive Stammzellen und Basalzellen im Druesenepithel ermöglichen diese kontinuierliche Erneuerung." }
    },
    harvestQuestions: [
      { id: "hi_dr_h1", type: "true_false", statement: "Exokrine Druesen geben ihr Sekret ueber Ausfuehrungssysteme ab.", answer: true, explanation: "Exokrine Druesen leiten ihr Sekret ueber Ausfuehrungsgaenge auf Koerperoberflaechen oder in Hohlorgane – im Gegensatz zu endokrinen Druesen, die Hormone direkt ins Blut abgeben. Beispiele sind Speicheldruesen, Bauchspeicheldruese (exokriner Anteil), Schweis­sdruesen und Talgdruesen." },
      { id: "hi_dr_h2", type: "true_false", statement: "Sekretbildung ist fuer Druesenepithel funktionell unerheblich.", answer: false, explanation: "Sekretbildung ist die Kernfunktion des Druesenepithels. Druesen­zellen sind hochspezialisiert auf Synthese und gezielte Abgabe von Sekreten: Enzyme fuer die Verdauung, Hormone fuer die Regulierung, Schleim fuer Schutz und Befeuchtung. Morphologie und Stoffwechsel der Druesenzellen sind vollstaendig auf diese Aufgabe ausgerichtet." },
      { id: "hi_dr_h3", type: "true_false", statement: "Die Art der Sekretabgabe ist ein relevantes Differenzierungsmerkmal.", answer: true, explanation: "Exokrine Druesen werden nach dem Sekretionsmodus eingeteilt: Merokrine Sekretion (Vesikelexozytose, kein Zellverlust, z.B. Bauchspeicheldruese), apokrine Sekretion (Abschnuerung des apikalen Zellpols, z.B. Milchdruese) und holokrine Sekretion (gesamte Zelle wird Sekret, z.B. Talgdruese)." }
    ],
    bossQuestions: [{ id: "hi_dr_b1", type: "true_false", statement: "Funktionelle Druesenklassifikation ist fuer histologisches Verstaendnis essenziell.", answer: true }],
    combatQuestions: [
      { id: "hi_dr_mc1", type: "mc", question: "Was unterscheidet exokrine von endokrinen Druesen?", options: [
        { text: "Exokrine Druesen geben ihr Sekret ueber Ausfuehrungsganege nach aussen ab", correct: true },
        { text: "Exokrine Druesen geben Sekret direkt ins Blut ab", correct: false },
        { text: "Endokrine Druesen haben immer Ausfuehrungsganege", correct: false },
        { text: "Exokrine Druesen produzieren ausschliesslich Hormone", correct: false }
      ]},
      { id: "hi_dr_mc2", type: "mc", question: "Welche Sekretionsart bezeichnet das vollstaendige Abtrennen des apikalen Zellpols mit Sekretinhalt?", options: [
        { text: "Holokrine Sekretion", correct: true },
        { text: "Apokrine Sekretion", correct: false },
        { text: "Merokrine (ekkrine) Sekretion", correct: false },
        { text: "Endokrine Sekretion", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "sinnesepithel_myoepithel",
    title: "Sinnesepithel und Myoepithel",
    phase1: {
      soil: { statement: "Sinnesepithel dient der Reizaufnahme.", answer: true, solution: "Sinnesepithel enthalt spezialisierte Sinneszellen, die Reize aus der Umwelt in elektrische Signale umwandeln, die dann an Nervenzellen weitergeleitet werden. Beispiele: Riechepithel in der Nasenhoehlel, Haarzellen im Innenohr, Photorezeptoren in der Retina." },
      seed: { statement: "Myoepithelzellen haben keine funktionelle Naehe zur glatten Muskulatur.", answer: false, solution: "Myoepithelzellen werden mit glatten Muskel-Eigenschaften verglichen." },
      water: { statement: "Myoepithelzellen koennen die Sekretabgabe durch kontraktile Eigenschaften unterstuetzen.", answer: true, solution: "Myoepithelzellen umschliessen Druesenazini und koennen sich durch ihre Aktinfilamente aehnlich wie glatte Muskelzellen zusammenziehen. Durch diese Kontraktion wird das Druesensekret aktiv ausgepresst – z.B. in Schweiss- und Milchdruesen bei der Laktation." }
    },
    harvestQuestions: [
      { id: "hi_sm_h1", type: "true_false", statement: "Sinneszellen in Epithelverbaenden sind an Reizweiterleitung beteiligt.", answer: true, explanation: "Sinneszellen des Sinnesepithels (z.B. Haarzellen des Innenohrs, Riechzellen der Nasenschleimhaut, Photorezeptoren der Netzhaut) wandeln physikalische oder chemische Reize in elektrische Signale um, die ueber afferente Nervenfasern an das Gehirn weitergeleitet werden." },
      { id: "hi_sm_h2", type: "true_false", statement: "Myoepithelzellen sind rein passive Stuetzzellen ohne funktionelle Aktivitaet.", answer: false, explanation: "Myoepithelzellen besitzen kontraktile Aktinfilamente und koennen sich aehnlich wie glatte Muskelzellen zusammenziehen. Durch ihre Kontraktion pressen sie Druesenazini aus und unterstuetzen so aktiv die Sekretabgabe – z.B. beim Milchschiessen in der Brustdruese oder in Schweissdruesen." },
      { id: "hi_sm_h3", type: "true_false", statement: "Sinnes- und Myoepithel sind spezialisierte Epithelformen.", answer: true, explanation: "Beide repraesentieren Sonderformen des Epithels mit aussergewoehnlichen Eigenschaften: Sinnesepithel ist auf Reizwahrnehmung spezialisiert (Umwandlung physikalischer/chemischer in elektrische Signale), Myoepithel verbindet epitheliale Herkunft mit kontraktilen Eigenschaften und unterstuetzt Druesenfunktionen." }
    ],
    bossQuestions: [{ id: "hi_sm_b1", type: "true_false", statement: "Die funktionelle Spezialisierung des Epithels geht ueber reine Oberflaechenbedeckung hinaus.", answer: true }],
    combatQuestions: [
      { id: "hi_sm_mc1", type: "mc", question: "Welche Funktion haben Myoepithelzellen?", options: [
        { text: "Sie unterstuetzen durch Kontraktion die Sekretabgabe in Druesen", correct: true },
        { text: "Sie nehmen Reize aus der Umwelt wahr", correct: false },
        { text: "Sie bilden die Basalmembran des Epithels", correct: false },
        { text: "Sie sind ausschliesslich passive Stuetzzellen ohne Aktivitaet", correct: false }
      ]},
      { id: "hi_sm_mc2", type: "mc", question: "Wofuer sind Sinneszellen in Epithelverbaenden zustaendig?", options: [
        { text: "Fuer Reizwahrnehmung und -weiterleitung an das Nervensystem", correct: true },
        { text: "Fuer die Sekretion von Enzymen", correct: false },
        { text: "Fuer die mechanische Stabilisierung des Verbandes", correct: false },
        { text: "Ausschliesslich fuer Zellteilung und Regeneration", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "bindegewebe",
    title: "Bindegewebe",
    phase1: {
      soil: { statement: "Bindegewebe ist das haeufigste Gewebe und zeichnet sich durch viel Interzellularsubstanz aus.", answer: true, solution: "Im Gegensatz zu Epithel (enger Zellverband, wenig Matrix) besteht Bindegewebe aus relativ wenigen Zellen in viel Interzellularsubstanz (Matrix). Diese Matrix aus Kollagenfasern, elastischen Fasern und Grundsubstanz bestimmt die mechanischen Eigenschaften des jeweiligen Bindegewebetyps." },
      seed: { statement: "Bindegewebe besteht ausschliesslich aus Zellen und praktisch keiner Grundsubstanz.", answer: false, solution: "Bindegewebe zeichnet sich durch viel extrazellulaere Matrix (Grundsubstanz und Fasern) und vergleichsweise wenige Zellen aus – das Gegenteil von Epithelgewebe, wo Zellen dicht gepackt sind. Die Matrix-Dominanz erklaert die mechanischen Eigenschaften wie Zugfestigkeit und Formgebung." },
      water: { statement: "Es wird zwischen ortsstaendigen und freien Bindegewebszellen unterschieden.", answer: true, solution: "Ortsstaendige Bindegewebszellen wie Fibroblasten leben dauerhaft in der Matrix und produzieren z.B. Kollagen. Freie Zellen wie Mastzellen, Makrophagen und Granulozyten wandern ein und ausueben hauptsaechlich Immunfunktionen, bevor sie weiterwandern oder absterben." }
    },
    harvestQuestions: [
      { id: "hi_bg_h1", type: "true_false", statement: "Interzellularsubstanz ist ein Schluesselmerkmal des Bindegewebes.", answer: true, explanation: "Die extrazellulaere Matrix (Interzellularsubstanz) des Bindegewebes besteht aus Faserproteinen (Kollagen, Elastin, retikulaere Fasern) und Grundsubstanz (Proteoglykane, Glykosaminoglykane). Ihr Zusammensetzungsverhaeltnis bestimmt die mechanischen Eigenschaften: viel Kollagen = Zugfestigkeit, viel Elastin = Rueckfederung." },
      { id: "hi_bg_h2", type: "true_false", statement: "Bindegewebe liegt nur an Koerperoberflaechen und nie im Inneren.", answer: false, explanation: "Bindegewebe ist das weitest verbreitete Gewebe des Koerpers und kommt ueberall vor: Es fuellt den Raum zwischen Organen, bildet Kapseln um Organe, bildet Fascien und Sehnen, und bildet als spezialisiertes Bindegewebe Knochen, Knorpel und Blut. Oberflaechenbedeckung ist dagegen Aufgabe des Epithels." },
      { id: "hi_bg_h3", type: "true_false", statement: "Formen wie lockeres und straffes Bindegewebe werden differenziert betrachtet.", answer: true, explanation: "Lockeres Bindegewebe (viel Grundsubstanz, wenige ungeordnete Fasern) fuellt Raeume zwischen Organen und ermoeglicht Verschieblichkeit. Straffes Bindegewebe (viele dicht geordnete Kollagenfasern) bildet zugfeste Strukturen wie Sehnen und Baender und widersteht mechanischer Belastung in einer Hauptzugrichtung." }
    ],
    bossQuestions: [{ id: "hi_bg_b1", type: "true_false", statement: "Die Matrix-Zell-Relation ist fuer das Verstaendnis von Bindegewebe grundlegend.", answer: true }],
    combatQuestions: [
      { id: "hi_bg_mc1", type: "mc", question: "Was ist ein charakteristisches Merkmal von Bindegewebe?", options: [
        { text: "Relativ wenige Zellen in viel Interzellularsubstanz (Matrix)", correct: true },
        { text: "Dichter Zellverband ohne Interzellularsubstanz wie im Epithel", correct: false },
        { text: "Fehlende Blutversorgung und Avaskulaaritaet", correct: false },
        { text: "Ausschliessliche Lage an Koerperoberflaechen", correct: false }
      ]},
      { id: "hi_bg_mc2", type: "mc", question: "Welche der folgenden Zellen ist eine ortstaendige Bindegewebszelle?", options: [
        { text: "Fibroblast", correct: true },
        { text: "Neutrophiler Granulozyt", correct: false },
        { text: "Erythrozyt", correct: false },
        { text: "Thrombozyt", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "knorpelgewebe",
    title: "Knorpelgewebe",
    phase1: {
      soil: { statement: "In 1032 werden hyaliner, elastischer Knorpel und Faserknorpel unterschieden.", answer: true, solution: "Die drei Knorpeltypen unterscheiden sich in ihrer Zusammensetzung und ihren Eigenschaften: Hyaliner Knorpel (blaeulich-weiss, glaettste Gelenkflaechen), elastischer Knorpel (gelblich, biegsam durch Elastinfasern z.B. Ohrmuschel) und Faserknorpel (groesste Zugfestigkeit durch dicke Kollagenfasern z.B. Bandscheiben)." },
      seed: { statement: "Knorpelgewebe wird histologisch nicht weiter unterteilt.", answer: false, solution: "Knorpelgewebe wird in drei klar unterscheidbare Typen eingeteilt, die sich histologisch in Fasergehalt, Matrixzusammensetzung und Farbgebung unterscheiden. Diese Unterschiede erklaeren die verschiedenen Lokalisationen und mechanischen Eigenschaften der Knorpeltypen im Koerper." },
      water: { statement: "Die Knorpeltypen unterscheiden sich funktionell und strukturell.", answer: true, solution: "Hyaliner Knorpel mit seiner glatten Oberflaeche ist ideal fuer druckbelastete Gelenkflaechen, elastischer Knorpel fuer Strukturen die biegsam sein muessen (Ohrmuschel, Epiglottis), und Faserknorpel fuer hohe Zugbelastung (Bandscheiben, Menisken). Form folgt Funktion." }
    },
    harvestQuestions: [
      { id: "hi_kg_h1", type: "true_false", statement: "Hyaliner Knorpel ist ein eigener histologischer Knorpeltyp.", answer: true, explanation: "Hyaliner Knorpel ist der haeu­figste Knorpeltyp: blaeulich-weiss, glasartig erscheinend (griech. hyalos = Glas), mit reichlich Kollagen Typ II in einer gelartigen Grundsubstanz. Er kleidet Gelenkflaechen aus, bildet die Rippenknorpel und ist Ausgangsmaterial der enchondralen Ossifikation." },
      { id: "hi_kg_h2", type: "true_false", statement: "Elastischer Knorpel und Faserknorpel sind identische Begriffe.", answer: false, explanation: "Elastischer Knorpel enthaelt neben Kollagen Typ II viele elastische Fasern, ist gelblich-transkludent und biegsam (z.B. Ohrmuschel, Epiglottis). Faserknorpel dagegen enthaelt dicke Kollagen-Typ-I-Buendel, ist mechanisch sehr zugfest und befindet sich an Stellen hoher Druckbelastung (Bandscheiben, Menisken, Symphyse)." },
      { id: "hi_kg_h3", type: "true_false", statement: "Die Knorpeltypisierung ist fuer Funktionsdeutung relevant.", answer: true, explanation: "Die Knorpeltypen haben je nach Zusammensetzung unterschiedliche biomechanische Eigenschaften: Hyaliner Knorpel gleitet gut und federt Druck ab (Gelenkflaechen), elastischer Knorpel federt und biegt sich ohne zu brechen (Ohrmuschel), Faserknorpel widersteht Zugkraeften und Druck (Bandscheiben)." }
    ],
    bossQuestions: [{ id: "hi_kg_b1", type: "true_false", statement: "Die sichere Unterscheidung der Knorpeltypen gehoert zum Histologie-Grundwissen.", answer: true }],
    combatQuestions: [
      { id: "hi_kg_mc1", type: "mc", question: "Welcher Knorpeltyp kleidet die meisten Gelenkflaechen aus?", options: [
        { text: "Hyaliner Knorpel", correct: true },
        { text: "Faserknorpel", correct: false },
        { text: "Elastischer Knorpel", correct: false },
        { text: "Fibroser Knorpel", correct: false }
      ]},
      { id: "hi_kg_mc2", type: "mc", question: "Wo findet man vor allem elastischen Knorpel?", options: [
        { text: "In der Ohrmuschel und im Kehldeckel (Epiglottis)", correct: true },
        { text: "In den Bandscheiben der Wirbelsaeule", correct: false },
        { text: "An den Gelenkflaechen grosser Gelenke", correct: false },
        { text: "Im Rippen-Brustbein-Uebergang", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "knochengewebe",
    title: "Knochengewebe",
    phase1: {
      soil: { statement: "Knochengewebe wird histologisch als spezialisiertes Binde- und Stuetzgewebe eingeordnet.", answer: true, solution: "Knochengewebe ist ein spezialisiertes hartes Bindegewebe, das sich durch seine mineralisierte Matrix aus Kollagenfasern und Hydroxylapatit von anderen Bindegeweben unterscheidet. Trotz seiner Haerte ist es lebendiges Gewebe mit aktiven Zellen: Osteoblasten (Aufbau), Osteozyten (Erhalt) und Osteoklasten (Abbau)." },
      seed: { statement: "Knochenzellen spielen fuer Aufbau und Erhalt des Knochengewebes keine Rolle.", answer: false, solution: "Knochenzellen sind der Kern des Knochenlebens: Osteoblasten produzieren neue Knochenmatrix (Kollagen + Mineralisation), Osteozyten erhalten als eingemauerte Zellen das Gewebe durch Naehrstoffaustausch ueber Kanaelchen, Osteoklasten bauen auf Signal hin gealterte Matrix gezielt ab." },
      water: { statement: "Die Osteogenese (Knochenentwicklung) wird als eigener Lernpunkt dargestellt.", answer: true, solution: "Osteogenese kann direkt aus Bindegewebe verlaufen (desmale Ossifikation, z.B. Schaedelknochen) oder ueber eine Knorpelvorlaeuferstufe (enchondrale Ossifikation, z.B. lange Roehrenknochen). Beide Wege enden mit der Mineralisation der Knochenmatrix durch Osteoblasten." }
    },
    harvestQuestions: [
      { id: "hi_kn_h1", type: "true_false", statement: "Knochengewebe gehoert zu den Stuetzgeweben.", answer: true, explanation: "Knochengewebe ist ein hochspezialisiertes mineralisiertes Bindegewebe und gehoert zusammen mit Knorpelgewebe zu den Stuetzgeweben. Seine Haerte verdankt es der Einlagerung von Hydroxylapatit (Calciumphosphat) in ein Geruest aus Kollagen Typ I, wodurch es sowohl druck- als auch zugfest wird." },
      { id: "hi_kn_h2", type: "true_false", statement: "Knochenentwicklung ist kein histologisches Thema.", answer: false, explanation: "Knochenentwicklung (Osteogenese) ist ein zentrales histologisches Thema: Desmale Ossifikation (direkte Knochenbildung aus Bindegewebe, z.B. Schaedelknochen) und enchondrale Ossifikation (ueber eine Knorpelvorlaeuferstufe, z.B. lange Roehrenknochen) beschreiben beide wie und wo Osteoblasten Knochen bilden." },
      { id: "hi_kn_h3", type: "true_false", statement: "Knochenzellen sind ein eigener Unterpunkt in 1032.", answer: true, explanation: "Knochengewebe wird durch drei Zelltypen aufgebaut und erhalten: Osteoblasten (Aufbau durch Kollagen­synthese und Mineralisation), Osteozyten (eingemauerte ehemalige Osteoblasten, erhalten das Gewebe durch Naehrstoffaustausch), und Osteoklasten (mehrkernige Riesenzellen, bauen Knochen durch Salzsaeuresekretion ab)." }
    ],
    bossQuestions: [{ id: "hi_kn_b1", type: "true_false", statement: "Knochenhistologie verbindet Zelltypen, Matrix und Entwicklungsprozesse.", answer: true }],
    combatQuestions: [
      { id: "hi_kn_mc1", type: "mc", question: "Welche Zellen bauen aktiv Knochensubstanz ab?", options: [
        { text: "Osteoklasten", correct: true },
        { text: "Osteoblasten", correct: false },
        { text: "Osteozyten", correct: false },
        { text: "Fibroblasten", correct: false }
      ]},
      { id: "hi_kn_mc2", type: "mc", question: "Was sind die Hauptbestandteile der Knochenmatrix?", options: [
        { text: "Hydroxylapatit (Calciumphosphat) und Kollagenfasern", correct: true },
        { text: "Elastin und Kollagen Typ III", correct: false },
        { text: "Hyaluronsaeure und Proteoglykane", correct: false },
        { text: "Glykogen und Lipide", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "blut",
    title: "Blut als Gewebe",
    phase1: {
      soil: { statement: "Blut wird in der Histologie als spezialisiertes Bindegewebe klassifiziert.", answer: true, solution: "Blut gilt histologisch als spezialisiertes Bindegewebe, da auch hier Zellen (Erythrozyten, Leukozyten, Thrombozyten) in einer fluessigen Grundsubstanz (Plasma als Interzellularsubstanz) vorkommen. Diese Einordnung ermoeglicht den systematischen Vergleich mit anderen Binde- und Stuetzgeweben." },
      seed: { statement: "Blut hat keinen Bezug zum Binde- und Stuetzgewebe.", answer: false, solution: "Blut wird als fluessiges Bindegewebe eingeordnet, da seine Bestandteile (Zellen + Plasma) dem Prinzip Zellen in Matrix entsprechen – nur eben in fluessiger statt fester Form. Diese Einordnung verbindet Blutlehre mit der Gewebehierarchie." },
      water: { statement: "Die gewebliche Betrachtung von Blut dient dem Verstaendnis von Zell- und Matrixanteilen.", answer: true, solution: "Wenn man Blut als Gewebe betrachtet, wird der Vergleich mit anderen Bindegeweben moeglich: zelliger Anteil (Erythrozyten, Leukozyten, Thrombozyten) vs. fluessige Matrix (Plasma). So wird verstaendlich, warum z.B. Leukozytenveraenderungen wie bei Leukaemie als Gewebeerkrankungen eingeordnet werden." }
    },
    harvestQuestions: [
      { id: "hi_bl_h1", type: "true_false", statement: "Blut wird in der Histologie als spezialisiertes Gewebe betrachtet.", answer: true, explanation: "Blut wird als fluessiges Bindegewebe klassifiziert: Es besteht aus zellularen Elementen (Erythrozyten, Leukozyten, Thrombozyten) in einer fluessigen Interzellularsubstanz (Blutplasma). Diese Einordnung ermoeglicht den systematischen Vergleich mit anderen Bindegeweben und verbindet Haematologie mit der Gewebelehre." },
      { id: "hi_bl_h2", type: "true_false", statement: "Die Gewebelehre ignoriert Blut vollstaendig.", answer: false, explanation: "Blut wird explizit in der Histologie behandelt, da es die Kriterien eines Bindegewebes erfuellt: Zellen (Erythrozyten, Leukozyten, Thrombozyten) in einer Matrix (Plasma). Aus dieser histologischen Einordnung laesst sich verstehen, warum Blutkrankheiten als Gewebserkrankungen konzeptionell eingeordnet werden." }
    ],
    bossQuestions: [{ id: "hi_bl_b1", type: "true_false", statement: "Die Einordnung von Blut als Gewebe erweitert das Verstaendnis klassischer Histologie.", answer: true }],
    combatQuestions: [
      { id: "hi_bl_mc1", type: "mc", question: "Welchen Anteil am Blutvolumen nehmen die Erythrozyten ein (Haematokrit)?", options: [
        { text: "Ca. 40–45 %", correct: true },
        { text: "Ca. 10–15 %", correct: false },
        { text: "Ca. 60–70 %", correct: false },
        { text: "Ca. 25–30 %", correct: false }
      ]},
      { id: "hi_bl_mc2", type: "mc", question: "Welche Aufgabe haben Thrombozyten?", options: [
        { text: "Blutgerinnung und Wundverschluss", correct: true },
        { text: "Sauerstofftransport im Blut", correct: false },
        { text: "Abwehr von Bakterien durch Phagozytose", correct: false },
        { text: "Antikörperproduktion", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "muskelgewebe",
    title: "Muskelgewebe",
    phase1: {
      soil: { statement: "In 1032 werden quergestreifte Skelettmuskulatur, Herzmuskulatur und glatte Muskulatur unterschieden.", answer: true, solution: "Die drei Muskeltypen werden histologisch klar unterschieden: Skelettmuskulatur mit randstaendigen Kernen und deutlicher Querstreifung, Herzmuskulatur mit zentralem Kern und Glanzstreifen zwischen Zellen, glatte Muskulatur ohne Streifung und mit zentralem spindelfoermigem Kern." },
      seed: { statement: "Muskelgewebe wird in der Histologie nicht nach Typen untergliedert.", answer: false, solution: "Die histologische Unterscheidung der Muskeltypen ist fundamental: Querstreifung sichtbar oder nicht, Kernlage zentral oder peripher, Glanzstreifen vorhanden oder nicht. Aus diesen Merkmalen laesst sich Funktion und Innervationstyp ableiten." },
      water: { statement: "Histologische Merkmale der Muskeltypen stehen in Zusammenhang mit ihren Funktionen.", answer: true, solution: "Quergestreifte Skelettmuskulatur zeigt histologisch Streifen durch regelmassige Sarkomeranordnung und ist willkuerlich steuerbar; glatte Muskulatur hat keine Streifen und kontrahiert langsam und ausdauernd. Herzmuskulatur kombiniert Querstreifung (wie Skelettmuskel) mit unwillkuerlicher Steuerung (wie glatte Muskulatur)." }
    },
    harvestQuestions: [
      { id: "hi_mg_h1", type: "true_false", statement: "Herzmuskulatur wird als eigener Muskeltyp betrachtet.", answer: true, explanation: "Herzmuskulatur ist histologisch quergestreift wie Skelettmuskel (durch Sarkomerstruktur), aber unwillkuerlich gesteuert wie glatte Muskulatur. Zusaetzlich verbinden Glanzstreifen (Disci intercalares) mit Gap Junctions benachbarte Herzmuskelzellen, sodass elektrische Erregung direkt weitergeleitet werden kann." },
      { id: "hi_mg_h2", type: "true_false", statement: "Glatte Muskulatur und quergestreifte Skelettmuskulatur sind histologisch identisch.", answer: false, explanation: "Skelettmuskulatur zeigt deutliche Querstreifung durch regelmaessige Sarkomeranordnung, hat randstaendige Kerne und ist willkuerlich steuerbar. Glatte Muskulatur hat keine sichtbare Streifung, einen zentral gelegenen ovalen Kern und kontrahiert langsam und ausdauernd unter autonomer Kontrolle." }
    ],
    bossQuestions: [{ id: "hi_mg_b1", type: "true_false", statement: "Muskelhistologie ist ohne sichere Typunterscheidung nicht belastbar.", answer: true }],
    combatQuestions: [
      { id: "hi_mg_mc1", type: "mc", question: "Was kennzeichnet glatte Muskulatur histologisch und funktionell?", options: [
        { text: "Keine Querstreifung, unwillkuerliche Steuerung", correct: true },
        { text: "Querstreifung, willkuerliche Steuerung", correct: false },
        { text: "Querstreifung, unwillkuerliche Steuerung", correct: false },
        { text: "Keine Querstreifung, willkuerliche Steuerung", correct: false }
      ]},
      { id: "hi_mg_mc2", type: "mc", question: "Welches histologische Merkmal ist typisch fuer die Herzmuskulatur?", options: [
        { text: "Glanzstreifen (Disci intercalares) zwischen den Herzmuskelzellen", correct: true },
        { text: "Mehrere randstaendige Zellkerne pro Faser wie in Skelettmuskeln", correct: false },
        { text: "Fehlen von Myofibrillen", correct: false },
        { text: "Vollstaendige willkuerliche Steuerbarkeit", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "nervengewebe",
    title: "Nervengewebe",
    phase1: {
      soil: { statement: "Nervengewebe umfasst Nervenzellen (Neuronen), Nervenfasern und Gliazellen.", answer: true, solution: "Nervengewebe besteht aus zwei Hauptzelltypen: Nervenzellen (Neuronen) mit ihren Fortsaetzen (Axone, Dendriten) fuer Erregungsleitung und Gliazellen fuer Stuetze, Ernaehrung und Isolierung der Neuronen. Nur das Zusammenspiel beider Zelltypen ermoeglicht Informationsverarbeitung und -weiterleitung." },
      seed: { statement: "Erregungsbildung und Erregungsleitung sind fuer Nervengewebe kein Thema.", answer: false, solution: "Erregungsbildung (Generierung von Aktionspotentialen) und Erregungsleitung (Weitergabe entlang Axonen) sind die Kernfunktionen des Nervengewebes. Ohne diese Prozesse waere weder bewusste Motorik, noch Sensorik, noch autonome Organsteuerung moeglich." },
      water: { statement: "Der Aufbau der Nervenzelle ist Grundlage fuer das Verstaendnis ihrer Funktion.", answer: true, solution: "Die Nervenzelle besteht aus Soma (Zellkoerper mit Kern), Dendriten (Signalempfaenger) und Axon (Signalleiter). Diese Struktur erklaert direkt die Funktion: Dendriten empfangen Signale, das Axon leitet Aktionspotentiale zur naechsten Synapse weiter." }
    },
    harvestQuestions: [
      { id: "hi_ng_h1", type: "true_false", statement: "Gliazellen und Nervenfasern sind Teil der histologischen Betrachtung des Nervengewebes.", answer: true, explanation: "Nervengewebe besteht aus zwei Hauptkomponenten: Neuronen (Nervenzellen mit Soma, Dendriten und Axon) und Gliazellen (Astrozyten, Oligodendrozyten, Mikroglia, Schwann-Zellen). Gliazellen stuetzen, isolieren (Myelinisierung) und versorgen die Neuronen und sind mengenmassig weit haeufiger als Neuronen." },
      { id: "hi_ng_h2", type: "true_false", statement: "Nervengewebe wird in 1032 ohne Bezug zur Erregungsleitung dargestellt.", answer: false, explanation: "Erregungsbildung und -leitung sind die Kernfunktionen des Nervengewebes und koennen nicht ohne Bezug zur histologischen Struktur erklaert werden: Die Myelinscheide um Axone ermoeglicht die saltatorische Erregungsleitung, Synapsen vermitteln die Uebertragung auf benachbarte Zellen." }
    ],
    bossQuestions: [{ id: "hi_ng_b1", type: "true_false", statement: "Nervengewebe erfordert das Zusammendenken von Zellaufbau, Leitungsfunktion und Stuetzstrukturen.", answer: true }],
    combatQuestions: [
      { id: "hi_ng_mc1", type: "mc", question: "Welche Aussage zu Gliazellen trifft zu?", options: [
        { text: "Sie stuetzen, ernaehren und isolieren Nervenzellen", correct: true },
        { text: "Sie sind fuer die Erregungsleitung direkt zustaendig", correct: false },
        { text: "Sie kommen im peripheren Nervensystem nicht vor", correct: false },
        { text: "Sie besitzen Axone zur Reizweiterleitung", correct: false }
      ]},
      { id: "hi_ng_mc2", type: "mc", question: "Was beschreibt das Aktionspotential einer Nervenzelle?", options: [
        { text: "Die kurzzeitige Umkehr des Membranpotentials bei Erregung", correct: true },
        { text: "Die dauerhafte Depolarisation der Nervenzellmembran", correct: false },
        { text: "Den Ruhezustand der Nervenzelle ohne Reizweiterleitung", correct: false },
        { text: "Die Hemmung der Signalweiterleitung an der Synapse", correct: false }
      ]}
    ]
  })
];

const KNOCHENLEHRE_1033_PLANTS = [
  makeDetailedPlant({
    id: "knochenstoffwechsel",
    title: "Knochenstoffwechsel",
    phase1: {
      soil: { statement: "Knochen wird als lebendiges Gewebe mit staendigen Auf- und Abbauprozessen beschrieben.", answer: true, solution: "Knochen ist kein totes Material, sondern aktives Gewebe mit Blutversorgung, Nerven und lebenden Zellen. Osteoblasten, Osteozyten und Osteoklasten arbeiten staendig zusammen, um Knochen aufzubauen, zu erhalten und abzubauen." },
      seed: { statement: "Knochenstoffwechsel spielt nur in der Kindheit eine Rolle.", answer: false, solution: "Knochenstoffwechsel ist ein lebenslanger Prozess: Osteoblasten bauen staendig neue Knochenmatrix auf, Osteoklasten bauen sie ab. Dieses Gleichgewicht ermoeglicht die Anpassung an Belastungsaenderungen, die Kalziumregulation und die Heilung nach Frakturen." },
      water: { statement: "Osteoblasten und Osteoklasten sind zentrale Zelltypen des Knochenstoffwechsels.", answer: true, solution: "Osteoblasten synthetisieren Kollagen und initiieren die Mineralisation der Knochenmatrix – sie sind die Aufbauexperten. Osteoklasten loesen Knochensubstanz durch Saeuresekretion und lysosomale Enzyme auf. Das Gleichgewicht beider Zelltypen bestimmt die Knochendichte." }
    },
    harvestQuestions: [
      { id: "ko_st_h1", type: "true_false", statement: "Knochen passt sich funktionell an mechanische Beanspruchung an.", answer: true, explanation: "Nach dem Wolff'schen Gesetz orientiert sich der Knochenumbau an der einwirkenden mechanischen Belastung: Mehr belastete Bereiche werden durch verstaerkte Osteoblastenaktivitaet verdichtet, wenig belastete Bereiche durch Osteoklasten abgebaut. Dieses Prinzip erklaert Knochenverlust bei Immobilitaet und Aufbau bei Training." },
      { id: "ko_st_h2", type: "true_false", statement: "Im Knochenstoffwechsel gibt es ausschliesslich Aufbauprozesse.", answer: false, explanation: "Knochenstoffwechsel ist ein dynamisches Gleichgewicht aus Auf- und Abbau: Osteoblasten bauen neue Matrix auf, Osteoklasten bauen alte oder beschaedigte Matrix ab. Dieses ständige Remodelling erneuert den gesamten Knochen beim Erwachsenen etwa alle 10 Jahre vollstaendig." },
      { id: "ko_st_h3", type: "true_false", statement: "Auf- und Abbau sind fuer Erhalt und Anpassung des Knochensystems wichtig.", answer: true, explanation: "Der Knochen dient nicht nur als mechanische Stuetze, sondern auch als Kalziumspeicher fuer den Organismus. Osteoklasten koennen auf hormonelle Signale (Parathormon) hin Kalzium aus dem Knochen freisetzen, wenn der Blutkalziumspiegel faellt – ein lebensnotwendiger Regulationsmechanismus." }
    ],
    bossQuestions: [{ id: "ko_st_b1", type: "true_false", statement: "Knochenstoffwechsel ist ein dynamischer, lebenslanger Prozess.", answer: true }],
    combatQuestions: [
      { id: "ko_st_mc1", type: "mc", question: "Welche Zellen sind fuer den Knochenaufbau zustaendig?", options: [
        { text: "Osteoblasten", correct: true },
        { text: "Osteoklasten", correct: false },
        { text: "Osteozyten", correct: false },
        { text: "Chondroblasten", correct: false }
      ]},
      { id: "ko_st_mc2", type: "mc", question: "Was bewirkt koerperliche Belastung auf den Knochen?", options: [
        { text: "Sie stimuliert den Knochenaufbau durch mechanische Reize", correct: true },
        { text: "Sie fuehrt ausschliesslich zu Knochenabbau", correct: false },
        { text: "Sie hat keinen Einfluss auf den Knochenstoffwechsel", correct: false },
        { text: "Sie hemmt die Osteoblastenaktivitaet dauerhaft", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "knochenbildung_abbau_umbau",
    title: "Knochenbildung, -abbau und -umbau",
    phase1: {
      soil: { statement: "Osteoblasten sind fuer Knochenbildung, Osteoklasten fuer Knochenabbau zustaendig.", answer: true, solution: "Osteoblasten sind die Aufbauexperten: Sie produzieren Kollagen und setzen Kalziumphosphat in der Knochenmatrix ab. Osteoklasten sind Abbauspezialisten: Sie loesen Knochensubstanz durch Salzsaeuresekretion auf und geben Kalzium und Phosphat ins Blut frei." },
      seed: { statement: "Knochenabbau ist nur pathologisch und fuer normale Entwicklung bedeutungslos.", answer: false, solution: "Abbauprozesse sind auch fuer Wachstum und Umbau notwendig." },
      water: { statement: "Knochenumbau dient der funktionellen Anpassung an Belastung.", answer: true, solution: "Das Wolff'sche Gesetz beschreibt, wie Knochen seine Struktur staendig an einwirkende Kraefte anpasst: Mehr belastete Bereiche werden verdichtet, wenig belastete werden abgebaut. Dieser koordinierte Umbau durch Osteoblasten und Osteoklasten erklaert z.B. Knochenverlust bei Immobilitaet und Aufbau bei koerperlichem Training." }
    },
    harvestQuestions: [
      { id: "ko_bau_h1", type: "true_false", statement: "Knochenumbau kombiniert aufbauende und abbauende Prozesse.", answer: true, explanation: "Knochenumbau (Remodelling) laeuft in strukturierten Einheiten ab: Zuerst aktivieren Osteoklasten und hoehlen Tunnel in den alten Knochen (Resorption), dann wandern Osteoblasten ein und fuellen den Hohlraum mit neuer Knochenmatrix (Formation). Dieses koordinierte Zusammenspiel erneuert staendig alten durch neuen Knochen." },
      { id: "ko_bau_h2", type: "true_false", statement: "Ohne Knochenabbau waere die Bildung von Markraeumen funktionell unproblematisch.", answer: false, explanation: "Die Markhoehlel im Schaft der Roehrenknochen entsteht und bleibt nur durch aktiven Knochenabbau durch Osteoklasten erhalten. Ohne Abbau wuerden die Markraeume durch Knochenmasse ausgefuellt und koennte kein blutbildendes Knochenmark (rotes Mark) oder Fettmark (gelbes Mark) darin Platz finden." },
      { id: "ko_bau_h3", type: "true_false", statement: "Knochenumbau ist fuer die Anpassung an veränderte Beanspruchung relevant.", answer: true, explanation: "Bei veraenderter mechanischer Belastung – z.B. nach Fraktur, Immobilisierung oder intensivem Sport – passt sich der Knochen durch veraendertes Remodelling an: Kraftlinien werden durch Trabekelausrichtung in der Spongiosa gespiegelt, und die Kortikalisdicke veraendert sich entsprechend der Langzeitbelastung." }
    ],
    bossQuestions: [{ id: "ko_bau_b1", type: "true_false", statement: "Aufbau und Abbau sind gleichermassen Teil physiologischer Knochenvorgaenge.", answer: true }],
    combatQuestions: [
      { id: "ko_bau_mc1", type: "mc", question: "Welcher Knochenbildungstyp entsteht direkt aus Mesenchym ohne Knorpelvorlaeuferstufe?", options: [
        { text: "Desmale (direkte) Ossifikation", correct: true },
        { text: "Enchondrale Ossifikation", correct: false },
        { text: "Perichondrale Ossifikation", correct: false },
        { text: "Periostale Ossifikation", correct: false }
      ]},
      { id: "ko_bau_mc2", type: "mc", question: "Welches Hormon hemmt den Knochenabbau durch Hemmung der Osteoklasten?", options: [
        { text: "Calcitonin", correct: true },
        { text: "Parathormon (PTH)", correct: false },
        { text: "Cortisol", correct: false },
        { text: "Insulin", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "knochenwachstum",
    title: "Knochenwachstum",
    phase1: {
      soil: { statement: "Das Laengenwachstum langer Knochen ist an spezielle Wachstumszonen gebunden.", answer: true, solution: "Das Laengenwachstum langer Roehrenknochen findet ausschliesslich in der Epiphysenfuge (Wachstumsplatte) statt, einem Knorpelstreifen zwischen Epiphyse und Diaphyse. Chondrozyten teilen sich hier und werden nach und nach durch Knochen ersetzt, bis die Fuge mit Ende der Pubertaet schliesst." },
      seed: { statement: "Mechanische Beanspruchung ist fuer Knochenwachstum ohne Bedeutung.", answer: false, solution: "Mechanische Belastung stimuliert durch piezoelektrische Effekte und Druckkraefte die Osteoblastenaktivitaet und foerdert so den Knochenaufbau. Fehlende Belastung (z.B. Bettruhe, Schwerelosigkeit) fuehrt dagegen zu Knochenabbau und Dichteabnahme." },
      water: { statement: "Wachstum und Heilung beginnen haeufig mit Geflechtknochen als frueher Strukturform.", answer: true, solution: "Geflechtknochen entsteht bei schnellem Knochenaufbau (Wachstum, Frakturheilung) und hat ungeordnete Kollagenfasern. Er wird spaeter durch belastungsfesteren lamellären Knochen mit parallel ausgerichteten Kollagenfasern ersetzt." }
    },
    harvestQuestions: [
      { id: "ko_w_h1", type: "true_false", statement: "Die Epiphysenfuge ist fuer das Laengenwachstum relevant.", answer: true, explanation: "Die Epiphysenfuge (Wachstumsplatte, Physis) ist eine Knorpelzone zwischen Epi- und Diaphyse der langen Roehrenknochen. Hier teilen sich Chondrozyten proliferierend, der Knorpel wird anschliessend durch Osteoblasten verknochert, und der Knochen wird laenger. Mit Abschluss der Pubertaet verschliesst sich die Fuge dauerhaft." },
      { id: "ko_w_h2", type: "true_false", statement: "Knochenwachstum erfolgt unabhaengig von funktioneller Belastung.", answer: false, explanation: "Mechanische Belastung stimuliert ueber piezoelektrische Effekte und Dehnungsreize die Osteoblastenaktivitaet und foerdert das Dickenwachstum. Schwerelosigkeit oder Immobilitaet fuehren dagegen zu Knochenabbau (z.B. Astronauten, Bettlaegerige). Das Laengenwachstum wird zusaetzlich durch Wachstumshormon und IGF-1 gesteuert." },
      { id: "ko_w_h3", type: "true_false", statement: "Knochenwachstum und Knochenumbau sind funktionell gekoppelt.", answer: true, explanation: "Waehrend das Laengenwachstum in den Epiphysenfugen stattfindet, muss gleichzeitig das Knochendurchmesserwachstum (periostales Dickenwachstum) mit koordiniertem endostalem Abbau kombiniert werden, um die Proportionen und Markhoehlengrösse beizubehalten. Wachstum ohne Umbau wuerde zu massiven, schweren Knochen ohne Markhoehlel fuehren." }
    ],
    bossQuestions: [{ id: "ko_w_b1", type: "true_false", statement: "Knochenwachstum ist ohne biomechanischen Kontext nicht vollstaendig erklaerbar.", answer: true }],
    combatQuestions: [
      { id: "ko_w_mc1", type: "mc", question: "Wo findet das Laengenwachstum langer Knochen statt?", options: [
        { text: "In der Epiphysenfuge (Wachstumsplatte)", correct: true },
        { text: "Im Periost der Diaphyse", correct: false },
        { text: "Im Knochenmark der Epiphyse", correct: false },
        { text: "An der Gelenkknorpeloberflaehe", correct: false }
      ]},
      { id: "ko_w_mc2", type: "mc", question: "Wann schliesst sich die Epiphysenfuge beim Menschen?", options: [
        { text: "Mit Abschluss der Pubertaet (ca. 18–25 Jahre)", correct: true },
        { text: "Im Alter von 10 Jahren", correct: false },
        { text: "Bereits im Kleinkindalter (2–4 Jahre)", correct: false },
        { text: "Die Epiphysenfuge bleibt lebenslang offen", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "lagebezeichnungen",
    title: "Lagebezeichnungen und Koerperebenen",
    phase1: {
      soil: { statement: "Koerperebenen, Achsen und Richtungsbezeichnungen bilden ein anatomisches Orientierungssystem.", answer: true, solution: "Anatomische Lagebezeichnungen (kranial/kaudal, anterior/posterior, medial/lateral) und Koerperebenen (Sagittal-, Frontal-, Transversalebene) bilden ein standardisiertes Koordinatensystem. Ohne diese Fachsprache sind praezise anatomische und klinische Beschreibungen nicht moeglich." },
      seed: { statement: "Lagebezeichnungen sind fuer Bewegungsbeschreibungen im Bewegungsapparat irrelevant.", answer: false, solution: "Ohne standardisierte Lagebezeichnungen entstehen sofort Missverstaendnisse: 'oben', 'unten', 'vorne', 'hinten' sind in verschiedenen Koerperpositionen mehrdeutig. 'Kranial', 'kaudal', 'anterior', 'posterior' dagegen bleiben immer eindeutig, unabhaengig von der Koerperposition." },
      water: { statement: "Achsen und Ebenen werden genutzt, um Bewegungen standardisiert zuzuordnen.", answer: true, solution: "Sagittalebene und Frontalache erlauben Flexion/Extension, Frontalebene und Sagittalache erlauben Ab-/Adduktion, Transversalebene und Vertikalache erlauben Rotation. Diese Systematik macht es moeglich, jede Koerperbewegung eindeutig zu benennen und zu vergleichen." }
    },
    harvestQuestions: [
      { id: "ko_lb_h1", type: "true_false", statement: "Koerperebenen und Achsen helfen bei der systematischen Bewegungsbeschreibung.", answer: true, explanation: "Ohne Ebenen und Achsen kann keine Bewegungsrichtung eindeutig benannt werden. Die Sagittalebene und Frontalebene definieren die Raumrichtungen, die jeweiligen Achsen (frontal, sagittal, vertikal) legen die Drehpunkte der Gelenkbewegungen fest." },
      { id: "ko_lb_h2", type: "true_false", statement: "Richtungsbezeichnungen werden in der Anatomie nicht standardisiert verwendet.", answer: false, explanation: "Anatomische Richtungsbezeichnungen sind international standardisiert: 'kranial' (kopfwaerts), 'kaudal' (fusswaerts), 'anterior/ventral' (vorne), 'posterior/dorsal' (hinten), 'medial' (zur Mitte), 'lateral' (zur Seite). Diese Standardisierung verhindert Missverstaendnisse unabhaengig von Koerperposition oder Sprache." },
      { id: "ko_lb_h3", type: "true_false", statement: "Ohne Lagebezeichnungen entstehen leicht Zuordnungsfehler in Anatomiefragen.", answer: true, explanation: "Begriffe wie 'oben' oder 'vorne' sind koerperpositionsabhaengig und damit mehrdeutig. 'Kranial' und 'anterior' bleiben dagegen immer eindeutig, egal ob eine Person steht, liegt oder haengt. Praezise Lagebezeichnungen sind daher unerlasslich fuer jede anatomische Beschreibung." }
    ],
    bossQuestions: [{ id: "ko_lb_b1", type: "true_false", statement: "Anatomische Orientierungssprache ist Kernwerkzeug im Bewegungsapparat.", answer: true }],
    combatQuestions: [
      { id: "ko_lb_mc1", type: "mc", question: "Was bedeutet 'kranial'?", options: [
        { text: "Kopfwaerts, in Richtung Schaedel", correct: true },
        { text: "Fusswaerts, in Richtung Unterschenkel", correct: false },
        { text: "Zur Koerpermitte hin (medial)", correct: false },
        { text: "Zur Koerperoberflaeche hin (superfizial)", correct: false }
      ]},
      { id: "ko_lb_mc2", type: "mc", question: "Welche Ebene teilt den Koerper in eine vordere (ventrale) und hintere (dorsale) Haelfte?", options: [
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
      soil: { statement: "1033 unterscheidet platte, lange, kurze und unregelmaessige Knochen.", answer: true, solution: "Die vier Knochentypen – lang (z.B. Femur), kurz (z.B. Handwurzelknochen), platt (z.B. Schaedelplatten) und unregelmaessig (z.B. Wirbel) – spiegeln verschiedene Belastungsprofile und Funktionen wider. Die Knochenform ist immer Ausdruck der mechanischen Anforderungen an den jeweiligen Knochen." },
      seed: { statement: "Wirbel werden den langen Roehrenknochen zugeordnet.", answer: false, solution: "Wirbel gelten als unregelmaessige Knochen." },
      water: { statement: "Arme und Beine enthalten typische lange Knochen (Roehrenknochen).", answer: true, solution: "Roehrenknochen wie Femur, Humerus oder Tibia besitzen eine robuste Diaphyse (Schaft) aus Kompakta, die Biegekraefte abfaengt, und Epiphysen mit Spongiosa fuer die kraftverteilende Verbindung zu Gelenken. Diese Bauweise vereint Stabilitaet mit relativ geringem Gewicht." }
    },
    harvestQuestions: [
      { id: "ko_fo_h1", type: "true_false", statement: "Hand- und Fusswurzelknochen sind Beispiele fuer kurze Knochen.", answer: true, explanation: "Kurze Knochen haben annaehernd gleiche Ausdehnung in alle Raumrichtungen und bieten hohe Stabilitaet bei geringer Bewegungsreichweite. Handwurzelknochen (z.B. Kahnbein, Mondbein) und Fusswurzelknochen (z.B. Fersenbein, Sprungbein) sind die klassischen Beispiele." },
      { id: "ko_fo_h2", type: "true_false", statement: "Platte Knochen enthalten im Erwachsenenalter niemals rotes Knochenmark.", answer: false, explanation: "Platte Knochen wie Brustbein, Schulterblatt und Schaedelplatten enthalten auch im Erwachsenenalter rotes Knochenmark und gehoeren damit zu den haematopoetisch aktiven Knochen. Das unterscheidet sie von langen Roehrenknochen, deren Diaphyse im Erwachsenenalter gelbes Fettmark enthaelt." },
      { id: "ko_fo_h3", type: "true_false", statement: "Die Knochenform hat Bezug zu Funktion und Belastungsprofil.", answer: true, explanation: "Lange Knochen sind fuer Hebelkraefte bei Bewegungen optimiert, kurze Knochen fuer Druckkraefteverteilung in gelenknahen Regionen, platte Knochen fuer flaechigen Organschutz und Muskelbefestigung. Die Form ist stets Ausdruck der biomechanischen Anforderungen." }
    ],
    bossQuestions: [{ id: "ko_fo_b1", type: "true_false", statement: "Die sichere Typzuordnung von Knochenformen ist pruefungsrelevant.", answer: true }],
    combatQuestions: [
      { id: "ko_fo_mc1", type: "mc", question: "Welchem Knochentyp entspricht der Oberschenkelknochen (Femur)?", options: [
        { text: "Langer Knochen (Roehrenknochen)", correct: true },
        { text: "Kurzer Knochen", correct: false },
        { text: "Platter Knochen", correct: false },
        { text: "Unregelmaessiger Knochen", correct: false }
      ]},
      { id: "ko_fo_mc2", type: "mc", question: "Was kennzeichnet kurze Knochen?", options: [
        { text: "Annaehernd gleiche Ausdehnung in alle Richtungen, z. B. Hand-/Fusswurzelknochen", correct: true },
        { text: "Eine deutlich laengere als breite Form", correct: false },
        { text: "Eine sehr duenne plattenfoermige Gestalt", correct: false },
        { text: "Ausschliessliches Vorkommen im Schaedel", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "achsenskelett",
    title: "Achsenskelett",
    phase1: {
      soil: { statement: "Zum Achsenskelett zaehlen u. a. Schaedel, Wirbelsaeule und knoecherner Brustkorb.", answer: true, solution: "Das Achsenskelett bildet die zentrale tragende Skelettachse des Koerpers und gibt dem Rumpf seine stabile Grundstruktur. Schaedel, Wirbelsaeule, Rippen und Brustbein bieten dabei gleichzeitig Schutz fuer Gehirn, Rueckenmark und Brustorgane." },
      seed: { statement: "Das Achsenskelett hat keine Schutzfunktion fuer zentrale Organe.", answer: false, solution: "Das Achsenskelett hat eine doppelte Hauptfunktion: Tragen und Stabilisieren des Koerpers sowie Schutz lebenswichtiger Organe. Der Brustkorb umschliesst Herz und Lunge, der Schaedel das Gehirn und die Wirbelsaeule das Rueckenmark." },
      water: { statement: "Die Untergliederung in Neurocranium und Viscerocranium gehoert zur Schaedelbetrachtung.", answer: true, solution: "Der Schaedel gliedert sich in Neurocranium (Hirnschaedel, 8 Knochen zum Schutz des Gehirns) und Viscerocranium (Gesichtsschaedel, 14 Knochen fuer Kauapparat und Sinnesorgane). Diese Zweiteilung hilft, Schaedelknochen topographisch und funktionell einzuordnen." }
    },
    harvestQuestions: [
      { id: "ko_as_h1", type: "true_false", statement: "Das Achsenskelett bildet die zentrale knoecherne Leitstruktur des Koerpers.", answer: true, explanation: "Das Achsenskelett umfasst Schaedel, Wirbelsaeule, Rippen und Brustbein. Es bildet die Koerperachse, traegt den Rumpf, schuetzt lebenswichtige Organe (Gehirn, Rueckenmark, Herz, Lunge) und dient als Ansatzpunkt fuer Guertelskelette und Rippen." },
      { id: "ko_as_h2", type: "true_false", statement: "Der Brustkorb wird nicht dem Achsenskelett zugeordnet.", answer: false, explanation: "Der Brustkorb aus Rippen, Brustbein und Brustwirbeln ist ein wesentlicher Bestandteil des Achsenskeletts. Er umschliesst Herz und Lunge und ist aktiv an der Atemmechanik beteiligt." },
      { id: "ko_as_h3", type: "true_false", statement: "Schaedel- und Wirbelsaeulenwissen sind zentrale Bausteine im Achsenskelett-Kapitel.", answer: true, explanation: "Schaedel (mit Unterteilung in Neurocranium/Viscerocranium und 22 Einzelknochen) und Wirbelsaeule (33-34 Wirbel in 5 Abschnitten) sind die komplexesten Strukturen des Achsenskeletts mit den meisten pruefungsrelevanten Details zu Topographie, Funktion und Schutzaufgaben." }
    ],
    bossQuestions: [{ id: "ko_as_b1", type: "true_false", statement: "Achsenskelettfragen verbinden Topographie, Schutzfunktion und Statik.", answer: true }],
    combatQuestions: [
      { id: "ko_as_mc1", type: "mc", question: "Welche Strukturen gehoeren zum Achsenskelett?", options: [
        { text: "Schaedel, Wirbelsaeule und knoecherner Brustkorb", correct: true },
        { text: "Schulterblatt, Schluesselbein und Rippen", correct: false },
        { text: "Becken, Femur und Humerus", correct: false },
        { text: "Wirbelsaeule, Becken und untere Extremitaet", correct: false }
      ]},
      { id: "ko_as_mc2", type: "mc", question: "In wie viele Abschnitte wird die Wirbelsaeule gegliedert?", options: [
        { text: "Fuenf: HWS, BWS, LWS, Sakrum und Steissbein", correct: true },
        { text: "Drei: Hals-, Brust- und Lendenwirbelsaeule", correct: false },
        { text: "Vier: Hals-, Brust-, Lenden- und Kreuzwirbel", correct: false },
        { text: "Sechs Abschnitte mit jeweils eigener Bogenstruktur", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "wirbelsaeule",
    title: "Wirbelsaeule",
    phase1: {
      soil: { statement: "Die Wirbelsaeule besteht aus Wirbeln und Bandscheiben und hat sowohl tragende als auch schuetzende Aufgaben.", answer: true, solution: "Die Wirbelsaeule besteht aus 33–34 Wirbeln in fuenf Abschnitten (7 HWS, 12 BWS, 5 LWS, Sakrum, Steissbein), verbunden durch Bandscheiben und Baender. Bandscheiben aus Faserring (Anulus fibrosus) und Gallertkern (Nucleus pulposus) fungieren als Stossdaempfer und ermöglichen gleichzeitig Beweglichkeit." },
      seed: { statement: "Bandscheiben sind fuer Funktion und Beweglichkeit der Wirbelsaeule bedeutungslos.", answer: false, solution: "Bandscheiben sind unverzichtbar fuer die Funktion der Wirbelsaeule: Sie federn axiale Druckkraefte ab, geben den Wirbelkoerpern Abstand und ermöglichen durch ihre Verformbarkeit Beugung, Streckung und Rotation." },
      water: { statement: "Besonderheiten und Baender der Wirbelsaeule sind eigene Lernunterpunkte.", answer: true, solution: "Die Wirbelsaeule wird durch mehrere Bandsysteme stabilisiert: Das Lig. longitudinale anterius entlang der Vorderflaeche, das Lig. longitudinale posterius im Spinalkanal, und die Ligg. flava zwischen den Wirbelboegen. Diese Baender begrenzen Ueberdehnung und sichern die Stabilitaet der Wirbelsaeule." }
    },
    harvestQuestions: [
      { id: "ko_ws_h1", type: "true_false", statement: "Bandscheiben tragen zur funktionellen Leistungsfaehigkeit der Wirbelsaeule bei.", answer: true, explanation: "Bandscheiben aus Anulus fibrosus (Faserring) und Nucleus pulposus (Gallertkern) federn Druckkraefte ab, geben Wirbelkoerpern Abstand und ermöglichen durch ihre Verformbarkeit Bewegungen. Ohne Bandscheiben waere die Wirbelsaeule starr und druckempfindlich." },
      { id: "ko_ws_h2", type: "true_false", statement: "Wirbelsaeulenbaender spielen fuer Stabilitaet keine Rolle.", answer: false, explanation: "Die Wirbelsaeule wird durch mehrere Bandsysteme stabilisiert: Lig. longitudinale anterius und posterius verlaufen laengs der Wirbelkoerper, die Ligg. flava verbinden die Wirbelboegen. Diese Baender begrenzen Ueberdehnung und sichern die Stellung der Wirbel zueinander." },
      { id: "ko_ws_h3", type: "true_false", statement: "Funktion und Besonderheiten der Wirbelsaeule sind eng verknuepft.", answer: true, explanation: "Die Wirbelsaeule kombiniert scheinbar widersprüchliche Anforderungen: Stabilitaet fuer Lastaufnahme und Schutz des Rueckenmarks einerseits, Beweglichkeit fuer Alltagsbewegungen andererseits. Diese duale Funktion erklaert die komplexe Kombination aus Wirbelkoerpern, Bandscheiben und Baendern." }
    ],
    bossQuestions: [{ id: "ko_ws_b1", type: "true_false", statement: "Das Wirbelsaeulenkapitel verlangt das Zusammenspiel von Struktur, Stabilitaet und Beweglichkeit.", answer: true }],
    combatQuestions: [
      { id: "ko_ws_mc1", type: "mc", question: "Welche Funktion haben die Bandscheiben der Wirbelsaeule?", options: [
        { text: "Stossdaempfung und Ermoeglichung von Beweglichkeit zwischen Wirbelkoerpern", correct: true },
        { text: "Knochenernährung und Blutversorgung der Wirbelkoerper", correct: false },
        { text: "Ausschliesslich passive Verbindung ohne Daempfungsfunktion", correct: false },
        { text: "Stabilisierung durch aktive Muskelkontraktion", correct: false }
      ]},
      { id: "ko_ws_mc2", type: "mc", question: "Welches Band verlaeuft entlang der Vorderflaehe der Wirbelkoerper?", options: [
        { text: "Ligamentum longitudinale anterius", correct: true },
        { text: "Ligamentum longitudinale posterius", correct: false },
        { text: "Ligamentum flavum", correct: false },
        { text: "Ligamentum interspinale", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "extremitaetenskelett",
    title: "Extremitaetenskelett",
    phase1: {
      soil: { statement: "Das Extremitaetenskelett umfasst Schulterguertel, obere Extremitaet, Beckenguertel und untere Extremitaet.", answer: true, solution: "Das Extremitaetenskelett verbindet ueber Guertelsysteme die Gliedmassen mit dem Achsenskelett. Schulterguertel (Klavikula + Skapula) und Beckenguertel sind die Verbindungsstellen, ueber die Kraefte zwischen Rumpf und Extremitaeten uebertragen werden." },
      seed: { statement: "Schulterguertel und Beckenguertel haben keinen Bezug zur Kraftuebertragung.", answer: false, solution: "Gurtelsysteme sind funktionell zentrale Verbindungselemente: Der Schulterguertel ermoeglicht die grosse Bewegungsreichweite des Arms, der Beckenguertel uebertraegt das Koerpergewicht auf die Beine und stabilisiert den Rumpf beim Gehen." },
      water: { statement: "Obere und untere Extremitaet werden mit Knochen und Gelenken differenziert betrachtet.", answer: true, solution: "Obere Extremitaet: Humerus, Radius/Ulna, Hand- und Fingerknochen mit Schulter-, Ellenbogen- und Handgelenk. Untere Extremitaet: Femur, Tibia/Fibula, Fuss- und Zehenknochen mit Hueft-, Knie- und Sprungelenk. Jeder Abschnitt hat spezifische Gelenktypen fuer seinen Bewegungsumfang." }
    },
    harvestQuestions: [
      { id: "ko_ex_h1", type: "true_false", statement: "Schulter- und Beckenguertel sind Bestandteil des Extremitaetenskeletts.", answer: true, explanation: "Das Extremitaetenskelett gliedert sich in Guertelskelette (Schulterguertel: Klavikula + Skapula; Beckenguertel: Os coxae) und freie Extremitaeten. Die Guertelskelette verbinden die Gliedmassen mit dem Achsenskelett und uebertragen Kraefte zwischen Rumpf und Extremitaeten." },
      { id: "ko_ex_h2", type: "true_false", statement: "Femur, Unterschenkel und Fussknochen gehoeren zur oberen Extremitaet.", answer: false, explanation: "Femur (Oberschenkelknochen), Tibia/Fibula (Unterschenkelknochen) und Fussknochen gehoeren zur unteren Extremitaet. Zur oberen Extremitaet gehoeren Humerus (Oberarm), Radius/Ulna (Unterarm) und die Handknochen." },
      { id: "ko_ex_h3", type: "true_false", statement: "Das Extremitaetenskelett verbindet Stabilitaet mit Bewegungsfunktion.", answer: true, explanation: "Die langen Roehrenknochen der Extremitaeten bieten durch Kompakta-Diaphyse und spongiöse Epiphysen hohe Stabilitaet bei geringem Gewicht. Die Gelenke zwischen diesen Knochen erlauben die Bewegungsfreiheitsgrade fuer Greifen, Laufen und Stehen." }
    ],
    bossQuestions: [{ id: "ko_ex_b1", type: "true_false", statement: "Topographisches Denken ist im Extremitaetenskelett unverzichtbar.", answer: true }],
    combatQuestions: [
      { id: "ko_ex_mc1", type: "mc", question: "Welche Knochen gehoeren zur unteren Extremitaet?", options: [
        { text: "Femur, Tibia, Fibula und Fusswurzelknochen", correct: true },
        { text: "Humerus, Radius, Ulna und Handwurzelknochen", correct: false },
        { text: "Klavikula, Skapula, Humerus und Radius", correct: false },
        { text: "Becken, Femur, Patella und Humerus", correct: false }
      ]},
      { id: "ko_ex_mc2", type: "mc", question: "Welche Knochen bilden den Schulterguerte?", options: [
        { text: "Klavikula (Schluesselbein) und Skapula (Schulterblatt)", correct: true },
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
      soil: { statement: "1033 unterscheidet unechte Gelenke (Synarthrosen) und echte Gelenke (Diarthrosen).", answer: true, solution: "Synarthrosen (unechte Gelenke) wie Schaedelnaethe oder die Symphyse erlauben kaum Bewegung und haben keine Gelenkhoehlel. Diarthrosen (echte Gelenke) besitzen eine mit Synovia gefuellte Gelenkhoehlel, einen Gelenkknorpel und eine Kapsel, was variable Bewegungen ermoeglicht." },
      seed: { statement: "Synarthrosen sind die frei beweglichsten Gelenkformen.", answer: false, solution: "Freiere Beweglichkeit ist typisch fuer Diarthrosen." },
      water: { statement: "Die Gelenkklassifikation dient der funktionellen Bewegungszuordnung.", answer: true, solution: "Die Einteilung in Synarthrosen und Diarthrosen ist die Basis fuer das Verstaendnis aller spezifischen Gelenkformen. Aus dem Vorhandensein einer Gelenkhoehlel und dem Gelenktyp laesst sich unmittelbar ableiten, welche Bewegungen anatomisch moeglich und welche blockiert sind." }
    },
    harvestQuestions: [
      { id: "ko_gk_h1", type: "true_false", statement: "Diarthrosen sind echte Gelenke.", answer: true, explanation: "Diarthrosen besitzen alle Charakteristika eines freien Gelenks: Gelenkhoehlel mit Synovia, hyalinen Gelenkknorpel auf den Gelenkflaechen, eine Gelenkkapsel (Stratum fibrosum aussen, Synovialmembran innen) und gegebenenfalls Zusatzstrukturen wie Menisken oder Bursen." },
      { id: "ko_gk_h2", type: "true_false", statement: "Synarthrosen und Diarthrosen sind nur alternative Namen fuer denselben Gelenktyp.", answer: false, explanation: "Synarthrosen und Diarthrosen sind grundlegend verschiedene Gelenktypen: Synarthrosen (z.B. Schaedelnaethe, Symphyse) haben keine Gelenkhoehlel und erlauben kaum oder keine Bewegung. Diarthrosen besitzen eine Gelenkhoehlel mit Synovia und sind frei beweglich." },
      { id: "ko_gk_h3", type: "true_false", statement: "Die Grundklassifikation der Gelenke ist fuer Bewegungsanalyse relevant.", answer: true, explanation: "Aus der Klassifikation – Synarthrose (unbeweglich) vs. Diarthrose (frei beweglich) – laesst sich direkt ableiten, ob und wie sich ein Gelenk bewegen laesst. Diarthrosen werden weiter nach Gelenkform und Bewegungsachsen unterteilt (Kugel-, Scharnier-, Sattelgelenk etc.)." }
    ],
    bossQuestions: [{ id: "ko_gk_b1", type: "true_false", statement: "Ohne Synarthrose/Diarthrose-Grundschema bleiben viele Gelenkfragen unscharf.", answer: true }],
    combatQuestions: [
      { id: "ko_gk_mc1", type: "mc", question: "Was unterscheidet echte Gelenke (Diarthrosen) von unechten Gelenken (Synarthrosen)?", options: [
        { text: "Diarthrosen besitzen einen Gelenkspalt mit Gelenkfluessigkeit", correct: true },
        { text: "Synarthrosen ermoeglichen die groesste Beweglichkeit", correct: false },
        { text: "Diarthrosen sind nicht von einer Gelenkkapsel umhuellt", correct: false },
        { text: "Synarthrosen kommen nur in der unteren Extremitaet vor", correct: false }
      ]},
      { id: "ko_gk_mc2", type: "mc", question: "Welche Struktur produziert die Gelenkfluessigkeit (Synovia)?", options: [
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
      soil: { statement: "1033 behandelt verschiedene Gelenkarten wie Kugel-, Ei- und weitere Gelenkformen.", answer: true, solution: "Echte Gelenke werden nach Gelenkkopf-Form und Bewegungsmoeglichkeit eingeteilt: Kugelgelenk (3 Achsen, z.B. Schulter), Scharniergelenk (1 Achse, z.B. Knie), Sattelgelenk (2 Achsen, z.B. Daumensattelgelenk). Jede Gelenkform erlaubt bestimmte Bewegungsrichtungen und begrenzt andere." },
      seed: { statement: "Gelenkarten unterscheiden sich nur namentlich, nicht in Bewegungsmoeglichkeiten.", answer: false, solution: "Gelenkform und Bewegungsumfang sind direkt verknuepft: Das Kugelgelenk (z.B. Schulter) erlaubt Bewegungen in alle drei Raumachsen, das Scharniergelenk (z.B. Knie) nur Flexion und Extension um eine Achse. Die Form ist also der anatomische Ausdruck der Bewegungsfunktion." },
      water: { statement: "Die Gelenkform ist ein Schluessel zur Ableitung moeglicher Bewegungen.", answer: true, solution: "Das Schultergelenk ist als Kugelgelenk in alle Richtungen beweglich, das Kniegelenk als Scharniergelenk nur in Beugung/Streckung. Aus der Gelenkform laesst sich also direkt ableiten, welche Bewegungen anatomisch moeglich sind und welche blockiert werden." }
    },
    harvestQuestions: [
      { id: "ko_ga_h1", type: "true_false", statement: "Die Gelenkart beeinflusst den moeglichen Bewegungsumfang.", answer: true, explanation: "Kugelgelenke (z.B. Schulter) erlauben drei Freiheitsgrade, Scharniergelenke (z.B. Ellenbogen) nur einen. Die anatomische Form des Gelenkkopfs und der Gelenkpfanne bestimmt unmittelbar, welche Bewegungen moeglich sind und welche mechanisch blockiert werden." },
      { id: "ko_ga_h2", type: "true_false", statement: "Kugelgelenk und Eigelenk sind funktionell vollstaendig identisch.", answer: false, explanation: "Kugelgelenke (z.B. Schulter, Hueftgelenk) erlauben Bewegungen in alle drei Raumachsen. Eigelenke (z.B. Handgelenk, Atlantookzipitalgelenk) erlauben nur zwei Achsen, weil eine ovale statt kugelfoermige Gelenkflaeche die dritte Achse (Rotation) verhindert." },
      { id: "ko_ga_h3", type: "true_false", statement: "Die sichere Gelenktypisierung hilft bei klinischen Bewegungsfragen.", answer: true, explanation: "Klinische Fragen nach Bewegungseinschraenkungen setzen das Wissen voraus, welche Freiheitsgrade ein Gelenk normalerweise hat. Ist die Aussenrotation des Schultergelenks (Kugelgelenk) eingeschraenkt, ist das pathologisch; das Ellenbogengelenk (Scharniergelenk) hat keine Rotation – das ist normal." }
    ],
    bossQuestions: [{ id: "ko_ga_b1", type: "true_false", statement: "Gelenkarten verbinden morphologische Form mit biomechanischer Funktion.", answer: true }],
    combatQuestions: [
      { id: "ko_ga_mc1", type: "mc", question: "Welches Gelenk erlaubt Bewegungen in allen Raumebenen (mehrachsig)?", options: [
        { text: "Kugelgelenk (z. B. Schultergelenk)", correct: true },
        { text: "Scharniergelenk (z. B. Kniegelenk)", correct: false },
        { text: "Zapfengelenk (z. B. proximales Radioulnargelenk)", correct: false },
        { text: "Eigelenk (z. B. Handgelenk)", correct: false }
      ]},
      { id: "ko_ga_mc2", type: "mc", question: "Welchem Gelenktyp entspricht das Kniegelenk hauptsaechlich?", options: [
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
      soil: { statement: "Muskeln gehoeren zum aktiven Bewegungsapparat und erzeugen Bewegung durch Kontraktion.", answer: true, solution: "Muskeln erzeugen Bewegung durch die Verkürzung (Kontraktion) ihrer Fasern, ausgeloest durch nervale Erregung an der motorischen Endplatte. Im Gegensatz zum passiven Bewegungsapparat (Knochen, Baender) koennen Muskeln aktiv Kraft aufbauen und damit Gelenke bewegen und stabilisieren." },
      seed: { statement: "Muskeln stabilisieren Gelenke nur passiv und ohne aktive Spannung.", answer: false, solution: "Muskeln sichern Gelenke ueber aktive Kraftentwicklung." },
      water: { statement: "Muskelarbeit ist neben Bewegung auch fuer Haltung und Waermebildung relevant.", answer: true, solution: "Neben der Bewegungserzeugung hat Skelettmuskulatur zwei weitere wichtige Aufgaben: Gelenkstabilisierung durch aktiven Muskeltonus und Waermeproduktion durch den Energiestoffwechsel bei Kontraktion. Bis zu 70 % der Koerpereigenwaerme wird durch Muskelaktivitaet erzeugt." }
    },
    harvestQuestions: [
      { id: "mu_allg_h1", type: "true_false", statement: "Muskulatur ist ein zentraler Bestandteil des aktiven Bewegungsapparates.", answer: true, explanation: "Skelettmuskulatur erzeugt durch Kontraktion aktiv Kraft und Bewegung – im Gegensatz zum passiven Bewegungsapparat (Knochen, Baender, Gelenkkapseln), der nur Bewegungen erlaubt oder begrenzt, aber sie nicht selbst erzeugt. Muskeln sind die einzigen bewegungserzeugenden Strukturen." },
      { id: "mu_allg_h2", type: "true_false", statement: "Muskeln haben ausschliesslich Bewegungsfunktion und keine Haltefunktion.", answer: false, explanation: "Skelettmuskeln stabilisieren Gelenke durch permanenten niedrigschwelligen Muskeltonus. Ohne diesen Tonus wuerden viele Gelenke subluxieren. Zusaetzlich erzeugt Muskelaktivitaet Koerperwaerme als Nebenprodukt – bis zu 70% der Koerpereigenwaerme stammt aus Muskelarbeit." },
      { id: "mu_allg_h3", type: "true_false", statement: "Kontraktion ist das grundlegende Funktionsprinzip von Muskelgewebe.", answer: true, explanation: "Alle Muskelzellen (Skelett-, Herz- und glatte Muskulatur) beruhen auf demselben Grundprinzip: Aktin und Myosin gleiten durch ATP-Hydrolyse aneinander vorbei und verkuerzen das Sarkomer. Dieser Gleitfilamentmechanismus ist das universelle Konstruktionsprinzip aller Muskelzelltypen." }
    ],
    bossQuestions: [{ id: "mu_allg_b1", type: "true_false", statement: "Allgemeine Muskellehre verbindet Bewegung, Stabilisierung und Stoffwechselbezug.", answer: true }],
    combatQuestions: [
      { id: "mu_allg_mc1", type: "mc", question: "Welche Funktion hat die Skelettmuskulatur NEBEN der Bewegungserzeugung?", options: [
        { text: "Waermebildung und Gelenkstabilisierung", correct: true },
        { text: "Filtration von Blut", correct: false },
        { text: "Produktion von Hormonen", correct: false },
        { text: "Gasaustausch in der Lunge", correct: false }
      ]},
      { id: "mu_allg_mc2", type: "mc", question: "Womit kontrahiert der Skelettmuskel auf molekularer Ebene?", options: [
        { text: "Durch Verkuerzung der Sarkomere ueber Aktin-Myosin-Wechselwirkung", correct: true },
        { text: "Durch Quellung von Bindegewebe im Muskel", correct: false },
        { text: "Durch elektrische Ladungsverschiebung ohne Strukturaenderung", correct: false },
        { text: "Durch passive Dehnung der Muskelfasern", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "muskelaufbau",
    title: "Aufbau des Muskels",
    phase1: {
      soil: { statement: "Der Skelettmuskel ist hierarchisch organisiert, von Muskel ueber Faserbuendel bis zur Muskelfaser.", answer: true, solution: "Der Skelettmuskel ist hierarchisch aufgebaut: Das Epimysium umhuellt den gesamten Muskel, das Perimysium einzelne Muskelfaserbuendel und das Endomysium einzelne Muskelfasern. Diese Bindegewebsschichten bieten Schutz, ermöglichen Gleitbewegungen und enthalten Blutgefaesse und Nerven." },
      seed: { statement: "Muskelfasern enthalten keine spezialisierten kontraktilen Strukturen.", answer: false, solution: "Myofibrillen mit Aktin/Myosin sind zentral fuer die Kontraktion." },
      water: { statement: "Bindegewebige Huelle und Gefaess-Nerven-Versorgung sind Teil des Muskelaufbaus.", answer: true, solution: "Der Muskel als Organ beinhaltet mehr als nur Muskelfasern: Bindegewebshüllen (Epi-/Peri-/Endomysium) schützen und trennen die Faserbuendel, Blutgefaesse versorgen die Muskelfasern mit O2 und Naehrstoffen, und Nervenfasern uebertragen die motorischen Impulse zur Kontraktion." }
    },
    harvestQuestions: [
      { id: "mu_auf_h1", type: "true_false", statement: "Der Muskelaufbau folgt einem funktionellen Hierarchiemodell.", answer: true, explanation: "Das hierarchische Modell (Muskel → Muskelfaserbuendel → Muskelfaser → Myofibrille → Sarkomer) erklaert sowohl die Kraftentwicklung als auch die Kraftdosierung: Durch Rekrutierung unterschiedlich vieler Muskelfaserbuendel und Feuerfrequenz der motorischen Einheiten kann die Kraft praezise reguliert werden." },
      { id: "mu_auf_h2", type: "true_false", statement: "Aktin und Myosin sind fuer Muskelkontraktion irrelevant.", answer: false, explanation: "Aktin (duenne Filamente) und Myosin (dicke Filamente) sind die molekularen Akteure der Muskelkontraktion. Im Gleitfilamentmodell ziehen Myosinkoepfe am Aktinfilament und verkuerzen das Sarkomer. Ohne diese Proteine ist Muskelkontraktion auf zellulaerer Ebene unmoeglich." },
      { id: "mu_auf_h3", type: "true_false", statement: "Struktur und Funktion des Muskels sind direkt miteinander verknuepft.", answer: true, explanation: "Die Bindegewebshüllen (Epi-/Peri-/Endomysium) buendeln die Kraft der Einzelfasern und leiten sie in die Sehnen weiter. Die hierarchische Strukturierung ermoeglicht sowohl die Kraftentwicklung als auch praezise Bewegungsdosierung." }
    ],
    bossQuestions: [{ id: "mu_auf_b1", type: "true_false", statement: "Ein belastbares Muskelverstaendnis braucht Makro- und Mikroaufbau gemeinsam.", answer: true }],
    combatQuestions: [
      { id: "mu_auf_mc1", type: "mc", question: "In welcher Reihenfolge ist der Skelettmuskel hierarchisch aufgebaut?", options: [
        { text: "Muskel → Muskelfaserbuendel → Muskelfaser → Myofibrille → Sarkomer", correct: true },
        { text: "Myofibrille → Muskelfaser → Muskelfaserbuendel → Muskel → Sarkomer", correct: false },
        { text: "Sarkomer → Muskel → Myofibrille → Muskelfaser", correct: false },
        { text: "Muskel → Myofibrille → Muskelfaserbuendel → Sarkomer", correct: false }
      ]},
      { id: "mu_auf_mc2", type: "mc", question: "Wie heisst die Bindegewebshuelle, die den gesamten Muskel umhuellt?", options: [
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
      soil: { statement: "Erregbarkeit, Kontraktilitaet, Dehnbarkeit und Elastizitaet sind grundlegende Muskel-Eigenschaften.", answer: true, solution: "Diese vier Eigenschaften ermoeglichen erst die normale Muskelfunktion: Erregbarkeit (Empfang nervaler Reize), Kontraktilitaet (aktive Kraftentwicklung), Dehnbarkeit (passive Laengenveraenderung ohne Schaden) und Elastizitaet (Rueckkehr zur Ausgangslange nach Dehnung)." },
      seed: { statement: "Ein Muskel muss weder erregbar noch elastisch sein, um physiologisch zu arbeiten.", answer: false, solution: "Ohne Erregbarkeit kann ein Muskel keinen Nervenreiz empfangen und keine Kontraktion einleiten – Bewegung waere unmoeglich. Ohne Elastizitaet koennte er nach einer Dehnung nicht in seine Ausgangslage zurueckkehren, was zu dauerhafter Verkuerzung und Funktionsverlust fuehren wuerde." },
      water: { statement: "Isometrische und isotonische Arbeitsweisen gehoeren zur funktionellen Betrachtung.", answer: true, solution: "Bei isometrischer Arbeit kontrahiert der Muskel ohne Laengenaenderung (z.B. Halten einer Last), bei isotonischer Arbeit veraendert er seine Laenge bei gleichbleibender Spannung (z.B. Heben einer Last). Diese Unterscheidung erklaert, warum verschiedene Belastungsformen unterschiedlich trainierbar sind." }
    },
    harvestQuestions: [
      { id: "mu_fk_h1", type: "true_false", statement: "Kontraktilitaet beschreibt die Faehigkeit des Muskels, aktiv Kraft zu entwickeln.", answer: true, explanation: "Kontraktilitaet ist die herausragende Eigenschaft der Muskulatur: Der Muskel kann durch nervale Erregung aktiv Kraft entwickeln und sich verkuerzen. Dieser Vorgang beruht auf dem ATP-getriebenen Querbrueckenzyklus zwischen Aktin und Myosin im Sarkomer." },
      { id: "mu_fk_h2", type: "true_false", statement: "Elastizitaet und Dehnbarkeit sind fuer Muskelfunktion bedeutungslos.", answer: false, explanation: "Elastizitaet (Rueckkehr zur Ausgangslange nach Dehnung) und Dehnbarkeit (passive Laengenzunahme) sind entscheidend fuer Alltagsbewegungen. Ohne Elastizitaet wuerden Muskeln nach Dehnung dauerhaft verlaengert bleiben; ohne Dehnbarkeit wuerden Antagonisten die Bewegungen des Agonisten behindern." },
      { id: "mu_fk_h3", type: "true_false", statement: "Funktionelle Charakteristika sind Grundlage fuer Trainings- und Belastungsfragen.", answer: true, explanation: "Isometrische Arbeit (Laenge konstant, Spannung steigt) trainiert andere Eigenschaften als isotonische Arbeit (Spannung konstant, Laenge aendert sich). Das Verstaendnis dieser Arbeitsweisen erklaert, warum Krafttraining, Ausdauertraining und Dehnen unterschiedliche physiologische Adaptationen ausloesen." }
    ],
    bossQuestions: [{ id: "mu_fk_b1", type: "true_false", statement: "Muskeleigenschaften erklaeren, warum gleiche Lasten unterschiedlich verarbeitet werden.", answer: true }],
    combatQuestions: [
      { id: "mu_fk_mc1", type: "mc", question: "Was beschreibt isometrische Muskelarbeit?", options: [
        { text: "Kraftentfaltung bei gleichbleibender Muskellaenge (ohne Bewegung)", correct: true },
        { text: "Kraftentfaltung mit gleichbleibender Muskelspannung", correct: false },
        { text: "Erschlaffung des Muskels ohne Kraftentfaltung", correct: false },
        { text: "Passive Dehnung des Muskels durch aeussere Kraft", correct: false }
      ]},
      { id: "mu_fk_mc2", type: "mc", question: "Was versteht man unter Kontraktilitaet des Muskels?", options: [
        { text: "Die Faehigkeit, aktiv Kraft zu entwickeln und sich zu verkuerzen", correct: true },
        { text: "Die Faehigkeit, passiv gedehnt zu werden", correct: false },
        { text: "Die Faehigkeit zur elektrischen Selbsterregung", correct: false },
        { text: "Die Faehigkeit zur schnellen Erschlaffung nach Kontraktion", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "innervation_skelettmuskulatur",
    title: "Innervation der Skelettmuskulatur",
    phase1: {
      soil: { statement: "Skelettmuskeln werden ueber motorische Nervenfasern innerviert.", answer: true, solution: "Die nervale Ansteuerung ist Voraussetzung fuer willkuerliche Bewegung." },
      seed: { statement: "Ohne neuromuskulaere Uebertragung kann ein Skelettmuskel normal kontrahieren.", answer: false, solution: "Die motorische Endplatte ist fuer die Ausloesung der Kontraktion erforderlich." },
      water: { statement: "Motorische Einheit bedeutet: ein Motoneuron und alle von ihm versorgten Muskelfasern.", answer: true, solution: "Die motorische Einheit ist die kleinste Steuerungseinheit des Muskels: Ein Motoneuron kann wenige (Feinmotorik, z.B. Augenmuskel: ~5 Fasern) bis tausende Muskelfasern (Grobmotorik, z.B. Beinmuskeln) versorgen. Je kleiner die Einheit, desto praeziser die Dosierbarkeit der Kraft." }
    },
    harvestQuestions: [
      { id: "mu_in_h1", type: "true_false", statement: "Die motorische Endplatte vermittelt die Signaluebertragung vom Nerv auf die Muskelfaser.", answer: true, explanation: "An der motorischen Endplatte (neuromuskulaere Synapse) wird das elektrische Signal des Motoneurons chemisch uebertragen: Acetylcholin wird ausgeschuettet, bindet an Rezeptoren der Muskelfaser und loest dort ein Aktionspotenzial aus, das schliesslich die Kontraktion einleitet." },
      { id: "mu_in_h2", type: "true_false", statement: "Motorische Einheiten spielen fuer die Kraftdosierung keine Rolle.", answer: false, explanation: "Motorische Einheiten sind das Grundprinzip der Kraftdosierung: Durch Rekrutierung unterschiedlich vieler motorischer Einheiten und Aenderung der Feuerfrequenz reguliert das Nervensystem die Muskelkraft stufenlos. Feinmotorische Muskeln (Augen, ~5 Fasern/Einheit) ermöglichen praezise Kontrolle, Grossmuskeln (Bein, hunderte Fasern/Einheit) viel Kraft." },
      { id: "mu_in_h3", type: "true_false", statement: "Innervation ist fuer koordinierte Muskelarbeit unverzichtbar.", answer: true, explanation: "Koordination erfordert praezises zeitliches und raeumliches Zusammenspiel vieler Muskeln. Das Nervensystem steuert, welche Muskeln wann und wie stark kontrahieren – Agonisten und Antagonisten werden aufeinander abgestimmt. Ohne Innervation wuerde diese Koordination sofort zusammenbrechen." }
    ],
    bossQuestions: [{ id: "mu_in_b1", type: "true_false", statement: "Nervenansteuerung und Muskelantwort muessen als funktionelle Einheit gelernt werden.", answer: true }],
    combatQuestions: [
      { id: "mu_in_mc1", type: "mc", question: "Was versteht man unter einer motorischen Einheit?", options: [
        { text: "Ein Motoneuron und alle von ihm versorgten Muskelfasern", correct: true },
        { text: "Ein Muskel mit all seinen Nerven und Gefaessen", correct: false },
        { text: "Die Gesamtheit aller Motoneuronen im Rueckenmark", correct: false },
        { text: "Eine einzelne Muskelfaser mit ihrem Zellkern", correct: false }
      ]},
      { id: "mu_in_mc2", type: "mc", question: "An welcher Struktur wird die nervale Erregung auf die Muskelfaser uebertragen?", options: [
        { text: "An der motorischen Endplatte (neuromuskulaere Synapse)", correct: true },
        { text: "Im Spinalganglion", correct: false },
        { text: "An der Ranvierschen Schnuerring", correct: false },
        { text: "Im Muskelspindel", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "ernaehrungsphysiologie",
    title: "Ernaehrungsphysiologie",
    phase1: {
      soil: { statement: "Muskelarbeit benoetigt kontinuierliche Energiebereitstellung aus verschiedenen Stoffwechselwegen.", answer: true, solution: "ATP-Bereitstellung ist Kernpunkt der Ernaehrungsphysiologie im Muskelkontext." },
      seed: { statement: "Die Energieversorgung der Muskulatur ist unabhaengig von Sauerstoffverfuegbarkeit.", answer: false, solution: "Aerobe und anaerobe Prozesse unterscheiden sich funktionell deutlich." },
      water: { statement: "Belastungsdauer und Intensitaet beeinflussen, welche Energiesysteme dominieren.", answer: true, solution: "Kurze intensive Belastung (Sprint) nutzt primaer anaerobe Systeme (Kreatinphosphat, Glykolyse), laengere moderate Belastung (Ausdauer) setzt zunehmend auf aerobe Fettverbrennung. Dieses Umschalten erklaert, warum Ermuedung und Laktatanstieg bei verschiedenen Belastungsarten unterschiedlich verlaufen." }
    },
    harvestQuestions: [
      { id: "mu_er_h1", type: "true_false", statement: "ATP ist die direkte Energiequelle der Muskelkontraktion.", answer: true, explanation: "ATP ist der einzige direkt nutzbare Energietraeger fuer den Myosin-Querbrueckenzyklus. Da der ATP-Vorrat im Muskel nur fuer wenige Kontraktionen reicht, muss ATP staendig resynthetisiert werden – aus Kreatinphosphat (sehr schnell), Glykolyse (schnell) oder aerober Verbrennung (langsam, aber dauerhaft)." },
      { id: "mu_er_h2", type: "true_false", statement: "Muskelstoffwechsel ist fuer Ermuedung und Leistungsprofil irrelevant.", answer: false, explanation: "Muskelstoffwechsel erklaert direkt die Ermuedungsphysiologie: Laktatanstieg bei intensiver Belastung senkt den pH-Wert und hemmt Enzymaktivitaeten. Die Energiereserven (Kreatinphosphat, Glykogen) bestimmen, wie lange intensive Leistung aufrechterhalten werden kann." },
      { id: "mu_er_h3", type: "true_false", statement: "Energiesysteme werden je nach Belastungsart unterschiedlich genutzt.", answer: true, explanation: "Das anaerob-alaktazide System (Kreatinphosphat) liefert sofort Energie fuer ca. 6-10 Sekunden. Das anaerob-laktazide System (Glykolyse) haelt 30-90 Sekunden. Das aerobe System (Oxidation von Glukose/Fetten) dominiert bei Dauerbelastung. Dieses Umschalten erklaert unterschiedliche Belastungsprofile im Sport." }
    ],
    bossQuestions: [{ id: "mu_er_b1", type: "true_false", statement: "Muskelfunktion laesst sich ohne Grundlagen der Energiebereitstellung nicht sicher erklaeren.", answer: true }],
    combatQuestions: [
      { id: "mu_er_mc1", type: "mc", question: "Was ist die direkte Energiequelle der Muskelkontraktion?", options: [
        { text: "ATP (Adenosintriphosphat)", correct: true },
        { text: "Glukose", correct: false },
        { text: "Fettsaeuren", correct: false },
        { text: "Laktat", correct: false }
      ]},
      { id: "mu_er_mc2", type: "mc", question: "Was entsteht bei intensiver anaerober Belastung als Stoffwechselprodukt?", options: [
        { text: "Laktat (Milchsaeure)", correct: true },
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
      soil: { statement: "Unterschieden werden Skelett-, Herz- und glatte Muskulatur mit jeweils eigenen Eigenschaften.", answer: true, solution: "Die drei Muskeltypen unterscheiden sich in Histologie, Steuerung und Vorkommen: Skelettmuskulatur (quergestreift, willkuerlich, Bewegungsapparat), glatte Muskulatur (keine Streifung, unwillkuerlich, Hohlorgane) und Herzmuskulatur (quergestreift, unwillkuerlich, nur das Herz)." },
      seed: { statement: "Herzmuskulatur gehoert funktionell zur glatten Muskulatur.", answer: false, solution: "Herzmuskulatur ist histologisch quergestreift (wie Skelettmuskulatur), aber unwillkuerlich gesteuert (wie glatte Muskulatur). Darueber hinaus besitzt sie funktionelle Syncytium-Eigenschaften durch Gap Junctions sowie automatische Schrittmacherzellen – Merkmale, die sie als eigenstaendige Muskelklasse auszeichnen." },
      water: { statement: "Skelettmuskulatur ist willkuerlich steuerbar, glatte Muskulatur ueberwiegend nicht.", answer: true, solution: "Skelettmuskulatur wird durch somatische Motoneuronen gesteuert und unterliegt dem bewussten Willen. Glatte Muskulatur (Darm, Gefaesse) wird durch das autonome Nervensystem und Hormone reguliert – das erklaert, warum wir Verdauungsbewegungen oder Gefaessweite nicht direkt willentlich kontrollieren koennen." }
    },
    harvestQuestions: [
      { id: "mu_art_h1", type: "true_false", statement: "Skelettmuskulatur ist quer gestreift.", answer: true, explanation: "Die Querstreifung der Skelettmuskulatur entsteht durch die regelmaessige Anordnung von Aktin und Myosin in Sarkomeren: Dunkle A-Banden (Myosin) und helle I-Banden (Aktin) wechseln sich regelmaessig ab und erzeugen das charakteristische Streifenmuster im Lichtmikroskop." },
      { id: "mu_art_h2", type: "true_false", statement: "Glatte Muskulatur ist typischerweise willentlich steuerbar wie Skelettmuskeln.", answer: false, explanation: "Glatte Muskulatur in Hohlorganen (Darm, Blutgefaesse, Harnblase) wird durch das autonome Nervensystem und Hormone gesteuert, nicht durch den somatischen Willen. Wir koennen Darmperistaltik oder Gefaessweite nicht direkt willentlich kontrollieren." },
      { id: "mu_art_h3", type: "true_false", statement: "Herzmuskel besitzt sowohl Gemeinsamkeiten als auch Unterschiede zur Skelettmuskulatur.", answer: true, explanation: "Herzmuskulatur ist histologisch quergestreift wie Skelettmuskulatur, aber unwillkuerlich gesteuert wie glatte Muskulatur. Darueber hinaus haben Herzmuskelzellen Glanzstreifen (Disci intercalares) mit Gap Junctions, die eine synchrone Erregungsausbreitung im ganzen Herz ermoeglichen." }
    ],
    bossQuestions: [{ id: "mu_art_b1", type: "true_false", statement: "Eine saubere Abgrenzung der Muskelarten ist fuer Physiologie- und Pathologiefragen zentral.", answer: true }],
    combatQuestions: [
      { id: "mu_art_mc1", type: "mc", question: "Welche Muskelart ist histologisch quergestreift UND unwillkuerlich gesteuert?", options: [
        { text: "Herzmuskulatur", correct: true },
        { text: "Skelettmuskulatur", correct: false },
        { text: "Glatte Muskulatur", correct: false },
        { text: "Alle drei Muskelarten gleichermassen", correct: false }
      ]},
      { id: "mu_art_mc2", type: "mc", question: "Wo kommt glatte Muskulatur vor?", options: [
        { text: "In Hohlorganen wie Darm, Blutgefaessen und Harnblase", correct: true },
        { text: "Ausschliesslich im Herzmuskel", correct: false },
        { text: "In Skelettmuskeln als Teil der Muskelfasern", correct: false },
        { text: "Nur in der Haut (Arrector pili)", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "bewegungsmoeglichkeiten",
    title: "Bewegungsmoeglichkeiten",
    phase1: {
      soil: { statement: "Muskeln erzeugen Bewegungen entlang anatomischer Achsen und Ebenen.", answer: true, solution: "Muskeln erzeugen Bewegungen in anatomisch definierten Achsen und Ebenen: Flexion/Extension verlaufen in der Sagittalebene, Abduktion/Adduktion in der Frontalebene und Rotation um die Laengsachse des Koerpers. Diese Systematik erlaubt die praezise Beschreibung jeder Muskelbewegung." },
      seed: { statement: "Flexion und Extension beschreiben dieselbe Bewegungsrichtung.", answer: false, solution: "Flexion und Extension sind entgegengesetzte Bewegungen: Flexion verringert den Gelenkwinkel (Beugung, z.B. Ellenbogen anwinkeln), Extension vergrossert ihn (Streckung, z.B. Arm ausstrecken). Beide verlaufen in der Sagittalebene um eine Transversalachse." },
      water: { statement: "Muskelwirkung wird funktionell ueber Ursprung, Ansatz und Zugrichtung erklaert.", answer: true, solution: "Ursprung (meist am weniger beweglichen Knochen) und Ansatz (am beweglichen Knochen) bestimmen die Zugrichtung des Muskels. Durch die Lage von Ursprung und Ansatz relativ zum Gelenk laesst sich die Bewegungsrichtung und der Hebelarm ableiten." }
    },
    harvestQuestions: [
      { id: "mu_bew_h1", type: "true_false", statement: "Abduktion und Adduktion sind gegenlaeufige Bewegungen.", answer: true, explanation: "Abduktion (vom Koerper weg) und Adduktion (zur Koerpermitte hin) sind antagonistische Bewegungen in der Frontalebene um eine sagittale Achse. Agonist und Antagonist muessen aufeinander abgestimmt sein: Beim Arm-Heben (Abduktion) muss der Adduktor aktiv nachgeben." },
      { id: "mu_bew_h2", type: "true_false", statement: "Die Zugrichtung eines Muskels hat keinen Einfluss auf die Bewegungswirkung.", answer: false, explanation: "Die Zugrichtung ist der entscheidende Faktor: Liegt Ursprung kaudal und Ansatz kranial des Gelenks, fuehrt Kontraktion zu Flexion; liegt er ventral, fuehrt er zu Extension oder Rotation. Ein geringfuegig veraenderter Ansatzpunkt kann die Bewegungswirkung komplett veraendern." },
      { id: "mu_bew_h3", type: "true_false", statement: "Bewegungsbegriffe dienen der standardisierten funktionellen Beschreibung.", answer: true, explanation: "Standardisierte Bewegungsbegriffe (Flexion, Extension, Abduktion, Adduktion, Rotation, Pronation, Supination etc.) ermöglichen praezise klinische Befunderhebung und Kommunikation. 'Eingeschraenkte Aussenrotation des Schultergelenks' ist anatomisch praezise und klinisch sofort verwertbar." }
    ],
    bossQuestions: [{ id: "mu_bew_b1", type: "true_false", statement: "Klinische Bewegungsbefunde lassen sich nur mit korrekter Bewegungsnomenklatur sauber deuten.", answer: true }],
    combatQuestions: [
      { id: "mu_bew_mc1", type: "mc", question: "Was bezeichnet Abduktion?", options: [
        { text: "Bewegung eines Koerperteils von der Koerpermitte weg", correct: true },
        { text: "Bewegung eines Koerperteils zur Koerpermitte hin", correct: false },
        { text: "Beugung (Verkleinerung des Gelenkwinkels)", correct: false },
        { text: "Streckung (Vergroesserung des Gelenkwinkels)", correct: false }
      ]},
      { id: "mu_bew_mc2", type: "mc", question: "Was beschreibt der Begriff Pronation?", options: [
        { text: "Einwaertsdrehung des Unterarms (Handteller zeigt nach unten)", correct: true },
        { text: "Auswaertsdrehung des Unterarms (Supination)", correct: false },
        { text: "Plantarflexion des Fusses", correct: false },
        { text: "Seitwaertsneigung der Wirbelsaeule", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "kopfmuskulatur",
    title: "Muskulatur des Kopfes",
    phase1: {
      soil: { statement: "Zur Kopfmuskulatur gehoeren unter anderem mimische Muskulatur und Kaumuskulatur.", answer: true, solution: "Kopfmuskulatur umfasst zwei funktionell verschiedene Gruppen: Die mimische Muskulatur (innerviert durch N. facialis, VII) bewegt Gesichtshaut fuer Ausdruck und Kommunikation, die Kaumuskulatur (innerviert durch N. trigeminus, V) erzeugt die Kraft fuer Kieferbewegungen und Nahrungszerkleinerung." },
      seed: { statement: "Mimische Muskulatur hat keinen Bezug zu alltagsrelevanten Funktionen.", answer: false, solution: "Mimik und Ausdruck sind funktionell direkt davon abhaengig." },
      water: { statement: "Kaumuskeln sind fuer Kraftentwicklung bei der Nahrungszerkleinerung zentral.", answer: true, solution: "Die Kaumuskulatur – M. masseter, M. temporalis und Mm. pterygoidei, alle innerviert durch N. trigeminus (V3) – erzeugt die Bisskraft und fuehrt Kieferschluss, Mahlbewegungen und Protraktion aus. Der M. masseter gilt als einer der staerksten Muskeln relativ zu seiner Groesse im ganzen Koerper." }
    },
    harvestQuestions: [
      { id: "mu_kopf_h1", type: "true_false", statement: "Mimische Muskulatur ist eng mit Gesichtsbewegungen verknuepft.", answer: true, explanation: "Die mimische Muskulatur unterscheidet sich von anderen Skelettmuskeln: Statt Knochen-Knochen inserieren die Muskeln in Haut und Unterhautgewebe und bewegen damit direkt die Gesichtshaut. Alle werden durch N. facialis (VII) innerviert – eine Fazialisparese fuehrt zum halbseitigen Ausfall der Mimik." },
      { id: "mu_kopf_h2", type: "true_false", statement: "Kaumuskeln spielen bei Kieferbewegungen keine Rolle.", answer: false, explanation: "Die Kaumuskulatur erzeugt alle Kieferbewegungen: M. masseter und M. temporalis fuehren den Kieferschluss aus, Mm. pterygoidei ermöglichen Mahlbewegungen und Unterkieferprotraktion. Der M. masseter gilt als einer der staerksten Muskeln des Koerpers relativ zu seiner Groesse." },
      { id: "mu_kopf_h3", type: "true_false", statement: "Topographisches Verstaendnis ist fuer die Kopfmuskulatur wichtig.", answer: true, explanation: "Fuer klinische Fragen (Fazialisparese, Kaustoerungen, Trigeminusneuralgie) muss bekannt sein, welche Muskeln wo liegen, welchen Nerv sie empfangen und welche Bewegungen sie ausfuehren. Die Kopfmuskeln sind eng mit N. facialis (VII, mimisch) und N. trigeminus V3 (Kaumuskulatur) verknuepft." }
    ],
    bossQuestions: [{ id: "mu_kopf_b1", type: "true_false", statement: "Kopfmuskelthemen verbinden Funktion, Innervation und klinische Relevanz.", answer: true }],
    combatQuestions: [
      { id: "mu_kopf_mc1", type: "mc", question: "Welchem Hirnnerv unterliegt die mimische Muskulatur?", options: [
        { text: "Nervus facialis (VII)", correct: true },
        { text: "Nervus trigeminus (V)", correct: false },
        { text: "Nervus hypoglossus (XII)", correct: false },
        { text: "Nervus vagus (X)", correct: false }
      ]},
      { id: "mu_kopf_mc2", type: "mc", question: "Welcher Muskel gilt als staerkster Kaumuskel?", options: [
        { text: "Musculus masseter", correct: true },
        { text: "Musculus temporalis", correct: false },
        { text: "Musculus pterygoideus medialis", correct: false },
        { text: "Musculus buccinator", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "rumpfmuskulatur",
    title: "Hals-, Thorax-, Bauch- und Rueckenmuskulatur",
    phase1: {
      soil: { statement: "Die Rumpfmuskulatur stabilisiert den Koerper und unterstuetzt Haltung sowie Atmung.", answer: true, solution: "Die autochthone Rueckenmuskulatur sichert als tiefliegende Schicht die Wirbelsegmente segmental; oberflaechennahe Schichten fuehren Rumpfbewegungen aus. Bauchmuskeln erhoehen den intraabdominellen Druck und unterstuetzen die Ausatmung. Thoraxmuskeln integrieren Haltungs- und Atemfunktion in einem System." },
      seed: { statement: "Ruecken- und Bauchmuskulatur wirken niemals als funktionelle Gegenspieler.", answer: false, solution: "Ruecken- und Bauchmuskeln sind klassische Antagonisten: Rueckenmuskeln strecken (Extension) und stabilisieren die Wirbelsaeule, Bauchmuskeln beugen den Rumpf (Flexion). Dieses Gegenspiel regelt die Haltung und kontrolliert alle Rumpfbewegungen in der Sagittalebene." },
      water: { statement: "Teile der Thoraxmuskulatur haben wesentliche Funktionen in der Atemmechanik.", answer: true, solution: "Die Mm. intercostales externi heben die Rippen bei der Einatmung (Thoraxerweiterung), die Mm. intercostales interni senken sie bei forc­ierter Ausatmung. Bei hohem Atemzug­volumen aktiviert der Koerper Atemhilfsmuskeln: M. sternocleidomastoideus und Mm. scaleni heben den Brustkorb zusaetzlich an." }
    },
    harvestQuestions: [
      { id: "mu_rumpf_h1", type: "true_false", statement: "Rumpfmuskulatur ist fuer Haltungskontrolle wesentlich.", answer: true, explanation: "Die tiefen autochthonen Rueckenmuskeln halten die Wirbelsaeule segmental aufgerichtet und sind auch in Ruhe aktiv (Grundtonus). Waehrend Bewegungen stabilisieren diese Muskeln die Wirbelsegmente reflexartig, bevor oberflaechennahe Schichten die eigentliche Bewegung ausfuehren." },
      { id: "mu_rumpf_h2", type: "true_false", statement: "Bauchmuskeln haben keinen Einfluss auf Rumpfbewegungen.", answer: false, explanation: "Bauchmuskeln fuehren verschiedene Rumpfbewegungen aus: M. rectus abdominis bewirkt Rumpfflexion, Mm. obliqui ermöglichen Rotation und seitliche Neigung. Zusaetzlich erhoehen alle Bauchmuskeln bei Kontraktion den Bauchinnendruck (Bauchpresse), wichtig fuer Defaekation, Miktion und Entbindung." },
      { id: "mu_rumpf_h3", type: "true_false", statement: "Rumpfmuskelwissen ist auch fuer atembezogene Fragen relevant.", answer: true, explanation: "Mm. intercostales externi heben die Rippen bei Inspiration. Bei forcierter Ausatmung ziehen Bauchmuskeln und Mm. intercostales interni die Rippen aktiv nach unten. Atemhilfsmuskeln (M. sternocleidomastoideus, Mm. scaleni) werden bei Atemnot hinzugeschaltet." }
    ],
    bossQuestions: [{ id: "mu_rumpf_b1", type: "true_false", statement: "Funktion der Rumpfmuskulatur ergibt sich aus dem Zusammenspiel vieler Muskelgruppen.", answer: true }],
    combatQuestions: [
      { id: "mu_rumpf_mc1", type: "mc", question: "Welche Muskeln gehoeren zur primaeren inspiratorischen Atemhilfsmuskulatur?", options: [
        { text: "M. sternocleidomastoideus und Mm. scaleni", correct: true },
        { text: "M. rectus abdominis und M. obliquus externus", correct: false },
        { text: "Mm. intercostales interni", correct: false },
        { text: "M. erector spinae", correct: false }
      ]},
      { id: "mu_rumpf_mc2", type: "mc", question: "Welche Funktion hat der M. rectus abdominis?", options: [
        { text: "Rumpfbeugung (Flexion) und Erhoehung des Bauchdrucks", correct: true },
        { text: "Rumpfstreckung und Unterstuetzung der Inspiration", correct: false },
        { text: "Ausschliesslich seitliche Rumpfneigung zur rechten Seite", correct: false },
        { text: "Passive Bauchdeckenstabilisierung ohne Kraftentfaltung", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "extremitaetenmuskulatur",
    title: "Schulter-, Arm-, Hueft- und Beinmuskulatur",
    phase1: {
      soil: { statement: "Die Extremitaetenmuskulatur wird topographisch und funktionell nach Regionen gegliedert.", answer: true, solution: "Die obere Extremitaet wird in Schulter-, Ober- und Unterarmmuskulatur unterteilt; die untere in Hueft-, Oberschenkel- und Unterschenkelmuskulatur. Diese regionale Gliederung ermoeglicht gezielte Funktionszuordnung: Welche Muskeln steuern welches Gelenk und in welche Richtung?" },
      seed: { statement: "Muskeln der unteren Extremitaet dienen ausschliesslich der Feinkoordination, nicht der Lastaufnahme.", answer: false, solution: "Die untere Extremitaet traegt das Koerpergewicht und ermoeglicht Fortbewegung. Grosser Gluteus, Oberschenkelstrecker (M. quadriceps) und Wadenmuskulatur entwickeln dabei erhebliche Kraefte fuer Stand, Gehen, Laufen und Treppensteigen – das Gegenteil von Feinkoordination." },
      water: { statement: "Auch in den Extremitaeten gilt das Prinzip aus Ursprung, Ansatz und Bewegungswirkung.", answer: true, solution: "Jeder Extremitaetenmuskel laesst sich funktionell erschliessen ueber: Ursprung (proximaler Knochen), Ansatz (distaler Knochen), ueberspielte Gelenke und Zugrichtung. Daraus ergibt sich unmittelbar die primaere Bewegungswirkung – z.B. M. biceps brachii: Ursprung Schulterblatt, Ansatz Radius, Wirkung Ellbogenflexion + Supination." }
    },
    harvestQuestions: [
      { id: "mu_ext_h1", type: "true_false", statement: "Schulter- und Hueftregion enthalten funktionell komplexe Muskelgruppen.", answer: true, explanation: "Schulter und Hueftgelenk sind Kugelgelenke mit vielen Freiheitsgraden – entsprechend komplex ist die Muskelarchitektur. Die Rotatorenmanschette (M. supraspinatus, infraspinatus, teres minor, subscapularis) stabilisiert das Schultergelenk; die Gesaessmuskulatur (Mm. glutei) stabilisiert das Becken und steuert Hueftbewegungen." },
      { id: "mu_ext_h2", type: "true_false", statement: "Die Beinmuskulatur ist fuer Fortbewegung nur von untergeordneter Bedeutung.", answer: false, explanation: "Die Beinmuskulatur ist die kraftreichste des Koerpers: M. quadriceps femoris streckt das Knie (Treppensteigen, Aufstehen), M. gluteus maximus extendiert die Hueftgelenke und bremst den Koerperschwerpunkt beim Gehen. Diese Muskeln tragen das Koerpergewicht und erzeugen die Vorwaertsbewegung." },
      { id: "mu_ext_h3", type: "true_false", statement: "Regionale Muskelkenntnis ist fuer klinische Funktionspruefung relevant.", answer: true, explanation: "Klinische Muskelfunktionspruefungen pruefen gezielt einzelne Muskeln oder Muskelgruppen auf Kraft und Koordination. Dabei muss bekannt sein, welcher Muskel welche Bewegung ausfuehrt und welchem Nerv er unterliegt – z.B. M. deltoideus (Schulterabduktion, N. axillaris)." }
    ],
    bossQuestions: [{ id: "mu_ext_b1", type: "true_false", statement: "Extremitaetenmuskulatur verlangt die Verknuepfung von Topographie und Bewegungsfunktion.", answer: true }],
    combatQuestions: [
      { id: "mu_ext_mc1", type: "mc", question: "Welcher Muskel ist der staerkste Kniestrecker?", options: [
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
    id: "atmungssystem_ueberblick",
    title: "Atmungssystem: Ueberblick",
    contextHint: "Studienbrief 1035 Strukturen und Funktion des Atmungssystems",
    phase1: {
      soil: { statement: "Das Atmungssystem ist zustaendig fuer die Sauerstoffzufuhr und den Abtransport gasfoermiger Stoffwechselendprodukte wie Kohlendioxid.", answer: true, solution: "Das Atmungssystem hat die Hauptaufgabe, Sauerstoff (O2) aus der Atemluft ins Blut aufzunehmen und das Stoffwechselendprodukt Kohlendioxid (CO2) abzugeben. Dieser Gasaustausch erfolgt in den Alveolen der Lunge durch passive Diffusion entlang von Partialdruckunterschieden." },
      seed: { statement: "Zu den oberen Atemwegen gehoert die Luftroehre (Trachea).", answer: false, solution: "Die Trachea gehoert zu den unteren Atemwegen. Obere Atemwege sind Nase, Nasennebenhoehllen und Rachenraum." },
      water: { statement: "Der eigentliche Ort des Gasaustauschs ist die Lunge, nicht die luftleitenden Atmungsorgane.", answer: true, solution: "Nase, Rachen, Kehlkopf, Trachea und Bronchien leiten nur Luft, ohne selbst am Gasaustausch beteiligt zu sein. Der Gasaustausch findet ausschliesslich in den ca. 300 Millionen Alveolen der Lunge statt, die mit ihrer duennen Membran und grossen Flaeche (50–100 m²) ideal fuer Diffusion sind." }
    },
    harvestQuestions: [
      { id: "at_ue_h1", type: "true_false", statement: "Die Nase gehoert zu den oberen Atemwegen.", answer: true, explanation: "Die oberen Atemwege umfassen Nase (mit Nasenmuscheln und -nebenhoehllen), Nasopharynx und Mundhoehlein ihrer Funktion als Atemweg. Sie konditionieren die Atemluft (Waermung, Befeuchtung, Filtration), bevor sie die unteren Atemwege erreicht." },
      { id: "at_ue_h2", type: "true_false", statement: "Bronchien und Bronchiolen gehoeren zu den oberen Atemwegen.", answer: false, explanation: "Bronchien und Bronchiolen gehoeren zu den unteren Atemwegen. Die Grenze liegt am Kehlkopf. Zu den unteren Atemwegen zaehlen: Kehlkopf (Larynx), Luftroehre (Trachea) und der gesamte Bronchialbaum bis zu den Alveolen." },
      { id: "at_ue_h3", type: "true_false", statement: "Am Kehlkopf (Larynx) befindet sich der Uebergang von den oberen zu den unteren Atemwegen.", answer: true, explanation: "Der Kehlkopf (Larynx) bildet die anatomische Grenze zwischen oberen und unteren Atemwegen. Er hat zwei Schluessselfunktionen: Schutz der unteren Atemwege beim Schlucken (Epiglottis) und Stimmbildung (Phonation durch Schwingung der Stimmbaender)." }
    ],
    bossQuestions: [{ id: "at_ue_b1", type: "true_false", statement: "Das Atmungssystem wird in obere und untere Atemwege unterteilt, die unterschiedliche Strukturen umfassen.", answer: true }],
    combatQuestions: [
      { id: "at_ue_mc1", type: "mc", question: "Welche Strukturen gehoeren zu den OBEREN Atemwegen?", options: [
        { text: "Nase, Nasennebenhoehllen und Rachenraum", correct: true },
        { text: "Trachea und Hauptbronchien", correct: false },
        { text: "Lunge und Bronchiolen", correct: false },
        { text: "Kehlkopf und Trachea", correct: false }
      ]},
      { id: "at_ue_mc2", type: "mc", question: "Wo findet der eigentliche Gasaustausch statt?", options: [
        { text: "In den Alveolen der Lunge", correct: true },
        { text: "In der Trachea", correct: false },
        { text: "In den Hauptbronchien", correct: false },
        { text: "In den Nasenmuscheln", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "nase_und_nnh",
    title: "Nase und Nasennebenhoehlen",
    contextHint: "Studienbrief 1035 Strukturen und Funktion des Atmungssystems",
    phase1: {
      soil: { statement: "Die Nasennebenhoehllen sind paarig angeordnet und werden in vier Typen unterteilt.", answer: true, solution: "Die vier paarigen Nasennebenhoehllen – Stirnhoehle (Sinus frontalis), Keilbeinhoehlel (Sinus sphenoidalis), Siebbeinzellen (Cellulae ethmoidales) und Kieferhoehle (Sinus maxillaris) – sind mit der Nasenhoehlel verbunden. Sie dienen der Gewichtsverminderung des Schaedels, als Resonanzraeume und vergroessern die Schleimhautoberflaehe." },
      seed: { statement: "Die Nase hat ausschliesslich eine luftleitende Funktion ohne Filterwirkung oder Befeuchtung.", answer: false, solution: "Die Nase filtert, waermt, befeuchtet die Luft und dient als Riechorgan und unterstuetzt den Sprechvorgang." },
      water: { statement: "Die Nase waermt und befeuchtet die eingeatmete Luft und dient als Riechorgan.", answer: true, solution: "Die Nase bereitet die eingeatmete Luft fuer die Lunge auf: Sie waermt sie auf Koerpertemperatur, befeuchtet sie auf nahezu 100 % Luftfeuchtigkeit und filtert Staub und Keime durch Nasenhaare und Schleimhaut. Zusaetzlich traegt die Nase ueber das Riechepithel zur Geruchswahrnehmung bei." }
    },
    harvestQuestions: [
      { id: "at_nnh_h1", type: "true_false", statement: "Es gibt vier Nasennebenhoehllen: Stirnhoehle, Keilbeinhoehlel, Siebbeinzellen und Kieferhoehlel.", answer: true, explanation: "Die vier paarigen Nasennebenhoehllen entstehen durch Ausbuchtungen der Nasenhoehlenschleimhaut in die umgebenden Schaedelknochen: Stirnhoehlel, Keilbeinhoehlel, Siebbeinzellen und Kieferhoehlel. Alle muenden in die Nasenhoehle und koennen sich bei Schleimhautschwellung entzuenden (Sinusitis)." },
      { id: "at_nnh_h2", type: "true_false", statement: "Die Nasenmuscheln (Conchae) unterteilen jede Nasenhoehlhaelfte in zwei Gaenge.", answer: false, explanation: "Drei Nasenmuscheln (Concha nasalis inferior, media, superior) teilen jede Nasenhoehlhaelfte in vier Gaenge: Unteren, mittleren, oberen und den gemeinsamen Nasengang. Nicht zwei, sondern vier Gaenge entstehen durch die drei Muschelplatten." },
      { id: "at_nnh_h3", type: "true_false", statement: "Die inneren Oeffnungen der Nase in den Rachenraum werden als Choanae bezeichnet.", answer: true, explanation: "Die Choanae sind die hinteren Oeffnungen der Nasenhoehle in den Nasopharynx (Epipharynx). Im Gegensatz dazu sind die Nares die aeusseren Nasenoefffnungen. Eine angeborene Choanalatresie fuehrt beim Neugeborenen zu Atembehinderung, da Neugeborene obligate Nasenatmer sind." }
    ],
    bossQuestions: [{ id: "at_nnh_b1", type: "true_false", statement: "Nasennebenhoehllen dienen u.a. der Gewichtsverminderung des Schaedels, als Resonanzraum und zur Vergroesserung der Schleimhautoberflaech.", answer: true }],
    combatQuestions: [
      { id: "at_nnh_mc1", type: "mc", question: "Welche vier Nasennebenhoehllen werden unterschieden?", options: [
        { text: "Stirnhoehlel, Keilbeinhoehlel, Siebbeinzellen und Kieferhoehlel", correct: true },
        { text: "Stirnhoehlel, Schlaefenhoehlel, Kieferhoehlel und Wangenhoehlel", correct: false },
        { text: "Vordere, mittlere, hintere und tiefe Nasennebenhoehlel", correct: false },
        { text: "Siebbein-, Keilbein-, Stirn- und Jochbeinhoehlel", correct: false }
      ]},
      { id: "at_nnh_mc2", type: "mc", question: "Was bezeichnen die Choanae?", options: [
        { text: "Die inneren Oeffnungen der Nasenhoehlele in den Rachenraum", correct: true },
        { text: "Die Nasenmuscheln (Conchae nasales)", correct: false },
        { text: "Die aeusseren Nasenoefffnungen (Nares)", correct: false },
        { text: "Die Ausfuehrungsganege der Nasennebenhoehllen", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "rachenraum",
    title: "Rachenraum",
    contextHint: "Studienbrief 1035 Strukturen und Funktion des Atmungssystems",
    phase1: {
      soil: { statement: "Der Rachen (Pharynx) wird in drei Abschnitte unterteilt: Epipharynx, Mesopharynx und Hypopharynx.", answer: true, solution: "Der Rachen gliedert sich in drei Etagen: Epipharynx (Nasenpharynx, hinter der Nase), Mesopharynx (Mundpharynx, hinter dem Mund als Kreuzungspunkt von Luft- und Speiseweg) und Hypopharynx (Kehlkopfpharynx, vor dem Kehlkopf). Jeder Abschnitt steht mit unterschiedlichen Strukturen in Verbindung." },
      seed: { statement: "Der Mesopharynx steht ausschliesslich mit der Nasenhoehlein Verbindung und hat keinen Bezug zur Mundhoehlele.", answer: false, solution: "Der Mesopharynx (Pars oralis) steht mit der Mundhoehlele in Verbindung, der Epipharynx mit der Nase." },
      water: { statement: "Das lymphatische Gewebe im Bereich des Rachens bildet den sogenannten Waldeyer-Rachenring.", answer: true, solution: "Der Waldeyer-Rachenring ist eine ringfoermige Anordnung von Lymphgewebe: Rachenmandel (Tonsilla pharyngea), Gaumenmandeln (Tonsillae palatinae) und Zungenmandel (Tonsilla lingualis). Dieses lymphatische Gewebe bildet eine erste Immunbarriere an der Eintrittspforte der Atemluft." }
    },
    harvestQuestions: [
      { id: "at_ra_h1", type: "true_false", statement: "Der Epipharynx (Pars nasalis) steht ueber die Choanae mit der Nase in Verbindung.", answer: true, explanation: "Der Epipharynx nimmt Luft aus den Choanae auf und steht seitlich mit der Tuba auditiva (Eustachische Roehre) in Verbindung, die zum Mittelohr fuehrt. Bei Rachenentzuendungen kann daher gleichzeitig eine Mittelohrbeteiligung auftreten." },
      { id: "at_ra_h2", type: "true_false", statement: "Der Hypopharynx gehoert ausschliesslich zu den Atemwegen und hat keinerlei Verbindung zum Speiseweg.", answer: false, explanation: "Der Hypopharynx (Pars laryngea) ist die Kreuzungsstelle von Atemweg und Speiseweg: Anterior liegt der Kehlkopfeingang, posterior die Speiseroehre. Beim Schlucken muss die Epiglottis den Kehlkopfeingang sichern, um Aspiration zu verhindern." },
      { id: "at_ra_h3", type: "true_false", statement: "Tonsilla pharyngea, Tonsilla palatina und Tonsilla lingualis gehoeren zum Waldeyer-Rachenring.", answer: true, explanation: "Der Waldeyer-Rachenring bildet eine ringfoermige Immunbarriere: Rachenmandel (adenoide Vegetationen im Dach des Epipharynx), Gaumenmandeln (seitlich im Mesopharynx) und Zungenmandel (Zungenbasis). Sie filtern Keime aus Atemluft und Nahrung und gehoeren zum lymphatischen System." }
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
        { text: "Choanae, Fauces und Epiglottis", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "kehlkopf",
    title: "Kehlkopf (Larynx)",
    contextHint: "Studienbrief 1035 Strukturen und Funktion des Atmungssystems",
    phase1: {
      soil: { statement: "Der Kehlkopf liegt am Uebergang von den oberen zu den unteren Atemwegen und verbindet den Hypopharynx mit der Trachea.", answer: true, solution: "Der Kehlkopf bildet das Bindeglied zwischen oberem Atemweg und Trachea. Seine strategische Lage ermoeglicht zwei Schluesstelfunktionen: Schutz der Atemwege beim Schlucken (Epiglottis verschliesst den Kehlkopf) und Lauterzeugung durch Schwingung der Stimmbaender." },
      seed: { statement: "Das Kehlkopfgeruest besteht ausschliesslich aus elastischem Knorpel ohne Baender.", answer: false, solution: "Das Kehlkopfgeruest besteht aus neun Knorpeln – ueberwiegend hyaliner Knorpel (z.B. Schildknorpel, Ringknorpel) und etwas elastischer Knorpel (Epiglottis). Baender verbinden die Knorpel und sichern deren Lage und Beweglichkeit zueinander." },
      water: { statement: "Der Kehlkopf dient der Lauterzeugung (Phonation) und verschliesst die Atemwege beim Schlucken.", answer: true, solution: "Waehrend des Schluckens kippt die Epiglottis nach hinten und verschliesst den Eingang zur Trachea, um Aspiration zu verhindern. Bei der Phonation schwingen die echten Stimmbaender zwischen Stell- und Schildknorpel im Luftstrom und erzeugen so den Stimmklang." }
    },
    harvestQuestions: [
      { id: "at_kk_h1", type: "true_false", statement: "Der Schildknorpel (Cartilago thyroidea) ist der groesste Knorpel des Kehlkopfes.", answer: true, explanation: "Der Schildknorpel bildet den vorderen und seitlichen Knorpelmantel des Kehlkopfes. Sein prominenter Vordervorsprung ist beim Mann gut tastbar (Adamsapfel, Prominentia laryngea). Er bildet den vorderen Verankerungspunkt der Stimmbaender." },
      { id: "at_kk_h2", type: "true_false", statement: "Der Ringknorpel (Cartilago cricoidea) bildet die Basis, auf der alle anderen Kehlkopfknorpel ruhen.", answer: true, explanation: "Der Ringknorpel ist der einzige Kehlkopfknorpel mit einem vollstaendig geschlossenen Knorpelring. Als unterste Struktur des Kehlkopfes bildet er die Basis fuer Schildknorpel und Stellknorpel und geht kaudal direkt in die erste Trachealspange ueber." },
      { id: "at_kk_h3", type: "true_false", statement: "Die Stimmritze (Rima glottidis) befindet sich zwischen den falschen Stimmbaendern.", answer: false, explanation: "Die Stimmritze (Rima glottidis) liegt zwischen den echten Stimmbaendern (Plicae vocales), nicht zwischen den falschen Stimmbaendern (Plicae vestibulares). Die falschen Stimmbaender befinden sich kranial der echten und bilden das Vestibulum laryngis." }
    ],
    bossQuestions: [{ id: "at_kk_b1", type: "true_false", statement: "Der Kehldeckelknorpel (Epiglottis) verhindert beim Schlucken die Aspiration von Nahrung in die Trachea.", answer: true }],
    combatQuestions: [
      { id: "at_kk_mc1", type: "mc", question: "Welcher Knorpel des Kehlkopfes ist der groesste?", options: [
        { text: "Schildknorpel (Cartilago thyroidea)", correct: true },
        { text: "Ringknorpel (Cartilago cricoidea)", correct: false },
        { text: "Stellknorpel (Arytenoidknorpel)", correct: false },
        { text: "Kehldeckelknorpel (Epiglottis)", correct: false }
      ]},
      { id: "at_kk_mc2", type: "mc", question: "Wo liegen die echten Stimmbaender (Plicae vocales)?", options: [
        { text: "Zwischen den Stellknorpeln und dem Schildknorpel", correct: true },
        { text: "Zwischen Epiglottis und Ringknorpel", correct: false },
        { text: "Unterhalb des Ringknorpels", correct: false },
        { text: "Im Mesopharynx zwischen den Gaumenmandeln", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "trachea",
    title: "Luftroehre (Trachea)",
    contextHint: "Studienbrief 1035 Strukturen und Funktion des Atmungssystems",
    phase1: {
      soil: { statement: "Die Luftroehre (Trachea) verbindet den Kehlkopf mit den beiden Hauptbronchien und markiert den Beginn der unteren Atemwege.", answer: true, solution: "Die Trachea leitet Atemluft vom Kehlkopf zu den Hauptbronchien und befoerdert Schleim durch ihr mehrreihiges Flimmerepithel nach oben (mukoziliaere Clearance). Ihre 16–20 hufeisenfoermigen Knorpelspangen verhindern das Kollabieren bei Unterdruck waehrend der Einatmung." },
      seed: { statement: "Die Trachea besteht ausschliesslich aus geschlossenen Knorpelringen ohne membranoeser Rueckwand.", answer: false, solution: "Die Knorpelspangen sind hufeisenfoermig (offen hinten), der hintere Teil ist eine membranose Bandstruktur (Paries membranaceus)." },
      water: { statement: "Die hufeisenfoermigen Knorpelspangen der Trachea verhindern, dass sie bei der Einatmung zusammenfaellt.", answer: true, solution: "Die C-foermigen Knorpelspangen sind vorne und seitlich aus hyalinem Knorpel, hinten offen (Paries membranaceus). Diese offene Rueckseite ermoeglicht der Speiseroehre (direkt hinter der Trachea) beim Schlucken etwas Platz zu beanspruchen, waehrend die Knorpelspangen das Kollabieren bei Unterdruck verhindern." }
    },
    harvestQuestions: [
      { id: "at_tr_h1", type: "true_false", statement: "Die Luftroehre besteht aus 16 bis 20 hufeisenfoermigen Knorpelspangen aus hyalinem Knorpel.", answer: true, explanation: "Die C-foermigen Knorpelspangen verhindern das Kollabieren der Trachea bei Unterdruck waehrend der Inspiration. Die hintere Oeffnung wird durch den Paries membranaceus (Bandstruktur mit glattem Muskel) geschlossen, der beim Schlucken der direkt anliegenden Speiseroehre Platz laesst." },
      { id: "at_tr_h2", type: "true_false", statement: "Die Bifurcatio tracheae bezeichnet die Teilung der Trachea in linken und rechten Hauptbronchus.", answer: true, explanation: "Die Bifurcatio tracheae liegt auf Hoehe des 5. Brustwirbels und teilt die Trachea in rechten und linken Hauptbronchus. Der rechte ist steiler angewinkelt (ca. 25°) als der linke (ca. 45°) – deshalb gelangen aspirierte Fremdkoerper haeufiger in die rechte Lunge." }
    ],
    bossQuestions: [{ id: "at_tr_b1", type: "true_false", statement: "Der Paries membranaceus (hintere Wand der Trachea) besteht aus Baendern mit eingelagerten Muskelfasern.", answer: true }],
    combatQuestions: [
      { id: "at_tr_mc1", type: "mc", question: "Aus welchem Knorpeltyp bestehen die Knorpelspangen der Trachea?", options: [
        { text: "Hyalinem Knorpel", correct: true },
        { text: "Elastischem Knorpel", correct: false },
        { text: "Faserknorpel", correct: false },
        { text: "Knochengewebe", correct: false }
      ]},
      { id: "at_tr_mc2", type: "mc", question: "Was bezeichnet die Bifurcatio tracheae?", options: [
        { text: "Die Aufzweigung der Trachea in linken und rechten Hauptbronchus", correct: true },
        { text: "Den Uebergang vom Kehlkopf zur Trachea", correct: false },
        { text: "Die Teilung der Hauptbronchien in Lappenbronchien", correct: false },
        { text: "Den hufeisenfoermigen Querschnitt der Knorpelspangen", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "bronchialsystem",
    title: "Bronchialsystem",
    contextHint: "Studienbrief 1035 Strukturen und Funktion des Atmungssystems",
    phase1: {
      soil: { statement: "An der Bifurkation (Hoehe 5. Brustwirbel) teilt sich die Trachea in linken und rechten Stammbronchus auf.", answer: true, solution: "An der Bifurcatio tracheae (Hoehe 5. Brustwirbel) teilt sich die Trachea in rechten und linken Stammbronchus. Der rechte ist steiler angewinkelt – weshalb aspirierte Fremdkoerper haeufiger in der rechten Lunge landen – und versorgt drei Lappenbronchien, der linke nur zwei." },
      seed: { statement: "Bronchioli enthalten wie die Stammbronchien einen Knorpelanteil in ihrer Wand.", answer: false, solution: "Die Bronchioli enthalten keinen Knorpelanteil mehr, nur noch glatte Muskulatur." },
      water: { statement: "In den Alveolen findet der Gasaustausch zwischen Alveolarluft und Blut statt.", answer: true, solution: "Die Alveolen sind als Endstrecke des Bronchialbaums der Ort des Gasaustauschs." }
    },
    harvestQuestions: [
      { id: "at_br_h1", type: "true_false", statement: "Die rechte Lunge besitzt drei Lappenbronchien, die linke nur zwei.", answer: true, explanation: "Die rechte Lunge hat drei Lappen (Ober-, Mittel-, Unterlappen), die linke nur zwei (Ober- und Unterlappen), weil links der Herzraum (Impressio cardiaca) Platz beansprucht. Der Mittellappen ist daher ein rein rechtes anatomisches Merkmal." },
      { id: "at_br_h2", type: "true_false", statement: "Die Bronchioli respiratorii enthalten keine Knorpelanteile und werden durch glatte Muskulatur reguliert.", answer: true, explanation: "Ab den Bronchiolen fehlen Knorpelspangen vollstaendig – die Wandstabilitaet wird ausschliesslich durch glatte Muskulatur aufrechterhalten. Diese Muskulatur kann durch das autonome Nervensystem reguliert werden (Adrenalin → Bronchodilatation; Parasympathikus → Bronchokonstriktion), was bei Asthma bronchiale pathologisch relevant ist." },
      { id: "at_br_h3", type: "true_false", statement: "Die Alveolarwand besteht aus mehrschichtigem Plattenepithel.", answer: false, explanation: "Die Alveolarwand besteht aus einschichtigem Plattenepithel (Pneumozyten Typ I fuer Gasaustausch, Typ II fuer Surfactant-Produktion), nicht mehrschichtigem. Ein mehrschichtiges Epithel wuerde die Diffusionsstrecke fuer O2 und CO2 erheblich verlaengern und den Gasaustausch behindern." }
    ],
    bossQuestions: [{ id: "at_br_b1", type: "true_false", statement: "Etwa 300 Millionen Alveolen bilden eine Gesamtaustauschflaeche von 50 bis 100 Quadratmetern.", answer: true }],
    combatQuestions: [
      { id: "at_br_mc1", type: "mc", question: "Wie viele Lappenbronchien hat die rechte Lunge?", options: [
        { text: "Drei (fuer Ober-, Mittel- und Unterlappen)", correct: true },
        { text: "Zwei (fuer Ober- und Unterlappen)", correct: false },
        { text: "Vier", correct: false },
        { text: "Fuenf Lappenbronchien", correct: false }
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
      soil: { statement: "Die rechte Lunge hat drei Lungenlappen, die linke Lunge nur zwei.", answer: true, solution: "Die rechte Lunge hat drei Lappen (Ober-, Mittel-, Unterlappen), die linke nur zwei (Ober-, Unterlappen), da links der Herzraum (Impressio cardiaca) Platz beansprucht. Das Volumenverhaeltnis betraegt daher ca. 4:3 (rechts:links)." },
      seed: { statement: "Der Pleuraspalt ist mit Luft gefuellt und ermoeglicht so die Beweglichkeit der Lunge.", answer: false, solution: "Der Pleuraspalt ist mit seroeser Fluessigkeit gefuellt, nicht mit Luft. Er vermittelt Adhaesionskraefte." },
      water: { statement: "Im Pleuraspalt herrscht stets ein Unterdruck, der dafuer sorgt, dass die Lunge dem Thorax passiv folgt.", answer: true, solution: "Im Pleuraspalt herrscht permanenter Unterdruck, weil elastische Rueckzugskraefte der Lunge und Ausdehnungstendenzen des Thorax einander entgegenwirken. Dieser Unterdruck sorgt dafuer, dass die Lunge den Atembewegungen von Thorax und Zwerchfell passiv folgt, ohne sich selbst aktiv auszudehnen." }
    },
    harvestQuestions: [
      { id: "at_lu_h1", type: "true_false", statement: "Das Verhaeltnis des Lungenvolumens zwischen rechter und linker Lunge betraegt 4:3.", answer: true, explanation: "Die rechte Lunge ist groesser als die linke, weil links der Herzraum (Impressio cardiaca) Platz beansprucht. Das Gewicht betraegt rechts ca. 600 g, links ca. 500 g. Das groessere Volumen rechts erklaert auch, warum aspirierte Fremdkoerper haeufiger in der rechten Lunge landen." },
      { id: "at_lu_h2", type: "true_false", statement: "Die Pleura visceralis (Lungenfell) liegt direkt der Lunge an, waehrend die Pleura parietalis das Rippenfell bildet.", answer: true, explanation: "Die Pleura visceralis ist eng mit der Lungenoberflaeche verwachsen; die Pleura parietalis kleidet den inneren Thoraxraum aus (Rippenfell, Zwerchfellplatte, Mediastinalpleura). Zwischen beiden liegt der kapillaere Pleuraspalt mit seroeser Fluessigkeit." },
      { id: "at_lu_h3", type: "true_false", statement: "Am Lungenhilus treten sowohl Arterien als auch Venen in die Lunge ein.", answer: false, explanation: "Am Lungenhilus treten ein: Hauptbronchus, A. pulmonalis (sauerstoffarmes Blut) und Lymphgefaesse. Die Pulmonalvenen (sauerstoffreiches Blut) verlassen die Lunge am Hilus – sie treten aus, nicht ein. Alle vier Pulmonalvenen muenden in den linken Herzvorhof." }
    ],
    bossQuestions: [{ id: "at_lu_b1", type: "true_false", statement: "Der Pleuraspalt ist mit seroeser Fluessigkeit gefuellt und ermoeglicht durch Adhaesionskraefte die atemabhaengige Lungenbewegung.", answer: true }],
    combatQuestions: [
      { id: "at_lu_mc1", type: "mc", question: "Wie viele Lappen hat die rechte Lunge?", options: [
        { text: "Drei (Ober-, Mittel- und Unterlappen)", correct: true },
        { text: "Zwei (Ober- und Unterlappen)", correct: false },
        { text: "Vier Lappen", correct: false },
        { text: "Einen ungegliederten Lappen", correct: false }
      ]},
      { id: "at_lu_mc2", type: "mc", question: "Was befindet sich im Pleuraspalt?", options: [
        { text: "Seroese Fluessigkeit, die Reibung vermindert und Adhaesionskraefte erzeugt", correct: true },
        { text: "Luft, die den Unterdruck ausgleicht", correct: false },
        { text: "Lymphfluessigkeit zur Immunabwehr", correct: false },
        { text: "Blut aus den Pleuragefaessen", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "atmungsprozess",
    title: "Atmungsprozess",
    contextHint: "Studienbrief 1035 Strukturen und Funktion des Atmungssystems",
    phase1: {
      soil: { statement: "Bei der Inspiration kontrahiert das Diaphragma und flacht in abdominaler Richtung ab, waehrend gleichzeitig die Rippen angehoben werden.", answer: true, solution: "Inspiration ist aktiv: Das Diaphragma kontrahiert und flacht ab (vergrossert den Thoraxraum nach unten), gleichzeitig heben Interkostalmuskeln die Rippen (vergrossert den Thoraxraum nach aussen). Der entstehende Unterdruck zieht Luft in die Lunge." },
      seed: { statement: "Einatmung ist ein rein passiver Vorgang, bei dem die Lunge sich selbststaendig ausdehnt.", answer: false, solution: "Einatmung ist aktiv: Diaphragma und Atemmuskulatur kontrahieren. Die Lunge selbst ist nicht beweglich, sondern folgt passiv." },
      water: { statement: "Das Atemzentrum in der Medulla oblongata steuert die Lungenventilation durch einen rhythmischen Wechsel zwischen Inspiration und Exspiration.", answer: true, solution: "Das Atemzentrum in der Medulla oblongata erzeugt autonom einen Grundrhythmus der Atemtaetigkeit. Dieser Rhythmus wird durch chemische Reize (O2, CO2, pH-Wert) und Mechanorezeptoren (Dehnungsrezeptoren in der Lunge) staendig angepasst." }
    },
    harvestQuestions: [
      { id: "at_ap_h1", type: "true_false", statement: "Waehrend der Exspiration entspannt sich das Diaphragma und woelbt sich in thorakaler Richtung nach oben.", answer: true, explanation: "In Ruhe ist die Ausatmung passiv: Das Diaphragma entspannt sich und woelbt sich durch elastische Retraktionskraefte nach oben zurueck. Dadurch verkleinert sich das Thoraxvolumen, der Druck steigt und Luft stroemt passiv aus der Lunge heraus." },
      { id: "at_ap_h2", type: "true_false", statement: "Die ausgeatmete Luft enthaelt denselben Sauerstoffgehalt wie die eingeatmete Luft von ca. 21%.", answer: false, explanation: "Eingeatmete Luft enthaelt ca. 21% O2, ausgeatmete nur noch ca. 16%. Ca. 5% des eingeatmeten Sauerstoffs wird vom Koerper verbraucht. Umgekehrt steigt der CO2-Gehalt von 0,04% (Aussenluft) auf ca. 4% in der ausgeatmeten Luft." },
      { id: "at_ap_h3", type: "true_false", statement: "Das Atemzentrum befindet sich in der Medulla oblongata und steuert den Grundrhythmus der Atmung.", answer: true, explanation: "Das Atemzentrum in der Medulla oblongata (preBötzinger-Komplex) generiert autonom den Grundrhythmus der Atmung, der auch im Schlaf und Koma weiterlaeuft. Es wird durch Chemorezeptoren (CO2, O2, pH) moduliert und kann durch kortikale Einfluesse willkuerlich ueberlagert werden." }
    ],
    bossQuestions: [{ id: "at_ap_b1", type: "true_false", statement: "Die Lungenventilation besteht aus dem rhythmischen Wechsel zwischen aktiver Inspiration und passiver Exspiration in Ruhe.", answer: true }],
    combatQuestions: [
      { id: "at_ap_mc1", type: "mc", question: "Was geschieht waehrend der Inspiration (Einatmung)?", options: [
        { text: "Das Diaphragma kontrahiert und flacht ab, der Thoraxraum vergroessert sich", correct: true },
        { text: "Das Diaphragma entspannt sich und woelbt sich nach oben", correct: false },
        { text: "Der Thorax verkleinert sich passiv durch Muskelerschlaffung", correct: false },
        { text: "Nur die Rippenmuskeln arbeiten, das Diaphragma bleibt passiv", correct: false }
      ]},
      { id: "at_ap_mc2", type: "mc", question: "Wie hoch ist der CO2-Anteil der ausgeatmeten Luft ungefaehr?", options: [
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
      soil: { statement: "Das Diaphragma (Zwerchfell) ist ein zentraler Atemmuskel, der sowohl bei der Inspiration als auch bei der Exspiration wirkt.", answer: true, solution: "Das Diaphragma ist der wichtigste Atemmuskel und leistet in Ruhe den Grossteil der Atemarbeit. Bei der Inspiration kontrahiert es und flacht ab, bei der Exspiration entspannt es sich und woelbt sich passiv nach oben – durch diesen Wechsel veraendert es staendig das Thoraxvolumen." },
      seed: { statement: "Die aeusseren Zwischenrippenmuskeln (M. intercostales externi) wirken exspiratorisch.", answer: false, solution: "M. intercostales externi wirken inspiratorisch. Exspiratorisch wirken die M. intercostales interni." },
      water: { statement: "Bei Bedarf wird die Atmung durch die Atemhilfsmuskulatur unterstuetzt, die auch als auxiliaere Atemmuskulatur bezeichnet wird.", answer: true, solution: "Atemhilfsmuskulatur wird bei erhoehtem Atembedarf (Belastung, Atemnot) hinzugeschaltet. Dazu gehoeren inspiratorisch z.B. M. sternocleidomastoideus und Mm. scaleni sowie exspiratorisch Bauchmuskeln wie M. rectus abdominis, die die Rippen aktiv nach unten ziehen." }
    },
    harvestQuestions: [
      { id: "at_am_h1", type: "true_false", statement: "Der M. intercostales externus (aeusserer Zwischenrippenmuskel) ist ein inspiratorisch wirkender Atemmuskel.", answer: true, explanation: "Die Mm. intercostales externi verlaufen von posterior-superior nach anterior-inferior. Bei Kontraktion heben sie die Rippen und erweitern den Thoraxdurchmesser seitlich – ein inspiratorischer Effekt. Die Mm. intercostales interni verlaufen umgekehrt und wirken daher exspiratorisch." },
      { id: "at_am_h2", type: "true_false", statement: "Das Diaphragma wirkt ausschliesslich inspiratorisch und hat keine Funktion bei der Ausatmung.", answer: false, explanation: "Das Diaphragma ist der Hauptatemmuskel fuer die Inspiration, hat aber auch passiven Anteil bei der Ausatmung: Es entspannt sich und gibt durch seine Rueckstellkraft Energie frei, die den Thorax verkleinert. Aktiv exspiratorisch wird es nur bei forcierter Ausatmung (Pressen, Husten, Niesen)." }
    ],
    bossQuestions: [{ id: "at_am_b1", type: "true_false", statement: "Diaphragma und M. intercostales externi gehoeren zu den primaeren Atemmuskeln und wirken inspiratorisch.", answer: true }],
    combatQuestions: [
      { id: "at_am_mc1", type: "mc", question: "Welche Muskeln wirken primaer inspiratorisch?", options: [
        { text: "Diaphragma und Mm. intercostales externi", correct: true },
        { text: "Mm. intercostales interni und M. rectus abdominis", correct: false },
        { text: "M. transversus abdominis und M. obliquus internus", correct: false },
        { text: "Nur das Diaphragma, Interkostalmuskeln sind exspiratorisch", correct: false }
      ]},
      { id: "at_am_mc2", type: "mc", question: "Was ist die Atemhilfsmuskulatur?", options: [
        { text: "Zusatzliche Muskeln, die bei erhoehtem Atembedarf aktiviert werden", correct: true },
        { text: "Muskeln, die ausschliesslich bei der Exspiration eingesetzt werden", correct: false },
        { text: "Eine Bezeichnung fuer die Herzmuskulatur im Atembezug", correct: false },
        { text: "Die Rueckenmuskulatur als dauerhafter Atemantagonist", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "gasaustausch",
    title: "Gasaustausch",
    contextHint: "Studienbrief 1035 Strukturen und Funktion des Atmungssystems",
    phase1: {
      soil: { statement: "Als Gasaustausch bezeichnet man den Uebertritt von Sauerstoff aus der Alveolarluft ins Blut und von Kohlendioxid in umgekehrter Richtung.", answer: true, solution: "Als Gasaustausch wird der Stoffaustausch an den Alveolarmembranen bezeichnet: O2 diffundiert aus der Alveolarluft ins Blut (hoher O2-Partialdruck in den Alveolen, niedriger im Blut), CO2 in die entgegengesetzte Richtung. Dieser Prozess erfolgt ausschliesslich durch passive Diffusion ohne Energieverbrauch." },
      seed: { statement: "Der Gasaustausch in der Lunge erfordert aktiven Energieeinsatz der Zellen.", answer: false, solution: "Der Gasaustausch geschieht per Diffusion, also ohne Energieverbrauch." },
      water: { statement: "Den Gasaustausch zwischen Blut und Koerperzellen bezeichnet man als innere Atmung, jenen in der Lunge als aeussere Atmung.", answer: true, solution: "Aeussere Atmung bezeichnet den Gasaustausch zwischen Alveolarluft und Blut in der Lunge, innere Atmung den Gasaustausch zwischen Blut und Koerperzellen im Gewebe. Beide Prozesse verlaufen nach demselben Diffusionsprinzip, aber an unterschiedlichen anatomischen Orten." }
    },
    harvestQuestions: [
      { id: "at_ga_h1", type: "true_false", statement: "Der Gasaustausch findet durch Diffusion statt, also ohne Energieverbrauch.", answer: true, explanation: "O2 diffundiert entlang seines Partialdruckgefaelles aus der Alveolarluft (pO2 ca. 100 mmHg) ins Blut (pO2 ca. 40 mmHg). CO2 diffundiert in umgekehrter Richtung. Diffusion ist passiv – kein ATP erforderlich. Voraussetzung ist eine sehr duenne Diffusionsstrecke (Alveolarmembran <0,5 μm)." },
      { id: "at_ga_h3", type: "true_false", statement: "Die Diffusionskapazitaet beschreibt die Faehigkeit der Lunge zur Aufnahme von Kohlendioxid aus der Luft.", answer: false, explanation: "Die Diffusionskapazitaet (DLCO) beschreibt die Faehigkeit der Lunge, Gase (v.a. O2) aus der Alveolarluft ins Blut aufzunehmen. CO2 wird im Gegenteil aus dem Blut in die Alveolarluft abgegeben. Die DLCO ist klinisch relevant, z.B. vermindert bei Lungenfibrose oder Lungenemphysem." }
    ],
    bossQuestions: [{ id: "at_ga_b1", type: "true_false", statement: "Aeussere und innere Atmung beschreiben zwei verschiedene Orte des Gasaustauschs: Lunge-Blut und Blut-Koerperzellen.", answer: true }],
    combatQuestions: [
      { id: "at_ga_mc1", type: "mc", question: "Durch welchen Mechanismus findet der Gasaustausch in der Lunge statt?", options: [
        { text: "Durch Diffusion entlang von Partialdruckunterschieden", correct: true },
        { text: "Durch aktiven Transport mit Energieverbrauch", correct: false },
        { text: "Durch Osmose ueber die Alveolarmembran", correct: false },
        { text: "Durch Pinozytose der Alveolarzellen", correct: false }
      ]},
      { id: "at_ga_mc2", type: "mc", question: "Was bezeichnet man als 'innere Atmung'?", options: [
        { text: "Den Gasaustausch zwischen Blut und Koerperzellen", correct: true },
        { text: "Den Gasaustausch in den Alveolen der Lunge", correct: false },
        { text: "Die Steuerung der Atmung durch das Atemzentrum", correct: false },
        { text: "Die Atemmuskelaktivitaet bei der Inspiration", correct: false }
      ]}
    ]
  }),
  makeDetailedPlant({
    id: "lungenvolumina_kapazitaeten",
    title: "Lungenvolumina und Lungenkapazitaeten",
    contextHint: "Studienbrief 1035 Strukturen und Funktion des Atmungssystems",
    phase1: {
      soil: { statement: "Das Atemzugsvolumen bezeichnet das normale Ein- bzw. Ausatemvolumen von ca. 500 ml.", answer: true, solution: "Das Atemzugsvolumen (ca. 500 ml) ist die normale ruhige Atemluftmenge bei einem einzigen Atemzug. Es ist das kleinste der vier Lungenvolumina und laesst in beide Richtungen Reserven offen: inspiratorisches Reservevolumen (ca. 2,5 l) und exspiratorisches Reservevolumen (ca. 1,5 l)." },
      seed: { statement: "Das Residualvolumen kann durch maximale Ausatmung vollstaendig aus der Lunge ausgeatmet werden.", answer: false, solution: "Das Residualvolumen verbleibt auch nach maximaler Exspiration in der Lunge - es kann nicht ausgeatmet werden." },
      water: { statement: "Die Vitalkapazitaet setzt sich aus Atemzugsvolumen, inspiratorischem und exspiratorischem Reservevolumen zusammen.", answer: true, solution: "Die Vitalkapazitaet (ca. 4,5 l) ist die maximale Luftmenge, die nach maximaler Einatmung vollstaendig ausgeatmet werden kann – sie ist die nutzbare Atemreserve. Addiert man das Residualvolumen (ca. 1,5 l, bleibt immer in der Lunge), ergibt sich die Totalkapazitaet (ca. 6 l)." }
    },
    harvestQuestions: [
      { id: "at_lv_h1", type: "true_false", statement: "Das Residualvolumen ist die Luftmenge, die auch nach maximaler Exspiration in der Lunge verbleibt.", answer: true, explanation: "Das Residualvolumen (ca. 1,5 l) kann nicht ausgeatmet werden, weil die Atemwege bei starker Exspiration kollabieren wuerden. Es verdünnt den Alveolarsauerstoff zwischen Atemzuegen und verhindert, dass die Alveolen vollstaendig zusammenfallen (Atelektase)." },
      { id: "at_lv_h2", type: "true_false", statement: "Die Totalkapazitaet entspricht der Summe aus Vitalkapazitaet und Residualvolumen.", answer: true, explanation: "Totalkapazitaet (ca. 6 l) = Vitalkapazitaet (ca. 4,5 l) + Residualvolumen (ca. 1,5 l). Die Vitalkapazitaet umfasst Atemzugvolumen + inspiratorisches + exspiratorisches Reservevolumen und ist spirometrisch direkt messbar. Das Residualvolumen kann nur indirekt bestimmt werden." },
      { id: "at_lv_h3", type: "true_false", statement: "Das inspiratorische Reservevolumen (2-3 l) und das exspiratorische Reservevolumen (1,5 l) sind gleich gross.", answer: false, explanation: "Das inspiratorische Reservevolumen (IRV, ca. 2,5 l) ist deutlich groesser als das exspiratorische Reservevolumen (ERV, ca. 1,5 l). Der Thorax kann durch Muskelkraft weiter eingeatmet als ausgeatmet werden, weshalb mehr Inspirationsreserve als Exspirationsreserve besteht." }
    ],
    bossQuestions: [{ id: "at_lv_b1", type: "true_false", statement: "Nur etwa 60% der eingeatmeten Luftmenge gelangt tatsaechlich in die Alveolen; der Rest verbleibt im Totraum.", answer: true }],
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
      soil: { statement: "Die Atemsteuerung findet im Bereich der Medulla oblongata statt und erzeugt einen regelmaessigen Grundrhythmus der Atmung.", answer: true, solution: "Das Atemzentrum in der Medulla oblongata ist eine Ansammlung von Nervenzellen, die autonom und rhythmisch Atemsignale an die Atemmuskulatur senden. Dieser Grundrhythmus laeuft auch unbewusst weiter und wird nur bei bewusster Kontrolle (Sprechen, Tauchen) vom Kortex beeinflusst." },
      seed: { statement: "Der pH-Wert des Blutes hat keinen Einfluss auf die Atemsteuerung.", answer: false, solution: "pH-Wert, Sauerstoff und Kohlendioxid sind die drei Regelgroessen des Atemregelkreises." },
      water: { statement: "Chemorezeptoren messen Sauerstoff- und Kohlendioxidkonzentration und leiten diese Informationen an das Atemzentrum weiter.", answer: true, solution: "Chemorezeptoren im Karotiskoerperchen und in der Medulla oblongata messen kontinuierlich O2- und CO2-Partialdruck sowie pH-Wert des Blutes. Bei Abweichungen wird die Atemfrequenz und -tiefe ueber das Atemzentrum angepasst – ein effektiver Regelkreis zur Konstanterhaltung der Blutgase." }
    },
    harvestQuestions: [
      { id: "at_as_h1", type: "true_false", statement: "Ein erhoehter CO2-Gehalt im Blut (Hyperkapnie) fuehrt zu einer Steigerung der Atemfrequenz.", answer: true, explanation: "CO2 ist der staerkste Atemantrieb: Hyperkapnie senkt den pH-Wert (durch H2CO3-Bildung), was zentrale Chemorezeptoren in der Medulla oblongata stimuliert und die Atemfrequenz sowie -tiefe steigert. Hypoxie wirkt ebenfalls atemsteigernd, aber mit schwacherem Effekt ueber periphere Chemorezeptoren." },
      { id: "at_as_h3", type: "true_false", statement: "Eine Abnahme der Sauerstoffkonzentration im Blut fuehrt zu einer Verlangsamung der Atemfrequenz.", answer: false, explanation: "Eine Abnahme der Sauerstoffkonzentration (Hypoxaemie) fuehrt zu einer Steigerung, nicht Verlangsamung der Atemfrequenz. Periphere Chemorezeptoren in den Karotis- und Aortakoerperchen reagieren auf sinkenden O2-Partialdruck und signalisieren dem Atemzentrum, mehr Atemarbeit zu leisten." }
    ],
    bossQuestions: [{ id: "at_as_b1", type: "true_false", statement: "An der chemischen Atemsteuerung sind Sauerstoff, Kohlendioxid und der pH-Wert des Blutes als Regelgroessen beteiligt.", answer: true }],
    combatQuestions: [
      { id: "at_as_mc1", type: "mc", question: "Welche drei Regelgroessen steuern das Atemzentrum chemisch?", options: [
        { text: "O2-Partialdruck, CO2-Partialdruck und pH-Wert des Blutes", correct: true },
        { text: "Temperatur, Osmolaritaet und Glukosegehalt des Blutes", correct: false },
        { text: "Ausschliesslich der CO2-Gehalt als einzige Regelgroesse", correct: false },
        { text: "Sauerstoff, Stickstoff und Wasserdampfgehalt der Atemluft", correct: false }
      ]},
      { id: "at_as_mc2", type: "mc", question: "Was bewirkt eine Hyperkapnie (erhoehter CO2-Gehalt im Blut)?", options: [
        { text: "Steigerung der Atemfrequenz und -tiefe", correct: true },
        { text: "Verlangsamung der Atmung", correct: false },
        { text: "Atemstillstand", correct: false },
        { text: "Keine Veraenderung der Atemfrequenz", correct: false }
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
      soil: { statement: "Das Diaphragma und die Mm. intercostales gehoeren histologisch zur quergestreiften Skelettmuskulatur.", answer: true, solution: "Korrekt. Atemmuskulatur ist quergestreifte Skelettmuskulatur, erklaert durch 1032 und konkretisiert durch 1035." },
      seed: { statement: "Die Atemmuskulatur besteht aus glatter Muskulatur, die ausschliesslich autonom und ohne bewusste Steuerung arbeitet.", answer: false, solution: "Falsch. Diaphragma und Intercostalmuskeln sind quergestreifte Skelettmuskulatur, sowohl willkuerlich als auch reflektorisch steuerbar." },
      water: { statement: "Die histologische Einordnung der Atemmuskulatur als Skelettmuskulatur erklaert, warum sie sowohl reflektorisch als auch willkuerlich steuerbar ist.", answer: true, solution: "Genau. Quergestreifte Skelettmuskulatur unterliegt dem somatischen Nervensystem, also willkuerlicher und reflektorischer Kontrolle." }
    },
    harvestQuestions: [
      { id: "hyb_hA_h1", type: "true_false", statement: "Die Typisierung des Muskelgewebes ist fuer die Funktionsdeutung wichtig.", answer: true, explanation: "Quergestreifte Skelettmuskulatur ist willkuerlich und schnell steuerbar, glatte Muskulatur ist unwillkuerlich und ausdauernd, Herzmuskulatur ist unwillkuerlich und rhythmisch autonom. Ohne histologische Typisierung bleibt die Funktion eines Muskels unklar." },
      { id: "hyb_hA_h2", type: "true_false", statement: "Der M. sternocleidomastoideus gehoert zur inspiratorisch wirkenden Atemhilfsmuskulatur.", answer: true, explanation: "Der M. sternocleidomastoideus hebt bei beidseitiger Kontraktion das Brustbein und wirkt damit inspiratorisch. Er wird bei Atemnot und intensiver koerperlicher Belastung hinzugeschaltet. Ein sichtbar angespannter Sternocleidomastoideus ist ein klinisches Zeichen von Atemnot." },
      { id: "hyb_hA_h3", type: "true_false", statement: "Das Diaphragma ist histologisch quergestreifte Skelettmuskulatur.", answer: true, explanation: "Das Diaphragma besteht aus quergestreiften Skelettmuskelfasern – trotz seiner unwillkuerlichen Atemfunktion. Das ermoeglicht sowohl reflektorische (durch das Atemzentrum) als auch willkuerliche Steuerung (Sprechen, Singen, Tauchen). Diese Doppelsteuerung erklaert seine funktionelle Vielseitigkeit." }
    ],
    bossQuestions: [{ id: "hyb_hA_b1", type: "true_false", statement: "Atemmuskulatur (Diaphragma, Mm. intercostales) besteht histologisch aus quergestreifter Skelettmuskulatur und unterliegt sowohl willkuerlicher als auch reflektorischer Steuerung.", answer: true }]
  }), { locked: true, sources: ["histologie_1032::muskelgewebe", "atmungssystem_1035::atemmuskulatur"] }),

  Object.assign(makeDetailedPlant({
    id: "hybrid_neuronale_atemsteuerung",
    title: "Neuronale Atemsteuerung",
    contextHint: "Verbindung von Nervengewebe (1032) und Atemsteuerung (1035)",
    phase1: {
      soil: { statement: "Das Atemzentrum in der Medulla oblongata steuert die Atemmuskulatur ueber efferente Nervenfasern.", answer: true, solution: "Das Atemzentrum (preBötzinger-Komplex in der Medulla oblongata) generiert rhythmische Impulse und sendet sie ueber efferente Motoneuronen an Zwerchfell (N. phrenicus) und Interkostalmuskeln. Dieses Zusammenspiel verbindet die Neurophysiologie der Nervenleitung direkt mit der Atemmechanik." },
      seed: { statement: "Atemsteuerung und Nervengewebe sind vollstaendig voneinander unabhaengig: das Atemzentrum arbeitet ohne nervale Strukturen.", answer: false, solution: "Das Atemzentrum besteht aus Nervenzellen und leitet Impulse ueber Nervenfasern weiter. Nervengewebe ist die Grundlage jeder Atemsteuerung." },
      water: { statement: "Dehnungsrezeptoren in den Alveolen leiten Signale ueber afferente Nervenfasern an das Atemzentrum weiter, was den Hering-Breuer-Reflex ausloest.", answer: true, solution: "Genau. Dieser Reflex verbindet mechanische Lungenreize (1035) mit nervaler Signalleitung (1032)." }
    },
    harvestQuestions: [
      { id: "hyb_nA_h1", type: "true_false", statement: "Der Zellaufbau der Nervenzelle ist fuer die Funktionsdeutung relevant.", answer: true, explanation: "Dendriten empfangen Signale, der Axonhuegel integriert sie, das Axon leitet Aktionspotenziale weiter – diese Zellstruktur erklaert, wie das Atemzentrum rhythmische Impulse generiert und an die Atemmuskulatur weiterleitet. Ohne das Verstaendnis der Nervenzellarchitektur bleibt die Atemsteuerung unverstehbar." },
      { id: "hyb_nA_h2", type: "true_false", statement: "Der Hering-Breuer-Reflex begrenzt das Inspirationsvolumen und verhindert die Ueberdehnung der Lunge.", answer: true, explanation: "Beim Hering-Breuer-Reflex messen Dehnungsrezeptoren in der Bronchialwand das Lungenvolumen. Bei ausreichender Dehnung senden sie Signale ueber afferente Vagusfasern an das Atemzentrum, das daraufhin die Inspiration beendet und die Exspiration einleitet. Der Reflex schuetzt die Lunge vor Ueberdehnung." },
      { id: "hyb_nA_h3", type: "true_false", statement: "Das Atemzentrum in der Medulla oblongata nutzt Nervenzellen zur Weiterleitung von Atemimpulsen an die Diaphragmamuskulatur.", answer: true, explanation: "Die Motoneuronen des Atemzentrums senden ihre Impulse ueber den N. phrenicus (C3-C5) zum Diaphragma. Bei Rueckenmarksverletzungen oberhalb C3 ist die Atemmuskulatur vollstaendig gelahmt und Beatmung wird lebensnotwendig – ein direktes Beispiel fuer die klinische Bedeutung dieser nervalen Verbindung." }
    ],
    bossQuestions: [{ id: "hyb_nA_b1", type: "true_false", statement: "Chemorezeptoren leiten Veraenderungen von O2, CO2 und pH-Wert ueber afferente Nervenfasern an das Atemzentrum in der Medulla oblongata weiter.", answer: true }]
  }), { locked: true, sources: ["histologie_1032::nervengewebe", "atmungssystem_1035::atemsteuerung"] }),

  Object.assign(makeDetailedPlant({
    id: "hybrid_sauerstofftransport_blut",
    title: "Sauerstofftransport im Blut",
    contextHint: "Verbindung von Blut als Gewebe (1032) und Gasaustausch (1035)",
    phase1: {
      soil: { statement: "Blut als spezialisiertes Gewebe ist das Transportmedium, das nach dem Gasaustausch in den Alveolen den Sauerstoff zu den Koerperzellen befoerdert.", answer: true, solution: "Korrekt. 1032 definiert Blut als Gewebe, 1035 beschreibt den Gasaustausch in den Alveolen, der diesen Transport erst benoetigt." },
      seed: { statement: "Sauerstoff wird nach dem Gasaustausch direkt im Blutplasma geloest transportiert, ohne Beteiligung von Blutzellen.", answer: false, solution: "Der groesste Teil des Sauerstoffs wird an Haemoglobin in den Erythrozyten gebunden, nicht frei im Plasma geloest." },
      water: { statement: "Der Gasaustausch in den Alveolen und der anschliessende Sauerstofftransport durch Erythrozyten bilden zusammen die aeussere Atmung.", answer: true, solution: "Genau. Aeussere Atmung = Gasaustausch (Lunge) plus Transport (Blut als Gewebe)." }
    },
    harvestQuestions: [
      { id: "hyb_sB_h1", type: "true_false", statement: "Auch fuer Blut sind Zellzusammensetzung und funktionelle Anteile relevant.", answer: true, explanation: "Blut besteht aus Plasma und zellulären Anteilen (Erythrozyten ca. 45%, Leukozyten und Thrombozyten <1%). Die Erythrozyten mit ihrem Haemoglobin sind ausschliesslich fuer den O2-Transport zustaendig. Ohne diese zellulare Differenzierung bleibt die Transportfunktion des Blutes unerklaert." },
      { id: "hyb_sB_h2", type: "true_false", statement: "Fuer den Uebertritt von Sauerstoff aus der Luft in das Blut sind Ventilation, Diffusion und Perfusion entscheidend.", answer: true, explanation: "Drei Voraussetzungen fuer effizienten Gasaustausch: V = Ventilation (Luft muss die Alveolen erreichen), Diffusion (Gasaustausch durch die Membran), Q = Perfusion (Blut muss die Alveolen umspuelen). Stoerungen in einer dieser Komponenten reduzieren die O2-Aufnahme erheblich." },
      { id: "hyb_sB_h3", type: "true_false", statement: "Erythrozyten sind der zellulaere Traeger des Sauerstoffs im Blut nach dem Gasaustausch in den Alveolen.", answer: true, explanation: "Erythrozyten binden O2 an Haemoglobin (je Haemoglobin-Molekuel 4 O2). Nur ca. 3% des O2 werden physikalisch im Plasma geloest. Der Haemoglobin-Transport ist damit etwa 30-mal effizienter. Die Oxyhaemoglobin-Dissoziationskurve beschreibt, wie Haemoglobin O2 in der Lunge aufnimmt und im Gewebe abgibt." }
    ],
    bossQuestions: [{ id: "hyb_sB_b1", type: "true_false", statement: "Blut als spezialisiertes Gewebe (Erythrozyten) und Gasaustausch (Diffusion in Alveolen) sind direkt verknuepft: ohne funktionelles Blutgewebe kein Sauerstofftransport.", answer: true }]
  }), { locked: true, sources: ["histologie_1032::blut", "atmungssystem_1035::gasaustausch"] }),

  Object.assign(makeDetailedPlant({
    id: "hybrid_respiratorisches_epithel",
    title: "Respiratorisches Epithel",
    contextHint: "Verbindung von Oberflaechenepithel (1032) und Luftroehre (1035)",
    phase1: {
      soil: { statement: "Das mehrreihige Flimmerepithel der Trachea ist ein spezialisiertes Oberflaechenepithel der Atemwege.", answer: true, solution: "Korrekt. 1032 beschreibt die Klasse der Oberflaechenepithelien, 1035 nennt das Flimmerepithel als Auskleidung der Trachea." },
      seed: { statement: "Das Flimmerepithel der Atemwege ist strukturell mit dem einfachen Plattenepithel identisch und hat keine Schutzfunktion.", answer: false, solution: "Mehrreihiges Flimmerepithel und einfaches Plattenepithel sind strukturell verschieden. Die Flimmerhaarchen und Becherzellen ermoeglichen aktive Reinigung." },
      water: { statement: "Die Schichtung und Zellausstattung des respiratorischen Epithels (Flimmerhaarchen, Becherzellen) erklaert seine Selbstreinigungsfunktion fuer die Atemwege.", answer: true, solution: "Genau. Struktur erklaert Funktion: das ist der Kerngedanke dieses Hybrids." }
    },
    harvestQuestions: [
      { id: "hyb_rE_h1", type: "true_false", statement: "Die Schichtungsform des Epithels steht im Bezug zur Funktion.", answer: true, explanation: "Einschichtiges Plattenepithel (z.B. Alveolen) erlaubt schnelle Diffusion durch minimale Wanddicke. Mehrschichtiges Plattenepithel (Haut, Mundschleimhaut) bietet Schutzmechanismus. Mehrreihiges Flimmerepithel (Trachea) vereint Schleimhautschutz mit aktiver Selbstreinigung. Die Schichtung folgt stets dem funktionellen Bedarf." },
      { id: "hyb_rE_h2", type: "true_false", statement: "Das Flimmerepithel der Trachea transportiert Schwebeteilchen in Richtung Lunge.", answer: false, explanation: "Das Flimmerepithel transportiert Partikel und Schleim von der Lunge weg – in Richtung Rachen zum Aushusten oder Verschlucken. Dieses mukoziliaere Clearance-System schuetzt die Lunge vor Partikeln und Keimen. Wenn Flimmerhaarchen durch Rauchen geschaedigt werden, versagt dieser Schutz." },
      { id: "hyb_rE_h3", type: "true_false", statement: "Das mehrreihige Flimmerepithel der Trachea gehoert zum Oberflaechenepithel und uebernimmt eine aktive Selbstreinigungsfunktion fuer die Atemwege.", answer: true, explanation: "Das mehrreihige Flimmerepithel (Epithelium pseudostratificatum columnare ciliatum) mit Becherzellen ist der Standardtyp des respiratorischen Epithels. Becherzellen produzieren Schleim, Flimmerhaarchen transportieren ihn mit Keimen und Partikeln nach oben – das mukoziliaere System ist die erste mechanische Abwehrlinie der Atemwege." }
    ],
    bossQuestions: [{ id: "hyb_rE_b1", type: "true_false", statement: "Respiratorisches Epithel (mehrreihiges Flimmerepithel) verbindet histologische Epithelklassifikation mit der Schutzfunktion der Atemwege.", answer: true }]
  }), { locked: true, sources: ["histologie_1032::oberflaechenepithel", "atmungssystem_1035::trachea"] })
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
      { id: "z_rueck",    label: "Rueckenmark",                  left:  2, top: 24, width: 22, height:  8 },
      { id: "z_csf",      label: "Gehirn-Rueckenmark-Fluessigkeit", left: 56, top: 28, width: 32, height: 14 },
      { id: "z_hinter",   label: "Hinterwurzel",                 left:  2, top: 35, width: 22, height:  8 },
      { id: "z_vorder",   label: "Vorderwurzel",                 left:  2, top: 46, width: 22, height:  8 },
      { id: "z_spinal",   label: "Spinalnerv",                   left:  2, top: 72, width: 20, height:  8 },
      { id: "z_gang",     label: "Spinalganglion",               left: 22, top: 72, width: 24, height:  8 },
      { id: "z_wirbel",   label: "Wirbelkoerper",                left: 42, top: 72, width: 22, height:  8 },
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
      { id: "z_buerste",  label: "Bürstensaum",                left:  1, top:  4, width: 20, height: 10 },
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
    id: "roehrenknochen",
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
      { id: "z_wkoerp",  label: "Wirbelkörper der Axis",   left: 54, top: 57, width: 36, height:  9 },
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
      { id: "z_cost",   label: "Costae",       left: 64, top: 46, width: 18, height:  8 },
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
      { id: "z_lev",   label: "M. levator scapulae",          left:  2, top: 12, width: 34, height:  9 },
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
      { id: "z_tens",  label: "M. tensor fasciae latae",        left:  2, top: 44, width: 40, height:  9 },
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
