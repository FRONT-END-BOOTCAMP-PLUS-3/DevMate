import { NextResponse } from "next/server";

import { PsUserRepository } from "@/infrastructure/repositories/psUserRepository";

import type { SignUpDto } from "@/application/usecases/auth/signup/dtos/signupDto";

import { SignupUsecase } from "@/application/usecases/auth/signup/signupUsecase";

const userRepository = new PsUserRepository();
const signupUsecase = new SignupUsecase(userRepository);

export async function POST(req: Request) {
  try {
    const body: Partial<SignUpDto> = await req.json();
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
    const createdUser = await signupUsecase.execute({
      ...body,
      profileImg,
    } as SignUpDto);

    return NextResponse.json({ message: "회원가입 성공", data: createdUser }, { status: 201 });
  } catch (error) {
    console.error("회원가입 요청 처리 중 에러:", error);
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}
