import { getEncryptionKey } from "@/utils/security";

import type { UserRepository } from "@/domain/repositories/userRepository";
import type { SignUpDto } from "@/application/usecases/auth/signup/dtos/signupDto";

import fs from "fs";
import path from "path";
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

  private saveProfileImage(profileImg: string, email: string): string {
    // 프로필 이미지를 저장할 디렉토리 경로를 설정합니다.
    const profileDir = path.join(process.cwd(), "public", "data", "profile");
    // 디렉토리가 존재하지 않으면 생성합니다.
    if (!fs.existsSync(profileDir)) {
      fs.mkdirSync(profileDir, { recursive: true });
    }
    // Base64 문자열을 버퍼로 변환합니다.
    const buffer = Buffer.from(profileImg.split(",")[1], "base64");
    // 파일 경로를 설정합니다.
    const filePath = path.join(profileDir, `${email}-profile.png`);
    // 파일을 씁니다.
    fs.writeFileSync(filePath, buffer);
    // 저장된 파일의 URL을 반환합니다.
    return `/data/profile/${email}-profile.png`;
  }

  public async execute(user: Omit<SignUpDto, "id" | "createdAt">): Promise<SignUpDto> {
    try {
      const { password, address, tagNames, profileImg, ...rest } = user; // 🔹 profileImg 추가
      const hashedPassword = await bcrypt.hash(password, 10);
      const encryptedAddress = this.encryptAddress(address);
      const profileImgUrl = profileImg ? this.saveProfileImage(profileImg, rest.email) : null; // 🔹 프로필 이미지 저장 로직 변경

      const userData = { ...rest, password: hashedPassword, address: encryptedAddress, profileImg: profileImgUrl };
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
