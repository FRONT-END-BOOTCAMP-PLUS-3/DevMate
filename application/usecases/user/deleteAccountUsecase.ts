import { cookies } from "next/headers";

import type { UserRepository } from "@/domain/repositories/userRepository";

export class DeleteAccountUsecase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  private async deleteToken(): Promise<void> {
    try {
      const cookieStore = await cookies();
      cookieStore.delete("token"); // 'token' 쿠키 삭제
    } catch (error) {
      console.log("토큰 삭제 중 오류 발생:", error);
      throw new Error("토큰 삭제에 실패했습니다.");
    }
  }
  public async execute(userId: string): Promise<void> {
    try {
      await this.userRepository.delete(userId);
      await this.deleteToken();
    } catch (error) {
      console.log("계정 삭제 중 오류 발생:", error);
      throw new Error("계정 삭제에 실패했습니다.");
    }
  }
}
