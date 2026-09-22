import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryLabels, getProject, projects, statusLabels } from "../../data/projects";
import TechnologyIcon from "../../components/technology-icon";
import CourseAccessCase from "./course-access-case";
import ExportacaoDiariaCase from "./exportacao-diaria-case";
import FolderCreationCase from "./folder-creation-case";
import GovernancaTeamsCase from "./governanca-teams-case";
import PlannerPowerBICase from "./planner-power-bi-case";
import styles from "./project.module.css";

function ProjectUnderDevelopment({ project }) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/#projetos" aria-label="Voltar ao início"><span>C</span> bycauazin</Link>
        <Link className={styles.backLink} href="/projetos">← Todos os projetos</Link>
      </header>

      <main>
        <section className={styles.developmentHero} aria-labelledby="project-title">
          <div className={styles.developmentBadgeWrap}>
            <p className={styles.kicker}>{categoryLabels[project.category]}</p>
            <span className={`${styles.projectStatus} ${styles.developmentStatus}`}>
              {statusLabels[project.status]}
            </span>
          </div>

          <div className={styles.developmentVisual} aria-hidden="true">
            <div className={styles.devOrb} />
            <div className={styles.devSignal} />
          </div>

          <div className={styles.developmentText}>
            <h1 id="project-title">{project.title}</h1>
            <p className={styles.projectGroup}>{project.group}</p>
            <p className={styles.summary}>{project.description}</p>
            <div className={styles.devIndicator}>
              <span className={styles.devDot} />
              <span>Desenvolvimento em andamento</span>
            </div>
          </div>
        </section>

        <section className={styles.developmentMessage}>
          <div className={styles.messageHeader}>
            <span>01</span>
            <h2>Em desenvolvimento</h2>
          </div>

          <div className={styles.messageBody}>
            <p>
              {project.title} está sendo desenvolvido e ainda não possui uma versão completa disponível para apresentação.
            </p>
            <p>
              {project.title === "Finance App"
                ? "Aplicação pessoal criada com o objetivo de explorar o desenvolvimento de uma solução para organização financeira e acompanhamento de receitas e despesas."
                : "Aplicação pessoal criada com o objetivo de explorar uma solução para organização de hábitos, atividades e acompanhamento da rotina."}
            </p>
            <p>
              O projeto ainda está em desenvolvimento. À medida que novas etapas forem concluídas, esta página será atualizada com detalhes técnicos, decisões de interface e evolução do produto.
            </p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Cauã · bycauazin</span>
        <Link href="/projetos">Voltar aos projetos ↑</Link>
      </footer>
    </div>
  );
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  return {
    title: `${project.title} | Cauã`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  if (project.slug === "governanca-corporativa") {
    return <GovernancaTeamsCase />;
  }

  if (project.status === "em-desenvolvimento") {
    return <ProjectUnderDevelopment project={project} />;
  }

  if (project.slug === "atalho-acesso-cursos") {
    return <CourseAccessCase />;
  }

  if (project.slug === "criador-pastas-alunos") {
    return <FolderCreationCase />;
  }

  if (project.slug === "planner-power-bi") {
    return <PlannerPowerBICase />;
  }

  if (project.slug === "account-manager-exportacao-excel") {
    return <ExportacaoDiariaCase />;
  }

  const relatedProjects = (project.related ?? [])
    .map((relatedSlug) => getProject(relatedSlug))
    .filter(Boolean);

  const details = [
    ["Problema", project.sections.problem],
    ["Solução", project.sections.solution],
    ["Minha participação", project.sections.role],
    ["Resultado", project.sections.result],
    ["Evidências", project.sections.evidence],
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/#projetos"><span>C</span> bycauazin</Link>
        <Link className={styles.backLink} href="/projetos">← Todos os projetos</Link>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroTop}>
            <p>{categoryLabels[project.category]}</p>
            <span className={project.status === "em-desenvolvimento" ? styles.developmentStatus : ""}>{statusLabels[project.status]}</span>
          </div>
          <h1>{project.title}</h1>
          <p className={styles.projectGroup}>{project.group} · {project.type}</p>
          <p className={styles.summary}>{project.description}</p>
          <div className={styles.tags}>{project.technologies.map((technologyId) => <TechnologyIcon className={styles.techTag} technology={technologyId} size="sm" showLabel key={technologyId} />)}</div>
        </section>

        <section className={styles.flowSection} aria-labelledby="flow-title">
          <div className={styles.sectionLabel}><span>01</span><h2 id="flow-title">Como as partes se conectam</h2></div>
          <ol className={styles.flow}>
            {project.flow.map((step, index) => (
              <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></li>
            ))}
          </ol>
        </section>

        {project.chapters && (
          <section className={styles.chapterSection} aria-labelledby="chapter-title">
            <div className={styles.sectionLabel}><span>02</span><h2 id="chapter-title">Um projeto, duas perspectivas</h2></div>
            <p className={styles.sectionIntro}>A integração continua sendo um único estudo de caso. Estes atalhos levam direto à etapa de automação ou à etapa de Power BI.</p>
            <div className={styles.chapterGrid}>
              {project.chapters.map((chapter) => (
                <a href={`#${chapter.id}`} id={chapter.id} key={chapter.id}>
                  <span>{chapter.label}</span>
                  <strong>{chapter.description}</strong>
                  <small>Ver esta etapa ↓</small>
                </a>
              ))}
            </div>
          </section>
        )}

        <section className={styles.detailsSection} aria-labelledby="details-title">
          <div className={styles.sectionLabel}><span>{project.chapters ? "03" : "02"}</span><h2 id="details-title">Estrutura do estudo de caso</h2></div>
          <p className={styles.sectionIntro}>A estrutura de cada estudo de caso foi organizada para apresentar o problema, a solução, a participação e o impacto de forma direta.</p>
          <div className={styles.detailGrid}>
            {details.map(([title, content]) => (
              <article key={title}><h3>{title}</h3><div>{content}</div></article>
            ))}
          </div>
        </section>

        <section className={styles.publicationSection} aria-labelledby="publication-title">
          <div>
            <p className={styles.kicker}>Publicação recomendada</p>
            <h2 id="publication-title">{project.publication}</h2>
          </div>
          <div className={styles.confidentiality}><span>Antes de publicar</span><p>{project.confidentiality}</p></div>
        </section>

        {relatedProjects.length > 0 && (
          <section className={styles.relatedSection} aria-labelledby="related-title">
            <p className={styles.kicker}>Conexões</p>
            <h2 id="related-title">Projetos relacionados</h2>
            {relatedProjects.map((related) => (
              <Link href={`/projetos/${related.slug}`} key={related.slug}>
                <span>{categoryLabels[related.category]}</span><strong>{related.title}</strong><b>→</b>
              </Link>
            ))}
          </section>
        )}
      </main>

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Cauã · bycauazin</span>
        <Link href="/projetos">Voltar aos projetos ↑</Link>
      </footer>
    </div>
  );
}
