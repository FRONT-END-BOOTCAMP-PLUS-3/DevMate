import styles from "./recruitments.module.scss";

import RecruitmentsItem from "./_components/recruitmentsItem/recruitmentsItem";
import RecruitmentsSearch from "./_components/recruitmentsSearch/recruitmentsSearch";
import RecruitmentsFilters from "./_components/recruitmentsFilters/recruitmentsFilters";
import RecruitmentsTagSearch from "./_components/recruitmentsTagSearch/recruitmentsTagSearch";
import RecruitmentsSortFilters from "./_components/recruitmentsSortFilters/recruitmentsSortFilters";
import RecruitmentsWriteButton from "./_components/recruitmentsWriteButton/recruitmentsWriteButton";

export default function Recruitments() {
  return (
    <div className={styles["main"]}>
      {/* 비주얼 영역 */}
      <div className={styles["main__visual"]}>
        <div className={styles["main__visual-container"]}>
          <h1 className={styles["main__visual-title"]}>프로젝트 팀원을 모집해보세요.</h1>
          <p className={styles["main__visual-subtitle"]}>협업을 통한 경험 노하우 쌓기</p>
        </div>
      </div>
      <div className={styles["main__container"]}>
        {/* 필터 */}
        <RecruitmentsFilters />

        <div className={styles["main__separator"]} />

        {/* 검색창 */}
        <RecruitmentsSearch />

        {/* 태그 검색창 */}
        <RecruitmentsTagSearch />

        {/* 정렬 필터 + 글쓰기 버튼 */}
        <div className={styles["main__sort"]}>
          <RecruitmentsSortFilters />
          <RecruitmentsWriteButton />
        </div>

        <div className={styles["main__post-separator"]} />

        {/* 글 리스트 */}
        <div className={styles["main__post-list"]}>
          <RecruitmentsItem />
        </div>
      </div>
    </div>
  );
}
