import Link from "next/link";
import Image from "next/image";

import { useActionState } from "react";

import Button from "@/components/button/button";
import InputField from "@/components/inputField/InputField";

import styles from "./login.module.scss";

import { loginSeverAction } from "./_actions/loginSeverAction";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SiKakaotalk } from "react-icons/si";
const initialState = {
  message: "",
};
export default function Login() {
  const { container, container__links, container__social, container__social__icon, container__social__text } = styles;
  const [state, formAction, pending] = useActionState(loginSeverAction, initialState);

  return (
    <div className={container}>
      <Link href="/">
        <Image src="/logoPurple.svg" alt="Login-logo" width={66} height={66} />
      </Link>

      <form action="" method="POST">
        <InputField label="이메일" type="text" placeholder="이메일" />
        <InputField label="비밀번호" type="password" placeholder="비밀번호" />
        <Button type="submit" size="long">
          로그인
        </Button>
        <div className={container__links}>
          <Link href="/login/find/password">비밀번호 찾기</Link>|<Link href="/signup">회원가입</Link>|
          <Link href="/login/find/id">아이디 찾기</Link>
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
