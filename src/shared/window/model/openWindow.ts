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

  console.log(window.screen);
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
