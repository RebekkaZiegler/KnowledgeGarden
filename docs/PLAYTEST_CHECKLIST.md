# Playtest Checklist (MVP Loop)

Stand: March 2026

## Goal
Validate the full learning loop with concrete balancing data:
- Fruit economy (earn vs spend)
- HP pressure and recovery cadence
- Combat/Boss difficulty curve
- UI clarity and pacing

## Setup
1. Start app with `npm run run` (or `npm run serve` + browser).
2. Use a fresh save for at least one run.
3. Use normal mode first (`Dev-Cooldown: Aus`), then optional dev-fast verification run.
4. Record data per run in the log template below.

## Test Pass A (Fresh Player)
1. Start from empty save.
2. Unlock first bed, complete Phase 1 + Phase 2 + Harvest for at least 2 plants.
3. Start normal combat and play until one of:
- fruits reach 0
- hp reach 0
- boss becomes available
4. If boss is available, run boss fight once.
5. Note where flow feels too easy, too punishing, or unclear.

## Test Pass B (Mid Progress)
1. Continue same save.
2. Reach at least 1 hybrid synthesis and plant it.
3. Repeat harvest + combat loop in another bed.
4. Check whether weakpoint reinforcement feels meaningful.

## Test Pass C (Recovery and Friction)
1. Intentionally fail several combat questions.
2. Use label minigame for HP recovery.
3. Measure how long it takes to recover and return to combat.

## Metrics To Track
- Session duration (minutes)
- Harvest attempts / successes
- Fruits before combat, fruits after combat
- HP lost per combat run
- Number of hard resets from `fruits = 0`
- Number of retreats from `hp = 0`
- Boss unlocked? (yes/no)
- Boss win? (yes/no)
- Confusing UI moments (count + short note)

## Balance Heuristics (Initial)
- If players hit `fruits = 0` before reaching boss in most runs, fruit economy is too strict.
- If players almost never lose HP, combat pressure is too low.
- If boss fails repeatedly even with preparation, queue size or question mix is too hard.
- If label minigame recovery feels mandatory too often, HP damage or regen cadence needs tuning.

## Run Log Template
Copy this block per playtest run:

```md
### Run ID: YYYY-MM-DD-##
- Mode: normal / dev-fast
- Save type: fresh / continued
- Beds played:
- Plants harvested:
- Hybrids synthesized:
- Fruits (start combat -> end):
- HP (start combat -> end):
- Normal combat result: success / retreat / hard reset
- Boss available: yes/no
- Boss result: win/loss/not attempted
- Time to recover HP via label game:
- Top 3 pain points:
1.
2.
3.
- Suggested tuning changes:
1.
2.
3.
```

## Decision Rule After 5 Runs
Only change one balancing axis at a time:
1. Fruit gain/spend
2. HP loss/recovery
3. Boss queue size/composition

After each change, run at least 2 new sessions before the next change.
