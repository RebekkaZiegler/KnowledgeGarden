# Playtest Checklist

Stand: März 2026

## Ziel
Den vollständigen Lernloop validieren:
- Früchte-Balance (Ernte vs. Ausgaben im Restaurant)
- Ernte-Härte (100%-Anforderung, Rückfall-Mechanik)
- Restaurant-Spielgefühl (Gäste, Dreck, Unlocks, Fragen-Priorität)
- UI-Klarheit und Tempo

## Setup
1. App starten mit `npm run run` (oder `npm run serve` + Browser).
2. Mindestens einen Lauf mit frischem Spielstand.
3. Normalmodus (`Dev-Cooldown: Aus`), danach optional Dev-Schnelllauf zur Verifikation.
4. Daten pro Lauf im Log-Template unten festhalten.

## Test-Durchgang A (Frischer Spielstand)
1. Leeren Spielstand starten.
2. Erstes Beet freischalten, Phase 1 + Phase 2 + Ernte für mindestens 2 Pflanzen abschließen.
3. Restaurant öffnen und erste Unlock-Fragen beantworten.
4. Notieren: Wo fühlt sich der Flow zu leicht, zu hart oder unklar an?

## Test-Durchgang B (Mittlerer Fortschritt)
1. Gleichen Spielstand fortsetzen.
2. Mindestens 1 Hybrid-Synthese abschließen und einpflanzen.
3. Ernte + Restaurant-Loop in einem zweiten Beet wiederholen.
4. Prüfen: Fühlt sich die Früchte-Wirtschaft nachhaltig an?

## Test-Durchgang C (Restaurant-Stress)
1. Restaurant längere Zeit laufen lassen ohne aktiv einzugreifen.
2. Beobachten: Gäste-Geduld, Dreck-Akkumulation, Vorrat-Erschöpfung.
3. Messen: Wie lange dauert es, sich nach leerem Vorrat zu erholen?

## Metriken
- Sitzungsdauer (Minuten)
- Ernterversuche / Erfolge
- Früchte vor/nach Restaurant-Session
- Anzahl harter Resets wegen `Früchte = 0`
- Restaurant-Unlocks erreicht (Anzahl)
- Unklare UI-Momente (Anzahl + kurze Notiz)

## Balance-Heuristiken
- Wenn Spieler `Früchte = 0` erreichen bevor ein zweites Beet freigeschaltet ist: Früchte-Einkommen zu niedrig.
- Wenn Restaurant-Fragen sich zu wenig abwechseln: Fragen-Pool zu klein oder Prioritäts-Logik prüfen.
- Wenn Ernte regelmäßig beim ersten Versuch scheitert: Fragen zu schwer oder phase1-Vorbereitung lückenhaft.
- Wenn Dreck sich zu schnell aufstaut ohne Chance zur Reaktion: Reinigungskraft-Unlock zu teuer oder zu spät.

## Run-Log-Template
Pro Playtest-Lauf kopieren:

```md
### Run ID: YYYY-MM-DD-##
- Modus: normal / dev-schnell
- Spielstand: frisch / fortgesetzt
- Beete gespielt:
- Pflanzen geerntet:
- Hybriden synthetisiert:
- Früchte (Sessionstart → Sessionende):
- Restaurant-Unlocks erreicht:
- Ernte-Misserfolge (Anzahl + welche Pflanze):
- Größte Reibungspunkte:
1.
2.
3.
- Vorgeschlagene Anpassungen:
1.
2.
3.
```

## Entscheidungsregel nach 5 Läufen
Immer nur eine Balance-Achse gleichzeitig ändern:
1. Früchte-Einnahmen / Ausgaben
2. Ernte-Rückfall-Mechanik (wie viele Fragen fallen zurück, wie weit)
3. Restaurant-Unlock-Kosten

Nach jeder Änderung mindestens 2 neue Sessions vor der nächsten Änderung.
