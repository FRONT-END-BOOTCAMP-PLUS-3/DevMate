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
      console.log("태그 ID로 태그를 찾는 중 오류 발생:", error);
      throw new Error("태그를 찾는 데 실패했습니다.");
    } finally {
      await prisma.$disconnect();
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
      console.log("태그 ID 배열로 태그 이름을 찾는 중 오류 발생:", error);
      throw new Error("태그 이름을 찾는 데 실패했습니다.");
    } finally {
      await prisma.$disconnect();
    }
  }

  async findByName(tagName: string): Promise<Tag | null> {
    try {
      return await prisma.tag.findUnique({
        where: { tagName },
      });
    } catch (error) {
      console.log("태그 이름으로 태그를 찾는 중 오류 발생:", error);
      throw new Error("태그를 찾는 데 실패했습니다.");
    } finally {
      await prisma.$disconnect();
    }
  }

  async create(tagName: string): Promise<Tag> {
    try {
      return await prisma.tag.create({
        data: { tagName },
      });
    } catch (error) {
      console.log("태그 생성 중 오류 발생:", error);
      throw new Error("태그를 생성하는 데 실패했습니다.");
    } finally {
      await prisma.$disconnect();
    }
  }
  async addTags(tagNames: string[]): Promise<Tag[]> {
    try {
      // 기존 태그 조회 (이미 존재하는 태그 찾기)
      const existingTags = await prisma.tag.findMany({
        where: {
          tagName: { in: tagNames },
        },
        select: {
          id: true,
          tagName: true,
        },
      });

      // 존재하는 태그의 이름을 배열로 저장
      const existingTagNames = new Set(existingTags.map((tag) => tag.tagName));

      // 새로운 태그 찾기 (이미 존재하는 태그를 제외)
      const newTagNames = tagNames.filter((tagName) => !existingTagNames.has(tagName));

      // 새로운 태그 생성 (필요한 경우)
      if (newTagNames.length > 0) {
        await prisma.tag.createMany({
          data: newTagNames.map((tagName) => ({ tagName })),
          skipDuplicates: true, // 중복 태그 생성을 방지
        });
      }

      // 최종적으로 모든 태그를 조회하여 반환
      const allTags = await prisma.tag.findMany({
        where: {
          tagName: { in: tagNames },
        },
      });

      console.log("추가된 태그들:", allTags);
      return allTags;
    } catch (error) {
      console.log("태그 추가 중 오류 발생:", error);
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
      console.log("태그 ID 조회 중 오류 발생:", error);
      throw new Error("태그 ID를 조회하는 데 실패했습니다.");
    } finally {
      await prisma.$disconnect();
    }
  }
}
