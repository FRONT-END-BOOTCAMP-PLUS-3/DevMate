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
