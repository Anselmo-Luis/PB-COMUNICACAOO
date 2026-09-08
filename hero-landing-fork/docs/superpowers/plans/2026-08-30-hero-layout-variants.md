# Hero Layout Variants Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Disponibilizar três geometrias reais da Hero por query string, com a variante A como padrão.

**Architecture:** `Hero.jsx` valida `?hero=a|b|c`, expõe a variante no elemento `<section>` e mantém uma única árvore funcional. `index.css` concentra as três geometrias sobre um grid compartilhado de 12 colunas; Playwright valida seleção, proporções e responsividade sem snapshots frágeis.

**Tech Stack:** React 19, CSS/Tailwind 4, Vite 8 e Playwright 1.59.

## Global Constraints

- Usar somente `/`, `/?hero=a`, `/?hero=b` e `/?hero=c`; valores inválidos retornam A.
- Não instalar dependências nem criar roteamento.
- Preservar conteúdo, mídia, autoplay, fallback, reduced motion e acessibilidade.
- Usar container máximo de `80rem`, vídeo `16:9` e divisão somente a partir de largura segura.
- Alterar somente `Hero.jsx`, `index.css` e `smoke.spec.js`.
- Não criar commit sem solicitação explícita.

---

### Task 1: Seleção e geometria das três variantes

**Files:**
- Modify: `tests/smoke.spec.js`
- Modify: `src/components/sections/Hero.jsx`
- Modify: `src/styles/index.css`

**Interfaces:**
- Consumes: `window.location.search` e `siteData.hero`.
- Produces: `section.hero-section[data-hero-variant="a"|"b"|"c"]` e classes `hero-variant-a|b|c`.

- [ ] **Step 1: Escrever o teste que falha**

Adicionar ao final de `tests/smoke.spec.js`:

```javascript
test('oferece três geometrias responsivas para a hero', async ({ page }) => {
  const variants = [
    { query: '', name: 'a' },
    { query: '?hero=a', name: 'a' },
    { query: '?hero=b', name: 'b' },
    { query: '?hero=c', name: 'c' },
    { query: '?hero=inválida', name: 'a' },
  ];

  await page.setViewportSize({ width: 1280, height: 900 });

  for (const variant of variants) {
    await page.goto(`/${variant.query}`, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('.hero-section')).toHaveAttribute('data-hero-variant', variant.name);
  }

  const geometry = async (query) => {
    await page.goto(`/${query}`, { waitUntil: 'domcontentloaded' });
    return page.evaluate(() => {
      const shell = document.querySelector('.hero-shell').getBoundingClientRect();
      const copy = document.querySelector('.hero-copy').getBoundingClientRect();
      const media = document.querySelector('.hero-media-frame').getBoundingClientRect();

      return {
        shell: { x: shell.x, y: shell.y, width: shell.width },
        copy: { x: copy.x, y: copy.y, width: copy.width, height: copy.height },
        media: { x: media.x, y: media.y, width: media.width, height: media.height },
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      };
    });
  };

  const cinematic = await geometry('?hero=a');
  expect(cinematic.media.width / cinematic.copy.width).toBeGreaterThan(1.7);
  expect(Math.abs(cinematic.media.y - cinematic.copy.y)).toBeLessThan(3);
  expect(cinematic.overflow).toBe(0);

  const editorial = await geometry('?hero=b');
  expect(editorial.media.width / editorial.copy.width).toBeGreaterThan(1.25);
  expect(editorial.media.width / editorial.copy.width).toBeLessThan(1.75);
  expect(
    Math.abs(
      editorial.media.y + editorial.media.height / 2 -
      (editorial.copy.y + editorial.copy.height / 2),
    ),
  ).toBeLessThan(3);
  expect(editorial.overflow).toBe(0);

  const gallery = await geometry('?hero=c');
  expect(Math.abs(gallery.media.width - gallery.shell.width)).toBeLessThan(3);
  expect(gallery.media.y).toBeGreaterThan(gallery.copy.y + gallery.copy.height);
  expect(gallery.overflow).toBe(0);

  await page.setViewportSize({ width: 390, height: 844 });
  for (const name of ['a', 'b', 'c']) {
    const mobile = await geometry(`?hero=${name}`);
    expect(mobile.media.y).toBeGreaterThan(mobile.copy.y + mobile.copy.height);
    expect(Math.abs(mobile.media.width - mobile.shell.width)).toBeLessThan(3);
    expect(mobile.overflow).toBe(0);
  }
});
```

