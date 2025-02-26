"use client";

import { usePathname } from "next/navigation";

import type { ReactNode } from "react";

import styles from "./layout.module.scss";

import Sidebar from "../_components/sidebar/Sidebar";

export default function MypageLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // `/user/projects/[id]` 또는 `/user/projects/[id]/edit`이면서 `create`, `participate`는 제외
  const isDetailOrEditPage =
    /^\/user\/projects\/(?!myCreate$|myParticipate$)[^/]+$/.test(pathname) ||
    /^\/user\/projects\/(?!myCreate$|myParticipate$)[^/]+\/edit$/.test(pathname);

  // 해당 경로에서는 레이아웃을 적용하지 않음
  if (isDetailOrEditPage) return <>{children}</>;

  return (
    <div className={styles.layout}>
      <section className={styles.layout__sidebar}>
        <Sidebar />
      </section>
      <main className={styles.layout__content}>{children}</main>
    </div>
  );
}
