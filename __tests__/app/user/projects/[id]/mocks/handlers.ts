import { project } from "../dummy";

import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:3000/api/project/:id", async ({ params }) => {
    if (params.id === "1") {
      return HttpResponse.json(project);
    } else {
      return HttpResponse.json({ error: "프로젝트를 찾을 수 없습니다." }, { status: 404 });
    }
  }),
];
