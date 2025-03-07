// 마이페이지 - 계정 정보
"use client";
import Image from "next/image";

import { useState } from "react";

import Button from "@/components/button/button";
import InputField from "@/components/inputField/inputField";

import styles from "./information.module.scss";

export default function Page() {
  const {
    red,
    container,
    container__title,
    container__separator,
    container__section,
    container__section__button,
    container__section__content,
    container__img,
    container__img__title,
  } = styles;
  const [edit, setEdit] = useState<boolean>(false);
  const editClickHandler = () => setEdit(!edit);
  return (
    <div className={container}>
      <div className={container__title}>
        <h1>계정 정보</h1>
      </div>
      <div className={container__separator} />
      <section className={container__section}>
        <div className={container__section__content}>
          <div className={container__img}>
            <span className={container__img__title}>이미지</span>
            <Image src="/defaultProfile.svg" alt="유저 프로필" width={100} height={100} />
          </div>
          <UserInfoRow title="닉네임" edit={edit} />
          <UserInfoRow title="경력유무" edit={edit} />
          <UserInfoRow title="기술스택" edit={edit} />
          <UserInfoRow title="자기소개" edit={edit} />
          <UserInfoRow title="거주지" edit={edit} />
          <UserInfoRow title="직무" edit={edit} />
        </div>
        <Button size="small" variant="main" className={container__section__button} onClick={editClickHandler}>
          {edit ? "저장" : "수정"}
        </Button>
      </section>
      <section className={container__section}>
        <div className={container__section__content}>
          <UserInfoRow title="이메일" isDefault />
          <UserInfoRow title="이름" isDefault />
          <UserInfoRow title="성별" isDefault />
          <UserInfoRow title="생일" isDefault />
        </div>
        <Button size="long" variant="sub" className={`${container__section__button} ${red}`}>
          게정탈퇴
        </Button>
      </section>
    </div>
  );
}

interface InfoInputProps {
  title: string;
  isDefault?: boolean;
  edit?: boolean;
  info?: string;
}

function UserInfoRow({ title, isDefault = false, edit = false, info = "data" }: InfoInputProps) {
  const { userInfoRow, userInfoRow__title, userInfoRow__info } = styles;
  return (
    <div className={userInfoRow}>
      <span className={userInfoRow__title}>{title}</span>
      {isDefault ? (
        <span className={userInfoRow__info}>{info}</span>
      ) : edit ? (
        <InputField />
      ) : (
        <span className={userInfoRow__info}>{info}</span>
      )}
    </div>
  );
}
