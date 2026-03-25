# Ideen-Sammlung (Post-MVP)

Dieses Dokument sammelt Ideen für Features nach dem MVP. Keine Umsetzungsverpflichtung.

---

## 1. Beschriftungs-Minispiel (Label-Drag)

**Idee:**
Anatomische oder histologische Diagramme aus den PDFs werden ohne Beschriftung angezeigt.
Der Spieler muss Beschriftungs-Chips an die richtigen Positionen ziehen (oder klicken).
Korrekte Platzierungen geben HP-Regeneration oder Reinigungspunkte.

**Anwendungsfälle:**
- HP-Regeneration: kleines Zwischenspiel zum Wiederauffüllen von HP außerhalb des Kampfes
- Cleanup-Punkte: thematisch passende Lernaufgabe als "Gartenreinigung"

**Technische Machbarkeit:** Hoch
- Reines HTML/CSS/JS, kein Canvas nötig
- Bild mit `<img>`, Drop-Zones als relativ positionierte `<div>` darüber
- Beschriftungs-Chips als draggable Elemente (HTML5 Drag-and-Drop API)
  oder alternativ: Klick-zum-Auswählen + Klick-zum-Platzieren (einfacher, mobil-freundlicher)
- Auswertung: Label in korrekter Zone → richtig

**Content-Aufwand (der Engpass):**
- Für jedes Bild muss man:
  1. Passendes Diagramm aus PDF exportieren
  2. Original-Beschriftungen im Bildeditor entfernen/abdecken
  3. Drop-Zone-Koordinaten definieren (als % der Bildgröße)
  4. Korrekte Label-Texte erfassen
- Dieser Schritt ist manuell und nicht automatisierbar

**Thematischer Fit:** Sehr gut
- Anatomie-/Histologie-Diagramme sind in den Studienbriefen reichlich vorhanden
- "Verletzt → heile dich durch Wiederholung von Strukturwissen" = lernpsychologisch sinnvoll
- Bilder als neues Medienelement im ansonsten textbasierten Spiel — machbar, braucht sorgfältige Einbindung

**Datenstruktur (Skizze):**
```json
{
  "id": "zelle_aufbau_label",
  "image": "assets/diagrams/zelle_aufbau.png",
  "zones": [
    { "id": "z1", "label": "Zellmembran", "x": 12, "y": 45, "w": 18, "h": 8 },
    { "id": "z2", "label": "Zellkern",    "x": 40, "y": 30, "w": 15, "h": 10 },
    { "id": "z3", "label": "Mitochondrium", "x": 60, "y": 55, "w": 18, "h": 8 }
  ]
}
```

**Status:** Idee dokumentiert — kein MVP, warten auf Post-MVP Phase.

---

## 2. HP-Regeneration (allgemein, Design offen)

Mechanismus noch nicht entschieden. Optionen:
- a) Beschriftungs-Minispiel (siehe oben)
- b) Einfache Wiederholungsaufgabe aus bereits gelernten Pflanzen
- c) Zeitbasierte Regeneration (passiv, z. B. 1 HP pro Stunde)
- d) Spezial-Item (Kräutertrank) aus Harvest oder Labor

Muss vor Labor-System entschieden werden, da das Labor ggf. Items produzieren könnte.

---

## 3. Kampfsystem-Redesign: Reinigung / Neighborhood Cleanup

**Idee:**
Das aktuelle Kampfsystem ("Kampf"-Tab) wird thematisch vollständig ersetzt durch ein Reinigungssystem. Statt Gegner zu bekämpfen, hilft der Spieler in einem Haus oder der Nachbarschaft beim Aufräumen und Reparieren.

**Kernprinzip:**
- Jedes Beet/Kapitel entspricht einem **Ort** (Raum, Laden, Außenbereich)
- Der Ort hat mehrere **Unordnungs-Items** (Schmutzfleck, kaputtes Möbel, Ratte, Insekt...)
- Spieler klickt ein Item an → gibt 1 Frucht aus → Frage erscheint
- Richtig beantwortet → Item wird in "sauber/repariert"-Zustand animiert
- Falsch beantwortet → Frucht verloren, Item bleibt schmutzig/kaputt
- Kein HP-System nötig

