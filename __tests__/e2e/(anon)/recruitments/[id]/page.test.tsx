import { test, expect } from "@playwright/test";

test("SSR 페이지가 정상적으로 렌더링 되는지", async ({ page }) => {
  await page.goto("http://localhost:3000/recruitments/1"); // SSR 페이지 URL

  const bodyText = await page.locator("body").innerText();

  // 프로젝트 제목이 정상적으로 표시되는지 확인
  expect(bodyText).toContain("프로젝트 제목");

  // 댓글이 정상적으로 표시되는지 확인
  expect(bodyText).toContain("댓글");
});
