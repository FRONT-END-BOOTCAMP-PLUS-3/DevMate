import localFont from "next/font/local";
import { Inter } from "next/font/google";

import type { ReactNode } from "react";

import type { Metadata } from "next";

import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "dev-mate",
  description: "dev-mate site of the lionCat team.",
  icons: "/favicon.ico",
};
const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
});

const inter = Inter({
  subsets: ["latin"], // 라틴 문자 집합만 로드
  weight: ["300", "400", "500", "600", "700"], // 사용할 폰트 두께
  display: "swap", // 폰트가 로딩되면 즉시 텍스트를 표시하고, 로딩이 완료되면 폰트를 교체하는 방식
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${pretendard.className}${inter.className}`}>{children}</body>
    </html>
  );
}
