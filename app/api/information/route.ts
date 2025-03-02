import { NextResponse } from "next/server";

import { PsUserRepository } from "@/infrastructure/repositories/psUserRepository";

import { GetUserInfoUsecase } from "@/application/usecases/information/getUserInfoUsecase";

export async function POST(request: Request) {
  const userRepository = new PsUserRepository();
  const getUserInfoUsecase = new GetUserInfoUsecase(userRepository);

  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ message: "userId is required" }, { status: 400 });
    }
    const userInfo = await getUserInfoUsecase.execute(String(userId));

    return NextResponse.json(userInfo, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "User not found or an error occurred." }, { status: 500 });
  }
}
