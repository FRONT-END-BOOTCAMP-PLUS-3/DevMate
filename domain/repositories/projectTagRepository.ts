import type { ProjectTag } from "@prisma/client";

export interface ProjectTagRepository {
  findByProjectId(projectId: number): Promise<ProjectTag[]>;
  createSingle(projectId: number, tagId: number): Promise<ProjectTag>;
  createMultiple(projectId: number, tagIds: number[]): Promise<ProjectTag[]>;
}
