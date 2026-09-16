import Image from "next/image";
import Link from "next/link";
import styles from "./course-access-case.module.css";

const oldFlow = ["Entrar no diretório", "Navegar por pastas", "Localizar a matrícula", "Abrir os arquivos", "Acessar as aulas"];
const newFlow = ["Abrir o aplicativo", "Digitar a matrícula", "Pesquisar", "Acessar arquivos e aulas"];
const operationSteps = [
  ["01", "Valida a matrícula", "A entrada aceita apenas números."],
  ["02", "Percorre os diretórios", "A aplicação busca entre as pastas disponíveis."],
  ["03", "Localiza o aluno", "A matrícula identifica a pasta correspondente."],
  ["04", "Abre os recursos", "Pasta e plataforma de aulas ficam acessíveis."],
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
  return <div className={styles.sectionHeading}><span className={styles.sectionNumber}>{number}</span><div className={styles.sectionTitle}><p>{eyebrow}</p><h2 id={id}>{title}</h2></div><CaseIcon type={icon} /></div>;
}

function Flow({ label, items, accent = false }) {
  return (
    <div className={`${styles.flowBlock} ${accent ? styles.accentFlow : ""}`}>
      <p>{label}</p>
      <ol>{items.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></li>)}</ol>
    </div>
  );
}

export default function CourseAccessCase() {
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
            <div><h1 id="case-title">Atalho de acesso aos cursos</h1><p className={styles.heroSummary}>Aplicação em Python que substituiu um processo manual de acesso às aulas e aos arquivos por uma única pesquisa de matrícula.</p></div>
            <aside className={styles.heroAside}>
              <div className={styles.heroPhoto}><Image src="/project-images/laboratorio-cursos-conceitual.png" alt="Imagem conceitual de alunos utilizando computadores em um laboratório de cursos" fill sizes="(max-width: 800px) 100vw, 320px" priority /></div>
              <span>Contexto do projeto</span>
              <p>Desenvolvido na Onbyte Penha enquanto eu atuava como coordenador de cursos.</p>
              <small>Imagem conceitual — não é um registro histórico.</small>
            </aside>
          </div>
          <div className={styles.tags} aria-label="Tecnologias e características do projeto">
            {[["Py", "Python"], ["Tk", "Tkinter"], ["Au", "Automação"], ["PC", "Desktop"]].map(([mark, label]) => <span key={label}><b aria-hidden="true">{mark}</b>{label}</span>)}
          </div>
        </section>

        <nav className={styles.caseNav} aria-label="Etapas do estudo de caso">
          {[
            ["01", "Problema", "problem-title"], ["02", "Solução", "solution-title"], ["03", "Interface", "interface-title"], ["04", "Desafio", "challenge-title"], ["05", "Resultado", "result-title"],
          ].map(([number, label, target]) => <a href={`#${target}`} key={number}><span>{number}</span><strong>{label}</strong><b aria-hidden="true">↓</b></a>)}
        </nav>

        <section className={styles.section} aria-labelledby="problem-title">
          <SectionHeading number="01" eyebrow="O problema" title="Cinco níveis de pastas para começar uma aula" id="problem-title" icon="problem" />
          <div className={styles.problemGrid}>
            <div className={styles.mainCopy}><p>Os alunos precisavam encontrar sua pasta individual e abrir a plataforma de aulas. Como muitos frequentavam a unidade uma vez por semana, esqueciam o caminho.</p><p>Nos horários de pico, até 10 alunos podiam chegar juntos e pedir a mesma orientação, interrompendo professores e equipe.</p></div>
            <div className={styles.fact}><strong>≈ 5</strong><span>níveis de diretórios até a pasta individual</span></div>
          </div>
          <Flow label="Processo anterior" items={oldFlow} />
        </section>

        <section className={styles.section} aria-labelledby="solution-title">
          <SectionHeading number="02" eyebrow="A solução" title="Uma matrícula no lugar de várias etapas" id="solution-title" icon="solution" />
          <div className={styles.solutionIntro}><p>Desenvolvi uma aplicação desktop em Python e Tkinter. O aluno informava a matrícula; o programa localizava a pasta e abria os recursos.</p><div className={styles.pythonBadge}><Image src="/technology-icons/python.svg" width={52} height={52} alt="Python" /><strong>Menos orientação manual.<br />Acesso direto ao que importava.</strong></div></div>
          <Flow label="Novo processo" items={newFlow} accent />
          <ol className={styles.operationGrid} aria-label="Funcionamento técnico da aplicação">
            {operationSteps.map(([number, title, description]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}
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
            <div className={styles.exeCard} aria-hidden="true"><span>PY</span><b>→</b><span>EXE</span><p>script.py</p><p>aplicativo.exe</p></div>
            <div className={styles.mainCopy}><p>O código funcionava, mas o usuário final não poderia depender de Python ou de um terminal. Eu ainda não sabia distribuir uma aplicação desktop.</p><p>Pesquisei, aprendi a empacotar o projeto como <code>.exe</code> e entreguei uma experiência semelhante à de um software convencional.</p><blockquote>O script se tornou uma ferramenta pronta para a operação.</blockquote></div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.result}`} aria-labelledby="result-title">
          <SectionHeading number="05" eyebrow="Resultado" title="Menos interrupções nos horários de pico" id="result-title" icon="result" />
          <div className={styles.resultGrid}>
            <div className={styles.metric}><span>≈</span><strong>60%</strong><p>redução estimada dos chamados sobre acesso às aulas e aos arquivos.</p></div>
            <div className={styles.resultCopy}><p>A estimativa veio da observação da rotina, não de uma medição formal. Com menos dúvidas operacionais, os professores puderam dedicar mais tempo ao conteúdo dos cursos.</p><div><span>Aprendizado</span><p>Esse projeto mostrou, no início da minha experiência com desenvolvimento, como usar programação para resolver um problema real do próprio ambiente de trabalho.</p></div></div>
          </div>
          <div className={styles.capabilities} aria-label="Competências aplicadas no projeto"><span>Python</span><span>Interface desktop</span><span>Automação</span><span>Pesquisa técnica</span><span>Resolução de problemas</span></div>
          <Link className={styles.connectedCard} href="/projetos/criador-pastas-alunos"><span>Projetos conectados</span><strong>Estrutura criada → matrícula localizada → arquivos acessados</strong><p>Ver o case “Criação automática de pastas dos alunos”</p><b aria-hidden="true">→</b></Link>
        </section>
      </main>

      <footer className={styles.footer}><span>© {new Date().getFullYear()} Cauã · bycauazin</span><Link href="/projetos">Ver todos os projetos ↑</Link></footer>
    </div>
  );
}
