export interface User {
  id: number;
  name: string;
  gender: "Male" | "Female";
  birthDate: string; // ISO 8601 형식 (YYYY-MM-DDTHH:mm:ssZ)
  position: string;
  address: string;
  career: number;
}

export interface Notice {
  id: number;
  content: string;
}

export interface Applicant {
  id: number;
  position: string;
  introduction: string;
  portfolioUrl: string;
  status: "accept" | "waiting" | "reject";
  user: User;
}

export interface Member {
  id: number;
  user: {
    id: number;
    name: string;
    position: string;
  };
}

export interface Project {
  id: number;
  recruitmentTitle: string;
  projectTitle: string;
  goal: string;
  description: string;
  projectPeriodStart: string; // ISO 8601 형식
  projectPeriodEnd: string;
  recruitmentStart: string;
  recruitmentEnd: string;
  createdAt: string;
  leader: {
    id: number;
    name: string;
  };
  notices: Notice[];
  applications: Applicant[];
  member: Member[];
}

// projectData
const projectData: Project[] = [
  {
    id: 1,
    recruitmentTitle: "프론트엔드 개발자 모집",
    projectTitle: "멋쟁이 사자🦁 만들기 프로젝트",
    goal: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    description: "We are building a new e-commerce platform with modern web technologies.",
    projectPeriodStart: "2024-03-01T00:00:00Z",
    projectPeriodEnd: "2024-09-01T00:00:00Z",
    recruitmentStart: "2024-02-15T00:00:00Z",
    recruitmentEnd: "2024-03-10T00:00:00Z",
    createdAt: "2024-02-01T12:00:00Z",
    leader: {
      id: 1,
      name: "John Doe",
    },
    notices: [{ id: 1, content: "Kickoff meeting on March 5th." }],
    applications: [
      {
        id: 1,
        position: "프론트엔드 희망",
        introduction: "안녕하세요. 저는 프론트엔드 개발자입니다.",
        portfolioUrl: "https://example.com",
        status: "accept",
        user: {
          id: 1,
          name: "Monica",
          gender: "Female",
          birthDate: "1996-09-01T00:00:00Z",
          position: "프론트엔드",
          address: "부산광역시 동래구",
          career: 3,
        },
      },
      {
        id: 2,
        position: "백엔드 희망",
        introduction: "안녕하세요. 저는 백엔드 개발자입니다.",
        portfolioUrl: "https://example.com",
        status: "waiting",
        user: {
          id: 4,
          name: "Chandler",
          gender: "Male",
          birthDate: "1996-09-01T00:00:00Z",
          position: "백엔드",
          address: "캘리포니아주",
          career: 3,
        },
      },
      {
        id: 3,
        position: "디자이너 희망",
        introduction: "안녕하세요. 저는 디자이너입니다.",
        portfolioUrl: "https://example.com",
        status: "reject",
        user: {
          id: 4,
          name: "Pheobe",
          gender: "Female",
          birthDate: "1996-09-01T00:00:00Z",
          position: "디자이너",
          address: "서울특별시 동대문구",
          career: 0,
        },
      },
      {
        id: 4,
        position: "머신러닝 희망",
        introduction: "안녕하세요. 저는 머신러닝 개발자입니다.",
        portfolioUrl: "https://example.com",
        status: "accept",
        user: {
          id: 4,
          name: "Joey",
          gender: "Female",
          birthDate: "1996-09-01T00:00:00Z",
          position: "머신러닝",
          address: "서울특별시 중구",
          career: 3,
        },
      },
    ],
    member: [
      {
        id: 1,
        user: {
          id: 1,
          name: "Monica",
          position: "프론트엔드",
        },
      },
      {
        id: 2,
        user: {
          id: 4,
          name: "Joey",
          position: "머신러닝",
        },
      },
    ],
  },
  {
    id: 2,
    recruitmentTitle: "백엔드 개발자 모집",
    projectTitle: "AI 챗봇 만들기 프로젝트",
    goal: "이 프로젝트의 목표는 자연어 처리 기술을 활용하여 AI 기반 챗봇을 개발하는 것입니다. 최신 LLM 모델을 활용하여 사용자와 자연스러운 대화를 가능하게 합니다.",
    description: "We are developing an AI chatbot with cutting-edge NLP technology.",
    projectPeriodStart: "2024-04-01T00:00:00Z",
    projectPeriodEnd: "2024-10-01T00:00:00Z",
    recruitmentStart: "2024-03-10T00:00:00Z",
    recruitmentEnd: "2024-04-05T00:00:00Z",
    createdAt: "2024-03-01T10:00:00Z",
    leader: {
      id: 2,
      name: "Alice Johnson",
    },
    notices: [{ id: 2, content: "프로젝트 킥오프 미팅이 4월 10일에 진행됩니다." }],
    applications: [
      {
        id: 5,
        position: "백엔드 희망",
        introduction: "안녕하세요. 저는 백엔드 개발자입니다.",
        portfolioUrl: "https://example.com",
        status: "waiting",
        user: {
          id: 5,
          name: "Ross",
          gender: "Male",
          birthDate: "1995-05-10T00:00:00Z",
          position: "백엔드",
          address: "서울특별시 강남구",
          career: 4,
        },
      },
      {
        id: 6,
        position: "프론트엔드 희망",
        introduction: "안녕하세요. 저는 프론트엔드 개발자입니다.",
        portfolioUrl: "https://example.com",
        status: "waiting",
        user: {
          id: 6,
          name: "Rachel",
          gender: "Female",
          birthDate: "1997-08-25T00:00:00Z",
          position: "프론트엔드",
          address: "서울특별시 서초구",
          career: 2,
        },
      },
      {
        id: 7,
        position: "디자이너 희망",
        introduction: "안녕하세요. 저는 UX/UI 디자이너입니다.",
        portfolioUrl: "https://example.com",
        status: "reject",
        user: {
          id: 7,
          name: "Gunther",
          gender: "Male",
          birthDate: "1994-12-15T00:00:00Z",
          position: "디자이너",
          address: "경기도 성남시",
          career: 5,
        },
      },
    ],
    member: [],
  },
];

export default projectData;
