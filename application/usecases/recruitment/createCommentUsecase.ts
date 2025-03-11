// application/usecases/CreateCommentUseCase.ts
import type { CommentRepository } from "@/domain/repositories/commentRepository";

export class CreateCommentUseCase {
  constructor(private commentRepository: CommentRepository) {}

  async execute(userId: string, projectId: number, content: string, parentCommentId?: number) {
    const comment = await this.commentRepository.create(userId, projectId, content, parentCommentId);
    return comment;
  }
}
