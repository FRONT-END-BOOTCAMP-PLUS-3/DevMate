"use client";

import type { ReactNode } from "react";

import styles from "./layout.module.scss";

import Sidebar from "../../_components/sidebar/sidebar";

export default function MypageLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.layout}>
      <section className={styles.layout__sidebar}>
        <Sidebar />
      </section>
      <div className={styles.layout__content}>
        <div className={styles.layout__title}>
          <h1 className={styles.layout__title__main}>모집글 조회</h1>
          <h2 className={styles.layout__title__sub}>작성한 모집글</h2>
        </div>
        {/* 필터 */}
        <div className={styles.layout__filter}>
          <button className={`${styles.layout__filter__item}`}>전체</button>
          <button className={styles.layout__filter__item}>모집중</button>
          <button className={styles.layout__filter__item}>모집완료</button>
        </div>
        <div className={styles.layout__separator} />
        <div>{children}</div>
      </div>
    </div>
  );
}
