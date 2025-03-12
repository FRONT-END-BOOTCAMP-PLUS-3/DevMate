import { NextResponse } from "next/server";

import { PsApplyRepository } from "@/infrastructure/repositories/psApplyRepository";

import type { NextRequest } from "next/server";
import type { ApplyRepository } from "@/domain/repositories/applyRepository";
import type { MyApplyDto } from "@/application/usecases/recruitment/dtos/myApply/myApplyDto";

import { GetMyApplyStatusUsecase } from "@/application/usecases/recruitment/getMyApplyStatusUsecase";

export async function GET(req: NextRequest) {
  try {
    const applyRepository: ApplyRepository = new PsApplyRepository();
    const getMyApplyStatusUsecase = new GetMyApplyStatusUsecase(applyRepository);

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = authHeader.replace("Bearer ", "").trim();
    if (!userId) {
      return NextResponse.json({ error: "Invalid or missing userId" }, { status: 400 });
    }

    const myApplies: MyApplyDto[] = await getMyApplyStatusUsecase.execute(userId);

    return NextResponse.json(myApplies, { status: 200 });
  } catch (error) {
    console.log("Error fetching MyApplyStatus:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
