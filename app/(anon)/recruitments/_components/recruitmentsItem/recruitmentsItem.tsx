import Badge from "@/components/badge/badge";

import styles from "./recruitmentsItem.module.scss";

import RecruitmentsTag from "../recruitmentsTag/recruitmentsTag";

import { FaHeart, FaEye, FaComment } from "react-icons/fa";

export default function RecruitmentsItem() {
  return (
    <div>
      <div className={styles["main__post-item"]}>
        <div className={styles["main__post-content"]}>
          <div className={styles["main__post-header"]}>
            <Badge color="primary" fontColor="white" width={60} height={24} borderRadius={16} fontSize={12}>
              모집중
            </Badge>
            <h2 className={styles["main__post-title"]}>모집글 제목</h2>
          </div>
          <p className={styles["main__post-description"]}>모집글 설명이 여기에 들어갑니다.</p>
          <RecruitmentsTag tags={["Next.js", "React"]} />
          <div className={styles["main__post-meta"]}>
            <div>
              <span className={styles["main__post-author"]}>신짱구</span>
              <span className={styles["main__post-dot"]}>·</span>
              <span className={styles["main__post-date"]}>5분 전</span>
            </div>
            <div className={styles["main__post-stats"]}>
              <div className={styles["main__post-stats-heart"]}>
                <FaHeart /> <span>12</span>
              </div>
              <div className={styles["main__post-stats-eye"]}>
                <FaEye /> <span>34</span>
              </div>
              <div className={styles["main__post-stats-comment"]}>
                <FaComment /> <span>5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
