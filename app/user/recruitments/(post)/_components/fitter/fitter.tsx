"use client";
import { useState } from "react";

import styles from "./fitter.module.scss";

const Filter = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("전체");

  const handleClick = (filter: string) => {
    setSelectedFilter(filter);
  };

  return (
    <div className={styles.layout__filter}>
      {["전체", "모집중", "모집완료"].map((filter) => (
        <button
          key={filter}
          className={`${styles.layout__filter__item} ${selectedFilter === filter ? styles.active : ""}`}
          onClick={() => handleClick(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default Filter;
