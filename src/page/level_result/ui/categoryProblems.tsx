'use client';
import { UserAnswerWithId } from '@/page/level_test/model/levelTestHook';
import { ProblemCategoryTitle } from '@/shared/problem/model/problemInfo.types';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import CheckCircle from '@public/assets/icons/leveltest/checkedCircle.svg';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const LevelTestCategoryProblems = ({
  correctIds,
  problemsIdWithTitle,
  userAnswers,
}: {
  correctIds: Set<string>;
  wrongIds: Set<string>;
  problemsIdWithTitle: { id: string; title: string; category: string }[];
  userAnswers: UserAnswerWithId[];
}) => {
  const [category, setCategory] = useState<ProblemCategoryTitle>(
    ProblemCategoryTitle.ALGORITHUM
  );

  const findProblemsByCategory = (category: ProblemCategoryTitle) => {
    const categoryProblems: typeof problemsIdWithTitle = [];
    problemsIdWithTitle.map((problem) => {
      if (problem.category.split('_')[0] === category) {
        categoryProblems.push(problem);
      }
    });
    return categoryProblems;
  };

  const [currentProblemList, setCurrentProblemList] = useState<
    typeof problemsIdWithTitle
  >(findProblemsByCategory(category));

  useEffect(() => {
    setCurrentProblemList(findProblemsByCategory(category));
  }, [problemsIdWithTitle, category]);
  return (
    <div className="w-full flex-1 flex-col gap-4">
      <div className="mt-10 flex w-full justify-between gap-4 px-2">
        <button
          onClick={() => setCategory(ProblemCategoryTitle.ALGORITHUM)}
          className={`text-button-1 ${category === ProblemCategoryTitle.ALGORITHUM ? 'text-point-pink' : ''}`}
        >
          Algorithm
        </button>
        <button
          onClick={() => setCategory(ProblemCategoryTitle.NETWORK)}
          className={`text-button-1 ${category === ProblemCategoryTitle.NETWORK ? 'text-point-cyan' : ''}`}
        >
          Network
        </button>
        <button
          onClick={() => setCategory(ProblemCategoryTitle.DB)}
          className={`text-button-1 ${category === ProblemCategoryTitle.DB ? 'text-point-yellow' : ''}`}
        >
          Database
        </button>
        <button
          onClick={() => setCategory(ProblemCategoryTitle.OS)}
          className={`flex flex-col items-center justify-center text-button-1 ${category === ProblemCategoryTitle.OS ? 'text-success' : ''}`}
        >
          <span>Operating</span>
          <span>system</span>
        </button>
      </div>

      <div className="flex w-full flex-col gap-3 py-7">
        {currentProblemList.map((problem) => {
          const isCorrect = correctIds.has(problem.id);
          const myAnswer = userAnswers.find((value) => value.id === problem.id);
          return (
            <Link
              key={problem.id}
              href={{
                pathname:
                  RouteTo.LevelTestResult +
                  `/${problem.id}-${myAnswer?.answer ?? 'null'}`,
              }}
            >
              <button
                key={problem.id}
                className={`flex h-48p w-full items-center justify-between rounded-12p px-[12px] py-[8px] ${isCorrect ? 'bg-success-50' : 'bg-error-50'} px-5`}
              >
                <span className="flex h-full w-full items-center overflow-y-auto font-pretandard text-quiz-option leading-none">
                  {problem.title}
                </span>
                {isCorrect ? (
                  <CheckCircle className="h-5 w-5 fill-success" />
                ) : null}
                {!isCorrect ? (
                  <CheckCircle className="h-5 w-5 fill-error" />
                ) : null}
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default LevelTestCategoryProblems;
