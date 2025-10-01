import useAfterMaintenanceCheck from '../model/AfterMaintenanceCheckHook';
import Maintenance from './maintenance';

const AfterMaintenanceCheck = async ({
  renderChildren: children,
}: {
  renderChildren: React.ReactNode;
}) => {
  const isNotOpen = await useAfterMaintenanceCheck();
  console.log(isNotOpen);
  return (
    <>{isNotOpen === false ? children : <Maintenance notices={isNotOpen} />}</>
  );
};
export default AfterMaintenanceCheck;
