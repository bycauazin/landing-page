import styles from "./brand-logo.module.css";

// Logo do bycauazin no estilo adesivo (fita em espiral com contorno grosso), sem fundo.
// Tema escuro: contorno claro e fita escura (/logo-sticker.svg).
// Tema claro: contorno escuro e fita clara (/logo-sticker-light.svg). O CSS mostra uma das duas pelo data-theme.
// Sem <span> em volta: os cabeçalhos escondem "span" dentro do link da marca no celular.
// size = altura em px; a largura sai da proporção da fita (826 × 1760).
export default function BrandLogo({ className = "", size = 46 }) {
  const width = Math.round(size * 826 / 1760);
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element -- SVG pequeno e estático; não precisa do next/image */}
      <img className={`${styles.logo} ${styles.dark} ${className}`} src="/logo-sticker.svg" alt="" width={width} height={size} />
      {/* eslint-disable-next-line @next/next/no-img-element -- idem */}
      <img className={`${styles.logo} ${styles.light} ${className}`} src="/logo-sticker-light.svg" alt="" width={width} height={size} />
    </>
  );
}