**Item-Zustände (vor → nach):**
- Schmutzfleck → sauberer Boden
- Kaputtes Möbel/Gerät → repariertes Möbel
- Ratte → gemütlicher Rattenkäfig (groß, schön!)
- Insekt → Glasterrarium mit Insekten
- (weitere nach Bedarf)

**"Boss"-Äquivalent → Trophäen-Challenge:**
- Wenn alle Items eines Ortes gereinigt sind → Trophäen-Challenge freigeschaltet
- Fragenpool: alle falsch beantworteten Fragen des Ortes (oder 5–10 zufällige wenn <5 falsch)
- Gewonnen → Trophäe für diesen Ort, Ort gilt als "abgeschlossen"

**Trophäenraum:**
- Separates Panel zeigt alle abgeschlossenen Orte mit Trophäe
- Visuelles Fortschritts-Showcase

**Freischaltung:**
- Identisch zur aktuellen Kampf-Freischaltung: alle Pflanzen des Beetes mindestens einmal geerntet

**Weltstruktur (34 Orte):**
- Nicht alle Orte sind "Räume" — 34 Kapitel brauchen 34 verschiedene Locations
- Geplante Aufteilung (grob):
  - Eigenes Zuhause: 5 Räume (Schlafzimmer, Küche, Bad, **Vivarium**, Wohnzimmer)
  - Direkte Nachbarn: ~6 (alte Nachbarin, junge Familie, exzentrischer Künstler...)
  - Dorf/Straße: ~8 (Bäckerei, Blumenladen, Tierarzt, Buchhandlung, Café, Post, Bibliothek, Schule)
  - Naturorte: ~6 (Park, Teich, Waldweg, Bushaltestelle, Spielplatz, Gemeinschaftsgarten)
  - Größere Gemeinschaft: ~9 (Rathaus, Feuerwehr, Gewächshaus, Marktstand, Reparaturcafé...)

**Visuelle Gestaltung:**
- Frontansicht (kein Top-Down) — Raum von vorne wie eine Bühnenkulisse
- CSS-Basis-Template + austauschbare Farben/Details pro Ort
- Drag-and-Drop Editor (dev tool, `?editor=true`) zum Positionieren der Items pro Raum
- Items haben je ein "schmutzig"- und ein "sauber"-Asset
- Orte transformieren sich beim Reinigen — sie werden schöner, leeren sich nicht

**Asset-Plan:**
- Basis-Raumschale: 1× CSS (Wände, Boden, Fenster)
- Möbel-Silhouetten: ~5–8 wiederverwendbare SVGs, je nach Ort gemischt
- Unordnungs-Items: ~6–10 Assets mit je zwei Zuständen (dirty/clean)
- Pro Ort: JSON-Config (Farben + welche Möbel + wo welche Items platziert)
- Asset-Erstellung: KI-generierte Sprites empfohlen (Frontansicht, flat vector, transparent background)

**Technische Umsetzung:**
- Mechanik-Code (Fruchtkosten, Fragen, wrongInCleaning, Boss-Logik) = minimale Änderungen
- Neues UI: Arena-Panel mit klickbaren Item-Sprites statt Frage-Liste
- JSON pro Ort: `[{ "type": "rat", "x": 42, "y": 68 }, ...]`
- Drag-and-Drop Editor: separates HTML/JS Tool, schreibt JSON-Config

**Bezug zu PROJECT_OVERVIEW.md Sektion 11.2:**
Diese Idee ersetzt und konkretisiert den dortigen Platzhalter "Verschmutzung und Reinigung".

---

**Karten-Navigation (Ersatz für "Kampf"-Button):**

Der "Kampf"-Button in der Navigationsleiste wird zu **"Karte"**. Klick öffnet eine gezeichnete Nachbarschaftskarte.

