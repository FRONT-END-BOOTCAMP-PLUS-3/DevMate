"use client";
import Image from "next/image";

import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";

import Button from "@/components/button/button";
import Selector from "@/components/selector/selector";
import InputField from "@/components/inputField/inputField";
import AddressSearch from "@/app/(anon)/signup/_components/addressSearch";

import { decodeToken } from "@/utils/cookie";
import { transformUserInfo } from "@/utils/transformData";

import styles from "./information.module.scss";

import { CAREER_EXP_OPTIONS, POSITION_OPTIONS, TECH_STACK_OPTIONS } from "@/constants/selectOptions";

import type { SelectOption } from "@/types";
import type { MultiValue, SingleValue } from "react-select";
import type {
  InfoUserDto,
  UserEditInfoDto,
  UserNonEditInfoDto,
} from "@/application/usecases/information/dtos/infoUserDto";

import InfoUserRow from "./_components/infoUserRow";
import { useEditUserInfo } from "./_hooks/use-editUserInfo";
import { DeleteAccountModal } from "./_components/deleteAccountModal";

import { FaSearch } from "react-icons/fa";

export default function Information() {
  const {
    red,
    last,
    button__icon,
    container,
    container__title,
    container__separator,
    container__section,
    container__section__button,
    container__section__content,
    container__img,
    container__img__box,
    container__img__title,
    container__img__input,
    container__img__label,
  } = styles;
  const { state, dispatch } = useEditUserInfo();
  const [userId, setUserId] = useState<string>();
  const [userBasicInfo, setUserBasicInfo] = useState<UserNonEditInfoDto>();
  const [userDetailInfo, setUserDetailInfo] = useState<UserEditInfoDto>();
  const [edit, setEdit] = useState<boolean>(false);
  const [isAddrSearchOpen, setIsAddrSearchOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImgFile, setProfileImgFile] = useState<File | null>(null); // 프로필 이미지 파일 상태 추가

  const handleProfileImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImgFile(file); // 파일 상태 업데이트
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch({ type: "SET_PROFILE_IMG", payload: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const selectChangeHandler = (
    selected: SingleValue<SelectOption> | MultiValue<SelectOption> | null,
    name?: string,
  ) => {
    if (name === "techStackTags") {
      dispatch({ type: "SET_TECH_STACK", value: selected as MultiValue<SelectOption> });
    } else if (name === "position") {
      dispatch({ type: "SET_POSITION", value: selected as SingleValue<SelectOption> | null });
    } else if (name === "career") {
      dispatch({ type: "SET_CAREER", value: selected as SingleValue<SelectOption> | null });
    }
  };
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "SET_INPUT",
      name: e.target.name as keyof typeof state,
      value: e.target.value,
    });
  };
  const editClickHandler = async () => {
    if (!state) {
      console.error("유저 정보가 없습니다.");
    }
    const userDetailInfoApiData = transformUserInfo(state);
    try {
      if (!userId) {
        throw new Error("사용자 ID를 가져올 수 없습니다.");
      }

      const response = await fetch("/api/information", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, ...userDetailInfoApiData }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user information.");
      }
      setEdit((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchUserId = async () => {
      const id = await decodeToken("id");
      setUserId(id as string);
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    const getTokenAndUserInfo = async () => {
      try {
        if (!userId) {
          throw new Error("사용자 ID를 가져올 수 없습니다.");
        }
        const response = await fetch("/api/information", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user information.");
        }
        const data: InfoUserDto = await response.json();
        setUserBasicInfo(data.nonEditInfo);
        setUserDetailInfo(data.editInfo);
      } catch (error) {
        console.error(error);
      }
    };
    if (userId) {
      getTokenAndUserInfo();
    }
  }, [edit, userId]);

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
            {edit ? (
              <div className={container__img__box}>
                <Image
                  src={
                    profileImgFile
                      ? URL.createObjectURL(profileImgFile)
                      : state.profileImg
                        ? state.profileImg
                        : "/defaultProfile.svg"
                  }
                  alt="프로필 이미지 미리보기"
                  width={100}
                  height={100}
                  style={{
                    objectFit: "cover",
                    minWidth: "100px",
                    minHeight: "100px",
                    borderRadius: "50%",
                  }}
                />
                <input
                  type="file"
                  id="profileImg"
                  accept="image/*"
                  onChange={handleProfileImgChange}
                  className={container__img__input}
                />
                <label htmlFor="profileImg" className={container__img__label}>
                  변경
                </label>
              </div>
            ) : (
              <Image
                src={
                  profileImgFile
                    ? URL.createObjectURL(profileImgFile)
                    : state.profileImg
                      ? state.profileImg
                      : "/defaultProfile.svg"
                }
                alt="유저 프로필"
                width={100}
                height={100}
                style={{
                  objectFit: "cover",
                  minWidth: "100px",
                  minHeight: "100px",
                  borderRadius: "50%",
                }}
              />
            )}
          </div>
          <InfoUserRow title="닉네임" edit={edit} info={userDetailInfo?.nickname}>
            <InputField
              name="nickname"
              type="text"
              placeholder="닉네임"
              value={state.nickname}
              onChange={changeHandler}
            />
          </InfoUserRow>
          <InfoUserRow title="경력유무" edit={edit} info={`${String(userDetailInfo?.career)} 년`}>
            <Selector
              name="career"
              placeholder="n 년"
              isMulti={false}
              options={CAREER_EXP_OPTIONS}
              selectedValue={state.career ?? []}
              onChange={(selected) => selectChangeHandler(selected, "career")}
            />
          </InfoUserRow>
          <InfoUserRow title="직무" edit={edit} info={userDetailInfo?.position}>
            <Selector
              name="position"
              placeholder="직무"
              isMulti={false}
              options={POSITION_OPTIONS}
              selectedValue={state.position ?? []}
              onChange={(selected) => selectChangeHandler(selected, "position")}
            />
          </InfoUserRow>
          <InfoUserRow title="기술스택" edit={edit} info={userDetailInfo?.techStackTags}>
            <Selector
              name="techStackTags"
              placeholder="# 태그"
              isMulti={true}
              options={TECH_STACK_OPTIONS}
              selectedValue={state.techStackTags ?? []}
              onChange={(selected) => selectChangeHandler(selected, "techStackTags")}
            />
          </InfoUserRow>
          <InfoUserRow title="거주지" edit={edit} info={userDetailInfo?.address}>
            <InputField placeholder="거주지" value={`${state.address.address} ${state.address.zonecode}`} readOnly />
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
        <Button
          size="small"
          variant="main"
          className={container__section__button}
          onClick={edit ? editClickHandler : () => setEdit((prev) => !prev)}
        >
          {edit ? "저장" : "수정"}
        </Button>
      </section>
      <section className={`${container__section} ${last}`}>
        <div className={container__section__content}>
          <InfoUserRow title="이메일" isDefault info={userBasicInfo?.email} />
          <InfoUserRow title="이름" isDefault info={userBasicInfo?.name} />
          <InfoUserRow title="성별" isDefault info={userBasicInfo?.gender} />
          <InfoUserRow title="생일" isDefault info={userBasicInfo?.birthDate} />
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          size="long"
          variant="sub"
          className={`${container__section__button} ${red}`}
        >
          계정탈퇴
        </Button>
      </section>
      {isAddrSearchOpen && (
        <AddressSearch
          onChange={(address) => dispatch({ type: "SET_ADDRESS", address })}
          handleComplete={() => setIsAddrSearchOpen(!isAddrSearchOpen)}
        />
      )}
      {isModalOpen && <DeleteAccountModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} userId={userId} />}
    </div>
  );
}
