import Image from "next/image";
import Link from "next/link";
import { BeforeAfter, FlowDiagram, ImpactCards, LeadQuote } from "./case-shared";
import styles from "./course-access-case.module.css";

const manualFlow = ["Consultar dados", "Identificar cursos", "Criar pasta", "Localizar a base", "Copiar módulos", "Conferir estrutura"];
const automatedFlow = ["Informar os dados", "Validar", "Clicar em Criar", "Estrutura pronta"];
const operationSteps = [
  ["01", "Recebe os dados", "Nome, matrícula, curso e configuração."],
  ["02", "Valida a entrada", "Campos obrigatórios e matrícula são verificados."],
  ["03", "Protege a estrutura", "O sistema verifica se a pasta já existe."],
  ["04", "Identifica os módulos", "Pacote padrão ou seleção personalizada."],
  ["05", "Cria e copia", "A pasta recebe os arquivos-base necessários."],
  ["06", "Entrega o ambiente", "A estrutura fica pronta para o novo aluno."],
];

function CaseIcon({ type }) {
  const icons = {
    problem: <><circle cx="24" cy="24" r="17" /><path d="M24 14v12M24 33h.01" /></>,
    solution: <><path d="M8 15h13l4 5h15v19H8z" /><path d="M24 25v9M19.5 29.5h9" /></>,
    custom: <><path d="M10 10h12v12H10zM26 10h12v12H26zM10 26h12v12H10z" /><path d="M32 27v11M26.5 32.5h11" /></>,
    interface: <><rect x="7" y="9" width="34" height="26" rx="2" /><path d="M17 41h14M24 35v6M13 15h22M13 21h15" /></>,
    result: <><path d="M8 39h32M12 34l8-9 7 5 11-15" /><path d="M31 15h7v7" /></>,
  };
  return <span className={styles.sectionIcon} aria-hidden="true"><svg viewBox="0 0 48 48">{icons[type]}</svg></span>;
}

function SectionHeading({ number, eyebrow, title, id, icon }) {
  return <div className={styles.sectionHeading}><span className={styles.sectionNumber}>{number}</span><div className={styles.sectionTitle}><p>{eyebrow}</p><h2 id={id}>{title}</h2></div><CaseIcon type={icon} /></div>;
}

function Flow({ label, items, accent = false, six = false }) {
  return <div className={`${styles.flowBlock} ${accent ? styles.accentFlow : ""} ${six ? styles.sixStepFlow : ""}`}><p>{label}</p><ol>{items.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></li>)}</ol></div>;
}

