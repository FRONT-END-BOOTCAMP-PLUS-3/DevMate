"use client";
import { filters, useFilterStore } from "@/hooks/use-filterStore";

import styles from "./filter.module.scss";

export default function Filter() {
  const { selectedFilter, setFilter } = useFilterStore();

  function handleClick(filter: "전체" | "모집중" | "모집완료") {
    setFilter(filter);
  }

  return (
    <div className={styles.filter}>
      {filters.map((filter) => (
        <button
          key={filter}
          className={`${styles.filter__item} ${selectedFilter === filter ? styles.active : ""}`}
          onClick={() => handleClick(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
