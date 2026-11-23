"use client";

import { useEffect, useRef } from "react";
import styles from "./snap-cursor.module.css";

// O que o anel abraça. Campos de texto mantêm o cursor normal de digitação.
const TARGETS = 'a, button, [role="button"], summary, label[for], [data-cursor]';
const FIELDS = "input, textarea, select, [contenteditable]";
// Maior que isso (um cartão inteiro, uma seção), o anel não abraça: só cresce.
const MAX_SNAP = { w: 440, h: 160 };
const RING = 34;
const PAD = 6;

/**
 * Cursor "encaixe": um ponto vermilion que segue o mouse na hora e um anel
 * que vem atrás; em cima de link ou botão o anel assume o formato do elemento
 * (mesmo tamanho e cantos, com uma folga) e fica grudado nele.
 *
 * Vale na página inteira (o hero também, junto com o "circuito vivo"). O que
 * está embaixo do mouse é conferido a cada quadro, não só quando o mouse
 * mexe: rolando a página com o mouse parado, o anel continua no elemento
 * certo. Só o mouse de verdade move o cursor (toque em tela híbrida é
 * ignorado); some quando o mouse sai da janela e volta sem "pular". Fica
 * desligado no celular (sem pointer: fine) e com "reduzir movimento".
 */
export default function SnapCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const html = document.documentElement;
    html.classList.add(styles.on);
    const p = { x: 0, y: 0, rx: 0, ry: 0, w: RING, h: RING, has: false, shown: false, away: false };
    let target = null;
    let radius = RING / 2;
    let pressed = false;
    let raf = 0;

    const show = (on) => {
      if (on === p.shown) return;
      p.shown = on;
      dot.dataset.shown = String(on);
      ring.dataset.shown = String(on);
    };

    const onMove = (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      if (!p.has || p.away) {
        p.rx = e.clientX; // primeira vez ou voltando: começa daqui, sem pular de onde estava
        p.ry = e.clientY;
        p.has = true;
        p.away = false;
      }
      p.x = e.clientX;
      p.y = e.clientY;
    };
    const onLeave = () => {
      p.away = true;
      show(false);
    };
    const onDown = (e) => {
      if (e.pointerType === "mouse") pressed = true;
    };
    const onUp = () => {
      pressed = false;
    };

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!p.has || p.away) return;
      const el = document.elementFromPoint(p.x, p.y);
      const inField = !!el?.closest(FIELDS);
      show(!!el && !inField);
      if (!p.shown) return;
      const next = inField ? null : (el?.closest(TARGETS) ?? null);
      if (next !== target) {
        target = next;
        radius = target ? parseFloat(getComputedStyle(target).borderRadius) || 10 : RING / 2;
      }

      let tx = p.x;
      let ty = p.y;
      let tw = RING;
      let th = RING;
      let tr = RING / 2;
      let snapped = false;
      if (target) {
        const r = target.getBoundingClientRect();
        if (r.width <= MAX_SNAP.w && r.height <= MAX_SNAP.h) {
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          tx = cx + (p.x - cx) * 0.12;
          ty = cy + (p.y - cy) * 0.12;
          tw = r.width + PAD * 2;
          th = r.height + PAD * 2;
          tr = Math.min(radius + PAD, th / 2);
          snapped = true;
        } else {
          tw = th = 58;
          tr = 29;
        }
      }
      if (pressed) {
        tw *= 0.92;
        th *= 0.92;
      }
      const k = snapped ? 0.35 : 0.25;
      p.rx += (tx - p.rx) * k;
      p.ry += (ty - p.ry) * k;
      p.w += (tw - p.w) * 0.3;
      p.h += (th - p.h) * 0.3;
      ring.style.width = `${p.w}px`;
      ring.style.height = `${p.h}px`;
      ring.style.borderRadius = `${tr}px`;
      ring.style.transform = `translate3d(${p.rx - p.w / 2}px, ${p.ry - p.h / 2}px, 0)`;
      ring.dataset.snapped = String(snapped);
      dot.style.transform = `translate3d(${p.x - 4}px, ${p.y - 4}px, 0)`;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    html.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      html.classList.remove(styles.on);
      window.removeEventListener("pointermove", onMove);
      html.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <>
      <span ref={ringRef} className={styles.ring} aria-hidden="true" />
      <span ref={dotRef} className={styles.dot} aria-hidden="true" />
    </>
  );
}
