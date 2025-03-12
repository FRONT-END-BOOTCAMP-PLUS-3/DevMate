import { NextResponse } from "next/server";

import { PsLikeRepository } from "@/infrastructure/repositories/psLikeRepository";

import type { NextRequest } from "next/server";

import { CreateToggleLikeUsecase } from "@/application/usecases/recruitment/createToggleLikeUsecase";
export async function POST(req: NextRequest) {
  try {
    const { userId, projectId } = await req.json();

    if (!userId || !projectId) {
      return NextResponse.json({ message: "userId and projectId are required" }, { status: 400 });
    }

    const likeRepository = new PsLikeRepository();
    const toggleLikeUsecase = new CreateToggleLikeUsecase(likeRepository);

    const result = await toggleLikeUsecase.execute(userId, Number(projectId));
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error toggling like:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId, projectId } = await req.json();

    if (!userId || !projectId) {
      return NextResponse.json({ message: "userId and projectId are required" }, { status: 400 });
    }

    const likeRepository = new PsLikeRepository();
    const toggleLikeUsecase = new CreateToggleLikeUsecase(likeRepository);

    const result = await toggleLikeUsecase.execute(userId, Number(projectId));

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error removing like:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
