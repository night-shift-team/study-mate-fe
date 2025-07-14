import SuggestionPage from '@/page/suggestion/ui';
import PageAnimationWrapper from '@/shared/style/ui/pageAnimationWrapper';
import { pageMetadata } from '@/pageMetadata';

export const metadata = pageMetadata.suggestion;

const Suggestion = () => {
  return (
    <PageAnimationWrapper>
      <SuggestionPage />
    </PageAnimationWrapper>
  );
};
export default Suggestion;
