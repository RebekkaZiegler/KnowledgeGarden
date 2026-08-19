/* ══════════════════════════════════════════════════════════
   DORF — open-world hub for the Taverne/Alräunchen app.
   Chopping/mining/foraging routes through the real question
   engine (askQuestions/presentEntry from game.js) instead of a
   separate quiz system, so every action here also counts toward
   real chapter mastery and feeds the Alräunchen exactly like the
   other minigames do. World, inventory, skills and settlement
   state live under G.dorf (see defaultState() in game.js) so they
   ride along with the app's existing save/export/import/reset.

   Settlement workshops mirror the real pizza-ingredient roster
   (ALL_INGREDIENTS/RE_TOPPINGS in game.js) — a repaired, staffed
   workshop deposits straight into the real G.inventory, so a
   Käserei genuinely stocks the Kitchen with mozzarella. Only a
   random subset of the roster spawns per settlement, so no single
   village can make every topping — the gap is the reason trade
   between villages will eventually matter.
══════════════════════════════════════════════════════════ */
"use strict";

/* ---------------------------- assets ---------------------------- */
const DORF_TILE_SRC = {
  player:   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABLUlEQVR4nGNgoBAwYhPcv7H5PzZxR/9aDPWM2DQrK6tite3u3dsYhrDgchrzh68o/L8C3FjVMWGzHV0zzMDX997gNwAZ7Nm5FSsbHTCCiMUhSuBAs29oA/tTTVgKq+Kjpy8x/Dy6Gc6PXXOPkRGkWVmQFSzw0yeGAeSFJxPrGeTjyxj2TWgFizsVVDM8XNiFYeDd979RAxGkGeQCdgYGsAaQRhDAphkGWFBMvHsb4gIo/8yMNjAtyglR9vr7H4ZPP/4zwFwMNoDd2pdB3lQPHlUgQz59/4OhEcb/9OM32Hsg8OT0JRwugGqEAZhB2AATtjAgBaAYfbChCsV/xABwOljVnw/PPNbQ8ADFOTLAJh5WOJERJWMURVj+11eVBLMv3n7O0LfiOFgelzhIIQAB4H7VfH6XmgAAAABJRU5ErkJggg==",
  npc:      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABJUlEQVR4nGNgGGjAiE3Q09PzPzbx7du3Y6hnxKZZWFgYq21v377FMIQFl9NyPFRQ+FN23MGqjgldIFiXHaz5yqULcDEQGyQGksPqBY3aSrifS35eZzjwjAesAWYrjO0g9YWhh10TrvlGczsjI0gzv64OXNB63RSGVyzKWJ0r9ucuw9GgHDj/4+UrmF7QV5XEqhmXHBMyB2QiIYCuhgnkZ3TgqvgNjHHxYQCklwXEmPjrNlhg1e0DDAxQZ375/pvBUuIjlM3AwMPJCmZ73T7AEKYOiY0r+NKBgoI8Cv/Ny2dY1eE0AJcGdABOB3PKAsDpoPmtAAO/FiSeiz+cRFHYK2AOpj9eu85QK/wBzE7p2sCIkq7lkxP+wwwAKXw4dwFYHpc4SCEAOJlwEF19ECoAAAAASUVORK5CYII=",
  floor:    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXElEQVR4nGPsPWL6n4ECwESJZtob8P37dww+uhgTPgM4OTkJuoAFl63YNGMTYyJoBaku4CTC2VR1ARPVDPiOFj0khwEnDr8jG0yTWGAiRxOyqzCiER0QSlAUewEAQ18XyB1243kAAAAASUVORK5CYII=",
  tree:     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAnklEQVR4nGP8//8/AyWABZdEaq8xismzi88yYlPHiM0FIM0qhqhid85jN4SJGM0gABJDdxVeL3z+8AuFzyvAhlUdEzbb0TXDDMTmCiZCTkcH6IYw4XL6j69/sLoCayyk4nE6NgAKD1isMKFLgmzGZjsuwITPeTAD0QGyWhZ0SQ5uFrx8dMCY0mNEkv9hABYOGGFAKgAbQKrtyHoodgEAKM9Xy5+VSPEAAAAASUVORK5CYII=",
  item:     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABDElEQVR4nGOsXqvzn4ECwIIuIDbvE5z9KomPoAFM2ARNpThJd4EY1GYhThYEDRUDuQSXy5jQbVYWZGWwTHkOptFdgs1ljKBAfPECIaG37SVY4eln3xkueYmD+TAXgQy9+/43w7vvf+AuYYJplJD4DsbIAMbH5zJGWDSCXIFuAD6XYQSihMR3uAaYs8UYPmGNSphFIPUs2CRgzgbZBnMZyKCtYBlWuGaQOAuyAdiiEuYakLORXQmzjAXdebAAAgUYwxxJcKCBXALTUOG2DEU9C3KAvfDiZLgEC4M5kogAM+BjYHiB6kUODg5MF6DHAnqAIYOXLyFew4gFfAGGDWC4ADmQ0AMMGezatQvMAAD2JoTPnt45mAAAAABJRU5ErkJggg==",
  gem:      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAlUlEQVR4nGP8//8/AyWAiSLdowYMEgNY8EmqFObAE8md/imMZLlAxMoKrzwjtpQIs5mVl4+BX1eH4ePlKwy/P3/C6hIWQjafkM9ksGCYDma/OXaMsAtSppnBBQ7cNgMbBNLooHoKrmZO1im4K7C6QELiO4RxG1PsxQtO/C6AuQJuCBIAaUa2HacByF4BGQSzFV0zSBAAPtc/vKab8PcAAAAASUVORK5CYII=",
  rock:     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAV0lEQVR4nGNcsW37fwYKABMlmqlrACcHB16FIHlsaphgjO8/fmDVRAiw4JNENhSbBSguIBcwDR0DOHEEKBO6IlwKaRaILMTYgg+Q7AJ0L5JsALorKQ4DAEOQFWrsLa1tAAAAAElFTkSuQmCC",
  woodfloor:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAb0lEQVR4nGNcURfyn4eVkQEGvvz+z0AKn4mBQsCEzAGZTipgIVcjVhfwIPkNG8BmEQsxtuBzIRMxNsPksaljQVdEjK0YLkAH2DTjciUTVlEivEXQAGINYaLEdpBXWYhSiUUjXhcQC0AuJcsFVM2NAN9eI+vE5j3RAAAAAElFTkSuQmCC",
  water:    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAARklEQVR4nGNMPnr+PwMFgIkSzbQxQJufhzIDrn78QpkBpAImuhqgjSV8mEgxAFv4MDFQCJiwCZISlUzYBEmJSiaiVQ5fAwCELgwWzSVYvwAAAABJRU5ErkJggg==",
  sand:     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXElEQVR4nGN8dmv/fwYKABMlmmlvwOcPrzD46GJM+AzgFRAj6AIWXLZi04xNjImgFaS6gJcIZ1PVBUxUM+AzWvSQHAa8OPyObDBNYoGJHE3IrsKIRnRAKEFR7AUACEcY2b/QQYgAAAAASUVORK5CYII=",
  villager_quarry:  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABL0lEQVR4nGNgoBAwYhMsirD8j028b8VxDPWM2DTrq0pite3i7ecYhrDgcpqLuzcKf8/OrVjVMaELWJibYWiGGQhyGbr3mHC5ANlGXLaDACOIqCuKgJuqIyvOYG2qh1Vx75Q5YFfc/coG5jf1rWBkBGmWk1fAUOxprMqwb0IrmO1UUM2w/extBtY3t8ABqWVpDxZ/9PAB7kAEafAsqIazQQCkGeSC30jqWJA1gUwUFBJk4OXlB/NXHTgDpmF8kGawC0TUEAbogPxsrArmzHz4AKz48+ePKBph/MdQF7hA1R/99x17LIA0wjQj82EuICoaGbAAWBggA5Qw+PLsIQMr9y+cBsBc4OKOZEBY4UTGVf35GJkH3anINh89fQlMg/SiZAyQQbBEBFIEUoBPHKQQAMIleZXjqjqhAAAAAElFTkSuQmCC",
  villager_sawmill: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABJUlEQVR4nGNgoBAwYhMsirD8j028b8VxDPWM2DTrq0pite3i7ecYhrDgcpq6uh4K/+bNS1jVMWGzHV0zzECQHLr3mHC54MqlC1jZ6IARRCwOUQKb+k/TAOzPMB93rIpXbdkJdgXTdYiBsWvuMTKCNCsLsoIF1nwWYkD2wu0Ni8C0akAcPBxAFoTwvgPz777/jRqIIM0gBaovroL5MIP/HVwOpi9CLWB48Q57GFy8/RyiAAeAWYAMWH4q6TEw6RlAFECdyK+hjdWAizcgFjCpQ8Lo56ULqF6AuUDsKcQLyOCVtDbcBcjRzETIiYS8iGIAKHpgIYwOQK4CycGiEAbA6WBOWQA8delAwwMW8nDD7SPBNHKiSunawIiSMZAzEnLGwSUOUggALyCEUZR/qaEAAAAASUVORK5CYII=",
  villager_farm:    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA/klEQVR4nGNgGGjAiE1w/8bm/9jEHf1rMdQzYtOsrKyK1ba7d29jGMKCTSHzh68MxAImdIHX996A6T07t8LFYGyYHDJgBBFFEZZwP1uYmzFYm+phte3o6UsMJ06egvP7VhxnZAFpdrYxhgu+efmYgYEBuwHf3z1mQFbLwMDwHyMMRMSlUJyPLoc3DN68fMbglNwNVogNg+RAalDCoCjC8r++qiROG7ABmCEXbz/HjAVSARMhm9CdjA5QAvH1hwgGdSMJOF9ICVPDzXMvGBgZ+hAGgOISlg70dFAVIgNkg0F+BwGQXpR0LZ+c8J9fSxPM/njtOsPDuQvA8rjEQQoBPxJkXF9hnCsAAAAASUVORK5CYII="
};
const DORF_IMAGES = {};
let dorfAssetsLoaded = 0;
const DORF_ASSET_TOTAL = Object.keys(DORF_TILE_SRC).length;

