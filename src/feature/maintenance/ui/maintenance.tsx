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
        <div className="flex w-full flex-col items-center justify-center p-2">
          <p>
            {notices.displayNotices[0]?.noticeTitle ?? '임시 점검 중입니다.'}
          </p>
          <p>{notices.maintenaceNotices[0]?.maintenanceEndTime ?? ''}</p>
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
