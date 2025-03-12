import type { ProjectDto } from "../../../dtos/projectDto";
import type { MyApplyLeaderDto } from "./myApplyLeaderDto";

export interface MyApplyProjectDto
  extends Pick<ProjectDto, "id" | "recruitmentTitle" | "description" | "hits" | "createdAt"> {
  leader?: MyApplyLeaderDto;
  likes?: number;
  comments?: number;
}
