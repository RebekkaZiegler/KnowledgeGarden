// Neue Pflanze für 1044 – Kap. 2.2: Hilfsorgane des Auges
// Gap: vollständig fehlend in bisherigen 8 Pflanzen

  makeDetailedPlant({
    id: "1044_09",
    title: "Hilfsorgane des Auges",
    contextHint: "Kap. 2.2 – 6 Augenmuskeln (Innervation N. III/IV/VI), Augenlider, Tränenapparat, Liddrüsen (Meibom/Moll/Zeis), Schielung",
    phase1: {
      soil: {
        statement: "Die 6 Augenmuskeln werden von drei Hirnnerven innerviert: N. oculomotorius (III.) innerviert M. rectus superior/inferior/medialis und M. obliquus inferior; N. trochlearis (IV.) innerviert M. obliquus superior; N. abducens (VI.) innerviert M. rectus lateralis.",
        answer: true,
        solution: "Merkhilfe: N. abducens (VI.) = M. rectus lateralis (zieht Auge nach AUSSEN/lateral). N. trochlearis (IV.) = M. obliquus superior (leichte Rotation). Alle anderen 4 Augenmuskeln → N. oculomotorius (III.). Schielung entsteht bei Hirnnervenstörung."
      },
      seed: {
        statement: "Die Tränendrüse (Glandula lacrimalis) liegt medial am unteren Augapfel; das abgesonderte Sekret wird über den Tränenkanal direkt in die Nasenhaupthöhle abgeleitet.",
        answer: false,
        solution: "Die Tränendrüse liegt LATERAL am OBEREN Augapfel (nicht medial/unten). Das Sekret wird durch den Lidschlag über die Bindehaut verteilt und über den Tränenkanal (mit punktförmiger Öffnung am inneren Augenwinkel) in die Nase abgeleitet."
      },
      water: {
        statement: "Zu den Hilfs- und Schutzeinrichtungen des Auges gehören Augenlider (Palpebra superior/inferior), Augenbrauen, Wimpern, Bindehaut (Konjunktiva) und Tränenapparat; an den Augenlidern befinden sich drei Drüsentypen: Meibomdrüsen, Molldrüsen und Zeisdrüsen.",
        answer: true,
        solution: "Liddrüsen: Meibomdrüsen = fetten Lidrand ein (verhindern Überlaufen der Tränen). Molldrüsen = Schweißdrüsen. Zeisdrüsen = Talgdrüsen. Bindehaut (Konjunktiva): kleidet Innenfläche der Lider aus, verbindet Augapfel und Lid."
      }
    },
    harvestQuestions: [
      {
        id: "1044_09_h1",
        type: "mc",
        question: "Welcher Hirnnerv innerviert den M. rectus lateralis?",
        options: [
          { text: "N. oculomotorius (III. Hirnnerv)", correct: false },
          { text: "N. trochlearis (IV. Hirnnerv)", correct: false },
          { text: "N. abducens (VI. Hirnnerv)", correct: true },
          { text: "N. facialis (VII. Hirnnerv)", correct: false }
        ],
        explanation: "M. rectus lateralis zieht das Auge nach lateral (außen) und wird vom N. abducens (VI. Hirnnerv) innerviert. N. trochlearis innerviert nur den M. obliquus superior; alle übrigen 4 Augenmuskeln werden vom N. oculomotorius (III.) innerviert."
      },
      {
        id: "1044_09_h2",
        type: "true_false",
        statement: "Schielung (Strabismus) entsteht durch eine Schwäche oder Funktionsstörung der Augenmuskeln bzw. der sie innervierenden Hirnnerven (III., IV. oder VI.).",
        answer: true,
        explanation: "Korrekt. Bei Muskelschwäche oder Hirnnervenstörung führen beide Augen keine gleichartigen Bewegungen mehr aus → Strabismus (Schielung). Die Innervation erfolgt physiologisch immer symmetrisch an beiden Augen."
      },
      {
        id: "1044_09_h3",
        type: "mc",
        question: "Wo liegt die Tränendrüse (Glandula lacrimalis)?",
        options: [
          { text: "Medial am unteren Augapfel", correct: false },
          { text: "Lateral am oberen Augapfel", correct: true },
          { text: "Im inneren Augenwinkel", correct: false },
          { text: "Hinter der Iris", correct: false }
        ],
        explanation: "Die Tränendrüse (Glandula lacrimalis) liegt lateral am oberen Augapfel. Das Sekret wird durch den Lidschlag über die Bindehaut verteilt; der Tränenkanal mit punktförmiger Öffnung am inneren Augenwinkel leitet es in die Nase ab."
      },
      {
        id: "1044_09_h4",
        type: "true_false",
        statement: "Der M. obliquus superior wird vom N. trochlearis (IV. Hirnnerv) innerviert und ermöglicht eine leichte Rotation des Augapfels.",
        answer: true,
        explanation: "Korrekt. N. trochlearis (IV.) innerviert ausschließlich den M. obliquus superior (ermöglicht leichte Rotation). N. abducens (VI.) → M. rectus lateralis. N. oculomotorius (III.) → alle anderen 4 Augenmuskeln."
      },
      {
        id: "1044_09_h5",
        type: "mc",
        question: "Welche Liddrüsen fetten den Lidrand ein und verhindern so das Überlaufen der Tränen?",
        options: [
          { text: "Molldrüsen (Schweißdrüsen)", correct: false },
          { text: "Zeisdrüsen (Talgdrüsen)", correct: false },
          { text: "Meibomdrüsen", correct: true },
          { text: "Glandula lacrimalis", correct: false }
        ],
        explanation: "Meibomdrüsen fetten den Lidrand ein – das verhindert das Überlaufen der Tränenflüssigkeit über den Lidrand. Molldrüsen = Schweißdrüsen, Zeisdrüsen = Talgdrüsen. Glandula lacrimalis = Tränendrüse, liegt lateral oben."
      }
    ],
    phase4Questions: [
      {
        id: "1044_09_p4_1",
        type: "mc",
        question: "Welche Augenmuskeln werden vom N. oculomotorius (III. Hirnnerv) innerviert? (Mehrere Antworten möglich)",
        options: [
          { text: "M. rectus superior", correct: true },
          { text: "M. rectus inferior", correct: true },
          { text: "M. rectus medialis", correct: true },
          { text: "M. obliquus inferior", correct: true },
          { text: "M. rectus lateralis", correct: false },
          { text: "M. obliquus superior", correct: false }
        ],
        explanation: "N. oculomotorius (III.) innerviert 4 Augenmuskeln: M. rectus superior, inferior, medialis und M. obliquus inferior. M. rectus lateralis → N. abducens (VI.). M. obliquus superior → N. trochlearis (IV.)."
      },
      {
        id: "1044_09_p4_2",
        type: "mc",
        question: "Welche Aussagen zu den Hilfsorganen des Auges sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Die Tränendrüse liegt lateral am oberen Augapfel", correct: true },
          { text: "Meibomdrüsen fetten den Lidrand ein und verhindern das Überlaufen der Tränen", correct: true },
          { text: "Die Bindehaut (Konjunktiva) kleidet die Innenfläche der Augenlider aus", correct: true },
          { text: "Wimpern schützen das Auge vor Fremdkörpern und lösen Lidschlussreflex aus", correct: true },
          { text: "Der Tränenkanal leitet Tränenflüssigkeit in die Mundhöhle", correct: false }
        ],
        explanation: "Der Tränenkanal leitet Tränenflüssigkeit in die NASE (nicht in die Mundhöhle) – deshalb riecht man bei starkem Weinen bisweilen salzig in der Nase. Alle anderen Aussagen sind korrekt."
      }
    ]
  })
