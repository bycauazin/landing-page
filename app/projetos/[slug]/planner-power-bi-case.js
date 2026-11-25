import Link from "next/link";
import CaseGallery from "./case-gallery";
import CaseHeader from "./case-header";
import { Icon, SectionIcon } from "./case-icons";
import { LeadQuote, Pipeline, ReadingGuide } from "./case-shared";
import CaseFloatingActions from "./case-floating-actions";
import styles from "./planner-power-bi-case.module.css";

const oldProcess = [{ icon: "list", label: "Planner com tarefas e prazos" }, { icon: "user", label: "Alguém copia para a planilha" }, { icon: "file", label: "Planilha alimenta o painel" }, { icon: "alert", label: "Dados desatualizados" }];

const solutionFlow = [{ icon: "list", label: "Planner", note: "Onde as tarefas vivem" }, { icon: "plug", label: "Microsoft Graph", note: "Lê planos e tarefas" }, { icon: "flow", label: "Power Automate", note: "Roda todo dia" }, { icon: "folder", label: "SharePoint", note: "Guarda os JSON" }, { icon: "screen", label: "Painel", note: "Mostra os indicadores" }];

// Sete passos: o último (o painel recebendo os dados) ocupa a linha toda, em destaque.
const automationSequence = [
  ["clock", "Todo dia, pela manhã", "O fluxo começa sozinho e acessa o ambiente Microsoft."],
  ["users", "Grupos e planos", "Busca os planos ligados às tarefas da operação."],
  ["list", "Buckets e tarefas", "Coleta as tarefas e o contexto de cada uma."],
  ["user", "Responsáveis", "Liga cada tarefa às pessoas responsáveis."],
  ["layers", "Organização", "Status, prazo, atraso e plano no mesmo formato."],
  ["folder", "JSON no SharePoint", "Os arquivos ficam numa pasta, prontos para o painel."],
  ["chart", "O painel atualizado", "Os indicadores leem essa base e se atualizam sem ninguém copiar nada."],
];

// Telas da demonstração do painel (dados fictícios gerados no navegador).
const dashboardScreens = [
  { src: "/project-images/planner/conformidade-graficos.jpg", label: "Conformidade", icon: "chart", caption: "Tarefas sem prazo, sem responsável e em atraso, por plano e por pessoa." },
  { src: "/project-images/planner/conformidade-lista.jpg", label: "Listagens", icon: "list", caption: "A lista de cada problema, com filtros e busca pelo nome da tarefa." },
  { src: "/project-images/planner/acompanhamento-individual.jpg", label: "Individual", icon: "user", caption: "O andamento de cada pessoa: não iniciadas, em andamento, concluídas e atrasos." },
];

const capabilityTags = ["Microsoft Planner", "Microsoft Graph", "Power Automate", "SharePoint", "JSON", "HTML/CSS/JavaScript", "Dashboard web"];

function SectionHeading({ eyebrow, title, id }) {
  return (
    <div className={styles.sectionHeading}>
      <span className={styles.sectionNumber}><SectionIcon label={eyebrow} /></span>
      <div className={styles.sectionTitle}>
        <p>{eyebrow}</p>
        <h2 id={id}>{title}</h2>
      </div>
    </div>
  );
}

