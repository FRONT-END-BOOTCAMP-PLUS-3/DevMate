import { NextResponse } from "next/server";

import { PsTagRepository } from "@/infrastructure/repositories/psTagRepository";
import { PsProjectRepository } from "@/infrastructure/repositories/psProjectRepository";
import { PsProjectTagRepository } from "@/infrastructure/repositories/psProjectTagRepository";

import type { NextRequest } from "next/server";
import type { TagRepository } from "@/domain/repositories/tagRepository";
import type { ProjectRepository } from "@/domain/repositories/projectRepository";
import type { ProjectTagRepository } from "@/domain/repositories/projectTagRepository";
import type { ProjectDetailDto } from "@/application/usecases/project/dtos/projectDetailDto";
import type { CreateProjectDto } from "@/application/usecases/project/dtos/createProjectDto";

import { UpdateProjectUsecase } from "@/application/usecases/project/updateProjectUsecase";
import { DeleteProjectUsecase } from "@/application/usecases/project/deleteProjectUsecase";
import { CreateProjectUsecase } from "@/application/usecases/project/createProjectUsecase";
import { GetProjectDetailUsecase } from "@/application/usecases/project/getProjectDetailUsecase";

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const projectRepository: ProjectRepository = new PsProjectRepository();
  const tagRepository: TagRepository = new PsTagRepository();
  const projectTagRepository: ProjectTagRepository = new PsProjectTagRepository();
  const getProjectDetailUsecase: GetProjectDetailUsecase = new GetProjectDetailUsecase(
    projectRepository,
    tagRepository,
    projectTagRepository,
  );

  const projectId = parseInt(params.id, 10);
  if (isNaN(projectId)) {
    return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
  }

  const projectDetailDto: ProjectDetailDto | null = await getProjectDetailUsecase.execute(projectId);
  if (!projectDetailDto) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(projectDetailDto);
}

export async function POST(req: NextRequest) {
  try {
    const projectRepository: ProjectRepository = new PsProjectRepository();
    const tagRepository = new PsTagRepository();
    const projectTagRepository = new PsProjectTagRepository();
    const createProjectUsecase = new CreateProjectUsecase(projectRepository, tagRepository, projectTagRepository);

    const body: CreateProjectDto = await req.json();
    if (
      !body.leaderId ||
      !body.recruitmentTitle ||
      !body.projectTitle ||
      !body.goal ||
      !body.description ||
      !body.projectPeriodStart ||
      !body.projectPeriodEnd ||
      !body.recruitmentStart ||
      !body.recruitmentEnd
    ) {
      return NextResponse.json({ error: "필수 필드가 누락되었습니다." }, { status: 400 });
    }
    const createdProject = await createProjectUsecase.execute(body);

    return NextResponse.json({ message: "프로젝트 생성 성공", data: createdProject }, { status: 201 });
  } catch (error) {
    console.log("❌ 프로젝트 생성 오류:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const projectRepository: ProjectRepository = new PsProjectRepository();
    const tagRepository: TagRepository = new PsTagRepository();
    const projectTagRepository: ProjectTagRepository = new PsProjectTagRepository();
    const updateProjectUsecase = new UpdateProjectUsecase(projectRepository, tagRepository, projectTagRepository);

    const projectId = parseInt(params.id, 10);
    if (isNaN(projectId)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
    }

    // 요청 바디에서 업데이트할 데이터 추출
    const {
      recruitmentTitle,
      projectTitle,
      goal,
      description,
      projectPeriodStart,
      projectPeriodEnd,
      recruitmentStart,
      recruitmentEnd,
      notice,
      projectTags,
    } = await req.json();

    // 필수 값 체크
    if (
      recruitmentTitle === undefined &&
      projectTitle === undefined &&
      goal === undefined &&
      description === undefined &&
      projectPeriodStart === undefined &&
      projectPeriodEnd === undefined &&
      recruitmentStart === undefined &&
      recruitmentEnd === undefined &&
      notice === undefined
    ) {
      return NextResponse.json({ error: "At least one field must be provided for update" }, { status: 400 });
    }

    // 업데이트 실행
    const updatedProject = await updateProjectUsecase.execute(projectId, {
      recruitmentTitle,
      projectTitle,
      goal,
      description,
      projectPeriodStart: projectPeriodStart ? new Date(projectPeriodStart) : undefined,
      projectPeriodEnd: projectPeriodEnd ? new Date(projectPeriodEnd) : undefined,
      recruitmentStart: recruitmentStart ? new Date(recruitmentStart) : undefined,
      recruitmentEnd: recruitmentEnd ? new Date(recruitmentEnd) : undefined,
      notice,
      projectTags,
    });

    if (!updatedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.log("❌ 프로젝트 업데이트 오류:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const projectRepository: ProjectRepository = new PsProjectRepository();
    const deleteProjectUsecase = new DeleteProjectUsecase(projectRepository);

    // 🔹 projectId를 숫자로 변환
    const projectId = parseInt(params.id, 10);
    if (isNaN(projectId)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
    }

    // 🔹 프로젝트 삭제 실행
    await deleteProjectUsecase.execute(projectId);

    return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
  } catch (error) {
    console.log("❌ 프로젝트 삭제 중 오류 발생:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
