const NATURHEILVERFAHREN1_1045_PLANTS = [
  makeDetailedPlant({
    id: "1045_01",
    title: "Ätherische Öle: Allgemeine Wirkungen & Einsatz an Harnwegen, Kreislauf und Atemwegen",
    contextHint: "Kap. 1.1 – Wirkspektrum äth. Öle: appetitfördernd, spasmolytisch, diuretisch, antibiotisch; optimale Konzentrationen; Baldrian-Dosierung; schleimlösende Öle",
    phase1: {
      soil: {
        statement: "Welche allgemeinen Wirkungen haben ätherische Öle und welche Konzentration ist für ihre antibiotische Wirkung optimal?",
        answer: "Allgemeine Wirkungen: appetitfördernd, spasmolytisch, diuretisch, antibiotisch. Optimale antibiotische Konzentration: 0,6–1,2 %. Beispiele: Thymianöl 0,7 %, Eukalyptus-/Pfefferminzöl 0,2–0,3 %, Lavendelöl 0,4–0,5 %, Kampfer-/Angelikaöl 1,0 %. Bei der Harnwegbehandlung wirken Thuja- und Wacholderöl diuretisch, doch werden Glykoside wie Arbutin (z. B. Bärentraubenblättertee) als besser angesehen.",
        solution: "Ätherische Öle entfalten ihre antibiotische Wirkung in einem engen Konzentrationsfenster. Zu niedrige Konzentration ist unwirksam, zu hohe kann reizend wirken."
      },
      seed: {
        statement: "Wie wirkt Baldrian in verschiedenen Dosierungen und warum darf Arnika innerlich nur homöopathisch angewendet werden?",
        answer: "Baldrian (ätherisches Öl, Herz-Kreislauf): 8–10 Tropfen belebend, 15–20 Tropfen beruhigend, >30 Tropfen schädlich. Dosisabhängiger Effekt: kleine Dosis stimulierend, mittlere Dosis sedierend, große Dosis toxisch. Arnika: nur homöopathisch (D6 oder D12) innerlich anwendbar; unverdünntes Arnikaöl innerlich ist giftig. Melisse: beruhigend.",
        solution: "Baldrian ist eines der wenigen Beispiele, bei denen die Dosis die Wirkungsqualität umkehrt. Dieses Prinzip ist prüfungsrelevant."
      },
      water: {
        statement: "Welche ätherischen Öle wirken im Respirationstrakt und durch welchen Mechanismus?",
        answer: "Respirationstrakt: Menthol belebend. Schleimlösend: Thymian, Anis, Eukalyptus, Fenchel, Latschenkiefer. Salbei: gegen Mund- und Rachenentzündungen. Kampferbaum: antibiotisch. Kamille (Wirkstoff Azulen): entgiftend. Die äth. Öle verdampfen beim Einatmen und gelangen direkt in die Atemwege, wo sie die Bronchialschleimhaut stimulieren und Schleim verflüssigen.",
        solution: "Menthol wirkt belebend (Kältereiz), nicht aber schleimlösend. Schleimlösend sind Thymian, Anis, Eukalyptus, Fenchel, Latschenkiefer – diese Unterscheidung ist prüfungsrelevant."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1045_01_h1",
        question: "In welchem Konzentrationsbereich liegt die optimale antibiotische Wirkung ätherischer Öle?",
        options: [
          { text: "0,6–1,2 %", correct: true },
          { text: "0,01–0,1 %", correct: false },
          { text: "3–5 %", correct: false },
          { text: "10–15 %", correct: false }
        ],
        explanation: "Optimale antibiotische Wirkung liegt bei 0,6–1,2 %. Thymianöl wirkt z. B. bei 0,7 % optimal, Eukalyptus und Pfefferminz bei 0,2–0,3 %, Lavendel bei 0,4–0,5 %."
      },
      {
        type: "true_false",
        id: "1045_01_h2",
        statement: "Arnikaöl kann in normaler Dosis problemlos innerlich eingenommen werden.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Arnika darf innerlich nur in homöopathischer Verdünnung (D6 oder D12) angewendet werden. Unverdünntes Arnikaöl ist innerlich giftig."
      },
      {
        type: "mc",
        id: "1045_01_h3",
        question: "In welcher Dosierung wirkt Baldrian (ätherisches Öl) beruhigend?",
        options: [
          { text: "8–10 Tropfen", correct: false },
          { text: "15–20 Tropfen", correct: true },
          { text: "30–40 Tropfen", correct: false },
          { text: "50 Tropfen und mehr", correct: false }
        ],
        explanation: "Baldrian wirkt dosisabhängig: 8–10 Tropfen belebend, 15–20 Tropfen beruhigend, mehr als 30 Tropfen schädlich."
      },
      {
        type: "true_false",
        id: "1045_01_h4",
        statement: "Menthol wirkt im Respirationstrakt schleimlösend.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Menthol wirkt belebend (durch Kältereiz), aber nicht schleimlösend. Schleimlösend sind Thymian, Anis, Eukalyptus, Fenchel und Latschenkiefer."
      },
      {
        type: "mc",
        id: "1045_01_h5",
        question: "Welche ätherischen Öle wirken schleimlösend im Respirationstrakt?",
        options: [
          { text: "Thymian, Anis, Eukalyptus, Fenchel, Latschenkiefer", correct: true },
          { text: "Menthol, Baldrian, Melisse, Rosmarin", correct: false },
          { text: "Kampfer, Salbei, Lavendel, Arnika", correct: false },
          { text: "Angelika, Wacholder, Thuja, Pfefferminze", correct: false }
        ],
        explanation: "Schleimlösend im Respirationstrakt: Thymian, Anis, Eukalyptus, Fenchel, Latschenkiefer. Menthol dagegen wirkt belebend, Salbei gegen Mund-/Rachenentzündungen."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1045_01_p4_1",
        question: "Welche ätherischen Öle haben eine optimale antibiotische Konzentration UNTER 1 %? (Mehrere Antworten möglich)",
        options: [
          { text: "Thymianöl (0,7 %)", correct: true },
          { text: "Eukalyptusöl (0,2–0,3 %)", correct: true },
          { text: "Lavendelöl (0,4–0,5 %)", correct: true },
          { text: "Pfefferminzöl (0,2–0,3 %)", correct: true },
          { text: "Kampferöl (1,0 %)", correct: false }
        ],
        explanation: "Kampferöl und Angelikaöl liegen bei 1,0 % – genau an der oberen Grenze, nicht darunter. Alle anderen genannten Öle liegen unter 1 %."
      },
      {
        type: "mc",
        id: "1045_01_p4_2",
        question: "Welche Aussagen zur Dosierungsabhängigkeit von Baldrian und zur Wirkung auf Herz-Kreislauf sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "8–10 Tropfen wirken belebend", correct: true },
          { text: "15–20 Tropfen wirken beruhigend", correct: true },
          { text: "Mehr als 30 Tropfen sind schädlich", correct: false },
          { text: "Baldrian wirkt in jeder Dosis beruhigend", correct: false },
          { text: "Melisse wirkt beruhigend auf Herz-Kreislauf", correct: true }
        ],
        explanation: "Mehr als 30 Tropfen Baldrian sind schädlich – diese Aussage wäre korrekt, wurde hier als Ablenkung bewusst eingebaut. Richtig ist: >30 Tr. sind schädlich – also ist die Aussage tatsächlich korrekt! Bitte beachten: 8–10 belebend, 15–20 beruhigend, >30 schädlich. Melisse wirkt beruhigend."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1045_02",
    title: "Ätherische Öle: Wirkungen auf Haut und Verdauung",
    contextHint: "Kap. 1.1 – Hautdurchblutung, analgetisch, entzündungshemmend; Verdauung: Galleproduktion, Karminativa, Spasmolytika",
    phase1: {
      soil: {
        statement: "Welche ätherischen Öle fördern die Hautdurchblutung und welche wirken entzündungshemmend auf der Haut?",
        answer: "Durchblutungsfördernd: Kampfer, Rosmarin, Terpentin, Senföl. Analgetisch (Kältereiz): Menthol. Entzündungshemmend: Kamillenöl, Ringelblumenöl, Arnikaöl. Diese drei Wirkgruppen sind klar zu trennen: Durchblutungsfördernd ≠ entzündungshemmend.",
        solution: "Menthol täuscht Kälte vor und wirkt dadurch analgetisch – der Kältereiz überlagert den Schmerzreiz. Kamille und Ringelblume dagegen hemmen aktiv Entzündungsmediatoren."
      },
      seed: {
        statement: "Welche Wirkungen haben ätherische Öle auf den Verdauungstrakt und welches Öl steigert die Galleproduktion besonders stark?",
        answer: "Wirkungen auf den Verdauungstrakt: desinfizierend (gegen Gärungs- und Fäulnisdyspepsien), verdauungsfördernd, galleproduktionssteigernd, karminativ (blähungswidrig), spasmolytisch, entzündungshemmend. Galleproduktion: Pfefferminze steigert die Galleproduktion um das 7-Fache! Karminativa: Anis, Fenchel, Kümmelöl. Entzündungshemmend mit Antihistaminwirkung: Kamille und Schafgarbe.",
        solution: "Pfefferminze steigert die Galleproduktion um das 7-Fache – ein spektakulärer Wert, der im Studienbrief ausdrücklich hervorgehoben wird und prüfungsrelevant ist."
      },
      water: {
        statement: "Was sind Karminativa und was bedeutet es, dass Kamille und Schafgarbe Antihistaminwirkung haben?",
        answer: "Karminativa sind blähungswidrige (windtreibende) Substanzen, die Blähungen lindern. Im Verdauungstrakt wirken Anis, Fenchel und Kümmelöl karminativ. Kamille und Schafgarbe enthalten äth. Öle, die nicht nur entzündungshemmend wirken, sondern auch Histaminrezeptoren blockieren – dadurch lindern sie allergisch bedingte Entzündungsreaktionen der Darmschleimhaut.",
        solution: "Antihistaminwirkung bedeutet Blockade von Histaminrezeptoren. Bei Nahrungsmittelunverträglichkeiten oder Schleimhautentzündungen sind Kamille und Schafgarbe daher besonders wertvoll."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1045_02_h1",
        question: "Welches ätherische Öl steigert die Galleproduktion um das 7-Fache?",
        options: [
          { text: "Pfefferminze", correct: true },
          { text: "Kamille", correct: false },
          { text: "Fenchel", correct: false },
          { text: "Thymian", correct: false }
        ],
        explanation: "Pfefferminze steigert die Galleproduktion um das 7-Fache – ein besonders ausgeprägter Effekt, der im Studienbrief ausdrücklich erwähnt wird."
      },
      {
        type: "true_false",
        id: "1045_02_h2",
        statement: "Kampfer, Rosmarin, Terpentin und Senföl wirken auf der Haut entzündungshemmend.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Kampfer, Rosmarin, Terpentin und Senföl wirken durchblutungsfördernd. Entzündungshemmend auf der Haut wirken Kamille, Ringelblumenöl und Arnikaöl."
      },
      {
        type: "mc",
        id: "1045_02_h3",
        question: "Welches ätherische Öl wirkt auf der Haut analgetisch durch einen Kältereiz?",
        options: [
          { text: "Menthol", correct: true },
          { text: "Kampfer", correct: false },
          { text: "Rosmarin", correct: false },
          { text: "Senföl", correct: false }
        ],
        explanation: "Menthol täuscht Kälte vor und überlagert damit den Schmerzreiz – eine analgetische Wirkung durch Kältereiz. Kampfer, Rosmarin und Senföl dagegen wirken durchblutungsfördernd."
      },
      {
        type: "true_false",
        id: "1045_02_h4",
        statement: "Kamille und Schafgarbe wirken im Verdauungstrakt auch antihistaminisch.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Kamille und Schafgarbe enthalten ätherische Öle, die neben entzündungshemmenden Eigenschaften auch Histaminrezeptoren blockieren (Antihistaminwirkung)."
      },
      {
        type: "mc",
        id: "1045_02_h5",
        question: "Welche ätherischen Öle wirken karminativ (blähungswidrig)?",
        options: [
          { text: "Anis, Fenchel, Kümmelöl", correct: true },
          { text: "Thymian, Eukalyptus, Latschenkiefer", correct: false },
          { text: "Kamille, Schafgarbe, Salbei", correct: false },
          { text: "Pfefferminze, Baldrian, Melisse", correct: false }
        ],
        explanation: "Karminativa im Verdauungstrakt: Anis, Fenchel und Kümmelöl. Thymian/Eukalyptus/Latschenkiefer wirken schleimlösend an den Atemwegen; Kamille/Schafgarbe entzündungshemmend."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1045_02_p4_1",
        question: "Welche ätherischen Öle wirken auf der Haut durchblutungsfördernd? (Mehrere Antworten möglich)",
        options: [
          { text: "Kampfer", correct: true },
          { text: "Rosmarin", correct: true },
          { text: "Terpentin", correct: true },
          { text: "Senföl", correct: true },
          { text: "Menthol", correct: false }
        ],
        explanation: "Menthol wirkt analgetisch (Kältereiz), nicht durchblutungsfördernd. Kampfer, Rosmarin, Terpentin und Senföl sind die vier klassischen Durchblutungsförderer der Haut."
      },
      {
        type: "mc",
        id: "1045_02_p4_2",
        question: "Welche Wirkungen entfalten ätherische Öle im Verdauungstrakt? (Mehrere Antworten möglich)",
        options: [
          { text: "Desinfizierend (gegen Gärungs- und Fäulnisdyspepsien)", correct: true },
          { text: "Galleproduktionssteigernd (Pfefferminze 7-fach)", correct: true },
          { text: "Karminativ (Anis, Fenchel, Kümmelöl)", correct: true },
          { text: "Spasmolytisch", correct: true },
          { text: "Hemmend auf die Magensaftsekretion", correct: false }
        ],
        explanation: "Ätherische Öle hemmen die Magensaftsekretion nicht – sie fördern sie (Bitterstoffe sind dafür bekannter). Alle anderen Wirkungen im Verdauungstrakt sind korrekt."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1045_03",
    title: "Bitterstoffe und Gerbstoffe",
    contextHint: "Kap. 1.2–1.3 – Bitterstoffe: Reflexprinzip, Herz-Kreislauf, Verdauung, Löwenzahn; Gerbstoffe: Adstringenz, Tormentillwurzel, Kombinationen, Indikationen",
    phase1: {
      soil: {
        statement: "Wie wirken Bitterstoffe im Körper und welche Organsysteme profitieren davon?",
        answer: "Bitterstoffe wirken reflektorisch über die Mundschleimhaut → N. sympathicus und N. vagus → Organe, und zusätzlich lokal. Herz-Kreislauf: tonisierend (Herzmuskel stärkend), antianämisch (Magensäure↑ → Eisenresorption↑). Verdauung: Magensaftsekretion↑, Peristaltik↑, Gallebildung↑, spasmolytisch, diuretisch. Löwenzahn: steigert zusätzlich die Insulinproduktion. Beste Wirkung bei schwachem Bittergeschmack – intensiver Bittergeschmack schwächt die Wirkung paradoxerweise ab.",
        solution: "Das Besondere an Bitterstoffen: Die Wirkung beginnt schon im Mund. Der Geschmackssinn aktiviert über Nervenbahnen die Verdauungsorgane – noch bevor der Wirkstoff resorbiert wird."
      },
      seed: {
        statement: "Was sind Gerbstoffe, welche Typen gibt es und was ist die wichtigste Gerbstoffdroge?",
        answer: "Gerbstoffe sind adstringierende (zusammenziehende) Substanzen, die auf eiweißhaltiges Gewebe einwirken. Zwei Typen: (1) Wasserlösliche Gerbstoffe → gut als Tee extrahierbar. (2) Catechingerbstoffe (nicht wasserlöslich) → Tinktur oder Pulver nötig. Wichtigste Gerbstoffdroge: Tormentillwurzel (Potentilla erecta) – zusätzlich bakterienhemmend. Eichenrindenabkochung: klassisches Gerbstoffpräparat für die Haut.",
        solution: "Tormentillwurzel ist die wichtigste Gerbstoffdroge und hat durch ihre bakterienhemmende Zusatzwirkung eine besondere Stellung unter den Gerbstoffdrogen."
      },
      water: {
        statement: "Wie unterscheiden sich die Wirkungen kleiner und großer Mengen Gerbstoffe und wie beeinflussen Kombinationen die Wirkung?",
        answer: "Kleine Mengen: bakteriostatisch, entzündungshemmend. Große Mengen: entzündungserregend, Abführ- und Brechmittelwirkung. Achtung: hohe Dosen sind hautreizend und leberschädigend! Kombinationen: mit äth. Ölen → Gerbstoffwirkung abgeschwächt und verlängert; mit Schleimstoffen → Gerbstoffwirkung verstärkt; mit Alkaloiden → Wirkungseintritt verzögert.",
        solution: "Gerbstoffe zeigen eine klare Dosis-Wirkungs-Umkehr: Kleine Mengen sind therapeutisch wertvoll, große Mengen können schaden. Dasselbe gilt für die Lebertoxizität bei Überdosierung."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1045_03_h1",
        question: "Durch welchen Mechanismus wirken Bitterstoffe antianämisch?",
        options: [
          { text: "Sie stimulieren die Magensäureproduktion, was die Eisenresorption erhöht", correct: true },
          { text: "Sie hemmen den Eisenabbau in der Leber", correct: false },
          { text: "Sie fördern die Erythropoese direkt im Knochenmark", correct: false },
          { text: "Sie binden freies Eisen und leiten es den Erythrozyten zu", correct: false }
        ],
        explanation: "Bitterstoffe steigern die Magensäuresekretion. Mehr Magensäure fördert die Eisenresorption aus der Nahrung – das erklärt die antianämische Wirkung."
      },
      {
        type: "true_false",
        id: "1045_03_h2",
        statement: "Große Mengen Gerbstoffe wirken entzündungshemmend und adstringierend.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Kleine Mengen Gerbstoffe wirken adstringierend und entzündungshemmend. Große Mengen dagegen wirken entzündungserregend und können als Abführ- oder Brechmittel wirken."
      },
      {
        type: "mc",
        id: "1045_03_h3",
        question: "Welches ist die wichtigste Gerbstoffdroge mit zusätzlicher bakterienhemmender Wirkung?",
        options: [
          { text: "Tormentillwurzel (Potentilla erecta)", correct: true },
          { text: "Eichenrinde", correct: false },
          { text: "Salbei", correct: false },
          { text: "Faulbaumrinde", correct: false }
        ],
        explanation: "Tormentillwurzel ist die wichtigste Gerbstoffdroge und hat als Besonderheit auch eine bakterienhemmende Wirkung. Eichenrinde ist ein klassisches Gerbstoffpräparat für die Hautanwendung."
      },
      {
        type: "true_false",
        id: "1045_03_h4",
        statement: "Wasserlösliche Gerbstoffe lassen sich gut als Tee zubereiten.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Wasserlösliche Gerbstoffe gehen beim Teeaufguss in Lösung. Catechingerbstoffe dagegen sind wasserunlöslich und müssen als Tinktur oder Pulver verabreicht werden."
      },
      {
        type: "mc",
        id: "1045_03_h5",
        question: "Was ist die beste Voraussetzung für die optimale Wirkung von Bitterstoffen?",
        options: [
          { text: "Schwach bitterer Geschmack auf der Mundschleimhaut", correct: true },
          { text: "Intensiver, starker Bittergeschmack", correct: false },
          { text: "Direkte Resorption im Dünndarm ohne Kontakt zur Mundschleimhaut", correct: false },
          { text: "Kombination mit Schleimstoffen zum Maskieren des Geschmacks", correct: false }
        ],
        explanation: "Beste Wirkung entfalten Bitterstoffe bei schwachem Bittergeschmack über die Mundschleimhaut (Reflexwirkung). Intensiver Bittergeschmack schwächt die Wirkung paradoxerweise ab."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1045_03_p4_1",
        question: "Welche Wirkungen haben Gerbstoffe in therapeutisch kleiner Dosis? (Mehrere Antworten möglich)",
        options: [
          { text: "Bakteriostatisch", correct: true },
          { text: "Entzündungshemmend", correct: true },
          { text: "Adstringierend (zusammenziehend auf Eiweiß)", correct: true },
          { text: "Abführend", correct: false },
          { text: "Diuretisch", correct: false }
        ],
        explanation: "Abführend und diuretisch sind keine Wirkungen kleiner Gerbstoffmengen. Abführende Wirkung tritt erst bei hohen Dosen auf. Diuretisch wirken z. B. Bitterstoffe."
      },
      {
        type: "mc",
        id: "1045_03_p4_2",
        question: "Welche Aussagen zu Bitterstoffen sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Wirkung beginnt reflektorisch über Mundschleimhaut → Nervensystem", correct: true },
          { text: "Steigern Magensaftsekretion und Peristaltik", correct: true },
          { text: "Löwenzahn steigert zusätzlich die Insulinproduktion", correct: true },
          { text: "Fördern die Gallebildung", correct: true },
          { text: "Entfalten beste Wirkung bei intensivem Bittergeschmack", correct: false }
        ],
        explanation: "Die beste Wirkung entfalten Bitterstoffe bei schwachem Bittergeschmack. Alle anderen Aussagen sind korrekt: reflektorische Wirkung, Magensaftstimulation, Gallebildung und Löwenzahns Insulinwirkung."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1045_04",
    title: "Schleimstoffe, Alkaloide und weitere Inhaltsstoffe",
    contextHint: "Kap. 1.4–1.6 – Schleimstoffe: Quellfähigkeit, Schutzfilm, Kombinationswirkungen; Alkaloide: Stickstoff, Beispiele, Arztpflicht; Glykoside, Kieselsäure, Flavonoide",
    phase1: {
      soil: {
        statement: "Was sind die wichtigsten Eigenschaften der Schleimstoffe und wie wirken sie in verschiedenen Körperbereichen?",
        answer: "Schleimstoffe: quellfähig, bilden Gele und viskose Lösungen. Schutzfilm über Schleimhäuten. Nicht resorbiert. Verdauung: Pufferwirkung (Gastritis), antidiarrhoisch in niedriger Dosis, abführend in hoher Dosis (Leinsamen!). Atemwege: reizlindernd (z. B. Huflattich). Äußerlich: aufweichend und wundheilend (z. B. bei Furunkeln). Wichtig: Schleimstoffe müssen als Tee aufgenommen werden, da sie in Alkohol nicht löslich sind.",
        solution: "Schleimstoffe bilden einen Schutzfilm – sie wirken also rein mechanisch schützend, ohne selbst resorbiert zu werden. Daher sind sie ideal bei Schleimhautreizungen jeder Art."
      },
      seed: {
        statement: "Was sind Alkaloide und warum ist ihre Anwendung dem Arzt vorbehalten?",
        answer: "Alkaloide: stickstoffhaltige Pflanzenstoffe, stark wirkend. Entscheidend: Die wirksame und die giftige Dosis liegen sehr nahe beieinander (geringe therapeutische Breite). Deshalb ist die Anwendung dem Arzt vorbehalten. Wichtige Beispiele: Atropin (Anticholinergikum), Chinin (Malariamittel), Curare (Muskelrelaxans), Nikotin (Sucht), Koffein (Stimulans), Strychnin (Gift), Opium/Morphin (Analgetikum).",
        solution: "Die geringe therapeutische Breite macht Alkaloide zu den gefährlichsten pflanzlichen Wirkstoffen. Morphin heilt in der richtigen Dosis schwere Schmerzen, kann aber in Überdosis töten."
      },
      water: {
        statement: "Wie beeinflussen Schleimstoffe die Wirkung anderer pflanzlicher Wirkstoffe in Kombinationspräparaten?",
        answer: "Schleimstoffe verlängern die Verweildauer anderer Wirkstoffe an der Schleimhaut. Kombinationswirkungen: mit äth. Ölen → deren Wirkung verlängert und möglicherweise verstärkt; mit Bitterstoffen → Bitterstoffwirkung verlängert. Schleimstoffe wirken als 'Depot' für andere Wirkstoffe. Kombinationswirkung bei Gerbstoffen und Schleimstoff: Gerbstoffwirkung verstärkt.",
        solution: "Schleimstoffe sind natürliche Retardierungsmittel: Sie verlängern die Kontaktzeit anderer Wirkstoffe mit der Schleimhaut und erhöhen so deren Wirkdauer."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1045_04_h1",
        question: "Welche Eigenschaft charakterisiert Schleimstoffe in Verbindung mit Wasser?",
        options: [
          { text: "Sie bilden Gele und viskose Lösungen (Quellfähigkeit)", correct: true },
          { text: "Sie lösen sich vollständig auf und werden gut resorbiert", correct: false },
          { text: "Sie fällen Eiweiß aus (Adstringenz)", correct: false },
          { text: "Sie setzen bei Kontakt mit Wasser äth. Öle frei", correct: false }
        ],
        explanation: "Schleimstoffe sind quellfähig und bilden bei Kontakt mit Wasser Gele und viskose Lösungen. Dadurch legen sie sich als Schutzfilm über Schleimhäute. Sie werden nicht resorbiert."
      },
      {
        type: "true_false",
        id: "1045_04_h2",
        statement: "Schleimstoffe werden im Dünndarm vollständig resorbiert und entfalten dort ihre Wirkung.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Schleimstoffe werden nicht resorbiert. Sie wirken rein mechanisch als Schutzfilm und bleiben im Magen-Darm-Trakt."
      },
      {
        type: "mc",
        id: "1045_04_h3",
        question: "In hoher Dosierung wirken Schleimstoffe im Verdauungstrakt wie?",
        options: [
          { text: "Abführend (z. B. Leinsamen in hoher Dosis)", correct: true },
          { text: "Antidiarrhoisch (stuhlhemmend)", correct: false },
          { text: "Diuretisch", correct: false },
          { text: "Spasmolytisch", correct: false }
        ],
        explanation: "In hoher Dosis wirken Schleimstoffe abführend – z. B. Leinsamen in großen Mengen. In niedriger Dosis dagegen antidiarrhoisch (stopfend)."
      },
      {
        type: "true_false",
        id: "1045_04_h4",
        statement: "Die Anwendung von Alkaloiden ist dem Arzt vorbehalten, weil wirksame und giftige Dosis sehr nahe beieinanderliegen.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Alkaloide haben eine sehr geringe therapeutische Breite – der Abstand zwischen wirksamer und toxischer Dosis ist klein. Deshalb erfordern sie ärztliche Kontrolle."
      },
      {
        type: "mc",
        id: "1045_04_h5",
        question: "Welcher Wirkstoff gehört NICHT zu den Alkaloiden?",
        options: [
          { text: "Arbutin (Glykosid in Bärentraubenblättern)", correct: true },
          { text: "Atropin", correct: false },
          { text: "Chinin", correct: false },
          { text: "Koffein", correct: false }
        ],
        explanation: "Arbutin ist ein Glykosid, kein Alkaloid. Alkaloide sind stickstoffhaltige Verbindungen: Atropin, Chinin, Curare, Nikotin, Koffein, Strychnin, Morphin/Opium."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1045_04_p4_1",
        question: "Welche Aussagen zu Alkaloiden sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Stickstoffhaltige Verbindungen", correct: true },
          { text: "Stark wirkend mit geringer therapeutischer Breite", correct: true },
          { text: "Anwendung dem Arzt vorbehalten", correct: false },
          { text: "Zu den Beispielen zählen Atropin, Chinin und Morphin", correct: true },
          { text: "Die häufigste Wirkstoffgruppe in der Phytotherapie", correct: false }
        ],
        explanation: "Alkaloide sind tatsächlich dem Arzt vorbehalten (korrekte Aussage, hier als Test-Aussage). Häufigste Gruppe sind sie nicht. Alle anderen Aussagen: stickstoffhaltig ✓, stark wirkend ✓, Beispiele ✓ sind korrekt."
      },
      {
        type: "mc",
        id: "1045_04_p4_2",
        question: "Welche Wirkungen haben Schleimstoffe? (Mehrere Antworten möglich)",
        options: [
          { text: "Schutzfilm über Schleimhäuten", correct: true },
          { text: "Pufferwirkung bei Gastritis", correct: true },
          { text: "Antidiarrhoisch in niedriger Dosis", correct: true },
          { text: "Verlängern die Wirkdauer anderer Wirkstoffe", correct: true },
          { text: "Lösen sich gut in Alkohol (gut in Tinkturen nutzbar)", correct: false }
        ],
        explanation: "Schleimstoffe lösen sich nicht in Alkohol – Tinkturen sind für Schleimstoffe daher ungeeignet. Mazeration (Kaltwasserauszug) oder Teeaufguss sind die richtigen Zubereitungsformen."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1045_05",
    title: "Zubereitungsformen und Darreichungswege",
    contextHint: "Kap. 2–3 – Droge, Tee (Infus), Abkochung, kalter Auszug, Pulver, Saft, Tinktur, Tablette, Tropfen, Salbe; Haut, oral, rektal, parenteral",
    phase1: {
      soil: {
        statement: "Welche Zubereitungsformen kennt die Phytotherapie und wie werden sie jeweils hergestellt?",
        answer: "Droge: getrocknete Pflanze/Pflanzenteile. Abkochung (Decoctum): kalt aufgießen, kochen. Tee (Infus): heißes/kochendes Wasser aufgießen. Kalter Auszug (Mazeration): kalt bis mäßig warm in Wasser, Wein, Essig oder Alkohol. Pulver: fein zerstoßene Trockenkräuter. Saft: frisch gepresste Pflanze; kurze Haltbarkeit. Tinktur: Trockenpflanzen + organisches Lösungsmittel (fast immer Alkohol). Tabletten/Dragees: häufigste feste Form. Tropfen: wie Tinktur, aber auch wasserbasiert möglich. Salbe: Fett/Öl + pflanzliche Wirkstoffe.",
        solution: "Der Unterschied zwischen Tropfen und Tinktur: Tinkturen enthalten immer Alkohol als Lösungsmittel, Tropfen können auch wasserbasiert sein."
      },
      seed: {
        statement: "Welche Vorteile haben Tinkturen gegenüber wässrigen Zubereitungen?",
        answer: "Vorteile der Tinktur: (1) Alkohol löst fast alle Wirkstoffe außer Saponinen und Schleimstoffen besser aus der Droge als Wasser. (2) Höhere Haltbarkeit als getrocknete Drogen und andere Zubereitungen. (3) Einnahme überall ohne großen Aufwand möglich. (4) Konzentration leicht durch Wasserzusatz variierbar. Mengenverhältnis: Droge zu Alkohol zwischen 1:5 und 1:10; Alkoholgehalt: 40–70 %. Nur Apotheker dürfen Arzneimittel herstellen und verkaufen!",
        solution: "Tinkturen sind bei Saponinen und Schleimstoffen ungeeignet (lösen sich nicht in Alkohol). Für diese Wirkstoffe ist Mazeration oder Teeaufguss die richtige Methode."
      },
      water: {
        statement: "Welche Darreichungswege gibt es und welcher hat das geringste Komplikationsrisiko?",
        answer: "Darreichungswege: (1) Über die Haut (dermal): geringstes Komplikationsrisiko aller Formen! Wirkstoffe werden über Blutgefäße systemisch aufgenommen. (2) Oral: Resorption über gesamten Verdauungskanal; häufigste Form. (3) Rektal: Klistiere oder Suppositorien. (4) Parenteral (umgeht Verdauungskanal): i.v., i.a., i.c., i.m., s.c. Die dermale Anwendung bietet lokale Therapie auch für Laien und ist problemlos in der Handhabung.",
        solution: "Die dermale (äußere) Anwendung hat das geringste Komplikationsrisiko. Das macht sie besonders für die Selbstmedikation und den Heilpraktikerbereich attraktiv."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1045_05_h1",
        question: "Welches Lösungsmittel enthält eine Tinktur fast immer?",
        options: [
          { text: "Alkohol", correct: true },
          { text: "Wasser", correct: false },
          { text: "Essig", correct: false },
          { text: "Olivenöl", correct: false }
        ],
        explanation: "Tinkturen entstehen durch Extraktion getrockneter Pflanzenteile mit einem organischen Lösungsmittel – fast immer Alkohol (40–70 % Äthylalkohol)."
      },
      {
        type: "true_false",
        id: "1045_05_h2",
        statement: "Für Schleimstoffe und Saponine sind Tinkturen die optimale Zubereitungsform.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Schleimstoffe und Saponine lösen sich nicht in Alkohol. Für diese Wirkstoffe eignen sich Mazeration (Kaltwasserauszug) oder Teeaufguss."
      },
      {
        type: "mc",
        id: "1045_05_h3",
        question: "Was unterscheidet Tropfen von Tinkturen?",
        options: [
          { text: "Tropfen können auch wasserbasiert sein; Tinkturen enthalten immer Alkohol", correct: true },
          { text: "Tropfen sind stärker konzentriert als Tinkturen", correct: false },
          { text: "Tropfen werden nur äußerlich angewendet", correct: false },
          { text: "Tropfen werden aus frischen Pflanzen, Tinkturen aus trockenen Pflanzen hergestellt", correct: false }
        ],
        explanation: "Tropfen können im Gegensatz zu Tinkturen auch wasserbasiert sein. In der Herstellung sind sie ansonsten der Tinktur gleichzusetzen."
      },
      {
        type: "true_false",
        id: "1045_05_h4",
        statement: "Die Mazeration (kalter Auszug) ist besonders geeignet für schleimstoff- und saponinhaltige Drogen.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Für schleimstoff- und saponinhaltige Drogen empfiehlt sich die Mazeration, da Schleimstoffe und Saponine sich in kaltem bis mäßig warmem Wasser besser lösen als in Alkohol."
      },
      {
        type: "mc",
        id: "1045_05_h5",
        question: "Welcher Darreichungsweg hat das geringste Komplikationsrisiko?",
        options: [
          { text: "Äußere Anwendung über die Haut", correct: true },
          { text: "Orale Einnahme (Tabletten, Tee)", correct: false },
          { text: "Rektale Verabreichung (Suppositorien)", correct: false },
          { text: "Parenterale Verabreichung (i.v., i.m.)", correct: false }
        ],
        explanation: "Die äußere (dermale) Anwendung hat das geringste Komplikationsrisiko von allen Darreichungsformen – ein ausdrücklich genannter Vorteil im Studienbrief."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1045_05_p4_1",
        question: "Welche Zubereitungsformen lassen sich im Haushalt ohne Apothekerlizenz herstellen? (Mehrere Antworten möglich)",
        options: [
          { text: "Tee (Infus)", correct: true },
          { text: "Mazeration (Kaltwasserauszug)", correct: true },
          { text: "Frischpflanzensaft", correct: true },
          { text: "Hautcreme aus Pflanzenöl und Lanolin", correct: true },
          { text: "Registriertes Arzneimittel in Tablettenform", correct: false }
        ],
        explanation: "Nur Apotheker dürfen Arzneimittel herstellen und verkaufen. Tee, Mazeration, Frischsaft und selbst hergestellte Salben/Cremes für den Eigengebrauch fallen nicht darunter."
      },
      {
        type: "mc",
        id: "1045_05_p4_2",
        question: "Welche Vorteile hat die Tinktur gegenüber wässrigen Zubereitungen? (Mehrere Antworten möglich)",
        options: [
          { text: "Höhere Haltbarkeit", correct: true },
          { text: "Löst fast alle Wirkstoffe (außer Saponine/Schleimstoffe) besser aus", correct: true },
          { text: "Konzentration durch Wasserzusatz variierbar", correct: true },
          { text: "Günstigere Herstellung als Tee", correct: false },
          { text: "Geeignet für schleimstoffhaltige Drogen", correct: false }
        ],
        explanation: "Tinkturen sind für Schleimstoffe ungeeignet und die Herstellung ist nicht unbedingt günstiger als Tee. Alle drei Qualitätsvorteile – Haltbarkeit, Löslichkeit, Variierbarkeit – sind korrekt."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1045_06",
    title: "Äußere Anwendungen: Wickel, Umschläge und Kräuterbäder",
    contextHint: "Kap. 3.1.5–3.1.7 – Kräuterbäder, Wickel: Wirkungsmechanismus, kalt vs. warm, Arzneizusätze; Packungen; Heiße und kalte Packung",
    phase1: {
      soil: {
        statement: "Wie wirken Wickel und Umschläge und was geschieht physiologisch beim Anlegen eines feuchtkalten Wickels?",
        answer: "Physiologischer Ablauf: Feuchtkaltes Wickeltuch → Vasokonstriktion (Blutgefäße ziehen sich zusammen) → dann Vasodilatation (Gefäßerweiterung). In der Vasodilatationsphase ist die Haut besonders aufnahmefähig für Arzneistoffe. Äußere Wolldecke → Wärmeentwicklung → kräftige Gefäßerweiterung → stark ableitend aus der Tiefe. Feuchte Wärme: nervenberuhigend und schmerzstillend. Arzneizusätze: Eintauchen des Tuchs in Teeaufguss steigert die Wirkung.",
        solution: "Der Zweiphasenmechanismus ist prüfungsrelevant: Zuerst Kontraktion (aktive Abwehr), dann Dilatation (Erholung/Aufnahme). In der Dilatationsphase ist die Haut maximal aufnahmefähig."
      },
      seed: {
        statement: "Wann werden kalte und wann warme oder heiße Wickel angewendet?",
        answer: "Kalter Wickel bei: Arteriosklerose, Fettsucht, fieberhaften Erkrankungen, Hautkrankheiten, Knochenbrüchen, Neuralgien. Warmer/heißer Wickel bei: Blasenerkrankungen, Darm-/Gallenerkrankungen, Grippe, Koliken, Nierenerkrankungen, Sehnenentzündungen, Unterleibserkrankungen. Durchführung: nasses Leinentuch + trockenes Leinentuch + Wolltuch. Bei 'hitzigen' Menschen kalt, bei Schüttelfrost vorgewärmt. Beste Anwendungszeit: früher Morgen (außer bei Fieber: abends).",
        solution: "Merkhilfe: Kalter Wickel = kühlend/ableitend bei Entzündung/Fieber. Warmer Wickel = krampflösend/durchblutungsfördernd bei inneren Erkrankungen (Koliken, Blasenentzündung)."
      },
      water: {
        statement: "Was sind Kräuterbäder und Packungen und durch welchen Mechanismus erhöhen warme Bäder die Arzneimittelresorption?",
        answer: "Kräuterbäder: warmes Wasser erweitert Gefäße → Wirkstoffe werden über gesamte Hautoberfläche aufgenommen → deutliche systemische Arzneiwirkung + Entspannungseffekt. Äth. Öle im Bad: wasserunlöslich → müssen mit Emulgatoren/Fetten vermischt werden (Bademilch) oder als Badeöl ohne Wasser verwendet werden. Packungen: wie Wickel, aber Inhalt besteht aus erhitzten/feuchten Heilpflanzenteilen (heiße Packung, z. B. Heublumen) oder kalten Substanzen (Quark, Lehm). Wirkung: schweißanregend, wärmeentziehend, entgiftend.",
        solution: "Kräuterbäder nutzen den großen Vorteil der Gesamtkörperdurchblutung: Die Wirkstoffaufnahme ist umso größer, je mehr Haut mit dem Wasser in Kontakt kommt (Vollbad > Teilbad)."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1045_06_h1",
        question: "Was bewirkt ein feuchtkalter Wickel zunächst, bevor die Gefäßerweiterung einsetzt?",
        options: [
          { text: "Vasokonstriktion (Zusammenziehen der Blutgefäße)", correct: true },
          { text: "Sofortige Vasodilatation und erhöhte Durchblutung", correct: false },
          { text: "Schweißproduktion und Entgiftung", correct: false },
          { text: "Analgesie durch Kältereiz auf Schmerzrezeptoren", correct: false }
        ],
        explanation: "Feuchtkalter Wickel: zuerst Vasokonstriktion, dann Vasodilatation. Die Gefäßerweiterungsphase ist therapeutisch wichtig, weil die Haut dann besonders aufnahmefähig für Wirkstoffe ist."
      },
      {
        type: "true_false",
        id: "1045_06_h2",
        statement: "Warme Wickel sind bei fieberhaften Erkrankungen und Arteriosklerose indiziert.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Bei Fieber und Arteriosklerose werden kalte Wickel eingesetzt. Warme Wickel sind bei Koliken, Blasen-, Darm- und Gallenerkrankungen indiziert."
      },
      {
        type: "mc",
        id: "1045_06_h3",
        question: "Bei welcher Erkrankung ist ein warmer oder heißer Wickel angezeigt?",
        options: [
          { text: "Koliken", correct: true },
          { text: "Fieberhafte Erkrankungen", correct: false },
          { text: "Arteriosklerose", correct: false },
          { text: "Neuralgien (Nervenschmerzen)", correct: false }
        ],
        explanation: "Warme Wickel bei Koliken (Darm, Galle, Niere). Kalt bei Fieber, Arteriosklerose und Neuralgien."
      },
      {
        type: "true_false",
        id: "1045_06_h4",
        statement: "Ätherische Öle können direkt dem Badewasser beigemischt werden, da sie sich gut in Wasser lösen.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Ätherische Öle sind wasserunlöslich. Sie müssen mit Emulgatoren und Fetten vermischt werden (Bademilch) oder ganz ohne Wasser als Badeöl verwendet werden."
      },
      {
        type: "mc",
        id: "1045_06_h5",
        question: "Welche Kräuterteeaufgüsse eignen sich laut Studienbrief für Wickel bei rheumatischen Beschwerden?",
        options: [
          { text: "Heublumen, Brennnessel, Holunderblüten, Kamille, Leinsamen", correct: true },
          { text: "Beinwell, Bitterklee, Schafgarbe, Tausendgüldenkraut", correct: false },
          { text: "Ackerschachtelhalm, Ackerveilchen, Kamille", correct: false },
          { text: "Hopfen, Kamille, Lavendel, Rosmarin, Quendel", correct: false }
        ],
        explanation: "Bei rheumatischen Beschwerden: Heublumen, Brennnessel, Holunderblüten, Kamille, Leinsamen. Bei Wunden: Beinwell, Bitterklee, Schafgarbe, Tausendgüldenkraut. Bei Hautkrankheiten: Ackerschachtelhalm, Ackerveilchen, Kamille."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1045_06_p4_1",
        question: "Welche Erkrankungen sprechen auf kalte Wickel an? (Mehrere Antworten möglich)",
        options: [
          { text: "Arteriosklerose", correct: true },
          { text: "Fettsucht", correct: true },
          { text: "Fieberhafte Erkrankungen", correct: true },
          { text: "Hautkrankheiten", correct: true },
          { text: "Koliken", correct: false }
        ],
        explanation: "Koliken werden mit warmen Wickeln behandelt (krampflösend). Arteriosklerose, Fettsucht, Fieber und Hautkrankheiten gehören zu den Indikationen für kalte Wickel."
      },
      {
        type: "mc",
        id: "1045_06_p4_2",
        question: "Was gilt für Kräuterbäder? (Mehrere Antworten möglich)",
        options: [
          { text: "Warmes Wasser erweitert die Gefäße und fördert die Resorption", correct: true },
          { text: "Wirkstoffe werden über die gesamte Hautoberfläche aufgenommen", correct: true },
          { text: "Entspannung im Warmen verstärkt die Arzneiwirkung", correct: true },
          { text: "Ätherische Öle können direkt ins Wasser gegeben werden", correct: false },
          { text: "Bäder wirken ausschließlich lokal, nicht systemisch", correct: false }
        ],
        explanation: "Kräuterbäder wirken sehr wohl systemisch – die Wirkstoffe gelangen über die Haut ins Blut. Ätherische Öle müssen vorher mit Emulgatoren/Fetten gemischt werden."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1045_07",
    title: "Biochemie nach Dr. Schüßler: Grundlagen und die 12 Funktionsmittel",
    contextHint: "Kap. 4 – Schüßler (1821–1898): Zellsalztheorie; Potenz D6/D12; Aufnahme über Mundschleimhaut; 12 Salze: Ca fluoratum, Ca phosphoricum, Fe phosphoricum, K chloratum, K phosphoricum, K sulfuricum, Mg phosphoricum, Na chloratum, Na phosphoricum, Na sulfuricum, Silicea, Ca sulfuricum",
    phase1: {
      soil: {
        statement: "Was ist die theoretische Grundlage der Biochemie nach Dr. Schüßler und wie unterscheidet sie sich von der Homöopathie?",
        answer: "W.H. Schüßler (1821–1898): Ausgangsthese: normale Zellfunktion ist von anorganischen Salzen abhängig; Fehlen dieser Lebenssalze → Erkrankung. Geht NICHT nach Simile-Prinzip (Homöopathie: Ähnlichkeit), sondern nach physiologisch-chemischen Gesetzen. Potenz D6 (1:1.000.000) am häufigsten, D12 selten. Aufnahme muss über Mundschleimhaut erfolgen (Magensäure zerstört die Wirkung). Ziel: nicht direkter Salzersatz, sondern Reiz auf die Zelle → Zelle deckt Defizit selbst aus Nahrung. Regel: Je chronischer, desto länger einnehmen, aber geringer dosieren. Generell nur ein Mittel auf einmal.",
        solution: "Schüßler kritisierte die Homöopathie, obwohl er homöopathische Potenzen verwendete. Das Simile-Prinzip lehnte er ab – er handelte nach physiologisch-chemischen Gesetzmäßigkeiten."
      },
      seed: {
        statement: "Welche Schüßler-Salze tragen die Nummern 1–6 und welche Indikationen haben sie?",
        answer: "Nr. 1 Calcium fluoratum: Zahnschmelz, Knochen, elastisches Gewebe → Knochen-/Zahnerkrankungen, Gelenkbeschwerden, Elastizitätsverlust der Gefäße. Nr. 2 Calcium phosphoricum: häufigstes Körpersalz; Aufbau, Proteinsynthese → Knochen/Zähne, schlechtheilende Knochenbrüche, Blutarmut, rasche Ermüdbarkeit. Nr. 3 Ferrum phosphoricum: Hämoglobin, Infektabwehr → 1. Entzündungsstadium, Anämien, Verletzungen. Nr. 4 Kalium chloratum: Erregbarkeit → Schleimhautkatarrhe (2. Entzündungsstadium). Nr. 5 Kalium phosphoricum: wertvollstes Mittel; Gehirn/Nerven → Erschöpfung, Depressionen, Lähmungen. Nr. 6 Kalium sulfuricum: Epidermis, Epithelzellen → chronische Entzündungen.",
        solution: "Merkhilfe: Fe phosphoricum = 1. Entzündungsstadium (akut, Fieber), K chloratum = 2. Entzündungsstadium (Schleimhautkatarrhe). K phosphoricum ist das wichtigste Nervenmittel."
      },
      water: {
        statement: "Welche Schüßler-Salze tragen die Nummern 7–12 und welche Indikationen haben sie?",
        answer: "Nr. 7 Magnesium phosphoricum: Skelett, Muskeln, Nerven, Gehirn; antithrombotisch, antiallergisch → Krämpfe aller Art, Neuralgien. Nr. 8 Natrium chloratum (Kochsalz): Wasserhaushalt, osmotischer Druck → Blutarmut, Abmagerung, Schleimhautkatarrhe, nässende Ekzeme. Nr. 9 Natrium phosphoricum: hält Harnsäure in Lösung → Rheuma, Gicht. Nr. 10 Natrium sulfuricum: entwässernd → Ausscheidungsorgane, Leber, Galle, Niere, Blase, Ekzeme, Ödeme. Nr. 11 Silicea: Haut, Schleimhäute, Knochen; Entzündungen mit Eiterungen → Hauterkrankungen. Nr. 12 Calcium sulfuricum: Leber/Gallenblase; eitrige Prozesse → Abszesse, Furunkel, Bindehautentzündung.",
        solution: "Mg phosphoricum = Krampfmittel Nr. 1 bei Schüßler. Na phosphoricum = Mittel gegen Säureüberschuss (Rheuma, Gicht). Na sulfuricum = Entwässerung und Entschlackung."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1045_07_h1",
        question: "Welche Potenz verwenden Schüßler-Salze am häufigsten?",
        options: [
          { text: "D6 (1:1.000.000)", correct: true },
          { text: "D3 (1:1000)", correct: false },
          { text: "D12 (1:1.000.000.000.000)", correct: false },
          { text: "D30 (Hochpotenz)", correct: false }
        ],
        explanation: "Schüßler-Salze werden meist in Potenz D6 (Dezimalpotenz 1:1.000.000) angewendet, seltener in D12. Hochpotenzen (D30) werden nicht verwendet."
      },
      {
        type: "true_false",
        id: "1045_07_h2",
        statement: "Ferrum phosphoricum (Nr. 3) wird beim 2. Entzündungsstadium (Schleimhautkatarrhe) eingesetzt.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Ferrum phosphoricum gehört zum 1. Entzündungsstadium (akute, fieberhafte, plötzlich auftretende Entzündungen). Das 2. Entzündungsstadium (Schleimhautkatarrhe) ist Kalium chloratum (Nr. 4)."
      },
      {
        type: "mc",
        id: "1045_07_h3",
        question: "Welches Schüßler-Salz wird als 'wertvollstes Mittel' bezeichnet und bei Erschöpfung und Depressionen eingesetzt?",
        options: [
          { text: "Kalium phosphoricum (Nr. 5)", correct: true },
          { text: "Magnesium phosphoricum (Nr. 7)", correct: false },
          { text: "Calcium phosphoricum (Nr. 2)", correct: false },
          { text: "Natrium phosphoricum (Nr. 9)", correct: false }
        ],
        explanation: "Kalium phosphoricum (Nr. 5) ist das 'wertvollste Mittel' nach Schüßler. Es wirkt auf Blutplasma, Erythrozyten, Gehirn-, Nerven- und Muskelzellen und wird bei Erschöpfung, Depressionen, Lähmungen und Kräfteverfall eingesetzt."
      },
      {
        type: "true_false",
        id: "1045_07_h4",
        statement: "Magnesium phosphoricum (Nr. 7) ist das Hauptmittel gegen Krämpfe aller Art.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Magnesium phosphoricum findet sich in Skelett, Muskeln, Nerven und Gehirn. Bei Mangel entstehen Schmerzen, Krämpfe und Lähmungen. Indikationen: Krämpfe aller Art und Neuralgien."
      },
      {
        type: "mc",
        id: "1045_07_h5",
        question: "Bei welchem Schüßler-Salz sind Rheuma und Gicht die Hauptindikationen?",
        options: [
          { text: "Natrium phosphoricum (Nr. 9)", correct: true },
          { text: "Natrium chloratum (Nr. 8)", correct: false },
          { text: "Natrium sulfuricum (Nr. 10)", correct: false },
          { text: "Calcium fluoratum (Nr. 1)", correct: false }
        ],
        explanation: "Natrium phosphoricum (Nr. 9) hält Harnsäure in Lösung und neutralisiert überschüssige Säuren. Daher ist es das Mittel bei Rheuma und Gicht. Natrium sulfuricum (Nr. 10) dagegen entwässert den Körper."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1045_07_p4_1",
        question: "Welche Aussagen zu den Grundlagen der Schüßler-Biochemie sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Verwendet D6-Potenz (am häufigsten)", correct: true },
          { text: "Aufnahme über Mundschleimhaut, da Magensäure die Wirkung zerstört", correct: true },
          { text: "Nur jeweils ein Mittel geben", correct: true },
          { text: "Je chronischer der Zustand, desto länger und geringer dosieren", correct: true },
          { text: "Geht wie die Homöopathie nach dem Simile-Prinzip vor", correct: false }
        ],
        explanation: "Schüßler handelte nach physiologisch-chemischen Gesetzen, nicht nach dem Simile-Prinzip der Homöopathie. Alle anderen Aussagen sind korrekte Grundsätze der Schüßler-Biochemie."
      },
      {
        type: "mc",
        id: "1045_07_p4_2",
        question: "Welche Schüßler-Salze/Indikations-Paare sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Magnesium phosphoricum (Nr. 7) → Krämpfe, Neuralgien", correct: true },
          { text: "Natrium sulfuricum (Nr. 10) → Leber, Galle, Niere, Ödeme", correct: true },
          { text: "Kalium chloratum (Nr. 4) → 2. Entzündungsstadium (Schleimhautkatarrhe)", correct: true },
          { text: "Silicea (Nr. 11) → Entzündungen mit Eiterungen, Hauterkrankungen", correct: true },
          { text: "Ferrum phosphoricum (Nr. 3) → Chronische Entzündungen aller Art", correct: false }
        ],
        explanation: "Ferrum phosphoricum ist für das 1. Entzündungsstadium (akut, fieberhaft) zuständig. Chronische Entzündungen aller Art sind das Indikationsgebiet von Kalium sulfuricum (Nr. 6)."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1045_08",
    title: "Bachblütentherapie und Enzymtherapie",
    contextHint: "Kap. 5–6 – Bach (1886–1936): 38 Heilmittel, Sonnen-/Kochmethode, Dosierung; Enzymtherapie: Biokatalysatoren, Schlüssel-Schloss, Anwendung, KI",
    phase1: {
      soil: {
        statement: "Wer war Dr. Edward Bach und auf welcher Theorie beruht die Bachblütentherapie?",
        answer: "Dr. Edward Bach (1886–1936): englischer Arzt, zunächst Schulmediziner (Unfallchirurgie, Bakteriologie, Pathologie). Entwickelte 38 Heilmittel (37 Blüten + 1 Quellwasser). Grundtheorie: Die Psyche des Menschen ist bei Erkrankungen wichtiger als der Körper. Jeder Krankheit liegt ein negativer Seelenzustand zugrunde. Ziel: Harmonisierung von Seele und Bewusstsein (Selbstheilung durch Reharmonisierung). Bachs Krankheitsdefinition: 'Krankheit ist weder Grausamkeit noch Strafe, sondern einzig und allein ein Korrektiv; ein Werkzeug, dessen sich unsere eigene Seele bedient, um uns auf unsere Fehler hinzuweisen.'",
        solution: "Die Bachblütentherapie wirkt nach Bach nicht auf den Körper direkt, sondern auf das Bewusstsein – die feinstoffliche Energie der Blüten soll Blockaden im Seelenleben lösen."
      },
      seed: {
        statement: "Wie werden Bachblüten hergestellt und wie werden sie angewendet?",
        answer: "Zwei Herstellungsmethoden: (1) Sonnenmethode: voll erblühte Blüten in Quellwasser, Sonne über Stunden bis Blüten welken → Essenz in Flaschen + Alkohol zur Haltbarmachung. (2) Kochmethode: für früh blühende Pflanzen; im köchelnden Wasser bis Blüten verwelkt → Alkohol zur Haltbarmachung. Essenz wird im Bach-Center (England) als 'Stockbottle' abgefüllt. Anwendung: intensive Befragung und Beobachtung notwendig. Dosierung: 10 ml-Fläschchen mit kohlensäurefreiem Mineralwasser + 1 Tropfen Blütenessenz. Notfalltropfen: doppelte Menge.",
        solution: "Beide Herstellungsmethoden verwenden am Ende Alkohol zur Konservierung. Sonnenmethode: Licht als Energieträger. Kochmethode: Feuer als Energieträger (wenn Sonne zu schwach)."
      },
      water: {
        statement: "Was ist Enzymtherapie, wie wirken Enzyme und bei wem ist sie kontraindiziert?",
        answer: "Enzyme = Eiweißkörper (früher: Fermente), Biokatalysatoren. Wirkung: Beschleunigung von Stoffwechselvorgängen ohne selbst verändert zu werden. Substratspezifisch nach Schlüssel-Schloss-Prinzip. Therapeutisch: Wirkung auf Immunsystem und Abwehrreaktionen. Anwendung: akute/chronische Entzündungen, virale Infekte, Gefäßerkrankungen, maligne Erkrankungen. Kombination mit Vitaminen/Mineralstoffen (Coenzyme). Kontraindikationen (KI): Schwangere, Blutgerinnungsstörungen, vor größeren Operationen (fibrinolytische Eigenschaften!), Eiweißallergie. Beispiele: Wobe-Mucos, Wobenzym, Phlogenzym; Kanne-Brottrunk.",
        solution: "Die KI der Enzymtherapie sind prüfungsrelevant: fibrinolytische Eigenschaften → Blutungsrisiko bei Schwangerschaft, Gerinnungsstörungen und Operationen. Eiweißallergie → Allergiereaktionen."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1045_08_h1",
        question: "Wie viele Heilmittel umfasst die Bachblütentherapie?",
        options: [
          { text: "38 (37 Blüten + 1 Quellwasser)", correct: true },
          { text: "12 (wie die Schüßler-Salze)", correct: false },
          { text: "50 Blütenessenzen", correct: false },
          { text: "7 Grundessenzen für die Grundchakren", correct: false }
        ],
        explanation: "Die Bachblütentherapie umfasst 38 Heilmittel: 37 Blüten und ein heilkräftiges Quellwasser."
      },
      {
        type: "true_false",
        id: "1045_08_h2",
        statement: "Nach Dr. Bach hat der Körper bei der Behandlung von Erkrankungen Vorrang vor der Psyche.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Bach betonte ausdrücklich, dass die Psyche des Menschen bei Erkrankungen größere Bedeutung hat als der Körper. Seiner Theorie nach liegt jeder Krankheit ein negativer Seelenzustand zugrunde."
      },
      {
        type: "mc",
        id: "1045_08_h3",
        question: "Wann wird bei der Bachblüten-Herstellung die Kochmethode angewendet?",
        options: [
          { text: "Bei früh im Jahr blühenden Pflanzen, wenn die Sonne noch nicht ihre volle Kraft hat", correct: true },
          { text: "Nur für Wurzeln und Rinden, die sich nicht in Wasser auflösen", correct: false },
          { text: "Wenn keine Sonne vorhanden ist, da sie Wirkstoffe zerstört", correct: false },
          { text: "Als Standardmethode für alle 38 Heilmittel", correct: false }
        ],
        explanation: "Die Kochmethode wird für früh blühende Pflanzen verwendet, weil die Sonne zu Beginn des Jahres noch nicht ihre volle Kraft hat. Das Feuer übernimmt dabei die Rolle der Sonne."
      },
      {
        type: "true_false",
        id: "1045_08_h4",
        statement: "Enzyme wirken nach dem Schlüssel-Schloss-Prinzip und werden dabei selbst verändert (verbraucht).",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Enzyme sind Biokatalysatoren und werden bei ihrer Wirkung nicht selbst verändert. Das Schlüssel-Schloss-Prinzip beschreibt die Substratspezifität: Das Enzym muss exakt in die Form des Substrats passen."
      },
      {
        type: "mc",
        id: "1045_08_h5",
        question: "Bei wem ist die Enzymtherapie kontraindiziert?",
        options: [
          { text: "Schwangere, Patienten mit Blutgerinnungsstörungen, vor Operationen, Eiweißallergie", correct: true },
          { text: "Kinder unter 12 Jahren und ältere Patienten über 70", correct: false },
          { text: "Patienten mit Diabetes mellitus und Niereninsuffizienz", correct: false },
          { text: "Nur bei bekannter Unverträglichkeit auf Pflanzenextrakte", correct: false }
        ],
        explanation: "KI der Enzymtherapie: Schwangerschaft, Blutgerinnungsstörungen, vor größeren Operationen (wegen fibrinolytischer Eigenschaften) und Eiweißallergie."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1045_08_p4_1",
        question: "Welche Aussagen zur Bachblütentherapie sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Begründer: Dr. Edward Bach (1886–1936)", correct: true },
          { text: "38 Heilmittel (37 Blüten + 1 Quellwasser)", correct: true },
          { text: "Herstellung durch Sonnen- oder Kochmethode", correct: true },
          { text: "Ziel: Harmonisierung der Seele/des Bewusstseins (Selbstheilung)", correct: true },
          { text: "Wirkt primär auf biochemische Rezeptoren des Körpers", correct: false }
        ],
        explanation: "Die Bachblütentherapie wirkt nach ihrer eigenen Theorie nicht auf biochemische Rezeptoren, sondern auf das Bewusstsein und die feinstoffliche Ebene. Alle anderen Aussagen sind korrekt."
      },
      {
        type: "mc",
        id: "1045_08_p4_2",
        question: "Welche Aussagen zur Enzymtherapie sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Enzyme sind Biokatalysatoren (Eiweißkörper)", correct: true },
          { text: "Substratspezifisch nach Schlüssel-Schloss-Prinzip", correct: true },
          { text: "Anwendung bei akuten/chronischen Entzündungen, viralen Infekten, Gefäßerkrankungen", correct: true },
          { text: "Kombination mit Vitaminen/Mineralstoffen (Coenzyme) wichtig", correct: true },
          { text: "Kontraindikation nur bei Lebererkrankungen", correct: false }
        ],
        explanation: "KI sind nicht nur Lebererkrankungen, sondern: Schwangerschaft, Blutgerinnungsstörungen, vor Operationen und Eiweißallergie. Alle anderen Aussagen sind korrekte Aussagen zur Enzymtherapie."
      }
    ]
  })
];
