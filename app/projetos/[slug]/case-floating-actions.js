import styles from "./case-floating-actions.module.css";

export default function CaseFloatingActions({ sections }) {
  return (
    <aside className={styles.actions} aria-label="Navegação rápida do estudo de caso">
      <details className={styles.topics}>
        <summary aria-label="Abrir tópicos do estudo de caso">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6h11M8 12h11M8 18h11M4 6h.01M4 12h.01M4 18h.01" /></svg>
          <span>Tópicos</span>
        </summary>
        <nav aria-label="Tópicos do estudo de caso">
          <strong>Nesta página</strong>
          {sections.map(({ href, label }, index) => (
            <a href={href} key={href}><span>{String(index + 1).padStart(2, "0")}</span>{label}</a>
          ))}
        </nav>
      </details>
      <a className={styles.top} href="#top" aria-label="Voltar ao topo" title="Voltar ao topo">
        <span aria-hidden="true">↑</span>
        <small>Topo</small>
      </a>
    </aside>
  );
}
