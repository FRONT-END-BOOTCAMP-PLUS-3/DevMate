export async function checkEmailDup(email: string): Promise<boolean> {
  try {
    const response = await fetch("/api/signup/checkEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) throw new Error("이메일 중복 확인 요청 실패");

    return await response.json(); // `true | false` 반환
  } catch (error) {
    console.error("이메일 중복 확인 오류:", error);
    return false; // 서버 오류 시 기본적으로 false 반환
  }
}
