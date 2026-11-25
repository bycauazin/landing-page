"use client";

import { useCallback, useSyncExternalStore } from "react";
import { THEME_KEY } from "./theme-script";

// Tema claro/escuro compartilhado por todas as páginas (home, /projetos e estudos de caso).
// A escolha fica no navegador (localStorage "theme") e vira data-theme no <html>;
// o script do layout aplica antes da primeira pintura, então não pisca ao trocar de página.

const listeners = new Set();
const read = () => (document.documentElement.dataset.theme === "light" ? "light" : "dark");
const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export function useLightMode() {
  const theme = useSyncExternalStore(subscribe, read, () => "dark");
  const toggle = useCallback(() => {
    const next = read() === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(THEME_KEY, next); } catch { /* navegação privada: vale só nesta página */ }
    listeners.forEach((listener) => listener());
  }, []);
  return [theme === "light", toggle];
}
