import Badge from "@/components/badge/badge";

import styles from "./myRecruitmentItem.module.scss";

import { FaHeart, FaEye, FaComment } from "react-icons/fa";

interface MyRecruitmentItemProps {
  projectTitle: string;
  description: string;
  status: "모집중" | "마감";
  LikeCount: number;
  ViewCount: number;
  CommentCount: number;
  nickName: string;
  timePassed: number;
}
export default function MyRecruitmentItem({
  projectTitle,
  description,
  status,
  nickName,
  timePassed,
  LikeCount,
  ViewCount,
  CommentCount,
}: MyRecruitmentItemProps) {
  const badgeColor = status === "모집중" ? "primary" : "red";
  return (
    <div>
      <div className={styles["myrecruitmentitem__post-item"]}>
        <div className={styles["myrecruitmentitem__post-content"]}>
          <div className={styles["myrecruitmentitem__post-header"]}>
            <Badge color={badgeColor} fontColor="white" width={60} height={24} borderRadius={16} fontSize={12}>
              모집중
            </Badge>
            <h2 className={styles["myrecruitmentitem__post-title"]}>{projectTitle}</h2>
          </div>
          <p className={styles["myrecruitmentitem__post-description"]}>{description}</p>
          <div className={styles["myrecruitmentitem__post-meta"]}>
            <div>
              <span className={styles["myrecruitmentitem__post-author"]}>{nickName}</span>
              <span className={styles["myrecruitmentitem__post-dot"]}>·</span>
              <span className={styles["myrecruitmentitem__post-date"]}>{timePassed}분 전</span>
            </div>
            <div className={styles["myrecruitmentitem__post-stats"]}>
              <div className={styles["myrecruitmentitem__post-stats-heart"]}>
                <FaHeart /> <span>{LikeCount}</span>
              </div>
              <div className={styles["myrecruitmentitem__post-stats-eye"]}>
                <FaEye /> <span>{ViewCount}</span>
              </div>
              <div className={styles["myrecruitmentitem__post-stats-comment"]}>
                <FaComment /> <span>{CommentCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
