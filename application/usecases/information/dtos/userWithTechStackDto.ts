import type { UserDto } from "../../dtos/userDto";

export interface TechStackTagDto {
  userId: string;
  tagId: number;
}
export interface UserWithTechStackDto extends UserDto {
  techStackTags?: TechStackTagDto[];
}
