import { NextResponse } from "next/server";

import { PsProjectRepository } from "@/infrastructure/repositories/psProjectRepository";

import type { NextRequest } from "next/server";

import { GetMyProjectsUsecase } from "@/application/usecases/project/getMyProjectsUsecase";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const userId = searchParams.get("userId");
    const status = (searchParams.get("status") as "ALL" | "RECRUITING" | "COMPLETED") || "ALL";
    const filter = (searchParams.get("filter") as "CREATE" | "LIKE" | "COMMENT" | "MEMBER") || "CREATE";

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const projectRepository = new PsProjectRepository();
    const getMyProjectsUsecase = new GetMyProjectsUsecase(projectRepository);
    const projects = await getMyProjectsUsecase.execute({ userId, status, filter });

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.log("Error fetching projects:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
