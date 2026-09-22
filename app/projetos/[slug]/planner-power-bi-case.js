import Link from "next/link";
import { BeforeAfter, FlowDiagram, ImpactCards, LeadQuote } from "./case-shared";
import styles from "./planner-power-bi-case.module.css";

const oldProcess = [
  "Planner com tarefas e prazos",
  "Atualização manual de planilha",
  "Planilha funcionando como origem do dashboard",
  "Dados potenciamente desatualizados",
  "Dependência constante de manutenção humana",
];

const goalFlow = [
  "Planner como fonte operacional",
  "Coleta automática via Microsoft Graph",
  "Power Automate organiza e orquestra o fluxo",
  "JSON estruturado no SharePoint",
  "Power BI consome a base e atualiza o dashboard",
];

const automationSequence = [
  ["01", "Fluxo diário", "O processo é iniciado automaticamente pela manhã e acessa os dados do ambiente Microsoft."],
  ["02", "Grupos e planos", "São consultados os grupos e os planos relacionados às tarefas da operação."],
  ["03", "Buckets e tarefas", "Os buckets e as tarefas são coletados para reconstruir o contexto de trabalho."],
  ["04", "Usuários e responsáveis", "As informações de usuários e responsáveis são relacionadas às tarefas."],
  ["05", "Estruturação", "Dados como status, prazos, atraso, responsável e plano são organizados em um formato consistente."],
  ["06", "JSON e SharePoint", "Os arquivos JSON são gerados e armazenados em uma pasta do SharePoint para uso posterior."],
  ["07", "Consumo no Power BI", "O dashboard passa a utilizar essa base como fonte para os indicadores gerenciais."],
];

const dashboardCards = [
  { label: "Total de tarefas", value: "1.248" },
  { label: "Concluídas", value: "873" },
  { label: "Em andamento", value: "96" },
  { label: "Atrasadas", value: "54" },
  { label: "Sem prazo", value: "31" },
];

const taskRows = [
  ["Revisar documentação", "Desenvolvimento", "João Silva", "Em andamento", "22/09"],
  ["Atualizar backlog", "Produto", "Maria Santos", "Não iniciada", "25/09"],
  ["Preparar relatório", "Operações", "Pedro Costa", "Concluída", "18/09"],
  ["Validar processo", "Marketing", "Ana Moreira", "Atrasada", "20/09"],
];

const capabilityTags = ["Microsoft Planner", "Microsoft Graph", "Power Automate", "SharePoint", "Power BI", "JSON", "Automação", "Integração de dados"];

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

