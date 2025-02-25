import styles from "./RecruitmentDetail.module.scss";

import type { User } from "@/domain/entities/user";
import type { Comment } from "@/domain/entities/comment";
import type { Project } from "@/domain/entities/project";

import CommentForm from "./_components/CommentForm";
import CommentContentList from "./_components/CommentContentList";
import RecruitmentContent from "./_components/RecruitmentContent";

const RecruitmentDetail = () => {
  return (
    <div className={styles.container}>
      <RecruitmentContent project={exampleProject} />

      <CommentContentList project={exampleProject} />

      <CommentForm projectId={exampleProject.id} />
    </div>
  );
};

export default RecruitmentDetail;

const exampleUser: User = {
  id: "user123",
  email: "user123@example.com",
  name: "홍길동",
  nickname: "길동이",
  profileImg: "https://example.com/profile.jpg",
  createdAt: new Date(),
  address: "인천시 연수구",
  birthDate: new Date(2000, 9, 5),
  career: 5,
  gender: "MALE",
  position: "프론트",
  password: "",
};

const exampleComments: Comment[] = [
  {
    id: 1,
    userId: "user456",
    projectId: 1,
    content: "정말 좋은 프로젝트네요! 같이 하고 싶어요!",
    createdAt: new Date(),
    user: {
      id: "user456",
      email: "user456@example.com",
      name: "이몽룡",
      nickname: "몽룡",
      createdAt: new Date(),
      gender: "MALE",
    },
    replies: [
      {
        id: 2,
        userId: "user789",
        projectId: 1,
        parentCommentId: 1,
        content: "저도 관심 있습니다!",
        createdAt: new Date(),
        user: {
          id: "user789",
          email: "user789@example.com",
          name: "성춘향",
          nickname: "춘향이",
          createdAt: new Date(),
          gender: "FEMALE",
        },
      },
      {
        id: 3,
        userId: "user789",
        projectId: 1,
        parentCommentId: 1,
        content: "저도 관심 있습니다!",
        createdAt: new Date(),
        user: {
          id: "user789",
          email: "user789@example.com",
          name: "성춘향",
          nickname: "춘향이",
          createdAt: new Date(),
          gender: "MALE",
        },
      },
    ],
  },
];

const exampleProject: Project = {
  id: 1,
  leaderId: "user123",
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
