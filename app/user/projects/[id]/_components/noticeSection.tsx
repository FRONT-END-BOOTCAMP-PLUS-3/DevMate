"use client";

import { useState } from "react";

import InputField from "@/components/inputField/inputField";

import styles from "../projectDetail.module.scss";

interface NoticeSectionProps {
  notice: string;
  updateNotice: (newNotice: string) => void;
  userRole: string;
}

export default function NoticeSection({ notice, updateNotice, userRole }: NoticeSectionProps) {
  const [isNoticeEdit, setIsNoticeEdit] = useState(false);
  const [noticeContent, setNoticeContent] = useState(notice || "");

  const handleNoticeClick = async () => {
    if (!isNoticeEdit) {
      setIsNoticeEdit(!isNoticeEdit);
    } else {
      updateNotice(noticeContent);
    }
  };

  return (
    <div className={styles.container__content}>
      <div className={styles.container__notice__header}>
        <h2>📌 공지사항</h2>
        {userRole === "leader" && (
          <button type="button" onClick={handleNoticeClick} className={isNoticeEdit ? styles.edit : styles.complete}>
            {isNoticeEdit ? "완료" : "수정"}
          </button>
        )}
      </div>

      {isNoticeEdit ? (
        <InputField value={noticeContent} onChange={(e) => setNoticeContent(e.target.value)} />
      ) : (
        <p>{noticeContent}</p>
      )}
    </div>
  );
}
