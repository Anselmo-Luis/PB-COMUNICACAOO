const sharp = require('sharp');
const path = require('path');
const outDir = path.join('public', 'assets', 'clients');

(async () => {
  for (const name of ['sonda', 'adias']) {
    const src = path.join(outDir, `${name}.png`);
    const trimmed = await sharp(src).trim({ threshold: 12 }).png().toBuffer();
    const meta = await sharp(trimmed).metadata();
    console.log(name, meta.width, meta.height);
    await sharp(trimmed).png().toFile(src);
    await sharp(trimmed).jpeg({ quality: 95 }).toFile(path.join(outDir, `${name}.jpg`));
  }
  console.log('trimmed');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
