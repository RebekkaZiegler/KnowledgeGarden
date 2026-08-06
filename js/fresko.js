'use strict';

/* ══════════════════════════════════════════════════════════
   FRESKO — uncovering a buried fresco, edge-in, no gravity

   Same underlying idea as Mosaik (assign a color-locked container to a
   depot cell, it slowly collects matching pixels out of a real picture)
   but a different physical metaphor and a MUCH smaller picture (dozens of
   cells per side, not hundreds — see FR_LEVELS' g=[rows,cols], downsampled
   from Mosaik's own baked artwork by scripts/generate-fresko-levels.js).

   The picture isn't a pile of sand a belt digs into column by column — it's
   an ancient wall painting still buried under plaster, being freed one
   fleck at a time. A cell can only be chipped away once it's actually
   REACHABLE: on the picture's current outer boundary — touching the edge of
   the grid, or touching a cell that's already been cleared (frExposedFromPresent
   / frRemoveCell's incremental neighbor update). There is no belt position,
   no reach radius, no gravity, no sideways spill: a container just quietly
   works on whatever exposed cell currently matches its color, wherever on
   the boundary that happens to be, and a cleared cell leaves a permanent
   gap — nothing above or beside it shifts to fill it in, because there's
   nothing "above" on a flat wall. This is why Mosaik's whole gravity/spill
   apparatus (msSettleGravity/msTrySpill) has no counterpart here at all.

   Because eligibility is global (any boundary cell, not a neighborhood
   around a moving belt position), a container doesn't need to visibly
   travel anywhere either — it's rendered as a static slot in the bucket
   row (frRenderColorRow), exactly like Mosaik's ms-bucket-row, but with no
   belt-track/overlay/particle canvas underneath it. Still a real-time loop
   though (frTick, driven by elapsed time, reused unmodified by
   scripts/verify-fresko-levels.js's fast-forwarded replay) — a container
   picks one matching exposed cell at random and chips it out every
   FR_COLLECT_INTERVAL_MS, same "one real function, never a hand-rolled
   copy" discipline as every other mini-game here.

   The depot/one-time-use-bucket positional-blocking puzzle (frIsDepotBlocked)
   is ported verbatim from Mosaik's own port of Parkplatz's car-lot model —
   kept even though Parkplatz itself was retired, because the mechanic
   stands on its own regardless of its origin game.

   Rendering is canvas-based (one native pixel per grid cell, scaled up via
   CSS `image-rendering: pixelated`), same reasoning as Mosaik, though at
   this picture's tiny cell counts a DOM-per-pixel approach would honestly
   have been fine too — canvas is used anyway for consistency and because
   the ImageData single-cell update (frRedrawCell) is trivially cheap either
   way.
══════════════════════════════════════════════════════════ */

const FR_DIR_GLYPH = ["▲", "▶", "▼", "◀"]; // 0=up,1=right,2=down,3=left — mirrors MS_DIR_GLYPH/PL_DIR_GLYPH

// Same "capacity costs a question" pattern as Water Sort/Parkplatz/Mosaik.
const FR_MAX_DISCARDS_PER_LEVEL = 10;
const FR_STARTING_SLOTS_HANDICAP = 1;
// Every bucket in a given level holds the same fixed capacity — a fraction
// of the level's whole pixel count (see frBucketCapacity), never a fraction
// of any one color's own total. Much lower than Mosaik's own
// MS_TARGET_BUCKET_COUNT because a Fresko picture has far fewer pixels
// total (see scripts/generate-fresko-levels.js's downsampling) — this keeps
// each bucket meaningfully sized (a handful of placements per color, not
// one giant placement that instantly clears it).
const FR_TARGET_BUCKET_COUNT = 10;
// How often (real ms) an active container attempts one collection — no
// belt/reach mechanic to pace against here, so this alone sets the game's
// tempo. Provisional — tune by watching it run.
const FR_COLLECT_INTERVAL_MS = 220;
// Cells collected per container per interval tick. Kept at 1 (unlike
// Mosaik's MS_MAX_COLLECT_PER_BURST=3) since Fresko's buckets are already
// much smaller — no need to also burst multiple cells per tick.
const FR_MAX_COLLECT_PER_BURST = 1;

