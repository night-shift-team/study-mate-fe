import Problem from '@/page/solve/ui/problem';
import { ProblemCategoryTitle } from '@/shared/constants/problemInfo';

const ProblemPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;

  return <Problem category={category as 'random' | ProblemCategoryTitle} />;
};

export default ProblemPage;
