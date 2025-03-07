import { NextResponse } from "next/server";

import { PsProjectRepository } from "@/infrastructure/repositories/psProjectRepository";

import type { ProjectRepository } from "@/domain/repositories/projectRepository";
import type { ProjectDetailDto } from "@/application/usecases/project/dtos/projectDetailDto";

import { UpdateProjectUsecase } from "@/application/usecases/project/updateProjectUsecase";
import { DeleteProjectUsecase } from "@/application/usecases/project/deleteProjectUsecase";
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
