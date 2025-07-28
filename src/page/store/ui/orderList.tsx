interface OrderListProps {
  title: string;
  time: string;
  price: string;
  count: string;
}

export const OrderList = ({ title, time, price, count }: OrderListProps) => {
  return (
    <div className="relative rounded-md pb-8p pl-16p pr-16p pt-8p text-white">
      <div className="absolute inset-0 z-0 rounded-md bg-[#E7924A] opacity-60" />
      <div className="relative z-10 space-y-2">
        <div>
          <span className="rounded bg-point-yellow px-2 py-1 text-[12px] text-black">
            구매 완료
          </span>
        </div>
        <div className="flex items-center justify-between text-lg">
          <span className="text-[18px]">{title}</span>
          <span className="text-[16px] text-yellow-300">{count}개</span>
        </div>
        <div className="flex justify-between text-sm text-white">
          <span className="text-grayscale-400">{time}</span>
          <span>₩{price}</span>
        </div>
      </div>
    </div>
  );
};
