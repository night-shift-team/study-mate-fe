import Image from 'next/image';
import PurchaseButtonWithAnimation from './storePopupButtonWithAnime';
import usePurchasePopup from '../model/purchasePopupHook';
import { StoreItemInfo } from '.';

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
  const { isMobile, count, setCountHandler, insertCart, purchaseItem } =
    usePurchasePopup(item, setItem, setCart, popupClose);

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
