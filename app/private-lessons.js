import TechnologyIcon from "./components/technology-icon";
import WhatsAppIcon from "./components/whatsapp-icon";
import { Icon } from "./projetos/[slug]/case-icons";
import homeStyles from "./page.module.css";
import styles from "./private-lessons.module.css";

const topics = [
  { technology: "power-bi", label: "Power BI" },
  { technology: "excel", label: "Excel" },
  { technology: "python", label: "Python" },
  { technology: "javascript", label: "JavaScript" },
  { technology: "postgresql", label: "SQL / PostgreSQL" },
];

const resources = [
  {
    icon: "file",
    title: "Materiais e apostilas",
    description: "Material de apoio para acompanhar a aula e revisar o conteúdo depois.",
  },
  {
    icon: "check",
    title: "Exercícios práticos",
    description: "Atividades para praticar o que foi explicado e tirar dúvidas durante a aula.",
  },
  {
    icon: "code",
    title: "Projetos dos alunos",
    description: "Você desenvolve projetos durante as aulas e reúne o que aprendeu em algo que pode mostrar.",
  },
];

export default function PrivateLessons() {
  return (
    <section className={styles.section} id="aulas" aria-labelledby="aulas-title">
      <div className={styles.overview}>
        <div>
          <p className={homeStyles.kicker}>Aprenda na prática</p>
          <h2 id="aulas-title">Aulas <em>particulares</em></h2>
          <p className={styles.intro}>
            Sou o Cauã, instrutor e ex-coordenador de uma escola de cursos.
            Dou aulas de programação, planilhas e análise de dados com exercícios e projetos feitos durante as aulas.
          </p>
          <a
            className={homeStyles.buttonPrimary}
            href="https://wa.me/5521988120757?text=Oi%2C%20Cau%C3%A3%21%20Quero%20saber%20mais%20sobre%20as%20aulas%20particulares."
            target="_blank"
            rel="noreferrer"
          >
            <WhatsAppIcon size={18} />
            Conversar sobre as aulas
          </a>
        </div>

        <div className={styles.panel}>
          <h3>O que eu ensino</h3>
          <ul className={styles.topics}>
            {topics.map(({ technology, label }) => (
              <li className={styles.topic} key={technology}>
                <TechnologyIcon technology={technology} size="sm" decorative />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.details}>
        <h3>O que faz parte das aulas</h3>
        <ul className={styles.resources}>
          {resources.map(({ icon, title, description }) => (
            <li className={styles.panel} key={title}>
              <span className={styles.resourceIcon}><Icon name={icon} /></span>
              <div>
                <h4>{title}</h4>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
