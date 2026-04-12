const NERVENSYSTEM_1043_PLANTS = [
  makeDetailedPlant({
    id: "1043_01",
    title: "Nervenzelle & Aktionspotential",
    contextHint: "Kap. 1 – Erregungsleitung: Aufbau der Nervenzelle, Ruhepotential, Aktionspotential, saltatorische Erregungsleitung",
    phase1: {
      soil: {
        statement: "Wie ist eine Nervenzelle aufgebaut und was ist das Ruhepotential?",
        answer: "Nervenzelle = Zellleib + Kern, Dendriten (bis 12, Signalempfänger), Axon/Neurit (Signalweiterleitung), Neuroglia (Stütz-/Hüllzellen). Ruhepotential: ca. -80 mV; K⁺ innen 40–50× höher, Na⁺ außen 3–10× höher.",
        solution: "Ruhepotential entsteht durch ungleiche Ionenverteilung: K⁺ vorwiegend intrazellulär, Na⁺ vorwiegend extrazellulär. Die Na-K-ATPase hält dieses Gleichgewicht aufrecht."
      },
      seed: {
        statement: "Was passiert beim Aktionspotential und wie lange dauert es?",
        answer: "Na⁺-Einstrom → Depolarisation (+20 bis +60 mV), danach K⁺-Ausstrom → Repolarisation zurück auf Ruhepotential. Läuft innerhalb ca. 1 ms ab. Refraktärzeit: Na-K-ATPase stellt Ausgangszustand wieder her.",
        solution: "Das Aktionspotential folgt dem Alles-oder-Nichts-Prinzip. Nach dem Auslösen folgt eine Refraktärzeit, in der kein weiteres AP ausgelöst werden kann."
      },
      water: {
        statement: "Was ist saltatorische Erregungsleitung und wodurch wird sie ermöglicht?",
        answer: "Erregung springt von Ranvier-Schnürring zu Ranvier-Schnürring (alle ca. 1,5 mm). Ermöglicht durch Myelinscheide (Schwann-Zellen, Lipoprotein) → bis 120 m/s. Viel schneller als kontinuierliche Leitung.",
        solution: "Die Myelinscheide isoliert das Axon elektrisch. Nur an den Ranvier-Schnürringen (Lücken in der Myelinscheide) findet Ionenaustausch statt – daher ‚springt' die Erregung."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1043_01_h1",
        question: "Welchen Wert hat das Ruhepotential einer Nervenzelle in etwa?",
        options: [
          { text: "-80 mV", correct: true },
          { text: "+20 mV", correct: false },
          { text: "-20 mV", correct: false },
          { text: "+80 mV", correct: false }
        ],
        explanation: "Das Ruhepotential beträgt ca. -80 mV. Es entsteht durch die ungleiche Verteilung von K⁺ (innen) und Na⁺ (außen)."
      },
      {
        type: "true_false",
        id: "1043_01_h2",
        statement: "Die Myelinscheide wird von Schwann-Zellen gebildet und besteht aus Lipoprotein.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Schwann-Zellen bilden die Myelinscheide aus Lipoprotein, die das Axon isoliert und die saltatorische Erregungsleitung ermöglicht."
      },
      {
        type: "mc",
        id: "1043_01_h3",
        question: "Was passiert bei der Depolarisation einer Nervenzelle?",
        options: [
          { text: "Na⁺ strömt in die Zelle ein", correct: true },
          { text: "K⁺ strömt in die Zelle ein", correct: false },
          { text: "Cl⁻ strömt aus der Zelle aus", correct: false },
          { text: "Ca²⁺ strömt aus der Zelle aus", correct: false }
        ],
        explanation: "Bei der Depolarisation öffnen sich Na⁺-Kanäle, Na⁺ strömt ein und das Membranpotential steigt von ca. -80 mV auf bis zu +60 mV."
      },
      {
        type: "true_false",
        id: "1043_01_h4",
        statement: "Ranvier-Schnürringe liegen alle ca. 15 mm voneinander entfernt.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Ranvier-Schnürringe liegen ca. alle 1,5 mm entlang des Axons – nicht 15 mm."
      },
      {
        type: "mc",
        id: "1043_01_h5",
        question: "Wie schnell kann die saltatorische Erregungsleitung maximal sein?",
        options: [
          { text: "Bis zu 120 m/s", correct: true },
          { text: "Bis zu 12 m/s", correct: false },
          { text: "Bis zu 1,2 m/s", correct: false },
          { text: "Bis zu 1200 m/s", correct: false }
        ],
        explanation: "Die saltatorische Erregungsleitung myelinisierter Axone kann bis zu 120 m/s erreichen – deutlich schneller als die kontinuierliche Leitung unmyelinisierter Fasern."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1043_01_p4_1",
        question: "Welche der folgenden Strukturen gehören zur Nervenzelle? (Mehrere Antworten möglich)",
        options: [
          { text: "Zellleib mit Zellkern", correct: true },
          { text: "Dendriten", correct: true },
          { text: "Axon (Neurit)", correct: true },
          { text: "Astrozyt", correct: false },
          { text: "Oligodendrozyt", correct: false }
        ],
        explanation: "Astrozyten und Oligodendroyten sind Gliazellen (Neuroglia), keine Bestandteile der Nervenzelle selbst. Die Nervenzelle besteht aus Zellleib, Dendriten und Axon."
      },
      {
        type: "mc",
        id: "1043_01_p4_2",
        question: "Welche Aussagen zum Aktionspotential treffen zu? (Mehrere Antworten möglich)",
        options: [
          { text: "Na⁺-Einstrom führt zur Depolarisation", correct: true },
          { text: "K⁺-Ausstrom führt zur Repolarisation", correct: true },
          { text: "Das Aktionspotential läuft in ca. 1 ms ab", correct: true },
          { text: "Während der Refraktärzeit kann sofort ein neues AP ausgelöst werden", correct: false },
          { text: "Das Membranpotential kann bei Depolarisation bis +60 mV erreichen", correct: true }
        ],
        explanation: "Während der Refraktärzeit ist die Auslösung eines neuen Aktionspotentials nicht möglich – die Na-K-ATPase-Pumpe stellt erst den Ruhezustand wieder her."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1043_02",
    title: "Synapse & Neurotransmitter",
    contextHint: "Kap. 1 – Synaptische Übertragung: Aufbau der Synapse, Neurotransmitter, Myasthenia gravis, Curare",
    phase1: {
      soil: {
        statement: "Wie ist eine Synapse aufgebaut und welche Funktion hat sie?",
        answer: "Synapse = präsynaptisches Endknöpfchen + synaptischer Spalt + postsynaptische Membran. Enthält Vesikel mit Neurotransmittern. Ventilfunktion: Erregung nur in eine Richtung (unidirektional). Ca²⁺-Einstrom → Vesikel fusionieren → Transmitter in den Spalt.",
        solution: "Die synaptische Ventilfunktion ist entscheidend: Erregung kann nur vom prä- zum postsynaptischen Neuron weitergeleitet werden, nicht umgekehrt."
      },
      seed: {
        statement: "Welche Neurotransmitter gibt es und wie werden sie eingeteilt?",
        answer: "Cholinerge Synapsen: Acetylcholin (ACh) → durch Acetylcholinesterase gespalten. Adrenerge Synapsen: Adrenalin, Noradrenalin, Dopamin. Weitere: Serotonin, Substance P (Schmerz), GABA (hemmend).",
        solution: "Acetylcholinesterase beendet die ACh-Wirkung durch Spaltung in Acetat und Cholin. Hemmung dieses Enzyms ist der Angriffspunkt von Medikamenten (z.B. bei Myasthenia gravis) und Giften."
      },
      water: {
        statement: "Was ist Myasthenia gravis und wie wirkt Curare?",
        answer: "Myasthenia gravis: Autoimmunerkrankung, Acetylcholin-Rezeptoren durch Antikörper zerstört → Muskelschwäche. Therapie: Acetylcholinesterase-Hemmer (mehr ACh verfügbar). Curare: blockiert ACh-Rezeptoren → generalisierte Muskellähmung.",
        solution: "Beide wirken am ACh-Rezeptor, aber verschieden: Myasthenia gravis = Rezeptorzerstörung durch Autoantikörper, Curare = kompetitive Rezeptorblockade."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1043_02_h1",
        question: "Welches Ion löst die Freisetzung von Neurotransmittern in der Synapse aus?",
        options: [
          { text: "Ca²⁺", correct: true },
          { text: "Na⁺", correct: false },
          { text: "K⁺", correct: false },
          { text: "Cl⁻", correct: false }
        ],
        explanation: "Ca²⁺-Einstrom ins Endknöpfchen bewirkt die Fusion der Vesikel mit der präsynaptischen Membran und die Freisetzung der Neurotransmitter in den synaptischen Spalt."
      },
      {
        type: "true_false",
        id: "1043_02_h2",
        statement: "Curare blockiert die Acetylcholin-Rezeptoren und führt zu einer generalisierten Muskellähmung.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Curare besetzt kompetitiv die ACh-Rezeptoren an der motorischen Endplatte und verhindert so die Muskelkontraktion – es kommt zur Lähmung."
      },
      {
        type: "mc",
        id: "1043_02_h3",
        question: "Welches Enzym spaltet Acetylcholin und beendet dadurch die synaptische Erregung?",
        options: [
          { text: "Acetylcholinesterase", correct: true },
          { text: "Monoaminooxidase (MAO)", correct: false },
          { text: "Dopamindecarboxylase", correct: false },
          { text: "Lipase", correct: false }
        ],
        explanation: "Die Acetylcholinesterase spaltet ACh in Acetat und Cholin im synaptischen Spalt. Acetylcholinesterase-Hemmer werden therapeutisch bei Myasthenia gravis eingesetzt."
      },
      {
        type: "true_false",
        id: "1043_02_h4",
        statement: "Serotonin gehört zu den cholinergen Neurotransmittern.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Cholinerge Synapsen nutzen Acetylcholin. Serotonin gehört zu einer anderen Transmittergruppe, ebenso wie Dopamin und Noradrenalin (adrenerge Synapsen)."
      },
      {
        type: "mc",
        id: "1043_02_h5",
        question: "Wodurch entsteht Myasthenia gravis?",
        options: [
          { text: "Autoimmunzerstörung der Acetylcholin-Rezeptoren", correct: true },
          { text: "Mangel an Acetylcholinesterase", correct: false },
          { text: "Überproduktion von Noradrenalin", correct: false },
          { text: "Blockade der Ca²⁺-Kanäle", correct: false }
        ],
        explanation: "Bei Myasthenia gravis zerstören Autoantikörper die ACh-Rezeptoren an der motorischen Endplatte. Therapie: Acetylcholinesterase-Hemmer erhöhen die verfügbare ACh-Menge."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1043_02_p4_1",
        question: "Welche der folgenden Substanzen gehören zu den adrenergen Neurotransmittern? (Mehrere Antworten möglich)",
        options: [
          { text: "Noradrenalin", correct: true },
          { text: "Adrenalin", correct: true },
          { text: "Dopamin", correct: true },
          { text: "Acetylcholin", correct: false },
          { text: "GABA", correct: false }
        ],
        explanation: "Noradrenalin, Adrenalin und Dopamin sind adrenerge Neurotransmitter. Acetylcholin ist cholinerger Neurotransmitter, GABA ist ein hemmender Transmitter."
      },
      {
        type: "mc",
        id: "1043_02_p4_2",
        question: "Welche Aussagen zur synaptischen Übertragung sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Die Erregungsleitung an der Synapse ist unidirektional (Ventilfunktion)", correct: true },
          { text: "Ca²⁺-Einstrom löst die Transmitterfreisetzung aus", correct: true },
          { text: "Das präsynaptische Endknöpfchen enthält Vesikel mit Neurotransmittern", correct: true },
          { text: "Synapsen können Erregungen in beide Richtungen leiten", correct: false },
          { text: "Substance P ist an der Schmerzübertragung beteiligt", correct: true }
        ],
        explanation: "Die Synapse leitet ausschließlich unidirektional. Substance P ist als Schmerzmediator bekannt. Ca²⁺ ist der entscheidende Trigger für die Vesikelfreisetzung."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1043_03",
    title: "Gliederung des Nervensystems & Stammhirn",
    contextHint: "Kap. 2 – ZNS/PNS, Embryonalentwicklung, Stammhirn, Substantia grisea/alba",
    phase1: {
      soil: {
        statement: "Wie ist das Nervensystem gegliedert?",
        answer: "ZNS (Gehirn + Rückenmark) + PNS (Hirn-/Rückenmarksnerven). Somatisch (willkürlich) vs. Vegetativ (unwillkürlich: Sympathikus + Parasympathikus). Primäre Hirnbläschen: Prosencephalon, Mesencephalon, Rhombencephalon.",
        solution: "Die sekundäre Entwicklung differenziert: Telencephalon + Diencephalon (aus Prosencephalon); Metencephalon/Pons + Cerebellum + Myelencephalon/Medulla oblongata (aus Rhombencephalon)."
      },
      seed: {
        statement: "Aus welchen Teilen besteht das Stammhirn und welche Funktionen hat es?",
        answer: "Stammhirn = Medulla oblongata + Pons + Mesencephalon. Enthält: Kreislauf- und Atemzentrum, Formatio reticularis (reguliert Bewusstseinshelligkeit/Wachheit).",
        solution: "Das Stammhirn ist lebenswichtig – es steuert automatische Vitalfunktionen. Die Formatio reticularis ist entscheidend für Bewusstsein und Schlaf-Wach-Regulierung."
      },
      water: {
        statement: "Was ist der Unterschied zwischen Substantia grisea und Substantia alba – und wo liegt was?",
        answer: "Substantia grisea (grau): Nervenzellen + marklose Fasern. Substantia alba (weiß): markhaltige Fasern. Im Gehirn: grau außen (Kortex), weiß innen. Im Rückenmark: grau innen (Schmetterlingsform), weiß außen.",
        solution: "Der inverse Aufbau ist prüfungsrelevant: Im Gehirn liegt Grau außen, im Rückenmark liegt Grau innen."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1043_03_h1",
        question: "Was gehört zum ZNS (Zentralnervensystem)?",
        options: [
          { text: "Gehirn und Rückenmark", correct: true },
          { text: "Alle 31 Spinalnerven", correct: false },
          { text: "Die 12 Hirnnerven", correct: false },
          { text: "Sympathikus und Parasympathikus", correct: false }
        ],
        explanation: "Das ZNS umfasst Gehirn und Rückenmark. Hirnnerven und Spinalnerven gehören zum PNS. Sympathikus und Parasympathikus sind Teile des vegetativen NS."
      },
      {
        type: "true_false",
        id: "1043_03_h2",
        statement: "Die Formatio reticularis beeinflusst die Bewusstseinshelligkeit und den Wachzustand.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Die Formatio reticularis im Stammhirn reguliert Wachheit und Bewusstseinszustand. Schäden können zur Bewusstlosigkeit führen."
      },
      {
        type: "mc",
        id: "1043_03_h3",
        question: "Wo liegt die graue Substanz (Substantia grisea) im Rückenmark?",
        options: [
          { text: "Innen (zentraler Kern in Schmetterlingsform)", correct: true },
          { text: "Außen (als Kortex)", correct: false },
          { text: "Gleichmäßig verteilt", correct: false },
          { text: "Nur in der Halsregion außen", correct: false }
        ],
        explanation: "Im Rückenmark liegt die graue Substanz innen (Schmetterlingsform), weiße Substanz außen. Im Gehirn ist es genau umgekehrt: grau außen (Kortex), weiß innen."
      },
      {
        type: "true_false",
        id: "1043_03_h4",
        statement: "Das vegetative Nervensystem kann willentlich gesteuert werden.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Das vegetative (autonome) Nervensystem reguliert unwillkürliche Körperfunktionen wie Herzschlag, Atmung und Verdauung – es entzieht sich dem Willen."
      },
      {
        type: "mc",
        id: "1043_03_h5",
        question: "Welche Hirnanteile entstehen aus dem Rhombencephalon?",
        options: [
          { text: "Pons (Brücke), Cerebellum und Medulla oblongata", correct: true },
          { text: "Telencephalon und Diencephalon", correct: false },
          { text: "Nur das Mesencephalon", correct: false },
          { text: "Hypothalamus und Thalamus", correct: false }
        ],
        explanation: "Das Rhombencephalon differenziert sich in Metencephalon (Pons + Cerebellum) und Myelencephalon (Medulla oblongata). Telencephalon + Diencephalon entstehen aus dem Prosencephalon."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1043_03_p4_1",
        question: "Welche Teile gehören zum Stammhirn? (Mehrere Antworten möglich)",
        options: [
          { text: "Medulla oblongata", correct: true },
          { text: "Pons (Brücke)", correct: true },
          { text: "Mesencephalon", correct: true },
          { text: "Cerebellum", correct: false },
          { text: "Diencephalon", correct: false }
        ],
        explanation: "Das Stammhirn besteht aus Medulla oblongata, Pons und Mesencephalon. Cerebellum und Diencephalon gehören nicht zum Stammhirn im engeren Sinne."
      },
      {
        type: "mc",
        id: "1043_03_p4_2",
        question: "Welche Aussagen zur Gliederung des Nervensystems sind richtig? (Mehrere Antworten möglich)",
        options: [
          { text: "ZNS besteht aus Gehirn und Rückenmark", correct: true },
          { text: "PNS umfasst Hirn- und Rückenmarksnerven", correct: true },
          { text: "Das vegetative NS ist in Sympathikus und Parasympathikus unterteilt", correct: true },
          { text: "Das somatische NS ist unwillkürlich", correct: false },
          { text: "Im Gehirn liegt die Substantia grisea außen", correct: true }
        ],
        explanation: "Das somatische NS ist willkürlich (nicht unwillkürlich). Das vegetative NS ist unwillkürlich und in Sympathikus und Parasympathikus unterteilt."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1043_04",
    title: "Die 12 Hirnnerven",
    contextHint: "Kap. 3 – Die 12 Hirnnervenpaare: Qualität (afferent/efferent/gemischt), Funktion, klinische Tests",
    phase1: {
      soil: {
        statement: "Welche Hirnnerven sind rein sensorisch (afferent) und was testen sie?",
        answer: "I N. olfactorius: Geruch (Sniff-Bottle-Test). II N. opticus: Sehen (Visus, Fingerperimetrie). VIII N. vestibulocochlearis: Hören + Gleichgewicht (Weber, Rinne, Romberg, Unterberger-Tretversuch). Merke: Nur I, II, VIII rein afferent – XII rein efferent – alle anderen gemischt.",
        solution: "Mnemotechnik für die 12 Nerven: ‚Oh, Oh, Oh, trainiere täglich alle fünf Sinne ganz von außen her.' → I–XII in Reihenfolge."
      },
      seed: {
        statement: "Welche Hirnnerven steuern die Augenbewegung und welche Störungen treten bei Läsionen auf?",
        answer: "III N. oculomotorius: Augenbewegung (außer schräg/außen), Akkommodation, Pupillenverengung; Störung: Pupillenstarre, Anisokorie, direkte + konsensuelle Lichtreaktion gestört. IV N. trochlearis: oberer schräger Augenmuskel (diagonale Doppelbilder). VI N. abducens: äußerer gerader Augenmuskel (horizontale Doppelbilder).",
        solution: "III, IV, VI = die drei Augenmuskelnerven. Schädigung von VI → Abweichung nach innen. Schädigung von III → Ptosis, Mydriasis, Schielstellung nach außen-unten."
      },
      water: {
        statement: "Was sind die Funktionen des N. vagus (X) und N. facialis (VII) und was passiert bei ihrer Lähmung?",
        answer: "VII N. facialis: motorisch Gesichtsmuskulatur, sensorisch Geschmack vordere Zunge, vegetativ Tränen-/Speichelsekretion; Lähmung: Bell-Phänomen, Hyperakusis. X N. vagus: wichtigster Parasympathikus (Herz/Lunge/GIT), zieht bis in Bauchbereich; Lähmung: Heiserkeit, Zäpfchen weicht zur gesunden Seite.",
        solution: "Merke: Bei N. vagus-Lähmung Zäpfchen zur GESUNDEN Seite. Bei N. hypoglossus-Lähmung zeigt Zunge zur KRANKEN Seite."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1043_04_h1",
        question: "Welcher Hirnnerv ist für die Geschmackswahrnehmung der vorderen zwei Drittel der Zunge zuständig?",
        options: [
          { text: "N. facialis (VII)", correct: true },
          { text: "N. glossopharyngeus (IX)", correct: false },
          { text: "N. hypoglossus (XII)", correct: false },
          { text: "N. trigeminus (V)", correct: false }
        ],
        explanation: "Der VII. Hirnnerv (N. facialis) übermittelt den Geschmack der vorderen 2/3 der Zunge. Der IX. Hirnnerv (N. glossopharyngeus) ist für das hintere Drittel zuständig."
      },
      {
        type: "true_false",
        id: "1043_04_h2",
        statement: "Der N. hypoglossus (XII. Hirnnerv) steuert die Zungenbewegung und ist rein efferent.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Der N. hypoglossus ist der einzige rein efferente (motorische) Hirnnerv. Bei seiner Lähmung weicht die Zunge zur kranken Seite ab und es kommt zu Sprachstörungen."
      },
      {
        type: "mc",
        id: "1043_04_h3",
        question: "Welcher Hirnnerv innerviert den M. sternocleidomastoideus und den M. trapezius?",
        options: [
          { text: "N. accessorius (XI)", correct: true },
          { text: "N. vagus (X)", correct: false },
          { text: "N. facialis (VII)", correct: false },
          { text: "N. hypoglossus (XII)", correct: false }
        ],
        explanation: "Der XI. Hirnnerv (N. accessorius) innerviert M. sternocleidomastoideus und M. trapezius. Störung führt zu Schräghalten des Kopfes und Schulterheberschwäche."
      },
      {
        type: "true_false",
        id: "1043_04_h4",
        statement: "Bei einer Lähmung des N. vagus weicht das Gaumenzäpfchen zur kranken Seite ab.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Bei N. vagus-Lähmung weicht das Zäpfchen zur GESUNDEN Seite (es wird von der intakten Gegenseite weggezogen). Bei N. hypoglossus-Lähmung zeigt die Zunge zur KRANKEN Seite."
      },
      {
        type: "mc",
        id: "1043_04_h5",
        question: "Was ist der Cornealreflex und welche zwei Hirnnerven sind beteiligt?",
        options: [
          { text: "Berühren der Cornea → Lidschluss; V (afferent) und VII (efferent)", correct: true },
          { text: "Lichtreiz auf Pupille → Verengung; II (afferent) und III (efferent)", correct: false },
          { text: "Berühren des Zäpfchens → Würgen; IX (afferent) und X (efferent)", correct: false },
          { text: "Schallreiz → Schreckreaktion; VIII (afferent) und VII (efferent)", correct: false }
        ],
        explanation: "Der Cornealreflex: Berühren der Hornhaut → N. trigeminus (V, afferent) → N. facialis (VII, efferent) → Lidschluss. Er prüft die Hirnstammintegrität."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1043_04_p4_1",
        question: "Welche Hirnnerven haben auch eine vegetative (parasympathische) Komponente? (Mehrere Antworten möglich)",
        options: [
          { text: "N. oculomotorius (III) – Akkommodation und Pupillenverengung", correct: true },
          { text: "N. facialis (VII) – Tränen- und Speichelsekretion", correct: true },
          { text: "N. vagus (X) – Herz, Lunge, GIT", correct: true },
          { text: "N. opticus (II)", correct: false },
          { text: "N. abducens (VI)", correct: false }
        ],
        explanation: "III, VII und X haben parasympathische Anteile. N. opticus (II) ist rein sensorisch, N. abducens (VI) ist rein motorisch (Augenbewegung)."
      },
      {
        type: "mc",
        id: "1043_04_p4_2",
        question: "Welche Aussagen zu den Hirnnerven sind richtig? (Mehrere Antworten möglich)",
        options: [
          { text: "N. olfactorius (I), N. opticus (II) und N. vestibulocochlearis (VIII) sind rein afferent", correct: true },
          { text: "N. hypoglossus (XII) ist rein efferent", correct: true },
          { text: "Der N. vagus zieht als einziger Hirnnerv bis in den Bauchbereich", correct: true },
          { text: "N. trochlearis (IV) innerviert den äußeren geraden Augenmuskel", correct: false },
          { text: "Bei N. glossopharyngeus-Ausfall ist der Würgereflex gestört", correct: true }
        ],
        explanation: "N. trochlearis (IV) innerviert den oberen SCHRÄGEN Augenmuskel, nicht den äußeren geraden (das ist N. abducens VI). Alle anderen Aussagen sind korrekt."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1043_05",
    title: "Cerebellum, Mesencephalon & Diencephalon",
    contextHint: "Kap. 4 – Kleinhirn (3 Teile), Mittelhirn (Substantia nigra) und Zwischenhirn (5 Etagen)",
    phase1: {
      soil: {
        statement: "Welche drei Teile hat das Cerebellum und was sind ihre Funktionen?",
        answer: "Archicerebellum: Gleichgewicht im Ruhezustand. Paleocerebellum: Gleichgewicht bei Willkürbewegungen, Teil des EPS. Neocerebellum: Feinmotorik, Tastsinn + Tiefensensibilität. Das Kleinhirn speichert erlernte Bewegungsabläufe (jederzeit abrufbar).",
        solution: "Das Kleinhirn liegt in der hinteren Schädelgrube. Es koordiniert Bewegungen, initiiert sie aber nicht. Störungen führen zu Ataxie (Koordinationsstörungen)."
      },
      seed: {
        statement: "Was enthält das Mesencephalon (Mittelhirn)?",
        answer: "Vierhügelplatte: obere Hügel (Sehbahn), untere Hügel (Hörbahn). Substantia nigra: produziert Dopamin, Teil des extrapyramidalen Systems – degeneriert bei Parkinson. Pyramidenbahnen verlaufen durch das Mesencephalon.",
        solution: "Die Degeneration der Substantia nigra führt zu Dopaminmangel → Parkinson-Symptome (Rigor, Tremor, Akinese). Das Mesencephalon ist auch Schaltstelle für Seh- und Hörbahn."
      },
      water: {
        statement: "Welche 5 Etagen hat das Diencephalon und was sind ihre Funktionen?",
        answer: "1. Epithalamus: Epiphyse (Melatonin, Tag-Nacht-Rhythmus), Habenulae (Riechsystem). 2. Thalamus: Aufmerksamkeitsfilter, Tor zum Bewusstsein, Gedächtnis. 3. Subthalamus: Grobmotorik (Nucleus subthalamus/Luys-Körper). 4. Hypothalamus: Schlaf/Wach, Körpertemperatur, Wasserhaushalt, Nahrung, Fortpflanzung. 5. Metathalamus: Kniehöcker (Sehen + Hören).",
        solution: "Merke: Hypothalamus = 5 vegetative Grundfunktionen. Thalamus = ‚Tor zum Bewusstsein' – filtert, welche Informationen bewusst werden."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1043_05_h1",
        question: "Was produziert die Epiphyse (Zirbeldrüse) im Epithalamus?",
        options: [
          { text: "Melatonin", correct: true },
          { text: "Dopamin", correct: false },
          { text: "Cortisol", correct: false },
          { text: "Serotonin", correct: false }
        ],
        explanation: "Die Epiphyse produziert Melatonin, das den Tag-Nacht-Rhythmus reguliert und in der Pubertät eine hemmende Wirkung hat."
      },
      {
        type: "true_false",
        id: "1043_05_h2",
        statement: "Der Thalamus wird als ‚Tor zum Bewusstsein' bezeichnet, weil er Informationen filtert, bevor sie ins Bewusstsein gelangen.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Der Thalamus fungiert als Aufmerksamkeitsfilter und Schaltzentrale – er entscheidet, welche sensorischen Informationen weitergeleitet und bewusst wahrgenommen werden."
      },
      {
        type: "mc",
        id: "1043_05_h3",
        question: "Bei Degeneration welcher Struktur entsteht Parkinson?",
        options: [
          { text: "Substantia nigra (Dopaminmangel)", correct: true },
          { text: "Epiphyse", correct: false },
          { text: "Metathalamus", correct: false },
          { text: "Archicerebellum", correct: false }
        ],
        explanation: "Die Substantia nigra im Mesencephalon produziert Dopamin für das extrapyramidale System. Ihre Degeneration führt zu Dopaminmangel und den klassischen Parkinson-Symptomen."
      },
      {
        type: "true_false",
        id: "1043_05_h4",
        statement: "Das Neocerebellum ist für das Gleichgewicht im Ruhezustand zuständig.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Das Gleichgewicht im Ruhezustand ist Aufgabe des Archicerebellums. Das Neocerebellum ist für Feinmotorik sowie Tast- und Tiefensensibilität zuständig."
      },
      {
        type: "mc",
        id: "1043_05_h5",
        question: "Welche Struktur des Diencephalons steuert Schlaf-Wach-Rhythmus, Körpertemperatur, Wasserhaushalt und Fortpflanzung?",
        options: [
          { text: "Hypothalamus", correct: true },
          { text: "Thalamus", correct: false },
          { text: "Epithalamus", correct: false },
          { text: "Subthalamus", correct: false }
        ],
        explanation: "Der Hypothalamus ist das vegetative Steuerungszentrum: Er reguliert Schlaf/Wach, Temperatur, Wasser-/Nahrungshaushalt und Fortpflanzung."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1043_05_p4_1",
        question: "Welche Funktionen hat der Hypothalamus? (Mehrere Antworten möglich)",
        options: [
          { text: "Regulierung des Schlaf-Wach-Rhythmus", correct: true },
          { text: "Kontrolle der Körpertemperatur", correct: true },
          { text: "Steuerung des Wasserhaushalts", correct: true },
          { text: "Speicherung von Langzeiterinnerungen", correct: false },
          { text: "Regulation der Fortpflanzung", correct: true }
        ],
        explanation: "Langzeiterinnerungen werden mit Beteiligung von Hippocampus und Thalamus gebildet – nicht im Hypothalamus. Der Hypothalamus steuert vegetative Grundfunktionen."
      },
      {
        type: "mc",
        id: "1043_05_p4_2",
        question: "Welche Aussagen zum Diencephalon sind richtig? (Mehrere Antworten möglich)",
        options: [
          { text: "Der Thalamus filtert als Aufmerksamkeitszentrum eingehende Informationen", correct: true },
          { text: "Der Epithalamus enthält die Epiphyse, die Melatonin bildet", correct: true },
          { text: "Der Subthalamus steuert die Grobmotorik", correct: true },
          { text: "Der Metathalamus ist für den Geruchssinn zuständig", correct: false },
          { text: "Das Diencephalon hat 5 Etagen", correct: true }
        ],
        explanation: "Der Metathalamus (Kniehöcker) ist für Sehen und Hören zuständig, nicht für den Geruchssinn. Geruch ist im Epithalamus (Habenulae) und limbischen System verankert."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1043_06",
    title: "Großhirn, Basalganglien & Limbisches System",
    contextHint: "Kap. 4–6 – Die 4 Großhirnlappen, Basalganglien (EPS), limbisches System",
    phase1: {
      soil: {
        statement: "Welche 4 Lappen hat das Großhirn und welche Funktionen haben sie?",
        answer: "Frontallappen: motorisches Zentrum, Broca-Areal (Sprachproduktion). Parietallappen: Körperfühlsphäre (Sensomotorik), Lesezentrum. Temporallappen: Heschl-Windungen (Hörzentrum), Wernicke-Feld (Sprachverständnis). Occipitallappen: primäres Sehzentrum.",
        solution: "Broca (Frontallappen) = Sprachproduktion; Wernicke (Temporallappen) = Sprachverständnis. Broca-Läsion → motorische Aphasie; Wernicke-Läsion → sensorische Aphasie."
      },
      seed: {
        statement: "Was sind die Basalganglien und welche Funktion haben sie?",
        answer: "Basalganglien: Corpus striatum (Nucleus caudatus + Putamen), Globus pallidus, Substantia nigra, Nucleus subthalamicus. Teil des extrapyramidalen Systems (EPS): steuert langsame, automatisierte Bewegungsprogramme, Haltung und Koordination.",
        solution: "Bei Parkinson degeneriert die Substantia nigra → Dopaminmangel → Basalganglienfehlfunktion. EPS-Störungen äußern sich in Rigor, Tremor und Akinese."
      },
      water: {
        statement: "Was ist das limbische System und welche Aufgaben hat es?",
        answer: "Liegt zwischen Großhirn und Hirnstamm (‚Reptiliengehirn'). Verbindung zu Hypothalamus und Formatio reticularis. Funktionen: affektive Bewertung von Erlebnissen → Langzeitgedächtnis, vegetative Reaktionen bei Emotionen, Geruchsempfindung, Triebverhalten. Wirkungsort von Psychopharmaka.",
        solution: "Das limbische System verbindet emotionale Verarbeitung mit Gedächtnisbildung – daher werden emotional bedeutsame Ereignisse besonders gut erinnert."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1043_06_h1",
        question: "Wo liegt das Wernicke-Feld, das für das Sprachverständnis zuständig ist?",
        options: [
          { text: "Im Temporallappen", correct: true },
          { text: "Im Frontallappen", correct: false },
          { text: "Im Occipitallappen", correct: false },
          { text: "Im Parietallappen", correct: false }
        ],
        explanation: "Das Wernicke-Feld (sensorisches Sprachzentrum) liegt im Temporallappen. Das Broca-Areal (motorisches Sprachzentrum) liegt im Frontallappen."
      },
      {
        type: "true_false",
        id: "1043_06_h2",
        statement: "Das Broca-Areal im Frontallappen ist für die Sprachproduktion zuständig.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Das Broca-Areal im Frontallappen steuert die motorische Sprachproduktion. Eine Schädigung führt zur motorischen Aphasie: Sprechen ist schwer, Verstehen aber möglich."
      },
      {
        type: "mc",
        id: "1043_06_h3",
        question: "Welches Gehirnareal beherbergt das primäre Sehzentrum?",
        options: [
          { text: "Lobus occipitalis (Occipitallappen)", correct: true },
          { text: "Lobus frontalis (Frontallappen)", correct: false },
          { text: "Lobus parietalis (Parietallappen)", correct: false },
          { text: "Lobus temporalis (Temporallappen)", correct: false }
        ],
        explanation: "Der Occipitallappen beherbergt das primäre Sehzentrum. Schäden hier führen zu Sehausfällen oder Blindheit, auch ohne Schädigung der Augen selbst."
      },
      {
        type: "true_false",
        id: "1043_06_h4",
        statement: "Das limbische System hat keinen Bezug zur Gedächtnisbildung.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Das limbische System ist entscheidend für die affektive Bewertung von Erlebnissen und deren Überführung in das Langzeitgedächtnis."
      },
      {
        type: "mc",
        id: "1043_06_h5",
        question: "Welche Strukturen gehören zum Corpus striatum (Teil der Basalganglien)?",
        options: [
          { text: "Nucleus caudatus und Putamen", correct: true },
          { text: "Globus pallidus und Substantia nigra", correct: false },
          { text: "Thalamus und Hypothalamus", correct: false },
          { text: "Amygdala und Hippocampus", correct: false }
        ],
        explanation: "Das Corpus striatum besteht aus Nucleus caudatus und Putamen. Globus pallidus und Substantia nigra sind weitere Basalganglien, aber nicht Teil des Corpus striatum."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1043_06_p4_1",
        question: "Welche Strukturen gehören zu den Basalganglien? (Mehrere Antworten möglich)",
        options: [
          { text: "Corpus striatum (Nucleus caudatus + Putamen)", correct: true },
          { text: "Globus pallidus", correct: true },
          { text: "Substantia nigra", correct: true },
          { text: "Nucleus subthalamicus", correct: true },
          { text: "Hippocampus", correct: false }
        ],
        explanation: "Der Hippocampus gehört zum limbischen System, nicht zu den Basalganglien. Die Basalganglien bilden das extrapyramidale System (EPS)."
      },
      {
        type: "mc",
        id: "1043_06_p4_2",
        question: "Welche Funktionen hat das limbische System? (Mehrere Antworten möglich)",
        options: [
          { text: "Affektive Bewertung von Erlebnissen", correct: true },
          { text: "Überführung in das Langzeitgedächtnis", correct: true },
          { text: "Trieb- und Instinktverhalten", correct: true },
          { text: "Steuerung der willkürlichen Motorik", correct: false },
          { text: "Geruchsempfindung", correct: true }
        ],
        explanation: "Die willkürliche Motorik wird vom motorischen Kortex (Frontallappen) und den Pyramidenbahnen gesteuert, nicht vom limbischen System."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1043_07",
    title: "Liquorsystem & Blutversorgung des Gehirns",
    contextHint: "Kap. 8–9 – Ventrikelsystem, Meningen, Liquorzirkulation, Circulus Willisi",
    phase1: {
      soil: {
        statement: "Wie ist das Ventrikelsystem aufgebaut und wo liegen die 4 Ventrikel?",
        answer: "4 Ventrikel: I. + II. Seitenventrikel (laterale Ventrikel) in den Großhirnhemisphären; III. Ventrikel im Diencephalon; IV. Ventrikel im Rautenhirn. Verbindungen: Foramen interventricularis (I/II → III), Aquaeductus cerebri (III → IV). 3 Meningen (von außen): Dura mater, Arachnoidea, Pia mater.",
        solution: "Resorptionsstörungen führen zu Hydrocephalus (Wasserkopf). Lumbalpunktion: Liquordruck liegend 75–180 mmHg, sitzend 150–250 mmHg."
      },
      seed: {
        statement: "Wie wird Liquor produziert und zirkuliert er?",
        answer: "Produktion im Plexus choroideus (spezialisierte Gefäßzotten), 500–700 ml/Tag. Zirkulation: I+II. Ventrikel → III. Ventrikel → IV. Ventrikel → äußerer Liquorraum (zwischen Arachnoidea und Pia mater) → venöse Resorption. Zirkulierende Menge: ca. 150 ml. Liquor: klar, farblos, pH 7,31, Eiweiß 15–25 mg/dl.",
        solution: "Funktionen des Liquors: 1. Wasserkissenfunktion (mechanischer Schutz vor Erschütterungen). 2. Ernährung der Hirnzellen. 3. Konstanter Innendruck im ZNS."
      },
      water: {
        statement: "Welche Arterien versorgen das Gehirn und was ist der Circulus Willisi?",
        answer: "4 große Arterien: A. carotis interna (dextra et sinister) und A. vertebralis (dextra et sinister; vereinigen sich zur A. basilaris → Aa. cerebri posteriores). Circulus arteriosus cerebri (Circulus Willisi): arterieller Ring an der Gehirnbasis; Anastomosen sichern Versorgung auch bei Verschluss von bis zu 3 Gefäßen.",
        solution: "Das Gehirn toleriert maximal ca. 3 Minuten Sauerstoffmangel – danach irreparable Hirnschäden. Der Circulus Willisi ist ein lebenswichtiger Sicherheitsmechanismus."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1043_07_h1",
        question: "Wo wird der Liquor cerebrospinalis produziert?",
        options: [
          { text: "Im Plexus choroideus der Seitenventrikel", correct: true },
          { text: "In der Dura mater", correct: false },
          { text: "Im Arachnoidalraum", correct: false },
          { text: "In der Substantia nigra", correct: false }
        ],
        explanation: "Liquor wird im Plexus choroideus (spezialisierte Gefäßzotten) hauptsächlich der Seitenventrikel produziert, sowie am Dach des III. Ventrikels und vor der Kleinhirnunterfläche."
      },
      {
        type: "true_false",
        id: "1043_07_h2",
        statement: "Die Dura mater ist die innerste (weichste) der drei Hirnhäute.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Reihenfolge von außen nach innen: 1. Dura mater (harte Hirnhaut, liegt am Knochen), 2. Arachnoidea (Spinngewebshaut), 3. Pia mater (weiche Hirnhaut, liegt direkt am Gehirn)."
      },
      {
        type: "mc",
        id: "1043_07_h3",
        question: "Wie viel Liquor zirkuliert im Liquorsystem normalerweise?",
        options: [
          { text: "Ca. 150 ml", correct: true },
          { text: "Ca. 500 ml", correct: false },
          { text: "Ca. 1500 ml", correct: false },
          { text: "Ca. 50 ml", correct: false }
        ],
        explanation: "Obwohl täglich ca. 500–700 ml produziert werden, beträgt die zirkulierende Menge durch kontinuierliche Resorption nur ca. 150 ml."
      },
      {
        type: "true_false",
        id: "1043_07_h4",
        statement: "Der IV. Ventrikel liegt im Rautenhirn (Rhombencephalon).",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Der IV. Ventrikel liegt im Rautenhirn (Rhombencephalon). Er ist über den Aquaeductus cerebri mit dem III. Ventrikel verbunden."
      },
      {
        type: "mc",
        id: "1043_07_h5",
        question: "Welche Hauptfunktion hat der Liquor cerebrospinalis?",
        options: [
          { text: "Mechanischer Schutz (Wasserkissenfunktion) und Ernährung der Hirnzellen", correct: true },
          { text: "Transport von Hormonen ins Blut", correct: false },
          { text: "Produktion von Neurotransmittern", correct: false },
          { text: "Immunabwehr im Gehirn", correct: false }
        ],
        explanation: "Liquor hat zwei Hauptfunktionen: 1. Wasserkissenfunktion – mechanischer Schutz vor Erschütterungen. 2. Ernährung der Hirnzellen. Er hält außerdem einen konstanten Innendruck aufrecht."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1043_07_p4_1",
        question: "Welche Aussagen zur Liquorzusammensetzung und -zirkulation sind richtig? (Mehrere Antworten möglich)",
        options: [
          { text: "pH-Wert des Liquors beträgt ca. 7,31", correct: true },
          { text: "Eiweißgehalt ca. 15–25 mg/dl", correct: true },
          { text: "Liquor zirkuliert zwischen Arachnoidea und Pia mater", correct: true },
          { text: "Liquor wird vollständig im III. Ventrikel produziert", correct: false },
          { text: "Glucosegehalt des Liquors beträgt ca. 60–85 mg/dl", correct: true }
        ],
        explanation: "Liquor wird hauptsächlich im Plexus choroideus der Seitenventrikel (I. und II.) produziert, nicht allein im III. Ventrikel."
      },
      {
        type: "mc",
        id: "1043_07_p4_2",
        question: "Welche Aussagen zur Blutversorgung des Gehirns sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Vier große Arterien versorgen das Gehirn: A. carotis interna und A. vertebralis (jeweils beidseitig)", correct: true },
          { text: "Der Circulus Willisi sichert die Gehirnversorgung auch bei Arterienverschluss", correct: true },
          { text: "Die beiden A. vertebrales vereinigen sich zur A. basilaris", correct: true },
          { text: "Das Gehirn verträgt bis zu 10 Minuten Sauerstoffmangel", correct: false },
          { text: "Der Circulus arteriosus cerebri liegt an der Gehirnbasis", correct: true }
        ],
        explanation: "Das Gehirn verträgt maximal ca. 3 Minuten Sauerstoffmangel – danach entstehen irreparable Schäden."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1043_08",
    title: "Rückenmark, Reflexbögen & Vegetatives Nervensystem",
    contextHint: "Kap. 10–12 – Pyramidenbahnen, EPS, Spinalnerven, mono-/polysynaptische Reflexe, Sympathikus & Parasympathikus",
    phase1: {
      soil: {
        statement: "Wie ist das Rückenmark aufgebaut und wie viele Spinalnerven gibt es?",
        answer: "Medulla spinalis reicht von Foramen magnum bis LWK 1/2, Länge 40–45 cm. Graue Substanz innen: Hinterhorn (afferent/sensibel), Vorderhorn (efferent/motorisch), Seitenhorn (vegetativ). 31 Spinalnervenpaare: 8 zervikal, 12 thorakal, 5 lumbal, 5 sakral, 1 coccygeal. Cauda equina: L3–S5+Co1.",
        solution: "Dermatome: Hautgebiete, die von einem Spinalnerv innerviert werden. Sensibilitätsstörungen in einem Dermatom erlauben Rückschlüsse auf die Höhe einer Rückenmarksläsion (Höhendiagnostik)."
      },
      seed: {
        statement: "Wie unterscheidet sich der monosynaptische vom polysynaptischen Reflexbogen?",
        answer: "Monosynaptisch (Eigenreflex): Rezeptor + Effektor im gleichen Organ; 1 Synapse; Hinterwurzel → Hinterhorn → Synapse → Vorderhorn → Effektor. Bsp: Patellarsehnenreflex, Achillessehnenreflex. Polysynaptisch (Fremdreflex): Rezeptor ≠ Effektor; mehrere Synapsen mit Interneuron; ZNS kann eingreifen. Bsp: Lidschlussreflex, Bauchdeckenreflex.",
        solution: "Pathologische Reflexe (z.B. Babinsky-Zeichen bei Bestreichen der Fußsohle) zeigen eine Schädigung der Pyramidenbahn an. Bei Kindern bis 2 Jahre ist der Babinsky physiologisch."
      },
      water: {
        statement: "Was ist der Unterschied zwischen Sympathikus und Parasympathikus in Ursprung, Transmitter und Wirkung?",
        answer: "Sympathikus: Ursprung thorako-lumbal; postganglionär Noradrenalin; ergotrop (‚fight or flight'): Herzfrequenz↑, Bronchien dilatiert, Darm↓, Schließmuskel kontrahiert. Parasympathikus: Ursprung cranio-sakral; prä- und postganglionär ACh; trophrotrop (Erholung/Homöostase): Herzfrequenz↓, Bronchien↓, Darm↑, Blasen-/Darmentleerung↑.",
        solution: "Steuerung von Sympathikus und Parasympathikus erfolgt hauptsächlich durch den Hypothalamus. Der Solarplexus (Plexus solaris) ist ein autonomes Geflecht aus sympathischen und parasympathischen Fasern im Bauchraum."
      }
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "1043_08_h1",
        question: "Wie viele Spinalnervenpaare gibt es insgesamt?",
        options: [
          { text: "31", correct: true },
          { text: "12", correct: false },
          { text: "24", correct: false },
          { text: "42", correct: false }
        ],
        explanation: "Es gibt 31 Spinalnervenpaare: 8 Halsnerven (C1–C8), 12 Brustnerven (Th1–Th12), 5 Lendennerven (L1–L5), 5 Sakralnerven (S1–S5) und 1 Steißnerv (Co1)."
      },
      {
        type: "true_false",
        id: "1043_08_h2",
        statement: "Der Sympathikus hat seinen Ursprung im Thorakal- und oberen Lumbalmark (thorako-lumbales System).",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false }
        ],
        explanation: "Korrekt. Der Sympathikus entspringt dem Thorakalmark und den ersten 2–3 Segmenten des Lumbalmarks (thorako-lumbales System). Der Parasympathikus hat seinen Ursprung cranio-sakral."
      },
      {
        type: "mc",
        id: "1043_08_h3",
        question: "Was versteht man unter einem Dermatom?",
        options: [
          { text: "Ein von einem Spinalnerv sensibel innerviertes Hautgebiet", correct: true },
          { text: "Eine Muskelgruppe, die von einem Spinalnerv motorisch versorgt wird", correct: false },
          { text: "Ein Reflex, der durch Hautreiz ausgelöst wird", correct: false },
          { text: "Eine der drei Hirnhäute (Meningen)", correct: false }
        ],
        explanation: "Ein Dermatom ist ein Hautareal, das sensibel von einem Spinalnerv innerviert wird. Sensibilitätsstörungen in einem Dermatom ermöglichen die Höhendiagnostik bei Rückenmarksschäden. Myotome entsprechen Muskelgruppen."
      },
      {
        type: "true_false",
        id: "1043_08_h4",
        statement: "Der Parasympathikus erhöht Herzfrequenz, Schlagkraft und Schlagvolumen des Herzens.",
        options: [
          { text: "Wahr", correct: false },
          { text: "Falsch", correct: true }
        ],
        explanation: "Falsch. Der SYMPATHIKUS erhöht Herzfrequenz, Schlagkraft und Schlagvolumen (‚fight or flight'). Der Parasympathikus erniedrigt diese Parameter (trophotrope/erholende Wirkung)."
      },
      {
        type: "mc",
        id: "1043_08_h5",
        question: "Was ist die Cauda equina?",
        options: [
          { text: "Die Nervenwurzeln L3–S5 und Co1, die kaudal im Wirbelkanal verlaufen", correct: true },
          { text: "Der Abschnitt des Rückenmarks im Halsbereich", correct: false },
          { text: "Die vorderen Wurzeln aller Thorakalnerven", correct: false },
          { text: "Ein Nervengeflecht im Plexus brachialis", correct: false }
        ],
        explanation: "Die Cauda equina (Pferdeschwanz) besteht aus den Nervenwurzeln L3–S5 und Co1, die kaudal im Wirbelkanal verlaufen, da das Rückenmark bereits bei LWK 1/2 endet."
      }
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "1043_08_p4_1",
        question: "Welche Wirkungen hat der Sympathikus? (Mehrere Antworten möglich)",
        options: [
          { text: "Herzfrequenz wird erhöht", correct: true },
          { text: "Bronchien werden dilatiert (erweitert)", correct: true },
          { text: "Darmbewegung wird erniedrigt", correct: true },
          { text: "Schließmuskulatur wird erschlafft", correct: false },
          { text: "Schlagkraft des Herzens wird erhöht", correct: true }
        ],
        explanation: "Der Sympathikus KONTRAHIERT (nicht erschlafft) die Schließmuskulatur. Das Erschlaffen der Schließmuskulatur ist eine parasympathische Wirkung (ermöglicht Entleerung)."
      },
      {
        type: "mc",
        id: "1043_08_p4_2",
        question: "Welche Aussagen zum Rückenmark und Reflexbogen sind richtig? (Mehrere Antworten möglich)",
        options: [
          { text: "Das Hinterhorn enthält afferente (sensible) Neurone", correct: true },
          { text: "Das Vorderhorn enthält motorische Neurone", correct: true },
          { text: "Beim monosynaptischen Reflexbogen liegen Rezeptor und Effektor im gleichen Organ", correct: true },
          { text: "Der Patellarsehnenreflex ist ein polysynaptischer Fremdreflex", correct: false },
          { text: "Graue Substanz liegt im Rückenmark innen", correct: true }
        ],
        explanation: "Der Patellarsehnenreflex ist ein monosynaptischer Eigenreflex (nicht polysynaptisch) – Rezeptor und Effektor liegen beide im Quadrizepsmuskel."
      }
    ]
  })
];
