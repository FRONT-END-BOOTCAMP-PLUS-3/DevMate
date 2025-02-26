import styles from "./CommentContentList.module.scss";

import type { Comment } from "@/domain/entities/comment";

import CommentContent from "./CommentContent";

interface CommentContentProps {
  comments: Comment[];
}

const CommentContentList: React.FC<CommentContentProps> = ({ comments }) => {
  return (
    <div className={styles.commentContentList}>
      <p>
        댓글 <span>{comments.length}</span>
      </p>
      {comments.map((comment) => (
        <CommentContent key={comment.id} comment={comment} comments={comment.replies} />
      ))}
    </div>
  );
};

export default CommentContentList;
