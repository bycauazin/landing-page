"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import chrome from "./case-chrome.module.css";
import { ICONS, findIcon, iconFor } from "./case-icons";


// Paradas da barra: o hero (Início) e as seções com título ou nome explícito.
// O nome é o "chapéu" curto do título (ex.: "O problema"); sem ele, o próprio título.
function findSections(main) {
  const [hero, ...rest] = main.querySelectorAll(":scope > section");
  const stops = hero ? [{ el: hero, label: "Início", icon: "start" }] : [];
  rest.forEach((section) => {
    const explicitLabel = section.dataset.rail;
    if (!explicitLabel && !section.hasAttribute("aria-labelledby")) return;
    const title = section.querySelector("h2");
    if (!explicitLabel && !title) return;
    const previous = title?.previousElementSibling;
    const eyebrow = previous?.matches("p") ? previous.textContent : "";
    const label = (explicitLabel || eyebrow || title.textContent).trim().slice(0, 42);
    stops.push({ el: section, label, icon: section.dataset.railIcon || findIcon(label) || iconFor(title?.textContent ?? label) });
  });
  return stops;
}

const RAIL_ROOM = 88; // largura da barra + folga até o texto

/**
 * Barra lateral do portfólio, no estilo do SectionRail do Cacau (antigo Finance):
 * uma coluna de ícones à direita, um por seção. O da seção na tela fica em
 * destaque (o fundo desliza até ele), o clique leva à seção, o nome aparece ao
 * passar o mouse e a barrinha embaixo mostra quanto da página já foi lido.
 * Só aparece onde cabe ao lado do texto. Nos estudos de caso, substitui o botão "Tópicos".
 */
export default function CaseRail({ fitSelector, controlsCaseActions = true }) {
  const [sections, setSections] = useState([]);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [fits, setFits] = useState(false);
  const els = useRef([]);

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return undefined;
    // lê as seções no quadro seguinte, com a página já montada
    const frame = requestAnimationFrame(() => {
      const found = findSections(main);
      els.current = found.map((s) => s.el);
      setSections(found.map(({ label, icon }) => ({ label, icon })));
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const measure = useCallback(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    const line = window.innerHeight * 0.35;
    let current = 0;
    els.current.forEach((el, i) => {
      if (el.getBoundingClientRect().top <= line) current = i;
    });
    if (max > 0 && window.scrollY >= max - 4) current = els.current.length - 1;
    setActive(current);
  }, []);

  useEffect(() => {
    const fitReference = fitSelector ? document.querySelector(fitSelector) : null;
    const main = document.querySelector("main");
    const fit = () => {
      const reference = fitReference ?? els.current[0];
      const right = reference?.getBoundingClientRect().right ?? window.innerWidth;
      setFits(window.innerWidth - right >= RAIL_ROOM && window.innerHeight >= 520);
    };
    const onResize = () => { fit(); measure(); };
    onResize();
    const observer = new ResizeObserver(onResize);
    if (main) observer.observe(main);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", onResize);
    };
  }, [fitSelector, measure, sections]);

  const visible = fits && sections.length > 1;

  // Com a barra na tela, os botões flutuantes "Tópicos" e "Topo" (das telas menores) saem de cena.
  useEffect(() => {
    if (!controlsCaseActions) return undefined;
    const html = document.documentElement;
    if (visible) html.dataset.caseRail = "";
    else delete html.dataset.caseRail;
    return () => { delete html.dataset.caseRail; };
  }, [controlsCaseActions, visible]);

  if (!visible) return null;

  const go = (i) => {
    const el = els.current[i];
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: i === 0 ? 0 : el.getBoundingClientRect().top + window.scrollY - 24, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <nav className={chrome.rail} aria-label="Seções da página">
      <ul style={{ "--active": active }}>
        <li className={chrome.railMarker} aria-hidden="true" />
        {sections.map((s, i) => (
          <li key={`${s.label}-${i}`} style={{ "--i": i }}>
            <button
              type="button"
              onClick={() => go(i)}
              aria-label={s.label}
              aria-current={i === active ? "location" : undefined}
              className={i === active ? chrome.railActive : undefined}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">{ICONS[s.icon] ?? ICONS.layers}</svg>
            </button>
            <span className={chrome.railTip}>{s.label}</span>
          </li>
        ))}
        <li className={chrome.railProgress} aria-hidden="true">
          <span style={{ transform: `scaleX(${progress})` }} />
        </li>
      </ul>
    </nav>
  );
}
