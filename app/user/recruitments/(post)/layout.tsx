import type { ReactNode } from "react";

import styles from "./layout.module.scss";

import Filter from "./_components/filter/filter";
import Sidebar from "../../_components/sidebar/sidebar";
import FolderPath from "./_components/clientPath/clientPath";

export default function MypageLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.layout}>
      <section className={styles.layout__sidebar}>
        <Sidebar />
      </section>
      <div className={styles.layout__content}>
        <FolderPath />
        <Filter />
        <div className={styles.layout__separator} />
        <div>{children}</div>
      </div>
    </div>
  );
}
