// 글로벌 레이아웃

import type { ReactNode } from "react";

import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

import styles from "./layout.module.scss";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.main}>{children}</main>

      <Footer />
    </div>
  );
}
