// Neue Pflanze für 1048 – Kap. 5 + aktueller Status: Fallaufnahme & 5 W-Fragen
// Gap: 5-W-Struktur der Anamnese (Wo/Wie/Wodurch/Womit/Warum) nirgends abgefragt;
//       Dt. Ärztetag 26.05.2022 (Streichung MWBO) komplett unerwähnt;
//       Faustregel akut→niedrige Potenz/häufige Gabe nur in p4, nicht in phase1

  makeDetailedPlant({
    id: "1048_09",
    title: "Fallaufnahme: Anamnese, 5 W-Fragen & aktueller Status",
    contextHint: "Kap. 5 – 5 W-Fragen: Wo (Lokalisation), Wie (Empfindung), Wodurch (Modalitäten besser/schlechter), Womit (Begleitsymptome), Warum (Ursache: Trauma/Impfung/Erlebnis); Leitsymptome = seltsam/auffällig; Kap. 1 – 26.05.2022 Dt. Ärztetag strich Homöopathie aus MWBO; Faustregel: je akuter → niedrigere Potenz + häufigere Gabe",
    phase1: {
      soil: {
        statement: "Die homöopathische Anamnese strukturiert sich in 5 W-Fragen: Wo (Lokalisation), Wie (Empfindung), Wodurch (Modalitäten – besser/schlechter), Womit (Begleitsymptome) und Warum (Ursache wie Trauma, Impfung oder emotionales Ereignis).",
        answer: true,
        solution: "Nach dem Selbstbericht folgen: Familienanamnese, Lebensstil, Ernährung, Verdauung, Schlaf- und Stressverhalten. Besonders auffällige, seltsame Symptome = Leitsymptome → führen zum richtigen Mittel."
      },
      seed: {
        statement: "Am 26. Mai 2022 anerkannte der Deutsche Ärztetag die Homöopathie als offizielle ärztliche Weiterbildungsbezeichnung und nahm sie neu in die Musterweiterbildungsordnung (MWBO) auf.",
        answer: false,
        solution: "FALSCH: Der Deutsche Ärztetag STRICH am 26.05.2022 die Zusatzbezeichnung 'Homöopathie' aus der MWBO. Homöopathie ist seitdem keine offiziell anerkannte ärztliche Weiterbildungsbezeichnung mehr in Deutschland."
      },
      water: {
        statement: "Je akuter eine Erkrankung ist, umso häufiger wird das Mittel gegeben und umso niedriger ist die Potenz; bei hochakuten Fällen kommt es primär auf das richtige Mittel an, erst sekundär auf die Potenz.",
        answer: true,
        solution: "Tiefpotenzen (<D6/C3): häufige Gaben, kurze Wirkdauer. Bei der akuten Notfallsituation nimmt man das verfügbare Mittel, auch wenn die Potenz nicht ideal ist. Hochpotenzen = seltene Gaben, tiefgreifende Wirkung, nur bei chronischen Erkrankungen."
      }
    },
    harvestQuestions: [
      {
        id: "1048_09_h1",
        type: "true_false",
        statement: "Die 5 W-Fragen der homöopathischen Anamnese lauten: Wo (Lokalisation), Wie (Empfindung), Wodurch (Modalitäten), Womit (Begleitsymptome) und Warum (Ursache).",
        answer: true,
        explanation: "Korrekt. Diese 5 Fragen bilden das Gerüst der homöopathischen Fallaufnahme. Sie helfen, das vollständige individuelle Symptombild zu erfassen – weit über die schulmedizinische Diagnose hinaus."
      },
      {
        id: "1048_09_h2",
        type: "mc",
        question: "Was erfasst die Frage 'Wodurch' in der homöopathischen Anamnese?",
        options: [
          { text: "Die Modalitäten – wodurch verschlechtern oder verbessern sich die Symptome", correct: true },
          { text: "Den Ursprungsort der Erkrankung im Körper", correct: false },
          { text: "Die Begleitsymptome (z.B. Kopfschmerz mit Übelkeit)", correct: false },
          { text: "Die Ursache (Trauma, Impfung, emotionales Erlebnis)", correct: false }
        ],
        explanation: "Wodurch = Modalitäten (besser/schlechter bei Wärme/Kälte, Bewegung/Ruhe, Tageszeiten). Den Ursprungsort erfasst 'Wo'; Begleitsymptome erfasst 'Womit'; die Ursache erfasst 'Warum'."
      },
      {
        id: "1048_09_h3",
        type: "true_false",
        statement: "Am 26. Mai 2022 strich der Deutsche Ärztetag die Zusatzbezeichnung 'Homöopathie' aus der Musterweiterbildungsordnung (MWBO).",
        answer: true,
        explanation: "Korrekt. Der Deutsche Ärztetag 2022 beschloss, die Zusatzbezeichnung Homöopathie aus der MWBO zu streichen. Homöopathie ist damit keine offiziell anerkannte ärztliche Weiterbildungsbezeichnung mehr."
      },
      {
        id: "1048_09_h4",
        type: "mc",
        question: "Was gilt als Faustregel für die Potenzwahl bei akuten Erkrankungen?",
        options: [
          { text: "Je akuter, umso niedriger die Potenz und umso häufiger die Gabe", correct: true },
          { text: "Je akuter, umso höher die Potenz und umso seltener die Gabe", correct: false },
          { text: "Bei akuten Erkrankungen immer Hochpotenzen (D30+)", correct: false },
          { text: "Bei akuten Erkrankungen ist die Potenz irrelevant – nur das Mittel zählt", correct: false }
        ],
        explanation: "Je akuter → niedrigere Potenz + häufigere Gabe. Tiefpotenzen haben kurze Wirkdauer, deshalb bei Akutfällen öfter wiederholen. Bei hochakut gilt: zuerst das richtige Mittel, erst dann die ideale Potenz."
      },
      {
        id: "1048_09_h5",
        type: "mc",
        question: "Was sind 'Leitsymptome' in der homöopathischen Fallaufnahme?",
        options: [
          { text: "Besonders auffällige, seltsame oder ungewöhnliche Symptome, die zur Mittelfindung führen", correct: true },
          { text: "Die häufigsten und typischsten Symptome der jeweiligen Erkrankung", correct: false },
          { text: "Alle objektiv messbaren Symptome (Fieber, Puls, Laborwerte)", correct: false },
          { text: "Symptome, die durch die schulmedizinische Diagnose erklärt werden", correct: false }
        ],
        explanation: "Leitsymptome sind gerade die seltsamen, ungewöhnlichen, auffälligen Symptome – nicht die gewöhnlichen, erkrankungstypischen. Sie führen am direktesten zum passenden homöopathischen Mittel (Similimum)."
      }
    ],
    phase4Questions: [
      {
        id: "1048_09_p4_1",
        type: "mc",
        question: "Welche Aussagen zur homöopathischen Fallaufnahme sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "'Womit' erfasst Begleitsymptome (z.B. Übelkeit begleitend zum Kopfschmerz)", correct: true },
          { text: "'Warum' fragt nach der auslösenden Ursache (Trauma, Impfung, emotionales Erlebnis)", correct: true },
          { text: "Für die Mittelfindung reicht die schulmedizinische ICD-Diagnose allein aus", correct: false },
          { text: "Leitsymptome = besonders seltsame, auffällige Symptome → zeigen das passende Mittel an", correct: true }
        ],
        explanation: "Die schulmedizinische Diagnose allein reicht nicht – die Gesamtheit aller Symptome (inkl. Leitsymptome und Modalitäten) ist entscheidend. 'Womit' = Begleitsymptome; 'Warum' = Ursache."
      },
      {
        id: "1048_09_p4_2",
        type: "mc",
        question: "Welche Aussagen zu Potenzwahl und aktuellem Status der Homöopathie sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Je akuter die Erkrankung, umso niedriger die Potenz und häufiger die Gabe", correct: true },
          { text: "Bei hochakuten Fällen: zuerst das richtige Mittel, erst dann die ideale Potenz", correct: true },
          { text: "Der Deutsche Ärztetag strich 2022 die Zusatzbezeichnung Homöopathie aus der MWBO", correct: true },
          { text: "Homöopathie ist seit 2022 in der Notfallmedizin der Schulmedizin gleichgestellt", correct: false }
        ],
        explanation: "Die Faustregel akut→niedrig/häufig gilt allgemein. Bei Notfall: Mittelwahl > Potenzwahl. Der Ärztetag-Beschluss 2022 entzieht der Homöopathie die offizielle ärztliche Weiterbildungsanerkennung. In der Notfallmedizin hat Homöopathie grundsätzlich keinen Platz."
      }
    ]
  })
