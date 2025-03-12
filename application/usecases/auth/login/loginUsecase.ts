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
        throw new Error("유저를 찾을 수 없습니다");
      }

      const { password: hashedPassword } = userData;
      const isValidPassword = await bcrypt.compare(password, hashedPassword);
      if (!isValidPassword) {
        throw new Error("비밀번호가 일치하지 않습니다");
      }
      const payload = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        createdAt: userData.createdAt,
        nickname: userData.nickname,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "6h" });
      return token;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`비밀번호가 일치하지 않습니다 catch에러 ${error.message}`);
      } else {
        console.log("An unknown error occurred");
      }
      return null;
    }
  }
}
