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