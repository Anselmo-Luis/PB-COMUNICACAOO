import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve('public/assets/materials');

const SOURCES = {
  lona: 'https://pbcomunicacao.com.br/wp-content/uploads/2025/01/Imagem-do-WhatsApp-de-2025-01-21-as-16.42.19_c40e5451.jpg',
  'veiculos-seara': 'https://pbcomunicacao.com.br/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-24-at-14.44.31-1.jpeg',
  pdv: 'https://pbcomunicacao.com.br/wp-content/uploads/2024/08/WhatsApp-Image-2022-09-12-at-17_13_34-1.webp',
  impressao: 'https://pbcomunicacao.com.br/wp-content/uploads/2025/01/gere-1.jpg',
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
