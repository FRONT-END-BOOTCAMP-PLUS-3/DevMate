import type { UserDto } from "../../dtos/userDto";
import type { ProjectDto } from "../../dtos/projectDto";

export interface CreateProjectDto extends Omit<ProjectDto, "id" | "hits" | "createdAt" | "notice"> {
  leader?: UserDto;
  projectTags?: string[];
}
