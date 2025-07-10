import { FirstLoading } from '@/feature/maintenance/ui/firstLoading';
import AdminPage from '@/page/adminLogin/index';
import { updateUser } from '@/shared/user/model/updateUser';
import UserStateWrapper from '@/state/userStore/model/clientSideWrapper';
import { Suspense } from 'react';

const Admin = async () => {
  const user = await updateUser();
  return (
    <Suspense fallback={<FirstLoading />}>
      <UserStateWrapper user={user}>
        <AdminPage />
      </UserStateWrapper>
    </Suspense>
  );
};
export default Admin;
