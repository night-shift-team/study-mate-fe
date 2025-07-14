import { animate, eases } from 'animejs';
import { useRef, useState } from 'react';

const usePurchaseButtonWithAnimation = () => {
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

  return { buttonRef, textRef, handleMouseEnter, handleMouseLeave, hovered };
};
export default usePurchaseButtonWithAnimation;
