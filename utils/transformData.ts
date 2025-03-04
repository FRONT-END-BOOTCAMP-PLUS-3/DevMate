import type { UserDto } from "@/application/usecases/dtos/userDto";
import type { SignupState } from "@/app/(anon)/signup/_hooks/use-signupReducer";
import { UserEditInfoDto } from "@/application/usecases/information/dtos/infoUserDto";

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
function transformUserInfoDto(data: ): UserEditInfoDto {
  return {
    profileImg: data.profileImg,
    nickname: data.nickname,
    career: careerMapping[data.career.value] ?? undefined,
    position: data.position?.value,
    techStackTags: data.stack?.map((item: any) => item.value),
    address: data.address?.address,
  };
}