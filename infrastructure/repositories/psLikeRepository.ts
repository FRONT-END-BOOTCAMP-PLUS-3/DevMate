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
}
