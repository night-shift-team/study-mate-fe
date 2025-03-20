'use client';
import { createListCollection, Select } from '@chakra-ui/react';
import { ProblemDetailPageProps } from '@/app/admin/management/problem/detail/page';
import MarkdownComponent from '@/shared/lexical/ui/showMarkdownData';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import Link from 'next/link';
import { Fragment, JSX, useEffect, useLayoutEffect, useState } from 'react';
import { IconType } from 'react-icons/lib';
import { MdCancel } from 'react-icons/md';
import { outSideClickContainer } from '@/shared/eventListeners/model/mouseEvents';
import { createPortal } from 'react-dom';
import {
  UpdateProblemProvider,
  useUpdateProblem,
} from '../model/updateProblemContext';
import SelectComponent from '../model/selectCategoryComponent';
import ContentsMarkDown from './markDownEdit';
import { SelectedProblem } from './problemDetailPage';
import AuthHoc from '@/shared/auth/model/authHoc';

enum ProblemAttributeTitle {
  Category = 'Category',
  Level = 'Level',
  Type = 'Type',
  CreatedDt = 'CreatedDt',
  Activate = 'Activate',
}
type ProblemCategory =
  | '운영체제'
  | '네트워크'
  | '데이터베이스'
  | '자료구조'
  | '알고리즘'
  | '기타';
const ProblemCategories: ProblemCategory[] = [
  '운영체제',
  '네트워크',
  '데이터베이스',
  '자료구조',
  '알고리즘',
  '기타',
];
type ProblemType = '2지' | '4지' | '주관식';
const problemTypes: ProblemType[] = ['2지', '4지', '주관식'];

export interface UpdateProblemProps {
  id: number;
  title: string;
  descr: string;
  markdown: string;
  category: ProblemCategory;
  level: string;
  type: ProblemType;
  selectionData: string[];
  createdDt: string;
  activate: boolean;
}

const UpdateProblem = ({ params }: { params: ProblemDetailPageProps }) => {
  const id = params.id;
  const localProblemData: SelectedProblem | null = localStorage.getItem(
    'selectedProblemInfo'
  )
    ? JSON.parse(localStorage.getItem('selectedProblemInfo')!)
    : null;
  const [updateProblemInfo, setUpdateProblemInfo] =
    useState<UpdateProblemProps>({
      id: params.id,
      title: localProblemData?.question ?? '',
      descr: localProblemData?.explanation ?? '',
      markdown: localProblemData?.markdown ?? '',
      category: '운영체제',
      level: '1',
      type: '4지',
      selectionData: ['data1', 'data2', 'data3', 'data4'],
      createdDt: '2023-08-01',
      activate: true,
    });

  useEffect(() => {
    if (!params) {
      console.log('api 호출');
      // 잘못된 접근
    }
  }, []);
  useEffect(() => {
    console.log(updateProblemInfo);
  }, [updateProblemInfo]);

  return (
    <form className="flex h-full w-full flex-col items-start p-4">
      <div className="fixed left-0 flex h-12 w-full items-center justify-between bg-white px-4">
        <div className="flex h-12 w-28 items-center justify-center text-xl font-bold">
          Problem {id}
        </div>
        <div className="flex gap-1">
          <button className="flex h-[2.5rem] w-16 items-center justify-center rounded-lg border text-sm">
            <Link
              href={{
                pathname: RouteTo.AdminManagementProblemUpdate + `/${id}`,
                query: {
                  id: id,
                },
              }}
            >
              수정 완료
            </Link>
          </button>
        </div>
      </div>
      <div className="mt-14 flex h-[calc(100%-4rem)] w-full flex-col gap-2 overflow-y-auto scrollbar-hide">
        <UpdateProblemProvider
          updateProblemInfo={updateProblemInfo}
          setUpdateProblemInfo={setUpdateProblemInfo}
        >
          <TitleBox title={updateProblemInfo.title} />
          <div
            id="horizontal-scroll-container"
            className="grid w-full shrink-0 grid-flow-col grid-cols-3 grid-rows-2 gap-2 md:min-h-16 md:grid-cols-[repeat(5,min-content)] md:grid-rows-1 md:overflow-y-visible md:overflow-x-scroll md:scrollbar-hide"
          >
            <AttrBox title={ProblemAttributeTitle.Category}>
              <SelectComponent
                list={ProblemCategories}
                attrString={'category'}
              />
            </AttrBox>
            <AttrBox title={ProblemAttributeTitle.Level}>
              <input
                type="text"
                value={updateProblemInfo.level}
                onChange={(e) => {
                  try {
                    const level = e.target.value;
                    if (level === '' || isNaN(parseInt(level))) {
                      setUpdateProblemInfo({
                        ...updateProblemInfo,
                        level: '',
                      });
                      return;
                    }
                    setUpdateProblemInfo({
                      ...updateProblemInfo,
                      level: level,
                    });
                  } catch (e: any) {
                    console.log(e);
                  }
                }}
                className="flex h-8 w-12 break-words border px-2 text-center text-xs md:w-auto"
              />
            </AttrBox>
            <AttrBox title={ProblemAttributeTitle.Type}>
              <SelectComponent list={problemTypes} attrString={'type'} />
            </AttrBox>
            <AttrBox title={ProblemAttributeTitle.Activate}>
              <SelectComponent
                list={['true', 'false']}
                attrString={'activate'}
              />
            </AttrBox>
            <AttrBox title={ProblemAttributeTitle.CreatedDt}>
              <input
                disabled={true}
                value={updateProblemInfo.createdDt}
                className="flex h-8 w-[80%] items-center justify-center break-words px-2 text-center text-xs md:w-full"
              />
            </AttrBox>
          </div>
          <ContentsMarkDown />
          <Selections />
          <div className="flex w-full flex-col gap-2 rounded-2xl border p-2">
            <span className="mt-2 w-full text-center text-lg font-bold text-[#FEA1A1]">
              Solution
            </span>
            <textarea
              className="w-full break-words p-1.5 text-sm"
              value={updateProblemInfo.descr}
              onChange={(e) =>
                setUpdateProblemInfo({
                  ...updateProblemInfo,
                  descr: e.target.value,
                })
              }
            ></textarea>
          </div>
        </UpdateProblemProvider>
      </div>
    </form>
  );
};
export default AuthHoc(UpdateProblem);

