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
          comments: {
            // 댓글 포함
            include: {
              user: true,
              replies: true, // 대댓글 포함
            },
          }, // 프로젝트 관련 댓글 포함
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

  async findProjectTitleById(id: number): Promise<string | null> {
    try {
      const project = await prisma.project.findUnique({
        where: { id },
        select: { projectTitle: true },
      });
      return project ? project.projectTitle : null;
    } catch (error) {
      console.error("Error finding project name by ID:", error);
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

  async incrementHits(id: number): Promise<void> {
    try {
      await prisma.project.update({
        where: { id },
        data: { hits: { increment: 1 } },
      });
    } catch (error) {
      console.error("Error incrementing hits:", error);
      throw new Error("조회수 증가에 실패했습니다.");
    }
  }

  async findByAll(
    status = "전체", // 모집 상태 (전체, 모집중, 모집완료)
    sort = "최신순", // 최신순, 조회순, 댓글많은순, 좋아요순
    search = "", // 프로젝트 제목 검색
    tags = [], // 태그 검색
  ): Promise<Project[]> {
    const where: any = {};
    const today = new Date();

    // 모집 상태 필터링
    if (status && status !== "전체") {
      if (status === "모집중") {
        where.recruitmentEnd = { gte: today }; // 모집 마감일이 오늘 이후
      } else if (status === "모집완료") {
        where.recruitmentEnd = { lt: today }; // 모집 마감일이 오늘 이전
      }
    }

    // 제목 검색
    if (search) {
      where.recruitmentTitle = { contains: search, mode: "insensitive" };
    }

    // 태그 검색
    if (tags && tags.length > 0) {
      where.techStackTags = { some: { name: { in: tags } } };
    }

    // 정렬 조건
    let orderBy = {};
    if (sort === "조회수순") {
      orderBy = { hits: "desc" };
    } else if (sort === "댓글많은순") {
      orderBy = {
        comments: {
          _count: "desc",
        },
      };
    } else if (sort === "좋아요순") {
      orderBy = {
        likes: {
          _count: "desc",
        },
      };
    } else {
      orderBy = { createdAt: "desc" };
    }

    return await prisma.project.findMany({
      where,
      orderBy,
      include: {
        leader: { select: { nickname: true } }, // 프로젝트 리더 정보 포함
        projectTags: {
          include: {
            tag: true, // 프로젝트 태그 포함
          },
        },
        _count: { select: { comments: true, likes: true } }, // 댓글 및 좋아요 개수 포함
      },
    });
  }
}
