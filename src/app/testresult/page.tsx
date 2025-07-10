import TestResultPage from '@/page/level_result/ui';
import UserStateWrapper from '@/shared/state/userStore/model/clientSideWrapper';
import PageAnimationWrapper from '@/shared/style/ui/pageAnimationWrapper';

const TestResult = () => {
  return (
    <UserStateWrapper>
      <PageAnimationWrapper>
        <TestResultPage />
      </PageAnimationWrapper>
    </UserStateWrapper>
  );
};

export default TestResult;
