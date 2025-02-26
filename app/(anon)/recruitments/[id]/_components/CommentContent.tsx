"use client";

import Image from "next/image";

import { useState, useMemo } from "react";

import styles from "./CommentContent.module.scss";

import type { Comment } from "@/domain/entities/comment";

import CommentForm from "./CommentForm";

interface CommentProps {
  comment: Comment;
  comments?: Comment[];
}

const CommentContent: React.FC<CommentProps> = ({ comment, comments }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleDelete = async () => {
    await fetch(`/api/comments?id=${comment.id}`, { method: "DELETE" });
  };

  const replies = useMemo(
    () => comments?.filter((c) => c.parentCommentId === comment.id) || [],
    [comments, comment.id],
  );

  return (
    <div className={styles["commentContent"]} style={{ marginLeft: comment.parentCommentId ? "20px" : "0px" }}>
      <div className={styles["commentContent__header"]}>
        <Image
          src={comment.user.profileImg || "/defaultProfile.svg"}
          alt="profile"
          width={40}
          height={40}
          className={styles["commentContent__avatar"]}
        />
        <div>
          <p className={styles["commentContent__nickname"]}>{comment.user.nickname}</p>
          <p className={styles["commentContent__date"]}>{new Date(comment.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <div className={styles["commentContent__body"]}>{comment.content}</div>
      <div className={styles["commentContent__actions"]}>
        <button onClick={() => setShowReplyForm(!showReplyForm)}>대댓글</button>
        <button onClick={handleDelete}>삭제</button>
      </div>

      {showReplyForm && (
        <CommentForm
          projectId={comment.projectId}
          parentId={comment.id}
          onClickCloseReplyForm={() => setShowReplyForm(!showReplyForm)}
        />
      )}

      {replies.map((reply) => (
        <CommentContent key={reply.id} comment={reply} comments={comments} />
      ))}
    </div>
  );
};

export default CommentContent;
