import StorePage from '@/page/store/ui';
import PageAnimationWrapper from '@/shared/style/ui/pageAnimationWrapper';
import { pageMetadata } from '@/pageMetadata';

export const metadata = pageMetadata.store;

const Store = () => {
  return (
    <PageAnimationWrapper>
      <StorePage />
    </PageAnimationWrapper>
  );
};
export default Store;
