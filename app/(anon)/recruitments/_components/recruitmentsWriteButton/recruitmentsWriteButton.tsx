"use client";

import styles from "./recruitmentsWriteButton.module.scss";

export default function RecruitmentsWriteButton() {
  return (
    <div>
      <button className={styles["main__write-button"]}>글쓰기</button>
    </div>
  );
}