/* ---------------------------- constants ---------------------------- */
const DORF_TILE = 16;
const DORF_SCALE = 3;
const DORF_CELL = DORF_TILE * DORF_SCALE;
const DORF_COLS = 15, DORF_ROWS = 10;
const DORF_REGION = 40;

const DORF_T = { GRASS: 0, WATER: 1 };
const DORF_RES = { NONE: 0, TREE: 1, ROCK: 2, GEM: 3, MUSHROOM: 4, BROKEN_BRIDGE: 5, FISH: 6 };
const DORF_BIOME = { FOREST: 0, SNOW: 1, MOUNTAIN: 2, DESERT: 3 };
// Radius (in tiles) around spawn that's always forest, so the Startdorf and
// its immediate surroundings never roll into a biome that feels alien on
// your very first walk.
const DORF_HOME_BIOME_RADIUS = 70;
// Biome regions are much bigger than settlement-search regions so they read
// as real stretches of terrain, not a patchwork.
const DORF_BIOME_NOISE_SCALE = 220;

// Personal gathering (chop/mine/forage) — resource nodes scattered on the
// ground, gated by askQuestions() in dorfTryInteract(). `real:true` means
// the reward lands in the app's actual G.inventory (mushrooms are a genuine
// pizza ingredient); everything else is a Dorf-only building material.
const DORF_RESOURCE_YIELD = {
  [DORF_RES.TREE]:     { item: "holz",      skill: "chopping", real: false },
  [DORF_RES.ROCK]:     { item: "stein",     skill: "mining",    real: false },
  [DORF_RES.GEM]:      { item: "edelstein", skill: "mining",    real: false },
  [DORF_RES.MUSHROOM]: { item: "mushrooms", skill: "foraging",  real: true },
  [DORF_RES.FISH]:     { item: "anchovies", skill: "foraging",  real: true } // Sardellen — a real topping, also covers Garnelen
};
const DORF_ACTION_LABEL = {
  [DORF_RES.TREE]:     "🪓 Baum fällen",
  [DORF_RES.ROCK]:     "⛏️ Fels abbauen",
  [DORF_RES.GEM]:      "💎 Edelstein bergen",
  [DORF_RES.MUSHROOM]: "🍄 Pilze sammeln",
  [DORF_RES.FISH]:     "🎣 Angeln"
};
const DORF_RESPAWN_MS = { [DORF_RES.TREE]: 25000, [DORF_RES.ROCK]: 40000, [DORF_RES.GEM]: 90000, [DORF_RES.MUSHROOM]: 15000, [DORF_RES.FISH]: 20000 };

// Per-biome resource-node odds, checked in order (first match wins), same
// cascading-threshold shape as before — just parameterized per biome so
// e.g. the desert has no trees and the mountains are rock/gem-heavy.
const DORF_BIOME_RESOURCE_TABLE = {
  [DORF_BIOME.FOREST]:   [[0.05, DORF_RES.TREE], [0.056, DORF_RES.ROCK], [0.06, DORF_RES.GEM], [0.10, DORF_RES.MUSHROOM]],
  [DORF_BIOME.SNOW]:     [[0.045, DORF_RES.TREE], [0.05, DORF_RES.ROCK], [0.053, DORF_RES.GEM], [0.065, DORF_RES.MUSHROOM]],
  [DORF_BIOME.MOUNTAIN]: [[0.11, DORF_RES.ROCK], [0.15, DORF_RES.GEM]],
  [DORF_BIOME.DESERT]:   [[0.035, DORF_RES.ROCK], [0.05, DORF_RES.GEM]]
};

const DORF_ITEM_ICON  = { holz: "woodfloor", stein: "rock", edelstein: "gem" };
const DORF_ITEM_LABEL = { holz: "Holz", stein: "Stein", edelstein: "Edelstein", dough: "Teig" };
const DORF_ITEM_EMOJI_FALLBACK = { dough: "🍞" }; // Dorf-only goods with no sprite icon
const DORF_STACK_CAP  = 9999;

// Settlement workshops. `real:true` deposits straight into G.inventory
// using the SAME ingredient id the Kitchen/RE_TOPPINGS system already
// reads (see ALL_INGREDIENTS in game.js) — a repaired Käserei genuinely
// stocks mozzarella for pizza-making. Ham/bacon/sucuk and salami all trace
// back to "salami"/"ham", so one Metzgerei variant covers all three
// toppings, matching how the real kitchen already groups them.
//
// `kind` controls how the tick/collect loop treats the building:
//  - "passive"  (default) — produces `produce` out of thin air, like before.
//  - "processor" — needs `consumes` (an input ingredient + amount) on hand
//    each tick to make progress; produces a Dorf-only intermediate good
//    instead of a real ingredient, since the Kitchen doesn't consume it.
//  - "flavor" — no production loop at all once staffed; exists purely for
//    its own sake (a happy villager, nothing to collect).
const DORF_JOB_TYPES = [
  { id: "sawmill",        label: "Sägewerk",              produce: "holz",       real: false, emoji: "🪵", roof: "#a0622c" },
  { id: "quarry",         label: "Steinbruch",            produce: "stein",      real: false, emoji: "🪨", roof: "#7a7a7a" },
  { id: "farm_wheat",     label: "Kornfeld",              produce: "wheat",      real: true,  emoji: "🌾", roof: "#c9a227" },
  { id: "farm_tomato",    label: "Gärtnerei (Tomate)",    produce: "tomato",     real: true,  emoji: "🍅", roof: "#b5432f" },
  { id: "farm_onion",     label: "Gärtnerei (Zwiebel)",   produce: "onion",      real: true,  emoji: "🧅", roof: "#b5432f" },
  { id: "farm_garlic",    label: "Gärtnerei (Knoblauch)", produce: "garlic",     real: true,  emoji: "🧄", roof: "#b5432f" },
  { id: "farm_pepper",    label: "Gärtnerei (Paprika)",   produce: "bell_pepper",real: true,  emoji: "🫑", roof: "#b5432f" },
  { id: "farm_basil",     label: "Gärtnerei (Basilikum)", produce: "basil",      real: true,  emoji: "🌿", roof: "#b5432f" },
  { id: "farm_olives",    label: "Gärtnerei (Oliven)",    produce: "olives",     real: true,  emoji: "🫒", roof: "#b5432f" },
  { id: "farm_mushroom",  label: "Gärtnerei (Pilze)",     produce: "mushrooms",  real: true,  emoji: "🍄", roof: "#b5432f" },
  { id: "dairy",          label: "Käserei",               produce: "mozzarella", real: true,  emoji: "🧀", roof: "#d8c458" },
  { id: "butcher_ham",    label: "Metzgerei (Schinken)",  produce: "ham",        real: true,  emoji: "🍖", roof: "#8a4a3c" },
  { id: "butcher_salami", label: "Metzgerei (Salami)",    produce: "salami",     real: true,  emoji: "🥩", roof: "#8a4a3c" },
  { id: "fisherman",      label: "Fischerhütte",          produce: "anchovies",  real: true,  emoji: "🐟", roof: "#3c6e8a" },
  { id: "henhouse",       label: "Hühnerstall",           produce: "eggs",       real: true,  emoji: "🥚", roof: "#d8c458" },
  { id: "bakery",         label: "Bäckerei",              produce: "dough",      real: false, emoji: "🍞", roof: "#c9a227",
    kind: "processor", consumes: { item: "wheat", amount: 1, real: true } },
  { id: "flowershop",     label: "Blumenladen",           produce: null,         real: false, emoji: "🌸", roof: "#d888c0",
    kind: "flavor" }
];
const DORF_JOB_TYPE_BY_ID = {};
DORF_JOB_TYPES.forEach(j => { j.kind = j.kind || "passive"; DORF_JOB_TYPE_BY_ID[j.id] = j; });
const DORF_HOUSE_COST     = { holz: 6, stein: 3 };
const DORF_JOB_COST       = { holz: 5, stein: 5 };
const DORF_PORTSTONE_COST = { holz: 4, stein: 8 };
const DORF_BUILDING_PROD_CAP = 30;
// How many distinct workshop types a settlement gets — always fewer than
// the full roster, so villages genuinely lack ingredients. Cities are a
// rarer, bigger settlement tier with more houses and more workshops.
const DORF_JOBS_PER_VILLAGE = 4;
const DORF_JOBS_PER_CITY = 8;
const DORF_CITY_CHANCE = 0.22; // of settlements that spawn at all (excludes the forced Startdorf)

function dorfJobLabel(type) {
  if (type === "house") return "Haus";
  if (type === "portstone") return "Portstein";
  return DORF_JOB_TYPE_BY_ID[type].label;
}
function dorfBuildingCost(type) {
  if (type === "house") return DORF_HOUSE_COST;
  if (type === "portstone") return DORF_PORTSTONE_COST;
  return DORF_JOB_COST;
}
function dorfVillagerNameFor(type) { return dorfJobLabel(type) + "-Bewohner"; }

