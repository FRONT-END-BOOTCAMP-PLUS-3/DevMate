import type { Apply } from "@prisma/client";
import type { ApplyRepository } from "@/domain/repositories/applyRepository";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PsApplyRepository implements ApplyRepository {
  async findById(id: number): Promise<Apply | null> {
    try {
      const applyData = await prisma.apply.findUnique({ where: { id } });
      return applyData;
    } catch (error) {
      console.error("Error finding apply by ID:", error);
      return null;
    } finally {
      await prisma.$disconnect();
    }
  }

  async findByUserId(userId: string): Promise<Apply[]> {
    try {
      const applyData = await prisma.apply.findMany({
        where: { userId },
        include: {
          project: {
            include: {
              leader: true,
            },
          },
          user: true,
        },
      });
      return applyData;
    } catch (error) {
      console.error("Error finding apply by user:", error);
      return [];
    }
  }

  async findByUserProject(userId: string, projectId: number): Promise<Apply | null> {
    try {
      const applyData = await prisma.apply.findFirst({ where: { userId, projectId } });
      return applyData;
    } catch (error) {
      console.error("Error finding apply by user and project:", error);
      return null;
    } finally {
      await prisma.$disconnect();
    }
  }

  async updateStatus(id: number, status: string): Promise<Apply> {
    try {
      const applyUpdateData = await prisma.apply.update({
        where: { id },
        data: { status },
      });
      return applyUpdateData;
    } catch (error) {
      console.error("Error updating apply status:", error);
      throw new Error("지원 상태 업데이트에 실패했습니다.");
    } finally {
      await prisma.$disconnect();
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await prisma.apply.delete({ where: { id } });
    } catch (error) {
      console.error("Error deleting apply:", error);
      throw new Error("지원 삭제에 실패했습니다.");
    } finally {
      await prisma.$disconnect();
    }
  }

  async create(applyData: Omit<Apply, "id" | "status">): Promise<Apply> {
    try {
      const apply = await prisma.apply.create({
        data: applyData,
      });
      return apply;
    } catch (error) {
      console.log("Error creating apply:", error);
      throw new Error("지원서 저장에 실패했습니다.");
    } finally {
      await prisma.$disconnect();
    }
  }
}
