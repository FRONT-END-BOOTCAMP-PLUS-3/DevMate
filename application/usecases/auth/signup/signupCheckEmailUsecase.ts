import type { UserRepository } from "@/domain/repositories/userRepository";

import type { SignUPCheckEmailDto } from "./dtos/signupDto";

export class SignupCheckEmailUsecase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(inputEmail: string): Promise<SignUPCheckEmailDto | null> {
    try {
      const userData = await this.userRepository.findByEmail(inputEmail);
      if (!userData) return null;
      const { email, password } = userData;
      return { email, password };
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unknown error occurred");
      }
      return null;
    }
  }
}
