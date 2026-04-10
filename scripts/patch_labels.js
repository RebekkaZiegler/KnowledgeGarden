const fs = require('fs');
let c = fs.readFileSync('js/content.js', 'utf8');
const before = (c.match(/hpReward/g)||[]).length;

const bedIds = {
  knochenlehre: 'knochenlehre_1033',
  atmungssystem: 'atmungssystem_1035',
  histologie:    'histologie_1032',
  muskellehre:   'muskellehre_1034'
};

// Remove hpReward line and append bedId after the imagePath line
c = c.replace(
  /[ \t]*hpReward: 1,\n([ \t]+passRate:[^\n]+\n[ \t]+diagramType:[^\n]+\n[ \t]+imagePath: "assets\/diagrams\/(knochenlehre|atmungssystem|histologie|muskellehre)[^"]+",)/g,
  (m, rest, prefix) => rest + '\n    bedId: "' + bedIds[prefix] + '",'
);

const after  = (c.match(/hpReward/g)||[]).length;
const beds   = (c.match(/bedId:/g)||[]).length;
fs.writeFileSync('js/content.js', c, 'utf8');
console.log('hpReward before:', before, '| after:', after, '| bedId lines added:', beds);
