# Portfólio — Cauã

Desenvolvedor que transforma problemas de negócio em soluções digitais com desenvolvimento web, automação e dados.

[Acessar o portfólio](https://bycauazin.web.app) · [Ver os projetos](https://bycauazin.web.app/projetos/)

## Objetivo

Este site apresenta não apenas as tecnologias que utilizo, mas principalmente como penso e construo soluções.

O portfólio foi organizado para atender três públicos:

- **Clientes:** entendem quais problemas posso ajudar a resolver e como trabalho.
- **Recrutadores:** encontram minhas competências e experiências profissionais.
- **Desenvolvedores:** podem conhecer as decisões técnicas, ferramentas e estrutura dos projetos.

## O que você encontra aqui

O conteúdo está dividido entre dois tipos de entrega:

### Projetos desenvolvidos

Soluções com objetivo e escopo próprios, incluindo aplicações web, automações, integrações e dashboards.

### Soluções em sistemas existentes

Melhorias e funcionalidades desenvolvidas dentro de produtos que já estavam em uso. Essa área mostra minha capacidade de compreender regras de negócio, trabalhar sobre uma base real e entregar soluções sem apresentar cada melhoria como um projeto independente.

Cada projeto possui uma página individual preparada para documentar:

- contexto e problema;
- solução proposta;
- minha participação;
- processo de desenvolvimento;
- resultados e aprendizados;
- links para GitHub e demonstrações;
- imagens, fluxos e trechos de código.

Nos trabalhos profissionais, a documentação prioriza a explicação do processo e preserva dados, regras e códigos confidenciais.

## Tecnologias

- **Front-end:** React, Next.js e JavaScript.
- **Back-end e dados:** Node.js e PostgreSQL.
- **Automação:** Python e Power Automate.
- **Dados e produtividade:** Power BI, SharePoint e Excel.
- **Publicação:** exportação estática com Next.js e Firebase Hosting.

## Decisões técnicas

O projeto utiliza o App Router do Next.js e uma fonte de dados centralizada para os projetos. A partir dela, a aplicação gera automaticamente a listagem, os filtros por tecnologia e uma página estática para cada documentação.

Essa estrutura facilita a manutenção: um novo projeto pode ser cadastrado sem duplicar páginas ou componentes.

```text
app/
├── components/              # Componentes reutilizáveis
├── data/projects.js         # Projetos, tecnologias e documentação
├── projetos/                # Catálogo de projetos
│   └── [slug]/              # Página individual de cada projeto
├── layout.js                # Estrutura e metadados globais
└── page.js                  # Página inicial
```

## Executando localmente

### Requisitos

- Node.js instalado;
- npm para gerenciamento das dependências.

### Instalação

```bash
git clone https://github.com/bycauazin/landing-page.git
cd landing-page
npm install
npm run dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

> Caso o endereço do repositório seja diferente, substitua a URL do comando `git clone`.

## Comandos disponíveis

```bash
npm run dev    # inicia o ambiente de desenvolvimento
npm run lint   # verifica a qualidade do código
npm run build  # gera a versão estática em /out
npm run start  # inicia o servidor de produção do Next.js
```

## Adicionando um projeto

Os projetos ficam em `app/data/projects.js`. Cada item contém as informações exibidas no catálogo e uma estrutura de documentação:

```js
documentation: {
  context: "",
  problem: "",
  solution: "",
  role: "",
  process: "",
  result: "",
  learnings: "",
  githubUrl: "",
  demoUrl: "",
  images: [],
  codeSamples: [],
}
```

Para classificar uma entrega, utilize:

```js
portfolioType: "projeto"  // solução com escopo próprio
portfolioType: "solucao" // melhoria em um sistema existente
```

Imagens públicas devem ser armazenadas em `public/`. Antes de publicar materiais profissionais, remova dados pessoais, credenciais, URLs internas e informações da empresa.

## Qualidade e publicação

Antes de publicar uma nova versão:

```bash
npm run lint
npm run build
firebase deploy --only hosting
```

O projeto usa exportação estática, URLs com barra final e cabeçalhos de segurança configurados no Firebase Hosting.

## Posicionamento profissional

A descrição atual é abrangente e funciona bem para este portfólio:

> Desenvolvedor que transforma problemas de negócio em soluções digitais com desenvolvimento web, automação e dados.

Outras opções para avaliar no futuro:

- **Mais comercial:** Desenvolvo soluções digitais para simplificar processos, conectar informações e apoiar decisões.
- **Mais técnica:** Desenvolvedor de software com atuação em aplicações web, APIs, automações e análise de dados.
- **Mais orientada a produto:** Transformo necessidades de negócio em produtos e melhorias digitais simples, úteis e sustentáveis.
- **Mais pessoal:** Gosto de entender problemas, organizar a complexidade e construir tecnologia que funciona no dia a dia.

## Contato

Se você tem um projeto, uma oportunidade ou quer conversar sobre tecnologia:

- [Portfólio](https://bycauazin.web.app)
- [GitHub](https://github.com/bycauazin)
- [LinkedIn](https://www.linkedin.com/in/caua-santana-dev/)
- [WhatsApp](https://wa.me/5521988120757)
- **E-mail:** adicionar endereço profissional

---

Desenvolvido por **Cauã** com Next.js e Firebase.
