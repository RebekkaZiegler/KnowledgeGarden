// Studienbrief 1041 — Strukturen und Funktion des Urogenitaltraktes
// Temp file: merge into js/content.js before PACK_CONTENT

const UROGENITALTRAKT_1041_PLANTS = [

  makeDetailedPlant({
    id: "niere_anatomie_makroskopie",
    title: "Niere: Anatomie, Lage, Makroskopie und Entwicklung",
    contextHint: "Studienbrief 1041 Urogenitaltrakt – Niere Anatomie",
    phase1: {
      soil: {
        statement: "Die beiden Nieren liegen retroperitoneal in der Lendengegend beiderseits der Wirbelsäule; sie sind bohnenförmig (10–12 cm lang, 5–6 cm breit, 3–4 cm dick, 120–200 g), kraniell konvergierend; der obere Pol liegt auf Höhe Th11–12, der untere Pol auf Höhe L3; die rechte Niere liegt wegen der Leber etwas tiefer als die linke.",
        answer: true,
        solution: "An jedem oberen Nierenpol sitzt mützenförmig die Nebenniere (endokrines Organ). Der mediale konkave Rand enthält den Hilus renalis (Eingang in den Sinus renalis), durch den A. renalis, V. renalis, Nerven und Lymphgefäße ein- bzw. austreten. Der Sinus renalis enthält Nierenbecken (Pelvis renalis) mit Kelchen, Gefäßäste, Fettgewebe. Von außen nach innen: Fettkapsel (Capsula adiposa) → Capsula fibrosa (Tunica fibrosa + Tunica subfibrosa) → Cortex renalis (feinkörning, 6–10 mm) → Medulla renalis (16–20 Markpyramiden). Entwicklungsgeschichtlich: Vorniere (keine Filtrationsfunktion) → Urniere (z. B. bei Amphibien; beim Mann: Ausführungsgang des Hodens) → Nachniere (= heutige Niere, nur bei Säugern)."
      },
      seed: {
        statement: "Die Vorniere besaß von allen drei Entwicklungsstadien des Urogenitalsystems die stärkste Filtrationsfunktion und bildete bei Amphibien den Ausführungsgang des Hodens.",
        answer: false,
        solution: "Genau umgekehrt: Die Vorniere hatte keinerlei Filtrationsfunktion. Die Urniere (Mesonephros) war das Stadium mit ersten Filtrationseigenschaften und wurde z. B. bei männlichen Amphibien zum Ausführungsgang des Hodens. Die Nachniere (Metanephros) ist die funktionell vollständige Form der heutigen Niere, die ausschließlich bei Säugern vorkommt."
      },
      water: {
        statement: "Neben der Ausscheidungsfunktion produziert die Niere zwei lebenswichtige Hormone: Renin (Blutdruckregulation) und Erythropoetin (steigert die Erythropoese im Knochenmark bei Sauerstoffmangel); bei Entfernung einer Niere hypertrophiert die verbleibende Niere kompensatorisch auf fast die doppelte Größe.",
        answer: true,
        solution: "Renin wird in den juxtaglomerulären Zellen (Polkissen) gebildet und leitet das RAAS-System ein. Erythropoetin wird bei einem Missverhältnis von Sauerstoffbedarf und -zufuhr von Zellen in Glomerulusnähe ausgeschüttet. Die kompensatorische Hypertrophie (Zellen vergrößern sich, Anzahl bleibt gleich) ist von der Arbeitshypertrophie (z. B. bei Proteinüberernährung) zu unterscheiden."
      }
    },
    harvestQuestions: [
      {
        id: "niere_anatomie_makroskopie_h1",
        type: "mc",
        question: "Warum liegt die rechte Niere etwas tiefer als die linke?",
        options: [
          { text: "Die Leber drängt die rechte Niere ca. 1 Wirbelkörper nach unten", correct: true },
          { text: "Die Milz liegt links oben und drückt die linke Niere nach oben", correct: false },
          { text: "Das Herz liegt links und bewirkt dort eine höhere Lage der Niere", correct: false },
          { text: "Die rechte Niere ist größer und schwerer als die linke", correct: false }
        ],
        explanation: "Die rechte Niere liegt durch die Lage der Leber etwas tiefer (ca. 1 Wirbelkörper) als die linke. Die rechte ist außerdem etwas kleiner und leichter als die linke."
      },
      {
        id: "niere_anatomie_makroskopie_h2",
        type: "true_false",
        statement: "Beide Nieren befinden sich retroperitoneal in der Lendengegend und vollziehen alle Zwerchfellbewegungen mit.",
        answer: true,
        explanation: "Die retroperitoneale Lage bedeutet, die Nieren liegen hinter dem Bauchfell. Sie sind an das Zwerchfell angelehnt und machen dessen Atembewegungen vollständig mit. Dies erlaubt ihnen durch das Bindegewebe der Kapsel, Verformungen aufzufangen."
      },
      {
        id: "niere_anatomie_makroskopie_h3",
        type: "mc",
        question: "Was befindet sich im Sinus renalis der Niere?",
        options: [
          { text: "Nierenbecken mit Kelchen, Äste der A. und V. renalis, Nerven, Lymphgefäße und Fettgewebe", correct: true },
          { text: "Ausschließlich das Nierenbecken und die Nierenkelche", correct: false },
          { text: "Die Glomeruli und das Tubulussystem der Nephrone", correct: false },
          { text: "Nur Fettgewebe zum Schutz des Nierenbeckens", correct: false }
        ],
        explanation: "Der Sinus renalis erweitert sich nach innen vom Hilus renalis und enthält das Nierenbecken (Pelvis renalis) mit Nierenkelchen, die Äste der Arteria und Vena renalis, Nerven, Lymphgefäße und Fettgewebe."
      },
      {
        id: "niere_anatomie_makroskopie_h4",
        type: "mc",
        question: "Welche Aussage zur Nierenhülle und Schichtung ist korrekt?",
        options: [
          { text: "Von außen nach innen: Fettkapsel → Capsula fibrosa → Cortex renalis → Medulla renalis", correct: true },
          { text: "Von außen nach innen: Cortex renalis → Medulla renalis → Capsula fibrosa → Fettkapsel", correct: false },
          { text: "Die Tunica fibrosa ist direkt mit der Nierenoberfläche verwachsen", correct: false },
          { text: "Die Medulla renalis liegt außen, der Cortex innen", correct: false }
        ],
        explanation: "Die Schichtung lautet von außen nach innen: Fettkapsel (Capsula adiposa) → Capsula fibrosa (Tunica fibrosa über Tunica subfibrosa) → Cortex renalis (Nierenrinde, feinkörning, 6–10 mm) → Medulla renalis (Nierenmark, 16–20 Pyramiden). Die Tunica subfibrosa ist direkt mit der Nierenoberfläche verwachsen; die Tunica fibrosa ist die derbe Kollagenkapsel."
      },
      {
        id: "niere_anatomie_makroskopie_h5",
        type: "true_false",
        statement: "Die Vorniere, das erste Entwicklungsstadium des Urogenitalsystems, hatte bereits eine Filtrationsfunktion vergleichbar der heutigen Niere.",
        answer: false,
        explanation: "Die Vorniere hatte keinerlei Filtrationsfunktion. Die Urniere (zweites Stadium) entwickelte erstmals Filtereigenschaften und wurde bei männlichen Individuen (z. B. Amphibien) zum Ausführungsgang des Hodens. Die Nachniere ist die heutige Niere der Säuger mit vollständiger Filtrationsfunktion."
      }
    ],
    phase4Questions: [
      {
        id: "niere_anatomie_makroskopie_mc1",
        type: "mc",
        question: "Welche Aussagen zu Lage, Form und Größe der Niere sind korrekt?",
        options: [
          { text: "Beide Nieren liegen retroperitoneal, beiderseits der Wirbelsäule, kraniell konvergierend", correct: true },
          { text: "Oberer Pol: Th11–12; unterer Pol: L3", correct: true },
          { text: "Nierengröße ca. 10–12 cm lang, 5–6 cm breit, 120–200 g", correct: true },
          { text: "Die linke Niere liegt tiefer als die rechte, weil die Milz sie nach unten drängt", correct: false }
        ]
      },
      {
        id: "niere_anatomie_makroskopie_mc2",
        type: "mc",
        question: "Welche Aussagen zur Entwicklungsgeschichte und zu den Funktionen der Niere sind korrekt?",
        options: [
          { text: "Die Nachniere ist die einzige Entwicklungsform mit vollständiger Filtrationsfunktion und kommt nur bei Säugern vor", correct: true },
          { text: "Die Niere produziert Renin (Blutdruckregulation) und Erythropoetin (Blutbildung)", correct: true },
          { text: "Kompensatorische Hypertrophie: nach Entfernung einer Niere wächst die verbleibende auf fast die doppelte Größe", correct: true },
          { text: "Die Vorniere war das am stärksten filtrierende Entwicklungsstadium", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "nephron_feinbau",
    title: "Nephron, Nierenkörperchen, Tubulussystem & juxtaglomerulärer Apparat",
    contextHint: "Studienbrief 1041 Urogenitaltrakt – Nephron und Feinbau",
    phase1: {
      soil: {
        statement: "Das Nephron ist die kleinste funktionelle Einheit der Niere (ca. 1–1,2 Millionen pro Niere); es besteht aus dem Nierenkörperchen (Glomerulus + Bowmansche Kapsel) und dem Tubulussystem (proximaler Tubulus, Henlesche Schleife, distaler Tubulus, Sammelrohr); Glomerulus und Bowmansche Kapsel zusammen heißen Malpighisches Körperchen.",
        answer: true,
        solution: "Der Glomerulus ist ein Kapillarknäuel (20–40 Schleifen) mit rein arteriellem Charakter — er dient ausschließlich der Filtration, nicht der Sauerstoffversorgung. Die Gesamtkapillarlänge beider Nieren beträgt 25 km, die Gesamtoberfläche 1,5 m². Die Bowmansche Kapsel besitzt ein parietales (äußeres) und ein viszerales (eingeweidiges) Blatt; dazwischen liegt der Kapselraum, in den der Primärharn abfiltriert wird. Der proximale Tubulus ist der längste Abschnitt mit kubischem Epithel und Bürstensaum; er liegt in der Nierenrinde. Das Tubulussystem liegt im Nierenmark."
      },
      seed: {
        statement: "Im Glomerulus findet neben der Filtration des Primärharns auch die Sauerstoffversorgung der Nierenrinde statt, da das Kapillarknäuel arterielles Blut führt.",
        answer: false,
        solution: "Obwohl der Glomerulus tatsächlich arterielles Blut führt (nur arterielle Charakters — zwischen Vasa afferentia und Vasa efferentia), findet dort KEINE Sauerstoffversorgung statt. Das Kapillarknäuel dient ausschließlich der Blutfiltration (Primärharnbildung). Die Sauerstoffversorgung des Nierengewebes übernehmen die peritubuläre Kapillaren nach dem Glomerulus."
      },
      water: {
        statement: "Der juxtaglomeruläre Apparat besteht aus Macula densa (chemosensitives Feld, misst Natriumgehalt), reninbildenden Zellen (Polkissen, sezernieren Renin bei Blutdruckabfall) und ist die Kontaktstelle des Vas afferens mit dem distalen Nierentubulus; er reguliert Elektrolythaushalt und Blutdruck.",
        answer: true,
        solution: "Die Macula densa misst den Natriumgehalt des Tubulusfiltrats. Die Polkissen (juxtaglomeruläre Zellen) sind spezialisierte glatte Muskelzellen in der Gefäßwand des Vas afferens; sie sezernieren Renin und leiten damit das RAAS ein. Blutversorgung der Niere: A. renalis → Aa. interlobares → Aa. arcuatae → Aa. interlobulares → Vasa afferentia → Glomeruli → Vasa efferentia → peritubuläres Kapillarsystem; Nierenrinde erhält 90%, Nierenmark 10% der Gesamtdurchblutung von ca. 1.500–1.800 L/Tag."
      }
    },
    harvestQuestions: [
      {
        id: "nephron_feinbau_h1",
        type: "mc",
        question: "Welche Funktion hat das Kapillarknäuel (Glomerulus) im Nierenkörperchen?",
        options: [
          { text: "Ausschließlich Filtration des Blutes zur Primärharnbildung — keine Sauerstoffversorgung", correct: true },
          { text: "Sauerstoffversorgung und Filtration des Nierengewebes", correct: false },
          { text: "Rückresorption von Wasser und Glukose", correct: false },
          { text: "Sekretion von Renin und Erythropoetin", correct: false }
        ],
        explanation: "Das Kapillarknäuel des Glomerulus hat rein arteriellen Charakter und dient ausschließlich der Filtration (Primärharnbildung). Es findet dort keine Sauerstoffversorgung statt. Die Sauerstoffversorgung des Nierengewebes übernehmen die peritubuläre Kapillaren."
      },
      {
        id: "nephron_feinbau_h2",
        type: "true_false",
        statement: "In welchen Raum wird der Primärharn im Nierenkörperchen abfiltriert? In den Kapselraum zwischen dem parietalen und viszeralen Blatt der Bowmanschen Kapsel.",
        answer: true,
        explanation: "Der Glomerulus ist in die Bowmansche Kapsel eingestülpt. Zwischen dem parietalen (äußeren) und viszeralen (eingeweidigen) Blatt der Kapsel entsteht so der Kapselraum, in den der Primärharn (Ultrafiltrat) abgepresst wird und von wo aus er in den proximalen Tubulus fließt."
      },
      {
        id: "nephron_feinbau_h3",
        type: "mc",
        question: "Welche vier Abschnitte bilden das Tubulussystem des Nephrons in der richtigen Reihenfolge?",
        options: [
          { text: "Proximaler Tubulus → Henlesche Schleife → distaler Tubulus → Sammelrohr", correct: true },
          { text: "Distaler Tubulus → Henlesche Schleife → proximaler Tubulus → Sammelrohr", correct: false },
          { text: "Sammelrohr → proximaler Tubulus → Henlesche Schleife → distaler Tubulus", correct: false },
          { text: "Proximaler Tubulus → distaler Tubulus → Henlesche Schleife → Sammelrohr", correct: false }
        ],
        explanation: "Die Reihenfolge des Tubulussystems ist: proximaler Tubulus (kubisches Epithel mit Bürstensaum, Hauptort der Resorption) → Henlesche Schleife (Harnkonzentration) → distaler Tubulus (Feinregulation) → Sammelrohr (endgültige Konzentrierung). Glomeruli liegen in der Nierenrinde, das Tubulussystem im Nierenmark."
      },
      {
        id: "nephron_feinbau_h4",
        type: "mc",
        question: "Aus welchen drei Komponenten besteht der juxtaglomeruläre Apparat?",
        options: [
          { text: "Macula densa, reninbildende Zellen (Polkissen) und juxtaglomeruläre Zellen", correct: true },
          { text: "Glomerulus, Bowmansche Kapsel und proximaler Tubulus", correct: false },
          { text: "Vasa afferentia, Vasa efferentia und peritubuläre Kapillaren", correct: false },
          { text: "Sammelrohr, distaler Tubulus und Henlesche Schleife", correct: false }
        ],
        explanation: "Der juxtaglomeruläre Apparat ist die Kontaktstelle des Vas afferens mit dem distalen Tubulus und besteht aus: Macula densa (misst Natriumgehalt, chemosensitiv), reninbildenden Zellen/Polkissen (sezernieren Renin bei Blutdruckabfall) und Polkissenzellen (juxtaglomeruläre Zellen). Er reguliert Elektrolythaushalt und Blutdruck."
      },
      {
        id: "nephron_feinbau_h5",
        type: "true_false",
        statement: "Jede Niere enthält ca. 1–1,2 Millionen Nephrone. Der proximale Tubulus ist der längste Teil und weist ein kubisches Epithel mit Bürstensaum auf.",
        answer: true,
        explanation: "Jede Niere enthält ca. 1–1,2 Millionen Nephrone als funktionelle Einheiten. Der proximale Tubulus ist tatsächlich der längste Abschnitt des Nephrons; sein kubisches Epithel mit Bürstensaum und reichlich Mitochondrien zeigt, dass dort energieaufwendige aktive Transportprozesse stattfinden (Hauptort der Rückresorption)."
      }
    ],
    phase4Questions: [
      {
        id: "nephron_feinbau_mc1",
        type: "mc",
        question: "Welche Aussagen zum Nephron und Nierenkörperchen sind korrekt?",
        options: [
          { text: "Das Nephron besteht aus Nierenkörperchen (Glomerulus + Bowmansche Kapsel) und Tubulussystem", correct: true },
          { text: "Glomerulus + Bowmansche Kapsel = Malpighisches Körperchen", correct: true },
          { text: "Der Primärharn wird in den Kapselraum der Bowmanschen Kapsel abfiltriert", correct: true },
          { text: "Im Glomerulus erfolgt neben der Filtration auch die Sauerstoffversorgung der Rinde", correct: false }
        ]
      },
      {
        id: "nephron_feinbau_mc2",
        type: "mc",
        question: "Welche Aussagen zur Blutversorgung der Niere und zum juxtaglomerulären Apparat sind korrekt?",
        options: [
          { text: "Die Niere wird täglich von ca. 1.500–1.800 Litern Blut durchflossen", correct: true },
          { text: "Nierenrinde erhält ca. 90% der Gesamtdurchblutung, Nierenmark ca. 10%", correct: true },
          { text: "Die Polkissen des juxtaglomerulären Apparats sezernieren Renin bei Blutdruckabfall", correct: true },
          { text: "Die Macula densa misst den Kalziumgehalt des Tubulusfiltrats", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "harnbereitung_filtration_resorption",
    title: "Harnbereitung: Filtration, Rückresorption, Sekretion und Clearance",
    contextHint: "Studienbrief 1041 Urogenitaltrakt – Harnbereitung",
    phase1: {
      soil: {
        statement: "Die tägliche Primärharnmenge beträgt ca. 150–180 Liter; der Primärharn ist isoosmotisch zum Plasma, frei von Blutkörperchen und enthält nur minimale Eiweißmengen; die Filtration ist ein passiver Vorgang, der von einem Blutdruck von ca. 70 mmHg abhängig ist und bei systolischen Werten von 80–180 mmHg fehlerlos funktioniert.",
        answer: true,
        solution: "Dem glomerulären Kapillardruck wirken zwei Kräfte entgegen: der kolloidosmotische Druck (Eiweiße im Blut) und der Druck in der Bowmanschen Kapsel; der effektive Filtrationsdruck beträgt ca. 35 mmHg. Die Autoregulation erfolgt über Rezeptoren in den glatten Muskeln der Vasa afferentia — bei Hypovolämie sezernieren juxtaglomeruläre Zellen Renin. Ins Ultrafiltrat gehen: Wasser, Harnstoff, Harnsäure, Glukose, Salze, Aminosäuren. Vom Primärharn werden ca. 90–99% rückresorbiert; es verbleiben nur ca. 1,5–1,8 L Endharn täglich."
      },
      seed: {
        statement: "Die Rückresorption im Tubulussystem erfolgt ausschließlich passiv durch Diffusion; aktive Transportmechanismen spielen in der Niere keine Rolle.",
        answer: false,
        solution: "Es gibt zwei Mechanismen: aktive Resorption (energieabhängig über ATP aus Mitochondrien der Tubuluswandzellen) für Kalium, Natrium, Aminosäuren, Kreatin, Sulfat, Harnsäure, Ascorbinsäure, Glukose und Ketonkörper — und passive Resorption (Diffusion) für Harnstoff und Wasser. Der Hauptteil der Resorption findet im proximalen Tubulus statt. Wasser wird im distalen Tubulus unter ADH-Kontrolle resorbiert."
      },
      water: {
        statement: "Clearance einer Substanz = Urinkonzentration × Nierenminutenvolumen / Plasmakonzentration; sie gibt das Plasmavolumen an, das pro Minute von dieser Substanz vollständig befreit wird; zur Messung verwendet man Inulin oder Paraaminohippursäure, da sie nur filtriert, nicht rückresorbiert werden.",
        answer: true,
        solution: "Glukose wird zu fast 100% im proximalen Tubulus aktiv rückresorbiert; erst ab einer Konzentration von 180 mg/dl (Nierenschwelle) erscheint Glukose im Harn (Glykosurie, z. B. bei Diabetes mellitus). Harnsäure wird über den proximalen Tubulus sezerniert und dann zu ca. 90% in der Henleschen Schleife resorbiert. Sekretion: organische Säuren, Glukuronide, Penizillin, Diuretika, Ammoniak, H⁺-Ionen; Hauptort Sekretion: proximaler Tubulus; Henlesche Schleife: Harnkonzentration + Sekretion von Kalium, Kreatinin."
      }
    },
    harvestQuestions: [
      {
        id: "harnbereitung_h1",
        type: "mc",
        question: "Welche Druckverhältnisse sind für die glomeruläre Filtration notwendig?",
        options: [
          { text: "Ca. 70 mmHg Blutdruck in den Glomeruli; effektiver Filtrationsdruck ca. 35 mmHg nach Abzug von kolloidosmotischem Druck und Kapseldruck", correct: true },
          { text: "Mindestens 120 mmHg systemischer Blutdruck, da die Niere nur bei Hypertonie filtriert", correct: false },
          { text: "Kein Druck nötig, da Filtration aktiv durch Tubulusepithelzellen erfolgt", correct: false },
          { text: "Ca. 10 mmHg genügen, da der Glomerulus sehr durchlässig ist", correct: false }
        ],
        explanation: "Die Filtration ist ein passiver Vorgang abhängig vom Blutdruck. Ca. 70 mmHg sind im Glomerulus nötig, um einen effektiven Filtrationsdruck von ca. 35 mmHg aufzubauen (nach Abzug von kolloidosmotischem Druck der Plasmaproteine und dem Druck in der Bowmanschen Kapsel). Autoregulation hält diesen Druck im Bereich systolischer RR 80–180 mmHg aufrecht."
      },
      {
        id: "harnbereitung_h2",
        type: "true_false",
        statement: "Glukose wird bei gesunden Menschen zu fast 100% im proximalen Tubulus rückresorbiert; erst ab einer Blutglukose von ca. 180 mg/dl (Nierenschwelle) erscheint Glukose im Urin.",
        answer: true,
        explanation: "Der Transport von Glukose ist an Na⁺ gekoppelt (sekundär aktiver Transport). Die Nierenschwelle liegt bei ca. 180 mg/dl (normaler Blutzucker: ca. 110 mg/dl). Wird sie überschritten (z. B. bei Diabetes mellitus), übersteigt die Filtratmenge die Resorptionskapazität → Glykosurie."
      },
      {
        id: "harnbereitung_h3",
        type: "mc",
        question: "Wo findet der Hauptteil der tubulären Rückresorption statt?",
        options: [
          { text: "Im proximalen Tubulus", correct: true },
          { text: "In der Henleschen Schleife", correct: false },
          { text: "Im distalen Tubulus", correct: false },
          { text: "Im Sammelrohr", correct: false }
        ],
        explanation: "Der Hauptteil der Rückresorption des Primärharns findet im proximalen Tubulus statt. Der distale Tubulus und das Sammelrohr dienen der Feineinstellung (v. a. Wasserresorption unter ADH). Die Henlesche Schleife ist hauptsächlich für die Harnkonzentration verantwortlich. Aus 150–180 L Primärharn werden so nur ca. 1,5–1,8 L Endharn."
      },
      {
        id: "harnbereitung_h4",
        type: "mc",
        question: "Was versteht man unter der Clearance einer Substanz?",
        options: [
          { text: "Das Plasmavolumen, das pro Minute durch die Niere von der betreffenden Substanz vollständig befreit wird (= renale Volumenklärrate)", correct: true },
          { text: "Die Gesamtmenge einer Substanz, die täglich im Urin ausgeschieden wird", correct: false },
          { text: "Der Prozentsatz einer Substanz, der im Tubulussystem rückresorbiert wird", correct: false },
          { text: "Die Konzentration einer Substanz im Primärharn im Vergleich zum Plasma", correct: false }
        ],
        explanation: "Clearance (C) = Urinkonzentration (U) × Nierenminutenvolumen (M) / Plasmakonzentration (P). Sie ist eine substanzbezogene Volumenklärrate des Blutplasmas. Zur Messung verwendet man Inulin oder Paraaminohippursäure, die nur filtriert und nicht rückresorbiert werden."
      },
      {
        id: "harnbereitung_h5",
        type: "true_false",
        statement: "Durch Sekretion gelangen Substanzen wie Penizillin, Diuretika, Ammoniak und H⁺-Ionen aus dem Kapillarblut in die Tubulusflüssigkeit, um ausgeschieden zu werden.",
        answer: true,
        explanation: "Die tubuläre Sekretion ist neben Filtration und Rückresorption der dritte Mechanismus der Harnbereitung. Über transzelluläre Sekretion gelangen organische Säuren, Glukuronide, Sulfate, körperfremde Substanzen (Penizillin, Diuretika), Ammoniak und H⁺-Ionen aus dem Kapillarblut in die Tubulusflüssigkeit. Hauptort: proximaler Tubulus."
      }
    ],
    phase4Questions: [
      {
        id: "harnbereitung_mc1",
        type: "mc",
        question: "Welche Aussagen zur glomerulären Filtration sind korrekt?",
        options: [
          { text: "Primärharn: ca. 150–180 L/Tag, isoosmotisch zum Plasma, frei von Blutkörperchen", correct: true },
          { text: "Filtration ist passiv, abhängig vom Blutdruck; effektiver Filtrationsdruck ca. 35 mmHg", correct: true },
          { text: "Autoregulation über Rezeptoren in den glatten Muskeln der Vasa afferentia", correct: true },
          { text: "Der Primärharn enthält große Mengen Eiweiß, die dann vollständig rückresorbiert werden", correct: false }
        ]
      },
      {
        id: "harnbereitung_mc2",
        type: "mc",
        question: "Welche Aussagen zu Rückresorption und Sekretion im Tubulussystem sind korrekt?",
        options: [
          { text: "99% des Primärharns wird rückresorbiert; es verbleiben nur ca. 1,5–1,8 L Endharn täglich", correct: true },
          { text: "Aktiv rückresorbiert: Na⁺, K⁺, Aminosäuren, Glukose, Ascorbinsäure", correct: true },
          { text: "Glukose wird zu fast 100% im proximalen Tubulus resorbiert; Nierenschwelle: 180 mg/dl", correct: true },
          { text: "Wasser wird ausschließlich im proximalen Tubulus rückresorbiert, unabhängig von Hormonen", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "niere_regulation",
    title: "Regulatorische Funktionen der Niere: ADH, RAAS und Säure-Basen-Haushalt",
    contextHint: "Studienbrief 1041 Urogenitaltrakt – Niere Regulation",
    phase1: {
      soil: {
        statement: "Das Renin-Angiotensin-Aldosteron-System (RAAS) wird aktiviert bei Blutdruckabfall: Renin (aus Polkissen der Niere) → spaltet Angiotensinogen (Leber) → Angiotensin I → durch Converting-Enzyme → Angiotensin II (stärkste bekannte vasokonstriktive Substanz) → Aldosteron (Nebennierenrinde: Na⁺-Rückresorption ↑, Wasserausscheidung ↓).",
        answer: true,
        solution: "Das RAAS wird aktiviert bei: Abnahme des Plasmavolumens/Blutdruckabfall, zur RR-Aufrechterhaltung nach Salzentzug und bei bestimmten Hypertonie-Formen. Angiotensin II wirkt stark vasokonstriktorisch und stimuliert die Aldosteronausschüttung aus der Nebennierenrinde. Aldosteron hält das Gleichgewicht von Natrium (extrazellulär) und Kalium (intrazellulär) aufrecht. Störungen dieses Systems → schwer einstellbarer Blutdruck mit starken Schwankungen."
      },
      seed: {
        statement: "Beim Diabetes insipidus renalis liegt die Ursache in einer mangelnden ADH-Produktion im Hypophysenhinterlappen; die Therapie erfolgt durch ADH-Substitution (z. B. Minirin).",
        answer: false,
        solution: "Das ist die Beschreibung des Diabetes insipidus centralis. Beim Diabetes insipidus renalis ist die Ursache eine ungenügende Anzahl oder überwiegend defekte Rezeptoren für ADH in der Niere — die ADH-Produktion selbst ist normal. Da keine funktionierenden Rezeptoren vorhanden sind, wirkt ADH-Substitution nicht; die Therapie ist sehr schwierig. Folge beider Formen: Polyurie (beim renalen Typ ca. 10 L/Tag)."
      },
      water: {
        statement: "Die Niere reguliert den Säure-Basen-Haushalt durch Ausscheidung von H⁺-Ionen statt Na⁺ und Rückresorption von Bikarbonat in den Tubuluszellen; ergänzend reguliert die Lunge durch CO₂-Abatmung; beide Systeme sind durch die Puffereigenschaften des Blutes verknüpft.",
        answer: true,
        solution: "In den Tubuluszellen entsteht aus Wasser und Kohlendioxid Kohlensäure, die in H⁺ und Bikarbonat dissoziiert. Das H⁺-Ion wird statt Na⁺ in den Harn abgegeben — das Natrium verbleibt im Körper. Eine weitere Natriumeinsparung erfolgt durch Bildung von Ammoniak aus Ammoniumchlorid. Störungen: Metabolische Azidose (Niere kann H⁺ nicht ausreichend ausscheiden), respiratorische Azidose (Lunge kann CO₂ nicht abatmen). Das Schwartz-Bartter-Syndrom entsteht durch überschießende ADH-Produktion → zu starke Wasserrückresorption → Oligurie."
      }
    },
    harvestQuestions: [
      {
        id: "niere_regulation_h1",
        type: "mc",
        question: "Wie wirkt ADH (Antidiuretisches Hormon) auf die Niere?",
        options: [
          { text: "ADH erhöht die Wasserpermeabilität im distalen Tubulus und Sammelrohr → Wasserrückresorption ↑ → Urinausscheidung ↓", correct: true },
          { text: "ADH hemmt die Natriumrückresorption im proximalen Tubulus → mehr Wasser wird ausgeschieden", correct: false },
          { text: "ADH stimuliert die Reninproduktion im juxtaglomerulären Apparat", correct: false },
          { text: "ADH verringert den Filtrationsdruck im Glomerulus → weniger Primärharn", correct: false }
        ],
        explanation: "ADH (= Adiuretin = Vasopressin) wird aus dem Hypophysenhinterlappen (HHL) ausgeschüttet und erhöht die Wasserpermeabilität (Durchlässigkeit) im distalen Tubulus und Sammelrohr. Dadurch wird mehr Wasser rückresorbiert, die Urinmenge sinkt. ADH-Ausschüttung wird gesteuert durch: Osmorezeptoren im Hypothalamus (hyperton → ADH↑) und Volumenrezeptoren in Lungenvenen/linkem Vorhof (geringes Volumen → ADH↑)."
      },
      {
        id: "niere_regulation_h2",
        type: "mc",
        question: "Worin unterscheiden sich Diabetes insipidus centralis und renalis?",
        options: [
          { text: "Centralis: mangelnde ADH-Produktion (Therapie: ADH-Substitution); Renalis: defekte ADH-Rezeptoren in der Niere (Therapie sehr schwierig)", correct: true },
          { text: "Centralis: defekte ADH-Rezeptoren; Renalis: mangelnde ADH-Produktion", correct: false },
          { text: "Beide werden durch ADH-Substitution behandelt", correct: false },
          { text: "Beim Diabetes insipidus centralis besteht Oligurie, beim renalen Typ Polyurie", correct: false }
        ],
        explanation: "Diabetes insipidus centralis: Ursache ist eine mangelnde ADH-Produktion im HHL → Wasserrückresorption ↓ → Polyurie → Therapie: ADH-Substitution (z. B. Minirin). Diabetes insipidus renalis: Ursache sind defekte/ungenügende ADH-Rezeptoren in der Niere → ADH wirkt nicht → Polyurie ca. 10 L/Tag → Therapie sehr schwierig. Schwartz-Bartter-Syndrom: überschießende ADH-Produktion → Oligurie."
      },
      {
        id: "niere_regulation_h3",
        type: "true_false",
        statement: "Im RAAS-System spaltet Renin das in der Leber gebildete Angiotensinogen zu Angiotensin I, das durch Converting-Enzyme zu Angiotensin II umgewandelt wird, der stärksten bekannten vasokonstriktiven Substanz.",
        answer: true,
        explanation: "Renin wird aus den Polkissen der Niere bei Blutdruckabfall freigesetzt. Es spaltet das in der Leber gebildete Angiotensinogen (gebunden an alpha-2-Globulin) zu Angiotensin I. Converting-Enzyme (ca. 60 Enzyme) spalten 2 Aminosäuren ab → Angiotensin II: stärkste bekannte peripher und zentral vasokonstriktorische Substanz. Angiotensin II führt auch zur Aldosteronausschüttung."
      },
      {
        id: "niere_regulation_h4",
        type: "mc",
        question: "Wie reguliert die Niere den Säure-Basen-Haushalt auf zellulärer Ebene?",
        options: [
          { text: "In Tubuluszellen: H₂O + CO₂ → H₂CO₃ → H⁺ + HCO₃⁻; H⁺ wird statt Na⁺ in den Harn abgegeben, Na⁺ verbleibt im Körper", correct: true },
          { text: "Die Niere scheidet überschüssige Basen als Kaliumbikarbonat aus", correct: false },
          { text: "Die Niere neutralisiert Säuren direkt durch Zugabe von Bikarbonat in die Blutbahn", correct: false },
          { text: "Die Regulation erfolgt ausschließlich über die Henlesche Schleife durch H⁺-Sekretion", correct: false }
        ],
        explanation: "In den Tubuluszellen entsteht aus Wasser und CO₂ Kohlensäure, die in H⁺ und Bikarbonat dissoziiert. Das H⁺-Ion wird gegen Na⁺ in den Harn abgegeben — Na⁺ verbleibt im Körper. Ergänzend kann Natrium auch durch Ammoniak-Bildung aus Ammoniumchlorid eingespart werden. Die Lunge ergänzt die renale Regulation durch CO₂-Abatmung."
      },
      {
        id: "niere_regulation_h5",
        type: "true_false",
        statement: "Aldosteron aus der Nebennierenrinde erhöht die Natriumrückresorption und vermindert die Wasserausscheidung; es wird durch Angiotensin II ausgelöst und hält das Gleichgewicht von Na⁺ und K⁺ aufrecht.",
        answer: true,
        explanation: "Aldosteron ist ein Mineralokortikoid der Nebennierenrinde. Es wird durch Angiotensin II ausgelöst und wirkt: Na⁺-Rückresorption ↑ → Wasser folgt osmotisch → Urinausscheidung ↓ → Blutvolumen ↑ → Blutdruck ↑. Gleichzeitig hält es das Gleichgewicht von Na⁺ (extrazellulär) und K⁺ (intrazellulär) aufrecht, was für ein konstantes inneres Milieu unerlässlich ist."
      }
    ],
    phase4Questions: [
      {
        id: "niere_regulation_mc1",
        type: "mc",
        question: "Welche Aussagen zum ADH-System und der Wasserregulation sind korrekt?",
        options: [
          { text: "ADH erhöht die Wasserpermeabilität im distalen Tubulus und Sammelrohr → Wasserrückresorption ↑", correct: true },
          { text: "ADH-Ausschüttung: über Osmorezeptoren im Hypothalamus und Volumenrezeptoren in Lungenvenen/linkem Vorhof", correct: true },
          { text: "Diabetes insipidus centralis: mangelnde ADH-Produktion → Polyurie → Therapie: ADH-Substitution", correct: true },
          { text: "Beim Diabetes insipidus renalis helfen ADH-Substitutionspräparate zuverlässig", correct: false }
        ]
      },
      {
        id: "niere_regulation_mc2",
        type: "mc",
        question: "Welche Aussagen zum RAAS und zum Säure-Basen-Haushalt sind korrekt?",
        options: [
          { text: "RAAS-Kaskade: Blutdruckabfall → Renin → Angiotensin I → Angiotensin II → Aldosteron", correct: true },
          { text: "Angiotensin II ist die stärkste bekannte vasokonstriktive Substanz", correct: true },
          { text: "Niere: H⁺ statt Na⁺ in Harn → Na⁺ verbleibt; Lunge: CO₂-Abatmung — beides reguliert den pH", correct: true },
          { text: "Aldosteron steigert die Kaliumrückresorption und vermindert die Natriumausscheidung nicht", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "harnleiter_blase_roehre",
    title: "Harnleiter, Harnblase und Harnröhre",
    contextHint: "Studienbrief 1041 Urogenitaltrakt – ableitende Harnwege",
    phase1: {
      soil: {
        statement: "Die paarigen Harnleiter (Ureteren, ca. 25–30 cm lang, Ø 4–7 mm) transportieren den Harn aktiv durch peristaltische Bewegungen (1–4/min) vom Nierenbecken zur Harnblase; sie verlaufen retroperitoneal und münden schräg von hinten in die Harnblase; im Verlauf gibt es drei physiologische Engstellen: am Nierenbecken, bei Überkreuzung mit den Beckengefäßen und beim Durchtritt durch die Blasenwand.",
        answer: true,
        solution: "Die drei physiologischen Engstellen sind Prädilektionsstellen für das Festsetzen von Nierensteinen — dies verursacht Koliken. Der Wandaufbau des Harnleiters: Tunica mucosa (Übergangsepithel, Längsfalten) → Tunica submucosa → Tunica muscularis (Ring- und Längsmuskulatur, erzeugt Peristaltik) → Adventitia. Harnleiteranomalien bei ca. 2% der Bevölkerung: Ureter fissus (gespalten, ca. 75%) und Ureter duplex (Verdopplung, ca. 25%)."
      },
      seed: {
        statement: "Die Harnblase kann physiologisch maximal 300–350 ml fassen; bei größerer Füllung kommt es zwingend zur Harnentleerung.",
        answer: false,
        solution: "Harndrang setzt bei einer Füllung von ca. 300–350 ml ein, aber man ist willentlich in der Lage, diese Menge zu verdoppeln (ca. 700 ml). Erst bei ca. 500 ml setzt die Harnentleerung zwingend ein, sofern man sie nicht willkürlich zurückhält. Die Blasenwand besteht aus Übergangsepithel (passt sich Volumenschwankungen an), dicker Muskulatur (netzförmig) und enthält Dehnungsrezeptoren, die bei entsprechender Füllung parasympathische Fasern reizen → Miktion."
      },
      water: {
        statement: "Die weibliche Harnröhre ist mit <5 cm deutlich kürzer als die männliche (ca. 20 cm); diese anatomische Besonderheit führt zu einem erhöhten Risiko für Blaseninfektionen (Cystitis) bei der Frau; die männliche Harnröhre dient als gemeinsamer Harn- und Samenweg.",
        answer: true,
        solution: "Die männliche Harnröhre (Urethra masculina, ca. 20 cm) gliedert sich in vier Abschnitte: Pars praeprostatica, Pars prostatica, Pars membranacea, Pars cavernosa. Sie wird daher auch als Harn-Samen-Röhre bezeichnet. Die weibliche Harnröhre (<5 cm) reicht von der Harnblase bis zum Orificium externum zwischen Klitoris und Vagina. Die Miktionsstörungen umfassen: Anurie (<100 ml/24h), Oligurie (100–500 ml), Polyurie (>3000 ml), Pollakisurie, Nykturie, Dysurie, Algurie, Hämaturie (Blut im Urin), Pyurie (Eiter im Urin), Inkontinenz."
      }
    },
    harvestQuestions: [
      {
        id: "harnleiter_blase_roehre_h1",
        type: "mc",
        question: "Wo befinden sich die drei physiologischen Engstellen des Harnleiters?",
        options: [
          { text: "Am Nierenbecken, bei Überkreuzung mit den Beckengefäßen und beim Durchtritt durch die Blasenwand", correct: true },
          { text: "Am Nierenhilus, am Nierenbecken und in der Harnblase", correct: false },
          { text: "Im oberen, mittleren und unteren Drittel des Harnleiters, gleichmäßig verteilt", correct: false },
          { text: "Nur an der Einmündung in die Harnblase und am Nierenbecken", correct: false }
        ],
        explanation: "Im Verlauf des Harnleiters (ca. 25–30 cm) gibt es drei physiologische Engstellen: 1. Am Nierenbecken (beim Abgang), 2. bei der Überkreuzung mit den Beckengefäßen, 3. beim Durchtritt durch die Blasenwand. An diesen Prädilektionsstellen setzen sich Nierensteine bevorzugt fest und verursachen Koliken."
      },
      {
        id: "harnleiter_blase_roehre_h2",
        type: "true_false",
        statement: "Der Harntransport im Harnleiter ist ein aktiver Prozess: die Tunica muscularis erzeugt 1–4 peristaltische Bewegungen pro Minute.",
        answer: true,
        explanation: "Im Gegensatz zur passiven Schwerkraft transportiert der Harnleiter den Harn aktiv durch Peristaltik. Die Tunica muscularis (kräftige Ring- und Längsmuskulatur) erzeugt 1–4 Kontraktionswellen pro Minute. Die Innenseite des Harnleiters ist mit Übergangsepithel (Urothel) ausgekleidet, das bei Dehnung zweischichtig, bei Zusammenziehung mehrschichtig erscheint."
      },
      {
        id: "harnleiter_blase_roehre_h3",
        type: "mc",
        question: "Bei welchem Füllungsvolumen setzt der Harndrang in der Harnblase ein, und wie viel kann man willkürlich zurückhalten?",
        options: [
          { text: "Harndrang bei ca. 300–350 ml; willkürlich zurückhalten bis ca. 700 ml möglich", correct: true },
          { text: "Harndrang bei ca. 100 ml; mehr als 200 ml nicht möglich zurückzuhalten", correct: false },
          { text: "Harndrang bei ca. 500 ml; bis ca. 1 Liter möglich", correct: false },
          { text: "Harndrang bei ca. 700 ml; Harnentleerung nicht willkürlich kontrollierbar", correct: false }
        ],
        explanation: "Harndrang entsteht bei ca. 300–350 ml durch Reizung von Dehnungsrezeptoren in der Blasenwand. Diese reizen parasympathische Fasern → Entleerungsreflex. Willkürlich lässt sich die Harnmenge auf ca. 700 ml verdoppeln. Bei ca. 500 ml setzt die Harnentleerung spätestens ein, sofern man sie nicht aktiv zurückhält. Die Harnentleerung (Miktion) wird durch den M. transversus perinei profundus (Blasenschließmuskel) kontrolliert."
      },
      {
        id: "harnleiter_blase_roehre_h4",
        type: "mc",
        question: "Was beschreibt der Begriff 'Polyurie'?",
        options: [
          { text: "Ausscheidung von mehr als 3000 ml Urin pro 24 Stunden", correct: true },
          { text: "Ausscheidung von weniger als 100 ml Urin pro 24 Stunden", correct: false },
          { text: "Schmerzen beim Wasserlassen", correct: false },
          { text: "Häufiges Wasserlassen in kleinen Mengen", correct: false }
        ],
        explanation: "Polyurie: Urinausscheidung >3000 ml/24h. Anurie: <100 ml/24h. Oligurie: 100–500 ml/24h. Pollakisurie: häufiges Wasserlassen in kleinen Mengen. Algurie: Schmerzen beim Wasserlassen. Dysurie: erschwerte Harnentleerung (evtl. tropfenweise). Nykturie: vermehrtes nächtliches Wasserlassen. Inkontinenz: unfreiwilliger Urinabgang."
      },
      {
        id: "harnleiter_blase_roehre_h5",
        type: "true_false",
        statement: "Die männliche Harnröhre (ca. 20 cm) hat vier Abschnitte und dient als gemeinsamer Harn- und Samenweg; die weibliche Harnröhre (<5 cm) mündet zwischen Klitoris und Vagina.",
        answer: true,
        explanation: "Die Urethra masculina (ca. 20 cm) gliedert sich in: Pars praeprostatica, Pars prostatica (hier münden die Ductuli ejaculatorii), Pars membranacea, Pars cavernosa. Sie ist daher Harn-Samen-Röhre. Die Urethra feminina (<5 cm) reicht von der Blase bis zum Orificium externum urethrae zwischen Klitoris und Vagina. Die kurze Länge erklärt die erhöhte Anfälligkeit der Frau für Harnwegsinfekte (Cystitis)."
      }
    ],
    phase4Questions: [
      {
        id: "harnleiter_blase_roehre_mc1",
        type: "mc",
        question: "Welche Aussagen zu Harnleiter und Harnblase sind korrekt?",
        options: [
          { text: "Harnleiter: ca. 25–30 cm, retroperitoneal, 1–4 peristaltische Bewegungen/min", correct: true },
          { text: "3 physiologische Engstellen: Nierenbecken, Beckengefäß-Überkreuzung, Blasenwand-Durchtritt", correct: true },
          { text: "Harndrang bei ca. 300–350 ml; willkürlich bis ca. 700 ml zurückhaltbar", correct: true },
          { text: "Die Harnblase ist mit Plattenepithel ausgekleidet, das sich nicht ausdehnen kann", correct: false }
        ]
      },
      {
        id: "harnleiter_blase_roehre_mc2",
        type: "mc",
        question: "Welche Aussagen zu Miktionsstörungen und Harnröhre sind korrekt?",
        options: [
          { text: "Anurie: <100 ml/24h; Oligurie: 100–500 ml; Polyurie: >3000 ml", correct: true },
          { text: "Hämaturie = Blut im Urin; Pyurie = Eiter im Urin", correct: true },
          { text: "Die weibliche Harnröhre (<5 cm) erhöht das Risiko für Harnwegsinfekte", correct: true },
          { text: "Die männliche Harnröhre hat nur einen Abschnitt und dient ausschließlich der Harnleitung", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "fortpflanzung_mann",
    title: "Fortpflanzungsorgane des Mannes",
    contextHint: "Studienbrief 1041 Urogenitaltrakt – männliche Geschlechtsorgane",
    phase1: {
      soil: {
        statement: "Die Hoden (Testes) erfüllen zwei Hauptaufgaben: Spermatogenese in den Hodenkanälchen (Tubuli seminiferi contorti, in 200–300 Läppchen) und Testosteronproduktion durch die Leydigschen Zwischenzellen; Testosteron fördert die Ausbildung primärer (Penis, Hoden, Prostata) und sekundärer Geschlechtsmerkmale (Schambehaarung, Bartwuchs, Stimmbruch).",
        answer: true,
        solution: "Der Hodenweg der Spermien: Hodenkanälchen → Rete testis → Ductuli efferentes → Ductus epididymis (Nebenhoden: Reifung und Speicherung) → Ductus deferens (durch Leistenkanal) → Ductus ejaculatorius (nach Vereinigung mit Bläschendrüsenausgang) → durch Prostata → Urethra. Der Samenstrang (Funiculus spermaticus) = Ductus deferens + Blut-/Lymphgefäße + Nerven + Faszien + M. cremaster (Hodenheber). Nebenhoden: ca. 4–5 cm, aber 100-fach länger auseinandergezogen; Spermien sind im Nebenhoden noch unbeweglich."
      },
      seed: {
        statement: "Das Sekret der Prostata ist sauer, um Bakterien in der Harnröhre abzutöten und die Samenzellen zu schützen; saures Milieu steigert die Beweglichkeit der Spermien.",
        answer: false,
        solution: "Das Sekret der Prostata ist alkalisch und dünnflüssig. Seine Funktion ist genau das Gegenteil: Es schützt die empfindlichen Samenzellen vor dem sauren Milieu in der männlichen Harnröhre und der weiblichen Scheide. Saures Milieu hemmt die Beweglichkeit und zerstört in stärkerer Konzentration die Samenfäden. Die Beweglichkeit der Spermien ist am größten in leicht alkalischer Umgebung."
      },
      water: {
        statement: "Die Erektion entsteht durch Dilatation der zuführenden arteriellen Gefäße → Bluteinström in venöse Bluträume (Schwellkörper) → Kompression der abführenden Venen durch Füllung → Blut wird zurückgehalten; der Penis besteht aus zwei paarigen Corpora cavernosa (Erektion) und einem unpaaren Corpus spongiosum (umschließt Urethra, geht in Eichel über).",
        answer: true,
        solution: "Der Penis hat zwei Funktionen: Ausscheidungsorgan für Sekundärharn und Samentransport für die Fortpflanzung. Die Tunica albuginea umschließt die oberen Schwellkörper und wird bei Erektion angespannt, was einer weiteren Füllung entgegenwirkt. Die Cowper-Drüse (Glandula bulbourethralis) ist erbsengroß und sezerniert bei sexueller Erregung ein schleimiges Präejakulat zur Erhöhung der Gleitfähigkeit. Die Bläschendrüse (Vesicula seminalis = Glandula vesiculosa) produziert ein alkalisches Sekret mit Fructose zur Ernährung und Beweglichkeit der Spermien."
      }
    },
    harvestQuestions: [
      {
        id: "fortpflanzung_mann_h1",
        type: "mc",
        question: "Welche Funktion haben die Nebenhoden (Epididymis)?",
        options: [
          { text: "Reifung und Speicherung der Spermien bis zur Ejakulation; im Nebenhoden sind Spermien noch unbeweglich", correct: true },
          { text: "Produktion von Testosteron und Spermien", correct: false },
          { text: "Bildung eines alkalischen Sekrets mit Fructose zur Spermienernährung", correct: false },
          { text: "Transport des Samens durch den Leistenkanal in die Bauchhöhle", correct: false }
        ],
        explanation: "Die Nebenhoden (Epididymis) dienen der Reifung und Speicherung der Spermien bis zur Ejakulation. Im Nebenhoden sind die Spermien noch unbeweglich. Erst durch das alkalische Sekret der nachfolgenden Drüsen (Prostata, Bläschendrüse) werden sie beweglich. Das alkalische Sekret mit Fructose wird von der Bläschendrüse produziert. Testosteron und Spermien werden im Hoden selbst gebildet."
      },
      {
        id: "fortpflanzung_mann_h2",
        type: "true_false",
        statement: "Der Ductus ejaculatorius entsteht durch Vereinigung des Ductus deferens mit dem Ausführungsgang der Bläschendrüse und durchläuft dann die Prostata, bevor er in die Urethra mündet.",
        answer: true,
        explanation: "Der Weg des Samens: Hoden → Ductuli efferentes → Nebenhoden (Ductus epididymis) → Ductus deferens (durch Leistenkanal) → vereinigt sich mit Bläschendrüsenausgang → Ductus ejaculatorius → durchläuft Prostata → mündet in Urethra (Pars prostatica). Damit ist die Urethra beim Mann der gemeinsame Harn- und Samenweg."
      },
      {
        id: "fortpflanzung_mann_h3",
        type: "mc",
        question: "Welche Aussage zur Prostata ist korrekt?",
        options: [
          { text: "Die Prostata liegt kastanienförmig unterhalb der Blase; ihr alkalisches Sekret schützt Spermien vor dem sauren Milieu der Harnröhre und Vagina", correct: true },
          { text: "Die Prostata produziert ein saures Sekret zur Desinfektion der Harnröhre", correct: false },
          { text: "Die Prostata liegt oberhalb der Harnblase und produziert Testosteron", correct: false },
          { text: "Das Prostatasekret enthält Fructose zur Ernährung der Spermien", correct: false }
        ],
        explanation: "Die Prostata (Vorsteherdrüse) ist eine kastanienförmige Drüse direkt unterhalb der Harnblase. Ihr alkalisches, dünnflüssiges Sekret schützt die empfindlichen Samenzellen vor dem sauren Milieu der männlichen Harnröhre und der weiblichen Scheide. Die Spermienbeweglickeit ist in leicht alkalischer Umgebung am größten. Fructose wird von der Bläschendrüse produziert, nicht der Prostata."
      },
      {
        id: "fortpflanzung_mann_h4",
        type: "mc",
        question: "Wie entsteht die Erektion des Penis?",
        options: [
          { text: "Arterielle Dilatation → Bluteinström in Schwellkörper → Kompression der Venen durch Füllung → Blut wird zurückgehalten", correct: true },
          { text: "Venöse Dilatation → Rückstrom von Blut aus dem Penis → Druckerhöhung in der Urethra", correct: false },
          { text: "Kontraktion der glatten Muskulatur der Schwellkörper → mechanische Versteifung", correct: false },
          { text: "Lymphansammlung in den Schwellkörpern durch erhöhten Lymphdruck", correct: false }
        ],
        explanation: "Bei Erektion: 1. Zuführende arterielle Gefäße dilatieren → arterielles Blut strömt in venöse Bluträume (Corpora cavernosa + Corpus spongiosum). 2. Diese dehnen sich aus. 3. Die Tunica albuginea wird angespannt und wirkt weiterer Füllung entgegen. 4. Die abführenden Venen werden durch die Füllung komprimiert → Blut wird zurückgehalten → Erektion."
      },
      {
        id: "fortpflanzung_mann_h5",
        type: "true_false",
        statement: "Der Samenstrang (Funiculus spermaticus) enthält neben dem Ductus deferens auch Blut- und Lymphgefäße, Nerven, Faszien und den M. cremaster (Hodenheber).",
        answer: true,
        explanation: "Der Samenstrang (Funiculus spermaticus) ist der Gesamtbegriff für den Ductus deferens zusammen mit allen begleitenden Strukturen: Blut- und Lymphgefäße, Nerven, Bindegewebsfaszien und der M. cremaster (Hodenheber). Er verläuft durch den Leistenkanal und verbindet Hoden/Nebenhoden mit der Bauchhöhle."
      }
    ],
    phase4Questions: [
      {
        id: "fortpflanzung_mann_mc1",
        type: "mc",
        question: "Welche Aussagen zu Hoden, Nebenhoden und Samenwegen sind korrekt?",
        options: [
          { text: "Hoden: Spermatogenese in Hodenkanälchen + Testosteron durch Leydigsche Zellen", correct: true },
          { text: "Nebenhoden: Reifung und Speicherung der Spermien; im Nebenhoden noch unbeweglich", correct: true },
          { text: "Samenweg: Hoden → Nebenhoden → Ductus deferens → Ductus ejaculatorius → Urethra", correct: true },
          { text: "Die Bläschendrüse produziert saures Sekret zur Aktivierung der Spermien", correct: false }
        ]
      },
      {
        id: "fortpflanzung_mann_mc2",
        type: "mc",
        question: "Welche Aussagen zu den männlichen Geschlechtsdrüsen und zum Penis sind korrekt?",
        options: [
          { text: "Prostata: alkalisches Sekret → schützt Spermien vor saurem Milieu in Urethra und Vagina", correct: true },
          { text: "Bläschendrüse: alkalisches Sekret mit Fructose → Ernährung und Beweglichkeit der Spermien", correct: true },
          { text: "Penis: 2 Corpora cavernosa (paarig) + 1 Corpus spongiosum (unpaar, umschließt Urethra)", correct: true },
          { text: "Cowper-Drüse produziert das Hauptvolumen des Ejakulats und enthält Spermien", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "fortpflanzung_frau_zyklus",
    title: "Fortpflanzungsorgane der Frau und Menstruationszyklus",
    contextHint: "Studienbrief 1041 Urogenitaltrakt – weibliche Geschlechtsorgane und Zyklus",
    phase1: {
      soil: {
        statement: "Die Eierstöcke (Ovarien) enthalten ca. 200.000 (und mehr) Primärfollikel (seit der Geburt vorhanden, nicht neu gebildet); über Bläschenfollikel reifen sie zu Graafschen Follikeln → Eisprung (Ovulation) ca. am 14. Zyklustag; Follikel produzieren Östrogene; der Gelbkörper (nach Ovulation aus dem umgebildeten Graafschen Follikel) produziert Gestagene (Progesteron).",
        answer: true,
        solution: "Im Unterschied zu männlichen Keimzellen (laufend neu gebildet) sind weibliche Eizellen seit der Geburt im Körper. Die meisten Follikel gehen in unterschiedlichen Entwicklungsstadien zugrunde. Nur ein reifer Graafscher Follikel entlässt pro Monat eine Eizelle. Die Eizelle gelangt in die Bauchhöhle und wird von Flimmerhärchen/Trichterfasern des Eileiters aufgefangen. Befruchtung findet im Eileiter statt. Die Ovarien produzieren: Östrogen (Follikelphase) und Progesteron/Gestagen (Lutealphase/Gelbkörperphase). Beide Hormone sind für den Ovarial- und Menstruationszyklus verantwortlich."
      },
      seed: {
        statement: "Im weiblichen Zyklus findet der Eisprung am ersten Tag der Menstruation statt; unmittelbar danach beginnt der Aufbau der Gebärmutterschleimhaut unter Östrogeneinfluss.",
        answer: false,
        solution: "Der Eisprung (Ovulation) findet ca. 14 Tage NACH dem ersten Tag der Menstruation statt, also in der Mitte des ca. 28-tägigen Zyklus. Der Zyklus beginnt mit der Menstruation (Tag 1–5, Abstoßung der Schleimhaut). Von Tag 5–14 baut sich die Schleimhaut wieder auf (Östrogenproduktion ↑, Proliferationsphase). Ab Tag 15 (nach Eisprung) → Progesteronsekretion → Schleimhaut verdichtet sich (Sekretionsphase). Bei keiner Befruchtung: Gelbkörper stellt Hormonproduktion ein → Regelblutung."
      },
      water: {
        statement: "Die kurze weibliche Harnröhre (<5 cm, gegenüber 20 cm beim Mann) bedingt eine erhöhte Anfälligkeit für Harnwegsinfekte (Cystitis); der Menstruationszyklus dauert durchschnittlich 28 Tage und wird durch das Hypothalamus-Hypophysen-System gesteuert; der Uterus besitzt drei Wandschichten: Endometrium, Myometrium und Perimetrium.",
        answer: true,
        solution: "Primäre Geschlechtsorgane der Frau: Eierstöcke (Ovarien), Eileiter (Tuba uterina, 10–16 cm), Gebärmutter (Uterus: Fundus + Corpus + Cervix/Gebärmutterhals + Portio + Muttermund), Scheide (Vagina, ca. 10 cm, elastisch, Plattenepithel, Milchsäurebakterien → saures Milieu, Bartholinsche Drüsen → Befeuchtung). Sekundäre Geschlechtsorgane: Venushügel, große/kleine Schamlippen, Klitoris, Bartholin-Drüsen, Introitus vaginae; Sekundärmerkmale: Körperbehaarung, Brüste, Menses, weibliche Körperfettverteilung."
      }
    },
    harvestQuestions: [
      {
        id: "fortpflanzung_frau_zyklus_h1",
        type: "mc",
        question: "Wann findet der Eisprung (Ovulation) im weiblichen Zyklus statt, und welches Hormon produziert danach der Gelbkörper?",
        options: [
          { text: "Ca. 14 Tage nach dem ersten Tag der Menstruation; Gelbkörper → Progesteron (Gestagen)", correct: true },
          { text: "Am ersten Tag der Menstruation; Gelbkörper → Östrogen", correct: false },
          { text: "Ca. 28 Tage nach dem Eisprung; Gelbkörper → FSH", correct: false },
          { text: "Täglich; der Gelbkörper produziert kein Hormon", correct: false }
        ],
        explanation: "Der Eisprung findet ca. am 14. Tag des 28-tägigen Zyklus statt (ca. 14 Tage nach Beginn der Menstruation). Danach bildet sich aus dem Graafschen Follikel der Gelbkörper (Corpus luteum), der Progesteron (Gestagen) produziert. Progesteron verdichtet die Gebärmutterschleimhaut zur Vorbereitung auf eine mögliche Einnistung. Bei keiner Befruchtung: Gelbkörper regrediert → Hormonspiegel fällt → Regelblutung."
      },
      {
        id: "fortpflanzung_frau_zyklus_h2",
        type: "true_false",
        statement: "Weibliche Eizellen sind im Unterschied zu männlichen Spermien bereits seit der Geburt als Primärfollikel im Körper vorhanden und werden nicht ständig neu gebildet.",
        answer: true,
        explanation: "Jedes Ovar enthält bei der Geburt ca. 200.000 (und mehr) Primärfollikel mit je einer Eizelle. Diese werden nicht neu gebildet. Im Laufe des Lebens gehen die meisten Follikel zugrunde. Nur aus einem reifen Graafschen Follikel wird pro Monat eine Eizelle entlassen. Mit der Menopause sind keine reifen Follikel mehr vorhanden."
      },
      {
        id: "fortpflanzung_frau_zyklus_h3",
        type: "mc",
        question: "Welche drei Wandschichten hat der Uterus?",
        options: [
          { text: "Endometrium (Schleimhaut mit Drüsen), Myometrium (Muskulatur), Perimetrium (Bauchfellüberzug)", correct: true },
          { text: "Tunica mucosa, Tunica muscularis, Tunica adventitia", correct: false },
          { text: "Cortex, Medulla und Kapsel wie bei der Niere", correct: false },
          { text: "Endometrium, Cervix und Portio", correct: false }
        ],
        explanation: "Die drei Wandschichten des Uterus: 1. Endometrium — Bindegewebe mit Schleimhautdrüsen; dies ist die Schicht, die bei der Menstruation abgestoßen und wieder aufgebaut wird. 2. Myometrium — die Muskulatur der Gebärmutter (glatte Muskulatur). 3. Perimetrium — der Bauchfellüberzug (Serosa). Der Uterus gliedert sich anatomisch in: Fundus (oberes rundes Teil), Corpus (Körper), Cervix (Hals/Gebärmutterhals), Portio und Muttermund."
      },
      {
        id: "fortpflanzung_frau_zyklus_h4",
        type: "mc",
        question: "Warum haben Frauen ein erhöhtes Risiko für Harnwegsinfekte im Vergleich zu Männern?",
        options: [
          { text: "Die weibliche Harnröhre ist <5 cm kurz (männlich ca. 20 cm) — Bakterien gelangen leichter in die Blase", correct: true },
          { text: "Frauen produzieren weniger Schleimhautsekret in der Blase als Männer", correct: false },
          { text: "Die weibliche Blase hat ein kleineres Fassungsvermögen als die männliche", correct: false },
          { text: "Frauen haben keine natürliche Darmflora, die Bakterien abwehrt", correct: false }
        ],
        explanation: "Die weibliche Harnröhre (Urethra feminina) ist mit <5 cm deutlich kürzer als die männliche (ca. 20 cm). Sie verläuft von der Harnblase bis zum Orificium externum zwischen Klitoris und Vagina. Die Kürze der Harnröhre ermöglicht Bakterien eine schnellere Aufsteigung in die Blase → erhöhte Anfälligkeit für Cystitis (Harnblasenentzündung), besonders bei schwachem Strahl oder bakterieller Kontamination."
      },
      {
        id: "fortpflanzung_frau_zyklus_h5",
        type: "true_false",
        statement: "Die Befruchtung der Eizelle findet in der Gebärmutter statt; die Eizelle wird nach dem Eisprung direkt vom Uterus aufgenommen.",
        answer: false,
        explanation: "Die Befruchtung findet im Eileiter (Tuba uterina) statt, nicht in der Gebärmutter. Nach dem Eisprung gelangt die Eizelle in die Bauchhöhle, wird von den Flimmerhärchen/Trichterfasern des Eileiterendes aufgefangen und durch Muskelkontraktionen durch den Eileiter transportiert. Im Eileiter trifft sie auf Spermien → Befruchtung. Danach gelangt die befruchtete Eizelle (Zygote) in den Uterus zur Einnistung."
      }
    ],
    phase4Questions: [
      {
        id: "fortpflanzung_frau_zyklus_mc1",
        type: "mc",
        question: "Welche Aussagen zu Ovarien, Eileiter und Uterus sind korrekt?",
        options: [
          { text: "Ovarien: Primärfollikel seit der Geburt vorhanden; Östrogen (Follikel) + Progesteron (Gelbkörper)", correct: true },
          { text: "Eisprung ca. 14 Tage nach Beginn der Menstruation; Befruchtung im Eileiter", correct: true },
          { text: "Uterus-Wandschichten: Endometrium + Myometrium + Perimetrium", correct: true },
          { text: "Die Eizelle wird nach dem Eisprung direkt im Uterus befruchtet", correct: false }
        ]
      },
      {
        id: "fortpflanzung_frau_zyklus_mc2",
        type: "mc",
        question: "Welche Aussagen zum Menstruationszyklus und zur weiblichen Anatomie sind korrekt?",
        options: [
          { text: "Zyklus ca. 28 Tage; gesteuert durch Hypothalamus-Hypophysen-System", correct: true },
          { text: "Tag 1–5: Menstruation; Tag 5–14: Schleimhautaufbau (Östrogen↑); ab Tag 15: Progesteron → Schleimhaut verdichtet", correct: true },
          { text: "Bei keiner Befruchtung: Gelbkörper regrediert → Hormonspiegel fällt → Regelblutung", correct: true },
          { text: "Die Vagina ist mit Zylinderepithel ausgekleidet und hat ein basisches Milieu durch Milchsäurebakterien", correct: false }
        ]
      }
    ]
  })

];
