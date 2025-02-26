import { NextResponse } from "next/server";

import { PsUserRepository } from "@/infrastructure/repositories/psUserRepository";

import type { UserSignUpDto } from "@/application/usecases/user/dtos/userPost";

import { UserAuthUsecase } from "@/application/usecases/user/userAuthUsecase";

// 🔹 UserAuthUsecase 초기화
const userRepository = new PsUserRepository();
const userAuthUsecase = new UserAuthUsecase(userRepository);

export async function POST(req: Request) {
  try {
    const body: Partial<UserSignUpDto> = await req.json();
    if (
      !body.name ||
      !body.email ||
      !body.password ||
      !body.nickname ||
      !body.gender ||
      !body.birthDate ||
      !body.position ||
      !body.address ||
      body.career === undefined
    ) {
      return NextResponse.json({ error: "필수 필드가 누락되었습니다." }, { status: 400 });
    }

    const profileImg = body.profileImg ?? "/defaultProfile.svg";

    const createdUser = await userAuthUsecase.createUser({
      ...body,
      profileImg,
    } as UserSignUpDto);

    return NextResponse.json({ message: "회원가입 성공", data: createdUser }, { status: 201 });
  } catch (error) {
    console.error("회원가입 요청 처리 중 에러:", error);
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}
