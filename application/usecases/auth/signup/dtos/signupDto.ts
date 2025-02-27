import type { UserDto } from "@/application/usecases/dtos/userDto";

export type SignUpDto = Omit<UserDto, "id" | "createdAt">;

export type SignUPCheckEmailDto = Pick<UserDto, "email" | "password">;