- [ ] **Step 2: Rodar o teste e confirmar a falha**

Run:

```powershell
npx playwright test tests/smoke.spec.js -g "três geometrias"
```

Expected: FAIL porque `.hero-section` ainda não possui `data-hero-variant`.

- [ ] **Step 3: Implementar a seleção mínima em `Hero.jsx`**

Adicionar antes do componente:

```javascript
const HERO_VARIANTS = new Set(['a', 'b', 'c']);

function getHeroVariant() {
  if (typeof window === 'undefined') return 'a';

  const requestedVariant = new URLSearchParams(window.location.search).get('hero');
  return HERO_VARIANTS.has(requestedVariant) ? requestedVariant : 'a';
}
```

Dentro do componente:

```javascript
const heroVariant = getHeroVariant();
const posterSizes = heroVariant === 'c'
  ? '(min-width: 1280px) 80rem, calc(100vw - 3rem)'
  : '(min-width: 1100px) 62vw, calc(100vw - 3rem)';
```

Atualizar o elemento raiz e o `sizes` do poster:

```jsx
<section
  ref={sectionRef}
  className={`hero-section hero-variant-${heroVariant}`}
  data-hero-variant={heroVariant}
>
```

```jsx
sizes={posterSizes}
```

- [ ] **Step 4: Implementar o grid compartilhado e as variantes em `index.css`**

Substituir a geometria atual da Hero pelos princípios abaixo:

```css
.hero-section {
  position: relative;
  overflow: hidden;
  background: var(--color-pb-white);
  padding: clamp(5.75rem, 8vw, 7rem) 1.5rem clamp(3.5rem, 6vw, 5rem);
}

.hero-shell {
  position: relative;
  z-index: 1;
  display: grid;
  width: min(100%, 80rem);
  margin: 0 auto;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  align-items: start;
  gap: clamp(1.5rem, 3vw, 2.5rem);
}

.hero-copy,
.hero-media-frame {
  grid-column: 1 / -1;
}

.hero-copy {
  max-width: 42rem;
}

.hero-title {
  font-size: clamp(3.25rem, 5.5rem, 5.5rem);
}

@media (min-width: 1100px) {
  .hero-variant-a .hero-copy {
    grid-column: span 4;
    max-width: none;
  }

  .hero-variant-a .hero-media-frame {
    grid-column: span 8;
  }

  .hero-variant-a .hero-title {
    font-size: 4.5rem;
  }

  .hero-variant-b .hero-copy {
    grid-column: span 5;
    max-width: none;
    align-self: center;
  }

  .hero-variant-b .hero-media-frame {
    grid-column: span 7;
    align-self: center;
  }

  .hero-variant-b .hero-title {
    font-size: 5rem;
  }

  .hero-variant-c .hero-copy {
    display: grid;
    max-width: none;
    grid-template-columns: minmax(0, 7fr) minmax(18rem, 5fr);
    column-gap: 2.5rem;
  }

  .hero-variant-c .hero-badge,
  .hero-variant-c .hero-proof {
    grid-column: 1 / -1;
  }

  .hero-variant-c .hero-title {
    grid-column: 1;
    grid-row: 2 / span 4;
    font-size: 5.5rem;
  }

  .hero-variant-c .hero-intro,
  .hero-variant-c .hero-description,
  .hero-variant-c .hero-actions {
    grid-column: 2;
  }
}
```

Remover os media queries antigos de `768`, `1024` e `1280` que redefinem `.hero-shell`, mantendo as regras não relacionadas ao Hero. Ajustar margens internas da variante C somente se necessário para que o teste geométrico e a leitura visual passem.

- [ ] **Step 5: Rodar o teste focal e corrigir somente divergências reais**

Run:

```powershell
npx playwright test tests/smoke.spec.js -g "três geometrias"
```

Expected: 1 passed.

- [ ] **Step 6: Rodar toda a verificação**

Run:

```powershell
npm run lint
npm run build
npm run test
```

Expected: lint sem erros, build concluído e todos os testes Playwright passando.

- [ ] **Step 7: Conferir as URLs no servidor local**

Abrir e verificar visualmente:

```text
http://127.0.0.1:5174/
http://127.0.0.1:5174/?hero=a
http://127.0.0.1:5174/?hero=b
http://127.0.0.1:5174/?hero=c
```

Expected: A abre por padrão; A, B e C têm geometria distinta; nenhum texto, botão ou vídeo se sobrepõe em desktop e mobile.
