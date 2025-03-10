"use client";
import { useRouter } from "next/navigation";

import Badge from "@/components/badge/badge";

import { elapsedText } from "@/utils/elapsedText";

import styles from "./recruitmentsItem.module.scss";

import type { RecruitmentsDto } from "@/application/usecases/recruitment/dtos/rectuitmentsDto";

import RecruitmentsTag from "../recruitmentsTag/recruitmentsTag";

import { FaHeart, FaEye, FaComment } from "react-icons/fa";

export default function RecruitmentsItem({ recruitment }: { recruitment: RecruitmentsDto }) {
  const router = useRouter();

  const goDetailHandler = () => {
    router.push(`/recruitments/${recruitment.id}`);
  };

  // 모집 종료일이 현재 시간보다 이전이면 '모집완료', 아니면 '모집중'
  const isRecruitmentActive = new Date() < new Date(recruitment.recruitmentEnd);
  const badgeText = isRecruitmentActive ? "모집중" : "모집완료";

  // 배지 색상 조건 설정
  const badgeColor = isRecruitmentActive ? "primary" : "darkGray";

  return (
    <div onClick={goDetailHandler}>
      <div className={styles["main__post-item"]}>
        <div className={styles["main__post-content"]}>
          <div className={styles["main__post-header"]}>
            <Badge color={badgeColor} fontColor="white" width={60} height={24} borderRadius={16} fontSize={12}>
              {badgeText}
            </Badge>
            <h2 className={styles["main__post-title"]}>{recruitment.recruitmentTitle}</h2>
          </div>
          <p className={styles["main__post-description"]}>{recruitment.description.replace(/<\/?[^>]+(>|$)/g, "")}</p>

          <RecruitmentsTag key={recruitment.id} tags={recruitment.projectTags.map((tag) => tag.tag.tagName)} />

          <div className={styles["main__post-meta"]}>
            <div>
              <span className={styles["main__post-author"]}>{recruitment.leaderName}</span>
              <span className={styles["main__post-dot"]}>·</span>
              <span className={styles["main__post-date"]}>{elapsedText(new Date(recruitment.createdAt))}</span>
            </div>
            <div className={styles["main__post-stats"]}>
              <div className={styles["main__post-stats-heart"]}>
                <FaHeart /> <span>{recruitment.likeCount}</span>
              </div>
              <div className={styles["main__post-stats-eye"]}>
                <FaEye /> <span>{recruitment.hits}</span>
              </div>
              <div className={styles["main__post-stats-comment"]}>
                <FaComment /> <span>{recruitment.commentCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
