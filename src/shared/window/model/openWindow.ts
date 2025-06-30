interface ExtScreen extends Screen {
  availTop: number;
  availLeft: number;
}

export const openNewWindowWithoutDuplicate = (
  windowReference: Window | null,
  link: string,
  afterCallback?: () => Promise<void> | void
) => {
  const windowWidth = 400;
  const windowHeight = 650;

  const top =
    (window.screen.availHeight - windowHeight) / 2 +
    (window.screen as ExtScreen).availTop;
  const left =
    (window.screen.availWidth - windowWidth) / 2 +
    (window.screen as ExtScreen).availLeft;

  if (link.includes('payapp.kr')) {
    // 배경 오버레이

    window.document.body.style.background = 'rgba(0, 0, 0, 0.5)';
    const newWindow = window.open(
      link,
      'PayAppPayment',
      `width=${windowWidth},height=${windowHeight},top=${top},left=${left}`
    );
    // 창이 닫힘을 감지하는 인터벌 설정
    if (newWindow) {
      const timer = setInterval(async () => {
        const path = newWindow.postMessage('', window.location.origin);
        // CST경로에 도달하면 창꺼질때 aftercallback 수행

        if (newWindow.closed) {
          // 필요한 경우 메인 창 새로고침 또는 상태 업데이트
          console.log('결제 정보 핸들링 필요, 성공,닫기 여부 확인 불가');
          const rootContainer = document.getElementById('root-container');
          if (rootContainer) {
            rootContainer.style.backgroundColor = '';
          }
          if (afterCallback) {
            await afterCallback();
          }
          clearInterval(timer);
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
