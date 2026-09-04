import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const sparkleD = 'M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z';

// Clean, vivid branded SVG favicon
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7C3AED" />
      <stop offset="55%" stop-color="#6366F1" />
      <stop offset="100%" stop-color="#06B6D4" />
    </linearGradient>
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#C4B5FD" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#67E8F9" stop-opacity="0.6" />
    </linearGradient>
    <radialGradient id="centerGlow" cx="45%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0" />
    </radialGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#0F172A" flood-opacity="0.4" />
    </filter>
  </defs>

  <!-- Background Squircle with Brand Gradient -->
  <rect x="16" y="16" width="480" height="480" rx="112" fill="url(#bgGrad)" />
  <rect x="16" y="16" width="480" height="480" rx="112" fill="url(#centerGlow)" />
  <rect x="22" y="22" width="468" height="468" rx="106" fill="none" stroke="url(#borderGrad)" stroke-width="12" />

  <!-- Aulad IT Sparkling Star Icon (HiSparkles) -->
  <g transform="translate(68, 68) scale(15.666)" filter="url(#shadow)">
    <path fill="#FFFFFF" fill-rule="evenodd" clip-rule="evenodd" d="${sparkleD}" />
  </g>
</svg>`;

// Helper to build Windows .ico format embedding PNGs
function buildIco(images) {
  const count = images.length;
  let offset = 6 + (16 * count);
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(count, 4);

  const dirEntries = [];
  for (const { width, height, buffer } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(width >= 256 ? 0 : width, 0);
    entry.writeUInt8(height >= 256 ? 0 : height, 1);
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(buffer.length, 8); // Size
    entry.writeUInt32LE(offset, 12); // Offset
    dirEntries.push(entry);
    offset += buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...images.map(img => img.buffer)]);
}

async function run() {
  console.log('Generating favicons for Aulad IT Solution...');
  const svgBuffer = Buffer.from(svgContent, 'utf-8');

  // Paths
  const publicDir = path.join(rootDir, 'public');
  const appDir = path.join(rootDir, 'app');

  // 1. Write SVG icons
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent);
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent);
  fs.writeFileSync(path.join(appDir, 'icon.svg'), svgContent);
  console.log('✓ SVG icons written');

  // 2. Generate PNG sizes
  const sizes = [16, 32, 48, 64, 180, 192, 512];
  const pngBuffers = {};

  for (const size of sizes) {
    const buf = await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toBuffer();
    pngBuffers[size] = buf;
  }

  // 3. Write individual PNGs
  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), pngBuffers[16]);
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), pngBuffers[32]);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), pngBuffers[180]);
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), pngBuffers[180]);
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), pngBuffers[192]);
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), pngBuffers[512]);
  console.log('✓ PNG icons written (16x16, 32x32, 180x180, 192x192, 512x512)');

  // 4. Build ICO (multi-res: 16x16, 32x32, 48x48)
  const icoBuffer = buildIco([
    { width: 16, height: 16, buffer: pngBuffers[16] },
    { width: 32, height: 32, buffer: pngBuffers[32] },
    { width: 48, height: 48, buffer: pngBuffers[48] },
  ]);

  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);
  console.log('✓ Multi-resolution favicon.ico written to public/ and app/');

  console.log('All favicon assets generated successfully!');
}

run().catch(err => {
  console.error('Failed to generate favicons:', err);
  process.exit(1);
});
