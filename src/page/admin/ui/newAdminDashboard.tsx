import { PiUsersThreeFill } from 'react-icons/pi';
import { TiArrowRight } from 'react-icons/ti';
import { MdOutlineAutoGraph } from 'react-icons/md';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import Link from 'next/link';

interface DashboardCardProps {
  id: 1 | 2;
  title: string;
  count: number;
  countDescription: string;
  summary: string;
  routePath: RouteTo;
}

const UserDashboardCardData: DashboardCardProps = {
  id: 1,
  title: '전체 유저 분석',
  count: 1124,
  countDescription: '활성 사용자',
  summary: '유저 활동 시간, 랭킹, 디바이스 등 분석',
  routePath: RouteTo.AdminManagementUser,
};
const ProblemDashboardCardData: DashboardCardProps = {
  id: 2,
  title: '문제 분석',
  count: 1124,
  countDescription: '총 문제',
  summary: '문제 카테고리, 난이도, 풀이, 제출 현황 등 분석',
  routePath: RouteTo.AdminManagementProblem,
};

const NewAdminDashboard = () => {
  return (
    <div className="relative flex h-[100%] min-h-[33.5rem] w-full flex-col items-center justify-center bg-[#f9fafb]">
      <span className="flex text-2xl font-bold">관리자 통계 대시보드</span>
      <span className="flex text-sm">
        유저 및 문제 관리 대시보드를 선택하세요.
      </span>
      <div className="mt-4 flex h-[75%] w-full flex-col gap-5 px-[2rem] py-[0.5rem]">
        <DashboardCard data={UserDashboardCardData} />
        <DashboardCard data={ProblemDashboardCardData} />
      </div>
    </div>
  );
};
export default NewAdminDashboard;

const DashboardCard = ({ data }: { data: DashboardCardProps }) => {
  return (
    <div className="box-shadow-sm flex h-[50%] w-full flex-col items-center justify-center gap-1 border">
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
