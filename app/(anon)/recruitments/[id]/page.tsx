import styles from "./recruitmentDetail.module.scss";

import type { RecruitmentDetailDto } from "@/application/usecases/recruitment/dtos/recruitmentDetailDto";

import CommentForm from "./_components/commentForm";
import CommentContentList from "./_components/commentContentList";
import RecruitmentContent from "./_components/recruitmentContent";

const RecruitmentDetail = () => {
  return (
    <div className={styles.container}>
      <RecruitmentContent project={exampleRecruitmentDetail} />

      <CommentContentList comments={exampleRecruitmentDetail.comments} />

      <CommentForm projectId={exampleRecruitmentDetail.id} />
    </div>
  );
};

export default RecruitmentDetail;

const exampleRecruitmentDetail: RecruitmentDetailDto = {
  id: 1,
  leaderId: "leader123",
  recruitmentTitle: "프론트엔드 개발자 모집",
  projectTitle: "웹 서비스 개발 프로젝트",
  goal: "React 기반 웹 서비스 개발",
  description: "팀원들과 협업하여 프로젝트를 진행합니다.",
  projectPeriodStart: new Date("2024-10-01"),
  projectPeriodEnd: new Date("2025-03-31"),
  recruitmentStart: new Date("2024-09-15"),
  recruitmentEnd: new Date("2024-09-30"),
  hits: 100,
  createdAt: new Date("2024-09-15"),
  notice: "매주 회의 진행 예정",

  leader: {
    id: "leader123",
    nickname: "팀장",
    profileImg: "https://example.com/profile/leader123.jpg",
  },

  comments: [
    {
      id: 1,
      userId: "user456",
      projectId: 1,
      parentCommentId: null,
      content: "이 프로젝트에 참여하고 싶습니다!",
      createdAt: new Date("2024-09-16"),
      user: {
        id: "user456",
        nickname: "개발자1",
        profileImg: "https://example.com/profile/user456.jpg",
      },
      replies: [
        {
          id: 2,
          userId: "leader123",
          projectId: 1,
          parentCommentId: 1,
          content: "지원해 주셔서 감사합니다! DM 주세요.",
          createdAt: new Date("2024-09-17"),
          user: {
            id: "leader123",
            nickname: "팀장",
            profileImg: "https://example.com/profile/leader123.jpg",
          },
          replies: [],
        },
      ],
    },
  ],

  likes: [
    {
      id: 1,
      userId: "user789",
      projectId: 1,
      createdAt: new Date("2024-09-18"),
    },
  ],
};
