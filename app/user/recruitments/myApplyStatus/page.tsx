import styles from "./myApplyStatus.module.scss";

import MyApplyStatusItem from "../_components/myApplyStatusItem/myApplyStatusItem";

export default function Page() {
  return (
    <div>
      <div className={styles["myapplystatus__title-container"]}>
        <h1 className={styles["myapplystatus__title"]}>신청 현황</h1>
      </div>
      {/* 필터 */}
      <div className={styles["myapplystatus__filter"]}>
        <button className={`${styles["myapplystatus__filter-item"]} ${styles["myapplystatus__filter-item--active"]}`}>
          전체
        </button>
        <button className={styles["myapplystatus__filter-item"]}>수락됨</button>
        <button className={styles["myapplystatus__filter-item"]}>수락대기</button>
        <button className={styles["myapplystatus__filter-item"]}>거절됨</button>
      </div>
      <div className={styles["myapplystatus__separator"]} />

      <MyApplyStatusItem />
    </div>
  );
}
