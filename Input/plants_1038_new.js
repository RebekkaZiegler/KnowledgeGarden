// New plants for VERDAUUNGSTRAKT_1038_PLANTS
// Gap identified: Dickdarmmotorik (retrograde Peristaltik, Haustren-Peristaltik, große Colonbewegungen, gastro-colischer Reflex) + Centrum anospinale (S3–S4)

  makeDetailedPlant({
    id: "dickdarmmotorik",
    title: "Dickdarmmotorik und Defäkationsreflex",
    contextHint: "Studienbrief 1038 Verdauungstrakt – Dickdarmmotorik und Defäkation",
    phase1: {
      soil: {
        statement: "Die retrograde Peristaltik des Dickdarms transportiert Chymus zurück und verlängert die Verweildauer für die Wasserresorption.",
        answer: true,
        solution: "Der Dickdarm hat drei Bewegungstypen: (1) Retrograde Peristaltik (antiperistaltische Wellen): transportiert Inhalt zurück → verlängert Verweildauer → fördert H2O-Resorption – charakteristisch für den Dickdarm, nicht für den Dünndarm. (2) Haustren-Peristaltik: rhythmische Kontraktionen der Haustrationsmuskulatur → Durchmischung und Wandkontakt → verbessert Resorption. (3) Große Colonbewegungen (mass movements): kräftige propulsive Wellen, 1–3x täglich, erfassen große Dickdarmabschnitte → Weitertransport in Richtung Rectum."
      },
      seed: {
        statement: "Der gastro-colische Reflex hemmt die Colonmotorik nach einer Mahlzeit, um die Verdauung im Magen nicht zu stören.",
        answer: false,
        solution: "Der gastro-colische Reflex aktiviert (stimuliert) die Colonmotorik nach einer Mahlzeit. Magenausdehnung durch Nahrung → über N. vagus und lokale enterische Reflexe → verstärkte Colonperistaltik (große Colonbewegungen) → Defäkationsdrang. Dies erklärt, warum viele Menschen kurz nach dem Essen Stuhldrang empfinden."
      },
      water: {
        statement: "Das Defäkationszentrum (Centrum anospinale) liegt im Sakralmark (S3–S4) und koordiniert den Defäkationsreflex.",
        answer: true,
        solution: "Das Centrum anospinale liegt im Sakralmark S3–S4. Dehnungsrezeptoren im Rectum → Afferenz zum Centrum anospinale → Relaxation M. sphincter ani internus (glatte Muskulatur, unwillkürlich) + Pressreflex. Der M. sphincter ani externus (quergestreifte Muskulatur, willkürlich) kann die Defäkation bewusst hinausschieben. Bei Rückenmarksverletzungen oberhalb S3 → spinaler Automatismus (Reflexdefäkation); unterhalb S3 → schlaffer Sphinkter → Stuhlinkontinenz."
      }
    },
    harvestQuestions: [
      {
        id: "dickdarmmot_h1",
        type: "mc",
        question: "Welche Bewegungsform ist typisch für den Dickdarm, aber nicht für den Dünndarm?",
        options: [
          { text: "Retrograde Peristaltik", correct: true },
          { text: "Segmentationsperistaltik", correct: false },
          { text: "Pendelbewegung", correct: false },
          { text: "Propulsive Peristaltik", correct: false }
        ],
        explanation: "Retrograde Peristaltik (antiperistaltische Wellen) ist charakteristisch für den Dickdarm: sie verlangsamt den Transport → verlängert Verweildauer für H2O-Resorption. Segmentationsperistaltik und Pendelbewegung sind Dünndarm-typisch. Propulsive Peristaltik kommt in beiden Darmabschnitten vor."
      },
      {
        id: "dickdarmmot_h2",
        type: "true_false",
        statement: "Große Colonbewegungen treten 1–3x täglich auf und werden häufig durch den gastro-colischen Reflex nach einer Mahlzeit ausgelöst.",
        answer: true,
        explanation: "Große Colonbewegungen (mass movements) sind kräftige peristaltische Wellen, die große Dickdarmabschnitte erfassen und 1–3x täglich auftreten. Der gastro-colische Reflex (Magenausdehnung → Colonaktivierung) ist ein Hauptauslöser → Defäkationsdrang nach dem Essen."
      },
      {
        id: "dickdarmmot_h3",
        type: "mc",
        question: "Wo liegt das Centrum anospinale, das den Defäkationsreflex koordiniert?",
        options: [
          { text: "Sakralmark (S3–S4)", correct: true },
          { text: "Lumbales Rückenmark (L1–L2)", correct: false },
          { text: "Hirnstamm (Medulla oblongata)", correct: false },
          { text: "Thorakales Rückenmark (Th6–Th8)", correct: false }
        ],
        explanation: "Das Centrum anospinale liegt im Sakralmark S3–S4. Dehnungsrezeptoren im Rectum leiten Afferenzen dorthin; der Reflex entspannt den M. sphincter ani internus (glatte Muskulatur, unwillkürlich). Der willkürliche Sphinkter externus (quergestreift) kann die Defäkation hinausschieben."
      },
      {
        id: "dickdarmmot_h4",
        type: "true_false",
        statement: "Der M. sphincter ani internus erschlafft beim Defäkationsreflex unwillkürlich, weil er aus glatter Muskulatur besteht.",
        answer: true,
        explanation: "M. sphincter ani internus (glatte Muskulatur, unwillkürlich): relaxiert bei Rectumfüllung automatisch über den Defäkationsreflex (Centrum anospinale S3–S4). Der M. sphincter ani externus (quergestreift, willkürlich) kann dagegen aktiv zugehalten werden, bis ein geeigneter Zeitpunkt zur Defäkation besteht."
      },
      {
        id: "dickdarmmot_h5",
        type: "mc",
        question: "Was ist die Hauptfunktion der Haustren-Peristaltik im Dickdarm?",
        options: [
          { text: "Durchmischung des Darminhalts und Verbesserung des Wandkontakts für die Resorption", correct: true },
          { text: "Schneller Transport des Inhalts in Richtung Anus", correct: false },
          { text: "Retrograder Transport zur Verlängerung der Verweildauer", correct: false },
          { text: "Auslösung des Defäkationsreflexes durch Rectumfüllung", correct: false }
        ],
        explanation: "Haustren-Peristaltik: rhythmische Kontraktionen der Haustrationsmuskulatur → Durchmischung des Dickdarminhalts + Verbesserung des Wandkontakts → effizientere H2O- und Elektrolytresorption. Retrograder Transport: retrograde Peristaltik. Analer Weitertransport: große Colonbewegungen."
      }
    ],
    phase4Questions: [
      {
        id: "dickdarmmot_mc1",
        type: "mc",
        question: "Welche Aussagen zur Dickdarmmotorik sind korrekt?",
        options: [
          { text: "Retrograde Peristaltik verlangsamt den Weitertransport und verlängert die Verweildauer", correct: true },
          { text: "Große Colonbewegungen treten 1–3x täglich auf", correct: true },
          { text: "Der gastro-colische Reflex hemmt die Colonmotorik nach einer Mahlzeit", correct: false },
          { text: "Haustren-Peristaltik dient der Durchmischung des Darminhalts", correct: true }
        ]
      },
      {
        id: "dickdarmmot_mc2",
        type: "mc",
        question: "Welche Aussagen zum Defäkationsreflex sind korrekt?",
        options: [
          { text: "Das Centrum anospinale liegt im Sakralmark (S3–S4)", correct: true },
          { text: "Dehnungsrezeptoren im Rectum lösen den Defäkationsreflex aus", correct: true },
          { text: "Der M. sphincter ani externus kann den Defäkationsreflex willkürlich hemmen", correct: true },
          { text: "Der M. sphincter ani internus besteht aus quergestreifter Muskulatur und ist willkürlich kontrollierbar", correct: false }
        ]
      }
    ]
  }),

