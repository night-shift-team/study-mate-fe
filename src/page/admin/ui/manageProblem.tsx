'use client';

import { RefObject, useEffect, useRef, useState } from 'react';

import { ListPagination } from './manageUser';
import useHoverEvent from '@/shared/model/useHoverEvent';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GoArrowRight } from 'react-icons/go';
import { DialogPopup } from '@/shared/ui/dialogPopup';

type MangeProlemCRUD = 'create' | 'update' | 'delete' | 'read';
interface InputSelection {
  select1: string;
  select2: string;
  select3: string;
  select4: string;
}
const selectionDefaultValue = {
  select1: '',
  select2: '',
  select3: '',
  select4: '',
};

const ManageProblem = () => {
  const params = new URLSearchParams();
  const problemNo = params.get('no');
  const problemCRUD = params.get('crud');
  console.log(problemNo, problemCRUD);

  const [findProblemText, setFindProblemText] = useState('');
  const [problemList, setProblemList] = useState<ProblemData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [manageProblemNo, setManageProblemNo] = useState(0);
  const [manageProblemCRUD, setManageProblemCRUD] =
    useState<MangeProlemCRUD>('read');

  const [currentProblem, setCurrentProblem] = useState<ProblemData | null>(
    null
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryProblemNo = params.get('no');
    const queryProblemCRUD = params.get('crud');
    setManageProblemNo(queryProblemNo ? parseInt(queryProblemNo) : 0);
    setManageProblemCRUD((queryProblemCRUD as MangeProlemCRUD) ?? 'read');
  }, []);

  const convertCRUDTextToKorean = (crud: MangeProlemCRUD) => {
    if (crud === 'create') return '생성';
    if (crud === 'update') return '수정';
    if (crud === 'delete') return '삭제';
    if (crud === 'read') return '조회';
    return '조회';
  };
  const findProblem = (findProlemNo: string) => {
    if (findProlemNo === '') {
      setManageProblemNo(0);
      setManageProblemCRUD('read');
      setCurrentProblem(null);
      return;
    }
    const findNumber = parseInt(findProlemNo);
    const targetProblems = mockProblemData
      .concat(mockProblemData2)
      .filter((problem) => {
        if (problem.no === findNumber) {
          setCurrentProblem(problem);
          setManageProblemNo(findNumber);
          setManageProblemCRUD('read');
          return problem;
        }
      });
    console.log('targetProblems', targetProblems);
  };

  useEffect(() => {
    setCurrentProblem(
      mockProblemData
        .concat(mockProblemData2)
        .find((data) => data.no === (manageProblemNo ?? 0)) ?? null
    );
  }, [manageProblemNo]);

  const [isProblemCRUDTitleHover, setIsProblemCRUDTitleHover] = useState(false);
  const setProblemCRUDTitleHover = () => {
    setIsProblemCRUDTitleHover(true);
    console.log('hover');
  };

  const setDisableProblemCRUDTitleHover = () => {
    setIsProblemCRUDTitleHover(false);
    console.log('disable hover');
  };

  const problemCRUDTitleParentRef = useRef<HTMLDivElement>(null);
  const problemCRUDTitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    useHoverEvent(
      problemCRUDTitleRef,
      problemCRUDTitleParentRef,
      setProblemCRUDTitleHover,
      setDisableProblemCRUDTitleHover
    );
  }, [problemCRUDTitleParentRef, problemCRUDTitleRef]);

  const [inputCategory, setInputCategory] = useState<ProblemCategory>();
  const [inputLevel, setInputLevel] = useState<string>('');
  const [inputCreatedDt, setInputCreatedDt] = useState<string>('');
  const [inputStatus, setInputStatus] = useState<string>('');
  const [inputContent, setInputContent] = useState<string>('');
  const [inputSelections, setInputSelections] = useState<InputSelection>(
    selectionDefaultValue
  );

  const [isUpdateTextComplete, setIsUpdateTextComplete] = useState(false);

  console.log(
    inputCategory,
    inputLevel,
    inputCreatedDt,
    inputStatus,
    inputContent,
    inputSelections
  );
  const getProblemInfo = (problemNo: number) => {
    setManageProblemCRUD('read');
    setIsUpdateTextComplete(false);
  };
  const createProblemInfo = (problemNo: number) => {
    setManageProblemCRUD('create');
    setCurrentProblem(null);
    setInputCategory('운영체제');
    setInputLevel('');
    setInputContent('');
    setInputSelections(selectionDefaultValue);
    setIsUpdateTextComplete(false);
  };
  const updateProblemInfo = (problemNo: number) => {
    if (!currentProblem) return;
    setManageProblemCRUD('update');
    setInputCategory(currentProblem.category ?? '운영체제');
    setInputLevel(currentProblem.level ?? '');
    setInputContent(currentProblem.content ?? '');
    const tempInputSelction: InputSelection = {
      select1: '',
      select2: '',
      select3: '',
      select4: '',
    };
    currentProblem.selections.forEach((selection, key) => {
      const keyString = ('select' +
        `${(key + 1).toString()}`) as keyof InputSelection;
      tempInputSelction[keyString] = selection;
    });
    setInputSelections(tempInputSelction);
    setIsUpdateTextComplete(false);
  };
  const deleteProblemInfo = (problemNo: number) => {
    setManageProblemCRUD('delete');
    setIsUpdateTextComplete(false);
  };

  const [popupOpen, setPopupOpen] = useState(false);
  const requestToServerApi = async () => {
    setPopupOpen(false);
    console.log(`
    problemNo : ${manageProblemNo}
    problemCRUD: ${manageProblemCRUD}
    category: ${inputCategory} 
    level: ${inputLevel}
    content: ${inputContent}
    selections: ${inputSelections}
    `);
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
                        className="flex h-[10%] min-h-[2rem] w-[90%] flex-shrink-0 items-center justify-between border-b border-dotted px-[3%] py-[0.5%] hover:cursor-pointer hover:rounded-md hover:bg-gray-200"
                        onClick={() => {
                          setManageProblemNo(data.no);
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
            <div className="flex h-fit w-[80%] flex-col gap-x-[5%] whitespace-pre-wrap pl-[2%] text-[3vh]">
              <span className="flex whitespace-pre-wrap">
                문제 {convertCRUDTextToKorean(manageProblemCRUD)}
              </span>
              <div
                ref={problemCRUDTitleParentRef}
                className="relative flex h-fit w-[80%]"
              >
                <div
                  ref={problemCRUDTitleRef}
                  className="z-[5] flex w-fit items-center rounded-xl border-2 border-gray-200 bg-white p-[0.5%] px-[1.5%] text-[2.5vh] hover:cursor-pointer hover:border-black hover:bg-gray-50"
                  onClick={() => getProblemInfo(manageProblemNo)}
                >
                  조회
                </div>
                <>
                  <button
                    className={`absolute z-[3] ml-[0.5%] flex w-fit items-center rounded-xl border-2 border-gray-200 bg-white p-[0.5%] px-[1.5%] text-[2.5vh] hover:cursor-pointer hover:border-[#28A374] hover:bg-green-50 ${isProblemCRUDTitleHover ? 'translate-x-[100%]' : ''} transition-all duration-200 ease-in-out`}
                    onClick={() => createProblemInfo(manageProblemNo)}
                  >
                    생성
                  </button>
                  <button
                    className={`absolute flex border-2 border-gray-200 ${currentProblem ? 'hover:cursor-pointer hover:border-[#4E96F0] hover:bg-blue-50' : ''} z-[2] ml-[1%] w-fit items-center rounded-xl bg-white p-[0.5%] px-[1.5%] text-[2.5vh] ${isProblemCRUDTitleHover ? 'translate-x-[200%]' : ''} transition-all duration-200 ease-in-out`}
                    disabled={!currentProblem}
                    onClick={() => updateProblemInfo(manageProblemNo)}
                  >
                    수정
                  </button>
                  <button
                    className={`absolute flex border-gray-200 ${currentProblem ? 'hover:cursor-pointer hover:border-[#E65A5A] hover:bg-red-50' : ''} z-[1] ml-[1.5%] w-fit items-center rounded-xl border-2 bg-white p-[0.5%] px-[1.5%] text-[2.5vh] ${isProblemCRUDTitleHover ? 'translate-x-[300%]' : ''} transition-all duration-200 ease-in-out`}
                    disabled={!currentProblem}
                    onClick={() => deleteProblemInfo(manageProblemNo)}
                  >
                    삭제
                  </button>
                </>
              </div>
            </div>
            <input
              placeholder="🔍 검색"
              className="flex h-fit w-[20%] min-w-[6rem] max-w-[5rem] rounded-2xl border border-black px-3 py-1 text-sm"
              value={findProblemText}
              onChange={(e) => setFindProblemText(e.target.value)}
              onKeyDown={(e) => {
                console.log(findProblemText);
                if (e.key === 'Enter') {
                  findProblem(findProblemText);
                  console.log('Enter');
                }
              }}
            ></input>
          </div>
          <form className="relative flex h-[80%] w-full flex-col items-center justify-center">
            <div className="z-[1] mt-[1%] flex h-[89%] w-[90%] justify-center overflow-scroll rounded-sm border border-black bg-white shadow-2xl shadow-border scrollbar-hide">
              <div className="flex h-full w-[90%] flex-col items-center justify-center">
                <div className="flex h-fit w-fit pt-[5%]">
                  문제 {currentProblem?.no ?? ''} 정보
                </div>
                <div className="flex h-full w-full flex-col p-[2%] text-[2vh]">
                  <div className="flex h-fit w-full">
                    <span className="whitespace-pre-wrap">번호 : </span>
                    <span>{currentProblem?.no ?? ''}</span>
                  </div>
                  <div className="flex h-fit w-full py-[0.5%]">
                    <span className="whitespace-pre-wrap">카테고리 : </span>
                    {manageProblemCRUD === 'read' ||
                    manageProblemCRUD === 'delete' ? (
                      <span>{currentProblem?.category ?? ''}</span>
                    ) : (
                      <></>
                    )}
                    {manageProblemCRUD === 'create' ||
                    (manageProblemCRUD === 'update' &&
                      !isUpdateTextComplete) ? (
                      <Select
                        onValueChange={(value) =>
                          setInputCategory(value as ProblemCategory)
                        }
                      >
                        <SelectTrigger className="not-sr-only flex h-fit w-fit items-center justify-center border px-[1%] py-0 text-[2vh]">
                          <SelectValue
                            placeholder={
                              currentProblem?.category ??
                              ('운영체제' as ProblemCategory)
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {ProblemCategories.map((value, key) => (
                            <SelectItem key={key} value={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <></>
                    )}
                    {manageProblemCRUD === 'update' && isUpdateTextComplete ? (
                      <span>{inputCategory}</span>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="flex h-fit w-full">
                    <span className="whitespace-pre-wrap">레벨 : </span>
                    {manageProblemCRUD === 'read' ||
                    manageProblemCRUD === 'delete' ? (
                      <span>{currentProblem?.level ?? ''}</span>
                    ) : (
                      <></>
                    )}
                    {manageProblemCRUD === 'create' ||
                    (manageProblemCRUD === 'update' &&
                      !isUpdateTextComplete) ? (
                      <input
                        required
                        value={inputLevel}
                        className="ml-[1%] flex w-full border px-[1%]"
                        onChange={(e) => setInputLevel(e.target.value)}
                      />
                    ) : (
                      <></>
                    )}
                    {manageProblemCRUD === 'update' && isUpdateTextComplete ? (
                      <span>{inputLevel}</span>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="flex h-fit w-full">
                    <span className="whitespace-pre-wrap">생성일자 : </span>
                    <span>{currentProblem?.createdDt ?? ''}</span>
                  </div>
                  <div className="flex h-fit w-full">
                    <span className="whitespace-pre-wrap">활성화 : </span>
                    <span>{currentProblem?.status ?? ''}</span>
                  </div>
                  <div className="flex h-fit min-h-[25%] w-full flex-col pt-[5%]">
                    <span className="whitespace-pre-wrap">문제 : </span>
                    {manageProblemCRUD === 'read' ||
                    manageProblemCRUD === 'delete' ? (
                      <span className="p-[1%]">
                        {' '}
                        {currentProblem?.content ?? ''}
                      </span>
                    ) : (
                      <></>
                    )}
                    {manageProblemCRUD === 'create' ||
                    (manageProblemCRUD === 'update' &&
                      !isUpdateTextComplete) ? (
                      <textarea
                        required
                        value={inputContent}
                        className="ml-[1%] flex h-full w-full break-words border px-[1%]"
                        onChange={(e) => setInputContent(e.target.value)}
                      />
                    ) : (
                      <></>
                    )}
                    {manageProblemCRUD === 'update' && isUpdateTextComplete ? (
                      <span className="p-[1%]"> {inputContent}</span>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="flex h-fit w-full flex-col pt-[5%]">
                    <span className="whitespace-pre-wrap">보기 : </span>

                    {manageProblemCRUD === 'read' ||
                    manageProblemCRUD === 'delete' ? (
                      <>
                        <span>1. {currentProblem?.selections[0] ?? ''}</span>
                        <span>2. {currentProblem?.selections[1] ?? ''}</span>
                        <span>3. {currentProblem?.selections[2] ?? ''}</span>
                        <span>4. {currentProblem?.selections[3] ?? ''}</span>
                      </>
                    ) : (
                      <></>
                    )}
                    {manageProblemCRUD === 'create' ||
                    (manageProblemCRUD === 'update' &&
                      !isUpdateTextComplete) ? (
                      <div className="flex flex-col">
                        <div className="flex">
                          1.{' '}
                          <input
                            required
                            value={inputSelections.select1}
                            className="ml-[1%] flex w-full break-words border px-[1%]"
                            onChange={(e) =>
                              setInputSelections({
                                ...inputSelections,
                                select1: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="flex">
                          2.{' '}
                          <input
                            required
                            value={inputSelections.select2}
                            className="ml-[1%] flex w-full break-words border px-[1%]"
                            onChange={(e) =>
                              setInputSelections({
                                ...inputSelections,
                                select2: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="flex">
                          3.{' '}
                          <input
                            required
                            value={inputSelections.select3}
                            className="ml-[1%] flex w-full break-words border px-[1%]"
                            onChange={(e) =>
                              setInputSelections({
                                ...inputSelections,
                                select3: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="flex">
                          4.{' '}
                          <input
                            required
                            value={inputSelections.select4}
                            className="ml-[1%] flex w-full break-words border px-[1%]"
                            onChange={(e) =>
                              setInputSelections({
                                ...inputSelections,
                                select4: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    {manageProblemCRUD === 'update' && isUpdateTextComplete ? (
                      <>
                        <span>1. {inputSelections.select1}</span>
                        <span>2. {inputSelections.select2}</span>
                        <span>3. {inputSelections.select3}</span>
                        <span>4. {inputSelections.select4}</span>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {manageProblemCRUD !== 'read' && (
              <button
                className="z-[5] mt-[1%] flex aspect-square h-[9%] flex-col items-center justify-center whitespace-pre-wrap rounded-full border border-black bg-white"
                onClick={(e) => {
                  console.log('onClick', e.currentTarget.form?.checkValidity());
                  if (!e.currentTarget.form?.checkValidity()) return;
                  if (!isUpdateTextComplete) {
                    setIsUpdateTextComplete(true);
                  } else {
                    setPopupOpen(true);
                  }
                  e.preventDefault();
                }}
              >
                {isUpdateTextComplete ? (
                  <>
                    {convertCRUDTextToKorean(manageProblemCRUD)}
                    <GoArrowRight />
                  </>
                ) : (
                  <>
                    <span>확인</span>
                  </>
                )}
              </button>
            )}
          </form>
        </div>
      </div>
      {popupOpen && (
        <DialogPopup
          title={`${manageProblemCRUD === 'create' ? '문제 생성' : `문제 ${manageProblemNo}번 ${convertCRUDTextToKorean(manageProblemCRUD)}`}`}
          description={`${manageProblemCRUD === 'create' ? '해당 내용을 문제로 생성하시겠습니까?' : `문제 ${manageProblemNo}번을 ${convertCRUDTextToKorean(manageProblemCRUD)}하시겠습니까?`}`}
          execFunc={async () => await requestToServerApi()}
          open={popupOpen}
          setDialogOpen={setPopupOpen}
        />
      )}
    </div>
  );
};

export default ManageProblem;

const ProblemCategories: ProblemCategory[] = [
  '운영체제',
  '네트워크',
  '자료구조',
  '알고리즘',
  '데이터베이스',
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'HTML/CSS',
  '기타',
];

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
  level: string;
  createdDt: string;
  status: '🟢' | '🔴';
  solved: number;
  content: string;
  selections: string[];
}

const mockProblemData: ProblemData[] = [
  {
    no: 1,
    category: '운영체제',
    level: '1',
    createdDt: '20240431T00:12:31',
    status: '🟢',
    solved: 50,
    content: 'LRU 알고리즘에 대한 설명이 옳은 것을 고르시오.',
    selections: [
      '캐시에서 가장 오랫동안 사용되지 않은 페이지를 교체하는 알고리즘입니다.',
      '캐시에서 가장 최근에 사용된 페이지를 교체하는 알고리즘입니다.',
      '캐시에서 가장 오랫동안 사용된 페이지를 교체하는 알고리즘입니다.',
      '캐시에서 가장 자주 사용되는 페이지를 교체하는 알고리즘입니다.',
    ],
  },
  {
    no: 2,
    category: '네트워크',
    level: '1',
    createdDt: '20240430T14:25:00',
    status: '🔴',
    solved: 30,
    content: 'TCP/IP 프로토콜 스택의 계층 중 전송 계층의 역할은?',
    selections: [
      '물리적인 네트워크 연결을 담당합니다.',
      '데이터의 안전한 전송을 보장합니다.',
      '라우팅과 주소 지정을 담당합니다.',
      '애플리케이션 간의 통신을 담당합니다.',
    ],
  },
  {
    no: 3,
    category: '데이터베이스',
    level: '1',
    createdDt: '20240429T09:45:12',
    status: '🔴',
    solved: 10,
    content: 'SQL에서 ACID 특성 중 "Isolation"의 의미는?',
    selections: [
      '트랜잭션의 결과가 영구적으로 반영되어야 한다.',
      '트랜잭션이 모두 실행되거나 전혀 실행되지 않아야 한다.',
      '동시에 실행되는 트랜잭션들이 서로 영향을 미치지 않아야 한다.',
      '트랜잭션이 데이터베이스의 일관성을 유지해야 한다.',
    ],
  },
  {
    no: 4,
    category: 'JavaScript',
    level: '1',
    createdDt: '20240428T18:30:45',
    status: '🟢',
    solved: 70,
    content: 'JavaScript에서 "호이스팅(Hoisting)"이란?',
    selections: [
      '변수와 함수 선언이 스코프의 최상단으로 끌어올려지는 현상',
      '변수의 값이 자동으로 증가하는 현상',
      '함수가 자동으로 실행되는 현상',
      '객체의 속성이 자동으로 정렬되는 현상',
    ],
  },
  {
    no: 5,
    category: '알고리즘',
    level: '1',
    createdDt: '20240427T11:20:33',
    status: '🔴',
    solved: 40,
    content: '시간 복잡도가 O(n log n)인 정렬 알고리즘은?',
    selections: ['버블 정렬', '삽입 정렬', '퀵 정렬', '선택 정렬'],
  },
  {
    no: 6,
    category: '데이터베이스',
    level: '1',
    createdDt: '20240426T16:55:22',
    status: '🔴',
    solved: 15,
    content: 'SQL 인젝션 공격을 방지하기 위한 가장 효과적인 방법은?',
    selections: [
      '사용자 입력을 그대로 SQL 쿼리에 포함시킨다.',
      '모든 사용자 입력을 암호화한다.',
      '준비된 구문(Prepared Statement)을 사용한다.',
      '데이터베이스 연결을 자주 끊고 다시 연결한다.',
    ],
  },
  {
    no: 7,
    category: '기타',
    level: '1',
    createdDt: '20240425T08:40:10',
    status: '🟢',
    solved: 55,
    content: 'IaaS(Infrastructure as a Service)의 특징으로 옳은 것은?',
    selections: [
      '사용자에게 애플리케이션 개발 플랫폼을 제공한다.',
      '사용자에게 가상화된 컴퓨팅 리소스를 제공한다.',
      '사용자에게 완전한 소프트웨어 솔루션을 제공한다.',
      '사용자가 직접 하드웨어를 구매하고 관리해야 한다.',
    ],
  },
  {
    no: 8,
    category: '기타',
    level: '1',
    createdDt: '20240424T13:15:50',
    status: '🔴',
    solved: 35,
    content: '애자일(Agile) 방법론의 특징이 아닌 것은?',
    selections: [
      '반복적이고 점진적인 개발',
      '고객과의 지속적인 협력',
      '변화에 대한 유연한 대응',
      '상세한 계획 수립 후 순차적 실행',
    ],
  },
  {
    no: 9,
    category: '기타',
    level: '2',
    createdDt: '20240423T19:05:30',
    status: '🔴',
    solved: 20,
    content: '딥러닝에서 "과적합(Overfitting)" 문제를 해결하기 위한 방법은?',
    selections: [
      '더 많은 데이터를 사용한다.',
      '모델의 복잡도를 높인다.',
      '학습 횟수를 늘린다.',
      '정규화(Regularization)를 적용한다.',
    ],
  },
  {
    no: 10,
    category: 'Next.js',
    level: '1',
    createdDt: '20240422T10:30:15',
    status: '🟢',
    solved: 60,
    content: 'Next.js에서 정적 사이트 생성(SSG)을 위해 사용하는 함수는?',
    selections: [
      'getServerSideProps',
      'getStaticProps',
      'getInitialProps',
      'getStaticPaths',
    ],
  },
];

const mockProblemData2: ProblemData[] = [
  {
    no: 11,
    category: '자료구조',
    level: '1',
    createdDt: '20240421T15:40:25',
    status: '🔴',
    solved: 45,
    content: '이진 탐색 트리(Binary Search Tree)의 특징으로 옳은 것은?',
    selections: [
      '모든 노드는 최대 2개의 자식 노드를 가질 수 있다.',
      '왼쪽 서브트리의 모든 노드는 루트보다 크다.',
      '오른쪽 서브트리의 모든 노드는 루트보다 작다.',
      '중위 순회 시 노드들이 무작위 순서로 방문된다.',
    ],
  },
  {
    no: 12,
    category: 'React',
    level: '3',
    createdDt: '20240420T07:55:40',
    status: '🟢',
    solved: 65,
    content:
      'React에서 컴포넌트의 생명주기 메서드 중 마운트 단계에서 호출되는 메서드는?',
    selections: [
      'componentDidMount',
      'componentWillUnmount',
      'componentDidUpdate',
      'shouldComponentUpdate',
    ],
  },
  {
    no: 13,
    category: '운영체제',
    level: '1',
    createdDt: '20240419T12:10:55',
    status: '🔴',
    solved: 25,
    content: '페이지 교체 알고리즘 중 FIFO(First-In-First-Out)의 특징은?',
    selections: [
      '가장 오래된 페이지를 교체한다.',
      '가장 최근에 사용된 페이지를 교체한다.',
      '사용 빈도가 가장 낮은 페이지를 교체한다.',
      '무작위로 페이지를 선택하여 교체한다.',
    ],
  },
  {
    no: 14,
    category: 'TypeScript',
    level: '2',
    createdDt: '20240418T17:25:30',
    status: '🟢',
    solved: 75,
    content:
      'TypeScript에서 인터페이스(interface)와 타입 별칭(type alias)의 차이점은?',
    selections: [
      '인터페이스는 객체에만 사용할 수 있고, 타입 별칭은 모든 타입에 사용할 수 있다.',
      '인터페이스는 선언 병합이 가능하고, 타입 별칭은 불가능하다.',
      '인터페이스는 extends 키워드로 확장할 수 없고, 타입 별칭은 가능하다.',
      '인터페이스는 컴파일 시간에 검사되고, 타입 별칭은 런타임에 검사된다.',
    ],
  },
  {
    no: 15,
    category: 'HTML/CSS',
    level: '1',
    createdDt: '20240417T09:50:20',
    status: '🔴',
    solved: 38,
    content: 'CSS Flexbox에서 flex-direction 속성의 기본값은?',
    selections: ['row', 'column', 'row-reverse', 'column-reverse'],
  },
  {
    no: 16,
    category: '네트워크',
    level: '1',
    createdDt: '20240416T14:35:45',
    status: '🔴',
    solved: 18,
    content: 'HTTPS 프로토콜에서 사용되는 주요 보안 메커니즘은?',
    selections: ['Basic 인증', 'SSL/TLS 암호화', 'IP 주소 필터링', 'CSRF 토큰'],
  },
  {
    no: 17,
    category: '데이터베이스',
    level: '1',
    createdDt: '20240415T20:00:10',
    status: '🟢',
    solved: 58,
    content: '데이터베이스 정규화의 주요 목적은?',
    selections: [
      '데이터의 중복을 최소화하고 일관성을 유지한다.',
      '데이터의 크기를 줄여 저장 공간을 절약한다.',
      '데이터 처리 속도를 향상시킨다.',
      '데이터의 보안성을 높인다.',
    ],
  },
  {
    no: 18,
    category: '운영체제',
    level: '1',
    createdDt: '20240414T11:45:30',
    status: '🔴',
    solved: 42,
    content: '프로세스와 스레드의 주요 차이점은?',
    selections: [
      '프로세스는 독립적인 메모리 공간을 가지고, 스레드는 메모리를 공유한다.',
      '프로세스는 단일 실행 흐름만 가능하고, 스레드는 다중 실행 흐름이 가능하다.',
      '프로세스는 운영체제에 의해 관리되고, 스레드는 애플리케이션에 의해 관리된다.',
      '프로세스는 병렬 처리가 불가능하고, 스레드는 병렬 처리가 가능하다.',
    ],
  },
  {
    no: 19,
    category: '기타',
    level: '1',
    createdDt: '20240413T16:20:55',
    status: '🟢',
    solved: 68,
    content: '단위 테스트(Unit Testing)의 주요 목적은?',
    selections: [
      '전체 시스템의 성능을 평가한다.',
      '사용자 인터페이스의 사용성을 검증한다.',
      '개별 코드 단위의 정확성을 검증한다.',
      '시스템 간의 통합을 테스트한다.',
    ],
  },
  {
    no: 20,
    category: '기타',
    level: '1',
    createdDt: '20240412T08:15:40',
    status: '🔴',
    solved: 22,
    content: '싱글톤(Singleton) 패턴의 주요 특징은?',
    selections: [
      '클래스의 인스턴스가 하나만 생성되도록 보장한다.',
      '객체 생성을 위한 별도의 클래스를 사용한다.',
      '상속을 통해 기능을 확장할 수 있다.',
      '객체 간의 일대다 관계를 구현한다.',
    ],
  },
];
