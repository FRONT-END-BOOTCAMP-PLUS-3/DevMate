import { getEncryptionKey } from "@/utils/security";

import type { UserDto } from "@/application/usecases/dtos/userDto";
import type { TagRepository } from "@/domain/repositories/tagRepository";
import type { UserRepository } from "@/domain/repositories/userRepository";
import type { TechStackTagRepository } from "@/domain/repositories/techStackTagRepository";

import type { UserEditInfoDto } from "./dtos/infoUserDto";

import crypto from "crypto";
export class UpdateUserInfoUsecase {
  private userRepository: UserRepository;
  private tagRepository: TagRepository;
  private techStackTagRepository: TechStackTagRepository;
  private encryptionKey: Buffer;
  private algorithm = "aes-256-cbc";
  constructor(
    userRepository: UserRepository,
    tagRepository: TagRepository,
    techStackTagRepository: TechStackTagRepository,
  ) {
    this.userRepository = userRepository;
    this.tagRepository = tagRepository;
    this.techStackTagRepository = techStackTagRepository;
    this.encryptionKey = getEncryptionKey();
  }
  private encryptAddress(address: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.encryptionKey, iv);

    const encrypted = cipher.update(address, "utf8", "hex") + cipher.final("hex");
    return iv.toString("hex") + encrypted;
  }
  async execute(userId: string, userInfo: Partial<UserEditInfoDto>): Promise<UserDto> {
    try {
      const user = {
        profileImg: userInfo.profileImg,
        nickname: userInfo.nickname,
        career: userInfo.career,
        position: userInfo.position,
        address: userInfo.address ? this.encryptAddress(userInfo.address) : "",
      };

      const tagId = userInfo.techStackTags ? await this.tagRepository.getTagIds(userInfo.techStackTags) : [];

      await this.techStackTagRepository.createMultiple(userId, tagId);

      const updatedUser = await this.userRepository.update(userId, user);
      if (!updatedUser) {
        throw new Error("사용자 정보를 수정하는 데 실패했습니다.");
      }
      return updatedUser;
    } catch (error) {
      console.error("사용자 정보를 수정하는 중 오류 발생:", error);
      throw new Error("사용자 정보를 수정하는 데 실패했습니다.");
    }
  }
}
