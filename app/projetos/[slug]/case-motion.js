"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./case-motion.module.css";

gsap.registerPlugin(ScrollTrigger);

// Elementos que animam individualmente (cards, itens de lista, tabelas, imagens...).
const ITEM = "article, li, figure, blockquote, pre, table, img";

// Percorre uma seção e devolve, em ordem, os alvos da animação:
// cada ITEM conta como um alvo; blocos sem nenhum ITEM dentro (títulos, parágrafos) também.
// Assim nada é animado duas vezes (um card e o card dentro dele).
function collectTargets(node) {
  const targets = [];
  for (const child of node.children) {
    if (child.matches(ITEM)) targets.push(child);
    else if (child.querySelector(ITEM)) targets.push(...collectTargets(child));
    else targets.push(child);
  }
  return targets;
}

const isHeading = (el) => el.matches("h1, h2") || Boolean(el.querySelector(":scope > h2"));

// Animações genéricas das páginas de projeto. Funciona com qualquer estudo de caso
// porque se baseia na estrutura (main > section) e não nas classes de cada página.
export default function CaseMotion() {
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return undefined;

    const media = gsap.matchMedia();
    const restoreCounters = [];

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        const [hero, ...sections] = main.querySelectorAll(":scope > section, :scope > nav");
        const header = document.querySelector("body header");

        // Barra de progresso de leitura no topo.
        gsap.fromTo("[data-case-progress]", { scaleX: 0 }, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
        });

        // Entrada: header desce, elementos do hero entram em cascata (título com mais força).
        const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
        if (header) intro.from(header, { y: -18, autoAlpha: 0, duration: 0.6 }, 0);
        if (hero) {
          intro.from(collectTargets(hero), {
            y: (_, el) => (el.matches("h1") ? 70 : 28),
            rotationX: (_, el) => (el.matches("h1") ? 8 : 0),
            autoAlpha: 0,
            filter: "blur(6px)",
            duration: 1,
            stagger: 0.08,
            transformOrigin: "50% 100%",
            clearProps: "transform,filter",
          }, 0.12);
        }

        // Seções: o título desliza da esquerda; o restante sobe em sequência ao entrar na tela.
        const targets = sections.flatMap((section) => collectTargets(section));
        gsap.set(targets, {
          autoAlpha: 0,
          x: (_, el) => (isHeading(el) ? -32 : 0),
          y: (_, el) => (isHeading(el) ? 0 : 36),
        });
        ScrollTrigger.batch(targets, {
          start: "top 90%",
          once: true,
          onEnter: (batch) => context.add(() => {
            gsap.to(batch, {
              x: 0,
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              stagger: 0.07,
              ease: "power3.out",
              clearProps: "transform,opacity,visibility",
            });
          }),
        });

        // Números em destaque (ex.: "60%") contam de 0 até o valor quando aparecem.
        main.querySelectorAll("strong").forEach((el) => {
          const match = el.textContent.trim().match(/^(\d{1,3})%$/);
          if (!match) return;
          const original = el.textContent;
          const counter = { value: 0 };
          restoreCounters.push(() => { el.textContent = original; });
          el.textContent = "0%";
          gsap.to(counter, {
            value: Number(match[1]),
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            onUpdate: () => { el.textContent = `${Math.round(counter.value)}%`; },
          });
        });
      });
      return () => context.revert();
    });

    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => {
      media.revert();
      restoreCounters.forEach((restore) => restore());
    };
  }, []);

  return (
    <div className={styles.progress} aria-hidden="true">
      <span data-case-progress="" />
    </div>
  );
}
