import Image from "next/image";
import Link from "next/link";
import CaseHeader from "./case-header";
import { Icon, SectionIcon, StepDot } from "./case-icons";
import CaseFloatingActions from "./case-floating-actions";
import { BeforeAfter, FlowDiagram, LeadQuote, ReadingGuide, Pipeline } from "./case-shared";
import styles from "./course-access-case.module.css";

const manualFlow = [
  { icon: "search", label: "Consultar dados" },
  { icon: "list", label: "Identificar cursos" },
  { icon: "folder", label: "Criar pasta" },
  { icon: "data", label: "Localizar a base" },
  { icon: "copy", label: "Copiar módulos" },
  { icon: "check", label: "Conferir estrutura" },
];
const automatedFlow = [
  { icon: "file", label: "Informar os dados" },
  { icon: "check", label: "Validar" },
  { icon: "plus", label: "Clicar em Criar" },
  { icon: "folder", label: "Estrutura pronta" },
];
const operationSteps = [
  ["file", "Recebe os dados", "Nome, matrícula, curso e configuração."],
  ["check", "Valida a entrada", "Campos obrigatórios e matrícula são verificados."],
  ["shield", "Protege a estrutura", "O sistema verifica se a pasta já existe."],
  ["list", "Identifica os módulos", "Pacote padrão ou seleção personalizada."],
  ["copy", "Cria e copia", "A pasta recebe os arquivos-base necessários."],
  ["rocket", "Entrega o ambiente", "A estrutura fica pronta para o novo aluno."],
];


function SectionHeading({ eyebrow, title, id }) {
  return <div className={styles.sectionHeading}><span className={styles.sectionNumber}><SectionIcon label={eyebrow} /></span><div className={styles.sectionTitle}><p>{eyebrow}</p><h2 id={id}>{title}</h2></div></div>;
}

function Flow({ label, items, accent = false }) {
  return <div className={styles.pipelineBlock}><p>{label}</p><Pipeline steps={items} muted={!accent} /></div>;
}

