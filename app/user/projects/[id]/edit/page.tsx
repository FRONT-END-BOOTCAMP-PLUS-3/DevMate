"use client";

import { useRouter, useParams } from "next/navigation";

import { useEffect, useState } from "react";

import { DateRange } from "react-date-range";

import Toolbar from "@/app/user/recruitments/_components/Toolbar/toolbar";
import CreateTags from "@/app/user/recruitments/(handle)/create/_components/createTags/createTags";

import { decodeToken } from "@/utils/cookie";

import styles from "./edit.module.scss";

import type { SelectionRange } from "react-date-range";
import type { ProjectDetailDto } from "@/application/usecases/project/dtos/projectDetailDto";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { StarterKit } from "@tiptap/starter-kit";
import ClipLoader from "react-spinners/ClipLoader";
import { Heading } from "@tiptap/extension-heading";
import { Underline } from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { useEditor, EditorContent } from "@tiptap/react";

export default function EditProject() {
  /* ---------------------------------- state --------------------------------- */
  const router = useRouter();
  const projectId = Number(useParams().id);

  const [recruitmentTitle, setRecruitmentTitle] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [description, setDescription] = useState("");
  const [projectPeriod, setProjectPeriod] = useState<SelectionRange>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [recruitmentPeriod, setRecruitmentPeriod] = useState<SelectionRange>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const editor = useEditor({
    extensions: [StarterKit, Underline, TextStyle, Heading.configure({ levels: [1, 2, 3] })],
    content: "",
    onUpdate: ({ editor }) => setDescription(editor.getHTML()),
  });

  /* ---------------------------------- 이벤트 핸들러 --------------------------------- */
  const handleUpdateProject = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/project/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recruitmentTitle,
          projectTitle,
          goal,
          description,
          projectPeriodStart: projectPeriod.startDate,
          projectPeriodEnd: projectPeriod.endDate,
          recruitmentStart: recruitmentPeriod.startDate,
          recruitmentEnd: recruitmentPeriod.endDate,
          projectTags: tags,
        }),
      });

      if (!response.ok) {
        throw new Error("프로젝트 수정 실패");
      }

      alert("프로젝트 수정이 완료되었습니다.");

      if (window.history.length > 2) {
        window.history.go(-2);
      } else {
        router.push("/user/information");
      }
    } catch (err) {
      console.error("❌ 프로젝트 수정 오류:", err);
      alert("프로젝트 수정 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------------- 데이터 불러오기 --------------------------------- */
  useEffect(() => {
    const fetchDecodedTokenAndProject = async () => {
      try {
        const userId = await decodeToken("id");
        if (typeof userId !== "string") {
          throw new Error("id decoding에 실패했습니다.");
        }

        const response = await fetch(`/api/project/${projectId}`, { method: "GET" });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data: ProjectDetailDto = await response.json();

        if (data.leaderId !== userId) {
          throw new Error("해당 프로젝트의 수정 페이지에 접근 권한이 없습니다.");
        }

        setRecruitmentTitle(data.recruitmentTitle);
        setProjectTitle(data.projectTitle);
        setGoal(data.goal);
        setDescription(data.description);
        editor?.commands.setContent(data.description || "");

        setProjectPeriod({
          startDate: new Date(data.projectPeriodStart),
          endDate: new Date(data.projectPeriodEnd),
          key: "selection",
        });

        setRecruitmentPeriod({
          startDate: new Date(data.recruitmentStart),
          endDate: new Date(data.recruitmentEnd),
          key: "selection",
        });

        // ✅ 태그 설정 수정
        setTags(data.projectTags?.map((tag) => tag) || []);
      } catch (error) {
        console.error("❌ 오류 발생:", error);
        setError(error instanceof Error ? error.message : "알 수 없는 오류");
      } finally {
        setLoading(false);
      }
    };

    fetchDecodedTokenAndProject();
  }, [projectId, editor]);

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
    <div className={styles.edit}>
      <h1 className={styles.edit__title}>📌 모집글 수정</h1>
      <div className={styles.edit__divider} />

      {/* 모집글 제목 */}
      <label className={styles.edit__label}>📌 모집글 제목</label>
      <input
        className={styles.edit__input}
        value={recruitmentTitle}
        onChange={(e) => setRecruitmentTitle(e.target.value)}
      />

      {/* 프로젝트 제목 */}
      <label className={styles.edit__label}>🚩 프로젝트 제목</label>
      <input className={styles.edit__input} value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} />

      {/* 프로젝트 목표 */}
      <label className={styles.edit__label}>🎯 프로젝트 목표</label>
      <input className={styles.edit__input} value={goal} onChange={(e) => setGoal(e.target.value)} />

      {/* 📌 Tiptap 에디터 */}
      <label className={styles.edit__label}>✏️ 모집내용</label>
      <div className={styles.edit__editor}>
        <Toolbar editor={editor} />
        <EditorContent className={styles.edit__editor_content} editor={editor} />
      </div>

      {/* 캘린더 */}
      <div className={styles.edit__calendar_container}>
        <div className={styles.edit__calendar}>
          <h3>📆 프로젝트 진행기간</h3>
          <DateRange
            ranges={[projectPeriod]}
            onChange={(ranges) => setProjectPeriod(ranges.selection)}
            moveRangeOnFirstSelection={false}
            rangeColors={["#3d91ff"]}
          />
        </div>
        <div className={styles.edit__calendar}>
          <h3>📆 모집 기간</h3>
          <DateRange
            ranges={[recruitmentPeriod]}
            onChange={(ranges) => setRecruitmentPeriod(ranges.selection)}
            moveRangeOnFirstSelection={false}
            rangeColors={["#706efa"]}
          />
        </div>
      </div>

      {/* 태그 입력 */}
      <label className={styles.edit__label}>📎 태그</label>
      <CreateTags selectedTags={tags} setSelectedTags={setTags} />

      {/* 버튼 */}
      <div className={styles.edit__buttons}>
        <button className={styles.edit__button_cancel} onClick={() => router.back()}>
          취소
        </button>
        <button className={styles.edit__button_submit} onClick={handleUpdateProject} disabled={loading}>
          {loading ? "수정 중..." : "수정 완료"}
        </button>
      </div>
    </div>
  );
}
