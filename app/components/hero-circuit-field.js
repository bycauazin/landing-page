"use client";

import { useEffect, useRef } from "react";

// "Circuito vivo": trilhas de placa de circuito escondidas no fundo (do hero ou da página inteira).
// O mouse funciona como uma lanterna que revela as trilhas, e ao passar por elas
// solta pulsos de corrente (Vermilion) que correm até o ponto de solda no final.
// Sem mouse (celular, ou mouse parado) alguns pulsos aparecem sozinhos.

const ICE = "200,223,234";
const MIDNIGHT = "11,46,67";
const VERMILION = "255,79,49";

// "hero": forte, só no topo. "page": camada fixa atrás da página inteira, bem mais discreta.
const VARIANTS = {
  hero: { reveal: 0.34, pulse: 0.85, flash: 0.9, autoEvery: 1500, sweep: 0.85, sweepWire: 0.3 },
  page: { reveal: 0.2, pulse: 0.55, flash: 0.55, autoEvery: 2600, sweep: 0.8, sweepWire: 0.24 },
};
const CELL = 30; // tamanho da grade das trilhas, em px
const REVEAL_RADIUS = 230; // raio da "lanterna"
const TAP_RADIUS = 70; // distância do cursor que dispara um pulso
const MAX_PULSES = 16;
const PULSE_SPEED = 4.2; // px por quadro (60 fps)
const TAIL = 46; // comprimento do rastro do pulso, em px
const IDLE_AFTER = 3500; // ms sem mouse até os pulsos automáticos

// 8 direções; as retas aparecem mais do que as diagonais
const DIRS = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];

function buildTraces(w, h) {
  const cols = Math.ceil(w / CELL) + 1;
  const rows = Math.ceil(h / CELL) + 1;
  const used = new Uint8Array(cols * rows);
  const traces = [];
  const target = Math.round((cols * rows) / 11);
  let attempts = 0;
  while (traces.length < target && attempts < target * 8) {
    attempts++;
    let cx = Math.floor(Math.random() * cols);
    let cy = Math.floor(Math.random() * rows);
    if (used[cy * cols + cx]) continue;
    let dir = Math.floor(Math.random() * 4) * 2; // começa sempre reto
    const steps = 3 + Math.floor(Math.random() * 8);
    const points = [[cx * CELL, cy * CELL]];
    used[cy * cols + cx] = 1;
    for (let s = 0; s < steps; s++) {
      if (s > 0 && Math.random() < 0.28) dir = (dir + (Math.random() < 0.5 ? 1 : 7)) % 8; // dobra 45°
      const nx = cx + DIRS[dir][0];
      const ny = cy + DIRS[dir][1];
      if (nx < 0 || ny < 0 || nx >= cols || ny >= rows || used[ny * cols + nx]) break;
      used[ny * cols + nx] = 1;
      cx = nx;
      cy = ny;
      points.push([cx * CELL, cy * CELL]);
    }
    if (points.length < 3) continue;
    // comprimento acumulado de cada ponto, para o pulso andar pela trilha
    const dist = [0];
    for (let i = 1; i < points.length; i++) {
      dist.push(dist[i - 1] + Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]));
    }
    traces.push({ points, dist, length: dist[dist.length - 1], readyAt: 0, flash: 0 });
  }
  return traces;
}

// Desenha todas as trilhas uma única vez numa tela separada (barato de reaproveitar a cada quadro).
function renderTraceLayer(traces, w, h, dpr, color) {
  const layer = document.createElement("canvas");
  layer.width = Math.round(w * dpr);
  layer.height = Math.round(h * dpr);
  const g = layer.getContext("2d");
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  g.strokeStyle = `rgb(${color})`;
  g.fillStyle = `rgb(${color})`;
  g.lineWidth = 1.2;
  g.lineJoin = "round";
  g.beginPath();
  for (const t of traces) {
    g.moveTo(t.points[0][0], t.points[0][1]);
    for (let i = 1; i < t.points.length; i++) g.lineTo(t.points[i][0], t.points[i][1]);
  }
  g.stroke();
  for (const t of traces) {
    const [sx, sy] = t.points[0];
    g.beginPath();
    g.arc(sx, sy, 1.8, 0, Math.PI * 2);
    g.fill();
    const [ex, ey] = t.points[t.points.length - 1];
    g.beginPath();
    g.arc(ex, ey, 3.4, 0, Math.PI * 2);
    g.lineWidth = 1.3;
    g.stroke();
  }
  return layer;
}

