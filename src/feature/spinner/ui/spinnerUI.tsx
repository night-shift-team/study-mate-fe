import { useEffect, useRef, useState } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

export const Spinner = ({ color }: { color?: string }) => {
  const spinnerContainerRef = useRef<HTMLDivElement>(null);
  const [loaderSize, setLoaderSize] = useState(5); // 점 하나의 사이즈

  useEffect(() => {
    const updateSize = () => {
      if (spinnerContainerRef.current) {
        const parentHeight = spinnerContainerRef.current.offsetHeight;
        console.log(parentHeight);
        setLoaderSize(parentHeight * 0.4); // 부모 높이의 15%로 설정
      }
    };

    updateSize(); // 초기 크기 설정
    window.addEventListener('resize', updateSize); // 창 크기 변경 시 업데이트

    return () => {
      window.removeEventListener('resize', updateSize); // 이벤트 리스너 정리
    };
  }, []);
  return (
    <div
      ref={spinnerContainerRef}
      className="items-cneter flex h-full min-h-[10px] w-full min-w-[10px] justify-center"
    >
      <PulseLoader
        color={color}
        size={loaderSize}
        className="flex items-center justify-center"
      />
    </div>
  );
};
