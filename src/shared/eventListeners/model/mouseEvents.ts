export const HorizonTalScrollContainer = () => {
  const container = document.getElementById('horizontal-scroll-container');
  if (!container) return;

  const wheelListener = (event: WheelEvent) => {
    event.preventDefault(); // 기본 스크롤 방지
    container.scrollLeft += event.deltaY; // 수직 스크롤 값을 수평 스크롤로 변환
  };
  container.addEventListener('wheel', wheelListener);

  return () => removeEventListener('wheel', wheelListener);
};
