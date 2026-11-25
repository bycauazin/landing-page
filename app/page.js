"use client";

import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { siInstagram } from "simple-icons";
import { useState } from "react";
import ProjectExplorer from "./components/project-explorer";
import HomeMotion from "./components/home-motion";
import RevealText from "./components/reveal-text";
import SocialIcon from "./components/social-icon";
import SocialVideo from "./components/social-video";
import TechnologyIcon from "./components/technology-icon";
import WhatsAppIcon from "./components/whatsapp-icon";
import cards from "./detail-cards.module.css";
import styles from "./page.module.css";
import BrandLogo from "./components/brand-logo";
import HeroCircuitField from "./components/hero-circuit-field";
import SnapCursor from "./components/snap-cursor";
import HeroOutline from "./components/hero-outline";
import MobileMenu from "./components/mobile-menu";
import { useLightMode } from "./components/use-theme";
import PrivateLessons from "./private-lessons";
import CaseRail from "./projetos/[slug]/case-rail";

const mobileLinks = [
  { href: "#projetos", label: "Projetos" },
  { href: "#aulas", label: "Aulas" },
  { href: "#sobre", label: "Sobre" },
  { href: "/projetos", label: "Todos os projetos" },
];

const services = [
  { number: "01", icon: "development", title: "Desenvolvimento web", description: "Sites, landing pages e apps com React, Next.js e Node." },
  { number: "02", icon: "automation", title: "Automação e integração", description: "Power Automate e APIs para cortar tarefas manuais." },
  { number: "03", icon: "data", title: "Dados e dashboards", description: "Power BI e dados organizados para acompanhar o que importa." },
];

// Ícones da faixa "o que eu faço": traço simples em currentColor (segue a cor de destaque do tema).
const skillIcons = {
  development: <><path d="m8 7-5 5 5 5" /><path d="m16 7 5 5-5 5" /><path d="m13.5 4-3 16" /></>,
  automation: <><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /><path d="M6.5 10v3a3.5 3.5 0 0 0 3.5 3.5h4" /><path d="m12 14.5 2 2-2 2" /></>,
  data: <><path d="M3 20h18" /><path d="M6.5 16v-3" /><path d="M11 16V9" /><path d="M15.5 16v-5" /><path d="M20 16V5" /></>,
};

const technologyGroups = [
  { title: "Desenvolvimento web", items: ["html", "css", "javascript", "react", "nextjs", "nodejs"] },
  { title: "Dados e dashboards", items: ["python", "postgresql", "power-bi", "excel"] },
  { title: "Automação e Microsoft 365", items: ["power-automate", "sharepoint"] },
];
const homepageTechnologies = technologyGroups.flatMap((group) => group.items);

// Opções de fundo do hero (em /public/hero): "codigo-monitor-desfocado" (em uso: sem texto legível atrás do título), "codigo-monitor", "dev-noturno" ou "setup-escuro".
const heroBackground = "/hero/codigo-monitor-desfocado.jpg";
// No celular (até 760px) usa um recorte do centro com menos desfoque.
const heroBackgroundMobile = "/hero/codigo-monitor-desfocado-mobile.jpg";
const { props: heroBackgroundProps } = getImageProps({ src: heroBackground, alt: "", fill: true, sizes: "100vw" });

