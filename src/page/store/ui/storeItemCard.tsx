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
    </div>
  );
};
export default ItemCard;