export default function PlannerPowerBICase() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/#projetos" aria-label="Voltar ao início"><span>C</span> bycauazin</Link>
        <Link className={styles.backLink} href="/projetos">← Todos os projetos</Link>
      </header>

      <main>
        <section className={styles.hero} aria-labelledby="case-title">
          <div className={styles.heroMeta}>
            <p>Automação · Integração de dados</p>
            <span>Estudo de caso</span>
          </div>

          <div className={styles.heroGrid}>
            <div>
              <h1 id="case-title">Automação de dados do Planner para Power BI</h1>
              <p className={styles.heroSummary}>
                Integração com Microsoft Graph, Power Automate e SharePoint para automatizar a coleta de tarefas e alimentar dashboards gerenciais.
              </p>
            </div>

            <aside className={styles.heroAside}>
              <div className={styles.architectureMini} aria-label="Arquitetura conceitual do projeto">
                <span>Planner</span>
                <span className={styles.arrow}>↓</span>
                <span>Microsoft Graph</span>
                <span className={styles.arrow}>↓</span>
                <span>Power Automate</span>
                <span className={styles.arrow}>↓</span>
                <span>SharePoint</span>
              </div>
              <small>Representação visual criada para demonstrar o funcionamento da solução.</small>
            </aside>
          </div>

          <div className={styles.tags} aria-label="Tecnologias do projeto">
            {capabilityTags.map((tag) => (
              <span key={tag}><b aria-hidden="true">◆</b>{tag}</span>
            ))}
          </div>
        </section>

        <LeadQuote text="O dashboard deixou de depender de uma planilha atualizada manualmente e passou a receber os dados automaticamente, mantendo o acompanhamento mais confiável." />

        <ImpactCards cards={[
          { title: "Problema", text: "Tarefas registradas no Planner precisavam ser copiadas manualmente para uma planilha usada como base do dashboard." },
          { title: "Solução", text: "Desenvolvi uma automação para consultar os dados do ambiente Microsoft e organizar a base para o painel." },
          { title: "Impacto", text: "O acompanhamento deixou de depender de atualização manual e passou a refletir melhor a realidade operacional." },
        ]} />

        <BeforeAfter
          before={["Planner", "Pessoa atualiza planilha", "Power BI", "Dados dependem de revisão manual"]}
          after={["Planner", "Automação coleta dados", "Base estruturada", "Power BI com visão atualizada"]}
        />

        <FlowDiagram steps={[
          { label: "Planner", text: "Fonte operacional das tarefas." },
          { label: "Microsoft Graph", text: "Consulta os dados no ambiente Microsoft." },
          { label: "Power Automate", text: "Executa a automação e organiza o processo." },
          { label: "SharePoint", text: "Armazena a base estruturada para uso posterior." },
          { label: "Power BI", text: "Transforma os dados em indicadores e visão gerencial." },
        ]} />

        <nav className={styles.caseNav} aria-label="Etapas do estudo de caso">
          {[
            ["01", "Contexto", "context-title"],
            ["02", "Problema", "problem-title"],
            ["03", "Primeira abordagem", "approach-title"],
            ["04", "Arquitetura", "architecture-title"],
            ["05", "Fluxo", "flow-title"],
            ["06", "Dashboard", "dashboard-title"],
            ["07", "Resultado", "result-title"],
          ].map(([number, label, target]) => (
            <a href={`#${target}`} key={number}><span>{number}</span><strong>{label}</strong><b aria-hidden="true">↓</b></a>
          ))}
        </nav>

        <section className={styles.section} aria-labelledby="context-title">
          <SectionHeading number="01" eyebrow="Contexto" title="Dados operacionais e acompanhamento gerencial" id="context-title" />
          <div className={styles.problemGrid}>
            <div className={styles.mainCopy}>
              <p>As equipes utilizavam o Microsoft Planner para registrar e acompanhar tarefas, prazos, responsáveis e status das atividades diárias. Os coordenadores e gestores precisavam seguir essa situação para identificar atrasos, ajuste de capacidade e acompanhamento por setor.</p>
              <p>Já existia um dashboard no Power BI para apoiar essa gestão. O desafio era entregar para o painel a informação correta e atualizada sem depender de trabalho manual repetitivo.</p>
            </div>
            <div className={styles.fact}>
              <strong>Manual</strong>
              <span>o dashboard dependia da atualização de uma planilha para refletir o que era registrado no Planner</span>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="problem-title">
          <SectionHeading number="02" eyebrow="O problema" title="Planner → atualização manual → planilha → Power BI" id="problem-title" />
          <div className={styles.problemGrid}>
            <div className={styles.mainCopy}>
              <p>Antes da automação, as tarefas eram registradas no Microsoft Planner e, em paralelo, precisavam ser copiadas manualmente para uma planilha. Essa planilha servia como fonte de dados para o dashboard no Power BI.</p>
              <p>Esse processo gerava trabalho operacional recorrente e criava risco de inconsistência, porque a base do painel podia ficar diferente da realidade do Planner. Podia haver tarefas ainda não registradas, informações desatualizadas e alterações que ainda não haviam sido reflejadas na planilha.</p>
            </div>
            <div className={styles.fact}>
              <strong>Risco</strong>
              <span>informações do dashboard dependiam de revisão manual e, portanto, podia haver atraso ou inconsistência operacional</span>
            </div>
          </div>

          <div className={styles.processBlock} aria-label="Representação do processo anterior com dados fictícios">
            <div className={styles.processNode}>Microsoft Planner</div>
            <div className={styles.processArrow} aria-hidden="true">↓</div>
            <div className={styles.processNode}>Atualização manual</div>
            <div className={styles.processArrow} aria-hidden="true">↓</div>
            <div className={styles.processNode}>Planilha</div>
            <div className={styles.processArrow} aria-hidden="true">↓</div>
            <div className={styles.processNode}>Power BI</div>
          </div>

          <div className={styles.inlineNotes}>
            <span>Trabalho repetitivo</span>
            <span>Dependência de atualização humana</span>
            <span>Risco de informações desatualizadas</span>
          </div>

          <Flow label="Processo anterior" items={oldProcess} />
        </section>

        <section className={styles.section} aria-labelledby="approach-title">
          <SectionHeading number="03" eyebrow="Primeira abordagem" title="Quando a primeira solução não funciona em produção" id="approach-title" />
          <div className={styles.solutionIntro}>
            <p>Inicialmente, tentei consumir os dados diretamente pelo Power BI. Essa abordagem funcionou durante o desenvolvimento e permitiu validar a lógica de extração e visualização.</p>
            <p>Entretanto, quando a solução precisava operar em ambiente online e com atualização recorrente, essa primeira arquitetura apresentou uma limitação importante para a necessidade de atualização automática do dashboard no Power BI Online.</p>
            <div className={styles.noteBox}>
              <strong>Limitação encontrada</strong>
              <p>O problema não era a visualização em si, mas a capacidade da solução de continuar atualizando a base automaticamente em produção, sem depender de manutenção manual ou de uma estrutura que não atendia ao requisito operacional.</p>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="architecture-title">
          <SectionHeading number="04" eyebrow="Arquitetura final" title="Da consulta direta para uma arquitetura automatizada" id="architecture-title" />
          <div className={styles.solutionIntro}>
            <p>Foi necessário revisar a solução e reorganizar a arquitetura. Em vez de depender apenas do Power BI para consultar a origem de dados, passei a usar o Microsoft Graph para acessar as informações, o Power Automate para automatizar o fluxo e o SharePoint como camada de armazenamento em nuvem.</p>
          </div>

          <div className={styles.architectureBlock} aria-label="Arquitetura final da integração com Microsoft Graph, Power Automate, SharePoint e Power BI">
            <div className={styles.architectureNode}>Microsoft Planner / Microsoft 365</div>
            <div className={styles.connector} aria-hidden="true">↓</div>
            <div className={styles.architectureNode}>Microsoft Graph</div>
            <div className={styles.connector} aria-hidden="true">↓</div>
            <div className={styles.architectureNode}>Power Automate</div>
            <div className={styles.connector} aria-hidden="true">↓</div>
            <div className={styles.architectureNode}>SharePoint</div>
            <div className={styles.architectureNodeSmall}>Arquivos JSON</div>
            <div className={styles.connector} aria-hidden="true">↓</div>
            <div className={styles.architectureNode}>Power BI</div>
            <div className={styles.connector} aria-hidden="true">↓</div>
            <div className={styles.architectureNode}>Dashboard</div>
          </div>

          <div className={styles.architectureSummary}>
            <div>
              <p className={styles.kicker}>Microsoft Graph</p>
              <p>Servia para obter as informações do ambiente Microsoft 365 e do Planner, permitindo que o fluxo consultasse os dados necessários para a análise operacional.</p>
            </div>
            <div>
              <p className={styles.kicker}>SharePoint + JSON</p>
              <p>Funcionava como camada intermediária de armazenamento em nuvem, desacoplando a coleta da visualização e tornando a estrutura mais adequada para atualização recorrente no Power BI.</p>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="flow-title">
          <SectionHeading number="05" eyebrow="Como a automação funciona" title="Fluxo técnico e estrutura de dados" id="flow-title" />
          <Flow label="Representação simplificada do fluxo de automação" items={goalFlow} accent />

          <ol className={styles.operationGrid} aria-label="Etapas do processo automatizado">
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

        <section className={styles.section} aria-labelledby="dashboard-title">
          <SectionHeading number="06" eyebrow="Dashboard" title="Acompanhamento por setor e por colaborador" id="dashboard-title" />

          <div className={styles.dashboardIntro}>
            <p>O dashboard já existia como referência operacional e passou a utilizar os dados coletados automaticamente como base para o acompanhamento gerencial. A visão geral ajudava a monitorar o estado das tarefas por setor, enquanto a visão individual permitia acompanhar a rotina de cada responsável.</p>
          </div>

          <div className={styles.dashboardMockup} aria-label="Representação demonstrativa com dados fictícios, criada para ilustrar as funcionalidades do dashboard original">
            <div className={styles.mockHeader}>
              <span>Acompanhamento de tarefas</span>
              <small>Representação demonstrativa com dados fictícios, criada para ilustrar as funcionalidades do dashboard original.</small>
            </div>

            <div className={styles.mockFilters}>
              <span>Plano <b>Todos</b></span>
              <span>Responsável <b>Todos</b></span>
              <span>Status <b>Todos</b></span>
              <span>Atrasado <b>Sim / Não</b></span>
            </div>

            <div className={styles.mockStats}>
              {dashboardCards.map((card) => (
                <div className={styles.mockCard} key={card.label}>
                  <small>{card.label}</small>
                  <strong>{card.value}</strong>
                </div>
              ))}
            </div>

            <div className={styles.mockColumns}>
              <div className={styles.mockBarChart} aria-hidden="true">
                <span style={{ height: "44%" }} />
                <span style={{ height: "68%" }} />
                <span style={{ height: "52%" }} />
                <span style={{ height: "86%" }} />
                <span style={{ height: "60%" }} />
              </div>

              <div className={styles.mockList}>
                <div><span>Desenvolvimento</span><strong>142</strong></div>
                <div><span>Comercial</span><strong>98</strong></div>
                <div><span>Operações</span><strong>76</strong></div>
                <div><span>Marketing</span><strong>45</strong></div>
              </div>
            </div>

            <div className={styles.mockPanel}>
              <p>Responsável</p>
              <h3>João Silva</h3>
              <ul>
                <li>Atualizar documentação — Em andamento</li>
                <li>Revisar processo interno — Atrasada</li>
                <li>Organizar backlog — Não iniciada</li>
                <li>Preparar relatório — Concluída</li>
              </ul>
            </div>

            <div className={styles.mockTableWrap}>
              <table>
                <thead>
                  <tr>
                    <th>Tarefa</th>
                    <th>Plano</th>
                    <th>Responsável</th>
                    <th>Status</th>
                    <th>Prazo</th>
                  </tr>
                </thead>
                <tbody>
                  {taskRows.map(([task, plan, responsible, status, date]) => (
                    <tr key={task}>
                      <td>{task}</td>
                      <td>{plan}</td>
                      <td>{responsible}</td>
                      <td>{status}</td>
                      <td>{date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.dashboardSummary}>
            <div>
              <p className={styles.kicker}>Acompanhamento geral</p>
              <p>Permitia observar tarefas em atraso, sem prazo, em andamento e por setor, ajudando coordenadores e gestores a acompanhar o andamento das equipes.</p>
            </div>
            <div>
              <p className={styles.kicker}>Acompanhamento individual</p>
              <p>Havia filtros por colaborador, plano e status, além de indicadores para total de tarefas, concluídas, atrasadas e não iniciadas.</p>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="beforeafter-title">
          <SectionHeading number="07" eyebrow="Antes e depois" title="Do processo manual para a coleta automatizada" id="beforeafter-title" />

          <div className={styles.compareGrid}>
            <div className={styles.comparePanel}>
              <p className={styles.kicker}>Antes</p>
              <div className={styles.compareFlow}>
                <span>Planner</span>
                <span>↓</span>
                <span>Pessoa consulta tarefas</span>
                <span>↓</span>
                <span>Atualiza planilha</span>
                <span>↓</span>
                <span>Power BI</span>
              </div>
              <ul>
                <li>Trabalho repetitivo</li>
                <li>Dependência de atualização humana</li>
                <li>Risco de dados desatualizados</li>
              </ul>
            </div>

            <div className={styles.comparePanel}>
              <p className={styles.kicker}>Depois</p>
              <div className={styles.compareFlow}>
                <span>Planner</span>
                <span>↓</span>
                <span>Microsoft Graph</span>
                <span>↓</span>
                <span>Power Automate</span>
                <span>↓</span>
                <span>JSON no SharePoint</span>
                <span>↓</span>
                <span>Power BI</span>
              </div>
              <ul>
                <li>Coleta automática</li>
                <li>Atualização recorrente</li>
                <li>Menor dependência manual</li>
                <li>Mais confiança nas informações</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="result-title">
          <SectionHeading number="08" eyebrow="Minha participação" title="Arquitetura, automação e preparação dos dados" id="result-title" />
          <div className={styles.mainCopy}>
            <p>Fui responsável pela análise do problema, pela definição da arquitetura, pela primeira tentativa de integração, pela pesquisa da alternativa, pelo desenvolvimento do fluxo no Power Automate, pela integração com Microsoft Graph, pela estruturação do armazenamento no SharePoint e pela preparação dos dados consumidos pelo Power BI.</p>
            <p>Fui responsável principalmente pela engenharia dos dados e pela automação que passou a alimentar o dashboard. A construção visual original do Power BI não foi desenvolvida por mim.</p>
          </div>

          <div className={styles.resultPanel}>
            <div>
              <p className={styles.kicker}>Resultado</p>
              <h3>De atualização manual para coleta automática</h3>
              <p>O dashboard deixou de depender da replicação diária das tarefas em uma planilha e passou a consumir dados coletados automaticamente do ambiente Microsoft. Essa mudança reduziu o esforço operacional e aumentou a confiabilidade das informações apresentadas aos gestores.</p>
            </div>
            <ul>
              <li>Redução significativa do trabalho manual;</li>
              <li>Eliminação da necessidade de atualizar uma planilha diariamente;</li>
              <li>Atualização automática de dados;</li>
              <li>Mais confiança no dashboard;</li>
              <li>Melhor visibilidade de atrasos e tarefas sem prazo.</li>
            </ul>
          </div>
        </section>

        <section className={`${styles.section} ${styles.learningSection}`} aria-labelledby="learning-title">
          <SectionHeading number="09" eyebrow="Aprendizado" title="Uma integração precisa funcionar em produção" id="learning-title" />
          <div className={styles.mainCopy}>
            <p>Esse projeto mostrou que uma integração de dados não termina quando a consulta funciona. Também é necessário considerar como a solução será executada, atualizada e mantida no ambiente de produção.</p>
            <p>A limitação encontrada na primeira abordagem levou à criação de uma nova arquitetura com Microsoft Graph, Power Automate e SharePoint, tornando o processo compatível com a atualização recorrente necessária para o dashboard.</p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="tech-title">
          <SectionHeading number="10" eyebrow="Tecnologias" title="Ferramentas envolvidas no projeto" id="tech-title" />
          <div className={styles.techGrid}>
            <span>Microsoft Planner</span>
            <span>Microsoft Graph</span>
            <span>Power Automate</span>
            <span>SharePoint</span>
            <span>Power BI</span>
            <span>JSON</span>
            <span>Automação</span>
            <span>Integração de dados</span>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Cauã · bycauazin</span>
        <Link href="/projetos">Ver todos os projetos ↑</Link>
      </footer>
    </div>
  );
}
