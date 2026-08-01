"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./page.module.css";

const services = [
  { number: "01", icon: "</>", title: "Desenvolvimento web", description: "Interfaces, landing pages e funcionalidades que transformam ideias em experiências digitais claras.", items: ["Landing pages", "React e Next.js", "APIs com Node.js"] },
  { number: "02", icon: "automation", title: "Automação e integração", description: "Processos conectados para reduzir tarefas manuais e fazer as informações circularem melhor.", items: ["Power Automate", "APIs e HTTP", "Planner e SharePoint"] },
  { number: "03", icon: "data", title: "Dados e dashboards", description: "Organização de dados e painéis que ajudam equipes a acompanhar o que importa.", items: ["Power BI", "Indicadores comerciais", "Organização de dados"] },
];

const cases = [
  { type: "Caso profissional", title: "Do Planner ao dashboard", description: "Uma solução que conecta Planner, Power Automate, SharePoint e Power BI para transformar tarefas em visibilidade para o negócio.", tags: ["Power Automate", "SharePoint", "Power BI"] },
  { type: "Caso profissional", title: "Dashboard comercial", description: "Painel para acompanhar dados e indicadores da área de vendas com mais clareza e agilidade.", tags: ["Power BI", "Dados", "Vendas"] },
  { type: "Em desenvolvimento", title: "Projetos autorais", description: "Um espaço reservado para apresentar meus projetos de finanças pessoais e organização de rotina.", tags: ["Finanças", "Rotina", "Em breve"] },
];

const technologies = [
  ["javascript", "JavaScript"],
  ["react", "React"],
  ["next", "Next.js"],
  ["node", "Node.js"],
  ["python", "Python"],
  ["sql", "SQL"],
  ["powerbi", "Power BI"],
  ["powerautomate", "Power Automate"],
  ["sharepoint", "SharePoint"],
  ["excel", "Excel"],
];

