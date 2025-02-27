import type { UserRepository } from "@/domain/repositories/userRepository";

import type { UserLoginDto } from "./dtos/loginDto";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class LoginUsecase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({ email, password }: UserLoginDto): Promise<string | null> {
    try {
      const userData = await this.userRepository.findByEmail(email);
      if (!userData) {
        console.error("유저를 찾을수 없습니다다");
        return null;
      }

      const { password: hashedPassword } = userData;
      const isValidPassword = await bcrypt.compare(password, hashedPassword);
      if (!isValidPassword) {
        console.error("비밀번호가 일치하지 않습니다");
        return null;
      }

      const payload = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        createdAt: userData.createdAt,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "6h" });
      return token;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
      return null;
    }
  }
}
