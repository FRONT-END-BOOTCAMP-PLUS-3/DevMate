"use client";

import { notFound, useParams } from "next/navigation";

import { useState } from "react";

import styles from "./ProjectDetail.module.scss";

import type { Applicant } from "./_components/projectData";

import projectData from "./_components/projectData";
import NoticeSection from "./_components/noticeSection";
import MembersSection from "./_components/membersSection";
import ApplicationsSection from "./_components/applicationsSection";

export default function ProjectDetail() {
  const projectId = Number(useParams().id);
  const project = projectData.find((p) => p.id === projectId);

  const [applications, setApplications] = useState<Applicant[]>(project?.applications || []);

  const acceptApplicant = (id: number) => {
    setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status: "accept" } : app)));
  };

  const rejectApplicant = (id: number) => {
    setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status: "reject" } : app)));
  };

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
        <NoticeSection notices={project.notices} />
      </div>

      {/* 신청 현황 */}
      <ApplicationsSection
        applications={applications}
        acceptApplicant={acceptApplicant}
        rejectApplicant={rejectApplicant}
      />

      {/* 참여 멤버 */}
      <MembersSection applications={applications} />
    </div>
  );
}
