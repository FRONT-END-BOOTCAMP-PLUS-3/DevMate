export interface UserNonEditInfoDto {
  name: string;
  email: string;
  gender: string;
  birthDate: string; // ISO 8601 formatted date
}

export interface UserEditInfoDto {
  profileImg?: string; // URL or path to the profile image
  nickname?: string;
  career?: number; // Years of experience
  position?: string;
  techStackTags?: string[]; // List of technologies
  address?: string;
}

export interface InfoUserDto {
  editInfo: UserEditInfoDto;
  nonEditInfo: UserNonEditInfoDto;
}
