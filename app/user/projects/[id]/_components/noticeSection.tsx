"use client";

import { useState } from "react";

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
        <label>📌 공지사항</label>
        {userRole === "leader" && (
          <button type="button" onClick={handleNoticeClick} className={isNoticeEdit ? styles.edit : styles.complete}>
            {isNoticeEdit ? "완료" : "수정"}
          </button>
        )}
      </div>

      {isNoticeEdit ? (
        <textarea
          className={styles.noticeTextarea}
          value={noticeContent}
          onChange={(e) => setNoticeContent(e.target.value)}
          rows={4}
        />
      ) : (
        <p>{noticeContent}</p>
      )}
    </div>
  );
}
