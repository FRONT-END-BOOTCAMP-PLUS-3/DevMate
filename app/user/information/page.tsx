// 마이페이지 - 계정 정보
import styles from "./information.module.scss";

export default function Page() {
  return (
    <div>
      <div className={styles["information__title-container"]}>
        <h1 className={styles["information__title"]}>계정 정보</h1>
      </div>
      <div className={styles["information__separator"]} />
    </div>
  );
}