export default function Home() {
  const [lightMode, toggleTheme] = useLightMode();
  const [showAllTech, setShowAllTech] = useState(false);

  return (
    <div className={`${styles.page} ${lightMode ? styles.light : ""}`} data-home-motion="">
      <HomeMotion />
      {/* a varredura entre as seções na rolagem (sem o circuito do mouse, que fica só no hero) */}
      <HeroCircuitField className={styles.pageField} variant="sweep" light={lightMode} />
      {/* cursor "encaixe" na página inteira, junto com o "circuito vivo" do hero */}
      <SnapCursor />
      <CaseRail fitSelector="#projetos" controlsCaseActions={false} />
      <header className={styles.header}>
        <a className={styles.brand} href="#inicio" aria-label="Voltar ao inicio"><BrandLogo className={styles.brandMark} size={42} /><span>bycauazin</span></a>
        <nav className={styles.nav} aria-label="Navegação principal"><a href="#projetos">Projetos</a><a href="#aulas">Aulas</a><a href="#sobre">Sobre</a></nav>
        <div className={styles.headerActions}><button className={styles.themeToggle} type="button" onClick={toggleTheme} aria-label={lightMode ? "Ativar tema escuro" : "Ativar tema claro"} title={lightMode ? "Ativar tema escuro" : "Ativar tema claro"}><span aria-hidden="true">{lightMode ? "☾" : "☼"}</span></button><a className={styles.headerCta} href="#contato">Vamos conversar <span aria-hidden="true">↗</span></a><MobileMenu links={mobileLinks} /></div>
      </header>

      <main>
        <section className={styles.hero} id="inicio" aria-labelledby="hero-title">
          <picture className={styles.heroPicture}>
            <source media="(max-width: 760px)" srcSet={heroBackgroundMobile} />
            <img {...heroBackgroundProps} alt="" className={styles.heroBackground} fetchPriority="high" />
          </picture>
          <span className={styles.heroShade} aria-hidden="true" />
          <HeroCircuitField className={styles.heroField} light={lightMode} />
          <HeroOutline />
          <div className={styles.heroCopy}><p className={styles.eyebrow}><span /> Cauã · desenvolvedor &amp; instrutor</p><RevealText as="h1" id="hero-title" label="Desenvolvimento de sistemas e automação de processos. Ensino na prática." lines={["Desenvolvimento de sistemas e automação de processos.", <em key="teaching">Ensino na prática.</em>]} /><p className={styles.heroText}>Desenvolvimento web, automação e dados para deixar negócios mais simples, conectados e eficientes.</p><div className={styles.heroActions}><a className={styles.buttonPrimary} href="#contato">Falar sobre um projeto <span aria-hidden="true">↗</span></a><a className={styles.textLink} href="#projetos">Ver projetos <span aria-hidden="true">↓</span></a></div></div>
          <div className={styles.heroVisual} aria-label="Foto de perfil de Cauã"><div className={styles.visualGrid} aria-hidden="true" /><div className={styles.heroCircuit} aria-hidden="true"><span /><span /><span /></div><div className={styles.avatarFrame}><Image className={styles.profileImage} src="/foto-perfil.jpg" alt="Cauã usando fones de ouvido" fill preload sizes="(max-width: 760px) 300px, 360px" /></div></div>
        </section>

        <section className={styles.techSection} aria-labelledby="tech-title" data-rail="Tecnologias" data-rail-icon="code" data-circuit-sweep="0">
          <div className={styles.techHeading}><div><p className={styles.kicker} data-motion-tech-label="">Ferramentas do dia a dia</p><RevealText id="tech-title" label="O que eu uso para tirar ideias do papel." lines={["O que eu uso para", <span key="paper">tirar ideias do <em>papel.</em></span>]} /></div><button className={styles.techToggle} type="button" aria-expanded={showAllTech} aria-controls="tech-list" onClick={() => setShowAllTech(!showAllTech)}>{showAllTech ? "Voltar ao carrossel" : `Mostrar tudo (${homepageTechnologies.length})`}<span aria-hidden="true">{showAllTech ? "↺" : "↓"}</span></button></div>
          <div id="tech-list">
            {showAllTech ? (
              <div className={styles.techGrid}>{technologyGroups.map((group, groupIndex) => <div className={styles.techCategory} key={group.title}><h3>{group.title}</h3><div className={styles.techCategoryItems}>{group.items.map((technology, index) => <span className={styles.techAppear} style={{ "--i": groupIndex * 3 + index }} key={technology}><TechnologyIcon className={styles.techItem} technology={technology} size="sm" showLabel /></span>)}</div></div>)}</div>
            ) : (
              <div className={styles.techCarousel}><div className={styles.techTrack}>{[0, 1].map((copy) => <div className={styles.techGroup} aria-hidden={copy === 1 ? true : undefined} key={copy}>{homepageTechnologies.map((technology) => <span data-motion-tech="" key={technology}><TechnologyIcon className={styles.techItem} technology={technology} size="sm" showLabel /></span>)}</div>)}</div></div>
            )}
          </div>
        </section>

        <section className={styles.casesSection} id="projetos" data-circuit-sweep="0" aria-labelledby="cases-title" data-rail="Projetos" data-rail-icon="folder"><div className={styles.sectionHeading} data-motion-project-intro=""><div><p className={styles.kicker}>Projetos</p><RevealText id="cases-title" label="Projetos em destaque" lines={["Projetos em", <em key="featured">destaque</em>]} /><p className={styles.sectionSubtitle}>Desenvolvimento web, automação e dados, na prática.</p></div></div>
          <ul className={`${cards.list} ${styles.skillStrip}`} id="servicos" aria-label="O que eu faço">
            {services.map((service) => (
              <li className={cards.card} data-motion-skill="" key={service.number}>
                <span className={cards.icon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    {skillIcons[service.icon]}
                  </svg>
                </span>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <ProjectExplorer featuredOnly showFilters={false} /><div className={styles.projectsCtaWrap} data-motion-project-cta=""><Link className={styles.buttonPrimary} href="/projetos">Acessar meus projetos <span aria-hidden="true">→</span></Link></div></section>

        <PrivateLessons />

        <section className={styles.aboutSection} id="sobre" data-circuit-sweep="0" aria-labelledby="about-title" data-rail="Sobre mim" data-rail-icon="user"><div className={styles.socialPost} data-motion-social-post=""><div className={styles.socialPostHeader}><Image className={styles.instagramLogo} src="/foto-perfil.jpg" alt="Cauã" width={20} height={20} /><strong>bycauazin</strong><a className={styles.instagramBadge} href="https://www.instagram.com/bycauazin/" target="_blank" rel="noreferrer" aria-label="Ver @bycauazin no Instagram" title="Ver no Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><defs><radialGradient id="ig-gradient" cx="30%" cy="107%" r="150%"><stop offset="0" stopColor="#fdf497" /><stop offset="0.05" stopColor="#fdf497" /><stop offset="0.45" stopColor="#fd5949" /><stop offset="0.6" stopColor="#d6249f" /><stop offset="0.9" stopColor="#285AEB" /></radialGradient></defs><path fill="url(#ig-gradient)" d={siInstagram.path} /></svg><span>Instagram</span></a></div><div className={styles.socialMedia}><SocialVideo /></div><div className={styles.socialPostFooter}><div className={styles.postActions} aria-label="Ações da publicação"><span>♡</span><span>◯</span><span>➤</span></div><span className={styles.postLabel}>Reels no Instagram</span></div></div><div className={styles.aboutCopy} data-motion-about-copy=""><p className={styles.kicker}>Sobre mim</p><RevealText id="about-title" label="Um agoniado inteligente." lines={[<span key="restless">Um <em>agoniado</em></span>, "inteligente."]} /><p>Também crio conteúdo para redes sociais, compartilhando ideias, aprendizados e situações do universo da tecnologia de um jeito direto e autêntico.</p><p>Eu sou o Cauã. Gosto de entender o problema antes de escolher a ferramenta, organizar o que parece confuso e construir algo que realmente ajude no dia a dia.</p><p>Minha praia fica entre desenvolvimento, automação, dados e comunicação. O objetivo é transformar complexidade em clareza.</p></div></section>

        <section className={styles.socialsSection} data-circuit-sweep="-70" aria-labelledby="socials-title" data-rail="Redes sociais" data-rail-icon="globe"><div className={styles.socialsHeading} data-motion-socials-heading=""><RevealText id="socials-title" label="Onde me encontrar" lines={["Onde me", <em key="find">encontrar</em>]} /><p className={styles.socialsSubtitle}>Minhas redes sociais, ideias e conexões.</p></div><div className={styles.socialLinks}><a className={styles.socialLink} data-motion-social-link="" href="https://github.com/bycauazin" target="_blank" rel="noreferrer"><SocialIcon className={styles.socialIcon} social="github" /><span>GitHub</span><span className={styles.socialArrow} aria-hidden="true">↗</span></a><a className={styles.socialLink} data-motion-social-link="" href="https://www.instagram.com/bycauazin/" target="_blank" rel="noreferrer"><SocialIcon className={styles.socialIcon} social="instagram" /><span>Instagram</span><span className={styles.socialArrow} aria-hidden="true">↗</span></a><a className={styles.socialLink} data-motion-social-link="" href="https://www.linkedin.com/in/caua-santana-dev/" target="_blank" rel="noreferrer"><SocialIcon className={styles.socialIcon} social="linkedin" /><span>LinkedIn</span><span className={styles.socialArrow} aria-hidden="true">↗</span></a></div></section>

        <section className={styles.contactSection} id="contato" data-motion-contact="" aria-labelledby="contact-title" data-rail="Contato" data-rail-icon="phone"><span className={styles.contactAura} aria-hidden="true" /><p className={styles.kicker}>Tem um desafio?</p><RevealText id="contact-title" label="Vamos transformar isso em próximo passo." lines={["Vamos transformar isso em", <em key="next">próximo passo.</em>]} /><p>Me conte o que você precisa. A primeira conversa é o começo para entender e desenvolver a solução.</p><a className={styles.contactButton} href="https://wa.me/5521988120757" target="_blank" rel="noreferrer"><WhatsAppIcon size={21} /> Chamar no WhatsApp <span aria-hidden="true">↗</span></a></section>
      </main>

      <footer className={styles.footer}><span>© {new Date().getFullYear()} Cauã · bycauazin</span><div className={styles.socials} aria-label="Redes sociais"><a href="https://github.com/bycauazin" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/caua-santana-dev/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://www.instagram.com/bycauazin/" target="_blank" rel="noreferrer">Instagram</a></div><span>feito com Next.js</span></footer>
    </div>
  );
}
