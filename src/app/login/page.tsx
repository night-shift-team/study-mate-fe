import LoginPage from '@/page/login/ui';
import { pageMetadata } from '@/pageMetadata';
import PageAnimationWrapper from '@/shared/style/ui/pageAnimationWrapper';

export const metadata = pageMetadata.login;
export const revalidate = 0;

const Login = () => {
  return (
    <PageAnimationWrapper>
      <LoginPage />
    </PageAnimationWrapper>
  );
};

export default Login;
