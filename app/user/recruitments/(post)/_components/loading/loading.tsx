import styles from "./loading.module.scss";

import ClipLoader from "react-spinners/ClipLoader";

export default function Loading({ isLoading }: { isLoading: boolean }) {
  return (
    <div className={styles.loading}>
      <ClipLoader color="#868e96" loading={isLoading} size={100} aria-label="Loading Spinner" />
    </div>
  );
}