export default function FolderCreationCase() {
  return (
    <div className={styles.page} id="top" data-edge-deco="">
      <CaseHeader styles={styles} />

      <main>
        <section className={styles.hero} aria-labelledby="case-title">
          <div className={styles.heroMeta}><p>Automação · Aplicação desktop</p><span>Estudo de caso</span></div>
          <div className={styles.heroGrid}>
            <div><h1 id="case-title">Criação automática de pastas dos alunos</h1><p className={styles.heroSummary}>Aplicação desktop em Python criada para automatizar a preparação dos arquivos e módulos utilizados por novos alunos.</p></div>
            <aside className={styles.heroAside}>
              <div className={`${styles.heroPhoto} ${styles.folderHeroVisual}`} aria-label="Representação conceitual da criação automática da estrutura do aluno">
                <div><span>Aluno_10245</span><small>estrutura criada</small></div><p>├─ Windows</p><p>├─ Word</p><p>└─ Excel</p>
              </div>
              <span>Contexto do projeto</span><p>Desenvolvido na Onbyte Penha para apoiar professores durante o início das aulas.</p><small>Imagem conceitual — não é um registro histórico.</small>
            </aside>
          </div>
          <div className={styles.tags} aria-label="Tecnologias e características do projeto">{[["Py", "Python"], ["Tk", "Tkinter"], ["Au", "Automação"], ["PC", "Desktop"]].map(([mark, label]) => <span key={label}><b aria-hidden="true">{mark}</b>{label}</span>)}</div>
        </section>

        <ReadingGuide
          className={styles.section}
          highlight={{ icon: "folder", value: "1 clique", text: "e a pasta do aluno novo sai pronta, com os arquivos certos dentro", href: "#folder-result" }}
          minutes={4}
          plain={["Quando um aluno novo chegava à escola, o professor parava o que estava fazendo para criar a pasta dele e copiar, um por um, os arquivos de cada curso contratado. Com dois ou três alunos começando juntos, virava fila.", "Fiz um programa em que o professor preenche nome, matrícula e curso e clica em um botão: a pasta sai pronta, já com os arquivos certos dentro."]}
          plainLink={{ label: "Ver como ficou a tela", href: "#folder-interface" }}
          technical={["Python + Tkinter, formulário com validações (campos obrigatórios, matrícula, pasta que já existe)", "Pacotes padrão reaproveitam uma estrutura-base; cursos personalizados copiam só os módulos marcados", "Nunca sobrescreve uma pasta existente", "Trabalha junto com o Atalho de acesso: a pasta criada aqui é a que o aluno abre lá"]}
          technicalLink={{ label: "Ir para os cursos personalizados", href: "#folder-custom" }}
        />

        <LeadQuote text="Em vez de preparar cada pasta manualmente, a estrutura do aluno passou a ser gerada automaticamente, com menos retrabalho e mais consistência." />

        <BeforeAfter
          before={["Consulta dados", "Identifica curso", "Cria pasta manual", "Copia módulos", "Confere estrutura"]}
          after={["Informar dados", "Validar entrada", "Estrutura criada", "Módulos copiados", "Ambiente pronto"]}
        />

        <FlowDiagram steps={[
          { icon: "file", label: "Dados", text: "O professor informa nome, matrícula e curso." },
          { icon: "check", label: "Validação", text: "A aplicação verifica campos e conflitos." },
          { icon: "folder", label: "Criação", text: "A pasta e a estrutura base são geradas." },
        ]} />

        <nav className={styles.caseNav} aria-label="Etapas do estudo de caso">
          {[["01", "Problema", "folder-problem"], ["02", "Solução", "folder-solution"], ["03", "Personalização", "folder-custom"], ["04", "Interface", "folder-interface"], ["05", "Resultado", "folder-result"]].map(([number, label, target]) => <a href={`#${target}`} key={number}><span><Icon label={label} /></span><strong>{label}</strong><b aria-hidden="true"><Icon name="down" /></b></a>)}
        </nav>

        <section className={styles.section} aria-labelledby="folder-problem">
          <SectionHeading number="01" eyebrow="O problema" title="Dez passos manuais antes da primeira aula" id="folder-problem" icon="problem" />
          <div className={styles.problemGrid}>
            <div className={styles.mainCopy}><p>Cada aluno seguia um progresso individual, marcava seus horários no laboratório e podia começar em qualquer momento do expediente.</p><p>Um mesmo aluno podia ter mais de um curso. Com dois ou três inícios simultâneos, essa preparação se tornava um gargalo enquanto a equipe também atendia os demais alunos.</p></div>
            <div className={styles.fact}><strong>5–10 min</strong><span>de espera observada em determinados momentos antes da automação</span><small>Estimativa operacional, sem medição formal.</small></div>
          </div>
          <Flow label="Processo anterior" items={manualFlow} />
        </section>

        <section className={styles.section} aria-labelledby="folder-solution">
          <SectionHeading number="02" eyebrow="A solução" title="Dados preenchidos, estrutura criada" id="folder-solution" icon="solution" />
          <div className={styles.solutionIntro}><p>Desenvolvi sozinho uma aplicação em Python e Tkinter para conduzir todo o processo. O professor informava os dados uma vez e o programa criava a pasta e copiava os conteúdos corretos.</p><div className={styles.pythonBadge}><Image src="/technology-icons/python.svg" width={52} height={52} alt="Python" /><strong>Não eram pastas vazias.<br />Os arquivos dos cursos também eram copiados.</strong></div></div>
          <Flow label="Novo processo" items={automatedFlow} accent />
          <ol className={styles.operationGrid} aria-label="Funcionamento técnico da aplicação">{operationSteps.map(([icon, title, description]) => <li key={title}><span><Icon name={icon} /></span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol>
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
          <Link className={styles.connectedCard} href="/projetos/atalho-acesso-cursos"><span>Projetos conectados</span><strong>Estrutura criada <Icon name="arrow" /> matrícula localizada <Icon name="arrow" /> arquivos acessados</strong><p>Ver o case “Atalho de acesso aos cursos”</p><b aria-hidden="true"><Icon name="arrow" /></b></Link>
        </section>
      </main>
      <CaseFloatingActions sections={[
        { href: "#folder-problem", label: "Problema" }, { href: "#folder-solution", label: "Solução" },
        { href: "#folder-custom", label: "Cursos personalizados" }, { href: "#folder-interface", label: "Interface" },
        { href: "#folder-result", label: "Resultado" },
      ]} />
      <footer className={styles.footer}><span>© {new Date().getFullYear()} Cauã · bycauazin</span><Link href="/projetos">Ver todos os projetos</Link></footer>
    </div>
  );
}
