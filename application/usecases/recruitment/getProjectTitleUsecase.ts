import type { ProjectRepository } from "@/domain/repositories/projectRepository";

export class GetProjectTitleUsecase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(id: number): Promise<string | null> {
    const projectTitle = await this.projectRepository.findProjectTitleById(id);

    if (!projectTitle) return null;

    return projectTitle;
  }
}
