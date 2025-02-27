import { describe, it, expect, vi } from "vitest";
import ProjectDetail from "@/app/user/projects/[id]/page";
import { render, screen, waitFor } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  notFound: () => null,
  useParams: () => ({ id: 1 }),
}));

describe("ProjectDetail", () => {
  it("프로젝트 상세 페이지가 렌더링되는지", async () => {
    render(<ProjectDetail />);

    await waitFor(() => {
      expect(screen.getByText("🎯 프로젝트 목표")).toBeInTheDocument();
      expect(screen.getByText("멋쟁이 사자🦁 만들기 프로젝트")).toBeInTheDocument();
    });
  });
});
