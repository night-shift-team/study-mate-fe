import LevelTestPage from '@/page/level_test/ui';
import UserStateWrapper from '@/shared/state/userStore/model/clientSideWrapper';
import PageAnimationWrapper from '@/shared/style/ui/pageAnimationWrapper';

const LevelTest = () => {
  return (
    <UserStateWrapper>
      <PageAnimationWrapper>
        <LevelTestPage />
      </PageAnimationWrapper>
    </UserStateWrapper>
  );
};

export default LevelTest;
