import styles from "./commentContentList.module.scss";

import type { CommentDetailDto } from "@/application/usecases/recruitment/dtos/recruitmentDetailDto";

import CommentContent from "./commentContent";

interface CommentContentProps {
  comments: CommentDetailDto[];
}

const CommentContentList: React.FC<CommentContentProps> = ({ comments }) => {
  const countTotalComments = (comments: CommentDetailDto[]): number => {
    return comments.reduce((count, comment) => {
      return count + 1 + countTotalComments(comment.replies);
    }, 0);
  };

  return (
    <div className={styles.commentContentList}>
      <p>
        댓글 <span>{countTotalComments(comments)}</span>
      </p>
      {comments.map((comment) => (
        <CommentContent key={comment.id} comment={comment} replies={comment.replies} />
      ))}
    </div>
  );
};

export default CommentContentList;
