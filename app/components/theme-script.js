// Fica fora do "use client": o layout (servidor) injeta este script no <head>.
export const THEME_KEY = "theme";
export const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
