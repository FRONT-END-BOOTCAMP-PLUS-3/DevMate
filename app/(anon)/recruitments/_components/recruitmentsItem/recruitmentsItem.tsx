import Badge from "@/components/badge/badge";

import { elapsedText } from "@/utils/elapsedText";

import styles from "./recruitmentsItem.module.scss";

import RecruitmentsTag from "../recruitmentsTag/recruitmentsTag";

import { FaHeart, FaEye, FaComment } from "react-icons/fa";

interface RecruitmentsItemProps {
  recruitmentData: {
    id: number; // 모집글 id
    recruitmentTitle: string; // 모집글 제목
    description: string; // 모집글 설명
    createdAt: Date; // 업로드 날짜
    leader: {
      nickname: string; // 리더 닉네임
    };
    projectTags: { id: number; projectTags: string }[]; // 태그 목록
    likes: { length: number }; // 좋아요 개수
    hits: number; // 조회수
    comments: { length: number }; // 댓글 개수
  };
}

export default function RecruitmentsItem({ recruitmentData }: RecruitmentsItemProps) {
  console.log(recruitmentData.createdAt);
  console.log(elapsedText(recruitmentData.createdAt));
  return (
    <div>
      <div className={styles["main__post-item"]}>
        <div className={styles["main__post-content"]}>
          <div className={styles["main__post-header"]}>
            <Badge color="primary" fontColor="white" width={60} height={24} borderRadius={16} fontSize={12}>
              모집중
            </Badge>
            <h2 className={styles["main__post-title"]}>{recruitmentData.recruitmentTitle}</h2>
          </div>
          <p className={styles["main__post-description"]}>{recruitmentData.description}</p>

          <RecruitmentsTag key={recruitmentData.id} tags={recruitmentData.projectTags.map((tag) => tag.projectTags)} />

          <div className={styles["main__post-meta"]}>
            <div>
              <span className={styles["main__post-author"]}>{recruitmentData.leader.nickname}</span>
              <span className={styles["main__post-dot"]}>·</span>
              <span className={styles["main__post-date"]}>{elapsedText(recruitmentData.createdAt)}</span>
            </div>
            <div className={styles["main__post-stats"]}>
              <div className={styles["main__post-stats-heart"]}>
                <FaHeart /> <span>{recruitmentData.likes.length}</span>
              </div>
              <div className={styles["main__post-stats-eye"]}>
                <FaEye /> <span>{recruitmentData.hits}</span>
              </div>
              <div className={styles["main__post-stats-comment"]}>
                <FaComment /> <span>{recruitmentData.comments.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
