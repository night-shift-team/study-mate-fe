export enum EnumUserLoginType {
  LOCAL = 'LOCAL',
  KAKAO = 'KAKAO',
  NAVER = 'NAVER',
  GOOGLE = 'GOOGLE',
  GITHUB = 'GITHUB',
}
export enum EnumUserStatus {
  ACTIVE = 'ACTIVE',
  PAUSE = 'PAUSE',
  BAN = 'BAN',
}

export type UserLoginType =
  | EnumUserLoginType.GITHUB
  | EnumUserLoginType.GOOGLE
  | EnumUserLoginType.KAKAO
  | EnumUserLoginType.LOCAL
  | EnumUserLoginType.NAVER;

export type UserStatus =
  | EnumUserStatus.ACTIVE
  | EnumUserStatus.BAN
  | EnumUserStatus.PAUSE;

export interface UserInfo {
  userId: bigint;
  loginType: UserLoginType;
  loginId: string;
  nickname: string;
  profileImg: string;
  status: UserStatus;
  role: number;
  registeredAt: string;
  userScore: number;
}
