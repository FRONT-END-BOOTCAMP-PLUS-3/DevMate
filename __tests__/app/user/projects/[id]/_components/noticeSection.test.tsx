import NoticeSection from "@/app/user/projects/[id]/_components/noticeSection";

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

describe("NoticeSection", () => {
  const updateNotice = vi.fn();

  it("leader일 경우 heading, content, button이 렌더링되는지", () => {
    render(<NoticeSection notice="공지내용" updateNotice={updateNotice} userRole="leader" />);

    expect(screen.getByText("📌 공지사항")).toBeInTheDocument();
    expect(screen.getByText("공지내용")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "수정" })).toBeInTheDocument();
  });

  it("button을 누르면 content가 input박스로 변경되는지", async () => {
    render(<NoticeSection notice="공지내용" updateNotice={updateNotice} userRole="leader" />);

    const editButton = screen.getByRole("button", { name: "수정" });
    fireEvent.click(editButton);

    await waitFor(() => {
      expect(screen.getByRole("textbox")).toBeInTheDocument;
    });
  });

  it("수정 후 완료 button을 누르면 updateNotice 함수가 호출되는지 확인", () => {
    render(<NoticeSection notice="공지내용" updateNotice={updateNotice} userRole="leader" />);

    fireEvent.click(screen.getByRole("button", { name: "수정" }));
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "수정된 내용" } });
    fireEvent.click(screen.getByRole("button", { name: "완료" }));

    expect(updateNotice).toHaveBeenCalledTimes(1);
    expect(updateNotice).toHaveBeenCalledWith("수정된 내용");
  });

  it("member일 경우 heading, content만 렌더링되는지", () => {
    render(<NoticeSection notice="공지내용" updateNotice={updateNotice} userRole="member" />);

    expect(screen.getByText("📌 공지사항")).toBeInTheDocument();
    expect(screen.getByText("공지내용")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "수정" })).toBeNull();
  });
});
