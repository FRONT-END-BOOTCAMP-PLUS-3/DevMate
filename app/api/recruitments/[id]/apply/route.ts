import { NextResponse } from "next/server";

import { PsApplyRepository } from "@/infrastructure/repositories/psApplyRepository";
import { PsProjectRepository } from "@/infrastructure/repositories/psProjectRepository";

import type { NextRequest } from "next/server";

import { CreateApplyUsecase } from "@/application/usecases/recruitment/createApplyUsecase";
import { GetProjectTitleUsecase } from "@/application/usecases/recruitment/getProjectTitleUsecase";

// /recruitments/[id]/apply -> GET 프로젝트 제목 반환
export async function GET(request: NextRequest) {
  try {
    // URL에서 ID 추출
    const match = request.nextUrl.pathname.match(/\/recruitments\/(\d+)\/apply/);
    const id = match ? Number(match[1]) : null;

    if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const usecase = new GetProjectTitleUsecase(new PsProjectRepository());

    // 프로젝트 제목 가져오기
    const projectTitle = await usecase.execute(id);

    if (!projectTitle) {
      return NextResponse.json({ error: "Project title not found" }, { status: 404 });
    }

    return NextResponse.json({ title: projectTitle }, { status: 200 });
  } catch (error) {
    console.error("Error fetching project title:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// /recruitments/[id]/apply -> POST 지원서 저장
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const projectId = Number(formData.get("projectId"));
    const userId = formData.get("userId") as string;
    const position = formData.get("position") as string;
    const introduction = formData.get("introduction") as string;
    const portfolioFile = formData.get("portfolio") as File | null;

    if (!projectId || !userId || !position || !introduction) {
      return NextResponse.json({ error: "필수 항목이 누락되었습니다." }, { status: 400 });
    }

    const usecase = new CreateApplyUsecase(new PsApplyRepository());
    const apply = await usecase.execute({ projectId, userId, position, introduction, portfolioFile });

    return NextResponse.json({ message: "지원 완료!", apply }, { status: 201 });
  } catch (error) {
    console.error("Error applying:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
