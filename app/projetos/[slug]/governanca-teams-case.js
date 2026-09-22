import Link from "next/link";
import { BeforeAfter, FlowDiagram, ImpactCards, LeadQuote, RoadmapStatus } from "./case-shared";
import CaseFloatingActions from "./case-floating-actions";
import styles from "./planner-power-bi-case.module.css";

const statusStages = [
  {
    label: "Validado no piloto",
    variant: "done",
    items: [
      "Estrutura inicial das listas SharePoint",
      "Consulta ao calendário",
      "Localização de reuniões",
      "Criação controlada de reunião ausente",
      "Prevenção de duplicidade",
      "Registro de ocorrências",
    ],
  },
  {
    label: "Em desenvolvimento",
    variant: "progress",
    items: [
      "Refinamento de recorrências",
      "Tratamento de cancelamentos",
      "Exceções e auditoria",
      "Validações de conflitos",
      "Preparação para uso mais robusto",
    ],
  },
  {
    label: "Próximas etapas",
    variant: "planned",
    items: [
      "Transcrição de reuniões",
      "Centralização de registros",
      "Geração de atas",
      "Decisões e riscos",
      "Ações e tarefas",
      "Indicadores e Power BI",
    ],
  },
];

const listStructure = [
  { name: "GOV_Reunioes", description: "Dados principais da reunião: periodicidade, coordenação, responsável e parâmetros da governança." },
  { name: "GOV_Pautas", description: "Estrutura de pautas esperadas e temas recorrentes por categoria de reunião." },
  { name: "GOV_MembrosGrupos", description: "Relaciona grupos, participantes e regras de presença obrigatória." },
  { name: "GOV_ResponsaveisSetor", description: "Define quem deve receber notificações e tomar decisão sobre ocorrências." },
  { name: "GOV_ReuniaoGrupos", description: "Conecta reuniões aos grupos e participantes envolvidos no processo." },
  { name: "GOV_Ocorrencias", description: "Centraliza inconsistências, conflitos, duplicidades e eventos que exigem análise humana." },
];

const governanceFlow = [
  "Mapa de governança",
  "Listas SharePoint",
  "Power Automate",
  "Calendário Microsoft 365",
  "Microsoft Teams",
  "Verificações e ocorrências",
  "Notificações",
];

const automationSequence = [
  ["01", "Consulta de calendário", "A automação verifica se a reunião esperada existe no período correto."],
  ["02", "Identificação da ocorrência", "Se a reunião não estiver presente, o fluxo registra a situação e verifica a regra de criação."],
  ["03", "Criação controlada", "A solução pode criar a reunião prevista, mas sem sobrescrever ajustes manuais."],
  ["04", "Registro de ocorrências", "Duplicidade, cancelamento e conflito são armazenados para acompanhamento."],
  ["05", "Notificação", "O responsável recebe a informação quando a decisão exige análise humana."],
];

const occurrenceRows = [
  ["Reunião ausente", "Reunião A", "Identificada"],
  ["Conflito", "Reunião B", "Notificado"],
  ["Duplicidade", "Reunião C", "Em análise"],
  ["Cancelamento", "Reunião D", "Registrado"],
];

const futureFlow = [
  "Reunião Teams",
  "Transcrição",
  "IA",
  "Ata",
  "Decisões",
  "Riscos",
  "Ações",
  "Planner",
  "Indicadores",
];

const capabilityTags = ["Microsoft Teams", "Power Automate", "SharePoint", "Microsoft 365", "Outlook", "Power BI", "Governança", "Automação"];

function SectionHeading({ number, eyebrow, title, id }) {
  return (
    <div className={styles.sectionHeading}>
      <span className={styles.sectionNumber}>{number}</span>
      <div className={styles.sectionTitle}>
        <p>{eyebrow}</p>
        <h2 id={id}>{title}</h2>
      </div>
    </div>
  );
}

