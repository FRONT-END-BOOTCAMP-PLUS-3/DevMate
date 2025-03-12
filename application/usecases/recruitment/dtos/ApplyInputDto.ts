import type { ApplyDto } from "../../dtos/applyDto";

export interface ApplyInputDto extends Omit<ApplyDto, "portfolioUrl" | "status" | "id" | "createdAt"> {
  portfolioFile?: File | null;
}
