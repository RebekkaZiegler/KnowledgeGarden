# Knowledge Garden RPG

Master Overview — Stand: März 2026

---

## AKTUELLER STAND (v0.4)

**Was läuft:**
- Plant Tycoon-Stil Garten-UI: bis zu 3 aktive Beete gleichzeitig sichtbar
- Linkes Panel (immer sichtbar): Spielerstatistiken, Heilbereich, Pflanzendetail + Fragen
- Bottom-Navigationsleiste mit Modalen: Pflanzen-Katalog, Restaurant, Labor, Einstellungen
- 5 Beete, Pflanzen mit echtem Heilpraktiker-Inhalt (+ Hybride)
- Farbcodierung pro Thema; Hybride mischen Stamm- und Fruchtfarbe der Elternpflanzen
- Phase 1 (Lerninhalt VOR Frage + T/F mit Sofort-Wiederholung), Phase 2 (3 Aktionen + Cooldown), Ernte
- Ernte: 100% korrekt erforderlich — falsche Fragen gehen proportional in Phase 2 zurück
- Beet-Statistiken im Regal: gepflanzt, geerntet, gelernte/falsche/offene Fragen
- Katalog filtert auf Thema wenn von leerem Topf geöffnet; zeigt vollständige Stats aller Beete
- 4 Hybrid-Pflanzendefinitionen + Labor-System (Synthetisieren + Einpflanzen)
- Speichersystem (localStorage), Export/Import Spielstand, UI auf Deutsch
- Beschriften-Minispiel: 17 Übungen mit Diagrammen + Bildern (Bonus-Aktivität)

**Restaurant-System (v1):**
- Echtzeit-Minigame: Köche (CSS-Kreise) kochen und servieren automatisch
- Kunden kommen mit Geduld-Balken; verlassen das Restaurant glücklich oder ungeduldig
- Dreckflecken (von Kunden hinterlassen), Reinigungskraft als Unlock
- Zutaten-Vorrat (12 Verwendungen); Nachfüllen kostet eine Frage
- Neue Köche, Zutaten (Spieß, Protein, Gemüse, Beilage, Sauce, Cola, Bier, Wein),
  Reinigungskraft über Fragen + Früchte freischaltbar
- Fragen-Priorität: noch nie gesehen → falsch beantwortet → (Wiederholung wenn alles gemeistert)
- Trophäen-Anzeige + Empfehlung neues Kapitel wenn alle Fragen gemeistert

**Offen (nach Priorität):**
1. Playtest: vollständiger Loop (Früchte-Balance, Restaurant-Spielgefühl, Ernte-Härte) — Ablauf: `docs/PLAYTEST_CHECKLIST.md`
2. Restaurant v2: Menü-Designer, Cocktails, Spa, Naturheilpraxis (siehe `docs/IDEAS.md`)
3. Pixel-Grafik Layer (optional, spätere Phase)

---

## 1. Vision

Browser-basiertes Lernspiel, das strukturiertes Lernen in eine motivierende Spielschleife verwandelt.

Das System muss:
- Lernen (Encoding) von Testen (Retrieval) trennen
- Spaced Repetition fördern, Cramming erlauben
- Schwachstellen tracken und gezielte Wiederholung lenken
- Daten-getrieben und engine-agnostisch bleiben
- Expandierbar auf weitere Content-Packs sein

Erster Pack: `Heilpraktiker` — Sprache: Deutsch

Langzeit-Vision: mehrere Packs (z.B. Warhammer Lore, Schullehrplan), jeder als eigenes Haus in einem Town-Hub.

---

## 2. Kernmetapher

- Wissen wächst wie Pflanzen
- Kapitel = Beete (Themenregale im Garten)
- Konzepte = Pflanzen
- Lerninteraktionen lassen Pflanzen wachsen
- Ernte = Wissenstest (100% korrekt erforderlich)
- Früchte = Ressource (verdient durch Ernte, verbraucht im Restaurant)
- Restaurant = entspannter Betrieb + Unlock-System über Fragen
- Labor = themenübergreifende Integration (Hybride)
- Verrottung = Vergessen (optional, spätere Phase)

---

## 3. Pack-System

### 3.1 Was ist ein Pack?

Ein Pack ist eine vollständig eigenständige Lernwelt mit:
- Eigenem Garten
- Eigenem Restaurant
- Eigenem Labor
- Eigenen XP, HP, Früchten, Statistiken

Kein Fortschritt wird zwischen Packs übertragen.

### 3.2 Town Hub (Später)

- Hauptansicht = Pixel-Art-Dorf
- Jeder Pack = ein Haus
- Klick auf Haus → Pack betreten
- Nur ein Pack gleichzeitig aktiv

---

## 4. Datenhierarchie

`Pack → Beete (Kapitel) → Pflanzen (Unterthemen/Konzepte)`

### 4.1 Beet = Kapitel

Jedes Beet hat viele Pflanzen in der Bibliothek, aber maximal 4 aktiv gleichzeitig.
Im Garten sind maximal 3 Beete gleichzeitig sichtbar. Alle Beete mit ihren Stats sind im Katalog einsehbar.

### 4.2 Pflanze = Konzept

Jede Pflanze ist ein prüfbares Konzept mit:
- `phase1`: soil/seed/water (T/F + solution)
- `harvestQuestions`: T/F oder MC mit `explanation`
- `phase4Questions`: MC mit 4 Optionen

---

## 5. Pflanzen-Lebenszyklus

