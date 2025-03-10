import type { CommentDto } from "@/application/usecases/dtos/commentDto";

import type { ProjectDto } from "../../../dtos/projectDto";
import type { MyApplyLeaderDto } from "./myApplyLeaderDto";

export interface MyApplyProjectDto
  extends Pick<ProjectDto, "id" | "recruitmentTitle" | "description" | "hits" | "likes" | "createdAt"> {
  leader?: MyApplyLeaderDto;
  comments?: CommentDto[];
}
