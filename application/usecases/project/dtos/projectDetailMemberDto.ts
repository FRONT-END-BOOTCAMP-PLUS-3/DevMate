import type { MemberDto } from "@/application/usecases/dtos/memberDto";

import type { ProjectDetailUserDto } from "./projectDetailUserDto";

export interface ProjectDetailMemberDto extends MemberDto {
  user: ProjectDetailUserDto;
}
