import type { UserRepository } from "@/domain/repositories/userRepository";

export class DeleteAccountUsecase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(userId: string): Promise<void> {
    try {
      await this.userRepository.delete(userId);
    } catch (error) {
      console.error("계정 삭제 중 오류 발생:", error);
      throw new Error("계정 삭제에 실패했습니다.");
    }
  }
}
