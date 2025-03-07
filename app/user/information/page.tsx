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
    container__img__box,
    container__img__title,
    container__img__input,
    container__img__label,
  } = styles;
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
                  userDetailInfo?.profileImg
                    ? userDetailInfo.profileImg
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
          <UserInfoRow title="닉네임" edit={edit} />
          <UserInfoRow title="경력유무" edit={edit} />
          <UserInfoRow title="기술스택" edit={edit} />
          <UserInfoRow title="자기소개" edit={edit} />
          <UserInfoRow title="거주지" edit={edit} />
          <UserInfoRow title="직무" edit={edit} />
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
