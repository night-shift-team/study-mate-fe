'use client';
import { useState } from 'react';
import { ListPagination } from './manageUser';

type MangeProlemCRUD = 'create' | 'update' | 'delete' | 'read';

const ManageProblem = () => {
  const params = new URLSearchParams();
  const problemNo = params.get('no');
  const problemCRUD = params.get('crud');
  console.log(problemNo, problemCRUD);

  const [findProblemText, setFindProblemText] = useState('');
  const [problemList, setProblemList] = useState<ProblemData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [manageProblemNo, setManageProblemNo] = useState(problemNo ?? '0');
  const [manageProblemCRUD, setManageProblemCRUD] = useState<
    'create' | 'update' | 'delete' | 'read'
  >((problemCRUD as MangeProlemCRUD) ?? 'read');
  const [currentProblem, setCurrentProblem] = useState<ProblemData | null>(
    null
  );

  const convertCRUDTextToKorean = (crud: MangeProlemCRUD) => {
    if (crud === 'create') return '생성';
    if (crud === 'update') return '수정';
    if (crud === 'delete') return '삭제';
    if (crud === 'read') return '조회';
    return '조회';
  };
  const findProblem = (findProlemNo: string) => {
    if (findProlemNo === '') {
      setCurrentProblem(null);
      return;
    }
    const targetProblems = mockProblemData
      .concat(mockProblemData2)
      .filter((problem) => {
        if (problem.no.toString().includes(findProlemNo)) {
          setCurrentProblem(problem);
          return problem;
        }
        console.log('targetProblems', targetProblems);
      });
  };

  return (
    <div className="flex h-full w-full px-[2.5%] py-[1%]">
      <div className="flex h-full w-full p-[1%] pt-[1%]">
        <div className="flex h-full w-[50%] flex-col border-r border-dashed">
          <div className="flex h-fit w-fit text-[3vh]">문제 관리</div>
          <div className="flex h-full w-full flex-col p-[5%] pr-[10%]">
            <div className="flex h-[80%] w-full items-center rounded-[2rem] bg-gray-100">
              <table className="flex h-full w-full flex-shrink-0 flex-col items-center pt-[3%] text-[1.5vh]">
                <thead className="flex h-[5%] w-full flex-shrink-0 justify-center">
                  <tr className="flex h-full w-[90%] flex-shrink-0 justify-between border-b border-dashed px-[3%]">
                    <th className="flex w-[10%] items-center justify-center">
                      No
                    </th>
                    <th className="flex w-[20%] items-center justify-center">
                      카테고리
                    </th>
                    <th className="flex w-[30%] items-center justify-center">
                      생성일자
                    </th>
                    <th className="flex w-[10%] items-center justify-center">
                      Status
                    </th>
                    <th className="flex w-[10%] items-center justify-center">
                      Solved
                    </th>
                  </tr>
                </thead>
                <tbody className="flex h-[95%] min-h-[4rem] w-full flex-shrink-0 flex-col items-center overflow-y-auto scrollbar-hide">
                  {mockProblemData.map((data, key) => {
                    return (
                      <tr
                        key={key}
                        className="flex h-[10%] min-h-[2rem] w-[90%] flex-shrink-0 items-center justify-between border-b border-dotted px-[3%] py-[0.5%] hover:cursor-pointer hover:underline"
                        onClick={() => {
                          setManageProblemNo(data.no.toString());
                          setManageProblemCRUD('read');
                        }}
                      >
                        <td className="flex w-[10%] items-center justify-center">
                          {data.no}
                        </td>
                        <td className="flex w-[20%] items-center justify-center">
                          {data.category}
                        </td>
                        <td className="flex w-[30%] items-center justify-center">
                          {data.createdDt}
                        </td>
                        <td className="flex w-[10%] items-center justify-center">
                          {data.status}
                        </td>
                        <td className="flex w-[10%] items-center justify-center">
                          {data.solved}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex h-fit w-full justify-center pt-[4%]">
              <ListPagination
                data1={mockProblemData}
                data2={mockProblemData2}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setDataList={setProblemList}
              />
            </div>
          </div>
        </div>
        <div className="flex h-full w-[50%] flex-col border-l border-dashed">
          <div className="flex h-fit w-full justify-between pr-[5.5%] pt-[1%]">
            <div className="flex h-fit w-fit pl-[2%] text-[3vh]">
              문제 {convertCRUDTextToKorean(manageProblemCRUD)}
            </div>
            <input
              placeholder="🔍 검색"
              className="flex h-fit w-[20%] min-w-[6rem] max-w-[5rem] rounded-2xl border border-black px-3 py-1 text-sm"
              value={findProblemText}
              onChange={(e) => setFindProblemText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  findProblem(findProblemText);
                  console.log('Enter');
                }
              }}
            ></input>
          </div>
          <div className="relative flex h-[80%] w-full items-center justify-center">
            <div className="z-[1] flex h-[90%] w-[90%] rounded-sm border border-black bg-white">
              <div className="flex h-full w-[90%] flex-col items-center justify-center">
                <div className="flex h-fit w-fit pt-[5%]">
                  문제 {parseInt(manageProblemNo) ? manageProblemNo : ''} 정보
                </div>
                <div className="flex h-full w-full flex-col p-[2%] text-[2vh]">
                  <div className="flex h-fit w-full">
                    <span className="whitespace-pre-wrap">번호 : </span>
                    <span>1</span>
                  </div>
                  <div className="flex h-fit w-full">
                    <span className="whitespace-pre-wrap">카테고리 : </span>
                    <span>운영체제</span>
                  </div>
                  <div className="flex h-fit w-full">
                    <span className="whitespace-pre-wrap">레벨 : </span>
                    <span>5</span>
                  </div>
                  <div className="flex h-fit w-full">
                    <span className="whitespace-pre-wrap">생성일자 : </span>
                    <span>240531T00:14:22</span>
                  </div>
                  <div className="flex h-fit w-full">
                    <span className="whitespace-pre-wrap">활성화 : </span>
                    <span>240531T00:14:22</span>
                  </div>
                  <div className="flex h-fit min-h-[25%] w-full pt-[5%]">
                    <span className="whitespace-pre-wrap">내용 : </span>
                    <span></span>
                  </div>
                  <div className="flex h-fit w-full flex-col pt-[5%]">
                    <span className="whitespace-pre-wrap">보기 : </span>
                    <span>1. {}</span>
                    <span>2. {}</span>
                    <span>3. {}</span>
                    <span>4. {}</span>
                  </div>
                </div>
              </div>
              <div className="relative mt-[10%] flex h-[50%] w-[10%]">
                <div className="absolute flex aspect-square w-[90%] rounded-full border border-black"></div>
              </div>
            </div>
            <div className="absolute left-[6%] top-[6%] flex h-[90%] w-[90%] rounded-sm bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProblem;

type ProblemCategory =
  | '운영체제'
  | '네트워크'
  | '자료구조'
  | '알고리즘'
  | '데이터베이스'
  | 'React'
  | 'Next.js'
  | 'TypeScript'
  | 'JavaScript'
  | 'HTML/CSS'
  | '기타';

export interface ProblemData {
  no: number;
  category: ProblemCategory;
  createdDt: string;
  status: '🟢' | '🔴';
  solved: number;
  content?: string;
  selections?: string[];
}

const mockProblemData: ProblemData[] = [
  {
    no: 1,
    category: '운영체제',
    createdDt: '20240431T00:12:31',
    status: '🟢',
    solved: 50,
    content: 'LRU 알고리즘에 대한 설명이 옳은 것을 고르시오.',
    selections: [
      '캐시에서 가장 오랫동안 사용되지 않은 페이지를 교체하는 알고리즘입니다.',
      '캐시에서 가장 최근에 사용된 페이지를 교체하는 알고리즘입니다.',
      '캐시에서 가장 오랫동안 사용된 페이지를 교체하는 알고리즘입니다.',
      '캐시에서 가장 최근에 사용된 페이지를 교체하는 알고리즘입니다.',
    ],
  },
  {
    no: 2,
    category: '네트워크',
    createdDt: '20240431T00:12:31',
    status: '🟢',
    solved: 15,
  },
  {
    no: 3,
    category: '자료구조',
    createdDt: '20240431T00:12:31',
    status: '🟢',
    solved: 15,
  },
  {
    no: 4,
    category: '알고리즘',
    createdDt: '20240431T00:12:31',
    status: '🔴',
    solved: 15,
  },
  {
    no: 5,
    category: '데이터베이스',
    createdDt: '20240431T00:12:31',
    status: '🟢',
    solved: 15,
  },
  {
    no: 6,
    category: 'React',
    createdDt: '20240431T00:12:31',
    status: '🟢',
    solved: 15,
  },
  {
    no: 7,
    category: 'Next.js',
    createdDt: '20240431T00:12:31',
    status: '🟢',
    solved: 15,
  },
  {
    no: 8,
    category: 'TypeScript',
    createdDt: '20240431T00:12:31',
    status: '🟢',
    solved: 15,
  },
  {
    no: 9,
    category: 'JavaScript',
    createdDt: '20240431T00:12:31',
    status: '🟢',
    solved: 15,
  },
  {
    no: 10,
    category: 'HTML/CSS',
    createdDt: '20240431T00:12:31',
    status: '🔴',
    solved: 15,
  },
];

const mockProblemData2: ProblemData[] = [
  {
    no: 11,
    category: '운영체제',
    createdDt: '20240431T00:12:31',
    status: '🟢',
    solved: 50,
    content: 'LRU 알고리즘에 대한 설명이 옳은 것을 고르시오.',
    selections: [
      '캐시에서 가장 오랫동안 사용되지 않은 페이지를 교체하는 알고리즘입니다.',
      '캐시에서 가장 최근에 사용된 페이지를 교체하는 알고리즘입니다.',
      '캐시에서 가장 오랫동안 사용된 페이지를 교체하는 알고리즘입니다.',
      '캐시에서 가장 최근에 사용된 페이지를 교체하는 알고리즘입니다.',
    ],
  },
  {
    no: 12,
    category: '네트워크',
    createdDt: '20240431T00:12:31',
    status: '🟢',
    solved: 15,
  },
  {
    no: 13,
    category: '자료구조',
    createdDt: '20240431T00:12:31',
    status: '🟢',
    solved: 15,
  },
  {
    no: 14,
    category: '알고리즘',
    createdDt: '20240431T00:12:31',
    status: '🔴',
    solved: 15,
  },
  {
    no: 15,
    category: '데이터베이스',
    createdDt: '20240431T00:12:31',
    status: '🟢',
    solved: 15,
  },
  {
    no: 16,
    category: 'React',
    createdDt: '20240431T00:12:31',
    status: '🟢',
    solved: 15,
  },
  {
    no: 17,
    category: 'Next.js',
    createdDt: '20240431T00:12:31',
    status: '🟢',
    solved: 15,
  },
  {
    no: 18,
    category: 'TypeScript',
    createdDt: '20240431T00:12:31',
    status: '🟢',
    solved: 15,
  },
  {
    no: 19,
    category: 'JavaScript',
    createdDt: '20240431T00:12:31',
    status: '🟢',
    solved: 15,
  },
  {
    no: 20,
    category: 'HTML/CSS',
    createdDt: '20240431T00:12:31',
    status: '🔴',
    solved: 15,
  },
  {
    no: 21,
    category: '기타',
    createdDt: '20240431T00:12:31',
    status: '🟢',
    solved: 15,
  },
];
