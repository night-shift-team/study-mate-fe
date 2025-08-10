import SuggestionPage from '@/page/suggestion/ui';
import PageAnimationWrapper from '@/shared/style/ui/pageAnimationWrapper';
import { pageMetadata } from '@/pageMetadata';

export const metadata = pageMetadata.suggestion;
export const revalidate = 0;

const Suggestion = () => {
  return (
    <PageAnimationWrapper>
      <SuggestionPage />
    </PageAnimationWrapper>
  );
};
export default Suggestion;
