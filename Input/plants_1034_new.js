  makeDetailedPlant({
    id: "trapezius_latissimus_1034",
    title: "M. trapezius, M. latissimus dorsi & obere Rückenmuskelgruppe",
    contextHint: "M.trapezius (N.accessorius; Pars descendens/transversa/ascendens; Scapula-Hebung+Drehung medianwärts; einseitig Kopfdrehung zur Gegenseite); M.latissimus dorsi (N.thoracodorsalis; Adduktion+Retroversion+Innenrotation des Arms); Mm.rhomboidei+M.levator scapulae (N.dorsalis scapulae; Schulterblatt-Fixierung+Hebung); Agonist=Hauptbeweger; Antagonist=Gegenspieler; Synergist=Helfer",
    phase1: {
      soil: {
        statement: "Der M. latissimus dorsi wird vom N. accessorius innerviert.",
        answer: false,
        solution: "Falsch. Den M. latissimus dorsi innerviert der N. thoracodorsalis. Den N. accessorius (XI. Hirnnerv) bekommt dagegen der M. trapezius. Diese Verwechslung ist prüfungsrelevant: Trapezius → N. accessorius; Latissimus dorsi → N. thoracodorsalis.",
      },
      seed: {
        statement: "Der M. trapezius kann bei einseitiger Kontraktion den Kopf zur Gegenseite drehen.",
        answer: true,
        solution: "Richtig. Der M. trapezius hat drei Anteile (Pars descendens/transversa/ascendens). Einseitig: dreht den Kopf zur Gegenseite, hebt die Clavicula. Bilateral: Extension des Kopfes und der HWS. Gesamtwirkung: zieht den Schultergürtel nach hinten, hebt und dreht die Scapula medianwärts (Voraussetzung für Armhebung über die Horizontale).",
      },
      water: {
        statement: "Agonist und Antagonist eines Muskelpaares kontrahieren bei derselben Bewegung gleichzeitig mit gleicher Kraft.",
        answer: false,
        solution: "Falsch. Der Agonist (Hauptbeweger) kontrahiert aktiv und führt die Bewegung aus. Der Antagonist (Gegenspieler) erschlafft dabei (reziproke Hemmung). Der Synergist unterstützt und feinjustiert die Agonisten-Aktion als Helfer. Beispiel Ellenbogenflexion: Agonist = M. biceps brachii; Antagonist = M. triceps brachii; Synergist = M. brachialis.",
      },
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "tl_h1",
        question: "Welche Funktion hat der M. trapezius und welcher Nerv innerviert ihn?",
        options: [
          { text: "Hebung und Drehung der Scapula medianwärts; einseitig: Kopfdrehung zur Gegenseite; Innervation: N. accessorius (XI)", correct: true },
          { text: "Adduktion und Innenrotation des Arms; Innervation: N. thoracodorsalis", correct: false },
          { text: "Fixierung der Scapula am Thorax; Armhebung über die Horizontale; N. thoracicus longus", correct: false },
          { text: "Beugung der Halswirbelsäule und Atemhilfe; N. phrenicus", correct: false },
        ],
        explanation: "M. trapezius (Kapuzenmuskel): Ursprung Hinterhauptbein/HWS C7/BWS Th1-12, Ansatz Clavicula/Akromion/Spina scapulae. N. accessorius (XI. Hirnnerv) + Plexus cervicalis. Gesamtwirkung: Schultergürtel nach hinten; Pars descendens hebt Scapula; einseitig dreht Kopf zur Gegenseite; bilateral: Kopf/HWS-Extension.",
      },
      {
        type: "mc",
        id: "tl_h2",
        question: "Welche Bewegungen führt der M. latissimus dorsi am Arm aus?",
        options: [
          { text: "Adduktion, Retroversion (Rückführen) und Innenrotation des Arms; Innervation: N. thoracodorsalis", correct: true },
          { text: "Abduktion, Anteversion und Außenrotation des Arms; N. axillaris", correct: false },
          { text: "Flexion und Supination im Ellenbogengelenk; N. musculocutaneus", correct: false },
          { text: "Elevation und Protraktion des Schultergürtels; N. accessorius", correct: false },
        ],
        explanation: "M. latissimus dorsi (breiter Rückenmuskel): Ursprung Th7-L5/Os sacrum/Os ilium, Ansatz Crista tuberculi minoris humeri. N. thoracodorsalis. Funktionen: Adduktion (heranführen), Retroversion (rückwärts führen), Innenrotation des Arms und Senkung des Schultergürtels. Auch exspiratorischer Atemhilfsmuskel.",
      },
      {
        type: "mc",
        id: "tl_h3",
        question: "Was ist der Unterschied zwischen Agonist, Antagonist und Synergist?",
        options: [
          { text: "Agonist = Hauptbeweger; Antagonist = Gegenspieler mit entgegengesetzter Funktion; Synergist = unterstützender Helfer", correct: true },
          { text: "Agonist und Antagonist kontrahieren stets gleichzeitig mit gleicher Kraft", correct: false },
          { text: "Synergist = Gegenspieler; Agonist = Helfer; Antagonist = Hauptbeweger", correct: false },
          { text: "Alle drei Begriffe bezeichnen dasselbe Konzept unterschiedlich großer Muskeln", correct: false },
        ],
        explanation: "Agonist (Hauptbeweger): führt die Primärbewegung aus. Antagonist (Gegenspieler): hat entgegengesetzte Funktion; erschlafft bei Agonisten-Aktion (reziproke Hemmung). Synergist: unterstützt und feinjustiert den Agonisten. Beispiel: Ellenbogenflexion: Agonist = M. biceps brachii, Antagonist = M. triceps brachii, Synergist = M. brachialis.",
      },
      {
        type: "mc",
        id: "tl_h4",
        question: "Welche Funktion haben die Mm. rhomboidei und der M. levator scapulae?",
        options: [
          { text: "Beide heben und fixieren das Schulterblatt; beide werden vom N. dorsalis scapulae innerviert", correct: true },
          { text: "M. rhomboideus: Armadduktion; M. levator scapulae: Kopfrotation zur Gegenseite", correct: false },
          { text: "Beide abduzieren die Scapula und ermöglichen Armhebung über die Horizontale", correct: false },
          { text: "M. rhomboideus wird vom N. thoracodorsalis innerviert", correct: false },
        ],
        explanation: "Mm. rhomboidei major (Th1-4) und minor (C6+7): heben das Schulterblatt kranial und medial, fixieren es am Rumpf. M. levator scapulae (C1-4): hebt Schulterblatt nach oben, neigt den Hals bei fixiertem Schulterblatt zur gleichen Seite. Alle drei: N. dorsalis scapulae. Klinisch: Schwäche dieser Muskeln → schlechte Schulterblatt-Fixierung, Schmerzsyndrome.",
      },
      {
        type: "true_false",
        id: "tl_h5",
        statement: "Der M. latissimus dorsi kann als exspiratorischer Atemhilfsmuskel wirken.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false },
        ],
        explanation: "Wahr. M. latissimus dorsi senkt den Schultergürtel und komprimiert bei freiem Arm den Thorax von unten. Bei forcierter Ausatmung (z.B. Husten, Niesen, Sport) wird er als exspiratorischer Atemhilfsmuskel aktiv. Diese Doppelrolle gilt auch für andere Muskeln, die zwischen Rumpf und Schulter ziehen.",
      },
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "tl_p4_1",
        question: "Welche Aussagen zu M. trapezius und M. latissimus dorsi sind korrekt? (Mehrere richtig)",
        options: [
          { text: "M. trapezius: N. accessorius; Scapula-Hebung und -Drehung medianwärts", correct: true },
          { text: "M. latissimus dorsi: N. thoracodorsalis; Adduktion/Retroversion/Innenrotation des Arms", correct: true },
          { text: "M. trapezius dreht bei einseitiger Kontraktion den Kopf zur Gegenseite", correct: true },
          { text: "M. latissimus dorsi und M. trapezius werden beide vom N. accessorius innerviert", correct: false },
        ],
        explanation: "Trapezius (N. accessorius): Scapula-Steuerung, Kopfdrehung zur Gegenseite, HWS-Extension. Latissimus dorsi (N. thoracodorsalis): Arm-Adduktion/Retroversion/Innenrotation. ACHTUNG: Latissimus wird NICHT vom N. accessorius innerviert — das ist der Trapezius. Diese Nerv-Muskel-Zuordnung ist prüfungsrelevant.",
      },
      {
        type: "mc",
        id: "tl_p4_2",
        question: "Welcher Muskel adduziert und innenrotiert den Arm, und welcher hebt und dreht die Scapula medianwärts?",
        options: [
          { text: "Adduktion/Innenrotation: M. latissimus dorsi (N. thoracodorsalis); Scapula-Hebung/-Drehung: M. trapezius (N. accessorius)", correct: true },
          { text: "Adduktion/Innenrotation: M. trapezius; Scapula-Hebung: M. latissimus dorsi", correct: false },
          { text: "Beide Funktionen werden vom M. trapezius ausgeführt", correct: false },
          { text: "Adduktion/Innenrotation: M. deltoideus; Scapula-Drehung: M. rhomboideus", correct: false },
        ],
        explanation: "Klare Trennung: M. latissimus dorsi (N. thoracodorsalis) = Arm-Bewegungen (Adduktion, Retroversion, Innenrotation). M. trapezius (N. accessorius) = Scapula-Bewegungen (Hebung, Drehung medianwärts) + Kopfdrehung. Diese Zuordnung Nerv-Muskel-Funktion ist examensrelevant.",
      },
    ],
  }),

  makeDetailedPlant({
    id: "diaphragma_pectoralis_1034",
    title: "Diaphragma, M. pectoralis major & M. serratus anterior",
    contextHint: "Diaphragma = Hauptatemmuskel (N.phrenicus=C4; Einatmung=Kontraktion+Abflachung; Ausatmung=Erschlaffung+Hochsteigen); M.pectoralis major (N.pectorales; Adduktion+Innenrotation des Arms); M.serratus anterior (N.thoracicus longus; Scapulafixierung+Armhebung über Horizontale; Ausfall=Scapula alata)",
    phase1: {
      soil: {
        statement: "Das Diaphragma kontrahiert sich bei der Ausatmung und erschlafft bei der Einatmung.",
        answer: false,
        solution: "Falsch. Bei der Einatmung kontrahiert das Diaphragma und flacht sich ab — das Thoraxvolumen vergrößert sich und Luft strömt ein. Bei der Ausatmung erschlafft es und wölbt sich wieder nach oben. Das Diaphragma wird vom N. phrenicus (Hauptwurzel C4) innerviert — Ausfall bedeutet Atemlähmung auf der betroffenen Seite.",
      },
      seed: {
        statement: "Der M. pectoralis major führt am Schultergelenk Adduktion und Innenrotation des Armes aus.",
        answer: true,
        solution: "Richtig. M. pectoralis major: Ursprung Clavicula/Sternum/Rippenknorpel 1-6, Ansatz Crista tuberculi majoris humeri. Innervation: Nn. pectorales medialis und lateralis. Hauptfunktionen: Adduktion und Innenrotation des Arms, Anteversion. Bei fixiertem Arm: Atemhilfsmuskel (hebt Brustkorb).",
      },
      water: {
        statement: "Der M. serratus anterior fixiert das Schulterblatt am Thorax und ermöglicht die Armhebung über die Horizontale.",
        answer: true,
        solution: "Richtig. M. serratus anterior: Ursprung 1.-9. Rippe, Ansatz Margo medialis scapulae. N. thoracicus longus. Funktionen: zieht die Scapula nach lateral/vorne und presst sie an den Thorax. Armhebung über 90 Grad ist nur möglich, wenn die Scapula stabil fixiert ist. Lähmung: Scapula alata (Abstehen des Schulterblatts vom Rücken).",
      },
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "dp_h1",
        question: "Warum wird der N. phrenicus als Lebensnerv bezeichnet?",
        options: [
          { text: "Weil er das Diaphragma innerviert — Ausfall beider N. phrenici führt zur vollständigen Atemlähmung", correct: true },
          { text: "Weil er das Herz innerviert und den Herzrhythmus steuert", correct: false },
          { text: "Weil er vom Plexus brachialis stammt und alle Armmuskeln versorgt", correct: false },
          { text: "Weil er alle Atemhilfsmuskeln des Thorax innerviert", correct: false },
        ],
        explanation: "N. phrenicus: Hauptwurzel C4, Beiträge von C3 und C5. Einziger Nerv des Diaphragmas (Hauptatemmuskel). Bei Querschnittlähmung oberhalb C4: Ausfall beider N. phrenici → Atemlähmung → Beatmungspflicht. Merke: C3-C4-C5 keeps the diaphragm alive.",
      },
      {
        type: "mc",
        id: "dp_h2",
        question: "Was passiert physiologisch beim Diaphragma bei Ein- und Ausatmung?",
        options: [
          { text: "Einatmung: Kontraktion/Abflachung → Thoraxvolumen steigt → Luft strömt ein; Ausatmung: Erschlaffung/Hochsteigen → Volumen sinkt → Luft strömt aus", correct: true },
          { text: "Einatmung: Erschlaffung des Diaphragmas; Ausatmung: Kontraktion", correct: false },
          { text: "Das Diaphragma ist bei ruhiger Atmung passiv und wird nur bei forcierter Atmung aktiviert", correct: false },
          { text: "Einatmung: Diaphragma steigt nach oben; Ausatmung: Diaphragma flacht sich ab", correct: false },
        ],
        explanation: "Atemmechanik: Inspiration = aktive Kontraktion → kuppelförmiges Diaphragma flacht sich ab → Thoraxraum vergrößert sich → Druck sinkt unter Atmosphärendruck → Luft strömt ein. Exspiration = Erschlaffung → Diaphragma wölbt sich nach oben → Thoraxraum verkleinert sich → Luft strömt aus. Bei forcierter Ausatmung helfen zusätzlich Bauchmuskeln.",
      },
      {
        type: "mc",
        id: "dp_h3",
        question: "Welche Hauptfunktionen hat der M. pectoralis major?",
        options: [
          { text: "Adduktion und Innenrotation des Arms; bei fixiertem Arm auch Atemhilfsmuskel; Innervation: Nn. pectorales", correct: true },
          { text: "Abduktion und Außenrotation des Arms; Innervation: N. axillaris", correct: false },
          { text: "Fixierung der Scapula am Thorax; Innervation: N. thoracicus longus", correct: false },
          { text: "Extension des Ellenbogens; Innervation: N. radialis", correct: false },
        ],
        explanation: "M. pectoralis major (großer Brustmuskel): Ursprung Clavicula medial/Sternum/Rippenknorpel 1-6, Ansatz Crista tuberculi majoris humeri. Nn. pectorales medialis und lateralis. Funktionen: Adduktion, Innenrotation und Anteversion des Arms. Bei fixiertem Arm hebt er den Brustkorb (Atemhilfsmuskel).",
      },
      {
        type: "mc",
        id: "dp_h4",
        question: "Was versteht man unter Scapula alata und durch welche Lähmung entsteht sie?",
        options: [
          { text: "Flügelartig abstehendes Schulterblatt durch Lähmung des M. serratus anterior (N. thoracicus longus)", correct: true },
          { text: "Hochstand des Schulterblatts durch Trapezius-Lähmung", correct: false },
          { text: "Einsinken des Schulterblatts bei Rotatorenmanschettenriss", correct: false },
          { text: "Vorgewölbte Schulter durch Hypertrophie des M. pectoralis major", correct: false },
        ],
        explanation: "Scapula alata (Flügelschulterblatt): das Schulterblatt steht flügelartig vom Rücken ab. Ursache: Lähmung des M. serratus anterior durch Schädigung des N. thoracicus longus (z.B. bei Schulteroperationen oder Druckläsion durch Rucksack). Ohne Serratus-Fixierung kann die Scapula nicht an den Thorax angepresst werden — Armhebung über die Horizontale ist eingeschränkt.",
      },
      {
        type: "true_false",
        id: "dp_h5",
        statement: "Das Diaphragma wird vom N. phrenicus innerviert, der seinen Hauptursprung im Rückenmarkssegment C4 hat.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false },
        ],
        explanation: "Wahr. N. phrenicus: Hauptwurzel C4, Beiträge von C3 und C5. Verläuft über den vorderen Skalenusmuskel nach kaudal durch den Thorax zum Diaphragma. Klinische Bedeutung: Halsmarkläsionen oberhalb C4 bedrohen die Atemfunktion. Merke: C4 ist das kritische Segment für die Eigenatmung.",
      },
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "dp_p4_1",
        question: "Welche Aussagen zu Diaphragma, M. pectoralis major und M. serratus anterior sind korrekt? (Mehrere richtig)",
        options: [
          { text: "Diaphragma: N. phrenicus (C4); Einatmung = Kontraktion und Abflachung", correct: true },
          { text: "M. serratus anterior: N. thoracicus longus; Scapulafixierung; Ausfall = Scapula alata", correct: true },
          { text: "M. pectoralis major: Adduktion und Innenrotation des Arms; Nn. pectorales", correct: true },
          { text: "M. pectoralis major führt Abduktion und Außenrotation des Arms aus", correct: false },
        ],
        explanation: "Diaphragma (N. phrenicus, C4): Einatmung durch Kontraktion/Abflachung. Serratus anterior (N. thoracicus longus): Scapulafixierung; Lähmung = Scapula alata. Pectoralis major (Nn. pectorales): ADDUKTION und INNENROTATION — NICHT Abduktion/Außenrotation (das ist Supraspinatus/Deltoideus).",
      },
      {
        type: "mc",
        id: "dp_p4_2",
        question: "Was unterscheidet die Funktion des M. serratus anterior von der des M. pectoralis major?",
        options: [
          { text: "Serratus anterior: fixiert Scapula am Thorax, ermöglicht Armhebung über die Horizontale; Pectoralis major: adduziert und innenrotiert den Arm", correct: true },
          { text: "Beide führen identische Arm-Bewegungen aus; Serratus zusätzlich Atemfunktion", correct: false },
          { text: "Pectoralis major fixiert die Scapula; Serratus anterior adduziert den Arm", correct: false },
          { text: "Kein funktioneller Unterschied — beide werden vom N. thoracicus longus innerviert", correct: false },
        ],
        explanation: "M. serratus anterior (N. thoracicus longus): zieht Scapula nach lateral/vorne, presst sie an den Thorax, ermöglicht Armhebung über 90 Grad. M. pectoralis major (Nn. pectorales): bewegt den Arm (Adduktion, Innenrotation, Anteversion). Verschiedene Innervation, verschiedene Ansatzpunkte, verschiedene Primärfunktionen.",
      },
    ],
  }),

  makeDetailedPlant({
    id: "iliopsoas_hamstrings_1034",
    title: "M. iliopsoas, Hamstrings & Adduktorengruppe",
    contextHint: "M.iliopsoas = M.psoas major+M.iliacus (stärkster Hüftbeuger; Ansatz Trochanter minor; N.femoralis); Hamstrings = ischiokrurale Muskeln (M.biceps femoris+M.semitendinosus+M.semimembranosus; Ursprung Tuber ischiadicum; N.tibialis; Kniebeuger+Hüftstrecker); Adduktorengruppe (M.adductor longus/brevis/magnus+M.gracilis; N.obturatorius; Adduktion+Beugung Hüfte)",
    phase1: {
      soil: {
        statement: "Die ischiokruralen Muskeln (Hamstrings) strecken hauptsächlich das Kniegelenk.",
        answer: false,
        solution: "Falsch. Die Hamstrings (M. biceps femoris, M. semitendinosus, M. semimembranosus) beugen das Knie (Flexion) und strecken die Hüfte (Extension). Die Kniestreckung (Extension) ist die Funktion des M. quadriceps femoris. Hamstrings und Quadriceps bilden am Kniegelenk ein klassisches Antagonistenpaar.",
      },
      seed: {
        statement: "Der M. iliopsoas besteht aus M. psoas major und M. iliacus, inseriert am Trochanter minor und ist der stärkste Hüftbeuger.",
        answer: true,
        solution: "Richtig. M. psoas major (Ursprung Th12/L1-4) und M. iliacus (Ursprung Fossa iliaca) vereinigen sich und setzen gemeinsam am Trochanter minor an. Innervation: Plexus lumbalis, N. femoralis. Der Iliopsoas ist der stärkste Hüftbeuger des menschlichen Körpers — beim Treppensteigen, Aufstehen und Laufen unverzichtbar.",
      },
      water: {
        statement: "Die Adduktorengruppe des Oberschenkels wird hauptsächlich vom N. obturatorius innerviert.",
        answer: true,
        solution: "Richtig. M. adductor longus, brevis, magnus und M. gracilis werden hauptsächlich vom N. obturatorius innerviert. Ausnahme: Der kaudale Anteil des M. adductor magnus erhält zusätzlich Fasern vom N. tibialis. Funktion: Adduktion (Heranziehen) und Beugung des Oberschenkels. Klinisch: Adduktorenzerrung häufig bei Sportlern.",
      },
    },
    harvestQuestions: [
      {
        type: "mc",
        id: "ih_h1",
        question: "Aus welchen Muskeln besteht der M. iliopsoas, wo inseriert er und was ist seine Hauptfunktion?",
        options: [
          { text: "M. psoas major + M. iliacus; Ansatz Trochanter minor; stärkster Hüftbeuger; N. femoralis", correct: true },
          { text: "M. gluteus maximus + M. gluteus medius; Ansatz Trochanter major; Hüftextension; N. gluteus inferior", correct: false },
          { text: "M. rectus femoris + M. vastus lateralis; Ansatz Tuberositas tibiae; Kniestreckung; N. femoralis", correct: false },
          { text: "M. sartorius + M. gracilis; Ansatz Pes anserinus; Adduktion; N. obturatorius", correct: false },
        ],
        explanation: "M. iliopsoas = M. psoas major (Th12/L1-4) + M. iliacus (Fossa iliaca). Gemeinsamer Ansatz: Trochanter minor des Femur. Innervation: N. femoralis (Plexus lumbalis). Stärkster Hüftbeuger. M. psoas major beugt zusätzlich die LWS (Inklination/Lateralflexion). Klinisch: Psoas-Verkürzung häufig bei Hohlkreuz und Hüftschmerzen.",
      },
      {
        type: "mc",
        id: "ih_h2",
        question: "Was versteht man unter den ischiokruralen Muskeln (Hamstrings) und welche Funktionen haben sie?",
        options: [
          { text: "M. biceps femoris, M. semitendinosus, M. semimembranosus; Ursprung Tuber ischiadicum; Kniebeugung und Hüftstreckung", correct: true },
          { text: "M. quadriceps femoris (4 Köpfe); Ursprung Femur/Os ilium; Kniestreckung", correct: false },
          { text: "Adduktorengruppe; Ursprung Os pubis; Adduktion der Hüfte", correct: false },
          { text: "M. gluteus maximus/medius/minimus; Ursprung Os ilium; Abduktion und Extension", correct: false },
        ],
        explanation: "Ischiokrurale Muskeln (Hamstrings): M. biceps femoris (Caput longum + breve), M. semitendinosus, M. semimembranosus. Gemeinsamer Ursprung: Tuber ischiadicum (Sitzbeinhöcker). Innervation: N. tibialis (Caput breve M. biceps femoris: N. peronaeus communis). Funktionen: Kniebeugung, Hüftstreckung, Unterschenkelrotation. Klinisch: Hamstring-Zerrung häufig bei Sprints.",
      },
      {
        type: "mc",
        id: "ih_h3",
        question: "Welche Muskeln gehören zur Adduktorengruppe des Oberschenkels?",
        options: [
          { text: "M. adductor longus, M. adductor brevis, M. adductor magnus und M. gracilis; Innervation: N. obturatorius", correct: true },
          { text: "M. quadriceps femoris (4 Köpfe); N. femoralis", correct: false },
          { text: "M. biceps femoris, M. semitendinosus, M. semimembranosus; N. tibialis", correct: false },
          { text: "M. gluteus maximus, medius, minimus; Nn. glutei", correct: false },
        ],
        explanation: "Adduktorengruppe: M. adductor longus, M. adductor brevis, M. adductor magnus + M. gracilis (und M. pectineus). Innervation hauptsächlich N. obturatorius; M. adductor magnus kaudal: N. tibialis. Funktion: Adduktion (Heranziehen) und Beugung des Oberschenkels. Klinisch: Adduktorenzerrung = häufige Sportverletzung im Innenschenkelbereich.",
      },
      {
        type: "mc",
        id: "ih_h4",
        question: "Welches funktionelle Antagonistenpaar bilden M. quadriceps femoris und die ischiokruralen Muskeln am Knie?",
        options: [
          { text: "Quadriceps = Kniestrecker (Extension); Ischiokrurale = Kniebeuger (Flexion) — klassisches Antagonistenpaar", correct: true },
          { text: "Beide strecken das Knie; der Unterschied liegt nur in der Kraft", correct: false },
          { text: "Quadriceps = Kniebeuger; Ischiokrurale = Kniestrecker", correct: false },
          { text: "Kein Antagonistenverhältnis — beide wirken nur am Hüftgelenk", correct: false },
        ],
        explanation: "Klassisches Antagonistenpaar am Knie: M. quadriceps femoris (vorne, N. femoralis) = Knieextension. Ischiokrurale Muskeln (dorsal, N. tibialis) = Knieflexion. Beim Gehen, Laufen, Springen koordiniert dieses Paar die Kniesteuerung. Der M. rectus femoris des Quadriceps beugt zudem die Hüfte (zweigelenkiger Muskel).",
      },
      {
        type: "true_false",
        id: "ih_h5",
        statement: "Alle drei Hauptmuskeln der ischiokruralen Gruppe haben ihren Ursprung am Tuber ischiadicum.",
        options: [
          { text: "Wahr", correct: true },
          { text: "Falsch", correct: false },
        ],
        explanation: "Wahr (mit Einschränkung): M. biceps femoris Caput longum, M. semitendinosus und M. semimembranosus entspringen alle am Tuber ischiadicum. Das Caput breve des M. biceps femoris entspringt an der Linea aspera femoris. Der gemeinsame Ursprung am Tuber ischiadicum erklärt Schmerzen beim Sitzen auf harten Flächen.",
      },
    ],
    phase4Questions: [
      {
        type: "mc",
        id: "ih_p4_1",
        question: "Welche Aussagen zu M. iliopsoas, Hamstrings und Adduktoren sind korrekt? (Mehrere richtig)",
        options: [
          { text: "M. iliopsoas (M. psoas major + M. iliacus): stärkster Hüftbeuger; Ansatz Trochanter minor; N. femoralis", correct: true },
          { text: "Ischiokrurale Muskeln (Hamstrings): Ursprung Tuber ischiadicum; Kniebeuger + Hüftstrecker; N. tibialis", correct: true },
          { text: "Adduktorengruppe (M. adductor longus/brevis/magnus + M. gracilis): Adduktion; N. obturatorius", correct: true },
          { text: "Die Hamstrings sind die stärksten Kniestrecker des Oberschenkels", correct: false },
        ],
        explanation: "Iliopsoas = stärkster Hüftbeuger (N. femoralis, Trochanter minor). Hamstrings = Kniebeuger + Hüftstrecker (N. tibialis, Tuber ischiadicum). Adduktoren = Heranziehen Oberschenkel (N. obturatorius). ACHTUNG: Hamstrings sind KNIEBEUGER — der stärkste KNIESTRECKER ist der M. quadriceps femoris.",
      },
      {
        type: "mc",
        id: "ih_p4_2",
        question: "Welcher Nerv innerviert den M. iliopsoas und welchen Muskelbereich innerviert der N. obturatorius?",
        options: [
          { text: "M. iliopsoas: N. femoralis; N. obturatorius: Adduktorengruppe des Oberschenkels", correct: true },
          { text: "M. iliopsoas: N. obturatorius; N. femoralis: Adduktoren", correct: false },
          { text: "Beide Muskelgruppen werden vom N. femoralis innerviert", correct: false },
          { text: "M. iliopsoas: N. ischiadicus; N. obturatorius: M. quadriceps femoris", correct: false },
        ],
        explanation: "N. femoralis (L2-L4): innerviert M. iliopsoas, M. quadriceps femoris, M. sartorius, M. pectineus. N. obturatorius (L2-L4): innerviert die Adduktorengruppe (M. adductor longus/brevis/magnus, M. gracilis, M. obturatorius externus). Beide entstammen dem Plexus lumbalis. Klinisch: N.-obturatorius-Lähmung = Adduktionsschwäche, typisch bei Beckenfrakturen.",
      },
    ],
  })
