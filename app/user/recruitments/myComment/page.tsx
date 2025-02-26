// 마이페이지 - 댓글 쓴 모집글
import styles from "./myComment.module.scss";

import MyRecruitmentItem from "../_components/myRecruitmentItem/MyRecruitmentItem";

export default function Page() {
  return (
    <div>
      <div className={styles["mycomment__title-container"]}>
        <h1 className={styles["mycomment__title"]}>모집글 조회</h1>
        <h2 className={styles["mycomment__subtitle"]}>댓글 쓴 모집글</h2>
      </div>
      {/* 필터 */}
      <div className={styles["mycomment__filter"]}>
        <button className={`${styles["mycomment__filter-item"]} ${styles["mycomment__filter-item--active"]}`}>
          전체
        </button>
        <button className={styles["mycomment__filter-item"]}>모집중</button>
        <button className={styles["mycomment__filter-item"]}>모집완료</button>
      </div>
      <div className={styles["mycomment__separator"]} />

      <MyRecruitmentItem />
    </div>
  );
}
