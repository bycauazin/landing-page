# brand

Modelo da logo **bycauazin** (fita em espiral, estilo adesivo, sem fundo). É a logo oficial, usada em todos os projetos; só as três cores mudam de projeto para projeto.

## As três cores

| Parte | O que é | bycauazin, tema escuro | bycauazin, tema claro |
| --- | --- | --- | --- |
| Contorno | borda grossa em volta (o "adesivo") | `#E4F0F6` | `#0B2E43` |
| Fita | a fita em espiral | `#0B2E43` | `#E4F0F6` |
| Interior | o lado de dentro da fita | `#FF4F31` | `#FF4F31` |

No tema claro o contorno e a fita trocam de cor: contorno escuro com fita escura viraria uma mancha só. Sem quadrado atrás; se um dia tiver, ele usa a cor do tema da página, nunca branco fixo.

## Nome e abreviação

Escolhidos em 2026-11-25 na página de opções de marca: **Major Mono Display** (Google Fonts) para os dois.

- Nome: `<bycauazin/>`. "by" na cor de destaque, `<` e `/>` com 50% de opacidade, "cauazin" na cor do texto.
- Abreviação: `BC`, com o B na cor de destaque.
- No site: componente [../app/components/brand-name.js](../app/components/brand-name.js); a fonte entra no [layout](../app/layout.js) como `--font-brand`.
- **Espessura no cabeçalho:** a Major Mono Display só tem um peso e fica fina em tamanho pequeno. No nome ao lado da logo (canto superior esquerdo) use `font-size: 1.18em`, `letter-spacing: 0.01em`, `-webkit-text-stroke: 0.08em currentColor` e `paint-order: stroke fill`. O usuário pediu duas vezes para engrossar; com 0.045em ainda ficou fino. Na abertura, em tamanho grande, fica sem o traço extra.
- **Abertura animada:** logo no centro → `BC` digitado → vira `bycauazin` → fecha com `<` e `/>` → legenda `// desenvolvedor & instrutor` (fica ~1 s na tela para dar tempo de ler) → cortina sobe. Código em [../app/components/site-intro.js](../app/components/site-intro.js).

## Levar para outro projeto (ex.: Cacau, o antigo Finance)

1. Escolha as três cores do projeto (contorno, fita, interior) e gere a logo com `make-logo.mjs`, uma versão para cada tema e uma `--quadrado` para a aba.
2. Sem quadrado atrás da logo, também no ícone da aba.
3. Assinatura `<bycauazin/>` em Major Mono Display, com o mesmo tratamento: "by" na cor de destaque, `<` `/>` a 50%, traço extra no cabeçalho. O produto pode ter o próprio nome ao lado.

**Como ficou no Cacau (2026-11-25, decisões em `finance-app/.agents/DECISIONS.md`):** nome `CACAU` em DM Serif Display ao lado da assinatura `<bycauazin/>`; visual do Finance com o azul-marinho trocado por carvão `#222222`, verde mantido e marrom `#694633` como detalhe; logo com contorno bege, fita marrom e interior verde. No portfólio, o estudo de caso fica em `/projetos/cacau` (o endereço antigo `/projetos/finance-app` redireciona, ver `firebase.json`).
4. Ao trocar um SVG já publicado, mude o `?v=N` no endereço: o Firebase deixa o navegador guardar por 1 hora e a pessoa continua vendo a versão antiga.

## Arquivos

- [logo-template.svg](logo-template.svg): o modelo, com `{{CONTORNO}}`, `{{FITA}}` e `{{INTERIOR}}` no lugar das cores. A fita fica na espessura original (sem engrossar) e o contorno é só traço (`fill="none"`), senão as voltas do meio se juntam.
- [make-logo.mjs](make-logo.mjs): gera o SVG de um projeto. Exemplo:
  `node brand/make-logo.mjs --contorno "#E4F0F6" --fita "#0B2E43" --interior "#FF4F31" --out public/logo-sticker.svg`
  Com `--quadrado`, sai o ícone quadrado para a aba do navegador.

## Onde está em uso aqui

[../public/logo-sticker.svg](../public/logo-sticker.svg) (tema escuro), [../public/logo-sticker-light.svg](../public/logo-sticker-light.svg) (tema claro), [../public/logo-favicon.svg](../public/logo-favicon.svg) (aba; segue o tema do sistema). O componente é [../app/components/brand-logo.js](../app/components/brand-logo.js).
