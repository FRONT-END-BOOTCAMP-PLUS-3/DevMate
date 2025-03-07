import type { ProjectRepository } from "@/domain/repositories/projectRepository";
import type { PsTagRepository } from "@/infrastructure/repositories/psTagRepository";
import type { PsProjectTagRepository } from "@/infrastructure/repositories/psProjectTagRepository";

import type { CreateProjectDto } from "./dtos/createProjectDto";

export class CreateProjectUsecase {
  constructor(
    private projectRepository: ProjectRepository,
    private tagRepository: PsTagRepository,
    private projectTagRepository: PsProjectTagRepository,
    // eslint-disable-next-line prettier/prettier
  ) { }

  async execute(project: CreateProjectDto): Promise<CreateProjectDto> {
    try {
      const { projectTags, ...rest } = project;
      const newProject = await this.projectRepository.create({ ...rest });

      if (projectTags && projectTags.length > 0) {
        await this.tagRepository.addTags(projectTags);
        const tagIds = await this.tagRepository.getTagIds(projectTags);

        if (tagIds.length > 0) {
          await this.projectTagRepository.createMultiple(newProject.id, tagIds);
        }
      }

      const createdProject = { ...newProject, projectTags: project.projectTags };
      console.log("프로젝트 생성 성공", createdProject);
      return createdProject;
    } catch (error) {
      console.error("Error occurred creating projcet", error);
      throw new Error("Error occurred creating projcet");
    }
  }
}
