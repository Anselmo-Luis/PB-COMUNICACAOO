import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(rootDir, 'public');

const deadDirs = [
  'frames',
  path.join('assets', 'gallery', 'nova-2026'),
];

const deadFiles = [
  'icons.svg',
  path.join('assets', 'clients', 'dhl.jpg'),
  path.join('assets', 'hero', 'README.md'),
  path.join('assets', 'portfolio', 'adesivacao.jpeg'),
];

const conversions = [
  ...Array.from({ length: 16 }, (_, index) => {
    const file = `veiculo-${String(index + 1).padStart(2, '0')}`;
    return {
      src: path.join('assets', 'gallery', 'veiculos', `${file}.jpg`),
      dest: path.join('assets', 'gallery', 'veiculos', `${file}.webp`),
      width: 1600,
      quality: 80,
    };
  }),
  ...[
    'painel-01',
    'painel-02',
    'painel-03',
    'painel-07',
    'painel-11',
    'painel-12',
    'painel-13',
    'painel-14',
    'painel-15',
    'painel-16',
  ].map((file) => ({
    src: path.join('assets', 'gallery', 'paineis', `${file}.jpg`),
    dest: path.join('assets', 'gallery', 'paineis', `${file}.webp`),
    width: 1600,
    quality: 80,
  })),
  {
    src: path.join('assets', 'gallery', 'banners', 'banner-10.jpg'),
    dest: path.join('assets', 'gallery', 'banners', 'banner-10.webp'),
    width: 1600,
    quality: 80,
  },
  ...[
    ['pdv.jpg', 'pdv.webp'],
    ['veiculos.jpeg', 'veiculos.webp'],
    ['banners.jpeg', 'banners.webp'],
    ['paineis.jpeg', 'paineis.webp'],
  ].map(([src, dest]) => ({
    src: path.join('assets', 'portfolio', src),
    dest: path.join('assets', 'portfolio', dest),
    width: 1400,
    quality: 80,
  })),
];

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function removeIfInsidePublic(relativePath) {
  const target = path.resolve(publicDir, relativePath);
  const relative = path.relative(publicDir, target);

  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error(`Refusing to remove outside public: ${target}`);
  }

  if (!(await exists(target))) return;
  await fs.rm(target, { recursive: true, force: true });
  console.log(`removed ${path.relative(rootDir, target)}`);
}

async function convertToWebp({ src, dest, width, quality }) {
  const sourcePath = path.join(publicDir, src);
  const outputPath = path.join(publicDir, dest);

  if (!(await exists(sourcePath))) {
    if (await exists(outputPath)) return;
    console.warn(`missing source: ${src}`);
    return;
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  const tempPath = `${outputPath}.tmp`;

  await sharp(sourcePath)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 5 })
    .toFile(tempPath);

  await fs.rename(tempPath, outputPath);
  await fs.rm(sourcePath, { force: true });
  console.log(`optimized ${src} -> ${dest}`);
}

async function generateHeroPosters() {
  const original = path.join(publicDir, 'assets', 'hero', 'hero-poster.jpg');
  const fallback = path.join(publicDir, 'assets', 'hero', 'hero-poster-1920.webp');
  const sourcePath = (await exists(original)) ? original : fallback;

  if (!(await exists(sourcePath))) {
    console.warn('missing hero poster source');
    return;
  }

  for (const width of [640, 1024, 1920]) {
    const outputPath = path.join(publicDir, 'assets', 'hero', `hero-poster-${width}.webp`);
    if (path.resolve(sourcePath) === path.resolve(outputPath)) continue;

    const tempPath = `${outputPath}.tmp`;
    await sharp(sourcePath)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(tempPath);
    await fs.rename(tempPath, outputPath);
    console.log(`generated ${path.relative(rootDir, outputPath)}`);
  }

  if (await exists(original)) {
    await fs.rm(original, { force: true });
    console.log('removed public/assets/hero/hero-poster.jpg');
  }
}

for (const dir of deadDirs) {
  await removeIfInsidePublic(dir);
}

for (const file of deadFiles) {
  await removeIfInsidePublic(file);
}

for (const conversion of conversions) {
  await convertToWebp(conversion);
}

await generateHeroPosters();
