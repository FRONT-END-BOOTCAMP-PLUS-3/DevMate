"use server";

import { notFound } from "next/navigation";

import { Suspense } from "react";

import styles from "./ProjectDetail.module.scss";

import projectData from "./_components/projectData";
import NoticeSection from "./_components/noticeSection";
import MembersSection from "./_components/membersSection";
import ApplicationsSection from "./_components/applicationsSection";

export default async function ProjectDetail({ params }: { params: { id: string } }) {
  const projectId = Number(params.id);
  const project = projectData.find((p) => p.id === projectId);

  if (!project) return notFound();

  return (
    <div className={styles.container}>
      <h1 className={styles.container__title}>{project.projectTitle}</h1>

      <div className={styles.container__content} style={{ width: "100%" }}>
        <h2>🎯 프로젝트 목표</h2>
        <p>{project.goal}</p>
      </div>

      <div className={styles.container__row_2}>
        <div className={styles.container__content}>
          <h2>🗓️ 진행 기간</h2>
          <p>
            {project.projectPeriodStart}
            <br />~ {project.projectPeriodEnd}
          </p>
        </div>

        {/* 공지사항 */}
        <Suspense fallback={<p>공지사항 로딩 중...</p>}>
          <NoticeSection notices={project.notices} />
        </Suspense>
      </div>

      {/* 신청 현황 */}
      <Suspense fallback={<p>신청 현황 로딩 중...</p>}>
        <ApplicationsSection initialApplications={project.applications} />
      </Suspense>

      {/* 참여 멤버 */}
      <Suspense fallback={<p>참여 멤버 로딩 중...</p>}>
        <MembersSection />
      </Suspense>
    </div>
  );
}
