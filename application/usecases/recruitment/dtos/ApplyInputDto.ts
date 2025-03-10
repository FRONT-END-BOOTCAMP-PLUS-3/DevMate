import type { ApplyDto } from "../../dtos/applyDto";

export interface ApplyInputDto extends Omit<ApplyDto, "portfolioUrl" | "status" | "id"> {
  portfolioFile?: File | null;
}
