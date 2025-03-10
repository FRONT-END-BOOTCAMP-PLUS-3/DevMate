import type { UserRepository } from "@/domain/repositories/userRepository";

import type { UserDto } from "../dtos/userDto";

export class GetUserIdUsecase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  public async execute(userId: string): Promise<UserDto | null> {
    try {
      const data = await this.userRepository.findById(userId);
      if (!data) {
        throw new Error("유저를 찾을 수 없습니다");
      }
      return { ...data };
    } catch (error) {
      console.error("계정 조회 중 오류 발생:", error);
      throw new Error("계정 조회에 실패했습니다.");
    }
  }
}
