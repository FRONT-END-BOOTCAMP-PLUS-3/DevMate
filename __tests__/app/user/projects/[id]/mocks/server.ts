import { handlers } from "./handlers";

import { setupServer } from "msw/node";

// ✅ MSW 서버 생성
export const server = setupServer(...handlers);
