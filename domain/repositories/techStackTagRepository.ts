import type { TechStackTag } from "@prisma/client";

export interface TechStackTagRepository {
  findByUserId(userId: string): Promise<TechStackTag[]>;
  createSingle(userId: string, tagId: number): Promise<TechStackTag>;
  createMultiple(userId: string, tagIds: number[]): Promise<TechStackTag[]>;
  delete(userId: string, tagId: number): Promise<void>;
  findTagIdByName(tagName: string): Promise<number | null>;
}