// Baked by scripts/generate-fresko-levels.js (downsampled from Mosaik's own
// MS_PHOTO_LEVELS) then scripts/generate-fresko-depot.js (adds `depot`).
const FR_LEVELS = [{"g":[20,20],"palette":["#ebdcbd","#f9e9c5","#f6edd7","#faf4e1","#e8e5d3","#d7dbce","#c9cfc5","#b0bbb7","#94a3a6","#7b8e98","#647988","#48667f","#325472","#c9bda8","#aba598","#8b8a84"],"pixels":"000111111111111111110011111111111111111101143355411133333211243336666611333333314357b9c566012233211022acccc955552222211023cccccc6655522222214347bbc9465642222222766669b2222542222222769a6bc2222222222222776bbbb4222222222222bbbbb3ba0044440000ddbbba333aeeeedeeeeff9e8b335335ffff7effffee433565345fafaaffd582656655847777a44565766546659e7aba44458ab7666665bcf88bba9aaa5cc665aa6ccedddddf77acca988bc66baa87546bb","db":15,"title":"Die große Welle vor Kanagawa — Hokusai","depot":{"grid":[7,7],"cells":[{"r":4,"c":3,"dir":3,"color":8,"family":8},{"r":5,"c":6,"dir":1,"color":11,"family":11},{"r":5,"c":5,"dir":1,"color":1,"family":1},{"r":2,"c":3,"dir":2,"color":2,"family":2},{"r":0,"c":6,"dir":0,"color":5,"family":5},{"r":2,"c":2,"dir":3,"color":6,"family":6},{"r":6,"c":0,"dir":0,"color":9,"family":9},{"r":1,"c":4,"dir":2,"color":14,"family":14},{"r":4,"c":5,"dir":1,"color":4,"family":4},{"r":3,"c":5,"dir":2,"color":10,"family":10},{"r":5,"c":2,"dir":1,"color":15,"family":15},{"r":1,"c":1,"dir":3,"color":1,"family":1},{"r":2,"c":6,"dir":1,"color":12,"family":12},{"r":1,"c":5,"dir":1,"color":13,"family":13},{"r":3,"c":6,"dir":0,"color":7,"family":7},{"r":0,"c":4,"dir":2,"color":3,"family":3},{"r":1,"c":2,"dir":0,"color":2,"family":2},{"r":6,"c":1,"dir":3,"color":0,"family":0}]}},{"g":[20,20],"palette":["#102669","#345a8e","#5c7a9e","#7b91a7","#93a5b1","#a5b3b8","#475a50","#656f5f","#34433f","#663d32","#becdc4","#8f7e6c","#905346","#9e3120","#b66b55","#b24632"],"pixels":"000000000000000000003222222232244423333122334423443233211111113233354334321111111234544552221111186134455554543211119988a555445454343339999923554455544443cc99c95554455544444ddddded445455455444ddddddddaaa5555532ddddddddddaa5545554ddddddddddd4445443cdddddddddddda5444cddfdddddddddddaa77cccffffffffdddfd666677bbeeeeeeefffff8866677777bbbbbeeeee88886666667777777bbb8888886666666666777788888888888888888666","db":15,"title":"Roter Fuji — Hokusai","depot":{"grid":[7,7],"cells":[{"r":0,"c":3,"dir":3,"color":6,"family":6},{"r":6,"c":5,"dir":2,"color":7,"family":7},{"r":2,"c":3,"dir":1,"color":4,"family":4},{"r":3,"c":0,"dir":2,"color":15,"family":15},{"r":3,"c":3,"dir":3,"color":11,"family":11},{"r":0,"c":5,"dir":3,"color":4,"family":4},{"r":5,"c":6,"dir":1,"color":5,"family":5},{"r":3,"c":4,"dir":3,"color":13,"family":13},{"r":6,"c":6,"dir":2,"color":0,"family":0},{"r":6,"c":3,"dir":2,"color":5,"family":5},{"r":4,"c":5,"dir":2,"color":9,"family":9},{"r":2,"c":0,"dir":0,"color":14,"family":14},{"r":4,"c":3,"dir":3,"color":1,"family":1},{"r":6,"c":1,"dir":3,"color":8,"family":8},{"r":1,"c":3,"dir":3,"color":13,"family":13},{"r":4,"c":4,"dir":3,"color":2,"family":2},{"r":3,"c":6,"dir":1,"color":10,"family":10},{"r":1,"c":6,"dir":2,"color":12,"family":12},{"r":5,"c":3,"dir":3,"color":3,"family":3}]}},{"g":[20,20],"palette":["#667b8a","#566778","#3e516c","#3e4a54","#2d3955","#314279","#3f5484","#4b658e","#567199","#7e896c","#b7b058","#7d9294","#68809c","#9daa96","#2e343a","#1f2320"],"pixels":"94414606616552666677954556616655996566bd65e55555555501556cda653966700c8866668bda554768007088c6bb88dac63ccc02678c777b87bdc0ecc908c88cc6678788c1e6267c878c87077888cef2268cc777707c88cc99fe7bdc8888788cc8dd7ffe7ddd677777c00ddb6fff2ddb8087bbbbbbb1bfff30bbb00b02420444cfffee077772554456687ffffff4445654526221effffffee332222432214ffffffeee334444e422effffffffee3effe3eeeeffffffffeeeeeee4433eefffffffeeeee333eee","db":15,"title":"Sternennacht — Van Gogh","depot":{"grid":[7,7],"cells":[{"r":5,"c":1,"dir":2,"color":2,"family":2},{"r":6,"c":5,"dir":2,"color":15,"family":15},{"r":1,"c":2,"dir":3,"color":6,"family":6},{"r":3,"c":6,"dir":0,"color":14,"family":14},{"r":6,"c":0,"dir":2,"color":4,"family":4},{"r":2,"c":1,"dir":2,"color":12,"family":12},{"r":0,"c":2,"dir":1,"color":13,"family":13},{"r":2,"c":0,"dir":3,"color":1,"family":1},{"r":5,"c":3,"dir":2,"color":8,"family":8},{"r":5,"c":6,"dir":2,"color":15,"family":15},{"r":5,"c":4,"dir":2,"color":5,"family":5},{"r":5,"c":5,"dir":1,"color":10,"family":10},{"r":3,"c":2,"dir":3,"color":3,"family":3},{"r":3,"c":5,"dir":1,"color":11,"family":11},{"r":4,"c":2,"dir":1,"color":14,"family":14},{"r":3,"c":4,"dir":2,"color":7,"family":7},{"r":5,"c":0,"dir":1,"color":0,"family":0},{"r":1,"c":5,"dir":2,"color":9,"family":9}]}},{"g":[20,20],"palette":["#4c6971","#ffffff","#fefefe","#ede3e2","#e7c2b7","#a2939f","#96b6f9","#5763b7","#9a0a1d","#a1504a","#cf726c","#e5ebfb","#e09b93","#65556b","#c3d4fa","#d01423"],"pixels":"00000000000000000000000000000000000000000000000000000000000000000000000000000000222222222222222222222222222222222222222222222222222222222222224c2222222222222222244ca2222222222222222accc9222222b22222222caaa922222bbb3c222222999227723bbbbf22222222222227ebbbbf2222222222222766e66f2222222222222286688222222222222222228222222200000000000000000000000000000000000000000000000000000000000000000000000000000000","db":12,"title":"atmungssystem figure 11","depot":{"grid":[7,8],"cells":[{"r":5,"c":2,"dir":3,"color":6,"family":6},{"r":3,"c":3,"dir":0,"color":12,"family":12},{"r":3,"c":6,"dir":0,"color":8,"family":8},{"r":6,"c":5,"dir":2,"color":0,"family":0},{"r":6,"c":7,"dir":1,"color":2,"family":2},{"r":0,"c":4,"dir":0,"color":2,"family":2},{"r":1,"c":2,"dir":0,"color":11,"family":11},{"r":3,"c":0,"dir":1,"color":0,"family":0},{"r":6,"c":2,"dir":0,"color":7,"family":7},{"r":0,"c":0,"dir":1,"color":10,"family":10},{"r":2,"c":5,"dir":3,"color":15,"family":15},{"r":1,"c":1,"dir":0,"color":0,"family":0},{"r":6,"c":0,"dir":2,"color":2,"family":2},{"r":5,"c":3,"dir":3,"color":2,"family":2},{"r":1,"c":7,"dir":0,"color":9,"family":9},{"r":1,"c":0,"dir":0,"color":0,"family":0},{"r":5,"c":6,"dir":2,"color":2,"family":2},{"r":1,"c":4,"dir":3,"color":3,"family":3},{"r":4,"c":0,"dir":3,"color":14,"family":14},{"r":4,"c":4,"dir":3,"color":4,"family":4}]}},{"g":[20,20],"palette":["#4c6971","#ffffff","#fbfbfa","#ccc7c8","#ece2db","#a6a0a2","#bcb5b5","#e6d3d1","#8f8989","#6b6a6c","#c98b82","#ceae9b","#dfc4ba","#454343","#778eb3"],"pixels":"0000000000000000000000000000000000000000000000000000000000000000000000000000000011111111111111111111111111111441111111111111111114411111111111111111171111111111111111177117111111111111111774777111111111111177777ca7111111111111777717e7111111111111777717e311111111111177711777111111111111711111771111111111111111111111111100000000000000000000000000000000000000000000000000000000000000000000000000000000","db":7,"title":"atmungssystem figure 9","depot":{"grid":[6,7],"cells":[{"r":0,"c":4,"dir":1,"color":0,"family":0},{"r":2,"c":6,"dir":1,"color":7,"family":7},{"r":1,"c":0,"dir":3,"color":1,"family":1},{"r":1,"c":1,"dir":3,"color":12,"family":12},{"r":4,"c":6,"dir":1,"color":10,"family":10},{"r":1,"c":2,"dir":3,"color":4,"family":4},{"r":4,"c":1,"dir":3,"color":1,"family":1},{"r":3,"c":0,"dir":3,"color":0,"family":0},{"r":2,"c":2,"dir":3,"color":1,"family":1},{"r":0,"c":2,"dir":1,"color":1,"family":1},{"r":5,"c":5,"dir":2,"color":0,"family":0},{"r":3,"c":5,"dir":3,"color":3,"family":3},{"r":4,"c":2,"dir":1,"color":14,"family":14},{"r":5,"c":6,"dir":0,"color":1,"family":1},{"r":0,"c":0,"dir":0,"color":0,"family":0}]}},{"g":[20,20],"palette":["#fdfdfd","#eacfdb","#f2e7ee","#c78f9f","#e19caa","#e0b6c5","#d37286","#b8a3c4","#a37eaf","#da3c56","#b1506e","#8e7192","#bd284a","#505c64","#c6c9da","#8cb7b4"],"pixels":"000000909c0090000000090900009000990000090000000095551c000000000000050eee005000000000d0038bbbd00000000000fd588a33bdd70000000ffd887aabbb7700000000d5b8c87ac882000000000487cccccb8e0000000014888888888e500000005d888accc7b1150000005b0cccccc8872e00000e4bcc0cc008877250000e47ccc0cc0c8734100003328ccccc09c73450000334ccac0c0cc7550000003ccc90ccc0654500000035460cccccc450000000041cccccc651600000000004cccc65564000","db":15,"title":"blutgefaess zelltypen","depot":{"grid":[7,8],"cells":[{"r":0,"c":2,"dir":0,"color":7,"family":7},{"r":0,"c":5,"dir":0,"color":9,"family":9},{"r":5,"c":1,"dir":3,"color":10,"family":10},{"r":6,"c":1,"dir":2,"color":11,"family":11},{"r":2,"c":1,"dir":2,"color":0,"family":0},{"r":3,"c":2,"dir":3,"color":0,"family":0},{"r":6,"c":0,"dir":2,"color":0,"family":0},{"r":5,"c":3,"dir":3,"color":6,"family":6},{"r":0,"c":4,"dir":1,"color":4,"family":4},{"r":3,"c":6,"dir":1,"color":8,"family":8},{"r":0,"c":0,"dir":0,"color":5,"family":5},{"r":4,"c":0,"dir":3,"color":3,"family":3},{"r":2,"c":6,"dir":2,"color":15,"family":15},{"r":2,"c":4,"dir":3,"color":2,"family":2},{"r":1,"c":3,"dir":1,"color":13,"family":13},{"r":5,"c":7,"dir":3,"color":12,"family":12},{"r":6,"c":5,"dir":2,"color":12,"family":12},{"r":1,"c":1,"dir":0,"color":0,"family":0},{"r":2,"c":5,"dir":3,"color":1,"family":1},{"r":6,"c":7,"dir":3,"color":14,"family":14},{"r":2,"c":7,"dir":3,"color":0,"family":0}]}},{"g":[20,20],"palette":["#fefefe","#ede5eb","#cec0d7","#e3d6df","#b3aac6","#f7f4f5","#978e9a","#514649","#776b73","#e5c6b6","#e7b28c","#d79ea8","#ce807b","#b66251","#b67fd0","#c639b3"],"pixels":"0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a0000000000000000a4333011aa0000000000043bbb0111a00000000000d0bbbc44000000000a0aaaccc888aa000000000dadd43ceffa000000000000a30d252fa000000000aa010822554a00000000000508eee55f00000000000000eeeeff00000000000040feef00000000000000000ff000000000000000000000000000000000000000000000000000000000000000000","db":12,"title":"gehirn sagittalschnitt","depot":{"grid":[7,8],"cells":[{"r":1,"c":3,"dir":3,"color":0,"family":0},{"r":5,"c":2,"dir":3,"color":0,"family":0},{"r":6,"c":6,"dir":2,"color":0,"family":0},{"r":1,"c":5,"dir":0,"color":1,"family":1},{"r":0,"c":3,"dir":1,"color":13,"family":13},{"r":2,"c":4,"dir":2,"color":15,"family":15},{"r":6,"c":7,"dir":1,"color":0,"family":0},{"r":4,"c":3,"dir":2,"color":5,"family":5},{"r":1,"c":4,"dir":2,"color":8,"family":8},{"r":4,"c":1,"dir":2,"color":2,"family":2},{"r":1,"c":7,"dir":0,"color":12,"family":12},{"r":5,"c":7,"dir":2,"color":0,"family":0},{"r":2,"c":6,"dir":0,"color":11,"family":11},{"r":3,"c":3,"dir":0,"color":0,"family":0},{"r":6,"c":2,"dir":3,"color":14,"family":14},{"r":4,"c":7,"dir":0,"color":4,"family":4},{"r":0,"c":0,"dir":2,"color":0,"family":0},{"r":3,"c":1,"dir":2,"color":0,"family":0},{"r":6,"c":5,"dir":2,"color":3,"family":3},{"r":0,"c":2,"dir":3,"color":10,"family":10}]}},{"g":[20,20],"palette":["#4c6971","#ffffff","#fefefe","#ebebea","#dbd8d5","#c7c5c4","#d4c0a4","#b0b0b0","#e4bf92","#eacca1","#f0d7ad","#d1ad84","#f7e3bf","#9e9e9e","#b6a283"],"pixels":"00001111111111110000000011119aa1111100000000111199aa11110000000011111aa9111100000000111111a9111100000000111111891111000000001111118811110000000011111181111100000000111111811111000000001111118911110000000011111199111100000000111111891111000000001111118911110000000011111188111100000000111111c811110000000011111118111100000000111111aa111100000000111119aa111100000000111119aa9111000000001111111111110000","db":5,"title":"histologie figure 20","depot":{"grid":[6,6],"cells":[{"r":1,"c":0,"dir":0,"color":0,"family":0},{"r":2,"c":2,"dir":3,"color":10,"family":10},{"r":2,"c":3,"dir":0,"color":0,"family":0},{"r":3,"c":3,"dir":3,"color":1,"family":1},{"r":1,"c":4,"dir":1,"color":1,"family":1},{"r":1,"c":1,"dir":2,"color":9,"family":9},{"r":5,"c":2,"dir":3,"color":0,"family":0},{"r":5,"c":4,"dir":2,"color":1,"family":1},{"r":5,"c":3,"dir":3,"color":8,"family":8},{"r":0,"c":1,"dir":2,"color":12,"family":12},{"r":5,"c":5,"dir":3,"color":1,"family":1},{"r":3,"c":5,"dir":1,"color":1,"family":1},{"r":0,"c":4,"dir":3,"color":0,"family":0}]}},{"g":[20,20],"palette":["#4c6971","#ffffff","#f3f3f2","#fffffe","#d0c0ad","#bfa48b","#272422","#613920","#a28a76","#7d5744","#fcdbbe","#feebc9","#f6d1ae","#f6be98","#f08f60","#b32323"],"pixels":"00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003333333333333333333333333333333333333333397773333333333333333999bbbbbd33333333333aaaaaaadc333333333337baa7aacc33333333333a7aaaaaadb3333333333aaaaaaaabbbbaaf33333ffaaaabaaaaaacf3333ffaaaaaaaaaaaa3333330000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","db":8,"title":"histologie figure 5","depot":{"grid":[6,7],"cells":[{"r":3,"c":1,"dir":3,"color":3,"family":3},{"r":4,"c":1,"dir":3,"color":9,"family":9},{"r":0,"c":1,"dir":3,"color":15,"family":15},{"r":0,"c":5,"dir":0,"color":11,"family":11},{"r":2,"c":5,"dir":0,"color":0,"family":0},{"r":4,"c":6,"dir":1,"color":13,"family":13},{"r":3,"c":5,"dir":1,"color":12,"family":12},{"r":1,"c":1,"dir":0,"color":7,"family":7},{"r":5,"c":2,"dir":1,"color":10,"family":10},{"r":1,"c":0,"dir":3,"color":3,"family":3},{"r":2,"c":0,"dir":3,"color":0,"family":0},{"r":0,"c":3,"dir":1,"color":0,"family":0},{"r":0,"c":2,"dir":1,"color":0,"family":0},{"r":2,"c":6,"dir":0,"color":3,"family":3},{"r":4,"c":2,"dir":0,"color":10,"family":10},{"r":2,"c":1,"dir":2,"color":0,"family":0}]}},{"g":[20,20],"palette":["#ffffff","#fefefe","#f4f2ec","#dddded","#f1d1ba","#c1bcbd","#a69589","#83746d","#ebc2a4","#684936","#906141","#e2af8f","#d7906b","#fdf2c7","#392c23"],"pixels":"1111111111111111111188bbbccc1111111111114488bbcc1111111111118bbb3ccc1111111111113333c33a11111111111149833393111111111111343844331111111111118483434811111111111134a33448111111111111344834881111111111118384833311111111111148848848111111111111833843331111111111113838483311111111111188338388111111111111dddddddd111111111111dddddddd111111111111dddddddd11111111111111dddddd11111111111111111111111111111111","db":8,"title":"histologie figure 7","depot":{"grid":[6,7],"cells":[{"r":5,"c":6,"dir":2,"color":1,"family":1},{"r":5,"c":4,"dir":2,"color":1,"family":1},{"r":4,"c":5,"dir":2,"color":8,"family":8},{"r":1,"c":1,"dir":3,"color":13,"family":13},{"r":4,"c":6,"dir":1,"color":10,"family":10},{"r":1,"c":5,"dir":1,"color":1,"family":1},{"r":0,"c":0,"dir":0,"color":1,"family":1},{"r":2,"c":2,"dir":3,"color":9,"family":9},{"r":3,"c":1,"dir":2,"color":1,"family":1},{"r":2,"c":4,"dir":2,"color":4,"family":4},{"r":1,"c":3,"dir":0,"color":11,"family":11},{"r":4,"c":0,"dir":0,"color":12,"family":12},{"r":1,"c":2,"dir":3,"color":3,"family":3},{"r":4,"c":2,"dir":1,"color":1,"family":1},{"r":0,"c":1,"dir":2,"color":1,"family":1}]}},{"g":[20,20],"palette":["#4c6971","#ffffff","#edeff6","#d0d2db","#b7bebd","#9da0aa","#848790","#272b29","#495b51","#667473","#b1afd4","#5ebb86","#28b255","#084e99"],"pixels":"000000000000000000000000000000000000000001111111111111111110011111111111111111100111111111111111111001111111111111111110011111a1111aa111111001111a2a22aaaa1111100111aaaacc2aaaa1111001aaaaadccdaaaaa111001111aacccccaa11111001111caaaaaacc11111001111ccccccccc11111001111cccc2cccc111110011111ccccccc111111001111111ccc111111110011111111c1111111110011111111111111111100000000000000000000000000000000000000000","db":5,"title":"knochenlehre figure 10","depot":{"grid":[6,6],"cells":[{"r":3,"c":2,"dir":2,"color":1,"family":1},{"r":4,"c":5,"dir":1,"color":12,"family":12},{"r":1,"c":3,"dir":0,"color":0,"family":0},{"r":0,"c":0,"dir":3,"color":1,"family":1},{"r":1,"c":4,"dir":1,"color":13,"family":13},{"r":5,"c":1,"dir":3,"color":1,"family":1},{"r":0,"c":4,"dir":0,"color":10,"family":10},{"r":4,"c":1,"dir":2,"color":0,"family":0},{"r":3,"c":3,"dir":1,"color":1,"family":1},{"r":3,"c":0,"dir":1,"color":1,"family":1},{"r":2,"c":1,"dir":0,"color":1,"family":1},{"r":2,"c":3,"dir":2,"color":0,"family":0},{"r":5,"c":5,"dir":0,"color":2,"family":2}]}},{"g":[20,20],"palette":["#4c6971","#ffffff","#ebeaee","#766566","#624e4d","#9e929a","#d5d1dd","#8b7d81","#c5bfc1","#b0a5b2","#323031","#b6b1d3"],"pixels":"0000000000000000000000000000000000000000000000000000000000000111111111111111111001111111111111111110011111111111111111100111111b111111111110011111bbb1bb11111110011111b1111b11111110011111b111111111111001111111111b1111111001111111111b111111100111111111111111111001111111111111111110011111111111111111100111111111b11111111001111111111111111110000000000000000000000000000000000000000000000000000000000000","db":2,"title":"knochenlehre figure 12","depot":{"grid":[5,6],"cells":[{"r":1,"c":1,"dir":0,"color":0,"family":0},{"r":4,"c":2,"dir":2,"color":11,"family":11},{"r":1,"c":2,"dir":2,"color":1,"family":1},{"r":0,"c":5,"dir":2,"color":1,"family":1},{"r":4,"c":1,"dir":2,"color":1,"family":1},{"r":0,"c":3,"dir":0,"color":1,"family":1},{"r":3,"c":1,"dir":2,"color":1,"family":1},{"r":0,"c":2,"dir":1,"color":1,"family":1},{"r":2,"c":3,"dir":1,"color":0,"family":0},{"r":4,"c":3,"dir":0,"color":0,"family":0},{"r":1,"c":4,"dir":2,"color":0,"family":0}]}},{"g":[20,20],"palette":["#4c6971","#ffffff","#fbfbfa","#b9bcbf","#e8e8e9","#717375","#86898c","#3b3d3f","#d5d5d6","#565759","#9b9c9e","#acadaf","#6dc0e3"],"pixels":"00000000000000000000111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111bbbb1111111111111111bbbbb111111111111111bbbbbb11111111111111bbbbbbb1111111111111bbbbbbbb111111111111bbbbbbbb111111111111bbbb9bbb11111111111bbbbb9bbbb11111111111bbbcbbbb111111111111cc44c67c11111111111115ccc6111111111111111111111111111111100000000000000000000","db":8,"title":"knochenlehre figure 17","depot":{"grid":[7,7],"cells":[{"r":5,"c":0,"dir":3,"color":4,"family":4},{"r":3,"c":6,"dir":2,"color":6,"family":6},{"r":2,"c":6,"dir":2,"color":0,"family":0},{"r":2,"c":0,"dir":3,"color":7,"family":7},{"r":3,"c":4,"dir":0,"color":1,"family":1},{"r":5,"c":1,"dir":1,"color":11,"family":11},{"r":4,"c":5,"dir":1,"color":1,"family":1},{"r":1,"c":6,"dir":0,"color":1,"family":1},{"r":0,"c":0,"dir":2,"color":1,"family":1},{"r":0,"c":5,"dir":3,"color":11,"family":11},{"r":3,"c":5,"dir":1,"color":1,"family":1},{"r":2,"c":3,"dir":0,"color":12,"family":12},{"r":2,"c":1,"dir":3,"color":9,"family":9},{"r":1,"c":2,"dir":3,"color":1,"family":1},{"r":2,"c":5,"dir":3,"color":5,"family":5},{"r":6,"c":2,"dir":2,"color":1,"family":1},{"r":3,"c":1,"dir":0,"color":1,"family":1}]}},{"g":[20,20],"palette":["#ffffff","#f8f8f9","#efeff0","#e5e5e6","#dadbdc","#d1d1d2","#c6c7c8","#b9bdc0","#b3b7ba","#adb0b3","#a4a7aa","#9b9ea1","#929598","#888b8e","#808285","#707173"],"pixels":"000000000000000003600000000000000000641000000deef00000050000000de9a9afeeceeedecd0cda7777777d558babaa0b777777777b8777777769777777777b7777777797777777777b7777777777777779777cd77777779777777ddddd97777789777777887d9c8777780087777ddddd7cca79900087777dd7e7bbda0044449777ddd7d77c700000000777ded7d800500000000777ddcce000040000006bbbbcbf0000004500000077888fe000000000000089000555432000000000000000000000000000","db":15,"title":"leber anatomie numeriert","depot":{"grid":[7,8],"cells":[{"r":6,"c":4,"dir":2,"color":7,"family":7},{"r":3,"c":2,"dir":3,"color":7,"family":7},{"r":1,"c":0,"dir":0,"color":0,"family":0},{"r":1,"c":5,"dir":3,"color":4,"family":4},{"r":4,"c":2,"dir":2,"color":0,"family":0},{"r":2,"c":4,"dir":3,"color":12,"family":12},{"r":0,"c":4,"dir":1,"color":0,"family":0},{"r":4,"c":6,"dir":1,"color":11,"family":11},{"r":6,"c":0,"dir":2,"color":5,"family":5},{"r":1,"c":7,"dir":3,"color":0,"family":0},{"r":4,"c":4,"dir":1,"color":13,"family":13},{"r":3,"c":5,"dir":1,"color":7,"family":7},{"r":5,"c":3,"dir":3,"color":10,"family":10},{"r":4,"c":0,"dir":3,"color":7,"family":7},{"r":2,"c":7,"dir":2,"color":3,"family":3},{"r":3,"c":4,"dir":1,"color":15,"family":15},{"r":5,"c":4,"dir":2,"color":14,"family":14},{"r":2,"c":6,"dir":3,"color":1,"family":1},{"r":0,"c":2,"dir":3,"color":2,"family":2},{"r":5,"c":5,"dir":0,"color":6,"family":6},{"r":6,"c":6,"dir":0,"color":9,"family":9},{"r":6,"c":1,"dir":1,"color":8,"family":8}]}},{"g":[20,20],"palette":["#fdfdfd","#efeff0","#dce0df","#c7ccca","#bbaeb5","#8f7e88","#e7c9d7","#dbafc4","#a29c9c","#73736c","#524e4e","#e7ce6f","#d990ad","#c87895","#b75169","#99d4b9"],"pixels":"000000000000000000000000000000010000000000000000000b111000000000000000000000000000000000000000001000000000000000000010000000000000000000200000000000000000001000000000000070000020000000000000000000170000000000000000011c000000000000000003c0000000000070000111c0000f00000000011cccc000ff000bb001755ccc00000f0f5e7e77355c0000000f0000d0000000000000000000000000000000000020000000000000000000000000000000000000","db":10,"title":"magen aufbau komplett","depot":{"grid":[7,7],"cells":[{"r":3,"c":5,"dir":1,"color":0,"family":0},{"r":6,"c":1,"dir":3,"color":14,"family":14},{"r":6,"c":5,"dir":2,"color":13,"family":13},{"r":0,"c":6,"dir":0,"color":2,"family":2},{"r":1,"c":3,"dir":0,"color":0,"family":0},{"r":0,"c":2,"dir":3,"color":0,"family":0},{"r":5,"c":6,"dir":2,"color":0,"family":0},{"r":5,"c":1,"dir":2,"color":0,"family":0},{"r":1,"c":6,"dir":2,"color":7,"family":7},{"r":2,"c":2,"dir":2,"color":0,"family":0},{"r":2,"c":5,"dir":2,"color":0,"family":0},{"r":4,"c":0,"dir":2,"color":1,"family":1},{"r":6,"c":3,"dir":3,"color":0,"family":0},{"r":2,"c":0,"dir":2,"color":0,"family":0},{"r":1,"c":5,"dir":3,"color":12,"family":12},{"r":3,"c":4,"dir":1,"color":11,"family":11},{"r":2,"c":4,"dir":3,"color":15,"family":15},{"r":5,"c":4,"dir":0,"color":5,"family":5},{"r":4,"c":1,"dir":3,"color":3,"family":3}]}},{"g":[20,20],"palette":["#fefefe","#fcd9b6","#f0b1b3","#de9f9a","#b18077","#9a645b","#884241","#7a3b37","#d38881","#6b312d","#fbc895","#fccda0","#fcd3a9","#582521","#3b0e0c","#c7766b"],"pixels":"00000000000000000000aaaa6ff0000000000000aaa6ffff000000000000aa6fffff000000000000ab6ff77f600000000000bbff797ff00000000000b6ff9997f00000000000b6ff9d97f66666000000b6ff9dd668f6fff66666bbff9d963638ff68ff66bb6669222238f638ff8fbbcc66626388f268f23fabbcc11166886288f26faabbcc1111166666f63600bbbccc11111ccc6666000bbbbcccccccccbbba00000bbbbbcccbbbbaaa00000000bbbbbbbaaaaa0000000000000000000000000000000000000000","db":12,"title":"mitochondrium","depot":{"grid":[7,7],"cells":[{"r":0,"c":0,"dir":3,"color":0,"family":0},{"r":1,"c":1,"dir":0,"color":6,"family":6},{"r":4,"c":4,"dir":1,"color":1,"family":1},{"r":2,"c":0,"dir":3,"color":13,"family":13},{"r":6,"c":0,"dir":1,"color":12,"family":12},{"r":1,"c":4,"dir":1,"color":15,"family":15},{"r":3,"c":3,"dir":0,"color":0,"family":0},{"r":1,"c":0,"dir":0,"color":3,"family":3},{"r":5,"c":3,"dir":0,"color":6,"family":6},{"r":4,"c":0,"dir":3,"color":0,"family":0},{"r":2,"c":6,"dir":1,"color":7,"family":7},{"r":2,"c":5,"dir":1,"color":2,"family":2},{"r":5,"c":4,"dir":2,"color":15,"family":15},{"r":5,"c":1,"dir":0,"color":10,"family":10},{"r":1,"c":2,"dir":3,"color":0,"family":0},{"r":2,"c":4,"dir":1,"color":9,"family":9},{"r":5,"c":2,"dir":3,"color":11,"family":11},{"r":3,"c":5,"dir":3,"color":8,"family":8},{"r":0,"c":4,"dir":3,"color":11,"family":11}]}},{"g":[20,20],"palette":["#fefefe","#e9e5de","#d1be8d","#f9faf3","#e2d6b8","#ab872e","#cca425","#c8af5a","#a7a6a5","#c7c6c6","#807e7e","#f4c41e","#58544f","#fbdb46","#fde466","#feed81"],"pixels":"0000000000000000000000000000000000000000000000000000000000000000000dd000000000000000000eee000000000000000000f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000dfe00000000f00000000ddd0000000eff00000000000000000ee00000000effe000000000000000deffe0000000000000000000000000000000000000000000","db":3,"title":"neuron synapse aufbau","depot":{"grid":[6,6],"cells":[{"r":1,"c":5,"dir":1,"color":0,"family":0},{"r":5,"c":0,"dir":3,"color":0,"family":0},{"r":0,"c":0,"dir":0,"color":0,"family":0},{"r":0,"c":5,"dir":0,"color":14,"family":14},{"r":3,"c":1,"dir":0,"color":15,"family":15},{"r":5,"c":3,"dir":2,"color":0,"family":0},{"r":3,"c":3,"dir":0,"color":0,"family":0},{"r":0,"c":4,"dir":0,"color":0,"family":0},{"r":4,"c":5,"dir":0,"color":0,"family":0},{"r":4,"c":1,"dir":0,"color":0,"family":0},{"r":3,"c":4,"dir":1,"color":0,"family":0},{"r":0,"c":2,"dir":0,"color":0,"family":0},{"r":1,"c":0,"dir":0,"color":13,"family":13}]}},{"g":[20,20],"palette":["#ffffff","#fefefe","#fcfcfc","#f6f6f6","#e1e1e1","#999999","#484848","#1a1a1a","#313131","#838383","#c2c2c2","#6f6f6f","#5b5b5b","#ececec","#d3d3d3","#afafaf"],"pixels":"0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","db":1,"title":"ohrmuschel sketch","depot":{"grid":[5,6],"cells":[{"r":4,"c":1,"dir":2,"color":0,"family":0},{"r":3,"c":4,"dir":2,"color":0,"family":0},{"r":4,"c":0,"dir":2,"color":0,"family":0},{"r":0,"c":1,"dir":3,"color":0,"family":0},{"r":3,"c":5,"dir":1,"color":0,"family":0},{"r":2,"c":3,"dir":3,"color":0,"family":0},{"r":4,"c":5,"dir":2,"color":0,"family":0},{"r":3,"c":1,"dir":2,"color":0,"family":0},{"r":0,"c":2,"dir":1,"color":0,"family":0},{"r":4,"c":2,"dir":0,"color":0,"family":0},{"r":1,"c":5,"dir":1,"color":2,"family":2}]}},{"g":[20,20],"palette":["#ffffff","#e6e1e8","#f0eff6","#cdd0dd","#70717c","#9f8d8f","#bdbcc7","#b2a5ab","#e6d6d6","#dfc7c5","#dbacb7","#db9e92","#dd70ac","#cb6e69","#8cbfd5","#48a2b3"],"pixels":"00000000000000002000000000000000000992200000000000000025992000034f300000cb659210003372f63163cd592210002322363333a1522810020fff44553ad75a2810003aa4c7222dcd222710007a633337222882a91007a1a3466763a89a520000cc9967337bcb82210000ac98210035bc6b880000dc921000c7bba5880000a202100007bbcb2500000000a0000a8bcc900000000cc000008bdd200000000ca000000b52900000000ca000000005000000000a0000000000000000000000000000000000","db":14,"title":"ohr numeriert legende","depot":{"grid":[7,7],"cells":[{"r":3,"c":1,"dir":2,"color":4,"family":4},{"r":0,"c":2,"dir":0,"color":6,"family":6},{"r":0,"c":0,"dir":0,"color":2,"family":2},{"r":1,"c":6,"dir":1,"color":3,"family":3},{"r":6,"c":6,"dir":1,"color":0,"family":0},{"r":2,"c":4,"dir":1,"color":0,"family":0},{"r":4,"c":3,"dir":0,"color":15,"family":15},{"r":2,"c":0,"dir":0,"color":8,"family":8},{"r":0,"c":6,"dir":1,"color":13,"family":13},{"r":4,"c":4,"dir":2,"color":0,"family":0},{"r":1,"c":1,"dir":2,"color":5,"family":5},{"r":3,"c":2,"dir":2,"color":9,"family":9},{"r":5,"c":6,"dir":1,"color":11,"family":11},{"r":3,"c":5,"dir":2,"color":1,"family":1},{"r":1,"c":4,"dir":2,"color":0,"family":0},{"r":4,"c":0,"dir":0,"color":7,"family":7},{"r":1,"c":5,"dir":0,"color":12,"family":12},{"r":0,"c":1,"dir":1,"color":0,"family":0},{"r":4,"c":6,"dir":1,"color":10,"family":10}]}},{"g":[20,20],"palette":["#f7f1f3","#d9c7cd","#b6b9b8","#a09797","#79757e","#5a5160","#c26973","#975255","#f27f83","#f5ada8","#7775b8","#9998f4","#b185ba","#b5b3f8","#e1b5f8","#fb80c8"],"pixels":"22222222222222222222222222272262222222222222bb2b62862222222222222bbb88882222222222222bb88688e22222222222ebb86ceeeee2222222229bb86ee76533222222229bb88ec99999222222224ab8ee999992222222224addee899992222222225addee76999f222222225add4c79919f222222225abdddd9999ff22222225aaedddf999ff222222224addddfff9ff22222222bfadddfff9ff22222222bbffdfddffff22222222ba22fffffff22222222222228822222222222222222222222222222","db":14,"title":"Herz im Querschnitt mit Herzklappen","depot":{"grid":[7,8],"cells":[{"r":3,"c":0,"dir":3,"color":2,"family":2},{"r":6,"c":3,"dir":2,"color":7,"family":7},{"r":1,"c":6,"dir":0,"color":2,"family":2},{"r":2,"c":0,"dir":3,"color":2,"family":2},{"r":0,"c":4,"dir":3,"color":15,"family":15},{"r":3,"c":7,"dir":1,"color":8,"family":8},{"r":6,"c":0,"dir":0,"color":12,"family":12},{"r":6,"c":1,"dir":3,"color":14,"family":14},{"r":3,"c":6,"dir":0,"color":2,"family":2},{"r":3,"c":3,"dir":3,"color":1,"family":1},{"r":2,"c":7,"dir":0,"color":2,"family":2},{"r":1,"c":4,"dir":1,"color":5,"family":5},{"r":4,"c":1,"dir":3,"color":4,"family":4},{"r":5,"c":5,"dir":1,"color":3,"family":3},{"r":4,"c":4,"dir":1,"color":11,"family":11},{"r":6,"c":5,"dir":2,"color":13,"family":13},{"r":0,"c":5,"dir":0,"color":9,"family":9},{"r":1,"c":2,"dir":1,"color":2,"family":2},{"r":6,"c":6,"dir":2,"color":6,"family":6},{"r":2,"c":1,"dir":1,"color":10,"family":10}]}},{"g":[20,20],"palette":["#fffffe","#fdf4d2","#ddddef","#f1d4bf","#bfb3b6","#ba9882","#a07f6b","#79645a","#7b5135","#654530","#926140","#e6b797","#e09871","#edc6ab","#452e1e","#fef1c0"],"pixels":"00000000000000000000cccbbbd3333ddbbbccc0cccbbbd3333ddbbbccc02ccc2bbb2bb2b22cc3c02222222223c2cb2c22202322233d22233d2222b0b2d33b2d33b2d2d3d220dd22d3db222d322223b0d3dd23d2dad23b2b3d20223d22dd232b2dd2dd2032dd2dadb2ddb33d22202bdd2d3d2dad2dd2d3b02dadb222d2dd22dd2220dd3d23dd3d23b2d3d220d222bdb2d2bd22dd2d20fff22f2fff2ffffffff011111111111111111110fffffffffafffffffff0fffff001000110fffff000000000000000000000","db":8,"title":"Epidermis (Hautschichten)","depot":{"grid":[6,6],"cells":[{"r":4,"c":1,"dir":2,"color":12,"family":12},{"r":5,"c":3,"dir":1,"color":15,"family":15},{"r":0,"c":4,"dir":0,"color":2,"family":2},{"r":2,"c":0,"dir":3,"color":15,"family":15},{"r":2,"c":1,"dir":3,"color":2,"family":2},{"r":5,"c":0,"dir":3,"color":10,"family":10},{"r":2,"c":5,"dir":1,"color":1,"family":1},{"r":2,"c":3,"dir":2,"color":2,"family":2},{"r":0,"c":1,"dir":3,"color":0,"family":0},{"r":2,"c":2,"dir":2,"color":3,"family":3},{"r":1,"c":4,"dir":0,"color":13,"family":13},{"r":4,"c":5,"dir":3,"color":0,"family":0},{"r":0,"c":5,"dir":1,"color":11,"family":11},{"r":3,"c":5,"dir":1,"color":13,"family":13}]}}];
const FR_LEVEL_COUNT = FR_LEVELS.length;

