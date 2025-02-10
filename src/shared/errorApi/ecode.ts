export enum Ecode {
  E0002 = '0002',
  E0106 = '0106',
}

export const EcodeMessage = (ecode: Ecode) => {
  switch (ecode) {
    case Ecode.E0002:
      return '로그인 실패';
    case Ecode.E0106:
      return '구글 인증에 실패하였습니다.';
    default:
      return 'Unknown error';
  }
};
