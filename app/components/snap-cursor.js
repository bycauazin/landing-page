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
 * `exclude`: seletor de uma área onde ele fica desligado (o hero, que já tem
 * o "circuito vivo"): ali volta o cursor normal. Só com mouse de verdade
 * (pointer: fine) e sem "reduzir movimento"; no celular nada muda.
 */
export default function SnapCursor({ exclude }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const html = document.documentElement;
    const p = { x: -100, y: -100, rx: -100, ry: -100, w: RING, h: RING, shown: false };
    let target = null;
    let radius = RING / 2;
    let pressed = false;
    let raf = 0;

    const setShown = (on) => {
      if (on === p.shown) return;
      p.shown = on;
      html.classList.toggle(styles.on, on);
      dot.dataset.shown = String(on);
      ring.dataset.shown = String(on);
    };

    const onMove = (e) => {
      const el = e.target instanceof Element ? e.target : null;
      const off = !el || (exclude && el.closest(exclude)) || el.closest(FIELDS);
      if (!p.shown) {
        p.rx = e.clientX;
        p.ry = e.clientY;
      }
      p.x = e.clientX;
      p.y = e.clientY;
      setShown(!off);
      const next = off ? null : el.closest(TARGETS);
      if (next !== target) {
        target = next;
        radius = target ? parseFloat(getComputedStyle(target).borderRadius) || 10 : RING / 2;
      }
    };
    const onLeave = (e) => {
      if (!e.relatedTarget) setShown(false);
    };
    const onDown = () => (pressed = true);
    const onUp = () => (pressed = false);

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!p.shown) return;
      let tx = p.x;
      let ty = p.y;
      let tw = RING;
      let th = RING;
      let tr = RING / 2;
      let snapped = false;
      if (target?.isConnected) {
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
      const k = snapped ? 0.3 : 0.2;
      p.rx += (tx - p.rx) * k;
      p.ry += (ty - p.ry) * k;
      p.w += (tw - p.w) * 0.28;
      p.h += (th - p.h) * 0.28;
      ring.style.width = `${p.w}px`;
      ring.style.height = `${p.h}px`;
      ring.style.borderRadius = `${tr}px`;
      ring.style.transform = `translate3d(${p.rx - p.w / 2}px, ${p.ry - p.h / 2}px, 0)`;
      ring.dataset.snapped = String(snapped);
      dot.style.transform = `translate3d(${p.x - 4}px, ${p.y - 4}px, 0)`;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      html.classList.remove(styles.on);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [exclude]);

  return (
    <>
      <span ref={ringRef} className={styles.ring} aria-hidden="true" />
      <span ref={dotRef} className={styles.dot} aria-hidden="true" />
    </>
  );
}
