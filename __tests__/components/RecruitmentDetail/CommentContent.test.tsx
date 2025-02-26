import type { Comment } from "@/domain/entities/comment";

import CommentContent from "../../../app/(anon)/recruitments/[id]/_components/CommentContent";

import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

const mockComment: Comment = {
  id: 1,
  user: {
    id: "1",
    email: "test@example.com",
    password: "password",
    name: "길동이",
    nickname: "길동이",
    profileImg: "",
    address: "Seoul",
    birthDate: new Date(),
    gender: "male",
    position: "Developer",
    career: 5,
    createdAt: new Date(),
  },
  content: "테스트 댓글",
  createdAt: new Date(),
  projectId: 1,
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
