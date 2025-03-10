import type { Tag } from "@prisma/client";
import type { TagRepository } from "@/domain/repositories/tagRepository";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PsTagRepository implements TagRepository {
  async findById(id: number): Promise<Tag | null> {
    try {
      return await prisma.tag.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error("태그 ID로 태그를 찾는 중 오류 발생:", error);
      throw new Error("태그를 찾는 데 실패했습니다.");
    }
  }
  async findTagNamesByIds(ids: number[]): Promise<string[]> {
    try {
      const tags = await prisma.tag.findMany({
        where: { id: { in: ids } }, // 여러 ID 조회
        select: { tagName: true }, // tagName만 선택
      });
      const tagNames = tags.map((tag) => tag.tagName);

      return tagNames; // 태그 이름 배열로 반환
    } catch (error) {
      console.error("태그 ID 배열로 태그 이름을 찾는 중 오류 발생:", error);
      throw new Error("태그 이름을 찾는 데 실패했습니다.");
    }
  }

  async findByName(tagName: string): Promise<Tag | null> {
    try {
      return await prisma.tag.findUnique({
        where: { tagName },
      });
    } catch (error) {
      console.error("태그 이름으로 태그를 찾는 중 오류 발생:", error);
      throw new Error("태그를 찾는 데 실패했습니다.");
    }
  }

  async create(tagName: string): Promise<Tag> {
    try {
      return await prisma.tag.create({
        data: { tagName },
      });
    } catch (error) {
      console.error("태그 생성 중 오류 발생:", error);
      throw new Error("태그를 생성하는 데 실패했습니다.");
    }
  }
  async addTags(tagNames: string[]): Promise<Tag[]> {
    try {
      await prisma.tag.createMany({
        data: tagNames.map((tagName) => ({ tagName })),
      });
      return await prisma.tag.findMany({
        where: {
          tagName: {
            in: tagNames,
          },
        },
      });
    } catch (error) {
      console.error("태그 추가 중 오류 발생:", error);
      throw new Error("태그를 추가하는 데 실패했습니다.");
    }
  }

  async getTagIds(tagNames: string[]): Promise<number[]> {
    try {
      const tags = await prisma.tag.findMany({
        where: {
          tagName: { in: tagNames },
        },
        select: {
          id: true,
          tagName: true,
        },
      });
      const validTagIds = tags.map((tag) => tag.id);
      console.log("태그 ID 조회 결과:", validTagIds);
      return validTagIds;
    } catch (error) {
      console.error("태그 ID 조회 중 오류 발생:", error);
      throw new Error("태그 ID를 조회하는 데 실패했습니다.");
    }
  }
}
