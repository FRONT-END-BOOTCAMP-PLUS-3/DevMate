import { NextResponse } from "next/server";

import { PsUserRepository } from "@/infrastructure/repositories/psUserRepository";

import { UserAuthUsecase } from "@/application/usecases/user/userAuthUsecase";

const userRepository = new PsUserRepository();
const userAuthUsecase = new UserAuthUsecase(userRepository);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json(false, { status: 400 });

    const isDuplicated = await userAuthUsecase.findByEmail(email);
    return NextResponse.json(isDuplicated, { status: 200 });
  } catch (error) {
    console.error("서버 오류:", error);
    return NextResponse.json(false, { status: 500 });
  }
}
