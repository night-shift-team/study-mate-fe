import AdminHomeDashboardPage from '@/page/adminHomeDashboard/ui';
import UserStateWrapper from '@/shared/state/userStore/model/clientSideWrapper';

const AdminDashboard = () => {
  return (
    <UserStateWrapper>
      <AdminHomeDashboardPage />
    </UserStateWrapper>
  );
};
export default AdminDashboard;