// Ponto da trilha a uma certa distância do início
function pointAt(trace, d) {
  const { points, dist } = trace;
  if (d <= 0) return points[0];
  let i = 1;
  while (i < dist.length - 1 && dist[i] < d) i++;
  const seg = dist[i] - dist[i - 1] || 1;
  const f = Math.min(1, (d - dist[i - 1]) / seg);
  return [points[i - 1][0] + (points[i][0] - points[i - 1][0]) * f, points[i - 1][1] + (points[i][1] - points[i - 1][1]) * f];
}

// Varredura: quando uma seção marcada com data-circuit-sweep entra na tela, uma corrente
// atravessa a página na horizontal pelo espaço vazio entre as seções (em cima da linha
// divisória). O valor do atributo desloca a linha em px a partir do topo da seção.
// Desvios e ramos ficam presos a ±90px dessa linha, para nunca passar por trás do conteúdo.
const SWEEP_SPEED = 22; // px por quadro (60 fps)
const SWEEP_SPEED_MOBILE = 10; // no celular a tela é estreita: mais devagar para dar tempo de ver
const SWEEP_TAIL = 180;

function makePath(points) {
  const dist = [0];
  for (let i = 1; i < points.length; i++) {
    dist.push(dist[i - 1] + Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]));
  }
  return { points, dist, length: dist[dist.length - 1] };
}

function buildSweep(w, y, leftToRight) {
  const dirX = leftToRight ? 1 : -1;
  let x = leftToRight ? -CELL : Math.ceil(w / CELL) * CELL + CELL;
  let cy = y; // sem encaixar na grade: a linha fica exatamente no separador
  const points = [[x, cy]];
  const branchAt = [];
  const total = Math.ceil(w / CELL) + 2;
  let run = 0;
  for (let i = 0; i < total; i++) {
    run++;
    // de vez em quando a trilha desvia uma casa em 45° (no máximo uma casa longe da linha)
    let dy = run > 4 && Math.random() < 0.16 ? (Math.random() < 0.5 ? -CELL : CELL) : 0;
    if (Math.abs(cy + dy - y) > CELL) dy = -dy;
    if (dy) run = 0;
    x += dirX * CELL;
    cy += dy;
    points.push([x, cy]);
    if (i > 1 && i < total - 2 && !dy && Math.random() < 0.17) {
      const up = Math.random() < 0.5 ? -1 : 1;
      const len = Math.abs(cy - y) > 0 && Math.sign(cy - y) === up ? 1 : 1 + Math.floor(Math.random() * 2);
      const bp = [[x, cy]];
      let bx = x;
      let by = cy;
      for (let st = 0; st < len; st++) {
        by += up * CELL;
        if (st === 0 && Math.random() < 0.5) bx += dirX * CELL;
        bp.push([bx, by]);
      }
      branchAt.push([points.length - 1, bp]);
    }
  }
  const main = makePath(points);
  const branches = branchAt.map(([index, bp]) => ({ ...makePath(bp), at: main.dist[index], d: -1, flash: 0, done: false }));
  return { ...main, branches };
}

// Traça a trilha do começo até a distância d
function strokeUpTo(ctx, t, d) {
  ctx.beginPath();
  ctx.moveTo(t.points[0][0], t.points[0][1]);
  let i = 1;
  for (; i < t.points.length && t.dist[i] <= d; i++) ctx.lineTo(t.points[i][0], t.points[i][1]);
  if (i < t.points.length) {
    const [x, y] = pointAt(t, d);
    ctx.lineTo(x, y);
  }
  ctx.stroke();
}

