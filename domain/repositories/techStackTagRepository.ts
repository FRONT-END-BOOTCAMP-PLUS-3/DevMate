import type { TechStackTag } from "@prisma/client";

export interface TechStackTagRepository {
  findByUserId(userId: string): Promise<TechStackTag[]>;
  create(userId: string, tagId: number): Promise<TechStackTag>;
  delete(userId: string, tagId: number): Promise<void>;
}
