"use client";

import { useParams } from "next/navigation";

import { useEffect, useState } from "react";

import { formatDateToString } from "@/utils/formatDateToString";

import styles from "./projectDetail.module.scss";

import type { ProjectDetailDto } from "@/application/usecases/project/dtos/projectDetailDto";
import type { ProjectDetailApplyDto } from "@/application/usecases/project/dtos/projectDetailApplyDto";

import NoticeSection from "./_components/noticeSection";
import MembersSection from "./_components/membersSection";
import ApplicationsSection from "./_components/applicationsSection";

import ClipLoader from "react-spinners/ClipLoader";

export default function ProjectDetail() {
  const projectId = Number(useParams().id);
  const [project, setProject] = useState<ProjectDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);

  const updateNotice = async (newNotice: string) => {
    try {
      const response = await fetch(`/api/project/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notice: newNotice }),
      });

      if (!response.ok) {
        throw new Error("공지 업데이트 실패");
      }

      alert("공지사항 업데이트가 완료되었습니다.");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setRefresh((prev) => !prev);
    }
  };

  const acceptApplicant = async (id: number) => {
    try {
      const response = await fetch("/api/project/1/applyMember", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applyId: Number(id) }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "서버 오류 발생");
      }

      console.log(`✅ 멤버 생성 성공! User ID: ${data.userId}, Project ID: ${data.projectId}`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
      setRefresh((prev) => !prev);
    }
  };

  const rejectApplicant = async (id: number) => {
    try {
      const response = await fetch(`/api/project/${id}/applyMember`, { method: "PATCH" });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data: ProjectDetailApplyDto = await response.json();
      console.log("거절됨", data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
      setRefresh((prev) => !prev);
    }
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
  }, [projectId, refresh]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <ClipLoader color="#868e96" loading={loading} size={100} aria-label="Loading Spinner" />
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
          <NoticeSection notice={project.notice} updateNotice={updateNotice} />
        </div>

        {/* 신청 현황 */}
        <ApplicationsSection
          applications={project.applications || null}
          acceptApplicant={acceptApplicant}
          rejectApplicant={rejectApplicant}
        />

        {/* 참여 멤버 */}
        <MembersSection members={project.members || null} />
      </div>
    );
}
