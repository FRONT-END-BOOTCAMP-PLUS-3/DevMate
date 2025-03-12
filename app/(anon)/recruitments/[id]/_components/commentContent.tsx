"use client";

import Image from "next/image";

import { useEffect, useState } from "react";

import { decodeToken } from "@/utils/cookie";

import styles from "./commentContent.module.scss";

import type { CommentDetailDto } from "@/application/usecases/recruitment/dtos/recruitmentDetailDto";

import CommentForm from "./commentForm";

interface CommentProps {
  comment: CommentDetailDto;
  replies?: CommentDetailDto[];
}

const CommentContent: React.FC<CommentProps> = ({ comment, replies }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [showReplyForm, setShowReplyForm] = useState(false);

  useEffect(() => {
    fetchUserId();
  }, []);

  const deleteComment = async () => {
    if (!validation()) return;

    try {
      const response = await fetch(`/api/recruitments/${comment.projectId}/comment?id=${comment.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("댓글 생성에 실패했습니다.");
      }

      window.location.reload();
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const validation = () => {
    if (!confirm("해당 댓글을 삭제하시겠습니까?")) {
      return false;
    }

    if (userId !== comment.userId) {
      alert("권한이 없습니다.");
      return false;
    }

    return true;
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
    <div className={styles["commentContent"]} style={{ marginLeft: comment.parentCommentId ? "20px" : "0px" }}>
      <div className={styles["commentContent__header"]}>
        <Image
          // src={comment.user.profileImg || "/defaultProfile.svg"}
          src={"/defaultProfile.svg"}
          alt="profile"
          width={40}
          height={40}
          className={styles["commentContent__avatar"]}
        />
        <div>
          <p className={styles["commentContent__nickname"]}>
            {comment.user.nickname ? comment.user.nickname : "탈퇴한 사용자"}
          </p>
          <p className={styles["commentContent__date"]}>{new Date(comment.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <div className={styles["commentContent__body"]}>{comment.content}</div>
      <div className={styles["commentContent__actions"]}>
        <button onClick={() => setShowReplyForm(!showReplyForm)}>대댓글</button>
        {userId && userId === comment.userId && <button onClick={deleteComment}>삭제</button>}
      </div>

      {showReplyForm && (
        <CommentForm
          projectId={comment.projectId}
          parentId={comment.parentCommentId ? comment.parentCommentId : comment.id}
          onClickCloseReplyForm={() => setShowReplyForm(!showReplyForm)}
        />
      )}

      {replies && replies.map((reply) => <CommentContent key={reply.id} comment={reply} />)}
    </div>
  );
};

export default CommentContent;
