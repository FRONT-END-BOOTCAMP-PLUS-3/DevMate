// 마이페이지 - 좋아요한 모집글
import styles from "./myLike.module.scss";

import MyRecruitmentItem from "../_components/myRecruitmentItem/MyRecruitmentItem";

export default function Page() {
  return (
    <div>
      <div className={styles["mylike__title-container"]}>
        <h1 className={styles["mylike__title"]}>모집글 조회</h1>
        <h2 className={styles["mylike__subtitle"]}>좋아요 한 모집글</h2>
      </div>
      {/* 필터 */}
      <div className={styles["mylike__filter"]}>
        <button className={`${styles["mylike__filter-item"]} ${styles["mylike__filter-item--active"]}`}>전체</button>
        <button className={styles["mylike__filter-item"]}>모집중</button>
        <button className={styles["mylike__filter-item"]}>모집완료</button>
      </div>
      <div className={styles["mylike__separator"]} />

      <MyRecruitmentItem />
    </div>
  );
}
