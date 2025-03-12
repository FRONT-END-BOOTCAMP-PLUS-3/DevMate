import type { Project } from "@prisma/client";
import type { RecruitmentSort, RecruitmentStatus } from "@/constants/recruitmentTypes";

export interface ProjectRepository {
  findByAll(status?: RecruitmentStatus, sort?: RecruitmentSort, search?: string, tags?: string[]): Promise<Project[]>;
  findByUserId(
    userId: string,
    status?: "ALL" | "RECRUITING" | "COMPLETED",
    filter?: "CREATE" | "LIKE" | "COMMENT" | "MEMBER",
  ): Promise<Project[]>;
  create(project: Omit<Project, "id" | "hits" | "createdAt" | "notice">): Promise<Project>;
  findById(id: number): Promise<Project | null>;
  findProjectTitleById(projectId: number, userId: string): Promise<string | null>;
  update(id: number, project: Partial<Omit<Project, "id" | "createdAt">>): Promise<Project>;
  delete(id: number): Promise<void>;
  incrementHits(id: number): Promise<void>;
}
