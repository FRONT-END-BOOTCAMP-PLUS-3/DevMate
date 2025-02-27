import styles from "./RecruitmentDetail.module.scss";

import type {
  CommentDto,
  ProjectDetailDto,
  UserNicknameDto,
} from "@/application/usecases/projectDetail/dtos/projectDetailDto";

import CommentForm from "./_components/CommentForm";
import CommentContentList from "./_components/CommentContentList";
import RecruitmentContent from "./_components/RecruitmentContent";

const RecruitmentDetail = () => {
  return (
    <div className={styles.container}>
      <RecruitmentContent project={exampleProject} />

      <CommentContentList comments={exampleProject.comments} />

      <CommentForm projectId={exampleProject.id} />
    </div>
  );
};

export default RecruitmentDetail;

const exampleUser: UserNicknameDto = {
  id: "user123",
  nickname: "길동이",
};

const exampleComments: CommentDto[] = [
  {
    id: 1,
    projectId: 1,
    content: "정말 좋은 프로젝트네요! 같이 하고 싶어요!",
    createdAt: new Date(),
    user: {
      id: "user456",
      nickname: "몽룡",
    },
    replies: [
      {
        id: 2,
        projectId: 1,
        parentCommentId: 1,
        content: "저도 관심 있습니다!",
        createdAt: new Date(),
        user: {
          id: "user789",
          nickname: "춘향이",
        },
      },
      {
        id: 3,
        projectId: 1,
        parentCommentId: 1,
        content: "저도 관심 있습니다!",
        createdAt: new Date(),
        user: {
          id: "user785",
          nickname: "춘향이",
        },
      },
    ],
  },
];

const exampleProject: ProjectDetailDto = {
  id: 1,
  recruitmentTitle: "함께 성장할 프론트엔드 개발자를 모집합니다!",
  projectTitle: "스터디 관리 플랫폼",
  goal: "개발자들을 위한 효율적인 스터디 관리 시스템 구축",
  description: "이 프로젝트는 스터디 그룹을 쉽게 만들고 관리할 수 있도록 돕는 웹 애플리케이션입니다.",
  projectPeriodStart: new Date("2025-03-01"),
  projectPeriodEnd: new Date("2025-06-30"),
  recruitmentStart: new Date("2025-02-20"),
  recruitmentEnd: new Date("2025-02-29"),
  like: 12,
  hits: 150,
  createdAt: new Date(),
  leader: exampleUser,
  comments: exampleComments,
};
