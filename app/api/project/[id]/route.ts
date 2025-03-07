import { NextResponse } from "next/server";

import { PsTagRepository } from "@/infrastructure/repositories/psTagRepository";
import { PsProjectRepository } from "@/infrastructure/repositories/psProjectRepository";
import { PsProjectTagRepository } from "@/infrastructure/repositories/psProjectTagRepository";

import type { ProjectRepository } from "@/domain/repositories/projectRepository";
import type { ProjectDetailDto } from "@/application/usecases/project/dtos/projectDetailDto";
import type { CreateProjectDto } from "@/application/usecases/project/dtos/createProjectDto";

import { UpdateProjectUsecase } from "@/application/usecases/project/updateProjectUsecase";
import { DeleteProjectUsecase } from "@/application/usecases/project/deleteProjectUsecase";
import { CreateProjectUsecase } from "@/application/usecases/project/createProjectUsecase";
import { GetProjectDetailUsecase } from "@/application/usecases/project/getProjectDetailUsecase";

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const projectRepository: ProjectRepository = new PsProjectRepository();
  const getProjectDetailUsecase: GetProjectDetailUsecase = new GetProjectDetailUsecase(projectRepository);

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

export async function POST(req: Request) {
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
    console.error("❌ 프로젝트 생성 오류:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const projectRepository: ProjectRepository = new PsProjectRepository();
    const updateProjectUsecase = new UpdateProjectUsecase(projectRepository);

    const projectId = parseInt(params.id, 10);
    if (isNaN(projectId)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
    }

    // 요청 바디에서 업데이트할 데이터 추출
    const { projectTitle, goal, projectPeriodStart, projectPeriodEnd, notice } = await req.json();

    // 필수 값 체크 (최소한 하나의 값은 있어야 함)
    if (
      projectTitle === undefined &&
      goal === undefined &&
      projectPeriodStart === undefined &&
      projectPeriodEnd === undefined &&
      notice === undefined
    ) {
      return NextResponse.json({ error: "At least one field must be provided for update" }, { status: 400 });
    }

    // 업데이트 실행
    const updatedProject = await updateProjectUsecase.execute(projectId, {
      projectTitle,
      goal,
      projectPeriodStart: projectPeriodStart ? new Date(projectPeriodStart) : undefined,
      projectPeriodEnd: projectPeriodEnd ? new Date(projectPeriodEnd) : undefined,
      notice,
    });

    if (!updatedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("❌ 프로젝트 업데이트 오류:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
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
    console.error("❌ 프로젝트 삭제 중 오류 발생:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
