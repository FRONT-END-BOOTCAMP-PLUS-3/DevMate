import { server } from "./mocks/server";

import ProjectDetail from "@/app/user/projects/[id]/page";
import { expect, afterEach, beforeAll, afterAll, vi, describe, it } from "vitest";
import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";

// ✅ 테스트 실행 전에 Mock 서버 시작
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// ✅ `next/navigation` Mocking (useParams로 ID 하드코딩)
vi.mock("next/navigation", () => ({
  useParams: () => ({ id: "1" }),
  useRouter: () => ({}),
}));

describe("ProjectDetail Page 상황별 렌더링", () => {
  it("로그인하지 않은 사용자는 접근할 수 없어야 한다", async () => {
    render(<ProjectDetail />);

    await waitForElementToBeRemoved(() => screen.getByLabelText("Loading Spinner"), { timeout: 10000 });

    await waitFor(() => {
      expect(screen.getByText("❌ 토큰이 유효하지 않습니다.")).toBeVisible();
    });
  }, 10000);

  it("로그인한 사용자가 페이지에 접근하면 정상적으로 렌더링된다", async () => {
    // ✅ 1. 하드코딩된 토큰을 쿠키에 저장
    document.cookie = `token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMyYjJlOGIxLTVkOWEtNGM2Ny05MmY1LTI2ZDcyMjNhM2ZmZiIsIm5hbWUiOiLquYDsmIjsmIEiLCJlbWFpbCI6InlleWVvbmdnaW0wNkBnbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDI1LTAyLTI3VDA4OjA2OjQxLjQ2MloiLCJpYXQiOjE3NDEyNDA0OTgsImV4cCI6MTc0MTI2MjA5OH0.jtB48p9nFZrQp4nlA6wOXS5MW8js6GBbVk9Dksc2DzY; path=/; domain=localhost`;

    // ✅ 2. 컴포넌트 렌더링
    render(<ProjectDetail />);

    // ✅ 3. 로딩이 끝날 때까지 대기
    await waitForElementToBeRemoved(() => screen.getByLabelText("Loading Spinner"), { timeout: 10000 });

    // ✅ 4. 로그인 페이지가 렌더링되었는지 확인
    await waitFor(() => {
      expect(screen.getByText("프로젝트 상세")).toBeVisible();
    });
  }, 10000);
});
