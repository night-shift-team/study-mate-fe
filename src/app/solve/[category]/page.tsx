import Problem from '@/page/solve/ui/problem';

const ProblemPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;
  console.log(category);

  return <Problem category={category} />;
};

export default ProblemPage;
