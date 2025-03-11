import type { ProjectRepository } from "@/domain/repositories/projectRepository";

import type { RecruitmentsDto } from "../recruitment/dtos/recruitmentsDto";

export class GetMyProjectsUsecase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute({
    userId,
    status = "ALL",
    filter = "CREATE",
  }: {
    userId: string;
    status?: "ALL" | "RECRUITING" | "COMPLETED";
    filter?: "CREATE" | "LIKE" | "COMMENT" | "MEMBER";
  }): Promise<RecruitmentsDto[]> {
    const response: RecruitmentsDto[] = await this.projectRepository.findByUserId(userId, status, filter);

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
