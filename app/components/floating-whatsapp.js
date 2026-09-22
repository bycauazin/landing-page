import WhatsAppIcon from "./whatsapp-icon";
import styles from "./floating-whatsapp.module.css";

export default function FloatingWhatsApp() {
  return (
    <a
      className={styles.button}
      href="https://wa.me/5521988120757"
      target="_blank"
      rel="noreferrer"
      aria-label="Conversar com Cauã pelo WhatsApp"
      title="Conversar pelo WhatsApp"
    >
      <WhatsAppIcon size={25} />
      <span>WhatsApp</span>
    </a>
  );
}
