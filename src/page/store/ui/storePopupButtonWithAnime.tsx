import { animate, eases } from 'animejs';
import { useRef, useState } from 'react';
import { IoCardOutline, IoCartOutline } from 'react-icons/io5';

const PurchaseButtonWithAnimation = ({
  type,
  price,
  count,
  cartOrPurchaseClick,
}: {
  type: '장바구니 담기' | '바로 구매';
  price: number;
  count: number | null;
  cartOrPurchaseClick: () => Promise<void>;
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [hovered, setHovered] = useState(false);

  const originalColor = '#fcd34d'; // bg-amber-300
  const hoverColor = '#f87171'; // bg-rose-400

  const handleMouseEnter = () => {
    if (!buttonRef.current || !textRef.current) return;

    animate(buttonRef.current, {
      backgroundColor: [originalColor, hoverColor],
      duration: 250,
      easing: eases.outQuad,
    });

    fadeOutInText(setHovered, true);
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current || !textRef.current) return;

    animate(buttonRef.current, {
      backgroundColor: [hoverColor, originalColor],
      duration: 250,
      easing: eases.outQuad,
    });

    fadeOutInText(setHovered, false);
  };

  const fadeOutInText = (set: (v: boolean) => void, value: boolean) => {
    if (!textRef.current) return;

    animate(textRef.current, {
      opacity: [1, 0],
      duration: 150,
      easing: eases.outQuad,
      complete: () => {
        set(value); // ✅ 상태 먼저 바꾼 다음
        requestAnimationFrame(() => {
          // ✅ 그 다음 opacity 올리는 트랜지션 적용
          animate(textRef.current!, {
            opacity: [0, 1],
            duration: 150,
            easing: eases.outQuad,
          });
        });
      },
    });
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={async () => {
        await cartOrPurchaseClick();
      }}
      className="mt-1 flex h-[2.4rem] w-[6.8rem] items-center justify-center rounded-2xl border bg-amber-300 px-4 font-parkdahyun hover:border-white md:mt-3 md:h-[2.8rem] md:w-[8rem] md:px-6 md:text-xl"
    >
      <span
        ref={textRef}
        className="flex items-center justify-between gap-2 tracking-tighter"
      >
        {type === '바로 구매' && hovered && <IoCardOutline />}
        {type === '장바구니 담기' && hovered && <IoCartOutline />}
        {hovered
          ? count && '₩' + (count * price).toLocaleString('ko-KR')
          : type}
      </span>
    </button>
  );
};
export default PurchaseButtonWithAnimation;
