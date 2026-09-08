const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const src = path.join(
  process.env.USERPROFILE,
  '.cursor/projects/c-Users-Administrador-Documents-PB-COMUNICAO/assets',
  'c__Users_Administrador_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-7f7a0e30-265d-4428-b480-2aaf47fbe772.png',
);
const outDir = path.join('public', 'assets', 'clients');

(async () => {
  const meta = await sharp(src).metadata();
  console.log('ref', meta.width, meta.height);
  const w = meta.width;
  const h = meta.height;
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const isNearWhite = (i) => data[i] > 245 && data[i + 1] > 245 && data[i + 2] > 245;

  let gapStart = Math.floor(w / 2);
  let gapEnd = gapStart;
  for (let x = Math.floor(w * 0.4); x < Math.floor(w * 0.65); x++) {
    let whiteCol = true;
    for (let y = 0; y < h; y += 2) {
      const i = (y * w + x) * info.channels;
      if (!isNearWhite(i)) {
        whiteCol = false;
        break;
      }
    }
    if (whiteCol) {
      if (x < gapStart) gapStart = x;
      gapEnd = x;
    }
  }
  console.log({ gapStart, gapEnd });

  function contentBounds(x0, x1) {
    let left = x1;
    let right = x0;
    let top = h;
    let bottom = 0;
    for (let y = 0; y < h; y++) {
      for (let x = x0; x < x1; x++) {
        const i = (y * w + x) * info.channels;
        if (!isNearWhite(i)) {
          if (x < left) left = x;
          if (x > right) right = x;
          if (y < top) top = y;
          if (y > bottom) bottom = y;
        }
      }
    }
    const pad = 2;
    left = Math.max(x0, left - pad);
    top = Math.max(0, top - pad);
    right = Math.min(x1 - 1, right + pad);
    bottom = Math.min(h - 1, bottom + pad);
    return { left, top, width: right - left + 1, height: bottom - top + 1 };
  }

  const split = gapStart > 20 ? gapStart : Math.floor(w * 0.48);
  const leftBox = contentBounds(0, split);
  const rightBox = contentBounds(Math.max(split, gapEnd), w);
  console.log('left', leftBox, 'right', rightBox);

  if (!fs.existsSync(path.join(outDir, 'sonda-before-ref.jpg'))) {
    fs.copyFileSync(path.join(outDir, 'sonda.jpg'), path.join(outDir, 'sonda-before-ref.jpg'));
  }
  if (!fs.existsSync(path.join(outDir, 'adias-before-ref.jpg'))) {
    fs.copyFileSync(path.join(outDir, 'adias.jpg'), path.join(outDir, 'adias-before-ref.jpg'));
  }

  await sharp(src).extract(leftBox).png().toFile(path.join(outDir, 'sonda.png'));
  await sharp(src).extract(rightBox).png().toFile(path.join(outDir, 'adias.png'));
  await sharp(src).extract(leftBox).jpeg({ quality: 95 }).toFile(path.join(outDir, 'sonda.jpg'));
  await sharp(src).extract(rightBox).jpeg({ quality: 95 }).toFile(path.join(outDir, 'adias.jpg'));
  console.log('ok');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
