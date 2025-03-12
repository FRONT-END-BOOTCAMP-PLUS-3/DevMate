import { notFound } from "next/navigation";

import styles from "./recruitmentDetail.module.scss";

import type { RecruitmentDetailDto } from "@/application/usecases/recruitment/dtos/recruitmentDetailDto";

import CommentForm from "./_components/commentForm";
import CommentContentList from "./_components/commentContentList";
import RecruitmentContent from "./_components/recruitmentContent";

const RecruitmentDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const basicUrl = process.env.NEXT_PUBLIC_API_BASE;
  const resolvedParams = await params;
  const id = resolvedParams.id;

  if (!id || isNaN(Number(id))) {
    return notFound();
  }

  const res = await fetch(`${basicUrl}api/recruitments/${Number(id)}`);

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
