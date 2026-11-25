# Estudos de caso

[page.js](page.js) associa as rotas aos estudos de caso. Edite o texto visível no arquivo `*-case.js` correspondente e confira se o resumo em [projects.js](../../data/projects.js) descreve a mesma solução. Preserve os links das páginas e descreva o problema, a contribuição e o resultado com contexto genérico e dados demonstrativos.

[case-rail.js](case-rail.js) desenha a navegação lateral dos estudos de caso, da [home](../../page.js) e do [catálogo](../../components/projects-page.js). Sem `fitSelector`, mede a folga a partir da primeira seção. [case-chrome.module.css](case-chrome.module.css) posiciona a barra à direita, e [globals.css](../../globals.css) posiciona o circuito à esquerda.

Use `npm run lint` e `npm run build` e confira as páginas exportadas em `out/projetos/`.
