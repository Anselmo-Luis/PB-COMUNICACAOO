# Auditoria Implementada - P&B Comunicacao Visual

## Resumo

Esta auditoria foi implementada no projeto `hero-landing` com foco em performance, SEO tecnico, social sharing, favicon, acessibilidade, responsividade e deploy na Vercel.

Decisoes aplicadas:

- URL canonica/OG/sitemap usa `VITE_SITE_URL` quando definida e fallback seguro para `https://hero-landing-alpha.vercel.app/`.
- Depoimentos foram removidos porque nomes/cargos/citacoes nao eram verificaveis no repositorio.
- Claims absolutos sem base local foram reduzidos na copy principal, sem alterar a identidade visual.
- Assets grandes nao usados sairam de `public` para nao entrar no deploy.

## Antes e Depois Medido

| Item | Antes | Depois medido |
|---|---:|---:|
| `dist/` | 194.77 MB | 10.95 MB |
| `public/` | ~194.38 MB | 10.56 MB |
| JS app inicial | 342.00 kB | 28.77 kB |
| CSS | 61.12 kB | 63.95 kB |
| `vendor-react` | junto no bundle | 182.27 kB |
| `vendor-icons` | junto no bundle | 11.88 kB |
| `vendor-gsap` | junto no bundle inicial | lazy chunk 69.46 kB |

Observacao: Lighthouse, PageSpeed Insights e validadores sociais dependem de ambiente servido/deploy final e devem ser executados apos o deploy.

## Implementado

### Performance e Assets

- Removidos de `public`: `assets/gallery/nova-2026/`, `frames/`, `icons.svg`, `assets/clients/dhl.jpg`, `assets/hero/README.md` e `assets/portfolio/adesivacao.jpeg`.
- Convertidas imagens JPG/JPEG usadas na galeria para WebP com `sharp`.
- Criadas variantes responsivas do poster do hero: `hero-poster-640.webp`, `hero-poster-1024.webp`, `hero-poster-1920.webp`.
- Atualizados `Portfolio.jsx`, `Hero.jsx` e `siteData.js` para usar os WebPs gerados.
- Adicionado `scripts/optimize-images.mjs` para tornar a otimizacao reproduzivel.

### Bundle

- Removida dependencia morta `@phosphor-icons/react`.
- Abaixo da dobra passou a carregar com `React.lazy` e `Suspense`.
- Removida a secao `Testimonials`.
- `vite.config.js` agora separa chunks de React, GSAP e Lucide com funcao `manualChunks`, compativel com Vite/Rolldown 8.

### SEO Tecnico e Social

- `index.html` agora entrega metadados estaticos no HTML inicial: canonical, robots, OG, Twitter card e JSON-LD.
- Criado plugin Vite para resolver URLs absolutas a partir de `VITE_SITE_URL`.
- Criados `robots.txt` e `sitemap.xml` por `scripts/generate-seo-files.mjs`.
- Criada imagem social `public/assets/og-image.jpg` em 1200x630.
- JSON-LD inclui `LocalBusiness`, `WebSite` e `FAQPage` espelhando o FAQ visivel.

### Favicon, Manifest e Mobile

- Substituido favicon padrao por marca P&B gerada via `scripts/generate-favicons.mjs`.
- Criados `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png` e `apple-touch-icon.png`.
- Criado `manifest.webmanifest`.

### Acessibilidade e CLS

- Adicionado skip link para `#content`.
- Drawer mobile agora so existe no DOM quando aberto, evitando foco em conteudo fora da tela.
- Adicionados `width`/`height` em logo, poster, video e iframe do mapa.
- `prefers-reduced-motion` agora reduz shimmer, marquee, logos animados e transicoes.

### Deploy Vercel

- Criado `vercel.json` com cache longo para assets versionados/imagens e cache curto para `robots.txt`, `sitemap.xml` e manifest.
- Adicionado `.env.example` com `VITE_SITE_URL` e `VITE_GOOGLE_MAPS_EMBED_KEY`.

## Comandos

```bash
cd hero-landing
npm install
npm run build:full
npm run lint
npm run build
npm run preview
```

## Pendencias Pos-Deploy

- Verificacao local executada: `npm run lint`, `npm run build`, `npm audit --audit-level=high` e smoke test Playwright contra `npm run preview`.
- Configurar `VITE_SITE_URL` com o dominio canonico definitivo na Vercel.
- Rodar Lighthouse mobile/desktop no deploy final.
- Validar JSON-LD no Rich Results Test.
- Validar social preview no Facebook Sharing Debugger, LinkedIn Post Inspector e X Card Validator.
- Confirmar com a empresa se endereco, telefones, CNPJ, FAQ e escopo nacional estao atualizados.
- Se houver logo SVG oficial ou imagem institucional real para preview social, substituir os gerados por assets oficiais.