// One hex digit per pixel (0-15) — identical convention to Mosaik's
// msDecodePixels (see scripts/generate-fresko-levels.js for the encode side).
function frDecodePixels(hex) {
  const grid = new Array(hex.length);
  for (let i = 0; i < hex.length; i++) grid[i] = parseInt(hex[i], 16);
  return grid;
}

function frGenerateLevel(levelIndex) {
  const level = FR_LEVELS[levelIndex];
  const [rows, cols] = level.g;
  const grid = frDecodePixels(level.pixels);
  const paletteHex = level.palette;
  const paletteRgb = level.palette.map(frHexToRgb);
  // Identity mapping, same reasoning as Mosaik's msGenerateLevel — every
  // shade baked into a Fresko level is its own singleton family.
  const colorFamily = paletteHex.map((_, i) => i);
  return {
    rows, cols, db: level.db, grid, paletteHex, paletteRgb, colorFamily, title: level.title || null,
    maxColors: frColorsInLevel(grid).length,
    maxFamilies: frFamiliesInLevel(grid, colorFamily).length,
    totalByColor: frOriginalColorTotals(grid),
    depot: level.depot || null, // {grid:[rows,cols], cells:[{r,c,dir,color,family}...]} — baked by scripts/generate-fresko-depot.js
  };
}

