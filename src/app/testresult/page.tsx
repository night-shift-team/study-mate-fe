import LevelResult from '@/page/level_result/ui';
import PageAnimationWrapper from '@/shared/style/ui/pageAnimationWrapper';
import UserStateWrapper from '@/state/userStore/model/clientSideWrapper';

const TestResultPage = () => {
  return (
    <UserStateWrapper>
      <PageAnimationWrapper>
        <LevelResult />
      </PageAnimationWrapper>
    </UserStateWrapper>
  );
};

export default TestResultPage;
