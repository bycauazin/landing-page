# app

A home usa [page.js](page.js), [page.module.css](page.module.css) e os [componentes compartilhados](components/README.md). [layout.js](layout.js) e [globals.css](globals.css) definem a estrutura e os temas. O [catálogo](projetos/README.md) usa os dados de [projects.js](data/projects.js).

## Título da home

Edite a identificação “Cauã · desenvolvedor & instrutor” e o título principal em [page.js](page.js). A linha em destaque fica no elemento `<em>`. Confira a quebra do título em tela estreita.

## Barra lateral

A home, o catálogo e os estudos de caso usam [a barra lateral](projetos/[slug]/case-rail.js) à direita para mostrar a seção atual e navegar pela página quando há espaço. Os atributos `data-rail` e `data-rail-icon` definem o nome e o ícone de cada parada. O circuito decorativo fica à esquerda e é definido em [globals.css](globals.css).

## Aulas particulares

A home mostra **Aulas particulares** logo depois de **Projetos em destaque**. Os temas anunciados são Power BI, Python, JavaScript e SQL/PostgreSQL. Edite os temas e os materiais em [private-lessons.js](private-lessons.js). Os estilos da seção estão em [private-lessons.module.css](private-lessons.module.css).

Os cartões de serviços em **Projetos em destaque** e os de materiais em **Aulas particulares** usam [detail-cards.module.css](detail-cards.module.css).

Use `npm run lint` e `npm run build` para validar. Confira a seção em tela estreita, nos dois temas e na home exportada em `out/index.html`.

Nas tecnologias da home, teste **Mostrar tudo** e **Voltar ao carrossel**. Em telas estreitas, as categorias expandidas devem ocupar uma coluna.
