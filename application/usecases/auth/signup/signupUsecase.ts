import { getEncryptionKey } from "@/utils/security";

import type { UserRepository } from "@/domain/repositories/userRepository";
import type { SignUpDto } from "@/application/usecases/auth/signup/dtos/signupDto";
import type { PsTagRepository } from "@/infrastructure/repositories/psTagRepository";
import type { PsTechStackTagRepository } from "@/infrastructure/repositories/psTechStackTagRepository";

import crypto from "crypto";
import bcrypt from "bcryptjs";

export class SignupUsecase {
  private userRepository: UserRepository;
  private tagRepository: PsTagRepository;
  private techStackTagRepository: PsTechStackTagRepository;
  private encryptionKey: Buffer;
  private algorithm = "aes-256-cbc";

  constructor(
    userRepository: UserRepository,
    tagRepository: PsTagRepository,
    techStackTagRepository: PsTechStackTagRepository,
  ) {
    this.userRepository = userRepository;
    this.tagRepository = tagRepository;
    this.techStackTagRepository = techStackTagRepository;
    this.encryptionKey = getEncryptionKey();
  }

  private encryptAddress(address: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.encryptionKey, iv);

    const encrypted = cipher.update(address, "utf8", "hex") + cipher.final("hex"); // 🔹 const 사용

    return iv.toString("hex") + encrypted;
  }

  public async execute(user: Omit<SignUpDto, "id" | "createdAt">): Promise<SignUpDto> {
    try {
      const { password, address, tagNames, ...rest } = user;
      const hashedPassword = await bcrypt.hash(password, 10);
      const encryptedAddress = this.encryptAddress(address);
      const userData = { ...rest, password: hashedPassword, address: encryptedAddress };
      const newUser = await this.userRepository.create(userData);
      const tagIds = await this.tagRepository.getTagIds(tagNames);
      await this.techStackTagRepository.createMultiple(newUser.id, tagIds);
      const createdUser = { ...newUser, tagNames: user.tagNames };
      console.log("회원가입 성공:", createdUser);
      return createdUser;
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