/* ---------------------------- settlement names ---------------------------- */
const DORF_NAME_PREFIX = [
  "Fichten", "Birken", "Stein", "Nord", "Süd", "Grün", "Tannen", "Wolfs", "Bären", "Eichen",
  "Silber", "Gold", "Nebel", "Sonnen", "Mond", "Fluss", "Tal", "Berg", "Rot", "Schwarz",
  "Weiß", "Dorn", "Hasel", "Lärchen", "Raben", "Fuchs", "Hirsch", "Wind"
];
const DORF_NAME_SUFFIX_VILLAGE = ["dorf", "hausen", "bach", "hain", "au", "weiler", "furt", "heim", "born", "winkel"];
const DORF_NAME_SUFFIX_CITY    = ["burg", "stadt", "feste", "halle", "turm", "brück", "gard", "hafen"];
function dorfNameFor(cx, cy, isCity) {
  const suffixes = isCity ? DORF_NAME_SUFFIX_CITY : DORF_NAME_SUFFIX_VILLAGE;
  const prefix = DORF_NAME_PREFIX[Math.floor(dorfHash2(cx * 7 + 1, cy * 13 + 2, dorfSeed + 7171) * DORF_NAME_PREFIX.length)];
  const suffix = suffixes[Math.floor(dorfHash2(cx * 11 + 3, cy * 17 + 4, dorfSeed + 7272) * suffixes.length)];
  return prefix + suffix;
}

// Real-ingredient display name/emoji piggyback on the app's own ingredient
// table so labels never drift out of sync with the Kitchen.
function dorfItemLabel(id) {
  if (DORF_ITEM_LABEL[id]) return DORF_ITEM_LABEL[id];
  const ing = typeof ALL_INGREDIENTS !== "undefined" ? ALL_INGREDIENTS.find(i => i.id === id) : null;
  return ing ? ing.name : id;
}
function dorfItemEmoji(id) {
  if (DORF_ITEM_EMOJI_FALLBACK[id]) return DORF_ITEM_EMOJI_FALLBACK[id];
  const ing = typeof ALL_INGREDIENTS !== "undefined" ? ALL_INGREDIENTS.find(i => i.id === id) : null;
  return ing ? ing.emoji : "❔";
}

const DORF_SKILL_LABEL = { chopping: "Holzfällen", mining: "Bergbau", foraging: "Sammeln" };

const DORF_DIALOGUE = {
  0: [
    "Oh — hallo. Ich hab dich hier noch nicht gesehen.",
    "Vorsicht beim Wandern, manche Gewässer sind tückisch.",
    "Wenn du was zu tauschen hast, ich bin nicht wählerisch."
  ],
  1: [
    "Schön, dich wiederzusehen.",
    "Wie läuft's mit dem Sammeln?",
    "Ich mag es, wenn hier jemand vorbeischaut."
  ],
  2: [
    "Da bist du ja! Ich hab schon auf dich gewartet.",
    "Ehrlich, du gehörst schon fast zum Inventar hier.",
    "Erzähl, was hast du heute alles gefunden?"
  ],
  3: [
    "Mein Lieblingsmensch in dieser Wildnis.",
    "Ohne dich wär's hier ziemlich still, weißt du das?",
    "Ich hab dir was aufgehoben — nur weil du's bist."
  ]
};

/* ---------------------------- seeded noise ---------------------------- */
function dorfHash2(x, y, seed) {
  let h = (x * 374761393 + y * 668265263 + seed * 2147483647) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h = h ^ (h >>> 16);
  return ((h >>> 0) % 1000000) / 1000000;
}
function dorfSmooth(t) { return t * t * (3 - 2 * t); }
function dorfValueNoise(x, y, seed, scale) {
  const fx = x / scale, fy = y / scale;
  const x0 = Math.floor(fx), y0 = Math.floor(fy);
  const sx = dorfSmooth(fx - x0), sy = dorfSmooth(fy - y0);
  const n00 = dorfHash2(x0, y0, seed),     n10 = dorfHash2(x0 + 1, y0, seed);
  const n01 = dorfHash2(x0, y0 + 1, seed), n11 = dorfHash2(x0 + 1, y0 + 1, seed);
  const ix0 = n00 + (n10 - n00) * sx;
  const ix1 = n01 + (n11 - n01) * sx;
  return ix0 + (ix1 - ix0) * sy;
}
function dorfTileKey(x, y) { return x + "," + y; }

/* ---------------------------- biomes ---------------------------- */
function dorfBiomeAt(x, y) {
  if (Math.abs(x) <= DORF_HOME_BIOME_RADIUS && Math.abs(y) <= DORF_HOME_BIOME_RADIUS) return DORF_BIOME.FOREST;
  const n = dorfValueNoise(x, y, dorfSeed + 31337, DORF_BIOME_NOISE_SCALE);
  if (n < 0.30) return DORF_BIOME.SNOW;
  if (n < 0.62) return DORF_BIOME.FOREST;
  if (n < 0.82) return DORF_BIOME.MOUNTAIN;
  return DORF_BIOME.DESERT;
}
function dorfGroundImage(biome) {
  if (biome === DORF_BIOME.DESERT) return DORF_IMAGES.sand;
  if (biome === DORF_BIOME.MOUNTAIN) return DORF_IMAGES.rock;
  return DORF_IMAGES.floor; // forest + snow (snow gets a colour wash on top, see dorfDrawGround)
}
function dorfDrawGround(biome, sx, sy) {
  dorfCtx.drawImage(dorfGroundImage(biome), sx, sy, DORF_CELL, DORF_CELL);
  if (biome === DORF_BIOME.SNOW) {
    dorfCtx.fillStyle = "rgba(235,245,250,0.72)";
    dorfCtx.fillRect(sx, sy, DORF_CELL, DORF_CELL);
  }
}

/* ---------------------------- map / fog of war ---------------------------- */
// Explored state is tracked at a coarse cell size (not per-tile) so the
// persisted G.dorf.explored object and the minimap/full-map render loops
// both stay cheap even after a long play session. Each cell's display
// color is computed once, the first time it's revealed, and cached —
// re-rendering the map every frame is then just object lookups + fillRect,
// no re-hashing of terrain.
const DORF_EXPLORE_CELL = 4; // tiles per map cell
const DORF_EXPLORE_RADIUS = 9; // tiles revealed around the player per step
function dorfCellColorFor(cx, cy) {
  const tx = cx * DORF_EXPLORE_CELL, ty = cy * DORF_EXPLORE_CELL;
  const tile = dorfGetTile(tx, ty);
  if (tile.special) return "#e8c86a";
  if (tile.building) return tile.building.state.repaired ? "#c98a4a" : "#5a5248";
  if (tile.terrain === DORF_T.WATER) return "#4a90b8";
  switch (tile.biome) {
    case DORF_BIOME.SNOW:     return "#dce8ee";
    case DORF_BIOME.MOUNTAIN: return "#8a8a8a";
    case DORF_BIOME.DESERT:   return "#d8c07a";
    default:                  return "#5a8a44"; // forest
  }
}
function dorfMarkExplored(x, y, radiusTiles) {
  const ccx = Math.floor(x / DORF_EXPLORE_CELL), ccy = Math.floor(y / DORF_EXPLORE_CELL);
  const cellRadius = Math.ceil(radiusTiles / DORF_EXPLORE_CELL);
  for (let dcx = -cellRadius; dcx <= cellRadius; dcx++) {
    for (let dcy = -cellRadius; dcy <= cellRadius; dcy++) {
      if (dcx * dcx + dcy * dcy > cellRadius * cellRadius) continue; // circular reveal
      const key = (ccx + dcx) + "," + (ccy + dcy);
      if (dorfExplored[key]) continue; // already computed once, cheap skip
      dorfExplored[key] = dorfCellColorFor(ccx + dcx, ccy + dcy);
    }
  }
}
function dorfDrawMapView(ctx, w, h, cellPixel, radiusCells) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#0d0d0d";
  ctx.fillRect(0, 0, w, h);
  const pcx = Math.floor(dorfPlayer.x / DORF_EXPLORE_CELL), pcy = Math.floor(dorfPlayer.y / DORF_EXPLORE_CELL);
  const cx0 = w / 2, cy0 = h / 2;
  for (let dcy = -radiusCells; dcy <= radiusCells; dcy++) {
    for (let dcx = -radiusCells; dcx <= radiusCells; dcx++) {
      const color = dorfExplored[(pcx + dcx) + "," + (pcy + dcy)];
      if (!color) continue; // fog — unexplored, leave blank
      ctx.fillStyle = color;
      ctx.fillRect(cx0 + dcx * cellPixel - cellPixel / 2, cy0 + dcy * cellPixel - cellPixel / 2, cellPixel, cellPixel);
    }
  }
  ctx.fillStyle = "#ffce54";
  ctx.beginPath(); ctx.arc(cx0, cy0, Math.max(2, cellPixel * 0.6), 0, Math.PI * 2); ctx.fill();
}

let dorfMapOpen = false;
function dorfToggleMap() {
  dorfMapOpen = !dorfMapOpen;
  document.getElementById("dorf-mapOverlay").classList.toggle("dorf-show", dorfMapOpen);
}

/* ---------------------------- settlements ---------------------------- */
function dorfPickJobTypes(cx, cy, count) {
  const pool = DORF_JOB_TYPES.slice();
  const picked = [];
  for (let i = 0; i < count && pool.length; i++) {
    const r = dorfHash2(cx * 31 + i * 7, cy * 37 + i * 11, dorfSeed + 4242);
    const idx = Math.floor(r * pool.length);
    picked.push(pool.splice(idx, 1)[0]);
  }
  return picked;
}

