import type { Project } from "@prisma/client";
import type { ProjectRepository } from "@/domain/repositories/projectRepository";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PsProjectRepository implements ProjectRepository {
  async findById(id: number): Promise<Project | null> {
    try {
      const projectData = await prisma.project.findUnique({
        where: { id: id },
        include: {
          leader: true, // 프로젝트 리더(User) 정보 포함
          applications: {
            include: {
              user: true, // 지원자의 User 정보 포함
            },
          },
          members: {
            include: {
              user: true, // 멤버의 User 정보 포함
            },
          },
          comments: true, // 프로젝트 관련 댓글 포함
          projectTags: {
            include: {
              tag: true, // 프로젝트 태그 포함
            },
          },
          likes: true, // 프로젝트 좋아요 포함
        },
      });

      if (!projectData) {
        console.log("⚠️ 프로젝트 없음!");
      } else {
        console.log("✅ 프로젝트 데이터 반환:", JSON.stringify(projectData, null, 2));
      }

      return projectData;
    } catch (error) {
      console.error("Error finding project by ID:", error);
      return null;
    }
  }

  async update(id: number, project: Partial<Omit<Project, "id" | "createdAt">>): Promise<Project> {
    try {
      const updateProject = await prisma.project.update({
        where: { id },
        data: project,
      });
      return updateProject;
    } catch (error) {
      console.error("Error updating project:", error);
      throw new Error("프로젝트 업데이트에 실패했습니다.");
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await prisma.project.delete({ where: { id } });
    } catch (error) {
      console.error("Error deleting project:", error);
      throw new Error("프로젝트 삭제에 실패했습니다.");
    }
  }
}
