  makeDetailedPlant({
    id: "fettgewebe_1032",
    title: "Fettgewebe: Adipozyten, Baufett & Speicherfett",
    contextHint: "Fettgewebe = spezielles Bindegewebe; Adipozyt (Siegelringform); Lipogenese ≠ Lipolyse; Baufett vs. Speicherfett; braunes vs. weißes Fettgewebe",
    phase1: {
      soil: {
        statement: "Das Fettgewebe gehört histologisch nicht zum Bindegewebe.",
        answer: false,
        solution: "Falsch. Fettgewebe ist eine spezialisierte Form des Bindegewebes. Es besteht aus Fettzellen (Adipozyten), die von retikulären Bindegewebsfasern und einer Basallamina umgeben sind. Entwicklungsgeschichtlich stammt es wie alle Bindegewebe vom Mesenchym ab.",
      },
      seed: {
        statement: "Adipozyten besitzen einen abgeplatteten Zellkern an der Peripherie, der durch einen zentralen Fettropfen verdrängt wurde.",
        answer: true,
        solution: "Richtig. Im weißen Fettgewebe füllt ein einziger großer Fetttropfen fast die gesamte Zelle aus. Der Zellkern und das spärliche Zytoplasma werden an den Rand gedrängt – dies ergibt die charakteristische Siegelringform. Die Zellen sind von einer Basallamina und retikulären Fasern umgeben.",
      },
      water: {
        statement: "Baufett und Speicherfettgewebe haben dieselben Funktionen und sind funktionell nicht zu unterscheiden.",
        answer: false,
        solution: "Falsch. Baufett (z. B. in Augenhöhlen, Wangen, Fußsohlen) hat vor allem mechanische Aufgaben – es fixiert Organe und polstert Stoßbelastungen ab. Es bleibt auch bei starker Abmagerung weitgehend erhalten. Speicherfettgewebe dagegen dient als Energiereservoir und variiert stark mit dem Ernährungszustand.",
      },
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "fg_h1",
        question: "Was versteht man unter der Siegelringform der Adipozyten?",
        options: [
          { text: "Ein zentraler Fettropfen verdrängt Zytoplasma und Zellkern an die Zellperipherie", correct: true },
          { text: "Mehrere kleine Fettvakuolen verteilen sich gleichmäßig im Zytoplasma", correct: false },
          { text: "Der Zellkern liegt zentral und ist von Fett umgeben", correct: false },
          { text: "Die Zellform entsteht durch Kontraktion der umgebenden Myoepithelzellen", correct: false },
        ],
        explanation: "Weiße Adipozyten speichern Fett als einen einzigen großen Fetttropfen. Dieser nimmt fast das gesamte Zellvolumen ein und drückt Zellkern und Zytoplasmarandzone an den Zellrand → Siegelringform. In der mikroskopischen Übersicht erscheinen solche Zellen wie leere Ringe, da das Fett bei der Präparation herausgelöst wird.",
      },
      {
        type: "mc",
        id: "fg_h2",
        question: "Was beschreiben Lipogenese und Lipolyse?",
        options: [
          { text: "Lipogenese = Aufbau von Fettsäuren und Triglyceriden; Lipolyse = Abbau/Freisetzung von Fettsäuren", correct: true },
          { text: "Lipogenese = Fettabbau; Lipolyse = Fettaufbau", correct: false },
          { text: "Beide Begriffe bezeichnen denselben Stoffwechselweg", correct: false },
          { text: "Lipogenese findet nur in der Leber statt, Lipolyse nur im Fettgewebe", correct: false },
        ],
        explanation: "Lipogenese (-genese = Entwicklung, Aufbau): Fettsäuresynthese und Einlagerung von Triglyceriden im Fettgewebe – Energiespeicherung. Lipolyse (-lyse = Auflösung, Abbau): Spaltung der Triglyceride, Freisetzung von Fettsäuren ins Blut. Beide Prozesse laufen gleichzeitig ab und werden hormonell gesteuert (z. B. Insulin fördert Lipogenese, Glucagon/Adrenalin fördern Lipolyse).",
      },
      {
        type: "mc",
        id: "fg_h3",
        question: "Welche Funktionen übernimmt das Fettgewebe im Körper?",
        options: [
          { text: "Energiespeicher, Wärmeisolierung, Wärmeproduktion (braunes Fett), mechanischer Schutz (Stoßdämpfer) und Organfixierung (Baufett)", correct: true },
          { text: "Ausschließlich Energiespeicherung und keine anderen Aufgaben", correct: false },
          { text: "Nur mechanischer Schutz, kein Stoffwechselbeitrag", correct: false },
          { text: "Fettgewebe ist metabolisch inaktiv und dient nur der Isolation", correct: false },
        ],
        explanation: "Fettgewebe ist multifunktional: 1. Energiereservoir (Triglyceride), 2. Thermische Isolierung (Fett = schlechter Wärmeleiter), 3. Wärmeproduktion (braunes Fettgewebe, besonders bei Neugeborenen), 4. Mechanisch: Stoßdämpfer und Polster, 5. Baufett: fixiert Organe (z. B. Augapfel in der Orbita). Fettgewebe ist zudem stark innerviert und reich durchblutet.",
      },
      {
        type: "mc",
        id: "fg_h4",
        question: "Was unterscheidet Baufett von Speicherfettgewebe?",
        options: [
          { text: "Baufett hat mechanische/strukturelle Funktion und bleibt bei Abmagerung erhalten; Speicherfett ist ernährungsabhängig und variiert mit Energiebilanz", correct: true },
          { text: "Baufett liegt nur in der Unterhaut; Speicherfett nur in inneren Organen", correct: false },
          { text: "Beide sind identisch – eine Unterscheidung ist klinisch irrelevant", correct: false },
          { text: "Speicherfett hat eine mechanische Funktion; Baufett dient der Energiegewinnung", correct: false },
        ],
        explanation: "Baufett: Augenhöhlen, Wangen, Fußsohlen, Nierenlager – fixiert Organe, polstert Druckbelastungen ab. Es bleibt auch bei extremer Abmagerung weitgehend erhalten. Speicherfett: subkutan und viszeral, variiert stark mit Ernährungszustand und Energiestoffwechsel.",
      },
      {
        type: "true_false",
        id: "fg_h5",
        statement: "Gutartige Geschwülste aus Fettgewebe werden als Lipome bezeichnet.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false },
        ],
        explanation: "Wahr. Lipome sind die häufigsten gutartigen Weichteiltumoren des Menschen. Sie entstehen aus Adipozyten und wachsen langsam. Bösartige Fettgewebstumore heißen Liposarkome (selten). Das Fettgewebe unterliegt einem ständigen Molekülaustausch – die im Fettgewebe angehäuften Moleküle werden beständig erneuert.",
      },
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "fg_p4_1",
        question: "Welche Aussagen zum weißen Fettgewebe sind korrekt? (Mehrere richtig)",
        options: [
          { text: "Adipozyten besitzen eine Siegelringform durch einen zentralen Fettropfen", correct: true },
          { text: "Fettgewebe ist reich durchblutet und stark innerviert", correct: true },
          { text: "Überschüssige Kohlenhydrate können zu Fettsäuren umgewandelt und gespeichert werden", correct: true },
          { text: "Fettgewebe hat keinerlei mechanische Bedeutung im Körper", correct: false },
        ],
        explanation: "Adipozyten: Siegelringform durch großen zentralen Fettropfen. Durchblutung: gut (große Fettlager belasten den Kreislauf). Innervation: stark (Steuerung der Lipolyse). Kohlenhydratüberschuss: wird als Fettsäuren im Fettgewebe gespeichert. Mechanisch: Baufett fixiert Organe und puffert Stöße.",
      },
      {
        type: "mc",
        id: "fg_p4_2",
        question: "Warum unterscheidet sich braunes von weißem Fettgewebe?",
        options: [
          { text: "Braunes Fettgewebe hat viele Mitochondrien und dient der Wärmeproduktion (Thermogenese); weißes Fettgewebe dient primär der Energiespeicherung", correct: true },
          { text: "Braunes Fettgewebe hat weniger Mitochondrien und speichert mehr Energie", correct: false },
          { text: "Beide Typen sind funktionell identisch und unterscheiden sich nur in der Farbe", correct: false },
          { text: "Weißes Fettgewebe produziert mehr Wärme als braunes", correct: false },
        ],
        explanation: "Braunes Fettgewebe: viele Mitochondrien (daher braune Farbe), enthält Uncoupling Protein 1 (UCP1/Thermogenin) → Entkopplung der Atmungskette → Wärme statt ATP. Wichtig bei Neugeborenen und Winterschläfern. Weißes Fettgewebe: Energiespeicher in Form von Triglyceriden, wenige Mitochondrien.",
      },
    ],
  }),
