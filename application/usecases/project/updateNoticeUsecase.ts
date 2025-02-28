import type { ProjectRepository } from "@/domain/repositories/projectRepository";

import type { ProjectDto } from "../dtos/projectDto";
import type { ProjectDetailDto } from "./dtos/projectDetailDto";

export class UpdateNoticeUsecase {
  // eslint-disable-next-line prettier/prettier
  constructor(private projectRepository: ProjectRepository) { }

  async execute(id: number, notice: string): Promise<ProjectDetailDto | null> {
    const projectData: ProjectDto | null = await this.projectRepository.findById(id);
    if (!projectData) return null;

    const updatedProject = await this.projectRepository.update(id, { notice });
    console.log("업데이트된 프로젝트", JSON.stringify(updatedProject, null, 2));

    return {
      id: updatedProject.id,
      leaderId: updatedProject.leaderId,
      projectTitle: updatedProject.projectTitle,
      goal: updatedProject.goal,
      description: updatedProject.description,
      projectPeriodStart: updatedProject.projectPeriodStart,
      projectPeriodEnd: updatedProject.projectPeriodEnd,
      notice: updatedProject.notice,
    };
  }
}