/* ══════════════════════════════════════════════════════════
   CORE PURE LOGIC — no DOM/globals, reused verbatim by
   scripts/generate-fresko-depot.js and scripts/verify-fresko-levels.js via
   the module.exports guard at the bottom of this file.
══════════════════════════════════════════════════════════ */
function frOriginalColorTotals(grid) {
  const totals = new Map();
  for (const v of grid) totals.set(v, (totals.get(v) || 0) + 1);
  return totals;
}
// Takes the LEVEL's total pixel count (grid.length) — every color's bucket
// in a given level gets the same capacity back; a color's own total only
// ever decides how many buckets it needs (scripts/generate-fresko-depot.js's
// unitsNeeded), never how big any single one of them is. Mirrors Mosaik's
// msBucketCapacity exactly, just against FR_TARGET_BUCKET_COUNT.
function frBucketCapacity(levelTotalPixels) {
  return Math.max(1, Math.ceil(levelTotalPixels / FR_TARGET_BUCKET_COUNT));
}
function frColorsInLevel(grid) { return [...new Set(grid)].sort((a, b) => a - b); }
function frFamiliesInLevel(grid, colorFamily) {
  return [...new Set(grid.map(v => colorFamily[v]))].sort((a, b) => a - b);
}
// Present-cell counterpart of msFamilyTotalCount — `present` is a flat
// boolean array parallel to `grid` (true = not yet chipped away).
function frFamilyTotalCount(present, grid, family, colorFamily) {
  let n = 0;
  for (let i = 0; i < grid.length; i++) if (present[i] && colorFamily[grid[i]] === family) n++;
  return n;
}
// Scoped down to what's still genuinely up for grabs — several containers
// can collect the same family in parallel (see frOnDepotCellTap), so a NEW
// container mustn't be handed supply another active one already has
// reserved via its own capacity target. Mirrors msFamilyUnclaimedCount.
function frFamilyUnclaimedCount(fr, level, family) {
  const total = frFamilyTotalCount(fr.present, level.grid, family, level.colorFamily);
  const committed = fr.containers
    .filter(c => c.family === family)
    .reduce((sum, c) => sum + Math.max(0, c.capacity - c.filled), 0);
  return Math.max(0, total - committed);
}
// How many currently-EXPOSED (boundary) cells match this family — `exposed`
// is a Set of grid indices. Used the same way msFamilyExposedCount is: to
// tell a genuinely stuck color (buried, unreachable right now) apart from
// one that's just not yet assigned a container.
function frFamilyExposedCount(exposed, grid, family, colorFamily) {
  let n = 0;
  for (const idx of exposed) if (colorFamily[grid[idx]] === family) n++;
  return n;
}
function frTotalsByFamily(totalByColor, colorFamily) {
  const out = new Map();
  for (const [color, count] of totalByColor) {
    const fam = colorFamily[color];
    out.set(fam, (out.get(fam) || 0) + count);
  }
  return out;
}
function frIsCleared(present) { return present.every(v => !v); }

