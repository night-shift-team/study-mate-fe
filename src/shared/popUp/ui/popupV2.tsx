import React, { JSX } from 'react';
import { IoMdClose } from 'react-icons/io';
import PreventScrollOutsidePopup from '../model/preventParentScroll';
import MarkdownComponent from '@/shared/lexical/model/markdownConfig';

// 팝업 컴포넌트 종류
// 1. PopupProblem - 문제 내용 팝업 (타이틀, 내용, 유저 답안, 정답, 해설, 닫기)
// 2. PopupNotice - 안내 문구 팝업 (타이틀, 내용, 닫기)
// 3. PopupConfirm - 확인 문구 팝업 ( 타이틀 내용, 확인, 취소(닫기) )

// 팝업 컴포넌트 크기
// 1. sm, md, lg

type Size = 'sm' | 'md' | 'lg';
const getWidthSize = (size: Size): string => {
  switch (size) {
    case 'sm':
      return 'max-w-[20rem]';
    case 'md':
      return 'max-w-[40rem]';
    case 'lg':
      return 'max-w-[60rem]';
    default:
      return 'max-w-[40rem]';
  }
};
const getHeightSize = (size: Size): string => {
  switch (size) {
    case 'sm':
      return 'min-h-[20rem]';
    case 'md':
      return 'min-h-[20rem]';
    case 'lg':
      return 'min-h-[40rem]';
    default:
      return 'min-h-[20rem]';
  }
};

interface PopupWithProblemProps {
  size?: Size;
  questionTitle: string;
  difficulty: string | number;
  content: string;
  answer: string;
  explanation: string;
  userAnswer?: string;
  onClose: () => void;
}

export const PopupProblem: React.FC<PopupWithProblemProps> = ({
  size,
  onClose,
  difficulty,
  questionTitle,
  content,
  answer,
  explanation,
  userAnswer,
}) => {
  return (
    <PopupContainer size={size ?? 'md'} height>
      {/* 헤더 */}
      <PopupHeader>
        <div className="flex w-[80%] flex-col text-[2vh] font-semibold text-gray-800">
          <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-base">
            {questionTitle}
          </span>
        </div>
        <div className="items-centers flex w-[20%] justify-end gap-3 text-sm font-semibold text-gray-800">
          <span>난이도 : {difficulty}</span>
          <IoMdClose
            onClick={onClose}
            className="cursor-pointer pb-1 text-gray-500 transition-colors hover:text-gray-800"
            style={{ fontSize: '24px' }}
          />
        </div>
      </PopupHeader>
      {/* 컨텐츠 */}
      <div
        id="popup-scroll-body"
        className="flex w-full flex-col gap-2 overflow-y-auto px-2"
      >
        <PreventScrollOutsidePopup />
        <div className="flex w-full flex-1">
          <MarkdownComponent markdown={content} />
        </div>
        {userAnswer && (
          <p className="mt-2 flex w-full whitespace-pre-wrap font-bold">
            유저 선택 :{' '}
            <span className="font-medium text-pointcolor-deepcoral">
              {userAnswer}
            </span>
          </p>
        )}
        <p className="flex w-full whitespace-pre-wrap font-bold">
          정답 : <span className="font-medium text-green-700">{answer}</span>
        </p>
        <div className="flex w-full flex-col whitespace-pre-wrap font-bold">
          해설 :{' '}
          <p className="flex w-full whitespace-pre-wrap font-medium">
            {explanation}
          </p>
        </div>
      </div>
    </PopupContainer>
  );
};

interface PopupNoticeProps {
  size: Size;
  title: string;
  content: JSX.Element | string;
  onClose: () => void;
  ref: React.RefObject<HTMLElement | null>;
  color?: string;
}

export const PopupNotice: React.FC<PopupNoticeProps> = ({
  size,
  title,
  content,
  onClose,
  ref,
  color,
}) => {
  return (
    <PopupContainer ref={ref} size={size} color={color}>
      <IoMdClose
        onClick={onClose}
        className="absolute right-5 cursor-pointer text-gray-500 transition-colors hover:text-gray-800"
        style={{ fontSize: '24px' }}
      />
      <PopupHeader>
        <div className="flex w-full flex-col items-center justify-center text-[2vh] font-semibold text-gray-800">
          <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-base">
            {title}
          </span>
        </div>
      </PopupHeader>

      <div className="flex w-full items-center justify-center px-2">
        {content}
      </div>
    </PopupContainer>
  );
};

interface PopupConfirmProps {
  size: Size;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export const PopupConfirm: React.FC<PopupConfirmProps> = ({
  size,
  title,
  content,
  onConfirm,
  onCancel,
}) => {
  return (
    <PopupContainer size={size}>
      <PopupHeader>
        <div className="flex w-full flex-col text-[2vh] font-semibold text-gray-800">
          <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-base">
            {title}
          </span>
        </div>
      </PopupHeader>
      <p className="flex w-full">{content}</p>
      <div className="mt-4 flex justify-center gap-1">
        <button
          onClick={onConfirm}
          className="rounded-lg bg-pointcolor-beigebrown px-4 py-2 text-black"
        >
          확인
        </button>
        {onCancel && (
          <button
            onClick={onCancel}
            className="mr-2 rounded-lg bg-gray-300 px-4 py-2"
          >
            취소
          </button>
        )}
      </div>
    </PopupContainer>
  );
};

const PopupContainer = ({
  size,
  children,
  ref,
  color = '#ffffff',
  height = false,
}: {
  size: Size;
  children: React.ReactNode;
  ref?: React.RefObject<HTMLElement | null>;
  color?: string;
  height?: boolean;
}) => {
  return (
    <div className="fixed inset-0 z-[50000] flex items-center justify-center bg-black bg-opacity-60 p-4 backdrop-blur-sm transition-opacity duration-300">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`flex w-full flex-col ${getWidthSize(size)} ${height ? getHeightSize(size) : ''} h-auto max-h-[90vh] transform rounded-2xl p-6 shadow-2xl transition-transform duration-300 scrollbar-hide`}
        style={{ backgroundColor: color }}
      >
        {children}
      </div>
    </div>
  );
};
const PopupHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mb-4 flex w-full items-center justify-between border-b pb-2">
      {children}
    </div>
  );
};
