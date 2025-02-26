// 마이페이지 - 작성한 모집글
import styles from "./myCreate.module.scss";

import MyRecruitmentItem from "../_components/myRecruitmentItem/MyRecruitmentItem";

export default function Page() {
  return (
    <div>
      <div className={styles["mycreate__title-container"]}>
        <h1 className={styles["mycreate__title"]}>모집글 조회</h1>
        <h2 className={styles["mycreate__subtitle"]}>작성한 모집글</h2>
      </div>
      {/* 필터 */}
      <div className={styles["mycreate__filter"]}>
        <button className={`${styles["mycreate__filter-item"]} ${styles["mycreate__filter-item--active"]}`}>
          전체
        </button>
        <button className={styles["mycreate__filter-item"]}>모집중</button>
        <button className={styles["mycreate__filter-item"]}>모집완료</button>
      </div>
      <div className={styles["mycreate__separator"]} />

      <MyRecruitmentItem />
    </div>
  );
}
