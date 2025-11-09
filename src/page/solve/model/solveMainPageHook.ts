'use client';
import { useLayoutEffect, useState } from 'react';
import {
  getQuestionCategoryInfoApi,
  GetQuestionCategoryInfoRes,
  QuestionCategoryInfoDetail,
} from '../api';
import { ProblemCategoryTitle } from '@/shared/problem/model/problemInfo.types';
import {
  callWithConditionalApiCalled,
  getWithCache,
} from '@/shared/api/model/apiCacheHook';
interface ProblemCategoryInfo
  extends Omit<
    QuestionCategoryInfoDetail,
    'categoryOriginName' | 'categoryViewName'
  > {
  categoryName: ProblemCategoryTitle;
}

const useSolveMainPage = () => {
  const [myTodaySolveData, setMyTodaySolveData] =
    useState<ProblemCategoryInfo[]>();

  const getQuestionCategoryInfo = async () => {
    try {
      const res = await callWithConditionalApiCalled({
        calledFuncKey: '/cache/question-category-info',
        calledFetcher: async () =>
          await getWithCache({
            key: '/cache/question-category-info',
            fetcher: async () => await getQuestionCategoryInfoApi(),
            expires: 0,
          }),
        fetchersKey: ['/cache/solve-problem-maq-request'],
      });
      if (res.ok) {
        const data = (res.payload as GetQuestionCategoryInfoRes).detail;
        const convertedData: ProblemCategoryInfo[] = [];
        data.map((category) => {
          const isTrue = convertedData.findIndex(
            (item) =>
              item.categoryName ===
              (category.categoryOriginName.split(
                '_'
              )[0] as ProblemCategoryTitle)
          );
          if (isTrue >= 0) {
            convertedData[isTrue].userSolvingCount += category.userSolvingCount;
            convertedData[isTrue].solvingLimit += category.solvingLimit;
          } else {
            convertedData.push({
              categoryName: category.categoryOriginName.split(
                '_'
              )[0] as ProblemCategoryTitle,
              userSolvingCount: category.userSolvingCount,
              solvingLimit: category.solvingLimit,
            });
          }
        });
        setMyTodaySolveData(convertedData);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useLayoutEffect(() => {
    getQuestionCategoryInfo();
  }, []);

  return { myTodaySolveData };
};
export default useSolveMainPage;
