# Ideen-Sammlung (Post-MVP)

Dieses Dokument sammelt Ideen für Features nach dem MVP. Keine Umsetzungsverpflichtung.

---

## Restaurant-System — Ausbau-Ideen

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