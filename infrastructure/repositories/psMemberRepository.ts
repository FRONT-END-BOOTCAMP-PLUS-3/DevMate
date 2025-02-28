import type { Member } from "@prisma/client";
import type { MemberRepository } from "@/domain/repositories/memberRepository";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PsMemberRepository implements MemberRepository {
  async create({ projectId, userId }: { projectId: number; userId: string }): Promise<Member> {
    const createdMember = await prisma.member.create({
      data: {
        project: { connect: { id: projectId } },
        user: { connect: { id: userId } },
      },
    });
    return createdMember;
  }
  async delete(id: number): Promise<void> {
    await prisma.member.delete({ where: { id } });
  }
}
