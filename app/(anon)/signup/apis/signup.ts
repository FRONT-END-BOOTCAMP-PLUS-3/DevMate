import type { UserDto } from "@/application/usecases/user/dtos/userDto"; // 타입이 있으면 적용

export const signUp = async (userData: Omit<UserDto, "id" | "createdAt">) => {
  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("서버에서 JSON이 아닌 응답이 반환되었습니다.");
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "회원가입 요청 실패");
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("알 수 없는 오류 발생");
  }
};
