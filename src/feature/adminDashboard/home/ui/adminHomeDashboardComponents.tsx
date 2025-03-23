import { DashboardCardProps } from '@/page/adminHomeDashboard';
import Link from 'next/link';
import { MdOutlineAutoGraph } from 'react-icons/md';
import { PiUsersThreeFill } from 'react-icons/pi';
import { TiArrowRight } from 'react-icons/ti';

export const DashboardCard = ({ data }: { data: DashboardCardProps }) => {
  return (
    <div
      className={`box-shadow-sm absolute flex aspect-1 h-[48%] w-[60%] min-w-[20rem] p-5 md:w-[48%] md:p-0 ${data.id === 1 ? 'top-0 md:left-0' : 'bottom-0 md:right-0 md:top-0'} flex-col items-center justify-center gap-1 border`}
    >
      <div className="flex h-[2.5rem] w-[2.5rem] rounded-full bg-[#dddddd] p-2">
        {data.id === 1 ? (
          <PiUsersThreeFill size={'100%'} />
        ) : (
          <MdOutlineAutoGraph size={'100%'} />
        )}
      </div>
      <span className="mt-1 text-base font-bold">{data.title}</span>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-[1000]">
          {data.count.toLocaleString()}
        </span>
        <span className="object-bottom text-sm">{data.countDescription}</span>
      </div>
      <span className="text-sm">{data.summary}</span>
      <Link
        href={data.routePath}
        className="mt-2 flex items-center justify-center whitespace-nowrap rounded-2xl px-4 pb-2 pt-2.5 hover:bg-gray-200"
      >
        <div className="text-sm font-bold">상세 통계 보기</div>
        <TiArrowRight />
      </Link>
    </div>
  );
};
