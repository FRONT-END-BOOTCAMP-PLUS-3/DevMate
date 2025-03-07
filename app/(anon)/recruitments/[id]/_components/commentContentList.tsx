import styles from "./commentContentList.module.scss";

import type { CommentDetailDto } from "@/application/usecases/recruitment/dtos/recruitmentDetailDto";

import CommentContent from "./commentContent";

interface CommentContentProps {
  comments: CommentDetailDto[];
}

const CommentContentList: React.FC<CommentContentProps> = ({ comments }) => {
  // 댓글 수 세기
  const countTotalComments = (comments?: CommentDetailDto[]): number => {
    if (!comments || comments.length === 0) return 0;

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
