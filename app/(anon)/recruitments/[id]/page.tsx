import { notFound } from "next/navigation";

import styles from "./recruitmentDetail.module.scss";

import type { RecruitmentDetailDto } from "@/application/usecases/recruitment/dtos/recruitmentDetailDto";

import CommentForm from "./_components/commentForm";
import CommentContentList from "./_components/commentContentList";
import RecruitmentContent from "./_components/recruitmentContent";

const RecruitmentDetail = async ({ params }: { params: { id: string } }) => {
  const basicUrl = process.env.NEXT_PUBLIC_API_BASE;

  if (!params?.id || isNaN(Number(params.id))) {
    return notFound();
  }

  const id = Number(params.id);

  const res = await fetch(`${basicUrl}api/recruitments/${id}`);

  if (!res.ok) {
    if (res.status === 404) {
      return notFound();
    }

    console.log("프로젝트 정보를 불러오는 중 오류가 발생했습니다");
  }

  const project: RecruitmentDetailDto = await res.json();

  return (
    <div className={styles.container}>
      <RecruitmentContent project={project} />
      <CommentContentList comments={project?.comments || []} />
      <CommentForm projectId={project.id} />
    </div>
  );
};

export default RecruitmentDetail;
