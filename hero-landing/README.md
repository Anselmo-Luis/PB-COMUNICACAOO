# Hero Landing - P&B Comunicacao Visual

Landing page React/Vite para a P&B Comunicacao Visual.

## Comandos

```bash
npm install
npm run dev
npm run build
npm run build:full
npm run lint
npm run preview
```

## Scripts de Assets

- `npm run optimize-images`: remove assets mortos de `public`, converte imagens usadas para WebP e gera posters responsivos do hero.
- `npm run generate-assets`: gera `og-image.jpg`, favicons e `apple-touch-icon`.
- `npm run build`: gera `robots.txt`/`sitemap.xml` e compila com Vite.
- `npm run build:full`: executa otimizacao de imagens, geracao de assets e build.

## Variaveis

Copie `.env.example` se precisar configurar ambiente local.

- `VITE_SITE_URL`: URL canonica para canonical, OG, sitemap e JSON-LD. Se ausente, usa `https://hero-landing-alpha.vercel.app/`.
- `VITE_GOOGLE_MAPS_EMBED_KEY`: opcional para usar a Google Maps Embed API oficial.

## Observacoes

- SEO/social metadata e JSON-LD sao injetados no HTML inicial via plugin Vite.
- A galeria usa WebP gerado em `public/assets/gallery`.
- Depoimentos foram removidos ate existirem citacoes verificaveis.
