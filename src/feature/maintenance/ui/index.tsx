import {
  getValidNoticeListApi,
  GetValidnoticeListRes,
} from '@/feature/notice/api';
import Image from 'next/image';
import { RemainTimeSV2 } from './noticeEndtimer';
import { Suspense } from 'react';
import Logo from '@public/assets/backgroundImages/main/logo.svg';
import UnderConstruction from '@public/assets/backgroundImages/main/under_construction.png';

export const MaintenanceCheck = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const MaintenanceContent = async () => {
    try {
      const res = await getValidNoticeListApi();
      if (res.ok && res.payload) {
        const data = res.payload as GetValidnoticeListRes;
        const isMaintenance = data.isMaintenanceNoticeExist;
        if (isMaintenance) {
          return (
            <div className="flex h-full w-full flex-col items-center justify-center">
              <div className="flex w-full justify-center">
                <Image
                  src={UnderConstruction}
                  alt="under_construction"
                  objectFit="contain"
                  priority
                  width={150}
                />
              </div>
              <span className="flex w-full justify-center">
                유지보수중입니다.
              </span>
              {data.maintenaceNotices[0] ? (
                <div className="flex w-full flex-col items-center justify-center p-2">
                  <p>{data.displayNotices[0]?.noticeTitle ?? ''}</p>
                  <p>{data.maintenaceNotices[0]?.maintenanceEndTime ?? ''}</p>
                  <RemainTimeSV2
                    endDate={
                      data.maintenaceNotices[0]?.maintenanceEndTime
                        ? new Date(
                            data.maintenaceNotices[0]?.maintenanceEndTime ?? ''
                          )
                        : new Date(Date.now())
                    }
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          );
        } else {
          // sessionStorage에 유효한 공지사항 저장
          if (data.isMaintenanceNoticeExist) {
            sessionStorage.setItem(
              'validNoticeList',
              JSON.stringify(data.displayNotices)
            );
          }
        }
      }
      return <>{children}</>;
    } catch (e) {
      console.log(e);
      return <>{children}</>;
    }
  };

  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <div className="animate-fade-in">
            <Image
              src={Logo}
              alt="Logo"
              objectFit="contain"
              priority
              width={300}
            />
          </div>
        </div>
      }
    >
      <MaintenanceContent />
    </Suspense>
  );
};
