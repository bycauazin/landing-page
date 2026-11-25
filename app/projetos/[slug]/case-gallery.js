"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "./case-icons";
import styles from "./case-gallery.module.css";

/**
 * Galeria das telas de um projeto: abas com ícone em cima, a tela escolhida grande
 * numa moldura de navegador (ou de celular, quando `phone`) e uma legenda curta.
 * `screens`: [{ src, label, icon, caption, phone? }]. `host` aparece na barra do navegador.
 */
export default function CaseGallery({ screens, host, note }) {
  const [active, setActive] = useState(0);
  const screen = screens[active];

  const onKey = (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = (active + (event.key === "ArrowRight" ? 1 : screens.length - 1)) % screens.length;
    setActive(next);
    event.currentTarget.querySelectorAll("[role=tab]")[next]?.focus();
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.tabs} role="tablist" aria-label="Telas do projeto" onKeyDown={onKey}>
        {screens.map((s, i) => (
          <button
            key={s.src}
            type="button"
            role="tab"
            id={`screen-tab-${i}`}
            aria-selected={i === active}
            aria-controls="screen-panel"
            tabIndex={i === active ? 0 : -1}
            className={i === active ? styles.activeTab : undefined}
            onClick={() => setActive(i)}
          >
            <Icon name={s.icon} label={s.label} />
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      <div className={styles.stage} role="tabpanel" id="screen-panel" aria-labelledby={`screen-tab-${active}`}>
        {screen.phone ? (
          <figure className={styles.phone} key={screen.src}>
            <Image src={screen.src} alt={`${screen.label}: ${screen.caption}`} width={780} height={1688} sizes="300px" />
          </figure>
        ) : (
          <figure className={styles.browser} key={screen.src}>
            <div className={styles.bar} aria-hidden="true"><i /><i /><i /><span>{host}</span></div>
            <Image src={screen.src} alt={`${screen.label}: ${screen.caption}`} width={1600} height={1000} sizes="(max-width: 900px) 100vw, 1000px" />
          </figure>
        )}
        <p className={styles.caption}><Icon name={screen.icon} label={screen.label} /><span><strong>{screen.label}.</strong> {screen.caption}</span></p>
      </div>
      {note && <p className={styles.note}>{note}</p>}
    </div>
  );
}
