export enum Ecode {
  E9999 = '9999',
  E0002 = '0002',
  E0005 = '0005',
  E0106 = '0106',
  E0103 = '0103',
  E0104 = '0104',
  E0405 = '0405',
  E0406 = '0406',
}

export const EcodeMessage = (ecode: Ecode) => {
  switch (ecode) {
    case Ecode.E9999:
      return 'Unknown error';
    case Ecode.E0002:
      return '토큰 없음';
    case Ecode.E0005:
      return '토큰 만료';
    case Ecode.E0103:
      return '유효한 이메일이 아닙니다.';
    case Ecode.E0104:
      return 'password가 일치하지 않습니다.';
    case Ecode.E0106:
      return '구글 인증에 실패하였습니다.';
    case Ecode.E0405:
      return '이미 존재하는 문제입니다.';
    case Ecode.E0406:
      return '존재하지 않는 문제입니다.';
    default:
      return 'Unknown error';
  }
};
