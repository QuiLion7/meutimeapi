import styles from './Footer.module.css'

import { BsInstagram, BsGithub, BsWhatsapp, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  const handleLinkClick = (link) => {
    window.open(link, '_blank')
  }

  return (
    <footer className={styles.footer}>
      <ul className={styles.social_media}>
        <li className={`${styles.icon} ${styles.github}`}>
          <span className={styles.icon_text}>GitHub</span>
          <span className={styles.span_icon} onClick={() => handleLinkClick('https://github.com/QuiLion7?tab=repositories')} target="_blank"><BsGithub /></span>
        </li>
        <li className={`${styles.icon} ${styles.instagram}`}>
          <span className={styles.icon_text}>Instagram</span>
          <span className={styles.span_icon} onClick={() => handleLinkClick('https://www.instagram.com/quilion7/')} target="_blank"><BsInstagram /></span>
        </li>
        <li className={`${styles.icon} ${styles.linkedin}`}>
          <span className={styles.icon_text}>LinKedin</span>
          <span className={styles.span_icon} onClick={() => handleLinkClick('https://www.linkedin.com/in/quilion-oliveira-18820b31/')} target="_blank"><BsLinkedin /></span>
        </li>
        <li className={`${styles.icon} ${styles.whatsapp}`}>
          <span className={styles.icon_text}>WhatsApp</span>
          <span className={styles.span_icon} onClick={() => handleLinkClick('https://api.whatsapp.com/send?phone=5588981062656')} target="_blank"><BsWhatsapp /></span>
        </li>
      </ul>
      
      <p> Desenvolvido por Quilion Oliveira &copy; 2023</p>
    </footer>
  )
}

export default Footer