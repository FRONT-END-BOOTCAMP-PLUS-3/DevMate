import { NextResponse } from "next/server";

import { PsUserRepository } from "@/infrastructure/repositories/psUserRepository";

import type { NextRequest } from "next/server";

import { GetUserIdUsecase } from "@/application/usecases/user/getUserIdUsecase";
import { DeleteAccountUsecase } from "@/application/usecases/user/deleteAccountUsecase";

const userRepository = new PsUserRepository();
const deleteAccountUsecase = new DeleteAccountUsecase(userRepository);
const getUserIdUsecase = new GetUserIdUsecase(userRepository);

// GET 요청: userId로 사용자 조회
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: userId } = await params;

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    const user = await getUserIdUsecase.execute(userId);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error in GET /user/[id]:", error);
    return NextResponse.json({ message: "User retrieval failed" }, { status: 500 });
  }
}

// DELETE 요청: userId로 계정 삭제
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: userId } = await params;

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    await deleteAccountUsecase.execute(userId);
    return NextResponse.json({ message: "Account deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error in DELETE /user/[id]:", error);
    return NextResponse.json({ message: "Account deletion failed" }, { status: 500 });
  }
}
