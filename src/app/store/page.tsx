import StorePage from '@/page/store/ui';
import { pageMetadata } from '@/pageMetadata';
import PageAnimationWrapper from '@/shared/style/ui/pageAnimationWrapper';

export const metadata = pageMetadata.store;
export const revalidate = 0;

const Store = () => {
  return (
    <PageAnimationWrapper>
      <StorePage />
    </PageAnimationWrapper>
  );
};
export default Store;
