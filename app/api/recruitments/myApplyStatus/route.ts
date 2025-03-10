import { NextResponse } from "next/server";

import { PsApplyRepository } from "@/infrastructure/repositories/psApplyRepository";

import type { ApplyRepository } from "@/domain/repositories/applyRepository";
import type { MyApplyDto } from "@/application/usecases/recruitment/dtos/myApply/myApplyDto";

import { GetMyApplyStatusUsecase } from "@/application/usecases/recruitment/getMyApplyStatusUsecase";

export async function POST(req: Request) {
  try {
    const applyRepository: ApplyRepository = new PsApplyRepository();
    const getMyApplyStatusUsecase = new GetMyApplyStatusUsecase(applyRepository);

    const { userId } = await req.json();

    if (!userId || typeof userId !== "string") {
      return NextResponse.json({ error: "Invalid or missing userId" }, { status: 400 });
    }

    const myApplies: MyApplyDto[] = await getMyApplyStatusUsecase.execute(userId);

    return NextResponse.json(myApplies, { status: 200 });
  } catch (error) {
    console.error("Error fetching MyApplyStatus:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
