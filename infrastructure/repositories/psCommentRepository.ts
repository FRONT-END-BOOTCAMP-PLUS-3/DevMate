import type { CommentRepository } from "@/domain/repositories/CommentRepository";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PsCommentRepository implements CommentRepository {
  // 댓글 생성
  async create(userId: string, projectId: number, content: string, parentCommentId?: number) {
    try {
      const comment = await prisma.comment.create({
        data: {
          userId,
          projectId,
          content,
          parentCommentId,
        },
      });
      return comment;
    } catch (error) {
      throw new Error("댓글 생성에 실패했습니다.");
    } finally {
      await prisma.$disconnect();
    }
  }

  // 댓글 삭제
  async delete(id: number): Promise<void> {
    try {
      await prisma.comment.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error("댓글 삭제에 실패했습니다.");
    } finally {
      await prisma.$disconnect();
    }
  }
}
