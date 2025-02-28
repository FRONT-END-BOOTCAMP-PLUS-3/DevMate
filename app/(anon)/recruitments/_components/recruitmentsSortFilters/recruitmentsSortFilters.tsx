"use client";

import styles from "./recruitmentsSortFilters.module.scss";

export default function RecruitmentsSortFilters() {
  return (
    <div className={styles["main__sort-options"]}>
      <button className={`${styles["main__sort-item"]} ${styles["main__sort-item--active"]}`}>• 최신순</button>
      <button className={styles["main__sort-item"]}>• 조회수순</button>
      <button className={styles["main__sort-item"]}>• 댓글많은순</button>
      <button className={styles["main__sort-item"]}>• 좋아요순</button>
    </div>
  );
}
