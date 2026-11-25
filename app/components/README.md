# app/components

Componentes reutilizados pela home (`app/page.js`), por `/projetos` e pelos estudos de caso.

## Onde começar

- [projects-page.js](projects-page.js): a página "Meus projetos" (header, hero, catálogo). Usa os estilos da home ([../page.module.css](../page.module.css)).
- [project-explorer.js](project-explorer.js): lista de projetos com filtro por tecnologia. Projeto com `image` em [../data/projects.js](../data/projects.js) mostra a foto da tela como capa; sem `image`, mostra os ícones das tecnologias (projetos só de código).
- [use-theme.js](use-theme.js) + [theme-script.js](theme-script.js): tema claro/escuro do site inteiro. A escolha fica no `localStorage` (`theme`) e vira `data-theme` no `<html>`; o script entra no `<head>` pelo [layout](../layout.js) e aplica o tema antes da primeira pintura. Os tokens do tema claro estão em [../globals.css](../globals.css) (e na classe `.light` da home).

## Animações

- [hero-circuit-field.js](hero-circuit-field.js): "circuito vivo" em canvas. Variantes: `hero` (segue o mouse, só no topo da home), `sweep` (só a varredura entre seções marcadas com `data-circuit-sweep`), `page` (circuito discreto na página inteira; não usado: atrapalhava a leitura).
- [snap-cursor.js](snap-cursor.js): cursor de encaixe (home e `/projetos`).
- [home-motion.js](home-motion.js), [projects-motion.js](projects-motion.js), [reveal-text.js](reveal-text.js): entradas com GSAP.
- [case-rail.js](../projetos/[slug]/case-rail.js): navegação lateral e progresso de rolagem da home, do catálogo e dos estudos de caso.

Tudo respeita `prefers-reduced-motion`. Não há testes automatizados; a conferência é `npm run lint` + `npm run build` e olhar as páginas.
