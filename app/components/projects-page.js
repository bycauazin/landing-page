"use client";

import Link from "next/link";
import { useState } from "react";
import ProjectExplorer from "./project-explorer";
import homeStyles from "../page.module.css";
import styles from "../projetos/projects.module.css";

export default function ProjectsPage() {
  const [lightMode, setLightMode] = useState(false);

  return (
    <div className={`${homeStyles.page} ${lightMode ? homeStyles.light : ""}`}>
      <header className={homeStyles.header}>
        <Link className={homeStyles.brand} href="/" aria-label="Voltar ao início"><span className={homeStyles.brandMark}>C</span><span>bycauazin</span></Link>
        <nav className={homeStyles.nav} aria-label="Navegação principal"><Link href="/#servicos">Serviços</Link><Link href="/projetos" aria-current="page">Projetos</Link><Link href="/#sobre">Sobre</Link></nav>
        <div className={homeStyles.headerActions}>
          <button className={homeStyles.themeToggle} type="button" onClick={() => setLightMode(!lightMode)} aria-label={lightMode ? "Ativar tema escuro" : "Ativar tema claro"} title={lightMode ? "Ativar tema escuro" : "Ativar tema claro"}><span aria-hidden="true">{lightMode ? "☾" : "☼"}</span></button>
          <Link className={homeStyles.headerCta} href="/#contato">Vamos conversar <span aria-hidden="true">↗</span></Link>
        </div>
      </header>

      <main>
        <section className={styles.projectsHero} aria-labelledby="projects-title">
          <p className={homeStyles.kicker}>Portfólio</p>
          <h1 id="projects-title">Meus projetos</h1>
          <p>Soluções desenvolvidas com diferentes tecnologias, integrações e ferramentas.</p>
          <span>Filtre os projetos pelas tecnologias utilizadas.</span>
        </section>

        <section className={styles.catalogSection} aria-label="Lista de projetos">
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
