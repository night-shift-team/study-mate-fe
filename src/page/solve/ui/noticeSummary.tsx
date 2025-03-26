import { useEffect, useState } from 'react';

type NoticeType = {
  type: 'notice' | 'event';
  title: string;
  link: string;
};

const noticeData: NoticeType[] = [
  {
    type: 'notice',
    title: '공지사항',
    link: '/notice',
  },
  {
    type: 'event',
    title: '이벤트 내용 입니다.',
    link: '/event',
  },
];

const NoticeSummary = () => {
  const [currentNotice, setCurrentNotice] = useState<NoticeType>(noticeData[0]);
  const [nextNotice, setNextNotice] = useState<NoticeType>(noticeData[1]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let i = 0;

    const noticeInterval = setInterval(() => {
      // 애니메이션 시작
      setIsAnimating(true);

      // 애니메이션 종료 후 데이터 변경
      setTimeout(() => {
        i = (i + 1) % noticeData.length; //* i를 순환하도록 설정
        setCurrentNotice(noticeData[i]);
        setNextNotice(noticeData[(i + 1) % noticeData.length]); // 다음 공지사항 설정
        setIsAnimating(false); // 애니메이션 종료
      }, 300); // 애니메이션 지속 시간 (300ms)
    }, 5000);

    return () => clearInterval(noticeInterval);
  }, []);

  return (
    <div className="relative flex h-10 w-full flex-shrink-0 bg-gray-800/80 px-4 text-white">
      {/* 현재 공지사항 */}
      <div
        className={`absolute flex h-full w-full items-center gap-1 ${
          isAnimating
            ? '-translate-y-full transition-transform duration-300'
            : 'translate-y-0'
        }`}
      >
        <span>[{currentNotice.type}]</span>
        <span>{currentNotice.title}</span>
      </div>

      {/* 다음 공지사항 */}
      <div
        className={`absolute flex h-full w-full items-center gap-1 ${
          isAnimating
            ? 'translate-y-0 transition-transform duration-300'
            : 'translate-y-full'
        }`}
      >
        <span>[{nextNotice.type}]</span>
        <span>{nextNotice.title}</span>
      </div>
    </div>
  );
};

export default NoticeSummary;