// Village: 2 houses / 4 workshops. City: 4 houses / 8 workshops, roughly
// twice the footprint — rarer, and never the forced Startdorf, so your
// first village stays small and easy to read.
const DORF_VILLAGE_TEMPLATE = [
  { dx: -2, dy: -1, kind: "house" },
  { dx: 2, dy: -1, kind: "house" },
  { dx: -3, dy: 1, kind: "job" },
  { dx: -1, dy: 1, kind: "job" },
  { dx: 1, dy: 1, kind: "job" },
  { dx: 3, dy: 1, kind: "job" }
];
const DORF_CITY_TEMPLATE = [
  { dx: -4, dy: -2, kind: "house" },
  { dx: 4, dy: -2, kind: "house" },
  { dx: -4, dy: 2, kind: "house" },
  { dx: 4, dy: 2, kind: "house" },
  { dx: -2, dy: -3, kind: "job" },
  { dx: 0, dy: -3, kind: "job" },
  { dx: 2, dy: -3, kind: "job" },
  { dx: -3, dy: 0, kind: "job" },
  { dx: 3, dy: 0, kind: "job" },
  { dx: -2, dy: 3, kind: "job" },
  { dx: 0, dy: 3, kind: "job" },
  { dx: 2, dy: 3, kind: "job" }
];

function dorfSettlementAt(rx, ry) {
  const forced = rx === 0 && ry === 0; // guarantee a Startdorf near spawn
  const h = dorfHash2(rx, ry, dorfSeed + 7777);
  if (!forced && h >= 0.3) return null;
  const cxOff = 8 + Math.floor(dorfHash2(rx * 3 + 1, ry * 5 + 2, dorfSeed + 8888) * (DORF_REGION - 16));
  const cyOff = 8 + Math.floor(dorfHash2(rx * 7 + 3, ry * 11 + 4, dorfSeed + 8889) * (DORF_REGION - 16));
  const cx = rx * DORF_REGION + cxOff, cy = ry * DORF_REGION + cyOff;

  const isCity = !forced && dorfHash2(rx * 5 + 2, ry * 9 + 4, dorfSeed + 6060) < DORF_CITY_CHANCE;
  const template = isCity ? DORF_CITY_TEMPLATE : DORF_VILLAGE_TEMPLATE;
  const jobCount = isCity ? DORF_JOBS_PER_CITY : DORF_JOBS_PER_VILLAGE;

  // Fixed layout — always exactly this many pre-broken buildings, tapped
  // to repair. No free-form building menu.
  const jobPicks = dorfPickJobTypes(cx, cy, jobCount);
  let jobIndex = 0;
  const slots = template.map(t => {
    if (t.kind === "house") return { x: cx + t.dx, y: cy + t.dy, type: "house" };
    const job = jobPicks[jobIndex++];
    return { x: cx + t.dx, y: cy + t.dy, type: job.id };
  });
  // Every settlement also gets a Portstein — not drawn from the job pool,
  // always present, its own repair-then-teleport behavior (see
  // dorfHandleBuildingInteract). Sits opposite the Alräunchenzimmer so it
  // never collides with either template's house/job offsets.
  slots.push({ x: cx, y: cy + 2, type: "portstone" });

  return {
    id: "s_" + rx + "_" + ry,
    name: dorfNameFor(cx, cy, isCity),
    size: isCity ? "city" : "village",
    center: { x: cx, y: cy },
    tavern: { x: cx, y: cy },
    alraunchen: { x: cx, y: cy - 2 },
    slots
  };
}
const dorfSettlementCache = {};
function dorfSettlementForTile(x, y) {
  const rx = Math.floor(x / DORF_REGION), ry = Math.floor(y / DORF_REGION);
  const key = rx + "," + ry;
  if (!(key in dorfSettlementCache)) dorfSettlementCache[key] = dorfSettlementAt(rx, ry);
  return dorfSettlementCache[key];
}
function dorfBuildingAt(x, y) {
  const st = dorfSettlementForTile(x, y);
  if (!st) return null;
  return st.slots.find(s => s.x === x && s.y === y) || null;
}
function dorfSpecialAt(x, y) {
  const st = dorfSettlementForTile(x, y);
  if (!st) return null;
  if (x === st.tavern.x && y === st.tavern.y) return "tavern";
  if (x === st.alraunchen.x && y === st.alraunchen.y) return "alraunchen";
  return null;
}

function dorfGetBuildingState(key, kind) {
  if (!dorfBuildingState[key]) {
    dorfBuildingState[key] = kind === "house"
      ? { repaired: false, occupants: 0, capacity: 2 }
      : { repaired: false, hired: false, housed: false, prodAccum: 0 };
  }
  return dorfBuildingState[key];
}

function dorfHandleBuildingInteract(x, y, b) {
  const key = dorfTileKey(x, y);
  const st = b.state;
  if (!st.repaired) {
    const cost = dorfBuildingCost(b.type);
    if (dorfHasItems(cost)) {
      dorfSpendItems(cost);
      st.repaired = true;
      if (b.type !== "house" && b.type !== "portstone") st.hired = true; // a villager claims the job right away
      if (b.type === "portstone") dorfRegisterPortstone(x, y);
      dorfToast(dorfJobLabel(b.type) + " repariert!");
      saveState();
    } else {
      const need = Object.entries(cost).map(([k, v]) => v + " " + dorfItemLabel(k)).join(", ");
      dorfToast("Brauchst " + need + " zum Reparieren.");
    }
    return;
  }
  if (b.type === "house") {
    dorfToast("Haus: " + st.occupants + "/" + st.capacity + " bewohnt.");
    return;
  }
  if (b.type === "portstone") { dorfOpenTeleportMenu(x, y); return; }
  if (!st.housed) {
    dorfToast(dorfVillagerNameFor(b.type) + " braucht noch ein Zuhause in der Nähe.");
    return;
  }
  const job = DORF_JOB_TYPE_BY_ID[b.type];
  if (job.kind === "flavor") {
    dorfToast(dorfVillagerNameFor(b.type) + " winkt fröhlich — hier gibt's nichts einzusammeln, nur gute Laune.");
    return;
  }
  if (st.prodAccum > 0) {
    if (job.real) {
      G.inventory[job.produce] = (G.inventory[job.produce] || 0) + st.prodAccum;
    } else {
      dorfAddItem(job.produce, st.prodAccum);
    }
    dorfToast("+" + st.prodAccum + " " + dorfItemLabel(job.produce) + " eingesammelt.");
    st.prodAccum = 0;
    saveState();
  } else if (job.kind === "processor") {
    dorfToast(dorfVillagerNameFor(b.type) + " wartet auf " + dorfItemLabel(job.consumes.item) + ".");
  } else {
    dorfToast(dorfVillagerNameFor(b.type) + " arbeitet noch...");
  }
}

function dorfRunSettlementTick() {
  if (!dorfBooted) return;
  let changed = false;
  for (const key in dorfBuildingState) {
    const [xs, ys] = key.split(",").map(Number);
    const bld = dorfBuildingAt(xs, ys);
    if (!bld || bld.type === "house") continue;
    const st = dorfBuildingState[key];
    // Portstones never get `hired` set (see dorfHandleBuildingInteract), so
    // they fall out here too — no production loop, nothing more to do.
    if (!st.repaired || !st.hired) continue;
    if (!st.housed) {
      const settlement = dorfSettlementForTile(xs, ys);
      if (settlement) {
        for (const slot of settlement.slots) {
          if (slot.type !== "house") continue;
          const hState = dorfGetBuildingState(dorfTileKey(slot.x, slot.y), "house");
          if (hState.repaired && hState.occupants < hState.capacity) {
            hState.occupants++;
            st.housed = true;
            dorfToast(dorfVillagerNameFor(bld.type) + " ist eingezogen — die Arbeit geht los!");
            changed = true;
            break;
          }
        }
      }
      if (!st.housed) continue;
    }
    const job = DORF_JOB_TYPE_BY_ID[bld.type];
    if (job.kind === "flavor") continue; // staffed and content, nothing to tick
    if (job.kind === "processor") {
      const c = job.consumes;
      const have = c.real ? (G.inventory[c.item] || 0) : (dorfInventory[c.item] || 0);
      if (have < c.amount) continue; // no input on hand this tick, no progress
      if (c.real) G.inventory[c.item] -= c.amount; else dorfInventory[c.item] -= c.amount;
    }
    st.prodAccum = Math.min(DORF_BUILDING_PROD_CAP, st.prodAccum + 1);
    changed = true;
  }
  if (changed) saveState();
}
setInterval(dorfRunSettlementTick, 5000);

/* ---------------------------- world tiles ---------------------------- */
function dorfGenerateTile(x, y) {
  const biome = dorfBiomeAt(x, y);
  const n = dorfValueNoise(x, y, dorfSeed, 9);
  const terrain = n < 0.24 ? DORF_T.WATER : DORF_T.GRASS;
  let resource = DORF_RES.NONE;
  if (terrain === DORF_T.GRASS) {
    const r = dorfHash2(x * 13 + 7, y * 29 + 3, dorfSeed + 999);
    const table = DORF_BIOME_RESOURCE_TABLE[biome];
    for (const [thresh, res] of table) { if (r < thresh) { resource = res; break; } }
  } else {
    const r = dorfHash2(x * 41 + 5, y * 17 + 11, dorfSeed + 555);
    if (r < 0.02) resource = DORF_RES.BROKEN_BRIDGE;
    else if (r < 0.10) resource = DORF_RES.FISH;
  }
  return { terrain, resource, biome };
}

