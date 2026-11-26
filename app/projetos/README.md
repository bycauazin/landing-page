# app/projetos

`/projetos` (catálogo) e `/projetos/[slug]` (uma página por projeto, gerada no build).

- [page.js](page.js): só os metadados; a página é [../components/projects-page.js](../components/projects-page.js).
- [[slug]/page.js]([slug]/page.js): roteador dos projetos. Projetos com estudo de caso escrito à mão estão no mapa `caseComponents`; os outros usam a página gerada pelos dados de [../data/projects.js](../data/projects.js) (foto de capa no topo quando há `image`, resumo quando há `guide`, galeria quando há `screens`, recursos com ícone em `features`, logo e paleta do app quando há `brand` (componente `ProductBrand`) e "pronto / próximas etapas" quando há `progress`, só na página de projeto em desenvolvimento).

## Peças comuns dos estudos de caso (`[slug]/`)

- [case-header.js]([slug]/case-header.js): cabeçalho com logo, "Todos os projetos" e o botão de tema.
- [case-rail.js]([slug]/case-rail.js): barra lateral de ícones da home, do catálogo e dos estudos de caso. Pega o hero e as seções com `aria-labelledby` ou `data-rail`. Os atributos `data-rail` e `data-rail-icon` definem uma legenda e um ícone específicos. Nos estudos de caso, os botões de [case-floating-actions.js]([slug]/case-floating-actions.js) aparecem quando falta espaço para a barra.
- [case-shared.js]([slug]/case-shared.js): blocos reaproveitados, incluindo `ReadingGuide` ("O projeto em um minuto": cartões "Em poucas palavras" e "Parte técnica", cada um com um atalho). Os rótulos não dividem leitores em "leigo" e "técnico" de propósito. O `ReadingGuide` aceita `highlight` (o resultado principal em destaque, no topo). `Pipeline` desenha os fluxos no padrão da página do Cacau (ícones ligados por uma linha; `vertical` para colunas estreitas, `muted` para o "antes"). Nada de setas de texto (→ ↓): use `<Icon name="arrow" />` ou `"down"`.
- [case-icons.js]([slug]/case-icons.js): o conjunto de ícones (`Icon`, `SectionIcon`, `StepDot`) e o mapa palavra → ícone usado pela barra lateral. Regra da casa: nada de "01, 02" ao lado de títulos e listas; use um ícone que faça sentido ou, quando a ordem importa, `StepDot` (número simples num círculo).
- [case-gallery.js]([slug]/case-gallery.js): galeria de telas em abas (moldura de navegador ou de celular), alimentada pelo campo `screens` dos dados.
- [case-motion.js]([slug]/case-motion.js): animações de entrada e barra de progresso no topo.
- `*-case.js` + `*.module.css`: cada estudo de caso. Telas recriadas sempre com dados fictícios. Veja [o guia de edição dos estudos de caso]([slug]/README.md).

## Fotos de capa

Ficam em [../../public/project-images/](../../public/project-images/), em 16:10. As dos estudos de caso são prints das telas recriadas nas próprias páginas (dashboard de vendas, atalho, pastas, planner). Projetos só de código não têm foto: o cartão mostra os ícones das tecnologias.
