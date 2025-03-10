import { NextResponse } from "next/server";

import { PsCommentRepository } from "@/infrastructure/repositories/psCommentRepository";

import type { NextRequest } from "next/server";

import { CreateCommentUseCase } from "@/application/usecases/recruitment/createCommentUsecase";
import { DeleteCommentUseCase } from "@/application/usecases/recruitment/deleteCommentUseCase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, projectId, content, parentCommentId } = body;

    if (!userId || !projectId || !content) {
      return NextResponse.json({ message: "필수 정보가 누락되었습니다." }, { status: 400 });
    }

    const psCommentRepository = new PsCommentRepository();
    const createCommentUseCase = new CreateCommentUseCase(psCommentRepository);
    const comment = await createCommentUseCase.execute(userId, projectId, content, parentCommentId);

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "댓글 생성에 실패했습니다." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "댓글 ID가 필요합니다." }, { status: 400 });
    }

    const psCommentRepository = new PsCommentRepository();
    const deleteCommentUseCase = new DeleteCommentUseCase(psCommentRepository);

    await deleteCommentUseCase.execute(Number(id));

    return NextResponse.json({ message: "댓글이 삭제되었습니다." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "댓글 삭제에 실패했습니다." }, { status: 500 });
  }
}