export default function Home() {
  const [lightMode, setLightMode] = useState(false);

  return (
    <div className={`${styles.page} ${lightMode ? styles.light : ""}`}>
      <header className={styles.header}>
        <a className={styles.brand} href="#inicio" aria-label="Voltar ao inicio"><span className={styles.brandMark}>C</span><span>bycauazin</span></a>
        <nav className={styles.nav} aria-label="Navegacao principal"><a href="#servicos">Servicos</a><a href="#projetos">Projetos</a><a href="#sobre">Sobre</a></nav>
        <div className={styles.headerActions}><button className={styles.themeToggle} type="button" onClick={() => setLightMode(!lightMode)} aria-label={lightMode ? "Ativar tema escuro" : "Ativar tema claro"} title={lightMode ? "Ativar tema escuro" : "Ativar tema claro"}><span aria-hidden="true">{lightMode ? "☾" : "☼"}</span></button><a className={styles.headerCta} href="#contato">Vamos conversar <span aria-hidden="true">↗</span></a></div>
      </header>

      <main>
        <section className={styles.hero} id="inicio" aria-labelledby="hero-title">
          <div className={styles.heroCopy}><p className={styles.eyebrow}><span /> Cauã · desenvolvimento digital</p><h1 id="hero-title">Transformo ideias e problemas de negócio em <em>soluções digitais.</em></h1><p className={styles.heroText}>Desenvolvimento web, automação e dados para deixar negócios mais simples, conectados e eficientes.</p><div className={styles.heroActions}><a className={styles.buttonPrimary} href="#contato">Falar sobre um projeto <span aria-hidden="true">↗</span></a><a className={styles.textLink} href="#projetos">Ver projetos <span aria-hidden="true">↓</span></a></div></div>
          <div className={styles.heroVisual} aria-label="Foto de perfil de Cauã"><div className={styles.visualGrid} /><div className={styles.heroCircuit} aria-hidden="true"><span /><span /><span /></div><div className={styles.avatarFrame}><Image className={styles.profileImage} src="/foto-perfil.jpg" alt="Cauã usando fones de ouvido" fill priority sizes="(max-width: 760px) 360px, 430px" /></div></div>
          <div className={styles.scrollHint}><span /> role para explorar</div>
        </section>

        <section className={styles.techSection} aria-labelledby="tech-title"><div><p className={styles.kicker}>Ferramentas do dia a dia</p><h2 id="tech-title">O que eu uso para tirar ideias do papel.</h2></div><div className={styles.techList}>{technologies.map(([icon, technology]) => <span className={styles.techItem} key={technology}><svg className={styles.techLogo} aria-hidden="true"><use href={`/tech-icons.svg#${icon}`} /></svg><span>{technology}</span></span>)}</div></section>

        <section className={styles.servicesSection} id="servicos" aria-labelledby="services-title"><div className={styles.sectionIntro}><p className={styles.kicker}>Como posso ajudar</p><h2 id="services-title">Tecnologia com contexto de negócio.</h2></div><div className={styles.serviceGrid}>{services.map((service) => <article className={styles.serviceCard} key={service.number}><div className={styles.cardTop}><span>{service.number}</span><span aria-hidden="true">↗</span></div><div className={styles.serviceIcon} aria-hidden="true">{service.icon === "</>" ? service.icon : <svg><use href={`/tech-icons.svg#${service.icon}`} /></svg>}</div><h3>{service.title}</h3><p>{service.description}</p><ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div></section>

        <section className={styles.casesSection} id="projetos" aria-labelledby="cases-title"><div className={styles.sectionHeading}><div><p className={styles.kicker}>Experiência e ideias</p><h2 id="cases-title">Projetos que conectam as pontas.</h2></div><p className={styles.sectionAside}>Casos reais, aprendizados práticos e ideias em construção.</p></div><div className={styles.caseList}>{cases.map((item, index) => <article className={styles.caseItem} key={item.title}><span className={styles.caseIndex}>0{index + 1}</span><div className={styles.caseContent}><p className={styles.caseType}>{item.type}</p><h3>{item.title}</h3><p>{item.description}</p><div className={styles.tags}>{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><span className={styles.caseArrow} aria-hidden="true">↗</span></article>)}</div></section>

        <section className={styles.aboutSection} id="sobre" aria-labelledby="about-title"><div className={styles.socialPost}><div className={styles.socialPostHeader}><Image className={styles.instagramLogo} src="/instagram-logo.svg" alt="Instagram" width={20} height={20} /><strong>bycauazin</strong><span className={styles.moreIcon}>•••</span></div><div className={styles.socialMedia}><Image src="/foto-instagram.jpg" alt="Cauã criando conteúdo para redes sociais" fill sizes="(max-width: 760px) 100vw, 430px" /></div><div className={styles.socialPostFooter}><div className={styles.postActions} aria-label="Ações da publicação"><span>♡</span><span>◯</span><span>➤</span></div><span className={styles.postLabel}>vídeo curto</span></div></div><div className={styles.aboutCopy}><p className={styles.kicker}>Sobre mim</p><h2 id="about-title">Um agoniado inteligente.</h2><p>Também crio conteúdo para redes sociais, compartilhando ideias, aprendizados e situações do universo da tecnologia de um jeito direto e autêntico.</p><p>Eu sou o Cauã. Gosto de entender o problema antes de escolher a ferramenta, organizar o que parece confuso e construir algo que realmente ajude no dia a dia.</p><p>Minha praia fica entre desenvolvimento, automação, dados e comunicação. O objetivo é transformar complexidade em clareza.</p></div></section>

        <section className={styles.socialsSection} aria-labelledby="socials-title"><div className={styles.socialsHeading}><h2 id="socials-title">Onde me encontrar</h2><p className={styles.socialsSubtitle}>Minhas redes sociais, ideias e conexões.</p></div><div className={styles.socialLinks}><a className={styles.socialLink} href="https://github.com/" target="_blank" rel="noreferrer"><span className={styles.socialIcon} aria-hidden="true">◖</span><span>GitHub</span><span className={styles.socialArrow} aria-hidden="true">↗</span></a><a className={styles.socialLink} href="https://tiktok.com/" target="_blank" rel="noreferrer"><span className={styles.socialIcon} aria-hidden="true">♪</span><span>TikTok</span><span className={styles.socialArrow} aria-hidden="true">↗</span></a><a className={styles.socialLink} href="https://instagram.com/" target="_blank" rel="noreferrer"><Image className={styles.socialImageIcon} src="/instagram-logo.svg" alt="" width={22} height={22} /><span>Instagram</span><span className={styles.socialArrow} aria-hidden="true">↗</span></a><a className={styles.socialLink} href="https://linkedin.com/" target="_blank" rel="noreferrer"><span className={styles.socialIcon} aria-hidden="true">in</span><span>LinkedIn</span><span className={styles.socialArrow} aria-hidden="true">↗</span></a></div></section>

        <section className={styles.contactSection} id="contato" aria-labelledby="contact-title"><p className={styles.kicker}>Tem um desafio?</p><h2 id="contact-title">Vamos transformar isso em <em>próximo passo.</em></h2><p>Me conte o que você precisa. A primeira conversa é o começo para entender se posso ajudar.</p><a className={styles.contactButton} href="https://wa.me/SEU_NUMERO" target="_blank" rel="noreferrer">Chamar no WhatsApp <span aria-hidden="true">↗</span></a></section>
      </main>

      <footer className={styles.footer}><span>© {new Date().getFullYear()} Cauã · bycauazin</span><div className={styles.socials} aria-label="Redes sociais"><a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a><a href="https://instagram.com/" target="_blank" rel="noreferrer">Instagram</a><a href="https://tiktok.com/" target="_blank" rel="noreferrer">TikTok</a></div><span>feito com intenção</span></footer>
    </div>
  );
}
