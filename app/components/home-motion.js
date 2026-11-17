"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../page.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function HomeMotion() {
  useEffect(() => {
    const root = document.querySelector("[data-home-motion]");
    if (!root) return undefined;

    const media = gsap.matchMedia();
    let active = true;

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        const find = (selector) => root.querySelector(selector);
        const all = (selector) => gsap.utils.toArray(selector, root);
        const hero = find(`.${styles.hero}`);
        const heroLines = all("#hero-title [data-motion-line]");

        gsap.set(heroLines, { yPercent: 115, autoAlpha: 0, rotationX: 7, transformOrigin: "50% 100%" });
        gsap.timeline({ defaults: { ease: "power4.out" } })
          .fromTo(find(`.${styles.eyebrow}`), { x: -18, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.55 }, 0.14)
          .to(heroLines, { yPercent: 0, autoAlpha: 1, rotationX: 0, duration: 0.88, stagger: 0.12 }, 0.3)
          .fromTo(find(`.${styles.heroText}`), { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 }, 0.73)
          .fromTo(find(`.${styles.heroActions}`), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, 0.9);

        // Entrada e scroll nunca animam a mesma propriedade do mesmo elemento: se o visitante rolar
        // durante a entrada, as duas animações brigariam a cada frame (era isso que "travava").
        // Entrada: fundo (opacidade), moldura da foto, foto, grade e circuito.
        // Scroll: fundo (posição/escala), bloco de texto inteiro e o bloco da foto inteiro.
        const background = find(`.${styles.heroBackground}`);
        const visual = find(`.${styles.heroVisual}`);
        const avatar = find(`.${styles.avatarFrame}`);
        const photo = find(`.${styles.profileImage}`);
        const circuit = find(`.${styles.heroCircuit}`);
        const grid = find(`.${styles.visualGrid}`);
        gsap.fromTo(background, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.1, ease: "power2.out" });
        gsap.timeline({ delay: 0.7 })
          .fromTo(avatar,
            { clipPath: "circle(0% at 50% 50%)", scale: 0.82, rotation: -14 },
            { clipPath: "circle(100% at 50% 50%)", scale: 1, rotation: 0, duration: 1.5, ease: "power3.inOut", clearProps: "clipPath" }, 0)
          .fromTo(photo, { scale: 1.45 }, { scale: 1, duration: 2, ease: "power3.out" }, 0)
          .fromTo(grid, { autoAlpha: 0, scale: 0.88 }, { autoAlpha: 0.35, scale: 1, duration: 1.3, ease: "power3.out" }, 0)
          .fromTo(circuit, { scaleY: 0, autoAlpha: 0, transformOrigin: "50% 0%" }, { scaleY: 1, autoAlpha: 0.85, duration: 0.95, ease: "power3.inOut" }, 0.45)
          .from(circuit.querySelectorAll("span"), { scaleX: 0, transformOrigin: "100% 50%", stagger: 0.1, duration: 0.45, ease: "power2.out" }, 1.05);

        // Scroll: só transform e opacidade (as duas mais baratas para o navegador).
        const parallax = { ease: "none", immediateRender: false };
        gsap.timeline({ scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.4 } })
          .fromTo(background, { yPercent: 0, scale: 1 }, { yPercent: 10, scale: 1.06, ...parallax }, 0)
          .fromTo(find(`.${styles.heroCopy}`), { y: 0, opacity: 1 }, { y: -60, opacity: 0.2, ...parallax }, 0)
          .fromTo(visual, { y: 0, scale: 1, rotation: 0 }, { y: -80, scale: 0.88, rotation: -5, ...parallax }, 0);

        // Tecnologias: mesmo visual da animação original (título subindo, chips com desfoque),
        // mas como gatilho: ao chegar na seção roda uma vez e os chips ficam — não somem ao rolar para cima.
        const tech = find(`.${styles.techSection}`);
        gsap.timeline({ scrollTrigger: { trigger: tech, start: "top 80%", once: true } })
          .from(find("[data-motion-tech-label]"), { x: -26, autoAlpha: 0, duration: 0.55, ease: "power3.out" }, 0)
          .from(all("#tech-title [data-motion-line]"), { yPercent: 110, autoAlpha: 0, rotationX: 5, stagger: 0.12, duration: 0.85, ease: "power4.out" }, 0.12)
          .from(all("[data-motion-tech]"), {
            y: 20,
            scale: 0.93,
            autoAlpha: 0,
            filter: "blur(5px)",
            stagger: 0.045,
            duration: 0.6,
            ease: "power3.out",
            clearProps: "filter",
          }, 0.36);

        const services = find(`.${styles.servicesSection}`);
        gsap.timeline({ scrollTrigger: { trigger: services, start: "top 78%", once: true } })
          .from(find(`[data-motion-services-intro] .${styles.kicker}`), { x: -20, autoAlpha: 0, duration: 0.5 })
          .from(all("#services-title [data-motion-line]"), { yPercent: 110, autoAlpha: 0, rotationX: 5, stagger: 0.11, duration: 0.76, ease: "power4.out" }, "-=0.28");

        // Serviços: os cards entram em sequência. Em cada um, a linha do topo se desenha,
        // o número sobe, o ícone gira para o lugar e as tags entram uma a uma.
        // `batch` agrupa os cards que entram juntos na tela (3 lado a lado no desktop, 1 no celular).
        const serviceCards = all("[data-motion-service]");
        gsap.set(serviceCards, { y: 56, autoAlpha: 0, "--card-line": 0 });
        ScrollTrigger.batch(serviceCards, {
          start: "top 86%",
          once: true,
          onEnter: (batch) => context.add(() => {
            batch.forEach((card, index) => {
              gsap.timeline({ delay: index * 0.14, defaults: { ease: "power3.out" } })
                .to(card, { y: 0, autoAlpha: 1, duration: 0.85, clearProps: "transform,opacity,visibility" })
                .to(card, { "--card-line": 1, duration: 0.95, ease: "power2.inOut" }, 0.18)
                .from(card.querySelector(`.${styles.cardTop}`), { y: 12, autoAlpha: 0, duration: 0.5 }, 0.22)
                .from(card.querySelector(`.${styles.serviceIcon}`), {
                  scale: 0.4,
                  rotation: -40,
                  autoAlpha: 0,
                  duration: 0.8,
                  ease: "back.out(2.1)",
                  clearProps: "transform,opacity,visibility",
                }, 0.3)
                .from(card.querySelectorAll("h3, p"), { y: 18, autoAlpha: 0, stagger: 0.08, duration: 0.6 }, 0.4)
                .from(card.querySelectorAll("li"), { y: 10, scale: 0.88, autoAlpha: 0, stagger: 0.06, duration: 0.45, ease: "back.out(1.6)" }, 0.62);
            });
          }),
        });

        const projects = find(`.${styles.casesSection}`);
        gsap.timeline({ scrollTrigger: { trigger: projects, start: "top 78%", once: true } })
          .from(find(`[data-motion-project-intro] .${styles.kicker}`), { x: -22, autoAlpha: 0, duration: 0.45 })
          .from(all("#cases-title [data-motion-line]"), { yPercent: 112, rotationX: 6, autoAlpha: 0, stagger: 0.1, duration: 0.8, ease: "power4.out" }, "-=0.16")
          .from([find(`.${styles.sectionSubtitle}`), find(`.${styles.sectionAside}`)], { y: 18, autoAlpha: 0, stagger: 0.1, duration: 0.58 }, "-=0.34");

        all("[data-motion-project]").forEach((card, index) => {
          gsap.from(card, {
            y: 64,
            x: index % 2 === 0 ? -15 : 15,
            scale: 0.965,
            rotationX: 4,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          });
        });
        gsap.from(find("[data-motion-project-cta]"), { y: 20, opacity: 0, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: "[data-motion-project-cta]", start: "top 90%", once: true } });

        const about = find(`.${styles.aboutSection}`);
        gsap.timeline({ scrollTrigger: { trigger: about, start: "top 75%", once: true } })
          .from(find("[data-motion-social-post]"), { x: -42, scale: 0.97, autoAlpha: 0, duration: 0.95, ease: "power3.out" })
          .from(find(`[data-motion-about-copy] .${styles.kicker}`), { x: 24, autoAlpha: 0, duration: 0.46 }, "-=0.62")
          .from(all("#about-title [data-motion-line]"), { xPercent: -10, autoAlpha: 0, filter: "blur(4px)", stagger: 0.12, duration: 0.86, ease: "power4.out" }, "-=0.28")
          .from(all(`[data-motion-about-copy] > p:not(.${styles.kicker})`), { y: 16, autoAlpha: 0, stagger: 0.09, duration: 0.58 }, "-=0.4");
        gsap.fromTo(find(`.${styles.socialMedia} img`), { yPercent: -4, scale: 1.1 }, { yPercent: 4, scale: 1.1, ease: "none", scrollTrigger: { trigger: about, start: "top bottom", end: "bottom top", scrub: 0.6 } });

        const socials = find(`.${styles.socialsSection}`);
        gsap.timeline({ scrollTrigger: { trigger: socials, start: "top 78%", once: true } })
          .from(all("#socials-title [data-motion-line]"), { yPercent: 110, autoAlpha: 0, stagger: 0.12, duration: 0.76, ease: "power4.out" })
          .from(find(`.${styles.socialsSubtitle}`), { y: 14, autoAlpha: 0, duration: 0.5 }, "-=0.38")
          .from(all("[data-motion-social-link]"), { x: -20, opacity: 0, stagger: 0.1, duration: 0.58, ease: "power3.out" }, "-=0.1");

        const contact = find("[data-motion-contact]");
        gsap.timeline({ scrollTrigger: { trigger: contact, start: "top 76%", once: true } })
          .from(find(`[data-motion-contact] .${styles.kicker}`), { y: 18, autoAlpha: 0, duration: 0.48 })
          .from(all("#contact-title [data-motion-line]"), { yPercent: 105, scale: 0.96, autoAlpha: 0, filter: "blur(4px)", stagger: 0.12, duration: 0.86, ease: "power4.out" }, "-=0.16")
          .from(find(`[data-motion-contact] > p:not(.${styles.kicker})`), { y: 18, autoAlpha: 0, duration: 0.55 }, "-=0.3")
          .from(find(`.${styles.contactButton}`), { y: 20, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.16")
          .from(find(`.${styles.contactAura}`), { scale: 0.72, autoAlpha: 0, duration: 1.15, ease: "power2.out" }, 0);

        gsap.fromTo(find("[data-motion-progress]"), { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.25 } });
      }, root);
      return () => context.revert();
    });

    media.add("(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const listeners = [];

      // Brilho que acompanha o cursor dentro dos cards de serviço (posição via CSS vars).
      root.querySelectorAll("[data-motion-service]").forEach((card) => {
        const move = (event) => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
          card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
        };
        card.addEventListener("pointermove", move);
        listeners.push(() => {
          card.removeEventListener("pointermove", move);
          card.style.removeProperty("--spot-x");
          card.style.removeProperty("--spot-y");
        });
      });

      root.querySelectorAll("[data-motion-project]").forEach((card) => {
        const rotateX = gsap.quickTo(card, "rotationX", { duration: 0.32, ease: "power2.out" });
        const rotateY = gsap.quickTo(card, "rotationY", { duration: 0.32, ease: "power2.out" });
        const move = (event) => {
          const rect = card.getBoundingClientRect();
          rotateX((0.5 - (event.clientY - rect.top) / rect.height) * 2.4);
          rotateY((((event.clientX - rect.left) / rect.width) - 0.5) * 2.4);
        };
        const leave = () => { rotateX(0); rotateY(0); };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        listeners.push(() => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
          rotateX.tween?.kill();
          rotateY.tween?.kill();
        });
      });
      return () => listeners.forEach((remove) => remove());
    });

    document.fonts?.ready.then(() => { if (active) ScrollTrigger.refresh(); });
    return () => { active = false; media.revert(); };
  }, []);

  return null;
}
