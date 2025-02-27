// 마이페이지 - 개설한 프로젝트
import styles from "./myOpen.module.scss";

import MyProjectItem from "../_components/myProjectItem/MyProjectItem";

export default function Page() {
  return (
    <div>
      <div className={styles["myopen__title-container"]}>
        <h1 className={styles["myopen__title"]}>프로젝트 조회</h1>
        <h2 className={styles["myopen__subtitle"]}>개설한 프로젝트</h2>
      </div>

      <MyProjectItem />
    </div>
  );
}
