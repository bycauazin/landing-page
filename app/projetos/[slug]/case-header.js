"use client";

import Link from "next/link";
import BrandLogo from "../../components/brand-logo";
import { useLightMode } from "../../components/use-theme";
import chrome from "./case-chrome.module.css";

/**
 * Cabeçalho de todas as páginas de projeto: logo (volta para os destaques da home),
 * "Todos os projetos" e o botão de tema, o mesmo da home (a escolha vale no site inteiro).
 * `styles` é o CSS Module da página, para cada estudo de caso manter o seu header.
 */
export default function CaseHeader({ styles }) {
  const [lightMode, toggleTheme] = useLightMode();
  const label = lightMode ? "Ativar tema escuro" : "Ativar tema claro";

  return (
    <header className={styles.header}>
      <Link className={`${styles.brand} ${chrome.brand}`} href="/#projetos" aria-label="Voltar ao início"><BrandLogo className={chrome.brandMark} size={34} /> bycauazin</Link>
      <div className={chrome.headerActions}>
        <Link className={styles.backLink} href="/projetos">← Todos os projetos</Link>
        <button className={chrome.themeToggle} type="button" onClick={toggleTheme} aria-label={label} title={label}>
          <span aria-hidden="true">{lightMode ? "☾" : "☼"}</span>
        </button>
      </div>
    </header>
  );
}
