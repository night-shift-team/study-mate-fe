import Image, { StaticImageData } from 'next/image';
import ShieldIcon from '@public/assets/icons/store/shieldIcon.png';
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
  return (
    <div className="group flex h-80 w-60 flex-col items-center justify-between rounded-[4rem] border-2 border-orange-200 bg-[#feefd8] py-5 hover:cursor-pointer hover:border-orange-500">
      <div className="mt-4 flex w-full flex-col items-center justify-center">
        <Image src={imageUrl} alt={title} width={80} height={80} className="" />
        <span className="mb-2.5 mt-1 text-2xl">{title}</span>
        {description.split(',').map((desc, index) => (
          <span key={index} className="text-lg leading-6">
            {desc}
          </span>
        ))}
      </div>
      <button className="flex h-[2.8rem] w-[8rem] items-center justify-between rounded-2xl border bg-amber-300 px-6 font-parkdahyun text-xl group-hover:border-orange-500">
        <span>₩</span>
        <span className="tracking-tighter">
          {price.toLocaleString('ko-KR')}
        </span>
      </button>
    </div>
  );
};
export default ItemCard;
