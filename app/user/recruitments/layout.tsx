"use client";

import { usePathname } from "next/navigation";

import type { ReactNode } from "react";

import styles from "./layout.module.scss";

import Sidebar from "../_components/sidebar/Sidebar";

export default function MypageLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // `/user/recruitments/[id]/apply` 또는 `/user/recruitments/[id]/edit` 경로 예외 처리
  const isApplyOrEditPage =
    /^\/user\/recruitments\/[^/]+\/apply$/.test(pathname) || /^\/user\/recruitments\/[^/]+\/edit$/.test(pathname);

  // 해당 경로에서는 레이아웃을 적용하지 않음
  if (isApplyOrEditPage) return <>{children}</>;

  return (
    <div className={styles.layout}>
      <section className={styles.layout__sidebar}>
        <Sidebar />
      </section>
      <main className={styles.layout__content}>{children}</main>
    </div>
  );
}
