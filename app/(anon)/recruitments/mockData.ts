export const mockData = [
  {
    id: 1, // 모집글 id
    leaderId: "leader123", // 리더 id
    recruitmentTitle: "프론트엔드 개발자 모집", // 모집글 제목
    description: "팀원들과 협업하여 프로젝트를 진행합니다.", // 모집글 설명
    hits: 100, // 조회수 개수
    createdAt: new Date("2025-03-01 14:23:37"), // 업로드 날짜
    leader: {
      id: "leader123", // 리더 id
      nickname: "hhi9037", // 리더 닉네임
    },
    recruitmentStart: new Date("2025-03-01 14:23:37"),
    recruitmentEnd: new Date("2025-03-03 14:23:37"),
    projectTags: [
      { id: 1, projectTags: "프론트엔드" },
      { id: 2, projectTags: "포트폴리오" },
    ],
    comments: [
      {
        id: 1,
        userId: "user456",
        projectId: 1,
        parentCommentId: null,
        content: "이 프로젝트에 참여하고 싶습니다!",
        createdAt: new Date("2024-09-16"),
      },
    ],
    likes: [
      {
        id: 1,
        userId: "user789",
        projectId: 1,
        createdAt: new Date("2024-09-18"),
      },
      {
        id: 2,
        userId: "user123",
        projectId: 1,
        createdAt: new Date("2024-09-18"),
      },
    ],
  },
  {
    id: 2, // 모집글 id (중복 방지)
    leaderId: "leader456",
    recruitmentTitle: "백엔드 개발자 모집",
    description: "서버 개발을 함께할 팀원을 모집합니다.",
    hits: 50,
    createdAt: new Date("2025-03-02 14:23:37"),
    leader: {
      id: "leader456",
      nickname: "코딩마스터",
    },
    recruitmentStart: new Date("2025-03-02 14:23:37"),
    recruitmentEnd: new Date("2025-03-20 16:21:37"),
    projectTags: [
      { id: 3, projectTags: "백엔드" },
      { id: 4, projectTags: "Node.js" },
    ],
    comments: [
      {
        id: 2,
        userId: "user123",
        projectId: 2,
        parentCommentId: null,
        content: "백엔드 개발자로 지원하고 싶습니다.",
        createdAt: new Date("2024-09-21"),
      },
      {
        id: 3,
        userId: "user235",
        projectId: 2,
        parentCommentId: null,
        content: "백엔드 개발자로 지원하고 싶습니다.",
        createdAt: new Date("2024-09-21"),
      },
    ],
    likes: [
      {
        id: 3,
        userId: "user999",
        projectId: 2,
        createdAt: new Date("2024-09-22"),
      },
    ],
  },
];
