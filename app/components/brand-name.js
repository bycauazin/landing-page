import styles from "./brand-name.module.css";

// Nome da marca escolhido em 2026-11-25: <bycauazin/> em Major Mono Display ("by" no destaque,
// "<" e "/>" apagados). Usa <b>/<i> e não <span>: os estudos de caso têm regras para "span"
// dentro do link da marca.
export default function BrandName({ className = "" }) {
  return (
    <b className={`${styles.name} ${className}`}>
      <i className={styles.tag}>&lt;</i><i className={styles.by}>by</i>cauazin<i className={styles.tag}>/&gt;</i>
    </b>
  );
}
