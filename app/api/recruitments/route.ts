import { NextResponse } from "next/server";

import { PsProjectRepository } from "@/infrastructure/repositories/psProjectRepository";

import type { NextRequest } from "next/server";
import type { RecruitmentSort, RecruitmentStatus } from "@/constants/recruitmentTypes";

import { GetRecruitmentsUsecase } from "@/application/usecases/recruitment/getRecruitmentsUsecase";

// /recruitments -> GET 리스트 반환
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const status = decodeURIComponent(searchParams.get("status") || "전체") as RecruitmentStatus;
    const sort = decodeURIComponent(searchParams.get("sort") || "최신순") as RecruitmentSort;
    const search = decodeURIComponent(searchParams.get("search") || "") as string;
    const tagsString = decodeURIComponent(searchParams.get("tags") || "");
    const tags = tagsString ? tagsString.split(",") : [];

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
    console.log("Error fetching project detail:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
