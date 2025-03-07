import type { ProjectRepository } from "@/domain/repositories/projectRepository";
import type { PsTagRepository } from "@/infrastructure/repositories/psTagRepository";
import type { PsProjectTagRepository } from "@/infrastructure/repositories/psProjectTagRepository";

import type { ProjectDto } from "../dtos/projectDto";
import type { ProjectDetailDto } from "./dtos/projectDetailDto";
import type { UpdateProjectDto } from "./dtos/updateProjectDto";

export class UpdateProjectUsecase {
  constructor(
    private projectRepository: ProjectRepository,
    private tagRepository: PsTagRepository,
    private projectTagRepository: PsProjectTagRepository,
    // eslint-disable-next-line prettier/prettier
  ) { }

  async execute(id: number, updateData: UpdateProjectDto): Promise<ProjectDetailDto | null> {
    try {
      const projectData: ProjectDto | null = await this.projectRepository.findById(id);
      if (!projectData) {
        console.error(`❌ 프로젝트 ${id}를 찾을 수 없음`);
        return null;
      }

      const { projectTags, ...updateDataWithoutTags } = updateData;
      const updatedProject = await this.projectRepository.update(id, updateDataWithoutTags);
      console.log("✅ 프로젝트 업데이트 성공:", JSON.stringify(updatedProject, null, 2));

      console.log("전달된 projectTags:", projectTags); // 전달된 태그 로그 추가
      if (projectTags && projectTags.length > 0) {
        const newTagNames = projectTags;

        await this.tagRepository.addTags(newTagNames);

        const newTagIds = await this.tagRepository.getTagIds(newTagNames);

        await this.projectTagRepository.createMultiple(id, newTagIds);
        console.log(`✅ 프로젝트 ${id}에 새 태그 추가 완료:`, newTagNames);
      }

      return { ...updatedProject, projectTags: projectTags || [] };
    } catch (error) {
      console.error("❌ 프로젝트 업데이트 중 오류 발생:", error);
      return null;
    }
  }
}
