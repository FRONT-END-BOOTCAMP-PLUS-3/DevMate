"use client";

import { useState } from "react";

import Button from "@/components/button/button";

import styles from "./CommentForm.module.scss";

interface CommentFormProps {
  projectId: number;
  parentId?: number;
  onClickCloseReplyForm?: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ projectId, parentId, onClickCloseReplyForm }) => {
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    console.log("댓글 달기", projectId, parentId);
  };

  return (
    <form className={styles.commentForm}>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="댓글을 작성해보세요." rows={4} />
      <div className={styles.commentForm__buttonWrapper}>
        <Button onClick={handleSubmit}>등록</Button>
        {parentId && onClickCloseReplyForm && (
          <Button onClick={onClickCloseReplyForm} variant={"sub"}>
            취소
          </Button>
        )}
      </div>
    </form>
  );
};

export default CommentForm;
