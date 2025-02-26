import type { ReactNode } from "react";

import styles from "./layout.module.scss";

import Sidebar from "./_components/sidebar/Sidebar";

export default function MypageLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.layout}>
      <section className={styles.layout__sidebar}>
        <Sidebar />
      </section>
      <main className={styles.layout__content}>{children}</main>
    </div>
  );
}
