import useAfterMaintenanceCheck from '../model/AfterMaintenanceCheckHook';
import Maintenance from './maintenance';

const AfterMaintenanceCheck = async ({
  renderChildren: children,
}: {
  renderChildren: React.ReactNode;
}) => {
  const isNotOpen = await useAfterMaintenanceCheck();
  return (
    <>{isNotOpen === false ? children : <Maintenance notices={isNotOpen} />}</>
  );
};
export default AfterMaintenanceCheck;
