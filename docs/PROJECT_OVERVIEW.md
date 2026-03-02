# Knowledge Garden RPG

Master Overview — Stand: März 2026

---

## AKTUELLER STAND

Engine, Inhalte und Kampfsystem sind vollständig implementiert. Spielschleife läuft durch.

**Fertig:**
- 5 Beete, 54 Pflanzen mit echtem Inhalt (Heilpraktiker-Pack)
- Phase 1 (Lerninhalt + T/F-Quiz), Phase 2 (3 Aktionen + Cooldown), Ernte, Kampf
- Speichersystem (localStorage), UI auf Deutsch, Katalog mit Farbkodierung
- 4 Hybrid-Pflanzendefinitionen + Labor-System (Synthetisieren + Einpflanzen)
- 108 MC-Kampffragen (2 pro Pflanze)
- HP-Regeneration: Beschriften-Minispiel (17 Übungen, Diagramme + Bilder)
- **Kampfsystem (Enemy-per-Question):**
  - Alle harvestQuestions + combatQuestions = 1 Gegner pro Frage
  - Früchte = Munition (nur durch Ernte: ×2 pro korrekter Antwort)
  - Falsche Antwort = -1 HP + Gegner flieht (Frage für Boss vorgemerkt)
  - 0 Früchte im Normalkampf = Hard Reset des Kampffortschritts
  - 0 HP = Rückzug ohne Reset
  - Alle Gegner besiegt → Boss-Vorschau-Screen → Boss-Kampf
  - Boss: falsch beantwortete Fragen + Auffüllung auf min. 5
- **Feedback-System:**
  - Phase 1: `solution`-Text als Lerninhalt (vor Frage) und als Feedback (nach Antwort)
  - Phase 2 + Ernte: `explanation`-Feld der Frage als Feedback
  - Alle 199 harvestQuestions haben `explanation`-Felder (1–2 Sätze, substantieller Inhalt)
  - Farb-Feedback: grün = richtig, rot = falsch
- Labor-Screen: Hybridpflanzen-Titel/Quellen nur sichtbar wenn bereits entdeckt
- Export/Import Spielstand (JSON-Datei)

**Offen (nach Priorität):**
1. **Pixel-Grafik Layer Phase 1** ← nächster Schritt
2. Playtest: vollständiger Loop (Früchte-Balance, Gegner-Schwierigkeit)
3. UI/UX-Feinschliff und Content-QA nach Playtest
   - Ablauf/Template: `docs/PLAYTEST_CHECKLIST.md`

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
- Kapitel sind Beete
- Konzepte sind Pflanzen
- Lerninteraktionen lassen Pflanzen wachsen
- Ernte = Wissenstest
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

### 4.2 Pflanze = Konzept

Jede Pflanze ist ein prüfbares Konzept mit:
- `phase1`: soil/seed/water (T/F + solution)
- `harvestQuestions`: T/F mit `explanation`
- `bossQuestions`: T/F
- `combatQuestions`: MC mit 4 Optionen

---

## 5. Pflanzen-Lebenszyklus

### Phase 1 — Grundlegung (einmalig)

- 3 Schritte: Boden → Samen → Erstes Gießen
- `solution`-Text als Lerninhalt vor der Frage gezeigt
- Sofortige Wiederholung bei Fehler
- Entsperrt Phase 2

### Phase 2 — Vertiefung (wiederholbar)

- 3 Aktionen: Wasser (Mechanismus), Dünger (Funktion), Beschneiden (Abgrenzung)
- Cooldown 5 Minuten (Dünger überspringt)
- Alle Aktionen absolviert → Ernte freigeschaltet

### Ernte — Retrieval

- T/F-Fragen (harvestQuestions)
- Bestehen bei ≥ 70% richtig
- Korrekte Antwort = **2 Früchte**
- `harvestedOnce` = permanent gesetzt
- Pflanze verlässt Beet nach Ernte

---

## 6. Kampfsystem

Zweck: Hochdruckvalidierung. Fruchtknappheit erzeugt natürlichen Druck zum erneuten Lernen.

### Ressourcen

- **Früchte** = Munition (nur durch Ernte verdient, 1 pro korrekter Kampfantwort verbraucht)
- **HP** = Fehlertolerantz (Regeneration via Beschriften-Minispiel)

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
- Fragenpool: falsch beantwortete Fragen + zufällige Auffüllung auf min. 5
- Sieg: `bossDefeated = true`, +10 XP, +1 Beet-Slot freigeschaltet

