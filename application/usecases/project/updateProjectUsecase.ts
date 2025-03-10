import type { ProjectRepository } from "@/domain/repositories/projectRepository";

import type { ProjectDetailDto } from "./dtos/projectDetailDto";

export class UpdateProjectUsecase {
  // eslint-disable-next-line prettier/prettier
  constructor(private projectRepository: ProjectRepository) { }

  async execute(
    id: number,
    updateData: {
      projectTitle?: string;
      goal?: string;
      description?: string;
      projectPeriodStart?: Date;
      projectPeriodEnd?: Date;
      notice?: string;
    },
  ): Promise<ProjectDetailDto | null> {
    try {
      const projectData: ProjectDetailDto | null = await this.projectRepository.findById(id);
      if (!projectData) return null;

      // 업데이트 수행
      const updatedProject = await this.projectRepository.update(id, updateData);
      console.log("✅ 업데이트된 프로젝트:", JSON.stringify(updatedProject, null, 2));

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
    } catch (error) {
      console.error("❌ 프로젝트 업데이트 오류:", error);
      return null;
    }
  }
}
