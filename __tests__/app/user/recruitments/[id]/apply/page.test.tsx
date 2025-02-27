import { vi, describe, it, expect } from "vitest";
import Apply from "@/app/user/recruitments/[id]/apply/page";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Apply Component", () => {
  it("컴포넌트가 정상적으로 렌더링되어야 한다", () => {
    render(<Apply />);

    expect(screen.getByText("프로젝트 지원서 작성")).toBeInTheDocument();
    expect(screen.getByText("희망하는 직무")).toBeInTheDocument();
    expect(screen.getByText("자기소개 (개발 역량 등)")).toBeInTheDocument();
    expect(screen.getByText("포트폴리오 (선택 사항)")).toBeInTheDocument();
    expect(screen.getByText("취소")).toBeInTheDocument();
    expect(screen.getByText("제출")).toBeInTheDocument();
  });

  it("입력 필드 변경 시 값이 업데이트되어야 한다", () => {
    render(<Apply />);

    const jobInput = screen.getByPlaceholderText("ex) 프론트엔드 개발자");
    fireEvent.change(jobInput, { target: { value: "프론트엔드 개발자" } });

    expect((jobInput as HTMLInputElement).value).toBe("프론트엔드 개발자");
  });
});
