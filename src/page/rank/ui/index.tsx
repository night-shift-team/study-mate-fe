'use client';
import { SvgIcon } from '@mui/material';

import Lv2Image from '@public/assets/icons/character/Lv2.svg';
import Lv3Image from '@public/assets/icons/character/Lv3.svg';
import Lv4Image from '@public/assets/icons/character/Lv4.svg';

import useRankPage from '../model/rankPageHook';
import { TopRankUser } from './topRankUser';

const RankPage = () => {
  const { displayedUsers } = useRankPage();

  // 캐릭터 이미지는 임의로 넣음
  return (
    <div
      className="flex w-full flex-col overflow-scroll p-16p pb-[5rem] font-pixel font-bold text-white"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <span className="text-[32px] text-black dark:text-white">Ranking</span>
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
        <div className="mt-[80px] flex flex-col gap-16p">
          {displayedUsers.map((user, index) =>
            index > 2 ? (
              <div key={user.rankNo} className="flex items-center gap-1">
                <span className="w-[25px] text-[20px] text-black dark:text-white">
                  {user.rankNo}
                </span>
                <div className="flex w-full items-center justify-between rounded-full border border-black px-16p py-8p text-[20px] dark:border-white">
                  <div className="flex items-center gap-3">
                    <SvgIcon
                      component={Lv4Image}
                      inheritViewBox
                      sx={{ width: '40px', height: '40px' }}
                    />
                    <span className="text-black dark:text-white">
                      {user.nickname}
                    </span>
                  </div>

                  <span className="mr-8p text-point-yellow">
                    {user.userScore}
                  </span>
                </div>
              </div>
            ) : null
          )}
        </div>
      </>
    </div>
  );
};

export default RankPage;
