#!/usr/bin/env node
// Renders a gallery of all stage SVGs for each new tamagotchi species to a
// PNG screenshot, for visual QA of scripts/generate-tama-species.js output.
// Run: node scripts/screenshot-tama-previews.js
const { chromium } = require('playwright');
const path = require('path');
const fs   = require('fs');

const SPECIES = ['flamm', 'well', 'kiesel'];
const ROOT = path.join(__dirname, '..', 'assets', 'images', 'tamagotchi');

function galleryHtml(spKey) {
  const dir = path.join(ROOT, spKey);
  const row = (title, files) => `
    <h2>${title}</h2>
    <div class="row">
      ${files.map(f => `<div class="stage"><img src="file:///${path.join(dir, f).replace(/\\/g, '/')}"><span>${f}</span></div>`).join('')}
    </div>`;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    body { background:#141a17; color:#ccc; font-family:sans-serif; padding:1rem; }
    h2 { color:#a0c060; margin:1.5rem 0 0.5rem; }
    .row { display:flex; gap:0.5rem; flex-wrap:wrap; }
    .stage { text-align:center; }
    .stage img { width:90px; height:120px; background:#1e2820; border-radius:8px; border:1px solid #334; display:block; }
    .stage span { font-size:0.6rem; color:#888; display:block; margin-top:3px; }
  </style></head><body>
  ${row('Shared (1-5)', [1,2,3,4,5].map(n => `tama_${n}.svg`))}
  ${row('Path A - thriving (a1-5)', [1,2,3,4,5].map(n => `tama_a${n}.svg`))}
  ${row('Path B - content (b1-5)', [1,2,3,4,5].map(n => `tama_b${n}.svg`))}
  ${row('Path C - struggling (c1-5)', [1,2,3,4,5].map(n => `tama_c${n}.svg`))}
  </body></html>`;
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1000, height: 1400 } });
  for (const sp of SPECIES) {
    const htmlPath = path.join(__dirname, `_preview_${sp}.html`);
    fs.writeFileSync(htmlPath, galleryHtml(sp));
    await page.goto('file:///' + htmlPath.replace(/\\/g, '/'));
    const pngPath = path.join(__dirname, `_preview_${sp}.png`);
    await page.screenshot({ path: pngPath, fullPage: true });
    fs.unlinkSync(htmlPath);
    console.log('wrote', pngPath);
  }
  await browser.close();
})();
