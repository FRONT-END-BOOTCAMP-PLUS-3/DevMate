import type { Project } from "@prisma/client";

export interface ProjectRepository {
  findById(id: number): Promise<Project | null>;
  findProjectTitleById(id: number): Promise<string | null>;
  update(id: number, project: Partial<Omit<Project, "id" | "createdAt">>): Promise<Project>;
  delete(id: number): Promise<void>;
  incrementHits(id: number): Promise<void>;
}
