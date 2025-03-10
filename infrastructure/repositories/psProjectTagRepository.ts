import type { ProjectTag } from "@prisma/client";
import type { ProjectTagRepository } from "@/domain/repositories/projectTagRepository";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PsProjectTagRepository implements ProjectTagRepository {
  async findByProjectId(projectId: number): Promise<ProjectTag[]> {
    try {
      const tags = await prisma.projectTag.findMany({
        where: { projectId },
        include: { tag: true },
      });
      return tags;
    } catch (error) {
      console.error("프로젝트 ID로 태그를 찾는 중 오류 발생:", error);
      throw new Error("프로젝트 태그를 찾는 데 실패했습니다.");
    } finally {
      await prisma.$disconnect();
    }
  }

  async createSingle(projectId: number, tagId: number): Promise<ProjectTag> {
    try {
      return await prisma.projectTag.create({
        data: { projectId, tagId },
      });
    } catch (error) {
      console.error("프로젝트 태그 생성 중 오류 발생:", error);
      throw new Error("프로젝트 태그를 생성하는 데 실패했습니다.");
    } finally {
      await prisma.$disconnect();
    }
  }

  async createMultiple(projectId: number, tagIds: number[]): Promise<ProjectTag[]> {
    try {
      // 1. 기존 태그 삭제
      await prisma.projectTag.deleteMany({
        where: { projectId },
      });

      // 2. 새로운 태그 생성
      const createdTags: ProjectTag[] = [];
      for (const tagId of tagIds) {
        const projectTag = await prisma.projectTag.create({
          data: { projectId, tagId },
        });
        createdTags.push(projectTag);
      }

      return createdTags;
    } catch (error) {
      console.error("프로젝트 태그 생성 중 오류 발생:", error);
      throw new Error("프로젝트 태그를 생성하는 데 실패했습니다.");
    } finally {
      await prisma.$disconnect();
    }
  }
}
