// Fica fora do "use client": o layout (servidor) injeta INTRO_SCRIPT no <head>.
// A abertura (site-intro.js) roda na primeira visita da sessão e em todo F5 (recarregar).
// Ao navegar entre as páginas do site ela não repete. Nunca roda com prefers-reduced-motion.
// ?intro no endereço força a abertura.
export const INTRO_KEY = "intro-seen";
export const INTRO_EVENT = "site-intro:reveal";

// data-intro="on" antes da primeira pintura: o CSS mostra a cortina e trava a rolagem.
// Se o JavaScript falhar, o temporizador libera a página depois de 7 s.
export const introScript = `(function(){try{var d=document.documentElement,f=/[?&]intro\\b/.test(location.search),n=performance.getEntriesByType("navigation")[0],r=n&&n.type==="reload";if(!f&&(matchMedia("(prefers-reduced-motion: reduce)").matches||(!r&&sessionStorage.getItem("${INTRO_KEY}"))))return;d.setAttribute("data-intro","on");setTimeout(function(){d.removeAttribute("data-intro")},7000)}catch(e){}})()`;

// As animações de entrada das páginas usam isto para começar quando a cortina sobe.
// Sem abertura, chama cb na hora. Devolve uma função que cancela a espera.
export function onIntroReveal(cb) {
  if (document.documentElement.getAttribute("data-intro") !== "on") {
    cb();
    return () => {};
  }
  window.addEventListener(INTRO_EVENT, cb, { once: true });
  return () => window.removeEventListener(INTRO_EVENT, cb);
}
