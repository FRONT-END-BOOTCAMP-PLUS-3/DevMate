import type { LikeDto } from "../../dtos/LikeDto";
import type { UserDto } from "../../dtos/userDto";
import type { ProjectDto } from "../../dtos/projectDto";
import type { CommentDto } from "../../dtos/commentDto";

export interface CommentDetailDto extends CommentDto {
  replies: CommentDetailDto[];
  user: Pick<UserDto, "id" | "nickname" | "profileImg">;
}

export interface RecruitmentDetailDto extends ProjectDto {
  leader: Pick<UserDto, "id" | "nickname" | "profileImg">;
  comments: CommentDetailDto[];
  likes: LikeDto[];
}
