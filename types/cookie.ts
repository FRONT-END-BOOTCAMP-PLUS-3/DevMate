export interface DecodedToken {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  nickname: string;
}

export type DecodedInfo = "id" | "name" | "email" | "createdAt" | "nickname";