function dorfGetTile(x, y) {
  const key = dorfTileKey(x, y);
  const biome = dorfBiomeAt(x, y);

  const special = dorfSpecialAt(x, y);
  if (special) return { terrain: DORF_T.GRASS, resource: DORF_RES.NONE, special, biome };

  const bld = dorfBuildingAt(x, y);
  if (bld) {
    return { terrain: DORF_T.GRASS, resource: DORF_RES.NONE, building: { type: bld.type, state: dorfGetBuildingState(key, bld.type) }, biome };
  }

  const ov = dorfOverrides[key];
  const base = dorfGenerateTile(x, y);
  if (!ov) return base;
  if (ov.respawnAt && Date.now() >= ov.respawnAt) {
    delete dorfOverrides[key];
    return base;
  }
  if (ov.built) return { terrain: DORF_T.GRASS, resource: DORF_RES.NONE, built: ov.built, biome };
  if (ov.repaired) return { terrain: DORF_T.GRASS, resource: DORF_RES.NONE, built: "floor", biome };
  if (ov.depleted) return { terrain: base.terrain, resource: DORF_RES.NONE, biome };
  return base;
}

function dorfIsWalkable(x, y) {
  const t = dorfGetTile(x, y);
  if (t.special) return true;
  if (t.building) return t.building.state.repaired;
  if (t.built) return true; // only "floor" is ever set (repaired bridges)
  if (t.terrain === DORF_T.WATER) return false;
  if (t.resource === DORF_RES.TREE || t.resource === DORF_RES.ROCK) return false;
  return true;
}

/* ---------------------------- skills / inventory ---------------------------- */
function dorfXpForLevel(lv) { return lv * 60; }
function dorfGainXp(skillId, amount) {
  const s = dorfSkills[skillId];
  s.xp += amount;
  const need = dorfXpForLevel(s.level);
  if (s.xp >= need) {
    s.xp -= need;
    s.level++;
    dorfToast(DORF_SKILL_LABEL[skillId] + " ist jetzt Level " + s.level + "!");
  }
  dorfRenderSkillBar();
}
function dorfYieldFor(skillId) { return Math.min(4, dorfSkills[skillId].level); }

function dorfAddItem(id, n) {
  dorfInventory[id] = Math.min(DORF_STACK_CAP, (dorfInventory[id] || 0) + n);
  dorfRenderInventory();
}
function dorfHasItems(cost) {
  for (const k in cost) if ((dorfInventory[k] || 0) < cost[k]) return false;
  return true;
}
function dorfSpendItems(cost) {
  for (const k in cost) dorfInventory[k] -= cost[k];
  dorfRenderInventory();
}

/* ---------------------------- NPC (Lio) ---------------------------- */
let dorfNpc = null; // built in dorfBoot() once G is available

function dorfNpcTier() {
  const r = dorfNpc.memory.relationship;
  if (r >= 15) return 3;
  if (r >= 8) return 2;
  if (r >= 3) return 1;
  return 0;
}
function dorfNpcGreeting() {
  const mem = dorfNpc.memory;
  mem.timesTalked++;
  mem.relationship += 1;

  if (mem.flags.choppedNearby && !mem.flags.mentionedChop) {
    mem.flags.mentionedChop = true;
    return "Hey — hab dich vorhin Bäume fällen gehört, ganz schön nah dran hier!";
  }
  if (mem.flags.repairedBridge && !mem.flags.mentionedRepair) {
    mem.flags.mentionedRepair = true;
    return "Das mit der Brücke, die du repariert hast — danke dafür, wirklich.";
  }
  if (mem.lastComment) {
    const item = mem.lastComment;
    mem.lastComment = null;
    return "Das " + dorfItemLabel(item) + " von letztens war klasse, danke nochmal.";
  }
  const lines = DORF_DIALOGUE[dorfNpcTier()];
  return lines[mem.timesTalked % lines.length];
}
function dorfNpcOnGift(itemId) {
  const mem = dorfNpc.memory;
  mem.gifts[itemId] = (mem.gifts[itemId] || 0) + 1;
  mem.relationship += 3;
  mem.lastComment = itemId;
  dorfToast(dorfNpc.name + " freut sich über dein Geschenk!");
}
function dorfNotifyNpcOfAction(x, y, kind) {
  const d = Math.abs(x - dorfNpc.homeX) + Math.abs(y - dorfNpc.homeY);
  if (d <= 4 && kind === "chop") dorfNpc.memory.flags.choppedNearby = true;
}

/* ---------------------------- interaction ---------------------------- */
let dorfLastDir = { dx: 0, dy: -1 };

function dorfTryInteract() {
  const fx = dorfPlayer.x + (dorfLastDir.dx || 0);
  const fy = dorfPlayer.y + (dorfLastDir.dy || 0);

  if (fx === dorfNpc.x && fy === dorfNpc.y) { dorfOpenDialogue(); return; }

  const key = dorfTileKey(fx, fy);
  const tile = dorfGetTile(fx, fy);

  if (tile.special === "tavern") { switchTopTab("games"); return; }
  if (tile.special === "alraunchen") { switchTopTab("tama"); return; }

  if (tile.building) { dorfHandleBuildingInteract(fx, fy, tile.building); return; }

  if (tile.resource === DORF_RES.BROKEN_BRIDGE) {
    if (dorfHasItems({ holz: 3 })) {
      dorfSpendItems({ holz: 3 });
      dorfOverrides[key] = { repaired: true };
      dorfNpc.memory.flags.repairedBridge = true;
      dorfToast("Brücke repariert! (-3 Holz)");
      saveState();
    } else {
      dorfToast("Brauchst 3 Holz, um das zu reparieren.");
    }
    return;
  }

  const info = DORF_RESOURCE_YIELD[tile.resource];
  if (info) {
    const label = DORF_ACTION_LABEL[tile.resource];
    askQuestions(label, 1, () => {
      const amount = dorfYieldFor(info.skill);
      if (info.real) {
        G.inventory[info.item] = (G.inventory[info.item] || 0) + amount;
      } else {
        dorfAddItem(info.item, amount);
      }
      dorfGainXp(info.skill, 10);
      dorfOverrides[key] = { depleted: true, respawnAt: Date.now() + DORF_RESPAWN_MS[tile.resource] };
      if (tile.resource === DORF_RES.TREE) dorfNotifyNpcOfAction(fx, fy, "chop");
      dorfToast("+" + amount + " " + dorfItemLabel(info.item));
      saveState();
    });
  }
}

/* ---------------------------- dialogue UI ---------------------------- */
let dorfDialogueOpen = false;
let dorfDlgEl, dorfDlgWho, dorfDlgLine, dorfDlgOpts;

function dorfOpenDialogue() {
  dorfDialogueOpen = true;
  dorfDlgWho.textContent = dorfNpc.name;
  dorfDlgLine.textContent = dorfNpcGreeting();
  dorfDlgOpts.innerHTML = "";

  Object.keys(dorfInventory).filter(k => (dorfInventory[k] || 0) > 0).forEach(itemId => {
    const btn = document.createElement("button");
    btn.textContent = "Schenke " + dorfItemLabel(itemId);
    btn.onclick = () => {
      dorfInventory[itemId]--;
      dorfRenderInventory();
      dorfNpcOnGift(itemId);
      dorfDlgLine.textContent = "Danke für das " + dorfItemLabel(itemId) + "!";
      dorfDlgOpts.innerHTML = "";
      const closeBtn = document.createElement("button");
      closeBtn.textContent = "Tschüss";
      closeBtn.onclick = dorfCloseDialogue;
      dorfDlgOpts.appendChild(closeBtn);
      saveState();
    };
    dorfDlgOpts.appendChild(btn);
  });
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Tschüss";
  closeBtn.onclick = dorfCloseDialogue;
  dorfDlgOpts.appendChild(closeBtn);

  dorfDlgEl.classList.add("dorf-show");
  saveState();
}
function dorfCloseDialogue() {
  dorfDialogueOpen = false;
  dorfDlgEl.classList.remove("dorf-show");
}

/* ---------------------------- portstones (fast travel) ---------------------------- */
function dorfRegisterPortstone(x, y) {
  const settlement = dorfSettlementForTile(x, y);
  if (!settlement) return;
  dorfPortstones[settlement.id] = { x, y, name: settlement.name, size: settlement.size };
}

function dorfTeleportTo(dest) {
  dorfPlayer.x = dest.x; dorfPlayer.y = dest.y;
  dorfPlayer.px = dorfPlayer.x * DORF_CELL; dorfPlayer.py = dorfPlayer.y * DORF_CELL;
  dorfPlayer.moving = false;
  dorfPendingPath = null; dorfPendingInteractTarget = null;
  dorfMarkExplored(dorfPlayer.x, dorfPlayer.y, DORF_EXPLORE_RADIUS);
  dorfToast("Nach " + dest.name + " teleportiert!");
  dorfCloseDialogue();
  saveState();
}

function dorfOpenTeleportMenu(x, y) {
  const here = dorfSettlementForTile(x, y);
  dorfDialogueOpen = true;
  dorfDlgWho.textContent = "🗿 Portstein" + (here ? " · " + here.name : "");
  dorfDlgOpts.innerHTML = "";

  const destinations = Object.entries(dorfPortstones).filter(([id]) => !here || id !== here.id);
  if (!destinations.length) {
    dorfDlgLine.textContent = "Noch keine anderen aktiven Portsteine bekannt — erst andernorts einen reparieren.";
  } else {
    dorfDlgLine.textContent = "Wohin möchtest du reisen?";
    destinations.forEach(([, dest]) => {
      const btn = document.createElement("button");
      btn.textContent = (dest.size === "city" ? "🏙️ " : "🏘️ ") + dest.name;
      btn.onclick = () => dorfTeleportTo(dest);
      dorfDlgOpts.appendChild(btn);
    });
  }
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Abbrechen";
  closeBtn.onclick = dorfCloseDialogue;
  dorfDlgOpts.appendChild(closeBtn);

  dorfDlgEl.classList.add("dorf-show");
}

