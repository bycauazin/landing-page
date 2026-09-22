import Image from "next/image";
import Link from "next/link";
import { BeforeAfter, FlowDiagram, ImpactCards, LeadQuote } from "./case-shared";
import styles from "./course-access-case.module.css";

const sourceFlow = [
  "Múltiplas fontes",
  "Dados em formatos diferentes",
  "Revisão e padronização",
  "Arquivo consolidado",
];

const targetFlow = [
  "Fontes de dados",
  "Coleta automatizada",
  "Tratamento e padronização",
  "Consolidação",
  "Excel atualizado",
  "SharePoint",
];

const operationSteps = [
  ["01", "Consulta das fontes", "A rotina acessa os dados necessários em cada origem e prepara o contexto da execução."],
  ["02", "Tratamento inicial", "Os dados são organizados, normalizados e validados antes da consolidação."],
  ["03", "Estruturas intermediárias", "As informações passam por etapas de preparação para ficarem compatíveis entre si."],
  ["04", "Consolidação", "As diferentes bases são reunidas em um único conjunto de informações."],
  ["05", "Excel final", "O documento é gerado em formato adequado para uso posterior por outros processos e análises."],
  ["06", "Publicação centralizada", "O arquivo é disponibilizado no SharePoint para consumo e continuidade do fluxo."],
];

const architectureRows = [
  { label: "Fontes", value: "Dados de diferentes origens e formatos" },
  { label: "Coleta", value: "Serviços e consultas do backend" },
  { label: "Processamento", value: "Padronização, validação e consolidação" },
  { label: "Entrega", value: "Arquivo Excel + publicação centralizada" },
];

function CaseIcon({ type }) {
  const icons = {
    problem: <><circle cx="24" cy="24" r="17" /><path d="M24 14v12M24 33h.01" /></>,
    solution: <><path d="M9 15h21v22H9z" /><path d="M14 21h11M14 27h8M34 12v18M29 17l5-5 5 5" /></>,
    interface: <><rect x="7" y="9" width="34" height="26" rx="2" /><path d="M17 41h14M24 35v6M13 15h22M13 21h15" /></>,
    challenge: <><path d="m24 7 15 8v18l-15 8-15-8V15z" /><path d="m9 15 15 8 15-8M24 23v18" /></>,
    result: <><path d="M8 39h32M12 34l8-9 7 5 11-15" /><path d="M31 15h7v7" /></>,
  };
  return <span className={styles.sectionIcon} aria-hidden="true"><svg viewBox="0 0 48 48">{icons[type]}</svg></span>;
}

function SectionHeading({ number, eyebrow, title, id, icon }) {
  return (
    <div className={styles.sectionHeading}>
      <span className={styles.sectionNumber}>{number}</span>
      <div className={styles.sectionTitle}>
        <p>{eyebrow}</p>
        <h2 id={id}>{title}</h2>
      </div>
      <CaseIcon type={icon} />
    </div>
  );
}

