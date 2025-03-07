import type { LikeRepository } from "@/domain/repositories/likeRepository";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PsLikeRepository implements LikeRepository {
  async findByUserAndProject(userId: string, projectId: number) {
    return await prisma.like.findFirst({
      where: { userId, projectId },
    });
  }

  async create(userId: string, projectId: number) {
    return await prisma.like.create({
      data: { userId, projectId },
    });
  }

  async delete(id: number) {
    await prisma.like.delete({
      where: { id },
    });
  }
}
