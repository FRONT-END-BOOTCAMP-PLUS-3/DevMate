import type { Member } from "@prisma/client";
import type { MemberRepository } from "@/domain/repositories/memberRepository";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PsMemberRepository implements MemberRepository {
  async create({ projectId, userId }: { projectId: number; userId: string }): Promise<Member> {
    try {
      const createdMember = await prisma.member.create({
        data: {
          project: { connect: { id: projectId } },
          user: { connect: { id: userId } },
        },
      });
      return createdMember;
    } catch (error) {
      console.log("Error creating member:", error);
      throw new Error("멤버 생성에 실패했습니다.");
    } finally {
      await prisma.$disconnect();
    }
  }

  async findByUserProject(userId: string, projectId: number): Promise<Member | null> {
    try {
      const memberData = await prisma.member.findFirst({ where: { userId, projectId } });
      return memberData;
    } catch (error) {
      console.log("Error finding member by user and project:", error);
      return null;
    } finally {
      await prisma.$disconnect();
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await prisma.member.delete({ where: { id } });
    } catch (error) {
      console.log("Error deleting member:", error);
      throw new Error("멤버 삭제에 실패했습니다.");
    } finally {
      await prisma.$disconnect();
    }
  }
}
