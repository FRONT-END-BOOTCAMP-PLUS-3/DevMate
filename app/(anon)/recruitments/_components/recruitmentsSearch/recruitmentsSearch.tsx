"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";

import styles from "./recruitmentsSearch.module.scss";

import { FaSearch } from "react-icons/fa";

export default function RecruitmentsSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.set("search", searchValue);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className={styles["main__search"]}>
      <div className={styles["main__search-input"]}>
        <FaSearch className={styles["main__search-icon"]} />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="팀 프로젝트, 사이드 프로젝트를 검색해보세요!"
        />
      </div>
      <button className={styles["main__search-button"]} onClick={handleSearch}>
        검색
      </button>
    </div>
  );
}
