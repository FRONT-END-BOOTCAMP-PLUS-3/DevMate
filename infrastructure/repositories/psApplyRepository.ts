import type { Apply } from "@prisma/client";
import type { ApplyRepository } from "@/domain/repositories/applyRepository";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PsApplyRepository implements ApplyRepository {
  async findById(id: number): Promise<Apply | null> {
    const applyData = await prisma.apply.findUnique({ where: { id } });
    return applyData;
  }

  async findByUserProject(userId: string, projectId: number): Promise<Apply | null> {
    const applyData = await prisma.apply.findFirst({ where: { userId, projectId } });
    return applyData;
  }

  async updateStatus(id: number, status: string): Promise<Apply> {
    const applyUpdateData = await prisma.apply.update({
      where: { id },
      data: { status },
    });
    return applyUpdateData;
  }

  async delete(id: number): Promise<void> {
    await prisma.apply.delete({ where: { id } });
  }
}
