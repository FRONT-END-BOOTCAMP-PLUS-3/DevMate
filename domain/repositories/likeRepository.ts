import type { Like } from "@prisma/client";

export interface LikeRepository {
  findByUserAndProject(userId: string, projectId: number): Promise<Like | null>;
  create(userId: string, projectId: number): Promise<Like>;
  delete(id: number): Promise<void>;
}
