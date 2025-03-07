import { NextResponse } from "next/server";

import { PsProjectRepository } from "@/infrastructure/repositories/psProjectRepository";

import type { NextRequest } from "next/server";

import { GetProjectDetailUsecase } from "@/application/usecases/recruitment/getRecruitmentDetailUsecase";

// /recruitments/[id] -> GET 상세 반환
export async function GET(request: NextRequest) {
  try {
    // URL에서 ID 추출
    const id = request.nextUrl.pathname.split("/").pop() || "";

    // ID가 없는 경우 예외 처리
    if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const usecase = new GetProjectDetailUsecase(new PsProjectRepository());

    // 프로젝트 상세 정보 가져오기
    const projectDetail = await usecase.execute(Number(id));

    // 프로젝트가 없으면 404 반환
    if (!projectDetail) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // 프로젝트 정보 반환
    return NextResponse.json(projectDetail, { status: 200 });
  } catch (error) {
    console.error("Error fetching project detail:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
