import MyRecruitmentItem from "@/app/user/recruitments/(post)/_components/myRecruitmentItem/myRecruitmentItem";

export default function Page() {
  const exampleData = {
    projectTitle: "웹 개발 프로젝트 모집",
    description: "우리는 경험 있는 웹 개발자를 찾고 있습니다. 관심 있는 분은 지원해 주세요.",
    status: "모집중" as "모집중" | "마감",
    nickName: "JohnDoe",
    timePassed: 5, // 5분 전
    LikeCount: 25,
    ViewCount: 180,
    CommentCount: 4,
  };
  return (
    <MyRecruitmentItem
      projectTitle={exampleData.projectTitle}
      description={exampleData.description}
      status={exampleData.status}
      nickName={exampleData.nickName}
      timePassed={exampleData.timePassed}
      LikeCount={exampleData.LikeCount}
      ViewCount={exampleData.ViewCount}
      CommentCount={exampleData.CommentCount}
    />
  );
}
