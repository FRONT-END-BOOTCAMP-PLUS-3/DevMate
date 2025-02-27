export interface CommentDto {
  id: number;
  userId: string;
  projectId: number;
  parentCommentId: number | null;
  content: string;
  createdAt: Date;
}
