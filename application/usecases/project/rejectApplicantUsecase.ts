import type { UserRepository } from "@/domain/repositories/userRepository";
import type { ApplyRepository } from "@/domain/repositories/applyRepository";

import type { ApplyDto } from "../dtos/applyDto";
import type { ProjectDetailApplyDto } from "./dtos/projectDetailApplyDto";

export class RejectApplicantUsecase {
  constructor(
    private applyRepository: ApplyRepository,
    private userRepository: UserRepository,
    // eslint-disable-next-line prettier/prettier
  ) { }

  async execute(id: number): Promise<ProjectDetailApplyDto | null> {
    // 지원자 데이터를 찾음
    const applicantData: ApplyDto | null = await this.applyRepository.findById(id);
    if (!applicantData) return null;

    // 지원 상태를 "reject"로 변경
    const updatedApply = await this.applyRepository.updateStatus(id, "reject");

    // 지원자 정보를 찾음
    const userData = await this.userRepository.findById(applicantData.userId);
    if (!userData) return null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { createdAt, email, nickname, password, profileImg, ...filteredUserData } = userData;

    // 업데이트된 데이터를 반환
    return {
      id: updatedApply.id,
      projectId: updatedApply.projectId,
      userId: updatedApply.userId,
      position: updatedApply.position,
      introduction: updatedApply.introduction,
      portfolioUrl: updatedApply.portfolioUrl,
      status: updatedApply.status,
      user: filteredUserData,
    };
  }
}
