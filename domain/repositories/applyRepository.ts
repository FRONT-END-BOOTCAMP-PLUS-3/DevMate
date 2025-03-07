import type { Apply } from "@prisma/client";

export interface ApplyRepository {
  findById(id: number): Promise<Apply | null>;
  findByUserProject(userId: string, projectId: number): Promise<Apply | null>;
  updateStatus(id: number, status: string): Promise<Apply>;
  delete(id: number): Promise<void>;
  create(applyData: Omit<Apply, "id" | "status">): Promise<Apply>;
}