/* ---------------------------- pathfinding / click-to-move ---------------------------- */
const DORF_PATH_DIRS = [{ dx: 0, dy: -1 }, { dx: 0, dy: 1 }, { dx: -1, dy: 0 }, { dx: 1, dy: 0 }];
const DORF_PATH_MAX_STEPS = 40;

function dorfIsBlockedByNpc(x, y) { return x === dorfNpc.x && y === dorfNpc.y; }

// Breadth-first search on the walkable grid. `goalTest(x,y)` decides when
// a node counts as "arrived" — either the exact target tile, or any tile
// orthogonally adjacent to it (for tiles you can't stand on, like a tree).
function dorfBfsPath(sx, sy, goalTest, maxSteps) {
  if (goalTest(sx, sy)) return [];
  const visited = new Set([sx + "," + sy]);
  const queue = [{ x: sx, y: sy, path: [] }];
  let head = 0;
  while (head < queue.length) {
    const cur = queue[head++];
    if (cur.path.length >= maxSteps) continue;
    for (const d of DORF_PATH_DIRS) {
      const nx = cur.x + d.dx, ny = cur.y + d.dy;
      const key = nx + "," + ny;
      if (visited.has(key)) continue;
      visited.add(key);
      if (!dorfIsWalkable(nx, ny) || dorfIsBlockedByNpc(nx, ny)) continue;
      const path = cur.path.concat([d]);
      if (goalTest(nx, ny)) return path;
      queue.push({ x: nx, y: ny, path });
    }
  }
  return null; // unreachable within maxSteps
}

let dorfPendingPath = null;
let dorfPendingInteractTarget = null;

function dorfAdvancePath() {
  if (!dorfPendingPath || !dorfPendingPath.length) {
    dorfPendingPath = null;
    if (dorfPendingInteractTarget) {
      const t = dorfPendingInteractTarget;
      dorfPendingInteractTarget = null;
      dorfLastDir = { dx: t.x - dorfPlayer.x, dy: t.y - dorfPlayer.y };
      if (Math.abs(dorfLastDir.dx) + Math.abs(dorfLastDir.dy) === 1) dorfTryInteract();
    }
    return;
  }
  const step = dorfPendingPath.shift();
  const nx = dorfPlayer.x + step.dx, ny = dorfPlayer.y + step.dy;
  if (!dorfIsWalkable(nx, ny) || dorfIsBlockedByNpc(nx, ny)) {
    dorfPendingPath = null;
    dorfPendingInteractTarget = null;
    dorfToast("Weg blockiert.");
    return;
  }
  dorfTryMove(step.dx, step.dy);
}

// Tapped tile is a resource/building/NPC/special — walk adjacent to it,
// then interact automatically. Tapped tile is plain ground — just walk
// there. Cancels/replaces whatever path was already in progress.
// A single tap only ever walks (adjacent, for something you'd interact
// with — right up to it, for open ground); the actual chop/mine/talk/
// repair only fires on a second tap on the SAME tile within the window
// below, so one accidental tap near a tree never silently spends an
// action. Also caps how far a single tap can send the player, so tapping
// anywhere on screen doesn't feel like it "does something" everywhere.
const DORF_CLICK_MOVE_RADIUS = 12;
const DORF_DOUBLE_TAP_MS = 500;
let dorfLastTapTarget = null;
let dorfLastTapTime = 0;

function dorfHandleWorldClick(wx, wy) {
  if (!dorfCanAct()) return;
  if (wx === dorfPlayer.x && wy === dorfPlayer.y) return;

  if (Math.abs(wx - dorfPlayer.x) + Math.abs(wy - dorfPlayer.y) > DORF_CLICK_MOVE_RADIUS) {
    dorfToast("Zu weit weg.");
    return;
  }

  const tile = dorfGetTile(wx, wy);
  const isNpcTile = wx === dorfNpc.x && wy === dorfNpc.y;
  const interactable = isNpcTile || tile.special ||
    tile.building || (tile.resource && tile.resource !== DORF_RES.NONE);

  if (interactable) {
    const now = performance.now();
    const isDoubleTap = dorfLastTapTarget && dorfLastTapTarget.x === wx && dorfLastTapTarget.y === wy &&
      (now - dorfLastTapTime) < DORF_DOUBLE_TAP_MS;
    dorfLastTapTarget = { x: wx, y: wy };
    dorfLastTapTime = now;

    const goal = (x, y) => Math.abs(x - wx) + Math.abs(y - wy) === 1;
    const alreadyAdjacent = goal(dorfPlayer.x, dorfPlayer.y);

    if (!isDoubleTap) {
      if (alreadyAdjacent) return; // first tap while already standing next to it: wait for the confirming second tap
      const path = dorfBfsPath(dorfPlayer.x, dorfPlayer.y, goal, DORF_PATH_MAX_STEPS);
      if (!path) { dorfToast("Kein Weg dorthin."); return; }
      dorfPendingPath = path;
      dorfPendingInteractTarget = null; // walk only — no auto-interact on the first tap
      dorfAdvancePath();
      return;
    }

    if (alreadyAdjacent) {
      dorfLastDir = { dx: wx - dorfPlayer.x, dy: wy - dorfPlayer.y };
      dorfTryInteract();
      return;
    }
    const path = dorfBfsPath(dorfPlayer.x, dorfPlayer.y, goal, DORF_PATH_MAX_STEPS);
    if (!path) { dorfToast("Kein Weg dorthin."); return; }
    dorfPendingPath = path;
    dorfPendingInteractTarget = { x: wx, y: wy };
    dorfAdvancePath();
    return;
  }

  if (dorfIsWalkable(wx, wy) && !isNpcTile) {
    const goal = (x, y) => x === wx && y === wy;
    const path = dorfBfsPath(dorfPlayer.x, dorfPlayer.y, goal, DORF_PATH_MAX_STEPS);
    if (!path) { dorfToast("Kein Weg dorthin."); return; }
    dorfPendingPath = path;
    dorfPendingInteractTarget = null;
    dorfAdvancePath();
  }
}

function dorfSetupCanvasClick() {
  dorfCanvas.addEventListener("click", (e) => {
    if (!dorfCanAct()) return;
    const rect = dorfCanvas.getBoundingClientRect();
    const scaleX = dorfCanvas.width / rect.width, scaleY = dorfCanvas.height / rect.height;
    const mx = (e.clientX - rect.left) * scaleX, my = (e.clientY - rect.top) * scaleY;
    const worldX = Math.floor((dorfCamX + mx) / DORF_CELL);
    const worldY = Math.floor((dorfCamY + my) / DORF_CELL);
    dorfHandleWorldClick(worldX, worldY);
  });
}

/* ---------------------------- toasts / bars ---------------------------- */
function dorfToast(msg) {
  const el = document.createElement("div");
  el.className = "dorf-toast";
  el.textContent = msg;
  document.getElementById("dorf-toasts").appendChild(el);
  setTimeout(() => el.remove(), 3000);
}
function dorfRenderSkillBar() {
  const el = document.getElementById("dorf-skillBar");
  el.innerHTML = "";
  for (const id in dorfSkills) {
    const s = dorfSkills[id];
    const need = dorfXpForLevel(s.level);
    const row = document.createElement("div");
    row.className = "dorf-skillRow";
    row.innerHTML = `<span>${DORF_SKILL_LABEL[id]} Lv${s.level}</span><span class="dorf-bar"><span class="dorf-fill" style="width:${Math.floor(100 * s.xp / need)}%"></span></span>`;
    el.appendChild(row);
  }
}
function dorfRenderInventory() {
  const el = document.getElementById("dorf-invBar");
  el.innerHTML = "";
  // Dorf-only goods — sprite icon where we have one (holz/stein/edelstein),
  // emoji fallback for newer Dorf-only intermediates like Teig.
  Object.keys(dorfInventory).filter(k => dorfInventory[k] > 0).forEach(id => {
    const slot = document.createElement("div");
    slot.className = "dorf-slot";
    if (DORF_ITEM_ICON[id]) {
      const img = document.createElement("img");
      img.src = DORF_TILE_SRC[DORF_ITEM_ICON[id]];
      slot.appendChild(img);
    } else {
      const emoji = document.createElement("div");
      emoji.className = "dorf-emoji";
      emoji.textContent = dorfItemEmoji(id);
      slot.appendChild(emoji);
    }
    const count = document.createElement("div");
    count.className = "dorf-count";
    count.textContent = dorfInventory[id];
    slot.appendChild(count);
    el.appendChild(slot);
  });
  // ...plus real pizza ingredients this session has actually touched, so
  // gathering/collecting still gives visible feedback even though the
  // amount really lives in G.inventory (shared with the Kitchen).
  if (typeof G !== "undefined" && G.inventory) {
    DORF_JOB_TYPES.filter(j => j.real).map(j => j.produce)
      .concat(["mushrooms"])
      .filter((id, i, arr) => arr.indexOf(id) === i)
      .filter(id => (G.inventory[id] || 0) > 0)
      .forEach(id => {
        const slot = document.createElement("div");
        slot.className = "dorf-slot";
        const emoji = document.createElement("div");
        emoji.className = "dorf-emoji";
        emoji.textContent = dorfItemEmoji(id);
        slot.appendChild(emoji);
        const count = document.createElement("div");
        count.className = "dorf-count";
        count.textContent = G.inventory[id];
        slot.appendChild(count);
        el.appendChild(slot);
      });
  }
}

