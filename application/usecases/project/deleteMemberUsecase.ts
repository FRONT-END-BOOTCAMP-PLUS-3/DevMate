import type { ApplyRepository } from "@/domain/repositories/applyRepository";
import type { MemberRepository } from "@/domain/repositories/memberRepository";

import type { ProjectDetailApplyDto } from "./dtos/projectDetailApplyDto";
import type { ProjectDetailMemberDto } from "./dtos/projectDetailMemberDto";

export class DeleteMemberUsecase {
  constructor(
    private applyRepository: ApplyRepository,
    private memberRepository: MemberRepository,
    // eslint-disable-next-line prettier/prettier
  ) {}

  async execute(userId: string, projectId: number): Promise<void> {
    try {
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
    } catch (error) {
      console.log("Error executing DeleteMemberUsecase:", error);
      throw new Error("멤버 삭제에 실패했습니다.");
    }
  }
}
