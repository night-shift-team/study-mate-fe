'use client';
import Panel from '@public/assets/backgroundImages/store/storePanel2.svg';
import Image, { StaticImageData } from 'next/image';
import ItemCard from './storeItemCard';
import ShieldIcon from '@public/assets/icons/store/shieldIcon3.png';
import CartIcon from '@public/assets/icons/store/cartIcon.png';
import PurchaseHistory from '@public/assets/icons/store/purchaseHistory.png';
import Link from 'next/link';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import React, { useEffect, useRef, useState } from 'react';
import { PopupNotice } from '@/shared/popUp/ui/popupV2';
import useOutsideClick from '@/shared/routes/model/useOutsideClick';
import { animate, eases } from 'animejs';
import { IoCartOutline } from 'react-icons/io5';
import { IoCardOutline } from 'react-icons/io5';

export interface StoreItemInfo {
  title: string;
  imageUrl: string | StaticImageData;
  price: number;
  count: number;
}

const StorePage = () => {
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const outSideClickRef = useOutsideClick(() => {
    setPurchaseOpen(false);
    setCartOpen(false);
  });
  const [selectedItem, setSelectedItem] = useState<StoreItemInfo | null>(null);
  const [cart, setCart] = useState<StoreItemInfo[]>([]);

  return (
    <div className="absolute inset-0 h-screen w-screen bg-storeBg bg-cover pt-[3.2rem] md:pt-[3.5rem]">
      {purchaseOpen ? (
        <PopupNotice
          ref={outSideClickRef}
          size="md"
          title="아이템 구매"
          content={
            <PurchasePopupData
              item={selectedItem}
              setItem={setSelectedItem}
              setCart={setCart}
              popupClose={() => setPurchaseOpen(false)}
            />
          }
          onClose={() => setPurchaseOpen(false)}
          color="#ffffe9"
        />
      ) : null}
      {cartOpen ? (
        <PopupNotice
          ref={outSideClickRef}
          size="md"
          title="장바구니"
          content={<CartPopupData cart={cart} setCart={setCart} />}
          onClose={() => setCartOpen(false)}
          color="#ffffe9"
        />
      ) : null}
      <div className="relative flex h-full w-full flex-col overflow-y-auto overflow-x-hidden scrollbar-hide">
        <div className="mt-4 flex h-[8rem] w-full justify-center">
          <Panel className="h-full w-full scale-[1.45] object-contain" />
        </div>
        <button
          aria-label="cart"
          className="group absolute right-2 top-0 flex h-[3rem] w-[2.8rem] flex-col md:right-5 md:top-3 md:h-[3.8rem] md:w-[3.6rem]"
          onClick={() => setCartOpen(true)}
        >
          <div className="relative flex h-full w-full">
            <div className="absolute flex aspect-1 w-full">
              <Image src={CartIcon} fill alt="cart_icon" />
            </div>
            <div className="absolute bottom-2 right-1 flex aspect-1 h-3.5 items-center justify-center rounded-full bg-[#ef4444] text-[0.6rem] font-semibold text-white group-hover:border group-hover:border-white/50 md:bottom-[0.65rem] md:right-1.5 md:h-[1.1rem] md:text-[0.65rem]">
              {cart.length}
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
              popupOpen={purchaseOpen}
              setPopupOpen={setPurchaseOpen}
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

const CartPopupData = ({
  cart,
  setCart,
}: {
  cart: StoreItemInfo[];
  setCart: React.Dispatch<React.SetStateAction<StoreItemInfo[]>>;
}) => {
  const [isMobile, setIsMobile] = React.useState(false);
  const [totalPrice, setTotalPrice] = React.useState(
    cart.reduce((acc, item) => acc + item.price * item.count, 0)
  );

  useEffect(() => {
    setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <div className="flex w-full flex-col items-center justify-center gap-2 overflow-y-auto text-xs md:text-sm">
        {cart.length
          ? cart.map((item, index) => (
              <div
                key={index}
                className="flex w-full items-center justify-between gap-1"
              >
                <div className="relative flex aspect-1 w-[clamp(2rem,10%,3rem)] scale-[1.3] items-center justify-center">
                  <Image src={item.imageUrl} alt={item.title} fill />
                </div>
                <span className="flex w-[clamp(3rem,30%,4rem)] font-semibold md:w-[clamp(3rem,45%,20rem)]">
                  {item.title + item.title + item.title}
                </span>
                <div className="flex w-[clamp(3rem,30%,5rem)] justify-between gap-1">
                  <button
                    className="flex aspect-1 h-5 items-center justify-center rounded-full bg-[#fbd34c] font-semibold hover:border hover:border-white"
                    onClick={() =>
                      setCart((prev: StoreItemInfo[]) => {
                        const newCart: StoreItemInfo[] = [];

                        prev.map((cartItem) => {
                          if (cartItem.title === item.title) {
                            const newCount = cartItem.count - 1;
                            if (newCount > 0) {
                              newCart.push({ ...cartItem, count: newCount });
                            }
                          } else {
                            newCart.push(cartItem);
                          }
                        });
                        setTotalPrice(
                          newCart.reduce(
                            (acc, item) => acc + item.price * item.count,
                            0
                          )
                        );
                        return newCart;
                      })
                    }
                  >
                    -
                  </button>
                  <span className="flex items-center justify-center whitespace-nowrap font-semibold">
                    {item.count}개
                  </span>
                  <button
                    className="flex aspect-1 h-5 items-center justify-center rounded-full bg-[#fbd34c] font-semibold hover:border hover:border-white"
                    onClick={() =>
                      setCart((prev: StoreItemInfo[]) => {
                        const newCart: StoreItemInfo[] = [];

                        prev.map((cartItem) => {
                          if (cartItem.title === item.title) {
                            const newCount = cartItem.count + 1;
                            if (newCount > 99) {
                              newCart.push({ ...cartItem, count: 99 });
                            } else {
                              newCart.push({ ...cartItem, count: newCount });
                            }
                          } else {
                            newCart.push(cartItem);
                          }
                        });
                        setTotalPrice(
                          newCart.reduce(
                            (acc, item) => acc + item.price * item.count,
                            0
                          )
                        );
                        return newCart;
                      })
                    }
                  >
                    +
                  </button>
                </div>
                <span className="flex w-[clamp(3.5rem,20%,4.5rem)]">
                  ₩{(item.price * item.count).toLocaleString('ko-KR')}
                </span>

                <button
                  className="flex aspect-1 h-5 items-center justify-center rounded-full bg-[#fbd34c] text-[0.6rem] font-semibold hover:border hover:border-white"
                  onClick={() => {
                    setCart((prev: StoreItemInfo[]) => {
                      const newCart: StoreItemInfo[] = [];
                      prev.map((cartItem) => {
                        if (cartItem.title === item.title) {
                          return;
                        } else {
                          newCart.push(cartItem);
                        }
                      });
                      setTotalPrice(
                        newCart.reduce(
                          (acc, item) => acc + item.price * item.count,
                          0
                        )
                      );
                      return newCart;
                    });
                  }}
                >
                  X
                </button>
              </div>
            ))
          : '장바구니가 비어있습니다.'}
      </div>
      <button
        type="button"
        disabled={cart.length === 0}
        onClick={async () => {}}
        className={`mt-1 flex h-[2.4rem] w-[6.8rem] items-center justify-center rounded-2xl hover:border ${cart.length === 0 ? 'bg-gray-200 hover:border-none' : 'bg-amber-300'} px-4 font-parkdahyun hover:border-white md:mt-3 md:h-[2.8rem] md:w-[8rem] md:px-6 md:text-xl`}
      >
        <span className="flex items-center justify-between gap-2 tracking-tighter">
          {<IoCardOutline />}

          <span>{'₩' + totalPrice.toLocaleString('ko-KR')}</span>
        </span>
      </button>
    </div>
  );
};

const PurchasePopupData = ({
  item,
  setItem,
  setCart,
  popupClose,
}: {
  item: StoreItemInfo | null;
  setItem: React.Dispatch<React.SetStateAction<StoreItemInfo | null>>;
  setCart: React.Dispatch<React.SetStateAction<StoreItemInfo[]>>;
  popupClose: () => void;
}) => {
  if (!item) return;
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

  const insertCart = async () => {
    // 장바구니 api 호출
    // prec에서 이전 장바구니에 있는 아이템인지 확인하고 있으면 수량만 변경
    setCart((prev: StoreItemInfo[]) => {
      let cartUpdated = false;

      const newCart = prev.map((cartItem) => {
        if (cartItem.title === item.title) {
          cartUpdated = true;
          return { ...cartItem, count: cartItem.count + item.count };
        }
        return cartItem;
      });

      if (!cartUpdated) {
        newCart.push(item);
      }
      return newCart;
    });
    popupClose();
  };
  const purchaseItem = async () => {
    // 구매 api 호출
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
      <div className="flex w-full items-center justify-center gap-1">
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
          type="장바구니 담기"
          price={item.price}
          count={count}
          cartOrPurchaseClick={insertCart}
        />
        <PurchaseButtonWithAnimation
          type="바로 구매"
          price={item.price}
          count={count}
          cartOrPurchaseClick={purchaseItem}
        />
      </div>
    </div>
  );
};

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
      className="mt-1 flex h-[2.4rem] w-[6.8rem] items-center justify-center rounded-2xl border bg-amber-300 px-4 font-parkdahyun hover:border-orange-500 md:mt-3 md:h-[2.8rem] md:w-[8rem] md:px-6 md:text-xl"
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
