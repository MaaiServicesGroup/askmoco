import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const appDir = join(__dirname, '..', 'src', 'app');

// The favicon SVG — a bold "M" on MOCO brand dark background with accent gradient
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#1a1a2e"/>
      <stop offset="100%" stop-color="#232340"/>
    </linearGradient>
    <linearGradient id="txt" x1="0" y1="200" x2="512" y2="200" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#f0f0f5"/>
      <stop offset="40%" stop-color="#48cae4"/>
      <stop offset="100%" stop-color="#00b4d8"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="96" fill="url(#bg)"/>
  <rect x="3" y="3" width="506" height="506" rx="93" fill="none" stroke="#3a3a5c" stroke-width="3" stroke-opacity="0.4"/>
  <text x="256" y="340" text-anchor="middle" font-family="system-ui, -apple-system, 'Segoe UI', Helvetica, sans-serif" font-weight="800" font-size="280" fill="url(#txt)">M</text>
  <line x1="128" y1="400" x2="384" y2="400" stroke="#00b4d8" stroke-width="6" stroke-linecap="round" stroke-opacity="0.7"/>
</svg>`;

const svgBuffer = Buffer.from(faviconSvg);

async function generate() {
  // Generate PNG at multiple sizes for the ICO
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const png16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  const png180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  const png192 = await sharp(svgBuffer).resize(192, 192).png().toBuffer();
  const png512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();

  // Create ICO file (simple format: just embed the 32x32 PNG)
  // ICO header: 2 bytes reserved (0), 2 bytes type (1=ICO), 2 bytes count
  // ICO entry: 16 bytes per entry
  // Then raw PNG data

  const entries = [
    { size: 16, data: png16 },
    { size: 32, data: png32 },
  ];

  const headerSize = 6;
  const entrySize = 16;
  const dirSize = headerSize + entries.length * entrySize;

  let offset = dirSize;
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: ICO
  header.writeUInt16LE(entries.length, 4); // count

  const dirEntries = Buffer.alloc(entries.length * entrySize);
  const imageBuffers = [];

  for (let i = 0; i < entries.length; i++) {
    const e = entries[i];
    const off = i * entrySize;
    dirEntries.writeUInt8(e.size === 256 ? 0 : e.size, off + 0); // width
    dirEntries.writeUInt8(e.size === 256 ? 0 : e.size, off + 1); // height
    dirEntries.writeUInt8(0, off + 2); // color palette
    dirEntries.writeUInt8(0, off + 3); // reserved
    dirEntries.writeUInt16LE(1, off + 4); // color planes
    dirEntries.writeUInt16LE(32, off + 6); // bits per pixel
    dirEntries.writeUInt32LE(e.data.length, off + 8); // data size
    dirEntries.writeUInt32LE(offset, off + 12); // data offset
    offset += e.data.length;
    imageBuffers.push(e.data);
  }

  const ico = Buffer.concat([header, dirEntries, ...imageBuffers]);

  // Write files
  writeFileSync(join(appDir, 'favicon.ico'), ico);
  writeFileSync(join(publicDir, 'apple-touch-icon.png'), png180);
  writeFileSync(join(publicDir, 'icon-192.png'), png192);
  writeFileSync(join(publicDir, 'icon-512.png'), png512);

  console.log('✓ favicon.ico (16x16 + 32x32)');
  console.log('✓ apple-touch-icon.png (180x180)');
  console.log('✓ icon-192.png (192x192)');
  console.log('✓ icon-512.png (512x512)');

  // Also generate the OG image
  const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" fill="none">
    <defs>
      <linearGradient id="obg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#1a1a2e"/>
        <stop offset="100%" stop-color="#232340"/>
      </linearGradient>
      <linearGradient id="otxt" x1="200" y1="200" x2="900" y2="200" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#f0f0f5"/>
        <stop offset="40%" stop-color="#48cae4"/>
        <stop offset="100%" stop-color="#00b4d8"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#obg)"/>
    <!-- Grid pattern -->
    <line x1="0" y1="0" x2="0" y2="630" stroke="#00b4d8" stroke-opacity="0.05" stroke-width="1"/>
    <line x1="60" y1="0" x2="60" y2="630" stroke="#00b4d8" stroke-opacity="0.05" stroke-width="1"/>
    <line x1="120" y1="0" x2="120" y2="630" stroke="#00b4d8" stroke-opacity="0.05" stroke-width="1"/>
    <line x1="180" y1="0" x2="180" y2="630" stroke="#00b4d8" stroke-opacity="0.05" stroke-width="1"/>
    <line x1="240" y1="0" x2="240" y2="630" stroke="#00b4d8" stroke-opacity="0.05" stroke-width="1"/>
    <line x1="300" y1="0" x2="300" y2="630" stroke="#00b4d8" stroke-opacity="0.05" stroke-width="1"/>
    <line x1="0" y1="60" x2="1200" y2="60" stroke="#00b4d8" stroke-opacity="0.05" stroke-width="1"/>
    <line x1="0" y1="120" x2="1200" y2="120" stroke="#00b4d8" stroke-opacity="0.05" stroke-width="1"/>
    <line x1="0" y1="180" x2="1200" y2="180" stroke="#00b4d8" stroke-opacity="0.05" stroke-width="1"/>
    <line x1="0" y1="240" x2="1200" y2="240" stroke="#00b4d8" stroke-opacity="0.05" stroke-width="1"/>
    <text x="600" y="280" text-anchor="middle" font-family="system-ui, -apple-system, 'Segoe UI', Helvetica, sans-serif" font-weight="800" font-size="160" letter-spacing="-2" fill="url(#otxt)">MOCO</text>
    <text x="600" y="340" text-anchor="middle" font-family="system-ui, -apple-system, 'Segoe UI', Helvetica, sans-serif" font-weight="400" font-size="20" letter-spacing="12" fill="#8888a4">MARKETING · OPERATIONS · CONTENT · OUTREACH</text>
    <line x1="350" y1="380" x2="850" y2="380" stroke="#00b4d8" stroke-width="2" stroke-linecap="round" stroke-opacity="0.3"/>
    <text x="600" y="430" text-anchor="middle" font-family="system-ui, -apple-system, 'Segoe UI', Helvetica, sans-serif" font-weight="600" font-size="28" fill="#f0f0f5">Your Digital Team Member</text>
    <text x="600" y="530" text-anchor="middle" font-family="system-ui, -apple-system, 'Segoe UI', Helvetica, sans-serif" font-weight="400" font-size="16" fill="#8888a4">Built by Maai Designs · askmoco.com</text>
  </svg>`;

  const ogPng = await sharp(Buffer.from(ogSvg)).resize(1200, 630).jpeg({ quality: 90 }).toBuffer();
  writeFileSync(join(publicDir, 'og', 'og-image.jpg'), ogPng);
  console.log('✓ og-image.jpg (1200x630)');
}

generate().catch(console.error);
