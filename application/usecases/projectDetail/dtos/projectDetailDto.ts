import type { UserDto } from "../../user/dtos/userDto";

export interface CommentDto {
  id: number;
  projectId: number;
  parentCommentId?: number;
  content: string;
  createdAt: Date;
  user: UserDto;
  replies?: CommentDto[];
}

export interface ProjectDetailDto {
  id: number;
  projectTitle: string;
  recruitmentTitle: string;
  goal: string;
  description: string;
  projectPeriodStart: Date;
  projectPeriodEnd: Date;
  recruitmentStart: Date;
  recruitmentEnd: Date;
  hits: number;
  createdAt: Date;

  leader: UserDto;
  comments: CommentDto[];
}
