import type { ProjectRepository } from "@/domain/repositories/projectRepository";
import type { RecruitmentSort, RecruitmentStatus } from "@/constants/recruitmentTypes";

import type { RecruitmentsDto } from "./dtos/recruitmentsDto";

export class GetRecruitmentsUsecase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute({
    status = "전체",
    sort = "최신순",
    search = "",
    tags = [],
  }: {
    status?: RecruitmentStatus;
    sort?: RecruitmentSort;
    search?: string;
    tags?: string[];
  }): Promise<RecruitmentsDto[]> {
    const response: RecruitmentsDto[] = await this.projectRepository.findByAll(status, sort, search, tags);

    const recruitments: RecruitmentsDto[] = response.map((item) => ({
      id: item.id,
      leaderId: item.leaderId,
      recruitmentTitle: item.recruitmentTitle,
      projectTitle: item.projectTitle,
      goal: item.goal,
      description: item.description,
      projectPeriodStart: item.projectPeriodStart,
      projectPeriodEnd: item.projectPeriodEnd,
      recruitmentStart: item.recruitmentStart,
      recruitmentEnd: item.recruitmentEnd,
      hits: item.hits,
      createdAt: item.createdAt,
      notice: item.notice,
      leaderName: item.leaderName,
      projectTags: item.projectTags,
      commentCount: item.commentCount,
      likeCount: item.likeCount,
    }));

    return recruitments;
  }
}
