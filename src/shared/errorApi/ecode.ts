export enum Ecode {
  E0002 = '0002',
  E0005 = '0005',
  E0106 = '0106',
  E0103 = '0103',
  E0104 = '0104',
}

export const EcodeMessage = (ecode: Ecode) => {
  switch (ecode) {
    case Ecode.E0002:
      return '토큰 없음';
    case Ecode.E0005:
      return '토큰 만료';
    case Ecode.E0103:
      return '유효한 ID가 아닙니다.';
    case Ecode.E0104:
      return 'password가 일치하지 않습니다.';
    case Ecode.E0106:
      return '구글 인증에 실패하였습니다.';

    default:
      return 'Unknown error';
  }
};
