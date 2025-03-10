import type { UserDto } from "@/application/usecases/dtos/userDto";

export type MyApplyLeaderDto = Pick<UserDto, "id" | "name">;
