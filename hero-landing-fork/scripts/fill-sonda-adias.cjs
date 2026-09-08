const sharp = require('sharp');
const path = require('path');

const outDir = path.join('public', 'assets', 'clients');
const width = 800;
const height = 360;
const ref = path.join(
  process.env.USERPROFILE,
  '.cursor/projects/c-Users-Administrador-Documents-PB-COMUNICAO/assets',
  'c__Users_Administrador_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-7f7a0e30-265d-4428-b480-2aaf47fbe772.png',
);

async function extractAdiasFromRef() {
  const meta = await sharp(ref).metadata();
  const half = Math.floor(meta.width / 2);
  const raw = await sharp(ref)
    .extract({ left: half, top: 0, width: meta.width - half, height: meta.height })
    .png()
    .toBuffer();
  return sharp(raw).trim({ threshold: 28 }).png().toBuffer();
}

async function placeOnCanvas({ input, background, pad }) {
  const meta = await sharp(input).metadata();
  const innerW = Math.round(width * (1 - pad * 2));
  const innerH = Math.round(height * (1 - pad * 2));
  const scale = Math.min(innerW / meta.width, innerH / meta.height);
  const logoW = Math.max(1, Math.round(meta.width * scale));
  const logoH = Math.max(1, Math.round(meta.height * scale));

  const logo = await sharp(input)
    .resize(logoW, logoH, { fit: 'inside' })
    .png()
    .toBuffer();
  const placed = await sharp(logo).metadata();

  return sharp({
    create: { width, height, channels: 3, background },
  })
    .composite([
      {
        input: logo,
        left: Math.round((width - placed.width) / 2),
        top: Math.round((height - placed.height) / 2),
      },
    ])
    .png()
    .toBuffer();
}

(async () => {
  const sonda = await placeOnCanvas({
    input: await sharp(path.join(outDir, 'sonda-original.jpg')).trim({ threshold: 16 }).png().toBuffer(),
    background: { r: 236, g: 236, b: 236 },
    pad: 0.14,
  });

  const adias = await placeOnCanvas({
    input: await extractAdiasFromRef(),
    background: { r: 8, g: 16, b: 38 },
    pad: 0.08,
  });

  await sharp(sonda).png({ compressionLevel: 9 }).toFile(path.join(outDir, 'sonda.png'));
  await sharp(sonda).jpeg({ quality: 94 }).toFile(path.join(outDir, 'sonda.jpg'));
  await sharp(adias).png({ compressionLevel: 9 }).toFile(path.join(outDir, 'adias.png'));
  await sharp(adias).jpeg({ quality: 94 }).toFile(path.join(outDir, 'adias.jpg'));
  console.log('ok');
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
