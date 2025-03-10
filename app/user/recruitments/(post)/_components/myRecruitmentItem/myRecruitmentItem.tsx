import Badge from "@/components/badge/badge";

import styles from "./myRecruitmentItem.module.scss";

import { FaHeart, FaEye, FaComment } from "react-icons/fa";

export default function MyRecruitmentItem() {
  return (
    <div>
      <div className={styles["myrecruitmentitem__post-item"]}>
        <div className={styles["myrecruitmentitem__post-content"]}>
          <div className={styles["myrecruitmentitem__post-header"]}>
            <Badge color="primary" fontColor="white" width={60} height={24} borderRadius={16} fontSize={12}>
              모집중
            </Badge>
            <h2 className={styles["myrecruitmentitem__post-title"]}>프로젝트 제목</h2>
          </div>
          <p className={styles["myrecruitmentitem__post-description"]}>
            프로젝트 설명이 여기에 들어갑니다.프로젝트 설명이 여기에 들어갑니다.프로젝트 설명이 여기에
            들어갑니다.프로젝트 설명이 여기에 들어갑니다.프로젝트 설명이 여기에 들어갑니다.프로젝트 설명이 여기에
            들어갑니다.프로젝트 설명이 여기에 들어갑니다.프로젝트 설명이 여기에 들어갑니다.프로젝트 설명이 여기에
            들어갑니다.
          </p>
          <div className={styles["myrecruitmentitem__post-meta"]}>
            <div>
              <span className={styles["myrecruitmentitem__post-author"]}>신짱구</span>
              <span className={styles["myrecruitmentitem__post-dot"]}>·</span>
              <span className={styles["myrecruitmentitem__post-date"]}>5분 전</span>
            </div>
            <div className={styles["myrecruitmentitem__post-stats"]}>
              <div className={styles["myrecruitmentitem__post-stats-heart"]}>
                <FaHeart /> <span>12</span>
              </div>
              <div className={styles["myrecruitmentitem__post-stats-eye"]}>
                <FaEye /> <span>34</span>
              </div>
              <div className={styles["myrecruitmentitem__post-stats-comment"]}>
                <FaComment /> <span>5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
