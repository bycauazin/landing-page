import Image from "next/image";
import { technologies } from "../data/projects";
import styles from "./technology-icon.module.css";

export default function TechnologyIcon({ technology, size = "md", showLabel = false, decorative = false, className = "" }) {
  const technologyConfig = technologies[technology];
  const simpleIcon = typeof technologyConfig.icon === "object" ? technologyConfig.icon : null;
  const asset = typeof technologyConfig.icon === "string" ? technologyConfig.icon : null;
  const accessibleProps = showLabel || decorative ? {} : { role: "img", "aria-label": technologyConfig.label, title: technologyConfig.label };

  return (
    <span className={`${styles.technology} ${styles[size]} ${className}`} data-technology={technology} {...accessibleProps}>
      <span className={styles.iconFrame} aria-hidden="true">
        {simpleIcon && (
          <svg
            className={styles.graphic}
            viewBox="0 0 24 24"
            style={{ color: technology === "nextjs" ? "var(--paper)" : `#${simpleIcon.hex}` }}
          >
            <path fill="currentColor" d={simpleIcon.path} />
          </svg>
        )}
        {asset && <Image className={styles.graphic} src={asset} alt="" width={48} height={48} />}
      </span>
      {showLabel && <span className={styles.label}>{technologyConfig.label}</span>}
    </span>
  );
}
