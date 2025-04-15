import { NoticeCategory } from '../api';

export const convertNoticeCategoryToString = (category?: NoticeCategory) => {
  switch (category) {
    case NoticeCategory.GENERAL:
      return '공지';
    case NoticeCategory.EVENT:
      return '이벤트';
    case NoticeCategory.MAINTENANCE:
      return '점검';
    case NoticeCategory.URGENT:
      return '긴급';
    default:
      return '공지';
  }
};

export const splitNoticeTitle = (title?: string) => {
  if (!title) return { first: '', rest: '' };
  const split = title.split(']');
  const first = split[0];
  const rest = split.slice(1).join();
  return { first, rest };
};

export const timestampToDate = (timestamp?: string) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};
