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

## Arquivos

- [logo-template.svg](logo-template.svg): o modelo, com `{{CONTORNO}}`, `{{FITA}}` e `{{INTERIOR}}` no lugar das cores. A fita fica na espessura original (sem engrossar) e o contorno é só traço (`fill="none"`), senão as voltas do meio se juntam.
- [make-logo.mjs](make-logo.mjs): gera o SVG de um projeto. Exemplo:
  `node brand/make-logo.mjs --contorno "#E4F0F6" --fita "#0B2E43" --interior "#FF4F31" --out public/logo-sticker.svg`
  Com `--quadrado`, sai o ícone quadrado para a aba do navegador.

## Onde está em uso aqui

[../public/logo-sticker.svg](../public/logo-sticker.svg) (tema escuro), [../public/logo-sticker-light.svg](../public/logo-sticker-light.svg) (tema claro), [../public/logo-favicon.svg](../public/logo-favicon.svg) (aba; segue o tema do sistema). O componente é [../app/components/brand-logo.js](../app/components/brand-logo.js).
