// 글로벌 레이아웃

import type { ReactNode } from "react";

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

import styles from "./layout.module.scss";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.layout}>
      <header>
        <Header />
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}
