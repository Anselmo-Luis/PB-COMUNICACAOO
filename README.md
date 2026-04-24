# P&B Comunicação Visual — Landing Page

Landing page corporativa da **P&B Comunicação Visual**, empresa de sinalização corporativa com atuação nacional desde 2002.

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | React 19 |
| Build | Vite 8 |
| Estilo | Tailwind CSS 4 |
| Animações | GSAP |
| Ícones | Lucide React + SVGs inline |
| Mapa | Google Maps embed |
| Testes | Playwright |
| Linting | ESLint 9 |

## Estrutura

```
hero-landing/
├── public/assets/          # Imagens estáticas e logos
├── src/
│   ├── components/
│   │   ├── layout/         # Navbar, Footer
│   │   ├── sections/       # Hero, Services, Portfolio, FAQ, etc.
│   │   └── ui/             # WhatsAppIcon, MagneticButton
│   ├── data/
│   │   └── siteData.js     # Dados centralizados do site
│   ├── hooks/              # useReveal, useScrollFrames
│   ├── styles/
│   │   └── index.css       # Tailwind + estilos globais
│   ├── App.jsx
│   └── main.jsx
├── index.html
└── vite.config.js
```

## Seções da Landing

1. **Hero** — Headline magnética com CTAs e prova social
2. **TrustLogos** — Logos de clientes corporativos (Honda, Adidas, DHL, etc.)
3. **Benefits** — Por que grandes marcas escolhem a P&B
4. **Process** — Briefing → Produção → Instalação
5. **Features** — Materiais e competências técnicas
6. **Services** — Verticais de negócio (frotas, fachadas, eventos, PDV)
7. **Portfolio** — Galeria de projetos com filtro
8. **FAQ** — Dúvidas frequentes
9. **CTA** — Banner de conversão
10. **LocationMap** — Mapa com localização (Lapa, SP)

## Comandos

```bash
cd hero-landing

# Instalar dependências
npm install

# Desenvolvimento (http://localhost:5173)
npm run dev

# Build de produção
npm run build

# Otimizar assets, gerar favicon/OG e compilar
npm run build:full

# Preview do build
npm run preview

# Lint
npm run lint
```

## Variáveis de Ambiente

Use `hero-landing/.env.example` como referência.

| Variável | Uso |
|---|---|
| `VITE_SITE_URL` | URL canônica usada em canonical, OG, sitemap e JSON-LD. Se vazia, usa o fallback Vercel atual. |
| `VITE_GOOGLE_MAPS_EMBED_KEY` | Opcional. Quando definida, usa a API oficial do Google Maps Embed. |

## Dados do Projeto

- **Empresa:** P&B Comunicação Visual
- **CNPJ:** 06.554.319/0001-00
- **Endereço:** Rua Antonio Raposo, 149, Lapa, São Paulo - SP
- **Telefone:** (11) 3836-0196 / 3644-8907
- **WhatsApp:** [Enviar mensagem](https://api.whatsapp.com/send?phone=5511965698725)
- **Email:** vendas1@pbcomunicacao.com.br
- **Facebook:** [/PBComunicacao](https://www.facebook.com/PBComunicacao/)
- **Instagram:** [@pb.comunicacaovisual](https://www.instagram.com/pb.comunicacaovisual/)

## Outros Arquivos

| Arquivo | Descrição |
|---|---|
| `toolchain-os.html` | Dashboard visual da toolchain de desenvolvimento (Codex, Agents, MCPs) |
| `toolchain-serve.js` | Servidor HTTP de apoio para a toolchain |
| `raw/` | Referências e vídeos brutos |
