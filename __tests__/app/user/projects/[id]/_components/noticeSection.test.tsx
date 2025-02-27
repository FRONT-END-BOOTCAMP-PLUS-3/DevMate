import NoticeSection from "@/app/user/projects/[id]/_components/noticeSection";

import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

describe("NoticeSection", () => {
  it("heading, content, button이 렌더링되는지", () => {
    render(<NoticeSection notices={[{ content: "내용" }]} />);

    expect(screen.getByText("📌 공지사항")).toBeInTheDocument();
    expect(screen.getByText("내용")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "수정" })).toBeInTheDocument();
  });

  it("수정 버튼을 누르면 content가 input박스로 변경되는지", async () => {
    render(<NoticeSection notices={[{ content: "내용" }]} />);

    const editButton = screen.getByRole("button", { name: "수정" });
    fireEvent.click(editButton);

    await waitFor(() => {
      expect(screen.getByRole("textbox")).toBeInTheDocument;
    });
  });

  it("수정 후 완료 버튼을 누르면 content가 p태그로 변경되는지", async () => {
    render(<NoticeSection notices={[{ content: "내용" }]} />);

    const editButton = screen.getByRole("button", { name: "수정" });
    fireEvent.click(editButton);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "수정된 내용" } });

    const completeButton = screen.getByRole("button", { name: "완료" });
    fireEvent.click(completeButton);

    await waitFor(() => {
      expect(screen.getByText("수정된 내용")).toBeInTheDocument;
    });
  });
});
