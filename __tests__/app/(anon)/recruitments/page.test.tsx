import { describe, it, expect } from "vitest";
import Recruitments from "@/app/(anon)/recruitments/page";
import { render, screen, fireEvent } from "@testing-library/react";

// Recruitments 컴포넌트가 정상적으로 렌더링되는지 확인
describe("Recruitments Component", () => {
  it("비주얼 영역 텍스트가 올바르게 렌더링되는지 확인", () => {
    render(<Recruitments />);
    expect(screen.getByText("프로젝트 팀원을 모집해보세요.")).toBeInTheDocument();
    expect(screen.getByText("협업을 통한 경험 노하우 쌓기")).toBeInTheDocument();
  });

  it("필터 버튼들이 렌더링되는지 확인", () => {
    render(<Recruitments />);
    expect(screen.getByText("전체")).toBeInTheDocument();
    expect(screen.getByText("모집중")).toBeInTheDocument();
    expect(screen.getByText("모집완료")).toBeInTheDocument();
  });

  it("검색창과 검색 버튼이 렌더링되는지 확인", () => {
    render(<Recruitments />);
    expect(screen.getByPlaceholderText("팀 프로젝트, 사이드 프로젝트를 검색해보세요!")).toBeInTheDocument();
    expect(screen.getByText("검색")).toBeInTheDocument();
  });

  it("태그검색창과 초기화 버튼이 렌더링되는지 확인", () => {
    render(<Recruitments />);
    expect(screen.getByPlaceholderText("태그로 검색해보세요!")).toBeInTheDocument();
    expect(screen.getByText("초기화")).toBeInTheDocument();
  });

  it("정렬 버튼들이 렌더링되는지 확인", () => {
    render(<Recruitments />);
    expect(screen.getByText("• 최신순")).toBeInTheDocument();
    expect(screen.getByText("• 조회수순")).toBeInTheDocument();
    expect(screen.getByText("• 댓글많은순")).toBeInTheDocument();
    expect(screen.getByText("• 좋아요순")).toBeInTheDocument();
  });

  it("글쓰기 버튼이 렌더링되는지 확인", () => {
    render(<Recruitments />);
    expect(screen.getByText("글쓰기")).toBeInTheDocument();
  });
});
