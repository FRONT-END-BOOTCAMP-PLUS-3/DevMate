import type { ProjectRepository } from "@/domain/repositories/projectRepository";

import type { CommentDetailDto, RecruitmentDetailDto } from "./dtos/recruitmentDetailDto";

export class GetProjectDetailUsecase {
  constructor(private repository: ProjectRepository) {}

  async execute(id: number): Promise<RecruitmentDetailDto | null> {
    const project = (await this.repository.findById(id)) as RecruitmentDetailDto | null;

    if (!project) return null;

    return {
      id: project.id,
      projectTitle: project.projectTitle,
      recruitmentTitle: project.recruitmentTitle,
      goal: project.goal,
      description: project.description,
      projectPeriodStart: new Date(project.projectPeriodStart),
      projectPeriodEnd: new Date(project.projectPeriodEnd),
      recruitmentStart: new Date(project.recruitmentStart),
      recruitmentEnd: new Date(project.recruitmentEnd),
      createdAt: new Date(project.createdAt),
      leader: {
        id: project.leader.id,
        nickname: project.leader.nickname,
        profileImg: project.leader.profileImg,
      },
      comments: mapCommentsWithReplies(project.comments),
      likes: project.likes,
      leaderId: project.leaderId,
      hits: project.hits,
      notice: project.notice,
    };
  }
}

/**
 * 댓글을 계층 구조로 변환하는 함수
 */
function mapCommentsWithReplies(comments: any[]): CommentDetailDto[] {
  const commentMap = new Map<number, CommentDetailDto>();

  // 댓글을 먼저 객체로 변환하여 저장
  comments.forEach((comment) => {
    commentMap.set(comment.id, {
      id: comment.id,
      userId: comment.userId,
      projectId: comment.projectId,
      parentCommentId: comment.parentCommentId,
      content: comment.content,
      createdAt: new Date(comment.createdAt),
      replies: [],
      user: {
        id: comment.userId,
        nickname: comment.user.nickname,
        profileImg: comment.user.profileImg,
      },
    });
  });

  const rootComments: CommentDetailDto[] = [];

  // 각 댓글을 순회하면서 대댓글을 부모 댓글에 추가
  commentMap.forEach((comment) => {
    if (comment.parentCommentId) {
      const parentComment = commentMap.get(comment.parentCommentId);
      if (parentComment) {
        parentComment.replies.push(comment);
      }
    } else {
      rootComments.push(comment);
    }
  });

  return rootComments;
}