---

## 7. Ressourcen

| Ressource | Verdient durch | Verbraucht durch |
|---|---|---|
| XP | Phase 1, Ernte, Kampf | Nie (permanent) |
| Früchte | Ernte (×2 pro korrekte Antwort) | Kampfantworten (1 pro richtig) |
| HP | Beschriften-Minispiel | Falsche Kampfantworten |
| Dünger | Startbestand | Cooldown-Skip |

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

## 10. Labor und Hybriden (Post-MVP)

- Freischaltung: 2 erntefähige Pflanzen aus verschiedenen Beeten vorhanden
- Keine Zufallsmechanik — nur kuratierte, vordefinierte Hybriden
- 4 Hybriden definiert, warten auf Labor-System-Implementierung
- Labor-Screen: Hybridtitel/Quellen nur sichtbar wenn bereits entdeckt

---

## 11. Spätere Systeme

### 11.1 Verrottung / Vergessen (Optional)

- Schonende Zeitbasierte Abnahme
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

## 12. Pixel-Grafik Layer

### Ziel

Den aktuellen Form-/Button-UI durch eine begehbare 2D-Spielwelt ersetzen. Die Lernlogik (game.js, content.js) bleibt unverändert — die Spielwelt ist nur die Navigationsebene.

### Technologie

- **Phaser.js 3** (MIT-Lizenz, kostenlos, browserbasiert)
- **Assets:** Kenney.nl (CC0, Public Domain) — kein Attribution nötig

### Phase 1 — Begehbarer Raum (Nächster Schritt)

**Szene:** Ein einzelner Raum mit allen Spielbereichen.

```
┌─────────────────────────────────────┐
│  [Samenregal]         [Labor 🔒]    │
│                                      │
│  [Beet 1] [Beet 2] [Beet 3]         │
│  [Beet 4] [Beet 5]                  │
│                                      │
│  [Kampfzone]       [Bossbereich]    │
└─────────────────────────────────────┘
```

**Implementierung:**
1. Phaser.js via CDN in `index.html` einbinden
2. Kenney Tiny Town (16×16 px) für Boden-/Wandtiles und Objekte
3. Spieler-Sprite (16×16): WASD/Pfeiltasten zur Bewegung, Richtungsänderung
4. Interaktionszonen: Spieler nähert sich → `[E]`-Prompt erscheint → bestehende Game-UI als Overlay
5. Keine vollständigen Walk-Animationen in Phase 1 (nur Richtungswechsel)

**Ziel Phase 1:** Walking + Zone-Interaktion funktioniert, alle bestehenden Screens zugänglich.

### Phase 2 — Sprites und Animationen (Später)

- Echte Walk-Cycle-Animationen (4 Richtungen × 4 Frames)
- Pflanzenwachstums-Sprites pro Wachstumsphase
- Kampf-Sprite-Animationen (Gegner erscheinen, Treffer-Effekte)
- Boss-Sprite
- Pixel-Art-HUD (HP-Herzen, Frucht-Icons, XP-Balken)

### Asset-Quellen

| Bedarf | Quelle | Lizenz |
|---|---|---|
| Raumtiles, Möbel, Pflanztöpfe | [Kenney Tiny Town](https://kenney.nl/assets/tiny-town) | CC0 |
| Charakter-Sprite | [Kenney Roguelike/RPG Pack](https://kenney.nl/assets/roguelike-rpg-pack) | CC0 |
| Zusatztiles/-objekte | [Kenney Tiny Dungeon](https://kenney.nl/assets/tiny-dungeon) | CC0 |
| Walk-Animationen (Phase 2) | [LPC Sprites — OpenGameArt](https://opengameart.org) | CC-BY-SA |

---

## 13. Speichersystem

- `localStorage`, Schlüssel `kg_rpg_mvp_v4`
- Ein Master-Save
- Migration via `normalizeLoadedState()` für alte Spielstände
- Export/Import kommt wenn Schema stabil ist

---

## 14. Content-Modell (Data-Driven)

Engine niemals mit Curriculum hardcoden.

Jeder Pack definiert in `content.js`:
- Beete + Pflanzen
- Phase-1-Inhalt (soil/seed/water mit `solution`)
- Phase-2-Aktionen
- `harvestQuestions` (T/F + `explanation`)
- `bossQuestions` (T/F)
- `combatQuestions` (MC, 4 Optionen)
- Hybriden
- Visuelles Thema (später)

---

Ende des Überblicks.



