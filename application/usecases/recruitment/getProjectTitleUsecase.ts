import type { ProjectRepository } from "@/domain/repositories/projectRepository";

export class GetProjectTitleUsecase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(projectId: number, userId: string): Promise<string | null> {
    const projectTitle = await this.projectRepository.findProjectTitleById(projectId, userId);

    if (!projectTitle) return null;

    return projectTitle;
  }
}
