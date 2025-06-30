import AdminHomeDashboardPage from '@/page/adminHomeDashboard/index';
import UserStateWrapper from '@/state/userStore/model/clientSideWrapper';

const AdminDashboard = () => {
  return (
    <UserStateWrapper>
      <AdminHomeDashboardPage />
    </UserStateWrapper>
  );
};
export default AdminDashboard;
