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
      className={`user-select-none flex cursor-pointer flex-col gap-1 rounded-sm p-8p ${
        isQuestion ? 'bg-gray-300/30' : 'bg-point-purple/30'
      } text-white`}
    >
      <div className="flex items-center space-x-1">
        <span className="text-point-yellow">
          {status === 'Q' ? 'Q.' : '공지'}
        </span>
        <span className="text-[18px]">{title}</span>
      </div>

      {content && <p className="text-[14px] font-thin text-white">{content}</p>}

      {createdAt && (
        <div className="text-left text-xs text-gray-300">{createdAt}</div>
      )}
    </div>
  );
};
