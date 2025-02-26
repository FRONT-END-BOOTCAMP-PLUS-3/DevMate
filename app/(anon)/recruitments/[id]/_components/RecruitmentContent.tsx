import Link from "next/link";

import React from "react";

import Button from "@/components/button/button";

import styles from "./RecruitmentContent.module.scss";

import type { Project } from "@/domain/entities/project";

import LikeButton from "./LikeButton";

interface RecruitmentContentProps {
  project: Project;
}

const RecruitmentContent: React.FC<RecruitmentContentProps> = ({ project }) => {
  const {
    id,
    recruitmentTitle,
    leader,
    createdAt,
    hits,
    projectTitle,
    goal,
    description,
    projectPeriodStart,
    projectPeriodEnd,
    recruitmentStart,
    recruitmentEnd,
    like,
  } = project;

  return (
    <div className={styles["recruitmentContent"]}>
      <section className={styles["recruitmentContent__header"]}>
        <div className={styles["recruitmentContent__title"]}>{recruitmentTitle}</div>
        <div className={styles["recruitmentContent__author"]}>{leader.nickname}</div>
        <div className={styles["recruitmentContent__meta"]}>
          <span className={styles["recruitmentContent__date"]}>
            작성일 {createdAt.toLocaleString()} | 조회수 {hits}
          </span>
          <span className={styles["recruitmentContent__actions"]}>{"수정 삭제"}</span>
        </div>
      </section>

      <section className={styles["recruitmentContent__body"]}>
        <div className={styles["recruitmentContent__details"]}>
          <h2 className={styles["recruitmentContent__subtitle"]}>
            🎯 프로젝트 제목 <span>{projectTitle}</span>
          </h2>
          <h2 className={styles["recruitmentContent__subtitle"]}>
            🚩 프로젝트 목표 <span>{goal}</span>
          </h2>

          <h2 className={styles["recruitmentContent__subtitle"]}>
            📆 진행 기간
            <span>
              {projectPeriodStart.toLocaleDateString()} ~ {projectPeriodEnd.toLocaleDateString()}
            </span>
          </h2>
          <h2 className={styles["recruitmentContent__subtitle"]}>
            📆 모집 기간
            <span>
              {recruitmentStart.toLocaleDateString()} ~ {recruitmentEnd.toLocaleDateString()}
            </span>
          </h2>
        </div>
        <div className={styles["recruitmentContent__content"]}>{description}</div>
        <div className={styles["recruitmentContent__actions"]}>
          <LikeButton projectId={id} likes={like} />
          <Button>
            <Link href={`/user/recruitments/${id}/apply`}>지원하기</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default RecruitmentContent;
