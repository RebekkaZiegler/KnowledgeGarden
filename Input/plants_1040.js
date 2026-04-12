// Studienbrief 1040 — Strukturen und Funktion der Leber und der Gallenblase
// Temp file: merge into js/content.js before PACK_CONTENT

const LEBER_GALLENBLASE_1040_PLANTS = [

  makeDetailedPlant({
    id: "leber_anatomie_makroskopie",
    title: "Leber: Anatomie, Lage, Lappen und Leberpforte",
    contextHint: "Studienbrief 1040 Leber – Anatomie und Makroskopie",
    phase1: {
      soil: {
        statement: "Die Leber ist das größte Stoffwechselorgan und die größte exokrine Drüse des Körpers; sie wiegt ca. 1,5 kg (23×18×9 cm) und liegt im rechten Oberbauch unterhalb des Zwerchfells; ihre Perfusion beträgt ca. 2 l/min (gesamtes Blut passiert die Leber in ca. 3 Minuten).",
        answer: true,
        solution: "Von ventral sind zwei große Lappen sichtbar: Lobus hepatis dexter und sinister, getrennt durch das Ligamentum falciforme hepatis (sichelförmig, war Ductus venosus). Von visceral kommen Lobus caudatus (oben) und Lobus quadratus (unten) hinzu. Das Ligamentum teres hepatis (rundes Leberband, Fortsetzung des Lig. falciforme, aus Nabelvenenstrang) liegt dorsal. Die Porta hepatis (Leberhilus) liegt auf der visceralen Seite in H-Form: Eintritt der Vena portae und Arteria hepatica, Austritt des Ductus hepaticus. Bei tiefer Einatmung wird die Leber ca. 2 Querfinger nach unten gedrückt."
      },
      seed: {
        statement: "Von der Vorderseite (ventral) der Leber lassen sich vier Lappen unterscheiden: Lobus dexter, sinister, caudatus und quadratus.",
        answer: false,
        solution: "Von ventral sind nur zwei Lappen erkennbar: Lobus hepatis dexter und Lobus hepatis sinister. Diese werden durch das Ligamentum falciforme hepatis voneinander getrennt. Der Lobus caudatus und Lobus quadratus sind nur auf der visceralen (Rück-)Seite der Leber zu sehen — dort unterscheidet man insgesamt vier Lappen."
      },
      water: {
        statement: "An der Porta hepatis treten die Vena portae und die Arteria hepatica in die Leber ein; der Ductus hepaticus (Gallengang) verlässt dort die Leber; der Ductus hepaticus ist kein Gefäß, sondern der gemeinsame Zusammenschluss aller Gallenkanälchen.",
        answer: true,
        solution: "Die Porta hepatis liegt auf der visceralen Seite als Querverbindung in H-Form (zwischen zwei Furchen). Rechte Furche: vorne Gallenblase, hinten V. cava inferior. Linke Furche: Reste fetaler Gefäße. Die drei Strukturen der Porta hepatis: Vena portae (führt venöses Blut aus unpaaren Baucheingeweiden zur Leber), Arteria hepatica (vom Truncus coeliacus, arterielle Versorgung) und Ductus hepaticus (tritt aus — kein Gefäß im klassischen Sinne). Im Lobus dexter: Segmenta anterior + posterior; im Lobus sinister: Segmenta laterale + mediale."
      }
    },
    harvestQuestions: [
      {
        id: "leber_anatomie_makroskopie_h1",
        type: "mc",
        question: "Was ist das Ligamentum falciforme hepatis?",
        options: [
          { text: "Ein sichelförmiges Band, das die Leber ventral in rechten und linken Lappen teilt (war Ductus venosus)", correct: true },
          { text: "Ein rundes Band auf der Dorsalseite der Leber, das aus einem Nabelvenenstrang hervorgeht", correct: false },
          { text: "Der Schließmuskel am Gallengang", correct: false },
          { text: "Die bindegewebige Kapsel, die die gesamte Leber überzieht", correct: false }
        ],
        explanation: "Das Ligamentum falciforme hepatis (sichelförmiges Band) unterteilt die Leber von ventral in Lobus dexter und Lobus sinister. Entwicklungsgeschichtlich war es der Ductus venosus. Das Ligamentum teres hepatis (rundes Leberband) ist die dorsale Fortsetzung davon und geht aus dem Nabelvenenstrang hervor."
      },
      {
        id: "leber_anatomie_makroskopie_h2",
        type: "true_false",
        statement: "Die Leber wird bei tiefer Einatmung durch das Zwerchfell ca. 2 Querfinger nach unten gedrückt und beim Ausatmen wieder in die Ruhelage gebracht.",
        answer: true,
        explanation: "Die atembedingten Bewegungen des Zwerchfellmuskels wirken direkt auf die Leber, da diese im hinteren oberen Bereich mit dem Zwerchfell verwachsen ist. Eine gesunde Leber ist deshalb im ausgeatmeten Zustand unter dem rechten Rippenbogen tastbar."
      },
      {
        id: "leber_anatomie_makroskopie_h3",
        type: "mc",
        question: "Welche Struktur verlässt die Leber an der Porta hepatis?",
        options: [
          { text: "Der Ductus hepaticus (gemeinsamer Gallengang)", correct: true },
          { text: "Die Arteria hepatica", correct: false },
          { text: "Die Vena portae", correct: false },
          { text: "Der Ductus choledochus", correct: false }
        ],
        explanation: "An der Porta hepatis treten V. portae und A. hepatica in die Leber ein. Der Ductus hepaticus verlässt die Leber dort — er ist kein Gefäß, sondern der gemeinsame Zusammenschluss aller Gallenkanälchen, der später mit dem Ductus cysticus zum Ductus choledochus wird."
      },
      {
        id: "leber_anatomie_makroskopie_h4",
        type: "mc",
        question: "Wie viele Lappen sind auf der visceralen (Rück-)Seite der Leber unterscheidbar?",
        options: [
          { text: "Vier: Lobus dexter, sinister, caudatus und quadratus", correct: true },
          { text: "Zwei: Lobus dexter und sinister", correct: false },
          { text: "Drei: Lobus dexter, sinister und caudatus", correct: false },
          { text: "Sechs Segmente, keine Lappen", correct: false }
        ],
        explanation: "Auf der Facies visceralis unterscheidet man vier Lappen: Lobus hepatis dexter, sinister, Lobus caudatus (oben, rückseitig) und Lobus quadratus (unten, vorne). Von ventral sind hingegen nur zwei Lappen sichtbar."
      },
      {
        id: "leber_anatomie_makroskopie_h5",
        type: "true_false",
        statement: "Das Ligamentum teres hepatis (rundes Leberband) geht entwicklungsgeschichtlich aus einem Nabelvenenstrang hervor und liegt auf der dorsalen Seite der Leber.",
        answer: true,
        explanation: "Das Ligamentum teres hepatis ist die Fortsetzung des Ligamentum falciforme und liegt auf der Rückseite der Leber. Entwicklungsgeschichtlich ist es aus einem obliterierten Nabelvenenstrang hervorgegangen."
      }
    ],
    phase4Questions: [
      {
        id: "leber_anatomie_makroskopie_mc1",
        type: "mc",
        question: "Welche Aussagen zur Anatomie und Lage der Leber sind korrekt?",
        options: [
          { text: "Die Leber wiegt ca. 1,5 kg und hat Maße von ca. 23×18×9 cm", correct: true },
          { text: "Die Perfusion beträgt ca. 2 l/min — das gesamte Blut passiert die Leber in ca. 3 Minuten", correct: true },
          { text: "Das Ligamentum falciforme hepatis teilt die Leber ventral in linken und rechten Lappen", correct: true },
          { text: "Die Leber liegt im linken Oberbauch unterhalb der Milz", correct: false }
        ]
      },
      {
        id: "leber_anatomie_makroskopie_mc2",
        type: "mc",
        question: "Welche Aussagen zur Porta hepatis und den Lebersegmenten sind korrekt?",
        options: [
          { text: "Die Porta hepatis liegt auf der visceralen Seite und hat H-Form", correct: true },
          { text: "V. portae führt venöses Blut aus den unpaaren Baucheingeweiden zur Leber", correct: true },
          { text: "Lobus dexter enthält Segmenta anterior und posterior", correct: true },
          { text: "Der Ductus hepaticus tritt in die Leber ein (nicht aus)", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "leber_eiweissstoffwechsel",
    title: "Leber: Eiweißstoffwechsel, Plasmaproteine und Harnstoffzyklus",
    contextHint: "Studienbrief 1040 Leber – Eiweißstoffwechsel",
    phase1: {
      soil: {
        statement: "Die Leber synthetisiert fast alle Plasmaproteine: Albumin (mengenmäßig dominierend, volumenstabilisierender Effekt durch onkotischen Druck, Transport von Farbstoffen, freien Fettsäuren, Salzen, Hormonen und Pharmaka), Gerinnungsfaktoren (fast ausschließlich), Transferrin (Eisentransport) und CRP (Akute-Phase-Protein).",
        answer: true,
        solution: "Albumin ist das wichtigste Transportprotein im Blut und bindet nicht-wasserlösliche Substanzen aus dem Intestinalflüssigkeitsraum, die dann in der Leber durch Kopplung an Glucuronsäure oder Schwefelsäure wasserlöslich und ausscheidbar werden. Fibrinogen (Faktor I) wird im retikuloendothelialen System der Leber gebildet; Prothrombin (Faktor II) unter Einfluss von Vitamin K. Transferrin dient dem Eisentransport. Das CRP setzt humorale und zelluläre Abwehrprozesse in Gang. Weitere leberspezifische Enzyme: Plasmacholinesterase, AST/ASAT (= GOT), ALT/ALAT (= GPT), Alkalische Phosphatase (AP)."
      },
      seed: {
        statement: "Immunglobuline werden fast ausschließlich in der Leber gebildet und machen einen Großteil der Plasmaproteine aus.",
        answer: false,
        solution: "Immunglobuline werden in den lymphatischen Organen produziert — nicht in der Leber. Etwa ein Fünftel der Plasmaproteine sind Immunglobuline, die Aufgaben im Rahmen der spezifischen und unspezifischen Abwehr wahrnehmen. Alle anderen wichtigen Plasmaproteine (Albumin, Gerinnungsfaktoren, Transferrin, CRP, Lipoproteine) werden hingegen in der Leber synthetisiert."
      },
      water: {
        statement: "Im Harnstoffzyklus wandelt die Leber giftiges Ammoniak (Endprodukt des Eiweißabbaus durch Darmbakterien) in ungiftigen Harnstoff um, der dann über die Niere ausgeschieden wird; bei schweren Lebererkrankungen steigt der Ammoniakspiegel und verursacht hepatische Enzephalopathie.",
        answer: true,
        solution: "Ammoniak entsteht durch den Eiweißstoffwechsel und den bakteriellen Abbau von Aminosäuren im Darm. Es hat eine neurotoxische Wirkung und kann über die Blut-Hirn-Schranke ins ZNS gelangen. Die Harnstoffsynthese vollzieht sich fast ausschließlich in der Leber. Bei Leberversagen: Harnstoffsynthese ↓ → Ammoniak ↑ → hepatische Enzephalopathie. Die Gluconeogenese (Neubildung von Glucose aus Aminosäuren, z. B. bei Hungerstress) ist ebenfalls eine wichtige Funktion der Leber im Eiweißstoffwechsel."
      }
    },
    harvestQuestions: [
      {
        id: "leber_eiweissstoffwechsel_h1",
        type: "mc",
        question: "Welche Funktion hat Albumin im Körper?",
        options: [
          { text: "Volumenstabilisierung (onkotischer Druck) und Transport von Farbstoffen, freien Fettsäuren, Hormonen und Pharmaka", correct: true },
          { text: "Ausschließlich Eisentransport", correct: false },
          { text: "Synthese von Gerinnungsfaktoren", correct: false },
          { text: "Bildung von Immunglobulinen", correct: false }
        ],
        explanation: "Albumin ist das mengenmäßig dominierende Transportprotein im Blut. Es stabilisiert das Blutvolumen durch seinen onkotischen Druck und transportiert zahlreiche nicht-wasserlösliche Substanzen (Farbstoffe, freie Fettsäuren, Salze, Hormone, Pharmaka). Transferrin dient dem Eisentransport; Gerinnungsfaktoren werden ebenfalls in der Leber gebildet."
      },
      {
        id: "leber_eiweissstoffwechsel_h2",
        type: "true_false",
        statement: "Gerinnungsfaktoren (Fibrinogen als Faktor I und Prothrombin als Faktor II) werden fast ausschließlich in der Leber gebildet.",
        answer: true,
        explanation: "Fibrinogen (Faktor I) wird im retikuloendothelialen System der Leber gebildet. Prothrombin (Faktor II) entsteht in der Leber unter Einfluss von Vitamin K. Bei Lebererkrankungen ist daher häufig die Blutgerinnung beeinträchtigt."
      },
      {
        id: "leber_eiweissstoffwechsel_h3",
        type: "mc",
        question: "Was passiert bei schwerem Leberversagen mit dem Ammoniakstoffwechsel?",
        options: [
          { text: "Ammoniak kann nicht mehr zu Harnstoff umgewandelt werden → Ammoniak ↑ → hepatische Enzephalopathie", correct: true },
          { text: "Ammoniak wird vermehrt in den Muskeln abgebaut", correct: false },
          { text: "Ammoniak wird direkt über die Niere ausgeschieden ohne Umwandlung", correct: false },
          { text: "Die Niere übernimmt vollständig die Harnstoffsynthese", correct: false }
        ],
        explanation: "Der Harnstoffzyklus läuft fast ausschließlich in der Leber ab. Bei Leberversagen steigt der Ammoniakspiegel, da die Umwandlung zu Harnstoff nicht mehr gelingt. Ammoniak ist neurotoxisch, kann die Blut-Hirn-Schranke passieren und verursacht die hepatische Enzephalopathie."
      },
      {
        id: "leber_eiweissstoffwechsel_h4",
        type: "true_false",
        statement: "Immunglobuline werden fast ausschließlich in der Leber gebildet.",
        answer: false,
        explanation: "Immunglobuline werden in den lymphatischen Organen produziert, nicht in der Leber. Sie machen etwa ein Fünftel der Plasmaproteine aus und übernehmen Aufgaben der spezifischen und unspezifischen Abwehr. Alle anderen wichtigen Plasmaproteine (Albumin, Gerinnungsfaktoren, Transferrin, CRP) entstehen in der Leber."
      },
      {
        id: "leber_eiweissstoffwechsel_h5",
        type: "mc",
        question: "Welches Plasmaprotein dient dem Eisentransport im Blut?",
        options: [
          { text: "Transferrin", correct: true },
          { text: "Albumin", correct: false },
          { text: "Fibrinogen", correct: false },
          { text: "C-reaktives Protein (CRP)", correct: false }
        ],
        explanation: "Transferrin ist das spezifische Eisentransportprotein im Blut. Es wird in der Leber synthetisiert. Albumin transportiert zwar viele Substanzen (Farbstoffe, Fettsäuren, Hormone, Pharmaka), nicht aber primär Eisen. CRP ist ein Akute-Phase-Protein der Immunabwehr."
      }
    ],
    phase4Questions: [
      {
        id: "leber_eiweissstoffwechsel_mc1",
        type: "mc",
        question: "Welche Aussagen zur Eiweißsynthese der Leber sind korrekt?",
        options: [
          { text: "Albumin ist mengenmäßig dominierend und volumenstabilisierend (onkotischer Druck)", correct: true },
          { text: "Transferrin dient dem Eisentransport", correct: true },
          { text: "Gerinnungsfaktoren (Fibrinogen, Prothrombin) werden fast ausschließlich in der Leber gebildet", correct: true },
          { text: "Immunglobuline werden fast ausschließlich in der Leber gebildet", correct: false }
        ]
      },
      {
        id: "leber_eiweissstoffwechsel_mc2",
        type: "mc",
        question: "Welche Aussagen zum Harnstoffzyklus und Aminosäurestoffwechsel der Leber sind korrekt?",
        options: [
          { text: "Ammoniak (aus Eiweißstoffwechsel durch Darmbakterien) wird in der Leber zu Harnstoff umgewandelt", correct: true },
          { text: "Harnstoff wird über die Nieren ausgeschieden", correct: true },
          { text: "Bei schwerem Leberversagen steigt der Ammoniakspiegel → hepatische Enzephalopathie", correct: true },
          { text: "Ammoniak ist ungiftig und kann direkt über die Nieren ausgeschieden werden", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "leber_kh_fett_vitamine",
    title: "Leber: Kohlenhydrat-, Fett- und Vitaminstoffwechsel",
    contextHint: "Studienbrief 1040 Leber – KH, Fett, Vitamine",
    phase1: {
      soil: {
        statement: "Im Kohlenhydratstoffwechsel speichert die Leber Glucose als Glykogen und hält den Blutglukosespiegel konstant (80–180 mg/dl); stimuliert durch Adrenalin und Glukagon wird Glykogen abgebaut (Glykogenolyse); bei Hungerstress erfolgt die Gluconeogenese (Neubildung von Glucose aus Aminosäuren).",
        answer: true,
        solution: "Zu den Aufgaben der Leber im KH-Stoffwechsel gehören: Glykogenaufbau, Glykogenolyse, Gluconeogenese und der Aufbau von Fettsäuren (bei Glucoseüberschuss). Da Nervenzellen und Erythrozyten fortlaufend auf Glucose angewiesen sind, spielt die Leber als Glukosepuffer eine zentrale Rolle. Im Fettstoffwechsel: Neubildung von Triglyceriden, Umwandlung von Fettsäuren zu Ketonkörpern (bei Glukosemangel), Cholesterinsynthese (für Steroidhormone), Abbau von Steroidhormonen, Synthese von Serumliproteinen."
      },
      seed: {
        statement: "Ketonkörper werden ausschließlich in den Muskeln produziert und können vom Gehirn nicht als Energiequelle genutzt werden.",
        answer: false,
        solution: "Ketonkörper entstehen in der Leber aus Fettsäuren, wenn keine Glucose mehr verfügbar ist und die Glykogenspeicher geleert sind. Das Gehirn kann — neben Glucose — Ketonkörper als einzige alternative Energiequelle nutzen. Dies ist besonders bei Fasten oder ketogener Ernährung relevant. Die Muskeln können Ketonkörper ebenfalls verwerten, sind aber nicht der Produktionsort."
      },
      water: {
        statement: "Die Leber wandelt Carotin in Vitamin A um, aktiviert Vitamin D3 (Cholecalciferol) in seine wirksame Form (fördert Kalziumeinbau in Knochen), und synthetisiert unter Einfluss von Vitamin K das Prothrombin (Gerinnungsfaktor II); fettlösliche Vitamine (E, D, K, A) werden mithilfe von Gallenflüssigkeit resorbiert.",
        answer: true,
        solution: "Die Leber reguliert den gesamten Vitaminstoffwechsel: Carotin → Vitamin A (Umwandlung); Vitamin D3 wird teils in der Haut durch Sonnenlicht produziert oder mit der Nahrung aufgenommen → in der Leber in aktive Form umgewandelt → fördert Kalziumeinbau in Knochen und Kalziumaufnahme aus Darm; Vitamin K → Steigerung der Biosynthese des Prothrombins (Gerinnungsfaktor II). Vitamin A kann in der Leber gespeichert werden. Fettlösliche Vitamine (E, D, K, A) benötigen für ihre Resorption Gallenflüssigkeit."
      }
    },
    harvestQuestions: [
      {
        id: "leber_kh_fett_vitamine_h1",
        type: "mc",
        question: "In welcher Form speichert die Leber überschüssige Glucose?",
        options: [
          { text: "Als Glykogen (osmotisch inaktive Speicherform)", correct: true },
          { text: "Als Triglyceride", correct: false },
          { text: "Als Aminosäuren", correct: false },
          { text: "Als Ketonkörper", correct: false }
        ],
        explanation: "Glucose wird in der Leber (und in den Muskeln) als Glykogen gespeichert — osmotisch inaktiv. Bei Bedarf (stimuliert durch Adrenalin und Glukagon) wird Glykogen intrazellulär wieder zu Glucose umgebaut (Glykogenolyse). Die Leber hält damit den Blutglukosespiegel im Bereich von 80–180 mg/dl konstant."
      },
      {
        id: "leber_kh_fett_vitamine_h2",
        type: "true_false",
        statement: "Das Gehirn kann neben Glucose auch Ketonkörper als Energiequelle nutzen — Ketonkörper entstehen in der Leber aus Fettsäuren bei Glukosemangel.",
        answer: true,
        explanation: "Bei fettreicher Ernährung oder Fasten, wenn keine Glucose im Blut verfügbar ist und das Glykogen erschöpft ist, werden Fettsäuren in der Leber zu Ketonkörpern abgebaut. Das Gehirn kann diese Ketonkörper (neben Glucose) als alternative Energiequelle nutzen — ein einzigartiges Merkmal unter den Körperorganen."
      },
      {
        id: "leber_kh_fett_vitamine_h3",
        type: "mc",
        question: "Welche Funktion hat Vitamin K in der Leber?",
        options: [
          { text: "Förderung der Biosynthese von Prothrombin (Gerinnungsfaktor II)", correct: true },
          { text: "Aktivierung von Vitamin D3 in seine wirksame Form", correct: false },
          { text: "Umwandlung von Carotin in Vitamin A", correct: false },
          { text: "Speicherung von Eisen aus abgebauten Erythrozyten", correct: false }
        ],
        explanation: "Die biologisch wirksame Form des Vitamin K stimuliert in der Leber die Biosynthese des Prothrombins (Gerinnungsfaktor II). Vitamin D3 wird in der Leber in seine aktive Form umgewandelt (fördert Kalziumeinbau). Carotin → Vitamin A ist ebenfalls eine Leberaufgabe im Vitaminstoffwechsel."
      },
      {
        id: "leber_kh_fett_vitamine_h4",
        type: "mc",
        question: "Welche Hormone stimulieren den Abbau von Leberglykogen zu Glucose (Glykogenolyse)?",
        options: [
          { text: "Adrenalin und Glukagon", correct: true },
          { text: "Insulin und Cortisol", correct: false },
          { text: "Sekretin und Cholecystokinin", correct: false },
          { text: "Thyroxin und Somatostatin", correct: false }
        ],
        explanation: "Adrenalin und Glukagon (Gegenspielerhormon zu Insulin) stimulieren die Glykogenolyse — den Abbau von gespeichertem Glykogen zu Glucose. Insulin fördert dagegen den Glykogenaufbau. Dies dient der Konstanthaltung des Blutglukosespiegels."
      },
      {
        id: "leber_kh_fett_vitamine_h5",
        type: "true_false",
        statement: "Cholesterin kann in der Leber synthetisiert werden und dient als Ausgangsprodukt für Steroidhormone (Östrogen, Testosteron, Cortisol) sowie für Gallensäuren und Vitamin D.",
        answer: true,
        explanation: "Cholesterin wird entweder mit der Nahrung aufgenommen oder in der Leber hergestellt. Es ist Ausgangsstoff für: Steroidhormone (Östrogen, Testosteron, Glucocorticoide), Gallensäuren, Vitamin D und Zellmembranen. 90% der Gallensteine bestehen aus Cholesterin."
      }
    ],
    phase4Questions: [
      {
        id: "leber_kh_fett_vitamine_mc1",
        type: "mc",
        question: "Welche Aussagen zum Kohlenhydrat- und Fettstoffwechsel der Leber sind korrekt?",
        options: [
          { text: "Leber speichert Glucose als Glykogen und hält Blutglukose bei 80–180 mg/dl konstant", correct: true },
          { text: "Glykogenolyse (Glykogenabbau) wird durch Adrenalin und Glukagon stimuliert", correct: true },
          { text: "Ketonkörper entstehen in der Leber aus Fettsäuren bei Glukosemangel; Gehirn kann sie nutzen", correct: true },
          { text: "Muskeln sind der einzige Glykogenspeicher im Körper", correct: false }
        ]
      },
      {
        id: "leber_kh_fett_vitamine_mc2",
        type: "mc",
        question: "Welche Aussagen zum Vitaminstoffwechsel der Leber sind korrekt?",
        options: [
          { text: "Carotin wird in der Leber zu Vitamin A umgewandelt", correct: true },
          { text: "Vitamin D3 (Cholecalciferol) wird in der Leber in seine aktive Form umgewandelt", correct: true },
          { text: "Vitamin K fördert die Biosynthese von Prothrombin (Gerinnungsfaktor II) in der Leber", correct: true },
          { text: "Fettlösliche Vitamine (E, D, K, A) werden ohne Gallenflüssigkeit problemlos resorbiert", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "leber_entgiftung_kreislauffunktionen",
    title: "Leber: Entgiftung, Kreislauffunktionen und Gerinnungsfaktoren",
    contextHint: "Studienbrief 1040 Leber – Entgiftung und Kreislauffunktionen",
    phase1: {
      soil: {
        statement: "Die Leber entgiftet körperfremde und körpereigene Substanzen (Pharmaka, Alkohol, Steroidhormone) durch biochemischen Umbau — meist durch Bindung an Glucuronsäure — und ermöglicht ihre Ausscheidung über Niere oder Galle.",
        answer: true,
        solution: "Viele Substanzen, die im Stoffwechsel anfallen, sind nicht direkt ausscheidbar. Die Leber wandelt sie durch Konjugation (v. a. an Glucuronsäure oder Schwefelsäure) in wasserlösliche Formen um. Steroidhormone (Östrogen, Testosteron, Glucocorticoide, Mineralocorticoide) werden in der Leber inaktiviert; 40–70% werden über Niere und Darm ausgeschieden, der Rest zirkuliert im enterohepatischen Kreislauf. Bilirubin (aus überalterten Erythrozyten) muss ebenfalls erst konjugiert werden, bevor es ausgeschieden werden kann."
      },
      seed: {
        statement: "Die Leber übernimmt die Blutbildung (Hämatopoese) dauerhaft im Erwachsenenalter als Hauptorgan.",
        answer: false,
        solution: "Die Blutbildung (Hämatopoese) in der Leber findet hauptsächlich in der Embryonalzeit statt. Im Erwachsenenalter übernimmt das Knochenmark diese Funktion. Nur wenn das Knochenmark geschädigt ist, kann die Leber diese Aufgabe wieder wahrnehmen (extramedulläre Hämatopoese). Im Erwachsenenalter ist die Leber hingegen für die Blutmauserung (Abbau überalterter Erythrozyten nach 100–120 Tagen durch Kupffer-Zellen) und als Blutspeicher zuständig."
      },
      water: {
        statement: "Die Leber synthetisiert wichtige Gerinnungsfaktoren: Fibrinogen (Faktor I) im retikuloendothelialen System und Prothrombin (Faktor II) unter Einfluss von Vitamin K; außerdem speichert sie Eisen aus dem Abbau überalterter Erythrozyten.",
        answer: true,
        solution: "Kreislauffunktionen der Leber: Blutspeicher (kann erhebliche Mengen Blut aufnehmen), Blutbildung (Embryonalzeit + bei Knochenmarkschädigung), Blutmauserung (überalterte Erythrozyten nach 100–120 Tagen → Kupffer-Zellen phagozy-tieren sie in Lebersinusoiden), Eisenspeicher (aus zerstörten Erythrozyten; Eisen → an Globuline gebunden → Leber → für neue Hämoglobinsynthese oder gespeichert), Synthese von Gerinnungsfaktoren (Fibrinogen Faktor I, Prothrombin Faktor II unter Vitamin K)."
      }
    },
    harvestQuestions: [
      {
        id: "leber_entgiftung_kreislauffunktionen_h1",
        type: "mc",
        question: "Durch welchen chemischen Prozess macht die Leber nicht-wasserlösliche Substanzen für die Ausscheidung verfügbar?",
        options: [
          { text: "Durch Konjugation, meist durch Bindung an Glucuronsäure oder Schwefelsäure", correct: true },
          { text: "Durch Oxidation in den Mitochondrien", correct: false },
          { text: "Durch Phagozytose in den Kupffer-Zellen", correct: false },
          { text: "Durch enzymatische Spaltung in den Gallenkanälchen", correct: false }
        ],
        explanation: "Die Entgiftungsfunktion der Leber beruht hauptsächlich auf der Konjugation der Substanzen — meist durch Bindung an Glucuronsäure oder Schwefelsäure. Dies macht lipidlösliche (toxische) Substanzen wasserlöslich und ermöglicht ihre renale oder biliäre Ausscheidung. So werden z. B. Pharmaka, Alkohol, Bilirubin und Steroidhormone entgiftet."
      },
      {
        id: "leber_entgiftung_kreislauffunktionen_h2",
        type: "true_false",
        statement: "Überalterte Erythrozyten (nach ca. 100–120 Tagen) werden in den Lebersinusoiden durch Kupffer-Zellen (Makrophagen) phagozytiert und abgebaut.",
        answer: true,
        explanation: "Dieser Vorgang wird als Blutmauserung bezeichnet. Die Kupffer-Zellen (sternförmige Makrophagen in den Sinusoidwänden) erkennen und phagozytieren die funktionsuntüchtigen Erythrozyten. Das dabei freiwerdende Eisen wird an Globuline gebunden, zur Leber transportiert und für die Neubildung von Hämoglobin genutzt oder gespeichert."
      },
      {
        id: "leber_entgiftung_kreislauffunktionen_h3",
        type: "mc",
        question: "Wann übernimmt die Leber die Blutbildung (Hämatopoese) im menschlichen Körper?",
        options: [
          { text: "Hauptsächlich in der Embryonalzeit; im Erwachsenenalter nur bei Knochenmarkschädigung", correct: true },
          { text: "Dauerhaft als Hauptorgan der Blutbildung im Erwachsenenalter", correct: false },
          { text: "Nur in der Kindheit bis zur Pubertät", correct: false },
          { text: "Niemals — die Leber ist nicht an der Blutbildung beteiligt", correct: false }
        ],
        explanation: "In der Embryonalzeit ist die Leber das Hauptorgan der Blutbildung. Nach der Geburt übernimmt das Knochenmark diese Funktion. Wenn das Knochenmark zu späteren Zeitpunkten geschädigt ist, kann die Leber die Hämatopoese erneut wahrnehmen (extramedulläre Hämatopoese)."
      },
      {
        id: "leber_entgiftung_kreislauffunktionen_h4",
        type: "true_false",
        statement: "Fibrinogen (Gerinnungsfaktor I) wird im retikuloendothelialen System der Leber gebildet; Prothrombin (Faktor II) entsteht in der Leber unter Einfluss von Vitamin K.",
        answer: true,
        explanation: "Die Leber synthetisiert fast alle Gerinnungsfaktoren. Fibrinogen (Faktor I) entsteht im retikuloendothelialen System der Leber. Prothrombin (Faktor II) wird unter Einfluss von Vitamin K in der Leber gebildet. Bei schweren Lebererkrankungen ist daher die Blutgerinnung erheblich beeinträchtigt."
      },
      {
        id: "leber_entgiftung_kreislauffunktionen_h5",
        type: "mc",
        question: "Was passiert mit dem Eisen, das beim Abbau überalterter Erythrozyten freigesetzt wird?",
        options: [
          { text: "Es wird an Globuline gebunden, zur Leber transportiert und für neue Hämoglobinsynthese genutzt oder gespeichert", correct: true },
          { text: "Es wird direkt mit dem Urin ausgeschieden", correct: false },
          { text: "Es wird in der Gallenblase als Gallenstein abgelagert", correct: false },
          { text: "Es wird in der Milz dauerhaft gespeichert", correct: false }
        ],
        explanation: "Bei der Blutmauserung wird das Hämoglobin gespalten: Das Globin wird phagozytiert; das Eisen (aus dem Häm-Teil) wird an Globuline (v. a. Transferrin) gebunden und zur Leber transportiert, wo es entweder direkt für die Bildung neuen Hämoglobins verwendet oder als Reserveeisen gespeichert wird."
      }
    ],
    phase4Questions: [
      {
        id: "leber_entgiftung_kreislauffunktionen_mc1",
        type: "mc",
        question: "Welche Aussagen zur Entgiftungsfunktion der Leber sind korrekt?",
        options: [
          { text: "Pharmaka, Alkohol und Steroidhormone werden in der Leber durch Konjugation (v. a. Glucuronsäure) entgiftet", correct: true },
          { text: "Die Konjugation macht lipidlösliche Substanzen wasserlöslich und ermöglicht ihre Ausscheidung", correct: true },
          { text: "40–70% der inaktivierten Steroidhormone werden über Niere und Darm ausgeschieden", correct: true },
          { text: "Die Entgiftung findet ausschließlich in den Kupffer-Zellen statt", correct: false }
        ]
      },
      {
        id: "leber_entgiftung_kreislauffunktionen_mc2",
        type: "mc",
        question: "Welche Aussagen zu den Kreislauffunktionen der Leber sind korrekt?",
        options: [
          { text: "Die Leber dient als Blutspeicher und kann erhebliche Mengen Blut aufnehmen", correct: true },
          { text: "Kupffer-Zellen phagozytieren überalterte Erythrozyten (Blutmauserung) in den Sinusoiden", correct: true },
          { text: "Fibrinogen (Faktor I) und Prothrombin (Faktor II) werden in der Leber synthetisiert", correct: true },
          { text: "Die Leber ist im Erwachsenenalter das Hauptorgan der Blutbildung", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "leber_mikrostruktur_sinusoide",
    title: "Leber: Mikrostruktur, Sinusoide, Kupffer-Zellen und Laborwerte",
    contextHint: "Studienbrief 1040 Leber – Leberläppchen, Sinusoide, Laborwerte",
    phase1: {
      soil: {
        statement: "Das Leberläppchen (Lobulus hepatis) ist die kleinste funktionelle Einheit der Leber; es hat eine nahezu sechseckige Form (1,0–1,3 mm breit, 2 mm hoch); in den dreieckigen Bindegewebsfeldern zwischen den Läppchen liegt die Glisson-Trias: Ast der Leberarterie (A. interlobularis), Ast der Pfortader (V. interlobularis) und Gallenausgang (Ductus biliferus interlobularis).",
        answer: true,
        solution: "Das gesamte Lebergewebe besteht aus Tausenden dieser birnenförmigen Läppchen. Die Leberzellbalken sind radiär zur Zentralvene angeordnete Reihen von Hepatozyten. Die Glisson-Kapsel ist die bindegewebige Kapsel über der gesamten Leber (nach dem Peritoneum). Hepatozyten haben: einen Kern (10% des Zellvolumens), granulä+agranuläres ER (Proteinsynthese + Stoffwechsel/Entgiftung), Golgi-Apparat (Konzentration von Ausscheidungsprodukten), über 1000 Mitochondrien/Leberzelle (hohe Stoffwechselaktivität), Mikrosomen (Zerlegung großer chemischer Verbindungen, Gallensäurenausscheidung)."
      },
      seed: {
        statement: "Kupffer-Zellen sind spezialisierte Hepatozyten, die Glykogen speichern und an der Proteinbiosynthese beteiligt sind.",
        answer: false,
        solution: "Kupffer-Zellen (früher: Kupffer'sche Sternzellen) sind sternförmige Makrophagen in den Sinusoidwänden — keine Hepatozyten. Sie gehören zum Retikuloendothelialen System (RES) und erfüllen folgende Funktionen: Phagozytose überalterter Erythrozyten (Blutmauserung), Immunabwehr (frühzeitige Eliminierung von Fremdstoffen durch Phagozytose) und Entlastung der Leber. Sie liegen teils zwischen, teils auf den Endothelzellen der Sinusoide."
      },
      water: {
        statement: "Die Sinusoide sind weitläufige Blutkapillaren zwischen den Leberzellreihen ohne Basalmembran (Gitterfasernetz mit Poren/Fensterung), in denen sich arterielles und venöses Blut vermischt; Lebererkrankungen gehen häufig mit erhöhten Transaminasen einher (AST/ASAT = GOT; ALT/ALAT = GPT); Gamma-GT reagiert sensibler auf Leber- und Gallenwegserkrankungen als Aminotransferasen.",
        answer: true,
        solution: "Sinusoide haben keine Basalmembran als plastisches Skelett, sondern ein Gitterfasernetz; die innere Auskleidung bilden Endothelzellen mit zahlreichen Poren (Fensterung). Zwischen den Sinusoiden und dem Interzellularraum wird Gallenflüssigkeit filtriert. Wichtige Leberwerte: AST/ASAT (GOT) und ALT/ALAT (GPT) als Transaminasen; gamma-GT = Gama-Glutamyl-Transferase (sensibler, immer erhöht bei alkoholischem Schaden); LDH = Laktatdehydrogenase; GLDH = Glutamatdehydrogenase. Bei Durchblutungsstörung der Leber: Transaminasen auf 50–200-faches des Normwerts."
      }
    },
    harvestQuestions: [
      {
        id: "leber_mikrostruktur_sinusoide_h1",
        type: "mc",
        question: "Aus welchen drei Strukturen besteht die Glisson-Trias (periportale Trias)?",
        options: [
          { text: "Ast der Leberarterie + Ast der Pfortader + Gallenausgang (in dreieckigen Bindegewebsfeldern)", correct: true },
          { text: "Zentralvene + Leberarterie + Gallenblase", correct: false },
          { text: "Kupffer-Zellen + Hepatozyten + Sinusoide", correct: false },
          { text: "V. cava + Pfortader + Ductus choledochus", correct: false }
        ],
        explanation: "In den mikroskopisch sichtbaren dreieckigen Bindegewebsfeldern zwischen den Leberläppchen liegt jeweils die Glisson-Trias (periportale Trias): ein Ast der Leberarterie (A. interlobularis), ein Ast der Pfortader (V. interlobularis) und ein Gallenausgang (Ductus biliferus interlobularis). Diese Anordnung ist charakteristisch für die Leberarchitektur."
      },
      {
        id: "leber_mikrostruktur_sinusoide_h2",
        type: "true_false",
        statement: "Die Sinusoide haben keine echte Basalmembran, sondern ein Gitterfasernetz mit Poren (Fensterung), durch das arterielles und venöses Blut gemischt fließt.",
        answer: true,
        explanation: "Die Sinusoide sind weitläufige Blutkapillaren in den Zwischenräumen zwischen den Leberzellreihen. Sie haben statt einer Basalmembran ein Gitterfasernetz mit zahlreichen Poren (Fensterung). Dort vermischt sich arterielles Blut (A. hepatica) mit venösem Blut (V. portae). Zwischen Sinusoiden und Interzellularraum wird Gallenflüssigkeit filtriert."
      },
      {
        id: "leber_mikrostruktur_sinusoide_h3",
        type: "mc",
        question: "Welche Funktionen erfüllen die Kupffer-Zellen in den Sinusoiden?",
        options: [
          { text: "Phagozytose überalterter Erythrozyten (Blutmauserung) und Immunabwehr (RES)", correct: true },
          { text: "Synthese von Albumin und Gerinnungsfaktoren", correct: false },
          { text: "Produktion von Gallensäuren", correct: false },
          { text: "Speicherung von Glykogen", correct: false }
        ],
        explanation: "Kupffer-Zellen (sternförmige Makrophagen) gehören zum Retikuloendothelialen System (RES). Sie dienen der Immunabwehr durch frühzeitige Eliminierung von Fremdstoffen (Phagozytose) und der Blutmauserung (Phagozytose überalterter Erythrozyten nach 100–120 Tagen). Sie sind keine Hepatozyten."
      },
      {
        id: "leber_mikrostruktur_sinusoide_h4",
        type: "true_false",
        statement: "Leberzellen (Hepatozyten) besitzen über 1000 Mitochondrien pro Zelle — Ausdruck der hohen Stoffwechselaktivität der Leber.",
        answer: true,
        explanation: "Da die Leber eine enorm hohe Stoffwechselaktivität aufweist, findet man in den Hepatozyten eine besonders große Anzahl an Mitochondrien (über 1000 je Leberzelle). Mitochondrien sind die Energiegewinnungszentren der Zelle. Mikrosomen (weitere Organellen der Hepatozyten) dienen der Zerlegung großer chemischer Verbindungen und der Ausscheidung von Gallensäuren."
      },
      {
        id: "leber_mikrostruktur_sinusoide_h5",
        type: "mc",
        question: "Welcher Leberwert reagiert sensibler auf Erkrankungen der Leber und Gallenwege als die Aminotransferasen?",
        options: [
          { text: "Gamma-GT (Gama-Glutamyl-Transferase)", correct: true },
          { text: "LDH (Laktatdehydrogenase)", correct: false },
          { text: "AST/ASAT (GOT)", correct: false },
          { text: "Transferrin", correct: false }
        ],
        explanation: "Die Gamma-GT reagiert sensibler auf Erkrankungen der Leber und Gallenwege als die Aminotransferasen (AST/ASAT, ALT/ALAT). Sie ist immer erhöht bei alkoholischem Leberschaden. Differenzialdiagnostisch kann man anhand der Blutwerte einen alkoholischen Leberschaden von einer Cholestase oder Leberzirrhose unterscheiden. Bei Durchblutungsstörung: Transaminasen steigen auf das 50–200-fache des Normwerts."
      }
    ],
    phase4Questions: [
      {
        id: "leber_mikrostruktur_sinusoide_mc1",
        type: "mc",
        question: "Welche Aussagen zur Mikrostruktur der Leber sind korrekt?",
        options: [
          { text: "Das Leberläppchen ist die kleinste funktionelle Einheit, nahezu sechseckig, 1,0–1,3 mm breit", correct: true },
          { text: "Die Glisson-Trias besteht aus Ast der Leberarterie, Ast der Pfortader und Gallengang", correct: true },
          { text: "Hepatozyten haben >1000 Mitochondrien (hohe Stoffwechselaktivität)", correct: true },
          { text: "Kupffer-Zellen sind spezialisierte Hepatozyten für die Glykogenspeicherung", correct: false }
        ]
      },
      {
        id: "leber_mikrostruktur_sinusoide_mc2",
        type: "mc",
        question: "Welche Aussagen zu Laborwerten bei Lebererkrankungen sind korrekt?",
        options: [
          { text: "AST/ASAT (früher GOT) und ALT/ALAT (früher GPT) sind Aminotransferasen der Leber", correct: true },
          { text: "Gamma-GT reagiert sensibler auf Leber- und Gallenwegserkrankungen als Aminotransferasen", correct: true },
          { text: "Bei Durchblutungsstörung steigen Transaminasen auf das 50–200-fache des Normwerts", correct: true },
          { text: "Ein erhöhter Gamma-GT-Wert schließt alkoholischen Leberschaden aus", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "leber_kreislaeufe_pfortader",
    title: "Leber: Ernährungskreislauf, Pfortaderkreislauf und First-Pass-Effect",
    contextHint: "Studienbrief 1040 Leber – Kreisläufe und Pfortader",
    phase1: {
      soil: {
        statement: "Die Leber hat zwei Kreisläufe: den Ernährungskreislauf (A. hepatica → sauerstoffreiches Blut, 25%) und den Pfortaderkreislauf (V. portae → venöses Blut aus Magen, Dünn-/Dickdarm, Pankreas und Milz, 75%); beide Blutströme vereinigen sich in den Sinusoiden.",
        answer: true,
        solution: "Ernährungskreislauf: A. hepatica → A. interlobulares → Arteriolae interlobularis → Kapillaren des Leberstromas + Sinusoide → Venolae interlobulares → Venae interlobulares → 3–5 Lebervenen → V. cava inferior. Pfortaderkreislauf: V. portae sammelt venöses Blut aus unpaaren Baucheingeweiden (Magen, Dünn+Dickdarm, oberem Rektum, Pankreas, Milz) → in Leber verzweigt gemeinsam mit A. hepatica → Sinusoide → Zentralvene → V. hepatica → V. cava inferior. Das Pfortaderblut enthält Zucker, Aminosäuren, Hormone, Medikamente und andere Substanzen aus der Verdauung."
      },
      seed: {
        statement: "Der First-Pass-Effect bezeichnet die Abschwächung intravenös verabreichter Medikamente in der Niere.",
        answer: false,
        solution: "Der First-Pass-Effect findet in der Leber statt, nicht in der Niere — und betrifft ausschließlich oral (nicht intravenös) eingenommene Medikamente. Oral aufgenommene Medikamente werden nach der Resorption über die Pfortader zur Leber geleitet, wo sie ganz oder teilweise abgebaut und in ihrer Wirkung abgeschwächt werden können. Intravenös verabreichte Medikamente umgehen diesen Effekt, da sie die Leber erst nach Verteilung im Körper erreichen."
      },
      water: {
        statement: "Die Leber wird zu 25% durch sauerstoffreiches Blut der A. hepatica und zu 75% durch Pfortaderblut (V. portae) versorgt; Nährstoffe für die Hepatozyten kommen hauptsächlich aus dem nährstoffreichen Pfortaderblut.",
        answer: true,
        solution: "Blut aus A. hepatica und V. portae gelangt zusammen in die Sinusoide (weite Kapillaren), von dort in die V. hepatica und schließlich in die V. cava inferior. Die Leberarterie transportiert sauerstoffreiches Blut vom Herzen; die Pfortader liefert nährstoffreiches Blut aus Magen und Darm. Dabei wird die Leber sowohl mit sauerstoffreichem Blut (25%) als auch mit Pfortaderblut (75%) versorgt. Die Nährstoffzufuhr für die Leberzellen geschieht aus dem nährstoffreichen Blut der Pfortader."
      }
    },
    harvestQuestions: [
      {
        id: "leber_kreislaeufe_pfortader_h1",
        type: "mc",
        question: "Wie verteilt sich die Blutversorgung der Leber auf Leberarterie und Pfortader?",
        options: [
          { text: "Ca. 25% arteriell (A. hepatica) + ca. 75% venös (V. portae)", correct: true },
          { text: "Ca. 75% arteriell + ca. 25% über Pfortader", correct: false },
          { text: "Ca. 50% arteriell + ca. 50% über Pfortader", correct: false },
          { text: "Ausschließlich über die Leberarterie", correct: false }
        ],
        explanation: "Die Leber ist das einzige Organ mit zwei zuführenden Blutgefäßen: Die A. hepatica liefert 25% sauerstoffreiches Blut; die V. portae liefert 75% venöses, nährstoffreiches Blut aus den unpaaren Bauchorganen. Beide vereinigen sich in den Sinusoiden."
      },
      {
        id: "leber_kreislaeufe_pfortader_h2",
        type: "true_false",
        statement: "Der First-Pass-Effect bedeutet, dass oral eingenommene Medikamente nach Resorption über die Pfortader zur Leber geleitet und dort ganz oder teilweise abgebaut werden können — ihre Wirkung wird dadurch abgeschwächt.",
        answer: true,
        explanation: "Oral aufgenommene Medikamente werden im Darm resorbiert und gelangen über die Pfortader direkt zur Leber, bevor sie in den großen Kreislauf eintreten. Die Leber kann Medikamente durch Leberpassage ganz oder teilweise abbauen (First-Pass-Effect). Intravenöse Gabe umgeht diesen Effekt vollständig."
      },
      {
        id: "leber_kreislaeufe_pfortader_h3",
        type: "mc",
        question: "Aus welchen Organen sammelt die Pfortader (V. portae) venöses Blut?",
        options: [
          { text: "Aus Magen, Dünn- und Dickdarm, oberem Rektum, Pankreas und Milz", correct: true },
          { text: "Aus Herz, Lunge und Nieren", correct: false },
          { text: "Ausschließlich aus dem Dünndarm", correct: false },
          { text: "Aus Nieren, Nebennieren und Harnblase", correct: false }
        ],
        explanation: "Die V. portae sammelt venöses Blut aus den unpaaren Baucheingeweiden: Magen, Dünn- und Dickdarm, oberem Anteil des Rektums sowie Pankreas und Milz. Dieses Blut enthält resorbierte Nährstoffe, Hormone, Medikamente und sonstige Substanzen aus dem Verdauungskanal."
      },
      {
        id: "leber_kreislaeufe_pfortader_h4",
        type: "mc",
        question: "Wohin fließt das Blut nach Passage der Lebersinusoide?",
        options: [
          { text: "Über die Zentralvene → V. hepatica → V. cava inferior", correct: true },
          { text: "Direkt zurück in die V. portae", correct: false },
          { text: "Über die A. hepatica in den Körperkreislauf", correct: false },
          { text: "Direkt in den Ductus hepaticus", correct: false }
        ],
        explanation: "Das Blut fließt aus den Sinusoiden → Zentralvene → Läppchenvenen (3–5 Lebervenen) → V. hepatica → V. cava inferior. Dieser Weg gilt für beide Kreisläufe (Ernährungs- und Pfortaderkreislauf), die sich in den Sinusoiden vereinigen."
      },
      {
        id: "leber_kreislaeufe_pfortader_h5",
        type: "true_false",
        statement: "Die Nährstoffzufuhr für die Hepatozyten erfolgt hauptsächlich aus dem nährstoffreichen Pfortaderblut, nicht aus dem arteriellen Blut.",
        answer: true,
        explanation: "Obwohl die A. hepatica sauerstoffreiches Blut liefert, kommen die Nährstoffe für die Leberzellen hauptsächlich aus dem Pfortaderblut, das resorbierte Zucker, Aminosäuren und Fette aus dem Verdauungskanal enthält. Das arterielle Blut der Leberarterie dient primär der Sauerstoffversorgung."
      }
    ],
    phase4Questions: [
      {
        id: "leber_kreislaeufe_pfortader_mc1",
        type: "mc",
        question: "Welche Aussagen zu den Kreisläufen der Leber sind korrekt?",
        options: [
          { text: "Ernährungskreislauf: A. hepatica → sauerstoffreiches Blut (25%)", correct: true },
          { text: "Pfortaderkreislauf: V. portae → venöses Blut aus Bauchorganen (75%)", correct: true },
          { text: "Blut beider Kreisläufe vereinigt sich in den Sinusoiden", correct: true },
          { text: "Die Leber wird zu 75% arteriell und zu 25% über die Pfortader versorgt", correct: false }
        ]
      },
      {
        id: "leber_kreislaeufe_pfortader_mc2",
        type: "mc",
        question: "Welche Aussagen zum Pfortaderkreislauf und First-Pass-Effect sind korrekt?",
        options: [
          { text: "V. portae bringt Blut aus Magen, Dünn-/Dickdarm, Pankreas und Milz", correct: true },
          { text: "First-Pass-Effect: oral eingenommene Medikamente werden in der Leber (teil)abgebaut", correct: true },
          { text: "Blut aus Sinusoiden → Zentralvene → V. hepatica → V. cava inferior", correct: true },
          { text: "Der First-Pass-Effect tritt ausschließlich bei intravenöser Medikamentengabe auf", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "gallenblase_gallenwege",
    title: "Gallenblase und Gallenwege: Anatomie, Aufbau und Steuerung",
    contextHint: "Studienbrief 1040 Gallenblase – Anatomie und Gallenwege",
    phase1: {
      soil: {
        statement: "Die Gallenblase (Vesica fellea) ist birnenförmig, 7–10 cm lang, 4–5 cm breit, Fassungsvermögen 35–50 ml; sie konzentriert die kontinuierlich von der Leber produzierte Gallenflüssigkeit durch aktiven Transport von Na⁺ und Cl⁻ (Wasser folgt passiv) auf 1/5 bis 1/10 des ursprünglichen Volumens.",
        answer: true,
        solution: "Die Leber produziert unabhängig von der Nahrungsaufnahme kontinuierlich ca. 0,5–1 L Gallenflüssigkeit täglich. Die Gallenblase speichert und konzentriert diese zwischen den Mahlzeiten. Aufbau der Gallenblase: Fundus vesicae felleae (oben), Corpus vesicae felleae (Mitte, Hauptabschnitt), Collum vesicae felleae (zugespitzt unten, geht in Ductus cysticus über). Innenschicht (Tunica mucosa): einschichtiges hohes Epithel mit Mikrovilli + Becherzellen (Schleim schützt vor Galle). Füllung der Gallenblase: durch Rückstau bei geschlossenem Sphincter ampullae."
      },
      seed: {
        statement: "Die Gallenblase produziert selbst kontinuierlich Gallenflüssigkeit und gibt diese direkt in den Dünndarm ab.",
        answer: false,
        solution: "Die Gallenflüssigkeit wird ausschließlich von der Leber produziert (kontinuierlich, 0,5–1 L/Tag). Die Gallenblase speichert und konzentriert sie nur (auf 1/5 bis 1/10). Die Abgabe der Galle in den Darm erfolgt bei Bedarf: hormonell durch CCK (bei fett-/proteinreicher Nahrung → Kontraktion der Gallenblase) und reflektorisch (Geruchs-, Geschmacks- und Bittstoffreize)."
      },
      water: {
        statement: "Die extrahepatischen Gallenwege verlaufen: Ductus hepaticus dexter + sinister → Ductus hepaticus communis → (Ductus cysticus zur Gallenblase) → Ductus choledochus (6–8 cm) → mündet gemeinsam mit dem Ductus pancreaticus an der Papilla vateri ins Duodenum; der M. sphincter Oddi (unwillkürlich) kontrolliert den Ausfluss.",
        answer: true,
        solution: "Intrahepatische Gallenwege: beginnen als kleinste Gallenröhrchen zwischen Leberzellen → vereinigen sich zu größeren Gängen → Ductus hepaticus dexter + sinister an der Leberpforte. Extrahepatische Gallenwege: Ductus hepaticus communis (2–5 cm, 4 mm weit) + Ductus cysticus (2–2,5 cm, Gallenblasengang) → ab Abgang des Ductus cysticus: Ductus choledochus (= Gallengang; 6–8 cm, 5–6 mm weit) → durchsetzt Duodenalwand → Papilla vateri (Papilla duodeni major) → Duodenum. M. sphincter Oddi verhindert Eindringen von Darminhalt in Gallenwege, kann aber Einklemmung von Gallensteinen verursachen."
      }
    },
    harvestQuestions: [
      {
        id: "gallenblase_gallenwege_h1",
        type: "mc",
        question: "Durch welchen Mechanismus wird die Gallenflüssigkeit in der Gallenblase eingedickt?",
        options: [
          { text: "Aktiver Transport von Na⁺ und Cl⁻; Wasser folgt passiv nach → auf 1/5 bis 1/10 eingedickt", correct: true },
          { text: "Enzymatischer Abbau von Wasser durch Lipase", correct: false },
          { text: "Passive Diffusion von Gallensäuren gegen einen Konzentrationsgradienten", correct: false },
          { text: "Filtration durch die Gallenblasenwand unter Druckeinwirkung", correct: false }
        ],
        explanation: "Die Eindickung der Gallenflüssigkeit in der Gallenblase erfolgt durch aktiven Transport von Na⁺ und Cl⁻ aus dem Lumen; Wasser folgt diesem osmotischen Gradienten passiv nach. Dadurch kann die Gallenflüssigkeit auf ein Fünftel bis ein Zehntel ihres ursprünglichen Volumens konzentriert werden — die Konzentration von Gallensäuren, Gallenfarbstoffen und Cholesterin steigt entsprechend."
      },
      {
        id: "gallenblase_gallenwege_h2",
        type: "true_false",
        statement: "Die Abgabe der Gallenflüssigkeit aus der Gallenblase wird hauptsächlich durch CCK (Cholecystokinin) ausgelöst, das bei fett- und proteinreicher Nahrungsaufnahme ausgeschüttet wird.",
        answer: true,
        explanation: "CCK (Cholecystokinin) ist das wichtigste Hormon für die Gallenblasenkontrakion. Es wird bei fett- und proteinreicher Nahrungsaufnahme ausgeschüttet und löst die Kontraktion der Gallenblase und gleichzeitig die Enzymanreicherung des Pankreassafts aus. Zusätzlich gibt es eine reflektorische Steuerung durch Geruchs-, Geschmacks- und Bitterstoffreize."
      },
      {
        id: "gallenblase_gallenwege_h3",
        type: "mc",
        question: "Welcher Gang führt von der Gallenblase zum gemeinsamen Gallengang?",
        options: [
          { text: "Ductus cysticus (Gallenblasengang)", correct: true },
          { text: "Ductus hepaticus communis", correct: false },
          { text: "Ductus pancreaticus", correct: false },
          { text: "Ductus choledochus", correct: false }
        ],
        explanation: "Der Ductus cysticus (Gallenblasengang, 2–2,5 cm) verbindet die Gallenblase mit dem Ductus hepaticus communis. Ab dieser Vereinigung heißt der Gang Ductus choledochus. Der Ductus choledochus (6–8 cm) mündet dann gemeinsam mit dem Ductus pancreaticus an der Papilla vateri ins Duodenum."
      },
      {
        id: "gallenblase_gallenwege_h4",
        type: "mc",
        question: "An welcher anatomischen Stelle münden Ductus choledochus und Ductus pancreaticus gemeinsam ins Duodenum?",
        options: [
          { text: "Papilla vateri (Papilla duodeni major)", correct: true },
          { text: "Papilla duodeni minor", correct: false },
          { text: "Pylorus des Magens", correct: false },
          { text: "Sphincter Oddi", correct: false }
        ],
        explanation: "Die Papilla vateri (Papilla duodeni major) ist die papillenförmige Erhebung im absteigenden Teil des Duodenums, an der Ductus choledochus und Ductus pancreaticus gemeinsam einmünden. Der M. sphincter Oddi (unwillkürlicher Schließmuskel) kontrolliert den Zufluss und verhindert das Eindringen von Darminhalt in die Gallenwege."
      },
      {
        id: "gallenblase_gallenwege_h5",
        type: "true_false",
        statement: "Die Gallenblase liegt im hinteren unteren Bereich der Leber, ragt über den unteren Leberrand hinaus und ist in der rechten Grube der Leberunterseite zu finden (Vesica fellea).",
        answer: true,
        explanation: "Die Gallenblase (Vesica fellea) liegt im hinteren, unteren Bereich der Leber — in der rechten Grube der Leberunterseite — und ragt über den unteren Leberrand hinaus. Im Bereich der Porta hepatis ist sie durch feste Bindegewebszüge an der Leberunterseite fixiert. Ihre Außenfläche wird größtenteils vom Bauchfell überzogen."
      }
    ],
    phase4Questions: [
      {
        id: "gallenblase_gallenwege_mc1",
        type: "mc",
        question: "Welche Aussagen zur Gallenblase sind korrekt?",
        options: [
          { text: "Gallenblase: 7–10 cm lang, 4–5 cm breit, Fassungsvermögen 35–50 ml", correct: true },
          { text: "Eindicken der Galle auf 1/5–1/10 durch aktiven Na⁺/Cl⁻-Transport", correct: true },
          { text: "Abgabe der Galle: hormonell (CCK) + reflektorisch (Geruchs-/Geschmacksreize)", correct: true },
          { text: "Die Gallenblase produziert selbst kontinuierlich Gallenflüssigkeit", correct: false }
        ]
      },
      {
        id: "gallenblase_gallenwege_mc2",
        type: "mc",
        question: "Welche Aussagen zu den extrahepatischen Gallenwegen sind korrekt?",
        options: [
          { text: "Ductus hepaticus dexter + sinister → Ductus hepaticus communis", correct: true },
          { text: "Ductus cysticus verbindet Gallenblase mit Ductus choledochus", correct: true },
          { text: "Ductus choledochus + Ductus pancreaticus münden an Papilla vateri ins Duodenum", correct: true },
          { text: "Der M. sphincter Oddi ist ein willkürlicher Schließmuskel", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "gallenflüssigkeit_enterohepatisch",
    title: "Gallenflüssigkeit: Zusammensetzung und enterohepatischer Kreislauf",
    contextHint: "Studienbrief 1040 Gallenblase – Gallenflüssigkeit und enterohepatischer Kreislauf",
    phase1: {
      soil: {
        statement: "Die Gallenflüssigkeit enthält ca. 90% Wasser sowie Gallensäuren (synthetisiert aus Cholesterin; 2 primäre: Cholsäure + Chenodesoxycholsäure; Emulgatoren für Fette, aktivieren Lipasen), Bilirubin/Biliverdin, Cholesterin, Phospholipide, Lecithin, Hormone-Abbauprodukte und Pharmaka.",
        answer: true,
        solution: "Lebergalle (gelb): Wasser 95–98 g/dl, Gallensalze 1,1 g/dl, Bilirubin 0,2 g/dl, Cholesterin 0,1 g/dl; pH 7,8–8,6. Blasengalle (grün-braun, 1/5–1/10 eingedickt): höhere Konzentrationen aller Inhaltsstoffe. Gallensäuren sind ampiphil (lipophile + hydrophile Seite) und lagern sich an Fette an → Emulsion → Lipase-Angriffsfläche. Gallensekretion wird gefördert durch: erhöhte Leberdurchblutung, Vagusreiz, erhöhte Gallensalzkonzentration im Blut, Sekretin und CCK. Phospholipide: hauptsächlich in der Leber synthetisiert; Transport und Aufnahme von Cholesterin. Pharmaka (große Arzneimittelmoleküle) und Antibiotika werden hauptsächlich biliär ausgeschieden."
      },
      seed: {
        statement: "90% der Gallensteine bestehen aus Phospholipiden; Cholesterin spielt bei der Gallensteinbildung keine wesentliche Rolle.",
        answer: false,
        solution: "90% der Gallensteine bestehen aus Cholesterin und nur 10% aus Calciumbilirubinat. Cholesterin ist für die Gallensteinbildung von zentraler Bedeutung. Das Verhältnis zwischen Cholesterin, Phospholipiden und Lecithin in der Galle ist fein aufeinander abgestimmt — bei Abweichungen kommt es zur Auskristallisierung des Cholesterins, was eine Gallensteinbildung zur Folge hat. Auch bei der Bildung von Zellmembranen, Gallensäuren, Vitamin D und Steroidhormonen spielt Cholesterin eine zentrale Rolle."
      },
      water: {
        statement: "Im enterohepatischen Kreislauf zirkulieren Gallensäuren (Pool 2–4 g) täglich 8–10× zwischen Leber und Darm; ca. 90% werden im terminalen Ileum rückresorbiert; bei Ileum-Erkrankung entsteht chologen Diarrhö mit Fettverdauungsstörungen und Mangel an fettlöslichen Vitaminen.",
        answer: true,
        solution: "Enterohepatischer Kreislauf: Gallensäuren aus Leber → Galle → Darm → zu 90% im terminalen Ileum rückresorbiert → über Pfortader zurück in die Leber. Ca. 0,6 g täglich neu gebildet; ca. die gleiche Menge mit dem Stuhl ausgeschieden. Vitamin B12 unterliegt ebenfalls dem enterohepatischen Kreislauf. Pathologisch: bei Erkrankung/Resektion des terminalen Ileums → Gallensäuren nicht rückresorbierbar → gelangen in Dickdarm → osmotisch → chologen Diarrhö; Fettverdauungsstörungen; fettlösliche Vitamine nur noch unzureichend resorbiert."
      }
    },
    harvestQuestions: [
      {
        id: "gallenflüssigkeit_enterohepatisch_h1",
        type: "mc",
        question: "Woraus werden Gallensäuren in der Leber synthetisiert?",
        options: [
          { text: "Aus Cholesterin; die 2 primären Gallensäuren sind Cholsäure und Chenodesoxycholsäure", correct: true },
          { text: "Aus Bilirubin und Albumin", correct: false },
          { text: "Aus Glykogen und Aminosäuren", correct: false },
          { text: "Aus Phospholipiden und Harnstoff", correct: false }
        ],
        explanation: "Gallensäuren werden in der Leber aus Cholesterin synthetisiert. Es gibt insgesamt vier verschiedene Gallensäuren — die beiden primären sind Cholsäure und Chenodesoxycholsäure. Sie liegen in der Galle als gallensaure Salze (Natrium- und Kaliumsalze) vor und wirken als Emulgatoren für Fette im Dünndarm."
      },
      {
        id: "gallenflüssigkeit_enterohepatisch_h2",
        type: "true_false",
        statement: "Im enterohepatischen Kreislauf werden ca. 90% aller Gallensäuren im terminalen Ileum rückresorbiert und gelangen über die Pfortader zurück zur Leber.",
        answer: true,
        explanation: "Der Gallensäurepool beträgt ca. 2–4 g und wird täglich 8–10× zwischen Leber und Darm zirkuliert. 90% werden im Endabschnitt des Ileums rückresorbiert → Pfortader → Leber. Nur ca. 0,6 g/24h werden neu synthetisiert; ungefähr die gleiche Menge wird mit dem Stuhl ausgeschieden."
      },
      {
        id: "gallenflüssigkeit_enterohepatisch_h3",
        type: "mc",
        question: "Was passiert bei Erkrankung oder Resektion des terminalen Ileums in Bezug auf die Gallensäuren?",
        options: [
          { text: "Gallensäuren können nicht rückresorbiert werden → chologen Diarrhö + Fettverdauungsstörungen + Mangel fettlöslicher Vitamine", correct: true },
          { text: "Gallensäuren werden vollständig im Dickdarm resorbiert", correct: false },
          { text: "Die Leber produziert kompensatorisch keine Gallensäuren mehr", correct: false },
          { text: "Nur Vitamin B12-Resorption ist betroffen, die Fettverdauung bleibt intakt", correct: false }
        ],
        explanation: "Das terminale Ileum ist der einzige Ort, wo Gallensäuren rückresorbiert werden können. Bei Erkrankung oder Resektion fehlt diese Möglichkeit → Gallensäuren gelangen in den Dickdarm → osmotische Wirkung → chologen Diarrhö. Durch den Mangel an Gallensäuren entstehen Fettverdauungsstörungen, und fettlösliche Vitamine (E, D, K, A) werden nur noch unzureichend resorbiert."
      },
      {
        id: "gallenflüssigkeit_enterohepatisch_h4",
        type: "mc",
        question: "Woraus bestehen die meisten Gallensteine?",
        options: [
          { text: "Zu 90% aus Cholesterin und zu 10% aus Calciumbilirubinat", correct: true },
          { text: "Zu 90% aus Phospholipiden", correct: false },
          { text: "Zu 90% aus Gallensäuren", correct: false },
          { text: "Ausschließlich aus Bilirubin", correct: false }
        ],
        explanation: "Die meisten Gallensteine (ca. 90%) bestehen aus Cholesterin. Nur ca. 10% sind Pigmentsteine aus Calciumbilirubinat. Cholesterin ist normalerweise in der Galle in Lösung gehalten durch das abgestimmte Verhältnis mit Phospholipiden und Lecithin. Bei Abweichungen kristallisiert Cholesterin aus → Gallensteinbildung."
      },
      {
        id: "gallenflüssigkeit_enterohepatisch_h5",
        type: "true_false",
        statement: "Gallensäuren emulgieren Fette im Dünndarm (Öl-Wasser-Emulsion), bieten Lipasen eine große Angriffsfläche und aktivieren Lipasen.",
        answer: true,
        explanation: "Gallensäuren sind ampiphil: lipophile Seite lagert sich an Fette an, hydrophile Seite zeigt nach außen → Bildung einer Emulsion. Die kleinen Fetttröpfchen bieten Lipasen (Pankreaslipase) eine vergrößerte Angriffsfläche. Gallensäuren aktivieren außerdem Lipasen direkt. Dies ist die Voraussetzung für eine effektive Fettresorption im Dünndarm."
      }
    ],
    phase4Questions: [
      {
        id: "gallenflüssigkeit_enterohepatisch_mc1",
        type: "mc",
        question: "Welche Aussagen zur Gallenflüssigkeit sind korrekt?",
        options: [
          { text: "Gallensäuren werden aus Cholesterin synthetisiert und emulgieren Fette im Dünndarm", correct: true },
          { text: "Gallensteine bestehen zu 90% aus Cholesterin und zu 10% aus Calciumbilirubinat", correct: true },
          { text: "Lebergalle ist gelb, Blasengalle ist grün-braun und stärker konzentriert", correct: true },
          { text: "Gallenflüssigkeit enthält hauptsächlich Enzyme zur Fettverdauung", correct: false }
        ]
      },
      {
        id: "gallenflüssigkeit_enterohepatisch_mc2",
        type: "mc",
        question: "Welche Aussagen zum enterohepatischen Kreislauf sind korrekt?",
        options: [
          { text: "Gallensäurepool ca. 2–4 g, wird 8–10× täglich zwischen Leber und Darm zirkuliert", correct: true },
          { text: "Ca. 90% der Gallensäuren werden im terminalen Ileum rückresorbiert", correct: true },
          { text: "Bei Ileum-Resektion entstehen chologen Diarrhö und Fettverdauungsstörungen", correct: true },
          { text: "Der enterohepatische Kreislauf betrifft ausschließlich Bilirubin", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "bilirubin_stoffwechsel",
    title: "Bilirubin: Entstehung, Konjugation und Ausscheidung",
    contextHint: "Studienbrief 1040 Gallenblase – Bilirubin",
    phase1: {
      soil: {
        statement: "Bilirubin entsteht aus dem Hämoglobin überalterter Erythrozyten (Lebensdauer 100–120 Tage): Häm → Biliverdin → Bilirubin (ca. 35 mg pro 1 g Hämoglobin); tägliche Bilirubinausscheidung: 200–250 mg; Sterkobilin (aus Bilirubin) gibt dem Stuhl seine braune Farbe, Urobilin dem Harn seine gelbe Farbe.",
        answer: true,
        solution: "Erythrozyten werden in Kapillargefäßen der Leber, der Milz, im Knochenmark und in Makrophagen abgebaut. Hämoglobin → Globin (phagozytiert) + Häm. Eisen aus Häm → an Globuline gebunden → Leber (für neue Hb-Synthese oder gespeichert). Häm → Biliverdin → Bilirubin. Im Darm: Bakterien bauen Bilirubin zu Urobilinogen/Sterkobilinogen ab (farblos). Nach Oxidation → Urobilin (gelb, Harn) + Sterkobilin (braun, Stuhl). 15% des ausgeschiedenen Bilirubins wird unkonjugiert wieder resorbiert (enterohepatischer Kreislauf)."
      },
      seed: {
        statement: "Indirektes (freies) Bilirubin ist wasserlöslich und wird direkt über die Niere ausgeschieden.",
        answer: false,
        solution: "Indirektes (freies, unkunjugiertes) Bilirubin ist wasserunlöslich, lipidlöslich und toxisch. Wegen seiner Wasserunlöslichkeit kann es nicht über die Niere ausgeschieden werden. Im Blutplasma wird es reversibel an Albumin gebunden. In der Leber wird es durch Glucuronyltransferase mit Glucuronsäure konjugiert → direktes (konjugiertes) Bilirubin → wasserlöslich → aktiv in Gallenkapillaren sezerniert → mit der Galle ausgeschieden. Beim Neugeborenen kann indirektes Bilirubin die Blut-Liquor-Schranke passieren → Kernikterus."
      },
      water: {
        statement: "In der Leber wird indirektes Bilirubin durch Glucuronyltransferase mit Glucuronsäure zu direktem (konjugiertem) Bilirubin umgewandelt — dieser Prozess macht es wasserlöslich und ermöglicht die Ausscheidung mit der Galle; beim Neugeborenen kann indirektes Bilirubin die Blut-Liquor-Schranke passieren und Kernikterus verursachen.",
        answer: true,
        solution: "Der physiologische Gesamt-Bilirubingehalt des Plasmas beträgt 0,1–1,2 mg/dl. Steigt er über 1,2 mg/dl → zuerst Gelbfärbung der Augenbindehäute, dann der Haut (Ikterus). Direktes Bilirubin (konjugiert, wasserlöslich): wird aktiv in Gallenkapillaren sezerniert → Galle → Darm → bakteriell zu Sterkobilinogen/Urobilinogen abgebaut → größtenteils Sterkobilin (Stuhl) + Urobilin (Harn). Indirektes Bilirubin (lipophil) kann bei hoher Konzentration die Epithelschranken passieren, beim Neugeborenen auch die Blut-Liquor-Schranke → Kernikterus (ZNS-Schädigung)."
      }
    },
    harvestQuestions: [
      {
        id: "bilirubin_stoffwechsel_h1",
        type: "mc",
        question: "In welcher Form liegt Bilirubin im Blutplasma vor, bevor es die Leber zur Konjugation erreicht?",
        options: [
          { text: "Wasserunlöslich, an Albumin gebunden (indirektes Bilirubin)", correct: true },
          { text: "Wasserlöslich, frei im Plasma gelöst", correct: false },
          { text: "Konjugiert an Glucuronsäure", correct: false },
          { text: "Als Urobilinogen", correct: false }
        ],
        explanation: "Indirektes (freies) Bilirubin ist wasserunlöslich und toxisch. Da es nicht im Plasma gelöst werden kann, wird es reversibel an Albumin gebunden und so zur Leber transportiert. In der Leber erfolgt dann die Konjugation mit Glucuronsäure → direktes (wasserlösliches) Bilirubin → biliäre Ausscheidung."
      },
      {
        id: "bilirubin_stoffwechsel_h2",
        type: "true_false",
        statement: "Direktes (konjugiertes) Bilirubin entsteht durch Konjugation mit Glucuronsäure in der Leber und ist wasserlöslich — es wird aktiv in die Gallenkapillaren sezerniert.",
        answer: true,
        explanation: "In den Leberzellen wird indirektes Bilirubin mithilfe von Glucuronyltransferase und Glucuronsäure (unter Verwendung von Glucose und ATP) konjugiert → direktes Bilirubin. Es ist wasserlöslich, nicht mehr toxisch und wird aktiv in die Gallenkapillaren sezerniert und mit der Galle in den Darm ausgeschieden."
      },
      {
        id: "bilirubin_stoffwechsel_h3",
        type: "mc",
        question: "Was gibt dem Stuhl seine braune Farbe?",
        options: [
          { text: "Sterkobilin (Abbauprodukt des Bilirubins durch Darmbakterien)", correct: true },
          { text: "Urobilin", correct: false },
          { text: "Biliverdin", correct: false },
          { text: "Gallensäuren", correct: false }
        ],
        explanation: "Bilirubin gelangt mit der Galle in den Darm. Dort bauen Bakterien es zu Sterkobilinogen und Urobilinogen ab (beide farblos). Nach Oxidation entstehen: Sterkobilin (braun → gibt dem Stuhl seine Farbe) und Urobilin (gelb → gibt dem Harn seine Farbe). Spuren von Urobilinogen werden mit dem Harn ausgeschieden."
      },
      {
        id: "bilirubin_stoffwechsel_h4",
        type: "mc",
        question: "Welcher Gesamt-Bilirubinwert im Plasma ist physiologisch, und ab wann entsteht ein Ikterus?",
        options: [
          { text: "Physiologisch: 0,1–1,2 mg/dl; Ikterus ab >1,2 mg/dl (zuerst Augenbindehäute, dann Haut)", correct: true },
          { text: "Physiologisch: 0–0,5 mg/dl; Ikterus ab >0,5 mg/dl", correct: false },
          { text: "Physiologisch: 2–5 mg/dl; Ikterus ab >5 mg/dl", correct: false },
          { text: "Es gibt keinen Normalwert — jedes Bilirubin im Blut ist pathologisch", correct: false }
        ],
        explanation: "Der physiologische Gesamt-Bilirubingehalt des Plasmas beträgt 0,1–1,2 mg/dl. Steigt er über 1,2 mg/dl, tritt Bilirubin ins Gewebe über: zuerst färben sich die Augenbindehäute (Skleren) gelb, dann die Haut. Diese Gelbfärbung wird als Ikterus (Gelbsucht) bezeichnet."
      },
      {
        id: "bilirubin_stoffwechsel_h5",
        type: "true_false",
        statement: "Indirektes Bilirubin kann beim Neugeborenen die Blut-Liquor-Schranke passieren und zum Kernikterus (ZNS-Schädigung) führen.",
        answer: true,
        explanation: "Indirektes (unkonjugiertes) Bilirubin ist lipidlöslich und kann lipophile Barrieren passieren. Bei Erwachsenen ist die Blut-Hirn-Schranke resistent, beim Neugeborenen jedoch noch durchlässig. Bei erhöhtem indirektem Bilirubin beim Neugeborenen (z. B. Rhesusunverträglichkeit, Neugeborenengelbsucht) besteht die Gefahr des Kernikterus — einer irreversiblen ZNS-Schädigung durch Bilirubinablagerung im Gehirn."
      }
    ],
    phase4Questions: [
      {
        id: "bilirubin_stoffwechsel_mc1",
        type: "mc",
        question: "Welche Aussagen zum Bilirubinstoffwechsel sind korrekt?",
        options: [
          { text: "Bilirubin entsteht aus Hämoglobin überalterter Erythrozyten (Lebensdauer 100–120 Tage)", correct: true },
          { text: "Indirektes Bilirubin ist wasserunlöslich, toxisch und an Albumin gebunden", correct: true },
          { text: "In der Leber wird indirektes Bilirubin durch Glucuronyltransferase konjugiert → direktes Bilirubin", correct: true },
          { text: "Indirektes Bilirubin ist wasserlöslich und wird direkt renal ausgeschieden", correct: false }
        ]
      },
      {
        id: "bilirubin_stoffwechsel_mc2",
        type: "mc",
        question: "Welche Aussagen zu den Abbauprodukten des Bilirubins sind korrekt?",
        options: [
          { text: "Sterkobilin gibt dem Stuhl seine braune Farbe", correct: true },
          { text: "Urobilin gibt dem Harn seine gelbe Farbe", correct: true },
          { text: "1 g Hämoglobin ergibt ca. 35 mg Bilirubin", correct: true },
          { text: "Direktes Bilirubin entsteht durch bakteriellen Abbau im Dickdarm", correct: false }
        ]
      }
    ]
  }),

  makeDetailedPlant({
    id: "ikterus_formen",
    title: "Ikterus: Drei Formen, Ursachen und Differenzialdiagnose",
    contextHint: "Studienbrief 1040 Gallenblase – Ikterus",
    phase1: {
      soil: {
        statement: "Ikterus (Gelbsucht) ist ein Symptom — keine eigenständige Krankheit — und bezeichnet die Gelbfärbung von Haut, Schleimhaut und Skleren durch Bilirubinablagerung im Gewebe; er tritt ab einem Gesamt-Bilirubin >1,2 mg/dl auf; es gibt drei Formen: prähepatisch, intrahepatisch und posthepatisch.",
        answer: true,
        solution: "Prähepatischer Ikterus (Hämolytischer/Überproduktionsikterus): Ursache Hämolyse → vermehrter Hämoglobinanfall → Überlastung des Glucuronidierungssystems → indirektes Bilirubin stark erhöht; Stuhl dunkel/normal; Urin hell, Urobilinogen stark erhöht; LDH erhöht, Retikulozytose, Haptoglobin erniedrigt. Intrahepatischer Ikterus (Parenchymikterus): Schädigung der Leberzellen (Hepatitis, Leberzirrhose) → Mangel an Glucuronyltransferase → unvollständige Konjugation → beide Bilirubin-Arten leicht erhöht; Stuhl hell; Urin bierbraun; ALT(GPT) stark erhöht, AST(GOT) erhöht. Posthepatischer Ikterus (Verschlussikterus): Verlegung der Gallenwege (Cholestase durch Gallensteine=Cholelithiasis, Tumore, Pankreatitis) → Rückstau konjugierten Bilirubins → direktes Bilirubin stark erhöht; Stuhl hell; Urin bierbraun, Bilirubin stark erhöht; Gamma-GT, AP, LAP stark erhöht."
      },
      seed: {
        statement: "Beim posthepatischen Ikterus ist hauptsächlich das indirekte (unkunjugierte) Bilirubin im Serum stark erhöht.",
        answer: false,
        solution: "Beim posthepatischen Ikterus (Verschlussikterus) ist das direkte (konjugierte) Bilirubin stark erhöht — nicht das indirekte. Ursache ist eine Verlegung der Gallenwege (Cholestase), z. B. durch Gallensteine oder Tumore. Das bereits in der Leber konjugierte (direkte) Bilirubin kann nicht abfließen → staut sich zurück → tritt ins Blut über → stark erhöhtes direktes Bilirubin. Das indirekte Bilirubin ist beim posthepatischen Ikterus im Normbereich (o.B.)."
      },
      water: {
        statement: "Differenzialdiagnostisch unterscheiden sich die drei Ikterusformen deutlich: prähepatisch zeigt hellen Urin + dunklen Stuhl + indirektes Bilirubin↑; intrahepatisch zeigt bierbraunen Urin + hellen Stuhl + beide Bilirubin-Arten↑ + ALT stark↑; posthepatisch zeigt bierbraunen Urin + hellen Stuhl + direktes Bilirubin↑ + Gamma-GT/AP stark↑.",
        answer: true,
        solution: "Übersicht Differenzialdiagnose Ikterus: Prähepatisch: Serum (indirektes Bili stark↑, direktes o.B.), Urin (hell/normal, Urobilinogen stark↑, Bilirubin o.B.), Stuhl (dunkel/normal), Labor (LDH↑, Retikulozytose, Haptoglobin↓). Intrahepatisch: Serum (beide leicht↑), Urin (bierbraun, beide leicht↑), Stuhl (hell), Labor (ALT stark↑, AST↑). Posthepatisch: Serum (direktes stark↑, indirektes o.B.), Urin (bierbraun, Bilirubin stark↑, Urobilinogen o.B.), Stuhl (hell), Labor (Gamma-GT, AP, LAP stark↑)."
      }
    },
    harvestQuestions: [
      {
        id: "ikterus_formen_h1",
        type: "mc",
        question: "Was ist die Ursache des prähepatischen Ikterus?",
        options: [
          { text: "Hämolyse (gesteigerter Erythrozytenabbau) → Überproduktion von Bilirubin → Überlastung des Glucuronidierungssystems", correct: true },
          { text: "Schädigung der Leberzellen durch Hepatitis oder Zirrhose", correct: false },
          { text: "Verlegung der Gallenwege durch Gallensteine (Cholelithiasis)", correct: false },
          { text: "Mangel an Glucuronyltransferase durch genetischen Defekt", correct: false }
        ],
        explanation: "Beim prähepatischen Ikterus (Hämolytischer/Überproduktionsikterus) kommt es durch gesteigertem Erythrozytenabbau (Hämolyse) zu einem vermehrten Hämoglobinanfall → Überproduktion von indirektem Bilirubin → das Glucuronidierungssystem der Leber wird überlastet → indirektes Bilirubin steigt stark an."
      },
      {
        id: "ikterus_formen_h2",
        type: "true_false",
        statement: "Beim posthepatischen Ikterus ist direktes (konjugiertes) Bilirubin im Serum stark erhöht, da es wegen einer Gallenwegverlegung nicht abfließen kann.",
        answer: true,
        explanation: "Der posthepatische Ikterus (Verschlussikterus) entsteht durch Verlegung der Gallenwege (Cholestase) — z. B. durch Gallensteine (Cholelithiasis), Tumore, Pankreatitis. Das konjugierte (direkte) Bilirubin staut sich zurück → tritt ins Blut über → stark erhöhtes direktes Bilirubin. Typisch: Gamma-GT, AP und LAP stark erhöht; Stuhl hell; Urin bierbraun mit stark erhöhtem Bilirubin."
      },
      {
        id: "ikterus_formen_h3",
        type: "mc",
        question: "Welche Laborwerte sind beim posthepatischen (Verschluss-)Ikterus typisch stark erhöht?",
        options: [
          { text: "Gamma-GT, Alkalische Phosphatase (AP) und LAP", correct: true },
          { text: "ALT (GPT) und AST (GOT)", correct: false },
          { text: "LDH und Haptoglobin", correct: false },
          { text: "Indirektes Bilirubin und Urobilinogen", correct: false }
        ],
        explanation: "Beim posthepatischen Ikterus sind cholestaseanzeigenden Enzyme stark erhöht: Gamma-GT, AP (Alkalische Phosphatase) und LAP (Leucin-Aminopeptidase). Die Aminotransferasen (ALT/GPT, AST/GOT) sind hingegen typisch für den intrahepatischen Ikterus erhöht. LDH und Retikulozytose sind Hinweise auf den prähepatischen (hämolytischen) Ikterus."
      },
      {
        id: "ikterus_formen_h4",
        type: "mc",
        question: "Wie sieht der Stuhl beim posthepatischen Ikterus aus und warum?",
        options: [
          { text: "Hell — weil kein Bilirubin (und damit kein Sterkobilin) in den Darm gelangt", correct: true },
          { text: "Dunkel — wegen stark erhöhtem direkten Bilirubin", correct: false },
          { text: "Dunkelrot — wegen Blutbeimengungen aus den Gallenwegen", correct: false },
          { text: "Schwarz — wegen Ablagerung von Eisen", correct: false }
        ],
        explanation: "Beim posthepatischen Ikterus ist die Gallenwegverlegung (Cholestase) die Ursache: Bilirubin kann nicht in den Darm gelangen → kein Sterkobilinogen → kein Sterkobilin → Stuhl wird hell (acholisch). Sowohl beim intrahepatischen als auch beim posthepatischen Ikterus ist der Stuhl hell; nur beim prähepatischen Ikterus ist der Stuhl dunkel/normal (viel Sterkobilin)."
      },
      {
        id: "ikterus_formen_h5",
        type: "true_false",
        statement: "Ikterus ist keine eigenständige Krankheit, sondern ein Symptom der Gelbfärbung von Haut, Schleimhaut und Skleren durch Bilirubinablagerung im Gewebe.",
        answer: true,
        explanation: "Ikterus (Gelbsucht) ist immer ein Symptom — kein eigenständiges Krankheitsbild. Er kann auf sehr unterschiedliche Ursachen hinweisen: gesteigerten Erythrozytenabbau (prähepatisch), Leberzellschädigung (intrahepatisch) oder Gallenwegverlegung (posthepatisch). Die Ursachenklärung erfordert die Differenzialdiagnose anhand von Laborwerten, Stuhl- und Urinbefund."
      }
    ],
    phase4Questions: [
      {
        id: "ikterus_formen_mc1",
        type: "mc",
        question: "Welche Aussagen zum prähepatischen Ikterus sind korrekt?",
        options: [
          { text: "Ursache: Hämolyse → vermehrter Hämoglobinanfall → Überlastung des Glucuronidierungssystems", correct: true },
          { text: "Serum: indirektes Bilirubin stark erhöht, direktes Bilirubin im Normbereich (o.B.)", correct: true },
          { text: "Urin: stark erhöhtes Urobilinogen, helle/normale Farbe", correct: true },
          { text: "Beim prähepatischen Ikterus ist direktes Bilirubin im Serum stark erhöht", correct: false }
        ]
      },
      {
        id: "ikterus_formen_mc2",
        type: "mc",
        question: "Welche Aussagen zu den drei Ikterusformen sind korrekt?",
        options: [
          { text: "Intrahepatischer Ikterus: ALT(GPT) stark erhöht, beide Bilirubin-Arten leicht erhöht, Stuhl hell", correct: true },
          { text: "Posthepatischer Ikterus: direktes Bilirubin stark↑, Gamma-GT + AP stark↑, Stuhl hell", correct: true },
          { text: "Beim posthepatischen Ikterus ist die Ursache eine Verlegung der Gallenwege (Cholestase)", correct: true },
          { text: "Beim prähepatischen Ikterus ist der Stuhl hell und das Urobilinogen im Urin normal", correct: false }
        ]
      }
    ]
  })

];
