import { NextResponse } from "next/server";

import { PsUserRepository } from "@/infrastructure/repositories/psUserRepository";
import { PsApplyRepository } from "@/infrastructure/repositories/psApplyRepository";
import { PsProjectRepository } from "@/infrastructure/repositories/psProjectRepository";

import type { UserRepository } from "@/domain/repositories/userRepository";
import type { ApplyRepository } from "@/domain/repositories/applyRepository";
import type { ProjectRepository } from "@/domain/repositories/projectRepository";
import type { ProjectDetailDto } from "@/application/usecases/project/dtos/projectDetailDto";
import type { ProjectDetailApplyDto } from "@/application/usecases/project/dtos/projectDetailApplyDto";

import { RejectApplicantUsecase } from "@/application/usecases/project/rejectApplicantUsecase";
import { GetProjectDetailUsecase } from "@/application/usecases/project/getProjectDetailUsecase";

export async function GET(req: Request, { params }: { params: { id: number } }) {
  const projectRepository: ProjectRepository = new PsProjectRepository();
  const getProjectDetailUsecase: GetProjectDetailUsecase = new GetProjectDetailUsecase(projectRepository);

  const projectId = params.id;
  if (isNaN(projectId)) {
    return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
  }

  const projectDetailDto: ProjectDetailDto | null = await getProjectDetailUsecase.execute(1);
  if (!projectDetailDto) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(projectDetailDto);
}

export async function PATCH(req: Request, { params }: { params: { id: number } }) {
  const applyRepository: ApplyRepository = new PsApplyRepository();
  const userRepository: UserRepository = new PsUserRepository();
  const rejectApplicantUsecase: RejectApplicantUsecase = new RejectApplicantUsecase(applyRepository, userRepository);

  const applyId = params.id;
  if (isNaN(applyId)) {
    return NextResponse.json({ error: "Invalid Apply Id" }, { status: 400 });
  }

  const projectDetailApplyDto: ProjectDetailApplyDto | null = await rejectApplicantUsecase.execute(applyId);
  if (!projectDetailApplyDto) {
    return NextResponse.json({ error: "Apply not found" }, { status: 404 });
  }

  return NextResponse.json(projectDetailApplyDto);
}
