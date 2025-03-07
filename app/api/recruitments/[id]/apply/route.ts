import { NextResponse } from "next/server";

import { PsProjectRepository } from "@/infrastructure/repositories/psProjectRepository";

import type { NextRequest } from "next/server";

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
