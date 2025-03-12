"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useActionState, useEffect, useState } from "react";

import Button from "@/components/button/button";
import InputField from "@/components/inputField/inputField";

import { getAuthStatus } from "@/utils/cookie";

import styles from "./login.module.scss";

import { loginSeverAction } from "./_actions/loginSeverAction";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SiKakaotalk } from "react-icons/si";
import ClipLoader from "react-spinners/ClipLoader";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const initialState = {
  message: "",
};
export default function Login() {
  const {
    container,
    container__links,
    container__social,
    container__social__icon,
    container__social__text,
    error,
    loading,
  } = styles;
  const [state, formAction, pending] = useActionState(loginSeverAction, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
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
      <Link href="/">
        <Image src="/logoPurple.svg" alt="Login-logo" width={66} height={66} />
      </Link>

      <form action={formAction}>
        <InputField type="email" name="email" label="이메일" placeholder="이메일" />
        <InputField
          type={showPassword ? "text" : "password"}
          name="password"
          label="비밀번호"
          placeholder="비밀번호"
          icon={showPassword ? FaRegEye : FaRegEyeSlash}
          onIconClick={() => setShowPassword((prev) => !prev)}
          iconSize={showPassword ? 18 : 20}
        />
        {state.message && (
          <div className={error}>아이디 또는 비밀번호가 잘못 되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요.</div>
        )}

        <Button type="submit" size="long" disabled={pending}>
          로그인
        </Button>

        <div className={container__links}>
          {/* <Link href="/login/find/password">비밀번호 찾기</Link>|<Link href="/signup">회원가입</Link>| */}
          {/* <Link href="/login/find/id">아이디 찾기</Link> */}
          <Link href="/signup">회원가입</Link>
        </div>
      </form>
      <div className={container__social}>
        <div className={container__social__text}>
          <hr />
          <span>소셜 로그인</span>
          <hr />
        </div>
        <div className={container__social__icon}>
          <div>
            <SiKakaotalk size={36} />
          </div>
          <div>
            <FcGoogle size={36} />
          </div>
          <div>
            <FaGithub size={36} />
          </div>
        </div>
      </div>
    </div>
  );
}
