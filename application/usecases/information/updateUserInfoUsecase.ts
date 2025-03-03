import { getEncryptionKey } from "@/utils/security";

import type { UserDto } from "@/application/usecases/dtos/userDto";
import type { UserRepository } from "@/domain/repositories/userRepository";

import type { UserEditInfoDto } from "./dtos/infoUserDto";

import crypto from "crypto";
export class UpdateUserInfoUsecase {
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

    const encrypted = cipher.update(address, "utf8", "hex") + cipher.final("hex");
    return iv.toString("hex") + encrypted;
  }
  async execute(userId: string, userInfo: Partial<UserEditInfoDto>): Promise<UserDto> {
    const user = {
      profileImg: userInfo.profileImg,
      nickname: userInfo.nickname,
      career: userInfo.career,
      position: userInfo.position,
      address: userInfo.address ? this.encryptAddress(userInfo.address) : "",
    };
    // techStackTags: userInfo.techStackTags,
    const updatedUser = await this.userRepository.update(userId, user);
    if (!updatedUser) {
      throw new Error("사용자 정보를 수정하는 데 실패했습니다.");
    }
    return updatedUser;
  }
}
