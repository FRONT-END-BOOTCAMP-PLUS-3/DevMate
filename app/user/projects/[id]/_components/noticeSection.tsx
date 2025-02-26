"use client";

import { useState } from "react";

import InputField from "@/components/inputField/InputField";

import styles from "../ProjectDetail.module.scss";

export default function NoticeSection({ notices }: { notices: { content: string }[] }) {
  const [isNoticeEdit, setIsNoticeEdit] = useState(false);
  const [noticeContent, setNoticeContent] = useState(notices[0]?.content || "");

  const handleNoticeClick = () => setIsNoticeEdit(!isNoticeEdit);

  return (
    <div className={styles.container__content}>
      <div className={styles.container__notice__header}>
        <h2>📌 공지사항</h2>
        <button type="button" onClick={handleNoticeClick} className={isNoticeEdit ? styles.edit : styles.complete}>
          {isNoticeEdit ? "완료" : "수정"}
        </button>
      </div>

      {isNoticeEdit ? (
        <InputField value={noticeContent} onChange={(e) => setNoticeContent(e.target.value)} />
      ) : (
        <p>{noticeContent}</p>
      )}
    </div>
  );
}
