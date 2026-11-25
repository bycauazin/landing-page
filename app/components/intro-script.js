// Fica fora do "use client": o layout (servidor) injeta INTRO_SCRIPT no <head>.
// A abertura (site-intro.js) roda uma vez por sessão do navegador. Ela não roda com
// prefers-reduced-motion. Para rever, abra qualquer página com ?intro no endereço.
export const INTRO_KEY = "intro-seen";
export const INTRO_EVENT = "site-intro:reveal";

// data-intro="on" antes da primeira pintura: o CSS mostra a cortina e trava a rolagem.
// Se o JavaScript falhar, o temporizador libera a página depois de 7 s.
export const introScript = `(function(){try{var d=document.documentElement,f=/[?&]intro\\b/.test(location.search);if(!f&&(sessionStorage.getItem("${INTRO_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches))return;d.setAttribute("data-intro","on");setTimeout(function(){d.removeAttribute("data-intro")},7000)}catch(e){}})()`;

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
