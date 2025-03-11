export const RecruitmentStatus = {
  ALL: "전체",
  RECRUITING: "모집중",
  CLOSED: "모집완료",
} as const;

export type RecruitmentStatus = (typeof RecruitmentStatus)[keyof typeof RecruitmentStatus];

export const RecruitmentSort = {
  NEWEST: "최신순",
  MOST_VIEWED: "조회순",
  MOST_COMMENTED: "댓글순",
  MOST_LIKED: "좋아요순",
} as const;

export type RecruitmentSort = (typeof RecruitmentSort)[keyof typeof RecruitmentSort];
