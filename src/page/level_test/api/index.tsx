import { _apiFetch } from '@/shared/api/model/config';
import { ProblemCategory } from '@/shared/problem/model/problemInfo.types';

const API_Prefix = '/api/v1';

type GetLevelTestQuestionsRes = {
  id: string;
  questionTitle: string;
  content: string;
  difficulty: number;
  category: ProblemCategory;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
}[];

export type GetLevelTestResultReq = {
  id: string;
  answer: '1' | '2' | '3' | '4';
}[];

export interface GetLevelTestResultRes {
  percentileScore: number;
  yourInitScore: number;
  requestedQuestionCount: number;
  correctQuestions: string[];
  wrongQuestions: string[];
}

export const getLevelTestQuestionsApi = async () => {
  return await _apiFetch<GetLevelTestQuestionsRes>(
    'GET',
    API_Prefix + '/question/level-test'
  );
};

export const getLevelTestResultApi = async (
  userAnswer: GetLevelTestResultReq
) => {
  const questionIds: string[] = [];
  const userAnswers: string[] = [];
  userAnswer.forEach((answer) => {
    questionIds.push(answer.id);
    userAnswers.push(answer.answer);
  });
  const body = {
    questionIds: questionIds,
    userAnswers: userAnswers,
  };
  return await _apiFetch<GetLevelTestResultRes>(
    'POST',
    API_Prefix + '/question/check/level-test',
    body
  );
};
