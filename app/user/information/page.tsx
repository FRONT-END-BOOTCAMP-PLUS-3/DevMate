// 마이페이지 - 계정 정보
"use client";
import Image from "next/image";

import { useState } from "react";

import Button from "@/components/button/button";
import Selector from "@/components/selector/selector";
import InputField from "@/components/inputField/inputField";
import AddressSearch from "@/app/(anon)/signup/_components/addressSearch";

import styles from "./information.module.scss";

import { CAREER_EXP_OPTIONS, POSITION_OPTIONS, TECH_STACK_OPTIONS } from "@/constants/selectOptions";

import type { SelectOption } from "@/types";
import type { MultiValue, SingleValue } from "react-select";

import InfoUserRow from "./_components/infoUserRow";
import { useEditUserInfo } from "./_hooks/use-editUserInfo";

import { FaSearch } from "react-icons/fa";

export default function Page() {
  const {
    red,
    button__icon,
    container,
    container__title,
    container__separator,
    container__section,
    container__section__button,
    container__section__content,
    container__img,
    container__img__title,
  } = styles;
  const { state, dispatch } = useEditUserInfo();
  const [edit, setEdit] = useState<boolean>(false);
  const [isAddrSearchOpen, setIsAddrSearchOpen] = useState(false);
  const editClickHandler = () => setEdit(!edit);

  const selectChangeHandler = (
    selected: SingleValue<SelectOption> | MultiValue<SelectOption> | null,
    name?: string,
  ) => {
    if (name === "stack") {
      dispatch({ type: "SET_TECH_STACK", value: selected as MultiValue<SelectOption> });
    } else if (name === "position") {
      dispatch({ type: "SET_POSITION", value: selected as SingleValue<SelectOption> | null });
    } else if (name === "career") {
      dispatch({ type: "SET_CAREER", value: selected as SingleValue<SelectOption> | null });
    }
  };

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
          <InfoUserRow title="닉네임" edit={edit}>
            <InputField name="nickname" type="text" placeholder="닉네임" value={state.nickname} />
          </InfoUserRow>
          <InfoUserRow title="자기소개" edit={edit}>
            <InputField
              name="bio"
              type="text"
              placeholder="나만의 스킬, 깃허브 링크 등으로 소개글을 채워보세요."
              value={state.bio}
            />
          </InfoUserRow>
          <InfoUserRow title="경력유무" edit={edit}>
            <Selector
              name="career"
              placeholder="n 년"
              isMulti={false}
              options={CAREER_EXP_OPTIONS}
              selectedValue={state.career ?? []}
              onChange={(selected) => selectChangeHandler(selected, "career")}
            />
          </InfoUserRow>
          <InfoUserRow title="기술스택" edit={edit}>
            <Selector
              name="stack"
              placeholder="# 태그"
              isMulti={true}
              options={TECH_STACK_OPTIONS}
              selectedValue={state.stack ?? []}
              onChange={(selected) => selectChangeHandler(selected, "stack")}
            />
          </InfoUserRow>
          <InfoUserRow title="직무" edit={edit}>
            <Selector
              name="position"
              placeholder="직무"
              isMulti={false}
              options={POSITION_OPTIONS}
              selectedValue={state.position ?? []}
              onChange={(selected) => selectChangeHandler(selected, "position")}
            />
          </InfoUserRow>
          <InfoUserRow title="거주지" edit={edit}>
            <InputField
              placeholder="거주지"
              defaultValue={`${state.address.address} ${state.address.zonecode}`}
              readOnly
            />
            <Button
              variant="sub"
              size="small"
              className={button__icon}
              onClick={() => setIsAddrSearchOpen(!isAddrSearchOpen)}
            >
              <FaSearch style={{ marginRight: 0 }} color="gray" size={24} />
            </Button>
          </InfoUserRow>
        </div>
        <Button size="small" variant="main" className={container__section__button} onClick={editClickHandler}>
          {edit ? "저장" : "수정"}
        </Button>
      </section>
      <section className={container__section}>
        <div className={container__section__content}>
          <InfoUserRow title="이메일" isDefault />
          <InfoUserRow title="이름" isDefault />
          <InfoUserRow title="성별" isDefault />
          <InfoUserRow title="생일" isDefault />
        </div>
        <Button size="long" variant="sub" className={`${container__section__button} ${red}`}>
          게정탈퇴
        </Button>
      </section>
      {isAddrSearchOpen && (
        <AddressSearch
          onChange={(address) => dispatch({ type: "SET_ADDRESS", address })}
          handleComplete={() => setIsAddrSearchOpen(!isAddrSearchOpen)}
        />
      )}
    </div>
  );
}
