"use client";

import { useEffect, useRef } from "react";
import styles from "./hero-outline.module.css";

const FIRST_DELAY = 900; // ms depois de abrir o site
const LOOP_MS = 3600; // uma volta inteira
const EVERY = [6000, 9000]; // intervalo entre as voltas

/**
 * "Contorno vivo": um ponto de luz vermilion percorre a borda arredondada do
 * hero deixando um rastro curto, ao abrir o site e depois de tempos em tempos.
 * Fica dentro do hero (que já tem overflow hidden e os cantos arredondados) e
 * lê o raio dos cantos do próprio hero, então acompanha o celular também.
 * Pausa com a aba escondida e fica desligado com "reduzir movimento".
 */
export default function HeroOutline() {
  const svgRef = useRef(null);
  const rectRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    const rect = rectRef.current;
    const hero = svg?.parentElement;
    if (!svg || !rect || !hero) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let timer = 0;
    let anim = null;
    let len = 0;

    const fit = () => {
      const w = hero.clientWidth;
      const h = hero.clientHeight;
      const r = parseFloat(getComputedStyle(hero).borderTopLeftRadius) || 0;
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      rect.setAttribute("width", String(w - 2));
      rect.setAttribute("height", String(h - 2));
      rect.setAttribute("rx", String(Math.max(0, r - 1)));
      len = rect.getTotalLength();
      const seg = Math.min(260, len * 0.12);
      rect.style.strokeDasharray = `${seg} ${len}`;
    };

    const loop = () => {
      if (document.hidden) {
        document.addEventListener("visibilitychange", loop, { once: true });
        return;
      }
      fit();
      anim?.cancel();
      anim = rect.animate([{ strokeDashoffset: 0, opacity: 1 }, { strokeDashoffset: -len, opacity: 1 }], { duration: LOOP_MS, easing: "linear" });
      anim.onfinish = () => {
        timer = window.setTimeout(loop, EVERY[0] + Math.random() * (EVERY[1] - EVERY[0]));
      };
    };

    const ro = new ResizeObserver(fit);
    ro.observe(hero);
    timer = window.setTimeout(loop, FIRST_DELAY);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", loop);
      anim?.cancel();
      ro.disconnect();
    };
  }, []);

  return (
    <svg ref={svgRef} className={styles.outline} aria-hidden="true" preserveAspectRatio="none">
      <rect ref={rectRef} x="1" y="1" className={styles.runner} />
    </svg>
  );
}
