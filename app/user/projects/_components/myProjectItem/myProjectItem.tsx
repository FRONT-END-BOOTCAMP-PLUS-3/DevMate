import styles from "./myProjectItem.module.scss";

export default function MyProjectItem() {
  return (
    <div>
      <div className={styles["myprojectitem__post-item"]}>
        <div className={styles["myprojectitem__post-content"]}>
          <div className={styles["myprojectitem__post-header"]}>
            <h2 className={styles["myprojectitem__post-title"]}>프로젝트 제목</h2>
          </div>
          <p className={styles["myprojectitem__post-description"]}>
            프로젝트 설명이 여기에 들어갑니다.프로젝트 설명이 여기에 들어갑니다.프로젝트 설명이 여기에
            들어갑니다.프로젝트 설명이 여기에 들어갑니다.프로젝트 설명이 여기에 들어갑니다.프로젝트 설명이 여기에
            들어갑니다.프로젝트 설명이 여기에 들어갑니다.프로젝트 설명이 여기에 들어갑니다.프로젝트 설명이 여기에
            들어갑니다.
          </p>
        </div>
        <div className={styles["myprojectitem__post-meta"]}>
          <span className={styles["myprojectitem__post-date"]}>2025년 01월 01일 ~ 2025년 03월 01일</span>
        </div>
      </div>
    </div>
  );
}
