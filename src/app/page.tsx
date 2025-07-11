import PageAnimationWrapper from '@/shared/style/ui/pageAnimationWrapper';
import LoginPage from './login/page';
import { pageMetadata } from '@/pageMetadata';

export const metadata = pageMetadata.home;

export default function Home() {
  return (
    <PageAnimationWrapper>
      <LoginPage />
    </PageAnimationWrapper>
  );
}
