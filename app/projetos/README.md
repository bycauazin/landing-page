# app/projetos

`/projetos` (catálogo) e `/projetos/[slug]` (uma página por projeto, gerada no build).

- [page.js](page.js): só os metadados; a página é [../components/projects-page.js](../components/projects-page.js).
- [[slug]/page.js]([slug]/page.js): roteador dos projetos. Projetos com estudo de caso escrito à mão estão no mapa `caseComponents`; os outros usam a página gerada pelos dados de [../data/projects.js](../data/projects.js) (com foto de capa no topo quando há `image`, o bloco "Em poucas palavras" quando há `guide`, e "pronto / próximas etapas" quando há `progress`).

## Peças comuns dos estudos de caso (`[slug]/`)

- [case-header.js]([slug]/case-header.js): cabeçalho com logo, "Todos os projetos" e o botão de tema.
- [case-rail.js]([slug]/case-rail.js): barra lateral de ícones (mesma ideia do SectionRail do Finance). Pega o hero e cada `main > section[aria-labelledby]`; o nome vem do "chapéu" do título (o `<p>` antes do `<h2>`) e o ícone de palavras do título. Dá para forçar com `data-rail="Nome"` e `data-rail-icon="chart"`. Só aparece onde cabe ao lado do texto; nas telas menores ficam os botões de [case-floating-actions.js]([slug]/case-floating-actions.js).
- [case-shared.js]([slug]/case-shared.js): blocos reaproveitados, incluindo `ReadingGuide` ("Em poucas palavras": um texto sem termos técnicos e uma lista para quem é técnico, cada um com um atalho).
- [case-motion.js]([slug]/case-motion.js): animações de entrada e barra de progresso no topo.
- `*-case.js` + `*.module.css`: cada estudo de caso. Telas recriadas sempre com dados fictícios.

## Fotos de capa

Ficam em [../../public/project-images/](../../public/project-images/), em 16:10. As dos estudos de caso são prints das telas recriadas nas próprias páginas (dashboard de vendas, atalho, pastas, planner). Projetos só de código não têm foto: o cartão mostra os ícones das tecnologias.
