# Knowledge Garden RPG

Master Overview — Stand: März 2026

---

## AKTUELLER STAND (v0.4)

Engine, Inhalte, Kampfsystem und Garten-UI sind vollständig implementiert. Spielschleife läuft durch.

**Fertig:**
- Plant Tycoon-Stil Garten-UI: alle Themenbeete gleichzeitig sichtbar, kein Weltnavigieren
- Linkes Panel immer sichtbar: Spielerstatistiken, Heilbereich, Pflanzendetail + Fragen
- Bottom-Navigationsleiste mit modalen Fenstern: Katalog, Kampf, Labor, Einstellungen
- 5 Beete, 54 Pflanzen mit echtem Inhalt (Heilpraktiker-Pack)
- Jedes Thema hat eigene Pflanzenfarben; Hybride mischen Stamm- und Fruchtfarbe der Eltern
- Phase 1 (Lerninhalt VOR Frage + T/F-Quiz mit Sofort-Wiederholung), Phase 2 (3 Aktionen + Cooldown), Ernte, Kampf
- Ernte: 100% korrekt erforderlich — falsche Fragen gehen proportional in Phase 2 zurück
- Pflanzenzweige wachsen alternierend links/rechts; Früchte sitzen korrekt an den Astspitzen
- Speichersystem (localStorage), UI auf Deutsch, Katalog mit Farbkodierung
- Katalog filtert auf das jeweilige Thema wenn von leerem Topf geöffnet
- Beet-Statistiken pro Regal: gepflanzt, geerntet, gelernte/falsche/offene Fragen
- 4 Hybrid-Pflanzendefinitionen + Labor-System (Synthetisieren + Einpflanzen)
- Labor zeigt ✓/✗ Status pro benötigter Quellpflanze; Hinweis-Button für gesperrte Hybride
- 108 MC-Kampffragen (2 pro Pflanze, inkl. alle 4 Hybride)
- HP-Regeneration: Beschriften-Minispiel (17 Übungen, Diagramme + Bilder)
- **Kampfsystem (Enemy-per-Question):**
  - Alle harvestQuestions + combatQuestions = 1 Gegner pro Frage
  - Früchte = Munition (nur durch Ernte: ×2 pro korrekter Antwort)
  - Falsche Antwort = -1 HP + Gegner flieht (Frage für Boss vorgemerkt)
  - 0 Früchte im Normalkampf = Hard Reset des Kampffortschritts
  - 0 HP = Rückzug ohne Reset
  - Alle Gegner besiegt → Boss-Vorschau-Screen → Boss-Kampf
  - Boss: alle falsch beantworteten Fragen (oder 5 random wenn alles korrekt war)
- **Feedback-System:**
  - Phase 1: `solution`-Text als Lerninhalt (vor Frage) und als Feedback (nach Antwort)
  - Phase 2 + Ernte: `explanation`-Feld der Frage als Feedback
  - Alle 199 harvestQuestions haben `explanation`-Felder (1–2 Sätze, substantieller Inhalt)
  - Farb-Feedback: grün = richtig, rot = falsch
- Export/Import Spielstand (JSON-Datei)

**Offen (nach Priorität):**
1. Playtest: vollständiger Loop (Früchte-Balance, Gegner-Schwierigkeit, Ernte-Härte)
2. UI/UX-Feinschliff und Content-QA nach Playtest
   - Ablauf/Template: `docs/PLAYTEST_CHECKLIST.md`
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
- Kapitel sind Beete (Themenregale im Garten)
- Konzepte sind Pflanzen
- Lerninteraktionen lassen Pflanzen wachsen
- Ernte = Wissenstest (100% korrekt erforderlich)
- Früchte = Munition
- Kampf = Hochdrucktest
- Labor = kuratorisch-themenübergreifende Integration
- Verrottung = Vergessen (optional, spätere Phase)

---

## 3. Pack-System

### 3.1 Was ist ein Pack?

Ein Pack ist eine vollständig eigenständige Lernwelt mit:
- Eigenem Garten
- Eigenem Kampfgebiet
- Eigenem Labor
- Eigenem Journal
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
Beete werden als Regale im Garten dargestellt — alle gleichzeitig sichtbar.

### 4.2 Pflanze = Konzept

