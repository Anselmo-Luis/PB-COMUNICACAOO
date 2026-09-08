import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

// Re-run this after adding or replacing gallery images:
//   npm run generate-gallery-ratios

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const galleryDir = path.join(rootDir, 'public', 'assets', 'gallery');
const outFile = path.join(rootDir, 'src', 'data', 'galleryImageRatios.json');

async function collectImageFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectImageFiles(fullPath)));
    } else if (/\.(webp|jpg|jpeg|png)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

const files = await collectImageFiles(galleryDir);
const manifest = {};

for (const file of files) {
  const { width, height } = await sharp(file).metadata();
  if (!width || !height) continue;

  const publicSrc = `/assets/gallery/${path.relative(galleryDir, file).split(path.sep).join('/')}`;
  manifest[publicSrc] = { width, height };
}

const sortedManifest = Object.fromEntries(
  Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)),
);

await fs.writeFile(outFile, `${JSON.stringify(sortedManifest, null, 2)}\n`);

console.log(`Wrote ${Object.keys(sortedManifest).length} entries to ${path.relative(rootDir, outFile)}`);
