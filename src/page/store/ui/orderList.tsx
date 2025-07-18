interface OrderListProps {
  title: string;
  time: string;
  price: number;
  count: number;
}

export const OrderList = ({ title, time, price, count }: OrderListProps) => {
  return (
    <div className="space-y-2 rounded-md bg-[#E7924A] p-4 text-white opacity-[80%]">
      <div>
        <span className="rounded bg-point-yellow px-2 py-1 text-sm text-black">
          구매 완료
        </span>
      </div>
      <div className="flex items-center justify-between text-lg">
        <span>{title}</span>
        <span className="text-yellow-300">{count}개</span>
      </div>
      <div className="flex justify-between text-sm text-white">
        <span>{time}</span>
        <span>₩{price.toLocaleString()}</span>
      </div>
    </div>
  );
};