### Phase 1 — Grundlegung (einmalig)

- 3 Schritte: Boden → Samen → Erstes Gießen
- `solution`-Text als Lerninhalt VOR der Frage gezeigt
- Sofortige Wiederholung bei Fehler (kein Fortschritt bis korrekt)
- Entsperrt Phase 2

### Phase 2 — Vertiefung (wiederholbar)

- 3 Aktionen: Wässern (Mechanismus), Düngen (Funktion), Beschneiden (Abgrenzung)
- Cooldown 5 Minuten zwischen Aktionen (Dev-Modus: 10 Sek.)
- Jede Aktion fragt harvestQuestions ab; Richtig = learned, Falsch = bleibt in Warteschlange
- 3 Falschantworten auf dieselbe Frage → Pflanze verwelkt
- Alle Fragen learned → Ernte freigeschaltet

### Ernte — Retrieval

- Alle harvestQuestions werden einmalig in zufälliger Reihenfolge abgefragt
- **Alle müssen korrekt beantwortet werden**
- Falsche Antworten: Feedback anzeigen, weitermachen, am Ende nur falsche Fragen zurücksetzen
- Proportionaler Fortschrittsrückgang je nach Fehleranzahl
- Korrekte Antwort = **2 Früchte**
- `harvestedOnce` = permanent gesetzt; Pflanze verlässt Beet nach Ernte

---

## 6. Restaurant-System

Zweck: Entspannter Betrieb im Hintergrund + Motivation durch Unlock-Mechanismus.

### Ressourcen

- **Früchte** = Kosten für Unlocks und Nachfüllen (verdient durch Ernte)
- Fragen aus `harvestQuestions` + `phase4Questions` = Währung für Unlocks

### Ablauf

- Köche servieren automatisch; Spieler kann eingreifen durch Unlocks
- Kunden kommen mit Geduld-Balken; glückliche Kunden = Erfolgsgefühl
- Zutaten-Vorrat läuft ab → Nachfüllen über Frage + ggf. Früchte
- Neue Inhalte freischalten: Koch, Zutaten, Reinigungskraft

### Fragen-Priorität

| Priorität | Kategorie |
|---|---|
| 1 | Noch nie gezeigt |
| 2 | Falsch beantwortet |
| 3 | Bereits korrekt (nur in Wiederholungsmodus) |

Wenn alle Fragen korrekt beantwortet: Trophäe + Empfehlung neues Kapitel freischalten.

---

## 7. Ressourcen

| Ressource | Verdient durch | Verbraucht durch |
|---|---|---|
| XP | Phase 1, Ernte | Nie (permanent) |
| Früchte | Ernte (×2 pro korrekte Antwort) | Restaurant-Unlocks, Nachfüllen |
| HP | Beschriften-Minispiel | — (kein aktiver Verbrauch) |

---

## 8. Feedback-System

- **Phase 1**: `solution`-Feld = Lerninhalt VOR der Frage + Erklärung NACH der Antwort
  - Muss vollständig eigenständig lesbar sein (keine Pronomen ohne Referent)
- **Phase 2 + Ernte**: `explanation`-Feld der Frage als Feedback (alle harvestQuestions haben `explanation`, 1–2 Sätze mit substanziellem Inhalt)
- Farb-Feedback: `.feedback--correct` (grün) / `.feedback--wrong` (rot)

---

## 9. Schwachpunkte (Weakpoints)

Entstehen bei falschen Erntenantworten.

Genutzt für:
- Priorisierung von Phase-2-Wiederholung

Designregel: diagnostisch, nie beschämend.

---

## 10. Labor und Hybriden

- Freischaltung: mindestens 1 Ernte aus 2 verschiedenen Beeten
- Keine Zufallsmechanik — nur kuratierte, vordefinierte Hybriden
- 4 Hybriden definiert mit eigenen harvestQuestions und phase4Questions
- Hybridfarben: Stammfarbe von Elternteil 1, Fruchtfarbe von Elternteil 2
- Labor-Screen: zeigt ✓/✗ Erntestatus pro benötigter Quellpflanze; Hinweis-Button für gesperrte Hybride

---

## 11. Spätere Systeme

### 11.1 Verrottung / Vergessen (Optional)

- Schonende zeitbasierte Abnahme
- Pflanze braucht nach langer Inaktivität kurze Auffrischung
- Löscht nie Errungenschaften oder XP
- Spieler-wählbarer Modus: Aus / Sanft / Streng

### 11.2 Town Hub

- Pixel-Art-Dorf als Hauptmenü
- Jeder Pack = ein Haus im Dorf

---

## 12. Speichersystem

- `localStorage`, aktueller Schlüssel `kg_rpg_mvp_v6`
- Ein Master-Save
- Migration via `normalizeLoadedState()` für alte Spielstände
- Export/Import Spielstand (JSON-Datei) in Einstellungen verfügbar

---

## 13. Content-Modell (Data-Driven)

Engine niemals mit Curriculum hardcoden.

Jeder Pack definiert in `content.js`:
- Beete + Pflanzen
- Phase-1-Inhalt (soil/seed/water mit `solution`)
- Phase-2-Aktionen
- `harvestQuestions` (T/F oder MC + `explanation`)
- `phase4Questions` (MC, 4 Optionen)
- Hybriden (mit `sources` = zwei Quellpflanzen)
- Label-Übungen (SVG-Diagramme oder Bilder mit Beschriftungszonen)

---

Ende des Überblicks.
