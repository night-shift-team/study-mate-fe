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
}
const ItemCard = ({
  index,
  id,
  title = '무적',
  description = '24시간,문제풀이,방어',
  price = 999999,
  imageUrl = ShieldIcon,
  afterPaymentCallback,
}: ItemCardProps) => {
  const { isMobile, buyItem, paymentOpen } = useItemCard(
    id,
    afterPaymentCallback
  );
  return (
    <div
      className={`group flex h-60 w-[150px] animate-fade-up ${'delay-' + (index + 1) * 100} flex-col items-center justify-between rounded-[4rem] border-2 border-orange-200 bg-[#feefd8] py-5 pb-6 hover:cursor-pointer md:h-80 md:w-60 md:hover:border-orange-500`}
    >
      <div className="flex w-full flex-col items-center justify-center md:mt-4">
        <Image
          src={imageUrl as string}
          alt={title}
          width={isMobile ? 55 : 80}
          height={isMobile ? 55 : 80}
          className="opacity-80"
        />
        <span className="font-regular mb-1 mt-2 text-base md:mb-2.5 md:mt-1.5 md:text-xl">
          {title}
        </span>
        <span key={index} className="mx-6 text-xs md:text-base md:leading-6">
          {description}
        </span>
      </div>
      <button
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
      </button>
    </div>
  );
};
export default ItemCard;
