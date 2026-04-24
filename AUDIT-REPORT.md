# P&B Landing - Relatorio Tecnico de Auditoria

## Resultado Executivo

Foram implementadas melhorias reais de performance, SEO tecnico, social sharing, favicon, acessibilidade e deploy para a landing `hero-landing`.

O maior ganho foi a reducao de peso do deploy: `dist/` caiu de `194.77 MB` para `10.95 MB`, principalmente pela remocao de assets mortos e conversao de imagens usadas para WebP.

## Principais Mudancas

- Performance: removidos assets mortos de `public`, imagens usadas convertidas para WebP, hero poster responsivo e code splitting abaixo da dobra.
- SEO/social: canonical, robots meta, OG/Twitter absolutos, `og-image.jpg` 1200x630, `robots.txt`, `sitemap.xml` e JSON-LD estatico no HTML inicial.
- Acessibilidade: skip link, drawer mobile nao focavel quando fechado, dimensoes explicitas em midias e suporte mais forte a `prefers-reduced-motion`.
- Integridade comercial: depoimentos removidos por nao serem verificaveis no repositorio; claims numericos absolutos da copy principal foram reduzidos.
- Vercel: `vercel.json` com headers de cache e `.env.example` com `VITE_SITE_URL`.

## Numeros Medidos

| Metrica | Antes | Depois |
|---|---:|---:|
| `dist/` | 194.77 MB | 10.95 MB |
| `public/` | ~194.38 MB | 10.56 MB |
| JS app inicial | 342.00 kB | 28.77 kB |
| CSS | 61.12 kB | 63.95 kB |
| Maior asset restante | 9.45 MB PNG morto | 5.26 MB `hero.mp4` |

Build Vite atual:

```text
index: 28.77 kB / gzip 11.06 kB
vendor-react: 182.27 kB / gzip 57.35 kB
vendor-icons: 11.88 kB / gzip 4.84 kB
vendor-gsap: 69.46 kB / gzip 27.23 kB (lazy)
CSS: 63.95 kB / gzip 11.59 kB
```

## Verificacao Executada

- `npm run lint`: passou.
- `npm run build`: passou com Vite 8.0.10.
- `npm audit --audit-level=high`: passou, 0 vulnerabilidades.
- `npm run preview` + Playwright smoke: passou em metadata, JSON-LD, CTA, skip link, lightbox, menu mobile e viewports 320/375/412/768/1440 sem overflow horizontal.

Validacao externa apos deploy ainda e necessaria: Lighthouse, Rich Results Test e validadores de preview social.

## Pendencias Reais

- Definir `VITE_SITE_URL` com o dominio canonico final na Vercel.
- Substituir favicon/OG gerados por arquivos oficiais se a empresa fornecer logo SVG ou imagem institucional.
- Confirmar dados comerciais reais antes de reintroduzir depoimentos, numeros de clientes, ratings ou claims absolutos.
