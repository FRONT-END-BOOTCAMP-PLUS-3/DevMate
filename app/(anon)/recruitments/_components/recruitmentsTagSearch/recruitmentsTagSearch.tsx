"use client";

import styles from "./recruitmentsTagSearch.module.scss";

import { FaHashtag } from "react-icons/fa";

export default function RecruitmentsTagSearch() {
  return (
    <div className={styles["main__tag-search"]}>
      <div className={styles["main__tag-input"]}>
        <FaHashtag className={styles["main__tag-icon"]} />
        <input type="text" placeholder="태그로 검색해보세요!" />
      </div>
      <button className={styles["main__tag-reset"]}>초기화</button>
    </div>
  );
}
