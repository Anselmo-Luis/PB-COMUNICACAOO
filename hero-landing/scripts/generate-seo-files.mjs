import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(rootDir, 'public');
const fallbackSiteUrl = 'https://hero-landing-alpha.vercel.app/';

function normalizeSiteUrl(value = fallbackSiteUrl) {
  const candidate = value.trim() || fallbackSiteUrl;
  const withProtocol = /^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`;
  const url = new URL(withProtocol);
  url.hash = '';
  url.search = '';
  url.pathname = '/';
  return url.href;
}

function resolveSiteUrl(env) {
  return normalizeSiteUrl(env.VITE_SITE_URL || env.VERCEL_URL || fallbackSiteUrl);
}

const siteUrl = resolveSiteUrl(process.env);
const today = new Date().toISOString().slice(0, 10);

await fs.mkdir(publicDir, { recursive: true });

await fs.writeFile(
  path.join(publicDir, 'robots.txt'),
  `User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml', siteUrl).href}\n`,
);

await fs.writeFile(
  path.join(publicDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `  <url>\n` +
    `    <loc>${siteUrl}</loc>\n` +
    `    <lastmod>${today}</lastmod>\n` +
    `    <changefreq>monthly</changefreq>\n` +
    `    <priority>1.0</priority>\n` +
    `  </url>\n` +
    `</urlset>\n`,
);

console.log(`generated robots.txt and sitemap.xml for ${siteUrl}`);
