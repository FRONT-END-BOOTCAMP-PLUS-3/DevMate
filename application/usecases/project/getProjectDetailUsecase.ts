import type { ProjectRepository } from "@/domain/repositories/projectRepository";

import type { ProjectDetailDto } from "./dtos/projectDetailDto";
import type { ProjectDetailApplyDto } from "./dtos/projectDetailApplyDto";
import type { ProjectDetailMemberDto } from "./dtos/projectDetailMemberDto";

export class GetProjectDetailUsecase {
  // eslint-disable-next-line prettier/prettier
  constructor(private projectRepository: ProjectRepository) { }

  async execute(projectId: number): Promise<ProjectDetailDto | null> {
    const projectData: ProjectDetailDto | null = await this.projectRepository.findById(projectId);
    if (!projectData) return null;

    return {
      id: projectData.id,
      leaderId: projectData.leaderId,
      projectTitle: projectData.projectTitle,
      goal: projectData.goal,
      description: projectData.description,
      projectPeriodStart: projectData.projectPeriodStart,
      projectPeriodEnd: projectData.projectPeriodEnd,
      notice: projectData.notice,
      leader: projectData.leader,
      applications: projectData.applications
        ?.filter((apply): apply is ProjectDetailApplyDto => apply != null)
        .map((apply) => ({
          id: apply.id,
          projectId: apply.projectId,
          userId: apply.userId,
          position: apply.position,
          introduction: apply.introduction,
          portfolioUrl: apply.portfolioUrl,
          status: apply.status,
          user: apply.user,
        })),
      members: projectData.members
        ?.filter((mem): mem is ProjectDetailMemberDto => mem != null)
        .map((mem) => ({
          id: mem.id,
          projectId: mem.projectId,
          userId: mem.userId,
          user: mem.user,
        })),
    };
  }
}