/* ---------------------------- input ---------------------------- */
// Only act while the Dorf tab is actually visible and neither Lio's chat
// nor the real question modal (shared with every other minigame) is open.
function dorfCanAct() {
  const screen = document.getElementById("screen-dorf");
  if (!screen || screen.hidden) return false;
  if (dorfDialogueOpen) return false;
  if (dorfMapOpen) return false;
  const qModal = document.getElementById("modal-question");
  if (qModal && !qModal.hidden) return false;
  return true;
}

function dorfTryMove(dx, dy) {
  if (dorfPlayer.moving || !dorfCanAct()) return;
  dorfLastDir = { dx, dy };
  if (dx !== 0) dorfPlayer.facing = dx;
  const nx = dorfPlayer.x + dx, ny = dorfPlayer.y + dy;
  if (nx === dorfNpc.x && ny === dorfNpc.y) return;
  if (!dorfIsWalkable(nx, ny)) return;

  dorfPlayer.moving = true;
  const startX = dorfPlayer.px, startY = dorfPlayer.py;
  const endX = nx * DORF_CELL, endY = ny * DORF_CELL;
  const dur = 130;
  const t0 = performance.now();
  function step(now) {
    const t = Math.min(1, (now - t0) / dur);
    dorfPlayer.px = startX + (endX - startX) * t;
    dorfPlayer.py = startY + (endY - startY) * t;
    dorfPlayer.bob = Math.sin(t * Math.PI) * 3;
    if (t < 1) requestAnimationFrame(step);
    else {
      dorfPlayer.x = nx; dorfPlayer.y = ny; dorfPlayer.bob = 0; dorfPlayer.moving = false;
      dorfMarkExplored(nx, ny, DORF_EXPLORE_RADIUS);
      if (dorfPendingPath) dorfAdvancePath();
    }
  }
  requestAnimationFrame(step);
}

function dorfSetupMapControls() {
  document.getElementById("dorf-minimap").addEventListener("click", () => { if (dorfCanAct()) dorfToggleMap(); });
  document.getElementById("dorf-mapCloseBtn").addEventListener("click", dorfToggleMap);
}

function dorfSetupKeyboard() {
  window.addEventListener("keydown", (e) => {
    const screen = document.getElementById("screen-dorf");
    if (!screen || screen.hidden) return;
    if (e.key === "m" || e.key === "M") { dorfToggleMap(); return; }
    if (!dorfCanAct()) return;
    if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(e.key)) e.preventDefault();

    if (e.key === "e" || e.key === "E" || e.key === " ") { dorfPendingPath = null; dorfPendingInteractTarget = null; dorfTryInteract(); return; }

    const moves = {
      ArrowUp: [0, -1], w: [0, -1], W: [0, -1],
      ArrowDown: [0, 1], s: [0, 1], S: [0, 1],
      ArrowLeft: [-1, 0], a: [-1, 0], A: [-1, 0],
      ArrowRight: [1, 0], d: [1, 0], D: [1, 0]
    };
    if (moves[e.key]) {
      dorfPendingPath = null; dorfPendingInteractTarget = null; // manual input overrides any click-to-move path
      dorfTryMove(moves[e.key][0], moves[e.key][1]);
    }
  });
}

/* ---------------------------- NPC wander ---------------------------- */
function dorfUpdateNpc(dtMs) {
  dorfNpc.wanderTimer -= dtMs;
  if (dorfNpc.wanderTimer <= 0) {
    dorfNpc.wanderTimer = 1800 + Math.random() * 2200;
    const dirs = [[1,0],[-1,0],[0,1],[0,-1],[0,0],[0,0]];
    const [dx, dy] = dirs[Math.floor(Math.random() * dirs.length)];
    const nx = dorfNpc.x + dx, ny = dorfNpc.y + dy;
    const withinHome = Math.abs(nx - dorfNpc.homeX) <= 2 && Math.abs(ny - dorfNpc.homeY) <= 2;
    if (withinHome && dorfIsWalkable(nx, ny) && !(nx === dorfPlayer.x && ny === dorfPlayer.y)) {
      dorfNpc.x = nx; dorfNpc.y = ny;
      if (dx !== 0) dorfNpc.facing = dx;
    }
  }
}

/* ---------------------------- render ---------------------------- */
let dorfCanvas, dorfCtx, dorfCamX = 0, dorfCamY = 0;
let dorfMinimapCanvas, dorfMinimapCtx, dorfMapCanvas, dorfMapCtx;

// Simple deterministic string hash, used only to pick a villager sprite —
// we have 3 base sprites and 15 job types, so this just adds some visual
// variety without needing a dedicated sprite per profession.
function dorfStrHash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}
const DORF_VILLAGER_SPRITES = ["villager_sawmill", "villager_quarry", "villager_farm"];
function dorfVillagerSpriteFor(type) {
  return DORF_IMAGES[DORF_VILLAGER_SPRITES[dorfStrHash(type) % DORF_VILLAGER_SPRITES.length]];
}

function dorfDrawBuildingTile(b, sx, sy, biome) {
  dorfDrawGround(biome, sx, sy);
  const st = b.state;
  if (!st.repaired) {
    dorfCtx.fillStyle = "rgba(90,80,70,0.55)";
    dorfCtx.fillRect(sx + 4, sy + 10, DORF_CELL - 8, DORF_CELL - 14);
    dorfCtx.strokeStyle = "#c0392b"; dorfCtx.lineWidth = 2;
    dorfCtx.beginPath();
    dorfCtx.moveTo(sx + 10, sy + 10); dorfCtx.lineTo(sx + DORF_CELL - 10, sy + DORF_CELL - 10);
    dorfCtx.moveTo(sx + DORF_CELL - 10, sy + 10); dorfCtx.lineTo(sx + 10, sy + DORF_CELL - 10);
    dorfCtx.stroke();
    return;
  }
  if (b.type === "house") {
    dorfCtx.fillStyle = "#8a5a3c";
    dorfCtx.beginPath();
    dorfCtx.moveTo(sx + DORF_CELL / 2, sy + 4);
    dorfCtx.lineTo(sx + DORF_CELL - 6, sy + DORF_CELL * 0.45);
    dorfCtx.lineTo(sx + 6, sy + DORF_CELL * 0.45);
    dorfCtx.closePath(); dorfCtx.fill();
    dorfCtx.fillStyle = "#d8c8a8";
    dorfCtx.fillRect(sx + DORF_CELL * 0.35, sy + DORF_CELL * 0.45, DORF_CELL * 0.3, DORF_CELL * 0.5);
    dorfCtx.fillStyle = "#5a3a24";
    dorfCtx.fillRect(sx + DORF_CELL * 0.44, sy + DORF_CELL * 0.7, DORF_CELL * 0.12, DORF_CELL * 0.25);
    if (st.occupants > 0) {
      dorfCtx.fillStyle = "#7a9b57";
      dorfCtx.beginPath(); dorfCtx.arc(sx + DORF_CELL - 10, sy + 10, 5, 0, Math.PI * 2); dorfCtx.fill();
    }
    return;
  }
  if (b.type === "portstone") {
    dorfCtx.fillStyle = "#5a4a7a";
    dorfCtx.fillRect(sx + DORF_CELL * 0.4, sy + DORF_CELL * 0.15, DORF_CELL * 0.2, DORF_CELL * 0.7);
    dorfCtx.fillStyle = "#b39ddb";
    dorfCtx.beginPath();
    dorfCtx.arc(sx + DORF_CELL / 2, sy + DORF_CELL * 0.22, 5, 0, Math.PI * 2);
    dorfCtx.fill();
    dorfCtx.font = "12px sans-serif";
    dorfCtx.textAlign = "center";
    dorfCtx.textBaseline = "middle";
    dorfCtx.fillText("🗿", sx + DORF_CELL * 0.75, sy + DORF_CELL * 0.75);
    dorfCtx.textAlign = "start";
    dorfCtx.textBaseline = "alphabetic";
    return;
  }

  const job = DORF_JOB_TYPE_BY_ID[b.type];
  dorfCtx.fillStyle = job.roof;
  dorfCtx.fillRect(sx + 6, sy + 8, DORF_CELL - 12, DORF_CELL * 0.4);
  dorfCtx.font = "14px sans-serif";
  dorfCtx.textAlign = "center";
  dorfCtx.textBaseline = "middle";
  dorfCtx.fillText(job.emoji, sx + DORF_CELL - 12, sy + DORF_CELL - 12);
  dorfCtx.textAlign = "start";
  dorfCtx.textBaseline = "alphabetic";
  if (st.hired) {
    dorfCtx.drawImage(dorfVillagerSpriteFor(b.type), sx + 4, sy + DORF_CELL * 0.4, 20, 20);
    if (!st.housed) {
      dorfCtx.fillStyle = "#d8b25c";
      dorfCtx.font = "bold 12px sans-serif";
      dorfCtx.fillText("?", sx + DORF_CELL - 16, sy + 16);
    } else if (job.kind === "flavor" || st.prodAccum > 0) {
      dorfCtx.fillStyle = "#7a9b57";
      dorfCtx.beginPath(); dorfCtx.arc(sx + DORF_CELL - 10, sy + 10, 5, 0, Math.PI * 2); dorfCtx.fill();
    }
  }
}

