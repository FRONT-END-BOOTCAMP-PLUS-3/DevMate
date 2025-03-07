import Link from "next/link";

import React from "react";

import Button from "@/components/button/button";

import { formatDateTime } from "@/utils/formatDateTime";
import { formatDateToString } from "@/utils/formatDateToString";

import styles from "./recruitmentContent.module.scss";

import type { RecruitmentDetailDto } from "@/application/usecases/recruitment/dtos/recruitmentDetailDto";

import LikeButton from "./likeButton";

interface RecruitmentContentProps {
  project: RecruitmentDetailDto;
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
    likes,
  } = project;

  return (
    <div className={styles["recruitmentContent"]}>
      <section className={styles["recruitmentContent__header"]}>
        <div className={styles["recruitmentContent__title"]}>{recruitmentTitle}</div>
        <div className={styles["recruitmentContent__author"]}>{leader.nickname}</div>
        <div className={styles["recruitmentContent__meta"]}>
          <span className={styles["recruitmentContent__date"]}>
            작성일 {formatDateTime(createdAt)} | 조회수 {hits}
          </span>
          <span className={styles["recruitmentContent__actions"]}>
            <button className={styles["recruitmentContent__actions__button"]}>수정</button>|
            <button className={styles["recruitmentContent__actions__button"]}>삭제</button>
          </span>
        </div>
      </section>

      <section className={styles["recruitmentContent__body"]}>
        <div className={styles["recruitmentContent__details"]}>
          <p className={styles["recruitmentContent__subtitle"]}>
            🎯 프로젝트 제목 <span>{projectTitle}</span>
          </p>
          <p className={styles["recruitmentContent__subtitle"]}>
            🚩 프로젝트 목표 <span>{goal}</span>
          </p>

          <p className={styles["recruitmentContent__subtitle"]}>
            📆 진행 기간
            <span>
              {formatDateToString(projectPeriodStart)} ~ {formatDateToString(projectPeriodEnd)}
            </span>
          </p>
          <p className={styles["recruitmentContent__subtitle"]}>
            📆 모집 기간
            <span>
              {formatDateToString(recruitmentStart)} ~ {formatDateToString(recruitmentEnd)}
            </span>
          </p>
        </div>
        <div className={styles["recruitmentContent__content"]}>{description}</div>
        <div className={styles["recruitmentContent__actions"]}>
          <LikeButton projectId={id} likes={likes} />
          <Button>
            <Link href={`/user/recruitments/${id}/apply`}>지원하기</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default RecruitmentContent;
