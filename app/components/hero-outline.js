"use client";

import { useEffect, useRef } from "react";
import styles from "./hero-outline.module.css";

const FIRST_DELAY = 600; // ms depois de abrir o site
const LOOP_MS = 3600; // uma volta inteira

/**
 * "Contorno vivo": um ponto de luz vermilion percorre a borda arredondada do
 * hero sem parar, deixando um rastro curto. Fica dentro do hero (que já tem
 * overflow hidden e os cantos arredondados) e lê o raio dos cantos do próprio
 * hero, então acompanha o celular também; se o tamanho muda, recalcula e segue.
 * Pausa com a aba escondida (o navegador congela a animação) e fica desligado
 * com "reduzir movimento".
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

    let anim = null;
    let size = "";

    const run = () => {
      const w = hero.clientWidth;
      const h = hero.clientHeight;
      if (!w || !h || `${w}x${h}` === size) return;
      size = `${w}x${h}`;
      const r = parseFloat(getComputedStyle(hero).borderTopLeftRadius) || 0;
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      rect.setAttribute("width", String(w - 2));
      rect.setAttribute("height", String(h - 2));
      rect.setAttribute("rx", String(Math.max(0, r - 1)));
      const len = rect.getTotalLength();
      rect.style.strokeDasharray = `${Math.min(260, len * 0.12)} ${len}`;
      const progress = anim ? (anim.currentTime ?? 0) % LOOP_MS : 0;
      anim?.cancel();
      anim = rect.animate([{ strokeDashoffset: 0, opacity: 1 }, { strokeDashoffset: -len, opacity: 1 }], { duration: LOOP_MS, easing: "linear", iterations: Infinity });
      anim.currentTime = progress;
    };

    const ro = new ResizeObserver(run);
    const timer = window.setTimeout(() => {
      run();
      ro.observe(hero);
    }, FIRST_DELAY);

    return () => {
      window.clearTimeout(timer);
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
