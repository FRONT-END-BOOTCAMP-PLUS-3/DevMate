import Image from "next/image";

import styles from "./footer.module.scss";

import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__left}>
        <Image src="/footerLogo.svg" alt="Logo" className={styles.footer__logo} width={60} height={60} />
      </div>
      <div className={styles.footer__center}>
        <p className={styles.footer__text}>
          &quot;Building connections, crafting ideas, and creating the future—together.&quot;
          <br />
          DevMate, where developers unite
        </p>
      </div>
      <div className={styles.footer__right}>
        <a
          href="https://github.com/FRONT-END-BOOTCAMP-PLUS-3/DevMate"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footer__githubLink}
        >
          <FaGithub className={styles.footer__githubIcon} />
          <span className={styles.footer__githubText}>GitHub</span>
        </a>
      </div>
    </footer>
  );
}
