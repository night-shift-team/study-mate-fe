import {
  GetAdminMAQListRes,
  GetAdminSAQListRes,
  searchAdminMAQListApi,
  searchAdminSAQListApi,
} from '@/page/adminProblem/api';
import { PAGE_LIMIT } from '@/page/adminProblem/model/manageProblemHook';
import { ProblemCategoryType } from '@/shared/problem/model/problemInfo.types';

export const getProblemListBySearch = async (
  problemType: ProblemCategoryType,
  searchText: string,
  page?: number
) => {
  try {
    if (problemType === ProblemCategoryType.MAQ) {
      const res = await searchAdminMAQListApi(
        page ?? 0,
        PAGE_LIMIT,
        searchText
      );
      if (res.ok) {
        return res.payload as GetAdminMAQListRes;
      }
      throw res.payload;
    }
    if (problemType === ProblemCategoryType.SAQ) {
      const res = await searchAdminSAQListApi(
        page ?? 0,
        PAGE_LIMIT,
        searchText
      );
      if (res.ok) {
        return res.payload as GetAdminSAQListRes;
      }
      throw res.payload;
    }
    throw new Error('ProblemType Error');
  } catch (e) {
    console.log(e);
  }
};
