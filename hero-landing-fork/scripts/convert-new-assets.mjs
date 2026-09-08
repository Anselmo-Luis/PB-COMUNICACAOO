import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const clientsDir = path.join(root, 'public/assets/clients');
const veicDir = path.join(root, 'public/assets/gallery/veiculos');

const logoSources = [
  ['hinode.png', 'hinode.jpg', '#ffffff'],
  ['adias.svg', 'adias.jpg', '#1a1a2e'],
  ['sabesp-wiki.png', 'sabesp.jpg', '#ffffff'],
  ['sonda-wiki.png', 'sonda.jpg', '#ffffff'],
  ['sonda-official.png', 'sonda.jpg', '#ffffff'],
  ['edp.svg', 'edp.jpg', '#ffffff'],
  ['auto-glass-temp.png', 'auto-glass.jpg', '#ffffff'],
];

for (const [srcName, destName, bg] of logoSources) {
  const src = path.join(clientsDir, srcName);
  const dest = path.join(clientsDir, destName);
  if (!fs.existsSync(src)) {
    console.log(`SKIP missing ${srcName}`);
    continue;
  }
  if (src === dest) continue;
  try {
    const meta = await sharp(src).metadata();
    if (!meta.width) {
      console.log(`SKIP invalid ${srcName}`);
      continue;
    }
    await sharp(src)
      .resize({ width: 400, withoutEnlargement: true })
      .flatten({ background: bg })
      .jpeg({ quality: 90 })
      .toFile(dest);
    console.log(`OK logo ${destName} (${fs.statSync(dest).size} bytes)`);
  } catch (error) {
    console.log(`FAIL ${srcName}: ${error.message}`);
  }
}

for (const n of [17, 18, 19, 20, 21]) {
  const base = `veiculo-${String(n).padStart(2, '0')}`;
  const src = path.join(veicDir, `${base}.jpg`);
  const dest = path.join(veicDir, `${base}.webp`);
  if (!fs.existsSync(src)) {
    console.log(`SKIP missing ${base}.jpg`);
    continue;
  }
  await sharp(src).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(dest);
  console.log(`OK gallery ${base}.webp (${fs.statSync(dest).size} bytes)`);
}
