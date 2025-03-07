import type { ProjectDto } from "../../dtos/projectDto";
import type { ProjectTagDto } from "../../dtos/projectTagDto";

export interface RecruitmentsDto extends ProjectDto {
  leaderName: string;
  projectTags: ProjectTagDto[];
  commentCount: number;
  likeCount: number;
}
