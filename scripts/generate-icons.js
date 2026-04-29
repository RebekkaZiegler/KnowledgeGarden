#!/usr/bin/env node
// Generates PWA icons at 192×192 and 512×512 using only Node.js built-ins.
// Run: node scripts/generate-icons.js

const zlib = require('zlib');
const fs   = require('fs');
const path = require('path');

// ── Minimal PNG encoder ──────────────────────────────────────────────────────
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = (c & 1) ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
    t[i] = c;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}
function pngChunk(type, data) {
  const tb = Buffer.from(type, 'ascii');
  const lb = Buffer.alloc(4); lb.writeUInt32BE(data.length);
  const cb = Buffer.alloc(4); cb.writeUInt32BE(crc32(Buffer.concat([tb, data])));
  return Buffer.concat([lb, tb, data, cb]);
}
function encodePNG(pixels, w, h) {
  const sig  = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 6; // 8-bit RGBA
  const raw = Buffer.alloc(h * (1 + w * 4));
  for (let y = 0; y < h; y++) {
    raw[y * (1 + w * 4)] = 0;
    for (let x = 0; x < w; x++) {
      const s = (y * w + x) * 4, d = y * (1 + w * 4) + 1 + x * 4;
      raw[d] = pixels[s]; raw[d+1] = pixels[s+1]; raw[d+2] = pixels[s+2]; raw[d+3] = pixels[s+3];
    }
  }
  return Buffer.concat([sig, pngChunk('IHDR', ihdr), pngChunk('IDAT', zlib.deflateSync(raw, {level:9})), pngChunk('IEND', Buffer.alloc(0))]);
}

// ── Drawing helpers ───────────────────────────────────────────────────────────
function drawIcon(size) {
  const px = new Uint8Array(size * size * 4);
  const sc = v => Math.round(v * size / 512);

  const set = (x, y, r, g, b, a = 255) => {
    if (x < 0 || y < 0 || x >= size || y >= size) return;
    const i = (y * size + x) * 4;
    const f = a / 255;
    px[i]   = Math.round(px[i]   * (1-f) + r * f);
    px[i+1] = Math.round(px[i+1] * (1-f) + g * f);
    px[i+2] = Math.round(px[i+2] * (1-f) + b * f);
    px[i+3] = Math.min(255, px[i+3] + a);
  };

  const rect = (x, y, w, h, r, g, b) => {
    for (let py = sc(y); py < sc(y+h); py++)
      for (let px2 = sc(x); px2 < sc(x+w); px2++)
        set(px2, py, r, g, b);
  };

  const roundRect = (x, y, w, h, cr, r, g, b) => {
    const [x1,y1,x2,y2,crs] = [sc(x),sc(y),sc(x+w),sc(y+h),sc(cr)];
    for (let py = y1; py <= y2; py++) {
      for (let px2 = x1; px2 <= x2; px2++) {
        let ok = true;
        if      (px2 < x1+crs && py < y1+crs) ok = (px2-(x1+crs))**2 + (py-(y1+crs))**2 <= crs*crs;
        else if (px2 > x2-crs && py < y1+crs) ok = (px2-(x2-crs))**2 + (py-(y1+crs))**2 <= crs*crs;
        else if (px2 < x1+crs && py > y2-crs) ok = (px2-(x1+crs))**2 + (py-(y2-crs))**2 <= crs*crs;
        else if (px2 > x2-crs && py > y2-crs) ok = (px2-(x2-crs))**2 + (py-(y2-crs))**2 <= crs*crs;
        if (ok) set(px2, py, r, g, b);
      }
    }
  };

  const circle = (cx, cy, rad, r, g, b) => {
    const [cxs,cys,rs] = [sc(cx),sc(cy),sc(rad)];
    for (let py = cys-rs-1; py <= cys+rs+1; py++) {
      for (let px2 = cxs-rs-1; px2 <= cxs+rs+1; px2++) {
        const d = Math.sqrt((px2-cxs)**2 + (py-cys)**2);
        if (d < rs-0.5) set(px2,py,r,g,b);
        else if (d < rs+0.5) set(px2,py,r,g,b, Math.round((rs+0.5-d)*255));
      }
    }
  };

  const ellipse = (cx, cy, rx, ry, angleDeg, r, g, b) => {
    const a = angleDeg * Math.PI / 180;
    const cos = Math.cos(-a), sin = Math.sin(-a);
    const [cxs,cys,rxs,rys] = [sc(cx),sc(cy),sc(rx),sc(ry)];
    const m = Math.max(rxs,rys)+2;
    for (let py = cys-m; py <= cys+m; py++) {
      for (let px2 = cxs-m; px2 <= cxs+m; px2++) {
        const dx=px2-cxs, dy=py-cys;
        const d = (cos*dx-sin*dy)**2/rxs**2 + (sin*dx+cos*dy)**2/rys**2;
        if (d <= 1) set(px2,py,r,g,b);
        else if (d <= 1.04) set(px2,py,r,g,b, Math.round((1.04-d)/0.04*255));
      }
    }
  };

  const trapezoid = (x1,y1,x2,y2,x3,y3,x4,y4, r,g,b) => {
    const [sx1,sy1,sx2,sy4] = [sc(x1),sc(y1),sc(x2),sc(y4)];
    const [sx3,sx4,sy3] = [sc(x3),sc(x4),sc(y3)];
    for (let py = sy1; py <= sy3; py++) {
      const t = (py-sy1)/(sy3-sy1||1);
      const lx = Math.round(sx1+(sx4-sx1)*t), rx2 = Math.round(sx2+(sx3-sx2)*t);
      for (let px2 = lx; px2 <= rx2; px2++) set(px2,py,r,g,b);
    }
  };

  // ── Plant icon design ──
  // Background — dark green
  roundRect(0, 0, 512, 512, 72,  28, 51, 36);

  // Pot rim
  roundRect(158, 298, 196, 28, 12,  154, 100, 56);
  // Pot body (trapezoid, wider at top)
  trapezoid(170,316, 342,316, 320,408, 192,408,  124, 78, 44);
  // Soil
  ellipse(256, 305, 90, 12, 0,  58, 38, 14);

  // Stem
  roundRect(249, 162, 14, 146, 7,  56, 120, 70);

  // Leaves (ellipses at branch angles)
  ellipse(311, 223, 58, 13, -28,  92, 184, 112);   // right-1
  ellipse(201, 223, 58, 13,  28,  92, 184, 112);   // left-1
  ellipse(318, 265, 50, 12, -22,  74, 168, 94);    // right-2
  ellipse(194, 265, 50, 12,  22,  74, 168, 94);    // left-2

  // Fruits (round red/orange dots)
  circle(328, 208, 15,  232, 88, 52);   // right-1
  circle(184, 208, 15,  232, 88, 52);   // left-1
  circle(320, 252, 13,  200, 68, 36);   // right-2
  circle(192, 252, 13,  200, 68, 36);   // left-2

  return px;
}

// ── Generate files ─────────────────────────────────────────────────────────
const outDir = path.join(__dirname, '..', 'assets', 'images');
for (const size of [192, 512]) {
  const pixels = drawIcon(size);
  const png    = encodePNG(pixels, size, size);
  const file   = path.join(outDir, `icon-${size}.png`);
  fs.writeFileSync(file, png);
  console.log(`✓ ${file}  (${(png.length/1024).toFixed(1)} KB)`);
}
console.log('Done.');
