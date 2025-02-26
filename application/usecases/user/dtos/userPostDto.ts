import type { UserDto } from "./userDto";

export type UserSignUpDto = Omit<UserDto, "id" | "createdAt">;

export type UserLoginDto = Pick<UserDto, "email" | "password">;
