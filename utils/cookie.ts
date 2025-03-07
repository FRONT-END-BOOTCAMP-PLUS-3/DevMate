"use server";
import { cookies } from "next/headers";

import type { DecodedInfo, DecodedToken } from "@/types/cookie";

import jwt from "jsonwebtoken";

// 쿠키 설정
export async function setCookie(key: string, value: string) {
  try {
    const cookieStore = await cookies();
    return cookieStore.set(key, value);
  } catch (error) {
    console.error("쿠키 설정 중 오류 발생:", error);
    throw new Error("쿠키 설정에 실패했습니다.");
  }
}

// 쿠키 가져오기
export async function getCookie(key: string) {
  try {
    const cookieStore = await cookies();
    return cookieStore.get(key)?.value;
  } catch (error) {
    console.error("쿠키 가져오기 중 오류 발생:", error);
    throw new Error("쿠키 가져오기에 실패했습니다.");
  }
}

// 토큰 디코딩 (쿠키에서 토큰 값을 가져와 디코딩)
export async function decodeToken(value?: DecodedInfo): Promise<DecodedToken | string | { error: string }> {
  try {
    const token = await getCookie("token");
    if (!token) {
      throw new Error("토큰이 필요합니다.");
    }
    const decoded = jwt.decode(token);
    if (!decoded || typeof decoded !== "object") {
      throw new Error("유효하지 않은 토큰입니다.");
    }
    return value ? decoded[value] : decoded;
  } catch (error) {
    console.error(error);
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("만료되었거나 유효하지 않은 토큰입니다.");
    } else {
      throw new Error("토큰을 디코딩하는 데 실패했습니다.");
    }
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
    console.error("쿠키 삭제 중 오류 발생:", error);
    throw new Error("쿠키 삭제에 실패했습니다.");
  }
}
