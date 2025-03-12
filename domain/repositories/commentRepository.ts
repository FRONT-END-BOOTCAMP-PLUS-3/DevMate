import type { Comment } from "@prisma/client";

export interface CommentRepository {
  create(userId: string, projectId: number, content: string, parentCommentId?: number): Promise<Comment>;
  delete(id: number): Promise<void>;
}
