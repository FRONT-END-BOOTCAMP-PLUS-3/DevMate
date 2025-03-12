import { FileStorage } from "@/utils/fileStorage";

import type { Apply } from "@prisma/client";
import type { ApplyRepository } from "@/domain/repositories/applyRepository";

import type { ApplyInputDto } from "./dtos/ApplyInputDto";

export class CreateApplyUsecase {
  private applyRepository: ApplyRepository;

  constructor(applyRepository: ApplyRepository) {
    this.applyRepository = applyRepository;
  }

  async execute(input: ApplyInputDto): Promise<Apply> {
    let portfolioUrl: string | null = null;

    // 파일이 존재하면 저장
    if (input.portfolioFile) {
      portfolioUrl = await FileStorage.saveFile(input.portfolioFile);
    }

    // 지원서 데이터 저장
    return this.applyRepository.create({
      projectId: input.projectId,
      userId: input.userId,
      position: input.position,
      introduction: input.introduction,
      portfolioUrl: portfolioUrl,
    });
  }
}
