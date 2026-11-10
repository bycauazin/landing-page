"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import homeStyles from "../page.module.css";
import styles from "../projetos/projects.module.css";

gsap.registerPlugin(ScrollTrigger);

// Animações da página "Meus projetos", no mesmo estilo da home.
export default function ProjectsMotion() {
  useEffect(() => {
    const root = document.querySelector("[data-projects-motion]");
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        const find = (selector) => root.querySelector(selector);
        const hero = find(`.${styles.projectsHero}`);

        gsap.timeline({ defaults: { ease: "power4.out" } })
          .from(find(`.${homeStyles.header}`), { y: -18, autoAlpha: 0, duration: 0.6 }, 0)
          .from(hero.querySelector(`.${homeStyles.kicker}`), { x: -20, autoAlpha: 0, duration: 0.55 }, 0.15)
          .fromTo(
            gsap.utils.toArray("#projects-title [data-motion-line]", root),
            { yPercent: 115, autoAlpha: 0, rotationX: 7, transformOrigin: "50% 100%" },
            { yPercent: 0, autoAlpha: 1, rotationX: 0, duration: 1, stagger: 0.12 },
            0.25,
          )
          .from(hero.querySelectorAll(":scope > p:not(:first-child), :scope > span"), { y: 20, autoAlpha: 0, stagger: 0.1, duration: 0.7 }, 0.62)
          .from(find(`.${homeStyles.filterControls}`), { y: 16, autoAlpha: 0, duration: 0.6, clearProps: "transform" }, 0.85);

        // Cards sobem ao entrar na tela (mesma animação dos destaques da home).
        gsap.utils.toArray("[data-motion-project]", root).forEach((card, index) => {
          gsap.from(card, {
            y: 64,
            x: index % 2 === 0 ? -15 : 15,
            scale: 0.965,
            rotationX: 4,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 92%", once: true },
          });
        });

        gsap.fromTo("[data-motion-progress]", { scaleY: 0 }, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.25 },
        });
      }, root);
      return () => context.revert();
    });

    // Inclinação 3D no hover. Delegação de eventos: continua funcionando
    // nos cards novos que aparecem quando o filtro de tecnologia muda.
    media.add("(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const tilts = new Map();
      const tiltFor = (card) => {
        if (!tilts.has(card)) {
          tilts.set(card, {
            x: gsap.quickTo(card, "rotationX", { duration: 0.32, ease: "power2.out" }),
            y: gsap.quickTo(card, "rotationY", { duration: 0.32, ease: "power2.out" }),
          });
        }
        return tilts.get(card);
      };
      const move = (event) => {
        const card = event.target.closest?.("[data-motion-project]");
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const tilt = tiltFor(card);
        tilt.x((0.5 - (event.clientY - rect.top) / rect.height) * 2.4);
        tilt.y(((event.clientX - rect.left) / rect.width - 0.5) * 2.4);
      };
      const leave = (event) => {
        const card = event.target.closest?.("[data-motion-project]");
        if (!card || card.contains(event.relatedTarget)) return;
        const tilt = tiltFor(card);
        tilt.x(0);
        tilt.y(0);
      };
      root.addEventListener("pointermove", move);
      root.addEventListener("pointerout", leave);
      return () => {
        root.removeEventListener("pointermove", move);
        root.removeEventListener("pointerout", leave);
        tilts.forEach((tilt) => { tilt.x.tween?.kill(); tilt.y.tween?.kill(); });
      };
    });

    // O filtro muda a altura da lista: recalcula as posições dos gatilhos de scroll.
    const catalog = root.querySelector(`.${styles.catalogSection}`);
    const observer = catalog ? new ResizeObserver(() => ScrollTrigger.refresh()) : null;
    if (catalog) observer.observe(catalog);

    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => {
      observer?.disconnect();
      media.revert();
    };
  }, []);

  return null;
}
