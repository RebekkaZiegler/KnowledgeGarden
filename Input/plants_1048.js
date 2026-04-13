const HOMOEOPATHIE_1048_PLANTS = [
  makeDetailedPlant({
    id: "1048_01",
    title: "Hahnemann, Geschichte & Grundprinzip der Homöopathie",
    contextHint: "Kap. 1+2 – Hahnemann *10.4.1755 Meißen, †2.7.1843 Paris; Chinarinde-Selbstversuch 1790; similia similibus curentur; Organon 1810; Homöopathie vs. Allopathie (Contraria contrariis curantur)",
    phase1: {
      soil: {
        statement: "Wer war Samuel Hahnemann und welcher Selbstversuch führte zur Entdeckung des Ähnlichkeitsprinzips?",
        answer: "Samuel Hahnemann (*10. April 1755 in Meißen, †2. Juli 1843 in Paris). 1790 übersetzte er eine englische Materia Medica und war mit der Beschreibung der Chinarinde (bei Malaria) unzufrieden. Im Selbstversuch nahm er zweimal täglich geringe Dosen Chinarinde ein und entwickelte malariaähnliche Fieberanfälle – die verschwanden, als er aufhörte. Schlussfolgerung: Similia similibus curentur = Ähnliches wird durch Ähnliches geheilt. Das neue Heilsystem nannte er Homöopathie (griech.: homoios = gleich, pathos = Leiden). Das 'Organon', die Gesamtdarstellung der Homöopathie, erschien 1810.",
        solution: "Die Entdeckung des Simile-Prinzips war nicht völlig neu – Hippokrates und Paracelsus kannten es. Hahnemann hat es jedoch als Erster konsequent weiterentwickelt und systematisch ausgebaut."
      },
      seed: {
        statement: "Wie unterscheidet sich die homöopathische von der schulmedizinischen Vorgehensweise?",
        answer: "Schulmedizin (Allopathie): sucht Diagnose, behandelt nach antagonistischem Prinzip (Contraria contrariis curantur – Entgegengesetztes heilt Entgegengesetztes); bekämpft Symptome, birgt Nebenwirkungsrisiko. Homöopathie: braucht klinische Diagnose nur zur Eingrenzung; Behandlung basiert auf allen subjektiven und objektiven Symptomen; erfasst Patienten als Konstitutionstyp; Ziel: Selbstheilungskräfte aktivieren; keine Nebenwirkungen/Therapieschäden. Grenze der Homöopathie: wenn Selbstheilungskräfte blockiert/überfordert sind, müssen schulmedizinische Mittel eingesetzt werden (z. B. Notfallmedizin).",
        solution: "Homöopathie und Schulmedizin schließen sich nicht aus. Die Schulmedizin profitiert von unterstützender Homöopathie, umgekehrt hat die Homöopathie Grenzen (z. B. Notfall, chirurgische Indikationen)."
      },
      water: {
        statement: "Was lehrten Hippokrates und Paracelsus zur Ähnlichkeitsregel und was ist das Simile?",
        answer: "Hippokrates (ca. 460–375 v. Chr.): kannte das Prinzip 'Ähnliches durch Ähnliches heilen' und auch das antagonistische Prinzip. Paracelsus (1493–1541): 'Auf keine Weise wird eine Krankheit per contraria geheilt, sondern mit Hilfe des Simile.' Kannte aber die Potenzierung noch nicht. Das Simile ist das dem Erkrankungssymptombild ähnlichste Mittel. Je ähnlicher die Symptome, desto erfolgreicher die Heilung. Hahnemann nannte es Similimum.",
        solution: "Das Similimum ist das am besten passende Einzelmittel – es verspricht schnellste Heilung. Falsch gewählte homöopathische Einzelmittel wirken nicht, während Komplexmittel im günstigsten Fall langsamer wirken."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1048_01_h1",
        question: "In welchem Jahr machte Hahnemann den entscheidenden Chinarinden-Selbstversuch?",
        options: [
          { text: "1790", correct: true },
          { text: "1755", correct: false },
          { text: "1810", correct: false },
          { text: "1800", correct: false }
        ],
        explanation: "1790 beschäftigte sich Hahnemann mit der Übersetzung einer Materia Medica und machte den Chinarinden-Selbstversuch, der zur Entdeckung des Ähnlichkeitsprinzips führte. Das Organon erschien erst 1810."
      },
      {
        type: "mc",
        id: "1048_01_h2",
        question: "Was bedeutet 'Similia similibus curentur'?",
        options: [
          { text: "Ähnliches wird durch Ähnliches geheilt", correct: true },
          { text: "Entgegengesetztes heilt Entgegengesetztes", correct: false },
          { text: "Die Dosis macht das Gift", correct: false },
          { text: "Gleiche Ursache, gleiche Wirkung", correct: false }
        ],
        explanation: "Similia similibus curentur = Ähnliches wird durch Ähnliches geheilt – das Grundprinzip der Homöopathie. 'Contraria contrariis curantur' ist dagegen das Prinzip der Allopathie (Schulmedizin)."
      },
      {
        type: "true_false",
        id: "1048_01_h3",
        statement: "Die Entdeckung des Ähnlichkeitsprinzips war zur Zeit Hahnemanns völlig neu und in der Medizingeschichte unbekannt.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Bereits Hippokrates und Paracelsus kannten das Simile-Prinzip, auch in den indischen Veden wurde es beschrieben. Hahnemann entwickelte es jedoch als Erster konsequent weiter und machte es zum Grundpfeiler einer eigenen Heilmethode."
      },
      {
        type: "mc",
        id: "1048_01_h4",
        question: "Wie heißt Hahnemanns Gesamtdarstellung der Homöopathie, die 1810 erschien?",
        options: [
          { text: "Das Organon", correct: true },
          { text: "Die Materia Medica", correct: false },
          { text: "Das Repertorium", correct: false },
          { text: "Die Arzneimittellehre", correct: false }
        ],
        explanation: "Das 'Organon der Heilkunst' erschien 1810 als erste Gesamtdarstellung der Homöopathie. Die Materia Medica ist eine Arzneimittellehre, das Repertorium ein Nachschlagewerk zur Mittelfindung."
      },
      {
        type: "true_false",
        id: "1048_01_h5",
        statement: "Die Homöopathie hat in der Notfallmedizin ihren wichtigsten Einsatzbereich.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Die Homöopathie hat in der Notfallmedizin keinen Platz. Wenn die Selbstheilungskräfte nicht mehr aktivierbar sind oder akute Gefahr besteht, müssen schulmedizinische Mittel eingesetzt werden."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1048_01_p4_1",
        question: "Welche Aussagen zu Homöopathie und Schulmedizin sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Homöopathie zielt auf Aktivierung der Selbstheilungskräfte ab", correct: true },
          { text: "Die Schulmedizin arbeitet nach dem Contraria-Prinzip", correct: true },
          { text: "Homöopathie und Schulmedizin schließen einander grundsätzlich aus", correct: false },
          { text: "Homöopathie hat in der Notfallmedizin keinen Platz", correct: true }
        ],
        explanation: "Homöopathie aktiviert Selbstheilungskräfte; Schulmedizin arbeitet antagonistisch (Contraria). Beide ergänzen sich – Homöopathie kann Schulmedizin unterstützen, hat aber klare Grenzen (Notfall, fehlende Selbstheilungskraft). Sie schließen sich nicht aus."
      },
      {
        type: "mc",
        id: "1048_01_p4_2",
        question: "Welche Voraussetzungen müssen für eine erfolgreiche homöopathische Behandlung erfüllt sein? (Mehrere Antworten möglich)",
        options: [
          { text: "Das Simile – das ähnlichste Mittel – muss gefunden werden", correct: true },
          { text: "Die Selbstheilungskräfte des Patienten müssen noch ansprechbar sein", correct: true },
          { text: "Eine genaue schulmedizinische Diagnose ist zwingend nötig", correct: false },
          { text: "Eindeutige, klar abgrenzbare Symptome erleichtern die Mittelfindung", correct: true }
        ],
        explanation: "Das Simile muss gefunden werden, die Selbstheilungskräfte müssen reagieren können. Eine Diagnose ist für die Homöopathie nicht zwingend – die Symptome als Ganzes zählen. Indifferente Symptomatik macht die Mittelfindung schwierig."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1048_02",
    title: "Hauptprinzipien: Simile, Arzneimittellehre & Gabenlehre",
    contextHint: "Kap. 3.1–3.3 – 3 Hauptprinzipien; Arzneimittelprüfung am Gesunden = Arzneimittelbild; Hahnemann 200 Mittel, heute 3000; Urtinkturen → Potenzierung; höhere Verdünnung = tiefgreifendere Wirkung; Verschüttelung wichtiger als Verdünnung",
    phase1: {
      soil: {
        statement: "Auf welchen drei Hauptprinzipien basiert die Homöopathie?",
        answer: "1. Simile-Regel: Patient wird mit dem Mittel behandelt, das beim Gesunden ähnliche Symptome hervorruft. Das Mittel heißt Simile; je ähnlicher, desto erfolgreicher. Die Gesamtheit aller Symptome muss betrachtet werden. Homöopathie ist individuell – dasselbe Krankheitsbild kann bei verschiedenen Patienten unterschiedliche Mittel erfordern. 2. Reine Arzneimittellehre: Jedes Mittel muss eine Arzneimittelprüfung am Gesunden durchlaufen. Die beobachteten Symptome werden als Arzneimittelbild festgehalten. Hahnemann prüfte ~200 Mittel, heute sind ~3.000 bekannt. 3. Gabenlehre: Potenzierung der Arznei (Verdünnung + Verschüttelung/Verreibung).",
        solution: "Die Individualität der Homöopathie ist entscheidend: Drei Patienten mit Fieber können drei verschiedene Mittel benötigen, weil sie unterschiedlich auf die Erkrankung reagieren."
      },
      seed: {
        statement: "Was ist die Gabenlehre und warum gilt: höhere Verdünnung = stärkere Wirkung?",
        answer: "Hahnemann beobachtete, dass Substanzen bei Verabreichung als Urtinktur (unverdünnt) zwar heilten, aber gefährlich reagierten. Verdünnte und geschüttelte Substanzen wirkten besser. Er nannte dieses Verfahren Potenzierung (Begriff aus der Alchemie). In der Homöopathie gilt: Je höher die Verdünnung (= Potenz), desto tiefgreifender die Wirkung. Wichtiger als die Verdünnung selbst ist die Verschüttelung/Verreibung nach jedem Verdünnungsschritt.",
        solution: "Das ist kontraintuitiv – normalerweise bedeutet Verdünnung Abschwächung. In der Homöopathie wird die Substanz durch Potenzierung 'dynamisiert': Materie wird immaterieller, die Information wird freigesetzt."
      },
      water: {
        statement: "Wie funktioniert die Fallaufnahme und was sind Modalitäten?",
        answer: "Fallaufnahme: Alle wahrnehmbaren Symptome werden detailliert erfasst. Zuerst Selbstbericht des Patienten, dann Familienanamnese, Lebensgeschichte (Vorerkrankungen, Operationen, Impfungen, Medikamente, Lebensbedingungen, Ernährung, Verdauung). Modalitäten: Einflüsse, die Intensität, Qualität, Ort des Symptoms oder Allgemeinbefinden verändern – z. B. besser/schlechter bei Kälte/Wärme, Bewegung/Ruhe, Licht/Dunkel, Nässe/Trockenheit, zu bestimmten Tageszeiten. Leitsymptome: besonders auffällige und ungewöhnliche Symptome → führen zum richtigen Mittel.",
        solution: "Modalitäten sind das A und O der Mittelfindung in der Homöopathie. 'Wann werden die Beschwerden besser oder schlechter?' – diese Frage ist entscheidender als die Diagnose selbst."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1048_02_h1",
        question: "Wie viele Mittel hatte Hahnemann selbst einer Arzneimittelprüfung unterzogen?",
        options: [
          { text: "Etwa 200", correct: true },
          { text: "Etwa 30", correct: false },
          { text: "Etwa 3.000", correct: false },
          { text: "Etwa 500", correct: false }
        ],
        explanation: "Hahnemann prüfte etwa 200 Mittel. Heute sind rund 3.000 homöopathische Mittel bekannt, was hohe Anforderungen an den Homöopathen stellt."
      },
      {
        type: "true_false",
        id: "1048_02_h2",
        statement: "Bei der Potenzierung ist die Verdünnung selbst wichtiger als die Verschüttelung.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Wichtiger für die Wirkung ist die Verschüttelung/Verreibung nach jedem Verdünnungsschritt – nicht die Verdünnung selbst. Erst durch diesen Vorgang wird die Substanz 'dynamisiert'."
      },
      {
        type: "mc",
        id: "1048_02_h3",
        question: "Was versteht man in der Homöopathie unter einem 'Arzneimittelbild'?",
        options: [
          { text: "Die Sammlung aller Symptome, die ein Mittel bei der Prüfung am Gesunden hervorruft", correct: true },
          { text: "Ein Foto des Heilmittels", correct: false },
          { text: "Die chemische Strukturformel des Wirkstoffs", correct: false },
          { text: "Die Liste der Erkrankungen, bei denen ein Mittel eingesetzt wird", correct: false }
        ],
        explanation: "Das Arzneimittelbild entsteht durch die Arzneimittelprüfung am gesunden Individuum. Alle beobachteten Symptomveränderungen werden detailliert festgehalten und bilden das Arzneimittelbild."
      },
      {
        type: "mc",
        id: "1048_02_h4",
        question: "Was sind 'Modalitäten' in der homöopathischen Fallaufnahme?",
        options: [
          { text: "Einflüsse, die Intensität, Qualität oder Ort der Symptome verändern", correct: true },
          { text: "Die Dosierung der Homöopathika", correct: false },
          { text: "Die Verdünnungsstufen der Mittel", correct: false },
          { text: "Die Hauptindikationen eines Mittels", correct: false }
        ],
        explanation: "Modalitäten sind Faktoren wie Kälte/Wärme, Bewegung/Ruhe, Tageszeit usw., die Symptome verbessern oder verschlechtern. Sie sind ein wesentlicher Teil des Arzneimittelbildes und entscheidend für die Mittelfindung."
      },
      {
        type: "true_false",
        id: "1048_02_h5",
        statement: "Das Simile muss immer dasselbe sein, egal welcher Patient dieselbe Erkrankung hat.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Die Homöopathie ist individuell: Drei Patienten mit derselben Diagnose (z. B. Fieber) können drei verschiedene Mittel benötigen, weil sie unterschiedlich auf die Erkrankung reagieren."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1048_02_p4_1",
        question: "Welche Aussagen zur homöopathischen Arzneimittelprüfung und den Arzneimittelbildern sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Die Prüfung erfolgt am gesunden Individuum", correct: true },
          { text: "Die Prüfung erfolgt an kranken Patienten", correct: false },
          { text: "Hahnemann prüfte ca. 200 Mittel, heute sind ca. 3000 bekannt", correct: true },
          { text: "Das Arzneimittelbild enthält alle beobachteten Symptomveränderungen", correct: true }
        ],
        explanation: "Die Arzneimittelprüfung findet am Gesunden statt. Hahnemann prüfte ~200 Mittel; heute ~3000 bekannt. Das Arzneimittelbild fasst alle Symptomveränderungen zusammen und bildet die Basis für die Mittelfindung."
      },
      {
        type: "mc",
        id: "1048_02_p4_2",
        question: "Welche Informationen sind für die homöopathische Fallaufnahme besonders relevant? (Mehrere Antworten möglich)",
        options: [
          { text: "Modalitäten (besser/schlechter bei...)", correct: true },
          { text: "Leitsymptome (auffällige, ungewöhnliche Symptome)", correct: true },
          { text: "Nur die Hauptdiagnose laut ICD-10", correct: false },
          { text: "Familienanamnese und Lebensgeschichte des Patienten", correct: true }
        ],
        explanation: "Für die homöopathische Fallaufnahme sind Modalitäten, Leitsymptome und die gesamte Lebens- und Familienanamnese entscheidend. Die ICD-Diagnose allein ist nachrangig – die Gesamtheit der Symptome ist maßgeblich."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1048_03",
    title: "Potenzierung – D-, C-, LM-Potenzen und Potenzstufen",
    contextHint: "Kap. 3.3.1–3.3.2 – D=1:10 (10x schütteln), C=1:100 (100x), LM=1:50000; ab D24/C12/LM3 kein Molekül mehr (Avogadro); Tiefpotenzen <D6/C3, Mittelpotenzen D6–D22/C3–C11, Hochpotenzen ≥D23/C12/LM3; Hochpotenzen nur in erfahrenen Händen; nicht bei stark geschwächten Patienten",
    phase1: {
      soil: {
        statement: "Wie unterscheiden sich D-Potenzen, C-Potenzen und LM-Potenzen?",
        answer: "D-Potenzen (Dezimalpotenzen): Verdünnung 1:10 + Verschüttelung (10× kräftig); flüssig = 1 Teil Urtinktur + 9 Teile Wasser-Alkohol; fest (Globuli) = 1 Teil + 9 Teile Milchzucker + Verreibung. C-Potenzen (Centesimalpotenzen): Verdünnung 1:100; 1 Teil Urtinktur + 99 Teile Träger; 100 Schüttelschläge pro Schritt. LM-Potenzen: Verdünnung 1:50.000 (L = 50, M = 1000 im Lateinischen); wirken sehr weich, können längere Zeit genommen werden; besonders für chronisch Kranke geeignet. C- und LM-Potenzen gehen direkt auf Hahnemann zurück.",
        solution: "D-Potenzen sind in Deutschland am gebräuchlichsten. Bei Unsicherheit über die Potenz beginnt man als Anfänger mit D6."
      },
      seed: {
        statement: "Was sind Tiefpotenzen, Mittelpotenzen und Hochpotenzen, und wofür werden sie eingesetzt?",
        answer: "Tiefpotenzen: < D6/C3; noch substantieller Arzneimittelgehalt nachweisbar; direkte Arznereize; kurze Wirkdauer → häufiger wiederholen; bei akuten Erkrankungen und Unsicherheit über das Simile. Mittelpotenzen: D6–D22 / C3–C11; Wirkdauer 24h bis einige Tage; eine Gabe/Tag bis eine Gabe/Woche. Hochpotenzen: ab D23/C12/LM3 und höher; kein Molekül mehr nachweisbar; Wirkung energetisch/informatorisch; tiefgreifend auf Konstitution, Persönlichkeit, Gemüt; lange Wirkdauer → seltener geben. Hochpotenzen nur von Erfahrenen einsetzen; NIE bei stark geschwächten Patienten; dürfen nie dem Patienten mitgegeben werden.",
        solution: "Je akuter die Erkrankung, umso niedriger die Potenz und umso häufiger die Gabe. Bei hochakuten Fällen (Notfall) kommt es zuerst auf das Mittel an, erst in zweiter Linie auf die Potenz."
      },
      water: {
        statement: "Was erklärt die Avogadro-Konstante in Bezug auf Hochpotenzen?",
        answer: "Ab der Potenz D24 / C12 / LM3 befindet sich kein einziges Molekül des Arzneistoffs mehr im Medikament (Avogadro-Konstante: 1 mol = 6,022 × 10²³ Teilchen). Dennoch erhalten die Arznei durch Verschüttelung/Verreibung die Information über die Ausgangssubstanz. Das Arzneimittel gilt als Informationsspeicher/Informationsträger. Die Information stammt aus der Ursubstanz und wird durch den Träger (Alkohol, Wasser, Milchzucker) weitergegeben. Je höher die Potenz, desto immaterieller die Information, desto schneller und weiter kann sie sich entfalten.",
        solution: "Die Informationsspeicher-Theorie ist die wissenschaftlich umstrittenste Aussage der Homöopathie – sie erklärt, warum Hochpotenzen trotz fehlender Substanzmoleküle wirken sollen."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1048_03_h1",
        question: "Welches Verdünnungsverhältnis gilt für C-Potenzen pro Potenzierungsschritt?",
        options: [
          { text: "1:100", correct: true },
          { text: "1:10", correct: false },
          { text: "1:50.000", correct: false },
          { text: "1:1.000", correct: false }
        ],
        explanation: "C(entesimal)-Potenzen: 1:100 (1 Teil Urtinktur + 99 Teile Träger), 100 Schüttelschläge pro Schritt. D-Potenzen: 1:10. LM-Potenzen: 1:50.000."
      },
      {
        type: "true_false",
        id: "1048_03_h2",
        statement: "Ab der Potenz D24 / C12 befindet sich statistisch kein Molekül der Ausgangssubstanz mehr im Arzneimittel.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Wahr. Ab D24 / C12 / LM3 ist laut Avogadro-Konstante (6,022 × 10²³ Teilchen/mol) kein Molekül mehr nachweisbar. Hochpotenzen wirken nach homöopathischer Theorie als Informationsträger."
      },
      {
        type: "mc",
        id: "1048_03_h3",
        question: "Bei welchen Patienten dürfen Hochpotenzen NICHT eingesetzt werden?",
        options: [
          { text: "Bei stark geschwächten Patienten", correct: true },
          { text: "Bei Kindern", correct: false },
          { text: "Bei chronisch Kranken", correct: false },
          { text: "Bei Erkältungspatienten", correct: false }
        ],
        explanation: "Hochpotenzen dürfen nicht bei stark geschwächten Patienten eingesetzt werden und dürfen dem Patienten nie mitgegeben werden. Sie gehören nur in erfahrene Hände."
      },
      {
        type: "mc",
        id: "1048_03_h4",
        question: "Welcher Potenzenbereich gilt als 'Tiefpotenzen'?",
        options: [
          { text: "Potenzen unter D6 / C3", correct: true },
          { text: "Potenzen über D23 / C12", correct: false },
          { text: "D6 bis D22", correct: false },
          { text: "LM-Potenzen", correct: false }
        ],
        explanation: "Tiefpotenzen = unter D6/C3 (noch Substanz nachweisbar, direkte Arznereize, kurze Wirkdauer, häufige Gaben). Mittelpotenzen = D6–D22/C3–C11. Hochpotenzen = ab D23/C12/LM3."
      },
      {
        type: "true_false",
        id: "1048_03_h5",
        statement: "LM-Potenzen wurden von Hahnemann selbst entwickelt.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Wahr. Die C- und LM-Potenzen gehen direkt auf Hahnemann zurück. LM-Potenzen (Verdünnung 1:50.000) wirken besonders weich und eignen sich für chronisch Kranke."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1048_03_p4_1",
        question: "Welche Aussagen zu den Potenzstufen sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Tiefpotenzen kommen vor allem bei akuten Erkrankungen zum Einsatz", correct: true },
          { text: "Hochpotenzen wirken auf Konstitution, Persönlichkeit und Gemüt", correct: true },
          { text: "Bei Hochpotenzen kann man sicher sein, noch mit Materie zu arbeiten", correct: false },
          { text: "Je akuter die Erkrankung, desto häufiger und niedrigere Potenz", correct: true }
        ],
        explanation: "Tiefpotenzen = akute Erkrankungen, häufige Gaben. Hochpotenzen = tiefgreifend, Konstitution/Gemüt, keine Materie mehr vorhanden (ab D24/C12). Je akuter die Erkrankung, desto niedriger die Potenz und häufiger die Gabe."
      },
      {
        type: "mc",
        id: "1048_03_p4_2",
        question: "Welche Aussagen zur Homöopathie als Informationsmedizin treffen zu? (Mehrere Antworten möglich)",
        options: [
          { text: "Das Arzneimittel gilt als Informationsspeicher der Ursubstanz", correct: true },
          { text: "Alkohol, Wasser und Milchzucker dienen als Informationsträger", correct: true },
          { text: "Bei Hochpotenzen ist die Information materiell und substanzgebunden", correct: false },
          { text: "Je höher die Potenz, desto immaterieller und tiefgreifender die Wirkung", correct: true }
        ],
        explanation: "Das Arzneimittel speichert die Information der Ursubstanz im Träger. Alkohol, Wasser, Milchzucker sind Informationsträger. Bei Hochpotenzen ist die Information rein immateriell-energetisch – nicht mehr substanzgebunden."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1048_04",
    title: "Anwendung der Homöopathie – Darreichung, Erstverschlimmerung & Handhabung",
    contextHint: "Kap. 4 – Darreichung: Tablette/2-3 Globuli/10 Tropfen; Erstverschlimmerung = Körper reagiert; akut: spätestens 1 Woche geheilt, nach 3. Gabe Besserung; chronisch: nach 6-8 Wochen Mittelwechsel; nicht mit dem Essen; über Mundschleimhaut; Salben nur in Ausnahmefällen",
    phase1: {
      soil: {
        statement: "In welchen Darreichungsformen kommen Homöopathika vor und wie wird eine Gabe definiert?",
        answer: "Darreichungsformen: Tabletten, Globuli (Rohrzuckerkügelchen) und Tropfen. Triturationen (Pulver) sind nicht mehr sehr üblich. Eine Gabe = 1 Tablette, 2–3 Globuli oder 10 Tropfen. Je akuter die Krankheit: umso häufiger die Gabe, umso niedriger die Potenz. Grundsätze: Die Grundsubstanzen kommen aus der Tierwelt, Pflanzenwelt und von Mineralien. Nosoden = Arzneimittel aus krankmachenden Stoffen (Schleim, Keime, Abwehrstoffe); ab D12 in Apotheken erhältlich.",
        solution: "Bei hochakuten Fällen gilt: Es kommt zuerst auf das richtige Mittel an, erst in zweiter Linie auf die Potenz. Man nimmt das Mittel in der Potenz, die gerade verfügbar ist."
      },
      seed: {
        statement: "Was ist eine Erstverschlimmerung und wann ist ein Mittelwechsel notwendig?",
        answer: "Erstverschlimmerung: Bei akuten Erkrankungen kommt es nach homöopathischer Gabe fast immer zuerst zu einer Erstreaktion – meist ein Zeichen einsetzender Besserung. Kann aber auch 'Erstverschlimmerung' sein = Zeichen, dass der Körper reagiert. Bei heftiger Erstverschlimmerung: Potenz und Mittel überdenken. Akute Erkrankungen: Heilung spätestens nach 1 Woche; nach der 3. Gabe muss Besserung eintreten, sonst Mittel falsch gewählt. Chronische Erkrankungen: nach spätestens 6–8 Wochen Mittel wechseln, wenn Verbesserung stagniert oder nach Erstverschlimmerung keine Besserung folgt.",
        solution: "Die Erstverschlimmerung ist von der Verstärkung der Grunderkrankung zu unterscheiden. Eine Erstverschlimmerung ist kurz und gefolgt von Besserung – sie ist ein positives Zeichen."
      },
      water: {
        statement: "Wie werden homöopathische Mittel eingenommen und äußerlich angewendet?",
        answer: "Innere Anwendung: Nicht mit dem Essen einnehmen (Magensäure zerstört die Mittel). Über Mundschleimhaut aufnehmen: Globuli zwischen Unterkiefer und Wangenschleimhaut auflösen lassen; Tablette in Wasser aufgelöst mit Einmalspritze (ohne Kanüle) unter die Zunge geben; Tropfen in Schleimhautbereich zwischen Wange und Unterkiefer. Äußerliche Anwendung: Verreibungen, Tabletten oder Tropfen in Wasser aufgelöst auf erkrankte Stelle; Wickel und Umschläge (dasselbe Mittel auch innerlich geben). Salben nur in Ausnahmefällen – nie in offene Wunden (Fett verschmutzt Wunde).",
        solution: "Die gleichzeitige innere und äußerliche Gabe desselben Mittels verstärkt die Wirkung. Salben in offene Wunden sind kontraindiziert, weil das Fett die Wundheilung behindert."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1048_04_h1",
        question: "Aus wie vielen Globuli besteht eine homöopathische Gabe?",
        options: [
          { text: "2–3 Globuli", correct: true },
          { text: "5–10 Globuli", correct: false },
          { text: "1 Globulus", correct: false },
          { text: "10–15 Globuli", correct: false }
        ],
        explanation: "Eine homöopathische Gabe besteht aus 1 Tablette, 2–3 Globuli oder 10 Tropfen."
      },
      {
        type: "true_false",
        id: "1048_04_h2",
        statement: "Bei akuten Erkrankungen muss nach der dritten Gabe eine Verbesserung eintreten, sonst ist das Mittel falsch gewählt.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Wahr. Spätestens nach der dritten Gabe muss eine Verbesserung eintreten, sonst wurde das falsche Mittel gewählt. Bei akuten Erkrankungen muss die Heilung spätestens nach einer Woche eingetreten sein."
      },
      {
        type: "mc",
        id: "1048_04_h3",
        question: "Warum sollen Homöopathika nicht mit dem Essen eingenommen werden?",
        options: [
          { text: "Die Magensäure zerstört die Mittel", correct: true },
          { text: "Sie verursachen Übelkeit auf nüchternen Magen", correct: false },
          { text: "Die Nahrung blockiert die Resorption über den Darm", correct: false },
          { text: "Sie sollen unter der Zunge resorbiert werden", correct: false }
        ],
        explanation: "Die Magensäure kann die Mittel zerstören. Deshalb sollen Homöopathika über die Mundschleimhaut aufgenommen werden – nicht geschluckt und verdaut werden."
      },
      {
        type: "mc",
        id: "1048_04_h4",
        question: "Wann muss bei chronischen Erkrankungen das Mittel gewechselt werden?",
        options: [
          { text: "Nach spätestens 6–8 Wochen ohne ausreichende Besserung", correct: true },
          { text: "Nach spätestens 3 Tagen", correct: false },
          { text: "Nach einer Erstverschlimmerung", correct: false },
          { text: "Immer nach genau 4 Wochen", correct: false }
        ],
        explanation: "Bei chronischen Erkrankungen muss nach spätestens 6–8 Wochen das Mittel gewechselt werden, wenn die Verbesserung stagniert oder es nach einer Erstverschlimmerung keine Besserung gibt."
      },
      {
        type: "true_false",
        id: "1048_04_h5",
        statement: "Homöopathische Salben können bedenkenlos in offene Wunden gegeben werden.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Salben sollten nur in Ausnahmefällen angewendet werden und dürfen nie in offene Wunden gegeben werden, da das Fett die Wunde verschmutzt und die Heilung behindert."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1048_04_p4_1",
        question: "Welche Aussagen zur Erstverschlimmerung sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Sie ist meist ein Zeichen einsetzender Besserung", correct: true },
          { text: "Sie zeigt, dass der Körper auf das Mittel reagiert", correct: true },
          { text: "Bei heftiger Erstverschlimmerung sollte das Mittel sofort abgesetzt werden", correct: false },
          { text: "Bei heftiger Erstverschlimmerung sollten Potenz und Mittelwahl überdacht werden", correct: true }
        ],
        explanation: "Die Erstverschlimmerung ist fast immer ein positives Zeichen – der Körper reagiert. Bei heftiger EV: Potenz und Mittelwahl überdenken (evtl. zu hohe Potenz oder falsches Mittel). Sofortiges Absetzen ist nicht automatisch indiziert."
      },
      {
        type: "mc",
        id: "1048_04_p4_2",
        question: "Welche Faktoren können erklären, warum ein Patient nicht auf das Homöopathikum reagiert? (Mehrere Antworten möglich)",
        options: [
          { text: "Das falsche Arzneimittel wurde ausgewählt", correct: true },
          { text: "Die Potenz oder Dosierung war falsch", correct: true },
          { text: "Immunsuppressive Medikamente (Antibiotika, Kortikoid) hemmen die Wirkung", correct: true },
          { text: "Homöopathika wirken grundsätzlich erst nach 3 Monaten", correct: false }
        ],
        explanation: "Ausbleibende Reaktion kann folgende Ursachen haben: falsches Mittel, falsche Potenz/Dosierung, blockierte Selbstheilungskräfte, immunsuppressive Medikamente oder langsame Wirkung der Erkrankung. Homöopathika wirken nicht erst nach 3 Monaten."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1048_05",
    title: "Konstitutionsmittel: Calcium carbonicum & Sepia",
    contextHint: "Kap. 6.1+6.2 – Calc.carb.: innere Austernschale; träge/korpulent; Krämpfe nach Schreck; schlechter Kälte/Nässe/Bewegung; Sepia: Tintenfisch; Frauen; distanziert/allein; schlaffe Bindegewebe; besser Wärme/Bewegung/Ruhe; schlechter Kälte/Berührung",
    phase1: {
      soil: {
        statement: "Was ist Calcium carbonicum, auf welche Organe wirkt es und wie sieht das typische Erscheinungsbild aus?",
        answer: "Calcium carbonicum = innere weiße Austernschale. Wirkung auf: ZNS, Lymphdrüsen, Schilddrüse, Knochen, Magen-Darm, Haut, Schleimhäute, Muskeln. Erscheinungsbild: träge, schwerfällig, langsam; meist grobknochig und eher korpulent; trotz Robustheit zu Infekten neigend; Kinder: tapsig, rasch ermüdend, stur und schwer zu erziehen. Erkrankungsneigungen: ängstlich, Krämpfe nach Schreck; chronische Katarrhe (trocken oder schleimig-eitrig-blutig); Blutungsneigung aus Körperhöhlen; heißhungrig mit großem Durst; Blähungen, Obstipation, Durchfall; Gelenkentzündungen, Muskelschwäche; bei Jungen: Wachstumsschwierigkeiten, Knochenverkrümmungen.",
        solution: "Calcium carbonicum verschlimmert sich durch Kälte, Nässe, Bewegung und Luftzug. Besserung bei trockenem Klima."
      },
      seed: {
        statement: "Was ist Sepia, wem entspricht typischerweise das Sepia-Bild und welche Modalitäten sind charakteristisch?",
        answer: "Sepia = Tintenfisch. Wirkung: ZNS, Beckenorgane, Haut, periphere Nerven, Gelenke, Magen-Darm, Leber. Meist Frauen entsprechen dem Sepia-Bild. Erscheinungsbild: gerne allein, möchte in Ruhe gelassen werden; nicht gerne berührt; unfreundlich und distanziert; Bindegewebe, Haut und Muskeltonus schlaff und unelastisch; nicht selten Vorfall von Gebärmutter und Scheide. Erkrankungsneigungen: chronische Entzündungsprozesse, Katarrhe der Urogenitalorgane, Ekzeme; charakteristisch: morgendliche Schwäche, abendliche Munterkeit. Besserung: nach längerem Liegen, Ruhe/Alleinsein, Wärme, längerer rascher Bewegung. Verschlimmerung: durch Kälte, zu Beginn der Bewegung, in geschlossenen Räumen, bei Berührung.",
        solution: "Sepia ist ein klassisches 'Frauenmittel'. Die Kombination aus morgendlicher Schwäche, abendlicher Munterkeit und dem Wunsch nach Alleinsein ist diagnostisch wegweisend."
      },
      water: {
        statement: "Was sind Polychreste und Konstitutionsmittel, und welche Mittel gehören dazu?",
        answer: "Polychreste = Arzneimittel, die aufgrund der großen Zahl bekannter Symptome bei einer Vielzahl von Erkrankungen anwendbar sind. Konstitutionsmittel: gehören alle zu den Polychresten; vereinen homöopathisches Arzneimittelbild mit der Persönlichkeit des Individuums nach dem Simile-Prinzip; erfassen die Gesamtindividualität in Körper-Geist-Seele. Wichtige Polychreste/Konstitutionsmittel: Calcium carbonicum, Silicea, Phosphorus, Sulfur, Natrium muriaticum, Pulsatilla, Lachesis, Sepia, Lycopodium, Nux vomica, Arsenicum album, Mercurius solubilis, Graphites, Rhus toxicodendron, Bryonia.",
        solution: "Konstitutionsmittel sind nicht nur auf eine Erkrankung zugeschnitten, sondern auf den ganzen Menschen. Das macht die Konstitutionsdiagnostik so komplex und vielschichtig."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1048_05_h1",
        question: "Woraus wird das homöopathische Mittel Calcium carbonicum hergestellt?",
        options: [
          { text: "Aus der inneren weißen Austernschale", correct: true },
          { text: "Aus Calciumcarbonat-Gestein", correct: false },
          { text: "Aus Muschelsand", correct: false },
          { text: "Aus Kalkspat", correct: false }
        ],
        explanation: "Calcium carbonicum ist die innere weiße Austernschale (Ostrea edulis). Es ist eines der wichtigsten Konstitutionsmittel in der Homöopathie."
      },
      {
        type: "true_false",
        id: "1048_05_h2",
        statement: "Calcium carbonicum-Patienten zeigen trotz ihrer scheinbaren Robustheit eine Neigung zu Infekten.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Wahr. Obwohl Calcium carbonicum-Typen grobknochig und eher korpulent sind und robust wirken, neigen sie zu Infekten. Die scheinbare Robustheit täuscht."
      },
      {
        type: "mc",
        id: "1048_05_h3",
        question: "Was ist das typische Erscheinungsbild von Sepia?",
        options: [
          { text: "Gerne allein, distanziert, schlaffe Bindegewebe, meist Frauen", correct: true },
          { text: "Gesellig, laut, übergewichtig, männlich", correct: false },
          { text: "Ängstlich, schreckhaft, träge, korpulent", correct: false },
          { text: "Cholerisch, hager, nervös, reizbar", correct: false }
        ],
        explanation: "Sepia-Typen sind gerne allein, distanziert, möchten nicht berührt werden. Schlaffe Bindegewebe und Muskeltonus sind typisch. Das Sepia-Bild entspricht meist Frauen."
      },
      {
        type: "true_false",
        id: "1048_05_h4",
        statement: "Sepia-Patienten zeigen charakteristischerweise abendliche Schwäche und morgendliche Munterkeit.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Sepia zeigt das umgekehrte Muster: morgendliche Schwäche und abendliche Munterkeit. Das ist ein charakteristisches Leitsymptom des Sepia-Bildes."
      },
      {
        type: "mc",
        id: "1048_05_h5",
        question: "Wodurch verschlimmern sich die Symptome bei Calcium carbonicum?",
        options: [
          { text: "Durch Kälte, Nässe und Bewegung", correct: true },
          { text: "Durch Wärme und trockenes Klima", correct: false },
          { text: "In Ruhe und bei Alleinsein", correct: false },
          { text: "Durch Berührung und abends", correct: false }
        ],
        explanation: "Calcium carbonicum verschlimmert sich durch Kälte, Nässe, Bewegung und Luftzug. Besserung tritt bei trockenem Klima auf."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1048_05_p4_1",
        question: "Welche Aussagen zu Polychresten und Konstitutionsmitteln sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Konstitutionsmittel erfassen Körper, Geist und Seele als Einheit", correct: true },
          { text: "Polychreste können bei einer Vielzahl von Erkrankungen angewendet werden", correct: true },
          { text: "Konstitutionsmittel sind nur für körperliche, nicht für psychische Symptome zuständig", correct: false },
          { text: "Alle Konstitutionsmittel gehören zu den Polychresten", correct: true }
        ],
        explanation: "Konstitutionsmittel erfassen den ganzen Menschen (Körper-Geist-Seele) inklusive Persönlichkeit und psychischer Verfassung. Polychreste haben ein breites Wirkspektrum. Alle Konstitutionsmittel sind Polychreste."
      },
      {
        type: "mc",
        id: "1048_05_p4_2",
        question: "Vergleichen Sie Calcium carbonicum und Sepia: Welche Aussagen stimmen? (Mehrere Antworten möglich)",
        options: [
          { text: "Calc. carb. neigt zu Krämpfen nach Schreck, Sepia zu Gebärmuttervorfall", correct: true },
          { text: "Beide verschlimmern sich durch Kälte", correct: true },
          { text: "Beide Typen bevorzugen Gesellschaft und Berührung", correct: false },
          { text: "Sepia bessert sich bei längerer schneller Bewegung, Calc. carb. verschlimmert sich dabei", correct: true }
        ],
        explanation: "Calc. carb.: Krämpfe nach Schreck; schlechter Kälte/Bewegung. Sepia: Gebärmuttervorfall möglich; schlechter Kälte, besser bei längerer schneller Bewegung. Beide: schlechter Kälte. Sepia: nicht gerne Gesellschaft/Berührung."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1048_06",
    title: "Konstitutionsmittel: Phosphorus, Sulfur, Pulsatilla & Lycopodium",
    contextHint: "Kap. 6.3–6.6 – Phosphorus: nicht allein, schreckhaft, hämorrhagisch; besser rechts/kalt/Schlaf; Sulfur: wasserscheu, Körperöffnungen rot, Entgiftungsmittel; besser warm/Bewegung; Pulsatilla: weiblich, anhänglich, veränderlicher Schleim, frische Luft; Lycopodium: Rechtsmittel, 16-20 Uhr schlechter, Leber/Niere",
    phase1: {
      soil: {
        statement: "Was sind die charakteristischen Merkmale von Phosphorus und welche Erkrankungen neigen Phosphorus-Typen zu entwickeln?",
        answer: "Phosphorus = gelber Phosphor (Mineral). Wirkung: ZNS, Knochen, Gefäßnerven, Haargefäße, Schleimhäute. Erscheinungsbild: Leitsymptom – kann sehr schlecht allein sein; außerordentlich schreckhaft (Geräusche, Gewitter, Schüsse); sensibel mit 'feinen Antennen' für andere; temperamentvoll, liebt Bewegung; intelligent, aber vergesslich; verschmust, liebebedürftig; muss im Mittelpunkt stehen. Appetit maßlos, trinkt viel; Wechsel Durchfall/Verstopfung, oft Fettstühle. Erkrankungsneigung: hämorrhagische Diathese (selbst kleine Wunden bluten ausdauernd). Besserung: kaltes Essen/Wasser, Schlaf, Liegen auf der rechten Seite. Verschlimmerung: linke Seite, physische/psychische Anstrengung, warmes Essen, Berührung, vor/während Gewitter.",
        solution: "Die Kombination aus Schreckhaftigkeit, extremer Gesellschaftsbedürftigkeit und hämorrhagischer Neigung macht Phosphorus unverwechselbar."
      },
      seed: {
        statement: "Was sind die charakteristischen Merkmale von Sulfur?",
        answer: "Sulfur = Schwefel. Eines der wichtigsten Konstitutionsmittel. Wirkung: ZNS, vegetatives NS, Haut/Schleimhäute, Venen/Pfortader, MDT, Leber, Urogenitalsystem, Muskeln, Gelenke. Reaktionssteigerndes Mittel für alle Zellen; wichtigstes Entgiftungsmittel der Homöopathie. Erscheinungsbild: ausgeprägte Wasserscheue; nachts Heißhunger, tagsüber schnell satt und oft mager; trinkt viel; streitsüchtig, schwierig; langsame Bewegungen, kraftlos; selbstsüchtig, unleidlich, trotzig; ängstlich, jammert. Erkrankungen: trockene Haut, Ekzeme, Haarausfall, Schuppen; Verstopfung/Durchfall wechselnd, stark stinkende Blähungen; alle Körperöffnungen sind rot; nachts häufiges Urinieren. Verschlimmerung: abends/nachts, Ruhe, nasskaltes Wetter, nach Waschen. Besserung: trockenes warmes Wetter, Bewegung. Hinweis: Sulfur kann heftige Erstverschlimmerungen auslösen.",
        solution: "Die 'roten Körperöffnungen' und die Wasserscheue sind klassische Leitsymptome für Sulfur. Sulfur wird oft als 'Entgiftungsmittel' zu Beginn einer Behandlung eingesetzt."
      },
      water: {
        statement: "Was sind die charakteristischen Merkmale von Pulsatilla und Lycopodium?",
        answer: "Pulsatilla (Wiesenküchenschelle): eines der größten Polychreste. Wirkt auf ZNS, Kreislauf, Hypophyse, weibliche Geschlechtsorgane, MDT, Leber/Gallenblase, Schleimhäute, Pfortader/Venen, Psyche. Meist weibliche Patienten; anhänglich, launisch, nachgiebig; kann nicht allein sein; Schleimabsonderungen dick, mild, gelblich-grün; große Veränderlichkeit aller Symptome; trinkt wenig. Besserung: frische kühle Luft, kalte Anwendungen. Verschlimmerung: morgens, Wärme, schwüles Wetter. Lycopodium (Bärlapp): wirkt auf Leber, ZNS, Mandeln/Rachen-Kehlkopf, MDT. Sensibel, ängstlich, dominanter Außenauftritt; ausgesprochenes 'Rechtsmittel' (Beschwerden rechts oder von rechts nach links); magere Typen mit aufgetriebenem Bauch; Leber-/Nierenstörungen; Blähungen/Verstopfung; Arthritis/Gicht. Verschlimmerung: 16–20 Uhr.",
        solution: "Pulsatilla = Veränderlichkeit der Symptome + Schleimabsonderungen (gelblich-grün, mild). Lycopodium = Rechtsseitigkeit + 16-20 Uhr-Verschlimmerung."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1048_06_h1",
        question: "Was ist das charakteristischste Leitsymptom von Phosphorus?",
        options: [
          { text: "Kann sehr schlecht allein sein (extreme Gesellschaftsbedürftigkeit)", correct: true },
          { text: "Ausgeprägte Wasserscheue", correct: false },
          { text: "Große Veränderlichkeit aller Symptome", correct: false },
          { text: "Rechtsseitige Beschwerden", correct: false }
        ],
        explanation: "Das Leitsymptom von Phosphorus ist die extreme Unfähigkeit allein zu sein – außerordentlich ausgeprägt. Wasserscheue = Sulfur, Veränderlichkeit = Pulsatilla, Rechtsseitigkeit = Lycopodium."
      },
      {
        type: "true_false",
        id: "1048_06_h2",
        statement: "Sulfur kann heftige Erstverschlimmerungen auslösen und Patienten müssen darauf aufmerksam gemacht werden.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Wahr. Sulfur ist bekannt dafür, heftige Erstverschlimmerungen auszulösen. Da Sulfur ein reaktionssteigerndes Mittel ist, können Patienten mit starken Reaktionen überrascht werden."
      },
      {
        type: "mc",
        id: "1048_06_h3",
        question: "In welchem Zeitraum verschlimmern sich die Symptome von Lycopodium typischerweise?",
        options: [
          { text: "Zwischen 16:00 und 20:00 Uhr", correct: true },
          { text: "Zwischen 00:00 und 04:00 Uhr", correct: false },
          { text: "Zwischen 08:00 und 12:00 Uhr", correct: false },
          { text: "Immer morgens", correct: false }
        ],
        explanation: "Lycopodium zeigt seine typische Verschlimmerung zwischen 16 und 20 Uhr. Das ist ein charakteristisches Leitsymptom dieses Mittels."
      },
      {
        type: "mc",
        id: "1048_06_h4",
        question: "Wie sind die Schleimabsonderungen charakteristischerweise beim Pulsatilla-Typ?",
        options: [
          { text: "Dick, mild und gelblich-grün", correct: true },
          { text: "Wässrig, ätzend und brennend", correct: false },
          { text: "Scharf, wundmachend und übelriechend", correct: false },
          { text: "Trocken und verkrustet", correct: false }
        ],
        explanation: "Pulsatilla-Absonderungen sind charakteristisch: dick, mild (nicht ätzend) und gelblich-grün. Wässrig-ätzend = Allium Cepa/Gelsemium; scharf/wundmachend = Mercurius solubilis."
      },
      {
        type: "true_false",
        id: "1048_06_h5",
        statement: "Bei Phosphorus-Patienten liegt die typische Besserung auf der linken Körperseite.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Phosphorus-Patienten fühlen sich besser, wenn sie auf der rechten Seite liegen. Liegen auf der linken Seite führt zur Verschlimmerung."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1048_06_p4_1",
        question: "Welche Merkmale sind charakteristisch für den Sulfur-Typ? (Mehrere Antworten möglich)",
        options: [
          { text: "Wasserscheue (wäscht sich selten)", correct: true },
          { text: "Alle Körperöffnungen sind rot", correct: true },
          { text: "Besserung durch Wärme und Bewegung", correct: true },
          { text: "Ausgeprägte Gesellschaftsbedürftigkeit", correct: false }
        ],
        explanation: "Sulfur: Wasserscheue, rote Körperöffnungen, besser bei Wärme/Bewegung. Ausgeprägte Gesellschaftsbedürftigkeit ist ein Phosphorus-Merkmal."
      },
      {
        type: "mc",
        id: "1048_06_p4_2",
        question: "Welche Zuordnungen von Mittel und Leitsymptom sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Phosphorus → hämorrhagische Neigung (kleine Wunden bluten ausdauernd)", correct: true },
          { text: "Lycopodium → 'Rechtsmittel', Beschwerden beginnen rechts", correct: true },
          { text: "Pulsatilla → große Veränderlichkeit aller Symptome", correct: true },
          { text: "Sulfur → abendliche Schwäche und morgendliche Munterkeit", correct: false }
        ],
        explanation: "Phosphorus: hämorrhagische Diathese. Lycopodium: Rechtsmittel. Pulsatilla: veränderliche Symptome. Abendliche Munterkeit / morgendliche Schwäche = Sepia, nicht Sulfur."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1048_07",
    title: "Konstitutionsmittel: Nux vomica & Graphites; Einzel- vs. Komplexmittel",
    contextHint: "Kap. 6.7–6.8, Kap. 7 – Nux vomica: Brechnuss, männlich, cholerisch, MDT-Störungen, Bandscheibe, besser Ruhe/feuchte Wärme; Graphites: Graphit, Haut/Mastdarm, honigartiges Sekret, Schilddrüsenunterfunktion; Einzelmittel = Similimum; Komplexmittel = mehrere Mittel gemischt, keine Arzneimittelprüfung",
    phase1: {
      soil: {
        statement: "Was sind die charakteristischen Merkmale von Nux vomica?",
        answer: "Nux vomica = Brechnuss (getrocknete reife Samen); eines der größten Polychreste. Wirkung: ZNS, vegetatives NS, MDT, Leber, Blase. Erscheinungsbild: in erster Linie männliche Patienten; bezug zur rechten Körperseite; hager und schwächlich; cholerisch und überempfindlich; reagiert stark auf Geräusche und Licht; reizbar und nervös; wirkt aggressiv, ist aber ängstlich und unsicher; essen viel und hastig → Verdauungsprobleme; verkrampft und überängstlich bei Untersuchungen. Erkrankungsneigungen: Magen-Darm-Störungen; Durchfall, Erbrechen oder Verstopfung wechselnd; plötzlich auftretender Bandscheibenvorfall mit brettharter Bauchmuskelversteifung. Besserung: Ruhe, warme feuchte Witterung. Verschlimmerung: Kälte, trockenes Wetter, helles Licht, Geräusche, Berührung, psychische Belastungen.",
        solution: "Nux vomica ist das 'Stresstyp-Mittel' – der überarbeitete, cholerische, reizbare Patient mit Verdauungsproblemen und Empfindlichkeit auf Umweltreize."
      },
      seed: {
        statement: "Was sind die charakteristischen Merkmale von Graphites?",
        answer: "Graphites = natürlich vorkommendes Graphit. Wirkung: Haut, äußeres Auge, Nägel und Haare, Mastdarm. Erscheinungsbild: dickliche, verstopfte, phlegmatische, frostige Menschen; ängstlich, traurig, unruhig; Schilddrüsenunterfunktion zeigt oft Graphites-Symptome; Neigung zu Erkältungen, Hormonstörungen, Lympherkrankungen; Haut trocken, hornig, schuppend. Erkrankungsneigungen: schmierige Hautausschläge mit honigartigen Sekret; Ekzeme hinter Ohren und zwischen Zehen; Haarausfall; Verstopfung (Stuhl hart, knollig, stinkend mit Schleimfetzen); Gelenke verdickt. Besserung: im Dunkeln, durch Einhüllen des Körpers. Verschlimmerung: bei Wärme, nachts, während und nach der Menstruation.",
        solution: "Das honigartige Sekret der Hautausschläge und die Assoziation mit Schilddrüsenunterfunktion sind typische Graphites-Hinweise."
      },
      water: {
        statement: "Was unterscheidet Einzelmittel von Komplexmitteln in der Homöopathie?",
        answer: "Einzelmittel: Grundprinzip der Homöopathie – nur ein einziges Mittel nach dem Arzneimittelbild. Nur gelegentlich zwei, selten drei Mittel. Das Similimum = am besten passendes Mittel → schnellste Heilung. Einige Mittel antidotieren sich gegenseitig (dürfen nicht zusammen gegeben werden). Komplexmittel: mehrere Einzelmittel ähnlicher Indikation gemischt; keine Arzneimittelprüfung; nach allopathischen Gesichtspunkten eingesetzt; für Anfänger einfacher zu handhaben; können 10, 20+ Einzelmittel enthalten → Informationsüberflutung → Organismus oft überfordert. Falsch gewähltes Einzelmittel: wirkt nichts. Komplexmittel: wirken im günstigsten Fall langsamer als das Similimum, manchmal gar nicht.",
        solution: "Das richtig gewählte Similimum ist dem Komplexmittel immer überlegen. Komplexmittel sind ein Kompromiss für Situationen, in denen das Simile schwer zu finden ist."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1048_07_h1",
        question: "Welches Leitmerkmal beim Bandscheibenvorfall verweist auf Nux vomica?",
        options: [
          { text: "Plötzlicher Bandscheibenvorfall mit brettharter Versteifung der Bauchmuskeln", correct: true },
          { text: "Schleichend entstehender Bandscheibenvorfall mit Taubheitsgefühl", correct: false },
          { text: "Bandscheibenvorfall mit brennenden Schmerzen, die sich durch Wärme bessern", correct: false },
          { text: "Bandscheibenvorfall nach Durchnässung", correct: false }
        ],
        explanation: "Ein plötzlich auftretender Bandscheibenvorfall mit brettharter Versteifung der Bauchmuskeln ist eine typische Indikation für Nux vomica."
      },
      {
        type: "true_false",
        id: "1048_07_h2",
        statement: "Graphites ist besonders indiziert bei honigartigen Sekreten aus Hautausschlägen.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Wahr. Die schmierigen Hautausschläge mit honigartigen Sekret sind ein klassisches Leitsymptom von Graphites. Ekzeme hinter den Ohren und zwischen den Zehen sind ebenfalls typisch."
      },
      {
        type: "mc",
        id: "1048_07_h3",
        question: "Welche Erkrankung ist häufig mit dem Graphites-Bild assoziiert?",
        options: [
          { text: "Schilddrüsenunterfunktion", correct: true },
          { text: "Schilddrüsenüberfunktion", correct: false },
          { text: "Diabetes mellitus", correct: false },
          { text: "Herzrhythmusstörungen", correct: false }
        ],
        explanation: "Eine Schilddrüsenunterfunktion zeigt oft Graphites-Symptome (phlegmatisch, frostig, traurig, Haut-/Haar-Probleme). Graphites ist daher ein wichtiges Mittel bei Hypothyreose-ähnlichen Zuständen."
      },
      {
        type: "true_false",
        id: "1048_07_h4",
        statement: "Komplexmittel haben eine strenge Arzneimittelprüfung am Gesunden durchlaufen.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Komplexmittel haben keine Arzneimittelprüfung hinter sich. Sie werden nach allopathischen (symptomatischen) Gesichtspunkten eingesetzt und berücksichtigen nicht die individuelle Gesamtsymptomatik."
      },
      {
        type: "mc",
        id: "1048_07_h5",
        question: "Was passiert, wenn bei einem homöopathischen Patienten das falsche Einzelmittel gewählt wurde?",
        options: [
          { text: "Es geschieht nichts – das Mittel wirkt nicht", correct: true },
          { text: "Es kommt zu schweren Nebenwirkungen", correct: false },
          { text: "Es entsteht eine Abhängigkeit", correct: false },
          { text: "Die Erkrankung verschlimmert sich immer dramatisch", correct: false }
        ],
        explanation: "Ist das homöopathische Einzelmittel falsch gewählt, geschieht nichts – es wirkt nicht. Das ist einer der Vorteile: kein Schaden bei falscher Wahl. Komplexmittel wirken im günstigsten Fall langsamer als das Similimum, manchmal gar nicht."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1048_07_p4_1",
        question: "Welche Merkmale unterscheiden Nux vomica von Graphites? (Mehrere Antworten möglich)",
        options: [
          { text: "Nux vomica: cholerisch, reizbar, männlich; Graphites: phlegmatisch, traurig, frostig", correct: true },
          { text: "Nux vomica: MDT-Störungen, Bandscheibe; Graphites: Haut, Ekzeme, Mastdarm", correct: true },
          { text: "Beide bessern sich bei Geräuschen und hellem Licht", correct: false },
          { text: "Nux vomica: besser in Ruhe; Graphites: besser im Dunkeln", correct: true }
        ],
        explanation: "Nux vomica: cholerisch/reizbar/männlich; MDT/Bandscheibe; besser in Ruhe. Graphites: phlegmatisch/traurig/frostig; Haut/Mastdarm/Haare; besser im Dunkeln. Nux vomica verschlimmert sich durch Licht und Geräusche."
      },
      {
        type: "mc",
        id: "1048_07_p4_2",
        question: "Welche Aussagen zum Vergleich Einzelmittel vs. Komplexmittel sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Das richtig gewählte Similimum ist das wirksamste Mittel", correct: true },
          { text: "Komplexmittel können bei zu vielen Einzelmitteln den Organismus überfordern", correct: true },
          { text: "Komplexmittel wirken besser als das Similimum, weil mehr Wirkstoffe enthalten sind", correct: false },
          { text: "Einige Einzelmittel antidotieren sich gegenseitig und dürfen nicht kombiniert werden", correct: true }
        ],
        explanation: "Das Similimum (richtig gewähltes Einzelmittel) ist immer überlegen. Komplexmittel mit zu vielen Bestandteilen überfordern den Organismus. Einige Mittel antidotieren sich gegenseitig."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1048_08",
    title: "Anwendungsbeispiele: Fiebermittel, Entzündungs- & Erkältungsmittel",
    contextHint: "Kap. 8 – Aconitum: kein Schwitzen, Todesangst, kalter trockener Wind; Belladonna: schwitzt, weite Pupillen, feuerrotes Tonsillen; Ferrum phos.: mildes Fieber, kein Angst; Arnica: Trauma C30/C1000; Apis: Bienenstich-ähnlich; Mercurius: eitrig-scharf; Hepar sulf.: Potenz ↔ Wirkung auf Eiterung; Camphora: antidotiert ALLE Mittel",
    phase1: {
      soil: {
        statement: "Welche drei großen Fiebermittel gibt es und wie unterscheiden sie sich?",
        answer: "Aconitum (Blauer Eisenhut/Sturmhut): Fieber durch kalten, trockenen Wind; schnell hohes Fieber, harter/schneller Puls; Patient schwitzt NICHT; große Unruhe bis Todesangst; heftiger Durst; schlechter: abends, nachts, Wärme. Anfängermittel – muss sofort helfen. Belladonna (Tollkirsche): zweites großes Fiebermittel; Patient schwitzt; weite Pupillen, fiebrig glänzende Augen; Haut heiß, Patient friert; Schleimhäute trocken; Tonsillen/Hals feuerrot; kaum ansprechbar; Schlagader pulsiert dumpf/schwer; schlechter durch Kälte, Zugluft, Aufregung. Ferrum phosphoricum (phophorsaures Eisen): drittes Fiebermittel; langanhaltendes, nicht sehr hohes Fieber; keine Angstsymptome (Unterschied zu Aconit!); Puls leicht beschleunigt und unterdrückbar; Verbesserung bei leichter langsamer Bewegung; schlechter in Ruhe und im Liegen. Auch Anfängermittel.",
        solution: "Entscheidend für die Unterscheidung: Aconit = kein Schwitzen + Todesangst; Belladonna = schwitzt + feuerrote Tonsillen + weite Pupillen; Ferrum phos. = mildes Fieber ohne Angstsymptome."
      },
      seed: {
        statement: "Welche wichtigen Entzündungsmittel gibt es und wie unterscheiden sie sich?",
        answer: "Arnica (Bergwohlverleih): traumatische Entzündungen (Verletzung, Quetschung, Blutung); Mittel der Wahl bei Unfällen; C30 vor/nach Operationen; C1000 bei Kopfverletzungen; auch gegen Schocksymptome. Apis (Honigbiene): brennende/stechende Entzündungen; Stelle hellrot, ödematös, heiß – wie Bienenstich; auch bei Insektenstichen (kleinere: evtl. Ledum). Bryonia (Zaunrübe): exsudative (wässrige) Entzündungen; besser bei festem Druck und Ruhe; schlechter bei leichter Berührung und Bewegung. Mercurius solubilis (quecksilberhaltiges Gemenge): eitrige, schmerzhafte Entzündungen; Eiter innen, roter Rand außen; alle Absonderungen scharf und wundmachend; Lymphknoten angeschwollen. Lachesis (Schlangengift): hochrote, eitrige, septische Entzündungen; Druck wird nicht ertragen; Patient schläft in die Verschlimmerung hinein. Hepar sulfuris (Kalkschwefelleber): rezidivierende eitrige Entzündungen, Furunkel; Tiefpotenz = Eiterung ausspülen; Mittelpotenz = Eiterung stoppen/einschmelzen; Hochpotenz = Entzündung ausheilen. Silicea (Kieselsäure): chronische, reaktionsträge, schmierend-chronische Eiterungen; Fistelneigung; kein richtiges Fieber; gut am Ende einer Behandlung. Myristica sebifera ('homöopathisches Messer'): fördert rasche Abszessreifung; leitet Eiterungen aus; nur bei lokaler Symptomatik; Nekrose und Sepsis im Vordergrund.",
        solution: "Hepar sulf. ist das einzige Mittel, bei dem die Potenz die Wirkungsrichtung bestimmt: Tief = Eiterung ausspülen (öffnen), Hoch = Entzündung ausheilen."
      },
      water: {
        statement: "Welche wichtigen Erkältungsmittel gibt es und was ist an Camphora besonders zu beachten?",
        answer: "Dulcamara (Bittersüß): Erkältung im Sommer/Spätsommer, wenn Tage heiß, Nächte kalt; ausgelöst durch Feuchtigkeit, Nebel, Schnee, Regen; Nase setzt sich zu; ungeduldig, unleidlich; besser im Freien und Wärme. Gelsemium (Falscher Jasmin): Erkältung bei warm-feuchtem, schwülem Wetter; jeder Knochen schmerzt; heiße ätzende Nasensekrete; völlig durstlos; langsame Symptomwicklung. Allium Cepa (Küchenzwiebel): wie beim Zwiebelschneiden – Nase und Augen laufen; Nasensekrete ÄTZEND und wundmachend; Augensekrete mild. Rhus toxicodendron (Giftsumach): Kälte, Feuchtigkeit, Durchnässung als Auslöser; unruhig und depressiv; großer Durst auf kaltes Wasser; trockene geschwollene Nase; Bewegung bessert. Camphora (Kampfer): Kälte/Durchnässung der Extremitäten als Auslöser; friert, müde, kraftlos, unruhig; Haut kalt und trocken; Nase setzt sich zu; regt Kreislauf an. WICHTIG: Camphora antidotiert alle anderen homöopathischen Mittel! Wirkt nur, wenn noch kein Katarrh besteht.",
        solution: "Camphora-Merkregel: Es antidotiert ALLE anderen homöopathischen Mittel – daher niemals gleichzeitig mit anderen Homöopathika anwenden."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1048_08_h1",
        question: "Was ist das entscheidende Unterscheidungsmerkmal zwischen Aconitum und Belladonna beim Fieber?",
        options: [
          { text: "Aconitum: kein Schwitzen + Todesangst; Belladonna: schwitzt + feuerrote Tonsillen", correct: true },
          { text: "Aconitum: sehr hohes Fieber; Belladonna: mildes Fieber ohne Angst", correct: false },
          { text: "Aconitum: durch Wärme ausgelöst; Belladonna: durch Kälte ausgelöst", correct: false },
          { text: "Aconitum: weite Pupillen; Belladonna: enge Pupillen", correct: false }
        ],
        explanation: "Aconitum: kein Schwitzen, Todesangst, Fieber durch kalten trockenen Wind. Belladonna: schwitzt, weite glänzende Pupillen, feuerrote Tonsillen, kaum ansprechbar."
      },
      {
        type: "mc",
        id: "1048_08_h2",
        question: "In welcher Potenz wird Arnica bei Kopfverletzungen empfohlen?",
        options: [
          { text: "C1000 (Hochpotenz)", correct: true },
          { text: "D6 (Tiefpotenz)", correct: false },
          { text: "C3 (Tiefpotenz)", correct: false },
          { text: "D12 (Mittelpotenz)", correct: false }
        ],
        explanation: "Bei Kopfverletzungen sollte Arnica möglichst in einer Hochpotenz (C1000) gegeben werden. Bei Operationen wird C30 vor und nach dem Eingriff empfohlen."
      },
      {
        type: "true_false",
        id: "1048_08_h3",
        statement: "Bei Hepar sulfuris bestimmt die Potenz die Wirkungsrichtung auf die Eiterung.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Wahr. Bei Hepar sulfuris gilt: Tiefpotenz = Eiterung ausspülen; Mittelpotenz = Eiterung stoppen/einschmelzen; Hochpotenz = Entzündung ausheilen. Dies ist einzigartig in der Homöopathie."
      },
      {
        type: "mc",
        id: "1048_08_h4",
        question: "Was ist das charakteristische Unterscheidungsmerkmal zwischen Allium Cepa und Gelsemium bei Erkältungen?",
        options: [
          { text: "Allium Cepa: ätzende Nasensekrete, milde Augensekrete; Gelsemium: völlig durstlos, langsame Entwicklung", correct: true },
          { text: "Allium Cepa: tritt bei schwülem Wetter auf; Gelsemium: im Sommer", correct: false },
          { text: "Beide zeigen ätzende Absonderungen aus Nase und Augen", correct: false },
          { text: "Allium Cepa: regt den Kreislauf an; Gelsemium: antidotiert andere Mittel", correct: false }
        ],
        explanation: "Allium Cepa: Nase und Augen laufen (wie beim Zwiebelschneiden) – Nasensekrete ätzend, Augensekrete mild. Gelsemium: schwüles Wetter, durstlos, langsam, heiße Nasensekrete, Gliederschmerzen."
      },
      {
        type: "true_false",
        id: "1048_08_h5",
        statement: "Camphora kann gleichzeitig mit anderen homöopathischen Mitteln eingenommen werden.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Camphora antidotiert alle anderen homöopathischen Mittel – es hebt ihre Wirkung auf. Camphora darf daher nie gleichzeitig mit anderen Homöopathika gegeben werden."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1048_08_p4_1",
        question: "Welche Zuordnungen von Entzündungsmittel und Charakteristikum sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Apis → brennend-stechende Entzündung, ödematös, hellrot wie Bienenstich", correct: true },
          { text: "Bryonia → exsudative Entzündung; besser bei festem Druck und Ruhe", correct: true },
          { text: "Mercurius → wässrige Entzündungen ohne Eiter", correct: false },
          { text: "Myristica sebifera → 'homöopathisches Messer', fördert Abszessreifung", correct: true }
        ],
        explanation: "Apis: Bienenstich-ähnlich. Bryonia: exsudativ, besser Druck/Ruhe. Mercurius: eitrige Entzündungen mit scharfen, wundmachenden Absonderungen (nicht wässrig). Myristica: 'homöopathisches Messer'."
      },
      {
        type: "mc",
        id: "1048_08_p4_2",
        question: "Welche Erkältungsmittel werden durch Feuchtigkeit oder Nässe als Auslöser charakterisiert? (Mehrere Antworten möglich)",
        options: [
          { text: "Dulcamara (Feuchtigkeit, Nebel, Sommer/Spätsommer)", correct: true },
          { text: "Rhus toxicodendron (Kälte, Feuchtigkeit, Durchnässung)", correct: true },
          { text: "Gelsemium (warm-feuchtes, schwüles Wetter)", correct: true },
          { text: "Aconitum (kalter, trockener Wind)", correct: false }
        ],
        explanation: "Dulcamara, Rhus tox. und Gelsemium werden alle durch Feuchtigkeit/Nässe ausgelöst. Aconitum dagegen ist typisch für Erkältungen/Fieber durch kalten, trockenen Wind."
      }
    ]
  })
];
