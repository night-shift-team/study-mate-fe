import ProblemDetail from '@/page/adminProblem/ui/problemDetailPage';

export interface ProblemDetailPageProps {
  id: number;
}

const ProblemDetailPage = async (props: {
  searchParams: Promise<ProblemDetailPageProps>;
}) => {
  const searchParams = await props.searchParams;
  return <ProblemDetail id={searchParams.id} />;
};
export default ProblemDetailPage;
