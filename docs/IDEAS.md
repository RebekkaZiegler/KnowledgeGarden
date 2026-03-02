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

End of ideas.
