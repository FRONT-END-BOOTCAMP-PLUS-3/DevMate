export interface UserDto {
  address: string;
  id: string;
  name: string;
  email: string;
  password: string;
  nickname: string;
  gender: string;
  birthDate: Date;
  position: string;
  career: number;
  profileImg: string | null;
  createdAt: Date;
}
