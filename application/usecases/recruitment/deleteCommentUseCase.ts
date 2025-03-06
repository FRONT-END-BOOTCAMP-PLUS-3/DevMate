import type { CommentRepository } from "@/domain/repositories/CommentRepository";

export class DeleteCommentUseCase {
  constructor(private commentRepository: CommentRepository) {}

  async execute(id: number) {
    await this.commentRepository.delete(id);
  }
}
