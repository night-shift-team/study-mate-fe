import { Suspense } from 'react';
import { FirstLoading } from './firstLoading';
import AfterMaintenanceCheck from './AfterMaintenanceCheck';

export const MaintenanceCheck = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Suspense fallback={<FirstLoading />}>
      <AfterMaintenanceCheck renderChildren={children} />
    </Suspense>
  );
};
