import Link from "next/link";
import styles from "./exportacao-diaria-case.module.css";

const pipeline = [
  ["01", "Coletar", "Consultar dados do Account Manager e do Moodle."],
  ["02", "Relacionar", "Cruzar fontes e construir estruturas derivadas para o arquivo."],
  ["03", "Gerar", "Criar um workbook com abas, cabeçalhos e datas formatadas."],
  ["04", "Combinar", "Incorporar planilhas auxiliares e preservar suas referências."],
  ["05", "Publicar", "Enviar o arquivo final ao SharePoint e comunicar o resultado."],
];

const orchestrationCode = [
  "const { all, metadata } = await this._fetchAllData(warnings);",
  "await this._buildCourseCompanyTable(all, warnings);",
  "",
  "const moduleMap =",
  "    await this._addModulesFromCompetencyTemplates(all);",
  "await this._addStudentModulesFromCompetencyPlans(all, moduleMap);",
  "await this._enrichCompaniesWithCourseCategoryId(all, warnings);",
  "await this._enrichStudentsWithAccessInfo(all, warnings);",
  "",
  "const baseBuffer = await this.excelService.generateExcel(all);",
  "const { finalBuffer, mergeStats } =",
  "    await this._mergeExtraAttachments(baseBuffer);",
  "return this._uploadAndSave(finalBuffer, all, metadata, mergeStats);",
];

const workbookCode = [
  "const workbook = new ExcelJS.Workbook();",
  "",
  "for (const table of EXPORT_TABLES) {",
  "    const sheet = workbook.addWorksheet(table);",
  "    const rows = dataByTable[table] || [];",
  "",
  "    const headers = Array.from(rows.reduce((set, row) => {",
  "        Object.keys(row).forEach((key) => set.add(key));",
  "        return set;",
  "    }, new Set()));",
  "",
  "    sheet.addRow(headers);",
  "    sheet.views = [{ state: \"frozen\", ySplit: 1 }];",
  "}",
  "return workbook.xlsx.writeBuffer();",
];

const formulaCode = [
  "for (const [oldName, newName] of Object.entries(renameMap)) {",
  "    const escapedName = oldName.replace(/[^a-z0-9_]/gi, \"\\\\$&\");",
  "    const pattern = new RegExp(`\\\\b${escapedName}!`, \"gi\");",
  "    newFormula = newFormula.replace(pattern, `${newName}!`);",
  "}",
  "",
  "if (newFormula !== oldFormula) {",
  "    cell.value = { formula: newFormula };",
  "    formulasUpdated++;",
  "}",
];

