"use client";

import { useEffect, useState } from "react";
import BrandLogo from "./brand-logo";
import { INTRO_EVENT, INTRO_KEY } from "./intro-script";
import styles from "./site-intro.module.css";

// Abertura do site: a logo aparece no centro, "BC" é digitado, vira "<bycauazin/>" (fonte da marca) e a cortina
// sobe mostrando a página. Só roda quando o script do <head> marcou data-intro="on"
// (uma vez por sessão, sem prefers-reduced-motion). Clique ou qualquer tecla pula.

// Cada quadro é a palavra naquele instante: [posição, letra]. A posição é a key do React.
// Se a letra de uma posição muda (B → b), ela gira. Uma posição nova entra digitada.
const word = (text) => text.split("").map((ch, i) => [["b", "y", "c", "a1", "u", "a2", "z", "i", "n"][i], ch]);
const FRAMES = [
  [760, [["b", "B"]]],
  [940, [["b", "B"], ["c", "C"]]],
  [1440, [["b", "b"], ["c", "C"]]],
  [1540, [["b", "b"], ["c", "c"]]],
  [1700, word("byc")],
  ...["byca", "bycau", "bycaua", "bycauaz", "bycauazi", "bycauazin"].map((text, i) => [1830 + i * 62, word(text)]),
  // Fecha como a marca: <bycauazin/>
  [2230, [["lt", "<"], ...word("bycauazin")]],
  [2330, [["lt", "<"], ...word("bycauazin"), ["end", "/>"]]],
];
const TYPE_AT = 620;     // a logo sobe e a linha de digitação aparece
const DONE_AT = 2400;    // marca completa: entra a legenda
const LIFT_AT = 3380;    // a cortina começa a subir (espera o load da página, se ainda não terminou)
const LIFT_MS = 900;     // igual à transição de .intro[data-phase="lift"]

export default function SiteIntro() {
  const [phase, setPhase] = useState("logo");
  const [frame, setFrame] = useState(-1);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    // Sem data-intro o CSS já esconde a camada (display: none); não há o que animar.
    if (root.getAttribute("data-intro") !== "on") return undefined;

    const timers = [];
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    let lifted = false;

    const lift = () => {
      if (lifted) return;
      lifted = true;
      timers.forEach(clearTimeout);
      setFrame(FRAMES.length - 1);
      setPhase("lift");
      try { sessionStorage.setItem(INTRO_KEY, "1"); } catch {}
      root.setAttribute("data-intro", "reveal");
      window.dispatchEvent(new Event(INTRO_EVENT));
      setTimeout(() => {
        root.removeAttribute("data-intro");
        setGone(true);
      }, LIFT_MS + 60);
    };

    at(TYPE_AT, () => setPhase("type"));
    FRAMES.forEach(([ms], index) => at(ms, () => setFrame(index)));
    at(DONE_AT, () => setPhase("done"));
    at(LIFT_AT, () => {
      if (document.readyState === "complete") lift();
      else window.addEventListener("load", lift, { once: true });
    });

    const skip = (event) => {
      if (event.type === "keydown" && ["Shift", "Control", "Alt", "Meta"].includes(event.key)) return;
      lift();
    };
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("load", lift);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  if (gone) return null;

  const letters = frame >= 0 ? FRAMES[frame][1] : [];
  const before = new Map(frame > 0 ? FRAMES[frame - 1][1] : []);

  return (
    <div className={styles.intro} data-phase={phase} aria-hidden="true">
      <span className={styles.corner}>~/bycauazin</span>
      <div className={styles.stack}>
        <div className={styles.markWrap}>
          <BrandLogo className={styles.mark} size={132} />
        </div>
        <p className={styles.word}>
          {letters.map(([slot, ch]) => (
            <span key={slot} className={slot === "b" || slot === "y" ? styles.by : slot === "lt" || slot === "end" ? styles.tag : undefined}>
              <span key={ch} className={before.has(slot) && before.get(slot) !== ch ? styles.flip : before.has(slot) ? undefined : styles.enter}>{ch}</span>
            </span>
          ))}
          <span className={styles.caret} />
        </p>
        <p className={styles.tagline}>{"// desenvolvedor & instrutor"}</p>
      </div>
      <span className={styles.hint}>clique para pular</span>
      <span className={styles.progress} />
    </div>
  );
}
