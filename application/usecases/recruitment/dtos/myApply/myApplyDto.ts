import type { ApplyDto } from "@/application/usecases/dtos/applyDto";

import type { MyApplyUserDto } from "./myApplyUserDto";
import type { MyApplyProjectDto } from "./myApplyProjectDto";

export interface MyApplyDto extends ApplyDto {
  project?: MyApplyProjectDto;
  user?: MyApplyUserDto;
}
