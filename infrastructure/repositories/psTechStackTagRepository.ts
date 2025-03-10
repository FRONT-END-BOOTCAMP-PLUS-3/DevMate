import type { TechStackTag } from "@prisma/client";
import type { TechStackTagRepository } from "@/domain/repositories/techStackTagRepository";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PsTechStackTagRepository implements TechStackTagRepository {
  async findByUserId(userId: string): Promise<TechStackTag[]> {
    try {
      return await prisma.techStackTag.findMany({
        where: { userId },
        include: { tag: true }, // 태그 정보도 포함해서 조회 가능
      });
    } catch (error) {
      console.error("사용자 ID로 기술 스택 태그를 찾는 중 오류 발생:", error);
      throw new Error("기술 스택 태그를 찾는 데 실패했습니다.");
    }
  }

  async createSingle(userId: string, tagId: number): Promise<TechStackTag> {
    try {
      return await prisma.techStackTag.create({
        data: { userId, tagId },
      });
    } catch (error) {
      console.error("기술 스택 태그 생성 중 오류 발생:", error);
      throw new Error("기술 스택 태그를 생성하는 데 실패했습니다.");
    }
  }

  async createMultiple(userId: string, tagIds: number[]): Promise<TechStackTag[]> {
    try {
      // 1. 기존 태그 삭제
      await prisma.techStackTag.deleteMany({
        where: { userId }, // 해당 userId의 모든 태그를 삭제
      });

      // 2. 새로운 태그 생성
      const createdTags: TechStackTag[] = [];
      for (const tagId of tagIds) {
        const techStackTag = await prisma.techStackTag.create({
          data: { userId, tagId },
        });
        createdTags.push(techStackTag);
      }

      return createdTags;
    } catch (error) {
      console.error("기술 스택 태그 생성 중 오류 발생:", error);
      throw new Error("기술 스택 태그를 생성하는 데 실패했습니다.");
    }
  }
  async delete(userId: string, tagId: number): Promise<void> {
    try {
      await prisma.techStackTag.delete({
        where: { userId_tagId: { userId, tagId } },
      });
    } catch (error) {
      console.error("기술 스택 태그 삭제 중 오류 발생:", error);
      throw new Error("기술 스택 태그를 삭제하는 데 실패했습니다.");
    }
  }

  async findTagIdByName(tagName: string): Promise<number | null> {
    try {
      const tag = await prisma.tag.findUnique({
        where: { tagName: tagName },
      });
      return tag ? tag.id : null;
    } catch (error) {
      console.error("태그 이름으로 태그 ID를 찾는 중 오류 발생:", error);
      throw new Error("태그 ID를 찾는 데 실패했습니다.");
    }
  }
}
