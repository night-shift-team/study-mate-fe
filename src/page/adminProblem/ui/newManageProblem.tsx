'use client';
import { useEffect, useState } from 'react';
import { LuArrowDownUp } from 'react-icons/lu';
import { IoSearch } from 'react-icons/io5';
import { csQuizQuestions, QuizQuestion } from '@/entities/test';
import ProblemPagination from './problemPagination';
import MarkdownComponent from '@/shared/lexical/ui/showMarkdownData';
import Link from 'next/link';
import { RouteTo } from '@/shared/routes/model/getRoutePath';

type CurrentFilter = '최신 순' | '오래된 순';

const NewManageProlem = () => {
  const [problemList, setProblemList] = useState(csQuizQuestions);
  const [currentFilter, setCurrentFilter] = useState<CurrentFilter>('최신 순');
  const [selectedProblem, setSelectedProblem] = useState<QuizQuestion | null>(
    null
  );
  const [markdown, _] = useState(`
### Heading 3  
#### Heading 4  
_italic_ and **bold**
> 아
- List item 1

[새 탭에서 열기](https://www.google.com/){:target="_blank"}
### Heading 3  
#### Heading 4  
_italic_ and **bold**
> 아
- List item 1

[새 탭에서 열기](https://www.google.com/){:target="_blank"}
### Heading 3  
#### Heading 4  
_italic_ and **bold**
> 아
- List item 1

[새 탭에서 열기](https://www.google.com/){:target="_blank"}
### Heading 3  
#### Heading 4  
_italic_ and **bold**
> 아
- List item 1

[새 탭에서 열기](https://www.google.com/){:target="_blank"}
### Heading 3  
#### Heading 4  
_italic_ and **bold**
> 아
- List item 1

[새 탭에서 열기](https://www.google.com/){:target="_blank"}
### Heading 3  
#### Heading 4  
_italic_ and **bold**
> 아
- List item 1

[새 탭에서 열기](https://www.google.com/){:target="_blank"}
`);

  const [currentPage, setCurrentPage] = useState(1);
  const LAST_PAGE = 10;
  return (
    <div className="relative flex h-full w-full flex-col overflow-y-auto p-4 scrollbar-hide md:flex-row md:gap-6 md:p-10 md:pb-20">
      <span className="absolute left-4 right-10 top-3 flex w-20 items-center justify-center whitespace-nowrap rounded-xl border bg-gray-200 p-2 text-sm md:left-auto md:top-4">
        문제 생성
      </span>
      <div className="mt-4 flex w-full flex-col md:w-[60%]">
        <span className="flex w-full justify-center text-[1.4rem]">
          문제 관리
        </span>
        <div className="mt-4 flex w-full justify-between">
          <ProblemFilterComponent />
          <ProblemSearchComponent />
        </div>
        <div className="mt-2 flex h-[15rem] w-full flex-shrink-0 flex-col overflow-auto scrollbar-hide md:h-[60vh]">
          {problemList.map((problem, index) => {
            return (
              <div
                key={index}
                className="box-shadow-sm mt-2 flex h-[2.5rem] w-full flex-shrink-0 items-center justify-between rounded-xl border bg-gray-300 p-1.5 px-3 shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-md md:mt-3 md:h-[2.8rem]"
                onClick={(e) => {
                  setSelectedProblem(problem);
                }}
              >
                <span className="overflow-hidden text-ellipsis whitespace-nowrap px-1 text-xs hover:cursor-pointer hover:underline md:text-base">
                  {problem.id}. {problem.question}
                </span>
                <div className="flex h-full w-20 flex-shrink-0 gap-1 text-xs">
                  <div
                    className="flex h-full w-1/2 items-center justify-center rounded-md border border-black hover:cursor-pointer hover:bg-gray-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('child');
                    }}
                  >
                    수정
                  </div>
                  <div
                    className="flex h-full w-1/2 items-center justify-center rounded-md border border-black hover:cursor-pointer hover:bg-gray-200"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    삭제
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex w-full justify-center">
          <ProblemPagination
            data={{ currentPage, LAST_PAGE, setCurrentPage }}
          />
        </div>
      </div>
      <div className="flex w-full flex-col md:w-[40%]">
        <span className="mt-8 flex w-full justify-center text-[1.4rem]">
          {' '}
          Preview
        </span>
        <div className="relative mt-4 flex max-h-[33rem] w-full flex-col rounded-2xl bg-gray-200 p-6 md:h-full">
          <span className="text-lg font-bold">Title</span>
          <span className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap text-xs">
            {selectedProblem?.question}
          </span>
          <span className="mt-4 text-lg font-bold">Contents</span>
          <div className="h-[70%] w-full border border-black bg-white">
            <MarkdownComponent markdown={markdown} />
          </div>
          <div className="absolute bottom-4 left-0 flex w-full justify-center">
            <Link
              href={{
                pathname: RouteTo.AdminManagementProblemDetail,
                query: {
                  id: problemList[0].id,
                  title: problemList[0].question,
                  descr: problemList[0].explanation,
                  markdown: markdown,
                },
              }}
              className="flex items-center justify-center rounded-xl px-3 pb-1 pt-2 text-sm hover:bg-gray-100 hover:underline"
            >
              자세히 보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewManageProlem;

const ProblemSearchComponent = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearchTextEnter = (
    e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    if (e.type === 'click' || ('key' in e && e.key === 'Enter')) {
      //TODO: 검색 api 호출
      console.log(searchText);
    }
  };

  return (
    <div className="flex h-8 w-36 items-center overflow-y-auto scrollbar-hide">
      <div
        className="flex aspect-1 h-full justify-center rounded-md border-2 hover:cursor-pointer active:cursor-grabbing"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          handleSearchTextEnter(e);
        }}
      >
        <IoSearch className="aspect-1 h-full" />
      </div>
      <input
        type="text"
        placeholder="문제 검색"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={handleSearchTextEnter}
        className="h-full w-full rounded-md border-2 px-1 text-xs"
      />
    </div>
  );
};

const ProblemFilterComponent = () => {
  const [currentFilter, setCurrentFilter] = useState<CurrentFilter>('최신 순');
  const [isFilterClicked, setIsFilterClicked] = useState(false);

  return (
    <div
      className={`flex h-8 w-28 rounded-lg ${isFilterClicked ? 'pointer-events-none' : 'hover:bg-gray-200'}`}
    >
      <div className="pointer-events-none flex h-full w-full">
        <div
          className="pointer-events-auto relative flex h-full w-full items-center gap-2 px-2"
          onClick={(e) => {
            e.stopPropagation();
            setIsFilterClicked(!isFilterClicked);
          }}
        >
          <LuArrowDownUp width={'calc(h-full)'} height={'100%'} />
          <span className="text-xs">{currentFilter}</span>
          {isFilterClicked ? (
            <div className="absolute -bottom-1 left-0 flex h-[4.5rem] w-full translate-y-full flex-col items-center justify-center rounded-xl border bg-white">
              <div
                className="flex h-1/2 w-full cursor-pointer items-center gap-2 border-b px-2 hover:bg-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentFilter('최신 순');
                  setIsFilterClicked(false);
                }}
              >
                <LuArrowDownUp width={'calc(h-full)'} height={'80%'} />
                <span className="text-xs">{'최근 순' as CurrentFilter}</span>
              </div>
              <div
                className="flex h-1/2 w-full cursor-pointer items-center gap-2 px-2 hover:bg-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentFilter('오래된 순');
                  setIsFilterClicked(false);
                }}
              >
                <LuArrowDownUp width={'calc(h-full)'} height={'80%'} />
                <span className="text-xs">{'오래된 순' as CurrentFilter}</span>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
