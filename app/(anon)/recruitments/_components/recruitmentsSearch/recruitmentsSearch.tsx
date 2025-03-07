"use client";

import styles from "./recruitmentsSearch.module.scss";

import { FaSearch } from "react-icons/fa";

export default function RecruitmentsSearch() {
  return (
    <div className={styles["main__search"]}>
      <div className={styles["main__search-input"]}>
        <FaSearch className={styles["main__search-icon"]} />
        <input type="text" placeholder="팀 프로젝트, 사이드 프로젝트를 검색해보세요!" />
      </div>
      <button className={styles["main__search-button"]}>검색</button>
    </div>
  );
}
