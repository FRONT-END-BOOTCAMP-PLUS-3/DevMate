import type { ApplyRepository } from "@/domain/repositories/applyRepository";
import type { MemberRepository } from "@/domain/repositories/memberRepository";

import type { ProjectDetailApplyDto } from "./dtos/projectDetailApplyDto";
import type { ProjectDetailMemberDto } from "./dtos/projectDetailMemberDto";

export class DeleteMemberUsecase {
  constructor(
    private applyRepository: ApplyRepository,
    private memberRepository: MemberRepository,
    // eslint-disable-next-line prettier/prettier
  ) { }

  async execute(userId: string, projectId: number): Promise<void> {
    const [applyData, memberData]: [ProjectDetailApplyDto | null, ProjectDetailMemberDto | null] = await Promise.all([
      this.applyRepository.findByUserProject(userId, projectId),
      this.memberRepository.findByUserProject(userId, projectId),
    ]);

    const deletePromises: Promise<void>[] = [];

    if (applyData) {
      deletePromises.push(this.applyRepository.delete(applyData.id));
    }

    if (memberData) {
      deletePromises.push(this.memberRepository.delete(memberData.id));
    }

    await Promise.all(deletePromises);
  }
}
