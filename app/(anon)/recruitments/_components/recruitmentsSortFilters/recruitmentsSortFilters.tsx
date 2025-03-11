"use client";

import { useRouter, useSearchParams } from "next/navigation";

import styles from "./recruitmentsSortFilters.module.scss";

export default function RecruitmentsSortFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeSort = searchParams.get("sort") || "최신순";

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", sort);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className={styles["main__sort-options"]}>
      {["최신순", "조회순", "댓글순", "좋아요순"].map((sort) => (
        <button
          key={sort}
          className={`${styles["main__sort-item"]} ${activeSort === sort ? styles["main__sort-item--active"] : ""}`}
          onClick={() => handleSortChange(sort)}
        >
          <span>• </span>
          {sort}
        </button>
      ))}
    </div>
  );
}
