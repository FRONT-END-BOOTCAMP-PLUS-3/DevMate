import type { ProjectDto } from "@/application/usecases/dtos/projectDto";

import type { ProjectDetailUserDto } from "./projectDetailUserDto";
import type { ProjectDetailApplyDto } from "./projectDetailApplyDto";
import type { ProjectDetailMemberDto } from "./projectDetailMemberDto";

export interface ProjectDetailDto extends Omit<ProjectDto, "hits" | "createdAt"> {
  leader?: ProjectDetailUserDto;
  applications?: ProjectDetailApplyDto[];
  members?: ProjectDetailMemberDto[];
  projectTags?: string[];
}
