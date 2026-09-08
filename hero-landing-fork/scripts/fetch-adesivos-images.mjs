import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve('public/assets/materials');

const SOURCES = {
  'adesivos-hero': 'https://pbcomunicacao.com.br/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-14-at-20.06.45.jpeg',
  'adesivos-swift': 'https://pbcomunicacao.com.br/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-14-at-18.46.46.jpeg',
  'adesivos-jbs': 'https://pbcomunicacao.com.br/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-14-at-18.20.29-3.jpeg',
  'adesivos-vigor': 'https://pbcomunicacao.com.br/wp-content/uploads/2025/01/F07CEA24-AE81-4D26-A8C7-8258D90147F6.jpeg',
};

await mkdir(ROOT, { recursive: true });

for (const [name, url] of Object.entries(SOURCES)) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${name}: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const output = path.join(ROOT, `${name}.webp`);

  await sharp(buffer)
    .rotate()
    .resize(1200, 1200, { fit: 'cover', position: 'centre' })
    .webp({ quality: 82 })
    .toFile(output);

  console.log(`saved ${output}`);
}
