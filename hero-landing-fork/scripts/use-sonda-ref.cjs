const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const src = path.join(
  process.env.APPDATA,
  'Cursor/User/workspaceStorage/empty-window/images',
  'Gemini_Generated_Image_6fdlgn6fdlgn6fdl-11a32611-2db0-493d-b540-e6a1b905f08b.png',
);
const destPng = path.join('public', 'assets', 'clients', 'sonda.png');
const destJpg = path.join('public', 'assets', 'clients', 'sonda.jpg');

(async () => {
  if (!fs.existsSync(src)) {
    throw new Error(`Missing reference: ${src}`);
  }

  const meta = await sharp(src).metadata();
  console.log('src', meta.width, meta.height);

  const trimmed = await sharp(src).trim({ threshold: 12 }).png().toBuffer();
  const tm = await sharp(trimmed).metadata();
  console.log('trim12', tm.width, tm.height);

  await sharp(trimmed).png().toFile(destPng);
  await sharp(trimmed).jpeg({ quality: 95 }).toFile(destJpg);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
