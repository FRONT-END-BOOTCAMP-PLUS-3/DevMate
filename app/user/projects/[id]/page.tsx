"use client";

import { useParams } from "next/navigation";

import { useEffect, useState } from "react";

import { formatDateToString } from "@/utils/formatDateToString";

import styles from "./projectDetail.module.scss";

import type { ProjectDetailDto } from "@/application/usecases/project/dtos/projectDetailDto";

import NoticeSection from "./_components/noticeSection";
import MembersSection from "./_components/membersSection";
import ApplicationsSection from "./_components/applicationsSection";

import ClipLoader from "react-spinners/ClipLoader";

export default function ProjectDetail() {
  const projectId = Number(useParams().id);
  const [project, setProject] = useState<ProjectDetailDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const acceptApplicant = (id: number) => {
    console.log("수락id:", id);
  };

  const rejectApplicant = (id: number) => {
    console.log("거절id:", id);
  };

  // 프로젝트 정보를 가져옴
  useEffect(() => {
    const fetchProjectDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/project/${projectId}`, { method: "GET" });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data: ProjectDetailDto = await response.json();
        setProject(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetail();
  }, [projectId]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <ClipLoader color="#000" loading={loading} size={100} aria-label="Loading Spinner" />
      </div>
    );
  } else if (error || !project) {
    return <div className={styles.error}>오류가 발생했습니다: {error}</div>;
  } else
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
              {formatDateToString(project.projectPeriodStart)}
              <br />~ {formatDateToString(project.projectPeriodEnd)}
            </p>
          </div>

          {/* 공지사항 */}
          <NoticeSection notice={project.notice} />
        </div>

        {/* 신청 현황 */}
        <ApplicationsSection
          applications={project.applications ? project.applications : null}
          acceptApplicant={acceptApplicant}
          rejectApplicant={rejectApplicant}
        />

        {/* 참여 멤버 */}
        <MembersSection members={project.members ? project.members : null} />
      </div>
    );
}
