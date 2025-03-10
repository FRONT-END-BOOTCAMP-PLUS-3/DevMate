// app/api/users/delete/route.ts
import { NextResponse } from "next/server";

import { PsUserRepository } from "@/infrastructure/repositories/psUserRepository";

import { DeleteAccountUsecase } from "@/application/usecases/user/deleteAccountUsecase";

const userRepository = new PsUserRepository();
const deleteAccountUsecase = new DeleteAccountUsecase(userRepository);

// DELETE 요청 처리
export async function DELETE(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }
    await deleteAccountUsecase.execute(userId);

    return NextResponse.json({ message: "Account deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error in DELETE /users/delete:", error);

    return NextResponse.json({ message: "Account deletion failed" }, { status: 500 });
  }
}
