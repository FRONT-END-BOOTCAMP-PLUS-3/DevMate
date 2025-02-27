import { NextResponse } from "next/server";

import { PsUserRepository } from "@/infrastructure/repositories/psUserRepository";

import { UserAuthUsecase } from "@/application/usecases/user/userLoginUsecase";

const userRepository = new PsUserRepository();
const userAuthUsecase = new UserAuthUsecase(userRepository);

export async function POST(request: Request) {
  try {
    const { userId, password } = await request.json();

    if (!userId || !password) {
      return NextResponse.json({ message: "아이디와 비밀번호를 입력해주세요." }, { status: 400 });
    }

    const token = await userAuthUsecase.login(userId, password);

    console.log("====로그인 성공 요청====");
    console.log("로그인 성공:", token);
    console.log("=======================");

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ message: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