function dorfDrawSpecialTile(kind, sx, sy, biome) {
  dorfDrawGround(biome, sx, sy);
  dorfCtx.fillStyle = kind === "tavern" ? "#b5502f" : "#4f7a3c";
  dorfCtx.beginPath();
  dorfCtx.roundRect ? dorfCtx.roundRect(sx + 4, sy + 4, DORF_CELL - 8, DORF_CELL - 8, 8) : dorfCtx.rect(sx + 4, sy + 4, DORF_CELL - 8, DORF_CELL - 8);
  dorfCtx.fill();
  dorfCtx.font = "26px sans-serif";
  dorfCtx.textAlign = "center";
  dorfCtx.textBaseline = "middle";
  dorfCtx.fillText(kind === "tavern" ? "🍕" : "🌱", sx + DORF_CELL / 2, sy + DORF_CELL / 2 + 2);
  dorfCtx.textAlign = "start";
  dorfCtx.textBaseline = "alphabetic";
}

function dorfDrawTileAt(tile, sx, sy) {
  if (tile.special) { dorfDrawSpecialTile(tile.special, sx, sy, tile.biome); return; }
  if (tile.building) { dorfDrawBuildingTile(tile.building, sx, sy, tile.biome); return; }
  dorfDrawGround(tile.biome, sx, sy);
  if (tile.terrain === DORF_T.WATER && !tile.built) {
    dorfCtx.drawImage(DORF_IMAGES.water, sx, sy, DORF_CELL, DORF_CELL);
    if (tile.resource === DORF_RES.BROKEN_BRIDGE) {
      dorfCtx.strokeStyle = "#e05a4a"; dorfCtx.lineWidth = 3;
      dorfCtx.beginPath();
      dorfCtx.moveTo(sx + 8, sy + 8); dorfCtx.lineTo(sx + DORF_CELL - 8, sy + DORF_CELL - 8);
      dorfCtx.moveTo(sx + DORF_CELL - 8, sy + 8); dorfCtx.lineTo(sx + 8, sy + DORF_CELL - 8);
      dorfCtx.stroke();
    } else if (tile.resource === DORF_RES.FISH) {
      dorfCtx.font = "20px sans-serif";
      dorfCtx.textAlign = "center";
      dorfCtx.textBaseline = "middle";
      dorfCtx.fillText("🐟", sx + DORF_CELL / 2, sy + DORF_CELL / 2 + 1);
      dorfCtx.textAlign = "start";
      dorfCtx.textBaseline = "alphabetic";
    }
    return;
  }
  if (tile.built === "floor") dorfCtx.drawImage(DORF_IMAGES.woodfloor, sx, sy, DORF_CELL, DORF_CELL);
  else if (tile.resource === DORF_RES.TREE) dorfCtx.drawImage(DORF_IMAGES.tree, sx, sy, DORF_CELL, DORF_CELL);
  else if (tile.resource === DORF_RES.ROCK) dorfCtx.drawImage(DORF_IMAGES.rock, sx, sy, DORF_CELL, DORF_CELL);
  else if (tile.resource === DORF_RES.GEM) dorfCtx.drawImage(DORF_IMAGES.gem, sx, sy, DORF_CELL, DORF_CELL);
  else if (tile.resource === DORF_RES.MUSHROOM) dorfCtx.drawImage(DORF_IMAGES.item, sx, sy, DORF_CELL, DORF_CELL);
}

function dorfDrawSprite(img, worldPxX, worldPxY, facing, bob) {
  const sx = worldPxX - dorfCamX + DORF_CELL / 2;
  const sy = worldPxY - dorfCamY + DORF_CELL / 2 - bob;
  dorfCtx.save();
  dorfCtx.translate(sx, sy);
  dorfCtx.scale(facing >= 0 ? 1 : -1, 1);
  dorfCtx.drawImage(img, -DORF_CELL / 2, -DORF_CELL / 2, DORF_CELL, DORF_CELL);
  dorfCtx.restore();
}

let dorfLastFrame = performance.now();
function dorfDraw(now) {
  const dt = now - dorfLastFrame; dorfLastFrame = now;
  dorfUpdateNpc(dt);

  dorfCamX = dorfPlayer.px + DORF_CELL / 2 - dorfCanvas.width / 2;
  dorfCamY = dorfPlayer.py + DORF_CELL / 2 - dorfCanvas.height / 2;

  const startCol = Math.floor(dorfCamX / DORF_CELL) - 1;
  const startRow = Math.floor(dorfCamY / DORF_CELL) - 1;
  const endCol = startCol + DORF_COLS + 2;
  const endRow = startRow + DORF_ROWS + 2;

  dorfCtx.clearRect(0, 0, dorfCanvas.width, dorfCanvas.height);
  for (let ty = startRow; ty <= endRow; ty++) {
    for (let tx = startCol; tx <= endCol; tx++) {
      dorfDrawTileAt(dorfGetTile(tx, ty), tx * DORF_CELL - dorfCamX, ty * DORF_CELL - dorfCamY);
    }
  }

  dorfDrawSprite(DORF_IMAGES.npc, dorfNpc.x * DORF_CELL, dorfNpc.y * DORF_CELL, dorfNpc.facing, 0);
  dorfDrawSprite(DORF_IMAGES.player, dorfPlayer.px, dorfPlayer.py, dorfPlayer.facing, dorfPlayer.bob);

  dorfDrawMapView(dorfMinimapCtx, dorfMinimapCanvas.width, dorfMinimapCanvas.height, 3, 16);
  if (dorfMapOpen) dorfDrawMapView(dorfMapCtx, dorfMapCanvas.width, dorfMapCanvas.height, 4, 55);

  requestAnimationFrame(dorfDraw);
}

/* ---------------------------- boot ---------------------------- */
let dorfSeed, dorfPlayer, dorfInventory, dorfSkills, dorfOverrides, dorfBuildingState, dorfExplored, dorfPortstones;
let dorfBooted = false, dorfWantsStart = false;

function dorfFindNearestWalkable(x, y) {
  for (let r = 0; r < 20; r++) {
    for (let dx = -r; dx <= r; dx++) {
      for (let dy = -r; dy <= r; dy++) {
        if (Math.abs(dx) !== r && Math.abs(dy) !== r) continue;
        if (dorfIsWalkable(x + dx, y + dy)) return { x: x + dx, y: y + dy };
      }
    }
  }
  return { x, y };
}

function dorfActuallyStart() {
  dorfSeed          = G.dorf.seed;
  dorfPlayer         = G.dorf.player;
  dorfInventory      = G.dorf.inventory;
  dorfSkills         = G.dorf.skills;
  dorfOverrides      = G.dorf.overrides;
  dorfBuildingState  = G.dorf.buildingState;
  dorfExplored       = G.dorf.explored;
  dorfPortstones     = G.dorf.portstones;

  dorfPlayer.px = dorfPlayer.x * DORF_CELL;
  dorfPlayer.py = dorfPlayer.y * DORF_CELL;
  dorfPlayer.facing = dorfPlayer.facing || 1;
  dorfPlayer.moving = false;
  dorfPlayer.bob = 0;

  dorfNpc = {
    name: "Lio", x: 3, y: 2, homeX: 3, homeY: 2, wanderTimer: 0, facing: -1,
    memory: G.dorf.npcMemory
  };

  if (!dorfIsWalkable(dorfPlayer.x, dorfPlayer.y)) {
    const spot = dorfFindNearestWalkable(dorfPlayer.x, dorfPlayer.y);
    dorfPlayer.x = spot.x; dorfPlayer.y = spot.y;
    dorfPlayer.px = dorfPlayer.x * DORF_CELL; dorfPlayer.py = dorfPlayer.y * DORF_CELL;
  }
  if (!dorfIsWalkable(dorfNpc.x, dorfNpc.y) || (dorfNpc.x === dorfPlayer.x && dorfNpc.y === dorfPlayer.y)) {
    const spot = dorfFindNearestWalkable(dorfNpc.x + 2, dorfNpc.y);
    dorfNpc.x = spot.x; dorfNpc.y = spot.y; dorfNpc.homeX = spot.x; dorfNpc.homeY = spot.y;
  }

  dorfCanvas = document.getElementById("dorf-canvas");
  dorfCtx = dorfCanvas.getContext("2d");
  dorfCtx.imageSmoothingEnabled = false;

  dorfMinimapCanvas = document.getElementById("dorf-minimap");
  dorfMinimapCtx = dorfMinimapCanvas.getContext("2d");
  dorfMinimapCtx.imageSmoothingEnabled = false;
  dorfMapCanvas = document.getElementById("dorf-mapCanvas");
  dorfMapCtx = dorfMapCanvas.getContext("2d");
  dorfMapCtx.imageSmoothingEnabled = false;

  dorfDlgEl   = document.getElementById("dorf-dialogue");
  dorfDlgWho  = document.getElementById("dorf-dlgWho");
  dorfDlgLine = document.getElementById("dorf-dlgLine");
  dorfDlgOpts = document.getElementById("dorf-dlgOpts");

  dorfMarkExplored(dorfPlayer.x, dorfPlayer.y, DORF_EXPLORE_RADIUS);

  dorfRenderSkillBar();
  dorfRenderInventory();
  dorfSetupCanvasClick();
  dorfSetupKeyboard();
  dorfSetupMapControls();

  dorfLastFrame = performance.now();
  requestAnimationFrame(dorfDraw);
}

function dorfTryStart() {
  if (dorfAssetsLoaded < DORF_ASSET_TOTAL) return;
  if (!dorfWantsStart) return;
  if (dorfBooted) return;
  dorfBooted = true;
  dorfActuallyStart();
}

function dorfInit() {
  dorfWantsStart = true;
  dorfTryStart();
}
window.dorfInit = dorfInit;

for (const key in DORF_TILE_SRC) {
  const img = new Image();
  img.onload = () => { dorfAssetsLoaded++; dorfTryStart(); };
  img.src = DORF_TILE_SRC[key];
  DORF_IMAGES[key] = img;
}
