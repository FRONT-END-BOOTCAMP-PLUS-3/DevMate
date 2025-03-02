export interface DecodedToken {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export type DecodedInfo = "id" | "name" | "email" | "createdAt";