// Positional "parking-jam" gate, identical logic to Mosaik's msIsDepotBlocked
// (itself ported from Parkplatz's plIsBlocked) — kept as Fresko's own copy
// rather than a runtime cross-file call, matching this codebase's
// each-game-owns-its-logic convention (generator scripts reach across files
// via require(), the shipped game code never does).
function frIsDepotBlocked(cells, released, idx) {
  const cell = cells[idx];
  for (let j = 0; j < cells.length; j++) {
    if (j === idx || released[j]) continue;
    const o = cells[j];
    if (cell.dir === 0 && o.c === cell.c && o.r < cell.r) return true;
    if (cell.dir === 1 && o.r === cell.r && o.c > cell.c) return true;
    if (cell.dir === 2 && o.c === cell.c && o.r > cell.r) return true;
    if (cell.dir === 3 && o.r === cell.r && o.c < cell.c) return true;
  }
  return false;
}

// Builds the boundary set from scratch: a present cell is exposed if it
// touches the grid's outer edge, or touches any already-cleared (non-
// present) neighbor. Used at level start/resume; frRemoveCell below
// maintains this set incrementally as cells are chipped away rather than
// rebuilding it every tick.
function frExposedFromPresent(present, rows, cols) {
  const exposed = new Set();
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      if (!present[idx]) continue;
      if (r === 0 || r === rows - 1 || c === 0 || c === cols - 1) { exposed.add(idx); continue; }
      if (!present[idx - cols] || !present[idx + cols] || !present[idx - 1] || !present[idx + 1]) exposed.add(idx);
    }
  }
  return exposed;
}

