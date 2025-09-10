import NewHeader from '@/feature/header/ui/newheader';
import TestResultSolutionPage from '@/page/level_result_solution/ui';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import UserStateWrapper from '@/shared/state/userStore/model/clientSideWrapper';
import PageAnimationWrapper from '@/shared/style/ui/pageAnimationWrapper';
import LeftArrow from '@public/assets/icons/header/left_arrow.svg';
import HomeLogo from '@public/assets/icons/header/mobile_logo.svg';
import Avatar from '@public/assets/icons/header/Avatar.svg';
import Link from 'next/link';

const TestResultSolution = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const seperateUnder = id.split('-');
  const problemId = seperateUnder.slice(0, seperateUnder.length - 1).join('-');
  const userAnswer = seperateUnder[seperateUnder.length - 1];

  return (
    <UserStateWrapper>
      <PageAnimationWrapper>
        <NewHeader
          left={
            <Link href={RouteTo.LevelTestResult} className="h-5 w-5">
              <LeftArrow className="h-full w-full" />
            </Link>
          }
          center={
            <Link href={RouteTo.Solve} className="h-[35.63px] w-[60px]">
              <HomeLogo className="h-full w-full" />
            </Link>
          }
          right={
            <Link href={RouteTo.Mypage} className="h-10 w-10">
              <Avatar className="h-full w-full" />
            </Link>
          }
        ></NewHeader>
        <TestResultSolutionPage
          type="test"
          problemId={problemId}
          userAnswer={userAnswer}
        />
      </PageAnimationWrapper>
    </UserStateWrapper>
  );
};
export default TestResultSolution;
