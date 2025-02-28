import { NextResponse } from "next/server";

import { PsProjectRepository } from "@/infrastructure/repositories/psProjectRepository";

import type { ProjectRepository } from "@/domain/repositories/projectRepository";

import { UpdateNoticeUsecase } from "@/application/usecases/project/updateNoticeUsecase";

export async function PATCH(req: Request, { params }: { params: { id: number } }) {
  const projectRepository: ProjectRepository = new PsProjectRepository();
  const updateNoticeUsecase = new UpdateNoticeUsecase(projectRepository);

  // 요청 바디에서 notice 값을 추출
  const { notice } = await req.json();

  if (!notice || typeof notice !== "string") {
    return NextResponse.json({ error: "Invalid or missing 'notice' value" }, { status: 400 });
  }

  const projectId = params.id;
  if (isNaN(projectId)) {
    return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
  }

  // 프로젝트 notice 업데이트 실행
  const updatedProject = await updateNoticeUsecase.execute(projectId, notice);
  if (!updatedProject) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(updatedProject);
}
