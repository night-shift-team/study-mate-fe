import LevelTest from '@/page/level_test/ui';
import PageAnimationWrapper from '@/shared/style/ui/pageAnimationWrapper';
import UserStateWrapper from '@/state/userStore/model/clientSideWrapper';

const LevelTestPage = () => {
  return (
    <UserStateWrapper>
      <PageAnimationWrapper>
        <LevelTest />
      </PageAnimationWrapper>
    </UserStateWrapper>
  );
};

export default LevelTestPage;
