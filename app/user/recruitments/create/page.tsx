"use client";

import { useState } from "react";

import { DateRange } from "react-date-range";

import styles from "./Create.module.scss";

import type { SelectionRange } from "react-date-range";

import Toolbar from "../_components/Toolbar/toolbar";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { StarterKit } from "@tiptap/starter-kit";
import { Heading } from "@tiptap/extension-heading";
import { Underline } from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { useEditor, EditorContent } from "@tiptap/react";

export default function Create() {
  const [projectPeriod, setProjectPeriod] = useState<SelectionRange[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [recruitmentPeriod, setRecruitmentPeriod] = useState<SelectionRange[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [content, setContent] = useState(
    `🗺️ 프로젝트를 진행할 지역 : \n🌱 모집 요건(인원수, 기술스택 등) : \n📞 지원 방법 (이메일, 카카오 오픈채팅방, 구글폼 등) : \n😆 팀원은 이런 사람이였으면 좋겠어요 : \n📢 사전 공지사항 :`,
  );

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
  });

  return (
    <div className={styles["create"]}>
      <h1 className={styles["create__title"]}>모집글 작성하기</h1>
      <div className={styles["create__divider"]}></div>

      {/* 모집글 제목 */}
      <label className={styles["create__label"]}>
        📌 모집글 제목 <span className={styles["create__label--required"]}>*</span>
      </label>
      <input className={styles["create__input"]} placeholder="모집글 제목을 입력해주세요" />

      {/* 프로젝트 제목 */}
      <label className={styles["create__label"]}>
        🚩 프로젝트 제목 <span className={styles["create__label--required"]}>*</span>
      </label>
      <input className={styles["create__input"]} placeholder="프로젝트 제목을 입력해주세요" />

      {/* 프로젝트 목표 */}
      <label className={styles["create__label"]}>
        🎯 프로젝트 목표 <span className={styles["create__label--required"]}>*</span>
      </label>
      <input className={styles["create__input"]} placeholder="프로젝트 목표를 입력해주세요" />

      {/* 📌 Tiptap 에디터 */}
      <label className={styles["create__label"]}>✏️ 모집내용</label>
      <div className={styles["create__editor"]}>
        <Toolbar editor={editor} /> {/* 툴바 추가 */}
        <EditorContent className={styles["create__editor-content"]} editor={editor} />
      </div>

      {/* 캘린더 */}
      <div className={styles["create__calendar-container"]}>
        <div className={styles["create__calendar"]}>
          <h3 className={styles["create__calendar-project"]}>📆 프로젝트 진행기간</h3>
          <DateRange
            ranges={projectPeriod}
            onChange={(ranges: { selection: SelectionRange }) => setProjectPeriod([ranges.selection])}
            moveRangeOnFirstSelection={false}
            rangeColors={["#706efa"]}
          />
        </div>
        <div className={styles["create__calendar"]}>
          <h3 className={styles["create__calendar-recruit"]}>📆 모집 기간</h3>
          <DateRange
            ranges={recruitmentPeriod}
            onChange={(ranges: { selection: SelectionRange }) => setRecruitmentPeriod([ranges.selection])}
            moveRangeOnFirstSelection={false}
            rangeColors={["#3d91ff"]}
          />
        </div>
      </div>

      {/* 태그 입력 */}
      <label className={styles["create__label"]}>📎 태그</label>
      <input className={styles["create__input"]} placeholder="태그를 설정하세요 (최대 10개)" />

      {/* 버튼 */}
      <div className={styles["create__buttons"]}>
        <button className={styles["create__button-cancel"]}>취소</button>
        <button className={styles["create__button-submit"]}>등록</button>
      </div>
    </div>
  );
}