// Neue Pflanzen für 1047 – Kap. 8.1–8.9: Diät bei Erkrankungen
// Gap: Kap. 8 (Magen/Darm/Zöliakie/Leber/Galle/Pankreas/Diabetes/Niere/Herz-Kreislauf/Gicht) fehlt komplett

  makeDetailedPlant({
    id: "1047_07",
    title: "Diät bei Erkrankungen I: Magen, Darm, Leber, Galle, Pankreas",
    contextHint: "Kap. 8.1–8.5 – Magenerkrankungen (Alkohol/Kaffee/Rauchen meiden); Zöliakie (Autoimmun, Gluten = Weizen/Roggen/Gerste/Hafer/Dinkel/Emmer/Einkorn/Grünkern/Triticale); Lebererkrankungen (keine Leberdiät, kein Alkohol); akute Pankreatitis (7 Stufen, MCT)",
    phase1: {
      soil: {
        statement: "Zöliakie ist eine Nahrungsmittelunverträglichkeit gegen das Klebereiweiß Gluten; Patienten müssen u. a. Weizen, Roggen, Gerste, Hafer, Dinkel, Emmer, Einkorn, Grünkern und Triticale meiden.",
        answer: false,
        solution: "Zöliakie ist KEINE Nahrungsmittelunverträglichkeit, sondern eine Autoimmunerkrankung. Das Immunsystem reagiert auf Gluten mit einer Entzündung der Dünndarmschleimhaut → Atrophie der Dünndarmzotten → Malabsorption. Die Liste der zu meidenden Getreide ist korrekt."
      },
      seed: {
        statement: "Bei Lebererkrankungen gilt heute die Empfehlung einer vollwertigen Mischkost; absolute Kontraindikation ist Alkohol, und es gibt keine spezielle Leberdiät.",
        answer: true,
        solution: "Früher wurde streng fett- und eiweißarme Schonkost empfohlen – heute vollwertige Mischkost mit Milch-/Sauermilchprodukten, Kartoffeln, Gemüse, Vollkornprodukten und Pflanzenölen. Alkohol ist absolut verboten. 5 kleinere Mahlzeiten sind bekömmlicher als 3 große."
      },
      water: {
        statement: "Bei akuter Pankreatitis beginnt der Kostaufbau sofort mit leichter Vollkost, da die Bauchspeicheldrüse nicht weiter gereizt werden darf.",
        answer: false,
        solution: "Bei akuter Pankreatitis darf der Patient WEDER essen noch trinken (Sekretionsstopp). Der Flüssigkeitsbedarf wird über Infusionen gedeckt. Stufenweiser Aufbau: Stufe 1 = Infusionstherapie → Stufe 2 = ungesüßter Tee → Stufe 3 = Tee + Traubenzucker → Stufe 4 = KH → Stufe 5 = KH + Eiweiß, fettarm → Stufe 6 = Fett langsam zugeben → Stufe 7 = leichte Vollkost."
      }
    },
    harvestQuestions: [
      {
        id: "1047_07_h1",
        type: "mc",
        question: "Welches der folgenden Getreide darf ein Zöliakie-Patient bedenkenlos essen?",
        options: [
          { text: "Mais (glutenfrei)", correct: true },
          { text: "Dinkel", correct: false },
          { text: "Emmer", correct: false },
          { text: "Triticale", correct: false }
        ],
        explanation: "Zöliakie-Patienten müssen alle glutenhaltigen Getreide meiden: Weizen, Roggen, Gerste, Hafer, Dinkel, Emmer, Einkorn, Grünkern, Triticale. Mais, Reis, Buchweizen, Hirse und Quinoa sind glutenfrei und erlaubt."
      },
      {
        id: "1047_07_h2",
        type: "true_false",
        statement: "Zöliakie ist eine Autoimmunerkrankung, bei der das Klebereiweiß Gluten eine Entzündung der Dünndarmschleimhaut auslöst.",
        answer: true,
        explanation: "Korrekt. Das Immunsystem reagiert auf Gluten (in Getreide) mit einer überschießenden Immunantwort → Entzündung + Atrophie der Dünndarmzotten → Malabsorption und Mangelernährung. Keine NMU, sondern eine Autoimmunerkrankung."
      },
      {
        id: "1047_07_h3",
        type: "mc",
        question: "Wie viele Stufen umfasst der Kostaufbau nach akuter Pankreatitis?",
        options: [
          { text: "7 Stufen (von Infusion bis leichte Vollkost)", correct: true },
          { text: "3 Stufen (Tee, Brei, Vollkost)", correct: false },
          { text: "5 Stufen (Infusion, Tee, KH, Eiweiß, Fett)", correct: false },
          { text: "4 Stufen (Fasten, Tee, Schonkost, Vollkost)", correct: false }
        ],
        explanation: "7 Stufen: 1. Infusionstherapie, 2. ungesüßter Tee, 3. Tee + Traubenzucker, 4. KH, 5. KH + Eiweiß fettarm, 6. Fett langsam zugeben (zunächst 10 g/Tag), 7. leichte Vollkost. Alkohol ist grundsätzlich verboten."
      },
      {
        id: "1047_07_h4",
        type: "true_false",
        statement: "Bei Gallenwegserkrankungen empfiehlt man heute wie bei Lebererkrankungen eine vollwertige leichte Kost mit maximal 40 g Fett pro Tag.",
        answer: true,
        explanation: "Korrekt. Nach dem Abklingen der akuten Entzündung gilt dieselbe Empfehlung wie bei Lebererkrankungen. Max. 40 g Fett/Tag, mageres Fleisch/Fisch gedünstet, zarte Gemüse. Was die Leber verträgt, bekommt auch der Galle."
      },
      {
        id: "1047_07_h5",
        type: "mc",
        question: "Was ist das oberste Gebot bei der Ernährung von Patienten mit Lebererkrankungen?",
        options: [
          { text: "Kein Alkohol", correct: true },
          { text: "Streng eiweißarme Kost", correct: false },
          { text: "Kein Fett", correct: false },
          { text: "Nur rohe Kost", correct: false }
        ],
        explanation: "Das oberste Gebot bei Lebererkrankungen ist Alkoholabstinenz. Eine streng fett- oder eiweißarme Schonkost ist veraltet – heute wird vollwertige Mischkost empfohlen. 5 kleine Mahlzeiten sind günstiger als 3 große."
      }
    ],
    phase4Questions: [
      {
        id: "1047_07_p4_1",
        type: "mc",
        question: "Welche Aussagen zu Zöliakie sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Zöliakie ist eine Autoimmunerkrankung, keine Nahrungsmittelunverträglichkeit", correct: true },
          { text: "Hafer enthält von Natur aus kein Gluten, ist aber häufig kontaminiert", correct: true },
          { text: "Bei Verträglichkeit kann glutenfrei gekennzeichneter Hafer verwendet werden", correct: true },
          { text: "Zöliakie-Patienten dürfen Dinkel essen, da es verwandt mit Weizen ist", correct: false },
          { text: "Glutenfreie Getreidealternativen sind z. B. Mais, Reis, Hirse und Buchweizen", correct: true }
        ],
        explanation: "Dinkel enthält Gluten und ist strikt verboten. Hafer ist von Natur aus glutenfrei, aber fast immer durch die Verarbeitung kontaminiert – glutenfrei gekennzeichneter Hafer kann bei nachgewiesener Verträglichkeit eingesetzt werden."
      },
      {
        id: "1047_07_p4_2",
        type: "mc",
        question: "Welche Ernährungsempfehlungen sind für chronische Pankreaserkrankungen korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Relativ fettarme und nicht zu eiweißhaltige Ernährung", correct: true },
          { text: "Hochwertige Proteine (hohe biologische Wertigkeit) bevorzugen", correct: true },
          { text: "Nach einer schweren Erkrankung dauert Erholung bis zu einem halben Jahr", correct: true },
          { text: "MCT-Fette sind bei schlechter Fettaufnahme empfehlenswert", correct: true },
          { text: "Alkohol in geringen Mengen ist erlaubt", correct: false }
        ],
        explanation: "Alkohol ist nach Pankreatitis für mindestens ein halbes Jahr strikt verboten – bei chronischer Pankreatitis dauerhaft. MCT-Fette (mittelkettige Triglyzeride) werden bei Malabsorption und schlechter Fettaufnahme eingesetzt, da sie direkt über die Pfortader resorbiert werden."
      }
    ]
  }),

  makeDetailedPlant({
    id: "1047_08",
    title: "Diät bei Erkrankungen II: Diabetes, Niere, Herz-Kreislauf, Gicht",
    contextHint: "Kap. 8.6–8.9 – Diabetes (KH 45–50%, EW 15–20%, Fett 30%; schnelle vs. langsame KH); Niere (eiweißarm: 0,35–0,45 streng / 0,45–0,6 mäßig; eiweißreich: Dialyse); Hypercholesterinämie (HDL↑, LDL↓); Gicht (Fruchtzucker hemmt Harnsäureausscheidung, >2L Urin/24h)",
    phase1: {
      soil: {
        statement: "Bei Diabetes mellitus sollte die Nährstoffrelation aus ca. 45–50 % Kohlenhydraten, 15–20 % Eiweiß und 30 % Fett bestehen; 'schnelle' Kohlenhydrate (isolierte Zucker) sind zu meiden.",
        answer: true,
        solution: "Eiweiß maximal 20 %, da höhere Zufuhr die diabetische Nephropathie fördert. Schnelle KH (Haushaltszucker, Limonaden) schießen ins Blut; langsame KH (Stärke, Ballaststoffe) werden langsam gespalten. Spezielle Diabetikerlebensmittel sind inzwischen vom Markt genommen."
      },
      seed: {
        statement: "Die Nierendiät bei Niereninsuffizienz ist eine eiweißreiche Kostform, da die Niere Eiweiß zur Regeneration benötigt.",
        answer: false,
        solution: "Die Nierendiät ist eine EIWEISSARME Kostform. Streng eiweißarm = 0,35–0,45 g/kg KG; mäßig eiweißarm = 0,45–0,6 g/kg KG; normal = 0,8 g/kg KG. Eiweißreiche Kost (1–1,5 g/kg KG) ist dagegen indiziert bei Dialyse, Verbrennungen, Operationen und onkologischen Patienten."
      },
      water: {
        statement: "Bei Gicht sollte Fruchtzucker (Fruktose) eingeschränkt werden, da er in der Leber den Purin-Pool erhöht und damit den Harnsäurespiegel steigert.",
        answer: true,
        solution: "Fruktose wird fast ausschließlich in der Leber verstoffwechselt und erhöht dort den Purin-Pool → Harnsäure↑. Auch erhöhter Insulinspiegel fördert Harnsäure-Rückresorption in den Nieren. Flüssigkeitszufuhr so hoch, dass >2 L Urin/24h anfällt."
      }
    },
    harvestQuestions: [
      {
        id: "1047_08_h1",
        type: "mc",
        question: "Wie hoch ist die empfohlene Eiweißzufuhr bei streng eiweißarmer Diät (z. B. Niereninsuffizienz)?",
        options: [
          { text: "0,35–0,45 g/kg Körpergewicht", correct: true },
          { text: "0,8–1,0 g/kg Körpergewicht", correct: false },
          { text: "1,0–1,5 g/kg Körpergewicht", correct: false },
          { text: "1,5–2,0 g/kg Körpergewicht", correct: false }
        ],
        explanation: "Streng eiweißarm: 0,35–0,45 g/kg KG; mäßig eiweißarm: 0,45–0,6 g/kg KG; Normalzufuhr: 0,8 g/kg KG; eiweißreich: 1–1,5 g/kg KG. Eiweißreiche Kost ist indiziert bei Dialyse, Verbrennungen, Operationen, Mangelernährung und onkologischen Patienten."
      },
      {
        id: "1047_08_h2",
        type: "true_false",
        statement: "Fruchtzucker erhöht den Harnsäurespiegel, weil er in der Leber den Purin-Pool steigert und auch die renale Harnsäureausscheidung hemmt.",
        answer: true,
        explanation: "Korrekt. Fruktose wird fast ausschließlich in der Leber verstoffwechselt und erhöht dort den Purin-Pool → Harnsäure↑. Zusätzlich fördert erhöhter Insulinspiegel (durch KH-reiche Ernährung) die Rückresorption der Harnsäure in den Nieren."
      },
      {
        id: "1047_08_h3",
        type: "mc",
        question: "Welche Maßnahme ist bei Hypercholesterinämie NICHT sinnvoll?",
        options: [
          { text: "Verzehr von Eiern erhöhen", correct: true },
          { text: "Gesättigte Fettsäuren reduzieren", correct: false },
          { text: "Ballaststoffreiche Kost bevorzugen", correct: false },
          { text: "Trans-Fettsäuren (Margarine, Fertiggerichte) meiden", correct: false }
        ],
        explanation: "Bei Hypercholesterinämie sollten Eier nur in Maßen gegessen werden (cholesterinreich). Sinnvolle Maßnahmen: gesättigte FS↓, Trans-FS↓, ungesättigte FS↑, ballaststoffreich, Gesamtcholesterin max. 300 mg/Tag."
      },
      {
        id: "1047_08_h4",
        type: "true_false",
        statement: "Bei Gicht empfiehlt sich eine Radikaldiät zur schnellen Gewichtsreduktion, da Übergewicht den Harnsäurespiegel erhöht.",
        answer: false,
        explanation: "Falsch. Eine Radikaldiät ist bei Gicht ausdrücklich KONTRAINDIZIERT, da beim Fasten Harnsäure freigesetzt wird und Gichtanfälle provoziert werden können. Maßvoll Gewicht reduzieren, reichlich trinken (>2 L Urin/24h), Purine in der Ernährung einschränken."
      },
      {
        id: "1047_08_h5",
        type: "mc",
        question: "Welche Eiweißkombination erhöht die biologische Wertigkeit durch gegenseitige Ergänzung?",
        options: [
          { text: "Kartoffel und Ei", correct: true },
          { text: "Fleisch und Fisch", correct: false },
          { text: "Milch und Käse", correct: false },
          { text: "Eier und Fleisch", correct: false }
        ],
        explanation: "Die Kombination aus tierischem und pflanzlichem Eiweiß wertet das pflanzliche auf. Klassische Hochwertkombinationen: Kartoffel + Ei (Bratkartoffeln mit Spiegelei), Weizen + Milch (Brot mit Käse/Quark), Hülsenfrüchte + Getreide (Linsensuppemit Brot)."
      }
    ],
    phase4Questions: [
      {
        id: "1047_08_p4_1",
        type: "mc",
        question: "Welche Ernährungsmaßnahmen sind bei Diabetes mellitus korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Kohlenhydrate 45–50 % der Energiezufuhr", correct: true },
          { text: "Eiweiß max. 20 % (wegen diabetischer Nephropathie)", correct: true },
          { text: "'Schnelle' Kohlenhydrate (Zucker, Limonaden) bevorzugen", correct: false },
          { text: "Pflanzliches Eiweiß bevorzugen gegenüber tierischem", correct: true },
          { text: "Spezielle Diabetikerlebensmittel sind weiterhin empfohlen", correct: false }
        ],
        explanation: "Spezielle Diabetikerlebensmittel sind vom Markt genommen – sie enthielten früher hohe Fettmengen. 'Schnelle' KH (isolierte Zucker) sind zu meiden, da sie Blutzuckerspitzen erzeugen. Pflanzliches Eiweiß bevorzugen, da tierisches die Nephropathie fördert."
      },
      {
        id: "1047_08_p4_2",
        type: "mc",
        question: "Welche Ernährungsempfehlungen bei Gicht sind korrekt? (Mehrere Antworten möglich)",
        options: [
          { text: "Innereien meiden (hoher Puringehalt)", correct: true },
          { text: "Bier meiden (enthält beträchtliche Purinmengen)", correct: true },
          { text: "Lebensmittel nicht braten (Braten konzentriert Purine)", correct: true },
          { text: "Flüssigkeit so hoch, dass >2 Liter Urin/24h anfallen", correct: true },
          { text: "Spinat und Rosenkohl sind unbedenklich für Gichtpatienten", correct: false }
        ],
        explanation: "Spinat und Rosenkohl sind relativ purinreich und sollten bei Gicht gemieden werden. Alle anderen Maßnahmen sind korrekt: Innereien/Bier meiden, nicht braten (konzentriert Purine), reichlich trinken für gute Nierendurchspülung."
      }
    ]
  })
