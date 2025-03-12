import type { ReactNode } from "react";

import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

import styles from "./layout.module.scss";

export default function AnonLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.layout}>
      <header>
        <Header />
      </header>
      <main className={styles.main}>{children}</main> {/* main에 클래스 추가 */}
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}