- Karte = KI-generierte Flat-Art-Illustration (Top-Down, pastell, kein Text im Bild)
- Jeder Ort = klickbarer Pin auf der Karte
- Pin-Zustände sichtbar auf einen Blick:
  - Gesperrt → ausgegraut + Schloss-Icon
  - Freigeschaltet, schmutzig → kleiner Chaos-Indikator
  - Vollständig gereinigt → Glitzer oder Mini-Trophäe
  - Trophäen-Challenge bereit → leuchtender Pin
- Zonen auf der Karte: Zuhause (Anker oben links) → Straße/Nachbarn → Dorfzentrum → Naturorte → Gemeinschaftsgebäude
- **Pin-Editor** (`?editor=true`): einmalig, Klick auf Kartenbild platziert Pin + Beet zuweisen + speichern → JSON. Nur ein Mal nötig.
- Asset: KI-generiert (Prompt-Vorlage: *"cozy flat illustration neighborhood map, top-down view, pastel colors, no text, no labels, illustration style"*)

**Status:** Idee vollständig ausgearbeitet — bereit zur Umsetzung wenn Assets vorhanden.

---

## 4. Restaurant-System — Ausbau-Ideen

**v1 implementiert:** Koch, Gäste, Geduld-Balken, Dreck, Reinigungskraft, Nachfüllen per Frage,
Getränke-Unlock (Cola, Bier, Wein), Fragen-Priorität (ungesehen → falsch → Wiederholung),
Trophäen-Anzeige wenn alle Fragen gemeistert.

### 4.1 Speisekarte & Gerichte-Designer

- Gerichte haben **Kategorien** (Pizza, Eintopf, Salat, …)
- Gericht-Name frei wählbar
- **Gerichte-Designer:** Sprites auf Teller ziehen (Protein + Gemüse + Beilage = Eintopf)
- Miniatur-Version des Gerichts erscheint im Restaurant (beim Koch, beim Gast)
- Gerichte-Eintrag in Menü = freigeschaltet über Frage + Früchte
- Gerichte aus Menü entfernen: kostenlos per Klick
- Sättigung = Summe der Zutaten, Gerichte-Bonus (+10%) für vollständige Kombination

### 4.2 Getränke v2

- Getränk erhöht Geduld-Toleranz (+Geduld-Puffer wenn serviert)
- **Cocktail-System**: Früchte aus dem Garten als Zutaten → eigene Cocktail-Namen frei wählbar
- Optische Vielfalt: volle Restaurant-Bestückung soll visuell schön und abwechslungsreich wirken

### 4.3 Nachfüllen & Lagerbestand

- Lager-Upgrades (größerer Vorrat), kostet Früchte + Frage
- Bei 0 Bestand: Koch überspringt diese Zutat, Gast bekommt weniger Sättigung

### 4.4 Folge-Venues (nach Restaurant)

- **Spa** (nach ~Kapitel 3): Massagestuhl, Badewanne, Schlammpackung — unlock-Progression
  - Gäste kommen gestresst (Stress-Balken), verlassen entspannt
- **Naturheilpraxis** (wenn Pathologie-Kapitel läuft): echtes Diagnostizieren
  - Gast kommt mit Symptomen → Spieler wählt Behandlung → Frage zur Diagnose → richtig = Gast geheilt
- Gleiche Mechanik, andere Sprites (Kreise/Rechtecke, keine Assets nötig)

### 4.5 Sonstige Ideen

- Diverse Kundschaft → verschiedene optische Kreise (Farbe/Muster per CSS, kein Asset)
- "Volle Restaurant"-Bonus: wenn 5 Gäste gleichzeitig glücklich sind → Bonus-Frucht
- Schlechte Bewertung (zu viel Dreck, zu viele ungeduldige Gäste) → weniger Gäste für X Sekunden
- Deko-Unlocks: rein kosmetisch, zeigen Fortschritt (Blumenvase, Gemälde = CSS-Elemente)

**Status:** v1 implementiert. Alle Punkte hier = Post-v1, keine Umsetzungsverpflichtung.

---

Ende der Ideen.

Also every customer coming in has a small chance of leaving some drt (just a brown spec with transparency) so at some point we need a cleaner (needs to be unlocked) or else the patience of customers will lower and also there will be less customers coming in