import Image from 'next/image';
import { userStore } from '@/shared/state/userStore/model';
import Lv2Image from '@public/assets/icons/character/Lv2.svg';
import Lv3Image from '@public/assets/icons/character/Lv3.svg';
import Lv4Image from '@public/assets/icons/character/Lv4.svg';
import { SvgIcon } from '@mui/material';
import useRankPage from '../model/rankPageHook';

interface UserDataItem {
  title: string;
  value: string | number;
}

// 랭크 번호를 영어 서수(ordinal)로 변환
function getOrdinalSuffix(rank: number | string): string {
  const num = typeof rank === 'string' ? parseInt(rank, 10) : rank;
  if (isNaN(num)) return '-';

  const j = num % 10;
  const k = num % 100;

  if (j === 1 && k !== 11) return `${num}st`;
  if (j === 2 && k !== 12) return `${num}nd`;
  if (j === 3 && k !== 13) return `${num}rd`;
  return `${num}th`;
}

export const MyRankBox = () => {
  const { user } = userStore();
  const { displayedUsers } = useRankPage();

  const score = user?.userScore ?? 0;
  const level = Math.floor(score / 1000);

  const myRankData = displayedUsers.find((u) => u.userId === user?.userId);
  const rankNo = myRankData?.rankNo ?? '-';

  const userData: UserDataItem[] = [
    { title: 'Rank', value: getOrdinalSuffix(rankNo) },
    { title: 'Level', value: level },
    { title: 'Score', value: score },
  ];

  return (
    <div className="flex h-[100px] w-full items-center justify-between rounded-lg bg-point-purple/60 px-[6%] font-pixel text-[2.7vh] text-white">
      {/* 왼쪽 아바타 + 이름 */}
      <div className="flex flex-col items-center justify-center">
        <SvgIcon
          component={Lv4Image}
          inheritViewBox
          sx={{ width: '50px', height: '50px' }}
        />
        <span className="text-[1.8vh]">Me</span>
      </div>

      {/* 오른쪽 데이터 영역 */}
      <div className="flex flex-1 justify-around">
        {userData.map((item) => (
          <div key={item.title} className="flex flex-col items-center">
            <span>{item.title}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
