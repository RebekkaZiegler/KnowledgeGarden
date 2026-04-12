const SINNESORGANE_GERIATRIE_1044_PLANTS = [
  makeDetailedPlant({
    id: "1044_01",
    title: "Aufbau des Ohres & Schallweiterleitung",
    contextHint: "Kap. 1 – Äußeres Ohr, Mittelohr, Schallweg: Trommelfell → Gehörknöchelchen → ovales Fenster; Frequenzbereich",
    phase1: {
      soil: {
        statement: "Aus welchen drei Bereichen besteht das Ohr und was gehört jeweils dazu?",
        answer: "Äußeres Ohr (Auris externa): Ohrmuschel (Aurikula), Gehörgang (Meatus acusticus externus, 2,5–3 cm, s-förmig), Cerumen (Ohrenschmalz: virostatisch, fungizid, bakterizid), Tragus. Mittelohr (Auris media): Trommelfell (Membrana tympani, 1 cm), Paukenhöhle, Tuba auditiva (Eustachische Röhre, Druckausgleich), Gehörknöchelchen: Hammer → Amboss → Steigbügel. Innenohr (Auris interna): Cochlea + Vestibularorgan.",
        solution: "Das Trommelfell (Membrana tympani) bildet die Grenze zwischen äußerem Ohr und Mittelohr. Ein gesundes Trommelfell ist glänzend grau-beige; ein rotes ist entzündet."
      },
      seed: {
        statement: "Wie wird Schall vom Außenohr bis ins Innenohr weitergeleitet?",
        answer: "Schallwellen → äußerer Gehörgang → Trommelfell (gerät in Schwingung) → Hammer → Amboss → Steigbügel → ovales Fenster (Innenohr). Schalldruckerhöhung durch: (1) Verjüngung Trommelfell → ovales Fenster (kleiner → Druckverstärkung), (2) Gehörknöchelchen als Hebelmechanismus.",
        solution: "Das ovale Fenster ist bedeutend kleiner als das Trommelfell. Diese Verjüngung erhöht den Schalldruck. Die Gehörknöchelchen wirken zusätzlich hebelübersetzend."
      },
      water: {
        statement: "Welche Funktionen hat das Mittelohr und welcher Frequenzbereich ist hörbar?",
        answer: "Mittelohrfunktionen: (1) Schallverstärkung, (2) Druckausgleich beiderseits des Trommelfells über die Tuba auditiva (beim Schlucken öffnet sich die Röhre), (3) Schutz des Hörorgans vor starken Schwingungen (Amplitudenverringerung). Hörbarer Bereich: 20–16.000 Hz; Hauptempfindlichkeit: 2000–4000 Hz; Ultraschall: >16.000–18.000 Hz.",
        solution: "Die Tuba auditiva erklärt das 'Druckgefühl' beim Höhenunterschied (Fliegen, Bergfahrt): Schließt sich die Röhre, entsteht Druckungleichgewicht, das Schmerzen verursacht."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1044_01_h1",
        question: "Welche Eigenschaften hat Cerumen (Ohrenschmalz)?",
        options: [
          { text: "Virostatisch, fungizid und bakterizid", correct: true },
          { text: "Analgetisch und entzündungsfördernd", correct: false },
          { text: "Nur schallschluckend, keine antimikrobielle Wirkung", correct: false },
          { text: "Produziert von der Tuba auditiva", correct: false }
        ],
        explanation: "Cerumen (Ohrenschmalz) ist virostatisch, fungizid und bakterizid – es schützt den Gehörgang vor Fremdkörpern und Mikroorganismen. Es wird von Zeruminaldrüsen produziert."
      },
      {
        type: "true_false",
        id: "1044_01_h2",
        statement: "Die drei Gehörknöchelchen sind Hammer, Amboss und Steigbügel.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Die drei Gehörknöchelchen (Malleus, Incus, Stapes) bilden eine Kette: Hammer am Trommelfell – Steigbügel am ovalen Fenster des Innenohrs."
      },
      {
        type: "mc",
        id: "1044_01_h3",
        question: "In welchem Frequenzbereich liegt die höchste Empfindlichkeit des menschlichen Ohres?",
        options: [
          { text: "20–200 Hz", correct: false },
          { text: "2000–4000 Hz", correct: true },
          { text: "8000–12.000 Hz", correct: false },
          { text: "14.000–16.000 Hz", correct: false }
        ],
        explanation: "Das Hauptempfindlichkeitsmaximum liegt zwischen 2000 und 4000 Hz – also genau im Bereich der menschlichen Sprache. Das ist auch der wichtigste Kommunikationsbereich."
      },
      {
        type: "true_false",
        id: "1044_01_h4",
        statement: "Die Tuba auditiva (Eustachische Röhre) verbindet das Mittelohr mit dem Nasen-Rachenraum und ermöglicht Druckausgleich.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Die Tuba auditiva öffnet sich beim Schlucken und gleicht den Luftdruck zwischen Mittelohr und Rachenraum aus."
      },
      {
        type: "mc",
        id: "1044_01_h5",
        question: "Durch welche zwei Mechanismen wird der Schalldruck auf dem Weg ins Innenohr erhöht?",
        options: [
          { text: "Verjüngung (Trommelfell → ovales Fenster) und Hebelmechanismus der Gehörknöchelchen", correct: true },
          { text: "Resonanz der Paukenhöhle und Vibration der Tuba auditiva", correct: false },
          { text: "Cerumenproduktion und Muskelkontraktion im Mittelohr", correct: false },
          { text: "Reflexe des Trommelfells und Kontraktion des Steigbügelmuskels", correct: false }
        ],
        explanation: "Zwei Mechanismen: (1) Das ovale Fenster ist kleiner als das Trommelfell → Druckverstärkung durch Flächenverjüngung. (2) Die Gehörknöchelchenkette wirkt als Hebelübersetzung."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1044_01_p4_1",
        question: "Welche Strukturen gehören zum Mittelohr? (Mehrere Antworten möglich)",
        options: [
          { text: "Paukenhöhle (Cavum tympani)", correct: true },
          { text: "Tuba auditiva (Eustachische Röhre)", correct: true },
          { text: "Gehörknöchelchen (Hammer, Amboss, Steigbügel)", correct: true },
          { text: "Cochlea (Schnecke)", correct: false },
          { text: "Bogengänge", correct: false }
        ],
        explanation: "Cochlea und Bogengänge gehören zum Innenohr, nicht zum Mittelohr."
      },
      {
        type: "mc",
        id: "1044_01_p4_2",
        question: "Welche Aussagen zur Schallweiterleitung sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Schallwellen treffen zuerst auf das Trommelfell", correct: true },
          { text: "Der Hammer ist direkt mit dem Trommelfell verbunden", correct: true },
          { text: "Der Steigbügel grenzt an das ovale Fenster des Innenohrs", correct: true },
          { text: "Das ovale Fenster ist größer als das Trommelfell", correct: false },
          { text: "Die Gehörknöchelchen wirken druckverstärkend (Hebelmechanismus)", correct: true }
        ],
        explanation: "Das ovale Fenster ist kleiner als das Trommelfell – diese Verkleinerung erhöht den Schalldruck. Alle anderen Aussagen sind korrekt."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1044_02",
    title: "Cochlea & Vestibularorgan",
    contextHint: "Kap. 1.3 – Innenohr: Schnecke (Scala vestibuli/media/tympani, Corti-Organ), Gleichgewichtsorgan (Bogengänge, Vorhof, Statolithen)",
    phase1: {
      soil: {
        statement: "Aus welchen drei Gängen besteht die Cochlea (Schnecke) und welche Flüssigkeit enthält jeder?",
        answer: "Die Cochlea besteht aus: (1) Scala vestibuli (Vorhoftreppe): Perilymphe (natriumhaltig). (2) Scala media (Schneckengang): Endolymphe (kaliumhaltig). (3) Scala tympani (Paukentreppe): Perilymphe (natriumhaltig). Scala media wird oben durch Reissner-Membran, unten durch Basilar-Membran begrenzt.",
        solution: "Die unterschiedliche Ionenzusammensetzung (Na⁺ in Perilymphe, K⁺ in Endolymphe) ist entscheidend für die Signaltransduktion im Corti-Organ – ähnlich dem Ruhepotential der Nervenzellen."
      },
      seed: {
        statement: "Was ist das Corti-Organ und wie funktioniert die Schallwahrnehmung?",
        answer: "Das Corti-Organ ist der eigentliche Sitz des Gehörsinns. Es liegt zwischen Basilar- und Tektorial-Membran. Enthält Sinnes-Haarzellen (auf bestimmte Frequenzen abgestimmt). Schallweg: Schalldruck → Endolymphe → Corti-Organ → Basilar- und Tektorial-Membran gegeneinander verschoben → Stimulierung der Haarzellen → mechanische Schwingung → Neurotransmitter → elektrischer Impuls → Hörnerv (N. vestibulocochlearis) → Hirnrinde.",
        solution: "Jede Haarzelle hat eine eigene Nervenfaser. Das verhindert eine Pauschalerregung des Hörnervs – stattdessen werden nur spezifische Frequenzbereiche erregt, was Tonunterscheidung ermöglicht."
      },
      water: {
        statement: "Aus welchen Bestandteilen setzt sich das Vestibularorgan zusammen und welche Bewegungen registriert es?",
        answer: "Vestibularorgan = Gleichgewichtsorgan im Innenohr. Besteht aus: (1) Knöchernem Vorhof mit Utriculus (Macula utriculi) + Sacculus (Macula sacculi): enthält Statolithen (Gleichgewichtssteinchen in Gallertschicht) → registriert Gravitation und Linearbeschleunigung. (2) 3 knöchernen Bogengängen (Canales semiculares, senkrecht aufeinanderstehend): enthält Crista ampullaris → registriert Drehbeschleunigung (Winkelbeschleunigung).",
        solution: "Die drei Bogengänge stehen in allen drei Raumebenen. Dreht man den Kopf, bewegt sich die Endolymphe träge → die Crista ampullaris wird gereizt → Gehirn erkennt Rotationsrichtung und -geschwindigkeit."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1044_02_h1",
        question: "Welche Flüssigkeit füllt den Schneckengang (Scala media) der Cochlea?",
        options: [
          { text: "Perilymphe (natriumhaltig)", correct: false },
          { text: "Endolymphe (kaliumhaltig)", correct: true },
          { text: "Liquor cerebrospinalis", correct: false },
          { text: "Kammerwasser", correct: false }
        ],
        explanation: "Der Schneckengang (Scala media) enthält Endolymphe, die kaliumhaltig ist. Die Vorhoftreppe und Paukentreppe enthalten Perilymphe (natriumhaltig)."
      },
      {
        type: "true_false",
        id: "1044_02_h2",
        statement: "Das Corti-Organ liegt zwischen Basilar-Membran und Tektorial-Membran.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Das Corti-Organ ist zwischen Basilar-Membran (unten) und Tektorial-Membran (oben) eingebettet. Die Verschiebung beider Membranen gegeneinander stimuliert die Haarzellen."
      },
      {
        type: "mc",
        id: "1044_02_h3",
        question: "Was registrieren die Bogengänge des Vestibularorgans?",
        options: [
          { text: "Gravitation und Linearbeschleunigung", correct: false },
          { text: "Drehbeschleunigung (Winkelbeschleunigung)", correct: true },
          { text: "Luftdruckschwankungen", correct: false },
          { text: "Schallfrequenzen über 4000 Hz", correct: false }
        ],
        explanation: "Die 3 Bogengänge registrieren Drehbeschleunigung (Rotation). Gravitation und Linearbeschleunigung werden durch die Maculaorgane (Utriculus/Sacculus) mit ihren Statolithen wahrgenommen."
      },
      {
        type: "true_false",
        id: "1044_02_h4",
        statement: "Die Haarzellen im Corti-Organ sind alle auf dieselbe Schallfrequenz abgestimmt.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Die Haarzellen sind auf ganz bestimmte Frequenzen abgestimmt. Jede Zelle hat eine eigene Nervenfaser, sodass verschiedene Töne differenziert wahrgenommen werden können."
      },
      {
        type: "mc",
        id: "1044_02_h5",
        question: "Welche Struktur nimmt Gravitation und Linearbeschleunigung wahr?",
        options: [
          { text: "Bogengänge", correct: false },
          { text: "Macula-Organe (Utriculus/Sacculus) mit Statolithen", correct: true },
          { text: "Corti-Organ", correct: false },
          { text: "Reissner-Membran", correct: false }
        ],
        explanation: "Die Maculaorgane (Macula utriculi + Macula sacculi) enthalten Statolithen (Gleichgewichtssteinchen), die durch ihre Trägheit bei Bewegung die Sinneshärchen abscheren und so Gravitation/Linearbeschleunigung registrieren."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1044_02_p4_1",
        question: "Welche Aussagen zur Cochlea sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Scala vestibuli enthält Perilymphe", correct: true },
          { text: "Scala media enthält Endolymphe", correct: true },
          { text: "Das Corti-Organ enthält die eigentlichen Schallrezeptoren", correct: true },
          { text: "Scala tympani enthält Endolymphe", correct: false },
          { text: "Das Signal wird über den N. vestibulocochlearis weitergeleitet", correct: true }
        ],
        explanation: "Scala tympani enthält Perilymphe (nicht Endolymphe). Alle anderen Aussagen sind korrekt."
      },
      {
        type: "mc",
        id: "1044_02_p4_2",
        question: "Was gehört zum Vestibularorgan (Gleichgewichtsorgan)? (Mehrere Antworten möglich)",
        options: [
          { text: "3 knöcherne Bogengänge", correct: true },
          { text: "Utriculus mit Statolithen", correct: true },
          { text: "Sacculus mit Statolithen", correct: true },
          { text: "Corti-Organ", correct: false },
          { text: "Crista ampullaris in den Bogengängen", correct: true }
        ],
        explanation: "Das Corti-Organ gehört zur Cochlea (Hörorgan), nicht zum Gleichgewichtsorgan. Alle anderen Strukturen sind Bestandteile des Vestibularorgans."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1044_03",
    title: "Aufbau des Auges",
    contextHint: "Kap. 2 – Augapfel: 3 Augenhäute (Sklera/Cornea, Uvea, Retina); lichtbrechende Organe; Glaukom; Sehnerv",
    phase1: {
      soil: {
        statement: "Aus welchen drei Schichten besteht die Augenwand und was gehört jeweils dazu?",
        answer: "1. Äußere (Tunica fibrosa bulbi): Sklera/Lederhaut (hinten, undurchsichtig, hart, weiß) + Cornea/Hornhaut (vorne, durchsichtig, glasklar, gefäßlos). Schlemm-Kanal am Übergang (Kammerwasserabfluss). 2. Mittlere (Uvea/Gefäßhaut): Chorioidea/Aderhaut (hinten) → Ziliarkörper/Ziliarmuskel → Iris/Regenbogenhaut (mit Pupille in der Mitte). 3. Innere: Retina/Netzhaut (Pars optica hinten + Pars ciliaris vorne).",
        solution: "Merkhilfe Augenhäute von außen nach innen: Sklera (=Lederhaut) → Hornhaut (=vorne), Uvea (= Aderhaut/Ziliarkörper/Iris), Retina (=Netzhaut). Drei Schichten – analog zur Hirnhaut."
      },
      seed: {
        statement: "Was sind die lichtbrechenden Organe des Auges und welche Funktionen haben sie?",
        answer: "Lichtbrechende Organe: Glaskörper (Corpus vitreum, 98–99% Wasser, gallertartig, füllt größten Teil des Augapfels), Linse (Akkommodation = Anpassung an verschiedene Entfernungen durch Krümmungsänderung; gefäßlos), vordere und hintere Augenkammer (mit Kammerwasser, Normaldruck 15–18 mmHg). Ziliardrüse produziert das Kammerwasser.",
        solution: "Die Linse ist die einzige verstellbare Struktur im dioptrischen Apparat. Beim Blick in die Nähe wird sie durch den Ziliarmuskel runder (stärker gekrümmt = mehr Brechkraft)."
      },
      water: {
        statement: "Was ist das Glaukom und wie entsteht es? Was ist der Sehnerv (N. opticus)?",
        answer: "Glaukom (Grüner Star): erhöhter Augeninnendruck durch erschwerten/unmöglichen Abfluss des Kammerwassers (z.B. durch Verklebung der Iris mit der Hornhaut-Rückseite → Schlemm-Kanal verlegt). Leitsymptome: starke Schmerzen, Sehstörungen. Sehnerv (N. opticus): 2. Hirnnerv, ca. 1 Million Nervenfasern, umgeben von 3 Hirnhäuten (Dura mater, Arachnoidea, Pia mater) + Liquor cerebrospinalis. Chiasma opticum = Kreuzungsstelle beider Sehnerven.",
        solution: "Der N. opticus ist entwicklungsgeschichtlich ein Hirnbestandteil (Ausstülpung des Diencephalon). Daher ist er wie das Gehirn von Hirnhäuten umgeben. Das Chiasma opticum liegt im Diencephalon."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1044_03_h1",
        question: "Welche Eigenschaften hat die Hornhaut (Cornea) im Vergleich zur Lederhaut (Sklera)?",
        options: [
          { text: "Undurchsichtig, hart, weiß", correct: false },
          { text: "Durchsichtig, glasklar, gefäßlos", correct: true },
          { text: "Pigmentiert und weich", correct: false },
          { text: "Enthält viele Blutgefäße", correct: false }
        ],
        explanation: "Die Cornea (Hornhaut) ist durchsichtig, glasklar und gefäßlos – Eigenschaften, die für die Lichtdurchlässigkeit notwendig sind. Die Sklera (Lederhaut) ist undurchsichtig, hart und weiß."
      },
      {
        type: "true_false",
        id: "1044_03_h2",
        statement: "Der Schlemm-Kanal dient dem Abfluss des Kammerwassers. Bei Blockierung entsteht ein Glaukom.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Der Schlemm-Kanal liegt am Übergang Lederhaut–Hornhaut. Wird der Abfluss des Kammerwassers behindert, steigt der Augeninnendruck → Glaukom (Grüner Star)."
      },
      {
        type: "mc",
        id: "1044_03_h3",
        question: "Welche Struktur reguliert den Lichteinfall ins Auge?",
        options: [
          { text: "Retina", correct: false },
          { text: "Glaskörper", correct: false },
          { text: "Iris mit Pupille", correct: true },
          { text: "Sehnerv", correct: false }
        ],
        explanation: "Die Iris (Regenbogenhaut) regelt durch Weitung und Engstellung der Pupille den Lichteinfall ins Auge. Der Ziliarmuskel steuert die Akkommodation der Linse."
      },
      {
        type: "true_false",
        id: "1044_03_h4",
        statement: "Das Chiasma opticum ist die Stelle, an der sich die Sehnerven beider Augen kreuzen.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Im Chiasma opticum (im Diencephalon) kreuzen sich Teile der Sehnervfasern beider Augen, was die binokulare Verarbeitung im Gehirn ermöglicht."
      },
      {
        type: "mc",
        id: "1044_03_h5",
        question: "Welche Struktur der mittleren Augenhaut (Uvea) produziert das Kammerwasser?",
        options: [
          { text: "Iris", correct: false },
          { text: "Aderhaut (Chorioidea)", correct: false },
          { text: "Ziliardrüse (Ziliarkörper)", correct: true },
          { text: "Retina (Netzhaut)", correct: false }
        ],
        explanation: "Das Kammerwasser wird von der Ziliardrüse (im Ziliarkörper) produziert und fließt über den Schlemm-Kanal ab. Es versorgt die gefäßlosen Strukturen Linse, Glaskörper und Hornhaut."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1044_03_p4_1",
        question: "Welche Aussagen zur Uvea (mittlere Augenhaut) sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Sie wird auch Gefäßhaut genannt", correct: true },
          { text: "Sie besteht aus Aderhaut, Ziliarkörper und Iris", correct: true },
          { text: "Die Pupille liegt in der Iris", correct: true },
          { text: "Sie ist die innerste Augenhaut", correct: false },
          { text: "Der Ziliarmuskel ermöglicht die Akkommodation", correct: true }
        ],
        explanation: "Die innerste Augenhaut ist die Retina (Netzhaut), nicht die Uvea. Alle anderen Aussagen sind korrekt."
      },
      {
        type: "mc",
        id: "1044_03_p4_2",
        question: "Welche lichtbrechenden Strukturen des Auges sind korrekt benannt? (Mehrere Antworten möglich)",
        options: [
          { text: "Glaskörper (Corpus vitreum): 98–99% Wasser, gallertartig", correct: true },
          { text: "Linse: einzige verstellbare Struktur, ermöglicht Akkommodation", correct: true },
          { text: "Kammerwasser: füllt Augenkammern, Normaldruck 15–18 mmHg", correct: true },
          { text: "Iris: bricht Licht und fokussiert es auf die Netzhaut", correct: false },
          { text: "Ziliardrüse: produziert Kammerwasser", correct: true }
        ],
        explanation: "Die Iris reguliert den Lichteinfall (Pupillenweite), bricht aber kein Licht. Alle anderen Aussagen sind korrekt."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1044_04",
    title: "Sehbahn & Fotorezeption",
    contextHint: "Kap. 2.3-2.4 – Dioptrischer Apparat, Myopie/Hyperopie, Stäbchen/Zapfen, Rhodopsin, Makula/Fovea",
    phase1: {
      soil: {
        statement: "Wie verläuft das Licht durch den dioptrischen Apparat und wo wird das Bild gebildet?",
        answer: "Lichtweg: Cornea → Augenkammer (Kammerwasser) → Iris/Pupille (Lichtmenge) → Linse (Akkommodation) → Glaskörper → Netzhaut (Retina). Das Bild wird auf der Netzhaut verkleinert und höhen- und seitenverkehrt abgebildet. Von dort: N. opticus → Thalamus → Sehrinde im Hinterhauptslappen.",
        solution: "Das Gehirn 'dreht' das umgekehrte Netzhautbild in die richtige Lage um. Die Linse ist die einzige verstellbare Struktur (durch Krümmungsänderung via Ziliarmuskel)."
      },
      seed: {
        statement: "Was ist Myopie, was ist Hyperopie – wie entstehen sie und wie werden sie korrigiert?",
        answer: "Myopie (Kurzsichtigkeit): Bild wird vor der Netzhaut vereinigt (verlängerter Augapfel). Entfernte Objekte unscharf. Korrektur: konkave (zerstreuende) Brillengläser. Hyperopie (Weitsichtigkeit): Bild wird hinter der Netzhaut vereinigt (verkürzter Augapfel). Nahe Objekte unscharf. Korrektur: konvexe (sammelnde) Brillengläser.",
        solution: "Merkhilfe: Myopie = Kürzel: 'My → zu Viel Auge' (zu lang) → Zerstreuungslinse (konkav). Hyperopie = 'zu wenig Auge' (zu kurz) → Sammellinse (konvex)."
      },
      water: {
        statement: "Was unterscheidet Stäbchen und Zapfen und welche Rolle spielt Rhodopsin?",
        answer: "Stäbchen (ca. 120 Mio.): Hell-Dunkel-Wahrnehmung, Dämmerungssehen. Enthalten Rhodopsin (Sehpurpur = Retinal + Opsin). Bei Belichtung → Zerfall des Rhodopsins → Aktionspotential. Rhodopsin wird in der Leber synthetisiert. Vitamin-A-Mangel → schlechteres Dämmerungssehen bis temporäre Blindheit. Zapfen (ca. 6 Mio.): Farbsehen (3 Typen: Blau/Rot/Grün), scharfes Sehen. Gelber Fleck (Makula lutea): nur Zapfen. Fovea centralis = Stelle des schärfsten Sehens. Blinder Fleck (Sehnervenpapille): keine Rezeptoren.",
        solution: "Merkhilfe: Stäbchen = sensitiv für Schatten (Nacht), Zapfen = bunt (Tag). Das Sehspektrum reicht von 400 nm (Blau) bis 760 nm (Rot)."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1044_04_h1",
        question: "Was ist Myopie und wie wird sie korrigiert?",
        options: [
          { text: "Weitsichtigkeit, korrigiert durch konvexe Gläser", correct: false },
          { text: "Kurzsichtigkeit, korrigiert durch konkave Gläser", correct: true },
          { text: "Kurzsichtigkeit, korrigiert durch konvexe Gläser", correct: false },
          { text: "Weitsichtigkeit, korrigiert durch konkave Gläser", correct: false }
        ],
        explanation: "Myopie = Kurzsichtigkeit. Das Bild wird vor der Netzhaut vereinigt (verlängerter Augapfel). Korrektur durch konkave (zerstreuende) Linsen."
      },
      {
        type: "true_false",
        id: "1044_04_h2",
        statement: "Stäbchen sind für das Hell-Dunkel-Sehen zuständig und enthalten den Sehfarbstoff Rhodopsin.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Die Stäbchen enthalten Rhodopsin (= Retinal + Opsin), das bei Belichtung zerfällt und ein Aktionspotential auslöst. Bei Vitamin-A-Mangel leidet das Dämmerungssehen."
      },
      {
        type: "mc",
        id: "1044_04_h3",
        question: "Was ist die Fovea centralis?",
        options: [
          { text: "Die Eintrittsstelle des Sehnervs ohne Rezeptoren", correct: false },
          { text: "Der Blinde Fleck der Netzhaut", correct: false },
          { text: "Die Stelle des schärfsten Sehens innerhalb der Makula lutea", correct: true },
          { text: "Ein Bereich mit ausschließlich Stäbchen", correct: false }
        ],
        explanation: "Die Fovea centralis liegt innerhalb der Makula lutea (Gelber Fleck) und enthält ausschließlich Zapfen. Sie ist die Stelle des schärfsten Sehens."
      },
      {
        type: "true_false",
        id: "1044_04_h4",
        statement: "Rhodopsin wird im Auge selbst produziert.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Rhodopsin wird in der Leber synthetisiert, von dort mit dem Blut transportiert und von den Stäbchen aufgenommen. Vitamin A (bzw. Betacarotin) ist die Vorstufe des Retinals."
      },
      {
        type: "mc",
        id: "1044_04_h5",
        question: "Welcher Bereich des Sehspektrums ist für den Menschen sichtbar?",
        options: [
          { text: "100–300 nm (UV-Bereich)", correct: false },
          { text: "400–760 nm (Blau bis Rot)", correct: true },
          { text: "800–1200 nm (Infrarot)", correct: false },
          { text: "1000–3000 nm (Wärmestrahlung)", correct: false }
        ],
        explanation: "Das menschliche Sehspektrum liegt zwischen 400 nm (Blau, kurzwellig) und 760 nm (Rot, langwellig). Darunter liegt UV, darüber Infrarot – beides für das Auge unsichtbar."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1044_04_p4_1",
        question: "Welche Aussagen zu Stäbchen und Zapfen sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Stäbchen: ca. 120 Mio., Hell-Dunkel-Sehen, Rhodopsin", correct: true },
          { text: "Zapfen: ca. 6 Mio., Farbsehen, 3 Typen (Blau/Rot/Grün)", correct: true },
          { text: "Makula lutea enthält nur Zapfen (keine Stäbchen)", correct: true },
          { text: "Blinder Fleck enthält besonders viele Zapfen", correct: false },
          { text: "Vitamin-A-Mangel beeinträchtigt das Dämmerungssehen", correct: true }
        ],
        explanation: "Der Blinde Fleck (Sehnervenpapille) enthält gar keine Rezeptoren – weder Stäbchen noch Zapfen. Alle anderen Aussagen sind korrekt."
      },
      {
        type: "mc",
        id: "1044_04_p4_2",
        question: "Welche Aussagen zum dioptrischen Apparat/Sehfehler sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Myopie: Bild vor der Netzhaut, verlängerter Augapfel", correct: true },
          { text: "Hyperopie: Bild hinter der Netzhaut, verkürzter Augapfel", correct: true },
          { text: "Myopie wird mit konvexen Gläsern korrigiert", correct: false },
          { text: "Hyperopie wird mit konvexen (sammelnden) Gläsern korrigiert", correct: true },
          { text: "Das Netzhautbild ist verkleinert, höhen- und seitenverkehrt", correct: true }
        ],
        explanation: "Myopie wird mit konkaven (zerstreuenden) Gläsern korrigiert, nicht mit konvexen. Alle anderen Aussagen sind korrekt."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1044_05",
    title: "Geruchsorgan & Haut (Epidermis)",
    contextHint: "Kap. 3-4.1 – Geruchsorgan: Regio olfactoria, N. olfactorius, Riechhirn; Epidermis: 4 Schichten, Langerhans-Zellen, Melanozyten",
    phase1: {
      soil: {
        statement: "Wo liegt das Riechepithel, wie werden Gerüche weitergeleitet und wo werden sie verarbeitet?",
        answer: "Riechschleimhaut (Regio olfactoria) in der oberen Nasenmuschel und am oberen Nasenseptum, ca. 500 mm². Enthält Sinnesepithel (keine Flimmerrepithel!), Becherzellen und Stützzellen. Geruchsweg: gasförmige Moleküle → Riechzellen (5–12 Qualitäten) → Nervenfortsätze → N. olfactorius (1. Hirnnerv) → Riechkolben (Bulbus olfactorius) → Rhinencephalon (Riechhirn) → limbisches System (Geruchserinnerungen, emotionale Verknüpfung).",
        solution: "Der N. olfactorius ist der einzige Hirnnerv, der direkt ins limbische System projiziert (ohne Thalamus-Umschaltung). Daher lösen Gerüche so direkt emotionale Erinnerungen aus."
      },
      seed: {
        statement: "Wie ist die Epidermis (Oberhaut) von außen nach innen aufgebaut?",
        answer: "Von außen nach innen: (1) Stratum corneum (Hornschicht): verhornte Zellen, Selbstreinigung (Abschuppen). (2) Stratum lucidum (Glanzschicht): zellkernfrei, nur an dicken Stellen (Handflächen, Fußsohlen). (3) Stratum granulosum (Körnerzellschicht): Keratozyten mit Keratohyalin, ölähnliche Substanz. (4) Stratum germinativum (Keimschicht/Regenerationsschicht): Stratum spinosum (Stachelzellschicht, Langerhans-Zellen = Phagozytose) + Stratum basale (Basalzellschicht, Melanozyten = Melanin/Hautfarbe, Merkel-Tastscheiben). Hauterneuerung alle 28–30 Tage.",
        solution: "Merkhilfe: 'Corneum → Lucidum → Granulosum → Germinativum'. Nur das Germinativum enthält Stammzellen (mitotisch aktiv). Die Epidermis enthält keine Blutgefäße – Ernährung durch Diffusion aus dem Corium."
      },
      water: {
        statement: "Was sind Langerhans-Zellen und Merkel-Tastscheiben und wo befinden sie sich?",
        answer: "Langerhans-Zellen: im Stratum spinosum (Stachelzellschicht). Dendritische Zellen, gehören zur Körperabwehr (Phagozytose von Antigenen, Antigenpräsentation → Teil des Immunsystems). Merkel-Tastscheiben: im Stratum basale (Basalzellschicht). Mechanosensoren für Druck und Vibration – besonders dicht in den Fingerspitzen.",
        solution: "Die Haut ist nicht nur Schutzbarriere, sondern auch Teil des Immunsystems (Langerhans-Zellen) und des Nervensystems (Merkel-Scheiben). Melanozyten im Stratum basale produzieren Melanin → Hautfarbe, UV-Schutz."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1044_05_h1",
        question: "Welcher Hirnnerv leitet den Geruch weiter?",
        options: [
          { text: "N. opticus (II)", correct: false },
          { text: "N. trigeminus (V)", correct: false },
          { text: "N. olfactorius (I)", correct: true },
          { text: "N. vagus (X)", correct: false }
        ],
        explanation: "Der N. olfactorius (1. Hirnnerv) leitet Geruchssignale vom Riechepithel über den Riechkolben zum Rhinencephalon (Riechhirn) und limbischen System weiter."
      },
      {
        type: "true_false",
        id: "1044_05_h2",
        statement: "Das Stratum lucidum ist nur an dicken Hautstellen (Handflächen, Fußsohlen) vorhanden.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Das Stratum lucidum (Glanzschicht) schützt gegen mechanische Beanspruchung und ist nur an besonders beanspruchten Körperstellen ausgeprägt."
      },
      {
        type: "mc",
        id: "1044_05_h3",
        question: "In welcher Epidermisschicht befinden sich Melanozyten?",
        options: [
          { text: "Stratum corneum", correct: false },
          { text: "Stratum granulosum", correct: false },
          { text: "Stratum basale", correct: true },
          { text: "Stratum lucidum", correct: false }
        ],
        explanation: "Melanozyten liegen im Stratum basale (Basalzellschicht). Sie produzieren Melanin, das die Hautfarbe bestimmt und UV-Schutz bietet."
      },
      {
        type: "true_false",
        id: "1044_05_h4",
        statement: "Langerhans-Zellen sind Immunzellen der Haut und befinden sich im Stratum spinosum.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Langerhans-Zellen sind dendritische Zellen im Stratum spinosum, die Antigene phagozytieren und dem Immunsystem präsentieren."
      },
      {
        type: "mc",
        id: "1044_05_h5",
        question: "Wie oft erneuert sich die Epidermis vollständig?",
        options: [
          { text: "Alle 7 Tage", correct: false },
          { text: "Alle 28–30 Tage", correct: true },
          { text: "Alle 6 Monate", correct: false },
          { text: "Alle 3 Jahre", correct: false }
        ],
        explanation: "Die Epidermis erneuert sich vollständig alle 28–30 Tage. Neue Zellen entstehen im Stratum germinativum und wandern nach oben, bis sie als Hornschuppen abschilfern."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1044_05_p4_1",
        question: "Welche Schichten gehören zum Stratum germinativum? (Mehrere Antworten möglich)",
        options: [
          { text: "Stratum spinosum (Stachelzellschicht)", correct: true },
          { text: "Stratum basale (Basalzellschicht)", correct: true },
          { text: "Stratum corneum (Hornschicht)", correct: false },
          { text: "Langerhans-Zellen befinden sich im Stratum spinosum", correct: true },
          { text: "Melanozyten befinden sich im Stratum basale", correct: true }
        ],
        explanation: "Das Stratum corneum ist die äußerste Schicht und nicht Teil des Stratum germinativum (Keimschicht). Alle anderen Aussagen sind korrekt."
      },
      {
        type: "mc",
        id: "1044_05_p4_2",
        question: "Welche Aussagen zum Geruchsorgan sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Regio olfactoria befindet sich in der oberen Nasenmuschel", correct: true },
          { text: "Riechzellen können 5–12 Geruchsqualitäten aufnehmen", correct: true },
          { text: "Geruchssignale werden direkt ins limbische System weitergeleitet", correct: true },
          { text: "Der Riechbereich ist von Flimmerepithel ausgekleidet", correct: false },
          { text: "N. olfactorius ist der 1. Hirnnerv", correct: true }
        ],
        explanation: "Der Riechbereich ist der einzige Nasenbereich, der NICHT von Flimmerepithel ausgekleidet ist – stattdessen Sinnesepithel. Alle anderen Aussagen sind korrekt."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1044_06",
    title: "Corium, Subcutis & Mechanorezeptoren",
    contextHint: "Kap. 4.1-4.3 – Lederhaut/Unterhaut, Hautanhangsgebilde, Sinnesrezeptoren: Merkel, Meissner, Vater-Pacini, Ruffini, Thermorezeptoren",
    phase1: {
      soil: {
        statement: "Aus welchen Schichten besteht die Lederhaut (Corium) und was enthält die Subcutis?",
        answer: "Corium/Dermis (Lederhaut): bindegewebiges Geflecht, elastische Fasern, reich an Blut- und Lymphgefäßen. Zwei Anteile: Stratum papillare (Papillarschicht, Schutz vor mechanischer Beanspruchung) + Stratum reticulare (Geflechtschicht, Elastizität und Festigkeit). Ruffini-Körperchen im Stratum reticulare (Dehnungswahrnehmung). Subcutis (Unterhaut): Fetteinlagerungen (Bau- und Depotfett), Blutgefäße, Nervengeflecht (freie Nervenendigungen = Nozizeptoren/Schmerz), Vater-Pacini-Lamellenkörperchen (Druck, Tiefensensibilität, Vibration).",
        solution: "Merkhilfe: Epidermis = keine Blutgefäße. Corium = Blutgefäße vorhanden (ernährt Epidermis per Diffusion). Subcutis = Fettdepot + Druckrezeptoren (Vater-Pacini)."
      },
      seed: {
        statement: "Welche Hautrezeptoren nehmen welche Reize wahr und wo liegen sie?",
        answer: "Merkel-Tastscheiben (Stratum basale): Druck/Vibration. Meissner-Tastkörperchen (Dermis/Papillen): Druckrezeptoren. Krause-Endkolben (Dermis): Druck. Thermorezeptoren (Dermis): Wärme und Kälte. Nozizeptoren/Schmerzrezeptoren (Dermis, freie Nervenendigungen): Schmerz → Weiterleitung ans ZNS. Vater-Pacini-Lamellenkörperchen (Subcutis): Tiefensensibilität, Vibration. Ruffini-Körperchen (Corium, Stratum reticulare): Dehnungsempfindung.",
        solution: "Merkhilfe: Vater-Pacini = tief (Subcutis) = Druck von tief. Ruffini = Dehnung (Stratum reticulare). Merkel = Berührung fein (Stratum basale). Die Fingerbeere ist besonders reich an Merkel-Scheiben."
      },
      water: {
        statement: "Welche Hautanhangsgebilde gibt es und welche Funktion haben Schweißdrüsen und Talgdrüsen?",
        answer: "Hautanhangsgebilde: Haare (Pili), Talgdrüsen, Hautdrüsen (Schweiß-/Duftdrüsen), Nägel. Talgdrüsen (Glandulae sebaceae): am Haarbalg, ölige Substanz → Schutz vor Austrocknung. Schweißdrüsen (Glandulae sudoriferae): Temperaturregulation durch Verdunstungskälte; Säureschutzmantel (schützt Haut vor Mikroorganismen); Zusammensetzung: 99% Wasser + Kochsalz, Ammoniak, Harnstoff, Harnsäure, Kreatinin, Antikörper. Duftdrüsen (apocrinae): Pheromone, charakteristischer Geruch, Sekretion durch Sexualhormone beeinflusst.",
        solution: "Der Säureschutzmantel des Schweißes ist besonders in den Achseln ausgeprägt. Talgdrüsen produzieren Sebum: zu wenig → Austrocknung, zu viel → Akne (verstopfte Haarfollikel)."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1044_06_h1",
        question: "Welche Rezeptoren der Haut nehmen Tiefensensibilität und Vibration wahr?",
        options: [
          { text: "Ruffini-Körperchen", correct: false },
          { text: "Vater-Pacini-Lamellenkörperchen", correct: true },
          { text: "Merkel-Tastscheiben", correct: false },
          { text: "Krause-Endkolben", correct: false }
        ],
        explanation: "Vater-Pacini-Lamellenkörperchen in der Subcutis nehmen Tiefensensibilität und Vibration wahr. Ruffini-Körperchen registrieren Dehnung, Merkel-Tastscheiben feine Berührung/Druck."
      },
      {
        type: "true_false",
        id: "1044_06_h2",
        statement: "Die Epidermis enthält keine Blutgefäße und wird durch Diffusion aus dem Corium ernährt.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Die Epidermis ist gefäßfrei. Nährstoffe diffundieren aus den Blutgefäßen des Coriums in die Epidermis. Das erklärt, warum oberflächliche Hautschnitte kaum bluten."
      },
      {
        type: "mc",
        id: "1044_06_h3",
        question: "Welche Funktion haben Duftdrüsen (Glandulae sudoriferae apocrinae)?",
        options: [
          { text: "Temperaturregulation durch Schweißverdunstung", correct: false },
          { text: "Produktion von Pheromonen (charakteristischer Geruch)", correct: true },
          { text: "Produktion des Säureschutzmantels", correct: false },
          { text: "Talgsynthese zum Schutz der Haare", correct: false }
        ],
        explanation: "Duftdrüsen (apocrinae) produzieren Pheromone, die den charakteristischen Eigengeruch eines Menschen ausmachen. Ihre Sekretion wird durch Sexualhormone beeinflusst."
      },
      {
        type: "true_false",
        id: "1044_06_h4",
        statement: "Ruffini-Körperchen befinden sich in der Subcutis und registrieren Vibrationsreize.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Ruffini-Körperchen liegen im Corium (Stratum reticulare) und registrieren Dehnung. Vibration/Tiefensensibilität werden durch Vater-Pacini-Lamellenkörperchen in der Subcutis wahrgenommen."
      },
      {
        type: "mc",
        id: "1044_06_h5",
        question: "Womit wird die Haut vor Austrocknung geschützt?",
        options: [
          { text: "Merkel-Tastscheiben", correct: false },
          { text: "Talgdrüsen (Glandulae sebaceae)", correct: true },
          { text: "Vater-Pacini-Körperchen", correct: false },
          { text: "Langerhans-Zellen", correct: false }
        ],
        explanation: "Talgdrüsen (Glandulae sebaceae) sezernieren eine ölige Substanz (Sebum), die Haut und Haare mit einem dünnen Fettfilm überziehen und so vor Austrocknung schützen."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1044_06_p4_1",
        question: "Welche Hautrezeptoren und ihre Orte sind korrekt zugeordnet? (Mehrere Antworten möglich)",
        options: [
          { text: "Merkel-Tastscheiben – Stratum basale – Druck/Vibration", correct: true },
          { text: "Vater-Pacini – Subcutis – Tiefensensibilität/Vibration", correct: true },
          { text: "Ruffini-Körperchen – Corium (Stratum reticulare) – Dehnung", correct: true },
          { text: "Nozizeptoren – Epidermis – Schmerz", correct: false },
          { text: "Thermorezeptoren – Dermis – Warm-/Kaltwahrnehmung", correct: true }
        ],
        explanation: "Nozizeptoren (Schmerzrezeptoren) sind freie Nervenendigungen in der Dermis, nicht in der Epidermis. Alle anderen Zuordnungen sind korrekt."
      },
      {
        type: "mc",
        id: "1044_06_p4_2",
        question: "Welche Aussagen zu Schweißdrüsen sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Dienen der Temperaturregulation durch Verdunstungskälte", correct: true },
          { text: "Bilden den Säureschutzmantel der Haut", correct: true },
          { text: "Zusammensetzung: 99% Wasser + Elektrolyte + Harnstoff + Antikörper", correct: true },
          { text: "Sekretion wird durch somatisches Nervensystem gesteuert", correct: false },
          { text: "Schützen vor Mikroorganismen", correct: true }
        ],
        explanation: "Die Schweißdrüsensekretion wird durch das vegetative (autonome) Nervensystem gesteuert, nicht durch das somatische. Alle anderen Aussagen sind korrekt."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1044_07",
    title: "Altern & Geriatrische Syndrome",
    contextHint: "Teil II Kap. 1-2.1 – Alterstheorien, biographisches/biologisches Alter, geriatrische Syndrome ('geriatrische I's')",
    phase1: {
      soil: {
        statement: "Welche vier Eigenschaften charakterisieren Alterungsprozesse und welche Theorien gibt es?",
        answer: "Alterungsprozesse sind: (1) universal (alle Lebewesen), (2) irreversibel (unumkehrbar), (3) schädlich (verminderte Anpassungsfähigkeit), (4) biologisch-genetisch vorherbestimmt (nicht durch Schonung vermeidbar). Theorien: Somatische Mutationstheorie (enzymatische Fehlfunktionen), Genregulationstheorie (verschiedene Gene für Lebensphasen aktiviert), Telomeren-Theorie (Telomere verkürzen sich bei Zellteilung), Theorie der freien Radikale (oxidativer Stress durch endogene/exogene Radikal-Quellen).",
        solution: "Die Telomeren-Theorie ist modern und gut belegt: Telomere schützen die Chromosomenenden. Bei jeder Zellteilung werden sie kürzer – bis die Zelle ihre Funktion nicht mehr erfüllen kann."
      },
      seed: {
        statement: "Was ist der Unterschied zwischen biographischem und biologischem Alter?",
        answer: "Biographisches Alter: zeitlich messbares Alter (Geburtsdatum). Biologisches Alter: Zustand des Körpers, Gesundheitsstand und Belastbarkeit – nur schätzbar (Leistungstests). Zwei Menschen gleichen Geburtsjahres können biologisch sehr unterschiedlich alt sein (Lebensstil, Lebensereignisse). Plus: soziales Alter (wie Alter in der Gesellschaft erlebt wird – abhängig von Familie, sozialem Umfeld, Wohnverhältnissen).",
        solution: "Beispiel: Ein 82-Jähriger mit biologischem Alter von 72 Jahren ist fitter als ein gleichaltriger 82-Jähriger mit biologischem Alter von 90 Jahren. Das biographische Alter allein sagt wenig über den Gesundheitszustand."
      },
      water: {
        statement: "Was sind die vier großen geriatrischen Syndrome ('geriatrische I's') und welche weiteren gibt es?",
        answer: "Die vier großen geriatrischen I's: (1) Instabilität (mangelnde strukturelle/funktionelle Belastbarkeit). (2) Immobilität (Unfähigkeit zur Bewegung, organisch oder durch Immobilisierung). (3) Intellektueller Abbau (physiologisch und pathologisch bedingte ZNS-Veränderungen). (4) Inkontinenz (Harn-, Stuhl- und Affektinkontinenz). Weitere: Isolation, Inappetenz, Insomnia, Iatrogenie (arztbedingte Erkrankungen), Colon irritabile, Impaired eyes and ears (Seh-/Hörstörungen), Impecunity (Altersarmut). Typisch: Syndromvernetzung.",
        solution: "Geriatrische Syndrome beeinflussen sich gegenseitig: z.B. Immobilität → Isolation → Inappetenz → Instabilität. Der Arzt muss das Gesamtbild sehen."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1044_07_h1",
        question: "Was besagt die Telomeren-Theorie des Alterns?",
        options: [
          { text: "Freie Radikale zerstören DNA und führen zum Altern", correct: false },
          { text: "Enzymatische Fehlfunktionen verringern die Zellebenszeit", correct: false },
          { text: "Telomere verkürzen sich bei jeder Zellteilung, bis Zellen ihre Funktion verlieren", correct: true },
          { text: "Verschiedene Gene sind in verschiedenen Lebensphasen aktiv", correct: false }
        ],
        explanation: "Die Telomeren-Theorie: Telomere schützen die Chromosomenenden. Bei jeder Zellteilung verkürzen sie sich. Sind sie zu kurz, können keine wichtigen Gene mehr korrekt abgelesen werden."
      },
      {
        type: "true_false",
        id: "1044_07_h2",
        statement: "Das biologische Alter entspricht immer dem biographischen Alter (Geburtsdatum).",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Das biologische Alter beschreibt den aktuellen Gesundheitszustand und kann vom biographischen Alter erheblich abweichen – je nach Lebensstil, Erkrankungen und genetischen Faktoren."
      },
      {
        type: "mc",
        id: "1044_07_h3",
        question: "Was versteht man unter 'Iatrogenie' als geriatrischem Syndrom?",
        options: [
          { text: "Schlafstörungen im Alter", correct: false },
          { text: "Altersbedingte Harninkontinenz", correct: false },
          { text: "Durch ärztliche Maßnahmen verursachte Krankheitsbilder", correct: true },
          { text: "Vereinsamung im Alter", correct: false }
        ],
        explanation: "Iatrogenie = durch ärztliche Maßnahmen verursachte Erkrankungen, z.B. iatrogene Infektionen oder unerwünschte Arzneimittelwirkungen (Nebenwirkungen) bei Älteren."
      },
      {
        type: "true_false",
        id: "1044_07_h4",
        statement: "Die vier großen geriatrischen Syndrome sind: Instabilität, Immobilität, Intellektueller Abbau und Inkontinenz.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Diese vier 'geriatrischen I's' sind die wichtigsten Syndrome. Daneben gibt es weitere wie Isolation, Inappetenz, Insomnia, Iatrogenie, Colon irritabile, Impaired eyes and ears, Impecunity."
      },
      {
        type: "mc",
        id: "1044_07_h5",
        question: "Was kennzeichnet oxidativen Stress gemäß der Theorie der freien Radikale?",
        options: [
          { text: "Zu viele Antioxidantien → Zellschäden", correct: false },
          { text: "Zu viele freie Radikale, zu wenig Antioxidantien → Schädigung von Proteinen, Lipiden, DNA", correct: true },
          { text: "Telomerverlust durch UV-Strahlung", correct: false },
          { text: "Enzymatische Fehlfunktionen durch Genmutation", correct: false }
        ],
        explanation: "Oxidativer Stress: zu viele freie Radikale (z.B. Sauerstoffradikale) bei zu wenig Antioxidantien (Vitamin C, E, Beta-Karotin) → Schäden an Proteinen, Lipiden und DNA → Altern."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1044_07_p4_1",
        question: "Welche Eigenschaften charakterisieren Alterungsprozesse? (Mehrere Antworten möglich)",
        options: [
          { text: "Universal (gilt für alle höheren Lebewesen)", correct: true },
          { text: "Irreversibel (unumkehrbar)", correct: true },
          { text: "Schädlich (verminderte Anpassungsfähigkeit)", correct: true },
          { text: "Biologisch-genetisch vorherbestimmt", correct: true },
          { text: "Durch lebenslange Schonung vollständig vermeidbar", correct: false }
        ],
        explanation: "Altern ist nicht zu verhindern, nur zu beeinflussen. Schonung kann es nicht vollständig aufhalten – es ist biologisch-genetisch vorherbestimmt."
      },
      {
        type: "mc",
        id: "1044_07_p4_2",
        question: "Welche der folgenden gehören zu den geriatrischen Syndromen? (Mehrere Antworten möglich)",
        options: [
          { text: "Instabilität", correct: true },
          { text: "Insomnia (Schlafstörung)", correct: true },
          { text: "Inappetenz (fehlender Appetit)", correct: true },
          { text: "Impecunity (Altersarmut)", correct: true },
          { text: "Arteriosklerose", correct: false }
        ],
        explanation: "Arteriosklerose ist eine Erkrankung, aber kein geriatrisches Syndrom im engeren Sinne. Alle anderen sind geriatrische Syndrome ('geriatrische I's')."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1044_08",
    title: "Altersveränderungen der Organe & Geriatrie-Pharmakologie",
    contextHint: "Kap. 2.2-3 – Altersveränderungen Herz/Lunge/Knochen/Niere/Sinnesorgane/ZNS; Demenz (Alzheimer, Multiinfarkt); Pharmakokinetik im Alter",
    phase1: {
      soil: {
        statement: "Welche wichtigen Altersveränderungen betreffen Herz-Kreislauf, Knochen/Muskeln und Niere?",
        answer: "Herz-Kreislauf: Arteriosklerose → Blutdruck↑, orthostatische Dysregulation (Blutdruckabfall beim Aufstehen), Schlagvolumen↓, Herzminutenvolumen↓, Linkshypertrophie ab 70. LJ. Knochen: Osteoporose (Mineralverlust, Frauen nach Wechseljahren stärker). Muskulatur: ↓0,5%/Jahr, besonders Dorsalflexoren der Füße → Stolpern. Stürze: jeder 3. über 65-Jährige stürzt mindestens 1×/Jahr → Komplikationen: Dekubitus, Thrombosen, Pneumonie. Niere: Nierenkörperchen ↓35%, GFR bei 80-Jährigen = 50% → Medikamentendosierung anpassen! Durst↓ → Exsikkosegefahr → Verwirrtheit.",
        solution: "Wichtige Praxisregel: Ältere Menschen empfinden Durst schwächer → auf ausreichende Trinkmenge achten (1,5–2 L täglich). Ausnahme: Herzinsuffizienz/Niereninsuffizienz (Trinkmengenbeschränkung)."
      },
      seed: {
        statement: "Was sind die zwei häufigsten Demenzformen und welche Symptome zeigt eine Demenz?",
        answer: "Demenz (60% Alzheimer, 20% Multiinfarkt): Alzheimer-Demenz: Frauen häufiger, genetisch/Stoffwechsel, Amyloidablagerungen, Hirnatrophie, Hohlräume. Multiinfarkt-Demenz: Männer häufiger, vaskulär, Arteriosklerose. Symptome: Gedächtnnis↓ (v.a. Kurzzeitgedächtnis), Konzentration↓, Orientierungsstörungen (räumlich/zeitlich), Persönlichkeitsveränderungen (Wutausbrüche, Feindseligkeit), Stimmung (Interesselosigkeit, Angst, Apathie), Verhalten (Reizbarkeit, Aggression), körperlich (Inkontinenz im Endstadium). Drei Stadien: leicht → mittelgradig → schwer.",
        solution: "Abgrenzung: Akute Verwirrtheit (Delir) = reversibel, Ursachen: Hyponatriämie, niedriger Blutdruck, Infekte, Medikamente. Demenz = chronisch, fortschreitend, irreversibel."
      },
      water: {
        statement: "Warum muss die Pharmakotherapie im Alter angepasst werden?",
        answer: "Veränderte Pharmakokinetik: Resorption↓ (Darmfunktion), Transport verändert (weniger Albumine → mehr freies Medikament → Wirkungsverstärkung), Verteilung verändert (mehr Körperfett → fettlösliche Medikamente länger wirksam; weniger Körperwasser → wasserlösliche konzentrierter). Ausscheidung↓ (Leber- und Nierenfunktion↓) → Akkumulation → Vergiftung. Paradoxe Reaktionen möglich (z.B. Schlafmittel → Erregung statt Schlaf). Gefahr: Hypoglykämie bei Blutzuckertabletten, Sturzgefahr durch Kreislaufmedikamente.",
        solution: "Grundregel Geriatrie: 'Start low, go slow' – niedrige Startdosis, langsam steigern. Niereninsuffizienz macht viele renale Ausscheidung nötig machende Medikamente gefährlicher."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1044_08_h1",
        question: "Was ist Presbyakusis?",
        options: [
          { text: "Altersweitsichtigkeit (Linsenversteifung)", correct: false },
          { text: "Altersbedingte Schwerhörigkeit, v.a. hohe Frequenzen", correct: true },
          { text: "Schwindel durch Gleichgewichtsstörungen im Alter", correct: false },
          { text: "Altersbedingte Verwirrtheit", correct: false }
        ],
        explanation: "Presbyakusis = Altersschwerhörigkeit. Betrifft vor allem den oberen Frequenzbereich (>4000 Hz). Ab 30. Lebensjahr sinkt das Hörvermögen ca. 10 dB je 10 Jahre."
      },
      {
        type: "true_false",
        id: "1044_08_h2",
        statement: "Die glomeruläre Filtrationsrate (GFR) bei einem 80-Jährigen beträgt nur noch etwa 50% eines 20-Jährigen.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Die Nierenfunktion nimmt mit dem Alter deutlich ab. Die GFR bei 80-Jährigen beträgt etwa die Hälfte der eines 20-Jährigen – daher müssen renal ausgeschiedene Medikamente niedriger dosiert werden."
      },
      {
        type: "mc",
        id: "1044_08_h3",
        question: "Welche Demenzform ist in 60% der Fälle die Ursache und wen trifft sie häufiger?",
        options: [
          { text: "Multiinfarkt-Demenz, häufiger Männer", correct: false },
          { text: "Alzheimer-Demenz, häufiger Frauen", correct: true },
          { text: "Alzheimer-Demenz, häufiger Männer", correct: false },
          { text: "Multiinfarkt-Demenz, häufiger Frauen", correct: false }
        ],
        explanation: "Die Alzheimer-Demenz macht ca. 60% aller Demenzen aus und betrifft Frauen häufiger. Die Multiinfarkt-Demenz (20%) betrifft eher Männer durch vaskuläre/arteriosklerotische Ursachen."
      },
      {
        type: "true_false",
        id: "1044_08_h4",
        statement: "Akute Verwirrtheit bei älteren Menschen ist immer ein Zeichen einer beginnenden Demenz.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Akute Verwirrtheit (Delir) ist häufig reversibel und hat behandelbare Ursachen: Hyponatriämie, Sauerstoffmangel (TIA), Infekte, Medikamente, Flüssigkeitsmangel. Sie muss von einer Demenz abgegrenzt werden."
      },
      {
        type: "mc",
        id: "1044_08_h5",
        question: "Warum kann ein Schlafmittel bei älteren Menschen paradox wirken (= Erregung statt Schlaf)?",
        options: [
          { text: "Weil ältere Menschen mehr Albumin haben", correct: false },
          { text: "Weil sich das Rezeptorengefüge des Gehirns im Alter verändert", correct: true },
          { text: "Weil Schlafmittel im Alter schneller ausgeschieden werden", correct: false },
          { text: "Weil die Leber im Alter Schlafmittel schneller metabolisiert", correct: false }
        ],
        explanation: "Paradoxe Medikamentenwirkungen im Alter werden vor allem durch Veränderungen im Rezeptorengefüge des Gehirns erklärt. Auch die veränderte Pharmakokinetik (Verteilung, Ausscheidung) spielt eine Rolle."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1044_08_p4_1",
        question: "Welche Altersveränderungen der Sinnesorgane sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Presbyopie = Altersweitsichtigkeit ab ca. 50. LJ", correct: true },
          { text: "Presbyakusis = Altersschwerhörigkeit v.a. hoher Frequenzen", correct: true },
          { text: "Bis zum 70. LJ verliert man ca. 2/3 der Geschmacksknospen", correct: true },
          { text: "Durstempfindung nimmt im Alter zu", correct: false },
          { text: "Häufige Augenkrankheiten im Alter: Katarakt, Glaukom, Makuladegeneration", correct: true }
        ],
        explanation: "Durstempfindung nimmt im Alter ab (nicht zu) → Exsikkose-/Verwirrtheitsgefahr. Alle anderen Aussagen sind korrekt."
      },
      {
        type: "mc",
        id: "1044_08_p4_2",
        question: "Was verändert sich an der Pharmakokinetik im Alter? (Mehrere Antworten möglich)",
        options: [
          { text: "Weniger Albumine → mehr freies (wirksames) Medikament im Blut", correct: true },
          { text: "Nierenfunktion↓ → verringerte Ausscheidung → Akkumulationsgefahr", correct: true },
          { text: "Mehr Körperfett → fettlösliche Medikamente länger wirksam", correct: true },
          { text: "Leberfunktion↑ → schnellerer Medikamentenabbau", correct: false },
          { text: "Paradoxe Reaktionen durch verändertes Rezeptorengefüge möglich", correct: true }
        ],
        explanation: "Die Leberfunktion nimmt im Alter ab (nicht zu) → verlangsamter Abbau vieler Medikamente. Alle anderen Aussagen sind korrekt."
      }
    ]
  })
];

if (typeof module !== "undefined") module.exports = SINNESORGANE_GERIATRIE_1044_PLANTS;
