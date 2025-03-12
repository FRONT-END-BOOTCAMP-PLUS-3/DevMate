"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { getAuthStatus } from "@/utils/cookie";
import { transformUserData } from "@/utils/transformData";

import styles from "./signup.module.scss";

import { signUp } from "./apis/signup";
import SignUpForm from "./_components/signupForm";
import { useSignup } from "./_hooks/use-signupReducer";
import { useSignupHandlers } from "./_hooks/use-signupHandlers";

import ClipLoader from "react-spinners/ClipLoader";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const { container, container__top, loading } = styles;
  const { state, dispatch } = useSignup();
  const { validateAndSubmit } = useSignupHandlers(state, dispatch);
  const router = useRouter(); // ✅ 페이지 이동을 위한 router 사용

  const submitSignUp = async () => {
    if (!validateAndSubmit()) return;

    try {
      const transformedData = transformUserData(state);
      console.log("전송할 데이터:", transformedData);
      const responseData = await signUp(transformedData);

      console.log("회원가입 성공:", responseData);

      alert("회원가입이 완료되었습니다 로그인을 해주세요!");
      setTimeout(() => {
        router.push("/login");
      }, 500);
    } catch (error) {
      if (error instanceof Error) {
        console.error("회원가입 실패:", error);
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      } else {
        console.error("알 수 없는 오류:", error);
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLogin = await getAuthStatus();
      if (isLogin) {
        setIsLoading(true);
        router.push("/recruitments");
      }
    };
    checkLoginStatus();
  }, [router]);
  if (isLoading) {
    return (
      <div className={loading}>
        <ClipLoader color="#868e96" loading={isLoading} size={100} aria-label="Loading Spinner" />
      </div>
    );
  }
  return (
    <div className={container}>
      <div className={container__top}>
        <Image src="/logoPurple.svg" width={66} height={66} alt="회원가입 로고" />
        <h1>회원가입</h1>
      </div>
      <SignUpForm state={state} dispatch={dispatch} onSubmit={submitSignUp} />
    </div>
  );
}
