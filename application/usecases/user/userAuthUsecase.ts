import { getEncryptionKey } from "@/utils/security";

import type { UserRepository } from "@/domain/repositories/userRepository";

import type { UserLoginDto, UserSignUpDto } from "./dtos/userPostDto";

import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class UserAuthUsecase {
  private userRepository: UserRepository;
  private encryptionKey: Buffer;
  private algorithm = "aes-256-cbc";
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
    this.encryptionKey = getEncryptionKey();
  }

  // 주소 암호화 함수
  private encryptAddress(address: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.encryptionKey, iv);

    const encrypted = cipher.update(address, "utf8", "hex") + cipher.final("hex"); // 🔹 const 사용

    return iv.toString("hex") + encrypted;
  }

  private decryptAddress(encryptedAddress: string): string {
    const iv = Buffer.from(encryptedAddress.slice(0, 32), "hex");
    const encryptedData = encryptedAddress.slice(32);
    const decipher = crypto.createDecipheriv(this.algorithm, this.encryptionKey, iv);

    const decrypted = decipher.update(encryptedData, "hex", "utf8") + decipher.final("utf8"); // 🔹 const 사용

    return decrypted;
  }

  public async createUser(user: Omit<UserSignUpDto, "id" | "createdAt">): Promise<UserSignUpDto> {
    const { password, address, ...rest } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const encryptedAddress = this.encryptAddress(address);
    const userData = { ...rest, password: hashedPassword, address: encryptedAddress };

    return await this.userRepository.create(userData);
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

  public async findByEmail(inputEmail: string): Promise<UserLoginDto | null> {
    const userData = await this.userRepository.findByEmail(inputEmail);
    if (!userData) return null;
    const { email, password } = userData;
    return { email, password };
  }

  public async findByEmailBool(email: string): Promise<boolean> {
    const existingUser = await this.userRepository.findByEmail(email);
    return existingUser !== null;
  }
}
