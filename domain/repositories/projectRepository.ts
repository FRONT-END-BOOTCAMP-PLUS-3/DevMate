import type { Project } from "@prisma/client";

export interface ProjectRepository {
  create(project: Omit<Project, "id" | "hits" | "createdAt" | "notice">): Promise<Project>;
  findById(id: number): Promise<Project | null>;
  update(id: number, project: Partial<Omit<Project, "id" | "createdAt">>): Promise<Project>;
  delete(id: number): Promise<void>;
}