export default function FolderCreationCase() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/#projetos" aria-label="Voltar ao início"><span>C</span> bycauazin</Link>
        <Link className={styles.backLink} href="/projetos">← Todos os projetos</Link>
      </header>

      <main>
        <section className={styles.hero} aria-labelledby="case-title">
          <div className={styles.heroMeta}><p>Automação · Aplicação desktop</p><span>Estudo de caso</span></div>
          <div className={styles.heroGrid}>
            <div><h1 id="case-title">Criação automática de pastas dos alunos</h1><p className={styles.heroSummary}>Aplicação desktop em Python criada para automatizar a preparação dos arquivos e módulos utilizados por novos alunos.</p></div>
            <aside className={styles.heroAside}>
              <div className={styles.heroPhoto}><Image src="/project-images/laboratorio-cursos-conceitual.png" alt="Imagem conceitual de um laboratório de cursos com computadores" fill sizes="(max-width: 800px) 100vw, 320px" priority /></div>
              <span>Contexto do projeto</span><p>Desenvolvido na Onbyte Penha para apoiar professores durante o início das aulas.</p><small>Imagem conceitual — não é um registro histórico.</small>
            </aside>
          </div>
          <div className={styles.tags} aria-label="Tecnologias e características do projeto">{[["Py", "Python"], ["Tk", "Tkinter"], ["Au", "Automação"], ["PC", "Desktop"]].map(([mark, label]) => <span key={label}><b aria-hidden="true">{mark}</b>{label}</span>)}</div>
        </section>

        <LeadQuote text="Em vez de preparar cada pasta manualmente, a estrutura do aluno passou a ser gerada automaticamente, com menos retrabalho e mais consistência." />

        <ImpactCards cards={[
          { title: "Problema", text: "Cada aluno exigia uma estrutura específica de arquivos e módulos, e a preparação dependia de trabalho manual repetitivo." },
          { title: "Solução", text: "Criei uma aplicação para validar os dados, criar a pasta e copiar a estrutura correta automaticamente." },
          { title: "Impacto", text: "A operação ficou mais padronizada e ficou menos sujeito a erro humano ou cópia manual de módulos." },
        ]} />

        <BeforeAfter
          before={["Consulta dados", "Identifica curso", "Cria pasta manual", "Copia módulos", "Confere estrutura"]}
          after={["Informar dados", "Validar entrada", "Estrutura criada", "Módulos copiados", "Ambiente pronto"]}
        />

        <FlowDiagram steps={[
          { label: "Dados", text: "O professor informa nome, matrícula e curso." },
          { label: "Validação", text: "A aplicação verifica campos e conflitos." },
          { label: "Criação", text: "A pasta e a estrutura base são geradas." },
        ]} />

        <nav className={styles.caseNav} aria-label="Etapas do estudo de caso">
          {[["01", "Problema", "folder-problem"], ["02", "Solução", "folder-solution"], ["03", "Personalização", "folder-custom"], ["04", "Interface", "folder-interface"], ["05", "Resultado", "folder-result"]].map(([number, label, target]) => <a href={`#${target}`} key={number}><span>{number}</span><strong>{label}</strong><b aria-hidden="true">↓</b></a>)}
        </nav>

        <section className={styles.section} aria-labelledby="folder-problem">
          <SectionHeading number="01" eyebrow="O problema" title="Dez passos manuais antes da primeira aula" id="folder-problem" icon="problem" />
          <div className={styles.problemGrid}>
            <div className={styles.mainCopy}><p>Cada aluno seguia um progresso individual, marcava seus horários no laboratório e podia começar em qualquer momento do expediente. Quando alguém novo chegava, o professor precisava consultar os dados, criar a pasta e copiar cada curso ou módulo contratado.</p><p>Um mesmo aluno podia ter mais de um curso. Com dois ou três inícios simultâneos, essa preparação se tornava um gargalo enquanto a equipe também atendia os demais alunos.</p></div>
            <div className={styles.fact}><strong>5–10 min</strong><span>de espera observada em determinados momentos antes da automação</span><small>Estimativa operacional, sem medição formal.</small></div>
          </div>
          <Flow label="Processo anterior" items={manualFlow} six />
        </section>

        <section className={styles.section} aria-labelledby="folder-solution">
          <SectionHeading number="02" eyebrow="A solução" title="Dados preenchidos, estrutura criada" id="folder-solution" icon="solution" />
          <div className={styles.solutionIntro}><p>Desenvolvi sozinho uma aplicação em Python e Tkinter para conduzir todo o processo. O professor informava os dados uma vez e o programa criava a pasta e copiava os conteúdos corretos.</p><div className={styles.pythonBadge}><Image src="/technology-icons/python.svg" width={52} height={52} alt="Python" /><strong>Não eram pastas vazias.<br />Os arquivos dos cursos também eram copiados.</strong></div></div>
          <Flow label="Novo processo" items={automatedFlow} accent />
          <ol className={styles.operationGrid} aria-label="Funcionamento técnico da aplicação">{operationSteps.map(([number, title, description]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol>
          <div className={styles.validationStrip}><span>Validações</span><ul><li>Nome obrigatório</li><li>Matrícula válida</li><li>Configuração preenchida</li><li>Pasta ainda não existente</li></ul></div>
        </section>

        <section className={styles.section} aria-labelledby="folder-custom">
          <SectionHeading number="03" eyebrow="Desafio técnico" title="Pacotes padrão e cursos personalizados" id="folder-custom" icon="custom" />
          <div className={styles.mainCopyWide}><p>Pacotes conhecidos podiam reutilizar uma estrutura-base. O maior desafio foi permitir combinações personalizadas: o professor selecionava cada módulo e a aplicação copiava somente os conteúdos escolhidos.</p></div>
          <div className={styles.courseModes}>
            <article><span>Pacote padrão</span><h3>Informática</h3><div className={styles.folderTree}><strong>João Silva - 10245</strong><p>└─ Informática</p><p>　├─ Windows</p><p>　├─ Internet</p><p>　├─ Word</p><p>　└─ Excel</p></div></article>
            <article><span>Configuração personalizada</span><h3>Módulos selecionados</h3><div className={styles.moduleTags}><b>✓ Windows</b><b>✓ Word</b><b>✓ Excel</b><b className={styles.offModule}>Internet</b></div><p>A estrutura final respeitava exatamente a configuração consultada no sistema.</p></article>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="folder-interface">
          <SectionHeading number="04" eyebrow="Interface" title="Uma ferramenta simples para os professores" id="folder-interface" icon="interface" />
          <div className={styles.interfaceLayout}>
            <div className={styles.desktopScene}>
              <div className={styles.desktopWindow} aria-label="Recriação demonstrativa da interface de criação de arquivos">
                <div className={styles.titleBar}><span className={styles.appIcon}>A</span><span>Criação de arquivos dos alunos</span><div aria-hidden="true"><i>—</i><i>□</i><i>×</i></div></div>
                <div className={`${styles.windowBody} ${styles.creationForm}`}><label htmlFor="demo-student-name">Nome do aluno</label><input id="demo-student-name" value="João Silva" readOnly /><label htmlFor="demo-student-enrollment">Matrícula</label><input id="demo-student-enrollment" value="10245" inputMode="numeric" readOnly /><label>Curso</label><div className={styles.fakeSelect}>Informática <span>⌄</span></div><button type="button">Criar arquivos</button></div>
              </div>
            </div>
            <div className={styles.interfaceCopy}>
              <div className={styles.customModal}><strong>Curso personalizado</strong><span>Módulos</span>{["Windows", "Internet", "Word", "Excel"].map((module, index) => <p key={module}><i>{index === 1 ? "" : "✓"}</i>{module}</p>)}<button type="button">Criar estrutura</button></div>
              <div><span>Demonstração</span><p>Recriação da interface original para fins de demonstração. Não se trata de um screenshot histórico.</p></div><small>Nome e matrícula inteiramente fictícios.</small>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.result}`} aria-labelledby="folder-result">
          <SectionHeading number="05" eyebrow="Resultado" title="Menos preparação manual, mais consistência" id="folder-result" icon="result" />
          <div className={styles.resultGrid}>
            <div className={styles.metric}><strong>1 app</strong><p>para validar os dados, criar a pasta e copiar os arquivos necessários.</p></div>
            <div className={styles.resultCopy}><p>A ferramenta reduziu o trabalho manual, padronizou as estruturas e diminuiu o risco de copiar módulos incorretos. Sem uma medição formal do tempo posterior, o resultado é apresentado como ganho operacional, não como percentual.</p><div><span>Aprendizado</span><p>O projeto reforçou como pequenas aplicações internas podem eliminar gargalos recorrentes quando traduzem as regras reais da operação.</p></div></div>
          </div>
          <div className={styles.benefitGrid}><span>Menos trabalho manual</span><span>Preparação mais rápida</span><span>Estruturas padronizadas</span><span>Menos risco nos módulos</span></div>
          <Link className={styles.connectedCard} href="/projetos/atalho-acesso-cursos"><span>Projetos conectados</span><strong>Estrutura criada → matrícula localizada → arquivos acessados</strong><p>Ver o case “Atalho de acesso aos cursos”</p><b aria-hidden="true">→</b></Link>
        </section>
      </main>
      <footer className={styles.footer}><span>© {new Date().getFullYear()} Cauã · bycauazin</span><Link href="/projetos">Ver todos os projetos ↑</Link></footer>
    </div>
  );
}
