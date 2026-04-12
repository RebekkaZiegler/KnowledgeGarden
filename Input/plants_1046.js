const NATURHEILVERFAHREN2_1046_PLANTS = [
  makeDetailedPlant({
    id: "1046_01",
    title: "Hydrotherapie nach Kneipp",
    contextHint: "Kap. 1 – Hydrotherapie: Kneipp-Güsse, Wickel, Kräuterbäder; Wirkfaktoren Reizfläche/Intensität/Dauer/Temperaturdifferenz",
    phase1: {
      soil: {
        statement: "Von welchen vier Faktoren hängt die Wirkung einer hydrotherapeutischen Anwendung ab?",
        answer: "1. Reizfläche (Körperareal), 2. Reizintensität (Temperaturhöhe), 3. Reizdauer (Anwendungszeit), 4. Temperaturdifferenz (Unterschied zwischen Anwendung und Körpertemperatur). Je größer die Differenz, desto stärker die Reaktion.",
        solution: "Diese vier Parameter bestimmen zusammen den physiologischen Reiz. Kurze Kälteanwendung → Vasodilatation nach initialer Konstriktion; länger dauernde Kälte → anhaltende Vasokonstriktion."
      },
      seed: {
        statement: "Wie wirken kalte und warme Wickel und bei welchen Indikationen werden sie eingesetzt?",
        answer: "Kalte Wickel: kühlend, entzündungshemmend → bei Fieber, Entzündungen, Prellungen, Verstauchungen. Heiße Wickel: wärmend, muskelentspannend, durchblutungsfördernd → bei Gelenkrheumatismus, Koliken, Muskelverspannungen.",
        solution: "Das Prinzip: Kälte zieht Wärme ab (antiphlogistisch), Wärme fördert die Durchblutung und entspannt Muskulatur und glatte Muskulatur der Eingeweide."
      },
      water: {
        statement: "Welche Wirkung haben Kneipp-Güsse und was unterscheidet sie von einem normalen kalten Duschen?",
        answer: "Kneipp-Güsse sind tonisierend, stoffwechselanregend und kreislaufstabilisierend. Wasser wird fächerartig (kein Strahl) in aufsteigender Richtung über die Extremitäten geführt. Temperatur kalt (15–18 °C). Nach der Anwendung warm werden/bewegen.",
        solution: "Der flächige Wasserlauf reizt die Hautrezeptoren gezielt, ohne Schockwirkung. Die Reflexantwort steigert den Kreislauftonus und regt die Thermoregulation an."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1046_01_h1",
        question: "Welcher Faktor gehört NICHT zu den vier Wirkfaktoren einer hydrotherapeutischen Anwendung?",
        options: [
          { text: "Reizfläche", correct: false },
          { text: "Reizintensität", correct: false },
          { text: "Reizfrequenz (Wiederholungen pro Woche)", correct: true },
          { text: "Reizdauer", correct: false }
        ],
        explanation: "Die vier Wirkfaktoren sind: Reizfläche, Reizintensität, Reizdauer und Temperaturdifferenz. Die wöchentliche Anwendungsfrequenz gehört nicht dazu."
      },
      {
        type: "true_false",
        id: "1046_01_h2",
        statement: "Kalte Wickel werden bei Fieber, Entzündungen und Prellungen eingesetzt.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Kalte Wickel leiten Wärme ab und wirken antiphlogistisch – daher geeignet bei Fieber, Entzündungen und akuten Verletzungen."
      },
      {
        type: "mc",
        id: "1046_01_h3",
        question: "Bei welcher Indikation werden heiße Wickel verwendet?",
        options: [
          { text: "Fieber", correct: false },
          { text: "Prellungen", correct: false },
          { text: "Gelenkrheumatismus und Koliken", correct: true },
          { text: "Akute Entzündungen", correct: false }
        ],
        explanation: "Heiße Wickel wirken wärmend und muskelentspannend, daher sind sie bei chronischen Gelenkentzündungen (Rheumatismus) und Koliken (Krampfzuständen) indiziert."
      },
      {
        type: "true_false",
        id: "1046_01_h4",
        statement: "Kneipp-Güsse werden als harter Wasserstrahl direkt auf die Haut gerichtet.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Kneipp-Güsse werden fächerartig (kein harter Strahl) in aufsteigender Richtung über die Extremitäten geführt – schonender Flächenreiz, kein Schockstrahl."
      },
      {
        type: "mc",
        id: "1046_01_h5",
        question: "Welche Wirkung hat längere Kälteanwendung auf die Blutgefäße?",
        options: [
          { text: "Dauerhafte Vasodilatation", correct: false },
          { text: "Anhaltende Vasokonstriktion", correct: true },
          { text: "Keine Wirkung auf die Gefäße", correct: false },
          { text: "Zuerst Dilatation, dann Konstriktion", correct: false }
        ],
        explanation: "Länger andauernde Kälte führt zu anhaltender Vasokonstriktion. Kurze Kälteanwendung hingegen führt nach initialer Konstriktion zur reaktiven Vasodilatation."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1046_01_p4_1",
        question: "Welche Aussagen zur Hydrotherapie nach Kneipp treffen zu? (Mehrere Antworten möglich)",
        options: [
          { text: "Reizfläche beeinflusst die Wirkstärke", correct: true },
          { text: "Kneipp-Güsse wirken tonisierend und stoffwechselanregend", correct: true },
          { text: "Kalte Wickel werden bei Gelenkrheumatismus eingesetzt", correct: false },
          { text: "Temperaturdifferenz ist ein Wirkfaktor", correct: true },
          { text: "Nach Kneipp-Güssen sollte man sich warm halten oder bewegen", correct: true }
        ],
        explanation: "Kalte Wickel gehören zu den Indikationen Fieber/Entzündungen/Prellungen, nicht Gelenkrheumatismus (dafür heiße Wickel)."
      },
      {
        type: "mc",
        id: "1046_01_p4_2",
        question: "Welche Indikationen sprechen für heiße Wickel? (Mehrere Antworten möglich)",
        options: [
          { text: "Gelenkrheumatismus", correct: true },
          { text: "Koliken", correct: true },
          { text: "Muskelverspannungen", correct: true },
          { text: "Akute Prellungen", correct: false },
          { text: "Hohes Fieber", correct: false }
        ],
        explanation: "Akute Prellungen und Fieber werden mit Kälte behandelt. Heiße Wickel sind bei chronisch-muskulären und krampfartigen Beschwerden indiziert."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1046_02",
    title: "Biomolekulare Therapie & Ozontherapie",
    contextHint: "Kap. 2-3 – Biomolekulare Therapie: VitOrgan, Thymusfaktoren; Ozontherapie: O₃, Eigenblutbehandlung, Kontraindikationen",
    phase1: {
      soil: {
        statement: "Was ist das Prinzip der biomolekularen Therapie und welche Substanzen werden eingesetzt?",
        answer: "Zelldefekte werden durch Zufuhr von Zellkomponenten aus gesunden Tierzellen (VitOrgan-Präparate) ausgeglichen. Wirkt organspezifisch nach homöopathischem Prinzip. Thymusfaktoren dienen als Immunstimulanz und unterstützen das Immunsystem.",
        solution: "Die Therapie beruht auf der Idee, dass erkrankte Zellen fehlende Bausteine aus gleichartigen gesunden Zellen aufnehmen können. Organspezifität: Leber-Extrakt für Lebererkrankungen usw."
      },
      seed: {
        statement: "Was ist Ozon chemisch und welche biologischen Wirkungen hat es therapeutisch?",
        answer: "Ozon = O₃ (dreiatomiger Sauerstoff). Therapeutische Wirkungen: bakterizid, viruzid, entzündungshemmend, durchblutungsfördernd, immunstimulierend, analgetisch.",
        solution: "Durch die Abgabe eines Sauerstoffatoms entsteht aktiver Sauerstoff (O₂ + O), der Mikroorganismen oxidativ abtötet und den Zellstoffwechsel aktiviert."
      },
      water: {
        statement: "Welche Anwendungsformen der Ozontherapie gibt es und was ist in Deutschland verboten?",
        answer: "Anwendungen: (1) Große Eigenblutbehandlung: 50–100 ml Blut entnehmen, ozonieren, reinfundieren. (2) Kleine Eigenblutbehandlung: 1–5 ml Blut i.m. oder s.c. reinjizieren. (3) Begasung von Hautarealen (offen/unter Folie). (4) Rektale Begasung mit 50–100 ml Ozon/O₂-Gemisch. Die direkte intravenöse Ozonzufuhr ist in Deutschland verboten (Emboliegefahr).",
        solution: "Die i.v. Gabe ist wegen der Gefahr einer tödlichen Gasembolie verboten. Alle anderen Anwendungsformen sind in der Naturheilpraxis möglich."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1046_02_h1",
        question: "Welche chemische Formel hat Ozon?",
        options: [
          { text: "O₂", correct: false },
          { text: "O₃", correct: true },
          { text: "H₂O₂", correct: false },
          { text: "CO₂", correct: false }
        ],
        explanation: "Ozon ist dreiatomiger Sauerstoff (O₃). Er ist instabil und gibt leicht ein Sauerstoffatom ab, was die starke oxidierende Wirkung erklärt."
      },
      {
        type: "true_false",
        id: "1046_02_h2",
        statement: "Die intravenöse Ozonzufuhr ist in Deutschland aus Sicherheitsgründen verboten.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Die direkte i.v.-Gabe von Ozon ist in Deutschland verboten, da sie eine tödliche Gasembolie verursachen kann."
      },
      {
        type: "mc",
        id: "1046_02_h3",
        question: "Wie viel Eigenblut wird bei der großen Eigenblutbehandlung mit Ozon entnommen?",
        options: [
          { text: "1–5 ml", correct: false },
          { text: "10–20 ml", correct: false },
          { text: "50–100 ml", correct: true },
          { text: "200–500 ml", correct: false }
        ],
        explanation: "Bei der großen Eigenblutbehandlung werden 50–100 ml Blut entnommen, mit Ozon/Sauerstoff angereichert und als Infusion zurückgegeben. Die kleine Variante verwendet nur 1–5 ml."
      },
      {
        type: "true_false",
        id: "1046_02_h4",
        statement: "Biomolekulare Therapie wirkt organspezifisch nach homöopathischem Prinzip.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. VitOrgan-Präparate aus gleichartigen Zellen werden organspezifisch eingesetzt und folgen dem homöopathischen Prinzip (Ähnliches mit Ähnlichem behandeln)."
      },
      {
        type: "mc",
        id: "1046_02_h5",
        question: "Welche Kontraindikation gilt für die Ozontherapie?",
        options: [
          { text: "Arthrose", correct: false },
          { text: "Blutgerinnungsstörungen", correct: true },
          { text: "Chronische Wunden", correct: false },
          { text: "Immunschwäche", correct: false }
        ],
        explanation: "Kontraindikationen der Ozontherapie: Blutgerinnungsstörungen, Anämie, Schilddrüsenüberfunktion, Kinder, Schwangerschaft – da Ozon oxidativen Stress erzeugt."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1046_02_p4_1",
        question: "Welche Kontraindikationen gelten für die Ozontherapie? (Mehrere Antworten möglich)",
        options: [
          { text: "Blutgerinnungsstörungen", correct: true },
          { text: "Anämie", correct: true },
          { text: "Schilddrüsenüberfunktion", correct: true },
          { text: "Schwangerschaft", correct: true },
          { text: "Chronische Gelenkerkrankungen", correct: false }
        ],
        explanation: "Chronische Gelenkerkrankungen (z.B. Arthrose) sind eher eine Indikation für Ozontherapie. Die vier genannten Kontraindikationen (+ Kinder) sind klar definiert."
      },
      {
        type: "mc",
        id: "1046_02_p4_2",
        question: "Welche Anwendungsformen der Ozontherapie sind in Deutschland erlaubt? (Mehrere Antworten möglich)",
        options: [
          { text: "Große Eigenblutbehandlung (i.v. Reinfusion)", correct: true },
          { text: "Kleine Eigenblutbehandlung (i.m./s.c.)", correct: true },
          { text: "Begasung von Hautarealen", correct: true },
          { text: "Direkte intravenöse Ozonzufuhr", correct: false },
          { text: "Rektale Begasung", correct: true }
        ],
        explanation: "Die direkte i.v.-Ozonzufuhr (ohne Blut als Träger) ist in Deutschland verboten. Alle anderen genannten Formen sind erlaubt und gebräuchlich."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1046_03",
    title: "Magnetfeld- und Lasertherapie",
    contextHint: "Kap. 4 – Magnetfeldtherapie: Pole, Indikationen; Lasertherapie: LASER-Akronym, Eigenschaften, Wirkungen",
    phase1: {
      soil: {
        statement: "Wie wirken Nordpol und Südpol bei der Magnetfeldtherapie und welche Indikationen gibt es?",
        answer: "Nordpol: aktivierend, durchblutungsfördernd. Südpol: beruhigend, entzündungshemmend, schmerzlindernd. Indikationen: Schmerzzustände, Wundheilungsstörungen, Neuralgien, Herz-Kreislauf-Erkrankungen, Stoffwechselstörungen. Wirkung: stabilisiert Membranpotential, fördert Durchblutung.",
        solution: "Die Polarität des Magneten bestimmt die Wirkungsrichtung. In der Praxis wird der Südpol häufiger bei Entzündungen eingesetzt, der Nordpol zur Aktivierung."
      },
      seed: {
        statement: "Wofür steht das Akronym LASER und welche besonderen Eigenschaften hat Laserlicht?",
        answer: "LASER = Light Amplification by Stimulated Emission of Radiation. Eigenschaften: (1) Monochromasie (eine Wellenlänge), (2) Kohärenz (Wellen in Phase), (3) geringe Divergenz (paralleles Licht, kaum Streuung). Dadurch hohe Energiedichte auf kleiner Fläche.",
        solution: "Diese drei Eigenschaften unterscheiden Laserlicht von normalem Licht. Monochromatisch und kohärent bedeutet: alle Photonen gleicher Wellenlänge schwingen synchron."
      },
      water: {
        statement: "Welche biologischen Wirkungen hat die Lasertherapie im therapeutischen Einsatz?",
        answer: "Lasertherapie steigert ATP-Synthese und Zellstoffwechsel, fördert Eiweißsynthese und Bildung kollagener Fasern, stimuliert das Immunsystem, wirkt analgetisch und entzündungshemmend, beschleunigt Wundheilung.",
        solution: "Der Laser regt Mitochondrien zur verstärkten ATP-Produktion an (Photobiomodulation). Dies stimuliert Zellproliferation und Gewebereparatur."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1046_03_h1",
        question: "Welche Wirkung hat der Südpol eines Magneten in der Magnetfeldtherapie?",
        options: [
          { text: "Aktivierend und durchblutungsfördernd", correct: false },
          { text: "Beruhigend und entzündungshemmend", correct: true },
          { text: "Fiebersenkend und schweißtreibend", correct: false },
          { text: "Tonisierend und stoffwechselanregend", correct: false }
        ],
        explanation: "Der Südpol wirkt beruhigend, entzündungshemmend und schmerzlindernd. Der Nordpol wirkt aktivierend und durchblutungsfördernd."
      },
      {
        type: "true_false",
        id: "1046_03_h2",
        statement: "LASER steht für Light Amplification by Stimulated Emission of Radiation.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Das Akronym LASER beschreibt das physikalische Prinzip: Lichtverstärkung durch stimulierte Emission von Strahlung."
      },
      {
        type: "mc",
        id: "1046_03_h3",
        question: "Was ist Monochromasie als Eigenschaft von Laserlicht?",
        options: [
          { text: "Laserlicht breitet sich kugelförmig aus", correct: false },
          { text: "Laserlicht hat nur eine einzige Wellenlänge", correct: true },
          { text: "Laserlicht enthält alle Farben des Spektrums", correct: false },
          { text: "Laserlicht kann nicht reflektiert werden", correct: false }
        ],
        explanation: "Monochromasie bedeutet: Laserlicht besteht aus einer einzigen Wellenlänge (Farbe). Dies unterscheidet es von weißem Licht, das alle Wellenlängen enthält."
      },
      {
        type: "true_false",
        id: "1046_03_h4",
        statement: "Lasertherapie steigert die ATP-Synthese in den Mitochondrien.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Die Photobiomodulation durch Laser regt Mitochondrien zur verstärkten ATP-Produktion an, was Zellstoffwechsel und Heilungsprozesse fördern."
      },
      {
        type: "mc",
        id: "1046_03_h5",
        question: "Welche Indikation ist für die Magnetfeldtherapie angegeben?",
        options: [
          { text: "Akute Infektionskrankheiten", correct: false },
          { text: "Wundheilungsstörungen", correct: true },
          { text: "Maligne Tumoren", correct: false },
          { text: "Schwangerschaft", correct: false }
        ],
        explanation: "Wundheilungsstörungen gehören zu den Indikationen der Magnetfeldtherapie. Maligne Tumoren und Schwangerschaft sind Kontraindikationen."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1046_03_p4_1",
        question: "Welche Eigenschaften hat Laserlicht? (Mehrere Antworten möglich)",
        options: [
          { text: "Monochromasie (eine Wellenlänge)", correct: true },
          { text: "Kohärenz (Wellen in Phase)", correct: true },
          { text: "Geringe Divergenz (paralleles Licht)", correct: true },
          { text: "Hohe Divergenz (breite Streuung)", correct: false },
          { text: "Polychromatisch (alle Wellenlängen)", correct: false }
        ],
        explanation: "Laserlicht ist monochromatisch, kohärent und divergenzarm. Diese drei Eigenschaften ermöglichen die hohe Energiedichte auf kleiner Fläche."
      },
      {
        type: "mc",
        id: "1046_03_p4_2",
        question: "Welche biologischen Wirkungen hat die Lasertherapie? (Mehrere Antworten möglich)",
        options: [
          { text: "Steigerung der ATP-Synthese", correct: true },
          { text: "Förderung der Eiweißsynthese", correct: true },
          { text: "Bildung kollagener Fasern", correct: true },
          { text: "Immunstimulation", correct: true },
          { text: "Hemmung der Wundheilung", correct: false }
        ],
        explanation: "Lasertherapie fördert die Wundheilung (nicht hemmt sie). Alle anderen Punkte sind korrekte biologische Wirkungen der Photobiomodulation."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1046_04",
    title: "Eigenharntherapie & Farbtherapie",
    contextHint: "Kap. 5-6 – Eigenharn: Reiztherapie, Morgenurin, Indikationen; Farbtherapie: Chakren, Wirkung der Farben",
    phase1: {
      soil: {
        statement: "Was ist das Prinzip der Eigenharntherapie und wie wird sie angewendet?",
        answer: "Eigenharntherapie ist eine Reiztherapie: körpereigener Urin wird als Antigen-Informationsträger genutzt. Anwendung: Injektion von 2 ml Morgenurin (steril, 2× pro Woche) i.m. oder s.c., alternativ äußerlich (Einreiben). Morgenurin bevorzugt, da konzentrierter.",
        solution: "Die körpereigenen Stoffe im Urin (Antigene, Hormone, Metaboliten) sollen das Immunsystem regulierend reizen. Typische Indikationen: Hauterkrankungen, Arthrosen."
      },
      seed: {
        statement: "Welche therapeutischen Eigenschaften werden Rot, Grün und Blau in der Farbtherapie zugeschrieben?",
        answer: "Rot: wärmend, Durchblutung↑, aktivierend – bei Kreislaufschwäche, Ischias, Asthma (vorsichtig dosieren!). Grün: ausgleichend, entspannend, reguliert Atem- und Herzfrequenz – bei Bluthochdruck, Asthma, Infektionen. Blau: kühlend, beruhigend, entzündungshemmend – bei Entzündungen, Angst, Schlaflosigkeit, Fieber.",
        solution: "Die Farben wirken über die Augen und Haut auf das Nervensystem. Rot stimuliert, Grün balanciert, Blau dämpft – entsprechend der Wellenlänge (warm → kalt)."
      },
      water: {
        statement: "Welche Wirkungen werden Orange, Gelb und Violett in der Farbtherapie zugeordnet?",
        answer: "Orange: erheiternd, Appetit↑, positive Stimmung – bei Leber, Anämie, Verstopfung, Depression. Gelb: Verstand, Wachheit, verdauungsfördernd – bei Leber, Knochen, Immunschwäche. Violett: Heilung, Ausgeglichenheit – bei Unruhe, Entzündungen seröser Häute.",
        solution: "In der Farbtherapie werden Farben den Chakren (Energiezentren) zugeordnet. Die warmen Töne (Orange/Gelb) stimulieren, Violett harmonisiert auf höchstem Energieniveau."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1046_04_h1",
        question: "Wie viel Eigenurin wird bei der Eigenharntherapie injiziert?",
        options: [
          { text: "0,5 ml täglich", correct: false },
          { text: "2 ml, 2× pro Woche", correct: true },
          { text: "10 ml, 1× pro Woche", correct: false },
          { text: "5 ml, täglich", correct: false }
        ],
        explanation: "Die Standarddosierung der Eigenharntherapie beträgt 2 ml Morgenurin, 2× pro Woche, i.m. oder s.c. injiziert."
      },
      {
        type: "true_false",
        id: "1046_04_h2",
        statement: "In der Farbtherapie wird Rot vorsichtig eingesetzt, da es stark stimulierend wirkt.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Rot ist wärmend und stark aktivierend (Durchblutung↑). Deshalb muss die Dosierung vorsichtig erfolgen, besonders bei sensiblen Patienten."
      },
      {
        type: "mc",
        id: "1046_04_h3",
        question: "Welche Farbe wird in der Farbtherapie bei Entzündungen, Schlaflosigkeit und Angst eingesetzt?",
        options: [
          { text: "Rot", correct: false },
          { text: "Gelb", correct: false },
          { text: "Orange", correct: false },
          { text: "Blau", correct: true }
        ],
        explanation: "Blau wirkt kühlend und beruhigend. Es hemmt Entzündungen und dämpft Erregungszustände – daher indiziert bei Entzündungen, Angst, Fieber und Schlaflosigkeit."
      },
      {
        type: "true_false",
        id: "1046_04_h4",
        statement: "Für die Eigenharntherapie wird Abendurin bevorzugt, da er die meisten Inhaltsstoffe enthält.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Es wird Morgenurin verwendet, da er konzentrierter ist und das längste Nüchternintervall repräsentiert – optimale Antigenkonzentration."
      },
      {
        type: "mc",
        id: "1046_04_h5",
        question: "Welche Farbe wird in der Farbtherapie mit Verdauung, Wachheit und Verstand assoziiert?",
        options: [
          { text: "Violett", correct: false },
          { text: "Grün", correct: false },
          { text: "Gelb", correct: true },
          { text: "Orange", correct: false }
        ],
        explanation: "Gelb steht für Verstand, Wachheit und Verdauungsfunktionen. Indikationen: Leber, Knochen, Immunschwäche."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1046_04_p4_1",
        question: "Welche Aussagen zur Eigenharntherapie sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Es handelt sich um eine Reiztherapie", correct: true },
          { text: "Bevorzugt wird Morgenurin verwendet", correct: true },
          { text: "Indiziert bei Hauterkrankungen und Arthrosen", correct: true },
          { text: "Anwendung: 10 ml täglich i.v.", correct: false },
          { text: "Alternativ äußerliche Anwendung (Einreiben) möglich", correct: true }
        ],
        explanation: "Die i.v.-Anwendung und die Tagesdosis von 10 ml sind falsch. Standard: 2 ml Morgenurin, 2× pro Woche, i.m./s.c. oder äußerlich."
      },
      {
        type: "mc",
        id: "1046_04_p4_2",
        question: "Welche Farbzuordnungen sind in der Farbtherapie korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Rot – wärmend, Durchblutungsfördernd", correct: true },
          { text: "Blau – kühlend, beruhigend", correct: true },
          { text: "Grün – ausgleichend, Herzfrequenz regulierend", correct: true },
          { text: "Orange – hemmend, appetitmindernd", correct: false },
          { text: "Violett – Heilung, Ausgeglichenheit", correct: true }
        ],
        explanation: "Orange ist erheiternd und appetitfördernd (nicht hemmend). Alle anderen Zuordnungen sind korrekt."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1046_05",
    title: "Hautreizverfahren",
    contextHint: "Kap. 7 – Canthariden-Pflaster (spanische Fliege), Baunscheidt-Verfahren (Stichelgerät, Öl, Indikationen)",
    phase1: {
      soil: {
        statement: "Was ist das Canthariden-Pflaster, aus welcher Substanz wird es gewonnen und wann wird es entfernt?",
        answer: "Das Canthariden-Pflaster wird aus der spanischen Fliege (Cantharis vesicatoria) gewonnen. Es erzeugt eine Blase auf der Haut (Blasenpflaster). Indikationen: Gelenkerkrankungen. Pflaster wird nach 18–20 Stunden entfernt, bevor die Blase platzt.",
        solution: "Cantharidin (der Wirkstoff) reizt die Haut stark und erzeugt eine Blase. Das Ableiten von Lymphflüssigkeit soll den Entzündungsprozess im Gelenk entlasten – Ableitungstherapie."
      },
      seed: {
        statement: "Wie funktioniert das Baunscheidt-Verfahren und welche Substanzen werden dabei verwendet?",
        answer: "Das Baunscheidt-Verfahren nutzt ein Stichelgerät (Nadelrad, mehrere Nadeln) zur Hautperforation. Anschließend Einreiben mit Baunscheidt-Öl (aus Senföl + Cantharidin). Wirkt als Ableitungsverfahren und Reflextherapie. Indikationen: Rheuma, Wirbelsäulenerkrankungen, Bronchitis.",
        solution: "Die Hautstiche fördern die lokale Durchblutung und Lymphdrainage. Das Öl reizt zusätzlich. Über Reflexbögen (Dermatome) sollen tiefer liegende Organe beeinflusst werden."
      },
      water: {
        statement: "Welche Nebenwirkung und welches verbotene Mittel sind beim Baunscheidt-Verfahren zu beachten?",
        answer: "Nebenwirkung: Pigmentveränderungen der Haut können bis zu 3 Jahre anhalten. Wichtig: Krotonöl (früher im Baunscheidt-Öl enthalten) ist heute verboten, da es stark hautreizend/kanzerogen ist.",
        solution: "Patienten müssen über die mögliche Hyperpigmentierung aufgeklärt werden. Krotonöl wurde früher mit Senföl kombiniert, ist aber aufgrund seiner Gefährlichkeit nicht mehr zulässig."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1046_05_h1",
        question: "Aus welchem Organismus wird der Wirkstoff des Canthariden-Pflasters gewonnen?",
        options: [
          { text: "Biene", correct: false },
          { text: "Spinne", correct: false },
          { text: "Spanische Fliege", correct: true },
          { text: "Blutegel", correct: false }
        ],
        explanation: "Cantharidin wird aus der spanischen Fliege (Cantharis vesicatoria) gewonnen. Es ist ein starkes Hautreizmittel, das eine Blase erzeugt."
      },
      {
        type: "true_false",
        id: "1046_05_h2",
        statement: "Das Canthariden-Pflaster wird nach 18–20 Stunden entfernt, bevor die Blase platzt.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Die Entfernung nach 18–20 Stunden verhindert, dass die Blase platzt und es zu Superinfektionen oder tieferen Gewebeschäden kommt."
      },
      {
        type: "mc",
        id: "1046_05_h3",
        question: "Welche Substanz ist im Baunscheidt-Öl enthalten und heute verboten?",
        options: [
          { text: "Cantharidin", correct: false },
          { text: "Menthol", correct: false },
          { text: "Krotonöl", correct: true },
          { text: "Teebaumöl", correct: false }
        ],
        explanation: "Krotonöl war früher Bestandteil des Baunscheidt-Öls, ist aber heute wegen seiner stark hautreizenden und kanzerogenen Eigenschaften verboten."
      },
      {
        type: "true_false",
        id: "1046_05_h4",
        statement: "Pigmentveränderungen nach dem Baunscheidt-Verfahren können bis zu 3 Jahre anhalten.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Die Hautstiche und die Öl-Einreibung können zu Hyperpigmentierungen führen, die lange bestehen bleiben. Patienten müssen hierüber aufgeklärt werden."
      },
      {
        type: "mc",
        id: "1046_05_h5",
        question: "Bei welchen Indikationen wird das Baunscheidt-Verfahren eingesetzt?",
        options: [
          { text: "Fieber und akute Infektionen", correct: false },
          { text: "Rheuma, Wirbelsäule, Bronchitis", correct: true },
          { text: "Blutgerinnungsstörungen", correct: false },
          { text: "Schilddrüsenerkrankungen", correct: false }
        ],
        explanation: "Das Baunscheidt-Verfahren wird als Ableitungstherapie bei Rheuma, Wirbelsäulenerkrankungen und Bronchitis eingesetzt."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1046_05_p4_1",
        question: "Welche Aussagen zum Canthariden-Pflaster sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Wirkstoff aus der spanischen Fliege", correct: true },
          { text: "Erzeugt eine Blase auf der Haut", correct: true },
          { text: "Indiziert bei Gelenkerkrankungen", correct: true },
          { text: "Muss nach 6–8 Stunden entfernt werden", correct: false },
          { text: "Wird nach 18–20 Stunden entfernt", correct: true }
        ],
        explanation: "Das Pflaster wird nach 18–20 Stunden entfernt (nicht nach 6–8 Stunden), um ein Platzen der Blase zu verhindern."
      },
      {
        type: "mc",
        id: "1046_05_p4_2",
        question: "Welche Aussagen zum Baunscheidt-Verfahren sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Verwendet ein Stichelgerät (Nadelrad)", correct: true },
          { text: "Baunscheidt-Öl enthält Senföl und Cantharidin", correct: true },
          { text: "Krotonöl ist heute verboten", correct: true },
          { text: "Pigmentveränderungen können bis 3 Jahre anhalten", correct: true },
          { text: "Indiziert bei akuten Infektionskrankheiten", correct: false }
        ],
        explanation: "Akute Infektionskrankheiten sind keine Indikation für das Baunscheidt-Verfahren. Alle anderen Aussagen sind korrekt."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1046_06",
    title: "Blutegeltherapie",
    contextHint: "Kap. 8 – Hirudo medicinalis, Hirudin, Wirkungen, Indikationen, Kontraindikationen, Entsorgung",
    phase1: {
      soil: {
        statement: "Was ist Hirudin und welche therapeutischen Wirkungen hat die Blutegeltherapie?",
        answer: "Hirudin ist ein Polypeptid im Speichel des medizinischen Blutegels (Hirudo medicinalis), das die Blutgerinnung hemmt (Thrombinhemmer). Wirkungen: gerinnungshemmend, lymphstrombeschleunigend, entzündungswidrig, antithrombotisch, immunstimulierend, analgetisch.",
        solution: "Der Egel injiziert beim Saugen verschiedene bioaktive Substanzen, darunter Hirudin (Antikoagulans), Hyaluronidase (Gewebedurchdringung) und andere analgetische Stoffe."
      },
      seed: {
        statement: "Welche Indikationen und Kontraindikationen gibt es für die Blutegeltherapie?",
        answer: "Indikationen: Thrombophlebitis, Arthrose (v.a. Gonarthrose), Hämatome, Gicht, Glaukom. Kontraindikationen: Blutgerinnungsstörungen/Einnahme von Gerinnungshemmern, Anämie, Hirudinallergie. Nie bei Patienten mit stark kompromittiertem Immunsystem.",
        solution: "Der Egel verringert Schwellung und Entzündung durch mechanische Blutentnahme + bioaktive Substanzen. KI: Alle Zustände, bei denen weitere Blutungsneigung oder Infektion gefährlich wäre."
      },
      water: {
        statement: "Wie lange saugen Blutegel und wie werden sie nach der Therapie entsorgt?",
        answer: "Ein Egel saugt 10–40 Minuten und nimmt dabei ca. 10 ml Blut auf. Die Nachblutung aus der Bissstelle beträgt weitere 10–40 ml in den nächsten 24 Stunden. Entsorgung: hochprozentiger Alkohol oder Einfrieren bei -18 °C. Nie mit Gewalt abreißen!",
        solution: "Das Abreißen würde die Wunde aufreißen und zu Nachblutungen führen. Die Nachblutung ist therapeutisch erwünscht (Fortsetzung des Drainageeffekts). Egel werden als Sondermüll entsorgt."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1046_06_h1",
        question: "Was ist Hirudin und welche Wirkung hat es?",
        options: [
          { text: "Ein Enzym, das Blut verflüssigt", correct: false },
          { text: "Ein Polypeptid, das die Blutgerinnung hemmt", correct: true },
          { text: "Ein Antibiotikum im Egelspeichel", correct: false },
          { text: "Ein Schmerzmittel aus dem Egelspeichel", correct: false }
        ],
        explanation: "Hirudin ist ein Polypeptid (Thrombinhemmer) im Speichel des Blutegels. Es hemmt spezifisch Thrombin und verhindert so die Blutgerinnung."
      },
      {
        type: "true_false",
        id: "1046_06_h2",
        statement: "Bluteger dürfen bei Patienten mit Blutgerinnungsstörungen eingesetzt werden.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Blutgerinnungsstörungen sind eine Kontraindikation der Blutegeltherapie. Die gerinnungshemmende Wirkung des Hirudins würde die Störung verstärken."
      },
      {
        type: "mc",
        id: "1046_06_h3",
        question: "Wie viel Blut nimmt ein einzelner Blutegel beim Saugen auf?",
        options: [
          { text: "1–2 ml", correct: false },
          { text: "Ca. 10 ml", correct: true },
          { text: "50–100 ml", correct: false },
          { text: "Ca. 200 ml", correct: false }
        ],
        explanation: "Ein Blutegel saugt ca. 10 ml Blut in 10–40 Minuten. Die Nachblutung aus der Wunde beträgt weitere 10–40 ml in den folgenden 24 Stunden."
      },
      {
        type: "true_false",
        id: "1046_06_h4",
        statement: "Blutegel dürfen nach der Behandlung mit hochprozentigem Alkohol oder durch Einfrieren bei -18 °C entsorgt werden.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Medizinische Blutegel sind nach Gebrauch als Sondermüll zu behandeln. Erlaubte Methoden: hochprozentiger Alkohol oder Einfrieren bei -18 °C."
      },
      {
        type: "mc",
        id: "1046_06_h5",
        question: "Welche Indikation ist für die Blutegeltherapie besonders bekannt?",
        options: [
          { text: "Schilddrüsenüberfunktion", correct: false },
          { text: "Gonarthrose (Kniegelenksarthrose)", correct: true },
          { text: "Bluthochdruck", correct: false },
          { text: "Diabetes mellitus", correct: false }
        ],
        explanation: "Die Gonarthrose (Kniegelenksarthrose) ist eine der wichtigsten Indikationen der Blutegeltherapie – mit guter Evidenz für Schmerzreduktion und Entzündungshemmung."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1046_06_p4_1",
        question: "Welche Wirkungen hat die Blutegeltherapie? (Mehrere Antworten möglich)",
        options: [
          { text: "Gerinnungshemmend (Hirudin)", correct: true },
          { text: "Lymphstrombeschleunigend", correct: true },
          { text: "Entzündungswidrig", correct: true },
          { text: "Blutdrucksenkend (direkt)", correct: false },
          { text: "Immunstimulierend", correct: true }
        ],
        explanation: "Die direkte Blutdrucksenkung ist keine primäre Wirkung der Blutegeltherapie. Alle anderen genannten Wirkungen sind belegt."
      },
      {
        type: "mc",
        id: "1046_06_p4_2",
        question: "Welche Kontraindikationen gelten für die Blutegeltherapie? (Mehrere Antworten möglich)",
        options: [
          { text: "Blutgerinnungsstörungen", correct: true },
          { text: "Einnahme von Gerinnungshemmern", correct: true },
          { text: "Anämie", correct: true },
          { text: "Hirudinallergie", correct: true },
          { text: "Gonarthrose", correct: false }
        ],
        explanation: "Gonarthrose ist eine Indikation, keine Kontraindikation. Die vier genannten Faktoren erhöhen das Blutungs- oder Allergierisiko und verbieten den Egeleinsatz."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1046_07",
    title: "Akupunktur & Neuraltherapie",
    contextHint: "Kap. 9-10 – Akupunktur: TCM, Yin/Yang, Qi, Meridiane; Neuraltherapie nach Huneke: Segmenttherapie, Störfeldtherapie, Procain",
    phase1: {
      soil: {
        statement: "Was sind Yin und Yang in der TCM und wie werden die Organe zugeordnet?",
        answer: "Yin: ruhend, kühl, nährend → Speicherorgane (Zang): Milz-Pankreas, Lunge, Herz, Leber, Niere. Yang: bewegt, warm, transformierend → Hohlorgane (Fu): Magen, Gallenblase, Dünndarm, Dickdarm, Harnblase. Meridiane: 12 paarige Hauptmeridiane (Yang außen/Rücken, Yin innen/Bauch) + 8 unpaarige.",
        solution: "Das Yin-Yang-Prinzip beschreibt komplementäre Gegensätze. Qi (Lebensenergie) fließt durch Meridiane. Blockierungen oder Ungleichgewichte des Qi verursachen Krankheit."
      },
      seed: {
        statement: "Was unterscheidet Segmenttherapie und Störfeldtherapie in der Neuraltherapie nach Huneke?",
        answer: "Segmenttherapie: Injektion in Dermatome/Head-Zonen, die dem erkrankten Organ segmental zugeordnet sind (reflektorische Wirkung). Störfeldtherapie: Behandlung von Narben, Eitersherden (Zähne, Mandeln) als Fernursachen von Erkrankungen. Lokalanästhetikum (Procain/Lidocain/Novocain) unterbricht pathologische Nervenimpulse.",
        solution: "Huneke entdeckte das ‚Sekundenphänomen': Nach Injektion ins Störfeld tritt sofortige Heilung ein, die mindestens 8 Stunden anhalten muss, um als echter Heilerfolg zu gelten."
      },
      water: {
        statement: "Welche Lokalanästhetika werden in der Neuraltherapie verwendet und welcher rechtliche Status gilt für sie?",
        answer: "Procain, Lidocain, Novocain. Wichtig: Lokalanästhetika unterliegen dem Arzneimittelgesetz und sind damit rezeptpflichtig. Vor Anwendung: Allergietest in der Augenbindehaut. Das Sekunden-Phänomen (Heilerfolg ≥8h) bestätigt das Störfeld.",
        solution: "Obwohl Neuraltherapie ein Naturheilverfahren ist, arbeitet sie mit verschreibungspflichtigen Substanzen. Als Heilpraktiker muss die Rezeptpflicht beachtet und ggf. der Arzt einbezogen werden."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1046_07_h1",
        question: "Welche Organe gehören in der TCM zu den Yin-Speicherorganen (Zang)?",
        options: [
          { text: "Magen, Gallenblase, Dünndarm", correct: false },
          { text: "Milz-Pankreas, Lunge, Herz, Leber, Niere", correct: true },
          { text: "Dickdarm, Harnblase, Herz", correct: false },
          { text: "Leber, Magen, Gallenblase", correct: false }
        ],
        explanation: "Yin-Organe (Zang/Speicherorgane): Milz-Pankreas, Lunge, Herz, Leber, Niere. Yang-Organe (Fu/Hohlorgane): Magen, Gallenblase, Dünndarm, Dickdarm, Harnblase."
      },
      {
        type: "true_false",
        id: "1046_07_h2",
        statement: "Das Sekundenphänomen in der Neuraltherapie muss mindestens 8 Stunden anhalten, um als echter Heilerfolg zu gelten.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Huneke definierte das Sekundenphänomen: Nach Injektion ins Störfeld tritt sofortige Besserung ein. Diese muss ≥8 Stunden dauern, um als therapeutischer Erfolg zu gelten."
      },
      {
        type: "mc",
        id: "1046_07_h3",
        question: "Welches Lokalanästhetikum wird in der Neuraltherapie nach Huneke hauptsächlich verwendet?",
        options: [
          { text: "Ketamin", correct: false },
          { text: "Procain", correct: true },
          { text: "Morphin", correct: false },
          { text: "Bupivacain", correct: false }
        ],
        explanation: "Procain (sowie Lidocain/Novocain) ist das klassische Mittel in der Neuraltherapie. Es blockiert pathologische Nervenimpulse im Segment oder Störfeld."
      },
      {
        type: "true_false",
        id: "1046_07_h4",
        statement: "In der TCM verlaufen Yang-Meridiane an der Innenseite des Körpers und der Bauchhöhle.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Yang-Meridiane verlaufen außen/dorsal (Rückenseite), Yin-Meridiane verlaufen innen/ventral (Bauchseite/Innenseite der Extremitäten)."
      },
      {
        type: "mc",
        id: "1046_07_h5",
        question: "Worunter fallen Lokalanästhetika in der Neuraltherapie rechtlich?",
        options: [
          { text: "Nahrungsergänzungsmittel", correct: false },
          { text: "Homöopathische Mittel", correct: false },
          { text: "Arzneimittelgesetz (rezeptpflichtig)", correct: true },
          { text: "Freiverkäufliche Heilmittel", correct: false }
        ],
        explanation: "Lokalanästhetika wie Procain unterliegen dem Arzneimittelgesetz und sind rezeptpflichtig. Dies ist für Heilpraktiker bei der Neuraltherapie rechtlich relevant."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1046_07_p4_1",
        question: "Welche Aussagen zur TCM-Akupunktur sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Qi ist die Lebensenergie, die durch Meridiane fließt", correct: true },
          { text: "Es gibt 12 paarige Hauptmeridiane", correct: true },
          { text: "Yang-Meridiane verlaufen dorsal/außen", correct: true },
          { text: "Yin-Organe werden als Hohlorgane bezeichnet", correct: false },
          { text: "Diagnose erfolgt u.a. durch Pulstastung", correct: true }
        ],
        explanation: "Yin-Organe sind Speicherorgane (Zang), nicht Hohlorgane. Hohlorgane (Fu) sind Yang zugeordnet. Alle anderen Aussagen sind korrekt."
      },
      {
        type: "mc",
        id: "1046_07_p4_2",
        question: "Welche Aussagen zur Neuraltherapie nach Huneke sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Segmenttherapie wirkt über Dermatome/Head-Zonen", correct: true },
          { text: "Störfeldtherapie behandelt Narben und Entzündungsherde", correct: true },
          { text: "Sekundenphänomen muss mindestens 8 Stunden anhalten", correct: true },
          { text: "Procain ist frei verkäuflich", correct: false },
          { text: "Allergietest in der Augenbindehaut vor Anwendung", correct: true }
        ],
        explanation: "Procain/Lidocain/Novocain sind rezeptpflichtig (Arzneimittelgesetz) – nicht frei verkäuflich. Alle anderen Aussagen sind korrekt."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1046_08",
    title: "Chiropraktik, Massage, Bewegungstherapie & Reiki",
    contextHint: "Kap. 11-13 – Chiropraktik: Subluxationen; Massage: Wirkungen; Bewegungstherapie: aktiv/passiv; Reiki: Mikao Usui, 3 Grade",
    phase1: {
      soil: {
        statement: "Was ist das Ziel der Chiropraktik und was sind Subluxationen?",
        answer: "Chiropraktik löst Subluxationen auf – das sind Gelenkblockaden mit begleitenden Muskelverspannungen und Nervenirritationen, meist der Wirbelsäule. Durch gezielte Manipulationen (Impulse) werden Gelenke mobilisiert und Nervenkompressionenzurückgelöst. Dies hat reflektorische Wirkung auf zugeordnete Organe.",
        solution: "Eine Subluxation ist keine vollständige Gelenkausrenkung, sondern eine partielle Fehlstellung mit Funktionsstörung. Chiropraktiker nutzen hochspezifische Impulstechniken, keine Rohmassagen."
      },
      seed: {
        statement: "Welche physiologischen Wirkungen hat die klassische Massage?",
        answer: "Massage fördert Durchblutung und Lymphfluss, regt den Stoffwechsel an, normalisiert den Muskeltonus (Hyper- oder Hypotonus), vermehrt rote Blutkörperchen (Erythropoese↑), löst Muskelverspannungen und Adhäsionen, wirkt entspannend auf das Nervensystem.",
        solution: "Die mechanischen Griffe (Effleurage, Petrissage, Friktion, Tapotement) erzeugen unterschiedliche Effekte auf Haut, Muskel und Bindegewebe. Lymphdrainage ist ein Sonderform."
      },
      water: {
        statement: "Was versteht man unter Reiki und welche Grade gibt es?",
        answer: "Reiki (Mikao Usui, Japan) bedeutet 'universelle Lebensenergie'. Ziel: Harmonisierung der Körperschwingungen. Wirkung: entkrampfend, entspannend, schmerzstillend. Anwendung mit beiden Händen auf Körperregionen. Es gibt 3 Grade (Einweihungsstufen): Grad 1 (Selbstbehandlung), Grad 2 (Fernbehandlung), Grad 3 (Meistergrad/Lehrfähigkeit).",
        solution: "Reiki basiert auf der Vorstellung, dass der Therapeut Lebensenergie kanalisiert und auf den Patienten überträgt. Wissenschaftlicher Nachweis fehlt, aber entspannende Wirkung ist dokumentiert."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1046_08_h1",
        question: "Was sind Subluxationen in der Chiropraktik?",
        options: [
          { text: "Vollständige Gelenkausrenkungen", correct: false },
          { text: "Gelenkblockaden mit Muskelverspannungen und Nervenirritationen", correct: true },
          { text: "Knochenbrüche mit Nervenbeteiligung", correct: false },
          { text: "Entzündliche Gelenkerkrankungen", correct: false }
        ],
        explanation: "Subluxationen sind partielle Gelenkfehlstellungen mit Funktionsstörung – keine vollständigen Ausrenkungen. Sie gehen mit Muskelverspannungen und Nervenirritationen einher."
      },
      {
        type: "true_false",
        id: "1046_08_h2",
        statement: "Massage kann den Muskeltonus normalisieren und die Erythropoese (Bildung roter Blutkörperchen) fördern.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Massage normalisiert Hyper- und Hypotonus und steigert nachweislich die Bildung roter Blutkörperchen durch verbesserte Durchblutung und Stoffwechselaktivierung."
      },
      {
        type: "mc",
        id: "1046_08_h3",
        question: "Wie viele Grade gibt es im Reiki-System?",
        options: [
          { text: "2", correct: false },
          { text: "3", correct: true },
          { text: "5", correct: false },
          { text: "7", correct: false }
        ],
        explanation: "Das Reiki-System nach Mikao Usui kennt 3 Grade: Grad 1 (Selbstbehandlung), Grad 2 (Fernbehandlung), Grad 3 (Meister/Lehrgrad)."
      },
      {
        type: "true_false",
        id: "1046_08_h4",
        statement: "Bewegungstherapie kann nur aktiv durchgeführt werden – passive Anwendungen sind nicht möglich.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Bewegungstherapie unterscheidet aktive (Patient bewegt selbst, langsam steigernd) und passive Anwendungen (bei Lähmungen/Bettlägerigkeit, durch Therapeuten geführt)."
      },
      {
        type: "mc",
        id: "1046_08_h5",
        question: "Wer begründete das Reiki-System?",
        options: [
          { text: "Friedrich Baunscheidt", correct: false },
          { text: "Sebastian Kneipp", correct: false },
          { text: "Mikao Usui", correct: true },
          { text: "Ferdinand Huneke", correct: false }
        ],
        explanation: "Mikao Usui (Japan) entwickelte das Reiki-System. Baunscheidt: Baunscheidt-Verfahren, Kneipp: Hydrotherapie, Huneke: Neuraltherapie."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1046_08_p4_1",
        question: "Welche Wirkungen hat die klassische Massage? (Mehrere Antworten möglich)",
        options: [
          { text: "Förderung von Durchblutung und Lymphfluss", correct: true },
          { text: "Normalisierung des Muskeltonus", correct: true },
          { text: "Vermehrung roter Blutkörperchen", correct: true },
          { text: "Direkte Knochenregeneration", correct: false },
          { text: "Anregung des Stoffwechsels", correct: true }
        ],
        explanation: "Direkte Knochenregeneration ist keine Massagewirkung. Alle anderen genannten Effekte sind physiologisch belegte Wirkungen der klassischen Massage."
      },
      {
        type: "mc",
        id: "1046_08_p4_2",
        question: "Welche Aussagen zu Bewegungstherapie und Reiki sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Bewegungstherapie verhindert Kräfteverfall und Muskelschwund", correct: true },
          { text: "Passive Bewegungstherapie wird bei Lähmungen eingesetzt", correct: true },
          { text: "Reiki wirkt entkrampfend und entspannend", correct: true },
          { text: "Reiki-Grad 2 erlaubt Fernbehandlung", correct: true },
          { text: "Aktive Bewegungstherapie beginnt mit maximaler Belastung", correct: false }
        ],
        explanation: "Aktive Bewegungstherapie beginnt langsam steigernd – nicht mit maximaler Belastung. Alle anderen Aussagen sind korrekt."
      }
    ]
  })
];

if (typeof module !== "undefined") module.exports = NATURHEILVERFAHREN2_1046_PLANTS;
