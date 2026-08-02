import Image from "next/image";
import { siGithub, siInstagram, siTiktok } from "simple-icons";
import styles from "./social-icon.module.css";

const socialIcons = {
  github: { icon: siGithub, color: "var(--paper)" },
  tiktok: { icon: siTiktok, color: "var(--paper)" },
  instagram: { icon: siInstagram, color: "#E4405F" },
  linkedin: { asset: "/social-icons/linkedin.svg", color: "#0A66C2" },
};

export default function SocialIcon({ social, className = "" }) {
  const { icon, asset, color } = socialIcons[social];
  return <span className={`${styles.icon} ${className}`} style={{ color }} aria-hidden="true">{icon && <svg viewBox="0 0 24 24"><path fill="currentColor" d={icon.path} /></svg>}{asset && <Image src={asset} alt="" width={22} height={22} />}</span>;
}
