import type { Member } from "@prisma/client";

export interface MemberRepository {
  findByUserProject(userId: string, projectId: number): Promise<Member | null>;
  create(member: { projectId: number; userId: string }): Promise<Member>;
  delete(id: number): Promise<void>;
}
