import LikeButton from "@/app/(anon)/recruitments/[id]/_components/likeButton";

import type { LikeDto } from "@/application/usecases/dtos/LikeDto";

import { render, screen } from "@testing-library/react"; // 실제 로그인 상태 모킹
import { describe, expect, it, vi } from "vitest";

const likeData: LikeDto[] = [
  {
    id: 1,
    userId: "user123",
    projectId: 101,
    createdAt: new Date("2025-01-01T12:00:00Z"),
  },
  {
    id: 2,
    userId: "user456",
    projectId: 102,
    createdAt: new Date("2025-01-05T15:30:00Z"),
  },
  {
    id: 3,
    userId: "user789",
    projectId: 103,
    createdAt: new Date("2025-01-10T09:45:00Z"),
  },
  {
    id: 4,
    userId: "user123",
    projectId: 101,
    createdAt: new Date("2025-02-01T11:00:00Z"),
  },
  {
    id: 5,
    userId: "user456",
    projectId: 104,
    createdAt: new Date("2025-02-15T16:30:00Z"),
  },
];

describe("LikeButton", () => {
  // 로그인 상태 모킹
  vi.mock("@/utils/cookie", () => ({
    decodeToken: vi.fn().mockResolvedValue("user123"), // user123이 로그인된 것으로 모킹
  }));

  // API 모킹 (통신이 일어나지 않도록)
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ liked: true }), // 응답 값 모킹
  });

  it("좋아요 버튼이 정상적으로 렌더링 되는지", () => {
    render(<LikeButton projectId={101} likes={likeData} />);

    expect(screen.getByText("5")).toBeInTheDocument(); // 5로 설정되어야 함
  });

  // it("좋아요 버튼 클릭 시 카운트가 증가하는지", async () => {
  //   render(<LikeButton projectId={101} likes={likeData} />);
  //   const button = screen.getByRole("button");
  //   const likeCountText = screen.getByText("5");

  //   fireEvent.click(button);

  //   // 클릭 후 카운트가 증가한 후, 6이 나와야 함
  //   expect(await screen.findByText("6")).toBeInTheDocument();
  // });

  // it("좋아요 버튼을 다시 클릭하면 원래대로 돌아오는지", async () => {
  //   render(<LikeButton projectId={101} likes={likeData} />);
  //   const button = screen.getByRole("button");
  //   const likeCountText = screen.getByText("5");

  //   fireEvent.click(button);
  //   fireEvent.click(button);

  //   // 다시 원래대로 돌아와야 하므로 5로 확인
  //   expect(await screen.findByText("5")).toBeInTheDocument();
  // });
});
