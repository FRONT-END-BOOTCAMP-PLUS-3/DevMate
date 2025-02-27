"use client";

import { usePathname } from "next/navigation";

import type { ReactNode } from "react";

import styles from "./layout.module.scss";

import Sidebar from "../_components/sidebar/sidebar";

export default function MypageLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // `/user/recruitments/[id]/apply`, `/user/recruitments/[id]/edit`, `/user/recruitments/create` 경로 예외 처리
  const isExcludedPage =
    /^\/user\/recruitments\/[^/]+\/apply$/.test(pathname) ||
    /^\/user\/recruitments\/[^/]+\/edit$/.test(pathname) ||
    pathname === "/user/recruitments/create";

  // 해당 경로에서는 레이아웃을 적용하지 않음
  if (isExcludedPage) return <>{children}</>;

  return (
    <div className={styles.layout}>
      <section className={styles.layout__sidebar}>
        <Sidebar />
      </section>
      <main className={styles.layout__content}>{children}</main>
    </div>
  );
}
