import type { UserDto } from "@/application/usecases/dtos/userDto";

export type UserLoginDto = Pick<UserDto, "email" | "password">;
