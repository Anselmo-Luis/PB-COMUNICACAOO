import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';

// Re-run this after adding or replacing gallery images:
//   npm run generate-gallery-ratios
//
// Besides the size, each entry stores `v`, a hash of the image and its -480/-800
// variants. The site appends it as ?v= because /assets is served as immutable:
// a photo replaced under the same name would otherwise stay cached for returning visitors.

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const galleryDir = path.join(rootDir, 'public', 'assets', 'gallery');
const outFile = path.join(rootDir, 'src', 'data', 'galleryImageRatios.json');
const VARIANT_SUFFIXES = ['-480', '-800'];

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

export async function buildGalleryManifest() {
  const files = await collectImageFiles(galleryDir);
  const fileSet = new Set(files);
  const isVariant = (file) => VARIANT_SUFFIXES.some((suffix) => file.endsWith(`${suffix}.webp`));
  const manifest = {};

  for (const file of files) {
    if (isVariant(file)) continue;

    const { width, height } = await sharp(file).metadata();
    if (!width || !height) continue;

    const variants = file.endsWith('.webp')
      ? VARIANT_SUFFIXES.map((suffix) => file.replace(/\.webp$/, `${suffix}.webp`)).filter((variant) => fileSet.has(variant))
      : [];
    const hash = createHash('sha1');
    for (const member of [file, ...variants]) hash.update(await fs.readFile(member));

    const publicSrc = `/assets/gallery/${path.relative(galleryDir, file).split(path.sep).join('/')}`;
    manifest[publicSrc] = { width, height, v: hash.digest('hex').slice(0, 8) };
  }

  return Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const manifest = await buildGalleryManifest();
  await fs.writeFile(outFile, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Wrote ${Object.keys(manifest).length} entries to ${path.relative(rootDir, outFile)}`);
}
