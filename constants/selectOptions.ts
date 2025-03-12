import type { SelectOption } from "@/types";

export const BIRTH_YEAR_OPTIONS: SelectOption[] = Array.from(
  { length: new Date().getFullYear() - 1970 + 1 },
  (_, i) => {
    const year = new Date().getFullYear() - i;
    return { value: year, label: `${year}년` };
  },
);

export const BIRTH_MONTH_OPTIONS: SelectOption[] = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1}월`,
}));

export const BIRTH_DAY_OPTIONS: SelectOption[] = Array.from({ length: 31 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1}일`,
}));

export const CAREER_EXP_OPTIONS: SelectOption[] = [
  { value: "student", label: "학생" },
  { value: "job-seeker", label: "취준생" },
  { value: 0, label: "신입 (0년)" },
  { value: 1, label: "1년" },
  { value: 2, label: "2년" },
  { value: 3, label: "3년" },
  { value: 4, label: "4년" },
  { value: 5, label: "5년" },
  { value: 6, label: "6년" },
  { value: 7, label: "7년" },
  { value: 8, label: "8년" },
  { value: 9, label: "9년" },
  { value: 10, label: "10년 이상" },
] as const;

export const POSITION_OPTIONS: SelectOption[] = [
  { value: "frontend", label: "프론트엔드 개발자" },
  { value: "backend", label: "백엔드 개발자" },
  { value: "fullstack", label: "풀스택 개발자" },
  { value: "mobile-ios", label: "IOS 개발자" },
  { value: "mobile-Android", label: "Android 개발자" },
  { value: "data-engineer", label: "데이터 엔지니어" },
  { value: "ML-engineer", label: "머신러닝 엔지니어" },
  { value: "security", label: "보안 엔지니어" },
  { value: "game-dev", label: "게임 개발자" },
  { value: "embedded", label: "임베디드 소프트웨어 엔지니어" },
  { value: "system", label: "시스템 엔지니어" },
  { value: "database-manager", label: "데이터베이스 관리자" },

  // { value: "devops", label: "DevOps 엔지니어" }, // DevOps 엔지니어
  // { value: "qa", label: "QA 엔지니어" }, // 품질 보증(QA) 엔지니어
] as const;

export const TECH_STACK_OPTIONS: SelectOption[] = [
  // 🖥️ 프로그래밍 언어
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "cpp", label: "C++" },
  { value: "go", label: "Go" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "ruby", label: "Ruby" },
  { value: "rust", label: "Rust" },
  { value: "php", label: "PHP" },

  // ⚛️ 프론트엔드 기술
  { value: "react", label: "React" },
  { value: "nextjs", label: "Next.js" },
  { value: "vue", label: "Vue.js" },
  { value: "nuxtjs", label: "Nuxt.js" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
  { value: "solidjs", label: "Solid.js" },

  // 🔥 백엔드 기술
  { value: "nodejs", label: "Node.js" },
  { value: "express", label: "Express.js" },
  { value: "nestjs", label: "NestJS" },
  { value: "spring", label: "Spring Boot" },
  { value: "django", label: "Django" },
  { value: "flask", label: "Flask" },
  { value: "fastapi", label: "FastAPI" },
  { value: "rails", label: "Ruby on Rails" },
  { value: "dotnet", label: ".NET" },

  // 🛢️ 데이터베이스
  { value: "mysql", label: "MySQL" },
  { value: "postgresql", label: "PostgreSQL" },
  { value: "mongodb", label: "MongoDB" },
  { value: "firebase", label: "Firebase" },
  { value: "redis", label: "Redis" },
  { value: "sqlite", label: "SQLite" },
  { value: "dynamodb", label: "DynamoDB" },

  // ☁️ 클라우드 & DevOps
  { value: "aws", label: "AWS" },
  { value: "gcp", label: "Google Cloud Platform" },
  { value: "azure", label: "Azure" },
  { value: "docker", label: "Docker" },
  { value: "kubernetes", label: "Kubernetes" },
  { value: "terraform", label: "Terraform" },
  { value: "jenkins", label: "Jenkins" },
  { value: "github-actions", label: "GitHub Actions" },
  { value: "gitlab-ci", label: "GitLab CI/CD" },

  // 🧠 머신러닝 & 데이터
  { value: "tensorflow", label: "TensorFlow" },
  { value: "pytorch", label: "PyTorch" },
  { value: "scikit-learn", label: "Scikit-Learn" },
  { value: "pandas", label: "Pandas" },
  { value: "numpy", label: "NumPy" },

  // 🎮 게임 개발
  { value: "unity", label: "Unity" },
  { value: "unreal", label: "Unreal Engine" },
  { value: "godot", label: "Godot" },

  // 기타 기술
  { value: "graphql", label: "GraphQL" },
  { value: "restapi", label: "REST API" },
  { value: "websocket", label: "WebSocket" },
  { value: "electron", label: "Electron" },
] as const;