// Chips one cell out: clears it from `present`/`exposed`, then re-checks its
// up-to-4 grid neighbors — any that are still present are now themselves
// touching an empty cell, so they join `exposed` (a no-op via Set semantics
// if already present in it). This is the whole "peel inward" mechanic: no
// cascading beyond one ring per removal, since only a cell's DIRECT
// neighbors can ever newly become boundary from a single chip.
function frRemoveCell(state, idx) {
  state.present[idx] = false;
  state.exposed.delete(idx);
  const r = Math.floor(idx / state.cols), c = idx % state.cols;
  if (r > 0 && state.present[idx - state.cols]) state.exposed.add(idx - state.cols);
  if (r < state.rows - 1 && state.present[idx + state.cols]) state.exposed.add(idx + state.cols);
  if (c > 0 && state.present[idx - 1]) state.exposed.add(idx - 1);
  if (c < state.cols - 1 && state.present[idx + 1]) state.exposed.add(idx + 1);
}

// `onCollect`, if given, is invoked synchronously with { idx, color,
// container } for every real chip (never for a no-op) — a purely cosmetic
// side-channel, same contract as Mosaik's msTick onCollect. MUTATES
// state.present/state.exposed/state.containers directly.
function frTick(state, dtMs, onCollect) {
  const collected = [];
  const stillActive = [];
  for (const c of state.containers) {
    c.msSinceCollect += dtMs;
    if (c.filled < c.capacity && c.msSinceCollect >= state.collectIntervalMs) {
      let burst = 0;
      while (burst < FR_MAX_COLLECT_PER_BURST && c.filled < c.capacity) {
        let idx = null, seen = 0;
        // Reservoir-sample one matching exposed cell — avoids materializing
        // a candidates array every tick (exposed can be a meaningful
        // fraction of the whole picture once a level is half-peeled).
        for (const cand of state.exposed) {
          if (state.colorFamily[state.grid[cand]] !== c.family) continue;
          seen++;
          if (Math.random() < 1 / seen) idx = cand;
        }
        if (idx == null) break;
        const color = state.grid[idx];
        frRemoveCell(state, idx);
        c.filled++;
        burst++;
        collected.push(idx);
        if (onCollect) onCollect({ idx, color, container: c });
      }
      c.msSinceCollect = 0;
    }
    if (c.filled < c.capacity) stillActive.push(c); // else: bucket's done, frees its slot
  }
  state.containers = stillActive;
  return collected;
}

