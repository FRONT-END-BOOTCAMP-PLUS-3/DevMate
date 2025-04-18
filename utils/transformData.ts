import type { SignupState } from "@/app/(anon)/signup/_hooks/use-signupReducer";
import type { SignUpDto } from "@/application/usecases/auth/signup/dtos/signupDto";
import type { editUserInfoState } from "@/app/user/information/_hooks/use-editUserInfo";
import type { UserEditInfoDto } from "@/application/usecases/information/dtos/infoUserDto";

function transformCareer(careerValue: string): number {
  return careerValue === "student" || careerValue === "job-seeker" ? 0 : Number(careerValue);
}

export function transformUserData(data: SignupState): SignUpDto {
  return {
    address: data.address.address, // address 객체 -> 문자열
    name: data.name,
    email: data.email,
    password: data.password,
    nickname: data.nickname,
    gender: data.gender,
    birthDate: new Date(data.birthDate.year, data.birthDate.month - 1, data.birthDate.day), // Date 변환
    position: data.position ? String(data.position.value) : "", // value 값 사용
    career: transformCareer(String(data.career ? data.career.value : 0)), // 변환 함수 적용
    profileImg: data.profileImg || "/defaultProfile.svg", // 빈 문자열이면 default 처리
    tagNames: data.tagNames?.map((item) => String(item.value)) || [], // 빈 문자열이면 null 처리
  };
}

export function transformUserInfo(data: editUserInfoState): UserEditInfoDto {
  return {
    profileImg: data.profileImg || "/defaultProfile.svg",
    nickname: data.nickname,
    career: transformCareer(String(data.career ? data.career.value : 0)),
    position: data.position ? String(data.position.value) : "",
    techStackTags: data.techStackTags?.map((item) => String(item.value)) || [],
    address: data.address?.address,
  };
}
