  makeDetailedPlant({
    id: "zelltod_1031",
    title: "Zelltod: Autolyse, Nekrose & Apoptose",
    contextHint: "Autolyse = Selbstauflösung; Nekrose = pathologisch durch äußere Einflüsse; Apoptose = programmierter Zelltod; Lebensdauer verschiedener Zellen",
    phase1: {
      soil: {
        statement: "Bei der Nekrose löst die Zelle sich kontrolliert und ohne Entzündungsreaktion auf.",
        answer: false,
        solution: "Das ist die Apoptose (programmierter Zelltod). Nekrose entsteht durch äußere Schädigung (chemisch, thermisch, mechanisch, strahlenbedingt) → Membrandefekte → Zellinhaltsaustritt → Entzündungsreaktion. Autolyse = Selbstauflösung durch eigene Enzyme nach dem Zelltod.",
      },
      seed: {
        statement: "Nervenzellen sind so alt wie der Gesamtorganismus und werden nicht ersetzt.",
        answer: true,
        solution: "Richtig. Die meisten Zellen haben begrenzte Lebensdauer: Erythrozyten ~120 Tage, andere Zellen wenige Tage. Nervenzellen und Herzmuskelzellen können nicht ersetzt werden und sind so alt wie der Organismus.",
      },
      water: {
        statement: "Apoptose ist physiologisch sinnvoll und für normale Entwicklung unerlässlich.",
        answer: true,
        solution: "Richtig. Apoptose = kontrollierte Selbsttötung: reguliert Zellzahl, eliminiert entartete Zellen, sichert Zellturnover (z. B. Riechepithel), selektiert genetisch intakte Keimzellen. Im Gegensatz zur Nekrose keine Entzündungsreaktion.",
      },
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "zt_h1",
        question: "Was ist der Unterschied zwischen Nekrose und Apoptose?",
        options: [
          { text: "Nekrose = durch äußere Schädigung, führt zu Entzündung; Apoptose = programmierter Zelltod, keine Entzündung", correct: true },
          { text: "Nekrose = physiologisch; Apoptose = immer pathologisch", correct: false },
          { text: "Beide Begriffe bezeichnen denselben Prozess", correct: false },
          { text: "Apoptose = durch Strahlung ausgelöst; Nekrose = selbst induziert", correct: false },
        ],
        explanation: "Nekrose: äußere Einflüsse → Membrandefekte → unkontrollierter Zellinhaltsaustritt → Entzündung. Apoptose: genetisch programmiert, kontrolliert, physiologisch notwendig für Entwicklung und Gewebehomöostase.",
      },
      {
        type: "mc",
        id: "zt_h2",
        question: "Was versteht man unter Autolyse?",
        options: [
          { text: "Selbstauflösung abgestorbener Körperzellen durch eigene Enzyme", correct: true },
          { text: "Auflösung von Zellen durch das Immunsystem", correct: false },
          { text: "Wachstum neuer Zellen nach einer Verletzung", correct: false },
          { text: "Programmierter Zelltod durch genetische Signale", correct: false },
        ],
        explanation: "Autolyse = enzymatische Selbstauflösung nach dem Zelltod: abbauende Enzyme wandern ein, Kern zerfällt in einzelne Stücke und löst sich auf. Dies ist ein Bestandteil der Verwesung.",
      },
      {
        type: "mc",
        id: "zt_h3",
        question: "Welche Zellen können NICHT ersetzt werden?",
        options: [
          { text: "Nervenzellen und Herzmuskelzellen", correct: true },
          { text: "Erythrozyten und Epithelzellen", correct: false },
          { text: "Leberzellen und Knochenzellen", correct: false },
          { text: "Alle Körperzellen können ersetzt werden", correct: false },
        ],
        explanation: "Nervenzellen und Herzmuskelzellen sind terminal differenziert und können nicht ersetzt werden. Erythrozyten (Lebensdauer ~120 Tage) und viele andere Zellen werden regelmäßig erneuert.",
      },
      {
        type: "mc",
        id: "zt_h4",
        question: "Durch welche Ursachen entsteht Nekrose?",
        options: [
          { text: "Chemische, thermische, mechanische oder strahlenbedingte Zerstörung der Zellstruktur", correct: true },
          { text: "Genetisch programmierte Signalwege der Zelle selbst", correct: false },
          { text: "Normale Alterung und physiologische Zellrückbildung", correct: false },
          { text: "Ausschließlich durch Virusinfektion", correct: false },
        ],
        explanation: "Nekrose = pathologischer Zelltod durch äußere Einflüsse: chemisch (Säure, Gifte), thermisch (Verbrennung, Erfrierung), mechanisch (Trauma), strahlenbedingt. Folge: Membrandefekte → Entzündungsreaktion.",
      },
      {
        type: "true_false",
        id: "zt_h5",
        statement: "Die Apoptose eliminiert unter anderem entartete Zellen und verhindert so die Tumorentstehung.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false },
        ],
        explanation: "Wahr. Apoptose = zelluläre Qualitätskontrolle: Elimination genetisch geschädigter oder entarteter Zellen ist ein Tumorsuppressmechanismus. Defekte Apoptose begünstigt Krebsentstehung.",
      },
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "zt_p4_1",
        question: "Welche Aussagen zu Zelltodformen sind korrekt? (Mehrere richtig)",
        options: [
          { text: "Nekrose führt zu einer Entzündungsreaktion im umliegenden Gewebe", correct: true },
          { text: "Apoptose ist physiologisch sinnvoll und notwendig für die normale Entwicklung", correct: true },
          { text: "Autolyse bezeichnet die Selbstauflösung durch körpereigene Enzyme nach dem Zelltod", correct: true },
          { text: "Nekrose ist immer ein programmierter, kontrollierter Prozess", correct: false },
        ],
        explanation: "Nekrose = unkontrolliert, Entzündung. Apoptose = kontrolliert, kein Entzündungsreiz. Autolyse = postmortale enzymatische Auflösung. Alle drei sind verschiedene Phänomene.",
      },
      {
        type: "mc",
        id: "zt_p4_2",
        question: "Warum ist Apoptose für die Entwicklung eines Organismus unerlässlich?",
        options: [
          { text: "Weil sie Zellzahl reguliert, entartete Zellen eliminiert, Zellturnover sichert und genetisch intakte Keimzellen selektiert", correct: true },
          { text: "Weil sie das Zellwachstum unbegrenzt fördert", correct: false },
          { text: "Weil sie ausschließlich in Tumorzellen vorkommt", correct: false },
          { text: "Weil sie Entzündungsreaktionen auslöst, die Infektionen bekämpfen", correct: false },
        ],
        explanation: "Apoptose ist multifunktional: 1. Kontrolle der Zellanzahl/Gewebegröße. 2. Elimination entarteter Zellen. 3. Zellturnover (z. B. Riechepithel). 4. Selektion genetisch intakter Keimzellen.",
      },
    ],
  }),

  makeDetailedPlant({
    id: "reizbarkeit_1031",
    title: "Reizbarkeit, Beweglichkeit & Grundregulation nach Pischinger",
    contextHint: "Membranrezeptoren (hydrophile Hormone) vs. intrazelluläre Rezeptoren (lipophile Hormone); Reizarten; Grundregulationssystem nach Pischinger",
    phase1: {
      soil: {
        statement: "Membranrezeptoren erkennen lipophile Steroidhormone, die problemlos durch die Zellmembran diffundieren.",
        answer: false,
        solution: "Intrazelluläre Rezeptoren (Kernrezeptoren) erkennen lipophile Steroid- und Thyreoideahormone. Membranrezeptoren erkennen hydrophile Hormone (Katecholamine, Polypeptide, Glykoproteine), die die Membran nicht passieren können.",
      },
      seed: {
        statement: "Das Grundregulationssystem nach Pischinger beschreibt die Regulation des Organismus über das Bindegewebe.",
        answer: true,
        solution: "Richtig. Pischinger (1953): Das Bindegewebe vernetzt alle Organe. Dazwischen liegt die Extrazellularflüssigkeit, in die Kapillare, Nervenzellen und Lymphgefäße münden. Verschlackung dieser Matrix → gestörte Nährstoffversorgung → Befindlichkeitsstörungen.",
      },
      water: {
        statement: "Zellen können sich nur durch äußere Bewegung fortbewegen – intrazelluläre Bewegung ist nicht möglich.",
        answer: false,
        solution: "Falsch. Zellen bewegen sich äußerlich (durch Geißeln/Pseudopodien/Zilien) UND innerlich: Das Zytoplasma ist in ständiger Bewegung; Organellen, Moleküle und Stoffe werden transportiert. Das Zytoskelett ist dynamisch.",
      },
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "rb_h1",
        question: "Welche Hormontypen binden an Membranrezeptoren?",
        options: [
          { text: "Hydrophile Hormone: Katecholamine, Polypeptid- und Glycoproteinhormone", correct: true },
          { text: "Lipophile Steroid- und Thyreoideahormone", correct: false },
          { text: "Alle Hormone ohne Unterschied", correct: false },
          { text: "Nur Steroidhormone mit mehr als 20 Kohlenstoffatomen", correct: false },
        ],
        explanation: "Membranrezeptoren: für hydrophile (wasserlösliche) Hormone, die die Membran nicht durchdringen können. Lipophile Hormone (Steroide, Thyroxin) diffundieren direkt durch die Membran zu intrazellulären Rezeptoren.",
      },
      {
        type: "mc",
        id: "rb_h2",
        question: "Was ist die Aufgabe der Kernrezeptoren (intrazellulären Rezeptoren)?",
        options: [
          { text: "Sie binden lipophile Hormone und aktivieren/hemmen die DNA-Transkription", correct: true },
          { text: "Sie leiten elektrische Signale über die Zellmembran weiter", correct: false },
          { text: "Sie verdauen zellfremde Substanzen durch Hydrolasen", correct: false },
          { text: "Sie bilden den Spindelapparat bei der Zellteilung", correct: false },
        ],
        explanation: "Kernrezeptoren: werden durch Bindung eines lipophilen Liganden aktiviert → binden an DNA → Transkription ein- oder ausschalten. Zuständig für Steroid- und Thyreoideahormone.",
      },
      {
        type: "mc",
        id: "rb_h3",
        question: "Was beschreibt das Grundregulationssystem nach Pischinger?",
        options: [
          { text: "Die Regulation des Organismus über das Bindegewebe als Versorgungs- und Entsorgungssystem", correct: true },
          { text: "Die Steuerung der Zellkernfunktionen durch Hormone", correct: false },
          { text: "Die spezifische Immunabwehr durch T- und B-Zellen", correct: false },
          { text: "Das Prinzip der Zellteilung durch Mitose", correct: false },
        ],
        explanation: "Pischinger (1953): Das Bindegewebe verbindet alle Organe. Extrazellularflüssigkeit = Versorgungs- und Entsorgungsmedium. Kapillare, Nerven und Lymphgefäße münden darin. Verschlackung → gestörte Nährstoffversorgung → Befindlichkeitsstörungen.",
      },
      {
        type: "mc",
        id: "rb_h4",
        question: "Welche Reizarten kann eine Zelle über Rezeptoren aufnehmen?",
        options: [
          { text: "Chemische (Botenstoffe), elektrische, thermische, mechanische und nervöse Reize", correct: true },
          { text: "Ausschließlich chemische Reize durch Hormone", correct: false },
          { text: "Nur mechanische und elektrische Reize", correct: false },
          { text: "Nur Reize aus dem eigenen Organ", correct: false },
        ],
        explanation: "Reizbarkeit der Zelle: Rezeptoren für chemische Reize (Botenstoffe – am wichtigsten), elektrische, thermische, mechanische und nervöse Reize. Membranrezeptoren = Sinnesorgane der Zelle.",
      },
      {
        type: "true_false",
        id: "rb_h5",
        statement: "Bei Überlastung der Ausscheidungsorgane können sich Stoffwechselrückstände im Bindegewebe ansammeln und die Nährstoffversorgung der Zellen beeinträchtigen.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false },
        ],
        explanation: "Wahr (nach Pischinger). Verschlackung: Ausscheidungsorgane überlastet → Stoffwechselrückstände im Bindegewebe → Nährstoffaufnahme der Zellen gestört → Befindlichkeitsstörungen jeglicher Art.",
      },
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "rb_p4_1",
        question: "Welche zwei Rezeptortypen gibt es, und welche Hormonklasse erkennt welchen?",
        options: [
          { text: "Membranrezeptoren (hydrophile Hormone); intrazelluläre Rezeptoren (lipophile Hormone)", correct: true },
          { text: "Kernrezeptoren (hydrophile Hormone); Membranrezeptoren (lipophile Hormone)", correct: false },
          { text: "Beide Rezeptortypen sind für dieselben Hormonklassen zuständig", correct: false },
          { text: "Membranrezeptoren nur für Steroidhormone; Kernrezeptoren für alle anderen", correct: false },
        ],
        explanation: "Zwei Klassen: 1. Membranrezeptoren: hydrophile Hormone (Katecholamine, Peptide, Glykoproteine). 2. Intrazelluläre/Kernrezeptoren: lipophile Hormone (Steroide, Thyroxin) diffundieren durch Membran.",
      },
      {
        type: "mc",
        id: "rb_p4_2",
        question: "Was passiert laut Pischinger bei starker Verschlackung des Bindegewebes?",
        options: [
          { text: "Grundregulation eingeschränkt → Nährstoffmängel in Zellen → Befindlichkeitsstörungen aller Art", correct: true },
          { text: "Aktivierung des Immunsystems mit verstärkter Abwehr", correct: false },
          { text: "Erhöhte Zellteilung und Tumorwachstum", correct: false },
          { text: "Keine klinische Relevanz, da Lymphe die Funktion übernimmt", correct: false },
        ],
        explanation: "Pischinger: Verschlackung des Extrazellularraums → Grundregulation nur noch unvollständig → direkte Nährstoffmängel in Zellen → Befindlichkeitsstörungen jeglicher Art.",
      },
    ],
  })
