import styles from "./recruitments.module.scss";

import RecruitmentsItem from "./_components/recruitmentsItem/recruitmentsItem";

import { FaSearch, FaHashtag } from "react-icons/fa";

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
        <div className={styles["main__filter"]}>
          <button className={`${styles["main__filter-item"]} ${styles["main__filter-item--active"]}`}>전체</button>
          <button className={styles["main__filter-item"]}>모집중</button>
          <button className={styles["main__filter-item"]}>모집완료</button>
        </div>
        <div className={styles["main__separator"]} />

        {/* 검색창 */}
        <div className={styles["main__search"]}>
          <div className={styles["main__search-input"]}>
            <FaSearch className={styles["main__search-icon"]} />
            <input type="text" placeholder="팀 프로젝트, 사이드 프로젝트를 검색해보세요!" />
          </div>
          <button className={styles["main__search-button"]}>검색</button>
        </div>

        {/* 태그 검색창 */}
        <div className={styles["main__tag-search"]}>
          <div className={styles["main__tag-input"]}>
            <FaHashtag className={styles["main__tag-icon"]} />
            <input type="text" placeholder="태그로 검색해보세요!" />
          </div>
          <button className={styles["main__tag-reset"]}>초기화</button>
        </div>

        {/* 정렬 필터 + 글쓰기 버튼 */}
        <div className={styles["main__sort"]}>
          <div className={styles["main__sort-options"]}>
            <button className={`${styles["main__sort-item"]} ${styles["main__sort-item--active"]}`}>• 최신순</button>
            <button className={styles["main__sort-item"]}>• 조회수순</button>
            <button className={styles["main__sort-item"]}>• 댓글많은순</button>
            <button className={styles["main__sort-item"]}>• 좋아요순</button>
          </div>
          <button className={styles["main__write-button"]}>글쓰기</button>
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
