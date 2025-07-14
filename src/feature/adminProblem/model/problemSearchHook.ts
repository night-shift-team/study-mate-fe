import { Problem } from '@/page/adminProblem/ui';
import { ProblemCategoryType } from '@/shared/problem/model/problemInfo.types';
import { Dispatch, SetStateAction } from 'react';
import { getProblemListBySearch } from './getProblemListBySearch';

const useProblemSearch = (
  problemType: ProblemCategoryType,
  setProblemList: Dispatch<SetStateAction<Problem[]>>,
  setCurrentPage: Dispatch<SetStateAction<number>>,
  setTotalProblemCount: Dispatch<SetStateAction<number>>,
  setProblemListStatus: Dispatch<SetStateAction<'latest' | 'search'>>,
  searchText: string,
  setSearchText: Dispatch<SetStateAction<string>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) => {
  const handleSearchTextEnter = async (
    e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    if (e.type === 'click' || ('key' in e && e.key === 'Enter')) {
      setIsLoading(true);
      const data = await getProblemListBySearch(problemType, searchText);
      if (data) {
        setTotalProblemCount(data.totalPages);
        setCurrentPage(1);
        setProblemList(data.content);
        setProblemListStatus('search');
      }
      setIsLoading(false);
      return;
    }
  };
  return { handleSearchTextEnter };
};
export default useProblemSearch;
