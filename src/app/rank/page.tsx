import RankPage from '@/page/rank/ui';
import PageAnimationWrapper from '@/shared/style/ui/pageAnimationWrapper';
import { pageMetadata } from '@/pageMetadata';

export const metadata = pageMetadata.rank;
const Rank = () => {
  return (
    <PageAnimationWrapper>
      <RankPage />
    </PageAnimationWrapper>
  );
};

export default Rank;
