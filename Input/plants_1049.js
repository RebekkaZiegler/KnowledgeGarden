const HUMANPATHOLOGIE_1049_PLANTS = [
  makeDetailedPlant({
    id: "humanpathologie_1049_01",
    title: "Grundbegriffe: Gesundheit, Krankheit, Ätiologie & Disposition",
    contextHint: "WHO-Definitionen, Pathologie/Ätiologie/Pathogenese, 4 Dispositionsarten",
    phase1: {
      soil: {
        statement: "Pathogenese ist die Lehre von den Krankheitsursachen.",
        answer: false,
        solution: "Das ist die Ätiologie. Pathogenese beschreibt Entstehung und Entwicklung einer Krankheit – den Zusammenhang zwischen ätiologischem Faktor und Disposition.",
      },
      seed: {
        statement: "Zur genetischen Disposition zählt, dass Mamma-Karzinom 100-mal häufiger bei Frauen als bei Männern auftritt.",
        answer: false,
        solution: "Das ist eine geschlechtliche Disposition. Genetische Disposition wäre z. B. Hämophilie (X-chromosomal) oder erhöhte Tuberkuloseanfälligkeit bei bestimmten HLA-Typen.",
      },
      water: {
        statement: "Die WHO-Definition von Gesundheit umfasst nicht nur körperliches, sondern auch geistiges und soziales Wohlbefinden.",
        answer: true,
        solution: "Richtig. Gesundheit nach WHO = vollständiges körperliches, geistiges und soziales Wohlbefinden, nicht nur Abwesenheit von Krankheit.",
      },
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1049_01_h1",
        question: "Was versteht man unter Disposition?",
        options: [
          { text: "Die Lehre von den Krankheitsursachen", correct: false },
          { text: "Die Empfänglichkeit eines Organismus für eine Krankheit", correct: true },
          { text: "Die völlige Wiederherstellung nach einer Krankheit", correct: false },
          { text: "Die Abwehrreaktion gegen Antigene", correct: false },
        ],
        explanation: "Disposition = Empfänglichkeit (Anfälligkeit) eines Organismus für eine Krankheit. Ätiologie = Lehre von den Ursachen; Restitutio ad integrum = vollständige Wiederherstellung.",
      },
      {
        type: "mc",
        id: "1049_01_h2",
        question: "Welche der folgenden ist eine biogeographische Disposition?",
        options: [
          { text: "Erhöhte Anfälligkeit für Sichelzellanämie bei Menschen aus Malaria-Endemiegebieten", correct: true },
          { text: "Höheres Brustkrebsrisiko bei Frauen als bei Männern", correct: false },
          { text: "Erhöhtes Arterioskleroserisiko im Alter", correct: false },
          { text: "Hämophilie durch X-chromosomale Mutation", correct: false },
        ],
        explanation: "Biogeographische Disposition: durch Herkunftsregion bedingt, z. B. Sichelzellanämie in Malaria-Gebieten. Geschlechtlich (Brustkrebs), Alters- (Arteriosklerose), genetisch (Hämophilie).",
      },
      {
        type: "mc",
        id: "1049_01_h3",
        question: "Was unterscheidet Pathologie von Ätiologie?",
        options: [
          { text: "Pathologie = Lehre von krankhaften Veränderungen; Ätiologie = Lehre von den Krankheitsursachen", correct: true },
          { text: "Pathologie = Lehre von den Krankheitsursachen; Ätiologie = Lehre von krankhaften Veränderungen", correct: false },
          { text: "Beide Begriffe sind synonym verwendbar", correct: false },
          { text: "Pathologie beschreibt nur makroskopische, Ätiologie nur mikroskopische Befunde", correct: false },
        ],
        explanation: "Pathologie = Wissenschaft von den krankhaften Veränderungen des Körpers. Ätiologie = Lehre von den Krankheitsursachen. Pathogenese = Entwicklung/Entstehung der Krankheit.",
      },
      {
        type: "mc",
        id: "1049_01_h4",
        question: "Eine Frau hat aufgrund ihres Geschlechts ein 100-fach höheres Risiko für Mammakarzinom als ein Mann. Welcher Dispositionstyp liegt vor?",
        options: [
          { text: "Genetische Disposition", correct: false },
          { text: "Alters-Disposition", correct: false },
          { text: "Geschlechtliche Disposition", correct: true },
          { text: "Biogeographische Disposition", correct: false },
        ],
        explanation: "Geschlechtliche Disposition: biologisches Geschlecht erhöht die Anfälligkeit für bestimmte Erkrankungen, hier Mammakarzinom bei Frauen.",
      },
      {
        type: "true_false",
        id: "1049_01_h5",
        statement: "Pathogenese und Ätiologie sind Synonyme für dieselbe wissenschaftliche Disziplin.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true },
        ],
        explanation: "Falsch. Ätiologie = Ursachenlehre. Pathogenese = Beschreibung von Entwicklung und Verlauf der Krankheit nach Einwirken des ätiologischen Faktors.",
      },
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1049_01_p4_1",
        question: "Welche Kombination beschreibt korrekt Ätiologie UND Pathogenese am Beispiel Tuberkulose?",
        options: [
          { text: "Ätiologie: Mykobakterium tuberculosis; Pathogenese: Infektion → Granulombildung → Verkäsung bei ungenügender Immunantwort", correct: true },
          { text: "Ätiologie: Granulombildung; Pathogenese: Infektion mit Mykobakterium tuberculosis", correct: false },
          { text: "Ätiologie: Disposition durch HLA-Typ; Pathogenese: Infektion mit beliebigem Erreger", correct: false },
          { text: "Ätiologie und Pathogenese sind beim gleichen Krankheitsbild identisch", correct: false },
        ],
        explanation: "Ätiologie nennt die Ursache (Erreger), Pathogenese beschreibt den Verlauf vom Erregerkontakt bis zur Erkrankung.",
      },
      {
        type: "mc",
        id: "1049_01_p4_2",
        question: "Welche zwei Aussagen zur Disposition sind korrekt?",
        options: [
          { text: "Alters-Disposition erklärt erhöhte Arterioskleroserate im höheren Lebensalter", correct: true },
          { text: "Genetische Disposition ist immer eine geschlechtliche Disposition", correct: false },
          { text: "Biogeographische Disposition entsteht durch Anpassung von Populationen an regionale Bedingungen über Generationen", correct: true },
          { text: "Disposition und Ätiologie bezeichnen dasselbe Konzept", correct: false },
        ],
        explanation: "Alters-Disposition: im Alter nehmen bestimmte Krankheitsrisiken zu. Biogeographische Disposition: populationsgenetische Anpassung an regionale Umweltbedingungen.",
      },
    ],
  }),

  makeDetailedPlant({
    id: "humanpathologie_1049_02",
    title: "Immunität, Erkrankungsformen & medizinische Statistik",
    contextHint: "Unspezifische/spezifische Resistenz, akut/chronisch/organisch/funktionell, Ausgänge, Morbidität/Mortalität/Letalität",
    phase1: {
      soil: {
        statement: "Lysozym, saurer Haut-pH und Flimmerepithel gehören zur unspezifischen Resistenz.",
        answer: true,
        solution: "Richtig. Die unspezifische Resistenz umfasst physikalisch-chemische Barrieren: saurer Haut-pH (~5,5), Flimmerepithel der Atemwege, Lysozym in Tränen/Schleim, HCl im Magen, Laktobazillen in der Vagina.",
      },
      seed: {
        statement: "Morbidität bezeichnet den Anteil der Gestorbenen an allen an einer bestimmten Krankheit Erkrankten.",
        answer: false,
        solution: "Das ist die Letalität (in %). Morbidität = Verhältnis der Erkrankten zur Gesamtbevölkerung. Mortalität = Todesfälle in Bezug auf die Gesamtbevölkerung.",
      },
      water: {
        statement: "Restitutio ad integrum bedeutet vollständige Wiederherstellung ohne bleibende Schäden.",
        answer: true,
        solution: "Richtig. Dies ist der günstigste Ausgang einer Erkrankung. Weitere Ausgänge: Defektheilung (mit bleibendem Schaden), Tod, Rezidiv (erneuter Ausbruch), Remission (vorübergehendes/dauerhaftes Nachlassen).",
      },
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1049_02_h1",
        question: "Was ist der Unterschied zwischen Mortalität und Letalität?",
        options: [
          { text: "Mortalität = Todesfälle/Gesamtbevölkerung; Letalität = Todesfälle/Erkrankte dieser Krankheit (in %)", correct: true },
          { text: "Mortalität = Erkrankte/Gesamtbevölkerung; Letalität = Todesfälle/Gesamtbevölkerung", correct: false },
          { text: "Beide Begriffe beschreiben dasselbe Phänomen", correct: false },
          { text: "Letalität bezieht sich auf perinatale Sterblichkeit", correct: false },
        ],
        explanation: "Mortalität (Sterblichkeit) = Todesfälle in einem Zeitraum / Gesamtbevölkerung. Letalität = Anteil der Gestorbenen an den Erkrankten dieser spezifischen Krankheit.",
      },
      {
        type: "mc",
        id: "1049_02_h2",
        question: "Welche Aussage zur spezifischen Immunität ist korrekt?",
        options: [
          { text: "Sie wirkt ungerichtet gegen alle Erreger gleichermaßen", correct: false },
          { text: "Sie richtet sich gegen einen bestimmten Erreger/ein Toxin durch Antikörperbildung gegen Antigene", correct: true },
          { text: "Sie umfasst ausschließlich Lysozym und Flimmerepithel", correct: false },
          { text: "Sie kann nur angeboren sein", correct: false },
        ],
        explanation: "Spezifische Immunität = erworbene Immunität: richtet sich gezielt gegen bestimmte Antigene durch Antikörper (B-Zellen) und T-Zellen.",
      },
      {
        type: "mc",
        id: "1049_02_h3",
        question: "Was bezeichnet die perinatale Sterblichkeit?",
        options: [
          { text: "Todesfälle im ersten Lebensjahr", correct: false },
          { text: "Summe aller vor, während und bis zu einer Woche nach der Geburt Verstorbenen pro 1000 Lebend- und Totgeborenen", correct: true },
          { text: "Anteil der Totgeburten an allen Geburten", correct: false },
          { text: "Müttersterblichkeit während der Geburt", correct: false },
        ],
        explanation: "Perinatale Sterblichkeit = Summe aller vor, während und bis zu einer Woche nach der Geburt verstorbenen Kinder pro 1000 Lebend- und Totgeborenen.",
      },
      {
        type: "mc",
        id: "1049_02_h4",
        question: "Was ist eine funktionelle Erkrankung?",
        options: [
          { text: "Eine Erkrankung mit nachweisbarer organischer Schädigung", correct: false },
          { text: "Eine Erkrankung mit gestörter Organfunktion ohne morphologisch nachweisbare Ursache", correct: true },
          { text: "Eine Erkrankung, die durch Laborwerte beweisbar ist", correct: false },
          { text: "Eine Erkrankung, die nur akut verläuft", correct: false },
        ],
        explanation: "Funktionelle Erkrankung: Funktion gestört, aber keine morphologische (strukturelle) Ursache nachweisbar. Organische Erkrankung: strukturelle Veränderungen vorhanden.",
      },
      {
        type: "true_false",
        id: "1049_02_h5",
        statement: "Ein Rezidiv bezeichnet das dauerhaft vollständige Abklingen einer Erkrankung.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true },
        ],
        explanation: "Falsch. Rezidiv = erneuter Ausbruch einer bereits überwunden geglaubten Krankheit. Remission = vorübergehendes oder dauerhaftes Nachlassen der Beschwerden.",
      },
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1049_02_p4_1",
        question: "Welche Ausgänge einer Erkrankung sind möglich? (Mehrere richtig)",
        options: [
          { text: "Restitutio ad integrum", correct: true },
          { text: "Defektheilung", correct: true },
          { text: "Remission", correct: true },
          { text: "Hyperplasie", correct: false },
        ],
        explanation: "Ausgänge: Restitutio ad integrum (vollständige Heilung), Defektheilung (bleibender Schaden), Tod, Rezidiv (Rückfall), Remission (Nachlassen). Hyperplasie ist eine Anpassungsreaktion, kein Ausgang.",
      },
      {
        type: "mc",
        id: "1049_02_p4_2",
        question: "Ein Patient hat eine Erkrankung ohne nachweisbare strukturelle Organschädigung, aber mit deutlichen Symptomen. Wie und warum klassifiziert man diese?",
        options: [
          { text: "Organisch, weil Symptome vorhanden sind", correct: false },
          { text: "Funktionell, weil keine morphologische Ursache nachweisbar ist trotz Funktionsstörung", correct: true },
          { text: "Chronisch, weil sie länger als 3 Monate besteht", correct: false },
          { text: "Akut, weil sie plötzlich auftrat", correct: false },
        ],
        explanation: "Funktionelle Erkrankung: Funktion gestört, morphologisch (strukturell) kein Befund. Dies ist unabhängig von akut/chronisch oder Symptomdauer.",
      },
    ],
  }),

  makeDetailedPlant({
    id: "humanpathologie_1049_03",
    title: "Tod & Todeszeichen",
    contextHint: "Vita reducta/Scheintod, klinischer Tod, Hirntod (gesetzlich), sichere Todeszeichen: Livores, Totenstarre, Autolyse",
    phase1: {
      soil: {
        statement: "Totenflecke (Livores) entstehen durch Senkungsblutung und sind in den ersten ~24 Stunden noch wegdrückbar.",
        answer: true,
        solution: "Richtig. Livores mortis entstehen 3–16 h nach dem Tod, sind zunächst (bis ~24 h) durch Fingerdruck wegdrückbar, danach fixiert. Hellrote Livores deuten auf CO-Vergiftung oder Barbiturate hin.",
      },
      seed: {
        statement: "Der Hirntod wird in Deutschland bereits nach einer EEG-Messung von 15 Minuten festgestellt.",
        answer: false,
        solution: "Gesetzlich vorgeschrieben: EEG-Ableitung über mindestens 30 Minuten (isoelektrisch), 2 unabhängige Ärzte, 24-stündige Beobachtung, ggf. Angiographie.",
      },
      water: {
        statement: "Totenstarre (Rigor mortis) entsteht durch ATP-Mangel in der Muskulatur nach dem Tod.",
        answer: true,
        solution: "Richtig. Ohne ATP können Aktin und Myosin nicht mehr voneinander getrennt werden → Starre. Sie beginnt 2–4 h nach Tod an Nacken/Kiefer, breitet sich zu Schultern und Extremitäten aus, löst sich nach 2–3 Tagen durch Autolyse.",
      },
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1049_03_h1",
        question: "Was sind unsichere Zeichen des klinischen Todes?",
        options: [
          { text: "Totenflecke und Totenstarre", correct: false },
          { text: "Bewusstlosigkeit, fehlende Reflexe, Atemstillstand, Herzstillstand", correct: true },
          { text: "Isoelektrisches EEG über 30 Minuten", correct: false },
          { text: "Autolyse und Verwesung", correct: false },
        ],
        explanation: "Unsichere Zeichen des klinischen Todes: Bewusstlosigkeit, fehlende Reflexe, Atemstillstand, Herzstillstand – unsicher, weil beim Scheintod ähnlich.",
      },
      {
        type: "mc",
        id: "1049_03_h2",
        question: "Welche gesetzlichen Voraussetzungen gelten in Deutschland für die Feststellung des Hirntods?",
        options: [
          { text: "EEG ≥30 min isoelektrisch, 2 Ärzte, 24 h Beobachtung, ggf. Angiographie", correct: true },
          { text: "EEG ≥15 min, 1 Arzt, sofortige Entscheidung möglich", correct: false },
          { text: "Allein klinische Untersuchung durch einen Facharzt ausreichend", correct: false },
          { text: "Nur Kreislauf- und Atemstillstand über 10 Minuten nötig", correct: false },
        ],
        explanation: "Hirntod gesetzlich: EEG isoelektrisch ≥30 min, 2 unabhängige Ärzte, 24-stündige Beobachtungszeit, ggf. Angiographie zum Beweis des Hirnkreislaufstillstands.",
      },
      {
        type: "mc",
        id: "1049_03_h3",
        question: "Hellrote Totenflecke sind ein Hinweis auf welche Todesursache?",
        options: [
          { text: "Ertrinken", correct: false },
          { text: "CO-Vergiftung oder Barbituratvergiftung", correct: true },
          { text: "Herzinfarkt", correct: false },
          { text: "Sepsis", correct: false },
        ],
        explanation: "Hellrote Livores = CO-Hämoglobin (Kohlenmonoxid) oder Barbituratvergiftung. Normal: bläulich-rote Flecken durch venöses Blut.",
      },
      {
        type: "mc",
        id: "1049_03_h4",
        question: "In welcher Reihenfolge breitet sich die Totenstarre aus?",
        options: [
          { text: "Beine → Arme → Rumpf → Kiefer", correct: false },
          { text: "Nacken/Kiefer → Schultern → Rumpf → Extremitäten", correct: true },
          { text: "Gleichzeitig am gesamten Körper", correct: false },
          { text: "Hände/Füße → proximale Gelenke → Nacken", correct: false },
        ],
        explanation: "Totenstarre: beginnt nach 2–4 h an Nacken und Kiefer, breitet sich zu Schultern, Rumpf und schließlich Extremitäten aus. Auflösung nach 2–3 Tagen.",
      },
      {
        type: "true_false",
        id: "1049_03_h5",
        statement: "Supravitale Erscheinungen (intermediäres Leben) sind Reaktionen einzelner Gewebe, die noch nach dem klinischen Tod auf Reize ansprechen.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false },
        ],
        explanation: "Wahr. Intermediäres Leben = supravitale Erscheinungen: z. B. Pupillenreaktion auf Atropin, Muskeln reagieren noch auf elektrische Reize kurz nach dem Tod.",
      },
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1049_03_p4_1",
        question: "Welche Aussagen zu sicheren Todeszeichen sind korrekt? (Mehrere richtig)",
        options: [
          { text: "Totenflecke sind sichere Todeszeichen", correct: true },
          { text: "Totenstarre ist ein sicheres Todeszeichen", correct: true },
          { text: "Atemstillstand allein ist ein sicheres Todeszeichen", correct: false },
          { text: "Autolyse ist ein sicheres Todeszeichen", correct: true },
        ],
        explanation: "Sichere Todeszeichen: Livores mortis, Rigor mortis, Autolyse/Fäulnis, nicht mit Leben vereinbare Verletzungen. Atemstillstand = unsicheres Zeichen (auch beim Scheintod).",
      },
      {
        type: "mc",
        id: "1049_03_p4_2",
        question: "Auf welchem Mechanismus beruht die Totenstarre, und wann löst sie sich auf?",
        options: [
          { text: "ATP-Mangel → Aktin-Myosin-Komplex nicht lösbar → Starre; Auflösung nach 2–3 Tagen durch Autolyse", correct: true },
          { text: "Kalziumeinstrom → Dauerkontraktion; Auflösung nach 12 h durch Erneuerung der ATP-Synthese", correct: false },
          { text: "Dehydratation des Muskelgewebes → Verhärtung; bleibt dauerhaft bestehen", correct: false },
          { text: "Nervenimpulse nach dem Tod → Muskelkontraktion; Auflösung sofort mit Beginn der Fäulnis", correct: false },
        ],
        explanation: "ATP-Mangel post mortem → Aktin und Myosin können sich nicht trennen → Rigor mortis. Autolyse (enzymatischer Gewebeabbau) löst die Starre nach 2–3 Tagen auf.",
      },
    ],
  }),

  makeDetailedPlant({
    id: "humanpathologie_1049_04",
    title: "Hypoxie: Formen, Folgen & Einflussfaktoren",
    contextHint: "4 Hypoxieformen, Mitochondrien zuerst betroffen, hydropische Schwellung, Verfettung, Azidose, 5 Einflussfaktoren",
    phase1: {
      soil: {
        statement: "Histiotoxische Hypoxie entsteht durch mangelnden Sauerstofftransport im Blut, z. B. bei Anämie.",
        answer: false,
        solution: "Das ist hypoxämische Hypoxie. Histiotoxische Hypoxie = Zellen können O₂ nicht verwerten (z. B. Zyanidvergiftung hemmt Cytochromoxidase). Ischämisch = Durchblutungsstörung; hypoglykämisch = Glukosemangel.",
      },
      seed: {
        statement: "Bei Hypoxie versagt als erstes die Na-K-ATPase, was zur hydropischen Zellschwellung führt.",
        answer: true,
        solution: "Richtig. ATP-Abfall → Na-K-Pumpe versagt → Na⁺ und Wasser strömen in die Zelle → hydropische Schwellung. Mitochondrien sind noch früher betroffen (schwellen zuerst).",
      },
      water: {
        statement: "Kurze Hypoxiedauer, hohe Temperatur und hoher Funktionszustand des Gewebes erhöhen die Schadensanfälligkeit.",
        answer: false,
        solution: "Kurze Dauer = geringerer Schaden. Hohe Temperatur und hoher Funktionszustand erhöhen den O₂-Bedarf und damit die Anfälligkeit. Einflussfaktoren: Dauer, Ursache, Gewebeempfindlichkeit, Funktionszustand, Temperatur.",
      },
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1049_04_h1",
        question: "Welche Hypoxieform entsteht bei einer Zyanidvergiftung?",
        options: [
          { text: "Hypoxämische Hypoxie", correct: false },
          { text: "Ischämische Hypoxie", correct: false },
          { text: "Hypoglykämische Hypoxie", correct: false },
          { text: "Histiotoxische Hypoxie", correct: true },
        ],
        explanation: "Histiotoxisch = Zellen können O₂ nicht nutzen (Zyanid hemmt Cytochromoxidase). Hypoxämisch = zu wenig O₂ im Blut; ischämisch = Durchblutungsstörung; hypoglykämisch = Energiemangel durch Glukosemangel.",
      },
      {
        type: "mc",
        id: "1049_04_h2",
        question: "Welche Organelle ist bei Hypoxie zuerst betroffen?",
        options: [
          { text: "Zellkern", correct: false },
          { text: "Mitochondrien", correct: true },
          { text: "Lysosomen", correct: false },
          { text: "Zellmembran", correct: false },
        ],
        explanation: "Mitochondrien sind zuerst betroffen, da sie für die aerobe ATP-Synthese zuständig sind. ATP-Abfall → Na-K-Pumpe versagt → hydropische Schwellung.",
      },
      {
        type: "mc",
        id: "1049_04_h3",
        question: "Welche Folgen hat anhaltende Hypoxie auf die Zelle?",
        options: [
          { text: "Mitochondrienschwellung, hydropische Schwellung, Verfettung, intrazelluläre Azidose", correct: true },
          { text: "Sofortige Nekrose ohne Zwischenschritte", correct: false },
          { text: "Hypertrophie der Zellmembran und Hyperplasie", correct: false },
          { text: "Erhöhte ATP-Produktion durch anaerobe Glykolyse ohne Folgeschäden", correct: false },
        ],
        explanation: "Hypoxiefolgen: 1. Mitochondrien schwellen. 2. ATP-Abfall → Na-K-Pumpe versagt → hydropische Schwellung. 3. Verfettung durch gestörten Fettstoffwechsel. 4. Azidose durch anaerobe Glykolyse (Laktatbildung).",
      },
      {
        type: "mc",
        id: "1049_04_h4",
        question: "Was ist ischämische Hypoxie?",
        options: [
          { text: "Zu wenig O₂ in der Atemluft", correct: false },
          { text: "Verminderte Durchblutung eines Gewebes", correct: true },
          { text: "Unfähigkeit der Zellen, O₂ zu verwerten", correct: false },
          { text: "Mangel an Glukose als Energieträger", correct: false },
        ],
        explanation: "Ischämisch = Durchblutungsstörung (z. B. Arterienverschluss) → O₂-Mangel im Gewebe. Hypoxämisch = O₂-Sättigungsabfall im Blut. Histiotoxisch = Verwertungsstörung. Hypoglykämisch = Glukosemangel.",
      },
      {
        type: "true_false",
        id: "1049_04_h5",
        statement: "Bei höherer Gewebetemperatur steigt die Anfälligkeit für Hypoxieschäden, weil der Sauerstoffbedarf zunimmt.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false },
        ],
        explanation: "Wahr. Temperatur ist ein Einflussfaktor: höhere Temperatur → höherer Stoffwechsel → höherer O₂-Bedarf → schnellere Schädigung bei O₂-Mangel.",
      },
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1049_04_p4_1",
        question: "Nennen Sie die korrekte Reihenfolge der zellulären Hypoxieschäden:",
        options: [
          { text: "Mitochondrienschwellung → ATP-Abfall → Na-K-Pumpen-Versagen → hydropische Schwellung → Verfettung/Azidose → Nekrose", correct: true },
          { text: "Na-K-Pumpen-Versagen → Mitochondrienschwellung → ATP-Abfall → Nekrose", correct: false },
          { text: "Azidose → Mitochondrienschwellung → Hyperplasie → Nekrose", correct: false },
          { text: "Verfettung → Azidose → Mitochondrienschwellung → Restitution", correct: false },
        ],
        explanation: "Korrekte Kaskade: O₂-Mangel → Mitochondrien zuerst betroffen → ATP↓ → Na-K-ATPase versagt → Na⁺+H₂O einströmen → hydropische Schwellung → Verfettung, intrazelluläre Azidose → bei Persistenz: Nekrose.",
      },
      {
        type: "mc",
        id: "1049_04_p4_2",
        question: "Welche zwei Hypoxieformen und ihre Ursachen sind korrekt gepaart?",
        options: [
          { text: "Hypoxämisch: O₂-Mangel in der Atemluft oder Anämie", correct: true },
          { text: "Ischämisch: Zyanidvergiftung hemmt die Zellatmung", correct: false },
          { text: "Histiotoxisch: Arterienverschluss reduziert Blutfluss", correct: false },
          { text: "Hypoglykämisch: Glukosemangel, kein ausreichendes Substrat für ATP-Synthese", correct: true },
        ],
        explanation: "Hypoxämisch = zu wenig O₂ im Blut. Hypoglykämisch = Substratmangel. Ischämisch = Durchblutungsstörung. Histiotoxisch = Verwertungsstörung (Zyanid).",
      },
    ],
  }),

  makeDetailedPlant({
    id: "humanpathologie_1049_05",
    title: "Physikalische Noxen: Verbrennung & Strahlung",
    contextHint: "Verbrennungsgrade I–IV, Neuner-Regel, Verbrennungsfolgen, ionisierende Strahlung",
    phase1: {
      soil: {
        statement: "Bei Verbrennung Grad II entstehen Blasen mit Schmerzen, aber die Haut heilt immer narbenlos ab.",
        answer: false,
        solution: "Grad IIa (obere Dermis) heilt narbenlos ab. Grad IIb (tiefe Dermis) heilt mit Narbenbildung. Grad III = vollständige Destruktion der Haut (schmerzlos durch Nervenzerstörung), Grad IV = Verkohlung.",
      },
      seed: {
        statement: "Nach der Neuner-Regel entspricht ein kompletter Arm 9 % der Körperoberfläche beim Erwachsenen.",
        answer: true,
        solution: "Richtig. Neuner-Regel (Erwachsene): Kopf/Hals = 9 %, jeder Arm = 9 %, jeder Oberschenkel = 9 %, jeder Unterschenkel/Fuß = 9 %, Thorax vorne = 9 %, Thorax hinten = 9 %, Bauch vorne = 9 %, Bauch hinten = 9 %, Genitale = 1 %.",
      },
      water: {
        statement: "Bei Verbrennung Grad III sind die Schmerzen besonders stark, da die Nervenendigungen intakt sind.",
        answer: false,
        solution: "Grad III ist schmerzlos (oder wenig schmerzhaft), weil die Nervenendigungen durch die vollständige Hautzerstörung mitdestruiert wurden. Grad II ist schmerzhaft.",
      },
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1049_05_h1",
        question: "Was kennzeichnet Verbrennung Grad I?",
        options: [
          { text: "Blasenbildung und starke Schmerzen", correct: false },
          { text: "Rötung (Erythem) der Epidermis, schmerzhaft, heilt narbenlos", correct: true },
          { text: "Vollständige Destruktion aller Hautschichten", correct: false },
          { text: "Verkohlung des Gewebes", correct: false },
        ],
        explanation: "Grad I: nur Epidermis betroffen → Rötung, Schmerz, Abschilfern. Narbenlose Heilung. Grad II: Blasen. Grad III: vollständige Hautdestruktion, schmerzlos. Grad IV: Verkohlung.",
      },
      {
        type: "mc",
        id: "1049_05_h2",
        question: "Welche lebensbedrohlichen Folgen entstehen bei >20 % verbrannter Körperoberfläche?",
        options: [
          { text: "Verbrennungskrankheit mit Schock, Sepsis, Organversagen", correct: true },
          { text: "Nur lokale Wundheilungsstörung", correct: false },
          { text: "Ausschließlich Narbenbildung", correct: false },
          { text: "Keine systemischen Folgen, nur Schmerzen", correct: false },
        ],
        explanation: "Bei >20 % verbrannter KOF: Verbrennungskrankheit mit hypovolämischem Schock (Plasmaverlust), Infektionsgefahr/Sepsis, Multiorganversagen.",
      },
      {
        type: "mc",
        id: "1049_05_h3",
        question: "Wie viel Prozent der Körperoberfläche entspricht nach der Neuner-Regel der gesamte Rumpf (vorne + hinten)?",
        options: [
          { text: "18 %", correct: false },
          { text: "27 %", correct: false },
          { text: "36 %", correct: true },
          { text: "45 %", correct: false },
        ],
        explanation: "Rumpf gesamt: Thorax vorne (9 %) + Thorax hinten (9 %) + Bauch vorne (9 %) + Bauch hinten (9 %) = 36 %.",
      },
      {
        type: "mc",
        id: "1049_05_h4",
        question: "Welche biologische Wirkung haben ionisierende Strahlen auf Zellen?",
        options: [
          { text: "Direkte DNA-Schäden und Bildung freier Radikale → Zelltod oder Mutation", correct: true },
          { text: "Ausschließlich thermische Gewebeschädigung", correct: false },
          { text: "Nur reversible Membranschäden ohne Folgen", correct: false },
          { text: "Förderung der Zellteilung ohne Schadwirkung", correct: false },
        ],
        explanation: "Ionisierende Strahlung: direkte DNA-Ionisation und indirekte Wirkung durch freie Radikale (Wasserradiolyse) → DNA-Strangbrüche → Zelltod, Mutation, Karzinogenese.",
      },
      {
        type: "true_false",
        id: "1049_05_h5",
        statement: "Verbrennung Grad IIb hinterlässt Narben, weil tiefe Anteile der Dermis zerstört werden.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false },
        ],
        explanation: "Wahr. Grad IIa (oberflächlich): Regeneration aus Haarfollikeln/Drüsen → narbenlos. Grad IIb (tief): Stammzellreserve zerstört → Narbenbildung erforderlich.",
      },
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1049_05_p4_1",
        question: "Ein Erwachsener hat beide Beine und den vorderen Rumpf verbrannt. Wie viel % KOF sind betroffen?",
        options: [
          { text: "45 %", correct: true },
          { text: "36 %", correct: false },
          { text: "54 %", correct: false },
          { text: "27 %", correct: false },
        ],
        explanation: "Beide Beine: Oberschenkel li+re (9+9) + Unterschenkel/Fuß li+re (9+9) = 36 %. Vorderer Rumpf: Thorax vorne (9 %) = 9 %. Gesamt: 36+9 = 45 %.",
      },
      {
        type: "mc",
        id: "1049_05_p4_2",
        question: "Welche Verbrennungsgrade heilen narbenlos, welche mit Narben?",
        options: [
          { text: "Narbenlos: Grad I und IIa; mit Narben: Grad IIb, III, IV", correct: true },
          { text: "Narbenlos: Grad I und II; mit Narben: Grad III und IV", correct: false },
          { text: "Alle Grade heilen mit Narben", correct: false },
          { text: "Narbenlos: Grad I–III; nur Grad IV mit Narben", correct: false },
        ],
        explanation: "Grad I (Epidermis): narbenlos. Grad IIa (oberflächliche Dermis): narbenlos aus Anhangsgebilden. Grad IIb (tiefe Dermis), III (vollständig), IV (Verkohlung): immer mit Narben/Transplantation.",
      },
    ],
  }),

  makeDetailedPlant({
    id: "humanpathologie_1049_06",
    title: "Hypertrophie & Hyperplasie",
    contextHint: "Kompensatorische/hormonelle Hypertrophie, 4 Hyperplasieformen (Überlastung/regeneratorisch/hyperregeneratorisch/endokrin)",
    phase1: {
      soil: {
        statement: "Hypertrophie bezeichnet die Zunahme der Zellzahl in einem Gewebe oder Organ.",
        answer: false,
        solution: "Das ist Hyperplasie (mehr Zellen). Hypertrophie = Vergrößerung der einzelnen Zellen (Zellgröße ↑, Zellzahl gleich). Wichtig: Herzmuskel kann sich nur hypertrophieren, nicht hyperplasieren.",
      },
      seed: {
        statement: "Die Schilddrüsenvergrößerung bei Jodmangel ist ein Beispiel für endokrine Hyperplasie.",
        answer: true,
        solution: "Richtig. Endokrine Hyperplasie: hormonelle Überstimulation → Zellproliferation. Bei Jodmangel: TSH ↑ → Schilddrüsenzellen proliferieren → Struma.",
      },
      water: {
        statement: "Kompensatorische Hypertrophie der Niere tritt auf, wenn die andere Niere entfernt wird.",
        answer: true,
        solution: "Richtig. Bei Nephrektomie hypertrophiert die verbleibende Niere kompensatorisch, um die Filterfunktion zu übernehmen. Ähnlich bei Leberteilresektion.",
      },
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1049_06_h1",
        question: "Was ist der Unterschied zwischen Hypertrophie und Hyperplasie?",
        options: [
          { text: "Hypertrophie = mehr Zellen; Hyperplasie = größere Zellen", correct: false },
          { text: "Hypertrophie = größere Zellen (Zellzahl gleich); Hyperplasie = mehr Zellen", correct: true },
          { text: "Beide Begriffe bedeuten dasselbe", correct: false },
          { text: "Hypertrophie betrifft nur Herz, Hyperplasie nur Leber", correct: false },
        ],
        explanation: "Hypertrophie: einzelne Zellen werden größer. Hyperplasie: Anzahl der Zellen nimmt zu durch Zellteilung. Herzmuskelzellen können sich nicht teilen → nur Hypertrophie möglich.",
      },
      {
        type: "mc",
        id: "1049_06_h2",
        question: "Was ist kompensatorische Hypertrophie?",
        options: [
          { text: "Hypertrophie durch Hormonstimulation", correct: false },
          { text: "Vergrößerung eines Organs als Reaktion auf erhöhte funktionelle Anforderungen oder den Ausfall des paarigen Organs", correct: true },
          { text: "Pathologische Zunahme der Zellzahl mit Zellatypien", correct: false },
          { text: "Rückbildung eines Organs bei Inaktivität", correct: false },
        ],
        explanation: "Kompensatorische Hypertrophie: z. B. Linkes Herz bei Bluthochdruck, Niere nach Nephrektomie, Leber nach Resektion, Skelettmuskel bei Training.",
      },
      {
        type: "mc",
        id: "1049_06_h3",
        question: "Welche der folgenden ist eine hyperregeneratorische Hyperplasie?",
        options: [
          { text: "Schilddrüsenvergrößerung bei Jodmangel", correct: false },
          { text: "Regeneration der Leber nach Teilresektion", correct: false },
          { text: "Magenschleimhaut-Hyperplasie mit Zellatypien bei chronischer Gastritis", correct: true },
          { text: "Knochenmarkhyperplasie bei Anämie", correct: false },
        ],
        explanation: "Hyperregeneratorische Hyperplasie: überschießende Regeneration mit Zellatypien (potentiell prämaligne). Beispiel: Magenschleimhaut bei chronischer Entzündung. Regeneratorisch (ohne Atypien): z. B. Leberregeneration.",
      },
      {
        type: "mc",
        id: "1049_06_h4",
        question: "Welches Hormon ist für die hormonelle Hypertrophie des Uterus in der Schwangerschaft verantwortlich?",
        options: [
          { text: "Progesteron", correct: false },
          { text: "Östrogen", correct: true },
          { text: "TSH", correct: false },
          { text: "Cortisol", correct: false },
        ],
        explanation: "Hormonelle Hypertrophie: Östrogene bewirken Vergrößerung der Uterusmuskelzellen. TSH → Schilddrüsenhyperplasie. Cortisol → keine direkte Organvergrößerung.",
      },
      {
        type: "true_false",
        id: "1049_06_h5",
        statement: "Überlastungshyperplasie tritt auf, wenn Zellen durch dauerhaft erhöhte Beanspruchung häufiger teilen.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false },
        ],
        explanation: "Wahr. Überlastungshyperplasie: erhöhte funktionelle Last → vermehrte Zellteilung. Beispiel: Epidermis bei Druckbelastung (Schwiele). Vs. Überlastungshypertrophie: Herzmuskel (kann nicht teilen).",
      },
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1049_06_p4_1",
        question: "Warum führt Bluthochdruck zur Herzhypertrophie, nicht zur Herzhyperplasie?",
        options: [
          { text: "Weil Herzmuskelzellen terminal differenziert sind und sich nicht mehr teilen können", correct: true },
          { text: "Weil das Herz kleiner wird unter Belastung", correct: false },
          { text: "Weil nur Hyperplasie durch Hormone ausgelöst wird", correct: false },
          { text: "Weil Hypertrophie immer pathologisch ist", correct: false },
        ],
        explanation: "Kardiomyozyten sind terminal differenziert: kein Zellzyklus mehr möglich → Anpassung durch Größenzunahme (Hypertrophie), nicht Zellvermehrung (Hyperplasie).",
      },
      {
        type: "mc",
        id: "1049_06_p4_2",
        question: "Welche zwei Hyperplasieformen sind potenziell gefährlich/prämaligne?",
        options: [
          { text: "Hyperregeneratorische Hyperplasie (mit Zellatypien)", correct: true },
          { text: "Regeneratorische Hyperplasie", correct: false },
          { text: "Endokrine Hyperplasie bei unkontrollierter Hormonstimulation", correct: true },
          { text: "Überlastungshyperplasie der Epidermis", correct: false },
        ],
        explanation: "Hyperregeneratorische Hyperplasie (Zellatypien) → potentiell maligne Transformation. Unkontrollierte endokrine Hyperplasie (z. B. Endometrium bei Östrogenüberschuss) → erhöhtes Karzinomrisiko.",
      },
    ],
  }),

  makeDetailedPlant({
    id: "humanpathologie_1049_07",
    title: "Atrophie, Nekrose & Regeneration",
    contextHint: "Lokale/generalisierte Atrophie, Hungerreihenfolge, Nekrosezeichen, Nekroseformen, Wund-/Frakturheilung",
    phase1: {
      soil: {
        statement: "Bei Hungeratrophie werden zuerst Körperproteine abgebaut, dann Depotfett und zuletzt Glykogen.",
        answer: false,
        solution: "Reihenfolge: Glykogen (Stunden) → Depotfett → Baufett → Eiweiß. Erst wenn Glykogen und Fettreserven erschöpft sind, wird Strukturprotein abgebaut. Hungerdauer bis zum Tod: ca. 50 Tage.",
      },
      seed: {
        statement: "Karyorrhexis bezeichnet den Zerfall des Zellkerns in schollige Bruchstücke.",
        answer: true,
        solution: "Richtig. Nekrosezeichen am Kern: Kernwandhyperchromasie (Basophilie ↑) → Pyknose (Schrumpfung) → Karyorrhexis (Zerfall in Brocken) → Karyolyse (vollständige Auflösung).",
      },
      water: {
        statement: "Käsige Nekrose ist typisch für Tuberkulose und entsteht durch ein Überwiegen von Kolliquation.",
        answer: false,
        solution: "Käsige Nekrose (käse-ähnlich, krümelig) ist eine Sonderform der Koagulationsnekrose, typisch für TBC. Kolliquationsnekrose = verflüssigt (Hirninfarkt, Laugenverletzung).",
      },
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1049_07_h1",
        question: "In welcher Reihenfolge werden Energiereserven bei Hunger abgebaut?",
        options: [
          { text: "Eiweiß → Fett → Glykogen", correct: false },
          { text: "Glykogen → Depotfett → Baufett → Eiweiß", correct: true },
          { text: "Depotfett → Glykogen → Eiweiß → Baufett", correct: false },
          { text: "Baufett → Depotfett → Glykogen → Eiweiß", correct: false },
        ],
        explanation: "Hungerreihenfolge: Glykogen (Stunden) → Depotfett (Wochen) → Baufett (Perikardfett, Nierenfett – Hungerodem-Zeichen) → Eiweiß. Ca. 50 Tage bis zum Tode.",
      },
      {
        type: "mc",
        id: "1049_07_h2",
        question: "Was kennzeichnet die Koagulationsnekrose?",
        options: [
          { text: "Verflüssigung des Gewebes durch Proteolyse", correct: false },
          { text: "Eiweißgerinnung → festes, trockenes Gewebe; typisch für Herzinfarkt und Säureverätzung", correct: true },
          { text: "Fibrinablagerung bei Autoimmunerkrankungen", correct: false },
          { text: "Käsige Konsistenz typisch für TBC", correct: false },
        ],
        explanation: "Koagulationsnekrose: Eiweißgerinnung → Gewebe bleibt fest/trocken. Herzinfarkt, Säure. Sonderformen: Gangrän (trocken/feucht), käsige Nekrose (TBC). Kolliquationsnekrose = Verflüssigung (Hirn, Lauge).",
      },
      {
        type: "mc",
        id: "1049_07_h3",
        question: "Welche Nekroseform ist typisch für einen Hirninfarkt?",
        options: [
          { text: "Koagulationsnekrose", correct: false },
          { text: "Kolliquationsnekrose", correct: true },
          { text: "Fibrinoide Nekrose", correct: false },
          { text: "Käsige Nekrose", correct: false },
        ],
        explanation: "Kolliquationsnekrose: Verflüssigung durch enzymatischen Abbau, typisch für Hirninfarkt (hoher Fettgehalt → Autolyse) und Laugenverletzungen. Fettgewebsnekrose bei Pankreatitis ebenfalls kolliquativ.",
      },
      {
        type: "mc",
        id: "1049_07_h4",
        question: "Welche Atrophieform tritt bei dauerhafter Immobilisierung (z. B. Gipsverband) auf?",
        options: [
          { text: "Involutionsatrophie", correct: false },
          { text: "Inaktivitätsatrophie", correct: true },
          { text: "Druckatrophie", correct: false },
          { text: "Altersatrophie", correct: false },
        ],
        explanation: "Inaktivitätsatrophie: mangelnde Beanspruchung → Gewebsrückbildung (Skelettmuskel, Knochen). Druckatrophie: anhaltender Druck (z. B. Tumor → Knochenschwund). Involutionsatrophie: physiologische Rückbildung (Thymus, Uterus post partum).",
      },
      {
        type: "true_false",
        id: "1049_07_h5",
        statement: "Fibrinoide Nekrose tritt bei Autoimmunerkrankungen und Kollagenosen auf.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false },
        ],
        explanation: "Wahr. Fibrinoide Nekrose: Fibrin-ähnliches Material in Gefäßwänden. Typisch für Autoimmunerkrankungen (z. B. systemischer Lupus, rheumatoide Arthritis, Kollagenosen).",
      },
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1049_07_p4_1",
        question: "Wie verläuft die Frakturheilung zeitlich?",
        options: [
          { text: "Hämatom → Granulozyten → Granulationsgewebe → bindegewebiger Kallus (2–8 Tage) → knöcherner Kallus (1–4 Wochen) → lamellärer Knochen (4–6 Wochen)", correct: true },
          { text: "Sofortige Knochenneubildung → Hämatom → Narbenbildung", correct: false },
          { text: "Hämatom → Osteoklasten → Knochenschwund → Narbe", correct: false },
          { text: "Granulationsgewebe → Hämatom → lamellärer Knochen ohne Kallusphase", correct: false },
        ],
        explanation: "Frakturheilung: 1. Hämatom. 2. Entzündung/Granulozyten. 3. Granulationsgewebe. 4. Weicher (bindegewebiger) Kallus (2–8 Tage). 5. Harter (knöcherner) Kallus (1–4 Wochen). 6. Lamellärer Knochen (4–6 Wochen).",
      },
      {
        type: "mc",
        id: "1049_07_p4_2",
        question: "Welche Nekroseformen und ihre typischen Erkrankungen sind korrekt zugeordnet? (Mehrere richtig)",
        options: [
          { text: "Koagulationsnekrose → Herzinfarkt, Säureverätzung", correct: true },
          { text: "Kolliquationsnekrose → Hirninfarkt, Laugenverletzung, Pankreatitis", correct: true },
          { text: "Käsige Nekrose → Bronchialkarzinom", correct: false },
          { text: "Fibrinoide Nekrose → Kollagenosen, Autoimmunerkrankungen", correct: true },
        ],
        explanation: "Käsige Nekrose ist typisch für TBC (Tuberkulose), nicht Karzinom. Alle anderen Zuordnungen korrekt.",
      },
    ],
  }),

  makeDetailedPlant({
    id: "humanpathologie_1049_08",
    title: "Amyloidose, Hyalinose & Ödeme",
    contextHint: "Primäre/sekundäre Amyloidose, Hyalinformen, Ödem-Pathophysiologie, 5 Ödemursachen",
    phase1: {
      soil: {
        statement: "Amyloid ist eine intrazelluläre Ablagerung von Glykoprotein.",
        answer: false,
        solution: "Amyloid ist eine extrazelluläre Ablagerung. Primäre Amyloidose: idiopathisch, befällt Herz, Pankreas, Gefäße. Sekundäre: bei chronischen Erkrankungen (TBC, Osteomyelitis, Lepra, Arthritis, Colitis, Lymphogranulomatose). Nachweis: Rektumbiopsie.",
      },
      seed: {
        statement: "Bei einem Patienten mit Herzinsuffizienz steigt der hydrostatische Druck in den Kapillaren, was Ödeme fördert.",
        answer: true,
        solution: "Richtig. Herzinsuffizienz → venöser Rückstau → erhöhter hydrostatischer Kapillardruck → mehr Filtration → Ödem. Ähnlich bei Leberzirrhose mit Pfortaderhochdruck.",
      },
      water: {
        statement: "Zuckergussleber und Zuckergussmilz sind hyalinose-bedingte Veränderungen.",
        answer: true,
        solution: "Richtig. Hyalinose: glasige Ablagerungen. Zuckergussleber/-milz = Kapselverdickerung durch bindegewebiges Hyalin. Weitere Formen: vaskuläres Hyalin (Arteriosklerose), zelluläres Hyalin, Pleuraschwarte.",
      },
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1049_08_h1",
        question: "Was ist sekundäre Amyloidose?",
        options: [
          { text: "Idiopathische Amyloidablagerung in Herz und Pankreas", correct: false },
          { text: "Amyloidose als Folge chronischer Erkrankungen wie TBC, Osteomyelitis oder chronische Arthritis", correct: true },
          { text: "Intrazelluläre Ablagerung von Amyloid bei Autoimmunerkrankungen", correct: false },
          { text: "Amyloidose ausschließlich in Blutgefäßen", correct: false },
        ],
        explanation: "Sekundäre Amyloidose: reaktiv bei chronisch-entzündlichen Erkrankungen (TBC, Osteomyelitis, Lepra, Arthritis, Colitis ulcerosa) oder malignen Erkrankungen (Lymphogranulomatose, Nierenkarzinom, Plasmozytom). Nachweis via Rektumbiopsie.",
      },
      {
        type: "mc",
        id: "1049_08_h2",
        question: "Was ist die tägliche Lymphdrainage des Interstitiums?",
        options: [
          { text: "Ca. 2 Liter", correct: true },
          { text: "Ca. 20 Liter", correct: false },
          { text: "Ca. 18 Liter", correct: false },
          { text: "Ca. 5 Liter", correct: false },
        ],
        explanation: "Täglich werden ~20 L Flüssigkeit aus Kapillaren filtriert, ~18 L wieder resorbiert, ~2 L verbleiben im Interstitium und werden durch die Lymphe abtransportiert.",
      },
      {
        type: "mc",
        id: "1049_08_h3",
        question: "Welche Ursache führt durch erniedrigten onkotischen Druck zu Ödemen?",
        options: [
          { text: "Herzinsuffizienz", correct: false },
          { text: "Lymphabflussstörung nach Lymphknotenentfernung", correct: false },
          { text: "Eiweißmangelernährung oder Leberzirrhose (Albuminmangel)", correct: true },
          { text: "Akute Entzündung mit Kapillarpermeabilität", correct: false },
        ],
        explanation: "Onkotischer Druck = Kolloidosmotischer Druck durch Albumin. Bei Hypoalbuminämie (Eiweißmangel, Leberinsuffizienz, nephrotisches Syndrom) fällt der onkotische Druck → weniger Resorption → Ödem.",
      },
      {
        type: "mc",
        id: "1049_08_h4",
        question: "Wie wird Amyloidose klinisch nachgewiesen?",
        options: [
          { text: "Blutserumanalyse auf Amyloidproteine", correct: false },
          { text: "Rektumbiopsie mit Kongorot-Färbung", correct: true },
          { text: "CT des Abdomens", correct: false },
          { text: "EKG-Veränderungen", correct: false },
        ],
        explanation: "Rektumbiopsie mit Kongorot-Färbung (apfelgrüne Doppelbrechung im polarisierten Licht) ist die Standardmethode zum Nachweis von Amyloid.",
      },
      {
        type: "true_false",
        id: "1049_08_h5",
        statement: "Entzündlich bedingte Ödeme entstehen durch erhöhte Kapillarpermeabilität.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false },
        ],
        explanation: "Wahr. Entzündung → Histamin, Bradykinin, Prostaglandine → erhöhte Kapillarpermeabilität → Proteine und Flüssigkeit treten ins Gewebe → entzündliches Ödem (exsudatives Ödem).",
      },
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1049_08_p4_1",
        question: "Welche zwei Mechanismen erklären Ödeme bei Leberzirrhose?",
        options: [
          { text: "Pfortaderhochdruck → erhöhter hydrostatischer Druck", correct: true },
          { text: "Verminderte Albuminproduktion → erniedrigter onkotischer Druck", correct: true },
          { text: "Erhöhte Lymphproduktion durch die Leber", correct: false },
          { text: "Direkte Entzündung der Kapillarwände", correct: false },
        ],
        explanation: "Leberzirrhose: 1. Pfortaderhypertension → hydrostatischer Druck ↑ → Aszites. 2. Albuminsynthese ↓ → onkotischer Druck ↓ → weniger Rückresorption → Ödeme.",
      },
      {
        type: "mc",
        id: "1049_08_p4_2",
        question: "Welche Aussagen zur Hyalinose sind korrekt? (Mehrere richtig)",
        options: [
          { text: "Hyalin ist eine glasige, homogene, eosinophile Substanz", correct: true },
          { text: "Vaskuläres Hyalin findet sich bei Arteriosklerose", correct: true },
          { text: "Hyalinose betrifft ausschließlich die Leber", correct: false },
          { text: "Zuckergussmilz ist eine Hyalinoseform der Kapsel", correct: true },
        ],
        explanation: "Hyalin = glasig, homogen, eosinophil. Formen: zellulär, extrazellulär, bindegewebig, vaskulär. Lokalisationen: Gefäße (Arteriosklerose), Kapselorgane (Zuckergussleber/-milz), Pleura (Pleuraschwarte).",
      },
    ],
  }),

  makeDetailedPlant({
    id: "humanpathologie_1049_09",
    title: "Entwicklungsstörungen",
    contextHint: "Gametopathien (Trisomie 21, Klinefelter, Turner), Blasto-/Embryo-/Fetopathien, FAS, Morbus haemolyticus neonatorum",
    phase1: {
      soil: {
        statement: "Klinefelter-Syndrom hat den Karyotyp 45,XO.",
        answer: false,
        solution: "45,XO ist Turner-Syndrom (Monosomie X, phänotypisch weiblich). Klinefelter = 47,XXY (phänotypisch männlich, Hodeninsuffizienz, Sterilität). Trisomie 21 = Down-Syndrom.",
      },
      seed: {
        statement: "Fetales Alkoholsyndrom (FAS) ist eine Embryopathie, die zwischen 15. Tag und 3. Schwangerschaftsmonat entsteht.",
        answer: true,
        solution: "Richtig. Embryopathien entstehen in der Embryonalphase (15. Tag bis Ende 3. Monat). FAS-Merkmale: Minderwuchs, geistige Retardierung, charakteristische Gesichtsmerkmale (kleines Philtrum, dünne Oberlippe, enge Lidspalten).",
      },
      water: {
        statement: "Beim Morbus haemolyticus neonatorum bildet eine Rh-negative Mutter erst nach dem ersten Kind Anti-D-Antikörper.",
        answer: true,
        solution: "Richtig. Erste Schwangerschaft: fetale Rh+ Erythrozyten sensibilisieren die Mutter → IgG Anti-D. Bei weiteren Rh+ Schwangerschaften: Antikörper passieren Plazenta → fetale Hämolyse → Anämie, Kernikterus. Therapie: Anti-D-Immunglobulin prophylaktisch.",
      },
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1049_09_h1",
        question: "Was ist der Karyotyp und das klinische Bild des Klinefelter-Syndroms?",
        options: [
          { text: "45,XO; phänotypisch weiblich, kleinwüchsig, Sterilität", correct: false },
          { text: "47,XXY; phänotypisch männlich, Hodeninsuffizienz, Sterilität, Gynäkomastie", correct: true },
          { text: "Trisomie 21; geistige Behinderung, Herzfehler", correct: false },
          { text: "47,XYY; phänotypisch weiblich, normaler Intelligenz", correct: false },
        ],
        explanation: "Klinefelter: 47,XXY, phänotypisch männlich. Merkmale: Hodeninsuffizienz, Azoospermie/Sterilität, Gynäkomastie, oft Hochwuchs.",
      },
      {
        type: "mc",
        id: "1049_09_h2",
        question: "In welchem Zeitraum entstehen Embryopathien?",
        options: [
          { text: "Vor der Befruchtung (Gametenschäden)", correct: false },
          { text: "1.–14. Tag nach Befruchtung", correct: false },
          { text: "15. Tag bis Ende des 3. Schwangerschaftsmonats (Organogenese)", correct: true },
          { text: "Ab dem 4. Schwangerschaftsmonat", correct: false },
        ],
        explanation: "Embryopathien: 15. Tag – Ende 3. Monat = Organogenese. Besonders anfällig → schwerste Fehlbildungen (Amelie, Phokomelie, Spina bifida etc.). Blastopathien: 1.–14. Tag. Fetopathien: ab 4. Monat.",
      },
      {
        type: "mc",
        id: "1049_09_h3",
        question: "Was ist der Mechanismus des Morbus haemolyticus neonatorum?",
        options: [
          { text: "Rh- Mutter × Rh+ Kind: Sensibilisierung nach 1. Geburt → IgG Anti-D → Hämolyse bei Folgeschwangerschaften", correct: true },
          { text: "ABO-Inkompatibilität führt immer zur schweren Hämolyse beim ersten Kind", correct: false },
          { text: "Rh+ Mutter überträgt Antikörper auf Rh- Kind", correct: false },
          { text: "Direkter Virusangriff auf fetale Erythrozyten", correct: false },
        ],
        explanation: "MHN: Rh-negatives Mutter + Rh-positives Kind. Bei 1. Geburt: Sensibilisierung → IgG Anti-D. Bei 2. Rh+ Kind: IgG passiert Plazenta → Hämolyse → Anämie, Kernikterus. Prophylaxe: Anti-D-Immunglobulin nach Geburt.",
      },
      {
        type: "mc",
        id: "1049_09_h4",
        question: "Was versteht man unter Dysraphie als Embryopathie?",
        options: [
          { text: "Fehlende Extremitäten", correct: false },
          { text: "Fusionsstörung von Körperwandanteilen, z. B. Spina bifida", correct: true },
          { text: "Fehlanlage beider Augen zu einem Auge (Zyklopie)", correct: false },
          { text: "Verdoppelung von Organen", correct: false },
        ],
        explanation: "Dysraphie = Schluss-Störung = Fusionsdefekt der Körperwand (Neuralrohr, Bauchwand). Typisch: Spina bifida (offener Wirbelkanal). Amelie = keine Extremitäten; Phokomelie = Robbengliedmaßen.",
      },
      {
        type: "true_false",
        id: "1049_09_h5",
        statement: "Thalidomid (Contergan) ist ein bekanntes teratogenes Agens, das Phokomelie verursachte.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false },
        ],
        explanation: "Wahr. Thalidomid in den 1950/60er Jahren → Phokomelie (Robbengliedmaßen) und andere Fehlbildungen. Teratogene Ursachen: Strahlung, Röteln, Thalidomid, Alkohol (FAS).",
      },
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1049_09_p4_1",
        question: "Wie unterscheiden sich Gametopathie, Blastopathie, Embryopathie und Fetopathie zeitlich?",
        options: [
          { text: "Gametopathie: Keimzellschaden vor Befruchtung; Blastopathie: 1.–14. Tag; Embryopathie: 15. Tag – 3. Monat; Fetopathie: ab 4. Monat", correct: true },
          { text: "Alle entstehen im 1. Trimenon", correct: false },
          { text: "Fetopathie bezeichnet Schäden vor der Befruchtung", correct: false },
          { text: "Blastopathie und Embryopathie sind identisch", correct: false },
        ],
        explanation: "Zeitliche Abfolge: Gametopathie (Keimzelle) → Blastopathie (1.–14. Tag → 50% Frühabort) → Embryopathie (15. Tag–3. Monat, Organogenese, schwerste Fehlbildungen) → Fetopathie (ab 4. Monat, Entwicklungsstörungen).",
      },
      {
        type: "mc",
        id: "1049_09_p4_2",
        question: "Welche Merkmale des fetalen Alkoholsyndroms (FAS) sind korrekt? (Mehrere richtig)",
        options: [
          { text: "Minderwuchs (prä- und postnatal)", correct: true },
          { text: "Geistige Retardierung", correct: true },
          { text: "Charakteristische Gesichtsmerkmale (kleines Philtrum, dünne Oberlippe)", correct: true },
          { text: "Fehlen von Extremitäten (Amelie)", correct: false },
        ],
        explanation: "FAS = fetales Alkoholsyndrom: Trias aus Minderwuchs + geistiger Retardierung + charakteristischen Gesichtsmerkmalen. Amelie ist eine Thalidomid-Schädigung.",
      },
    ],
  }),

  makeDetailedPlant({
    id: "humanpathologie_1049_10",
    title: "Entzündung: Grundlagen & Kardinalsymptome",
    contextHint: "Definition, perakut/akut/subakut/chronisch, 6 Entzündungsreize, 5 Kardinalsymptome nach Galen, allgemeine Reaktion, 3 Phasen lokale Reaktion",
    phase1: {
      soil: {
        statement: "Functio laesa bezeichnet das 5. Kardinalsymptom der Entzündung nach Galen.",
        answer: true,
        solution: "Richtig. Die 5 Kardinalsymptome: Rubor (Rötung), Tumor (Schwellung), Dolor (Schmerz), Calor (Wärme), Functio laesa (Funktionseinschränkung, ergänzt durch Virchow).",
      },
      seed: {
        statement: "CRP (C-reaktives Protein) ist ein Zeichen der allgemeinen Entzündungsreaktion und steigt bei Entzündung ab.",
        answer: false,
        solution: "CRP steigt bei Entzündung an (Akute-Phase-Protein der Leber). Allgemeine Reaktion: Linksverschiebung im Blutbild, CRP ↑, BSG ↑ (Blutsenkungsgeschwindigkeit), Fieber.",
      },
      water: {
        statement: "In der zweiten Phase der lokalen Entzündungsreaktion bewirkt Histamin Vasodilatation, die sich als Rötung und Wärme zeigt.",
        answer: true,
        solution: "Richtig. 3 Phasen: 1. Adrenalin → Ischämie (kurz). 2. Histamin → Vasodilatation → Rubor + Calor. 3. Venolenverengung → Exsudation → Tumor + Dolor.",
      },
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1049_10_h1",
        question: "Was sind die 5 Kardinalsymptome der Entzündung?",
        options: [
          { text: "Rubor, Tumor, Dolor, Calor, Functio laesa", correct: true },
          { text: "Fieber, Schmerz, Schwellung, CRP-Erhöhung, Leukozytose", correct: false },
          { text: "Rubor, Tumor, Dolor, Calor, Linksverschiebung", correct: false },
          { text: "Rötung, Schwellung, Nekrose, Fieber, BSG-Erhöhung", correct: false },
        ],
        explanation: "Kardinalsymptome nach Galen (+ Virchow): Rubor (Rötung), Tumor (Schwellung), Dolor (Schmerz), Calor (Wärme), Functio laesa (Funktionseinschränkung).",
      },
      {
        type: "mc",
        id: "1049_10_h2",
        question: "Was bedeutet Linksverschiebung im Blutbild bei Entzündung?",
        options: [
          { text: "Zunahme von Lymphozyten bei viralen Infektionen", correct: false },
          { text: "Vermehrtes Auftreten unreifer Granulozyten (Stabkernige) im Blut", correct: true },
          { text: "Abfall des CRP-Wertes auf normale Werte", correct: false },
          { text: "Erhöhte Erythrozytensedimentationsrate", correct: false },
        ],
        explanation: "Linksverschiebung = Zunahme unreifer Leukozyten (Stabkernige, Metamyelozyten) im Blut durch gesteigerte Knochenmarkproduktion bei Entzündung/Infektion.",
      },
      {
        type: "mc",
        id: "1049_10_h3",
        question: "Welche 3 Phasen der lokalen Entzündungsreaktion folgen aufeinander?",
        options: [
          { text: "Histamin → Adrenalin → Venolenverengung", correct: false },
          { text: "Adrenalin (Ischämie) → Histamin (Vasodilatation) → Venolenverengung (Exsudation)", correct: true },
          { text: "Exsudation → Vasodilatation → Ischämie", correct: false },
          { text: "Leukozytenmigration → Vasodilatation → Fibrinbildung", correct: false },
        ],
        explanation: "Lokale Entzündung: 1. Adrenalin → kurze Ischämie. 2. Histamin → Vasodilatation → Rubor + Calor. 3. Venolenverengung → Druckanstieg → Exsudation → Tumor + Dolor.",
      },
      {
        type: "mc",
        id: "1049_10_h4",
        question: "Was ist perakute Entzündung?",
        options: [
          { text: "Chronische Entzündung mit Vernarbung", correct: false },
          { text: "Extrem schnell verlaufende, lebensgefährliche Entzündung (Stunden)", correct: true },
          { text: "Entzündung, die länger als 6 Wochen anhält", correct: false },
          { text: "Entzündung ohne Allgemeinsymptome", correct: false },
        ],
        explanation: "Zeitliche Einteilung: perakut (Stunden, lebensbedrohlich z. B. fulminante Sepsis), akut (Tage–Wochen), subakut (Wochen–Monate), chronisch (Monate–Jahre).",
      },
      {
        type: "true_false",
        id: "1049_10_h5",
        statement: "BSG (Blutkörperchensenkungsgeschwindigkeit) ist bei Entzündung erniedrigt.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true },
        ],
        explanation: "Falsch. BSG ist bei Entzündung erhöht (Akute-Phase-Proteine erhöhen die Geldrollen-Bildung der Erythrozyten → schnellere Senkung). BSG ↑ = unspezifischer Entzündungsmarker.",
      },
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1049_10_p4_1",
        question: "Warum entstehen Rubor und Calor in Phase 2 der Entzündung?",
        options: [
          { text: "Histamin → Vasodilatation → mehr Blut im Gewebe → Rötung + Wärme", correct: true },
          { text: "Adrenalin → Gefäßerweiterung → erhöhter Blutfluss", correct: false },
          { text: "Venolenverengung → Stase → Wärmeanstieg", correct: false },
          { text: "Exsudation von Proteinen → Wärmefreisetzung", correct: false },
        ],
        explanation: "Phase 2: Histamin aus Mastzellen → arterioläre Vasodilatation → Hyperämie → mehr Blut im Gewebe → sichtbare Rötung (Rubor) und tastbare Wärme (Calor).",
      },
      {
        type: "mc",
        id: "1049_10_p4_2",
        question: "Welche Entzündungsreize gibt es? (Mehrere richtig)",
        options: [
          { text: "Mechanisch (Trauma)", correct: true },
          { text: "Thermisch (Verbrennung, Erfrierung)", correct: true },
          { text: "Infektiös (Bakterien, Viren)", correct: true },
          { text: "Psychisch (Stress)", correct: false },
        ],
        explanation: "6 Entzündungsreize: mechanisch, thermisch, chemisch, infektiös, immunologisch, ionisierend (Strahlung). Psychischer Stress ist kein direkter Entzündungsreiz.",
      },
    ],
  }),

  makeDetailedPlant({
    id: "humanpathologie_1049_11",
    title: "Entzündungsformen & Exsudate",
    contextHint: "5 Exsudat-Typen: serös/fibrinös/eitrig/hämorrhagisch/serös-schleimig; Phlegmone/Abszess/Empyem; spezifisch vs. unspezifisch",
    phase1: {
      soil: {
        statement: "Fibrinöses Exsudat ist typisch für Diphtherie und pseudomembranöse Colitis.",
        answer: true,
        solution: "Richtig. Fibrinöse Entzündung: Fibrin wird in die Entzündungszone abgelagert → Pseudomembranen. Typisch für Diphtherie und pseudomembranöse Colitis (C. difficile).",
      },
      seed: {
        statement: "Ein Abszess ist eine Eiteransammlung in einem präformierten Körperhöhlenraum.",
        answer: false,
        solution: "Ein Empyem ist Eiter in einer präformierten Höhle (z. B. Pleura-Empyem, Gallenblasen-Empyem). Abszess = Eiteransammlung in einem neu gebildeten Hohlraum. Phlegmone = diffus-infiltrierende eitrige Entzündung.",
      },
      water: {
        statement: "Hämorrhagisches Exsudat kann bei Virusgrippe auftreten.",
        answer: true,
        solution: "Richtig. Hämorrhagisches Exsudat enthält Erythrozyten → typisch bei stark destruierenden Entzündungen, z. B. Virusgrippe (Influenza) oder Milzbrand.",
      },
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1049_11_h1",
        question: "Was ist eine Phlegmone?",
        options: [
          { text: "Eiteransammlung in einer präformierten Körperhöhle", correct: false },
          { text: "Diffus-infiltrierende eitrige Entzündung ohne Abkapselung", correct: true },
          { text: "Abgekapselte Eiteransammlung in einem Hohlraum", correct: false },
          { text: "Entzündung der Haarfollikel", correct: false },
        ],
        explanation: "Phlegmone = diffuse, nicht abgekapselte eitrige Entzündung (v. a. in Bindegewebe). Abszess = abgekapselt. Empyem = Eiter in präformierter Höhle. Furunkel = eitrige Haarfollikelentzündung. Karbunkel = konfluierende Furunkel.",
      },
      {
        type: "mc",
        id: "1049_11_h2",
        question: "Welches Exsudat ist typisch für den Schnupfen (Rhinitis)?",
        options: [
          { text: "Fibrinöses Exsudat", correct: false },
          { text: "Serös-schleimiges Exsudat", correct: true },
          { text: "Eitriges Exsudat", correct: false },
          { text: "Hämorrhagisches Exsudat", correct: false },
        ],
        explanation: "Serös-schleimiges (mukokatarrhalisches) Exsudat: Schleim + Serum, z. B. bei Rhinitis (Schnupfen), Bronchitis. Serös = klares Transsudat-ähnliches Exsudat.",
      },
      {
        type: "mc",
        id: "1049_11_h3",
        question: "Was ist ein Empyem?",
        options: [
          { text: "Eitrige Entzündung des Unterhautfettgewebes", correct: false },
          { text: "Eiteransammlung in einer präformierten Körperhöhle (z. B. Pleura, Gallenblase)", correct: true },
          { text: "Diffuse eitrige Entzündung ohne Abkapselung", correct: false },
          { text: "Furunkel-ähnliche Entzündung der Haut", correct: false },
        ],
        explanation: "Empyem = Eiter in einer natürlichen Körperhöhle: Pleura-Empyem, Gallen-Empyem, Gelenk-Empyem. Vs. Abszess (neu gebildeter Hohlraum) und Phlegmone (diffus).",
      },
      {
        type: "mc",
        id: "1049_11_h4",
        question: "Was kennzeichnet spezifische Entzündungen?",
        options: [
          { text: "Durch einen bestimmten Erreger bedingte Entzündung mit charakteristischem morphologischen Bild (z. B. Granulom bei TBC)", correct: true },
          { text: "Entzündungen, die nur durch chemische Reize ausgelöst werden", correct: false },
          { text: "Entzündungen mit rein serösem Exsudat", correct: false },
          { text: "Entzündungen, die ausschließlich akut verlaufen", correct: false },
        ],
        explanation: "Spezifische Entzündung: charakteristisches histologisches Bild durch bestimmten Erreger, z. B. epitheloides Granulom bei TBC. Unspezifische Entzündung: einheitliches Reaktionsmuster unabhängig vom Erreger.",
      },
      {
        type: "true_false",
        id: "1049_11_h5",
        statement: "Ein Karbunkel entsteht durch das Konfluieren mehrerer Furunkel.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false },
        ],
        explanation: "Wahr. Furunkel = einzelne eitrige Haarfollikelentzündung. Karbunkel = mehrere konfluierende Furunkel mit tiefer Infektion des Unterhautgewebes.",
      },
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1049_11_p4_1",
        question: "Welche Exsudat-Typen und ihre typischen Erkrankungen sind korrekt zugeordnet? (Mehrere richtig)",
        options: [
          { text: "Serös: Verbrennungsblasen, leichte Entzündungen", correct: true },
          { text: "Fibrinös: Diphtherie, pseudomembranöse Colitis", correct: true },
          { text: "Eitrig: Phlegmone, Abszess, Furunkel", correct: true },
          { text: "Hämorrhagisch: harmlose Erkältung", correct: false },
        ],
        explanation: "Serös: wasserklares Exsudat. Fibrinös: Fibrinauflagerungen = Pseudomembranen. Eitrig: Leukozyten-reich. Hämorrhagisch: stark destruierend (Virusgrippe, Milzbrand) – nicht harmlos.",
      },
      {
        type: "mc",
        id: "1049_11_p4_2",
        question: "Wie unterscheiden sich Abszess, Phlegmone und Empyem?",
        options: [
          { text: "Abszess = abgekapselt (neu gebildeter Hohlraum); Phlegmone = diffus, nicht abgekapselt; Empyem = in präformierter Höhle", correct: true },
          { text: "Alle drei sind dasselbe, nur unterschiedliche Fachbegriffe", correct: false },
          { text: "Phlegmone ist immer in der Lunge, Abszess in der Haut", correct: false },
          { text: "Empyem entsteht nur durch Tuberkulose", correct: false },
        ],
        explanation: "Eitrige Entzündungsformen: Abszess (abgekapselt, neo-gebildeter Hohlraum), Phlegmone (diffus, Bindegewebe), Empyem (präformierte Körperhöhle), Furunkel (Haarfollikel), Karbunkel (multiple Furunkel).",
      },
    ],
  }),

  makeDetailedPlant({
    id: "humanpathologie_1049_12",
    title: "Tumorpathologie: Grundlagen, Malignität & Metastasierung",
    contextHint: "Benign/malign/semimalign, Malignitätszeichen, 5 Metastasierungswege, Tumorentstehung: chemische/virale/genetische Faktoren",
    phase1: {
      soil: {
        statement: "Semimaligne Tumoren metastasieren nie, wachsen aber lokal invasiv.",
        answer: true,
        solution: "Richtig. Semimaligne Tumoren (z. B. Basaliom): lokal invasiv destruierend, aber keine Fernmetastasen. Benigne = keine Invasion, keine Metastasen. Maligne = invasiv + Metastasen.",
      },
      seed: {
        statement: "Hämatogene Metastasierung erfolgt ausschließlich über Venen.",
        answer: false,
        solution: "Hämatogene Metastasierung: über Blutgefäße, hauptsächlich venös (4 Typen: Lungen-, Leber-, Wirbelsäulen-, Kavameter-Typ). Auch arterielle Streuung möglich.",
      },
      water: {
        statement: "Das Tumorsuppressorgen p53 hemmt die Zellteilung und fördert den programmierten Zelltod bei DNA-Schäden.",
        answer: true,
        solution: "Richtig. Tumorsuppressor-Gene (Anti-Onkogene) hemmen Zellproliferation. p53 = Wächter des Genoms: erkennt DNA-Schäden → Zellzyklusarrest oder Apoptose. Mutation → unkontrollierte Proliferation.",
      },
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1049_12_h1",
        question: "Welche sind typische Zeichen der Malignität eines Tumors?",
        options: [
          { text: "Invasives Wachstum, Metastasierung, Kernatypien, erhöhte Mitoserate", correct: true },
          { text: "Kapselbildung, langsames Wachstum, keine Atypien", correct: false },
          { text: "Ausschließlich benigne Histologie ohne Infiltration", correct: false },
          { text: "Fehlende Vaskularisierung", correct: false },
        ],
        explanation: "Malignitätszeichen: infiltratives Wachstum, Metastasierung, Kernatypien (Polymorphie, Hyperchromasie), erhöhte Mitoserate, pathologische Mitosen, Nekrosen.",
      },
      {
        type: "mc",
        id: "1049_12_h2",
        question: "Was ist kavitäre (transkoelomale) Metastasierung?",
        options: [
          { text: "Metastasierung über Lymphgefäße", correct: false },
          { text: "Metastasierung über Körperhöhlen (Pleura, Peritoneum)", correct: true },
          { text: "Metastasierung entlang von Nervenkanälen", correct: false },
          { text: "Metastasierung durch direkten Kontakt bei Operationen", correct: false },
        ],
        explanation: "Kavitäre/transkoelomale Metastasierung: Tumorzellen dringen in Körperhöhlen ein (Pleura → Pleurakarzinose; Peritoneum → Peritonealkarzinose).",
      },
      {
        type: "mc",
        id: "1049_12_h3",
        question: "Wie unterscheiden sich Onkogene von Tumorsuppressor-Genen?",
        options: [
          { text: "Onkogene = fördern Zellwachstum (Mutation → Überaktivität); Tumorsuppressoren = hemmen Wachstum (Mutation → Funktionsverlust)", correct: true },
          { text: "Onkogene hemmen das Tumorwachstum; Tumorsuppressoren fördern es", correct: false },
          { text: "Beide Gene wirken identisch auf die Zellteilung", correct: false },
          { text: "Onkogene kommen nur bei viralen Tumoren vor", correct: false },
        ],
        explanation: "Onkogene: mutierte Proto-Onkogene → Wachstumssignal dauerhaft aktiv → unkontrollierte Proliferation. Tumorsuppressoren: hemmen Zellzyklus (Zwei-Treffer-Hypothese: beide Allele müssen mutieren).",
      },
      {
        type: "mc",
        id: "1049_12_h4",
        question: "Welche ist KEIN Metastasierungsweg?",
        options: [
          { text: "Lymphogen", correct: false },
          { text: "Hämatogen", correct: false },
          { text: "Kanalikulär (über Körperkanäle)", correct: false },
          { text: "Transneural (über Nerven)", correct: true },
        ],
        explanation: "5 Metastasierungswege: lymphogen, hämatogen (4 Typen), kavitär/transkoelom, kanalikulär (Ductus, Bronchien), Impfmetastasen (iatrogen/traumatisch). Transneural ist kein klassischer Metastasierungsweg.",
      },
      {
        type: "true_false",
        id: "1049_12_h5",
        statement: "Tumorviren können durch Integration ihrer DNA/RNA in das Wirtsgenom zur malignen Transformation führen.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false },
        ],
        explanation: "Wahr. DNA-Tumorviren (HPV, EBV, HBV) und RNA-Tumorviren (Retroviren, HTLV) können durch Genomintegration Proto-Onkogene aktivieren oder Tumorsuppressoren inaktivieren.",
      },
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1049_12_p4_1",
        question: "Welche 5 Metastasierungswege gibt es und je ein Beispiel?",
        options: [
          { text: "Lymphogen (Lymphknoten), hämatogen (Leber-/Lungenmetastasen), kavitär (Peritonealkarzinose), kanalikulär (Bronchialmetastasen), Impfmetastasen (Narbenmetastasen)", correct: true },
          { text: "Nur lymphogen und hämatogen; andere Wege existieren nicht", correct: false },
          { text: "Lymphogen, hämatogen, perineuronal, perkutan, kanalikulär", correct: false },
          { text: "Hämatogen (5 Typen), lymphogen (2 Typen), keine weiteren", correct: false },
        ],
        explanation: "5 Wege: 1. Lymphogen (Lymphknoten-Filialen). 2. Hämatogen (4 Typen: Lungen-, Leber-, Wirbelsäulen-, Kavameter-Typ). 3. Kavitär (Peritoneum, Pleura). 4. Kanalikulär (Bronchien, Ductus). 5. Impfmetastasen (iatrogen).",
      },
      {
        type: "mc",
        id: "1049_12_p4_2",
        question: "Was ist die Tumorentstehungs-Sequenz von der Normalzelle zum invasiven Karzinom?",
        options: [
          { text: "Metaplasie → Dysplasie → Carcinoma in situ (CIS) → Frühkarzinom → invasives Karzinom", correct: true },
          { text: "Atrophie → Nekrose → Karzinom", correct: false },
          { text: "Entzündung → Apoptose → Karzinom", correct: false },
          { text: "Hyperplasie → Metastase → Invasion", correct: false },
        ],
        explanation: "Karzinogenese-Sequenz: Normalgewebe → Metaplasie → Dysplasie (I–III) → CIS (auf Epithel beschränkt) → Frühkarzinom (minimal invasiv) → invasives Karzinom → Metastasen.",
      },
    ],
  }),

  makeDetailedPlant({
    id: "humanpathologie_1049_13",
    title: "Tumorsystematik, TNM, Therapie & wichtige Tumoren",
    contextHint: "Mesenchymal/epithelial, TNM-Stadien, Grading, CEA/PSA, Therapieformen, 6 wichtige Karzinome",
    phase1: {
      soil: {
        statement: "Adenom ist ein benigner epithelialer Tumor mit Drüsenstruktur.",
        answer: true,
        solution: "Richtig. Benigne epitheliale Tumoren: Papillom (Plattenepithel), Adenom (Drüsenepithel). Maligne: Karzinom. Benigne mesenchymale Tumoren: -om (Fibrom, Lipom). Maligne mesenchymal: -sarkom.",
      },
      seed: {
        statement: "T4 im TNM-System bezeichnet fehlende Fernmetastasen.",
        answer: false,
        solution: "T4 = große/invasive Primärtumorgröße. M0 = keine Fernmetastasen, M1 = Fernmetastasen vorhanden. N0–N4 = regionale Lymphknotenbefall. Tis = Tumor in situ.",
      },
      water: {
        statement: "PSA (Prostata-spezifisches Antigen) ist ein Tumormarker für das Prostatakarzinom.",
        answer: true,
        solution: "Richtig. PSA = Tumormarker für Prostatakarzinom. CEA (Karzinoembryonales Antigen) = kolorektales/Magen-/Bronchialkarzinom. Alpha-1-Fetoprotein = Leberzellkarzinom/Hodentumor.",
      },
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1049_13_h1",
        question: "Was bedeutet das TNM-Stadium T2 N1 M0?",
        options: [
          { text: "Kleiner Tumor, kein Lymphknotenbefall, keine Fernmetastasen", correct: false },
          { text: "Mittelgroßer Tumor mit regionalem Lymphknotenbefall, keine Fernmetastasen", correct: true },
          { text: "Tumor in situ mit Lymphknotenbefall und Fernmetastasen", correct: false },
          { text: "Großer Tumor ohne Lymphknotenbefall mit Fernmetastasen", correct: false },
        ],
        explanation: "T2 = mittelgroßer Primärtumor, N1 = 1–3 regionäre Lymphknoten befallen, M0 = keine Fernmetastasen. Klinisches Stadium II–III je nach Tumorentität.",
      },
      {
        type: "mc",
        id: "1049_13_h2",
        question: "Was ist Grading bei Tumoren?",
        options: [
          { text: "Die Beschreibung der Tumorgröße (T1–T4)", correct: false },
          { text: "Die histologische Differenzierung des Tumors (G1 = gut differenziert, G3/G4 = schlecht differenziert)", correct: true },
          { text: "Die Anzahl der Lymphknotenmetastasen", correct: false },
          { text: "Das klinische Stadium nach TNM", correct: false },
        ],
        explanation: "Grading = histologischer Differenzierungsgrad: G1 (gut differenziert, günstig) → G2 (mäßig) → G3 (schlecht differenziert) → G4 (undifferenziert, anaplastisch, ungünstig).",
      },
      {
        type: "mc",
        id: "1049_13_h3",
        question: "Welche sind die Hauptrisikofaktoren für Bronchialkarzinom?",
        options: [
          { text: "Rauchen (80–90 %), Asbest, Radon, Luftverschmutzung", correct: true },
          { text: "Fettreiche Ernährung und Adipositas", correct: false },
          { text: "HPV-Infektion als Hauptursache", correct: false },
          { text: "Übermäßiger Alkoholkonsum", correct: false },
        ],
        explanation: "Bronchialkarzinom: Rauchen (dominanter Faktor, ~85 %), Passivrauchen, Asbest, Radon, Luftschadstoffe. Metastasierung: lymphogen (mediastinal), hämatogen (Gehirn, Leber, Knochen, Nebenniere).",
      },
      {
        type: "mc",
        id: "1049_13_h4",
        question: "Welcher Tumormarker ist spezifisch für kolorektale Karzinome?",
        options: [
          { text: "PSA", correct: false },
          { text: "Alpha-1-Fetoprotein (AFP)", correct: false },
          { text: "CEA (Karzinoembryonales Antigen)", correct: true },
          { text: "CA 125", correct: false },
        ],
        explanation: "CEA: Kolorektal-, Magen-, Pankreas-, Bronchialkarzinom. PSA: Prostata. AFP: Leberzellkarzinom, Keimzelltumoren. CA 125: Ovarialkarzinom.",
      },
      {
        type: "true_false",
        id: "1049_13_h5",
        statement: "Mammakarzinom metastasiert bevorzugt in Knochen, Lunge, Leber und Gehirn.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false },
        ],
        explanation: "Wahr. Mammakarzinom: lymphogen (axilläre Lymphknoten), hämatogen in Knochen (Wirbelsäule, Becken), Lunge, Leber, Gehirn. Häufigster Tumor der Frau.",
      },
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1049_13_p4_1",
        question: "Welche 4 Therapieformen stehen bei Malignomen zur Verfügung?",
        options: [
          { text: "Chirurgie, Strahlentherapie, Chemotherapie, Immuntherapie", correct: true },
          { text: "Nur Chemotherapie und Bestrahlung", correct: false },
          { text: "Chirurgie, Homöopathie, Chemotherapie, Antibiotika", correct: false },
          { text: "Strahlentherapie, Dialyse, Transplantation, Hormontherapie", correct: false },
        ],
        explanation: "Tumorbehandlung: Chirurgie (kurativ/palliativ), Strahlentherapie, Chemotherapie, Immuntherapie (inkl. Antikörper, Checkpoint-Inhibitoren). Moderne Ergänzung: zielgerichtete Therapie/Targeted therapy.",
      },
      {
        type: "mc",
        id: "1049_13_p4_2",
        question: "Welche Aussagen zu wichtigen malignen Tumoren sind korrekt? (Mehrere richtig)",
        options: [
          { text: "Prostatakarzinom: häufigster Tumor des Mannes, Tumormarker PSA", correct: true },
          { text: "Zervixkarzinom (Portio): Hauptrisikofaktor HPV 16/18", correct: true },
          { text: "Magenkarzinom: häufigste Metastasierung ins Gehirn", correct: false },
          { text: "Kolorektales Karzinom: CEA als Marker, früh oft asymptomatisch", correct: true },
        ],
        explanation: "Magenkarzinom metastasiert bevorzugt in Lymphknoten, Leber, Peritoneum – nicht primär ins Gehirn. Alle anderen Aussagen korrekt.",
      },
    ],
  }),

  makeDetailedPlant({
    id: "humanpathologie_1049_14",
    title: "Immunpathologie, Allergie & Schmerzsyndrom",
    contextHint: "T/B/Plasmazellen, MHC I/II, Allergie Typ I–IV, Autoimmun/HLA, WHO-Schmerzstufenschema",
    phase1: {
      soil: {
        statement: "MHC-Klasse-I-Moleküle präsentieren Peptide an zytotoxische T-Zellen (CD8+).",
        answer: true,
        solution: "Richtig. MHC I (auf allen Körperzellen): präsentiert endogene Peptide → zytotoxische T-Zellen (CD8+) erkennen infizierte/maligne Zellen. MHC II (nur APZ): präsentiert exogene Peptide → T-Helferzellen (CD4+).",
      },
      seed: {
        statement: "Allergie Typ II ist eine IgE-vermittelte Sofortreaktion (Anaphylaxie).",
        answer: false,
        solution: "Typ I = IgE-vermittelt, Sofortreaktion (Anaphylaxie, Asthma). Typ II = zytotoxisch (IgG/IgM gegen Zelloberflächenantigene). Typ III = Immunkomplexreaktion. Typ IV = T-Zell-vermittelt (verzögert, Tuberkulin-Test, Kontaktdermatitis).",
      },
      water: {
        statement: "WHO-Stufe 2 des Schmerzstufenschemas umfasst schwach wirksame Opioide wie Tramadol.",
        answer: true,
        solution: "Richtig. WHO-Stufenschema: Stufe 1 = Nicht-Opioide (Paracetamol, NSAR). Stufe 2 = schwach wirksame Opioide (Tramadol, Codein) ± Nicht-Opioide. Stufe 3 = stark wirksame Opioide (Morphin, Fentanyl) ± Nicht-Opioide.",
      },
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1049_14_h1",
        question: "Was ist Allergie Typ IV und ein typisches Beispiel?",
        options: [
          { text: "IgE-vermittelte Sofortreaktion; Beispiel: Anaphylaxie", correct: false },
          { text: "T-Zell-vermittelte Spätreaktion (24–72 h); Beispiel: Kontaktdermatitis, Tuberkulin-Test", correct: true },
          { text: "Zytotoxische Antikörperreaktion; Beispiel: Transfusionsreaktion", correct: false },
          { text: "Immunkomplex-Ablagerung; Beispiel: Serumkrankheit", correct: false },
        ],
        explanation: "Typ IV (Spättyp): T-Zell-vermittelt, Reaktion nach 24–72 h. Beispiele: Tuberkulin-Reaktion (Mantoux-Test), Kontaktekzem (Nickel, Latex), Transplantatabstoßung.",
      },
      {
        type: "mc",
        id: "1049_14_h2",
        question: "Was kennzeichnet Allergie Typ I?",
        options: [
          { text: "IgG-vermittelt, zytotoxisch, gegen Zelloberflächenantigene", correct: false },
          { text: "IgE-vermittelt, Mastzellaktivierung → Histaminfreisetzung, Sofortreaktion (Minuten)", correct: true },
          { text: "Immunkomplex-Ablagerung → Komplementaktivierung", correct: false },
          { text: "T-Helferzellen aktivieren Makrophagen nach 24–72 h", correct: false },
        ],
        explanation: "Typ I: Erstkontakt → IgE-Bildung → Mastzellbindung. Zweikontakt → Antigen-IgE-Brücke → Mastzellaktivierung → Histamin → Sofortreaktion. Klinisch: Heuschnupfen, Asthma, Anaphylaxie.",
      },
      {
        type: "mc",
        id: "1049_14_h3",
        question: "Was ist chronischer Schmerz nach IASP-Definition?",
        options: [
          { text: "Jeder Schmerz, der länger als 24 Stunden andauert", correct: false },
          { text: "Schmerz, der über die normale Heilungszeit hinaus besteht (>3–6 Monate)", correct: true },
          { text: "Ausschließlich durch Tumorerkrankungen verursachter Schmerz", correct: false },
          { text: "Schmerz, der sich nicht mit Opioiden behandeln lässt", correct: false },
        ],
        explanation: "IASP: chronischer Schmerz = anhaltend >3–6 Monate oder über die normale Gewebereparaturzeit hinaus. Hat eigenen Krankheitswert (Schmerzkrankheit), unabhängig von der Grunderkrankung.",
      },
      {
        type: "mc",
        id: "1049_14_h4",
        question: "Welche Schmerzfasern leiten welchen Schmerztyp?",
        options: [
          { text: "A-Delta-Fasern: schneller, gut lokalisierbarer Erstschmerz; C-Fasern: langsamer, dumpfer Zweitschmerz", correct: true },
          { text: "C-Fasern: schneller Erstschmerz; A-Delta-Fasern: langsamer Zweitschmerz", correct: false },
          { text: "Beide Fasertypen leiten identischen Schmerztyp", correct: false },
          { text: "A-Delta und C-Fasern leiten nur viszeralen Schmerz", correct: false },
        ],
        explanation: "A-Delta-Fasern (myelinisiert, schnell): scharfer, gut lokalisierbarer Erstschmerz. C-Fasern (unmyelinisiert, langsam): dumpfer, brennender Zweitschmerz. Aufstieg über Tractus spinothalamicus.",
      },
      {
        type: "true_false",
        id: "1049_14_h5",
        statement: "Autoimmunerkrankungen sind mit bestimmten HLA-Typen (MHC) assoziiert.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false },
        ],
        explanation: "Wahr. Beispiele: HLA-B27 → Ankylosierende Spondylitis (M. Bechterew). HLA-DR3/DR4 → Typ-1-Diabetes. HLA-DR4 → Rheumatoide Arthritis. HLA-Assoziation erklärt genetische Suszeptibilität für Autoimmunerkrankungen.",
      },
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1049_14_p4_1",
        question: "Welche Allergietypen und Merkmale sind korrekt zugeordnet? (Mehrere richtig)",
        options: [
          { text: "Typ I: IgE, Sofortreaktion, Histamin, Anaphylaxie", correct: true },
          { text: "Typ II: IgG/IgM, zytotoxisch, z. B. Transfusionsreaktion", correct: true },
          { text: "Typ III: Immunkomplexe, z. B. Serumkrankheit, Arthus-Reaktion", correct: true },
          { text: "Typ IV: IgA-vermittelt, Sofortreaktion", correct: false },
        ],
        explanation: "Typ IV ist T-Zell-vermittelt (kein Antikörper), Spätreaktion 24–72 h. Alle anderen korrekt: I=IgE/Sofort, II=zytotoxisch/IgG, III=Immunkomplex.",
      },
      {
        type: "mc",
        id: "1049_14_p4_2",
        question: "Beschreiben Sie das WHO-Schmerzstufenschema:",
        options: [
          { text: "Stufe 1: Nicht-Opioide; Stufe 2: schwach wirksame Opioide; Stufe 3: stark wirksame Opioide (jeweils ± Koanalgetika)", correct: true },
          { text: "Stufe 1: Opioide; Stufe 2: NSAR; Stufe 3: Paracetamol", correct: false },
          { text: "Nur 2 Stufen: leichte und schwere Analgetika", correct: false },
          { text: "Stufe 1: Tramadol; Stufe 2: Morphin; Stufe 3: Fentanyl", correct: false },
        ],
        explanation: "WHO-Stufenschema (3 Stufen): 1 = Nicht-Opioide (ASS, Ibuprofen, Paracetamol). 2 = schwach wirksame Opioide (Tramadol, Codein) + Stufe-1. 3 = stark wirksame Opioide (Morphin, Oxycodon, Fentanyl) + Stufe-1. Bei jeder Stufe: Koanalgetika möglich.",
      },
    ],
  }),
];
