import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryLabels, getProject, projects, statusLabels } from "../../data/projects";
import TechnologyIcon from "../../components/technology-icon";
import AccessExpirationCase from "./access-expiration-case";
import CaseFloatingActions from "./case-floating-actions";
import CaseHeader from "./case-header";
import CaseMotion from "./case-motion";
import CaseRail from "./case-rail";
import { ReadingGuide } from "./case-shared";
import CourseAccessCase from "./course-access-case";
import DashboardSalesCase from "./dashboard-sales-case";
import ExportacaoDiariaCase from "./exportacao-diaria-case";
import FolderCreationCase from "./folder-creation-case";
import GovernancaTeamsCase from "./governanca-teams-case";
import PlannerPowerBICase from "./planner-power-bi-case";
import styles from "./project.module.css";

const pad = (n) => String(n).padStart(2, "0");

// Print da tela no topo da página (a mesma foto de capa do cartão), numa moldura de navegador.
function HeroShot({ project, preview = false }) {
  return (
    <figure className={styles.heroShot}>
      <div className={styles.shotBar} aria-hidden="true"><i /><i /><i /><span>{project.liveUrl ? project.liveUrl.replace(/^https?:\/\//, "") : project.title}</span></div>
      <Image src={project.image} alt={`Tela do ${project.title}`} width={1280} height={800} sizes="(max-width: 900px) 100vw, 520px" priority />
      {preview && <figcaption>Prévia do que já está pronto</figcaption>}
    </figure>
  );
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <span>© {new Date().getFullYear()} Cauã · bycauazin</span>
      <Link href="/projetos">Voltar aos projetos ↑</Link>
    </footer>
  );
}

function ProjectUnderDevelopment({ project }) {
  const topics = [{ href: "#dev-title", label: "Em desenvolvimento" }];
  if (project.features) topics.push({ href: "#features-title", label: "O que está sendo construído" });
  if (project.progress) topics.push({ href: "#progress-title", label: "Pronto e próximas etapas" });

  return (
    <div className={styles.page} id="top">
      <CaseHeader styles={styles} />

      <main>
        <section className={`${styles.developmentHero} ${project.image ? styles.developmentHeroShot : ""}`} aria-labelledby="project-title">
          <div className={styles.developmentBadgeWrap}>
            <p className={styles.kicker}>{categoryLabels[project.category]}</p>
            <span className={`${styles.projectStatus} ${styles.developmentStatus}`}>
              {statusLabels[project.status]}
            </span>
          </div>

          {project.image ? (
            <HeroShot project={project} preview />
          ) : (
            <div className={styles.developmentVisual} aria-hidden="true">
              <div className={styles.devOrb} />
              <div className={styles.devSignal} />
            </div>
          )}

          <div className={styles.developmentText}>
            <h1 id="project-title">{project.title}</h1>
            <p className={styles.projectGroup}>{project.group}</p>
            <p className={styles.summary}>{project.description}</p>
            <div className={styles.tags}>{project.technologies.map((technologyId) => <TechnologyIcon className={styles.techTag} technology={technologyId} size="sm" showLabel key={technologyId} />)}</div>
            <div className={styles.devIndicator}>
              <span className={styles.devDot} />
              <span>Desenvolvimento em andamento</span>
            </div>
          </div>
        </section>

        <section className={styles.developmentMessage} aria-labelledby="dev-title">
          <div className={styles.messageHeader}>
            <span>01</span>
            <h2 id="dev-title">Em desenvolvimento</h2>
          </div>

          <div className={styles.messageBody}>
            <p>
              {project.title} está sendo construído e ainda não tem uma versão aberta ao público.
            </p>
            {project.developmentSummary && <p>{project.developmentSummary}</p>}
            <p>
              Esta página acompanha o projeto: a cada etapa concluída ela ganha telas, decisões técnicas e o que mudou.
            </p>
          </div>
        </section>

        {project.features && (
          <section className={styles.developmentMessage} aria-labelledby="features-title">
            <div className={styles.messageHeader}>
              <span>02</span>
              <h2 id="features-title">O que está sendo construído</h2>
            </div>
            <ul className={styles.featureList}>
              {project.features.map((feature, index) => (
                <li key={feature}>
                  <span>{pad(index + 1)}</span>
                  {feature}
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.progress && (
          <section className={styles.developmentMessage} aria-labelledby="progress-title">
            <div className={styles.messageHeader}>
              <span>{pad(project.features ? 3 : 2)}</span>
              <h2 id="progress-title">O que já está pronto e o que vem depois</h2>
            </div>
            <div className={styles.progressGrid}>
              <article className={styles.progressDone}>
                <span>Pronto</span>
                <ul>{project.progress.done.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
              <article>
                <span>Próximas etapas</span>
                <ol>{project.progress.next.map((item) => <li key={item}>{item}</li>)}</ol>
              </article>
            </div>
          </section>
        )}
      </main>

      {topics.length > 1 && <CaseFloatingActions sections={topics} />}
      <Footer />
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

// Todas as páginas de projeto recebem as mesmas animações (CaseMotion) e a barra
// lateral de seções (CaseRail). A key faz as duas recomeçarem ao trocar de projeto.
export default async function ProjectPage({ params }) {
  const { slug } = await params;
  return (
    <>
      <CaseMotion key={`motion-${slug}`} />
      <ProjectContent params={params} />
      <CaseRail key={`rail-${slug}`} />
    </>
  );
}

const caseComponents = {
  "governanca-corporativa": GovernancaTeamsCase,
  "atalho-acesso-cursos": CourseAccessCase,
  "criador-pastas-alunos": FolderCreationCase,
  "planner-power-bi": PlannerPowerBICase,
  "account-manager-exportacao-excel": ExportacaoDiariaCase,
  "account-manager-remocao-acesso": AccessExpirationCase,
  "dashboard-vendas": DashboardSalesCase,
};

async function ProjectContent({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  // Estudos de caso escritos à mão (cada um com a sua página).
  const Case = caseComponents[project.slug];
  if (Case) return <Case />;

  if (project.status === "em-desenvolvimento") {
    return <ProjectUnderDevelopment project={project} />;
  }

  // Página gerada pelos dados (Finance, o próprio portfólio): as seções entram na ordem
  // em que existem, e a numeração acompanha.
  const relatedProjects = (project.related ?? [])
    .map((relatedSlug) => getProject(relatedSlug))
    .filter(Boolean);

  const isSite = project.type === "Site";
  const details = [
    ["O problema", project.sections.problem],
    ["A solução", project.sections.solution],
    ["Minha participação", project.sections.role],
    ["Resultado", project.sections.result],
    ["Onde ver", project.sections.evidence],
  ];

  let n = 0;
  const next = () => pad(++n);
  const topics = [];
  if (project.guide) topics.push({ href: "#guide-title", label: "Em poucas palavras" });
  if (project.features) topics.push({ href: "#features-title", label: isSite ? "O que o site tem" : "O que o app faz" });
  topics.push({ href: "#flow-title", label: "Como as partes se conectam" });
  topics.push({ href: "#details-title", label: "Problema, solução e resultado" });
  if (relatedProjects.length) topics.push({ href: "#related-title", label: "Projetos relacionados" });

  return (
    <div className={styles.page} id="top">
      <CaseHeader styles={styles} />

      <main>
        <section className={`${styles.hero} ${project.image ? styles.heroWithShot : ""}`} aria-labelledby="project-title">
          <div className={styles.heroCopy}>
            <div className={styles.heroTop}>
              <p>{categoryLabels[project.category]}</p>
              <span>{statusLabels[project.status]}</span>
            </div>
            <h1 id="project-title">{project.title}</h1>
            <p className={styles.projectGroup}>{project.group} · {project.type}</p>
            <p className={styles.summary}>{project.description}</p>
            <div className={styles.tags}>{project.technologies.map((technologyId) => <TechnologyIcon className={styles.techTag} technology={technologyId} size="sm" showLabel key={technologyId} />)}</div>
            {project.liveUrl && <a className={styles.liveLink} href={project.liveUrl} target="_blank" rel="noreferrer">{project.liveLabel ?? "Abrir o app e testar a demonstração"} <span aria-hidden="true">↗</span></a>}
          </div>
          {project.image && <HeroShot project={project} />}
        </section>

        {project.guide && (
          <ReadingGuide
            className={styles.flowSection}
            plain={project.guide.plain}
            plainLink={{ label: "Ver o resultado", href: "#details-title" }}
            technical={project.guide.technical}
            technicalLink={{ label: "Ver como as partes se conectam", href: "#flow-title" }}
          />
        )}

        {project.features && (
          <section className={styles.flowSection} aria-labelledby="features-title">
            <div className={styles.sectionLabel}><span>{next()}</span><h2 id="features-title">{isSite ? "O que o site tem" : "O que o app faz"}</h2></div>
            <ul className={styles.featureList}>
              {project.features.map((feature, index) => (
                <li key={feature}><span>{pad(index + 1)}</span>{feature}</li>
              ))}
            </ul>
          </section>
        )}

        <section className={styles.flowSection} aria-labelledby="flow-title">
          <div className={styles.sectionLabel}><span>{next()}</span><h2 id="flow-title">Como as partes se conectam</h2></div>
          <p className={styles.sectionIntro}>Da tela até o banco de dados, em ordem.</p>
          <ol className={styles.flow}>
            {project.flow.map((step, index) => (
              <li key={step}><span>{pad(index + 1)}</span><strong>{step}</strong></li>
            ))}
          </ol>
        </section>

        <section className={styles.detailsSection} aria-labelledby="details-title">
          <div className={styles.sectionLabel}><span>{next()}</span><h2 id="details-title">Problema, solução e resultado</h2></div>
          <p className={styles.sectionIntro}>A história do projeto em cinco partes curtas.</p>
          <div className={styles.detailGrid}>
            {details.map(([title, content]) => (
              <article key={title}><h3>{title}</h3><div>{content}</div></article>
            ))}
          </div>
        </section>

        {project.publication && <section className={styles.publicationSection} aria-labelledby="publication-title">
          <div>
            <p className={styles.kicker}>Publicação recomendada</p>
            <h2 id="publication-title">{project.publication}</h2>
          </div>
          <div className={styles.confidentiality}><span>Antes de publicar</span><p>{project.confidentiality}</p></div>
        </section>}

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

      <CaseFloatingActions sections={topics} />
      <Footer />
    </div>
  );
}
