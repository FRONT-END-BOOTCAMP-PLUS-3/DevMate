"use client";
import { usePathname } from "next/navigation";

import { useState, useEffect } from "react";

import styles from "./clientPath.module.scss";

export default function FolderPath() {
  const pathname = usePathname(); // 현재 URL 가져오기
  const [titleSub, setTitleSub] = useState("작성한 모집글");

  useEffect(() => {
    const lastPath = pathname.split("/").pop() || "/";
    if (lastPath === "myComment") {
      setTitleSub("댓글 쓴 글");
    } else if (lastPath === "myCreate") {
      setTitleSub("작성한 글");
    } else if (lastPath === "myLike") {
      setTitleSub("좋아요한 글");
    } else {
      setTitleSub("작성한 모집글"); // 기본값
    }
  }, [pathname]); // pathname이 변경될 때마다 실행

  return (
    <div className={styles.layout__title}>
      <h1 className={styles.layout__title__main}>모집글 조회</h1>
      <h2 className={styles.layout__title__sub}>{titleSub}</h2>
    </div>
  );
}
