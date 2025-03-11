import Badge from "@/components/badge/badge";

import styles from "./myRecruitmentItem.module.scss";

import { FaHeart, FaEye, FaComment } from "react-icons/fa";

interface MyRecruitmentItemProps {
  projectTitle: string;
  description: string;
  status: "모집중" | "모집완료";
  likeCount: number;
  viewCount: number;
  commentCount: number;
  nickName: string;
  timePassed: string;
  onClick?: () => void;
}
export default function MyRecruitmentItem({
  projectTitle,
  description,
  status,
  nickName,
  timePassed,
  likeCount,
  viewCount,
  commentCount,
  onClick,
}: MyRecruitmentItemProps) {
  const badgeColor = status === "모집중" ? "primary" : "red";
  return (
    <div onClick={onClick}>
      <div className={styles["myrecruitmentitem__post-item"]}>
        <div className={styles["myrecruitmentitem__post-content"]}>
          <div className={styles["myrecruitmentitem__post-header"]}>
            <Badge color={badgeColor} fontColor="white" width={60} height={24} borderRadius={16} fontSize={12}>
              {status}
            </Badge>
            <h2 className={styles["myrecruitmentitem__post-title"]}>{projectTitle}</h2>
          </div>
          <p className={styles["myrecruitmentitem__post-description"]}>{description}</p>
          <div className={styles["myrecruitmentitem__post-meta"]}>
            <div>
              <span className={styles["myrecruitmentitem__post-author"]}>{nickName}</span>
              <span className={styles["myrecruitmentitem__post-dot"]}>·</span>
              <span className={styles["myrecruitmentitem__post-date"]}>{timePassed}</span>
            </div>
            <div className={styles["myrecruitmentitem__post-stats"]}>
              <div className={styles["myrecruitmentitem__post-stats-heart"]}>
                <FaHeart /> <span>{likeCount}</span>
              </div>
              <div className={styles["myrecruitmentitem__post-stats-eye"]}>
                <FaEye /> <span>{viewCount}</span>
              </div>
              <div className={styles["myrecruitmentitem__post-stats-comment"]}>
                <FaComment /> <span>{commentCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
