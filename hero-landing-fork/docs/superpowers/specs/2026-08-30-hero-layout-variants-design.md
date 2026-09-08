# Design: três variantes matemáticas da Hero

Status: aprovado em conversa em 30/08/2026.

## Objetivo

Criar três versões reais da Hero no `hero-landing-fork` para comparação no navegador, usando o mesmo conteúdo, vídeo e comportamento. A versão A será o padrão.

Esta é a primeira fase da padronização matemática do site. Depois que uma Hero for escolhida, as duas alternativas serão removidas e o mesmo sistema de container, grid, espaçamento e botões será aplicado às demais seções em fases separadas.

## URLs

- `/` e `/?hero=a`: variante A — Cinemática 4/8.
- `/?hero=b`: variante B — Editorial 5/7.
- `/?hero=c`: variante C — Galeria 12/12.
- Valores desconhecidos ou ausentes usam a variante A.

Não haverá seletor flutuante nem controles de teste visíveis.

## Sistema compartilhado

- Um único container de conteúdo alinhado ao trilho principal do site: máximo de `80rem`.
- Gutter lateral fluido com mínimo de `1.5rem`.
- Grid desktop de 12 colunas.
- Gap principal fluido entre `1.5rem` e `2.5rem`.
- Vídeo sempre em `16:9`, sem recorte adicional.
- Título dimensionado pela coluna com `clamp()`, não diretamente pelo viewport.
- Breakpoint de divisão somente quando houver largura suficiente para preservar a leitura; abaixo dele, texto e vídeo ficam empilhados.
- Copy, CTAs, vídeo, poster, autoplay, fallback e acessibilidade permanecem idênticos nas três variantes.

## Variante A — Cinemática 4/8

- Copy ocupa 4 colunas.
- Vídeo ocupa 8 colunas.
- Copy e vídeo alinham pelo topo.
- Tipografia mais compacta para manter os botões em uma linha quando houver espaço.
- Prioridade: vídeo dominante e Hero mais baixa.

## Variante B — Editorial 5/7

- Copy ocupa 5 colunas.
- Vídeo ocupa 7 colunas.
- Blocos alinham pelos centros verticais.
- Prioridade: equilíbrio entre mensagem e obra audiovisual.

## Variante C — Galeria 12/12

- Copy compacta ocupa 12 colunas acima.
- Vídeo ocupa 12 colunas abaixo.
- Em desktop amplo, a copy distribui título, apoio e CTA horizontalmente.
- Prioridade: maior vídeo possível, aceitando uma Hero mais alta.

## Arquitetura

`Hero.jsx` valida o parâmetro `hero` e aplica um identificador semântico no elemento raiz. O componente mantém uma única árvore funcional e uma única implementação do vídeo; as diferenças ficam em modificadores CSS.

`index.css` define os tokens locais da Hero e as regras das variantes. Não serão duplicados componentes nem dados em `siteData.js`.

## Responsividade

- Desktop amplo: cada variante usa sua geometria específica.
- Tablet e notebook estreito: layout empilhado para evitar colunas de texto estreitas.
- Mobile: copy antes do vídeo, CTAs ocupando a largura disponível e vídeo em 16:9.
- Nenhum conteúdo pode causar overflow horizontal.

## Aceitação

1. As três URLs exibem geometrias diferentes e reconhecíveis.
2. `/` abre a variante A.
3. A usa 4/8 com alinhamento superior; B usa 5/7 com alinhamento central; C usa 12/12 empilhado.
4. O vídeo, texto e links são os mesmos nas três variantes.
5. Autoplay, fallback manual, reduced motion e poster continuam funcionando.
6. Em 390, 768, 1280 e 1440 px não há overflow ou sobreposição.
7. Lint, build e testes Playwright passam.

## Não objetivos desta fase

- Alterar copy, cores, mídia ou dados.
- Trocar o arquivo `hero.mp4`.
- Criar roteamento ou instalar dependências.
- Padronizar todas as demais seções antes da escolha da Hero.
- Manter as três variantes na versão final publicada.

## Arquivos previstos

- `src/components/sections/Hero.jsx`
- `src/styles/index.css`
- `tests/smoke.spec.js`

No máximo esses três arquivos serão alterados nesta fase.
