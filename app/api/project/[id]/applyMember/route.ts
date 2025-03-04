import { NextResponse } from "next/server";

import { PsUserRepository } from "@/infrastructure/repositories/psUserRepository";
import { PsApplyRepository } from "@/infrastructure/repositories/psApplyRepository";
import { PsMemberRepository } from "@/infrastructure/repositories/psMemberRepository";

import type { UserRepository } from "@/domain/repositories/userRepository";
import type { ApplyRepository } from "@/domain/repositories/applyRepository";
import type { ProjectDetailApplyDto } from "@/application/usecases/project/dtos/projectDetailApplyDto";
import type { ProjectDetailMemberDto } from "@/application/usecases/project/dtos/projectDetailMemberDto";

import { CreateMemberUsecase } from "@/application/usecases/project/createMemberUsecase";
import { RejectApplicantUsecase } from "@/application/usecases/project/rejectApplicantUsecase";

export async function POST(req: Request) {
  try {
    const { applyId } = await req.json();

    if (!applyId || typeof applyId !== "number") {
      return NextResponse.json({ error: "Invalid or missing applyId" }, { status: 400 });
    }

    const memberRepository = new PsMemberRepository();
    const applyRepository = new PsApplyRepository();
    const createMemberUsecase = new CreateMemberUsecase(applyRepository, memberRepository);

    const projectDetailMemberDto: ProjectDetailMemberDto | null = await createMemberUsecase.execute(applyId);
    if (!projectDetailMemberDto) {
      return NextResponse.json({ error: "Failed to create member" }, { status: 400 });
    }

    return NextResponse.json(projectDetailMemberDto);
  } catch (error) {
    console.error("❌ Error creating member:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const applyRepository: ApplyRepository = new PsApplyRepository();
  const userRepository: UserRepository = new PsUserRepository();
  const rejectApplicantUsecase: RejectApplicantUsecase = new RejectApplicantUsecase(applyRepository, userRepository);

  const applyId = parseInt(params.id, 10);
  if (isNaN(applyId)) {
    return NextResponse.json({ error: "Invalid Apply Id" }, { status: 400 });
  }

  const projectDetailApplyDto: ProjectDetailApplyDto | null = await rejectApplicantUsecase.execute(applyId);
  if (!projectDetailApplyDto) {
    return NextResponse.json({ error: "Apply not found" }, { status: 404 });
  }

  return NextResponse.json(projectDetailApplyDto);
}
