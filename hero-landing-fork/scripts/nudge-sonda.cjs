const sharp = require('sharp');
const path = require('path');

const original = path.join('public', 'assets', 'clients', 'sonda-original.jpg');
const destPng = path.join('public', 'assets', 'clients', 'sonda.png');
const destJpg = path.join('public', 'assets', 'clients', 'sonda.jpg');
const width = 800;
const height = 360;
const ratio = width / height;

function isLogoPixel(r, g, b) {
  const isGray = Math.abs(r - g) < 18 && Math.abs(g - b) < 18 && r > 200;
  const isWhite = r > 235 && g > 235 && b > 235;
  return !isGray && !isWhite && (r > 140 || g > 80);
}

(async () => {
  const { data, info } = await sharp(original)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let minX = info.width;
  let minY = info.height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      const i = (y * info.width + x) * info.channels;
      if (isLogoPixel(data[i], data[i + 1], data[i + 2])) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  const letterW = maxX - minX + 1;
  const letterH = maxY - minY + 1;
  const letterCenterX = (minX + maxX) / 2;
  const letterCenterY = (minY + maxY) / 2;
  const maxCenteredW = Math.floor(2 * Math.min(letterCenterX, info.width - letterCenterX));
  const extractWidth = Math.min(info.width, maxCenteredW);
  const extractHeight = Math.min(info.height, Math.round(extractWidth / ratio));
  const left = Math.round(letterCenterX - extractWidth / 2);
  const top = Math.min(
    info.height - extractHeight,
    Math.max(0, Math.round(letterCenterY - extractHeight / 2)),
  );

  const crop = { left, top, width: extractWidth, height: extractHeight };

  await sharp(original)
    .extract(crop)
    .resize(width, height, { fit: 'fill' })
    .png()
    .toFile(destPng);

  await sharp(destPng).jpeg({ quality: 95 }).toFile(destJpg);

  console.log({
    letters: { minX, minY, maxX, maxY, letterW, letterH },
    crop,
    out: { width, height },
  });
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
