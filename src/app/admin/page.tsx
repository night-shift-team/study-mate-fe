import AdminPage from '@/page/adminLogin/index';
import { updateUser } from '@/shared/user/model/updateUser';
import UserStateWrapper from '@/state/userStore/model/clientSideWrapper';

const Admin = async () => {
  const user = await updateUser();
  return (
    <UserStateWrapper user={user}>
      <AdminPage />
    </UserStateWrapper>
  );
};
export default Admin;
