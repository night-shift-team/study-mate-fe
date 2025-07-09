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
    let hasAfterCallbackRun = false;
    if (newWindow) {
      const timer = setInterval(async () => {
        if (newWindow.closed) {
          const rootContainer = document.getElementById('root-container');
          if (rootContainer) {
            rootContainer.style.backgroundColor = '';
          }
          if (afterCallback && !hasAfterCallbackRun) {
            hasAfterCallbackRun = true;
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
