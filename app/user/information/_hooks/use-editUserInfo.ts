import { useReducer } from "react";

import type { AddressCode, SelectOption } from "@/types";
import type { MultiValue, SingleValue } from "react-select";

export interface editUserInfoState {
  profileImg?: string;
  nickname: string;
  career: SelectOption | null;
  techStackTags?: readonly SelectOption[];
  position: SelectOption | null;
  address: AddressCode;
}

export type editUserInfoAction =
  | { type: "SET_INPUT"; name: keyof editUserInfoState; value: string | number }
  | { type: "SET_POSITION"; value: SingleValue<SelectOption> | null }
  | { type: "SET_CAREER"; value: SingleValue<SelectOption> | null }
  | { type: "SET_TECH_STACK"; value: MultiValue<SelectOption> }
  | { type: "SET_ADDRESS"; address: AddressCode }
  | { type: "RESET" };

const editUserInfoReducer = (state: editUserInfoState, action: editUserInfoAction): editUserInfoState => {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, [action.name]: action.value };
    case "SET_POSITION":
      return { ...state, position: action.value };
    case "SET_CAREER":
      return { ...state, career: action.value };
    case "SET_TECH_STACK":
      return { ...state, techStackTags: action.value };
    case "SET_ADDRESS":
      return { ...state, address: action.address };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export const initialState: editUserInfoState = {
  profileImg: "",
  nickname: "",
  career: {
    value: "",
    label: "",
  },
  techStackTags: [],
  position: {
    value: "",
    label: "",
  },
  address: {
    address: "",
    zonecode: "",
  },
};

// ✅ 커스텀 훅 생성
export function useEditUserInfo() {
  const [state, dispatch] = useReducer(editUserInfoReducer, initialState);
  return { state, dispatch };
}
