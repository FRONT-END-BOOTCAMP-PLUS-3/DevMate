/* eslint-disable @typescript-eslint/no-explicit-any */
import ApplicantDetails from "@/app/user/projects/[id]/_components/applicantDetails";

import type { Applicant } from "@/app/user/projects/[id]/_components/projectData";

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

const mockApplicant: Applicant = {
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
};

describe("ApplicantDetails", () => {
  it("지원자 정보가 없으면 '지원자 정보 없음'이 표시되는지 확인", () => {
    render(<ApplicantDetails applicant={null as any} />);

    expect(screen.getByText("지원자 정보 없음")).toBeInTheDocument();
  });

  it("지원자의 정보가 올바르게 렌더링되는지 확인", () => {
    render(<ApplicantDetails applicant={mockApplicant} />);

    expect(screen.getByText("자기소개")).toBeInTheDocument();
    expect(screen.getByText("안녕하세요. 저는 프론트엔드 개발자입니다.")).toBeInTheDocument();
  });

  it("포트폴리오 링크가 있는 경우 'PDF 열람하기'가 올바르게 렌더링되는지 확인", () => {
    render(<ApplicantDetails applicant={mockApplicant} />);

    const portfolioLink = screen.getByRole("link", { name: "PDF 열람하기" });
    expect(portfolioLink).toBeInTheDocument();
    expect(portfolioLink).toHaveAttribute("href", "https://example.com");
  });

  it("포트폴리오 링크가 없는 경우 '첨부파일 없음'이 표시되는지 확인", () => {
    const applicantWithoutPortfolio = { ...mockApplicant, portfolioUrl: "" };

    render(<ApplicantDetails applicant={applicantWithoutPortfolio} />);

    expect(screen.getByText("첨부파일 없음")).toBeInTheDocument();
  });
});
