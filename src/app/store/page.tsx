'use client';
import Panel from '@public/assets/backgroundImages/store/storePanel2.svg';
import Image from 'next/image';
import ItemCard from './storeItemCard';
import ShieldIcon from '@public/assets/icons/store/shieldIcon3.png';
import CartIcon from '@public/assets/icons/store/cartIcon.png';
import PurchaseHistory from '@public/assets/icons/store/purchaseHistory.png';
import Link from 'next/link';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { PopupNotice } from '@/shared/popUp/ui/popupV2';
import useOutsideClick from '@/shared/routes/model/useOutsideClick';
import { animate, eases } from 'animejs';
import { IoCartOutline } from 'react-icons/io5';
import { IoCardOutline } from 'react-icons/io5';

const StorePage = () => {
  const [popupOpen, setPopupOpen] = React.useState(false);
  const outSideClickRef = useOutsideClick(() => setPopupOpen(false));
  const [selectedItem, setSelectedItem] = React.useState(null);

  return (
    <div className="absolute inset-0 h-screen w-screen bg-storeBg bg-cover pt-[3.2rem] md:pt-[3.5rem]">
      {popupOpen ? (
        <PopupNotice
          ref={outSideClickRef}
          size="md"
          title="아이템 구매"
          content={
            <PurchasePopupDate item={selectedItem} setItem={setSelectedItem} />
          }
          onClose={() => setPopupOpen(false)}
          color="#ffffe9"
        />
      ) : null}
      <div className="relative flex h-full w-full flex-col overflow-y-auto overflow-x-hidden scrollbar-hide">
        <div className="mt-4 flex h-[8rem] w-full justify-center">
          <Panel className="h-full w-full scale-[1.45] object-contain" />
        </div>
        <button
          aria-label="cart"
          className="absolute right-2 top-0 flex h-[3rem] w-[2.8rem] flex-col md:right-5 md:top-3 md:h-[3.8rem] md:w-[3.6rem]"
        >
          <div className="relative flex h-full w-full">
            <div className="absolute flex aspect-1 w-full">
              <Image src={CartIcon} fill alt="cart_icon" />
            </div>
            <div className="absolute bottom-2 right-1 flex aspect-1 h-3.5 items-center justify-center rounded-full bg-[#ef4444] text-[0.6rem] font-semibold text-white md:bottom-[0.65rem] md:right-1.5 md:h-[1.1rem] md:text-[0.65rem]">
              1
            </div>
            <span className="absolute -bottom-[0.1rem] flex w-full justify-center text-[0.5rem] tracking-tighter md:text-[0.65rem] md:tracking-tight">
              장바구니
            </span>
          </div>
        </button>
        <Link
          aria-label="purchase_history"
          href={RouteTo.StorePurchaseHistory}
          className="absolute right-2 top-[3.2rem] flex h-[3rem] w-[2.8rem] flex-col md:right-5 md:top-20 md:h-[3.8rem] md:w-[3.6rem]"
        >
          <div className="relative flex h-full w-full">
            <div className="absolute flex aspect-1 w-full">
              <Image src={PurchaseHistory} fill alt="purchase_history" />
            </div>
            <span className="absolute -bottom-[0.1rem] flex w-full justify-center text-[0.5rem] tracking-tighter md:text-[0.65rem] md:tracking-tight">
              구매내역
            </span>
          </div>
        </Link>
        <div className="mt-5 grid h-auto w-full grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] place-items-center gap-4 px-6 pb-20 md:mt-10 md:grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))] md:gap-10 md:px-40">
          {Array.from({ length: 10 }).map((_, index) => (
            <ItemCard
              key={index}
              title={'Title ' + index}
              description="24시간,문제풀이,방어"
              imageUrl={ShieldIcon}
              popupOpen={popupOpen}
              setPopupOpen={setPopupOpen}
              setSelectedItem={setSelectedItem}
              price={2000}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default StorePage;

const PurchasePopupDate = ({
  item,
  setItem,
}: {
  item: any;
  setItem: React.Dispatch<React.SetStateAction<null>>;
}) => {
  const [count, setCount] = React.useState(
    item ? (item.count as number) : null
  );
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
  }, []);

  const setCountHandler = (count: number) => {
    if (count < 1) {
      setCount(1);
    } else {
      setCount(count);
    }
    setItem({ ...item, count: count });
  };
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <div className="flex w-full flex-col items-center justify-center">
        <Image
          src={item.imageUrl}
          alt={item.title}
          width={isMobile ? 55 : 80}
          height={isMobile ? 55 : 80}
          className="opacity-80"
        />
        <span className="font-semibold">{item ? item.title : ''}</span>
      </div>
      <div className="flex w-full items-center justify-center gap-12">
        <button
          className="flex aspect-1 h-6 items-center justify-center rounded-full bg-[#fbd34c] font-semibold hover:border hover:border-white"
          onClick={() => count && setCountHandler(count - 1)}
        >
          -
        </button>
        <span className="font-semibold">{count}개</span>
        <button
          className="flex aspect-1 h-6 items-center justify-center rounded-full bg-[#fbd34c] font-semibold hover:border hover:border-white"
          onClick={() => count && setCountHandler(count + 1)}
        >
          +
        </button>
      </div>
      <div className="flex gap-4">
        <PurchaseButtonWithAnimation
          text="장바구니 담기"
          price={item.price}
          count={count}
        />
        <PurchaseButtonWithAnimation
          text="바로 구매"
          price={item.price}
          count={count}
        />
      </div>
    </div>
  );
};

const PurchaseButtonWithAnimation = ({
  text,
  price,
  count,
}: {
  text: string;
  price: number;
  count: number | null;
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
      onClick={() => {}}
      className="mt-1 flex h-[2.4rem] w-[6.8rem] items-center justify-center rounded-2xl border bg-amber-300 px-4 font-parkdahyun hover:border-orange-500 md:mt-3 md:h-[2.8rem] md:w-[8rem] md:px-6 md:text-xl"
    >
      <span
        ref={textRef}
        className="flex items-center justify-between gap-2 tracking-tighter"
      >
        {text === '바로 구매' && hovered && <IoCardOutline />}
        {text === '장바구니 담기' && hovered && <IoCartOutline />}
        {hovered
          ? count && '₩' + (count * price).toLocaleString('ko-KR')
          : text}
      </span>
    </button>
  );
};
