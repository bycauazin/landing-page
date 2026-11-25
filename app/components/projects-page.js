"use client";

import Link from "next/link";
import ProjectExplorer from "./project-explorer";
import ProjectsMotion from "./projects-motion";
import RevealText from "./reveal-text";
import homeStyles from "../page.module.css";
import styles from "../projetos/projects.module.css";
import BrandLogo from "./brand-logo";
import HeroCircuitField from "./hero-circuit-field";
import MobileMenu from "./mobile-menu";
import SnapCursor from "./snap-cursor";
import { useLightMode } from "./use-theme";

const mobileLinks = [
  { href: "/", label: "Início" },
  { href: "/projetos", label: "Projetos", current: true },
  { href: "/#sobre", label: "Sobre" },
];

export default function ProjectsPage() {
  const [lightMode, toggleTheme] = useLightMode();

  return (
    <div className={`${homeStyles.page} ${lightMode ? homeStyles.light : ""}`} data-projects-motion="">
      {/* Igual à home: só a varredura entre as seções na rolagem. O circuito que seguia o mouse
          pela página inteira atrapalhava a leitura dos cartões e saiu daqui. */}
      <HeroCircuitField className={homeStyles.pageField} variant="sweep" light={lightMode} />
      <SnapCursor />
      <ProjectsMotion />
      <div className={homeStyles.progressRail} aria-hidden="true"><span data-motion-progress="" /></div>
      <header className={homeStyles.header}>
        <Link className={homeStyles.brand} href="/" aria-label="Voltar ao início"><BrandLogo className={homeStyles.brandMark} size={42} /><span>bycauazin</span></Link>
        <nav className={homeStyles.nav} aria-label="Navegação principal"><Link href="/projetos" aria-current="page">Projetos</Link><Link href="/#sobre">Sobre</Link></nav>
        <div className={homeStyles.headerActions}>
          <button className={homeStyles.themeToggle} type="button" onClick={toggleTheme} aria-label={lightMode ? "Ativar tema escuro" : "Ativar tema claro"} title={lightMode ? "Ativar tema escuro" : "Ativar tema claro"}><span aria-hidden="true">{lightMode ? "☾" : "☼"}</span></button>
          <Link className={homeStyles.headerCta} href="/#contato">Vamos conversar <span aria-hidden="true">↗</span></Link>
          <MobileMenu links={mobileLinks} />
        </div>
      </header>

      <main>
        <section className={styles.projectsHero} aria-labelledby="projects-title">
          <p className={homeStyles.kicker}>Portfólio</p>
          <RevealText as="h1" id="projects-title" label="Meus projetos" lines={[<span key="mine">Meus <em>projetos</em></span>]} />
          <p>Soluções desenvolvidas com diferentes tecnologias, integrações e ferramentas.</p>
          <span>Filtre os projetos pelas tecnologias utilizadas.</span>
        </section>

        <section className={styles.catalogSection} aria-label="Lista de projetos" data-circuit-sweep="0">
          <ProjectExplorer />
        </section>
      </main>

      <footer className={homeStyles.footer}>
        <span>© {new Date().getFullYear()} Cauã · bycauazin</span>
        <div className={homeStyles.socials} aria-label="Redes sociais"><a href="https://github.com/bycauazin" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/caua-santana-dev/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://www.instagram.com/bycauazin/" target="_blank" rel="noreferrer">Instagram</a></div>
        <span>feito com Next.js</span>
      </footer>
    </div>
  );
}