export default function HeroCircuitField({ className, variant = "hero", light = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return undefined;
    const look = VARIANTS[variant] || VARIANTS.hero;
    const traceColor = light ? MIDNIGHT : ICE;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let traces = [];
    let layer = null;
    let pulses = [];
    let sweeps = [];
    let sweepIo = null;
    let rect = canvas.getBoundingClientRect();
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, inside: false };
    let reveal = 0; // 0..1, intensidade da lanterna
    let lastMove = -1e9;
    let frame = 0;
    let lastTime = 0;
    let visible = true;
    let ready = false;
    let autoTimer = 0;
    let idleId = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      if (!w || !h) return;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      traces = buildTraces(w, h);
      layer = renderTraceLayer(traces, w, h, dpr, traceColor);
      pulses = [];
      rect = canvas.getBoundingClientRect();
    };

    const spawn = (trace, fromDistance = 0) => {
      const now = performance.now();
      if (pulses.length >= MAX_PULSES || now < trace.readyAt) return;
      trace.readyAt = now + 1200; // a mesma trilha só dispara de novo depois de 1,2 s
      pulses.push({ trace, d: fromDistance, speed: PULSE_SPEED * (0.85 + Math.random() * 0.4) });
    };

    // Dispara pulsos nas trilhas que passam perto do cursor, a partir do ponto mais próximo
    const tapNear = (x, y) => {
      const r2 = TAP_RADIUS * TAP_RADIUS;
      const now = performance.now();
      for (const t of traces) {
        if (now < t.readyAt) continue;
        for (let i = 0; i < t.points.length - 1; i++) {
          const dx = t.points[i][0] - x;
          const dy = t.points[i][1] - y;
          if (dx * dx + dy * dy < r2) { spawn(t, t.dist[i]); break; }
        }
        if (pulses.length >= MAX_PULSES) break;
      }
    };

    // rastro de corrente: pedacinhos com opacidade crescente até a cabeça
    const drawRun = (t, d, tailLen, alpha, width) => {
      const head = Math.min(d, t.length);
      const tail = Math.max(0, d - tailLen);
      if (head <= tail) return;
      const pieces = 6;
      ctx.lineWidth = width;
      for (let s = 0; s < pieces; s++) {
        const a = tail + ((head - tail) * s) / pieces;
        const b = tail + ((head - tail) * (s + 1)) / pieces;
        const [ax, ay] = pointAt(t, a);
        const [bx, by] = pointAt(t, b);
        ctx.strokeStyle = `rgba(${VERMILION},${(((s + 1) / pieces) * alpha).toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      }
      if (d < t.length) {
        const [hx, hy] = pointAt(t, head);
        ctx.fillStyle = `rgba(${VERMILION},${(0.26 * alpha).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(hx, hy, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = light ? `rgb(${VERMILION})` : `rgba(255,214,204,${alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(hx, hy, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawPad = (x, y, flash, alpha) => {
      ctx.strokeStyle = `rgba(${VERMILION},${(flash * alpha).toFixed(3)})`;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(x, y, 3.4 + (1 - flash) * 7, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = `rgba(${VERMILION},${(flash * alpha * 0.9).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(x, y, 2.6, 0, Math.PI * 2);
      ctx.fill();
    };

    const draw = (now) => {
      frame = 0;
      const k = lastTime ? Math.min((now - lastTime) / 16.67, 3) : 1;
      lastTime = now;

      // o cursor desenhado segue o real com suavidade
      if (pointer.inside) {
        if (pointer.x < -1000) { pointer.x = pointer.tx; pointer.y = pointer.ty; }
        const ease = 1 - Math.pow(0.8, k);
        pointer.x += (pointer.tx - pointer.x) * ease;
        pointer.y += (pointer.ty - pointer.y) * ease;
      }
      const goal = pointer.inside ? 1 : 0;
      reveal += (goal - reveal) * (1 - Math.pow(0.9, k));
      if (Math.abs(goal - reveal) < 0.005) reveal = goal;

      ctx.clearRect(0, 0, w, h);

      // 1) lanterna: as trilhas só aparecem em volta do cursor
      if (reveal > 0.01 && layer) {
        ctx.globalAlpha = look.reveal * reveal;
        ctx.drawImage(layer, 0, 0, w, h);
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "destination-in";
        const g = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, REVEAL_RADIUS);
        g.addColorStop(0, "rgba(0,0,0,1)");
        g.addColorStop(0.55, "rgba(0,0,0,0.45)");
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = "source-over";
      }

      // 2) pulsos de corrente correndo pelas trilhas
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        const t = pulse.trace;
        pulse.d += pulse.speed * k;
        const head = Math.min(pulse.d, t.length);
        const tail = Math.max(0, pulse.d - TAIL);
        if (tail >= t.length) { t.flash = 1; pulses.splice(p, 1); continue; }

        drawRun(t, pulse.d, TAIL, look.pulse, 1.8);
      }

      // 3) ponto de solda pisca quando a corrente chega
      let anyFlash = false;
      for (const t of traces) {
        if (t.flash > 0) {
          anyFlash = true;
          const [ex, ey] = t.points[t.points.length - 1];
          drawPad(ex, ey, t.flash, look.flash);
          t.flash = Math.max(0, t.flash - 0.035 * k);
        }
      }

      // 4) varreduras horizontais (presas à página: acompanham a rolagem)
      if (sweeps.length) {
        const scrollY = window.scrollY;
        const wireColor = light ? MIDNIGHT : ICE;
        for (let i = sweeps.length - 1; i >= 0; i--) {
          const sw = sweeps[i];
          sw.d += sw.speed * k;
          if (sw.d > sw.length) sw.fade = Math.max(0, sw.fade - 0.022 * k);
          ctx.save();
          ctx.translate(0, sw.scroll - scrollY);
          ctx.strokeStyle = `rgba(${wireColor},${(look.sweepWire * sw.fade).toFixed(3)})`;
          ctx.lineWidth = 1.2;
          if (sw.fade > 0) strokeUpTo(ctx, sw, sw.d);
          drawRun(sw, sw.d, SWEEP_TAIL, look.sweep, 2);
          let busy = sw.d < sw.length + SWEEP_TAIL || sw.fade > 0;
          for (const b of sw.branches) {
            if (b.d < 0 && sw.d >= b.at) b.d = 0;
            if (b.d >= 0 && !b.done) {
              b.d += PULSE_SPEED * 1.4 * k;
              if (b.d - TAIL >= b.length) { b.done = true; b.flash = 1; }
            }
            if (b.d >= 0 && sw.fade > 0) {
              ctx.strokeStyle = `rgba(${wireColor},${(look.sweepWire * sw.fade).toFixed(3)})`;
              ctx.lineWidth = 1.2;
              strokeUpTo(ctx, b, b.d);
            }
            if (b.d >= 0 && !b.done) { drawRun(b, b.d, TAIL, look.sweep, 1.5); busy = true; }
            if (b.flash > 0) {
              const [ex, ey] = b.points[b.points.length - 1];
              drawPad(ex, ey, b.flash, Math.min(1, look.flash + 0.2));
              b.flash = Math.max(0, b.flash - 0.03 * k);
              busy = true;
            }
            if (b.d < 0) busy = true;
          }
          ctx.restore();
          if (!busy) sweeps.splice(i, 1);
        }
      }

      // só continua animando enquanto houver algo se mexendo (mouse parado = zero trabalho)
      const gliding = Math.abs(pointer.tx - pointer.x) > 0.3 || Math.abs(pointer.ty - pointer.y) > 0.3;
      const fading = reveal !== goal;
      if (visible && (pulses.length || sweeps.length || anyFlash || fading || (pointer.inside && gliding))) {
        frame = requestAnimationFrame(draw);
      } else {
        lastTime = 0;
      }
    };

    const wake = () => {
      if (!frame && ready && visible) frame = requestAnimationFrame(draw);
    };

    const onMove = (event) => {
      if (!ready) return;
      rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      if (!inside) { pointer.inside = false; wake(); return; }
      if (event.pointerType === "mouse") {
        pointer.inside = true;
        pointer.tx = x;
        pointer.ty = y;
      }
      lastMove = performance.now();
      tapNear(x, y);
      wake();
    };
    const onLeave = () => { pointer.inside = false; pointer.x = -9999; wake(); };

    // Pulsos automáticos quando ninguém mexe o mouse (e no celular)
    const autoPulse = () => {
      if (ready && visible && traces.length && performance.now() - lastMove > IDLE_AFTER) {
        const t = traces[Math.floor(Math.random() * traces.length)];
        spawn(t, 0);
        wake();
      }
      autoTimer = window.setTimeout(autoPulse, look.autoEvery * (0.7 + Math.random() * 0.6));
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
    });
    const ro = new ResizeObserver(() => { resize(); wake(); });

    // Só começa depois da página carregar e o navegador ficar livre (não disputa com a entrada do hero)
    let sweepCount = 0;
    const sweepAround = (element) => {
      if (!w) return;
      const y = element.getBoundingClientRect().top + Number(element.dataset.circuitSweep || 0);
      const leftToRight = sweepCount++ % 2 === 0; // alterna o lado de cada seção
      const speed = window.matchMedia("(max-width: 760px)").matches ? SWEEP_SPEED_MOBILE : SWEEP_SPEED;
      sweeps.push({ ...buildSweep(w, y, leftToRight), d: 0, speed, scroll: window.scrollY, fade: 1 });
      wake();
    };

    const start = () => {
      ready = true;
      resize();
      canvas.dataset.ready = "true";
      if (variant === "page") {
        sweepIo = new IntersectionObserver((entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            sweepIo.unobserve(entry.target); // cada bloco "liga" uma vez só
            sweepAround(entry.target);
          }
        }, { threshold: 0, rootMargin: "0px 0px -18% 0px" }); // dispara quando o topo da seção passa de ~82% da tela
        document.querySelectorAll("[data-circuit-sweep]").forEach((el) => sweepIo.observe(el));
      }
      autoTimer = window.setTimeout(autoPulse, 1200);
      wake();
    };
    const scheduleStart = () => {
      if ("requestIdleCallback" in window) idleId = window.requestIdleCallback(start, { timeout: 2500 });
      else idleId = window.setTimeout(start, 1200);
    };
    if (document.readyState === "complete") scheduleStart();
    else window.addEventListener("load", scheduleStart, { once: true });

    io.observe(canvas);
    ro.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(autoTimer);
      sweepIo?.disconnect();
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      clearTimeout(idleId);
      window.removeEventListener("load", scheduleStart);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      io.disconnect();
      ro.disconnect();
    };
  }, [variant, light]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
