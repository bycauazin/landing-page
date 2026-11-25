import Image from "next/image";
import Link from "next/link";
import CaseHeader from "./case-header";
import { Icon, SectionIcon, StepDot } from "./case-icons";
import CaseFloatingActions from "./case-floating-actions";
import { BeforeAfter, FlowDiagram, LeadQuote, ReadingGuide, Pipeline } from "./case-shared";
import styles from "./course-access-case.module.css";

const oldFlow = [
  { icon: "folder", label: "Entrar no diretório" },
  { icon: "layers", label: "Navegar por pastas" },
  { icon: "search", label: "Localizar a matrícula" },
  { icon: "file", label: "Abrir os arquivos" },
  { icon: "learning", label: "Acessar as aulas" },
];
const newFlow = [
  { icon: "screen", label: "Abrir o aplicativo" },
  { icon: "key", label: "Digitar a matrícula" },
  { icon: "search", label: "Pesquisar" },
  { icon: "rocket", label: "Acessar arquivos e aulas" },
];
const operationSteps = [
  ["check", "Valida a matrícula", "A entrada aceita apenas números."],
  ["folder", "Percorre os diretórios", "A aplicação busca entre as pastas disponíveis."],
  ["search", "Localiza o aluno", "A matrícula identifica a pasta correspondente."],
  ["screen", "Abre os recursos", "Pasta e plataforma de aulas ficam acessíveis."],
];


function SectionHeading({ eyebrow, title, id }) {
  return <div className={styles.sectionHeading}><span className={styles.sectionNumber}><SectionIcon label={eyebrow} /></span><div className={styles.sectionTitle}><p>{eyebrow}</p><h2 id={id}>{title}</h2></div></div>;
}

function Flow({ label, items, accent = false }) {
  return <div className={styles.pipelineBlock}><p>{label}</p><Pipeline steps={items} muted={!accent} /></div>;
}

