import { test, expect } from "@playwright/test";

test("SSR 페이지가 정상적으로 렌더링 되는지", async ({ page }) => {
  await page.goto("http://localhost:3000/recruitments/1"); // SSR 페이지 URL

  // 모집글 제목이 정상적으로 표시되는지 확인
  await expect(page.getByText("작성일")).toBeVisible();

  // 댓글이 정상적으로 표시되는지 확인
  await expect(page.getByText("댓글")).toBeVisible();
});
