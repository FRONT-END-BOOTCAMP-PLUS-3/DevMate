import { NextResponse } from "next/server";

import { PsProjectRepository } from "@/infrastructure/repositories/psProjectRepository";

import type { NextRequest } from "next/server";

import { GetRecruitmentsUsecase } from "@/application/usecases/recruitment/getRecruitmentsUsecase";

// /recruitments -> GET 리스트 반환
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = (searchParams.get("status") || "전체") as "전체" | "모집중" | "모집완료";
    const sort = (searchParams.get("sort") || "최신순") as "최신순" | "조회수순" | "댓글많은순" | "좋아요순";
    const search = (searchParams.get("search") || "") as string;
    const tags = (searchParams.get("tags") || []) as string[];

    const usecase = new GetRecruitmentsUsecase(new PsProjectRepository());

    // 프로젝트 상세 정보 가져오기
    const recruitments = await usecase.execute({ status, sort, search, tags });

    // 프로젝트가 없으면 404 반환
    if (!recruitments) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // 프로젝트 정보 반환
    return NextResponse.json(recruitments, { status: 200 });
  } catch (error) {
    console.error("Error fetching project detail:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
