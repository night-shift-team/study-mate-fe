'use client';
import Image, { StaticImageData } from 'next/image';
import ShieldIcon from '@public/assets/icons/store/shieldIcon3.png';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import useItemCard from '../model/itemCardHook';
interface ItemCardProps {
  index: number;
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string | StaticImageData;
  afterPaymentCallback: () => Promise<void> | void;
  onClick?: () => void;
  isSelected?: boolean;
}
const ItemCard = ({
  index,
  id,
  title = '무적',
  description = '24시간,문제풀이,방어',
  price = 999999,
  imageUrl = ShieldIcon,
  isSelected,
  onClick,
  afterPaymentCallback,
}: ItemCardProps) => {
  const { isMobile, buyItem, paymentOpen } = useItemCard(
    id,
    afterPaymentCallback
  );
  return (
    <div
      onClick={onClick}
      className={`rounded-lg border border-white p-2 ${
        isSelected ? '' : 'opacity-50'
      }`}
    >
      <div className="flex w-full flex-col items-center justify-center md:mt-4">
        <Image
          src={imageUrl as string}
          alt={title}
          width={isMobile ? 55 : 80}
          height={isMobile ? 55 : 80}
        />
      </div>
      {/* <button
        type="button"
        onClick={async () => {
          await buyItem();
          // setPopupOpen(true);
          // setSelectedItem((prev: any) => ({
          //   ...prev,
          //   title: title,
          //   imageUrl: imageUrl,
          //   price: price,
          //   count: 1,
          // }));
        }}
        className="flex h-[2.4rem] w-[6rem] items-center justify-between rounded-2xl bg-amber-300 px-4 font-parkdahyun hover:border hover:border-white md:h-[2.8rem] md:w-[8rem] md:px-6 md:text-xl"
      >
        {paymentOpen ? (
          <div className="flex w-full justify-center">
            <Spinner color="#fff" />
          </div>
        ) : (
          <>
            <span>₩</span>
            <span
              className={String(price).length >= 6 ? `tracking-tighter` : ''}
            >
              {price.toLocaleString('ko-KR')}
            </span>
          </>
        )}
      </button> */}
    </div>
  );
};
export default ItemCard;
