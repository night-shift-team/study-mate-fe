import UpdateProblem from '@/page/adminProblem/ui/updateProblem';
import { ProblemDetailPageProps } from '../../detail/page';

const UpdateProblemPage = async (props: {
  searchParams: Promise<ProblemDetailPageProps>;
}) => {
  const searchParams = await props.searchParams;
  const params = searchParams;
  return <UpdateProblem params={params} />;
};

export default UpdateProblemPage;
