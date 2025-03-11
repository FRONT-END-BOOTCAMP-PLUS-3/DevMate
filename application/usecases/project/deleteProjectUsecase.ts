import type { ProjectRepository } from "@/domain/repositories/projectRepository";

export class DeleteProjectUsecase {
  // eslint-disable-next-line prettier/prettier
  constructor(private projectRepository: ProjectRepository) { }

  async execute(id: number): Promise<void> {
    try {
      const projectData = await this.projectRepository.findById(id);
      if (!projectData) {
        throw new Error("해당 프로젝트를 찾을 수 없습니다.");
      }

      await this.projectRepository.delete(id);
    } catch (error) {
      console.error(`프로젝트 삭제 중 오류 발생 (ID: ${id}):`, error);
    }
  }
}
