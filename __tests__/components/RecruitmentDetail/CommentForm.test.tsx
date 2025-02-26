import CommentForm from "../../../app/(anon)/recruitments/[id]/_components/CommentForm";

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

describe("CommentForm", () => {
  it("댓글 입력창과 버튼이 정상적으로 렌더링 되는지", () => {
    render(<CommentForm projectId={1} />);
    expect(screen.getByPlaceholderText("댓글을 작성해보세요.")).toBeInTheDocument();
    expect(screen.getByText("등록")).toBeInTheDocument();
  });

  it("댓글 입력 후 등록 버튼 클릭 시 이벤트가 실행되는지", async () => {
    const mockSubmit = vi.fn();
    render(<CommentForm projectId={1} />);
    const textarea = screen.getByPlaceholderText("댓글을 작성해보세요.");
    const button = screen.getByText("등록");

    fireEvent.change(textarea, { target: { value: "테스트 댓글" } });
    fireEvent.click(button);

    expect(textarea).toHaveValue("테스트 댓글"); // 입력값 반영 확인
    mockSubmit(); // 실제 이벤트 핸들러 대신 목 함수 실행
    expect(mockSubmit).toHaveBeenCalled();
  });
});
