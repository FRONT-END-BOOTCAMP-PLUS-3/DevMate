import Head from "next/head";
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
      <Head>
        <meta name="google-site-verification" content="hQF97uWNeNaq9ByIdR4TdnK1VVwHa8r2bONGpWszwuU" />
        <meta name="naver-site-verification" content="77749f05a3997551c0aa50899c8de1b07f3e5d54" />
        <meta
          name="description"
          content="누구나 함께하는 devmate 커뮤니티. 관심있는 주제에 대한 팀프로젝트(사이드프로젝트)를 함께 해보세요. - 팀프로젝트 ㅣ devmate"
        />
        <title>팀 프로젝트 - devmate | 개발자 프로젝트 팀 모집 및 협업 플랫폼</title>

        <meta property="og:type" content="website" />
        <meta property="og:title" content="팀 프로젝트 - devmate | 개발자 프로젝트 팀 모집 및 협업 플랫폼" />
        <meta
          property="og:description"
          content="누구나 함께하는 devmate 커뮤니티. 관심있는 주제에 대한 팀프로젝트(사이드프로젝트)를 함께 해보세요. - 팀프로젝트 ㅣ devmate"
        />
        <meta property="og:image" content="/logoWidthMata.png" />
        <meta property="og:url" content="https://dev-mate.newlecture.com" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="팀 프로젝트 - devmate | 개발자 프로젝트 팀 모집 및 협업 플랫폼" />
        <meta
          name="twitter:description"
          content="누구나 함께하는 devmate 커뮤니티. 관심있는 주제에 대한 팀프로젝트(사이드프로젝트)를 함께 해보세요. - 팀프로젝트 ㅣ devmate"
        />
        <meta name="twitter:image" content="/logoWidthMata.png" />
        <meta name="twitter:url" content="https://dev-mate.newlecture.com" />

        <meta name="robots" content="index, follow" />
      </Head>
      <body className={`${pretendard.className}${inter.className}`}>{children}</body>
    </html>
  );
}
