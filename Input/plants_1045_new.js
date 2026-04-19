// Neue Pflanze für 1045 – Kap. 3.2 + 3.1.1-3.1.2: Orale Zubereitungsformen im Detail & Trägersubstanzen
// Gap: Infus vs. Decoctum vs. Mazeration (wann welche Methode?) + fette vs. mineralische Öle als Träger

  makeDetailedPlant({
    id: "1045_09",
    title: "Orale Zubereitungsformen im Detail & Trägersubstanzen",
    contextHint: "Kap. 3.2 – Infus (5–15 Min, ätherische Öle), Decoctum (Wurzeln/Rinden, 10 Min kochen), Mazeration (Schleimstoffe/Saponine, 3–12 Std.); Kap. 3.1.1–3.1.2 – fette vs. mineralische Öle als Träger",
    phase1: {
      soil: {
        statement: "Für Wurzeln, Rinden und holzige Pflanzenteile mit bitterstoff- oder gerbstoffhaltigen Inhaltsstoffen ist das Decoctum (Abkochung) die geeignete Zubereitungsform: in kaltes Wasser geben, aufkochen und 10 Minuten kochen lassen.",
        answer: true,
        solution: "Decoctum: 1 TL–1 EL auf 1 Tasse kaltes Wasser, aufkochen, 10 Min kochen + 10 Min ziehen. Ätherische Öle verflüchtigen sich dabei – das muss man in Kauf nehmen. Infus = heiß übergießen, 5–15 Min ziehen (für ätherische Öle, kein Kochen)."
      },
      seed: {
        statement: "Die Mazeration (Kaltwasserauszug) eignet sich besonders für schleimstoff- und saponinhaltige Drogen; sie verwendet die doppelte Kräutermenge und lässt 3–12 Stunden (am besten über Nacht) stehen.",
        answer: true,
        solution: "Schleimstoffe und Saponine lösen sich in kaltem Wasser besser als in heißem oder in Alkohol. Bei gemischten Pflanzen (zarte + holzige Teile): Kaltwasseraufguss mit anschließender Abkochung oder Infus."
      },
      water: {
        statement: "Mineralische Öle (Paraffine, Vaseline) eignen sich als Trägersubstanzen für perkutane Heilmittel, weil sie gut durch die Haut aufgenommen werden und Wirkstoffe effizient in tiefe Schichten transportieren.",
        answer: false,
        solution: "Mineralische Öle werden von der Haut NICHT aufgenommen – deshalb ungeeignet als Träger perkutaner Wirkstoffe. Geeignet: fette Pflanzenöle (Olivenöl, Erdnussöl, Sonnenblumenöl, Weizenkeimöl). Mineralische Öle nur für Schutzcremes (Zinkpaste/Wundcremes)."
      }
    },
    harvestQuestions: [
      {
        id: "1045_09_h1",
        type: "mc",
        question: "Welche orale Zubereitungsform ist für schleimstoff- und saponinhaltige Drogen am besten geeignet?",
        options: [
          { text: "Mazeration (Kaltwasserauszug, 3–12 Std.)", correct: true },
          { text: "Decoctum (Abkochung, 10 Min kochen)", correct: false },
          { text: "Infus (Heißwasseraufguss, 5–15 Min)", correct: false },
          { text: "Tinktur (Alkoholauszug)", correct: false }
        ],
        explanation: "Mazeration: doppelte Kräutermenge mit kaltem Wasser, 3–12 Std. ziehen. Schleimstoffe und Saponine lösen sich in kaltem Wasser besser; Alkohol (Tinktur) ist für diese Wirkstoffe ungeeignet."
      },
      {
        id: "1045_09_h2",
        type: "true_false",
        statement: "Beim Decoctum werden die Pflanzenteile mit kochendem Wasser übergossen und 5–15 Minuten ziehen gelassen.",
        answer: false,
        explanation: "Falsch. Das ist der Infus (Heißwasseraufguss). Beim Decoctum: Pflanzenteile in KALTES Wasser geben, aufkochen, 10 Minuten KOCHEN, dann nochmals 10 Minuten ziehen lassen. Nur für Wurzeln, Rinden und holzige Teile."
      },
      {
        id: "1045_09_h3",
        type: "mc",
        question: "Warum ist beim Infus (Heißwasseraufguss) das Zudecken der Teekanne wichtig?",
        options: [
          { text: "Damit ätherische Öle nicht verflüchtigen", correct: true },
          { text: "Um die Extraktion von Schleimstoffen zu beschleunigen", correct: false },
          { text: "Um den Bittergeschmack zu reduzieren", correct: false },
          { text: "Um die Keimfreiheit zu gewährleisten", correct: false }
        ],
        explanation: "Ätherische Öle sind flüchtig und schwimmen auf der Wasseroberfläche. Ohne Deckel oder wenn das Wasser kocht, verflüchtigen sie sich. Deshalb: kochendes Wasser übergießen (nicht mitkochen!) und zudecken."
      },
      {
        id: "1045_09_h4",
        type: "true_false",
        statement: "Fette Pflanzenöle (z. B. Olivenöl, Weizenkeimöl) dringen durch die Haut ein und eignen sich als Trägersubstanzen für ätherische Öle bei Hautanwendungen.",
        answer: true,
        explanation: "Korrekt. Fette Pflanzenöle dringen gut durch die Haut und nehmen Arzneizusätze (ätherische Öle) mit. Herstellungsverfahren: 1 Teil Kräuter : 3 Teile Pflanzenöl, 4–6 Wochen an sonnigem Ort. Mineralische Öle (Paraffin, Vaseline) können nicht durch die Haut aufgenommen werden."
      },
      {
        id: "1045_09_h5",
        type: "mc",
        question: "Für welche Situation eignet sich der Kaltwasseraufguss mit anschließender Abkochung?",
        options: [
          { text: "Bei einem Gemisch aus zarten und holzigen Pflanzenteilen", correct: true },
          { text: "Nur für schleimstoffhaltige Drogen ohne holzige Anteile", correct: false },
          { text: "Wenn der Alkoholgehalt einer Tinktur reduziert werden soll", correct: false },
          { text: "Ausschließlich für frische Pflanzen", correct: false }
        ],
        explanation: "Kaltwasseraufguss mit anschließender Abkochung (oder Infus): ideal bei Gemisch aus zarten und holzigen Pflanzenteilen. Zarte Teile werden zunächst kalt mazeriert, holzige Teile anschließend abgekocht – beide Auszüge werden gemischt."
      }
    ],
    phase4Questions: [
      {
        id: "1045_09_p4_1",
        type: "mc",
        question: "Welche Wirkstoff-Zubereitungsform-Paare sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Schleimstoffe → Mazeration (Kaltwasserauszug)", correct: true },
          { text: "Ätherische Öle → Infus (heiß übergießen, zudecken, nicht kochen)", correct: true },
          { text: "Bitterstoffe/Gerbstoffe (Wurzeln/Rinden) → Decoctum (Abkochung)", correct: true },
          { text: "Saponine → Tinktur (Alkoholauszug)", correct: false },
          { text: "Alle Wirkstoffe lassen sich gleich gut durch Infus extrahieren", correct: false }
        ],
        explanation: "Saponine lösen sich in Alkohol schlecht – Tinktur ist ungeeignet. Für Saponine empfiehlt sich Mazeration. Der Infus eignet sich nicht für Wurzeln/Rinden (unvollständige Extraktion) und zerstört durch Hitze Schleimstoffe."
      },
      {
        id: "1045_09_p4_2",
        type: "mc",
        question: "Welche Aussagen zu Trägersubstanzen und Frischpflanzenzubereitungen sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Fette Pflanzenöle dringen durch die Haut ein und transportieren Wirkstoffe", correct: true },
          { text: "Mineralische Öle (Paraffin, Vaseline) werden von der Haut nicht aufgenommen", correct: true },
          { text: "Kalt gepresstes Pflanzenöl ist weniger haltbar als mineralisches Öl", correct: true },
          { text: "Frischpflanzensäfte nach HAB (homöopathisch) werden aus getrockneten Pflanzen hergestellt", correct: false },
          { text: "Mineralische Öle sind sinnvoll für Schutzcremes (z. B. mit Zinkpaste)", correct: true }
        ],
        explanation: "Frischpflanzensäfte nach HAB (Homöopathisches Arzneibuch) werden aus FRISCHEN Pflanzen hergestellt – das ist ihr Vorteil (alle Vitamine erhalten). Tinkturen nach DAB (Deutsches Arzneibuch) verwenden getrocknete Pflanzen."
      }
    ]
  })
