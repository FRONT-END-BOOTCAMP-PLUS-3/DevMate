"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginSeverAction(state: { message: string }, formData: FormData) {
  console.log(formData);
  // 폼 데이터에서 username과 password 추출
  const email = formData.get("email");
  const password = formData.get("password");

  console.log("로그인 시도:", { email, password });

  // 이메일 또는 비밀번호가 없는 경우 에러 메시지 반환
  if (!email || !password) {
    return { message: "아이디 또는 비밀번호가 일치하지 않습니다." };
  }

  // /api/login 엔드포인트에 POST 요청
  const res = await fetch(`${process.env.BASE_URL || ""}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    return { message: "아이디 또는 비밀번호가 일치하지 않습니다." };
  }

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
    secure: process.env.NODE_ENV === "development",
    path: "/",
    maxAge: 60 * 60 * 6, // 예: 1시간 동안 유효
  });

  // 쿠키에 returnUrl 이 있는지 확인
  const returnUrl = cookieStore.get("returnUrl")?.value;
  if (returnUrl) {
    cookieStore.delete("returnUrl"); // 로그인 성공 시에만 쿠키 삭제
  }
  // returnUrl이 있는 경우 디코딩 후 리다이렉트
  const redirectUrl = returnUrl ? decodeURIComponent(returnUrl) : "/recruitments";

  // 로그인 성공 시 메인 페이지로 리다이렉트
  redirect(redirectUrl);
}
