import React, { useEffect, useState } from 'react';
import { StoreItemInfo } from '..';
import Image from 'next/image';
import PurchaseButtonWithAnimation from './storePopupButtonWithAnime';

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
  const [count, setCount] = useState(item ? (item.count as number) : null);
  const [isMobile, setIsMobile] = useState(false);

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
export default PurchasePopupData;
