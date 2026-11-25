"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import chrome from "./case-chrome.module.css";

// Ícones em traço (24×24, currentColor), no estilo dos ícones da faixa "o que eu faço" da home.
const ICONS = {
  start: <><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M10 21v-6h4v6" /></>,
  summary: <><path d="M4 5h16M4 10h16M4 15h10M4 20h7" /></>,
  context: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5z" /></>,
  problem: <><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.5M12 16.5h.01" /></>,
  solution: <><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.3 1.1 2.2h5c0-.9.4-1.6 1.1-2.2A6 6 0 0 0 12 3z" /></>,
  goal: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
  flow: <><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /><path d="M6.5 10v3a3.5 3.5 0 0 0 3.5 3.5h4" /><path d="m12 14.5 2 2-2 2" /></>,
  layers: <><path d="m12 3 9 5-9 5-9-5z" /><path d="m3 13 9 5 9-5" /></>,
  data: <><ellipse cx="12" cy="5.5" rx="8" ry="2.5" /><path d="M4 5.5v13c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-13" /><path d="M4 12c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5" /></>,
  chart: <><path d="M3 20h18" /><path d="M6.5 16v-3" /><path d="M11 16V9" /><path d="M15.5 16v-5" /><path d="M20 16V5" /></>,
  screen: <><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></>,
  code: <><path d="m8 7-5 5 5 5" /><path d="m16 7 5 5-5 5" /><path d="m13.5 4-3 16" /></>,
  shield: <><path d="M12 3 4.5 6v6c0 4.5 3.2 7.8 7.5 9 4.3-1.2 7.5-4.5 7.5-9V6z" /><path d="m9 12 2 2 4-4" /></>,
  sliders: <><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0" /><circle cx="16" cy="6" r="2" /><circle cx="10" cy="12" r="2" /><circle cx="18" cy="18" r="2" /></>,
  puzzle: <><path d="M9 4h3a2 2 0 1 1 4 0h3v5a2 2 0 1 1 0 4v6h-6a2 2 0 1 0-4 0H4v-5a2 2 0 1 0 0-4V4z" /></>,
  plug: <><path d="M9 3v5M15 3v5" /><path d="M6 8h12v3a6 6 0 0 1-12 0z" /><path d="M12 17v4" /></>,
  compare: <><path d="M4 8h13l-3-3M20 16H7l3 3" /></>,
  list: <><path d="M9 6h11M9 12h11M9 18h11" /><path d="M4 6h.01M4 12h.01M4 18h.01" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></>,
  result: <><path d="M3 20h18" /><path d="m5 15 5-5 4 3 6-7" /><path d="M15 6h5v5" /></>,
  learning: <><path d="M3 9 12 4l9 5-9 5z" /><path d="M7 11.5V16c0 1.5 2.2 3 5 3s5-1.5 5-3v-4.5" /></>,
  flag: <><path d="M5 21V4" /><path d="M5 4h12l-2 4 2 4H5" /></>,
  alert: <><path d="M12 3 2 20h20z" /><path d="M12 10v4M12 17h.01" /></>,
  tools: <><path d="M14.5 6.5a4 4 0 0 0 5 5L12 19l-3-3 7.5-7.5" /><path d="M4 20l5-5" /></>,
  link: <><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9S9.5 5.5 12 3z" /></>,
};

// Seção sem ícone escolhido: o ícone vem do título (a primeira regra que bater).
const BY_WORD = [
  [/poucas palavras|resumo/i, "summary"],
  [/antes e depois/i, "compare"],
  [/aprendiz/i, "learning"],
  [/participa|minha atua/i, "user"],
  [/resultado|impacto/i, "result"],
  [/relacionad|conex/i, "link"],
  [/tecnologia|ferramenta/i, "tools"],
  [/ocorr[eê]ncia/i, "alert"],
  [/problema/i, "problem"],
  [/contexto/i, "context"],
  [/objetivo/i, "goal"],
  [/solu[cç]/i, "solution"],
  [/desafio/i, "puzzle"],
  [/personaliz|filtro|decis/i, "sliders"],
  [/seguran|simular/i, "shield"],
  [/regra/i, "sliders"],
  [/moodle|integra/i, "plug"],
  [/dashboard|indicador|m[eé]trica/i, "chart"],
  [/interface|tela|visual|experi[eê]ncia/i, "screen"],
  [/c[oó]digo|dax|trecho|gera[cç][aã]o do arquivo/i, "code"],
  [/arquitetura|estrutura/i, "layers"],
  [/dado|base|planilha|lista|consolida/i, "data"],
  [/fluxo|pipeline|como funciona|como a|conectam|abordagem/i, "flow"],
  [/situa[cç][aã]o|status|evolu|futur|em desenvolvimento|pronto|pr[oó]xima/i, "flag"],
  [/o que o app|recurso|constru/i, "list"],
  [/publica/i, "globe"],
  [/agenda|rotina|semana/i, "calendar"],
];

const iconFor = (text) => BY_WORD.find(([pattern]) => pattern.test(text))?.[1] ?? "layers";

// Paradas da barra: o hero (Início) e cada seção da página que tem título (aria-labelledby).
// O nome é o "chapéu" curto do título (ex.: "O problema"); sem ele, o próprio título.
function findSections(main) {
  const [hero, ...rest] = main.querySelectorAll(":scope > section");
  const stops = hero ? [{ el: hero, label: "Início", icon: "start" }] : [];
  rest.forEach((section) => {
    if (!section.hasAttribute("aria-labelledby")) return;
    const title = section.querySelector("h2");
    if (!title) return;
    const eyebrow = title.previousElementSibling?.matches("p") ? title.previousElementSibling.textContent : "";
    const label = (section.dataset.rail || eyebrow || title.textContent).trim().slice(0, 42);
    stops.push({ el: section, label, icon: section.dataset.railIcon || iconFor(`${label} ${title.textContent}`) });
  });
  return stops;
}

const RAIL_ROOM = 88; // largura da barra + folga até o texto

/**
 * Barra lateral dos estudos de caso (a mesma ideia do SectionRail do Finance):
 * uma coluna de ícones à direita, um por seção. O da seção na tela fica em
 * destaque (o fundo desliza até ele), o clique leva à seção, o nome aparece ao
 * passar o mouse e a barrinha embaixo mostra quanto da página já foi lido.
 * Só aparece onde cabe ao lado do texto; nas telas menores fica o botão "Tópicos".
 */
export default function CaseRail() {
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
    const fit = () => {
      const hero = els.current[0];
      const right = hero ? hero.getBoundingClientRect().right : window.innerWidth;
      setFits(window.innerWidth - right >= RAIL_ROOM && window.innerHeight >= 520);
    };
    const onResize = () => { fit(); measure(); };
    onResize();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", onResize);
    };
  }, [measure, sections]);

  const visible = fits && sections.length > 2;

  // Com a barra na tela, os botões flutuantes "Tópicos" e "Topo" (das telas menores) saem de cena.
  useEffect(() => {
    const html = document.documentElement;
    if (visible) html.dataset.caseRail = "";
    else delete html.dataset.caseRail;
    return () => { delete html.dataset.caseRail; };
  }, [visible]);

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
