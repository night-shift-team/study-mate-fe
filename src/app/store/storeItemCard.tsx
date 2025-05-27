'use client';
import Image, { StaticImageData } from 'next/image';
import ShieldIcon from '@public/assets/icons/store/shieldIcon3.png';
import React, { useEffect } from 'react';
interface ItemCardProps {
  title: string;
  description: string;
  price: number;
  imageUrl: string | StaticImageData;
}
const ItemCard = ({
  title = 'Title',
  description = '24시간,문제풀이,방어',
  price = 2000,
  imageUrl = ShieldIcon,
}: ItemCardProps) => {
  const [isMobile, setIsMobile] = React.useState(false);
  useEffect(() => {
    setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
  }, []);
  console.log('isMobile', isMobile);
  return (
    <div className="group flex h-60 w-[150px] flex-col items-center justify-between rounded-[4rem] border-2 border-orange-200 bg-[#feefd8] py-5 hover:cursor-pointer hover:border-orange-500 md:h-80 md:w-60">
      <div className="flex w-full flex-col items-center justify-center md:mt-4">
        <Image
          src={imageUrl}
          alt={title}
          width={isMobile ? 60 : 80}
          height={isMobile ? 60 : 80}
          className="opacity-80"
        />
        <span className="-mt-1 mb-1 text-lg md:mb-2.5 md:mt-1 md:text-2xl">
          {title}
        </span>
        {description.split(',').map((desc, index) => (
          <span key={index} className="text-xs md:text-lg md:leading-6">
            {desc}
          </span>
        ))}
      </div>
      <button className="flex h-[2.4rem] w-[6rem] items-center justify-between rounded-2xl border bg-amber-300 px-4 font-parkdahyun group-hover:border-orange-500 md:h-[2.8rem] md:w-[8rem] md:px-6 md:text-xl">
        <span>₩</span>
        <span className="tracking-tighter">
          {price.toLocaleString('ko-KR')}
        </span>
      </button>
    </div>
  );
};
export default ItemCard;
