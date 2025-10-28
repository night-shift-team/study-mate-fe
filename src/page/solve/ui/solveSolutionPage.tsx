import { ProblemDetailInfoRes } from '@/page/adminProblem/api';
import TestResultSolutionPage from '@/page/level_result_solution/ui';

const SolveSolutionPage = ({
  solutionData,
  userAnswer,
}: {
  solutionData: ProblemDetailInfoRes | null;
  userAnswer?: string;
}) => {
  return (
    <TestResultSolutionPage
      type="solve"
      problemInfo={solutionData}
      problemId={solutionData?.questionId}
      userAnswer={userAnswer}
    />
  );
};
export default SolveSolutionPage;
