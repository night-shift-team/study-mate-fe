import { FC } from 'react';

type NoticeStatus = 'Q' | '공지';

interface NoticeListProps {
  title: string;
  status?: NoticeStatus;
  createdAt?: string;
  content?: string;
}

export const NoticeList: FC<NoticeListProps> = ({
  title,
  status = '공지',
  createdAt,
  content,
}) => {
  const isQuestion = status === 'Q';

  return (
    <div
      className={`flex flex-col gap-2 rounded-sm p-4 ${
        isQuestion ? 'bg-gray-300' : 'bg-point-purple'
      } text-white`}
    >
      <div className="flex items-center space-x-2">
        <span className="text-point-yellow">
          {status === 'Q' ? 'Q.' : '공지'}
        </span>
        <span className="">{title}</span>
      </div>

      {content && <p className="line-clamp-2 text-sm text-white">{content}</p>}

      {createdAt && (
        <div className="text-left text-xs text-gray-300">{createdAt}</div>
      )}
    </div>
  );
};
