// Neue Pflanze für 1043 – Kap. 7: Histologie des Gehirns
// Gap: vollständig fehlend in bisherigen 8 Pflanzen

  makeDetailedPlant({
    id: "1043_09",
    title: "Histologie des Gehirns",
    contextHint: "Kap. 7 – Neuroglia (3 Gliatypen: Astrozyten/Oligodendrozyten/Mikroglia), Substantia alba vs. grisea, 6 Gewebeschichten der Hirnrinde",
    phase1: {
      soil: {
        statement: "Die Neuroglia (Stütz- und Hüllgewebe des ZNS) besteht aus drei Typen: Astrozyten (Ernährung und Stoffaustausch der Nervenzellen), Oligodendrozyten (bilden die Myelinscheide im ZNS) und Mikroglia (amöboid beweglich, Makrophagenfunktion).",
        answer: true,
        solution: "Neuroglia hat bindegewebsähnliche Funktionen. Astrozyten = sternförmige Stützzellen. Oligodendrozyten = bilden Markscheide im ZNS (analog zu Schwann-Zellen im PNS). Mikroglia = immunologische Abwehr, phagozytiert Zelltrümmer."
      },
      seed: {
        statement: "Die Substantia alba (weiße Substanz) besteht aus markhaltigen Axonen und liegt im Großhirn außen als Kortex; die Substantia grisea (graue Substanz) besteht aus Nervenzellkörpern und liegt im Großhirn innen.",
        answer: false,
        solution: "Vertauscht: Im Großhirn liegt die graue Substanz AUSSEN als Kortex, die weiße Substanz INNEN. Im Rückenmark ist es genau umgekehrt: grau innen (Schmetterlingsform), weiß außen. Die weiße Farbe der Substantia alba kommt vom hohen Eiweißgehalt der Lipoprotein-Myelinscheide."
      },
      water: {
        statement: "Die Großhirnrinde ist aus 6 Schichten (Laminae) aufgebaut; die Lamina pyramidalis (Schicht III) besteht aus pyramidenförmig angeordneten Neuronen und ist vor allem für motorische Bereiche (Willkürbewegungen) zuständig.",
        answer: true,
        solution: "Die 6 Schichten von außen nach innen: 1. Lamina molecularis (faserreich, zellarm), 2. L. granularis externa (kleine Neurone, grobe Wahrnehmung), 3. L. pyramidalis (motorisch), 4. L. granularis interna (wie Schicht 2), 5. L. ganglionaris (größere Pyramidenzellen), 6. L. multiformis (Schaltneurone, Kommunikationsfunktion)."
      }
    },
    harvestQuestions: [
      {
        id: "1043_09_h1",
        type: "mc",
        question: "Welche Funktion haben Oligodendrozyten im ZNS?",
        options: [
          { text: "Sie bilden die Myelinscheide der Axone", correct: true },
          { text: "Sie dienen der Ernährung der Nervenzellen", correct: false },
          { text: "Sie haben eine amöboide Makrophagenfunktion", correct: false },
          { text: "Sie bilden Aktionspotenziale", correct: false }
        ],
        explanation: "Oligodendrozyten bilden die Markscheide (Myelinscheide) im ZNS – das Analogon zu den Schwann-Zellen im PNS. Astrozyten dienen der Ernährung und dem Stoffaustausch; Mikroglia hat die Makrophagenfunktion."
      },
      {
        id: "1043_09_h2",
        type: "true_false",
        statement: "Mikroglia sind amöboid beweglich und haben eine ähnliche Funktion wie Makrophagen im Immunsystem.",
        answer: true,
        explanation: "Korrekt. Mikroglia sind der 'Immuntyp' der Gliazellen: amöboid beweglich, phagozytieren Zelltrümmer und Erreger – damit erfüllen sie eine vergleichbare Funktion wie Makrophagen im peripheren Immunsystem."
      },
      {
        id: "1043_09_h3",
        type: "mc",
        question: "Wo befindet sich die Substantia grisea (graue Substanz) im Großhirn?",
        options: [
          { text: "Außen als Hirnrinde (Kortex)", correct: true },
          { text: "Innen in Schmetterlingsform", correct: false },
          { text: "Gleichmäßig verteilt", correct: false },
          { text: "Nur im Bereich des Corpus callosum", correct: false }
        ],
        explanation: "Im Großhirn liegt die Substantia grisea außen als Kortex (Hirnrinde). Im Rückenmark ist es umgekehrt: grau liegt innen in Schmetterlingsform. Dieser Unterschied ist prüfungsrelevant."
      },
      {
        id: "1043_09_h4",
        type: "true_false",
        statement: "Die Lamina pyramidalis (3. Schicht der Großhirnrinde) ist hauptsächlich für motorische Funktionen und Willkürbewegungen zuständig.",
        answer: true,
        explanation: "Korrekt. Die Lamina pyramidalis (Schicht III) enthält pyramidenförmig angeordnete Neurone und ist für motorische Bereiche zuständig. Die Lamina ganglionaris (Schicht V) enthält ähnliche, aber größere Pyramidenzellen."
      },
      {
        id: "1043_09_h5",
        type: "mc",
        question: "Welche drei Typen von Gliazellen (Neuroglia) unterscheidet man im ZNS?",
        options: [
          { text: "Astrozyten, Oligodendrozyten und Mikroglia", correct: true },
          { text: "Schwann-Zellen, Astrozyten und Mikroglia", correct: false },
          { text: "Monozyten, Astrozyten und Oligodendrozyten", correct: false },
          { text: "Astrozyten, Makrophagen und Fibroblasten", correct: false }
        ],
        explanation: "Die drei ZNS-Gliatypen: Astrozyten (Ernährung/Stoffaustausch), Oligodendrozyten (Myelinscheide), Mikroglia (Immunabwehr). Schwann-Zellen bilden die Myelinscheide im PNS, nicht im ZNS."
      }
    ],
    phase4Questions: [
      {
        id: "1043_09_p4_1",
        type: "mc",
        question: "Welche Aussagen zu den Gliatypen des ZNS sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Astrozyten dienen der Ernährung und dem Stoffaustausch der Nervenzellen", correct: true },
          { text: "Oligodendrozyten bilden die Myelinscheide im ZNS", correct: true },
          { text: "Mikroglia sind amöboid beweglich und haben Makrophagenfunktion", correct: true },
          { text: "Schwann-Zellen bilden die Myelinscheide im PNS (nicht im ZNS)", correct: true },
          { text: "Astrozyten bilden Aktionspotenziale wie Nervenzellen", correct: false }
        ],
        explanation: "Astrozyten sind Stütz- und Ernährungszellen, keine elektrisch erregbaren Zellen. Alle anderen Aussagen sind korrekt. Die Unterscheidung Oligodendrozyten (ZNS) vs. Schwann-Zellen (PNS) ist prüfungsrelevant."
      },
      {
        id: "1043_09_p4_2",
        type: "mc",
        question: "Welche Aussagen zu Substantia alba und grisea sind richtig? (Mehrere Antworten möglich)",
        options: [
          { text: "Substantia alba besteht aus markhaltigen Axonen (Faserbahnen)", correct: true },
          { text: "Substantia grisea besteht aus Nervenzellkörpern und ist marklos", correct: true },
          { text: "Im Großhirn liegt die graue Substanz außen als Kortex", correct: true },
          { text: "Im Rückenmark liegt die graue Substanz außen", correct: false },
          { text: "Die weiße Farbe der Substantia alba kommt vom Lipoprotein der Myelinscheide", correct: true }
        ],
        explanation: "Im Rückenmark liegt die graue Substanz INNEN (Schmetterlingsform: Hinterhorn, Vorderhorn, Seitenhorn), nicht außen. Im Großhirn ist es umgekehrt: grau außen."
      }
    ]
  })
