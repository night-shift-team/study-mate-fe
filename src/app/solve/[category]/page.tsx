import Problem from '@/page/solve/ui/problem';
import { ProblemCategoryTitle } from '@/shared/constants/problemInfo';
import PageAnimationWrapper from '@/shared/style/ui/pageAnimationWrapper';

const ProblemPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;

  return (
    <PageAnimationWrapper>
      <Problem category={category as 'random' | ProblemCategoryTitle} />
    </PageAnimationWrapper>
  );
};

export default ProblemPage;
