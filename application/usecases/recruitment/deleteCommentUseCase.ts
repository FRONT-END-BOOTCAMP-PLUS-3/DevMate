import type { CommentRepository } from "@/domain/repositories/commentRepository";

export class DeleteCommentUseCase {
  constructor(private commentRepository: CommentRepository) {}

  async execute(id: number) {
    await this.commentRepository.delete(id);
  }
}
