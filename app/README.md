# app

A home usa [page.js](page.js), [page.module.css](page.module.css) e os [componentes compartilhados](components/README.md). [layout.js](layout.js) e [globals.css](globals.css) definem a estrutura e os temas. O [catálogo](projetos/README.md) usa os dados de [projects.js](data/projects.js).

## Título da home

Edite a identificação e o título principal em [page.js](page.js). A linha em destaque fica no elemento `<em>`. Confira a quebra do título em tela estreita.

## Aulas particulares

A home mostra **Aulas particulares** logo depois de **Projetos em destaque**. Os temas anunciados são Power BI, Python, JavaScript e SQL/PostgreSQL. Edite os temas e os materiais em [private-lessons.js](private-lessons.js). Os estilos da seção estão em [private-lessons.module.css](private-lessons.module.css).

Use `npm run lint` e `npm run build` para validar. Confira a seção em tela estreita, nos dois temas e na home exportada em `out/index.html`.
