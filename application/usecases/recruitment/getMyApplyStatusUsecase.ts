/* eslint-disable prettier/prettier */
// 오류가 계속 생겨서 이 파일에서만 프리티어를 비활성화 했습니다.
// 수정 시 유의해주세요
import { getEncryptionKey } from "@/utils/security";

import type { ApplyRepository } from "@/domain/repositories/applyRepository";

import type { MyApplyDto } from "./dtos/myApply/myApplyDto";

import crypto from "crypto";

export class GetMyApplyStatusUsecase {
  private encryptionKey: Buffer;
  private algorithm = "aes-256-cbc";
  constructor(private applyRepository: ApplyRepository) {
    this.encryptionKey = getEncryptionKey();
  }

  private decryptAddress(encryptedAddress: string): string {
    const iv = Buffer.from(encryptedAddress.slice(0, 32), "hex");
    const encryptedData = encryptedAddress.slice(32);
    const decipher = crypto.createDecipheriv(this.algorithm, this.encryptionKey, iv);

    const decrypted = decipher.update(encryptedData, "hex", "utf8") + decipher.final("utf8");

    return decrypted;
  }

  async execute(userId: string): Promise<MyApplyDto[]> {
    try {
      const applyData: MyApplyDto[] = await this.applyRepository.findByUserId(userId);
      const transformedApplyData = applyData.map((app) => {
        return {
          id: app.id,
          projectId: app.projectId,
          userId: app.userId,
          position: app.position,
          introduction: app.introduction,
          portfolioUrl: app.portfolioUrl,
          status: app.status === "WAITING" ? "수락대기" : app.status === "ACCEPT" ? "수락됨" : "거절됨",
          createdAt: app.createdAt,
          project: app.project,
          user: app.user
            ? {
                ...app.user,
                address: app.user.address ? this.decryptAddress(app.user.address) : "주소 변환 실패",
                gender: app.user.gender === "FEMALE" ? "여성" : app.user.gender === "MALE" ? "남성" : "알 수 없음",
              }
            : undefined,
        };
      });

      return transformedApplyData;
    } catch (error) {
      console.log("Error executing GetMyApplyStatusUsecase:", error);
      return [];
    }
  }
}
