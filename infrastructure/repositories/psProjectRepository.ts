import { RecruitmentSort, RecruitmentStatus } from "@/constants/recruitmentTypes";

import type { Project } from "@prisma/client";
import type { ProjectRepository } from "@/domain/repositories/projectRepository";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PsProjectRepository implements ProjectRepository {
  async create(project: Omit<Project, "id" | "hits" | "createdAt" | "notice">): Promise<Project> {
    try {
      const createdProject = await prisma.project.create({
        data: project,
      });
      return createdProject;
    } catch (error) {
      console.error("Error creating project:", project);
      throw new Error("프로젝트 생성에 실패했습니다.");
    } finally {
      await prisma.$disconnect();
    }
  }

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
      }

      return projectData;
    } catch (error) {
      console.error("Error finding project by ID:", error);
      return null;
    } finally {
      await prisma.$disconnect();
    }
  }

  async findProjectTitleById(projectId: number, userId: string): Promise<string | null> {
    try {
      // 지원 내역 확인
      const existingApplication = await prisma.apply.findFirst({
        where: { projectId, userId },
      });

      if (existingApplication) {
        return "USER_ALREADY_APPLIED";
      }

      // 프로젝트 제목 가져오기
      const project = await prisma.project.findUnique({
        where: { id: projectId },
        select: { projectTitle: true },
      });

      return project ? project.projectTitle : null;
    } catch (error) {
      console.log("Error finding project name by ID:", error);
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
    } finally {
      await prisma.$disconnect();
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await prisma.project.delete({ where: { id } });
    } catch (error) {
      console.error("Error deleting project:", error);
      throw new Error("프로젝트 삭제에 실패했습니다.");
    } finally {
      await prisma.$disconnect();
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
    } finally {
      await prisma.$disconnect();
    }
  }

  async findByAll(
    status = "전체", // 모집 상태 (전체, 모집중, 모집완료)
    sort = "최신순", // 최신순, 조회순, 댓글많은순, 좋아요순
    search = "", // 프로젝트 제목 검색
    tags = [], // 태그 검색
  ): Promise<Project[]> {
    try {
      const where: any = {};
      const today = new Date();

      // 모집 상태 필터링
      if (status && status !== RecruitmentStatus.ALL) {
        if (status === RecruitmentStatus.RECRUITING) {
          where.recruitmentEnd = { gte: today }; // 모집 마감일이 오늘 이후
        } else if (status === RecruitmentStatus.CLOSED) {
          where.recruitmentEnd = { lt: today }; // 모집 마감일이 오늘 이전
        }
      }

      // 제목 검색
      if (search) {
        where.recruitmentTitle = { contains: search, mode: "insensitive" };
      }

      // 태그 검색
      if (tags && tags.length > 0) {
        where.projectTags = { some: { tag: { tagName: { in: tags } } } };
      }

      // 정렬 조건
      let orderBy = {};
      if (sort === RecruitmentSort.MOST_VIEWED) {
        orderBy = { hits: "desc" };
      } else if (sort === RecruitmentSort.MOST_COMMENTED) {
        orderBy = {
          comments: {
            _count: "desc",
          },
        };
      } else if (sort === RecruitmentSort.MOST_LIKED) {
        orderBy = {
          likes: {
            _count: "desc",
          },
        };
      } else {
        orderBy = { createdAt: "desc" };
      }

      const projects = await prisma.project.findMany({
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
      return projects.map((project) => ({
        ...project,
        leaderName: project.leader.nickname,
        commentCount: project._count.comments,
        likeCount: project._count.likes,
        projectTags: project.projectTags,
      }));
    } catch (error) {
      console.log("Error finding all projects:", error);
      return [];
    } finally {
      await prisma.$disconnect();
    }
  }

  async findByUserId(
    userId: string,
    status?: "ALL" | "RECRUITING" | "COMPLETED",
    filter?: "CREATE" | "LIKE" | "COMMENT" | "MEMBER",
  ): Promise<Project[]> {
    try {
      const where: any = {};

      if (status && status !== "ALL") {
        const today = new Date();
        if (status === "RECRUITING") {
          where.recruitmentEnd = { gte: today };
        } else if (status === "COMPLETED") {
          where.recruitmentEnd = { lt: today };
        }
      }

      if (filter) {
        if (filter === "CREATE") {
          where.leaderId = userId;
        } else if (filter === "LIKE") {
          where.likes = { some: { userId } };
        } else if (filter === "COMMENT") {
          where.comments = { some: { userId } };
        } else if (filter === "MEMBER") {
          where.members = { some: { userId } };
        }
      }

      const projects = await prisma.project.findMany({
        where,
        include: {
          leader: { select: { nickname: true } },
          projectTags: {
            include: {
              tag: true,
            },
          },
          _count: { select: { comments: true, likes: true } },
        },
      });

      return projects.map((project) => ({
        ...project,
        leaderName: project.leader.nickname,
        commentCount: project._count.comments,
        likeCount: project._count.likes,
        projectTags: project.projectTags,
      }));
    } catch (error) {
      console.log("Error finding projects by user ID:", error);
      return [];
    } finally {
      await prisma.$disconnect();
    }
  }
}
