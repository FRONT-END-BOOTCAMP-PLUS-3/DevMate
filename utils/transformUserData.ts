import type { UserDto } from "@/application/usecases/user/dtos/userDto";
import type { SignupState } from "@/app/(anon)/signup/_hooks/use-signupReducer";

function transformCareer(careerValue: string): number {
  return careerValue === "student" || careerValue === "job-seeker" ? 0 : Number(careerValue);
}

export function transformUserData(data: SignupState): Omit<UserDto, "id" | "createdAt"> {
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
    profileImg: data.profileImg || null, // 빈 문자열이면 null 처리
  };
}
