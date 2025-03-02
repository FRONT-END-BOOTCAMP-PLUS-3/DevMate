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

  async create(userId: string, tagId: number): Promise<TechStackTag> {
    try {
      return await prisma.techStackTag.create({
        data: { userId, tagId },
      });
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
}
