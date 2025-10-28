'use client';
import UnderConstruction from '@public/assets/backgroundImages/main/under_construction.png';
import Image from 'next/image';
import { RemainTimeSV2 } from './noticeEndTimerV2';
import { GetValidnoticeListRes } from '@/feature/notice/api';

const Maintenance = ({ notices }: { notices?: GetValidnoticeListRes }) => {
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
      <span className="flex w-full justify-center">유지보수중입니다.</span>
      {notices?.maintenaceNotices[0] ? (
        <div className="mt-2 flex w-full flex-col items-center justify-center p-4">
          <p>{notices.displayNotices[0]?.noticeTitle ?? ''}</p>
          <p className="font-pretandard">
            점검 종료 시각 :{' '}
            {notices.maintenaceNotices[0]?.maintenanceEndTime
              ? new Date(
                  notices.maintenaceNotices[0].maintenanceEndTime
                ).toLocaleDateString() +
                '  ' +
                new Date(
                  notices.maintenaceNotices[0].maintenanceEndTime
                ).toLocaleTimeString()
              : ''}
          </p>
          <RemainTimeSV2
            endDate={
              notices.maintenaceNotices[0]?.maintenanceEndTime
                ? new Date(
                    notices.maintenaceNotices[0]?.maintenanceEndTime ?? ''
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
};
export default Maintenance;