const TitleBox = ({ title }: { title: string }) => {
  const { setUpdateProblemInfo } = useUpdateProblem();
  return (
    <div className="flex min-h-16 w-full flex-shrink-0 flex-col items-center justify-center rounded-2xl border md:flex-row md:justify-start md:gap-2 md:px-6">
      <span className="font-bold text-[#FEA1A1]">Title</span>
      <textarea
        className="flex w-full min-w-[90%] break-words px-2 text-xs md:w-auto"
        value={title}
        onChange={(e) => {
          setUpdateProblemInfo((prev) => ({ ...prev, title: e.target.value }));
        }}
      />
    </div>
  );
};

const AttrBox = ({
  title,
  children,
}: {
  title: string;
  children: JSX.Element;
}) => {
  return (
    <div className="flex h-16 w-full max-w-60 flex-col items-center justify-center rounded-2xl border bg-white md:min-w-60 md:flex-row md:justify-start md:gap-2 md:px-6">
      <span className="flex w-full items-end justify-center text-center font-bold text-[#FEA1A1]">
        {title}
      </span>
      {children}
    </div>
  );
};

const Selections = () => {
  const { updateProblemInfo } = useUpdateProblem();
  return (
    <div className="flex w-full grow flex-col gap-2 rounded-2xl border p-2">
      <span className="mt-2 text-center text-lg font-bold text-[#FEA1A1]">
        Selections
      </span>
      <div className="flex w-full flex-col gap-1 px-2 text-[0.7rem]">
        {updateProblemInfo.type === '2지' ? (
          updateProblemInfo.selectionData.map((selection, index) => {
            return (
              <div
                key={index}
                className="flex w-full flex-col justify-center gap-2 pr-2"
              >
                <SelectionInputComponent
                  type={updateProblemInfo.type}
                  index={index}
                  dataStr={selection}
                />
              </div>
            );
          })
        ) : (
          <></>
        )}
        {updateProblemInfo.type === '4지' ? (
          updateProblemInfo.selectionData.map((selection, index) => {
            return (
              <div
                key={index}
                className="flex w-full flex-col justify-center gap-2 pr-2"
              >
                <SelectionInputComponent
                  type={updateProblemInfo.type}
                  index={index}
                  dataStr={selection}
                />
              </div>
            );
          })
        ) : (
          <></>
        )}
        {updateProblemInfo.type === '주관식' ? (
          updateProblemInfo.selectionData.map((selection, index) => {
            return (
              <div
                key={index}
                className="flex w-full flex-col justify-center gap-2 pr-2"
              >
                <SelectionInputComponent
                  type={updateProblemInfo.type}
                  index={index}
                  dataStr={selection}
                />
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const SelectionInputComponent = ({
  type,
  index,
  dataStr,
}: {
  type: ProblemType;
  index: number;
  dataStr: string;
}) => {
  const { setUpdateProblemInfo } = useUpdateProblem();
  return (
    <div className="flex w-full items-center gap-2 pr-2">
      <input
        id={type + index.toString()}
        type="radio"
        name="selection"
        className="h-8 w-4 text-3xl"
        disabled={true}
      />
      <textarea
        className="h-8 w-full border p-1.5 text-sm font-extrabold"
        value={dataStr}
        onChange={(e) =>
          setUpdateProblemInfo((prev) => ({
            ...prev,
            selectionData: prev.selectionData.map((data, idx) =>
              idx === index ? e.target.value : data
            ),
          }))
        }
      />
    </div>
  );
};
