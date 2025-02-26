import type { User } from "./user";

export interface Comment {
  id: number;
  userId?: string;
  projectId: number;
  parentCommentId?: number;
  content: string;
  createdAt: Date;
  user: User;
  replies?: Comment[];
}
