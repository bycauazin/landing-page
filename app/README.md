# app

A home usa [page.js](page.js), [page.module.css](page.module.css) e os [componentes compartilhados](components/README.md). [layout.js](layout.js) e [globals.css](globals.css) definem a estrutura e os temas. O [catálogo](projetos/README.md) usa os dados de [projects.js](data/projects.js).

## Prévia das aulas particulares

Com `npm run dev`, a home mostra a seção **Aulas particulares** depois de **Sobre mim**. Edite os temas, os materiais e os espaços para feedback em [private-lessons.js](private-lessons.js). Os estilos estão em [private-lessons.module.css](private-lessons.module.css). Quando houver prints, substitua os espaços marcados pelas imagens autorizadas, com os dados pessoais ocultos.

Use `npm run lint` e `npm run build` para validar. Confira a prévia em tela estreita e nos dois temas e verifique que a home exportada em `out/index.html` omite a seção.
