export interface UserNicknameDto {
  id: string;
  nickname: string;
}

export interface CommentDto {
  id: number;
  projectId: number;
  parentCommentId?: number;
  content?: string;
  createdAt: Date;
  user: UserNicknameDto;
  replies?: CommentDto[];
}

export interface ProjectDetailDto {
  id: number;
  projectTitle: string;
  recruitmentTitle: string;
  goal?: string;
  description: string;
  projectPeriodStart: Date;
  projectPeriodEnd: Date;
  recruitmentStart: Date;
  recruitmentEnd: Date;
  like: number;
  hits: number;
  createdAt: Date;

  leader: UserNicknameDto;

  comments: CommentDto[];
}