function Flow({ label, items, accent = false }) {
  return (
    <div className={`${styles.flowBlock} ${accent ? styles.accentFlow : ""}`}>
      <p>{label}</p>
      <ol>{items.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></li>)}</ol>
    </div>
  );
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
          <div className={styles.heroMeta}><p>Backend · Automação</p><span>Estudo de caso</span></div>
          <div className={styles.heroGrid}>
            <div>
              <h1 id="case-title">Exportação diária para Excel</h1>
              <p className={styles.heroSummary}>Automação em Node.js para coleta, consolidação e publicação de dados provenientes de diferentes fontes em um arquivo Excel utilizado por outros processos e análises.</p>
            </div>

            <aside className={styles.heroAside}>
              <div className={styles.heroPhoto}>
                <Image src="/project-images/laboratorio-cursos-conceitual.png" alt="Representação conceitual de dados sendo consolidados em um arquivo de Excel" fill sizes="(max-width: 800px) 100vw, 320px" priority />
              </div>
              <span>Contexto do projeto</span>
              <p>Projeto do Account Manager / DeskHub para organizar informações que estavam espalhadas em diferentes fontes.</p>
              <small>Representação conceitual — não é um registro de dados reais ou ambiente interno.</small>
            </aside>
          </div>

          <div className={styles.tags} aria-label="Tecnologias e características do projeto">
            {[ ["Node", "Node.js"], ["SQL", "PostgreSQL"], ["XLS", "Excel"], ["SP", "SharePoint"] ].map(([mark, label]) => <span key={label}><b aria-hidden="true">{mark}</b>{label}</span>)}
          </div>
        </section>

        <LeadQuote text="O problema não era um dado isolado; era a necessidade de reunir informações de diferentes fontes, padronizá-las e disponibilizá-las em um arquivo que pudesse ser usado por outros processos e análises." />

        <ImpactCards cards={[
          { title: "Problema", text: "Os dados necessários para o arquivo final estariam espalhados em diferentes fontes e formatos, exigindo tratamento antes da consolidação." },
          { title: "Solução", text: "Criei uma rotina automatizada para consultar os dados, consolidá-los e gerar um arquivo final em Excel." },
          { title: "Impacto", text: "O processo passou a ser recorrente, mais padronizado e menos dependente de trabalho manual e de consolidação dispersa." },
        ]} />

        <BeforeAfter
          before={["Múltiplas fontes", "Atualização separada", "Consolidação manual", "Arquivo pendente de uso"]}
          after={["Coleta automatizada", "Tratamento e padronização", "Consolidação centralizada", "Excel disponibilizado para uso"]}
        />

        <FlowDiagram steps={[
          { label: "Fontes", text: "Os dados vêm de diferentes origens e contextos." },
          { label: "Coleta", text: "A rotina consulta e prepara as informações em backend." },
          { label: "Processamento", text: "Os dados passam por validação e normalização." },
          { label: "Consolidação", text: "As informações são reunidas em uma estrutura única." },
          { label: "Excel", text: "O arquivo final é gerado em formato útil para análise." },
          { label: "SharePoint", text: "O resultado fica disponível para consumo continuado." },
        ]} />

        <nav className={styles.caseNav} aria-label="Etapas do estudo de caso">
          {[
            ["01", "Contexto", "context-title"],
            ["02", "Problema", "problem-title"],
            ["03", "Objetivo", "objective-title"],
            ["04", "Arquitetura", "architecture-title"],
            ["05", "Fluxo", "flow-title"],
            ["06", "Resultado", "result-title"],
          ].map(([number, label, target]) => <a href={`#${target}`} key={number}><span>{number}</span><strong>{label}</strong><b aria-hidden="true">↓</b></a>)}
        </nav>

        <section className={styles.section} aria-labelledby="context-title">
          <SectionHeading number="01" eyebrow="Contexto" title="Dados em diferentes origens" id="context-title" icon="problem" />
          <div className={styles.problemGrid}>
            <div className={styles.mainCopy}>
              <p>Esse projeto faz parte do Account Manager / ecossistema DeskHub. O principal desafio era unir informações que vinham de diferentes fontes e contextos, como dados do Account Manager, do Moodle, de arquivos auxiliares e de dados externos disponibilizados no SharePoint.</p>
              <p>O objetivo era gerar um arquivo que pudesse ser usado depois por outros processos e por análises. A informação não estava disponível em uma única origem, e isso exigia organização antes da consolidação.</p>
            </div>
            <div className={styles.fact}><strong>Dados</strong><span>distribuídos em múltiplas fontes e formatos</span><small>Sem expor nomes internos ou detalhes sensíveis.</small></div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="problem-title">
          <SectionHeading number="02" eyebrow="Problema" title="Consolidar sem perder padronização" id="problem-title" icon="solution" />
          <div className={styles.problemGrid}>
            <div className={styles.mainCopy}>
              <p>Parte do processo dependia de atualizações e consolidacoes feitas a partir de fontes diferentes. Isso levava a um cenário em que a base não era sempre criada a partir da mesma estrutura, mesmo para a mesma finalidade.</p>
              <p>O desafio não era apenas reunir os dados; era fazê-lo de forma consistente, com tratamento de informações, padronização e geração de um arquivo pronto para uso posterior.</p>
            </div>
            <div className={styles.fact}><strong>Multi</strong><span>fontes, formatos e regras de organização diferentes</span></div>
          </div>
          <Flow label="Antes do fluxo automatizado" items={sourceFlow} />
        </section>

        <section className={styles.section} aria-labelledby="objective-title">
          <SectionHeading number="03" eyebrow="Objetivo" title="Tornar o fluxo recorrente e confiável" id="objective-title" icon="challenge" />
          <div className={styles.solutionIntro}>
            <p>O objetivo foi criar uma rotina automatizada no backend para consultar as fontes necessárias, consolidar os dados, aplicar os tratamentos necessários e disponibilizar o arquivo final em um local centralizado para uso posterior.</p>
            <div className={styles.nodeBadge}><Image src="/technology-icons/nodejs.svg" width={52} height={52} alt="Node.js" /><strong>Backend em Node.js<br />com geração recorrente de Excel.</strong></div>
          </div>
          <div className={styles.interfaceLayout}>
            <div className={styles.interfaceCopy}>
              <p>A rotina foi pensada para organizar esse pipeline em etapas claras: coletar, processar, consolidar e publicar o resultado final.</p>
              <div><span>Visão do objetivo</span><p>Uma base estruturada, pronta para consumo por outros processos e por análises futuras.</p></div>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="architecture-title">
          <SectionHeading number="04" eyebrow="Arquitetura técnica" title="Backend orientado ao fluxo de dados" id="architecture-title" icon="interface" />
          <div className={styles.mainCopyWide}>
            <p>A implementação foi desenvolvida no backend em Node.js. A ideia era separar a responsabilidade de coleta, preparação, processamento e publicação do arquivo final, mantendo o fluxo mais legível e fácil de evoluir.</p>
          </div>

          <div className={styles.courseModes}>
            {architectureRows.map((row) => (
              <article key={row.label}>
                <span>{row.label}</span>
                <h3>{row.value}</h3>
              </article>
            ))}
          </div>

          <p className={styles.technicalNote}>A representação abaixo é conceitual e busca manter a clareza produtiva do fluxo sem expor detalhes internos, estruturas sensíveis ou nomes de ambientes privados.</p>
        </section>

        <section className={styles.section} aria-labelledby="flow-title">
          <SectionHeading number="05" eyebrow="Fluxo do processo" title="Do dado bruto ao Excel final" id="flow-title" icon="result" />
          <Flow label="Novo processo" items={targetFlow} accent />
          <ol className={styles.operationGrid} aria-label="Etapas da rotina de exportação">
            {operationSteps.map(([number, title, description]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}
          </ol>
        </section>

        <section className={`${styles.section} ${styles.result}`} aria-labelledby="result-title">
          <SectionHeading number="06" eyebrow="Resultado" title="Fluxo recorrente e mais estruturado" id="result-title" icon="result" />
          <div className={styles.resultGrid}>
            <div className={styles.metric}><span>⇢</span><strong>1</strong><p>arquivo final consolidado em um ponto central para uso por outros processos e análises.</p></div>
            <div className={styles.resultCopy}>
              <p>O que mudou foi a forma de trabalhar com os dados: em vez de depender de várias fontes e de consolidação dispersa, a rotina passou a coordenar a coleta, o tratamento e a publicação de um arquivo único e mais consistente.</p>
              <div>
                <span>Minha participação</span>
                <p>Atuei na análise do problema, na definição do fluxo de dados, na lógica de consolidação e na publicação do resultado em um formato reutilizável para uso posterior.</p>
              </div>
            </div>
          </div>

          <div className={styles.capabilities} aria-label="Competências relacionadas ao projeto">
            <span>Node.js</span>
            <span>Automação</span>
            <span>Consolidação de dados</span>
            <span>Excel</span>
            <span>SharePoint</span>
            <span>Backend</span>
          </div>

          <div className={styles.connectedCard}>
            <span>Visão técnica</span>
            <strong>Fluxo de dados: fontes → coleta → processamento → Excel → SharePoint</strong>
            <p>Estrutura pensada para reduzir acoplamento e tornar a publicação mais previsível.</p>
            <b aria-hidden="true">→</b>
          </div>
        </section>
      </main>

      <footer className={styles.footer}><span>© {new Date().getFullYear()} Cauã · bycauazin</span><Link href="/projetos">Ver todos os projetos ↑</Link></footer>
    </div>
  );
}
