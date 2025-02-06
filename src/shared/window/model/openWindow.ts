interface ExtScreen extends Screen {
  availTop: number;
  availLeft: number;
}

export const openNewWindowWithoutDuplicate = (
  windowReference: Window | null,
  link: string
) => {
  const windowWidth = 400;
  const windowHeight = 650;

  const top =
    (window.screen.availHeight - windowHeight) / 2 +
    (window.screen as ExtScreen).availTop;
  const left =
    (window.screen.availWidth - windowWidth) / 2 +
    (window.screen as ExtScreen).availLeft;

  // GitHub 로그인인 경우
  if (link.includes('github.com/login/oauth')) {
    // 기존 쿠키 삭제
    document.cookie =
      'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    const newWindow = window.open(
      link,
      'githubLogin',
      `width=${windowWidth},height=${windowHeight},top=${top},left=${left}`
    );

    // 창이 닫힘을 감지하는 인터벌 설정
    if (newWindow) {
      const timer = setInterval(() => {
        if (newWindow.closed) {
          clearInterval(timer);
          // 필요한 경우 메인 창 새로고침 또는 상태 업데이트
        }
      }, 500);
    }
    return;
  }

  // 다른 로그인들의 경우 기존 로직 유지
  if (
    !windowReference ||
    windowReference.closed === undefined ||
    windowReference.closed
  ) {
    windowReference = window.open(
      link,
      link,
      `width=${windowWidth},height=${windowHeight},top=${top},left=${left}`
    );
  } else {
    windowReference.location.href = link;
    windowReference.focus();
  }
};
