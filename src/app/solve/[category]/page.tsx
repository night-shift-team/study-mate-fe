import SolvingProblemPage from '@/page/solve/ui/solvingProblemPage';
import { ProblemCategoryTitle } from '@/shared/problem/model/problemInfo.types';
import PageAnimationWrapper from '@/shared/style/ui/pageAnimationWrapper';

const ProblemPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;

  return (
    <PageAnimationWrapper>
      <SolvingProblemPage
        category={category as 'random' | ProblemCategoryTitle}
      />
    </PageAnimationWrapper>
  );
};

export default ProblemPage;
