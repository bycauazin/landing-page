"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "../page.module.css";

// Menu do celular: a navegação do topo some abaixo de 760px, então ela passa para este painel.
export default function MobileMenu({ links }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const closeOnOutside = (event) => { if (!wrapRef.current?.contains(event.target)) setOpen(false); };
    const closeOnEscape = (event) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div className={styles.mobileMenu} ref={wrapRef}>
      <button className={styles.menuToggle} type="button" aria-expanded={open} aria-controls="mobile-menu-panel" aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)}>
        <span aria-hidden="true">{open ? "✕" : "☰"}</span>
      </button>
      {open && (
        <nav className={styles.mobileMenuPanel} id="mobile-menu-panel" aria-label="Navegação principal">
          {links.map((link) => (
            <Link href={link.href} key={link.href} aria-current={link.current ? "page" : undefined} onClick={() => setOpen(false)}>
              {link.label}<span aria-hidden="true">→</span>
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
