import type { Member } from "@prisma/client";

export interface MemberRepository {
  create(member: { projectId: number; userId: string }): Promise<Member>;
  delete(id: number): Promise<void>;
}
