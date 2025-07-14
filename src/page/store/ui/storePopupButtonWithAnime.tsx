import { IoCardOutline, IoCartOutline } from 'react-icons/io5';
import usePurchaseButtonWithAnimation from '../model/purchaseButtonWithAnimationHook';

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
  const { buttonRef, textRef, handleMouseEnter, handleMouseLeave, hovered } =
    usePurchaseButtonWithAnimation();
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
