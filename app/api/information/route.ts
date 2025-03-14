import { NextResponse } from "next/server";

import { PsTagRepository } from "@/infrastructure/repositories/psTagRepository";
import { PsUserRepository } from "@/infrastructure/repositories/psUserRepository";
import { PsTechStackTagRepository } from "@/infrastructure/repositories/psTechStackTagRepository";

import type { NextRequest } from "next/server";

import { UserInfoUsecase } from "@/application/usecases/information/userInfoUsecase";
import { UpdateUserInfoUsecase } from "@/application/usecases/information/updateUserInfoUsecase";

const userRepository = new PsUserRepository();
const tagRepository = new PsTagRepository();
const techStackTagRepository = new PsTechStackTagRepository();
const userInfoUsecase = new UserInfoUsecase(userRepository, tagRepository);
const updateUserInfoUsecase = new UpdateUserInfoUsecase(userRepository, tagRepository, techStackTagRepository);

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ message: "userId is required" }, { status: 400 });
    }
    const userInfo = await userInfoUsecase.execute(String(userId));

    return NextResponse.json(userInfo, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "User not found or an error occurred." }, { status: 500 });
  }
}
export async function PATCH(req: NextRequest) {
  try {
    const { userId, ...userInfo } = await req.json(); // 요청 본문에서 userId와 업데이트할 정보 추출

    if (!userId) {
      return NextResponse.json({ error: "유효한 사용자 ID가 필요합니다." }, { status: 400 });
    }

    const updatedUser = await updateUserInfoUsecase.execute(String(userId), userInfo);
    return NextResponse.json(updatedUser, { status: 200 }); // 업데이트 성공 응답
  } catch (error) {
    console.log("사용자 정보 업데이트 중 오류 발생:", error);
    return NextResponse.json({ error: "사용자 정보를 업데이트할 수 없습니다." }, { status: 500 });
  }
}
