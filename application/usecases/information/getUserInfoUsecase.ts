import type { UserRepository } from "@/domain/repositories/userRepository";

export class GetUserInfoUsecase {
  userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  async execute(userId: string) {
    const userData = await this.userRepository.findById(userId);

    const userInfo = {
      editable: {
        name: userData?.name,
        email: userData?.email,
        gender: userData?.gender,
        birthDate: userData?.birthDate,
      },
      nonEditable: {
        profileImg: userData?.profileImg && "/defaultProfile.svg",
        nickname: userData?.nickname,
        career: userData?.career,
        position: userData?.position,
        techStackTags: [],
        address: userData?.address,
      },
    };
    return userInfo;
  }
}
