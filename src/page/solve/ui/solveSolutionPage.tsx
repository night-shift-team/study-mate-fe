import { ProblemDetailInfoRes } from '@/page/adminProblem/api';
import TestResultSolutionPage from '@/page/level_result_solution/ui';

const SolveSolutionPage = ({
  solutionData,
}: {
  solutionData: ProblemDetailInfoRes;
}) => {
  return <TestResultSolutionPage type="solve" problemInfo={solutionData} />;
};
export default SolveSolutionPage;
