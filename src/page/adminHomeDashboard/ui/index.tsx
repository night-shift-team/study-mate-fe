'use client';

import { RouteTo } from '@/shared/routes/model/getRoutePath';
import AuthHoc from '@/shared/auth/model/authHoc';
import { DashboardCard } from '@/feature/adminDashboard/ui/adminHomeDashboardComponents';

export interface DashboardCardProps {
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

const AdminHomeDashboardPage = () => {
  return (
    <div className="relative flex h-[100%] min-h-[33.5rem] w-full flex-col items-center justify-center bg-[#f9fafb]">
      <span className="flex text-2xl font-bold">관리자 통계 대시보드</span>
      <span className="flex text-sm">
        유저 및 문제 관리 대시보드를 선택하세요.
      </span>
      <div className="relative mt-4 flex h-[75%] w-full max-w-[45rem] flex-col items-center px-[2rem] py-[0.5rem] md:flex-row md:items-start md:justify-center">
        <DashboardCard data={UserDashboardCardData} />
        <DashboardCard data={ProblemDashboardCardData} />
      </div>
    </div>
  );
};
export default AuthHoc(AdminHomeDashboardPage);
