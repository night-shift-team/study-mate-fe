'use client';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { IoMenu } from 'react-icons/io5';
import MobileSlider from './mobileSilder';
import { MdLogout } from 'react-icons/md';
import { LuLayoutDashboard } from 'react-icons/lu';
import RankingIcon from '@public/assets/icons/header/ranking-factor.png';
import AnnouncementIcon from '@public/assets/icons/header/announcement.png';
import MypageIcon from '@public/assets/icons/header/user.png';
import Image from 'next/image';
import StoreIcon from '@public/assets/icons/header/storeIcon.svg';
import { SvgIcon } from '@mui/material';
import useRightHeader from '../model/rightHeaderHook';
import { HeaderSmallIcon } from './headerSmallIcon';

const RightHeader = () => {
  const { routePath, isOpen, setIsOpen, router, setUser } = useRightHeader();
  //어드민 페이지 라우팅
  if (routePath.includes('/admin')) {
    switch (routePath) {
      case RouteTo.AdminLogin:
        return null;
      default:
        return (
          <div className="z-[1] flex gap-2">
            <HeaderSmallIcon
              title="관리자 대시보드"
              onClick={() => router.push(RouteTo.AdminDashboard)}
              component={<LuLayoutDashboard />}
            />
            <HeaderSmallIcon
              title="로그아웃"
              onClick={() => {
                setUser(null);
                router.push(RouteTo.Home);
              }}
              component={<MdLogout />}
            />
          </div>
        );
    }
    // 유저 페이지 라우팅
  } else {
    switch (routePath) {
      case RouteTo.Home:
      case RouteTo.Login:
      case RouteTo.Signup:
        return null;
      case RouteTo.LevelTest:
        return (
          <div className="z-[1] flex">
            <HeaderSmallIcon
              title="로그아웃"
              onClick={() => {
                setUser(null);
                router.push(RouteTo.Home);
              }}
              component={<MdLogout />}
            />
          </div>
        );
      default:
        return (
          <div className="z-[1] flex">
            <div className="md:hidden">
              <IoMenu
                className={`mr-1 cursor-pointer text-[1.65rem] font-bold ${routePath.startsWith(RouteTo.Store) ? 'text-black' : 'text-pointcolor-beigebrown'}`}
                onClick={() => setIsOpen(true)}
              />
            </div>
            <div className="hidden gap-2 md:flex">
              <HeaderSmallIcon
                title="상점"
                onClick={() => {
                  router.push(RouteTo.Store);
                }}
                component={
                  <SvgIcon
                    component={StoreIcon}
                    inheritViewBox
                    sx={{ width: 26, height: 26 }}
                  />
                }
              />
              <HeaderSmallIcon
                title="Announcement"
                onClick={() => {
                  router.push(RouteTo.Announcement);
                }}
                component={
                  <Image
                    src={AnnouncementIcon}
                    alt="announcement"
                    width={20}
                    height={20}
                  />
                }
              />
              <HeaderSmallIcon
                title="랭킹"
                onClick={() => {
                  router.push(RouteTo.Rank);
                }}
                component={
                  <Image
                    src={RankingIcon}
                    alt="ranking"
                    width={20}
                    height={20}
                  />
                }
              />
              {/* <HeaderSmallIcon
                title="건의사항"
                onClick={() => {
                  router.push(RouteTo.Suggestion);
                }}
                component={
                  <Image
                    src={SuggestionIcon}
                    alt="suggestion"
                    width={20}
                    height={20}
                  />
                }
              /> */}
              <HeaderSmallIcon
                title="마이 페이지"
                onClick={() => {
                  router.push(RouteTo.Mypage);
                }}
                component={
                  <Image src={MypageIcon} alt="mypage" width={20} height={20} />
                }
              />
              <HeaderSmallIcon
                title="로그아웃"
                onClick={() => {
                  setUser(null);
                  router.push(RouteTo.Home);
                }}
                component={<MdLogout size={20} />}
              />
            </div>
            <div className="z-[999]"></div>
            <MobileSlider open={isOpen} setOpen={setIsOpen} />
          </div>
        );
    }
  }
};
export default RightHeader;
