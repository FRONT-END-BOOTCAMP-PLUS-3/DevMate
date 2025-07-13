"use server";
import { cookies } from "next/headers";

import type { JwtPayload } from "jsonwebtoken";
import type { DecodedInfo, DecodedToken } from "@/types/cookie";

import jwt from "jsonwebtoken";

// 쿠키 설정
export async function setCookie(key: string, value: string) {
  try {
    const cookieStore = await cookies();
    return cookieStore.set(key, value);
  } catch (error) {
    console.log("쿠키 설정 중 오류 발생:", error);
    throw new Error("쿠키 설정에 실패했습니다.");
  }
}

// 쿠키 가져오기
export async function getCookie(key: string) {
  try {
    const cookieStore = await cookies();
    return cookieStore.get(key)?.value;
  } catch (error) {
    console.log("쿠키 가져오기 중 오류 발생:", error);
    throw new Error("쿠키 가져오기에 실패했습니다.");
  }
}

// 토큰 디코딩 (쿠키에서 토큰 값을 가져와 디코딩)
type DecodedToken = JwtPayload & {
  [key: string]: any;
};

type DecodedInfo = keyof DecodedToken;

export async function decodeToken(
  value?: DecodedInfo,
): Promise<DecodedToken[keyof DecodedToken] | DecodedToken | null> {
  try {
    const token = await getCookie("token");
    if (!token || typeof token !== "string") {
      return null; // ❗ 예외 대신 null 반환
    }

    const decoded = jwt.decode(token);
    if (!decoded || typeof decoded !== "object") {
      return null; // ❗ 예외 대신 null 반환
    }

    return value ? decoded[value] : decoded;
  } catch (error) {
    console.error("토큰 디코딩 실패:", error);
    return null; // ❗ 예외 대신 null 반환
  }
}

export async function getAuthStatus(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.has("token");
}
export async function removeAuthToken() {
  try {
    const cookieStore = await cookies();
    // 'token' 쿠키를 삭제
    cookieStore.delete("token");
  } catch (error) {
    console.log("쿠키 삭제 중 오류 발생:", error);
    throw new Error("쿠키 삭제에 실패했습니다.");
  }
}
