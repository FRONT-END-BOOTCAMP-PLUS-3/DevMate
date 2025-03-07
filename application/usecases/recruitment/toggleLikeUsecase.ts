import type { LikeRepository } from "@/domain/repositories/likeRepository";

export class ToggleLikeUsecase {
  constructor(private likeRepository: LikeRepository) {}

  async execute(userId: string, projectId: number) {
    const existingLike = await this.likeRepository.findByUserAndProject(userId, projectId);

    if (existingLike) {
      await this.likeRepository.delete(existingLike.id);
      return { liked: false };
    } else {
      await this.likeRepository.create(userId, projectId);
      return { liked: true };
    }
  }
}
