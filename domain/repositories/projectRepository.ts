import type { Project } from "@prisma/client";

export interface ProjectRepository {
  findByAll(
    status?: "전체" | "모집중" | "모집완료",
    sort?: "최신순" | "조회수순" | "댓글많은순" | "좋아요순",
    search?: string,
    tags?: string[],
  ): Promise<Project[]>;
  create(project: Omit<Project, "id" | "hits" | "createdAt" | "notice">): Promise<Project>;
  findById(id: number): Promise<Project | null>;
  findProjectTitleById(id: number): Promise<string | null>;
  update(id: number, project: Partial<Omit<Project, "id" | "createdAt">>): Promise<Project>;
  delete(id: number): Promise<void>;
  incrementHits(id: number): Promise<void>;
}
