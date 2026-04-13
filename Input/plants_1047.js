const ERNAEHRUNGSMEDIZIN_1047_PLANTS = [
  makeDetailedPlant({
    id: "1047_01",
    title: "Eiweiß – Aminosäuren, Funktionen und Bedarf",
    contextHint: "Kap. 1 – 8 unentbehrliche AS, Brennwert 4,1 kcal/g, Bedarf 0,8–1,0 g/kg KG, Harnstoff in der Leber, Harnsäure und Gicht",
    phase1: {
      soil: {
        statement: "Welche 8 Aminosäuren sind für den Menschen unentbehrlich und welche Abbauprodukte entstehen beim Eiweißstoffwechsel?",
        answer: "Unentbehrliche AS: Valin (0,8 g/Tag), Phenylalanin (1,1 g), Leucin (1,1 g), Isoleucin (0,7 g), Threonin (0,5 g), Methionin (1,1 g), Lysin (0,8 g), Tryptophan (0,25 g/Tag – niedrigster Bedarf). Abbauprodukte: Wasser, CO2, Harnstoff. Harnstoff entsteht in der Leber und wird über die Nieren ausgeschieden.",
        solution: "Tryptophan hat mit 0,25 g/Tag den niedrigsten Tagesbedarf. Harnstoff wird in der Leber synthetisiert – bei Niereninsuffizienz kann er nicht ausreichend ausgeschieden werden und akkumuliert im Blut."
      },
      seed: {
        statement: "Welche Funktionen erfüllt Eiweiß im Körper und wie hoch ist sein Brennwert?",
        answer: "Funktionen: Gewebeaufbau und -erhaltung, Bildung von Enzymen/Hormonen/Antikörpern, Pufferwirkung (Säure-Base-Haushalt), Aufrechterhaltung des onkotischen Drucks im Blut. Brennwert: 4,1 kcal/g = 17 kJ/g. Normalbedarf: 0,8–1,0 g/kg KG/Tag.",
        solution: "Eiweiß ist primär kein Energielieferant – diese Funktion übernehmen KH und Fette. Im Hungerzustand wird Eiweiß jedoch zur Energiegewinnung genutzt (Gluconeogenese aus Aminosäuren)."
      },
      water: {
        statement: "Wann ist der Eiweißbedarf erhöht und wann muss er eingeschränkt werden? Was haben Purine mit Gicht zu tun?",
        answer: "Erhöhter Bedarf: Kinder, Ältere, Schwangerschaft, Laktation, Krankheit/Rekonvaleszenz. Eingeschränkt bei: Nierenversagen/Niereninsuffizienz. Purine (aus eiweißreicher Kost) → Harnsäure (Normalwert 3–7 mg/dl; Männer <7,4 mg/dl, Frauen <6,7 mg/dl). Hyperurikämie → Gicht (Harnsäurekristallablagerungen in Gelenken).",
        solution: "Die Niere scheidet Harnstoff und Harnsäure aus – zu viel Eiweiß belastet die Niere und erhöht die Harnsäure. Purinreiche Lebensmittel (Innereien, Fleisch, Bier) sind Hauptauslöser der Gicht."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1047_01_h1",
        question: "Welcher Referenzwert gilt für den Harnsäurespiegel bei Männern?",
        options: [
          { text: "< 7,4 mg/dl", correct: true },
          { text: "< 6,7 mg/dl", correct: false },
          { text: "< 10,0 mg/dl", correct: false },
          { text: "< 3,0 mg/dl", correct: false }
        ],
        explanation: "Der Normalwert der Harnsäure liegt bei 3–7 mg/dl. Der Grenzwert bei Männern ist < 7,4 mg/dl, bei Frauen < 6,7 mg/dl."
      },
      {
        type: "true_false",
        id: "1047_01_h2",
        statement: "Tryptophan hat den höchsten täglichen Bedarf unter den unentbehrlichen Aminosäuren.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Tryptophan hat mit 0,25 g/Tag den niedrigsten Bedarf unter den 8 unentbehrlichen Aminosäuren. Den höchsten Bedarf haben Phenylalanin, Leucin und Methionin (je 1,1 g/Tag)."
      },
      {
        type: "mc",
        id: "1047_01_h3",
        question: "Welchen Brennwert hat Eiweiß pro Gramm?",
        options: [
          { text: "4,1 kcal/g", correct: true },
          { text: "9,3 kcal/g", correct: false },
          { text: "7,0 kcal/g", correct: false },
          { text: "2,0 kcal/g", correct: false }
        ],
        explanation: "Eiweiß hat einen Brennwert von 4,1 kcal/g = 17 kJ/g – genauso viel wie Kohlenhydrate. Fett dagegen hat 9,3 kcal/g = 38,9 kJ/g."
      },
      {
        type: "mc",
        id: "1047_01_h4",
        question: "Wie viel Gramm Eiweiß pro kg Körpergewicht benötigt ein gesunder Erwachsener täglich?",
        options: [
          { text: "0,8–1,0 g/kg KG", correct: true },
          { text: "0,3–0,5 g/kg KG", correct: false },
          { text: "1,5–2,0 g/kg KG", correct: false },
          { text: "2,5–3,0 g/kg KG", correct: false }
        ],
        explanation: "Der Normalbedarf liegt bei 0,8–1,0 g Eiweiß pro kg Körpergewicht pro Tag. Erhöhter Bedarf besteht bei Kindern, Älteren, Schwangerschaft, Laktation und Krankheit."
      },
      {
        type: "true_false",
        id: "1047_01_h5",
        statement: "Harnstoff entsteht beim Eiweißabbau in der Niere.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Harnstoff entsteht in der Leber (Harnstoffzyklus) und wird über die Nieren ausgeschieden. Bei Leberversagen ist die Harnstoffsynthese gestört, bei Nierenversagen die Ausscheidung."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1047_01_p4_1",
        question: "Welche Aussagen zur eiweißarmen Diät sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Sie ist indiziert bei Niereninsuffizienz", correct: true },
          { text: "Sie ist indiziert bei Dialysepatienten", correct: false },
          { text: "Purinreiche Lebensmittel erhöhen die Harnsäure", correct: true },
          { text: "Eiweiß darf bei Niereninsuffizienz gar nicht mehr gegessen werden", correct: false }
        ],
        explanation: "Eiweißarme Diät ist bei Niereninsuffizienz indiziert, um die Niere zu entlasten. Dialysepatienten benötigen dagegen eiweißreiche Kost (Aminosäureverlust durch Dialyse). Purine aus eiweißreicher Kost erhöhen Harnsäure und können Gicht auslösen."
      },
      {
        type: "mc",
        id: "1047_01_p4_2",
        question: "In welchen Situationen ist ein erhöhter Eiweißbedarf physiologisch begründet? (Mehrere Antworten möglich)",
        options: [
          { text: "Schwangerschaft und Laktation", correct: true },
          { text: "Wachstum bei Kindern", correct: true },
          { text: "Niereninsuffizienz", correct: false },
          { text: "Rekonvaleszenz nach schwerer Krankheit", correct: true }
        ],
        explanation: "Erhöhter Eiweißbedarf besteht bei anabolem Wachstum (Kinder), erhöhtem Bedarf (Schwangerschaft/Stillzeit) und Rekonvaleszenz. Bei Niereninsuffizienz ist der Bedarf dagegen einzuschränken."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1047_02",
    title: "Kohlenhydrate, Fette & Lipoproteine",
    contextHint: "Kap. 2+3 – Brennwerte, Kohlenhydratklassen, Fettverdauung, Lipoproteine (LDL/HDL/VLDL), Blutfettgrenzwerte, essenzielle FS",
    phase1: {
      soil: {
        statement: "Welche Kohlenhydratklassen gibt es und welchen Energieanteil liefern Kohlenhydrate?",
        answer: "Monosaccharide: Glukose, Fruktose, Galaktose, Ribose. Disaccharide: Saccharose, Maltose, Laktose. Polysaccharide: Glykogen (tierisch), Stärke (pflanzlich), Cellulose (unlöslicher Ballaststoff), Inulin (löslicher Ballaststoff). Brennwert 4,1 kcal/g = 17 kJ/g. KH decken ca. 47 % des Energiebedarfs (Hauptenergielieferant). Überkonsum → Umwandlung in Fett.",
        solution: "Glykogen ist die tierische Speicherform der Glucose (in Leber und Muskel), Stärke die pflanzliche. Cellulose ist für den Menschen unverdaulich und zählt zu den unlöslichen Ballaststoffen."
      },
      seed: {
        statement: "Wie werden Fette verdaut und resorbiert? Welche Lipoproteine gibt es?",
        answer: "Fettverdauung: Pankreaslipase → Glycerin + Fettsäuren → Gallensalze emulgieren → Mizellen → Dünndarmzellen. Kurz-/mittelkettige FS: direkt über Pfortader; langkettige FS: Chylomikronen → Lymphe → Blut. Steatorrhoe: >7 g Fett/Tag im Stuhl. Lipoproteine: Chylomikronen (exogene TG), VLDL (endogene TG), IDL (TG + Cholesterinester), LDL (freies Cholesterin, 'böse'), HDL (Cholesterinester + Phospholipide, 'gut').",
        solution: "Langkettige Fettsäuren benötigen den Umweg über Chylomikronen und Lymphe. MCT-Fette (mittelkettige TG) gelangen direkt in die Pfortader – daher bei Malabsorptionssyndromen (z. B. nach Pankreatitis) empfohlen."
      },
      water: {
        statement: "Was sind essentielle Fettsäuren und welche Grenzwerte gelten für Blutfette?",
        answer: "Essentielle Fettsäuren (müssen zugeführt werden): Linolsäure (Omega-6) und Linolensäure (Omega-3); Bedarf je ca. 6 g/Tag. Brennwert Fett: 9,3 kcal/g = 38,9 kJ/g. Grenzwerte: Gesamtcholesterin <200 mg/dl, Triglyzeride <180 mg/dl, LDL <160 mg/dl, HDL Frauen >45 / Männer >40 mg/dl. Wichtig: Lipide erst nach 12 h Nahrungskarenz messen.",
        solution: "Fett hat mehr als doppelt so viel Energie wie KH oder Eiweiß (9,3 vs. 4,1 kcal/g). Die 12-h-Nüchternheit ist Pflicht für valide Blutfettwerte – nach dem Essen zirkulieren noch Chylomikronen."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1047_02_h1",
        question: "Welcher Grenzwert gilt für den LDL-Cholesterinspiegel?",
        options: [
          { text: "< 160 mg/dl", correct: true },
          { text: "< 200 mg/dl", correct: false },
          { text: "< 100 mg/dl", correct: false },
          { text: "< 250 mg/dl", correct: false }
        ],
        explanation: "LDL-Grenzwert < 160 mg/dl. Gesamtcholesterin < 200 mg/dl, Triglyzeride < 180 mg/dl. HDL soll hoch sein: Frauen > 45, Männer > 40 mg/dl."
      },
      {
        type: "true_false",
        id: "1047_02_h2",
        statement: "Langkettige Fettsäuren gelangen nach der Resorption direkt über die Pfortader ins Blut.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Langkettige Fettsäuren werden in Chylomikronen verpackt und gelangen über die Lymphe ins Blut. Nur kurz- und mittelkettige FS gehen direkt über die Pfortader."
      },
      {
        type: "mc",
        id: "1047_02_h3",
        question: "Welches Lipoprotein transportiert primär endogene (in der Leber gebildete) Triglyzeride?",
        options: [
          { text: "VLDL", correct: true },
          { text: "LDL", correct: false },
          { text: "HDL", correct: false },
          { text: "Chylomikronen", correct: false }
        ],
        explanation: "VLDL (very low density lipoprotein) transportiert endogene Triglyzeride aus der Leber. Chylomikronen transportieren exogene (aus der Nahrung) TG. LDL transportiert freies Cholesterin, HDL Cholesterinester."
      },
      {
        type: "mc",
        id: "1047_02_h4",
        question: "Welche Fettsäure gehört zu den essenziellen Fettsäuren?",
        options: [
          { text: "Linolsäure (Omega-6)", correct: true },
          { text: "Palmitinsäure", correct: false },
          { text: "Ölsäure", correct: false },
          { text: "Stearinsäure", correct: false }
        ],
        explanation: "Essentielle Fettsäuren sind Linolsäure (Omega-6) und Linolensäure (Omega-3) – sie müssen mit der Nahrung zugeführt werden. Palmitin-, Öl- und Stearinsäure kann der Körper selbst synthetisieren."
      },
      {
        type: "true_false",
        id: "1047_02_h5",
        statement: "Blutlipidwerte sollten nach 12 Stunden Nahrungskarenz gemessen werden.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Wahr. Nach einer Mahlzeit zirkulieren noch Chylomikronen im Blut, die die Messwerte verfälschen. Valide Lipidwerte erhält man nur nach 12-stündiger Nahrungskarenz."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1047_02_p4_1",
        question: "Welche Lipoproteine gelten als atherogen (begünstigen Atherosklerose)? (Mehrere Antworten möglich)",
        options: [
          { text: "LDL", correct: true },
          { text: "IDL", correct: true },
          { text: "HDL", correct: false },
          { text: "Chylomikronen", correct: false }
        ],
        explanation: "LDL ('böses' Cholesterin) und IDL fördern Cholesterinablagerungen in den Gefäßen. HDL transportiert Cholesterin aus den Gefäßen zur Leber zurück – hohe HDL-Werte sind protektiv. Chylomikronen sind kurzlebig und gelten nicht als atherogen."
      },
      {
        type: "mc",
        id: "1047_02_p4_2",
        question: "Welche Aussagen zur Fettverdauung und den Blutfettgrenzwerten sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Gallensalze emulgieren Fette zu Mizellen", correct: true },
          { text: "Steatorrhoe liegt bei > 7 g Fett/Tag im Stuhl vor", correct: true },
          { text: "Triglyzerid-Grenzwert liegt bei < 100 mg/dl", correct: false },
          { text: "MCT-Fette eignen sich bei Malabsorption besonders gut", correct: true }
        ],
        explanation: "Gallensalze emulgieren Fette für die Resorption. Steatorrhoe = pathologische Fettausscheidung > 7 g/Tag. TG-Grenzwert ist < 180 mg/dl (nicht 100). MCT-Fette gehen direkt über die Pfortader und sind bei Malabsorption vorteilhaft."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1047_03",
    title: "Wasser & Mineralstoffe: Natrium und Kalium",
    contextHint: "Kap. 4+5 – Wasserhaushalt (60 % Körper), Perspiratio insensibilis, Dehydratation, Na-Bedarf 1500 mg, K-Bedarf 4000 mg, Arrhythmien, Herzstillstand",
    phase1: {
      soil: {
        statement: "Wie ist der Wasserhaushalt des Körpers aufgebaut? Wie viel Wasser nimmt der Mensch auf und scheidet er aus?",
        answer: "Körperwasser: 60 % beim Erwachsenen (Säuglinge 75 %). Zufuhr: Getränke 1000–1500 ml + Nahrung 700–900 ml + Oxidationswasser 300 ml. Abgabe: Urin 1000–1500 ml, Perspiratio insensibilis 500 ml, Atmung 400 ml, Stuhl 100 ml. Störungen: Hypovolämie, Hypervolämie, Hyperhydratation, Dehydratation (isoton/hyperton/hypoton).",
        solution: "Perspiratio insensibilis ist die unmerkliche Wasserabgabe über Haut (ca. 500 ml/Tag) – auch ohne sichtbares Schwitzen. Oxidationswasser entsteht beim Zellstoffwechsel (ca. 300 ml/Tag)."
      },
      seed: {
        statement: "Welche Bedeutung hat Natrium und wann wird es diätetisch eingeschränkt?",
        answer: "Natrium: Bedarf 1500 mg/Tag; wichtigstes extrazelluläres Kation. Mangel: Krämpfe, Apathie, Verwirrheit, Epilepsie. Erhöhter Na-Spiegel: Durst, Verwirrheit, Koma. Einschränkung bei: Herzinsuffizienz, Hypertonie, Glomerulonephritis, Leberzirrhose (Na-Retention → Ödeme).",
        solution: "Natrium bestimmt den osmotischen Druck und damit den Wasserhaushalt. Kochsalzreduktion senkt den Blutdruck nachweislich – verstecktes Salz (Brot, Käse, Wurstwaren) ist oft der Hauptlieferant."
      },
      water: {
        statement: "Welche klinischen Zeichen treten bei Kaliumstörungen auf?",
        answer: "Kalium: Bedarf 4000 mg/Tag; wichtigstes intrazelluläres Kation. Hyperkaliämie (zu viel K): Arrhythmien, Kammerflimmern, Herzstillstand, zeltförmige T-Wellen im EKG. Hypokaliämie (zu wenig K): schlaffe Paresen, Arrhythmien, paralytischer Ileus.",
        solution: "Kaliumabweichungen in beide Richtungen können lebensbedrohlich sein – besonders die kardialen Folgen. Im EKG sind zeltförmige T-Wellen das charakteristische Zeichen der Hyperkaliämie."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1047_03_h1",
        question: "Wie hoch ist der empfohlene Tagesbedarf an Kalium?",
        options: [
          { text: "4000 mg", correct: true },
          { text: "1500 mg", correct: false },
          { text: "800 mg", correct: false },
          { text: "6000 mg", correct: false }
        ],
        explanation: "Der Tagesbedarf an Kalium liegt bei 4000 mg, der für Natrium bei 1500 mg/Tag."
      },
      {
        type: "true_false",
        id: "1047_03_h2",
        statement: "Hyperkaliämie kann zu zeltförmigen T-Wellen im EKG führen.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Wahr. Zeltförmige (überhöhte, spitze) T-Wellen sind das klassische EKG-Zeichen der Hyperkaliämie. Im weiteren Verlauf können Kammerflimmern und Herzstillstand auftreten."
      },
      {
        type: "mc",
        id: "1047_03_h3",
        question: "Bei welcher Erkrankung ist eine Natriumreduktion in der Ernährung indiziert?",
        options: [
          { text: "Herzinsuffizienz", correct: true },
          { text: "Hypokaliämie", correct: false },
          { text: "Eisenmangelanämie", correct: false },
          { text: "Vitamin-D-Mangel", correct: false }
        ],
        explanation: "Natriumreduktion ist indiziert bei Herzinsuffizienz, Hypertonie, Glomerulonephritis und Leberzirrhose, da Na-Retention Ödeme begünstigt."
      },
      {
        type: "mc",
        id: "1047_03_h4",
        question: "Wie viel Flüssigkeit verliert ein Erwachsener täglich durch Atmung?",
        options: [
          { text: "ca. 400 ml", correct: true },
          { text: "ca. 100 ml", correct: false },
          { text: "ca. 1000 ml", correct: false },
          { text: "ca. 700 ml", correct: false }
        ],
        explanation: "Über die Atemluft werden täglich ca. 400 ml Wasser verloren. Dazu kommen Perspiratio insensibilis 500 ml, Urin 1000–1500 ml und Stuhl ca. 100 ml."
      },
      {
        type: "true_false",
        id: "1047_03_h5",
        statement: "Hypokaliämie kann zu paralytischem Ileus führen.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Wahr. Kaliumm­angel führt zu schlaffen Lähmungen der glatten Muskulatur – einschließlich der Darmmuskulatur. Ein paralytischer Ileus (funktioneller Darmverschluss) ist eine gefürchtete Komplikation."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1047_03_p4_1",
        question: "Welche Erkrankungen machen eine diätetische Natriumreduktion erforderlich? (Mehrere Antworten möglich)",
        options: [
          { text: "Herzinsuffizienz", correct: true },
          { text: "Hypertonie", correct: true },
          { text: "Hypokaliämie", correct: false },
          { text: "Leberzirrhose", correct: true }
        ],
        explanation: "Na-Restriktion ist bei Herzinsuffizienz, Hypertonie, Glomerulonephritis und Leberzirrhose indiziert, da diese Erkrankungen zu Na-Retention und Ödembildung neigen. Hypokaliämie erfordert Kalium-, nicht Natriumrestriktion."
      },
      {
        type: "mc",
        id: "1047_03_p4_2",
        question: "Welche Folgen kann Hypokaliämie haben? (Mehrere Antworten möglich)",
        options: [
          { text: "Schlaffe Paresen", correct: true },
          { text: "Paralytischer Ileus", correct: true },
          { text: "Zeltförmige T-Wellen im EKG", correct: false },
          { text: "Herzrhythmusstörungen", correct: true }
        ],
        explanation: "Hypokaliämie verursacht schlaffe Paresen, paralytischen Ileus und Arrhythmien. Zeltförmige T-Wellen sind dagegen das EKG-Zeichen der Hyperkaliämie. Beide Störungen können Herzrhythmusstörungen auslösen."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1047_04",
    title: "Calcium, Eisen & Eisenmangelanämie",
    contextHint: "Kap. 5 – Ca-Regulation (Calcitonin/PTH/Vit D3), Bedarf 1000 mg; Fe-Transport Transferrin, Speicher Ferritin, Bedarf 10/15/30 mg, Fe2+ besser resorbiert, Vit C erhöht Aufnahme",
    phase1: {
      soil: {
        statement: "Welche Funktionen hat Calcium und wie wird der Calciumspiegel reguliert?",
        answer: "Calcium-Funktionen: verringert Membranerregbarkeit, elektromechanische Kopplung, Blutgerinnung, Knochenaufbau. Blutverteilung: 55 % ionisiert (aktiv), 40 % proteingebunden. Regulation: Calcitonin (Schilddrüse, senkt Ca), PTH Parathormon (Nebenschilddrüse, erhöht Ca), Vitamin D3 als Calcitriol (erhöht intestinale Ca-Aufnahme). Bedarf Erwachsene: 1000 mg/Tag.",
        solution: "Calcitonin und PTH sind Antagonisten. Vitamin D3 ist Voraussetzung für die intestinale Calciumaufnahme – ohne ausreichend Vit D nützt auch hohe Ca-Zufuhr wenig (z. B. Rachitis bei Vit-D-Mangel trotz Milchkonsum)."
      },
      seed: {
        statement: "Wie wird Eisen im Körper transportiert und gespeichert? Welche Wertigkeit wird besser resorbiert?",
        answer: "Eisen: 35–50 mg/kg Körpergewicht im Körper. Bedarf: Männer 10 mg/Tag, Frauen 15 mg/Tag, Schwangere 30 mg/Tag. Fe²⁺ (zweiwertiges Eisen) wird besser resorbiert als Fe³⁺. Transport im Blut: Transferrin. Speicher: Ferritin (löslich) und Hämosiderin. Vitamin C erhöht die Eisenaufnahme (reduziert Fe³⁺ zu Fe²⁺).",
        solution: "Häm-Eisen aus tierischer Nahrung ist als Fe²⁺ direkt resorbierbar. Pflanzliches Eisen liegt als Fe³⁺ vor – Vitamin C (Ascorbinsäure) verbessert seine Resorption durch Reduktion erheblich."
      },
      water: {
        statement: "Was ist die häufigste Anämieform und wie entwickelt sich ein Eisenmangel stufenweise?",
        answer: "Eisenmangelanämie = häufigste Anämie weltweit. Stufenweise Entwicklung: 1. Ferritin sinkt (Speicher leer) 2. Transferrinsättigung sinkt 3. Hb sinkt (mikrozytäre hypochrome Anämie). Symptome: Müdigkeit, Blässe, Belastungsdyspnoe. Risikogruppen: Frauen (Menstruation), Kinder (Wachstum), Schwangere (30 mg/Tag), Ausdauersportler.",
        solution: "Anämie (erniedrigtes Hb) ist ein Spätsymptom – der Eisenmangel beginnt mit leerem Ferritinspeicher, lange bevor das Blutbild auffällt. Ferritin ist daher der sensitivste Eisenmangelmarker."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1047_04_h1",
        question: "Wie hoch ist der tägliche Eisenbedarf einer schwangeren Frau?",
        options: [
          { text: "30 mg", correct: true },
          { text: "10 mg", correct: false },
          { text: "15 mg", correct: false },
          { text: "50 mg", correct: false }
        ],
        explanation: "Schwangere benötigen 30 mg Eisen/Tag. Männer benötigen 10 mg, nicht schwangere Frauen 15 mg/Tag."
      },
      {
        type: "true_false",
        id: "1047_04_h2",
        statement: "Vitamin C verbessert die Eisenaufnahme aus der Nahrung.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Wahr. Vitamin C (Ascorbinsäure) reduziert Fe³⁺ zu Fe²⁺, das besser resorbiert wird. Daher empfiehlt sich z. B. ein Glas Orangensaft zu eisenreichen Mahlzeiten."
      },
      {
        type: "mc",
        id: "1047_04_h3",
        question: "Welches Hormon erhöht den Calciumspiegel im Blut?",
        options: [
          { text: "PTH (Parathormon)", correct: true },
          { text: "Calcitonin", correct: false },
          { text: "Cortisol", correct: false },
          { text: "Insulin", correct: false }
        ],
        explanation: "PTH (Parathormon) erhöht den Calciumspiegel. Calcitonin dagegen senkt ihn. Vitamin D3 (Calcitriol) erhöht die intestinale Calciumaufnahme."
      },
      {
        type: "true_false",
        id: "1047_04_h4",
        statement: "Fe³⁺ (dreiwertiges Eisen) wird vom Darm besser resorbiert als Fe²⁺.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Fe²⁺ (zweiwertiges, Häm-Eisen) wird besser resorbiert als Fe³⁺. Vitamin C verbessert die Resorption von Fe³⁺ durch Reduktion zu Fe²⁺."
      },
      {
        type: "mc",
        id: "1047_04_h5",
        question: "In welchem Protein wird Eisen im Körper gespeichert?",
        options: [
          { text: "Ferritin", correct: true },
          { text: "Transferrin", correct: false },
          { text: "Hämoglobin", correct: false },
          { text: "Albumin", correct: false }
        ],
        explanation: "Ferritin (und Hämosiderin) sind die Eisenspeicherproteine. Transferrin transportiert Eisen im Blut. Hämoglobin enthält Eisen funktionell, ist aber kein Speicher."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1047_04_p4_1",
        question: "Welche Faktoren sind für eine normale Calciumhomöostase erforderlich? (Mehrere Antworten möglich)",
        options: [
          { text: "Ausreichend Vitamin D3 (Calcitriol)", correct: true },
          { text: "Funktionierende Nebenschilddrüse (PTH)", correct: true },
          { text: "Ausreichend Vitamin C", correct: false },
          { text: "Intakte Nierenfunktion (Calcitriol-Aktivierung)", correct: true }
        ],
        explanation: "Calciumhomöostase erfordert Vitamin D3 (fördert Resorption), PTH (reguliert Spiegel) und eine intakte Niere (aktiviert Vitamin D3 zum Calcitriol). Vitamin C ist für die Eisenresorption wichtig, nicht für Calcium."
      },
      {
        type: "mc",
        id: "1047_04_p4_2",
        question: "Welche Aussagen zur Eisenmangelanämie sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Ferritin sinkt als erstes Zeichen des Eisenmangels", correct: true },
          { text: "Es ist die häufigste Anämieform weltweit", correct: true },
          { text: "Hämoglobin sinkt als erstes Zeichen", correct: false },
          { text: "Frauen haben einen höheren Eisenbedarf als Männer", correct: true }
        ],
        explanation: "Ferritin (Speichereisen) sinkt zuerst, Hb als Letztes – Anämie ist ein Spätsymptom. Eisenmangelanämie ist die häufigste Anämie. Frauen haben durch die Menstruation einen höheren Bedarf (15 vs. 10 mg/Tag)."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1047_05",
    title: "Vitamine: B-Komplex (B1, B2, B6, B12, Folsäure) & Vitamin C",
    contextHint: "Kap. 6 – Beri-Beri (B1), Stomatitis/Glossitis (B2), epilepsieähnliche Krämpfe (B6), Intrinsic Factor/megalozytäre Anämie/Hinter-Seitenstrang (B12), Folsäuremangel häufigster Vitaminmangel, Skorbut (Vit C)",
    phase1: {
      soil: {
        statement: "Was sind Funktionen und Mangelerscheinungen von Vitamin B1, B2 und B12?",
        answer: "B1 (Thiamin): Decarboxylierung; Mangel → Beri-Beri (trocken = polyneuropathisch, feucht = kardiales Ödem); i.v.-Gabe → anaphylaktischer Schock möglich. B2 (Riboflavin): Redoxvorgänge; Mangel → Stomatitis, Glossitis, Mundwinkelrhagaden, Keratitis. B12 (Cobalamin): RNA/DNA-Biosynthese; Resorption erfordert Intrinsic Factor (Magendrüsen); Mangel erst nach 3 Jahren manifest (große Leberspeicher) → megalozytäre Anämie, Hinter- und Seitenstrangdegeneration.",
        solution: "B12-Mangel tritt bei Veganern und nach Magenoperationen auf (fehlender Intrinsic Factor). Die 3-Jahres-Latenz erklärt, warum Symptome spät auftreten. Die Rückenmarkdegeneration (Hinter-/Seitenstrang) ist irreversibel, wenn zu spät behandelt."
      },
      seed: {
        statement: "Welche Besonderheiten haben Niacin (B3), Pyridoxin (B6), Folsäure und Biotin?",
        answer: "Niacin (B3): kann aus Tryptophan synthetisiert werden; bildet NAD/NADP (Coenzyme in Redoxprozessen); therapeutisch: senkt Cholesterin und Triglyzeride. B6 (Pyridoxin): Aminosäurenstoffwechsel; Mangel → epilepsieähnliche Krämpfe. Folsäure: häufigster Vitaminmangel in Europa/Nordamerika; Megaloblastenanämie; gesteigerter Bedarf bei Kontrazeptiva, Tuberkulostatika, Sulfonamiden, Schwangerschaft, Alkohol. Biotin: Coenzym A; Glykogen und Glukoneogenese; Bedarf 40 µg/Tag.",
        solution: "Folsäure ist für die Zellteilung essentiell – Mangel in der Frühschwangerschaft erhöht das Risiko für Neuralrohrdefekte (Spina bifida). Daher perikonzeptionelle Supplementierung empfohlen."
      },
      water: {
        statement: "Welche Funktionen hat Vitamin C, was passiert bei Mangel und bei Überdosierung?",
        answer: "Vitamin C (Ascorbinsäure): antioxidativ (Zellschutz), erhöht Eisenaufnahme (Fe³⁺ → Fe²⁺). Mangel → Skorbut: Kollagendefekte → Zahnfleischbluten, Wundheilungsstörungen, Hautblutungen; unbehandelt tödlich. Überdosierung → Oxalatsteine (renale Oxalatausscheidung). Pantothensäure (B5): Teil von Coenzym A; alle Abbauprozesse; Bedarf 5 mg/Tag.",
        solution: "Skorbut war historisch häufig bei Seeleuten ohne frische Kost. Heute selten, aber bei einseitiger Ernährung, Alkoholismus und Dialysepatienten möglich. Megadosen Vitamin C sind wegen Oxalatstein-Risiko kontraindiziert."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1047_05_h1",
        question: "Welche Substanz wird für die Resorption von Vitamin B12 im Darm benötigt?",
        options: [
          { text: "Intrinsic Factor", correct: true },
          { text: "Gallensäuren", correct: false },
          { text: "Pankreaslipase", correct: false },
          { text: "Vitamin C", correct: false }
        ],
        explanation: "Vitamin B12 bindet im Magen an Intrinsic Factor (gebildet von Belegzellen der Magenschleimhaut). Fehlt Intrinsic Factor (z. B. nach Gastrektomie, Autoimmunerkrankung), kann B12 nicht resorbiert werden."
      },
      {
        type: "true_false",
        id: "1047_05_h2",
        statement: "Beri-Beri ist eine Mangelerkrankung des Vitamin B2.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Beri-Beri ist ein Mangelsyndrom des Vitamin B1 (Thiamin). Vitamin-B2-Mangel (Riboflavin) äußert sich in Stomatitis, Glossitis, Mundwinkelrhagaden und Keratitis."
      },
      {
        type: "mc",
        id: "1047_05_h3",
        question: "Welcher Vitaminmangel ist der häufigste in Europa und Nordamerika?",
        options: [
          { text: "Folsäuremangel", correct: true },
          { text: "Vitamin-B12-Mangel", correct: false },
          { text: "Vitamin-C-Mangel", correct: false },
          { text: "Vitamin-B1-Mangel", correct: false }
        ],
        explanation: "Folsäuremangel ist der häufigste Vitaminmangel in Europa und Nordamerika. Risikofaktoren sind Kontrazeptiva, Tuberkulostatika, Sulfonamide, Schwangerschaft und Alkohol."
      },
      {
        type: "true_false",
        id: "1047_05_h4",
        statement: "Eine Überdosierung von Vitamin C kann zu Nierensteinen führen.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Wahr. Überdosierung von Vitamin C führt zu erhöhter renaler Oxalatausscheidung und kann Oxalatsteine in den Nieren verursachen."
      },
      {
        type: "mc",
        id: "1047_05_h5",
        question: "Wie hoch ist der Tagesbedarf eines Erwachsenen an Biotin?",
        options: [
          { text: "40 µg", correct: true },
          { text: "400 µg", correct: false },
          { text: "5 mg", correct: false },
          { text: "1 mg", correct: false }
        ],
        explanation: "Der Tagesbedarf an Biotin liegt bei 40 µg/Tag. Pantothensäure (B5) hat einen Bedarf von 5 mg/Tag."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1047_05_p4_1",
        question: "Bei welchen Patientengruppen ist ein erhöhter Folsäurebedarf zu erwarten? (Mehrere Antworten möglich)",
        options: [
          { text: "Schwangere Frauen", correct: true },
          { text: "Patienten unter Sulfonamidtherapie", correct: true },
          { text: "Patienten mit Niereninsuffizienz", correct: false },
          { text: "Frauen unter oralen Kontrazeptiva", correct: true }
        ],
        explanation: "Erhöhter Folsäurebedarf besteht bei Schwangerschaft (Zellneubildung), Patienten unter Folsäure-Antagonisten (Sulfonamide, Tuberkulostatika) und unter Kontrazeptiva. Niereninsuffizienz ist kein spezifischer Risikofaktor für Folsäuremangel."
      },
      {
        type: "mc",
        id: "1047_05_p4_2",
        question: "Welche Vitamine des B-Komplexes sind direkt mit einer Anämie assoziiert? (Mehrere Antworten möglich)",
        options: [
          { text: "Vitamin B12 → megalozytäre Anämie", correct: true },
          { text: "Folsäure → Megaloblastenanämie", correct: true },
          { text: "Vitamin B1 → hämolytische Anämie", correct: false },
          { text: "Vitamin B6 → sideroachrestische Anämie", correct: false }
        ],
        explanation: "Vitamin B12 und Folsäure sind beide für die DNA-Synthese und Reifung der Erythrozyten essentiell. Ihr Mangel führt zu großen, unreifen Erythrozyten (megalozytäre bzw. Megaloblastenanämie). B1-Mangel verursacht Beri-Beri, nicht Anämie."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1047_06",
    title: "Fettlösliche Vitamine (A, D, E, K) & Ballaststoffe",
    contextHint: "Kap. 6+7 – Vit A: Nachtblindheit, Xerophthalmie; Vit D: Rachitis, Prohormon, UV; Vit E: Antioxidans 8 mg/Tag; Vit K: Blutgerinnung, Dicumarol; Ballaststoffe: löslich (Pektin, Beta-Glucan) vs. unlöslich (Cellulose, Lignin)",
    phase1: {
      soil: {
        statement: "Welche Funktionen und Mangelerscheinungen haben Vitamin A und Vitamin D?",
        answer: "Vit A (Retinol): aus Carotinen (Provitamin); Funktion: Sehpurpur, antikanzerogen; Mangel → Nachtblindheit, Xerophthalmie (Hornhautaustrocknung); Hypervitaminose → Kopfschmerzen, Erbrechen. Vit D (Calciferol): aus Cholesterin via UV-Licht synthetisierbar; eigentlich Prohormon; aktive Form Calcitriol (in Leber + Niere aktiviert); Calciumaufnahme↑; Mangel → Rachitis (Kinder), Osteomalazie (Erwachsene); Überdosierung → Knochenentkalktung, Calciumablagerungen in Weichteilen.",
        solution: "Vitamin D ist das einzige Vitamin, das der Körper selbst synthetisieren kann (UV-Licht auf Haut). Dennoch häufig mangelhaft, besonders im Winter und bei älteren Menschen mit wenig Sonnenexposition. Vitamin A-Hypervitaminose ist möglich (fettlöslich, kumuliert)."
      },
      seed: {
        statement: "Welche Aufgaben haben Vitamin E und Vitamin K?",
        answer: "Vit E (Tocopherol): Antioxidans (Zellschutz, 'zelleigener Rostschutz' gegen freie Radikale); verlangsamt Blutplättchenverklumpung; Bedarf 8 mg/Tag; Quellen: pflanzliche Öle (Raps, Oliven, Maiskeim, Sonnenblumen), Nüsse, Hülsenfrüchte. Vit K: Bildung von Prothrombin und Blutgerinnungsfaktoren VII, IX, X; Bedarf bis 70 µg/Tag; Quelle: Darmflora + grüne Gemüse; Mangel bei Darmflorastörungen/Cholestase → verlängerte Blutungszeit, Blutungsneigung. Dicumarol (Marcumar) hemmt Vit K → therapeutische Antikoagulation.",
        solution: "Vitamin K-Antagonisten (Cumarine) werden bei Patienten nach Herzinfarkt, Vorhofflimmern oder mit künstlichen Herzklappen eingesetzt. Patienten unter Marcumar müssen die Zufuhr von grünem Gemüse konstant halten."
      },
      water: {
        statement: "Was unterscheidet lösliche von unlöslichen Ballaststoffen und welche Wirkungen haben sie?",
        answer: "Unlösliche Ballaststoffe: Cellulose + Lignin; hohe Quellfähigkeit, beschleunigen Magen-Darm-Passage, binden Gallensäuren/Cholesterin, reduzieren Karzinogenexposition → Schutz vor Dickdarmkrebs; Quellen: Vollkornprodukte, Hülsenfrüchte. Lösliche Ballaststoffe: Pektin, Inulin, Beta-Glucan; wasserlöslich, teils vergärbar; Energiequelle für Dickdarmbakterien → kurzkettige Fettsäuren (Butyrat) → protektiv für Darmschleimhaut, antientzündlich; Quellen: Obst (Äpfel = viel Pektin), Gemüse, Haferflocken (Beta-Glucan), Lein-/Flohsamen.",
        solution: "Haferflocken enthalten Beta-Glucane (löslich) – cholesterinsenkend nachgewiesen. Vollkorn enthält primär unlösliche Ballaststoffe – wichtig für Darmpassage. Beide Typen sind wichtig und ergänzen sich."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1047_06_h1",
        question: "Welche Mangelerscheinung ist charakteristisch für Vitamin-A-Mangel?",
        options: [
          { text: "Nachtblindheit", correct: true },
          { text: "Rachitis", correct: false },
          { text: "Skorbut", correct: false },
          { text: "Beri-Beri", correct: false }
        ],
        explanation: "Vitamin-A-Mangel führt zu Nachtblindheit (Sehpurpur-Synthese gestört) und Xerophthalmie. Rachitis entsteht bei Vitamin-D-Mangel, Skorbut bei Vitamin-C-Mangel, Beri-Beri bei Vitamin-B1-Mangel."
      },
      {
        type: "true_false",
        id: "1047_06_h2",
        statement: "Vitamin D kann vom menschlichen Körper durch UV-Licht selbst synthetisiert werden.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Wahr. Vitamin D wird aus Cholesterin durch UV-Licht in der Haut gebildet und gilt daher als Prohormon, nicht als klassisches Vitamin. Die aktive Form Calcitriol entsteht in Leber und Niere."
      },
      {
        type: "mc",
        id: "1047_06_h3",
        question: "Welche Blutgerinnungsfaktoren sind für ihre Synthese auf Vitamin K angewiesen?",
        options: [
          { text: "Faktor VII, IX und X sowie Prothrombin", correct: true },
          { text: "Faktor I (Fibrinogen) und Faktor II", correct: false },
          { text: "Thrombozyten und Faktor XIII", correct: false },
          { text: "Von-Willebrand-Faktor und Faktor VIII", correct: false }
        ],
        explanation: "Vitamin K ist essentiell für die Synthese von Prothrombin und den Faktoren VII, IX und X. Diese Faktoren werden durch Vitamin-K-Antagonisten (Cumarine wie Marcumar) gehemmt."
      },
      {
        type: "true_false",
        id: "1047_06_h4",
        statement: "Lösliche Ballaststoffe wie Pektin können vom menschlichen Verdauungssystem nicht verwertet werden.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Lösliche Ballaststoffe wie Pektin, Inulin und Beta-Glucan werden von Darmbakterien im Dickdarm fermentiert. Dabei entstehen kurzkettige Fettsäuren (z. B. Butyrat), die die Darmschleimhaut ernähren und antientzündlich wirken."
      },
      {
        type: "mc",
        id: "1047_06_h5",
        question: "Welche Nahrungsquelle enthält besonders viel Beta-Glucan (löslicher Ballaststoff)?",
        options: [
          { text: "Haferflocken", correct: true },
          { text: "Weißbrot", correct: false },
          { text: "Fleisch", correct: false },
          { text: "Kartoffeln", correct: false }
        ],
        explanation: "Haferflocken haben einen besonders hohen Gehalt an Beta-Glucanen (löslicher Ballaststoff). Lein- und Flohsamen sowie Obst (Äpfel für Pektin) sind weitere gute Quellen für lösliche Ballaststoffe."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1047_06_p4_1",
        question: "Welche fettlöslichen Vitamine können bei Überdosierung toxisch sein? (Mehrere Antworten möglich)",
        options: [
          { text: "Vitamin A (Kopfschmerzen, Erbrechen)", correct: true },
          { text: "Vitamin D (Knochenentkalktung, Calciumablagerungen)", correct: true },
          { text: "Vitamin C (wasserlöslich, wird ausgeschieden)", correct: false },
          { text: "Vitamin K (Blutungsneigung bei Überdosierung)", correct: false }
        ],
        explanation: "Fettlösliche Vitamine (A, D, E, K) kumulieren im Körper und können bei Überdosierung toxisch sein. Vitamin A: Kopfschmerzen, Erbrechen. Vitamin D: Hyperkalzämie, Calciumablagerungen. Vitamin C ist wasserlöslich und wird ausgeschieden (aber Oxalatsteine bei Megadosen möglich)."
      },
      {
        type: "mc",
        id: "1047_06_p4_2",
        question: "Welche Aussagen zu löslichen und unlöslichen Ballaststoffen sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Unlösliche Ballaststoffe beschleunigen die Magen-Darm-Passage", correct: true },
          { text: "Lösliche Ballaststoffe dienen als Substrat für Darmbakterien", correct: true },
          { text: "Unlösliche Ballaststoffe senken den Cholesterinspiegel durch Gallensäurebindung", correct: true },
          { text: "Lösliche Ballaststoffe finden sich hauptsächlich in Vollkornprodukten", correct: false }
        ],
        explanation: "Unlösliche BS: beschleunigen Passage, binden Gallensäuren/Cholesterin, Schutz vor Dickdarmkrebs. Lösliche BS: Substrat für Darmbakterien → Butyrat, antientzündlich. Lösliche BS finden sich in Obst, Gemüse, Haferflocken – nicht primär in Vollkorn (das enthält v. a. unlösliche BS)."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1047_07",
    title: "Diät bei Magen-, Darm-, Leber- und Gallenerkrankungen",
    contextHint: "Kap. 8.1–8.4 – Magenerkrankung: Alkohol/Kaffee/Rauchen meiden; CED: eiweißreich, kein Industrie-LM; Zöliakie: glutenfrei (Weizen, Roggen, Gerste, Dinkel...); Leber: Alkoholverbot, 5 Mahlzeiten; Galle: max. 40 g Fett; Pankreatitis: 7 Stufen",
    phase1: {
      soil: {
        statement: "Welche Ernährungsregeln gelten bei Magenerkrankungen, Gastroenteritis und chronisch-entzündlichen Darmerkrankungen?",
        answer: "Magenerkrankungen: leichte, fettarme, KH-reiche Vollkost; mehrere kleine Portionen; meiden: Alkohol, Kaffee, Rauchen (stimulieren Säureproduktion). Gastroenteritis: 1–2 Tage nur ungesüßter Tee + evtl. Zwieback, dann Kostaufbau. CED (M. Crohn, Colitis ulcerosa): eiweißreiche Kost, Elektrolytverluste ausgleichen (B12 + Eisen), ggf. laktosefrei, keine industriell stark verarbeiteten LM (Emulgatoren begünstigen Entzündung).",
        solution: "Bei CED droht Mangelernährung – durch Malabsorption, erhöhten Bedarf und oft verringerte Nahrungsaufnahme. Im akuten Schub ist manchmal parenterale Ernährung nötig."
      },
      seed: {
        statement: "Was ist Zöliakie und welche Lebensmittel müssen gemieden werden?",
        answer: "Zöliakie: Autoimmunerkrankung (nicht Nahrungsmittelunverträglichkeit) – Immunreaktion auf Klebereiweiß Gluten → Entzündung der Dünndarmzotten → Atrophie → Malabsorption. Strikte lebenslange glutenfreie Kost. Meiden: Weizen, Roggen, Gerste, Hafer, Dinkel, Emmer, Einkorn, Grünkern, Triticale. Hafer ist von Natur aus glutenfrei, wird aber fast immer kontaminiert. Gluten auch in vielen verarbeiteten LM versteckt.",
        solution: "Zöliakie ist keine Allergie, sondern eine Autoimmunerkrankung. Die einzige Therapie ist konsequente Glutenfreiheit – keine Diät, die nur Beschwerden mildert, sondern vollständige Abstinenz zur Zottenerholung."
      },
      water: {
        statement: "Welche Ernährungsregeln gelten bei Leber- und Gallenwegserkrankungen? Was ist die Pankreatitis-Stufenkost?",
        answer: "Leber: vollwertige Mischkost; absolutes Alkoholverbot; 5 kleine Mahlzeiten; meiden: fettreiche/-gebratene Speisen, blähende Gemüse (Kohl, Zwiebeln), Nüsse, scharfe Gewürze. Keine spezielle 'Leberdiät'. Galle: magerer Fisch/Fleisch gedünstet; max. 40 g Fett/Tag; zarte Gemüse; was Leber verträgt, verträgt auch Galle. Akute Pankreatitis Stufen 1–7: 1=Infusion (NPO), 2=ungesüßter Tee, 3=Tee + Traubenzucker, 4=KH-Aufbau, 5=KH-Eiweiß extrem fettarm, 6=langsam Fett zugeben (10 g/Tag), 7=leichte Vollkost.",
        solution: "Stufe 1 der Pankreatitis-Kost bedeutet absolute Nahrungskarenz (nil per os) – Infusion zur Flüssigkeitsversorgung. Bei chronischer Pankreatitis: Alkohol für mindestens 6 Monate verboten."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1047_07_h1",
        question: "Welches Getreide muss ein Zöliakie-Patient zwingend meiden?",
        options: [
          { text: "Weizen", correct: true },
          { text: "Reis", correct: false },
          { text: "Mais", correct: false },
          { text: "Buchweizen", correct: false }
        ],
        explanation: "Zöliakiepatienten müssen alle glutenhaltigen Getreide meiden: Weizen, Roggen, Gerste, Hafer, Dinkel, Emmer, Einkorn, Grünkern und Triticale. Glutenfrei sind: Reis, Mais, Hirse, Buchweizen, Amaranth und Quinoa."
      },
      {
        type: "true_false",
        id: "1047_07_h2",
        statement: "Bei akuter Pankreatitis beginnt der Kostaufbau in Stufe 1 mit ungesüßtem Tee.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Stufe 1 der Pankreatitis-Kost bedeutet absolute Nahrungskarenz (NPO) – nur Infusionstherapie zur künstlichen Ernährung. Ungesüßter Tee ist erst Stufe 2."
      },
      {
        type: "mc",
        id: "1047_07_h3",
        question: "Welche maximale tägliche Fettmenge wird bei Gallenwegserkrankungen empfohlen?",
        options: [
          { text: "40 g Fett/Tag", correct: true },
          { text: "10 g Fett/Tag", correct: false },
          { text: "80 g Fett/Tag", correct: false },
          { text: "100 g Fett/Tag", correct: false }
        ],
        explanation: "Bei Gallenwegserkrankungen werden maximal 40 g Fett pro Tag empfohlen. Bevorzugt werden magerer gedünsteter Fisch oder Fleisch, Beilagen aus Reis, Kartoffeln oder Nudeln."
      },
      {
        type: "true_false",
        id: "1047_07_h4",
        statement: "Bei Lebererkrankungen empfiehlt man heute strenge Schonkost mit wenig Eiweiß und Fett.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Früher wurde strenge Schonkost empfohlen, heute gilt: vollwertige Mischkost, die gut bekömmlich ist. Das oberste Gebot ist Alkoholverzicht, keine generelle Einschränkung von Eiweiß und Fett."
      },
      {
        type: "mc",
        id: "1047_07_h5",
        question: "Was ist das 'oberste Gebot' in der Ernährung bei Lebererkrankungen?",
        options: [
          { text: "Kein Alkohol", correct: true },
          { text: "Kein Fett", correct: false },
          { text: "Kein Fleisch", correct: false },
          { text: "Keine Kohlenhydrate", correct: false }
        ],
        explanation: "Das oberste Gebot bei Lebererkrankungen lautet: kein Alkohol. Alkohol ist das wichtigste Lebertoxin. Dazu kommen 5 kleine Mahlzeiten und Meiden von schwer verträglichen Speisen."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1047_07_p4_1",
        question: "Welche Unterschiede bestehen zwischen der Ernährungstherapie bei akuter und chronischer Pankreatitis? (Mehrere Antworten möglich)",
        options: [
          { text: "Akut: absolute Nahrungskarenz in Stufe 1 (Infusion)", correct: true },
          { text: "Chronisch: langfristig fett- und mäßig eiweißarme Ernährung", correct: true },
          { text: "Chronisch: Alkohol ist nach 3 Monaten wieder erlaubt", correct: false },
          { text: "Chronisch: Ballaststoffe langsam steigern nach individueller Verträglichkeit", correct: true }
        ],
        explanation: "Akute Pankreatitis: strikte Nahrungskarenz (Drüse ruhigstellen), dann stufenweiser Aufbau. Chronisch: langfristig fettarm, nicht zu eiweißhaltig, Alkohol für mind. 6 Monate verboten (nicht 3), Ballaststoffe nach Verträglichkeit steigern."
      },
      {
        type: "mc",
        id: "1047_07_p4_2",
        question: "Welche Aussagen zur Zöliakie und CED sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Zöliakie ist eine Autoimmunerkrankung", correct: true },
          { text: "CED-Patienten haben erhöhtes Risiko für Mangelernährung", correct: true },
          { text: "Bei Zöliakie ist glutenarme (nicht glutenfreie) Kost ausreichend", correct: false },
          { text: "Bei CED besteht häufig ein Mangel an Vitamin B12 und Eisen", correct: true }
        ],
        explanation: "Zöliakie ist eine Autoimmunerkrankung (nicht Allergie), die strikte Glutenfreiheit erfordert – glutenarm reicht nicht. CED-Patienten sind oft mangelernährt (Malabsorption) und haben häufig B12- und Eisenmangel."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1047_08",
    title: "Diät bei Diabetes, Nieren-, Herz-Kreislauf-Erkrankungen & Gicht",
    contextHint: "Kap. 8.6–8.9 – Diabetes: KH 45–50%, Eiweiß 15–20%, Fett 30%; Niere: streng eiweißarm 0,35–0,45 g, Dialyse eiweißreich; Hypertonie: Na↓, K/Mg↑; Gicht: Purine↓, Fruchtzucker meiden, >2 L/Tag trinken",
    phase1: {
      soil: {
        statement: "Welche Ernährungsgrundsätze gelten bei Diabetes mellitus?",
        answer: "Nährstoffrelation: KH 45–50 % (1 g = 4 kcal), Eiweiß 15–20 % (1 g = 4 kcal), Fett 30 % (1 g = 9 kcal). Ziel: gleichmäßiger Blutzucker, keine Spitzen. 'Langsame' KH bevorzugen (Stärke, Ballaststoffe); 'schnelle' KH (isolierter Zucker, Limonaden) meiden. Eiweiß max. 20 % → Nephropathierisiko. Fett: mehrfach ungesättigte bevorzugen, gesättigte reduzieren. Früher KH-Reduktion + viel Fett-Diabetiker-LM → Übergewicht; heute: Ernährung kaum verschieden von gesunder Normalkost; spezielle Diabetiker-LM vom Markt genommen.",
        solution: "Spezielle Diabetikerlebensmittel enthielten hohe Fettanteile als KH-Ersatz und führten zu Übergewicht – ein unbeabsichtigter Schaden durch veraltetes Ernährungswissen."
      },
      seed: {
        statement: "Welche Eiweißmengen sind bei Nierenerkrankungen indiziert und wann ist eiweißreiche Kost nötig?",
        answer: "Nierendiät = eiweißdefinierte Kostform. Abstufungen: streng eiweißarm 0,35–0,45 g/kg KG; mäßig eiweißarm 0,45–0,6 g/kg KG; Normalzufuhr 0,8 g/kg KG; eiweißreich 1–1,5 g/kg KG. Eiweißarme Kost: Niereninsuffizienz. Eiweißreiche Kost: Dialyse (Aminosäureverlust!), Verbrennungen, Operationen, Mangelernährung, onkologische Patienten. Mindestens ⅔ des Eiweißes: biologisch hochwertig (tierisch). Gute Kombinationen: Kartoffel + Ei, Weizen + Milch, Hülsenfrüchte + Getreide.",
        solution: "Dialysepatienten benötigen eiweißreich – paradox, aber erklärbar: durch die Dialyse gehen Aminosäuren verloren, die ersetzt werden müssen. Bei Niereninsuffizienz ohne Dialyse gilt das Gegenteil."
      },
      water: {
        statement: "Welche Ernährungsmaßnahmen helfen bei Hypertonie, Hypercholesterinämie und Gicht?",
        answer: "Hypertonie: Na↓, K/Mg-reiche LM, Übergewicht reduzieren, Alkohol → alkoholfrei, Koffein↓, Bewegung. Hypercholesterinämie: HDL↑/LDL↓; Fettverzehr↓, gesättigte FS↓, trans-Fette meiden (Fertiggerichte, Margarine), ungesättigte FS↑, schnelle KH↓, Ballaststoffe↑, Cholesterin <300 mg/Tag. Gicht: Purine↓ (Fleisch/Geflügel/Fisch↓, Innereien meiden); Fruchtzucker meiden (wird in Leber zu Purinen → Harnsäure↑); Flüssigkeit >2 L/Tag (Urinmenge ≥2 L); kein Bier (viel Purine); nicht braten (konzentriert Purine); Insulin fördert Harnsäure-Rückresorption.",
        solution: "Fruchtzucker (Fructose) ist ein häufig übersehener Gichtauslöser – er wird in der Leber direkt zu Purinen metabolisiert. Industriell mit HFCS gesüßte Getränke sind besonders problematisch."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1047_08_h1",
        question: "Welchen Anteil sollten Kohlenhydrate an der Gesamtnahrungsenergie bei Diabetikern ausmachen?",
        options: [
          { text: "45–50 %", correct: true },
          { text: "10–15 %", correct: false },
          { text: "60–70 %", correct: false },
          { text: "30–35 %", correct: false }
        ],
        explanation: "Die empfohlene Nährstoffrelation bei Diabetes: KH 45–50 %, Eiweiß 15–20 %, Fett 30 %. Früher wurde KH stark reduziert – heute weiß man, dass die Ernährung des Diabetikers sich kaum von gesunder Normalkost unterscheiden muss."
      },
      {
        type: "true_false",
        id: "1047_08_h2",
        statement: "Bei Gicht sollten Lebensmittel bevorzugt gebraten werden, da dies Purine zerstört.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Braten konzentriert Purine in Lebensmitteln. Bei Gicht sollten Lebensmittel daher lieber gedünstet oder gekocht werden."
      },
      {
        type: "mc",
        id: "1047_08_h3",
        question: "Bei welchen Patienten ist eine eiweißreiche Kost (1–1,5 g/kg KG) indiziert?",
        options: [
          { text: "Dialysepatienten", correct: true },
          { text: "Patienten mit Niereninsuffizienz (ohne Dialyse)", correct: false },
          { text: "Patienten mit Gicht", correct: false },
          { text: "Patienten mit Herzinsuffizienz", correct: false }
        ],
        explanation: "Dialysepatienten benötigen eiweißreiche Kost, da durch die Dialyse Aminosäuren verloren gehen. Niereninsuffizienz (ohne Dialyse) erfordert dagegen eiweißarme Kost."
      },
      {
        type: "true_false",
        id: "1047_08_h4",
        statement: "Fruchtzucker kann den Harnsäurespiegel erhöhen.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Wahr. Fruchtzucker wird in der Leber fast ausschließlich verstoffwechselt und erhöht dort den Purin-Pool. Dies steigert die Harnsäureproduktion. Daher ist bei Gicht auch Fruchtzucker (z. B. in Limonaden) zu meiden."
      },
      {
        type: "mc",
        id: "1047_08_h5",
        question: "Welche maximale tägliche Cholesterinmenge wird bei Hypercholesterinämie empfohlen?",
        options: [
          { text: "300 mg/Tag", correct: true },
          { text: "1000 mg/Tag", correct: false },
          { text: "50 mg/Tag", correct: false },
          { text: "600 mg/Tag", correct: false }
        ],
        explanation: "Bei Hypercholesterinämie wird eine Cholesterinzufuhr von maximal 300 mg/Tag empfohlen. Zusätzlich: gesättigte FS↓, trans-Fette meiden, ungesättigte FS↑, Ballaststoffe bevorzugen."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1047_08_p4_1",
        question: "Wann ist eiweißarme, wann eiweißreiche Kost indiziert? (Mehrere Antworten möglich – 'eiweißarm')",
        options: [
          { text: "Niereninsuffizienz (ohne Dialyse)", correct: true },
          { text: "Dialysetherapie", correct: false },
          { text: "Verbrennungen und Operationen", correct: false },
          { text: "Onkologische Patienten mit Mangelernährung", correct: false }
        ],
        explanation: "Eiweißarme Kost ist nur bei Niereninsuffizienz (ohne Dialyse) indiziert. Dialyse, Verbrennungen, Operationen und Mangelernährung erfordern eiweißreiche Kost (1–1,5 g/kg KG), da der Bedarf erhöht ist oder Verluste ersetzt werden müssen."
      },
      {
        type: "mc",
        id: "1047_08_p4_2",
        question: "Welche Gemeinsamkeiten gibt es in der Ernährungstherapie bei Hypercholesterinämie und Gicht? (Mehrere Antworten möglich)",
        options: [
          { text: "Ballaststoffreiche Kost empfohlen", correct: true },
          { text: "Schnell verfügbare Kohlenhydrate (Zucker, Brot, Nudeln) reduzieren", correct: true },
          { text: "Kein Alkohol empfohlen", correct: true },
          { text: "Strenge eiweißarme Diät erforderlich", correct: false }
        ],
        explanation: "Sowohl bei Hypercholesterinämie als auch bei Gicht empfiehlt man: ballaststoffreiche Kost, Reduktion schneller KH und Alkoholverzicht. Strenge eiweißarme Diät ist bei Niereninsuffizienz indiziert, nicht bei diesen Erkrankungen."
      }
    ]
  })
];
