import SignUpPage from '@/page/signup/ui';
import { pageMetadata } from '@/pageMetadata';
import PageAnimationWrapper from '@/shared/style/ui/pageAnimationWrapper';

export const metadata = pageMetadata.signup;
export const revalidate = 0;

const SignUp = () => {
  return (
    <PageAnimationWrapper>
      <SignUpPage />
    </PageAnimationWrapper>
  );
};

export default SignUp;