const tokenPattern = /(\"(?:[^\"\\]|\\.)*\"|'(?:[^'\\]|\\.)*'|`[^`]*`|\b(?:async|await|const|return|if|true|false|null|new|throw|for|of)\b|\b(?:generateExcel|writeBuffer|addWorksheet|addRow|reduce|forEach|add|replace|entries|RegExp|_fetchAllData|_uploadAndSave|_mergeExtraAttachments)\b|\b(?:workbook|sheet|rows|headers|warnings|metadata|all|finalBuffer|mergeStats|newFormula|oldFormula|escapedName|renameMap|cell|formulasUpdated)\b)/g;

function highlightCode(line) {
  return line.split(tokenPattern).filter(Boolean).map((token, index) => {
    let kind = "plain";
    if (/^[\"'`]/.test(token)) kind = "string";
    else if (/^(async|await|const|return|if|true|false|null|new|throw|for|of)$/.test(token)) kind = "keyword";
    else if (/^(generateExcel|writeBuffer|addWorksheet|addRow|reduce|forEach|add|replace|entries|RegExp|_fetchAllData|_uploadAndSave|_mergeExtraAttachments)$/.test(token)) kind = "method";
    else if (/^(workbook|sheet|rows|headers|warnings|metadata|all|finalBuffer|mergeStats|newFormula|oldFormula|escapedName|renameMap|cell|formulasUpdated)$/.test(token)) kind = "property";
    return <span className={styles[kind]} key={`${token}-${index}`}>{token}</span>;
  });
}

function CodeEditor({ filename, label, lines }) {
  return (
    <figure className={styles.editor} aria-label={label}>
      <figcaption className={styles.editorBar}>
        <span className={styles.windowDots} aria-hidden="true"><i /><i /><i /></span>
        <span className={styles.fileName}><b>JS</b>{filename}</span>
        <span className={styles.editorMenu} aria-hidden="true">•••</span>
      </figcaption>
      <div className={styles.codeScroller}>
        <pre className={styles.codeBlock}>{lines.map((line, index) => (
          <code className={styles.codeLine} key={`${filename}-${index}`}>
            <span className={styles.lineNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <span>{highlightCode(line) || " "}</span>
          </code>
        ))}</pre>
      </div>
    </figure>
  );
}

function SectionHeading({ number, eyebrow, title, id }) {
  return <div className={styles.sectionHeading}><span>{number}</span><div><p>{eyebrow}</p><h2 id={id}>{title}</h2></div></div>;
}

export default function ExportacaoDiariaCase() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/#projetos" aria-label="Voltar ao início"><span>C</span> bycauazin</Link>
        <Link className={styles.backLink} href="/projetos">← Todos os projetos</Link>
      </header>

      <main>
        <section className={styles.hero} aria-labelledby="case-title">
          <div className={styles.heroMeta}><p>Backend · Dados · Automação</p><span>Estudo de caso</span></div>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <h1 id="case-title">Exportação automatizada para Excel</h1>
              <p>Rotina backend que reúne dados do Account Manager e do Moodle, prepara estruturas para análise, combina planilhas auxiliares e publica um workbook centralizado no SharePoint.</p>
            </div>
            <div className={styles.workbookVisual} aria-label="Representação conceitual de um arquivo Excel formado por diferentes fontes">
              <div className={styles.sourceLabels}><span>PostgreSQL</span><span>MySQL · Moodle</span><span>SharePoint</span></div>
              <div className={styles.workbook}>
                <div className={styles.workbookBar}><b>XLSX</b><span>dados_consolidados.xlsx</span></div>
                <div className={styles.sheetTabs}><span>alunos</span><span>cursos</span><span>relações</span></div>
                <div className={styles.cells}>{Array.from({ length: 24 }, (_, index) => <i key={index} />)}</div>
              </div>
            </div>
          </div>
          <div className={styles.tags}>{["Node.js", "ExcelJS", "PostgreSQL", "MySQL", "Microsoft Graph", "SharePoint"].map((tag) => <span key={tag}>{tag}</span>)}</div>
        </section>

        <div className={styles.leadStatement}><span>Decisão central</span><blockquote>O arquivo não é apenas exportado. Ele é construído a partir de fontes que precisam ser reconciliadas.</blockquote></div>

        <nav className={styles.caseNav} aria-label="Etapas do estudo de caso">
          {[["01", "Problema", "problem-title"], ["02", "Pipeline", "pipeline-title"], ["03", "Workbook", "workbook-title"], ["04", "Merge", "merge-title"], ["05", "Arquitetura", "architecture-title"], ["06", "Resultado", "result-title"]].map(([number, label, target]) => <a href={`#${target}`} key={number}><span>{number}</span><strong>{label}</strong><b aria-hidden="true">↓</b></a>)}
        </nav>

        <section className={styles.section} aria-labelledby="problem-title">
          <SectionHeading number="01" eyebrow="Contexto e problema" title="Informações úteis, mas distribuídas" id="problem-title" />
          <div className={styles.twoColumns}>
            <div className={styles.prose}><p>Os dados necessários para outros processos e análises não estavam em uma única origem. Parte existia no Account Manager, parte no banco do Moodle e outra parte chegava em planilhas mantidas no SharePoint.</p><p>Gerar o Excel exigia mais do que copiar tabelas. Era preciso consultar fontes com estruturas diferentes, relacionar registros, criar dados derivados e entregar um arquivo consistente para consumo posterior.</p></div>
            <aside className={styles.callout}><span>O desafio</span><strong>Transformar várias fontes em um único contrato de dados.</strong><p>Sem esconder que cada origem possui regras, formatos e limites próprios.</p></aside>
          </div>
          <div className={styles.sourceGrid}>
            <article><span>01</span><strong>Account Manager</strong><p>Dados relacionais consultados no PostgreSQL por meio dos DAOs da aplicação.</p><small>Cadastros e vínculos locais</small></article>
            <article><span>02</span><strong>Moodle</strong><p>Tabelas permitidas lidas do MySQL com paginação, filtros e ordenação controlada.</p><small>Uso e estruturas educacionais</small></article>
            <article><span>03</span><strong>SharePoint</strong><p>Workbooks auxiliares obtidos pelo Microsoft Graph e incorporados ao arquivo final.</p><small>Fontes complementares</small></article>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="pipeline-title">
          <SectionHeading number="02" eyebrow="Pipeline" title="Da coleta à publicação" id="pipeline-title" />
          <ol className={styles.pipelineGrid}>{pipeline.map(([number, title, description]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></li>)}</ol>
          <div className={styles.codeNarrative}>
            <div className={styles.codeCopy}><span>Orquestração</span><h3>Uma sequência explícita de transformações</h3><p>O job coleta as fontes, constrói relações derivadas, enriquece registros, gera o Excel base, combina os anexos e só então publica o resultado.</p><p>Cada etapa tem uma responsabilidade visível e pode produzir avisos para o relatório final da execução.</p></div>
            <CodeEditor filename="ExportExcelDaily.js" label="Trecho simplificado da orquestração da exportação" lines={orchestrationCode} />
          </div>
          <p className={styles.codeDisclaimer}>Trechos reais simplificados. Informações internas e sensíveis foram removidas.</p>
        </section>

        <section className={styles.section} aria-labelledby="workbook-title">
          <SectionHeading number="03" eyebrow="Geração do arquivo" title="Um workbook preparado para continuar sendo usado" id="workbook-title" />
          <div className={styles.qualityGrid}>
            <article><span>Abas dinâmicas</span><p>Cada conjunto configurado recebe sua própria worksheet.</p></article>
            <article><span>Cabeçalhos completos</span><p>A união das chaves de todas as linhas evita perder colunas que aparecem depois.</p></article>
            <article><span>Datas legíveis</span><p>Timestamps das duas origens são convertidos e formatados para o Excel.</p></article>
            <article><span>Navegação</span><p>A primeira linha fica congelada para manter os cabeçalhos durante a leitura.</p></article>
          </div>
          <div className={styles.codeNarrativeReverse}>
            <CodeEditor filename="ExcelGeneratorService.js" label="Trecho simplificado da geração das abas do workbook" lines={workbookCode} />
            <div className={styles.codeCopy}><span>ExcelJS</span><h3>Estrutura criada em memória</h3><p>O serviço gera o workbook sem depender de um arquivo temporário como etapa principal. Ao final, entrega um buffer que pode seguir para o merge e para a publicação.</p><p>Quando uma fonte não possui registros, a aba continua existindo e indica o estado vazio.</p></div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="merge-title">
          <SectionHeading number="04" eyebrow="Consolidação" title="Combinar planilhas sem quebrar suas fórmulas" id="merge-title" />
          <div className={styles.twoColumns}>
            <div className={styles.prose}><p>Algumas fontes complementares já existiam como arquivos no SharePoint. O fluxo baixa esses workbooks, copia suas abas para o Excel base e ajusta nomes para respeitar limites e evitar duplicidades.</p><p>Renomear uma aba pode invalidar fórmulas que apontam para ela. Por isso, o merge mantém um mapa entre nomes antigos e novos, reescreve referências e registra quantas fórmulas foram verificadas ou atualizadas.</p></div>
            <div className={styles.mergeFlow}><span>Excel base</span><b>+</b><span>Planilhas auxiliares</span><b>→</b><span>Abas renomeadas</span><b>→</b><span>Fórmulas ajustadas</span></div>
          </div>
          <div className={styles.codeNarrative}>
            <div className={styles.codeCopy}><span>Integridade</span><h3>Referências acompanham o novo nome da aba</h3><p>O serviço percorre o mapa de renomeação e troca apenas referências de worksheet. Quando a fórmula muda, o valor da célula é atualizado e contabilizado no relatório do merge.</p></div>
            <CodeEditor filename="ExcelMergeService.js" label="Trecho simplificado da atualização de referências em fórmulas" lines={formulaCode} />
          </div>
        </section>

        <section className={styles.section} aria-labelledby="architecture-title">
          <SectionHeading number="05" eyebrow="Arquitetura e operação" title="Uma rotina recorrente que não bloqueia a API" id="architecture-title" />
          <div className={styles.architectureFlow} aria-label="Arquitetura da exportação">
            {["Scheduler", "Worker thread", "Serviços e DAOs", "ExcelJS", "Microsoft Graph", "SharePoint"].map((item, index, items) => <div key={item}><span>{item}</span>{index < items.length - 1 && <b aria-hidden="true">→</b>}</div>)}
          </div>
          <div className={styles.architectureGrid}>
            <article><span>Agendamento</span><h3>Execução recorrente</h3><p>O nome histórico do projeto foi preservado no portfólio. Na configuração atual, o scheduler dispara a exportação a cada hora em produção.</p></article>
            <article><span>Isolamento</span><h3>Worker dedicado</h3><p>O processamento roda em uma worker thread para que a criação do arquivo não bloqueie o processo principal da API.</p></article>
            <article><span>Pré-condições</span><h3>Conexões verificadas</h3><p>PostgreSQL e MySQL são testados antes da coleta. Sem uma das fontes essenciais, o job não inicia a exportação.</p></article>
            <article><span>Observabilidade</span><h3>Avisos e notificações</h3><p>A execução reúne avisos e envia um resumo de sucesso; uma falha global gera uma notificação própria.</p></article>
          </div>
          <div className={styles.resilienceNote}><span>Falha parcial</span><p>Quando uma consulta isolada do Account Manager falha, a rotina registra o aviso e mantém aquela coleção vazia para continuar o fluxo. Erros que impedem a exportação completa são propagados e comunicados como falha.</p></div>
          <div className={styles.challengeHeader}><span>Desafios técnicos</span><h3>O trabalho está nas bordas entre as fontes</h3></div>
          <div className={styles.challengeGrid}>
            <article><b>01</b><h4>Dois bancos</h4><p>PostgreSQL e MySQL possuem estruturas e estratégias de consulta diferentes.</p></article>
            <article><b>02</b><h4>Dados derivados</h4><p>Algumas abas dependem de relações construídas em memória a partir de mais de uma origem.</p></article>
            <article><b>03</b><h4>Workbooks externos</h4><p>Abas, estilos e fórmulas precisam sobreviver ao processo de combinação.</p></article>
            <article><b>04</b><h4>Publicação remota</h4><p>Autenticação, upload e resposta do Microsoft Graph fazem parte da entrega.</p></article>
          </div>
        </section>

        <section className={`${styles.section} ${styles.resultSection}`} aria-labelledby="result-title">
          <SectionHeading number="06" eyebrow="Participação e resultado" title="De fontes dispersas para um arquivo centralizado" id="result-title" />
          <div className={styles.roleResultGrid}>
            <article><span>Minha participação</span><p>Atuei na arquitetura e implementação da rotina em Node.js, na coleta dos dois bancos, nas regras de transformação e enriquecimento, na geração do workbook com ExcelJS, no merge das fontes auxiliares e na publicação pelo Microsoft Graph. Também trabalhei no agendamento, isolamento em worker e tratamento das notificações.</p></article>
            <article><span>Resultado</span><p>O arquivo passou a ser produzido por um processo recorrente e padronizado. A rotina concentra coleta, relacionamento, formatação, consolidação e publicação, reduzindo a dependência de montagem manual e deixando a execução mais observável.</p></article>
          </div>
          <div className={styles.outcomeGrid}>{["Coleta recorrente", "Fontes reconciliadas", "Workbook padronizado", "Fórmulas preservadas", "Publicação centralizada", "Falhas comunicadas"].map((item) => <span key={item}>{item}</span>)}</div>
          <div className={styles.learningBlock}><span>Aprendizados</span><div><article><strong>Exportar é modelar</strong><p>Um arquivo útil depende de relações e transformações, não apenas de consultas.</p></article><article><strong>Planilhas também têm dependências</strong><p>Nomes de abas e fórmulas formam referências que precisam ser preservadas.</p></article><article><strong>Rotinas pesadas pedem isolamento</strong><p>O worker reduz o impacto da exportação sobre a API principal.</p></article><article><strong>Falhas precisam de contexto</strong><p>Avisos e resumos tornam a execução mais fácil de acompanhar.</p></article></div></div>
          <div className={styles.techGrid}>{["Node.js", "JavaScript", "ExcelJS", "Sequelize", "PostgreSQL", "MySQL", "Microsoft Graph", "SharePoint", "node-schedule", "Worker Threads"].map((tech) => <span key={tech}>{tech}</span>)}</div>
        </section>
      </main>

      <footer className={styles.footer}><span>© {new Date().getFullYear()} Cauã · bycauazin</span><Link href="/projetos">Ver todos os projetos ↑</Link></footer>
    </div>
  );
}
