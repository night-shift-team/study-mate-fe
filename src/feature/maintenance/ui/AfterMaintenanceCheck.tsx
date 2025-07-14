import Image from 'next/image';
import UnderConstruction from '@public/assets/backgroundImages/main/under_construction.png';
import { RemainTimeSV2 } from '../ui/noticeEndTimerV2';
import useAfterMaintenanceCheck from '../model/AfterMaintenanceCheckHook';

const AfterMaintenanceCheck = async ({
  renderChildren: children,
}: {
  renderChildren: React.ReactNode;
}) => {
  const isNotOpen = await useAfterMaintenanceCheck();
  return (
    <>
      {isNotOpen === false ? (
        children
      ) : (
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
          {isNotOpen.maintenaceNotices[0] ? (
            <div className="flex w-full flex-col items-center justify-center p-2">
              <p>{isNotOpen.displayNotices[0]?.noticeTitle ?? ''}</p>
              <p>{isNotOpen.maintenaceNotices[0]?.maintenanceEndTime ?? ''}</p>
              <RemainTimeSV2
                endDate={
                  isNotOpen.maintenaceNotices[0]?.maintenanceEndTime
                    ? new Date(
                        isNotOpen.maintenaceNotices[0]?.maintenanceEndTime ?? ''
                      )
                    : new Date(Date.now())
                }
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};
export default AfterMaintenanceCheck;