/* ══════════════════════════════════════════════════════════
   GAME FLOW — reads/writes G.fresko
══════════════════════════════════════════════════════════ */
let frRafId = null;
let frLastFrameTime = null;
let frPictureCtx = null;
let frPictureImageData = null;
// Runtime-only boundary cache (a Set — not JSON-safe, so deliberately kept
// OFF G.fresko, unlike `present`/`containers`, which must survive a
// save/reload). Invalidated (set null) on every fresh level start and every
// resumed-from-save load; frStartLoop lazily rebuilds it from `present` the
// first time it's needed and then maintains it incrementally via frRemoveCell.
let frExposedSet = null;

function frOnDepotCellTap(cellIdx) {
  const fr = G.fresko;
  if (fr.currentLevelIndex == null) return;
  const level = frGenerateLevel(fr.currentLevelIndex);
  if (!level.depot || cellIdx < 0 || cellIdx >= level.depot.cells.length) return;
  const released = fr.depotReleased;
  if (released[cellIdx]) return; // already sent
  if (frIsDepotBlocked(level.depot.cells, released, cellIdx)) {
    showToast("🔒 Blockiert! Erst andere Fächer freischalten.");
    return;
  }
  const color = level.depot.cells[cellIdx].color;
  const family = level.depot.cells[cellIdx].family;
  const slotsUnlocked = fr.slotsUnlocked || level.db;
  if (fr.containers.length >= slotsUnlocked) { showToast("🪣 Keine freie Behälter! Mehr freischalten (1 Frage) oder einen verwerfen?"); return; }
  const remaining = frFamilyUnclaimedCount(fr, level, family);
  if (remaining > 0) {
    fr.containers.push({
      color, family, capacity: Math.min(frBucketCapacity(level.grid.length), remaining),
      filled: 0, msSinceCollect: 0,
    });
  } // else: nothing left to collect (another cell of this family already finished it) — still sent, just empty
  released[cellIdx] = true;
  saveState();
  frRenderColorRow(level);
}

function frBuyExtraSlot() {
  const fr = G.fresko;
  if (fr.currentLevelIndex == null) return;
  const level = frGenerateLevel(fr.currentLevelIndex);
  const slotsUnlocked = fr.slotsUnlocked || level.db;
  if (slotsUnlocked >= level.db) {
    showToast(`Maximal ${level.db} Behälter für dieses Level!`);
    return;
  }
  if (!hasActiveQuestions()) {
    showToast("Keine aktiven Fragen! Aktiviere Kapitel unter 📚.");
    return;
  }
  askQuestions("🪣 Behälter freischalten", 1, () => {
    fr.slotsUnlocked = slotsUnlocked + 1;
    G.stats.freskoSlotsUnlocked = (G.stats.freskoSlotsUnlocked || 0) + 1;
    checkTrophies();
    saveState();
    frRenderColorRow(level);
    showToast("🪣 Neuer Behälterplatz freigeschaltet!");
  }, null);
}

function frOnLevelSolved() {
  G.stats.freskoLevelsCompleted = (G.stats.freskoLevelsCompleted || 0) + 1;
  checkTrophies();
  showToast("🏛️ Fresko freigelegt!");
  saveState();
  setTimeout(frAdvanceToNextLevel, 900);
}

function frAdvanceToNextLevel() {
  const fr = G.fresko;
  fr.playOrderPos++;
  if (fr.playOrderPos >= fr.playOrder.length) {
    const prevLast = fr.playOrder[fr.playOrder.length - 1];
    const order = shuffleArray([...Array(FR_LEVEL_COUNT).keys()]);
    if (order[0] === prevLast) [order[0], order[1]] = [order[1], order[0]];
    fr.playOrder = order;
    fr.playOrderPos = 0;
  }
  frStartLevel(fr.playOrder[fr.playOrderPos]);
}

function frStartLevel(levelIndex) {
  const fr = G.fresko;
  const level = frGenerateLevel(levelIndex);
  fr.currentLevelIndex = levelIndex;
  fr.present = new Array(level.grid.length).fill(true);
  fr.containers = [];
  fr.discardsUsed = 0;
  fr.slotsUnlocked = Math.max(1, level.db - FR_STARTING_SLOTS_HANDICAP);
  fr.depotReleased = level.depot ? new Array(level.depot.cells.length).fill(false) : [];
  frExposedSet = null; // fresh present array — old boundary cache no longer applies
  saveState();
  frSetupCanvas(level);
  frRenderColorRow(level);
}

function frRestartLevel() {
  const fr = G.fresko;
  if (fr.currentLevelIndex == null) return;
  frStartLevel(fr.currentLevelIndex);
  showToast("🔄 Level neu gestartet.");
}

function frEnsureQueueAndLevel() {
  const fr = G.fresko;
  const staleIndex = fr.playOrder.some(i => i >= FR_LEVEL_COUNT) ||
    (fr.currentLevelIndex != null && fr.currentLevelIndex >= FR_LEVEL_COUNT);
  if (!fr.playOrder.length || staleIndex) {
    fr.playOrder = shuffleArray([...Array(FR_LEVEL_COUNT).keys()]);
    fr.playOrderPos = 0;
    fr.currentLevelIndex = null;
    fr.present = [];
  }
  if (fr.currentLevelIndex == null || !fr.present.length) {
    frStartLevel(fr.playOrder[fr.playOrderPos]);
  } else {
    const level = frGenerateLevel(fr.currentLevelIndex);
    frExposedSet = null; // resumed from save — rebuild the boundary cache from the loaded present array
    frSetupCanvas(level, true); // reconstruct the picture bitmap from the current (already-chipped) present mask
    frRenderColorRow(level);
  }
  frStartLoop();
}

function frDiscardContainer(containerIndex) {
  const fr = G.fresko;
  if (fr.currentLevelIndex == null) return;
  if (containerIndex < 0 || containerIndex >= fr.containers.length) return;
  if ((fr.discardsUsed || 0) >= FR_MAX_DISCARDS_PER_LEVEL) {
    showToast(`Maximal ${FR_MAX_DISCARDS_PER_LEVEL} Verwerfungen pro Level!`);
    return;
  }
  const level = frGenerateLevel(fr.currentLevelIndex);
  if (level.depot) {
    const family = fr.containers[containerIndex].family;
    const hasReinforcement = level.depot.cells.some((cell, i) => cell.family === family && !fr.depotReleased[i]);
    if (!hasReinforcement) {
      showToast("🚫 Letzter Behälter dieser Farbe — kann nicht verworfen werden!");
      return;
    }
  }
  if (!hasActiveQuestions()) {
    showToast("Keine aktiven Fragen! Aktiviere Kapitel unter 📚.");
    return;
  }
  askQuestions("🗑️ Behälter verwerfen", 1, () => {
    fr.containers.splice(containerIndex, 1);
    fr.discardsUsed = (fr.discardsUsed || 0) + 1;
    G.stats.freskoContainersDiscarded = (G.stats.freskoContainersDiscarded || 0) + 1;
    checkTrophies();
    saveState();
    frRenderColorRow(level);
    showToast("🗑️ Behälter verworfen — Platz frei!");
  }, null);
}

