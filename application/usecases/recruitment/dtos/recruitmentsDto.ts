import type { TagDto } from "../../dtos/tagDto";
import type { ProjectDto } from "../../dtos/projectDto";

export interface RecruitmentsTagDto {
  tag: TagDto;
}

export interface RecruitmentsDto extends ProjectDto {
  leaderName?: string;
  projectTags?: RecruitmentsTagDto[];
  commentCount?: number;
  likeCount?: number;
}
