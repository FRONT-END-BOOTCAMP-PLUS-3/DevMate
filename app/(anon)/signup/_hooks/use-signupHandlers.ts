import { type Dispatch, type ChangeEvent, type FocusEvent, useCallback } from "react";

import { ERROR_MESSAGES } from "@/constants/errorMessages";

import type { SelectOption } from "@/types";
import type { MultiValue, SingleValue } from "react-select";

import type { postCode, SignupState, SignupAction } from "./use-signupReducer";

import { checkEmailDup } from "../apis/checkEmailDup";

export function useSignupHandlers(state: SignupState, dispatch: Dispatch<SignupAction>) {
  // 일반 입력 필드 핸들러
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "SET_INPUT",
      name: e.target.name as keyof SignupState,
      value: e.target.value,
    });
  };

  //  Select 옵션 핸들러
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

  //  생년월일 변경 핸들러
  const birthChangeHandler = (type: "year" | "month" | "day", selected: SelectOption | null) => {
    if (selected) {
      dispatch({
        type: "SET_BIRTHDATE",
        year: type === "year" ? Number(selected.value) : state.birthDate.year,
        month: type === "month" ? Number(selected.value) : state.birthDate.month,
        day: type === "day" ? Number(selected.value) : state.birthDate.day,
      });
    }
  };

  //  성별 변경 핸들러
  const genderChangeHandler = (selectedGender: string) => {
    dispatch({ type: "SET_GENDER", gender: selectedGender });
  };

  //  주소 변경 핸들러
  const addressChangeHandler = (address: postCode) => {
    dispatch({ type: "SET_ADDRESS", address });
  };

  // 입력 필드 포커스 아웃 핸들러
  const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    dispatch({ type: "RESET_SUCCESS_MESSAGES" });
    const { name, value } = e.target;
    const validationRules: { [key: string]: (value: string) => string | null } = {
      email: (val) => (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? ERROR_MESSAGES.EMAIL_INVALID : null),
      password: (val) => {
        if (!val || val.length < 8) return ERROR_MESSAGES.PASSWORD_MIN_LENGTH;
        if (!/[a-z]/.test(val) || !/\d/.test(val) || !/[\W_]/.test(val)) {
          return ERROR_MESSAGES.PASSWORD_COMPLEXITY;
        }
        return null;
      },
      name: (val) => (/[^a-zA-Z가-힣]/.test(val) ? ERROR_MESSAGES.NAME_INVALID_CHARACTERS : null),
      nickname: (val) => (/[^a-zA-Z0-9가-힣]/.test(val) ? ERROR_MESSAGES.NICKNAME_INVALID_CHARACTERS : null),
    };

    const errorMessage = validationRules[name]?.(value) || null;

    dispatch({
      type: "SET_ERRORS",
      errors: errorMessage
        ? { ...state.errors, [name]: errorMessage }
        : Object.fromEntries(Object.entries(state.errors).filter(([key]) => key !== name)), // 🔹 `delete` 없이 에러 제거
    });
  };

  // 비밀번호 확인 입력 필드 포커스 아웃 핸들러
  const onBlurPwdConfHandler = (passwordConfirm: string, setPasswordConfirmError: (error: string | null) => void) => {
    const errorMessage =
      passwordConfirm !== state.password && passwordConfirm.trim() ? ERROR_MESSAGES.PASSWORD_MISMATCH : null;

    setPasswordConfirmError(errorMessage);
  };

  const emailCheckHandler = async () => {
    const email = state.email.trim();
    if (!email) {
      dispatch({ type: "SET_ERRORS", errors: { ...state.errors, email: "이메일을 입력해주세요." } });
      dispatch({ type: "RESET_SUCCESS_MESSAGES" }); // ✅ 성공 메시지 초기화
      return;
    }

    try {
      const isDuplicated = await checkEmailDup(email);

      if (isDuplicated) {
        dispatch({
          type: "SET_ERRORS",
          errors: { ...state.errors, email: "이미 사용 중인 이메일입니다." },
        });
        dispatch({ type: "RESET_SUCCESS_MESSAGES" }); // ✅ 중복이면 성공 메시지 삭제
      } else {
        dispatch({
          type: "SET_SUCCESS_MESSAGES",
          successMessages: { ...state.successMessages, email: "사용 가능한 이메일입니다." },
        });
        dispatch({ type: "SET_ERRORS", errors: {} }); // ✅ 성공 시 에러 초기화
      }

      dispatch({ type: "SET_EMAIL_CHECKED", value: !isDuplicated });
    } catch (error) {
      console.error("이메일 중복 확인 오류:", error);
      dispatch({
        type: "SET_ERRORS",
        errors: { ...state.errors, email: "이메일 중복 확인에 실패했습니다." },
      });
      dispatch({ type: "RESET_SUCCESS_MESSAGES" }); // ✅ 실패하면 성공 메시지 삭제
    }
  };

  // 회원가입 제출 핸들러 (필수 입력값 체크)
  const validateAndSubmit = () => {
    dispatch({ type: "RESET_ERRORS" });

    const newErrors: SignupState["errors"] = {};

    const fieldValidations: { [key in keyof SignupState]?: string } = {
      email: state.email.trim() ? "" : ERROR_MESSAGES.EMAIL_REQUIRED,
      password: state.password.trim() ? "" : ERROR_MESSAGES.PASSWORD_REQUIRED,
      name: state.name.trim() ? "" : ERROR_MESSAGES.NAME_REQUIRED,
      nickname: state.nickname.trim() ? "" : ERROR_MESSAGES.NICKNAME_REQUIRED,
      gender: state.gender ? "" : ERROR_MESSAGES.GENDER_REQUIRED,
      birthDate:
        state.birthDate.year && state.birthDate.month && state.birthDate.day ? "" : ERROR_MESSAGES.BIRTH_REQUIRED,
      address: state.address.address ? "" : ERROR_MESSAGES.ADDRESS_REQUIRED,
      position: state.position?.value ? "" : ERROR_MESSAGES.POSITION_REQUIRED,
      stack: state.stack?.length ? "" : ERROR_MESSAGES.TECH_STACK_REQUIRED,
      career: state.career?.value ? "" : ERROR_MESSAGES.CAREER_REQUIRED,
    };

    Object.entries(fieldValidations).forEach(([key, errorMessage]) => {
      if (errorMessage) {
        newErrors[key as keyof SignupState] = errorMessage;
      }
    });

    if (Object.keys(state.errors).length > 0) {
      console.log("기존 에러 메시지가 존재하여 제출 불가!", state.errors);
      return false;
    }

    if (Object.keys(newErrors).length > 0) {
      dispatch({ type: "SET_ERRORS", errors: newErrors });
      console.log("필수 입력값 누락으로 제출 불가!", newErrors);
      return false;
    }

    console.log("회원가입 유효성 검사 통과");
    return true;
  };

  return {
    changeHandler,
    selectChangeHandler,
    birthChangeHandler,
    genderChangeHandler,
    addressChangeHandler,
    onBlurHandler,
    onBlurPwdConfHandler,
    emailCheckHandler,
    validateAndSubmit,
  };
}
