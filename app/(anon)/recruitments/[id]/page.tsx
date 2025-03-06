import { redirect } from "next/navigation";

import styles from "./recruitmentDetail.module.scss";

import type { RecruitmentDetailDto } from "@/application/usecases/recruitment/dtos/recruitmentDetailDto";

import CommentForm from "./_components/commentForm";
import CommentContentList from "./_components/commentContentList";
import RecruitmentContent from "./_components/recruitmentContent";

const RecruitmentDetail = async ({ params }: { params: { id: string } }) => {
  const basicUrl = process.env.NEXT_PUBLIC_API_BASE;

  if (!params?.id || isNaN(Number(params.id))) {
    console.error("잘못된 접근입니다.");
    redirect("/");
  }

  const id = Number(params.id);

  // 프로젝트 상세 정보 가져오기 (SSR)
  const res = await fetch(`${basicUrl}api/recruitments/${id}`);

  if (!res.ok) {
    console.log("프로젝트 정보를 불러오는 중 오류가 발생했습니다");
  }

  const project: RecruitmentDetailDto = await res.json();

  return (
    <div className={styles.container}>
      <RecruitmentContent project={project} />
      <CommentContentList comments={project.comments} />
      <CommentForm projectId={project.id} />
    </div>
  );
};

export default RecruitmentDetail;