export default function PlannerPowerBICase() {
  return (
    <div className={styles.page} id="top">
      <CaseHeader styles={styles} />

      <main>
        <section className={styles.hero} aria-labelledby="case-title">
          <div className={styles.heroMeta}>
            <p>Automação · Dados · Dashboard</p>
            <span>Estudo de caso</span>
          </div>

          <div className={styles.heroGrid}>
            <div>
              <h1 id="case-title">Automação de dados do Planner para Power BI</h1>
              <p className={styles.heroSummary}>
                As tarefas do Planner chegam sozinhas a um painel de gestão. Primeiro a coleta automática; depois, o próprio painel, que migrei do Power BI para uma página web.
              </p>
            </div>

            <aside className={styles.heroAside}>
              <Pipeline vertical label="Como os dados chegam ao painel" steps={[{ icon: "list", label: "Planner" }, { icon: "flow", label: "Power Automate" }, { icon: "folder", label: "SharePoint" }, { icon: "screen", label: "Painel web" }]} />
            </aside>
          </div>

          <div className={styles.tags} aria-label="Tecnologias do projeto">
            {capabilityTags.map((tag) => (
              <span key={tag}><b aria-hidden="true">◆</b>{tag}</span>
            ))}
          </div>
        </section>

        <ReadingGuide
          className={styles.section}
          highlight={{ icon: "refresh", value: "Zero", text: "planilhas atualizadas à mão: o painel recebe os dados sozinho", href: "#result-title" }}
          minutes={4}
          plain={["Os gestores acompanhavam as tarefas das equipes num painel, mas alguém precisava copiar os dados do Planner para uma planilha antes. Se esquecesse, o painel mostrava informação velha.", "Montei uma automação que busca as tarefas sozinha. Depois, refiz o próprio painel como uma página web, com filtros, listas de pendências e o andamento de cada pessoa."]}
          plainLink={{ label: "Ver o painel", href: "#dashboard-title" }}
          technical={["Power Automate + Microsoft Graph lendo planos, buckets e tarefas", "JSON numa biblioteca do SharePoint como camada intermediária", "Painel migrado do Power BI para HTML/CSS/JavaScript, embutido num site por iframe", "A primeira versão (consulta direta) não se sustentou em produção"]}
          technicalLink={{ label: "Ir para a solução", href: "#architecture-title" }}
        />

        <LeadQuote text="O painel deixou de depender de uma planilha atualizada à mão: os dados chegam sozinhos, e o painel virou uma página que cabe no site da empresa." />

        <nav className={styles.caseNav} aria-label="Etapas do estudo de caso">
          {[
            ["Problema", "problem-title"],
            ["Primeira abordagem", "approach-title"],
            ["Solução", "architecture-title"],
            ["Painel", "dashboard-title"],
            ["Resultado", "result-title"],
          ].map(([label, target]) => (
            <a href={`#${target}`} key={target}><span><Icon label={label} /></span><strong>{label}</strong><b aria-hidden="true"><Icon name="down" /></b></a>
          ))}
        </nav>

        <section className={styles.section} aria-labelledby="problem-title">
          <SectionHeading eyebrow="O problema" title="Uma planilha no meio do caminho" id="problem-title" />
          <div className={styles.mainCopy}>
            <p>As equipes registravam tarefas, prazos e responsáveis no Microsoft Planner, e os gestores acompanhavam tudo num painel. Só que o painel lia uma planilha, e essa planilha era preenchida à mão a partir do Planner.</p>
            <p>Resultado: trabalho repetido todo dia e um painel que podia não bater com a realidade, com tarefas faltando ou status antigos.</p>
          </div>
          <Flow label="Como era" items={oldProcess} />
        </section>

        <section className={styles.section} aria-labelledby="approach-title">
          <SectionHeading eyebrow="Primeira abordagem" title="Quando a primeira solução não funciona em produção" id="approach-title" />
          <div className={styles.solutionIntro}>
            <p>A primeira ideia foi o Power BI consultar os dados direto. Funcionou no desenvolvimento, mas não conseguia se atualizar sozinho no Power BI Online, que era justamente o que se precisava.</p>
            <div className={styles.noteBox}>
              <strong>A lição</strong>
              <p>Uma integração não termina quando a consulta funciona: ela precisa continuar rodando em produção sem ninguém mexer.</p>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="architecture-title">
          <SectionHeading eyebrow="A solução" title="Uma coleta que roda sozinha todo dia" id="architecture-title" />
          <div className={styles.solutionIntro}>
            <p>Reorganizei a arquitetura: o Power Automate usa o Microsoft Graph para ler o Planner e guarda o resultado em arquivos JSON no SharePoint. O painel lê esses arquivos, e coleta e visualização ficam separadas.</p>
          </div>
          <Flow label="Como ficou" items={solutionFlow} accent />
          <ol className={styles.operationGrid} aria-label="Etapas do processo automatizado">
            {automationSequence.map(([icon, title, description]) => (
              <li key={title}>
                <span><Icon name={icon} /></span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section} aria-labelledby="dashboard-title">
          <SectionHeading eyebrow="O painel" title="Do Power BI para uma página web" id="dashboard-title" />
          <div className={styles.mainCopy}>
            <p>O painel original era em Power BI, feito por uma colega. Depois precisei levá-lo para dentro do site da empresa: migrei para uma página web (HTML, CSS e JavaScript) embutida por iframe e redesenhei as telas.</p>
            <p>São duas visões. Em <strong>Conformidade</strong>, o que precisa de atenção: tarefas sem prazo, sem responsável e em atraso. Em <strong>Individual</strong>, o andamento de cada pessoa. Clicar num indicador ou numa barra filtra o painel inteiro.</p>
          </div>
          <div className={styles.galleryBlock}>
            <CaseGallery screens={dashboardScreens} host="Gestão de Tarefas" />
            <p className={styles.galleryNote}>Telas da versão de demonstração, com dados fictícios gerados no navegador.</p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="result-title">
          <SectionHeading eyebrow="Resultado" title="Dados que chegam sozinhos, num painel que dá para usar" id="result-title" />
          <div className={styles.resultPanel}>
            <div>
              <p className={styles.kicker}>O que mudou</p>
              <h3>De planilha copiada à mão para coleta automática</h3>
              <p>Ninguém mais copia tarefas para planilha. O painel mostra o que está no Planner, e os gestores enxergam atrasos e pendências na hora.</p>
            </div>
            <ul>
              <li>Fim da planilha atualizada à mão</li>
              <li>Dados atualizados todo dia, sozinhos</li>
              <li>Painel web dentro do site da empresa</li>
            </ul>
          </div>
          <ul className={styles.roleLine}>
            <li><Icon name="user" /><span><strong>Minha parte:</strong> a arquitetura, a automação e o painel web, da migração ao design.</span></li>
          </ul>
        </section>
      </main>

      <CaseFloatingActions sections={[
        { href: "#problem-title", label: "Problema" }, { href: "#approach-title", label: "Primeira abordagem" },
        { href: "#architecture-title", label: "Solução" }, { href: "#dashboard-title", label: "Painel" },
        { href: "#result-title", label: "Resultado" },
      ]} />
      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Cauã · bycauazin</span>
        <Link href="/projetos">Ver todos os projetos</Link>
      </footer>
    </div>
  );
}

function Flow({ label, items, accent = false }) {
  return <div className={styles.pipelineBlock}><p>{label}</p><Pipeline steps={items} muted={!accent} /></div>;
}
