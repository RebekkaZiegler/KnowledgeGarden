  makeDetailedPlant({
    id: "mediastinum_1035",
    title: "Mediastinum und Zwerchfelldurchtritte",
    contextHint: "Mediastinum = Mittelfell zwischen beiden Lungenflügeln; oberes Mediastinum (Thymus, Trachea, Aortenbogen, Ösophagus, V. cava sup.); unteres Mediastinum: vorderes (Thymusreste), mittleres (Herz/Perikard), hinteres (Ösophagus, Aorta descendens, V. azygos, Ductus thoracicus); 3 Hiatus: Foramen venae cavae Th8 (V. cava inf.), Hiatus oesophageus Th10 (Ösophagus+N.vagus), Hiatus aorticus Th12 (Aorta)",
    phase1: {
      soil: {
        statement: "Das Mediastinum bezeichnet den Raum zwischen beiden Lungen, der Herz, Gefäße, Trachea und Ösophagus enthält.",
        answer: true,
        solution: "Richtig. Das Mediastinum (Mittelfell) liegt zwischen den beiden Pleurahöhlen. Es enthält lebenswichtige Strukturen: Herz mit Perikard, große Gefäße (Aortenbogen, V. cava), Trachea, Ösophagus, Thymus, Lymphgefäße (Ductus thoracicus) und Nerven (Nn. vagi, N. phrenicus). Es wird in oberes und unteres Mediastinum unterteilt, das untere wiederum in vorderes, mittleres und hinteres.",
      },
      seed: {
        statement: "Der Hiatus aorticus (Aortendurchtritt) liegt auf Höhe des 10. Brustwirbels.",
        answer: false,
        solution: "Falsch. Der Hiatus aorticus liegt auf Höhe des 12. Brustwirbels (Th12). Die drei Zwerchfelldurchtritte von oben nach unten: Foramen venae cavae (Th8, V. cava inferior), Hiatus oesophageus (Th10, Ösophagus + beide Nn. vagi), Hiatus aorticus (Th12, Aorta + Ductus thoracicus). Eselsbrücke: 8-10-12.",
      },
      water: {
        statement: "Das hintere untere Mediastinum enthält Ösophagus, absteigende Aorta und den Ductus thoracicus.",
        answer: true,
        solution: "Richtig. Das hintere Mediastinum liegt hinter dem Herz-Perikard und enthält Ösophagus, Aorta descendens (thoracalis), V. azygos/hemiazygos, Ductus thoracicus (größtes Lymphgefäß des Körpers), Nn. vagi und Truncus sympathicus. Das mittlere Mediastinum enthält das Herz mit Perikard; das vordere nur Bindegewebe und Thymusreste.",
      },
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "med_h1",
        question: "In welche Abschnitte gliedert sich das Mediastinum?",
        options: [
          { text: "Oberes Mediastinum + unteres Mediastinum (vorderes, mittleres, hinteres)", correct: true },
          { text: "Rechtes und linkes Mediastinum entsprechend der Lungenflügel", correct: false },
          { text: "Nur zwei Abschnitte: vorderes und hinteres Mediastinum", correct: false },
          { text: "Mediastinum wird nicht weiter unterteilt", correct: false },
        ],
        explanation: "Das Mediastinum wird durch das Perikard in oberes und unteres Mediastinum unterteilt. Das untere gliedert sich in vorderes (vor dem Perikard), mittleres (Herz + Perikard) und hinteres (hinter dem Perikard). Das obere enthält Thymus, Aortenbogen, Trachea, Ösophagus und V. cava superior.",
      },
      {
        type: "mc",
        id: "med_h2",
        question: "Auf welcher Wirbelhöhe liegt der Hiatus oesophageus (Ösophagusdurchtritt durch das Zwerchfell)?",
        options: [
          { text: "Th10 (10. Brustwirbel)", correct: true },
          { text: "Th8 (8. Brustwirbel)", correct: false },
          { text: "Th12 (12. Brustwirbel)", correct: false },
          { text: "L1 (1. Lendenwirbel)", correct: false },
        ],
        explanation: "Die drei Zwerchfelldurchtritte (Eselsbrücke: 8-10-12 von kranial nach kaudal): Foramen venae cavae Th8 (V. cava inferior + rechter N. phrenicus), Hiatus oesophageus Th10 (Ösophagus + beide Nn. vagi), Hiatus aorticus Th12 (Aorta + Ductus thoracicus). Klinisch: Hiatushernie = Magenteile durch Hiatus oesophageus in Thorax.",
      },
      {
        type: "mc",
        id: "med_h3",
        question: "Was enthält das obere Mediastinum?",
        options: [
          { text: "Thymus, Trachea, Aortenbogen, Ösophagus und V. cava superior", correct: true },
          { text: "Herz, Perikard und Nn. phrenici", correct: false },
          { text: "Ösophagus, Aorta descendens und V. azygos", correct: false },
          { text: "Nur Fettgewebe und Bindegewebe", correct: false },
        ],
        explanation: "Oberes Mediastinum (über dem Perikard): Thymus (beim Kind groß, beim Erwachsenen Fettgewebe), Trachea, Aortenbogen (mit Truncus brachiocephalicus, A. carotis communis sin., A. subclavia sin.), Ösophagus, V. cava superior, Nn. vagi, Nn. phrenici, Ductus thoracicus.",
      },
      {
        type: "true_false",
        id: "med_h4",
        statement: "Durch den Hiatus aorticus auf Höhe Th12 treten Aorta und Ductus thoracicus durch das Zwerchfell.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false },
        ],
        explanation: "Wahr. Der Hiatus aorticus (Th12) liegt hinter dem Zwerchfell und ist kein echter Durchbruch durch die Muskulatur, sondern eine Lücke zwischen Zwerchfell und Wirbelkörper – daher kann er nicht durch Zwerchfellkontraktion verengt werden. Der Ductus thoracicus (größtes Lymphgefäß) begleitet die Aorta durch diesen Hiatus.",
      },
      {
        type: "mc",
        id: "med_h5",
        question: "Welche Struktur tritt durch das Foramen venae cavae auf Höhe Th8?",
        options: [
          { text: "V. cava inferior (untere Hohlvene)", correct: true },
          { text: "Aorta descendens", correct: false },
          { text: "Ösophagus und Nn. vagi", correct: false },
          { text: "Ductus thoracicus", correct: false },
        ],
        explanation: "Foramen venae cavae (Th8): V. cava inferior + rechter N. phrenicus. Der Durchtritt liegt im Centrum tendineum (Sehnenzentrum) des Zwerchfells. Klinisch: Bei rechtsseitiger Zwerchfelllähmung (N. phrenicus) fehlt die aktive Inspiration rechts.",
      },
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "med_p4_1",
        question: "Welche Aussagen zu den Zwerchfelldurchtritten sind korrekt? (Mehrere richtig)",
        options: [
          { text: "Foramen venae cavae Th8: V. cava inferior", correct: true },
          { text: "Hiatus oesophageus Th10: Ösophagus + Nn. vagi", correct: true },
          { text: "Hiatus aorticus Th12: Aorta + Ductus thoracicus", correct: true },
          { text: "Ösophagus tritt auf Höhe Th12 durch das Zwerchfell", correct: false },
        ],
        explanation: "Merkhilfe 8-10-12: V. cava inf. (Th8), Ösophagus+Nn.vagi (Th10), Aorta+Ductus thoracicus (Th12). Klinisch: Hiatushernie = Magen durch Hiatus oesophageus; Aortenaneurysma kann Ductus thoracicus komprimieren.",
      },
      {
        type: "mc",
        id: "med_p4_2",
        question: "Was enthält das mittlere untere Mediastinum?",
        options: [
          { text: "Herz mit Perikard, Wurzeln der großen Gefäße, Nn. phrenici", correct: true },
          { text: "Thymus, Trachea und Aortenbogen", correct: false },
          { text: "Ösophagus, Aorta descendens und Ductus thoracicus", correct: false },
          { text: "Nur Fettgewebe ohne Organe", correct: false },
        ],
        explanation: "Mittleres unteres Mediastinum = Herzraum: Herz + Perikard + Wurzeln der Aorta und A./V. pulmonales + Nn. phrenici (verlaufen seitlich am Perikard). Davor: vorderes Mediastinum (Thymusreste, Fett); dahinter: hinteres Mediastinum (Ösophagus, Aorta desc., V. azygos, Ductus thoracicus).",
      },
    ],
  }),

  makeDetailedPlant({
    id: "atemsteuerung_mechanisch_1035",
    title: "Mechanische Atemsteuerung und Hering-Breuer-Reflex",
    contextHint: "Hering-Breuer-Reflex = Dehnungsrezeptoren in Bronchialwand/Alveolen → N.vagus → Medulla oblongata → Inspiration hemmt sich selbst (Schutzreflex vor Überdehnung); mechanisch-reflektorische vs. chemische Atemsteuerung; BGA (Blutgasanalyse): pH 7,35-7,45; pO2 80-100 mmHg; pCO2 35-45 mmHg; Hyperventilation → CO2↓ → respiratorische Alkalose; Hypoventilation → CO2↑ → respiratorische Azidose",
    phase1: {
      soil: {
        statement: "Der Hering-Breuer-Reflex schützt die Lunge vor Überdehnung: Dehnungsrezeptoren in der Lunge hemmen bei starker Inflation die weitere Inspiration.",
        answer: true,
        solution: "Richtig. Dehnungsrezeptoren (Slow Adapting Receptors, SAR) in der Bronchialwand und im Lungenparenchym messen den Dehnungszustand. Bei starker Ausdehnung senden sie über den N. vagus Signale an das Atemzentrum in der Medulla oblongata, das daraufhin die Inspiration beendet und die Exspiration einleitet. Dieser Hering-Breuer-Reflex ist beim Menschen hauptsächlich bei tiefer Atmung und beim Neugeborenen aktiv.",
      },
      seed: {
        statement: "Die Blutgasanalyse (BGA) misst ausschließlich den Sauerstoffgehalt des Blutes.",
        answer: false,
        solution: "Falsch. Die BGA misst mehrere Parameter gleichzeitig: pH-Wert (normal 7,35–7,45), Sauerstoffpartialdruck pO2 (normal 80–100 mmHg), Kohlendioxidpartialdruck pCO2 (normal 35–45 mmHg), Bikarbonat HCO3− und Basenüberschuss (BE). Sie ermöglicht die Diagnose von respiratorischer Azidose (pCO2 >45 mmHg, pH <7,35) und Alkalose (pCO2 <35 mmHg, pH >7,45).",
      },
      water: {
        statement: "Hyperventilation senkt den CO2-Partialdruck im Blut und kann zu Schwindel und Kribbelgefühl führen.",
        answer: true,
        solution: "Richtig. Hyperventilation = zu schnelles/tiefes Atmen → übermäßiger CO2-Abtransport → pCO2 sinkt (Hypokapnie) → pH steigt (respiratorische Alkalose) → Vasokonstriktion der Hirngefäße → Schwindel, Sehstörungen, Kribbelparästhesien. Gegenmittel: in eine Tüte atmen (CO2 rückatmen) oder bewusstes Verlangsamen der Atmung.",
      },
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "atm_h1",
        question: "Was ist der Hering-Breuer-Reflex und welcher Nerv vermittelt ihn?",
        options: [
          { text: "Dehnungsrezeptoren in der Lunge hemmen die Inspiration bei Überdehnung; Afferenz über N. vagus", correct: true },
          { text: "Chemorezeptoren in der Medulla erhöhen die Atemfrequenz bei CO2-Anstieg", correct: false },
          { text: "Periphere Chemorezeptoren im Karotiskörperchen reagieren auf O2-Mangel", correct: false },
          { text: "Der Kortex hemmt das Atemzentrum bei willkürlichem Atemanhalten", correct: false },
        ],
        explanation: "Hering-Breuer-Reflex: Slow Adapting Receptors (SAR) in Bronchialwand → bei Lungendehnung → N. vagus → Medulla oblongata → Inspirationshemmung + Exspirationsbeginn. Schützt vor Überdehnung (Volutrauma). Beim Menschen v.a. bei tiefer Atmung und beim Neugeborenen aktiv.",
      },
      {
        type: "mc",
        id: "atm_h2",
        question: "Was sind Normalwerte der Blutgasanalyse (BGA) für pH und pCO2?",
        options: [
          { text: "pH 7,35–7,45; pCO2 35–45 mmHg", correct: true },
          { text: "pH 7,0–7,2; pCO2 50–60 mmHg", correct: false },
          { text: "pH 7,6–7,8; pCO2 20–30 mmHg", correct: false },
          { text: "pH 6,8–7,0; pCO2 45–55 mmHg", correct: false },
        ],
        explanation: "BGA-Normalwerte: pH 7,35–7,45 (leicht basisch), pO2 80–100 mmHg (arteriell), pCO2 35–45 mmHg, HCO3− 22–26 mmol/l, BE ±2 mmol/l. Respiratorische Azidose: pCO2 >45 + pH <7,35 (z.B. bei COPD, Hypoventilation). Respiratorische Alkalose: pCO2 <35 + pH >7,45 (z.B. bei Hyperventilation).",
      },
      {
        type: "mc",
        id: "atm_h3",
        question: "Was passiert bei Hyperventilation mit pCO2 und pH?",
        options: [
          { text: "pCO2 sinkt (Hypokapnie) → pH steigt (respiratorische Alkalose)", correct: true },
          { text: "pCO2 steigt (Hyperkapnie) → pH sinkt (respiratorische Azidose)", correct: false },
          { text: "pCO2 und pH bleiben unverändert", correct: false },
          { text: "Nur pO2 ändert sich, pCO2 bleibt konstant", correct: false },
        ],
        explanation: "Hyperventilation: zu viel CO2 wird ausgeatmet → pCO2 ↓ → weniger H2CO3 → weniger H+ → pH ↑ (Alkalose). Symptome: Schwindel, Taubheitsgefühl, Kribbelparästhesien (durch Hyperventilationstetanie). Gegenmittel: Tütenatmung (CO2 rückatmen) oder bewusstes Verlangsamung.",
      },
      {
        type: "true_false",
        id: "atm_h4",
        statement: "Der Hering-Breuer-Reflex ist ein mechanisch-reflektorischer Schutz der Lunge vor Überdehnung.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false },
        ],
        explanation: "Wahr. Im Gegensatz zur chemischen Atemsteuerung (CO2/O2/pH) nutzt die mechanisch-reflektorische Steuerung Dehnungsrezeptoren (Mechanorezeptoren) als Sensoren. Der Hering-Breuer-Reflex ist ein negativer Feedback-Mechanismus: Je mehr sich die Lunge ausdehnt, desto stärker hemmt er die weitere Inspiration.",
      },
      {
        type: "mc",
        id: "atm_h5",
        question: "Was beschreibt die respiratorische Azidose und was ist ihre häufige Ursache?",
        options: [
          { text: "pH <7,35 + pCO2 >45 mmHg durch Hypoventilation (CO2-Retention), z.B. bei COPD", correct: true },
          { text: "pH >7,45 + pCO2 <35 mmHg durch Hyperventilation", correct: false },
          { text: "pH <7,35 durch Bikarbonatverlust (metabolische Azidose)", correct: false },
          { text: "Normale Blutgaswerte bei erhöhter Atemfrequenz", correct: false },
        ],
        explanation: "Respiratorische Azidose: Hypoventilation → CO2-Retention → pCO2 >45 mmHg → pH <7,35. Ursachen: COPD (obstruktive Ventilationsstörung), Atemdepression (Morphin), Atemmuskellähmung. Behandlung: Atemunterstützung/Beatmung. Metabolische Azidose entsteht dagegen durch Säureanhäufung (z.B. Ketoazidose) oder Bikarbonatverlust.",
      },
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "atm_p4_1",
        question: "Welche Aussagen zur mechanischen Atemsteuerung sind korrekt? (Mehrere richtig)",
        options: [
          { text: "Hering-Breuer-Reflex: Dehnungsrezeptoren → N. vagus → Inspirationshemmung bei Überdehnung", correct: true },
          { text: "Mechanische Steuerung ergänzt die chemische Steuerung (CO2/O2/pH)", correct: true },
          { text: "Der Hering-Breuer-Reflex stimuliert die Inspiration statt sie zu hemmen", correct: false },
          { text: "Dehnungsrezeptoren messen den CO2-Gehalt der Alveolarluft", correct: false },
        ],
        explanation: "Zwei Atemsteuerungsebenen: 1. Chemisch (CO2/O2/pH-Sensoren → Chemorezeptoren → Frequenz/Tiefe anpassen). 2. Mechanisch-reflektorisch (Dehnungsrezeptoren → N. vagus → Hering-Breuer = Inspirationsbremse). Beide laufen parallel und ergänzen sich.",
      },
      {
        type: "mc",
        id: "atm_p4_2",
        question: "Welcher BGA-Befund spricht für eine respiratorische Alkalose?",
        options: [
          { text: "pH >7,45 + pCO2 <35 mmHg (z.B. bei Hyperventilation)", correct: true },
          { text: "pH <7,35 + pCO2 >45 mmHg (z.B. bei COPD)", correct: false },
          { text: "pH normal + pCO2 normal + HCO3− erniedrigt", correct: false },
          { text: "pH <7,35 + HCO3− erniedrigt (metabolische Azidose)", correct: false },
        ],
        explanation: "BGA-Interpretation: Respiratorische Alkalose = Hyperventilation → CO2 ↓ → pH ↑. Respiratorische Azidose = Hypoventilation → CO2 ↑ → pH ↓. Metabolische Störungen betreffen primär HCO3−. Merkhilfe: pH und pCO2 zeigen bei respiratorischen Störungen in ENTGEGENGESETZTE Richtungen (CO2 ↑ → pH ↓).",
      },
    ],
  }),
