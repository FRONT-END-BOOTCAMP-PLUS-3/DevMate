"use client";

import { useSearchParams, useRouter } from "next/navigation";

import styles from "./recruitmentsFilters.module.scss";

export default function RecruitmentsFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeFilter = searchParams.get("status") || "전체";

  const handleFilterClick = (filter: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("status", filter);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className={styles["main__filter"]}>
      {["전체", "모집중", "모집완료"].map((filter) => (
        <button
          key={filter}
          className={`${styles["main__filter-item"]} ${activeFilter === filter ? styles["main__filter-item--active"] : ""}`}
          onClick={() => handleFilterClick(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
