"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { DateRange } from "react-date-range";

import Toolbar from "@/app/user/recruitments/_components/Toolbar/toolbar";

import { decodeToken } from "@/utils/cookie";

import styles from "./create.module.scss";

import type { SelectionRange } from "react-date-range";

import CreateTags from "./_components/createTags/createTags";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { StarterKit } from "@tiptap/starter-kit";
import { Heading } from "@tiptap/extension-heading";
import { Underline } from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { useEditor, EditorContent } from "@tiptap/react";

/* ---------------------------------- component --------------------------------- */
export default function Create() {
  /* ---------------------------------- state --------------------------------- */
  const router = useRouter();

  const [projectData, setProjectData] = useState({
    leaderId: "",
    recruitmentTitle: "",
    projectTitle: "",
    goal: "",
  });

  const [description, setDescription] = useState(`
    <p>🗺️ 프로젝트를 진행할 지역 :</p>
    <p>🌱 모집 요건(인원수, 기술스택 등) :</p>
    <p>📞 지원 방법 (이메일, 카카오 오픈채팅방, 구글폼 등) :</p>
    <p>😆 팀원은 이런 사람이였으면 좋겠어요 :</p>
    <p>📢 사전 공지사항 :</p>
  `);
  const [projectPeriod, setProjectPeriod] = useState<SelectionRange[]>([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [recruitmentPeriod, setRecruitmentPeriod] = useState<SelectionRange[]>([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline, // 밑줄
      TextStyle, // 텍스트 스타일 (글자 크기 변경)
      Heading.configure({ levels: [1, 2, 3] }), // 제목 크기 (H1, H2, H3)
    ],
    content: `
      <p>🗺️ 프로젝트를 진행할 지역 :</p>
      <p>🌱 모집 요건(인원수, 기술스택 등) :</p>
      <p>📞 지원 방법 (이메일, 카카오 오픈채팅방, 구글폼 등) :</p>
      <p>😆 팀원은 이런 사람이였으면 좋겠어요 :</p>
      <p>📢 사전 공지사항 :</p>
    `,
    onUpdate: ({ editor }) => setDescription(editor.getHTML()),
    editorProps: {
      handleDOMEvents: {
        beforeinput: () => false, // Next.js Hydration 오류 방지
      },
    },
    injectCSS: false, // CSS 관련 Hydration 방지
    immediatelyRender: false, // Hydration 오류 방지
  });

  /* ---------------------------------- event handler --------------------------------- */
  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProjectData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 프로젝트 생성 요청
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const requestBody = {
      ...projectData,
      description,
      projectPeriodStart: projectPeriod[0].startDate ? new Date(projectPeriod[0].startDate) : null,
      projectPeriodEnd: projectPeriod[0].endDate ? new Date(projectPeriod[0].endDate) : null,
      recruitmentStart: recruitmentPeriod[0].startDate ? new Date(recruitmentPeriod[0].startDate) : null,
      recruitmentEnd: recruitmentPeriod[0].endDate ? new Date(recruitmentPeriod[0].endDate) : null,
      projectTags: tags,
    };

    try {
      const response = await fetch("/api/project/1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "프로젝트 생성 실패");

      alert("✅ 프로젝트가 성공적으로 생성되었습니다!");
      router.push(`/recruitments/${data.data.id}`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------------- useEffect --------------------------------- */
  useEffect(() => {
    const fetchUserId = async () => {
      const userId = await decodeToken("id");
      if (typeof userId === "string") {
        setProjectData((prev) => ({ ...prev, leaderId: userId }));
      }
    };

    fetchUserId();
  }, []);

  /* ---------------------------------- return --------------------------------- */
  return (
    <div className={styles.create}>
      <h1 className={styles.create__title}>모집글 생성하기</h1>
      <div className={styles.create__divider} />
      {/* 모집글 제목 */}
      <label className={styles.create__label}>
        📌 모집글 제목 <span className={styles.create__label__required}>*</span>
      </label>
      <input
        name="recruitmentTitle"
        className={styles.create__input}
        placeholder="모집글 제목을 입력해주세요"
        onChange={handleChange}
      />

      {/* 프로젝트 제목 */}
      <label className={styles.create__label}>
        🚩 프로젝트 제목 <span className={styles.create__label__required}>*</span>
      </label>
      <input
        name="projectTitle"
        className={styles.create__input}
        placeholder="프로젝트 제목을 입력해주세요"
        onChange={handleChange}
      />

      {/* 프로젝트 목표 */}
      <label className={styles.create__label}>
        🎯 프로젝트 목표 <span className={styles.create__label__required}>*</span>
      </label>
      <input
        name="goal"
        className={styles.create__input}
        placeholder="프로젝트 목표를 입력해주세요"
        onChange={handleChange}
      />

      {/* 📌 Tiptap 에디터 */}
      <label className={styles.create__label}>✏️ 모집내용</label>
      <div className={styles.create__editor}>
        <Toolbar editor={editor} />
        <EditorContent
          className={styles.create__editor_content}
          editor={editor}
          name="description"
          placeholder="프로젝트 설명을 입력하세요"
        />
      </div>

      {/* 캘린더 */}
      <div className={styles.create__calendar_container}>
        <div className={styles.create__calendar}>
          <h3 className={styles.create__calendar_project}>📆 프로젝트 진행기간</h3>
          <DateRange
            ranges={projectPeriod}
            onChange={(ranges: { selection: SelectionRange }) => setProjectPeriod([ranges.selection])}
            moveRangeOnFirstSelection={false}
            rangeColors={["#706efa"]}
          />
        </div>
        <div className={styles.create__calendar}>
          <h3 className={styles.create__calendar_recruit}>📆 모집 기간</h3>
          <DateRange
            ranges={recruitmentPeriod}
            onChange={(ranges: { selection: SelectionRange }) => setRecruitmentPeriod([ranges.selection])}
            moveRangeOnFirstSelection={false}
            rangeColors={["#3d91ff"]}
          />
        </div>
      </div>

      {/* 태그 입력 */}
      <label className={styles.create__label}>📎 태그</label>
      <CreateTags selectedTags={tags} setSelectedTags={setTags} />

      {/* 에러 메시지 출력 */}
      {error && <p className={styles.create__error}>❌ {error}</p>}

      {/* 버튼 */}
      <div className={styles.create__buttons}>
        <button className={styles.create__button_cancel} onClick={() => router.back()}>
          취소
        </button>
        <button className={styles.create__button_submit} onClick={handleSubmit} disabled={loading}>
          {loading ? "등록 중..." : "등록"}
        </button>
      </div>
    </div>
  );
}
