import type { UserRepository } from "@/domain/repositories/userRepository";

import type { UserLoginDto } from "./dtos/userPostDto";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class UserAuthUsecase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  private async findByEmail(inputEmail: string): Promise<UserLoginDto | null> {
    const userData = await this.userRepository.findByEmail(inputEmail);
    if (!userData) return null;
    const { email, password } = userData;
    return { email, password };
  }

  public async login(email: string, password: string): Promise<string | null> {
    const userData = await this.userRepository.findByEmail(email);
    if (!userData) {
      throw new Error("Invalid email or password");
    }

    const { password: hashedPassword } = userData;
    const isValidPassword = await bcrypt.compare(password, hashedPassword);
    if (!isValidPassword) {
      throw new Error("Invalid email or password");
    }

    const payload = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      createdAt: userData.createdAt,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "6h" });
    return token;
  }
}
