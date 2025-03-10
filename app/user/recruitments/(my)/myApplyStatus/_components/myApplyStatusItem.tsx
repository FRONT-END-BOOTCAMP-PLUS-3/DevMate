import Badge from "@/components/badge/badge";

import styles from "./myApplyStatusItem.module.scss";

import { FaHeart, FaEye, FaComment } from "react-icons/fa";

export default function MyApplyStatusItem() {
  return (
    <div className={styles["myapplystatusitem__post-item"]}>
      <div className={styles["myapplystatusitem__post-content"]}>
        <div className={styles["myapplystatusitem__post-header-button"]}>
          <div className={styles["myapplystatusitem__post-header-description"]}>
            <div className={styles["myapplystatusitem__post-header"]}>
              <Badge color="primary" fontColor="white" width={60} height={24} borderRadius={16} fontSize={12}>
                모집중
              </Badge>
              <h2 className={styles["myapplystatusitem__post-title"]}>프로젝트 제목</h2>
            </div>
            <p className={styles["myapplystatusitem__post-description"]}>
              프로젝트 설명이 여기에 들어갑니다.프로젝트 설명이 여기에 들어갑니다.프로젝트 설명이 여기에
              들어갑니다.프로젝트 설명이 여기에 들어갑니다.프로젝트 설명이 여기에 들어갑니다.프로젝트 설명이 여기에
              들어갑니다.프로젝트 설명이 여기에 들어갑니다.프로젝트 설명이 여기에 들어갑니다.프로젝트 설명이 여기에
              들어갑니다.
            </p>
          </div>
          <button className={styles["myapplystatusitem__apply-button"]}>지원서 보기</button>
        </div>
        <div className={styles["myapplystatusitem__post-meta"]}>
          <div>
            <span className={styles["myapplystatusitem__post-author"]}>신짱구</span>
            <span className={styles["myapplystatusitem__post-dot"]}>·</span>
            <span className={styles["myapplystatusitem__post-date"]}>5분 전</span>
          </div>
          <div className={styles["myapplystatusitem__post-stats"]}>
            <div className={styles["myapplystatusitem__post-stats-heart"]}>
              <FaHeart /> <span>12</span>
            </div>
            <div className={styles["myapplystatusitem__post-stats-eye"]}>
              <FaEye /> <span>34</span>
            </div>
            <div className={styles["myapplystatusitem__post-stats-comment"]}>
              <FaComment /> <span>5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
