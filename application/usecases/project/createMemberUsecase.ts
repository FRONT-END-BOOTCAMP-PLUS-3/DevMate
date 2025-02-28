import type { ApplyRepository } from "@/domain/repositories/applyRepository";
import type { MemberRepository } from "@/domain/repositories/memberRepository";

import type { ProjectDetailApplyDto } from "./dtos/projectDetailApplyDto";
import type { ProjectDetailMemberDto } from "./dtos/projectDetailMemberDto";

export class CreateMemberUsecase {
  constructor(
    private applyRepository: ApplyRepository,
    private memberRepository: MemberRepository,
    // eslint-disable-next-line prettier/prettier
  ) { }

  async execute(applyId: number): Promise<ProjectDetailMemberDto | null> {
    const applyData: ProjectDetailApplyDto | null = await this.applyRepository.findById(applyId);
    if (!applyData) return null;

    const createdMember: ProjectDetailMemberDto | null = await this.memberRepository.create({
      projectId: applyData.projectId,
      userId: applyData.userId,
    });

    await this.applyRepository.updateStatus(applyId, "accept");

    return createdMember;
  }
}
