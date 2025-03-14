// import RecruitmentContent from "@/app/(anon)/recruitments/[id]/_components/recruitmentContent";

// import type { RecruitmentDetailDto } from "@/application/usecases/recruitment/dtos/recruitmentDetailDto";

// import { describe, expect, it } from "vitest";
// import { render, screen } from "@testing-library/react";

// const exampleRecruitmentDetail: RecruitmentDetailDto = {
//   id: 1,
//   leaderId: "leader123",
//   recruitmentTitle: "프론트엔드 개발자 모집",
//   projectTitle: "웹 서비스 개발 프로젝트",
//   goal: "React 기반 웹 서비스 개발",
//   description: "팀원들과 협업하여 프로젝트를 진행합니다.",
//   projectPeriodStart: new Date("2024-10-01"),
//   projectPeriodEnd: new Date("2025-03-31"),
//   recruitmentStart: new Date("2024-09-15"),
//   recruitmentEnd: new Date("2024-09-30"),
//   hits: 100,
//   createdAt: new Date("2024-09-15"),
//   notice: "매주 회의 진행 예정",

//   leader: {
//     id: "leader123",
//     nickname: "팀장",
//     profileImg: "https://example.com/profile/leader123.jpg",
//   },

//   comments: [
//     {
//       id: 1,
//       userId: "user456",
//       projectId: 1,
//       parentCommentId: null,
//       content: "이 프로젝트에 참여하고 싶습니다!",
//       createdAt: new Date("2024-09-16"),
//       user: {
//         id: "user456",
//         nickname: "개발자1",
//         profileImg: "https://example.com/profile/user456.jpg",
//       },
//       replies: [
//         {
//           id: 2,
//           userId: "leader123",
//           projectId: 1,
//           parentCommentId: 1,
//           content: "지원해 주셔서 감사합니다! DM 주세요.",
//           createdAt: new Date("2024-09-17"),
//           user: {
//             id: "leader123",
//             nickname: "팀장",
//             profileImg: "https://example.com/profile/leader123.jpg",
//           },
//           replies: [],
//         },
//       ],
//     },
//   ],

//   likes: [
//     {
//       id: 1,
//       userId: "user789",
//       projectId: 1,
//       createdAt: new Date("2024-09-18"),
//     },
//   ],
// };

// describe("CommentContent", () => {
//   it("모집글 상세 글이 정상적으로 렌더링 되는지 확인", () => {
//     render(<RecruitmentContent project={exampleRecruitmentDetail} />);
//     expect(screen.getByText("웹 서비스 개발 프로젝트")).toBeInTheDocument();
//     expect(screen.getByText("팀원들과 협업하여 프로젝트를 진행합니다.")).toBeInTheDocument();
//   });

//   it("지원하기 버튼을 누르면 apply 페이지로 이동 되는지", () => {
//     render(<RecruitmentContent project={exampleRecruitmentDetail} />);

//     const applyButton = screen.getByRole("button", { name: /지원하기/i });
//     const applyLink = applyButton.querySelector("a");

//     expect(applyButton).toBeInTheDocument();
//     expect(applyLink).toHaveAttribute("href", "/user/recruitments/1/apply");
//   });
// });
