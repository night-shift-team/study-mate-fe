import Problem from '@/page/solveProblem/ui/problem';

const ProblemPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;

  return <Problem category={category} />;
};

export default ProblemPage;
