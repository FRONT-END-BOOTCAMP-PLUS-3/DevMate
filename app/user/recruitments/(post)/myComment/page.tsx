// 마이페이지 - 작성한 모집글
"use client";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import MyRecruitmentItem from "@/app/user/recruitments/(post)/_components/myRecruitmentItem/myRecruitmentItem";

import { useFilterStore } from "@/hooks/use-filterStore";

import { decodeToken } from "@/utils/cookie";
import { elapsedText } from "@/utils/elapsedText";
import { getMyProjects } from "@/utils/service/getMyProjects";

import type { RecruitmentsDto } from "@/application/usecases/recruitment/dtos/recruitmentsDto";

import Loading from "../_components/loading/loading";

export default function Page() {
  const { selectedFilter } = useFilterStore();
  const [userId, setUserId] = useState<string>();
  const [projects, setProjects] = useState<RecruitmentsDto[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const fetchUserId = async () => {
    const id = await decodeToken("id");
    setUserId(id as string);
  };

  const fetchProjects = async () => {
    if (!userId) return;
    try {
      setIsLoading(true);
      const data = await getMyProjects({ userId, status: "ALL", filter: "COMMENT" });
      setProjects(data);
      console.log("data", data);
    } catch (err) {
      console.log("프로젝트를 불러오는 데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchProjects();
    }
  }, [userId]);
  const filteredProjects = projects?.filter((data) => {
    const isRecruitmentActive = new Date() < new Date(data.recruitmentEnd) ? "모집중" : "모집완료";
    if (selectedFilter === "전체") return true;
    return selectedFilter === isRecruitmentActive;
  });
  return (
    <>
      {isLoading ? (
        <Loading isLoading={isLoading} />
      ) : filteredProjects?.length ? (
        filteredProjects.map((data) => (
          <MyRecruitmentItem
            onClick={() => router.push(`/recruitments/${data.id}`)}
            key={data.id}
            projectTitle={data.projectTitle}
            description={data.description.replace(/<\/?[^>]+(>|$)/g, "")}
            status={new Date() < new Date(data.recruitmentEnd) ? "모집중" : "모집완료"}
            nickName={data.leaderName ?? ""}
            timePassed={elapsedText(new Date(data.createdAt))}
            likeCount={data.likeCount ?? 0}
            viewCount={data.hits}
            commentCount={data.commentCount ?? 0}
          />
        ))
      ) : (
        <div>댓글 단 모집글이 없습니다.</div>
      )}
    </>
  );
}
