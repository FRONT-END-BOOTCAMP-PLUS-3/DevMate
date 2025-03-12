import { getEncryptionKey } from "@/utils/security";

import type { TagRepository } from "@/domain/repositories/tagRepository";
import type { UserRepository } from "@/domain/repositories/userRepository";

import type { InfoUserDto } from "./dtos/infoUserDto";
import type { UserWithTechStackDto } from "./dtos/userWithTechStackDto";

import crypto from "crypto";
export class UserInfoUsecase {
  private userRepository: UserRepository;
  private tagRepository: TagRepository;
  private encryptionKey: Buffer;
  private algorithm = "aes-256-cbc";
  constructor(userRepository: UserRepository, tagRepository: TagRepository) {
    this.userRepository = userRepository;
    this.tagRepository = tagRepository;
    this.encryptionKey = getEncryptionKey();
  }

  private decryptAddress(encryptedAddress: string): string {
    const iv = Buffer.from(encryptedAddress.slice(0, 32), "hex");
    const encryptedData = encryptedAddress.slice(32);
    const decipher = crypto.createDecipheriv(this.algorithm, this.encryptionKey, iv);

    const decrypted = decipher.update(encryptedData, "hex", "utf8") + decipher.final("utf8"); // 🔹 const 사용

    return decrypted;
  }
  async execute(userId: string): Promise<InfoUserDto> {
    try {
      const userData: UserWithTechStackDto | null = await this.userRepository.findByIdWithTechStack(userId);
      if (!userData) {
        throw new Error("사용자를 찾을 수 없습니다.");
      }
      const tagId = userData.techStackTags ? userData.techStackTags.map((tag) => Number(tag.tagId)) : [];
      const techStackTags = await this.tagRepository.findTagNamesByIds(tagId);
      const userInfo = {
        nonEditInfo: {
          name: userData.name || "",
          email: userData.email || "",
          gender: userData.gender
            ? userData.gender === "MALE"
              ? "남성"
              : userData.gender === "FEMALE"
                ? "여성"
                : "기타"
            : "",
          birthDate: userData.birthDate
            ? `${new Date(userData.birthDate).getFullYear()}년 ${new Date(userData.birthDate).getMonth() + 1}월 ${new Date(userData.birthDate).getDate()}일`
            : "생년월일이 입력되지 않았습니다.",
        },
        editInfo: {
          profileImg: userData.profileImg ? userData.profileImg : "/defaultProfile.svg",
          nickname: userData.nickname,
          career: userData.career,
          position: userData.position,
          techStackTags: techStackTags,
          address: userData.address ? this.decryptAddress(userData.address) : "",
        },
      };

      return userInfo;
    } catch (error) {
      console.log("사용자 정보를 가져오는 중 오류 발생:", error);
      throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
    }
  }
}
