export interface UserDto {
  name: string;
  id: string;
  email: string;
  password: string;
  nickname: string;
  gender: string;
  birthDate: Date;
  position: string;
  address: string;
  career: number;
  profileImg: string | null;
  createdAt: Date;
}
