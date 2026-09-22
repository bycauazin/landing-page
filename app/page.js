"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProjectExplorer from "./components/project-explorer";
import SocialIcon from "./components/social-icon";
import TechnologyIcon from "./components/technology-icon";
import WhatsAppIcon from "./components/whatsapp-icon";
import styles from "./page.module.css";

const services = [
  { number: "01", icon: "development", title: "Desenvolvimento web", description: "Interfaces, landing pages e funcionalidades que transformam ideias em experiências digitais claras.", items: ["Landing pages", "React e Next.js", "APIs com Node.js"] },
  { number: "02", icon: "automation", title: "Automação e integração", description: "Processos conectados para reduzir tarefas manuais e fazer as informações circularem melhor.", items: ["Power Automate", "APIs e HTTP", "Planner e SharePoint"] },
  { number: "03", icon: "data", title: "Dados e dashboards", description: "Organização de dados e painéis que ajudam equipes a acompanhar o que importa.", items: ["Power BI", "Indicadores comerciais", "Organização de dados"] },
];

const homepageTechnologies = ["html", "css", "javascript", "react", "nextjs", "nodejs", "python", "postgresql", "power-bi", "power-automate", "sharepoint", "excel"];

export default function Home() {
  const [lightMode, setLightMode] = useState(false);

  return (
    <div className={`${styles.page} ${lightMode ? styles.light : ""}`}>
      <header className={styles.header}>
        <a className={styles.brand} href="#inicio" aria-label="Voltar ao inicio"><span className={styles.brandMark}>C</span><span>bycauazin</span></a>
        <nav className={styles.nav} aria-label="Navegação principal"><a href="#servicos">Serviços</a><Link href="/projetos">Projetos</Link><a href="#sobre">Sobre</a></nav>
        <div className={styles.headerActions}><button className={styles.themeToggle} type="button" onClick={() => setLightMode(!lightMode)} aria-label={lightMode ? "Ativar tema escuro" : "Ativar tema claro"} title={lightMode ? "Ativar tema escuro" : "Ativar tema claro"}><span aria-hidden="true">{lightMode ? "☾" : "☼"}</span></button><a className={styles.headerCta} href="#contato">Vamos conversar <span aria-hidden="true">↗</span></a></div>
      </header>

      <main>
        <section className={styles.hero} id="inicio" aria-labelledby="hero-title">
          <div className={styles.heroCopy}><p className={styles.eyebrow}><span /> Cauã · desenvolvedor</p><h1 id="hero-title">Transformo ideias e problemas de negócio em <em>soluções digitais.</em></h1><p className={styles.heroText}>Desenvolvimento web, automação e dados para deixar negócios mais simples, conectados e eficientes.</p><div className={styles.heroActions}><a className={styles.buttonPrimary} href="#contato">Falar sobre um projeto <span aria-hidden="true">↗</span></a><a className={styles.textLink} href="#projetos">Ver projetos <span aria-hidden="true">↓</span></a></div></div>
          <div className={styles.heroVisual} aria-label="Foto de perfil de Cauã"><div className={styles.visualGrid} /><div className={styles.heroCircuit} aria-hidden="true"><span /><span /><span /></div><div className={styles.avatarFrame}><Image className={styles.profileImage} src="/foto-perfil.jpg" alt="Cauã usando fones de ouvido" fill priority sizes="(max-width: 760px) 360px, 430px" /></div></div>
          <div className={styles.scrollHint}><span /> role para explorar</div>
        </section>

        <section className={styles.techSection} aria-labelledby="tech-title"><div><p className={styles.kicker}>Ferramentas do dia a dia</p><h2 id="tech-title">O que eu uso para tirar ideias do papel.</h2></div><div className={styles.techList}>{homepageTechnologies.map((technology) => <TechnologyIcon className={styles.techItem} technology={technology} size="sm" showLabel key={technology} />)}</div></section>

        <section className={styles.servicesSection} id="servicos" aria-labelledby="services-title"><div className={styles.sectionIntro}><p className={styles.kicker}>Como posso ajudar</p><h2 id="services-title">Tecnologia com contexto de negócio.</h2></div><div className={styles.serviceGrid}>{services.map((service) => <article className={styles.serviceCard} key={service.number}><div className={styles.cardTop}><span>{service.number}</span><span aria-hidden="true">↗</span></div><div className={styles.serviceIcon} aria-hidden="true"><svg><use href={`/tech-icons.svg#${service.icon}`} /></svg></div><h3>{service.title}</h3><p>{service.description}</p><ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div></section>

        <section className={styles.casesSection} id="projetos" aria-labelledby="cases-title"><div className={styles.sectionHeading}><div><p className={styles.kicker}>Projetos</p><h2 id="cases-title">Projetos em destaque</h2><p className={styles.sectionSubtitle}>Soluções que conectam tecnologias.</p></div><p className={styles.sectionAside}>Soluções desenvolvidas com diferentes tecnologias, integrações e ferramentas.</p></div><ProjectExplorer featuredOnly showFilters={false} /><div className={styles.projectsCtaWrap}><Link className={styles.buttonPrimary} href="/projetos">Acessar meus projetos <span aria-hidden="true">→</span></Link></div></section>

        <section className={styles.aboutSection} id="sobre" aria-labelledby="about-title"><div className={styles.socialPost}><div className={styles.socialPostHeader}><Image className={styles.instagramLogo} src="/instagram-logo.svg" alt="Instagram" width={20} height={20} /><strong>bycauazin</strong><span className={styles.moreIcon}>•••</span></div><div className={styles.socialMedia}><Image src="/foto-instagram.jpg" alt="Cauã criando conteúdo para redes sociais" fill sizes="(max-width: 760px) 100vw, 430px" /></div><div className={styles.socialPostFooter}><div className={styles.postActions} aria-label="Ações da publicação"><span>♡</span><span>◯</span><span>➤</span></div><span className={styles.postLabel}>vídeo curto</span></div></div><div className={styles.aboutCopy}><p className={styles.kicker}>Sobre mim</p><h2 id="about-title">Um agoniado inteligente.</h2><p>Também crio conteúdo para redes sociais, compartilhando ideias, aprendizados e situações do universo da tecnologia de um jeito direto e autêntico.</p><p>Eu sou o Cauã. Gosto de entender o problema antes de escolher a ferramenta, organizar o que parece confuso e construir algo que realmente ajude no dia a dia.</p><p>Minha praia fica entre desenvolvimento, automação, dados e comunicação. O objetivo é transformar complexidade em clareza.</p></div></section>

        <section className={styles.socialsSection} aria-labelledby="socials-title"><div className={styles.socialsHeading}><h2 id="socials-title">Onde me encontrar</h2><p className={styles.socialsSubtitle}>Minhas redes sociais, ideias e conexões.</p></div><div className={styles.socialLinks}><a className={styles.socialLink} href="https://github.com/bycauazin" target="_blank" rel="noreferrer"><SocialIcon className={styles.socialIcon} social="github" /><span>GitHub</span><span className={styles.socialArrow} aria-hidden="true">↗</span></a><a className={styles.socialLink} href="https://www.instagram.com/bycauazin/" target="_blank" rel="noreferrer"><SocialIcon className={styles.socialIcon} social="instagram" /><span>Instagram</span><span className={styles.socialArrow} aria-hidden="true">↗</span></a><a className={styles.socialLink} href="https://www.linkedin.com/in/caua-santana-dev/" target="_blank" rel="noreferrer"><SocialIcon className={styles.socialIcon} social="linkedin" /><span>LinkedIn</span><span className={styles.socialArrow} aria-hidden="true">↗</span></a></div></section>

        <section className={styles.contactSection} id="contato" aria-labelledby="contact-title"><p className={styles.kicker}>Tem um desafio?</p><h2 id="contact-title">Vamos transformar isso em <em>próximo passo.</em></h2><p>Me conte o que você precisa. A primeira conversa é o começo para entender e desenvolver a solução.</p><a className={styles.contactButton} href="https://wa.me/5521988120757" target="_blank" rel="noreferrer"><WhatsAppIcon size={21} /> Chamar no WhatsApp <span aria-hidden="true">↗</span></a></section>
      </main>

      <footer className={styles.footer}><span>© {new Date().getFullYear()} Cauã · bycauazin</span><div className={styles.socials} aria-label="Redes sociais"><a href="https://github.com/bycauazin" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/caua-santana-dev/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://www.instagram.com/bycauazin/" target="_blank" rel="noreferrer">Instagram</a></div><span>feito com Next.js</span></footer>
    </div>
  );
}
