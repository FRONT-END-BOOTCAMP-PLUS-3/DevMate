export interface ProjectDto {
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
  hits: number;
  createdAt: Date;
  notice: string;
}
