import { getEncryptionKey } from "@/utils/security";

import type { UserRepository } from "@/domain/repositories/userRepository";
import type { SignUpDto } from "@/application/usecases/auth/signup/dtos/signupDto";

import crypto from "crypto";
import bcrypt from "bcryptjs";

export class SignupUsecase {
  private userRepository: UserRepository;
  private encryptionKey: Buffer;
  private algorithm = "aes-256-cbc";
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
    this.encryptionKey = getEncryptionKey();
  }

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

  public async execute(user: Omit<SignUpDto, "id" | "createdAt">): Promise<SignUpDto> {
    try {
      const { password, address, ...rest } = user;
      const hashedPassword = await bcrypt.hash(password, 10);
      const encryptedAddress = this.encryptAddress(address);
      const userData = { ...rest, password: hashedPassword, address: encryptedAddress };

      return await this.userRepository.create(userData);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
      throw new Error("An error occurred during signup");
    }
  }
}
