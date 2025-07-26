'use client';
import Image from 'next/image';
import { SvgIcon } from '@mui/material';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import Lv1Image from '@public/assets/icons/character/Lv1.svg';
import Lv2Image from '@public/assets/icons/character/Lv2.svg';
import Lv3Image from '@public/assets/icons/character/Lv3.svg';
import Lv4Image from '@public/assets/icons/character/Lv4.svg';

import useRankPage from '../model/rankPageHook';
import { ProblemPagination } from '@/feature/pagination/ui';
import { TopRankUser } from './topRankUser';

const RankPage = () => {
  const {
    myRanking,
    otherUsers,
    displayedUsers,
    userRankingDisplay,
    getScoreColor,
    currentPage,
    setCurrentPage,
    totalPages,
    isLoading,
  } = useRankPage();

  // 캐릭터 이미지는 임의로 넣음
  return (
    <div className="flex w-full flex-col overflow-auto p-16p pb-[5rem] font-pixel font-bold text-white">
      <span className="text-[32px]">Ranking</span>
      <div className="flex h-[clamp(8rem,30%,12rem)] w-full min-w-[15rem] items-end justify-center gap-[0.1rem] px-[5%]">
        <TopRankUser
          user={displayedUsers[1]}
          levelIcon={Lv2Image}
          heightClass="h-[86%]"
          delayClass="delay-500"
          rank="2"
        />
        <TopRankUser
          user={displayedUsers[0]}
          levelIcon={Lv4Image}
          heightClass="h-full"
          rank="1"
        />
        <TopRankUser
          user={displayedUsers[2]}
          levelIcon={Lv3Image}
          heightClass="h-[80%]"
          delayClass="delay-1000"
          rank="3"
        />
      </div>
      <>
        <div className="mt-12 flex flex-col gap-2">
          {displayedUsers.map((user, index) => (
            <>
              {index > 2 && (
                <div className="flex items-center gap-1">
                  <span className="w-[25px] text-[20px]">{user.rankNo}</span>
                  <div className="flex w-full items-center justify-between rounded-full border border-white px-16p py-8p text-[20px]">
                    <div className="flex items-center gap-3">
                      <SvgIcon component={Lv4Image} inheritViewBox />
                      <span>{user.nickname}</span>
                    </div>

                    <span className="text-point-yellow">{user.userScore}</span>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </>
    </div>
  );
};

export default RankPage;
