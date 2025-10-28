interface OrderListProps {
  title: string;
  id: string;
  time: string;
  price: string;
  count: string;
}

export const OrderList = ({
  title,
  id,
  time,
  price,
  count,
}: OrderListProps) => {
  const parsingId = id.split('-');
  const shortId = parsingId[parsingId.length - 1];
  return (
    <div className="relative rounded-[8px] pb-8p pl-16p pr-16p pt-8p text-black dark:text-white">
      <div className="absolute inset-0 z-0 rounded-md bg-[#E7924A] opacity-60" />
      <div className="relative z-10 font-pretandard">
        <div className="flex w-full justify-between">
          <span className="h-[24px] rounded bg-point-yellow px-16p py-1 text-[12px] text-black">
            구매 완료
          </span>
          <span className="text-[12px] text-grayscale-600">{shortId}</span>
        </div>
        <div className="flex items-center justify-between pt-4 text-lg">
          <span className="text-[18px]">{title}</span>
          <span className="mr-16p text-body-secondary">{count}개</span>
        </div>
        <div className="flex justify-between pt-1 text-body-secondary text-black dark:text-white">
          <span className="text-grayscale-600">{time}</span>
          <span className="font-bold text-grass-200">₩ {price}</span>
        </div>
      </div>
    </div>
  );
};
