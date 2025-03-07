import Image from "next/image";

import { useState } from "react";
import type { ChangeEvent, Dispatch } from "react";

import Button from "@/components/button/button";
import Selector from "@/components/selector/selector";
import InputField from "@/components/inputField/inputField";

import styles from "./signupForm.module.scss";

import { POSITION_OPTIONS, TECH_STACK_OPTIONS, CAREER_EXP_OPTIONS } from "@/constants/selectOptions";

import type { SignupState, SignupAction } from "@/app/(anon)/signup/_hooks/use-signupReducer";

import AddressSearch from "./addressSearch";
import BirthSelector from "./birthSelector";
import GenderSelector from "./genderSelector";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useSignupHandlers } from "@/app/(anon)/signup/_hooks/use-signupHandlers";

interface SignUpFormProps {
  state: SignupState;
  dispatch: Dispatch<SignupAction>;
  onSubmit: () => void;
}

export default function SignUpForm({ state, dispatch, onSubmit }: SignUpFormProps) {
  const {
    container,
    container__button,
    container__inputblock,
    container__submit,
    container__profileImg,
    profileImg__preview,
    profileImg__button,
  } = styles;
  const {
    changeHandler,
    selectChangeHandler,
    birthChangeHandler,
    genderChangeHandler,
    addressChangeHandler,
    onBlurHandler,
    onBlurPwdConfHandler,
    emailCheckHandler,
  } = useSignupHandlers(state, dispatch);
  const [isAddrSearchOpen, setIsAddrSearchOpen] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState<string | null>(null); // 🔹 비밀번호 확인 에러 상태 추가
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false); // 패스워드 확인 필드의 아이콘 상태 추가
  const [profileImgFile, setProfileImgFile] = useState<File | null>(null); // 프로필 이미지 파일 상태 추가

  const handleProfileImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImgFile(file); // 파일 상태 업데이트
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch({ type: "SET_PROFILE_IMG", payload: reader.result as string });
      };
      console.log(state.profileImg);
      reader.readAsDataURL(file);
    }
  };

  return (
    <form className={container}>
      <div className={container__inputblock}>
        <InputField
          name="email"
          label="이메일"
          value={state.email}
          onChange={changeHandler}
          onBlur={onBlurHandler}
          error={state.errors.email}
          success={state.successMessages.email}
        />
        <Button className={container__button} variant="sub" size="long" onClick={emailCheckHandler}>
          중복확인
        </Button>
      </div>

      <InputField
        name="password"
        type={showPassword ? "text" : "password"}
        label="비밀번호"
        value={state.password}
        onChange={changeHandler}
        onBlur={onBlurHandler}
        error={state.errors.password}
        icon={showPassword ? FaRegEye : FaRegEyeSlash}
        onIconClick={() => setShowPassword((prev) => !prev)}
      />
      <InputField
        name="passwordConfirm"
        type={showPasswordConfirm ? "text" : "password"}
        label="비밀번호 확인"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        onBlur={() => onBlurPwdConfHandler(passwordConfirm, setPasswordConfirmError)}
        error={passwordConfirmError}
        icon={showPasswordConfirm ? FaRegEye : FaRegEyeSlash}
        onIconClick={() => setShowPasswordConfirm((prev) => !prev)}
      />

      <div className={container__inputblock}>
        <InputField
          name="name"
          label="이름"
          value={state.name}
          onChange={changeHandler}
          onBlur={onBlurHandler}
          error={state.errors.name}
        />
        <GenderSelector
          selectedGender={state.gender}
          onChange={genderChangeHandler}
          className={container__button}
          error={state.errors.gender}
        />
      </div>

      <InputField
        name="nickname"
        label="닉네임"
        value={state.nickname}
        onChange={changeHandler}
        onBlur={onBlurHandler}
        error={state.errors.nickname}
      />
      <BirthSelector birthDate={state.birthDate} onChange={birthChangeHandler} error={state.errors.birthDate} />

      <Selector
        name="position"
        isMulti={false}
        title="직무"
        options={POSITION_OPTIONS}
        selectedValue={state.position}
        onChange={(selected) => selectChangeHandler(selected, "position")}
        error={state.errors.position}
      />

      <Selector
        name="tagNames"
        isMulti={true}
        title="기술 스택"
        options={TECH_STACK_OPTIONS}
        selectedValue={state.tagNames ?? []}
        onChange={(selected) => selectChangeHandler(selected, "tagNames")}
        error={state.errors.tagNames}
        width="373px"
      />

      <div className={container__inputblock}>
        <InputField
          label="주소"
          value={`${state.address.address} ${state.address.zonecode}`}
          readOnly
          error={state.errors.address}
        />
        <Button
          className={container__button}
          variant="sub"
          size="long"
          onClick={() => setIsAddrSearchOpen(!isAddrSearchOpen)}
        >
          주소검색
        </Button>
      </div>

      <Selector
        name="career"
        isMulti={false}
        title="경력"
        options={CAREER_EXP_OPTIONS}
        selectedValue={state.career}
        onChange={(selected) => selectChangeHandler(selected, "career")}
        error={state.errors.career}
      />

      <div className={container__profileImg}>
        <label htmlFor="profileImg">프로필 이미지 업로드</label>
        <input type="file" id="profileImg" accept="image/*" onChange={handleProfileImgChange} />
        {state.profileImg && (
          <Image
            src={profileImgFile ? URL.createObjectURL(profileImgFile) : state.profileImg}
            alt="프로필 이미지 미리보기"
            className={profileImg__preview}
            width={100}
            height={100}
          />
        )}
        <label htmlFor="profileImg" className={profileImg__button}>
          이미지 선택
        </label>
      </div>

      <Button className={container__submit} variant="main" size="long" onClick={onSubmit}>
        가입하기
      </Button>

      {isAddrSearchOpen && (
        <AddressSearch onChange={addressChangeHandler} handleComplete={() => setIsAddrSearchOpen(!isAddrSearchOpen)} />
      )}
    </form>
  );
}
