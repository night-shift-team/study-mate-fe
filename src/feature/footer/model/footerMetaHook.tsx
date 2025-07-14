import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { FaEnvelope, FaGithub } from 'react-icons/fa';

const useFooterMeta = () => {
  const developers = [
    { label: '이한동' },
    { label: '주정혁' },
    { label: '고연수' },
  ];

  const quickLinks = [
    { label: '홈', href: RouteTo.Solve },
    { label: '공지사항', href: RouteTo.Announcement },
    { label: '랭킹', href: RouteTo.Rank },
    { label: '상점', href: RouteTo.Store },
    { label: '마이페이지', href: RouteTo.Mypage },
    { label: '문의하기', href: RouteTo.Suggestion },
  ];

  const contacts = [
    {
      icon: <FaEnvelope size={20} />,
      href: 'joodinner@gmail.com',
      label: 'Email',
    },
    {
      icon: <FaGithub size={20} />,
      href: 'https://github.com/night-shift-team',
      label: 'GitHub',
    },
  ];
  return { developers, quickLinks, contacts };
};
export default useFooterMeta;
