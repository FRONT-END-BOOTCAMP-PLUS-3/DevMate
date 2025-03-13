import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const jwtToken = req.cookies.get("token")?.value;

  //1. 인증 토큰이 없으면 로그인 페이지로 리다이렉트
  if (!jwtToken) {
    console.log("Token not found");

    const returnUrl = req.nextUrl.pathname; // 현재 URL 저장
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.set("returnUrl", returnUrl);

    return response;
  }

  // 2. 토큰 디코딩 및 유효성 확인"
  try {
    // 토큰 디코딩 시도
    JSON.parse(Buffer.from(jwtToken.split(".")[1], "base64").toString());
  } catch (error) {
    console.log("Invalid token:", error);

    const returnUrl = req.nextUrl.pathname;
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.set("returnUrl", returnUrl);

    return response;
  }

  // 3. 인증 확인 완료, 요청 계속 진행"
  const response = NextResponse.next();
  response.cookies.set("token", jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 6,
  });

  return response;
}

export const config = {
  matcher: ["/user/:path*"], //matcher는 미들웨어가 적용될 경로 패턴
};
