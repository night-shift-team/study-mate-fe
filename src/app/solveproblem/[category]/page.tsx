import Problem from '@/page/solveProblem/ui/problem';

const ProblemPage = async ({ params }: { params: { category: string } }) => {
  const { category } = await params;
  console.log(category);

  return <Problem category={category} />;
};

export default ProblemPage;
