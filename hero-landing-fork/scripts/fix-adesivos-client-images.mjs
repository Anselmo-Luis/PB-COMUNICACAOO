import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve('public/assets/materials');

const SOURCES = {
  'adesivos-swift': 'https://pbcomunicacao.com.br/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-14-at-18.46.46.jpeg',
  'adesivos-jbs': 'https://pbcomunicacao.com.br/wp-content/uploads/2025/01/F07CEA24-AE81-4D26-A8C7-8258D90147F6.jpeg',
  'adesivos-vigor': 'C:/Users/Administrador/Desktop/Adesivos/AA60ADE8-D5A8-491A-8986-783DE5D20551.jpeg',
};

async function loadBuffer(source) {
  if (source.startsWith('http')) {
    const response = await fetch(source);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${source}: ${response.status}`);
    }
    return Buffer.from(await response.arrayBuffer());
  }

  return sharp(source).toBuffer();
}

await mkdir(ROOT, { recursive: true });

for (const [name, source] of Object.entries(SOURCES)) {
  const buffer = await loadBuffer(source);
  const output = path.join(ROOT, `${name}.webp`);

  await sharp(buffer)
    .rotate()
    .resize(1200, 1200, { fit: 'cover', position: 'centre' })
    .webp({ quality: 82 })
    .toFile(output);

  console.log(`saved ${output}`);
}
