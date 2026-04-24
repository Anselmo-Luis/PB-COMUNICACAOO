import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(rootDir, 'public');
const logoPath = path.join(publicDir, 'assets', 'logo.png');
const outputPath = path.join(publicDir, 'assets', 'og-image.jpg');

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

const logo = await fs.readFile(logoPath);
const logoData = `data:image/png;base64,${logo.toString('base64')}`;

const title = 'P&B Comunicacao Visual';
const subtitle = 'Sinalizacao corporativa, fachadas, letras caixa, totens, adesivos e projetos visuais desde 2002.';

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#071006"/>
      <stop offset="0.52" stop-color="#111315"/>
      <stop offset="1" stop-color="#1f6f1b"/>
    </linearGradient>
    <radialGradient id="glow" cx="72%" cy="20%" r="70%">
      <stop offset="0" stop-color="#2EA729" stop-opacity="0.55"/>
      <stop offset="0.55" stop-color="#0071E3" stop-opacity="0.24"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <circle cx="1010" cy="115" r="260" fill="#2EA729" opacity="0.11"/>
  <circle cx="1035" cy="525" r="360" fill="#0071E3" opacity="0.10"/>
  <rect x="72" y="72" width="1056" height="486" rx="38" fill="#FFFFFF" fill-opacity="0.055" stroke="#FFFFFF" stroke-opacity="0.13"/>
  <image href="${logoData}" x="94" y="92" width="170" height="86" preserveAspectRatio="xMidYMid meet"/>
  <text x="94" y="308" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="700" letter-spacing="-2">
    ${escapeXml(title)}
  </text>
  <text x="98" y="374" fill="#D8E9D6" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="500">
    ${escapeXml('Projetos visuais corporativos de alto impacto')}
  </text>
  <foreignObject x="98" y="408" width="760" height="96">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: Arial, Helvetica, sans-serif; color: rgba(255,255,255,0.72); font-size: 26px; line-height: 1.32;">
      ${escapeXml(subtitle)}
    </div>
  </foreignObject>
  <rect x="98" y="500" width="278" height="42" rx="21" fill="#2EA729"/>
  <text x="123" y="528" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="700" letter-spacing="1.5">
    DESDE 2002
  </text>
</svg>`;

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await sharp(Buffer.from(svg)).jpeg({ quality: 84, mozjpeg: true }).toFile(outputPath);
console.log(`generated ${path.relative(rootDir, outputPath)}`);
