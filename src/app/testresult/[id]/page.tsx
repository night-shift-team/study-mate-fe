import TestResultSolutionPage from '@/page/level_result_solution/ui';
import UserStateWrapper from '@/shared/state/userStore/model/clientSideWrapper';
import PageAnimationWrapper from '@/shared/style/ui/pageAnimationWrapper';

const TestResultSolution = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const seperateUnder = id.split('-');
  const problemId = seperateUnder.slice(0, seperateUnder.length - 1).join('-');
  const userAnswer = seperateUnder[seperateUnder.length - 1];

  return (
    <UserStateWrapper>
      <PageAnimationWrapper>
        <TestResultSolutionPage
          type="test"
          problemId={problemId}
          userAnswer={userAnswer}
        />
      </PageAnimationWrapper>
    </UserStateWrapper>
  );
};
export default TestResultSolution;
