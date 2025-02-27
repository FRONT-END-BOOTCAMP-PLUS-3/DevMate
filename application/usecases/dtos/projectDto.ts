export interface ProjectDto {
  id: number;
  leaderId: string;
  recruitmentTitle: string;
  projectTitle: string;
  goal: string | null;
  description: string;
  projectPeriodStart: Date;
  projectPeriodEnd: Date;
  recruitmentStart: Date;
  recruitmentEnd: Date;
  like: number;
  hits: number;
  createdAt: Date;
}