function Flow({ label, items, accent = false }) {
  return (
    <div className={`${styles.flowBlock} ${accent ? styles.accentFlow : ""}`}>
      <p>{label}</p>
      <ol>
        {items.map((item, index) => (
          <li key={item}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item}</strong>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function GovernancaTeamsCase() {
  return (
    <div className={styles.page} id="top">
      <header className={styles.header}>
        <Link className={styles.brand} href="/#projetos" aria-label="Voltar ao início"><span>C</span> bycauazin</Link>
        <Link className={styles.backLink} href="/projetos">← Todos os projetos</Link>
      </header>

      <main>
        <section className={styles.hero} aria-labelledby="case-title">
          <div className={styles.heroMeta}>
            <p>Governança corporativa · Automação</p>
            <span className={styles.statusBadge}>Em desenvolvimento</span>
          </div>

          <div className={styles.heroGrid}>
            <div>
              <h1 id="case-title">Fluxo de Governança Teams</h1>
              <p className={styles.heroSummary}>
                Automação para controle de reuniões corporativas, periodicidade, participantes, pautas e ocorrências utilizando Microsoft Teams, Power Automate e SharePoint.
              </p>
            </div>

            <aside className={styles.heroAside}>
              <div className={styles.architectureMini} aria-label="Arquitetura conceitual do projeto">
                <span>Mapa de governança</span>
                <span className={styles.arrow}>↓</span>
                <span>SharePoint</span>
                <span className={styles.arrow}>↓</span>
                <span>Power Automate</span>
                <span className={styles.arrow}>↓</span>
                <span>Microsoft Teams</span>
              </div>
              <small>Representação conceitual criada para demonstrar a arquitetura em desenvolvimento.</small>
            </aside>
          </div>

          <div className={styles.tags} aria-label="Tecnologias do projeto">
            {capabilityTags.map((tag) => (
              <span key={tag}><b aria-hidden="true">◆</b>{tag}</span>
            ))}
          </div>
        </section>

        <LeadQuote text="Uma estrutura criada para transformar o mapa de reuniões corporativas em um processo automatizado de acompanhamento e governança, sem remover a decisão humana do centro do processo." />

        <ImpactCards cards={[
          { title: "Problema", text: "As reuniões recorrentes dependiam de verificações manuais e de um mapa de governança que não era facilmente operado pelas automações." },
          { title: "Solução", text: "Estruturei listas no SharePoint e automatizei verificações, ocorrências e notificações para melhorar o acompanhamento." },
          { title: "Impacto", text: "A governança ficou mais organizada, com maior visibilidade sobre ausência, duplicidade, cancelamento e divergência." },
        ]} />

        <BeforeAfter
          before={["Mapa em planilha", "Verificação manual", "Calendário", "Análise de divergência", "Ajuste humano"]}
          after={["Mapa de governança", "SharePoint + automação", "Calendário e Teams", "Ocorrências registradas", "Responsável recebe a decisão"]}
        />

        <FlowDiagram steps={[
          { label: "Governança", text: "A regra de reunião é definida no mapa." },
          { label: "SharePoint", text: "As listas centralizam a estrutura operacional." },
          { label: "Power Automate", text: "Valida o calendário e as regras da reunião." },
          { label: "Teams", text: "A reunião é acompanhada e gerida no ambiente corporativo." },
          { label: "Ocorrências", text: "Irregularidades são registradas para análise." },
        ]} />

        <RoadmapStatus items={[
          { label: "Validado no piloto", variant: "done", items: ["Estrutura das listas", "Consulta ao calendário", "Criação controlada", "Prevenção de duplicidade"] },
          { label: "Em desenvolvimento", variant: "progress", items: ["Recorrências", "Cancelamentos", "Exceções", "Auditoria"] },
          { label: "Próximas etapas", variant: "planned", items: ["Transcrição", "Atas", "Ações", "Power BI", "Planner"] },
        ]} />

        <nav className={styles.caseNav} aria-label="Etapas do estudo de caso">
          {[
            ["01", "Contexto", "context-title"],
            ["02", "Problema", "problem-title"],
            ["03", "Objetivo", "objective-title"],
            ["04", "Arquitetura", "architecture-title"],
            ["05", "Fluxo GOV-01", "flow-title"],
            ["06", "Situação atual", "status-title"],
            ["07", "Aprendizado", "learning-title"],
          ].map(([number, label, target]) => (
            <a href={`#${target}`} key={number}><span>{number}</span><strong>{label}</strong><b aria-hidden="true">↓</b></a>
          ))}
        </nav>

        <section className={styles.section} aria-labelledby="context-title">
          <SectionHeading number="01" eyebrow="Contexto" title="Mapa de governança e reuniões recorrentes" id="context-title" />
          <div className={styles.problemGrid}>
            <div className={styles.mainCopy}>
              <p>O mapa de governança define reuniões corporativas recorrentes, com informações como nome, coordenação, agendamento, intermediador, participantes, nível de governança, pauta, periodicidade e responsável.</p>
              <p>As reuniões poderiam acontecer semanalmente, quinzenalmente, mensalmente ou em outras recorrências específicas. O desafio era verificar se elas estavam sendo realizadas conforme a regra de governança definida pela organização.</p>
            </div>
            <div className={styles.fact}>
              <strong>Processo</strong>
              <span>o acompanhamento dependia de verificações manuais e controles espalhados por planilha e calendário</span>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="problem-title">
          <SectionHeading number="02" eyebrow="Problema" title="Verificação manual e risco de inconsistência" id="problem-title" />
          <div className={styles.problemGrid}>
            <div className={styles.mainCopy}>
              <p>O processo de governança exigia confirmar se a reunião existia no calendário, se estava agendada no período correto, se havia duplicidade, se foi cancelada, se os participantes obrigatórios estavam presentes e se havia link do Teams disponível.</p>
              <p>Além disso, o mapa de governança estava originalmente estruturado em planilha. A ideia era transformar esse conjunto em uma base operacional mais robusta para uso por automações e governança.</p>
            </div>
            <div className={styles.fact}>
              <strong>Risco</strong>
              <span>faltas, duplicidade e inconsistência exigiam checagens recorrentes e pouco escaláveis</span>
            </div>
          </div>

          <Flow label="Antes da arquitetura em desenvolvimento" items={["Mapa de governança em Excel", "Verificação manual", "Calendário", "Análise de divergência", "Ajuste humano"]} />
        </section>

        <section className={styles.section} aria-labelledby="objective-title">
          <SectionHeading number="03" eyebrow="Objetivo" title="Organizar e verificar reuniões sem automatizar decisões humanas" id="objective-title" />
          <div className={styles.problemGrid}>
            <div className={styles.mainCopy}>
              <p>O objetivo era criar uma automação capaz de utilizar o mapa de governança como referência para verificar, organizar e registrar reuniões corporativas. A arquitetura foi pensada para combinar governança operacional com o uso do calendário e do Microsoft Teams.</p>
              <p>Uma regra central do projeto é que a automação não deve alterar reuniões existentes automaticamente. Quando houver divergência, o fluxo identifica, registra e notifica o responsável para que a decisão seja feita pela área adequada.</p>
            </div>
            <div className={styles.fact}>
              <strong>Regra principal</strong>
              <span>verificar + registrar + notificar, em vez de sobrescrever automaticamente</span>
            </div>
          </div>

          <div className={styles.statusGrid}>
            <div className={styles.statusCard}>
              <span>Não altera automaticamente</span>
              <strong>reuniões existentes</strong>
            </div>
            <div className={styles.statusCard}>
              <span>Pode</span>
              <strong>criar reunião ausente</strong>
            </div>
            <div className={styles.statusCard}>
              <span>Pode</span>
              <strong>registrar ocorrência</strong>
            </div>
            <div className={styles.statusCard}>
              <span>Obrigatório</span>
              <strong>notificar responsável</strong>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="architecture-title">
          <SectionHeading number="04" eyebrow="Arquitetura atual" title="Mapeamento de dados e automação de governança" id="architecture-title" />
          <div className={styles.problemGrid}>
            <div className={styles.mainCopy}>
              <p>O projeto começou com um mapa de governança em Excel e evoluiu para estruturas em listas do SharePoint. A partir dessa base, o Power Automate passou a avaliar o calendário do Microsoft 365 e o Microsoft Teams para verificar se a governança estava sendo atendida.</p>
            </div>
            <div className={styles.fact}>
              <strong>Conta de serviço</strong>
              <span>utilizada para centralizar a operação e manter a execução das automações em contexto de governança</span>
            </div>
          </div>

          <div className={styles.architectureBlock} aria-label="Arquitetura atual do fluxo de governança">
            <div className={styles.architectureNode}>Mapa de Governança</div>
            <div className={styles.connector} aria-hidden="true">↓</div>
            <div className={styles.architectureNode}>SharePoint</div>
            <div className={styles.connector} aria-hidden="true">↓</div>
            <div className={styles.architectureNode}>Power Automate — GOV-01</div>
            <div className={styles.connector} aria-hidden="true">↓</div>
            <div className={styles.architectureNode}>Calendário Microsoft 365</div>
            <div className={styles.connector} aria-hidden="true">↓</div>
            <div className={styles.architectureNode}>Microsoft Teams</div>
            <div className={styles.connector} aria-hidden="true">↓</div>
            <div className={styles.architectureNode}>GOV_Ocorrencias</div>
            <div className={styles.connector} aria-hidden="true">↓</div>
            <div className={styles.architectureNode}>E-mail / Notificação</div>
          </div>

          <div className={styles.architectureSummary}>
            <div>
              <p className={styles.kicker}>Estrutura de dados</p>
              <p>As listas do SharePoint passam a ser a base para manutenção, validação e disparo das regras de governança.</p>
            </div>
            <div>
              <p className={styles.kicker}>Regras operacionais</p>
              <p>Nem toda divergência deve ser corrigida automaticamente; o fluxo identifica, registra e notifica o responsável.</p>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="lists-title">
          <SectionHeading number="05" eyebrow="Estrutura SharePoint" title="Listas envolvidas na governança" id="lists-title" />
          <div className={styles.listGrid}>
            {listStructure.map((list) => (
              <article key={list.name} className={styles.listCard}>
                <span>{list.name}</span>
                <p>{list.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="flow-title">
          <SectionHeading number="06" eyebrow="Fluxo GOV-01" title="Piloto validado e evolução em andamento" id="flow-title" />
          <Flow label="Representação do fluxo principal da automação" items={governanceFlow} accent />

          <ol className={styles.operationGrid} aria-label="Etapas do fluxo principal">
            {automationSequence.map(([number, title, description]) => (
              <li key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section} aria-labelledby="status-title">
          <SectionHeading number="07" eyebrow="Situação atual" title="Validado, em desenvolvimento e planejado" id="status-title" />
          <div className={styles.statusGrid}>
            {statusStages.map((stage) => (
              <article key={stage.label} className={`${styles.statusCard} ${styles[stage.variant]}`}>
                <span>{stage.label}</span>
                <ul>
                  {stage.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="occurrence-title">
          <SectionHeading number="08" eyebrow="Ocorrências" title="Registro de irregularidades identificadas" id="occurrence-title" />
          <div className={styles.tableWrap}>
            <table className={styles.simpleTable}>
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Reunião</th>
                  <th>Situação</th>
                </tr>
              </thead>
              <tbody>
                {occurrenceRows.map(([type, meeting, status]) => (
                  <tr key={`${type}-${meeting}`}>
                    <td>{type}</td>
                    <td>{meeting}</td>
                    <td>{status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="challenge-title">
          <SectionHeading number="09" eyebrow="Desafios técnicos" title="Recorrência, calendário e governança" id="challenge-title" />
          <div className={styles.problemGrid}>
            <div className={styles.mainCopy}>
              <p>Reuniões semanais, quinzenais e mensais têm comportamentos diferentes. O fluxo precisou considerar janelas de datas, cálculo de recorrência e identificação da reunião correspondente sem criar duplicidade.</p>
              <p>Outro ponto importante foi respeitar o calendário real. A automação não poderia reconstruir reuniões apenas a partir do mapa de governança sem considerar ajustes legítimos feitos por pessoas.</p>
            </div>
            <div className={styles.fact}>
              <strong>Princípio</strong>
              <span>verificar, registrar e notificar, em vez de sobrescrever automaticamente</span>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="future-title">
          <SectionHeading number="10" eyebrow="Visão futura" title="Evolução planejada da governança" id="future-title" />
          <div className={styles.futureFlow} aria-label="Arquitetura planejada">
            {futureFlow.map((item, index) => (
              <div key={item} className={styles.futureNode}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
          <p className={styles.technicalNote}>Arquitetura planejada — funcionalidades ainda em desenvolvimento ou estudo, sem indicar que já estão entregues.</p>
        </section>

        <section className={styles.section} aria-labelledby="role-title">
          <SectionHeading number="11" eyebrow="Minha participação" title="Desenvolvimento técnico e evolução da solução" id="role-title" />
          <div className={styles.problemGrid}>
            <div className={styles.mainCopy}>
              <p>Fui responsável pela análise do processo, modelagem da estrutura no SharePoint, criação das listas, definição das regras de governança, desenvolvimento no Power Automate, consultas ao calendário e validação da operação.</p>
              <p>Também acompanhei a investigação de erros, a prevenção de duplicidade e a evolução da solução para respeitar regras humanas e manter o processo governável.</p>
            </div>
            <div className={styles.fact}>
              <strong>Foco</strong>
              <span>desenvolver arquitetura, regras e automatização sem perder o contexto de governança</span>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="result-title">
          <SectionHeading number="12" eyebrow="Resultado atual" title="Estrutura real em desenvolvimento" id="result-title" />
          <div className={styles.problemGrid}>
            <div className={styles.mainCopy}>
              <p>O projeto já apresenta uma base operacional estruturada em listas, automatização de verificações, criação controlada de reuniões ausentes e centralização de ocorrências em um fluxo mais organizado.</p>
              <p>O que existe hoje é uma base funcional em ambiente de testes e evolução. A arquitetura já oferece um caminho sólido para a próxima etapa de governança mais robusta e integrada.</p>
            </div>
            <div className={styles.fact}>
              <strong>Estado atual</strong>
              <span>solução em desenvolvimento, validada em parte e com evolução contínua</span>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="learning-title">
          <SectionHeading number="13" eyebrow="Aprendizado" title="Automação de governança exige regras claras" id="learning-title" />
          <div className={styles.problemGrid}>
            <div className={styles.mainCopy}>
              <p>Esse projeto reforçou que automação de governança não significa automatizar todas as decisões. Parte importante da arquitetura foi definir quais ações podem ser executadas automaticamente e quais devem permanecer sob responsabilidade das pessoas envolvidas.</p>
              <p>Os principais aprendizados foram recorrência, regras de negócio, modelagem de exceções, uso do Power Automate, integração com calendário e manutenção de uma base confiável no SharePoint.</p>
            </div>
            <div className={styles.fact}>
              <strong>Aprendizado central</strong>
              <span>a governança é mais forte quando a automação define limites e respeita a decisão humana</span>
            </div>
          </div>
        </section>
      </main>

      <CaseFloatingActions sections={[
        { href: "#context-title", label: "Contexto" }, { href: "#problem-title", label: "Problema" },
        { href: "#objective-title", label: "Objetivo" }, { href: "#architecture-title", label: "Arquitetura" },
        { href: "#lists-title", label: "Estrutura SharePoint" }, { href: "#flow-title", label: "Fluxo GOV-01" },
        { href: "#status-title", label: "Situação atual" }, { href: "#occurrence-title", label: "Ocorrências" },
        { href: "#challenge-title", label: "Desafios técnicos" }, { href: "#future-title", label: "Visão futura" },
        { href: "#role-title", label: "Participação" }, { href: "#result-title", label: "Resultado atual" },
        { href: "#learning-title", label: "Aprendizado" },
      ]} />
      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Cauã · bycauazin</span>
        <Link href="/projetos">Voltar aos projetos ↑</Link>
      </footer>
    </div>
  );
}
