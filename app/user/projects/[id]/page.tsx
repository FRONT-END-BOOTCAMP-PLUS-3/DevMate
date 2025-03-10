"use client";

import { useRouter, useParams } from "next/navigation";

import { useEffect, useState } from "react";

import { decodeToken } from "@/utils/cookie";
import { formatDateToString } from "@/utils/formatDateToString";

import styles from "./projectDetail.module.scss";

import type { ProjectDetailDto } from "@/application/usecases/project/dtos/projectDetailDto";
import type { ProjectDetailApplyDto } from "@/application/usecases/project/dtos/projectDetailApplyDto";

import NoticeSection from "./_components/noticeSection";
import MembersSection from "./_components/membersSection";
import ApplicationsSection from "./_components/applicationsSection";

import ClipLoader from "react-spinners/ClipLoader";

/* ---------------------------------- component --------------------------------- */
export default function ProjectDetail() {
  /* ---------------------------------- state --------------------------------- */
  const router = useRouter();
  const projectId = Number(useParams().id);
  const [project, setProject] = useState<ProjectDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [decodedId, setdecodedId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<"leader" | "member" | "guest" | "realGuest">("realGuest");

  /* ---------------------------------- api call function --------------------------------- */
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

  const deleteMember = async (userId: string | null) => {
    if (!userId) {
      alert("유효하지 않은 사용자입니다.");
      return;
    }

    const confirmDelete = confirm("정말 프로젝트를 나가시겠습니까? 지원 정보가 영구 삭제됩니다.");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/project/${projectId}/applyMember`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error("멤버 삭제 실패");
      }

      alert("프로젝트 나가기에 성공했습니다.");

      setTimeout(() => setRefresh((prev) => !prev), 100);
    } catch (error) {
      console.error("❌ 프로젝트 나가기 실패.", error);
      alert("프로젝트 나가기 중 오류가 발생했습니다.");
    }
  };

  const deleteProject = async () => {
    const confirmDelete = confirm("정말 프로젝트를 삭제하시겠습니까? 프로젝트 관련 정보가 영구 삭제됩니다.");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/project/${projectId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("프로젝트 삭제 실패");
      }

      alert("프로젝트 삭제에 성공했습니다.");

      setTimeout(() => router.push("/user/information"), 100);
    } catch (error) {
      console.error("❌ 프로젝트 삭제 실패.", error);
      alert("프로젝트 삭제 중 오류가 발생했습니다.");
    }
  };

  /* ---------------------------------- event handler --------------------------------- */
  const handleEdit = () => {
    const edit = confirm("수정 페이지로 이동하시겠습니까?");
    if (!edit) return;
    router.push(`/user/projects/${projectId}/edit`);
  };

  /* ---------------------------------- useEffect --------------------------------- */
  useEffect(() => {
    const fetchDecodedToken = async () => {
      try {
        const id = await decodeToken("id");
        if (typeof id === "string") {
          setdecodedId(id);
        }
      } catch (error) {
        console.error("토큰 디코딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDecodedToken();
  }, []);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/project/${projectId}`, { method: "GET" });
        console.log("📡 API 응답 상태:", response.status);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data: ProjectDetailDto = await response.json();

        if (!decodedId) {
          setUserRole("realGuest");
        } else if (data.leaderId === decodedId) {
          setUserRole("leader");
        } else if (data.members?.some((member) => member.user?.id === decodedId)) {
          setUserRole("member");
        } else {
          setUserRole("guest");
        }

        setProject(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (decodedId) {
      fetchProjectDetail();
    }
  }, [projectId, refresh, decodedId]);

  /* ---------------------------------- return --------------------------------- */
  if (loading) {
    return (
      <div className={styles.loading}>
        <ClipLoader color="#868e96" loading={loading} size={100} aria-label="Loading Spinner" />
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>오류가 발생했습니다: {error}</div>;
  }

  if (userRole === "guest") {
    return <div className={styles.error}>❌ 접근 권한이 없습니다.</div>;
  }
  if (userRole === "realGuest") {
    return <div className={styles.error}>❌ 토큰이 유효하지 않습니다.</div>;
  }

  if (!project) {
    return <div className={styles.error}>프로젝트 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.container__title_big}>프로젝트 상세</h1>
      <div className={styles.container__divider} />

      <div className={styles.container__title}>
        <h1>{project.projectTitle}</h1>
        {userRole === "leader" && (
          <div className={styles.container__title___buttons}>
            <button type="button" onClick={handleEdit}>
              수정
            </button>
            |
            <button type="button" onClick={deleteProject}>
              삭제
            </button>
          </div>
        )}
      </div>

      <div className={styles.container__content} style={{ width: "100%" }}>
        <label>🎯 프로젝트 목표</label>
        <p>{project.goal}</p>
      </div>

      <div className={styles.container__row_2}>
        <div className={styles.container__content}>
          <label>🗓️ 진행 기간</label>
          <p>
            {formatDateToString(project.projectPeriodStart)}
            <br />~ {formatDateToString(project.projectPeriodEnd)}
          </p>
        </div>

        {/* 공지사항 */}
        <NoticeSection notice={project.notice} updateNotice={updateNotice} userRole={userRole} />
      </div>

      {/* 신청 현황 */}
      {userRole === "leader" && (
        <ApplicationsSection
          applications={project.applications || null}
          acceptApplicant={acceptApplicant}
          rejectApplicant={rejectApplicant}
        />
      )}

      {/* 참여 멤버 */}
      <MembersSection members={project.members || null} leaderId={project.leaderId} />

      {userRole === "member" && (
        <button className={styles.container__button_exit} type="button" onClick={() => deleteMember(decodedId)}>
          프로젝트 나가기
        </button>
      )}
    </div>
  );
}
