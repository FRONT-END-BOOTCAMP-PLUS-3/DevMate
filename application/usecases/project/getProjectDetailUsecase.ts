/* eslint-disable prettier/prettier */
// 오류가 계속 생겨서 이 파일에서만 프리티어를 비활성화 했습니다.
// 수정 시 유의해주세요
import { getEncryptionKey } from "@/utils/security";

import type { TagRepository } from "@/domain/repositories/tagRepository";
import type { ProjectRepository } from "@/domain/repositories/projectRepository";
import type { ProjectTagRepository } from "@/domain/repositories/projectTagRepository";

import type { ProjectTagDto } from "../dtos/projectTagDto";
import type { ProjectDetailDto } from "./dtos/projectDetailDto";
import type { ProjectDetailApplyDto } from "./dtos/projectDetailApplyDto";
import type { ProjectDetailMemberDto } from "./dtos/projectDetailMemberDto";

import crypto from "crypto";

export class GetProjectDetailUsecase {
  // eslint-disable-next-line prettier/prettier
  private encryptionKey: Buffer;
  private algorithm = "aes-256-cbc";
  constructor(
    private projectRepository: ProjectRepository,
    private tagRepository: TagRepository,
    private projectTagRepository: ProjectTagRepository,
  ) {
    this.encryptionKey = getEncryptionKey();
  }

  private decryptAddress(encryptedAddress: string): string {
    const iv = Buffer.from(encryptedAddress.slice(0, 32), "hex");
    const encryptedData = encryptedAddress.slice(32);
    const decipher = crypto.createDecipheriv(this.algorithm, this.encryptionKey, iv);

    const decrypted = decipher.update(encryptedData, "hex", "utf8") + decipher.final("utf8");

    return decrypted;
  }

  async execute(projectId: number): Promise<ProjectDetailDto | null> {
    try {
      const projectData: ProjectDetailDto | null = await this.projectRepository.findById(projectId);
      if (!projectData) return null;
      const tags: ProjectTagDto[] = await this.projectTagRepository.findByProjectId(projectId);
      const tagIds: number[] = tags.map((tag) => tag.tagId);
      const tagNames: string[] = await this.tagRepository.findTagNamesByIds(tagIds);

      return {
        id: projectData.id,
        leaderId: projectData.leaderId,
        recruitmentTitle: projectData.recruitmentTitle,
        projectTitle: projectData.projectTitle,
        goal: projectData.goal,
        description: projectData.description,
        projectPeriodStart: projectData.projectPeriodStart,
        projectPeriodEnd: projectData.projectPeriodEnd,
        recruitmentStart: projectData.recruitmentStart,
        recruitmentEnd: projectData.recruitmentEnd,
        notice: projectData.notice,
        leader: projectData.leader,
        applications: projectData.applications
          ?.filter((apply): apply is ProjectDetailApplyDto => apply != null)
          .filter((apply) => apply.user !== undefined)
          .map((apply) => ({
            id: apply.id,
            projectId: apply.projectId,
            userId: apply.userId,
            position: apply.position,
            introduction: apply.introduction,
            portfolioUrl: apply.portfolioUrl,
            status: apply.status,
            createdAt: apply.createdAt,
            user: apply.user
              ? {
                  ...apply.user,
                  address: apply.user.address ? this.decryptAddress(apply.user.address) : "주소 변환 실패",
                  gender:
                    apply.user.gender === "FEMALE" ? "여성" : apply.user.gender === "MALE" ? "남성" : "알 수 없음",
                }
              : undefined,
          })),

        members: projectData.members
          ?.filter((mem): mem is ProjectDetailMemberDto => mem != null)
          .map((mem) => ({
            id: mem.id,
            projectId: mem.projectId,
            userId: mem.userId,
            user: mem.user,
          })),
        projectTags: tagNames,
      };
    } catch (error) {
      console.log("Error executing GetProjectDetailUsecase:", error);
      return null;
    }
  }
}
