import Link from "next/link";

import styles from "./recruitmentsWriteButton.module.scss";

export default function RecruitmentsWriteButton() {
  return (
    <div>
      <Link href="/user/recruitments/create" className={styles["main__write-button"]}>
        글쓰기
      </Link>
    </div>
  );
}
