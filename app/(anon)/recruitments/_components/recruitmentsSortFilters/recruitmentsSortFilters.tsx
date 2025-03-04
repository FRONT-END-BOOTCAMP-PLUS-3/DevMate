"use client";

import { useState } from "react";

import styles from "./recruitmentsSortFilters.module.scss";

export default function RecruitmentsSortFilters() {
  const [activeFilter, setActiveFilter] = useState("최신순");

  return (
    <div className={styles["main__sort-options"]}>
      {["최신순", "조회수순", "댓글많은순", "좋아요순"].map((filter) => (
        <button
          key={filter}
          className={`${styles["main__sort-item"]} ${activeFilter === filter ? styles["main__sort-item--active"] : ""}`}
          onClick={() => setActiveFilter(filter)}
        >
          <span>• </span>
          {filter}
        </button>
      ))}
    </div>
  );
}
