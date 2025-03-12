import type { LikeRepository } from "@/domain/repositories/likeRepository";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PsLikeRepository implements LikeRepository {
  async findByUserAndProject(userId: string, projectId: number) {
    try {
      return await prisma.like.findFirst({
        where: { userId, projectId },
      });
    } catch (error) {
      throw new Error("Error creating like by user and project: " + error);
    } finally {
      await prisma.$disconnect();
    }
  }

  async create(userId: string, projectId: number) {
    try {
      return await prisma.like.create({
        data: { userId, projectId },
      });
    } catch (error) {
      throw new Error("Error creating like by user and project: " + error);
    } finally {
      await prisma.$disconnect();
    }
  }

  async delete(id: number) {
    try {
      await prisma.like.delete({
        where: { id },
      });
    } catch (error) {
      console.log("Error finding like by user and project:", error);
    } finally {
      await prisma.$disconnect();
    }
  }
  async findProjectsByUser(userId: string): Promise<number[]> {
    try {
      const likes = await prisma.like.findMany({
        where: { userId },
        select: { projectId: true }, // projectId만 가져오기
      });

      return likes.map((like) => like.projectId); // string 배열로 변환
    } catch (error) {
      throw new Error("Error fetching liked projects: " + error);
    } finally {
      await prisma.$disconnect();
    }
  }
}
