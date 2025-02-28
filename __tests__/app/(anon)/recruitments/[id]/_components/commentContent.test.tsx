import CommentContent from "@/app/(anon)/recruitments/[id]/_components/commentContent";

import type { CommentDetailDto } from "@/application/usecases/recruitment/dtos/recruitmentDetailDto";

import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

const mockComment: CommentDetailDto = {
  id: 1,
  userId: "1",
  user: {
    id: "1",
    nickname: "길동이",
    profileImg: "https://example.com/profile.jpg",
  },
  projectId: 1,
  parentCommentId: null,
  content: "테스트 댓글",
  createdAt: new Date(),
  replies: [], // 대댓글 없음
};

describe("CommentContent", () => {
  it("댓글 내용이 정상적으로 렌더링 되는지", () => {
    render(<CommentContent comment={mockComment} />);
    expect(screen.getByText("테스트 댓글")).toBeInTheDocument();
    expect(screen.getByText("길동이")).toBeInTheDocument();
  });

  it("대댓글 버튼 클릭 시 폼이 나타나는지", () => {
    render(<CommentContent comment={mockComment} />);

    // 대댓글 버튼을 클릭
    const replyButton = screen.getByText("대댓글");
    fireEvent.click(replyButton);

    // 폼에 포함된 "등록"과 "취소" 버튼이 있는지 확인
    const submitButton = screen.getByRole("button", { name: /등록/i });
    const cancelButton = screen.getByRole("button", { name: /취소/i });

    // 폼이 나타나고 버튼들이 제대로 렌더링 되는지 확인
    expect(submitButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });
});
