import { NextResponse } from "next/server";

import { PsTagRepository } from "@/infrastructure/repositories/psTagRepository";
import { PsUserRepository } from "@/infrastructure/repositories/psUserRepository";
import { PsTechStackTagRepository } from "@/infrastructure/repositories/psTechStackTagRepository";

import type { NextRequest } from "next/server";
import type { SignUpDto } from "@/application/usecases/auth/signup/dtos/signupDto";

import { SignupUsecase } from "@/application/usecases/auth/signup/signupUsecase";

const userRepository = new PsUserRepository();
const tagRepository = new PsTagRepository();
const techStackTagRepository = new PsTechStackTagRepository();
const signupUsecase = new SignupUsecase(userRepository, tagRepository, techStackTagRepository);
export async function POST(req: NextRequest) {
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
      body.tagNames === undefined ||
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
    console.log("회원가입 요청 처리 중 에러:", error);
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}
