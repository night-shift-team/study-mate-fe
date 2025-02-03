export const openNewWindowWithoutDuplicate = (
  windowReference: Window | null,
  link: string
) => {
  if (
    !windowReference ||
    windowReference.closed === undefined ||
    windowReference.closed
  ) {
    windowReference = window.open(link, link, 'width=400,height=650');
  } else {
    windowReference.location.href = link;
    windowReference.focus();
  }
};
