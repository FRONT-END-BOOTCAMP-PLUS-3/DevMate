import styles from "./CommentContentList.module.scss";

import type { Project } from "@/domain/entities/project";

import CommentContent from "./CommentContent";

interface CommentContentProps {
  project: Project;
}

const CommentContentList: React.FC<CommentContentProps> = ({ project }) => {
  return (
    <div className={styles.commentContentList}>
      <p>
        댓글 <span>{project.comments.length}</span>
      </p>
      {project.comments.map((comment) => (
        <CommentContent key={comment.id} comment={comment} comments={comment.replies} />
      ))}
    </div>
  );
};

export default CommentContentList;
