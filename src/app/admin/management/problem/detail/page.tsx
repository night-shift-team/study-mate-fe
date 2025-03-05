import ProblemDetail from '@/page/adminProblem/ui/problemDetail';

export interface ProblemDetailPageProps {
  id: number;
  title: string;
  descr: string;
  markdown: string;
}

const ProblemDetailPage = async (props: {
  searchParams: Promise<ProblemDetailPageProps>;
}) => {
  const searchParams = await props.searchParams;
  const params = searchParams;
  return <ProblemDetail params={params} />;
};
export default ProblemDetailPage;
