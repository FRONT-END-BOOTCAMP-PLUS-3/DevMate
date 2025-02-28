import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RecruitmentDetail from "@/app/(anon)/recruitments/[id]/page";

describe("RecruitmentDetail", () => {
  it("모집글 컴포넌트가 정상적으로 렌더링 되는지", () => {
    render(<RecruitmentDetail />);
    expect(screen.getByText("작성일", { exact: false })).toBeInTheDocument();
  });

  it("댓글 리스트가 정상적으로 렌더링 되는지", () => {
    render(<RecruitmentDetail />);
    const commentElements = screen.getAllByText("댓글", { exact: false });
    expect(commentElements.length).toBeGreaterThan(0);
  });
});
