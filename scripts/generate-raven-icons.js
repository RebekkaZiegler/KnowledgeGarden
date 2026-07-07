#!/usr/bin/env node
// Regenerates the raven PWA icons from icon-512-raven.png's existing bird
// artwork, fixing two bugs: the same file was reused for both "any" and
// "maskable" purposes, and the bird bled to the canvas edges instead of
// sitting inside the maskable "safe zone".
// Run: node scripts/generate-raven-icons.js

const sharp = require('sharp');
const path = require('path');

const outDir = path.join(__dirname, '..', 'assets', 'images');
const SRC = path.join(outDir, 'icon-512-raven.png');
const THEME_BG = { r: 20, g: 26, b: 23, alpha: 1 }; // matches manifest.json theme_color #141a17

async function main() {
  const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height, ch = info.channels;

  // Strip the old file's broken flat-color background fill, keeping only
  // real bird-artwork pixels (with their original antialiased alpha).
  const cleaned = Buffer.from(data);
  let minX = w, minY = h, maxX = 0, maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * ch;
      const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
      const isExactBg = a === 255 && Math.abs(r - THEME_BG.r) <= 2 && Math.abs(g - THEME_BG.g) <= 2 && Math.abs(b - THEME_BG.b) <= 2;
      if (isExactBg) {
        cleaned[i + 3] = 0;
      } else if (a > 0) {
        if (x < minX) minX = x; if (x > maxX) maxX = x;
        if (y < minY) minY = y; if (y > maxY) maxY = y;
      }
    }
  }

  const bird = sharp(cleaned, { raw: { width: w, height: h, channels: ch } })
    .extract({ left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 });
  const birdBuf = await bird.png().toBuffer();
  const bw = maxX - minX + 1, bh = maxY - minY + 1;

  for (const size of [512, 192]) {
    // Scale the bird so its longest side is ~62% of the canvas, comfortably
    // inside the maskable "safe zone" (official guidance: keep content
    // within the centered 66%-diameter circle).
    const target = Math.round(size * 0.62);
    const scale = target / Math.max(bw, bh);
    const rw = Math.round(bw * scale), rh = Math.round(bh * scale);
    const resizedBird = await sharp(birdBuf).resize(rw, rh).toBuffer();
    const left = Math.round((size - rw) / 2), top = Math.round((size - rh) / 2);

    // "any" purpose: transparent background, real cutout.
    await sharp({ create: { width: size, height: size, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
      .composite([{ input: resizedBird, left, top }])
      .png()
      .toFile(path.join(outDir, `icon-${size}-raven.png`));

    // "maskable" purpose: fully opaque background, edge-to-edge.
    await sharp({ create: { width: size, height: size, channels: 4, background: THEME_BG } })
      .composite([{ input: resizedBird, left, top }])
      .png()
      .toFile(path.join(outDir, `icon-${size}-raven-maskable.png`));

    console.log(`✓ icon-${size}-raven.png + icon-${size}-raven-maskable.png`);
  }
}

main().catch(err => { console.error(err); process.exit(1); });
