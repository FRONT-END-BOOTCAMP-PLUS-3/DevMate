import type { ProjectDto } from "../../dtos/projectDto";

export interface UpdateProjectDto extends Omit<ProjectDto, "id" | "leaderId" | "hits" | "createdAt"> {
  projectTags?: string[];
}
