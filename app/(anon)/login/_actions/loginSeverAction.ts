"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginSeverAction(state: { message: string }, formData: FormData) {
  // 폼 데이터에서 username과 password 추출
  const username = formData.get("username");
  const password = formData.get("password");

  console.log("로그인 시도:", { username, password });

  // 필수 값이 누락된 경우 리다이렉트 (에러 처리)
  if (!username || !password) {
    // 1. 플랫폼 독립적인 서버사이드 방식으로 에러 처리
    // redirect('/login?error=missing')
    // 2. next.js 방식으로 서버사이드 에러 처리
    return { message: "아이디 또는 비밀번호가 일치하지 않습니다." };
  }

  // /api/login 엔드포인트에 POST 요청
  const res = await fetch(`${process.env.BASE_URL || ""}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  // 로그인 실패 시 리다이렉트 (에러 처리)
  if (!res.ok) {
    // 1. 플랫폼 독립적인 서버사이드 방식으로 에러 처리
    // redirect('/login?error=failed')
    // 2. next.js 방식으로 서버사이드 에러 처리
    return { message: "아이디 또는 비밀번호가 일치하지 않습니다." };
  }

  // /api/login 엔드포인트가 JWT 토큰을 JSON 형식({ token: string })으로 반환한다고 가정
  const { token } = await res.json();

  console.log("==== actions/login 로그인 성공 요청====");
  console.log("로그인 성공 token:", token);
  console.log("=====================================");

  // 쿠키 저장소를 가져온다. (await를 사용)
  const cookieStore = await cookies();

  // action 함수가 아닌 route에서 쿠키를 다루는 방법은 : https://nextjs.org/docs/pages/building-your-application/authentication#stateless-sessions
  cookieStore.set({
    name: "token",
    value: token,
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    path: "/",
    maxAge: 60 * 60, // 예: 1시간 동안 유효
  });

  // 쿠키에 returnUrl 이 있는지 확인
  const returnUrl = cookieStore.get("returnUrl")?.value;

  // returnUrl이 있는 경우 디코딩 후 리다이렉트
  const redirectUrl = returnUrl ? decodeURIComponent(returnUrl) : "/";

  // 로그인 성공 시 메인 페이지로 리다이렉트
  redirect(redirectUrl);
}
