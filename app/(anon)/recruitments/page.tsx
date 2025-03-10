import styles from "./recruitments.module.scss";

import type { RecruitmentsDto } from "@/application/usecases/recruitment/dtos/rectuitmentsDto";

import RecruitmentsItem from "./_components/recruitmentsItem/recruitmentsItem";
import RecruitmentsSearch from "./_components/recruitmentsSearch/recruitmentsSearch";
import RecruitmentsFilters from "./_components/recruitmentsFilters/recruitmentsFilters";
import RecruitmentsTagSearch from "./_components/recruitmentsTagSearch/recruitmentsTagSearch";
import RecruitmentsSortFilters from "./_components/recruitmentsSortFilters/recruitmentsSortFilters";
import RecruitmentsWriteButton from "./_components/recruitmentsWriteButton/recruitmentsWriteButton";

const Recruitments = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const basicUrl = process.env.NEXT_PUBLIC_API_BASE;
  const query = await searchParams;

  let queryString = "";
  if (query.status) {
    queryString += `&status=${query.status}`;
  }
  if (query.sort) {
    queryString += `&sort=${query.sort}`;
  }
  if (query.search) {
    queryString += `&search=${query.search}`;
  }
  if (query.tags) {
    queryString += `&tags=${query.tags}`;
  }

  const res = await fetch(`${basicUrl}api/recruitments?${queryString}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.log("프로젝트 정보를 불러오는 중 오류가 발생했습니다");
  }

  const recruitments: RecruitmentsDto[] = await res.json();

  return (
    <div className={styles["main"]}>
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
          {recruitments.map((recruitment) => (
            <RecruitmentsItem key={recruitment.id} recruitment={recruitment} />
          ))}
        </div>

        {recruitments.length === 0 && (
          <div className={styles["main__post-none"]}>
            <p>모집글이 존재하지 않습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recruitments;
