import { FC } from 'react';

type NoticeStatus = 'Q' | '공지';

interface NoticeListProps {
  id?: string;
  title: string;
  status?: NoticeStatus;
  createdAt?: string;
  content?: string;
}

export const NoticeList: FC<NoticeListProps> = ({
  title,
  status,
  createdAt,
  content,
}) => {
  const isQuestion = status === 'Q';

  return (
    <div
      className={`user-select-none flex cursor-pointer flex-col gap-1 rounded-sm pb-[12px] pl-16p pr-16p pt-[12px] font-pretandard ${
        isQuestion ? 'bg-gray-300/30' : 'bg-[#E5E5E5] dark:bg-point-purple/30'
      } text-white`}
    >
      <div className="flex items-center gap-1 text-body-primary">
        <span className="text-point-yellow">
          {status === 'Q' ? 'Q.' : '공지'}
        </span>
        <span className="text-[18px] text-black dark:text-white">{title}</span>
      </div>

      {content && (
        <p className="text-[12px] font-light text-black dark:text-white">
          {content}
        </p>
      )}

      {createdAt && (
        <div className="text-left text-xs text-gray-300">{createdAt}</div>
      )}
    </div>
  );
};