/* ══════════════════════════════════════════════════════════
   RENDERING — one native-resolution canvas (one canvas pixel per grid
   cell, scaled up via CSS `image-rendering: pixelated`), updated
   incrementally via ImageData as cells are chipped away. No belt/overlay/
   particle canvas — containers never move, they're just rows in the
   bucket-row UI (frRenderColorRow), same DOM-rebuild-on-change convention
   as the rest of this app.
══════════════════════════════════════════════════════════ */
function frHexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function frSetupCanvas(level, preserveCurrentPresent) {
  const pictureCanvas = document.getElementById("fr-grid");
  if (!pictureCanvas) return;
  pictureCanvas.width = level.cols;
  pictureCanvas.height = level.rows;
  frPictureCtx = pictureCanvas.getContext("2d");
  frPictureImageData = frPictureCtx.createImageData(level.cols, level.rows);

  const fr = G.fresko;
  const present = preserveCurrentPresent ? fr.present : new Array(level.grid.length).fill(true);
  const buf = frPictureImageData.data;
  for (let i = 0; i < level.grid.length; i++) {
    const j = i * 4;
    if (!present[i]) { buf[j + 3] = 0; continue; }
    const [rr, gg, bb] = level.paletteRgb[level.grid[i]];
    buf[j] = rr; buf[j + 1] = gg; buf[j + 2] = bb; buf[j + 3] = 255;
  }
  frPictureCtx.putImageData(frPictureImageData, 0, 0);
}

// Clears exactly one cell in the persistent ImageData buffer and blits it —
// cheap regardless of picture size, same principle as Mosaik's msRedrawColumn
// but per-CELL rather than per-column (no column to re-compact here).
function frRedrawCell(idx, cols) {
  if (!frPictureCtx || !frPictureImageData) return;
  const buf = frPictureImageData.data;
  buf[idx * 4 + 3] = 0;
  const x = idx % cols, y = Math.floor(idx / cols);
  frPictureCtx.putImageData(frPictureImageData, 0, 0, x, y, 1, 1);
}

function frRenderColorRow(level) {
  const fr = G.fresko;
  const infoEl = document.getElementById("fr-level-info");
  const bucketRowEl = document.getElementById("fr-bucket-row");
  const colorRowEl = document.getElementById("fr-color-row");
  const discardStatusEl = document.getElementById("fr-discard-status");
  const buySlotBtn = document.getElementById("fr-buy-slot-btn");
  if (!colorRowEl) return;

  const slotsUnlocked = fr.slotsUnlocked || level.db;

  if (infoEl) {
    infoEl.textContent = `Level ${fr.currentLevelIndex + 1} / ${FR_LEVEL_COUNT}` + (level.title ? ` — ${level.title}` : '');
  }

  if (bucketRowEl) {
    bucketRowEl.innerHTML = Array.from({ length: level.db }, (_, i) => {
      if (i >= slotsUnlocked) return `<div class="fr-bucket-slot fr-bucket-slot--locked"></div>`;
      const c = fr.containers[i];
      if (!c) return `<div class="fr-bucket-slot fr-bucket-slot--empty"></div>`;
      const pct = Math.round((c.filled / c.capacity) * 100);
      return `<button class="fr-bucket-slot fr-bucket-slot--filled" style="background:${level.paletteHex[c.color]};" data-idx="${i}" title="Verwerfen (1 Frage)">
        <div class="fr-bucket-fill" style="height:${pct}%"></div>
        <span class="fr-bucket-label">${c.filled}/${c.capacity}</span>
      </button>`;
    }).join("");
    bucketRowEl.querySelectorAll(".fr-bucket-slot--filled").forEach(el => {
      el.onclick = () => frDiscardContainer(parseInt(el.dataset.idx, 10));
    });
  }

  colorRowEl.className = "fr-depot-grid";
  if (!level.depot) {
    colorRowEl.innerHTML = "";
  } else {
    const released = fr.depotReleased || [];
    colorRowEl.style.gridTemplateColumns = `repeat(${level.depot.grid[1]}, 1fr)`;
    colorRowEl.style.gridTemplateRows = `repeat(${level.depot.grid[0]}, 1fr)`;
    colorRowEl.innerHTML = level.depot.cells.map((cell, idx) => {
      if (released[idx]) return "";
      const pos = `grid-row:${cell.r + 1};grid-column:${cell.c + 1};`;
      const bg = `background:${level.paletteHex[cell.color]};`;
      const blocked = frIsDepotBlocked(level.depot.cells, released, idx);
      const exhausted = !blocked && frFamilyUnclaimedCount(fr, level, cell.family) === 0;
      const cls = blocked ? "fr-depot-cell--blocked" : exhausted ? "fr-depot-cell--exhausted" : "fr-depot-cell--idle";
      const glyph = blocked ? FR_DIR_GLYPH[cell.dir] : "";
      return `<button class="fr-depot-cell ${cls}" style="${pos}${bg}" data-idx="${idx}" title="${blocked ? 'Blockiert' : 'Bereit'}">${glyph}</button>`;
    }).join("");
    colorRowEl.querySelectorAll(".fr-depot-cell:not([disabled])").forEach(el => {
      el.onclick = () => frOnDepotCellTap(parseInt(el.dataset.idx, 10));
    });
  }

  if (discardStatusEl) {
    discardStatusEl.textContent = `🗑️ ${fr.discardsUsed || 0}/${FR_MAX_DISCARDS_PER_LEVEL}`;
  }

  if (buySlotBtn) {
    const atCap = slotsUnlocked >= level.db;
    buySlotBtn.disabled = atCap;
    buySlotBtn.title = atCap ? "Maximal erreicht" : `Behälter freischalten (1 Frage) · ${slotsUnlocked}/${level.db}`;
    const badge = document.getElementById("fr-buy-slot-badge");
    if (badge) badge.textContent = atCap ? "✓" : `+`;
  }
}

function frStartLoop() {
  if (frRafId != null) return; // already running
  frLastFrameTime = null;
  const frame = (t) => {
    const screenEl = document.getElementById("screen-fresko");
    if (!screenEl || screenEl.hidden) { frRafId = null; return; } // tab switched away — stop, restarted by frEnsureQueueAndLevel on return
    const fr = G.fresko;
    if (fr.currentLevelIndex == null) { frRafId = requestAnimationFrame(frame); return; }
    const level = frGenerateLevel(fr.currentLevelIndex);
    const dtMs = frLastFrameTime == null ? 0 : Math.min(200, t - frLastFrameTime); // clamp huge gaps (tab was backgrounded)
    frLastFrameTime = t;

    if (dtMs > 0 && fr.containers.length) {
      if (!frExposedSet) frExposedSet = frExposedFromPresent(fr.present, level.rows, level.cols);
      const tickState = {
        present: fr.present, exposed: frExposedSet,
        containers: fr.containers, grid: level.grid, rows: level.rows, cols: level.cols,
        colorFamily: level.colorFamily, collectIntervalMs: FR_COLLECT_INTERVAL_MS,
      };
      const collected = frTick(tickState, dtMs);
      fr.containers = tickState.containers;
      if (collected.length) {
        collected.forEach(idx => frRedrawCell(idx, level.cols));
        saveState();
        frRenderColorRow(level);
        if (frIsCleared(fr.present)) { frOnLevelSolved(); frRafId = requestAnimationFrame(frame); return; }
      }
    }
    frRafId = requestAnimationFrame(frame);
  };
  frRafId = requestAnimationFrame(frame);
}

if (typeof window !== 'undefined') {
  window.frOnDepotCellTap = frOnDepotCellTap;
  window.frRestartLevel = frRestartLevel;
  window.frEnsureQueueAndLevel = frEnsureQueueAndLevel;
  window.frDiscardContainer = frDiscardContainer;
  window.frBuyExtraSlot = frBuyExtraSlot;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    FR_LEVELS, FR_LEVEL_COUNT, FR_MAX_DISCARDS_PER_LEVEL, FR_STARTING_SLOTS_HANDICAP,
    FR_TARGET_BUCKET_COUNT, FR_COLLECT_INTERVAL_MS, FR_MAX_COLLECT_PER_BURST,
    frGenerateLevel, frDecodePixels, frHexToRgb,
    frOriginalColorTotals, frBucketCapacity, frColorsInLevel, frFamiliesInLevel,
    frFamilyTotalCount, frFamilyUnclaimedCount, frFamilyExposedCount, frTotalsByFamily,
    frIsCleared, frIsDepotBlocked, frExposedFromPresent, frRemoveCell, frTick,
  };
}
