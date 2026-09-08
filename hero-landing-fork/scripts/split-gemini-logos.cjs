const sharp = require('sharp');
const path = require('path');

const src = path.join('public', 'assets', 'clients', '_ref-sonda-adias.png');
const outDir = path.join('public', 'assets', 'clients');

(async () => {
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const isWhite = (x, y) => {
    const i = (y * width + x) * channels;
    return data[i] > 232 && data[i + 1] > 232 && data[i + 2] > 232;
  };

  const bounds = (x0, x1) => {
    let left = x1;
    let right = x0;
    let top = height;
    let bottom = 0;
    for (let y = 0; y < height; y++) {
      for (let x = x0; x < x1; x++) {
        if (!isWhite(x, y)) {
          if (x < left) left = x;
          if (x > right) right = x;
          if (y < top) top = y;
          if (y > bottom) bottom = y;
        }
      }
    }
    return {
      left,
      top,
      width: right - left + 1,
      height: bottom - top + 1,
    };
  };

  let gap = Math.floor(width / 2);
  for (let x = Math.floor(width * 0.42); x < Math.floor(width * 0.6); x++) {
    let white = true;
    for (let y = 0; y < height; y += 3) {
      if (!isWhite(x, y)) {
        white = false;
        break;
      }
    }
    if (white) {
      gap = x;
      break;
    }
  }

  const sondaBox = bounds(0, gap);
  const adiasBox = bounds(gap, width);
  console.log({ width, height, gap, sondaBox, adiasBox });

  await sharp(src).extract(sondaBox).png().toFile(path.join(outDir, 'sonda.png'));
  await sharp(src).extract(adiasBox).png().toFile(path.join(outDir, 'adias.png'));
  await sharp(src).extract(sondaBox).jpeg({ quality: 95 }).toFile(path.join(outDir, 'sonda.jpg'));
  await sharp(src).extract(adiasBox).jpeg({ quality: 95 }).toFile(path.join(outDir, 'adias.jpg'));
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
