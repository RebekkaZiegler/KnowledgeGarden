// Studienbrief 1036 — Strukturen und Funktion des Herz-Kreislaufsystems + Pädiatrie
// Temp file: merge into js/content.js before PACK_CONTENT

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
