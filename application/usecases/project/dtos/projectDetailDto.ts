import type { ProjectDto } from "@/application/usecases/dtos/projectDto";

import type { ProjectDetailUserDto } from "./projectDetailUserDto";
import type { ProjectDetailApplyDto } from "./projectDetailApplyDto";
import type { ProjectDetailMemberDto } from "./projectDetailMemberDto";

export interface ProjectDetailDto
  extends Pick<
    ProjectDto,
    "id" | "leaderId" | "projectTitle" | "goal" | "description" | "projectPeriodStart" | "projectPeriodEnd" | "notice"
  > {
  leader?: ProjectDetailUserDto;
  applications?: ProjectDetailApplyDto[];
  members?: ProjectDetailMemberDto[];
}
