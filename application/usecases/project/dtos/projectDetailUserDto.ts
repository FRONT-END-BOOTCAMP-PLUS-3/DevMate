import type { UserDto } from "@/application/usecases/dtos/userDto";

export type ProjectDetailUserDto = Pick<
  UserDto,
  "name" | "id" | "gender" | "birthDate" | "position" | "address" | "career"
>;
