import { useEffect, useState } from 'react';
import { StoreItemInfo } from '../ui';

const usePurchasePopup = (
  item: StoreItemInfo,
  setItem: React.Dispatch<React.SetStateAction<StoreItemInfo | null>>,
  setCart: React.Dispatch<React.SetStateAction<StoreItemInfo[]>>,
  popupClose: () => void
) => {
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

  return { isMobile, count, setCountHandler, insertCart, purchaseItem };
};
export default usePurchasePopup;
