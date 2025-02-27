// 마이페이지 - 참여한 프로젝트
import styles from "./myParticipate.module.scss";

import MyProjectItem from "../_components/myProjectItem/myProjectItem";

export default function Page() {
  return (
    <div>
      <div className={styles["myparticipate__title-container"]}>
        <h1 className={styles["myparticipate__title"]}>프로젝트 조회</h1>
        <h2 className={styles["myparticipate__subtitle"]}>참여한 프로젝트</h2>
      </div>

      <MyProjectItem />
    </div>
  );
}
