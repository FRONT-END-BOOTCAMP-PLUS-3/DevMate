import { NextResponse } from "next/server";

import { PrMemberRepository } from "@/infrastructure/repositories/prisma/PrMemberRepository";
import { PrMemberRoleRepository } from "@/infrastructure/repositories/prisma/PrMemberRoleRepository";

import { LoginUsecase } from "@/application/usecases/auth/LoginUsecase";

export async function POST(request: Request) {
  try {
    // 요청 본문 데이터 추출
    const { username, password } = await request.json();

    // 유효성 검사
    if (!username || !password) {
      return NextResponse.json({ message: "아이디와 비밀번호를 입력해주세요." }, { status: 400 });
    }

    const usecase = new LoginUsecase(new PrMemberRepository(), new PrMemberRoleRepository());

    const token = await usecase.execute({ username, password });

    console.log("====로그인 성공 요청====");
    console.log("로그인 성공:", token);
    console.log("=======================");

    // 응답 반환
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ message: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
