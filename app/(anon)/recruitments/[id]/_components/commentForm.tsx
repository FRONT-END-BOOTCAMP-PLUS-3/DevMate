"use client";

import { useEffect, useState } from "react";

import Button from "@/components/button/button";

import { decodeToken } from "@/utils/cookie";

import styles from "./commentForm.module.scss";

interface CommentFormProps {
  projectId: number;
  parentId?: number;
  onClickCloseReplyForm?: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ projectId, parentId, onClickCloseReplyForm }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchUserId();
  }, []);

  const postComment = async () => {
    if (!userId) {
      alert("로그인 후 작성해주세요.");
      return;
    }

    try {
      const response = await fetch(`/api/recruitments/${projectId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, projectId, content, parentCommentId: parentId }),
      });

      if (!response.ok) {
        throw new Error("댓글 생성에 실패했습니다.");
      }

      window.location.reload();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const fetchUserId = async () => {
    try {
      const decoded = await decodeToken("id");
      if (typeof decoded === "string") {
        setUserId(decoded);
      }
    } catch {
      setUserId(null);
    }
  };

  return (
    <form className={styles.commentForm}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={userId ? "댓글을 작성해보세요." : "로그인 후 작성해주세요."}
        rows={4}
      />
      <div className={styles.commentForm__buttonWrapper}>
        <Button
          onClick={postComment}
          variant={!content.trim() ? "disabled" : "main"}
          size="small"
          disabled={!content.trim()}
        >
          등록
        </Button>
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
