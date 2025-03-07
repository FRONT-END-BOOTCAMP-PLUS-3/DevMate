"use client";

import { useState } from "react";

import styles from "./recruitmentsFilters.module.scss";

export default function RecruitmentsFilters() {
  const [activeFilter, setActiveFilter] = useState("전체");

  return (
    <div className={styles["main__filter"]}>
      {["전체", "모집중", "모집완료"].map((filter) => (
        <button
          key={filter}
          className={`${styles["main__filter-item"]} ${activeFilter === filter ? styles["main__filter-item--active"] : ""}`}
          onClick={() => setActiveFilter(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
