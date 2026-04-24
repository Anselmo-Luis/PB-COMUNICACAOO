import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(rootDir, 'public');

function iconSvg(size) {
  const fontSize = Math.round(size * 0.34);
  return `
  <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#2EA729"/>
        <stop offset="1" stop-color="#0071E3"/>
      </linearGradient>
    </defs>
    <rect width="${size}" height="${size}" rx="${Math.round(size * 0.22)}" fill="#0A0D0A"/>
    <circle cx="${Math.round(size * 0.78)}" cy="${Math.round(size * 0.22)}" r="${Math.round(size * 0.35)}" fill="url(#g)" opacity="0.42"/>
    <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="800" letter-spacing="-1">P&amp;B</text>
  </svg>`;
}

async function writePng(size, fileName) {
  const outputPath = path.join(publicDir, fileName);
  await sharp(Buffer.from(iconSvg(size))).png().toFile(outputPath);
  console.log(`generated ${path.relative(rootDir, outputPath)}`);
  return fs.readFile(outputPath);
}

function wrapPngAsIco(png) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  header.writeUInt8(32, 6);
  header.writeUInt8(32, 7);
  header.writeUInt8(0, 8);
  header.writeUInt8(0, 9);
  header.writeUInt16LE(1, 10);
  header.writeUInt16LE(32, 12);
  header.writeUInt32LE(png.length, 14);
  header.writeUInt32LE(22, 18);
  return Buffer.concat([header, png]);
}

await fs.mkdir(publicDir, { recursive: true });

const svgPath = path.join(publicDir, 'favicon.svg');
await fs.writeFile(svgPath, iconSvg(128).trim());
console.log(`generated ${path.relative(rootDir, svgPath)}`);

const png32 = await writePng(32, 'favicon-32x32.png');
await writePng(16, 'favicon-16x16.png');
await writePng(180, 'apple-touch-icon.png');

const icoPath = path.join(publicDir, 'favicon.ico');
await fs.writeFile(icoPath, wrapPngAsIco(png32));
console.log(`generated ${path.relative(rootDir, icoPath)}`);
