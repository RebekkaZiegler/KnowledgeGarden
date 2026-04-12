// Studienbrief 1042 — Strukturen und Funktion des Hormonsystems
// Temp file: merge into js/content.js before PACK_CONTENT

const HORMONSYSTEM_1042_PLANTS = [

  makeDetailedPlant({
    id: "hormonsystem_einleitung",
    title: "Einführung ins Hormonsystem: Steuersysteme und Hormone",
    contextHint: "Studienbrief 1042 Hormonsystem – Nervensystem vs. endokrines System, Hormon-Basics",
    phase1: {
      soil: {
        statement: "Der menschliche Körper besitzt zwei übergeordnete Steuersysteme: das Nervensystem steuert schnell über elektrische Impulse, während das endokrine System langsam über biochemische Botenstoffe (Hormone) im Blut wirkt; beide Systeme ergänzen sich gegenseitig.",
        answer: true,
        solution: "Das Nervensystem arbeitet elektrisch und sehr schnell (Millisekunden). Das endokrine System arbeitet chemisch-humoral, d.h. Hormone werden von endokrinen Drüsen direkt ins Blut abgegeben und gelangen so zu ihren Zielorganen — langsamer, aber langanhaltend. Hormone sind reine Informationsträger (biochemische Botenstoffe), keine Energielieferanten, und werden nach Gebrauch in Leber und Niere abgebaut."
      },
      seed: {
        statement: "Hormone sind artspezifisch und wirken deshalb ausschließlich innerhalb derselben Spezies — ein menschliches Hormon hätte in einem Tier keine Wirkung.",
        answer: false,
        solution: "Hormone sind grundsätzlich NICHT artspezifisch — sie wirken auch in anderen Spezies. Eine wichtige Ausnahme ist das Wachstumshormon (STH = Somatotropin): es ist artspezifisch und wirkt nur beim Menschen. Deshalb wird gentechnisch hergestelltes humanes Wachstumshormon für die Therapie verwendet. Alle anderen klassischen Hormone (Insulin, Schilddrüsenhormone usw.) sind nicht artspezifisch."
      },
      water: {
        statement: "Endokrine Drüsen besitzen keinen Ausführungsgang; sie sezernieren ihre Produkte direkt ins Blut, im Gegensatz zu exokrinen Drüsen (z. B. Speicheldrüsen), die über einen Gang nach außen abgeben.",
        answer: true,
        solution: "Dies ist das Kernmerkmal endokriner Drüsen: kein Ausführungsgang (ductless), direkte Abgabe ins Blut (= endokrine Sekretion). Beispiele: Schilddrüse, Nebenniere, Hypophyse, Pankreas (Insulinanteil), Ovarien, Hoden. Exokrine Drüsen (Speicheldrüsen, Schweißdrüsen, Bauchspeicheldrüse-Verdauungsanteil) hingegen leiten ihre Sekrete über Ausführungsgänge nach außen oder in Hohlräume."
      }
    },
    harvestQuestions: [
      {
        id: "hormonsystem_einleitung_h1",
        type: "mc",
        question: "Was unterscheidet das Nervensystem vom endokrinen System in der Art der Steuerung?",
        options: [
          { text: "Das Nervensystem wirkt langsam chemisch, das endokrine System schnell elektrisch", correct: false },
          { text: "Das Nervensystem wirkt schnell elektrisch, das endokrine System langsam chemisch über Blut", correct: true },
          { text: "Beide Systeme arbeiten gleich schnell über elektrische Impulse", correct: false },
          { text: "Das endokrine System wirkt nur lokal, das Nervensystem systemisch", correct: false }
        ],
        explanation: "Das Nervensystem steuert über elektrische Impulse sehr schnell (Millisekunden). Das endokrine System setzt biochemische Botenstoffe (Hormone) frei, die über den Blutweg langsamer, aber dauerhaft auf Zielorgane wirken."
      },
      {
        id: "hormonsystem_einleitung_h2",
        type: "true_false",
        statement: "Hormone sind reine Informationsträger — sie liefern dem Körper keine Energie.",
        answer: true,
        explanation: "Hormone transportieren Informationen (Signale) an Zielzellen, sind aber selbst keine Energielieferanten. Die Energieversorgung übernehmen Nährstoffe (Glucose, Fettsäuren). Hormone steuern lediglich, wie und wo Energie genutzt oder gespeichert wird."
      },
      {
        id: "hormonsystem_einleitung_h3",
        type: "mc",
        question: "Welches Hormon ist eine Ausnahme und wirkt artspezifisch (nur beim Menschen)?",
        options: [
          { text: "Insulin", correct: false },
          { text: "Aldosteron", correct: false },
          { text: "Wachstumshormon (STH / Somatotropin)", correct: true },
          { text: "Adrenalin", correct: false }
        ],
        explanation: "Wachstumshormon (STH) ist das einzige klassische Hormon, das artspezifisch ist. Deshalb musste für die Behandlung von Wachstumsstörungen früher Hypophysenextrakt von Verstorbenen verwendet werden; heute wird es gentechnisch hergestellt."
      },
      {
        id: "hormonsystem_einleitung_h4",
        type: "mc",
        question: "Wo werden Hormone nach ihrer Wirkung im Körper abgebaut?",
        options: [
          { text: "In der Milz und im Knochenmark", correct: false },
          { text: "In Leber und Niere", correct: true },
          { text: "In der Lunge und im Herz", correct: false },
          { text: "Im Dünndarm durch Verdauungsenzyme", correct: false }
        ],
        explanation: "Hormone werden nach Erfüllung ihrer Funktion hauptsächlich in Leber und Niere enzymatisch abgebaut und ausgeschieden. Dieser geregelte Abbau ermöglicht die präzise Steuerung durch den Körper."
      },
      {
        id: "hormonsystem_einleitung_h5",
        type: "true_false",
        statement: "Exokrine Drüsen geben ihre Sekrete direkt ins Blut ab, während endokrine Drüsen Ausführungsgänge besitzen.",
        answer: false,
        explanation: "Genau umgekehrt: ENDOkrine Drüsen geben ihre Hormone OHNE Ausführungsgang direkt ins Blut ab (= innere Sekretion). EXOkrine Drüsen besitzen Ausführungsgänge und leiten ihre Sekrete nach außen oder in Körperhöhlen (z. B. Speicheldrüsen → Mundhöhle, Schweißdrüsen → Hautoberfläche)."
      }
    ],
    phase4Questions: [
      {
        id: "hormonsystem_einleitung_mc1",
        type: "mc",
        question: "Welche Aussagen über Hormone und das endokrine System sind korrekt?",
        options: [
          { text: "Hormone sind biochemische Botenstoffe und reine Informationsträger", correct: true },
          { text: "Hormone werden in Leber und Niere abgebaut", correct: true },
          { text: "Alle Hormone wirken artspezifisch", correct: false },
          { text: "Endokrine Drüsen besitzen keinen Ausführungsgang", correct: true }
        ]
      },
      {
        id: "hormonsystem_einleitung_mc2",
        type: "mc",
        question: "Welche Aussagen über die zwei Körpersteuersysteme stimmen?",
        options: [
          { text: "Das Nervensystem wirkt schnell elektrisch", correct: true },
          { text: "Das endokrine System wirkt langsam chemisch über das Blut", correct: true },
          { text: "Das Wachstumshormon (STH) ist artspezifisch", correct: true },
          { text: "Das endokrine System ersetzt das Nervensystem bei schnellen Reaktionen", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "hypothalamus_hypophyse",
    title: "Hypothalamus und Hypophyse: Steuerzentrale des Hormonsystems",
    contextHint: "Studienbrief 1042 Hormonsystem – Hypothalamus RH/IH, HVL/HHL, Adenohypophyse",
    phase1: {
      soil: {
        statement: "Der Hypothalamus liegt unterhalb des Thalamus im Zwischenhirn; er ist die übergeordnete Schaltzentrale, die das Nervensystem mit dem endokrinen System verbindet, indem er nervöse Reize in hormonelle Signale umwandelt; er produziert Releasing-Hormone (RH = Liberine) und Inhibiting-Hormone (IH = Statine).",
        answer: true,
        solution: "RH (Releasing-Hormone / Liberine) wirken wie ein Gaspedal: TRH→TSH, GnRH→FSH/LH/ICSH, GRH→STH, PRH→Prolaktin, CRH→ACTH, MRH→MSH. IH (Inhibiting-Hormone / Statine) wirken wie eine Bremse: GIH/Somatostatin hemmt STH, PIH hemmt Prolaktin, MIH hemmt MSH. Der Hypothalamus steuert über die Hypophyse alle lebenswichtigen Prozesse: Fortpflanzung, Wachstum und Reifung, Kreislauf, Atmung, Aktivität/Ruhe, Energie-, Wärme- und Flüssigkeitshaushalt."
      },
      seed: {
        statement: "Der Hypophysenhinterlappen (HHL = Neurohypophyse) produziert die Hormone Oxytocin und ADH selbst und gibt sie bei Bedarf ins Blut ab.",
        answer: false,
        solution: "Der HHL produziert KEINE eigenen Hormone. Er speichert lediglich Hormone, die vom Hypothalamus produziert werden — nämlich Oxytocin (Uteruskontraktion, Gegenspieler des Prolaktins) und ADH/Adiuretin/Vasopressin (Wasserretention in der Niere). Der HVL (Hypophysenvorderlappen = Adenohypophyse) hingegen produziert, speichert UND setzt selbst Hormone frei."
      },
      water: {
        statement: "Die Hypophyse ist walzenförmig, wiegt etwa 0,6 g und liegt in der Sella turcica (türkischen Sattel) des Keilbeins; der Hypophysenstiel verbindet sie mit dem Hypothalamus.",
        answer: true,
        solution: "Die glandotropen Hormone des HVL (Hypophysenvorderlappen) steuern nachgeordnete Drüsen: TSH→Schilddrüse, ACTH→Nebennierenrinde, FSH/LH→Gonaden. Die direkt wirkenden (effektorischen) HVL-Hormone sind: STH (Somatotropin/Wachstumshormon; Mangel→Zwergwuchs, Überschuss→Riesenwuchs), MSH (Melanostimulierendes Hormon; Hautpigmentierung), Prolaktin/LTH (Milchproduktion). Hypothalamus und HVL sind direkt über ein Blutgefäßsystem (Pfortadersystem) miteinander verbunden."
      }
    },
    harvestQuestions: [
      {
        id: "hypothalamus_hypophyse_h1",
        type: "mc",
        question: "Welche Aufgabe hat der Hypophysenhinterlappen (HHL / Neurohypophyse)?",
        options: [
          { text: "Er produziert TSH und ACTH für die Steuerung peripherer Drüsen", correct: false },
          { text: "Er speichert und gibt Oxytocin und ADH (Hypothalamus-Hormone) frei", correct: true },
          { text: "Er produziert Wachstumshormon und Prolaktin", correct: false },
          { text: "Er hemmt alle Releasing-Hormone des Hypothalamus", correct: false }
        ],
        explanation: "Der HHL (Neurohypophyse) produziert keine eigenen Hormone — er speichert nur die vom Hypothalamus gebildeten Hormone Oxytocin und ADH (Adiuretin/Vasopressin) und setzt sie bei Bedarf ins Blut frei."
      },
      {
        id: "hypothalamus_hypophyse_h2",
        type: "mc",
        question: "Welches Hypothalamus-Hormon hemmt die Ausschüttung des Wachstumshormons (STH)?",
        options: [
          { text: "TRH (Thyreotropin-Releasing-Hormon)", correct: false },
          { text: "GRH (Growth-Releasing-Hormon)", correct: false },
          { text: "Somatostatin (GIH = Growth-Inhibiting-Hormon)", correct: true },
          { text: "CRH (Corticotropin-Releasing-Hormon)", correct: false }
        ],
        explanation: "GIH (Growth-Inhibiting-Hormon) = Somatostatin ist das Inhibiting-Hormon (IH), das die STH-Ausschüttung hemmt. Es wirkt als Gegenspieler zu GRH. GRH stimuliert STH, Somatostatin bremst es — gemeinsam regulieren sie den Wachstumshormon-Spiegel."
      },
      {
        id: "hypothalamus_hypophyse_h3",
        type: "true_false",
        statement: "Der Hypophysenvorderlappen (HVL / Adenohypophyse) ist für Hormonbildung, Hormonspeicherung und Hormonfreisetzung zuständig.",
        answer: true,
        explanation: "Der HVL (Adenohypophyse) ist eine echte Drüse: er produziert, speichert und setzt selbst Hormone frei — sowohl glandotrope Hormone (TSH, ACTH, FSH, LH) als auch direkt wirkende (STH, MSH, Prolaktin). Der HHL speichert dagegen nur die Hypothalamus-Hormone."
      },
      {
        id: "hypothalamus_hypophyse_h4",
        type: "mc",
        question: "Welche HVL-Hormone wirken direkt auf ihr Zielorgan (nicht über eine nachgeordnete Drüse)?",
        options: [
          { text: "TSH, ACTH und FSH", correct: false },
          { text: "MSH, STH und Prolaktin (LTH)", correct: true },
          { text: "ADH, Oxytocin und CRH", correct: false },
          { text: "FSH, LH und GnRH", correct: false }
        ],
        explanation: "Direkt (effektorisch) wirkende HVL-Hormone: STH (wirkt auf Wachstum/Knochen), MSH (Hautpigmentierung) und Prolaktin/LTH (Milchproduktion). Sie brauchen keine weitere Drüse als Zwischenstation. Glandotrope HVL-Hormone (TSH, ACTH, FSH, LH) hingegen stimulieren nachgeordnete Hormondrüsen."
      },
      {
        id: "hypothalamus_hypophyse_h5",
        type: "mc",
        question: "Welches Releasing-Hormon des Hypothalamus stimuliert die Freisetzung von FSH und LH?",
        options: [
          { text: "TRH", correct: false },
          { text: "CRH", correct: false },
          { text: "GnRH (Gonadotropin-Releasing-Hormon)", correct: true },
          { text: "PRH", correct: false }
        ],
        explanation: "GnRH (Gonadotropin-Releasing-Hormon) stimuliert die Ausschüttung von FSH (Follikel-stimulierendes Hormon) und LH (Luteinisierendes Hormon) / ICSH aus dem HVL. FSH und LH steuern die Gonaden (Ovarien beim Mann/Hoden) und werden daher Gonadotropine genannt."
      }
    ],
    phase4Questions: [
      {
        id: "hypothalamus_hypophyse_mc1",
        type: "mc",
        question: "Welche Aussagen über den Hypothalamus stimmen?",
        options: [
          { text: "Er liegt unterhalb des Thalamus im Zwischenhirn", correct: true },
          { text: "Er wandelt nervöse Reize in chemische (hormonelle) Signale um", correct: true },
          { text: "Er produziert Releasing-Hormone (RH) und Inhibiting-Hormone (IH)", correct: true },
          { text: "Er speichert ADH und Oxytocin im Hypophysenvorderlappen (HVL)", correct: false }
        ]
      },
      {
        id: "hypothalamus_hypophyse_mc2",
        type: "mc",
        question: "Welche Aussagen über die Hypophyse sind korrekt?",
        options: [
          { text: "Die Hypophyse wiegt ca. 0,6 g und liegt in der Sella turcica", correct: true },
          { text: "Der HVL (Adenohypophyse) produziert, speichert und setzt eigene Hormone frei", correct: true },
          { text: "Glandotrope HVL-Hormone sind TSH, ACTH, FSH und LH", correct: true },
          { text: "Der HHL produziert ADH und Oxytocin selbst", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "schilddrüse_epiphyse",
    title: "Schilddrüse (T3/T4/Calcitonin) und Epiphyse (Melatonin)",
    contextHint: "Studienbrief 1042 Hormonsystem – Schilddrüse Follikel Jod, Zirbeldrüse Melatonin",
    phase1: {
      soil: {
        statement: "Die Schilddrüse (Glandula thyroidea) ist H-förmig (zwei Lappen + Isthmus), liegt unterhalb des Kehlkopfs und umgibt seitlich die Trachea; sie ist das am stärksten durchblutete Organ des menschlichen Körpers (ca. 5 Liter Blut pro Stunde); ihre Follikelepithelzellen (Thyreozyten) produzieren Thyreoglobulin und daraus T3 (Trijodthyronin) und T4 (Tetrajodthyronin); dafür wird Jod benötigt.",
        answer: true,
        solution: "T3 ist etwa 5-mal stärker wirksam als T4. T4 kann nach der Sezernierung in T3 umgewandelt werden (periphere Konversion). Die Zahl der Jodatome gibt der Name an: T3 hat 3, T4 hat 4. Wirkungen beider: Steigerung des Grundumsatzes, Erhöhung von Herzfrequenz und Schlagkraft, Förderung von Wachstum und Reifungsprozessen, anabole Wirkung auf die Skelettmuskulatur, Förderung der Gehirnreifung. Außerdem regeln Schilddrüsenhormone Fett- und Wassereinlagerung."
      },
      seed: {
        statement: "Die Epiphyse (Zirbeldrüse) produziert lichtunabhängig gleichmäßig Cortisol, das den circadianen Schlaf-Wach-Rhythmus steuert.",
        answer: false,
        solution: "Falsch in zwei Punkten: Erstens produziert die Epiphyse KEIN Cortisol (das ist die Nebennierenrinde) — sie produziert Melatonin. Zweitens ist Melatonin LICHTABHÄNGIG: Bei Dunkelheit steigt es an (fördert Schlaf), bei Licht sinkt es. Melatonin wird aus Tryptophan gebildet. Die Epiphyse (Zirbeldrüse) ist ca. 12 mm groß, wiegt ca. 170 mg, und liegt zapfenförmig im Gehirn. Bei Ausfall der Epiphyse kann eine Pubertas praecox (vorzeitige Pubertät) entstehen."
      },
      water: {
        statement: "Calcitonin wird von den C-Zellen der Schilddrüse produziert und ist der Gegenspieler von Parathormon (PTH): es senkt den Kalziumspiegel im Blut durch Einbau von Calcium in die Knochen und Hemmung der Ca-Freisetzung aus Knochen.",
        answer: true,
        solution: "Calcitonin (Thyreocalcitonin) senkt den Kalziumspiegel auf vier Wegen: 1. Einbau von Calcium in Knochen, 2. Hemmung der Freisetzung von Calcium aus Knochen, 3. Hemmung der Aufnahme aus der Nahrung im Darm, 4. Steigerung der Ausscheidung über die Niere. Calcitonin steht NICHT im Zusammenhang mit T3/T4, obwohl es von derselben Drüse (anderen Zellen) produziert wird."
      }
    },
    harvestQuestions: [
      {
        id: "schilddrüse_epiphyse_h1",
        type: "mc",
        question: "Welches Spurenelement benötigt die Schilddrüse für die Hormonproduktion?",
        options: [
          { text: "Eisen", correct: false },
          { text: "Jod", correct: true },
          { text: "Zink", correct: false },
          { text: "Calcium", correct: false }
        ],
        explanation: "Die Schilddrüse benötigt Jod für die Produktion von T3 und T4. Jodmangel kann zur Schilddrüsenvergrößerung (Struma/Kropf) führen, da die Drüse kompensatorisch wächst. Die Zahl der Jodatome ist namensgebend: Trijodthyronin (T3) = 3 Jodatome, Tetrajodthyronin (T4) = 4 Jodatome."
      },
      {
        id: "schilddrüse_epiphyse_h2",
        type: "mc",
        question: "Warum ist T4 zwar weniger aktiv als T3, trotzdem klinisch wichtig?",
        options: [
          { text: "T4 kann im Blut gespeichert und bei Bedarf ins Herz abgegeben werden", correct: false },
          { text: "T4 kann nach der Sezernierung peripher in das stärkere T3 umgewandelt werden", correct: true },
          { text: "T4 hemmt T3 und reguliert so den Schilddrüsenspiegel", correct: false },
          { text: "T4 wirkt ausschließlich auf die Gehirnreifung, T3 nur auf das Herz", correct: false }
        ],
        explanation: "T4 (Tetrajodthyronin) wirkt wie T3, aber weniger aktiv (T3 ist ca. 5x stärker). T4 kann jedoch in peripheren Geweben in T3 umgewandelt werden — dadurch fungiert T4 als eine Art Depot- oder Transportform. Im Blut zirkuliert hauptsächlich T4; an den Zielzellen wird es in das wirksamere T3 konvertiert."
      },
      {
        id: "schilddrüse_epiphyse_h3",
        type: "true_false",
        statement: "Bei Ausfall der Epiphyse (Zirbeldrüse) kann es zu einer Pubertas praecox (vorzeitiger Pubertät) kommen.",
        answer: true,
        explanation: "Melatonin der Epiphyse hemmt normalerweise die Gonadotropin-Produktion (GnRH-Hemmung) und verzögert so den Pubertätseintritt. Fällt die Epiphyse aus, fehlt diese Hemmung, und die Pubertät kann deutlich zu früh einsetzen (Pubertas praecox)."
      },
      {
        id: "schilddrüse_epiphyse_h4",
        type: "mc",
        question: "Calcitonin ist der Gegenspieler von...",
        options: [
          { text: "Aldosteron", correct: false },
          { text: "Cortisol", correct: false },
          { text: "Parathormon (PTH)", correct: true },
          { text: "Adrenalin", correct: false }
        ],
        explanation: "Calcitonin (Schilddrüse, C-Zellen) und Parathormon PTH (Nebenschilddrüsen) sind Gegenspieler im Kalzium-Phosphat-Haushalt: Calcitonin SENKT den Ca²⁺-Spiegel, PTH ERHÖHT ihn. Beide gemeinsam halten den Calciumspiegel im Gleichgewicht."
      },
      {
        id: "schilddrüse_epiphyse_h5",
        type: "mc",
        question: "Welches ist das am stärksten durchblutete Organ des menschlichen Körpers?",
        options: [
          { text: "Lunge", correct: false },
          { text: "Leber", correct: false },
          { text: "Gehirn", correct: false },
          { text: "Schilddrüse (ca. 5 Liter Blut/Stunde)", correct: true }
        ],
        explanation: "Die Schilddrüse (Glandula thyroidea) ist das am stärksten durchblutete Organ des menschlichen Körpers mit ca. 5 Liter Blut pro Stunde. Diese intensive Durchblutung ist notwendig, um die Jodaufnahme aus dem Blut und die Hormonabgabe ins Blut zu gewährleisten."
      }
    ],
    phase4Questions: [
      {
        id: "schilddrüse_epiphyse_mc1",
        type: "mc",
        question: "Welche Wirkungen haben T3 und T4?",
        options: [
          { text: "Steigerung des Grundumsatzes", correct: true },
          { text: "Erhöhung von Herzfrequenz und Schlagkraft", correct: true },
          { text: "Anabole Wirkung auf die Skelettmuskulatur", correct: true },
          { text: "Senkung der Körpertemperatur", correct: false }
        ]
      },
      {
        id: "schilddrüse_epiphyse_mc2",
        type: "mc",
        question: "Welche Aussagen zu Schilddrüse und Epiphyse stimmen?",
        options: [
          { text: "Die Schilddrüse benötigt Jod für T3 und T4", correct: true },
          { text: "Calcitonin (C-Zellen) senkt den Kalziumspiegel im Blut", correct: true },
          { text: "Die Epiphyse produziert lichtabhängig Melatonin aus Tryptophan", correct: true },
          { text: "T4 ist 5-mal stärker als T3", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "nebenschilddrüsen_thymus",
    title: "Nebenschilddrüsen (PTH) und Thymus (Thymopoetin/Thymosin)",
    contextHint: "Studienbrief 1042 Hormonsystem – Parathormon Kalzium-Haushalt, T-Lymphozyten",
    phase1: {
      soil: {
        statement: "Die Nebenschilddrüsen (Glandulae parathyreoideae) liegen an der Rückseite der Schilddrüse innerhalb der Organkapsel; durchschnittlich besitzt jeder Mensch vier (Bandbreite 2–12); sie sind ca. 8 mm groß, 30–50 mg schwer und produzieren Parathormon (PTH), das den Kalziumspiegel im Blut erhöht — es ist der Gegenspieler von Calcitonin.",
        answer: true,
        solution: "Eselsbrücke: 'Parathormon stellt Kalzium parat.' PTH erhöht den Ca²⁺-Spiegel durch: 1. Steigerung der Ca-Aufnahme aus dem Darm, 2. Verminderung der Ausscheidung durch die Niere (gesteigerte Rückresorption), 3. Freisetzung von Calcium aus den Knochen. Gleichzeitig steigert PTH die Phosphatausscheidung durch die Niere. PTH begünstigt zudem die Aktivierung von Vitamin D3: 25-Hydroxycalciferol (Calcidiol = Speicherform) → 1,25-Dihydroxycalciferol (Calcitriol = aktives Vitamin D3). Bei PTH-Ausfall kommt es zur Muskelverkrampfung (Tetanie)."
      },
      seed: {
        statement: "Der Thymus ist nach der Pubertät das größte lymphatische Organ des Körpers und produziert dann am meisten Thymusfaktoren.",
        answer: false,
        solution: "Genau umgekehrt: Bis zur Pubertät ist der Thymus das größte lymphatische Organ — danach bildet er sich zu 90% in braunes Fettgewebe um (Involution). Die Thymusfaktoren Thymopoetin und Thymosin, die für die Reifung und Aktivierung von T-Lymphozyten zuständig sind, werden im Kindes- und Jugendalter am meisten produziert. Der Thymus liegt im Mediastinum (Mittelfellraum) hinter dem Sternum, vor dem Herzbeutel, zwischen den beiden Blättern der Pleura."
      },
      water: {
        statement: "Thymopoetin und Thymosin sind Thymusfaktoren (Polypeptide), die die Reifung und Differenzierung von T-Lymphozyten (Immunzellen) fördern und außerdem hemmend auf Immunreaktionen im Extrazellulärraum wirken.",
        answer: true,
        solution: "Der Thymus hat zwei Funktionen: Als primär lymphatisches Organ prägt er unreife Lymphozyten zu immunkompetenten T-Lymphozyten. Als endokrines Organ sezerniert er Thymusfaktoren (Thymopoetin und Thymosin), die T-Lymphozyten-Reifung fördern und suppressiv auf Autoimmunreaktionen und Transplantationsabstoßungsreaktionen wirken. Der Thymus besteht aus Rindenschicht (Thymozyten = Lymphozyten in lymphoidem Gewebe) und Mark (Hassall-Körperchen, deren Funktion noch nicht vollständig bekannt ist)."
      }
    },
    harvestQuestions: [
      {
        id: "nebenschilddrüsen_thymus_h1",
        type: "mc",
        question: "Wie lautet die Eselsbrücke für die Wirkung des Parathormons (PTH)?",
        options: [
          { text: "'Parathormon pumpt Phosphat raus'", correct: false },
          { text: "'Parathormon stellt Kalzium parat'", correct: true },
          { text: "'Parathormon senkt Kalzium sofort'", correct: false },
          { text: "'Parathormon schützt Proteinsynthese'", correct: false }
        ],
        explanation: "Die offizielle Eselsbrücke lautet: 'Parathormon stellt Kalzium parat.' PTH erhöht den Kalziumspiegel — durch Förderung der Darmaufnahme, Hemmung der Nierenausscheidung und Mobilisierung aus Knochen. Es ist der direkte Gegenspieler von Calcitonin."
      },
      {
        id: "nebenschilddrüsen_thymus_h2",
        type: "mc",
        question: "Was passiert nach der Pubertät mit dem Thymus?",
        options: [
          { text: "Er wächst weiter und verdoppelt sein Gewicht", correct: false },
          { text: "Er wird zu ca. 90% in braunes Fettgewebe umgewandelt", correct: true },
          { text: "Er wird vollständig durch Lymphknoten ersetzt", correct: false },
          { text: "Er beginnt Cortisol zu produzieren", correct: false }
        ],
        explanation: "Der Thymus erfährt nach der Pubertät eine Involution (Rückbildung): er wird zu ca. 90% in funktionsloses braunes Fettgewebe umgewandelt. Deshalb ist die Thymusfunktion (T-Lymphozyten-Reifung) im Kindes- und Jugendalter besonders wichtig — zu dieser Zeit wird das Immungedächtnis aufgebaut."
      },
      {
        id: "nebenschilddrüsen_thymus_h3",
        type: "true_false",
        statement: "Bei einem Ausfall des Parathormons (PTH) kommt es zur Muskelverkrampfung (Tetanie), da der Kalziumspiegel zu stark absinkt.",
        answer: true,
        explanation: "Kalzium ist entscheidend für die Muskel- und Nervensteuerung. Fällt PTH aus, sinkt der Ca²⁺-Spiegel unkontrolliert (Hypokalzämie). Die neuromuskuläre Erregbarkeit steigt stark an, was zu Muskelkrämpfen und Tetanie führt. Im Extremfall sind Herz- und Atemmuskulatur betroffen."
      },
      {
        id: "nebenschilddrüsen_thymus_h4",
        type: "mc",
        question: "Wo liegen die Nebenschilddrüsen?",
        options: [
          { text: "In der Leiste, neben den Ovarien", correct: false },
          { text: "Auf den oberen Nierenpolen (wie die Nebennieren)", correct: false },
          { text: "An der Rückseite der Schilddrüse, innerhalb der Organkapsel", correct: true },
          { text: "Hinter dem Sternum im Mediastinum (wie der Thymus)", correct: false }
        ],
        explanation: "Die Nebenschilddrüsen (Glandulae parathyreoideae) liegen an der RÜCKSEITE der Schilddrüse innerhalb der Organkapsel — sie sind also anatomisch mit der Schilddrüse assoziiert, aber funktionell völlig unabhängig. Jeder Mensch hat durchschnittlich 4 Stück (Bandbreite 2–12)."
      },
      {
        id: "nebenschilddrüsen_thymus_h5",
        type: "mc",
        question: "Welche Aufgabe haben die Thymusfaktoren Thymopoetin und Thymosin?",
        options: [
          { text: "Produktion von Erythrozyten im Knochenmark", correct: false },
          { text: "Reifung und Aktivierung von T-Lymphozyten (Immunzellen)", correct: true },
          { text: "Regulation des Blutzuckers wie Insulin", correct: false },
          { text: "Steuerung der Kalziumausscheidung über die Niere", correct: false }
        ],
        explanation: "Thymopoetin und Thymosin sind die endokrinen Produkte des Thymus (Thymusfaktoren). Sie fördern die Reifung und Differenzierung von T-Lymphozyten zu immunkompetenten Immunzellen und wirken hemmend auf Immunreaktionen im Extrazellulärraum (suppressiv bei Autoimmunreaktionen und Transplantationsabstoßung)."
      }
    ],
    phase4Questions: [
      {
        id: "nebenschilddrüsen_thymus_mc1",
        type: "mc",
        question: "Welche Wirkungen hat Parathormon (PTH)?",
        options: [
          { text: "Erhöhung des Kalziumspiegels im Blut", correct: true },
          { text: "Steigerung der Ca-Aufnahme aus dem Darm", correct: true },
          { text: "Hemmung der renalen Ca-Ausscheidung (gesteigerte Rückresorption)", correct: true },
          { text: "Senkung des Kalziumspiegels (wie Calcitonin)", correct: false }
        ]
      },
      {
        id: "nebenschilddrüsen_thymus_mc2",
        type: "mc",
        question: "Welche Aussagen zum Thymus stimmen?",
        options: [
          { text: "Er liegt im Mediastinum hinter dem Sternum", correct: true },
          { text: "Er produziert Thymopoetin und Thymosin", correct: true },
          { text: "Er ist beim Neugeborenen noch voll entfaltet", correct: true },
          { text: "Nach der Pubertät wächst er weiter an", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "nebenniere_nnr",
    title: "Nebennierenrinde (NNR): Kortikosteroide, Aldosteron und Cortisol",
    contextHint: "Studienbrief 1042 Hormonsystem – NNR 3 Zonen, Mineralkortikoide, Glukokortikoide, Androgene",
    phase1: {
      soil: {
        statement: "Die Nebennierenrinde (NNR / Cortex suprarenalis) besteht aus drei Zonen: Zona glomerulosa (außen → Mineralkortikoide: Aldosteron), Zona fasciculata (Mitte → Glukokortikoide: Cortisol, Cortison, Corticosteron), Zona reticularis (innen → Androgene: Testosteron); alle drei Hormongruppen sind Steroidhormone mit Cholesterin als Muttersubstanz.",
        answer: true,
        solution: "Merkhilfe für die Zonen: GFR — Zona Glomerulosa (außen), Zona Fasciculata (Mitte), Zona Reticularis (innen). Aldosteron (Mineralokortikoid): regelt Na⁺/K⁺-Haushalt; Na⁺-Retention → Wasserretention → Blutdruckregulation; K⁺-Ausscheidung; wichtigster Regelkreis: RAAS (Renin-Angiotensin-Aldosteron-System). Cortisol (Glukokortikoid): entzündungshemmend (Membranstabilisierung), immunsuppressiv (Lymphozyten↓), steigert Gluconeogenese (Blutzucker↑), hemmt Glykolyse, steigert Lipolyse (Fettsäuren↑), Muskelabbau möglich; Überschuss → Ulcus (Magensäure↑, Pepsin↑)."
      },
      seed: {
        statement: "Aldosteron wird in der Zona fasciculata der Nebennierenrinde gebildet und wirkt hemmend auf den Natriumhaushalt, indem es Na⁺ vermehrt ausscheidet.",
        answer: false,
        solution: "Doppelt falsch: Aldosteron wird in der ZONA GLOMERULOSA (äußerste Schicht) gebildet, nicht in der Zona fasciculata. Und es wirkt genau UMGEKEHRT: Aldosteron fördert die Na⁺-RETENTION (Zurückhaltung) und K⁺-Ausscheidung. Na⁺ zieht Wasser nach sich, was den Blutdruck erhöht. Aldosteron ist das wichtigste Mineralokortikoid; sein Gegenspieler für den Wasserhaushalt ist ANF (Atrialer Natriuretischer Faktor des Herzens)."
      },
      water: {
        statement: "Cortisol wirkt entzündungshemmend und immunsuppressiv; im Zuckerstoffwechsel steigert es die Gluconeogenese und erhöht damit den Blutzucker, weshalb es als Gegenspieler des Insulins gilt.",
        answer: true,
        solution: "Cortisol ist das wichtigste Glukokortikoid; es wird in der Zona fasciculata gebildet. Wirkungen: 1. Entzündungshemmend (durch Membranstabilisierung), 2. Immunsuppressiv (Lymphozytenabnahme), 3. Gluconeogenese↑ (Zuckeraufbau), hemmt Glykolyse (Zuckerabbau) → Blutzucker↑, 4. Lipolyse↑ und Triglyceridabbau → Fettsäuren↑, 5. Proteinabbau (Muskelgewebe → Muskelschwäche möglich), 6. Im Magen: Magensäure- und Pepsinsekretion↑ → Ulcusrisiko. ACTH des HVL stimuliert die Cortisolproduktion."
      }
    },
    harvestQuestions: [
      {
        id: "nebenniere_nnr_h1",
        type: "mc",
        question: "Welche Zone der Nebennierenrinde produziert Aldosteron?",
        options: [
          { text: "Zona fasciculata (mittlere Schicht)", correct: false },
          { text: "Zona reticularis (innere Schicht)", correct: false },
          { text: "Zona glomerulosa (äußerste Schicht)", correct: true },
          { text: "Zona medullaris (Nebennierenmark)", correct: false }
        ],
        explanation: "Merkhilfe Zonen (von außen nach innen): Glomerulosa (Mineralkortikoide/Aldosteron) → Fasciculata (Glukokortikoide/Cortisol) → Reticularis (Androgene/Testosteron). Die Zona glomerulosa liegt außen und produziert Aldosteron, das den Elektrolyt- und Wasserhaushalt reguliert."
      },
      {
        id: "nebenniere_nnr_h2",
        type: "mc",
        question: "Wie wirkt Cortisol auf den Blutzucker?",
        options: [
          { text: "Es senkt den Blutzucker durch Förderung der Insulinausschüttung", correct: false },
          { text: "Es erhöht den Blutzucker durch Steigerung der Gluconeogenese", correct: true },
          { text: "Es hat keinen Einfluss auf den Blutzuckerspiegel", correct: false },
          { text: "Es fördert die Glucoseaufnahme in die Zellen wie Insulin", correct: false }
        ],
        explanation: "Cortisol ist der klassische Gegenspieler von Insulin im Blutzuckerstoffwechsel: Es steigert die Gluconeogenese (Zuckeraufbau aus Nicht-Zuckerstoffen), hemmt die Glykolyse (Zuckerabbau) und lässt so den Blutzuckerspiegel steigen. Gleichzeitig senkt es den Zuckerverbrauch der Zellen."
      },
      {
        id: "nebenniere_nnr_h3",
        type: "true_false",
        statement: "Aldosteron fördert die Natriumretention und Kaliumausscheidung, was durch das RAAS-System reguliert wird.",
        answer: true,
        explanation: "Aldosteron wirkt im distalen Tubulus und Sammelrohr der Niere: Na⁺ wird zurückgehalten (Retention), K⁺ ausgeschieden. Da Na⁺ Wasser nachzieht, steigt das Blutvolumen und damit der Blutdruck. Das RAAS (Renin-Angiotensin-Aldosteron-System) ist der wichtigste Regelkreis für Aldosteron."
      },
      {
        id: "nebenniere_nnr_h4",
        type: "mc",
        question: "Welche drei Hormongruppen produziert die Nebennierenrinde?",
        options: [
          { text: "Katecholamine, Glukokortikoide und Androgene", correct: false },
          { text: "Mineralkortikoide, Glukokortikoide und Androgene", correct: true },
          { text: "Proteohormone, Steroidhormone und Neurohormone", correct: false },
          { text: "Insulin, Glukagon und Cortisol", correct: false }
        ],
        explanation: "Die NNR produziert ausschließlich Steroidhormone (Cholesterin als Muttersubstanz): Mineralkortikoide (v.a. Aldosteron, Zona glomerulosa), Glukokortikoide (v.a. Cortisol, Zona fasciculata) und Androgene (v.a. Testosteron, Zona reticularis). Katecholamine werden im Nebennierenmark (NNM) gebildet."
      },
      {
        id: "nebenniere_nnr_h5",
        type: "mc",
        question: "Was kann ein längerer Cortisol-Überschuss im Magen-Darm-Trakt verursachen?",
        options: [
          { text: "Gastroparese durch Hemmung der Magenperistaltik", correct: false },
          { text: "Ulcus durch vermehrte Magensäure- und Pepsinsekretion", correct: true },
          { text: "Reflux durch Erschlaffung des unteren Ösophagussphinkters", correct: false },
          { text: "Pankreatitis durch Stimulation der Lipaseausschüttung", correct: false }
        ],
        explanation: "Cortisol führt zu vermehrter Säureproduktion und Pepsinsekretion im Magen. Ein Überschuss (z.B. bei Langzeit-Kortisontherapie oder chronischem Stress) kann daher ein Magenulcus (Magengeschwür) verursachen. Deshalb werden bei Kortisongabe oft Magenschutz-Medikamente (Protonenpumpenhemmer) mitgegeben."
      }
    ],
    phase4Questions: [
      {
        id: "nebenniere_nnr_mc1",
        type: "mc",
        question: "Welche Wirkungen hat Cortisol?",
        options: [
          { text: "Entzündungshemmend und immunsuppressiv", correct: true },
          { text: "Steigert Gluconeogenese → Blutzucker↑", correct: true },
          { text: "Fördert Lipolyse (Fettsäurenfreisetzung)", correct: true },
          { text: "Senkt den Blutzucker wie Insulin", correct: false }
        ]
      },
      {
        id: "nebenniere_nnr_mc2",
        type: "mc",
        question: "Welche Aussagen über die Nebennierenrinde (NNR) stimmen?",
        options: [
          { text: "Die NNR-Hormone sind Steroidhormone mit Cholesterin als Muttersubstanz", correct: true },
          { text: "Aldosteron reguliert den Elektrolyt- und Wasserhaushalt (RAAS)", correct: true },
          { text: "Testosteron ist das wichtigste Androgen der NNR", correct: true },
          { text: "Cortisol wird in der Zona glomerulosa gebildet", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "nebenniere_nnm_katecholamine",
    title: "Nebennierenmark (NNM): Adrenalin, Noradrenalin und Fight-or-Flight",
    contextHint: "Studienbrief 1042 Hormonsystem – NNM Katecholamine, Stresshormone, Adrenalin vs Noradrenalin",
    phase1: {
      soil: {
        statement: "Das Nebennierenmark (NNM) ist kein klassisches Hormonorgan, sondern ein Ausläufer des vegetativen Nervensystems (Sympathikus); entwicklungsgeschichtlich stammt es vom Ektoderm, während die Nebennierenrinde vom Peritoneum (Bauchfell) abstammt; bei sympathischer Stimulation setzt das NNM die Katecholamine Adrenalin und Noradrenalin ins Blut frei.",
        answer: true,
        solution: "Die Zellen des NNM entsprechen entwicklungsgeschichtlich einem Ganglion des Sympathikus. Statt elektrischer Weiterleitung schüttet das NNM bei sympathischer Stimulation Katecholamine direkt ins Blut aus. Zu den Katecholaminen gehören: Dopamin, Serotonin, Adrenalin und Noradrenalin. Im NNM werden vor allem Adrenalin und Noradrenalin gebildet. Beide gehören zu den Stresshormonen, die in akuten Situationen mobilisieren ('Fight-or-Flight'). Adrenalin und Noradrenalin sind Teilweise Gegenspieler, können sich aber auch ergänzen."
      },
      seed: {
        statement: "Noradrenalin weitet die Bronchien und wirkt anregend auf das zentrale Nervensystem (ZNS), während Adrenalin die Herzfrequenz verringert.",
        answer: false,
        solution: "Genau umgekehrt: ADRENALIN weitet die Bronchien (Bronchodilatation) und regt das ZNS an; NORADRENALIN verengt die Bronchien und hat kaum ZNS-Wirkung. Herzfrequenz: Adrenalin STEIGERT sie (Zeitvolumen und Frequenz↑), Noradrenalin VERRINGERT sie. Beide erhöhen jedoch den Blutdruck (systolisch). Adrenalin senkt dabei den diastolischen Druck (durch periphere Vasodilatation), Noradrenalin erhöht auch den diastolischen Druck."
      },
      water: {
        statement: "Adrenalin und Noradrenalin sind Stresshormone (Katecholamine); sie mobilisieren in akuten Stresssituationen die Energiereserven des Körpers, um angemessen zu reagieren ('Fight-or-Flight'); beide erhöhen den Blutdruck.",
        answer: true,
        solution: "Adrenalin-Wirkungen: Herzzeitvolumen↑, Herzfrequenz↑, systolischer BP↑ / diastolischer BP↓, Bronchien weiten sich, ZNS-Stimulation, Glykogenolyse (Blutzucker↑). Noradrenalin-Wirkungen: Herzfrequenz↓ (vagal kompensatorisch), systolischer und diastolischer BP↑, Bronchien verengen sich, geringere ZNS-Wirkung. Beide wirken also blutdrucksteigernd — Noradrenalin ist dabei der stärkere Vasokonstriktor."
      }
    },
    harvestQuestions: [
      {
        id: "nebenniere_nnm_h1",
        type: "mc",
        question: "Zu welcher Hormongruppe gehören Adrenalin, Noradrenalin und Dopamin?",
        options: [
          { text: "Kortikosteroide", correct: false },
          { text: "Katecholamine", correct: true },
          { text: "Proteohormone", correct: false },
          { text: "Gewebshormone", correct: false }
        ],
        explanation: "Adrenalin, Noradrenalin, Dopamin und Serotonin gehören zur Gruppe der Katecholamine — sie leiten sich von der Aminosäure Tyrosin ab. Im Nebennierenmark werden hauptsächlich Adrenalin und Noradrenalin gebildet und als Stresshormone ins Blut abgegeben."
      },
      {
        id: "nebenniere_nnm_h2",
        type: "true_false",
        statement: "Noradrenalin wirkt hemmend auf die Herzfrequenz, während Adrenalin sie steigert.",
        answer: true,
        explanation: "Adrenalin steigert Herzfrequenz und Herzzeit-Volumen (positiv chronotrop und inotrop). Noradrenalin hat den gegenteiligen Effekt auf die Herzfrequenz (negativ chronotrop) — dies ist eine kompensatorische Reaktion auf den stark erhöhten Blutdruck durch starke Vasokonstriktion. Beide erhöhen jedoch den systolischen Blutdruck."
      },
      {
        id: "nebenniere_nnm_h3",
        type: "mc",
        question: "Woher stammt das Nebennierenmark (NNM) entwicklungsgeschichtlich?",
        options: [
          { text: "Vom Peritoneum (Bauchfell), wie auch die NNR", correct: false },
          { text: "Vom Ektoderm (Sympathikus) — im Gegensatz zur NNR (Peritoneum)", correct: true },
          { text: "Beide, NNR und NNM, stammen vom Ektoderm des Sympathikus", correct: false },
          { text: "Vom Mesoderm, wie die Niere selbst", correct: false }
        ],
        explanation: "NNR und NNM sind entwicklungsgeschichtlich völlig verschieden: NNR stammt vom Peritoneum (Bauchfell, Mesoderm) und ist eine echte endokrine Drüse. NNM stammt vom Ektoderm (Sympathikus) und ist ein neurales Organ — vergleichbar mit einem sympathischen Ganglion, das Katecholamine ins Blut abgibt statt elektrisch weiterzuleiten."
      },
      {
        id: "nebenniere_nnm_h4",
        type: "mc",
        question: "Welches Katecholamin wirkt anregend auf das zentrale Nervensystem (ZNS)?",
        options: [
          { text: "Noradrenalin", correct: false },
          { text: "Cortisol", correct: false },
          { text: "Adrenalin", correct: true },
          { text: "Aldosteron", correct: false }
        ],
        explanation: "Adrenalin wirkt anregend auf das ZNS (ZNS-stimulierend) — typische Stressreaktion: Aufmerksamkeit steigt, Reaktionsfähigkeit erhöht sich. Noradrenalin hat keine oder kaum eine ZNS-stimulierende Wirkung laut Tabelle. Cortisol und Aldosteron sind keine Katecholamine und wirken nicht direkt als ZNS-Stimulans."
      },
      {
        id: "nebenniere_nnm_h5",
        type: "mc",
        question: "Was unterscheidet Adrenalin und Noradrenalin bei der Wirkung auf die Bronchien?",
        options: [
          { text: "Adrenalin verengt die Bronchien, Noradrenalin weitet sie", correct: false },
          { text: "Beide verengen die Bronchien gleichartig", correct: false },
          { text: "Adrenalin weitet die Bronchien (weit), Noradrenalin verengt sie (eng)", correct: true },
          { text: "Weder Adrenalin noch Noradrenalin wirken auf die Bronchien", correct: false }
        ],
        explanation: "Adrenalin → Bronchien WEIT (Bronchodilatation) — wichtig für schnellere Sauerstoffaufnahme in der Stresssituation. Noradrenalin → Bronchien ENG (Bronchokonstriktion). Dies ist ein wichtiger klinischer Unterschied: Adrenalin wird z.B. beim anaphylaktischen Schock eingesetzt, um die Bronchien zu weiten."
      }
    ],
    phase4Questions: [
      {
        id: "nebenniere_nnm_mc1",
        type: "mc",
        question: "Welche Aussagen über Adrenalin stimmen?",
        options: [
          { text: "Steigert Herzzeit-Volumen und Herzfrequenz", correct: true },
          { text: "Weitet die Bronchien (Bronchodilatation)", correct: true },
          { text: "Regt das ZNS an", correct: true },
          { text: "Erhöht den diastolischen Blutdruck wie Noradrenalin", correct: false }
        ]
      },
      {
        id: "nebenniere_nnm_mc2",
        type: "mc",
        question: "Welche Aussagen über das Nebennierenmark (NNM) treffen zu?",
        options: [
          { text: "Das NNM ist entwicklungsgeschichtlich dem Sympathikus (Ektoderm) zuzuordnen", correct: true },
          { text: "Es bildet Adrenalin und Noradrenalin als Katecholamine", correct: true },
          { text: "Adrenalin und Noradrenalin sind Stresshormone (Fight-or-Flight)", correct: true },
          { text: "Das NNM ist eine klassische Hormondrüse ohne Nervenverbindung", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "hormon_regelkreis_reflexbogen",
    title: "Hormoneller Regelkreis und neuroendokriner Reflexbogen",
    contextHint: "Studienbrief 1042 Hormonsystem – Rückkopplung, Hypothalamus-Hypophyse-Achse, Stillbeispiel",
    phase1: {
      soil: {
        statement: "Im hormonellen Regelkreis stimuliert der Hypothalamus über Releasing-Hormone die Hypophyse, die glandotrope Hormone an periphere Hormondrüsen (Effektorgane) abgibt; sobald die Hormonkonzentration im Blut hoch genug ist, wirkt eine Rückkopplung hemmend auf Hypothalamus und Hypophyse — sie stoppen die Produktion.",
        answer: true,
        solution: "Regelkreis-Kaskade: ZNS → Hypothalamus (RH/IH) → HVL → glandotrope Hormone → periphere Drüsen → Hormone → Effektorgane; Rückkopplung: periphere Hormone gelangen über Blut zurück zu Hypothalamus und Hypophyse. Bei ausreichender Konzentration: negative Rückkopplung → Produktionsstopp. Bei sinkender Konzentration: Produktion wird wieder aufgenommen. Hypothalamus und HVL sind direkt durch ein Blutgefäßsystem miteinander verbunden."
      },
      seed: {
        statement: "Gewebshormone wie Gastrin, Histamin und Serotonin werden durch den Hypothalamus zentral gesteuert und sind Teil des übergeordneten Regelkreises.",
        answer: false,
        solution: "Gewebshormone (Gastrin, Histamin, Serotonin, Sekretin, Cholezystokinin, Prostaglandine) kommen OHNE zentrale Steuerung zum Einsatz. Sie werden von einzelnen Zellen in Gewebekomplexen gebildet und reagieren direkt auf lokale Reize. Auch Niere (EPO bei O₂-Mangel), Pankreas (Insulin/Glukagon bei Blutzuckeränderung) und Nebennierenmark (Katecholamine bei Nervenreizen) können ohne Hypothalamus-Steuerung reagieren."
      },
      water: {
        statement: "Beim neuroendokrinen Reflexbogen (Beispiel Stillen) lösen Druckrezeptoren der Brustdrüse über afferente Nervenbahnen die Prolaktinausschüttung (→ Milchproduktion) und Oxytocinausschüttung (→ Milchauspressung) aus; Rückkopplung erfolgt durch Prolaktin selbst, das über Dopamin die eigene Sekretion hemmt.",
        answer: true,
        solution: "Ablauf des neuroendokrinen Reflexbogens (Stillen): 1. Saugen des Neugeborenen → Druckrezeptoren aktiviert → afferente Nervenbahn → Hypothalamus. 2. Hypothalamus setzt PRH frei → HVL setzt Prolaktin frei → Milchproduktion. 3. Oxytocin wird freigesetzt → Myoepithel der Brustdrüse kontrahiert → Milchauspressung. 4. Erhöhter Prolaktinspiegel → vermehrt Dopamin (= PIH = Prolaktin-Inhibiting-Hormon) → hemmt weitere Prolaktinsekretion (negative Rückkopplung). Dopamin und PIH sind identisch."
      }
    },
    harvestQuestions: [
      {
        id: "hormon_regelkreis_h1",
        type: "mc",
        question: "Was bewirkt die Rückkopplung im hormonellen Regelkreis?",
        options: [
          { text: "Die Hormonproduktion wird durch Rückkopplung weiter gesteigert", correct: false },
          { text: "Bei ausreichender Konzentration stoppt Hypothalamus/Hypophyse die Stimulation", correct: true },
          { text: "Die Hypophyse produziert mehr glandotrope Hormone als Reaktion", correct: false },
          { text: "Das Zielorgan wird dauerhaft und ohne Unterbrechung aktiviert", correct: false }
        ],
        explanation: "Negative Rückkopplung: Wenn die Konzentration peripherer Hormone im Blut hoch genug ist, hemmt dies Hypothalamus und Hypophyse — sie reduzieren oder stoppen die Produktion stimulierender Hormone. Sinkt die Konzentration wieder, nehmen sie ihre Tätigkeit auf. So wird ein stabiler Hormonspiegel aufrechterhalten."
      },
      {
        id: "hormon_regelkreis_h2",
        type: "mc",
        question: "Beim neuroendokrinen Reflexbogen: Welcher Reiz löst die Prolaktinausschüttung beim Stillen aus?",
        options: [
          { text: "Licht auf der Haut der Mutter", correct: false },
          { text: "Hoher Blutzucker nach dem Essen", correct: false },
          { text: "Der Druck-/Saugreiz des Neugeborenen an der Brustdrüse", correct: true },
          { text: "Temperaturabfall des Körpers nach der Geburt", correct: false }
        ],
        explanation: "Druckrezeptoren in der Brustdrüse reagieren auf den Saugvorgang des Neugeborenen → afferente Nervenbahn → Hypothalamus → PRH → HVL → Prolaktin (Milchproduktion) und Oxytocin (Milchauspressung). Dies ist ein klassisches Beispiel für einen neuroendokrinen Reflexbogen: nervöser Reiz → hormonelle Antwort."
      },
      {
        id: "hormon_regelkreis_h3",
        type: "true_false",
        statement: "Niere, Pankreas und Nebennierenmark können Hormone ohne zentrale Steuerung durch den Hypothalamus ausschütten.",
        answer: true,
        explanation: "Diese Organe reagieren direkt auf periphere Reize: Niere → EPO bei O₂-Mangel; Pankreas → Insulin bei Blutzucker↑ / Glukagon bei Blutzucker↓; NNM → Katecholamine bei Nervenreizen (Stress). Auch Schilddrüse und Nebenschilddrüsen reagieren direkt auf den Calciumspiegel. Gewebshormone (Gastrin, Histamin, Sekretin usw.) wirken ebenfalls ohne zentrale Steuerung."
      },
      {
        id: "hormon_regelkreis_h4",
        type: "mc",
        question: "Welche Funktion hat Oxytocin beim neuroendokrinen Reflexbogen des Stillens?",
        options: [
          { text: "Es hemmt die Milchproduktion durch negative Rückkopplung", correct: false },
          { text: "Es bewirkt die Kontraktion des Myoepithels → Milchauspressung", correct: true },
          { text: "Es stimuliert direkt die Prolaktinproduktion im HVL", correct: false },
          { text: "Es erhöht den Blutzucker der Mutter während des Stillens", correct: false }
        ],
        explanation: "Beim Stillen werden gleichzeitig zwei Hormone freigesetzt: 1. Prolaktin (durch PRH) → stimuliert die Milchproduktion in den Drüsenzellen. 2. Oxytocin (aus dem HHL) → bewirkt Kontraktion des Myoepithels der Brustdrüse → Milch wird ausgepresst (Milchejektionsreflex). Oxytocin ist auch für die Uteruskontraktionen nach der Geburt zuständig."
      },
      {
        id: "hormon_regelkreis_h5",
        type: "mc",
        question: "Welches Hormon hemmt die Prolaktinsekretion im Rahmen der Rückkopplung beim Stillen — und mit welchem Hypothalamus-Hormon ist es identisch?",
        options: [
          { text: "Oxytocin = identisch mit TRH", correct: false },
          { text: "Dopamin = identisch mit PIH (Prolaktin-Inhibiting-Hormon)", correct: true },
          { text: "Cortisol = identisch mit CRH", correct: false },
          { text: "Adrenalin = identisch mit GIH (Somatostatin)", correct: false }
        ],
        explanation: "Bei erhöhtem Prolaktinspiegel wird vermehrt Dopamin ausgeschüttet, welches die Prolaktinsekretion hemmt. Dopamin ist identisch mit dem Prolaktin-Inhibiting-Hormon (PIH) des Hypothalamus. Dies ist die negative Rückkopplung des neuroendokrinen Reflexbogens beim Stillen."
      }
    ],
    phase4Questions: [
      {
        id: "hormon_regelkreis_mc1",
        type: "mc",
        question: "Welche Aussagen zum hormonellen Regelkreis stimmen?",
        options: [
          { text: "Der Hypothalamus steht an oberster Stelle der hormonellen Steuerung", correct: true },
          { text: "Rückkopplung hemmt bei ausreichender Hormonkonzentration die Produktion", correct: true },
          { text: "Hypothalamus und HVL sind direkt durch ein Blutgefäßsystem verbunden", correct: true },
          { text: "Gewebshormone (Gastrin, Histamin) unterliegen der zentralen Hypothalamus-Steuerung", correct: false }
        ]
      },
      {
        id: "hormon_regelkreis_mc2",
        type: "mc",
        question: "Welche Aussagen zum neuroendokrinen Reflexbogen beim Stillen stimmen?",
        options: [
          { text: "Druckrezeptoren leiten den Saugreiz afferent zum Hypothalamus weiter", correct: true },
          { text: "PRH bewirkt Prolaktinausschüttung aus dem HVL → Milchproduktion", correct: true },
          { text: "Oxytocin bewirkt Milchauspressung durch Myoepithel-Kontraktion", correct: true },
          { text: "Dopamin (= PIH) fördert die Prolaktinsekretion (positive Rückkopplung)", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "diagnostik_endokrinium",
    title: "Diagnostik des Endokrinums: Schilddrüse und Diabetes mellitus",
    contextHint: "Studienbrief 1042 Hormonsystem – Schilddrüsenpalpation Szintigramm HbA1c Nüchtern-BZ",
    phase1: {
      soil: {
        statement: "Zur Diagnostik der Schilddrüse gehören: Palpation (von hinten, schluckverschieblich, glatt, nicht höckrig; schlechte Verschieblichkeit → CA-Verdacht), Grundumsatzbestimmung (Spirometrie/Gasanalyse), Hormonmessung im Blut (T3, T4 und TSH), Ultraschall/Röntgen sowie Szintigramm (radioaktives Jod zur Unterscheidung kalter/warmer/heißer Knoten).",
        answer: true,
        solution: "Schilddrüsenpalpation immer von HINTEN: Patient sitzt, Untersucher tastet von hinten. Befunde: Schlechte Verschieblichkeit = Karzinom-Verdacht (CA!); Knoten = abklären; Schwirren (Vibrationsgefühl) = Überfunktion (Hyperthyreose). Szintigramm: radioaktives Jod wird aufgenommen; heiße Knoten (hohe Aktivität) = meist gutartig; kalte Knoten (keine Aktivität) = Karzinom-Verdacht höher. Blutwerte: T3, T4 (direkte Hormonmessung), TSH (Regelkreis-Aktivität). Grundumsatz: 1 Liter O₂-Verbrauch entspricht ca. 4,8 kcal."
      },
      seed: {
        statement: "Glucosurie (Glucose im Urin) tritt auf, wenn die Nierenschwelle für Glucose von 200 mg/dl überschritten wird; bei Nüchternblutzucker über 100 mg/dl spricht man bereits von einem manifesten Diabetes mellitus.",
        answer: false,
        solution: "Doppelt falsch: Die Nierenschwelle für Glucose liegt bei NORMAL 160–180 mg/dl (nicht 200 mg/dl). Ein manifester Diabetes mellitus wird diagnostiziert, wenn ZWEIMAL NÜCHTERN ein Wert über 120 mg/dl gemessen wird (nicht 100 mg/dl). Normwert Nüchtern-BZ: 60–100 mg/dl; pathologische Glukosetoleranz: 100–120 mg/dl; manifester Diabetes: >120 mg/dl. Postprandialer BZ (1–2h nach Essen): normal <140 mg/dl, manifester Diabetes: >200 mg/dl."
      },
      water: {
        statement: "Der HbA1c-Wert ist das 'Blutzuckergedächtnis': er gibt den durchschnittlichen Blutzuckerspiegel der letzten 8–10 Wochen wieder; ein guter HbA1c liegt unter 6,5%; dieser Wert ist wichtig zur Langzeitkontrolle des Diabetes mellitus.",
        answer: true,
        solution: "HbA1c entsteht durch irreversible Glykierung des Hämoglobins (nicht enzymatisch, dauernd bei erhöhtem BZ). Da Erythrozyten ca. 8–12 Wochen leben, spiegelt HbA1c den Durchschnitts-BZ dieser Zeit wider. Bewertung: <6,5% = gut; 6,5–7,5% = mittel; >7,5% = schlecht. Für Diabetes-Diagnostik: Wird zweimal nüchtern ein Wert über 120 mg/dl gemessen → manifester Diabetes. Ergänzende Tests: OGTT (oraler Glucosetoleranztest), Blutzuckerprofil (mehrmals täglich gemessen), Nüchtern-BZ, postprandialer BZ."
      }
    },
    harvestQuestions: [
      {
        id: "diagnostik_endokrinium_h1",
        type: "mc",
        question: "Welche Untersuchung unterscheidet kalte, warme und heiße Knoten der Schilddrüse?",
        options: [
          { text: "Ultraschall der Schilddrüse", correct: false },
          { text: "Bluthormonbestimmung (T3, T4, TSH)", correct: false },
          { text: "Szintigramm mit radioaktivem Jod (nuklearmedizinisch)", correct: true },
          { text: "Palpation von hinten", correct: false }
        ],
        explanation: "Das Szintigramm nutzt radioaktives Jod: die Schilddrüse nimmt es aktiv auf. Bereiche mit hoher Aktivität = 'heiße Knoten' (meist gutartig, funktionell autonom); Bereiche ohne Aktivität = 'kalte Knoten' (kein Jod-Uptake; erhöhter CA-Verdacht). Warme Knoten liegen dazwischen. Es handelt sich um eine nuklearmedizinische Untersuchung."
      },
      {
        id: "diagnostik_endokrinium_h2",
        type: "true_false",
        statement: "Bei der Schilddrüsenpalpation deutet eine schlechte Schluckverschieblichkeit auf ein mögliches Karzinom hin.",
        answer: true,
        explanation: "Eine gesunde Schilddrüse ist schluckverschieblich (bewegt sich beim Schlucken mit der Luftröhre), glatt und nicht höckrig. Ist sie schlecht verschieblich, deutet das auf eine Infiltration des umgebenden Gewebes hin — wichtigstes Warnsignal für ein Schilddrüsenkarzinom (CA). Knoten und Schwirren (Überfunktion) sind weitere Palpationsbefunde."
      },
      {
        id: "diagnostik_endokrinium_h3",
        type: "mc",
        question: "Was misst der HbA1c-Wert?",
        options: [
          { text: "Den aktuellen Nüchternblutzucker der letzten Stunde", correct: false },
          { text: "Die Insulinresistenz der Muskelzellen", correct: false },
          { text: "Den Durchschnitts-Blutzuckerspiegel der letzten 8–10 Wochen", correct: true },
          { text: "Die Glucosemenge im Urin (Glucosurie)", correct: false }
        ],
        explanation: "HbA1c = glykiertes Hämoglobin. Bei dauerhaft hohem Blutzucker lagert sich Glucose irreversibel ans Hämoglobin. Da Erythrozyten ca. 8–12 Wochen leben, spiegelt HbA1c den Langzeit-Blutezuckerspiegel wider — das 'Blutzuckergedächtnis'. Ein Wert unter 6,5% gilt als gut eingestellt."
      },
      {
        id: "diagnostik_endokrinium_h4",
        type: "mc",
        question: "Wann liegt ein manifester Diabetes mellitus nach Nüchternblutzucker-Kriterium vor?",
        options: [
          { text: "Einmal nüchtern über 100 mg/dl", correct: false },
          { text: "Zweimal nüchtern über 120 mg/dl", correct: true },
          { text: "Einmal nüchtern über 140 mg/dl", correct: false },
          { text: "Postprandial über 140 mg/dl", correct: false }
        ],
        explanation: "Diagnose-Kriterium laut Studienbrief: Wird zweimal nüchtern ein Blutzucker über 120 mg/dl gemessen → manifester Diabetes mellitus. Normwert: 60–100 mg/dl. 100–120 mg/dl = pathologische Glukosetoleranz (Graubereich). Postprandial: normal <140 mg/dl, manifester Diabetes >200 mg/dl."
      },
      {
        id: "diagnostik_endokrinium_h5",
        type: "mc",
        question: "Wie wird der Grundumsatz im Rahmen der Schilddrüsendiagnostik bestimmt?",
        options: [
          { text: "Durch Messung von T3 und T4 im Blut", correct: false },
          { text: "Über Sauerstoffverbrauch (Spirometrie und Gasanalyse)", correct: true },
          { text: "Durch Ultraschall der Schilddrüse", correct: false },
          { text: "Über Körpergewicht und Körpergröße (BMI-Formel)", correct: false }
        ],
        explanation: "Der Grundumsatz wird über den Sauerstoffverbrauch gemessen: mittels Spirometrie und Gasanalyse. Bei der Umsetzung von 1 Liter Sauerstoff werden ca. 4,8 kcal freigesetzt. Da Schilddrüsenhormone (T3/T4) den Grundumsatz steigern, gibt die Grundumsatzmessung indirekte Hinweise auf die Schilddrüsenfunktion."
      }
    ],
    phase4Questions: [
      {
        id: "diagnostik_endokrinium_mc1",
        type: "mc",
        question: "Welche Aussagen zum Szintigramm der Schilddrüse stimmen?",
        options: [
          { text: "Es verwendet radioaktives Jod", correct: true },
          { text: "Es dient der Beurteilung der Aktivitätsverteilung in der Schilddrüse", correct: true },
          { text: "Es kann kalte, warme und heiße Knoten unterscheiden", correct: true },
          { text: "Es ersetzt vollständig die Bluthormonbestimmung", correct: false }
        ]
      },
      {
        id: "diagnostik_endokrinium_mc2",
        type: "mc",
        question: "Welche Aussagen zur Diabetesdiagnostik stimmen?",
        options: [
          { text: "Glucosurie entsteht bei Überschreitung der Nierenschwelle von 160–180 mg/dl", correct: true },
          { text: "HbA1c unter 6,5% gilt als gute Einstellung", correct: true },
          { text: "Manifester Diabetes: zweimal nüchtern über 120 mg/dl", correct: true },
          { text: "Postprandial gilt bereits ein Wert über 140 mg/dl als manifester Diabetes", correct: false }
        ]
      }
    ]
  })

];
