import type { UserDto } from "@/application/usecases/dtos/userDto";

export type MyApplyUserDto = Omit<UserDto, "email" | "password" | "nickname" | "profileImg" | "createdAt">;
