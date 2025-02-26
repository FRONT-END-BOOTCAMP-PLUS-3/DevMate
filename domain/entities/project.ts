import type { User } from "./user";
import type { Comment } from "./comment";

export interface Project {
  id: number;
  leaderId: string;
  recruitmentTitle: string;
  projectTitle: string;
  goal: string;
  description: string;
  projectPeriodStart: Date;
  projectPeriodEnd: Date;
  recruitmentStart: Date;
  recruitmentEnd: Date;
  like: number;
  hits: number;
  createdAt: Date;
  leader: User;
  comments: Comment[];
}
