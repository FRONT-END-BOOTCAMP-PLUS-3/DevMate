"use client";
import Badge from "@/components/badge/badge";

import { formatDateTime } from "@/utils/formatDateTime";

import styles from "./myApplyStatusItem.module.scss";

import type { MyApplyDto } from "@/application/usecases/recruitment/dtos/myApply/myApplyDto";

import { FaHeart, FaEye, FaComment } from "react-icons/fa";

export default function MyApplyStatusItem({
  apply,
  handleModal,
  handleClick,
}: {
  apply: MyApplyDto;
  handleModal: (selectedId: number) => void;
  handleClick: (selectedProjectId: number) => void;
}) {
  return (
    <div
      className={styles["myapplystatusitem__post-item"]}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        handleClick(apply.projectId);
      }}
    >
      <div className={styles["myapplystatusitem__post-content"]}>
        {/* header */}
        <div className={styles["myapplystatusitem__post-header-button"]}>
          <div className={styles["myapplystatusitem__post-header-description"]}>
            <div className={styles["myapplystatusitem__post-header"]}>
              <Badge
                color={apply.status === "수락됨" ? "primary" : apply.status === "거절됨" ? "red" : "darkGray"}
                fontColor="white"
                width={60}
                height={24}
                borderRadius={16}
                fontSize={12}
              >
                {apply.status}
              </Badge>
              <h2 className={styles["myapplystatusitem__post-title"]}>{apply.project?.recruitmentTitle}</h2>
            </div>
            <p className={styles["myapplystatusitem__post-description"]}>
              {apply.project?.description.replace(/<\/?[^>]+(>|$)/g, " ")}
            </p>
          </div>

          <button
            className={styles["myapplystatusitem__apply-button"]}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              handleModal(apply.id);
            }}
          >
            지원서 보기
          </button>
        </div>

        {/* content */}
        <div className={styles["myapplystatusitem__post-meta"]}>
          <div>
            <span className={styles["myapplystatusitem__post-author"]}>{apply.project?.leader?.nickname}</span>
            <span className={styles["myapplystatusitem__post-dot"]}>·</span>
            <span className={styles["myapplystatusitem__post-date"]}>
              {apply.project?.createdAt !== undefined ? formatDateTime(new Date(apply.project.createdAt)) : "값 없음"}
            </span>
          </div>
          <div className={styles["myapplystatusitem__post-stats"]}>
            <div className={styles["myapplystatusitem__post-stats-heart"]}>
              <FaHeart /> <span>{apply.project?.likes}</span>
            </div>
            <div className={styles["myapplystatusitem__post-stats-eye"]}>
              <FaEye /> <span>{apply.project?.hits}</span>
            </div>
            <div className={styles["myapplystatusitem__post-stats-comment"]}>
              <FaComment /> <span>{apply.project?.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
