// Neue Pflanzen für 1049 – Allgemeine Humanpathologie
// Gap 1: Karzinogene-Tabelle (Asbest/Benzol/Aromatische Amine/Eichenholzstaub) + 4 hämatogene Metastasierungstypen (Lungen/Leber/Kava/Pfortader)
// Gap 2: Klinische Details Mammakarzinom (Orangenschalenhaut, oberer äußerer Quadrant, <2cm metastasiert),
//         Magenkarzinom (Virchow-Drüse, Frühkarzinom 90% 5-JÜR), Portiokarzinom (HPV-Impfung STIKO 2007, Pap I-V),
//         Rektumkarzinom (unteres Drittel→Hohlvene, oberes Drittel→Pfortader),
//         HLA-Autoimmunassoziationen (DR3/DR4/DR5/B27), Graft-versus-Host-Reaktion

  makeDetailedPlant({
    id: "humanpathologie_1049_15",
    title: "Karzinogene & Hämatogene Metastasierungstypen",
    contextHint: "Kap. 10.1.2 – Lungentyp (Lunge→Lungenvenen→linkes Herz→Großkreislauf: Gehirn/Leber/Knochen), Lebertyp (Leber→Lunge), Kavatyp (Knochen/Niere/Schilddrüse→Vena cava→rechtes Herz→Lunge), Pfortadertyp (Darmtrakt→Pfortader→Leber); Kap. 10.2.1 – Karzinogene: Asbest (Lunge/Pleura/Peritoneum), Benzol (Knochenmark/Leukämie), Aromatische Amine (ableitende Harnwege), Eichen-/Buchenholzstaub (Nasennebenhöhle), Teer/Teeröle (Haut/Nase/Kehlkopf/Lunge)",
    phase1: {
      soil: {
        statement: "Beim Pfortadertyp der hämatogenen Metastasierung gelangen Tumorzellen des Darmtrakts über die Pfortader primär in die Leber.",
        answer: true,
        solution: "Richtig. Pfortadertyp: Darmtrakt → Pfortader → Leber. Kavatyp: Knochen/Niere/Schilddrüse → Vena cava → rechtes Herz → Lunge. Lungentyp: Lunge → Lungenvenen → linkes Herz → Großkreislauf (Gehirn/Leber/Knochen). Lebertyp: Leberprimärtumor → Lunge.",
      },
      seed: {
        statement: "Benzol ist ein Karzinogen, das Tumoren der ableitenden Harnwege verursacht.",
        answer: false,
        solution: "FALSCH: Benzol → Knochenmark (Leukämie). Aromatische Amine → ableitende Harnwege. Asbest → Lunge/Pleura/Peritoneum (Mesotheliom). Teer/Teeröle → Haut/Nase/Kehlkopf/Lunge. Eichen-/Buchenholzstaub → Nasennebenhöhle.",
      },
      water: {
        statement: "Eichen- und Buchenholzstaub erhöhen das Karzinomrisiko für die Nasennebenhöhlen.",
        answer: true,
        solution: "Richtig. Eichen-/Buchenholzstaub → Nasennebenhöhlenkarzinom (anerkannte Berufskrankheit). Chrom, Arsen, Nickel → Lunge. Halogenierte Alkyloxide → Lunge. Halogenierte Kohlenwasserstoffe → Leber.",
      },
    },
    harvestQuestions: [
      {
        id: "1049_15_h1",
        type: "true_false",
        statement: "Karzinogene sind Noxen, die eine Tumorentstehung auslösen oder begünstigen können.",
        answer: true,
        explanation: "Korrekt. Karzinogene = tumorauslösende/-fördernde Noxen. Tumorentstehung ist multifaktoriell: genetische Prädisposition + schwache Immunabwehr + Karzinogenexposition.",
      },
      {
        id: "1049_15_h2",
        type: "mc",
        question: "Ein Rektumkarzinom im oberen Drittel des Rektums metastasiert hämatogen bevorzugt über welchen Weg?",
        options: [
          { text: "Pfortader → Leber", correct: true },
          { text: "Vena cava → rechtes Herz → Lunge", correct: false },
          { text: "Lungenvenen → linkes Herz → Großkreislauf", correct: false },
          { text: "Direkt per continuitatem in Nachbarorgane", correct: false },
        ],
        explanation: "Oberes/mittleres Rektum: über obere und mittlere Rektalvenen → Pfortader → Leber (Pfortadertyp). Unteres Rektum: über untere Rektalvene → Vena cava → rechtes Herz → Lunge (Kavatyp). Daher unterschiedliche Metastasierungsorte.",
      },
      {
        id: "1049_15_h3",
        type: "mc",
        question: "Welches Karzinogen verursacht Leukämie durch Knochenmarkschädigung?",
        options: [
          { text: "Benzol", correct: true },
          { text: "Asbest", correct: false },
          { text: "Aromatische Amine", correct: false },
          { text: "Eichenholzstaub", correct: false },
        ],
        explanation: "Benzol → Knochenmarktumoren (Leukämie). Asbest → Lunge/Pleura/Peritoneum. Aromatische Amine → ableitende Harnwege (Blasenkarzinom). Eichenholzstaub → Nasennebenhöhle.",
      },
      {
        id: "1049_15_h4",
        type: "mc",
        question: "Welchen hämatogenen Metastasierungstyp beschreibt: Primärtumor Lunge → Lungenvenen → linkes Herz → Gehirn, Leber, Knochen?",
        options: [
          { text: "Lungentyp", correct: true },
          { text: "Lebertyp", correct: false },
          { text: "Kavatyp", correct: false },
          { text: "Pfortadertyp", correct: false },
        ],
        explanation: "Lungentyp: Primärtumor Lunge → Lungenvenen → linkes Herz → großer Kreislauf → Fernorgane (Gehirn, Leber, Knochen). Kavatyp: Knochen/Niere/Schilddrüse → V. cava → rechtes Herz → Lunge. Pfortader: Darm → Leber.",
      },
      {
        id: "1049_15_h5",
        type: "true_false",
        statement: "Asbest ist ein Karzinogen für Lunge, Pleura und Peritoneum.",
        answer: true,
        explanation: "Korrekt. Asbest → Lungen-, Pleura- und Peritonealtumoren (malignes Mesotheliom). Typische Berufskrankheit (Baubranche). Latenzzeit: 20–40 Jahre zwischen Exposition und Tumorentwicklung.",
      },
    ],
    phase4Questions: [
      {
        id: "1049_15_p4_1",
        type: "mc",
        question: "Welche Karzinogen-Tumor-Zuordnungen sind korrekt? (Mehrere richtig)",
        options: [
          { text: "Asbest → Lunge, Pleura, Peritoneum", correct: true },
          { text: "Benzol → Knochenmark (Leukämie)", correct: true },
          { text: "Aromatische Amine → ableitende Harnwege", correct: true },
          { text: "Aromatische Amine → Lunge", correct: false },
        ],
        explanation: "Aromatische Amine → Blasenkarzinom/Harnwege (NICHT Lunge). Benzol → Leukämie. Asbest → Lunge/Pleura/Peritoneum. Chrom/Arsen/Nickel/Quarzstaub → Lunge.",
      },
      {
        id: "1049_15_p4_2",
        type: "mc",
        question: "Welche hämatogenen Metastasierungstypen sind korrekt beschrieben? (Mehrere richtig)",
        options: [
          { text: "Pfortadertyp: Darmtrakt → Pfortader → Leber", correct: true },
          { text: "Kavatyp: Knochen/Niere/Schilddrüse → Vena cava → Lunge", correct: true },
          { text: "Lungentyp: Lunge → rechtes Herz → venöser Kreislauf", correct: false },
          { text: "Lebertyp: Leberprimärtumor → infiltriert Lunge", correct: true },
        ],
        explanation: "Lungentyp geht über Lungenvenen → LINKES Herz → großer Kreislauf (nicht rechtes Herz). Alle anderen korrekt: Pfortader→Leber, Kava→Lunge, Leber→Lunge.",
      },
    ],
  }),

  makeDetailedPlant({
    id: "humanpathologie_1049_16",
    title: "Klinische Tumordetails & HLA-Autoimmunassoziationen",
    contextHint: "Kap. 10.8 – Mammakarzinom: Orangenschalenhaut (Lymphödem+Haarfollikelvertiefung), oberer äußerer Quadrant, <2cm kann metastasieren; Magenkarzinom: Virchow-Drüse=supraklavikulärer Lymphknoten, Antrum+Pylorus, Frühkarzinom 5-JÜR 90%; Portiokarzinom: STIKO HPV-Impfung seit 2007, Pap I=regelgerecht bis Pap V=invasives Karzinom; Rektumkarzinom unteres Drittel→Hohlvene→Lunge, oberes Drittel→Pfortader→Leber; Kap. 11.3 – Graft-versus-Host: Spenderzellen gegen Empfänger (Knochenmarktransplantation); Kap. 11.4 – HLA-DR3: Basedow/Addison/Myasthenia gravis/DiabetesTypI/Sjögren/Zöliakie; HLA-B27: Bechterew; HLA-DR4: Pemphigus+rh.Arthritis; HLA-DR5: Hashimoto+perniz.Anämie",
    phase1: {
      soil: {
        statement: "Die Virchow-Drüse ist ein tastbarer supraklavikulärer Lymphknoten, der als lymphogene Fernmetastase beim Magenkarzinom auftreten kann.",
        answer: true,
        solution: "Richtig. Virchow-Drüse = Lymphknoten am linken Hals oberhalb des Schlüsselbeins. Tastbarer Befund = Warnsymptom bei Magenkarzinom (lymphogene Metastasierung). Weitere Warnzeichen: länger bestehende Magenschmerzen, Übelkeit, Erbrechen.",
      },
      seed: {
        statement: "Morbus Bechterew (Ankylosierende Spondylitis) ist mit dem HLA-Antigen HLA-DR3 assoziiert.",
        answer: false,
        solution: "FALSCH: Morbus Bechterew ist mit HLA-B27 assoziiert. HLA-DR3 → Morbus Basedow, Morbus Addison, Myasthenia gravis, Diabetes mellitus Typ I, Sjögren-Syndrom, Zöliakie. HLA-DR4 → Pemphigus + rheumatoide Arthritis.",
      },
      water: {
        statement: "Das Mammakarzinom entsteht am häufigsten im oberen äußeren Quadranten der Brust, und bereits ein Tumor unter 2 cm Durchmesser kann metastasieren.",
        answer: true,
        solution: "Richtig. Oberer äußerer Quadrant (ca. 50 %), linke Brust etwas häufiger betroffen. <2 cm kann schon metastasieren → Früherkennung entscheidend. Orangenschalenhaut: Lymphödem + Haarfollikelvertiefungen = Peau d'orange.",
      },
    },
    harvestQuestions: [
      {
        id: "1049_16_h1",
        type: "mc",
        question: "Was ist die 'Orangenschalenhaut' (Peau d'orange) beim Mammakarzinom?",
        options: [
          { text: "Hautveränderung durch Lymphödem mit fixierten Haarfollikelvertiefungen, ähnlich einer Orangenschale", correct: true },
          { text: "Gelbliche Verfärbung der Haut durch Hyperbilirubinämie bei Lebermetastasen", correct: false },
          { text: "Narbenbildung nach Biopsie oder Operation", correct: false },
          { text: "Rötung durch lokale Entzündung des Tumors", correct: false },
        ],
        explanation: "Orangenschalenhaut: Tumor wächst in Lymphgefäße → Lymphabflussbehinderung → Ödem; Haarfollikel sind fixiert → bleiben vertieft → Peau d'orange. Klinisches Alarmsymptom für Mammakarzinom (neben Mamilleneinziehung und Absonderungen).",
      },
      {
        id: "1049_16_h2",
        type: "mc",
        question: "Was bedeutet Pap V in der zervikalen Zytologie (Papanicolaou-Klassifikation)?",
        options: [
          { text: "Invasives Karzinom, Zellen sicher maligne", correct: true },
          { text: "Regelgerechtes Zellbild", correct: false },
          { text: "Unklarer Befund, Wiederholung empfohlen", correct: false },
          { text: "Leichte Dysplasie ohne Karzinomverdacht", correct: false },
        ],
        explanation: "Pap-Klassifikation (exfoliative Zytologie): I = regelgerecht, II = leichte Abweichungen (gutartig), III = unklarer Befund (Wiederholung nötig), IV = dringender Karzinomverdacht, V = invasives Karzinom. STIKO empfiehlt HPV-Impfung seit 2007.",
      },
      {
        id: "1049_16_h3",
        type: "true_false",
        statement: "Beim Magen-Frühkarzinom (auf Mucosa und Submucosa beschränkt) beträgt die 5-Jahres-Überlebensrate etwa 90 %.",
        answer: true,
        explanation: "Korrekt. Magen-Frühkarzinom: 5-JÜR ~90 %. Ausgedehntes Magenkarzinom: nur 20–30 %. Das Frühkarzinom ist auf Mucosa und Submucosa beschränkt; eine Metastasierung kann trotzdem bereits erfolgt sein.",
      },
      {
        id: "1049_16_h4",
        type: "mc",
        question: "Welche Autoimmunerkrankungen sind mit HLA-DR3 assoziiert?",
        options: [
          { text: "Morbus Basedow, Diabetes mellitus Typ I, Myasthenia gravis, Sjögren-Syndrom, Zöliakie", correct: true },
          { text: "Morbus Bechterew, Ankylosierende Spondylitis", correct: false },
          { text: "Hashimoto-Thyreoditis, perniziöse Anämie", correct: false },
          { text: "Pemphigus, rheumatoide Arthritis", correct: false },
        ],
        explanation: "HLA-DR3 → Basedow, Addison, Myasthenia gravis, Diabetes Typ I, Sjögren, Zöliakie. HLA-B27 → Bechterew. HLA-DR5 → Hashimoto + perniziöse Anämie. HLA-DR4 → Pemphigus + rh. Arthritis. HLA-DR2 → Multiple Sklerose + Sklerodermie.",
      },
      {
        id: "1049_16_h5",
        type: "mc",
        question: "Was ist die Graft-versus-Host-Reaktion?",
        options: [
          { text: "Immunkompetente Spenderzellen erkennen den Empfängerorganismus als fremd und greifen ihn an", correct: true },
          { text: "Abstoßung eines Transplantats durch das Immunsystem des Empfängers", correct: false },
          { text: "IgE-vermittelte Sofortreaktion des Empfängers gegen Spenderproteine", correct: false },
          { text: "Autoimmunreaktion des Spenders gegen eigenes Gewebe nach Transplantation", correct: false },
        ],
        explanation: "Graft-versus-Host (GvH): Spenderzellen (immunkompetent) erkennen Empfänger als fremd → Angriff. Beispiel: Knochenmarktransplantation. Vs. klassische Abstoßung = Host-versus-Graft (Empfänger-Immunsystem gegen Transplantat).",
      },
    ],
    phase4Questions: [
      {
        id: "1049_16_p4_1",
        type: "mc",
        question: "Welche Tumor-Klinisches-Zeichen-Zuordnungen sind korrekt? (Mehrere richtig)",
        options: [
          { text: "Mammakarzinom → Orangenschalenhaut (Peau d'orange)", correct: true },
          { text: "Magenkarzinom → Virchow-Drüse (palpable supraklavikuläre Lymphknotenmetastase)", correct: true },
          { text: "Bronchialkarzinom → blutiges Sputum als Alarmsymptom", correct: true },
          { text: "Prostatakarzinom → CEA als primärer Tumormarker", correct: false },
        ],
        explanation: "Prostatakarzinom → PSA (Prostata-spezifisches Antigen), NICHT CEA. CEA → kolorektales/Magen-/Pankreas-/Bronchialkarzinom. Alle anderen Zuordnungen korrekt.",
      },
      {
        id: "1049_16_p4_2",
        type: "mc",
        question: "Welche HLA-Autoimmunassoziationen sind korrekt? (Mehrere richtig)",
        options: [
          { text: "HLA-B27 → Morbus Bechterew (Ankylosierende Spondylitis)", correct: true },
          { text: "HLA-DR3 → Morbus Basedow und Diabetes mellitus Typ I", correct: true },
          { text: "HLA-DR5 → Hashimoto-Thyreoditis und perniziöse Anämie", correct: true },
          { text: "HLA-DR2 → Morbus Bechterew", correct: false },
        ],
        explanation: "HLA-DR2 → Multiple Sklerose und Sklerodermie (NICHT Bechterew). HLA-B27 → Bechterew. HLA-DR3 → Basedow/Diabetes Typ I/Myasthenia gravis/Sjögren/Zöliakie/Addison. HLA-DR5 → Hashimoto/perniziöse Anämie.",
      },
    ],
  })
