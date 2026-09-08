import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve('public/assets/materials');

const SOURCES = {
  'showcase-banner': 'C:/Users/Administrador/Desktop/Banners/IMG_6201.jpeg',
  'showcase-veicular': 'C:/Users/Administrador/Desktop/Adesivo veicular/FD15B304-B305-4726-8592-0E0426FEBD9B.jpeg',
  'showcase-adesivos': 'C:/Users/Administrador/Desktop/Adesivos/WhatsApp-Image-2026-01-14-at-18.20.30-11.jpeg',
  'showcase-pdv': 'C:/Users/Administrador/Desktop/PDVs e Materiais Diversos/WhatsApp-Image-2026-01-14-at-16.28.48.jpeg',
};

await mkdir(ROOT, { recursive: true });

for (const [name, source] of Object.entries(SOURCES)) {
  const output = path.join(ROOT, `${name}.webp`);

  await sharp(source)
    .rotate()
    .resize(800, 800, { fit: 'cover', position: 'centre' })
    .webp({ quality: 82 })
    .toFile(output);

  console.log(`saved ${output}`);
}
