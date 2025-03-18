import { _apiFetch } from '@/shared/api/model/config';
import {
  ProblemCategory,
  ProblemCategoryTitle,
  ProblemCategoryType,
  ProblemInfoMAQ,
} from '@/shared/constants/problemInfo';

const API_Prefix = '/api/v1/question';

interface SendAnswerReq {
  questionId: string;
  userAnswer: string;
}

export interface SendMAQAnswerRes {
  answer: string;
  answerExplanation: string;
  userAnswer: string;
  isCorrect: boolean;
  reflectedScore: number;
  userScore: number;
}

export interface SendSAQAnswerRes {
  keyword1: string;
  keyword2: string;
  keyword3: string;
  modelAnswer: string;
  answerExplanation: string;
  userAnswer: string;
  reflectedScore: number;
  userScore: number;
}

export const getMAQbyCategoryApi = async (category: ProblemCategoryTitle) => {
  const problemTypeInfo =
    `${category}_${ProblemCategoryType.MAQ}` as ProblemCategory;
  const path = `/${problemTypeInfo}/${ProblemCategoryType.MAQ.toLowerCase()}`;
  return await _apiFetch<ProblemInfoMAQ>('GET', API_Prefix + path);
};

export const getSAQbyCategoryApi = async (category: ProblemCategoryTitle) => {
  const problemTypeInfo =
    `${category}_${ProblemCategoryType.SAQ}` as ProblemCategory;
  const path = `/${problemTypeInfo}/${ProblemCategoryType.SAQ.toLowerCase()}`;
  return await _apiFetch('GET', API_Prefix + path);
};

export const sendMAQAnswerApi = async (
  questionId: string,
  userAnswer: string
) => {
  const body: SendAnswerReq = {
    questionId: questionId,
    userAnswer: userAnswer,
  };
  return await _apiFetch<SendMAQAnswerRes>(
    'POST',
    API_Prefix + '/check/' + ProblemCategoryType.MAQ.toLowerCase(),
    body
  );
};

export const sendSAQAnswerApi = async (
  questionId: string,
  userAnswer: string
) => {
  const body: SendAnswerReq = {
    questionId: questionId,
    userAnswer: userAnswer,
  };
  return await _apiFetch<SendSAQAnswerRes>(
    'POST',
    API_Prefix + '/check/' + ProblemCategoryType.SAQ.toLowerCase(),
    body
  );
};
