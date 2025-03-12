import type { ApplyDto } from "@/application/usecases/dtos/applyDto";

import type { ProjectDetailUserDto } from "./projectDetailUserDto";

export interface ProjectDetailApplyDto extends ApplyDto {
  user?: ProjectDetailUserDto;
}
