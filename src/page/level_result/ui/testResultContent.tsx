import { DonutChart } from '@/feature/charts/DonutChart';
import useTestResultContent from '../model/testResultHook';
import { Category } from './category';
import Item from '@/feature/level_result/Item';
import Button from '@/shared/design/ui/customButton';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import { PopupProblem } from '@/shared/popUp/ui/popupV2';
import { RouteTo } from '@/shared/routes/model/getRoutePath';

const TestResultContent = () => {
  const {
    data,
    calculateLevel,
    correctCount,
    totalQuestions,
    generateCategoryData,
    setSelectedCategoryKey,
    filteredProblems,
    questionInfos,
    resultData,
    popup,
    setPopup,
    router,
    handleOpenPopup,
    selectedQuestion,
    handleClosePopup,
    isLoading,
  } = useTestResultContent();

  if (!isLoading) {
    return <Spinner size="xl" />;
  }

  return (
    <div className="flex h-full w-full max-w-[1200px] flex-col items-center gap-6 overflow-y-scroll rounded-2xl bg-pointcolor-yogurt p-3 shadow-[0_8px_30px_rgb(0,0,0,0.06)] scrollbar-hide md:justify-center">
      <div className="flex w-[100%] flex-col gap-6 md:h-auto md:flex-row">
        <div className="flex w-[100%] flex-col items-center space-y-4">
          <div className="flex h-full w-full justify-center pt-6 md:p-[8%]">
            <DonutChart
              data={data}
              level={calculateLevel(correctCount ?? 0, totalQuestions ?? 1)}
              correctAnswer={correctCount}
              wrongAnswer={totalQuestions}
            />
          </div>
        </div>

        <Category
          data={generateCategoryData()}
          onSelectCategory={setSelectedCategoryKey}
        />
        <div className="flex h-full w-full flex-col gap-5">
          <button className="hidden items-center justify-between rounded-md bg-[#FEBA73] p-3 text-white md:flex">
            자세히 보기
            {/* <div className="h-auto w-[40px]">
              <SvgIcon
                inheritViewBox
                component={Arrow}
                sx={{ width: '100%', height: '100%' }}
              />
            </div> */}
          </button>
          <div className="grid grid-cols-2 flex-col gap-[0.1rem] overflow-y-scroll rounded-lg bg-none p-0.5 scrollbar-hide md:flex md:h-[40vh] md:bg-white md:shadow-md">
            {filteredProblems.map((problem, index) => {
              const title = questionInfos[problem.id]?.title ?? '제목 없음';
              const number = problem.no;
              return (
                <Item
                  key={index}
                  index={index}
                  title={title}
                  number={number}
                  isCorrectAnswer={
                    resultData?.correctQuestions.includes(problem.id) ?? false
                  }
                  onClick={async () => {
                    setPopup(true);
                    await handleOpenPopup(index, problem.id);
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Button
        size="lg"
        className="mb-2 flex w-full bg-[#FEBA73] text-white underline-offset-[3px] hover:bg-[#ffa442] md:mb-0 md:w-[20rem]"
        onClick={() => router.push(RouteTo.Home)}
      >
        홈으로
      </Button>

      {popup &&
        // <Popup
        //   index={selectedQuestion?.index}
        //   title={selectedQuestion?.title}
        //   content={selectedQuestion?.content}
        //   userAnswer={selectedQuestion?.userAnswer}
        //   correctAnswer={selectedQuestion?.correctAnswer}
        //   explanation={selectedQuestion?.explanation}
        //   onClose={handleClosePopup}
        // />
        (!selectedQuestion ? (
          <div className="fixed flex h-full w-full items-center justify-center bg-[#fdfbf3]/50 backdrop:blur-xl">
            <Spinner size="xl" />
          </div>
        ) : (
          <PopupProblem
            size="md"
            onClose={handleClosePopup}
            difficulty={selectedQuestion?.index.toString() ?? ''}
            questionTitle={selectedQuestion?.title ?? ''}
            content={selectedQuestion?.content ?? ''}
            answer={selectedQuestion?.correctAnswer ?? ''}
            explanation={selectedQuestion?.explanation ?? ''}
            userAnswer={selectedQuestion?.userAnswer?.toString() ?? ''}
          />
        ))}
    </div>
  );
};

export default TestResultContent;
