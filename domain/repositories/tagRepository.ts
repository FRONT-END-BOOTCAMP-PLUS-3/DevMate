import type { Tag } from "@prisma/client";

export interface TagRepository {
  findById(id: number): Promise<Tag | null>;
  findByName(tagName: string): Promise<Tag | null>;
  create(tagName: string): Promise<Tag>;
  addTags(techStackTags: string[]): Promise<Tag[]>;
  getTagIds(techStackTags: string[]): Promise<number[]>;
  findTagNamesByIds(ids: number[]): Promise<string[]>;
}
