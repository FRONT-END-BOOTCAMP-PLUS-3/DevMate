"use client";
import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { DateRange } from "react-date-range";

import Button from "@/components/button/button";
import InputField from "@/components/inputField/inputField";

import { decodeToken } from "@/utils/cookie";

import styles from "../projectDetail.module.scss";

import type { SelectionRange } from "react-date-range";
import type { ProjectDetailDto } from "@/application/usecases/project/dtos/projectDetailDto";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import ClipLoader from "react-spinners/ClipLoader";

export default function ProjectDetailEdit() {
  /* ---------------------------------- state --------------------------------- */
  const router = useRouter();
  const projectId = Number(useParams().id);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const [projectPeriod, setProjectPeriod] = useState<SelectionRange>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  /* ---------------------------------- api call function --------------------------------- */
  const updateProject = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/project/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectTitle: title,
          goal,
          projectPeriodStart: projectPeriod.startDate,
          projectPeriodEnd: projectPeriod.endDate,
        }),
      });

      if (!response.ok) {
        throw new Error("프로젝트 수정 실패");
      }

      alert("프로젝트 수정이 완료되었습니다.");
      router.push(`/user/projects/${projectId}`);
    } catch (err) {
      console.error("❌ 프로젝트 수정 오류:", err);
      alert("프로젝트 수정 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------------- event handler --------------------------------- */
  const handleInputChange =
    (setter: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(e.target.value);
    };

  const handleDateChange = (ranges: { selection: SelectionRange }) => {
    setProjectPeriod(ranges.selection);
  };

  const handleBack = () => {
    const back = confirm("변경사항이 사라집니다. 이전 페이지로 돌아가시겠습니까?");
    if (!back) return;
    router.back();
  };

  /* ---------------------------------- useEffect --------------------------------- */
  useEffect(() => {
    const fetchDecodedTokenAndProject = async () => {
      try {
        // 토큰에서 userId 디코딩
        const id = await decodeToken("id");
        if (typeof id !== "string") {
          throw new Error("id decoding에 실패했습니다.");
        }

        // userId 설정 후 프로젝트 데이터 불러오기
        const response = await fetch(`/api/project/${projectId}`, { method: "GET" });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data: ProjectDetailDto = await response.json();

        // 리더가 아닌 경우 에러 설정
        if (data.leaderId !== id) {
          throw new Error("해당 프로젝트의 수정 페이지에 접근 권한이 없습니다.");
        }

        // 상태 업데이트
        setTitle(data.projectTitle);
        setGoal(data.goal);
        setProjectPeriod({
          startDate: new Date(data.projectPeriodStart),
          endDate: new Date(data.projectPeriodEnd),
          key: "selection",
        });
      } catch (error) {
        console.error("❌ 오류 발생:", error);
        setError(error instanceof Error ? error.message : "알 수 없는 오류");
      } finally {
        setLoading(false);
      }
    };

    fetchDecodedTokenAndProject();
  }, [projectId]);

  /* ---------------------------------- return --------------------------------- */
  if (loading) {
    return (
      <div className={styles.loading}>
        <ClipLoader color="#868e96" loading={loading} size={100} aria-label="Loading Spinner" />
      </div>
    );
  }
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.container__title_big}>프로젝트 수정</h1>
      <div className={styles.container__divider} />

      <div className={styles.container__content}>
        <label>📌 프로젝트 제목</label>
        <InputField value={title} onChange={handleInputChange(setTitle)} />
      </div>

      <div className={styles.container__content}>
        <label>🎯 프로젝트 목표</label>
        <InputField value={goal} onChange={handleInputChange(setGoal)} />
      </div>

      <div className={styles.container__content} style={{ width: "fit-content" }}>
        <label>🗓️ 프로젝트 진행 기간</label>
        <div className={styles.container__calendar}>
          <DateRange
            ranges={[projectPeriod]}
            onChange={handleDateChange}
            moveRangeOnFirstSelection={false}
            rangeColors={["#706efa"]}
          />
        </div>
      </div>

      <div className={styles.container__button_save}>
        <Button variant="sub" onClick={handleBack}>
          취소
        </Button>
        <Button onClick={updateProject}>저장</Button>
      </div>
    </div>
  );
}