export default function CourseAccessCase() {
  return (
    <div className={styles.page} id="top" data-edge-deco="">
      <CaseHeader styles={styles} />

      <main>
        <section className={styles.hero} aria-labelledby="case-title">
          <div className={styles.heroMeta}><p>Automação · Aplicação desktop</p><span>Estudo de caso</span></div>
          <div className={styles.heroGrid}>
            <div><h1 id="case-title">Atalho de acesso aos cursos</h1><p className={styles.heroSummary}>Aplicação em Python que substituiu um processo manual de acesso às aulas e aos arquivos por uma única pesquisa de matrícula.</p></div>
            <aside className={styles.heroAside}>
              <div className={`${styles.heroPhoto} ${styles.accessHeroVisual}`} aria-label="Representação conceitual da busca de arquivos pela matrícula">
                <span>Matrícula</span><strong>10245</strong><b>Pesquisar</b><div><i />Pasta localizada</div>
              </div>
              <span>Contexto do projeto</span>
              <p>Criei a ferramenta quando era coordenador em uma escola de cursos.</p>
              <small>Representação demonstrativa com matrícula fictícia.</small>
            </aside>
          </div>
          <div className={styles.tags} aria-label="Tecnologias e características do projeto">
            {[["Py", "Python"], ["Tk", "Tkinter"], ["Au", "Automação"], ["PC", "Desktop"]].map(([mark, label]) => <span key={label}><b aria-hidden="true">{mark}</b>{label}</span>)}
          </div>
        </section>

        <ReadingGuide
          className={styles.section}
          highlight={{ value: "1 busca", text: "abre os arquivos e a plataforma de aulas pela matrícula", href: "#result-title" }}
          minutes={4}
          plain={["Na escola de cursos onde eu trabalhava, os alunos precisavam passar por várias pastas para encontrar seus arquivos e muitas vezes pediam ajuda no início da aula.", "Criei um programa simples: o aluno digita a matrícula, clica em Pesquisar e a pasta dele abre junto com a plataforma de aulas. O acesso direto reduziu os pedidos de ajuda nos horários de pico."]}
          plainLink={{ label: "Ver como ficou a tela", href: "#interface-title" }}
          technical={["Python + Tkinter, empacotado como .exe: o aluno não precisa de Python nem de terminal", "Validação da entrada (só números) antes de procurar", "Busca da pasta pela matrícula percorrendo os diretórios com a biblioteca padrão do Python", "Abre a pasta local e a plataforma web de aulas no navegador"]}
          technicalLink={{ label: "Ir para a solução técnica", href: "#solution-title" }}
        />
        <LeadQuote text="O aluno passou a acessar seus arquivos informando apenas sua matrícula, sem navegar por vários diretórios e sem depender da orientação manual da equipe." />

        <BeforeAfter
          before={["Aluno procura diretório", "Navega entre pastas", "Solicita ajuda", "Acesso atrasa a aula"]}
          after={["Informa matrícula", "Sistema localiza a pasta", "Arquivo e aulas abrem", "O aluno entra direto no conteúdo"]}
        />

        <FlowDiagram steps={[
          { icon: "user", label: "Matrícula", text: "O aluno informa a sua identificação." },
          { icon: "search", label: "Busca", text: "A aplicação localiza a estrutura correta." },
          { icon: "rocket", label: "Acesso", text: "A pasta e as aulas ficam disponíveis em poucos segundos." },
        ]} />
        <nav className={styles.caseNav} aria-label="Etapas do estudo de caso">
          {[
            ["01", "Problema", "problem-title"], ["02", "Solução", "solution-title"], ["03", "Interface", "interface-title"], ["04", "Desafio", "challenge-title"], ["05", "Resultado", "result-title"],
          ].map(([number, label, target]) => <a href={`#${target}`} key={number}><span><Icon label={label} /></span><strong>{label}</strong><b aria-hidden="true"><Icon name="down" /></b></a>)}
        </nav>

        <section className={styles.section} aria-labelledby="problem-title">
          <SectionHeading number="01" eyebrow="O problema" title="Cinco níveis de pastas para começar uma aula" id="problem-title" icon="problem" />
          <div className={styles.problemGrid}><div className={styles.mainCopy}><p>Nos horários de pico, até 10 alunos podiam chegar juntos e pedir a mesma orientação, interrompendo professores e equipe.</p></div></div>
          <Flow label="Processo anterior" items={oldFlow} />
        </section>

        <section className={styles.section} aria-labelledby="solution-title">
          <SectionHeading number="02" eyebrow="A solução" title="Uma matrícula no lugar de várias etapas" id="solution-title" icon="solution" />
          <div className={styles.solutionIntro}><p>Desenvolvi uma aplicação desktop em Python e Tkinter. O aluno informava a matrícula; o programa localizava a pasta e abria os recursos.</p><div className={styles.pythonBadge}><Image src="/technology-icons/python.svg" width={52} height={52} alt="Python" /><strong>Menos orientação manual.<br />Acesso direto ao que importava.</strong></div></div>
          <Flow label="Novo processo" items={newFlow} accent />
          <ol className={styles.operationGrid} aria-label="Funcionamento técnico da aplicação">
            {operationSteps.map(([icon, title, description]) => <li key={title}><span><Icon name={icon} /></span><div><h3>{title}</h3><p>{description}</p></div></li>)}
          </ol>
          <p className={styles.technicalNote}>A busca utilizava recursos do Python para manipular diretórios e localizar a pasta cujo nome continha a matrícula informada. Todos os exemplos apresentados neste case são fictícios.</p>
        </section>

        <section className={styles.section} aria-labelledby="interface-title">
          <SectionHeading number="03" eyebrow="Interface" title="Só o necessário para chegar à aula" id="interface-title" icon="interface" />
          <div className={styles.interfaceLayout}>
            <div className={styles.desktopScene}>
              <div className={styles.desktopWindow} aria-label="Recriação demonstrativa da interface Arquivos Curso">
                <div className={styles.titleBar}><span className={styles.appIcon}>A</span><span>Arquivos Curso</span><div aria-hidden="true"><i>—</i><i>□</i><i>×</i></div></div>
                <div className={styles.windowBody}><div className={styles.logoPlaceholder}><span>Logo</span><small>da unidade</small></div><label htmlFor="demo-enrollment">Matrícula</label><input id="demo-enrollment" value="10245" inputMode="numeric" readOnly /><small>Digite apenas números</small><button type="button">Pesquisar</button></div>
              </div>
            </div>
            <div className={styles.interfaceCopy}><p>A janela tinha um campo, uma instrução e um botão. Depois da pesquisa, abria a pasta do aluno e direcionava para a plataforma web de aulas.</p><div><span>Demonstração</span><p>Recriação da interface original. Não se trata de um screenshot histórico.</p></div><small>Matrícula fictícia: 10245</small></div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="challenge-title">
          <SectionHeading number="04" eyebrow="Desafio técnico" title="Do script a um programa utilizável" id="challenge-title" icon="challenge" />
          <div className={styles.challengeGrid}>
            <div className={styles.exeCard} aria-hidden="true"><span>PY</span><b><Icon name="arrow" /></b><span>EXE</span><p>script.py</p><p>aplicativo.exe</p></div>
            <div className={styles.mainCopy}><p>O código funcionava, mas o usuário final não poderia depender de Python ou de um terminal. Eu ainda não sabia distribuir uma aplicação desktop.</p><p>Pesquisei, aprendi a empacotar o projeto como <code>.exe</code> e entreguei uma experiência semelhante à de um software convencional.</p><blockquote>O script se tornou uma ferramenta pronta para a operação.</blockquote></div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.result}`} aria-labelledby="result-title">
          <SectionHeading number="05" eyebrow="Resultado" title="Menos interrupções nos horários de pico" id="result-title" icon="result" />
          <div className={styles.resultGrid}>
            <div className={styles.metric}><strong>Acesso direto</strong><p>Os alunos passaram a encontrar os arquivos do curso pela matrícula.</p></div>
            <div className={styles.resultCopy}><p>No dia a dia, os alunos passaram a pedir menos ajuda para encontrar os arquivos. Os professores ganharam tempo para se dedicar ao conteúdo das aulas.</p><div><span>Aprendizado</span><p>Esse projeto mostrou, no início da minha experiência com desenvolvimento, como usar programação para resolver um problema real do próprio ambiente de trabalho.</p></div></div>
          </div>
          <div className={styles.capabilities} aria-label="Competências aplicadas no projeto"><span>Python</span><span>Interface desktop</span><span>Automação</span><span>Pesquisa técnica</span><span>Resolução de problemas</span></div>
          <Link className={styles.connectedCard} href="/projetos/criador-pastas-alunos"><span>Projetos conectados</span><strong>Estrutura criada <Icon name="arrow" /> matrícula localizada <Icon name="arrow" /> arquivos acessados</strong><p>Ver o case “Criação automática de pastas dos alunos”</p><b aria-hidden="true"><Icon name="arrow" /></b></Link>
        </section>
      </main>

      <CaseFloatingActions sections={[
        { href: "#problem-title", label: "Problema" }, { href: "#solution-title", label: "Solução" },
        { href: "#interface-title", label: "Interface" }, { href: "#challenge-title", label: "Desafio técnico" },
        { href: "#result-title", label: "Resultado" },
      ]} />
      <footer className={styles.footer}><span>© {new Date().getFullYear()} Cauã · bycauazin</span><Link href="/projetos">Ver todos os projetos</Link></footer>
    </div>
  );
}
