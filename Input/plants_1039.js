// Studienbrief 1039 — Strukturen und Funktion der Bauchspeicheldrüse
// Temp file: merge into js/content.js before PACK_CONTENT

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
        question: "Wo findet sich Alpha-Amylase im menschlichen Körper?",
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
          { text: "Glukagon und Calcitonin (in hohen Dosen) hemmen die Pankreaassekretion", correct: true },
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
