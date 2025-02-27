export interface ApplyDto {
  id: number;
  projectId: number;
  userId: string;
  position: string;
  introduction: string;
  portfolioUrl: string | null;
  status: string;
}