Jede Pflanze ist ein prüfbares Konzept mit:
- `phase1`: soil/seed/water (T/F + solution)
- `harvestQuestions`: T/F oder MC mit `explanation`
- `combatQuestions`: MC mit 4 Optionen

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

## 6. Kampfsystem

Zweck: Hochdruckvalidierung. Fruchtknappheit erzeugt natürlichen Druck zum erneuten Lernen.

### Ressourcen

- **Früchte** = Munition (nur durch Ernte verdient, 1 pro Kampfantwort verbraucht)
- **HP** = Fehlertoleranz (Regeneration via Beschriften-Minispiel)

### Gegner-Pool

- Alle `harvestQuestions` + `combatQuestions` aller Pflanzen des Beetes
- 1 Gegner pro Frage; unbesiegte Gegner werden bevorzugt

### Normalkampf

| Ereignis | Folge |
|---|---|
| Richtige Antwort | -1 Frucht, +1 XP, Gegner als besiegt markiert |
| Falsche Antwort | -1 HP, Frage für Boss vorgemerkt, Gegner flieht |
| Früchte = 0 | Hard Reset: enemyProgress + wrongInCombat geleert |
| HP = 0 | Rückzug, kein Reset |

### Boss-Kampf

- Verfügbar wenn alle Gegner mindestens einmal besiegt (`bossAvailable = true`)
- Boss-Vorschau zeigt: schwache Themen, Früchtestand, Fragezahl
- Fragenpool: alle falsch beantworteten Fragen (oder 5 random wenn alles korrekt)
- Sieg: `bossDefeated = true`, +10 XP, +1 Beet-Slot freigeschaltet

---

## 7. Ressourcen

| Ressource | Verdient durch | Verbraucht durch |
|---|---|---|
| XP | Phase 1, Ernte, Kampf | Nie (permanent) |
| Früchte | Ernte (×2 pro korrekte Antwort) | Kampfantworten (1 pro richtig) |
| HP | Beschriften-Minispiel | Falsche Kampfantworten |

---

## 8. Feedback-System

- **Phase 1**: `solution`-Feld = Lerninhalt VOR der Frage + Erklärung NACH der Antwort
  - Muss vollständig eigenständig lesbar sein (keine Pronomen ohne Referent)
- **Phase 2 + Ernte**: `explanation`-Feld der Frage als Feedback
  - Alle 199 harvestQuestions haben `explanation` (1–2 Sätze, substantieller anatomischer Inhalt)
- Farb-Feedback: `.feedback--correct` (grün) / `.feedback--wrong` (rot)

---

## 9. Schwachpunkte (Weakpoints)

Entstehen bei:
- Falschen Erntenantworten
- Falschen Kampfantworten

Genutzt für:
- Priorisierung von Phase-2-Wiederholung
- Boss-Fragenpool

Designregel: diagnostisch, nie beschämend.

---

## 10. Labor und Hybriden

- Freischaltung: mindestens 1 Ernte aus 2 verschiedenen Beeten
- Keine Zufallsmechanik — nur kuratierte, vordefinierte Hybriden
- 4 Hybriden definiert mit eigenen harvestQuestions und combatQuestions
- Hybridfarben: Stammfarbe von Elternteil 1, Fruchtfarbe von Elternteil 2
- Labor-Screen: zeigt ✓/✗ Erntestatus pro benötigter Quellpflanze; Hinweis-Button für gesperrte Hybride

---

## 11. Spätere Systeme

### 11.1 Verrottung / Vergessen (Optional)

- Schonende zeitbasierte Abnahme
- Pflanze braucht nach langer Inaktivität kurze Auffrischung
- Löscht nie Errungenschaften oder XP
- Spieler-wählbarer Modus: Aus / Sanft / Streng

### 11.2 Verschmutzung und Reinigung

- Kosmetischer Umgebungszustand
- Reinigung via Lernmikrotasks
- Gibt kosmetische Währung

### 11.3 Town Hub

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
- `combatQuestions` (MC, 4 Optionen)
- Hybriden (mit `sources` = zwei Quellpflanzen)
- Label-Übungen (SVG-Diagramme oder Bilder mit Beschriftungszonen)

---

Ende des Überblicks.
