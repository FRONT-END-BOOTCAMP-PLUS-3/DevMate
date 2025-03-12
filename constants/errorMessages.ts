export const ERROR_MESSAGES = {
  EMAIL_INVALID: "올바른 이메일 형식이 아닙니다.",
  PASSWORD_MIN_LENGTH: "비밀번호는 최소 8자 이상이어야 합니다.",
  PASSWORD_COMPLEXITY: "비밀번호는 소문자, 숫자, 특수문자를 포함해야 합니다.",
  NAME_INVALID_CHARACTERS: "이름에 특수문자는 사용할 수 없습니다.",
  NICKNAME_INVALID_CHARACTERS: "닉네임에 특수문자는 사용할 수 없습니다.",

  // 폼 제출 시 필수 입력값 미입력
  EMAIL_REQUIRED: "이메일을 입력해주세요.",
  PASSWORD_REQUIRED: "비밀번호를 입력해주세요.",
  NAME_REQUIRED: "이름을 입력해주세요.",
  NICKNAME_REQUIRED: "닉네임을 입력해주세요.",
  GENDER_REQUIRED: "성별을 선택해주세요.",
  BIRTH_REQUIRED: "생년월일을 입력해주세요.",
  ADDRESS_REQUIRED: "주소를 입력해주세요.",
  POSITION_REQUIRED: "직무를 선택해주세요.",
  TECH_STACK_REQUIRED: "기술 스택을 최소 1개 이상 선택해주세요.",
  CAREER_REQUIRED: "경력을 선택해주세요.",

  // API 응답 에러
  DUPLICATE_NICKNAME: "이미 사용 중인 닉네임입니다.",
  DUPLICATE_EMAIL: "이미 사용 중인 아이디입니다.",

  PASSWORD_CONFIRM_REQUIRED: "비밀번호 확인을 입력해주세요.",
  PASSWORD_MISMATCH: "비밀번호가 일치하지 않습니다.",
} as const;
