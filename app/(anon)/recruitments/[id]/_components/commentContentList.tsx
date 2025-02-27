import styles from "./commentContentList.module.scss";

import type { CommentDetailDto } from "@/application/usecases/projectDetail/dtos/recruitmentDetailDto";

import CommentContent from "./commentContent";

interface CommentContentProps {
  comments: CommentDetailDto[];
}

const CommentContentList: React.FC<CommentContentProps> = ({ comments }) => {
  return (
    <div className={styles.commentContentList}>
      <p>
        댓글 <span>{comments.length}</span>
      </p>
      {comments.map((comment) => (
        <CommentContent key={comment.id} comment={comment} replies={comment.replies} />
      ))}
    </div>
  );
};

export default CommentContentList;
