/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://dev-mate.newlecture.com", // 사이트 기본 URL
  changefreq: "daily", // 사이트맵 업데이트 주기 (daily: 매일, weekly: 매주 등)
  priority: 0.7, // 기본 페이지 우선순위 (0~1 사이 값, 1에 가까울수록 중요)
  sitemapSize: 7000, // 하나의 사이트맵 파일당 포함할 최대 URL 개수
  generateRobotsTxt: true, // robots.txt 자동 생성 여부
  exclude: [], // 사이트맵에서 제외할 페이지 목록 (예: ['/admin', '/secret'])
};
