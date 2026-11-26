import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryLabels, getProject, projects, statusLabels } from "../../data/projects";
import TechnologyIcon from "../../components/technology-icon";
import AccessExpirationCase from "./access-expiration-case";
import CaseFloatingActions from "./case-floating-actions";
import CaseGallery from "./case-gallery";
import CaseHeader from "./case-header";
import CaseMotion from "./case-motion";
import CaseRail from "./case-rail";
import { Icon, SectionIcon, iconFor } from "./case-icons";
import { ReadingGuide } from "./case-shared";
import CourseAccessCase from "./course-access-case";
import DashboardSalesCase from "./dashboard-sales-case";
import ExportacaoDiariaCase from "./exportacao-diaria-case";
import FolderCreationCase from "./folder-creation-case";
import PlannerPowerBICase from "./planner-power-bi-case";
import styles from "./project.module.css";

// Recurso: { icon, title, text } (ou só um texto, que ganha o ícone pelas palavras).
const asFeature = (f) => (typeof f === "string" ? { icon: iconFor(f), title: f, text: "" } : f);

// Título de seção: ícone no lugar do antigo número "01", "02".
function SectionTitle({ icon, id, title, intro }) {
  return (
    <>
      <div className={styles.sectionLabel}><SectionIcon name={icon} label={title} /><h2 id={id}>{title}</h2></div>
      {intro && <p className={styles.sectionIntro}>{intro}</p>}
    </>
  );
}

function FeatureGrid({ features }) {
  return (
    <ul className={styles.featureGrid}>
      {features.map(asFeature).map((f) => (
        <li key={f.title}>
          <span className={styles.featureIcon}><Icon name={f.icon} label={f.title} /></span>
          <div><strong>{f.title}</strong>{f.text && <p>{f.text}</p>}</div>
        </li>
      ))}
    </ul>
  );
}

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
            <SectionIcon name="flag" />
            <h2 id="dev-title">Em desenvolvimento</h2>
          </div>

          <div className={styles.messageBody}>
            {project.developmentSummary && <p>{project.developmentSummary}</p>}
            <p>A cada etapa concluída, esta página ganha telas e novidades.</p>
          </div>
        </section>

        {project.features && (
          <section className={styles.developmentMessage} aria-labelledby="features-title">
            <div className={styles.messageHeader}>
              <SectionIcon name="list" />
              <h2 id="features-title">O que está sendo construído</h2>
            </div>
            <FeatureGrid features={project.features} />
          </section>
        )}

        {project.progress && (
          <section className={styles.developmentMessage} aria-labelledby="progress-title">
            <div className={styles.messageHeader}>
              <SectionIcon name="result" />
              <h2 id="progress-title">O que já está pronto e o que vem depois</h2>
            </div>
            <div className={styles.progressGrid}>
              <article className={styles.progressDone}>
                <span><Icon name="check" /> Pronto</span>
                <ul>{project.progress.done.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
              <article>
                <span><Icon name="arrow" /> Próximas etapas</span>
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

  // Página gerada pelos dados (Cacau, o próprio portfólio).
  const relatedProjects = (project.related ?? [])
    .map((relatedSlug) => getProject(relatedSlug))
    .filter(Boolean);

  const isSite = project.type === "Site";
  const host = project.liveUrl ? project.liveUrl.replace(/^https?:\/\//, "") : project.title;
  const story = [
    ["problem", "O problema", project.sections.problem],
    ["solution", "A solução", project.sections.solution],
    ["result", "O resultado", project.sections.result],
  ];

  const topics = [];
  if (project.guide) topics.push({ href: "#guide-title", label: "Resumo" });
  if (project.screens) topics.push({ href: "#screens-title", label: "As telas" });
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
            plainLink={project.screens ? { label: "Ver as telas", href: "#screens-title" } : { label: "Ver o resultado", href: "#details-title" }}
            technical={project.guide.technical}
            technicalLink={{ label: "Ver como as partes se conectam", href: "#flow-title" }}
          />
        )}

        {project.screens && (
          <section className={styles.flowSection} aria-labelledby="screens-title" data-rail="As telas" data-rail-icon="screen">
            <SectionTitle icon="screen" id="screens-title" title="As telas" intro={isSite ? "Do próprio site, como está no ar." : "Da conta de demonstração, com dados fictícios."} />
            <CaseGallery screens={project.screens} host={host} />
          </section>
        )}

        {project.features && (
          <section className={styles.flowSection} aria-labelledby="features-title">
            <SectionTitle icon="list" id="features-title" title={isSite ? "O que o site tem" : "O que o app faz"} />
            <FeatureGrid features={project.features} />
          </section>
        )}

        <section className={styles.flowSection} aria-labelledby="flow-title">
          <SectionTitle icon="flow" id="flow-title" title="Como as partes se conectam" />
          <ol className={styles.pipeline}>
            {project.flow.map((step) => {
              const item = typeof step === "string" ? { icon: iconFor(step), label: step } : step;
              return (
                <li key={item.label}>
                  <span className={styles.pipelineIcon}><Icon name={item.icon} label={item.label} /></span>
                  <strong>{item.label}</strong>
                  {item.note && <small>{item.note}</small>}
                </li>
              );
            })}
          </ol>
        </section>

        <section className={styles.detailsSection} aria-labelledby="details-title">
          <SectionTitle icon="result" id="details-title" title="Problema, solução e resultado" />
          <div className={styles.storyGrid}>
            {story.map(([icon, title, text]) => (
              <article key={title}>
                <span className={styles.featureIcon}><Icon name={icon} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <ul className={styles.storyMeta}>
            <li><Icon name="user" /><span><strong>Minha parte:</strong> {project.sections.role}</span></li>
            <li><Icon name="eye" /><span><strong>Onde ver:</strong> {project.sections.evidence}</span></li>
          </ul>
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

      <CaseFloatingActions sections={topics} />
      <Footer />
    </div>
  );
}
