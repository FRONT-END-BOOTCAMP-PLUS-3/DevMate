import type { LikeDto } from "@/application/usecases/dtos/LikeDto";
import type { CommentDto } from "@/application/usecases/dtos/commentDto";

import type { ProjectDto } from "../../../dtos/projectDto";
import type { MyApplyLeaderDto } from "./myApplyLeaderDto";

export interface MyApplyProjectDto
  extends Pick<ProjectDto, "id" | "recruitmentTitle" | "description" | "hits" | "createdAt"> {
  likes?: LikeDto[];
  leader?: MyApplyLeaderDto;
  comments?: CommentDto[];
}
