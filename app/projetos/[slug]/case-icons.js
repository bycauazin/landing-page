import styles from "./case-icons.module.css";

// Ícones dos estudos de caso: a barra lateral, os títulos das seções, listas e etapas.
// Arquivo sem "use client": serve tanto às páginas (servidor) quanto à barra (cliente).
// Ícones em traço (24×24, currentColor), no estilo dos ícones da faixa "o que eu faço" da home.
export const ICONS = {
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
  bot: <><rect x="4" y="8" width="16" height="12" rx="3" /><path d="M12 4v4M9 13h.01M15 13h.01M9.5 17h5" /></>,
  card: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h4" /></>,
  wallet: <><path d="M4 7a2 2 0 0 1 2-2h12v4" /><rect x="4" y="7" width="17" height="13" rx="2" /><path d="M16 13.5h.01" /></>,
  piggy: <><path d="M5 11a6 5 0 0 1 11-2.5h2.5l-.5 2.5 2 1v3h-2.2A6 5 0 0 1 14 17.5V20h-3v-2a6.5 6.5 0 0 1-2 0v2H6v-2.8A5 5 0 0 1 5 11z" /><path d="M15 11h.01" /></>,
  heart: <><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></>,
  lock: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  eye: <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="2.8" /></>,
  phone: <><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18h2" /></>,
  moon: <><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" /></>,
  server: <><rect x="4" y="4" width="16" height="7" rx="2" /><rect x="4" y="13" width="16" height="7" rx="2" /><path d="M8 7.5h.01M8 16.5h.01" /></>,
  folder: <><path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></>,
  copy: <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  check: <><circle cx="12" cy="12" r="9" /><path d="m8 12.5 2.8 2.8L16.5 9.5" /></>,
  file: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></>,
  upload: <><path d="M12 16V4M7 9l5-5 5 5" /><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  history: <><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5M12 7v5l3 2" /></>,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c1-3.5 3.5-5.5 6.5-5.5s5.5 2 6.5 5.5" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18.5 14.5c1.4.8 2.4 2.6 3 5.5" /></>,
  refresh: <><path d="M20 11a8 8 0 0 0-14.3-4.9L4 8" /><path d="M4 3v5h5" /><path d="M4 13a8 8 0 0 0 14.3 4.9L20 16" /><path d="M20 21v-5h-5" /></>,
  filter: <><path d="M3 5h18l-7 8.5V20l-4-2v-4.5z" /></>,
  key: <><circle cx="8" cy="15" r="4" /><path d="m10.8 12.2 8.2-8.2M16 7l3 3M14 9l2 2" /></>,
  help: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.6 2.6 0 0 1 5 1c0 1.8-2.5 2.2-2.5 3.8M12 17h.01" /></>,
  money: <><rect x="2.5" y="6" width="19" height="12" rx="2" /><circle cx="12" cy="12" r="2.8" /><path d="M6 9.5v.01M18 14.5v.01" /></>,
  star: <><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" /></>,
  rocket: <><path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2" /><path d="M9 15l-3-3c1-4 5-9 13-9 0 8-5 12-9 13z" /><circle cx="15" cy="9" r="1.5" /></>,
  package: <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z" /><path d="m4 7.5 8 4.5 8-4.5M12 12v9" /></>,
  palette: <><path d="M12 3a9 9 0 1 0 0 18c1.2 0 1.7-.8 1.7-1.6 0-1.4-1-1.6-1-2.7 0-1 .8-1.7 1.8-1.7H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3z" /><path d="M7.5 11.5h.01M10 7.5h.01M14.5 7.5h.01" /></>,
  sparkle: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" /></>,
  scissors: <><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M8.5 7.5 20 18M8.5 16.5 20 6" /></>,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9S9.5 5.5 12 3z" /></>,
};

// Seção sem ícone escolhido: o ícone vem do título (a primeira regra que bater).
const BY_WORD = [
  [/telegram|bot|mensagem/i, "bot"],
  [/desejo/i, "heart"],
  [/cart[aã]o|cart[oõ]es|fatura|parcela/i, "card"],
  [/empr[eé]stimo|d[ií]vida|adiantamento/i, "money"],
  [/caixinha|reserva|investiment/i, "piggy"],
  [/duas etapas|2fa|sess[oõ]es|privad|senha/i, "lock"],
  [/demonstra/i, "eye"],
  [/celular|mobile/i, "phone"],
  [/tema claro|tema escuro/i, "moon"],
  [/anima[cç]/i, "sparkle"],
  [/hospedag|firebase|publicad|deploy|export est/i, "rocket"],
  [/sal[aá]rio|contas fixas|pago/i, "check"],
  [/h[aá]bito|sequ[eê]ncia/i, "refresh"],
  [/hoje|hor[aá]rio|agora/i, "clock"],
  [/matr[ií]cula|pesquis|busca|localiz/i, "search"],
  [/pasta/i, "folder"],
  [/c[oó]pia|copia/i, "copy"],
  [/aluno|equipe|cliente|colaborador|respons[aá]vel/i, "users"],
  [/hist[oó]rico/i, "history"],
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

export const findIcon = (text) => BY_WORD.find(([pattern]) => pattern.test(text))?.[1];
export const iconFor = (text) => findIcon(text) ?? "layers";

/** Um ícone do conjunto (`name`), ou o que combina com o texto (`label`). */
export function Icon({ name, label = "", className = "" }) {
  const key = name && ICONS[name] ? name : iconFor(label);
  return <svg className={`${styles.icon} ${className}`} viewBox="0 0 24 24" aria-hidden="true">{ICONS[key]}</svg>;
}

/** Ícone num selo redondo, no lugar do número ao lado dos títulos ("01", "02"...). */
export function SectionIcon({ name, label = "" }) {
  return <span className={styles.badge}><Icon name={name} label={label} /></span>;
}

/** Marcador de passo quando a ordem importa: um número simples num círculo. */
export function StepDot({ n }) {
  return <span className={styles.step} aria-hidden="true">{n}</span>;
}
