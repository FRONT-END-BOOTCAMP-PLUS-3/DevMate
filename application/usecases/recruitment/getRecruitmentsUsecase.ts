import type { ProjectRepository } from "@/domain/repositories/projectRepository";

import type { RecruitmentsDto } from "./dtos/rectuitmentsDto";

export class GetRecruitmentsUsecase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute({
    status = "전체",
    sort = "최신순",
    search = "",
    tags = [],
  }: {
    status?: "전체" | "모집중" | "모집완료";
    sort?: "최신순" | "조회수순" | "댓글많은순" | "좋아요순";
    search?: string;
    tags?: string[];
  }): Promise<RecruitmentsDto[]> {
    const response = await this.projectRepository.findByAll(status, sort, search, tags);

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
      leaderName: item.leader.nickname,
      projectTags: item.projectTags,
      commentCount: item._count.comments,
      likeCount: item._count.likes,
    }));

    return recruitments;
  }
}
